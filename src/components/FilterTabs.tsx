import { STATUS_LABELS, STATUS_ORDER, type FilterStatus } from '@/types';

interface FilterTabsProps {
  active: FilterStatus;
  counts: Record<FilterStatus, number>;
  onChange: (filter: FilterStatus) => void;
}

export function FilterTabs({ active, counts, onChange }: FilterTabsProps) {
  const tabs: FilterStatus[] = ['all', ...STATUS_ORDER];

  const labels: Record<FilterStatus, string> = {
    all: 'All',
    ...STATUS_LABELS,
  };

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            active === tab
              ? 'bg-slate-800 text-white'
              : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
          }`}
        >
          {labels[tab]}
          <span
            className={`rounded-full px-1.5 text-[10px] ${
              active === tab ? 'bg-white/20' : 'bg-slate-100'
            }`}
          >
            {counts[tab]}
          </span>
        </button>
      ))}
    </div>
  );
}
