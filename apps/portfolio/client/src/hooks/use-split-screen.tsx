import { useState, useCallback, useEffect } from "react";

interface UseSplitScreenProps {
  isMobile: boolean;
}

export function useSplitScreen({ isMobile }: UseSplitScreenProps) {
  const [splitPosition, setSplitPosition] = useState(50);
  const [showBlended, setShowBlended] = useState(false);
  const [mobilePersona, setMobilePersona] = useState<"dev" | "ceo">("dev");

  const handleMouseMove = useCallback((e: MouseEvent, container: HTMLElement) => {
    if (isMobile) return;
    
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const percentage = (mouseX / rect.width) * 100;
    
    setSplitPosition(Math.max(0, Math.min(100, percentage)));
    
    // Show blended image in center
    setShowBlended(percentage > 45 && percentage < 55);
  }, [isMobile]);

  const toggleMobilePersona = useCallback((persona: "dev" | "ceo") => {
    setMobilePersona(persona);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSplitPosition(50);
      setShowBlended(false);
    }
  }, [isMobile]);

  return {
    splitPosition,
    showBlended,
    mobilePersona,
    handleMouseMove,
    toggleMobilePersona,
  };
}
