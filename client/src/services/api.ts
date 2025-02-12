import axios from 'axios';
import { Book } from '../models/Book';

const API_URL = 'http://localhost:5000/api/books';

export const fetchBooks = async () => (await axios.get<Book[]>(API_URL)).data;
export const addBook = async (book: Omit<Book, '_id'>) => 
  (await axios.post<Book>(API_URL, book)).data;
export const editBook = async (id: string, book: Book) => 
  (await axios.put<Book>(`${API_URL}/${id}`, book)).data;
export const removeBook = async (id: string) => 
  (await axios.delete(`${API_URL}/${id}`)).data;