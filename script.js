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
});

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
