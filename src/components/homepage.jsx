'use client';
import React from 'react';
import styles from '../style/HomePage.module.scss';
import Image from 'next/image';
import heroImg from '../../public/heroThree.png';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heroHeader}>
        <div className={styles.visionText}>
          <h2>Our Vision </h2>
          <p>
            At Flavor Haven, we believe food is more than just a meal—it’s an
            experience. Our vision is to create a welcoming space where flavors
            tell a story, where every dish is crafted with passion, and where
            people come together to share moments of joy. We strive to blend
            tradition with innovation, bringing you a culinary journey that
            delights the senses and warms the heart.
          </p>
        </div>

        <Image
          src={heroImg}
          alt="Hero Image"
          layout="intrinsic"
          className={styles.heroImage}
        />
      </div>
    </div>
  );
};

export default Home;
