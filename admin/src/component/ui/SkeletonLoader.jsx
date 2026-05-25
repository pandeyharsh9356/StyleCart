import React from 'react';

const SkeletonLoader = ({ variant = 'text-line', className = '' }) => {
    const baseStyles = 'animate-pulse bg-white/5 border border-white/10 rounded-xl overflow-hidden relative';
    
    // Shine effect overlay
    const shineEffect = (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    );

    const variants = {
        'card': 'h-[180px] w-full p-8 flex flex-col justify-between',
        'table-row': 'h-14 w-full mb-2',
        'text-line': 'h-4 w-full mb-3',
        'box': 'h-24 w-24',
        'circle': 'h-12 w-12 rounded-full',
    };

    return (
        <div className={`${baseStyles} ${variants[variant] || ''} ${className}`}>
            {shineEffect}
            {variant === 'card' && (
                <>
                    <div className="flex justify-between">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl"></div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="w-20 h-3 bg-white/5 rounded-full"></div>
                            <div className="w-24 h-6 bg-white/5 rounded-full"></div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-end justify-between">
                        <div className="w-24 h-8 bg-white/5 rounded-lg"></div>
                        <div className="w-12 h-4 bg-white/5 rounded-full"></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SkeletonLoader;
