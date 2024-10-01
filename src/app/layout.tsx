import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Fredoka } from 'next/font/google'; // Import Fredoka from Google Fonts
import './globals.css';
import NavBar from '@/components/NavBar';
import AuthProvider from './context/AuthProvider';

// Local fonts
const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

// Fredoka Google Font
const fredoka = Fredoka({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: 'Complyance - assessment',
    description: ''
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${fredoka.className} antialiased`}
            >
                <AuthProvider>
                    <NavBar />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
