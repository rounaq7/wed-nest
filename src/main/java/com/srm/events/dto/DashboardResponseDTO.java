package com.srm.events.dto;

public class DashboardResponseDTO {

    private String username;
    private Integer budget;
    private String role; // Add role field

    // Constructor
    public DashboardResponseDTO(String username, Integer budget, String role) {
        this.username = username;
        this.budget = budget;
        this.role = role;
    }

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getBudget() {
        return budget;
    }

    public void setBudget(Integer budget) {
        this.budget = budget;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
