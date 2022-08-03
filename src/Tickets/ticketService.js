import axios from "axios";
import { API_GLOBAL_URL } from "../constants/api_url";

// const API_URL = `${API_GLOBAL_URL}/api/tickets/`;
const API_URL = `/api/v1/`;

// Create new ticket
const createTicket = async (ticketData) => {
  const response = await axios.post(`${API_URL}tickets`, ticketData);

  return response.data;
};

// Get all tickets
const getTickets = async () => {
  const response = await axios.get(`${API_URL}tickets`);

  return response.data.tickets;
};

// Get single Ticket
const getTicket = async (ticketId) => {
  const response = await axios.get(`${API_URL}tickets/${ticketId}`);

  return response.data.ticket;
};

// Delete single ticket
const deleteTicket = async (ticketId) => {
  const response = await axios.delete(`${API_URL}tickets/${ticketId}`);

  return response.data;
};

// Update single ticket
const updateTicket = async (ticketId, ticketData) => {
  const response = await axios.patch(
    `${API_URL}tickets/${ticketId}`,
    ticketData
  );

  return response.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
};

export default ticketService;
