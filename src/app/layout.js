import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import {Inter} from "next/font/google";
import "./globals.css";


const inter = Inter({subsets: ["latin"]});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="container">
        {/* Layout UI */}
        <section><Navbar />
          {children}
          <Footer /></section>
          </div>
      </body>
    </html>
  )
}