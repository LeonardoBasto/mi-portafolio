# mi-portafolio

Sitio web personal de Elkin Basto, ingeniero de sistemas. Sitio estático en HTML, CSS y JavaScript, sin dependencias.

Publicado en: https://leonardobasto.github.io/mi-portafolio/

## Estructura

```
mi-portafolio/
├── index.html      Página principal (una sola página con secciones)
├── contacto.html   Redirige a la sección de contacto
├── css/styles.css  Estilos: colores en el bloque :root al inicio
├── js/main.js      Año automático en el pie de página
├── img/logo.svg    Logo e ícono de la pestaña
├── README.md       Este archivo
└── .gitignore      Archivos que Git no debe versionar
```

## Cómo editar lo más común

| Quiero cambiar... | Dónde |
|---|---|
| Textos, áreas, trayectoria y tecnologías | `index.html` |
| Enlaces de contacto (LinkedIn, GitHub) | `index.html`, sección `contacto` |
| Colores (azul, grises, sombras del relieve) | `css/styles.css`, bloque `:root` |

## Probar en local

Abre la carpeta en VS Code y usa la extensión **Live Server** (clic derecho en `index.html` → *Open with Live Server*).

## Publicar cambios

```
git add .
git commit -m "Describe el cambio"
git push
```

GitHub Pages publica automáticamente cada `push` a la rama `main`.
