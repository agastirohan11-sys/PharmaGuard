import { ArrowRight, PlayCircle, Brain, Dna, Microscope, Zap, TrendingUp, Shield } from 'lucide-react';

interface HeroProps {
  onStartAnalysis: () => void;
}

export default function Hero({ onStartAnalysis }: HeroProps) {
  const scrollToExample = () => {
    const el = document.getElementById('analysis');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-white">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#1e40af 1px, transparent 1px), linear-gradient(90deg, #1e40af 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div className="space-y-8">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              ML-Based Drug–Drug Interaction Analysis
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.08] tracking-tight">
                Predict.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Understand.
                </span>{' '}
                Explain.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed max-w-xl">
                AI-powered drug–drug interaction analysis combining machine learning with
                pharmacological insights and explainable AI for clinical decision support.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button onClick={onStartAnalysis} className="btn-primary flex items-center gap-2 text-base">
                Start Analysis
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={scrollToExample} className="btn-secondary flex items-center gap-2 text-base">
                <PlayCircle className="w-4 h-4 text-blue-500" />
                View Example
              </button>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { label: 'Accuracy', value: '92%' },
                { label: 'Drug Pairs', value: '10K+' },
                { label: 'Pathways', value: '50+' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual card */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Main floating card */}
            <div className="float-card w-full max-w-md">
              <div className="card p-6 space-y-5 shadow-xl shadow-blue-500/10 border-blue-100">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Drug Interaction Intelligence</p>
                      <p className="text-xs text-slate-400">Powered by ML + XAI</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">DEMO</span>
                </div>

                {/* Feature pills */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Brain, label: 'ML Prediction', color: 'blue' },
                    { icon: Dna, label: 'Pharmacology', color: 'cyan' },
                    { icon: Microscope, label: 'Explainable AI', color: 'violet' },
                  ].map(({ icon: Icon, label, color }) => (
                    <div key={label} className={`flex flex-col items-center gap-1.5 p-3 rounded-xl bg-${color}-50 border border-${color}-100`}>
                      <Icon className={`w-5 h-5 text-${color}-600`} />
                      <span className={`text-[10px] font-semibold text-${color}-700 text-center leading-tight`}>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Mock prediction preview */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600">Warfarin + Aspirin</span>
                    <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">HIGH RISK</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Confidence</span>
                      <span className="font-semibold text-slate-700">94%</span>
                    </div>
                    <div className="h-1.5 bg-red-100 rounded-full overflow-hidden">
                      <div className="h-full w-[94%] bg-gradient-to-r from-red-500 to-red-400 rounded-full" />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400">Pharmacodynamic interaction — Hemostasis pathway</p>
                </div>

                {/* Mini metric row */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[
                    { icon: Zap, label: 'Fast', sub: '< 2s', color: 'text-amber-500' },
                    { icon: TrendingUp, label: 'Accurate', sub: '92%', color: 'text-blue-500' },
                    { icon: Shield, label: 'Explainable', sub: 'XAI', color: 'text-emerald-500' },
                  ].map(({ icon: Icon, label, sub, color }) => (
                    <div key={label} className="text-center">
                      <Icon className={`w-4 h-4 ${color} mx-auto mb-0.5`} />
                      <p className="text-[10px] font-semibold text-slate-700">{label}</p>
                      <p className="text-[9px] text-slate-400">{sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative accent cards */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-200/40 hidden lg:block" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-violet-500/10 to-blue-500/10 rounded-xl border border-violet-200/40 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
