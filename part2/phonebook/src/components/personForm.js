import React from "react";

const PersonForm = ({
    addContact,
    form,
    handleFormChange,
  }) => {
    return (
      <form onSubmit={addContact}>
        <div>
          Name: <input name='name' defaultValue={form.name} onChange={handleFormChange} />
        </div>
        <div>
          Number: <input name='number' defaultValue={form.number} onChange={handleFormChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    );
  };

  export default PersonForm;