package com.project.market.web.controller;

import com.project.market.domain.dto.User;
import com.project.market.domain.service.UserService;
import com.project.market.persistence.entities.DomainUser;
import com.project.market.security.LoginReq;
import com.project.market.security.LoginRes;
import com.project.market.security.TokenUtils;
import com.project.market.security.UserDetailsImpl;
import com.project.market.utils.MapperMethods;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import java.util.Base64;

class UserControllerTest {
    private final static String BASE_URL = "/user";

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        // The issue is that @InjectMocks doesn't properly inject the userService
        // when the controller has a constructor that only takes authenticationManager
        // We need to manually create the controller and set the userService
        ReflectionTestUtils.setField(userController, "userService", userService);
        
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void getAUserById() throws Exception {
        DomainUser user = buildDomainUser();
        when(userService.getUser(anyInt())).thenReturn(Optional.of(user));

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/id/1")
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();
        
        assertEquals(200, mvcResult.getResponse().getStatus());
        assertTrue(mvcResult.getResponse().getContentAsString().contains("testuser"));
    }

    @Test
    void getAUserByIdWithError() throws Exception {
        when(userService.getUser(anyInt())).thenReturn(Optional.empty());

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/id/100")
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();
        
        assertEquals(404, mvcResult.getResponse().getStatus());
    }

    @Test
    void getAUserByUsername() throws Exception {
        DomainUser user = buildDomainUser();
        when(userService.getUserByUsername(anyString())).thenReturn(Optional.of(user));

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/username/testuser")
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();
        
        assertEquals(200, mvcResult.getResponse().getStatus());
        assertTrue(mvcResult.getResponse().getContentAsString().contains("testuser"));
    }

    @Test
    void getAUserByUsernameWithError() throws Exception {
        when(userService.getUserByUsername(anyString())).thenReturn(Optional.empty());

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/username/nonexistentuser")
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();
        
        assertEquals(404, mvcResult.getResponse().getStatus());
    }

    @Test
    void saveAdmin() throws Exception {
        User user = buildUser();
        when(userService.saveAdmin(any(User.class))).thenReturn(user);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL + "/signup/admin")
                        .content(MapperMethods.mapToJson(user))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        assertEquals(201, mvcResult.getResponse().getStatus());
        assertTrue(mvcResult.getResponse().getContentAsString().contains("testuser"));
    }

    @Test
    void saveCustomer() throws Exception {
        User user = buildUser();
        when(userService.saveCustomer(any(User.class))).thenReturn(user);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL + "/signup/customer")
                        .content(MapperMethods.mapToJson(user))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        assertEquals(201, mvcResult.getResponse().getStatus());
        assertTrue(mvcResult.getResponse().getContentAsString().contains("testuser"));
    }

    @Test
    void loginSuccess() throws Exception {
        // Create mock objects
        LoginReq loginReq = new LoginReq("testuser", "password");
        Authentication authentication = mock(Authentication.class);
        UserDetailsImpl userDetails = mock(UserDetailsImpl.class);
        
        // Set up mock behavior
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getUsername()).thenReturn("testuser");
        
        try (MockedStatic<TokenUtils> tokenUtilsMock = mockStatic(TokenUtils.class)) {
            tokenUtilsMock.when(() -> TokenUtils.createToken(any(UserDetailsImpl.class)))
                    .thenReturn("mocked.jwt.token");
            
            MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL + "/login")
                            .content(MapperMethods.mapToJson(loginReq))
                            .contentType(MediaType.APPLICATION_JSON_VALUE)
                            .accept(MediaType.APPLICATION_JSON_VALUE))
                    .andReturn();
            
            assertEquals(200, mvcResult.getResponse().getStatus());
            assertTrue(mvcResult.getResponse().getContentAsString().contains("mocked.jwt.token"));
        }
    }

    @Test
    void loginWithBadCredentials() throws Exception {
        LoginReq loginReq = new LoginReq("testuser", "wrongpassword");
        
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Invalid username or password"));
        
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL + "/login")
                        .content(MapperMethods.mapToJson(loginReq))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();
        
        assertEquals(400, mvcResult.getResponse().getStatus());
        assertTrue(mvcResult.getResponse().getContentAsString().contains("Invalid username or password"));
    }

    @Test
    void profile() throws Exception {
        DomainUser user = buildDomainUser();
        
        // Create a properly formatted JWT token with the expected structure
        // The controller expects a token with format: header.payload.signature
        // where payload can be decoded and contains "username":"testuser"
        String header = Base64.getUrlEncoder().encodeToString("{}".getBytes());
        String payload = Base64.getUrlEncoder().encodeToString("{\"username\":\"testuser\"}".getBytes());
        String mockToken = header + "." + payload + ".signature";
        
        // The controller will extract "testuser" from the payload
        when(userService.getUserByUsername("testuser")).thenReturn(Optional.of(user));
        
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/profile")
                        .header("Token", mockToken)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();
        
        assertEquals(200, mvcResult.getResponse().getStatus());
    }

    @Test
    void profileWithError() throws Exception {
        // Create a properly formatted JWT token with the expected structure
        String header = Base64.getUrlEncoder().encodeToString("{}".getBytes());
        String payload = Base64.getUrlEncoder().encodeToString("{\"username\":\"testuser\"}".getBytes());
        String mockToken = header + "." + payload + ".signature";
        
        // The controller will extract "testuser" from the payload, but we'll return empty
        when(userService.getUserByUsername("testuser")).thenReturn(Optional.empty());
        
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/profile")
                        .header("Token", mockToken)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();
        
        assertEquals(404, mvcResult.getResponse().getStatus());
    }

    @Test
    void deleteUser() throws Exception {
        when(userService.delete(anyInt())).thenReturn(true);
        
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.delete(BASE_URL + "/delete/1"))
                .andReturn();
        
        assertEquals(200, mvcResult.getResponse().getStatus());
        verify(userService, times(1)).delete(anyInt());
    }

    @Test
    void deleteUserWithError() throws Exception {
        when(userService.delete(anyInt())).thenReturn(false);
        
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.delete(BASE_URL + "/delete/100"))
                .andReturn();
        
        assertEquals(404, mvcResult.getResponse().getStatus());
        verify(userService, times(1)).delete(anyInt());
    }

    private User buildUser() {
        User user = new User();
        user.setUserId(1);
        user.setName("Test User");
        user.setUsername("testuser");
        user.setPassword("password");
        return user;
    }

    private DomainUser buildDomainUser() {
        DomainUser user = new DomainUser();
        user.setIdUser(1);
        user.setName("Test User");
        user.setUsername("testuser");
        user.setPassword("password"); // This will be encoded by the entity
        
        Set<String> roles = new HashSet<>();
        roles.add("ROLE_ADMIN");
        user.setRoles(roles);
        
        return user;
    }
} 