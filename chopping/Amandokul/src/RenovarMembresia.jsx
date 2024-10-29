import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import robotImage from './assets/robot.png';
import './RenovarMembresia.css';

function RenovarMembresia() {
  const navigate = useNavigate();
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const handleContinue = () => {
    // Aquí puedes agregar la lógica para procesar el pago

    // Simulando un pago exitoso
    setPaymentSuccessful(true);
    alert('Renovación de membresía realizada correctamente.');

    // Obtener la fecha actual y la fecha de expiración
    const today = new Date();
    const registrationDate = today.toLocaleDateString('es-ES'); // Formato: dd/mm/yyyy
    const expirationDate = new Date(today);
    expirationDate.setMonth(expirationDate.getMonth() + 1); // Sumar 1 mes
    const formattedExpirationDate = expirationDate.toLocaleDateString('es-ES'); // Formato: dd/mm/yyyy

    const updatedUserInfo = {
      membership: 'Premium',
      hasPaymentMethod: true,
      registrationDate: registrationDate,
      expirationDate: formattedExpirationDate,
    };

    navigate('/account', { state: { userInfo: updatedUserInfo } });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="renovar-membresia-container">
      <header className="renovar-header">
        <h1>Chopping</h1>
      </header>
      <div className="renovar-content">
        <img src={robotImage} alt="Robot" className="renovar-logo" />
        <h2 className="renovar-title">RENOVAR O ADQUIRIR MEMBRESÍA</h2>
        <p>Asegúrate de que tu información de pago esté actualizada para evitar interrupciones en tu servicio.</p>

        <div className="renovar-card">
          <div className="renovar-card-icon-container">
            <img src={robotImage} alt="Premium" className="renovar-card-icon" />
          </div>
          <div className="renovar-details">
            <h3>MEMBRESÍA PREMIUM</h3>
            <p className="renovar-price">$49.90/mes</p>
            <ul className="renovar-benefit-list">
              <li>✅ Descuentos exclusivos.</li>
              <li>✅ Acceso anticipado.</li>
              <li>✅ Recompensas exclusivas.</li>
              <li>✅ Atención al cliente prioritaria.</li>
              <li>✅ Ofertas relámpago.</li>
            </ul>
          </div>
        </div>

        <div className="renovar-actions">
          <button className="renovar-continue" onClick={handleContinue}>Continuar</button>
          <button className="renovar-cancel" onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default RenovarMembresia;
