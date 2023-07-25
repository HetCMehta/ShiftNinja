package EmployeeLoginRegistration.DatabaseOps;

import java.sql.*;

public class LoginRegistration {

    // Replace these connection details with your own
    public static final String DB_URL = "jdbc:mysql://db4free.net:3306/employee_manage";
    public static final String DB_USERNAME = "tanisha123";
    public static final String DB_PASSWORD = "tanisha123";

    public static String registerEmployee(String name, String email, String password, String companyCode, String role) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD)) {
            String query = "INSERT INTO employee (name, email_id, password, company_code, role) VALUES (?, ?, ?, ?, ?)";

            try (PreparedStatement stmt = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
                stmt.setString(1, name);
                stmt.setString(2, email);
                stmt.setString(3, password);
                stmt.setString(4, companyCode);
                stmt.setString(5, role);

                int affectedRows = stmt.executeUpdate();
                if (affectedRows > 0) {

                    ResultSet generatedKeys = stmt.getGeneratedKeys();
                    if (generatedKeys.next()) {
                        int generatedId = generatedKeys.getInt(1);
                        return "Successfully register employee with ID: " + generatedId;
                    }
                } else {
                    return "Failed to register employee.";
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "Failed to register employee.";
    }

    public static String loginEmployee(String email, String password) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD)) {
            String query = "SELECT * FROM employee WHERE email_id = ? AND password = ?";

            try (PreparedStatement stmt = conn.prepareStatement(query)) {
                stmt.setString(1, email);
                stmt.setString(2, password);

                ResultSet rs = stmt.executeQuery();
                if (rs.next()) {
                    // Employee with the given email_id and password exists
                    return "{ \"Response\": \"Login successful\"," +
                            "\"role\": \"" + rs.getString("role") + "\" }";
                } else {
                    // No employee with the given email_id and password exists
                    return "{ \"Response\": \"Login failed\"}";
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return "Login failed";
        }
    }
}
