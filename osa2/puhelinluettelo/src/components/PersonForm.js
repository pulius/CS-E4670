import React from "react";
import NameField from "./NameField";
import NumberField from "./NumberField";

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return(
        <form onSubmit={addName}>
        <NameField newName={newName} handleNameChange={handleNameChange}/>
        <NumberField newNumber={newNumber} handleNumberChange={handleNumberChange}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm