import React from "react";
import {Course} from "../models/Course.ts";
import {useNavigate} from "react-router-dom";

interface CourseItemProps {
    course: Course;
}

export const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(`/course/${course.id}`)}>
            {course.name}
        </button>
    )
}