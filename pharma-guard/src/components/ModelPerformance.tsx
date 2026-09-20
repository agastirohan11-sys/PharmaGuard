import { BarChart2, AlertTriangle } from 'lucide-react';
import { MODEL_METRICS } from '../data/mockData';

interface MetricCardProps {
  label: string;
  value: number;
  color: string;
  barColor: string;
}

function MetricCard({ label, value, color, barColor }: MetricCardProps) {
  return (
    <div className="card p-5 hover:shadow-md transition-shadow">
      <div className="flex items-end justify-between mb-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
        <span className={`text-2xl font-extrabold ${color}`}>{value}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full bar-animated`}
          style={{ '--target-width': `${value}%` } as React.CSSProperties}
        />
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-slate-300">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

export default function ModelPerformance() {
  const { accuracy, precision, recall, f1Score, auc, confusionMatrix } = MODEL_METRICS;

  const metrics = [
    { label: 'Accuracy', value: accuracy, color: 'text-blue-600', barColor: 'bg-gradient-to-r from-blue-600 to-blue-400' },
    { label: 'Precision', value: precision, color: 'text-violet-600', barColor: 'bg-gradient-to-r from-violet-600 to-violet-400' },
    { label: 'Recall', value: recall, color: 'text-cyan-600', barColor: 'bg-gradient-to-r from-cyan-600 to-cyan-400' },
    { label: 'F1 Score', value: f1Score, color: 'text-indigo-600', barColor: 'bg-gradient-to-r from-indigo-600 to-indigo-400' },
  ];

  const cellColor = (i: number, j: number) => {
    if (i === j) return 'bg-blue-600 text-white font-bold';
    const val = confusionMatrix.matrix[i][j];
    if (val === 0) return 'bg-slate-50 text-slate-300';
    if (val < 5) return 'bg-red-50 text-red-400';
    return 'bg-red-100 text-red-600';
  };

  return (
    <section id="model-performance" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag">
            <BarChart2 className="w-3.5 h-3.5" />
            Model Performance
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">Model Performance</h2>
          <p className="mt-3 text-slate-500">
            Illustrative evaluation metrics — mock values for demonstration purposes only.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Metrics */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((m) => (
                <MetricCard key={m.label} {...m} />
              ))}
            </div>

            {/* AUC-ROC */}
            <div className="card p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AUC-ROC Score</p>
                  <p className="mt-1 text-3xl font-extrabold text-blue-700">{auc}%</p>
                  <p className="text-xs text-slate-500 mt-0.5">Area Under the ROC Curve</p>
                </div>
                <div className="w-20 h-20 relative">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#dbeafe" strokeWidth="8" />
                    <circle
                      cx="40" cy="40" r="30" fill="none"
                      stroke="url(#aucGrad)" strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 30 * auc / 100} ${2 * Math.PI * 30}`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="aucGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-blue-700 rotate-0">
                    {auc}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Confusion matrix */}
          <div className="card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-700">Confusion Matrix</h3>
              <span className="text-xs bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded-full">Mock Data</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm">
                <thead>
                  <tr>
                    <th className="p-2 text-xs text-slate-400 font-medium text-left">Actual ↓ / Pred →</th>
                    {confusionMatrix.labels.map((l) => (
                      <th key={l} className="p-2 text-xs font-bold text-slate-600">{l}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {confusionMatrix.matrix.map((row, i) => (
                    <tr key={i}>
                      <td className="p-2 text-xs font-bold text-slate-600 text-left">{confusionMatrix.labels[i]}</td>
                      {row.map((val, j) => (
                        <td key={j} className={`p-3 rounded-lg m-0.5 text-sm ${cellColor(i, j)}`}>
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-blue-600 inline-block" />
                True Positive (diagonal)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-red-100 inline-block" />
                Misclassified
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-5xl mx-auto mt-6">
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-700 leading-relaxed">
              <span className="font-bold">Illustrative model metrics — replace with actual evaluation results.</span>{' '}
              These figures are mock values for demonstration purposes only and do not represent validated clinical performance.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
