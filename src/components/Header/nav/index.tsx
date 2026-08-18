"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./style.module.scss";

interface NavProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Nav({ isOpen, onClose }: NavProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(
        () => {
            tlRef.current = gsap
                .timeline({ paused: true })
                .to(containerRef.current, {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.1,
                    ease: "expo.inOut",
                })
                .from(
                    `.${styles.lineWrapper}`,
                    {
                        yPercent: 100,
                        duration: 0.8,
                        stagger: 0.06,
                        ease: "power3.out",
                    },
                    "-=0.5"
                )
                .from(
                    `.${styles.socialWrapper}`,
                    {
                        yPercent: 100,
                        duration: 0.6,
                        stagger: 0.05,
                        ease: "power3.out",
                    },
                    "-=0.4"
                );
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
        <div
            ref={containerRef}
            className={`${styles.navContainer} ${isOpen ? styles.isOpen : ""}`}
        >
            <div className={styles.navInner}>
                <div className={styles.menuLinks}>
                    <div className={styles.overflowRow}>
                        <div className={styles.lineWrapper}>
                            <div className={styles.itemGroup}>
                                <Link href="/" onClick={onClose} className={styles.menuLink}>
                                    <span className={styles.textPrimary}>Index</span>
                                    <span className={styles.textSecondary} aria-hidden="true">
                                        Index
                                    </span>
                                </Link>
                                <div className={`${styles.note} ${styles.noteLeft}`}>Home</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.overflowRow}>
                        <div className={styles.lineWrapper}>
                            <div className={styles.itemGroup}>
                                <Link
                                    href="/"
                                    onClick={onClose}
                                    className={styles.menuLink}
                                >
                                    <span className={styles.textPrimary}>Services</span>
                                    <span className={styles.textSecondary} aria-hidden="true">
                                        Services
                                    </span>
                                </Link>
                                <div className={`${styles.note} ${styles.noteRight}`}>
                                    What we do
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.overflowRow}>
                        <div className={styles.lineWrapper}>
                            <div className={styles.itemGroup}>
                                <Link
                                    href="/"
                                    onClick={onClose}
                                    className={styles.menuLink}
                                >
                                    <span className={styles.textPrimary}>Our Work</span>
                                    <span className={styles.textSecondary} aria-hidden="true">
                                        Our Work
                                    </span>
                                </Link>
                                <div className={`${styles.note} ${styles.noteLeft}`}>
                                    Projects
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.overflowRow}>
                        <div className={styles.lineWrapper}>
                            <div className={`${styles.itemGroup} ${styles.mediaRow}`}>
                                <div className={styles.asterisk}>
                                    <svg
                                        viewBox="0 0 53 54"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M53 18.8458L31.6544 27.0011L53 35.5176L46.8501 45.8469L29.1215 31.3491L32.5592 54H20.6222L23.8785 31.3491L6.14993 45.8469L0 35.5176L21.527 27.0011L0 18.8458L6.14993 8.15529L23.8785 22.6509L20.6222 0H32.5592L29.1215 22.4692L46.8501 8.15529L53 18.8458Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>

                                <div className={styles.bracketGroup}>
                                    <span className={styles.bracket}>(</span>
                                    <div className={styles.imageThumbnail}>
                                        <Image
                                            src="/images/src.jpg"
                                            alt="Showreel preview"
                                            fill
                                            priority
                                        />
                                    </div>
                                    <span className={styles.bracket}>)</span>
                                </div>

                                <div className={`${styles.note} ${styles.noteRight}`}>
                                    Showreel
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.overflowRow}>
                        <div className={styles.lineWrapper}>
                            <div className={styles.itemGroup}>
                                <Link
                                    href="/"
                                    onClick={onClose}
                                    className={styles.menuLink}
                                >
                                    <span className={styles.textPrimary}>About</span>
                                    <span className={styles.textSecondary} aria-hidden="true">
                                        About
                                    </span>
                                </Link>
                                <div className={`${styles.note} ${styles.noteLeft}`}>
                                    Who we are
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.overflowRow}>
                        <div className={styles.lineWrapper}>
                            <div className={styles.itemGroup}>
                                <Link
                                    href="/"
                                    onClick={onClose}
                                    className={styles.menuLink}
                                >
                                    <span className={styles.textPrimary}>Contact</span>
                                    <span className={styles.textSecondary} aria-hidden="true">
                                        Contact
                                    </span>
                                </Link>
                                <div className={`${styles.note} ${styles.noteRight}`}>
                                    Get in touch
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.footerCol}>
                        <div className={styles.socialWrapper}>
                            (
                            <Link
                                href="mailto:ana@adcker.com"
                                className={styles.socialLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className={styles.textPrimary}>Email</span>
                                <span className={styles.textSecondary} aria-hidden="true">
                                    Email
                                </span>
                            </Link>
                            )
                        </div>
                    </div>

                    <div className={styles.footerCol}>
                        <div className={styles.socialWrapper}>
                            (
                            <Link
                                href="https://www.instagram.com/adcker_/"
                                className={styles.socialLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className={styles.textPrimary}>Instagram</span>
                                <span className={styles.textSecondary} aria-hidden="true">
                                    Instagram
                                </span>
                            </Link>
                            )
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}