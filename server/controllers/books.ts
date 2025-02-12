import { Request, Response } from 'express';
import Book from '../models/Book';

// Get all books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a book
export const createBook = async (req: Request, res: Response) => {
  const { title, author, description } = req.body;
  try {
    const newBook = new Book({ title, author, description });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, description } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, description },
      { new: true }
    );
    res.json(updatedBook);
  } catch (err) {
    res.status(404).json({ message: 'Book not found' });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Book not found' });
  }
};