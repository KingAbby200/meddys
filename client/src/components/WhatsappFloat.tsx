import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Branch } from "@shared/schema";

const WHATSAPP_MESSAGE =
  "Hi Meddy's Africana Buka! I'd like to place an order.";

export function WhatsAppFloat() {
  const [branch, setBranch] = useState<Branch | null>(null);
  const [hasBounced, setHasBounced] = useState(false);

  // Load the selected branch from localStorage (same key the rest of the app uses)
  useEffect(() => {
    const stored = localStorage.getItem("meddys-selected-branch");
    if (stored) {
      setBranch(JSON.parse(stored));
    }
  }, []);

  // Trigger the bounce animation once on mount
  useEffect(() => {
    const timer = setTimeout(() => setHasBounced(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!branch?.whatsappNumber) return null;

  const whatsappUrl = `https://wa.me/${
    branch.whatsappNumber.replace(/\D/g, "")
  }?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        fixed bottom-6 right-6 z-40
        flex h-14 w-14 items-center justify-center
        rounded-full bg-green-600 text-white shadow-lg
        transition-transform duration-700 ease-out
        hover:scale-110 hover:bg-green-700
        ${hasBounced ? "animate-bounce-once" : ""}
      `}
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
    </a>
  );
}
