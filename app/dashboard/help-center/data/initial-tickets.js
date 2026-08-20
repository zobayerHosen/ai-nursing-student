export const HELP_CATEGORIES = [
    {
        id: "question",
        label: "Questions",
        shortLabel: "Questions",
        iconName: "HelpCircle",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
        accentColor: "#2563EB",
        description: "Academic guidance, nursing course content, NCLEX strategy & study advice."
    },
    {
        id: "technical",
        label: "Technical Problems",
        shortLabel: "Technical",
        iconName: "Wrench",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        accentColor: "#D97706",
        description: "App performance glitches, video playback, tool loading or error messages."
    },
    {
        id: "account",
        label: "Account & Support Issues",
        shortLabel: "Account/Support",
        iconName: "UserCheck",
        badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
        accentColor: "#9333EA",
        description: "Login access, password reset, subscription billing & profile details."
    },
    {
        id: "feedback",
        label: "General Feedback",
        shortLabel: "Feedback",
        iconName: "MessageSquare",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        accentColor: "#059669",
        description: "Feature requests, UI improvement suggestions & platform feedback."
    }
];

export const INITIAL_TICKETS = [
    {
        id: "TKT-9042",
        subject: "Clarification on Pharmacology Beta-Blockers Clinical Rationale",
        category: "question",
        categoryLabel: "Questions",
        priority: "High",
        status: "In Progress",
        userName: "John Doe",
        userEmail: "john.doe@example.com",
        createdAt: "2026-08-19T14:32:00Z",
        updatedAt: "2026-08-20T08:15:00Z",
        assignedAgent: "Dr. Sarah Jenkins (Pharmacology Specialist)",
        description: "I was working through the Pharmacology module on Beta-1 vs Beta-2 selective blockers. Could you explain why propranolol is contraindicated in asthmatic patients in the context of NextGen NCLEX case studies?",
        attachment: null,
        messages: [
            {
                id: "msg-1",
                sender: "user",
                senderName: "John Doe",
                text: "I was working through the Pharmacology module on Beta-1 vs Beta-2 selective blockers. Could you explain why propranolol is contraindicated in asthmatic patients in the context of NextGen NCLEX case studies?",
                timestamp: "2026-08-19T14:32:00Z"
            },
            {
                id: "msg-2",
                sender: "admin",
                senderName: "Dr. Sarah Jenkins (Support)",
                text: "Great question! Propranolol is a non-selective beta-blocker. It inhibits both Beta-1 (cardiac) and Beta-2 (bronchial smooth muscle) receptors. Blocking Beta-2 receptors leads to bronchoconstriction, which can trigger severe asthma attacks. For NCLEX questions, cardioselective agents like Metoprolol or Atenolol are preferred for patients with respiratory co-morbidities.",
                timestamp: "2026-08-20T08:15:00Z"
            }
        ]
    },
    {
        id: "TKT-8819",
        subject: "Video Playback Error on Mobile Safari (Error Code #4032)",
        category: "technical",
        categoryLabel: "Technical Problems",
        priority: "Medium",
        status: "Open",
        userName: "Sarah Connor",
        userEmail: "sarah.c@example.com",
        createdAt: "2026-08-20T07:10:00Z",
        updatedAt: "2026-08-20T07:10:00Z",
        assignedAgent: "Alex Rivera (Tech Support)",
        description: "When trying to open the Dosage Calculation video lessons on Safari for iOS, the stream buffers continuously and shows Error #4032. Desktop Chrome works fine.",
        attachment: "safari_screenshot_error.png",
        messages: [
            {
                id: "msg-1",
                sender: "user",
                senderName: "Sarah Connor",
                text: "When trying to open the Dosage Calculation video lessons on Safari for iOS, the stream buffers continuously and shows Error #4032. Desktop Chrome works fine.",
                timestamp: "2026-08-20T07:10:00Z"
            }
        ]
    },
    {
        id: "TKT-7651",
        subject: "Request for Annual Subscription Invoice & Tax Receipt",
        category: "account",
        categoryLabel: "Account & Support Issues",
        priority: "Low",
        status: "Resolved",
        userName: "Marcus Vance",
        userEmail: "marcus.vance@example.com",
        createdAt: "2026-08-17T11:20:00Z",
        updatedAt: "2026-08-18T16:05:00Z",
        assignedAgent: "Mark Davis (Billing Team)",
        description: "Need an itemized invoice showing VAT/tax details for my nursing school reimbursement program.",
        attachment: null,
        messages: [
            {
                id: "msg-1",
                sender: "user",
                senderName: "Marcus Vance",
                text: "Need an itemized invoice showing VAT/tax details for my nursing school reimbursement program.",
                timestamp: "2026-08-17T11:20:00Z"
            },
            {
                id: "msg-2",
                sender: "admin",
                senderName: "Mark Davis (Billing)",
                text: "Hello Marcus, I have generated your itemized official receipt with school reimbursement formatting and sent it to marcus.vance@example.com. You can also download it under Settings > Billing.",
                timestamp: "2026-08-18T16:05:00Z"
            }
        ]
    },
    {
        id: "TKT-6540",
        subject: "Suggestion: Add Dark Mode Toggle to Concept Map Tool",
        category: "feedback",
        categoryLabel: "General Feedback",
        priority: "Low",
        status: "Resolved",
        userName: "Elena Rostova",
        userEmail: "elena.r@example.com",
        createdAt: "2026-08-15T09:45:00Z",
        updatedAt: "2026-08-16T14:00:00Z",
        assignedAgent: "Product Experience Team",
        description: "Loving the new Concept Map interactive visualizer! It would be amazing to have a high-contrast dark theme mode for late-night study sessions.",
        attachment: null,
        messages: [
            {
                id: "msg-1",
                sender: "user",
                senderName: "Elena Rostova",
                text: "Loving the new Concept Map interactive visualizer! It would be amazing to have a high-contrast dark theme mode for late-night study sessions.",
                timestamp: "2026-08-15T09:45:00Z"
            },
            {
                id: "msg-2",
                sender: "admin",
                senderName: "Product Experience Team",
                text: "Thank you for the awesome feedback, Elena! Our engineering team has added this to our Q3 roadmap.",
                timestamp: "2026-08-16T14:00:00Z"
            }
        ]
    }
];

export const FAQ_ITEMS = [
    {
        category: "question",
        question: "How are the practice questions aligned with the NextGen NCLEX format?",
        answer: "All STEMRN question banks are built according to NGN clinical judgment model guidelines, featuring NGN case studies, drop-down cloze items, matrix grids, and bow-tie questions."
    },
    {
        category: "technical",
        question: "What should I do if a interactive quiz module fails to load?",
        answer: "First, ensure your web browser is updated to the latest version. Clear cache/cookies or try Incognito mode. If the issue persists, submit a Technical Problem ticket with your device details."
    },
    {
        category: "account",
        question: "How do I update my email, password, or subscription settings?",
        answer: "Navigate to your Dashboard > Settings page. There you can change account details, manage your billing method, and configure notification preferences."
    },
    {
        category: "feedback",
        question: "Where can I submit ideas or report content errors in questions?",
        answer: "Select 'General Feedback' or 'Questions' in the Help Center form above. You can specify whether it is a tool improvement suggestion or content clarification."
    }
];
