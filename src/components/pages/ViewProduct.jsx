import { useState } from "react";
import "../../styles/viewProduct.css";
import Sidebar from '../sideBar/SideBar';
import DMobileDownbar from '../sideBar/DMobileDownbar';
import { motion } from "framer-motion";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

const ViewProduct = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { images, title, description, price } = product;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
    <Sidebar/>
    <DMobileDownbar/>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="view-product-container"
    >
      <div className="view-product-slider">
        <motion.img
          key={images[currentImageIndex]}
          src={images[currentImageIndex]}
          alt={title}
          className="view-product-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <button onClick={prevImage} className="view-product-arrow left-arrow">
          <ChevronLeft size={20} />
        </button>
        <button onClick={nextImage} className="view-product-arrow right-arrow">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="view-product-details">
        <h2 className="view-product-title">{title}</h2>
        <p className="view-product-description">{description}</p>
        <p className="view-product-price">${price}</p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="view-product-button"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
    </>
  );
};

export default ViewProduct;
