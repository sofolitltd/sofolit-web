
import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: 'Sofol IT | Idea to Product for Solo Founders',
  description: 'Premium software development agency transforming concepts into high-fidelity digital products for solo entrepreneurs.',
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
      <body className="font-body antialiased bg-background text-foreground min-h-screen">
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
          <Header />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
