import {supabase} from "../supabaseClient.ts";
import {Teacher} from "../models/Teacher.ts";
import {PostgrestError} from "@supabase/supabase-js";

export const addTeacher = async (
    teacher: Teacher
): Promise<Teacher|PostgrestError> => {
    const { data, error } = await supabase
        .from('teachers')
        .insert([{
            firstname: teacher.firstname,
            lastname: teacher.lastname,
            qualification: teacher.qualification,
        }])
        .select('*')
        .single()
    if (error) {
        console.error('Error adding teachers:', error);
        return error
    }
    return data as Teacher
}
