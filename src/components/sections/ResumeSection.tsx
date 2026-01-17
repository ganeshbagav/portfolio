import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";

const education = [
  {
    institution: "Savitribai Phule Pune University",
    degree: "Bachelor of Computer Engineering",
    period: "2019 — 2023",
    details: "CGPA: 8.05/10",
    location: "Pune, Maharashtra",
  },
];

const experience = [
  {
    position: "Backend Developer",
    company: "ByzWiz Infratech Private Limited",
    period: "Mar 2024 — Present",
    location: "Pune, India",
    highlights: [
      "Promoted from intern to full-time after delivering core backend features with high code quality",
      "Designed and developed a modular, scalable backend server for the 'Channel Partner' module using Node.js and Express.js",
      "Integrated third-party services (Zoop and delivery APIs) to automate identity verification and order logistics",
      "Built and optimized RESTful API endpoints for high-volume data retrieval and transaction processing",
      "Collaborated with frontend, QA, and product teams to design efficient MongoDB schemas",
    ],
  },
];

const ResumeSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* Experience */}
      <div className="mt-4 md:mt-8">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="icon-box w-10 h-10 md:w-12 md:h-12">
            <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Experience</h3>
        </div>

        <div className="space-y-4 md:space-y-6 ml-4 md:ml-6 border-l-2 border-border pl-4 md:pl-6">
          {experience.map((item, index) => (
            <motion.div
              key={item.position}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[21px] md:-left-[31px] top-1.5 timeline-dot w-2 h-2 md:w-3 md:h-3" />
              <h4 className="text-sm md:text-base font-semibold text-foreground">{item.position}</h4>
              <p className="text-[12px] md:text-sm text-muted-foreground mt-0.5 md:mt-1">{item.company}</p>
              <p className="text-[12px] md:text-sm text-primary mt-0.5 md:mt-1">{item.period} • {item.location}</p>
              <ul className="mt-2 md:mt-3 space-y-1.5 md:space-y-2">
                {item.highlights.map((highlight, i) => (
                  <li key={i} className="text-[12px] md:text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary mt-1.5 md:mt-2 shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mt-8 md:mt-12">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="icon-box w-10 h-10 md:w-12 md:h-12">
            <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Education</h3>
        </div>

        <div className="space-y-4 md:space-y-6 ml-4 md:ml-6 border-l-2 border-border pl-4 md:pl-6">
          {education.map((item, index) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[21px] md:-left-[31px] top-1.5 timeline-dot w-2 h-2 md:w-3 md:h-3" />
              <h4 className="text-sm md:text-base font-semibold text-foreground">{item.institution}</h4>
              <p className="text-[12px] md:text-sm text-muted-foreground mt-0.5 md:mt-1">{item.degree}</p>
              <p className="text-[12px] md:text-sm text-primary mt-0.5 md:mt-1">{item.period}</p>
              <p className="text-[12px] md:text-sm text-muted-foreground mt-0.5 md:mt-1">{item.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ResumeSection;
