import React from 'react';

const Contact = ({ person, deleteContact }) => {
    return (
      <li>
        {person.name} {person.number}
        <button onClick={()=>deleteContact(person)}>Delete</button>
      </li>
    );
  };

  const Persons = ({ persons, deleteContact }) => {
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