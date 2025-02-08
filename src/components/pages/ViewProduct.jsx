import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/viewProduct.css";
import DMobileDownbar  from "../sideBar/DMobileDownbar";
import Sidebar from "../sideBar/SideBar";
import { motion } from "framer-motion";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import BASE_URL from "../../config";
import { useNavigate } from "react-router-dom";
const ViewProduct = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate(); // Initialize navigate
  
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();
  const product = state ? state.product : null;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  if (!product) {
    return <p>Product not found</p>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = async (product, event) => {
    event.stopPropagation();
    setLoading(true); 
    console.log("Add to Cart Clicked for:", product._id); 

    const quantity = quantities[product._id] || 1;
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.error("User not authenticated. Token or userId missing.");
      toast.error("Please log in to add items to cart");
      setLoading(false);
      return;
    }

    console.log("Making API request...");

    try {
      const response = await fetch(`${BASE_URL}/user/addToCart/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity,
        }),
      });

      console.log("API response received:", response);

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok && data.message === "Product added to cart") {
        setCartCount(cartCount + quantity);
        toast.success("Added to Cart ✔️", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                  });
      } else {
        toast.error("Failed to add to cart", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                  });
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <Sidebar />
      <DMobileDownbar />
      <div className="view-product-div">
        <div className="view-product-images">
          <motion.div
            className="image-slider"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              className="product-image"
              src={product.images[currentImageIndex]}
              alt={product.name}
            />
          </motion.div>

          <button className="prev-btn" onClick={prevImage}>
            <ChevronLeft size={30} />
          </button>
          <button className="next-btn" onClick={nextImage}>
            <ChevronRight size={30} />
          </button>
        </div>

        <div className="view-product-description">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-details">{product.description}</p>
          <p className="p-price">₦{product.price}</p>

          <div className="quantity-container">
            QTY
            <select
              id="quantity"
              className="quantity-select"
              value={quantities[product._id] || 1}
              onChange={(e) =>
                setQuantities({ ...quantities, [product._id]: Number(e.target.value) })
              }
            >
              {[...Array(product.quantity).keys()].map((num) => (
                <option key={num + 1} value={num + 1} className="quantity-option">
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <button
            className="add-to-cart"
            onClick={(event) => handleAddToCart(product, event)}
            disabled={loading} 
          >
            <ShoppingCart size={20} />
            {loading ? " Adding..." : " Add to Cart"}
          </button>

          <div className="extra-info">
            <p className="free-shipping">🚚 Free Shipping Available</p>
            <p className="delivery-estimate">📦 Estimated Delivery: 3-5 Business Days</p>
            <p className="return-policy">🔄 30-Day Easy Return Policy</p>
          </div>
        </div>
      </div>
      <ToastContainer /><br /><br /><br /><br />
    </>
  );
};

export default ViewProduct;
