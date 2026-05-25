import React from 'react';

const AdminButton = ({ 
  children, 
  onClick, 
  type = "button", 
  loading = false, 
  disabled = false, 
  variant = "primary",
  className = "",
  icon: Icon
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-[#4F46E5] to-[#A855F7] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)]",
    secondary: "bg-white/5 border border-white/10 hover:bg-white/10",
    danger: "bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden group w-full h-14 rounded-2xl 
        flex items-center justify-center gap-3 transition-all duration-500
        text-[11px] font-black uppercase tracking-[2px] font-outfit
        active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {loading ? (
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span className="animate-pulse">Processing Protocol...</span>
        </div>
      ) : (
        <>
          {Icon && <Icon className="text-lg transition-transform group-hover:scale-110" />}
          {children}
        </>
      )}
    </button>
  );
};

export default AdminButton;
