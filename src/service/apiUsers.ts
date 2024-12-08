import {supabase} from "../supabaseClient.ts";

export const signUp = async (username: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    if (error) {
        console.error('Error al registrar usuario:', error.message);
        return null
    }
    await insertUsername(data.user?.id, username)
    console.log('Usuario registrado:', data)
    return data
}

export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Error al iniciar sesión:', error.message);
        return { error: error.message };
    }
    console.log('Usuario autenticado:', data);
    return { data };
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error al cerrar sesión:', error.message)
}

export const getUsername = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error('Error al obtener el usuario actual:', error.message);
        return null;
    }
    return await selectUsername(data.session?.user.id);
};


export const insertUsername = async (id: string | undefined, name: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .insert([
            { username: name, idUser: id },
        ])

    if (error) {
        console.error('Error al inserir usuario:', error);
        return null
    }
    console.log('Usuario registrado:', data)
    return data
}

export const selectUsername = async (id?: string): Promise<string|null> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('idUser', id)
        .single();
    if (error) {
        console.error('Error al inserir usuario:', error);
        return null
    }
    return data.username
}