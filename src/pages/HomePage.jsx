import './Header.css';
import './HomePage.css';

export function HomePage() {
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
          <a className="orders-link header-link" href="#">
            <span className="orders-text">Orders</span>
          </a>

          <a className="cart-link header-link" href="#">
            <img className="cart-icon" src="/images/icons/cart-icon.png" />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </a>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="home-page">
        <div className="products-grid">

          {/* PRODUCT */}
          <div className="product-container">
            <div className="product-image-container">
              <img className="product-image"
                src="/xd45dimages/products/intermediate-composite-basketball.jpg" />
            </div>

            <div className="product-name limit-text-to-2-lines">
              Intermediate Size Basketball
            </div>

            <div className="product-rating-container">
              <img className="product-rating-stars"
                src="/images/ratings/rating-40.png" />
              <div className="product-rating-count link-primary">127</div>
            </div>

            <div className="product-price">$20.95</div>

            <div className="product-quantity-container">
              <select>
                {[...Array(10)].map((_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
            </div>

            <button className="add-to-cart-button button-primary">
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
