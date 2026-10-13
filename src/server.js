import express from 'express';
import router from './routes/books_router.js';

const app = express();
const PORT = 3000;

app.use('/api/v1/books', router);

app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
})