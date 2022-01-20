import React from "react";

const NameField = ({newName, handleNameChange}) => {
    return(
        <div>
          name: <input value={newName}
          onChange={handleNameChange}
          />
        </div>
    )
}

export default NameField