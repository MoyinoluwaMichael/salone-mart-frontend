import React, { useState } from 'react';
import Input from '../ui/userAuth/Input';
import Button from '../ui/userAuth/Button';
import google from '../../assets/google.svg';
import { FacebookIcon, GithubIcon, Mail, User, Phone, Lock, Check, AlertCircle, X } from 'lucide-react';
import { registerACustomer, login } from "@/service/authenticationService";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Register = ({ onNavigate }: any) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formStep, setFormStep] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Password strength indicator
  const getPasswordStrength = (password: string): { strength: number; message: string } => {
    if (!password) return { strength: 0, message: '' };
    if (password.length < 6) return { strength: 1, message: 'Weak' };
    if (password.length < 10) return { strength: 2, message: 'Medium' };
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      return { strength: 4, message: 'Strong' };
    }
    return { strength: 3, message: 'Good' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user makes changes
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // Clear API error when user makes any change
    if (apiError) {
      setApiError(null);
    }
  };

  const validateForm = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (formData.phone && !/^\+?[0-9\s\-()]{10,}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number is invalid';
      }
    } else if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!agreedToTerms) {
        newErrors.terms = 'You must agree to the terms';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStepChange = (step: number) => {
    if (step > formStep && !validateForm(formStep)) return;
    setFormStep(step);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formStep)) return;

    setIsSubmitting(true);
    setApiError(null);

    try {
      const customerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.email,
        phoneNumber: formData.phone,
        password: formData.password,
      };

      await registerACustomer(customerData);

      const loginRequest = {
        email: formData.email,
        password: formData.password,
      };

      await login(loginRequest);
      navigate('/');
    } catch (error: any) {
      console.error('Registration failed:', error);
      // Handle API error gracefully
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else if (error.message) {
        setApiError(error.message);
      } else {
        setApiError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="w-full max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
          {/* Decorative header with gradient animation */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-300 via-orange-500 to-amber-300 animate-pulse" style={{ animationDuration: '3s' }}></div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create Account
          </h2>

          {/* API Error message with animation */}
          <AnimatePresence>
            {apiError && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-start gap-2"
                >
                  <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                  <div className="flex-grow">
                    <p className="font-medium mb-1">Registration failed</p>
                    <p className="text-sm">{apiError}</p>
                  </div>
                  <button
                      onClick={() => setApiError(null)}
                      className="p-1 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
            )}
          </AnimatePresence>

          {/* Progress indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                      formStep >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
              >
                {formStep > 1 ? <Check size={16} /> : '1'}
              </div>
              <div className={`w-10 h-1 transition-all duration-500 ${formStep >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
              <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                      formStep >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
              >
                {formStep > 2 ? <Check size={16} /> : '2'}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Info */}
            <div className={`transition-opacity duration-500 ${formStep === 1 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <div className="grid grid-cols-2 gap-4">
                <Input
                    label="First Name"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="John"
                    error={errors.firstName}
                    icon={<User size={18} />}
                    type='text'
                />
                <Input
                    label="Last Name"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Doe"
                    error={errors.lastName}
                    icon={<User size={18} />}
                    type='text'
                />
              </div>
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
                  label="Phone Number"
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  error={errors.phone}
                  icon={<Phone size={18} />}
              />

              <div className="mt-8">
                <Button
                    type="button"
                    variant="primary"
                    fullWidth
                    onClick={() => handleStepChange(2)}
                    disabled={isSubmitting}
                >
                  Continue
                </Button>
              </div>
            </div>

            {/* Step 2: Security */}
            <div className={`transition-opacity duration-500 ${formStep === 2 ? 'opacity-100' : 'opacity-0 hidden'} text-black`}>
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

              {/* Password strength indicator */}
              {formData.password && (
                  <div className="mb-4 mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-gray-500">Password strength</span>
                      <span className={`text-xs font-medium ${
                          passwordStrength.strength <= 1 ? 'text-red-500' :
                              passwordStrength.strength === 2 ? 'text-amber-500' :
                                  passwordStrength.strength === 3 ? 'text-green-500' : 'text-emerald-500'
                      }`}>
                    {passwordStrength.message}
                  </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                          className={`h-full transition-all duration-300 ${
                              passwordStrength.strength <= 1 ? 'bg-red-500' :
                                  passwordStrength.strength === 2 ? 'bg-amber-500' :
                                      passwordStrength.strength === 3 ? 'bg-green-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${passwordStrength.strength * 25}%` }}
                      ></div>
                    </div>
                  </div>
              )}

              <Input
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  error={errors.confirmPassword}
                  icon={<Lock size={18} />}
              />

              <div className="mb-6 mt-4">
                <div className="flex items-center">
                  <input
                      id="terms"
                      type="checkbox"
                      className="h-5 w-5 text-orange-500 focus:ring-orange-500 border-gray-300 rounded transition-colors duration-200"
                      checked={agreedToTerms}
                      onChange={() => setAgreedToTerms(!agreedToTerms)}
                  />
                  <label
                      htmlFor="terms"
                      className="ml-3 block text-sm text-gray-700"
                  >
                    I agree to the{' '}
                    <a href="#" className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-colors duration-200">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-colors duration-200">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.terms && (
                    <p className="mt-1 text-xs text-red-500 flex items-center">
                      <AlertCircle size={12} className="mr-1" /> {errors.terms}
                    </p>
                )}
              </div>

              <div className="flex space-x-3 mt-8">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleStepChange(1)}
                    disabled={isSubmitting}
                >
                  Back
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={isSubmitting}
                >
                  {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating Account...
                      </div>
                  ) : (
                      'Create Account'
                  )}
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">
                Or sign up with
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

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-colors duration-200"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
  );
};

export default Register;
