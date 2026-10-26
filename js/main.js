// Año actual en el pie de página
document.querySelectorAll('#year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Formulario de contacto: por ahora abre el cliente de correo con el mensaje.
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = form.nombre.value.trim();
    const mensaje = form.mensaje.value.trim();
    const asunto = encodeURIComponent(`Contacto web de ${nombre}`);
    const cuerpo = encodeURIComponent(mensaje);
    window.location.href = `mailto:tu-correo@ejemplo.com?subject=${asunto}&body=${cuerpo}`;
  });
}
