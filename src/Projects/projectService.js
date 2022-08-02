import axios from "axios";
import { API_GLOBAL_URL } from "../constants/api_url";

// const API_URL = `${API_GLOBAL_URL}/api/projects/`;
const API_URL = `/api/v1/`;

// Create new project
const createProject = async (projectData) => {
  const response = await axios.post(`${API_URL}projects`, projectData);

  return response.data;
};

// Get all projects
const getAllProjects = async () => {
  const response = await axios.get(`${API_URL}projects`);

  return response.data.projects;
};

const projectService = {
  createProject,
  getAllProjects,
};

export default projectService;
