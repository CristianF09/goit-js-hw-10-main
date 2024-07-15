import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_DZEVyJW3VcBIexNIe3baRDqWHCXVAhgw8tJCASx5USwQZM7mdoM34w9t2SuiEjMc';

 @returns {Promise<Array>}
 @throws 

export const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch breeds');
  }
};

 @param {string} breedId 
 @returns {Promise<Object>} 
 @throws 
 
export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data[0];
  } catch (error) {
    throw new Error('Failed to fetch cat by breed');
  }
};