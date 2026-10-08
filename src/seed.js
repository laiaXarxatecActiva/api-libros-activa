import { pool } from "./db.js";

console.log("DATABASE_URL =", process.env.DATABASE_URL);


const books = [
    {title: 'El juego de Ender', writer: 'Orson Scott Card', year: 1982}, 
    {title:'King Sorrow', writer: 'Joe Hill', year:2025}
];

try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS book (
            id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            title TEXT NOT NULL,
            writer TEXT,
            year INTEGER
        )`
    );

    await pool.query('TRUNCATE book RESTART IDENTITY');
    
    for (const{title, writer, year} of books) {
        await pool.query(
            'INSERT INTO book (title, writer, year) VALUES ($1, $2, $3)',
            [title, writer, year]
        );
    }
    
} catch (error) {
    console.error('THERE HAS BEEN AN ERROR :\n\n');
    console.error(error);
} finally {
    await pool.end();
}