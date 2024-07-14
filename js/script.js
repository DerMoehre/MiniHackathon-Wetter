let currentWeatherData;
let responseWeatherCodeJson;

async function init() {
    await loadData();
    renderCurrentWeather();
    showCurrentDate();
}

async function loadData() {
    let response = await fetch('./js/responseKamen.json');
    let responseWeatherCode = await fetch('./js/weatherCode.json');
    let responseAsJson = await response.json();
    responseWeatherCodeJson = await responseWeatherCode.json();
    currentWeatherData =  responseAsJson.current;
}

function renderCurrentWeather() {
    let weatherInfo = document.querySelector('.weather_info');
    let index = currentWeatherData.weather_code;
    let path = getRightPath(index);
    weatherInfo.innerHTML += generateCurrentWeatherInnerHTML(currentWeatherData, index, path);
}

function getRightPath(index) {
    let dayStatus = currentWeatherData.is_day;
    if(dayStatus == 1) {
        return responseWeatherCodeJson[index].pathDay;
    } else {
        return responseWeatherCodeJson[index].pathNight;
    }
}

function getCurrentDate() {
    return new Date().toDateString('en-su');
}

function showCurrentDate() {
    let currentDate = document.querySelector('.current_date');
    let date = getCurrentDate();
    currentDate.innerHTML = generateCurrentDateInnerHMTL(date);
}

function heatingTheIce(weightIce, temperatureIce) {
    return (weightIce * 2.1 *(0-temperatureIce))*1000;
}

function meltingTheIce(weightIce) {
    return weightIce * 334000;
}

function heatFlow(currentTemp, temperatureIce, surfaceIce, heatTransferCoefficient) {
    return heatTransferCoefficient * surfaceIce * (currentTemp - temperatureIce)
}

function calculateMeltingTime(currentTemp) {
    heatTransferCoefficient = 10;
    surfaceIce = 0.00824;
    temperatureIce = -13;
    weightIce = 0.08;

    energyConsumption = heatingTheIce(weightIce, temperatureIce) + meltingTheIce(weightIce);
    timeNeeded = (energyConsumption/heatFlow(currentTemp, temperatureIce, surfaceIce, heatTransferCoefficient))/60

    return timeNeeded;
}

