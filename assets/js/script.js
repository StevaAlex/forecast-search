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
                        console.log(response);
                        //select section for todays weather 
                        var todaySection = $("#today");
                        //create header for today section
                        var todaysHeader = $("<h5>");
                        var currentDate = moment(response.list[0].dt_txt).format("D/M/YYYY"); //puts the current date in the format of D/M/YYYY
                        var weatherIcon = response.list[0, 7, 0].weather[0].icon; //variable that selects icon from API is within an array matrix
                        var weatherURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";//link for weather icon from open weather API
                        //assign text to header 
                        todaysHeader.html(response.city.name + " " + "(" + currentDate +")");
                        //append to today section
                        todaySection.prepend(todaysHeader);
                        //create img tag
                        var imgTag = $("<img>");
                        //assign source
                        imgTag.attr("src", weatherURL);
                        //append to today section
                        todaysHeader.append(imgTag);//append to header so the icon appears directly after the text
                        // $("#card1"), $("#icon1").empty();
                        // console.log("city data using long and lat " + response); 
                        // console.log(response); 
                        // console.log("response" + response)
                        //
                        // $("#card1").append(response.city.name +" " + currentDate);
                        // console.log("icon" + weatherIcon);
                        // $("#icon1").attr("src", weatherIcon);
                    })
            })
    })
})