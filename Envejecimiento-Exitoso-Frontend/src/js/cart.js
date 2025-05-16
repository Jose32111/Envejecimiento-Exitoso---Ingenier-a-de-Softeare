document.addEventListener('DOMContentLoaded', () => {
  const cartTable = document.querySelector('.cart-table tbody');
  const totalElement = document.querySelector('.cart-summary span');
  const checkoutBtn = document.querySelector('.checkout-btn');

  // Función para actualizar el subtotal de una fila
  function updateSubtotal(row) {
    const quantityInput = row.querySelector('input[type="number"]');
    const price = parseFloat(row.children[3].textContent.replace('$', ''));
    const subtotalCell = row.children[4];
    const quantity = parseInt(quantityInput.value);
    const subtotal = (price * quantity).toFixed(2);
    subtotalCell.textContent = `$${subtotal}`;
  }

  // Función para calcular el total general
  function updateTotal() {
    let total = 0;
    cartTable.querySelectorAll('tr').forEach(row => {
      const subtotalText = row.children[4].textContent.replace('$', '');
      total += parseFloat(subtotalText);
    });
    totalElement.textContent = `$${total.toFixed(2)}`;
  }

  // Actualizar subtotales y total cuando cambie la cantidad
  cartTable.addEventListener('input', (e) => {
    if (e.target.type === 'number') {
      const row = e.target.closest('tr');
      updateSubtotal(row);
      updateTotal();
    }
  });

  // Eliminar producto del carrito
  cartTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const row = e.target.closest('tr');
      row.remove();
      updateTotal();
    }
  });

  // Botón de checkout
  checkoutBtn.addEventListener('click', () => {
    const total = totalElement.textContent;
    if (parseFloat(total.replace('$', '')) === 0) {
      alert('El carrito está vacío.');
    } else {
      window.location.href = 'payment.html';
    }
  });

  // Inicializar totales al cargar
  cartTable.querySelectorAll('tr').forEach(row => updateSubtotal(row));
  updateTotal();
});
