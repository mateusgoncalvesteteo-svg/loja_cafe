import { formatarReal, escapar } from './dom.js';
import { getCart, getTotal } from './cart.js';

export function paginaInicial(cafes) {
  const cards = cafes.map(cafe => `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card h-100 shadow-sm border-0">
        <img src="${cafe.image}" class="card-img-top" alt="${escapar(cafe.title)}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title fw-bold">${escapar(cafe.title)}</h5>
          <p class="card-text text-muted small">${escapar(cafe.description)}</p>
          <p class="small text-muted mb-2">
            <strong>Ingredientes:</strong> ${cafe.ingredients.map(escapar).join(', ')}
          </p>
          <p class="fw-bold text-success mt-auto mb-2">${formatarReal(cafe.price)}</p>
          <button class="btn btn-outline-primary mt-2 btn-add-cart w-100" data-add="${cafe.id}">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>`).join('');

  return `<div class="row g-4">${cards}</div>`;
}

export function paginaCarrinho() {
  const carrinho = getCart();

  if (carrinho.length === 0) {
    return `
      <div class="text-center py-5">
        <h3 class="text-muted">Seu carrinho está vazio</h3>
        <a href="#/" class="btn btn-primary mt-3">Ver cafés</a>
      </div>`;
  }

  const linhas = carrinho.map(item => `
    <li class="list-group-item d-flex justify-content-between align-items-center py-3">
      <div>
        <h5 class="mb-1">${escapar(item.nome)}</h5>
        <small class="text-muted">Preço unitário: ${formatarReal(item.preco)}</small>
      </div>
      <div class="d-flex align-items-center gap-3">
        <div class="btn-group" role="group">
          <button class="btn btn-sm btn-outline-secondary" data-action="dec" data-id="${item.id}">−</button>
          <span class="btn btn-light border disabled fw-bold text-dark px-3">${item.quantidade}</span>
          <button class="btn btn-sm btn-outline-secondary" data-action="inc" data-id="${item.id}">+</button>
        </div>
        <span class="fw-bold text-success fs-5">${formatarReal(item.preco * item.quantidade)}</span>
      </div>
    </li>`).join('');

  return `
    <div class="row justify-content-center">
      <div class="col-12 col-md-8">
        <h2 class="mb-4">🛒 Seu Carrinho de Compras</h2>
        <ul class="list-group shadow-sm mb-4">${linhas}</ul>
        <div class="card card-body shadow-sm d-flex flex-row justify-content-between align-items-center mb-4">
          <span class="fs-4 fw-bold">Total do Pedido:</span>
          <span class="fs-4 fw-bold text-success">${formatarReal(getTotal())}</span>
        </div>
        <div class="d-flex justify-content-between">
          <a href="#/" class="btn btn-outline-secondary">Continuar Comprando</a>
          <a href="#/finalizar" class="btn btn-success px-4">Avançar para Finalização</a>
        </div>
      </div>
    </div>`;
}

export function paginaFinalizacao() {
  const carrinho = getCart();
  if (carrinho.length === 0) return paginaCarrinho();

  const resumo = carrinho.map(item =>
    `<li class="list-group-item d-flex justify-content-between">
       <span>${item.quantidade}x ${escapar(item.nome)}</span>
       <span>${formatarReal(item.preco * item.quantidade)}</span>
     </li>`).join('');

  return `
    <h2 class="mb-3">Finalizar compra</h2>
    <ul class="list-group mb-2">${resumo}</ul>
    <p class="text-end fw-bold mb-4">Total: ${formatarReal(getTotal())}</p>
    <form id="form-compra" novalidate class="card card-body shadow-sm">
      <div class="mb-3">
        <label for="endereco" class="form-label">Endereço de entrega</label>
        <input type="text" id="endereco" name="endereco" class="form-control" placeholder="Rua, número, bairro, cidade">
      </div>
      <div class="mb-3">
        <label for="pagamento" class="form-label">Método de pagamento</label>
        <select id="pagamento" name="pagamento" class="form-select">
          <option value="">Escolha uma opção</option>
          <option value="cartao">Cartão de crédito</option>
          <option value="boleto">Boleto</option>
          <option value="pix">PIX</option>
        </select>
      </div>
      <div id="erros"></div>
      <button type="submit" class="btn btn-success">Finalizar</button>
    </form>`;
}

export function paginaConfirmacao(total) {
  return `
    <div class="text-center py-5">
      <h2 class="text-success">✅ Compra realizada!</h2>
      <p class="fs-5">Valor total: ${formatarReal(total)}</p>
      <a href="#/" class="btn btn-primary mt-3">Voltar para a loja</a>
    </div>`;
}