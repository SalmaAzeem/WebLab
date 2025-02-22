const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// Connecting to Database
mongoose
    .connect("mongodb://localhost:27017/LabTaskDB")
    .then((err) => {
        console.log("Connected to the database");
    });

const BookSchema = new mongoose.Schema({
    title: String,
    isbn: Number,
    pages: Number
});

const Book = mongoose.model("Book", BookSchema, "myCollection");

// fetch all books
app.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
        console.log(books);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

// fetch book by id
app.get('/:isbn', async (req, res) => {
    try {
        let isbn = Number(req.params.isbn)
        const book = await Book.find({isbn});
        if (!book) {
            return res.status(404).json({message: "Book not found"});
        }
        res.json(book);
        console.log(book);

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

// create book
app.post('/', (req, res) => {
    const book = new Book({
        title: req.body.title,
        isbn: req.body.isbn,
        pages: req.body.pages
    });

    book.save()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
});

// update book
app.put('/:isbn', async (req, res) => {
    try {
        let isbn = Number(req.params.isbn)
        const book = await Book.findOneAndUpdate({isbn}, req.body, {new: true});
        if (!book) {
            return res.status(404).json({message: "Book not found"});
        }
        res.json(book);
        console.log(book);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

// delete book
app.delete('/:isbn', async (req, res) => {
    try {
        let isbn = Number(req.params.isbn)
        const book = await Book.findOneAndDelete({isbn});
        if (!book) {
            return res.status(404).json({message: "Book not found"});
        }
        res.json(book);
        console.log(book);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

app
    .listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
