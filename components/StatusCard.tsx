import React from 'react';
import { TriangleAlert, CircleCheck, CircleX } from 'lucide-react';

interface StatusCardProps {
  burdenRatio: number;
}

export const StatusCard: React.FC<StatusCardProps> = ({ burdenRatio }) => {
  let statusColor = "";
  let statusBg = "";
  let borderColor = "";
  let statusMessage = "";
  let StatusIcon = CircleCheck;

  if (burdenRatio <= 30) {
    statusColor = "text-emerald-800";
    statusBg = "bg-emerald-50";
    borderColor = "border-emerald-200";
    statusMessage = "【安全圏】 健全な趣味の範囲です。貯金もしながら楽しめます。GO！";
    StatusIcon = CircleCheck;
  } else if (burdenRatio <= 40) {
    statusColor = "text-yellow-800";
    statusBg = "bg-yellow-50";
    borderColor = "border-yellow-200";
    statusMessage = "【注意圏】 少し節約が必要です。他の贅沢を削れば維持可能です。";
    StatusIcon = TriangleAlert;
  } else {
    statusColor = "text-red-800";
    statusBg = "bg-red-50";
    borderColor = "border-red-200";
    statusMessage = "【危険水域】 家計破綻のリスクが高いです。駐車場か保険を見直してください！";
    StatusIcon = CircleX;
  }

  return (
    <div className={`border-l-4 rounded-r p-4 ${statusBg} ${borderColor} shadow-sm transition-all duration-300`}>
      <div className="flex items-start gap-3">
        <StatusIcon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${statusColor.replace('800', '600')}`} />
        <div>
          <h3 className={`font-bold text-lg ${statusColor}`}>判定結果</h3>
          <p className={`${statusColor} text-sm mt-1 leading-relaxed`}>{statusMessage}</p>
        </div>
      </div>
    </div>
  );
};