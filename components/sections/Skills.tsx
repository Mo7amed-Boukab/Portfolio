"use client";

import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "React JS", category: "Frontend" },
  { name: "Node JS", category: "Backend" },
  { name: "Express JS", category: "Backend" },
  { name: "Mongo DB", category: "Database" },
  { name: "TypeScript", category: "Language" },
  { name: "Next JS", category: "Frontend" },
  { name: "NestJS", category: "Backend" },
  { name: "AngularJS", category: "Frontend" },
  { name: "Java", category: "Backend" },
  { name: "Spring Boot", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "React Native", category: "Mobile" },
  { name: "Figma", category: "Design" },
  { name: "HTML5", category: "Frontend" },
  { name: "CSS3", category: "Frontend" },
  { name: "Bootstrap", category: "Styling" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Vue JS", category: "Frontend" },
  { name: "MySQL", category: "Database" },
  { name: "PHP", category: "Backend" },
  { name: "Laravel", category: "Backend" },
  { name: "Symfony", category: "Backend" },
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "CI/CD", category: "DevOps" },
  { name: "Docker", category: "DevOps" },
  { name: "UML diagrams", category: "Tools" },
  { name: "Jira", category: "Project Management" },
];

export const Skills = () => {
  return (
    <section id="skills" className="relative py-24 bg-background overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[60px] relative z-10">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-accent font-mono text-sm uppercase tracking-widest block mb-4 text-center md:text-left"
          >
            Technical Stack
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-6xl font-bold text-foreground tracking-tighter text-center md:text-left"
          >
            My <span className="text-foreground/20 italic">Arsenal.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group relative p-6 md:p-8 bg-foreground/[0.03] border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-accent transition-all duration-300 group-hover:h-full" />
              <span className="text-[10px] font-mono text-foreground/30 uppercase tracking-[0.2em] mb-2 block">
                {skill.category}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative text in background */}
      <div className="absolute -bottom-6 -right-6 md:-bottom-20 md:-right-20 pointer-events-none opacity-[0.02] select-none text-right">
        <h2 className="text-[4rem] md:text-[20rem] font-bold text-foreground leading-none tracking-tighter">
          SKILLS
        </h2>
      </div>
    </section>
  );
};

