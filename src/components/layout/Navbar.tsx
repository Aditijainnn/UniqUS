import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import AccessibilityMenu from "./AccessibilityMenu";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [theme, setTheme] = React.useState<"light" | "dark" | "high-contrast">("light");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
    script.defer = true;
    script.async = true;

    script.onload = () => {
      window.vapiInstance = window.vapiSDK.run({
        apiKey: "cd948943-2b2a-4742-9732-ee6043825912",
        assistant: "fe7ac12c-3a48-45cd-b829-cc59f23f9436",
        config: {}, // Customize your button config here if needed
      });
    };

    document.body.appendChild(script);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const newTheme = current === "light" ? "dark" : 
                      current === "dark" ? "high-contrast" : "light";

      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("high-contrast");
      } else if (newTheme === "high-contrast") {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("high-contrast");
      } else {
        document.documentElement.classList.remove("dark", "high-contrast");
      }

      return newTheme;
    });
  };

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Roadmap", path: "/roadmap" },
    { name: "Progress", path: "/progress" },
    { name: "Notes", path: "/notes" },
    { name: "Calendar", path: "/calendar" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-primary">UniqUs</span>
        </Link>

        {isMobile ? (
          <div className="flex items-center gap-2">
            <AccessibilityMenu />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <SunIcon className="h-5 w-5" />
              ) : theme === "dark" ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <span className="text-xs font-bold">HC</span>
              )}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 pt-4">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Separator className="my-2" />
                  <Link
                    to="/login"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Login
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <nav className="flex gap-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <AccessibilityMenu />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <SunIcon className="h-5 w-5" />
              ) : theme === "dark" ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <span className="text-xs font-bold">HC</span>
              )}
            </Button>
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
