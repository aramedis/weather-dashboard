let key = "aa33fa3f24164a2572c3ce7f845e113a"
let cityArr = [];
let currentTime = moment().format("DD/MM/YYYY");
let dayFiveArr = [7,15,23,31,39] //5 data points I need from the 5 day forecast response, each data point represents 3*8=24H Hrs


//Search Btn to Local storage in the form of an Array (cityArr)
$(".search-button").on("click", function() {
    event.preventDefault();
    $("#today").empty();
    $("#forecast").empty();
    let city = $(".weather-search").val();
    cityArr.push(city)

    // console.log(city, "was saved")
    let cityBtn = $("<button>").addClass("btn-secondary mt-1").text(city);
    $("#history").append(cityBtn);
    localStorage.setItem("cityArr", JSON.stringify(cityArr));

    //Direct Geocoding to get Lat and Lon
    let geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`

    $.ajax({
        url: geocodingUrl,
        method: "GET"
      })
        .then(function (response) {
            // console.log(response[0].lat)
            let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${response[0].lat}&lon=${response[0].lon}&appid=${key}&units=metric`
            let weather5dayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${response[0].lat}&lon=${response[0].lon}&appid=${key}&units=metric`;
            // console.log(weatherURL)
            weatherApiToday(weatherURL)
            weatherApi5day(weather5dayURL)
        })
});

//Get response for Full weather data using Lat and Lon data from previous API call
function weatherApiToday(weatherURL) {
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response)
        displayWeather(response);
    })
};

function displayWeather(response) {
    let city = response.name
    let time = currentTime
    let temp = $("<p>").text(`Temp: ${response.main.temp}°C`);
    let humidity = $("<p>").text(`Humidity: ${response.main.humidity}%`);
    let wind = $("<p>").text(`Wind: ${response.wind.speed}KPH`);
    let icon = $("<img>").attr("src", `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`).addClass("icon");
    let header = $("<H2>").text(city +" "+ time + " ").addClass("h2-heading font-weight-bold");
    
    header.append(icon)
    $("#today").append(header, temp, humidity, wind)
}

//Get response for 5 Day weather data using Lat and Lon data from previous API call
function weatherApi5day(weather5dayURL) {
    $.ajax({
        url: weather5dayURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        create5WeatherCard(response);
    })
};

function create5WeatherCard(response) {
    dayFiveArr.forEach(day => {
        let time = $("<H3>").text(response.list[day].dt_txt.slice(0,10)); //slice out the last few strings (time)
        let icon = $("<img>").attr("src", `https://openweathermap.org/img/wn/${response.list[day].weather[0].icon}@2x.png`).addClass("icon");
        let temp = $("<p>").text(`Temp: ${response.list[day].main.temp}°C`);
        let humidity = $("<p>").text(`Humidity: ${response.list[day].main.humidity}%`);
        let wind = $("<p>").text(`Wind: ${response.list[day].wind.speed}KPH`);
        // console.log(response.list[day].dt_txt.slice(0,10))

        let div = $("<div>");
        div.addClass("card text-white bg-dark m-1");
        div.append(time, icon, temp, humidity, wind);
        $("#forecast").append(div)
    });
}

//Get history from Local storage and populate with buttons
function retrieveLocalStorage() {
    let cityArr = JSON.parse(localStorage.getItem("cityArr"));
    console.log(cityArr)
    cityArr.forEach(city => {
        let cityBtn = $("<button>").addClass("btn-secondary mt-1").text(city);
        $("#history").append(cityBtn);
    });
}
retrieveLocalStorage();


//History button functionality - can be improved

let historybtn = $(".btn-secondary");
historybtn.on("click", function (event) {
    $("#today").empty();
    $("#forecast").empty();
    let historyCity = event.currentTarget.outerText;
    // console.log(historyCity)
    let geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${historyCity}&limit=1&appid=${key}`;

    $.ajax({
        url: geocodingUrl,
        method: "GET"
      })
        .then(function (response) {
            // console.log(response[0].lat)
            let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${response[0].lat}&lon=${response[0].lon}&appid=${key}&units=metric`
            let weather5dayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${response[0].lat}&lon=${response[0].lon}&appid=${key}&units=metric`;
            // console.log(weatherURL)
            weatherApiToday(weatherURL);
            weatherApi5day(weather5dayURL);
        })

})


