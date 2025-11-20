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
            totalPoints += course.getCourseGrade() * course.getCourseUnit();
            totalUnits += course.getCourseUnit();
        }

        double cgpa = totalPoints / totalUnits;
        // Round to 2 decimal places
        String formattedCgpa = String.format("%.2f", cgpa);

        return new CgpaResponse(studentName, formattedCgpa);
    }
};
