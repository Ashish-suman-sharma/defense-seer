import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TechRadarChart } from "./charts/TechRadarChart";
import { TRLChart } from "./charts/TRLChart";
import { HypeCurveChart } from "./charts/HypeCurveChart";
import { Brain, Zap, Target, TrendingUp } from "lucide-react";

interface IntelligenceDashboardProps {
  searchResults: any[];
  summaries: string[];
  isAnalyzing: boolean;
  overview: {
    keyFindings: string[];
    trends: string[];
    strategicImplications: string;
  } | null;
}

export function IntelligenceDashboard({ searchResults, summaries, isAnalyzing, overview }: IntelligenceDashboardProps) {
  const mockInsights = [
    {
      title: "AI Threat Detection",
      trl: 8,
      hype: "Peak of Inflated Expectations",
      category: "Emerging",
      relevance: 95,
      icon: Brain
    },
    {
      title: "Autonomous Defense Systems",
      trl: 6,
      hype: "Innovation Trigger",
      category: "Emerging", 
      relevance: 88,
      icon: Zap
    },
    {
      title: "Cyber Warfare AI",
      trl: 7,
      hype: "Trough of Disillusionment",
      category: "Maturing",
      relevance: 92,
      icon: Target
    }
  ];

  return (
    <main className="flex-1 bg-dashboard-main p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* AI Analysis Summary */}
        {summaries.length > 0 && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Analysis Summary
              </CardTitle>
              <CardDescription>
                Automated insights from latest intelligence data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {summaries.map((summary, index) => (
                  <div key={index} className="p-4 bg-surface rounded-lg border border-border">
                    <p className="text-sm text-foreground leading-relaxed">
                      {summary}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <Card key={index} className="border-border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{insight.title}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      TRL {insight.trl}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Relevance:</span>
                      <span className="font-medium">{insight.relevance}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium">{insight.category}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Technology Readiness Levels
              </CardTitle>
              <CardDescription>
                Distribution of defense technologies by maturity level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TRLChart data={mockInsights} />
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Gartner Hype Curve</CardTitle>
              <CardDescription>
                Technology adoption lifecycle analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HypeCurveChart data={mockInsights} />
            </CardContent>
          </Card>
        </div>

        {/* Tech Radar - Full Width */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Defense Technology Radar</CardTitle>
            <CardDescription>
              Strategic positioning of emerging defense technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TechRadarChart data={mockInsights} />
          </CardContent>
        </Card>



        {isAnalyzing && (
          <Card className="border-border">
            <CardContent className="py-8">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="text-muted-foreground">Analyzing intelligence data...</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}