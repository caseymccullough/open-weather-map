// CACHED DOM ELEMENTS
const button = document.querySelector("button");
const zipCode = document.querySelector("input");
const dataContainer = document.getElementById("data-container");

//  GLOBAL VARIABLES
const WEATHER_ENDPOINT_FRONT = "https://api.openweathermap.org/data/2.5/weather?zip=";
const WEATHER_ENDPOINT_BACK = ",us&units=imperial&appid=fdca18ceb5aeb5e5c9afe8bb1741de64";
//const CLE_FULL = "https://api.openweathermap.org/data/2.5/weather?zip=44118,us&units=imperial&appid=fdca18ceb5aeb5e5c9afe8bb1741de64";

const addInfoToDom = (weatherData) => {
    const weatherDivs = userData.map((user, i )=> {
        return `<div>
            User number ${i} is named ${user.name}
            <p>Email: ${user.email}</p>
            <p>City: ${user.address.city}</p>
            <p class = "company">Company: ${user.company.name}</p>
        </div>`
    });
    usersContainer.innerHTML = userDivs.join("");
}

const addCityToDom = (cityName) => {

    const cityDiv = document.createElement("div");
    cityDiv.className = "row";
    cityDiv.id = "city";
    cityDiv.innerText = cityName;

    dataContainer.appendChild(cityDiv);
}

const addTempToDom = (temp) => {

    const tempDiv = document.createElement("div");
    tempDiv.className = "row";
    tempDiv.id = "temp";
    tempDiv.innerText = temp + "°";

    dataContainer.appendChild(tempDiv);
}

const addConditionsToDom = (conditions) => {

    const conditionsDiv = document.createElement("div");
    conditionsDiv.className = "row";
    conditionsDiv.id = "conditions";
    conditionsDiv.innerText = conditions;

    dataContainer.appendChild(conditionsDiv);
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

    dataContainer.appendChild(rangeDiv);
}

const getWeatherData = async (cityURL) => {
     try {
        const response = await fetch(cityURL);// wait until next piece resolves. 
        const data = await response.json(); // await allows this to run 
        return data;
        //addUsersToDom(data);
     }catch (err){ // error being caught by browser
        console.log (err);
     } // end catch
}

const getZipCode = () => {
    return zipCode.value; // HERE
}

const getWeatherReport = () => {

    let zip = getZipCode();
    let cityURL = WEATHER_ENDPOINT_FRONT + zip + WEATHER_ENDPOINT_BACK;
   // console.log(cityURL);
    const weatherData = getWeatherData (cityURL);
    console.log(weatherData);
    /* Here's where I am stuck.
    I don't know how to parse through this giant blob of data and extract
    the correct values.
    */
    const city = "Phoenix";//`${weatherData.name}`;
    addCityToDom(city);

    const temp = 99;
    addTempToDom(temp);

    const conditions = "sunny";
    addConditionsToDom (conditions);

    const high = 100;
    const low = 80;
    addRangeToDom (low, high);



}

// EVENT LISTENERS
button.addEventListener('click', getWeatherReport);
