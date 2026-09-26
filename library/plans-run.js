/*
 * خطط موسمية جاهزة — العدو والحواجز والمسافات المتوسطة والطويلة
 * ١٠٠م، ٢٠٠م، ٤٠٠م، سرعة للناشئين، ١١٠م حواجز، ٨٠٠م، ١٥٠٠م،
 * أول ٥ كم، ١٠ كم، نصف ماراثون، ماراثون كامل، وجري الترايل.
 * كل قالب: فترات ← بلوكات ← أسابيع (حمل ١-١٠) ← تمرينات مفصلة.
 */

const t = (ar, en) => ({ ar, en });
const W = (ar, en, x) => ({ kind: 'warmup', name: t(ar, en), ...x });
const M = (ar, en, x) => ({ kind: 'mobility', name: t(ar, en), ...x });
const wl = (libId, x) => ({ kind: 'warmup', libId, ...x });
const ml = (libId, x) => ({ kind: 'mobility', libId, ...x });

/* ======================= إحماء وتهدئة (نسخة جديدة كل مرة) ======================= */
const sprintWU = (strides) => {
  const a = [
    W('جري خفيف + مرونة ديناميكية للحوض والرجلين', 'Easy jog + dynamic hip and leg mobility', { duration: '12min' }),
    wl('ad_a_skip', { sets: 2, distance: '20m' }),
    wl('ad_b_skip', { sets: 2, distance: '20m' }),
    wl('wg_high_knees', { sets: 2, distance: '20m', note: t('رفع ركبة سريع والحوض عالي', 'Quick knee lift with tall hips') })
  ];
  if (strides) a.push(wl('ad_strides', { sets: 1, reps: '3', distance: '60m', note: t('تدريجي من ٧٠ لـ ٩٠٪', 'Progressive from 70 to 90%') }));
  return a;
};
const sprintCD = () => [
  M('جري خفيف للتهدئة + إطالات ثابتة', 'Easy cool-down jog + static stretching', { duration: '10min' }),
  ml('ex_hip_flexor_stretch', { sets: 2, duration: '40s', note: t('لكل رجل', 'Each side') })
];
const hurdleWU = () => [
  W('جري خفيف + مرونة ديناميكية', 'Easy jog + dynamic mobility', { duration: '10min' }),
  wl('dr_hurdle_walkover', { sets: 2, reps: '8', note: t('٨ حواجز، مشي فوقهم أمامي وجانبي', '8 hurdles, forward and lateral walkovers') }),
  wl('ad_a_skip', { sets: 2, distance: '20m' }),
  wl('ad_strides', { sets: 1, reps: '3', distance: '60m', note: t('تدريجي من ٧٠ لـ ٩٠٪', 'Progressive from 70 to 90%') })
];
const runWU = (strides) => {
  const a = [
    W('جري سهل', 'Easy jog', { duration: '15min', intensity: 'Z1-Z2', basis: 'hr' }),
    wl('ad_a_skip', { sets: 2, distance: '20m' }),
    wl('ad_butt_kicks', { sets: 2, distance: '20m' })
  ];
  if (strides) a.push(wl('ad_strides', { sets: 1, reps: '4', distance: '80m', note: t('تدريجي لحد سرعة سباق ١٥٠٠م تقريبًا', 'Progressive up to about 1500m race pace') }));
  return a;
};
const runCD = () => [
  M('جري سهل للتهدئة', 'Easy cool-down jog', { duration: '10min' }),
  ml('ex_calf_stretch', { sets: 2, duration: '40s', note: t('لكل رجل، ركبة مفرودة ثم مثنية', 'Each leg, straight then bent knee') })
];
const gymWU = () => [
  W('عجلة ثابتة خفيفة', 'Easy stationary bike', { duration: '8min' }),
  wl('ad_90_90_hip_switches', { sets: 2, reps: '8' }),
  wl('wg_banded_lateral_walk', { sets: 2, reps: '10/side' })
];
const gymCD = () => [
  M('إطالات ثابتة للرجلين والظهر', 'Static stretching legs and back', { duration: '8min' })
];

/* ======================= تمرينات مشتركة للعدائين (سرعة) ======================= */
/* lv: 'adv' | 'int' */
const sprGenStr = (lv) => ({
  title: t('قوة عامة وتضخيم وظيفي', 'General strength & functional hypertrophy'),
  goal: t('بناء قاعدة قوة للسلسلة الخلفية والرجلين وتجهيز الأوتار لأحمال السرعة والبليومتري الجاية.', 'Build posterior-chain and leg strength and prepare tendons for the sprint and plyometric loads ahead.'),
  components: ['strength', 'hypertrophy', 'prevention'],
  rpe: 7, duration: 80,
  items: [
    ...gymWU(),
    { kind: 'strength', libId: 'ad_hang_power_clean', sets: 4, reps: '4', intensity: lv === 'adv' ? '70' : '65', basis: '1rm', rest: '2min', purpose: t('تعلم وتكرار الامتداد الثلاثي السريع', 'Groove fast triple extension'), component: 'power' },
    { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 4, reps: '6', intensity: lv === 'adv' ? '75' : '70', basis: '1rm', tempo: '3-0-1-0', rest: '3min', purpose: t('قوة عامة للرجلين وتضخيم', 'General leg strength and hypertrophy'), component: 'strength', note: t('أول أسبوع: اطلع لـ 3RM لحساب نسب الموسم (1RM تقديري = 3RM × 1.08)', 'Week 1: work up to a 3RM to set season percentages (est. 1RM = 3RM x 1.08)') },
    { kind: 'strength', libId: 'ex_romanian_deadlift', sets: 3, reps: '8', intensity: '2', basis: 'rir', tempo: '3-1-1-0', rest: '2min', purpose: t('قوة الخلفية والمؤخرة (محرك الجري)', 'Hamstring and glute strength, the sprint engine'), component: 'strength' },
    { kind: 'strength', libId: 'ex_bulgarian_split_squat', sets: 3, reps: '8/leg', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '90s', purpose: t('قوة الرجل الواحدة وثبات الحوض', 'Single-leg strength and pelvic control'), component: 'strength' },
    { kind: 'strength', libId: 'ex_nordic_hamstring_curl', sets: 3, reps: '5', intensity: '8', basis: 'rpe', tempo: '4-0-X-0', rest: '2min', purpose: t('وقاية الخلفية من الشد (قوة لامركزية)', 'Hamstring strain prevention (eccentric strength)'), component: 'prevention' },
    { kind: 'strength', libId: 'wg_single_leg_calf_raise', sets: 3, reps: '12/leg', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '60s', purpose: t('تحمل وتر أكيليس والسمانة', 'Achilles and calf capacity'), component: 'prevention' },
    { kind: 'strength', libId: 'ex_pullup', sets: 3, reps: '6-8', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '90s', purpose: t('قوة الجزء العلوي لمرجحة ذراع قوية', 'Upper-body strength for a powerful arm action'), component: 'strength' },
    ...gymCD()
  ]
});
const sprMaxStr = (lv) => ({
  title: t('قوة قصوى', 'Max strength'),
  goal: t('رفع القوة القصوى بتكرارات قليلة وأوزان عالية ونية سرعة قصوى في كل تكرار.', 'Raise max strength with low reps, heavy loads and maximal intent on every rep.'),
  components: ['max_strength', 'power'],
  rpe: 8, duration: 85,
  items: [
    ...gymWU(),
    { kind: 'strength', libId: 'ad_power_clean', sets: 5, reps: '2', intensity: lv === 'adv' ? '80-85' : '75-80', basis: '1rm', rest: '3min', purpose: t('قدرة قصوى من الأرض', 'Maximal power from the floor'), component: 'power' },
    { kind: 'strength', libId: 'ex_barbell_back_squat', sets: lv === 'adv' ? 5 : 4, reps: lv === 'adv' ? '3' : '4', intensity: lv === 'adv' ? '85-90' : '80-85', basis: '1rm', tempo: '2-0-X-0', rest: '4min', purpose: t('قوة قصوى للرجلين', 'Maximal leg strength'), component: 'max_strength', note: t('أسبوع التخفيف: ٣×٣ على ٧٥٪', 'Deload week: 3x3 at 75%') },
    { kind: 'strength', libId: 'ex_hip_thrust', sets: 4, reps: '5', intensity: '8', basis: 'rpe', tempo: '1-1-X-0', rest: '2min', purpose: t('قوة مد الحوض (أهم عضلة في السرعة القصوى)', 'Hip-extension strength, key for max velocity'), component: 'max_strength' },
    { kind: 'strength', libId: 'ek_step_ups_with_barbell', sets: 3, reps: '4/leg', intensity: '8', basis: 'rpe', tempo: '1-0-X-0', rest: '2min', purpose: t('قوة دفع الرجل الواحدة', 'Unilateral drive strength'), component: 'max_strength', note: t('صندوق بارتفاع الركبة تقريبًا', 'Box at about knee height') },
    { kind: 'strength', libId: 'ex_nordic_hamstring_curl', sets: 2, reps: '4', intensity: '8', basis: 'rpe', tempo: '4-0-X-0', rest: '2min', purpose: t('الحفاظ على القوة اللامركزية للخلفية', 'Maintain eccentric hamstring strength'), component: 'prevention' },
    { kind: 'strength', libId: 'wg_pallof_press', sets: 3, reps: '10/side', intensity: '7', basis: 'rpe', tempo: '2-2-2-0', rest: '45s', purpose: t('ثبات الجذع ضد اللف وقت الجري', 'Anti-rotation trunk control for running'), component: 'core' },
    ...gymCD()
  ]
});
const sprPower = (lv) => ({
  title: t('قدرة وتباين (كونتراست)', 'Power & contrast training'),
  goal: t('تحويل القوة لسرعة إنتاج قوة: رفعة ثقيلة يليها وثب بدون وزن (تنشيط ما بعد الانقباض).', 'Convert strength into rate of force development: heavy lift followed by unloaded jumps (post-activation potentiation).'),
  components: ['power', 'max_strength'],
  rpe: 7, duration: 70,
  items: [
    ...gymWU(),
    { kind: 'strength', libId: 'ad_power_clean', sets: 4, reps: '2', intensity: lv === 'adv' ? '85' : '80', basis: '1rm', rest: '3min', purpose: t('قدرة قصوى بحجم قليل', 'Maximal power at low volume'), component: 'power' },
    { kind: 'strength', libId: 'ad_back_squat_to_jump_squat_contrast', sets: lv === 'adv' ? 4 : 3, reps: '2+4', intensity: lv === 'adv' ? '85' : '80', basis: '1rm', tempo: '2-0-X-0', rest: '4min', purpose: t('تنشيط الجهاز العصبي بالثقيل ثم تحويله لوثب انفجاري', 'Potentiate with heavy squats then express as explosive jumps'), component: 'power', note: t('٢ سكوات ثم خلال ٢٠-٣٠ ثانية ٤ قفزات بدون وزن', '2 squats then within 20-30 s 4 unloaded jumps') },
    { kind: 'strength', libId: 'ad_trap_bar_jump', sets: 3, reps: '4', intensity: '30', basis: '1rm', rest: '2min', purpose: t('قدرة بسرعة عالية بحمل خفيف', 'High-velocity loaded jumps'), component: 'power', note: t('النسبة من 1RM الديدليفت بالبار السداسي', 'Percentage of trap-bar deadlift 1RM') },
    { kind: 'drill', libId: 'ad_medicine_ball_overhead_backward_throw', sets: 3, reps: '4', rest: '90s', purpose: t('قدرة امتداد الجسم كله', 'Whole-body extension power'), component: 'power', note: t('كرة ٤ كجم لأقصى مسافة', '4 kg ball for max distance') },
    { kind: 'strength', libId: 'ex_single_leg_rdl', sets: 3, reps: '5/leg', intensity: '2', basis: 'rir', tempo: '3-0-1-0', rest: '90s', purpose: t('ثبات الحوض وقوة الخلفية على رجل واحدة', 'Pelvic stability and single-leg hamstring strength'), component: 'prevention' },
    ...gymCD()
  ]
});
const sprMaint = () => ({
  title: t('قوة للحفاظ (فترة المنافسات)', 'Strength maintenance (competition phase)'),
  goal: t('الحفاظ على القوة والقدرة بحجم قليل جدًا وبدون تعب يأثر على السباق.', 'Maintain strength and power with very low volume and no fatigue carried into races.'),
  components: ['max_strength', 'power', 'prevention'],
  rpe: 6, duration: 50,
  items: [
    ...gymWU(),
    { kind: 'strength', libId: 'ad_hang_power_clean', sets: 3, reps: '2', intensity: '80', basis: '1rm', rest: '3min', purpose: t('الحفاظ على القدرة بدون حجم', 'Maintain power without volume'), component: 'power' },
    { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 3, reps: '2', intensity: '80-85', basis: '1rm', tempo: '2-0-X-0', rest: '3min', purpose: t('الحفاظ على القوة القصوى', 'Maintain max strength'), component: 'max_strength', note: t('الصعود بأقصى سرعة، وقف قبل ما السرعة تقل', 'Drive up as fast as possible, stop before bar speed drops') },
    { kind: 'drill', libId: 'ad_countermovement_jump', sets: 3, reps: '3', rest: '90s', purpose: t('تنشيط عصبي وقدرة رأسية', 'Neural activation and vertical power'), component: 'power' },
    { kind: 'strength', libId: 'ex_nordic_hamstring_curl', sets: 2, reps: '3', intensity: '7', basis: 'rpe', tempo: '4-0-X-0', rest: '2min', purpose: t('الحفاظ على وقاية الخلفية', 'Keep hamstring protection'), component: 'prevention' },
    ...gymCD()
  ]
});
const sprPlyoGen = () => ({
  title: t('بليومتري عام وكرة طبية', 'General plyometrics & med ball'),
  goal: t('تجهيز الكاحل والأوتار لأحمال الارتداد اللي جاية بشدة منخفضة ومتوسطة (١٠٠-١٢٠ ارتكاز).', 'Prepare ankles and tendons for later reactive loads at low-moderate intensity (100-120 contacts).'),
  components: ['power', 'coordination', 'prevention'],
  rpe: 6, duration: 70,
  items: [
    ...sprintWU(false),
    { kind: 'drill', libId: 'ad_pogo_hop', sets: 3, reps: '20', rest: '60s', purpose: t('صلابة الكاحل وتحمل الأوتار', 'Ankle stiffness and tendon conditioning'), component: 'prevention' },
    { kind: 'drill', libId: 'ad_power_skip', sets: 3, reps: '1', distance: '30m', rest: '90s', purpose: t('توافق الذراعين مع الرجلين في الدفع', 'Arm-leg coordination in the push'), component: 'coordination' },
    { kind: 'drill', libId: 'dr_hurdle_hops', sets: 4, reps: '5', rest: '90s', purpose: t('ارتداد رأسي منخفض الشدة', 'Low-intensity vertical rebounds'), component: 'power', note: t('حواجز ٥٠-٦٠سم', '50-60 cm hurdles') },
    { kind: 'drill', libId: 'ad_broad_jump', sets: 4, reps: '3', rest: '90s', purpose: t('قدرة أفقية وهبوط مسيطر عليه', 'Horizontal power and controlled landing'), component: 'power' },
    { kind: 'drill', libId: 'ad_single_leg_forward_hop_and_stick', sets: 2, reps: '5/leg', rest: '60s', purpose: t('ثبات الركبة والحوض في الهبوط على رجل واحدة', 'Knee and hip control landing on one leg'), component: 'prevention' },
    { kind: 'drill', libId: 'ad_medicine_ball_scoop_toss', sets: 3, reps: '5', rest: '90s', purpose: t('قدرة امتداد ثلاثي (كاحل-ركبة-حوض)', 'Triple-extension power'), component: 'power', note: t('كرة ٤-٥ كجم', '4-5 kg ball') },
    ...sprintCD()
  ]
});
const sprPlyo = () => ({
  title: t('بليومتري ارتدادي عالي الشدة', 'High-intensity reactive plyometrics'),
  goal: t('قوة ارتدادية وصلابة الرجل وقت الارتكاز (زمن ارتكاز قصير) — ١٠٠-١٣٠ ارتكاز عالي الجودة.', 'Reactive strength and leg stiffness at ground contact (short contact times) — 100-130 high-quality contacts.'),
  components: ['power', 'max_velocity'],
  rpe: 8, duration: 70,
  items: [
    ...sprintWU(false),
    { kind: 'drill', libId: 'ad_pogo_hop', sets: 2, reps: '15', rest: '90s', purpose: t('صلابة الكاحل وسرعة الارتداد', 'Ankle stiffness and fast rebound'), component: 'power' },
    { kind: 'drill', libId: 'ad_alternate_leg_bound', sets: 5, reps: '1', distance: '30m', rest: '3min', purpose: t('قدرة أفقية بارتكاز نشط تحت الحوض', 'Horizontal power with an active plant under the hips'), component: 'power', note: t('سجل الزمن وعدد الارتكازات', 'Record time and contact count') },
    { kind: 'drill', libId: 'ad_depth_jump', sets: 3, reps: '4', rest: '2min', purpose: t('قوة ارتدادية عالية (ارتكاز أقل من ٠.٢ ث)', 'High reactive strength (contact under 0.2 s)'), component: 'power', note: t('صندوق ٤٠-٥٠سم، اسقط واطلع فورًا', '40-50 cm box, drop and rebound immediately') },
    { kind: 'drill', libId: 'dr_hurdle_hops', sets: 3, reps: '6', rest: '2min', purpose: t('ارتداد رأسي متكرر بارتكاز قصير', 'Repeated vertical rebounds with short contacts'), component: 'power', note: t('حواجز ٧٦-٨٤سم', '76-84 cm hurdles') },
    { kind: 'drill', libId: 'ad_single_leg_pogo_hop', sets: 2, reps: '10/leg', rest: '90s', purpose: t('صلابة الكاحل على رجل واحدة زي الجري', 'Single-leg ankle stiffness, as in sprinting'), component: 'power' },
    ...sprintCD()
  ]
});
/* تيمبو ممتد: lv = 'adv' | 'int' | 'hurdle' */
const sprTempo = (lv) => ({
  title: lv === 'hurdle' ? t('مرونة الحواجز + تيمبو ممتد', 'Hurdle mobility + extensive tempo') : t('تيمبو ممتد + جذع', 'Extensive tempo + core'),
  goal: t('يوم منخفض الشدة لتحسين الاستشفاء والقاعدة الهوائية وثبات الجذع بدون ضغط عصبي.', 'Low-intensity day to improve recovery, aerobic base and trunk stability with no neural stress.'),
  components: lv === 'hurdle' ? ['aerobic', 'mobility', 'core', 'recovery'] : ['aerobic', 'core', 'recovery'],
  rpe: 4, duration: 60,
  items: [
    W('جري خفيف + حركات مرونة', 'Easy jog + mobility drills', { duration: '10min' }),
    ...(lv === 'hurdle' ? [{ kind: 'drill', name: t('مرونة الحواجز: رجل أمامية ورجل خلفية بجانب الحاجز', 'Hurdle mobility: lead-leg and trail-leg drills beside the hurdle'), sets: 3, reps: '8/leg', rest: '45s', purpose: t('مدى حركي للحوض خاص بالحواجز', 'Hurdle-specific hip range of motion'), component: 'mobility' }] : []),
    { kind: 'run', name: t('تيمبو ممتد على النجيل', 'Extensive tempo runs on grass'), sets: 2, reps: lv === 'adv' ? '6' : '5', distance: '100m', time: lv === 'adv' ? '14.5-15.5s' : '15.5-16.5s', intensity: '65-70', basis: 'best', rest: '45s', restType: 'walk', setRest: '3min', purpose: t('تحمل هوائي واستشفاء نشط', 'Aerobic capacity and active recovery'), component: 'aerobic', note: t('مشي ٥٠م بين التكرارات، الجري مسترخي وتكنيك نضيف', 'Walk 50 m between reps; relaxed and clean mechanics') },
    { kind: 'strength', libId: 'ex_dead_bug', sets: 3, reps: '10/side', intensity: '7', basis: 'rpe', tempo: '2-1-2-0', rest: '45s', purpose: t('ثبات الجذع ومنع تقوس أسفل الظهر', 'Anti-extension trunk control'), component: 'core' },
    { kind: 'strength', libId: 'ex_copenhagen_plank', sets: 3, reps: '20s/side', intensity: '7', basis: 'rpe', rest: '45s', purpose: t('قوة المقربات ووقاية الحوض', 'Adductor strength and groin protection'), component: 'prevention' },
    { kind: 'strength', libId: 'ex_side_plank', sets: 2, reps: '30s/side', intensity: '7', basis: 'rpe', rest: '30s', purpose: t('ثبات الجذع الجانبي', 'Lateral trunk stiffness'), component: 'core' },
    ml('wg_worlds_greatest_stretch', { sets: 2, reps: '5/side' })
  ]
});
const sprPrimer = (ev) => ({
  title: t('تنشيط قبل السباق', 'Pre-race primer'),
  goal: t('تنشيط الجهاز العصبي وتأكيد إحساس البداية بحجم قليل جدًا قبل السباق بيوم.', 'Prime the nervous system and rehearse the start with very low volume the day before racing.'),
  components: ['acceleration', 'reaction', 'mental'],
  rpe: 4, duration: 45,
  items: [
    ...sprintWU(true),
    { kind: 'run', libId: 'dr_sprint_accel', name: t('انطلاقات من البلوك', 'Block starts'), sets: 1, reps: '3', distance: '20m', intensity: '95', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('تنشيط سريع وتأكيد روتين البداية', 'Quick activation and start-routine rehearsal'), component: 'acceleration' },
    { kind: 'run', libId: 'ad_flying_sprint', sets: 1, reps: '2', distance: '20m', intensity: '95', basis: 'vmax', rest: '4min', restType: 'walk', purpose: t('إحساس السرعة العالية مع استرخاء', 'Feel high speed while relaxed'), component: 'max_velocity', note: ev === '400' ? t('ممكن تستبدل بـ ١×١٥٠م على ٨٥٪', 'May replace with 1x150m at 85%') : t('٢٠م طاير بعد ٢٠م اقتراب', '20 m fly after a 20 m run-in') },
    ...sprintCD()
  ]
});
const sprRace = (ev, evAr) => ({
  title: t('يوم السباق — ' + evAr + 'م', 'Race day — ' + ev + 'm'),
  goal: t('تنفيذ روتين السباق كامل: إحماء ثابت، بدايتين، وسباق بتركيز وخطة واضحة.', 'Execute the full race routine: consistent warm-up, a couple of starts and a focused race with a clear plan.'),
  components: ev === '400' ? ['special_endurance', 'speed_endurance', 'mental'] : ['acceleration', 'max_velocity', 'mental'],
  rpe: 9, duration: 120,
  items: [
    ...sprintWU(true),
    { kind: 'run', libId: 'dr_sprint_accel', name: t('بدايات من البلوك قبل السباق', 'Pre-race block starts'), sets: 1, reps: '2', distance: '30m', intensity: '90-95', basis: 'vmax', rest: '4min', restType: 'walk', purpose: t('تنشيط أخير قبل النداء', 'Final activation before the call room'), component: 'acceleration', note: t('آخر بداية قبل غرفة النداء بـ ٢٠-٢٥ دقيقة', 'Last start 20-25 min before the call room') },
    { kind: 'run', name: t('السباق (تصفيات + نهائي)', 'Race (heat + final)'), sets: 1, reps: '1-2', distance: (ev === '200' ? '200m' : ev + 'm'), intensity: '100', basis: 'best', rest: '60-120min', restType: 'passive', purpose: t('أحسن زمن في السباق', 'Best time of the meet'), component: ev === '400' ? 'special_endurance' : 'max_velocity', note: t('بين التصفية والنهائي: تهدئة، أكل خفيف، وإعادة إحماء مختصر', 'Between heat and final: cool down, light snack and a short re-warm-up') },
    M('تهدئة وإطالات بعد السباق', 'Post-race cool-down and stretching', { duration: '15min' })
  ]
});

/* =============================================================================
 * ١) ١٠٠م — متقدم (٢٠ أسبوع)
 * ============================================================================= */
const T_100_ADV = {
  id: 'pt_sprint_100m_adv',
  sport: 'sprint',
  level: 'advanced',
  title: t('١٠٠م عدو — متقدم (موسم ٢٠ أسبوع)', '100m sprint — advanced (20-week season)'),
  goal: t('تحسين التسارع والسرعة القصوى والحفاظ عليها في آخر ٣٠م، مع قوة قصوى وقدرة عالية، للوصول لأحسن رقم في البطولة الرئيسية.', 'Improve acceleration and max velocity and hold it through the last 30 m, backed by max strength and power, to peak at the main championship.'),
  components: ['acceleration', 'max_velocity', 'speed_endurance', 'power', 'max_strength'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: t('بناء القاعدة: قوة عامة، تسارع بمقاومة (طلعة وسليد)، قاعدة هوائية بالتيمبو، وتحمل سرعة ممتد.', 'Build the base: general strength, resisted acceleration (hills and sled), aerobic base through tempo and extensive speed endurance.'),
      components: ['strength', 'acceleration', 'aerobic', 'speed_endurance'],
      blocks: [
        {
          name: t('بلوك ١ — اختبارات ودخول', 'Block 1 — Testing & entry'),
          goal: t('قياس خط الأساس: ٣٠م بلوك، ٣٠م طاير، وثب طويل من الثبات، ١٥٠م زمن، و3RM سكوات.', 'Baseline: 30m blocks, 30m fly, standing long jump, 150m time trial and 3RM squat.'),
          components: ['acceleration', 'max_velocity', 'speed_endurance', 'max_strength'],
          loads: [4], weekTypes: ['test'],
          pattern: ['s100_test', 's100_tempo', 's100_gen_str', '', 's100_plyo_gen', 's100_tempo', '']
        },
        {
          name: t('بلوك ٢ — قاعدة عامة', 'Block 2 — General base'),
          goal: t('تسارع على طلعة وسليد، قوة عامة ٧٠-٧٥٪، و٣×٣×١٥٠م على ٧٥-٨٠٪ كتحمل سرعة ممتد.', 'Hill and sled acceleration, general strength at 70-75%, and 3x3x150m at 75-80% as extensive speed endurance.'),
          components: ['acceleration', 'strength', 'hypertrophy', 'speed_endurance', 'aerobic'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['s100_hill', 's100_gen_str', 's100_tempo', 's100_se_ext', 's100_gen_str', 's100_plyo_gen', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('قوة قصوى ثم تحويلها لقدرة، تسارع من البلوك، سرعة قصوى بالطاير والويكتس، وتحمل سرعة وتحمل خاص بشدة ٩٥٪.', 'Max strength then power conversion, block acceleration, max velocity via flys and wickets, and speed/special endurance at 95%.'),
      components: ['max_strength', 'acceleration', 'max_velocity', 'speed_endurance', 'special_endurance'],
      blocks: [
        {
          name: t('بلوك ٣ — قوة قصوى وتسارع', 'Block 3 — Max strength & acceleration'),
          goal: t('سكوات ٨٥-٩٠٪، ٢×٤×٣٠م من البلوك، ٦×٣٠م طاير، و٢×٣×١٢٠م على ٩٥٪.', 'Squat 85-90%, 2x4x30m from blocks, 6x30m fly, and 2x3x120m at 95%.'),
          components: ['max_strength', 'acceleration', 'max_velocity', 'speed_endurance'],
          loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['s100_accel', 's100_max_str', 's100_tempo', 's100_maxv', 's100_max_str', 's100_se', '']
        },
        {
          name: t('بلوك ٤ — تحويل القوة وتحمل خاص', 'Block 4 — Power conversion & special endurance'),
          goal: t('كونتراست وبليومتري ارتدادي، سرعة قصوى مرتين في الأسبوع، و٢×٢×١٥٠م على ٩٥٪ براحة كاملة.', 'Contrast work and reactive plyometrics, max velocity twice a week, and 2x2x150m at 95% with full recovery.'),
          components: ['power', 'max_velocity', 'special_endurance', 'acceleration'],
          loads: [7, 8, 5], weekTypes: ['load', 'shock', 'deload'],
          pattern: ['s100_maxv', 's100_power', 's100_tempo', 's100_accel', 's100_plyo', 's100_spe', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('إعادة الاختبار، بدايات برد الفعل على المسدس، ونموذج سباق (٦٠-٨٠م من البلوك) بشدة ٩٧-١٠٠٪.', 'Retest, reaction starts on the gun and race modelling (60-80 m from blocks) at 97-100%.'),
      components: ['reaction', 'acceleration', 'max_velocity', 'speed_endurance', 'mental'],
      blocks: [
        {
          name: t('بلوك ٥ — أسبوع اختبارات', 'Block 5 — Testing week'),
          goal: t('نفس اختبارات البداية للمقارنة وضبط أهداف الأزمنة في المنافسات.', 'Repeat baseline tests to compare and set competition time targets.'),
          components: ['acceleration', 'max_velocity', 'speed_endurance'],
          loads: [4], weekTypes: ['test'],
          pattern: ['s100_test', 's100_tempo', 's100_power', '', 's100_starts', 's100_tempo', '']
        },
        {
          name: t('بلوك ٦ — نموذج السباق', 'Block 6 — Race modelling'),
          goal: t('بدايات على المسدس، ٦٠-٨٠م من البلوك بزمن مستهدف، وسرعة قصوى بحجم أقل.', 'Starts on the gun, 60-80 m from blocks to target times, and lower-volume max velocity.'),
          components: ['reaction', 'acceleration', 'max_velocity', 'speed_endurance'],
          loads: [7, 8, 5], weekTypes: ['load', 'shock', 'deload'],
          pattern: ['s100_starts', 's100_power', 's100_tempo', 's100_maxv', 's100_tempo', 's100_race_model', '']
        }
      ]
    },
    {
      type: 'comp',
      goal: t('الحفاظ على السرعة والقدرة بحجم منخفض والتسابق كل أسبوع.', 'Maintain speed and power with low volume while racing weekly.'),
      components: ['max_velocity', 'acceleration', 'power', 'mental'],
      blocks: [
        {
          name: t('بلوك ٧ — منافسات', 'Block 7 — Competition'),
          goal: t('تمرينتين سرعة قصيرتين + قوة للحفاظ + سباق آخر الأسبوع.', 'Two short speed sessions + maintenance strength + a race at the weekend.'),
          components: ['max_velocity', 'acceleration', 'power'],
          loads: [6, 5], weekTypes: ['comp', 'comp'],
          pattern: ['s100_accel', 's100_maint', 's100_tempo', 's100_maxv', '', 's100_primer', 's100_race']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('تهدئة: خفض الحجم ٤٠-٥٠٪ مع الحفاظ على الشدة للوصول للقمة في البطولة الرئيسية.', 'Taper: cut volume 40-50% while keeping intensity to peak at the main championship.'),
      components: ['acceleration', 'max_velocity', 'recovery', 'mental'],
      blocks: [
        {
          name: t('بلوك ٨ — تهدئة وبطولة', 'Block 8 — Taper & championship'),
          goal: t('لمسات سرعة قليلة، جهاز عصبي فريش، وسباق تجريبي أخير ثم البطولة.', 'A few speed touches, fresh nervous system, a final tune-up race then the championship.'),
          components: ['acceleration', 'max_velocity', 'recovery', 'mental'],
          loads: [4, 3], weekTypes: ['taper', 'comp'],
          pattern: ['s100_starts', 's100_tempo', 's100_maint', '', 's100_primer', 's100_race', '']
        }
      ]
    }
  ],
  sessions: {
    s100_test: {
      title: t('اختبارات العداء (١٠٠م)', 'Sprinter testing (100m)'),
      goal: t('قياس التسارع والسرعة القصوى وتحمل السرعة والقدرة لتحديد الأحمال ومتابعة التطور.', 'Measure acceleration, max velocity, speed endurance and power to set loads and track progress.'),
      components: ['acceleration', 'max_velocity', 'speed_endurance', 'power'],
      rpe: 8, duration: 110,
      items: [
        ...sprintWU(true),
        { kind: 'run', libId: 'ad_30_m_sprint_test', name: t('٣٠م من البلوك (توقيت)', '30m from blocks (timed)'), sets: 1, reps: '2', distance: '30m', time: '3.85-3.95s', intensity: '100', basis: 'vmax', rest: '6min', restType: 'walk', purpose: t('قياس التسارع من البلوك', 'Measure block acceleration'), component: 'acceleration', note: t('توقيت إلكتروني من المسدس لو متاح؛ سجل أحسن محاولة', 'Electronic timing from the gun if available; record the best trial') },
        { kind: 'run', libId: 'ad_flying_sprint', name: t('٣٠م طاير (بعد ٣٠م اقتراب)', '30m fly (after 30m run-in)'), sets: 1, reps: '2', distance: '30m', time: '2.75-2.85s', intensity: '100', basis: 'vmax', rest: '8min', restType: 'walk', purpose: t('قياس السرعة القصوى', 'Measure max velocity'), component: 'max_velocity' },
        { kind: 'drill', libId: 'ad_standing_broad_jump_test', sets: 1, reps: '3', rest: '2min', purpose: t('قياس القدرة الأفقية', 'Measure horizontal power'), component: 'power', note: t('مرجع المتقدم: ٢.٩٠-٣.٢٠م', 'Advanced reference: 2.90-3.20 m') },
        { kind: 'run', name: t('١٥٠م اختبار زمن (بداية واقف)', '150m time trial (standing start)'), sets: 1, reps: '1', distance: '150m', time: '15.6-16.2s', intensity: '100', basis: 'best', rest: '15min', restType: 'passive', purpose: t('قياس تحمل السرعة والقدرة على الحفاظ عليها', 'Measure speed endurance and the ability to hold speed'), component: 'speed_endurance', note: t('آخر اختبار في اليوم؛ الأزمنة دي مرجع لتدريبات الـ١٢٠-١٥٠م', 'Last test of the day; this sets targets for the 120-150 m work') },
        ...sprintCD()
      ]
    },
    s100_hill: {
      title: t('تسارع بمقاومة: طلعة وسليد', 'Resisted acceleration: hills & sled'),
      goal: t('بناء قوة الدفع الأفقي وزاوية الجسم في التسارع بأمان في الإعداد العام.', 'Build horizontal push strength and acceleration body angle safely in general prep.'),
      components: ['acceleration', 'power', 'strength'],
      rpe: 7, duration: 85,
      items: [
        ...sprintWU(false),
        { kind: 'drill', libId: 'ad_wall_drive', sets: 3, reps: '5/leg', rest: '60s', purpose: t('ثبات زاوية الجسم وإيقاع رفع الركبة', 'Groove body angle and knee drive'), component: 'acceleration' },
        { kind: 'run', libId: 'ad_hill_sprint', sets: 2, reps: '4', distance: '30m', intensity: '9-10', basis: 'rpe', rest: '3min', restType: 'walk', setRest: '6min', purpose: t('قوة أفقية وتكنيك دفع كامل من الحوض', 'Horizontal force and full hip extension in the push'), component: 'acceleration', note: t('طلعة ٥-٨٪، نزول مشي', '5-8% hill, walk back down') },
        { kind: 'run', libId: 'ad_sled_resisted_sprint', sets: 1, reps: '4', distance: '20m', intensity: '90', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('زيادة القوة الأفقية في أول ١٠ خطوات', 'Increase horizontal force over the first 10 steps'), component: 'acceleration', note: t('حمل يسبب نقص سرعة ١٠٪ تقريبًا (١٠-١٥٪ من وزن الجسم)', 'Load causing about 10% velocity loss (10-15% BW)') },
        { kind: 'drill', libId: 'ad_medicine_ball_scoop_toss', sets: 3, reps: '4', rest: '90s', purpose: t('قدرة امتداد ثلاثي', 'Triple-extension power'), component: 'power', note: t('كرة ٤-٥ كجم لأقصى مسافة', '4-5 kg ball for max distance') },
        ...sprintCD()
      ]
    },
    s100_se_ext: {
      title: t('تحمل سرعة ممتد (تيمبو مكثف)', 'Extensive speed endurance (intensive tempo)'),
      goal: t('رفع قدرة الجسم على تكرار الجري السريع بشدة متوسطة عالية كقاعدة لتحمل السرعة الخاص بعدين.', 'Raise the capacity to repeat fast running at moderate-high intensity as a base for later specific speed endurance.'),
      components: ['speed_endurance', 'anaerobic', 'aerobic'],
      rpe: 7, duration: 80,
      items: [
        ...sprintWU(true),
        { kind: 'run', name: t('١٥٠م تكرارات', '150m repeats'), sets: 3, reps: '3', distance: '150m', time: '19.5-20.5s', intensity: '75-80', basis: 'best', rest: '2min', restType: 'walk', setRest: '8min', purpose: t('تحمل سرعة ممتد مع تكنيك مسترخي', 'Extensive speed endurance with relaxed mechanics'), component: 'speed_endurance', note: t('مشي ٥٠م بين التكرارات؛ لو الزمن زاد عن ٢١ث وقف المجموعة', 'Walk 50 m between reps; stop the set if times exceed 21 s') },
        { kind: 'strength', libId: 'ex_hanging_leg_raise', sets: 3, reps: '8', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '60s', purpose: t('قوة مثنيات الحوض والجذع لرفع الركبة', 'Hip-flexor and trunk strength for knee lift'), component: 'core' },
        ...sprintCD()
      ]
    },
    s100_accel: {
      title: t('تسارع من البلوك', 'Block acceleration'),
      goal: t('تحسين أول ٣٠-٥٠م: خروج قوي من البلوك، زاوية دفع منخفضة، وزيادة تدريجية لطول الخطوة.', 'Improve the first 30-50 m: powerful block clearance, low push angle and progressive stride length.'),
      components: ['acceleration', 'power', 'technique'],
      rpe: 8, duration: 95,
      items: [
        ...sprintWU(false),
        { kind: 'drill', libId: 'ad_wall_drive', sets: 2, reps: '5/leg', rest: '60s', purpose: t('تجهيز زاوية الجسم للخروج من البلوك', 'Prime body angle for block clearance'), component: 'acceleration' },
        { kind: 'run', libId: 'dr_sprint_accel', name: t('٣٠م من البلوك', '30m from blocks'), sets: 2, reps: '4', distance: '30m', time: '3.85-3.95s', intensity: '95-100', basis: 'vmax', rest: '3min', restType: 'walk', setRest: '6min', purpose: t('تسارع أقصى بجودة عالية', 'High-quality maximal acceleration'), component: 'acceleration' },
        { kind: 'run', libId: 'ad_sled_resisted_sprint', sets: 1, reps: '4', distance: '20m', intensity: '90', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('قوة أفقية في مرحلة الدفع', 'Horizontal force in the drive phase'), component: 'acceleration', note: t('نقص سرعة ~١٠٪', 'About 10% velocity loss') },
        { kind: 'run', name: t('٥٠م من البلوك', '50m from blocks'), sets: 1, reps: '3', distance: '50m', time: '5.70-5.85s', intensity: '97', basis: 'vmax', rest: '5min', restType: 'walk', purpose: t('ربط التسارع بالانتقال للجري العالي', 'Link acceleration to the transition into upright running'), component: 'acceleration' },
        { kind: 'drill', libId: 'ad_alternate_leg_bound', sets: 4, reps: '1', distance: '30m', rest: '3min', purpose: t('قدرة أفقية خاصة بالتسارع', 'Acceleration-specific horizontal power'), component: 'power' },
        ...sprintCD()
      ]
    },
    s100_maxv: {
      title: t('سرعة قصوى', 'Max velocity'),
      goal: t('رفع السرعة القصوى وتثبيت ميكانيكية الجري العالي (ارتكاز تحت الحوض ورجل أمامية نشطة).', 'Raise top speed and stabilise upright mechanics (foot strike under the hips, active front-side).'),
      components: ['max_velocity', 'coordination', 'technique'],
      rpe: 8, duration: 90,
      items: [
        ...sprintWU(true),
        { kind: 'run', libId: 'ad_wicket_run', sets: 1, reps: '5', distance: '40m', intensity: '90-95', basis: 'vmax', rest: '4min', restType: 'walk', purpose: t('ثبات طول ومعدل الخطوة على السرعة العالية', 'Stabilise stride length and frequency at high speed'), component: 'max_velocity', note: t('مسافة الويكتس ٢.٠٠-٢.٢٠م، ١٥م اقتراب', 'Wicket spacing 2.00-2.20 m, 15 m run-in') },
        { kind: 'run', libId: 'ad_flying_sprint', name: t('٣٠م طاير (بعد ٣٠م اقتراب)', '30m fly (after 30m run-in)'), sets: 2, reps: '3', distance: '30m', time: '2.80-2.90s', intensity: '98', basis: 'vmax', rest: '6min', restType: 'walk', setRest: '10min', purpose: t('تحفيز أقصى سرعة', 'Max velocity stimulus'), component: 'max_velocity' },
        { kind: 'run', name: t('إن-آند-آوت (٢٠ سريع / ٢٠ طفو / ٢٠ سريع)', 'In-and-outs (20 fast / 20 float / 20 fast)'), sets: 1, reps: '2', distance: '60m', intensity: '95', basis: 'vmax', rest: '6min', restType: 'walk', purpose: t('الاسترخاء على السرعة العالية والحفاظ عليها', 'Relaxation at top speed and the ability to hold it'), component: 'max_velocity' },
        ...sprintCD()
      ]
    },
    s100_se: {
      title: t('تحمل سرعة (٨٠-١٢٠م)', 'Speed endurance (80-120m)'),
      goal: t('الحفاظ على السرعة القصوى أطول مسافة ممكنة وتقليل الهبوط في آخر السباق.', 'Hold max velocity for longer and reduce deceleration at the end of the race.'),
      components: ['speed_endurance', 'max_velocity'],
      rpe: 9, duration: 90,
      items: [
        ...sprintWU(true),
        { kind: 'run', name: t('١٢٠م تكرارات (بداية وقوف)', '120m repeats (standing start)'), sets: 2, reps: '3', distance: '120m', time: '12.4-12.8s', intensity: '95', basis: 'best', rest: '5min', restType: 'walk', setRest: '12min', purpose: t('تحمل سرعة لاكتيكي قصير', 'Short lactic speed endurance'), component: 'speed_endurance', note: t('لو الزمن زاد عن ١٣.٠ث أنهِ المجموعة', 'End the set if a rep exceeds 13.0 s') },
        { kind: 'strength', libId: 'wg_pallof_press', sets: 3, reps: '10/side', intensity: '7', basis: 'rpe', tempo: '2-2-2-0', rest: '45s', purpose: t('ثبات الجذع ضد اللف', 'Anti-rotation trunk control'), component: 'core' },
        ...sprintCD()
      ]
    },
    s100_spe: {
      title: t('تحمل خاص (١٥٠م)', 'Special endurance (150m)'),
      goal: t('تحمل خاص للعداء: ١٥٠م بشدة ٩٥٪ براحة كاملة عشان الجودة تفضل عالية.', 'Sprint-specific special endurance: 150 m at 95% with full recovery to keep quality high.'),
      components: ['special_endurance', 'speed_endurance'],
      rpe: 9, duration: 95,
      items: [
        ...sprintWU(true),
        { kind: 'run', name: t('١٥٠م تحمل خاص', '150m special endurance'), sets: 2, reps: '2', distance: '150m', time: '15.8-16.2s', intensity: '95', basis: 'best', rest: '10min', restType: 'walk', setRest: '15min', purpose: t('الحفاظ على الميكانيكا تحت التعب اللاكتيكي', 'Maintain mechanics under lactic fatigue'), component: 'special_endurance', note: t('راحة كاملة؛ الهدف جودة مش تعب', 'Full recovery; the aim is quality, not fatigue') },
        { kind: 'strength', libId: 'ex_side_plank', sets: 2, reps: '30s/side', intensity: '7', basis: 'rpe', rest: '30s', purpose: t('ثبات الجذع الجانبي', 'Lateral trunk stiffness'), component: 'core' },
        ...sprintCD()
      ]
    },
    s100_starts: {
      title: t('بدايات ورد فعل', 'Starts & reaction'),
      goal: t('تحسين رد الفعل على المسدس، الخروج من البلوك، والوصول لسرعة عالية في أول ٦٠م.', 'Improve reaction to the gun, block clearance and reaching high speed within 60 m.'),
      components: ['reaction', 'acceleration', 'max_velocity'],
      rpe: 8, duration: 90,
      items: [
        ...sprintWU(true),
        { kind: 'run', libId: 'ad_reaction_start_sprint', name: t('بدايات من البلوك على المسدس (١٠م)', 'Block starts on the gun (10m)'), sets: 2, reps: '4', distance: '10m', intensity: '100', basis: 'vmax', rest: '2min', restType: 'walk', setRest: '5min', purpose: t('رد فعل سريع وخروج انفجاري', 'Fast reaction and explosive clearance'), component: 'reaction', note: t('غيّر زمن "استعد" بين ١.٥-٢.٥ث', 'Vary the "set" hold between 1.5-2.5 s') },
        { kind: 'run', libId: 'dr_sprint_accel', name: t('٣٠م من البلوك', '30m from blocks'), sets: 1, reps: '4', distance: '30m', time: '3.80-3.90s', intensity: '100', basis: 'vmax', rest: '4min', restType: 'walk', purpose: t('تسارع أقصى بتوقيت', 'Timed maximal acceleration'), component: 'acceleration' },
        { kind: 'run', name: t('٦٠م من البلوك', '60m from blocks'), sets: 1, reps: '2', distance: '60m', time: '6.65-6.80s', intensity: '98', basis: 'best', rest: '8min', restType: 'walk', purpose: t('ربط البداية بالسرعة القصوى', 'Connect the start to top speed'), component: 'max_velocity' },
        ...sprintCD()
      ]
    },
    s100_race_model: {
      title: t('نموذج السباق (٨٠-١٢٠م)', 'Race modelling (80-120m)'),
      goal: t('تنفيذ مراحل السباق كاملة بتوقيت: تسارع، سرعة قصوى، والحفاظ على السرعة.', 'Rehearse all race phases under timing: acceleration, max velocity and speed maintenance.'),
      components: ['speed_endurance', 'max_velocity', 'mental'],
      rpe: 9, duration: 90,
      items: [
        ...sprintWU(true),
        { kind: 'run', name: t('٨٠م من البلوك', '80m from blocks'), sets: 1, reps: '2', distance: '80m', time: '8.45-8.65s', intensity: '97', basis: 'best', rest: '10min', restType: 'walk', purpose: t('تنفيذ أول ٨٠م من السباق بتوقيت', 'Execute the first 80 m of the race under timing'), component: 'max_velocity' },
        { kind: 'run', name: t('١٢٠م من البلوك', '120m from blocks'), sets: 1, reps: '1', distance: '120m', time: '12.3-12.5s', intensity: '97', basis: 'best', rest: '15min', restType: 'passive', purpose: t('الحفاظ على السرعة لما بعد خط النهاية', 'Hold speed beyond the finish line'), component: 'speed_endurance' },
        ...sprintCD()
      ]
    },
    s100_gen_str: sprGenStr('adv'),
    s100_max_str: sprMaxStr('adv'),
    s100_power: sprPower('adv'),
    s100_maint: sprMaint(),
    s100_plyo_gen: sprPlyoGen(),
    s100_plyo: sprPlyo(),
    s100_tempo: sprTempo('adv'),
    s100_primer: sprPrimer('100'),
    s100_race: sprRace('100', '١٠٠')
  }
};

/* =============================================================================
 * ٢) ١٠٠/٢٠٠م — متوسط (١٦ أسبوع)
 * ============================================================================= */
const T_200_INT = {
  id: 'pt_sprint_200m_int',
  sport: 'sprint',
  level: 'intermediate',
  title: t('١٠٠/٢٠٠م عدو — متوسط (موسم ١٦ أسبوع)', '100/200m sprint — intermediate (16-week season)'),
  goal: t('تحسين التسارع والسرعة القصوى وجري المنحنى، وبناء تحمل سرعة يسمح بالحفاظ على السرعة في آخر ٥٠م من الـ٢٠٠م.', 'Improve acceleration, max velocity and bend running, and build speed endurance to hold speed over the last 50 m of the 200 m.'),
  components: ['acceleration', 'max_velocity', 'speed_endurance', 'special_endurance', 'technique'],
  sessionsPerWeek: 5,
  periods: [
    {
      type: 'gpp',
      goal: t('قاعدة عامة: قوة ٦٥-٧٥٪، تكنيك جري وتسارع، تيمبو هوائي، وتحمل سرعة ممتد.', 'General base: strength at 65-75%, running mechanics and acceleration, aerobic tempo and extensive speed endurance.'),
      components: ['strength', 'acceleration', 'aerobic', 'technique'],
      blocks: [
        {
          name: t('بلوك ١ — اختبارات ودخول', 'Block 1 — Testing & entry'),
          goal: t('قياس ٣٠م، ٣٠م طاير، وثب طويل من الثبات، و١٥٠م زمن.', 'Measure 30m, 30m fly, standing long jump and a 150m time trial.'),
          components: ['acceleration', 'max_velocity', 'speed_endurance', 'power'],
          loads: [4], weekTypes: ['test'],
          pattern: ['s2_test', '', 's2_gen_str', 's2_tempo', '', 's2_plyo_gen', '']
        },
        {
          name: t('بلوك ٢ — قاعدة عامة', 'Block 2 — General base'),
          goal: t('تسارع ٢×٤×٣٠م، قوة عامة، و٣×٣×١٥٠م على ٧٥٪ لبناء التحمل.', 'Acceleration 2x4x30m, general strength and 3x3x150m at 75% to build capacity.'),
          components: ['acceleration', 'strength', 'speed_endurance', 'aerobic'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['s2_accel', 's2_gen_str', 's2_tempo', '', 's2_ext', 's2_plyo_gen', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('قوة قصوى ٨٠-٨٥٪، سرعة قصوى، جري المنحنى، وتحمل خاص ٢٥٠م.', 'Max strength at 80-85%, max velocity, bend running and 250m special endurance.'),
      components: ['max_strength', 'max_velocity', 'technique', 'special_endurance'],
      blocks: [
        {
          name: t('بلوك ٣ — سرعة ومنحنى', 'Block 3 — Speed & bend'),
          goal: t('٦×٢٠م طاير، تسارع على المنحنى، و٢×٢٥٠م + ١٥٠م تحمل خاص.', '6x20m fly, bend acceleration, and 2x250m + 150m special endurance.'),
          components: ['max_velocity', 'technique', 'special_endurance', 'max_strength'],
          loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['s2_maxv', 's2_max_str', 's2_tempo', '', 's2_curve', 's2_spe', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('إعادة الاختبار، تحويل القوة لقدرة، تحمل سرعة ١٥٠م على ٩٥٪، ومسابقة تجريبية.', 'Retest, power conversion, 150m speed endurance at 95% and a control race.'),
      components: ['power', 'speed_endurance', 'acceleration', 'mental'],
      blocks: [
        {
          name: t('بلوك ٤ — أسبوع اختبارات', 'Block 4 — Testing week'),
          goal: t('إعادة اختبارات البداية للمقارنة وتحديد أهداف الموسم.', 'Repeat baseline tests to compare and set season targets.'),
          components: ['acceleration', 'max_velocity', 'speed_endurance'],
          loads: [4], weekTypes: ['test'],
          pattern: ['s2_test', '', 's2_max_str', 's2_tempo', '', 's2_curve', '']
        },
        {
          name: t('بلوك ٥ — قدرة ومسابقة تجريبية', 'Block 5 — Power & control race'),
          goal: t('كونتراست، ٣×١٥٠م على ٩٥٪، وسباق تجريبي ١٠٠م أو ٢٠٠م آخر الأسبوع.', 'Contrast work, 3x150m at 95%, and a 100m or 200m control race at the weekend.'),
          components: ['power', 'speed_endurance', 'acceleration', 'mental'],
          loads: [7, 6], weekTypes: ['load', 'comp'],
          pattern: ['s2_accel', 's2_power', 's2_tempo', '', 's2_se', '', 's2_race']
        }
      ]
    },
    {
      type: 'comp',
      goal: t('الحفاظ على السرعة والقدرة بحجم قليل والتسابق أسبوعيًا.', 'Maintain speed and power with low volume while racing weekly.'),
      components: ['max_velocity', 'speed_endurance', 'mental'],
      blocks: [
        {
          name: t('بلوك ٦ — منافسات', 'Block 6 — Competition'),
          goal: t('منحنى وسرعة، قوة للحفاظ، تنشيط قبل السباق، وسباق كل أسبوع.', 'Bend and speed work, maintenance strength, a primer and a race every week.'),
          components: ['max_velocity', 'technique', 'mental'],
          loads: [6, 5, 6], weekTypes: ['comp', 'comp', 'comp'],
          pattern: ['s2_curve', 's2_maint', 's2_tempo', '', 's2_primer', 's2_race', '']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('تهدئة قبل البطولة: حجم أقل ٤٠-٥٠٪ مع الحفاظ على الشدة.', 'Pre-championship taper: 40-50% less volume while keeping intensity.'),
      components: ['max_velocity', 'recovery', 'mental'],
      blocks: [
        {
          name: t('بلوك ٧ — أسبوع البطولة', 'Block 7 — Championship week'),
          goal: t('لمسات تسارع وسرعة قليلة، وجهاز عصبي فريش يوم البطولة.', 'A few acceleration and speed touches, fresh nervous system on championship day.'),
          components: ['acceleration', 'max_velocity', 'recovery', 'mental'],
          loads: [3], weekTypes: ['taper'],
          pattern: ['s2_accel', '', 's2_tempo', 's2_maxv', '', 's2_primer', 's2_race']
        }
      ]
    }
  ],
  sessions: {
    s2_test: {
      title: t('اختبارات العداء (١٠٠/٢٠٠م)', 'Sprinter testing (100/200m)'),
      goal: t('قياس التسارع والسرعة القصوى وتحمل السرعة لتحديد الأحمال.', 'Measure acceleration, max velocity and speed endurance to set loads.'),
      components: ['acceleration', 'max_velocity', 'speed_endurance', 'power'],
      rpe: 8, duration: 100,
      items: [
        ...sprintWU(true),
        { kind: 'run', libId: 'ad_30_m_sprint_test', sets: 1, reps: '2', distance: '30m', time: '4.05-4.20s', intensity: '100', basis: 'vmax', rest: '6min', restType: 'walk', purpose: t('قياس التسارع (بلوك أو ٣ نقط)', 'Measure acceleration (blocks or 3-point)'), component: 'acceleration' },
        { kind: 'run', libId: 'ad_flying_sprint', name: t('٣٠م طاير (بعد ٢٥م اقتراب)', '30m fly (after 25m run-in)'), sets: 1, reps: '2', distance: '30m', time: '3.00-3.15s', intensity: '100', basis: 'vmax', rest: '7min', restType: 'walk', purpose: t('قياس السرعة القصوى', 'Measure max velocity'), component: 'max_velocity' },
        { kind: 'drill', libId: 'ad_standing_broad_jump_test', sets: 1, reps: '3', rest: '2min', purpose: t('قياس القدرة الأفقية', 'Measure horizontal power'), component: 'power' },
        { kind: 'run', name: t('١٥٠م اختبار زمن', '150m time trial'), sets: 1, reps: '1', distance: '150m', time: '16.8-17.6s', intensity: '100', basis: 'best', rest: '15min', restType: 'passive', purpose: t('قياس تحمل السرعة', 'Measure speed endurance'), component: 'speed_endurance', note: t('مرجع لأزمنة تدريبات الـ١٥٠-٢٥٠م', 'Reference for 150-250 m training times') },
        ...sprintCD()
      ]
    },
    s2_accel: {
      title: t('تسارع وتكنيك جري', 'Acceleration & running mechanics'),
      goal: t('تحسين أول ٣٠م: زاوية دفع، خطوات تزيد تدريجيًا، ودراعات قوية.', 'Improve the first 30 m: push angle, progressive steps and strong arm action.'),
      components: ['acceleration', 'technique', 'power'],
      rpe: 7, duration: 85,
      items: [
        ...sprintWU(false),
        { kind: 'drill', libId: 'ad_wall_drive', sets: 3, reps: '5/leg', rest: '60s', purpose: t('زاوية الجسم وإيقاع الركبة في التسارع', 'Body angle and knee rhythm in acceleration'), component: 'technique' },
        { kind: 'run', libId: 'ad_falling_start', sets: 1, reps: '4', distance: '15m', intensity: '95', basis: 'vmax', rest: '2min', restType: 'walk', purpose: t('إحساس الميل للأمام وأول خطوتين', 'Feel the forward lean and first two steps'), component: 'acceleration' },
        { kind: 'run', libId: 'dr_sprint_accel', name: t('٣٠م من البلوك أو ٣ نقط', '30m from blocks or 3-point'), sets: 2, reps: '4', distance: '30m', time: '4.10-4.25s', intensity: '95', basis: 'vmax', rest: '3min', restType: 'walk', setRest: '6min', purpose: t('تسارع حر بجودة عالية', 'High-quality free acceleration'), component: 'acceleration' },
        { kind: 'drill', libId: 'ad_medicine_ball_scoop_toss', sets: 3, reps: '4', rest: '90s', purpose: t('قدرة امتداد ثلاثي', 'Triple-extension power'), component: 'power', note: t('كرة ٣-٤ كجم', '3-4 kg ball') },
        ...sprintCD()
      ]
    },
    s2_ext: {
      title: t('تحمل سرعة ممتد (١٥٠م)', 'Extensive speed endurance (150m)'),
      goal: t('بناء القدرة على تكرار الجري السريع كقاعدة للـ٢٠٠م.', 'Build the capacity to repeat fast running as a base for the 200 m.'),
      components: ['speed_endurance', 'aerobic', 'anaerobic'],
      rpe: 7, duration: 75,
      items: [
        ...sprintWU(true),
        { kind: 'run', name: t('١٥٠م تكرارات', '150m repeats'), sets: 3, reps: '3', distance: '150m', time: '22-23s', intensity: '75', basis: 'best', rest: '2min', restType: 'walk', setRest: '8min', purpose: t('تحمل سرعة ممتد بتكنيك مسترخي', 'Extensive speed endurance with relaxed mechanics'), component: 'speed_endurance', note: t('أسبوع ١ من البلوك: ٢ مجموعات، بعدين ٣', 'First week of the block: 2 sets, then 3') },
        { kind: 'strength', libId: 'ex_dead_bug', sets: 3, reps: '10/side', intensity: '7', basis: 'rpe', tempo: '2-1-2-0', rest: '45s', purpose: t('ثبات الجذع', 'Trunk control'), component: 'core' },
        ...sprintCD()
      ]
    },
    s2_maxv: {
      title: t('سرعة قصوى', 'Max velocity'),
      goal: t('رفع السرعة القصوى وتثبيت ميكانيكية الجري العالي.', 'Raise top speed and stabilise upright mechanics.'),
      components: ['max_velocity', 'coordination', 'technique'],
      rpe: 8, duration: 85,
      items: [
        ...sprintWU(true),
        { kind: 'run', libId: 'ad_wicket_run', sets: 1, reps: '4', distance: '40m', intensity: '90', basis: 'vmax', rest: '4min', restType: 'walk', purpose: t('إيقاع وطول خطوة ثابت', 'Consistent rhythm and stride length'), component: 'max_velocity', note: t('مسافة الويكتس ١.٨٠-٢.٠٠م', 'Wicket spacing 1.80-2.00 m') },
        { kind: 'run', libId: 'ad_flying_sprint', name: t('٢٠م طاير (بعد ٢٥م اقتراب)', '20m fly (after 25m run-in)'), sets: 2, reps: '3', distance: '20m', time: '2.05-2.15s', intensity: '97', basis: 'vmax', rest: '5min', restType: 'walk', setRest: '8min', purpose: t('تحفيز السرعة القصوى', 'Max velocity stimulus'), component: 'max_velocity' },
        { kind: 'run', name: t('إن-آند-آوت (٢٠/٢٠/٢٠)', 'In-and-outs (20/20/20)'), sets: 1, reps: '2', distance: '60m', intensity: '95', basis: 'vmax', rest: '5min', restType: 'walk', purpose: t('الاسترخاء على السرعة العالية', 'Relax at high speed'), component: 'max_velocity' },
        ...sprintCD()
      ]
    },
    s2_curve: {
      title: t('جري المنحنى', 'Bend running'),
      goal: t('تكنيك المنحنى: ميل الجسم للداخل، دراع شمال أقصر، ارتكاز على الحافة الخارجية للقدم الشمال، والخروج للمستقيم بدون فقد سرعة.', 'Bend technique: inward lean, shorter left arm swing, left-foot outside-edge contact, and exiting onto the straight without losing speed.'),
      components: ['technique', 'acceleration', 'max_velocity'],
      rpe: 8, duration: 90,
      items: [
        ...sprintWU(true),
        { kind: 'drill', name: t('جري دواير (نصف قطر ١٥-٢٠م)', 'Circle runs (15-20 m radius)'), sets: 2, reps: '3', distance: '40m', rest: '90s', purpose: t('إحساس الميل للداخل والقوى الجانبية', 'Feel the inward lean and lateral forces'), component: 'technique' },
        { kind: 'run', name: t('٤٠م من البلوك على المنحنى', '40m from blocks on the bend'), sets: 2, reps: '3', distance: '40m', time: '5.10-5.30s', intensity: '95', basis: 'vmax', rest: '4min', restType: 'walk', setRest: '6min', purpose: t('تسارع على المنحنى من بلوك الـ٢٠٠م', 'Acceleration on the bend from the 200 m blocks'), component: 'acceleration', note: t('البلوك على الحافة الخارجية للحارة عشان أول خطوات تكون مستقيمة', 'Set blocks at the outside of the lane so the first steps run straight') },
        { kind: 'run', name: t('منحنى إلى مستقيم ٨٠م (من ٦٠م قبل المستقيم)', 'Bend-to-straight 80m (starting 60 m before the straight)'), sets: 1, reps: '3', distance: '80m', intensity: '95', basis: 'vmax', rest: '6min', restType: 'walk', purpose: t('الخروج من المنحنى بأقصى سرعة واسترخاء', 'Exit the bend at top speed and relaxed'), component: 'max_velocity' },
        ...sprintCD()
      ]
    },
    s2_se: {
      title: t('تحمل سرعة (١٥٠م)', 'Speed endurance (150m)'),
      goal: t('الحفاظ على السرعة لمسافة أطول بشدة ٩٣-٩٥٪ وراحة كاملة.', 'Hold speed for longer at 93-95% with full recovery.'),
      components: ['speed_endurance', 'max_velocity'],
      rpe: 9, duration: 85,
      items: [
        ...sprintWU(true),
        { kind: 'run', name: t('١٥٠م تحمل سرعة', '150m speed endurance'), sets: 1, reps: '3', distance: '150m', time: '17.6-18.2s', intensity: '93-95', basis: 'best', rest: '10min', restType: 'walk', purpose: t('تحمل سرعة لاكتيكي بجودة عالية', 'High-quality lactic speed endurance'), component: 'speed_endurance', note: t('أول ٥٠م على المنحنى لو متاح', 'First 50 m on the bend where possible') },
        { kind: 'strength', libId: 'ex_side_plank', sets: 2, reps: '30s/side', intensity: '7', basis: 'rpe', rest: '30s', purpose: t('ثبات الجذع الجانبي للمنحنى', 'Lateral trunk stiffness for the bend'), component: 'core' },
        ...sprintCD()
      ]
    },
    s2_spe: {
      title: t('تحمل خاص (٢٥٠م + ١٥٠م)', 'Special endurance (250m + 150m)'),
      goal: t('تحمل خاص بالـ٢٠٠م: الحفاظ على الميكانيكا تحت تعب لاكتيكي عالي.', '200 m special endurance: maintain mechanics under high lactic fatigue.'),
      components: ['special_endurance', 'speed_endurance'],
      rpe: 9, duration: 90,
      items: [
        ...sprintWU(true),
        { kind: 'run', name: t('٢٥٠م تحمل خاص', '250m special endurance'), sets: 1, reps: '2', distance: '250m', time: '31.5-32.5s', intensity: '90', basis: 'best', rest: '15min', restType: 'walk', purpose: t('تحمل لاكتيكي أطول من مسافة السباق', 'Lactic endurance over longer than race distance'), component: 'special_endurance', note: t('بداية على المنحنى، توزيع متساوي', 'Start on the bend, even distribution') },
        { kind: 'run', name: t('١٥٠م سريع', '150m fast'), sets: 1, reps: '1', distance: '150m', time: '17.8-18.3s', intensity: '93', basis: 'best', rest: '10min', restType: 'walk', purpose: t('الجري السريع تحت التعب المتراكم', 'Fast running under accumulated fatigue'), component: 'speed_endurance' },
        ...sprintCD()
      ]
    },
    s2_gen_str: sprGenStr('int'),
    s2_max_str: sprMaxStr('int'),
    s2_power: sprPower('int'),
    s2_maint: sprMaint(),
    s2_plyo_gen: sprPlyoGen(),
    s2_tempo: sprTempo('int'),
    s2_primer: sprPrimer('200'),
    s2_race: sprRace('200', '٢٠٠')
  }
};

/* =============================================================================
 * ٣) ٤٠٠م — متقدم (٢٠ أسبوع)
 * ============================================================================= */
const T_400_ADV = {
  id: 'pt_sprint_400m_adv',
  sport: 'sprint',
  level: 'advanced',
  title: t('٤٠٠م عدو — متقدم (موسم ٢٠ أسبوع)', '400m sprint — advanced (20-week season)'),
  goal: t('رفع احتياطي السرعة (٢٠٠م) وتحمل السرعة الخاص وتحمل اللاكتيك، مع توزيع جهد صحيح في السباق، للوصول لأحسن رقم في البطولة.', 'Raise speed reserve (200 m), special endurance and lactate tolerance, with sound race distribution, to peak at the championship.'),
  components: ['special_endurance', 'speed_endurance', 'max_velocity', 'anaerobic', 'aerobic'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: t('قاعدة هوائية ولاهوائية: تيمبو ٢٠٠م، طلعات طويلة، تيمبو مكثف ٣٠٠م، وقوة عامة وتحمل قوة.', 'Aerobic and anaerobic base: 200 m tempo, long hills, 300 m intensive tempo, general strength and strength endurance.'),
      components: ['aerobic', 'strength', 'muscular_endurance', 'speed_endurance'],
      blocks: [
        {
          name: t('بلوك ١ — اختبارات ودخول', 'Block 1 — Testing & entry'),
          goal: t('قياس ٣٠م طاير، ١٥٠م، و٣٠٠م زمن لتحديد أزمنة التدريب.', 'Measure 30m fly, 150m and 300m time trials to set training times.'),
          components: ['max_velocity', 'speed_endurance', 'special_endurance'],
          loads: [4], weekTypes: ['test'],
          pattern: ['s4_test', 's4_tempo', 's4_gen_str', '', 's4_plyo_gen', 's4_tempo', '']
        },
        {
          name: t('بلوك ٢ — قاعدة عامة', 'Block 2 — General base'),
          goal: t('طلعات ١٥٠م، ٢×٣×٣٠٠م على ٧٥٪، تيمبو ٢٠٠م، ودايرة تحمل قوة.', 'Hill 150s, 2x3x300m at 75%, 200 m tempo and a strength-endurance circuit.'),
          components: ['aerobic', 'speed_endurance', 'strength', 'muscular_endurance'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['s4_hills', 's4_gen_str', 's4_tempo', 's4_se_ext', 's4_gen_str', 's4_circuit', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('تحمل خاص (٣٠٠-٣٥٠م على ٩٠٪)، تحمل لاكتيك (٢×٢×٢٠٠م براحة قصيرة)، تحمل سرعة ١٥٠م، وقوة قصوى ثم قدرة.', 'Special endurance (300-350 m at 90%), lactate tolerance (2x2x200m short rest), 150 m speed endurance, and max strength then power.'),
      components: ['special_endurance', 'anaerobic', 'speed_endurance', 'max_strength', 'max_velocity'],
      blocks: [
        {
          name: t('بلوك ٣ — تحمل خاص وقوة قصوى', 'Block 3 — Special endurance & max strength'),
          goal: t('٣×٣٠٠م على ٩٠-٩٢٪ براحة ١٢-١٥ دقيقة، ٢×٣×١٥٠م، تسارع، وسكوات ٨٥٪.', '3x300m at 90-92% with 12-15 min rest, 2x3x150m, acceleration and squat at 85%.'),
          components: ['special_endurance', 'speed_endurance', 'acceleration', 'max_strength'],
          loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['s4_accel', 's4_max_str', 's4_tempo', 's4_speedend', 's4_max_str', 's4_spe', '']
        },
        {
          name: t('بلوك ٤ — تحمل لاكتيك وسرعة قصوى', 'Block 4 — Lactate tolerance & max velocity'),
          goal: t('٢×٢×٢٠٠م براحة دقيقتين، ٣٥٠م، سرعة قصوى، وكونتراست.', '2x2x200m with 2-min rest, 350m, max velocity and contrast work.'),
          components: ['anaerobic', 'special_endurance', 'max_velocity', 'power'],
          loads: [7, 8, 8, 5], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['s4_maxv', 's4_power', 's4_tempo', 's4_lactate', 's4_plyo', 's4_spe', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('إعادة الاختبار وتدريب توزيع الجهد في السباق (٣٠٠+١٠٠م ومسافات مقسمة) على سرعة السباق المستهدفة.', 'Retest and rehearse race distribution (300+100 m and broken runs) at goal race pace.'),
      components: ['special_endurance', 'max_velocity', 'tactics', 'mental'],
      blocks: [
        {
          name: t('بلوك ٥ — أسبوع اختبارات', 'Block 5 — Testing week'),
          goal: t('إعادة ١٥٠م و٣٠٠م ومقارنة الأزمنة لتحديد خطة السباق.', 'Repeat 150m and 300m to compare and set the race plan.'),
          components: ['speed_endurance', 'special_endurance', 'max_velocity'],
          loads: [4], weekTypes: ['test'],
          pattern: ['s4_test', 's4_tempo', 's4_power', '', 's4_accel', 's4_tempo', '']
        },
        {
          name: t('بلوك ٦ — نموذج السباق', 'Block 6 — Race modelling'),
          goal: t('٣٠٠+١٠٠م على سرعة السباق، تحمل سرعة ١٥٠م، وسرعة قصوى بحجم قليل.', '300+100 m at race pace, 150 m speed endurance and low-volume max velocity.'),
          components: ['special_endurance', 'tactics', 'speed_endurance', 'max_velocity'],
          loads: [7, 8, 5], weekTypes: ['load', 'shock', 'deload'],
          pattern: ['s4_maxv', 's4_power', 's4_tempo', 's4_split', 's4_tempo', 's4_speedend', '']
        }
      ]
    },
    {
      type: 'comp',
      goal: t('التسابق كل أسبوع مع جلسة واحدة خاصة بالسباق وحفاظ على السرعة والقوة.', 'Race weekly with one race-specific session while maintaining speed and strength.'),
      components: ['special_endurance', 'max_velocity', 'mental'],
      blocks: [
        {
          name: t('بلوك ٧ — منافسات', 'Block 7 — Competition'),
          goal: t('تسارع، ٣٠٠+١٠٠م مخفّض، قوة للحفاظ، وسباق آخر الأسبوع.', 'Acceleration, reduced 300+100 m, maintenance strength and a weekend race.'),
          components: ['special_endurance', 'acceleration', 'mental'],
          loads: [6, 5], weekTypes: ['comp', 'comp'],
          pattern: ['s4_accel', 's4_maint', 's4_tempo', 's4_split', '', 's4_primer', 's4_race']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('تهدئة: خفض الحجم ٤٠-٥٠٪ مع لمسات سرعة وسرعة سباق قليلة.', 'Taper: 40-50% less volume with a few speed and race-pace touches.'),
      components: ['max_velocity', 'recovery', 'mental'],
      blocks: [
        {
          name: t('بلوك ٨ — أسبوع البطولة', 'Block 8 — Championship week'),
          goal: t('جهاز عصبي فريش ومخزون طاقة كامل يوم البطولة.', 'Fresh nervous system and full energy stores on championship day.'),
          components: ['max_velocity', 'recovery', 'mental'],
          loads: [3], weekTypes: ['taper'],
          pattern: ['s4_maxv', 's4_tempo', 's4_maint', '', 's4_primer', 's4_race', '']
        }
      ]
    }
  ],
  sessions: {
    s4_test: {
      title: t('اختبارات عداء الـ٤٠٠م', '400m sprinter testing'),
      goal: t('قياس احتياطي السرعة وتحمل السرعة والتحمل الخاص لحساب أزمنة التدريب.', 'Measure speed reserve, speed endurance and special endurance to set training times.'),
      components: ['max_velocity', 'speed_endurance', 'special_endurance'],
      rpe: 9, duration: 110,
      items: [
        ...sprintWU(true),
        { kind: 'run', libId: 'ad_flying_sprint', name: t('٣٠م طاير (بعد ٣٠م اقتراب)', '30m fly (after 30m run-in)'), sets: 1, reps: '2', distance: '30m', time: '2.85-2.95s', intensity: '100', basis: 'vmax', rest: '6min', restType: 'walk', purpose: t('قياس السرعة القصوى (احتياطي السرعة)', 'Measure max velocity (speed reserve)'), component: 'max_velocity' },
        { kind: 'run', name: t('١٥٠م اختبار زمن', '150m time trial'), sets: 1, reps: '1', distance: '150m', time: '15.8-16.3s', intensity: '100', basis: 'best', rest: '25min', restType: 'passive', purpose: t('قياس تحمل السرعة', 'Measure speed endurance'), component: 'speed_endurance' },
        { kind: 'run', name: t('٣٠٠م اختبار زمن', '300m time trial'), sets: 1, reps: '1', distance: '300m', time: '33.5-34.5s', intensity: '100', basis: 'best', rest: '20min', restType: 'walk', purpose: t('قياس التحمل الخاص (أهم مؤشر للـ٤٠٠م)', 'Measure special endurance, the key 400 m predictor'), component: 'special_endurance', note: t('زمن الـ٤٠٠ المتوقع تقريبًا = زمن ٣٠٠م + ١٣-١٣.٥ث', 'Predicted 400 m is roughly 300 m time + 13-13.5 s') },
        ...sprintCD()
      ]
    },
    s4_tempo: {
      title: t('تيمبو ممتد ٢٠٠م + جذع', 'Extensive 200m tempo + core'),
      goal: t('قاعدة هوائية واستشفاء نشط بين أيام اللاكتيك.', 'Aerobic base and active recovery between lactic days.'),
      components: ['aerobic', 'recovery', 'core'],
      rpe: 5, duration: 65,
      items: [
        W('جري خفيف + حركات مرونة', 'Easy jog + mobility drills', { duration: '10min' }),
        { kind: 'run', name: t('٢٠٠م تيمبو على النجيل', '200m tempo on grass'), sets: 2, reps: '5', distance: '200m', time: '30-32s', intensity: '65-70', basis: 'best', rest: '90s', restType: 'walk', setRest: '5min', purpose: t('رفع القاعدة الهوائية وسرعة الاستشفاء', 'Raise the aerobic base and recovery rate'), component: 'aerobic', note: t('النبض يرجع تحت ١٢٠ قبل التكرار التالي', 'Heart rate back below 120 before the next rep') },
        { kind: 'strength', libId: 'ex_dead_bug', sets: 3, reps: '10/side', intensity: '7', basis: 'rpe', tempo: '2-1-2-0', rest: '45s', purpose: t('ثبات الجذع', 'Trunk control'), component: 'core' },
        { kind: 'strength', libId: 'ex_copenhagen_plank', sets: 3, reps: '20s/side', intensity: '7', basis: 'rpe', rest: '45s', purpose: t('قوة المقربات ووقاية الحوض', 'Adductor strength and groin protection'), component: 'prevention' },
        ml('wg_worlds_greatest_stretch', { sets: 2, reps: '5/side' })
      ]
    },
    s4_hills: {
      title: t('طلعات طويلة وقصيرة', 'Long & short hills'),
      goal: t('قوة خاصة بالجري وتحمل لاهوائي مع حمل أقل على الأوتار من المضمار.', 'Running-specific strength and anaerobic capacity with less tendon stress than the track.'),
      components: ['muscular_endurance', 'anaerobic', 'acceleration'],
      rpe: 8, duration: 85,
      items: [
        ...sprintWU(false),
        { kind: 'run', libId: 'ad_hill_repeats', name: t('طلعات ١٥٠م', '150m hill repeats'), sets: 1, reps: '6', distance: '150m', intensity: '85-90', basis: 'rpe', rest: '4min', restType: 'walk', purpose: t('تحمل قوة وتحمل لاهوائي بتكنيك دفع كامل', 'Strength endurance and anaerobic capacity with full drive mechanics'), component: 'muscular_endurance', note: t('طلعة ٤-٦٪، النزول مشي؛ الشدة ٨-٩ من ١٠', '4-6% hill, walk down; effort 8-9 out of 10') },
        { kind: 'run', libId: 'ad_hill_sprint', sets: 1, reps: '5', distance: '40m', intensity: '10', basis: 'rpe', rest: '3min', restType: 'walk', purpose: t('قوة تسارع قصوى', 'Maximal acceleration strength'), component: 'acceleration' },
        ...sprintCD()
      ]
    },
    s4_se_ext: {
      title: t('تيمبو مكثف ٣٠٠م', 'Intensive tempo 300m'),
      goal: t('بناء القدرة على تحمل اللاكتيك بشدة متوسطة عالية كقاعدة للتحمل الخاص.', 'Build lactic capacity at moderate-high intensity as a base for special endurance.'),
      components: ['speed_endurance', 'anaerobic', 'aerobic'],
      rpe: 8, duration: 85,
      items: [
        ...sprintWU(true),
        { kind: 'run', name: t('٣٠٠م تكرارات', '300m repeats'), sets: 2, reps: '3', distance: '300m', time: '43-45s', intensity: '75-78', basis: 'best', rest: '3min', restType: 'walk', setRest: '8min', purpose: t('تحمل سرعة ممتد وسعة لاكتيكية', 'Extensive speed endurance and lactic capacity'), component: 'speed_endurance', note: t('توزيع متساوي، التكنيك أهم من الزمن', 'Even pacing, mechanics before time') },
        { kind: 'strength', libId: 'ex_hanging_leg_raise', sets: 3, reps: '8', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '60s', purpose: t('قوة مثنيات الحوض (رفع الركبة في آخر السباق)', 'Hip-flexor strength for knee lift late in the race'), component: 'core' },
        ...sprintCD()
      ]
    },
    s4_circuit: {
      title: t('دايرة تحمل قوة', 'Strength-endurance circuit'),
      goal: t('رفع تحمل العضلات للعمل تحت تراكم اللاكتيك بطريقة عامة.', 'Raise general muscular tolerance to work under lactate accumulation.'),
      components: ['muscular_endurance', 'anaerobic', 'core'],
      rpe: 7, duration: 55,
      items: [
        ...gymWU(),
        { kind: 'timed', libId: 'wg_jump_squat', sets: 3, duration: '30s', intensity: '8', basis: 'rpe', rest: '30s', purpose: t('تحمل قدرة الرجلين', 'Leg power endurance'), component: 'muscular_endurance', note: t('٣ جولات، راحة ٣ دقايق بين الجولات', '3 rounds, 3 min between rounds') },
        { kind: 'timed', libId: 'ex_walking_lunge', sets: 3, duration: '30s', intensity: '8', basis: 'rpe', rest: '30s', purpose: t('تحمل قوة الرجل الواحدة', 'Single-leg strength endurance'), component: 'muscular_endurance' },
        { kind: 'timed', libId: 'ex_pushup', sets: 3, duration: '30s', intensity: '7', basis: 'rpe', rest: '30s', purpose: t('تحمل الجزء العلوي لمرجحة الذراعين', 'Upper-body endurance for arm drive'), component: 'muscular_endurance' },
        { kind: 'timed', libId: 'wg_high_knees', sets: 3, duration: '30s', intensity: '8', basis: 'rpe', rest: '30s', purpose: t('تحمل مثنيات الحوض بسرعة', 'Fast hip-flexor endurance'), component: 'muscular_endurance' },
        { kind: 'timed', libId: 'ex_plank', sets: 3, duration: '40s', intensity: '7', basis: 'rpe', rest: '3min', purpose: t('ثبات الجذع تحت التعب', 'Trunk stiffness under fatigue'), component: 'core' },
        ...gymCD()
      ]
    },
    s4_accel: {
      title: t('تسارع من البلوك', 'Block acceleration'),
      goal: t('خروج قوي من البلوك على المنحنى وأول ٦٠م بأقل مجهود.', 'Powerful clearance from bend blocks and an efficient first 60 m.'),
      components: ['acceleration', 'power'],
      rpe: 7, duration: 80,
      items: [
        ...sprintWU(false),
        { kind: 'run', libId: 'dr_sprint_accel', name: t('٣٠م من البلوك على المنحنى', '30m from blocks on the bend'), sets: 2, reps: '3', distance: '30m', time: '3.95-4.10s', intensity: '95', basis: 'vmax', rest: '3min', restType: 'walk', setRest: '6min', purpose: t('تسارع قوي من بلوك الـ٤٠٠م', 'Strong acceleration from 400 m blocks'), component: 'acceleration' },
        { kind: 'run', name: t('٦٠م من البلوك', '60m from blocks'), sets: 1, reps: '3', distance: '60m', time: '6.9-7.1s', intensity: '95', basis: 'best', rest: '6min', restType: 'walk', purpose: t('الوصول للسرعة العالية بسلاسة (مش أقصى)', 'Reach high speed smoothly, not all-out'), component: 'acceleration' },
        { kind: 'drill', libId: 'ad_medicine_ball_scoop_toss', sets: 3, reps: '4', rest: '90s', purpose: t('قدرة امتداد ثلاثي', 'Triple-extension power'), component: 'power' },
        ...sprintCD()
      ]
    },
    s4_maxv: {
      title: t('سرعة قصوى (احتياطي السرعة)', 'Max velocity (speed reserve)'),
      goal: t('رفع السرعة القصوى عشان سرعة السباق تبقى أسهل نسبيًا.', 'Raise top speed so race pace becomes relatively easier.'),
      components: ['max_velocity', 'coordination'],
      rpe: 8, duration: 80,
      items: [
        ...sprintWU(true),
        { kind: 'run', libId: 'ad_wicket_run', sets: 1, reps: '4', distance: '40m', intensity: '90', basis: 'vmax', rest: '4min', restType: 'walk', purpose: t('ثبات الإيقاع وطول الخطوة', 'Stable rhythm and stride length'), component: 'max_velocity', note: t('مسافة الويكتس ٢.٠٠-٢.١٥م', 'Wicket spacing 2.00-2.15 m') },
        { kind: 'run', libId: 'ad_flying_sprint', name: t('٣٠م طاير', '30m fly'), sets: 2, reps: '2', distance: '30m', time: '2.85-2.95s', intensity: '97', basis: 'vmax', rest: '5min', restType: 'walk', setRest: '8min', purpose: t('تحفيز السرعة القصوى', 'Max velocity stimulus'), component: 'max_velocity' },
        { kind: 'run', name: t('١٢٠م بسرعة مسترخية (فلوت)', '120m relaxed-fast (float)'), sets: 1, reps: '2', distance: '120m', time: '12.8-13.2s', intensity: '90', basis: 'best', rest: '6min', restType: 'walk', purpose: t('سرعة عالية باسترخاء زي أول ٢٠٠م في السباق', 'High speed with relaxation, as in the first 200 m of the race'), component: 'speed_endurance' },
        ...sprintCD()
      ]
    },
    s4_speedend: {
      title: t('تحمل سرعة (١٥٠م)', 'Speed endurance (150m)'),
      goal: t('الحفاظ على سرعة عالية لـ١٥٠م مع تراكم اللاكتيك بين التكرارات.', 'Hold high speed over 150 m with lactate accumulating across reps.'),
      components: ['speed_endurance', 'anaerobic'],
      rpe: 9, duration: 90,
      items: [
        ...sprintWU(true),
        { kind: 'run', name: t('١٥٠م تحمل سرعة', '150m speed endurance'), sets: 2, reps: '3', distance: '150m', time: '16.4-16.8s', intensity: '92-95', basis: 'best', rest: '5min', restType: 'walk', setRest: '12min', purpose: t('تحمل سرعة مع جودة ميكانيكا', 'Speed endurance with quality mechanics'), component: 'speed_endurance' },
        { kind: 'strength', libId: 'wg_pallof_press', sets: 3, reps: '10/side', intensity: '7', basis: 'rpe', tempo: '2-2-2-0', rest: '45s', purpose: t('ثبات الجذع ضد اللف', 'Anti-rotation trunk control'), component: 'core' },
        ...sprintCD()
      ]
    },
    s4_spe: {
      title: t('تحمل خاص (٣٠٠-٣٥٠م)', 'Special endurance (300-350m)'),
      goal: t('أهم تمرينة في الـ٤٠٠م: تكرارات ٣٠٠-٣٥٠م على ٩٠-٩٢٪ براحة كاملة للحفاظ على الشكل تحت التعب.', 'The key 400 m session: 300-350 m reps at 90-92% with full recovery to hold form under fatigue.'),
      components: ['special_endurance', 'anaerobic'],
      rpe: 10, duration: 100,
      items: [
        ...sprintWU(true),
        { kind: 'run', name: t('٣٥٠م تحمل خاص', '350m special endurance'), sets: 1, reps: '1', distance: '350m', time: '41.5-42.5s', intensity: '90', basis: 'best', rest: '15min', restType: 'walk', purpose: t('محاكاة آخر السباق تحت تعب لاكتيكي عالي', 'Simulate the end of the race under high lactic fatigue'), component: 'special_endurance', note: t('في بلوك ٣ استبدلها بـ ٣٠٠م', 'In Block 3 replace with a 300 m') },
        { kind: 'run', name: t('٣٠٠م تحمل خاص', '300m special endurance'), sets: 1, reps: '2', distance: '300m', time: '36.5-37.5s', intensity: '90-92', basis: 'best', rest: '15min', restType: 'walk', purpose: t('تحمل خاص بجودة عالية', 'High-quality special endurance'), component: 'special_endurance', note: t('راحة ١٢-١٥ دقيقة، ممكن تمشي وتقعد', '12-15 min recovery, walking and sitting') },
        M('مشي ٥ دقايق ثم جري خفيف جدًا', 'Walk 5 min then very easy jog', { duration: '15min' }),
        ml('ex_hip_flexor_stretch', { sets: 2, duration: '40s' })
      ]
    },
    s4_lactate: {
      title: t('تحمل اللاكتيك (٢×٢×٢٠٠م)', 'Lactate tolerance (2x2x200m)'),
      goal: t('رفع قدرة الجسم على تحمل تركيز لاكتيك عالي براحة قصيرة بين التكرارات.', 'Raise tolerance to very high lactate with short rest between reps.'),
      components: ['anaerobic', 'special_endurance'],
      rpe: 10, duration: 90,
      items: [
        ...sprintWU(true),
        { kind: 'run', name: t('٢٠٠م تحمل لاكتيك', '200m lactate tolerance'), sets: 2, reps: '2', distance: '200m', time: '22.8-23.5s', intensity: '90-93', basis: 'best', rest: '2min', restType: 'walk', setRest: '15min', purpose: t('تحمل حموضة عالية جدًا والحفاظ على الميكانيكا', 'Tolerate very high acidity and hold mechanics'), component: 'anaerobic', note: t('الراحة القصيرة مقصودة؛ التكرار التاني هو اللي بيعمل التكيف', 'The short rest is deliberate; the second rep drives the adaptation') },
        { kind: 'run', name: t('١٠٠م سريع مسترخي بعد المجموعة التانية', '100m relaxed-fast after the second set'), sets: 1, reps: '1', distance: '100m', intensity: '85', basis: 'best', rest: '10min', restType: 'walk', purpose: t('الحفاظ على التكنيك تحت التعب', 'Keep technique under fatigue'), component: 'technique' },
        M('مشي ٥ دقايق ثم جري خفيف جدًا', 'Walk 5 min then very easy jog', { duration: '15min' })
      ]
    },
    s4_split: {
      title: t('نموذج السباق (٣٠٠+١٠٠م)', 'Race model (300+100m)'),
      goal: t('تدريب توزيع الجهد بسرعة السباق المستهدفة: ٣٠٠م على خطة السباق ثم ١٠٠م بعد راحة قصيرة.', 'Rehearse distribution at goal race pace: 300 m on race plan then 100 m after a short break.'),
      components: ['special_endurance', 'tactics', 'mental'],
      rpe: 9, duration: 90,
      items: [
        ...sprintWU(true),
        { kind: 'run', name: t('٣٠٠م من البلوك على خطة السباق', '300m from blocks on race plan'), sets: 2, reps: '1', distance: '300m', time: '34.5-35.0s', intensity: '97', basis: 'best', rest: '60s', restType: 'passive', setRest: '20min', purpose: t('تثبيت توزيع السباق (أول ٢٠٠م في حدود ٢١.٨-٢٢.٢ث)', 'Lock in race distribution (first 200 m at 21.8-22.2 s)'), component: 'tactics', note: t('في المنافسات: مجموعة واحدة بس', 'In competition weeks: one set only') },
        { kind: 'run', name: t('١٠٠م بعد دقيقة راحة', '100m after 1-minute break'), sets: 2, reps: '1', distance: '100m', time: '12.5-13.0s', intensity: '95', basis: 'best', rest: '20min', restType: 'walk', purpose: t('محاكاة آخر ١٠٠م تحت تعب حقيقي', 'Simulate the last 100 m under real fatigue'), component: 'special_endurance' },
        ...sprintCD()
      ]
    },
    s4_gen_str: sprGenStr('adv'),
    s4_max_str: sprMaxStr('adv'),
    s4_power: sprPower('adv'),
    s4_maint: sprMaint(),
    s4_plyo_gen: sprPlyoGen(),
    s4_plyo: sprPlyo(),
    s4_primer: sprPrimer('400'),
    s4_race: sprRace('400', '٤٠٠')
  }
};

/* =============================================================================
 * ٤) سرعة للناشئين والمبتدئين (١٠ أسابيع)
 * ============================================================================= */
const T_SPEED_BEG = {
  id: 'pt_sprint_speed_beg',
  sport: 'sprint',
  level: 'beginner',
  title: t('تطوير السرعة — ناشئين ومبتدئين (١٠ أسابيع)', 'Speed development — youth & novice (10 weeks)'),
  goal: t('تعليم ميكانيكا الجري السليمة، تحسين التسارع ورد الفعل والتوافق، وبناء قوة بوزن الجسم بأمان مع متعة وتحفيز.', 'Teach sound running mechanics, improve acceleration, reaction and coordination, and build bodyweight strength safely while keeping it fun.'),
  components: ['acceleration', 'max_velocity', 'coordination', 'reaction', 'technique'],
  sessionsPerWeek: 3,
  periods: [
    {
      type: 'gpp',
      goal: t('أساسيات: تكنيك جري، توافق، قوة بوزن الجسم، وألعاب سرعة ورد فعل.', 'Fundamentals: running technique, coordination, bodyweight strength, and speed/reaction games.'),
      components: ['technique', 'coordination', 'strength', 'reaction'],
      blocks: [
        {
          name: t('بلوك ١ — اختبارات ودخول', 'Block 1 — Testing & entry'),
          goal: t('قياس ١٠م و٣٠م والوثب الطويل من الثبات، وتعليم قواعد الأمان في التمرين.', 'Measure 10m, 30m and standing long jump, and teach training safety rules.'),
          components: ['acceleration', 'power', 'technique'],
          loads: [3], weekTypes: ['test'],
          pattern: ['sb_test', '', 'sb_strength', '', 'sb_tech', '', '']
        },
        {
          name: t('بلوك ٢ — تكنيك وتوافق', 'Block 2 — Technique & coordination'),
          goal: t('دريلز جري يومية، بدايات سقوط، ألعاب رد فعل، وقوة بوزن الجسم.', 'Daily running drills, falling starts, reaction games and bodyweight strength.'),
          components: ['technique', 'coordination', 'reaction', 'strength'],
          loads: [4, 5, 6, 3], weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['sb_tech', '', 'sb_strength', '', 'sb_games', '', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('سرعة وتسارع أكثر تخصصًا: جري طاير قصير، بدايات برد الفعل، وبليومتري منخفض الشدة.', 'More specific speed and acceleration: short flying runs, reaction starts and low-intensity plyometrics.'),
      components: ['acceleration', 'max_velocity', 'reaction', 'power'],
      blocks: [
        {
          name: t('بلوك ٣ — سرعة', 'Block 3 — Speed'),
          goal: t('٢٠م طاير، تسارع ٢٠-٣٠م، ورد فعل على إشارة.', '20m flys, 20-30m accelerations and reaction to a signal.'),
          components: ['acceleration', 'max_velocity', 'reaction', 'power'],
          loads: [5, 6, 6, 3], weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['sb_speed', '', 'sb_strength', '', 'sb_tech', '', '']
        }
      ]
    },
    {
      type: 'comp',
      goal: t('إعادة الاختبار ومسابقة ودية لتطبيق كل اللي اتعلم.', 'Retest and a friendly competition to apply everything learned.'),
      components: ['acceleration', 'max_velocity', 'mental'],
      blocks: [
        {
          name: t('بلوك ٤ — اختبار ومسابقة', 'Block 4 — Test & mini-meet'),
          goal: t('مقارنة الأزمنة بالبداية ومسابقة ٦٠م وتتابع.', 'Compare times with baseline and hold a 60m race and relay meet.'),
          components: ['acceleration', 'max_velocity', 'mental'],
          loads: [4], weekTypes: ['test'],
          pattern: ['sb_test', '', 'sb_speed', '', '', 'sb_race', '']
        }
      ]
    }
  ],
  sessions: {
    sb_test: {
      title: t('اختبارات السرعة للناشئين', 'Youth speed testing'),
      goal: t('قياس خط الأساس للتسارع والسرعة والقدرة بطريقة بسيطة وممتعة.', 'Measure baseline acceleration, speed and power in a simple, fun way.'),
      components: ['acceleration', 'max_velocity', 'power'],
      rpe: 7, duration: 60,
      items: [
        ...sprintWU(true),
        { kind: 'run', libId: 'ad_10_m_sprint_test', sets: 1, reps: '2', distance: '10m', intensity: '100', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('قياس أول خطوات التسارع', 'Measure the first acceleration steps'), component: 'acceleration', note: t('بداية من وقفة متقدمة (رجل قدام)', 'Split-stance standing start') },
        { kind: 'run', libId: 'ad_30_m_sprint_test', sets: 1, reps: '2', distance: '30m', intensity: '100', basis: 'vmax', rest: '4min', restType: 'walk', purpose: t('قياس التسارع والسرعة', 'Measure acceleration and speed'), component: 'acceleration' },
        { kind: 'drill', libId: 'ad_standing_broad_jump_test', sets: 1, reps: '3', rest: '90s', purpose: t('قياس القدرة الأفقية', 'Measure horizontal power'), component: 'power' },
        ...sprintCD()
      ]
    },
    sb_tech: {
      title: t('تكنيك جري وتسارع', 'Running technique & acceleration'),
      goal: t('تعليم وضع الجسم، حركة الدراعات والرجلين، وأول خطوات التسارع.', 'Teach posture, arm and leg action, and the first acceleration steps.'),
      components: ['technique', 'acceleration', 'coordination'],
      rpe: 5, duration: 60,
      items: [
        W('جري خفيف + ألعاب تسخين', 'Easy jog + warm-up games', { duration: '10min' }),
        { kind: 'drill', libId: 'ad_a_skip', name: t('A مارش ثم A سكيب', 'A-march then A-skip'), sets: 3, distance: '20m', rest: '45s', purpose: t('رفع الركبة وارتكاز تحت الحوض', 'Knee lift and foot strike under the hips'), component: 'technique' },
        { kind: 'drill', name: t('دراعات في المكان (جلوس ثم وقوف)', 'Arm action drill (seated then standing)'), sets: 3, duration: '15s', rest: '30s', purpose: t('مرجحة دراع من الكتف (من الجيب للدقن)', 'Arm swing from the shoulder (pocket to chin)'), component: 'technique' },
        { kind: 'drill', libId: 'ad_wall_drive', sets: 2, reps: '5/leg', rest: '45s', purpose: t('زاوية الجسم في التسارع', 'Body angle in acceleration'), component: 'acceleration' },
        { kind: 'run', libId: 'ad_falling_start', sets: 1, reps: '5', distance: '15m', intensity: '90', basis: 'vmax', rest: '90s', restType: 'walk', purpose: t('ميل الجسم للأمام وخطوات دفع قوية', 'Forward lean and powerful push steps'), component: 'acceleration' },
        { kind: 'run', libId: 'dr_sprint_accel', sets: 1, reps: '4', distance: '20m', intensity: '90-95', basis: 'vmax', rest: '2min', restType: 'walk', purpose: t('تطبيق التكنيك في تسارع حر', 'Apply technique in free acceleration'), component: 'acceleration' },
        M('مشي + إطالات خفيفة', 'Walk + light stretching', { duration: '8min' })
      ]
    },
    sb_speed: {
      title: t('سرعة ورد فعل', 'Speed & reaction'),
      goal: t('تحسين السرعة القصوى ورد الفعل بتكرارات قصيرة وراحة كاملة.', 'Improve top speed and reaction with short reps and full recovery.'),
      components: ['max_velocity', 'reaction', 'acceleration'],
      rpe: 6, duration: 60,
      items: [
        ...sprintWU(true),
        { kind: 'run', libId: 'ad_reaction_start_sprint', sets: 2, reps: '3', distance: '10m', intensity: '100', basis: 'vmax', rest: '90s', restType: 'walk', setRest: '3min', purpose: t('رد فعل سريع على صفارة أو تصفيق', 'Fast reaction to a whistle or clap'), component: 'reaction', note: t('غيّر وضع البداية: جلوس، نايم، ضهر للاتجاه', 'Vary start position: seated, lying, facing backwards') },
        { kind: 'run', libId: 'ad_flying_sprint', name: t('٢٠م طاير (بعد ٢٠م اقتراب)', '20m fly (after 20m run-in)'), sets: 2, reps: '3', distance: '20m', intensity: '95', basis: 'vmax', rest: '3min', restType: 'walk', setRest: '5min', purpose: t('إحساس السرعة القصوى باسترخاء', 'Feel top speed while relaxed'), component: 'max_velocity' },
        { kind: 'drill', libId: 'ad_pogo_hop', sets: 3, reps: '10', rest: '60s', purpose: t('صلابة الكاحل بشكل آمن', 'Ankle stiffness, safely'), component: 'power' },
        M('مشي + إطالات خفيفة', 'Walk + light stretching', { duration: '8min' })
      ]
    },
    sb_strength: {
      title: t('قوة بوزن الجسم وقفز', 'Bodyweight strength & jumps'),
      goal: t('بناء قوة عامة وثبات للجذع ومهارة هبوط سليمة بدون أوزان خارجية.', 'Build general strength, trunk stability and sound landing skills without external load.'),
      components: ['strength', 'core', 'power', 'prevention'],
      rpe: 5, duration: 50,
      items: [
        W('جري خفيف + جامبينج جاك', 'Easy jog + jumping jacks', { duration: '8min' }),
        { kind: 'strength', name: t('سكوات بوزن الجسم', 'Bodyweight squat'), sets: 3, reps: '12', intensity: '6', basis: 'rpe', tempo: '2-0-1-0', rest: '60s', purpose: t('نمط حركة السكوات السليم', 'Sound squat pattern'), component: 'strength' },
        { kind: 'strength', libId: 'ex_reverse_lunge', sets: 3, reps: '8/leg', intensity: '6', basis: 'rpe', tempo: '2-0-1-0', rest: '60s', purpose: t('قوة الرجل الواحدة والتوازن', 'Single-leg strength and balance'), component: 'strength' },
        { kind: 'strength', libId: 'ex_glute_bridge', sets: 3, reps: '12', intensity: '6', basis: 'rpe', tempo: '1-2-1-0', rest: '45s', purpose: t('تنشيط المؤخرة', 'Glute activation'), component: 'strength' },
        { kind: 'strength', libId: 'ex_pushup', sets: 3, reps: '8-10', intensity: '7', basis: 'rpe', tempo: '2-0-1-0', rest: '60s', purpose: t('قوة الجزء العلوي', 'Upper-body strength'), component: 'strength', note: t('على الركب لو محتاج', 'On knees if needed') },
        { kind: 'strength', libId: 'ex_plank', sets: 3, reps: '20-30s', intensity: '6', basis: 'rpe', rest: '45s', purpose: t('ثبات الجذع', 'Trunk stability'), component: 'core' },
        { kind: 'drill', libId: 'ad_broad_jump', sets: 3, reps: '3', rest: '90s', purpose: t('قدرة أفقية وهبوط على الرجلين بثبات', 'Horizontal power and stable two-foot landing'), component: 'power', note: t('ثبّت الهبوط ٢ ثانية (ركب فوق الصوابع)', 'Stick the landing 2 s (knees over toes)') },
        { kind: 'drill', libId: 'ad_single_leg_forward_hop_and_stick', sets: 2, reps: '4/leg', rest: '60s', purpose: t('ثبات الركبة في الهبوط', 'Knee control on landing'), component: 'prevention' },
        M('إطالات خفيفة', 'Light stretching', { duration: '6min' })
      ]
    },
    sb_games: {
      title: t('ألعاب رشاقة ورد فعل', 'Agility & reaction games'),
      goal: t('تنمية التوافق والرشاقة ورد الفعل بألعاب تنافسية ممتعة.', 'Develop coordination, agility and reaction through fun competitive games.'),
      components: ['agility', 'reaction', 'coordination'],
      rpe: 6, duration: 50,
      items: [
        W('جري خفيف + حركات مرونة', 'Easy jog + mobility moves', { duration: '8min' }),
        { kind: 'drill', libId: 'ad_agility_ladder_one_in_run', sets: 3, reps: '2', rest: '45s', purpose: t('سرعة القدمين والتوافق', 'Foot speed and coordination'), component: 'coordination' },
        { kind: 'drill', libId: 'ad_agility_ladder_two_in_run', sets: 3, reps: '2', rest: '45s', purpose: t('إيقاع وسرعة القدمين', 'Rhythm and foot speed'), component: 'coordination' },
        { kind: 'drill', libId: 'ad_ball_drop_sprint', sets: 2, reps: '4', rest: '60s', purpose: t('رد فعل بصري وانطلاق سريع', 'Visual reaction and quick start'), component: 'reaction' },
        { kind: 'drill', libId: 'dr_cone_t_drill', sets: 1, reps: '4', rest: '2min', purpose: t('تغيير اتجاه وسيطرة على الجسم', 'Change of direction and body control'), component: 'agility' },
        { kind: 'run', name: t('تتابع ٤×٤٠م بين فرق', 'Team relay 4x40m'), sets: 2, reps: '1', distance: '40m', intensity: '95', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('تنافس وسرعة وتحفيز', 'Competition, speed and motivation'), component: 'max_velocity' },
        M('مشي + إطالات خفيفة', 'Walk + light stretching', { duration: '6min' })
      ]
    },
    sb_race: {
      title: t('مسابقة ودية (٦٠م + تتابع)', 'Mini-meet (60m + relay)'),
      goal: t('تطبيق التكنيك في جو منافسة وتسجيل أزمنة الموسم.', 'Apply technique in a competitive setting and record season times.'),
      components: ['acceleration', 'max_velocity', 'mental'],
      rpe: 8, duration: 75,
      items: [
        ...sprintWU(true),
        { kind: 'run', name: t('سباق ٦٠م (تصفيات + نهائي)', '60m race (heat + final)'), sets: 1, reps: '2', distance: '60m', intensity: '100', basis: 'best', rest: '20min', restType: 'passive', purpose: t('أحسن زمن في الموسم', 'Season-best time'), component: 'max_velocity' },
        { kind: 'run', name: t('تتابع ٤×٥٠م', '4x50m relay'), sets: 1, reps: '1', distance: '50m', intensity: '100', basis: 'best', rest: '10min', restType: 'walk', purpose: t('روح الفريق وتسليم العصا', 'Team spirit and baton exchange'), component: 'coordination' },
        M('تهدئة وإطالات', 'Cool-down and stretching', { duration: '10min' })
      ]
    }
  }
};

/* ======================= تمرينات مشتركة لعدائي المسافات ======================= */
/* o: { title, goal, dist, dur, hr, pace, strides, rpe, duration, note } */
const easyRun = (o) => ({
  title: o.title || (o.strides ? t('جري سهل + ستريدز', 'Easy run + strides') : t('جري سهل', 'Easy run')),
  goal: o.goal || t('حجم هوائي منخفض الشدة لبناء القاعدة وتسريع الاستشفاء بين التمرينات الصعبة.', 'Low-intensity aerobic volume to build the base and speed recovery between hard sessions.'),
  components: o.strides ? ['aerobic', 'recovery', 'technique'] : ['aerobic', 'recovery'],
  rpe: o.rpe || 3, duration: o.duration,
  items: [
    W('مشي سريع + حركات مرونة ديناميكية', 'Brisk walk + dynamic mobility', { duration: '5min' }),
    { kind: 'run', libId: 'ad_zone_2_easy_run', distance: o.dist, duration: o.dur, intensity: o.hr || 'Z2', basis: 'hr', purpose: t('بناء القاعدة الهوائية (كثافة الميتوكوندريا والشعيرات الدموية)', 'Build the aerobic base (mitochondrial and capillary density)'), component: 'aerobic', note: o.note || t('لازم تقدر تتكلم بجمل كاملة', 'You should be able to talk in full sentences') },
    ...(o.strides ? [{ kind: 'run', libId: 'ad_strides', sets: 1, reps: String(o.strides), distance: '80m', intensity: '85-90', basis: 'vmax', rest: '60s', restType: 'walk', purpose: t('الحفاظ على السرعة والتكنيك بدون تعب', 'Keep speed and mechanics without fatigue'), component: 'technique' }] : []),
    ...runCD()
  ]
});
/* o: { title, goal, dist, dur, hr, note, extra (item), duration, rpe, components } */
const longRun = (o) => ({
  title: o.title || t('الجري الطويل', 'Long run'),
  goal: o.goal || t('رفع التحمل الهوائي وكفاءة حرق الدهون وتحمل العضلات والأوتار للمسافة.', 'Raise aerobic endurance, fat-burning efficiency and musculoskeletal tolerance to distance.'),
  components: o.components || ['aerobic', 'muscular_endurance'],
  rpe: o.rpe || 5, duration: o.duration,
  items: [
    W('مشي سريع + حركات مرونة ديناميكية', 'Brisk walk + dynamic mobility', { duration: '5min' }),
    { kind: 'run', libId: 'wg_running', name: o.name, distance: o.dist, duration: o.dur, intensity: o.hr || 'Z2', basis: 'hr', purpose: o.purpose || t('تحمل هوائي طويل بشدة سهلة ثابتة', 'Long aerobic endurance at a steady easy effort'), component: 'aerobic', note: o.note },
    ...(o.extra ? [o.extra] : []),
    M('مشي ٥ دقايق + إطالات للسمانة والخلفية والحوض', 'Walk 5 min + calf, hamstring and hip stretches', { duration: '12min' }),
    ml('ex_calf_stretch', { sets: 2, duration: '40s' })
  ]
});
/* قوة لعدائي المسافات المتوسطة (٨٠٠/١٥٠٠م) */
const mdStr = (lv) => ({
  title: t('قوة للعدائين', 'Runner strength'),
  goal: t('قوة قصوى ونسبية للرجلين، قدرة، وتحمل السمانة والأوتار لتحسين اقتصاد الجري والوقاية من الإصابات.', 'Max and relative leg strength, power, and calf/tendon capacity to improve running economy and prevent injury.'),
  components: ['strength', 'power', 'prevention'],
  rpe: 7, duration: 70,
  items: [
    ...gymWU(),
    lv === 'adv'
      ? { kind: 'strength', libId: 'ad_hang_power_clean', sets: 3, reps: '3', intensity: '70', basis: '1rm', rest: '2min', purpose: t('قدرة وسرعة إنتاج قوة', 'Power and rate of force development'), component: 'power' }
      : { kind: 'drill', libId: 'ex_box_jump', sets: 3, reps: '4', rest: '90s', purpose: t('قدرة وسرعة إنتاج قوة', 'Power and rate of force development'), component: 'power', note: t('صندوق ٥٠-٦٠سم، انزل مشي', '50-60 cm box, step down') },
    { kind: 'strength', libId: 'ex_barbell_back_squat', sets: lv === 'adv' ? 4 : 3, reps: lv === 'adv' ? '5' : '6', intensity: lv === 'adv' ? '75-80' : '70', basis: '1rm', tempo: '2-0-X-0', rest: '2min', purpose: t('قوة قصوى بدون زيادة وزن (اقتصاد جري أفضل)', 'Max strength without mass gain (better running economy)'), component: 'strength' },
    { kind: 'strength', libId: 'ex_single_leg_rdl', sets: 3, reps: '6/leg', intensity: '2', basis: 'rir', tempo: '3-0-1-0', rest: '90s', purpose: t('قوة الخلفية وثبات الحوض على رجل واحدة', 'Hamstring strength and single-leg pelvic control'), component: 'strength' },
    { kind: 'strength', libId: 'ex_bulgarian_split_squat', sets: 3, reps: '6/leg', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '90s', purpose: t('قوة الرجل الواحدة زي الجري', 'Single-leg strength, as in running'), component: 'strength' },
    { kind: 'strength', libId: 'ad_bent_knee_soleus_raise', sets: 3, reps: '12/leg', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '60s', purpose: t('قدرة السوليوس (بيشيل ٦-٨ أضعاف وزن الجسم في الجري)', 'Soleus capacity (it takes 6-8x body weight when running)'), component: 'prevention', note: t('بدمبل أو على جهاز السمانة جلوس', 'With a dumbbell or on the seated calf machine') },
    { kind: 'strength', libId: 'ex_nordic_hamstring_curl', sets: 2, reps: '5', intensity: '8', basis: 'rpe', tempo: '4-0-X-0', rest: '2min', purpose: t('وقاية الخلفية (خصوصًا في السرعات العالية)', 'Hamstring protection, especially at high speeds'), component: 'prevention' },
    { kind: 'strength', libId: 'ex_copenhagen_plank', sets: 2, reps: '20s/side', intensity: '7', basis: 'rpe', rest: '45s', purpose: t('قوة المقربات وثبات الحوض', 'Adductor strength and pelvic stability'), component: 'core' },
    ...gymCD()
  ]
});
/* قوة لعدائي المسافات الطويلة: lv = 'adv' | 'int' | 'beg' */
const distStr = (lv) => ({
  title: lv === 'beg' ? t('قوة بوزن الجسم للعدائين', 'Bodyweight strength for runners') : t('قوة للعدائين', 'Runner strength'),
  goal: t('تقوية الرجلين والسمانة والحوض والجذع لتحسين اقتصاد الجري وتقليل الإصابات الشائعة (السمانة، الركبة، الساق).', 'Strengthen legs, calves, hips and trunk to improve running economy and reduce common injuries (calf, knee, shin).'),
  components: ['strength', 'prevention', 'core'],
  rpe: lv === 'beg' ? 5 : 6, duration: lv === 'beg' ? 40 : 60,
  items: [
    ...(lv === 'beg' ? [W('مشي سريع + حركات مرونة', 'Brisk walk + mobility moves', { duration: '6min' })] : gymWU()),
    lv === 'beg'
      ? { kind: 'strength', name: t('سكوات بوزن الجسم', 'Bodyweight squat'), sets: 3, reps: '12', intensity: '6', basis: 'rpe', tempo: '2-0-1-0', rest: '60s', purpose: t('قوة عامة للرجلين', 'General leg strength'), component: 'strength' }
      : { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 3, reps: lv === 'adv' ? '5' : '6', intensity: lv === 'adv' ? '75-80' : '70', basis: '1rm', tempo: '2-0-X-0', rest: '2min', purpose: t('قوة قصوى بدون زيادة وزن (اقتصاد جري أفضل)', 'Max strength without mass gain (better running economy)'), component: 'strength', note: t('ممكن تستبدله بسكوات جوبلت أو تراب بار', 'Goblet squat or trap-bar deadlift are fine substitutes') },
    { kind: 'strength', libId: lv === 'beg' ? 'ex_step_up' : 'ek_step_ups_with_dumbbells', sets: 3, reps: '8/leg', intensity: lv === 'beg' ? '6' : '2', basis: lv === 'beg' ? 'rpe' : 'rir', tempo: '2-0-1-0', rest: '60s', purpose: t('قوة الرجل الواحدة وثبات الركبة', 'Single-leg strength and knee control'), component: 'strength' },
    { kind: 'strength', libId: 'ex_single_leg_rdl', sets: 3, reps: '8/leg', intensity: lv === 'beg' ? '6' : '2', basis: lv === 'beg' ? 'rpe' : 'rir', tempo: '3-0-1-0', rest: '60s', purpose: t('قوة الخلفية والمؤخرة وتوازن', 'Hamstring, glute strength and balance'), component: 'strength', note: lv === 'beg' ? t('بدون وزن أو دمبل خفيف', 'Bodyweight or a light dumbbell') : undefined },
    { kind: 'strength', libId: lv === 'beg' ? 'wg_calf_raise' : 'wg_single_leg_calf_raise', sets: 3, reps: lv === 'beg' ? '15' : '12/leg', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '60s', purpose: t('تحمل السمانة ووتر أكيليس', 'Calf and Achilles capacity'), component: 'prevention' },
    { kind: 'strength', libId: 'ad_bent_knee_soleus_raise', sets: 3, reps: '15/leg', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '60s', purpose: t('قدرة السوليوس (أكتر عضلة شايلة حمل في الجري)', 'Soleus capacity, the most loaded muscle in running'), component: 'prevention' },
    { kind: 'strength', libId: 'ad_tibialis_raise', sets: 2, reps: '15', intensity: '2', basis: 'rir', tempo: '1-1-2-0', rest: '45s', purpose: t('وقاية الساق (آلام القصبة)', 'Shin splint prevention'), component: 'prevention' },
    { kind: 'strength', libId: 'wg_side_lying_hip_abduction', sets: 2, reps: '15/side', intensity: '2', basis: 'rir', tempo: '2-1-1-0', rest: '45s', purpose: t('قوة الألوية الوسطى وثبات الحوض (وقاية الركبة)', 'Glute medius strength and pelvic control (knee protection)'), component: 'prevention' },
    { kind: 'strength', libId: 'ex_side_plank', sets: 2, reps: '30s/side', intensity: '7', basis: 'rpe', rest: '30s', purpose: t('ثبات الجذع الجانبي', 'Lateral trunk stiffness'), component: 'core' },
    ...gymCD()
  ]
});
const runStrMaint = () => ({
  title: t('قوة للحفاظ', 'Strength maintenance'),
  goal: t('الحفاظ على القوة والصلابة بحجم قليل جدًا بدون تعب يأثر على الجري.', 'Maintain strength and stiffness with very low volume and no fatigue carried into running.'),
  components: ['strength', 'prevention', 'power'],
  rpe: 5, duration: 40,
  items: [
    ...gymWU(),
    { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 3, reps: '3', intensity: '75-80', basis: '1rm', tempo: '2-0-X-0', rest: '2min', purpose: t('الحفاظ على القوة القصوى', 'Maintain max strength'), component: 'strength', note: t('الصعود بسرعة، وقف قبل التعب', 'Drive up fast, stop well before fatigue') },
    { kind: 'strength', libId: 'ex_single_leg_rdl', sets: 2, reps: '5/leg', intensity: '3', basis: 'rir', tempo: '2-0-1-0', rest: '60s', purpose: t('الحفاظ على قوة الخلفية', 'Maintain hamstring strength'), component: 'strength' },
    { kind: 'strength', libId: 'ad_bent_knee_soleus_raise', sets: 2, reps: '12/leg', intensity: '3', basis: 'rir', tempo: '2-1-2-0', rest: '60s', purpose: t('الحفاظ على قدرة السمانة', 'Maintain calf capacity'), component: 'prevention' },
    { kind: 'drill', libId: 'ad_pogo_hop', sets: 2, reps: '15', rest: '60s', purpose: t('صلابة الكاحل (اقتصاد جري)', 'Ankle stiffness (running economy)'), component: 'power' },
    ...gymCD()
  ]
});

/* =============================================================================
 * ٥) ١١٠م حواجز (١٠٠م سيدات) — متقدم (١٨ أسبوع)
 * ============================================================================= */
const T_HURDLES_ADV = {
  id: 'pt_hurdles_110_adv',
  sport: 'hurdles',
  level: 'advanced',
  title: t('١١٠م حواجز (١٠٠م سيدات) — متقدم (موسم ١٨ أسبوع)', '110mH / 100mH — advanced (18-week season)'),
  goal: t('خروج أسرع للحاجز الأول (٨ خطوات)، إيقاع ٣ خطوات ثابت بين الحواجز بأقل زمن فوق الحاجز، وتحمل إيقاع لآخر ٣ حواجز، للوصول لأحسن رقم في البطولة.', 'Faster approach to hurdle 1 (8 steps), a stable 3-step rhythm with minimal time over the barrier, and rhythm endurance through the last 3 hurdles, to peak at the championship.'),
  components: ['acceleration', 'technique', 'max_velocity', 'speed_endurance', 'mobility'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: t('قاعدة: قوة عامة، مرونة الحوض الخاصة بالحواجز، دريلز الرجل الأمامية والخلفية، وإيقاع على مسافات مخففة.', 'Base: general strength, hurdle-specific hip mobility, lead- and trail-leg drills, and rhythm over reduced spacing.'),
      components: ['strength', 'mobility', 'technique', 'acceleration'],
      blocks: [
        {
          name: t('بلوك ١ — اختبارات ودخول', 'Block 1 — Testing & entry'),
          goal: t('قياس ٣٠م بلوك، ٣٠م طاير، وزمن الوصول للحاجز الأول والخامس، والوثب الطويل من الثبات.', 'Measure 30m blocks, 30m fly, touchdown times at hurdle 1 and 5, and standing long jump.'),
          components: ['acceleration', 'max_velocity', 'technique', 'power'],
          loads: [4], weekTypes: ['test'],
          pattern: ['sh_test', 'sh_drills', 'sh_gen_str', '', 'sh_plyo_gen', 'sh_drills', '']
        },
        {
          name: t('بلوك ٢ — قاعدة وإيقاع', 'Block 2 — Base & rhythm'),
          goal: t('تسارع بمقاومة، إيقاع على ٦-٨ حواجز بمسافات مخففة وارتفاع أقل، وقوة عامة.', 'Resisted acceleration, rhythm over 6-8 hurdles at reduced spacing and height, and general strength.'),
          components: ['acceleration', 'technique', 'strength', 'mobility'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['sh_accel', 'sh_gen_str', 'sh_drills', 'sh_rhythm', 'sh_gen_str', 'sh_plyo_gen', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('قوة قصوى ثم قدرة، بدايات على ١-٣ حواجز بالارتفاع والمسافة الرسمية، سرعة قصوى، وتحمل إيقاع على ١٠-١٢ حاجز.', 'Max strength then power, starts over 1-3 hurdles at full height and spacing, max velocity, and rhythm endurance over 10-12 hurdles.'),
      components: ['max_strength', 'acceleration', 'technique', 'max_velocity', 'speed_endurance'],
      blocks: [
        {
          name: t('بلوك ٣ — بدايات وقوة قصوى', 'Block 3 — Starts & max strength'),
          goal: t('بدايات على ١ و٣ حواجز، إيقاع، تحمل إيقاع، وسكوات ٨٥-٩٠٪.', 'Starts over 1 and 3 hurdles, rhythm, rhythm endurance and squats at 85-90%.'),
          components: ['acceleration', 'technique', 'max_strength', 'speed_endurance'],
          loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['sh_starts', 'sh_max_str', 'sh_drills', 'sh_rhythm', 'sh_max_str', 'sh_se', '']
        },
        {
          name: t('بلوك ٤ — تحويل القوة وسرعة', 'Block 4 — Power conversion & speed'),
          goal: t('سرعة قصوى وحواجز سريعة بمسافات مخففة، كونتراست، وبليومتري ارتدادي.', 'Max velocity and speed hurdles at reduced spacing, contrast work and reactive plyometrics.'),
          components: ['max_velocity', 'power', 'technique', 'speed_endurance'],
          loads: [7, 8, 5], weekTypes: ['load', 'shock', 'deload'],
          pattern: ['sh_maxv', 'sh_power', 'sh_drills', 'sh_starts', 'sh_plyo', 'sh_se', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('إعادة الاختبار ونموذج السباق الكامل (١٠ حواجز) بالمسافة والارتفاع الرسمي.', 'Retest and full race modelling (10 hurdles) at official height and spacing.'),
      components: ['technique', 'acceleration', 'speed_endurance', 'mental'],
      blocks: [
        {
          name: t('بلوك ٥ — أسبوع اختبارات', 'Block 5 — Testing week'),
          goal: t('نفس اختبارات البداية وضبط عدد الخطوات للحاجز الأول.', 'Repeat baseline tests and confirm the step count to hurdle 1.'),
          components: ['acceleration', 'technique', 'max_velocity'],
          loads: [4], weekTypes: ['test'],
          pattern: ['sh_test', 'sh_drills', 'sh_power', '', 'sh_starts', 'sh_drills', '']
        },
        {
          name: t('بلوك ٦ — نموذج السباق', 'Block 6 — Race modelling'),
          goal: t('بدايات، سرعة قصوى، وجري السباق كامل على ١٠ حواجز بتوقيت.', 'Starts, max velocity and full 10-hurdle race runs under timing.'),
          components: ['technique', 'acceleration', 'speed_endurance', 'mental'],
          loads: [7, 6], weekTypes: ['load', 'load'],
          pattern: ['sh_starts', 'sh_power', 'sh_drills', 'sh_maxv', '', 'sh_race_model', '']
        }
      ]
    },
    {
      type: 'comp',
      goal: t('الحفاظ على الإيقاع والسرعة والقدرة بحجم قليل والتسابق أسبوعيًا.', 'Maintain rhythm, speed and power with low volume while racing weekly.'),
      components: ['technique', 'acceleration', 'mental'],
      blocks: [
        {
          name: t('بلوك ٧ — منافسات', 'Block 7 — Competition'),
          goal: t('بدايات على حواجز، إيقاع قصير، قوة للحفاظ، وسباق آخر الأسبوع.', 'Starts over hurdles, short rhythm work, maintenance strength and a weekend race.'),
          components: ['technique', 'acceleration', 'mental'],
          loads: [6, 5], weekTypes: ['comp', 'comp'],
          pattern: ['sh_starts', 'sh_maint', 'sh_drills', 'sh_rhythm', '', 'sh_primer', 'sh_race']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('تهدئة: حجم أقل ٥٠٪ مع لمسات بداية وإيقاع بجودة عالية.', 'Taper: 50% less volume with high-quality start and rhythm touches.'),
      components: ['technique', 'recovery', 'mental'],
      blocks: [
        {
          name: t('بلوك ٨ — أسبوع البطولة', 'Block 8 — Championship week'),
          goal: t('جهاز عصبي فريش وإحساس إيقاع حاد يوم البطولة.', 'Fresh nervous system and a sharp rhythm feel on championship day.'),
          components: ['technique', 'acceleration', 'recovery', 'mental'],
          loads: [3], weekTypes: ['taper'],
          pattern: ['sh_starts', 'sh_drills', 'sh_maint', '', 'sh_primer', 'sh_race', '']
        }
      ]
    }
  ],
  sessions: {
    sh_test: {
      title: t('اختبارات الحواجز', 'Hurdles testing'),
      goal: t('قياس التسارع والسرعة القصوى وأزمنة الوصول للحواجز لتحديد الأهداف.', 'Measure acceleration, max velocity and hurdle touchdown times to set targets.'),
      components: ['acceleration', 'max_velocity', 'technique', 'power'],
      rpe: 8, duration: 110,
      items: [
        ...hurdleWU(),
        { kind: 'run', libId: 'ad_30_m_sprint_test', name: t('٣٠م من البلوك (بدون حواجز)', '30m from blocks (flat)'), sets: 1, reps: '2', distance: '30m', time: '3.95-4.05s', intensity: '100', basis: 'vmax', rest: '5min', restType: 'walk', purpose: t('قياس التسارع', 'Measure acceleration'), component: 'acceleration' },
        { kind: 'run', libId: 'ad_flying_sprint', name: t('٣٠م طاير', '30m fly'), sets: 1, reps: '2', distance: '30m', time: '2.85-2.95s', intensity: '100', basis: 'vmax', rest: '6min', restType: 'walk', purpose: t('قياس السرعة القصوى', 'Measure max velocity'), component: 'max_velocity' },
        { kind: 'run', name: t('بلوك إلى الحاجز الأول (زمن الهبوط)', 'Blocks to hurdle 1 (touchdown time)'), sets: 1, reps: '2', distance: '15m', time: '2.50-2.60s', intensity: '100', basis: 'vmax', rest: '5min', restType: 'walk', purpose: t('قياس جودة الاقتراب (٨ خطوات)', 'Measure approach quality (8 steps)'), component: 'acceleration', note: t('رجال ١٣.٧٢م / سيدات ١٣.٠٠م للحاجز الأول', 'Men 13.72 m / women 13.00 m to hurdle 1') },
        { kind: 'run', name: t('بلوك إلى الحاجز الخامس (زمن الهبوط)', 'Blocks to hurdle 5 (touchdown time)'), sets: 1, reps: '2', distance: '50m', time: '6.55-6.75s', intensity: '100', basis: 'best', rest: '10min', restType: 'walk', purpose: t('قياس سرعة الإيقاع (هدف ١.٠٠-١.٠٥ث بين الحواجز)', 'Measure rhythm speed (target 1.00-1.05 s per interval)'), component: 'technique' },
        { kind: 'drill', libId: 'ad_standing_broad_jump_test', sets: 1, reps: '3', rest: '2min', purpose: t('قياس القدرة الأفقية', 'Measure horizontal power'), component: 'power' },
        ...sprintCD()
      ]
    },
    sh_accel: {
      title: t('تسارع بمقاومة + حاجز أول', 'Resisted acceleration + first hurdle'),
      goal: t('قوة الدفع الأفقي وتعلم الوصول للحاجز الأول بزاوية جسم صحيحة.', 'Horizontal push strength and learning to arrive at hurdle 1 with the correct body angle.'),
      components: ['acceleration', 'technique', 'power'],
      rpe: 7, duration: 90,
      items: [
        ...hurdleWU(),
        { kind: 'run', libId: 'ad_hill_sprint', sets: 2, reps: '4', distance: '30m', intensity: '9-10', basis: 'rpe', rest: '3min', restType: 'walk', setRest: '6min', purpose: t('قوة أفقية في أول خطوات', 'Horizontal force over the first steps'), component: 'acceleration', note: t('طلعة ٥-٨٪', '5-8% hill') },
        { kind: 'run', libId: 'ad_sled_resisted_sprint', sets: 1, reps: '4', distance: '20m', intensity: '90', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('قوة الدفع في مرحلة الخروج', 'Push strength in the drive phase'), component: 'acceleration' },
        { kind: 'run', name: t('بداية ٨ خطوات فوق حاجز واحد منخفض', '8-step start over one low hurdle'), sets: 1, reps: '6', distance: '20m', intensity: '90', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('تثبيت عدد الخطوات ونقطة الارتقاء', 'Stabilise step count and take-off point'), component: 'technique', note: t('ارتفاع ٩١سم (سيدات ٧٦سم)', '91 cm height (women 76 cm)') },
        ...sprintCD()
      ]
    },
    sh_rhythm: {
      title: t('إيقاع الحواجز', 'Hurdle rhythm'),
      goal: t('إيقاع ٣ خطوات سريع ومسترخي، رجل أمامية بتضرب لتحت، ورجل خلفية بتسحب للأمام بسرعة.', 'Fast, relaxed 3-step rhythm, attacking lead leg that snaps down and a quick trail leg pulling through.'),
      components: ['technique', 'coordination', 'max_velocity'],
      rpe: 7, duration: 90,
      items: [
        ...hurdleWU(),
        { kind: 'drill', name: t('دريل الرجل الأمامية بجنب الحواجز (مشي ثم سكيب)', 'Lead-leg drill beside the hurdles (walk then skip)'), sets: 3, reps: '8', rest: '60s', purpose: t('ركبة عالية ورجل أمامية بتنزل نشط تحت الحوض', 'High knee and active lead-leg snap-down under the hips'), component: 'technique', note: t('٨ حواجز مسافة ٣-٤م', '8 hurdles 3-4 m apart') },
        { kind: 'drill', name: t('دريل الرجل الخلفية بجنب الحواجز', 'Trail-leg drill beside the hurdles'), sets: 3, reps: '8', rest: '60s', purpose: t('سحب الركبة للأمام والأعلى بسرعة', 'Pull the knee forward and high, quickly'), component: 'technique' },
        { kind: 'run', name: t('جري إيقاع على ٦ حواجز (٣ خطوات، مسافة مخففة)', 'Rhythm runs over 6 hurdles (3-step, reduced spacing)'), sets: 2, reps: '4', distance: '60m', intensity: '85-90', basis: 'vmax', rest: '3min', restType: 'walk', setRest: '6min', purpose: t('إيقاع سريع ومسترخي بين الحواجز', 'Fast, relaxed rhythm between hurdles'), component: 'technique', note: t('مسافة ٨.٠٠-٨.٥٠م وارتفاع ٩١-٩٩سم (سيدات ٧.٥٠-٨.٠٠م / ٧٦سم)', 'Spacing 8.00-8.50 m, height 91-99 cm (women 7.50-8.00 m / 76 cm)') },
        { kind: 'run', name: t('جري ٥ خطوات على ٨ حواجز', '5-stride runs over 8 hurdles'), sets: 1, reps: '3', distance: '100m', intensity: '85', basis: 'vmax', rest: '4min', restType: 'walk', purpose: t('تكرار عدد كبير من الحواجز بتكنيك نضيف وبأمان', 'High hurdle-clearance volume with clean technique, safely'), component: 'coordination', note: t('مسافة ١٢-١٣م بين الحواجز', '12-13 m between hurdles') },
        ...sprintCD()
      ]
    },
    sh_starts: {
      title: t('بدايات على ١-٣ حواجز', 'Starts over 1-3 hurdles'),
      goal: t('خروج قوي من البلوك، ٨ خطوات للحاجز الأول، وهجوم على الحاجز بدون ما السرعة تقل.', 'Powerful block clearance, 8 steps to hurdle 1 and attacking the barrier without losing speed.'),
      components: ['acceleration', 'technique', 'reaction'],
      rpe: 8, duration: 95,
      items: [
        ...hurdleWU(),
        { kind: 'run', name: t('بلوك إلى حاجز واحد', 'Blocks over 1 hurdle'), sets: 1, reps: '5', distance: '20m', time: '2.50-2.60s', intensity: '97', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('ثبات الاقتراب (زمن الهبوط بعد الحاجز الأول)', 'Consistent approach (touchdown time after hurdle 1)'), component: 'acceleration', note: t('بالارتفاع والمسافة الرسمية', 'Official height and spacing') },
        { kind: 'run', name: t('بلوك إلى ٣ حواجز', 'Blocks over 3 hurdles'), sets: 2, reps: '3', distance: '35m', time: '4.55-4.70s', intensity: '97-100', basis: 'vmax', rest: '4min', restType: 'walk', setRest: '8min', purpose: t('الانتقال من التسارع لإيقاع ٣ خطوات', 'Transition from acceleration into 3-step rhythm'), component: 'technique', note: t('الزمن = هبوط الحاجز الثالث', 'Time = touchdown off hurdle 3') },
        { kind: 'run', libId: 'ad_reaction_start_sprint', name: t('بدايات على المسدس (١٠م)', 'Starts on the gun (10m)'), sets: 1, reps: '4', distance: '10m', intensity: '100', basis: 'vmax', rest: '2min', restType: 'walk', purpose: t('رد فعل سريع', 'Fast reaction'), component: 'reaction' },
        ...sprintCD()
      ]
    },
    sh_maxv: {
      title: t('سرعة قصوى وحواجز سريعة', 'Max velocity & speed hurdles'),
      goal: t('رفع السرعة القصوى وتعليم الإيقاع على سرعة أعلى من السباق بمسافات مخففة.', 'Raise top speed and teach rhythm faster than race speed using reduced spacing.'),
      components: ['max_velocity', 'technique', 'coordination'],
      rpe: 8, duration: 90,
      items: [
        ...hurdleWU(),
        { kind: 'run', libId: 'ad_flying_sprint', name: t('٣٠م طاير', '30m fly'), sets: 1, reps: '4', distance: '30m', time: '2.85-2.95s', intensity: '97', basis: 'vmax', rest: '5min', restType: 'walk', purpose: t('تحفيز السرعة القصوى', 'Max velocity stimulus'), component: 'max_velocity' },
        { kind: 'run', name: t('حواجز سريعة: ٦ حواجز بمسافة أقل ٣٠-٥٠سم', 'Speed hurdles: 6 hurdles, spacing reduced by 30-50 cm'), sets: 2, reps: '3', distance: '55m', intensity: '100', basis: 'vmax', rest: '4min', restType: 'walk', setRest: '8min', purpose: t('إيقاع أسرع من السباق (أقل من ١.٠٠ث بين الحواجز)', 'Faster-than-race rhythm (under 1.00 s per interval)'), component: 'technique', note: t('ارتفاع أقل درجة من الرسمي', 'One height setting below official') },
        { kind: 'run', libId: 'ad_wicket_run', sets: 1, reps: '3', distance: '40m', intensity: '90', basis: 'vmax', rest: '4min', restType: 'walk', purpose: t('ميكانيكا جري عالية بين الحواجز', 'Tall front-side mechanics between hurdles'), component: 'max_velocity' },
        ...sprintCD()
      ]
    },
    sh_se: {
      title: t('تحمل الإيقاع (١٠-١٢ حاجز)', 'Rhythm endurance (10-12 hurdles)'),
      goal: t('الحفاظ على إيقاع ٣ خطوات والتكنيك في آخر ٣ حواجز تحت التعب.', 'Hold 3-step rhythm and technique through the last 3 hurdles under fatigue.'),
      components: ['speed_endurance', 'technique'],
      rpe: 9, duration: 95,
      items: [
        ...hurdleWU(),
        { kind: 'run', name: t('بلوك إلى ١٢ حاجز (مسافة مخففة)', 'Blocks over 12 hurdles (reduced spacing)'), sets: 1, reps: '3', distance: '120m', intensity: '93-95', basis: 'best', rest: '10min', restType: 'walk', purpose: t('تحمل إيقاع أطول من السباق', 'Rhythm endurance beyond race length'), component: 'speed_endurance', note: t('مسافة أقل ٢٠-٣٠سم وارتفاع أقل درجة', 'Spacing reduced 20-30 cm, one height setting lower') },
        { kind: 'run', name: t('١٥٠م جري مسطح', '150m flat'), sets: 1, reps: '2', distance: '150m', time: '16.4-16.8s', intensity: '92', basis: 'best', rest: '10min', restType: 'walk', purpose: t('تحمل سرعة عام', 'General speed endurance'), component: 'speed_endurance' },
        ...sprintCD()
      ]
    },
    sh_race_model: {
      title: t('نموذج السباق (١٠ حواجز)', 'Race model (10 hurdles)'),
      goal: t('جري السباق كامل بالارتفاع والمسافة الرسمية وتوقيت كل حاجز.', 'Run the full race at official height and spacing with split timing per hurdle.'),
      components: ['technique', 'speed_endurance', 'mental'],
      rpe: 9, duration: 95,
      items: [
        ...hurdleWU(),
        { kind: 'run', name: t('بلوك إلى ٥ حواجز', 'Blocks over 5 hurdles'), sets: 1, reps: '2', distance: '50m', time: '6.55-6.70s', intensity: '98', basis: 'best', rest: '8min', restType: 'walk', purpose: t('تسارع وإيقاع بالسرعة الكاملة', 'Acceleration and rhythm at full speed'), component: 'technique' },
        { kind: 'run', name: t('سباق كامل ١١٠م حواجز (١٠٠م سيدات)', 'Full 110mH race run (100mH women)'), sets: 1, reps: '2', distance: '110m', time: '13.7-14.0s', intensity: '97-100', basis: 'best', rest: '15min', restType: 'passive', purpose: t('تنفيذ السباق كامل بتوقيت', 'Execute the full race under timing'), component: 'speed_endurance', note: t('صوّر السباق وقارن أزمنة الهبوط', 'Film it and compare touchdown splits') },
        ...sprintCD()
      ]
    },
    sh_primer: {
      title: t('تنشيط قبل السباق', 'Pre-race primer'),
      goal: t('تأكيد الاقتراب للحاجز الأول والإيقاع بحجم قليل جدًا.', 'Confirm the approach to hurdle 1 and rhythm with very low volume.'),
      components: ['acceleration', 'technique', 'mental'],
      rpe: 4, duration: 45,
      items: [
        ...hurdleWU(),
        { kind: 'run', name: t('بلوك إلى حاجزين', 'Blocks over 2 hurdles'), sets: 1, reps: '3', distance: '25m', intensity: '95', basis: 'vmax', rest: '4min', restType: 'walk', purpose: t('تنشيط وتأكيد عدد الخطوات', 'Activation and step-count confirmation'), component: 'technique' },
        { kind: 'run', name: t('بلوك إلى ٥ حواجز', 'Blocks over 5 hurdles'), sets: 1, reps: '1', distance: '50m', intensity: '95', basis: 'vmax', rest: '6min', restType: 'walk', purpose: t('إحساس الإيقاع قبل السباق', 'Rhythm feel before racing'), component: 'technique' },
        ...sprintCD()
      ]
    },
    sh_race: {
      title: t('يوم السباق — حواجز', 'Race day — hurdles'),
      goal: t('روتين سباق ثابت وسباق بتركيز على الحاجز الأول والإيقاع.', 'A consistent race routine and a race focused on hurdle 1 and rhythm.'),
      components: ['technique', 'acceleration', 'mental'],
      rpe: 9, duration: 120,
      items: [
        ...hurdleWU(),
        { kind: 'run', name: t('بدايات على ١-٢ حاجز', 'Starts over 1-2 hurdles'), sets: 1, reps: '3', distance: '25m', intensity: '95', basis: 'vmax', rest: '4min', restType: 'walk', purpose: t('تنشيط أخير قبل النداء', 'Final activation before the call room'), component: 'acceleration' },
        { kind: 'run', name: t('السباق (تصفيات + نهائي)', 'Race (heat + final)'), sets: 1, reps: '1-2', distance: '110m', intensity: '100', basis: 'best', rest: '60-120min', restType: 'passive', purpose: t('أحسن زمن في السباق', 'Best time of the meet'), component: 'technique', note: t('السيدات ١٠٠م', 'Women 100 m') },
        M('تهدئة وإطالات بعد السباق', 'Post-race cool-down and stretching', { duration: '15min' })
      ]
    },
    sh_drills: sprTempo('hurdle'),
    sh_gen_str: sprGenStr('adv'),
    sh_max_str: sprMaxStr('adv'),
    sh_power: sprPower('adv'),
    sh_maint: sprMaint(),
    sh_plyo_gen: sprPlyoGen(),
    sh_plyo: sprPlyo()
  }
};

/* =============================================================================
 * ٦) ٨٠٠م — متقدم (١٨ أسبوع)
 * ============================================================================= */
const T_800_ADV = {
  id: 'pt_middle_800m_adv',
  sport: 'middle_dist',
  level: 'advanced',
  title: t('٨٠٠م — متقدم (موسم ١٨ أسبوع)', '800m — advanced (18-week season)'),
  goal: t('رفع السرعة الهوائية القصوى (vVO2max) واحتياطي السرعة معًا، وبناء التحمل الخاص وتحمل اللاكتيك لسرعة السباق، مع خطة توزيع ٢٠٠م بـ٢٠٠م.', 'Raise both maximal aerobic speed (vVO2max) and speed reserve, and build special endurance and lactate tolerance at race pace, with a 200-by-200 m pacing plan.'),
  components: ['aerobic', 'vo2max', 'special_endurance', 'anaerobic', 'max_velocity'],
  sessionsPerWeek: 7,
  periods: [
    {
      type: 'gpp',
      goal: t('قاعدة هوائية (جري سهل وطويل وعتبة)، طلعات، فارتلك، قوة عامة، وبليومتري خفيف.', 'Aerobic base (easy, long and threshold running), hills, fartlek, general strength and light plyometrics.'),
      components: ['aerobic', 'threshold', 'strength', 'muscular_endurance'],
      blocks: [
        {
          name: t('بلوك ١ — اختبارات ودخول', 'Block 1 — Testing & entry'),
          goal: t('قياس ٣٠م طاير و٣٠٠م (سرعة) و٣٠٠٠م (هوائي) لتحديد سرعات التدريب.', 'Measure 30m fly and 300m (speed) and 3000m (aerobic) to set training paces.'),
          components: ['max_velocity', 'special_endurance', 'vo2max'],
          loads: [4], weekTypes: ['test'],
          pattern: ['s8_test', 's8_easy', 's8_str', 's8_easy', '', 's8_test_aer', 's8_long']
        },
        {
          name: t('بلوك ٢ — قاعدة هوائية', 'Block 2 — Aerobic base'),
          goal: t('طلعات ٢٠٠م، عتبة ٥×١٠٠٠م، فارتلك، وجري طويل ٦٠-٧٥ دقيقة.', '200m hills, 5x1000m threshold, fartlek and a 60-75 min long run.'),
          components: ['aerobic', 'threshold', 'muscular_endurance', 'strength'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['s8_hills', 's8_easy', 's8_str', 's8_thresh', 's8_plyo', 's8_fartlek', 's8_long']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('VO2max بتكرارات ٨٠٠م، سرعة واحتياطي سرعة، ثم تحمل خاص (٦٠٠م) وتحمل لاكتيك (٣٠٠م براحة قصيرة).', 'VO2max via 800 m reps, speed and speed reserve, then special endurance (600 m) and lactate tolerance (300 m short rest).'),
      components: ['vo2max', 'max_velocity', 'special_endurance', 'anaerobic'],
      blocks: [
        {
          name: t('بلوك ٣ — VO2max وسرعة', 'Block 3 — VO2max & speed'),
          goal: t('٦×٨٠٠م على سرعة ٣٠٠٠م، سرعة ٦٠م و١٥٠م، وعتبة.', '6x800m at 3000m pace, 60m and 150m speed, and threshold.'),
          components: ['vo2max', 'max_velocity', 'threshold'],
          loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['s8_vo2', 's8_easy', 's8_str', 's8_speed', 's8_easy', 's8_thresh', 's8_long']
        },
        {
          name: t('بلوك ٤ — تحمل خاص ولاكتيك', 'Block 4 — Special endurance & lactate'),
          goal: t('٣×٦٠٠م على سرعة قريبة من السباق، ٢×٣×٣٠٠م براحة دقيقة، وسرعة.', '3x600m near race pace, 2x3x300m with 1-min rest, and speed.'),
          components: ['special_endurance', 'anaerobic', 'max_velocity'],
          loads: [7, 8, 5], weekTypes: ['load', 'shock', 'deload'],
          pattern: ['s8_special', 's8_easy', 's8_str', 's8_lactate', 's8_easy', 's8_speed', 's8_long']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('إعادة الاختبار وتدريب سرعة السباق وتوزيعه (٨٠٠م مقسمة) مع الحفاظ على VO2max.', 'Retest and train race pace and distribution (broken 800s) while maintaining VO2max.'),
      components: ['special_endurance', 'tactics', 'vo2max', 'mental'],
      blocks: [
        {
          name: t('بلوك ٥ — أسبوع اختبارات', 'Block 5 — Testing week'),
          goal: t('إعادة ٣٠م طاير و٣٠٠م لتأكيد احتياطي السرعة وضبط خطة السباق.', 'Repeat 30m fly and 300m to confirm speed reserve and set the race plan.'),
          components: ['max_velocity', 'special_endurance'],
          loads: [4], weekTypes: ['test'],
          pattern: ['s8_test', 's8_easy', 's8_str_m', 's8_thresh', 's8_easy', '', 's8_long']
        },
        {
          name: t('بلوك ٦ — سرعة السباق', 'Block 6 — Race pace'),
          goal: t('٨٠٠م مقسمة (٥٠٠+٣٠٠م) على سرعة السباق، سرعة، وVO2max للحفاظ.', 'Broken 800s (500+300 m) at race pace, speed, and VO2max maintenance.'),
          components: ['special_endurance', 'tactics', 'vo2max', 'max_velocity'],
          loads: [7, 6], weekTypes: ['load', 'load'],
          pattern: ['s8_race_pace', 's8_easy', 's8_str_m', 's8_speed', 's8_easy', 's8_vo2', 's8_long']
        }
      ]
    },
    {
      type: 'comp',
      goal: t('التسابق كل أسبوع مع تمرينة خاصة واحدة وجري سهل للحفاظ على القاعدة.', 'Race weekly with one specific session and easy running to keep the base.'),
      components: ['special_endurance', 'max_velocity', 'mental'],
      blocks: [
        {
          name: t('بلوك ٧ — منافسات', 'Block 7 — Competition'),
          goal: t('تحمل خاص مخفّض، سرعة، قوة للحفاظ، وسباق آخر الأسبوع.', 'Reduced special endurance, speed, maintenance strength and a weekend race.'),
          components: ['special_endurance', 'max_velocity', 'mental'],
          loads: [6, 5], weekTypes: ['comp', 'comp'],
          pattern: ['s8_special', 's8_easy', 's8_str_m', 's8_speed', 's8_easy', 's8_primer', 's8_race']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('تهدئة: حجم أقل ٤٠-٥٠٪ مع لمسات سرعة سباق قليلة.', 'Taper: 40-50% less volume with a few race-pace touches.'),
      components: ['special_endurance', 'recovery', 'mental'],
      blocks: [
        {
          name: t('بلوك ٨ — أسبوع البطولة', 'Block 8 — Championship week'),
          goal: t('رجلين فريش وإحساس سرعة السباق يوم البطولة.', 'Fresh legs and a sharp race-pace feel on championship day.'),
          components: ['special_endurance', 'recovery', 'mental'],
          loads: [3], weekTypes: ['taper'],
          pattern: ['s8_race_pace', 's8_easy', 's8_str_m', 's8_easy', '', 's8_primer', 's8_race']
        }
      ]
    }
  ],
  sessions: {
    s8_test: {
      title: t('اختبار السرعة (٣٠م طاير + ٣٠٠م)', 'Speed test (30m fly + 300m)'),
      goal: t('قياس احتياطي السرعة والتحمل الخاص لتحديد أزمنة تكرارات ٢٠٠-٦٠٠م.', 'Measure speed reserve and special endurance to set 200-600 m rep times.'),
      components: ['max_velocity', 'special_endurance'],
      rpe: 9, duration: 90,
      items: [
        ...sprintWU(true),
        { kind: 'run', libId: 'ad_flying_sprint', name: t('٣٠م طاير', '30m fly'), sets: 1, reps: '2', distance: '30m', time: '3.05-3.20s', intensity: '100', basis: 'vmax', rest: '6min', restType: 'walk', purpose: t('قياس السرعة القصوى (احتياطي السرعة)', 'Measure top speed (speed reserve)'), component: 'max_velocity' },
        { kind: 'run', name: t('٣٠٠م اختبار زمن', '300m time trial'), sets: 1, reps: '1', distance: '300m', time: '35.5-37.0s', intensity: '100', basis: 'best', rest: '20min', restType: 'walk', purpose: t('قياس التحمل الخاص والسرعة اللاهوائية', 'Measure special endurance and anaerobic speed'), component: 'special_endurance' },
        ...runCD()
      ]
    },
    s8_test_aer: {
      title: t('اختبار هوائي (٣٠٠٠م)', 'Aerobic test (3000m)'),
      goal: t('قياس السرعة الهوائية لحساب سرعات العتبة وVO2max.', 'Measure aerobic speed to set threshold and VO2max paces.'),
      components: ['vo2max', 'aerobic'],
      rpe: 9, duration: 70,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('٣٠٠٠م اختبار زمن', '3000m time trial'), sets: 1, reps: '1', distance: '3000m', time: '8:20-8:45', intensity: '100', basis: 'best', rest: '15min', restType: 'walk', purpose: t('تحديد سرعة ٣ كم كمرجع لتكرارات VO2max', 'Establish 3 km pace as the VO2max reference'), component: 'vo2max', note: t('توزيع متساوي، آخر ٤٠٠م مفتوح', 'Even pacing, last 400 m open') },
        ...runCD()
      ]
    },
    s8_easy: easyRun({ dur: '40-50min', dist: '10-12km', duration: 60, strides: 6, note: t('سرعة مرجعية ٤:٠٠-٤:٣٠ د/كم', 'Reference pace 4:00-4:30 min/km') }),
    s8_long: longRun({ dur: '60-75min', dist: '14-17km', duration: 85, note: t('سرعة مرجعية ٣:٥٠-٤:١٥ د/كم؛ آخر ١٠ دقايق ممكن تبقى أسرع شوية', 'Reference pace 3:50-4:15 min/km; the last 10 min may be slightly quicker') }),
    s8_hills: {
      title: t('طلعات ٢٠٠م + طلعات قصيرة', '200m hills + short hill sprints'),
      goal: t('قوة خاصة بالجري وتحمل عضلي وقدرة بحمل أقل على الأوتار.', 'Running-specific strength, muscular endurance and power with less tendon stress.'),
      components: ['muscular_endurance', 'vo2max', 'power'],
      rpe: 8, duration: 80,
      items: [
        ...runWU(true),
        { kind: 'run', libId: 'ad_hill_repeats', name: t('طلعات ٢٠٠م', '200m hill repeats'), sets: 1, reps: '10', distance: '200m', intensity: '8', basis: 'rpe', rest: '2min', restType: 'jog', purpose: t('قوة وتحمل عضلي بتكنيك دفع قوي', 'Strength endurance with a strong drive'), component: 'muscular_endurance', note: t('طلعة ٥-٦٪، النزول جري خفيف', '5-6% hill, easy jog down') },
        { kind: 'run', libId: 'ad_hill_sprint', sets: 1, reps: '6', distance: '60m', intensity: '10', basis: 'rpe', rest: '2min', restType: 'walk', purpose: t('قدرة وتجنيد ألياف سريعة', 'Power and fast-twitch recruitment'), component: 'power' },
        ...runCD()
      ]
    },
    s8_thresh: {
      title: t('عتبة (كروز ١٠٠٠م)', 'Threshold (1000m cruise)'),
      goal: t('رفع سرعة العتبة اللاكتيكية عشان سرعة الاختبار تبقى أسهل نسبيًا.', 'Raise lactate-threshold speed so race-specific paces feel relatively easier.'),
      components: ['threshold', 'aerobic'],
      rpe: 7, duration: 70,
      items: [
        ...runWU(true),
        { kind: 'run', libId: 'ad_threshold_cruise_intervals', sets: 1, reps: '5', distance: '1000m', time: '3:05-3:12', intensity: 'Z4', basis: 'hr', rest: '60s', restType: 'jog', purpose: t('وقت أطول على العتبة بدون تعب زايد', 'More time at threshold without excess fatigue'), component: 'threshold', note: t('مريح لكن صعب؛ لاكتيك ٣-٤ مل مول لو متاح', 'Comfortably hard; 3-4 mmol lactate if available') },
        ...runCD()
      ]
    },
    s8_fartlek: {
      title: t('فارتلك', 'Fartlek'),
      goal: t('تغيير سرعات بشكل طبيعي لتحسين الهوائي والعتبة وتحمل التغيير.', 'Natural speed changes to develop aerobic, threshold and surge tolerance.'),
      components: ['aerobic', 'threshold', 'vo2max'],
      rpe: 7, duration: 65,
      items: [
        W('جري سهل', 'Easy jog', { duration: '15min', intensity: 'Z2', basis: 'hr' }),
        { kind: 'run', libId: 'dr_fartlek', duration: '30min', intensity: '7-8', basis: 'rpe', purpose: t('١٠ × (٢ دقيقة سرعة ٥ كم / ١ دقيقة سهل)', '10 x (2 min at 5k effort / 1 min easy)'), component: 'vo2max', note: t('على نجيل أو طريق ترابي', 'On grass or a dirt trail') },
        ...runCD()
      ]
    },
    s8_plyo: {
      title: t('جري سهل + بليومتري للعدائين', 'Easy run + runner plyometrics'),
      goal: t('صلابة الكاحل والوتر لتحسين اقتصاد الجري بجانب حجم هوائي سهل.', 'Ankle and tendon stiffness to improve running economy alongside easy aerobic volume.'),
      components: ['power', 'aerobic', 'coordination'],
      rpe: 5, duration: 60,
      items: [
        { kind: 'run', libId: 'ad_zone_2_easy_run', duration: '30min', intensity: 'Z2', basis: 'hr', purpose: t('حجم هوائي سهل', 'Easy aerobic volume'), component: 'aerobic' },
        { kind: 'drill', libId: 'ad_pogo_hop', sets: 3, reps: '20', rest: '60s', purpose: t('صلابة الكاحل', 'Ankle stiffness'), component: 'power' },
        { kind: 'drill', libId: 'ad_power_skip', sets: 3, reps: '1', distance: '30m', rest: '60s', purpose: t('قدرة وتوافق الدراعين والرجلين', 'Power and arm-leg coordination'), component: 'coordination' },
        { kind: 'drill', libId: 'ad_alternate_leg_bound', sets: 4, reps: '1', distance: '30m', rest: '90s', purpose: t('قوة الدفع الأفقي', 'Horizontal push strength'), component: 'power' },
        { kind: 'drill', libId: 'dr_hurdle_hops', sets: 3, reps: '5', rest: '90s', purpose: t('ارتداد سريع', 'Quick rebounds'), component: 'power', note: t('حواجز ٥٠-٦٠سم', '50-60 cm hurdles') },
        ...runCD()
      ]
    },
    s8_vo2: {
      title: t('VO2max (٨٠٠م تكرارات)', 'VO2max (800m reps)'),
      goal: t('رفع الحد الأقصى لاستهلاك الأكسجين والسرعة الهوائية القصوى.', 'Raise maximal oxygen uptake and maximal aerobic speed.'),
      components: ['vo2max', 'aerobic'],
      rpe: 8, duration: 80,
      items: [
        ...runWU(true),
        { kind: 'run', libId: 'ex_interval_running', name: t('٨٠٠م على سرعة ٣٠٠٠م', '800m at 3000m pace'), sets: 1, reps: '6', distance: '800m', time: '2:12-2:17', intensity: 'Z5', basis: 'hr', rest: '2min', restType: 'jog', purpose: t('وقت طويل قريب من VO2max', 'Extended time near VO2max'), component: 'vo2max', note: t('جري ٢٠٠م خفيف بين التكرارات', 'Jog 200 m between reps') },
        ...runCD()
      ]
    },
    s8_speed: {
      title: t('سرعة واحتياطي سرعة', 'Speed & speed reserve'),
      goal: t('رفع السرعة القصوى عشان سرعة الـ٨٠٠م تبقى نسبة أقل منها.', 'Raise top speed so 800 m pace becomes a lower percentage of it.'),
      components: ['max_velocity', 'acceleration', 'speed_endurance'],
      rpe: 7, duration: 75,
      items: [
        ...sprintWU(true),
        { kind: 'run', libId: 'dr_sprint_accel', name: t('٦٠م تسارع', '60m accelerations'), sets: 2, reps: '3', distance: '60m', intensity: '95', basis: 'vmax', rest: '3min', restType: 'walk', setRest: '6min', purpose: t('سرعة وتجنيد ألياف سريعة', 'Speed and fast-twitch recruitment'), component: 'max_velocity' },
        { kind: 'run', name: t('١٥٠م سريع مسترخي', '150m relaxed-fast'), sets: 1, reps: '3', distance: '150m', time: '17.5-18.0s', intensity: '90', basis: 'best', rest: '5min', restType: 'walk', purpose: t('سرعة عالية باسترخاء واقتصاد', 'High speed with relaxation and economy'), component: 'speed_endurance' },
        ...runCD()
      ]
    },
    s8_special: {
      title: t('تحمل خاص (٦٠٠م)', 'Special endurance (600m)'),
      goal: t('تحمل خاص بالـ٨٠٠م: ٦٠٠م على سرعة قريبة من السباق براحة كاملة.', '800 m special endurance: 600 m near race pace with full recovery.'),
      components: ['special_endurance', 'anaerobic'],
      rpe: 9, duration: 90,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('٦٠٠م تحمل خاص', '600m special endurance'), sets: 1, reps: '3', distance: '600m', time: '1:24-1:27', intensity: '95-97', basis: 'best', rest: '10min', restType: 'walk', purpose: t('الحفاظ على سرعة السباق تحت تعب لاكتيكي عالي', 'Hold race pace under high lactic fatigue'), component: 'special_endurance', note: t('في المنافسات: ٢ تكرار بس', 'In competition weeks: 2 reps only') },
        ...runCD()
      ]
    },
    s8_lactate: {
      title: t('تحمل لاكتيك (٢×٣×٣٠٠م)', 'Lactate tolerance (2x3x300m)'),
      goal: t('تحمل حموضة عالية على سرعة السباق براحة قصيرة.', 'Tolerate high acidity at race pace with short rest.'),
      components: ['anaerobic', 'special_endurance'],
      rpe: 10, duration: 85,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('٣٠٠م على سرعة السباق', '300m at race pace'), sets: 2, reps: '3', distance: '300m', time: '40-41s', intensity: '97', basis: 'best', rest: '60s', restType: 'walk', setRest: '10min', purpose: t('تحمل لاكتيك وتثبيت إحساس سرعة السباق', 'Lactate tolerance and locking in race-pace feel'), component: 'anaerobic', note: t('لو الزمن زاد عن ٤٢ث أنهِ المجموعة', 'End the set if a rep exceeds 42 s') },
        ...runCD()
      ]
    },
    s8_race_pace: {
      title: t('٨٠٠م مقسمة (٥٠٠+٣٠٠م)', 'Broken 800 (500+300m)'),
      goal: t('تدريب توزيع السباق على سرعة الهدف (١٣.٧٥ث لكل ١٠٠م تقريبًا لـ١:٥٠).', 'Rehearse race distribution at goal pace (about 13.75 s per 100 m for 1:50).'),
      components: ['special_endurance', 'tactics', 'mental'],
      rpe: 9, duration: 85,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('٥٠٠م على سرعة السباق', '500m at race pace'), sets: 2, reps: '1', distance: '500m', time: '68-69s', intensity: '98', basis: 'best', rest: '60s', restType: 'walk', setRest: '20min', purpose: t('أول ٥٠٠م بتوزيع السباق (أول ٢٠٠م ٢٦.٥-٢٧ث)', 'First 500 m on race distribution (first 200 m 26.5-27 s)'), component: 'tactics' },
        { kind: 'run', name: t('٣٠٠م بعد دقيقة راحة', '300m after 1-minute break'), sets: 2, reps: '1', distance: '300m', time: '40-41s', intensity: '98', basis: 'best', rest: '20min', restType: 'walk', purpose: t('محاكاة آخر ٣٠٠م تحت تعب حقيقي', 'Simulate the last 300 m under real fatigue'), component: 'special_endurance' },
        ...runCD()
      ]
    },
    s8_primer: {
      title: t('تنشيط قبل السباق', 'Pre-race primer'),
      goal: t('تنشيط وإحساس سرعة السباق بدون أي تعب.', 'Activation and race-pace feel without fatigue.'),
      components: ['special_endurance', 'mental'],
      rpe: 4, duration: 45,
      items: [
        ...runWU(false),
        { kind: 'run', name: t('٢٠٠م على سرعة السباق', '200m at race pace'), sets: 1, reps: '2', distance: '200m', time: '27-28s', intensity: '95', basis: 'best', rest: '5min', restType: 'walk', purpose: t('إحساس سرعة السباق', 'Race-pace feel'), component: 'special_endurance' },
        { kind: 'run', libId: 'ad_strides', sets: 1, reps: '3', distance: '60m', intensity: '90', basis: 'vmax', rest: '90s', restType: 'walk', purpose: t('تنشيط عصبي', 'Neural activation'), component: 'max_velocity' },
        ...runCD()
      ]
    },
    s8_race: {
      title: t('يوم السباق — ٨٠٠م', 'Race day — 800m'),
      goal: t('روتين إحماء ثابت وسباق بخطة توزيع واضحة ومكان جيد في الدورة الأولى.', 'A consistent warm-up routine and a race with a clear pacing plan and good position on lap one.'),
      components: ['special_endurance', 'tactics', 'mental'],
      rpe: 10, duration: 90,
      items: [
        ...runWU(true),
        { kind: 'run', libId: 'ad_strides', name: t('تسارعات قبل النداء', 'Pre-call strides'), sets: 1, reps: '3', distance: '80m', intensity: '90-95', basis: 'vmax', rest: '2min', restType: 'walk', purpose: t('تنشيط أخير', 'Final activation'), component: 'max_velocity' },
        { kind: 'run', name: t('السباق ٨٠٠م', '800m race'), sets: 1, reps: '1', distance: '800m', intensity: '100', basis: 'best', rest: '15min', restType: 'walk', purpose: t('أحسن زمن: فرق الدورتين أقل من ٢-٣ ثواني', 'Best time: lap differential under 2-3 s'), component: 'special_endurance', note: t('أول ٢٠٠م سريعة ومسترخية، ثبّت المكان، الهجوم من ٢٠٠م الأخيرة', 'Fast relaxed first 200 m, hold position, attack from 200 m out') },
        ...runCD()
      ]
    },
    s8_str: mdStr('adv'),
    s8_str_m: runStrMaint()
  }
};

/* =============================================================================
 * ٧) ١٥٠٠م — متوسط (١٦ أسبوع)
 * ============================================================================= */
const T_1500_INT = {
  id: 'pt_middle_1500m_int',
  sport: 'middle_dist',
  level: 'intermediate',
  title: t('١٥٠٠م — متوسط (موسم ١٦ أسبوع)', '1500m — intermediate (16-week season)'),
  goal: t('بناء قاعدة هوائية وعتبة قوية، رفع VO2max، وتعلم سرعة السباق (٦٨ث لكل ٤٠٠م تقريبًا لـ٤:١٥) مع كيك نهائي في آخر ٣٠٠م.', 'Build a strong aerobic and threshold base, raise VO2max, and learn race pace (about 68 s per 400 m for 4:15) with a final kick over the last 300 m.'),
  components: ['aerobic', 'threshold', 'vo2max', 'special_endurance', 'speed'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: t('قاعدة هوائية (جري سهل وطويل)، طلعات، فارتلك، عتبة، وقوة عامة.', 'Aerobic base (easy and long running), hills, fartlek, threshold and general strength.'),
      components: ['aerobic', 'threshold', 'strength', 'muscular_endurance'],
      blocks: [
        {
          name: t('بلوك ١ — اختبار ودخول', 'Block 1 — Testing & entry'),
          goal: t('اختبار ١٦٠٠م لتحديد سرعات التدريب وبداية الحجم الهوائي.', '1600m time trial to set training paces and start aerobic volume.'),
          components: ['vo2max', 'aerobic'],
          loads: [4], weekTypes: ['test'],
          pattern: ['s15_test', 's15_easy', 's15_str', 's15_easy', '', 's15_fartlek', 's15_long']
        },
        {
          name: t('بلوك ٢ — قاعدة هوائية', 'Block 2 — Aerobic base'),
          goal: t('طلعات ٦٠ث، عتبة ٥×١٠٠٠م، فارتلك، وجري طويل ٦٠-٧٠ دقيقة.', '60s hills, 5x1000m threshold, fartlek and a 60-70 min long run.'),
          components: ['aerobic', 'threshold', 'muscular_endurance'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['s15_hills', 's15_easy', 's15_str', 's15_thresh', '', 's15_fartlek', 's15_long']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('VO2max بتكرارات ١٠٠٠م، عتبة، وسرعة بتكرارات ٣٠٠م على سرعة ٨٠٠م.', 'VO2max via 1000 m reps, threshold, and speed with 300 m reps at 800 m pace.'),
      components: ['vo2max', 'threshold', 'speed', 'aerobic'],
      blocks: [
        {
          name: t('بلوك ٣ — VO2max وسرعة', 'Block 3 — VO2max & speed'),
          goal: t('٥×١٠٠٠م على سرعة ٣ كم، عتبة، و٢×٤×٣٠٠م على سرعة ٨٠٠م.', '5x1000m at 3k pace, threshold, and 2x4x300m at 800m pace.'),
          components: ['vo2max', 'threshold', 'speed'],
          loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['s15_vo2', 's15_easy', 's15_str', 's15_thresh', '', 's15_rep', 's15_long']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('إعادة الاختبار، سرعة السباق (٤٠٠م على سرعة ١٥٠٠م براحة قصيرة)، وسرعة للكيك النهائي.', 'Retest, race pace (400 m at 1500 m pace with short rest) and speed for the final kick.'),
      components: ['special_endurance', 'vo2max', 'speed', 'tactics'],
      blocks: [
        {
          name: t('بلوك ٤ — أسبوع اختبار', 'Block 4 — Testing week'),
          goal: t('إعادة ١٦٠٠م ومقارنة الزمن لتحديد هدف السباق.', 'Repeat the 1600m and compare to set the race target.'),
          components: ['vo2max', 'special_endurance'],
          loads: [4], weekTypes: ['test'],
          pattern: ['s15_test', 's15_easy', 's15_str_m', 's15_easy', '', 's15_rep', 's15_long']
        },
        {
          name: t('بلوك ٥ — سرعة السباق', 'Block 5 — Race pace'),
          goal: t('٣×٣×٤٠٠م على سرعة السباق، VO2max، وسرعة.', '3x3x400m at race pace, VO2max and speed.'),
          components: ['special_endurance', 'vo2max', 'speed'],
          loads: [7, 6], weekTypes: ['load', 'load'],
          pattern: ['s15_special', 's15_easy', 's15_str_m', 's15_vo2', '', 's15_rep', 's15_long']
        }
      ]
    },
    {
      type: 'comp',
      goal: t('التسابق أسبوعيًا مع تمرينة سرعة سباق وجري سهل للحفاظ على القاعدة.', 'Race weekly with one race-pace session and easy running to keep the base.'),
      components: ['special_endurance', 'speed', 'tactics', 'mental'],
      blocks: [
        {
          name: t('بلوك ٦ — منافسات', 'Block 6 — Competition'),
          goal: t('تمرينة خاصة مخففة، سرعة قصيرة، وسباق ١٥٠٠م أو ٨٠٠م آخر الأسبوع.', 'A reduced specific session, short speed and a 1500m or 800m race at the weekend.'),
          components: ['special_endurance', 'speed', 'mental'],
          loads: [6, 5, 6], weekTypes: ['comp', 'comp', 'comp'],
          pattern: ['s15_special', 's15_easy', 's15_str_m', 's15_rep', '', 's15_primer', 's15_race']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('تهدئة: حجم أقل ٤٠٪ مع الحفاظ على لمسات سرعة السباق.', 'Taper: 40% less volume while keeping race-pace touches.'),
      components: ['special_endurance', 'recovery', 'mental'],
      blocks: [
        {
          name: t('بلوك ٧ — أسبوع البطولة', 'Block 7 — Championship week'),
          goal: t('رجلين فريش وثقة في خطة السباق.', 'Fresh legs and confidence in the race plan.'),
          components: ['special_endurance', 'recovery', 'mental'],
          loads: [3], weekTypes: ['taper'],
          pattern: ['s15_rep', 's15_easy', '', 's15_easy', '', 's15_primer', 's15_race']
        }
      ]
    }
  ],
  sessions: {
    s15_test: {
      title: t('اختبار ١٦٠٠م', '1600m time trial'),
      goal: t('قياس المستوى الحالي وتحديد سرعات العتبة وVO2max وسرعة السباق.', 'Measure current fitness and set threshold, VO2max and race paces.'),
      components: ['vo2max', 'special_endurance'],
      rpe: 9, duration: 65,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('١٦٠٠م اختبار زمن', '1600m time trial'), sets: 1, reps: '1', distance: '1600m', time: '4:35-4:50', intensity: '100', basis: 'best', rest: '15min', restType: 'walk', purpose: t('مرجع لكل سرعات الموسم', 'Reference for all season paces'), component: 'vo2max', note: t('سجل كل ٤٠٠م؛ زمن ١٥٠٠م المتوقع تقريبًا = زمن ١٦٠٠م × ٠.٩٣', 'Record each 400 m; predicted 1500 m is about 1600 m time x 0.93') },
        ...runCD()
      ]
    },
    s15_easy: easyRun({ dur: '40-50min', dist: '8-10km', duration: 60, strides: 6, note: t('سرعة مرجعية ٤:٣٠-٥:٠٠ د/كم', 'Reference pace 4:30-5:00 min/km') }),
    s15_long: longRun({ dur: '60-70min', dist: '12-14km', duration: 80, note: t('سرعة مرجعية ٤:٣٠-٤:٥٠ د/كم', 'Reference pace 4:30-4:50 min/km') }),
    s15_hills: {
      title: t('طلعات ٦٠ ثانية', '60-second hills'),
      goal: t('قوة خاصة بالجري وVO2max بحمل أقل على الأوتار.', 'Running-specific strength and VO2max with less tendon stress.'),
      components: ['muscular_endurance', 'vo2max', 'power'],
      rpe: 8, duration: 70,
      items: [
        ...runWU(true),
        { kind: 'run', libId: 'ad_hill_repeats', name: t('طلعات ٦٠ ثانية', '60-second hill repeats'), sets: 1, reps: '8', duration: '60s', intensity: '8', basis: 'rpe', rest: '2min', restType: 'jog', purpose: t('تحمل عضلي وقوة دفع', 'Muscular endurance and drive strength'), component: 'muscular_endurance', note: t('طلعة ٥-٧٪ بمجهود سرعة ٥ كم، النزول جري خفيف', '5-7% hill at 5k effort, easy jog down') },
        { kind: 'run', libId: 'ad_hill_sprint', sets: 1, reps: '6', distance: '40m', intensity: '10', basis: 'rpe', rest: '2min', restType: 'walk', purpose: t('قدرة وتجنيد ألياف سريعة', 'Power and fast-twitch recruitment'), component: 'power' },
        ...runCD()
      ]
    },
    s15_fartlek: {
      title: t('فارتلك', 'Fartlek'),
      goal: t('تغيير سرعات بشكل طبيعي لتحسين الهوائي وتحمل التغيير.', 'Natural speed changes to develop aerobic fitness and surge tolerance.'),
      components: ['aerobic', 'vo2max'],
      rpe: 6, duration: 60,
      items: [
        W('جري سهل', 'Easy jog', { duration: '15min', intensity: 'Z2', basis: 'hr' }),
        { kind: 'run', libId: 'dr_fartlek', duration: '24min', intensity: '7', basis: 'rpe', purpose: t('١٢ × (١ دقيقة سريع / ١ دقيقة سهل)', '12 x (1 min fast / 1 min easy)'), component: 'vo2max', note: t('السريع على مجهود سرعة ٣-٥ كم', 'Fast sections at 3-5k effort') },
        ...runCD()
      ]
    },
    s15_thresh: {
      title: t('عتبة (كروز ١٠٠٠م)', 'Threshold (1000m cruise)'),
      goal: t('رفع سرعة العتبة اللاكتيكية كأساس لكل السرعات الأعلى.', 'Raise lactate-threshold speed as the base for all faster paces.'),
      components: ['threshold', 'aerobic'],
      rpe: 7, duration: 70,
      items: [
        ...runWU(true),
        { kind: 'run', libId: 'ad_threshold_cruise_intervals', sets: 1, reps: '5', distance: '1000m', time: '3:35-3:42', intensity: 'Z4', basis: 'hr', rest: '60s', restType: 'jog', purpose: t('وقت أطول على العتبة بدون تعب زايد', 'More time at threshold without excess fatigue'), component: 'threshold' },
        ...runCD()
      ]
    },
    s15_vo2: {
      title: t('VO2max (١٠٠٠م تكرارات)', 'VO2max (1000m reps)'),
      goal: t('رفع VO2max والسرعة الهوائية القصوى.', 'Raise VO2max and maximal aerobic speed.'),
      components: ['vo2max', 'aerobic'],
      rpe: 8, duration: 75,
      items: [
        ...runWU(true),
        { kind: 'run', libId: 'ex_interval_running', name: t('١٠٠٠م على سرعة ٣ كم', '1000m at 3k pace'), sets: 1, reps: '5', distance: '1000m', time: '3:08-3:14', intensity: 'Z5', basis: 'hr', rest: '2min', restType: 'jog', purpose: t('وقت طويل قريب من VO2max', 'Extended time near VO2max'), component: 'vo2max' },
        ...runCD()
      ]
    },
    s15_rep: {
      title: t('تكرارات سرعة (٣٠٠م)', 'Speed repetitions (300m)'),
      goal: t('رفع السرعة والاقتصاد على سرعة أعلى من السباق وتحضير الكيك النهائي.', 'Develop speed and economy faster than race pace and prepare the finishing kick.'),
      components: ['speed', 'anaerobic', 'technique'],
      rpe: 8, duration: 70,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('٣٠٠م على سرعة ٨٠٠م', '300m at 800m pace'), sets: 2, reps: '4', distance: '300m', time: '46-48s', intensity: '95', basis: 'best', rest: '2min', restType: 'jog', setRest: '6min', purpose: t('سرعة واقتصاد تحت تعب معتدل', 'Speed and economy under moderate fatigue'), component: 'speed', note: t('في المنافسات والتهدئة: مجموعة واحدة', 'Competition and taper: one set') },
        ...runCD()
      ]
    },
    s15_special: {
      title: t('سرعة السباق (٣×٣×٤٠٠م)', 'Race pace (3x3x400m)'),
      goal: t('تثبيت سرعة السباق وتحملها براحة قصيرة.', 'Lock in race pace and sustain it with short rest.'),
      components: ['special_endurance', 'vo2max', 'tactics'],
      rpe: 9, duration: 80,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('٤٠٠م على سرعة السباق', '400m at race pace'), sets: 3, reps: '3', distance: '400m', time: '67-69s', intensity: '97', basis: 'best', rest: '60s', restType: 'walk', setRest: '4min', purpose: t('إحساس سرعة السباق وتحملها', 'Race-pace feel and tolerance'), component: 'special_endurance', note: t('آخر تكرار في آخر مجموعة: آخر ١٠٠م سريع (كيك)', 'Final rep of the final set: kick the last 100 m') },
        ...runCD()
      ]
    },
    s15_primer: {
      title: t('تنشيط قبل السباق', 'Pre-race primer'),
      goal: t('تنشيط وإحساس سرعة السباق بدون تعب.', 'Activation and race-pace feel without fatigue.'),
      components: ['special_endurance', 'mental'],
      rpe: 4, duration: 40,
      items: [
        ...runWU(false),
        { kind: 'run', name: t('٢٠٠م على سرعة السباق', '200m at race pace'), sets: 1, reps: '3', distance: '200m', time: '33-34s', intensity: '95', basis: 'best', rest: '3min', restType: 'walk', purpose: t('إحساس سرعة السباق', 'Race-pace feel'), component: 'special_endurance' },
        ...runCD()
      ]
    },
    s15_race: {
      title: t('يوم السباق — ١٥٠٠م', 'Race day — 1500m'),
      goal: t('سباق بخطة توزيع واضحة وكيك نهائي من آخر ٣٠٠م.', 'A race with a clear pacing plan and a final kick from 300 m out.'),
      components: ['special_endurance', 'tactics', 'mental'],
      rpe: 10, duration: 85,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('السباق ١٥٠٠م', '1500m race'), sets: 1, reps: '1', distance: '1500m', intensity: '100', basis: 'best', rest: '15min', restType: 'walk', purpose: t('أحسن زمن بتوزيع متساوي', 'Best time with even pacing'), component: 'special_endurance', note: t('أول ٤٠٠م مش أسرع من الهدف بأكتر من ثانية؛ الدورة التالتة هي الأهم', 'First 400 m no more than 1 s faster than target; lap three is the key lap') },
        ...runCD()
      ]
    },
    s15_str: mdStr('int'),
    s15_str_m: runStrMaint()
  }
};

/* =============================================================================
 * ٨) أول ٥ كم — مبتدئ (١٠ أسابيع)
 * ============================================================================= */
const walkCD = () => [
  M('مشي ٥ دقايق للتهدئة', 'Walk 5 min to cool down', { duration: '5min' }),
  ml('ex_calf_stretch', { sets: 2, duration: '30s', note: t('لكل رجل', 'Each leg') }),
  ml('ex_hip_flexor_stretch', { sets: 2, duration: '30s', note: t('لكل رجل', 'Each side') })
];
const T_5K_BEG = {
  id: 'pt_running_5k_beg',
  sport: 'running',
  level: 'beginner',
  title: t('أول ٥ كم — مبتدئ (١٠ أسابيع)', 'First 5k — beginner (10 weeks)'),
  goal: t('الانتقال من المشي والجري المتقطع لجري ٥ كم متواصل بأمان، مع بناء القاعدة الهوائية وتقوية الرجلين للوقاية من إصابات البداية.', 'Progress from run-walk to running 5 km continuously and safely, building the aerobic base and leg strength to prevent beginner injuries.'),
  components: ['aerobic', 'muscular_endurance', 'strength', 'prevention'],
  sessionsPerWeek: 4,
  periods: [
    {
      type: 'gpp',
      goal: t('تعويد الجسم على الجري بالتدريج بطريقة جري-مشي، وتقوية عامة بوزن الجسم.', 'Gradually adapt the body to running with run-walk intervals and bodyweight strength.'),
      components: ['aerobic', 'strength', 'prevention'],
      blocks: [
        {
          name: t('بلوك ١ — تقييم ودخول', 'Block 1 — Assessment & entry'),
          goal: t('اختبار كوبر ١٢ دقيقة (جري ومشي) وتعليم الإحساس بالمجهود (اختبار الكلام).', 'Cooper 12-minute test (run-walk) and learning effort by feel (talk test).'),
          components: ['aerobic'],
          loads: [2], weekTypes: ['test'],
          pattern: ['k5_assess', '', 'k5_str', '', 'k5_rw_a', '', '']
        },
        {
          name: t('بلوك ٢ — جري ومشي', 'Block 2 — Run-walk'),
          goal: t('زيادة وقت الجري وتقليل المشي كل أسبوع، وأسبوع تخفيف في الآخر.', 'Increase running time and reduce walking each week, with a lighter final week.'),
          components: ['aerobic', 'muscular_endurance', 'strength'],
          loads: [3, 4, 5, 3], weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['k5_rw_a', '', 'k5_str', '', 'k5_rw_b', '', 'k5_long_a']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('جري متواصل ٢٥-٤٠ دقيقة وتسريعات خفيفة لتحسين الإيقاع.', 'Continuous running for 25-40 min and light pick-ups to improve rhythm.'),
      components: ['aerobic', 'muscular_endurance', 'threshold'],
      blocks: [
        {
          name: t('بلوك ٣ — جري متواصل', 'Block 3 — Continuous running'),
          goal: t('جري متواصل وتسريعات قصيرة، والجري الطويل يوصل لـ٥ كم.', 'Continuous running and short pick-ups, with the long run reaching 5 km.'),
          components: ['aerobic', 'muscular_endurance', 'threshold'],
          loads: [5, 6, 6, 4], weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['k5_cont', '', 'k5_str', '', 'k5_pickups', '', 'k5_long_b']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('أسبوع خفيف ثم سباق أو اختبار ٥ كم.', 'An easy week then a 5k race or time trial.'),
      components: ['aerobic', 'recovery', 'mental'],
      blocks: [
        {
          name: t('بلوك ٤ — أسبوع السباق', 'Block 4 — Race week'),
          goal: t('رجلين فريش وثقة لإنهاء أول ٥ كم.', 'Fresh legs and confidence to finish the first 5k.'),
          components: ['aerobic', 'recovery', 'mental'],
          loads: [3], weekTypes: ['comp'],
          pattern: ['k5_pickups', '', 'k5_str', '', 'k5_shakeout', '', 'k5_race']
        }
      ]
    }
  ],
  sessions: {
    k5_assess: {
      title: t('تقييم: اختبار كوبر ١٢ دقيقة', 'Assessment: Cooper 12-minute test'),
      goal: t('معرفة نقطة البداية (المسافة في ١٢ دقيقة) عشان نقارن في آخر البرنامج.', 'Find the starting point (distance in 12 min) to compare at the end of the plan.'),
      components: ['aerobic'],
      rpe: 7, duration: 35,
      items: [
        W('مشي سريع + حركات مرونة', 'Brisk walk + mobility moves', { duration: '8min' }),
        { kind: 'run', libId: 'ad_cooper_12_minute_run_test', duration: '12min', intensity: '7', basis: 'rpe', purpose: t('قياس اللياقة الهوائية الحالية', 'Measure current aerobic fitness'), component: 'aerobic', note: t('جري ومشي براحتك؛ المهم أكبر مسافة بدون ما توقف تمامًا. سجل المسافة والنبض بعدها', 'Run and walk as needed; aim for max distance without stopping completely. Record distance and heart rate after') },
        ...walkCD()
      ]
    },
    k5_rw_a: {
      title: t('جري-مشي (فترات قصيرة)', 'Run-walk (short intervals)'),
      goal: t('تعويد القلب والرجلين على الجري بفترات قصيرة ومشي للاستشفاء.', 'Adapt heart and legs to running with short run segments and walking recovery.'),
      components: ['aerobic', 'muscular_endurance'],
      rpe: 4, duration: 40,
      items: [
        W('مشي سريع + حركات مرونة', 'Brisk walk + mobility moves', { duration: '5min' }),
        { kind: 'run', name: t('فترات جري + مشي', 'Run + walk intervals'), sets: 1, reps: '8', duration: '90s', intensity: '4-5', basis: 'rpe', rest: '90s', restType: 'walk', purpose: t('بناء القاعدة الهوائية بدون إجهاد زايد', 'Build the aerobic base without excess strain'), component: 'aerobic', note: t('أسبوع ١: ١ دقيقة جري / ٢ مشي — أسبوع ٢: ١:٣٠ / ١:٣٠ — أسبوع ٣: ٢ / ١ — أسبوع ٤: ٢ / ٢ (تخفيف)', 'Week 1: 1 min run / 2 walk — Week 2: 1:30 / 1:30 — Week 3: 2 / 1 — Week 4: 2 / 2 (deload)') },
        ...walkCD()
      ]
    },
    k5_rw_b: {
      title: t('جري-مشي (فترات أطول)', 'Run-walk (longer intervals)'),
      goal: t('زيادة مدة الجري المتواصل لـ٤-٥ دقايق.', 'Extend continuous running segments to 4-5 min.'),
      components: ['aerobic', 'muscular_endurance'],
      rpe: 5, duration: 45,
      items: [
        W('مشي سريع + حركات مرونة', 'Brisk walk + mobility moves', { duration: '5min' }),
        { kind: 'run', name: t('فترات جري + مشي', 'Run + walk intervals'), sets: 1, reps: '5', duration: '4min', intensity: 'Z2', basis: 'hr', rest: '1min', restType: 'walk', purpose: t('زيادة وقت الجري المتواصل', 'Increase continuous running time'), component: 'aerobic', note: t('أسبوع ١: ٥×٣ دقايق — أسبوع ٢: ٥×٤ — أسبوع ٣: ٤×٥ — أسبوع ٤: ٤×٤ (تخفيف)', 'Week 1: 5x3 min — Week 2: 5x4 — Week 3: 4x5 — Week 4: 4x4 (deload)') },
        ...walkCD()
      ]
    },
    k5_long_a: {
      title: t('جري-مشي طويل', 'Long run-walk'),
      goal: t('أطول تمرينة في الأسبوع لبناء التحمل ووقت على الرجلين.', 'The longest session of the week to build endurance and time on feet.'),
      components: ['aerobic', 'muscular_endurance'],
      rpe: 5, duration: 50,
      items: [
        W('مشي سريع', 'Brisk walk', { duration: '5min' }),
        { kind: 'run', name: t('جري ٥ دقايق / مشي ١ دقيقة', 'Run 5 min / walk 1 min'), sets: 1, reps: '5-6', duration: '5min', intensity: 'Z2', basis: 'hr', rest: '1min', restType: 'walk', purpose: t('وقت أطول على الرجلين بشدة سهلة', 'More time on feet at an easy effort'), component: 'aerobic', note: t('المجموع ٣٠-٤٠ دقيقة؛ السرعة بتاعة كلام مريح', 'Total 30-40 min; conversational pace') },
        ...walkCD()
      ]
    },
    k5_cont: {
      title: t('جري متواصل سهل', 'Continuous easy run'),
      goal: t('جري متواصل بشدة سهلة لبناء القاعدة الهوائية.', 'Continuous easy running to build the aerobic base.'),
      components: ['aerobic'],
      rpe: 4, duration: 40,
      items: [
        W('مشي سريع + حركات مرونة', 'Brisk walk + mobility moves', { duration: '5min' }),
        { kind: 'run', libId: 'ad_zone_2_easy_run', duration: '20-30min', intensity: 'Z2', basis: 'hr', purpose: t('تحمل هوائي متواصل', 'Continuous aerobic endurance'), component: 'aerobic', note: t('زود ٣-٥ دقايق كل أسبوع؛ لو محتاج امشي دقيقة عادي', 'Add 3-5 min each week; a 1-min walk break is fine') },
        ...walkCD()
      ]
    },
    k5_pickups: {
      title: t('جري سهل + تسريعات قصيرة', 'Easy run + short pick-ups'),
      goal: t('إدخال سرعة خفيفة لتحسين الإيقاع والتكنيك بدون تعب.', 'Introduce light speed to improve rhythm and mechanics without fatigue.'),
      components: ['aerobic', 'threshold', 'technique'],
      rpe: 5, duration: 40,
      items: [
        W('مشي سريع + جري خفيف', 'Brisk walk + easy jog', { duration: '8min' }),
        { kind: 'run', libId: 'ad_zone_2_easy_run', duration: '15min', intensity: 'Z2', basis: 'hr', purpose: t('حجم هوائي', 'Aerobic volume'), component: 'aerobic' },
        { kind: 'run', name: t('تسريعات ٢٠ ثانية', '20-second pick-ups'), sets: 1, reps: '6', duration: '20s', intensity: '6-7', basis: 'rpe', rest: '90s', restType: 'jog', purpose: t('إيقاع أسرع وتكنيك أنضف', 'Quicker rhythm and cleaner mechanics'), component: 'technique', note: t('سريع ومسترخي، مش سبرنت', 'Quick and relaxed, not a sprint') },
        ...walkCD()
      ]
    },
    k5_long_b: {
      title: t('الجري الطويل', 'Long run'),
      goal: t('الوصول لجري ٤-٥ كم متواصل بشدة سهلة.', 'Reach 4-5 km of continuous easy running.'),
      components: ['aerobic', 'muscular_endurance'],
      rpe: 5, duration: 50,
      items: [
        W('مشي سريع', 'Brisk walk', { duration: '5min' }),
        { kind: 'run', libId: 'wg_running', distance: '4-5km', duration: '30-40min', intensity: 'Z2', basis: 'hr', purpose: t('وقت على الرجلين يقرب من مسافة السباق', 'Time on feet approaching race distance'), component: 'aerobic', note: t('أسبوع ١: ٣.٥ كم — أسبوع ٢: ٤ — أسبوع ٣: ٥ — أسبوع ٤: ٣.٥ (تخفيف)', 'Week 1: 3.5 km — Week 2: 4 — Week 3: 5 — Week 4: 3.5 (deload)') },
        ...walkCD()
      ]
    },
    k5_shakeout: {
      title: t('جري تنشيط قبل السباق', 'Pre-race shake-out'),
      goal: t('تنشيط خفيف للرجلين قبل السباق بيومين.', 'Light leg activation two days before the race.'),
      components: ['aerobic', 'recovery'],
      rpe: 3, duration: 25,
      items: [
        W('مشي سريع', 'Brisk walk', { duration: '5min' }),
        { kind: 'run', libId: 'ad_zone_2_easy_run', duration: '15min', intensity: 'Z2', basis: 'hr', purpose: t('تنشيط بدون تعب', 'Activation without fatigue'), component: 'aerobic' },
        { kind: 'run', libId: 'ad_strides', name: t('تسريعات ١٥ ثانية', '15-second pick-ups'), sets: 1, reps: '3', duration: '15s', intensity: '6', basis: 'rpe', rest: '60s', restType: 'walk', purpose: t('إحساس الإيقاع', 'Rhythm feel'), component: 'technique' },
        ...walkCD()
      ]
    },
    k5_race: {
      title: t('يوم السباق — ٥ كم', 'Race day — 5k'),
      goal: t('إنهاء أول ٥ كم بتوزيع متساوي وبداية هادية.', 'Finish the first 5k with even pacing and a calm start.'),
      components: ['aerobic', 'threshold', 'mental'],
      rpe: 8, duration: 60,
      items: [
        W('مشي ٥ دقايق + جري خفيف ٥ دقايق', 'Walk 5 min + easy jog 5 min', { duration: '10min' }),
        { kind: 'run', name: t('سباق ٥ كم', '5k race'), sets: 1, reps: '1', distance: '5km', intensity: '7-8', basis: 'rpe', rest: '10min', restType: 'walk', purpose: t('إنهاء المسافة بأحسن توزيع', 'Finish the distance with the best pacing'), component: 'aerobic', note: t('أول كيلو أبطأ من إحساسك، من الكيلو ٤ زود لو قادر. اشرب مية قبلها بساعة', 'Run the first km slower than you feel; push from km 4 if able. Drink water an hour before') },
        ...walkCD()
      ]
    },
    k5_str: distStr('beg')
  }
};

/* =============================================================================
 * ٩) ١٠ كم — متوسط (١٢ أسبوع) — رقم شخصي
 * ============================================================================= */
const T_10K_INT = {
  id: 'pt_running_10k_int',
  sport: 'running',
  level: 'intermediate',
  title: t('١٠ كم رقم شخصي — متوسط (١٢ أسبوع)', '10k PB — intermediate (12 weeks)'),
  goal: t('تحسين الرقم الشخصي في ١٠ كم (مثال: من ٤٦ لـ٤٤ دقيقة) برفع العتبة وVO2max وزيادة الحجم الهوائي بشكل آمن.', 'Improve the 10k personal best (e.g. from 46 to 44 min) by raising threshold and VO2max and safely increasing aerobic volume.'),
  components: ['aerobic', 'threshold', 'vo2max', 'muscular_endurance'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: t('زيادة الحجم الهوائي، طلعات لقوة الجري، فارتلك، وقوة عامة.', 'Build aerobic volume, hills for running strength, fartlek and general strength.'),
      components: ['aerobic', 'muscular_endurance', 'strength'],
      blocks: [
        {
          name: t('بلوك ١ — اختبار ودخول', 'Block 1 — Testing & entry'),
          goal: t('اختبار ٥ كم لتحديد سرعات التدريب.', '5k time trial to set training paces.'),
          components: ['vo2max', 'aerobic'],
          loads: [4], weekTypes: ['test'],
          pattern: ['k10_easy', 'k10_test', 'k10_str', 'k10_easy', '', 'k10_easy', 'k10_long']
        },
        {
          name: t('بلوك ٢ — قاعدة وطلعات', 'Block 2 — Base & hills'),
          goal: t('طلعات ٧٥ث، فارتلك ٣ دقايق، وجري طويل يوصل لـ١٦ كم.', '75s hills, 3-min fartlek and a long run up to 16 km.'),
          components: ['aerobic', 'muscular_endurance', 'vo2max'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['k10_easy', 'k10_hills', 'k10_str', 'k10_fartlek', '', 'k10_easy', 'k10_long']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('VO2max بتكرارات ١٠٠٠م وعتبة ٢ كم، مع الحفاظ على الجري الطويل.', 'VO2max with 1000 m reps and 2 km threshold reps, while keeping the long run.'),
      components: ['vo2max', 'threshold', 'aerobic'],
      blocks: [
        {
          name: t('بلوك ٣ — VO2max وعتبة', 'Block 3 — VO2max & threshold'),
          goal: t('٥-٦×١٠٠٠م على سرعة ٥ كم و٣×٢ كم على العتبة.', '5-6x1000m at 5k pace and 3x2km at threshold.'),
          components: ['vo2max', 'threshold', 'aerobic'],
          loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['k10_easy', 'k10_vo2', 'k10_str', 'k10_thresh', '', 'k10_easy', 'k10_long']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('سرعة السباق (١٦٠٠م على سرعة ١٠ كم) وإعادة اختبار ٥ كم.', 'Race pace (1600 m at 10k pace) and a 5k retest.'),
      components: ['threshold', 'vo2max', 'mental'],
      blocks: [
        {
          name: t('بلوك ٤ — سرعة السباق', 'Block 4 — Race pace'),
          goal: t('أعلى أسبوع: VO2max + سرعة السباق + جري طويل.', 'Peak week: VO2max + race pace + long run.'),
          components: ['vo2max', 'threshold', 'aerobic'],
          loads: [7], weekTypes: ['shock'],
          pattern: ['k10_easy', 'k10_vo2', 'k10_str', 'k10_race_pace', '', 'k10_easy', 'k10_long']
        },
        {
          name: t('بلوك ٥ — أسبوع اختبار', 'Block 5 — Testing week'),
          goal: t('إعادة ٥ كم لتأكيد سرعة الهدف في الـ١٠ كم.', 'Repeat the 5k to confirm the 10k goal pace.'),
          components: ['vo2max', 'threshold'],
          loads: [5], weekTypes: ['test'],
          pattern: ['k10_easy', 'k10_race_pace', 'k10_str_m', 'k10_easy', '', 'k10_shakeout', 'k10_test']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('تهدئة: حجم أقل ٤٠-٥٠٪ مع لمسة سرعة سباق وسباق ١٠ كم.', 'Taper: 40-50% less volume with a race-pace touch, then the 10k race.'),
      components: ['aerobic', 'recovery', 'mental'],
      blocks: [
        {
          name: t('بلوك ٦ — أسبوع السباق', 'Block 6 — Race week'),
          goal: t('رجلين فريش وخطة توزيع واضحة.', 'Fresh legs and a clear pacing plan.'),
          components: ['threshold', 'recovery', 'mental'],
          loads: [3], weekTypes: ['comp'],
          pattern: ['k10_easy', 'k10_race_pace', 'k10_str_m', 'k10_easy', '', 'k10_shakeout', 'k10_race']
        }
      ]
    }
  ],
  sessions: {
    k10_test: {
      title: t('اختبار ٥ كم', '5k time trial'),
      goal: t('قياس المستوى وتحديد سرعات العتبة وVO2max والسباق.', 'Measure fitness and set threshold, VO2max and race paces.'),
      components: ['vo2max', 'threshold'],
      rpe: 9, duration: 60,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('٥ كم اختبار زمن', '5k time trial'), sets: 1, reps: '1', distance: '5km', time: '20:30-22:00', intensity: '100', basis: 'best', rest: '10min', restType: 'walk', purpose: t('مرجع لسرعات الموسم (سرعة ١٠ كم ≈ سرعة ٥ كم + ١٢-١٥ث/كم)', 'Reference for season paces (10k pace is about 5k pace + 12-15 s/km)'), component: 'vo2max', note: t('على مضمار أو طريق مسطح، توزيع متساوي', 'On a track or flat road, even pacing') },
        ...runCD()
      ]
    },
    k10_easy: easyRun({ dur: '40-50min', dist: '7-9km', duration: 60, strides: 6, note: t('سرعة مرجعية ٥:٢٠-٥:٥٠ د/كم', 'Reference pace 5:20-5:50 min/km') }),
    k10_long: longRun({ dur: '75-95min', dist: '13-17km', duration: 105, note: t('زود ١-٢ كم كل أسبوع، أسبوع التخفيف ١١-١٢ كم. سرعة مرجعية ٥:٣٠-٦:٠٠ د/كم', 'Add 1-2 km per week, deload week 11-12 km. Reference pace 5:30-6:00 min/km') }),
    k10_hills: {
      title: t('طلعات ٧٥ ثانية', '75-second hills'),
      goal: t('قوة خاصة بالجري وتحسين VO2max بحمل أقل على الرجلين.', 'Running-specific strength and VO2max with less impact.'),
      components: ['muscular_endurance', 'vo2max'],
      rpe: 8, duration: 65,
      items: [
        ...runWU(true),
        { kind: 'run', libId: 'ad_hill_repeats', name: t('طلعات ٧٥ ثانية', '75-second hill repeats'), sets: 1, reps: '8', duration: '75s', intensity: '8', basis: 'rpe', rest: '2min', restType: 'jog', purpose: t('قوة دفع وتحمل عضلي', 'Drive strength and muscular endurance'), component: 'muscular_endurance', note: t('طلعة ٤-٦٪ بمجهود سرعة ٥ كم؛ أسبوع ١: ٦ تكرارات، زود واحد كل أسبوع', '4-6% hill at 5k effort; week 1: 6 reps, add one per week') },
        ...runCD()
      ]
    },
    k10_fartlek: {
      title: t('فارتلك ٣ دقايق', '3-minute fartlek'),
      goal: t('تعود على سرعة قريبة من العتبة وسرعة الـ١٠ كم بطريقة مرنة.', 'Get used to near-threshold and 10k pace in a flexible way.'),
      components: ['threshold', 'aerobic'],
      rpe: 7, duration: 60,
      items: [
        W('جري سهل', 'Easy jog', { duration: '15min', intensity: 'Z2', basis: 'hr' }),
        { kind: 'run', libId: 'dr_fartlek', duration: '30min', intensity: '7', basis: 'rpe', purpose: t('٦ × (٣ دقايق مجهود ١٠ كم / ٢ دقيقة سهل)', '6 x (3 min at 10k effort / 2 min easy)'), component: 'threshold' },
        ...runCD()
      ]
    },
    k10_vo2: {
      title: t('VO2max (١٠٠٠م تكرارات)', 'VO2max (1000m reps)'),
      goal: t('رفع VO2max والسرعة الهوائية القصوى.', 'Raise VO2max and maximal aerobic speed.'),
      components: ['vo2max'],
      rpe: 8, duration: 70,
      items: [
        ...runWU(true),
        { kind: 'run', libId: 'ex_interval_running', name: t('١٠٠٠م على سرعة ٥ كم', '1000m at 5k pace'), sets: 1, reps: '5-6', distance: '1000m', time: '4:05-4:12', intensity: 'Z5', basis: 'hr', rest: '2:30', restType: 'jog', purpose: t('وقت طويل قريب من VO2max', 'Extended time near VO2max'), component: 'vo2max', note: t('أسبوع ١: ٥ تكرارات، أسبوع ٢-٣: ٦، أسبوع التخفيف: ٤', 'Week 1: 5 reps, weeks 2-3: 6, deload week: 4') },
        ...runCD()
      ]
    },
    k10_thresh: {
      title: t('عتبة (٣×٢ كم)', 'Threshold (3x2km)'),
      goal: t('رفع سرعة العتبة اللاكتيكية، أهم عامل في أداء الـ١٠ كم.', 'Raise lactate-threshold speed, the key determinant of 10k performance.'),
      components: ['threshold', 'aerobic'],
      rpe: 7, duration: 70,
      items: [
        ...runWU(false),
        { kind: 'run', libId: 'ad_threshold_cruise_intervals', name: t('٢ كم على العتبة', '2km at threshold'), sets: 1, reps: '3', distance: '2km', time: '9:00-9:10', intensity: 'Z4', basis: 'hr', rest: '90s', restType: 'jog', purpose: t('وقت أطول على العتبة', 'More time at threshold'), component: 'threshold', note: t('سرعة ٤:٣٠-٤:٣٥ د/كم؛ مريح لكن صعب', '4:30-4:35 min/km; comfortably hard') },
        ...runCD()
      ]
    },
    k10_race_pace: {
      title: t('سرعة السباق (١٦٠٠م)', 'Race pace (1600m)'),
      goal: t('تثبيت سرعة الهدف في الـ١٠ كم وتحملها.', 'Lock in and sustain 10k goal pace.'),
      components: ['threshold', 'vo2max', 'mental'],
      rpe: 8, duration: 70,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('١٦٠٠م على سرعة ١٠ كم', '1600m at 10k pace'), sets: 1, reps: '5', distance: '1600m', time: '7:00-7:05', intensity: '4:22-4:25', basis: 'pace', rest: '60s', restType: 'jog', purpose: t('إحساس سرعة السباق وتحملها', 'Race-pace feel and tolerance'), component: 'threshold', note: t('أسبوع السباق: ٣ تكرارات بس', 'Race week: 3 reps only') },
        ...runCD()
      ]
    },
    k10_shakeout: easyRun({ title: t('جري تنشيط قبل السباق', 'Pre-race shake-out'), goal: t('تنشيط خفيف للرجلين قبل السباق.', 'Light activation before the race.'), dur: '20min', duration: 35, strides: 4 }),
    k10_race: {
      title: t('يوم السباق — ١٠ كم', 'Race day — 10k'),
      goal: t('سباق بخطة توزيع متساوي ونهاية قوية.', 'A race with even pacing and a strong finish.'),
      components: ['threshold', 'vo2max', 'mental'],
      rpe: 9, duration: 80,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('سباق ١٠ كم', '10k race'), sets: 1, reps: '1', distance: '10km', intensity: '4:22-4:25', basis: 'pace', rest: '10min', restType: 'walk', purpose: t('رقم شخصي جديد', 'A new personal best'), component: 'threshold', note: t('أول ٢ كم على السرعة المستهدفة بالظبط، من كم ٧ زود تدريجيًا', 'First 2 km exactly on target pace; build gradually from km 7') },
        ...runCD()
      ]
    },
    k10_str: distStr('int'),
    k10_str_m: runStrMaint()
  }
};

/* =============================================================================
 * ١٠) نصف ماراثون — متوسط (١٤ أسبوع)
 * ============================================================================= */
const T_HALF_INT = {
  id: 'pt_marathon_half_int',
  sport: 'marathon',
  level: 'intermediate',
  title: t('نصف ماراثون — متوسط (١٤ أسبوع)', 'Half marathon — intermediate (14 weeks)'),
  goal: t('إنهاء نصف الماراثون بزمن مستهدف (مثال: ١:٤٠) برفع العتبة وتحمل سرعة السباق وجري طويل يوصل لـ١٩-٢١ كم، مع خطة تغذية وتوزيع.', 'Run the half marathon to a target time (e.g. 1:40) by raising threshold, race-pace endurance and a long run up to 19-21 km, with fuelling and pacing plans.'),
  components: ['aerobic', 'threshold', 'muscular_endurance', 'vo2max'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: t('زيادة الحجم الهوائي والجري الطويل، طلعات، عتبة بفترات، وقوة عامة.', 'Build aerobic volume and the long run, hills, threshold intervals and general strength.'),
      components: ['aerobic', 'muscular_endurance', 'threshold', 'strength'],
      blocks: [
        {
          name: t('بلوك ١ — اختبار ودخول', 'Block 1 — Testing & entry'),
          goal: t('اختبار ٥ كم لتحديد سرعات العتبة والسباق.', '5k time trial to set threshold and race paces.'),
          components: ['vo2max', 'aerobic'],
          loads: [4], weekTypes: ['test'],
          pattern: ['hm_easy', 'hm_test', 'hm_str', 'hm_easy', '', 'hm_easy', 'hm_long']
        },
        {
          name: t('بلوك ٢ — قاعدة هوائية', 'Block 2 — Aerobic base'),
          goal: t('طلعات ٩٠ث، عتبة ٤×١٦٠٠م، وجري طويل ١٤-١٨ كم.', '90s hills, 4x1600m threshold and a 14-18 km long run.'),
          components: ['aerobic', 'muscular_endurance', 'threshold'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['hm_easy', 'hm_hills', 'hm_str', 'hm_thresh', '', 'hm_easy', 'hm_long']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('VO2max، تيمبو متواصل، وجري طويل بجزء على سرعة السباق.', 'VO2max, continuous tempo and long runs with race-pace segments.'),
      components: ['vo2max', 'threshold', 'aerobic', 'muscular_endurance'],
      blocks: [
        {
          name: t('بلوك ٣ — تيمبو وسرعة السباق', 'Block 3 — Tempo & race pace'),
          goal: t('٥×١٠٠٠م، تيمبو ٢٠-٣٠ دقيقة، وجري طويل ١٦-٢٠ كم آخره على سرعة السباق.', '5x1000m, 20-30 min tempo and a 16-20 km long run finishing at race pace.'),
          components: ['vo2max', 'threshold', 'aerobic'],
          loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['hm_easy', 'hm_vo2', 'hm_str', 'hm_tempo', '', 'hm_easy', 'hm_long_mp']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('أعلى أحمال سرعة السباق ثم سباق ١٠ كم تجريبي لتأكيد الهدف.', 'Peak race-pace loading then a 10k tune-up race to confirm the target.'),
      components: ['threshold', 'muscular_endurance', 'mental'],
      blocks: [
        {
          name: t('بلوك ٤ — ذروة التحميل', 'Block 4 — Peak loading'),
          goal: t('٣×٣ كم على سرعة السباق، عتبة، وجري طويل ٢٠ كم بجزء على سرعة السباق.', '3x3km at race pace, threshold and a 20 km long run with a race-pace segment.'),
          components: ['threshold', 'muscular_endurance', 'aerobic'],
          loads: [7, 8], weekTypes: ['load', 'shock'],
          pattern: ['hm_easy', 'hm_race_pace', 'hm_str_m', 'hm_thresh', '', 'hm_easy', 'hm_long_mp']
        },
        {
          name: t('بلوك ٥ — سباق تجريبي ١٠ كم', 'Block 5 — 10k tune-up race'),
          goal: t('أسبوع أخف وسباق ١٠ كم لتأكيد السرعة المستهدفة (سرعة النصف ≈ سرعة ١٠ كم + ١٥-٢٠ث/كم).', 'Lighter week and a 10k race to confirm target pace (HM pace is about 10k pace + 15-20 s/km).'),
          components: ['threshold', 'vo2max', 'mental'],
          loads: [5], weekTypes: ['test'],
          pattern: ['hm_easy', 'hm_vo2', 'hm_str_m', 'hm_easy', '', 'hm_shakeout', 'hm_tune']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('تهدئة أسبوعين: خفض الحجم ٣٠ ثم ٥٠٪ مع الحفاظ على سرعة السباق.', 'Two-week taper: cut volume by 30 then 50% while keeping race pace.'),
      components: ['aerobic', 'recovery', 'mental'],
      blocks: [
        {
          name: t('بلوك ٦ — تهدئة', 'Block 6 — Taper'),
          goal: t('حجم أقل ٣٠٪، جري طويل ١٢-١٤ كم، ولمسات سرعة سباق.', '30% less volume, a 12-14 km long run and race-pace touches.'),
          components: ['threshold', 'aerobic', 'recovery'],
          loads: [4], weekTypes: ['taper'],
          pattern: ['hm_easy', 'hm_race_pace', 'hm_str_m', 'hm_easy', '', 'hm_easy', 'hm_long_short']
        },
        {
          name: t('بلوك ٧ — أسبوع السباق', 'Block 7 — Race week'),
          goal: t('تخزين كربوهيدرات آخر يومين، رجلين فريش، وتنفيذ خطة السباق.', 'Carb loading over the final two days, fresh legs and executing the race plan.'),
          components: ['recovery', 'mental'],
          loads: [2], weekTypes: ['comp'],
          pattern: ['hm_easy', 'hm_race_pace', '', 'hm_easy', '', 'hm_shakeout', 'hm_race']
        }
      ]
    }
  ],
  sessions: {
    hm_test: {
      title: t('اختبار ٥ كم', '5k time trial'),
      goal: t('قياس المستوى وتحديد سرعات العتبة والسباق.', 'Measure fitness and set threshold and race paces.'),
      components: ['vo2max', 'threshold'],
      rpe: 9, duration: 60,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('٥ كم اختبار زمن', '5k time trial'), sets: 1, reps: '1', distance: '5km', time: '21:30-23:00', intensity: '100', basis: 'best', rest: '10min', restType: 'walk', purpose: t('مرجع لكل سرعات الموسم', 'Reference for all season paces'), component: 'vo2max' },
        ...runCD()
      ]
    },
    hm_easy: easyRun({ dur: '45-55min', dist: '8-10km', duration: 65, strides: 4, note: t('سرعة مرجعية ٥:٣٠-٦:٠٠ د/كم', 'Reference pace 5:30-6:00 min/km') }),
    hm_long: longRun({ dur: '85-110min', dist: '14-18km', duration: 120, note: t('زود ١-٢ كم كل أسبوع، أسبوع التخفيف ١٢ كم. جرب جل أو مشروب كربوهيدرات بعد ٦٠ دقيقة', 'Add 1-2 km per week, 12 km in the deload week. Practise a gel or carb drink after 60 min') }),
    hm_long_mp: longRun({
      title: t('جري طويل بجزء على سرعة السباق', 'Long run with race-pace segment'),
      goal: t('تحمل سرعة السباق وهو متعب وتجربة خطة التغذية.', 'Hold race pace on tired legs and rehearse the fuelling plan.'),
      components: ['aerobic', 'threshold', 'muscular_endurance'],
      dur: '100-120min', dist: '16-20km', duration: 130, rpe: 7,
      note: t('إجمالي المسافة؛ أول الجزء سهل Z2', 'Total distance; the first part easy Z2'),
      extra: { kind: 'run', name: t('آخر الجري: جزء على سرعة نصف الماراثون', 'End of run: half-marathon pace segment'), distance: '6-10km', duration: '28-48min', intensity: '4:42-4:46', basis: 'pace', purpose: t('سرعة السباق على رجلين متعبة', 'Race pace on tired legs'), component: 'threshold', note: t('أسبوع ١: ٦ كم، زود ٢ كم كل أسبوع؛ جل كل ٣٠-٤٠ دقيقة', 'Week 1: 6 km, add 2 km per week; a gel every 30-40 min') }
    }),
    hm_long_short: longRun({ title: t('جري طويل مخفّض (تهدئة)', 'Reduced long run (taper)'), dur: '65-75min', dist: '12-14km', duration: 85, note: t('آخر ٣ كم على سرعة السباق', 'Last 3 km at race pace') }),
    hm_hills: {
      title: t('طلعات ٩٠ ثانية', '90-second hills'),
      goal: t('قوة خاصة بالجري وتحمل عضلي بحمل أقل على المفاصل.', 'Running-specific strength and muscular endurance with less joint stress.'),
      components: ['muscular_endurance', 'vo2max'],
      rpe: 8, duration: 65,
      items: [
        ...runWU(true),
        { kind: 'run', libId: 'ad_hill_repeats', name: t('طلعات ٩٠ ثانية', '90-second hill repeats'), sets: 1, reps: '6-8', duration: '90s', intensity: '8', basis: 'rpe', rest: '2:30', restType: 'jog', purpose: t('قوة دفع وتحمل عضلي', 'Drive strength and muscular endurance'), component: 'muscular_endurance', note: t('طلعة ٤-٦٪ بمجهود سرعة ١٠ كم، النزول جري خفيف', '4-6% hill at 10k effort, easy jog down') },
        ...runCD()
      ]
    },
    hm_thresh: {
      title: t('عتبة (٤×١٦٠٠م)', 'Threshold (4x1600m)'),
      goal: t('رفع سرعة العتبة اللاكتيكية، الأساس في سرعة نصف الماراثون.', 'Raise lactate-threshold speed, the foundation of half-marathon pace.'),
      components: ['threshold', 'aerobic'],
      rpe: 7, duration: 70,
      items: [
        ...runWU(false),
        { kind: 'run', libId: 'ad_threshold_cruise_intervals', name: t('١٦٠٠م على العتبة', '1600m at threshold'), sets: 1, reps: '4', distance: '1600m', time: '7:20-7:30', intensity: 'Z4', basis: 'hr', rest: '60s', restType: 'jog', purpose: t('وقت أطول على العتبة بدون تعب زايد', 'More time at threshold without excess fatigue'), component: 'threshold', note: t('سرعة ٤:٣٥-٤:٤٠ د/كم', '4:35-4:40 min/km') },
        ...runCD()
      ]
    },
    hm_vo2: {
      title: t('VO2max (١٠٠٠م)', 'VO2max (1000m)'),
      goal: t('رفع السقف الهوائي عشان سرعة السباق تبقى أسهل.', 'Raise the aerobic ceiling so race pace feels easier.'),
      components: ['vo2max'],
      rpe: 8, duration: 70,
      items: [
        ...runWU(true),
        { kind: 'run', libId: 'ex_interval_running', name: t('١٠٠٠م على سرعة ٥ كم', '1000m at 5k pace'), sets: 1, reps: '5', distance: '1000m', time: '4:15-4:22', intensity: 'Z5', basis: 'hr', rest: '2min', restType: 'jog', purpose: t('وقت قريب من VO2max', 'Time near VO2max'), component: 'vo2max' },
        ...runCD()
      ]
    },
    hm_tempo: {
      title: t('تيمبو متواصل', 'Continuous tempo'),
      goal: t('جري متواصل على العتبة لتحسين تحمل الإيقاع والتركيز.', 'Continuous threshold running to improve rhythm endurance and focus.'),
      components: ['threshold', 'mental'],
      rpe: 7, duration: 65,
      items: [
        ...runWU(false),
        { kind: 'run', libId: 'dr_tempo_run', duration: '20-30min', intensity: 'Z4', basis: 'hr', purpose: t('تحمل على العتبة بإيقاع ثابت', 'Sustained threshold at a steady rhythm'), component: 'threshold', note: t('٤:٣٥-٤:٤٠ د/كم؛ أسبوع ١: ٢٠ دقيقة، زود ٥ دقايق كل أسبوع', '4:35-4:40 min/km; week 1: 20 min, add 5 min per week') },
        ...runCD()
      ]
    },
    hm_race_pace: {
      title: t('سرعة السباق (٣×٣ كم)', 'Race pace (3x3km)'),
      goal: t('تثبيت سرعة نصف الماراثون المستهدفة وتحملها.', 'Lock in and sustain goal half-marathon pace.'),
      components: ['threshold', 'muscular_endurance', 'mental'],
      rpe: 7, duration: 75,
      items: [
        ...runWU(false),
        { kind: 'run', name: t('٣ كم على سرعة السباق', '3km at race pace'), sets: 1, reps: '3', distance: '3km', time: '14:10-14:20', intensity: '4:42-4:46', basis: 'pace', rest: '2min', restType: 'jog', purpose: t('إحساس سرعة السباق واقتصادها', 'Race-pace feel and economy'), component: 'threshold', note: t('التهدئة: ٢×٣ كم، أسبوع السباق: ٢×٢ كم', 'Taper: 2x3 km, race week: 2x2 km') },
        ...runCD()
      ]
    },
    hm_shakeout: easyRun({ title: t('جري تنشيط قبل السباق', 'Pre-race shake-out'), goal: t('تنشيط خفيف للرجلين قبل السباق.', 'Light activation before the race.'), dur: '20min', duration: 35, strides: 4 }),
    hm_tune: {
      title: t('سباق تجريبي ١٠ كم', '10k tune-up race'),
      goal: t('اختبار اللياقة في ظروف سباق وتأكيد سرعة الهدف.', 'Test fitness in race conditions and confirm goal pace.'),
      components: ['threshold', 'vo2max', 'mental'],
      rpe: 9, duration: 80,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('سباق ١٠ كم', '10k race'), sets: 1, reps: '1', distance: '10km', time: '44:00-46:00', intensity: '100', basis: 'best', rest: '10min', restType: 'walk', purpose: t('توقع زمن النصف (زمن ١٠ كم × ٢.٢١ تقريبًا)', 'Predict the half (roughly 10k time x 2.21)'), component: 'threshold' },
        ...runCD()
      ]
    },
    hm_race: {
      title: t('يوم السباق — نصف ماراثون', 'Race day — half marathon'),
      goal: t('تنفيذ خطة التوزيع والتغذية لإنهاء السباق بالزمن المستهدف.', 'Execute the pacing and fuelling plans to finish on target time.'),
      components: ['threshold', 'aerobic', 'mental'],
      rpe: 9, duration: 130,
      items: [
        W('جري خفيف ١٠ دقايق + ٣ تسريعات', 'Easy jog 10 min + 3 strides', { duration: '15min' }),
        { kind: 'run', name: t('نصف ماراثون', 'Half marathon'), sets: 1, reps: '1', distance: '21.1km', intensity: '4:42-4:46', basis: 'pace', rest: '15min', restType: 'walk', purpose: t('إنهاء السباق بالزمن المستهدف', 'Finish on target time'), component: 'threshold', note: t('أول ٥ كم أبطأ ٣-٥ث/كم، جل على كم ٧ و١٤، من كم ١٦ زود لو قادر', 'First 5 km 3-5 s/km slower, gels at km 7 and 14, push from km 16 if able') },
        ...walkCD()
      ]
    },
    hm_str: distStr('int'),
    hm_str_m: runStrMaint()
  }
};

/* =============================================================================
 * ١١) ماراثون كامل — متقدم (١٨ أسبوع)
 * ============================================================================= */
const T_FULL_ADV = {
  id: 'pt_marathon_full_adv',
  sport: 'marathon',
  level: 'advanced',
  title: t('ماراثون كامل — متقدم (١٨ أسبوع)', 'Full marathon — advanced (18 weeks)'),
  goal: t('تحقيق زمن مستهدف في الماراثون (مثال: ٢:٤٥، سرعة ٣:٥٠-٣:٥٥ د/كم) بحجم ٩٠-١٣٠ كم أسبوعيًا، جري طويل ٣٢-٣٥ كم بأجزاء على سرعة الماراثون، عتبة، وتهدئة ٣ أسابيع.', 'Achieve a target marathon time (e.g. 2:45 at 3:50-3:55 min/km) with 90-130 km weeks, 32-35 km long runs with marathon-pace segments, threshold work and a 3-week taper.'),
  components: ['aerobic', 'threshold', 'muscular_endurance', 'vo2max', 'mental'],
  sessionsPerWeek: 7,
  periods: [
    {
      type: 'gpp',
      goal: t('زيادة الحجم الأسبوعي والجري الطويل، طلعات، عتبة، وقوة عامة.', 'Build weekly volume and the long run, hills, threshold and general strength.'),
      components: ['aerobic', 'muscular_endurance', 'threshold', 'strength'],
      blocks: [
        {
          name: t('بلوك ١ — اختبار ودخول', 'Block 1 — Testing & entry'),
          goal: t('اختبار ١٠ كم لتحديد سرعات العتبة والماراثون.', '10k time trial to set threshold and marathon paces.'),
          components: ['threshold', 'aerobic'],
          loads: [5], weekTypes: ['test'],
          pattern: ['fm_recovery', 'fm_test', 'fm_str', 'fm_easy', '', 'fm_easy', 'fm_long']
        },
        {
          name: t('بلوك ٢ — قاعدة هوائية', 'Block 2 — Aerobic base'),
          goal: t('٩٠-١٠٥ كم أسبوعيًا، طلعات، عتبة ٣×٣ كم، وجري طويل ٢٦-٣٠ كم.', '90-105 km weeks, hills, 3x3km threshold and a 26-30 km long run.'),
          components: ['aerobic', 'muscular_endurance', 'threshold'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['fm_recovery', 'fm_hills', 'fm_str', 'fm_easy', 'fm_thresh', 'fm_easy', 'fm_long']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('إدخال سرعة الماراثون في منتصف الأسبوع والجري الطويل، مع VO2max للحفاظ على السقف الهوائي.', 'Introduce marathon pace midweek and in the long run, with VO2max work to keep the aerobic ceiling high.'),
      components: ['aerobic', 'threshold', 'vo2max', 'muscular_endurance'],
      blocks: [
        {
          name: t('بلوك ٣ — VO2max وسرعة الماراثون', 'Block 3 — VO2max & marathon pace'),
          goal: t('٥×١٦٠٠م، ١٢-١٤ كم على سرعة الماراثون في منتصف الأسبوع، وجري طويل ٢٨-٣٢ كم.', '5x1600m, 12-14 km at marathon pace midweek and a 28-32 km long run.'),
          components: ['vo2max', 'threshold', 'aerobic'],
          loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['fm_recovery', 'fm_vo2', 'fm_str', 'fm_easy', 'fm_mp', 'fm_easy', 'fm_long']
        },
        {
          name: t('بلوك ٤ — خاص بالماراثون', 'Block 4 — Marathon-specific'),
          goal: t('١١٠-١٣٠ كم أسبوعيًا، جري طويل ٣٢-٣٥ كم بـ١٦-٢٠ كم على سرعة الماراثون، وعتبة.', '110-130 km weeks, 32-35 km long runs with 16-20 km at marathon pace, and threshold.'),
          components: ['muscular_endurance', 'threshold', 'aerobic', 'mental'],
          loads: [7, 8, 9, 5], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['fm_recovery', 'fm_thresh', 'fm_str_m', 'fm_easy', 'fm_mp', 'fm_easy', 'fm_long_mp']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('آخر أسبوع تحميل عالي ثم نصف ماراثون تجريبي لتأكيد سرعة الماراثون.', 'A final high-load week then a half-marathon tune-up to confirm marathon pace.'),
      components: ['threshold', 'muscular_endurance', 'mental'],
      blocks: [
        {
          name: t('بلوك ٥ — آخر أسبوع تحميل', 'Block 5 — Final loading week'),
          goal: t('VO2max، عتبة، وجري طويل ٣٥ كم بـ٢٠ كم على سرعة الماراثون.', 'VO2max, threshold and a 35 km long run with 20 km at marathon pace.'),
          components: ['muscular_endurance', 'threshold', 'vo2max'],
          loads: [8], weekTypes: ['shock'],
          pattern: ['fm_recovery', 'fm_vo2', 'fm_str_m', 'fm_easy', 'fm_thresh', 'fm_easy', 'fm_long_mp']
        },
        {
          name: t('بلوك ٦ — نصف ماراثون تجريبي', 'Block 6 — Half-marathon tune-up'),
          goal: t('أسبوع أخف وسباق نصف ماراثون (سرعة الماراثون ≈ سرعة النصف + ١٠-١٥ث/كم).', 'Lighter week and a half-marathon race (marathon pace is about HM pace + 10-15 s/km).'),
          components: ['threshold', 'mental'],
          loads: [5], weekTypes: ['test'],
          pattern: ['fm_recovery', 'fm_easy', 'fm_str_m', 'fm_mp', '', 'fm_shakeout', 'fm_tune']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('تهدئة ٣ أسابيع: خفض الحجم ٢٠ ثم ٣٥ ثم ٥٥-٦٠٪ مع الحفاظ على الشدة وسرعة الماراثون، وتخزين كربوهيدرات آخر ٢-٣ أيام.', 'Three-week taper: cut volume by 20, 35 then 55-60% while keeping intensity and marathon pace, with carb loading over the last 2-3 days.'),
      components: ['aerobic', 'threshold', 'recovery', 'mental'],
      blocks: [
        {
          name: t('بلوك ٧ — تهدئة', 'Block 7 — Taper'),
          goal: t('حجم أقل تدريجيًا، جري طويل ٢٢-٢٦ كم ثم ١٦-١٨ كم، ولمسات عتبة وسرعة ماراثون.', 'Progressively lower volume, long runs of 22-26 then 16-18 km, and threshold and MP touches.'),
          components: ['threshold', 'aerobic', 'recovery'],
          loads: [6, 4], weekTypes: ['taper', 'taper'],
          pattern: ['fm_recovery', 'fm_thresh', 'fm_str_m', 'fm_easy', 'fm_mp', 'fm_easy', 'fm_long_taper']
        },
        {
          name: t('بلوك ٨ — أسبوع الماراثون', 'Block 8 — Marathon week'),
          goal: t('رجلين فريش، مخزون جلايكوجين كامل، وتنفيذ خطة السباق والتغذية.', 'Fresh legs, full glycogen stores and executing the race and fuelling plans.'),
          components: ['recovery', 'mental'],
          loads: [2], weekTypes: ['comp'],
          pattern: ['fm_recovery', 'fm_race_week', '', 'fm_easy', '', 'fm_shakeout', 'fm_race']
        }
      ]
    }
  ],
  sessions: {
    fm_test: {
      title: t('اختبار ١٠ كم', '10k time trial'),
      goal: t('قياس المستوى وتحديد سرعة العتبة والماراثون.', 'Measure fitness and set threshold and marathon paces.'),
      components: ['threshold', 'vo2max'],
      rpe: 9, duration: 75,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('١٠ كم اختبار زمن', '10k time trial'), sets: 1, reps: '1', distance: '10km', time: '34:30-36:00', intensity: '100', basis: 'best', rest: '10min', restType: 'walk', purpose: t('مرجع: سرعة الماراثون ≈ سرعة ١٠ كم + ٢٠-٢٥ث/كم', 'Reference: marathon pace is about 10k pace + 20-25 s/km'), component: 'threshold' },
        ...runCD()
      ]
    },
    fm_recovery: easyRun({ title: t('جري استشفاء', 'Recovery run'), goal: t('جري قصير جدًا سهل لتسريع الاستشفاء بعد الجري الطويل.', 'A very easy short run to speed recovery after the long run.'), dur: '40-50min', dist: '8-10km', hr: 'Z1', rpe: 2, duration: 55, note: t('أبطأ من ٤:٥٠ د/كم، النبض تحت ٧٠٪ من الأقصى', 'Slower than 4:50 min/km, HR under 70% of max') }),
    fm_easy: easyRun({ dur: '60-75min', dist: '13-16km', duration: 85, strides: 6, note: t('سرعة مرجعية ٤:٣٠-٥:٠٠ د/كم؛ ممكن تتقسم على مرتين في اليوم في أسابيع الحجم العالي', 'Reference pace 4:30-5:00 min/km; may be split into a double on high-volume weeks') }),
    fm_long: longRun({ dur: '2:00-2:30', dist: '26-32km', duration: 160, note: t('سرعة ٤:٢٠-٤:٤٠ د/كم؛ تدرب على التغذية: ٦٠-٩٠ جم كربوهيدرات/ساعة', '4:20-4:40 min/km; practise fuelling: 60-90 g carbs per hour') }),
    fm_long_mp: longRun({
      title: t('جري طويل بسرعة الماراثون', 'Long run with marathon pace'),
      goal: t('أهم تمرينة: تحمل سرعة الماراثون على رجلين متعبة وتجربة خطة التغذية كاملة.', 'The key session: hold marathon pace on tired legs and rehearse the full fuelling plan.'),
      components: ['muscular_endurance', 'threshold', 'aerobic', 'mental'],
      dur: '2:10-2:25', dist: '32-35km', duration: 160, rpe: 8,
      note: t('إجمالي المسافة: ٦-٨ كم سهل، الجزء الأساسي، ثم تهدئة', 'Total distance: 6-8 km easy, the main block, then cool-down'),
      extra: { kind: 'run', name: t('جزء على سرعة الماراثون', 'Marathon-pace block'), distance: '16-20km', duration: '62-78min', intensity: '3:50-3:55', basis: 'pace', purpose: t('اقتصاد سرعة الماراثون وتحمل الإرهاق', 'Marathon-pace economy and fatigue resistance'), component: 'threshold', note: t('بنفس جل ومشروب يوم السباق كل ٢٠-٣٠ دقيقة', 'Race-day gels and drink every 20-30 min') }
    }),
    fm_long_taper: longRun({ title: t('جري طويل مخفّض (تهدئة)', 'Reduced long run (taper)'), dur: '1:30-1:50', dist: '16-26km', duration: 120, note: t('أسبوع ١ من التهدئة: ٢٤-٢٦ كم بـ٨ كم على سرعة الماراثون؛ أسبوع ٢: ١٦-١٨ كم', 'Taper week 1: 24-26 km with 8 km at MP; week 2: 16-18 km') }),
    fm_hills: {
      title: t('طلعات ٩٠ ثانية', '90-second hills'),
      goal: t('قوة خاصة بالجري وتحمل عضلي يحمي من هبوط الأداء في آخر الماراثون.', 'Running-specific strength and muscular endurance that protect against late-race fade.'),
      components: ['muscular_endurance', 'vo2max'],
      rpe: 8, duration: 75,
      items: [
        ...runWU(true),
        { kind: 'run', libId: 'ad_hill_repeats', name: t('طلعات ٩٠ ثانية', '90-second hill repeats'), sets: 1, reps: '10', duration: '90s', intensity: '8', basis: 'rpe', rest: '2:30', restType: 'jog', purpose: t('قوة دفع وتحمل عضلي', 'Drive strength and muscular endurance'), component: 'muscular_endurance', note: t('طلعة ٥-٦٪ بمجهود سرعة ١٠ كم', '5-6% hill at 10k effort') },
        ...runCD()
      ]
    },
    fm_thresh: {
      title: t('عتبة (٣×٣ كم / ٢×٥ كم)', 'Threshold (3x3km / 2x5km)'),
      goal: t('رفع سرعة العتبة اللاكتيكية عشان سرعة الماراثون تبقى أقل نسبة منها.', 'Raise lactate-threshold speed so marathon pace becomes a lower fraction of it.'),
      components: ['threshold', 'aerobic'],
      rpe: 7, duration: 85,
      items: [
        ...runWU(false),
        { kind: 'run', libId: 'ad_threshold_cruise_intervals', name: t('٣ كم على العتبة', '3km at threshold'), sets: 1, reps: '3', distance: '3km', time: '10:55-11:15', intensity: 'Z4', basis: 'hr', rest: '90s', restType: 'jog', purpose: t('وقت طويل على العتبة', 'Extended time at threshold'), component: 'threshold', note: t('٣:٣٨-٣:٤٥ د/كم؛ في البلوك ٤ والتهدئة: ٢×٥ كم ثم ٢×٣ كم', '3:38-3:45 min/km; in Block 4 and taper: 2x5 km then 2x3 km') },
        ...runCD()
      ]
    },
    fm_vo2: {
      title: t('VO2max (٥×١٦٠٠م)', 'VO2max (5x1600m)'),
      goal: t('الحفاظ على السقف الهوائي عالي خلال فترة الحجم.', 'Keep the aerobic ceiling high during the volume phase.'),
      components: ['vo2max'],
      rpe: 8, duration: 80,
      items: [
        ...runWU(true),
        { kind: 'run', libId: 'ex_interval_running', name: t('١٦٠٠م على سرعة ٥-١٠ كم', '1600m at 5-10k pace'), sets: 1, reps: '5', distance: '1600m', time: '5:28-5:36', intensity: 'Z5', basis: 'hr', rest: '2:30', restType: 'jog', purpose: t('وقت قريب من VO2max', 'Time near VO2max'), component: 'vo2max', note: t('٣:٢٥-٣:٣٠ د/كم', '3:25-3:30 min/km') },
        ...runCD()
      ]
    },
    fm_mp: {
      title: t('جري بسرعة الماراثون (منتصف الأسبوع)', 'Marathon-pace run (midweek)'),
      goal: t('تعويد الجسم على سرعة الماراثون واقتصادها.', 'Accustom the body to marathon pace and its economy.'),
      components: ['threshold', 'aerobic', 'mental'],
      rpe: 7, duration: 85,
      items: [
        ...runWU(false),
        { kind: 'run', name: t('جري متواصل على سرعة الماراثون', 'Continuous marathon-pace run'), distance: '12-14km', duration: '46-55min', intensity: '3:50-3:55', basis: 'pace', purpose: t('اقتصاد وثبات سرعة الماراثون', 'Marathon-pace economy and consistency'), component: 'threshold', note: t('اشرب مشروب كربوهيدرات كل ٢٠ دقيقة زي السباق؛ التهدئة: ٨-١٠ كم', 'Carb drink every 20 min as in the race; taper: 8-10 km') },
        ...runCD()
      ]
    },
    fm_shakeout: easyRun({ title: t('جري تنشيط قبل السباق', 'Pre-race shake-out'), goal: t('تنشيط خفيف للرجلين قبل السباق.', 'Light activation before the race.'), dur: '20-25min', duration: 35, strides: 4 }),
    fm_tune: {
      title: t('نصف ماراثون تجريبي', 'Half-marathon tune-up'),
      goal: t('اختبار اللياقة وتأكيد سرعة الماراثون وتجربة روتين يوم السباق.', 'Test fitness, confirm marathon pace and rehearse the race-day routine.'),
      components: ['threshold', 'mental'],
      rpe: 9, duration: 110,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('سباق نصف ماراثون', 'Half-marathon race'), sets: 1, reps: '1', distance: '21.1km', time: '1:16-1:19', intensity: '3:37-3:45', basis: 'pace', rest: '15min', restType: 'walk', purpose: t('تأكيد هدف الماراثون', 'Confirm the marathon target'), component: 'threshold', note: t('نفس الفطار والجل والشوز بتاع يوم الماراثون', 'Same breakfast, gels and shoes as marathon day') },
        ...runCD()
      ]
    },
    fm_race_week: {
      title: t('لمسة سرعة ماراثون (أسبوع السباق)', 'Marathon-pace touch (race week)'),
      goal: t('الحفاظ على إحساس السرعة بحجم قليل جدًا.', 'Keep the pace feel with very low volume.'),
      components: ['threshold', 'mental'],
      rpe: 5, duration: 55,
      items: [
        ...runWU(true),
        { kind: 'run', name: t('٢ كم على سرعة الماراثون', '2km at marathon pace'), sets: 1, reps: '3', distance: '2km', intensity: '3:50-3:55', basis: 'pace', rest: '2min', restType: 'jog', purpose: t('إحساس السرعة بدون تعب', 'Pace feel without fatigue'), component: 'threshold' },
        ...runCD()
      ]
    },
    fm_race: {
      title: t('يوم السباق — ماراثون', 'Race day — marathon'),
      goal: t('تنفيذ خطة التوزيع (نص تاني متساوي أو أسرع شوية) والتغذية لإنهاء السباق بالزمن المستهدف.', 'Execute pacing (even or slightly negative split) and fuelling to finish on target time.'),
      components: ['aerobic', 'threshold', 'mental'],
      rpe: 10, duration: 200,
      items: [
        W('جري خفيف ١٠ دقايق + ٣ تسريعات', 'Easy jog 10 min + 3 strides', { duration: '12min' }),
        { kind: 'run', name: t('ماراثون', 'Marathon'), sets: 1, reps: '1', distance: '42.2km', intensity: '3:50-3:55', basis: 'pace', rest: '20min', restType: 'walk', purpose: t('إنهاء الماراثون بالزمن المستهدف', 'Finish the marathon on target time'), component: 'aerobic', note: t('أول ١٠ كم مش أسرع من السرعة المستهدفة؛ ٦٠-٩٠ جم كربوهيدرات/ساعة؛ الحكم الحقيقي من كم ٣٠', 'First 10 km no faster than target; 60-90 g carbs per hour; the real race starts at km 30') },
        ...walkCD()
      ]
    },
    fm_str: distStr('adv'),
    fm_str_m: runStrMaint()
  }
};

/* =============================================================================
 * ١٢) جري الترايل — متوسط (١٢ أسبوع)
 * ============================================================================= */
const T_TRAIL_INT = {
  id: 'pt_trail_running_int',
  sport: 'trail_running',
  level: 'intermediate',
  title: t('جري الترايل — متوسط (١٢ أسبوع)', 'Trail running — intermediate (12 weeks)'),
  goal: t('التحضير لسباق ترايل ٢٥-٣٥ كم بارتفاع ١٠٠٠-١٥٠٠م: قوة صعود، تحكم في النزول، تحمل طويل على الرجلين (جري طويل متتالي)، وتغذية أثناء الجري.', 'Prepare for a 25-35 km trail race with 1000-1500 m of climbing: climbing strength, downhill control, long time on feet (back-to-back long runs) and in-race fuelling.'),
  components: ['aerobic', 'muscular_endurance', 'strength', 'balance', 'threshold'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: t('قاعدة هوائية على أرض متموجة، طلعات، عتبة، وقوة للرجلين والكاحل.', 'Aerobic base on rolling terrain, hills, threshold and leg and ankle strength.'),
      components: ['aerobic', 'muscular_endurance', 'strength', 'balance'],
      blocks: [
        {
          name: t('بلوك ١ — اختبار ودخول', 'Block 1 — Testing & entry'),
          goal: t('اختبار صعود ٣ كم (٢٠٠-٢٥٠م ارتفاع) لتحديد مستوى الصعود والنبض.', '3 km uphill time trial (200-250 m gain) to set climbing level and heart-rate zones.'),
          components: ['threshold', 'muscular_endurance'],
          loads: [4], weekTypes: ['test'],
          pattern: ['tr_easy', 'tr_test', 'tr_str', '', 'tr_easy', 'tr_long', '']
        },
        {
          name: t('بلوك ٢ — قاعدة وطلعات', 'Block 2 — Base & hills'),
          goal: t('طلعات ٣ دقايق، عتبة على أرض متموجة، وجري طويل ٢ ساعة.', '3-min hill repeats, rolling threshold and a 2-hour long run.'),
          components: ['aerobic', 'muscular_endurance', 'threshold'],
          loads: [5, 6, 4], weekTypes: ['load', 'shock', 'deload'],
          pattern: ['tr_easy', 'tr_hills', 'tr_str', '', 'tr_thresh', 'tr_long', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('صعود طويل ومشي قوي (باور هايك)، وجري طويل متتالي يومين، وقوة لامركزية للنزول.', 'Long climbs and power hiking, back-to-back long runs, and eccentric strength for descending.'),
      components: ['muscular_endurance', 'aerobic', 'strength'],
      blocks: [
        {
          name: t('بلوك ٣ — صعود وجري متتالي', 'Block 3 — Vert & back-to-back'),
          goal: t('٦٠٠-٩٠٠م صعود في تمرينة، طلعات، وجري طويل السبت + متوسط الأحد.', '600-900 m climbing in one session, hill repeats, and a Saturday long run + Sunday medium run.'),
          components: ['muscular_endurance', 'aerobic', 'strength'],
          loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['tr_easy', 'tr_vert', 'tr_str', '', 'tr_hills', 'tr_long', 'tr_b2b']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('محاكاة السباق: تكنيك نزول سريع، صعود طويل، وجري متتالي على أرض شبه السباق بالمعدات والتغذية.', 'Race simulation: fast downhill technique, long climbs and back-to-back runs on race-like terrain with race kit and fuelling.'),
      components: ['balance', 'muscular_endurance', 'aerobic', 'mental'],
      blocks: [
        {
          name: t('بلوك ٤ — محاكاة السباق', 'Block 4 — Race simulation'),
          goal: t('نزول تقني، صعود ٩٠٠-١٢٠٠م، وأطول جري طويل (٣-٣.٥ ساعة) ثم تخفيف.', 'Technical descending, 900-1200 m climbing and the longest long run (3-3.5 h) then a lighter week.'),
          components: ['balance', 'muscular_endurance', 'aerobic', 'mental'],
          loads: [7, 8, 5], weekTypes: ['load', 'shock', 'deload'],
          pattern: ['tr_easy', 'tr_downhill', 'tr_str_m', '', 'tr_vert', 'tr_long', 'tr_b2b']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('أسبوع السباق: حجم قليل، لمسة عتبة، ورجلين فريش.', 'Race week: low volume, a threshold touch and fresh legs.'),
      components: ['recovery', 'mental'],
      blocks: [
        {
          name: t('بلوك ٥ — أسبوع السباق', 'Block 5 — Race week'),
          goal: t('تجهيز المعدات والتغذية وتنفيذ خطة السباق.', 'Prepare kit and fuelling and execute the race plan.'),
          components: ['recovery', 'mental'],
          loads: [3], weekTypes: ['comp'],
          pattern: ['tr_easy', 'tr_thresh', 'tr_str_m', '', 'tr_shakeout', '', 'tr_race']
        }
      ]
    }
  ],
  sessions: {
    tr_test: {
      title: t('اختبار صعود ٣ كم', '3km uphill time trial'),
      goal: t('قياس قدرة الصعود والنبض عند العتبة لتحديد المناطق.', 'Measure climbing ability and threshold heart rate to set zones.'),
      components: ['threshold', 'muscular_endurance'],
      rpe: 9, duration: 70,
      items: [
        ...runWU(false),
        { kind: 'run', name: t('صعود ٣ كم (٢٠٠-٢٥٠م ارتفاع)', '3km climb (200-250 m gain)'), sets: 1, reps: '1', distance: '3km', intensity: '9', basis: 'rpe', rest: '15min', restType: 'walk', purpose: t('مرجع للصعود؛ متوسط النبض في آخر ١٠ دقايق ≈ نبض العتبة', 'Climbing reference; average HR over the last 10 min approximates threshold HR'), component: 'threshold', note: t('نفس الطريق في إعادة الاختبار؛ جري ومشي سريع مسموح', 'Same route for retests; running and power hiking allowed') },
        ...runCD()
      ]
    },
    tr_easy: easyRun({ title: t('جري سهل على ترايل', 'Easy trail run'), dur: '45-60min', dist: '8-10km', duration: 70, strides: 0, note: t('أرض متموجة؛ امشي في الطلعات الحادة عشان تفضل في Z2', 'Rolling terrain; walk the steep bits to stay in Z2') }),
    tr_long: longRun({
      title: t('الجري الطويل على ترايل', 'Long trail run'),
      goal: t('وقت طويل على الرجلين بأرض السباق، تجربة التغذية والمعدات.', 'Long time on feet on race-like terrain, rehearsing fuelling and kit.'),
      components: ['aerobic', 'muscular_endurance', 'balance'],
      dur: '2:00-3:30', dist: '18-30km', duration: 220, rpe: 6,
      note: t('٦٠٠-١٥٠٠م ارتفاع إجمالي؛ ٦٠-٩٠ جم كربوهيدرات/ساعة و٥٠٠-٧٠٠ مل مية/ساعة؛ مشي قوي في الطلعات الحادة', '600-1500 m total gain; 60-90 g carbs and 500-700 ml fluid per hour; power hike the steep climbs')
    }),
    tr_b2b: longRun({
      title: t('جري متتالي (اليوم التاني)', 'Back-to-back (day 2)'),
      goal: t('تحمل الجري على رجلين متعبة من اليوم السابق زي النص التاني من السباق.', 'Run on legs tired from the day before, as in the second half of a race.'),
      components: ['aerobic', 'muscular_endurance', 'mental'],
      dur: '75-100min', dist: '12-16km', duration: 110, rpe: 5,
      note: t('بشدة سهلة؛ ركز على تكنيك النزول وأنت متعب', 'Easy effort; focus on downhill technique while fatigued')
    }),
    tr_hills: {
      title: t('طلعات ٣ دقايق', '3-minute hill repeats'),
      goal: t('رفع قدرة الصعود والعتبة على المنحدرات.', 'Raise climbing power and threshold on gradients.'),
      components: ['muscular_endurance', 'threshold', 'vo2max'],
      rpe: 8, duration: 80,
      items: [
        ...runWU(false),
        { kind: 'run', libId: 'ad_hill_repeats', name: t('طلعات ٣ دقايق', '3-minute hill repeats'), sets: 1, reps: '6-8', duration: '3min', intensity: 'Z4', basis: 'hr', rest: '3min', restType: 'jog', purpose: t('قوة صعود وعتبة', 'Climbing strength and threshold'), component: 'muscular_endurance', note: t('انحدار ٨-١٢٪، النزول جري خفيف بتكنيك نضيف (خطوات قصيرة سريعة)', '8-12% gradient, easy jog down with clean technique (short quick steps)') },
        { kind: 'run', libId: 'ad_hill_sprint', sets: 1, reps: '4', distance: '40m', intensity: '9', basis: 'rpe', rest: '2min', restType: 'walk', purpose: t('قدرة وتجنيد ألياف', 'Power and fibre recruitment'), component: 'power' },
        ...runCD()
      ]
    },
    tr_thresh: {
      title: t('عتبة على أرض متموجة', 'Rolling threshold'),
      goal: t('رفع العتبة مع التعود على تغيير الإيقاع مع التضاريس.', 'Raise threshold while learning to adjust rhythm to terrain.'),
      components: ['threshold', 'aerobic'],
      rpe: 7, duration: 70,
      items: [
        ...runWU(false),
        { kind: 'run', libId: 'dr_tempo_run', name: t('١٠ دقايق على العتبة', '10 min at threshold'), sets: 1, reps: '3', duration: '10min', intensity: 'Z4', basis: 'hr', rest: '3min', restType: 'jog', purpose: t('تحمل على العتبة بالنبض مش السرعة', 'Threshold endurance by heart rate, not pace'), component: 'threshold', note: t('أسبوع السباق: ٢×٨ دقايق', 'Race week: 2x8 min') },
        ...runCD()
      ]
    },
    tr_vert: {
      title: t('صعود طويل ومشي قوي (فيرت)', 'Vert session: climbing & power hiking'),
      goal: t('تجميع ٦٠٠-١٢٠٠م صعود بمزيج جري ومشي قوي زي السباق.', 'Accumulate 600-1200 m of climbing with a race-like mix of running and power hiking.'),
      components: ['muscular_endurance', 'aerobic', 'strength'],
      rpe: 7, duration: 110,
      items: [
        W('جري سهل على أرض مسطحة', 'Easy jog on flat ground', { duration: '15min', intensity: 'Z2', basis: 'hr' }),
        { kind: 'run', name: t('صعود طويل (جري + مشي قوي)', 'Long climbs (run + power hike)'), sets: 1, reps: '4-5', duration: '10-12min', intensity: 'Z3', basis: 'hr', rest: '8min', restType: 'walk', purpose: t('قوة صعود وتحمل عضلي للفخذ والسمانة', 'Climbing strength and quad/calf muscular endurance'), component: 'muscular_endurance', note: t('انحدار ١٥-٢٥٪: امشي بقوة وإيدك على ركبتك أو بالعصيان؛ النزول مشي أو جري خفيف', '15-25% grade: power hike hands-on-knees or with poles; walk or jog down') },
        { kind: 'run', libId: 'dr_stair_intervals', name: t('بديل: سلالم أو تريدميل ١٥٪', 'Alternative: stairs or 15% treadmill'), sets: 1, reps: '6', duration: '5min', intensity: 'Z3', basis: 'hr', rest: '2min', restType: 'walk', purpose: t('صعود في المدينة لو مفيش جبل', 'Urban climbing when no mountain is available'), component: 'muscular_endurance', note: t('استخدم ده بدل البند اللي قبله لو مفيش طلعات طويلة', 'Use this in place of the previous item when no long climbs are available') },
        ...runCD()
      ]
    },
    tr_downhill: {
      title: t('تكنيك النزول وقوة لامركزية', 'Downhill technique & eccentric strength'),
      goal: t('نزول أسرع وأأمن بتقليل إجهاد الفخذ الأمامي: خطوات قصيرة سريعة، نظر ٣-٤م قدام، ودراعات للتوازن.', 'Faster, safer descending with less quad damage: short quick steps, eyes 3-4 m ahead and arms for balance.'),
      components: ['balance', 'technique', 'strength'],
      rpe: 7, duration: 75,
      items: [
        ...runWU(false),
        { kind: 'run', name: t('نزول متحكم فيه بسرعة', 'Controlled fast descents'), sets: 1, reps: '6-8', duration: '90s', intensity: '7', basis: 'rpe', rest: '3min', restType: 'walk', purpose: t('تكنيك وثقة في النزول', 'Descending technique and confidence'), component: 'technique', note: t('انحدار ٦-١٠٪ على ترايل ترابي؛ الطلوع مشي', '6-10% grade on a dirt trail; walk back up') },
        { kind: 'drill', libId: 'ad_single_leg_lateral_hop_and_stick', sets: 2, reps: '6/leg', rest: '60s', purpose: t('ثبات الكاحل والركبة على أرض غير مستوية', 'Ankle and knee stability on uneven ground'), component: 'balance' },
        { kind: 'strength', libId: 'wg_deficit_reverse_lunge', sets: 3, reps: '8/leg', intensity: '2', basis: 'rir', tempo: '3-0-1-0', rest: '90s', purpose: t('قوة لامركزية للفخذ الأمامي', 'Eccentric quad strength'), component: 'strength' },
        ...runCD()
      ]
    },
    tr_str: {
      title: t('قوة لعدائي الترايل', 'Trail runner strength'),
      goal: t('قوة صعود، قوة لامركزية للنزول، وثبات الكاحل والحوض على أرض غير مستوية.', 'Climbing strength, eccentric strength for descents, and ankle and hip stability on uneven ground.'),
      components: ['strength', 'balance', 'prevention', 'core'],
      rpe: 7, duration: 65,
      items: [
        ...gymWU(),
        { kind: 'strength', libId: 'ek_step_ups_with_dumbbells', sets: 4, reps: '8/leg', intensity: '2', basis: 'rir', tempo: '1-0-1-0', rest: '90s', purpose: t('قوة الصعود على رجل واحدة', 'Single-leg climbing strength'), component: 'strength', note: t('صندوق ٤٠-٥٠سم', '40-50 cm box') },
        { kind: 'strength', libId: 'ad_spanish_squat', sets: 3, reps: '10', intensity: '2', basis: 'rir', tempo: '4-0-1-0', rest: '90s', purpose: t('قوة لامركزية للفخذ ووقاية الركبة للنزول', 'Eccentric quad strength and knee protection for descents'), component: 'strength' },
        { kind: 'strength', libId: 'ex_single_leg_rdl', sets: 3, reps: '8/leg', intensity: '2', basis: 'rir', tempo: '3-0-1-0', rest: '60s', purpose: t('قوة الخلفية وتوازن', 'Hamstring strength and balance'), component: 'strength' },
        { kind: 'strength', libId: 'ex_lateral_lunge', sets: 2, reps: '8/side', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '60s', purpose: t('قوة جانبية للأرض الغير مستوية', 'Lateral strength for uneven terrain'), component: 'balance' },
        { kind: 'strength', libId: 'ad_bent_knee_soleus_raise', sets: 3, reps: '15/leg', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '60s', purpose: t('قدرة السمانة للطلعات الطويلة', 'Calf capacity for long climbs'), component: 'prevention' },
        { kind: 'strength', libId: 'ad_banded_ankle_eversion', sets: 2, reps: '15', intensity: '2', basis: 'rir', tempo: '1-1-2-0', rest: '45s', purpose: t('وقاية الكاحل من الالتواء', 'Ankle sprain prevention'), component: 'prevention' },
        { kind: 'strength', libId: 'ex_side_plank', sets: 2, reps: '30s/side', intensity: '7', basis: 'rpe', rest: '30s', purpose: t('ثبات الجذع الجانبي', 'Lateral trunk stiffness'), component: 'core' },
        ...gymCD()
      ]
    },
    tr_shakeout: easyRun({ title: t('جري تنشيط قبل السباق', 'Pre-race shake-out'), goal: t('تنشيط خفيف وتجربة المعدات النهائية.', 'Light activation and a final kit check.'), dur: '25-30min', duration: 40, strides: 4 }),
    tr_race: {
      title: t('يوم السباق — ترايل', 'Race day — trail'),
      goal: t('تنفيذ خطة المجهود بالنبض والتغذية والمشي في الطلعات الحادة.', 'Execute the effort plan by heart rate, fuelling, and power hiking steep climbs.'),
      components: ['aerobic', 'muscular_endurance', 'mental'],
      rpe: 9, duration: 240,
      items: [
        W('جري خفيف ١٠ دقايق + حركات مرونة', 'Easy jog 10 min + mobility moves', { duration: '15min' }),
        { kind: 'run', name: t('سباق ترايل ٢٥-٣٥ كم', '25-35 km trail race'), sets: 1, reps: '1', distance: '25-35km', intensity: 'Z3', basis: 'hr', rest: '20min', restType: 'walk', purpose: t('إنهاء السباق بمجهود موزع ونهاية قوية', 'Finish with well-distributed effort and a strong finish'), component: 'aerobic', note: t('أول ساعة أهدى من إحساسك؛ ٦٠-٩٠ جم كربوهيدرات/ساعة؛ امشي أي طلعة فوق ١٥٪', 'First hour easier than you feel; 60-90 g carbs per hour; hike anything steeper than 15%') },
        ...walkCD()
      ]
    },
    tr_str_m: runStrMaint()
  }
};

export const PLAN_TEMPLATES_RUN = [
  T_100_ADV, T_200_INT, T_400_ADV, T_SPEED_BEG, T_HURDLES_ADV, T_800_ADV, T_1500_INT,
  T_5K_BEG, T_10K_INT, T_HALF_INT, T_FULL_ADV, T_TRAIL_INT
];
