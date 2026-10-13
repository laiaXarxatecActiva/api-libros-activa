import { pool } from "../../model/db.js";

export async function findBooksById(req, res) {
    let rows;    
    try {
        ({rows} = await pool.query(`SELECT * FROM book WHERE id = $1`, [req.params.id]));
    } catch (error) {
        console.error(error);
    } 
    if (rows == '') rows = {"msg": "No se encontró ningún registro"};
    res.json(rows);
}