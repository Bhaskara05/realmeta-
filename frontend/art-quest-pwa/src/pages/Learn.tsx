import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, GraduationCap, BookOpen } from "lucide-react";
import { mockQuizzes, mockArtworks } from "@/lib/mockData";

export default function Learn() {
  const [mode, setMode] = useState<"school" | "college">("school");
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const filteredQuizzes = mockQuizzes.filter((q) => q.mode === mode);
  const currentQuiz = filteredQuizzes[currentQuizIndex];
  const artwork = mockArtworks.find((a) => a.id === currentQuiz?.artworkId);
  const progress = ((currentQuizIndex + 1) / filteredQuizzes.length) * 100;

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === currentQuiz.correctAnswer) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentQuizIndex < filteredQuizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleModeChange = (newMode: "school" | "college") => {
    setMode(newMode);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (!currentQuiz || !artwork)
    return <div className="text-center py-20 text-gray-700">No quizzes available</div>;

  return (
    <div className="relative min-h-screen overflow-hidden font-inter">
      {/* 🌅 Background with Glow */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#fef6e4] via-[#f9e9d2] to-[#f3d7b6]" />
      <div className="absolute inset-0 -z-10 bg-[url('/museum-pattern.svg')] opacity-10 mix-blend-overlay" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 relative z-10"
      >
        <h1 className="text-5xl md:text-6xl font-playfair font-bold bg-gradient-to-r from-[#c19761] via-[#d6b679] to-[#fff3d2] bg-clip-text text-transparent drop-shadow-md">
          Learn Through Art
        </h1>
        <p className="text-[#5c4a2a] text-lg mt-4 max-w-2xl mx-auto">
          Discover the joy of learning through stories hidden in artworks.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 pb-24">
        {/* Tabs */}
        <Tabs value={mode} onValueChange={(v) => handleModeChange(v as "school" | "college")} className="mb-10">
          <TabsList className="grid grid-cols-2 bg-[#fff7e0]/70 rounded-full p-1 backdrop-blur-md shadow-inner">
            <TabsTrigger
              value="school"
              className="gap-2 rounded-full text-[#6a532f] data-[state=active]:bg-[#f6cf89] data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4" /> School Mode
            </TabsTrigger>
            <TabsTrigger
              value="college"
              className="gap-2 rounded-full text-[#6a532f] data-[state=active]:bg-[#e3b76b] data-[state=active]:text-white"
            >
              <GraduationCap className="h-4 w-4" /> College Mode
            </TabsTrigger>
          </TabsList>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-[#6a532f]">
              <span>
                Question {currentQuizIndex + 1} / {filteredQuizzes.length}
              </span>
              <span className="flex items-center gap-2 font-semibold">
                <Trophy className="h-4 w-4 text-yellow-600" /> {score}/{filteredQuizzes.length}
              </span>
            </div>
            <Progress value={progress} className="h-2 bg-[#f5e3c0]" />
          </div>

          {/* Artwork Display */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <Card className="p-4 bg-[#fff9ec]/80 border border-[#ead8b4] shadow-lg rounded-2xl backdrop-blur-sm">
              <div className="flex gap-4 items-center">
                <img
                  src={artwork.images[0]}
                  alt={artwork.title}
                  className="w-24 h-24 rounded-xl object-cover border border-[#e0c489] shadow-sm"
                />
                <div>
                  <h3 className="font-semibold text-[#5e4828] text-lg">{artwork.title}</h3>
                  <p className="text-sm text-[#8d7a56]">{artwork.artist}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quiz */}
          <motion.div
            className="space-y-4 bg-[#fffaf2]/80 p-6 rounded-2xl shadow-lg border border-[#e9d7af]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-semibold text-[#4e3b20]">{currentQuiz.question}</h2>

            <div className="space-y-3">
              {currentQuiz.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  variant="outline"
                  className={`w-full justify-start text-left py-4 rounded-xl border-2 transition-all text-[#5a4423] ${
                    selectedAnswer === index && showResult
                      ? index === currentQuiz.correctAnswer
                        ? "bg-green-100 border-green-500"
                        : "bg-red-100 border-red-500"
                      : "hover:bg-[#fff0da]"
                  }`}
                >
                  <span className="font-semibold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </Button>
              ))}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 pt-4 border-t border-[#e5d4b1]"
              >
                <p
                  className={`font-semibold mb-2 ${
                    selectedAnswer === currentQuiz.correctAnswer
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {selectedAnswer === currentQuiz.correctAnswer
                    ? "Correct! 🎉"
                    : "Not quite right, try again! 💡"}
                </p>
                <p className="text-sm text-[#6b5b3a]">{currentQuiz.explanation}</p>

                <Button
                  onClick={handleNext}
                  className="w-full mt-4 bg-gradient-to-r from-[#f6cf89] to-[#e3b76b] hover:from-[#eac478] hover:to-[#d3a85f] text-white rounded-full py-3 text-lg shadow-md"
                >
                  {currentQuizIndex < filteredQuizzes.length - 1 ? "Next Question ➡️" : "Finish Quiz 🎯"}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
}
