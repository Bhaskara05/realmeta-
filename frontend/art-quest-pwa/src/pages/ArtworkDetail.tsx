import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, ChevronLeft, BookOpen, Headphones, Images, Lightbulb, Sparkles, Globe } from "lucide-react";
import { mockArtworks } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import DreamMode from "@/components/DreamMode";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "zh", name: "Mandarin" },
  { code: "ar", name: "Arabic" },
];

const ArtworkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const artwork = mockArtworks.find(a => a.id === id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDreamMode, setIsDreamMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  if (isDreamMode) {
    return <DreamMode artwork={artwork} onClose={() => setIsDreamMode(false)} />;
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={artwork.images[0]}
          alt={artwork.title}
          className="w-full h-full object-cover"
        />
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          size="icon"
          className="absolute top-4 left-4 glass-card"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-4 -mt-8">
        <Card className="glass-card p-6 space-y-4 animate-fade-in-up">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{artwork.title}</h1>
                <p className="text-muted-foreground text-lg">
                  {artwork.artist} • {artwork.year}
                </p>
                <p className="text-sm text-muted-foreground">{artwork.medium}</p>
              </div>
              <Button
                onClick={() => setIsDreamMode(true)}
                className="gap-2 glow-border"
                size="lg"
              >
                <Sparkles className="h-4 w-4" />
                Dream Mode
              </Button>
            </div>
          </div>

          <Tabs defaultValue="story" className="w-full pt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="story" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Story
              </TabsTrigger>
              <TabsTrigger value="audio" className="gap-2">
                <Headphones className="h-4 w-4" />
                Audio
              </TabsTrigger>
              <TabsTrigger value="gallery" className="gap-2">
                <Images className="h-4 w-4" />
                Gallery
              </TabsTrigger>
              <TabsTrigger value="insights" className="gap-2">
                <Lightbulb className="h-4 w-4" />
                Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="story" className="space-y-4 pt-4">
              <p className="text-foreground leading-relaxed">{artwork.story}</p>
              <div className="flex flex-wrap gap-2">
                {artwork.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="audio" className="space-y-4 pt-4">
              <Card className="p-6 space-y-4 bg-muted/50">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-semibold">Audio Narration</p>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-40 gap-2">
                      <Globe className="h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-16 w-16 rounded-full"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6 ml-1" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <div className="h-12 bg-primary/10 rounded-lg flex items-center px-3">
                      <div className="flex gap-1 items-end h-8 w-full">
                        {Array.from({ length: 50 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-primary rounded-sm transition-all"
                            style={{
                              height: `${20 + Math.random() * 80}%`,
                              opacity: isPlaying ? 1 : 0.3,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Listen to an expert curator explain the artwork's significance in {languages.find(l => l.code === selectedLanguage)?.name}
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                {artwork.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${artwork.title} detail ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg shadow-elegant"
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-3 pt-4">
              {artwork.insights.map((insight, index) => (
                <Card key={index} className="p-4 bg-muted/50 hover:bg-muted transition-smooth">
                  <p className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-0.5">•</span>
                    <span>{insight}</span>
                  </p>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ArtworkDetail;
