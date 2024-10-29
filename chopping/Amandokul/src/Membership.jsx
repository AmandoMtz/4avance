import React from 'react';
import { useNavigate } from 'react-router-dom';
import robotImage from './assets/robot.png';
import './Membership.css';

function Membership() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/payment');
  };

  const handleCancel = () => {
    navigate(-1); // Regresa a la pestaña anterior
  };

  const handleContinueWithoutPremium = () => {
    const defaultUserInfo = {
      nombre: "Usuario",
      apellidoPaterno: "Prueba", // Puedes cambiar esto a lo que desees
      registrationDate: "Fecha no disponible",
      expirationDate: "Fecha no disponible",
      hasPaymentMethod: false,
      membership: "Membresía Básica"
    };

    navigate('/account', { state: { userInfo: defaultUserInfo } });
  };

  return (
    <div className="membership-container">
      <header className="membership-header">
        <h1>Chopping</h1>
      </header>
      <div className="membership-content">
        <img src={robotImage} alt="Robot" className="membership-logo" />
        <h2 className="membership-benefits">OBTEN BENEFICIOS EXCLUSIVOS AL SER MIEMBRO CHOPPING</h2>

        <button className="membership-main-button">MEMBRESÍA CHOPPING</button>

        <div className="membership-card">
          <div className="membership-card-icon-container">
            <img src={robotImage} alt="Premium" className="membership-card-icon" />
          </div>
          <div className="membership-details">
            <h3>PREMIUM</h3>
            <p className="membership-price">$49.90/mes</p>
            <ul className="membership-benefit-list">
              <li>✅ Descuentos exclusivos.</li>
              <li>✅ Acceso anticipado.</li>
              <li>✅ Recompensas exclusivas.</li>
              <li>✅ Atención al cliente prioritaria.</li>
              <li>✅ Ofertas relámpago.</li>
            </ul>
          </div>
        </div>

        <div className="membership-actions">
          <button className="membership-continue" onClick={handleContinue}>Continuar</button>
          <button className="membership-continue-without-premium" onClick={handleContinueWithoutPremium}>Continuar Sin Premium</button>
          <button className="membership-cancel" onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default Membership;
