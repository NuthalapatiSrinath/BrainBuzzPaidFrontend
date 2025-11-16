import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./RegisterModal.module.css";

// Import auth actions
import {
  registerUser,
  clearError,
  resetRegistrationSuccess,
} from "../../redux/slices/authSlice";
// Import modal actions
import { closeModal, openModal } from "../../redux/slices/modalSlice";

function RegisterModal() {
  const dispatch = useDispatch();

  // Get state from authSlice
  const { isLoading, error, registrationSuccess } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Clear errors and success flag when the component mounts
  useEffect(() => {
    dispatch(clearError());
    dispatch(resetRegistrationSuccess());
  }, [dispatch]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  const switchToLogin = () => {
    dispatch(openModal({ type: "login" }));
  };

  return (
    <div className={styles.modalContent}>
      <button onClick={handleClose} className={styles.closeButton}>
        &times;
      </button>

      {/* Check if registration was a success */}
      {registrationSuccess ? (
        // --- SHOW SUCCESS MESSAGE ---
        <div className={styles.successContainer}>
          <img src="/favicon.svg" alt="Brain Buzz Logo" />
          <h2>Registration Successful!</h2>
          <p>Your account has been created. Please log in to continue.</p>
          <button
            onClick={switchToLogin}
            className={styles.loginButton} // Reuse button style
          >
            Go to Login
          </button>
        </div>
      ) : (
        // --- SHOW REGISTRATION FORM ---
        <>
          <div className={styles.logoContainer}>
            <img src="/favicon.svg" alt="Brain Buzz Logo" />
            <h2>Create Account</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button
              type="submit"
              className={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className={styles.switchModal}>
            Already have an account?{" "}
            <button onClick={switchToLogin} className={styles.switchButton}>
              Log In
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default RegisterModal;
