require('dotenv').config();
// Express
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

// mongo DB connection
const Note = require('./models/note');

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('---');
  next();
};

app.use(requestLogger);

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response) => {
  try {
    Note.find({}).then((notes) => {
      response.json(notes);
    });
  } catch (e) {
    console.log(`Error in ${req.method} route ${req.baseUrl}: ${e.message}`);
    response.status(400).send({ message: e.message, status: false });
  }
});

app.post('/api/notes', (request, response) => {
  try {
    const body = request.body;
    if (!body.content) {
      return response.status(400).json({
        error: 'content missing',
      });
    }

    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    });

    note.save().then((savedNote) => {
      response.json(savedNote);
    });
  } catch (e) {
    console.log(`Error in ${req.method} route ${req.baseUrl}: ${e.message}`);
    response.status(400).send({ message: e.message, status: false });
  }
});

app.get('/api/notes/:id', (request, response) => {
  try {
    const id = request.params.id;
    Note.findById(id).then((note) => {
      response.json(note);
    });
  } catch (e) {
    console.log(`Error in ${req.method} route ${req.baseUrl}: ${e.message}`);
    response.status(400).send({ message: e.message, status: false });
  }
});

app.delete('/api/notes/:id', (request, response) => {
  try {
    const id = request.params.id;
    Note.findByIdAndDelete(id).then((query) => {
      response.status(204).end();
    });
  } catch (e) {
    console.log(`Error in ${req.method} route ${req.baseUrl}: ${e.message}`);
    response.status(400).send({ message: e.message, status: false });
  }
});

app.put('/api/notes/:id', (request, response) => {
  try {
    const body = request.body;
    if (!body.content) {
      return response.status(400).json({
        error: 'content missing',
      });
    }
    const id = request.params.id;
    const note = {
      content: body.content,
      date: new Date(),
      important: body.important || false,
    };
    const options = { new: true };
    Note.findOneAndReplace({ _id: id }, note, options).then((note) => {
      response.json(note);
    });
  } catch (e) {
    console.log(
      `Error in ${request.method} route ${request.baseUrl}: ${e.message}`
    );
    response.status(400).send({ message: e.message, status: false });
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log(`Server running on port ${PORT}`);
