// CACHED DOM ELEMENTS
const button = document.querySelector("#submit");
const userInput = document.querySelector("#user-input");
const weatherContainer = document.querySelector("#weather-container");

//  GLOBAL VARIABLES
const WEATHER_ENDPOINT_FRONT = "https://api.openweathermap.org/data/2.5/weather?zip=";
const WEATHER_ENDPOINT_BACK = ",us&units=imperial&appid=fdca18ceb5aeb5e5c9afe8bb1741de64";
const CLE_FULL = "https://api.openweathermap.org/data/2.5/weather?zip=44118,us&units=imperial&appid=fdca18ceb5aeb5e5c9afe8bb1741de64";



const addCityToDom = (cityName) => {

    const cityDiv = document.createElement("div");
    cityDiv.className = "row";
    cityDiv.id = "city";
    cityDiv.innerText = cityName;

    weatherContainer.appendChild(cityDiv);
}

const addTempToDom = (temp) => {

    const tempDiv = document.createElement("div");
    tempDiv.className = "row";
    tempDiv.id = "temp";
    tempDiv.innerText = temp + "°";

    weatherContainer.appendChild(tempDiv);
}

const addConditionsToDom = (conditions) => {

    const conditionsDiv = document.createElement("div");
    conditionsDiv.className = "row";
    conditionsDiv.id = "conditions";
    conditionsDiv.innerText = conditions;

    weatherContainer.appendChild(conditionsDiv);
}

const addRangeToDom = (min, max) => {

    const rangeDiv = document.createElement("div");
    rangeDiv.className = "row";
    rangeDiv.id = "range";
    
    const minDiv = document.createElement("div");
    const maxDiv = document.createElement("div");

    minDiv.className = "min-max";
    minDiv.innerText = min + "°";

    maxDiv.className = "min-max";
    maxDiv.innerText = max + "°";;

    rangeDiv.appendChild(minDiv);
    rangeDiv.appendChild(maxDiv);

    weatherContainer.appendChild(rangeDiv);
}



const getWeatherReport = async () => {
    const zipCode = getZipCode();
    const zipURL = WEATHER_ENDPOINT_FRONT + zipCode + WEATHER_ENDPOINT_BACK;
    
    try {
        
        /* GET DATA FROM THE API */
        const response = await fetch(zipURL);// wait until next piece resolves. 
        const data = await response.json(); // await allows this to run 
        console.log (data);

        /* ADD INFO TO WEBPAGE */
        addCityToDom(data.name);
        addTempToDom(data.main.temp.toFixed(0));
        addConditionsToDom (data.weather[0].main);
        addRangeToDom (data.main.temp_min.toFixed(0), data.main.temp_max.toFixed(0));
 
        //addUsersToDom(data);
     }catch (err){ // error being caught by browser
        console.log (err);
     } // end catch
}

const getZipCode = () => {
    return userInput.value; // HERE
}


// EVENT LISTENERS
button.addEventListener('click', getWeatherReport);
