import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Forecast from '../components/ForeCast';
import Moon from '../components/Moon';
import '../App.css';

const AUTH_TOKEN = 'e7797bb33b6b22447c3ca00ef93472f2';

export default function Details() {
  const { city } = useParams();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${AUTH_TOKEN}&units=metric&lang=it`
        );

        if (!res.ok) {
          navigate('/not-found', { replace: true });
          return;
        }

        const data = await res.json();

        setWeather({
          city: data.name,
          condition: data.weather[0].description,
          temp: Math.round(data.main.temp),
          humidity: data.main.humidity,
          wind: Math.round(data.wind.speed),
          feels_like: data.main.feels_like,
          lat: data.coord.lat,
          lon: data.coord.lon, 
        });

        setLoading(false);
      } catch (error) {
        navigate('/not-found', { replace: true });
        console.error("Errore nel fetch:", error);
      }
    }

    fetchWeather();
  }, [city, navigate]);

  if (loading) {
    return (
      <main className="d-flex justify-content-center align-items-center bg-dark text-white" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-light" role="status"></div>
      </main>
    );
  }

  // Mappa delle icone meteo
  const weatherIcons = {
    "cielo sereno": "☀️",
    "poche nuvole": "🌤️",
    "nubi sparse": "⛅",
    "nubi": "☁️",
    "cielo coperto": "☁️",
    "pioggia leggera": "🌦️",
    "pioggia moderata": "🌧️",
    "pioggia intensa": "🌧️",
    "temporale": "⛈️",
    "neve": "❄️",
    "nevischio": "🌨️",
    "foschia": "🌫️",
    "nebbia": "🌫️",
    "vento forte": "💨",
    "tormenta": "🌪️",
    "tornado": "🌪️",
  };

  // Classi per lo sfondo in base al tempo
  const weatherClassMap = {
    "cielo sereno": "weather-clear",
    "poche nuvole": "weather-few-clouds",
    "nubi sparse": "weather-scattered-clouds",
    "nubi": "weather-clouds",
    "cielo coperto": "weather-overcast",
    "pioggia leggera": "weather-light-rain",
    "pioggia moderata": "weather-moderate-rain",
    "pioggia intensa": "weather-heavy-rain",
    "temporale": "weather-thunderstorm",
    "neve": "weather-snow",
    "nevischio": "weather-snow",
    "foschia": "weather-mist",
    "nebbia": "weather-fog",
    "vento forte": "weather-strong-wind",
    "tormenta": "weather-storm",
    "tornado": "weather-tornado",
  };

  const weatherClass = weatherClassMap[weather.condition] || "weather-default";
  const dateTimeString = new Date().toLocaleString('it-IT', {
    weekday: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const feelsLike = weather.feels_like ?? weather.temp;

  return (
    <div className={`text-white ${weatherClass}`} style={{ transition: 'background-color 0.5s', paddingTop: '60px' }}>
      
      {/* Header fisso con nome città */}
      <header className={`fixed-header ${weatherClass}`}>
        {weather.city}
      </header>

      <main className="container py-4" style={{ minHeight: '90vh', paddingTop: '70px' }}>
        {/* Dettagli meteo */}
        <div className="row align-items-center px-4">
          {/* Colonna sinistra */}
          <div className="col-6 text-start">
            <h2 className="display-1 mb-1 fw-bold" style={{ fontSize: '4rem' }}>{weather.temp}°</h2>
            <p className="lead text-capitalize mb-1">{weather.condition}</p>
            <p className="mb-1">Temperatura percepita: {Math.round(feelsLike)}°C</p>
            <p className="text-white">{dateTimeString}</p>
          </div>

          {/* Colonna destra */}
          <div className="col-6 d-flex justify-content-center align-items-center">
            <div style={{ fontSize: '6rem', lineHeight: 1, userSelect: 'none' }}>
              {weatherIcons[weather.condition] || "❓"}
            </div>
          </div>
        </div>

        {/* Previsioni */}
        <div className="mt-4">
          <Forecast city={weather.city} />
        </div>

        {/* Luna */}
        <div className="mt-4">
          <Moon lat={weather.lat} lon={weather.lon} />
        </div>
      </main>

      <Footer weatherClass={weatherClass} />
    </div>
  );
}