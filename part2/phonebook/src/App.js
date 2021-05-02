import './App.css';
import React, { useState } from 'react';
import Persons from './components/persons';
import PersonForm from './components/personForm';
import Filter from './components/filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFitlerValue] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFitlerValue(event.target.value);
  };

  const addContact = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const contact = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(contact));
      setNewName('');
      setNewNumber('');
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
      />
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        number={handleNumberChange}
      />
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
