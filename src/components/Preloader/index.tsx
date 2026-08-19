"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./style.module.scss";

gsap.registerPlugin(useGSAP);

interface PreloaderProps {
    onComplete?: () => void;
}

interface PreloaderImage {
    src: string;
    alt: string;
}

const IMAGES: PreloaderImage[] = [
    { src: "/images/1.jpg", alt: "Frame 1" },
    { src: "/images/2.jpg", alt: "Frame 2" },
    { src: "/images/3.jpg", alt: "Frame 3" },
    { src: "/images/4.jpg", alt: "Frame 4" },
    { src: "/images/5.jpg", alt: "Frame 5" },
    { src: "/images/6.jpg", alt: "Frame 6" },
    { src: "/images/7.jpg", alt: "Frame 7" },
    { src: "/images/8.jpg", alt: "Frame 8" },
    { src: "/images/9.jpg", alt: "Frame 9" },
    { src: "/images/10.jpg", alt: "Frame 10" },
];

export default function Preloader({ onComplete }: PreloaderProps) {
    const containerRef = useRef<HTMLElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
    const bodyRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const cycleTl = gsap.timeline({ repeat: -1 });
            const validSlides = slidesRef.current.filter(Boolean) as HTMLDivElement[];

            if (validSlides.length > 1) {
                const frameDuration = 0.12;
                validSlides.forEach((slide, idx) => {
                    const nextSlide = validSlides[(idx + 1) % validSlides.length];
                    cycleTl
                        .to({}, { duration: frameDuration })
                        .set(slide, { autoAlpha: 0 })
                        .set(nextSlide, { autoAlpha: 1 });
                });
            }
            const counter = { val: 0 };
            const masterTl = gsap.timeline();

            masterTl.fromTo(bodyRef.current, {
                yPercent: 130,
                opacity: 0,
            }, {
                yPercent: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power4.out"
            });

            masterTl.to(counter, {
                val: 100,
                duration: 2.5,
                ease: "power2.inOut",
                onUpdate: () => {
                    if (counterRef.current) {
                        counterRef.current.textContent = `${Math.round(counter.val)}%`;
                    }
                },
            }, "-=0.6");

            masterTl.call(() => {
                cycleTl.kill();
            });

            masterTl.to(bodyRef.current, {
                opacity: 0,
                duration: 0.5,
                delay: 0.2,
                ease: "power4.out",
            })

            masterTl.fromTo(containerRef.current, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 1.1,
                ease: "power4.inOut",
                delay: 0.15
            });

            masterTl.set(containerRef.current, {
                display: "none",
            });

        },
        { scope: containerRef }
    );

    return (
        <aside
            className={styles.preloader}
            ref={containerRef}
            role="status"
            aria-live="polite"
            aria-label="Loading page content"
        >
            <div className={styles.body}>
                <div className={styles.whole}>
                    <div className={styles.main} ref={bodyRef}>
                        <div className={styles.symbol} aria-hidden="true">
                            <svg
                                viewBox="0 0 53 54"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M53 18.8458L31.6544 27.0011L53 35.5176L46.8501 45.8469L29.1215 31.3491L32.5592 54H20.6222L23.8785 31.3491L6.14993 45.8469L0 35.5176L21.527 27.0011L0 18.8458L6.14993 8.15529L23.8785 22.6509L20.6222 0H32.5592L29.1215 22.4692L46.8501 8.15529L53 18.8458Z" />
                            </svg>
                        </div>

                        <div className={styles.content}>
                            <span className={styles.bracket} aria-hidden="true">(</span>
                            <div className={styles.imageWrapper} aria-hidden="true">
                                {IMAGES.map((img, i) => (
                                    <div
                                        key={img.src}
                                        ref={(el) => {
                                            slidesRef.current[i] = el;
                                        }}
                                        className={styles.slide}
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            priority={i < 2}
                                            className={styles.image}
                                        />
                                    </div>
                                ))}
                            </div>
                            <span className={styles.bracket} aria-hidden="true">)</span>
                        </div>

                        <div className={styles.counter} ref={counterRef}>
                            0%
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}