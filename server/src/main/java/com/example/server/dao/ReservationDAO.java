package com.example.server.dao;

import com.example.server.config.MongoDBConnection;
import com.example.server.models.Reservation;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Sorts;
import org.bson.Document;

public class ReservationDAO {
    private final MongoCollection<Document> reservationCollection;

    public ReservationDAO() {
        MongoDatabase database = MongoDBConnection.getDatabase();
        this.reservationCollection = database.getCollection("reservations");
    }

    public Reservation findLastReservationID() {
        Document reservationDoc = reservationCollection.find().sort(Sorts.descending("id")).first();

        if (reservationDoc != null) {
            return new Reservation(
                    reservationDoc.getString("id"),
                    reservationDoc.getString("vehicleID"),
                    reservationDoc.getString("driverID"),
                    reservationDoc.getString("customerID"),
                    reservationDoc.getString("date"),
                    reservationDoc.getString("time"),
                    reservationDoc.getString("status"),
                    reservationDoc.getString("pickLocation"),
                    reservationDoc.getString("dropLocation"),
                    reservationDoc.getString("pickTime"),
                    reservationDoc.getString("dropTime"),
                    reservationDoc.getDouble("fare")
            );
        }

        return null;
    }

    public boolean addReservation(Reservation reservation) {
        Document newReservation = new Document()
                .append("id", reservation.getId())
                .append("vehicleID", reservation.getVehicleID())
                .append("driverID", reservation.getDriverID())
                .append("customerID", reservation.getCustomerID())
                .append("date", reservation.getDate())
                .append("time", reservation.getTime())
                .append("status", reservation.getStatus())
                .append("pickLocation", reservation.getPickLocation())
                .append("dropLocation", reservation.getDropLocation())
                .append("pickTime", reservation.getPickTime())
                .append("dropTime", reservation.getDropTime())
                .append("fare", reservation.getFare());

        reservationCollection.insertOne(newReservation);
        return true;
    }
}
