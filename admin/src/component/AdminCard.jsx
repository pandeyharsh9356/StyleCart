import React from 'react';
import SkeletonLoader from './ui/SkeletonLoader';

const AdminCard = ({ title, value, icon, trend, children, className = "", loading = false }) => {
  if (loading) {
    return <SkeletonLoader variant="card" className={className} />;
  }

  return (
    <div className={`admin-card p-6 flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between">
        {title && (
          <h3 className="text-sm font-semibold text-[#A1A1A1] uppercase tracking-wider font-outfit">
            {title}
          </h3>
        )}
        {icon && (
          <div className="p-2 rounded-lg bg-white/5 text-[#4F46E5] text-xl">
            {icon}
          </div>
        )}
      </div>
      
      {value !== undefined && (
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#FAFAFA] font-outfit tracking-tight">
            {value}
          </span>
          {trend && (
            <span className={`text-xs font-medium ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {trend}
            </span>
          )}
        </div>
      )}
      
      {children}
    </div>
  );
};

export default AdminCard;
