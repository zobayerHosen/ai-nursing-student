export const dosageDetailsData = {
    "basic-dosage-calculations": {
        title: "Basic Dosage Calculations",
        subtitle: "Review essential math skills and foundational formulas required for accurate medication dosage calculation.",
        sections: [
            {
                heading: "1. The Universal Formula",
                content: "The standard formula for calculating medication dosages is: (Desired Dose / Dose on Hand) * Quantity.",
                bullets: [
                    "Desired Dose (D): The amount of medication ordered by the provider.",
                    "Dose on Hand (H): The amount of medication supplied or available.",
                    "Quantity (Q): The unit of measure containing the dose on hand (e.g., 1 tablet, 5 mL).",
                    "Formula: (D / H) * Q = Amount to Administer (X)."
                ]
            },
            {
                heading: "2. Example Calculation",
                content: "Order: Amoxicillin 500 mg PO. Supplied: Amoxicillin 250 mg capsules.",
                bullets: [
                    "D = 500 mg",
                    "H = 250 mg",
                    "Q = 1 capsule",
                    "Calculation: (500 / 250) * 1 = 2 capsules."
                ]
            }
        ]
    },
    "iv-drip-rates": {
        title: "IV Drip Rates",
        subtitle: "Determine the correct rate of infusion for intravenous fluids and medications.",
        sections: [
            {
                heading: "1. mL per Hour (mL/hr) via Infusion Pump",
                content: "When using an electronic infusion pump, the rate is set in mL/hr.",
                bullets: [
                    "Formula: Total Volume (mL) / Total Time (hours) = Rate in mL/hr.",
                    "Example: Order is 1,000 mL Normal Saline over 8 hours.",
                    "Calculation: 1,000 mL / 8 hr = 125 mL/hr."
                ]
            },
            {
                heading: "2. Drops per Minute (gtt/min) via Gravity",
                content: "When an infusion pump is not available, calculate the drip rate based on the tubing's drop factor.",
                bullets: [
                    "Formula: (Total Volume (mL) / Total Time (minutes)) * Drop Factor (gtt/mL) = Rate in gtt/min.",
                    "Macrodrip tubing: Typically 10, 15, or 20 gtt/mL.",
                    "Microdrip tubing: Always 60 gtt/mL.",
                    "Example: 1,000 mL over 8 hours (480 mins) with 15 gtt/mL tubing.",
                    "Calculation: (1,000 / 480) * 15 = 31.25 -> 31 gtt/min (always round to a whole number for drops)."
                ]
            }
        ]
    },
    "weight-based-dosing": {
        title: "Weight-Based Dosing",
        subtitle: "Calculations based on the patient's body weight, commonly used for critical care medications and pediatric patients.",
        sections: [
            {
                heading: "1. Weight-Based Calculations",
                content: "Dosages are commonly prescribed based on weight in kilograms (mg/kg or mcg/kg).",
                bullets: [
                    "Step 1: Convert weight from pounds to kilograms (divide by 2.2).",
                    "Step 2: Multiply the weight in kg by the ordered dose (e.g., mg/kg).",
                    "Step 3: Determine if the calculated dose is within the safe dosage range."
                ]
            }
        ]
    },
    "pediatric-dosages": {
        title: "Pediatric Dosages",
        subtitle: "Safely calculate medication dosages for children, ensuring doses fall within therapeutic safety margins.",
        sections: [
            {
                heading: "1. Safe Range Example",
                content: "Order: Ibuprofen 10 mg/kg PO every 6 hours. Child weighs 44 lbs.",
                bullets: [
                    "Weight in kg: 44 / 2.2 = 20 kg.",
                    "Calculated Dose: 10 mg/kg * 20 kg = 200 mg.",
                    "Check Reference: Safe range is 5-10 mg/kg/dose. The calculated dose is safe."
                ]
            }
        ]
    },
    "unit-conversions": {
        title: "unit Conversions",
        subtitle: "Master the standard units of measurement and their equivalents in the metric, apothecary, and household systems.",
        sections: [
            {
                heading: "1. Metric System Equivalents",
                table: [
                    { test: "Weight", range: "1 kg = 1,000 g", significance: "Used for body weight and large medication doses." },
                    { test: "Weight", range: "1 g = 1,000 mg", significance: "Standard unit for many solid medications." },
                    { test: "Weight", range: "1 mg = 1,000 mcg", significance: "Used for highly potent medications." },
                    { test: "Volume", range: "1 L = 1,000 mL", significance: "Used for IV fluids and large liquid measurements." }
                ]
            },
            {
                heading: "2. Household Equivalents",
                table: [
                    { test: "Volume", range: "1 tsp = 5 mL", significance: "Common for pediatric liquid medications." },
                    { test: "Volume", range: "1 tbsp = 15 mL", significance: "Used for adult liquid medications (1 tbsp = 3 tsp)." },
                    { test: "Volume", range: "1 oz = 30 mL", significance: "Common fluid measurement." },
                    { test: "Volume", range: "1 cup = 240 mL", significance: "Used for intake and output calculations (8 oz)." }
                ]
            }
        ]
    },
    "insulin-calculations": {
        title: "Insulin Calculations",
        subtitle: "Learn to properly calculate and mix insulin dosages, and adjust dosing based on sliding scales.",
        sections: [
            {
                heading: "1. Insulin Syringes",
                content: "Insulin is measured in Units and must only be drawn up in a designated insulin syringe.",
                bullets: [
                    "U-100 insulin means there are 100 Units of insulin per 1 mL.",
                    "Standard insulin syringes hold 30, 50, or 100 Units.",
                    "Always have another nurse verify insulin doses before administration."
                ]
            },
            {
                heading: "2. Mixing Insulins",
                content: "When mixing regular (short-acting) and NPH (intermediate-acting) insulins:",
                bullets: [
                    "Inject air into the NPH (cloudy) vial first.",
                    "Inject air into the Regular (clear) vial next.",
                    "Draw up the Regular (clear) insulin first.",
                    "Draw up the NPH (cloudy) insulin last ('Clear before Cloudy')."
                ]
            }
        ]
    },
    "concentration-and-dilution": {
        title: "Concentration & Dilution",
        subtitle: "Calculate final concentrations for IV pushes and medicated drips.",
        sections: [
            {
                heading: "1. Finding Concentration",
                content: "Concentration is the amount of drug in a given volume of solution.",
                bullets: [
                    "Formula: Total Drug Amount / Total Volume = Concentration (e.g., mg/mL).",
                    "Example: 400 mg Dopamine in 250 mL D5W.",
                    "Calculation: 400 mg / 250 mL = 1.6 mg/mL."
                ]
            }
        ]
    },
    "titration-calculations": {
        title: "Titration Calculations",
        subtitle: "Adjust continuous IV medication drips based on physiological parameters (e.g., blood pressure, heart rate).",
        sections: [
            {
                heading: "1. Titrating Vasoactive Drips",
                content: "Vasoactive medications are often titrated in mcg/kg/min.",
                bullets: [
                    "Step 1: Find the concentration of the bag in mcg/mL.",
                    "Step 2: Determine the patient's weight in kg.",
                    "Step 3: Use the formula to find the rate in mL/hr: (Ordered mcg/kg/min * 60 mins * Weight in kg) / Concentration in mcg/mL.",
                    "Titrate (adjust) the pump rate up or down according to the prescribed parameter goals."
                ]
            }
        ]
    }
};
