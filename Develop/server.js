const express = require('express');

const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/public/notes', (req, res) => {
console.info(`${req.method} request received to get notes`)
}
)

app.listen(3000);
