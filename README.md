# 🏆 Market Alfredo | Tienda Deportiva de Élite

[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

## 🔗 Overview / Resumen
Plataforma Full-Stack de comercio electrónico especializada en equipamiento deportivo de alto rendimiento. Diseñada con una estética premium, animaciones fluidas y un enfoque crítico en la seguridad de las transacciones.

[English Version Below](#english-version)

---

## 🇪🇸 Versión en Español

### 🚀 El Proyecto
**Market Alfredo** es una solución E-commerce de alto nivel que combina un catálogo dinámico de productos, un sistema de gestión administrativa y una pasarela de pago segura con Stripe. El proyecto destaca por su interfaz "High Performance Sport", utilizando micro-interacciones y un sistema de diseño robusto para ofrecer una experiencia de usuario de élite.

### ✨ Características Destacadas
- **Seguridad Anti-Fraude (Server-Side Recalculation)**: El sistema ignora los precios del frontend durante el checkout. El servidor recalcula el total consultando la base de datos en tiempo real, garantizando la integridad financiera.
- **Transacciones ACID (MongoDB)**: Uso de Mongoose Sessions (`startSession`, `startTransaction`) para garantizar protección contra "Race Conditions" y bloqueos de stock, implementando `Rollback` automático en caso de fallos de inventario.
- **Auditoría Quirúrgica Superada**: Protección estricta contra manipulación de "Cantidades Negativas" en carrito y mitigación de fugas de memoria o choque de cabeceras en middlewares (`Cannot set headers after they are sent`).
- **Pasarela de Pago Stripe**: Integración completa para procesar tarjetas de forma segura (Modo Simulación Enterprise en UI).
- **Panel Administrativo**: Control total sobre el catálogo de productos y seguimiento de pedidos de clientes.
- **Catálogo de Élite**: Sistema de búsqueda en tiempo real, filtros avanzados y paginación optimizada con un "Aspect Ratio 1:1" forzado para coherencia fotográfica.
- **Experiencia Premium (UX)**: Diseño fluido "Split View" para pagos, componentes "Pill", transiciones motorizadas por `Framer Motion` y un tema oscuro de alto contraste "Deep Sport Navy".
- **Wishlist & Perfil**: Los usuarios pueden gestionar sus favoritos y revisar su historial de pedidos.

### 🛠️ Stack Tecnológico

#### Frontend
- **React 19 & Vite**: Rendimiento y reactividad de última generación.
- **Framer Motion**: Animaciones fluidas de categoría profesional.
- **Bootstrap 5 + Custom CSS**: Diseño responsive con tokens de diseño personalizados (Navy & Gold).
- **React Hot Toast**: Sistema de notificaciones elegante.

#### Backend
- **Node.js & Express**: Arquitectura MVC escalable.
- **Mongoose & MongoDB Atlas**: Gestión de datos NoSQL.
- **Seguridad**: JWT para sesiones, Bcryptjs para hashing y Helmet.js para protección de cabeceras.
- **Zod**: Validación estricta de esquemas de datos.

### 📁 Estructura del Proyecto
```
E-commerce-Fullstack/
├── frontend/                # React SPA
│   ├── src/
│   │   ├── features/        # Módulos: Auth, Products, Admin
│   │   ├── components/      # Navbar, Footer (Premium Design)
│   │   ├── context/         # Auth, Cart, Wishlist Providers
│   │   └── pages/           # Home (Hero 2026), Checkout, Profile
│   └── public/              # Favicon personalizado
│
└── backend/                 # API REST Express
    ├── src/
    │   ├── routes/          # Endpoints protegidos
    │   ├── controllers/     # Lógica de negocio (Recalculo de precios)
    │   ├── models/          # Schemas (User, Product, Order)
    │   └── server.js        # Configuración de middleware y DB
```

### 📦 Instalación Rápida
1. **Instalar Dependencias**:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. **Configurar Entorno** (`backend/.env`):
   ```env
   MONGO_URI=mongodb://localhost:27017/market-alfredo
   JWT_SECRET=tu_secreto
   STRIPE_SECRET_KEY=tu_sk_stripe
   PORT=5000
   ```
3. **Ejecutar**:
   - Backend: `npm run dev`
   - Frontend: `npm run dev`

---

## 🇺🇸 English Version

### 🚀 The Project
**Market Alfredo** is a high-level E-commerce solution combining a dynamic product catalog, an administrative management system, and a secure payment gateway with Stripe. The project stands out for its "High Performance Sport" interface, utilizing micro-interactions and a robust design system to deliver an elite user experience.

### ✨ Key Features
- **Anti-Fraud Security (Server-Side Recalculation)**: The system disregards frontend prices during checkout. The server recalculates the total by querying the database in real-time.
- **ACID Transactions**: Order processing is wrapped in MongoDB sessions to guarantee atomic updates and prevent stock race conditions with full rollback capabilities.
- **Stripe Checkout UI**: Seamless enterprise-grade checkout experience featuring simulated live-masking and a sticky summary.
- **Admin Control Center**: Full management of the product catalog (CRUD) and customer order tracking.
- **Elite Catalog**: Real-time search system, advanced filters, and optimized pagination.
- **Premium UX**: Smooth animations powered by `Framer Motion` and a "Deep Sport Navy" professional theme.

### 🛠️ Tech Stack
- **Frontend**: React 19, Framer Motion, Bootstrap 5, Axios.
- **Backend**: Node.js & Express, MongoDB Atlas, JWT, Helmet.js, Zod.
- **Payments**: Stripe API Integration.

---

## 👤 Contacto / Contact
Desarrollado por **Alf**
- [LinkedIn](https://www.linkedin.com/in/alfredo-enei-61b61034b)
- [GitHub](https://github.com/alfredoenei)

> [!IMPORTANT]
> **Financially Secure**: Unlike basic marketplaces, Market Alfredo's checkout logic is built to prevent price manipulation via browser console, making it a production-ready architectural choice.

---
*Market Alfredo - Designed for Victory.*
