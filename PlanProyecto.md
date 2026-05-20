# Plan de Proyecto

## Objetivo
Construir una SPA de e-commerce con React 18 + TypeScript + Vite, Firebase Authentication + Firestore, AWS S3 para imágenes, Vercel Serverless Functions para generar presigned URLs, y despliegue final en Vercel. El proyecto debe cubrir: autenticación, roles customer/admin, catálogo, carrito, checkout simulado, órdenes, panel de administración, testing, seguridad, documentación y deploy público.

---

## 1. Preparación inicial

### 1.1. Revisar la consigna y definir alcance
1. Leer los requisitos funcionales y no funcionales antes de escribir código.
2. Separar lo obligatorio de lo extra credit.
3. Definir una lista de entregables mínimos:
   - Login y registro con Firebase.
   - Roles customer y admin.
   - Catálogo desde Firestore.
   - Carrito persistido en Context API + useReducer.
   - Checkout simulado que crea órdenes.
   - Panel admin para CRUD de productos y gestión de órdenes.
   - Upload de imágenes a S3 mediante presigned URLs.
   - Testing con Vitest + React Testing Library.
   - README completo y .env.example.
   - Deploy en Vercel.

### 1.2. Crear el boilerplate
1. Crear el proyecto con Vite y React + TypeScript.
2. Instalar dependencias base:
   - react-router-dom
   - firebase
   - zustand no es necesario si se usa Context API + useReducer
   - tailwindcss, postcss, autoprefixer
   - vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, jsdom
   - eslint y prettier si el proyecto no los trae configurados.
3. Inicializar Tailwind y la configuración del build.
4. Confirmar que el proyecto corre localmente sin errores.
5. Crear el primer commit apenas el boilerplate compile.

### 1.3. Ordenar la estructura de carpetas
1. Crear una arquitectura por capas:
   - components/
   - pages/
   - contexts/
   - hooks/
   - services/
   - api/
   - types/
   - utils/
   - constants/
   - tests/
2. Definir alias de importación si el proyecto lo permite.
3. Dejar una base clara para escalar sin mezclar UI, lógica y servicios.

---

## 2. Base técnica y configuración

### 2.1. Variables de entorno y seguridad
1. Crear .env.example con todas las variables necesarias, sin valores reales.
2. Crear .env local para desarrollo y agregarlo a .gitignore.
3. Definir variables para Firebase, S3 y Vercel Functions.
4. Confirmar que las credenciales de AWS nunca se expongan en el frontend.
5. Preparar validaciones para bloquear accesos sin rol o sin sesión.

### 2.2. Configuración de UI y estilo
1. Montar un sistema visual mobile-first.
2. Definir tipografía, colores y componentes base.
3. Crear botones, inputs, cards, modales, alerts, loaders y skeletons reutilizables.
4. Dejar lista una base consistente para páginas de cliente y admin.

### 2.3. Routing y layout global
1. Configurar React Router.
2. Crear layouts separados para:
   - público
   - cliente autenticado
   - admin
3. Implementar rutas protegidas por autenticación y por rol.
4. Dejar una ruta 404 y una navegación clara.

---

## 3. Firebase y modelo de datos

### 3.1. Inicializar Firebase
1. Crear el proyecto en Firebase.
2. Activar Authentication.
3. Activar Firestore.
4. Definir reglas de seguridad para roles y acceso por usuario.
5. Probar conexión local con una configuración mínima.

### 3.2. Modelar la base de datos
1. Definir colección de users o el modelo equivalente para roles y perfil.
2. Definir products con campos para nombre, precio, stock, categoría, descripción, imagen y estado.
3. Definir orders con items, total, estado, usuario, timestamps y datos de checkout.
4. Definir la estructura del carrito si se persiste en Firestore o en contexto con sincronización.
5. Documentar el esquema para no improvisar durante el desarrollo.

### 3.3. Servicios y tipos
1. Crear tipos estrictos para producto, usuario, carrito, orden y respuesta de servicios.
2. Centralizar acceso a Firestore en services.
3. Preparar funciones para leer, crear, actualizar y eliminar datos.
4. Evitar lógica de negocio dentro de componentes.

---

## 4. Autenticación y roles

### 4.1. Registro e inicio de sesión
1. Implementar registro con email/password.
2. Implementar login con email/password.
3. Si se decide, agregar login con Google.
4. Manejar errores de autenticación con mensajes claros.
5. Persistir la sesión del usuario.

### 4.2. Control de roles
1. Definir el rol del usuario al registrarse o al sincronizar su perfil.
2. Bloquear rutas de admin para usuarios customer.
3. Mostrar contenido distinto según el rol.
4. Validar permisos también en los datos y no solo en la UI.

### 4.3. Contexto de auth
1. Crear AuthContext.
2. Encapsular login, logout, register y estado del usuario.
3. Exponer un hook useAuth.
4. Dejar listo el flujo para refrescar sesión y proteger rutas.

---

## 5. Catálogo y navegación de productos

### 5.1. Listado público
1. Leer productos desde Firestore.
2. Mostrar cards con información clara y responsive.
3. Agregar estados de carga y estados vacíos.
4. Manejar errores de red o de consulta.

### 5.2. Filtros y búsqueda
1. Filtrar por categoría.
2. Buscar por nombre con debounce.
3. Permitir ordenar si aporta valor.
4. Mantener el estado de filtros de forma estable.

### 5.3. Detalle de producto
1. Crear vista de detalle con información completa.
2. Mostrar imagen, precio, stock, descripción y categoría.
3. Incluir botón para agregar al carrito.
4. Manejar producto inexistente o sin stock.

---

## 6. Carrito de compras

### 6.1. Contexto + reducer
1. Crear CartContext con useReducer.
2. Definir acciones para agregar, quitar, actualizar cantidad, vaciar carrito y recalcular total.
3. Mantener la lógica del carrito en un reducer testeable.
4. Exponer un hook useCart.

### 6.2. Persistencia
1. Decidir si el carrito se persiste solo en memoria, en localStorage o sincronizado con Firestore.
2. Si se persiste, mantener coherencia al iniciar sesión y al cerrar sesión.
3. Evitar duplicados y errores de cantidad.

### 6.3. UI del carrito
1. Mostrar items con cantidades editables.
2. Mostrar subtotal y total automáticamente.
3. Permitir eliminar items.
4. Manejar carrito vacío con un mensaje claro.

---

## 7. Checkout y órdenes

### 7.1. Flujo de checkout simulado
1. Crear una pantalla de revisión del carrito.
2. Confirmar datos de compra.
3. Simular el pago sin integrar pasarela real.
4. Crear la orden en Firestore con estado pending.

### 7.2. Estados de órdenes
1. Definir estados: pending, processing, completed, cancelled.
2. Permitir visualización del historial para el usuario.
3. Mostrar detalle de cada orden.
4. Asegurar que el total y los items queden guardados en la orden.

### 7.3. Finalización de compra
1. Limpiar carrito al completar la compra.
2. Actualizar inventario si el diseño del flujo lo requiere.
3. Registrar timestamps y datos del usuario.
4. Verificar que el flujo completo funcione de punta a punta.

---

## 8. Panel de administración

### 8.1. Layout y rutas admin
1. Crear dashboard separado del layout de cliente.
2. Proteger rutas por rol admin.
3. Incluir navegación del panel con secciones claras.

### 8.2. CRUD de productos
1. Crear producto.
2. Editar producto.
3. Eliminar producto.
4. Validar formularios y mensajes de error.
5. Refrescar la vista luego de cada operación.

### 8.3. Gestión de órdenes
1. Listar todas las órdenes.
2. Filtrar por estado.
3. Cambiar estado de una orden.
4. Ver detalle completo de cada orden.

---

## 9. Upload de imágenes a AWS S3

### 9.1. Backend serverless
1. Crear la Vercel Serverless Function que genera presigned URLs.
2. Guardar ahí las credenciales de AWS.
3. No exponer nunca esas credenciales al frontend.

### 9.2. Integración con el formulario
1. Subir la imagen al seleccionar archivo.
2. Obtener la URL firmada desde la función serverless.
3. Enviar el archivo directamente a S3.
4. Guardar la URL pública o el key en Firestore.

### 9.3. Validación
1. Probar subidas válidas.
2. Probar archivos inválidos o fallos de red.
3. Confirmar que el producto se crea solo si la imagen se sube correctamente.

---

## 10. Testing

### 10.1. Configuración inicial
1. Preparar Vitest y React Testing Library.
2. Configurar jsdom.
3. Crear setup de tests con matchers globales.
4. Crear wrapper de providers para tests con múltiples contextos.

### 10.2. Cobertura mínima necesaria
1. Testear el reducer del carrito.
2. Testear hooks como useCart y useAuth.
3. Testear componentes clave del catálogo y del carrito.
4. Crear tests de integración para flujos completos.
5. Mockear Firebase y AWS SDK para no depender de servicios reales.

### 10.3. Casos importantes
1. Producto agregado dos veces.
2. Cambio de cantidad a cero o negativos.
3. Usuario no autenticado intentando entrar a admin.
4. Error de carga de catálogo.
5. Checkout exitoso y checkout fallido.

---

## 11. Documentación

### 11.1. README profesional
1. Describir el proyecto y el contexto del cliente.
2. Explicar decisiones arquitectónicas.
3. Agregar pasos de instalación y configuración.
4. Documentar variables de entorno.
5. Incluir URL de producción.
6. Explicar el flujo de upload a S3 con presigned URLs.
7. Agregar una sección de bitácora de uso de IA con al menos 5 momentos reales.

### 11.2. Evidencia de IA
1. Registrar cuándo la IA ayudó a definir arquitectura.
2. Registrar cuándo ayudó a generar o revisar tests.
3. Registrar cuándo ayudó a validar decisiones técnicas.
4. Registrar cuándo ayudó a detectar edge cases.
5. Registrar cuándo ayudó a mejorar documentación.

---

## 12. Deploy y validación final

### 12.1. Deploy en Vercel
1. Conectar el repositorio a Vercel.
2. Configurar variables de entorno en producción.
3. Verificar build optimizado.
4. Confirmar que las rutas funcionan en refresh y navegación directa.
5. Revisar el comportamiento de auth, catálogo, carrito, checkout y admin en producción.

### 12.2. Checklist final antes de entregar
1. No hay secretos en el repositorio.
2. .env.example está completo.
3. El README tiene toda la información solicitada.
4. Los tests pasan.
5. El deploy público responde correctamente.
6. El panel admin y el flujo customer están completos.
7. El repo tiene commits semánticos y bien distribuidos.

---

## 13. Secuencia recomendada de commits

La idea es no hacer pocos commits grandes, sino dejar trazabilidad real del avance. Puedes ajustar el contenido exacto, pero conviene mantener este orden.

| # | Commit | Qué debe incluir |
|---|---|---|
| 1 | feat: bootstrap react vite typescript project | Creación del boilerplate, instalación base y arranque del proyecto. |
| 2 | chore: add tailwind and project styling base | Configuración inicial de estilos, reset y base visual mobile-first. |
| 3 | chore: organize folder structure and aliases | Estructura por capas, alias de imports y orden inicial del proyecto. |
| 4 | chore: add environment template and gitignore | .env.example, .gitignore y configuración segura de variables. |
| 5 | feat: configure routing and app layouts | React Router, layouts públicos y estructura general de navegación. |
| 6 | feat: initialize firebase integration layer | Configuración de Firebase, servicios base y tipos centrales. |
| 7 | feat: implement auth context and protected routes | Registro, login, logout, persistencia de sesión y roles. |
| 8 | feat: build public catalog listing | Listado de productos desde Firestore con estados de carga y vacío. |
| 9 | feat: add product search and category filters | Búsqueda con debounce, filtros y refinamiento del catálogo. |
| 10 | feat: create product detail view | Página de detalle de producto y navegación asociada. |
| 11 | feat: implement cart reducer and context | Lógica del carrito con useReducer y useCart. |
| 12 | feat: build cart ui and totals | Vista del carrito, cantidades, totales y vaciado. |
| 13 | feat: implement checkout order flow | Confirmación de compra, creación de órdenes y limpieza del carrito. |
| 14 | feat: add order history and order detail | Historial de órdenes del usuario y vista de detalle. |
| 15 | feat: create admin dashboard layout | Layout exclusivo de admin y rutas protegidas por rol. |
| 16 | feat: implement product crud for admin | Crear, editar y eliminar productos desde el panel. |
| 17 | feat: add order management for admin | Listado de órdenes, filtros por estado y cambio de estado. |
| 18 | feat: integrate s3 presigned image uploads | Upload seguro de imágenes usando Vercel Serverless Functions y S3. |
| 19 | test: add cart reducer and hook coverage | Tests unitarios del reducer y hooks principales. |
| 20 | test: add integration tests for checkout flows | Tests de integración para flujos completos de usuario. |
| 21 | chore: mock external services for tests | Mocks de Firebase y AWS SDK para tests aislados. |
| 22 | docs: write project setup and architecture README | README completo con instalación, arquitectura, env vars y flujo S3. |
| 23 | docs: add ai usage log to README | Bitácora de uso de IA con evidencia real y al menos 5 entradas. |
| 24 | chore: prepare production deployment on vercel | Configuración de deploy, variables de entorno y validación final. |
| 25 | fix: polish responsive ui and edge cases | Ajustes finales de UI, errores, loaders, estados vacíos y navegación. |

---

## 14. Orden práctico de trabajo

Si quieres avanzar sin perderte, sigue este orden:
1. Boilerplate y estructura.
2. Variables de entorno y Firebase.
3. Auth y rutas protegidas.
4. Catálogo y detalle.
5. Carrito.
6. Checkout y órdenes.
7. Panel admin.
8. S3 y upload de imágenes.
9. Testing.
10. README.
11. Deploy.
12. Revisión final y pulido.

---

## 15. Criterio de cierre

El proyecto se considera listo cuando puedas demostrar lo siguiente:
1. Un usuario customer puede registrarse, iniciar sesión, navegar productos, filtrar, agregar al carrito y comprar.
2. Un admin puede ingresar al panel, crear/editar/eliminar productos, subir imágenes y gestionar órdenes.
3. Las órdenes quedan persistidas en Firestore.
4. Las imágenes se suben a S3 sin exponer credenciales.
5. Los tests principales pasan.
6. La app está desplegada en Vercel con variables de entorno configuradas.
7. El README explica claramente qué hiciste, cómo correrlo y por qué tomaste esas decisiones.
