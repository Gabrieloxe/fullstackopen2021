const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://gabriel_fullstack:${password}@cluster0.qiwbn.mongodb.net/note-app?retryWrites=true&w=majority`;
console.log(url);

mongoose.connect(url,{ useNewUrlParser:true , useUnifiedTopology:true, useFindAndModify:true, useCreateIndex: true});

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
    content: 'This is the new note that I will create',
    date: new Date(),
    important: true,
});

note.save().then(result => {
    console.log('note saved');
    mongoose.connection.close();
});

