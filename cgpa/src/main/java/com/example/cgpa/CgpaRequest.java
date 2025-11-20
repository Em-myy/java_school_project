package com.example.cgpa;

import java.util.List;

public class CgpaRequest {
    private String studentName;
    private List<CourseDetail>courses;

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public List<CourseDetail> getCourses() { return courses; }
    public void setCourses(List<CourseDetail> courses) { this.courses = courses; }
}
