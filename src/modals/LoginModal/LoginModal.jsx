import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./LoginModal.module.css";

// Import the new auth actions
// --- 1. IMPORT resetRegistrationSuccess ---
import {
  loginUser,
  clearError,
  resetRegistrationSuccess,
} from "../../redux/slices/authSlice";
// Import your existing modal close action
import { closeModal, openModal } from "../../redux/slices/modalSlice";

// --- NO IMPORT NEEDED FOR THE LOGO ---

function LoginModal() {
  const dispatch = useDispatch();

  // Get state from the new authSlice
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Close the modal on successful login
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(closeModal());
    }
  }, [isAuthenticated, dispatch]);

  // Clear errors and success flag when the component mounts
  useEffect(() => {
    dispatch(clearError());
    dispatch(resetRegistrationSuccess()); // <-- 2. ADD THIS
  }, [dispatch]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const switchToRegister = () => {
    dispatch(openModal({ type: "register" }));
  };

  return (
    <div className={styles.modalContent}>
      <button onClick={handleClose} className={styles.closeButton}>
        &times;
      </button>

      <div className={styles.logoContainer}>
        <img src="/favicon.svg" alt="Brain Buzz Logo" />
        <h2>Brain Buzz</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <a href="/forgot-password" className={styles.forgotPassword}>
          Forgot Password?
        </a>

        {error && <p className={styles.error}>{error}</p>}

        <button
          type="submit"
          className={styles.loginButton}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className={styles.switchModal}>
        Don't have an account?{" "}
        <button onClick={switchToRegister} className={styles.switchButton}>
          Register
        </button>
      </p>
    </div>
  );
}

export default LoginModal;
