import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { mockArtworks } from "@/lib/mockData";
import { Link } from "react-router-dom";

const MuseumMap = () => {
  return (
    <div className="min-h-screen pb-20">
      <div className="gradient-hero text-primary-foreground py-12 px-4">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in-up">
            Museum Map
          </h1>
          <p className="text-primary-foreground/90 text-lg animate-fade-in-up">
            Navigate through galleries and find artworks
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-6">
        {/* Interactive Map */}
        <Card className="glass-card p-6 shadow-elegant animate-scale-in">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center space-y-3">
              <MapPin className="h-12 w-12 mx-auto text-primary" />
              <p className="text-muted-foreground">
                Interactive museum map coming soon
              </p>
              <p className="text-sm text-muted-foreground max-w-md">
                This feature will show real-time location, gallery layouts, and optimized routes
              </p>
            </div>
          </div>
        </Card>

        {/* Artwork Locations */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Artwork Locations</h2>
          <div className="space-y-3">
            {mockArtworks.map((artwork, index) => (
              <Card
                key={artwork.id}
                className="glass-card p-4 hover:shadow-elegant transition-smooth animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={artwork.images[0]}
                    alt={artwork.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">{artwork.title}</h3>
                    <p className="text-sm text-muted-foreground">{artwork.artist}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-primary">
                      <MapPin className="h-3 w-3" />
                      <span>{artwork.location}</span>
                    </div>
                  </div>
                  <Link to={`/artwork/${artwork.id}`}>
                    <Button size="sm" variant="outline">
                      <Navigation className="h-4 w-4 mr-2" />
                      Navigate
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuseumMap;
