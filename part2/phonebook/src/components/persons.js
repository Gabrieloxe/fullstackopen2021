import React from 'react';

const Contact = ({ person }) => {
    return (
      <li>
        {person.name} {person.number}
      </li>
    );
  };

  const Persons = ({ persons }) => {
    return (
      <div>
        <ul>
          {persons.map((person) => (
            <Contact key={person.name} person={person} />
          ))}
        </ul>
      </div>
    );
  };


export default Persons;