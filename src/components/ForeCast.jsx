import { useEffect, useState } from 'react';

const AUTH_TOKEN = 'e7797bb33b6b22447c3ca00ef93472f2';

const weatherIcons = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Snow: '❄️',
  Thunderstorm: '⛈️',
  Drizzle: '🌦️',
  Mist: '🌫️',
  Smoke: '🌫️',
  Haze: '🌫️',
  Dust: '🌫️',
  Fog: '🌫️',
  Sand: '🌫️',
  Ash: '🌫️',
  Squall: '🌬️',
  Tornado: '🌪️',
};

export default function Forecast({ city }) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForecast() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${AUTH_TOKEN}&units=metric&lang=it`
        );
        if (!res.ok) throw new Error('Errore nel fetch');
        const data = await res.json();

        // Ogni 8 elementi = ogni 24h
        const dailyForecast = data.list.filter((_, i) => i % 8 === 0).slice(0, 5);
        setForecast(dailyForecast);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchForecast();
  }, [city]);

  if (loading) return <p className="text-center text-white">Caricamento previsioni...</p>;

  return (
    <div className="container py-4">

      <div className="bg-dark bg-opacity-25 p-3 rounded shadow">
        <ul className="list-unstyled mb-0">
          {forecast.map((day, index) => {
            const date = new Date(day.dt * 1000);
            const dayName = index === 0
              ? 'Oggi'
              : date.toLocaleDateString('it-IT', { weekday: 'short' });
            const icon = weatherIcons[day.weather[0].main] || '❓';
            const temp = Math.round(day.main.temp);
            const humidity = day.main.humidity;

            return (
              <li key={day.dt} className="d-flex justify-content-between align-items-center py-2">
                <span className="fw-semibold">{dayName}</span>
                <span>💧{humidity}%</span>
                <span style={{ fontSize: '1.8rem' }}>{icon}</span>
                <span className="fw-semibold">{temp}°C</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}