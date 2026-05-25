import React from 'react';

const AdminInput = ({ 
  label, 
  icon: Icon, 
  type = "text", 
  placeholder = " ", 
  value, 
  onChange, 
  required = false, 
  error,
  className = "",
  rightElement
}) => {
  return (
    <div className={`w-full relative ${className}`}>
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#333] group-focus-within:text-[#4F46E5] transition-colors duration-300 z-10 pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            peer w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl outline-none 
            text-[#FAFAFA] text-sm font-medium transition-all duration-500
            placeholder:text-transparent focus:bg-white/[0.05] focus:border-[#4F46E5]/40
            pt-6 pb-2
            ${Icon ? 'pl-12' : 'pl-6'}
            ${rightElement ? 'pr-12' : 'pr-6'}
            ${error ? 'border-red-500/50 focus:border-red-500' : ''}
          `}
        />

        {label && (
          <label 
            className={`
              absolute transition-all duration-300 pointer-events-none uppercase font-black tracking-[2px]
              ${Icon ? 'left-12' : 'left-6'}
              text-[#444] text-[9px] top-2.5
              peer-placeholder-shown:text-xs 
              peer-placeholder-shown:top-[22px] 
              peer-placeholder-shown:text-[#555]
              peer-focus:top-2.5 
              peer-focus:text-[9px] 
              peer-focus:text-[#4F46E5]
            `}
          >
            {label}
          </label>
        )}

        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
            {rightElement}
          </div>
        )}
        
        {/* Border Glow Effect */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent peer-focus:border-[#4F46E5]/20 peer-focus:shadow-[0_0_25px_rgba(79,70,229,0.08)] transition-all duration-500"></div>
      </div>
      {error && <p className="text-[9px] font-bold text-red-500 uppercase tracking-wider ml-1 mt-2">{error}</p>}
    </div>
  );
};

export default AdminInput;
