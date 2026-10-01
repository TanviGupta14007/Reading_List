import { BookOpen, Bookmark, CheckCircle2 } from 'lucide-react';

interface SummaryBarProps {
  total: number;
  reading: number;
  finished: number;
}

export function SummaryBar({ total, reading, finished }: SummaryBarProps) {
  const items = [
    {
      label: 'Total Books',
      value: total,
      icon: BookOpen,
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      iconColor: 'text-slate-500',
    },
    {
      label: 'Currently Reading',
      value: reading,
      icon: Bookmark,
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      iconColor: 'text-blue-500',
    },
    {
      label: 'Finished',
      value: finished,
      icon: CheckCircle2,
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      iconColor: 'text-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item) => (
        <div
          key={item.label}
          className={`rounded-xl ${item.bg} p-3 text-center`}
        >
          <item.icon className={`mx-auto h-4 w-4 ${item.iconColor}`} />
          <p className={`mt-1.5 text-xl font-bold ${item.text}`}>{item.value}</p>
          <p className="text-[10px] font-medium text-slate-500">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
