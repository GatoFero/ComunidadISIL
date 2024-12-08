import {useNavigate} from "react-router-dom";
import {signUp} from "../service/apiUsers.ts";
import {useState} from "react";
import '../assets/login.css'
import {Logo} from "./Logo.tsx";

export const Register = () => {
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
            <Logo style={'logo2'}/>
            <h1>Regístrate</h1>
            <input
                type="email" placeholder="Nombre de usuario" value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="email" placeholder="Correo Electrónico" value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password" placeholder="Contraseña" value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Registrase</button>
        </div>
    );
}