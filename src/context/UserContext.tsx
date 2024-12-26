import {User} from "../models/User.ts";
import {createContext, ReactNode, useEffect, useState} from "react";
import {signIn, signInvited, signOut, signUp} from "../service/apiUsers.ts";
import {ModalType} from "../utils/Enums.ts";
import {useAppContext} from "../hooks/useAppContext.tsx";
import Cookies from "js-cookie";

interface UserContextType {
    user: User | null;
    handleSignIn: (
        email: string, password: string, navigateDirection: string
    ) =>  Promise<void>;
    handleSignUp: (
        email: string, password: string, confirmPassword: string ,
        username: string, career: string
    ) => Promise<void>;
    handleSignOut: () => Promise<void>;
    handleSignInvited: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<
    UserContextType | undefined
>(undefined)

export function UserProvider(
    {children} : {children: ReactNode}
) {
    const [user, setUser] = useState<User | null>(null);
    const { navigate, toggleModalStatus } = useAppContext();

    const handleSignIn = async (
        email: string,
        password: string,
        navigateDirection: string
    ) => {
        const result = await signIn(email, password);
        if (result.type === ModalType.Success) {
            navigate(navigateDirection)
            setUser(result.data)
            Cookies.set('user', JSON.stringify(result.data), {
                expires: 7, secure: true, sameSite: 'Strict'
            });
            console.log('Usuario autenticado:', result.data);
            return
        }
        toggleModalStatus(true, {
            title: "Error",
            message: result.message,
            type: ModalType.Error,
            onClose: () => toggleModalStatus(false),
        })
    }

    const handleSignUp = async (
        email: string, password: string, confirmPassword: string,
        username: string, career: string
    ) => {
        const errors: { [key: string]: string } = {};
        if (!username.trim()) errors.username = "El nombre de usuario es obligatorio.";
        if (!career.trim()) errors.selectedCareer = "Debe seleccionar una carrera.";
        if (!email.trim()) errors.email = "El correo electrónico es obligatorio.";
        else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.email = "El formato del correo electrónico es incorrecto.";
            }
        }
        if (!password.trim()) errors.password = "La contraseña es obligatoria.";
        if (!confirmPassword.trim()) errors.passwordConfirm = "La confirmación de la contraseña es obligatoria.";
        if (password && confirmPassword && password !== confirmPassword) errors.passwordMatch = "Las contraseñas no coinciden.";

        if (Object.keys(errors).length > 0) {
            const errorMessages = Object.values(errors).join(`\n`)
            toggleModalStatus(true, {
                title: 'Error',
                message: `Por favor, corrige lo siguiente:\n${errorMessages}`, // Unir los mensajes de error
                type: ModalType.Error,
                onClose: () => toggleModalStatus(false),
            });
        } else {
            const result = await signUp(
                email, password, username, career);
            toggleModalStatus(true, {
                title: result.type === ModalType.Success ? 'Éxito' : 'Error',
                message: result.message,
                type: result.type,
                onClose: () => {
                    toggleModalStatus(false);
                    if (result.type === ModalType.Success) {
                        navigate('/');
                    }
                },
            });
        }
    }

    const handleSignOut = async () => {
        if (user){
            const result = await signOut()
            if (result.type === ModalType.Error) {
                toggleModalStatus(true, {
                    title: "Error",
                    type: ModalType.Error,
                    message: "Error cerrar sesión.",
                    onClose: () => toggleModalStatus(false)
                })
                return
            }
            setUser(null);
            Cookies.remove('user');
            toggleModalStatus(true, {
                title: "Éxito",
                type: ModalType.Success,
                message: "Se cerro la sesión exitosamente.",
                onClose: () => {
                    toggleModalStatus(false)
                    navigate('/')
                }
            })
        }
        navigate("/")
    }

    const handleSignInvited = () => {
        const result = signInvited();
        if (result.type === ModalType.Error) {
            toggleModalStatus(true, {
                title: "Error",
                type: ModalType.Error,
                message: result.message,
                onClose: () => toggleModalStatus(false),
            })
            return
        }
        if (user){
            setUser(null);
            Cookies.remove('user');
        }
        navigate('/home')
        toggleModalStatus(true, {
            title: "Éxito",
            type: ModalType.Success,
            message: result.message,
            onClose: () => {
                toggleModalStatus(false)
            }
        })
    }

    useEffect(() => {
        if (!user){
            const storedUser = Cookies.get('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, [user, setUser]);

    return(
        <UserContext.Provider value={{
            user,
            handleSignIn,
            handleSignUp,
            handleSignOut,
            handleSignInvited
        }}>
            {children}
        </UserContext.Provider>
    )
}