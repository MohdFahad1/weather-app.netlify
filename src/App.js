import "./App.css";
import React, { useState } from "react";
import axios from "axios";
export default function App() {

  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let monthName = "";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  if (month === 1) {
    monthName = months[0];
  } else if (month === 2) {
    monthName = months[1];
  } else if (month === 3) {
    monthName = months[2];
  } else if (month === 4) {
    monthName = months[3];
  } else if (month === 5) {
    monthName = months[4];
  } else if (month === 6) {
    monthName = months[5];
  } else if (month === 7) {
    monthName = months[6];
  } else if (month === 8) {
    monthName = months[7];
  } else if (month === 9) {
    monthName = months[8];
  } else if (month === 10) {
    monthName = months[9];
  } else if (month === 11) {
    monthName = months[10];
  } else {
    monthName = months[11];
  }

  let A = new Date();
  let weekdays = new Array(7);
  weekdays[0] = "Sunday";
  weekdays[1] = "Monday";
  weekdays[2] = "Tuesday";
  weekdays[3] = "Wednesday";
  weekdays[4] = "Thursday";
  weekdays[5] = "Friday";
  weekdays[6] = "Saturday";
  let dayName = weekdays[A.getDay()];

  let apiKey = "cd4f4ca3efe0c184a89068f96d9a9359";

  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});


  const getWeatherData = (cityName) => {
    if (!cityName) {
      alert("Please Enter a City.");
      window.location.reload();
    }
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    axios.get(API).then((res) => {
      setData(res.data);
    }).catch((error) => {
      if(inputCity !== data.name)
    {
      alert("Invalid Input");
      window.location.reload();
    }
    }
    );
  };

  const handleChangeInput = (event) => {
    setInputCity(event.target.value);
  };
  const handleSearch = () => {
    getWeatherData(inputCity);
  };

  return (
    <>
      <div className="morning">
        <div className="App">
          <div className="content">
            <div>
              <h1>Weather App</h1>
              <input
                type="text"
                placeholder="Seacrh for a city"
                className="search"
                onChange={handleChangeInput}
              />
              <br />
              <button className="btn" onClick={handleSearch}>
                Search
              </button>
            </div>
            <div className="weather">
                {
                typeof data.main === "undefined" ? (
                  <div>
                    <h1>Welcome</h1>
                    <h3>Search for a city to get started</h3>
                  </div>
                ) : (
                  <div>
                    <div className="date">
                      {dayName}, {monthName} {date} {year}
                    </div>
                    <div className="location">
                      {data.name},
                      {data.sys ? (
                        <div className="location">{data.sys.country}</div>
                      ) : null}
                    </div>
                    <div className="weather-icon">
                      {data.weather ? (
                        <img
                          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                          alt=""
                        />
                      ) : null}
                    </div>
                    <div className="temp">
                      {data.main ? (
                        <div className="temp">
                          {(data.main.temp - 273.5).toFixed(2)} °C
                        </div>
                      ) : null}
                    </div>
                    <div className="weather-type">
                      {data.weather ? (
                        <div className="weather-type">
                          {data.weather[0].description}
                        </div>
                      ) : null}
                    </div>
                    <div className="others">
                      <div>
                        <h5>Feels like</h5>
                          {data.main ? (
                            <p>{(data.main.feels_like - 273.5).toFixed(2)} °C</p>
                          ) : null}
                      </div>
                      <div>
                        <h5>Max | Min</h5>
                          {data.main ? (
                            <p>
                              {(data.main.temp_max - 273.5).toFixed(2)} °C |{" "}
                              {(data.main.temp_min - 273.5).toFixed(2)} °C
                            </p>
                          ) : null}
                      </div>
                      <div>
                        <h5>Wind Speed</h5>
                        {data.wind ? <p>{data.wind.speed} km/h</p> : null}
                      </div>
                    </div>
                  </div>
                )
              }
              <div className="footer">A project by Mohd Fahad</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
