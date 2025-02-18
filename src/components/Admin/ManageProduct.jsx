import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaUpload, FaDollarSign, FaLayerGroup, FaBoxes, FaPlusCircle, FaSpinner } from "react-icons/fa";
import { Bell } from 'lucide-react'
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/ManageProduct.css";
import BASE_URL from "../../config";
import { useNavigate } from "react-router-dom";

const ManageProduct = () => {
    const [productCount, setProductCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        file1: null,
        file2: null,
        file3: null,
    });

    const adminToken = localStorage.getItem("adminToken");
    const adminId = localStorage.getItem('adminId');

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken}`,
                };

                const adminResponse = await fetch(`${BASE_URL}/user/getAdmin/${adminId}`, { headers });
                const adminData = await adminResponse.json();
                setNotifications(adminData.admin.notifications);

                if (adminResponse.ok) {
                    setAdmin(adminData.admin);
                } else {
                    console.error('Failed to fetch admin details:', adminData.message);
                }
            } catch (error) {
                console.error('Error fetching admin details:', error);
            }
        };

        if (adminToken && adminId) fetchAdminDetails();
    }, [adminToken, adminId]);

    // Fetch product count
    useEffect(() => {
        const fetchProductCount = async () => {
            try {
                const response = await fetch(BASE_URL + "/product/count-product", {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setProductCount(data.productCount);
                } else {
                    toast.error("Failed to fetch product count");
                }
            } catch (error) {
                console.error("Error fetching product count:", error);
                toast.error("Failed to fetch product count");
            }
        };
        fetchProductCount();
    }, [adminToken]);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "files") {
            setFormData((prev) => ({ ...prev, files: Array.from(files) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Start loading
    
        const uploadData = new FormData();
        uploadData.append("name", formData.name);
        uploadData.append("description", formData.description);
        uploadData.append("price", formData.price);
        uploadData.append("category", formData.category);
        uploadData.append("quantity", formData.quantity);
    
        // Append each image if provided
        if (formData.productImage1) uploadData.append("productImage", formData.productImage1);
        if (formData.productImage2) uploadData.append("productImage", formData.productImage2);
        if (formData.productImage3) uploadData.append("productImage", formData.productImage3);
    
        try {
            const response = await fetch(`${BASE_URL}/product/create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
                body: uploadData,
            });
    
            if (response.ok) {
                await toast.success("Product created successfully!", {
                    onClose: () => {
                        // Clear the form after the notification is closed
                        setFormData({
                            name: "",
                            description: "",
                            price: "",
                            category: "",
                            quantity: "",
                            productImage1: null,
                            productImage2: null,
                            productImage3: null,
                        });
    
                        // Reset file inputs manually
                        document.querySelector('input[name="productImage1"]').value = "";
                        document.querySelector('input[name="productImage2"]').value = "";
                        document.querySelector('input[name="productImage3"]').value = "";
                    },
                });
            } else {
                toast.error("Failed to create product.");
            }
        } catch (error) {
            console.error("Error creating product:", error);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false); // End loading
        }
    };
    

    return (
        <div className="manage-product">
            <header className="dashboard-header">
                <h1 className="dashboard-title" onClick={() => { navigate('/admin/dashboard') }}>Admin Dashboard</h1>
                <div className="header-actions">
                    <div className="notifications-container">
                        <div className="notification-bell-wrapper">
                            <Bell
                                size={24}
                                className="notification-bell"
                                onClick={() => setShowNotifications(!showNotifications)}
                            />
                            {notifications.length > 0 && (
                                <span className="notification-count">{notifications.length}</span>
                            )}
                        </div>

                        {showNotifications && (
                            <div className="notifications-dropdown">
                                {notifications.length > 0 ? (
                                    notifications.map((notification, index) => (
                                        <p key={index} className="notification-item">
                                            {notification.message}
                                        </p>
                                    ))
                                ) : (
                                    <p className="notification-item">No notifications</p>
                                )}
                            </div>
                        )}
                    </div>

                    <img
                        src={admin?.profileImageUrl || "default-profile.jpg"} // Replace with the admin's profile image URL or a default one
                        alt="Admin Profile"
                        className="profile-image"
                    />
                    <button
                        className="logout-button"
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("adminId");
                            window.location.href = '/admin';
                        }}
                    >
                        Logout
                    </button>
                </div>
            </header><br />
            <motion.div
                className="header"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="header-title">
                    <FaBoxes /> Manage Products
                </h1>
                <p className="product-count">
                    <FaLayerGroup className="icon" /> Total Products: <span>{productCount}</span>
                </p>
            </motion.div>
            <motion.form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <FaPlusCircle className="form-icon" />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        required
                    />
                </div>

                <div className="form-group">
                    <FaUpload className="form-icon" />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter product description"
                        required
                    />
                </div>

                <div className="form-group">
                    <FaDollarSign className="form-icon" />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter product price"
                        required
                    />
                </div>

                <div className="form-group">
                    <FaLayerGroup className="form-icon" />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select product category
                        </option>
                        <option value="Precision Power Tools">Precision Power Tools</option>
                        <option value="Building Materials">Building Materials</option>
                        <option value="Fabrication Tools">Fabrication Tools</option>
                        <option value="Pipes and Structural Steel">Pipes and Structural Steel</option>
                        <option value="Doors And Plates">Doors And Plates</option>
                        <option value="Accessories & Safety Gear">Accessories & Safety Gear</option>
                    </select>
                </div>

                <div className="form-group">
                    <FaBoxes className="form-icon" />
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Enter product quantity"
                        required
                    />
                </div>

                {/* Three separate file inputs */}
                <div className="form-group">
                    <FaUpload className="form-icon" />
                    <input
                        type="file"
                        name="productImage1"
                        onChange={(e) =>
                            setFormData({ ...formData, productImage1: e.target.files[0] })
                        }
                        accept="image/*"
                        required
                    />
                    <p className="upload-instructions">Upload the first product image.</p>
                </div>

                <div className="form-group">
                    <FaUpload className="form-icon" />
                    <input
                        type="file"
                        name="productImage2"
                        onChange={(e) =>
                            setFormData({ ...formData, productImage2: e.target.files[0] })
                        }
                        accept="image/*"
                    />
                    <p className="upload-instructions">Upload the second product image (optional).</p>
                </div>

                <div className="form-group">
                    <FaUpload className="form-icon" />
                    <input
                        type="file"
                        name="productImage3"
                        onChange={(e) =>
                            setFormData({ ...formData, productImage3: e.target.files[0] })
                        }
                        accept="image/*"
                    />
                    <p className="upload-instructions">Upload the third product image (optional).</p>
                </div>

                <motion.button
                    type="submit"
                    className="submit-button"
                    whileHover={{ scale: 1.05, backgroundColor: "#FF9800" }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isSubmitting ? (
                        <>
                            <FaSpinner className="button-icon spinning" /> Creating...
                        </>
                    ) : (
                        <>
                            <FaPlusCircle className="button-icon" /> Create Product
                        </>
                    )}
                </motion.button>
            </motion.form>
            <ToastContainer/>
        </div>
    );
};

export default ManageProduct;
