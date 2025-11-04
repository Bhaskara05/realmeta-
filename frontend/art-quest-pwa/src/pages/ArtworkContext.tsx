import React, { createContext, useContext, useState, ReactNode } from "react";

interface ArtworkMetadata {
  title?: string;
  artist?: string;
  year?: string;
  category?: string;
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  shortDesc: string;
  image: string;            // Full image URL
  score?: number;
  metadata?: ArtworkMetadata;
  image_url?: string;       // Raw path returned from backend
}

interface ArtworkContextType {
  artworks: Artwork[];
  setArtworks: (artworks: Artwork[]) => void;
  updateArtworksFromSearch: (searchResults: any[]) => void;
}

const ArtworkContext = createContext<ArtworkContextType | undefined>(undefined);

const defaultArtworks: Artwork[] = [
  {
    id: "art_001",
    title: "Starry Night",
    description: "A masterpiece by Van Gogh.",
    shortDesc: "Van Gogh's swirling night sky.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  },
  {
    id: "art_002",
    title: "Mona Lisa",
    description: "The famous portrait by Leonardo da Vinci.",
    shortDesc: "Mysterious smile.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg",
  },
  {
    id: "art_003",
    title: "The Persistence of Memory",
    description: "Surreal clocks by Salvador Dalí.",
    shortDesc: "Melting clocks of time.",
    image: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
  },
  {
    id: "art_004",
    title: "Girl with a Pearl Earring",
    description: "Tronie painting by Vermeer.",
    shortDesc: "The Dutch Mona Lisa.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg",
  },
  {
    id: "art_005",
    title: "The Scream",
    description: "Iconic expressionist work by Munch.",
    shortDesc: "The cry of nature.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg",
  },
];

export const ArtworkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [artworks, setArtworks] = useState<Artwork[]>(defaultArtworks);

  const updateArtworksFromSearch = (searchResults: any[]) => {
    const transformedArtworks: Artwork[] = searchResults.map((result, index) => {
      const fullImageUrl = result.image_url?.startsWith("http")
        ? result.image_url
        : `http://localhost:8000${result.image_url}`;

      return {
        id: result.id || `search_${index}`,
        title: result.metadata?.title || "Untitled Artwork",
        description:
          result.metadata?.artist
            ? `${result.metadata.artist}${result.metadata.year ? ` (${result.metadata.year})` : ""}`
            : "Artist unknown",
        shortDesc: result.metadata?.category || "Scanned & identified artwork",
        image: fullImageUrl,
        score: result.score,
        metadata: result.metadata,
        image_url: result.image_url,
      };
    });

    // ✅ Replace artworks list with searched items
    setArtworks(transformedArtworks);
  };

  return (
    <ArtworkContext.Provider value={{ artworks, setArtworks, updateArtworksFromSearch }}>
      {children}
    </ArtworkContext.Provider>
  );
};

export const useArtwork = () => {
  const context = useContext(ArtworkContext);
  if (!context) {
    throw new Error("useArtwork must be used within an ArtworkProvider");
  }
  return context;
};
