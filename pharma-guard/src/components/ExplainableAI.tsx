import { useState } from 'react';
import { Brain, Info } from 'lucide-react';
import type { InteractionResult } from '../data/mockData';

interface ExplainableAIProps {
  result: InteractionResult;
}

const BAR_COLORS = [
  { bar: 'bg-gradient-to-r from-blue-600 to-blue-400', text: 'text-blue-700', bg: 'bg-blue-50' },
  { bar: 'bg-gradient-to-r from-violet-600 to-violet-400', text: 'text-violet-700', bg: 'bg-violet-50' },
  { bar: 'bg-gradient-to-r from-cyan-600 to-cyan-400', text: 'text-cyan-700', bg: 'bg-cyan-50' },
  { bar: 'bg-gradient-to-r from-indigo-600 to-indigo-400', text: 'text-indigo-700', bg: 'bg-indigo-50' },
  { bar: 'bg-gradient-to-r from-teal-600 to-teal-400', text: 'text-teal-700', bg: 'bg-teal-50' },
];

export default function ExplainableAI({ result }: ExplainableAIProps) {
  const [tooltip, setTooltip] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const maxVal = Math.max(...result.features.map((f) => f.value));

  return (
    <section id="explainable-ai" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-tag">
            <Brain className="w-3.5 h-3.5" />
            Explainable AI
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">
            Why did the model make this prediction?
          </h2>
          <p className="mt-3 text-slate-500 flex items-center justify-center gap-1.5 flex-wrap">
            Important features contributing to the prediction.
            <button
              className="relative inline-flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
              onMouseEnter={() => setTooltip(true)}
              onMouseLeave={() => setTooltip(false)}
            >
              <Info className="w-4 h-4" />
              What is feature importance?
              {tooltip && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-slate-800 text-white text-xs rounded-xl px-4 py-3 leading-relaxed z-10 text-left shadow-xl">
                  Feature importance represents the relative contribution of each drug property to the model's prediction. Higher bars indicate stronger influence on the risk classification.
                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800" />
                </span>
              )}
            </button>
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card p-8 shadow-lg shadow-slate-200/60 space-y-6">

            {/* Demo label */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-slate-700">Feature Importance Scores</p>
              <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                Mock XAI Output
              </span>
            </div>

            {/* Feature bars */}
            <div className="space-y-4">
              {result.features.map((feature, i) => {
                const colors = BAR_COLORS[i % BAR_COLORS.length];
                const isActive = activeFeature === i;
                const normalizedWidth = (feature.value / maxVal) * 100;

                return (
                  <div
                    key={feature.feature}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveFeature(i)}
                    onMouseLeave={() => setActiveFeature(null)}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-slate-700">{feature.feature}</span>
                      <span className={`text-sm font-bold ${colors.text}`}>{feature.value}%</span>
                    </div>

                    {/* Bar */}
                    <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colors.bar} rounded-full bar-animated transition-all duration-300 ${isActive ? 'opacity-100 shadow-md' : 'opacity-80'}`}
                        style={{ '--target-width': `${normalizedWidth}%` } as React.CSSProperties}
                      />
                      {/* Value marker */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-2 border-current rounded-full shadow-sm transition-all"
                        style={{ left: `calc(${normalizedWidth}% - 5px)` }}
                      />
                    </div>

                    {/* Expandable description */}
                    {isActive && (
                      <div className={`mt-2 px-3 py-2 ${colors.bg} rounded-lg`}>
                        <p className="text-xs text-slate-600 leading-relaxed">{feature.description}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="font-semibold text-slate-500">Legend:</span>
              <span>Bars show relative contribution of each drug property to the risk prediction.</span>
              <span className="text-blue-500 font-medium">Hover to see details.</span>
            </div>

          </div>

          {/* SHAP-style explanation note */}
          <div className="mt-4 flex items-start gap-3 bg-blue-50/50 border border-blue-100 rounded-xl p-4">
            <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-semibold text-slate-700">Mock SHAP-style explanations.</span>{' '}
              In the actual system, these values would be derived from SHAP (SHapley Additive exPlanations) applied to the trained ML model.
              Values shown here are illustrative demo outputs only.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
