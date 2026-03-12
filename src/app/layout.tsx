
import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Toaster } from "@/components/ui/toaster";
import { CustomCursor } from "@/components/ui/CustomCursor";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: {
    default: 'Sofol IT | The Technical Powerhouse for Founders',
    template: '%s | Sofol IT'
  },
  description: 'Premium software development agency architecting scalable technical foundations. We turn early-stage ideas into market-dominating digital products in 8 weeks.',
  keywords: ['Software Development', 'Mobile App Development', 'Flutter', 'Next.js', 'MVP Launch', 'SaaS Development', 'Solo Founders', 'Startup Tech Partner'],
  authors: [{ name: 'Sofol IT Team' }],
  creator: 'Sofol IT',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sofolit.com',
    siteName: 'Sofol IT',
    title: 'Sofol IT | Idea to Market-Dominating Product',
    description: 'Elite technical partner for solo founders. Zero to Shipped in 8 Weeks.',
    images: [
      {
        url: 'https://sofolit.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sofol IT - The Technical Powerhouse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sofol IT | The Technical Powerhouse',
    description: 'Architecting scalable technical foundations for solo founders.',
    images: ['https://sofolit.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen grain mesh-gradient">
        <NextTopLoader 
          color="hsl(220, 80%, 50%)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px hsl(220, 80%, 50%),0 0 5px hsl(220, 80%, 50%)"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <Header />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
