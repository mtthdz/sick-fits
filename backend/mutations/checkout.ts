/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput, OrderCreateInput } from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';

interface Arguments {
  token: string,
}

export default async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  /**
   * 1. ensure user is signed in
   * 2. calculate total price
   * 3. create payment with stripe
   * 4. convert cart items to order items
   * 5. create order and return
   */
  const userId = context.session.itemId;
  if (!userId) throw new Error('Sorry! You must be signed in to create an order.');

  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: `
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `
  });

  const cartItems = user.cart.filter(cartItem => cartItem.product);
  const amount = cartItems.reduce(function (tally: number, cartItem: CartItemCreateInput) {
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);

  const charge = await stripeConfig.paymentIntents.create({
    amount,
    currency: 'USD',
    confirm: true,
    payment_method: token,
  }).catch(err => {
    console.log(err);
    throw new Error(err.message);
  });
}
