import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { fetchPostContent } from '../utils/github';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPostContent(decodeURIComponent(id))
        .then((data) => {
          setContent(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching post content:', err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        返回列表
      </Link>

      <header className="space-y-6 pb-8 border-b border-gray-100 dark:border-gray-800">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          {id?.split('/').pop()?.replace('.md', '').replace(/-/g, ' ')}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <User size={16} className="text-brand" />
            <span>Eternity-Sky</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-brand" />
            <span>2026-04-19</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-brand" />
            <span>5 分钟阅读</span>
          </div>
        </div>
      </header>

      <div className="markdown-body prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-brand prose-img:rounded-2xl">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default Article;
