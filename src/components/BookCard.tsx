import { useState } from 'react';
import { Check, ChevronDown, Trash2 } from 'lucide-react';
import { STATUS_LABELS, STATUS_ORDER, type Book, type ReadingStatus } from '@/types';

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

const STATUS_STYLES: Record<ReadingStatus, string> = {
  'want-to-read': 'bg-amber-50 text-amber-700 ring-amber-200',
  'reading': 'bg-blue-50 text-blue-700 ring-blue-200',
  'finished': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
};

const DOT_STYLES: Record<ReadingStatus, string> = {
  'want-to-read': 'bg-amber-500',
  'reading': 'bg-blue-500',
  'finished': 'bg-emerald-500',
};

export function BookCard({ book, onStatusChange, onRemove }: BookCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="group relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-slate-800">
            {book.title}
          </h3>
          <div className="mt-2 flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${DOT_STYLES[book.status]}`} />
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${STATUS_STYLES[book.status]}`}
            >
              {STATUS_LABELS[book.status]}
            </span>
          </div>
        </div>

        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100"
          >
            Status
            <ChevronDown className="h-3 w-3" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full z-10 mt-1 w-40 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              {STATUS_ORDER.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    onStatusChange(book.id, s);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-xs text-slate-700 transition-colors hover:bg-slate-50"
                >
                  {STATUS_LABELS[s]}
                  {book.status === s && <Check className="h-3 w-3 text-slate-500" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          onClick={() => onRemove(book.id)}
          className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-3 w-3" />
          Delete
        </button>
      </div>
    </div>
  );
}
