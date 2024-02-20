import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_cz3Vvr3bwYMJcOjmZF0GjAHx4owKPkLCjSLicGERtZJOC03OOBxPuhLdb7t2sqNF';

const URL_BREEDS = 'https://api.thecatapi.com/v1/breeds';
const URL_BASE_CAT = 'https://api.thecatapi.com/v1/images/search?breed_ids=';

export function fetchBreeds() {
  return fetch(URL_BREEDS).then(res => res.json());
}

export function fetchCatByBreed(breedId) {
  return fetch(URL_BASE_CAT + breedId).then(res => res.json());
}
