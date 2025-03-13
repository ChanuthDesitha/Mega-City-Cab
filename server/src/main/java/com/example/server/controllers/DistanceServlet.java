package com.example.server.controllers;

import com.example.server.services.DistanceService;
import com.example.server.utils.JsonUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@WebServlet("/api/locations/*")
public class DistanceServlet extends HttpServlet {
    public final DistanceService distanceService = new DistanceService();
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
                case "/get-locations":
                    getLocations(request, response);
                    break;
                case "/get-distance":
                    getDistance(request, response);
                    break;
                default:
                    response.sendError(HttpServletResponse.SC_NOT_FOUND, "Endpoint not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }

    protected void getLocations(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Map<String, Object> jsonResponse = new HashMap<>();
        ObjectMapper objectMapper = new ObjectMapper();

        List<String> locations = distanceService.getAllPickLocations(); // Get pickup locations

        if (locations != null && !locations.isEmpty()) {
            jsonResponse.put("status", "success");
            jsonResponse.put("pickupLocations", locations);
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "No pickup locations found!");
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }

        response.getWriter().write(objectMapper.writeValueAsString(jsonResponse));
    }

    protected void getDistance(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        requestBody = JsonUtils.parseJsonRequest(request);

        String pick = requestBody.get("pick");
        String drop = requestBody.get("drop");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Map<String, Object> jsonResponse = new HashMap<>();
        ObjectMapper objectMapper = new ObjectMapper();
        if (pick == null || drop == null) {
            jsonResponse.put("message", "Both pick and drop locations are required!");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        } else {
            int distance = distanceService.getDistance(pick, drop);

            if(!Objects.equals(distance, 0)) {
                jsonResponse.put("status", "success");
                jsonResponse.put("distance", distance);
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Distance did not found!");
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            }
        }

        response.getWriter().write(objectMapper.writeValueAsString(jsonResponse));
    }
}
