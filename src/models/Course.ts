import {Teacher} from "./Teacher.ts";

export interface CourseInfo {
    id: number;
    name: string;
    teacher_count?: number;
    comment_count?: number;
}

export interface CourseData extends CourseInfo{
    teachers: Teacher[];
}