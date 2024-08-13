import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({ children }) {
  return (
  
    <html lang="en">

      <body className={inter.className}>
      <div >
        {/* Layout UI */}
        <section className="top_level_container"><Navbar />
          {children}
          <Footer /></section>
          </div>
      </body>
    </html>
  )
}