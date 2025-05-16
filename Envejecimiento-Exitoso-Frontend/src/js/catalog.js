// js/catalog.js

document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.querySelector('.product-grid');
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  const categoriaSelect = document.getElementById('categoria');
  const temporadaSelect = document.getElementById('temporada');

  const productosMock = [
    { id: 1, nombre: 'Camisa de Verano', categoria: 'ropa', temporada: 'verano', precio: 29.99 },
    { id: 2, nombre: 'Televisor 4K', categoria: 'electronica', temporada: '', precio: 399.99 },
    { id: 3, nombre: 'Cobija de Invierno', categoria: 'hogar', temporada: 'invierno', precio: 19.99 },
    { id: 4, nombre: 'Tablet Android', categoria: 'electronica', temporada: '', precio: 149.99 },
    { id: 5, nombre: 'Ventilador de Pie', categoria: 'hogar', temporada: 'verano', precio: 59.99 },
    { id: 6, nombre: 'Suéter de Otoño', categoria: 'ropa', temporada: 'otono', precio: 24.99 }
  ];

  let productosFiltrados = [...productosMock];

  function renderizarProductos(productos) {
    productGrid.innerHTML = '';

    if (productos.length === 0) {
      productGrid.innerHTML = '<p>No se encontraron productos.</p>';
      return;
    }

    productos.forEach(producto => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img src="https://picsum.photos/seed/${encodeURIComponent(producto.nombre)}/250/150" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p class="price">$${producto.precio.toFixed(2)}</p>
        <button>Ver Detalles</button>
      `;
      productGrid.appendChild(card);
    });
  }

  function aplicarFiltros() {
    const textoBusqueda = searchInput.value.toLowerCase();
    const categoria = categoriaSelect.value;
    const temporada = temporadaSelect.value;

    productosFiltrados = productosMock.filter(producto => {
      const coincideBusqueda = producto.nombre.toLowerCase().includes(textoBusqueda);
      const coincideCategoria = categoria === '' || producto.categoria === categoria;
      const coincideTemporada = temporada === '' || producto.temporada === temporada;
      return coincideBusqueda && coincideCategoria && coincideTemporada;
    });

    renderizarProductos(productosFiltrados);
  }

  searchButton.addEventListener('click', aplicarFiltros);
  categoriaSelect.addEventListener('change', aplicarFiltros);
  temporadaSelect.addEventListener('change', aplicarFiltros);
  searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') aplicarFiltros();
  });

  //Inicia
  renderizarProductos(productosMock);
});
