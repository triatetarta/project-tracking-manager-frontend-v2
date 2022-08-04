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
const updateUser = async (userData) => {
  const response = await axios.patch(`${API_URL}users/updateUser`, userData);

  return response.data.user;
};

// Logout user
const logout = async () => {
  const response = await axios.delete(`${API_URL}auth/logout`);

  return response.data;
};

// Get all users
const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}users`);

  return response.data.users;
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
