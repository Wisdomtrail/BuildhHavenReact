import React, { useEffect, useState, useRef } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../../styles/BuildingMaterials.css";
import { FaShoppingCart } from "react-icons/fa";
import { MdConstruction } from "react-icons/md";
import { motion } from "framer-motion";
import BASE_URL from '../../config';
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import NewArrivalAd from '../NewArrivalAd/NewArrivalAd';
const BuildingMaterials = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const productsRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${BASE_URL}/product/category/Building Materials`);
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

    const scrollToProducts = () => {
        productsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="building-materials">
            <Header />
            
            <NewArrivalAd/>
            <motion.div
                className="hero-section"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="overlay">
                    <div className="content">
                        <h1 className="titleB"><MdConstruction /> Quality Building Materials</h1>
                        <p className="subtitle">
                            Find top-quality materials for all your construction needs at unbeatable prices.
                        </p>
                        <motion.button
                            className="shop-now-button"
                            whileHover={{ scale: 1.1 }}
                            onClick={scrollToProducts}
                        >
                            Shop Now <FaShoppingCart />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <div className="products-section" ref={productsRef}>
                <h2>Our Building Materials</h2>

                {loading && <p>Loading products...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && !error && products.length === 0 && (
                    <div className="no-products">
                        <p>No Building Materials Available.</p>
                    </div>
                )}

                <div className="products-grid">
                    {products.map((product) => (
                        <motion.div
                            key={product._id}
                            className="product-cardd"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src={product.images[0]} alt={product.name} className="product-image" />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">₦{product.price.toLocaleString()}</p>
                            <motion.button
                                className="buy-button"
                                whileHover={{ scale: 1.1 }}
                                onClick={() => addToCart(product)}  // ✅ Pass the product explicitly
                            >
                                Buy Now <FaShoppingCart />
                            </motion.button>

                        </motion.div>
                    ))}
                </div>
            </div>
            {cartCount > 0 && (
                <div className="floating-cart" onClick={() => { navigate('/shoppingBasket') }}>
                    <CartIcon />
                    <span className="cart-count">{cartCount}</span>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default BuildingMaterials;
