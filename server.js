const express = require('express');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === 'Bearer ZEWAIL') {
        next();
    } else {
        res.status(403).send('Forbidden: Invalid Token');
    }
};



const bookRoutes = require('./routes/books');
// check this
app.use('/books', authMiddleware, bookRoutes);


app
    .listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });