import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import { useArtwork } from "./ArtworkContext";

const Journey = () => {
  const { artworks } = useArtwork();

  const [mainArtwork, ...recommended] = artworks;

  return (
    <div className="min-h-screen pb-20">
      {/* 🟦 Hero Section with Full-Screen Spline Background */}
      <div className="relative h-[100vh] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Full-cover Spline */}
        <div className="absolute inset-0 -z-10">
          <div className="w-full h-full">
            <Spline
              scene="https://prod.spline.design/SobTq8Pp8eIvt6bH/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 -z-0" />

        {/* Text content */}
        <div className="relative z-10 max-w-screen-xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white animate-fade-in-up">
            Guiding You Through Every Step of the Story
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in-up">
            Experience a seamless journey as art unfolds, one moment at a time.
          </p>
        </div>
      </div>

      {/* 🏛 Museum-Themed Main Highlight */}
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <Card className="group relative overflow-hidden shadow-2xl rounded-3xl border border-[#d7c8a2]/40 bg-[#f5f0e6] transition-all duration-700">
          <div className="relative">
            <img
              src={mainArtwork.image}
              alt={mainArtwork.title}
              className="w-full h-[500px] object-cover rounded-3xl transform transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = "https://via.placeholder.com/800x500?text=Image+Not+Found";
              }}
            />

            {/* 🕯 Warm spotlight gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c1b0e]/70 via-[#4e3720]/40 to-transparent rounded-3xl transition-opacity duration-500 group-hover:opacity-80" />

            {/* 🏛 Museum Info Section */}
            <div className="absolute bottom-10 left-10 text-[#fef7e3] space-y-3 max-w-md transition-transform duration-700 group-hover:translate-y-[-4px]">
              <div className="flex items-center gap-2 text-[#f2cf77]">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold tracking-wide">
                  {mainArtwork.score 
                    ? `Best Match • ${(mainArtwork.score * 100).toFixed(1)}% similar`
                    : "Exhibit Highlight"
                  }
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                {mainArtwork.title}
              </h2>
              <p className="text-sm md:text-base text-[#f3e9d2] leading-relaxed">
                {mainArtwork.description}
              </p>
              <Link to={`/artwork/${mainArtwork.id}`}>
                <Button className="mt-3 bg-[#c5a25a] hover:bg-[#d4b060] text-black font-semibold shadow-md hover:shadow-lg transition-all">
                  Explore Exhibit <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative museum frame border glow */}
          <div className="absolute inset-0 rounded-3xl ring-2 ring-[#d7c8a2]/50 group-hover:ring-[#e2b76b] transition-all duration-700 pointer-events-none"></div>
        </Card>
      </div>

      {/* 🏛 Recommended Exhibits Section */}
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-[#3e2b12] mb-8 text-center tracking-tight">
          {artworks[0].score ? "Other Matches" : "Recommended Exhibits"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {recommended.map((art, i) => (
            <Card
              key={art.id}
              className="group relative overflow-hidden rounded-3xl bg-[#f5f0e6] border border-[#d7c8a2]/50 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transform hover:scale-[1.03] transition-all duration-500"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* 🖼 Artwork Image */}
              <div className="relative">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-56 object-cover rounded-t-3xl transform group-hover:scale-105 transition-transform duration-700"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                  }}
                />
                
                {/* Similarity Score Badge (if available) */}
                {art.score && (
                  <div className="absolute top-3 right-3 bg-[#2c1b0e]/80 text-[#f2cf77] px-3 py-1 rounded-full text-xs font-bold border border-[#c5a25a]">
                    {(art.score * 100).toFixed(1)}%
                  </div>
                )}
                
                {/* Subtle lighting gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c1b0e]/60 via-transparent to-transparent opacity-0 group-hover:opacity-70 rounded-t-3xl transition-all duration-700"></div>
              </div>

              {/* 🏷 Artwork Info */}
              <div className="p-5 text-center">
                <h4 className="text-xl font-semibold text-[#3e2b12] group-hover:text-[#c5a25a] transition-colors">
                  {art.title}
                </h4>
                <p className="text-sm text-[#6b5b3e] mt-2 italic">
                  {art.shortDesc}
                </p>

                <Link to={`/artwork/${art.id}`}>
                  <Button className="mt-4 bg-[#c5a25a] hover:bg-[#d4b060] text-black font-semibold shadow-md hover:shadow-lg transition-all">
                    View Exhibit <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* 🖼 Golden frame border effect */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-[#d7c8a2]/40 group-hover:ring-[#e2b76b] transition-all duration-500 pointer-events-none"></div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Journey;