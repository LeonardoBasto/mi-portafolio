/* =========================================================
   Portafolio de Elkin Basto - comportamiento de la página
   ========================================================= */

// ---------------------------------------------------------
// CONFIGURACIÓN: cambia aquí tu correo y se actualiza en todo el sitio
// ---------------------------------------------------------
const EMAIL = 'tu-correo@ejemplo.com';


// ---------------------------------------------------------
// 1. Diagrama de red interactivo
// ---------------------------------------------------------
// Cada equipo tiene: posición (x, y) dentro de un lienzo de 100 x 62,
// a qué equipo se conecta (parent), su ícono y el texto que se muestra.
const NODES = [
  {
    id: 'internet', label: 'Internet', short: 'Internet', icon: 'globe', x: 22, y: 8, parent: null,
    title: 'Internet y proveedor',
    text: 'Enlaces dedicados con el proveedor, redundancia y seguimiento de la disponibilidad del canal.',
    layer: 'capa-red'
  },
  {
    id: 'm365', label: 'Microsoft 365', short: 'M365', icon: 'cloud', x: 76, y: 8, parent: 'internet',
    title: 'Microsoft 365',
    text: 'Correo, Teams y SharePoint para toda la empresa: cuentas, licencias, seguridad y automatizaciones con Power Platform.',
    layer: 'capa-nube'
  },
  {
    id: 'firewall', label: 'Firewall Fortinet', short: 'Firewall', icon: 'shield', x: 25, y: 22, parent: 'internet',
    title: 'Firewall y perímetro',
    text: 'Reglas de seguridad, VPN para trabajo remoto y filtrado del tráfico que entra y sale de la red.',
    layer: 'capa-red'
  },
  {
    id: 'switch', label: 'Switch núcleo', short: 'Switch', icon: 'switch', x: 50, y: 35, parent: 'firewall',
    title: 'Red interna',
    text: 'El centro de la red local: segmentación por VLAN para separar oficinas, servidores, telefonía y cámaras.',
    layer: 'capa-red'
  },
  {
    id: 'servers', label: 'Servidores', short: 'Servidores', icon: 'server', x: 13, y: 47, parent: 'switch',
    title: 'Servidores y virtualización',
    text: 'Windows Server, directorio de usuarios, máquinas virtuales y respaldos de la información crítica.',
    layer: 'capa-servidores'
  },
  {
    id: 'voip', label: 'Telefonía IP', short: 'Telefonía', icon: 'phone', x: 36, y: 55, parent: 'switch',
    title: 'Telefonía IP',
    text: 'Extensiones, troncales y equipos telefónicos para que cada sede se comunique sin depender de líneas tradicionales.',
    layer: 'capa-comunicaciones'
  },
  {
    id: 'cctv', label: 'CCTV', short: 'CCTV', icon: 'camera', x: 62, y: 55, parent: 'switch',
    title: 'Videovigilancia',
    text: 'Cámaras y grabadores Hikvision: instalación, almacenamiento de video y monitoreo desde iVMS-4200.',
    layer: 'capa-fisica'
  },
  {
    id: 'access', label: 'Control de acceso', short: 'Acceso', icon: 'lock', x: 84, y: 47, parent: 'switch',
    title: 'Control de acceso',
    text: 'Lectores y permisos de ingreso: quién entra, a qué zona y en qué horario.',
    layer: 'capa-fisica'
  }
];

const DEFAULT_NODE = 'switch';

const topo = document.getElementById('topo');
const linksSvg = document.getElementById('topo-links');
const detail = document.getElementById('topo-detail');
const SVG_NS = 'http://www.w3.org/2000/svg';
const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
const lineEls = {};   // línea que conecta cada equipo con su padre
const nodeEls = {};   // botón de cada equipo

function icon(name) {
  return '<svg class="ico" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
}

function buildTopology() {
  if (!topo) return;

  NODES.forEach((node, i) => {
    // Cable hacia el equipo padre
    if (node.parent) {
      const p = byId[node.parent];
      const line = document.createElementNS(SVG_NS, 'line');
      line.setAttribute('x1', p.x);
      line.setAttribute('y1', p.y);
      line.setAttribute('x2', node.x);
      line.setAttribute('y2', node.y);
      line.style.setProperty('--i', i);
      linksSvg.appendChild(line);
      lineEls[node.id] = line;
    }

    // Botón del equipo
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'node';
    btn.style.left = node.x + '%';
    btn.style.top = (node.y / 62) * 100 + '%';
    btn.style.setProperty('--i', i);
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', node.label);
    btn.innerHTML =
      '<span class="node-ico">' + icon(node.icon) + '</span>' +
      '<span class="node-label">' + node.label + '</span>' +
      '<span class="node-short" aria-hidden="true">' + node.short + '</span>';
    btn.addEventListener('click', () => selectNode(node.id));
    topo.appendChild(btn);
    nodeEls[node.id] = btn;
  });

  // Animación de arranque una sola vez
  topo.classList.add('is-booting');
  setTimeout(() => topo.classList.remove('is-booting'), 1600);

  selectNode(DEFAULT_NODE);
}

function selectNode(id) {
  const node = byId[id];

  Object.values(nodeEls).forEach((el) => el.setAttribute('aria-pressed', 'false'));
  nodeEls[id].setAttribute('aria-pressed', 'true');

  // Ilumina el camino desde internet hasta el equipo
  Object.values(lineEls).forEach((l) => l.classList.remove('is-active'));
  let current = node;
  while (current && current.parent) {
    lineEls[current.id].classList.add('is-active');
    current = byId[current.parent];
  }

  detail.innerHTML =
    '<h3>' + node.title + '</h3>' +
    '<p>' + node.text + '</p>' +
    '<a href="#' + node.layer + '">Ver más sobre esta capa</a>';
}

buildTopology();


// ---------------------------------------------------------
// 2. Resalta la tarjeta de la capa al llegar desde el diagrama
// ---------------------------------------------------------
if (detail) {
  detail.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#capa-"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    document.querySelectorAll('.tile.is-highlight').forEach((el) => el.classList.remove('is-highlight'));
    if (target) {
      target.classList.add('is-highlight');
      setTimeout(() => target.classList.remove('is-highlight'), 2500);
    }
  });
}


// ---------------------------------------------------------
// 3. Interruptor de modo claro / oscuro
// ---------------------------------------------------------
const root = document.documentElement;
const themeSwitch = document.querySelector('.theme-switch');
const themeMeta = document.querySelector('meta[name="theme-color"]');

// Usa el tema elegido con el interruptor; si no hay, el del sistema operativo
function currentTheme() {
  const saved = root.getAttribute('data-theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function syncSwitch() {
  const dark = currentTheme() === 'dark';
  if (themeSwitch) themeSwitch.setAttribute('aria-checked', String(dark));
  if (themeMeta) themeMeta.setAttribute('content', dark ? '#15171A' : '#EEF0F2');
}

if (themeSwitch) {
  themeSwitch.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('tema', next); } catch (e) {}
    syncSwitch();
  });
  syncSwitch();
}


// ---------------------------------------------------------
// 4. Menú en celular
// ---------------------------------------------------------
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('menu');

function closeMenu() {
  nav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.querySelector('.sr-only').textContent = 'Abrir menú';
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.querySelector('.sr-only').textContent = open ? 'Cerrar menú' : 'Abrir menú';
  });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
}


// ---------------------------------------------------------
// 5. Correo y formulario de contacto
// ---------------------------------------------------------
document.querySelectorAll('.js-email').forEach((a) => { a.href = 'mailto:' + EMAIL; });
document.querySelectorAll('.js-email-label').forEach((el) => { el.textContent = EMAIL; });

const form = document.getElementById('contact-form');
const formError = document.getElementById('form-error');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const empresa = form.empresa.value.trim();
    const mensaje = form.mensaje.value.trim();

    if (!nombre || !mensaje) {
      formError.textContent = 'Escribe tu nombre y el mensaje para poder enviarlo.';
      formError.hidden = false;
      (nombre ? form.mensaje : form.nombre).focus();
      return;
    }
    formError.hidden = true;

    const asunto = 'Contacto desde la web: ' + nombre + (empresa ? ' (' + empresa + ')' : '');
    window.location.href =
      'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent(asunto) +
      '&body=' + encodeURIComponent(mensaje);
  });
}


// ---------------------------------------------------------
// 6. Año actual en el pie de página
// ---------------------------------------------------------
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
