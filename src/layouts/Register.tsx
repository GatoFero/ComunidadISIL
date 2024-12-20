import {useNavigate} from "react-router-dom";
import {signUp} from "../service/apiUsers.ts";
import {useState} from "react";
import '../assets/login.css'
import {Anchor} from "../components/options/Anchor.tsx";

export function Register(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (email !== '' || password !== '') {
            const data = await signUp(username, email, password);
            if (data) navigate('/');
        }
    };

    return (
        <div className='login'>
            <div className="login-title">
                <h1>¡Únete a la Comunidad <strong>ISIL</strong>!</h1>
                <p>Regístrate para compartir, opinar y descubrir lo que todos dicen.</p>
            </div>
            <div className="login-fields">
                <input
                    type="email"
                    placeholder="Elige un nombre único"
                    value={username}
                    onChange={e =>
                        setUsername(e.target.value)}
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
                    placeholder="Crea una contraseña segura"
                    value={password}
                    onChange={e =>
                        setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Repite tu contraseña segura"
                    value={password}
                    onChange={e =>
                        setPassword(e.target.value)}
                />
                <button
                    className={"buttonPrimary"}
                        onClick={handleRegister}
                >Crear cuenta</button>
            </div>
            <div className={"anchors"}>
                <Anchor
                    onNavigate={() => navigate("/login")}
                    textContent={"¿Ya tienes cuenta?"}
                    textPath={"Inicia sesión"}
                />
                <Anchor
                    onNavigate={() => navigate("/home")}
                    textContent={"¿Prefieres explorar primero?"}
                    textPath={"Ingresa como invitado"}
                />
            </div>
        </div>
    );
}