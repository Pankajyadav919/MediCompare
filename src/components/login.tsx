import { useState, useRef, useEffect } from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  setIsAuthenticated: (value: boolean) => void;
}

const LoginPage = ({ setIsAuthenticated }: LoginPageProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    submit: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      navigate('/');
    }
  }, [navigate, setIsAuthenticated]);

  // Handle floating label focus
  const handleFocus = (field: 'email' | 'password') => {
    const label = field === 'email' 
      ? emailRef.current?.parentElement?.querySelector('.floating-label')
      : passwordRef.current?.parentElement?.querySelector('.floating-label');
    
    if (label) {
      label.classList.add('text-[#d4af37]', 'font-semibold');
    }
  };

  // Handle floating label blur
  const handleBlur = (field: 'email' | 'password') => {
    const input = field === 'email' ? emailRef.current : passwordRef.current;
    const label = input?.parentElement?.querySelector('.floating-label');
    
    if (label && !input?.value) {
      label.classList.remove('text-[#d4af37]', 'font-semibold');
    }
  };

  // Initialize floating labels
  useEffect(() => {
    if (emailRef.current?.value) {
      emailRef.current.parentElement?.querySelector('.floating-label')?.classList.add('text-[#d4af37]', 'font-semibold');
    }
    if (passwordRef.current?.value) {
      passwordRef.current.parentElement?.querySelector('.floating-label')?.classList.add('text-[#d4af37]', 'font-semibold');
    }
  }, []);

  // Validate form fields
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      case 'password':
        if (!value) {
          return 'Password is required';
        }
        return '';
      default:
        return '';
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(prev => ({ ...prev, submit: '' }));

    // Validate all fields
    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
      submit: ''
    };

    setErrors(newErrors);

    // Check if there are any validation errors
    if (Object.values(newErrors).some(error => error !== '')) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/logindata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store the token in localStorage
      localStorage.setItem('token', data.data.token);
      
      // Update authentication state
      setIsAuthenticated(true);
      
      // Redirect to home page
      navigate('/');
      
      // Reload the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'An error occurred during login'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle ripple effect
  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - (button.getBoundingClientRect().left + radius)}px`;
    circle.style.top = `${e.clientY - (button.getBoundingClientRect().top + radius)}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    setTimeout(() => {
      const ripple = e.currentTarget.getElementsByClassName('ripple')[0];
      if (ripple) {
        ripple.remove();
      }
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f5f3ee] to-white p-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-full h-full top-0 left-0 opacity-[0.03] z-0 pointer-events-none">
        <FaQuoteLeft className="absolute text-[25vw] text-[#003366] top-[10%] left-[5%] animate-float" />
        <FaQuoteRight className="absolute text-[25vw] text-[#003366] bottom-[10%] right-[5%] animate-float animation-delay-[-5s]" />
      </div>

      {/* Login container */}
      <div className="w-full max-w-[450px] p-12 bg-white rounded-2xl shadow-lg text-center relative z-10 animate-fadeInUp border border-white/30">
        {/* Logo */}
        <div className="font-playfair text-[2.5rem] font-bold text-[#003366] mb-2 tracking-wider relative inline-block">
          Medi<span className="text-[#d4af37]">Compare</span>
          <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-[60px] h-[3px] bg-[#d4af37] rounded" />
        </div>

        {/* Welcome text */}
        <div className="text-[1.5rem] font-semibold text-[#003366] mb-8 tracking-wider">
          Welcome Back
        </div>

        {/* Error message */}
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="relative mb-6 text-left">
            <input
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              className={`w-full p-5 border ${errors.email ? 'border-red-300' : 'border-gray-200'} rounded-xl text-base transition-all duration-300 bg-white relative z-0 focus:border-[#d4af37] focus:outline-none focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] focus:-translate-y-[2px]`}
              placeholder=" "
            />
            <label className="floating-label absolute pointer-events-none left-[15px] top-[15px] transition-all duration-300 text-gray-500 text-base bg-transparent px-[5px] z-10">
              Email address
            </label>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password input */}
          <div className="relative mb-6 text-left">
            <input
              ref={passwordRef}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              className={`w-full p-5 border ${errors.password ? 'border-red-300' : 'border-gray-200'} rounded-xl text-base transition-all duration-300 bg-white relative z-0 focus:border-[#d4af37] focus:outline-none focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] focus:-translate-y-[2px]`}
              placeholder=" "
            />
            <label className="floating-label absolute pointer-events-none left-[15px] top-[15px] transition-all duration-300 text-gray-500 text-base bg-transparent px-[5px] z-10">
              Password
            </label>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Forgot password */}
          <a href="#" className="block text-right mb-6 text-sm text-[#d4af37] hover:text-[#003366] hover:underline transition-colors duration-300">
            Forgot password?
          </a>

          {/* Login button */}
          <button
            type="submit"
            onClick={handleButtonClick}
            disabled={isLoading}
            className={`w-full p-4 my-2 rounded-xl text-base font-semibold tracking-wider relative overflow-hidden bg-gradient-to-r from-[#003366] to-[#6699cc] text-white shadow-lg hover:-translate-y-[3px] hover:shadow-xl active:translate-y-0 transition-all duration-400 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-gray-500 text-sm">
          <span className="relative px-2 bg-white">OR</span>
          <div className="absolute top-1/2 left-0 w-[45%] h-px bg-gradient-to-r from-transparent to-gray-200" />
          <div className="absolute top-1/2 right-0 w-[45%] h-px bg-gradient-to-l from-transparent to-gray-200" />
        </div>

        {/* Google button */}
        <button
          onClick={handleButtonClick}
          className="w-full p-4 my-2 rounded-xl text-base font-semibold flex items-center justify-center border border-gray-200 text-gray-800 shadow-sm hover:-translate-y-[3px] hover:shadow-md hover:bg-gray-50 transition-all duration-400"
        >
          <img src="/images/googleicon.avif" alt="Google" className="h-5 mr-2" />
          Continue with Google
        </button>

        {/* Sign up prompt */}
        <p className="text-gray-500 text-sm my-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-[#d4af37] font-semibold hover:text-[#003366] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#003366] after:transition-all after:duration-300 hover:after:w-full">
            Sign up
          </a>
        </p>
      </div>

      {/* Global styles */}
      <style>{`
        @keyframes fadeInUp {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }
        .animate-float {
          animation: float 15s infinite linear;
        }
        .animation-delay-[-5s] {
          animation-delay: -5s;
        }
        input:focus ~ .floating-label,
        input:not(:placeholder-shown) ~ .floating-label {
          top: -10px;
          left: 10px;
          font-size: 0.8rem;
          background: white;
          color: #d4af37;
          font-weight: 600;
          z-index: 10;
        }
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;