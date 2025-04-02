import React from 'react';

interface InputProps {
    label: string;
    type: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
    error?: string;
    icon?: React.ReactNode;
}

const Input = ({
                   label,
                   type,
                   id,
                   name,
                   value,
                   onChange,
                   required,
                   placeholder,
                   error,
                   icon,
               }: InputProps) => {
    return (
        <div className="mb-4 text-black">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm text-black">
                {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    className={`block w-full pl-10 pr-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                />
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Input;
