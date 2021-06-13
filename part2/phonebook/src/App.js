import './App.css';
import React, { useState, useEffect } from 'react';
import Persons from './components/persons';
import PersonForm from './components/personForm';
import Notification from './components/Notification';
import Filter from './components/filter';
import contactService from './services/contacts';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterValue, setFitlerValue] = useState('');
  const [notification, setNotification] = useState(null);

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

  const notify = (message, type='success') => {
    setNotification({message, type});
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
      />

      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        notify={notify}
        notifcation={notification}
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
