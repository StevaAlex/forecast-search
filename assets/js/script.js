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
                        todaySection.empty();
                        //create header for today section
                        var todaysHeader = $("<h5>");
                        var currentDate = moment(response.list[0].dt_txt).format("D/M/YYYY"); //puts the current date in the format of D/M/YYYY
                        var weatherIcon = response.list[0].weather[0].icon; //variable that selects icon from API
                        var weatherURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";//link for weather icon from open weather API
                        //assign text to header 
                        todaysHeader.html(response.city.name + " (" + currentDate + ")");
                        //append to today section
                        todaySection.prepend(todaysHeader);
                        //create img tag
                        var imgTag = $("<img>");
                        //assign source
                        imgTag.attr("src", weatherURL);
                        //append to today section
                        todaysHeader.append(imgTag);//append to header so the icon appears directly after the text
                        //create unordered list 
                        var unordedList = $("<ul>");
                        //append ul to today section
                        todaySection.append(unordedList);
                        //create li 
                        var li1 = $("<li>");
                        var li2 = $("<li>");
                        var li3 = $("<li>");
                        //assign li value 
                        //get temp from api
                        var temp1 = ((response.list[0].main.temp) - 273.15).toFixed() + "°C";  //gives temp in celsius, and tofixed returns a whole num
                        li1.html("Temp: " + temp1);
                        unordedList.prepend(li1);
                        //assign li2 value 
                        // get wind speed from API
                        var wind1 = ((response.list[0].wind.speed) * 3.6).toFixed();//currently in mps, needs to be in kph by multiplying by 3.6 
                        li2.html("Wind: " + wind1 + "KPH");
                        //append to ul 
                        unordedList.append(li2);
                        //assign li3 value
                        //get humidity from api
                        var humidity1 = response.list[0].main.humidity; 
                        li3.html("Humidity: " + humidity1 + "%");
                        //append to ul
                        unordedList.append(li3);
                        //add heading when button is clicked which has text value "5 day forecast: " 
                        // then when button is clicked, 5 ul with 5 day forecast

                    })
            })
    })
})