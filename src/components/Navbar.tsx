import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 w-full max-w-7xl mx-auto flex items-center justify-between">
      {/* Brand */}
      <Link to="/" className="text-3xl tracking-tight text-foreground transition-opacity hover:opacity-80 flex items-start" style={{ fontFamily: "'Instrument Serif', serif" }}>
        GenIm.AI
      </Link>

      {/* Navigation Links / CTA */}
      <div className="flex items-center gap-6">
        <Link to="/generate" className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors">
          Generate
        </Link>
        <Link to="/generate" className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors">
          Sign In
        </Link>
        <Link to="/generate" className="liquid-glass rounded-full px-6 py-2.5 text-sm font-medium text-foreground hover:scale-[1.03] transition-transform duration-300">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
