export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    // products can be deleted, but they could still be in cart
    if (!cartItem.product) return tally;
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
