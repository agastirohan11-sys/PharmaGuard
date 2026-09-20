import { Brain, Cpu, Search, BarChart2 } from 'lucide-react';

const STEPS = [
  { icon: Search, label: 'Fetching drug properties…' },
  { icon: Cpu, label: 'Extracting pharmacological features…' },
  { icon: Brain, label: 'Running ML prediction model…' },
  { icon: BarChart2, label: 'Generating SHAP explanations…' },
];

interface LoadingOverlayProps {
  step: number; // 0–3
}

export default function LoadingOverlay({ step }: LoadingOverlayProps) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="card p-10 shadow-xl shadow-slate-200/60">

          {/* Animated brain icon */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 opacity-20 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-xl shadow-blue-500/30">
              <Brain className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-1">Analyzing Interaction…</h3>
          <p className="text-sm text-slate-400 mb-8">Mock ML pipeline running</p>

          {/* Step indicators */}
          <div className="space-y-3 text-left max-w-xs mx-auto mb-8">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const done = i < step;
              const active = i === step;
              return (
                <div key={i} className={`flex items-center gap-3 transition-all duration-300 ${done ? 'opacity-100' : active ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    done ? 'bg-emerald-100 text-emerald-600' : active ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {done ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <Icon className={`w-3.5 h-3.5 ${active ? 'animate-pulse' : ''}`} />
                    )}
                  </div>
                  <span className={`text-sm ${done ? 'text-emerald-600 font-medium line-through decoration-emerald-300' : active ? 'text-blue-700 font-semibold' : 'text-slate-400'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-xs mx-auto">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${(step / STEPS.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">{Math.round((step / STEPS.length) * 100)}% complete</p>

        </div>
      </div>
    </section>
  );
}
