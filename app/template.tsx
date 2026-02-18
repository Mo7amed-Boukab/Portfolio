"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const anim = (variants: any) => ({
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
});

const transition = { duration: 1, ease: [0.76, 0, 0.24, 1] };

const opacity = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 1, delay: 0.2 } },
    exit: { opacity: 1 },
};

const slide = {
    initial: { top: "100vh" },
    enter: { top: "100vh" },
    exit: {
        top: "0",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
};

const curve = (initialPath: string, targetPath: string) => ({
    initial: { d: initialPath },
    enter: {
        d: targetPath,
        transition: { duration: 0.8, delay: 0, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
        d: initialPath,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
});

const text = {
    initial: { opacity: 1, bottom: -100 },
    enter: {
        opacity: 0,
        bottom: 0,
        transition: { duration: 0.5, delay: 0.35, ease: [0.33, 1, 0.68, 1] },
        transitionEnd: { top: "47.5%", opacity: 0 }
    },
    exit: {
        opacity: 1,
        bottom: "50%",
        transition: { duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] }
    }
};

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const resize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    const { width, height } = dimensions;

    if (width === 0) return null;

    const initialPath = `M0 300 Q${width / 2} 0 ${width} 300 L${width} ${height + 300} Q${width / 2} ${height + 600} 0 ${height + 300} L0 0`;
    const targetPath = `M0 300 Q${width / 2} 0 ${width} 300 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;

    return (
        <div className="relative">
            <div
                style={{ opacity: dimensions.width > 0 ? 0 : 1 }}
                className="fixed inset-0 bg-background z-[200] pointer-events-none"
            />

            <motion.div {...anim(opacity)}>
                <div className="relative z-10">
                    {children}
                </div>
            </motion.div>

            {/* SVG Transition Layer */}
            <div className="fixed top-0 left-0 w-full h-[calc(100vh+600px)] pointer-events-none z-[200] -translate-y-[300px]">
                <motion.svg
                    style={{ height: "100%", width: "100%" }}
                    initial={{ top: "0" }}
                    animate={{
                        top: "-100vh",
                        transition: { duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] },
                        transitionEnd: { display: "none" }
                    }}
                    className="absolute left-0 w-full"
                >
                    <motion.path
                        variants={curve(initialPath, targetPath) as any}
                        initial="initial"
                        animate="enter"
                        className="fill-background"
                    />
                </motion.svg>
            </div>

            {/* Center Text during transition */}
            <motion.p
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-foreground text-[4vw] font-bold z-[210] pointer-events-none uppercase tracking-widest text-center"
                initial={{ opacity: 1 }}
                animate={{
                    opacity: 0,
                    transition: { duration: 0.4, delay: 0.45 },
                    transitionEnd: { display: "none" }
                }}
            >
                {pathname === "/" ? "Home" : pathname.split('/').pop() || "Project"}
            </motion.p>
        </div>
    );
}
