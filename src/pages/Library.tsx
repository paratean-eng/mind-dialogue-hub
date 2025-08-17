import { Book, Star, Tag, Clock, Grid3X3, List } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const mockLibraryItems = [
  {
    id: 1,
    title: "React Best Practices",
    description: "A comprehensive guide to React development patterns and conventions",
    category: "Development",
    tags: ["React", "JavaScript", "Frontend"],
    saved: true,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Machine Learning Algorithms",
    description: "Overview of popular ML algorithms and their use cases",
    category: "AI/ML",
    tags: ["Machine Learning", "Algorithms", "Data Science"],
    saved: false,
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    title: "API Design Principles",
    description: "Guidelines for designing robust and scalable APIs",
    category: "Backend",
    tags: ["API", "Design", "Architecture"],
    saved: true,
    createdAt: "2024-01-08",
  },
  {
    id: 4,
    title: "CSS Grid and Flexbox",
    description: "Modern CSS layout techniques for responsive design",
    category: "Design",
    tags: ["CSS", "Layout", "Responsive"],
    saved: false,
    createdAt: "2024-01-05",
  },
];

export default function Library() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Development", "AI/ML", "Backend", "Design"];

  const filteredItems = selectedCategory === "All" 
    ? mockLibraryItems 
    : mockLibraryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="h-full flex flex-col">
      {/* Library Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold gradient-text flex items-center gap-3">
            <Book className="h-7 w-7 text-primary" />
            Knowledge Library
          </h1>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Library Content */}
      <div className="flex-1 overflow-y-auto p-6 chat-scroll">
        <div className={`grid gap-4 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1 max-w-4xl mx-auto"
        }`}>
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className={`p-6 hover:bg-muted/30 cursor-pointer transition-all duration-200 mind-dial-shadow ${
                viewMode === "list" ? "flex items-center gap-6" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground line-clamp-1">
                    {item.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 p-1"
                  >
                    <Star 
                      className={`h-4 w-4 ${
                        item.saved 
                          ? "fill-yellow-500 text-yellow-500" 
                          : "text-muted-foreground hover:text-yellow-500"
                      }`} 
                    />
                  </Button>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No items found</h3>
            <p className="text-muted-foreground">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}