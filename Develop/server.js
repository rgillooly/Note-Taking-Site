const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/notes', (req, res) => {
res.status(200),json(`${req.method} request received to get reviews`)

console.info(`${req.method} request received to get notes`)
})


app.post('/notes', (req, res) => {
    
console.info(`${req.method} request received to add a note`)

    const {noteTitle, noteText} = req.body;

    if (noteTitle && noteText) {
        const newNote = {
            noteTitle,
            noteText
        }
        
            fs.readFile('../api/db.json', 'utf-8', (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    const parsedNotes = JSON.parse(data);
                    
                    parsedNotes.push(newNote);

                    fs.writeFile(
                        '../api/db.json',
                        JSON.stringify(parsedNotes, null, 2),
                        (writeErr) =>
                        writeErr
                        ? console.error(writeErr)
                        : console.info('Successfully added note!')
                );
                }
            });
        }});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);