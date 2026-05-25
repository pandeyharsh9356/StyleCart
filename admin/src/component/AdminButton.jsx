import React from 'react';

const AdminButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button', 
  icon: Icon, 
  className = "",
  disabled = false,
  loading = false
}) => {
  const baseStyles = "admin-btn gap-2 min-w-[120px]";
  
  const variants = {
    primary: "admin-btn-primary",
    ghost: "admin-btn-ghost",
    destructive: "bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 hover:border-red-500/40"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon && (
        <Icon className="text-lg" />
      )}
      <span>{children}</span>
    </button>
  );
};

export default AdminButton;
