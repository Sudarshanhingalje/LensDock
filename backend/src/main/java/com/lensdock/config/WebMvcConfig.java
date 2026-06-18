package com.lensdock.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class WebMvcConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);

        // Allow the Vercel production domain and any preview deployment
        config.setAllowedOriginPatterns(List.of(
                "https://lens-dock.vercel.app",
                "https://*.vercel.app"
        ));
        // Accept any request header (Authorization, Content-Type, etc.)
        config.setAllowedHeaders(List.of("*"));
        // Expose useful response headers
        config.setExposedHeaders(List.of("Authorization", "Content-Type"));
        // HTTP methods used by the frontend
        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"
        ));
        // Credentials are not needed (JWT in Authorization header)
        config.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return new CorsFilter(source);
    }
}
