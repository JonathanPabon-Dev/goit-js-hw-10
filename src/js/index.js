import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('.breed-select');
  const loader = document.querySelector(`.loader`);
  const catInfo = document.querySelector('.cat-info');

  function breedsBind() {
    fetchBreeds()
      .then(data => {
        fillBreeds(data);
      })
      .catch(() => {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      })
      .finally(() => {
        loader.classList.add('hidden');
      });
  }

  function fillBreeds(breedsData) {
    const slectOptionsArray = breedsData.map(item => {
      return {
        text: item.name,
        value: item.id,
      };
    });

    new SlimSelect({
      select: '.breed-select',
      data: slectOptionsArray,
      events: {
        afterChange: newValue => {
          if (newValue) {
            const id = newValue[0].value;
            const breedData = breedsData.filter(breed => breed.id == id)[0];
            fetchCatByBreed(id)
              .then(catData => {
                catInfo.textContent = '';
                createCard(catData[0], breedData);
                loader.classList.add('hidden');
              })
              .catch(() => {
                Notiflix.Notify.failure(
                  'Oops! Something went wrong! Try reloading the page!'
                );
              })
              .finally(() => {
                loader.classList.add('hidden');
              });
          }
        },
      },
    });
  }

  function createCard(cat, breed) {
    const catImg = document.createElement('img');
    const catDetails = document.createElement('div');
    const breedTitle = document.createElement('h2');
    const breedDescription = document.createElement('p');
    const breedTemperament = document.createElement('p');

    catImg.classList.add('card-img');
    catImg.src = cat.url;
    catImg.alt = breed.name;

    breedTitle.textContent = breed.name;
    breedDescription.textContent = breed.description;
    breedTemperament.innerHTML = `<b>Temperament:</b> ${breed.temperament}`;
    catDetails.append(breedTitle, breedDescription, breedTemperament);

    catInfo.classList.add('card');
    catInfo.append(catImg, catDetails);
    catDetails.classList.add('card-body');
  }

  breedsBind();
});
