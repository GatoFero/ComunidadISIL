import {Teacher} from "./Teacher.ts";

export interface Course {
    id?: number;
    name: string;
    teachers?: Teacher[];
}