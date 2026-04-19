import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Article from './pages/Article';
import Callback from './pages/Callback';
import Publish from './pages/Publish';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
