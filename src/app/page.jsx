// `app/page.js` is the UI for the `/` URL
import "./globals.css"
import Link from 'next/link'
import styles from "./app.module.css"

export const metadata = {
  title: 'Next.js',
}


export default function Page() {
  return (

  <><h1>Hello, Home page!</h1>

Home page contents.

  </>
  )
}
