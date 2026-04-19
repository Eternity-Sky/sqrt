import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../utils/github";
import { getAccessToken } from "../utils/oauth";
import { Send, FileText, Layout, Eye, Edit3, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [view, setView] = useState<"edit" | "preview">("edit");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAccessToken();
    if (!token) {
      alert("请先登录！");
      return;
    }

    setIsSubmitting(true);
    try {
      await createPost(title, content, token);
      alert("文章发布成功！正在跳转到首页...");
      navigate("/");
    } catch (err) {
      console.error("Failed to publish post:", err);
      alert("发布失败，请检查您的 GitHub 权限或令牌是否正确。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-gray-100 dark:border-gray-800">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-brand uppercase bg-brand/10 rounded-full border border-brand/20"
          >
            Create New Masterpiece
          </motion.div>
          <h1 className="text-5xl font-black tracking-tight">创作新文章</h1>
          <p className="text-xl text-gray-500">记录您的思想，分享您的见解。</p>
        </div>
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl shadow-inner">
          <button
            onClick={() => setView("edit")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              view === "edit"
                ? "bg-white dark:bg-gray-700 shadow-xl text-brand scale-105"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Edit3 size={18} />
            编辑
          </button>
          <button
            onClick={() => setView("preview")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              view === "preview"
                ? "bg-white dark:bg-gray-700 shadow-xl text-brand scale-105"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Eye size={18} />
            预览
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-2">
            文章标题
          </label>
          <div className="relative group">
            <Layout
              className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand transition-all duration-300"
              size={24}
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入文章标题..."
              className="w-full pl-16 pr-8 py-6 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[32px] focus:outline-none focus:border-brand dark:focus:border-brand transition-all text-2xl font-black shadow-sm group-focus-within:shadow-xl group-focus-within:shadow-brand/5"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-2">
            文章内容 (Markdown)
          </label>
          <AnimatePresence mode="wait">
            {view === "edit" ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="relative group"
              >
                <FileText
                  className="absolute left-6 top-6 text-gray-300 group-focus-within:text-brand transition-all duration-300"
                  size={24}
                />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="开始您的创作之旅吧..."
                  className="w-full pl-16 pr-8 py-8 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[40px] focus:outline-none focus:border-brand dark:focus:border-brand transition-all min-h-[500px] font-mono text-lg resize-y shadow-sm group-focus-within:shadow-xl group-focus-within:shadow-brand/5"
                  required
                />
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="p-12 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[40px] min-h-[500px] markdown-body prose prose-xl dark:prose-invert max-w-none shadow-xl"
              >
                {content ? (
                  <ReactMarkdown>{content}</ReactMarkdown>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 py-32">
                    <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                      <Eye size={48} strokeWidth={1.5} className="opacity-20" />
                    </div>
                    <p className="text-xl font-medium">预览内容将在这里显示</p>
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
            className="group relative flex items-center gap-3 bg-brand text-white px-10 py-5 rounded-[24px] font-black text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl shadow-brand/30 active:scale-95 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            {isSubmitting ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                正在发布...
              </>
            ) : (
              <>
                <Send
                  size={24}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
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
