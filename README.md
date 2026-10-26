# mi-portafolio

Sitio web personal de Elkin Basto, ingeniero de sistemas. Sitio estático en HTML, CSS y JavaScript, sin dependencias.

Publicado en: https://leonardobasto.github.io/mi-portafolio/

## Estructura

```
mi-portafolio/
├── index.html      Página principal (una sola página con secciones)
├── contacto.html   Redirige a la sección de contacto
├── css/styles.css  Estilos: variables de color al inicio, modo claro y oscuro
├── js/main.js      Diagrama de red, tema, menú móvil y formulario
├── img/logo.svg    Logo e ícono de la pestaña
├── README.md       Este archivo
└── .gitignore      Archivos que Git no debe versionar
```

## Cómo editar lo más común

| Quiero cambiar... | Dónde |
|---|---|
| Mi correo | `js/main.js`, constante `EMAIL` al inicio |
| Textos de secciones y proyectos | `index.html` |
| Equipos del diagrama de red | `js/main.js`, arreglo `NODES` |
| Colores | `css/styles.css`, bloque `:root` al inicio |

## Probar en local

Abre la carpeta en VS Code y usa la extensión **Live Server** (clic derecho en `index.html` → *Open with Live Server*).

## Publicar cambios

```
git add .
git commit -m "Describe el cambio"
git push
```

GitHub Pages publica automáticamente cada `push` a la rama `main`.
