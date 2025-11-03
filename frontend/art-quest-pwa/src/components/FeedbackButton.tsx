import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, X, Star, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const quickTags = ["Easy to Use", "Loved Stories", "Great Audio", "Need More Info"];

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Please rate your experience",
        description: "Select at least one star",
        variant: "destructive"
      });
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setRating(0);
      setSelectedTags([]);
      setComment("");
      toast({
        title: "Thank you for your feedback!",
        description: "Your input helps us improve the museum experience.",
      });
    }, 2000);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-40 h-14 w-14 rounded-full shadow-elegant animate-pulse-glow"
        size="icon"
      >
        <MessageSquare className="h-5 w-5" />
      </Button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
          <Card className="glass-card w-full max-w-md p-6 space-y-4 animate-scale-in">
            {submitted ? (
              <div className="py-8 flex flex-col items-center gap-4 text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    We appreciate your feedback and will use it to enhance your museum experience.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Share Your Feedback</h3>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Star Rating */}
                <div>
                  <p className="text-sm mb-2">Rate your experience</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= rating
                              ? "fill-accent text-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Tags */}
                <div>
                  <p className="text-sm mb-2">Quick tags</p>
                  <div className="flex flex-wrap gap-2">
                    {quickTags.map((tag) => (
                      <Button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        size="sm"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <p className="text-sm mb-2">Additional comments (optional)</p>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us more about your experience..."
                    rows={4}
                  />
                </div>

                {/* Submit */}
                <Button onClick={handleSubmit} className="w-full" size="lg">
                  Submit Feedback
                </Button>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;
