import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function City() {
  const [searchCity, setSearchCity] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=10000');
        const data = await response.json();
        setSearchResults(data.records);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCitySearch = () => {
    console.log('Search button clicked');
    const results = searchResults.filter(item =>
      item.fields.name.toLowerCase().includes(searchCity.toLowerCase())
    );
    setSearchResults(results);
  };
  
  const navigateToWeather = (cityName) => {
    navigate(`/weather/${cityName}`);
  };

  const handleContextMenu = (event, cityName) => {
    event.preventDefault();
    navigateToWeather(cityName);
  };

  return (
    <div>
      <h1 className="dashboard-title">⛅ Weather Forecast</h1>
      <div className="search-container">
        <input 
          type="text" 
          className="search-input"
          placeholder="Enter city name..." 
          value={searchCity} 
          onChange={(e) => setSearchCity(e.target.value)}
        />
        <button className="search-btn" onClick={handleCitySearch}>Search by City</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>geoname_id</th>
              <th>name</th>
              <th>ascii_name</th>
              <th>Country</th>
              <th>Timezone</th>
            </tr>
          </thead>
         
<tbody>
  {searchResults && searchResults.length > 0 ? (
    searchResults
      .sort((a, b) => a.fields.name.localeCompare(b.fields.name)) // Sort by name
      .map((item, index) => (
        <tr key={index}>
          <td>{item.fields.geoname_id}</td>
          <td 
            onContextMenu={(e) => handleContextMenu(e, item.fields.name)}
            style={{ cursor: 'pointer' }}
          >
            <a href={`/weather/${item.fields.name}`} target="_blank" rel="noopener noreferrer">
              {item.fields.name}
            </a>
          </td>
          <td>{item.fields.ascii_name}</td>
          <td>{item.fields.country_code}</td>
          <td>{item.fields.timezone}</td>
        </tr>
      ))
  ) : (
    <tr>
      <td colSpan="5">No data available</td>
    </tr>
  )}
</tbody>

        </table>
      )}
    </div>
  );
}

export default City;
