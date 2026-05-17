// app/dashboard/body-systems/[slug]/components/body-system-details-data.js
import image_1 from "@/public/assets/body_system/image_1.png";
import image_2 from "@/public/assets/body_system/image_2.png";
import image_3 from "@/public/assets/body_system/image_3.png";
import image_4 from "@/public/assets/body_system/image_4.png";
import image_5 from "@/public/assets/body_system/image_5.png";
import image_6 from "@/public/assets/body_system/image_6.png";
import image_7 from "@/public/assets/body_system/image_7.png";

const body_system_detail_data = [
  {
    slug: "cardiovascular-system",
    title: "Cardiovascular System",
    category: "System",
    tags: ["ANATOMY & PHYSIOLOGY", "CORE"],
    description: "The cardiovascular system is a complex network responsible for transporting oxygen, nutrients, hormones, and waste products throughout the body.",
    terminology: {
      count: 24,
      label: "Terms Available"
    },
    gallery: [
 {
        id: "cv_img_1",
        thumbnail: image_1, 
        largeImage: image_1,
        labels: [],
        content: {
          overview: `
            <style>
              .medical-content { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; line-height: 1.6; color: #1e293b; }
              .medical-content h2 { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-top: 1.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e2e8f0; letter-spacing: -0.01em; }
              .medical-content h3 { font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-top: 1.25rem; margin-bottom: 0.75rem; letter-spacing: -0.005em; }
              .medical-content p { margin-bottom: 1rem; color: #334155; line-height: 1.7; }
              .medical-content ul, .medical-content ol { margin: 0.75rem 0 1rem 1.5rem; padding-left: 0.5rem; }
              .medical-content li { margin-bottom: 0.5rem; color: #334155; }
              .medical-content li strong { color: #0f172a; font-weight: 600; }
              .medical-content strong { color: #0f172a; font-weight: 600; }
              .medical-content a { color: #3b82f6; text-decoration: none; border-bottom: 1px solid #93c5fd; }
              .medical-content a:hover { color: #2563eb; border-bottom-color: #3b82f6; }
              .medical-content hr { margin: 1.5rem 0; border: none; border-top: 1px solid #e2e8f0; }
              .medical-content .highlight { background: #fef3c7; padding: 0.125rem 0.25rem; border-radius: 0.25rem; font-weight: 500; }
              .medical-content .note { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1rem; margin: 1rem 0; border-radius: 0.5rem; }
              .medical-content .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 1rem; margin: 1rem 0; border-radius: 0.5rem; }
              .medical-content .tip { background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem; margin: 1rem 0; border-radius: 0.5rem; }
              .medical-content table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
              .medical-content th, .medical-content td { border: 1px solid #e2e8f0; padding: 0.75rem; text-align: left; }
              .medical-content th { background: #f8fafc; font-weight: 600; color: #0f172a; }
              .medical-content code { background: #f1f5f9; padding: 0.125rem 0.25rem; border-radius: 0.25rem; font-size: 0.875rem; font-family: 'Courier New', monospace; }
            </style>
            <div class="medical-content">
              <h2>Gross Anatomy of the Heart</h2>
              <p>The heart is a powerful, four-chambered muscular pump positioned within the mediastinum, slightly left of midline. It beats approximately 100,000 times daily, propelling nearly 7,000 liters of blood through vascular networks.</p>
              
              <h3>Four Chambers</h3>
              <ul>
                <li><strong>Right Atrium</strong> — Receives deoxygenated blood returning from systemic circulation via the Superior and Inferior Vena Cava.</li>
                <li><strong>Right Ventricle</strong> — Pumps deoxygenated blood through the pulmonary trunk toward the lungs for oxygenation.</li>
                <li><strong>Left Atrium</strong> — Collects oxygen-rich blood returning from pulmonary veins.</li>
                <li><strong>Left Ventricle</strong> — The powerhouse chamber that ejects oxygenated blood into the high-pressure systemic circuit via the aorta.</li>
              </ul>
              
              <h3>Great Vessels</h3>
              <ul>
                <li><strong>Aorta</strong> — The body's largest artery; distributes oxygenated blood systemically.</li>
                <li><strong>Pulmonary Trunk</strong> — Carries deoxygenated blood toward the lungs.</li>
                <li><strong>Vena Cavae</strong> — Superior and inferior veins returning systemic blood to the right atrium.</li>
                <li><strong>Pulmonary Veins</strong> — Four veins returning oxygenated blood from lungs to left atrium.</li>
              </ul>
              
              <div class="note">
                <strong>💡 Wall Layers:</strong> Epicardium (outer visceral layer) → Myocardium (thick cardiac muscle) → Endocardium (inner endothelial lining).
              </div>
            </div>
          `,
          physiology: `
            <style>
              .medical-content { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; line-height: 1.6; color: #1e293b; }
              .medical-content h2 { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-top: 1.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e2e8f0; }
              .medical-content h3 { font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-top: 1.25rem; margin-bottom: 0.75rem; }
              .medical-content p { margin-bottom: 1rem; color: #334155; line-height: 1.7; }
              .medical-content ul { margin: 0.75rem 0 1rem 1.5rem; }
              .medical-content li { margin-bottom: 0.5rem; color: #334155; }
              .medical-content li strong { color: #0f172a; }
              .medical-content .formula { background: #f8fafc; padding: 1rem; border-radius: 0.5rem; font-family: 'Courier New', monospace; margin: 1rem 0; border: 1px solid #e2e8f0; }
            </style>
            <div class="medical-content">
              <h2>The Cardiac Cycle & Hemodynamics</h2>
              <p>The cardiac cycle consists of alternating contraction (systole) and relaxation (diastole) phases that efficiently move blood through chambers and out into circulation.</p>
              
              <h3>Phase 1: Ventricular Filling (Diastole)</h3>
              <ul>
                <li>AV valves (tricuspid, mitral) OPEN; Semilunar valves (aortic, pulmonic) CLOSED</li>
                <li>Blood passively flows from atria → ventricles (70% filling)</li>
                <li>Atrial contraction (atrial kick) completes final 30% ventricular filling</li>
              </ul>
              
              <h3>Phase 2: Isovolumetric Contraction</h3>
              <ul>
                <li>Ventricles contract → Pressure rises sharply</li>
                <li>AV valves close ("lub" heart sound - S1)</li>
                <li>All valves temporarily closed → no volume change</li>
              </ul>
              
              <h3>Phase 3: Ventricular Ejection (Systole)</h3>
              <ul>
                <li>Ventricular pressure exceeds arterial pressure → Semilunar valves OPEN</li>
                <li>Blood ejected into pulmonary trunk (right) and aorta (left)</li>
                <li>Stroke Volume = ~70mL per beat</li>
              </ul>
              
              <h3>Phase 4: Isovolumetric Relaxation</h3>
              <ul>
                <li>Ventricles relax → Pressure falls below arterial pressure</li>
                <li>Semilunar valves CLOSE ("dub" heart sound - S2)</li>
                <li>All valves closed again before next filling cycle</li>
              </ul>
              
              <h3>Key Hemodynamic Parameters</h3>
              <ul>
                <li><strong>Cardiac Output (CO)</strong> = Heart Rate × Stroke Volume <span style="color: #64748b;">(normal ~5 L/min)</span></li>
                <li><strong>Ejection Fraction (EF)</strong> = Stroke Volume / End-Diastolic Volume <span style="color: #64748b;">(normal 55-70%)</span></li>
                <li><strong>Mean Arterial Pressure (MAP)</strong> = Diastolic BP + ⅓(Systolic - Diastolic)</li>
              </ul>
            </div>
          `,
          clinical: `
            <style>
              .medical-content { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; line-height: 1.6; color: #1e293b; }
              .medical-content h2 { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-top: 1.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e2e8f0; }
              .medical-content h3 { font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-top: 1.25rem; margin-bottom: 0.75rem; }
              .medical-content p { margin-bottom: 1rem; color: #334155; line-height: 1.7; }
              .medical-content ul { margin: 0.75rem 0 1rem 1.5rem; }
              .medical-content li { margin-bottom: 0.5rem; color: #334155; }
              .medical-content .warning-box { background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; margin: 1rem 0; border-radius: 0.5rem; }
              .medical-content .clinical-tip { background: #fefce8; border-left: 4px solid #eab308; padding: 1rem; margin: 1rem 0; border-radius: 0.5rem; }
            </style>
            <div class="medical-content">
              <h2>Valvular Heart Diseases</h2>
              <p>Heart valve disorders disrupt unidirectional blood flow, forcing the myocardium to adapt with hypertrophy and eventually decompensate into failure.</p>
              
              <h3>Stenosis (Narrowing)</h3>
              <ul>
                <li><strong>Aortic Stenosis</strong> — Calcific degeneration最常见 cause. Symptoms: Angina, Syncope, Heart Failure (classic triad). Harsh crescendo-decrescendo murmur at right 2nd ICS.</li>
                <li><strong>Mitral Stenosis</strong> — Usually rheumatic fever sequela. Low-pitched diastolic rumble, opening snap. Leads to LA enlargement and AFib.</li>
                <li><strong>Pulmonic/Tricuspid Stenosis</strong> — Rare, often congenital or carcinoid-related.</li>
              </ul>
              
              <h3>Regurgitation (Insufficiency)</h3>
              <ul>
                <li><strong>Mitral Regurgitation</strong> — Pansystolic blowing murmur at apex radiating to axilla. Causes: MVP, ischemic papillary muscle rupture, endocarditis.</li>
                <li><strong>Aortic Regurgitation</strong> — Diastolic decrescendo murmur at left sternal border. Chronic causes: bicuspid valve, Marfan, syphilis. Acute: aortic dissection, endocarditis.</li>
                <li><strong>Tricuspid Regurgitation</strong> — Often functional from RV dilation. Giant CV waves on JVP, pulsatile liver.</li>
              </ul>
              
              <div class="warning-box">
                <strong>⚠️ Clinical Pearl:</strong> Infective endocarditis microbial colonization of damaged valves creates friable vegetations that embolize systemically. Duke Criteria guides diagnosis: Blood cultures + echocardiography findings. Common organisms: Strep viridans (subacute), Staph aureus (acute).
              </div>
            </div>
          `
        }
      },
      {
        id: "cv_img_2",
        thumbnail: image_2,
        largeImage: image_2,
        labels: [], // Removed labels
        content: {
          overview: `
            <h2>Cardiac Conduction System</h2>
            <p>The heart possesses intrinsic automaticity — the ability to generate and propagate electrical impulses without neural input. This specialized network ensures coordinated, sequential chamber contraction for optimal pumping efficiency.</p>
            
            <h3>Primary Components</h3>
            <ul>
              <li><strong>Sinoatrial (SA) Node</strong> — Natural pacemaker located in right atrial wall near SVC opening. Intrinsic rate: 60-100 bpm.</li>
              <li><strong>Internodal Pathways</strong> — Anterior, middle, and posterior tracts conducting impulse from SA → AV node.</li>
              <li><strong>Atrioventricular (AV) Node</strong> — Located in interatrial septum near coronary sinus. Deliberate conduction delay: 0.1 seconds.</li>
              <li><strong>Bundle of His</strong> — Penetrates fibrous skeleton connecting atria to ventricles.</li>
              <li><strong>Left & Right Bundle Branches</strong> — Travel down interventricular septum.</li>
              <li><strong>Purkinje Fibers</strong> — Rapidly distribute impulse throughout ventricular myocardium.</li>
            </ul>
          `,
          physiology: `
            <h2>Action Potential & Pacemaker Activity</h2>
            
            <h3>Pacemaker Cells (SA/AV Node)</h3>
            <p><strong>Phase 4 (Diastolic Depolarization)</strong> — Automaticity: Funny channels (If) allow slow Na+ influx, gradually reaching threshold.</p>
            <p><strong>Phase 0 (Upstroke)</strong> — Voltage-gated Ca2+ channels open (L-type) → Slow, prolonged depolarization.</p>
            <p><strong>Phase 3 (Repolarization)</strong> — K+ efflux returns membrane potential to baseline.</p>
            
            <h3>Cardiac Myocytes (Working Cells)</h3>
            <ul>
              <li><strong>Phase 0</strong> — Fast Na+ channels open → Rapid depolarization</li>
              <li><strong>Phase 1</strong> — Early repolarization (transient K+ efflux)</li>
              <li><strong>Phase 2 (Plateau)</strong> — Ca2+ influx balances K+ efflux → Long refractory period prevents tetany</li>
              <li><strong>Phase 3</strong> — K+ efflux dominates → Repolarization</li>
              <li><strong>Phase 4</strong> — Resting potential (-90mV), Na+/K+ ATPase restores gradients</li>
            </ul>
            
            <h3>Electrocardiogram (EKG) Correlation</h3>
            <ul>
              <li><strong>P Wave</strong> — Atrial depolarization (SA node → atrial myocardium)</li>
              <li><strong>PR Interval</strong> — AV node conduction delay (normal: 120-200ms)</li>
              <li><strong>QRS Complex</strong> — Rapid ventricular depolarization (normal: <100ms)</li>
              <li><strong>ST Segment</strong> — Plateau phase (ventricular contraction)</li>
              <li><strong>T Wave</strong> — Ventricular repolarization</li>
              <li><strong>QT Interval</strong> — Total ventricular activity (rate-dependent)</li>
            </ul>
          `,
          clinical: `
            <h2>Arrhythmias & Conduction Disorders</h2>
            
            <h3>Supraventricular Tachyarrhythmias</h3>
            <ul>
              <li><strong>Atrial Fibrillation (AFib)</strong> — Chaotic atrial activity (400-600 bpm), irregularly irregular ventricular response, no discernible P waves. Stroke risk ↑5x from LA appendage thrombus.</li>
              <li><strong>Atrial Flutter</strong> — Reentrant circuit in right atrium → Sawtooth flutter waves (F waves) at ~300 bpm, often 2:1 block.</li>
              <li><strong>AVNRT (AV Nodal Reentrant Tachycardia)</strong> — Dual AV node pathways create reentry circuit. Sudden onset/termination, narrow QRS, often rate 150-250 bpm.</li>
              <li><strong>WPW Syndrome (Wolff-Parkinson-White)</strong> — Accessory pathway (Bundle of Kent) bypasses AV node. Delta wave slurring QRS upstroke, short PR interval.</li>
            </ul>
            
            <h3>Ventricular Arrhythmias</h3>
            <ul>
              <li><strong>Premature Ventricular Contractions (PVCs)</strong> — Early, wide QRS complexes with compensatory pause. Benign in normal hearts; ominous if frequent (>10-20%) or with structural disease.</li>
              <li><strong>Ventricular Tachycardia (VT)</strong> — ≥3 consecutive PVCs at rate >100 bpm. Monomorphic (same morphology) vs Polymorphic (changing). Sustained VT >30 seconds requires immediate intervention.</li>
              <li><strong>Torsades de Pointes</strong> — Polymorphic VT with twisting QRS axis. Associated with long QT syndrome (congenital, drugs, electrolyte disturbances). Treat with IV magnesium.</li>
              <li><strong>Ventricular Fibrillation (VF)</strong> — Chaotic, disorganized ventricular activity. No cardiac output → Cardiac arrest. Defibrillation ONLY definitive treatment.</li>
            </ul>
            
            <h3>Heart Blocks (AV Block)</h3>
            <ul>
              <li><strong>First-Degree AV Block</strong> — PR interval >200ms. All impulses conduct normally. Often benign, drug-induced.</li>
              <li><strong>Second-Degree AV Block, Mobitz I (Wenckebach)</strong> — Progressive PR lengthening until dropped QRS. Usually benign, vagal-mediated.</li>
              <li><strong>Second-Degree AV Block, Mobitz II</strong> — Constant PR interval with intermittent non-conducted P waves. Unstable, high risk of progression to complete block → Pacemaker indicated.</li>
              <li><strong>Third-Degree (Complete) Heart Block</strong> — Complete AV dissociation. Atria and ventricles beat independently. Pacing required for survival.</li>
            </ul>
            
            <h3>Bradyarrhythmias</h3>
            <p><strong>Sick Sinus Syndrome (SSS)</strong> — SA node dysfunction causing symptomatic bradycardia, sinus pauses (>3 seconds), or chronotropic incompetence. Pacemaker implantation definitive treatment.</p>
          `
        }
      },
      {
        id: "cv_img_3",
        thumbnail: image_3,
        largeImage: image_3,
        labels: [], // Removed labels
        content: {
          overview: `
            <h2>Systemic & Pulmonary Circulation</h2>
            <p>The cardiovascular system functions as a dual, closed-loop circuit that maintains continuous blood flow across all body tissues. These parallel circuits are arranged in series with the heart.</p>
            
            <h3>Pulmonary Circuit (Low Pressure)</h3>
            <ul>
              <li><strong>Pathway:</strong> Right Ventricle → Pulmonary Trunk → Left/Right Pulmonary Arteries → Pulmonary Capillaries (gas exchange at alveoli) → Pulmonary Veins → Left Atrium</li>
              <li><strong>Pressure:</strong> Systolic ~25 mmHg, Diastolic ~8 mmHg</li>
              <li><strong>Resistance:</strong> Low (PVR ~1/10th of SVR)</li>
              <li><strong>Function:</strong> Deoxygenated blood releases CO₂, absorbs O₂</li>
            </ul>
            
            <h3>Systemic Circuit (High Pressure)</h3>
            <ul>
              <li><strong>Pathway:</strong> Left Ventricle → Aorta → Arteries → Arterioles → Systemic Capillaries (nutrient/waste exchange) → Venules → Veins → Superior/Inferior Vena Cava → Right Atrium</li>
              <li><strong>Pressure:</strong> Systolic ~120 mmHg, Diastolic ~80 mmHg</li>
              <li><strong>Resistance:</strong> High (regulated by arteriolar diameter)</li>
              <li><strong>Function:</strong> Delivers O₂/nutrients, removes CO₂/wastes</li>
            </ul>
            
            <h3>Special Circulations</h3>
            <ul>
              <li><strong>Coronary Circulation</strong> — Right/Left coronary arteries perfuse myocardium during diastole (high O₂ extraction ~70-80%).</li>
              <li><strong>Cerebral Circulation</strong> — Circle of Willis provides collateral protection. Autoregulation maintains constant flow (MAP 60-150 mmHg).</li>
              <li><strong>Hepatic Portal System</strong> — Nutrient-rich blood from GI tract → Portal vein → Liver (processing) → Hepatic vein → IVC.</li>
              <li><strong>Renal Circulation</strong> — High flow (~1.2 L/min) for glomerular filtration and blood pressure regulation (RAAS system).</li>
            </ul>
          `,
          physiology: `
            <h2>Hemodynamics & Vascular Regulation</h2>
            
            <h3>Poiseuille's Law & Resistance</h3>
            <p>Resistance (R) = 8ηL / πr⁴, where r = vessel radius. Small changes in vessel diameter dramatically affect flow: <strong>doubling radius ↓ resistance 16x</strong>.</p>
            
            <h3>Starling's Law of the Capillary</h3>
            <p>Net filtration = K[(Pc + πi) - (Pi + πp)], where:</p>
            <ul>
              <li>Pc = Capillary hydrostatic pressure (promotes filtration)</li>
              <li>πp = Plasma oncotic pressure (promotes reabsorption)</li>
              <li>Pi = Interstitial hydrostatic pressure (opposes filtration)</li>
              <li>πi = Interstitial oncotic pressure (opposes reabsorption)</li>
            </ul>
            <p><strong>Clinical correlation:</strong> Edema occurs when filtration exceeds lymphatic drainage (↑venous pressure, ↓plasma proteins, ↑capillary permeability).</p>
            
            <h3>Blood Pressure Regulation</h3>
            <p><strong>Short-term (seconds → minutes)</strong> — Baroreceptor reflex: Carotid sinus/aortic arch pressure sensors modulate sympathetic/vagal tone to adjust HR and vascular resistance.</p>
            <p><strong>Intermediate-term (minutes → hours)</strong> — RAAS system: ↓Renal perfusion → Renin release → Angiotensin II → Vasoconstriction + Aldosterone (Na+/H₂O retention).</p>
            <p><strong>Long-term (days → months)</strong> — Renal pressure-natriuresis mechanism directly links BP to sodium excretion. Primary controller of chronic BP setpoint.</p>
            
            <h3>Coronary & Cerebral Autoregulation</h3>
            <p>Myogenic response and metabolic vasodilation maintain constant flow across perfusion pressure changes. Hypoxia/ischemia causes rapid vasodilation via adenosine, NO, and prostaglandin release.</p>
          `,
          clinical: `
            <h2>Ischemic Heart Disease & Heart Failure</h2>
            
            <h3>Atherosclerosis & Coronary Artery Disease (CAD)</h3>
            <p>Endothelial injury → LDL deposition → Foam cell accumulation → Fatty streak → Fibrous plaque → Plaque rupture/thrombosis. Risk factors: Hypertension, Hyperlipidemia, Diabetes, Smoking, Family history (the "Big 5").</p>
            
            <h3>Acute Coronary Syndromes (ACS)</h3>
            <ul>
              <li><strong>Stable Angina</strong> — Predictable chest pain with exertion, relieved by rest/nitroglycerin. Fixed atherosclerotic stenosis (>70%).</li>
              <li><strong>Unstable Angina/NSTEMI</strong> — Non-ST elevation on EKG, elevated cardiac biomarkers (troponin) in NSTEMI. Plaque rupture with subocclusive thrombus.</li>
              <li><strong>STEMI (ST-Elevation MI)</strong> — Complete coronary occlusion. Emergent reperfusion priority: "Door-to-balloon" <90 minutes for PCI or fibrinolytic therapy.</li>
              <li><strong>Myocardial Infarction Complications</strong> — Arrhythmias (VT/VF), Cardiogenic shock, Papillary muscle rupture (mitral regurgitation), Ventricular septal defect, Free wall rupture (cardiac tamponade), Dressler syndrome (post-MI pericarditis).</li>
            </ul>
            
            <h3>Heart Failure (HF)</h3>
            <p><strong>HFrEF (Reduced EF, ≤40%)</strong> — Systolic dysfunction. Causes: Ischemic cardiomyopathy, Dilation, Valvular disease, Myocarditis, Toxins (alcohol, chemo). Treatment: GDMT includes beta-blockers, ACEi/ARB/ARNI, MRA, SGLT2 inhibitors, diuretics.</p>
            <p><strong>HFpEF (Preserved EF, ≥50%)</strong> — Diastolic dysfunction (stiff ventricle). Causes: Hypertension, HCM, Infiltrative disease, Obesity, Atrial fibrillation. Treatment: Manage comorbidities, diuretics for congestion.</p>
            
            <h3>Killip Classification (MI Severity)</h3>
            <ul>
              <li><strong>Class I</strong> — No rales, no S3, no pulmonary congestion → Low risk (~6% mortality)</li>
              <li><strong>Class II</strong> — Rales in <50% lung fields, S3 gallop, elevated JVP → Moderate risk (~17%)</li>
              <li><strong>Class III</strong> — Rales in >50% lung fields (frank pulmonary edema) → High risk (~38%)</li>
              <li><strong>Class IV</strong> — Cardiogenic shock (SBP <90 with end-organ hypoperfusion) → Very high risk (~67% mortality)</li>
            </ul>
          `
        }
      },
      {
        id: "cv_img_4",
        thumbnail: image_4,
        largeImage: image_4,
        labels: [], // Removed labels
        content: {
          overview: `
            <h2>Peripheral Vasculature & Major Arteries</h2>
            <p>The systemic arterial tree distributes oxygenated blood from the left ventricle to capillary beds across all organ systems via an elaborate branching hierarchy: Aorta → Arteries → Arterioles → Capillaries.</p>
            
            <h3>Aorta Segments</h3>
            <ul>
              <li><strong>Ascending Aorta</strong> — Coronary arteries originate here (perfuse the heart)</li>
              <li><strong>Aortic Arch</strong> — Brachiocephalic trunk → Right subclavian + Right common carotid; Left common carotid; Left subclavian artery</li>
              <li><strong>Descending Thoracic Aorta</strong> — Supplies bronchial, esophageal, intercostal, and superior phrenic arteries</li>
              <li><strong>Abdominal Aorta</strong> — Celiac trunk (foregut), SMA (midgut), Renal arteries, Gonadal arteries, IMA (hindgut), then bifurcates into Common Iliacs</li>
            </ul>
            
            <h3>Upper Extremity Arteries</h3>
            <p>Subclavian → Axillary → Brachial (bifurcates at cubital fossa) → Radial (lateral, palpate pulse) & Ulnar (medial) → Superficial/Deep palmar arches → Digital arteries.</p>
            
            <h3>Lower Extremity Arteries</h3>
            <p>Common Iliac → External Iliac → Femoral (palpate at groin) → Profunda femoris (deep) → Popliteal (behind knee, palpate) → Anterior Tibial (dorsalis pedis on foot) & Posterior Tibial (palpate behind medial malleolus).</p>
            
            <h3>Venous System</h3>
            <p>Veins are capacitance vessels (hold ~60-70% blood volume), have thinner walls, contain valves preventing retrograde flow (especially in lower extremities). Deep veins (accompany arteries) vs Superficial veins (saphenous, cephalic, basilic).</p>
          `,
          physiology: `
            <h2>Vascular Physiology & Peripheral Circulation</h2>
            
            <h3>Arterial Pressure Waveform</h3>
            <p>Systolic BP (peak ventricular ejection) 90-120 mmHg, Diastolic BP (minimal arterial pressure before next systole) 60-80 mmHg. Pulse pressure = SBP - DBP (normal ~40 mmHg). Widened pulse pressure occurs in aortic regurgitation, hyperthyroidism, fever. Narrowed pulse pressure occurs in cardiogenic shock, hypovolemia, tamponade.</p>
            
            <h3>Venous Return & Muscle Pump</h3>
            <p>Venous return determines preload (ventricular filling). Skeletal muscle contraction squeezes deep veins while valves prevent backflow → propels blood toward heart. Respiratory pump: Inspiration ↓ intrathoracic pressure, ↑ abdominal pressure → draws blood into thoracic veins. Immobility (post-op, long flights) → venous pooling → DVT risk.</p>
            
            <h3>Capillary Exchange Mechanisms</h3>
            <ul>
              <li><strong>Diffusion</strong> — Primary mechanism for O₂, CO₂, glucose, electrolytes (passive movement down concentration gradients)</li>
              <li><strong>Transcytosis</strong> — Large molecules (albumin, hormones) transported via caveolae vesicles</li>
              <li><strong>Bulk Flow (Filtration/Reabsorption)</strong> — Driven by Starling forces; regulates interstitial fluid volume</li>
            </ul>
            
            <h3>Endothelial Function</h3>
            <p>The endothelium is metabolically active: Produces NO (vasodilator, inhibits platelet aggregation), Endothelin-1 (vasoconstrictor), Prostacyclin (PGI₂; antiplatelet), Von Willebrand Factor (coagulation). Endothelial dysfunction (oxidative stress, inflammation) initiates atherosclerosis.</p>
          `,
          clinical: `
            <h2>Peripheral Vascular Disease & Emergencies</h2>
            
            <h3>Peripheral Arterial Disease (PAD)</h3>
            <p>Atherosclerosis of lower extremity arteries (iliac, femoral, popliteal, tibial). Classic symptoms: Intermittent claudication (calf/thigh pain with walking, relieved by rest), critical limb ischemia (rest pain, non-healing ulcers, gangrene). Ankle-Brachial Index (ABI) <0.90 diagnostic. Risk factors same as CAD (treat aggressively).</p>
            
            <h3>Acute Limb Ischemia (Surgical Emergency!)</h3>
            <p><strong>6 P's:</strong> Pain, Pulselessness, Pallor, Paresthesia, Paralysis, Poikilothermia (cold). Etiologies: Embolus (cardiac source: AFib, mural thrombus, valvular vegetation) or Thrombosis (in situ at stenotic plaque). Time-sensitive: Intervention within 6 hours to salvage limb. Treatments: Thrombectomy, thrombolysis, surgical bypass.</p>
            
            <h3>Deep Vein Thrombosis (DVT)</h3>
            <p>Virchow's triad: Venous stasis, Hypercoagulability, Endothelial injury. Risk factors: Surgery (orthopedic highest), Malignancy, Pregnancy, OCP/HRT, Prolonged immobility, Thrombophilia (Factor V Leiden, Prothrombin mutation). Symptoms: Unilateral leg swelling, warmth, erythema, calf tenderness (Homan sign unreliable).</p>
            <p><strong>Diagnosis:</strong> D-dimer (sensitive, not specific) → Compression ultrasound (gold standard).<br/>
            <strong>Treatment:</strong> Anticoagulation (DOACs preferred: rivaroxaban, apixaban; or LMWH + warfarin). Duration: 3 months (provoked) vs 6-12+ months (unprovoked/recurrent).<br/>
            <strong>Complication:</strong> Pulmonary Embolism (PE) — Prevent with anticoagulation; Consider IVC filter if anticoagulation contraindicated.</p>
            
            <h3>Aortic Emergencies</h3>
            <ul>
              <li><strong>Abdominal Aortic Aneurysm (AAA)</strong> — >3cm diameter. Rupture risk ↑ with size (>5.5cm or rapid expansion >1cm/year). Surveillance ultrasound q6-12 months. Surgical repair if symptomatic OR meets size threshold. Ruptured AAA: Triad of pain, hypotension, pulsatile mass → 50-80% mortality.</li>
              <li><strong>Aortic Dissection (Stanford Type A vs B)</strong> — Intimal tear allows blood to enter media, creating true/false lumens. Type A (ascending) requires emergent surgery; Type B (descending) often managed medically. Presenting: "Tearing" chest/back pain, pulse deficits, aortic regurgitation murmur, neurologic deficits. BP control target SBP 100-120 mmHg with beta-blocker.</li>
            </ul>
            
            <h3>Hypertension Management</h3>
            <p>Target BP: <130/80 mmHg (ACC/AHA 2017). First-line drugs: Thiazide diuretics, ACEi/ARB, CCB (amlodipine). Resistant hypertension: Add spironolactone or beta-blocker. Hypertensive emergency (organ damage): Admit, IV agents (nicardipine, labetalol, nitroprusside), lower BP gradually (max 25% reduction in first hour).</p>
          `
        }
      },
      {
        id: "cv_img_5",
        thumbnail: image_6,
        largeImage: image_6,
        labels: [], // No labels
        content: {
          overview: `
            <h2>Coronary Circulation & Cardiac Vessels</h2>
            <p>The heart receives its own blood supply through the coronary arteries, which originate from the aortic root just above the aortic valve. These vessels perfuse the myocardium during diastole, as systolic contraction compresses the vessels.</p>
            
            <h3>Right Coronary Artery (RCA)</h3>
            <ul>
              <li>Supplies: Right atrium, Right ventricle, SA node (60% of people), AV node (90% of people), Inferior wall of left ventricle</li>
              <li>Branches: Acute marginal, Posterior descending artery (PDA)</li>
              <li>Dominance: Right-dominant circulation (most common, 70%)</li>
            </ul>
            
            <h3>Left Coronary Artery (LCA)</h3>
            <ul>
              <li>Main trunk divides into:
                <ul>
                  <li><strong>Left Anterior Descending (LAD)</strong> — "Widow-maker" supplies anterior wall, septum, apex</li>
                  <li><strong>Left Circumflex (LCx)</strong> — Supplies lateral/posterior wall, left atrium</li>
                </ul>
              </li>
            </ul>
            
            <h3>Cardiac Veins</h3>
            <p>Most venous blood drains into the Coronary Sinus (posterior heart) → Right Atrium. Includes Great cardiac vein (accompanies LAD), Middle cardiac vein (accompanies PDA), Small cardiac vein (accompanies RCA marginals).</p>
          `,
          physiology: `
            <h2>Coronary Blood Flow Regulation</h2>
            
            <h3>Determinants of Coronary Flow</h3>
            <p>Coronary blood flow = (Diastolic pressure - Coronary sinus pressure) / Coronary vascular resistance. Normal resting flow ~250 mL/min (4-5% of cardiac output). Maximum flow (hyperemia) can increase 4-5x.</p>
            
            <h3>Autoregulation</h3>
            <p>Coronary flow remains constant across perfusion pressures 60-140 mmHg via metabolic vasodilation (adenosine, NO, prostaglandins). Hypoxia is the most potent coronary vasodilator — oxygen extraction is already high (70-80%), so flow MUST increase to meet demand.</p>
            
            <h3>Myocardial Oxygen Supply-Demand Balance</h3>
            <p>Supply determinants: Coronary perfusion pressure (diastolic BP - LV end-diastolic pressure), Diastolic time (↑ with lower HR), Coronary vasodilation capacity.</p>
            <p>Demand determinants: Heart rate (↑HR ↑demand), Contractility, Wall tension (LaPlace: Tension = Pressure × Radius / 2 × Wall thickness).</p>
          `,
          clinical: `
            <h2>Coronary Artery Disease (CAD)</h2>
            
            <h3>Angina Pectoris Types</h3>
            <ul>
              <li><strong>Stable Angina</strong> — Predictable, exertion-induced, relieved by rest/NTG. EKG: ST depression. Treatment: Beta-blockers, nitrates, calcium channel blockers.</li>
              <li><strong>Unstable Angina</strong> — Increasing frequency/severity, occurs at rest. Medical emergency — high risk for MI.</li>
              <li><strong>Variant (Prinzmetal) Angina</strong> — Coronary vasospasm, often at rest, ST elevation. Treatment: Calcium channel blockers, nitrates; avoid beta-blockers.</li>
            </ul>
            
            <h3>Diagnostic Tests</h3>
            <ul>
              <li><strong>ECG</strong> — Ischemic changes (ST depression, T wave inversion)</li>
              <li><strong>Stress Testing</strong> — Exercise or pharmacologic (dobutamine, adenosine) with ECG or imaging</li>
              <li><strong>Coronary Angiography</strong> — Gold standard for stenosis assessment</li>
              <li><strong>Coronary CTA</strong> — Non-invasive alternative for low-intermediate risk</li>
              <li><strong>Fractional Flow Reserve (FFR)</strong> — Physiologic significance of stenosis (≤0.80 indicates ischemia)</li>
            </ul>
            
            <h3>Revascularization Options</h3>
            <ul>
              <li><strong>PCI (Percutaneous Coronary Intervention)</strong> — Stent placement. Indications: ACS, failed medical therapy, severe symptoms. DAPT required (aspirin + P2Y12 inhibitor).</li>
              <li><strong>CABG (Coronary Artery Bypass Graft)</strong> — Surgical revascularization. Indications: Left main disease, 3-vessel disease, diabetes with multivessel CAD, complex lesions. Grafts: LIMA (left internal mammary artery) to LAD is best (10-year patency ~90%).</li>
            </ul>
          `
        }
      },
      {
        id: "cv_img_6",
        thumbnail: image_7,
        largeImage: image_7,
        labels: [], // No labels
        content: {
          overview: `
            <h2>Embryology of the Heart</h2>
            <p>The heart is the first functional organ to develop, beginning around day 18-19 of gestation. Understanding cardiac development explains many congenital heart defects.</p>
            
            <h3>Timeline of Cardiac Development</h3>
            <ul>
              <li><strong>Day 18-19</strong> — Cardiogenic mesoderm forms paired heart tubes</li>
              <li><strong>Day 21</strong> — Heart tubes fuse → single primitive heart tube</li>
              <li><strong>Day 22</strong> — First heartbeat begins (tubular heart)</li>
              <li><strong>Day 23-28</strong> — Cardiac looping (transforms straight tube into four-chamber precursor)</li>
              <li><strong>Week 5-7</strong> — Septation of atria and ventricles</li>
              <li><strong>Week 7-8</strong> — Outflow tract (truncus arteriosus) divides into aorta and pulmonary trunk</li>
              <li><strong>Week 10</strong> — Fetal heart resembles mature structure</li>
            </ul>
            
            <h3>Pharyngeal Arch Arteries</h3>
            <p>Six pairs of aortic arches form and remodel into adult great vessels:</p>
            <ul>
              <li>Arch I & II — Mostly regress</li>
              <li>Arch III — Common carotid arteries</li>
              <li>Arch IV — Left: Aortic arch; Right: Proximal subclavian artery</li>
              <li>Arch VI — Left: Pulmonary artery + Ductus arteriosus; Right: Pulmonary artery</li>
            </ul>
          `,
          physiology: `
            <h2>Fetal Circulation & Transition at Birth</h2>
            
            <h3>Fetal Shunts (Essential for In Uero Survival)</h3>
            <ul>
              <li><strong>Ductus Venosus</strong> — Bypasses liver, connects umbilical vein to IVC. Oxygenated blood from placenta → IVC → RA.</li>
              <li><strong>Foramen Ovale</strong> — Opening between right and left atria. Allows blood to bypass non-functional lungs. Preferential flow directs oxygenated blood from IVC → LA → LV → aorta (brain/heart).</li>
              <li><strong>Ductus Arteriosus</strong> — Connects pulmonary trunk to aorta (just after left subclavian). Bypasses pulmonary circulation, directs blood to descending aorta → placenta.</li>
            </ul>
            
            <h3>Oxygen Saturation in Fetus</h3>
            <p>Umbilical vein (80%) → Ductus venosus → IVC (70%) → RA (70%). Foramen ovale directs RA → LA → LV → Ascending aorta (65%) → Coronary/cerebral circulation. The rest: RA → RV → Pulmonary artery (60%) → Ductus arteriosus (65%) → Descending aorta (60%) → Placenta (returns 50%).</p>
            
            <h3>Transition at Birth</h3>
            <ol>
              <li>First breath → Lungs expand → Pulmonary vascular resistance drops dramatically</li>
              <li>↑ Pulmonary blood flow → ↑ LA pressure</li>
              <li>Umbilical cord clamped → ↑ Systemic vascular resistance → ↑ LV pressure</li>
              <li>Reverse pressure gradient pushes foramen ovale closed (functional closure within minutes, anatomical closure by 1 year)</li>
              <li>↑ Arterial O₂ → Ductus arteriosus constricts (functional closure within 10-96 hours, anatomical closure by 2-3 weeks)</li>
            </ol>
            <p><strong>Persistent fetal circulation (PPHN)</strong> occurs when pulmonary resistance fails to drop, causing right-to-left shunting through foramen ovale and ductus arteriosus → severe hypoxemia.</p>
          `,
          clinical: `
            <h2>Congenital Heart Disease (CHD)</h2>
            <p>Most common birth defect (~1% live births). Classify by cyanosis and blood flow patterns.</p>
            
            <h3>Acyanotic Congenital Lesions (Left-to-Right Shunt)</h3>
            <ul>
              <li><strong>Ventricular Septal Defect (VSD)</strong> — Most common CHD (~30%). Small VSDs may close spontaneously. Large VSDs cause HF, failure to thrive, Eisenmenger syndrome if uncorrected. Physical exam: Harsh holosystolic murmur at LLSB, thrill.</li>
              <li><strong>Atrial Septal Defect (ASD)</strong> — Ostium secundum (most common). Fixed splitting S2, systolic ejection murmur at pulmonic area. Can remain asymptomatic into adulthood. Closure indicated if significant Qp:Qs >1.5:1.</li>
              <li><strong>Patent Ductus Arteriosus (PDA)</strong> — Continuous "machinery" murmur at LUSB. Indomethacin/ibuprofen can close in premies. Device or surgical closure for persistent PDA.</li>
              <li><strong>Atrioventricular Septal Defect (AVSD)</strong> — Common in Down syndrome. Complete AV canal defect requires early repair.</li>
            </ul>
            
            <h3>Cyanotic Congenital Lesions (Right-to-Left Shunt)</h3>
            <ul>
              <li><strong>Tetralogy of Fallot (TOF)</strong> — Four features: VSD, Overriding aorta, RV outflow obstruction (pulmonic stenosis), RV hypertrophy. Hypoxic "tet spells" treated with knee-chest position, propranolol. Repair at 4-6 months.</li>
              <li><strong>Transposition of Great Arteries (TGA)</strong> — Aorta from RV, Pulmonary from LV (parallel circulations). Requires mixing via ASD, VSD, or PDA. Prostaglandin E1 keeps ductus open. Arterial switch operation in first 2 weeks.</li>
              <li><strong>Tricuspid Atresia</strong> — No RV inflow. ASD required for survival. Fontan palliation staged.</li>
              <li><strong>Truncus Arteriosus</strong> — Single vessel overrides VSD. Early repair required.</li>
              <li><strong>Hypoplastic Left Heart Syndrome (HLHS)</strong> — Left-sided structures underdeveloped. Norwood procedure (3-stage palliation) or transplant.</li>
            </ul>
            
            <h3>Eisenmenger Syndrome</h3>
            <p>Untreated large left-to-right shunts → Pulmonary overcirculation → Pulmonary hypertension → Reversal of shunt (right-to-left) → Late cyanosis, clubbing, polycythemia. Prognosis poor; treated with pulmonary vasodilators, heart-lung transplant.</p>
            
            <h3>Prostaglandin E1 (PGE1)</h3>
            <p>Life-saving infusion for ductus-dependent lesions (TGA, HLHS, pulmonary atresia, severe coarctation). Keeps ductus arteriosus open until surgical palliation. Side effects: Apnea (may require intubation), hypotension, fever, seizures.</p>
          `
        }
      }
    ]
  },
  {
    slug: "nervous-system",
    title: "Nervous System",
    category: "System",
    tags: ["NEUROLOGY", "CORE"],
    description: "The nervous system coordinates all body activities by transmitting electrical signals between the brain, spinal cord, and peripheral nerves.",
    terminology: {
      count: 22,
      label: "Terms Available"
    },
    gallery: [
      {
        id: "ns_img_1",
        thumbnail: image_4,
        largeImage: image_4,
        labels: [], // No labels
        content: {
          overview: `
            <h2>Central vs. Peripheral Nervous System</h2>
            <p>The nervous system coordinates sensory processing, motor command outputs, and higher executive functions. It is anatomically split into two sectors:</p>
            <ul>
              <li><strong>Central Nervous System (CNS)</strong> — Composed of the brain and spinal cord, acting as the main processing unit.</li>
              <li><strong>Peripheral Nervous System (PNS)</strong> — Consists of cranial and spinal nerves linking the CNS to organs, muscles, and sensory structures.</li>
            </ul>
          `,
          physiology: `
            <h2>Synaptic Signal Transmission</h2>
            <p>Information travels down functional units called neurons. When an electrical action potential travels down an axon to the terminal membrane, voltage-gated calcium channels open, inducing exocytosis of neurotransmitter-filled vesicles into the synaptic cleft.</p>
          `,
          clinical: `
            <h2>Demyelinating Diseases</h2>
            <p><strong>Multiple Sclerosis (MS)</strong> is an autoimmune disorder where the immune system attacks and degrades the fatty myelin sheath surrounding CNS axons, severely impairing signal propagation and causing progressive motor and visual deficits.</p>
          `
        }
      },
      {
        id: "ns_img_2",
        thumbnail: image_5,
        largeImage: image_5,
        labels: [], // No labels
        content: {
          overview: `
            <h2>Autonomic Nervous System Divisions</h2>
            <p>The visceral motor division of the PNS controls involuntary visceral organs and tissues automatically, balancing homeostasis through opposing pathways.</p>
          `,
          physiology: `
            <h2>Sympathetic vs. Parasympathetic Control</h2>
            <p>The autonomic branches operate in an equilibrium shift based on external stress cues:</p>
            <ul>
              <li><strong>Sympathetic Branch (Fight or Flight)</strong> — Increases heart rate, dilates bronchioles, and shifts blood flow to skeletal muscle during stressful scenarios.</li>
              <li><strong>Parasympathetic Branch (Rest and Digest)</strong> — Promotes digestion, lowers heart rate via vagus nerve outputs, and conserves metabolic energy reserves.</li>
            </ul>
          `,
          clinical: `
            <h2>Autonomic Dysreflexia</h2>
            <p>An acute, dangerous clinical state that occurs in spinal cord injury patients above the T6 level, where over-reactive autonomic responses cause sudden, uncontrolled spikes in blood pressure.</p>
          `
        }
      }
    ]
  }
];

export default body_system_detail_data;