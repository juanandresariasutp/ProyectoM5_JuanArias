# Proyecto M5 — E-commerce (Creati Store)

Proyecto integrador del Módulo 5, construido como una SPA de e-commerce con React + TypeScript, Firebase y AWS S3, y desplegado en Vercel.

## Descripción general

Creati Store permite navegar un catálogo de productos, filtrar por categoría, buscar por nombre, agregar productos al carrito, iniciar sesión con correo o Google, y realizar compras con checkout y generación de órdenes. También incluye un panel de administración para crear, editar y eliminar productos, además de gestionar pedidos.

## Tecnologías utilizadas

- Frontend: React, TypeScript, Vite
- Estilos: Tailwind CSS
- Ruteo: React Router DOM
- Autenticación y base de datos: Firebase Auth + Firestore
- Almacenamiento de imágenes: AWS S3 mediante presigned URLs
- Testing: Vitest + React Testing Library
- Despliegue: Vercel

## Estructura del proyecto

### Carpetas principales del repositorio

```text
api/                Funciones serverless, como la generación de presigned URLs para S3
public/             Archivos públicos servidos tal cual
src/                Código principal de la aplicación
material_defensa/   Guiones, diagramas y material de sustentación
dist/               Build de producción generado por Vite
```

### Estructura principal dentro de `src/`

```text
src/
	assets/           Imágenes e íconos usados por la interfaz
	components/       Componentes reutilizables de UI
	config/           Configuración de aplicación, si aplica
	contexts/         Contextos de React y sus tipos
	hooks/            Hooks personalizados para consumir los contextos
	layouts/          Layouts generales para páginas públicas y admin
	lib/              Inicialización de librerías, por ejemplo Firebase
	pages/            Páginas principales y vistas por ruta
	providers/        Lógica global de estado y efectos
	routes/           Definición de rutas y guards
	services/         Acceso a datos y operaciones con Firestore
	tests/            Pruebas unitarias e integración
	types/            Tipos compartidos de TypeScript
	utils/            Funciones auxiliares y utilidades puras
```

## ¿Qué hace cada carpeta?

- `components`: piezas visuales reutilizables como `Navbar`, `CartDrawer`, `CatalogProductCard` y componentes de administración.
- `pages`: pantallas completas como `Home`, `Catalog`, `Login`, `Cart`, `Checkout`, `Orders` y las páginas de admin.
- `providers`: contienen la lógica global del estado. Aquí viven `AuthProvider` y `CartProvider`.
- `contexts`: definen los contratos de los contextos y sus tipos.
- `hooks`: exponen una API fácil de usar para consumir los contextos, por ejemplo `useAuth` y `useCart`.
- `routes`: organizan navegación y protección de rutas públicas, privadas y de administrador.
- `services`: centralizan la comunicación con Firestore y la lógica de negocio de productos y órdenes.
- `layouts`: definen la estructura visual general que comparten varias páginas.
- `types`: guardan los tipos globales de la app, como `Product` y `Order`.
- `utils`: funciones pequeñas y puras que ayudan a formatear o calcular datos.
- `lib`: inicialización de servicios externos, como Firebase.
- `tests`: pruebas automatizadas de contexts, integración y componentes.

## Manual de usuario

### 1. Acceso a la aplicación

Al entrar a la plataforma, el usuario puede navegar por la página principal, ver el catálogo y entrar al login si desea comprar o consultar sus pedidos.

### 2. Registro e inicio de sesión

- Puede crear una cuenta con correo y contraseña.
- También puede iniciar sesión con Google.
- Si el usuario no ha iniciado sesión, ciertas rutas como `checkout` y `orders` permanecen protegidas.

### 3. Navegación por el catálogo

- En `Catalog`, el usuario puede buscar productos por nombre.
- También puede filtrar por categoría.
- Cada producto muestra información básica y un acceso al detalle.

### 4. Detalle de producto

- Desde la página de detalle se puede ver más información del producto.
- Desde ahí el usuario puede agregar unidades al carrito.

### 5. Carrito de compras

- El carrito guarda los productos seleccionados.
- Permite aumentar o disminuir cantidades.
- Permite eliminar productos.
- Muestra el total a pagar.
- Se puede abrir como panel lateral o ver la página completa del carrito.

### 6. Checkout

- El usuario revisa el resumen de compra.
- Si todo está correcto, confirma la orden.
- La app valida stock y genera la orden en Firestore.

### 7. Historial de pedidos

- El usuario autenticado puede revisar sus órdenes en la sección correspondiente.

### 8. Panel de administración

- El usuario administrador puede gestionar productos y pedidos.
- Puede crear, editar y eliminar productos.
- Puede subir imágenes usando una URL temporal segura hacia S3.

## Flujo general de uso

1. El usuario entra a la tienda.
2. Navega por el catálogo y aplica filtros o búsqueda.
3. Abre un producto y lo agrega al carrito.
4. Revisa el carrito y ajusta cantidades.
5. Inicia sesión si aún no lo ha hecho.
6. Confirma el checkout.
7. La orden queda registrada y el stock se actualiza.

## Manual técnico

### Arquitectura

El proyecto está organizado por capas:

- UI: `pages/` y `components/`
- Estado global: `providers/`, `contexts/` y `hooks/`
- Acceso a datos: `services/`
- Navegación: `routes/`
- Tipos y utilidades: `types/` y `utils/`

### Flujo técnico de autenticación

1. `Login.tsx` captura correo, contraseña y modo de acceso.
2. `useAuth()` expone las funciones del contexto.
3. `AuthProvider` ejecuta Firebase Auth.
4. `onAuthStateChanged` sincroniza usuario, rol y estado de carga.
5. `ProtectedRoute` y `AdminRoute` validan permisos.

### Flujo técnico del carrito

1. Un componente llama a `useCart()`.
2. `CartProvider` recibe la acción.
3. El reducer calcula el nuevo estado.
4. El carrito se persiste en `localStorage`.
5. La UI se actualiza automáticamente.

### Flujo técnico del catálogo

1. `Catalog.tsx` llama a `fetchProducts()`.
2. Los productos se guardan en estado local.
3. `searchTerm` y `selectedCategory` filtran la lista.
4. Se renderizan solo los productos coincidentes.

### Flujo técnico de órdenes

1. `Checkout.tsx` toma `items` y `totalPrice` del carrito.
2. `createOrder()` valida stock.
3. Se usa `writeBatch` para guardar la orden y descontar inventario.
4. La operación se confirma de forma atómica.

### Subida de imágenes

1. El admin selecciona una imagen.
2. El frontend solicita una presigned URL a `api/upload.ts`.
3. El backend firma la URL con AWS SDK.
4. El frontend sube el archivo directo a S3.
5. Se guarda la URL pública en Firestore.

## Variables de entorno

Copiar el archivo de ejemplo y completar los valores necesarios:

```bash
cp .env.example .env
```

Variables usadas por el proyecto:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET`
- `AWS_REGION`
- `VERCEL_URL`

## Instalación y ejecución local

```bash
git clone https://github.com/juanandresariasutp/ProyectoM5_JuanArias.git
cd Proyecto-M5
npm install
npm run dev
```

## Scripts disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Genera la versión de producción
npm run preview  # Previsualiza el build localmente
npm run lint     # Ejecuta ESLint
npm run test     # Ejecuta los tests con Vitest
```

## Tests

El proyecto incluye pruebas de contexts e integración para validar flujos del carrito, autenticación y comportamiento general de la app.

## Despliegue

El proyecto está pensado para desplegarse en Vercel. El archivo `vercel.json` resuelve rutas de la SPA y el endpoint serverless de subida de imágenes.

## Documentación adicional

- [Documentación IA](Documentación_IA.md)

## Demo en producción

https://proyecto-m5-sable.vercel.app/

## ✍️ Autor del proyecto

**Juan Andrés Arias Tascón**

🎓 **Ingeniero de Sistemas | Desarrollador de Software**  
👨‍💻 Desarrollador Web en formación – 2026

⭐ Proyecto creado con fines educativos y de práctica.

---

**Módulo 5 - Proyecto Integrador**  
*Soy Henry - Bootcamp de Desarrollo Full Stack*
