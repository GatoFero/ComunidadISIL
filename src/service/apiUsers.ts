import {supabase} from "../supabaseClient.ts";
import {User} from "../models/User.ts";

export const signUp = async (
    username: string, email: string, password: string
) => {
    const exist = await existUsername(username);

    if (exist) return 'El usuario ya existe.';

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) {
        console.error('Error al registrar usuario:', error.message);
        return error.message;
    }

    if (data?.user?.id) await addUsername(data.user.id, username);
    else {
        console.error('No se pudo obtener el ID del usuario');
        return 'Error al obtener el ID del usuario.';
    }

    console.log('Usuario registrado:', data);
    return 'Usuario registrado con éxito.';
}

export const signIn = async (
    email: string, password: string
) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Error al iniciar sesión:', error.message);
        return error.message;
    }
    console.log('Usuario autenticado:', data);
    return await getUser()
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error al cerrar sesión:', error.message)
}

export const getUser = async (): Promise<User | null> => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error('Error al obtener el usuario actual:', error.message);
        return null;
    }

    const user: User = {
        email: '',
        username: '',
        id: ''
    };

    if (data?.session?.user.id) {
        const username = await getUsername(data.session.user.id);
        user.email = data.session.user.email;
        user.id = data.session.user.id;
        user.username = username || '';
    }

    return user;
};

export const addUsername = async (
    id: string, username: string
) => {
    const { error } = await supabase
        .from('profiles')
        .insert([{ username, user_id: id }])

    if (error) {
        console.error('Error al insertar usuario:', error);
        return error.message;
    }
    console.log('Usuario registrado.')
}

export const getUsername = async (
    id?: string
) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('user_id', id)
        .single();
    if (error) {
        console.error('Error al inserir usuario:', error);
        return null
    }
    return data?.username || null
}

export const existUsername = async (
    username: string
): Promise<boolean> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single()
    if (error) {
        console.error('Error al buscar username', error)
        return false
    }
    return !!data
}