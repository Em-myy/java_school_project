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
        if((Double.parseDouble(grade)>= 70 & Double.parseDouble(grade) <= 100) | (Double.parseDouble(grade) == 5) | (grade == "A") | (grade == "a")) {
            return grade = (double) 5;
        } else if ((Double.parseDouble(grade) >= 60 & Double.parseDouble(grade) <= 69) | (Double.parseDouble(grade) == 4) | (grade == "B") | (grade == "b")) {
            return grade = (double) 4;
        } else if ((Double.parseDouble(grade) >= 50 & Double.parseDouble(grade) <= 59) | (Double.parseDouble(grade) == 3) | (grade == "C") | (grade == "c")) {
            return grade = (double) 3;
        } else if((Double.parseDouble(grade) >= 40 & Double.parseDouble(grade) <= 49) | (Double.parseDouble(grade) == 2) | (grade == "D") | (grade == "d")) {
            return grade = (double) 2;
        } else if((Double.parseDouble(grade) >= 30 & Double.parseDouble(grade) <= 39) | (Double.parseDouble(grade) == 1) | (grade == "E") | (grade == "e")) {
            return grade = (double) 1;
        } else if((Double.parseDouble(grade) >= 6 & Double.parseDouble(grade) <= 29) | (Double.parseDouble(grade) == 0) | (grade == "F") | (grade == "f")) {
            return grade = (double) 0;
        } else {
            return grade = (double) 0;
        }
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
