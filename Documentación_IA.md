# Documentación de uso de IA en el proyecto Proyecto-M5

Este documento describe cómo se utilizó IA (GitHub Copilot y asistentes LLM) específicamente durante la refactorización y desarrollo del repositorio Proyecto-M5. Incluye los prompts/órdenes principales que se ejecutaron, los cambios aplicados en el código y las verificaciones realizadas.

Fecha de actualización: 26 de mayo de 2026

---

## Resumen ejecutivo
- Contexto: aplicación e‑commerce (Proyecto-M5) con React + TypeScript, Vite, Firebase (Auth + Firestore) y uploads a AWS S3 mediante URLs firmadas.
- Objetivo del uso de IA: acelerar refactors estructurales (mover lógica a `providers`, extraer `hooks`), corregir errores TypeScript/ESLint, modularizar componentes, mover tests y generar materiales de defensa (diagramas y guías).

---

## Prompts / tareas principales ejecutadas con IA
- Refactor: "Mover la lógica de contextos a providers y dejar los contexts sólo como tipos/creadores" → cambios en `src/providers/*`, `src/contexts/*`, `src/hooks/*`.
- Hooks: "Crear `useAuth` y `useCart` como consumidores tipados de los contexts" → `src/hooks/useAuth.ts`, `src/hooks/useCart.ts`.
- Services: "Extraer acceso a Firestore a `src/services/products.ts` y `src/services/orders.ts`" → consultas, transacciones y helpers centralizados.
- Admin/upload: "Implementar subida a S3 con URL firmada" → handler de subida usado en `src/pages/admin/AdminProducts.tsx` y endpoint `/api/upload`.
- Tests y lint: "Arreglar fallos TS/ESLint y mover tests a `src/tests`" → correcciones puntuales de tipos, efectos y reglas de ESLint.

---

## Cambios aplicados (resumen por áreas y archivos clave)
- Providers / Hooks:
	- `src/providers/AuthProvider.tsx` (autenticación, onAuthStateChanged, register/login/logout)
	- `src/providers/CartProvider.tsx` (reducer, persistencia en localStorage, totales)
	- `src/providers/AppProviders.tsx` (composición de providers)
	- `src/hooks/useAuth.ts`, `src/hooks/useCart.ts`
- Contexts:
	- `src/contexts/AuthContext.tsx`, `src/contexts/CartContext.ts` (tipos + createContext)
- Services:
	- `src/services/products.ts` (fetchProducts, getProductById, create/update/delete)
	- `src/services/orders.ts` (createOrder con writeBatch/transaction, getUserOrders)
- Páginas y componentes:
	- `src/pages/admin/AdminProducts.tsx` (formulario y manejo de imágenes con pre-signed URL)
	- `src/pages/ProductDetail.tsx` (uso de `getProductById` y `useCart`)
	- `src/components/CatalogProductCard.tsx`, `src/components/CartItemRow.tsx`, `src/components/CartDrawer.tsx`, `src/components/Navbar.tsx`
- Tests & config:
	- Tests movidos a `src/tests/*` y ajustes menores en selectores.
	- `vite.config` y ajustes para `vitest` y tipado.
- Documentación/defensa:
	- `material_defensa/` (diagramas SVG, `conceptos_basicos.md`, `soluciones_preguntas_live.md`) — esta carpeta está listada en `.gitignore`.

---

## Cómo se usó la IA (flujo de trabajo y verificaciones)
1. Se pidieron cambios concretos a la IA (prompts cortos y enfocados) para generar snippets o parches.
2. Todos los snippets se revisaron manualmente y se integraron con `apply_patch` en el repo local.
3. Tras cada cambio importante se ejecutaron comprobaciones locales:
	 - `npm run build` (Vite) — verificar que compila.
	 - `npm run test` / `vitest` — ejecutar suite de tests afectada.
	 - Revisión manual en la app (login, añadir al carrito, checkout) cuando fue necesario.
4. Se respetó la preferencia del usuario de pedir confirmación antes de commits/pushes cuando así se indicó.

---

## Buenas prácticas aplicadas y recomendaciones
- Revisar siempre los snippets propuestos por la IA: tipos, efectos y llamadas a la API.
- Para operaciones críticas (stock/órdenes) usar transacciones (`runTransaction` / `writeBatch`) en Firestore.
- Mantener separación de responsabilidades: `services` para datos, `providers` para lógica/estado, `hooks` para consumo.
- Usar validación de esquemas (Zod/Yup) en formularios importantes (admin/productos, checkout).

---

## Riesgos y controles
- No aceptar cambios automáticos sin revisión humana.
- Evitar exponer credenciales en frontend; usar endpoints de servidor para operaciones sensibles (ej.: presigned URLs para S3).
- Mantener tests robustos y basados en roles/aria para minimizar roturas por cambios visuales.

---
