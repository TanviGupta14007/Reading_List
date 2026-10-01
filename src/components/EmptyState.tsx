import { BookOpen } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
        <BookOpen className="h-6 w-6 text-slate-400" />
      </div>
      <p className="mt-4 text-sm text-slate-500">
        Your reading list is empty. Add your first book.
      </p>
    </div>
  );
}
