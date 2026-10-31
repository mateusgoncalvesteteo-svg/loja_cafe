export let cart = [];

export function addToCart(cafe, quantity = 1) {
  const existingItem = cart.find(item => item.id === cafe.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...cafe, quantity });
  }
}

export function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}