import type { ReactNode } from "react";

export default function PageShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <main className={`page-shell ${className}`}>{children}</main>;
}
