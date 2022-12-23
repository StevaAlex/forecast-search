$(document).ready(function () {
    $("#search-button").on("click", function (event) {
        var cityInput = ($("#search-input").val()).trim();//use .val to get value back from the input
        //feed this input into a geocode api to get the long and lat co-ordinates
        var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1" + "&appid=96300bc0e7b9446d24a0aa1ec635d8ba";
        // var queryURL = "api.openweathermap.org/data/2.5/forecast?lat=" +lat + "&lon=" lon + "&appid=" + "ENTER API KEY" 
        var longitude;//create empty variables for long and lat
        var latitude;
        var cityData;
        event.preventDefault();//prevents the form from clearing after you enter your city, so that you can use the response
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET" //get call method
        })
            .then(function (response) {
                console.log(response);
                cityData = response[0];//the response comes back as an array, so this selects the first array item, which is an object
                longitude = cityData.lon; //use the response to get back long and lat co-ordinates
                latitude = cityData.lat;
//add this second api within the then function so the long and lat co-ordinates can be fed into the weather api
                queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=96300bc0e7b9446d24a0aa1ec635d8ba";
                $.ajax({
                    url: queryURL, 
                    method: "GET"
                })
                    .then(function (response) {
                        console.log("city data using long and lat " + response); 
                        console.log(response);
                    })
            })
    })
})