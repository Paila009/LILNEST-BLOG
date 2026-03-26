import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      console.log('Attempting registration:', { email, name });
      await register(email, password, name);
      navigate('/dashboard-home');
    } catch (err) {
      console.error('Registration error:', err);
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);
      
      let errorMessage = 'Registration failed';
      if (err.code === 'auth/operation-not-allowed') {
        errorMessage = '⚠️ Email/Password authentication is disabled. Go to Firebase Console > Authentication > Sign-in methods and enable Email/Password.';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already registered. Please login instead.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format';
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
        <h1 className="text-2xl font-semibold mb-4">Create Account</h1>
        <form onSubmit={onSubmit} className="bg-card border border-border rounded-xl p-4 space-y-3">
          <Input label="Full Name" value={name} onChange={(e)=>setName(e.target.value)} required />
          <Input label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          {error && <div className="text-sm text-error">{error}</div>}
          <Button type="submit" loading={loading} fullWidth>Register</Button>
          <div className="text-sm text-muted-foreground">Already have an account? <a href="/login" className="text-primary">Login</a></div>
        </form>
      </main>
    </div>
  );
};

export default Register;
