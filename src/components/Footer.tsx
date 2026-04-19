const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} sqrt Blog System. Built with Vite, React & GitHub Pages.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
