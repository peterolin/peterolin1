"use client";
import Link from 'next/link'
import React from 'react';
import styles from "./navbar.module.css";

const links = [

    {
        id: 2,
        title: "Articles",
        url: "/articles"
    }, {
        id: 3,
        title: "Blog",
        url: "/blog"
    }, {
        id: 4,
        title: "About",
        url: "/about"
    }, {
        id: 5,
        title: "Contact",
        url: "/contact"
    }, {
        id: 6,
        title: "Dashboard",
        url: "/dashboard"
    }
]


const Navbar = () => {
    return (
            <div className={styles.container} >
                <Link className={styles.logo} href="/">PO</Link>
                <div className={styles.links}>
                    {links.map((link) => (
                        <Link key={link.id} href={link.url} className={styles.link}>{link.title}</Link>
                    ))}
                </div>
                <button className={styles.logout} onClick={() => {
                console.log("Logged out")
            }}>
                Logout
            </button>
            </div >
    )
}

export default Navbar