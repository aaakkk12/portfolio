import Link from "next/link";

export default function NotFound() {
  return (
    <main className="simple-not-found">
      <div className="simple-not-found-card">
        <p className="simple-not-found-code">404</p>
        <h1 className="simple-not-found-title">Page not found.</h1>
        <p className="simple-not-found-copy">
          The page you are looking for does not exist or the link may be incorrect.
        </p>
        <Link className="simple-not-found-btn" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
