import Link from "next/link";
import React from "react";

const footerLinks = [
  {
    title: "Tools",
    links: [
      { href: "/", label: "Bypass AI Detection" },
      { href: "/", label: "Humanize AI" },
      { href: "/", label: "Anti AI Detector" },
      { href: "/", label: "Undetectable AI" },
      { href: "/", label: "Plagiarism Remover" },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/refund-policy", label: "Refund Policy" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

const languages = [
  { href: "/es", label: "Español" },
  { href: "/fr", label: "Français" },
  { href: "/pt", label: "Português" },
  { href: "/it", label: "Italiano" },
  { href: "/ja", label: "日本語" },
  { href: "/th", label: "ภาษาไทย" },
  { href: "/pl", label: "Polski" },
  { href: "/ko", label: "한국어" },
  { href: "/de", label: "Deutsch" },
  { href: "/ru", label: "Русский" },
  { href: "/da", label: "Dansk" },
  { href: "/ar", label: "العربية" },
  { href: "/nb", label: "Norsk bokmål" },
  { href: "/nl", label: "Nederlands" },
  { href: "/id", label: "Bahasa Indonesia" },
  { href: "/tw", label: "繁體中文" },
  { href: "/zh", label: "简体中文" },
  { href: "/tr", label: "Türkçe" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/GrubbyAI",
    iconClass: "/images/facebook-logo.png",
  },
  {
    href: "https://twitter.com/GrubbyAI",
    iconClass: "/images/twitter-logo.png",
  },
];

export default function Footer() {
  return (
    <footer className="text-display-secondary border-t border-[#DBD9FB] pb-6 pt-9 md:pb-0 md:pt-6">
      <div className="mx-auto grid max-w-[1232px] lg:grid-cols-[1fr_max(200px)_1fr_239px] items-start justify-between lg:gap-x-[160px] px-4  md:justify-center md:gap-5 grid-cols-2 gap-8">
        {footerLinks.map((section) => (
          <div key={section.title} className="space-y-3">
            <p className="font-bold text-[#1B1746]">{section.title}</p>
            <ul className="space-y-3 text-sm">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    className="hover:text-blue-600 text-[#555272]"
                    href={link.href}>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="max-w-[240px]">
          <div className=" md:mx-auto">
            <p className="pb-3 font-bold text-[#1B1746]">Follow us:</p>
            <ul className="flex flex-wrap gap-x-3 md:mx-auto">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    rel="nofollow"
                    target="_blank"
                    className="group"
                    href={link.href}>
                    <img
                      src={link.iconClass}
                      className={`block  hover:text-primary h-6 w-6`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="pt-8 text-sm md:border-none md:text-center">
              © 2024 GrubbyAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-9 flex w-full max-w-[1200px] items-center justify-center gap-8 lg:rounded-full bg-[#EEEDFD] py-[10px] text-[#1B1746] md:flex-col md:gap-2 lg:gap-4 lg:px-4">
        <a className="text-[22px] leading-tight" href="/">
          <img className="w-[120px]" src="/images/grubby-logo.png" alt="" />
        </a>
        <div className="xs:text-center flex items-center gap-1 text-sm font-semibold md:text-xs">
          <span className="i-cus--a-star xs:hidden h-[18px] w-[18px] shrink-0 md:h-3 md:w-3"></span>
          <p>Make your AI text 100% undetectable with a trusted AI bypasser.</p>
        </div>
      </div>
    </footer>
  );
}
