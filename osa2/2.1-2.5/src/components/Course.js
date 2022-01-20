import React from "react"

const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  const Header = ({course}) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <>
        {parts.map(part =>
            <Part key = {part.id} part = {part}>
            </Part>
          )}
        </>
    )
  }
  
  const Total = ({parts}) => {
    return (
      <>
        <p>Number of exercises {parts.map(part => (part.exercises)).reduce((p, c) => p + c) }</p>
      </>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
      <Header course = {course}></Header>
      <Content parts = {course.parts}></Content>
      <Total parts = {course.parts}>
      </Total>
    </>
    )
  }

export default Course