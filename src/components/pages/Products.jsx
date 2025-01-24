import React, { useState } from "react";
import { FaShoppingCart, FaSearch, FaQuestionCircle } from "react-icons/fa";
import Sidebar from '../sideBar/SideBar';
import DMobileDownbar from '../sideBar/DMobileDownbar';
import '../../styles/products.css';
import { useNavigate } from "react-router-dom";
import logoP from '../../assets/img/logoP.png'
const Products = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate  = useNavigate();
  
  // Initialize products with quantity set to 1
  const products = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    description: `This is the description of Product ${index + 1}.`,
    price: (Math.random() * 100).toFixed(2),
    image: `https://via.placeholder.com/150?text=Product+${index + 1}`,
    quantity: 1, // Default quantity
  }));

  const [updatedProducts, setUpdatedProducts] = useState(products);

  const filteredProducts = updatedProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuantityChange = (id, action) => {
    setUpdatedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: action === "increase" ? product.quantity + 1 : product.quantity > 1 ? product.quantity - 1 : product.quantity,
            }
          : product
      )
    );
  };

  const orders = () =>{
    navigate('/orders')
  }

  const handleAddToCart = (product) => {
    setCartCount(cartCount + product.quantity);
  };

  return (
    <>
      <Sidebar /><br /><br />
      <div className="products">
        <div className="topnav">
          <div className="logoP">
            <img src={logoP} alt="" />
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
          <div className="icons">
            <FaQuestionCircle className="support-icon" />
            <div className="cart-icon-container" onClick={orders} >
              <FaShoppingCart className="cart-icon" />
              {cartCount > 0 && (
                <span className="cart-item-count">{cartCount}</span>
              )}
            </div>
          </div>
        </div>

        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="product-info">
              <div className="price-quantity">
                <span className="product-price">${product.price}</span>
                <div className="quantity-container">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(product.id, "decrease")}
                  >
                    -
                  </button>
                  <span className="quantity-display">{product.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(product.id, "increase")}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(product)}
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div><br /><br /><br /><br />
      <DMobileDownbar />
    </>
  );
};

export default Products;
