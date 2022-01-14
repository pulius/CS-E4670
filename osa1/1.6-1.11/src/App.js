import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return(
    <>
    <tr>
      <td><i>{text}</i></td> 
      <td><b>{value}</b> </td>
    </tr>
    </>
  )
}


const Statistics = ({good, neutral, bad, all, avg, positive}) => {
if (all === 0) {
  return (
    <>
      <h1>statistics</h1>
      <br></br>
      <i>No feedback Given</i>
    </>
  )
}

  return(
  <>
    <h1>statistics</h1>
    <table>
    <tbody>
      <StatisticLine text = "good" value = {good}/>
      <StatisticLine text = "neutral" value = {neutral}/>
      <StatisticLine text = "bad" value = {bad}/>
      <StatisticLine text = "all" value = {all}/>
      <StatisticLine text = "average" value = {avg}/>
      <StatisticLine text = "positive" value = {positive+'%'}/>
      </tbody>
      </table>
  </>)    
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleAll = () => {setAll(all + 1)}
  
  const handleGood = () => {
    setGood(good + 1)
    handleAll()
    setAvg((good + 1 - bad ) / (all + 1))
    setPositive((100 * (good + 1)) / (all + 1))
  }
  const handleNeutral = () => {
    handleAll()
    setNeutral(neutral + 1)
    setAvg((good - bad) / (all + 1))
    setPositive((100 * good) / (all + 1))
  }
  const handleBad = () => {
    handleAll()
    setBad(bad + 1)
    setAvg((good - bad - 1) / (all + 1))
    setPositive((100 * good) / (all + 1))
  }

  return (
    <div>
      <h1> give feedback </h1>
      <Button
        handleClick={handleGood}
        text = {'good'}> 
      </Button>
      <Button
        handleClick={handleNeutral}
        text = {'neutral'}> 
      </Button>
      <Button
        handleClick={handleBad}
        text = {'bad'}> 
      </Button>
      <Statistics
      good = {good}
      neutral = {neutral}
      bad = {bad}
      all = {all}
      avg = {avg}
      positive = {positive}>
      </Statistics>
    </div>
  )
}

export default App