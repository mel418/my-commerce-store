import { useState, useEffect } from 'react';
import { getProducts } from './services/shopify';
import { useCart } from './context/CartContext';
import CartHeader from './components/CartHeader';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get cart functions
  const { addToCart, isInCart, getItemQuantity } = useCart();

  // Fetch products when component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts(20);
        setProducts(productsData);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <div>
              <h1>My Commerce Store</h1>
            </div>
            <CartHeader />
          </div>
        </header>
        <main>
          <p>Loading products...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <div>
              <h1>My Commerce Store</h1>
            </div>
            <CartHeader />
          </div>
        </header>
        <main>
          <p>Error loading products: {error}</p>
          <p>Check your environment variables and API token.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>My Commerce Store</h1>
            <p>Welcome to our amazing products!</p>
          </div>
          <CartHeader />
        </div>
      </header>
      <main>
        <h2>Featured Products</h2>
        <div className='products-grid'>
          {products && products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className='product-card'>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className='product-image'
                  />
                )}
                <h3>{product.title}</h3>
                <p className='product-price'>
                  ${product.price} {product.currency}
                </p>
                <p className='product-description'>
                  {product.description && product.description.length > 100 
                    ? `${product.description.substring(0, 100)}...`
                    : product.description || 'No description available'
                  }
                </p>
                
                <div className="product-actions">
                  {isInCart(product.id) ? (
                    <div className="in-cart-indicator">
                      <span>In Cart ({getItemQuantity(product.id)})</span>
                      <button 
                        className="add-more-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add More
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;