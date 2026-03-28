import logo from "@/assets/logo.png";
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
    <>
      <nav className="w-full py-4 px-4 md:py-5 md:px-8 flex flex-row justify-between items-center sticky top-0 z-50">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8 min-w-[32px]" width={32} height={32} />
        </div>

        {/* Desktop CTA */}
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
