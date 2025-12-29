"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import logo from "@/public/logo-selearn.svg";

const footerConfig = {
  description:
    "Selearn mempertemukan pelajar dan pengajar dalam satu platform. Belajar jadi lebih mudah, seru, dan bermanfaat untuk masa depanmu.",
  logo: {
    dark: logo,
    light: logo,
  },
  contact: {
    email: "info@selearn.com",
    phone: "+62 851-8972-2630",
  },
  socials: [
    { icon: Linkedin, href: "/" },
    { icon: Youtube, href: "/" },
    { icon: Instagram, href: "https://www.instagram.com/selearn.academy" },
    { icon: Facebook, href: "/" },
  ],
  columns: [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about-us" },
        { label: "Careers", href: "/careers" },
        { label: "Press & Media", href: "/press-media" },
        { label: "Blog", href: "/blog" },
        { label: "Our Team", href: "/our-team" },
        { label: "Events", href: "/events" },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "Courses", href: "/courses" },
        // { label: "Pricing", href: "#" },
        { label: "Instructors", href: "/instructors" },
        // { label: "Features", href: "#" },
        // { label: "Mobile App", href: "#" },
        { label: "Changelog", href: "/changelog" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Guides", href: "/guides" },
        { label: "Help Center & FAQs", href: "/help-center-faq" },
        { label: "Community Forum", href: "/community-forum" },
        // { label: "FAQs", href: "#" },
        // { label: "Student Success Stories", href: "#" },
        // { label: "Teaching Resources", href: "#" },
      ],
    },
    {
      title: "Partnership",
      links: [
        { label: "Become a Partner", href: "/become-partner" },
        // { label: "Affiliate Program", href: "#" },
        // { label: "Reseller Program", href: "#" },
        { label: "Corporate Training", href: "/corporate-training" },
        { label: "Academic Partners", href: "/academic-partners" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-service" },
        { label: "Security", href: "/security" },
        { label: "Cookie Policy", href: "/cookie-policy" },
      ],
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white px-5 lg:px-17 py-14 border-t border-gray-200 dark:border-gray-800">
      <div className="w-full mx-auto">
        {/* Top Section: Logo and Description */}
        <div className="mb-12">
          {/* Logo with dark/light mode support */}
          <div className="relative mb-6">
            <Image
              src={footerConfig.logo.dark}
              alt="Selearn"
              width={180}
              height={50}
              className="h-auto w-10 dark:block hidden"
            />
            <Image
              src={footerConfig.logo.light}
              alt="Selearn"
              width={180}
              height={50}
              className="h-auto w-10 dark:hidden block"
            />
            <span className="text-xl font-semibold text-primary">Selearn</span>
          </div>
          <h3 className="text-xl font-semibold text-primary italic">
            Saat Belajar Membuka Kesempatan Baru
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
            {footerConfig.description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
          {/* Left Side: Links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 flex-1">
            {footerConfig.columns.map((col, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-medium mb-3">{col.title}</h3>
                <ul className="space-y-2">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-[0.85rem] text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Side: Newsletter and Contact */}
          <div className="lg:w-1/4">
            {/* Contact */}
            <Card className="shadow-none border-none mb-4 dark:bg-transparent">
              <CardContent className="p-0 space-y-3">
                <p className="text-sm font-medium">
                  For Corporates & Universities
                </p>
                <form className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full bg-gray-200 border border-gray-400 text-gray-600 hover:text-white"
                    asChild
                  >
                    <Link href="/contact">Get In Touch</Link>
                  </Button>
                </form>
              </CardContent>
            </Card>
            {/* Quick Links & Resources */}
            <Card className="shadow-none border-none mb-4 dark:bg-transparent">
              <CardContent className="p-0">
                <p className="text-sm font-medium mb-3">Quick Links</p>
                <div className="space-y-2">
                  {/* <Link
                    href="#"
                    className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition">
                    Documentation
                  </Link> */}
                  <Link
                    href="/courses"
                    className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
                  >
                    Getting Started
                  </Link>
                  <Link
                    href="/community-forum"
                    className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
                  >
                    Community Forum
                  </Link>
                  <Link
                    href="/guides"
                    className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
                  >
                    Tutorials
                  </Link>
                  <Link
                    href="/courses"
                    className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
                  >
                    Browse Courses
                  </Link>
                </div>

                {/* Social Links */}
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium mb-2">Follow Us</p>
                  <div className="flex gap-3">
                    {footerConfig.socials.map(({ icon: Icon, href }, idx) => (
                      <Link
                        key={idx}
                        href={href}
                        className="text-gray-500 hover:text-blue-500 transition"
                      >
                        <Icon className="w-4 h-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400 gap-4">
          <span>
            © {new Date().getFullYear()} Selearn. All rights reserved. Supported
            & Powered by <a href="https://www.wheelbox.tech" target="_blank" className="font-bold">Wheelbox</a>
          </span>
          <div className="flex gap-6">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
