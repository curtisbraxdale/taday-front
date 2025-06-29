import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-taday-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-2 border-taday-win98-darkGray" style={{ borderStyle: 'outset' }}>
        {isLogin ? (
          <LoginForm onToggleMode={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onToggleMode={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};