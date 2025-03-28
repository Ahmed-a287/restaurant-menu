import styles from '../../styles/about.module.scss';
import Image from 'next/image';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.subtitle}>
            Welcome to our restaurant! We offer a fantastic dining experience
            with passionate cooking and top-quality ingredients.
          </p>
        </div>
      </div>

      {/* About Content Section */}
      <div className={styles.content}>
        <div className={styles.grid}>
          {/* Bildsektion */}
          <div className={styles.imageContainer}>
            <Image
              src="/aboutres.jpg"
              alt="Restaurant Interior"
              fill
              sizes="100vw"
              priority
              className={styles.image}
            />
          </div>

          {/* Textsektion */}
          <div className={styles.textSection}>
            <h2>Our history</h2>
            <p>
              Our journey begins with a simple idea: to create a place where
              people can enjoy amazing food in a warm and inviting atmosphere.
            </p>
            <p>
              We combine traditional recipes with modern techniques to create a
              menu that is both innovative and rooted in our culture.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className={styles.values}>
        <h2>Contact us</h2>
        <div className={styles.cards}>
          {/* Phone Card */}
          <div className={styles.card}>
            <FaPhoneAlt size={24} className={styles.icon} />
            <p>
              For reservations and other queries, feel free to contact us at:
              07011223
            </p>
          </div>
          {/* Email Card */}
          <div className={styles.card}>
            <FaEnvelope size={24} className={styles.icon} />
            <p>
              For reservations and other queries, email us at: info@info.com
            </p>
          </div>
          {/* Social Media Card */}
          <div className={styles.card}>
            <div className={styles.socialIcons}>
              <FaFacebook size={24} className={styles.icon} />
              <FaInstagram size={24} className={styles.icon} />
              <FaTwitter size={24} className={styles.icon} />
            </div>
            <p>
              For reservations and other queries, contact us on social media:
              @flavor.h
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
