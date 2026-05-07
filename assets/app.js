const products = [
  { id: 1, name: 'Burger Artesanal', description: 'Pão brioche, carne artesanal, queijo, alface e molho da casa.', price: 28.9, icon: '🍔' },
  { id: 2, name: 'Pizza Individual', description: 'Massa fina, molho de tomate, queijo e calabresa.', price: 32.5, icon: '🍕' },
  { id: 3, name: 'Combo Executivo', description: 'Prato principal, bebida e acompanhamento.', price: 39.9, icon: '🍱' },
  { id: 4, name: 'Açaí Especial', description: 'Açaí com banana, granola, leite em pó e mel.', price: 18.0, icon: '🥤' },
  { id: 5, name: 'Salada Fresh', description: 'Mix de folhas, frango grelhado, tomate e molho leve.', price: 24.9, icon: '🥗' },
  { id: 6, name: 'Sobremesa da Casa', description: 'Doce individual para finalizar o pedido.', price: 12.9, icon: '🍰' }
];

let cart = [];

const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const finishOrder = document.getElementById('finishOrder');
const orderMessage = document.getElementById('orderMessage');

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderProducts() {
  productsGrid.innerHTML = products.map((product) => `
    <article class="product-card">
      <div class="product-image">${product.icon}</div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-footer">
        <span class="price">${formatCurrency(product.price)}</span>
        <button class="add-btn" data-id="${product.id}">Adicionar</button>
      </div>
    </article>
  `).join('');
}

function addToCart(id) {
  const product = products.find((item) => item.id === Number(id));
  if (!product) return;

  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  orderMessage.textContent = '';
  renderCart();
}

function renderCart() {
  if (!cart.length) {
    cartItems.innerHTML = '<p class="muted">Nenhum item adicionado ainda.</p>';
    cartTotal.textContent = formatCurrency(0);
    return;
  }

  cartItems.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <p class="muted">Qtd: ${item.quantity}</p>
      </div>
      <strong>${formatCurrency(item.price * item.quantity)}</strong>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = formatCurrency(total);
}

productsGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-id]');
  if (!button) return;
  addToCart(button.dataset.id);
});

finishOrder.addEventListener('click', () => {
  if (!cart.length) {
    orderMessage.textContent = 'Adicione pelo menos um item para finalizar o pedido demonstrativo.';
    return;
  }

  orderMessage.textContent = 'Pedido demonstrativo finalizado com sucesso.';
  cart = [];
  renderCart();
});

renderProducts();
renderCart();
