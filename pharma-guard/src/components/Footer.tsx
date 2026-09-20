import { Shield, AlertTriangle, Github, BookOpen, GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#0f1535] text-white">

      {/* Disclaimer banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-300">Demo / Educational Prototype</p>
              <p className="text-xs text-amber-200/80 mt-0.5 leading-relaxed">
                PharmaGuard is an academic prototype designed for demonstrating machine-learning-based drug interaction analysis.
                Results shown in this interface are <strong>mock/demo outputs</strong> and are{' '}
                <strong>not intended for diagnosis, treatment decisions, or clinical use.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-lg">PharmaGuard</p>
                <p className="text-xs text-slate-400">Explainable Drug Interaction Intelligence</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              ML-Based Drug–Drug Interaction Risk Prediction and Explainable Pharmacology System.
              An academic project demonstrating the potential of AI in clinical decision support.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold px-2.5 py-1 rounded-full">
                Demo Mode
              </span>
              <span className="text-xs bg-blue-500/20 border border-blue-500/30 text-blue-400 font-semibold px-2.5 py-1 rounded-full">
                Academic Prototype
              </span>
            </div>
          </div>

          {/* Project info */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Project</p>
            <ul className="space-y-3">
              {[
                { icon: GraduationCap, label: 'Final Year Engineering Project' },
                { icon: BookOpen, label: 'AI / Machine Learning Domain' },
                { icon: Github, label: 'Open Source (Academic)' },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-slate-400">
                  <Icon className="w-3.5 h-3.5 text-slate-500" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Python', 'scikit-learn', 'XGBoost', 'SHAP', 'PubChem API', 'Vite'].map((t) => (
                <span key={t} className="text-xs bg-white/5 border border-white/10 text-slate-300 px-2.5 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © 2024 PharmaGuard — Academic Project. Not for clinical use.
          </p>
          <p className="text-xs text-slate-500">
            Built with React + TypeScript + Tailwind CSS + Vite
          </p>
        </div>
      </div>

    </footer>
  );
}
