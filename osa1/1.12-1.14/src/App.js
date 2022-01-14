import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length - 1))
  const [anecdoteWithMostVotes, setAnecdoteWithMostVotes] = useState(anecdotes[0])
  const [mostVotes, setMostVotes] = useState(0)

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length-1)))
  }
  const handleVote = () => {
    const copy = [...votes]
    copy[selected] +=1
    setVotes(copy)
    const numberOfMostVotes = Math.max(...copy)
    const idxOfMostVotes = copy.indexOf(numberOfMostVotes)
    setAnecdoteWithMostVotes(anecdotes[idxOfMostVotes])
    setMostVotes(numberOfMostVotes)
  }

  return (
    <div>
      <h1> Anecdote of the Day </h1>
      {anecdotes[selected]}
      <br></br>
      <b>has {votes[selected]} votes</b>
      <br></br>
      <Button text = "vote" handleClick = {handleVote}></Button>
      <Button text = "next anecdote" handleClick={handleNext}></Button>
      <h1> Anecdote With Most Votes </h1>
      {anecdoteWithMostVotes}
      <br></br>
      <b>has {mostVotes} votes</b>
    </div>
  )
}

export default App
