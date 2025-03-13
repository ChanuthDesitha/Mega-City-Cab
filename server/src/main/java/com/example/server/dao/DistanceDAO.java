package com.example.server.dao;

import com.example.server.config.MongoDBConnection;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class DistanceDAO {
    private final MongoCollection<Document> distanceCollection;

    public DistanceDAO() {
        MongoDatabase database = MongoDBConnection.getDatabase();
        this.distanceCollection = database.getCollection("distances");
    }

    public List<String> getAllPickupLocations() {
        List<String> pickupLocations = new ArrayList<>();

        distanceCollection.find().forEach(doc -> {
            String pickup = doc.getString("pickup");

            if (!pickupLocations.contains(pickup)) {
                pickupLocations.add(pickup);
            }
        });

        return pickupLocations;
    }

    public int getDistance(String pickup, String dropOff) {
        Document document = distanceCollection.find(Filters.eq("pickup", pickup)).first();

        if (document != null) {
            Document distances = (Document) document.get("distances");

            if (distances != null && distances.containsKey(dropOff)) {
                return distances.getInteger(dropOff);
            }
        }

        return 0;
    }
}
