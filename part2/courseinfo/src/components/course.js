import React from 'react';

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ course }) => {
  const all_parts = course.parts;
  const totalExercises = all_parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return (
    <p>
      <b>Total of {totalExercises} exercises</b>
    </p>
  );
};

const Part = ({ part }) => {
  const { name, exercises } = part;
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
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;