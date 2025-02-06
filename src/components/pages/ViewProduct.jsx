import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import the useLocation hook
import "../../styles/viewProduct.css";
import Sidebar from "../sideBar/SideBar";
import { motion } from "framer-motion";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

const ViewProduct = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { state } = useLocation(); // Get the location state
  const product = state ? state.product : null; // Safely access the product

  if (!product) {
    return <p>Product not found</p>; // Handle the case where product is not available
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

  return (
    <>
      <Sidebar />
      <div className="view-product-div">
        <div className="view-product-images">
          <motion.div
            className="image-slider"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img className="product-image" src={product.images[currentImageIndex]} alt={product.name} />
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
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[...Array(product.quantity).keys()].map((num) => (
                <option key={num + 1} value={num + 1} className="quantity-option">
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <button className="add-to-cart">
            <ShoppingCart size={20} /> Add to Cart
          </button>

          <div className="extra-info">
            <p className="free-shipping">🚚 Free Shipping Available</p>
            <p className="delivery-estimate">📦 Estimated Delivery: 3-5 Business Days</p>
            <p className="return-policy">🔄 30-Day Easy Return Policy</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
