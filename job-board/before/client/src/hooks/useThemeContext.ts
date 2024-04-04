import { useContext } from "react";
import { ChangeValueContext, ValueContext } from "../context/ThemeProvider";

export function useThemeContext() {
  const themeContext = useContext(ValueContext);
  if (themeContext === null) {
    throw new Error("Must use within Theme provider");
  }

  return themeContext;
}

export function useChangeThemeContext() {
  const changeThemeContext = useContext(ChangeValueContext);
  if (changeThemeContext === null) {
    throw new Error("Must use within ChangeTheme provider");
  }

  return changeThemeContext;
}
