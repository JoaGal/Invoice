export default function totalPrice(invoice) {
    return invoice.items.reduce((total, item) => {
      return total + (item.quantity * item.price);
    }, 0); 
  }

  