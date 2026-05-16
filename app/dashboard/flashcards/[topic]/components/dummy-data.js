import image1 from "@/public/assets/flashcards/answer-image.png";

export const subTopicsData = {
  "fundamentals-of-nursing": [
    {
      id: "vital-signs",
      title: "Vital Signs",
      cardCount: 15,
      description: "Master the basics of monitoring temperature, pulse, respiration, and blood pressure.",
      flashcards: [
        { id: 1, front: "What is the normal adult body temperature range in Celsius?", back: "36.5°C to 37.5°C" },
        { id: 2, front: "Where is the apical pulse located?", back: "At the 5th intercostal space, left midclavicular line.", image: image1 },
        { id: 3, front: "Define Bradypnea.", back: "A respiratory rate less than 12 breaths per minute." }
      ]
    },
    {
      id: "infection-control",
      title: "Infection Control",
      cardCount: 12,
      description: "Standard precautions, PPE, and maintaining a sterile field.",
      flashcards: [
        { id: 1, front: "What is the most effective way to prevent the spread of infection?", back: "Hand hygiene.", image: image1 },
        { id: 2, front: "Name the sequence for donning PPE.", back: "Gown, Mask/Respirator, Goggles/Face Shield, Gloves." }
      ]
    },
    {
      id: "patient-safety",
      title: "Patient Safety",
      cardCount: 10,
      description: "Fall prevention, restraints, and environmental safety protocols.",
      flashcards: [
        { id: 1, front: "What does the acronym RACE stand for in fire safety?", back: "Rescue, Alarm, Confine, Extinguish." }
      ]
    },
    {
        id: "nursing-process",
        title: "Nursing Process",
        cardCount: 20,
        description: "ADPIE: Assessment, Diagnosis, Planning, Implementation, and Evaluation.",
        flashcards: [
            { id: 1, front: "What is the first step of the nursing process?", back: "Assessment" }
        ]
    }
  ],
  "pharmacology": [
    {
      id: "drug-classifications",
      title: "Drug Classifications",
      cardCount: 25,
      description: "Understanding major drug classes and their mechanisms.",
      flashcards: [
        { id: 1, front: "What is the primary action of Beta-Blockers?", back: "They reduce blood pressure by blocking the effects of epinephrine (adrenaline)." }
      ]
    }
  ],
  "medical-surgical-nursing": [
    {
      id: "cardiovascular",
      title: "Cardiovascular System",
      cardCount: 22,
      description: "Heart failure, hypertension, and myocardial infarction management.",
      flashcards: [
        { id: 1, front: "What is the therapeutic level for Digoxin?", back: "0.5 to 2.0 ng/mL." }
      ]
    },
    {
        id: "respiratory",
        title: "Respiratory System",
        cardCount: 18,
        description: "Asthma, COPD, and Pneumonia nursing interventions.",
        flashcards: [
          { id: 1, front: "Name a priority nursing action for an acute asthma attack.", back: "Administer a short-acting beta-agonist (e.g., Albuterol)." }
        ]
    }
  ],
  "anatomy": [
    {
      id: "skeletal-system",
      title: "Skeletal System",
      cardCount: 30,
      description: "Bones, joints, and skeletal functions.",
      flashcards: [
        { id: 1, front: "How many bones are in the adult human body?", back: "206." }
      ]
    }
  ]
};

