export const root = document.getElementById('root');

export function formatarReal(valor) {
  return `R$ ${Number(valor).toFixed(2).replace('.', ',')}`;
}

export function escapar(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

export function cabecalho(quantidadeItens) {
  return `
    <header class="navbar navbar-dark bg-dark px-4 shadow-sm">
      <a class="navbar-brand d-flex align-items-center" href="#/">
        <i class="fa-brands fa-java me-2" style="font-size: 1.5rem; color: #f89820;"></i>
        <span>Loja de Cafés</span>
      </a>
      <a class="btn btn-outline-light position-relative px-3 py-2" href="#/carrinho" aria-label="Ver carrinho">
        <i class="fa-solid fa-cart-shopping"></i>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          ${quantidadeItens}
        </span>
      </a>
    </header>`;
}