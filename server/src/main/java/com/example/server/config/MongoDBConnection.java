package com.example.server.config;


import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class MongoDBConnection {
    private static MongoClient mongoClient;
    private static MongoDatabase database;

    static {
        try {
            mongoClient = MongoClients.create("mongodb+srv://desithaweerasingha2:Chanuwa2@megacitycab.u5l0c.mongodb.net/?retryWrites=true&w=majority&appName=MegaCityCab");
            database = mongoClient.getDatabase("MegaCityCab");

            System.out.println("Database Connected");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static MongoDatabase getDatabase() {
        return database;
    }
}


























