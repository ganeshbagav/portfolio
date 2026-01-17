import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGesture } from "@use-gesture/react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = ["About", "Skills", "Journey", "Portfolio", "Contact"];

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const sectionCount = sections.length;
  const itemWidth = isMobile ? 130 : 220;

  const [virtualIndex, setVirtualIndex] = useState(sectionCount * 1000 + sections.indexOf(activeSection));

  // The tracking motion value
  const x = useMotionValue(-virtualIndex * itemWidth);
  const springX = useSpring(x, { stiffness: 180, damping: 28, mass: 1 });

  // Sync virtualIndex and x position whenever activeSection or itemWidth changes
  useEffect(() => {
    const currentRealIndex = ((virtualIndex % sectionCount) + sectionCount) % sectionCount;
    const targetRealIndex = sections.indexOf(activeSection);

    let nextVIdx = virtualIndex;
    if (currentRealIndex !== targetRealIndex) {
      let diff = targetRealIndex - currentRealIndex;
      if (diff > sectionCount / 2) diff -= sectionCount;
      if (diff < -sectionCount / 2) diff += sectionCount;
      nextVIdx = virtualIndex + diff;
      setVirtualIndex(nextVIdx);
    }

    // Always force set x and jump springX to avoid "moving transition" from wrong itemWidth on load
    x.set(-nextVIdx * itemWidth);
    springX.jump(-nextVIdx * itemWidth);
  }, [activeSection, sectionCount, virtualIndex, x, springX, itemWidth]);

  const snapToIndex = (newIdx: number) => {
    setVirtualIndex(newIdx);
    x.set(-newIdx * itemWidth);
    const realIdx = ((newIdx % sectionCount) + sectionCount) % sectionCount;
    onSectionChange(sections[realIdx]);
  };

  const next = () => snapToIndex(virtualIndex + 1);
  const prev = () => snapToIndex(virtualIndex - 1);

  // Unified Gesture Handling
  const bind = useGesture(
    {
      onDrag: ({ offset: [ox], last, velocity: [vx], direction: [dx] }) => {
        x.set(ox);
        if (last) {
          const targetIdx = Math.round(-ox / itemWidth);
          // Flick support
          const adjustment = Math.abs(vx) > 0.5 ? (dx < 0 ? 1 : -1) : 0;
          snapToIndex(targetIdx + adjustment);
        }
      },
      onWheel: ({ delta: [, dy], last, memo = 0 }) => {
        // Threshold to avoid super fast scrolling on trackpads
        const threshold = 40;
        const accumulated = memo + dy;

        if (Math.abs(accumulated) > threshold) {
          const direction = accumulated > 0 ? 1 : -1;
          snapToIndex(virtualIndex + direction);
          return 0; // Reset accumulation
        }
        return accumulated; // Keep accumulating
      },
    },
    {
      drag: {
        from: () => [x.get(), 0],
        filterTaps: true,
      },
      wheel: {
        eventOptions: { passive: false },
      }
    }
  );

  const visibleItems = useMemo(() => {
    const items = [];
    for (let i = -6; i <= 6; i++) {
      const vIdx = virtualIndex + i;
      const realIndex = ((vIdx % sectionCount) + sectionCount) % sectionCount;
      items.push({ vIdx, name: sections[realIndex] });
    }
    return items;
  }, [virtualIndex, sectionCount]);

  return (
    <nav
      className="w-full relative flex justify-center py-1 md:py-4 select-none overflow-hidden touch-none"
      style={{ perspective: "2000px" }}
      {...(bind() as any)}
    >
      {/* HUD: FIXED BOX (BACKGROUND LAYER) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className="relative w-[220px] md:w-[300px] h-[58px] md:h-[68px]">
          <div className="absolute inset-0 bg-primary/5 border border-primary/20 shadow-[0_0_30px_rgba(59,130,246,0.2)] md:shadow-[0_0_60px_rgba(59,130,246,0.3)] backdrop-blur-[12px] rounded-2xl" />
          <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 w-12 md:w-16 h-0.5 bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)] md:shadow-[0_0_20px_rgba(59,130,246,1)] rounded-full" />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-between w-full max-w-[100%] md:max-w-[800px] px-1 md:px-4 pointer-events-none">
        <button onClick={prev} className="pointer-events-auto text-primary/30 hover:text-primary transition-all p-2 md:p-4 hover:scale-125 active:scale-95">
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button onClick={next} className="pointer-events-auto text-primary/30 hover:text-primary transition-all p-2 md:p-4 hover:scale-125 active:scale-95">
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      {/* DIAL TRACK (FOREGROUND LAYER) */}
      <div className="relative w-full flex justify-center items-center h-24 z-20 overflow-visible">
        <motion.div
          style={{ x: springX, transformStyle: "preserve-3d" }}
          className="flex items-center absolute left-1/2 cursor-grab active:cursor-grabbing"
        >
          {visibleItems.map((item) => (
            <DialItem
              key={item.vIdx}
              vIdx={item.vIdx}
              name={item.name}
              itemWidth={itemWidth}
              trackX={springX}
              onClick={() => snapToIndex(item.vIdx)}
              isMobile={isMobile} // Pass isMobile prop
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        animate={{ x: -(virtualIndex * (itemWidth / 6)) % (itemWidth * 6) }}
        style={{
          width: "400%",
          left: "-150%",
          backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 19px, rgba(255,255,255,0.4) 19px, rgba(255,255,255,0.4) 20px)`,
        }}
      />
    </nav>
  );
};

interface DialItemProps {
  vIdx: number;
  name: string;
  itemWidth: number;
  trackX: MotionValue<number>;
  onClick: () => void;
  isMobile: boolean; // Add isMobile prop
}

const DialItem = ({ vIdx, name, itemWidth, trackX, onClick, isMobile }: DialItemProps) => {
  const itemCenter = vIdx * itemWidth;
  const relativeX = useTransform(trackX, (v: number) => v + itemCenter);

  const rotateY = useTransform(relativeX, [-itemWidth * 1.5, 0, itemWidth * 1.5], [-65, 0, 65]);
  const z = useTransform(relativeX, [-itemWidth, 0, itemWidth], [-160, 40, -160]);
  const opacity = useTransform(relativeX, [-itemWidth * 1.8, 0, itemWidth * 1.8], [0, 1, 0]);
  const scale = useTransform(relativeX, [-itemWidth, 0, itemWidth], [0.65, 1.3, 0.65]);

  return (
    <motion.div
      onClick={onClick}
      style={{
        x: itemCenter,
        translateX: "-50%",
        rotateY, z, opacity, scale,
        width: itemWidth,
        position: "absolute",
        transformStyle: "preserve-3d"
      }}
      className="flex items-center justify-center cursor-pointer pointer-events-auto"
    >
      <div className={`${isMobile ? 'text-[9px] tracking-[0.1em] drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 'text-sm md:text-base tracking-[0.25em] drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]'} font-black uppercase text-primary brightness-150`}>
        {name}
      </div>
    </motion.div>
  );
};

export default Navigation;
