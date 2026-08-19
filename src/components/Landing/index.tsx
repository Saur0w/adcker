"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);


interface LandingProps {
    isReady: boolean;
}

export default function Landing({ isReady }: LandingProps) {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (!isReady) return;

            gsap.fromTo(
                ".reveal-item",
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.12,
                    ease: "power4.out",
                }
            );
        },
        { dependencies: [isReady], scope: containerRef }
    );
    
    return (
        <section className={styles.landing} ref={containerRef}>
            <div className={styles.body}>

            </div>
        </section>
    );
}