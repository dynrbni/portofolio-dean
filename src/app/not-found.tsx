import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found container">
      <p className="eyebrow">404 / Page not found</p>
      <h1>Let’s get you back.</h1>
      <p>This page doesn’t exist. My work is just one click away.</p>
      <Link className="button" href="/">
        Back to the portfolio <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
