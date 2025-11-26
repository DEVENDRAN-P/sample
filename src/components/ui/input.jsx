import React from 'react';

export const Input = React.forwardRef(({ className = '', ...props }, ref) => (
    <input
        ref={ref}
        className={`w-full px-3 py-2 border border-slate-200 rounded-md bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${className}`}
        {...props}
    />
));

Input.displayName = 'Input';
