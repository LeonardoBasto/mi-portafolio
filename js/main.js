/* =========================================================
   Portafolio de Elkin Basto - comportamiento
   1. Consola animada al estilo de Python   2. Año en el pie
   ========================================================= */

// ---------------------------------------------------------
// 1. Consola: escribe comandos, muestra un spinner y barras de
//    progreso tipo "tqdm", y repite la secuencia cada cierto tiempo.
//    Sin JavaScript, o con "menos movimiento", se ve el estado final.
// ---------------------------------------------------------
(function terminal() {
  const screen = document.getElementById('term');
  if (!screen) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Guion de la animación: cambia aquí los textos
  const SCRIPT = [
    { cmd: 'whoami' },
    { out: 'Elkin Basto, ingeniero de sistemas' },
    { cmd: 'python verificar_servicios.py' },
    { spinner: 'Conectando con la infraestructura', done: 'Conectado a 4 servicios' },
    { bar: 'Redes y seguridad', status: 'OK' },
    { bar: 'Servidores y nube', status: 'OK' },
    { bar: 'Microsoft 365', status: 'OK' },
    { bar: 'Mesa de servicio', status: 'SLA ✓', warn: true },
    { cmd: 'uptime' },
    { out: '10 años en infraestructura de TI' },
    { prompt: true }
  ];

  const PAUSE_BEFORE_REPEAT = 9000;   // ms antes de repetir
  const SPIN = ['|', '/', '-', '\\'];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const barLen = () => (window.innerWidth < 640 ? 8 : 10);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  };

  function addLine(cls) {
    const p = el('p', 't-line' + (cls ? ' ' + cls : ''));
    screen.appendChild(p);
    return p;
  }

  async function typeCmd(text) {
    const line = addLine();
    line.innerHTML = '<span class="t-prompt">$</span> <span class="t-cmd"></span><span class="t-caret"></span>';
    const cmd = line.querySelector('.t-cmd');
    await wait(350);
    for (const ch of text) {
      cmd.textContent += ch;
      await wait(45 + Math.random() * 55);
    }
    await wait(300);
    line.querySelector('.t-caret').remove();   // "Enter"
  }

  async function spinner(text, done) {
    const line = addLine('t-out');
    const s = el('span', 't-spin');
    line.append(s, ' ' + text + '...');
    for (let i = 0; i < 16; i++) {           // ~1,3 s girando
      s.textContent = SPIN[i % SPIN.length];
      await wait(80);
    }
    line.innerHTML = '<span class="t-ok">✓</span> ' + done;
  }

  async function progress(name, status, warn) {
    const line = addLine('t-row');
    const len = barLen();
    line.innerHTML =
      '<span class="t-name">' + name + '</span>' +
      '<span class="t-bar"><span class="fill"></span><span class="rest"></span></span>' +
      '<span class="t-pct">0%</span><span></span>';
    const fill = line.querySelector('.fill');
    const rest = line.querySelector('.rest');
    const pct = line.querySelector('.t-pct');
    let value = 0;
    while (value < 100) {
      value = Math.min(100, value + 6 + Math.random() * 18);   // avance irregular, como tqdm
      const n = Math.round((value / 100) * len);
      fill.textContent = '█'.repeat(n);
      rest.textContent = '░'.repeat(len - n);
      pct.textContent = Math.round(value) + '%';
      await wait(55 + Math.random() * 60);
    }
    const st = line.lastElementChild;
    st.className = warn ? 't-warn' : 't-ok';
    st.textContent = status;
    await wait(120);
  }

  async function run() {
    while (true) {
      screen.innerHTML = '';
      for (const step of SCRIPT) {
        if (step.cmd) await typeCmd(step.cmd);
        else if (step.out) { addLine('t-out').textContent = step.out; await wait(200); }
        else if (step.spinner) await spinner(step.spinner, step.done);
        else if (step.bar) await progress(step.bar, step.status, step.warn);
        else if (step.prompt) addLine().innerHTML = '<span class="t-prompt">$</span> <span class="t-caret"></span>';
      }
      await wait(PAUSE_BEFORE_REPEAT);
    }
  }

  // Empieza cuando la consola está en pantalla
  new IntersectionObserver(([entry], obs) => {
    if (entry.isIntersecting) { obs.disconnect(); run(); }
  }, { threshold: 0.3 }).observe(screen);
})();


// ---------------------------------------------------------
// 2. Año actual en el pie de página
// ---------------------------------------------------------
document.getElementById('year').textContent = new Date().getFullYear();
