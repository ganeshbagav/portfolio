import { useState } from "react";
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
            <div className="shrink-0 z-40 bg-card/95 backdrop-blur-xl border-b border-white/5 rounded-t-2xl p-4 md:p-8 space-y-4 md:space-y-6">
              {/* Navigation */}
              <Navigation
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />

              {/* Dynamic Title */}
              <motion.div
                key={activeSection + "-title"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <h2 className="section-title !mb-0 text-2xl md:text-3xl">
                  {activeSection === "Journey" ? "My Journey" : activeSection}
                </h2>
              </motion.div>
            </div>

            {/* Internal Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-6 no-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
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
