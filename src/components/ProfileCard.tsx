import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Copy, Download, Database } from "lucide-react";
import { useState, useEffect } from "react";
import avatar from "@/assets/avatar.png";

const ProfileCard = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const typingData = [
    { text: "Backend Developer", icon: "https://cdn.simpleicons.org/springboot/6DB33F" },
    { text: "REST API Designer", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { text: "Database Architect", component: <Database className="w-full h-full text-[#4479A1]" /> },
    // { text: "Microservices Expert", icon: "https://cdn.simpleicons.org/docker/2496ED" }
  ];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % typingData.length;
      const fullText = typingData[i].text;

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);
  return (
    <motion.aside
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-8 sticky top-8"
    >
      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <img
            src={avatar}
            alt="Ganesh Bagav"
            className="w-24 h-24 rounded-2xl object-cover border-2 border-border"
          />
          <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Ganesh Bagav</h1>
        <div className="relative mt-12 mb-6 flex items-center justify-center [transform-style:preserve-3d]">
          {/* Badge (Center) */}
          <span className="px-5 py-2 bg-secondary/80 backdrop-blur-md text-white text-sm font-medium rounded-full border border-white/10 shadow-[0_0_15px_rgba(139,92,246,0.3)] [transform:translateZ(0)] flex items-center gap-2 min-h-[40px] min-w-[200px] justify-center">
            <span>{text}</span>
            <span className="w-5 h-5 relative flex items-center justify-center">
              <motion.div
                key={loopNum} /* Re-trigger proper icon render */
                className="w-full h-full flex items-center justify-center"
              >
                {typingData[loopNum % typingData.length].component ? (
                  typingData[loopNum % typingData.length].component
                ) : (
                  <img
                    src={typingData[loopNum % typingData.length].icon}
                    alt="cursor"
                    className="w-full h-full object-contain"
                  />
                )}
              </motion.div>
            </span>
          </span>

          {/*
          // Single Glowing Orbit (Reference Style)
          <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d] [transform:rotateX(75deg)_rotateZ(-20deg)]">
            // Glowing Ring
            <div className="absolute w-[260px] h-[260px] rounded-full border-[2px] border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)]" />

            // Trail effect (Optional secondary ring for depth)
            <div className="absolute w-[260px] h-[260px] rounded-full border border-white/10 blur-[2px]" />

            // Icons distribute along the single path
            {[
              { icon: "nodejs/nodejs-original.svg", name: "Node.js", color: "rgba(74,222,128,0.8)", offset: 0 },
              { icon: "spring/spring-original.svg", name: "Spring", color: "rgba(74,222,128,0.8)", offset: 60 },
              { icon: "mongodb/mongodb-original.svg", name: "MongoDB", color: "rgba(74,222,128,0.8)", offset: 120 },
              { icon: "docker/docker-original.svg", name: "Docker", color: "rgba(56,189,248,0.8)", offset: 180 },
              { icon: "mysql/mysql-original.svg", name: "MySQL", color: "rgba(56,189,248,0.8)", offset: 240 },
              { icon: "java/java-original.svg", name: "Java", color: "rgba(56,189,248,0.8)", offset: 300 },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="absolute w-[260px] h-[260px] rounded-full"
                animate={{ rotate: [tech.offset, tech.offset + 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   // Counter-rotate container to keep icon facing camera
                  <motion.div
                    animate={{
                      rotate: [-tech.offset + 20, -(tech.offset + 360) + 20],
                      rotateX: -75
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    transformTemplate={({ rotate, rotateX }) => `rotateZ(${rotate}) rotateX(${rotateX})`}
                  >
                     // Glowing Icon
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}`}
                      className="w-10 h-10"
                      alt={tech.name}
                      style={{
                        filter: `drop-shadow(0 0 8px ${tech.color})`,
                        transform: "translateZ(1px)" // Force 3D stacking
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
*/}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-border my-6" />

      {/* Contact Info */}
      <div className="space-y-4">
        <ContactItem
          icon={<Mail className="w-5 h-5" />}
          label="EMAIL"
          value="ganeshbagav7@gmail.com"
          copyable
        />
        <ContactItem
          icon={<Phone className="w-5 h-5" />}
          label="PHONE"
          value="+91-8767986802"
          copyable
        />
        <ContactItem
          icon={<MapPin className="w-5 h-5" />}
          label="LOCATION"
          value="Pune, India"
        />
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-3 mt-6">
        <SocialLink
          href="https://linkedin.com/in/ganeshbagav"
          icon={<Linkedin className="w-5 h-5" />}
        />
        <SocialLink
          href="https://github.com/ganeshbagav"
          icon={<Github className="w-5 h-5" />}
        />
      </div>

      <div className="mt-6 flex justify-center">
        <a
          href="https://drive.google.com/file/d/1JYQOOQJr1QVHpjx1_rM1K09kAwW-B6nE/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-all duration-300 shadow-md transform hover:-translate-y-0.5"
        >
          <Download className="w-4 h-4" />
          Download Resume
        </a>
      </div>
    </motion.aside>
  );
};

const ContactItem = ({
  icon,
  label,
  value,
  copyable = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  copyable?: boolean;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="icon-box-outline">{icon}</div>

      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {label}
        </p>

        <div className="flex items-center gap-2">
          <p className="text-sm text-foreground truncate">
            {value}
          </p>

          {copyable && (
            <button
              onClick={handleCopy}
              className="text-muted-foreground hover:text-primary transition flex items-center gap-1"
            >
              <Copy className="w-4 h-4" />

              {copied && (
                <span className="text-xs text-green-500">
                  Copied
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all duration-300"
  >
    {icon}
  </a>
);

export default ProfileCard;
