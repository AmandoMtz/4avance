import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentMethod.css';

function PaymentMethod() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const validateCard = () => {
    const cardNumberPattern = /^\d{16}$/; // Asegura que el número de la tarjeta tenga 16 dígitos
    const namePattern = /^[A-Za-z\s]+$/; // Asegura que el nombre del titular contenga solo letras y espacios
    const expirationPattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/AA
    const securityCodePattern = /^\d{3}$/; // 3 dígitos

    if (!cardNumberPattern.test(cardNumber)) {
      setErrorMessage('El número de tarjeta debe tener 16 dígitos.');
      return false;
    }

    if (!namePattern.test(cardHolderName)) {
      setErrorMessage('El nombre del titular solo puede contener letras y espacios.');
      return false;
    }

    if (!expirationPattern.test(expirationDate)) {
      setErrorMessage('La fecha de vencimiento debe estar en el formato MM/AA.');
      return false;
    }

    if (!securityCodePattern.test(securityCode)) {
      setErrorMessage('El código de seguridad debe tener 3 dígitos.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleContinue = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
    if (validateCard()) {
      alert('PAGO REALIZADO CORRECTAMENTE'); // Aquí puedes reemplazarlo con una ventana modal si lo prefieres
      navigate('/account'); // Navega a la vista de la cuenta después de un pago exitoso
    }
  };

  return (
    <div className="payment-container">
      <header className="payment-header">
        <h1>Chopping</h1>
      </header>
      <div className="payment-content">
        <h2>Medio de Pago</h2>
        <div className="payment-card">
          <div className="payment-option">
            <i className="icon-credit-card"></i>
            <span>Tarjeta de crédito</span>
          </div>
          <form className="payment-form" onSubmit={handleContinue}>
            <label>Número de Tarjeta</label>
            <input
              type="text"
              placeholder="1234 1234 1234 1234"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={16} // Limitar la entrada a 16 caracteres
            />

            <label>Nombre del Titular</label>
            <input
              type="text"
              placeholder="Ej: Ermenegildo Hernández"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              maxLength={30} // Limitar el nombre del titular
            />

            <div className="payment-row">
              <div className="payment-column">
                <label>Vencimiento</label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  maxLength={5} // Limitar la entrada a MM/AA
                />
              </div>
              <div className="payment-column">
                <label>Código de Seguridad</label>
                <input
                  type="text"
                  placeholder="123"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  maxLength={3} // Limitar el código de seguridad
                />
              </div>
            </div>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <div className="payment-buttons">
              <button type="submit">CONTINUAR</button>
              <button type="button" onClick={() => navigate(-1)}>CANCELAR</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
