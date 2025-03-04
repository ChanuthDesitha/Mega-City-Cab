package com.example.server.models;

public class Reservation {
    private String id;
    private String vehicleID;
    private String driverID;
    private String customerID;
    private String date;
    private String time;
    private String status;
    private String pickLocation;
    private String dropLocation;
    private String pickTime;
    private String dropTime;
    private double fare;

    public Reservation(String id, String vehicleID, String driverID, String customerID, String date, String time, String status, String pickLocation, String dropLocation, String pickTime, String dropTime,  double fare) {
        this.id = id;
        this.vehicleID = vehicleID;
        this.driverID = driverID;
        this.customerID = customerID;
        this.date = date;
        this.time = time;
        this.status = status;
        this.pickLocation = pickLocation;
        this.dropLocation = dropLocation;
        this.pickTime = pickTime;
        this.dropTime = dropTime;
        this.fare = fare;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getVehicleID() {
        return vehicleID;
    }
    public void setVehicleID(String vehicleID) {
        this.vehicleID = vehicleID;
    }

    public String getDriverID() {
        return driverID;
    }
    public void setDriverID(String driverID) {
        this.driverID = driverID;
    }

    public String getCustomerID() {
        return customerID;
    }
    public void setCustomerID(String customerID) {
        this.customerID = customerID;
    }

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }
    public void setTime(String time) {
        this.time = time;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public String getPickLocation() {
        return pickLocation;
    }
    public void setPickLocation(String pickLocation) {
        this.pickLocation = pickLocation;
    }

    public String getDropLocation() {
        return dropLocation;
    }
    public void setDropLocation(String dropLocation) {
        this.dropLocation = dropLocation;
    }

    public String getPickTime() {
        return pickTime;
    }
    public void setPickTime(String pickTime) {
        this.pickTime = pickTime;
    }

    public String getDropTime() {
        return dropTime;
    }
    public void setDropTime(String dropTime) {
        this.dropTime = dropTime;
    }

    public double getFare() {
        return fare;
    }
    public void setFare(double fare) {
        this.fare = fare;
    }
}
