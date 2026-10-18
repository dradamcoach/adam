// ADAM — ready-made planner items for kinds that have no exercise library (swim / run / timed).
// Each preset becomes one planner item. Review the numbers against your athlete's level.
const P = (ar, en, o) => Object.assign({ ar, en }, o);
export const SWIM_PRESETS = [
  P('إحماء سباحة حرة سهل', 'Easy freestyle warm-up', { sets: 1, distance: '400m', stroke: 'free', rest: '' }),
  P('تكنيك: درلات حرة', 'Technique: freestyle drills', { sets: 6, reps: '1', distance: '50m', stroke: 'drill', rest: '20s' }),
  P('رجلين (كيك) بلوح', 'Kick with board', { sets: 6, reps: '1', distance: '50m', stroke: 'kick', rest: '20s' }),
  P('دراعات (بول) بكولبوي', 'Pull with buoy', { sets: 4, reps: '1', distance: '100m', stroke: 'pull', rest: '20s' }),
  P('بناء قاعدة هوائية 8×100', 'Aerobic base 8 × 100', { sets: 8, reps: '1', distance: '100m', stroke: 'free', rest: '20s', intensity: '6', basis: 'rpe' }),
  P('عتبة 5×200', 'Threshold 5 × 200', { sets: 5, reps: '1', distance: '200m', stroke: 'free', rest: '30s', intensity: '7', basis: 'rpe' }),
  P('سرعة 8×25 سبرينت', 'Speed 8 × 25 sprint', { sets: 8, reps: '1', distance: '25m', stroke: 'free', rest: '30s', intensity: '9', basis: 'rpe' }),
  P('متنوع IM 4×100', 'IM 4 × 100', { sets: 4, reps: '1', distance: '100m', stroke: 'im', rest: '30s' }),
  P('سباحة ظهر 4×50', 'Backstroke 4 × 50', { sets: 4, reps: '1', distance: '50m', stroke: 'back', rest: '20s' }),
  P('سباحة صدر 4×50', 'Breaststroke 4 × 50', { sets: 4, reps: '1', distance: '50m', stroke: 'breast', rest: '20s' }),
  P('فراشة 4×25 تكنيك', 'Butterfly 4 × 25 technique', { sets: 4, reps: '1', distance: '25m', stroke: 'fly', rest: '30s' }),
  P('سباحة متواصلة 800م', 'Continuous swim 800 m', { sets: 1, distance: '800m', stroke: 'free', rest: '' }),
  P('تهدئة سباحة سهلة', 'Easy swim cool-down', { sets: 1, distance: '200m', stroke: 'free', rest: '' })
];
export const RUN_PRESETS = [
  P('جري سهل متواصل 30 دقيقة', 'Easy continuous run 30 min', { sets: 1, duration: '30min', intensity: '5', basis: 'rpe' }),
  P('فارتلك 8×1 دقيقة', 'Fartlek 8 × 1 min', { sets: 8, duration: '1min', rest: '1min', intensity: '8', basis: 'rpe' }),
  P('تكرارات 400م × 8', 'Repeats 8 × 400 m', { sets: 8, reps: '1', distance: '400m', rest: '90s', intensity: '8', basis: 'rpe' }),
  P('تكرارات 200م × 10', 'Repeats 10 × 200 m', { sets: 10, reps: '1', distance: '200m', rest: '60s', intensity: '8', basis: 'rpe' }),
  P('سبرينت 60م × 6', 'Sprints 6 × 60 m', { sets: 6, reps: '1', distance: '60m', rest: '2min', intensity: '9', basis: 'rpe' }),
  P('سبرينت 100م × 5', 'Sprints 5 × 100 m', { sets: 5, reps: '1', distance: '100m', rest: '3min', intensity: '9', basis: 'rpe' }),
  P('تكرارات 800م × 4', 'Repeats 4 × 800 m', { sets: 4, reps: '1', distance: '800m', rest: '2min', intensity: '8', basis: 'rpe' }),
  P('تكرارات 1000م × 5', 'Repeats 5 × 1000 m', { sets: 5, reps: '1', distance: '1000m', rest: '2min', intensity: '7', basis: 'rpe' }),
  P('تمرين تَمبو 20 دقيقة', 'Tempo run 20 min', { sets: 1, duration: '20min', intensity: '7', basis: 'rpe' }),
  P('طلوع تلّة 8×30 ثانية', 'Hill sprints 8 × 30 s', { sets: 8, duration: '30s', rest: '90s', intensity: '9', basis: 'rpe' }),
  P('جري طويل 60 دقيقة', 'Long run 60 min', { sets: 1, duration: '60min', intensity: '5', basis: 'rpe' })
];
export const TIMED_PRESETS = [
  P('تاباتا 20/10 × 8', 'Tabata 20 s / 10 s × 8', { sets: 8, duration: '20s', rest: '10s' }),
  P('فترات 40/20 × 6', 'Intervals 40 s / 20 s × 6', { sets: 6, duration: '40s', rest: '20s' }),
  P('فترات 30/30 × 10', 'Intervals 30 s / 30 s × 10', { sets: 10, duration: '30s', rest: '30s' }),
  P('فترات 1 دقيقة شغل / 1 راحة × 6', 'Intervals 1 min on / 1 min off × 6', { sets: 6, duration: '1min', rest: '1min' }),
  P('EMOM كل دقيقة × 10', 'EMOM 10 min', { sets: 10, duration: '1min', rest: '' }),
  P('بلانك ثابت', 'Plank hold', { sets: 3, duration: '45s', rest: '30s' }),
  P('جلسة حائط', 'Wall sit', { sets: 3, duration: '45s', rest: '30s' }),
  P('نطّ الحبل', 'Jump rope', { sets: 5, duration: '1min', rest: '30s' }),
  P('تجديف ماكينة 500م', 'Row machine 500 m', { sets: 4, distance: '500m', rest: '2min' }),
  P('دراجة ثابتة فترات', 'Bike intervals', { sets: 8, duration: '30s', rest: '90s' })
];
