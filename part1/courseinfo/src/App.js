const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  console.log(props);
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  const {parts} = props
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
    total += part.exercises
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
  }

  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  );
};

export default App;
