import Link from "next/link";
import PageShell from "@/components/ui/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="status-message glass-panel">
        <p className="eyebrow">Lost scene</p>
        <h1>Page not found</h1>
        <p>Sorry. We couldn&apos;t find what you were looking for.</p>
        <Link href="/" className="button-link">
          Back to Homepage
        </Link>
      </div>
    </PageShell>
  );
}
