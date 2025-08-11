import { useState } from "react";
import { SplitLanding } from "@/components/split-landing";
import { PortfolioSection } from "@/components/portfolio-section";
import { ContactForm } from "@/components/contact-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { Github, Linkedin, Twitter } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Home() {
  const [currentSection, setCurrentSection] = useState<"landing" | "portfolio" | "contact">("landing");
  const [selectedPersona, setSelectedPersona] = useState<"dev" | "ceo" | null>(null);

  const scrollToSection = (section: "portfolio" | "contact") => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(section);
    }
  };

  const handlePersonaSelect = (persona: "dev" | "ceo") => {
    setSelectedPersona(persona);
    scrollToSection("portfolio");
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "github":
        return <Github className="w-6 h-6" />;
      case "linkedin":
        return <Linkedin className="w-6 h-6" />;
      case "twitter":
        return <Twitter className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <ThemeToggle />
      
      <SplitLanding onPersonaSelect={handlePersonaSelect} />
      
      <PortfolioSection selectedPersona={selectedPersona} />
      
      <ContactForm selectedPersona={selectedPersona} />
      
      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center space-x-8 mb-8">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  link.name === "GitHub"
                    ? "text-matrix hover:text-matrix/80"
                    : link.name === "LinkedIn"
                    ? "text-ceo-gold hover:text-ceo-gold/80"
                    : "text-white hover:text-gray-300"
                }`}
              >
                {getIcon(link.icon)}
                <span className="sr-only">{link.name}</span>
              </a>
            ))}
          </div>
          
          <p className="text-gray-400 mb-4">
            © 2024 Emmanuel Ogugua. Crafted with code and strategy.
          </p>
          
          <div className="text-sm text-gray-500">
            <span className="font-mono">Developer.exe</span> × <span className="font-serif">Strategic.mind</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
