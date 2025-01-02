import type { Metadata } from 'next';
import './globals.css';
import Header from '@/app/components/shared/Header';
import Footer from '@/app/components/shared/Footer';
import { Suspense } from 'react';
import { Frank_Ruhl_Libre, Inter } from 'next/font/google';

// Импорт шрифта Frank Ruhl Libre
const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

// Импорт шрифта Inter
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

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
    <html lang='en' className={`${frankRuhlLibre.className} ${inter.className}`}>
      <body className='bg-lightBlue text-white'>
        <Header />
        <Suspense fallback={null}>
          <main className='ml-auto mr-auto max-w-7xl'>{children}</main>
        </Suspense>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
