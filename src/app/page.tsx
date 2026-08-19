"use client";

import styles from "./page.module.css";
import { useState } from "react";
import Preloader from "@/components/Preloader";
import Landing from "@/components/Landing";
import Header from "@/components/Header";

export default function Home() {
    const [isReady, setReady] = useState(false);
  return (
    <div className={styles.page}>
        <Header />
        <Preloader />
        <Landing />
    </div>
  );
}
