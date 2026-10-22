import { useEffect, useState } from 'react';
import type { Book, ReadingStatus } from '@/types';

const STORAGE_KEY = 'reading-list-books';
const MAX_TITLE_LENGTH = 60;

function normalizeTitle(title: string): string {
  return title
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\.+$/g, '')
    .trim()
    .toLowerCase();
}

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

  const addBook = (title: string, status: ReadingStatus): string | null => {
    const trimmed = title.trim();
    if (!trimmed) return null;
    if (trimmed.length > MAX_TITLE_LENGTH) {
      return 'Book title must be 60 characters or fewer.';
    }
    const normalized = normalizeTitle(trimmed);
    if (books.some((b) => normalizeTitle(b.title) === normalized)) {
      return 'This book is already in your reading list.';
    }
    const book: Book = {
      id: crypto.randomUUID(),
      title: trimmed,
      status,
      createdAt: Date.now(),
    };
    setBooks((prev) => [book, ...prev]);
    return null;
  };

  const updateStatus = (id: string, status: ReadingStatus) => {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const removeBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return { books, addBook, updateStatus, removeBook };
}
