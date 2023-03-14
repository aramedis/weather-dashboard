let key = "aa33fa3f24164a2572c3ce7f845e113a"
let cityArr = [];


//Search Btn to Local storage in the form of an Array (cityArr)
$(".search-button").on("click", function() {
    event.preventDefault();
    let city = $(".form-input").val();
    cityArr.push(city)

    console.log(city, "was saved")
    let cityBtn = $("<button>").addClass("col-1 cityBtn").text(city);
    $(".list-group").append(cityBtn);
    localStorage.setItem("cityArr", JSON.stringify(cityArr));

    //Direct Geocoding
    let geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`

    $.ajax({
        url: geocodingUrl,
        method: "GET",
      })
        .then(function (response) {
            // console.log(response[0].lat)
            let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${response[0].lat}&lon=${response[0].lon}&appid=${key}&units=metric`
            // console.log(weatherURL)
            weatherApi(weatherURL)
        })
});

//Get response for Full weather data
function weatherApi(weatherURL) {
    $.ajax({
        url: weatherURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)
    });
};

//Get history from Local storage and populate with buttons
function retrieveLocalStorage() {
    let cityArr = JSON.parse(localStorage.getItem("cityArr"));
    console.log(cityArr)
    cityArr.forEach(city => {
        let cityBtn = $("<button>").addClass("col-1 cityBtn").text(city);
        $(".list-group").append(cityBtn);
    });
}
retrieveLocalStorage()


//Direct geocoding
