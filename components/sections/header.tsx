"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { X, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Header = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["hero", "skills", "resume", "works", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/#hero" },
    { label: "Skills", href: "/#skills" },
    { label: "Resume", href: "/#resume" },
    { label: "Works", href: "/#works" },
    { label: "Contact", href: "/#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.split("#")[1];

    if (pathname !== "/") {
      push("/#" + targetId);
      setIsMenuOpen(false);
      return;
    }

    const elem = document.getElementById(targetId);
    if (elem) {
      const offset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-[120] transition-all duration-300",
          isScrolled || isMenuOpen ? "bg-background/80 backdrop-blur-lg py-4 md:py-6" : "py-8 md:py-[50px]"
        )}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 md:px-[60px]">
          <div className="relative group overflow-hidden h-10 w-[200px]">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="block relative h-full w-full"
            >
              <span className="absolute inset-0 flex items-center transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full text-[14px] md:text-[16px] font-semibold text-foreground/50">
                Mohamed&nbsp;<strong className="text-foreground font-bold ml-1">Boukab</strong>
              </span>
              <span className="absolute inset-0 flex items-center translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:translate-y-0 text-[14px] md:text-[16px] font-semibold text-accent uppercase tracking-widest font-bold">
                Portfolio&nbsp;<strong className="text-foreground font-bold ml-1">2026</strong>
              </span>
            </a>
          </div>

          <div className="flex items-center gap-4 md:gap-8 h-10">
            <nav className="hidden lg:flex items-center">
              <ul className="flex items-center space-x-10">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={cn(
                          "mask-link group cursor-pointer relative block",
                          isActive ? "text-foreground" : "text-foreground/70"
                        )}
                        data-hover={item.label}
                      >
                        <span className={cn(
                          "text-[13px] font-semibold uppercase tracking-[0.1em] transition-transform duration-400 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full flex",
                          isActive && "text-foreground"
                        )}>
                          {item.label}
                        </span>
                        <span className="absolute top-full left-0 text-[13px] font-semibold uppercase tracking-[0.1em] text-accent transition-transform duration-400 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full">
                          {item.label}
                        </span>
                        {isActive && (
                          <span className="absolute -bottom-1 left-0 w-full h-px bg-foreground/20" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <ThemeToggle />

            <button
              className="lg:hidden flex flex-col justify-center items-center w-[30px] h-[30px] relative z-[110]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="text-foreground" size={24} /> : <Menu className="text-foreground" size={24} />}
            </button>
          </div>
        </div>


        <style jsx>{`
          .mask-link {
            position: relative;
            display: inline-block;
            overflow: hidden;
          }
        `}</style>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-background z-[115] flex flex-col items-center justify-center"
          >
            {/* Explicit Close Button for Mobile UX */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-6 lg:hidden flex items-center gap-2 text-foreground/40 hover:text-foreground transition-colors uppercase tracking-widest text-[12px] font-bold"
            >
              Close <X size={20} />
            </button>

            <ul className="flex flex-col items-center space-y-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "text-3xl md:text-4xl font-bold uppercase tracking-tighter transition-colors duration-300",
                      activeSection === item.href.replace("#", "") ? "text-accent" : "text-foreground/40 hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8"
            >
              <div className="lg:hidden mb-4">
                <ThemeToggle />
              </div>
              <div className="flex gap-8">
                <a href="#" className="text-foreground/40 hover:text-foreground uppercase tracking-widest text-[12px] font-bold">Linkedin</a>
                <a href="#" className="text-foreground/40 hover:text-foreground uppercase tracking-widest text-[12px] font-bold">Github</a>
              </div>
            </motion.div>


          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
