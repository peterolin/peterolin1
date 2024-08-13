// `app/page.jsx` is the UI for the `/` URL
import "./globals.css"


export const metadata = {
  title: 'Codetest',
  description: "PO's Codetest for KVP"
}


export default function Page() {

  return (

    <>
  {  console.log("process.env", process.env)}

      <title>Codetest</title>
      <meta name="description" content="Home page" />

      <h1>Hello, Home page!</h1>

      ({process.env.REACT_APP_DB_HOST})
      Home page contents.

    </>
  )
}
