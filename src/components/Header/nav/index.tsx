"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./style.module.scss";
import Image from "next/image";

interface NavProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Nav({ isOpen, onClose }: NavProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(
        () => {
            tlRef.current = gsap.timeline({ paused: true }).to(containerRef.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.2,
                ease: "expo.in",
            });
        },
        { scope: containerRef }
    );

    useGSAP(() => {
        if (isOpen) {
            tlRef.current?.play();
        } else {
            tlRef.current?.reverse();
        }
    }, [isOpen]);

    return (
        <div className={styles.navContainer} ref={containerRef}>
            <div className={styles.navWrapper}>
                <nav className={styles.navContent}>
                    <ul className={styles.menuList}>
                        <li className={styles.menuItem}>
                            <span className={styles.labelLeft}>Home</span>
                            <Link href="/" onClick={onClose} className={styles.link}>
                                INDEX
                            </Link>
                        </li>

                        <li className={styles.menuItem}>
                            <Link href="/services" onClick={onClose} className={styles.link}>
                                SERVICES
                            </Link>
                            <span className={styles.labelRight}>What we do</span>
                        </li>

                        <li className={styles.menuItem}>
                            <span className={styles.labelLeft}>Projects</span>
                            <Link href="/work" onClick={onClose} className={styles.link}>
                                OUR WORK
                            </Link>
                        </li>

                        <li className={`${styles.menuItem} ${styles.mediaItem}`}>
                            <span className={styles.symbol}>* (</span>
                            <div className={styles.imageBox}>
                                <Image
                                    src="/images/main.jpg"
                                    alt="Showreel preview"
                                    fill
                                />
                            </div>
                            <span className={styles.symbol}>)</span>
                            <span className={styles.labelRight}>Showreel</span>
                        </li>

                        <li className={styles.menuItem}>
                            <span className={styles.labelLeft}>Who we are</span>
                            <Link href="/" onClick={onClose} className={styles.link}>
                                ABOUT
                            </Link>
                        </li>

                        <li className={styles.menuItem}>
                            <Link href="/" onClick={onClose} className={styles.link}>
                                CONTACT
                            </Link>
                            <span className={styles.labelRight}>Get in touch</span>
                        </li>
                    </ul>
                </nav>

                <div className={styles.footer}>
                    <Link
                        href="mailto:contact@adcker.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                    >
                        ( Email )
                    </Link>
                    <Link
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                    >
                        ( Instagram )
                    </Link>
                </div>
            </div>
        </div>
    );
}