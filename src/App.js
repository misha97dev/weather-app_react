import React, { useState } from "react";
import axios from "axios";
import "./app.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const apiKey = "cd03838e540bb0a843923b2ee4a8d49b";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  const getData = (event) => {
    if (!location) return;
    if (event.key === "Enter" || event.type === "blur") {
      axios
        .get(`${apiUrl}${location}&units=metric&appid=${apiKey}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          alert(err.message);
          return;
        });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={getData}
            onBlur={getData}
          />
        </div>

        <div className="main-info">
          <p className="location">{data.name}</p>
          {data.main ? (
            <h2 className="temperature">{data.main.temp}°C</h2>
          ) : null}
          {data.weather ? <p className="sky">{data.weather[0].main}</p> : null}
        </div>
        <div className="additional-info">
          <div className="additional-info__item">
            {data.main ? <h3>{data.main.feels_like}°C</h3> : null}
            <p>Feels Like</p>
          </div>
          <div className="additional-info__item">
            {data.main ? <h3>{data.main.humidity}%</h3> : null}
            <p>Humidity</p>
          </div>
          <div className="additional-info__item">
            {data.wind ? <h3>{data.wind.speed}mph</h3> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
