"use client";

import React from 'react';
import { Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show fixed footer only when scrolled down past hero
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`footer fixed bottom-0 left-0 w-full z-[100] pointer-events-none px-6 md:px-[60px] pb-8 md:pb-12 hidden md:flex justify-between items-end transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      {/* Contact Information - Left Side */}
      <div className="copy pointer-events-auto flex flex-col gap-1">
        <p className="font-mono-ui text-[14px] leading-[1.8] text-muted-foreground transition-colors duration-300 hover:text-foreground">
          <span className="text-foreground opacity-50 mr-1">E:</span>
          <a href="mailto:mohamedboukab2002@gmail.com" className="hover:text-accent">
            mohamedboukab2002@gmail.com
          </a>
        </p>
        <p className="font-mono-ui text-[14px] leading-[1.8] text-muted-foreground transition-colors duration-300 hover:text-foreground">
          <span className="text-foreground opacity-50 mr-1">T:</span>
          <a href="tel:+212603389425" className="hover:text-accent">
            +212 603 389 425
          </a>
        </p>
      </div>

      {/* Social Media Box - Right Side */}
      <div className="soc-box pointer-events-auto flex flex-col items-center gap-6">
        {/* Vertical Follow Me Label */}
        <div className="follow-label vertical-text text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-foreground opacity-60">
          Follow Me
        </div>

        <div className="vertical-line w-px h-12 bg-border"></div>

        {/* Social Icons */}
        <div className="soc flex flex-col gap-5 items-center">
          <a
            href="https://www.linkedin.com/in/mohamed-boukab-9b758b241"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} strokeWidth={2} />
          </a>
          <a
            href="https://github.com/Mo7amed-Boukab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-110"
            aria-label="Github"
          >
            <Github size={18} strokeWidth={2} />
          </a>
        </div>
      </div>

      <style jsx global>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        
        /* Ensure font weights and families match global tokens */
        .font-mono-ui {
          font-family: inherit; /* Fallback to Courier New from globals.css */
        }
      `}</style>
    </footer>
  );
};

export default Footer;