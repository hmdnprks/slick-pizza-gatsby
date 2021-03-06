import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function calculateOrderTotal(order, pizzas) {
  const total = order.reduce((acc, singleOrder) => {
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    );
    return acc + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
  return formatMoney(total);
}
