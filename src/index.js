import axios from "axios";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

axios.defaults.headers.common["x-api-key"] = "YOUR_API_KEY";

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

new SlimSelect({
  select: breedSelect
});


async function fetchBreeds() {
  try {
    loader.classList.remove('hidden');
    breedSelect.classList.add('hidden');
    errorElement.classList.add('hidden');
    
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    const breeds = response.data;
    
    breedSelect.innerHTML = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
    
    new SlimSelect({
      select: breedSelect,
    });

    breedSelect.classList.remove('hidden');
  } catch (error) {
    errorElement.classList.remove('hidden');
    Notiflix.Notify.failure('Failed to load breeds. Please try again later.');
  } finally {
    loader.classList.add('hidden');
  }
}

async function fetchCatByBreed(breedId) {
  try {
    loader.classList.remove('hidden');
    catInfo.classList.add('hidden');
    errorElement.classList.add('hidden');

    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    const catData = response.data[0];

    catInfo.innerHTML = `
      <h2>${catData.breeds[0].name}</h2>
      <p>${catData.breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
      <img src="${catData.url}" alt="Cat Image">
    `;

    catInfo.classList.remove('hidden');
  } catch (error) {
    errorElement.classList.remove('hidden');
    Notiflix.Notify.failure('Failed to load cat information. Please try again later.');
  } finally {
    loader.classList.add('hidden');
  }
}

breedSelect.addEventListener('change', (event) => {
  const breedId = event.target.value;
  fetchCatByBreed(breedId);
});

fetchBreeds();