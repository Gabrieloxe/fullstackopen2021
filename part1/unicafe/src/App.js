import React, {useState } from 'react';


const Display = ({ helpers, stats }) => {
  const {addGood, addBad, addNeutral} = helpers
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={addGood} text='Good' />
      <Button handleClick={addNeutral} text='Neutral' />
      <Button handleClick={addBad} text='Bad' />
      <Statistics stats={stats} />
    </div>
  );
};

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const Statistics = ({ stats }) => {
  const {good, neutral, bad} = stats
  const statistics = Object.values(stats)
  const total = (statistics).reduce(reducer)
  const average = total / statistics.length
  const positive = (good / total) * 100
  return (
    <div>
      <h1>Statistics</h1>
      <div>Good: {good} </div>
      <div>Neutral: {neutral} </div>
      <div>Bad: {bad} </div>
      <div>All: {total} </div>
      <div>Average: {average} </div>
      <div>Positive: {positive}% </div>
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  const stats = { good, neutral, bad };
  const helpers = { addBad, addGood, addNeutral};


  return (
    <div>
      <Display stats={stats} helpers={helpers} />
    </div>
  );
};

export default App;
