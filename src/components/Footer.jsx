import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export default function Footer({ weatherClass }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setSearchOpen((open) => !open);
  };

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      navigate(`/details/${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark px-2 px-md-5 fixed-bottom ${weatherClass}`}>
      <div className="container-fluid justify-content-between">
        <Link to="/" className="text-white text-decoration-none">
          <i className="bi bi-house text-white fs-5"></i>
        </Link>

        <form
          className={`nav-element d-flex align-items-center searchBox ${searchOpen ? 'expanded' : ''}`}
          onSubmit={handleSubmit}
          role="search"
          aria-label="Cerca città"
        >
          <button
            type="button"
            className="searchTab btn p-0 border-0 bg-transparent"
            onClick={toggleSearch}
            aria-label="Toggle search"
          >
            <i className="bi bi-search text-white fs-5"></i>
          </button>

          {searchOpen && (
            <input
              ref={searchInputRef}
              type="text"
              className="form-control bg-transparent text-white border ms-2"
              placeholder="Inserisci città"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          )}
        </form>
      </div>
    </nav>
  );
}