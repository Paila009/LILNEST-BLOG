export function buildFitnessPlan(profile = {}) {
  const p = profile || {};
  const med = p.medical || {};
  const trimester = String(p.trimester || '').toLowerCase();
  const symptoms = (p.symptoms || '').toLowerCase();

  const warnings = [];
  const recommendations = [];
  const contraindications = [
    'Vaginal bleeding or leaking fluid',
    'Severe headache or visual disturbances',
    'Chest pain or shortness of breath at rest',
    'Painful contractions or decreased fetal movements',
    'Dizziness or fainting episodes during activity'
  ];

  // Baseline tips
  recommendations.push(
    '5‑minute warm‑up + gentle mobility',
    'Light hydration before & after. Avoid overheating',
  );

  // Trimester recommendations
  if (trimester.startsWith('1')) {
    recommendations.push('10‑20 min easy walking, posture work, gentle yoga');
  } else if (trimester.startsWith('2')) {
    recommendations.push('Avoid prolonged supine past week 20; prefer side‑lying');
    recommendations.push('20‑30 min walking, cat‑cow, pelvic tilts, hip openers');
  } else if (trimester.startsWith('3')) {
    recommendations.push('Short 10‑15 min bouts; breathing practice & pelvic floor relaxation');
  }

  // Condition‑specific adjustments
  if (med.diabetes) {
    recommendations.push('10‑15 min light walk after meals (GDM)');
  }
  if (med.anemia) {
    warnings.push('Low intensity only; stop if dizzy or unusually fatigued');
  }
  if (med.bp) {
    warnings.push('Avoid breath‑holding & supine work; keep pace slow');
  }
  if (med.epilepsy) {
    warnings.push('Avoid overheating and flashing lights; keep sessions supervised');
  }
  if (med.asthma) {
    warnings.push('Carry inhaler; prefer humid, trigger‑free environments');
  }

  // Symptom triggers
  if (symptoms.includes('dizz')) warnings.push('Recent dizziness noted — keep sessions seated or side‑lying');
  if (symptoms.includes('bleed')) warnings.push('Bleeding reported — avoid exercise and contact your doctor');

  // Construct a simple daily 15‑minute plan
  const dailyPlan = [
    'Warm‑up: neck/shoulder rolls & ankle pumps (2 min)',
    'Breathing: diaphragmatic or box breathing (2 min)',
    trimester.startsWith('2') ? 'Side‑lying hip abductions (2×8 each side)' : 'Pelvic tilts against wall (2×8)',
    'Cat‑cow + child’s pose (2 min, comfortable range)',
    med.diabetes ? 'Post‑meal easy walk (10–15 min)' : 'Easy walk (6–8 min) or seated marching',
    'Cool down + water (1 min)'
  ];

  return { warnings, recommendations, dailyPlan, contraindications };
}
