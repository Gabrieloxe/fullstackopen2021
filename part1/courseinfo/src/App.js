const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  const { part } = props;
  const { name, exercises } = part;
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  const a = parts.map((part, index) => {
    return <Part part={part} key={index} />;
  });
  return <div>{a}</div>;
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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

  const { name, parts } = course;

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
