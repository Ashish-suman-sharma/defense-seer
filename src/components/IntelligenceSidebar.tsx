import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Building2, ScrollText, TrendingUp } from "lucide-react";

interface IntelligenceSidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchResults: {
    patents: number;
    papers: number;
    startups: number;
  };
}

export function IntelligenceSidebar({ activeFilter, onFilterChange, searchResults }: IntelligenceSidebarProps) {
  const filters = [
    {
      id: "all",
      label: "All Sources",
      icon: TrendingUp,
      count: searchResults.patents + searchResults.papers + searchResults.startups,
      description: "Combined intelligence"
    },
    {
      id: "patents",
      label: "Patents",
      icon: ScrollText,
      count: searchResults.patents,
      description: "Patent applications & grants"
    },
    {
      id: "papers",
      label: "Research Papers",
      icon: FileText,
      count: searchResults.papers,
      description: "Academic publications"
    },
    {
      id: "startups",
      label: "Defense Startups",
      icon: Building2,
      count: searchResults.startups,
      description: "Market intelligence"
    }
  ];

  return (
    <aside className="w-80 bg-dashboard-sidebar border-r border-border">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Intelligence Sources</h2>
        
        <div className="space-y-3">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            
            return (
              <Card 
                key={filter.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isActive 
                    ? 'border-primary bg-primary-light shadow-intelligence' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => onFilterChange(filter.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={isActive ? 'text-primary' : 'text-foreground'}>
                        {filter.label}
                      </span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={isActive ? 'bg-primary text-primary-foreground' : ''}
                    >
                      {filter.count}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className={`text-xs ${isActive ? 'text-primary/70' : 'text-muted-foreground'}`}>
                    {filter.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-surface rounded-lg border border-border">
          <h3 className="text-sm font-medium mb-2 text-foreground">Analysis Status</h3>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Last Update:</span>
              <span>Live</span>
            </div>
            <div className="flex justify-between">
              <span>Coverage:</span>
              <span>Defense Tech</span>
            </div>
            <div className="flex justify-between">
              <span>Sources:</span>
              <span>3 Active</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}