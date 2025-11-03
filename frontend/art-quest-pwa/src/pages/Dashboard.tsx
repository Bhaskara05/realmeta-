import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Scan, Clock, Activity, TrendingUp, Star, MessageSquare } from "lucide-react";
import { mockAnalytics } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const Dashboard = () => {
  const chartData = mockAnalytics.topArtworks.map(artwork => ({
    name: artwork.title.split(' ').slice(0, 2).join(' '),
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
    <div className="min-h-screen pb-20">
      {/* Background Effects */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-3" />

      {/* Header */}
      <div className="gradient-hero text-primary-foreground py-12 px-4">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in-up">
            Analytics Dashboard
          </h1>
          <p className="text-primary-foreground/90 text-lg animate-fade-in-up">
            Real-time insights into museum engagement
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card p-6 space-y-2 hover:glow-border transition-all">
            <div className="flex items-center justify-between">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12%
              </span>
            </div>
            <p className="text-3xl font-bold">{mockAnalytics.totalVisitors.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Visitors</p>
          </Card>

          <Card className="glass-card p-6 space-y-2 hover:glow-border transition-all">
            <div className="flex items-center justify-between">
              <Scan className="h-5 w-5 text-accent" />
              <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8%
              </span>
            </div>
            <p className="text-3xl font-bold">{mockAnalytics.totalScans.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Scans</p>
          </Card>

          <Card className="glass-card p-6 space-y-2 hover:glow-border transition-all">
            <div className="flex items-center justify-between">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">{mockAnalytics.avgTimeSpent}</p>
            <p className="text-sm text-muted-foreground">Avg Time Spent</p>
          </Card>

          <Card className="glass-card p-6 space-y-2 hover:glow-border transition-all">
            <div className="flex items-center justify-between">
              <Activity className="h-5 w-5 text-accent" />
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <p className="text-3xl font-bold">{mockAnalytics.activeUsersNow}</p>
            <p className="text-sm text-muted-foreground">Active Now</p>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="engagement" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="engagement" className="space-y-6">
            {/* Top Artworks */}
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold mb-6">Top Engaged Artworks</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="scans" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Artwork Details */}
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Artwork Performance</h3>
              <div className="space-y-4">
                {mockAnalytics.topArtworks.map((artwork, index) => (
                  <div key={artwork.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{artwork.title}</p>
                        <p className="text-sm text-muted-foreground">Avg time: {artwork.avgTime}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{artwork.scans}</p>
                      <p className="text-xs text-muted-foreground">scans</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold mb-6">Visitor Flow by Hour</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="hsl(var(--accent))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--accent))", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="glass-card p-6 space-y-2">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <p className="text-3xl font-bold">{mockAnalytics.feedbackStats.avgRating}</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </Card>

              <Card className="glass-card p-6 space-y-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <p className="text-3xl font-bold">{mockAnalytics.feedbackStats.totalFeedback}</p>
                <p className="text-sm text-muted-foreground">Total Feedback</p>
              </Card>

              <Card className="glass-card p-6 space-y-2">
                <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                <p className="text-3xl font-bold capitalize">{mockAnalytics.feedbackStats.sentiment}</p>
                <p className="text-sm text-muted-foreground">Overall Sentiment</p>
              </Card>
            </div>

            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Rating Distribution</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-20">
                      <span className="text-sm">{stars}</span>
                      <Star className="h-4 w-4 fill-accent text-accent" />
                    </div>
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all"
                        style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {stars === 5 ? "70%" : stars === 4 ? "20%" : "5%"}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
