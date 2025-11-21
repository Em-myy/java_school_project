package com.example.cgpa;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cgpa")
@CrossOrigin(origins = "*")

public class CgpaController {
    @PostMapping("/calculate")

    public CgpaResponse calculateCgpa(@RequestBody CgpaRequest request) {
        String studentName = request.getStudentName();
        List<CourseDetail> courses = request.getCourses();

        
        double totalPoints = 0;
        double totalUnits = 0;

        for (CourseDetail course : courses) {
            double gradePoints = convertGrade(course.getCourseGrade());
            totalPoints += gradePoints * course.getCourseUnit();
            totalUnits += course.getCourseUnit();
        }

        double cgpa = totalPoints / totalUnits;

        
        String formattedCgpa = String.format("%.2f", cgpa);

        return new CgpaResponse(studentName, formattedCgpa, getMessage(cgpa, studentName));
    }

    private double convertGrade(String grade) {
        grade = grade.trim().toUpperCase();

        switch(grade) {
            case "A": return 5;
            case "B": return 4;
            case "C": return 3;
            case "D": return 2;
            case "E": return 1;
            case "F": return 0;
        }

        double value;
        try {
            value = Double.parseDouble(grade);
        } catch(Exception e) {
            return 0;
        }

        if((value >= 70 && value <= 100) || (value == 5)) {
            return 5;
        } else if((value >= 60 && value <= 69) || (value == 4)) {
            return 4;
        } else if((value >= 50 && value <= 59) || (value == 3)) {
            return 3;
        } else if((value >= 45 && value <= 49) || (value == 2)) {
            return 2;
        } else if((value >= 40 && value <= 44) || (value == 1)) {
            return 1;
        } else if((value >= 6 && value <= 39) || (value == 0)) {
            return 0;
        }

        return 0;
    }

    private String getMessage(double cgpa, String studentName) {
        if (cgpa >= 4.50 && cgpa <= 5.00) {
            return "Congratulations " + studentName + ". You are a first class student";
        } else if (cgpa >= 3.50 && cgpa <= 4.49) {
            return "Congratulations " + studentName + ". You are a second class upper student";
        } else if (cgpa >= 2.40 && cgpa <= 3.49) {
            return "Congratulations " + studentName + ". You are a second class lower student";
        } else if (cgpa >= 1.50 && cgpa <= 2.39) {
            return "Congratulations " + studentName + ". You are a third class student";
        } else {
            return "You passed";
        }
    }
};
