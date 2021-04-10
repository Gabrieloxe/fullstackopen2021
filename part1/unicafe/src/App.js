import React, { useState } from 'react';

const Display = ({ helpers, stats }) => {
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={helpers.addGood} text='Good' />
      <Button handleClick={helpers.addNeutral} text='Neutral' />
      <Button handleClick={helpers.addBad} text='Bad' />
      <Statistics stats={stats} />
    </div>
  );
};

const Statistics = ({ stats }) => {
  return (
    <div>
      <h1>Statistics</h1>
      <div>Good: {stats.good} </div>
      <div>Neutral: {stats.neutral} </div>
      <div>Bad: {stats.bad} </div>
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
  console.log(stats);

  return (
    <div>
      <Display stats={stats} helpers={helpers} />
    </div>
  );
};

export default App;
