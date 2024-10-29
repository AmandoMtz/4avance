import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lolero22',
  database: 'chopping'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Endpoint para registrar un usuario
app.post('/api/register', async (req, res) => {
  const { nombre, apellidoMaterno, apellidoPaterno, correo, contrasena, domicilio } = req.body;

  if (!nombre || !apellidoMaterno || !apellidoPaterno || !correo || !contrasena || !domicilio) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const query = 'INSERT INTO usuarios (nombre, apellidoMaterno, apellidoPaterno, correo, contrasena, domicilio, hasPaymentMethod) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const hasPaymentMethod = false;
    db.query(query, [nombre, apellidoMaterno, apellidoPaterno, correo, hashedPassword, domicilio, hasPaymentMethod], (error, results) => {
      if (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ message: 'Error al registrar usuario' });
      }
      res.status(201).json({ message: 'Usuario registrado con éxito' });
    });
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Endpoint para iniciar sesión
app.post('/api/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
  }

  const query = 'SELECT * FROM usuarios WHERE correo = ?';
  db.query(query, [correo], async (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    const user = results[0];

    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (match) {
      res.status(200).json({
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        hasPaymentMethod: user.hasPaymentMethod,
        message: 'Inicio de sesión exitoso'
      });
    } else {
      res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }
  });
});

// Endpoint para renovar o adquirir membresía
app.post('/api/renew-membership', (req, res) => {
  const { correo } = req.body; // Asumimos que pasamos el correo del usuario

  if (!correo) {
    return res.status(400).json({ message: 'El correo es obligatorio' });
  }

  const query = 'UPDATE usuarios SET hasPaymentMethod = ? WHERE correo = ?';
  const hasPaymentMethod = true; // Indicamos que ahora tiene una membresía premium

  db.query(query, [hasPaymentMethod, correo], (error, results) => {
    if (error) {
      console.error('Error al actualizar la membresía:', error);
      return res.status(500).json({ message: 'Error al actualizar la membresía' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Membresía renovada exitosamente' });
  });
});

app.get('/api/productos', (req, res) => {
  const query = 'SELECT * FROM productos';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al consultar la tabla productos:', error);
      return res.status(500).json({ message: 'Error al obtener productos' });
    }
    res.status(200).json(results);
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
