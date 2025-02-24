import { Navbar } from "./Navbar"

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Navbar />
      <main className="bg-green500 w-full flex-1 flex flex-col justify-center items-center">
        {children}
      </main>
    </div>
  )
}
