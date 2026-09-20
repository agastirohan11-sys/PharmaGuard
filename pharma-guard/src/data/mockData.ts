export type RiskLevel = 'HIGH' | 'MODERATE' | 'LOW';

export interface DrugInfo {
  name: string;
  drugClass: string;
  therapeuticClass: string;
  mechanism: string;
  proteinBinding: string;
  cyp?: string;
  target?: string;
  halfLife?: string;
}

export interface FeatureImportance {
  feature: string;
  value: number;
  description: string;
}

export interface InteractionResult {
  drugs: string[];
  riskLevel: RiskLevel;
  confidence: number;
  interactionType: string;
  mechanism: string;
  affectedPathway: string;
  clinicalSignificance: string;
  features: FeatureImportance[];
  drugDetails: DrugInfo[];
  recommendations: string[];
}

// ─── Drug catalogue ────────────────────────────────────────────────────────
export const DRUG_CATALOGUE: string[] = [
  'Warfarin',
  'Aspirin',
  'Metformin',
  'Ibuprofen',
  'Simvastatin',
  'Clarithromycin',
  'Amoxicillin',
  'Lisinopril',
  'Atorvastatin',
  'Clopidogrel',
  'Digoxin',
  'Fluoxetine',
  'Omeprazole',
  'Ciprofloxacin',
  'Amlodipine',
  'Metoprolol',
  'Losartan',
  'Gabapentin',
  'Levothyroxine',
  'Prednisone',
  'Lithium',
  'Sertraline',
  'Venlafaxine',
  'Carbamazepine',
  'Phenytoin',
  'Rifampin',
  'Ketoconazole',
  'Erythromycin',
  'Furosemide',
  'Spironolactone',
];

// ─── Drug details ─────────────────────────────────────────────────────────
export const DRUG_DETAILS: Record<string, DrugInfo> = {
  Warfarin: {
    name: 'Warfarin',
    drugClass: 'Anticoagulant',
    therapeuticClass: 'Antithrombotic',
    mechanism: 'Vitamin K antagonist – inhibits clotting factor synthesis',
    proteinBinding: 'High (99%)',
    cyp: 'CYP2C9, CYP3A4',
    halfLife: '20–60 hours',
  },
  Aspirin: {
    name: 'Aspirin',
    drugClass: 'Antiplatelet / NSAID',
    therapeuticClass: 'Antithrombotic / Analgesic',
    mechanism: 'Irreversible COX-1/COX-2 inhibition',
    proteinBinding: 'High (80–90%)',
    target: 'COX-1 / COX-2',
    halfLife: '0.3–9 hours',
  },
  Metformin: {
    name: 'Metformin',
    drugClass: 'Biguanide',
    therapeuticClass: 'Antidiabetic',
    mechanism: 'AMPK activation, hepatic gluconeogenesis suppression',
    proteinBinding: 'Negligible (<10%)',
    halfLife: '4–8 hours',
  },
  Ibuprofen: {
    name: 'Ibuprofen',
    drugClass: 'NSAID',
    therapeuticClass: 'Analgesic / Anti-inflammatory',
    mechanism: 'Reversible COX-1/COX-2 inhibition',
    proteinBinding: 'High (99%)',
    cyp: 'CYP2C9',
    halfLife: '1.8–2 hours',
  },
  Simvastatin: {
    name: 'Simvastatin',
    drugClass: 'Statin (HMG-CoA reductase inhibitor)',
    therapeuticClass: 'Lipid-lowering',
    mechanism: 'Competitive inhibition of HMG-CoA reductase',
    proteinBinding: 'High (95%)',
    cyp: 'CYP3A4',
    halfLife: '1–3 hours',
  },
  Clarithromycin: {
    name: 'Clarithromycin',
    drugClass: 'Macrolide antibiotic',
    therapeuticClass: 'Anti-infective',
    mechanism: '50S ribosomal subunit binding, protein synthesis inhibition',
    proteinBinding: 'Moderate (65–70%)',
    cyp: 'CYP3A4 inhibitor',
    halfLife: '3–7 hours',
  },
  Clopidogrel: {
    name: 'Clopidogrel',
    drugClass: 'P2Y12 receptor antagonist',
    therapeuticClass: 'Antithrombotic',
    mechanism: 'Irreversible P2Y12 ADP receptor blockade',
    proteinBinding: 'High (98%)',
    cyp: 'CYP2C19 (prodrug activation)',
    halfLife: '~6 hours',
  },
  Fluoxetine: {
    name: 'Fluoxetine',
    drugClass: 'SSRI',
    therapeuticClass: 'Antidepressant',
    mechanism: 'Serotonin reuptake transporter (SERT) inhibition',
    proteinBinding: 'High (94%)',
    cyp: 'CYP2D6 inhibitor',
    halfLife: '1–6 days',
  },
};

const getFallbackDrugDetail = (name: string): DrugInfo => ({
  name,
  drugClass: 'Small molecule',
  therapeuticClass: 'Therapeutic agent',
  mechanism: 'Enzymatic / receptor modulation',
  proteinBinding: 'Moderate',
  halfLife: '4–12 hours',
});

// ─── Interaction rules ────────────────────────────────────────────────────
const INTERACTION_LOOKUP: Record<string, Omit<InteractionResult, 'drugs' | 'drugDetails'>> = {
  'warfarin+aspirin': {
    riskLevel: 'HIGH',
    confidence: 94,
    interactionType: 'Pharmacodynamic',
    mechanism: 'Combined anticoagulant and antiplatelet effects significantly increase bleeding risk via additive inhibition of hemostatic pathways.',
    affectedPathway: 'Hemostasis / Platelet Aggregation',
    clinicalSignificance: 'Major – avoid combination unless benefit outweighs risk; monitor INR closely if co-prescribed.',
    features: [
      { feature: 'Anticoagulant activity', value: 91, description: 'Warfarin inhibits clotting factor synthesis via Vitamin K antagonism.' },
      { feature: 'Antiplatelet activity', value: 86, description: 'Aspirin irreversibly inhibits COX-1, blocking thromboxane A₂.' },
      { feature: 'Protein binding', value: 63, description: 'Both drugs are highly protein-bound, contributing to pharmacokinetic displacement.' },
      { feature: 'CYP involvement', value: 48, description: 'Aspirin may alter CYP2C9 metabolism of warfarin at higher doses.' },
      { feature: 'Half-life ratio', value: 32, description: "Warfarin's long half-life prolongs the interaction window." },
    ],
    recommendations: [
      'Monitor INR frequently if combination is clinically necessary.',
      'Use the lowest effective dose of aspirin (81 mg/day).',
      'Consider PPI co-prescription to reduce GI bleeding risk.',
      'Educate patient about signs of unusual bleeding.',
    ],
  },
  'metformin+ibuprofen': {
    riskLevel: 'MODERATE',
    confidence: 78,
    interactionType: 'Pharmacokinetic + Pharmacodynamic',
    mechanism: 'NSAIDs can reduce renal blood flow via prostaglandin inhibition, potentially reducing metformin clearance and increasing lactic acidosis risk.',
    affectedPathway: 'Renal Tubular Secretion / Renal Blood Flow',
    clinicalSignificance: 'Moderate – short-term NSAID use is generally tolerable; caution with prolonged use or in patients with renal impairment.',
    features: [
      { feature: 'Renal clearance dependency', value: 88, description: 'Metformin is eliminated almost entirely unchanged by the kidneys.' },
      { feature: 'Prostaglandin inhibition', value: 72, description: 'Ibuprofen reduces prostaglandin-mediated renal vasodilation.' },
      { feature: 'Organic cation transporter', value: 55, description: 'Shared OCT2/MATE transporter pathway may cause competitive inhibition.' },
      { feature: 'Protein binding', value: 12, description: 'Metformin has negligible protein binding; minimal displacement effect.' },
      { feature: 'Duration of NSAID use', value: 44, description: 'Risk scales with duration and dose of ibuprofen.' },
    ],
    recommendations: [
      'Prefer paracetamol/acetaminophen as analgesic when possible.',
      'Monitor renal function (eGFR, creatinine) with prolonged NSAID use.',
      'Ensure adequate hydration.',
      'Avoid ibuprofen in patients with CKD stage ≥3.',
    ],
  },
  'simvastatin+clarithromycin': {
    riskLevel: 'HIGH',
    confidence: 97,
    interactionType: 'Pharmacokinetic (CYP3A4)',
    mechanism: 'Clarithromycin potently inhibits CYP3A4, markedly increasing simvastatin plasma concentrations and rhabdomyolysis risk.',
    affectedPathway: 'CYP3A4 Hepatic Metabolism',
    clinicalSignificance: 'Contraindicated – statin therapy should be suspended during clarithromycin course.',
    features: [
      { feature: 'CYP3A4 inhibition', value: 97, description: 'Clarithromycin is a strong CYP3A4 inhibitor, raising simvastatin AUC up to 10-fold.' },
      { feature: 'Statin myotoxicity risk', value: 85, description: 'Elevated simvastatin concentrations increase skeletal muscle toxicity risk.' },
      { feature: 'Protein binding', value: 68, description: 'High protein binding of both drugs increases systemic exposure.' },
      { feature: 'Bioavailability change', value: 62, description: 'First-pass metabolism of simvastatin is drastically reduced.' },
      { feature: 'Renal elimination', value: 21, description: 'Minor renal pathway interaction.' },
    ],
    recommendations: [
      'Suspend simvastatin during the entire clarithromycin course.',
      'Consider azithromycin as an alternative macrolide with less CYP3A4 inhibition.',
      'Switch to pravastatin or rosuvastatin (minimal CYP3A4 metabolism) if statin therapy must continue.',
      'Monitor for myalgia, muscle weakness, and elevated CK levels.',
    ],
  },
};

// ─── Default / generic result for unknown combos ──────────────────────────
const buildGenericResult = (drugs: string[]): Omit<InteractionResult, 'drugs' | 'drugDetails'> => ({
  riskLevel: 'LOW',
  confidence: 61,
  interactionType: 'Pharmacokinetic',
  mechanism: 'No established major interaction identified in the mock database. Minor pharmacokinetic overlap may exist at shared metabolic pathways.',
  affectedPathway: 'Hepatic Metabolism / Renal Clearance',
  clinicalSignificance: 'Minor – generally safe to co-administer; standard clinical monitoring recommended.',
  features: [
    { feature: 'Protein binding overlap', value: 42, description: 'Potential for minor displacement at plasma protein binding sites.' },
    { feature: 'Metabolic pathway overlap', value: 35, description: 'Minor shared hepatic enzyme involvement.' },
    { feature: 'Renal clearance', value: 28, description: 'Limited renal interaction contribution.' },
    { feature: 'CYP involvement', value: 22, description: 'Low CYP enzyme interaction potential.' },
    { feature: 'Half-life similarity', value: 15, description: 'Similar half-lives may cause minor cumulative effects.' },
  ],
  recommendations: [
    'Standard monitoring during co-administration.',
    `Watch for unexpected effects with combined use of ${drugs.join(' and ')}.`,
    'Review patient-specific factors such as renal and hepatic function.',
  ],
});

// ─── Public helper ─────────────────────────────────────────────────────────
export function getInteractionResult(drugs: string[]): InteractionResult {
  const normalised = drugs.map((d) => d.trim().toLowerCase());
  const key = [...normalised].sort().join('+');

  const base = INTERACTION_LOOKUP[key] ?? buildGenericResult(drugs);

  const drugDetails = drugs.map((d) => {
    const cap = d.charAt(0).toUpperCase() + d.slice(1).toLowerCase();
    return (
      DRUG_DETAILS[cap] ??
      DRUG_DETAILS[d] ??
      getFallbackDrugDetail(d)
    );
  });

  return { drugs, drugDetails, ...base };
}

// ─── Example combos ────────────────────────────────────────────────────────
export const EXAMPLE_COMBOS: { label: string; drugs: string[]; risk: RiskLevel }[] = [
  { label: 'Warfarin + Aspirin', drugs: ['Warfarin', 'Aspirin'], risk: 'HIGH' },
  { label: 'Metformin + Ibuprofen', drugs: ['Metformin', 'Ibuprofen'], risk: 'MODERATE' },
  { label: 'Simvastatin + Clarithromycin', drugs: ['Simvastatin', 'Clarithromycin'], risk: 'HIGH' },
];

// ─── Model performance metrics ────────────────────────────────────────────
export const MODEL_METRICS = {
  accuracy: 92,
  precision: 90,
  recall: 89,
  f1Score: 89,
  auc: 94,
  confusionMatrix: {
    labels: ['Low', 'Moderate', 'High'],
    matrix: [
      [112, 8, 3],
      [7, 98, 11],
      [2, 9, 130],
    ],
  },
};
