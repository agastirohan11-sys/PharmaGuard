import { AlertTriangle, AlertCircle, CheckCircle, Info, RefreshCw, TrendingUp, Zap, Activity } from 'lucide-react';
import type { InteractionResult, RiskLevel } from '../data/mockData';

interface PredictionResultProps {
  result: InteractionResult;
  onReset: () => void;
}

const RISK_CONFIG: Record<RiskLevel, {
  label: string;
  color: string;
  bg: string;
  border: string;
  barColor: string;
  icon: typeof AlertTriangle;
  ringColor: string;
}> = {
  HIGH: {
    label: 'HIGH RISK',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    barColor: 'bg-gradient-to-r from-red-500 to-red-400',
    icon: AlertTriangle,
    ringColor: 'ring-red-200',
  },
  MODERATE: {
    label: 'MODERATE RISK',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    barColor: 'bg-gradient-to-r from-amber-500 to-amber-400',
    icon: AlertCircle,
    ringColor: 'ring-amber-200',
  },
  LOW: {
    label: 'LOW RISK',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    barColor: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
    icon: CheckCircle,
    ringColor: 'ring-emerald-200',
  },
};

function InfoCard({ label, value, sub, icon: Icon, iconColor }: {
  label: string; value: string; sub?: string; icon: typeof Info; iconColor: string;
}) {
  return (
    <div className="card p-5 space-y-3 hover:shadow-md transition-shadow">
      <div className={`w-8 h-8 rounded-lg ${iconColor} flex items-center justify-center`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="mt-1 text-sm font-bold text-slate-800 leading-snug">{value}</p>
        {sub && <p className="mt-0.5 text-xs text-slate-400">{sub}</p>}
      </div>
    </div>
  );
}

export default function PredictionResult({ result, onReset }: PredictionResultProps) {
  const cfg = RISK_CONFIG[result.riskLevel];
  const RiskIcon = cfg.icon;

  return (
    <section id="results" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 results-enter">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <span className="section-tag">
              <Activity className="w-3.5 h-3.5" />
              Interaction Analysis
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
              {result.drugs.join(' + ')}
            </h2>
          </div>
          <button
            onClick={onReset}
            className="btn-secondary flex items-center gap-2 text-sm self-start sm:self-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Analysis
          </button>
        </div>

        {/* Risk hero card */}
        <div className={`${cfg.bg} border-2 ${cfg.border} rounded-2xl p-6 sm:p-8 mb-8 ring-4 ${cfg.ringColor}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className={`relative w-14 h-14 rounded-2xl ${cfg.bg} border-2 ${cfg.border} flex items-center justify-center flex-shrink-0`}>
                <RiskIcon className={`w-7 h-7 ${cfg.color}`} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-2xl sm:text-3xl font-extrabold ${cfg.color} tracking-tight`}>
                    {cfg.label}
                  </span>
                  <span className="text-xs bg-white/80 text-slate-500 font-semibold px-2 py-0.5 rounded-full border border-slate-200">
                    Mock ML Prediction
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600 max-w-xl leading-relaxed">
                  {result.mechanism}
                </p>
              </div>
            </div>

            {/* Confidence */}
            <div className="text-center sm:text-right flex-shrink-0">
              <div className={`inline-flex items-center gap-2 bg-white rounded-2xl border-2 ${cfg.border} px-5 py-4`}>
                <TrendingUp className={`w-5 h-5 ${cfg.color}`} />
                <div>
                  <p className="text-3xl font-extrabold text-slate-900">{result.confidence}%</p>
                  <p className="text-xs text-slate-400 font-medium">Prediction Confidence</p>
                </div>
              </div>
            </div>
          </div>

          {/* Confidence bar */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span className="font-medium">Confidence Score</span>
              <span className="font-bold">{result.confidence}%</span>
            </div>
            <div className="h-2.5 bg-white/60 rounded-full overflow-hidden">
              <div
                className={`h-full ${cfg.barColor} rounded-full bar-animated`}
                style={{ '--target-width': `${result.confidence}%` } as React.CSSProperties}
              />
            </div>
          </div>
        </div>

        {/* 4-info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <InfoCard
            label="Interaction Type"
            value={result.interactionType}
            icon={Zap}
            iconColor="bg-blue-500"
          />
          <InfoCard
            label="Possible Mechanism"
            value={result.mechanism.split('–').slice(-1)[0]?.trim() ?? result.mechanism}
            icon={Info}
            iconColor="bg-violet-500"
          />
          <InfoCard
            label="Affected Pathway"
            value={result.affectedPathway}
            icon={Activity}
            iconColor="bg-cyan-500"
          />
          <InfoCard
            label="Confidence"
            value={`${result.confidence}%`}
            sub="Mock ML confidence score"
            icon={TrendingUp}
            iconColor={result.riskLevel === 'HIGH' ? 'bg-red-500' : result.riskLevel === 'MODERATE' ? 'bg-amber-500' : 'bg-emerald-500'}
          />
        </div>

        {/* Recommendations */}
        <div className="card p-6">
          <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
              <Info className="w-3 h-3 text-blue-600" />
            </span>
            Clinical Considerations
            <span className="text-xs text-slate-400 font-normal">(Demo only — not medical advice)</span>
          </h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
