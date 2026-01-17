import { motion } from "framer-motion";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = ["About", "Skills", "Journey", "Portfolio", "Contact"];

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full px-4 max-w-fit">
      <div className="px-1.5 py-1.5 bg-secondary/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg flex items-center gap-1 overflow-x-auto max-w-[calc(100vw-2rem)] no-scrollbar">
        {sections.map((section) => (
          <motion.button
            key={section}
            onClick={() => onSectionChange(section)}
            className={`relative px-4 md:px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeSection === section
              ? "text-primary bg-white/5 border border-white/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
              }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {section}
            {activeSection === section && (
              <motion.div
                layoutId="active-nav-glow"
                className="absolute bottom-1.5 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(34,211,238,0.8)] mx-3 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
