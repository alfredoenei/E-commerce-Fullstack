# Market Alfredo - E-commerce Fullstack

 **Market Alfredo** Este es un proyecto de comercio electrónico moderno, construido con tecnologías líderes en la industria para simular una experiencia de compra real y profesional.

## ¿Qué es este proyecto?

Este sistema es una tienda online completa que permite a los usuarios:
*   Explorar productos con una interfaz amigable y vistosa.
*   Agregar artículos a un carrito de compras.
*   Gestionar su cuenta de usuario.
*   (Simulación) Realizar procesos de checkout.
*   Panel de administración para gestionar productos (protegido por roles).

El objetivo es demostrar buenas prácticas de desarrollo web, una arquitectura escalable y una experiencia de usuario (UI/UX) pulida.

## Tecnologías Usadas

El proyecto utiliza el stack **MERN** (MongoDB, Express, React, Node.js).

### Frontend (Cliente)
*   **React + Vite**: Para una interfaz rápida y reactiva.
*   **Bootstrap 5**: Para un diseño responsivo, moderno y profesional.
*   **React Router**: Para la navegación entre páginas sin recargar el sitio.
*   **Context API**: Para manejar el estado global (como el carrito de compras y la sesión del usuario) de manera eficiente.

### Backend (Servidor)
*   **Node.js & Express**: Para construir una API RESTful robusta.
*   **MongoDB & Mongoose**: Base de datos NoSQL flexible para almacenar usuarios y productos.
*   **JWT (JSON Web Tokens)**: Para autenticación segura de usuarios.

## Estructura del Proyecto

El código está organizado para ser escalable y fácil de mantener:

```
/
├── backend/            # Lógica del servidor y base de datos
│   ├── src/
│   │   ├── controllers/# Controladores (lógica de negocio de cada ruta)
│   │   ├── models/     # Modelos de datos (Esquemas de MongoDB)
│   │   ├── routes/     # Definición de rutas (endpoints de la API)
│   │   └── server.js   # Punto de entrada del servidor
│
└── frontend/           # Interfaz de usuario (React)
    ├── src/
    │   ├── components/ # Componentes reutilizables (Navbar, Footer, etc.)
    │   ├── features/   # Módulos funcionales (Productos, Carrito)
    │   ├── pages/      # Páginas principales (Home, Login, Perfil)
    │   └── services/   # Comunicación con el backend (API calls)
```

## Cómo correrlo localmente

Sigue estos pasos para tener la tienda funcionando en tu máquina:

1.  **Clonar el repositorio** (si aplica) o descargar los archivos.
2.  **Configurar Variables de Entorno**:
    *   Crea un archivo `.env` en `backend/` con tu `MONGO_URI` y `JWT_SECRET`.
3.  **Instalar Dependencias**:
    *   Backend: `cd backend && npm install`
    *   Frontend: `cd frontend && npm install`
4.  **Iniciar el Servidor (Backend)**:
    *   `cd backend && npm start` (Corre en puerto 5000 por defecto)
5.  **Iniciar el Cliente (Frontend)**:
    *   `cd frontend && npm run dev` (Corre en http://localhost:5173)

## Funcionalidades Clave

1.  **Escaparate Moderno**: Hero section dinámica, grilla de productos simétrica y badges de ofertas.
2.  **Carrito Persistente**: Agrega productos y verás el contador actualizarse en tiempo real.
3.  **Diseño "Marketplace"**: Estética inspirada en grandes plataformas, con colores sobrios (azul oscuro) y toques vibrantes.
4.  **Admin Seeder**: Scripts para poblar la base de datos con productos iniciales rápidamente.

---

