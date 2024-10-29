import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import robotImage from '../assets/robot.png';
import '../Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Logging in with', email, password);

        // Aquí puedes agregar la lógica de autenticación
        const isLoggedIn = true; // Actualiza esto con tu lógica de autenticación real

        if (isLoggedIn) {
            navigate('/');
        } else {
            alert('Error al iniciar sesión');
        }
    };

    return (
        <div className="login-container">
            <header className="header-container">
                <h1>Chopping</h1>
            </header>

            <div className="login-form">
                <img src={robotImage} alt="Robot" className="robot-image" />
                <h1 className="outlined-text">INICIAR SESIÓN</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="submit-button">Continuar</button>
                </form>
                <p className="terms-text">
                    Al continuar, aceptas las <a href="#">Condiciones de Uso</a> y el <a href="#">Aviso de Privacidad</a> de Chopping.
                </p>
                <p className="register-text">
                    ¿Eres nuevo? <Link to="/">Regístrate</Link>
                </p>
            </div>

            <footer className="footer-text">© 2023-2024, Chopping, Inc. o sus afiliados</footer>
        </div>
    );
}

export default Login;
