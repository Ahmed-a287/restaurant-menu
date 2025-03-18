'use client';
import React, { useState } from 'react';
import styles from '../style/Navbar.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Image src="/logoo.png" alt="Logo" width={100} height={100} priority />
      </div>

      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Flavor Haven</h1>
        <h3 className={styles.subTitle}>
          A welcoming place where every dish is a treat.
        </h3>
      </div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
        <li>
          <Link href="/menu">Menu</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
