//anotaciones por si se me olvida algo
//productos de Postobón
const products = [
  { 
    id: 1, 
    name: "Postobón Manzana", 
    price: 2690, 
    image: "manzana.jpg",
    description: "El clásico sabor a manzana que refresca a toda Colombia",
    promo: "2x1" 
  },
  { 
    id: 2, 
    name: "Colombiana", 
    price: 2600, 
    image: "colombiana.jpg",
    description: "La bebida con el sabor auténtico de Colombia"
  },
  { 
    id: 3, 
    name: "Postobón Uva", 
    price: 2800, 
    image: "uvapostobon.jpg",
    description: "Dulce y refrescante sabor a uva natural"
  },
  { 
    id: 4, 
    name: "Postobón Naranja", 
    price: 2800, 
    image: "naranja.jpg",
    description: "Cítrico y vibrante, perfecto para cualquier momento",
    promo: "50%"
  },
  { 
    id: 5, 
    name: "Postobón Limón", 
    price: 1800, 
    image: "limon.jpg",
    description: "Ácido y refrescante, el favorito del verano",
    promo: "22%"
  },
  { 
    id: 6, 
    name: "Postobón piña", 
    price: 2800, 
    image: "piña.jpg",
    description: "Dulce piña con el toque característico de Postobón",
    promo: "2x1"
  },
  { 
    id: 7, 
    name: "Agua Cristal", 
    price: 2200, 
    image: "agua.jpg",
    description: "Agua pura y cristalina de Postobón"
  },
  { 
    id: 8, 
    name: "Hit Mora", 
    price: 1500, 
    image: "jugohit.jpg",
    description: "Jugo Hit con el delicioso sabor a mora"
  }
];


const materials = [
  { 
    id: 101, 
    name: "Pack Familiar Manzana", 
    price: 12900, 
    image: "packmanzana.jpg",
    description: "6 botellas de Postobón Manzana. Ideal para compartir en familia",
    features: "6 unidades • 400ml c/u"
  },
  { 
    id: 102, 
    name: "Combo Colombiana + Uva + Manzana 4500ml", 
    price: 22500, 
    image: "tres.jpg",
    description: "La combinación perfecta de los sabores más queridos",
    features: "3 botellas 4500ml • Edición especial"
  },
  { 
    id: 103, 
    name: "Manzana 2L", 
    price: 12500, 
    image: "2l.jpg",
    description: "Manzana 2L para los días calurosos",
    features: ""
  },
  { 
    id: 104, 
    name: "Hit Multipack", 
    price: 16800, 
    image: "hit.jpg",
    description: "Variedad de jugos Hit en presentación familiar",
    features: "4 sabores • 1L c/u"
  }
];

let cart = JSON.parse(localStorage.getItem('postobonCart')) || [];

const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartItemsCount = document.getElementById('cartItemsCount');
const cartTotal = document.getElementById('cartTotal');

function formatCOP(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(value);
}

function renderCarousel() {
  const carousel = document.getElementById('carousel');
  const dotsContainer = document.getElementById('dots');
  if (!carousel || !dotsContainer) return;

  carousel.innerHTML = '';
  dotsContainer.innerHTML = '';

  products.slice(0, 6).forEach((product, index) => {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.innerHTML = `<img src="${product.image}" alt="${product.name}" loading="lazy">`;
    item.addEventListener('click', () => {
      window.location.href = 'productos.html';
    });
    carousel.appendChild(item);

    const dot = document.createElement('div');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  let currentSlide = 0;
  const totalSlides = products.slice(0, 6).length;

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
  }

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.onclick = prevSlide;
  if (nextBtn) nextBtn.onclick = nextSlide;

  // auto cada 5 segundos
  setInterval(nextSlide, 5000);
}

function renderProducts() {
  if (!productGrid) return;
  productGrid.innerHTML = '';

  products.forEach(product => {
    const promoHTML = product.promo 
      ? `<span class="promo-badge">${product.promo}</span>` 
      : '';

    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      ${promoHTML}
      <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-price">${formatCOP(product.price)}</div>
        <button class="btn-add" onclick="addToCart(${product.id})">Agregar al carrito</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

function renderMaterials() {
  const list = document.querySelector('.materials-list');
  if (!list) return;
  list.innerHTML = '';

  materials.forEach(item => {
    const el = document.createElement('div');
    el.className = 'material-item';
    el.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="material-image" loading="lazy">
      <div class="material-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p style="font-size:0.85rem;color:#888">${item.features}</p>
        <div class="material-price">${formatCOP(item.price)}</div>
        <button class="btn-add" onclick="addMaterialToCart(${item.id})">Agregar al carrito</button>
      </div>
    `;
    list.appendChild(el);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('postobonCart', JSON.stringify(cart));
  updateCartUI();
  showNotification(`${product.name} agregado al carrito`);
}

function addMaterialToCart(id) {
  const item = materials.find(m => m.id === id);
  if (!item) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem('postobonCart', JSON.stringify(cart));
  updateCartUI();
  showNotification(`${item.name} agregado al carrito`);
}

function updateCartUI() {
  if (!cartCount) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  if (cartItemsCount) cartItemsCount.textContent = `(${totalItems})`;

  if (!cartItems) return;
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align:center;color:#888;padding:2rem 0">Tu carrito está vacío</p>';
    if (cartTotal) cartTotal.textContent = formatCOP(0);
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div>${formatCOP(item.price)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="qty-btn" onclick="removeFromCart(${item.id})" style="margin-left:auto;color:#e6007e">✕</button>
        </div>
      </div>
    `;
    cartItems.appendChild(div);
  });

  if (cartTotal) cartTotal.textContent = formatCOP(total);
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  localStorage.setItem('postobonCart', JSON.stringify(cart));
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem('postobonCart', JSON.stringify(cart));
  updateCartUI();
}

function showInvoice() {
  if (cart.length === 0) {
    showNotification('Tu carrito está vacío');
    return;
  }

  const details = document.getElementById('invoiceDetails');
  if (!details) return;

  let html = '';
  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    html += `<p><span>${item.name} × ${item.quantity}</span> <strong>${formatCOP(itemTotal)}</strong></p>`;
  });

  const envio = subtotal > 0 ? 5000 : 0;
  const total = subtotal + envio;

  html += `<p><span>Envío</span> <strong>${formatCOP(envio)}</strong></p>`;
  html += `<p class="total-invoice"><span>TOTAL</span> <strong>${formatCOP(total)}</strong></p>`;

  details.innerHTML = html;
  document.getElementById('modalInvoice').classList.add('active');
}

function confirmPurchase() {
  document.getElementById('modalInvoice').classList.remove('active');
  document.getElementById('modalSuccess').classList.add('active');
  
  cart = [];
  localStorage.removeItem('postobonCart');
  updateCartUI();
  showNotification("¡Compra realizada con éxito!");
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// circulito ese que sale al lado del carrito no se como se llama (notificacion)
function showNotification(message) {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.textContent = message;
  notif.style.cssText = `
    position:fixed; bottom:30px; left:50%; transform:translateX(-50%);
    background:var(--primary); color:white; padding:14px 32px;
    border-radius:50px; font-weight:500; z-index:1000;
    box-shadow:0 10px 30px rgba(230,0,126,0.4);
    animation:notifSlide 3.5s ease forwards;
  `;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3500);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes notifSlide {
    0%,100% { opacity:0; transform:translateX(-50%) translateY(20px); }
    15%,85% { opacity:1; transform:translateX(-50%) translateY(0); }
  }
`;
document.head.appendChild(style);


// vaina esa que pone una vaina morada debajo de la vaina esa(por fin funciona en Productos también)
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  renderCarousel();
  renderProducts();
  renderMaterials();
  updateCartUI();
});

// eventos del carrito
document.addEventListener('click', (e) => {
  if (e.target.closest('#cartBtn')) {
    cartSidebar.classList.add('open');
    overlay.classList.add('active');
  }
  if (e.target.closest('#closeCart') || e.target === overlay) {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('active');
  }
  if (e.target.matches('.btn-checkout') || e.target.closest('.btn-checkout')) {
    showInvoice();
  }
});