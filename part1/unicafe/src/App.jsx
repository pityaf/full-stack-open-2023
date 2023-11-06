import { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return(
    <button onClick={ handleClick }>{ text }</button>
  )
};

const StatisticsLine = (props) => {
    const { text, data } = props;
    return (
      <tr>
        <td>{ text }</td>
        <td>{ data }</td>
      </tr>
    )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props

  const sum = good + neutral + bad;
  const avg = (good * 1 + neutral * 0 + bad * -1) / sum;
  const positive = good / sum * 100;

  console.log(positive);

  if(sum === 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  /**good neutral bad sum avg positive */

  return(
    <table>
      <tbody>
        <StatisticsLine text='Good' data={ good }/>
        <StatisticsLine text='Neutral' data={ neutral }/>
        <StatisticsLine text='Bad' data={ bad }/>
        <StatisticsLine text='Sum' data={ sum }/>
        <StatisticsLine text='Average' data={ avg.toFixed(2) }/>
        <StatisticsLine text='Positive' data={ positive.toFixed(2) }/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };


  return (
    <div>
      <h1>Unicafe</h1>
      <hr />
      <h2>Give feedback</h2>
      <Button handleClick={ handleGoodClick } text='good' />
      <Button handleClick={ handleNeutralClick } text='neutral' />
      <Button handleClick={ handleBadClick } text='bad' />
      <h2>Statistics</h2>
      <Statistics good={ good } neutral={ neutral } bad={ bad } />
    </div>
  )
}; 

export default App;