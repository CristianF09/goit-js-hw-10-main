import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

// Select elements
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorDiv = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

/**
 * Show loader
 */
const showLoader = () => {
  loader.classList.remove('hidden');
};

/**
 * Hide loader
 */
const hideLoader = () => {
  loader.classList.add('hidden');
};

/**
 * Show error message
 * @param {string} message - The error message to display
 */
const showError = (message) => {
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
};

/**
 * Hide error message
 */
const hideError = () => {
  errorDiv.classList.add('hidden');
};

/**
 * Load breeds and populate the select element
 */
const loadBreeds = async () => {
  try {
    showLoader();
    hideError();

    breedSelect.classList.add('hidden');

    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
    
    new SlimSelect({
      select: breedSelect,
    });

    breedSelect.classList.remove('hidden');
    hideLoader();
  } catch (error) {
    hideLoader();
    showError('Failed to load breeds');
  }
};

/**
 * Load cat by breed and display info
 * @param {string} breedId - The ID of the breed
 */
const loadCatByBreed = async (breedId) => {
  try {
    showLoader();
    hideError();

    catInfo.classList.add('hidden');

    const cat = await fetchCatByBreed(breedId);
    catInfo.innerHTML = `
      <h2 class="breed-name">${cat.breeds[0].name}</h2>
      <p class="description">${cat.breeds[0].description}</p>
      <p class="temperament">${cat.breeds[0].temperament}</p>
      <img class="cat-image" src="${cat.url}" alt="Cat Image" />
    `;

    catInfo.classList.remove('hidden');
    hideLoader();
  } catch (error) {
    hideLoader();
    showError('Failed to load cat information');
  }
};

// Event listener for breed select change
breedSelect.addEventListener('change', (event) => {
  const breedId = event.target.value;
  if (breedId) {
    loadCatByBreed(breedId);
  }
});

// Load breeds on page load
loadBreeds();