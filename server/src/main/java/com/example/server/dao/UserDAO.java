package com.example.server.dao;

import com.example.server.config.MongoDBConnection;
import com.example.server.models.User;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Sorts;
import org.bson.Document;

import static com.mongodb.client.model.Filters.eq;

public class UserDAO {
    private final MongoCollection<Document> userCollection;

    public UserDAO() {
        MongoDatabase database = MongoDBConnection.getDatabase();
        this.userCollection = database.getCollection("users");
    }

    public User findByUsername(String username) {
        Document userDoc = userCollection.find(eq("username", username)).first();

        if(userDoc != null) {
            return new User(
                userDoc.getString("userID"),
                userDoc.getString("firstName"),
                userDoc.getString("lastName"),
                userDoc.getString("email"),
                userDoc.getString("phone"),
                userDoc.getString("username"),
                userDoc.getString("password"),
                userDoc.getString("designation")
            );
        }

        return null;
    }

    public User findLastUser(String designation) {
        Document lastUser = userCollection.find(Filters.eq("designation", designation)).sort(Sorts.descending("userID")).first();

        if(lastUser != null) {
            return new User(
                    lastUser.getString("userID"),
                    lastUser.getString("firstName"),
                    lastUser.getString("lastName"),
                    lastUser.getString("email"),
                    lastUser.getString("phone"),
                    lastUser.getString("username"),
                    lastUser.getString("password"),
                    lastUser.getString("designation")
            );
        }

        return null;
    }

    public boolean registerEmployee(User user) {
        Document newUser = new Document()
                .append("userID", user.getId())
                .append("firstName", user.getFirstName())
                .append("lastName", user.getLastName())
                .append("email", user.getEmail())
                .append("phone", user.getPhone())
                .append("username", user.getUsername())
                .append("password", user.getPassword())
                .append("designation", user.getDesignation());

        userCollection.insertOne(newUser);
        return true;
    }
}
