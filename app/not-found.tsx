import Link from "next/link";

export default function NotFound() {
  return (
    <main className="main-page">
      <div className="error-container">
        <h1>404 Page</h1>
        <p>Sorry. We couldn&apos;t find what you were looking for.</p>
        <Link href="/" className="btn">
          Back to Homepage
        </Link>
      </div>
    </main>
  );
}
