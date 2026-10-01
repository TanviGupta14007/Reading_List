import { useState } from 'react';
import { Plus } from 'lucide-react';
import { STATUS_LABELS, STATUS_ORDER, type ReadingStatus } from '@/types';

const MAX_TITLE_LENGTH = 60;

interface AddBookFormProps {
  existingTitles: string[];
  onAdd: (title: string, status: ReadingStatus) => void;
}

export function AddBookForm({ existingTitles, onAdd }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('want-to-read');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const validate = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (trimmed.length > MAX_TITLE_LENGTH) {
      return 'Book title must be 60 characters or fewer.';
    }
    const normalized = trimmed.toLowerCase().replace(/\s+/g, ' ');
    if (existingTitles.some((t) => t.toLowerCase().replace(/\s+/g, ' ') === normalized)) {
      return 'This book is already in your reading list.';
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    const validationError = validate(title);
    if (validationError) {
      setError(validationError);
      return;
    }
    onAdd(trimmed, status);
    setTitle('');
    setStatus('want-to-read');
    setError('');
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) setError('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 py-3 text-sm font-medium text-slate-500 transition-colors hover:border-slate-400 hover:text-slate-600"
      >
        <Plus className="h-4 w-4" />
        Add a book
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <input
        type="text"
        value={title}
        autoFocus
        maxLength={MAX_TITLE_LENGTH + 50}
        onChange={handleChange}
        placeholder="Book title"
        className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-slate-400 ${
          error ? 'border-red-300' : 'border-slate-200'
        }`}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {STATUS_ORDER.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              status === s
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={!title.trim()}
          className="flex-1 rounded-lg bg-slate-800 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add to list
        </button>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            setTitle('');
            setError('');
          }}
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
