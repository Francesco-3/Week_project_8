import { useEffect, useState } from 'react';

const AUTH_TOKEN = 'e7797bb33b6b22447c3ca00ef93472f2';

function phaseName(phase) {
  if (phase === 0 || phase === 1) return 'Luna nuova';
  if (phase === 0.25) return 'Primo quarto';
  if (phase === 0.5) return 'Luna piena';
  if (phase === 0.75) return 'Ultimo quarto';
  if (phase < 0.25) return 'Falce crescente';
  if (phase < 0.5) return 'Gibbosa crescente';
  if (phase < 0.75) return 'Gibbosa calante';
  return 'Falce calante';
}

export default function Moon({ lat, lon }) {
  const [moon, setMoon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMoonData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${AUTH_TOKEN}`
        );
        if (!res.ok) throw new Error('Errore nel recupero dati lunari');
        const data = await res.json();
        const today = data.daily?.[0];
        if (today) {
          setMoon({
            phase: phaseName(today.moon_phase),
            moonrise: new Date(today.moonrise * 1000),
            moonset: new Date(today.moonset * 1000),
          });
        } else {
          setError('Dati lunari non disponibili');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMoonData();

    const interval = setInterval(() => {
      fetchMoonData();
    }, 600000);

    return () => clearInterval(interval);
  }, [lat, lon]);

  if (loading) {
    return (
      <div className="text-white text-center py-3">
        <div className="spinner-border text-light" role="status"></div>
        <p>Caricamento dati lunari...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center py-3">{error}</p>;
  }

  return (
    <div className="container py-3">
      <div className="row bg-dark bg-opacity-50 text-white p-3 rounded shadow align-items-center">
        <div className="col-6 text-start">
          <div className="fs-3 fw-bold">{moon.phase}</div>
        </div>
        <div className="col-6 text-end">
          <div>Sorge: {moon.moonrise.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</div>
          <div>Tramonta: {moon.moonset.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      </div>
    </div>
  );
}