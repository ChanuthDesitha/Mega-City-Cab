package com.example.server.services;

import com.example.server.dao.DistanceDAO;

import java.util.List;

public class DistanceService {
    private final DistanceDAO distanceDAO = new DistanceDAO();

    public List<String> getAllPickLocations() {
        if(distanceDAO.getAllPickupLocations().isEmpty()) {
            return null;
        } else {
            return distanceDAO.getAllPickupLocations();
        }
    }

    public int getDistance(String pickup, String dropOff) {
        if(distanceDAO.getDistance(pickup, dropOff) == 0) {
            return 0;
        } else {
            return distanceDAO.getDistance(pickup, dropOff);
        }
    }
}
