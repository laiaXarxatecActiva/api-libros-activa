import { findAll, findById } from "../model/bookModel.js";

export async function findBooks(req, res) {
    const {writer, year} = req.query;
    try {
        const result = await findAll({writer, year});
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Error al consultar la base de datos'});
    }
}

export async function findBookById(req, res) {
    const { id } = req.params;
    try {
        const result = await findById(id);        
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Error al consultar la base de datos'});
    }
}