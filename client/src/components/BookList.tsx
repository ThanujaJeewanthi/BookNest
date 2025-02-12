import { useEffect, useState } from 'react';
import { Book } from '../models/Book';
import { fetchBooks, removeBook } from '../services/api.ts';
import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

export const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => { loadBooks(); }, []);

  const loadBooks = async () => setBooks(await fetchBooks());

  return (
    <div>
      {books.map((book) => (
        <Card key={book._id} sx={{ margin: 2 }}>
          <CardContent>
            <Typography variant="h5">{book.title}</Typography>
            <Typography variant="body1">By {book.author}</Typography>
            <Typography variant="body2">{book.description}</Typography>
            <Button 
              color="error" 
              onClick={() => removeBook(book._id!).then(loadBooks)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};