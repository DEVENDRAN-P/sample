import React from 'react';

export const Button = React.forwardRef(({ className = '', ...props }, ref) => (
    <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
    />
));

Button.displayName = 'Button';

Button.defaultProps = {
    variant: 'default',
    size: 'md',
};
