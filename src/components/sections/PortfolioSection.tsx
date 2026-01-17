import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";

const categories = ["All", "Backend", "Full Stack", "API"];

const projects = [
  {
    title: "ByzWiz Store Builder",
    category: "Backend",
    description: "Built scalable REST APIs for businesses to manage multiple pickup locations, inventory, products, and orders using Node.js and MongoDB.",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT", "Firebase"],
    color: "from-blue-500 to-cyan-500",
    highlights: [
      "Implemented secure authentication with JWT and role-based access",
      "Integrated Firebase Firestore and FCM for real-time chat (ByzTalk)",
      "Developed Super Admin dashboard for business approvals and analytics",
    ],
  },
  {
    title: "ByzWiz Buyer Web App",
    category: "Full Stack",
    description: "Developed backend APIs to power the Buyer Web App, enabling customers to browse stores, search products, place orders, and track deliveries.",
    tech: ["Node.js", "Express.js", "MongoDB", "REST API"],
    color: "from-emerald-500 to-teal-500",
    highlights: [
      "Built secure customer registration and profile management",
      "Integrated order tracking for hyperlocal and pan-India deliveries",
      "Optimized queries for faster product browsing",
    ],
  },
  {
    title: "Channel Partner Platform",
    category: "Backend",
    description: "Designed and developed the entire backend server for the Channel Partner module independently, handling KYC verification and logistics automation.",
    tech: ["Node.js", "Express.js", "MongoDB", "Zoop API"],
    color: "from-orange-500 to-amber-500",
    highlights: [
      "Integrated third-party APIs for KYC verification and logistics",
      "Modularized server architecture for clean code and scalability",
      "Created APIs for partner registration and performance analytics",
    ],
  },
  {
    title: "Real-time Chat System",
    category: "API",
    description: "ByzTalk feature enabling real-time communication between customers and businesses using Firebase integration.",
    tech: ["Firebase Firestore", "FCM", "Node.js"],
    color: "from-purple-500 to-pink-500",
    highlights: [
      "Real-time messaging with Firebase Firestore",
      "Push notifications via Firebase Cloud Messaging",
      "Seamless integration with main platform",
    ],
  },
  {
    title: "Super Admin Dashboard",
    category: "Full Stack",
    description: "Backend services for the Super Admin dashboard, handling business approvals, content moderation, and platform analytics.",
    tech: ["Node.js", "MongoDB", "REST API", "Aggregation"],
    color: "from-red-500 to-rose-500",
    highlights: [
      "Business approval workflows",
      "Content moderation features",
      "Platform-wide analytics and reporting",
    ],
  },
  {
    title: "Authentication Service",
    category: "API",
    description: "JWT-based authentication microservice with role-based access control for Business Owners, Customers, and Super Admins.",
    tech: ["Node.js", "JWT", "MongoDB", "Express.js"],
    color: "from-indigo-500 to-violet-500",
    highlights: [
      "Multi-role authentication system",
      "Secure token management",
      "Role-based access control (RBAC)",
    ],
  },
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 md:gap-4 mt-4 md:mt-8 mb-4 md:mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`text-[12px] md:text-sm font-medium transition-colors duration-300 ${activeCategory === category
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glass-card overflow-hidden group cursor-pointer"
          >
            {/* Project Image/Gradient */}
            <div
              className={`h-32 md:h-40 bg-gradient-to-br ${project.color} flex items-center justify-center relative`}
            >
              <span className="text-3xl md:text-4xl font-bold text-white/30">{project.title.charAt(0)}</span>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 md:gap-4">
                <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform">
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:scale-110 transition-transform">
                  <Github className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-4 md:p-5">
              <h4 className="text-sm md:text-base font-semibold text-foreground">{project.title}</h4>
              <p className="text-[10px] md:text-xs text-primary/80 font-medium mt-0.5 md:mt-1 uppercase tracking-wider">{project.category}</p>
              <p className="text-[12px] md:text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3 md:mt-4">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] md:text-xs px-2 py-0.5 md:py-1 bg-secondary/50 border border-border/50 rounded text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-[10px] md:text-xs px-2 py-0.5 md:py-1 bg-secondary/50 border border-border/50 rounded text-muted-foreground">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default PortfolioSection;
