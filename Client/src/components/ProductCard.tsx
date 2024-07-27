// src/components/ProductCard.tsx

import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Product } from 'src/types/product';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Ensure this import path is correct

import '../style/Cart.css';
import imgblue from '../images/297993a39719a8c259dc34f0d9f5e280.png';
import imgRed from '../images/1.png';

const ProductCard = ({ product }: { product: Product }) => {
  const [color, setColor] = useState<'red' | 'blue' | 'orange'>('red');
  const [image, setImage] = useState(product.image);
  const [buttonClass, setButtonClass] = useState('default');
  const [tallaClass, setTallaClass] = useState('default');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const colorMap: Record<'red' | 'blue' | 'orange', string> = {
    red: '#B22424',
    blue: '#67D6E1',
    orange: '#ED8918'
  };

  const imageMap: Record<'red' | 'blue' | 'orange', string> = {
    red: imgRed,
    blue: imgblue,
    orange: '' // add appropriate image for orange if available
  };

  const handleColorChange = (newColor: 'red' | 'blue' | 'orange') => {
    setColor(newColor);
    setImage(imageMap[newColor]);

    switch (newColor) {
      case 'blue':
        setButtonClass('azul');
        setTallaClass('azul');
        break;
      case 'orange':
        setButtonClass('naranja');
        setTallaClass('naranja');
        break;
      case 'red':
        setButtonClass('default');
        setTallaClass('default');
        break;
    }
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    navigate('/cart');
  };

  return (
    <div className="container">
      <div className={`card background-${color}`}>
        <div className="cardimg">
          <img src={image} alt="Product Image" />
        </div>

        <div className="cardcontent">
          <Typography variant="h2" className="card-title">
            {product.title}
          </Typography>

          <div className="cardresize">
            <div className="cardsize">
              <Typography variant="h3" className="card-subtitle">
                Size:
              </Typography>
              {['37', '38', '39', '40'].map(size => (
                <span key={size} className={`talla ${tallaClass}`}>
                  {size}
                </span>
              ))}
            </div>

            <div className="cardcolor">
              <Typography variant="h3" className="card-subtitle">
                Color:
              </Typography>
              {['red', 'blue', 'orange'].map((colorValue) => (
                <span
                  key={colorValue}
                  style={{
                    backgroundColor: colorMap[colorValue as 'red' | 'blue' | 'orange'],
                    border: `2px solid ${color === colorValue ? '#000' : 'transparent'}`
                  }}
                  className="color"
                  onClick={() => handleColorChange(colorValue as 'red' | 'blue' | 'orange')}
                />
              ))}
            </div>

            <button type="button" className={`add-to-cart ${buttonClass}`} onClick={handleAddToCart}>
              ADD TO CART
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
