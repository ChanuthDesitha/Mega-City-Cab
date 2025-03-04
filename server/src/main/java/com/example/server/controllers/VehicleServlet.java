package com.example.server.controllers;

import com.example.server.models.Vehicle;
import com.example.server.services.VehicleService;
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

@WebServlet("/api/manage-vehicles/*")
public class VehicleServlet extends HttpServlet {
    private final VehicleService vehicleService = new VehicleService();
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
                case "/get-available-vehicle":
                    getAvailableVehicle(request, response);
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

        String registrationNumber = requestBody.get("registrationNumber");
        String username = requestBody.get("username");
        String type = requestBody.get("type");
        String brand = requestBody.get("brand");
        String model = requestBody.get("model");
        String year = requestBody.get("year");
        String passengerCount = requestBody.get("passengerCount");
        String insuranceExpDate = requestBody.get("insuranceExpDate");
        String licenseExpDate = requestBody.get("licenseExpDate");

        Map<String, String> jsonResponse = new HashMap<>();
        if(registrationNumber == null || username == null || type == null || brand == null || model == null || year == null || passengerCount == null || insuranceExpDate == null || licenseExpDate == null) {
            jsonResponse.put("message", "All fields are required!");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        } else {
            boolean success = vehicleService.addVehicle(registrationNumber, username, type, brand, model, year, passengerCount, insuranceExpDate, licenseExpDate);
            if(success) {
                jsonResponse.put("message", "Vehicle registered successfully!");
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                jsonResponse.put("message", "Vehicle registration failed! Vehicle already exists!");
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        }

        JsonUtils.sendJsonResponse(response, jsonResponse);
    }

    protected void getAvailableVehicle(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        requestBody = JsonUtils.parseJsonRequest(request);
        String type = requestBody.get("type");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Map<String, Object> jsonResponse = new HashMap<>();
        ObjectMapper objectMapper = new ObjectMapper();

        if (type != null) {
            Vehicle vehicle = vehicleService.getAvailableVehicle(type);
            if (vehicle != null) {
                jsonResponse.put("status", "success");
                jsonResponse.put("vehicle", vehicle);
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "vehicle not found!");
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            }
        } else {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "Vehicle type not included!");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }

        response.getWriter().write(objectMapper.writeValueAsString(jsonResponse));
    }
}
