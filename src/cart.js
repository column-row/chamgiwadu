
const cart = {};

export function addItemToCart(item, price) {
  if (!cart[item]) {
    cart[item] = { quantity: 0, price };
  }
  cart[item].quantity++;
  console.table(cart);
  const event = new CustomEvent('cartUpdated', { detail: cart });
  window.dispatchEvent(event);
}

export function getCart() {
  return cart;
}
