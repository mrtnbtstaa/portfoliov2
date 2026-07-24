export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()}{" "} tin.portfolio — built with Next.js
        </p>
        <p className="font-mono text-xs text-muted">Designed &amp; developed end to end.</p>
      </div>
    </footer>
  );
}
