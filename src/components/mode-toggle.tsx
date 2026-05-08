import { motion } from "framer-motion";
import { BsFillCloudyFill, BsStarFill } from "react-icons/bs";
import { useTheme } from "@/components/theme-provider";
import { cn } from "#/lib/utils";

const width = 112;
const height = 56;
const scale = 0.5;

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="relative"
      style={{
        width: width * scale,
        height: height * scale,
      }}
    >
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        role="switch"
        className={cn(
          "relative flex h-14 w-28 origin-top-left rounded-full bg-linear-to-b p-2 shadow-lg",
          theme === "light"
            ? "justify-end from-blue-500 to-sky-300"
            : "justify-start from-indigo-600 to-indigo-400",
        )}
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <Thumb />
        {theme === "light" && <Clouds />}
        {theme === "dark" && <Stars />}
      </button>
    </div>
  );
}

function Thumb() {
  const { theme } = useTheme();

  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 32,
        mass: 0.6,
      }}
      className="relative h-10 w-10 overflow-hidden rounded-full shadow-lg"
    >
      <div
        className={cn(
          "absolute inset-0",
          theme === "dark"
            ? "bg-slate-100"
            : "animate-pulse rounded-full bg-linear-to-tr from-amber-300 to-yellow-500",
        )}
      />
      {theme === "light" && <SunCenter />}
      {theme === "dark" && <MoonSpots />}
    </motion.div>
  );
}

function SunCenter() {
  return <div className="absolute inset-1 rounded-full bg-amber-300" />;
}

function MoonSpots() {
  return (
    <>
      <motion.div
        initial={{ x: -4, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="absolute right-2.5 bottom-1 h-3 w-3 rounded-full bg-slate-300"
      />
      <motion.div
        initial={{ x: -4, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        className="absolute bottom-4 left-1 h-3 w-3 rounded-full bg-slate-300"
      />
      <motion.div
        initial={{ x: -4, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.35 }}
        className="absolute top-2 right-2 h-2 w-2 rounded-full bg-slate-300"
      />
    </>
  );
}

function Clouds() {
  return (
    <>
      <motion.span
        animate={{ x: [-20, -15, -10, -5, 0], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          delay: 0.25,
        }}
        className="absolute top-1 left-10 text-xs text-white"
      >
        <BsFillCloudyFill />
      </motion.span>
      <motion.span
        animate={{ x: [-10, 0, 10, 20, 30], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          delay: 0.5,
        }}
        className="absolute top-4 left-4 text-lg text-white"
      >
        <BsFillCloudyFill />
      </motion.span>
      <motion.span
        animate={{ x: [-7, 0, 7, 14, 21], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 12.5,
          repeat: Infinity,
        }}
        className="absolute top-8 left-9 text-white"
      >
        <BsFillCloudyFill />
      </motion.span>
      <motion.span
        animate={{ x: [-15, 0, 15, 30, 45], opacity: [0, 1, 0.75, 1, 0] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          delay: 0.75,
        }}
        className="absolute top-4 left-14 text-xs text-white"
      >
        <BsFillCloudyFill />
      </motion.span>
    </>
  );
}

function Stars() {
  return (
    <>
      <motion.span
        animate={{
          scale: [0.75, 1, 0.75],
          opacity: [0.75, 1, 0.75],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeIn",
        }}
        className="absolute top-2 right-10 text-xs text-slate-300"
      >
        <BsStarFill />
      </motion.span>
      <motion.span
        animate={{
          scale: [1, 0.75, 1],
          opacity: [0.5, 0.25, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "easeIn",
        }}
        style={{ rotate: "-45deg" }}
        className="absolute top-3 right-4 text-lg text-slate-300"
      >
        <BsStarFill />
      </motion.span>
      <motion.span
        animate={{
          scale: [1, 0.5, 1],
          opacity: [1, 0.5, 1],
        }}
        style={{ rotate: "45deg" }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeIn",
        }}
        className="absolute top-8 right-8 text-slate-300"
      >
        <BsStarFill />
      </motion.span>
    </>
  );
}
