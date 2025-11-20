package com.example.cgpa;

public class CgpaResponse {
    private String studentName;
    private String cgpa;
    private String message;

    public CgpaResponse(String studentName, String cgpa, String message) {
        this.studentName = studentName;
        this.cgpa = cgpa;
        this.message = message;
    }

    public String getStudentName() { return studentName; }
    public String getCgpa() { return cgpa; }
    public String getMessage() { return message; }
}
