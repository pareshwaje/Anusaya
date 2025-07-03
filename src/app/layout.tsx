import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Anusaya Society App',
  description: 'Manage housing society with ease',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
