import {supabase} from "../supabaseClient.ts";
import {Teacher} from "../models/Teacher.ts";

export const fetchTeachersByCourse = async (
    id: number,
    setTeachers: (teachers: Teacher[]) => void,
) => {
    const { data, error } = await supabase
        .from('teachers')
        .select('*, comments(*)')
        .eq('idCourse', id)
    if (error) {
        console.error('Error fetching teachers:', error);
        return
    }
    console.log('Teachers data:', data);
    if (data) setTeachers(data.reverse())
}

export const addTeacher = async (
    idCourse: number, name: string
) => {
    const { data, error } = await supabase
        .from('teachers')
        .insert([{
            idCourse, name
        }])
    if (error) {
        console.error('Error adding teachers:', error);
        return
    }
    console.log('Teachers data:', data);
}