

const Header = (props) =>{
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
}

const Part = (props) =>{
  return(
    <>
      <p>{props.partNum} {props.exerciseNum}</p>
    </>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part partNum={props.part1} exerciseNum={props.exercises1}/>
      <Part partNum={props.part2} exerciseNum={props.exercises2}/>
      <Part partNum={props.part3} exerciseNum={props.exercises3}/>
    </div>
  );
}

const Total = (props) =>{
  return(
    <div>
      <p>Number of exerciese {props.exercises1 + props.exercises2 + props.exercises3} </p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1.name} part2={part2.name} part3={part3.name} exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/>
    </div>
  );
}



export default App;
