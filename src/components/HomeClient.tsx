"use client";
import styles from "../styles/HomeClient.module.css";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import Navbar from "./Navbar";

export default function HomeClient() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Navbar />
        <section className={styles.homePageContainer}>
          <HomePage />
        </section>
      </main>
      <Footer />
    </div>
  );
}
