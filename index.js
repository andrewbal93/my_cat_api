"use strict";

const BASE_URL = "https://api.thecatapi.com/v1";
const loader = document.querySelector('.load-msg');
const err = document.querySelector('.err-msg');
const select = document.querySelector('#breed-select');
const infoDiv = document.querySelector('.cat-info-div');

const fetchDATA = async (url) => {
    try {
        const response = await fetch(BASE_URL + url);
        return await response.json()
    } catch (error) {
        throw new Error(`ERROR fetchURL: ${error}`)
    }
};

(async () => {
    try {
        loader.style.display = "block";
        
        const breeds = await fetchDATA("/breeds");
        const selectMarkup = breeds.map(breed => `<option value="${breed.id}|${breed.name}|${breed.description}">${breed.name}</option>`).join("")
        select.insertAdjacentHTML("beforeend", selectMarkup)
        loader.style.display = "none";
        select.style.display = "block";
    } catch (error) {
        select.style.display = "none";
        loader.style.display = "none";
        err.style.display = "block";
        throw new Error(`ERROR fetchBreeds: ${error}`)
    }
})();

const fetchCatInfo = async(breedId, breedName, breedDscr) => {
    loader.style.display = "block";
    try {
             const catImg = await fetchDATA(`/images/search?breed_ids=${breedId}`);
        const catInfoMarkup = `
        <div class="text-div">
        <p class="info-ttl">${breedName}</p>
        <p class="info-dscr">${breedDscr}</p>
        </div>
        <img src="${catImg[0].url}" alt="" class="info-img">`
        
        loader.style.display = "none";
        infoDiv.insertAdjacentHTML("beforeend",catInfoMarkup)
    } catch (error) {
        throw new Error(`ERROR fetchCatInfo ${error}`)
    }
}

select.addEventListener("change", async (event) => {
    const [breedId, breedName, breedDscr] = event.target.value.split("|");
    infoDiv.innerHTML = "";
    await fetchCatInfo(breedId, breedName, breedDscr);    
})