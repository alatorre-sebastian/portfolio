# Documento de Requisitos — Mejoras Visuales del Portafolio

## Introducción

Este documento define los requisitos para mejorar visualmente el portafolio web de SDET que simula la interfaz del Playwright Trace Viewer. Las mejoras abarcan cinco áreas clave: reescritura de textos de perfil para que sean más auténticos y memorables, enriquecimiento de la paleta de colores más allá del esquema monocromático actual, incorporación de animaciones de entrada y micro-interacciones, reemplazo de texto plano y emojis por iconos SVG profesionales, y corrección de inconsistencias de idioma. El objetivo es transformar el portafolio de una presentación funcional a una experiencia visual pulida y memorable que refleje la identidad profesional del candidato.

## Glosario

- **Portafolio**: La aplicación web construida con Astro + Tailwind CSS que simula el Playwright Trace Viewer.
- **Panel_Principal**: El área central de contenido (`#content-area`) donde se renderiza la información de cada sección.
- **Panel_Lateral**: La barra lateral izquierda (`aside`) que contiene los botones de navegación (Actions).
- **Panel_Detalle**: La barra lateral derecha (`#detail-sidebar`) que muestra las pestañas Call, Console, Network y Source.
- **Sección_Intro**: La vista de perfil/introducción que se muestra al hacer clic en `page.goto /profile`.
- **Sección_Skills**: La vista de habilidades técnicas y blandas.
- **Sección_Contacto**: La vista con información de contacto y enlaces a redes sociales.
- **Sección_Proyectos**: La vista placeholder de proyectos destacados.
- **Badge_Skill**: Cada etiqueta individual que representa una habilidad técnica o herramienta.
- **Botón_Acción**: Cada botón de navegación en el Panel_Lateral que simula un paso de Playwright.
- **Icono_SVG**: Gráfico vectorial escalable inline utilizado para representar visualmente una marca o concepto.
- **Animación_Entrada**: Efecto de transición CSS que se aplica cuando un elemento aparece en pantalla por primera vez.
- **Micro_Interacción**: Efecto visual sutil que responde a una acción del usuario (hover, click, focus).

## Requisitos

### Requisito 1: Reescritura de textos de perfil

**Historia de Usuario:** Como visitante del portafolio, quiero leer una bio que transmita personalidad y pasión por el testing, para poder diferenciar a este candidato de otros perfiles genéricos.

#### Criterios de Aceptación

1. WHEN la Sección_Intro se carga, THE Portafolio SHALL mostrar una bio reescrita que incluya al menos una frase que comunique motivación personal por la calidad de software, en lugar de solo listar credenciales académicas.
2. WHEN la Sección_Intro se carga, THE Portafolio SHALL mostrar un subtítulo de rol que sea más descriptivo que "QA ENGINEER" (por ejemplo, "SDET · QA Automation Engineer" o similar que refleje la especialización real).
3. THE Portafolio SHALL presentar la bio en un máximo de 3 párrafos cortos, cada uno enfocado en un aspecto distinto: identidad profesional, stack técnico principal, y valor diferenciador.
4. THE Portafolio SHALL utilizar el idioma inglés de forma consistente en todos los textos de la bio, sin mezclar español.

### Requisito 2: Corrección de inconsistencias de idioma

**Historia de Usuario:** Como visitante del portafolio, quiero que todo el contenido esté en un solo idioma consistente, para tener una experiencia profesional y coherente.

#### Criterios de Aceptación

1. THE Portafolio SHALL presentar todo el contenido visible al usuario en idioma inglés de forma consistente.
2. WHEN la Sección_Proyectos se carga, THE Portafolio SHALL mostrar el texto placeholder en inglés en lugar de "Proyectos destacados próximamente".
3. THE Portafolio SHALL mantener los textos técnicos de la simulación de Playwright (locators, código fuente, logs de consola) en inglés, consistente con el idioma del framework.

### Requisito 3: Enriquecimiento de la paleta de colores

**Historia de Usuario:** Como visitante del portafolio, quiero ver acentos de color que aporten profundidad visual y jerarquía, para que la interfaz se sienta más viva sin perder la estética oscura del Trace Viewer.

#### Criterios de Aceptación

1. THE Portafolio SHALL incorporar al menos 2 colores de acento adicionales (además del azul y verde actuales) aplicados de forma sutil en bordes, fondos o gradientes.
2. WHEN el usuario visualiza la Sección_Skills, THE Portafolio SHALL diferenciar visualmente las categorías de skills (frameworks de testing, lenguajes de programación, herramientas) mediante colores de acento distintos para cada categoría.
3. THE Portafolio SHALL aplicar un gradiente sutil o efecto de color en al menos un elemento destacado de la Sección_Intro (por ejemplo, el nombre o el subtítulo de rol).
4. WHILE el usuario navega entre secciones, THE Portafolio SHALL mantener la coherencia visual con la estética oscura del Playwright Trace Viewer, sin introducir colores que rompan el tema.

### Requisito 4: Animaciones de entrada

**Historia de Usuario:** Como visitante del portafolio, quiero que los elementos aparezcan con transiciones suaves al cambiar de sección, para que la experiencia se sienta fluida y profesional.

#### Criterios de Aceptación

1. WHEN el usuario hace clic en un Botón_Acción, THE Panel_Principal SHALL animar la entrada del nuevo contenido con un efecto de fade-in combinado con un desplazamiento vertical sutil (slide-up), con una duración entre 200ms y 400ms.
2. WHEN el contenido de una sección se carga en el Panel_Principal, THE Portafolio SHALL aplicar animaciones escalonadas (staggered) a los elementos hijos, de modo que cada elemento aparezca con un retraso incremental de 50ms a 100ms respecto al anterior.
3. WHEN el usuario hace clic en un Botón_Acción del Panel_Lateral, THE Botón_Acción SHALL mostrar una transición visual suave al cambiar al estado activo, con una duración entre 150ms y 250ms.
4. THE Portafolio SHALL respetar la preferencia del sistema operativo `prefers-reduced-motion`, desactivando todas las animaciones de entrada cuando el usuario tenga activada la opción de reducir movimiento.

### Requisito 5: Micro-interacciones en hover y focus

**Historia de Usuario:** Como visitante del portafolio, quiero recibir feedback visual al interactuar con elementos, para que la interfaz se sienta responsiva y pulida.

#### Criterios de Aceptación

1. WHEN el usuario pasa el cursor sobre un Badge_Skill, THE Badge_Skill SHALL mostrar un efecto de elevación (scale y/o sombra) con una transición suave de 150ms a 200ms.
2. WHEN el usuario pasa el cursor sobre un Botón_Acción en el Panel_Lateral, THE Botón_Acción SHALL mostrar un indicador visual lateral (borde izquierdo coloreado o fondo con gradiente) con transición suave.
3. WHEN el usuario pasa el cursor sobre las tarjetas de experiencia, educación o contacto, THE Portafolio SHALL aplicar un efecto sutil de elevación o brillo en el borde de la tarjeta.
4. WHEN un elemento interactivo recibe focus mediante teclado, THE Portafolio SHALL mostrar un indicador de focus visible y accesible, distinto del efecto hover.

### Requisito 6: Iconos SVG profesionales

**Historia de Usuario:** Como visitante del portafolio, quiero ver iconos SVG reconocibles para las redes sociales y la información de contacto, para que la interfaz se vea profesional y los enlaces sean fácilmente identificables.

#### Criterios de Aceptación

1. THE Sección_Contacto SHALL mostrar un Icono_SVG inline para GitHub junto al texto del enlace, reemplazando el texto plano actual.
2. THE Sección_Contacto SHALL mostrar un Icono_SVG inline para LinkedIn junto al texto del enlace, reemplazando el texto plano actual.
3. WHEN la Sección_Contacto se carga, THE Portafolio SHALL reemplazar los emojis de contacto (📍, 📱, ✉️) por Icono_SVG inline profesionales (pin de ubicación, teléfono, sobre de correo).
4. THE Portafolio SHALL renderizar todos los Icono_SVG como elementos SVG inline (no como imágenes externas), con un tamaño consistente de 16px a 20px y color heredado del contexto.

### Requisito 7: Mejoras visuales en la sección de Skills

**Historia de Usuario:** Como visitante del portafolio, quiero que los badges de habilidades tengan una jerarquía visual clara, para poder identificar rápidamente las competencias principales del candidato.

#### Criterios de Aceptación

1. THE Sección_Skills SHALL organizar los Badge_Skill en grupos visuales claramente diferenciados: frameworks de testing (prioridad alta), lenguajes de programación (prioridad media), y herramientas/otros (prioridad estándar).
2. WHEN el usuario visualiza la Sección_Skills, THE Portafolio SHALL destacar los Badge_Skill de frameworks de testing (Playwright, Cypress, Selenium) con un tamaño o estilo visual más prominente que el resto.
3. THE Sección_Skills SHALL incluir etiquetas de categoría visibles encima de cada grupo de Badge_Skill para facilitar el escaneo visual.
