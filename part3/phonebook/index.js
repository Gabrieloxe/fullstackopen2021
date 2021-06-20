const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

morgan.token('body', (req) =>{
  if(req.body){
    return JSON.stringify(req.body);
  }
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-643122',
  },
];

app.get('/', (request, response) => {
  response.json('Welcome to the API use /api/persons to get started');
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  const info = `Phonebook has info for ${persons.length} people. </br></br> ${new Date()}`;

  response.send(info);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  let id = Math.floor(Math.random() * 1000000);
  const numbers = persons.map(p => p.id);
  while (numbers.includes(id)){
    id = Math.floor(Math.random() * 1000000)
  }
  return id;
};

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Either the name or number is missing',
    });
  } else if (body.name === '' || body.number === '') {
    return response.status(400).json({
      error: 'Name or number cannot be empty',
    });
  }

  const names = persons.map((p) => p.name);
  if (names.includes(body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

const PORT = 3001;

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
