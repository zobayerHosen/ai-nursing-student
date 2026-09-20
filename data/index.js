import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

import rootImg1 from "@/public/assets/root1.png";
import rootImg2 from "@/public/assets/root2.png";
import rootImg3 from "@/public/assets/root3.png";
import rootImg4 from "@/public/assets/root4.png";

import { Play, DollarSign } from "lucide-react";

// Note: roots section data start
export const rootsData = [
  {
    icon: rootImg1,
    bgColor: "bg-[#EAFBF5]",
    title: "Practice",
    desc: `2,000+ NGN-style items across every case type the new NCLEX throws at you —
bowtie, matrix, cloze, extended multiple
response. CARA explains the why behind
every answer.`,
  },
  {
    icon: rootImg2,
    bgColor: "bg-[#FFF0F3]",
    title: "Knowledge",
    desc: `Full coverage of all 8 NCLEX client need
categories across 17 specialties, taught the
way nurses actually think —
pathophysiology assessment
intervention rationale.`,
  },
  {
    icon: rootImg3,
    bgColor: "bg-[#EBF3FE]",
    title: "Strategy",
    desc: `The frameworks that turn a 50/50 into a
confident answer. Maslow, ABCs, safety-
first, SATA anchoring, priority-setting.`,
  },
  {
    icon: rootImg4,
    bgColor: "bg-[#F4ECFB]",
    title: "Organization",
    desc: `CARA builds your study plan, tracks your
weak spots, and adjusts daily. You show
up; the system handles the rest.`,
  },
];

// Note: roots section data end

// Note: FAQ DATA START HERE
export const faqSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "New to STEMRN? Start here.",
    icon: <Play />,
    faqs: [
      {
        question: "What is STEMRN, exactly?",
        answer: `STEMRN is an AI-powered NCLEX-RN preparation platform built by a military-trained registered nurse. It combines a 10,000+ question bank, 5,000 verified flashcards, 13 AI-driven clinical tools, and CARA — your personal Clinical Adaptive Response Assistant.`,
      },
      {
        question: "How do I sign up and start using STEMRN?",
        answer: `Getting started takes under 2 minutes. Click “Start Free Today”, create your account, complete your onboarding assessment, and begin studying immediately.`,
      },
      {
        question: "Do I need to be in nursing school to use STEMRN?",
        answer: `No. STEMRN works for current students, repeat test takers, internationally educated nurses, and practicing nurses refreshing their knowledge.`,
      },
    ],
  },

  {
    id: "pricing-plans",
    title: "Pricing & Plans",
    description: "How much does it cost, and what's included?",
    icon: <DollarSign />,
    faqs: [
      {
        question: "How much does STEMRN cost?",
        answer: `STEMRN offers Monthly, 30-Day, 90-Day, and Annual plans with full feature access included in every tier.`,
      },
      {
        question: "Is there a free plan?",
        answer: `Yes. The free plan includes daily NCLEX questions, flashcard previews, and limited CARA AI access.`,
      },
      {
        question: "How does the 7-day free trial work?",
        answer: `All paid plans except the 30-Day plan include a full 7-day free trial with access to every feature.`,
      },
    ],
  },
];
// Note: FAQ DATA END HERE

// Note: footer data start here
export const platformLinks = [
  {
    title: "NCLEX Prep",
    href: "/dashboard/nclex-exam",
  },
  {
    title: "Flashcards",
    href: "/dashboard/flashcards",
  },
  {
    title: "CARA AI Tutor",
    href: "/dashboard/my-tutor",
  },
  {
    title: "Study Notes",
    href: "/dashboard/study-notes",
  },
];

export const companyLinks = [
  {
    title: "About Us",
    href: "/about-us",
  },
  // {
  //   title: "Blog",
  //   href: "/blog-page",
  // },
  {
    title: "Pricing",
    href: "#pricing",
  },
];

export const legalLinks = [
  {
    title: "Terms of Use",
    href: "/terms-conditions",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
  // {
  //   title: "CA Residents",
  //   href: "#",
  // },
  // {
  //   title: "HIPAA Notice",
  //   href: "#",
  // },
];

export const socialLinks = [
  {
    icon: <FaFacebookF />,
    href: "#",
  },
  // {
  //   icon: <FaLinkedinIn />,
  //   href: "#",
  // },
  {
    icon: <FaTwitter />,
    href: "#",
  },
  {
    icon: <FaYoutube />,
    href: "#",
  },
  {
    icon: <FaInstagram />,
    href: "#",
  },
];

export const footerSections = [
  {
    heading: "Platform",
    links: platformLinks,
  },
  {
    heading: "Company",
    links: companyLinks,
  },
  {
    heading: "Legal",
    links: legalLinks,
  },
];
// Note: footer data end