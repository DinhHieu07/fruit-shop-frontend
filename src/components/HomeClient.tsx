"use client";
import styles from "../styles/HomeClient.module.css";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import Navbar from "./Navbar";

export default function HomeClient() {
  return (
    <section className={styles.container}>
      <Header />
      <div className={styles.main}>
        <Navbar />
        <section className={styles.homePageContainer}>
          <HomePage />
        </section>
      </div>
      <Footer />
    </section>
  );
}
