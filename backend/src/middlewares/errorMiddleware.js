/**
 * Manejador de errores centralizado para Express.
 * Captura errores lanzados en los controladores y envía una respuesta JSON consistente.
 */
const errorHandler = (err, req, res, next) => {
    // Si el error no tiene un código de estado, usamos 500 (Error del servidor)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        message: err.message,
        // Solo mostramos el stack trace en desarrollo por seguridad
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        success: false
    });
};

/**
 * Middleware para capturar errores 404 (Rutas no encontradas)
 */
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

module.exports = { errorHandler, notFound };
