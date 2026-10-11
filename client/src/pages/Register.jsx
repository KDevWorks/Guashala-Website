import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Phone, AlertCircle, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/common/SEO';
import AnimatedSection from '../components/common/AnimatedSection';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const { register, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[a-z]/.test(pass)) strength += 25;
    if (/[0-9!@#$%^&*]/.test(pass)) strength += 25;
    return strength;
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Full name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!agreed) {
      errors.agreed = 'You must agree to the Terms & Conditions';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      await register(formData.name, formData.email, formData.phone, formData.password);
      toast.success('Registration successful! Welcome.');
      navigate('/profile');
    } catch (error) {
      toast.error(error.message || 'Failed to register. Please try again.');
      setFormErrors({ form: error.message || 'An error occurred during registration' });
    }
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <>
      <SEO title="Register | Shri Krishna Gaushala" description="Create an account to join our community." />
      <div className="min-h-screen bg-cream-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('/pattern.png')] bg-repeat">
        <AnimatedSection className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center">
               <ShieldCheck className="w-8 h-8 text-forest-600" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-heading font-extrabold text-charcoal-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-charcoal-600">
            Join our community of supporters
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" delay={0.1}>
          <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-cream-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-forest-500 to-forest-400"></div>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              {formErrors.form && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-start text-sm">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{formErrors.form}</p>
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-charcoal-700">Full Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name" name="name" type="text" value={formData.name} onChange={handleChange}
                    className={`focus:ring-forest-500 focus:border-forest-500 block w-full pl-10 sm:text-sm rounded-md py-2.5 border ${formErrors.name ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Jane Doe"
                  />
                </div>
                {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal-700">Email address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                    className={`focus:ring-forest-500 focus:border-forest-500 block w-full pl-10 sm:text-sm rounded-md py-2.5 border ${formErrors.email ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="you@example.com"
                  />
                </div>
                {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-charcoal-700">Phone Number (India)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                    className={`focus:ring-forest-500 focus:border-forest-500 block w-full pl-10 sm:text-sm rounded-md py-2.5 border ${formErrors.phone ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="9876543210"
                  />
                </div>
                {formErrors.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-charcoal-700">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange}
                    className={`focus:ring-forest-500 focus:border-forest-500 block w-full pl-10 pr-10 sm:text-sm rounded-md py-2.5 border ${formErrors.password ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-500">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {formData.password && (
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${strength <= 25 ? 'bg-red-500' : strength <= 50 ? 'bg-yellow-500' : strength <= 75 ? 'bg-blue-500' : 'bg-green-500'}`} 
                      style={{ width: `${strength}%` }}
                    ></div>
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500">Min 8 chars, uppercase, lowercase, number</p>
                {formErrors.password && <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-charcoal-700">Confirm Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange}
                    className={`focus:ring-forest-500 focus:border-forest-500 block w-full pl-10 sm:text-sm rounded-md py-2.5 border ${formErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="••••••••"
                  />
                </div>
                {formErrors.confirmPassword && <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreed" name="agreed" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                    className="h-4 w-4 text-forest-600 focus:ring-forest-500 border-gray-300 rounded cursor-pointer"
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label htmlFor="agreed" className="text-charcoal-700 cursor-pointer">
                    I agree to the <a href="#" className="text-forest-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-forest-600 hover:underline">Privacy Policy</a>
                  </label>
                  {formErrors.agreed && <p className="mt-1 text-sm text-red-600">{formErrors.agreed}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-secondary w-full flex justify-center py-2.5"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-charcoal-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-forest-600 hover:text-forest-500">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
};

export default Register;
