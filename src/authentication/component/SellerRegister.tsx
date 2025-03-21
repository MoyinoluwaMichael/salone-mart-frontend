import React, { useState } from 'react'
import Input from '../../common/Input';
import  Button from '../../common/Button';
import { BuildingIcon, BriefcaseIcon, UserIcon } from 'lucide-react';


interface SellerRegisterProps {
  onNavigate: (page: string) => void
}
const  SellerRegister = ({ onNavigate }: SellerRegisterProps) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Business Info
    businessName: '',
    businessType: '',
    taxId: '',
    website: '',
    // Address Info
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  })
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // In a real app, you would submit the form data here
      onNavigate('login')
    }
  }
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div
          className={`flex items-center ${step >= 1 ? 'text-[#FF9900]' : 'text-gray-400'}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-[#FF9900] bg-[#FFF5E6]' : 'border-gray-300'}`}
          >
            <UserIcon size={16} />
          </div>
          <span className="ml-2 text-sm font-medium">Personal</span>
        </div>
        <div
          className={`w-12 h-0.5 mx-2 ${step >= 2 ? 'bg-[#FF9900]' : 'bg-gray-300'}`}
        ></div>
        <div
          className={`flex items-center ${step >= 2 ? 'text-[#FF9900]' : 'text-gray-400'}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-[#FF9900] bg-[#FFF5E6]' : 'border-gray-300'}`}
          >
            <BriefcaseIcon size={16} />
          </div>
          <span className="ml-2 text-sm font-medium">Business</span>
        </div>
        <div
          className={`w-12 h-0.5 mx-2 ${step >= 3 ? 'bg-[#FF9900]' : 'bg-gray-300'}`}
        ></div>
        <div
          className={`flex items-center ${step >= 3 ? 'text-[#FF9900]' : 'text-gray-400'}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-[#FF9900] bg-[#FFF5E6]' : 'border-gray-300'}`}
          >
            <BuildingIcon size={16} />
          </div>
          <span className="ml-2 text-sm font-medium">Address</span>
        </div>
      </div>
    )
  }
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
                type="text"
              />
              <Input
                label="Last Name"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
                type="text"
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
            />
            <Input
              label="Phone Number"
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+1 (555) 123-4567"
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
            <Input
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </>
        )
      case 2:
        return (
          <>
            <h3 className="text-lg font-medium mb-4">Business Information</h3>
            <Input
              label="Business Name"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
              placeholder="Your Business Name"
              type="text"
            />
            <div className="mb-4">
              <label
                htmlFor="businessType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business Type <span className="text-red-500">*</span>
              </label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
              >
                <option value="">Select Business Type</option>
                <option value="sole_proprietor">Sole Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="llc">LLC</option>
                <option value="corporation">Corporation</option>
                <option value="other">Other</option>
              </select>
            </div>
            <Input
              label="Tax ID / Business Registration Number"
              id="taxId"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              required
              placeholder="Tax ID / Registration Number"
              type="text"
            />
            <Input
              label="Business Website (optional)"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourbusiness.com"
              type="text"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Documents
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-[#FF9900] hover:text-[#e68a00]"
                    >
                      <span>Upload files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Upload business registration, tax documents, ID proof
                  </p>
                </div>
              </div>
            </div>
          </>
        )
      case 3:
        return (
          <>
            <h3 className="text-lg font-medium mb-4">Business Address</h3>
            <Input
              label="Street Address"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="123 Business St"
              type="text"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="City"
                type="text"
              />
              <Input
                label="State / Province"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="State"
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Postal / Zip Code"
                id="zipCode"
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                placeholder="Zip Code"
              />
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                >
                  <option value="">Select Country</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="au">Australia</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-[#FF9900] focus:ring-[#FF9900] border-gray-300 rounded"
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the{' '}
                  <a href="#" className="text-[#FF9900] hover:underline">
                    Terms of Service
                  </a>
                  ,{' '}
                  <a href="#" className="text-[#FF9900] hover:underline">
                    Seller Agreement
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#FF9900] hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Seller Registration
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Join our marketplace and start selling your products
        </p>
        {renderStepIndicator()}
        <form onSubmit={handleSubmit}>
          {renderStepContent()}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            )}
            <div className={step === 1 ? 'w-full' : ''}>
              <Button type="submit" variant="primary" fullWidth={step === 1}>
                {step < 3 ? 'Continue' : 'Submit Application'}
              </Button>
            </div>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have a seller account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-[#FF9900] hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}



export default SellerRegister;
