const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('A simple Node App is ' + 'running o this server')
    res.end();
})

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));