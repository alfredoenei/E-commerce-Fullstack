# 🏆 Market Alfredo | Tienda Deportiva de Élite

¡Bienvenido a **Market Alfredo**! Una plataforma de comercio electrónico de alto rendimiento diseñada para atletas y apasionados del deporte que buscan equipamiento de élite con una experiencia de usuario premium.

![Market Alfredo Home Screenshot](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/trophy.svg)

## 🚀 Tecnologías Utilizadas (MERN Stack)

Este proyecto ha sido desarrollado con un enfoque en **rendimiento, seguridad y estética**, utilizando las siguientes tecnologías:

### **Frontend**
- **React 19**: Biblioteca principal para una interfaz reactiva.
- **Vite**: Herramienta de construcción ultrarrápida.
- **Framer Motion**: Animaciones fluidas y dinámicas ("Sporty High Performance").
- **Bootstrap 5**: Maquetación profesional y responsive.
- **React Hot Toast**: Notificaciones elegantes y no intrusivas.
- **Axios**: Comunicación eficiente con el servidor.

### **Backend**
- **Node.js & Express**: Arquitectura robusta y escalable bajo el patrón MVC.
- **MongoDB & Mongoose**: Base de datos NoSQL para gestión flexible de productos y usuarios.
- **JWT (JSON Web Tokens)**: Autenticación segura y persistencia de sesión.
- **Bcryptjs**: Encriptado avanzado de contraseñas.
- **Helmet.js**: Capas de seguridad adicionales para las cabeceras HTTP.
- **Zod**: Validación de esquemas y tipos en tiempo de ejecución.

### **Pasarela de Pago**
- **Stripe API**: Integración completa para pagos procesados de forma segura con tarjetas de crédito/débito.

---

## 🔐 Características de Seguridad Avanzadas

1.  **Recálculo de Precios (Server-Side)**: A diferencia de implementaciones básicas, este sistema **ignora los precios enviados desde el frontend** durante el checkout. El servidor consulta los precios reales en la base de datos basándose en los IDs de los productos, previniendo manipulaciones fraudulentas del DOM.
2.  **Validación Robusta**: Uso de **Zod** para asegurar que cada entrada de datos cumpla con los requisitos técnicos antes de tocar la base de datos.
3.  **Protección de Cabeceras**: Implementación de **Helmet** para mitigar ataques comunes de la web.

---

## 🛠️ Funcionalidades Principales

-   👤 **Sistema de Usuarios**: Registro, Login y Gestión de Perfiles.
-   🛠️ **Panel de Administración**: 
    -   Gestión completa de productos (CRUD).
    -   Seguimiento de pedidos de clientes en tiempo real.
-   🛒 **Experiencia de Compra**:
    -   Carrito de compras dinámico y persistente.
    -   Cálculo automático de subtotales y totales.
    -   Checkout integrado con Stripe.
-   ⭐ **Wishlist**: Sección dedicada para guardar equipamiento favorito.
-   🔍 **Catálogo de Élite**: 
    -   Paginación avanzada.
    -   Buscador de productos en tiempo real.

---

## 📦 Instalación y Configuración

Sigue estos pasos para desplegar el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone <tu-repo-url>
cd E-commerce-Fullstack
```

### 2. Configurar el Backend
```bash
cd backend
npm install
```
Crea un archivo `.env` en la carpeta `backend` con las siguientes variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/market-alfredo
JWT_SECRET=tu_secreto_super_seguro
STRIPE_SECRET_KEY=tu_sk_test_de_stripe
```

### 3. Configurar el Frontend
```bash
cd ../frontend
npm install
```
Inicia la aplicación:
```bash
npm run dev
```

---

## ✨ Créditos
Desarrollado con pasión para **Market Alfredo**, fusionando tecnología de vanguardia con la energía del deporte de alto rendimiento.

---
*Market Alfredo - De atletas, para atletas.*
