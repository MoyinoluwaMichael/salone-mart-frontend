import React, { useState } from 'react'
import { FacebookIcon, GithubIcon } from 'lucide-react';
import Input from '../ui/userAuth/Input';
import  Button from '../ui/userAuth/Button';


interface LoginProps {
  onLogin: () => void
  onNavigate: (page: string) => void
}

 const  LoginForm = ({ onLogin, onNavigate }: LoginProps)=> {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate and authenticate here
    onLogin()
  }
  return (
    <div className="w-full max-w-md mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
          />
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-[#FF9900] focus:ring-[#FF9900] border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-[#FF9900] hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <Button type="submit" variant="primary" fullWidth>
            Sign In
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <FacebookIcon size={20} />
            </button>
            <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <FacebookIcon size={20} />
            </button>
            <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <GithubIcon size={20} />
            </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-[#FF9900] hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Are you a seller?{' '}
            <button
              onClick={() => onNavigate('sellerRegister')}
              className="text-[#FF9900] hover:underline font-medium"
            >
              Register as seller
            </button>
          </p>
        </div>
      </div>
    </div>
  )
};

export default LoginForm;


//  403 or 401 = Expired session