"use strict";

const BASE_URL = "https://api.thecatapi.com/v1";
const API_KEY = "live_Pf6TQswVRH9Evu1FuMHlfi9EJTbLroUshBofydxVS09W8oeXeopbTSN55FiZAFCA";
const loaderMess = document.querySelector('.loader');
const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector('.cat-info');
const errorMess = document.querySelector('.error');

//show loader / hide select 
loaderMess.style.display = "block";
breedSelect.style.display = "none";

//fetchData async function
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw new Error(`FetchData function Error: ${error}`);
    }
};

// async fetchBreeds
// breeds get by fetchData /breeds
// breeds map to gen and insert options
// change loader to breedSelect by style
// catch with change loader to err and clg

const fetchBreeds = async () => {
    try {
        const breeds = await fetchData(BASE_URL + '/breeds');
        
        const breeds_markup = breeds.map(breed => `<option value="${breed.id}|${breed.name}|${breed.description}">${breed.name}</option>`).join("");
        breedSelect.insertAdjacentHTML("beforeend", breeds_markup);
    
        loaderMess.style.display = "none";
        breedSelect.style.display = "block";
    } catch (error) {
        loaderMess.style.display = "none";
        errorMess.style.display = "block";
        throw new Error(`FetchBreeds function Error: ${error}`);
    }
    
}

/* Async fnc fetchCatByBreed with value args. Hide loader, get img by id, create .cat-info markup and insert. Catch error and view/hide needed tags  */

const fetchCatByBreed = async (breedId, breedName, breedDsc) => {
  loaderMess.style.display = "block";
  try {
    const catImage = await fetchData(BASE_URL + `/images/search?breed_ids=${breedId}`);
    
    const descriptionMarkup = `
      <div class="dscr-div">
      <h3 class="cat-dscr-ttl">= ${breedName} =</h3>
      <p class="cat-dscr">${breedDsc}</p>
      </div>
      <img class="cat-img" src="${catImage[0].url}">
    `;

    catInfo.innerHTML = descriptionMarkup;
    loaderMess.style.display = "none";    
  } catch (error) {
    loaderMess.style.display = "none";    
    errorMess.style.display = "block";
    throw new Error(`FetchCatByBreed function Error: ${error}`)
  }
};

/* Add event listener to select tag change. Split chosen option value. Clear .catInfo. Do fetch by breed */

breedSelect.addEventListener("change", async (event) => {
  const [breedId, breedName, breedDsc] = event.target.value.split("|");
  catInfo.innerHTML = "";
  await fetchCatByBreed(breedId, breedName, breedDsc);
});

fetchBreeds()