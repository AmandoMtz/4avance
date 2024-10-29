import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../index.css';
import robotImage from '../assets/robot.png';

function Verification() {
  const [inputCode, setInputCode] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { verificationCode } = location.state || {};
  

  const handleVerify = () => {
    if (inputCode === verificationCode) {
      alert('Código correcto');
      navigate('/identification-upload'); // Redirige a IdentificationUpload.jsx después de la verificación exitosa
    } else {
      alert('Código incorrecto');
    }
  };

  return (
    <div>
      <header>
        <h1>Bienvenido a Chopping</h1>
      </header>
      <div className="form-container">
        <div className="registration-form">
          <img src={robotImage} alt="Logo" />
          <h2 className="outlined-text">VERIFICACIÓN DE CÓDIGO</h2>
          <p>Ingresa el código de verificación que recibiste:</p>
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Código de verificación"
          />
          <button onClick={handleVerify}>Verificar</button>
        </div>
      </div>
      <footer>
        © 2023-2024, Chopping, Inc. o sus afiliados
      </footer>
    </div>
  );
}

export default Verification;
