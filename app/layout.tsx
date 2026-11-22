import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://wedding-roan-omega.vercel.app'),
  title: 'शुभ विवाह | राकेश संग पूजा (Rakesh & Pooja)',
  description:
    '॥ श्री गणेशाय नमः ॥ हमारे परिवार के मांगलिक वैवाहिक उत्सव में आपका हार्दिक स्वागत एवं अभिनंदन है। वर: राकेश यादव संग वधू: पूजा यादव।',
  openGraph: {
    title: 'शुभ विवाह | राकेश संग पूजा',
    description: '॥ श्री गणेशाय नमः ॥ मांगलिक वैवाहिक उत्सव • आजमगढ़',
    images: ['/images/heavenly_palace_terrace_wide.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#100b08',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#100b08] text-[#2b1d14] min-h-screen selection:bg-amber-200 selection:text-amber-900 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
