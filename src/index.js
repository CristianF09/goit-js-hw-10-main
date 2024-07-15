import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const showLoader = () => {
  loader.classList.remove('hidden');
};

const hideLoader = () => {
  loader.classList.add('hidden');
};

const showError = (message) => {
  errorElement.textContent = message;
  errorElement.classList.remove('hidden');
};

const hideError = () => {
  errorElement.classList.add('hidden');
};

// Fetch breeds function and populate select
const loadBreeds = async () => {
  try {
    showLoader();
    breedSelect.classList.add('hidden');
    hideError();

    const breeds = await fetchBreeds();

    breedSelect.innerHTML = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');

    new SlimSelect({
      select: breedSelect,
    });

    breedSelect.classList.remove('hidden');
  } catch (error) {
    showError('Failed to load breeds. Please try again later.');
    Notiflix.Notify.failure('Failed to load breeds. Please try again later.');
  } finally {
    hideLoader();
  }
};

// Fetch cat by breed function and display info
const loadCatInfo = async (breedId) => {
  try {
    showLoader();
    catInfo.classList.add('hidden');
    hideError();

    const catData = await fetchCatByBreed(breedId);

    catInfo.innerHTML = `
      <h2>${catData.breeds[0].name}</h2>
      <p>${catData.breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
      <img src="${catData.url}" alt="Cat Image">
    `;

    catInfo.classList.remove('hidden');
  } catch (error) {
    showError('Failed to load cat information. Please try again later.');
    Notiflix.Notify.failure('Failed to load cat information. Please try again later.');
  } finally {
    hideLoader();
  }
};

// Event listener for breed select
breedSelect.addEventListener('change', (event) => {
  const breedId = event.target.value;
  loadCatInfo(breedId);
});

// Initial load
loadBreeds();