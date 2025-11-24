import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import SafetyDisclaimer from './components/SafetyDisclaimer';
import FilterBar from './components/FilterBar';
import MedicineCard from './components/MedicineCard';
import MedicineDetailsModal from './components/MedicineDetailsModal';
import { babyMedicines, motherMedicines, META } from './data';

const TAB = {
  MOTHER: 'mother',
  BABY: 'baby',
};

const PageHeader = () => (
  <header className="mb-6">
    <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Medicine Guide & Safety</h1>
    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-1">
      A trusted, doctor-verified medicine management panel for pregnant mothers and children.
    </p>
  </header>
);

const Tabs = ({ active, onChange }) => (
  <div
    className="rounded-xl border border-border p-1 flex w-full md:w-auto bg-[var(--lavender,#F6F1FF)] dark:bg-card"
    role="tablist"
    aria-label="Select guide for mother or child"
  >
    <Button
      asChild
      variant={active === TAB.MOTHER ? 'default' : 'ghost'}
      size="sm"
      className="flex-1 md:flex-none font-medium"
      aria-selected={active === TAB.MOTHER}
      role="tab"
    >
      <button onClick={() => onChange(TAB.MOTHER)}>Pregnant Mother Medicines</button>
    </Button>
    <Button
      asChild
      variant={active === TAB.BABY ? 'default' : 'ghost'}
      size="sm"
      className="flex-1 md:flex-none font-medium"
      aria-selected={active === TAB.BABY}
      role="tab"
    >
      <button onClick={() => onChange(TAB.BABY)}>Baby / Child Medicines</button>
    </Button>
  </div>
);

const DataTable = ({ rows, kind }) => (
  <div className="mt-8">
    <h3 className="font-semibold text-foreground mb-3">Full List</h3>
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-100">Name</th>
            <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-100">Category</th>
            <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-100">Form</th>
            <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-100">Description</th>
            <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-100">Safety</th>
            <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-100">Doctor</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border">
              <td className="p-3 text-foreground">{r.name}</td>
              <td className="p-3 text-foreground">{r.category}</td>
              <td className="p-3 text-foreground">{r.form}</td>
              <td className="p-3 text-foreground">{r.condition}</td>
              <td className="p-3 text-foreground">{r.safety_level || 'Doctor Required'}</td>
              <td className="p-3 text-foreground">{r.doctor_required ? 'Required' : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const useLocalStorage = (key, initial) => {
  const [state, setState] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch {}
  }, [key, state]);
  return [state, setState];
};

const MedicineGuide = () => {
  const [tab, setTab] = useState(TAB.MOTHER);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [form, setForm] = useState("all");
  const [trimester, setTrimester] = useState("all");
  const [ageGroup, setAgeGroup] = useState("all");
  const [sortAlpha, setSortAlpha] = useState(false);
  const [selected, setSelected] = useState(null);
  const [rx, setRx] = useLocalStorage('lilnest_prescription', []);

  const dataset = tab === TAB.MOTHER ? motherMedicines : babyMedicines;

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setForm("all");
    setTrimester("all");
    setAgeGroup("all");
    setSortAlpha(false);
  };

  const matchesQuery = (item) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      (item.category || '').toLowerCase().includes(q) ||
      (item.condition || '').toLowerCase().includes(q)
    );
  };

  const matchesCategory = (item) => category === 'all' || (item.category === category);
  const matchesForm = (item) => form === 'all' || (item.form === form);

  const matchesTrimester = (item) => {
    if (tab !== TAB.MOTHER) return true;
    if (trimester === 'all') return true;
    const t = item.trimester_safety || '';
    if (trimester === 'PP') return /postpartum|lactation/i.test(t);
    return t.includes(trimester);
  };

  const matchesAgeGroup = (item) => {
    if (tab !== TAB.BABY) return true;
    if (ageGroup === 'all') return true;
    const min = (item.minimum_age || '').toLowerCase();
    if (ageGroup === '0-6m') return min === '0m';
    if (ageGroup === '6-12m') return min === '6m';
    if (ageGroup === '1-2y') return min === '1y';
    if (ageGroup === '2-5y') return min === '2y';
    if (ageGroup === '5-10y') return min === '5y';
    return true;
  };

  const filtered = useMemo(() => {
    let rows = dataset.filter(matchesQuery).filter(matchesCategory).filter(matchesForm).filter(matchesTrimester).filter(matchesAgeGroup);
    if (sortAlpha) rows = [...rows].sort((a, b) => a.name.localeCompare(b.name));
    return rows;
  }, [dataset, query, category, form, trimester, ageGroup, sortAlpha]);

  const handleAdd = (item) => {
    setRx((prev) => {
      if (prev.find((p) => p.id === item.id)) return prev;
      return [...prev, { id: item.id, name: item.name, kind: tab, when: Date.now() }];
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
        <PageHeader />
        <div className="mb-4">
          <SafetyDisclaimer />
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-4">
          <Tabs active={tab} onChange={setTab} />
          <div className="text-xs text-gray-700 dark:text-gray-300">
            Prescription items: <span className="font-semibold">{rx.length}</span>
          </div>
        </div>

        <FilterBar
          activeTab={tab}
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
          form={form}
          onFormChange={setForm}
          trimester={trimester}
          onTrimesterChange={setTrimester}
          ageGroup={ageGroup}
          onAgeGroupChange={setAgeGroup}
          sortAlpha={sortAlpha}
          onToggleSort={() => setSortAlpha((s) => !s)}
          onClear={clearFilters}
        />

        <div className="mt-6 mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            {tab === TAB.MOTHER ? 'Pregnant Mother Medicines' : 'Baby / Child Medicines'}
            <span className="text-gray-600 dark:text-gray-400 ml-2">({filtered.length})</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <MedicineCard key={item.id} item={item} kind={tab} onView={setSelected} onAdd={handleAdd} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">No medicines found with current search/filters.</div>
        )}

        <DataTable rows={filtered} kind={tab} />

        <div className="mt-8 rounded-xl border border-border p-5 bg-card">
          <h3 className="font-semibold text-foreground mb-2">General Safety</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>Always consult a qualified clinician before starting or stopping medicines.</li>
            <li>Never exceed doctor-prescribed dose or duration.</li>
            <li>Store medicines away from children; check expiry and storage instructions.</li>
            <li>Report side effects immediately; carry allergy information.</li>
          </ul>
        </div>
      </main>

      <MedicineDetailsModal item={selected} kind={tab} open={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default MedicineGuide;
