import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import '../index.css';
import chopoImg from '../assets/chopo.png';

export default function SignUp() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidoMaterno: '',
        apellidoPaterno: '',
        correo: '',
        contrasena: '',
        domicilio: ''
    });
    const [verificationCode, setVerificationCode] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
                setVerificationCode(generatedCode);
                setIsRegistered(true);
                alert(`Usuario registrado con éxito. Tu código de verificación es: ${generatedCode}`);
            } else {
                const errorData = await response.json();
                alert(`Error al registrar usuario: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Error de red al registrar usuario');
        }
    };

    const handleContinue = () => {
        navigate('/verification', { state: { verificationCode } });
    };

    return (
        <>
            <header>
                <h1>Bienvenido a Chopping</h1>
            </header>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div className="form-container">
                <div className="registration-form">
                    <img src={chopoImg} alt="Logo" />
                    <h2 className="outlined-text">CREAR CUENTA</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
                        <input type="text" name="apellidoMaterno" placeholder="Apellido Materno" onChange={handleChange} required />
                        <input type="text" name="apellidoPaterno" placeholder="Apellido Paterno" onChange={handleChange} required />
                        <input type="email" name="correo" placeholder="Correo Electrónico" onChange={handleChange} required />
                        <input type="password" name="contrasena" placeholder="Contraseña" onChange={handleChange} required />
                        <input type="text" name="domicilio" placeholder="Domicilio" onChange={handleChange} required />
                        <button type="submit">Registrar</button>
                    </form>
                    {isRegistered && (
                        <div>
                            <p>Usuario registrado con éxito. Tu código de verificación es: {verificationCode}</p>
                            <button onClick={handleContinue}>Continuar</button>
                        </div>
                    )}
                    <p>Al crear una cuenta, aceptas las <a href="#">Condiciones de Uso</a> y el <a href="#">Aviso de Privacidad</a> de Chopping.</p>
                    <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
                </div>
            </div>
            </div>
            <footer>
                © 2023-2024, Chopping, Inc. o sus afiliados
            </footer>
        </>
    );
}