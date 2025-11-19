import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MenuItemCard } from "@/components/MenuItemCard";
import { MenuItem } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface MenuPageProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

const categories = [
  "All",
  "African Dishes",
  "Intercontinental",
  "Pastries",
  "Grills",
  "Soups",
  "Swallow",
  "Proteins",
  "Food",
  "Drinks",
  "Snacks",
  "Side Dish",
];

export default function MenuPage({ menuItems, onAddToCart }: MenuPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [menuItems, searchQuery, selectedCategory]);

  const handleAddToCart = (item: MenuItem) => {
    onAddToCart(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-poppins font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Our Menu
          </h1>
          <p className="text-muted-foreground font-bold text-lg max-w-2xl mx-auto">
            Browse our delicious selection of African and intercontinental dishes
          </p>
          <p className="text-muted-foreground text-md max-w-2xl mt-4 mx-auto">
            Order our special combos by tapping on the "+" button or place a custom order on the "Order Now" page
          </p>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            
            <Input
              type="search"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-12 text-base rounded-full border-2 focus-visible:ring-primary"
              data-testid="input-search"
            />
            
            {/* Always reserve space on the right — only show X when there's text */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              {searchQuery ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-accent"
                  onClick={() => setSearchQuery("")}
                  data-testid="button-clear-search"
                >
                  <X className="w-5 h-5" />
                </Button>
              ) : (
                /* Invisible placeholder to maintain layout */
                <div className="h-8 w-8" />
              )}
            </div>
          </div>
        </div>

        {searchQuery && (
          <div className="mb-8 text-center">
            <p className="text-muted-foreground">
              {filteredItems.length === 0 ? (
                <span data-testid="text-no-results">No items found for "{searchQuery}"</span>
              ) : (
                <span data-testid="text-results-count">
                  Found {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""} matching "{searchQuery}"
                </span>
              )}
            </p>
          </div>
        )}

        {!searchQuery && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`cursor-pointer px-4 py-2 text-sm hover-elevate active-elevate-2 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg" data-testid="text-empty-menu">
              No items found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
