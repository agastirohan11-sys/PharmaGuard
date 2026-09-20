import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DrugAnalysis from './components/DrugAnalysis';
import PredictionResult from './components/PredictionResult';
import ExplainableAI from './components/ExplainableAI';
import PharmacologicalInsights from './components/PharmacologicalInsights';
import ModelPerformance from './components/ModelPerformance';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import LoadingOverlay from './components/LoadingOverlay';
import { getInteractionResult, type InteractionResult } from './data/mockData';

type AppState = 'idle' | 'loading' | 'results';

export default function App() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<InteractionResult | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = (drugs: string[]) => {
    setAppState('loading');
    setLoadingStep(0);

    // Simulate the 4-step pipeline with ~400ms per step
    const steps = [0, 1, 2, 3, 4];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setLoadingStep(step);
        if (step === 4) {
          const res = getInteractionResult(drugs);
          setResult(res);
          setAppState('results');
        }
      }, idx * 420);
    });
  };

  const handleReset = () => {
    setResult(null);
    setAppState('idle');
    const el = document.getElementById('analysis');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to results when they become available
  useEffect(() => {
    if (appState === 'results' && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [appState]);

  const scrollToAnalysis = () => {
    const el = document.getElementById('analysis');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={() => {}} />

      <main>
        {/* Hero — always visible */}
        <Hero onStartAnalysis={scrollToAnalysis} />

        {/* Drug input form */}
        <DrugAnalysis
          onAnalyze={handleAnalyze}
          isLoading={appState === 'loading'}
        />

        {/* Loading state */}
        {appState === 'loading' && (
          <LoadingOverlay step={loadingStep} />
        )}

        {/* Results sections — animate in when available */}
        {appState === 'results' && result && (
          <div ref={resultsRef}>
            <PredictionResult result={result} onReset={handleReset} />
            <ExplainableAI result={result} />
            <PharmacologicalInsights result={result} />
          </div>
        )}

        {/* Always-visible sections */}
        <ModelPerformance />
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}
