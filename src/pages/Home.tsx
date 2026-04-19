import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchPosts } from "../utils/github";
import type { Post } from "../utils/github";
import { BookOpen, ChevronRight } from "lucide-react";

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
        console.error("Error fetching posts:", err);
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
    <div className="relative space-y-20 pb-20">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/10 blur-[120px] rounded-full animate-pulse" />
        <div
          className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <header className="text-center space-y-6 py-20 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-brand uppercase bg-brand/10 rounded-full border border-brand/20"
        >
          Discover the Future of Blogging
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-black tracking-tight"
        >
          探索{" "}
          <span className="bg-gradient-to-r from-brand to-purple-500 bg-clip-text text-transparent">
            sqrt
          </span>{" "}
          的<br />
          思想世界
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          简洁、高效、先进的博客系统框架。记录每一个灵光一现的瞬间。
        </motion.p>
      </header>

      <section className="grid md:grid-cols-2 gap-8">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <motion.div
              key={post.path}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/article/${encodeURIComponent(post.path)}`}
                className="group block overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl hover:border-brand dark:hover:border-brand transition-all hover:shadow-2xl hover:shadow-brand/10"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={`https://images.unsplash.com/photo-${1500000000000 + index}?auto=format&fit=crop&w=800&q=80`}
                    alt={post.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-white font-medium flex items-center gap-2">
                      阅读更多 <ChevronRight size={18} />
                    </span>
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-brand">
                    <span>Tech</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>Inspiration</span>
                  </div>
                  <h2 className="text-2xl font-bold group-hover:text-brand transition-colors line-clamp-2 leading-tight">
                    {post.name.replace(".md", "").replace(/-/g, " ")}
                  </h2>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <BookOpen size={14} className="text-brand" />
                      </div>
                      <span className="text-sm text-gray-500 font-medium">
                        5 min read
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">Apr 19, 2026</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-32 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[40px] bg-gray-50/50 dark:bg-gray-900/50">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen size={32} className="text-gray-400" />
            </div>
            <p className="text-xl text-gray-400 font-medium">
              还没有文章哦，快去发表第一篇吧！
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
