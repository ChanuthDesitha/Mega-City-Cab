package com.example.server.dao;

import com.example.server.config.MongoDBConnection;
import com.example.server.models.Customer;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;

import static com.mongodb.client.model.Filters.eq;

public class CustomerDAO {
    private final MongoCollection<Document> customerCollection;

    public CustomerDAO() {
        MongoDatabase database = MongoDBConnection.getDatabase();
        this.customerCollection = database.getCollection("customers");
    }

    public Customer findByPhone(String phone) {
        Document customerDoc = customerCollection.find(eq("phone", phone)).first();

        if (customerDoc != null) {
            return new Customer(
                    customerDoc.getString("id"),
                    customerDoc.getString("firstName"),
                    customerDoc.getString("lastName"),
                    customerDoc.getString("email"),
                    customerDoc.getString("phone"),
                    customerDoc.getString("address"),
                    customerDoc.getString("NIC")
            );
        }

        return null;
    }

    public Customer findByID(String id) {
        Document customerDoc = customerCollection.find(eq("id", id)).first();

        if (customerDoc != null) {
            return new Customer(
                    customerDoc.getString("id"),
                    customerDoc.getString("firstName"),
                    customerDoc.getString("lastName"),
                    customerDoc.getString("email"),
                    customerDoc.getString("phone"),
                    customerDoc.getString("address"),
                    customerDoc.getString("NIC")
            );
        }

        return null;
    }

    public Customer findLastCustomer() {
        Document customerDoc = customerCollection.find().sort(Sorts.descending("id")).first();

        if (customerDoc != null) {
            return new Customer(
                    customerDoc.getString("id"),
                    customerDoc.getString("firstName"),
                    customerDoc.getString("lastName"),
                    customerDoc.getString("email"),
                    customerDoc.getString("phone"),
                    customerDoc.getString("address"),
                    customerDoc.getString("NIC")
            );
        }

        return null;
    }

    public boolean registerCustomer(Customer customer) {
        Document newCustomer = new Document()
                .append("id", customer.getId())
                .append("firstName", customer.getFirstName())
                .append("lastName", customer.getLastName())
                .append("email", customer.getEmail())
                .append("phone", customer.getPhone())
                .append("address", customer.getAddress())
                .append("NIC", customer.getNIC());

        customerCollection.insertOne(newCustomer);
        return true;
    }

    public boolean updateCustomer(Customer customer) {
        Document updatedCustomer = new Document()
                .append("firstName", customer.getFirstName())
                .append("lastName", customer.getLastName())
                .append("email", customer.getEmail())
                .append("phone", customer.getPhone())
                .append("address", customer.getAddress())
                .append("NIC", customer.getNIC());

        UpdateResult result = customerCollection.updateOne(
                Filters.eq("id", customer.getId()),
                new Document("$set", updatedCustomer)
        );

        return result.getModifiedCount() > 0;
    }
}
