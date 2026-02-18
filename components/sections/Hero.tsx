"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

export default function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ["modern web apps", "MERN stack solutions", "high-performance sites"];
  const staticPrefixes = ["I build ", "I develop ", "I create "];

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % phrases.length;
      const fullText = phrases[current];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-background"
    >

      {/* Grainy Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.04] mix-blend-multiply dark:mix-blend-screen"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      ></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-[60px] relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 pt-20 lg:pt-0">

        {/* Left Aspect: The Masked Image/Portrait */}
        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
          <div
            className="hero-mask relative w-[280px] h-[400px] md:w-[450px] md:h-[600px] overflow-hidden bg-card"
            style={{
              clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
            }}
          >
            <Image
              src="/image-profil.jpeg"
              alt="Mohamed Boukab"
              fill
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
              priority
            />
          </div>
        </div>

        {/* Right Aspect: Content */}
        <div className="w-full lg:w-1/2 text-left space-y-8">
          <div className="max-w-[580px]">
            <h1 className="text-[28px] md:text-[34px] lg:text-[42px] leading-[1.3] font-medium text-foreground">
              Hello, I’m <span className="font-bold text-foreground">Mohamed Boukab</span>, <br className="hidden md:block" />
             <span className="text-accent"> Full stack developer </span>
            </h1>
          </div>

          {/* Typing Animation Section */}
          <div className="relative min-h-[80px] md:min-h-[120px] flex flex-col justify-end">
            <div className="flex items-baseline flex-wrap">
              <span className="text-[32px] md:text-[64px] lg:text-[72px] font-bold text-foreground leading-tight">
                {staticPrefixes[loopNum % phrases.length]}
              </span>
              <span className="text-[32px] md:text-[64px] lg:text-[72px] font-bold text-accent ml-2 md:ml-4 flex items-center leading-tight">
                {text}
                <span className="animate-pulse ml-1 inline-block w-[2px] h-[28px] md:w-[3px] md:h-[55px] lg:h-[65px] bg-accent"></span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden md:flex absolute bottom-[40px] right-[60px] flex-col items-center gap-6 z-30">
        <div className="vertical-text text-[12px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-4">
          Follow Me
        </div>
        <div className="w-[1px] h-12 bg-border mb-4"></div>
        <div className="flex flex-col gap-5 text-foreground opacity-50 hover:opacity-100 transition-opacity">
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

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .hero-mask {
          transition: clip-path 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .hero-mask:hover {
          clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%) !important;
        }
      `}</style>
    </section>
  );
}
