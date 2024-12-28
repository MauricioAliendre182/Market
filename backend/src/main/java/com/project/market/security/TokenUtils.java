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
    private static String ACCESS_TOKEN_SECRET;
    private static long ACCESS_TOKEN_VALIDITY_SECONDS;

    static {
        try {
            ACCESS_TOKEN_SECRET = ReadTokenProperties.getAccessToken();
            ACCESS_TOKEN_VALIDITY_SECONDS = ReadTokenProperties.getValidityTime();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static String createToken(String name, String username) {
        long expirationTime = ACCESS_TOKEN_VALIDITY_SECONDS + 1_000;
        Date expirationDate = new Date(System.currentTimeMillis() + expirationTime);

        Map<String, Object> extra = new HashMap<>();
        extra.put("name", name);

        return Jwts.builder()
                .setSubject(username)
                .setExpiration(expirationDate)
                .addClaims(extra)
                .signWith(Keys.hmacShaKeyFor(ACCESS_TOKEN_SECRET.getBytes(StandardCharsets.UTF_8)))
                .compact();
    }

    public static UsernamePasswordAuthenticationToken getAuthentication(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(ACCESS_TOKEN_SECRET.getBytes(StandardCharsets.UTF_8))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            String username = claims.getSubject();

            return new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());
        } catch (JwtException e){
            return null;
        }
    }

}
