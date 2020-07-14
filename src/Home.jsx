import React, { useState, useEffect } from "react";
import Search from "./views/Search";
import Time from "./components/Time";
import CurrentDate from "./components/CurrentDate";
import WeatherSvg from "./assets/svg/weather";
import axios from "axios";
import Weather from "./views/Weather";


const Home = () => {
  // My api key and the api base url
  let apiKey = process.env.REACT_APP_STACK_API_KEY;
  let baseURL = `http://api.weatherstack.com/current?access_key=${apiKey}&query=`;

  const [searchValue, setSearchValue] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);

  // A function that handles search input..
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // This function gets the longitude and latitude of the user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log("coordinates");
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let coordinates = [lat, long];
        // console.log(`Latitude: ${lat}, Longitude: ${long}`);
        getCurrentLocation(coordinates);
      },

      function (err) {
        console.log("coordinates");
        console.warn(`ERROR(${err.code}): ${err.message}`);
        console.log("The Locator was denied. :(");
      }
    );
  }, []);


  // This function uses axios to gets the weather of the user coordinates and set the setCurrentWeather state
  const getCurrentLocation = (coordinates) => {
    let lat = coordinates[0];
    let lon = coordinates[1];
    axios
      .get(baseURL + lat + "," + lon)
      .then(({ data }) => {
        let results = data;
        setCurrentWeather((prevState) => {
          return {
            ...prevState,
            results,
          };
        });
        setSearchValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // This function  get the current weather of the searched location
  const getWeather = (e) => {
    if (e.key === "Enter") {
      if (searchValue === "") {
        return;
      } else {
        axios
          .get(baseURL + searchValue)
          .then(({ data }) => {
            let results = data;
            setCurrentWeather((prevState) => {
              return {
                ...prevState,
                results,
              };
            });
            setSearchValue("");
          })
          .catch((err) => {
            //  window.alert("City can not be found!");
            console.warn(err);
          });
      }
    }
  };

  // this render the codes
  return (
    <div className="home">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-sm-12 background-svg">
            <div className="weather-svg">
              <div className="description">
                <h2>Weather Cheacker</h2>
                <p>
                  Check weather info of any location around the world, any time
                  and any day!
                </p>
              </div>
              <WeatherSvg />
            </div>
          </div>
          <div className="col-md-6 col-sm-12 background-weather">
            {/* This render the currnet time of the user base on location using dayjs package   */}
            <div className="time">
              <Time />
            </div>
            {/* This handles search and gets results from the api request */}
            <Search
              searchValue={searchValue}
              handleSearch={handleSearch}
              getWeather={getWeather}
            />
            {/* This render the currnet data of the user base on location */}
            <div className="date">
              <CurrentDate />
            </div>
            {typeof currentWeather?.results?.current != "undefined" ? (
              // This gets the weather state and pass it to the Weather component
              <div>
                <Weather currentWeather={currentWeather} />
              </div>
            ) : (
                ""
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
