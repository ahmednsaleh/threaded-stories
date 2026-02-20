import { TrendingUp, Users, Zap, Code, Gamepad2, Music, Palette, BookOpen } from "lucide-react";

interface Community {
  name: string;
  members: string;
  icon: React.ElementType;
  color: string;
}

const communities: Community[] = [
  { name: "Technology", members: "2.4M", icon: Zap, color: "text-secondary" },
  { name: "Gaming", members: "1.8M", icon: Gamepad2, color: "text-primary" },
  { name: "Programming", members: "1.2M", icon: Code, color: "text-accent" },
  { name: "Music", members: "890K", icon: Music, color: "text-success" },
  { name: "Art", members: "670K", icon: Palette, color: "text-primary" },
  { name: "Books", members: "450K", icon: BookOpen, color: "text-secondary" },
];

const Sidebar = () => {
  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-20 space-y-6">
        {/* Trending Section */}
        <div className="rounded-xl border border-border bg-card p-4 card-shadow">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Trending Today</h3>
          </div>
          <div className="space-y-3">
            {["AI breakthrough in medicine", "New gaming console leak", "Climate summit results"].map((topic, i) => (
              <div key={i} className="group cursor-pointer">
                <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {topic}
                </p>
                <p className="text-xs text-muted-foreground">
                  {Math.floor(Math.random() * 50 + 10)}K discussing
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Communities Section */}
        <div className="rounded-xl border border-border bg-card p-4 card-shadow">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-secondary" />
            <h3 className="font-semibold">Top Communities</h3>
          </div>
          <div className="space-y-2">
            {communities.map((community) => (
              <div
                key={community.name}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors group"
              >
                <div className={`p-2 rounded-lg bg-muted group-hover:bg-background transition-colors`}>
                  <community.icon className={`h-4 w-4 ${community.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">t/{community.name}</p>
                  <p className="text-xs text-muted-foreground">{community.members} members</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-xs text-muted-foreground space-y-2 px-2">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <a href="/" className="hover:text-foreground transition-colors">About</a>
            <a href="mailto:support@threaddits.com" className="hover:text-foreground transition-colors">Help</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
          <p>© 2026 Threaddits</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
