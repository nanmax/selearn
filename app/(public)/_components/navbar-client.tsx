"use client";

import {
  MenuIcon,
  // ShoppingCart,
  Code,
  Briefcase,
  DollarSign,
  Cpu,
  FileSpreadsheet,
  UserCheck,
  PenTool,
  Megaphone,
  HeartPulse,
  Music,
  BookOpen,
  CircleHelp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import Logo from "@/public/logo-selearn.svg";
import { authClient } from "@/lib/auth-client";
import { slugify } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
// import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { NavSearch } from "./nav-search";
import UserDropdown from "./UserDropdown";

interface NavbarClientProps {
  categories: string[];
}

const categoryIcons: { [key: string]: React.ElementType } = {
  Development: Code,
  Business: Briefcase,
  "Finance & Accounting": DollarSign,
  "IT & Software": Cpu,
  "Office Productivity": FileSpreadsheet,
  "Personal Development": UserCheck,
  Design: PenTool,
  Marketing: Megaphone,
  "Health & Fitness": HeartPulse,
  Music: Music,
  "Teaching & Academics": BookOpen,
};

const categoryDescriptions: Record<string, string> = {
  Development:
    "Bangun masa depan Anda dengan kode. Pelajari pengembangan web, mobile, dan game dari dasar.",
  Business: "Kuasai strategi dan kepemimpinan untuk mengembangkan usaha Anda.",
  "Finance & Accounting":
    "Kelola keuangan pribadi maupun bisnis dengan cerdas.",
  "IT & Software":
    "Kuasai dunia teknologi: dari keamanan jaringan hingga software profesional.",
  "Office Productivity":
    "Bekerja lebih cerdas dengan Excel, PowerPoint, dan alat bantu lainnya.",
  "Personal Development":
    "Bangun skill pribadi seperti komunikasi dan manajemen waktu.",
  Design:
    "Kreasikan ide visual dengan desain grafis, UI/UX, dan ilustrasi digital.",
  Marketing:
    "Jangkau audiens luas lewat strategi digital marketing dan media sosial.",
  "Health & Fitness":
    "Tingkatkan gaya hidup sehat melalui panduan olahraga dan nutrisi.",
  Music: "Asah bakat bermusik dan produksi musik digital Anda.",
  "Teaching & Academics":
    "Kuasai metode pengajaran dan berbagi pengetahuan Anda.",
};

export const NavbarPublic = ({ categories }: NavbarClientProps) => {
  const { data: session, isPending } = authClient.useSession();

  const courses = categories.map((category) => ({
    title: category,
    description:
      categoryDescriptions[category] ||
      "Jelajahi berbagai kursus di kategori ini.",
    href: `/category/${slugify(category)}`,
  }));

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 0.6 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md"
    >
      <div className="container flex min-h-16 items-center justify-between mx-auto px-4 md:px-6 lg:px-8">
        {/* LEFT SECTION */}
        <div className="flex gap-3 lg:gap-6 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="Selearn" className="h-8 w-auto" />
            <span className="text-lg font-semibold text-primary hidden lg:block">
              Selearn
            </span>
          </Link>
          <NavSearch />
        </div>

        {/* NAVIGATION */}
        <nav className="flex items-center justify-between">
          {/* DESKTOP MENU */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="relative font-medium hover:text-primary transition-all hover:scale-[1.03]">
                  Kursus
                </NavigationMenuTrigger>
                <NavigationMenuContent className="shadow-xl rounded-xl">
                  <div className="grid w-[1100px] grid-cols-5 gap-3 p-4">
                    {courses.map((course, index) => {
                      const Icon = categoryIcons[course.title] || CircleHelp;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.02 }}
                        >
                          <NavigationMenuLink asChild>
                            <Link
                              href={course.href}
                              className="p-3 rounded-lg transition-all hover:bg-primary/10 hover:shadow-sm flex flex-col gap-2"
                            >
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4 text-primary" />
                                <span className="font-semibold text-foreground">
                                  {course.title}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-tight">
                                {course.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </motion.div>
                      );
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/teach-on-selearn"
                  className="relative font-medium transition-all hover:text-primary hover:scale-[1.03]"
                >
                  Teach on Selearn
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/contact"
                  className="relative font-medium transition-all hover:text-primary hover:scale-[1.03]"
                >
                  Kontak
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* RIGHT SECTION */}
          <div className="mx-4 hidden h-8 w-px bg-border lg:block" />
          <div className="hidden lg:flex items-center gap-4">
            {/* Cart */}
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/cart" className="relative hover:scale-110 transition-transform">
                  <ShoppingCart className="size-5 text-muted-foreground hover:text-primary" />
                  <span className="absolute -top-1 -right-2 bg-primary text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                    3
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="w-72 p-3">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-sm">Your Cart</span>
                    <Link href="/cart" className="text-xs text-primary hover:underline">
                      View all
                    </Link>
                  </div>
                  <div className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-1">
                    <div className="flex items-center justify-between gap-3 bg-muted/30 p-2 rounded-md">
                      <p className="text-sm font-medium line-clamp-2">
                        Web Development Bootcamp
                      </p>
                      <span className="text-sm font-bold">Rp170.000</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 bg-muted/30 p-2 rounded-md">
                      <p className="text-sm font-medium line-clamp-2">
                        Mastering UI/UX Design
                      </p>
                      <span className="text-sm font-bold">Rp120.000</span>
                    </div>
                  </div>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      variant: "secondary",
                      className:
                        "w-full bg-white text-sm text-primary font-semibold mt-2 hover:bg-primary/10 transition-colors",
                    })}
                  >
                    Checkout
                  </Link>
                </div>
              </TooltipContent>
            </Tooltip> */}

            {isPending ? null : session ? (
              <UserDropdown
                email={session.user.email}
                image={
                  session?.user.image ??
                  `https://avatar.vercel.sh/${session?.user.email}`
                }
                name={
                  session?.user.name?.length
                    ? session.user.name
                    : session?.user.email.split("@")[0]
                }
                role={session.user.role as "user" | "admin" | "superadmin"}
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Login
                </Link>
                <Link href="/login" className={buttonVariants()}>
                  Get Started
                </Link>
              </>
            )}

            <ThemeToggle />
          </div>

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <Image src={Logo} className="max-h-8" alt="Selearn" />
                    <span className="text-lg font-semibold tracking-tighter">
                      Selearn
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <Accordion type="single" collapsible className="mt-4 mb-2">
                  <AccordionItem value="courses" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline">
                      Kursus
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid md:grid-cols-2">
                        {courses.map((course, index) => (
                          <a
                            href={course.href}
                            key={index}
                            className="rounded-md p-3 transition-all hover:bg-primary/10"
                          >
                            <p className="mb-1 font-semibold text-foreground">
                              {course.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {course.description}
                            </p>
                          </a>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-4 mt-4">
                  <Link
                    href="/teach-on-selearn"
                    className="font-medium hover:text-primary"
                  >
                    Teach on Selearn
                  </Link>
                  <Link href="#" className="font-medium hover:text-primary">
                    Kontak
                  </Link>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Button variant="outline">Sign in</Button>
                  <Button>Mulai Belajar!</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </motion.header>
  );
};
