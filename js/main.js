const cityInput = document.querySelector(".city");
const searchButton = document.querySelector(".search-btn");
const locationBtn = document.querySelector(".location-btn");
const errorElement = document.querySelector(".error-element");

// Select the HTML elements for location-details
const locationNameElement = document.querySelector(".current-location .details h4:nth-child(2)");
const cityElement = document.querySelector(".current-location .details h4:nth-child(3)");
const municipalityElement = document.querySelector(".current-location .details h4:nth-child(4)");
const countryElement = document.querySelector(".current-location .details h4:nth-child(5)");
const stateElement = document.querySelector(".current-location .details h4:nth-child(6)");
const neighbourhoodElement = document.querySelector(".current-location .details h4:nth-child(7)");
const postcodeElement = document.querySelector(".current-location .details h4:nth-child(8)");
const callingcodeElement = document.querySelector(".current-location .details h4:nth-child(9)");
const timezoneElement = document.querySelector(".current-location .details h4:nth-child(10)");
const country_codeElement = document.querySelector(".current-location .details h4:nth-child(11)");
const flagElement = document.querySelector(".flag-element");

//Select the HTML elements for Currency Information
const currencyNameElement = document.querySelector(".currency .details h4:nth-child(2)");
const currencySymbolElement = document.querySelector(".currency .details h4:nth-child(3)");
const currencyCodeElement = document.querySelector(".currency .details h4:nth-child(4)");
const subunitElement = document.querySelector(".currency .details h4:nth-child(5)");
const subunitToUnitElement = document.querySelector(".currency .details h4:nth-child(6)");
const AlternateSymbolsElement = document.querySelector(".currency .details h4:nth-child(7)");

//Select the HTML elements for Road Information
const driveOnElement = document.querySelector(".road .details h4:nth-child(2)");
const speedInElement = document.querySelector(".road .details h4:nth-child(3)");



const getlocation = (lat, lng) => {
    const locationApi = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=08b4237736b64e06bf9c8f3ff428ee9d`
    fetch(locationApi)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((responseData) => {
            // Get the required data from the response for location-details
            const { country } = responseData.results[0].components;
            const { city } = responseData.results[0].components;
            const { lat, lng } = responseData.results[0].geometry;
            const { formatted } = responseData.results[0];
            const { sunrise, sunset } = responseData.results[0].annotations;
            const { timezone } = responseData.results[0].annotations;
            const { currency } = responseData.results[0].annotations;
            const { flag } = responseData.results[0].annotations;
            const { roadinfo } = responseData.results[0].annotations;
            const { callingcode } = responseData.results[0].annotations;
            const { state } = responseData.results[0].components;
            const { municipality } = responseData.results[0].components;
            const { neighbourhood } = responseData.results[0].components;
            const { postcode } = responseData.results[0].components;
            const { country_code } = responseData.results[0].components;
            const countryCode = responseData.results[0].components['ISO_3166-1_alpha-2'];

            // Get the required data from the response for Currency Information
            const { name } = responseData.results[0].annotations.currency;
            const { symbol } = responseData.results[0].annotations.currency;
            const { iso_code } = responseData.results[0].annotations.currency;
            const { subunit } = responseData.results[0].annotations.currency;
            const { subunit_to_unit } = responseData.results[0].annotations.currency;
            const { alternate_symbols } = responseData.results[0].annotations.currency;
            console.log(name)

            // Get the required data from the response for Road Information
            const { drive_on } = responseData.results[0].annotations.roadinfo;
            const { speed_in } = responseData.results[0].annotations.roadinfo;

            // Update the content of the HTML elements
            locationNameElement.textContent = "Location Name: " + formatted;
            cityElement.textContent = "City: " + city;
            stateElement.textContent = "State: " + state;
            municipalityElement.textContent = "Municipality: " + municipality;
            countryElement.textContent = "Country: " + country;
            neighbourhoodElement.textContent = "Native Name: " + neighbourhood;
            postcodeElement.textContent = "Post-Code: " + postcode;
            callingcodeElement.textContent = "Calling Code: " + callingcode;
            timezoneElement.textContent = "Timezone: " + timezone.name + " (" + timezone.short_name + ")";
            country_codeElement.textContent = "Top Level Domain: ." + country_code;

            // Update the src attribute of the img element
            const flagUrl = `https://flagsapi.com/${countryCode}/shiny/64.png`;
            flagElement.src = flagUrl;

            // Update the content of the HTML elements for Currency Information
            currencyNameElement.textContent = "Currency Name: " + name;
            currencySymbolElement.textContent = "Currency Symbol: " + symbol;
            currencyCodeElement.textContent = "Currency Code: " + iso_code;
            subunitElement.textContent = "Subunit: " + subunit ;
            subunitToUnitElement.textContent = `Subunit to Unit:   ${subunit_to_unit} ${subunit} `;
            AlternateSymbolsElement.textContent = "Alternate Symbols: " + alternate_symbols;

            // Update the content of the HTML elements Road Information
            driveOnElement.textContent = "Drive On: " + drive_on;
            speedInElement.textContent = "Speed In: " + speed_in;

        }).catch((error) => {
            errorElement.textContent = 'There was an error! ' + error;
            errorElement.style.color = 'red';
            errorElement.style.display = 'block';
            console.log(error);

        });
}

//get the coordinate by city Names
const getCityCoordinates = () => {
    const cityNames = cityInput.value.trim();
    if (!cityNames) return;
    const Geocoding_api_url = `https://api.opencagedata.com/geocode/v1/json?q=${cityNames}&key=08b4237736b64e06bf9c8f3ff428ee9d`
    fetch(Geocoding_api_url).then((response) => response.json()).then((responseData) => {
        const { lat, lng } = responseData.results[0].geometry;
        getlocation(lat, lng)
    }).catch(() => {
        alert("Error fetching");
    })
}

//Get current Coordinates 
const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getlocation(lat, lon);

    },
        error => {
            if (error.code === error.PERMISSION_DENIED) {
                alert("GeoLocation request is denied. Please accept the permission");
            }
        })

}

// event listeners
locationBtn.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);

// Replace with actual country code
