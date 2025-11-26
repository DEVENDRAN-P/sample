import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({ value, onValueChange, children, ...props }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative" {...props}>
            {React.Children.map(children, child => {
                if (child?.type?.displayName === 'SelectTrigger') {
                    return React.cloneElement(child, { open, setOpen });
                }
                if (child?.type?.displayName === 'SelectContent') {
                    return React.cloneElement(child, { open, value, onValueChange });
                }
                return child;
            })}
        </div>
    );
};

export const SelectTrigger = React.forwardRef(({ children, open, setOpen, className = '', ...props }, ref) => (
    <button
        ref={ref}
        onClick={() => setOpen?.(!open)}
        className={`flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ${className}`}
        {...props}
    >
        {children}
        <ChevronDown className="w-4 h-4 opacity-50" />
    </button>
));
SelectTrigger.displayName = 'SelectTrigger';

export const SelectValue = ({ placeholder, children, ...props }) => (
    <span {...props}>{children || placeholder}</span>
);

export const SelectContent = ({ children, open, value, onValueChange, ...props }) => {
    if (!open) return null;

    return (
        <div
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg z-50"
            {...props}
        >
            {React.Children.map(children, child =>
                child ? React.cloneElement(child, { value, onValueChange }) : null
            )}
        </div>
    );
};

export const SelectItem = ({ value, children, onValueChange, ...props }) => (
    <button
        onClick={() => {
            onValueChange?.(value);
        }}
        className="w-full text-left px-3 py-2 hover:bg-slate-100 transition-colors text-sm"
        {...props}
    >
        {children}
    </button>
);
