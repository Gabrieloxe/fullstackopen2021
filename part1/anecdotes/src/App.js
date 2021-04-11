import React, { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Anecdote = ({ anecdotes, selected, votes}) => {
  return (
  <div>
    <div>{anecdotes[selected]}</div>
    <div>Has {votes[selected]} votes</div>
  </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ];

  const [selected, setSelected] = useState(0);

  const anecdotesLength = anecdotes.length;
  const points = new Array(anecdotesLength).fill(0);
  const [votes, setVotes] = useState(points);

  const randomInteger = () => Math.floor(Math.random() * anecdotesLength);

  const changeNumber = () => {
    let num = randomInteger();
    // to not repeat quotes twice in a row
    while (num === selected) {
      num = randomInteger();
    }
    return setSelected(num);
  };

  const vote = () => {
    const voteCopy = [...votes];
    voteCopy[selected] += 1;
    setVotes(voteCopy);
  };

  const mostVotes = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} selected={selected} votes={votes} />
      <Button handleClick={changeNumber} text='next anecdote' />
      <Button handleClick={vote} text='vote' />

      <h1>Anecdote with most votes </h1>
      <Anecdote anecdotes={anecdotes} selected={mostVotes} votes={votes}/>
    </div>
  );
};

export default App;
