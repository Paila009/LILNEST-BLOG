import './globals.css';

export const metadata = {
  title: 'LILNEST — Maternal & Child Wellness',
  description: 'A comprehensive maternal and child wellness ecosystem with AI-powered insights, fitness tracking, diet planning, and more.',
  keywords: 'pregnancy, maternal health, child wellness, baby tracker, prenatal care',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#fce4ed" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
