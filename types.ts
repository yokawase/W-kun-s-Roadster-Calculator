export interface FinancialState {
  income: number;
  rent: number;
  food: number;
  utilities: number;
  social: number;
  carPrice: number;
  resaleValue: number;
  loanTerm: number;
  parking: number;
  insurance: number;
  gasTaxMaint: number;
}

export type PresetType = 'default' | 'optimized' | 'discount';

export interface CalculationResult {
  totalLifestyleCost: number;
  disposableIncome: number;
  monthlyCarCapital: number;
  monthlyCarRunning: number;
  totalCarBurden: number;
  burdenRatio: number;
  remainingFunds: number;
}