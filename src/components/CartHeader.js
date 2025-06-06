import React, {useState} from "react";
import { useCart } from "../context/CartContext";
import Cart from "./Cart";

const CartHeader = () => {
    const {itemCount, cartTotal} = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <>
        <div className="cart-header" onClick={toggleCart}>
            <div className="cart-icon">
                🛒
                {itemCount > 0 && (
                    <span className="cart-badge">{itemCount}</span>
                )}
            </div>
            <div className="cart-info">
                <span className="cart-total">${cartTotal.toFixed(2)}</span>
                <span className="cart-text">Cart</span>
            </div>
        </div>

        {/* Cart dropdown/modal */}
        {isCartOpen && (
            <div className="cart-overlay" onClick={toggleCart}>
                <div className="cart-dropdown" onClick={(e) => e.stopPropagation()}>
                    <Cart onClose = {toggleCart} />
                </div>
            </div>
        )}
        </>
    );
};

export default CartHeader;