import React from 'react'


interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  fullWidth?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}


 const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) =>{
  const baseClasses =
    'px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center'
  const variantClasses = {
    primary: 'bg-[#FF9900] hover:bg-[#e68a00] text-white',
    secondary: 'bg-[#232F3E] hover:bg-[#37475A] text-white',
    outline: 'border border-[#232F3E] text-[#232F3E] hover:bg-gray-100',
    text: 'text-[#232F3E] hover:bg-gray-100',
  }
  const widthClass = fullWidth ? 'w-full' : ''
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}


export default Button;