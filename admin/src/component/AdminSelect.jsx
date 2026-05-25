import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const AdminSelect = ({ options, value, onChange, label, className = "", icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption = options.find(opt => opt.value === value) || options[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (val) => {
        onChange({ target: { value: val } });
        setIsOpen(false);
    };

    return (
        <div className={`relative w-full ${className}`} ref={dropdownRef}>
            {label && (
                <label className='text-[10px] font-black text-[#888] uppercase tracking-[2px] ml-1 mb-3 block'>
                    {label}
                </label>
            )}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-14 bg-[#050505] border ${isOpen ? 'border-[#4F46E5]' : 'border-white/10'} rounded-2xl px-6 flex items-center justify-between cursor-pointer hover:bg-white/[0.04] transition-all shadow-2xl relative z-10`}
            >
                <div className='flex items-center gap-3'>
                    {icon && <span className='text-[#4F46E5]'>{icon}</span>}
                    <span className='text-[#FAFAFA] text-[10px] font-black uppercase tracking-[3px] truncate'>
                        {selectedOption.label}
                    </span>
                </div>
                <FiChevronDown className={`text-[#4F46E5] text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <div className='absolute left-0 right-0 top-[calc(100%+8px)] bg-[#0A0A0A] border border-white/10 rounded-2xl p-2 z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200'>
                    <div className='max-h-[250px] overflow-y-auto custom-scrollbar'>
                        {options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-[2px] cursor-pointer transition-all mb-1 last:mb-0 ${
                                    value === option.value 
                                    ? 'bg-[#4F46E5] text-white' 
                                    : 'text-[#888] hover:bg-white/5 hover:text-[#FAFAFA]'
                                }`}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSelect;
