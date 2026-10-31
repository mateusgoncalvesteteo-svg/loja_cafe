import { getCafes } from "./api.js";
import { renderCafes } from "./dom.js";
import { addToCart, cart, getCartTotal } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  const cafesContainer = document.getElementById("cafes-container");
  
  if (cafesContainer) {
    const cafes = await getCafes();
    renderCafes(cafes, cafesContainer);

    // Event listener para os botões de adicionar ao carrinho
    cafesContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-add-cart")) {
        const cafeId = Number(e.target.getAttribute("data-id"));
        // Lógica para encontrar o café e adicionar
        getCafes().then(cafesList => {
          const selectedCafe = cafesList.find(c => c.id === cafeId);
          if (selectedCafe) {
            addToCart(selectedCafe);
            alert(`${selectedCafe.title} foi adicionado ao carrinho!`);
          }
        });
      }
    });
  }
}); 