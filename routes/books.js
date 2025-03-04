const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Connecting to Database
mongoose
    .connect("mongodb://localhost:27017/WebDB")
    .then((err) => {
        console.log("Connected to the database");
    });

const BookSchema = new mongoose.Schema({
    title: String,
    isbn: Number,
    pages: Number,
    status: { type: String, default: "available" }
});

const Book = mongoose.model("Book", BookSchema, "A2");

// fetch all books
router.get('/', async (req, res) => {
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
router.get('/:isbn', async (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:isbn', async (req, res) => {
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

// borrow book
router.put('/borrow/:isbn', async (req, res) => {
    try {
        let isbn = Number(req.params.isbn);
        const book = await Book.findById(isbn);
        if (!book) {
            return res.status(404).json({message: "Book not found"});
        }
        if (book.status == "checked-out") {
            return res.status(404).json({message: "Book is not available"});
        }
        book.status = "checked-out";
        res.json(book);
        console.log(book);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

// return book
router.put('/return/:isbn', async (req, res) => {
    try {
        let isbn = Number(req.params.isbn);
        const book = await Book.findById(isbn);
        if (!book) {
            return res.status(404).json({message: "Book not found"});
        }
        if (book.status == "available") {
            return res.status(404).json({message: "Book is already checked-out"});
        }
        book.status = "available";
        res.json(book);
        console.log(book);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

// delete book
router.delete('/:isbn', async (req, res) => {
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

module.exports = router;