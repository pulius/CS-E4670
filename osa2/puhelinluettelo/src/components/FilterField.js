import React from "react";

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

export default FilterField