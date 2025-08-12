import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEVELOPER_PROJECTS, BUSINESS_PROJECTS } from "@/lib/constants";

interface PortfolioSectionProps {
  selectedPersona?: "dev" | "ceo" | null;
}

export function PortfolioSection({ selectedPersona }: PortfolioSectionProps) {
  const [activePortfolio, setActivePortfolio] = useState<"dev" | "ceo">(selectedPersona || "dev");

  // Update active portfolio when selectedPersona changes
  if (selectedPersona && activePortfolio !== selectedPersona) {
    setActivePortfolio(selectedPersona);
  }

  const projects = activePortfolio === "dev" ? DEVELOPER_PROJECTS : BUSINESS_PROJECTS;

  return (
    <section id="portfolio" className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
            Portfolio
          </h2>
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-200 dark:bg-gray-800 rounded-full p-1">
              <Button
                onClick={() => setActivePortfolio("dev")}
                className={`px-8 py-3 rounded-full font-mono transition-all ${
                  activePortfolio === "dev"
                    ? "bg-matrix text-black"
                    : "text-gray-600 dark:text-gray-400 bg-transparent hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                Developer Projects
              </Button>
              <Button
                onClick={() => setActivePortfolio("ceo")}
                className={`px-8 py-3 rounded-full font-serif transition-all ${
                  activePortfolio === "ceo"
                    ? "bg-ceo-gold text-white"
                    : "text-gray-600 dark:text-gray-400 bg-transparent hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                Business Ventures
              </Button>
            </div>
          </div>
        </div>

        <motion.div
          key={activePortfolio}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`portfolio-card overflow-hidden ${
                  activePortfolio === "dev"
                    ? "bg-gray-900 text-white border-gray-700"
                    : "bg-white dark:bg-gray-800 shadow-lg border"
                }`}
              >
                <div className="p-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3
                    className={`text-xl font-bold mb-3 ${
                      activePortfolio === "dev"
                        ? "font-mono text-matrix"
                        : "font-serif text-ceo-charcoal dark:text-white"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mb-4 ${
                      activePortfolio === "dev"
                        ? "text-gray-300"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className={`text-xs ${
                          activePortfolio === "dev"
                            ? "bg-matrix/20 text-matrix"
                            : "bg-ceo-gold/20 text-ceo-gold"
                        }`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    className={`w-full py-2 transition-colors ${
                      activePortfolio === "dev"
                        ? "bg-matrix text-black font-mono hover:bg-matrix/80"
                        : "bg-ceo-gold text-white font-serif hover:bg-ceo-gold/80"
                    }`}
                    onClick={() => {
                      if (project.id === "4") {
                        // Open CEOWrites blog in new tab
                        window.open("https://ceowrites.dev", "_blank");
                      } else {
                        // For other projects, we could implement different actions
                        console.log(`Action for project ${project.id}`);
                      }
                    }}
                  >
                    {project.action}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
