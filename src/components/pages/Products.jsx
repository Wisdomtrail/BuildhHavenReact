import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaSearch, FaQuestionCircle } from "react-icons/fa";
import Sidebar from '../sideBar/SideBar';
import DMobileDownbar from '../sideBar/DMobileDownbar';
import '../../styles/products.css';
import { useNavigate } from "react-router-dom";
import logoP from '../../assets/img/logoP.png';

const Products = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state for products
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch products from the API when the component mounts
    const fetchProducts = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");
  
        // Ensure the token exists before making the request
        if (!token) {
          console.error("Token is missing. Please log in again.");
          return;
        }
  
        const response = await fetch("http://localhost:3001/product/getAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Add token to the Authorization header
          },
        });
  
        const data = await response.json();
        console.log("API Response:", data); // Log the API response to check the structure
  
        // Check if the response contains the expected message and products
        if (data.message === "Products retrieved successfully" && data.products) {
          setProducts(data.products);
        } else {
          console.error("No products found or incorrect response format", data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false); // Stop loading after the API call finishes
      }
    };
  
    fetchProducts();
  }, []);
  

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuantityChange = (id, action) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id
          ? {
              ...product,
              quantity: action === "increase" ? product.quantity + 1 : product.quantity > 1 ? product.quantity - 1 : product.quantity,
            }
          : product
      )
    );
  };

  const orders = () => {
    navigate('/orders');
  };

  const handleAddToCart = (product) => {
    setCartCount(cartCount + product.quantity);
  };

  if (loading) {
    return <div>Loading products...</div>;  // Show loading message while products are being fetched
  }

  return (
    <>
      <Sidebar /><br /><br />
      <div className="products">
        <div className="topnav">
          <div className="logoP">
            <img src={logoP} alt="Logo" />
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
            <div className="cart-icon-container" onClick={orders}>
              <FaShoppingCart className="cart-icon" />
              {cartCount > 0 && (
                <span className="cart-item-count">{cartCount}</span>
              )}
            </div>
          </div>
        </div>

        {filteredProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.images[0]} alt={product.name} />
            <p>{product.description.length > 40 ? `${product.description.substring(0, 40)}...` : product.description}</p>
            <div className="product-info">
              <div className="price-quantity">
                <span className="product-price">₦{product.price}</span>
                <div className="quantity-container">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(product._id, "decrease")}
                  >
                    -
                  </button>
                  <span className="quantity-display">{product.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(product._id, "increase")}
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
