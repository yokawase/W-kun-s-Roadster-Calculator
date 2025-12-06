import React from 'react';

interface VisualBreakdownProps {
  income: number;
  lifestyle: number;
  car: number;
}

export const VisualBreakdown: React.FC<VisualBreakdownProps> = ({ income, lifestyle, car }) => {
  // Guard against division by zero
  const safeIncome = income > 0 ? income : 1;
  
  const lifestylePercent = Math.min((lifestyle / safeIncome) * 100, 100);
  const carPercent = Math.min((car / safeIncome) * 100, 100 - lifestylePercent);
  const remainingPercent = Math.max(0, 100 - lifestylePercent - carPercent);
  
  // Over budget calculation
  const totalExpense = lifestyle + car;
  const isOverBudget = totalExpense > income;
  const overBudgetPercent = isOverBudget && income > 0 ? ((totalExpense - income) / income) * 100 : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
        収支バランス可視化
      </h3>
      
      {/* Percentage Labels */}
      <div className="flex justify-between text-xs sm:text-sm font-medium text-slate-600 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-slate-400"></div>
          生活費 {Math.round(lifestylePercent)}%
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
          車関連 {Math.round(carPercent)}%
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-3 h-3 rounded-full ${remainingPercent > 0 ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
          {remainingPercent > 0 ? '残り' : '赤字'} {Math.round(remainingPercent > 0 ? remainingPercent : overBudgetPercent)}%
        </div>
      </div>

      {/* Stacked Bar */}
      <div className="relative w-full h-8 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
        {/* Lifestyle */}
        <div 
          className="h-full bg-slate-400 transition-all duration-500 ease-out flex items-center justify-center text-[10px] text-white font-bold"
          style={{ width: `${lifestylePercent}%` }}
        >
          {lifestylePercent > 10 && '生活'}
        </div>
        
        {/* Car */}
        <div 
          className="h-full bg-indigo-500 transition-all duration-500 ease-out flex items-center justify-center text-[10px] text-white font-bold relative group"
          style={{ width: `${carPercent}%` }}
        >
          {carPercent > 10 && '車'}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        </div>

        {/* Remaining / Overbudget */}
        {remainingPercent > 0 ? (
          <div 
            className="h-full bg-emerald-400 transition-all duration-500 ease-out flex items-center justify-center text-[10px] text-white font-bold"
            style={{ width: `${remainingPercent}%` }}
          >
            {remainingPercent > 10 && '貯金'}
          </div>
        ) : (
          <div className="h-full bg-red-200 w-full flex-1 animate-pulse relative">
             <div className="absolute inset-0 flex items-center justify-center text-[10px] text-red-800 font-bold">予算超過</div>
          </div>
        )}
      </div>

      {isOverBudget && (
         <p className="mt-2 text-xs text-red-500 font-bold text-right">
           ⚠️ 予算オーバーしています
         </p>
      )}
    </div>
  );
};