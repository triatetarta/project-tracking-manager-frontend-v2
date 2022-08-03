import axios from "axios";
import { API_GLOBAL_URL } from "../constants/api_url";

// const API_URL = `${API_GLOBAL_URL}/api/tickets/`;
const API_URL = `/api/v1/`;

// Get Single Ticket Comments

const getSingleTicketComments = async (ticketId) => {
  const response = await axios.get(`${API_URL}tickets/${ticketId}/comments`);

  const { comments, count } = response.data;

  const resData = { comments, count };

  return resData;
};

// Create ticket comment
const createComment = async (commentData) => {
  const response = await axios.post(`${API_URL}comments`, commentData);

  return response.data.comment;
};

// Delete ticket comment
const deleteComment = async (commentId) => {
  const response = await axios.delete(`${API_URL}comments/${commentId}`);

  return response.data;
};

// Update ticket comment
const updateComment = async (commentId, commentData) => {
  const response = await axios.patch(
    `${API_URL}comments/${commentId}`,
    commentData
  );

  return response.data.comment;
};

const commentService = {
  createComment,
  deleteComment,
  updateComment,
  getSingleTicketComments,
};

export default commentService;
