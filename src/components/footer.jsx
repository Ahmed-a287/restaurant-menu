'use client';
import React from 'react';
import styles from '../style/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Restaurant. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
