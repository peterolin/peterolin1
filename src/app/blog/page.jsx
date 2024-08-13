"use client";
import Link from 'next/link'
import styles from "./page.module.css";
import { useState, useEffect } from 'react';



const Blog = ({ posts }) => {
  return (
    <>
      <title>Codetest: Blog</title>
      <meta name="description" content="Blog" />

      <div className={styles.container}>Blog</div>
    </>
  )

}
export default Blog;