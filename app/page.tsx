"use client";

import Hero from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Resume } from "@/components/sections/Resume";
import { Works } from "@/components/sections/Works";
import { Contacts } from "@/components/sections/contacts";

export default function Home() {
  return (
    <div className="pt-20">
      <Hero />  
      <Resume />
      <Skills />
      <Works />
      <Contacts />
    </div>
  );
}
