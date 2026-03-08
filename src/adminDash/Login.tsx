import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Eye, EyeClosed } from 'lucide-react';
import { authAPI } from '../api';

interface Credentials {
  email: string;
  password: string;
}

const AdminLogin = () => {
  const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    
    try {
      // Backend comment: Using admin login endpoint for admin authentication
      // Admin user must have is_staff=True in the database
      const response = await authAPI.adminLogin(credentials);
      
      // Debug: Log the response structure
      console.log('Admin login response:', response);
      
      if (!response.user || !response.user.email) {
        throw new Error('Invalid response structure from server');
      }
      
      localStorage.setItem('isAdminAuthenticated', 'true');
      localStorage.setItem('adminEmail', response.user.email);
      localStorage.setItem('adminUsername', response.user.first_name || response.user.email.split('@')[0]);
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      navigate('/admin/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid credentials. Please try again.';
      
      // Provide more specific error message for admin login
      if (errorMessage.includes('Admin privileges required')) {
        setError('Admin access required. This account does not have admin privileges.');
      } else if (errorMessage.includes('Invalid credentials')) {
        setError('Invalid admin credentials. Please check your email and password.');
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>Admin Login - Dashur AI</title>
        <meta name="description" content="Login to access Dashur AI admin dashboard" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-linear-to-r from-white to-[#4988C4] bg-clip-text text-transparent mb-2">Dashur AI Admin</h1>
        <p className="text-sm text-gray-400">Manage your AI-powered business</p>
      </div>
      
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-white mb-1">Welcome back</h2>
          <p className="text-gray-400 text-sm">Login to access your dashboard</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-gray-400"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-gray-400 pr-12"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPassword ? (
                  <EyeClosed className="w-5 h-5"/>
                ) : (
                  <Eye className="w-5 h-5"/>
                )}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
