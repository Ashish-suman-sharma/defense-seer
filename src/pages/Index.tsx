import { useState, useEffect } from "react";
import { IntelligenceHeader } from "@/components/IntelligenceHeader";
import { IntelligenceSidebar } from "@/components/IntelligenceSidebar";
import { IntelligenceDashboard } from "@/components/IntelligenceDashboard";
import { useIntelligenceEngine } from "@/hooks/useIntelligenceEngine";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  const {
    searchResults,
    summaries,
    isSearching,
    isAnalyzing,
    searchIntelligence,
    generateSummary,
  } = useIntelligenceEngine();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchIntelligence(searchQuery);
    }
  };

  // Auto-generate summary when search results change
  useEffect(() => {
    if (searchResults.length > 0) {
      generateSummary(searchResults);
    }
  }, [searchResults, generateSummary]);

  // Filter results based on active filter
  const filteredResults = activeFilter === "all" 
    ? searchResults 
    : searchResults.filter(result => result.source === activeFilter.slice(0, -1)); // Remove 's' from 'patents', 'papers'

  // Calculate result counts for sidebar
  const resultCounts = {
    patents: searchResults.filter(r => r.source === 'patent').length,
    papers: searchResults.filter(r => r.source === 'paper').length,
    startups: searchResults.filter(r => r.source === 'startup').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <IntelligenceHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />
      
      <div className="flex">
        <IntelligenceSidebar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchResults={resultCounts}
        />
        
        <IntelligenceDashboard
          searchResults={filteredResults}
          summaries={summaries}
          isAnalyzing={isAnalyzing || isSearching}
        />
      </div>
    </div>
  );
};

export default Index;
