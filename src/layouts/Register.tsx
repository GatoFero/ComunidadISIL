import '../assets/css/login.css'
import {useEffect, useState} from "react";
import {Anchor} from "../components/options/Anchor.tsx";
import {useAppContext} from "../hooks/useAppContext.tsx";
import {Select} from "../components/options/Select.tsx";
import {useUserContext} from "../hooks/useUserContext.tsx";

export function Register(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [selectedCareer, setSelectedCareer] = useState('');
    const { careers, navigate } = useAppContext();
    const { user, handleSignInvited, handleSignUp } = useUserContext();

    useEffect(() => {
        if (user)navigate('/home');
    },[navigate, user])

    return (
        <div className='login'>
            <div className="login-title">
                <h1>¡Únete a la Comunidad <strong>ISIL</strong>!</h1>
                <p>Regístrate para compartir, opinar y descubrir lo que todos dicen.</p>
            </div>
            <div className="login-fields">
                <input
                    type="text"
                    placeholder="Elige un nombre"
                    value={username}
                    onChange={e =>
                        setUsername(e.target.value)}
                />
                <Select selected={selectedCareer}
                        setSelected={setSelectedCareer}
                        purpose={"Selecciona tu carrera"}
                        options={careers}
                />
                <input
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    value={email}
                    onChange={e =>
                        setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Crea una contraseña"
                    value={password}
                    onChange={e =>
                        setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Repite tu contraseña"
                    value={passwordConfirm}
                    onChange={e =>
                        setPasswordConfirm(e.target.value)}
                />
                <button
                    className={"buttonPrimary"}
                        onClick={() =>
                            handleSignUp(email,password,passwordConfirm,username,selectedCareer)}
                >Crear cuenta</button>
            </div>
            <div className={"anchors"}>
                <Anchor
                    onNavigate={() => navigate("/login")}
                    textContent={"¿Ya tienes cuenta?"}
                    textPath={"Inicia sesión"}
                />
                <Anchor
                    onNavigate={handleSignInvited}
                    textContent={"¿Prefieres explorar primero?"}
                    textPath={"Ingresa como invitado"}
                />
            </div>
        </div>
    );
}