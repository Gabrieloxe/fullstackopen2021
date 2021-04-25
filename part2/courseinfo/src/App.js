import './App.css';

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const all_parts = course.parts;
  const totalExercises = all_parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {totalExercises}</p>;
};

const Part = ({ part }) => {
  const {name, exercises} = part
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ course }) => {
  const { parts } = course;
  const display = parts.map((part) => {
    return <Part part={part} key={part.id} />;
  });
  return <div>{display}</div>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}/>
      <Content course ={course}/>
      <Total course={course}/>
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
