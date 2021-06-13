import React, {useState, useEffect} from "react";

const PersonForm = ({
    persons,
    setPersons,
    setErrorMessage,
    setSuccessMessage,
    contactService

  }) => {

    const [form, setForm] = useState({ name: "", number: "" });

    const addContact = () => {
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
            setSuccessMessage(`${contact.name} has been updated`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
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

    const handleFormChange = (event) => {
      const value = event.target.value;
      const name = event.target.name;
      setForm({ ...form, [name]: value});
    };

    const handleFormSubmit = (event) =>{
      event.preventDefault();
      const names = persons.map((person) => person.name);
      if (names.includes(form.name)) {
        const toBeUpdated = persons.find((person) => person.name === form.name);
        toBeUpdated.number = form.number;
        updateContact(toBeUpdated, toBeUpdated.id);
      } else {
        addContact();
      }
    }

    useEffect(() => {
      setForm({ name: '', number: '' });
    }, [persons])


    return (
      <form onSubmit={handleFormSubmit}>
        <div>
          Name: <input name='name' value={form.name} onChange={handleFormChange} />
        </div>
        <div>
          Number: <input name='number' value={form.number} onChange={handleFormChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    );
  };

  export default PersonForm;