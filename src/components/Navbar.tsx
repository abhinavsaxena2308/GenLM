import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <nav className="liquid-glass rounded-full px-4 py-2.5 flex items-center gap-4 pointer-events-auto w-full max-w-sm md:max-w-fit md:gap-6">
        {/* Logo */}
        <img src={logo} alt="GenIm.AI" className="h-7 w-7 min-w-[28px]" width={28} height={28} />

        {/* Divider */}
        <div className="hidden md:block h-4 w-px bg-white/15" />

        {/* Brand name */}
        {/* <span className="hidden md:block text-sm font-semibold text-foreground/80 tracking-wide">
          GenIm.AI
        </span> */}

        {/* Spacer on mobile */}
        <div className="flex-1 md:hidden" />

        {/* Desktop CTA */}
        <div className="hidden md:block ">
          <Button
            variant="heroSecondary"
            size="sm"
            className="rounded-full px-5 py-1.5 mr-2 text-sm glow-hover"
            asChild
          >
            <Link to="/generate">Generate</Link>
          </Button>
          <Button
            variant="heroSecondary"
            size="sm"
            className="rounded-full px-5 py-1.5 mr-2 text-sm glow-hover"
            asChild
          >
            <Link to="/generate">Sign In</Link>
          </Button>
          <Button
            variant="heroSecondary"
            size="sm"
            className="rounded-full px-5 py-1.5 text-sm glow-hover"
            asChild
          >
            <Link to="/generate">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-1.5 text-foreground/80 hover:text-foreground transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="liquid-glass border-white/10 w-[260px]">
              <SheetHeader>
                <SheetTitle className="text-foreground">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <Button variant="heroSecondary" className="w-full rounded-full glow-hover" asChild>
                  <Link to="/generate">Generate</Link>
                </Button>
                <Button variant="heroSecondary" className="w-full rounded-full glow-hover" asChild>
                  <Link to="/generate">Sign In</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
