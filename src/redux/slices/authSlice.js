import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// !! UPDATE THIS WITH YOUR BACKEND URL !!
const BASE_URL = "http://localhost:4000/api"; // Or your deployed URL

// ----------------------------------------------------------------------
// ASYNC THUNKS (The API Client)
// ----------------------------------------------------------------------

/**
 * 1. REGISTER
 * - Matches your `registerController`.
 * - Note: Your controller expects 'name', but your form has 'firstName' and 'lastName'.
 * This thunk combines them into a single 'name' field for the API.
 * - This does NOT log the user in, as per your controller logic.
 */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      // Combine first/last name to match your controller's 'name' field
      const name = `${firstName} ${lastName}`;

      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
        role: "user", // Default role
      });

      // Return the user data from response.data.data
      return response.data.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Registration failed. Please try again.");
    }
  }
);

/**
 * 2. LOGIN
 * - Matches your `loginController`.
 * - Expects response: { success: true, data: user, token: "..." }
 * - Saves the single 'token' to localStorage.
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      // Store the single token
      localStorage.setItem("jwt_token", response.data.token);

      // Return payload: { user: {...}, token: "..." }
      return { user: response.data.data, token: response.data.token };
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Invalid email or password");
    }
  }
);

/**
 * 3. FORGOT PASSWORD
 * - Matches your `forgotPasswordController`.
 */
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/forgot-password`, {
        email,
      });
      return response.data.message; // Returns the success message
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to send reset email.");
    }
  }
);

/**
 * 4. RESET PASSWORD
 * - Matches your `resetPasswordController`.
 */
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/reset-password`, {
        token,
        newPassword,
      });
      return response.data.message; // Returns the success message
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(
        "Failed to reset password. Token may be invalid or expired."
      );
    }
  }
);

// ----------------------------------------------------------------------
// THE SLICE
// ----------------------------------------------------------------------

const initialState = {
  user: null,
  jwtToken: localStorage.getItem("jwt_token") || null,
  isAuthenticated: !!localStorage.getItem("jwt_token"),
  isLoading: false,
  error: null,
  message: null, // For success messages from password reset
  registrationSuccess: false, // NEW: To show success message on register modal
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("jwt_token");
      state.user = null;
      state.jwtToken = null;
      state.isAuthenticated = false;
      state.error = null;
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    // NEW: Resets the success flag when opening the register modal
    resetRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- REGISTER CASES ---
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registrationSuccess = true; // Set success flag
        // We do NOT log the user in, as per your controller
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // --- LOGIN CASES ---
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.jwtToken = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.user = null;
        state.jwtToken = null;
      })

      // --- FORGOT PASSWORD CASES ---
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload; // Show success message
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // --- RESET PASSWORD CASES ---
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload; // Show success message
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, clearMessage, resetRegistrationSuccess } =
  authSlice.actions;
export default authSlice.reducer;
