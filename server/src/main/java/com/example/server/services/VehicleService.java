package com.example.server.services;

import com.example.server.dao.VehicleDAO;
import com.example.server.models.Vehicle;

public class VehicleService {
    private final VehicleDAO vehicleDAO = new VehicleDAO();

    public Vehicle getAvailableVehicle(String type) {
        if (vehicleDAO.findByAvailability(type) != null) {
            return vehicleDAO.findByAvailability(type);
        } else {
            return null;
        }
    }

    public boolean addVehicle(String registrationNumber, String username, String type, String brand,String model, String year, String passengerCount, String insuranceExpDate, String licenseExpDate) {
        if (vehicleDAO.findByRegistrationNumber(registrationNumber) != null) {
            return false;
        }

        Vehicle vehicle = new Vehicle(registrationNumber, username, type, brand, model, year, "available", passengerCount, insuranceExpDate, licenseExpDate);
        return vehicleDAO.addVehicle(vehicle);
    }
}
