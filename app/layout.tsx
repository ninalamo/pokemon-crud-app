import './globals.css'; // Import global styles if any
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Pokemon CRUD App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}