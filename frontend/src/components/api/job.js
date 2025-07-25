// src/api/job.js
import axios from 'axios';

export const deleteJobById = async (jobId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/v1/job/${jobId}`, {
      withCredentials: true, // if using cookies/session
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error deleting job' };
  }
};
