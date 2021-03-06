import React from 'react'

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }

  const Header = (props) => {
    console.log(props)
    return (
      <h1>{props.course.name}</h1>
    )
  }

  const Content = (props) => {
    return (
      <>
        <Part 
          part = {props.parts[0]}>
        </Part>
        <Part 
          part = {props.parts[1]}>
        </Part>
        <Part 
          part = {props.parts[2]}>
        </Part>
        </>
    )
  }

  const Total = (props) => {
    return (
      <>
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises }</p>
      </>
    )
  }

  return (
    <div>
      <Header course = {course}></Header>
      <Content parts = {course.parts}></Content>
      <Total parts = {course.parts}>
      </Total>
    </div>
  )
}

export default App