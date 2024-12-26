import {supabase} from "../supabaseClient.ts";
import {Career} from "../models/Career.ts";

export const getCareerById = async (
    id: number
) => {
    const { data, error } = await supabase
        .from('careers')
        .select('*')
        .eq('id', id)
        .single();
    if (error) {
        console.error(error);
        return error;
    }
    return data as Career;
}

export const getAllCareers = async () => {
    const { data, error } = await supabase
        .from('careers')
        .select('*');
    if (error) {
        console.log(error);
        return [];
    }
    return data as Career[];
}