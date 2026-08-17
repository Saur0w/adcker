"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(gsap, SplitText, useGSAP);

interface NavProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Nav({ isOpen, onClose }: NavProps)  {
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true })
        .to(containerRef.current, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.75
        })
    }, {
        scope: containerRef
    })
    useGSAP(() => {
        if (isOpen) {
            tlRef.current?.play();
        } else {
            tlRef.current?.reverse();
        }
    }, [isOpen]);

    return (
        <div className={styles.navContainer} ref={containerRef}>

        </div>
    )
}