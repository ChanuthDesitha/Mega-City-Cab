package com.example.server.controllers;

import com.example.server.models.Customer;
import com.example.server.services.CustomerService;
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

@WebServlet("/api/manage-customers/*")
public class CustomerServlet extends HttpServlet {
    public final CustomerService customerService = new CustomerService();
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
                case "/get-customer":
                    getCustomer(request, response);
                    break;
                case "/update":
                    updateCustomer(request, response);
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
        String address = requestBody.get("address");
        String NIC = requestBody.get("nic");

        Map<String, String> jsonResponse = new HashMap<>();
        if (firstName == null || lastName == null || email == null || phone == null || address == null || NIC == null) {
            jsonResponse.put("message", "All fields are required");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        } else {
            boolean success = customerService.addCustomer(firstName, lastName, email, phone, address, NIC);
            if (success) {
                jsonResponse.put("message", "Customer added successfully!");
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                jsonResponse.put("message", "Customer registration failed! Customer already exists!");
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }
        }

        JsonUtils.sendJsonResponse(response, jsonResponse);
    }

    protected void getCustomer(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        requestBody = JsonUtils.parseJsonRequest(request);
        String phone = requestBody.get("phone");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Map<String, Object> jsonResponse = new HashMap<>();
        ObjectMapper objectMapper = new ObjectMapper();

        if (phone != null) {
            Customer customer = customerService.getCustomer(phone);
            if (customer != null) {
                jsonResponse.put("status", "success");
                jsonResponse.put("customer", customer);
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Customer not found!");
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            }
        } else {
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "Mobile number not included!");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }

        response.getWriter().write(objectMapper.writeValueAsString(jsonResponse));
    }

    protected void updateCustomer(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        requestBody = JsonUtils.parseJsonRequest(request);

        String id = requestBody.get("id");
        String firstName = requestBody.get("firstName");
        String lastName = requestBody.get("lastName");
        String email = requestBody.get("email");
        String phone = requestBody.get("phone");
        String address = requestBody.get("address");
        String NIC = requestBody.get("nic");

        Map<String, String> jsonResponse = new HashMap<>();
        if (id == null || firstName == null || lastName == null || email == null || phone == null || address == null || NIC == null) {
            jsonResponse.put("message", "All fields are required");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        } else {
            boolean success = customerService.updateCustomer(id,firstName, lastName, email, phone, address, NIC);
            if (success) {
                jsonResponse.put("message", "Customer updated successfully!");
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                jsonResponse.put("message", "Customer update failed! Customer not found!");
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }
        }

        JsonUtils.sendJsonResponse(response, jsonResponse);
    }
}
