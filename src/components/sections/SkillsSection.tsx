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
      <h2 className="section-title">Skills</h2>

      <div className="mt-8 space-y-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <h3 className="text-lg font-medium text-foreground mb-4">{category.title}</h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: categoryIndex * 0.1 + skillIndex * 0.05,
                  }}
                  className="skill-badge"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill bars for key technologies */}
      <div className="mt-12 space-y-6">
        <h3 className="text-lg font-medium text-foreground mb-6">Proficiency</h3>
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
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium text-foreground">{skill}</span>
      <span className="text-sm text-muted-foreground">{percentage}%</span>
    </div>
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
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
