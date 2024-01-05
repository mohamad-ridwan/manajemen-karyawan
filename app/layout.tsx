import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import WrapContext from '@/utils/context/WrapContext'
import ApolloWrapper from '@/lib/graphql/apolloWrapper'
import WrapNotifAlert from '@/components/NotifAlert/WrapNotifAlert'
import WrapNotifConnection from '@/components/NotifAlert/WrapNotifConnection'
import WrapPopupModal from '@/components/Forms/WrapPopupModal'
import { customPopupModal } from '@/components/CustomTheme'

const inter = Roboto({ weight: ['400', '300', '500', '700'], subsets: [] })

export const metadata: Metadata = {
  title: 'Manajemen Karyawan',
  description: 'Aplikasi Manajemen Karyawan dan merupakan sistem kehadiran Karyawan',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/logo.png'
    }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WrapContext>
          <ApolloWrapper>
            <WrapPopupModal
              customPopupModal={customPopupModal}
            />
            <WrapNotifAlert />
            <WrapNotifConnection />
            {children}
          </ApolloWrapper>
        </WrapContext>
      </body>
    </html>
  )
}
