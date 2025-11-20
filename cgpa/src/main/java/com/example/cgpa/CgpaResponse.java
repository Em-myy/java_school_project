package com.example.cgpa;

public class CgpaResponse {
    private String studentName;
    private String cgpa;

    public CgpaResponse(String studentName, String cgpa) {
        this.studentName = studentName;
        this.cgpa = cgpa;
    }

    public String getStudentName() { return studentName; }
    public String getCgpa() { return cgpa; }
}
