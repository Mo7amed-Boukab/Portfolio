"use client";

import React, { useEffect, useState } from "react";

const BackgroundElements: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isSelectable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('.mask-lnk') ||
        target.closest('.menu-btn') ||
        target.closest('.soc a');

      setIsHovering(!!isSelectable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  return (
    <>
      {/* Structural Grid Lines - Exactly 5 columns across the 1440px wide content area */}
      <div
        className="grid-lines fixed inset-0 pointer-events-none z-[-1]"
      >
        <div className="flex justify-between w-full h-full max-w-[1440px] mx-auto">
          <div className="grid-line w-[1px] h-full bg-border" />
          <div className="grid-line w-[1px] h-full bg-border" />
          <div className="grid-line w-[1px] h-full bg-border" />
          <div className="grid-line w-[1px] h-full bg-border" />
          <div className="grid-line w-[1px] h-full bg-border" />
        </div>
      </div>

      {/* Grain Texture Overlay - Global noise filter */}
      <div
        className="fixed inset-0 pointer-events-none z-[50] opacity-[0.04] mix-blend-multiply dark:mix-blend-screen"
        style={{
          backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Cursor Follower - Styled based on computed_styles and visual reference */}
      <div
        className="cursor-follower"
        style={{
          position: "fixed",
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: isHovering ? "50px" : "26px",
          height: isHovering ? "50px" : "26px",
          marginTop: isHovering ? "-25px" : "-13px",
          marginLeft: isHovering ? "-25px" : "-13px",
          backgroundColor: isHovering ? "var(--foreground)" : "var(--accent)",
          opacity: isHovering ? 0.15 : (isVisible ? 1 : 0),
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 1111,
          transition: "width 0.3s ease, height 0.3s ease, background-color 0.3s ease, opacity 0.3s ease, margin 0.3s ease",
          mixBlendMode: isHovering ? "difference" : "normal",
          border: isHovering ? "1px solid var(--border)" : "none"
        }}
      />


      <style jsx global>{`
        /* Ensure the grid lines container matches the global padding system */
        @media (max-width: 768px) {
          .grid-lines {
            padding: 0 24px !important;
          }
        }
        
        /* Disable native cursor when over the screen if custom cursor is active */
        body {
          cursor: none;
        }
        
        /* Re-enable cursor for non-interactive elements if preferred, but usually 
           these dark portfolios hide it entirely or use a custom dot */
        a, button, [role="button"] {
          cursor: none;
        }

        .grid-lines {
            display: flex;
            justify-content: space-between;
        }
      `}</style>
    </>
  );
};

export default BackgroundElements;