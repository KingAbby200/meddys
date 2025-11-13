import { useState, useMemo } from "react";
import { Plus, Minus, Trash2, ShoppingBag, Truck, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartItem, MenuItem, OrderItem, Branch } from "@shared/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface OrderPageProps {
  cart: CartItem[];
  menuItems: MenuItem[];
  orderItems: OrderItem[];
  selectedBranch: Branch | null;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (menuItemId: string, quantity: number) => void;
  onRemoveItem: (menuItemId: string) => void;
  onPlaceOrder: (
    customerName: string,
    customerPhone: string,
    deliveryAddress: string,
    instructions: string,
    deliveryMethod: "pickup" | "delivery"
  ) => void;
}

export default function OrderPage({
  cart,
  menuItems,
  orderItems,
  selectedBranch,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}: OrderPageProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [instructions, setInstructions] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");

  const categorizedItems = useMemo(() => {
    const categories = [
      "Take Away",
      "Soups",
      "Swallow",
      "Proteins",
      "Food",
      "Drinks",
      "Pastries",
      "African Dishes",
      "Intercontinental",
      "Grills",
      "Snacks",
    ];

    const grouped: Record<string, MenuItem[]> = {};
    categories.forEach((cat) => {
      grouped[cat] = orderItems.filter((item) => item.category === cat);
    });

    return grouped;
  }, [orderItems]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddToCart = (item: MenuItem) => {
    onAddToCart(item);
  };

  const handlePlaceOrder = () => {
    if (!selectedBranch) {
      alert("Please select a branch first");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    if (!customerName || !customerPhone) {
      alert("Name and phone number are required");
      return;
    }
    if (deliveryMethod === "delivery" && !deliveryAddress) {
      alert("Delivery address is required for delivery");
      return;
    }

    onPlaceOrder(
      customerName,
      customerPhone,
      deliveryAddress,
      instructions,
      deliveryMethod
    );
  };

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-poppins font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Place Your Order
          </h1>
          <p className="text-muted-foreground text-lg">
            Select items and quantities, then send your order via WhatsApp
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="font-poppins font-semibold text-2xl mb-4">Browse Menu</h2>
              <Accordion type="multiple" className="w-full">
                {Object.entries(categorizedItems).map(([category, items]) => (
                  <AccordionItem key={category} value={category}>
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span>{category}</span>
                        <Badge variant="secondary" className="ml-2">
                          {items.length}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        {items.map((item) => {
                          const cartItem = cart.find((c) => c.menuItemId === item.id);
                          return (
                            <div
                              key={item.id}
                              className="flex items-center justify-between p-3 rounded-md hover-elevate border border-border"
                              data-testid={`order-item-${item.id}`}
                            >
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-primary font-semibold">
                                  ₦{item.price.toLocaleString()}
                                </p>
                              </div>
                              {cartItem ? (
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      onUpdateQuantity(item.id, cartItem.quantity - 1)
                                    }
                                    data-testid={`button-decrease-${item.id}`}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <span className="w-8 text-center font-semibold" data-testid={`quantity-${item.id}`}>
                                    {cartItem.quantity}
                                  </span>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      onUpdateQuantity(item.id, cartItem.quantity + 1)
                                    }
                                    data-testid={`button-increase-${item.id}`}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => handleAddToCart(item)}
                                  data-testid={`button-add-${item.id}`}
                                >
                                  <Plus className="w-4 h-4 mr-1" />
                                  Add
                                </Button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="p-6">
                <h2 id="order-cart" className="font-poppins font-semibold text-2xl mb-4 flex items-center">
                  <ShoppingBag className="w-6 h-6 mr-2" />
                  Your Cart
                </h2>

                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8" data-testid="text-empty-cart">
                    Your cart is empty
                  </p>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.menuItemId}
                        className="flex items-center justify-between p-3 rounded-md bg-muted/30"
                        data-testid={`cart-item-${item.menuItemId}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ₦{item.price.toLocaleString()} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          <p className="font-semibold text-primary whitespace-nowrap">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => onRemoveItem(item.menuItemId)}
                            data-testid={`button-remove-${item.menuItemId}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t space-y-6">
                      {/* === DELIVERY METHOD RADIO === */}
                      <div>
                        <Label className="text-base font-semibold mb-3 block">
                          Delivery Method
                        </Label>
                        <RadioGroup
                          value={deliveryMethod}
                          onValueChange={(v) => setDeliveryMethod(v as "pickup" | "delivery")}
                          className="grid grid-cols-2 gap-3"
                        >
                          <div>
                            <RadioGroupItem value="pickup" id="pickup" className="peer sr-only" />
                            <Label
                              htmlFor="pickup"
                              className={cn(
                                "flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-all",
                                "peer-checked:border-primary peer-checked:bg-primary/5",
                                "hover:border-primary/50"
                              )}
                            >
                              <Store className="w-6 h-6 mb-2 text-primary" />
                              <span className="font-medium">Pickup</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="delivery" id="delivery" className="peer sr-only" />
                            <Label
                              htmlFor="delivery"
                              className={cn(
                                "flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-all",
                                "peer-checked:border-primary peer-checked:bg-primary/5",
                                "hover:border-primary/50"
                              )}
                            >
                              <Truck className="w-6 h-6 mb-2 text-primary" />
                              <span className="font-medium">Delivery</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* === FORM FIELDS === */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="customer-name" className="text-sm font-medium">
                            Your Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="customer-name"
                            type="text"
                            placeholder="Enter your name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="mt-1"
                            required
                            data-testid="input-customer-name"
                          />
                        </div>

                        <div>
                          <Label htmlFor="customer-phone" className="text-sm font-medium">
                            Phone Number <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="customer-phone"
                            type="tel"
                            placeholder="e.g. 08012345678"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="mt-1"
                            required
                            data-testid="input-customer-phone"
                          />
                        </div>

                        {deliveryMethod === "delivery" && (
                          <div className="animate-in slide-in-from-top-2 duration-300">
                            <Label htmlFor="delivery-address" className="text-sm font-medium">
                              Delivery Address <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="delivery-address"
                              type="text"
                              placeholder="Enter full delivery address"
                              value={deliveryAddress}
                              onChange={(e) => setDeliveryAddress(e.target.value)}
                              className="mt-1"
                              required
                              data-testid="input-delivery-address"
                            />
                          </div>
                        )}

                        <div>
                          <Label htmlFor="instructions" className="text-sm font-medium">
                            Special Instructions
                          </Label>
                          <Textarea
                            id="instructions"
                            placeholder="E.g. Pour soup on top of amala, no pepper, extra plantain..."
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            className="mt-1 min-h-24 resize-none"
                            data-testid="input-instructions"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <span className="font-poppins font-bold text-xl">Total:</span>
                        <span className="font-poppins font-bold text-2xl text-primary" data-testid="text-total">
                          ₦{total.toLocaleString()}
                        </span>
                      </div>

                      {!selectedBranch && (
                        <p className="text-sm text-destructive mb-4" data-testid="text-select-branch-warning">
                          Please select a branch from the header
                        </p>
                      )}

                      <Button
                        className="w-full bg-primary text-primary-foreground hover:bg-primary"
                        size="lg"
                        onClick={handlePlaceOrder}
                        disabled={!selectedBranch || cart.length === 0}
                        data-testid="button-place-order"
                      >
                        Send Order via WhatsApp
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
