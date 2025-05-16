function generateOrderNumber() {
  // Genera un número de pedido aleatorio
  return Math.floor(Math.random() * 1000000); // Número de pedido aleatorio entre 0 y 999999
}

function renderConfirmation() {
  // Obtener el elemento que mostrará el número de pedido
  const orderNumberElement = document.querySelector('.order-number');
  
  // Generar el número de pedido y actualizar el contenido
  const orderNumber = generateOrderNumber();
  orderNumberElement.textContent = `#${orderNumber}`;
}

document.addEventListener('DOMContentLoaded', () => {
  // Al cargar el contenido, renderizar la confirmación del pedido
  renderConfirmation();

  // Obtener los botones de navegación
  const historyBtn = document.querySelector('.history-btn');
  const continueBtn = document.querySelector('.continue-btn');

  // Redirigir al historial de pedidos
  historyBtn.addEventListener('click', () => {
    window.location.href = 'order-history.html'; // Redirige a la página de historial de pedidos
  });

  // Redirigir a la página de catálogo para continuar comprando
  continueBtn.addEventListener('click', () => {
    window.location.href = 'catalog.html'; // Redirige a la página del catálogo
  });
});
