import { getCafes } from './api.js';
import { addItem, changeQty, getCount, getTotal, clearCart } from './cart.js';
import { root, cabecalho } from './dom.js';
import { paginaInicial, paginaCarrinho, paginaFinalizacao, paginaConfirmacao } from './pages.js';

let cafes = [];

function renderizar() {
  const rota = location.hash.slice(1) || '/';
  let corpo;

  if (rota === '/carrinho') corpo = paginaCarrinho();
  else if (rota === '/finalizar') corpo = paginaFinalizacao();
  else corpo = paginaInicial(cafes);

  root.innerHTML = cabecalho(getCount()) +
    `<main class="container py-4">${corpo}</main>`;
}

function validarFormulario(endereco, pagamento) {
  const erros = [];
  if (endereco.length < 10) {
    erros.push('Informe um endereço completo (mínimo de 10 caracteres).');
  }
  if (!pagamento) {
      erros.push('Selecione um método de pagamento.');
  }
  return erros;
}


root.addEventListener('click', event => {
  const botaoAdd = event.target.closest('[data-add]');
  if (botaoAdd) {
    const cafe = cafes.find(c => String(c.id) === botaoAdd.dataset.add);
    if (cafe) {
      addItem(cafe);
    }
    return;
  }

  const botaoQtd = event.target.closest('[data-action]');
  if (botaoQtd) {
    const delta = botaoQtd.dataset.action === 'inc' ? 1 : -1;
    changeQty(botaoQtd.dataset.id, delta);
  }
});

window.addEventListener('hashchange', renderizar);
window.addEventListener('carrinho:mudou', renderizar);

async function iniciar() {
  root.innerHTML = '<p class="text-center py-5">Carregando cafés...</p>';
  try {
    cafes = await getCafes();
    renderizar();
  } catch (erro) {
    root.innerHTML = `
      <div class="alert alert-danger m-3">
        Não foi possível carregar os cafés. A API json-server está rodando?<br>
        <small>${erro.message}</small>
      </div>`;  
  }
}

iniciar();