"use client";

import styles from "./page.module.css";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <div className={styles.page}>
      <Preloader />
    </div>
  );
}
