"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-[120px] h-[38px] rounded-full border border-border/40 bg-background/50" />
    }

    const isDark = theme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="group relative flex items-center gap-3 px-4 py-2 rounded-full border border-border/40 bg-background/50 hover:bg-background hover:border-accent/40 transition-all duration-300 backdrop-blur-sm shadow-lg shadow-black/5"
            aria-label="Toggle theme"
        >
            <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {isDark ? (
                        <motion.div
                            key="moon"
                            initial={{ y: 20, opacity: 0, rotate: 45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: -45 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <Moon size={16} className="text-accent fill-accent/10" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ y: 20, opacity: 0, rotate: -45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <Sun size={16} className="text-accent fill-accent/10" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="hidden md:flex items-center text-[10px] font-bold uppercase tracking-[0.2em]">
                <span className={!isDark ? "text-foreground" : "text-foreground/40 transition-colors duration-300"}>Light</span>
                <span className="mx-2 text-border">/</span>
                <span className={isDark ? "text-foreground" : "text-foreground/40 transition-colors duration-300"}>Dark</span>
            </div>
        </button>
    )
}
