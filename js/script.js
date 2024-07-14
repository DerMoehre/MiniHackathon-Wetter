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