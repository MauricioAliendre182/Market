package com.project.market.web.controller;

import com.project.market.domain.dto.User;
import com.project.market.domain.service.UserService;
import com.project.market.persistence.entities.DomainUser;
import com.project.market.security.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Tag(name = "User Section")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    private final AuthenticationManager authenticationManager;

    public UserController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Search a user with ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    public ResponseEntity<DomainUser> getClient(
            @Parameter(description = "The id of the user", required = true, example = "2")
            @PathVariable("id") Integer idUser
    ) {
        return userService.getUser(idUser)
                .map(client -> new ResponseEntity<>(client, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/signup/admin")
    @Operation(summary = "Create an admin user")
    @ApiResponse(responseCode = "201", description = "Created")
    public ResponseEntity<User> saveAdmin(
            @RequestBody User user
    ) {
        return new ResponseEntity<>(userService.saveAdmin(user), HttpStatus.CREATED);
    }

    @PostMapping("/signup/customer")
    @Operation(summary = "Create a customer user")
    @ApiResponse(responseCode = "201", description = "Created")
    public ResponseEntity<User> saveCustomer(
            @RequestBody User user
    ) {
        return new ResponseEntity<>(userService.saveCustomer(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @Operation(summary = "Login user")
    @ApiResponse(responseCode = "200", description = "User correctly logged in")
    public ResponseEntity login(
            @RequestBody LoginReq loginReq)  {
        try {
            Authentication authentication =
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReq.getUsername(), loginReq.getPassword()));
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            String token = TokenUtils.createToken(userDetails.getName(), userDetails.getUsername());
            LoginRes loginRes = new LoginRes(userDetails.getUsername(),token);

            return new ResponseEntity<>(loginRes, HttpStatus.OK);

        } catch (BadCredentialsException e){
            ErrorRes errorResponse = new ErrorRes(HttpStatus.BAD_REQUEST,"Invalid username or password");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e){
            ErrorRes errorResponse = new ErrorRes(HttpStatus.BAD_REQUEST, e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @GetMapping("/profile")
    @Operation(summary = "Verify the profile of the user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Get the profile of a user"),
            @ApiResponse(responseCode = "404", description = "Profile not found")
    })
    public ResponseEntity profile(
            @RequestHeader (value = "Token", required = true) String token
            )  {
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String header = new String(decoder.decode(chunks[0]));
        String payload = new String(decoder.decode(chunks[1]));

        String username = payload.split("\"")[3];
        return userService.getUserByUsername(username)
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete a user with ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    public ResponseEntity delete(
            @Parameter(description = "The id of the user", required = true, example = "2")
            @PathVariable("id") Integer idUser
    ) {
        if (userService.delete(idUser)) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}
