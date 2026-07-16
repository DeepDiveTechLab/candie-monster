import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CandieLogo, SquashHamburger, NavLink, DownloadButton } from "./ui";
import { scrollToY } from "./lib";

export function Navbar({ entranceComplete }: { entranceComplete: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full h-20 z-50 bg-transparent"
    >
      <div className="hidden sm:flex items-center justify-between h-full px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.22)" }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:flex items-center gap-2 h-12 px-5 rounded-[14px] bg-white/15 backdrop-blur-md cursor-pointer"
          >
            <CandieLogo size={18} className="text-white" />
            <span className="text-[16px] font-medium tracking-tight text-white">
              candie.monster
            </span>
          </motion.div>

          <motion.div
            animate={{ width: open ? 290 : 48 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="h-12 rounded-[14px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
          >
            <button
              onClick={() => setOpen((o) => !o)}
              className={`flex items-center justify-center transition-all ${
                open
                  ? "w-9 h-9 rounded-[11px] bg-white/10 hover:bg-white/20 ml-1.5"
                  : "w-12 h-12 rounded-[14px]"
              }`}
              aria-label="Toggle menu"
            >
              <SquashHamburger isOpen={open} />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-5 pl-4 pr-2 whitespace-nowrap"
                >
                  <NavLink
                    label="Nosotros"
                    onClick={() => scrollToY(window.innerHeight)}
                  />
                  <NavLink
                    label="Relanzamiento"
                    onClick={() => scrollToY(window.innerHeight * 2)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <DownloadButton />
      </div>

      <div className="flex sm:hidden items-center justify-between h-full px-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ width: open ? 0 : "auto", opacity: open ? 0 : 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="flex items-center gap-1.5 h-9 rounded-[10px] bg-white/15 backdrop-blur-md overflow-hidden"
            style={{ paddingLeft: open ? 0 : 12, paddingRight: open ? 0 : 12 }}
          >
            <CandieLogo size={14} className="text-white shrink-0" />
            <span className="text-[13px] font-medium tracking-tight text-white whitespace-nowrap">
              candie.monster
            </span>
          </motion.div>

          <motion.div
            animate={{ width: open ? "100%" : 36 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="h-9 rounded-[10px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
          >
            <button
              onClick={() => setOpen((o) => !o)}
              className="w-9 h-9 flex items-center justify-center shrink-0"
              aria-label="Toggle menu"
            >
              <SquashHamburger isOpen={open} mobile />
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4 pr-3 whitespace-nowrap"
                >
                  <button
                    onClick={() => scrollToY(window.innerHeight)}
                    className="text-[13px] text-white/85 hover:text-white"
                  >
                    Nosotros
                  </button>
                  <button
                    onClick={() => scrollToY(window.innerHeight * 2)}
                    className="text-[13px] text-white/85 hover:text-white"
                  >
                    Relanzamiento
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <DownloadButton mobile />
      </div>
    </motion.nav>
  );
}
