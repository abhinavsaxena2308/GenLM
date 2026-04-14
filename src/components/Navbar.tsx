import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 w-full max-w-7xl mx-auto flex items-center justify-between">
      {/* Brand */}
      <Link to="/" className="text-3xl tracking-tight text-foreground transition-opacity hover:opacity-80 flex items-start" style={{ fontFamily: "'Instrument Serif', serif" }}>
        GenIm.AI
      </Link>
    </nav>
  );
};

export default Navbar;
