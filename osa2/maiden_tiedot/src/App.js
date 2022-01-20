import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from './config.json'

const App = () => {

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
        //setShownPeople(response.data)
      })
  }
  
  useEffect(hook, [])

  const [city, setCity] = useState('Helsinki')
  const [weather, setWeather] = useState([])
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [shownCountries, setShownCountries] = useState(countries)
  const [showClicked, setShowClicked] = useState([])

  const weatherHook = () => {
    const params = {
      access_key: config.TOKEN,
      query: city
    }
    axios
      .get('http://api.weatherstack.com/current',  {params})
      .then(response => {
        setWeather(response.data)
        console.log(response.data)
        //setShownPeople(response.data)
      })
  }
  useEffect(weatherHook, [city])

  const Languages = ({country}) => {
    return (
        <>
            {Object.values(country.languages).map(language => 
                <div key = {language}> {language} </div>
            )}
        </>
    )}

  const Expanded = ({country}) => {
    return (
      <>
          <div key = {country.name.common}>
            <h4>capital {country.capital}</h4>
            <h4>population {country.population}</h4>
            <h2>languages</h2>
            <Languages country = {country}></Languages>
            <img src = {Object.values(country.flags)[0]} alt = 'flag'></img>
            {shownCountries.length === 1 ?
            <>
            <h2>Weather in {city}</h2>
            <b>temperature:</b> {weather.current.temperature} celsius
            <br></br>
            <img src = {weather.current.weather_icons[0]} alt='img'></img>
            <br></br>
            <b>wind:</b> {weather.current.wind_speed} {weather.current.wind_dir} </>: null}
          </div>
        
      </>
    )
  }

  const Country = ({countries}) => {

    if (countries.length === 1) {
      return (
        <Expanded country={countries[0]}></Expanded>
      )
    }

    else if (countries.length > 10) {
      return (
        <>
          too many countries
        </>
      )
    }

    else if (countries.length !== 0) {
      
      return (
        <>
           {countries.map(country => 
        <div key = {country.name.common}>
          <h2>{country.name.common}
            <button onClick={() => { 
              showClicked.includes(country)? 
                setShowClicked(showClicked.filter(c => c !== country))
              : setShowClicked(showClicked.concat(country))
              console.log(showClicked)
              setCity(country.capital[0])
            }}>show
            </button>
            </h2>
            {showClicked.includes(country)? <Expanded country={country}></Expanded> : null}
        </div>
    )}
        </>
    )}

    else return (
      <>search a country</>
    )
  }

  const handleFilter = (event) => {
    const filterValue = event.target.value
    setFilter(filterValue)
    setShownCountries(countries.filter(c => c.name.common.toLowerCase().includes(filterValue)))
    console.log(shownCountries)
  }

  const FilterField = ({filter, handleFilter}) => {
    return(
        <>
        filter shown with
        <input value = {filter}
          onChange={handleFilter}>
        </input>
      </>
    )
}

  /*const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [shownPeople, setShownPeople] = useState(persons)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    persons.map(p => p.name).includes(newName)? window.alert(`${newName} is already added to phonebook`):
    setPersons(persons.concat(nameObject))
    if (newName.toLowerCase().includes(filter)) setShownPeople(shownPeople.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    const filterValue = event.target.value
    setFilter(filterValue)
    setShownPeople(persons.filter(p => p.name.toLowerCase().includes(filterValue)))
  }
*/
  return (
<>
<h1> Countries </h1>
<FilterField filter = {filter} handleFilter={handleFilter}></FilterField>
<br></br>
  <Country countries = {shownCountries}></Country>
</>
  )

}

export default App