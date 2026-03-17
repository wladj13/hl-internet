import SplashScreen from '@/components/SplashScreen'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SplashScreen />
      {children}
    </>
  )
}
