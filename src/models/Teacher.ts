export interface Teacher{
    id: number;
    name: string;
    qualification: number
    idCourse: number,
    comments: Comment[],
}

export interface Comment {
    idTeacher: number;
    content: string;
    qualification: number
    username: string;
}