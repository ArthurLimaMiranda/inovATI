import './globals.css'
import { ReactNode } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { InfoWrapper } from '../app/contexts/InfoContext'
export const metadata = {
  title: 'inovATI 👁️‍🗨️',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`m-0 p-0 box-border`}>
        <InfoWrapper> {/* Place InfoWrapper outside */}
          <AuthProvider>
            {children}
          </AuthProvider>
        </InfoWrapper>
      </body>
    </html>
  );
}
