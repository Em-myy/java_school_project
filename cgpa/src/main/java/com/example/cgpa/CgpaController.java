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

        double gradePoints = convertGrade(course.getCourseGrade());
        double totalPoints = 0;
        double totalUnits = 0;
        String message;

        for (CourseDetail course : courses) {
            totalPoints += gradePoints * course.getCourseUnit();
            totalUnits += course.getCourseUnit();
        }

        double cgpa = totalPoints / totalUnits;

        
        String formattedCgpa = String.format("%.2f", cgpa);

        return new CgpaResponse(studentName, formattedCgpa, getMessage(cgpa));
    }

    private int convertGrade(double grade) {
        if(grade >= 70 & grade <= 100) {
            return grade = 5;
        } else if (grade >= 60 & grade <= 69) {
            return grade = 4;
        } else if (grade >= 50 & grade <= 59) {
            return grade = 3;
        } else if(grade >= 40 & grade <= 49) {
            return grade = 2;
        } else if(grade >= 30 & grade <= 39) {
            return grade = 1;
        } else {
            return grade = 0;
        }
    }

    private String getMessage(double cgpa) {
        if(cgpa >= 4.50 & cgpa <= 5.00) {
            return message = "Congratulations " + studentName + ". You are a first class student";
        } else if (cgpa >= 3.50 & cgpa <= 4.49) {
            return message = "Congratulations " + studentName + ". You are a second class upper student";
        } else if(cgpa >= 2.40 & cgpa <= 3.49) {
            return message = "Congratulations " + studentName + ". You are a second class lower student";
        }
        else if(cgpa >= 1.50 & cgpa <= 2.39) {
            return message = "Congratulations " + studentName + ". You are a third class student";
        } else {
            return message = "You passed";
        }
    }
};
