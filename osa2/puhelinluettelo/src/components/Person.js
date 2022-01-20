import React from "react";

const Person = ({person}) => {
return (
    <li>
        {person.name} <b>{person.number}</b>
    </li>
 )
}
export default Person;