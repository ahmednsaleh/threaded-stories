import { Flame, Clock, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

type SortOption = "hot" | "new" | "top" | "rising";

interface SortOption_ {
  id: SortOption;
  label: string;
  icon: React.ElementType;
}

const sortOptions: SortOption_[] = [
  { id: "hot", label: "Hot", icon: Flame },
  { id: "new", label: "New", icon: Clock },
  { id: "top", label: "Top", icon: TrendingUp },
  { id: "rising", label: "Rising", icon: Sparkles },
];

const FeedTabs = () => {
  const [activeSort, setActiveSort] = useState<SortOption>("hot");

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/50 border border-border">
      {sortOptions.map((option) => (
        <Button
          key={option.id}
          variant="ghost"
          size="sm"
          onClick={() => setActiveSort(option.id)}
          className={cn(
            "gap-2 rounded-lg transition-all",
            activeSort === option.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <option.icon className={cn(
            "h-4 w-4",
            activeSort === option.id && option.id === "hot" && "text-primary"
          )} />
          <span className="hidden sm:inline">{option.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default FeedTabs;
