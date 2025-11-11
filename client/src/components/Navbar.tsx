import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Branch } from "@shared/schema";

interface NavbarProps {
  cartItemCount: number;
  selectedBranch: Branch | null;
  onBranchChange: (branch: Branch) => void;
  branches: Branch[];
}

export function Navbar({ cartItemCount, selectedBranch, onBranchChange, branches }: NavbarProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/#about", label: "About", hash: "about" },
    { path: "/#contact", label: "Contact", hash: "contact" },
    { path: "/order", label: "Order Now" },
  ];

  // Check if current page matches link
  const isActive = (linkPath: string, hash?: string) => {
    if (linkPath === "/") return location === "/";
    if (linkPath === "/order") return location.startsWith("/order");
    if (linkPath === "/menu") return location === "/menu";
    if (hash) return location === "/" && window.location.hash === `#${hash}`;
    return false;
  };

  // Handle cross-page hash navigation
  const navigateToHash = (basePath: string, hash?: string) => {
    const targetUrl = hash ? `${basePath}#${hash}` : basePath;
    window.location.href = targetUrl;
  };

  // Same-page smooth scroll
  const scrollToHash = (hash: string) => {
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white text-black border-b border-gray-200 min-h-24 backdrop-blur-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <div className="flex flex-col space-y-2 items-center cursor-pointer hover-elevate active-elevate-2 px-2 py-4 rounded-md">
              <img src="/meddysLogo.png" alt="logo" width="180px" />
              <p className="text-xs text-black/70">Africana Buka</p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isHashLink = link.hash;
              return (
                <button
                  key={link.path}
                  onClick={() => {
                    if (isHashLink) {
                      if (location === "/") {
                        scrollToHash(link.hash!);
                      } else {
                        navigateToHash("/", link.hash!);
                      }
                    } else {
                      navigateToHash(link.path);
                    }
                  }}
                  className={`text-sm font-medium cursor-pointer hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors ${
                    isActive(link.path, link.hash)
                      ? "text-orange-600 bg-orange-100"
                      : "text-black hover:text-orange-600"
                  }`}
                  data-testid={`link-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Branch + Cart + Mobile Toggle */}
          <div className="flex flex-col items-left ml-2 text-xs gap-1 font-bold text-black">
            <span>Select the branch closest to you</span>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Select
                value={selectedBranch?.id}
                onValueChange={(value) => {
                  const branch = branches.find((b) => b.id === value);
                  if (branch) onBranchChange(branch);
                }}
              >
                <SelectTrigger
                  className="w-[120px] sm:w-[160px] bg-gray-50 border-gray-300 text-black hover:bg-gray-100"
                  data-testid="select-branch"
                >
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id} data-testid={`branch-${branch.id}`}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* CART ICON → /order#order-cart */}
              <button
                onClick={() => {
                  if (location.startsWith("/order")) {
                    scrollToHash("order-cart");
                  } else {
                    navigateToHash("/order", "order-cart");
                  }
                }}
                className="relative"
                data-testid="link-cart"
              >
                <Button variant="ghost" size="icon" className="text-black hover:text-orange-600">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 right-2 h-5 w-5 flex items-center justify-center rounded-full p-2 text-xs"
                      data-testid="cart-count"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-black"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const isHashLink = link.hash;
              return (
                <button
                  key={link.path}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (isHashLink) {
                      if (location === "/") {
                        scrollToHash(link.hash!);
                      } else {
                        navigateToHash("/", link.hash!);
                      }
                    } else {
                      navigateToHash(link.path);
                    }
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium cursor-pointer hover-elevate active-elevate-2 ${
                    isActive(link.path, link.hash)
                      ? "text-orange-600 bg-orange-100"
                      : "text-black hover:text-orange-600 hover:bg-gray-100"
                  }`}
                  data-testid={`mobile-link-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Mobile Cart */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (location.startsWith("/order")) {
                  scrollToHash("order-cart");
                } else {
                  navigateToHash("/order", "order-cart");
                }
              }}
              className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium cursor-pointer hover-elevate active-elevate-2 flex items-center space-x-2 ${
                location.startsWith("/order")
                  ? "text-orange-600 bg-orange-100"
                  : "text-black hover:text-orange-600 hover:bg-gray-100"
              }`}
              data-testid="mobile-link-cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart {cartItemCount > 0 && `(${cartItemCount})`}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
