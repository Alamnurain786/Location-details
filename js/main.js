const cityInput = document.querySelector(".city");
const searchButton = document.querySelector(".search-btn");

const getCityCoordinates = () => {
    const cityNames = cityInput.value.trim();
    if (!cityNames) return;
    console.log(cityNames)
}

searchButton.addEventListener("click", getCityCoordinates);