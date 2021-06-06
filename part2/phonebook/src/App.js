import './App.css';
import React, { useState, useEffect } from 'react';
import Persons from './components/persons';
import PersonForm from './components/personForm';
import { Success, Error } from './components/Notification';
import Filter from './components/filter';
import contactService from './services/contacts';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterValue, setFitlerValue] = useState('');
  const [form, setForm] = useState({ name: '', number: '' });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    contactService.getAll().then((returnedContacts) => {
      setPersons(returnedContacts);
    });
  };

  useEffect(hook, []);

  const handleFilterChange = (event) => {
    setFitlerValue(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Success message={successMessage} />
      <Error message={errorMessage} />
      <Filter
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
      />

      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        form={form}
        setForm={setForm}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
        contactService={contactService}
      />

      <h3>Numbers</h3>
      <Persons
        persons={filteredPersons}
        contactService={contactService}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
