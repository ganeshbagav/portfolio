import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Java", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["Node.js", "Express.js", "Spring Boot", "React"],
  },
  {
    title: "Database Management",
    skills: ["MongoDB", "MySQL"],
  },
  {
    title: "Dev Tools",
    skills: ["Git", "Postman", "Docker"],
  },
  {
    title: "Other Skills",
    skills: ["OOP", "REST API", "JWT Authentication", "API Integration", "Agile"],
  },
];

const SkillsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mt-4 md:mt-8 space-y-6 md:space-y-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <h3 className="text-sm md:text-lg font-medium text-foreground mb-3 md:mb-4">{category.title}</h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: categoryIndex * 0.1 + skillIndex * 0.05,
                  }}
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-secondary text-secondary-foreground text-[11px] md:text-sm font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill bars for key technologies */}
      <div className="mt-8 md:mt-12 space-y-4 md:space-y-6">
        <h3 className="text-sm md:text-lg font-medium text-foreground mb-4 md:mb-6">Proficiency</h3>
        <SkillBar skill="Node.js / Express.js" percentage={90} />
        <SkillBar skill="MongoDB" percentage={88} />
        <SkillBar skill="REST API Development" percentage={90} />
        <SkillBar skill="Java / Spring Boot" percentage={75} />
        <SkillBar skill="React" percentage={70} />
        <SkillBar skill="Docker / Git" percentage={75} />
      </div>
    </motion.section>
  );
};

const SkillBar = ({ skill, percentage }: { skill: string; percentage: number }) => (
  <div>
    <div className="flex justify-between mb-1.5 md:mb-2">
      <span className="text-[12px] md:text-sm font-medium text-foreground">{skill}</span>
      <span className="text-[12px] md:text-sm text-muted-foreground">{percentage}%</span>
    </div>
    <div className="h-1.5 md:h-2 bg-secondary rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-primary rounded-full"
      />
    </div>
  </div>
);

export default SkillsSection;
