import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ReactNode, createContext } from "react";
import { Theme } from "../constants/types";

type SetValueContext = (theme: Theme) => void;

type ValueContext = {
  theme: Theme;
  isDark: boolean;
};

export const ValueContext = createContext<ValueContext | null>(null);
export const ChangeValueContext = createContext<SetValueContext | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "System");

  function changeTheme(theme: Theme) {
    const isDark =
      theme === "Dark" ||
      (theme === "System" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", isDark);
    setTheme(theme);
  }

  return (
    <ChangeValueContext.Provider value={changeTheme}>
      <ValueContext.Provider
        value={{
          theme: theme,
          isDark: document.documentElement.classList.contains("dark"),
        }}
      >
        {children}
      </ValueContext.Provider>
    </ChangeValueContext.Provider>
  );
}
