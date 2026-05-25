# E-commerce Platform - Proyecto Módulo 5 (Soy Henry)

Bienvenido al repositorio de mi E-commerce, el proyecto integrador del Módulo 5 de la carrera de Full Stack Developer en Soy Henry. 

## 🚀 Tecnologías Utilizadas

- **Frontend:** React, TypeScript, Vite.
- **Estilos:** Tailwind CSS.
- **Backend / BaaS:** Firebase (Auth y Firestore).
- **Almacenamiento de Imágenes:** AWS S3 integrado mediante AWS SDK.
- **Testing:** Vitest y React Testing Library.
- **Despliegue:** Vercel.

## 🌟 Funcionalidades Principales

- **Gestión de Usuarios (Auth):** Registro e inicio de sesión con email/contraseña y Google Auth. Todo enlazado automáticamente con Firestore.
- **Catálogo de Productos:** Listado interactivo con imágenes, control de stock y etiquetas adaptativas de "Pocas unidades" o "Agotado".
- **Carrito de Compras Persistente:** Posibilidad de agregar, eliminar y modificar cantidades respetando siempre el stock disponible. Si el producto se agota el botón se deshabilita para evitar errores de compra.
- **Flujo de Checkout Seguro:** Verificación minuciosa de stock final, cálculo de totales gratis/envíos y registro de órdenes usando transacciones atomizadas (`Batch`) en Firestore para evitar venta de stock inexistente.
- **Panel de Administración Privado:** Ruta protegida sólo para rol `admin`. Permite realizar todas las operaciones CRUD (Crear, Leer, Actualizar, Borrar) de los productos y subir imágenes externamente directo hacia AWS S3. Visualización y actualización del estado de las ventas/órdenes.

## 🏗 Arquitectura y Servicios (Microservicios y Cloud)

1. **Firebase Firestore:** Base de datos NoSQL donde modelamos nuestras colecciones `users`, `products` y `orders`.
2. **Firebase Authentication:** Gestión de acceso, OAuth2 y protección de las rutas frontend (`RequireAuth` y `RequireAdmin`).
3. **AWS S3:** Bucket en la nube de Amazon que utilizamos para optimizar el almacenamiento de imágenes binarias pesadas en la creación de productos.
4. **Context API + Reducers (React):** `CartContext` y `AuthContext` administran de forma global y reactiva toda la aplicación evitando el _prop drilling_.

## 🛠️ Instalación Local y Testeo

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/juanandresariasutp/ProyectoM5_JuanArias.git
   ```
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Configurar variables:** 
   Renombra `.env.example` a `.env` y carga las credenciales de los servicios (Firebase/AWS SDK).
4. **Ejecutar servidor local:**
   ```bash
   npm run dev
   ```

## 🧪 Pruebas Automatizadas
La aplicación cuenta con cobertura de pruebas de integración y unidas _(TDD)_ que aísla totalmente a los proveedores cloud usando _vi.mock_:
```bash
npm run test
```

## Autor del proyecto ✍️

Juan Andrés Arias Tascón

🎓 Ingeniero de Sistemas | Desarrollador de Software  
👨‍💻 Desarrollador Web en formación – 2026

⭐ Proyecto creado con fines educativos y de práctica.

Módulo 5 - Proyecto Integrador  
Soy Henry - Bootcamp de Desarrollo Full Stack