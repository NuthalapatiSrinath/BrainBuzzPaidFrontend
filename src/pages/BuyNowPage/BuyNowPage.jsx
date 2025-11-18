import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./BuyNowPage.module.css";
import PricingTabContent from "../Ebooks/BookDetailPage/PricingTabContent/PricingTabContent";
import BUY_NOW_DATA from "../../data/buyNowData.js";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";

export default function BuyNowPage() {
  const { buyNowId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productData = useMemo(() => {
    return BUY_NOW_DATA[buyNowId];
  }, [buyNowId]);

  const handleBuyNow = () => {
    // This is where you would trigger the payment flow.
    // For now, it can open the login modal if the user is not logged in,
    // or proceed to a payment gateway.
    console.log("Attempting to buy:", productData.id);
    // Example: Open login modal if not authenticated
    // if (!isAuthenticated) {
    //   dispatch(openModal({ type: "login" }));
    // } else {
    //   // proceedToPayment(productData.id);
    // }
    alert("Proceeding to payment for " + productData.title);
  };

  const handleApplyCoupon = () => {
    // This opens the coupon modal
    console.log("Opening Apply Coupon modal");
    dispatch(openModal({ type: "applyCoupon" })); // Assuming you have an 'applyCoupon' modal
  };

  if (!productData) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h2>Product not found</h2>
          <p>The product you are trying to buy is not available.</p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* We re-use the PricingTabContent component here */}
        <PricingTabContent
          title={productData.title}
          description={productData.description}
          price={productData.price}
          onBuyNow={handleBuyNow}
          onApplyCoupon={handleApplyCoupon} // Pass the handler to the component
        />
      </div>
    </div>
  );
}
