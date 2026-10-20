const express = require("express");
const app = express();
app.use(express.json());

let books = [
  { id: 1, title: "Harry Potter" },
  { id: 2, title: "Movies" }
];

app.get("/api/books", (req, res) => res.json(books));

app.get("/api/books/:id", (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

app.post("/api/books", (req, res) => {
  if (!req.body.title) return res.status(400).json({ error: "title is required" });
  const book = { id: Math.max(0, ...books.map(b => b.id)) + 1, title: req.body.title };
  books.push(book);
  res.status(201).json(book);
});

app.put("/api/books/:id", (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  if (!req.body.title) return res.status(400).json({ error: "title is required" });
  book.title = req.body.title;
  res.json(book);
});

app.delete("/api/books/:id", (req, res) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Book not found" });
  res.json(books.splice(index, 1)[0]);
});

app.listen(8080, () => console.log("Books API running at http://localhost:8080"));

//
npm init -y
npm install express
node server.js
//