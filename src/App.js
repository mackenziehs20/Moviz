import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'ba78fec1';
const API_URL = 'http://www.omdbapi.com/';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${searchTerm}`);
      setMovies(response.data.Search || []);
      setError(null);
    } catch (err) {
      setMovies([]);
      setError('Error fetching data. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Movidex</h1>
      <div>
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p>{error}</p>}
      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
