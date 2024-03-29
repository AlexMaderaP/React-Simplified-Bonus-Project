import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/toaster";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, ScrollRestoration } from "react-router-dom";

export function RootLayout() {
  return (
    <>
      {" "}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container my-4 flex-grow grid grid-cols-1">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
      <ScrollRestoration />
      <Toaster />
    </>
  );
}

const THEME_OPTIONS = ["Light", "Dark", "System"] as const;
type Theme = (typeof THEME_OPTIONS)[number];

export function Navbar() {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "System");
  const [isDark, setIsDark] = useState(() => {
    if (theme === "System") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? true
        : false;
    } else {
      return theme === "Dark" ? true : false;
    }
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    if (theme === "System") {
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? setIsDark(true)
        : setIsDark(false);
    } else {
      if (theme === "Dark") {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    }
  }, [theme]);

  return (
    <nav className="flex sticky top-0 z-50 justify-between border-b items-center p-4 px-8 mb-4 bg-white dark:bg-slate-950">
      <Button variant="ghost" asChild>
        <Link to="" className="flex gap-1">
          <span className="text-lg">Job App</span>
        </Link>
      </Button>
      <div className="flex items-center gap-2 pr-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              {isDark ? <Moon /> : <Sun />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("Light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("Dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("System")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem>Task Board</DropdownMenuItem>
            <DropdownMenuItem>Job Listings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log In</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" asChild className="hidden md:inline-flex">
          <Link to="">Task Board</Link>
        </Button>

        <Button variant="ghost" asChild className="hidden md:inline-flex">
          <Link to="">Job Listings</Link>
        </Button>

        <Button variant="ghost" asChild className="hidden md:inline-flex">
          <Link to="">Log in</Link>
        </Button>
      </div>
    </nav>
  );
}
