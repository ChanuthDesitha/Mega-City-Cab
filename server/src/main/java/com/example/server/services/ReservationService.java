package com.example.server.services;

import com.example.server.dao.ReservationDAO;
import com.example.server.models.Reservation;
import com.example.server.utils.IDUtils;

public class ReservationService {
    private final ReservationDAO reservationDAO = new ReservationDAO();

    public boolean addReservation(String vehicleID, String driverID, String customerID, String date, String time, String pickLocation, String dropLocation, double fare) {
        String id = IDUtils.generateReservationID(reservationDAO);
        Reservation reservation = new Reservation(id, vehicleID, driverID, customerID, date, time, "Pending", pickLocation, dropLocation, null, null, fare);
        return reservationDAO.addReservation(reservation);
    }
}
