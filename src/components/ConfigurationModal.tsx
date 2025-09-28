import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2, Key, Shield } from "lucide-react";

interface ConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ApiKeyStatus {
  gemini: 'unconfigured' | 'testing' | 'valid' | 'invalid';
}

export function ConfigurationModal({ isOpen, onClose }: ConfigurationModalProps) {
  const [geminiKey, setGeminiKey] = useState("");
  const [status, setStatus] = useState<ApiKeyStatus>({ gemini: 'unconfigured' });
  const { toast } = useToast();

  useEffect(() => {
    // Load existing keys from localStorage
    const savedGeminiKey = localStorage.getItem('gemini_api_key');
    if (savedGeminiKey) {
      setGeminiKey(savedGeminiKey);
      setStatus({ gemini: 'valid' });
    }
  }, [isOpen]);

  const testGeminiAPI = async (apiKey: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: "Test connection" }]
            }]
          })
        }
      );
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const handleSaveGeminiKey = async () => {
    if (!geminiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Gemini API key",
        variant: "destructive",
      });
      return;
    }

    setStatus({ gemini: 'testing' });

    const isValid = await testGeminiAPI(geminiKey);
    
    if (isValid) {
      localStorage.setItem('gemini_api_key', geminiKey);
      setStatus({ gemini: 'valid' });
      toast({
        title: "Success",
        description: "Gemini API key configured successfully",
      });
    } else {
      setStatus({ gemini: 'invalid' });
      toast({
        title: "Error",
        description: "Invalid Gemini API key or connection failed",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (statusValue: string) => {
    switch (statusValue) {
      case 'testing':
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      case 'valid':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'invalid':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Key className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            API Configuration
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Gemini API Key
                </span>
                {getStatusIcon(status.gemini)}
              </CardTitle>
              <CardDescription>
                Required for AI summarization and analysis. Get your free API key from Google AI Studio.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="gemini-key">API Key</Label>
                <Input
                  id="gemini-key"
                  type="password"
                  placeholder="Enter your Gemini API key..."
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button 
                onClick={handleSaveGeminiKey}
                disabled={status.gemini === 'testing' || !geminiKey.trim()}
                className="w-full"
              >
                {status.gemini === 'testing' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Testing Connection...
                  </>
                ) : (
                  'Save & Test API Key'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-primary-light border-primary">
            <CardContent className="pt-6">
              <div className="text-sm text-primary">
                <p className="font-medium mb-2">📋 Setup Instructions:</p>
                <ol className="list-decimal list-inside space-y-1 text-primary/80">
                  <li>Visit <span className="font-mono">https://makersuite.google.com/app/apikey</span></li>
                  <li>Sign in with your Google account</li>
                  <li>Click "Create API Key" and select a project</li>
                  <li>Copy the generated key and paste it above</li>
                  <li>Click "Save & Test API Key" to verify</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}