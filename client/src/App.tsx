// Your existing App component (from previous code)
import { useState } from 'react';
import { Book } from './models/Book';
import { addBook } from './services/api.ts';
import { BookList } from './components/BookList.tsx';
import { Box, TextField, Button, Container } from '@mui/material';
import React from 'react';

function App() {
  const [newBook, setNewBook] = useState<Omit<Book, '_id'>>({
    title: '',
    author: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(newBook);
    setNewBook({ title: '', author: '', description: '' });
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ margin: 2 }}>
        <TextField
          label="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          required
        />
        <TextField
          label="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          required
        />
        <TextField
          label="Description"
          value={newBook.description}
          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
        />
        <Button type="submit" variant="contained">Add Book</Button>
      </Box>
      <BookList />
    </Container>
  );
}

export default App;