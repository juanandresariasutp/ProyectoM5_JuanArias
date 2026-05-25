# Checklist del Proyecto

Este documento es nuestra fuente de verdad para no saltarnos pasos y llevar un orden claro.

## Etapa 1. Boilerplate y Configuración
- [x] Crear el proyecto con Vite y React + TypeScript.
- [x] Instalar dependencias base (react-router, firebase, tailwind, vitest, etc.).
- [x] Inicializar Tailwind y configuración (postcss, tailwind.config).
- [x] Crear estructura de carpetas (`components`, `pages`, `contexts`, etc.).
- [x] Crear `.env.example` y `.gitignore`.
- [x] Primer commit de inicialización.

## Etapa 2. Configuración de Firebase y Ruteo Base
- [x] Crear proyecto en Firebase (Console).
- [x] Configurar variables locales en archivo `.env`. (Haciéndolo / Listo)
- [x] Crear capa de integración Firebase (`src/lib/firebase.ts`).
- [x] Implementar rutas y layouts base (`AppRouter`, `MainLayout`, `AdminLayout`).
- [x] Segundo commit con Firebase y Layouts.

## Etapa 3. Autenticación y Roles
- [x] Crear `AuthContext` y hook `useAuth`.
- [x] Crear pantalla de Login / Registro base.
- [x] Conectar la app localmente a Firebase y probar que el Registro y Login funcionan en el navegador.
- [x] Verificar creación del usuario en Authentication y en Firestore (colección `users`).
- [x] Aplicar/probar las rutas protegidas (`RequireAuth`, `RequireAdmin`).
- [x] *[COMMIT: feat: validar e integrar flujos de autenticación]*

## Etapa 4. Catálogo y Navegación
- [x] Crear tipos de datos (`Product`).
- [x] Crear servicio base para leer Firestore (`fetchProducts`).
- [x] Implementar página básica de Catálogo (`Catalog.tsx`).
- [x] Insertar datos de prueba en la colección `products` de Firestore.
- [x] Verificar que el catálogo renderiza los productos de la base de datos real.
- [x] Agregar vista de 'Detalle de producto'.
- [x] Implementar barra de búsqueda y filtros.
- [x] *[COMMIT: feat: implementar filtros y detalle del catálogo]*

## Etapa 5. Carrito de Compras
- [x] Crear `CartContext` con `useReducer`.
- [x] Implementar UI de carrito flotante o página dedicada.
- [x] Funciones: Agregar, Quitar, Editar cantidad, Limpiar.
- [x] Persistencia (localStorage o memoria).
- [ ] *[COMMIT: feat: implementar carrito de compras con contexto]*

## Etapa 5.5. Layout Principal y Navegación Visual
- [x] Crear componente `Navbar` (logo, links de catálogo, botón de carrito, acciones de usuario).
- [x] Crear componente `MainLayout` para agrupar todas las rutas bajo una misma estructura.
- [x] Conectar `useAuth` al Navbar para mostrar info del usuario logueado y botón de cerrar sesión.
- [x] Conectar `useCart` al Navbar para permitir abrir el carrito (`CartDrawer`).
- [x] *[COMMIT: feat: integrar Navbar y navegación visual]*

## Etapa 6. Checkout y Órdenes
- [x] Pantalla de revisión de carrito y checkout.
- [x] Simulación de pago y guardar la orden en Firestore (estado: `pending`).
- [x] Limpiar carrito al finalizar.
- [x] Descontar stock de productos al completar la compra (Batch Firestore).
- [x] Vista del usuario: Historial de órdenes y detalles.
- [x] *[COMMIT: feat: flujo de checkout e historial de órdenes]*

## Etapa 7. Panel de Administración
- [x] Crear Layout final de Admin.
- [x] Crear CRUD de Productos (Listar, Crear, Updatear, Eliminar).
- [x] Crear Listado y gestión de Órdenes (cambiar estados).
- [x] *[COMMIT: feat: dashboard admin completo]*

## Etapa 7.5 (Pendiente para el final)
- [x] Agregar métricas y tarjetas de resumen al `AdminDashboard.tsx`.

## Etapa 8. Imágenes y AWS S3
- [x] Crear función serverless en Vercel para generar Presigned URLs.
- [x] Conectar función con el formulario de creación de productos (Admin).
- [x] Validación de subida correcta de la imagen y guardado seguro en Firestore.
- [x] *[COMMIT: feat: subida de imágenes a S3]*

## Etapa 8.5. Validaciones y UX
- [x] Separar formulario de Login y Registro.
- [x] Validar que no se puedan agregar más productos al carrito del stock disponible.
- [x] Validar stock en el Checkout y evitar stock negativo.
- [x] *[COMMIT: fix: validaciones de auth, carrito y stock en checkout]*

## Notas de validación
- Cliente: `CartContext` ahora evita aumentar cantidad por encima del stock disponible.
- Servidor: `createOrder` valida stock antes de commitear el batch y lanza error descriptivo si falta stock.

## Progreso reciente
- Commits locales relevantes:
	- 8ada360: UI(móvil): sidebar admin responsive, menú hamburguesa y botones apilables en Catálogo
	- 3738b4e: UI(móvil): tablas admin con scroll horizontal (overflow-x-auto)
	- 4426b20: fix(checkout): mostrar error detallado de stock; actualizar Checklist.md

## Estado: Validaciones y UX
- `Manejar error de stock en Checkout (UI)`: completado — la UI ahora muestra el mensaje de "Stock insuficiente" con los detalles de los productos afectados.


## Etapa 9. Testing
- [x] Configurar tests y mocks para Firebase / AWS.
- [x] Escribir tests unitarios para reducer y hooks (`useCart`, `useAuth`).
- [x] Escribir test de integración (simulación de checkout).
- [x] *[COMMIT: test: añadir cobertura de pruebas]*

## Etapa 10. Documentación y Deploy
- [ ] Redactar `README.md` completo (Arquitectura, pasos, etc.).
- [ ] Incluir Bitácora de decisiones con IA en el README.
- [ ] Configurar variables de entorno en Vercel.
- [ ] Desplegar a producción.
- [ ] Validar despliegue.
- [ ] *[COMMIT: docs: actualización final y preparación para deploy]*