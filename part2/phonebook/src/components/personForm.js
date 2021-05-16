import React from "react";


// class PersonForm extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       newName: '',
//       newNumber: ''
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event){
//     const value = event.target.value;
//     this.setState({... state , [event.target.name]:value})
//   }

//   handleSubmit(event){
//     event.preventDefault();

//   }
//   render() {
//     return (
//       <form onSubmit={addContact}>
//         <div>
//           Name: <input defaultValue={this.state.newName} onChange={handleNameChange} />
//         </div>
//         <div>
//           Number: <input defaultValue={this.state.newNumber} onChange={handleNumberChange} />
//         </div>
//         <div>
//           <button type='submit'>add</button>
//         </div>
//       </form>
//     );
//   }
// }


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