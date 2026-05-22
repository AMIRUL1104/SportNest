import Link from "next/link";

function NotFound() {
  return (
    <div className="py-10  flex flex-col items-center justify-center gap-4 text-center px-4">
      <p className="text-7xl font-bold text-primary">404</p>
      <h1 className="text-xl font-semibold text-foreground">Page Not Found</h1>
      <p className="text-sm text-muted-foreground max-w-xs">
        {` The page you're looking for doesn't exist or has been moved.
`}{" "}
      </p>
      <Link
        href="/"
        className="mt-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md active:scale-95"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
