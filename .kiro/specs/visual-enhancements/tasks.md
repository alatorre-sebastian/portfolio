# Tareas de Implementación — Mejoras Visuales del Portafolio

- [x] 1. Configuración base y paleta de colores
  - [x] 1.1 Extender `tailwind.config.mjs` con los colores de acento `accent-purple` (#a78bfa) y `accent-amber` (#fbbf24)
  - [x] 1.2 Agregar las animaciones CSS en `src/styles/global.css`: keyframes `fade-in-up`, clases `.animate-fade-in-up`, `.stagger-child`, media query `prefers-reduced-motion`
  - [x] 1.3 Agregar estilos de micro-interacción en `global.css`: `.skill-badge-hover` (scale + shadow en hover), `.card-hover` (border glow en hover), `.focus-ring` (focus-visible accesible)
  - [x] 1.4 Agregar estilos de hover mejorado para `.action-btn` en `Layout.astro` (indicador lateral con borde izquierdo coloreado, transición 200ms)

- [x] 2. Corrección de idioma y reescritura de textos
  - [x] 2.1 Cambiar `lang="es"` a `lang="en"` en `Layout.astro` y actualizar la meta description a inglés
  - [x] 2.2 Reescribir la bio en `portafolioData.ts` (sección `btn-intro`): 3 párrafos en inglés (identidad profesional, stack técnico, valor diferenciador), subtítulo de rol a "SDET · QA Automation Engineer"
  - [x] 2.3 Traducir textos en español de `portafolioData.ts`: "Proyectos destacados próximamente" y "Esta sección se actualizará" en `btn-projects`
  - [x] 2.4 Actualizar los nombres de sección en el mapa `sectionNames` de `index.astro` de español a inglés

- [x] 3. Iconos SVG profesionales en contacto
  - [x] 3.1 Reemplazar emojis (📍, 📱, ✉️) por SVGs inline de Heroicons (MapPin, Phone, Envelope) en `btn-contact` de `portafolioData.ts`, tamaño 20px, `currentColor`
  - [x] 3.2 Agregar iconos SVG inline de GitHub y LinkedIn junto a los textos de los enlaces en `btn-contact` de `portafolioData.ts`

- [x] 4. Mejoras visuales en Skills
  - [x] 4.1 Reorganizar `btn-skills` en `portafolioData.ts` con 3 grupos: "Testing Frameworks" (verde, badges prominentes), "Programming Languages" (púrpura), "Tools & Practices" (ámbar)
  - [x] 4.2 Agregar etiquetas de categoría visibles encima de cada grupo de badges en la sección de Technical Skills
  - [x] 4.3 Aplicar estilo más prominente (tamaño mayor, font-bold, borde más visible) a los badges de Playwright, Cypress y Selenium

- [x] 5. Enriquecimiento visual de la Sección Intro
  - [x] 5.1 Aplicar un gradiente sutil al nombre o subtítulo de rol en `btn-intro` de `portafolioData.ts` usando clases de Tailwind (`bg-gradient-to-r`, `bg-clip-text`, `text-transparent`)

- [x] 6. Animaciones de entrada y micro-interacciones
  - [x] 6.1 Modificar la lógica de transición en `index.astro` para aplicar la clase `.animate-fade-in-up` al contenido nuevo y `.stagger-child` a los elementos hijos con delay incremental de 60ms
  - [x] 6.2 Aplicar clases de hover a los badges de skills, tarjetas de experiencia/educación/contacto y botones de acción en los strings HTML de `portafolioData.ts`

- [x] 7. Verificación y testing
  - [x] 7.1 Verificar que no quedan textos en español en ninguna sección de `portafolioData.ts`
  - [x] 7.2 Verificar que todos los SVGs en contacto usan `currentColor` y tienen dimensiones de 20px
  - [x] 7.3 Verificar que `prefers-reduced-motion` desactiva todas las animaciones definidas
  - [x] 7.4 Ejecutar build de Astro (`astro build`) para confirmar que no hay errores de compilación
