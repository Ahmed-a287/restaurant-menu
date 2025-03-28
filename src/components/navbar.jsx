'use client';
import React, { useState } from 'react';
import styles from '../styles/navbar.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(true);
    // Set timeout to close the menu after 10 seconds
    setTimeout(() => {
      setMenuOpen(false);
    }, 5000);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Image src="/logoo.png" alt="Logo" width={100} height={100} priority />
      </div>

      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Flavor Haven</h1>
        <h3 className={styles.subTitle}>
          A welcoming place where every dish is a treat!
        </h3>
      </div>

      {/* Burger Icon */}
      <div
        className={styles.burger}
        onClick={toggleMenu}
        role="button"
        aria-label="Toggle menu"
      >
        <div className={styles.burgerLine}></div>
        <div className={styles.burgerLine}></div>
        <div className={styles.burgerLine}></div>
      </div>

      {/* Overlay Menu */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.showOverlay : ''}`}
        role="navigation"
        data-testid="menu-overlay"
      >
        <ul className={styles.navLinks}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/menu">Menu</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
