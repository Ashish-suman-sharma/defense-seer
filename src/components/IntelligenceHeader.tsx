import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfigurationModal } from "./ConfigurationModal";
import { SearchSuggestions } from "./SearchSuggestions";
import { Search, Settings, Shield } from "lucide-react";

interface IntelligenceHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}

export function IntelligenceHeader({ searchQuery, onSearchChange, onSearch }: IntelligenceHeaderProps) {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    setShowSuggestions(value.length >= 2);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    onSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      onSearch();
    }
  };

  return (
    <>
      <header className="bg-dashboard-header text-primary-foreground border-b border-border shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">AI Intelligence Engine</h1>
              <p className="text-sm text-muted-foreground">Defense Technology Analysis</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search defense technologies, patents, research papers..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                className="pl-10 h-12 bg-background border-border focus:ring-primary text-input-foreground"
              />
            </div>
            {showSuggestions && searchQuery.length >= 2 && (
              <SearchSuggestions
                query={searchQuery}
                onSelect={handleSuggestionSelect}
                onClose={() => setShowSuggestions(false)}
              />
            )}
          </div>

          <Button
            variant="config"
            size="sm"
            onClick={() => setIsConfigOpen(true)}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            Configuration
          </Button>
        </div>
      </header>

      <ConfigurationModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
      />
    </>
  );
}