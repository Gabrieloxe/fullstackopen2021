import React from "react";

const PersonForm = ({
    addContact,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
  }) => {
    return (
      <form onSubmit={addContact}>
        <div>
          Name: <input defaultValue={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input defaultValue={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    );
  };

  export default PersonForm;