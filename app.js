const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!!');
});

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from API!', success: true });
});

app.post('/api/data', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    res.status(201).json({ message: `Hello, ${name}!` });
});

module.exports = app;
