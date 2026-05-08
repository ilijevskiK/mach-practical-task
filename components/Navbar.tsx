import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="max-w-3xl mx-auto py-4 flex gap-4">
        <Link href="/" className="transition-colors duration-300 hover:text-blue-600 hover:underline">
          Home
        </Link>
         <Link href="/about" className="transition-colors duration-300 hover:text-blue-600 hover:underline">
          About Us
        </Link>
    </nav>
  );
}