import React, { useState } from 'react';
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/common/SEO';
import AnimatedSection from '../components/common/AnimatedSection';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      await login(email, password);
      toast.success('Logged in successfully');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Failed to login. Please check your credentials.');
      setFormErrors({ form: error.message || 'Invalid email or password' });
    }
  };

  return (
    <>
      <SEO title="Login | Shri Krishna Gaushala" description="Sign in to your Gaushala account." />
      <div className="min-h-[80vh] bg-cream-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('/pattern.png')] bg-repeat">
        <AnimatedSection className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center">
               <Lock className="w-8 h-8 text-saffron-600" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-heading font-extrabold text-charcoal-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-charcoal-600">
            Sign in to your account
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" delay={0.1}>
          <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-cream-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-saffron-500 to-golden-500"></div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {formErrors.form && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-start text-sm">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{formErrors.form}</p>
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`focus:ring-saffron-500 focus:border-saffron-500 block w-full pl-10 sm:text-sm rounded-md py-2.5 border ${formErrors.email ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="you@example.com"
                  />
                </div>
                {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-charcoal-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`focus:ring-saffron-500 focus:border-saffron-500 block w-full pl-10 pr-10 sm:text-sm rounded-md py-2.5 border ${formErrors.password ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Eye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
                {formErrors.password && <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-saffron-600 focus:ring-saffron-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-charcoal-700 cursor-pointer">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-saffron-600 hover:text-saffron-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex justify-center py-2.5"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-charcoal-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-saffron-600 hover:text-saffron-500">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
};

export default Login;
