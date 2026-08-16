"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

interface ImageProps {
    src: string;
    alt: string;
}

const images: ImageProps[] = [
    {
        src: "/images/1.jpg",
        alt: "Portrait"
    },
    {
        src: "/images/2.jpg",
        alt: "Moon walk me home"
    },
    {
        src: "/images/3.jpg",
        alt: "Flower"
    },
    {
        src: "/images/4.jpg",
        alt: "Clouds"
    },
    {
        src: "/images/5.jpg",
        alt: "Mountain"
    },
    {
        src: "/images/6.jpg",
        alt: "Book"
    },
    {
        src: "/images/7.jpg",
        alt: "Flower"
    },
    {
        src: "/images/8.jpg",
        alt: "Butterfly"
    },
    {
        src: "/images/9.jpg",
        alt: "Mantis"
    },
    {
        src: "/images/10.jpg",
        alt: "Happy"
    }
]

export default function Preloader() {
    const preloaderRef = useRef<HTMLElement>(null);
    const imageRef = useRef<(HTMLDivElement | null)[]>([]);
    const counterRef = useRef<HTMLSpanElement>(null);
    return (
        <aside
            className={styles.preloader}
            ref={preloaderRef}
            role="status"
            aria-live="polite"
            aria-label="Loading page content"
        >
            <div className={styles.content}>
                <span className={styles.glyph} aria-hidden="true">*</span>
                <span className={styles.bracket} aria-hidden="true">(</span>
                <div className={styles.imageContainer} aria-hidden="true">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            ref={(el) => { imageRef.current[i] = el; }}
                            className={styles.imageWrapper}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                priority={i < 2}
                            />
                        </div>
                    ))}
                </div>
                <span className={styles.bracket} aria-hidden="true">)</span>

                <span className={styles.counter} ref={counterRef}>
                    0%
                </span>
            </div>
        </aside>
    );
}