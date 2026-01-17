import { motion } from "framer-motion";
import { Server, Database, Code, Workflow } from "lucide-react";

const services = [
  {
    icon: <Server className="w-6 h-6" />,
    title: "Backend Development",
    description: "Building robust server-side applications with Node.js, Express.js, and Spring Boot.",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Database Design",
    description: "Expert in MongoDB and MySQL schema design for efficient data management and optimization.",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "REST API Development",
    description: "Creating scalable and secure RESTful APIs with proper authentication and authorization.",
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "API Integration",
    description: "Integrating third-party APIs for logistics, identity verification, and payment systems.",
  },
];

const AboutSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Highly motivated Backend Developer with professional experience in designing, developing,
          and deploying scalable, modular server-side applications using Node.js and Express.js.
        </p>
        <p>
          Proven ability to integrate complex third-party APIs (e.g., logistics, identity verification)
          to automate business processes. Proficient in MongoDB schema design, RESTful API development,
          and ensuring high code quality in collaborative team environments.
        </p>
        <p>
          Recently promoted from an intern role, demonstrating strong system ownership and feature
          delivery capabilities. I'm passionate about building efficient backend solutions that power
          great user experiences.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-foreground mt-10 mb-6">What I'm Doing</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="service-card flex gap-4"
          >
            <div className="icon-box shrink-0">{service.icon}</div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">{service.title}</h4>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default AboutSection;
