"use client";
import React from 'react'
import { useRouter } from 'next/navigation'

const Article = () => {
  const router = useRouter()
  console.log("router", router);
  return (
    <div>Article () </div>
  )
}

export default Article 