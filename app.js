
// Set location
function geoFind() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            //console.log(latitude, longitude);
            getWeather(latitude, longitude)
        });
    } else {
        function noLocation() {
            document.getElementById('temperature').innerHTML = `<h3>Trying to fetch weather...</h3>`;
            document.getElementById('location').innerHTML = `<p>Make sure location services are enabled</p>`;
        }
    }
}

// Get weather
function getWeather(myLat, myLon) {
    //Add longitude and latitude to url
    let weatherUrl = `https://fcc-weather-api.glitch.me/api/current?lat=${myLat}&lon=${myLon}`
    
    //Set local variables
    let local;
    let temp;
    let precipitation;
    let cloud;
    let wind;
    let icon;

    // Fetch weather
    fetch(weatherUrl)
        .then(resp => resp.json())
        .then(data => {
            local = data.name;
            temp = Math.floor(data.main.temp);
            humidity = data.main.humidity;
            cloud = data.clouds.all;
            wind = data.wind.speed;
            iconId = data.weather[0].id;
            console.log(data);
            console.log(iconId);

            // Add elements to DOM
            document.getElementById('location').innerHTML = `<h3>${local}</h3>`;
            document.getElementById('temperature').innerHTML = `<h1>${temp} <i class="wi wi-celsius"></h1>`;
            document.getElementById('humidity').innerHTML = `<h3><i class="wi wi-humidity"></i> ${humidity}%</h3>`;
            document.getElementById('cloud').innerHTML = `<h3><i class="wi wi-cloudy"></i> ${cloud}%</h3>`;
            document.getElementById('wind').innerHTML = `<h3><i class="wi wi-strong-wind"></i> ${wind} mph</h3>`;

            paintIcon(iconId);

        });

}

// Display the date
function getDate() {
    let date = new Date();
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let today = weekday[date.getDay()];
    document.getElementById('date').innerHTML = `<h1>${today}</h1>`;
}


// Add event listener to toggle 
document.getElementById('temperature').addEventListener('click', toggleTemp);


// Set initial toggle state
let stateVal = 0;


// Toggle celsius and fahrenheit
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

//Add icon to DOM
function paintIcon(iconId) {
    if (iconId > 0 && iconId <= 299) {
        document.getElementById('icon').innerHTML = `<i id="icon" class="wi wi-thunderstorm"></i>`;
    } else if (iconId >= 300 && iconId <= 399) {
        document.getElementById('icon').innerHTML = `<i id="icon" class="wi wi-rain-mix"></i>`;
    } else if (iconId >= 400 && iconId <= 599) {
        document.getElementById('icon').innerHTML = `<i id="icon" class="wi wi-rain"></i>`;
    } else if (iconId >= 600 && iconId <= 699) {
        document.getElementById('icon').innerHTML = `<i id="icon" class="wi wi-snow"></i>`;
    } else if (iconId >= 700 && iconId <= 799) {
        document.getElementById('icon').innerHTML = `<i id="icon" class="wi wi-fog"></i>`;
    } else if (iconId = 800) {
        document.getElementById('icon').innerHTML = `<i id="icon" class="wi wi-day-sunny"></i>`;
    } else if (iconId >= 801 && iconId <= 804) {
        document.getElementById('icon').innerHTML = `<i id="icon" class="wi wi-cloudy"></i>`;
    } else {
        document.getElementById('icon').innerHTML = `<i id="icon" class="wi wi-day-sprinkle"></i>`;
    }
}

// Call functions
geoFind();
getDate();