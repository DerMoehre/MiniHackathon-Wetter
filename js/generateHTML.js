function generateCurrentWeatherInnerHTML(info, index, path) {
    return /* HTML */ `
                <div class="left_part">
                    <div class="upper_left_part">
                        <div class="city_temperature">
                            <h3>Kamen</h3>
                            <img class="filter_white upper_part_img" src=${path} alt="">
                            <p class="text_temperature_date">${info.temperature_2m} °C</p>
                        </div>
                        <div class="seperator_line"></div>
                        <div class="temperature_quote">
                            <img class="ice_icon filter_white" src="img/ice_sweet_icon.svg" alt="ice icon">
                            <p class="text_quote">Vorsicht, dein Eis schmilzt</p>
                        </div>
                    </div>
                    <div class="bottom_left_part">
                        <div class="temperature_graph">
                            <canvas>

                            </canvas>
                        </div>
                    </div>
                </div>
                <div class="right_part">
                    <div class="current_date">
   
                    </div>
                    <div class="forecast_days">
                        <table class="table_forecast">
                            <tbody class="tbody_forecast">

                            </tbody>
                        </table>
                    </div>
                </div>`;
}

function generateCurrentDateInnerHMTL(date) {
    return /* HTML */ `
        <h3>Current Date</h3>
        <p class="text_temperature_date">${date}</p>`;
}

function generateTableInnerHTML(day, temperature, path) {
    return /* HTML */ `
         <tr>
             <td>${day}</td>
             <td><img class="weather_icon_table filter_white" src=${path} alt=""></td>
             <td>${temperature} °C</td>
         </tr>`;
}