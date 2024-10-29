import React, { useEffect, useState } from 'react'; 
import './Products.css';
import Header from './components/Header.jsx';

export default function Products() {
  const [productos, setProductos] = useState([]);
  const [precioFiltro, setPrecioFiltro] = useState("Todos");
  const [cantidadFiltro, setCantidadFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  // Productos adicionales para mostrar
const additionalProducts = [
  { productoId: 21, nombre: "Producto Extra 1", descripcion: "Descripción del producto extra 1", precio: 25.99, imagenUrl: "extra1.png" },
  { productoId: 22, nombre: "Producto Extra 2", descripcion: "Descripción del producto extra 2", precio: 150.00, imagenUrl: "extra2.png" },
  { productoId: 23, nombre: "Producto Extra 3", descripcion: "Descripción del producto extra 3", precio: 75.00, imagenUrl: "extra3.png" },
  { productoId: 24, nombre: "Producto Extra 4", descripcion: "Descripción del producto extra 4", precio: 60.00, imagenUrl: "extra4.png" },
  { productoId: 25, nombre: "Producto Extra 5", descripcion: "Descripción del producto extra 5", precio: 45.50, imagenUrl: "extra5.png" },
  { productoId: 26, nombre: "Producto Extra 6", descripcion: "Descripción del producto extra 6", precio: 30.00, imagenUrl: "extra6.png" },
  { productoId: 27, nombre: "Producto Extra 7", descripcion: "Descripción del producto extra 7", precio: 90.00, imagenUrl: "extra7.png" },
  { productoId: 28, nombre: "Producto Extra 8", descripcion: "Descripción del producto extra 8", precio: 110.00, imagenUrl: "extra8.png" },
  { productoId: 29, nombre: "Producto Extra 9", descripcion: "Descripción del producto extra 9", precio: 20.00, imagenUrl: "extra9.png" },
  { productoId: 30, nombre: "Producto Extra 10", descripcion: "Descripción del producto extra 10", precio: 150.00, imagenUrl: "extra10.png" },
  { productoId: 31, nombre: "Producto Extra 11", descripcion: "Descripción del producto extra 11", precio: 300.00, imagenUrl: "extra11.png" },
  { productoId: 32, nombre: "Producto Extra 12", descripcion: "Descripción del producto extra 12", precio: 400.00, imagenUrl: "extra12.png" },
];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/productos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error al obtener productos: ${response.statusText}`);
        }

        const data = await response.json();

        // Aquí combina los productos obtenidos con los adicionales.
        const allProducts = [...data, ...additionalProducts];
        
        // Configura productos y productosFiltrados con todos los productos.
        setProductos(allProducts);
        setProductosFiltrados(allProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const aplicarFiltros = () => {
    let filtrados = productos;

    if (precioFiltro !== "Todos") {
      filtrados = filtrados.filter((producto) => {
        const precio = producto.precio;
        switch (precioFiltro) {
          case "$0 - $100":
            return precio <= 100;
          case "$100 - $200":
            return precio > 100 && precio <= 200;
          case "$200 - $500":
            return precio > 200 && precio <= 500;
          case "$500+":
            return precio > 500;
          default:
            return true;
        }
      });
    }

    if (cantidadFiltro !== "Todos") {
      // Agrega aquí el filtro de cantidad si es necesario
    }

    if (busqueda) {
      filtrados = filtrados.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setProductosFiltrados(filtrados);
  };

  const limpiarFiltros = () => {
    setPrecioFiltro("Todos");
    setCantidadFiltro("Todos");
    setBusqueda("");
    setProductosFiltrados(productos);
  };

  return (
    <>
      <div className="products-page">
        <Header />

        <main className="products-main">
          <aside className="filters-section">
            <h2>Filtrar por</h2>
            <label>Rango de precios:
              <select value={precioFiltro} onChange={(e) => setPrecioFiltro(e.target.value)}>
                <option>Todos</option>
                <option>$0 - $100</option>
                <option>$100 - $200</option>
                <option>$200 - $500</option>
                <option>$500+</option>
              </select>
            </label>
            <label>Cantidad disponible:
              <select value={cantidadFiltro} onChange={(e) => setCantidadFiltro(e.target.value)}>
                <option>Todos</option>
                <option>1 - 10</option>
                <option>11 - 20</option>
                <option>21 - 50</option>
                <option>50+</option>
              </select>
            </label>
            <div className="filter-buttons">
              <button className="apply-filters" onClick={aplicarFiltros}>Aplicar filtros</button>
              <button className="apply-filters" onClick={limpiarFiltros}>Mostrar todos</button>
            </div>
          </aside>

          <section className="products-list">
            {productosFiltrados.map((producto) => (
              <div key={producto.productoId} className="product-card">
                <img src={`/public/${producto.imagenUrl}`} alt={producto.nombre} className="product-image" />
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p className="product-price">${producto.precio}</p>
                <button className="add-to-cart">Agregar al carrito</button>
              </div>
            ))}
          </section>
        </main>

        <footer className="footer">
          © 2023-2024, Chopping, Inc. o sus afiliados
        </footer>
      </div>
    </>
  );
}
