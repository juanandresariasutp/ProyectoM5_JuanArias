# Plan de IA para el Proyecto

## Objetivo
Usar la IA como apoyo continuo durante todo el desarrollo del proyecto, pero sin delegarle el criterio técnico final. Este documento sirve como guía de trabajo por pasos para pedir ayuda de forma ordenada, documentar decisiones y avanzar con entregables claros desde el primer día.

La idea es simple: en cada fase se define qué pedirle a la IA, qué validar manualmente, qué evidencia guardar y cuándo cerrar cada bloque para pasar al siguiente.

---

## 1. Cómo vamos a trabajar con IA

### Principios de uso
1. La IA se usa para acelerar decisiones, no para reemplazar la revisión técnica.
2. Toda recomendación de IA se valida contra la consigna del proyecto.
3. Cada paso debe terminar con una acción concreta en el repo.
4. No se avanza a una fase nueva si la anterior todavía no está verificada.
5. Toda ayuda relevante de IA debe quedar documentada en el README o en una bitácora.

### Regla práctica
Cada vez que uses IA, pedile siempre estas cuatro cosas:
1. Una recomendación concreta.
2. El motivo técnico de esa recomendación.
3. Riesgos o trade-offs.
4. Un siguiente paso inmediato para implementar.

---

## 2. Flujo de trabajo por etapas

## Etapa 0. Arranque y definición

### Qué pedirle a la IA
1. Que traduzca la consigna a una lista de entregables obligatorios.
2. Que proponga una arquitectura en capas para React + TypeScript + Firebase.
3. Que sugiera una estructura de carpetas razonable para el proyecto.
4. Que recomiende una secuencia de trabajo por hitos.

### Qué validar vos
1. Que todo lo propuesto esté alineado con la consigna.
2. Que no agregue complejidad innecesaria.
3. Que la estructura permita separar UI, lógica y servicios.

### Salida esperada
1. Lista de features obligatorias.
2. Decisión de arquitectura.
3. Estructura inicial de carpetas.
4. Primer plan de trabajo.

### Prompt base sugerido
"Actuá como arquitecto frontend full stack. Tengo que hacer una SPA de e-commerce con React 18, TypeScript, Vite, Firebase, AWS S3 y Vercel. Necesito que me devuelvas: 1) un resumen de requisitos obligatorios, 2) una propuesta de arquitectura en capas, 3) una estructura de carpetas, 4) riesgos técnicos y 5) el orden recomendado de implementación."

---

## Etapa 1. Boilerplate y configuración

### Qué pedirle a la IA
1. Que sugiera comandos y dependencias exactas para el stack elegido.
2. Que revise si falta alguna dependencia de test, router o UI.
3. Que proponga una configuración inicial de Tailwind, Vitest y React Testing Library.
4. Que ayude a redactar `.env.example` sin exponer secretos.

### Qué validar vos
1. Que la instalación sea mínima y suficiente.
2. Que el proyecto compile antes de seguir.
3. Que las variables de entorno estén bien separadas entre frontend y serverless.

### Evidencia útil para guardar
1. Captura del árbol inicial del proyecto.
2. Lista de dependencias instaladas.
3. Notas de por qué se eligió cada herramienta.

### Prompt base sugerido
"Necesito un boilerplate minimalista para React 18 + TypeScript + Vite con Tailwind, React Router y Vitest. Decime exactamente qué instalar, qué archivos crear y qué revisar para confirmar que la base quedó lista."

---

## Etapa 2. Arquitectura y tipos

### Qué pedirle a la IA
1. Que modele los tipos principales del dominio.
2. Que proponga interfaces para product, user, cart, order y auth state.
3. Que ayude a separar services, contexts, hooks y utils.
4. Que detecte dependencias circulares o acoplamientos innecesarios.

### Qué validar vos
1. Que los tipos reflejen los requisitos reales.
2. Que no falten campos importantes para órdenes, imágenes y roles.
3. Que los contextos no acumulen demasiada responsabilidad.

### Salida esperada
1. Lista de tipos base.
2. Contratos de datos para Firestore.
3. Decisión de qué lógica va en reducer, qué lógica va en service y qué lógica va en UI.

### Prompt base sugerido
"Ayudame a diseñar los tipos de dominio para un e-commerce con roles customer/admin, carrito, órdenes y productos con imágenes. Quiero una propuesta tipada en TypeScript, simple pero escalable, y que me expliques qué va en contexts, services, hooks y types."

---

## Etapa 3. Autenticación y roles

### Qué pedirle a la IA
1. Que proponga el flujo de registro, login, logout y persistencia de sesión.
2. Que sugiera cómo manejar roles en frontend y en Firestore.
3. Que ayude a diseñar rutas protegidas.
4. Que detecte casos borde: usuario sin rol, sesión expirada, acceso admin inválido.

### Qué validar vos
1. Que el usuario customer no pueda entrar al panel admin.
2. Que el rol no dependa solo de la UI.
3. Que el manejo de sesión sea consistente al recargar.

### Prompt base sugerido
"Necesito definir un sistema de autenticación con Firebase para un e-commerce con roles customer y admin. Proponeme el flujo completo, las rutas protegidas, los estados del contexto y los errores más comunes que debería contemplar."

---

## Etapa 4. Catálogo y búsqueda

### Qué pedirle a la IA
1. Que diseñe la pantalla de catálogo con estados loading, empty y error.
2. Que recomiende cómo implementar búsqueda con debounce.
3. Que proponga filtros por categoría y navegación al detalle.
4. Que sugiera mejoras de UX para mobile-first.

### Qué validar vos
1. Que la navegación sea intuitiva.
2. Que el catálogo cargue desde Firestore.
3. Que los filtros no rompan el estado de la pantalla.

### Prompt base sugerido
"Estoy construyendo un catálogo de productos para un e-commerce. Ayudame a definir el flujo de búsqueda, filtros, estados vacíos y detalle de producto, pensando en React + Firestore y mobile-first."

---

## Etapa 5. Carrito y reducer

### Qué pedirle a la IA
1. Que proponga acciones del reducer.
2. Que sugiera una estructura de estado robusta.
3. Que revise cómo evitar duplicados y errores de cálculo.
4. Que proponga casos de test para edge cases.

### Qué validar vos
1. Que el total se actualice bien.
2. Que sumar y restar cantidades no rompa el estado.
3. Que el carrito sea testeable aislado.

### Prompt base sugerido
"Necesito diseñar el carrito con Context API + useReducer. Proponeme el estado, las acciones, los selectores si hacen falta y una lista de tests unitarios para asegurar que no haya errores de cantidad o total."

---

## Etapa 6. Checkout y órdenes

### Qué pedirle a la IA
1. Que diseñe el flujo de checkout simulado.
2. Que proponga el esquema de orders en Firestore.
3. Que enumere estados válidos y transiciones.
4. Que sugiera cómo guardar historial y detalle de órdenes.

### Qué validar vos
1. Que la orden se cree solo cuando el flujo se confirme.
2. Que el carrito se limpie al finalizar la compra.
3. Que el usuario pueda ver su historial sin ver órdenes ajenas.

### Prompt base sugerido
"Ayudame a diseñar el checkout de un e-commerce que solo simula el pago. Quiero que definas el modelo de orden, los estados posibles, qué campos guardar y qué validaciones hacer antes de crear la orden."

---

## Etapa 7. Panel admin

### Qué pedirle a la IA
1. Que proponga el layout de admin.
2. Que diseñe el CRUD de productos.
3. Que sugiera un flujo para gestionar órdenes.
4. Que ayude a definir qué acciones deben estar protegidas por rol.

### Qué validar vos
1. Que el panel no repita lógica del cliente.
2. Que el CRUD sea completo y consistente.
3. Que la edición y eliminación tengan confirmaciones claras.

### Prompt base sugerido
"Necesito diseñar un dashboard admin para productos y órdenes. Proponeme la estructura visual, el flujo CRUD, los permisos necesarios y los estados vacíos o de carga que debería mostrar."

---

## Etapa 8. Imágenes y AWS S3

### Qué pedirle a la IA
1. Que explique el flujo correcto de presigned URLs.
2. Que proponga cómo separar frontend, serverless function y S3.
3. Que revise riesgos de seguridad.
4. Que sugiera validaciones de archivo antes de subir.

### Qué validar vos
1. Que las credenciales de AWS nunca estén en el frontend.
2. Que el upload falle de forma segura si el archivo no cumple reglas.
3. Que la URL final quede bien asociada al producto.

### Prompt base sugerido
"Necesito implementar upload de imágenes a AWS S3 usando presigned URLs y Vercel Serverless Functions. Explicame el flujo seguro paso a paso, qué variables de entorno necesito y qué validaciones conviene hacer en frontend y backend."

---

## Etapa 9. Testing

### Qué pedirle a la IA
1. Que genere casos de test para reducer, hooks y componentes.
2. Que proponga cómo mockear Firebase y AWS SDK.
3. Que sugiera pruebas de integración para flujos completos.
4. Que ayude a detectar casos borde que suelen olvidarse.

### Qué validar vos
1. Que los tests no dependan de servicios reales.
2. Que cubran lógica importante y no solo renderizado básico.
3. Que el setup de testing sea liviano y mantenible.

### Prompt base sugerido
"Actuá como reviewer de testing. Necesito una lista de tests unitarios e integración para un e-commerce con carrito, auth, catálogo, checkout y admin. Además, quiero que me digas qué mocks necesito para Firebase y AWS."

---

## Etapa 10. Documentación y entrega

### Qué pedirle a la IA
1. Que ayude a redactar el README final.
2. Que sugiera una tabla de bitácora de uso de IA con al menos 5 momentos reales.
3. Que revise si falta explicar arquitectura, env vars o deploy.
4. Que ayude a ordenar la presentación final del proyecto.

### Qué validar vos
1. Que el README sea útil para otra persona que quiera correr el proyecto.
2. Que la bitácora tenga evidencia concreta, no frases genéricas.
3. Que la documentación coincida con lo que realmente implementaste.

### Prompt base sugerido
"Necesito redactar el README de un proyecto e-commerce full stack. Ayudame a estructurarlo con instalación, arquitectura, variables de entorno, flujo de upload a S3, deploy en Vercel y una bitácora real de uso de IA."

---

## 3. Checklist para arrancar hoy

### Paso 1. Definir base
1. Confirmar el stack final.
2. Crear el proyecto con Vite.
3. Instalar dependencias base.
4. Configurar Tailwind, router y testing.

### Paso 2. Ordenar el proyecto
1. Crear carpetas por capas.
2. Agregar alias y tipos base.
3. Definir .env.example y .gitignore.

### Paso 3. Tomar decisiones técnicas
1. Modelar auth y roles.
2. Diseñar el estado del carrito.
3. Definir el esquema de productos y órdenes.

### Paso 4. Arrancar implementación
1. Montar layouts y rutas.
2. Conectar Firebase.
3. Hacer auth primero.
4. Luego catálogo.
5. Luego carrito y checkout.

---

## 4. Orden recomendado de commits durante el uso de IA

Este orden te permite que la IA acompañe sin que el repo quede caótico.

1. feat: bootstrap project and base tooling
2. chore: set up folder structure and environment files
3. feat: define domain types and service contracts
4. feat: implement auth flow and protected routes
5. feat: build catalog browsing experience
6. feat: add cart reducer and context state
7. feat: implement checkout and order creation
8. feat: build admin dashboard and product crud
9. feat: integrate s3 image uploads
10. test: add unit and integration test coverage
11. docs: complete project readme and ai log
12. fix: polish ui, errors and production readiness

---

## 5. Cierre de cada paso

Antes de pasar a la siguiente etapa, asegurate de responder estas preguntas:
1. ¿La IA me ayudó a decidir algo concreto?
2. ¿Yo validé que esa decisión encaja con la consigna?
3. ¿Quedó una acción implementada o un documento actualizado?
4. ¿Tengo una evidencia que pueda citar luego en la entrega?

Si la respuesta a alguna es no, no cierres la etapa todavía.
