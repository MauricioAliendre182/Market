package com.project.market.security;

import com.project.market.properties.ReadTokenProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class TokenUtils {
    private final static String ACCESS_TOKEN_SECRET;
    private final static long ACCESS_TOKEN_VALIDITY_SECONDS;

    static {
        try {
            ACCESS_TOKEN_SECRET = ReadTokenProperties.getAccessToken();
            ACCESS_TOKEN_VALIDITY_SECONDS = ReadTokenProperties.getValidityTime();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static String createToken(String name, String username, Integer userId) {
        long expirationTime = ACCESS_TOKEN_VALIDITY_SECONDS + 1_000;
        long currentDateTime = System.currentTimeMillis();
        Date issuedAtDate = new Date(currentDateTime);
        Date expirationDate = new Date(currentDateTime + expirationTime);

        Map<String, Object> extra = new HashMap<>();
        extra.put("name", name);

        return Jwts.builder()
                .subject(username)
                .issuedAt(issuedAtDate)
                .expiration(expirationDate)
                .claims(extra)
                // Custom claim to get the token
                .claim("userId", userId)
                .signWith(Keys.hmacShaKeyFor(ACCESS_TOKEN_SECRET.getBytes(StandardCharsets.UTF_8)))
                .compact();
    }

    public static UsernamePasswordAuthenticationToken getAuthentication(String token) {
        try {
            // Get all the claims the token
            // We need to see if the Sign matches
            // We parse the claims signed and finaly we get the payload (not the body as previous versions with getBody())
            Claims claims = Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(ACCESS_TOKEN_SECRET.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            String username = claims.getSubject();

            return new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());
        } catch (JwtException e){
            return null;
        }
    }

}
