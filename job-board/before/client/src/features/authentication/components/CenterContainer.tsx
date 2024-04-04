import { ReactNode } from "react";

export function CenterContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center h-full">{children}</div>
  );
}
