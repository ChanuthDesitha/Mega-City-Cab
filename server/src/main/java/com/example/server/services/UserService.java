package com.example.server.services;

import com.example.server.dao.UserDAO;
import com.example.server.models.Customer;
import com.example.server.models.User;
import com.example.server.utils.PasswordUtils;
import com.example.server.utils.IDUtils;

import java.util.List;

public class UserService {
    private final UserDAO userDAO = new UserDAO();

    public boolean login(String username, String password) {
        User user = userDAO.findByUsername(username);
        if (user != null) {
            return PasswordUtils.checkPassword(password, user.getPassword());
        }
        return false;
    }

    public boolean register(String firstName, String lastName, String email, String phone, String username, String password, String designation) {
        if (userDAO.findByUsername(username) != null) {
            return false;
        }

        String hashedPassword = PasswordUtils.hashPassword(password);
        String userID = IDUtils.generateUserID(userDAO);
        User user = new User(userID, firstName, lastName, email, phone, username, hashedPassword, designation);
        return userDAO.registerEmployee(user);
    }

    public User getUser(String username) {
        if (userDAO.findByUsername(username) != null) {
            return userDAO.findByUsername(username);
        } else {
            return null;
        }
    }

    public boolean updateUser(String id, String firstName, String lastName, String email, String phone, String username, String designation) {
        if (userDAO.findByID(id) == null) {
            return false;
        }

        User user = new User(id, firstName, lastName, email, phone, username, designation);
        return userDAO.updateUser(user);
    }

    public List<User> getAllUsers(String designation) {
        if (userDAO.getAllUsers(designation) == null) {
            return null;
        }

        return userDAO.getAllUsers(designation);
    }
}
