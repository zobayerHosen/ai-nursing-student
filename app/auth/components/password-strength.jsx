"use client";
import { useMemo } from "react";

const getPasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score; // 0 - 4
};


const strengthLabel = ["Weak", "Weak", "Medium", "Good", "Strong"][strength];
const strengthColor = ["#ff4d4f", "#ff4d4f", "#faad14", "#52c41a", "#16a34a"][strength];
