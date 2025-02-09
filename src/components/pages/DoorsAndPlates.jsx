import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../../styles/BuildingMaterials.css";
import { FaShoppingCart } from "react-icons/fa";
import { MdConstruction } from "react-icons/md";
import { motion } from "framer-motion";
import BASE_URL from '../../config';
import CartIcon from "./CartIcon";

const DoorsAndPlates = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const productsRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${BASE_URL}/product/category/Doors And Plates`);
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(storedCart.length);
    }, []);

    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find((item) => item._id === product._id);
    
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        setCartCount(cart.length);
        window.dispatchEvent(new Event("storage"));
    };
    


    const goToCart = () => {
        navigate("/shoppingBasket"); // Navigate to the cart page
    };

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
                        <h1 className="titleB"><MdConstruction /> Quality Doors & Plates</h1>
                        <p className="subtitle">
                            Discover durable and stylish doors and plates for your projects.
                        </p>
                        <motion.button
                            className="shop-now-button"
                            whileHover={{ scale: 1.1 }}
                            onClick={() => productsRef.current?.scrollIntoView({ behavior: "smooth" })}
                        >
                            Shop Now <FaShoppingCart />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <div className="products-section" ref={productsRef}>
                <h2>Our Doors & Plates</h2>

                {loading && <p>Loading products...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && !error && products.length === 0 && (
                    <div className="no-products">
                        <p>No Doors & Plates Available.</p>
                    </div>
                )}

                <div className="products-grid">
                    {products.map((product) => (
                        <motion.div
                            key={product._id}
                            className="product-card"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src={product.images[0]} alt={product.name} className="product-image" />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">₦{product.price.toLocaleString()}</p>
                            <motion.button
                                className="buy-button"
                                whileHover={{ scale: 1.1 }}
                                onClick={() => addToCart(product)}
                            >
                                Buy Now <FaShoppingCart />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
            {cartCount > 0 && (
                <div className="floating-cart" onClick={goToCart}>
                    <CartIcon />
                    <span className="cart-count">{cartCount}</span>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default DoorsAndPlates;
