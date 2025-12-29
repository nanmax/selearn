import { MenuBar } from "./buttom-menu";
import { Instagram, MessageSquare, BookOpen } from "lucide-react";

const menuItems = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/selearn.academy",
    external: true,
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    href: "https://wa.me/6285189722630",
    external: true,
  },
  {
    icon: BookOpen,
    label: "Teach On Selearn",
    href: "/teach-on-selearn",
  },
];

function MenuBarDemo() {
  return (
    <div className="flex items-center justify-center p-6">
      <MenuBar items={menuItems} />
    </div>
  );
}

export { MenuBarDemo };
