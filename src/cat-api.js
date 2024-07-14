import axios from 'axios';

// Set API key
axios.defaults.headers.common['x-api-key'] = 'live_DZEVyJW3VcBIexNIe3baRDqWHCXVAhgw8tJCASx5USwQZM7mdoM34w9t2SuiEjMc';

/**
 * Fetches the list of cat breeds.
 * @returns {Promise<Array>} A promise that resolves to an array of cat breeds.
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
 * Fetches images of cats by breed ID.
 * @param {string} breedId - The ID of the breed.
 * @returns {Promise<Object>} A promise that resolves to an array of cat images.
 */
export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data[0];
  } catch (error) {
    throw new Error('Failed to fetch cat by breed');
  }
};