"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import styles from "./style.module.scss";

gsap.registerPlugin(SplitText);

interface PerspectiveTextProps {
    label?: string;
    children?: React.ReactNode;
    className?: string;
}

export default function PerspectiveText({
                                            label,
                                            children,
                                            className = "",
                                        }: PerspectiveTextProps) {
    const content = label ?? children;
    const isString = typeof content === "string";

    const containerRef = useRef<HTMLDivElement>(null);
    const item1Ref = useRef<HTMLDivElement>(null);
    const item2Ref = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(
        () => {
            if (!item1Ref.current || !item2Ref.current) return;

            let targets1: gsap.DOMTarget = item1Ref.current;
            let targets2: gsap.DOMTarget = item2Ref.current;
            let split1: SplitText | null = null;
            let split2: SplitText | null = null;

            // Only run SplitText if the input is a plain text string
            if (isString) {
                split1 = new SplitText(item1Ref.current, { type: "chars" });
                split2 = new SplitText(item2Ref.current, { type: "chars" });
                targets1 = split1.chars;
                targets2 = split2.chars;
            }

            gsap.set(targets1, { transformOrigin: "50% 100%" });
            gsap.set(targets2, {
                yPercent: 100,
                rotateX: -90,
                opacity: 0,
                transformOrigin: "50% 0%",
            });

            tlRef.current = gsap
                .timeline({ paused: true })
                .to(
                    targets1,
                    {
                        yPercent: -100,
                        rotateX: 90,
                        opacity: 0,
                        duration: 0.45,
                        ease: "power3.inOut",
                        stagger: isString ? 0.025 : 0,
                    },
                    0
                )
                .to(
                    targets2,
                    {
                        yPercent: 0,
                        rotateX: 0,
                        opacity: 1,
                        duration: 0.45,
                        ease: "power3.inOut",
                        stagger: isString ? 0.025 : 0,
                    },
                    0
                );

            return () => {
                split1?.revert();
                split2?.revert();
            };
        },
        { scope: containerRef, dependencies: [isString] }
    );

    const handleMouseEnter = () => tlRef.current?.play();
    const handleMouseLeave = () => tlRef.current?.reverse();

    return (
        <div
            ref={containerRef}
            className={`${styles.perspectiveText} ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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