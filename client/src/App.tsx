import { Switch, Route } from "wouter";
import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import MenuPage from "@/pages/MenuPage";
import OrderPage from "@/pages/OrderPage";
import NotFound from "@/pages/not-found";
import { useCart } from "@/hooks/useCart";
import { sendWhatsAppOrder } from "@/utils/whatsapp";
import { Branch, MenuItem, OrderItem, Review } from "@shared/schema";

const BRANCH_STORAGE_KEY = "meddys-selected-branch";

function Router() {
  const [menuData, setMenuData] = useState<{
    menuItems: MenuItem[];
    orderItems: OrderItem[];
    branches: Branch[];
    reviews: Review[];
    carouselImages: Array<{ id: string; image: string; alt: string }>;
  } | null>(null);

  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(() => {
    const stored = localStorage.getItem(BRANCH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const {
    cart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    cartItemCount,
    cartTotal,
  } = useCart();

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data);
        if (!selectedBranch && data.branches.length > 0) {
          setSelectedBranch(data.branches[0]);
        }
      })
      .catch((error) => console.error("Error loading menu data:", error));
  }, []);

  useEffect(() => {
    if (selectedBranch) {
      localStorage.setItem(BRANCH_STORAGE_KEY, JSON.stringify(selectedBranch));
    }
  }, [selectedBranch]);

  const handlePlaceOrder = (customerName?: string, customerPhone?: string, deliveryAddress?: string, instructions?: string) => {
    if (!selectedBranch) {
      alert("Please select a branch first");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    sendWhatsAppOrder(cart, selectedBranch, cartTotal, customerName, customerPhone, deliveryAddress, instructions);
    clearCart();
  };

  if (!menuData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        cartItemCount={cartItemCount}
        selectedBranch={selectedBranch}
        onBranchChange={setSelectedBranch}
        branches={menuData.branches}
      />
      <main className="flex-1">
        <Switch>
          <Route path="/">
            <HomePage
              carouselImages={menuData.carouselImages}
              reviews={menuData.reviews}
            />
          </Route>
          <Route path="/menu">
            <MenuPage menuItems={menuData.menuItems} onAddToCart={addToCart} />
          </Route>
          <Route path="/order">
            <OrderPage
              cart={cart}
              menuItems={menuData.menuItems}
              orderItems={menuData.orderItems}
              selectedBranch={selectedBranch}
              onAddToCart={addToCart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              onPlaceOrder={handlePlaceOrder}
            />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
