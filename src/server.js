import express from 'express';
import { pool } from './db.js';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('La API está funcionando');
});

app.get('/api/v1/books', async (req, res)=>{
    const {writer, year} = req.query;
    const conditions = [];
    const values = [];

    if (writer) {
        values.push(`%${writer}%`);
        conditions.push(`writer LIKE $${values.length}`);
    }
    if (year) {
        values.push(Number(year));
        conditions.push(`year = $${values.length}`);
    }

    const query = 'SELECT * FROM book'
        + (conditions.length>0 ? ` WHERE ${conditions.join(' AND ')}` : '');
    
    try {
        const {rows} = await pool.query(query, values);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Error al consultar la base de datos'});
    }

})

app.get('/api/v1/books/:id', async (req, res) => {
    let rows;    
    try {
        ({rows} = await pool.query(`SELECT * FROM book WHERE id = $1`, [req.params.id]));
    } catch (error) {
        console.error(error);
    } 
    if (rows == '') rows = {"msg": "No se encontró ningún registro"};
    res.json(rows);
})

app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
    
})