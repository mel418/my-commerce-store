import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = ({ onClose }) => {
  const { 
    items, 
    cartTotal, 
    itemCount, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart">
        <div className="cart-header-section">
          <h2>Your Cart</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="continue-shopping" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="cart">
      <div className="cart-header-section">
        <h2>Your Cart ({itemCount} items)</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <img 
              src={item.image} 
              alt={item.imageAlt} 
              className="cart-item-image"
            />
            
            <div className="cart-item-details">
              <h4>{item.title}</h4>
              <p className="cart-item-price">
                ${item.price} {item.currency}
              </p>
              
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="cart-item-total">
              <p>${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
              <button 
                className="remove-item"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-total-section">
          <h3>Total: ${cartTotal.toFixed(2)}</h3>
        </div>
        
        <div className="cart-actions">
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
          <button className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;