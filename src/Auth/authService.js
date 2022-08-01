import axios from "axios";
import { API_GLOBAL_URL } from "../constants/api_url";

// const API_URL = `${API_GLOBAL_URL}/api/v1/auth/`;
const API_URL = `/api/v1/`;

// Register new user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  return response.data.user;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}auth/login`, userData);

  return response.data.user;
};

// Update user
const updateUser = async (userId, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}${userId}`, userData, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => localStorage.removeItem("user");

// Get all users
const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}all`, config);

  return response.data;
};

// Show Me
const getMe = async () => {
  const response = await axios.get(`${API_URL}users/showMe`);

  return response.data.user;
};

const authService = {
  register,
  login,
  logout,
  updateUser,
  getAllUsers,
  getMe,
};

export default authService;