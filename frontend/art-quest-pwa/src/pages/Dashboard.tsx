import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Scan,
  Clock,
  Activity,
  TrendingUp,
  Star,
  MessageSquare,
} from "lucide-react";
import { mockAnalytics } from "@/lib/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  const chartData = mockAnalytics.topArtworks.map((artwork) => ({
    name: artwork.title.split(" ").slice(0, 2).join(" "),
    scans: artwork.scans,
  }));

  const timeData = [
    { hour: "9AM", visitors: 45 },
    { hour: "10AM", visitors: 78 },
    { hour: "11AM", visitors: 120 },
    { hour: "12PM", visitors: 95 },
    { hour: "1PM", visitors: 110 },
    { hour: "2PM", visitors: 140 },
    { hour: "3PM", visitors: 98 },
    { hour: "4PM", visitors: 65 },
  ];

  return (
    <div className="min-h-screen pb-20 bg-[#faf8f3] relative overflow-hidden">
      {/* ✨ Soft Ambient Background (Museum Glow) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5e8d0] via-[#faf8f3] to-[#f9f6ef] opacity-90"></div>
      <div className="absolute top-32 -left-20 w-96 h-96 bg-[#cbb67b33] rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#d2c3a266] rounded-full blur-3xl"></div>

      {/* 🏛️ Header */}
      <div className="relative z-10 py-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-[#4a3b24] tracking-tight mb-3">
          Museum Insights Dashboard
        </h1>
        <p className="text-[#6b5435] text-lg font-light">
          Discover engagement patterns and visitor experiences
        </p>
      </div>

      {/* 📊 Main Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-10">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="p-6 bg-white/80 backdrop-blur-md border border-[#e8dec5] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] transition-all rounded-2xl">
            <div className="flex items-center justify-between">
              <Users className="h-5 w-5 text-[#7a5c2e]" />
              <span className="text-xs text-green-700 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12%
              </span>
            </div>
            <p className="text-3xl font-bold text-[#4a3b24]">
              {mockAnalytics.totalVisitors.toLocaleString()}
            </p>
            <p className="text-sm text-[#7a6b52]">Total Visitors</p>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-md border border-[#e8dec5] shadow-md hover:shadow-lg transition-all rounded-2xl">
            <div className="flex items-center justify-between">
              <Scan className="h-5 w-5 text-[#b78a48]" />
              <span className="text-xs text-green-700 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8%
              </span>
            </div>
            <p className="text-3xl font-bold text-[#4a3b24]">
              {mockAnalytics.totalScans.toLocaleString()}
            </p>
            <p className="text-sm text-[#7a6b52]">Total Scans</p>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-md border border-[#e8dec5] shadow-md hover:shadow-lg transition-all rounded-2xl">
            <div className="flex items-center justify-between">
              <Clock className="h-5 w-5 text-[#7a5c2e]" />
            </div>
            <p className="text-3xl font-bold text-[#4a3b24]">
              {mockAnalytics.avgTimeSpent}
            </p>
            <p className="text-sm text-[#7a6b52]">Avg Time Spent</p>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-md border border-[#e8dec5] shadow-md hover:shadow-lg transition-all rounded-2xl">
            <div className="flex items-center justify-between">
              <Activity className="h-5 w-5 text-[#b78a48]" />
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <p className="text-3xl font-bold text-[#4a3b24]">
              {mockAnalytics.activeUsersNow}
            </p>
            <p className="text-sm text-[#7a6b52]">Active Now</p>
          </Card>
        </div>

        {/* 🪶 Tabs */}
        <Tabs defaultValue="engagement" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-[#f3ead9] border border-[#e0d3b5] rounded-xl text-[#4a3b24]">
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          {/* 🖼 Engagement */}
          <TabsContent value="engagement" className="space-y-6">
            <Card className="p-6 bg-white/70 backdrop-blur border border-[#e8dec5] shadow-lg rounded-2xl">
              <h3 className="text-xl font-semibold text-[#4a3b24] mb-4">
                Top Engaged Artworks
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="scans"
                    fill="#b78a48"
                    radius={[10, 10, 0, 0]}
                    stroke="#7a5c2e"
                    strokeWidth={1}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-white/70 backdrop-blur border border-[#e8dec5] shadow-lg rounded-2xl">
              <h3 className="text-xl font-semibold text-[#4a3b24] mb-4">
                Artwork Performance
              </h3>
              <div className="space-y-4">
                {mockAnalytics.topArtworks.map((artwork, index) => (
                  <div
                    key={artwork.id}
                    className="flex items-center justify-between p-4 bg-[#f7f3ea] rounded-xl hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-[#b78a48]/20 flex items-center justify-center font-bold text-[#7a5c2e]">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-[#4a3b24]">
                          {artwork.title}
                        </p>
                        <p className="text-sm text-[#7a6b52]">
                          Avg time: {artwork.avgTime}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#b78a48]">
                        {artwork.scans}
                      </p>
                      <p className="text-xs text-[#7a6b52]">scans</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* 🚶 Traffic */}
          <TabsContent value="traffic" className="space-y-6">
            <Card className="p-6 bg-white/70 backdrop-blur border border-[#e8dec5] shadow-lg rounded-2xl">
              <h3 className="text-xl font-semibold text-[#4a3b24] mb-6">
                Visitor Flow by Hour
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#b78a48"
                    strokeWidth={3}
                    dot={{ fill: "#7a5c2e", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* 🌟 Feedback */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 bg-white/80 border border-[#e8dec5] rounded-2xl text-center shadow-md">
                <Star className="h-5 w-5 text-[#b78a48] mx-auto" />
                <p className="text-3xl font-bold text-[#4a3b24]">
                  {mockAnalytics.feedbackStats.avgRating}
                </p>
                <p className="text-sm text-[#7a6b52]">Average Rating</p>
              </Card>

              <Card className="p-6 bg-white/80 border border-[#e8dec5] rounded-2xl text-center shadow-md">
                <MessageSquare className="h-5 w-5 text-[#7a5c2e] mx-auto" />
                <p className="text-3xl font-bold text-[#4a3b24]">
                  {mockAnalytics.feedbackStats.totalFeedback}
                </p>
                <p className="text-sm text-[#7a6b52]">Total Feedback</p>
              </Card>

              <Card className="p-6 bg-white/80 border border-[#e8dec5] rounded-2xl text-center shadow-md">
                <Activity className="h-5 w-5 text-green-600 mx-auto" />
                <p className="text-3xl font-bold text-[#4a3b24] capitalize">
                  {mockAnalytics.feedbackStats.sentiment}
                </p>
                <p className="text-sm text-[#7a6b52]">Overall Sentiment</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
