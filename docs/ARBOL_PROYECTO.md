# Árbol del proyecto — tramite360

Documento que describe la estructura de carpetas y archivos principales del proyecto.

Raíz

- components.json — metadatos UI (generado por herramientas).
- index.html — entrada HTML para Vite.
- package.json — dependencias y scripts del proyecto.
- README.md — información del proyecto.
- tailwind.config.js — configuración de Tailwind CSS.
- tsconfig.json / tsconfig.app.json / tsconfig.node.json — configuración TypeScript.
- vite.config.ts — configuración de Vite.

public/

- vite.svg — recursos públicos (ej. imágenes usadas en la app).

src/

- App.tsx — componente raíz de React.
- main.tsx — punto de arranque que monta la app en el DOM.
- index.css — estilos globales (incluye Tailwind).

- assets/
  - react.svg — ejemplo/asset estático.

- config/
  - brand.ts — constantes/branding (colores, nombre, etc.).
  - whatsapp.ts — configuración o datos para WhatsApp (número, mensaje).

- lib/
  - utils.ts — utilidades y funciones compartidas.

- pages/
  - Home.tsx — página principal de la aplicación.

- components/
  - layout/
    - Header.tsx — cabecera del sitio (navegación, logo).
    - Footer.tsx — pie de página.

  - sections/
    - HeroSection.tsx — sección hero / entrada de la página.
    - BenefitsSection.tsx — tarjetas de beneficios / features.
    - FaqSection.tsx — sección de preguntas frecuentes.

  - motion/
    - Reveal.tsx — utilitario/animación de aparición (framer-motion u otra).

  - ui/
    - card.tsx — componente Card reutilizable (shadcn refactor reciente).
    - button.tsx — componente Button reutilizable.
    - accordion.tsx — componente de acordeón para FAQs.
    - WhatsAppButton.tsx — botón para abrir WhatsApp (acción compartida).

Otros archivos relevantes

- postcss.config.js — configuración PostCSS.
- eslint.config.js — reglas ESLint.
- package-lock.json / node_modules/ — dependencias instaladas.

Descripción breve y notas

- Tecnologías: Vite + React + TypeScript + Tailwind CSS.
- Patrón de organización: `src` contiene la UI y la lógica; `components` está subdividido por responsabilidad (`layout`, `sections`, `ui`, `motion`).
- Para añadir nuevas secciones: crear archivos en `src/components/sections` y exportarlos desde la página que los utilice (`Home.tsx`).
- Para estilos globales y variables: `index.css` y `tailwind.config.js`.

Archivo creado automáticamente por el asistente.
