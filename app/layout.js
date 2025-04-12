import './globals.css';

export const metadata = {
  title: 'Digital Business Card',
  description: 'A professional digital business card created with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

