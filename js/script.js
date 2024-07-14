let currentWeatherData;
let responseWeatherCodeJson;
let path;


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
    let dayStatus = currentWeatherData.is_day;
    if(dayStatus == 1) {
        path = responseWeatherCodeJson[index].pathDay;
    } else {
        path = responseWeatherCodeJson[index].pathNight;
    }
    weatherInfo.innerHTML += generateCurrentWeatherInnerHTML(currentWeatherData, index, path);
}

function getRightPath(index) {
    let dayStatus = currentWeatherData.is_day;
    if(dayStatus == 1) {
        path = responseWeatherCodeJson[index].pathDay;
    } else {
        path = responseWeatherCodeJson[index].pathNight;
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


