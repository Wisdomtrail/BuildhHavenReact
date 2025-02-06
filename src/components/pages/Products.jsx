import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaSearch, FaQuestionCircle } from "react-icons/fa";
import Sidebar from '../sideBar/SideBar';
import DMobileDownbar from '../sideBar/DMobileDownbar';
import '../../styles/products.css';
import { useNavigate } from "react-router-dom";
import logoP from '../../assets/img/logoP.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const Products = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token is missing. Please log in again.");
          return;
        }

        const response = await fetch("http://localhost:3001/product/getAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (data.message === "Products retrieved successfully" && data.products) {
          setProducts(data.products);
        } else {
          console.error("No products found or incorrect response format", data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
    
      if (!userId || !token) {
        console.error("User ID or token is missing. Please log in again.");
        return;
      }
    
      try {
        const response = await fetch(`http://localhost:3001/user/getCartQuantity/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
    
        const data = await response.json();
    
        if (data.totalQuantity !== undefined) {
          setCartCount(data.totalQuantity);  // Update the cart count state
        } else {
          console.error("Failed to fetch cart quantity:", data);
        }
      } catch (error) {
        console.error("Error fetching cart quantity:", error);
      }
    };
    
    fetchCartCount();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuantityChange = (productId, action, maxQuantity, event) => {
    event.stopPropagation();

    setQuantities((prevQuantities) => {
      const newQuantity = { ...prevQuantities };
      const currentQuantity = newQuantity[productId] || 1;

      if (action === 'increase' && currentQuantity < maxQuantity) {
        newQuantity[productId] = currentQuantity + 1;
      }

      if (action === 'decrease' && currentQuantity > 1) {
        newQuantity[productId] = currentQuantity - 1;
      }

      return newQuantity;
    });
  };

  const handleAddToCart = async (product, event) => {
    event.stopPropagation();
    const quantity = quantities[product._id] || 1;

    if (quantity > 0) {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // Assuming you have user ID stored in localStorage
        
        const response = await fetch(`http://localhost:3001/user/addToCart/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product._id,
            quantity,
          }),
        });

        const data = await response.json();
        if (data.message === "Product added to cart") {
          setCartCount(cartCount + quantity);
          toast.success("Added to Cart ✔️", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
          });
        } else {
          toast.error("Failed to add to cart", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
      } catch (error) {
        console.error("Failed to add product to cart:", error);
      }
    }
  };

  const viewProduct = (product) => {
    navigate(`/view-product/${product._id}`, { state: { product } });
  };

  const orders = () => {
    navigate('/cart');
  };

  if (loading) {
    return <div>Loading products...</div>;
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

        {filteredProducts.map((product) => {
          const productQuantity = quantities[product._id] || 1;
          return (
            <div className="product-card" key={product._id} onClick={() => viewProduct(product)}>
              <img src={product.images[0]} alt={product.name} />
              <p>{product.description.length > 40 ? `${product.description.substring(0, 40)}...` : product.description}</p>
              <div className="product-info">
                <div className="price-quantity">
                  <span className="product-price">₦{product.price}</span>
                  <div className="quantity-controls">
                    <button
                      onClick={(e) =>
                        handleQuantityChange(product._id, 'decrease', product.quantity, e)
                      }
                      disabled={productQuantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{productQuantity}</span>
                    <button
                      onClick={(e) =>
                        handleQuantityChange(product._id, 'increase', product.quantity, e)
                      }
                      disabled={productQuantity >= product.quantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="add-to-cart"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div><br /><br /><br /><br />
      <DMobileDownbar />

      <ToastContainer />
    </>
  );
};

export default Products;
