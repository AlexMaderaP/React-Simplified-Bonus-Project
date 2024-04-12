import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useChangeThemeContext,
  useThemeContext,
} from "@/hooks/useThemeContext";
import { ChevronDown, Menu, Moon, Sun } from "lucide-react";
import { Link, useLoaderData, useSubmit } from "react-router-dom";

type UserData = {
  id: string;
  email: string;
} | null;

export function Navbar() {
  const submit = useSubmit();

  const { isDark } = useThemeContext();
  const changeTheme = useChangeThemeContext();
  const data = useLoaderData() as UserData;
  const isAuth = data !== null;

  function handleLogout() {
    submit(null, { method: "DELETE" });
  }

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
        <SmallScreenMenu
          email={data && data.email}
          handleLogout={() => handleLogout()}
        />
        <NavItem label="Task board" to="/tasks" />
        <NavItem label="Job Listings" to="/login" />
        {isAuth ? (
          <LoggedInMenu
            email={data.email}
            handleLogout={() => handleLogout()}
          />
        ) : (
          <NavItem label="Login" to="/login" />
        )}
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
    <Button variant="ghost" className="hidden sm:inline-flex">
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

type SmallScreenMenuProps = {
  email: String | null;
  handleLogout: () => void;
};

function SmallScreenMenu({ email, handleLogout }: SmallScreenMenuProps) {
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
        <DropdownMenuItem asChild>
          <Link to="/tasks">Task Board</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Job Listings</DropdownMenuItem>
        <DropdownMenuSeparator />
        {email !== null ? (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger asChild>
              {email} <ChevronDown className="ml-auto h-4 w-4" />
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem asChild>
                <Link to="/">My Listings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ) : (
          <DropdownMenuItem asChild>
            <Link to="/login">Login</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LoggedInMenu({
  email,
  handleLogout,
}: {
  email: String;
  handleLogout: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 hidden sm:inline-flex"
        >
          <span>{email}</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem asChild>
          <Link to="/">My Listings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
