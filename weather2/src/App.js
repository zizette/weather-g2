import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import niceBg from "./assets/xxckub95.png";
import Descriptions from "./components/Descriptions";
//import iconURL from "./public/icons";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city, setCity] = useState("Beirut");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      // dynamic bg
      const threshold0 = units === "metric" ? 5 : 17;
      if (data.temp <= threshold0) setBg(coldBg);
      else {
        const threshold = units === "metric" ? 26 : 60;
        if (data.temp <= threshold) setBg(niceBg);
        else setBg(hotBg);
      }

    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "F";
    button.innerText = isCelsius ? "°C" : "°F";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              // value=""
              />
              <button onClick={(e) => handleUnitsClick(e)}>°C</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>

              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"
                  }`}</h1>
              </div>
              <div>
                <h3> {`Pressure:
                ${weather.pressure} hPa`}</h3>

                <h3> {`Humidity:
                ${weather.humidity} %`}</h3>
              </div>
            </div>

            {/* bottom description */}
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
