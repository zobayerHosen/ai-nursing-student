export const ecgDetailsData = {
    "ecg-introduction": {
        title: "ECG Introduction",
        subtitle: "Fundamental principles of electrocardiography, lead placements, and basic waveform interpretation.",
        sections: [
            {
                heading: "1. Basic ECG Components",
                content: "An electrocardiogram records the electrical activity of the heart. The key components include:",
                bullets: [
                    "P wave - Represents atrial depolarization.",
                    "QRS complex - Represents ventricular depolarization.",
                    "T wave - Represents ventricular repolarization.",
                    "PR interval - Time from the onset of atrial depolarization to the onset of ventricular depolarization."
                ]
            },
            {
                heading: "2. Systematic Approach to Interpretation",
                content: "When analyzing any ECG rhythm, always follow a systematic, step-by-step approach:",
                bullets: [
                    "Assess the Rate - Determine if it is normal (60-100 bpm), tachycardic (>100 bpm), or bradycardic (<60 bpm).",
                    "Determine Regularity - Measure R-R intervals to see if the rhythm is regular or irregular.",
                    "Analyze P waves - Ensure there is a P wave before every QRS and they all look alike.",
                    "Measure PR Interval - Normal is 0.12 to 0.20 seconds.",
                    "Measure QRS Duration - Normal is less than 0.12 seconds."
                ]
            }
        ]
    },
    "normal-and-sinus-rhythms": {
        title: "Normal & Sinus Rhythms",
        subtitle: "Understanding normal sinus rhythm and common sinus node variations.",
        sections: [
            {
                heading: "1. Sinus Node Rhythms",
                table: [
                    { test: "Normal Sinus Rhythm (NSR)", range: "60 - 100 bpm", significance: "The standard healthy rhythm originating from the SA node." },
                    { test: "Sinus Bradycardia", range: "< 60 bpm", significance: "Can be normal in athletes or sleep. May cause hypoperfusion if severe." },
                    { test: "Sinus Tachycardia", range: "> 100 bpm", significance: "Usually a physiological response to stress, fever, pain, or exertion." },
                    { test: "Sinus Arrhythmia", range: "60 - 100 bpm", significance: "Irregular rhythm that varies with respiration; normal finding." }
                ]
            },
            {
                heading: "2. Nursing Considerations",
                bullets: [
                    "For symptomatic bradycardia, prepare to administer Atropine and consider transcutaneous pacing.",
                    "For sinus tachycardia, identify and treat the underlying cause (e.g., fluid replacement for hypovolemia)."
                ]
            }
        ]
    },
    "atrial-arrhythmias": {
        title: "Atrial Arrhythmias",
        subtitle: "Rhythms originating in the atria but outside the SA node, leading to rapid or irregular ventricular rates.",
        sections: [
            {
                heading: "1. Common Atrial Arrhythmias",
                table: [
                    { test: "Atrial Fibrillation (A-Fib)", range: "Irregular", significance: "Loss of effective atrial kick; high risk for mural thrombus and stroke." },
                    { test: "Atrial Flutter", range: "Regular or Irregular", significance: "Characterized by 'sawtooth' flutter waves. Often requires rate control or cardioversion." },
                    { test: "Premature Atrial Complexes (PAC)", range: "Varies", significance: "Early beats originating from an ectopic atrial focus. Usually benign." }
                ]
            },
            {
                heading: "2. Treatment Protocols",
                bullets: [
                    "Administer anticoagulants (e.g., Warfarin, DOACs) for chronic A-Fib to prevent thromboembolism.",
                    "Utilize beta-blockers or calcium channel blockers for rate control.",
                    "Prepare for synchronized cardioversion if the patient is hemodynamically unstable."
                ]
            }
        ]
    },
    "heart-blocks": {
        title: "Heart Blocks",
        subtitle: "Delays or interruptions in the conduction of electrical impulses from the atria to the ventricles.",
        sections: [
            {
                heading: "1. Types of AV Blocks",
                table: [
                    { test: "First-Degree AV Block", range: "PR > 0.20s", significance: "Prolonged PR interval, but every P wave is conducted. Usually benign." },
                    { test: "Second-Degree Type I (Wenckebach)", range: "Progressive PR", significance: "PR interval progressively lengthens until a QRS is dropped." },
                    { test: "Second-Degree Type II (Mobitz II)", range: "Constant PR", significance: "Intermittent dropped QRS complexes without PR lengthening. Can progress rapidly." },
                    { test: "Third-Degree (Complete) Heart Block", range: "AV Dissociation", significance: "No association between P waves and QRS complexes. Requires immediate pacing." }
                ]
            },
            {
                heading: "2. Critical Care Interventions",
                bullets: [
                    "For Second-Degree Type II and Third-Degree blocks, prepare for transcutaneous or transvenous pacing immediately.",
                    "Atropine is generally ineffective for Mobitz II and complete heart block."
                ]
            }
        ]
    },
    "ventricular-arrhythmias": {
        title: "Ventricular Arrhythmias",
        subtitle: "Lethal and non-lethal rhythms originating in the ventricles, characterized by wide QRS complexes.",
        sections: [
            {
                heading: "1. Ventricular Rhythm Profiles",
                table: [
                    { test: "Premature Ventricular Contractions (PVC)", range: "Varies", significance: "Wide, bizarre ectopic beats. Frequent PVCs may precede more dangerous arrhythmias." },
                    { test: "Ventricular Tachycardia (V-Tach)", range: "150 - 250 bpm", significance: "Rapid, wide-complex tachycardia. Can be with or without a pulse. A medical emergency." },
                    { test: "Ventricular Fibrillation (V-Fib)", range: "Chaotic", significance: "No organized electrical activity or cardiac output. Cardiac arrest." }
                ]
            },
            {
                heading: "2. Emergency ACLS Response",
                bullets: [
                    "For Pulseless V-Tach and V-Fib: Initiate CPR immediately and prepare for rapid defibrillation.",
                    "For V-Tach with a pulse: Administer antiarrhythmics (e.g., Amiodarone) and prepare for synchronized cardioversion."
                ]
            }
        ]
    },
    "pacemaker-rhythms": {
        title: "Pacemaker Rhythms",
        subtitle: "Recognizing artificially generated rhythms and identifying pacemaker malfunctions.",
        sections: [
            {
                heading: "1. Recognizing Pacing Spikes",
                content: "Artificial pacemakers produce a vertical spike on the ECG tracing immediately before the paced beat.",
                bullets: [
                    "Atrial Pacing - Spike appears just before the P wave.",
                    "Ventricular Pacing - Spike appears just before a wide QRS complex.",
                    "Dual-Chamber Pacing - Spikes appear before both the P wave and the QRS complex."
                ]
            },
            {
                heading: "2. Troubleshooting Malfunctions",
                bullets: [
                    "Failure to Capture - Pacing spike is present but not followed by a P wave or QRS complex.",
                    "Failure to Sense - Pacemaker fires inappropriately during the intrinsic cardiac cycle, risking R-on-T phenomenon.",
                    "Failure to Pace - Absence of pacing spikes when the intrinsic rate drops below the pacemaker's programmed rate."
                ]
            }
        ]
    },
    "junctional-rhythms": {
        title: "Junctional Rhythms",
        subtitle: "Rhythms originating from the AV junction, typically occurring when the SA node fails.",
        sections: [
            {
                heading: "1. Characteristics of Junctional Rhythms",
                table: [
                    { test: "Junctional Escape Rhythm", range: "40 - 60 bpm", significance: "Protective backup rhythm. P waves are absent, inverted, or follow the QRS." },
                    { test: "Accelerated Junctional Rhythm", range: "60 - 100 bpm", significance: "Often associated with digitalis toxicity or acute myocardial infarction." },
                    { test: "Junctional Tachycardia", range: "> 100 bpm", significance: "Rapid AV junctional rate reducing ventricular filling time." }
                ]
            },
            {
                heading: "2. Clinical Management",
                bullets: [
                    "Treat the underlying cause (e.g., hold Digoxin if toxicity is suspected).",
                    "If the patient is symptomatic from a slow junctional escape rhythm, Atropine or pacing may be required."
                ]
            }
        ]
    },
    "bundle-branch-blocks": {
        title: "Bundle Branch Blocks",
        subtitle: "Conduction delays through the intraventricular bundle branches causing prolonged QRS durations.",
        sections: [
            {
                heading: "1. Distinguishing BBBs",
                table: [
                    { test: "Right Bundle Branch Block (RBBB)", range: "QRS > 0.12s", significance: "Characterized by an rSR' ('rabbit ears') pattern in lead V1." },
                    { test: "Left Bundle Branch Block (LBBB)", range: "QRS > 0.12s", significance: "Characterized by a broad, notched R wave in leads V5 and V6. Can obscure signs of ischemia." }
                ]
            },
            {
                heading: "2. Diagnostic Implications",
                bullets: [
                    "A new-onset LBBB in the presence of chest pain is highly suspicious for an acute myocardial infarction and should be treated as a STEMI.",
                    "Patients with BBBs require careful monitoring during procedures that could further stress the cardiac conduction system."
                ]
            }
        ]
    }
};
