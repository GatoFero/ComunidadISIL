import { useState } from 'react';
import {signIn} from "../service/apiUsers.ts";
import {useNavigate} from "react-router-dom";
import {Modal} from "../components/modales/Modal.tsx";
import '../assets/login.css'
import {Logo} from "./Logo.tsx";

export const AuthForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleAuth = async () => {
        if (email !== '' && password !== '') {
            const { data, error: signInError } = await signIn(email, password);
            if (signInError) {
                setError(signInError);
                setShowModal(true);
            } else if (data) {
                navigate('/welcome');
            }
        } else {
            setError('Email o contraseña no proporcionados.');
            setShowModal(true)
        }
    };

    return (
        <div className="login">
            <Logo style={'logo2'}/>
            <h1 style={{marginTop: '30px'}}>Iniciar Sesión</h1>
            <input
                type="email" placeholder="Correo Electrónico" value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password" placeholder="Contraseña" value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <div className="login-button">
                <button onClick={handleAuth}>Ingresar</button>
                <button onClick={() => navigate('/register')}>Registrarse</button>
            </div>
            {showModal && <Modal message={error} onClose={() => setShowModal(false)}/>}
        </div>
    );
};
