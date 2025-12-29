import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FloatingIconsHero } from "./_components/floating-icons-hero-section";
import { LoginForm } from "./_components/LoginForm";

const demoIcons = [
  { id: 1, icon: "chrome", className: "top-[10%] left-[10%]" },
  { id: 2, icon: "apple", className: "top-[20%] right-[8%]" },
  { id: 3, icon: "layers", className: "top-[80%] left-[10%]" },
  { id: 4, icon: "figma", className: "bottom-[10%] right-[10%]" },
  { id: 5, icon: "github", className: "top-[5%] left-[30%]" },
  { id: 6, icon: "slack", className: "top-[5%] right-[30%]" },
  { id: 7, icon: "box", className: "bottom-[8%] left-[25%]" },
  { id: 8, icon: "layers", className: "top-[40%] left-[15%]" },
  { id: 9, icon: "twitch", className: "top-[75%] right-[25%]" },
  { id: 10, icon: "twitter", className: "top-[90%] left-[70%]" },
  { id: 11, icon: "figma", className: "top-[50%] right-[5%]" },
  { id: 12, icon: "music", className: "top-[55%] left-[5%]" },
  { id: 13, icon: "box", className: "top-[5%] left-[78%]" },
  { id: 14, icon: "twitch", className: "bottom-[5%] right-[45%]" },
  { id: 15, icon: "layers", className: "top-[25%] right-[20%]" },
  { id: 16, icon: "youtube", className: "top-[60%] left-[30%]" },
];

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/");
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <FloatingIconsHero
        icons={demoIcons}
        className="fixed inset-0 -z-10 w-screen h-screen"
      />

      <div className="relative z-10 w-full max-w-sm md:max-w-lg">
        <LoginForm />
      </div>
    </div>
  );
}
