import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleCallback } from '../utils/oauth';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('正在处理登录回调...');

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code && state) {
      handleCallback(code, state)
        .then(() => {
          setStatus('success');
          setMessage('登录成功！正在跳转...');
          setTimeout(() => navigate('/'), 2000);
        })
        .catch((err) => {
          console.error('Login failed:', err);
          setStatus('error');
          setMessage('登录失败，请重试。');
        });
    } else {
      setStatus('error');
      setMessage('回调参数缺失。');
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      {status === 'loading' && (
        <Loader2 size={48} className="animate-spin text-brand" />
      )}
      {status === 'success' && (
        <CheckCircle2 size={48} className="text-green-500" />
      )}
      {status === 'error' && (
        <XCircle size={48} className="text-red-500" />
      )}
      <h2 className="text-2xl font-bold">{message}</h2>
      {status === 'error' && (
        <button 
          onClick={() => navigate('/')}
          className="bg-brand text-white px-6 py-2 rounded-full hover:opacity-90"
        >
          返回首页
        </button>
      )}
    </div>
  );
};

export default Callback;
