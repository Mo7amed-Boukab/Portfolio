"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowLeft, ExternalLink, Calendar, Code, Layout } from "lucide-react";
import Image from "next/image";

export default function ProjectPage() {
    const { slug } = useParams();
    const router = useRouter();
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-foreground">
                Project not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 md:pt-32 pb-20 px-6 md:px-[60px]">
            <div className="max-w-[1440px] mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="mb-20"
                >
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-foreground/50 hover:text-accent transition-colors mb-12 uppercase tracking-widest text-[12px] font-bold group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </button>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <div>
                            <p className="text-accent uppercase tracking-[0.3em] text-[13px] font-bold mb-4">
                                {project.category}
                            </p>
                            <h1 className="text-[40px] md:text-[80px] lg:text-[100px] font-bold leading-none uppercase tracking-tighter">
                                {project.title}
                            </h1>
                        </div>
                        <div className="flex gap-10 pb-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-foreground/30 text-[11px] uppercase tracking-widest font-mono">Year</span>
                                <span className="text-lg font-bold">{project.year}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-foreground/30 text-[11px] uppercase tracking-widest font-mono">Role</span>
                                <span className="text-lg font-bold">Full Stack</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Image Section with Expansion Animation */}
                <motion.div
                    layoutId={`project-image-${project.slug}`}
                    className="relative aspect-[16/10] md:aspect-[16/7] w-full overflow-hidden mb-12 md:mb-20 bg-foreground/5"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                </motion.div>

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="lg:col-span-8"
                    >
                        <h2 className="text-[14px] font-semibold uppercase tracking-widest text-accent mb-8">Overview</h2>
                        <p className="text-2xl md:text-3xl font-medium leading-relaxed text-foreground/80 mb-12">
                            {project.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="flex items-center gap-3 text-[14px] font-bold uppercase tracking-widest mb-6">
                                    <Code size={18} className="text-accent" /> Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {project.tech.map((t) => (
                                        <span key={t} className="px-4 py-2 bg-foreground/5 border border-border text-sm hover:border-accent transition-colors duration-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="flex items-center gap-3 text-[14px] font-bold uppercase tracking-widest mb-6">
                                    <Layout size={18} className="text-accent" /> Project Link
                                </h3>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 text-xl font-bold hover:text-accent transition-colors group"
                                >
                                    Visit Website <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="lg:col-span-4"
                    >
                        <div className="bg-foreground/5 p-6 md:p-10 border border-border sticky top-32">
                            <h3 className="text-[14px] font-bold uppercase tracking-widest mb-6 md:mb-8 border-b border-border pb-4">Key Features</h3>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                                    <p className="text-foreground/70">Custom-built state management for complex data flows.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                                    <p className="text-foreground/70">Responsive design optimized for all device sizes.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                                    <p className="text-foreground/70">High-performance animations using Framer Motion.</p>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Next Project Link */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 md:mt-40 border-t border-border pt-20 text-center"
                >
                    <p className="text-foreground/30 uppercase tracking-[0.3em] text-[13px] font-bold mb-6">Next Project</p>
                    <a href="#" className="text-[32px] md:text-[60px] font-bold uppercase tracking-tighter hover:text-accent transition-colors duration-500">
                        Project Beta
                    </a>
                </motion.div>
            </div>
        </div>

    );
}
