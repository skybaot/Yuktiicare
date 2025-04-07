import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, Moon, Sun, X, ChevronDown, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAppContext } from "@/context/AppContext";
import { supabase } from "@/utils/supabase";
import { toast } from "@/hooks/use-toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppContext();

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  React.useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);
  
  // Close mobile menu when changing routes
  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "There was a problem signing you out.",
        variant: "destructive",
      });
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "py-3 bg-background/80 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          aria-label="YuktiiCare Home"
        >
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">
            Y
          </div>
          <span className="font-display font-bold text-xl">YuktiiCare</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={cn(
              "font-medium transition-colors hover:text-primary relative text-sm",
              location.pathname === "/"
                ? "text-primary"
                : "text-foreground/80"
            )}
          >
            Home
            {location.pathname === "/" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
            )}
          </Link>

          {/* Services Dropdown */}
          <div className="relative group">
            <button 
              className={cn(
                "font-medium transition-colors hover:text-primary text-sm flex items-center",
                ["/jobs", "/housing", "/events", "/matchmaking"].includes(location.pathname)
                  ? "text-primary"
                  : "text-foreground/80"
              )}
            >
              Services <ChevronDown className="ml-1 h-3 w-3 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-background border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1 rounded-md bg-background">
                <Link
                  to="/jobs"
                  className="block px-4 py-2 text-sm hover:bg-secondary"
                >
                  Jobs
                </Link>
                <Link
                  to="/housing"
                  className="block px-4 py-2 text-sm hover:bg-secondary"
                >
                  Senior Living
                </Link>
                <Link
                  to="/events"
                  className="block px-4 py-2 text-sm hover:bg-secondary"
                >
                  Events
                </Link>
                <Link
                  to="/matchmaking"
                  className="block px-4 py-2 text-sm hover:bg-secondary"
                >
                  Matchmaking
                </Link>
              </div>
            </div>
          </div>

          {/* About Us Dropdown */}
          <div className="relative group">
            <button 
              className={cn(
                "font-medium transition-colors hover:text-primary text-sm flex items-center",
                ["/team", "/mission", "/success-stories"].includes(location.pathname)
                  ? "text-primary"
                  : "text-foreground/80"
              )}
            >
              About Us <ChevronDown className="ml-1 h-3 w-3 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-background border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1 rounded-md bg-background">
                <Link
                  to="/team"
                  className="block px-4 py-2 text-sm hover:bg-secondary"
                >
                  Our Team
                </Link>
                <Link
                  to="/mission"
                  className="block px-4 py-2 text-sm hover:bg-secondary"
                >
                  Our Mission
                </Link>
                <Link
                  to="/success-stories"
                  className="block px-4 py-2 text-sm hover:bg-secondary"
                >
                  Success Stories
                </Link>
              </div>
            </div>
          </div>

          <Link
            to="/partner"
            className={cn(
              "font-medium transition-colors hover:text-primary relative text-sm",
              location.pathname === "/partner"
                ? "text-primary"
                : "text-foreground/80"
            )}
          >
            Partner With Us
            {location.pathname === "/partner" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
            )}
          </Link>

          <Link
            to="/donate"
            className={cn(
              "font-medium transition-colors hover:text-primary relative text-sm",
              location.pathname === "/donate"
                ? "text-primary"
                : "text-foreground/80"
            )}
          >
            Donate
            {location.pathname === "/donate" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <User size={16} />
                  {user?.email?.split('@')[0] || 'Account'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              className="animate-fade-in"
              size="sm"
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-background w-full h-screen pt-20 transition-transform duration-300 ease-spring",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="container flex flex-col space-y-5 p-6">
          <Link
            to="/"
            className={cn(
              "text-lg font-medium transition-colors py-3 border-b border-border",
              location.pathname === "/"
                ? "text-primary"
                : "text-foreground/80"
            )}
          >
            Home
          </Link>

          {/* Mobile Services */}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              "text-lg font-medium transition-colors py-3 border-b border-border text-left",
              ["/jobs", "/housing", "/events", "/matchmaking"].includes(location.pathname)
                ? "text-primary"
                : "text-foreground/80"
            )}>
              Services <ChevronDown className="ml-1 h-4 w-4 inline" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/jobs">Jobs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/housing">Senior Living</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/events">Events</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/matchmaking">Matchmaking</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile About Us */}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              "text-lg font-medium transition-colors py-3 border-b border-border text-left",
              ["/team", "/mission", "/success-stories"].includes(location.pathname)
                ? "text-primary"
                : "text-foreground/80"
            )}>
              About Us <ChevronDown className="ml-1 h-4 w-4 inline" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/team">Our Team</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/mission">Our Mission</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/success-stories">Success Stories</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/partner"
            className={cn(
              "text-lg font-medium transition-colors py-3 border-b border-border",
              location.pathname === "/partner"
                ? "text-primary"
                : "text-foreground/80"
            )}
          >
            Partner With Us
          </Link>
          
          <Link
            to="/donate"
            className={cn(
              "text-lg font-medium transition-colors py-3 border-b border-border",
              location.pathname === "/donate"
                ? "text-primary"
                : "text-foreground/80"
            )}
          >
            Donate
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="text-lg font-medium transition-colors py-3 border-b border-border"
              >
                My Profile
              </Link>
              <Link
                to="/dashboard"
                className="text-lg font-medium transition-colors py-3 border-b border-border"
              >
                Dashboard
              </Link>
              <Button 
                variant="destructive" 
                className="mt-6"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button 
              className="mt-6"
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
