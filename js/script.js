let currentWeatherData;
let dailyWeatherData;
let hourlyWeatherData;
let responseWeatherCodeJson;

async function init() {
    await loadData();
    renderCurrentWeather();
    showCurrentDate();
    getForecast();
    showWeatherChart();
}

async function loadData() {
    let response = await fetch('./js/responseKamen.json');
    let responseWeatherCode = await fetch('./js/weatherCode.json');
    let responseAsJson = await response.json();
    responseWeatherCodeJson = await responseWeatherCode.json();
    currentWeatherData =  responseAsJson.current;
    hourlyWeatherData = responseAsJson.hourly;
    dailyWeatherData = responseAsJson.daily;

    
}

function renderCurrentWeather() {
    let weatherInfo = document.querySelector('.weather_info');
    let index = currentWeatherData.weather_code;
    let path = getRightPath(index);
    let weatherPath = proveCurrentTemperature(currentWeatherData.temperature_2m);
    let timeLeft = Math.round(calculateMeltingTime(currentWeatherData.temperature_2m));
    let temperatureText = generateTemperatureText(currentWeatherData.temperature_2m, timeLeft);
    weatherInfo.innerHTML += generateCurrentWeatherInnerHTML(currentWeatherData, index, path, weatherPath, temperatureText);
}

function proveCurrentTemperature(temperature) {
    if(temperature > 10) {
        return path = 'img/ice_sweet_icon.svg';
    } else {
        return path = 'img/coffee_cup_icon.svg';
    }
}

function generateTemperatureText(temperature, timeLeft) {
    if(temperature > 10) {
        return `Quick! You have ${timeLeft} minutes to savor your ice cream before it becomes a puddle!"`;
    } else {
        return `Sip swiftly! Your drink will chill in ${timeLeft} minutes!`;
    }
}

function getForecast() {
    let tbodyForecast = document.querySelector('.tbody_forecast');
    tbodyForecast.innerHTML = '';
    let temperature = dailyWeatherData.temperature_2m_max;
    let dates = dailyWeatherData.time;
    let codes = dailyWeatherData.weather_code;
    removeFirstElement(dates, temperature, codes);
    dates.forEach((date, index) => {
        let d = new Date(date);
        let day = getWeekday(d.getDay());
        let code = codes[index];
        let path = getRightPath(code);
        renderForecast(day, temperature[index], path);
    });
}

function removeFirstElement(array1, array2, array3) {
    array1.shift();
    array2.shift();
    array3.shift();
}

function renderForecast(day, temperature, path) {
    let tbodyForecast = document.querySelector('.tbody_forecast');
    tbodyForecast.innerHTML += generateTableInnerHTML(day, temperature, path);
}

function getRightPath(index) {
    let dayStatus = 1;
    if(typeof currentWeatherData.is_day !== 'undefined') {
        dayStatus = currentWeatherData.is_day;
    }
    if(dayStatus == 1) {
        return responseWeatherCodeJson[index].pathDay;
    } else {
        return responseWeatherCodeJson[index].pathNight;
    }
}

function getWeekday(time) {
    if(time == 0) {
        return "SUN"
    } else if (time == 1) {
        return "MON"
    } else if(time == 2) {
        return "TUE"
    } else if(time == 3) {
        return "WED"
    } else if(time == 4) {
        return "THU"
    } else if(time == 5) {
        return "FRI"
    } else {
        return "SAT"
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

// <----------- calculating ice melt --------------->
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
    heatTransferCoefficient = 30;
    surfaceIce = 0.01624;
    temperatureIce = -15;
    weightIce = 0.08;

    energyConsumption = heatingTheIce(weightIce, temperatureIce) + meltingTheIce(weightIce);
    timeNeeded = (energyConsumption/heatFlow(currentTemp, temperatureIce, surfaceIce, heatTransferCoefficient))/60

    return timeNeeded;
}

// <---------------------------------------------->

async function getCity() {
    let inputSearch = document.querySelector('.input_search').value;
    let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${inputSearch}&count=10&language=en&format=json`);
    let responseAsJson = await response.json();
    let searchResult = document.querySelector('.search_result');
    searchResult.innerHTML = '';
    responseAsJson.results.forEach(result => {
        searchResult.innerHTML += generateResultsInnerHTML(result);
    });
    showStatChart();
}

function getCityPosition(cityArray, id) {
    let city = cityArray.results.find(city => city.id == id);
    let longitude = city.longitude;
    let latitude = city.latitude;
}


function showWeatherChart() {
    let ctx = document.getElementById('temperatureChart').getContext('2d');
    Chart.defaults.font.size = 16;
    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.family = "'Quicksand', sansr-serif";
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.plugins.tooltip.enabled = true;
    barStats = new Chart(ctx, {
        type: 'line',
        data: {
            labels: hourlyWeatherData.time,
            datasets: [{
                axis: 'y',
                data: hourlyWeatherData.temperature_2m,
                fill: true,
                backgroundColor: [
                    'rgba(4,3,7, 0.2)',
                ],
                borderColor: [
                    'rgb(4,3,7)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            elements: {
                point: {
                    radius: 0
                },
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'MM/dd HH:mm',
                        displayFormats: {
                            day: 'MM/dd'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                }
            },
            plugins: {
                tooltip: {

                    callbacks: {
                        label: function(tooltipItem) {
                            return 'Temperature: ' + tooltipItem.parsed.y + ' °C';
                        }
                    }
                }
            }
        }
    })
};