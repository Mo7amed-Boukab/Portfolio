"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";
import Image from "next/image";

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const images = [project.image, ...(project.gallery || [])].filter(Boolean);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Link href={`/work/${project.slug}`}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[16/10] overflow-hidden mb-4 md:mb-6 bg-background border border-border/50 group-hover:border-accent/40 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]">
          <AnimatePresence mode="wait">
            {images.length > 0 ? (
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Adaptive background to fill empty spaces while keeping full image visible */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={images[currentImage]}
                    alt="Background Blur"
                    fill
                    className="object-cover blur-2xl opacity-40 scale-110"
                  />
                </div>

                {/* Complete Image - No cropping */}
                <div className="relative w-full h-full p-2 md:p-4">
                  <Image
                    src={images[currentImage]}
                    alt={`${project.title} - Frame ${currentImage}`}
                    fill
                    className="object-contain transition-transform duration-1000 group-hover:scale-[1.02]"
                  />
                </div>
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-foreground/20 font-mono text-[10px] uppercase tracking-widest">
                No preview available
              </div>
            )}
          </AnimatePresence>

          {/* Progress Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] md:h-[3px] bg-foreground/5 z-20">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                key={currentImage}
                transition={{ duration: 4.5, ease: "linear" }}
                className="h-full bg-accent origin-left"
              />
            </div>
          )}

          {/* Reveal Overlay - Adjusted for better mobile tap feedback */}
          <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="bg-background/40 backdrop-blur-md border border-white/5 w-full h-full flex items-center justify-center">
              <span className="bg-background/90 border border-white/10 px-4 md:px-6 py-2 md:py-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-accent shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                Explore Details
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start px-1">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-1 group-hover:text-accent transition-colors duration-300 tracking-tight">{project.title}</h3>
            <div className="flex items-center gap-2 md:gap-3">
              <p className="text-foreground/40 uppercase text-[9px] md:text-[11px] tracking-[0.2em] font-bold">{project.category}</p>
              <div className="w-1 h-1 bg-accent/30 rounded-full" />
              <p className="text-foreground/30 text-[9px] md:text-[11px] font-mono">{project.tech.slice(0, 3).join(" • ")}</p>
            </div>
          </div>
          <span className="text-foreground/20 font-mono text-xs md:text-sm font-black italic">{project.year}</span>
        </div>
      </motion.div>
    </Link>
  );
};

export function Works() {
  return (
    <section id="works" className="py-20 md:py-40 px-6 md:px-[60px] max-w-[1440px] mx-auto min-h-screen">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-6">
          <h1 className="text-[40px] sm:text-[80px] md:text-[120px] font-bold uppercase tracking-tighter leading-none text-foreground/10">
            Selected<br />Works
          </h1>
          <p className="text-foreground/40 max-w-[300px] text-xs md:text-sm uppercase tracking-widest font-medium leading-relaxed mb-2 md:mb-4">
            A curated selection of high-performance digital experiments and applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-32">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.slug} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
