package com.example.server.dao;

import com.example.server.config.MongoDBConnection;
import com.example.server.models.Vehicle;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static com.mongodb.client.model.Filters.eq;

public class VehicleDAO {
    private final MongoCollection<Document> vehicleCollection;

    public VehicleDAO() {
        MongoDatabase database = MongoDBConnection.getDatabase();
        this.vehicleCollection = database.getCollection("vehicles");
    }

    public Vehicle findByRegistrationNumber(String registrationNumber) {
        Document vehicleDoc = vehicleCollection.find(eq("registrationNumber", registrationNumber)).first();

        return getVehicle(vehicleDoc);
    }

    public Vehicle findByAvailability(String type) {
        List<Document> vehicles = vehicleCollection.find(
                Filters.and(Filters.eq("type", type), Filters.eq("status", "available"))
        ).into(new ArrayList<>());

        Document vehicleDoc = vehicles.isEmpty() ? null : vehicles.get(new Random().nextInt(vehicles.size()));

        return getVehicle(vehicleDoc);
    }

    private Vehicle getVehicle(Document vehicleDoc) {
        if (vehicleDoc != null) {
            return new Vehicle(
                    vehicleDoc.getString("registrationNumber"),
                    vehicleDoc.getString("username"),
                    vehicleDoc.getString("type"),
                    vehicleDoc.getString("brand"),
                    vehicleDoc.getString("model"),
                    vehicleDoc.getString("year"),
                    vehicleDoc.getString("status"),
                    vehicleDoc.getString("passengerCount"),
                    vehicleDoc.getString("insuranceExpDate"),
                    vehicleDoc.getString("licenseExpDate")
            );
        }

        return null;
    }

    public boolean addVehicle(Vehicle vehicle) {
        Document newVehicle = new Document()
                .append("registrationNumber", vehicle.getRegistrationNumber())
                .append("username", vehicle.getUsername())
                .append("type", vehicle.getType())
                .append("brand", vehicle.getBrand())
                .append("model", vehicle.getModel())
                .append("year", vehicle.getYear())
                .append("status", vehicle.getStatus())
                .append("passengerCount", vehicle.getPassengerCount())
                .append("InsuranceExpDate", vehicle.getInsuranceExpDate())
                .append("licenseExpDate", vehicle.getLicenseExpDate());

        vehicleCollection.insertOne(newVehicle);
        return true;
    }
}
