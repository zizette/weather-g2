const API_KEY = "16d33432f4dbb14ae50868c0c49179f6";

const makeIconURL = (iconId) => `./${iconId}@.png`;

const getFormattedWeatherData = async (city, units = "metric") => {
  const URL = 'https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}';
  const res = [];
  // const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
  const makeIconURL = (iconId) =>
    `https://openweathermap.org/img/wn/${iconId}@2x.png`;
  const data = await fetch(URL)
    .then((res) => res.json)
    .then((data) => data)
    .then(console.log(res.json));

  const {
    weather,
    main: { feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    city: { name, country },
    dt_txt: { datet }
  } = data;

  const { description, icon } = weather[0];

  (data &&
    data.list.map((WeatherObj) => {
      return {
        description = WeatherObj.description,
        iconURL: makeIconURL(WeatherObj.icon),
        temp=WeatherObj.temp,
        feels_like=WeatherObj.feels_like,
        pressure= WeatherObj.pressure,
        humidity=WeatherObj.humidity,
        country= WeatherObj.country,
        name=WeatherObj.name,
        datet=WeatherObj.datet
      }
    });
    );
}

export { getFormattedWeatherData }
