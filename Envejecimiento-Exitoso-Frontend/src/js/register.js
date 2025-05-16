// register.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const errorMessage = document.querySelector('.error-message');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir envío real del formulario

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const direccion = document.getElementById('direccion').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    // Validaciones básicas
    if (!nombre || !email || !password || !confirmPassword) {
      mostrarError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      mostrarError('Las contraseñas no coinciden.');
      return;
    }

    // Simular registro (en una app real esto sería una solicitud al backend)
    const nuevoUsuario = { nombre, email, password, direccion, telefono };

    // Guardar usuario simulado en localStorage (esto es solo demostrativo)
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const existente = usuarios.find(u => u.email === email);

    if (existente) {
      mostrarError('Ya existe una cuenta registrada con ese correo electrónico.');
      return;
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = './login.html';
  });

  function mostrarError(mensaje) {
    errorMessage.querySelector('p').textContent = mensaje;
    errorMessage.style.display = 'block';
  }
});
