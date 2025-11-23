import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(''); setErr(''); setLoading(true);
    try {
      await resetPassword(email);
      setMsg('Reset link sent. Check your email.');
    } catch (e) {
      setErr('Could not send reset email.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
        <form onSubmit={onSubmit} className="bg-card border border-border rounded-xl p-4 space-y-3">
          <Input label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          {msg && <div className="text-sm text-success">{msg}</div>}
          {err && <div className="text-sm text-error">{err}</div>}
          <Button type="submit" loading={loading} fullWidth>Send reset email</Button>
        </form>
      </main>
    </div>
  );
};

export default ResetPassword;
