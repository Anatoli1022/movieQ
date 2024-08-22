import type { Metadata } from 'next';
import './globals.css';
import Header from '@/app/components/shared/Header';
import Footer from '@/app/components/shared/Footer';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='bg-slate-900 text-white'>
        <Header />
        <Suspense fallback={null}>
          <main className='ml-auto mr-auto mt-10 max-w-7xl'>{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
