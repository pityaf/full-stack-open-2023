import React, { useState, useEffect } from 'react'
import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/'
const contryEndPoint = 'api/name/'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`${baseURL}/${contryEndPoint}/${name}`)
      .then(response => {
        console.log('response', response)
        console.log('response.data', response.data)
        setCountry(response)
      })
      .catch(e => console.log('error', e))
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <h2>Country</h2>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App