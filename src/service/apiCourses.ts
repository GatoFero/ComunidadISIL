import { supabase } from "../supabaseClient.ts";
import {PostgrestError} from "@supabase/supabase-js";
import {CourseData, CourseInfo} from "../models/Course.ts";

export const getAllCourses = async (): Promise<CourseInfo[]|PostgrestError> => {
    const { data, error } = await supabase.rpc('get_courses_with_counts');
    if (error) {
        console.error('Error fetching courses:', error.message);
        return error;
    }
    return data as CourseInfo[];
};

export const getCourse = async (
    id: number
): Promise<CourseData|PostgrestError> => {
    const { data, error } = await supabase
        .from('courses')
        .select(`
            id,
            name,
            teachers (
                firstname,
                lastname,
                qualification,
                comments (
                    content,
                    qualification,
                    username
                )
            )
        `)
        .eq('id', id)
        .single();
    if (error) {
        console.error('Error fetching profesores:', error);
        return error;
    }
    return data as CourseData;
}
