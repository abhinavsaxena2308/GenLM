import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Features", hasChevron: true, path: "/features" },
  { label: "Solutions", hasChevron: false, path: "/solutions" },
  { label: "Plans", hasChevron: false, path: "/plans" },
  { label: "Learning", hasChevron: true, path: "/learning" },
];

const Navbar = () => {
  return (
    <>
      <nav className="w-full py-4 px-4 md:py-5 md:px-8 flex flex-row justify-between items-center sticky top-0 z-50">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-8 w-8 min-w-[32px]" width={32} height={32} />
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex items-center gap-1 px-3 py-2 text-base text-foreground/90 hover:text-foreground transition-colors"
            >
              {item.label}
              {item.hasChevron && <ChevronDown className="w-4 h-4" />}
            </Link>
          ))}
        </div>
        <div className="hidden md:block">
          <Button variant="heroSecondary" size="sm" className="rounded-full px-4 py-2">
            Sign Up
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 text-foreground">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-border w-[280px]">
              <SheetHeader>
                <SheetTitle className="text-foreground">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-6">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <Link
                      to={item.path}
                      className="flex items-center justify-between px-3 py-3 text-base text-foreground/90 hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                    >
                      {item.label}
                      {item.hasChevron && <ChevronDown className="w-4 h-4" />}
                    </Link>
                  </SheetClose>
                ))}
                <div className="mt-4">
                  <Button variant="heroSecondary" className="w-full rounded-full">
                    Sign Up
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <div className="mt-[3px] w-full h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
    </>
  );
};

export default Navbar;
