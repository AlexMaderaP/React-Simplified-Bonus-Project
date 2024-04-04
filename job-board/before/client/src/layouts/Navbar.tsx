import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useChangeThemeContext,
  useThemeContext,
} from "@/hooks/useThemeContext";
import { Menu, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
  const { isDark } = useThemeContext();
  const changeTheme = useChangeThemeContext();

  return (
    <nav className="flex sticky top-0 z-50 justify-between border-b items-center p-4 px-8 mb-4 bg-white dark:bg-slate-950">
      <span className="text-lg pl-2 font-semibold">Job App</span>
      <div className="flex items-center gap-2 pr-4">
        <ToggleThemeItem
          isDark={isDark}
          setLight={() => changeTheme("Light")}
          setDark={() => changeTheme("Dark")}
          setSystem={() => changeTheme("System")}
        />
        <SmallScreenMenu />
        <NavItem label="Task board" to="/tasks" />
        <NavItem label="Job Listings" to="/" />
        <NavItem label="Log in" to="/" />
      </div>
    </nav>
  );
}

type NavItemProps = {
  to: string;
  label: string;
};

function NavItem({ to, label }: NavItemProps) {
  return (
    <Button variant="ghost" asChild className="hidden sm:inline-flex">
      <Link to={to}>{label}</Link>
    </Button>
  );
}

type ToggleThemeItemProps = {
  isDark: boolean;
  setLight: () => void;
  setDark: () => void;
  setSystem: () => void;
};

function ToggleThemeItem({
  isDark,
  setLight,
  setDark,
  setSystem,
}: ToggleThemeItemProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
        >
          {isDark ? (
            <Moon className="scale-0 dark:scale-100 transition-transform" />
          ) : (
            <Sun className="scale-100 dark:scale-0 transition-transform" />
          )}
          <span className="sr-only"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={setLight}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={setDark}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={setSystem}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SmallScreenMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
        >
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
  );
}
