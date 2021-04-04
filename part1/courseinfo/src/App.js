const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  const {part} = props
  const {name} = part
  const {exercises} = part
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  console.log(props);
  const {parts} = props;
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  );
};

const Total = (props) => {
  let total = 0;
  props.parts.forEach(part => {
    total += part.exercises;
  });
  return (
    <div>
      <p>
       Number of exercises {total}
      </p>
    </div>
  );
};

const App = () => {
  const course = {
    name : 'Half Stack application development',
    parts : [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };
  const {name} = course;
  const {parts} = course;

  return (
    <div>
      <Header course = {name} />
      <Content parts = {parts}/>
      <Total parts = {parts}/>
    </div>
  );
};

export default App;
