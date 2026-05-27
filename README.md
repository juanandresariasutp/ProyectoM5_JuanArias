# Proyecto M5 — E-commerce (Creati Store)

Repositorio del proyecto integrador Módulo 5. Es una SPA e‑commerce construida con React + TypeScript y desplegada en Vercel.

## 🚀 Tecnologías

- Frontend: React, TypeScript, Vite
- Estilos: Tailwind CSS
- Autenticación y datos: Firebase (Auth, Firestore)
- Almacenamiento de imágenes: AWS S3 (presigned URLs)
- Tests: Vitest + React Testing Library
- Despliegue: Vercel

## Qué hace este proyecto

- Registro / login (email + Google) y protección de rutas según rol (`admin` / `user`).
- Catálogo de productos con control de stock y fichas de producto detalladas.
- Carrito persistente en `localStorage` con verificación de stock en el checkout.
- Checkout que crea órdenes y actualiza stock con operaciones atomizadas en Firestore.
- Panel de administración privado para CRUD de productos y gestión de órdenes (subida de imágenes mediante presigned URLs).

## Arquitectura (resumen rápido)

- `src/services/*`: acceso centralizado a Firestore (`products`, `orders`).
- `src/providers/*`: lógica y efectos (AuthProvider, CartProvider). Contexts sólo exponen tipos/creadores.
- `src/hooks/*`: hooks consumidores (`useAuth`, `useCart`).
- `src/pages/*`, `src/components/*`: UI y composición.

## Instalación y ejecución local

1. Clonar el repo:

```bash
git clone https://github.com/juanandresariasutp/ProyectoM5_JuanArias.git
cd Proyecto-M5
```

2. Instalar dependencias:

```bash
npm install
```

3. Copiar variables de entorno:

```bash
cp .env.example .env
# Rellenar las variables (Firebase config, AWS credentials usadas por el backend para presigned URLs)
```

4. Levantar el entorno de desarrollo:

```bash
npm run dev
```

5. Ejecutar tests:

```bash
npm run test
```

## Enlaces

- Demo en producción: https://proyecto-m5-sable.vercel.app/
- Documentación IA (uso y cambios aplicados): [Documentación_IA.md](Documentación_IA.md)

## Autor del proyecto ✍️

Juan Andrés Arias Tascón

🎓 Ingeniero de Sistemas | Desarrollador de Software  
👨‍💻 Desarrollador Web en formación – 2026

⭐ Proyecto creado con fines educativos y de práctica.

Módulo 5 - Proyecto Integrador  
Soy Henry - Bootcamp de Desarrollo Full Stack