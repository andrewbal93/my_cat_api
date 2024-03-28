"use strict";

const BASE_URL = "https://api.thecatapi.com/v1";
const API_KEY =
  "live_Pf6TQswVRH9Evu1FuMHlfi9EJTbLroUshBofydxVS09W8oeXeopbTSN55FiZAFCA";

document.querySelector(".loader").style.display = "block";

const fetchBreeds = () => {
  const breed_query = fetch(BASE_URL + "/breeds");

  breed_query
    .then((res) => res)
    .then((data) => data.json())
    .then((result) => {
      // console.log("BreedsArrFirst", result[0])
      const breeds_markup = result
        .map(
          (breed_el) =>
            `<option value="${breed_el.id}|${breed_el.name}|${breed_el.description}">${breed_el.name}</option>`
        )
        .join("");
      document.querySelector(".loader").style.display = "none";
      document.querySelector(".breed-select").style.display = "block";
      document
        .querySelector(".breed-select")
        .insertAdjacentHTML("beforeend", breeds_markup);
    })
    .catch(() => {
      document.querySelector(".loader").style.display = "none";
      document.querySelector(".error").style.display = "block";
    });
};
fetchBreeds();

const fetchCatByBreed = (breed_id, breed_name, breed_dscr) => {
  document.querySelector(".loader").style.display = "block";
  const catByBreed = fetch(BASE_URL + "/images/search?breed_ids=" + breed_id);

  catByBreed
    .then((res) => res)
    .then((data) => data.json())
    .then((result) => {
      // console.log("ImgByBreed", result[0]);
      const dscr_markup = `<div class="dscr-div">
    <h3 class="cat-dscr-ttl">== ${breed_name} ==</h3>
    <p class="cat-dscr">${breed_dscr}</p>
  </div>
  <img class="cat-img" src="${result[0].url}" alt="">`;
      document
        .querySelector(".cat-info")
        .insertAdjacentHTML("beforeend", dscr_markup);
      document.querySelector(".loader").style.display = "none";
    })
    .catch(() => {
      document.querySelector(".loader").style.display = "none";
      document.querySelector(".error").style.display = "block";
    });
};

document.querySelector(".breed-select").addEventListener("change", (event) => {
  const selectedBreedValues = event.target.value.split("|");
  const selectedBreedId = selectedBreedValues[0];
  const selectedBreedName = selectedBreedValues[1];
  const selectedBreedDscr = selectedBreedValues[2];
  document.querySelector(".cat-info").innerHTML = "";
  // console.log(selectedBreedValues);
  fetchCatByBreed(selectedBreedId, selectedBreedName, selectedBreedDscr);
});
