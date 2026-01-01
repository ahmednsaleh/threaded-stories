import { useState } from "react";
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThreadCardProps {
  id: number;
  community: string;
  author: string;
  timestamp: string;
  title: string;
  content: string;
  votes: number;
  comments: number;
  image?: string;
}

const ThreadCard = ({
  community,
  author,
  timestamp,
  title,
  content,
  votes: initialVotes,
  comments,
  image,
}: ThreadCardProps) => {
  const [votes, setVotes] = useState(initialVotes);
  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleVote = (direction: "up" | "down") => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (voteState === direction) {
      setVotes(initialVotes);
      setVoteState(null);
    } else {
      if (direction === "up") {
        setVotes(voteState === "down" ? initialVotes + 1 : initialVotes + 1);
      } else {
        setVotes(voteState === "up" ? initialVotes - 1 : initialVotes - 1);
      }
      setVoteState(direction);
    }
  };

  const formatVotes = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <article className="group rounded-xl border border-border bg-card hover:bg-card-hover transition-all duration-200 card-shadow hover:border-primary/20">
      <div className="flex">
        {/* Vote Column */}
        <div className="flex flex-col items-center gap-1 p-3 bg-muted/30 rounded-l-xl">
          <Button
            variant="upvote"
            size="vote"
            onClick={() => handleVote("up")}
            className={cn(
              isAnimating && voteState === "up" && "animate-vote-bounce",
              voteState === "up" && "text-upvote bg-upvote/10"
            )}
          >
            <ArrowBigUp className="h-6 w-6" />
          </Button>
          <span
            className={cn(
              "text-sm font-semibold tabular-nums transition-colors",
              voteState === "up" && "text-upvote",
              voteState === "down" && "text-downvote"
            )}
          >
            {formatVotes(votes)}
          </span>
          <Button
            variant="downvote"
            size="vote"
            onClick={() => handleVote("down")}
            className={cn(
              isAnimating && voteState === "down" && "animate-vote-bounce",
              voteState === "down" && "text-downvote bg-downvote/10"
            )}
          >
            <ArrowBigDown className="h-6 w-6" />
          </Button>
        </div>

        {/* Content Column */}
        <div className="flex-1 p-4">
          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span className="font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">
              t/{community}
            </span>
            <span>•</span>
            <span>Posted by u/{author}</span>
            <span>•</span>
            <span>{timestamp}</span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors cursor-pointer">
            {title}
          </h2>

          {/* Content Preview */}
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {content}
          </p>

          {/* Image */}
          {image && (
            <div className="mb-3 rounded-lg overflow-hidden">
              <img
                src={image}
                alt=""
                className="w-full max-h-96 object-cover hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-1 -ml-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>{comments} Comments</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground ml-auto">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
