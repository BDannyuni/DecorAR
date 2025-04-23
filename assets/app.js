// app.js

// Cambio de pantalla
function mostrarPantalla(id) {
    document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
    document.getElementById(id).classList.add('activa');
  }
  
  // Cambio de modo oscuro/claro
  function alternarModo() {
    document.body.classList.toggle('oscuro');
  }
  
  // Cargar catálogo dinámicamente
  const muebles = [
    { nombre: 'Sillón Vedbo', img: 'img/vedbo.jpg', modelo: 'models/vedbo_design_armchair_by_ikea_-_sillon.glb' },
    { nombre: 'Silla Minimal', img: 'img/silla.jpg', modelo: 'models/silla.glb' },
    // Agrega más muebles aquí
  ];
  
  function cargarCatalogo() {
    const galeria = document.getElementById('galeria');
    muebles.forEach((mueble, index) => {
      const card = document.createElement('div');
      card.className = 'mueble-card';
      card.innerHTML = `
        <img src="${mueble.img}" alt="${mueble.nombre}">
        <h4>${mueble.nombre}</h4>
      `;
      card.onclick = () => {
        document.getElementById('modeloAR').src = mueble.modelo;
        mostrarPantalla('pantallaAR');
      };
      galeria.appendChild(card);
    });
  }
  
  window.onload = () => {
    cargarCatalogo();
    mostrarPantalla('bienvenida');
  };
  