import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileCard from "@/components/ProfileCard";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ResumeSection from "@/components/sections/ResumeSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("About");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when section changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeSection]);

  const renderSection = () => {
    switch (activeSection) {
      case "About":
        return <AboutSection />;
      case "Skills":
        return <SkillsSection />;
      case "Journey":
        return <ResumeSection />;
      case "Portfolio":
        return <PortfolioSection />;
      case "Contact":
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden lg:overflow-hidden py-0 md:py-8 px-0 md:px-8 lg:px-16 flex flex-col no-scrollbar">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-8 flex-1 min-h-0">
          {/* Profile Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3 lg:h-full lg:overflow-visible no-scrollbar pb-8 lg:pb-0">
            <ProfileCard />
          </aside>

          {/* Main Content */}
          <main
            className="lg:col-span-8 xl:col-span-9 glass-card flex flex-col min-h-0 relative h-[100dvh] lg:h-full lg:overflow-hidden rounded-none md:rounded-2xl"
          >
            {/* Locked Header - Sticky on mobile, Fixed on desktop */}
            <div className="sticky lg:relative top-0 shrink-0 z-50 bg-card/95 backdrop-blur-xl py-1 px-2 md:py-4 md:px-8 flex justify-center items-center border-b border-border/10 lg:border-none">
              {/* Navigation */}
              <Navigation
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>

            {/* Content Area */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto px-4 pb-24 md:px-8 lg:pb-20 md:pb-8 pt-0 no-scrollbar scroll-mask"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderSection()}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
