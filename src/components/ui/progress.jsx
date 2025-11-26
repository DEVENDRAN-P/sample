import React from 'react';

export const Progress = React.forwardRef(({ value = 0, className = '', ...props }, ref) => (
    <div ref={ref} className={`w-full bg-slate-200 rounded-full overflow-hidden ${className}`} {...props}>
        <div
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all"
            style={{ width: `${value}%` }}
        />
    </div>
));

Progress.displayName = 'Progress';
