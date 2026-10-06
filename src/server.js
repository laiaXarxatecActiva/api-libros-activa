import express from 'express';

const app = express();
const PORT = 3000;

const books = [{id:1, title: 'Into the Pit', writer: 'William Afton'}, {id: 2, title: 'Casanova', writer: 'Casanovo'}];

app.get('/', (req, res) => {
    res.send('La API está funcionando');
});

app.get('/api/v1/books', (req, res)=>{
    res.json(books);
})

app.get('/api/v1/books/:id', (req, res) => {
    let book = books.find(b => b.id == req.params.id);
    if (!book) {
        res.status(404).json({error: 'Can not find any book with the guiven ID'});
    }
    res.json(book);
})

app.get('/api/v1/books/writer/:writer', (req, res) => {
    let book = books.find(b => b.writer == req.params.writer);
    if (!book) {
        res.status(404).json({error: 'Can not find any book with the guiven writer'});
    }
    res.json(book);
})


app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
    
})