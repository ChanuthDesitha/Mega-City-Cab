package com.example.server.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class MongoDBConnection {
    private static final String CONNECTION_STRING = "mongodb+srv://desithaweerasingha2:Chanuwa2@megacitycab.u5l0c.mongodb.net/?retryWrites=true&w=majority&appName=MegaCityCab";
    private static final String DATABASE_NAME = "MegaCityCab";

    private static MongoClient mongoClient;
    private static MongoDatabase database;

    static {
        try {
            mongoClient = MongoClients.create(CONNECTION_STRING);
            database = mongoClient.getDatabase(DATABASE_NAME);

            System.out.println("Connected to database successfully");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static MongoDatabase getDatabase() {
        return database;
    }
}
