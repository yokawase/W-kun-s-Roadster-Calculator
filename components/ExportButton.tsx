import React from 'react';
import { Download } from 'lucide-react';
import { FinancialState, CalculationResult } from '../types.ts';

interface ExportButtonProps {
  state: FinancialState;
  results: CalculationResult;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ state, results }) => {
  const handleExport = () => {
    // Prepare data for CSV
    const data = [
      { label: '手取り月収', value: state.income },
      { label: '家賃', value: state.rent },
      { label: '食費', value: state.food },
      { label: '光熱費・通信費', value: state.utilities },
      { label: '交際費・その他', value: state.social },
      { label: '生活費合計', value: results.totalLifestyleCost },
      { label: '可処分所得', value: results.disposableIncome },
      
      { label: '車両本体価格', value: state.carPrice },
      { label: '3年後リセール', value: state.resaleValue },
      { label: 'ローン期間(ヶ月)', value: state.loanTerm },
      { label: '駐車場代', value: state.parking },
      { label: '任意保険(月額)', value: state.insurance },
      { label: 'ガソリン・整備', value: state.gasTaxMaint },
      
      { label: '車両償却(月額)', value: results.monthlyCarCapital },
      { label: 'ランニングコスト(月額)', value: results.monthlyCarRunning },
      { label: '車関連支出計', value: results.totalCarBurden },
      { label: '負担比率(%)', value: results.burdenRatio >= 999 ? '測定不能' : results.burdenRatio.toFixed(2) },
      { label: '最終手残り', value: results.remainingFunds },
    ];

    // Create CSV content with BOM for Excel compatibility
    const headers = data.map(d => d.label).join(',');
    const values = data.map(d => d.value).join(',');
    const csvContent = `\uFEFF${headers}\n${values}`;

    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `roadster_sim_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all duration-200 shadow-sm"
    >
      <Download className="w-5 h-5 text-slate-500" />
      CSVで保存
    </button>
  );
};