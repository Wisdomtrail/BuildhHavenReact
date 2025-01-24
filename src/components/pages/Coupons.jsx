import React from "react";
import Sidebar from '../sideBar/SideBar';
import DMobileDownbar from '../sideBar/DMobileDownbar';
import '../../styles/coupons.css'; // Import CSS for coupons
import { FaBuilding, FaHammer, FaCogs, FaScrewdriver, FaTruck, FaPaintRoller, FaTools, FaWrench, FaHardHat, FaRulerCombined } from 'react-icons/fa';

const Coupons = () => {
  const coupons = [
    { icon: <FaCogs />, title: "Tool Discount", description: "10% off on all power tools", code: "TOOLS10" },
    { icon: <FaHammer />, title: "Hammer & Nails", description: "Buy 1 hammer, get 1 set of nails free", code: "HAMMER20" },
    { icon: <FaBuilding />, title: "Bricks Sale", description: "15% off on bulk brick orders", code: "BRICK15" },
    { icon: <FaScrewdriver />, title: "Screwdriver Kit", description: "10% off on screwdriver sets", code: "SCREW10" },
    { icon: <FaTruck />, title: "Free Delivery", description: "Free delivery on orders over $500", code: "FREESHIP" },
    { icon: <FaPaintRoller />, title: "Paint Discount", description: "20% off on all paints", code: "PAINT20" },
    { icon: <FaTools />, title: "Toolbox Savings", description: "Flat $30 off on toolboxes", code: "TOOLBOX30" },
    { icon: <FaWrench />, title: "Plumbing Tools", description: "15% off on plumbing kits", code: "PLUMB15" },
    { icon: <FaHardHat />, title: "Safety Gear", description: "10% off on all safety gear", code: "SAFETY10" },
    { icon: <FaRulerCombined />, title: "Measurement Tools", description: "Buy 1 measuring tool, get 1 free", code: "MEASUREBUY1GET1" },
  ];

  return (
    <>
      <Sidebar />
      <div className="coupons-container">
        {coupons.map((coupon, index) => (
          <div className="coupon-card" key={index}>
            <div className="coupon-icon">{coupon.icon}</div>
            <h3>{coupon.title}</h3>
            <p>{coupon.description}</p>
            <button className="coupon-code">{coupon.code}</button>
          </div>
        ))}
      </div><br /><br /><br /><br />
      <DMobileDownbar />
    </>
  );
};

export default Coupons;
