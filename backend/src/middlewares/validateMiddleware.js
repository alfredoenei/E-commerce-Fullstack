/**
 * Middleware para validar el cuerpo de la petición contra un esquema de Zod.
 * @param {import('zod').ZodSchema} schema - El esquema de Zod para validar.
 */
const validate = (schema) => (req, res, next) => {
    try {
        // Validamos el body de la petición
        schema.parse(req.body);
        next();
    } catch (error) {
        // Si hay errores de validación, los formateamos y pasamos al errorHandler
        const errors = error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
        }));
        
        res.status(400);
        return next(new Error(JSON.stringify({ message: 'Error de validación', errors })));
    }
};

module.exports = validate;
