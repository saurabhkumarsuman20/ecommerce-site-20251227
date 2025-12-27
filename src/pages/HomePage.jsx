import './header.css';
import './HomePage.css';
import { useState, useEffect } from 'react';
import products from '../data/products';

export function HomePage() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handler = (e) => setCartCount((c) => c + 1);
    window.addEventListener('add-to-cart', handler);
    return () => window.removeEventListener('add-to-cart', handler);
  }, []);

  return (
    <>
      {/* HEADER */}
      <div className="header">
        <div className="left-section">
          <a href="/" className="header-link">
            <img className="logo" src="/images/logo-white.png" />
            <img className="mobile-logo" src="/images/mobile-logo-white.png" />
          </a>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />
          <button className="search-button">
            <img className="search-icon" src="/images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <a className="account-link header-link" href="#">
            <div className="account-line1">Hello, Sign in</div>
            <div className="account-line2">Account & Lists</div>
          </a>

          <a className="orders-link header-link" href="#">
            <div className="orders-line1">Returns</div>
            <div className="orders-line2">& Orders</div>
          </a>

          <a className="cart-link header-link" href="#">
            <img className="cart-icon" src="/images/icons/cart-icon.png" />
            <div className="cart-quantity">{cartCount}</div>
            <div className="cart-text">Cart</div>
          </a>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="home-page">
        <div className="products-grid">
          {products.map((p) => (
            <div className="product-container" key={p.id}>
              <div className="product-image-container">
                <img className="product-image" src={p.image} alt={p.name} />
              </div>

              <div className="product-name limit-text-to-2-lines">{p.name}</div>

              <div className="product-rating-container">
                <img className="product-rating-stars" src={`/images/ratings/rating-${Math.round(p.rating*10)}.png`} />
                <div className="product-rating-count link-primary">{p.ratingCount}</div>
              </div>

              <div className="product-price">${p.price.toFixed(2)}</div>

              <div className="product-actions">
                <button className="add-to-cart-button" onClick={() => handleAddToCart(p)}>Add to Cart</button>
                <button className="buy-now-button" onClick={() => handleBuyNow(p)}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function handleAddToCart(product) {
  const raw = localStorage.getItem('cart')
  const cart = raw ? JSON.parse(raw) : []
  const existing = cart.find(i => i.id === product.id)
  if (existing) {
    existing.qty = (existing.qty || 1) + 1
  } else {
    cart.push({ ...product, qty: 1 })
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  const event = new CustomEvent('add-to-cart', { detail: product })
  window.dispatchEvent(event)
}

function handleBuyNow(product) {
  alert(`Buy Now: ${product.name} - $${product.price.toFixed(2)}`);
}
