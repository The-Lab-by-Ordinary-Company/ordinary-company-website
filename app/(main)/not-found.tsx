import Link from "next/link";

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="message">
        <h1 className="error-code" data-text="404">
          404
        </h1>
        <p className="error-message">You have lost your way</p>
        <Link href="/" className="return-link">
          Return Home
        </Link>
      </div>
    </div>
  );
}
