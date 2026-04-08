const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

// Load env vars
// Cargar variables de entorno desde el archivo .env (vital para seguridad y configuración)
dotenv.config();

const app = express();
const connectDB = require('./config/db');

// Conectar a la base de datos (MongoDB)
// Esta función inicia la conexión con los credenciales definidos en .env
connectDB();

// Middleware
// Helmet ayuda a proteger la app configurando varios encabezados HTTP de seguridad
app.use(helmet());
// Habilita CORS para permitir peticiones desde el Frontend (React)
app.use(cors());
// Permite al servidor entender y procesar JSON en las peticiones (req.body)
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Marketplace API 🚀' });
});

// Routes Import
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Custom Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

