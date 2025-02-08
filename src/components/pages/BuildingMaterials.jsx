import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../../styles/BuildingMaterials.css"; // Import the custom CSS file
import { FaShoppingCart } from "react-icons/fa"; // Cart icon
import { MdConstruction } from "react-icons/md"; // Construction icon
import { motion } from "framer-motion"; // Animation library

const products = [
    { id: 1, name: "Cement", price: "₦3,500", image: "/images/cement.jpg" },
    { id: 2, name: "Sand", price: "₦15,000 per ton", image: "/images/sand.jpg" },
    { id: 3, name: "Gravel", price: "₦18,000 per ton", image: "/images/gravel.jpg" },
    { id: 4, name: "Iron Rods", price: "₦5,000 per piece", image: "/images/iron-rods.jpg" },
    { id: 5, name: "Bricks", price: "₦80 per brick", image: "/images/bricks.jpg" },
    { id: 6, name: "Roofing Sheets", price: "₦4,500 per sheet", image: "/images/roofing-sheets.jpg" },
];

const BuildingMaterials = () => {
    return (
        <div className="building-materials">
            <Header />
            <motion.div 
                className="hero-section"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="overlay">
                    <div className="content">
                        <h1 className="title"><MdConstruction /> Quality Building Materials</h1>
                        <p className="subtitle">
                            Find top-quality materials for all your construction needs at unbeatable prices.
                        </p>
                        <motion.button 
                            className="shop-now-button"
                            whileHover={{ scale: 1.1 }}
                        >
                            Shop Now <FaShoppingCart />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Products Section */}
            <div className="products-section">
                <h2>Our Building Materials</h2>
                <div className="products-grid">
                    {products.map((product) => (
                        <motion.div 
                            key={product.id} 
                            className="product-card"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">{product.price}</p>
                            <motion.button 
                                className="buy-button"
                                whileHover={{ scale: 1.1 }}
                            >
                                Buy Now <FaShoppingCart />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BuildingMaterials;
