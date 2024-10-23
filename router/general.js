const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
const public_users = express.Router();
const general = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn; // Extract the ISBN from the request parameters
  const book = books[isbn]; // Search for the book using the ISBN

  if (book) {
    res.send(JSON.stringify(book, null, 4)); // Neatly formatted JSON output of the book
  } else {
    res.status(404).send({ message: "Book not found!" }); // Return 404 if book is not found
  }
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const author = req.params.author; // Extract the author's name from the request parameters
  let booksByAuthor = [];

  // Iterate through the books and check if the author matches
  for (let isbn in books) {
    if (books[isbn].author === author) {
      booksByAuthor.push(books[isbn]); // Add the matching books to the list
    }
  }

  if (booksByAuthor.length > 0) {
    res.send(JSON.stringify(booksByAuthor, null, 4)); // Neatly formatted JSON output of books by author
  } else {
    res.status(404).send({ message: "No books found by this author!" }); // Return 404 if no books are found
  }
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const title = req.params.title; // Extract the title from the request parameters
  let booksByTitle = [];

  // Iterate through the books and check if the title matches
  for (let isbn in books) {
    if (books[isbn].title === title) {
      booksByTitle.push(books[isbn]); // Add the matching books to the list
    }
  }

  if (booksByTitle.length > 0) {
    res.send(JSON.stringify(booksByTitle, null, 4)); // Neatly formatted JSON output of books by title
  } else {
    res.status(404).send({ message: "No books found with this title!" }); // Return 404 if no books are found
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn; // Extract the ISBN from the request parameters
  const book = books[isbn]; // Retrieve the book using the ISBN

  if (book) {
    res.send(JSON.stringify(book.reviews, null, 4)); // Neatly formatted JSON output of the reviews
  } else {
    res.status(404).send({ message: "No reviews found for this ISBN!" }); // Return 404 if no reviews are found
  }
});

// Mock API to fetch the list of books (this could be a real API in a real scenario)
const mockBookAPI = 'https://api.example.com/books/title';  // Replace this with a real API if available

// Fetch book details by author using Axios and async-await
general.get('/author/:author', async (req, res) => {
  try {
      const author = req.params.author;

      // Simulate an API call to fetch books by author
      const response = await axios.get(`${mockBookAPI}/${author}`);  // Make Axios request with author as parameter
      const booksByAuthor = response.data;  // Extract book data from response

      res.status(200).json(JSON.stringify(booksByAuthor, null, 4));  // Return books by author
  } catch (error) {
      res.status(500).json({ message: 'Error fetching book details by author from external API', error: error.message });
  }
});

// Fetch book details by title using Axios and async-await
general.get('/title/:title', async (req, res) => {
  try {
      const title = req.params.title;

      // Simulate an API call to fetch books by title
      const response = await axios.get(`${mockBookAPI}/${title}`);  // Make Axios request with the title as parameter
      const booksByTitle = response.data;  // Extract book data from response

      res.status(200).json(JSON.stringify(booksByTitle, null, 4));  // Return books by title
  } catch (error) {
      res.status(500).json({ message: 'Error fetching book details by title from external API', error: error.message });
  }
});

module.exports.general = general;
module.exports.general = public_users;
