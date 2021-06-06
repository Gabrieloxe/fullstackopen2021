import React from 'react';

const Contact = ({ person, deleteContact }) => {
    return (
      <li>
        {person.name} {person.number}
        <button onClick={()=>deleteContact(person)}>Delete</button>
      </li>
    );
  };

  const Persons = ({ persons, contactService, setPersons}) => {

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

    return (
      <div>
        <ul>
          {persons.map((person) => (
            <Contact key={person.name} person={person} deleteContact={deleteContact}/>
          ))}
        </ul>
      </div>
    );
  };


export default Persons;