

function geoFind() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            //console.log(latitude, longitude);
            getWeather(latitude, longitude)
        });
    } else {
        alert("Geolocation is not supported");
    }
}

function getWeather(myLat, myLon) {
    //SET LOCAL VARIABLES
    let weatherUrl = `https://fcc-weather-api.glitch.me/api/current?lat=${myLat}&lon=${myLon}`
    let local;
    let temperature;
    let precipitation;
    let cloud;
    let wind;
    fetch(weatherUrl)
        .then(resp => resp.json())
        .then(data => {
            local = data.name;
            temperature = Math.floor(data.main.temp);
            humidity = data.main.humidity;
            cloud = data.clouds.all;
            wind = data.wind.speed;
            // console.log(data);

            // ADD ELEMENTS TO DOM
            document.getElementById('location').innerHTML = `<h3>${local}</h3>`;
            document.getElementById('temperature').innerHTML = `<h1>${temperature} <i class="wi wi-celsius"></h1>`;
            document.getElementById('humidity').innerHTML = `<h3><i class="wi wi-humidity"></i> ${humidity}%</h3>`;
            document.getElementById('cloud').innerHTML = `<h3><i class="wi wi-cloudy"></i> ${cloud}%</h3>`;
            document.getElementById('wind').innerHTML = `<h3><i class="wi wi-strong-wind"></i> ${wind} mph</h3>`;

            // Return 
            return temperature;
        });

}

function getDate() {
    let date = new Date();
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let today = weekday[date.getDay()];
    document.getElementById('date').innerHTML = `<h1>${today}</h1>`;
}

geoFind();
getDate();

document.getElementById('temperature').addEventListener('click', toggleTemp);

let stateVal = 0;

function toggleTemp(e) {
    stateVal++;
    let currentTemp = parseInt(temperature.innerText);

    if (stateVal % 2 > 0) {
        let convertTemp = Math.round(currentTemp * 1.8 + 32);
        document.getElementById('temperature').innerHTML = `<h1>${convertTemp} <i class="wi wi-fahrenheit"></h1>`
    } else {
        let returnTemp = Math.round((currentTemp - 32 ) * 5 / 9);
        document.getElementById('temperature').innerHTML = `<h1>${returnTemp} <i class="wi wi-celsius"></h1>`
    }
}


