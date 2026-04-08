const { z } = require('zod');

/**
 * Esquema para el registro de usuarios
 */
const registerSchema = z.object({
    username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

/**
 * Esquema para el inicio de sesión
 */
const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, 'La contraseña es requerida'),
});

/**
 * Esquema para la creación/edición de productos
 */
const productSchema = z.object({
    name: z.string().min(3, 'El nombre del producto es requerido'),
    price: z.number().positive('El precio debe ser un número positivo'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    image: z.string().url('La imagen debe ser una URL válida'),
    category: z.string().min(1, 'La categoría es requerida'),
    countInStock: z.number().int().min(0, 'El stock no puede ser negativo'),
});

module.exports = {
    registerSchema,
    loginSchema,
    productSchema,
};
