import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/ganeshbagav7@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      <div className="mt-4 md:mt-8">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3 md:space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="input-field disabled:opacity-50 text-[13px] md:text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="input-field disabled:opacity-50 text-[13px] md:text-sm"
            />
          </div>

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="input-field disabled:opacity-50 text-[13px] md:text-sm"
          />

          <textarea
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            disabled={isSubmitting}
            className="input-field resize-none disabled:opacity-50 text-[13px] md:text-sm"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
          >
            <Send className="w-4 h-4" />
            <span className="text-[13px] md:text-sm font-semibold">{isSubmitting ? "Sending..." : "Send Message"}</span>
          </motion.button>
        </motion.form>

        {/* Additional Contact Info */}
        <div className="mt-8 md:mt-12 glass-card p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 md:mb-4">Let's Connect</h3>
          <p className="text-[12px] md:text-sm text-muted-foreground leading-relaxed">
            Feel free to reach out if you're looking for a backend developer, have a question, or just want to connect.
            I'm always excited to discuss new opportunities and collaborate on interesting projects.
          </p>
          <div className="mt-4 space-y-1.5 md:space-y-2">
            <a
              href="mailto:ganeshbagav7@gmail.com"
              className="block text-[13px] md:text-sm text-primary hover:underline font-medium"
            >
              ganeshbagav7@gmail.com
            </a>
            <a
              href="tel:+918767986802"
              className="block text-[13px] md:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              +91-8767986802
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
