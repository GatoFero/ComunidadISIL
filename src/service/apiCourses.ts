import { supabase } from "../supabaseClient.ts";
import {Course} from "../models/Course.ts";

export const getCourseById = async (
    id: number
) => {
    const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
    if (error) {
        console.error(error);
        return null;
    }
    return data as Course;
}

export const getCoursesByCareer = async (
    idCareer: number
) => {
    const { data, error } = await supabase
        .from('course_career')
        .select('courses(*)')
        .eq('career_id', idCareer);
    if (error) {
        console.error(error);
        return [];
    }

    return data as unknown as Course[];
}
