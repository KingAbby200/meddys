import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate group shadow-lg" data-testid={`menu-item-${item.id}`}>
      <div className="aspect-square relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          size="icon"
          className="absolute rounded-full bottom-16 left-2 bg-primary text-primary-foreground hover:bg-primary shadow-2xl w-16 h-16 hover:scale-110 transition-all duration-200"
          onClick={() => onAddToCart(item)}
          data-testid={`button-add-to-cart-${item.id}`}
        >
          <Plus className="w-12 h-12" />
      </Button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg text-card-foreground line-clamp-2">
            {item.name}
          </h3>
          <Badge variant="secondary" className="bg-accent text-accent-foreground shrink-0">
            ₦{item.price.toLocaleString()}
          </Badge>
        </div>
        {item.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </Card>
  );
}
