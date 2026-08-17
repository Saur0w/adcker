"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./style.module.scss";

interface PerspectiveTextProps {
    label?: string;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function PerspectiveText({
                                            label,
                                            children,
                                            className = "",
                                            onClick,
                                        }: PerspectiveTextProps) {
    const content = label ?? children;

    const containerRef = useRef<HTMLDivElement>(null);
    const item1Ref = useRef<HTMLDivElement>(null);
    const item2Ref = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(
        () => {
            if (!item1Ref.current || !item2Ref.current) return;

            gsap.set(item1Ref.current, { transformOrigin: "50% 100%" });
            gsap.set(item2Ref.current, {
                yPercent: 100,
                rotateX: -90,
                opacity: 0,
                transformOrigin: "50% 0%",
            });

            tlRef.current = gsap
                .timeline({ paused: true })
                .to(
                    item1Ref.current,
                    {
                        yPercent: -100,
                        rotateX: 90,
                        opacity: 0,
                        duration: 0.45,
                        ease: "power3.inOut",
                    },
                    0
                )
                .to(
                    item2Ref.current,
                    {
                        yPercent: 0,
                        rotateX: 0,
                        opacity: 1,
                        duration: 0.45,
                        ease: "power3.inOut",
                    },
                    0
                );
        },
        { scope: containerRef }
    );

    const handleMouseEnter = () => tlRef.current?.play();
    const handleMouseLeave = () => tlRef.current?.reverse();

    return (
        <div
            ref={containerRef}
            className={`${styles.perspectiveText} ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <div ref={item1Ref} className={styles.item}>
                {content}
            </div>
            <div
                ref={item2Ref}
                className={`${styles.item} ${styles.clone}`}
                aria-hidden="true"
            >
                {content}
            </div>
        </div>
    );
}