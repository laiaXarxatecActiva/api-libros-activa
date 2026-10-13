import { pool } from "../../model/db.js";

export async function findBooks(req, res) {
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
}