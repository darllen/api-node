const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let books = [
    {id: 1, title: 'Manifesto Comunista'},
    {id: 2, title: 'O que Fazer'},
    {id: 3, title: 'Orgulho e Preconceito'}
];

app.get('/', (req, res) => {
    res.json(books);
})

app.post('/post-example', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.json(newBook);
})

app.put('/update-book/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const newTitle = req.body.title;

    const bookToUpdate = books.find(book => book.id === bookId)

    if (bookToUpdate) {
        bookToUpdate.title = newTitle;
        res.json(bookToUpdate)
    } else {
        res.status(404).send('Livro não encontrado');
    }
});

app.delete('/delete-book/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const indexToRemove = books.findIndex(book => book.id === bookId);

    if(indexToRemove !== -1){
        const removedBook = books.splice(indexToRemove, 1);
        res.json(removedBook[0]);
    } else {
        res.status(404).send('Livro não encontrado!')
    }
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});