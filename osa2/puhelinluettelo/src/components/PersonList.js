import React from "react";
import Person from "./Person";
import numberService from '../services/numbers'

const PersonList = ({shownPeople, persons, setShownPeople, setPersons, setErrorMessage, setErrorColor}) => {

    return (
        <>
            {shownPeople.map(person => 
                <div key = {person.name}>
                <Person person={person}></Person>
                <button 
                onClick={
                    () => { 
                        if (window.confirm(`Delete ${person.name}?`)) {
                            numberService.remove(person.id).catch(error => {
                                console.log(error)
                                setErrorColor('red')
                                setErrorMessage(
                                    `Person '${person.name}' was already removed from the phonebook`
                                  )
                                  setTimeout(() => {
                                    setErrorMessage(null)
                                  }, 5000)
                            })
                            setPersons(persons.filter(p => p !== person))
                            setShownPeople(shownPeople.filter(p => p !== person)) 
                            setErrorColor('green')
                            setErrorMessage(
                                `Person '${person.name}' was removed from the phonebook`
                              )
                              setTimeout(() => {
                                setErrorMessage(null)
                              }, 5000)
                        }
                    }
                }>
                delete
            </button>
            </div>
            )}
        </>
    )}

export default PersonList;