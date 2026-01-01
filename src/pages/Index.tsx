import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ThreadCard from "@/components/ThreadCard";
import FeedTabs from "@/components/FeedTabs";

const threads = [
  {
    id: 1,
    community: "Technology",
    author: "techguru42",
    timestamp: "3 hours ago",
    title: "OpenAI announces GPT-5 with revolutionary reasoning capabilities",
    content: "The latest model demonstrates unprecedented problem-solving abilities, scoring 95% on graduate-level exams and showing emergent behaviors in complex multi-step reasoning tasks. Researchers are calling it a significant step toward AGI...",
    votes: 12400,
    comments: 2341,
  },
  {
    id: 2,
    community: "Gaming",
    author: "pixelmaster",
    timestamp: "5 hours ago",
    title: "Elden Ring DLC Shadow of the Erdtree breaks concurrent player records",
    content: "FromSoftware's highly anticipated expansion has smashed Steam records with over 2 million concurrent players. The DLC introduces 10 new boss fights and a massive new map region that rivals the base game in scope...",
    votes: 8900,
    comments: 1567,
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    community: "Programming",
    author: "rustacean",
    timestamp: "7 hours ago",
    title: "Why Rust is becoming the language of choice for systems programming in 2024",
    content: "With major companies like Microsoft, Google, and Linux kernel adopting Rust, here's a deep dive into what makes Rust special: memory safety without garbage collection, zero-cost abstractions, and a compiler that catches bugs before they happen...",
    votes: 5600,
    comments: 892,
  },
  {
    id: 4,
    community: "Science",
    author: "cosmicexplorer",
    timestamp: "8 hours ago",
    title: "James Webb Telescope captures most distant galaxy ever observed",
    content: "The newly discovered galaxy, named JADES-GS-z14-0, existed just 290 million years after the Big Bang. This finding challenges our understanding of early galaxy formation and suggests stars formed much faster than previously thought...",
    votes: 15200,
    comments: 3421,
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    community: "Music",
    author: "audiophile99",
    timestamp: "10 hours ago",
    title: "Vinyl sales overtake CDs for the first time since 1987",
    content: "In a surprising twist, vinyl record sales have officially surpassed CD sales globally. The resurgence is driven by younger generations seeking tangible music experiences and the aesthetic appeal of album artwork at full size...",
    votes: 4200,
    comments: 678,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-6">
        <div className="flex gap-6">
          {/* Main Feed */}
          <div className="flex-1 max-w-2xl mx-auto lg:mx-0 space-y-4">
            {/* Sort Tabs */}
            <FeedTabs />
            
            {/* Thread List */}
            <div className="space-y-4">
              {threads.map((thread, index) => (
                <div
                  key={thread.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ThreadCard {...thread} />
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center pt-4">
              <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                Load more threads...
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </main>
    </div>
  );
};

export default Index;
