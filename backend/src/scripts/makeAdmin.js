const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Cargar configuración ---
// Cargamos las variables de entorno
dotenv.config();

// --- Verificar Input ---
// ¿Nos dio el usuario un email? Leemos el argumento de la terminal.
// process.argv[2] es el tercer argumento "node script.js <ARGUMENTO>"
const email = process.argv[2];
if (!email) {
    console.error('⚠️ Ups! Olvidaste poner el email.');
    console.error('Uso correcto: node src/scripts/makeAdmin.js usuario@ejemplo.com');
    process.exit(1);
}

const makeAdmin = async () => {
    try {
        // --- Conectar a Base de Datos ---
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🔌 Conectado a MongoDB...');

        // --- Buscar usuario por email ---
        const user = await User.findOne({ email });

        if (!user) {
            console.error(`❌ No encontré ningún usuario con el email: ${email}`);
            process.exit(1);
        }

        // Cambiamos su rol.
        user.role = 'admin';
        await user.save();

        console.log(`✅ ¡Éxito! El usuario ${user.username} (${user.email}) ahora es un ADMINISTRADOR.`);

        // Cerramos el proceso limpiamente
        process.exit();
    } catch (error) {
        console.error('💥 Algo salió mal:', error);
        process.exit(1);
    }
};

makeAdmin();
