import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import SEO from '../components/common/SEO';
import AnimatedSection from '../components/common/AnimatedSection';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email address is invalid');
      return;
    }

    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <>
      <SEO title="Forgot Password | Shri Krishna Gaushala" description="Reset your password." />
      <div className="min-h-[80vh] bg-cream-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <AnimatedSection className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center">
               <Lock className="w-8 h-8 text-saffron-600" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-heading font-extrabold text-charcoal-900">
            Forgot Password?
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" delay={0.1}>
          <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-cream-200">
            {!isSubmitted ? (
              <>
                <p className="text-sm text-charcoal-600 mb-6 text-center">
                  Enter your email address and we'll send you a reset link.
                </p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal-700">
                      Email address
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className={`focus:ring-saffron-500 focus:border-saffron-500 block w-full pl-10 sm:text-sm rounded-md py-2.5 border ${error ? 'border-red-300' : 'border-gray-300'}`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                  </div>

                  <div>
                    <button
                      type="submit" disabled={loading}
                      className="btn-primary w-full flex justify-center py-2.5"
                    >
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-medium text-charcoal-900 mb-2">Check your email!</h3>
                <p className="text-sm text-charcoal-600 mb-6">
                  We've sent a password reset link to <span className="font-semibold text-charcoal-900">{email}</span>.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-saffron-600 hover:text-saffron-500 text-sm font-medium"
                >
                  Didn't receive the email? Try again
                </button>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <Link to="/login" className="inline-flex items-center text-sm font-medium text-charcoal-600 hover:text-saffron-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
};

export default ForgotPassword;
