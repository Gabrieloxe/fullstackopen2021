import './App.css';
import React, { useState, useEffect } from 'react';
import Persons from './components/persons';
import PersonForm from './components/personForm';
import Filter from './components/filter';
import contactService from './services/contacts';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFitlerValue] = useState('');

  const hook = () => {
    contactService.getAll().then((returnedContacts) => {
      setPersons(returnedContacts);
    });
  };

  useEffect(hook, []);

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
      contactService.create(contact).then((returnedContact) => {
        setPersons(persons.concat(returnedContact));
        setNewName('');
        setNewNumber('');
        window.location.reload();
      });
    }
  };

  const deleteContact = (contact) => {
    if (window.confirm(`Delete ${contact.name}? `)) {
      console.log(`deleting note id: ${contact.id}`);
      contactService.remove(contact.id).then((deletionResponse) => {
        console.log(deletionResponse);
        setPersons(persons.filter((person) => person.id !== contact.id));
      });
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

      <h3>Add a new</h3>
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
