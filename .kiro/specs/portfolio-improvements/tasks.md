# Plan de Implementación: Mejoras del Portafolio

## Resumen

Implementación incremental de las 7 mejoras al portafolio Astro + Tailwind: SEO/OG meta tags, accesibilidad ARIA, diseño responsivo, corrección de enlaces, sección de proyectos placeholder, eliminación de componentes no utilizados y reorganización de código. Cada tarea construye sobre la anterior, priorizando cambios de datos y estructura antes de UI y testing.

## Tareas

- [x] 1. Actualizar `portafolioData.ts`: nueva entrada de proyectos, corrección de enlaces y reorganización
  - [x] 1.1 Agregar comentarios de sección para separar `getSourceCode` de los datos del portafolio, y reorganizar el archivo con agrupación lógica clara
    - Agregar bloque de comentarios `// === Utilidades de renderizado ===` antes de `getSourceCode`
    - Agregar bloque de comentarios `// === Datos del portafolio ===` antes de `export const portfolioData`
    - No cambiar la interfaz de exportación (`portfolioData`)
    - _Requisitos: 7.1, 7.2, 7.3_

  - [x] 1.2 Agregar la entrada `btn-projects` en `portfolioData` entre `btn-edu` y `btn-contact`
    - Crear entrada con las 5 propiedades requeridas: `dom`, `call`, `console`, `network`, `source`
    - El `dom` debe mostrar un mensaje placeholder indicando que los proyectos se agregarán próximamente
    - Usar `getSourceCode` para el campo `source` con líneas apropiadas
    - _Requisitos: 5.2, 5.4_

  - [x] 1.3 Reemplazar los `<button>` de GitHub y LinkedIn por `<a>` con atributos correctos en la entrada `btn-contact`
    - Cambiar `<button>` a `<a>` manteniendo el estilo visual idéntico
    - Agregar `href` apuntando a los perfiles reales, `target="_blank"`, y `rel="noopener noreferrer"`
    - Actualizar `data-pw-selector` de `getByRole('button', ...)` a `getByRole('link', ...)`
    - _Requisitos: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ]* 1.4 Escribir test de propiedad para completitud de entradas en `portfolioData`
    - **Propiedad 4: Completitud de entradas en portfolioData**
    - Usar fast-check para verificar que cada key de `portfolioData` tiene las 5 propiedades (`dom`, `call`, `console`, `network`, `source`) como strings no vacíos
    - Mínimo 100 iteraciones
    - **Valida: Requisitos 5.4, 7.2**

- [x] 2. Checkpoint — Verificar que el proyecto compila correctamente
  - Ejecutar `astro build` o `astro check` para asegurar que los cambios en datos no rompen nada
  - Asegurar que todos los tests pasan, preguntar al usuario si surgen dudas

- [x] 3. Actualizar `Layout.astro` con meta tags SEO y Open Graph
  - [x] 3.1 Extender la interfaz `Props` y agregar meta tags en el `<head>`
    - Agregar `description?: string` y `ogImage?: string` a la interfaz `Props`
    - Agregar `<meta name="description">` con texto descriptivo del perfil profesional
    - Agregar tags Open Graph: `og:title`, `og:description`, `og:type` (website), `og:url`, `og:image`
    - Agregar tags Twitter Card: `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`
    - Todos los valores deben tener defaults en el componente (renderizados en SSG, sin depender de JS del cliente)
    - _Requisitos: 2.1, 2.2, 2.3, 2.4_

- [x] 4. Implementar mejoras de accesibilidad y responsividad en `index.astro`
  - [x] 4.1 Agregar atributos ARIA estáticos al HTML
    - Sidebar Izquierdo: `role="navigation"` + `aria-label="Pasos de la prueba"`
    - Área de Contenido: `aria-live="polite"` + `aria-label` inicial descriptivo
    - Sidebar Derecho tabs: `role="tablist"` en contenedor, `role="tab"` + `aria-selected` en cada pestaña, `role="tabpanel"` en el panel de contenido
    - _Requisitos: 3.1, 3.3, 3.6, 3.7_

  - [x] 4.2 Agregar el botón `btn-projects` en el sidebar izquierdo entre `btn-edu` y `btn-contact`
    - Crear botón con el mismo patrón visual que los demás pasos
    - Usar locator `locator('#projects')` y acción `click`
    - _Requisitos: 5.1, 5.3_

  - [x] 4.3 Convertir el layout de tres columnas a responsivo con Tailwind `lg:` breakpoint
    - Cambiar `<main>` a `flex flex-col lg:flex-row`
    - Sidebar Izquierdo: en móvil, barra horizontal con scroll (`overflow-x-auto`, `flex-row`, `whitespace-nowrap`)
    - Sidebar Derecho: en móvil, debajo del contenido como panel colapsable con botón toggle
    - Área de Contenido: ancho completo en móvil
    - Ajustar `overflow-hidden` del body para permitir scroll vertical en móvil
    - Asegurar funcionalidad desde 320px de ancho
    - _Requisitos: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 4.4 Mejorar contraste de texto reemplazando `text-zinc-600` por `text-zinc-400` donde el ratio sea < 4.5:1 sobre fondos oscuros
    - Revisar y actualizar clases de color en textos sobre fondos `bg-[#161616]`, `bg-[#111]`, `bg-[#090909]`
    - _Requisito: 3.5_

  - [x] 4.5 Actualizar el JavaScript del cliente para manejar ARIA dinámico
    - Al hacer click en un paso: asignar `aria-current="step"` al botón activo y removerlo de los demás
    - Al cambiar contenido: actualizar `aria-label` del Área de Contenido con la sección visible
    - Al hacer click en una pestaña del sidebar derecho: asignar `aria-selected="true"` a la activa y `aria-selected="false"` a las demás
    - _Requisitos: 3.2, 3.4, 3.6_

  - [ ]* 4.6 Escribir test de propiedad para exclusividad de `aria-current` en pasos
    - **Propiedad 1: Exclusividad de aria-current en pasos**
    - Simular secuencias aleatorias de clicks en botones de acción con fast-check y verificar que solo el último clickeado tiene `aria-current="step"`
    - Mínimo 100 iteraciones
    - **Valida: Requisito 3.2**

  - [ ]* 4.7 Escribir test de propiedad para `aria-label` del contenido
    - **Propiedad 2: aria-label del contenido refleja la sección activa**
    - Para cualquier botón de acción seleccionado aleatoriamente, verificar que el `aria-label` del área de contenido corresponde a la sección correcta
    - Mínimo 100 iteraciones
    - **Valida: Requisito 3.4**

  - [ ]* 4.8 Escribir test de propiedad para exclusividad de `aria-selected` en pestañas
    - **Propiedad 3: Exclusividad de aria-selected en pestañas**
    - Generar secuencias aleatorias de clicks en pestañas con fast-check y verificar que exactamente una tiene `aria-selected="true"`
    - Mínimo 100 iteraciones
    - **Valida: Requisito 3.6**

- [ ] 5. Checkpoint — Verificar accesibilidad y responsividad
  - Asegurar que todos los tests pasan, preguntar al usuario si surgen dudas

- [x] 6. Eliminar componentes no utilizados y verificación final
  - [x] 6.1 Eliminar `src/components/Welcome.astro` y `src/components/Header.astro`
    - Verificar que no existen imports ni referencias a estos archivos en el proyecto antes de eliminar
    - _Requisitos: 6.1, 6.2, 6.3_

  - [x] 6.2 Verificar que el proyecto compila sin errores tras la eliminación
    - Ejecutar build para confirmar que no hay referencias rotas
    - _Requisito: 6.3_

- [ ] 7. Checkpoint final — Asegurar que todos los tests pasan
  - Ejecutar todos los tests y verificar que el build completa sin errores
  - Asegurar que todos los tests pasan, preguntar al usuario si surgen dudas

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requisitos específicos para trazabilidad
- Los checkpoints aseguran validación incremental
- Los tests de propiedades validan propiedades universales de correctitud
- fast-check se usa como librería de property-based testing
