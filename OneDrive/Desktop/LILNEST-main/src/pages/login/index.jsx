import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      console.log('Attempting login with:', email);
      const result = await login(email, password);
      console.log('Login successful:', result);
      window.location.href = '/dashboard-home';
    } catch (err) {
      console.error('Full login error:', err);
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);
      
      let errorMessage = 'Login failed';
      
      // Check if Firebase is properly configured
      if (err.code === 'auth/operation-not-allowed') {
        errorMessage = '⚠️ Email/Password authentication is disabled. Go to Firebase Console > Authentication > Sign-in methods and enable Email/Password.';
      } else if (err.code === 'auth/configuration-not-found' || err.message?.includes('configuration')) {
        errorMessage = 'Firebase configuration error. Check your Firebase settings.';
      } else if (err.code === 'auth/api-key-not-valid') {
        errorMessage = 'Invalid Firebase API key. Check .env file.';
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found. Please register first.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format';
      } else if (err.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Try again later';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Check internet connection';
      } else if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Email or password is incorrect';
      } else if (err.code === 'auth/invalid-login-credentials') {
        errorMessage = 'Invalid login credentials. Check email/password.';
      } else {
        errorMessage = `Error: ${err.code || err.message || 'Unknown error'}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard-home');
    } catch (err) {
      console.error('Google login error:', err);
      let errorMessage = 'Google login failed';
      
      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login cancelled';
      } else if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Popup blocked. Please allow popups for this site';
      } else if (err.code === 'auth/unauthorized-domain') {
        errorMessage = 'This domain is not authorized. Add your domain to Firebase Console > Authentication > Settings > Authorized domains';
      } else if (err.code === 'auth/operation-not-allowed') {
        errorMessage = 'Google sign-in is not enabled. Enable it in Firebase Console';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={onSubmit} className="bg-card border border-border rounded-xl p-4 space-y-3">
          <Input label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          {error && <div className="text-sm text-error">{error}</div>}
          <Button type="submit" loading={loading} fullWidth>Login</Button>
          <Button type="button" variant="secondary" fullWidth onClick={handleGoogleLogin} loading={loading}>Continue with Google</Button>
          <div className="text-sm text-muted-foreground">No account? <a href="/register" className="text-primary">Register</a></div>
          <div className="text-sm"><a href="/reset-password" className="text-primary">Forgot password?</a></div>
        </form>
      </main>
    </div>
  );
};

export default Login;
