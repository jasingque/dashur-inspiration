import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { LoginForm } from './auth/LoginForm';
import { RegisterForm } from './auth/RegisterForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Helmet>
        <title>{isLogin ? 'Login' : 'Sign Up'} - Dashur AI</title>
        <meta name="description" content={isLogin ? "Login to your Dashur AI account" : "Create a new Dashur AI account"} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="w-full max-w-md">
        <div className="text-left mb-6">
          <button 
            onClick={() => navigate('/')}
            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 text-sm"
          >
            <ArrowLeft />
            Back to Home
          </button>
        </div>

        <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
          {isLogin ? (
            <LoginForm 
              onSwitchToRegister={() => setIsLogin(false)} 
              onLoginSuccess={handleLoginSuccess}
            />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
