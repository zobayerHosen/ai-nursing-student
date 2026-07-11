// ============================================================

import { getDemoMaps } from './sampleData';

/**
 * Build the user content array for the Anthropic API,
 * embedding attachments as image/document/text blocks.
 */
function buildUserContentWithAttachments(textPart, attachments = []) {
  if (!attachments || attachments.length === 0) {
    return textPart; // Plain string when no attachments
  }

  const blocks = [];

  attachments.forEach((a) => {
    if (a.kind === 'image' && a.data) {
      blocks.push({
        type: 'image',
        source: { type: 'base64', media_type: a.type || 'image/png', data: a.data },
      });
    } else if (a.kind === 'pdf' && a.data) {
      blocks.push({
        type: 'document',
        source: { type: 'base64', media_type: 'application/pdf', data: a.data },
      });
    } else if (a.kind === 'text' && a.text) {
      blocks.push({
        type: 'text',
        text: `[Attached file: ${a.name}]\n${a.text}\n[End of ${a.name}]`,
      });
    }
  });

  // Add the text prompt last
  blocks.push({ type: 'text', text: textPart });
  return blocks;
}

/**
 * Call the Anthropic API to generate a full concept map from a patient snapshot.
 *
 * @param {string} snapshot - Patient description text
 * @param {string} existingContext - Additional context from previous conversation
 * @param {Array} attachments - File attachments (images, PDFs, text)
 * @returns {Promise<object>} Parsed AI response with nodes/edges data
 */
export async function generateMapFromSnapshot(snapshot, existingContext = '', attachments = []) {
  const cleanInput = (snapshot || '').trim().toUpperCase();
  if (cleanInput === 'CHF') {
    const { CHF_MAP } = getDemoMaps();
    return CHF_MAP;
  }
  if (cleanInput === 'PNEUMONIA') {
    const { PNEUMONIA_MAP } = getDemoMaps();
    return PNEUMONIA_MAP;
  }

  const systemPrompt = `You are CARA, a clinical nursing education AI for STEMRN (an NCLEX prep platform).
You generate evidence-based nursing concept maps for student learning.

The student may provide rich clinical data across these categories — extract and incorporate all of it:
- **Patient Profile**: age, gender, chief complaint / reason for admission
- **Medical History**: primary diagnosis, secondary comorbidities, surgical history
- **Subjective Data**: patient-reported symptoms (pain 7/10, anxiety, SOB, nausea)
- **Objective Data**: vitals, physical assessment findings (lung sounds, skin, bowel sounds), lab values, diagnostics
- **Medications**: current meds AND the specific indication for each (why this patient is on it)
- **Nursing Interventions**: actions already in place (O₂ therapy, wound care, fall precautions, telemetry, etc.)

Produce a comprehensive concept map in STRICT JSON format only — no prose, no code fences, no markdown. Just raw JSON.

Schema:
{
  "title": "Short map title (e.g., 'CHF + T2DM + CKD — Concept Map')",
  "centralConcept": { "title": "Primary dx OR integrated dx if comorbidities", "body": "1-2 line definition including age/sex/CC" },
  "subjective": [ { "title": "Short header", "body": "• bullet\\n• bullet" } ],
  "objective":  [ { "title": "Short header", "body": "• bullet\\n• bullet" } ],
  "risk":       [ { "title": "Risk Factors", "body": "• bullet\\n• bullet" } ],
  "diagnoses":  [ { "title": "Nursing Dx (NANDA-I)", "body": "r/t ...\\nAEB ..." } ],
  "interventions": [ { "title": "Action", "body": "Specifics, dose, frequency", "diagnosisIndex": 0 } ],
  "outcomes":   [ { "title": "SMART goal summary", "body": "Measurable endpoint + timeframe", "interventionIndex": 0 } ],
  "complications": [ { "title": "Long-term risk", "body": "• bullet" } ],
  "medications": [ { "title": "Drug name (class)", "body": "Indication for THIS patient + key nursing considerations" } ]
}

Rules for single-illness maps:
- 2-4 subjective, 2-4 objective, 1 risk (consolidated bullets), 3-4 nursing diagnoses, 3-5 interventions, 2-4 outcomes.
- 0-3 complications, 0-3 medications.

Rules for COMORBIDITY maps (multiple diagnoses like DM + HTN + CKD, or CHF + A-fib + DM):
- Title MUST reflect the combined picture.
- centralConcept title should reference the integrated syndrome, body should name the primary systems affected.
- Include 4-6 nursing diagnoses addressing EACH comorbidity's priority problems.
- Interventions should show CROSS-OVER management.
- Complications section becomes CRITICAL — show the "vicious cycles". Use 3-5 complication nodes.
- Medications list should include 4-6 meds when provided.
- Outcomes must be SMART and multi-system where appropriate.

Universal rules:
- Nursing diagnoses MUST be NANDA-I phrased with "r/t" (related to) etiology and "AEB" (as evidenced by) cues.
- Interventions: specific, nurse-scope actions. Link each to a diagnosis via diagnosisIndex (0-based).
- Outcomes: SMART. Link to an intervention via interventionIndex.
- Prioritize using ABCs (Airway, Breathing, Circulation) — the FIRST nursing diagnosis should be the highest-priority.
- Titles under 5 words. Bullets concise.
- If snapshot is vague, infer a realistic teaching scenario.
- If attachments are provided, extract data from them.

Return ONLY the JSON object. No markdown fences. No preamble.`;

  const textPart = existingContext
    ? `Patient snapshot: ${snapshot}\n\nAdditional context from student so far:\n${existingContext}\n\nGenerate the full concept map now.`
    : `Patient snapshot: ${snapshot || '(see attached documents)'}\n\nGenerate the full concept map now.`;

  const userContent = buildUserContentWithAttachments(textPart, attachments);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userContent }],
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    // Strip any accidental code fences
    const clean = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
    return JSON.parse(clean);
  } catch (err) {
    console.error('Map generation API error:', err);
    throw err;
  }
}

/**
 * Follow-up conversational AI: either adds nodes, regenerates, or just replies.
 *
 * @param {string} userInput - Student's follow-up request
 * @param {Array} attachments - Optional file attachments
 * @param {object} currentMap - Snapshot of current map state {title, nodes, edges}
 * @returns {Promise<object>} { action, message, additions?, map? }
 */
export async function caraRefine(userInput, attachments = [], currentMap) {
  const cleanInput = (userInput || '').trim().toUpperCase();
  if (cleanInput === 'CHF') {
    const { CHF_MAP } = getDemoMaps();
    return {
      action: 'regenerate',
      message: 'I have generated the concept map for CHF exacerbation as requested.',
      map: CHF_MAP,
    };
  }
  if (cleanInput === 'PNEUMONIA') {
    const { PNEUMONIA_MAP } = getDemoMaps();
    return {
      action: 'regenerate',
      message: 'I have generated the concept map for Pneumonia as requested.',
      map: PNEUMONIA_MAP,
    };
  }

  const systemPrompt = `You are CARA, a nursing concept map assistant. A student has an existing map and wants to refine it.

Respond in STRICT JSON only — no markdown, no code fences:
{
  "action": "reply" | "add_nodes" | "regenerate",
  "message": "Conversational response to the student (supportive, concise, uses clinical terminology)",
  "additions": [ /* only if action=add_nodes */
    { "type": "subjective|objective|diagnosis|intervention|outcome|risk|complication|medication",
      "title": "Short title", "body": "Details",
      "linkFromNodeId": "optional existing node id", "linkToNodeId": "optional",
      "phrase": "linking phrase" }
  ],
  "map": { /* only if action=regenerate — full new map in the same schema */ }
}

Rules:
- Use "add_nodes" for small additions.
- Use "regenerate" for structural changes.
- Use "reply" for questions or explanations.
- Keep messages under 3 sentences unless explaining pathophysiology.`;

  const mapSnapshot = currentMap || {};
  const textPart = `Existing map:\n${JSON.stringify(mapSnapshot, null, 2)}\n\nStudent request: ${userInput || '(see attached)'}`;
  const userContent = buildUserContentWithAttachments(textPart, attachments);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 3000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userContent }],
      }),
    });

    if (!response.ok) throw new Error(`API error ${response.status}`);

    const data = await response.json();
    const text = data.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();
    const clean = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
    return JSON.parse(clean);
  } catch (err) {
    console.error('Refinement API error:', err);
    throw err;
  }
}
