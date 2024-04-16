import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Weather = () => {
  const { cityName } = useParams();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=25e1c33a5b8ea448af65d9d919c6cc57`);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [cityName]);

  useEffect(() => {
    if (weather) {
      const map = L.map('map').setView([weather.coord.lat, weather.coord.lon], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker([weather.coord.lat, weather.coord.lon]).addTo(map)
        .bindPopup(cityName)
        .openPopup();
    }
  }, [weather, cityName]);

const getBackgroundImage = (weather) => {
  if (!weather || !weather.weather || !weather.weather[0]) return '';
  const weatherCondition = weather.weather[0].main.toLowerCase();
  switch (weatherCondition) {
    case 'clear':
      return 'url(https://media.istockphoto.com/id/491701259/photo/blue-sky-with-sun.webp?b=1&s=170667a&w=0&k=20&c=nK2gvvR4yRgY9lDciPUDyv2aeYf_MzPCItm2H_qU5xo=)';
    case 'clouds':
      return 'url(https://t4.ftcdn.net/jpg/05/76/71/09/360_F_576710966_O38QFCqtl23ADMCXNbiskTqmNTR4VK0Q.jpg)';
    case 'rain':
      return 'url(https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs=)';
    default:
      return 'https://e0.pxfuel.com/wallpapers/176/804/desktop-wallpaper-weather-beautiful-weather.jpg';
  }
};
    const getTextColor = () => {
    return '#000'; 
  };
  const backgroundImage = getBackgroundImage(weather);
  const textColor = getTextColor();
return (
  <div className="weather-wrapper" style={{ backgroundImage: backgroundImage, backgroundSize: 'cover', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <div className="weather-details" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '10px', textAlign: 'center', maxWidth: '600px'}}>
      <h2>{weather ? `${weather.name} Weather` : 'Loading...'}</h2>
      {weather && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Feels Like: {weather.main.feels_like} °C</p>
          <p>Description: {weather.weather[0].description}</p>
          {}
        </div>
      )}
    </div>
    <div id="map" style={{ width: '400px', height: '200px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', position: 'fixed', bottom: '20px', right: '20px' }}>
</div>
  </div>
);
};
export default Weather;

