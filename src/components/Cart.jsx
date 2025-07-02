import React, { useEffect, useState } from 'react';
import { getCart } from '../cart';

export const Cart = () => {
  const [cartData, setCartData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ phone: '', email: '', location: '' });

  useEffect(() => {
    const updateCart = (e) => setCartData({ ...e.detail });
    window.addEventListener('cartUpdated', updateCart);
    return () => window.removeEventListener('cartUpdated', updateCart);
  }, []);

  const handleDecrement = (item) => {
    const current = getCart();
    if (current[item] && current[item].quantity > 0) {
      current[item].quantity--;
      const event = new CustomEvent('cartUpdated', { detail: { ...current } });
      window.dispatchEvent(event);
    }
  };

  const items = Object.entries(cartData);
  const totalItems = items.reduce((sum, [, { quantity }]) => sum + quantity, 0);
  const totalPrice = items.reduce((sum, [, { quantity, price }]) => sum + quantity * price, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order confirmed!\nPhone: ${formData.phone}\nEmail: ${formData.email}\nLocation: ${formData.location}`);
    setShowForm(false);
    setFormData({ phone: '', email: '', location: '' });
  };

  return (
    <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg shadow relative">
      <h2 className="text-xl font-bold mb-4">Your Cart ({totalItems})</h2>
      <ul className="space-y-2">
        {items.map(([name, { quantity, price }]) => (
          <li key={name} className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <span>{name} ({quantity}x)</span>
            <div className="flex items-center gap-2 mt-1 sm:mt-0">
              <span>${(quantity * price).toFixed(2)}</span>
              <button
                onClick={() => handleDecrement(name)}
                disabled={quantity === 0}
                className={`px-2 py-1 text-white text-xs rounded ${quantity === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t mt-4 pt-2 flex justify-between font-semibold">
        <span>Order Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <button
        className="mt-4 w-full bg-orange-500 text-white py-2 rounded"
        onClick={() => setShowForm(true)}
      >
        Confirm Order
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Enter Order Details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                name="location"
                placeholder="Delivery Location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
