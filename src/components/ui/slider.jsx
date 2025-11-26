import React from 'react';

export const Slider = React.forwardRef(({ value = [0], onValueChange, min = 0, max = 100, step = 1, className = '', ...props }, ref) => {
    const handleChange = (e) => {
        onValueChange([Number(e.target.value)]);
    };

    return (
        <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={handleChange}
            className={`w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 ${className}`}
            {...props}
        />
    );
});

Slider.displayName = 'Slider';
