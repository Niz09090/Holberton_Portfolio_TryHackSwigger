import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { ScrollToTop } from '@/components/shared/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TryHackSwigger - Learn Practically. Compete Globally.',
  description: 'Master cybersecurity with hands-on labs, competitions, and a global community. Learn practical hacking skills in a gamified environment.',
}

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark';}var r=document.documentElement;r.classList.remove('dark','light');r.classList.add(t);}catch(e){document.documentElement.classList.add('dark');}})();`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ScrollToTop />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
