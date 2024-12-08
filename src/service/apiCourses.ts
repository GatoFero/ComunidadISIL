import { supabase } from "../supabaseClient.ts";
import {Course} from "../models/Course.ts";

export const fetchCourses = async (
    setCourses: (courses: Course[]) => void,
    setError: (error: string) => void
): Promise<void> => {
    const { data, error } = await supabase.from('courses').select('*').limit(11);

    if (error) {
        console.error('Error fetching courses:', error.message);
        setError('Error al cargar los cursos.');
        setCourses([]);
        return;
    }

    if (data) {
        setCourses(data);
    }
};

export const fetchCourse = async (
    id: number,
    setCourse: (course: Course) => void,
): Promise<void> => {
    const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
    if (error) {
        console.error('Error fetching profesores:', error);
        return;
    }
    if (data) setCourse(data);
}
