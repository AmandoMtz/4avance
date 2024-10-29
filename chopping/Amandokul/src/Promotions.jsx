import React from 'react'; 
import { Link } from 'react-router-dom';
import robotImage from './assets/robot.png';
import buscarImage from './assets/buscar.png';
import promoImage1 from './assets/promo1.png';
import promoImage2 from './assets/promo2.png';
import promoImage3 from './assets/promo3.png';
import tienda1 from './assets/tienda1.png';
import tienda2 from './assets/tienda2.png';
import tienda3 from './assets/tienda3.png';
import './Promotions.css';

function Promotions() {
  return (
    <div className="promotions-container">
      <div className="header-top">
        <img src={robotImage} alt="Robot" className="robot-image" />
        <h1 className="chopping-title">Chopping</h1>
        <div className="search-container">
          <input type="text" placeholder="Buscar productos..." className="search-input" />
          <img src={buscarImage} alt="Buscar" className="search-icon" />
        </div>
      </div>

      <nav className="promotions-nav">
        <Link to="/">Crear Cuenta</Link>
        <Link to="/login">Ingresar</Link>
        <Link to="/categories">Categorías</Link>
        <Link to="/account">Mi Cuenta</Link>
        <Link to="/promotions">Promociones</Link>
        <Link to="/best-sellers">Lo más vendidos</Link>
        <Link to="/help">Ayuda</Link>
      </nav>

      <div className="promotions-section">
        <h2 className="section-title">Encuentra tus marcas favoritas</h2>
        <div className="promotions-list">
          <div className="image-container">
            <img src={promoImage1} alt="Promo 1" />
          </div>
          <div className="image-container">
            <img src={promoImage2} alt="Promo 2" />
          </div>
          <div className="image-container">
            <img src={promoImage3} alt="Promo 3" />
          </div>
        </div>
      </div>

      <div className="featured-stores">
        <h2 className="featured-stores-title">TIENDAS DESTACADAS</h2>
        <div className="store-cards">
          <div className="store-card">
            <img src={tienda1} alt="Tienda 1" className="store-image" />
            <h3>PLAY'S FUN GAMER</h3>
            <p>4.96/5</p>
            <p>+10,000 COMPRAS</p>
          </div>
          <div className="store-card">
            <img src={tienda2} alt="Tienda 2" className="store-image half-size" />
            <h3>GAMER SHOP</h3>
            <p>4.95/5</p>
            <p>+10,000 COMPRAS</p>  
          </div>
          <div className="store-card">
            <img src={tienda3} alt="Tienda 3" className="store-image half-size" />
            <h3>SPORTS GAMER</h3>
            <p>4.94/5</p>
            <p>+9,000 COMPRAS</p>
          </div>
        </div>
      </div>

      <footer className="promotions-footer">
        © 2023-2024, Chopping, Inc. o sus afiliados
      </footer>
    </div>
  );
}

export default Promotions;
