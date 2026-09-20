import { PillIcon, Cpu, BrainCircuit, FileBarChart, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Input Drugs',
    description: 'User enters two or more drug names into the analysis interface.',
    icon: PillIcon,
    gradient: 'from-blue-600 to-blue-400',
    light: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
  },
  {
    number: '02',
    title: 'Feature Extraction',
    description: 'The system extracts molecular and pharmacological properties: protein binding, CYP involvement, mechanism class, and more.',
    icon: Cpu,
    gradient: 'from-violet-600 to-violet-400',
    light: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-700',
  },
  {
    number: '03',
    title: 'ML Prediction',
    description: 'The trained model evaluates drug pair features and predicts interaction risk: High, Moderate, or Low.',
    icon: BrainCircuit,
    gradient: 'from-cyan-600 to-cyan-400',
    light: 'bg-cyan-50',
    border: 'border-cyan-200',
    text: 'text-cyan-700',
  },
  {
    number: '04',
    title: 'Explainable Result',
    description: 'The system provides risk level, interaction mechanism, affected pathway, and SHAP-based feature importance scores.',
    icon: FileBarChart,
    gradient: 'from-indigo-600 to-indigo-400',
    light: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-700',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-tag">
            <BrainCircuit className="w-3.5 h-3.5" />
            Workflow
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">How It Works</h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            A four-step pipeline from drug input to explainable AI-powered risk prediction.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-violet-200 via-cyan-200 to-indigo-200 mx-32" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative flex flex-col items-center text-center group">
                  {/* Mobile connector */}
                  {index < STEPS.length - 1 && (
                    <div className="lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-slate-300 rotate-90" />
                    </div>
                  )}

                  {/* Icon circle */}
                  <div className="relative mb-5">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    {/* Step number badge */}
                    <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 ${step.border} ${step.text} text-xs font-bold flex items-center justify-center shadow-sm`}>
                      {index + 1}
                    </span>
                  </div>

                  {/* Card */}
                  <div className={`card w-full p-5 ${step.light} border ${step.border} group-hover:shadow-md transition-shadow`}>
                    <span className={`text-3xl font-black ${step.text} opacity-20 block mb-1`}>{step.number}</span>
                    <h3 className="text-base font-bold text-slate-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech stack row */}
        <div className="mt-12 text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Powered By</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Random Forest / XGBoost',
              'SHAP Explanations',
              'PubChem / DrugBank',
              'Feature Engineering',
              'scikit-learn',
            ].map((tech) => (
              <span key={tech} className="text-xs font-semibold bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full shadow-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
