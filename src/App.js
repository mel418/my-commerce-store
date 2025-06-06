import { useState, useEffect } from 'react';
import { getProducts } from './services/shopify';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch products when component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts(6);
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

  if (loading) {
    return (
      <div className='App'>
        <header>
          <h1>My Commerce Store</h1>
        </header>
        <main>
          <p>Loading products...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className='App'>
        <header>
          <h1>My Commerce Store</h1>
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
      <header>
        <h1>My Commerce Store</h1>
        <p>Welcome to our amazing products!</p>
      </header>
      <main>
        <h2>Featured Products</h2>
        <div className='products-grid'>
          {products.map(product => (
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
                {product.description.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
