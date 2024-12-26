import {supabase} from "../supabaseClient.ts";
import {ModalType} from "../utils/Enums.ts";
import {User} from "../models/User.ts";
import Cookies from 'js-cookie';
import Joy from '/joy.png'

export interface Message {
    data: User | null;
    message: string;
    type: ModalType;
}

export const signUp = async (
    email: string,
    password: string,
    username: string,
    careerId: string
) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError) {
        console.error("Error al registrar usuario:", authError.message);
        return {
            message: authError.message,
            type: ModalType.Error,
        } as Message;
    }

    if (authData.user) {
        const { error: profileError } = await supabase
            .from("profiles")
            .insert({
                username,
                user_id: authData.user?.id,
                career_id: careerId,
            });

        if (profileError) {
            console.error("Error al insertar perfil del usuario:", profileError.message);
            return {
                message: "Este correo electrónico ya está vinculado a otra cuenta.",
                type: ModalType.Error,
            } as Message;
        }

        return {
            message: "Registro realizado con éxito. Ahora puedes iniciar sesión.",
            type: ModalType.Success,
        } as Message;
    }

    return {
        message: "Error desconocido al registrar usuario",
        type: ModalType.Error,
    } as Message;
}

export const signIn = async (
    email: string, password: string
) => {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Error al iniciar sesión:', error.message);
        if (error.message === "Invalid login credentials"){
            return {
                message: "Credenciales de inicio de sesión no válidas.",
                type: ModalType.Error,
            } as Message;
        }
        if (error.message === "Email not confirmed"){
            return {
                message: "Correo electrónico no confirmado.",
                type: ModalType.Error,
            } as Message;
        }
        return {
            message: error.message,
            type: ModalType.Error,
        } as Message;
    }

    let savedUser: User = {};

    if (authData) {
        const { data, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', authData.user.id)
            .single();

        if (profileError) {
            console.error('Error al obtener el perfil:', profileError.message);
            return {
                message: "Error al obtener el perfil del usuario.",
                type: ModalType.Error,
            } as Message;
        }

        savedUser = {
            id: data.id,
            email: authData.user.email,
            username: data.username,
            career_id: data.career_id,
            picture: data.picture? data.picture : Joy,
            user_id: authData.user.id,
        };
    }
    return {
        data: savedUser,
        message: "Usuario autenticado exitosamente.",
        type: ModalType.Success,
    } as Message;
}

export const signInvited = () => {
    const existingUser = Cookies.get('user');
    if (existingUser) {
        const user = JSON.parse(existingUser);
        if (user.email) {
            return {
                message: "Ya estás autenticado como usuario.",
                type: ModalType.Error,
            } as Message;
        }
    }
    return {
        message: "Ingresaste como invitado. Disfruta tu estadía en Comunidad ISIL." +
            " Si quieres compartir tus opiniones o experiencias, debes autenticarte.",
        type: ModalType.Success,
    } as Message;
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error){
        console.error('Error al cerrar sesión:', error.message)
        return {
            message: 'Error al cerrar sesión.',
            type: ModalType.Error
        } as Message;
    }

    Cookies.remove('user');
    return {
        message: "Se cerro la sesion exitosamente.",
        type: ModalType.Success,
    } as Message;
}