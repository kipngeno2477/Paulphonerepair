const Cart = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[var(--navy)] mb-4">Shopping Cart</h2>
        <p className="text-gray-500 mb-8">Your cart is currently empty.</p>
        <a href="/shop" className="bg-[var(--light-blue)] hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg">
          Continue Shopping
        </a>
      </div>
    </div>
  );
};
export default Cart;
