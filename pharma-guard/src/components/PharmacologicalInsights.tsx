import { Pill, Target, Beaker, Clock, Network, Layers } from 'lucide-react';
import type { InteractionResult } from '../data/mockData';

interface PharmacologicalInsightsProps {
  result: InteractionResult;
}

const CARD_GRADIENTS = [
  'from-blue-600 to-blue-400',
  'from-violet-600 to-violet-400',
  'from-cyan-600 to-cyan-400',
  'from-indigo-600 to-indigo-400',
  'from-teal-600 to-teal-400',
];

interface DetailRowProps {
  icon: typeof Pill;
  label: string;
  value: string;
}

function DetailRow({ icon: Icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0">
      <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-slate-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-sm font-semibold text-slate-700 mt-0.5 leading-snug">{value}</p>
      </div>
    </div>
  );
}

export default function PharmacologicalInsights({ result }: PharmacologicalInsightsProps) {
  return (
    <section id="pharmacology" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag">
            <Beaker className="w-3.5 h-3.5" />
            Pharmacological Insights
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">Pharmacological Insights</h2>
          <p className="mt-3 text-slate-500">
            Key pharmacological properties of each drug involved in the interaction.
          </p>
        </div>

        {/* Drug cards grid */}
        <div className={`grid gap-6 ${result.drugDetails.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} max-w-5xl mx-auto`}>
          {result.drugDetails.map((drug, i) => {
            const gradient = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
            return (
              <div key={drug.name} className="card overflow-hidden shadow-md shadow-slate-200/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                {/* Card header */}
                <div className={`bg-gradient-to-br ${gradient} p-5`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/70 font-semibold uppercase tracking-wider">
                        Drug {i + 1}
                      </p>
                      <h3 className="text-xl font-extrabold text-white mt-0.5">{drug.name}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Pill className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 space-y-0">
                  <DetailRow icon={Layers} label="Drug Class" value={drug.drugClass} />
                  <DetailRow icon={Target} label="Therapeutic Class" value={drug.therapeuticClass} />
                  <DetailRow icon={Beaker} label="Mechanism of Action" value={drug.mechanism} />
                  <DetailRow icon={Network} label="Protein Binding" value={drug.proteinBinding} />
                  {drug.cyp && <DetailRow icon={Network} label="CYP Involvement" value={drug.cyp} />}
                  {drug.target && <DetailRow icon={Target} label="Primary Target" value={drug.target} />}
                  {drug.halfLife && <DetailRow icon={Clock} label="Half-Life" value={drug.halfLife} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interaction summary banner */}
        <div className="mt-8 max-w-5xl mx-auto card p-5 border-l-4 border-blue-500 bg-blue-50/50">
          <div className="flex items-start gap-3">
            <Network className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-slate-800">Interaction Pathway</p>
              <p className="text-sm text-slate-600 mt-0.5">
                <span className="font-semibold">{result.affectedPathway}</span>
                {' — '}
                {result.mechanism}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
