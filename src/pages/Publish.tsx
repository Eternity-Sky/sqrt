import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../utils/github';
import { getAccessToken } from '../utils/oauth';
import { Send, FileText, Layout, Eye, Edit3, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

const Publish = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAccessToken();
    if (!token) {
      alert('请先登录！');
      return;
    }

    setIsSubmitting(true);
    try {
      await createPost(title, content, token);
      alert('文章发布成功！正在跳转到首页...');
      navigate('/');
    } catch (err) {
      console.error('Failed to publish post:', err);
      alert('发布失败，请检查您的 GitHub 权限或令牌是否正确。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex items-center justify-between pb-8 border-b border-gray-100 dark:border-gray-800">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">创作新文章</h1>
          <p className="text-gray-500">记录您的思想，分享您的见解。</p>
        </div>
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button
            onClick={() => setView('edit')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'edit' ? 'bg-white dark:bg-gray-700 shadow-sm text-brand' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Edit3 size={16} />
            编辑
          </button>
          <button
            onClick={() => setView('preview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'preview' ? 'bg-white dark:bg-gray-700 shadow-sm text-brand' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Eye size={16} />
            预览
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-400">文章标题</label>
          <div className="relative group">
            <Layout className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand transition-colors" size={20} />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入文章标题..."
              className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:outline-none focus:border-brand dark:focus:border-brand transition-all text-xl font-bold"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-400">文章内容 (Markdown)</label>
          <AnimatePresence mode="wait">
            {view === 'edit' ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="relative group"
              >
                <FileText className="absolute left-4 top-4 text-gray-300 group-focus-within:text-brand transition-colors" size={20} />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="开始您的创作之旅吧..."
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:outline-none focus:border-brand dark:focus:border-brand transition-all min-h-[400px] font-mono text-lg resize-y"
                  required
                />
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-[400px] markdown-body prose prose-lg dark:prose-invert max-w-none"
              >
                {content ? (
                  <ReactMarkdown>{content}</ReactMarkdown>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 py-20">
                    <Eye size={48} strokeWidth={1} className="mb-4 opacity-20" />
                    <p>预览内容将在这里显示</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !title || !content}
            className="flex items-center gap-2 bg-brand text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand/20 active:scale-95 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                正在发布...
              </>
            ) : (
              <>
                <Send size={20} />
                发布文章
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Publish;
