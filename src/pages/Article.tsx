import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { fetchPostContent } from "../utils/github";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPostContent(decodeURIComponent(id))
        .then((data) => {
          setContent(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching post content:", err);
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto pb-20"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-brand transition-colors mb-12 uppercase tracking-widest"
      >
        <ArrowLeft size={16} />
        Back to Library
      </Link>

      <article className="space-y-12">
        <header className="space-y-10 text-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-brand uppercase bg-brand/10 rounded-full border border-brand/20"
            >
              Technology & Thoughts
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
              {id?.split("/").pop()?.replace(".md", "").replace(/-/g, " ")}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-purple-500 flex items-center justify-center text-white font-bold">
                  ES
                </div>
                <span>Eternity-Sky</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-brand" />
                <span>April 19, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-brand" />
                <span>5 min read</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl shadow-brand/20"
          >
            <img
              src={`https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80`}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </header>

        <div className="max-w-3xl mx-auto">
          <div className="markdown-body prose prose-xl dark:prose-invert max-w-none prose-headings:font-black prose-a:text-brand prose-img:rounded-[32px] prose-img:shadow-xl">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </article>
    </motion.div>
  );
};

export default Article;
