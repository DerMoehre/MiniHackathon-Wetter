function init() {
    showCurrentDate();
}


function getCurrentDate() {
    return new Date().toDateString('en-su');
}


function showCurrentDate() {
    let currentDate = document.querySelector('.current_date');
    let date = getCurrentDate();
    currentDate.innerHTML = generateCurrentDateInnerHMTL(date);
}


function generateCurrentDateInnerHMTL(date) {
    return /* HTML */ `
        <h3>Current Date</h3>
        <p class="text_temperature_date">${date}</p>`;
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
    heatTransferCoefficient = 10;
    surfaceIce = 0.00824;
    temperatureIce = -13;
    weightIce = 0.08;

    energyConsumption = heatingTheIce(weightIce, temperatureIce) + meltingTheIce(weightIce);
    timeNeeded = (energyConsumption/heatFlow(currentTemp, temperatureIce, surfaceIce, heatTransferCoefficient))/60

    return timeNeeded;
}
// <---------------------------------------------->

function getCity() {
    let inputSearch = document.querySelector('.input_search').value;
    console.log(inputSearch);
}