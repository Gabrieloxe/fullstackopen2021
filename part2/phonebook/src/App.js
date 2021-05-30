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
  const [form, setForm] = useState({ name: null, number: null });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    contactService.getAll().then((returnedContacts) => {
      setPersons(returnedContacts);
    });
  };

  useEffect(hook, []);

  const handleFormChange = (event) => {
    const target = event.target;
    const name = target.name;

    if (name === 'name') {
      setForm({ name: target.value, number: form.number });
    } else if (name === 'number') {
      setForm({ name: form.name, number: target.value });
    }
  };

  const handleFilterChange = (event) => {
    setFitlerValue(event.target.value);
  };

  const addContact = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    if (names.includes(form.name)) {
      const toBeUpdated = persons.find((person) => person.name === form.name);
      toBeUpdated.number = form.number;
      updateContact(toBeUpdated, toBeUpdated.id);
    } else {
      const contact = {
        name: form.name,
        number: form.number,
      };
      contactService.create(contact).then((returnedContact) => {
        setPersons(persons.concat(returnedContact));
        setSuccessMessage(`${contact.name} has been added`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      });
    }
    const freshForm = { name: '', number: '' };
    setForm(freshForm);
  };

  const deleteContact = (contact) => {
    if (window.confirm(`Delete ${contact.name}? `)) {
      console.log(`deleting note id: ${contact.id}`);
      contactService.remove(contact.id).then((deletionResponse) => {
        const personsUpdate = persons.filter(
          (person) => person.id !== contact.id
        );
        setPersons(personsUpdate);
      });
    }
  };

  const updateContact = (contact, id) => {
    if (
      window.confirm(
        `${form.name} is already added to phonebook replace the old number with a new one?`
      )
    ) {
      contactService
        .update(contact, id)
        .then((updateResponse) => {
          const personsUpdate = persons.map((person) =>
            person.id !== updateResponse.id ? person : updateResponse
          );
          setPersons(personsUpdate);
        })
        .catch((error) => {
          setErrorMessage(
            `Contact '${contact.name}' was already removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
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
        addContact={addContact}
        form={form}
        handleFormChange={handleFormChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
