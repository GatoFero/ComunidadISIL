import {useEffect, useState} from 'react';
import '../assets/css/login.css'
import {Anchor} from "../components/options/Anchor.tsx";
import {useAppContext} from "../hooks/useAppContext.tsx";
import {useUserContext} from "../hooks/useUserContext.tsx";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { navigate } = useAppContext();
    const { user, handleSignIn, handleSignInvited } = useUserContext();

    useEffect(() => {
        if (user)navigate('/home');
    },[navigate, user])
    
    return (
        <div className="login">
            <div className="login-title">
                <h1>¡Bienvenido a Comunidad <strong>ISIL</strong>!</h1>
                <p>Accede a tu cuenta y enterate de todo lo que pasa en nuestro instituto.</p>
            </div>
            <div className="login-fields">
                <input
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    value={email}
                    onChange={e =>
                        setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Introduce tu contraseña"
                    value={password}
                    onChange={e =>
                        setPassword(e.target.value)}
                />
                <button className={"buttonPrimary"}
                        onClick={() =>
                            handleSignIn(email,password,'/home')}
                >Acceder</button>
            </div>
            <div className="anchors">
                <Anchor
                    onNavigate={() => navigate("/register")}
                    textContent="¿Eres nuevo por aquí?"
                    textPath="Regístrate en segundos."
                />
                <Anchor
                    onNavigate={handleSignInvited}
                    textContent="¿Estás de chismoso?"
                    textPath="Ingresa como Invitado"
                />
            </div>
        </div>
    )
}