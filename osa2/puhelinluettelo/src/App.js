import React, { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import numberService from './services/numbers'
import Notification from './components/Notification'

const App = () => {

  const hook = () => {
    console.log('effect')
      numberService.getAll()
      .then(response => {
        setPersons(response.data)
        setShownPeople(response.data)
      })
  }
  
  useEffect(hook, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [shownPeople, setShownPeople] = useState(persons)
  const [errorMessage, setErrorMessage] = useState('')
  const [ErrorColor, setErrorColor] = useState('green')

  const updateDB = newPerson => {
    if(persons.map(p => p.name).includes(newPerson.name)){
      const oldPerson = persons.find(p => p.name === newPerson.name)
      console.log('old',oldPerson)
      numberService.update(oldPerson.id, {...oldPerson, number: newPerson.number})
      numberService.getAll().then(response => {console.log('all', response.data)})
    } 
      else {
        numberService.create(newPerson)
      }
  }

  const addName = (event) => {
    if (persons.map(p => p.name).includes(newName)){
      if (window.confirm(`${newName} is already added to the phonebook. Do you wish to replace the number with a new one?`)){
        event.preventDefault()
        const nameObject = {
          name: newName,
          number: newNumber,
          id: persons.length+1
        }
        const oldPerson = persons.find(p => p.name === nameObject.name)
        oldPerson !== undefined? setPersons(persons.filter(p => p.name !== nameObject.name).concat(nameObject)):
        setPersons(persons.concat(nameObject))
        setShownPeople(shownPeople.filter(p => p.name !== nameObject.name).concat(nameObject))
        setNewName('')
        setNewNumber('')
        updateDB(nameObject)
        setErrorColor('green')
        setErrorMessage(
          `Person '${nameObject.name}' was updated`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } else { 
      event.preventDefault()
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length+1
      }
      const oldPerson = persons.find(p => p.name === nameObject.name)
      oldPerson !== undefined ? setPersons(persons.filter(p => p.name !== nameObject.name).concat(nameObject)) : setPersons(persons.concat(nameObject))
      setShownPeople(shownPeople.filter(p => p.name !== nameObject.name).concat(nameObject))
      setNewName('')
      setNewNumber('')
      updateDB(nameObject)
      setErrorColor('green')
      setErrorMessage(
        `Person '${nameObject.name}' was added to the phonebook`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

  const handleDelete = person => {
    numberService.remove(person.id)
    setPersons(persons.filter(p => p !== person))
    setShownPeople(shownPeople.filter(p => p !== person))
  }

  return (
    <div>
    <Notification message = {errorMessage} color = {ErrorColor}></Notification>
    <Phonebook
      filter = {filter} 
      handleFilter = {handleFilter}
      addName = {addName}
      newName = {newName} 
      handleNameChange = {handleNameChange} 
      newNumber = {newNumber} 
      handleNumberChange = {handleNumberChange}
      shownPeople = {shownPeople}
      handleDelete = {handleDelete}
      persons = {persons}
      setPersons = {setPersons}
      setShownPeople={setShownPeople}
      setErrorMessage={setErrorMessage}
      setErrorColor={setErrorColor}>
    </Phonebook>
    </div>
  )

}

export default App