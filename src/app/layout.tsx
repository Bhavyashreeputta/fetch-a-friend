import './globals.css';
import QueryProvider from '@/providers/QueryProvider';  

export const metadata = {
  title: 'Fetch-a-Friend',
  description: 'Find your perfect shelter dog match',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white dark:bg-slate-900">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

