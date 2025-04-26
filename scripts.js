document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("productos.json");
    const productos = await res.json();

    const populares = productos.filter(p => p.popular);
    const categorias = [...new Set(productos.map(p => p.categoria))];

    const popularesContainer = document.getElementById("populares-container");
    const categoriasContainer = document.getElementById("categorias-container");
    const productosContainer = document.getElementById("productos-container");
    const btnTodos = document.getElementById("btn-todos");

    const crearCard = (producto) => {
      return `
        <div class="card">
          <model-viewer 
            src="${producto.modelo3d}" 
            alt="${producto.nombre}" 
            ar 
            ar-modes="scene-viewer webxr quick-look" 
            environment-image="neutral" 
            auto-rotate 
            camera-controls 
            style="width: 100%; height: 300px; background: #f0f0f0; border-radius: 10px;">
          </model-viewer>
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p><strong>$${producto.precio}</strong></p>
        </div>
      `;
    };
    

    const renderProductos = (lista) => {
      productosContainer.innerHTML = "";
      lista.forEach(p => {
        productosContainer.innerHTML += crearCard(p);
      });
    };

    // Mostrar populares
    populares.forEach(p => {
      popularesContainer.innerHTML += crearCard(p);
    });

    // Mostrar todos los productos al inicio
    renderProductos(productos);

    // Botones por categoría
    categorias.forEach(cat => {
      const btn = document.createElement("button");
      btn.textContent = cat;
      btn.className = "btn-categoria";
      btn.addEventListener("click", () => {
        renderProductos(productos.filter(p => p.categoria === cat));
      });
      categoriasContainer.appendChild(btn);
    });

    // Botón "Todos"
    if (btnTodos) {
      btnTodos.addEventListener("click", () => renderProductos(productos));
    }

  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
});


function esIOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function mostrarInstruccionesIOS() {
  const instrucciones = document.getElementById('instrucciones-ios');
  instrucciones.style.display = 'block';
}

if (esIOS()) {
  mostrarInstruccionesIOS();
}
