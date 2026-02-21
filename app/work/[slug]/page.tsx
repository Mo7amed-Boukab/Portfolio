"use client";

import React, { useRef, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowLeft, ExternalLink, Code, Layout, Github, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

export default function ProjectPage() {
    const { slug } = useParams();
    const router = useRouter();
    const project = projects.find((p) => p.slug === slug);
    const projectIndex = projects.findIndex((p) => p.slug === slug);
    const nextProject = projects[(projectIndex + 1) % projects.length];

    // Carousel state
    const allImages = [project?.image, ...(project?.gallery || [])].filter(Boolean) as string[];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-scroll effect
    useEffect(() => {
        if (isHovered || allImages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % allImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isHovered, allImages.length]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-foreground font-bold uppercase tracking-widest">
                Project not found
            </div>
        );
    }

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % allImages.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 md:pt-40 pb-10 md:pb-20 px-4 md:px-[60px] overflow-x-hidden">
            <div className="max-w-[1440px] mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="mb-10 md:mb-24"
                >
                    <Link
                        href="/#works"
                        className="relative z-[100] inline-flex items-center gap-2 text-foreground/50 hover:text-accent transition-colors mb-8 md:mb-12 uppercase tracking-widest text-[10px] md:text-[12px] font-bold group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-10">
                        <div>
                            <p className="text-accent uppercase tracking-[0.3em] text-[10px] md:text-[12px] font-bold mb-2 md:mb-4">
                                {project.category}
                            </p>
                            <h1 className="text-[28px] md:text-[60px] lg:text-[72px] font-bold leading-[1.1] uppercase tracking-tighter">
                                {project.title}
                            </h1>
                        </div>
                        <div className="flex gap-8 md:gap-10 pb-2 md:pb-4 border-b border-border/20 lg:border-none">
                            <div className="flex flex-col gap-0.5 md:gap-1">
                                <span className="text-foreground/30 text-[9px] md:text-[10px] uppercase tracking-widest font-mono">Year</span>
                                <span className="text-sm md:text-base font-bold">{project.year}</span>
                            </div>
                            <div className="flex flex-col gap-0.5 md:gap-1">
                                <span className="text-foreground/30 text-[9px] md:text-[10px] uppercase tracking-widest font-mono">Role</span>
                                <span className="text-sm md:text-base font-bold">Full Stack</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Exceptionally Animated Cinematic Showcase */}
                <div className="relative mb-12 md:mb-24 group/carousel z-0"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-background border border-border/50 touch-pan-y">
                        {allImages.length > 0 ? (
                            allImages.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={false}
                                    animate={{
                                        x: `${(idx - currentIndex) * 100}%`,
                                        scale: idx === currentIndex ? (isHovered ? 1.02 : 1) : 0.9,
                                        opacity: idx === currentIndex ? 1 : 0,
                                        rotateY: idx === currentIndex ? 0 : idx < currentIndex ? 15 : -15,
                                    }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.7}
                                    onDragEnd={(_, info) => {
                                        const swipeThreshold = 50;
                                        if (info.offset.x > swipeThreshold) {
                                            prevImage();
                                        } else if (info.offset.x < -swipeThreshold) {
                                            nextImage();
                                        }
                                    }}
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        scale: { duration: 0.8 },
                                        opacity: { duration: 0.6 },
                                        rotateY: { duration: 0.8 }
                                    }}
                                    className={`absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing ${idx === currentIndex ? 'pointer-events-auto' : 'pointer-events-none'}`}
                                >
                                    {/* Blurred Background to fill margins while keeping complete view */}
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <Image
                                            src={img}
                                            alt="Context Blur"
                                            fill
                                            className="object-cover blur-3xl opacity-30 scale-110"
                                        />
                                    </div>

                                    {/* Complete View layer */}
                                    <div className="relative w-full h-full p-2 md:p-8 pointer-events-none">
                                        <Image
                                            src={img}
                                            alt={`${project.title} frame ${idx}`}
                                            fill
                                            className="object-contain transition-all duration-1000"
                                            priority={idx === currentIndex}
                                        />
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-foreground/20 font-mono text-[10px] uppercase tracking-widest">
                                Visual documentation pending
                            </div>
                        )}

                        {/* Pagination Overlay - Forced visible on mobile, hover on desktop */}
                        <div className="absolute inset-x-0 bottom-4 md:bottom-8 flex justify-center gap-2 md:gap-4 z-[60] opacity-100 md:opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
                            {allImages.length > 1 && allImages.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setCurrentIndex(idx);
                                    }}
                                    className={`h-1.5 md:h-1.5 transition-all duration-500 rounded-full shadow-lg cursor-pointer ${idx === currentIndex ? 'w-10 md:w-16 bg-accent' : 'w-3 md:w-4 bg-white/40 md:bg-white/20'}`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* Side Controls */}
                        {allImages.length > 1 && (
                            <div className="hidden md:contents">
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-[70] p-6 rounded-full bg-background/20 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover/carousel:opacity-100 hover:bg-accent hover:scale-110 transition-all duration-300"
                                >
                                    <ChevronLeft size={28} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-[70] p-6 rounded-full bg-background/20 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover/carousel:opacity-100 hover:bg-accent hover:scale-110 transition-all duration-300"
                                >
                                    <ChevronRight size={28} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 mb-20 md:mb-32">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="lg:col-span-8 order-2 lg:order-1"
                    >
                        <h2 className="text-[11px] md:text-[13px] font-semibold uppercase tracking-widest text-accent mb-4 md:mb-6">Executive Summary</h2>
                        <p className="text-base md:text-xl font-light leading-relaxed text-foreground/90">
                            {project.description}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="lg:col-span-4 order-1 lg:order-2"
                    >
                        <div className="bg-foreground/5 p-6 md:p-8 border border-border lg:sticky lg:top-32 space-y-8 md:space-y-12">
                            <div>
                                <h3 className="flex items-center gap-3 text-[11px] md:text-[12px] font-bold uppercase tracking-widest mb-4 md:mb-6 border-b border-border/40 pb-3 md:pb-4">
                                    <Code size={14} className="text-accent" /> Technical Infrastructure
                                </h3>
                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                    {project.tech.map((t) => (
                                        <span key={t} className="px-2.5 py-1 md:px-3 md:py-1.5 bg-background border border-border text-[9px] md:text-[10px] font-bold hover:border-accent transition-colors duration-300 uppercase tracking-wider">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="flex items-center gap-3 text-[11px] md:text-[12px] font-bold uppercase tracking-widest mb-4 md:mb-6 border-b border-border/40 pb-3 md:pb-4">
                                    <Layout size={14} className="text-accent" /> Access Point
                                </h3>
                                <div className="flex flex-col gap-3 md:gap-4">
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between p-3 md:p-4 bg-accent text-accent-foreground font-bold uppercase tracking-widest text-[10px] md:text-[11px] hover:scale-[1.02] transition-transform"
                                        >
                                            Live Deployment <ExternalLink size={14} />
                                        </a>
                                    )}
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-between p-3 md:p-4 border border-border hover:border-accent font-bold uppercase tracking-widest text-[10px] md:text-[11px] transition-all"
                                    >
                                        Repository <Github size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Vertical Separator */}
                <div className="w-px h-16 md:h-32 bg-border/40 mx-auto mb-10 md:mb-40" />

                {/* Next Project Link */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden bg-foreground/[0.02] border border-border py-16 md:py-40 text-center cursor-pointer transition-colors hover:bg-foreground/[0.04]"
                    onClick={() => {
                        window.scrollTo(0, 0);
                        router.push(`/work/${nextProject.slug}`);
                    }}
                >
                    <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                    <span className="relative z-10 text-foreground/30 uppercase tracking-[0.4em] text-[10px] md:text-[14px] font-bold mb-4 md:mb-8 block group-hover:text-accent transition-colors">Discover Next</span>
                    <h2 className="relative z-10 text-[24px] md:text-[80px] font-bold uppercase tracking-tighter transition-transform duration-500 group-hover:scale-105">
                        {nextProject.title}
                    </h2>
                    <div className="relative z-10 mt-6 md:mt-12 inline-flex items-center gap-3 text-accent font-bold uppercase tracking-widest text-[10px] md:text-xs opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        View Case Study <ArrowLeft className="rotate-180" size={14} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
