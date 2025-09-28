import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SearchResult {
  id: string;
  title: string;
  abstract: string;
  source: 'patent' | 'paper' | 'startup';
  relevance: number;
  date: string;
  url?: string;
}

export function useIntelligenceEngine() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [summaries, setSummaries] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const mockDefenseData: SearchResult[] = [
    {
      id: '1',
      title: 'AI-Powered Missile Defense System',
      abstract: 'Novel artificial intelligence approach for real-time threat detection and interception in missile defense systems...',
      source: 'patent',
      relevance: 95,
      date: '2024-01-15',
      url: '#'
    },
    {
      id: '2', 
      title: 'Autonomous Drone Swarm Coordination',
      abstract: 'Machine learning algorithms for coordinating multiple autonomous drones in defense scenarios...',
      source: 'paper',
      relevance: 88,
      date: '2024-02-20',
      url: '#'
    },
    {
      id: '3',
      title: 'CyberGuard Defense Solutions',
      abstract: 'Startup developing next-generation cybersecurity solutions for military applications...',
      source: 'startup',
      relevance: 82,
      date: '2024-03-10',
      url: '#'
    }
  ];

  const searchIntelligence = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filter mock data based on query
      const filtered = mockDefenseData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.abstract.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filtered.length > 0 ? filtered : mockDefenseData);
      
      toast({
        title: "Search Complete",
        description: `Found ${filtered.length || mockDefenseData.length} relevant defense technologies`,
      });
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Unable to fetch intelligence data",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  }, [toast]);

  const generateSummary = useCallback(async (results: SearchResult[]) => {
    const geminiKey = localStorage.getItem('gemini_api_key');
    
    if (!geminiKey) {
      toast({
        title: "API Key Required",
        description: "Please configure your Gemini API key in settings",
        variant: "destructive",
      });
      return;
    }

    if (results.length === 0) return;

    setIsAnalyzing(true);
    try {
      // Prepare abstracts for summarization
      const abstracts = results.map(r => r.abstract).join('\n\n');
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Analyze these defense technology abstracts and provide 3 key strategic insights about emerging trends, threats, and opportunities. Keep each insight to 2-3 sentences:\n\n${abstracts}`
              }]
            }]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const summary = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (summary) {
          // Split into bullet points
          const insights = summary.split('\n').filter((line: string) => line.trim().length > 20);
          setSummaries(insights.slice(0, 3));
          
          toast({
            title: "Analysis Complete",
            description: "AI insights generated successfully",
          });
        }
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      // Fallback to mock summaries for demo
      setSummaries([
        "AI-powered defense systems are rapidly advancing with 95% accuracy in threat detection, indicating strong market readiness and military adoption potential.",
        "Autonomous drone swarm coordination represents a paradigm shift in warfare tactics, with research showing significant operational advantages in complex scenarios.", 
        "Cybersecurity startups are filling critical gaps in military infrastructure protection, suggesting high investment opportunities in this growing sector."
      ]);
      
      toast({
        title: "Using Demo Analysis",
        description: "Generated sample insights for demonstration",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [toast]);

  return {
    searchResults,
    summaries,
    isSearching,
    isAnalyzing,
    searchIntelligence,
    generateSummary,
  };
}