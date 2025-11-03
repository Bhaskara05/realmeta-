export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  story: string;
  audioUrl?: string;
  images: string[];
  insights: string[];
  location: string;
  tags: string[];
}

export interface JourneyRoute {
  id: string;
  title: string;
  description: string;
  artworkIds: string[];
  estimatedTime: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  theme: string;
}

export interface Quiz {
  id: string;
  artworkId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  mode: "school" | "college";
}

export interface FeedbackEntry {
  id: string;
  rating: number;
  tags: string[];
  comment: string;
  artworkId?: string;
  timestamp: string;
  anonymous: boolean;
}

export interface AnalyticsData {
  totalVisitors: number;
  totalScans: number;
  avgTimeSpent: string;
  activeUsersNow: number;
  topArtworks: {
    id: string;
    title: string;
    scans: number;
    avgTime: string;
  }[];
  feedbackStats: {
    avgRating: number;
    totalFeedback: number;
    sentiment: string;
  };
}

export const dreamModeStyles = [
  { id: "futuristic", label: "Futuristic", description: "Neon lights and cyberpunk aesthetics" },
  { id: "abstract", label: "Abstract", description: "Pure shapes and colors" },
  { id: "cubism", label: "Cubism", description: "Geometric fragmentation" },
  { id: "surrealism", label: "Surrealism", description: "Dreamlike and fantastical" },
  { id: "pop-art", label: "Pop Art", description: "Bold colors and graphic style" },
  { id: "spring", label: "Spring", description: "Blooming flowers and fresh colors" },
  { id: "winter", label: "Winter", description: "Snowy and crystalline" },
];

export const mockArtworks: Artwork[] = [
  {
    id: "art_001",
    title: "Starry Night",
    artist: "Vincent van Gogh",
    year: 1889,
    medium: "Oil on canvas",
    story: "Created during van Gogh's stay at the Saint-Paul-de-Mausole asylum in Saint-Rémy-de-Provence, France, this masterpiece depicts the view from his east-facing window just before sunrise. The swirling night sky, dominated by a bright crescent moon and brilliant stars, captures the artist's unique perception of the cosmos. Van Gogh painted this from memory during the day, as he wasn't allowed to work in his room at night. The cypress tree in the foreground reaches toward the sky like a dark flame, creating a dramatic vertical contrast with the horizontal village below. This painting represents van Gogh's emotional and spiritual connection to nature.",
    audioUrl: "/audio/starry-night.mp3",
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
      "https://images.unsplash.com/photo-1578926288207-a90a5366759d",
      "https://images.unsplash.com/photo-1577083552792-a0d461cb1dd6"
    ],
    insights: [
      "Van Gogh created this masterpiece while in an asylum, finding solace in the night sky",
      "The painting features 11 stars, though the real sky would have shown more",
      "Despite its fame today, van Gogh only sold one painting during his lifetime",
      "The cypress tree was a recurring motif in his work, symbolizing death and eternal life"
    ],
    location: "Gallery A, Wall 3",
    tags: ["post-impressionism", "night", "landscape", "dutch"]
  },
  {
    id: "art_002",
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    year: 1931,
    medium: "Oil on canvas",
    story: "This surrealist masterpiece features melting pocket watches in a dreamlike landscape. Dalí was inspired by Camembert cheese melting in the sun, which led him to explore the concept of 'soft' time. The painting challenges our perception of time as something fixed and rigid. The barren landscape represents Catalonia, his homeland, while the strange creature in the center is thought to be a self-portrait. Created during the height of the Surrealist movement, this work explores themes of mortality, decay, and the fluidity of time in our dreams and memories.",
    images: [
      "https://images.unsplash.com/photo-1577083552477-f26506815e14",
      "https://images.unsplash.com/photo-1577083552820-b4fe9b2ce91d"
    ],
    insights: [
      "Dalí completed this iconic painting in just a few hours",
      "The ants symbolize decay and the passage of time",
      "The strange creature is believed to be Dalí's self-portrait without a skeleton",
      "Inspired by Einstein's theory of relativity and time's relativity"
    ],
    location: "Gallery B, Wall 1",
    tags: ["surrealism", "time", "spanish", "dreamlike"]
  },
  {
    id: "art_003",
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    year: 1665,
    medium: "Oil on canvas",
    story: "Often called the 'Mona Lisa of the North,' this captivating portrait showcases Vermeer's mastery of light and color. The subject's enigmatic expression and direct gaze have fascinated viewers for centuries. The painting is a 'tronie' - a Dutch Golden Age style focusing on facial expression rather than identity. The luminous pearl earring creates a focal point, while the dark background emphasizes the girl's face. Vermeer's technique of using camera obscura helped him achieve the painting's remarkable realism. The identity of the model remains a mystery, adding to the painting's allure.",
    images: [
      "https://images.unsplash.com/photo-1577083552921-19b22b30b5ff",
      "https://images.unsplash.com/photo-1577083552962-17c813dc81c3"
    ],
    insights: [
      "The pearl is likely not real but made of glass and white lead",
      "Vermeer may have used a camera obscura to achieve the photographic quality",
      "The painting's blue turban uses ultramarine, one of the most expensive pigments",
      "The subject's identity has never been confirmed"
    ],
    location: "Gallery C, Wall 2",
    tags: ["dutch-golden-age", "portrait", "baroque", "realism"]
  }
];

export const mockJourneyRoutes: JourneyRoute[] = [
  {
    id: "route_001",
    title: "Renaissance Masters",
    description: "Journey through the golden age of art, from da Vinci to Michelangelo",
    artworkIds: ["art_001", "art_002", "art_003"],
    estimatedTime: 45,
    difficulty: "beginner",
    theme: "Historical movements"
  },
  {
    id: "route_002",
    title: "Modern Abstract",
    description: "Explore the revolutionary world of abstract expressionism",
    artworkIds: ["art_002"],
    estimatedTime: 30,
    difficulty: "intermediate",
    theme: "20th century"
  },
  {
    id: "route_003",
    title: "Portraits Through Time",
    description: "Discover how artists captured the human face across centuries",
    artworkIds: ["art_003"],
    estimatedTime: 40,
    difficulty: "beginner",
    theme: "Portrait art"
  }
];

export const mockQuizzes: Quiz[] = [
  {
    id: "quiz_001",
    artworkId: "art_001",
    question: "What technique is featured in Starry Night?",
    options: [
      "Pointillism",
      "Bold brushstrokes",
      "Watercolor",
      "Photorealism"
    ],
    correctAnswer: 1,
    explanation: "Van Gogh used thick impasto brushstrokes to create the swirling, textured sky.",
    difficulty: "easy",
    mode: "school"
  },
  {
    id: "quiz_002",
    artworkId: "art_002",
    question: "What makes melting clocks unique in Dalí's work?",
    options: [
      "Paint color",
      "Soft time concept",
      "Canvas texture",
      "Frame design"
    ],
    correctAnswer: 1,
    explanation: "Dalí's melting clocks represent the fluidity of time in dreams, inspired by melting cheese.",
    difficulty: "medium",
    mode: "school"
  },
  {
    id: "quiz_003",
    artworkId: "art_003",
    question: "What philosophical concept does Girl with a Pearl Earring represent?",
    options: [
      "Nihilism",
      "Beauty in mystery",
      "Optimism",
      "Rationalism"
    ],
    correctAnswer: 1,
    explanation: "Vermeer's work embodies the beauty of enigmatic expression and the timeless mystery of identity.",
    difficulty: "hard",
    mode: "college"
  },
  {
    id: "quiz_004",
    artworkId: "art_001",
    question: "In which art movement is Starry Night classified?",
    options: [
      "Impressionism",
      "Post-Impressionism",
      "Cubism",
      "Surrealism"
    ],
    correctAnswer: 1,
    explanation: "Post-Impressionism emphasized symbolic content and formal order, moving beyond Impressionism's optical effects.",
    difficulty: "medium",
    mode: "college"
  }
];

export const mockFeedback: FeedbackEntry[] = [
  {
    id: "fb_001",
    rating: 5,
    tags: ["Loved Stories", "Great Audio"],
    comment: "Amazing experience! The audio narration brought the artworks to life.",
    artworkId: "art_001",
    timestamp: "2025-11-03T10:30:00Z",
    anonymous: true
  },
  {
    id: "fb_002",
    rating: 4,
    tags: ["Easy to Use", "Loved Stories"],
    comment: "Very intuitive interface. My kids loved the quiz feature!",
    timestamp: "2025-11-03T11:15:00Z",
    anonymous: true
  }
];

export const mockAnalytics: AnalyticsData = {
  totalVisitors: 1250,
  totalScans: 3420,
  avgTimeSpent: "18m 32s",
  activeUsersNow: 47,
  topArtworks: [
    { id: "art_001", title: "Starry Night", scans: 450, avgTime: "5m 20s" },
    { id: "art_002", title: "Persistence of Memory", scans: 380, avgTime: "4m 15s" },
    { id: "art_003", title: "Girl with Pearl Earring", scans: 290, avgTime: "3m 45s" }
  ],
  feedbackStats: {
    avgRating: 4.7,
    totalFeedback: 342,
    sentiment: "positive"
  }
};
