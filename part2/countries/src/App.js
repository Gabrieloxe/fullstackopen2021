import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const CountryFilter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Find Countries:{' '}
      <input defaultValue={filter} onChange={handleFilterChange} />
    </div>
  );
};

const Country = ({ country }) => {
  const countryLanguages = country.languages.map((language) => {
    return <Language language={language} key={language.name} />;
  });
  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h3>Languages</h3>
      <ul>{countryLanguages}</ul>
      <img src={country.flag} alt='Country Flag' height='150' width='150'></img>
    </div>
  );
};

const Language = ({ language }) => {
  return <li>{language.name}</li>;
};

const CountryName = ({ country, show }) => {
  return (
    <div>
      {country.name}
      <button value={country.numericCode} onClick={show}>
        {' '}
        show{' '}
      </button>
    </div>
  );
};

const Display = ({ countries, handleShowChange }) => {
  if (countries.length > 10) {
    return <div>Too many matches specifiy another filter</div>;
  } else if (countries.length === 1) {
    const country = countries[0];
    return <Country country={country} key={country.numericCode} />;
  } else {
    return countries.map((country) => {
      return <CountryName country={country} key={country.numericCode} show={handleShowChange}/>;
    });
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [showVal, setShowVal] = useState(0);

  const hook = () => {
    console.log('effect');

    const eventHandler = (response) => {
      console.log('promise fulfilled');
      setCountries(response.data);
    };

    axios.get('https://restcountries.eu/rest/v2/all').then(eventHandler);
  };

  useEffect(hook, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleShowChange = (event) => {
    setShowVal(event.target.value);
    setShowAll(!showAll);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  const countriesToDisplay = showAll
    ? filteredCountries
    : filteredCountries.filter((country) => country.numericCode === showVal);

  return (
    <div>
      <CountryFilter filter={filter} handleFilterChange={handleFilterChange} />
      <Display
        countries={countriesToDisplay}
        handleShowChange={handleShowChange}
        show={showAll}
      />
    </div>
  );
};

export default App;
