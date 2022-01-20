import React from "react";

const NumberField = ({newNumber, handleNumberChange}) => {
    return(
        <div> 
            number: 
            <input value={newNumber}
                onChange={handleNumberChange}/>
        </div>
    )
}

export default NumberField