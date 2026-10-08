import express from 'express';
import { pool } from './db.js';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('La API está funcionando');
});

app.get('/api/v1/books', async (req, res)=>{
    let rows;
    try {
        ({rows} = await pool.query(`SELECT * FROM book`));        
    } catch (error) {
        console.error(error);
    }
    if (!rows) rows = {"msg": "la respuesta no devolvió ningún registro"};
    res.json(rows);
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