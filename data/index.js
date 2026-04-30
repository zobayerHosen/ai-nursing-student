import { ImageIcon, BookOpen, Table2, Play, DollarSign, MessageSquare, Book, Mic, Award, Globe, Shield, PanelTop, User } from "lucide-react";
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


// Note: AI tools data start here
export const tools = [
    {
        key: "my-tutor",
        featured: true,
        name: "My Tutor — CARA",
        description:
            "Ask CARA anything about nursing — pharmacology, pathophysiology, clinical reasoning. She explains concepts the way a patient professor would, not like a textbook.",
    },
    {
        key: "flashcard",
        name: "Notes to Flashcard",
        description:
            "Upload your class notes and get a ready-to-study flashcard deck in seconds. Built with spaced repetition so you actually remember what you review.",
    },
    {
        key: "quiz",
        name: "Notes to Quiz",
        description:
            "Turn your own lecture notes into NCLEX-style practice quizzes instantly. Perfect for testing yourself on the exact material your professor covered.",
    },
    {
        key: "research",
        name: "Research Paper",
        description:
            "Get nursing research help that cites real evidence-based sources, not made-up references. Structure, tone, and clinical accuracy — all in one tool.",
    },
    {
        key: "checker",
        name: "Assignment Checker",
        description:
            "Submit with confidence. STEM RN reviews your work for grammar, structure, and clinical accuracy before your professor ever sees it.",
    },
    {
        key: "careplan",
        name: "Care Plan Builder",
        description:
            "Build complete NANDA-formatted care plans in minutes instead of hours. Includes nursing diagnoses, interventions, rationales, and expected outcomes — all editable.",
    },
    {
        key: "drugs",
        name: "Drug Cards",
        description:
            "Generate a complete drug card for any medication — mechanism, dosing, side effects, nursing considerations. Perfect for clinical prep or quick reference on the floor.",
    },
    {
        key: "charting",
        name: "Charting Coach",
        description:
            "Master SOAP, SBAR, and DAR charting with real-time AI feedback. Learn to document like a seasoned nurse from the first shift.",
    },
    {
        key: "labs",
        name: "Labs Interpretation",
        description:
            "Paste any lab value and get instant clinical interpretation in plain English. Understand what's normal, what's concerning, and what nursing action to take.",
    },
    {
        key: "concept",
        name: "Concept Map",
        description:
            "Visualize how diseases, symptoms, treatments, and complications connect. Perfect for visual learners who need to see the big picture before the details click.",
    },
];
// Note: AI tools data end here



// Note: pricing data start here
import { Calendar, Clock3, Star } from "lucide-react";
export const plans = [
    {
        id: 1,
        icon: <Calendar className="h-[22px] w-[22px]" />,
        kicker: "NCLEX-RN Review",
        name: "30-Day Access",
        price: "$59",
        pricePer: "/ one-time",
        priceSub: "Test in 30 days? Start here.",
        paymentAmount: "$15/mo",
        buttonText: "Buy Access",
        featured: false,
        features: [
            "10,000+ NCLEX questions",
            "5,000 verified flashcards",
            "Unlimited CARA AI tutor",
            "Lecture recording (5 hrs total)",
            "All 13 AI clinical tools",
            "No auto-renew",
        ],
    },
    {
        id: 2,
        icon: <Clock3 className="h-[22px] w-[22px]" />,
        kicker: "NCLEX-RN Review",
        name: "90-Day Access",
        strikePrice: "$149",
        price: "$129",
        priceSub: "$43/mo effective · save $20",
        paymentAmount: "$32/mo",
        buttonText: "Buy Access",
        featured: false,
        features: [
            "10,000+ NCLEX questions",
            "5,000 verified flashcards",
            "Unlimited CARA AI tutor",
            "Lecture recording — 10 hrs/mo",
            "All 13 AI clinical tools",
            "Progress tracking & readiness score",
        ],
    },
    {
        id: 3,
        icon: <Star className="h-[22px] w-[22px]" />,
        kicker: "NCLEX-RN Review",
        name: "Annual Access",
        strikePrice: "$479",
        price: "$249",
        priceSub: "$20.75/mo effective · full year",
        paymentAmount: "$22/mo",
        buttonText: "Start 7-Day Free Trial",
        featured: true,
        badge: "Most Popular · Save 48%",
        features: [
            "10,000+ NCLEX questions (NGN-ready)",
            "5,000 verified flashcards",
            "Unlimited CARA AI tutor",
            "Lecture recording — 10 hrs/mo",
            "All 13 AI clinical tools",
            "Study Notes, Body Systems, ECG Mastery",
            "Progress tracking & readiness score",
            "Priority support",
        ],
    },
    {
        id: 4,
        icon: <Clock3 className="h-[22px] w-[22px]" />,
        kicker: "NCLEX-RN Review",
        name: "Monthly",
        price: "$29",
        pricePer: ".99/month",
        priceSub: "Cancel anytime · month-to-month",
        paymentLabel: "Flexible billing",
        paymentText: "Billed monthly · cancel in dashboard",
        buttonText: "Start 7-Day Free Trial",
        featured: false,
        features: [
            "10,000+ NCLEX questions",
            "5,000 verified flashcards",
            "Unlimited CARA AI tutor",
            "Lecture recording — 10 hrs/mo",
            "All 13 AI clinical tools",
            "Progress tracking & readiness score",
        ],
    },
];
// Note: pricing data end here


// Note:  FAQ DATA START HERE
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

    {
        id: "cara-ai",
        title: "CARA AI Tutor",
        description: "Meet your 24/7 Clinical Adaptive Response Assistant.",
        icon: <MessageSquare />,
        faqs: [
            {
                question: "What is CARA?",
                answer: `CARA stands for Clinical Adaptive Response Assistant. She is STEMRN’s AI tutor trained specifically on NCLEX content, clinical judgment, pharmacology, pathophysiology, and patient care scenarios.`,
            },
            {
                question: "Is CARA really unlimited?",
                answer: `Yes. All paid plans include unlimited text conversations with CARA AI.`,
            },
            {
                question: "Can CARA replace a human tutor?",
                answer: `For most NCLEX prep situations, yes. CARA is available 24/7 and explains concepts conversationally.`,
            },
        ],
    },

    {
        id: "content-features",
        title: "Content & Features",
        description: "What's inside the platform?",
        icon: <Book />,
        faqs: [
            {
                question: "How many NCLEX questions are in the bank?",
                answer: `STEMRN includes more than 10,000 NCLEX-style questions including NGN formats, prioritization, pharmacology, and case studies.`,
            },
            {
                question: "What are the 13 AI-powered clinical tools?",
                answer: `STEMRN includes tools like My Tutor, Lecture Notes, Notes to Flashcards, Notes to Quiz, Drug Cards, Concept Maps, Labs Interpretation, and more.`,
            },
            {
                question: "Can I create custom quizzes?",
                answer: `Yes. You can build quizzes by topic, difficulty, question type, or weak areas identified by CARA.`,
            },
        ],
    },

    {
        id: "lecture-recording",
        title: "Lecture Recording",
        description: "Turn your class lectures into study notes automatically.",
        icon: <Mic />,
        faqs: [
            {
                question: "How does the lecture recording feature work?",
                answer: `Record lectures directly inside STEMRN and instantly receive transcripts and organized study notes.`,
            },
            {
                question: "How long can lectures be?",
                answer: `Individual lectures can be up to 3 hours long depending on your subscription plan.`,
            },
            {
                question: "Can I upload pre-recorded lectures?",
                answer: `Yes. STEMRN supports MP3, WAV, M4A, and MP4 uploads for transcription and note generation.`,
            },
        ],
    },

    {
        id: "nclex-success",
        title: "NCLEX Success",
        description: "Will STEMRN actually help me pass?",
        icon: <Award />,
        faqs: [
            {
                question: "Is STEMRN aligned with NGN?",
                answer: `Yes. STEMRN was built specifically for the Next Generation NCLEX with all NGN question formats included.`,
            },
            {
                question: "Can repeat test-takers use STEMRN?",
                answer: `Absolutely. STEMRN is especially useful for students struggling with clinical judgment and test-taking strategies.`,
            },
            {
                question: "Can I use STEMRN with UWorld or Archer?",
                answer: `Yes. Many students combine STEMRN with additional question banks closer to their exam date.`,
            },
        ],
    },

    {
        id: "technical",
        title: "Technical",
        description: "Browser support, offline access, and device questions.",
        icon: <Globe />,
        faqs: [
            {
                question: "What browsers does STEMRN support?",
                answer: `STEMRN supports Chrome, Safari, Firefox, and Edge on all modern devices.`,
            },
            {
                question: "Can I use STEMRN offline?",
                answer: `Currently, STEMRN requires an internet connection because AI tools use live APIs.`,
            },
            {
                question: "Is there a mobile app?",
                answer: `Native iOS and Android apps are currently in development for late 2026.`,
            },
        ],
    },

    {
        id: "privacy-security",
        title: "Privacy & Security",
        description: "How we handle your data.",
        icon: <Shield />,
        faqs: [
            {
                question: "Is my data safe?",
                answer: `Yes. STEMRN uses encryption at rest, TLS encryption in transit, and secure database infrastructure.`,
            },
            {
                question: "Do you sell my data?",
                answer: `No. STEMRN never sells user data or study information.`,
            },
            {
                question: "Can I delete my account?",
                answer: `Yes. Accounts and data can be permanently deleted from the settings page.`,
            },
        ],
    },

    {
        id: "billing-refunds",
        title: "Billing & Refunds",
        description: "Subscription questions and our refund policy.",
        icon: <PanelTop />,
        faqs: [
            {
                question: "How do I cancel my subscription?",
                answer: `Go to Settings → Billing → Cancel Subscription. Access remains active until the billing period ends.`,
            },
            {
                question: "What's your refund policy?",
                answer: `Annual plans include a refund window and all paid plans include a free trial period.`,
            },
            {
                question: "Can I switch plans later?",
                answer: `Yes. Upgrades are prorated and downgrades take effect at the end of the current billing period.`,
            },
        ],
    },

    {
        id: "about-stemrn",
        title: "About STEMRN",
        description: "The story behind the platform.",
        icon: <User />,
        faqs: [
            {
                question: "Who built STEMRN?",
                answer: `STEMRN was founded by Captain Tonny P, a Public Health Nurse and US Army Captain.`,
            },
            {
                question: "What does STEMRN mean?",
                answer: `STEMRN combines STEM + RN while also symbolizing stem cells and foundational nursing knowledge.`,
            },
            {
                question: "How can I contact the team?",
                answer: `You can contact STEMRN through hello@stemrn.com or Instagram @stemrn_nclex.`,
            },
        ],
    },
];
// Note:  FAQ DATA END HERE




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