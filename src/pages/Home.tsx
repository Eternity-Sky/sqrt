import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchPosts, Post } from '../utils/github';
import { BookOpen, Calendar, ChevronRight } from 'lucide-react';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="text-center space-y-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-brand to-purple-400 bg-clip-text text-transparent"
        >
          探索 sqrt 的思想世界
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto"
        >
          简洁、高效、先进的博客系统框架。记录每一个灵光一现的瞬间。
        </motion.p>
      </header>

      <section className="grid gap-6">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <motion.div
              key={post.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={`/article/${encodeURIComponent(post.path)}`}
                className="group block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-brand dark:hover:border-brand transition-all hover:shadow-lg hover:shadow-brand/5"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold group-hover:text-brand transition-colors">
                      {post.name.replace('.md', '').replace(/-/g, ' ')}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        刚刚
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={14} />
                        5 分钟阅读
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-300 group-hover:text-brand transition-colors">
                    <ChevronRight size={24} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl">
            <p className="text-gray-400">还没有文章哦，快去发表第一篇吧！</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
