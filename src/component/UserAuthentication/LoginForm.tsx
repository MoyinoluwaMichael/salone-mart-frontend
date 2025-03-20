import React, { useState } from 'react';
import { FacebookIcon, GithubIcon, Mail, Lock, AlertCircle } from 'lucide-react';
import Input from '../ui/userAuth/Input';
import google from '../../assets/google.svg';
import Button from '../ui/userAuth/Button';
import {login} from "@/service/authenticationService";
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin, onNavigate }: any) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgotEmail(e.target.value);
  };

  const handleSubmitForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setErrors({ forgotEmail: 'Please enter a valid email' });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call for password reset
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowForgotPassword(false);
      // Show success message (in real app this would be a toast or alert)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const loginRequest = {
        email: formData.email,
        password: formData.password,
      };
      await login(loginRequest);
      onLogin();
      navigate('/');
    } catch (error) {
      setErrors({ general: 'Invalid email or password' });
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="w-full max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
          {/* Decorative header with gradient animation */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-300 via-orange-500 to-amber-300 animate-pulse" style={{ animationDuration: '3s' }}></div>

          {showForgotPassword ? (
              <>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                  Reset Password
                </h2>
                <p className="text-gray-600 text-sm mb-6 text-center">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <form onSubmit={handleSubmitForgotPassword}>
                  <Input
                      label="Email"
                      type="email"
                      id="forgotEmail"
                      name="forgotEmail"
                      value={forgotEmail}
                      onChange={handleForgotEmail}
                      required
                      placeholder="your@email.com"
                      error={errors.forgotEmail}
                      icon={<Mail size={18} />}
                  />

                  <div className="flex space-x-3 mt-8">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setShowForgotPassword(false)}
                    >
                      Back to Login
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        isLoading={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                  </div>
                </form>
              </>
          ) : (
              <>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                  Sign In
                </h2>

                {errors.general && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 text-sm">
                      <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                      {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                      label="Email"
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      error={errors.email}
                      icon={<Mail size={18} />}
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
                      error={errors.password}
                      icon={<Lock size={18} />}
                  />

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                          id="remember"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                          className="h-5 w-5 text-orange-500 focus:ring-orange-500 border-gray-300 rounded transition-colors duration-200"
                      />
                      <label
                          htmlFor="remember"
                          className="ml-3 block text-sm text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>
                    <button
                        type="button"
                        className="text-sm text-orange-500 hover:text-orange-600 font-medium hover:underline transition-colors duration-200"
                        onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="pt-4">
                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        isLoading={isSubmitting}
                    >
                      {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </div>
                </form>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">
                    Or continue with
                  </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:-translate-y-1">
                      <FacebookIcon size={20} className="text-blue-600" />
                    </button>
                    <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:-translate-y-1">
                      <img src={google} alt="Google" className="w-5 h-5" />
                    </button>
                    <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:-translate-y-1">
                      <GithubIcon size={20} />
                    </button>
                  </div>
                </div>

                <div className="mt-6 text-center space-y-3">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        onClick={() => onNavigate('register')}
                        className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-colors duration-200"
                    >
                      Sign up
                    </button>
                  </p>
                  <p className="text-sm text-gray-600">
                    Are you a seller?{' '}
                    <button
                        type="button"
                        onClick={() => onNavigate('sellerRegister')}
                        className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-colors duration-200"
                    >
                      Register as seller
                    </button>
                  </p>
                </div>
              </>
          )}
        </div>
      </div>
  );
};

export default LoginForm;
