import { ImageIcon, BookOpen, Table2 } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

// Note: home page stemrn tab buttons data start
export const tabsButtons = [
    {
        id: "image",
        label: "Diagram",
        icon: ImageIcon,
    },
    {
        id: "definition",
        label: "Definition",
        icon: BookOpen,
    },
    {
        id: "table",
        label: "Compare",
        icon: Table2,
    },
];

export const anginaTypes = [
    {
        title: "Stable Angina",
        description:
            "Predictable chest pain triggered by physical exertion or stress.",
    },
    {
        title: "Unstable Angina",
        description:
            "Occurs at rest or unpredictably and carries a high risk of myocardial infarction.",
    },
    {
        title: "Prinzmetal's Angina",
        description:
            "Caused by coronary vasospasm, often occurring at night or early morning.",
    },
];

export const comparisonTableData = [
    {
        feature: "Duration",
        angina: "< 15 min",
        mi: "> 20 min",
    },
    {
        feature: "Rest relief",
        angina: "✓ Yes (stable)",
        mi: "✗ No",
    },
    {
        feature: "Nitro relief",
        angina: "✓ Yes",
        mi: "✗ No",
    },
    {
        feature: "Troponin",
        angina: "Normal",
        mi: "Elevated",
    },
    {
        feature: "ECG",
        angina: "ST depression (transient)",
        mi: "ST elevation (STEMI)",
    },
    {
        feature: "Damage",
        angina: "None",
        mi: "Permanent necrosis",
    },
];
// Note: home page stemrn tab buttons data ends here


// Note: visual notes data start
import visualNotesImg01 from "@/public/assets/visual-notes-img01.png";
import visualNotesImg02 from "@/public/assets/visual-notes-img02.png";
import visualNotesImg03 from "@/public/assets/visual-notes-img03.png";

export const notesData = [
    {
        id: 1,
        image: visualNotesImg01,
        category: "Neuro - Stroke",
        title: "Stroke Alert: CT First, No Contrast",
        description:
            "Why CT-without-contrast comes before tPA — and the FAST checklist.",
    },
    {
        id: 2,
        image: visualNotesImg02,
        category: "OB - High-Risk",
        title: "Placenta Previa: Look, Don't Touch",
        description:
            "No digital exams. Bedside priorities + previa vs. abruptio at a glance.",
    },
    {
        id: 3,
        image: visualNotesImg03,
        category: "Pharm - Emergency",
        title: "Serotonin Syndrome vs NMS",
        description:
            "Sertraline + tramadol = trouble. Spot SS vs. NMS in seconds.",
    },
];
// Note: visual notes data end


// Note: footer data start here
export const platformLinks = [
    {
        title: "NCLEX Prep",
        href: "/nclex-prep",
    },
    {
        title: "Flashcards",
        href: "/flashcards",
    },
    {
        title: "CARA AI Tutor",
        href: "/cara-ai-tutor",
    },
    {
        title: "Study Notes",
        href: "/study-notes",
    },
];

export const companyLinks = [
    {
        title: "About Us",
        href: "/about-us",
    },
    {
        title: "Blog",
        href: "/blog",
    },
    {
        title: "Pricing",
        href: "/pricing",
    },
];

export const legalLinks = [
    {
        title: "Terms of Use",
        href: "/terms-of-use",
    },
    {
        title: "Privacy Policy",
        href: "/privacy-policy",
    },
    {
        title: "CA Residents",
        href: "/ca-residents",
    },
    {
        title: "HIPAA Notice",
        href: "/hipaa-notice",
    },
];

export const socialLinks = [
    {
        icon: <FaFacebookF />,
        href: "#",
    },
    {
        icon: <FaLinkedinIn />,
        href: "#",
    },
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