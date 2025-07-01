import React from 'react';
import { addItemToCart } from '../cart';

const desserts = [
  {
    name: 'Waffle with Berries',
    price: 6.5,
    image: 'src/images/image-waffle-desktop.jpg'
  },
  {
    name: 'Vanilla Bean Crème Brûlée',
    price: 7.0,
    image: 'src/images/image-creme-brulee-desktop.jpg'
  },
  {
    name: 'Macaron Mix of Five',
    price: 8.0,
    image: 'src/images/image-macaron-desktop.jpg'
  },
  {
    name: 'Panna Cotta',
    price: 8.0,
    image: 'src/images/image-panna-cotta-desktop.jpg'
  },
  {
    name: 'Tiramisu',
    price: 8.0,
    image: 'src/images/image-tiramisu-desktop.jpg'
  },
  {
    name: 'Brownie Delight',
    price: 8.0,
    image: 'src/images/image-brownie-desktop.jpg'
  },
  {
    name: 'Classic Cake Slice',
    price: 8.0,
    image: 'src/images/image-cake-desktop.jpg'
  },
  {
    name: 'Baklava Bites',
    price: 8.0,
    image: 'src/images/image-baklava-desktop.jpg'
  }
];

export const Dessert = () => {
  return (
    <div className="w-full md:w-2/3">
      <h1 className="text-2xl font-bold mb-4">Desserts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {desserts.map(({ name, price, image }) => (
          <div
            key={name}
            className="bg-gray-50 p-4 rounded-lg shadow flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          >
            <img
              src={image}
              alt={name}
              className="rounded-lg mb-2 object-cover h-32 w-full"
            />
            <h2 className="font-semibold text-center">{name}</h2>
            <p className="text-gray-700">${price.toFixed(2)}</p>
            <button
              onClick={() => addItemToCart(name, price)}
              className="add-to-cart mt-2 w-full bg-orange-500 text-white py-1 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
