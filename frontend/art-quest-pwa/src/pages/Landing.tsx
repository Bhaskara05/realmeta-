import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Sparkles, Headphones, Map } from "lucide-react";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
     <section className="relative overflow-hidden">
  {/* Spline Interactive Model */}
  <div className="absolute inset-0">
    <Spline
      scene="https://prod.spline.design/e3qBvCAtbgCSYfvz/scene.splinecode"
      className="absolute inset-0 w-full h-full object-cover scale-[1.3]"
    />
  </div>

  {/* Hero Content — clean text, no blur */}
  <div className="relative z-10 flex flex-col items-center justify-center max-w-screen-xl mx-auto px-4 py-24 md:py-36 text-center space-y-6">
    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)]">
      Explore Art Like
      <span className="block text-black">Never Before</span>
    </h1>

    <p className="text-lg md:text-xl text-gray-900 font-medium max-w-2xl mx-auto drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
      Scan artworks, discover hidden stories, and experience intelligent museum journeys — powered by AI.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
      <Link to="/scan">
        <Button
          size="lg"
          className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:opacity-90 shadow-lg"
        >
          <Camera className="mr-2 h-5 w-5" />
          Start Exploring
        </Button>
      </Link>
      <Link to="/journey">
        <Button
          size="lg"
          variant="outline"
          className="w-full sm:w-auto border-gray-400 text-gray-800 hover:bg-gray-100 transition-all"
        >
          <Map className="mr-2 h-5 w-5" />
          View Journeys
        </Button>
      </Link>
    </div>
  </div>
</section>



      {/* Features Section */}
      <section className="py-24 px-4 bg-[#fafafa]">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              A Smarter Way to Explore Museums
            </h2>
            <p className="text-gray-600 text-lg">
              Unlock the stories behind every artwork — effortlessly and beautifully
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Camera className="h-6 w-6 text-indigo-500" />,
                title: "Instant Scanning",
                desc: "Point your camera and get detailed insights about any artwork — instantly.",
              },
              {
                icon: <Sparkles className="h-6 w-6 text-pink-500" />,
                title: "AI-Powered Stories",
                desc: "Discover hidden meanings, artist backgrounds, and historical context.",
              },
              {
                icon: <Headphones className="h-6 w-6 text-purple-500" />,
                title: "Immersive Audio",
                desc: "Listen to captivating narrations that bring every masterpiece to life.",
              },
              {
                icon: <Map className="h-6 w-6 text-blue-500" />,
                title: "Smart Museum Routes",
                desc: "Personalized tours designed to match your mood and interest.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white text-center">
        <div className="max-w-screen-xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Ready to Transform Your Museum Visit?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of art enthusiasts discovering museums in a whole new way.
          </p>
          <Link to="/scan">
            <Button
              size="lg"
              className="shadow-lg bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 text-white"
            >
              <Camera className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
