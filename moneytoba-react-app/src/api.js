// src/api.js
const API_URL = 'http://localhost:8080'; // Replace with your backend API URL if different

export async function fetchNeighborhoods() {
  try {
    const response = await fetch(`${API_URL}/api/neighborhoods`); // Update the API endpoint
    if (!response.ok) {
      throw new Error('Error fetching neighborhoods');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchNeighborhoods:', error);
    throw error;
  }
}
