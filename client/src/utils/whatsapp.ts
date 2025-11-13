import { CartItem, Branch } from "@shared/schema";

export function generateWhatsAppMessage(
  items: CartItem[],
  branch: Branch,
  total: number,
  customerName: string,
  customerPhone: string,
  deliveryAddress: string,
  instructions: string,
  deliveryMethod: "pickup" | "delivery",
  deliveryFee: number,
  distanceKm?: number
): string {
  let message = `*New Order for Meddy's Africana Buka - ${branch.name}*\n\n`;

  message += `*Customer Name:* ${customerName}\n`;
  message += `*Phone Number:* ${customerPhone}\n`;

  if (deliveryMethod === "delivery") {
    message += `*Delivery Address:* ${deliveryAddress}\n`;
    message += `*Delivery Fee:* ₦${deliveryFee.toLocaleString()}`;
    if (distanceKm) message += ` (${distanceKm} km)`;
    message += `\n`;
  }
  message += `*Collection:* ${deliveryMethod === "delivery" ? "Dispatch Rider" : "Pickup"}\n\n`;

  message += `*Order Details:*\n`;
  message += `────────────────\n\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `   Quantity: ${item.quantity}\n`;
    messageslines += `   Price: ₦${item.price.toLocaleString()} × ${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}\n\n`;
  });

  message += `────────────────\n`;
  if (deliveryMethod === "delivery") {
    message += `*Subtotal:* ₦${(total - deliveryFee).toLocaleString()}\n`;
    message += `*Delivery Fee:* ₦${deliveryFee.toLocaleString()}\n`;
  }
  message += `*Total Amount: ₦${total.toLocaleString()}*\n\n`;

  if (instructions) {
    message += `*Special Instructions:* ${instructions}\n\n`;
  }

  message += `_Thank you for choosing Meddy's!_`;

  return message;
}

export function sendWhatsAppOrder(
  items: CartItem[],
  branch: Branch,
  total: number,
  customerName: string,
  customerPhone: string,
  deliveryAddress: string,
  instructions: string,
  deliveryMethod: "pickup" | "delivery"
): void {
  const message = generateWhatsAppMessage(
    items,
    branch,
    total,
    customerName,
    customerPhone,
    deliveryAddress,
    instructions,
    deliveryMethod
  );
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${branch.whatsappNumber.replace(/\D/g, "")}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, "_blank");
}
