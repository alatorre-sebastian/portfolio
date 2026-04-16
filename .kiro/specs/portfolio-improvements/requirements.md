# Documento de Requisitos: Mejoras del Portafolio

## Introducción

Este documento define los requisitos para mejorar el portafolio web de SDET construido con Astro + Tailwind, que simula la interfaz del Playwright Trace Viewer. Las mejoras abarcan diseño responsivo, SEO, accesibilidad, corrección de enlaces rotos, una nueva sección de proyectos (placeholder), y limpieza de código no utilizado.

## Glosario

- **Portafolio**: La aplicación web Astro que simula un Playwright Trace Viewer como concepto de UI para presentar el perfil profesional del usuario.
- **Sidebar_Izquierdo**: El panel lateral izquierdo de 320px que contiene los botones de acciones/pasos (Actions sidebar).
- **Sidebar_Derecho**: El panel lateral derecho de 450px que muestra detalles de Call, Console, Network y Source.
- **Área_de_Contenido**: La sección central que renderiza el DOM simulado correspondiente al paso seleccionado.
- **Paso**: Cada botón en el Sidebar_Izquierdo que representa una acción de Playwright (e.g., `page.goto`, `click`, `hover`).
- **Layout_Principal**: El componente `Layout.astro` que envuelve toda la página con estilos globales y metadatos del `<head>`.
- **Open_Graph**: Protocolo de metadatos que permite previsualización enriquecida al compartir enlaces en redes sociales y plataformas de mensajería.
- **Componente_No_Utilizado**: Archivo `.astro` en `src/components/` que no es importado ni referenciado por ningún otro archivo del proyecto.

## Requisitos

### Requisito 1: Diseño Responsivo para Dispositivos Móviles

**Historia de Usuario:** Como reclutador, quiero ver el portafolio correctamente en mi teléfono, para poder evaluar al candidato sin importar el dispositivo que use.

#### Criterios de Aceptación

1. WHEN el viewport tiene un ancho menor a 1024px, THE Portafolio SHALL colapsar el Sidebar_Izquierdo y el Sidebar_Derecho en un layout de una sola columna apilada verticalmente.
2. WHEN el viewport tiene un ancho menor a 1024px, THE Portafolio SHALL mostrar los pasos del Sidebar_Izquierdo como pestañas horizontales desplazables o como un acordeón accesible.
3. WHEN el viewport tiene un ancho menor a 1024px, THE Sidebar_Derecho SHALL mostrarse debajo del Área_de_Contenido como un panel colapsable o con pestañas.
4. WHEN el viewport tiene un ancho de 1024px o mayor, THE Portafolio SHALL mantener el layout actual de tres columnas con sidebars fijos.
5. THE Portafolio SHALL ser funcional y legible en viewports desde 320px de ancho.

### Requisito 2: Metadatos SEO y Open Graph

**Historia de Usuario:** Como candidato, quiero que al compartir el enlace de mi portafolio en LinkedIn o Slack se muestre una previsualización atractiva, para causar una buena primera impresión.

#### Criterios de Aceptación

1. THE Layout_Principal SHALL incluir una etiqueta `<meta name="description">` con un texto descriptivo del perfil profesional.
2. THE Layout_Principal SHALL incluir las etiquetas Open_Graph: `og:title`, `og:description`, `og:type`, `og:url` y `og:image`.
3. THE Layout_Principal SHALL incluir las etiquetas de Twitter Card: `twitter:card`, `twitter:title`, `twitter:description` y `twitter:image`.
4. WHEN un crawler o bot accede a la página, THE Layout_Principal SHALL servir todas las meta etiquetas en el HTML inicial sin depender de JavaScript del lado del cliente.

### Requisito 3: Mejoras de Accesibilidad

**Historia de Usuario:** Como usuario de tecnología asistiva, quiero poder navegar e interactuar con el portafolio usando un lector de pantalla, para acceder a la información del candidato.

#### Criterios de Aceptación

1. THE Sidebar_Izquierdo SHALL tener un atributo `role="navigation"` y un `aria-label` descriptivo.
2. WHEN un usuario activa un Paso en el Sidebar_Izquierdo, THE Paso activo SHALL tener el atributo `aria-current="step"`.
3. THE Área_de_Contenido SHALL tener un atributo `aria-live="polite"` para notificar a los lectores de pantalla cuando el contenido cambie dinámicamente.
4. WHEN el contenido del Área_de_Contenido cambia, THE Portafolio SHALL actualizar un atributo `aria-label` en el Área_de_Contenido que describa la sección visible actualmente.
5. THE Portafolio SHALL cumplir con un ratio de contraste mínimo de 4.5:1 para todo el texto normal, reemplazando las clases `text-zinc-600` sobre fondos oscuros por colores con contraste suficiente.
6. WHEN un botón de pestaña en el Sidebar_Derecho está activo, THE pestaña SHALL tener el atributo `aria-selected="true"` y las pestañas inactivas SHALL tener `aria-selected="false"`.
7. THE Sidebar_Derecho SHALL implementar el patrón ARIA de tabs (`role="tablist"`, `role="tab"`, `role="tabpanel"`) para las pestañas Call, Console, Network y Source.

### Requisito 4: Corregir Botones de GitHub y LinkedIn

**Historia de Usuario:** Como reclutador, quiero hacer clic en los botones de GitHub y LinkedIn del candidato para visitar sus perfiles, para evaluar su trabajo y presencia profesional.

#### Criterios de Aceptación

1. THE Portafolio SHALL renderizar los elementos de GitHub y LinkedIn en la sección de contacto como enlaces `<a>` en lugar de elementos `<button>`.
2. THE enlace de GitHub SHALL incluir un atributo `href` apuntando al perfil de GitHub del usuario y un atributo `target="_blank"`.
3. THE enlace de LinkedIn SHALL incluir un atributo `href` apuntando al perfil de LinkedIn del usuario y un atributo `target="_blank"`.
4. THE enlace de GitHub y THE enlace de LinkedIn SHALL incluir el atributo `rel="noopener noreferrer"` por seguridad.
5. THE enlace de GitHub y THE enlace de LinkedIn SHALL mantener el estilo visual actual de botones.

### Requisito 5: Sección Placeholder de Proyectos

**Historia de Usuario:** Como candidato, quiero tener una sección de proyectos preparada en mi portafolio, para poder agregar contenido de proyectos en el futuro sin cambios estructurales.

#### Criterios de Aceptación

1. THE Sidebar_Izquierdo SHALL incluir un nuevo Paso con el locator `locator('#projects')` posicionado entre el paso de educación y el paso de contacto.
2. WHEN el usuario selecciona el Paso de proyectos, THE Área_de_Contenido SHALL mostrar un mensaje placeholder indicando que los proyectos se agregarán próximamente.
3. THE Paso de proyectos SHALL seguir el mismo patrón visual y de interacción que los demás pasos existentes.
4. THE datos del Paso de proyectos SHALL estar definidos en `portafolioData.ts` con las mismas propiedades (`dom`, `call`, `console`, `network`, `source`) que las demás entradas.

### Requisito 6: Eliminar Componentes No Utilizados

**Historia de Usuario:** Como desarrollador, quiero que el proyecto solo contenga archivos que se usan activamente, para mantener el código limpio y fácil de mantener.

#### Criterios de Aceptación

1. THE Portafolio SHALL eliminar el archivo `src/components/Welcome.astro` del proyecto.
2. THE Portafolio SHALL eliminar el archivo `src/components/Header.astro` del proyecto.
3. WHEN los archivos son eliminados, THE Portafolio SHALL compilar sin errores y sin referencias rotas a los componentes eliminados.

### Requisito 7: Mejora de Organización del Código (Opcional)

**Historia de Usuario:** Como desarrollador, quiero que los datos del portafolio estén organizados de forma clara, para facilitar futuras modificaciones menores.

#### Criterios de Aceptación

1. WHERE se reorganiza `portafolioData.ts`, THE archivo SHALL separar la función `getSourceCode` de los datos de contenido de forma clara (por ejemplo, con comentarios de sección o agrupación lógica).
2. WHERE se reorganiza `portafolioData.ts`, THE archivo SHALL mantener la misma interfaz de exportación (`portfolioData`) sin cambios en la estructura de datos.
3. WHERE se reorganiza `portafolioData.ts`, THE Portafolio SHALL compilar y funcionar de forma idéntica al estado previo a la reorganización.
