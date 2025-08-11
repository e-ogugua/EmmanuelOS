import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const devPng = "/assets/dev_1754842240581.png";
const bizPng = "/assets/biz_1754842174552.png";
const logoPng = "/assets/eogugua_logo_1754842314245.png";

interface SplitLandingProps {
  onPersonaSelect: (persona: "dev" | "ceo") => void;
}

export function SplitLanding({ onPersonaSelect }: SplitLandingProps) {
  const isMobile = useIsMobile();
  const landingRef = useRef<HTMLDivElement>(null);
  const [activePersona, setActivePersona] = useState<"dev" | "ceo">("dev");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = landingRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const centerX = rect.width / 2;

    // Switch persona based on which half of the screen the mouse is in
    if (mouseX < centerX) {
      if (activePersona !== "dev") setActivePersona("dev");
    } else {
      if (activePersona !== "ceo") setActivePersona("ceo");
    }
  };

  const handleMobileClick = (persona: "dev" | "ceo") => {
    onPersonaSelect(persona);
  };

  return (
    <section
      ref={landingRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      id="landing"
      onMouseMove={handleMouseMove}
    >
      {/* DESKTOP VIEW */}
      {!isMobile ? (
        <>
          {/* Background Image */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${activePersona === "dev" ? devPng : bizPng})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
            key={activePersona}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Left-side click area */}
          <div
            className="absolute left-0 top-0 w-1/2 h-full z-10 cursor-pointer"
            onClick={() => onPersonaSelect("dev")}
          />

          {/* Right-side click area */}
          <div
            className="absolute right-0 top-0 w-1/2 h-full z-10 cursor-pointer"
            onClick={() => onPersonaSelect("ceo")}
          />

          {/* Interactive UI Container - Allows pointer events */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="relative w-full h-full">
              
              {/* Logo */}
              <div className="absolute top-8 left-8 pointer-events-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="w-20 h-20 bg-white shadow-xl flex items-center justify-center border-4 border-white/80 backdrop-blur-sm rounded-full"
                >
                  <img
                    src={logoPng}
                    alt="EO Logo"
                    className="w-16 h-16 object-contain filter brightness-110 contrast-125"
                  />
                </motion.div>
              </div>

              {/* Developer UI */}
              <AnimatePresence>
                {activePersona === "dev" && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.6 }}
                      className="absolute top-1/2 right-8 transform -translate-y-1/2 text-right pointer-events-auto"
                    >
                      <div className="bg-black/85 backdrop-blur-sm rounded-lg p-6 max-w-xs border border-matrix/30">
                        <h2 className="text-2xl font-mono font-bold text-matrix mb-2"><code>&lt;Dev/&gt;</code></h2>
                        <p className="text-sm text-gray-300 mb-4 leading-snug">Building digital solutions with modern tech</p>
                        <div className="text-xs text-matrix font-mono mb-4 space-y-1">
                          <div>→ Full-stack Dev</div>
                          <div>→ Cloud Solutions</div>
                        </div>
                        <Button className="bg-matrix text-black hover:bg-matrix/80 font-mono font-semibold px-6 py-2 text-sm" onClick={() => onPersonaSelect("dev")}>View Portfolio</Button>
                      </div>
                    </motion.div>
                    <motion.nav
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="absolute top-8 right-8 pointer-events-auto"
                    >
                      <div className="flex items-center gap-6 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 border border-matrix/30">
                        <button onClick={() => onPersonaSelect("dev")} className="text-matrix hover:text-matrix/80 font-mono text-sm transition-colors">Projects</button>
                        <a href="#dev-skills" className="text-gray-300 hover:text-matrix font-mono text-sm transition-colors">Skills</a>
                        <a href="#dev-contact" className="text-gray-300 hover:text-matrix font-mono text-sm transition-colors">Contact</a>
                      </div>
                    </motion.nav>
                  </>
                )}
              </AnimatePresence>

              {/* CEO UI */}
              <AnimatePresence>
                {activePersona === "ceo" && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.6 }}
                      className="absolute top-1/2 left-8 transform -translate-y-1/2 pointer-events-auto"
                    >
                      <div className="bg-black/85 backdrop-blur-sm rounded-lg p-6 max-w-xs border border-ceo-gold/30">
                        <h2 className="text-2xl font-serif font-bold text-ceo-gold mb-2">Strategist</h2>
                        <p className="text-sm text-gray-300 mb-4 leading-snug">Transforming visions into thriving brands</p>
                        <div className="text-xs text-ceo-gold font-serif mb-4 space-y-1">
                          <div>• Brand Strategy</div>
                          <div>• Business Growth</div>
                        </div>
                        <Button className="bg-ceo-gold text-white hover:bg-ceo-gold/80 font-serif font-semibold px-6 py-2 text-sm" onClick={() => onPersonaSelect("ceo")}>View Brands</Button>
                      </div>
                    </motion.div>
                    <motion.nav
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="absolute top-8 right-8 pointer-events-auto"
                    >
                       <div className="flex items-center gap-6 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 border border-ceo-gold/30">
                        <button onClick={() => onPersonaSelect("ceo")} className="text-ceo-gold hover:text-ceo-gold/80 font-serif text-sm transition-colors">Brands</button>
                        <a href="#ceo-services" className="text-gray-300 hover:text-ceo-gold font-serif text-sm transition-colors">Services</a>
                        <a href="#ceo-contact" className="text-gray-300 hover:text-ceo-gold font-serif text-sm transition-colors">Contact</a>
                      </div>
                    </motion.nav>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </>
      ) : (
        /* MOBILE VIEW */
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-4 bg-gray-900">
            <div className="w-24 h-24 mb-6 bg-white shadow-xl flex items-center justify-center border-4 border-white/80 backdrop-blur-sm rounded-full">
                <img src={logoPng} alt="EO Logo" className="w-20 h-20 object-contain" />
            </div>
            <h1 className="text-4xl font-bold mb-2 text-center">Emmanuel Ogugua</h1>
            <p className="text-lg text-gray-300 mb-8 text-center">Developer & Business Strategist</p>
            
            <div className="w-full max-w-sm space-y-4">
                <Button
                    className="w-full bg-matrix text-black hover:bg-matrix/80 font-mono font-semibold py-6 text-lg transition-transform transform hover:scale-105"
                    onClick={() => handleMobileClick("dev")}
                >
                    &lt;Dev Portfolio /&gt;
                </Button>
                <Button
                    className="w-full bg-ceo-gold text-white hover:bg-ceo-gold/80 font-serif font-semibold py-6 text-lg transition-transform transform hover:scale-105"
                    onClick={() => handleMobileClick("ceo")}
                >
                    Brand Strategist
                </Button>
            </div>
        </div>
      )}
    </section>
  );
}
