const App = () =>{
  console.log('Hello from Component');
    const now = new Date()
    const a = 10
    const b = 20

    return (
      <div>
        <p>Greetings it is {now.toString()}</p>
        <Hello name='Gabriel'/>
        <Hello name='Jerry'/>
      </div>
    )
}

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}

export default App;
