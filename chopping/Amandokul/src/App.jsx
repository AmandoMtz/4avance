import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './index.css';
import robotImage from './assets/robot.png';
import Login from './pages/Login.jsx';
import Verification from './pages/Verification.jsx';
import IdentificationUpload from './pages/IdentificationUpload.jsx';
import Membership from './Membership.jsx';
import PaymentMethod from './PaymentMethod.jsx';
import AccountOverview from './AccountOverview.jsx';
import Categories from './Categories.jsx';
import Promotions from './Promotions.jsx'; // Importar el componente Promotions
import RenovarMembresia from './RenovarMembresia.jsx'; // Importar el nuevo componente
import Products from './Products.jsx'; // Importar Products.jsx
import PruebaUI from './pruebaUI/PruebaUI.jsx'
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';


// Componente de Registro
function Registration() {
  // Estado para el formulario
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
    <div>
      <header>
        <h1>Bienvenido a Chopping</h1>
      </header>
      <div className="form-container">
        <div className="registration-form">
          <img src={robotImage} alt="Logo" />
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
      <footer>
        © 2023-2024, Chopping, Inc. o sus afiliados
      </footer>
    </div>
  );
}

// Componente Principal
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/identification-upload" element={<IdentificationUpload />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/account" element={<AccountOverview />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/renew-membership" element={<RenovarMembresia />} />
        <Route path="/products" element={<Products />} /> {/* Nueva ruta para Products */}
        <Route path="/pruebas" element={<PruebaUI />} /> {/* Nueva ruta para Products */}
      </Routes>
    </Router>
  );
}

export default App;
