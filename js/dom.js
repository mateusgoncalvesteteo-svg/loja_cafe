export function renderCafes(cafes, containerElement) {
  containerElement.innerHTML = "";
  
  cafes.forEach(cafe => {
    const card = document.createElement("div");
    card.className = "col-md-3 mb-4";
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${cafe.image}" class="card-img-top" alt="${cafe.title}" style="height: 200px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${cafe.title}</h5>
          <p class="card-text text-muted small">${cafe.description}</p>
          <p class="card-text fw-bold mt-auto">R$ ${cafe.price.toFixed(2)}</p>
          <button class="btn btn-outline-primary mt-2 btn-add-cart" data-id="${cafe.id}">Adicionar ao Carrinho</button>
        </div>
      </div>
    `;
    containerElement.appendChild(card);
  });
}