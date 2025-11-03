import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, CheckCircle, XCircle, GraduationCap, BookOpen } from "lucide-react";
import { mockQuizzes, mockArtworks, type Quiz } from "@/lib/mockData";

const Learn = () => {
  const [mode, setMode] = useState<"school" | "college">("school");
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const filteredQuizzes = mockQuizzes.filter(q => q.mode === mode);
  const currentQuiz = filteredQuizzes[currentQuizIndex];
  const artwork = mockArtworks.find(a => a.id === currentQuiz?.artworkId);
  const progress = ((currentQuizIndex + 1) / filteredQuizzes.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === currentQuiz.correctAnswer) {
      setScore(score + 1);
    }
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

  if (!currentQuiz || !artwork) {
    return <div>No quizzes available</div>;
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Background Effects */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      
      <div className="gradient-hero text-primary-foreground py-12 px-4">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in-up">
            Interactive Learning
          </h1>
          <p className="text-primary-foreground/90 text-lg animate-fade-in-up">
            Test your knowledge and discover fascinating details
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Mode Selector */}
        <Tabs value={mode} onValueChange={(v) => handleModeChange(v as "school" | "college")} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="school" className="gap-2">
              <BookOpen className="h-4 w-4" />
              School Mode (Ages 8-15)
            </TabsTrigger>
            <TabsTrigger value="college" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              College Mode (Ages 16+)
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Progress */}
        <div className="mb-8 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuizIndex + 1} of {filteredQuizzes.length}</span>
            <span className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-accent" />
              Score: {score}/{filteredQuizzes.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Artwork Reference */}
        <Card className="glass-card p-4 mb-6 animate-scale-in">
          <div className="flex gap-4">
            <img
              src={artwork.images[0]}
              alt={artwork.title}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold">{artwork.title}</h3>
              <p className="text-sm text-muted-foreground">{artwork.artist}</p>
            </div>
          </div>
        </Card>

        {/* Quiz Card */}
        <Card className={`glass-card p-6 space-y-6 shadow-elegant animate-fade-in-up ${
          mode === "school" ? "glow-border" : ""
        }`}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex-1">{currentQuiz.question}</h2>
            <span className={`text-xs px-3 py-1 rounded-full ${
              currentQuiz.difficulty === "easy"
                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                : currentQuiz.difficulty === "medium"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
            }`}>
              {currentQuiz.difficulty}
            </span>
          </div>

          <div className="space-y-3">
            {currentQuiz.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuiz.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <Button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  variant={showCorrect ? "default" : showWrong ? "destructive" : "outline"}
                  className={`w-full justify-start h-auto py-4 text-left ${
                    showCorrect ? "bg-green-600 hover:bg-green-700" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="h-8 w-8 rounded-full border-2 flex items-center justify-center flex-shrink-0">
                      {showCorrect && <CheckCircle className="h-5 w-5" />}
                      {showWrong && <XCircle className="h-5 w-5" />}
                      {!showResult && <span>{String.fromCharCode(65 + index)}</span>}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </Button>
              );
            })}
          </div>

          {showResult && (
            <div className="space-y-4 pt-4 border-t animate-fade-in-up">
              <div className={`p-4 rounded-lg ${
                selectedAnswer === currentQuiz.correctAnswer
                  ? "bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-100"
                  : "bg-red-100 text-red-900 dark:bg-red-900/20 dark:text-red-100"
              }`}>
                <p className="font-semibold mb-2">
                  {selectedAnswer === currentQuiz.correctAnswer ? "Correct!" : "Not quite right"}
                </p>
                <p className="text-sm">{currentQuiz.explanation}</p>
              </div>

              <Button onClick={handleNext} className="w-full" size="lg">
                {currentQuizIndex < filteredQuizzes.length - 1 ? "Next Question" : "Finish Quiz"}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Learn;
