import { pool } from "../config/db.js";

export async function findAll(params) {
    const conditions = [];
    const values = [];

    if (params.writer) {
        values.push(`%${writer}%`);
        conditions.push(`writer LIKE $${values.length}`);
    }
    if (params.year) {
        values.push(Number(year));
        conditions.push(`year = $${values.length}`);
    }
    
    const query = 'SELECT * FROM book'
        + (conditions.length>0 ? ` WHERE ${conditions.join(' AND ')}` : '');
    
    const result = await pool.query(query, values);

    return result;    
}

export async function findById(id) {    
    const result = await pool.query(`SELECT * FROM book WHERE id = $1`, [id]);    
    return result;
}