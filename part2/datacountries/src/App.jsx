import { useEffect, useState } from 'react'
import countryServices from './services/country'

import Countries from './Components/Countries';
import Country from './Components/Country';
import Search from './Components/Search';

function App() {
  const [country, setCountry] = useState({})
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);

  useEffect(() => {
    countryServices
      .getAllCountry()
      .then(response => {
        setCountries(response);
      })
  }, []);

  const handleFilter = (event) => {
    const filters = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilterCountries(filters);

    if(filters.length === 1) {
      countryServices
      .getCountry(filters[0].name.common.toLowerCase())
      .then(response => {
        setCountry(response);
      })
    }
  }

  const handleShow = (name) => {
      countryServices
      .getCountry(name.toLowerCase())
      .then(response => {
        setCountry(response);
      })
  }

  return (
    <div>
      <h1>Countries</h1>
      <div>
        <Search handleFilter={ handleFilter }/>
        <ul>
          {
            filterCountries.length < 10 
              ? filterCountries.map(country => <Countries key={ country.fifa } country={ country } handleShow={ () => handleShow(country.name.common) }/>)
              : <p>Too many matches, specify another filter</p>
          }
        </ul>
      </div>
      <div>
        <h2>Country information</h2>
        <Country country={ country } />
      </div>
    </div>
  )
}

export default App
