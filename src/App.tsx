import { useMemo, useState } from 'react';
import { BookMarked } from 'lucide-react';
import { useReadingList } from '@/hooks/useReadingList';
import { AddBookForm } from '@/components/AddBookForm';
import { BookCard } from '@/components/BookCard';
import { FilterTabs } from '@/components/FilterTabs';
import { EmptyState } from '@/components/EmptyState';
import { SummaryBar } from '@/components/SummaryBar';
import { STATUS_ORDER, type FilterStatus } from '@/types';

function App() {
  const { books, addBook, updateStatus, removeBook } = useReadingList();
  const [filter, setFilter] = useState<FilterStatus>('all');

  const counts = useMemo(() => {
    const c: Record<FilterStatus, number> = {
      all: books.length,
      'want-to-read': 0,
      'reading': 0,
      'finished': 0,
    };
    for (const b of books) c[b.status]++;
    return c;
  }, [books]);

  const filtered = useMemo(() => {
    if (filter === 'all') return books;
    return books.filter((b) => b.status === filter);
  }, [books, filter]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">
        <header className="mb-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800">
              <BookMarked className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">Reading List</h1>
              <p className="text-xs text-slate-500">
                Track books for your studies
              </p>
            </div>
          </div>
        </header>

        <div className="mb-4">
          <AddBookForm
            existingTitles={books.map((b) => b.title)}
            onAdd={addBook}
          />
        </div>

        {books.length > 0 && (
          <>
            <div className="mb-5">
              <SummaryBar
                total={counts.all}
                reading={counts.reading}
                finished={counts.finished}
              />
            </div>
            <div className="mb-5">
              <FilterTabs active={filter} counts={counts} onChange={setFilter} />
            </div>
          </>
        )}

        {books.length === 0 ? (
          <EmptyState />
        ) : filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-slate-400">
            No books in this category.
          </p>
        ) : (
          <div className="grid gap-3">
            {filtered.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onStatusChange={updateStatus}
                onRemove={removeBook}
              />
            ))}
          </div>
        )}

        {books.length > 0 && (
          <p className="mt-6 text-center text-xs text-slate-400">
            {books.length} {books.length === 1 ? 'book' : 'books'} on your list
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
