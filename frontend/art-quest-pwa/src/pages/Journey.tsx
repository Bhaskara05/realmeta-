import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, TrendingUp } from "lucide-react";
import { mockJourneyRoutes, mockArtworks } from "@/lib/mockData";
import { Link } from "react-router-dom";

const Journey = () => {
  return (
    <div className="min-h-screen pb-20">
      <div className="gradient-hero text-primary-foreground py-12 px-4">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in-up">
            Smart Journey Guide
          </h1>
          <p className="text-primary-foreground/90 text-lg animate-fade-in-up">
            Discover personalized routes through the museum
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-8">
        {/* Next Stop Suggestion */}
        <Card className="glass-card p-6 shadow-elegant animate-scale-in">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-accent">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">Next Stop</span>
              </div>
              <h3 className="text-xl font-bold">Starry Night</h3>
              <p className="text-muted-foreground">
                Just 2 minutes from your location • Gallery A
              </p>
            </div>
            <Link to="/artwork/art_001">
              <Button size="sm" className="shadow-glow">
                Go
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Journey Routes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Curated Journeys</h2>
          <div className="grid gap-4">
            {mockJourneyRoutes.map((route, index) => (
              <Card
                key={route.id}
                className="glass-card p-6 hover:shadow-elegant transition-smooth animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{route.title}</h3>
                    <p className="text-muted-foreground">{route.description}</p>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{route.estimatedTime} min</span>
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {route.difficulty}
                    </span>
                    <span className="text-xs">{route.artworkIds.length} artworks</span>
                  </div>

                  {/* Preview Images */}
                  <div className="flex gap-2">
                    {route.artworkIds.slice(0, 3).map(artId => {
                      const artwork = mockArtworks.find(a => a.id === artId);
                      return artwork ? (
                        <img
                          key={artId}
                          src={artwork.images[0]}
                          alt={artwork.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      ) : null;
                    })}
                  </div>

                  <Button className="w-full">
                    Start Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
