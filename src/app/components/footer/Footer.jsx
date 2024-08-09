import React from 'react'
import Link from 'next/link'
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>by Peter Olin for KVP IT-position</div>
      <div>Thanks to <Link href="https://www.youtube.com/@LamaDev">Lama Dev</Link> for tutorials</div>

    </div>
  )
}

export default Footer