import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import SEO from '../components/common/SEO';
import AnimatedSection from '../components/common/AnimatedSection';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[a-z]/.test(pass)) strength += 25;
    if (/[0-9!@#$%^&*]/.test(pass)) strength += 25;
    return strength;
  };

  const strength = getPasswordStrength(password);

  const validate = () => {
    const newErrors = {};
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      toast.success('Password reset successfully!');
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <SEO title="Reset Password | Shri Krishna Gaushala" description="Set your new password." />
      <div className="min-h-[80vh] bg-cream-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <AnimatedSection className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center">
               <Lock className="w-8 h-8 text-saffron-600" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-heading font-extrabold text-charcoal-900">
            Reset Your Password
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" delay={0.1}>
          <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-cream-200">
            {!isSuccess ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-charcoal-700">New Password</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                      className={`focus:ring-saffron-500 focus:border-saffron-500 block w-full pl-10 pr-10 sm:text-sm rounded-md py-2.5 border ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-500">
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  {password && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${strength <= 25 ? 'bg-red-500' : strength <= 50 ? 'bg-yellow-500' : strength <= 75 ? 'bg-blue-500' : 'bg-green-500'}`} 
                        style={{ width: `${strength}%` }}
                      ></div>
                    </div>
                  )}
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-charcoal-700">Confirm New Password</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`focus:ring-saffron-500 focus:border-saffron-500 block w-full pl-10 sm:text-sm rounded-md py-2.5 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>

                <div>
                  <button
                    type="submit" disabled={loading}
                    className="btn-primary w-full flex justify-center py-2.5"
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-medium text-charcoal-900 mb-2">Password reset successfully!</h3>
                <p className="text-sm text-charcoal-600 mb-6">
                  Redirecting to login page...
                </p>
                <Link to="/login" className="btn-primary inline-flex justify-center w-full py-2.5">
                  Go to Login Now
                </Link>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </>
  );
};

export default ResetPassword;
