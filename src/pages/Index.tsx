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
    <div className="h-screen overflow-hidden py-4 md:py-8 px-4 md:px-8 lg:px-16 flex flex-col">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
          {/* Profile Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3 h-full overflow-y-auto lg:overflow-visible no-scrollbar">
            <ProfileCard />
          </aside>

          {/* Main Content */}
          <main
            className="lg:col-span-8 xl:col-span-9 glass-card flex flex-col min-h-0 relative h-full overflow-hidden"
          >
            {/* Locked Header */}
            <div className="shrink-0 z-40 bg-card/95 backdrop-blur-xl rounded-t-2xl py-3 px-4 md:py-4 md:px-8 flex justify-center items-center">
              {/* Navigation */}
              <Navigation
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>

            {/* Internal Scrollable Content Area */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto p-4 md:p-8 pt-0 no-scrollbar scroll-mask"
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
