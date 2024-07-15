import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_DZEVyJW3VcBIexNIe3baRDqWHCXVAhgw8tJCASx5USwQZM7mdoM34w9t2SuiEjMc';

/**
 * Fetches a list of cat breeds.
 * @returns {Promise<Array>} A promise that resolves to an array of cat breeds.
 * @throws Will throw an error if the request fails.
 */
export const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch breeds');
  }
};

/**
 * Fetches information about a specific breed by breed ID.
 * @param {string} breedId - The ID of the breed.
 * @returns {Promise<Object>} A promise that resolves to an object containing information about the cat breed.
 * @throws Will throw an error if the request fails.
 */
export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data[0];
  } catch (error) {
    throw new Error('Failed to fetch cat by breed');
  }
};