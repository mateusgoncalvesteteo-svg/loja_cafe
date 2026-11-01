const CHAVE = 'carrinho';

export function getCart() {
  return JSON.parse(localStorage.getItem(CHAVE)) ?? [];
}

function salvar(carrinho) {
  localStorage.setItem(CHAVE, JSON.stringify(carrinho));
  window.dispatchEvent(new Event('carrinho:mudou'));
}

export function addItem(cafe) {
  const carrinho = getCart();
  const existente = carrinho.find(item => item.id === cafe.id);

  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({
      id: cafe.id,
      nome: cafe.title,
      preco: cafe.price,
      quantidade: 1
    });
  }
  salvar(carrinho);
}

export function changeQty(id, delta) {
  let carrinho = getCart();
  const item = carrinho.find(i => String(i.id) === String(id));
  if (!item) return;

  item.quantidade += delta;
  if (item.quantidade <= 0) {
    carrinho = carrinho.filter(i => String(i.id) !== String(id));
  }
  salvar(carrinho);
}

export function getCount() {
  return getCart().reduce((soma, item) => soma + item.quantidade, 0);
}

export function getTotal() {
  return getCart().reduce((soma, item) => soma + item.preco * item.quantidade, 0);
}

export function clearCart() {
  localStorage.removeItem(CHAVE);
  window.dispatchEvent(new Event('carrinho:mudou'));
}