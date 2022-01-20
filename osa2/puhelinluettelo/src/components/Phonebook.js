import React from "react";
import FilterField from "./FilterField";
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";

const Phonebook = ({filter, handleFilter, addName, newName, handleNameChange, newNumber, handleNumberChange, shownPeople, setShownPeople, setPersons, persons, setErrorMessage, setErrorColor}) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterField filter={filter} handleFilter={handleFilter}/>
      <h2>Add new person</h2>
      <PersonForm 
        addName = {addName}
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}>
      </PersonForm>
      <h2>Numbers</h2>
      <PersonList shownPeople={shownPeople} persons={persons} setShownPeople={setShownPeople} setPersons={setPersons} setErrorMessage= {setErrorMessage} setErrorColor={setErrorColor} />
    </div>
  )
}

export default Phonebook