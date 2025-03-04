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

@WebServlet("/api/manage-users/*")
public class UserServlet extends HttpServlet {
    public final UserService userService = new UserService();
    Map<String, String> requestBody;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();

        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid request");
                return;
            }

            switch (pathInfo) {
                case "/register":
                    register(request, response);
                    break;
                case "/get-user":
                    getUser(request, response);
                    break;
                default:
                    response.sendError(HttpServletResponse.SC_NOT_FOUND, "Endpoint not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }

    protected void register(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        requestBody = JsonUtils.parseJsonRequest(request);

        String firstName = requestBody.get("firstName");
        String lastName = requestBody.get("lastName");
        String email = requestBody.get("email");
        String phone = requestBody.get("phone");
        String username = requestBody.get("username");
        String password = requestBody.get("password");
        String designation = requestBody.get("designation");

        Map<String, String> jsonResponse = new HashMap<>();
        if (firstName == null || lastName == null || email == null || phone == null || username == null || password == null || designation == null) {
            jsonResponse.put("message", "All fields are required");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        } else {
            boolean success = userService.register(firstName, lastName, email, phone, username, password, designation);
            if (success) {
                jsonResponse.put("message", designation + " registered successfully!");
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                jsonResponse.put("message", designation + " registration failed! " + designation + " already exists!");
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }
        }

        JsonUtils.sendJsonResponse(response, jsonResponse);
    }

    protected void getUser(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Map<String, String> requestBody = JsonUtils.parseJsonRequest(request);
        String username = requestBody.get("username");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Map<String, Object> jsonResponse = new HashMap<>();
        ObjectMapper objectMapper = new ObjectMapper();

        if (username != null) {
            User user = userService.getUser(username);
            if (user != null) {
                jsonResponse.put("status", "success");
                jsonResponse.put("user", user);
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "User not found!");
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            }
        } else {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "Username not included!");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }

        response.getWriter().write(objectMapper.writeValueAsString(jsonResponse));
    }
}
