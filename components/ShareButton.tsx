import React, { useState } from 'react';
import { Share2, Check, Link as LinkIcon } from 'lucide-react';
import { FinancialState } from '../types.ts';

interface ShareButtonProps {
  state: FinancialState;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ state }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Generate URL with query parameters
    const params = new URLSearchParams();
    (Object.keys(state) as Array<keyof FinancialState>).forEach(key => {
      params.set(key, state[key].toString());
    });
    
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    const shareData = {
      title: 'W君のロードスター購入判定機',
      text: `私のロードスター購入判定結果！手取り${Math.round(state.income/10000)}万円でもいける？ #ロードスター判定機`,
      url: shareUrl,
    };

    // Try Web Share API first (Mobile)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        console.log('Share canceled or failed', err);
      }
    }

    // Fallback to Clipboard (Desktop)
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
      alert('URLのコピーに失敗しました。手動でコピーしてください:\n' + shareUrl);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`
        w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-white transition-all duration-200 shadow-md
        ${copied ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}
      `}
    >
      {copied ? (
        <>
          <Check className="w-5 h-5" />
          URLをコピーしました！
        </>
      ) : (
        <>
          <Share2 className="w-5 h-5" />
          結果をシェアする
        </>
      )}
    </button>
  );
};