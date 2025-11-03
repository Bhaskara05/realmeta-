import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Sparkles, Headphones, Map } from "lucide-react";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#f8f4ef] text-[#3a2a16] overflow-x-hidden">
      {/* 🌌 Hero Section */}
      <section className="relative overflow-hidden">
        {/* 3D Art Effect */}
        <div className="absolute inset-0">
          <Spline
            scene="https://prod.spline.design/e3qBvCAtbgCSYfvz/scene.splinecode"
            className="absolute inset-0 w-full h-full object-cover scale-[1.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f8f4ef]/30 via-transparent to-[#f8f4ef]" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-screen-xl mx-auto px-4 py-24 md:py-40 text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-[#3a2a16] drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]"
          >
            Explore Art Like
            <span className="block text-[#a3742d]">Never Before</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl text-[#5c4a2f] font-medium max-w-2xl mx-auto"
          >
            Scan artworks, discover hidden stories, and experience intelligent museum journeys — powered by AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
          >
            <Link to="/scan">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-[#c49b5f] via-[#b88a48] to-[#a3742d]
                           text-white font-semibold hover:opacity-90 hover:scale-[1.05]
                           shadow-lg shadow-[#c49b5f]/30 transition-all duration-300 rounded-xl"
              >
                <Camera className="mr-2 h-5 w-5" />
                Start Exploring
              </Button>
            </Link>
            <Link to="/journey">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-[#bca47a] text-[#3a2a16]
                           hover:bg-[#f2e7d3] hover:border-[#a3742d]
                           font-medium transition-all duration-300 rounded-xl"
              >
                <Map className="mr-2 h-5 w-5" />
                View Journeys
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 🖼️ Feature Section */}
      <section className="py-24 px-4 bg-[#f9f5ef]">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3a2a16]">
              A Smarter Way to Explore Museums
            </h2>
            <p className="text-[#6b5c43] text-lg">
              Unlock the stories behind every artwork — effortlessly and beautifully
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Camera className="h-6 w-6 text-[#a9742a]" />,
                title: "Instant Scanning",
                desc: "Point your camera and get detailed insights about any artwork — instantly.",
              },
              {
                icon: <Sparkles className="h-6 w-6 text-[#b65f3a]" />,
                title: "AI-Powered Stories",
                desc: "Discover hidden meanings, artist backgrounds, and historical context.",
              },
              {
                icon: <Headphones className="h-6 w-6 text-[#8b6b3e]" />,
                title: "Immersive Audio",
                desc: "Listen to captivating narrations that bring every masterpiece to life.",
              },
              {
                icon: <Map className="h-6 w-6 text-[#7b3f00]" />,
                title: "Smart Museum Routes",
                desc: "Personalized tours designed to match your mood and interest.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card
                  className="p-6 rounded-2xl border border-[#d9c8a9]
                             bg-gradient-to-br from-[#f9f5ef] via-[#f5efe6] to-[#f1e8da]
                             shadow-[0_4px_20px_rgba(200,175,120,0.15)]
                             hover:shadow-[0_8px_25px_rgba(180,140,90,0.25)]
                             transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-full bg-[#f1e9dd] flex items-center justify-center mb-4 shadow-inner">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#3a2a16] mb-2">{item.title}</h3>
                  <p className="text-[#6b5c43]">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🕯️ CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="py-20 px-4 bg-[#fffdf8] text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(190,150,90,0.08),transparent_70%)]" />
        <div className="relative z-10 max-w-screen-xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3a2a16]">
            Ready to Transform Your Museum Visit?
          </h2>
          <p className="text-[#6b5c43] text-lg max-w-2xl mx-auto">
            Join thousands of art enthusiasts discovering museums in a whole new way.
          </p>
          <Link to="/scan">
            <Button
              size="lg"
              className="shadow-lg bg-gradient-to-r from-[#c49b5f] via-[#b88a48] to-[#a3742d]
                         hover:opacity-90 text-white font-semibold hover:scale-[1.05]
                         transition-all duration-300 rounded-xl"
            >
              <Camera className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Landing;
