import React, { useState } from 'react';

const Display = ({ helpers, stats }) => {
  const { addGood, addBad, addNeutral } = helpers;
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

const Statistic = ({ value, text }) => {
  if (text === 'Positive') {
    return (
      <tr>
        <td>{text}:</td>
        <td>{value} %</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ stats }) => {
  const { good, neutral, bad } = stats;
  const statistics = Object.values(stats);
  const total = statistics.reduce(reducer);
  const average = total / statistics.length;
  const positive = parseFloat(((good / total) * 100.0).toFixed(1));

  // Don't display statistics on first render
  if (total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        No Feedback Given
      </div>
    );
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic value={good} text='Good' />
          <Statistic value={neutral} text='Neutral' />
          <Statistic value={bad} text='Bad' />
          <Statistic value={total} text='All' />
          <Statistic value={average} text='Average' />
          <Statistic value={positive} text='Positive' />
        </tbody>
      </table>
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

  // state change functions
  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  const stats = { good, neutral, bad };
  const helpers = { addBad, addGood, addNeutral };

  return (
    <div>
      <Display stats={stats} helpers={helpers} />
    </div>
  );
};

export default App;
