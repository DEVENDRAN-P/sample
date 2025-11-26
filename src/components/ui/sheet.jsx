import React, { useState } from 'react';
import { X } from 'lucide-react';

export const Sheet = ({ open, onOpenChange, children }) => {
    return (
        <div>
            {React.Children.map(children, child => {
                if (child?.type?.displayName === 'SheetTrigger') {
                    return React.cloneElement(child, { setOpen: onOpenChange });
                }
                if (child?.type?.displayName === 'SheetContent') {
                    return React.cloneElement(child, { open, onOpenChange });
                }
                return child;
            })}
        </div>
    );
};

export const SheetTrigger = React.forwardRef(({ children, setOpen, ...props }, ref) => (
    <button ref={ref} onClick={() => setOpen?.(true)} {...props}>
        {children}
    </button>
));
SheetTrigger.displayName = 'SheetTrigger';

export const SheetContent = ({ open, onOpenChange, children, ...props }) => {
    if (!open) return null;
    return (
        <>
            <div
                className="fixed inset-0 z-40 bg-black/50"
                onClick={() => onOpenChange?.(false)}
            />
            <div
                className="fixed right-0 top-0 h-screen w-80 bg-white shadow-xl z-50 flex flex-col"
                {...props}
            >
                <button
                    onClick={() => onOpenChange?.(false)}
                    className="absolute right-4 top-4 p-1"
                >
                    <X className="w-5 h-5" />
                </button>
                {children}
            </div>
        </>
    );
};

export const SheetHeader = ({ children, ...props }) => (
    <div className="flex flex-col space-y-2 text-left px-6 py-4 border-b" {...props}>
        {children}
    </div>
);

export const SheetTitle = ({ children, ...props }) => (
    <h2 className="text-lg font-semibold" {...props}>
        {children}
    </h2>
);
