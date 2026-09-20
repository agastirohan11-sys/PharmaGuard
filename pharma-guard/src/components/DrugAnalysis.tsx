import { useState, useRef, useEffect } from 'react';
import { Plus, X, Search, FlaskConical, Loader2, AlertTriangle, ChevronDown } from 'lucide-react';
import { DRUG_CATALOGUE, EXAMPLE_COMBOS, type RiskLevel } from '../data/mockData';

interface DrugAnalysisProps {
  onAnalyze: (drugs: string[]) => void;
  isLoading: boolean;
}

const RISK_COLORS: Record<RiskLevel, string> = {
  HIGH: 'bg-red-100 text-red-700 border-red-200',
  MODERATE: 'bg-amber-100 text-amber-700 border-amber-200',
  LOW: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

interface DrugInputProps {
  index: number;
  value: string;
  onChange: (val: string) => void;
  onRemove: () => void;
  canRemove: boolean;
  placeholder: string;
}

function DrugInput({ index, value, onChange, onRemove, canRemove, placeholder }: DrugInputProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const wrapRef = useRef<HTMLDivElement>(null);

  const filtered = DRUG_CATALOGUE.filter((d) =>
    d.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = (drug: string) => {
    onChange(drug);
    setQuery(drug);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
        Drug {index + 1}
      </label>
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="w-full pl-9 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all"
        />
        <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
        {canRemove && (
          <button
            onClick={onRemove}
            className="absolute right-3 w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 hover:bg-red-100 hover:text-red-500 text-slate-500 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && filtered.length > 0 && (
        <div className="absolute z-20 top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
          {filtered.map((drug) => (
            <button
              key={drug}
              onMouseDown={() => select(drug)}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors ${
                drug === value ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700'
              }`}
            >
              {drug}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DrugAnalysis({ onAnalyze, isLoading }: DrugAnalysisProps) {
  const [drugs, setDrugs] = useState<string[]>(['Warfarin', 'Aspirin']);

  const updateDrug = (i: number, val: string) => {
    setDrugs((prev) => prev.map((d, idx) => (idx === i ? val : d)));
  };

  const addDrug = () => {
    if (drugs.length < 5) setDrugs((prev) => [...prev, '']);
  };

  const removeDrug = (i: number) => {
    setDrugs((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleAnalyze = () => {
    const valid = drugs.map((d) => d.trim()).filter(Boolean);
    if (valid.length >= 2) onAnalyze(valid);
  };

  const handleExample = (drugList: string[]) => {
    setDrugs(drugList);
    setTimeout(() => {
      onAnalyze(drugList);
    }, 100);
  };

  const placeholders = ['e.g. Warfarin', 'e.g. Aspirin', 'e.g. Ibuprofen', 'e.g. Metformin', 'e.g. Simvastatin'];
  const valid = drugs.map((d) => d.trim()).filter(Boolean);

  return (
    <section id="analysis" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="section-tag">
            <FlaskConical className="w-3.5 h-3.5" />
            Drug Analysis
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">Analyze Drug Interaction</h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto">
            Enter two or more drugs to evaluate their potential interaction risk using mock ML predictions.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="card p-8 space-y-6 shadow-lg shadow-slate-200/60">
            {/* Drug inputs */}
            <div className="space-y-4">
              {drugs.map((drug, i) => (
                <DrugInput
                  key={i}
                  index={i}
                  value={drug}
                  onChange={(val) => updateDrug(i, val)}
                  onRemove={() => removeDrug(i)}
                  canRemove={drugs.length > 2}
                  placeholder={placeholders[i] ?? 'e.g. Drug name'}
                />
              ))}
            </div>

            {/* Add drug */}
            {drugs.length < 5 && (
              <button
                onClick={addDrug}
                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span className="w-5 h-5 rounded-full border-2 border-blue-300 flex items-center justify-center">
                  <Plus className="w-3 h-3" />
                </span>
                Add Another Drug
              </button>
            )}

            {/* Analyze button */}
            <button
              onClick={handleAnalyze}
              disabled={valid.length < 2 || isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2 text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Interaction…
                </>
              ) : (
                <>
                  Analyze Interaction
                  <span className="text-lg">→</span>
                </>
              )}
            </button>

            {valid.length < 2 && (
              <p className="flex items-center gap-1.5 text-xs text-amber-600">
                <AlertTriangle className="w-3.5 h-3.5" />
                Please enter at least 2 drug names to analyze.
              </p>
            )}
          </div>

          {/* Example combos */}
          <div className="mt-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Example combinations
            </p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_COMBOS.map((combo) => (
                <button
                  key={combo.label}
                  onClick={() => handleExample(combo.drugs)}
                  className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:shadow-sm active:scale-95 ${RISK_COLORS[combo.risk]}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    combo.risk === 'HIGH' ? 'bg-red-500' : combo.risk === 'MODERATE' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  {combo.label}
                  <span className="font-normal opacity-70">{combo.risk}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
