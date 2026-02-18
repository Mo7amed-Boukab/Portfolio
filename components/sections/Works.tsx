"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";

export function Works() {
  return (
    <section id="works" className="py-20 md:py-40 px-6 md:px-[60px] max-w-[1440px] mx-auto min-h-screen">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
      >
        <h1 className="text-[50px] md:text-[120px] font-bold uppercase tracking-tighter leading-none mb-10 md:mb-20 text-foreground/10 text-center md:text-left">
          Works
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 md:gap-y-20">
          {projects.map((project, index) => (
            <Link href={`/work/${project.slug}`} key={project.slug}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-foreground/5">
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)]"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-accent transition-colors duration-300">{project.title}</h3>
                    <p className="text-foreground/40 uppercase text-[12px] tracking-widest">{project.category}</p>
                  </div>
                  <span className="text-foreground/20 font-mono text-sm">{project.year}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
