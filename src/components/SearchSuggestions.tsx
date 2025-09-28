import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: string) => void;
  onClose: () => void;
}

export function SearchSuggestions({ query, onSelect, onClose }: SearchSuggestionsProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Defense-focused suggestions
  const defenseSuggestions = [
    "AI-powered missile defense systems",
    "Autonomous military drones",
    "Cybersecurity threat detection",
    "Radar signal processing",
    "Battlefield communication networks",
    "Smart ammunition systems",
    "Military satellite technology",
    "Electronic warfare countermeasures",
    "Biometric identification systems",
    "Stealth technology materials",
    "Naval combat systems",
    "Armored vehicle protection",
    "Surveillance and reconnaissance",
    "Command and control systems",
    "Military logistics optimization"
  ];

  const filteredSuggestions = defenseSuggestions
    .filter(suggestion => 
      suggestion.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (filteredSuggestions.length === 0) {
    return null;
  }

  return (
    <Card ref={ref} className="absolute top-full left-0 right-0 mt-1 bg-popover border-border shadow-lg z-50">
      <div className="p-2">
        {filteredSuggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary-hover text-sm transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </Card>
  );
}