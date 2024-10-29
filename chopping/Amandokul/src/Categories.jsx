import React from 'react';
import { Link } from 'react-router-dom';
import robotImage from './assets/robot.png';
import buscarImage from './assets/buscar.png';
import licuadoraImage from './assets/licuadora.png';
import calzadoImage from './assets/Calzado.png';
import playeraImage from './assets/Playera.png';
import mandoImage from './assets/Mando.png';
import laptopImage from './assets/Laptop.png'; // Importa la imagen con el nombre correcto
import './Categories.css';

function Categories() {
  return (
    <div className="categories-container">
      {/* Contenedor superior independiente con fondo amarillo */}
      <div className="header-top">
        <img src={robotImage} alt="Robot" className="robot-image" />
        <h1 className="chopping-title">Chopping</h1>
        <div className="search-container">
          <input type="text" placeholder="Buscar productos..." className="search-input" />
          <img src={buscarImage} alt="Buscar" className="search-icon" />
        </div>
      </div>

      {/* Barra de navegación */}
      <nav className="categories-nav">
        <Link to="/">Crear Cuenta</Link>
        <Link to="/login">Ingresar</Link>
        <Link to="/categories">Categorías</Link>
        <Link to="/account">Mi Cuenta</Link>
        <Link to="/promotions">Promociones</Link>
        <Link to="/best-sellers">Lo más vendidos</Link>
        <Link to="/help">Ayuda</Link>
      </nav>

      {/* Sección Computación */}
      <div className="computacion-header">
        <h2 className="computacion-main-title">COMPUTACIÓN</h2>
        <img src={laptopImage} alt="Laptop Icon" className="laptop-image" /> {/* Imagen al lado derecho */}
        <div className="computacion-discounts">
          <div className="discount-box">
            HASTA 30% DE DESCUENTO
          </div>
          <div className="warranty-box">
            HASTA GARANTÍA DE 2 AÑOS
          </div>
        </div>
      </div>

      {/* Contenido principal de categorías */}
      <div className="categories-section">
        <h2 className="section-title">Categorías</h2>
        <div className="categories-list">
          {/* Contenedor para las categorías individuales */}
          <div className="category-item">
            <div className="category-container">
              <img src={licuadoraImage} alt="Licuadora" />
              <div className="category-text">Electrodomésticos</div>
            </div>
          </div>
          <div className="category-item">
            <div className="category-container">
              <img src={calzadoImage} alt="Calzado" />
              <div className="category-text">Calzado</div>
            </div>
          </div>
          <div className="category-item">
            <div className="category-container">
              <img src={playeraImage} alt="Ropa" />
              <div className="category-text">Ropa</div>
            </div>
          </div>
          <div className="category-item">
            <div className="category-container">
              <img src={mandoImage} alt="Videojuegos" />
              <div className="category-text">Videojuegos</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="categories-footer">
        © 2023-2024, Chopping, Inc. o sus afiliados
      </footer>
    </div>
  );
}

export default Categories;
