import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: string) => void;
  onClose: () => void;
}

export function SearchSuggestions({ query, onSelect, onClose }: SearchSuggestionsProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Generate AI-powered suggestions using Gemini API
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Defense-focused fallback suggestions
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

  // Generate AI suggestions when query changes
  useEffect(() => {
    const generateAISuggestions = async () => {
      const geminiKey = localStorage.getItem('gemini_api_key');
      if (!geminiKey || query.length < 2) return;

      setLoading(true);
      try {
        const response = await fetch(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
          {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'X-goog-api-key': geminiKey
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `Generate 6 specific defense technology search suggestions related to "${query}". Focus on military applications, AI defense systems, cybersecurity, autonomous weapons, radar technology, and battlefield systems. Return only the suggestions, one per line.`
                }]
              }]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (content) {
            const suggestions = content.split('\n')
              .filter(line => line.trim().length > 10)
              .slice(0, 6);
            setAiSuggestions(suggestions);
          }
        }
      } catch (error) {
        console.error('AI suggestions error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(generateAISuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const suggestions = aiSuggestions.length > 0 
    ? aiSuggestions
    : defenseSuggestions.filter(s => 
        s.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (suggestions.length === 0 && !loading) {
    return null;
  }

  return (
    <Card ref={ref} className="absolute top-full left-0 right-0 mt-1 bg-popover border-border shadow-lg z-50">
      <div className="p-2">
        {loading && (
          <div className="px-3 py-2 text-sm text-muted-foreground">
            Generating AI suggestions...
          </div>
        )}
        {suggestions.map((suggestion, index) => (
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