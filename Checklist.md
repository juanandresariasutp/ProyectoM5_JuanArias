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
- [ ] Pantalla de revisión de carrito y checkout.
- [ ] Simulación de pago y guardar la orden en Firestore (estado: `pending`).
- [ ] Limpiar carrito al finalizar.
- [ ] Vista del usuario: Historial de órdenes y detalles.
- [ ] *[COMMIT: feat: flujo de checkout e historial de órdenes]*

## Etapa 7. Panel de Administración
- [ ] Crear Layout final de Admin.
- [ ] Crear CRUD de Productos (Listar, Crear, Updatear, Eliminar).
- [ ] Crear Listado y gestión de Órdenes (cambiar estados).
- [ ] *[COMMIT: feat: dashboard admin completo]*

## Etapa 8. Imágenes y AWS S3
- [ ] Crear función serverless en Vercel para generar Presigned URLs.
- [ ] Conectar función con el formulario de creación de productos (Admin).
- [ ] Validación de subida correcta de la imagen y guardado seguro en Firestore.
- [ ] *[COMMIT: feat: subida de imágenes a S3]*

## Etapa 9. Testing
- [ ] Configurar tests y mocks para Firebase / AWS.
- [ ] Escribir tests unitarios para reducer y hooks (`useCart`, `useAuth`).
- [ ] Escribir test de integración (simulación de checkout).
- [ ] *[COMMIT: test: añadir cobertura de pruebas]*

## Etapa 10. Documentación y Deploy
- [ ] Redactar `README.md` completo (Arquitectura, pasos, etc.).
- [ ] Incluir Bitácora de decisiones con IA en el README.
- [ ] Configurar variables de entorno en Vercel.
- [ ] Desplegar a producción.
- [ ] Validar despliegue.
- [ ] *[COMMIT: docs: actualización final y preparación para deploy]*