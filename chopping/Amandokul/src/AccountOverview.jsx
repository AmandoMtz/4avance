import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AccountOverview.css';
import Header from './components/Header.jsx'

function AccountOverview() {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = location.state?.userInfo || { 
    nombre: 'Usuario', 
    apellidoPaterno: 'Prueba', 
    hasPaymentMethod: false,
    membership: 'No especificado',
    registrationDate: 'Fecha de prueba',
    expirationDate: 'Fecha de expiración de prueba'
  };

  const [showHelpInfo, setShowHelpInfo] = useState(false);

  const handleHelpClick = () => {
    setShowHelpInfo(!showHelpInfo);
  };

  const handleRenewMembership = () => {
    const updatedUserInfo = {
      ...userInfo,
      hasPaymentMethod: true,
      membership: 'Membresía Premium',
      expirationDate: 'Fecha de expiración de la membresía'
    };

    navigate('/renew-membership', { state: { userInfo: updatedUserInfo } });
  };

  return (
    <>
      <Header />

      <div style={{ textAlign: 'center' }}>
        <h2>Membresía Chopping</h2>
        <h3>{userInfo.nombre} {userInfo.apellidoPaterno}</h3>
        <p>Miembro desde: <strong>{userInfo.registrationDate || 'Fecha de prueba'}</strong></p>
        <p>Expira el: <strong>{userInfo.expirationDate || 'Fecha de expiración de prueba'}</strong></p>

        {userInfo.hasPaymentMethod ? (
          <div>
            <p style={{ color: 'green' }}>Estado de Membresía: <strong>{userInfo.membership || 'No especificado'}</strong></p>
            <button className="renew-button" onClick={handleRenewMembership}>Renovar Membresía</button>
          </div>
        ) : (
          <div>
            <p className="no-membership-info">No tienes una membresía premium. Considera adquirir una.</p>
            <button className="renew-button" onClick={handleRenewMembership}>Adquirir Membresía Premium</button>
          </div>
        )}
      </div>

      {showHelpInfo && (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f1f1f1', marginTop: '20px', borderRadius: '5px' }}>
          <h2>Ayuda</h2>
          <p>En <strong>Chopping</strong>, estamos aquí para ayudarte. Si tienes alguna pregunta o necesitas asistencia, puedes contactar a nuestro equipo de soporte a través de:</p>
          <p><strong>Teléfono:</strong> 123-456-7890</p>
          <p><strong>Correo electrónico:</strong> soporte@chopping.com</p>
          <p>¡No dudes en contactarnos para cualquier consulta!</p>
        </div>
      )}

      <footer>
        © 2023-2024, Chopping, Inc. o sus afiliados
      </footer>
    </>
  );
}

export default AccountOverview;
