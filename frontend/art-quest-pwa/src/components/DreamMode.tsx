import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Sparkles, Share2, Loader2 } from "lucide-react";
import { dreamModeStyles } from "@/lib/mockData";

interface DreamModeProps {
  artwork: {
    title: string;
    artist: string;
    images: string[];
  };
  onClose: () => void;
}

const DreamMode = ({ artwork, onClose }: DreamModeProps) => {
  const [selectedStyle, setSelectedStyle] = useState(dreamModeStyles[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerateDream = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedImage(artwork.images[0]); // In real app, this would be AI-generated
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg overflow-auto">
      {/* Glow Effects */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      
      <div className="max-w-6xl mx-auto p-4 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold">Dream Mode</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid md:grid-cols-2 gap-6 mb-6">
          {/* Original */}
          <Card className="glass-card p-4 space-y-3">
            <h3 className="font-semibold text-muted-foreground text-sm">Original</h3>
            <img
              src={artwork.images[0]}
              alt={artwork.title}
              className="w-full aspect-square object-cover rounded-lg shadow-elegant"
            />
            <div>
              <p className="font-bold">{artwork.title}</p>
              <p className="text-sm text-muted-foreground">{artwork.artist}</p>
            </div>
          </Card>

          {/* Reimagined */}
          <Card className="glass-card p-4 space-y-3 glow-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-accent text-sm">Reimagined - {selectedStyle.label}</h3>
              {generatedImage && (
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              )}
            </div>
            
            <div className="w-full aspect-square rounded-lg bg-muted/50 flex items-center justify-center relative overflow-hidden">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-accent" />
                  <p className="text-sm text-muted-foreground animate-pulse">Dreaming...</p>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Reimagined"
                  className="w-full h-full object-cover animate-fade-in-up"
                  style={{ filter: "hue-rotate(45deg) saturate(1.3)" }}
                />
              ) : (
                <p className="text-muted-foreground text-sm">Select a style and generate</p>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">{selectedStyle.description}</p>
          </Card>
        </div>

        {/* Style Selector */}
        <div className="space-y-3">
          <h3 className="font-semibold">Choose a Style</h3>
          <div className="flex flex-wrap gap-3">
            {dreamModeStyles.map((style) => (
              <Button
                key={style.id}
                onClick={() => {
                  setSelectedStyle(style);
                  setGeneratedImage(null);
                }}
                variant={selectedStyle.id === style.id ? "default" : "outline"}
                className="gap-2"
              >
                {style.label}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleGenerateDream}
            disabled={isGenerating}
            className="w-full md:w-auto gap-2"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Dream
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DreamMode;
