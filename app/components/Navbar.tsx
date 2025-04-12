import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-purple-700 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Pokemon CRUD
        </Link>
        <nav>
          <Link href="/" className="text-white hover:underline mr-4">
            Home
          </Link>
          {/* You can add additional links if necessary */}
        </nav>
      </div>
    </header>
  );
}