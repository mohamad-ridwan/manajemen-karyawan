import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import WrapContext from '@/utils/context/WrapContext'
import logo from '@/images/logo.png'
import AuthSession from '@/components/AuthSession'
import ApolloWrapper from '@/lib/graphql/apolloWrapper'
import WrapNotifAlert from '@/components/NotifAlert/WrapNotifAlert'
import WrapNotifConnection from '@/components/NotifAlert/WrapNotifConnection'
import WrapPopupModal from '@/components/Forms/WrapPopupModal'
import HeadNavigation from '@/components/Navigation/HeadNavigation'
import NavDesktop from '@/components/Navigation/NavDesktop'
import authSessions from '@/lib/authSessions'
import WrapNavigation from '@/components/Navigation/WrapNavigation'

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
  const users = await authSessions()

  return (
    <html lang="en">
      <body className={inter.className}>
        <WrapContext>
          <ApolloWrapper>
            {/* <AuthSession users={users} /> */}
            <WrapPopupModal />
            <WrapNotifAlert />
            <WrapNotifConnection />
            {/* <WrapNavigation
              users={users}
              headNavigation={<HeadNavigation logo={logo} />}
            >
              <NavDesktop
                users={users}
                headNavigation={<HeadNavigation logo={logo} />}
              />
            </WrapNavigation> */}
            {children}
          </ApolloWrapper>
        </WrapContext>
      </body>
    </html>
  )
}
