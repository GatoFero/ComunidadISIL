import {Comment} from "./Comment";

export interface Teacher {
    id: number | null;
    firstname: string;
    lastname: string;
    qualification: number
    comments: Comment[] | null,
    course_id: number | null;
}