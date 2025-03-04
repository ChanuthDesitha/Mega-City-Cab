package com.example.server.controllers;

import com.example.server.models.User;
import com.example.server.services.UserService;
import com.example.server.utils.JsonUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/api/auth/login")
public class LoginServlet extends HttpServlet {
    private final UserService userService = new UserService();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Map<String, String> requestBody = JsonUtils.parseJsonRequest(request);
        String username = requestBody.get("username");
        String password = requestBody.get("password");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        boolean success = userService.login(username, password);
        Map<String, Object> jsonResponse = new HashMap<>();
        ObjectMapper objectMapper = new ObjectMapper();

        if (success) {
            User user = userService.getUser(username);
            if (user != null) {
                Map<String, Object> userData = new HashMap<>();
                userData.put("id", user.getId());
                userData.put("firstName", user.getFirstName());
                userData.put("lastName", user.getLastName());
                userData.put("email", user.getEmail());
                userData.put("phone", user.getPhone());
                userData.put("username", user.getUsername());
                userData.put("designation", user.getDesignation());

                jsonResponse.put("message", "Login Successful!");
                jsonResponse.put("user", userData);
                response.setStatus(HttpServletResponse.SC_OK);
            }
        } else {
            jsonResponse.put("message", "Invalid Username or Password!");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }

        response.getWriter().write(objectMapper.writeValueAsString(jsonResponse));
    }
}
