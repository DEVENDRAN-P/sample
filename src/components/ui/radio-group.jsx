import React from 'react';

export const RadioGroup = React.forwardRef(({ value, onValueChange, className = '', children, ...props }, ref) => (
    <div
        ref={ref}
        role="radiogroup"
        className={`flex flex-col gap-2 ${className}`}
        {...props}
    >
        {React.Children.map(children, child =>
            child ? React.cloneElement(child, { value, onValueChange }) : null
        )}
    </div>
));

RadioGroup.displayName = 'RadioGroup';

export const RadioGroupItem = ({ value, checked, onValueChange, className = '', ...props }) => (
    <label className="flex items-center gap-2 cursor-pointer">
        <input
            type="radio"
            value={value}
            checked={checked}
            onChange={() => onValueChange?.(value)}
            className="w-4 h-4 accent-emerald-500"
            {...props}
        />
    </label>
);

RadioGroupItem.displayName = 'RadioGroupItem';
