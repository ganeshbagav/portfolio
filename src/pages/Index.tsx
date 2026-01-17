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
    <div className="min-h-screen py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <ProfileCard />
          </div>

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 xl:col-span-9 glass-card p-6 md:p-8"
          >
            {/* Navigation */}
            <Navigation
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />

            {/* Content */}
            <div className="pt-28 md:pt-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderSection()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default Index;
