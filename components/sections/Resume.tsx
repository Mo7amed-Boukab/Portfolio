"use client";

import React from "react";
import { motion } from "framer-motion";

export function Resume() {
  return (
    <section id="resume" className="py-20 md:py-40 px-6 md:px-[60px] max-w-[1440px] mx-auto min-h-screen">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
      >
        <h1 className="text-[40px] md:text-[120px] font-bold uppercase tracking-tighter leading-none mb-10 text-foreground/10 text-center md:text-left">
          Resume
        </h1>

        <div className="space-y-32">
          {/* About Me / Introduction Section */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-[14px] font-semibold uppercase tracking-widest text-accent">Professional Profile</h2>
              <div className="h-px flex-1 bg-border/50"></div>
            </div>
            <div className="space-y-8">
              <p className="text-xl md:text-3xl font-medium leading-[1.4] text-foreground/90">
                Junior Full-Stack Web & Mobile Developer, specialized in designing modern, high-performance, and scalable applications — SaaS platforms, robust APIs, and intuitive interfaces.
              </p>
              <p className="text-lg md:text-xl text-foreground/60 leading-relaxed font-light">
                Passionate about code and driven by solving complex problems, I invest myself in every project with rigor, creativity, and a particular focus on quality and user experience.
              </p>
            </div>
          </div>

          {/* Education - Grid/Card Layout */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-[14px] font-semibold uppercase tracking-widest text-accent">Education</h2>
              <div className="h-px flex-1 bg-border/50"></div>
            </div>

            <div className="relative space-y-16 md:space-y-0">
              {/* Central Timeline Axis */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-accent/30 md:-translate-x-1/2"></div>

              {/* Item 1 - Left */}
              <div className="relative flex flex-col md:flex-row md:items-center justify-between">
                <div className="md:w-[45%] md:text-right pl-10 md:pl-0">
                  <div className="group p-6 md:p-8 bg-foreground/5 border border-border hover:border-accent transition-all duration-500 relative">
                    <span className="text-foreground/30 text-[12px] font-mono block mb-2 md:mb-4 uppercase tracking-widest">2024 — 2026</span>
                    <h3 className="text-lg md:text-xl font-bold mb-2 leading-tight group-hover:text-accent transition-colors">Full Stack Web & Mobile Development</h3>
                    <p className="text-foreground/60 text-sm">Youcode</p>
                    {/* Connection Dot */}
                    <div className="absolute top-1/2 -left-[27px] md:left-auto md:-right-[calc(10%+26px)] w-4 h-4 bg-background border-2 border-accent rounded-full -translate-y-1/2 z-10 transition-transform duration-300 group-hover:scale-125"></div>
                  </div>
                </div>
                <div className="md:w-[45%]"></div>
              </div>

              {/* Item 2 - Right */}
              <div className="relative flex flex-col md:flex-row md:items-center justify-between md:mt-24">
                <div className="md:w-[45%]"></div>
                <div className="md:w-[45%] pl-10 md:pl-0">
                  <div className="group p-6 md:p-8 bg-foreground/5 border border-border hover:border-accent transition-all duration-500 relative">
                    <span className="text-foreground/30 text-[12px] font-mono block mb-2 md:mb-4 uppercase tracking-widest">2021 — 2024</span>
                    <h3 className="text-lg md:text-xl font-bold mb-2 leading-tight group-hover:text-accent transition-colors">B.A. in Business Management & Administration</h3>
                    <p className="text-foreground/60 text-sm">Souissi Faculty of Law, Economics & Social Sciences</p>
                    {/* Connection Dot */}
                    <div className="absolute top-1/2 -left-[27px] md:-left-[calc(11%+2px)] w-4 h-4 bg-background border-2 border-accent rounded-full -translate-y-1/2 z-10 transition-transform duration-300 group-hover:scale-125"></div>
                  </div>
                </div>
              </div>

              {/* Item 3 - Left */}
              <div className="relative flex flex-col md:flex-row md:items-center justify-between md:mt-24">
                <div className="md:w-[45%] md:text-right pl-10 md:pl-0">
                  <div className="group p-6 md:p-8 bg-foreground/5 border border-border hover:border-accent transition-all duration-500 relative">
                    <span className="text-foreground/30 text-[12px] font-mono block mb-2 md:mb-4 uppercase tracking-widest">2020</span>
                    <h3 className="text-lg md:text-xl font-bold mb-2 leading-tight group-hover:text-accent transition-colors">High School Diploma in Experimental Sciences</h3>
                    <p className="text-foreground/60 text-sm">Selouane El hassani High School</p>
                    {/* Connection Dot */}
                    <div className="absolute top-1/2 -left-[27px] md:left-auto md:-right-[calc(10%+26px)] w-4 h-4 bg-background border-2 border-accent rounded-full -translate-y-1/2 z-10 transition-transform duration-300 group-hover:scale-125"></div>
                  </div>
                </div>
                <div className="md:w-[45%]"></div>
              </div>
            </div>
          </div>

          {/* Experience - Detailed List Layout */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-[14px] font-semibold uppercase tracking-widest text-accent">Professional Experience</h2>
              <div className="h-px flex-1 bg-border/50"></div>
            </div>

            <div className="max-w-4xl space-y-16">
              <div className="group relative pl-0 md:pl-10">
                {/* Accent line for desktop */}
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-border group-hover:bg-accent transition-colors"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">Full Stack Web Developer Intern</h3>
                    <p className="text-foreground/60 font-medium">Logiciel Lab – Tangier</p>
                  </div>
                  <span className="text-accent text-sm font-bold uppercase tracking-widest">May 2025 — July 2025</span>
                </div>

                <p className="text-foreground/70 leading-relaxed text-lg md:text-left">
                  During my internship, I developed a real estate management web application using Laravel, facilitating connections between agents and clients. Key features included property listing management, reservation tracking, and a comprehensive admin dashboard for user and content administration.
                </p>
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
