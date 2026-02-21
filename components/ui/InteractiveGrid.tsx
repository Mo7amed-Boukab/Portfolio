"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export const InteractiveCursor: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isDark, setIsDark] = useState(true);

    // Position of the mouse
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring physics for "liquid/fluid" feeling
    const springConfig = { damping: 25, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button');
            setIsHovering(!!isClickable);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            observer.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Point[] = [];
        const particleCount = 45;
        const connectionDistance = 140;
        const mouseRadius = 300;
        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 1.2,
                    vy: (Math.random() - 0.5) * 1.2
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const mx = mouseX.get();
            const my = mouseY.get();

            const currentIsDark = document.documentElement.classList.contains('dark');
            const primaryColor = currentIsDark ? "126, 172, 181" : "30, 80, 90";
            const particleColor = currentIsDark ? "255, 255, 255" : "0, 0, 0";

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                const dxm = mx - p.x;
                const dym = my - p.y;
                const distM = Math.sqrt(dxm * dxm + dym * dym);

                if (distM < mouseRadius) {
                    const opacityBase = (1 - distM / mouseRadius);

                    for (let j = i + 1; j < particles.length; j++) {
                        const p2 = particles[j];
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < connectionDistance) {
                            const lineOpacity = (1 - distance / connectionDistance) * opacityBase * (currentIsDark ? 0.6 : 0.8);
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(${primaryColor}, ${lineOpacity})`;
                            ctx.lineWidth = currentIsDark ? 1.4 : 1.2;
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();

                            if (currentIsDark && lineOpacity > 0.3) {
                                ctx.shadowBlur = 6;
                                ctx.shadowColor = `rgba(${primaryColor}, 0.6)`;
                                ctx.stroke();
                                ctx.shadowBlur = 0;
                            }
                        }
                    }

                    if (distM < connectionDistance * 1.8) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${primaryColor}, ${(1 - distM / (connectionDistance * 1.8)) * (currentIsDark ? 0.5 : 0.4)})`;
                        ctx.lineWidth = 1.2;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mx, my);
                        ctx.stroke();
                    }
                }

                ctx.fillStyle = `rgba(${particleColor}, ${distM < mouseRadius ? (currentIsDark ? 0.6 : 0.5) : (currentIsDark ? 0.2 : 0.15)})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, currentIsDark ? 1.5 : 1, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-[-1] opacity-70"
            />

            <div className="fixed inset-0 pointer-events-none z-[9999]">
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        x: mouseX,
                        y: mouseY,
                        translateX: "-50%",
                        translateY: "-50%",
                        width: isHovering ? 16 : 10,
                        height: isHovering ? 16 : 10,
                        backgroundColor: isDark ? "white" : "rgba(67, 124, 145, 0.95)",
                        boxShadow: isDark
                            ? "0 0 20px rgba(255,255,255,0.4)"
                            : "0 0 10px rgba(0,0,0,0.1)",
                        zIndex: 100,
                    }}
                />

                <motion.div
                    className="absolute border rounded-full"
                    style={{
                        x: springX,
                        y: springY,
                        translateX: "-50%",
                        translateY: "-50%",
                        width: isHovering ? 90 : 60,
                        height: isHovering ? 90 : 60,
                        borderColor: isDark ? "rgba(143, 214, 214, 0.29)" : "rgba(21, 52, 63, 0.3)",
                        backgroundColor: isHovering
                            ? (isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(12, 132, 192, 0.05)")
                            : "transparent",
                        borderWidth: isHovering ? 2 : 1,
                    }}
                />
            </div>

            <style jsx global>{`
                body {
                    cursor: none !important;
                }
                a, button, [role="button"] {
                    cursor: none !important;
                }
            `}</style>
        </>
    );
};
