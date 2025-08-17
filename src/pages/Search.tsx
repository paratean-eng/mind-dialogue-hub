import { useState } from "react";
import { Search as SearchIcon, Filter, Calendar, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockSearchResults = [
  {
    id: 1,
    title: "How to build a React app",
    content: "We discussed creating a React application from scratch, including setting up the development environment and basic components...",
    timestamp: "2 hours ago",
    category: "Development",
  },
  {
    id: 2,
    title: "Machine learning fundamentals",
    content: "Explained the basics of machine learning, including supervised and unsupervised learning algorithms...",
    timestamp: "1 day ago",
    category: "AI/ML",
  },
  {
    id: 3,
    title: "JavaScript array methods",
    content: "Covered various array methods like map, filter, reduce, and their practical applications in modern JavaScript...",
    timestamp: "3 days ago",
    category: "Programming",
  },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(mockSearchResults);

  const handleSearch = () => {
    // Implement search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Search Header */}
      <div className="border-b border-border p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 gradient-text">Search Your Conversations</h1>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search through your chat history..."
                className="pl-10 py-3 text-base bg-muted/50 border-border focus:ring-primary"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="px-6 bg-primary hover:bg-primary/90 mind-dial-glow"
            >
              Search
            </Button>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto p-6 chat-scroll">
        <div className="max-w-2xl mx-auto space-y-4">
          {results.map((result) => (
            <Card key={result.id} className="p-6 hover:bg-muted/30 cursor-pointer transition-colors mind-dial-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-foreground">{result.title}</h3>
                </div>
                <Badge variant="secondary" className="ml-2">
                  {result.category}
                </Badge>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                {result.content}
              </p>
              
              <span className="text-xs text-muted-foreground">
                {result.timestamp}
              </span>
            </Card>
          ))}
          
          {results.length === 0 && (
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}