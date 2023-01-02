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


                        //select section for todays weather 
                        var todaySection = $("#today");
                        todaySection.empty(); //clears the section everytime the button is clicked
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
                        //select forcast id 
                        var forecast = $("#forecast");
                        forecast.empty();//clears forecast section everytime button is clicked
                        //create header 4 maybe to append "5 day forecast: " 
                        var forecastHeader = $("<h6>");
                        forecastHeader.html("5-day Forecast: ");
                        forecast.prepend(forecastHeader);
                        //create 5 divs for 5 days of forecast
                        //create div variable
                        var day1 = $("<div>");
                        var day2 = $("<div>");
                        var day3 = $("<div>");
                        var day4 = $("<div>");
                        var day5 = $("<div>");
                        //add day 1 text
                        console.log(response);
                        //select next 5 days' dates
                        var day1Date = moment(response.list[1].dt_txt).format("D/M/YYYY");
                        var day2Date = moment(response.list[2].dt_txt).format("D/M/YYYY");
                        var day3Date = moment(response.list[3].dt_txt).format("D/M/YYYY");
                        var day4Date = moment(response.list[4].dt_txt).format("D/M/YYYY");
                        var day5Date = moment(response.list[5].dt_txt).format("D/M/YYYY");
                        // var lineBreak = $("<br>");
                        //append divs to forcast section
                        forecast.append(day1);
                        // forecast.append(lineBreak);
                        forecast.append(day2);
                        forecast.append(day3);
                        forecast.append(day4);
                        forecast.append(day5);

                        //create headers to append to those divs
                        var day1Head = $("<h7>");
                        var day2Head = $("<h7>");
                        var day3Head = $("<h7>");
                        var day4Head = $("<h7>");
                        var day5Head = $("<h7>");
                        //assign header value of the above dates
                        day1Head.html(day1Date);
                        day2Head.html(day2Date);
                        day3Head.html(day3Date);
                        day4Head.html(day4Date);
                        day5Head.html(day5Date);
                        //now append these headers to the right divs 
                        day1.prepend(day1Head);
                        day2.append(day2Head);
                        day3.append(day3Head);
                        day4.append(day4Head);
                        day5.append(day5Head);
                        //create li 1 content which is the icon/image tag
                        //create weather icon/image tag
                        var iconDay1 = $("<img>");
                        var weatherIconDay1 = response.list[1].weather[0].icon; //variable that selects icon from API
                        var weatherURLDay1 = "http://openweathermap.org/img/wn/" + weatherIconDay1 + "@2x.png";
                        iconDay1.attr("src", weatherURLDay1);
                        //append image to div 1
                        day1.append(iconDay1);
                        //create ul for each divs 
                        var ulDay1 = $("<ul>");
                        var ulDay3 = $("<ul>");
                        //append each ul to its correct div
                        day1.append(ulDay1);
                        day3.append(ulDay3);
                        //each ul needs 3 li 
                        var day1Li1 = $("<li>");
                        var day1Li2 = $("<li>");
                        var day1Li3 = $("<li>");
                        //add temp to li 1
                        var tempDay1 = ("Temp: " + ((response.list[1].main.temp) - 273.15).toFixed() + "°C");  //gives temp in celsius, and tofixed returns a whole num
                        day1Li1.html(tempDay1);
                        //append day 1 li 1 to ul
                        ulDay1.append(day1Li1);
                        //assign wind speed to day 1 li 2
                        var windDay1 = ((response.list[1].wind.speed) * 3.6).toFixed();//currently in mps, needs to be in kph by multiplying by 3.6 
                        day1Li2.html("Wind: " + windDay1 + "KPH"); 
                        //append li 2 to ul 
                        ulDay1.append(day1Li2);
                        //assign humidity to day 1 li 3 
                        //get humidity from api
                        var humidityDay1 = response.list[1].main.humidity;
                        day1Li3.html("Humidity: " + humidityDay1 + "%");
                        //append to ul 
                        ulDay1.append(day1Li3); 

                        //copy and paste day 1 for the remainiung days, remember day 2, list[2], day 3 list[3], etc 

                        //DAY TWO FORECAST
                         //create weather icon/image tag
                         var iconDay2 = $("<img>");
                         var weatherIconDay2 = response.list[2].weather[0].icon; //variable that selects icon from API
                         var weatherURLDay2 = "http://openweathermap.org/img/wn/" + weatherIconDay2 + "@2x.png";
                         iconDay2.attr("src", weatherURLDay2);  
                         day2.append(iconDay2);

                         //append ul to day 2 div
                         var ulDay2 = $("<ul>");
                         day2.append(ulDay2);
                         //create 3 li 
                         var day2Li1 = $("<li>");
                         var day2Li2 = $("<li>");
                         var day2Li3 = $("<li>");
                         //add temp to li 1
                         var tempDay2 = ("Temp: " + ((response.list[2].main.temp) - 273.15).toFixed() + "°C");  //gives temp in celsius, and tofixed returns a whole num
                         day2Li1.html(tempDay2);
                         //append day 2 li 1 to ul
                         ulDay2.append(day2Li1);
                         //assign wind speed to day 2 li 2
                         var windDay2 = ((response.list[2].wind.speed) * 3.6).toFixed();//currently in mps, needs to be in kph by multiplying by 3.6 
                         day2Li2.html("Wind: " + windDay2 + "KPH"); 
                         //append li 2 to ul 
                         ulDay2.append(day2Li2);
                         //assign humidity to day 1 li 3 
                         //get humidity from api
                         var humidityDay2 = response.list[2].main.humidity;
                         day2Li3.html("Humidity: " + humidityDay2 + "%");
                         //append to ul 
                         ulDay2.append(day2Li3); 
                         

                    })
            })
    })
})