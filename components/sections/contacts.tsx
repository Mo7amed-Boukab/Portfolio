"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone } from "lucide-react";

export function Contacts() {
  return (
    <section id="contact" className="py-20 md:py-40 px-6 md:px-[60px] max-w-[1440px] mx-auto min-h-screen">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
      >
        <h1 className="text-[40px] md:text-[80px] lg:text-[120px] font-bold uppercase tracking-tighter leading-none mb-10 text-foreground/10 text-center md:text-left">
          Contact
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          <div>
            <h2 className="text-[12px] md:text-[14px] font-semibold uppercase tracking-widest text-accent mb-6 md:mb-8 text-center md:text-left">Get in Touch</h2>
            <p className="text-xl md:text-3xl font-bold mb-8 md:mb-10 max-w-md leading-[1.2] text-foreground/80 text-center md:text-left mx-auto md:mx-0">
              Have a project in mind? Let's build something amazing together.
            </p>

            <div className="space-y-6 md:space-y-10">
              <div className="flex items-center gap-4 md:gap-5">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-foreground/5 flex items-center justify-center text-accent shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-foreground/40 uppercase mb-0.5 md:mb-1">Email</p>
                  <a href="mailto:mohamedboukab2002@gmail.com" className="text-sm md:text-xl font-medium hover:text-accent transition-colors duration-300 break-all">mohamedboukab2002@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-5">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-foreground/5 flex items-center justify-center text-accent shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-foreground/40 uppercase mb-0.5 md:mb-1">Phone</p>
                  <a href="tel:+212603389425" className="text-sm md:text-xl font-medium hover:text-accent transition-colors duration-300">+212 603 389 425</a>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-5">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-foreground/5 flex items-center justify-center text-accent shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-foreground/40 uppercase mb-0.5 md:mb-1">Location</p>
                  <span className="text-sm md:text-xl font-medium">Nador, Morocco</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-0">
            <h2 className="text-[12px] md:text-[14px] font-semibold uppercase tracking-widest text-accent mb-6 md:mb-8 text-center md:text-left">Send a Message</h2>
            <form className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                <div className="relative group">
                  <label className="text-[11px] font-mono text-foreground/40 uppercase mb-2 block transition-colors duration-300 group-focus-within:text-accent">Name</label>
                  <input type="text" className="w-full bg-foreground/5 border-b border-foreground/10 py-3 md:py-4 px-4 focus:outline-none focus:border-accent transition-colors duration-300 rounded-none text-sm md:text-base" />
                </div>
                <div className="relative group">
                  <label className="text-[11px] font-mono text-foreground/40 uppercase mb-2 block transition-colors duration-300 group-focus-within:text-accent">Email</label>
                  <input type="email" className="w-full bg-foreground/5 border-b border-foreground/10 py-3 md:py-4 px-4 focus:outline-none focus:border-accent transition-colors duration-300 rounded-none text-sm md:text-base" />
                </div>
              </div>
              <div className="relative group">
                <label className="text-[11px] font-mono text-foreground/40 uppercase mb-2 block transition-colors duration-300 group-focus-within:text-accent">Subject</label>
                <input type="text" className="w-full bg-foreground/5 border-b border-foreground/10 py-3 md:py-4 px-4 focus:outline-none focus:border-accent transition-colors duration-300 rounded-none text-sm md:text-base" />
              </div>
              <div className="relative group">
                <label className="text-[11px] font-mono text-foreground/40 uppercase mb-2 block transition-colors duration-300 group-focus-within:text-accent">Message</label>
                <textarea rows={4} className="w-full bg-foreground/5 border-b border-foreground/10 py-3 md:py-4 px-4 focus:outline-none focus:border-accent transition-colors duration-300 resize-none rounded-none text-sm md:text-base"></textarea>
              </div>
              <button className="w-full md:w-auto bg-accent text-white px-6 py-3 md:px-10 md:py-4 font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300 flex items-center justify-center gap-3 text-[12px] md:text-sm">
                Send Message <Send size={16} />
              </button>
            </form>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
