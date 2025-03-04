package com.example.server.utils;

import com.example.server.dao.CustomerDAO;
import com.example.server.dao.ReservationDAO;
import com.example.server.dao.UserDAO;

public class IDUtils {
    private static final String DEFAULT_ID = "001";

    public static String generateUserID(UserDAO userDAO, String designation) {
        return generateID(userDAO.findLastUser(designation));
    }

    public static String generateCustomerID(CustomerDAO customerDAO) {
        return generateID(customerDAO.findLastCustomer());
    }

    public static String generateReservationID(ReservationDAO reservationDAO) {
        return generateID(reservationDAO.findLastReservationID());
    }

    public static String generateID(Object lastUser) {
        String newID = DEFAULT_ID;
        
        if(lastUser != null) {
            try {
                String lastID = (String) lastUser.getClass().getMethod("getId").invoke(lastUser);
                System.out.println(lastID);
                int numericID = Integer.parseInt(lastID);
                newID = String.format("%03d", numericID + 1);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return newID;
    }
}
