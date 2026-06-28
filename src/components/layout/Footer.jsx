import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-stone-950 border-t border-green-900/50 py-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="text-2xl font-bold text-stone-100 cursor-pointer">
            CivicSense <span className="text-green-500">AI</span>
          </Link>
          <p className="text-stone-400 text-sm text-center md:text-left">
            Empowering citizens to report and resolve local issues.
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-stone-400 text-sm">
          <a href="#" className="hover:text-green-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-green-400 transition">Terms of Service</a>
          <a href="#" className="hover:text-green-400 transition">Contact Us</a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-stone-800/50 text-center text-stone-500 text-sm">
        &copy; {new Date().getFullYear()} CivicSense AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
