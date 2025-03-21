import React from 'react';

interface ButtonProps {
    type: 'button' | 'submit' | 'reset',
    variant: 'primary' | 'secondary' | 'outline' | 'text',
    fullWidth?: boolean,
    isLoading?: boolean,
    onClick?: () => void,
    children: React.ReactNode,
    disabled?: boolean,
    className?: string
}

const Button = ({
                    type,
                    variant,
                    fullWidth,
                    isLoading,
                    onClick,
                    children,
                    disabled,
                    className
                }: ButtonProps) => {
    const baseClasses = className ? className :'py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variantClasses = variant === 'primary' ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
    const fullWidthClasses = fullWidth ? 'w-full' : '';

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses} ${fullWidthClasses}`}
            disabled={disabled || isLoading}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
};

export default Button;
