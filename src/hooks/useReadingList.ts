import { useEffect, useState } from 'react';
import type { Book, ReadingStatus } from '@/types';

const STORAGE_KEY = 'reading-list-books';

function loadBooks(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function useReadingList() {
  const [books, setBooks] = useState<Book[]>(loadBooks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const addBook = (title: string, status: ReadingStatus) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const book: Book = {
      id: crypto.randomUUID(),
      title: trimmed,
      status,
      createdAt: Date.now(),
    };
    setBooks((prev) => [book, ...prev]);
  };

  const updateStatus = (id: string, status: ReadingStatus) => {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const removeBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return { books, addBook, updateStatus, removeBook };
}
