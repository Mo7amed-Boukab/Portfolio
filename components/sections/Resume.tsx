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
        <h1 className="text-[50px] md:text-[120px] font-bold uppercase tracking-tighter leading-none mb-10 text-foreground/10 text-center md:text-left">
          Resume
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          <div>
            <h2 className="text-[14px] font-semibold uppercase tracking-widest text-accent mb-8">Education</h2>
            <div className="space-y-12">
              {[1, 2].map((item) => (
                <div key={item} className="group cursor-default">
                  <span className="text-foreground/40 text-[13px] font-mono block mb-2">2018 — 2022</span>
                  <h3 className="text-2xl font-bold mb-1 transition-colors duration-300 group-hover:text-accent">University Name</h3>
                  <p className="text-foreground/60">Bachelor's Degree in Software Engineering</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold uppercase tracking-widest text-accent mb-8">Experience</h2>
            <div className="space-y-12">
              {[1, 2, 3].map((item) => (
                <div key={item} className="group cursor-default">
                  <span className="text-foreground/40 text-[13px] font-mono block mb-2">2022 — Present</span>
                  <h3 className="text-2xl font-bold mb-1 transition-colors duration-300 group-hover:text-accent">Company Name</h3>
                  <p className="text-foreground/60">Senior Frontend Developer</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
