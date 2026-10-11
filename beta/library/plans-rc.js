/*
 * ADAM — قوالب مخطط موسمي لرياضات المضرب والرياضات القتالية
 * تنس، بادل، اسكواش، ريشة طائرة، تنس طاولة + ملاكمة، MMA، جودو، مصارعة، كاراتيه،
 * تايكوندو، كيك بوكسينج، سلاح. كل قالب موسم أو معسكر نزال كامل بفترات وبلوكات وأسابيع
 * وتمرينات مفصلة (شدة، حجم، راحة، هدف، العنصر البدني).
 * Validate: node tools/check-plans.js library/plans-rc.js
 */

/* ------------------------------------------------------------------ */
/* Helpers (internal)                                                   */
/* ------------------------------------------------------------------ */
const T = (ar, en) => ({ ar, en });
const clean = (o) => { Object.keys(o).forEach((k) => { if (o[k] === undefined) delete o[k]; }); return o; };
const ref = (x) => (typeof x === 'string' ? { libId: x } : { name: x });
const ses = (title, goal, components, rpe, duration, items) => ({ title, goal, components, rpe, duration, items });
/* strength: sets, reps, intensity, basis, rest */
const st = (x, sets, reps, intensity, basis, rest, purpose, component, extra) =>
  clean({ kind: 'strength', ...ref(x), sets, reps, intensity, basis, rest, purpose, component, ...(extra || {}) });
/* timed rounds / intervals: sets, reps, duration, intensity, basis, rest */
const tm = (x, sets, reps, duration, intensity, basis, rest, purpose, component, extra) =>
  clean({ kind: 'timed', ...ref(x), sets, reps, duration, intensity, basis, rest, purpose, component, ...(extra || {}) });
const dr = (x, o, purpose, component, extra) => clean({ kind: 'drill', ...ref(x), ...o, purpose, component, ...(extra || {}) });
const rn = (x, o, purpose, component, extra) => clean({ kind: 'run', ...ref(x), ...o, purpose, component, ...(extra || {}) });
const wu = (x, o) => clean({ kind: 'warmup', ...ref(x), ...(o || {}) });
const mob = (x, o) => clean({ kind: 'mobility', ...ref(x), ...(o || {}) });
const breathe = (min) => mob(T('تنفس بطني بطيء (٤ ثواني شهيق / ٦ ثواني زفير)', 'Slow diaphragmatic breathing (4s in / 6s out)'), { duration: min || '4min' });

/* ---------- Warm-ups & cool-downs ---------- */
const wuCourt = () => [
  wu('ex_jump_rope', { duration: '4min', note: T('نط خفيف على مشط القدم، وبعدين تبديل رجلين', 'Light bounces on the balls of the feet, then alternate-foot') }),
  wu('wg_worlds_greatest_stretch', { sets: 1, reps: '4/side' }),
  wu(T('تنشيط حركي للملعب: شافل، كاريوكا، سبليت ستيب، انطلاقات ٥م', 'Court movement prep: shuffles, carioca, split steps, 5m starts'), { duration: '6min' })
];
const wuShoulder = () => wu('ex_band_external_rotation', { sets: 2, reps: '15' });
const cdCourt = () => [
  mob(T('جري خفيف ومشي للتهدئة', 'Easy jog and walk-down'), { duration: '5min' }),
  mob('ad_sleeper_stretch', { sets: 2, duration: '40s', note: T('لكل كتف، من غير ألم', 'Each shoulder, pain-free range') }),
  mob('ad_90_90_hip_switches', { sets: 2, reps: '6/side' })
];
const wuGym = () => [
  wu('ex_stationary_bike', { duration: '6min' }),
  wu('wg_worlds_greatest_stretch', { sets: 1, reps: '3/side' }),
  wu('ex_band_pull_apart', { sets: 2, reps: '15' })
];
const cdGym = () => [
  mob('ad_open_book', { sets: 1, reps: '8/side' }),
  mob('ex_hip_flexor_stretch', { sets: 1, duration: '45s', note: T('لكل رجل', 'Each side') })
];
const wuStrike = () => [
  wu('ex_jump_rope', { duration: '6min', note: T('٢ × ٣ دقايق: خطوة بوكسر ثم تبديل رجلين', '2 x 3min: boxer skip then alternate-foot') }),
  wu(T('مرونة ديناميكية: لف الرقبة والكتف والحوض، زحف الدب، سبرول خفيف', 'Dynamic mobility: neck/shoulder/hip CARs, bear crawl, easy sprawls'), { duration: '6min' }),
  wu('ad_shadow_boxing', { sets: 2, duration: '3min', note: T('إيقاع متدرج، تركيز على القدمين والجارد', 'Build the tempo, focus on feet and guard') })
];
const wuGrap = () => [
  wu(T('جري خفيف حوالين التاتامي مع تنويعات حركية', 'Easy mat jog with movement variations'), { duration: '5min' }),
  wu(T('سقطات (أوكيمي) ولفات أمامي وخلفي', 'Breakfalls (ukemi) and forward/backward rolls'), { duration: '4min' }),
  wu(T('شريمب، كوبري، دخول ونزول سبرول', 'Shrimps, bridges, sprawl-to-stance'), { duration: '4min' })
];
const cdCombat = () => [
  mob('ex_neck_stretch', { sets: 1, duration: '60s' }),
  mob('ad_pigeon_stretch', { sets: 1, duration: '60s', note: T('لكل رجل', 'Each side') }),
  breathe()
];

/* ---------- Prehab items ---------- */
const PH = {
  cuff: () => st('ad_side_lying_external_rotation', 3, '12/side', '2', 'rir', '45s',
    T('تقوية الكفة المدورة للتحكم في فرملة الدراع بعد الضربة', 'Rotator-cuff strength to decelerate the arm after hitting'), 'prevention', { tempo: '2-1-2-0' }),
  ytw: () => st('wg_prone_y_raise', 2, '10', '2', 'rir', '45s',
    T('تقوية أسفل الترابيس وثبات لوح الكتف', 'Lower-trap and scapular control'), 'prevention', { tempo: '2-2-2-0' }),
  wrist: () => st('ad_eccentric_wrist_extension', 3, '15', '3', 'rir', '45s',
    T('وقاية من التهاب الأوتار الخارجي للكوع (كوع التنس)', 'Protects against lateral elbow tendinopathy (tennis elbow)'), 'prevention', { tempo: '4-0-1-0' }),
  calf: () => st('ad_eccentric_heel_drop', 3, '12/leg', '7', 'rpe', '45s',
    T('وقاية وتر أكيليس والسمانة مع الانطلاقات والوقفات المفاجئة', 'Achilles and calf resilience for sudden starts and stops'), 'prevention', { tempo: '3-0-1-0' }),
  groin: () => st('ex_copenhagen_plank', 3, '20s/side', '7', 'rpe', '45s',
    T('تقوية المقربات ضد شد الضامة في الطعنات الواسعة', 'Adductor strength against groin strain in wide lunges'), 'prevention'),
  knee: () => st('ad_spanish_squat', 4, '45s', '7', 'rpe', '60s',
    T('تحميل ثابت لوتر الرضفة وتقليل ألم الركبة', 'Isometric patellar-tendon loading, reduces knee pain'), 'prevention'),
  neck: () => st('ek_static_neck_flexion_and_extension', 3, '15s/direction', '6', 'rpe', '45s',
    T('رقبة قوية بتمتص الضربات وتحمي من الارتجاج', 'A strong neck absorbs impacts and lowers concussion risk'), 'prevention'),
  neckSide: () => st('ek_static_neck_side_flexion', 3, '15s/side', '6', 'rpe', '45s',
    T('ثبات الرقبة الجانبي في الكلنش والسيطرة', 'Lateral neck strength for clinch and control'), 'prevention'),
  grip: () => st('wg_towel_pull_up', 3, '5-6', '2', 'rir', '2min',
    T('قوة القبضة والسحب زي مسكة البدلة', 'Grip and pulling strength that mimics gripping the gi'), 'strength'),
  ankle: () => st('ad_single_leg_balance_progression', 2, '30s/leg', '6', 'rpe', '30s',
    T('ثبات الكاحل والوقاية من الالتواء', 'Ankle stability and sprain prevention'), 'balance'),
  ham: () => st('ex_nordic_hamstring_curl', 3, '4-6', '8', 'rpe', '90s',
    T('وقاية من شد الخلفية مع الطعن والانطلاق', 'Hamstring-strain prevention for lunging and sprinting'), 'prevention', { tempo: '4-0-X-0' }),
  core: () => st('wg_pallof_press', 3, '10/side', '7', 'rpe', '45s',
    T('ثبات الجذع ضد الدوران لنقل القوة من الرجلين للدراع', 'Anti-rotation core to transfer force from legs to arm'), 'core'),
  back: () => st('ex_side_plank', 3, '30s/side', '7', 'rpe', '45s',
    T('تحمل عضلات الجذع الجانبية وحماية أسفل الضهر', 'Lateral trunk endurance and lower-back protection'), 'core')
};

/* ---------- Gym sessions: racket ---------- */
function gymRacket(phase, prehab) {
  const pre = prehab.map((f) => f());
  if (phase === 'base') {
    return ses(T('جيم — قوة عامة وتحمل عضلي', 'Gym — general strength & work capacity'),
      T('بناء قوة الرجلين والجذع بحجم متوسط وتكنيك مضبوط قبل التحويل للقدرة', 'Build leg and trunk strength with moderate volume and strict technique before converting to power'),
      ['strength', 'hypertrophy', 'core', 'prevention'], 6, 70, [
        ...wuGym(),
        st('ex_barbell_back_squat', 3, '8', '65-70', '1rm', '2min', T('قوة أساسية للرجلين لتحمل الطعنات والوقفات', 'Foundational leg strength for lunges and braking'), 'strength', { tempo: '3-1-1-0' }),
        st('ex_romanian_deadlift', 3, '8', '65', '1rm', '2min', T('سلسلة خلفية قوية وحماية الخلفية', 'Posterior-chain strength and hamstring protection'), 'strength', { tempo: '3-0-1-0' }),
        st('ex_lateral_lunge', 3, '8/side', '7', 'rpe', '75s', T('قوة جانبية للوصول للكرات الواسعة', 'Lateral strength to reach wide balls'), 'strength', { tempo: '2-1-1-0' }),
        st('ex_one_arm_dumbbell_row', 3, '10/side', '2', 'rir', '75s', T('توازن عضلات الضهر مع عضلات الضرب الأمامية', 'Balances the back against the dominant hitting muscles'), 'hypertrophy'),
        st('wg_landmine_press', 3, '8/side', '2', 'rir', '75s', T('دفع فوق الراس بزاوية آمنة للكتف', 'Shoulder-friendly overhead pressing'), 'strength'),
        PH.core(),
        ...pre,
        ...cdGym()
      ]);
  }
  if (phase === 'max') {
    return ses(T('جيم — قوة قصوى', 'Gym — maximal strength'),
      T('رفع القوة القصوى بحجم أقل وشدة أعلى كأساس للانفجارية', 'Raise maximal strength with lower volume and higher intensity as the base for power'),
      ['max_strength', 'strength', 'core', 'prevention'], 7, 70, [
        ...wuGym(),
        st('ex_barbell_back_squat', 4, '5', '80-85', '1rm', '3min', T('قوة قصوى للرجلين', 'Maximal leg strength'), 'max_strength', { tempo: '2-1-X-0' }),
        st('ex_bulgarian_split_squat', 3, '6/leg', '8', 'rpe', '2min', T('قوة الرجل الواحدة زي وضع الطعنة', 'Single-leg strength in a lunge-like position'), 'strength', { tempo: '2-0-X-0' }),
        st('wg_weighted_pull_up', 4, '5', '8', 'rpe', '2min', T('قوة سحب وثبات لوح الكتف', 'Pulling strength and scapular stability'), 'strength'),
        st('ek_one_arm_bench_press', 3, '6/side', '8', 'rpe', '90s', T('دفع بدراع واحدة مع ثبات الجذع', 'Unilateral pressing with trunk control'), 'strength'),
        st('ad_landmine_rotation', 3, '6/side', '7', 'rpe', '75s', T('قوة دورانية من الحوض للكتف زي حركة الضربة', 'Hip-to-shoulder rotational strength like a stroke'), 'core'),
        ...pre,
        ...cdGym()
      ]);
  }
  if (phase === 'power') {
    return ses(T('جيم — قدرة انفجارية وتباين', 'Gym — power & contrast'),
      T('تحويل القوة لسرعة انفجارية في الخطوة الأولى والضربة', 'Convert strength into first-step and stroke explosiveness'),
      ['power', 'max_strength', 'agility', 'core'], 7, 65, [
        ...wuGym(),
        st('ad_hang_power_clean', 4, '3', '70-75', '1rm', '2min', T('إنتاج قدرة بالامتداد الثلاثي', 'Triple-extension power production'), 'power', { note: T('سرعة البار أهم من الوزن', 'Bar speed over load') }),
        st('ad_trap_bar_deadlift_to_broad_jump_contrast', 3, '3 + 3 jumps', '85', '1rm', '3min', T('تباين ثقيل ثم نط لتنشيط الجهاز العصبي', 'Heavy-then-jump contrast for post-activation potentiation'), 'power'),
        st('ad_lateral_bound_and_stick', 3, '4/side', '8', 'rpe', '90s', T('انفجارية جانبية مع ثبات في الهبوط', 'Lateral explosiveness with a stable landing'), 'power'),
        st('ad_medicine_ball_rotational_throw', 4, '5/side', '9', 'rpe', '60s', T('قدرة دورانية للفورهاند والباكهاند', 'Rotational power for forehand and backhand'), 'power', { note: T('كرة ٣-٤ كجم، أقصى سرعة', '3-4kg ball, maximal intent') }),
        st('ad_medicine_ball_soccer_throw', 3, '6', '9', 'rpe', '60s', T('قدرة فوق الراس للإرسال والسماش', 'Overhead power for serve and smash'), 'power', { note: T('كرة ٢-٣ كجم', '2-3kg ball') }),
        ...pre,
        ...cdGym()
      ]);
  }
  return ses(T('جيم — صيانة في الموسم', 'Gym — in-season maintenance'),
    T('الحفاظ على القوة والانفجارية بأقل تعب ممكن بين الماتشات', 'Maintain strength and power with minimal fatigue between matches'),
    ['max_strength', 'power', 'prevention'], 6, 45, [
      ...wuGym(),
      st('wg_trap_bar_deadlift', 3, '3', '80-85', '1rm', '3min', T('صيانة القوة القصوى بحجم قليل', 'Maintain maximal strength at low volume'), 'max_strength', { tempo: '1-0-X-0' }),
      dr('ad_countermovement_jump', { sets: 3, reps: '3', rest: '90s' }, T('صيانة الانفجارية ومتابعة الجاهزية', 'Maintain power and monitor readiness'), 'power'),
      st('ex_bulgarian_split_squat', 2, '5/leg', '7', 'rpe', '90s', T('قوة الرجل الواحدة', 'Single-leg strength'), 'strength'),
      st('ad_medicine_ball_rotational_throw', 3, '4/side', '8', 'rpe', '60s', T('صيانة القدرة الدورانية', 'Maintain rotational power'), 'power'),
      ...pre,
      ...cdGym()
    ]);
}

/* ---------- Gym sessions: combat ---------- */
function gymCombat(phase, prehab) {
  const pre = prehab.map((f) => f());
  if (phase === 'base') {
    return ses(T('جيم — قوة عامة وتحمل عضلي', 'Gym — general strength & work capacity'),
      T('قاعدة قوة للجسم كله وتقوية الأوتار والرقبة قبل الأحمال العالية', 'Whole-body strength base and tissue/neck conditioning before heavy loading'),
      ['strength', 'hypertrophy', 'muscular_endurance', 'prevention'], 6, 70, [
        ...wuGym(),
        st('ex_barbell_back_squat', 3, '8', '65-70', '1rm', '2min', T('قوة الرجلين الأساسية', 'Foundational leg strength'), 'strength', { tempo: '3-1-1-0' }),
        st('ex_romanian_deadlift', 3, '8', '65', '1rm', '2min', T('سلسلة خلفية قوية للثبات والدفع', 'Posterior chain for posture and drive'), 'strength', { tempo: '3-0-1-0' }),
        st('ex_dumbbell_bench_press', 3, '10', '2', 'rir', '90s', T('قوة الدفع الأفقي', 'Horizontal pushing strength'), 'hypertrophy', { tempo: '2-0-1-0' }),
        st('ex_pullup', 4, '6-8', '2', 'rir', '90s', T('قوة سحب وتوازن الكتف', 'Pulling strength and shoulder balance'), 'strength'),
        st('ex_farmers_carry', 3, '30m', '7', 'rpe', '75s', T('قبضة وجذع تحت الحمل', 'Grip and trunk under load'), 'muscular_endurance'),
        ...pre,
        ...cdGym()
      ]);
  }
  if (phase === 'max') {
    return ses(T('جيم — قوة قصوى', 'Gym — maximal strength'),
      T('رفع القوة القصوى بحجم معتدل عشان ما يأثرش على الشغل الفني والسبارينج', 'Raise maximal strength at moderate volume so it does not compromise skill and sparring work'),
      ['max_strength', 'strength', 'core', 'prevention'], 7, 70, [
        ...wuGym(),
        st('wg_trap_bar_deadlift', 4, '4', '82-87', '1rm', '3min', T('قوة قصوى للجسم كله بأمان على الضهر', 'Whole-body maximal strength with a spine-friendly lift'), 'max_strength', { tempo: '1-0-X-0' }),
        st('ex_front_squat', 3, '5', '78-82', '1rm', '3min', T('قوة الرجلين مع جذع مستقيم', 'Leg strength with an upright torso'), 'max_strength', { tempo: '2-1-X-0' }),
        st('ex_barbell_bench_press', 4, '5', '80', '1rm', '2min', T('قوة الدفع القصوى', 'Maximal pushing strength'), 'max_strength'),
        st('wg_weighted_pull_up', 4, '5', '8', 'rpe', '2min', T('قوة السحب القصوى', 'Maximal pulling strength'), 'max_strength'),
        st('ad_landmine_rotation', 3, '6/side', '7', 'rpe', '75s', T('قوة دورانية لنقل القوة من الأرض للضربة', 'Rotational strength to transfer force from the ground'), 'core'),
        ...pre,
        ...cdGym()
      ]);
  }
  if (phase === 'power') {
    return ses(T('جيم — قدرة انفجارية وتباين', 'Gym — power & contrast'),
      T('تحويل القوة لقدرة انفجارية في الضرب والدخول والإسقاط', 'Convert strength into explosive striking, entries and throws'),
      ['power', 'max_strength', 'speed', 'core'], 7, 65, [
        ...wuGym(),
        st('ad_hang_power_clean', 5, '3', '70-75', '1rm', '2min', T('قدرة الامتداد الثلاثي', 'Triple-extension power'), 'power', { note: T('سرعة البار أهم من الوزن', 'Bar speed over load') }),
        st('ad_trap_bar_deadlift_to_broad_jump_contrast', 3, '3 + 3 jumps', '85', '1rm', '3min', T('تباين ثقيل ثم نط لتنشيط الجهاز العصبي', 'Heavy-then-jump contrast for potentiation'), 'power'),
        st('ad_bench_press_to_plyo_push_up_contrast', 3, '3 + 5', '80', '1rm', '3min', T('انفجارية الدفع للّكمات والدفع', 'Explosive pushing for punches and frames'), 'power'),
        st('ad_medicine_ball_rotational_throw', 4, '5/side', '9', 'rpe', '60s', T('قدرة دورانية للضربات والرمي', 'Rotational power for strikes and throws'), 'power', { note: T('كرة ٣-٥ كجم، أقصى سرعة', '3-5kg ball, maximal intent') }),
        ...pre,
        ...cdGym()
      ]);
  }
  return ses(T('جيم — صيانة وتهدئة', 'Gym — maintenance & taper'),
    T('الحفاظ على القوة والسرعة بأقل تعب قبل النزال', 'Keep strength and speed with minimal fatigue before competition'),
    ['max_strength', 'power', 'prevention'], 5, 45, [
      ...wuGym(),
      st('wg_trap_bar_deadlift', 3, '2', '80-85', '1rm', '3min', T('صيانة القوة القصوى بحجم قليل جدا', 'Maintain maximal strength at very low volume'), 'max_strength', { tempo: '1-0-X-0' }),
      dr('ad_countermovement_jump', { sets: 3, reps: '3', rest: '90s' }, T('صيانة الانفجارية ومتابعة الجاهزية', 'Maintain power and monitor readiness'), 'power'),
      st('ad_medicine_ball_chest_pass', 3, '5', '8', 'rpe', '60s', T('سرعة الدفع', 'Pushing speed'), 'power'),
      st('wg_weighted_pull_up', 2, '4', '7', 'rpe', '2min', T('صيانة قوة السحب', 'Maintain pulling strength'), 'strength'),
      ...pre,
      ...cdGym()
    ]);
}

/* ---------- Recovery session ---------- */
function recovery(extra) {
  return ses(T('استشفاء نشط ومرونة', 'Active recovery & mobility'),
    T('تسريع الاستشفاء وتحسين المدى الحركي من غير ما نزود التعب', 'Speed up recovery and restore range of motion without adding fatigue'),
    ['recovery', 'mobility', 'aerobic'], 3, 45, [
      tm('ex_stationary_bike', 1, '1', '25min', 'Z1-Z2', 'hr', undefined, T('دورة دموية بتشيل التعب من غير حمل', 'Flush circulation without adding load'), 'recovery'),
      mob('ad_foam_roller_thoracic_extension', { sets: 1, duration: '2min' }),
      mob('ad_90_90_hip_switches', { sets: 2, reps: '8/side' }),
      mob('ex_hamstring_stretch', { sets: 2, duration: '45s' }),
      ...(extra || []),
      breathe('5min')
    ]);
}

/* ---------- Test sessions ---------- */
function racketTest(specific) {
  return ses(T('اختبارات بدنية وتقييم', 'Physical testing & profiling'),
    T('قياس القدرة والسرعة والرشاقة والتحمل عشان نحدد الأحمال ونتابع التقدم', 'Measure power, speed, agility and endurance to set loads and track progress'),
    ['power', 'acceleration', 'agility', 'aerobic'], 6, 80, [
      ...wuCourt(),
      dr('ad_countermovement_jump', { sets: 1, reps: '3', rest: '60s' }, T('قياس قدرة الرجلين (أحسن محاولة)', 'Lower-body power (best of 3)'), 'power'),
      dr('ad_10_m_sprint_test', { sets: 1, reps: '3', rest: '2min' }, T('قياس الخطوة الأولى والتسارع', 'First-step speed and acceleration'), 'acceleration'),
      dr('ad_505_agility_test', { sets: 1, reps: '2/side', rest: '2min' }, T('قياس تغيير الاتجاه لليمين والشمال', 'Change of direction both sides'), 'agility'),
      specific,
      dr('ad_medicine_ball_rotational_throw', { sets: 1, reps: '3/side', rest: '60s' }, T('قياس القدرة الدورانية (مسافة الرمية)', 'Rotational power (throw distance)'), 'power', { note: T('كرة ٣ كجم، سجل أحسن رمية لكل جهة', '3kg ball, record best throw each side') }),
      dr('ad_yo_yo_intermittent_recovery_test_level_1', { sets: 1, reps: '1' }, T('قياس التحمل المتقطع زي طبيعة النقاط', 'Intermittent endurance matching point play'), 'aerobic'),
      mob(T('مشي وإطالات خفيفة', 'Walk and light stretching'), { duration: '6min' })
    ]);
}
function combatTest(specific, grip) {
  return ses(T('اختبارات بدنية وقياس الوزن', 'Physical testing & weight check'),
    T('قياس القدرة والقوة والتحمل ومتابعة الوزن وتكوين الجسم في بداية المرحلة', 'Measure power, strength and endurance and log body mass/composition at the start of the phase'),
    ['power', 'strength', 'aerobic', 'anaerobic'], 6, 80, [
      wu('ex_jump_rope', { duration: '5min', note: T('قبلها: وزن الصبح على الريق وتسجيل تكوين الجسم (InBody)', 'Before: fasted morning weight and body composition (InBody)') }),
      wu('wg_worlds_greatest_stretch', { sets: 1, reps: '4/side' }),
      dr('ad_countermovement_jump', { sets: 1, reps: '3', rest: '60s' }, T('قدرة الرجلين', 'Lower-body power'), 'power'),
      dr('ad_seated_medicine_ball_chest_throw_test', { sets: 1, reps: '3', rest: '60s' }, T('قدرة الدفع لأعلى الجسم', 'Upper-body pushing power'), 'power'),
      dr('ad_max_pull_up_test', { sets: 1, reps: 'max' }, T('قوة تحمل السحب', 'Pulling strength endurance'), 'muscular_endurance'),
      ...(grip ? [dr('ad_grip_dynamometer_test', { sets: 1, reps: '3/hand' }, T('قوة القبضة لكل إيد', 'Grip strength each hand'), 'strength')] : []),
      specific,
      dr('ad_2_4_km_run_test', { sets: 1, reps: '1' }, T('قياس القاعدة الهوائية', 'Aerobic base'), 'aerobic'),
      mob(T('مشي وإطالات خفيفة', 'Walk and light stretching'), { duration: '6min' })
    ]);
}

/* ================================================================== */
/* RACKET SPORTS                                                        */
/* ================================================================== */

/* ---------------- Tennis ---------------- */
const tennis = {
  id: 'pt_tennis_season_int',
  sport: 'tennis',
  level: 'intermediate',
  title: T('موسم تنس — مستوى متوسط (من الإعداد للبطولات)', 'Tennis season — intermediate (pre-season to tournaments)'),
  goal: T('بناء قاعدة هوائية وقوة عامة، وتحويلها لسرعة حركة ورشاقة وقدرة في الضربات، والوصول لقمة الأداء في فترة البطولات مع حماية الكتف والكوع.',
    'Build an aerobic and strength base, convert it into court speed, agility and stroke power, and peak for the tournament block while protecting shoulder and elbow.'),
  components: ['agility', 'speed', 'power', 'aerobic', 'anaerobic', 'technique', 'tactics', 'prevention'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: T('قاعدة هوائية وقوة عامة وتثبيت التكنيك الأساسي', 'Aerobic base, general strength and grooving core technique'),
      components: ['aerobic', 'strength', 'technique', 'coordination', 'prevention'],
      blocks: [
        {
          name: T('أسبوع ١ — اختبارات', 'Week 1 — Testing'),
          goal: T('قياس المستوى البدني وتحديد الأحمال', 'Profile the player and set training loads'),
          components: ['power', 'agility', 'aerobic'],
          loads: [3], weekTypes: ['test'],
          pattern: ['test', 'tech', 'recovery', 'tech', 'gym_base', '', '']
        },
        {
          name: T('بلوك ١ — قاعدة عامة', 'Block 1 — General base'),
          goal: T('رفع التحمل الهوائي والقوة العامة وحجم ضربات عالي بشدة متوسطة', 'Raise aerobic endurance and general strength with high stroke volume at moderate intensity'),
          components: ['aerobic', 'strength', 'technique', 'coordination'],
          loads: [4, 5, 6, 3], weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['tech', 'gym_base', 'base_cond', 'tech', 'gym_base', 'base_cond', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: T('قوة قصوى ولياقة خاصة على الملعب بنسبة شغل وراحة زي النقاط', 'Maximal strength and on-court conditioning with point-like work:rest'),
      components: ['max_strength', 'agility', 'anaerobic', 'technique', 'tactics'],
      blocks: [
        {
          name: T('بلوك ٢ — قوة ولياقة خاصة', 'Block 2 — Strength & specific fitness'),
          goal: T('قوة قصوى في الجيم وفترات حركة على الملعب ١٥ ث / ٢٥ ث', 'Maximal strength in the gym and 15s/25s on-court movement intervals'),
          components: ['max_strength', 'agility', 'anaerobic', 'technique'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['tech', 'gym_max', 'court_cond', 'tech', 'gym_max', 'match', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: T('تحويل القوة لقدرة وسرعة، ولعب ماتشات تدريبية بأهداف تكتيكية', 'Convert strength to power and speed, with tactical practice matches'),
      components: ['power', 'speed', 'agility', 'tactics', 'mental'],
      blocks: [
        {
          name: T('بلوك ٣ — قدرة وماتشات', 'Block 3 — Power & match play'),
          goal: T('أعلى جودة حركة وقدرة، وزيادة اللعب تحت ضغط', 'Top movement quality and power, more play under pressure'),
          components: ['power', 'agility', 'anaerobic', 'tactics'],
          loads: [6, 7], weekTypes: ['load', 'shock'],
          pattern: ['court_cond', 'gym_power', 'tech', 'match', 'gym_power', 'match', 'recovery']
        },
        {
          name: T('أسبوع إعادة اختبار وتخفيف', 'Re-test & unload week'),
          goal: T('قياس التقدم وتخفيف الحمل قبل البطولات', 'Measure progress and unload before tournaments'),
          components: ['power', 'agility', 'recovery'],
          loads: [4], weekTypes: ['test'],
          pattern: ['test', 'tech', 'recovery', 'court_cond', 'match', '', '']
        }
      ]
    },
    {
      type: 'comp',
      goal: T('الحفاظ على الحدة البدنية والاستشفاء بين الماتشات خلال البطولات', 'Maintain physical sharpness and recover between matches during tournaments'),
      components: ['power', 'agility', 'tactics', 'recovery', 'mental'],
      blocks: [
        {
          name: T('بلوك ٤ — بطولات', 'Block 4 — Tournaments'),
          goal: T('صيانة القوة والقدرة بأقل تعب وتركيز على جودة اللعب', 'Maintain strength and power with minimal fatigue, focus on quality of play'),
          components: ['power', 'agility', 'tactics', 'recovery'],
          loads: [6, 5, 6, 4], weekTypes: ['comp', 'comp', 'comp', 'deload'],
          pattern: ['tech', 'gym_maint', 'court_cond', 'recovery', 'match', 'match', '']
        }
      ]
    }
  ],
  sessions: {
    test: racketTest(tm(T('اختبار دريل العنكبوت (٥ أقماع)', 'Spider drill test (5 cones)'), 1, '2', '18s', '100', 'best', '3min', T('رشاقة خاصة بحركة التنس في الخط الخلفي', 'Tennis-specific baseline agility'), 'agility')),
    tech: ses(T('تكنيك على الملعب — ضربات أرضية وإرسال', 'On-court technique — groundstrokes & serve'),
      T('ثبات الضربات والعمق والدقة في الإرسال والاستقبال', 'Stroke consistency, depth, and serve/return accuracy'),
      ['technique', 'coordination', 'aerobic'], 5, 90, [
        ...wuCourt(), wuShoulder(),
        dr(T('رالي كروس كورت فورهاند — العمق بعد خط الإرسال', 'Cross-court forehand rally — depth past the service line'), { sets: 4, duration: '5min', rest: '1min' },
          T('ثبات الضربة والعمق بإيقاع متوسط', 'Stroke consistency and depth at moderate tempo'), 'technique'),
        dr(T('باكهاند كروس ثم تغيير داون ذا لاين', 'Backhand cross-court then change down the line'), { sets: 4, duration: '5min', rest: '1min' },
          T('التحكم في الاتجاه وتوقيت تغيير الخط', 'Directional control and timing of the line change'), 'technique'),
        dr(T('إرسال أول وتاني على أهداف (T / واسع / على الجسم)', 'First and second serves to targets (T / wide / body)'), { sets: 4, reps: '12', rest: '90s' },
          T('دقة الإرسال ونسبة دخول الإرسال الأول', 'Serve accuracy and first-serve percentage'), 'technique', { note: T('سجل النسبة، الهدف ٦٠٪ أو أكتر في الإرسال الأول', 'Log the percentage, target 60%+ first serves in') }),
        dr(T('استقبال إرسال بلوك وعمق للنص', 'Return of serve — block and deep middle'), { sets: 3, reps: '10', rest: '60s' },
          T('استقبال آمن وعميق يحيد ميزة المرسل', 'Safe, deep returns that neutralise the server'), 'technique'),
        dr(T('اقتراب + فولي + سماش (أنماط)', 'Approach + volley + overhead (patterns)'), { sets: 3, reps: '8', rest: '60s' },
          T('إنهاء النقطة عند الشبكة', 'Finishing points at the net'), 'tactics'),
        ...cdCourt()
      ]),
    base_cond: ses(T('قاعدة هوائية وحركة قدمين', 'Aerobic base & footwork'),
      T('رفع القدرة الهوائية لتسريع الاستشفاء بين النقاط والماتشات', 'Raise aerobic capacity to recover faster between points and matches'),
      ['aerobic', 'coordination', 'agility'], 6, 70, [
        wu('ad_jog_in_place', { duration: '4min' }), wu('ex_leg_swings', { sets: 1, reps: '10/direction' }), wu('ad_a_skip', { sets: 2, distance: '20m' }),
        dr('dr_ladder_lateral', { sets: 4, reps: '2' }, T('إيقاع القدمين والتوافق الجانبي', 'Foot rhythm and lateral coordination'), 'coordination'),
        dr('dr_ladder_icky', { sets: 4, reps: '2' }, T('سرعة القدمين والتوافق', 'Foot speed and coordination'), 'coordination'),
        rn(T('جري فترات هوائي', 'Aerobic interval run'), { sets: 1, reps: '4', duration: '6min', intensity: 'Z3', basis: 'hr', rest: '2min', restType: 'jog' },
          T('رفع العتبة الهوائية بحمل متوسط', 'Raise aerobic threshold at moderate load'), 'aerobic'),
        tm(T('رالي متواصل كروس كورت بإيقاع ثابت', 'Continuous cross-court rally at steady tempo'), 3, '1', '6min', '6', 'rpe', '2min',
          T('تحمل هوائي خاص بالملعب مع حجم ضربات', 'Court-specific aerobic work with stroke volume'), 'aerobic'),
        rn('dr_tempo_run', { sets: 1, reps: '10', distance: '100m', intensity: '70', basis: 'vmax', rest: '45s', restType: 'walk' },
          T('تيمبو ممتد لتحسين الاستشفاء', 'Extensive tempo to improve recovery capacity'), 'aerobic'),
        mob('ex_hamstring_stretch', { sets: 1, duration: '45s' }), mob('ex_calf_stretch', { sets: 1, duration: '45s' })
      ]),
    court_cond: ses(T('لياقة خاصة على الملعب — حركة وفترات نقاط', 'On-court conditioning — movement & point intervals'),
      T('تحمل لاهوائي متكرر ورشاقة بنسبة شغل وراحة زي الماتش', 'Repeated anaerobic efforts and agility at match-like work:rest'),
      ['agility', 'anaerobic', 'reaction', 'speed'], 8, 75, [
        ...wuCourt(),
        dr('dr_ladder_icky', { sets: 3, reps: '2' }, T('تجهيز القدمين قبل الشغل السريع', 'Prime the feet before fast work'), 'coordination'),
        tm(T('دريل العنكبوت (سبايدر) — ٥ أقماع', 'Spider drill — 5 cones'), 1, '6', '18s', '95', 'best', '60s',
          T('رشاقة خاصة بالخط الخلفي وتغيير الاتجاه', 'Baseline-specific agility and change of direction'), 'agility', { restType: 'passive' }),
        tm(T('فترات الخط الخلفي: يمين وشمال بتغذية المدرب', 'Baseline side-to-side intervals: coach-fed'), 3, '8', '15s', '9', 'rpe', '25s',
          T('محاكاة زمن النقطة (٥-١٥ ث) ونسبة الشغل للراحة في الماتش', 'Replicates point duration (5-15s) and match work:rest'), 'anaerobic', { setRest: '3min' }),
        dr('ad_split_step_to_lunge_reaction', { sets: 3, reps: '6/side', rest: '45s' }, T('توقيت السبليت ستيب ورد الفعل للكرة', 'Split-step timing and reaction to the ball'), 'reaction'),
        rn('dr_cone_5_10_5', { sets: 1, reps: '6', distance: '20m', intensity: '95', basis: 'best', rest: '75s', restType: 'walk' },
          T('فرملة وانطلاق سريع', 'Fast braking and re-acceleration'), 'agility'),
        ...cdCourt()
      ]),
    match: ses(T('ماتشات تدريبية بأهداف تكتيكية', 'Practice matches with tactical themes'),
      T('تطبيق الخطط تحت ضغط النتيجة وتجهيز نفسي للبطولة', 'Apply game plans under score pressure and build match toughness'),
      ['tactics', 'mental', 'anaerobic', 'technique'], 7, 105, [
        ...wuCourt(), wuShoulder(),
        dr(T('نقاط بسيناريو: الإرسال + الضربة التالتة', 'Scenario points: serve + third ball'), { sets: 3, reps: '10 points', rest: '2min' },
          T('بناء النقطة من الإرسال', 'Building the point from the serve'), 'tactics'),
        dr(T('ألعاب تاي بريك لـ ٧ نقاط', 'Tiebreak games to 7'), { sets: 4, reps: '1', rest: '2min' },
          T('اتخاذ القرار تحت الضغط', 'Decision-making under pressure'), 'mental'),
        dr(T('ست تدريبي كامل بقواعد الماتش', 'Full practice set under match rules'), { sets: 1, reps: '1 set', duration: '45min' },
          T('تطبيق خطة اللعب ضد الخصم', 'Execute the game plan against an opponent'), 'tactics', { note: T('راحة ٩٠ ث عند تغيير الملعب، مياه وكربوهيدرات', '90s at change of ends, fluids and carbohydrate') }),
        ...cdCourt()
      ]),
    gym_base: gymRacket('base', [PH.cuff, PH.wrist]),
    gym_max: gymRacket('max', [PH.cuff, PH.wrist]),
    gym_power: gymRacket('power', [PH.cuff, PH.calf]),
    gym_maint: gymRacket('maint', [PH.cuff, PH.wrist]),
    recovery: recovery([mob('ad_sleeper_stretch', { sets: 2, duration: '40s' })])
  }
};

/* ---------------- Padel ---------------- */
const padel = {
  id: 'pt_padel_season_int',
  sport: 'padel',
  level: 'intermediate',
  title: T('موسم بادل — مستوى متوسط', 'Padel season — intermediate'),
  goal: T('بناء قاعدة بدنية ثم رفع سرعة التحرك الجانبي والرجوع للخلف ولعب الحيطة والضربات فوق الراس، والوصول لقمة الأداء في البطولات مع وقاية الكوع والسمانة.',
    'Build a physical base, then improve lateral and backward movement, wall play and overheads, peaking for tournaments while protecting the elbow and calf.'),
  components: ['agility', 'reaction', 'power', 'anaerobic', 'aerobic', 'technique', 'tactics', 'prevention'],
  sessionsPerWeek: 5,
  periods: [
    {
      type: 'gpp',
      goal: T('قاعدة هوائية وقوة عامة وتثبيت ضربات الحيطة والفولي', 'Aerobic base, general strength and grooving wall play and volleys'),
      components: ['aerobic', 'strength', 'technique', 'prevention'],
      blocks: [
        {
          name: T('أسبوع ١ — اختبارات', 'Week 1 — Testing'),
          goal: T('تقييم بدني وتحديد نقاط الضعف', 'Physical profiling and weak-point analysis'),
          components: ['power', 'agility', 'aerobic'],
          loads: [3], weekTypes: ['test'],
          pattern: ['test', '', 'tech', '', 'gym_base', 'recovery', '']
        },
        {
          name: T('بلوك ١ — قاعدة', 'Block 1 — Base'),
          goal: T('حجم تدريب متوسط وقوة عامة وحركة قدمين أساسية', 'Moderate volume, general strength and basic footwork'),
          components: ['aerobic', 'strength', 'technique', 'coordination'],
          loads: [4, 5, 6, 3], weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['tech', 'gym_base', 'base_cond', '', 'tech', 'gym_base', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: T('قوة قصوى ولياقة خاصة: فترات نقاط ١٠-١٥ ث ورجوع للخلف للّوب', 'Maximal strength and specific fitness: 10-15s point intervals and backward movement for lobs'),
      components: ['max_strength', 'agility', 'anaerobic', 'reaction', 'technique'],
      blocks: [
        {
          name: T('بلوك ٢ — قوة ولياقة خاصة', 'Block 2 — Strength & specific fitness'),
          goal: T('قوة قصوى وتكرار مجهودات قصيرة عالية الشدة', 'Maximal strength and repeated short high-intensity efforts'),
          components: ['max_strength', 'anaerobic', 'agility', 'technique'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['tech', 'gym_max', 'court_cond', '', 'tech', 'gym_max', 'match']
        }
      ]
    },
    {
      type: 'precomp',
      goal: T('قدرة انفجارية للسماش والبانديخا وماتشات تدريبية بالزوج', 'Explosive power for smash and bandeja, with pairs practice matches'),
      components: ['power', 'reaction', 'tactics', 'mental'],
      blocks: [
        {
          name: T('بلوك ٣ — قدرة وماتشات', 'Block 3 — Power & matches'),
          goal: T('انفجارية وسرعة رد فعل عند الشبكة وتفاهم الزوج', 'Explosiveness, net reactions and pair coordination'),
          components: ['power', 'reaction', 'tactics'],
          loads: [6, 7, 4], weekTypes: ['load', 'shock', 'test'],
          pattern: ['court_cond', 'gym_power', 'tech', '', 'match', 'gym_power', 'match']
        }
      ]
    },
    {
      type: 'comp',
      goal: T('صيانة الحدة البدنية والاستشفاء بين ماتشات البطولة', 'Maintain sharpness and recover between tournament matches'),
      components: ['power', 'agility', 'tactics', 'recovery'],
      blocks: [
        {
          name: T('بلوك ٤ — بطولات', 'Block 4 — Tournaments'),
          goal: T('حمل ثابت متوسط وتركيز على اللعب والاستشفاء', 'Stable moderate load, focus on play and recovery'),
          components: ['power', 'tactics', 'recovery'],
          loads: [5, 6, 5, 4], weekTypes: ['comp', 'comp', 'comp', 'deload'],
          pattern: ['tech', 'gym_maint', 'court_cond', 'recovery', '', 'match', 'match']
        }
      ]
    }
  ],
  sessions: {
    test: racketTest(tm(T('اختبار حركة البادل: شبكة ← خط خلفي ← شبكة (٦ تكرارات)', 'Padel movement test: net to back wall to net (6 reps)'), 1, '1', '30s', '100', 'best', '3min',
      T('سرعة الرجوع للّوب والرجوع للشبكة', 'Speed covering lobs and regaining the net'), 'agility')),
    tech: ses(T('تكنيك — لعب الحيطة والفولي وفوق الراس', 'Technique — wall play, volleys & overheads'),
      T('إتقان الخروج من الحيطة الخلفية والجانبية والفولي والبانديخا', 'Master back/side-wall exits, volleys and bandeja'),
      ['technique', 'coordination', 'tactics'], 5, 90, [
        ...wuCourt(), wuShoulder(),
        dr(T('خروج من الحيطة الخلفية (فورهاند وباكهاند)', 'Back-wall exits (forehand and backhand)'), { sets: 4, reps: '12', rest: '60s' },
          T('قراءة ارتداد الكرة من الحيطة والتوقيت', 'Reading the wall rebound and timing'), 'technique'),
        dr(T('حيطة مزدوجة (خلفي + جانبي)', 'Double wall (back + side)'), { sets: 3, reps: '10', rest: '60s' },
          T('التعامل مع الكرات الصعبة في الزاوية', 'Handling difficult corner balls'), 'technique'),
        dr(T('فولي عند الشبكة: عمق وزاوية', 'Net volleys: depth and angle'), { sets: 4, duration: '4min', rest: '1min' },
          T('السيطرة على الشبكة', 'Controlling the net'), 'technique'),
        dr(T('بانديخا وفيبورا على أهداف', 'Bandeja and vibora to targets'), { sets: 4, reps: '10', rest: '75s' },
          T('الحفاظ على الشبكة ضد اللوب', 'Holding the net against lobs'), 'technique'),
        dr(T('لوب دفاعي من الخط الخلفي', 'Defensive lobs from the back'), { sets: 3, reps: '10', rest: '60s' },
          T('استعادة الشبكة من الدفاع', 'Regaining the net from defence'), 'tactics'),
        ...cdCourt()
      ]),
    base_cond: ses(T('قاعدة هوائية وحركة قدمين', 'Aerobic base & footwork'),
      T('تحمل هوائي يساعد على الاستشفاء بين النقاط والأشواط', 'Aerobic endurance to recover between points and sets'),
      ['aerobic', 'coordination', 'agility'], 6, 60, [
        wu('ad_jog_in_place', { duration: '4min' }), wu('ex_leg_swings', { sets: 1, reps: '10/direction' }),
        dr('dr_ladder_lateral', { sets: 4, reps: '2' }, T('إيقاع القدمين جانبيا', 'Lateral foot rhythm'), 'coordination'),
        dr('ad_backpedal_to_sprint', { sets: 3, reps: '4', rest: '45s' }, T('الرجوع للخلف للّوب والتحول للأمام', 'Backpedal for lobs and transition forward'), 'agility'),
        rn('ad_zone_2_easy_run', { sets: 1, duration: '30min', intensity: 'Z2', basis: 'hr' }, T('قاعدة هوائية', 'Aerobic base'), 'aerobic'),
        tm('ex_stationary_bike', 1, '5', '3min', 'Z3', 'hr', '90s', T('فترات هوائية بدون صدمات على الرجل', 'Low-impact aerobic intervals'), 'aerobic'),
        mob('ex_calf_stretch', { sets: 2, duration: '45s' }), mob('ex_adductor_stretch', { sets: 1, duration: '45s' })
      ]),
    court_cond: ses(T('لياقة خاصة بالبادل — فترات نقاط', 'Padel conditioning — point intervals'),
      T('تكرار مجهودات قصيرة (١٠-١٥ ث) مع راحة قصيرة زي الماتش', 'Repeated short efforts (10-15s) with match-like short rest'),
      ['anaerobic', 'agility', 'reaction'], 8, 70, [
        ...wuCourt(),
        tm(T('فترات تغذية: فولي ← لوب ← رجوع للحيطة ← شبكة', 'Fed intervals: volley, lob, back to wall, regain net'), 3, '8', '12s', '9', 'rpe', '15s',
          T('محاكاة نقطة بادل حقيقية بنسبة شغل للراحة ١:١', 'Simulates a padel rally at ~1:1 work:rest'), 'anaerobic', { setRest: '3min' }),
        dr('ad_split_step_to_lunge_reaction', { sets: 3, reps: '6/side', rest: '45s' }, T('رد فعل عند الشبكة', 'Net reactions'), 'reaction'),
        dr('dr_discs_react', { sets: 3, reps: '6', rest: '45s' }, T('رد فعل بصري وتغيير اتجاه', 'Visual reaction and change of direction'), 'reaction'),
        rn('ad_backpedal_to_sprint', { sets: 2, reps: '5', distance: '10m', intensity: '95', basis: 'vmax', rest: '45s', restType: 'walk', setRest: '2min' },
          T('سرعة التحول من الدفاع للهجوم', 'Speed transitioning from defence to attack'), 'agility'),
        ...cdCourt()
      ]),
    match: ses(T('ماتشات تدريبية بالزوج', 'Pairs practice matches'),
      T('تفاهم الزوج والتغطية وقرارات اللعب تحت الضغط', 'Pair coordination, court coverage and decisions under pressure'),
      ['tactics', 'mental', 'anaerobic'], 7, 100, [
        ...wuCourt(),
        dr(T('نقاط بسيناريو: الزوج على الشبكة ضد اللوب', 'Scenario points: pair at the net vs lob'), { sets: 3, reps: '10 points', rest: '2min' },
          T('التحرك كوحدة واحدة مع الشريك', 'Moving as one unit with the partner'), 'tactics'),
        dr(T('نقاط الـ Golden point (ديوس حاسم)', 'Golden-point games'), { sets: 4, reps: '1', rest: '90s' },
          T('التعامل مع النقاط الحاسمة', 'Handling deciding points'), 'mental'),
        dr(T('ماتش تدريبي (٢ ست)', 'Practice match (2 sets)'), { sets: 1, reps: '2 sets', duration: '60min' },
          T('تطبيق الخطة في ظروف الماتش', 'Execute the plan in match conditions'), 'tactics'),
        ...cdCourt()
      ]),
    gym_base: gymRacket('base', [PH.wrist, PH.calf]),
    gym_max: gymRacket('max', [PH.wrist, PH.calf]),
    gym_power: gymRacket('power', [PH.cuff, PH.calf]),
    gym_maint: gymRacket('maint', [PH.wrist, PH.calf]),
    recovery: recovery([mob('ex_calf_stretch', { sets: 2, duration: '45s' })])
  }
};

/* ---------------- Squash ---------------- */
const squash = {
  id: 'pt_squash_season_int',
  sport: 'squash',
  level: 'intermediate',
  title: T('موسم اسكواش — مستوى متوسط', 'Squash season — intermediate'),
  goal: T('رفع الحد الأقصى للأكسجين والتحمل المتكرر عالي الشدة، وتحسين الجوستينج والطعنات العميقة، مع وقاية الركبة والضهر ووتر أكيليس.',
    'Raise VO2max and repeated high-intensity endurance, sharpen ghosting and deep lunges, and protect knees, back and Achilles.'),
  components: ['vo2max', 'anaerobic', 'agility', 'aerobic', 'strength', 'technique', 'tactics', 'prevention'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: T('قاعدة هوائية كبيرة وقوة عامة وتكنيك الطول (Length)', 'Large aerobic base, general strength and length technique'),
      components: ['aerobic', 'strength', 'technique', 'prevention'],
      blocks: [
        {
          name: T('أسبوع ١ — اختبارات', 'Week 1 — Testing'),
          goal: T('قياس التحمل والرشاقة والقدرة', 'Measure endurance, agility and power'),
          components: ['aerobic', 'agility', 'power'],
          loads: [3], weekTypes: ['test'],
          pattern: ['test', 'solo', '', 'solo', 'gym_base', 'aero', '']
        },
        {
          name: T('بلوك ١ — قاعدة هوائية', 'Block 1 — Aerobic base'),
          goal: T('حجم هوائي عالي وضرب منفرد كتير', 'High aerobic volume and lots of solo hitting'),
          components: ['aerobic', 'strength', 'technique'],
          loads: [4, 5, 6, 3], weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['solo', 'gym_base', 'aero', 'solo', 'gym_base', 'aero', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: T('فترات VO2max وجوستينج وقوة قصوى', 'VO2max intervals, ghosting and maximal strength'),
      components: ['vo2max', 'agility', 'max_strength', 'technique'],
      blocks: [
        {
          name: T('بلوك ٢ — جوستينج وVO2max', 'Block 2 — Ghosting & VO2max'),
          goal: T('رفع القدرة الهوائية القصوى وسرعة الحركة في الملعب', 'Raise aerobic power and movement speed on court'),
          components: ['vo2max', 'agility', 'max_strength'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['solo', 'gym_max', 'ghost', 'pairs', 'gym_max', 'aero', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: T('تحمل لاهوائي متكرر وقدرة وألعاب مشروطة تحت ضغط', 'Repeated anaerobic endurance, power and pressure condition games'),
      components: ['anaerobic', 'power', 'tactics', 'mental'],
      blocks: [
        {
          name: T('بلوك ٣ — ضغط وقدرة', 'Block 3 — Pressure & power'),
          goal: T('جلسات ضغط وقدرة انفجارية للطعنة والرجوع للـ T', 'Pressure sessions and explosive lunge-and-recover to the T'),
          components: ['anaerobic', 'power', 'tactics'],
          loads: [6, 7], weekTypes: ['load', 'shock'],
          pattern: ['ghost', 'gym_power', 'pairs', 'solo', 'gym_power', 'match', 'recovery']
        },
        {
          name: T('أسبوع إعادة اختبار وتخفيف', 'Re-test & unload week'),
          goal: T('قياس التقدم وتخفيف قبل البطولات', 'Measure progress and unload before tournaments'),
          components: ['agility', 'aerobic', 'recovery'],
          loads: [4], weekTypes: ['test'],
          pattern: ['test', 'solo', 'recovery', 'pairs', 'match', '', '']
        }
      ]
    },
    {
      type: 'comp',
      goal: T('صيانة الحدة وإدارة التعب بين الماتشات', 'Maintain sharpness and manage fatigue between matches'),
      components: ['agility', 'power', 'tactics', 'recovery'],
      blocks: [
        {
          name: T('بلوك ٤ — بطولات', 'Block 4 — Tournaments'),
          goal: T('جوستينج قصير حاد وصيانة قوة وماتشات', 'Short sharp ghosting, strength maintenance and matches'),
          components: ['agility', 'tactics', 'recovery'],
          loads: [6, 5, 6, 4], weekTypes: ['comp', 'comp', 'comp', 'deload'],
          pattern: ['solo', 'gym_maint', 'ghost', 'recovery', 'match', 'match', '']
        }
      ]
    }
  ],
  sessions: {
    test: racketTest(tm(T('اختبار جوستينج ٦ نقاط (أقصى عدد في دقيقة)', '6-point ghosting test (max reps in 1 min)'), 1, '1', '60s', '100', 'best', '3min',
      T('رشاقة وتحمل خاص بحركة الاسكواش', 'Squash-specific agility and endurance'), 'agility')),
    solo: ses(T('ضرب منفرد وتكنيك', 'Solo hitting & technique'),
      T('ثبات الطول والعرض والدقة على الحيطة الجانبية', 'Consistent length, width and tight straight drives'),
      ['technique', 'coordination', 'aerobic'], 5, 75, [
        ...wuCourt(),
        dr(T('درايف مستقيم فورهاند (Length) — الكرة تعدي خط الخدمة الخلفي', 'Forehand straight drives — past the short line to the back'), { sets: 4, duration: '4min', rest: '45s' },
          T('طول ثابت يرجع الخصم لورا', 'Consistent length that pushes the opponent back'), 'technique'),
        dr(T('درايف مستقيم باكهاند', 'Backhand straight drives'), { sets: 4, duration: '4min', rest: '45s' },
          T('نفس الجودة على الجهتين', 'Equal quality on both wings'), 'technique'),
        dr(T('بوست ثم درايف (مع شريك)', 'Boast-drive (with partner)'), { sets: 3, duration: '5min', rest: '1min' },
          T('حركة من الأمام للخلف مع ضرب', 'Front-to-back movement while hitting'), 'technique'),
        dr(T('دروب وكيل من الأمام', 'Drops and kills from the front'), { sets: 3, reps: '15', rest: '60s' },
          T('إنهاء النقطة من المقدمة', 'Finishing from the front'), 'tactics'),
        dr(T('إرسال واستقبال', 'Serve and return'), { sets: 2, reps: '15', rest: '60s' },
          T('بداية النقطة بأفضلية', 'Starting the rally with an advantage'), 'technique'),
        ...cdCourt()
      ]),
    aero: ses(T('تحمل هوائي — جري ودراجة', 'Aerobic conditioning — run & bike'),
      T('قاعدة هوائية كبيرة لتحمل رالي طويل (١٥-٢٠ ث وأكتر)', 'Large aerobic base for long rallies (15-20s and beyond)'),
      ['aerobic', 'threshold', 'vo2max'], 7, 60, [
        wu('ad_jog_in_place', { duration: '5min' }), wu('ex_leg_swings', { sets: 1, reps: '10/direction' }), wu('ad_a_skip', { sets: 2, distance: '20m' }),
        rn(T('فترات ٤ × ٤ دقايق', '4 x 4min intervals'), { sets: 1, reps: '4', duration: '4min', intensity: 'Z4-Z5', basis: 'hr', rest: '3min', restType: 'jog' },
          T('رفع VO2max (٩٠-٩٥٪ من أقصى نبض)', 'Raise VO2max (90-95% HRmax)'), 'vo2max'),
        tm('ex_stationary_bike', 1, '1', '20min', 'Z2', 'hr', undefined, T('حجم هوائي إضافي من غير صدمات', 'Extra aerobic volume without impact'), 'aerobic'),
        mob('ex_calf_stretch', { sets: 2, duration: '45s' }), mob('ex_hip_flexor_stretch', { sets: 2, duration: '45s' })
      ]),
    ghost: ses(T('جوستينج وحركة في الملعب', 'Ghosting & court movement'),
      T('سرعة الحركة من وإلى الـ T وتحمل متكرر عالي الشدة', 'Movement speed to and from the T and repeated high-intensity endurance'),
      ['agility', 'vo2max', 'anaerobic', 'speed'], 8, 60, [
        ...wuCourt(),
        tm(T('جوستينج ٦ نقاط', '6-point ghosting'), 2, '8', '30s', '90', 'best', '30s',
          T('محاكاة الرالي بشدة عالية ونسبة ١:١', 'Rally simulation at high intensity with 1:1 work:rest'), 'vo2max', { setRest: '3min', note: T('ارجع للـ T بعد كل ضربة وهمية', 'Recover to the T after every shadow shot') }),
        tm(T('جوستينج عشوائي بإشارة المدرب', 'Random ghosting on coach cue'), 3, '6', '15s', '95', 'best', '20s',
          T('رد فعل وتغيير اتجاه سريع', 'Reaction and fast change of direction'), 'agility', { setRest: '2min' }),
        rn(T('سبرنت عرض الملعب (سويسايدز)', 'Court-width sprints (suicides)'), { sets: 2, reps: '5', distance: '6.4m x 4', intensity: '95', basis: 'best', rest: '30s', restType: 'passive', setRest: '3min' },
          T('تحمل لاهوائي', 'Anaerobic endurance'), 'anaerobic'),
        ...cdCourt()
      ]),
    pairs: ses(T('تدريب مع شريك — ألعاب مشروطة', 'Pairs — condition games'),
      T('ضغط تكتيكي وبدني من خلال ألعاب بقواعد محددة', 'Tactical and physical pressure via conditioned games'),
      ['tactics', 'anaerobic', 'technique'], 8, 75, [
        ...wuCourt(),
        dr(T('لعبة "طول بس" (خلف خط الخدمة)', 'Length-only game (behind the short line)'), { sets: 3, duration: '6min', rest: '90s' },
          T('الصبر وبناء النقطة', 'Patience and point construction'), 'tactics'),
        tm(T('جلسة ضغط: المدرب يغذي ٤ زوايا', 'Pressure session: coach feeds 4 corners'), 4, '1', '45s', '9', 'rpe', '45s',
          T('تحمل لاهوائي تحت ضغط ضربات حقيقية', 'Anaerobic endurance under real hitting pressure'), 'anaerobic'),
        dr(T('لعبة مشروطة: جهة ضد نص الملعب', 'Condition game: one side vs half court'), { sets: 3, duration: '5min', rest: '90s' },
          T('الدقة والحركة تحت ضغط', 'Accuracy and movement under pressure'), 'tactics'),
        ...cdCourt()
      ]),
    match: ses(T('ماتشات تدريبية', 'Practice matches'),
      T('تطبيق الخطة ضد خصوم مختلفين وتحت ضغط النتيجة', 'Apply game plans vs different opponents under score pressure'),
      ['tactics', 'mental', 'anaerobic'], 8, 90, [
        ...wuCourt(),
        dr(T('ماتش أفضل ٥ أشواط (PAR ١١)', 'Best-of-5 match (PAR 11)'), { sets: 1, reps: '1 match', duration: '50min' },
          T('تطبيق الخطة في ظروف البطولة', 'Execute the plan in tournament conditions'), 'tactics', { note: T('٩٠ ث بين الأشواط، مياه وأملاح', '90s between games, fluids and electrolytes') }),
        dr(T('أشواط تبدأ من ٧-٧', 'Games starting at 7-all'), { sets: 3, reps: '1', rest: '90s' },
          T('التعامل مع نهايات الأشواط', 'Handling game endings'), 'mental'),
        ...cdCourt()
      ]),
    gym_base: gymRacket('base', [PH.groin, PH.back]),
    gym_max: gymRacket('max', [PH.groin, PH.calf]),
    gym_power: gymRacket('power', [PH.groin, PH.calf]),
    gym_maint: gymRacket('maint', [PH.groin, PH.back]),
    recovery: recovery([mob('ad_couch_stretch', { sets: 1, duration: '60s' })])
  }
};

/* ---------------- Badminton ---------------- */
const badminton = {
  id: 'pt_badminton_season_int',
  sport: 'badminton',
  level: 'intermediate',
  title: T('موسم ريشة طائرة — مستوى متوسط', 'Badminton season — intermediate'),
  goal: T('تحسين سرعة الحركة في الـ ٦ زوايا والطعنة والقفز للسماش، مع تحمل لاهوائي متكرر ووقاية وتر أكيليس والركبة والكتف.',
    'Improve six-corner movement speed, lunging and jump smashes, with repeated anaerobic endurance and protection of Achilles, knee and shoulder.'),
  components: ['agility', 'speed', 'power', 'anaerobic', 'aerobic', 'technique', 'tactics', 'prevention'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: T('قاعدة هوائية وقوة عامة وتكنيك الضربات الأساسية', 'Aerobic base, general strength and core stroke technique'),
      components: ['aerobic', 'strength', 'technique', 'coordination'],
      blocks: [
        {
          name: T('أسبوع ١ — اختبارات', 'Week 1 — Testing'),
          goal: T('قياس القدرة والرشاقة والتحمل', 'Measure power, agility and endurance'),
          components: ['power', 'agility', 'aerobic'],
          loads: [3], weekTypes: ['test'],
          pattern: ['test', 'tech', '', 'tech', 'gym_base', 'recovery', '']
        },
        {
          name: T('بلوك ١ — قاعدة', 'Block 1 — Base'),
          goal: T('حجم ضربات وتحمل هوائي وقوة أساسية', 'Stroke volume, aerobic endurance and basic strength'),
          components: ['aerobic', 'strength', 'technique'],
          loads: [4, 5, 6, 3], weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['tech', 'gym_base', 'shadow', 'tech', 'gym_base', 'aero', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: T('قوة قصوى وحركة ٦ زوايا وفترات مالتي شاتل', 'Maximal strength, six-corner footwork and multi-shuttle intervals'),
      components: ['max_strength', 'agility', 'anaerobic', 'technique'],
      blocks: [
        {
          name: T('بلوك ٢ — مالتي شاتل وقوة', 'Block 2 — Multi-shuttle & strength'),
          goal: T('تحمل خاص بنسبة شغل للراحة زي الرالي', 'Specific endurance at rally-like work:rest'),
          components: ['anaerobic', 'agility', 'max_strength'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['tech', 'gym_max', 'multi', 'shadow', 'gym_max', 'match', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: T('قدرة انفجارية للقفز والسماش وسرعة رد الفعل', 'Explosive power for jumping and smashing, and reaction speed'),
      components: ['power', 'speed', 'reaction', 'tactics'],
      blocks: [
        {
          name: T('بلوك ٣ — قدرة وسرعة', 'Block 3 — Power & speed'),
          goal: T('أقصى سرعة حركة وقفز مع ماتشات تدريبية', 'Maximal movement speed and jumping with practice matches'),
          components: ['power', 'speed', 'anaerobic', 'tactics'],
          loads: [6, 7], weekTypes: ['load', 'shock'],
          pattern: ['multi', 'gym_power', 'tech', 'shadow', 'gym_power', 'match', 'recovery']
        },
        {
          name: T('أسبوع إعادة اختبار وتخفيف', 'Re-test & unload week'),
          goal: T('قياس التقدم وتجهيز للبطولات', 'Measure progress and prepare for tournaments'),
          components: ['power', 'agility', 'recovery'],
          loads: [4], weekTypes: ['test'],
          pattern: ['test', 'tech', 'recovery', 'shadow', 'match', '', '']
        }
      ]
    },
    {
      type: 'comp',
      goal: T('صيانة السرعة والقدرة وإدارة الاستشفاء', 'Maintain speed and power and manage recovery'),
      components: ['speed', 'power', 'tactics', 'recovery'],
      blocks: [
        {
          name: T('بلوك ٤ — بطولات', 'Block 4 — Tournaments'),
          goal: T('حمل متوسط ثابت وحدة عالية', 'Stable moderate load with high sharpness'),
          components: ['speed', 'tactics', 'recovery'],
          loads: [6, 5, 6, 4], weekTypes: ['comp', 'comp', 'comp', 'deload'],
          pattern: ['tech', 'gym_maint', 'shadow', 'recovery', 'match', 'match', '']
        }
      ]
    }
  ],
  sessions: {
    test: racketTest(tm(T('اختبار حركة ٦ زوايا (١٦ لمسة)', 'Six-corner footwork test (16 touches)'), 1, '2', '20s', '100', 'best', '3min',
      T('رشاقة خاصة بالريشة', 'Badminton-specific agility'), 'agility')),
    tech: ses(T('تكنيك — ضربات أساسية ونت', 'Technique — core strokes & net play'),
      T('دقة الكلير والدروب والسماش واللعب على الشبكة', 'Accuracy of clears, drops, smashes and net play'),
      ['technique', 'coordination'], 5, 90, [
        ...wuCourt(), wuShoulder(),
        dr(T('كلير — دروب — نت (تسلسل مع شريك)', 'Clear-drop-net sequence (with partner)'), { sets: 4, duration: '5min', rest: '1min' },
          T('ثبات الضربات والحركة بينهم', 'Stroke consistency with movement between'), 'technique'),
        dr(T('سماش ودفاع السماش', 'Smash and smash defence'), { sets: 4, reps: '12', rest: '75s' },
          T('قوة السماش وسرعة الدفاع', 'Smash quality and defensive speed'), 'technique'),
        dr(T('لعب شبكة: سبين نت وكروس نت', 'Net play: spin net and cross net'), { sets: 3, duration: '4min', rest: '1min' },
          T('لمسة دقيقة على الشبكة', 'Fine touch at the net'), 'technique'),
        dr(T('إرسال قصير وطويل واستقبال', 'Short/long serve and return'), { sets: 3, reps: '15', rest: '60s' },
          T('بداية الرالي بأفضلية', 'Starting the rally with an advantage'), 'tactics'),
        ...cdCourt()
      ]),
    shadow: ses(T('حركة ظل (شادو) وسرعة', 'Shadow footwork & speed'),
      T('سرعة الحركة في الـ ٦ زوايا وكفاءة الطعنة والرجوع للنص', 'Six-corner speed, efficient lunging and recovery to base'),
      ['agility', 'speed', 'coordination', 'power'], 7, 60, [
        ...wuCourt(),
        dr('dr_ladder_icky', { sets: 3, reps: '2' }, T('سرعة القدمين', 'Foot speed'), 'coordination'),
        tm(T('شادو ٦ زوايا بإشارة المدرب', 'Six-corner shadow on coach cue'), 3, '6', '20s', '90', 'best', '20s',
          T('حركة سريعة بنسبة شغل للراحة زي الرالي (٨-١٠ ث رالي)', 'Fast movement at rally-like work:rest (8-10s rallies)'), 'agility', { setRest: '2min' }),
        dr('ad_split_step_to_lunge_reaction', { sets: 3, reps: '6/side', rest: '45s' }, T('توقيت السبليت ستيب والطعنة', 'Split-step timing into the lunge'), 'reaction'),
        st('wg_skater_hop', 3, '6/side', '8', 'rpe', '60s', T('انفجارية جانبية للكرات الجانبية', 'Lateral explosiveness for side shots'), 'power'),
        st('ad_tuck_jump', 3, '5', '8', 'rpe', '75s', T('قفز سريع للسماش بالقفز', 'Reactive jumping for the jump smash'), 'power'),
        ...cdCourt()
      ]),
    multi: ses(T('مالتي شاتل — لياقة خاصة', 'Multi-shuttle conditioning'),
      T('تحمل لاهوائي متكرر بضرب حقيقي', 'Repeated anaerobic endurance with real hitting'),
      ['anaerobic', 'agility', 'technique'], 8, 70, [
        ...wuCourt(),
        tm(T('مالتي شاتل ملعب كامل (تغذية سريعة)', 'Full-court multi-shuttle (fast feed)'), 3, '6', '30s', '9', 'rpe', '30s',
          T('محاكاة رالي عالي الشدة', 'Simulates high-intensity rallies'), 'anaerobic', { setRest: '3min' }),
        tm(T('مالتي شاتل الشبكة (سريع جدا)', 'Net multi-shuttle (very fast)'), 2, '6', '15s', '9', 'rpe', '20s',
          T('سرعة اليد والقدم عند الشبكة', 'Hand and foot speed at the net'), 'speed', { setRest: '2min' }),
        tm(T('دفاع ضد سماش متتالي', 'Defence vs consecutive smashes'), 3, '4', '20s', '9', 'rpe', '30s',
          T('رد فعل وتحمل في الدفاع', 'Reaction and endurance in defence'), 'reaction', { setRest: '2min' }),
        ...cdCourt()
      ]),
    aero: ses(T('تحمل هوائي', 'Aerobic conditioning'),
      T('قاعدة هوائية للاستشفاء بين الراليات والماتشات', 'Aerobic base for recovery between rallies and matches'),
      ['aerobic', 'threshold'], 6, 55, [
        wu('ad_jog_in_place', { duration: '5min' }), wu('ex_leg_swings', { sets: 1, reps: '10/direction' }),
        rn(T('جري فترات هوائي', 'Aerobic interval run'), { sets: 1, reps: '5', duration: '4min', intensity: 'Z3', basis: 'hr', rest: '2min', restType: 'jog' },
          T('رفع العتبة الهوائية', 'Raise aerobic threshold'), 'aerobic'),
        dr('ex_jump_rope', { sets: 5, duration: '2min', rest: '1min' }, T('تحمل السمانة وإيقاع القدمين', 'Calf endurance and foot rhythm'), 'muscular_endurance'),
        mob('ex_calf_stretch', { sets: 2, duration: '45s' }), mob('ex_quad_stretch', { sets: 1, duration: '45s' })
      ]),
    match: ses(T('ماتشات تدريبية', 'Practice matches'),
      T('تطبيق الخطة تحت ضغط النتيجة', 'Execute the game plan under score pressure'),
      ['tactics', 'mental', 'anaerobic'], 7, 90, [
        ...wuCourt(),
        dr(T('ماتش أفضل ٣ أشواط لـ ٢١', 'Best-of-3 games to 21'), { sets: 1, reps: '1 match', duration: '45min' },
          T('تطبيق الخطة في ظروف البطولة', 'Execute the plan in tournament conditions'), 'tactics', { note: T('٦٠ ث عند ١١ و٢ د بين الأشواط', '60s at 11 and 2min between games') }),
        dr(T('أشواط تبدأ من ١٧-١٧', 'Games starting at 17-all'), { sets: 3, reps: '1', rest: '90s' },
          T('إنهاء الأشواط تحت ضغط', 'Closing out games under pressure'), 'mental'),
        ...cdCourt()
      ]),
    gym_base: gymRacket('base', [PH.cuff, PH.calf]),
    gym_max: gymRacket('max', [PH.calf, PH.knee]),
    gym_power: gymRacket('power', [PH.cuff, PH.calf]),
    gym_maint: gymRacket('maint', [PH.calf, PH.knee]),
    recovery: recovery([mob('ex_calf_stretch', { sets: 2, duration: '45s' })])
  }
};

/* ---------------- Table tennis ---------------- */
const tableTennis = {
  id: 'pt_table_tennis_season_int',
  sport: 'table_tennis',
  level: 'intermediate',
  title: T('موسم تنس طاولة — مستوى متوسط', 'Table tennis season — intermediate'),
  goal: T('رفع سرعة رد الفعل وحركة القدمين الجانبية والقدرة الدورانية، مع ثبات التكنيك تحت ضغط ووقاية الكتف وأسفل الضهر.',
    'Raise reaction speed, lateral footwork and rotational power, with stable technique under pressure and protection of shoulder and lower back.'),
  components: ['reaction', 'agility', 'power', 'technique', 'tactics', 'anaerobic', 'core', 'prevention'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: T('قوة عامة للرجلين والجذع وحجم تكنيك كبير', 'General leg and trunk strength with large technical volume'),
      components: ['strength', 'core', 'technique', 'aerobic'],
      blocks: [
        {
          name: T('أسبوع ١ — اختبارات', 'Week 1 — Testing'),
          goal: T('قياس رد الفعل والرشاقة والقدرة', 'Measure reaction, agility and power'),
          components: ['reaction', 'agility', 'power'],
          loads: [3], weekTypes: ['test'],
          pattern: ['test', 'tech', '', 'tech', 'gym_base', 'recovery', '']
        },
        {
          name: T('بلوك ١ — قاعدة', 'Block 1 — Base'),
          goal: T('ثبات الضربات وقوة الجذع وقاعدة هوائية', 'Stroke consistency, trunk strength and aerobic base'),
          components: ['technique', 'strength', 'aerobic'],
          loads: [4, 5, 6, 3], weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['tech', 'gym_base', 'serve', 'tech', 'gym_base', 'footwork', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: T('مالتي بول عالي الشدة وحركة قدمين سريعة وقوة قصوى', 'High-intensity multiball, fast footwork and maximal strength'),
      components: ['anaerobic', 'agility', 'max_strength', 'technique'],
      blocks: [
        {
          name: T('بلوك ٢ — مالتي بول وقوة', 'Block 2 — Multiball & strength'),
          goal: T('سرعة وتكرار عالي للضربات مع حركة', 'High stroke tempo and frequency while moving'),
          components: ['anaerobic', 'agility', 'max_strength'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['tech', 'gym_max', 'multiball', 'serve', 'gym_max', 'match', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: T('قدرة دورانية وسرعة رد فعل وماتشات تحت ضغط', 'Rotational power, reaction speed and pressure matches'),
      components: ['power', 'reaction', 'tactics', 'mental'],
      blocks: [
        {
          name: T('بلوك ٣ — سرعة وماتشات', 'Block 3 — Speed & matches'),
          goal: T('أقصى سرعة ودقة في الضربة التالتة', 'Maximal speed and accuracy on the third ball'),
          components: ['power', 'reaction', 'tactics'],
          loads: [6, 7], weekTypes: ['load', 'shock'],
          pattern: ['multiball', 'gym_power', 'serve', 'footwork', 'gym_power', 'match', 'recovery']
        },
        {
          name: T('أسبوع إعادة اختبار وتخفيف', 'Re-test & unload week'),
          goal: T('قياس التقدم وتخفيف قبل البطولات', 'Measure progress and unload before tournaments'),
          components: ['reaction', 'agility', 'recovery'],
          loads: [4], weekTypes: ['test'],
          pattern: ['test', 'tech', 'recovery', 'serve', 'match', '', '']
        }
      ]
    },
    {
      type: 'comp',
      goal: T('حدة ودقة وإدارة التعب في البطولات', 'Sharpness, precision and fatigue management in tournaments'),
      components: ['reaction', 'tactics', 'mental', 'recovery'],
      blocks: [
        {
          name: T('بلوك ٤ — بطولات', 'Block 4 — Tournaments'),
          goal: T('حمل متوسط وتركيز على الخطة ضد كل خصم', 'Moderate load, focus on opponent-specific plans'),
          components: ['tactics', 'reaction', 'recovery'],
          loads: [5, 6, 5, 4], weekTypes: ['comp', 'comp', 'comp', 'deload'],
          pattern: ['tech', 'gym_maint', 'serve', 'recovery', 'match', 'match', '']
        }
      ]
    }
  ],
  sessions: {
    test: racketTest(tm(T('اختبار فالكنبرج (حركة ٣ نقاط) — عدد الكرات الصحيحة في ٦٠ ث', 'Falkenberg footwork test — correct balls in 60s'), 1, '2', '60s', '100', 'best', '3min',
      T('رشاقة وتحمل خاص بحركة الطاولة', 'Table-specific agility and endurance'), 'agility')),
    tech: ses(T('تكنيك منتظم على الطاولة', 'Regular table drills'),
      T('ثبات التوب سبين والبلوك والفليك', 'Consistent topspin, block and flick'),
      ['technique', 'coordination'], 5, 90, [
        ...wuCourt(), wuShoulder(),
        dr(T('فورهاند توب سبين على بلوك (كروس)', 'Forehand topspin vs block (cross)'), { sets: 4, duration: '5min', rest: '1min' },
          T('ثبات الضربة الأساسية', 'Core stroke consistency'), 'technique'),
        dr(T('باكهاند توب سبين على بلوك', 'Backhand topspin vs block'), { sets: 4, duration: '5min', rest: '1min' },
          T('نفس الجودة على الجهتين', 'Equal quality on both wings'), 'technique'),
        dr(T('فالكنبرج (باكهاند - فورهاند من الباك - فورهاند واسع)', 'Falkenberg (BH - FH pivot - wide FH)'), { sets: 4, duration: '3min', rest: '1min' },
          T('ربط حركة القدمين بالضربة', 'Link footwork to the stroke'), 'agility'),
        dr(T('فليك وتويست على الكرات القصيرة', 'Flick and twist on short balls'), { sets: 3, reps: '15', rest: '60s' },
          T('الهجوم على الإرسال القصير', 'Attacking short serves'), 'technique'),
        ...cdCourt()
      ]),
    serve: ses(T('إرسال واستقبال والضربة التالتة', 'Serve, receive & third ball'),
      T('بناء النقطة من الإرسال واستقبال آمن', 'Build the point from the serve and receive safely'),
      ['technique', 'tactics', 'reaction'], 5, 75, [
        ...wuCourt(),
        dr(T('إرسال قصير بالدوران (باك سبين / سايد سبين) على أهداف', 'Short spin serves (backspin / sidespin) to targets'), { sets: 4, reps: '15', rest: '60s' },
          T('إرسال دقيق يصعب الهجوم عليه', 'Accurate serves that are hard to attack'), 'technique'),
        dr(T('إرسال + هجوم الضربة التالتة', 'Serve + third-ball attack'), { sets: 4, reps: '10', rest: '60s' },
          T('أخذ المبادرة بعد الإرسال', 'Seize the initiative after serving'), 'tactics'),
        dr(T('استقبال: بوش قصير وفليك', 'Receive: short push and flick'), { sets: 3, reps: '15', rest: '60s' },
          T('تحييد إرسال الخصم', 'Neutralise the opponent\'s serve'), 'technique'),
        dr(T('نقاط حرة تبدأ بالإرسال (لـ ١١)', 'Free points from serve (to 11)'), { sets: 3, reps: '1 game', rest: '90s' },
          T('تطبيق الأنماط في لعب حقيقي', 'Apply patterns in live play'), 'tactics'),
        ...cdCourt()
      ]),
    multiball: ses(T('مالتي بول عالي الشدة', 'High-intensity multiball'),
      T('تحمل لاهوائي وسرعة ضربات مع حركة قدمين', 'Anaerobic endurance and stroke speed while moving'),
      ['anaerobic', 'agility', 'technique', 'speed'], 8, 70, [
        ...wuCourt(),
        tm(T('مالتي بول: فورهاند يمين وشمال (٢ نقطة)', 'Multiball: forehand from two points'), 3, '5', '30s', '9', 'rpe', '30s',
          T('تحمل حركة جانبية بضرب حقيقي', 'Lateral movement endurance with real strokes'), 'anaerobic', { setRest: '2min' }),
        tm(T('مالتي بول عشوائي (الطاولة كلها)', 'Random multiball (whole table)'), 3, '5', '20s', '9', 'rpe', '30s',
          T('رد فعل وقرار سريع', 'Reaction and fast decision'), 'reaction', { setRest: '2min' }),
        tm(T('مالتي بول: فليك ثم توب سبين', 'Multiball: flick then topspin'), 2, '6', '15s', '8', 'rpe', '30s',
          T('التحول من القصير للطويل', 'Transition from short to long'), 'technique', { setRest: '2min' }),
        ...cdCourt()
      ]),
    footwork: ses(T('سرعة ورد فعل بعيد عن الطاولة', 'Off-table speed & reaction'),
      T('سرعة رد الفعل والحركة الجانبية والقدرة', 'Reaction speed, lateral movement and power'),
      ['reaction', 'agility', 'power', 'speed'], 7, 55, [
        ...wuCourt(),
        dr('dr_discs_react', { sets: 3, reps: '6', rest: '45s' }, T('رد فعل بصري', 'Visual reaction'), 'reaction'),
        tm('wg_lateral_shuffle', 3, '6', '8s', '95', 'best', '30s', T('سرعة شافل جانبي زي حركة الطاولة', 'Table-like lateral shuffle speed'), 'agility', { setRest: '2min' }),
        st('ad_single_leg_lateral_hop_and_stick', 3, '5/side', '7', 'rpe', '60s', T('انفجارية وثبات جانبي', 'Lateral power and stability'), 'power'),
        dr('ex_jump_rope', { sets: 4, duration: '90s', rest: '45s' }, T('إيقاع القدمين وتحمل السمانة', 'Foot rhythm and calf endurance'), 'coordination'),
        ...cdCourt()
      ]),
    match: ses(T('ماتشات تدريبية', 'Practice matches'),
      T('تطبيق الخطة وتغييرها أثناء الماتش', 'Execute and adapt the plan during matches'),
      ['tactics', 'mental', 'technique'], 7, 90, [
        ...wuCourt(),
        dr(T('ماتشات أفضل ٥ أشواط لـ ١١', 'Best-of-5 matches to 11'), { sets: 2, reps: '1 match', rest: '10min' },
          T('ظروف البطولة', 'Tournament conditions'), 'tactics', { note: T('دقيقة بين الأشواط، مراجعة الخطة', '1min between games, review the plan') }),
        dr(T('أشواط تبدأ من ٨-٨', 'Games starting at 8-all'), { sets: 4, reps: '1', rest: '60s' },
          T('إنهاء الأشواط تحت ضغط', 'Closing games under pressure'), 'mental'),
        ...cdCourt()
      ]),
    gym_base: gymRacket('base', [PH.cuff, PH.back]),
    gym_max: gymRacket('max', [PH.cuff, PH.back]),
    gym_power: gymRacket('power', [PH.cuff, PH.back]),
    gym_maint: gymRacket('maint', [PH.cuff, PH.back]),
    recovery: recovery([mob('ex_shoulder_stretch', { sets: 2, duration: '40s' })])
  }
};

/* ================================================================== */
/* COMBAT SPORTS                                                        */
/* ================================================================== */

const wuKick = () => [
  wu('ex_jump_rope', { duration: '5min' }),
  wu(T('مرونة ديناميكية: مرجحة رجل أمامي وجانبي، لف الحوض، طعنات مع لف', 'Dynamic mobility: front/side leg swings, hip CARs, lunges with twist'), { duration: '6min' }),
  wu(T('حركة قدمين خفيفة (بونس) ودخول وخروج من المسافة', 'Light bounce footwork, stepping in and out of range'), { duration: '4min' })
];
const cdKick = () => [
  mob('ad_pigeon_stretch', { sets: 1, duration: '60s', note: T('لكل رجل', 'Each side') }),
  mob('wg_butterfly_stretch', { sets: 2, duration: '45s' }),
  breathe()
];
/* 14-week season skeleton for weight-class combat sports and fencing */
const seasonPeriods = (P) => [
  {
    type: 'gpp', goal: P.gppGoal, components: P.gppComp,
    blocks: [
      { name: T('أسبوع ١ — اختبارات', 'Week 1 — Testing'), goal: T('قياس المستوى البدني والوزن وتحديد الأحمال', 'Profile fitness and body mass and set training loads'),
        components: ['power', 'aerobic', 'anaerobic'], loads: [3], weekTypes: ['test'], pattern: P.patTest },
      { name: T('بلوك ١ — قاعدة عامة', 'Block 1 — General base'), goal: P.b1Goal, components: P.gppComp,
        loads: [4, 5, 6, 3], weekTypes: ['load', 'load', 'load', 'deload'], pattern: P.patGpp }
    ]
  },
  {
    type: 'spp', goal: P.sppGoal, components: P.sppComp,
    blocks: [
      { name: T('بلوك ٢ — قوة قصوى وتحمل خاص', 'Block 2 — Max strength & specific endurance'), goal: P.b2Goal, components: P.sppComp,
        loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'], pattern: P.patSpp }
    ]
  },
  {
    type: 'precomp', goal: P.preGoal, components: P.preComp,
    blocks: [
      { name: T('بلوك ٣ — قدرة وحدة', 'Block 3 — Power & sharpness'), goal: P.b3Goal, components: P.preComp,
        loads: [6, 7], weekTypes: ['load', 'shock'], pattern: P.patPre },
      { name: T('أسبوع إعادة اختبار وتخفيف', 'Re-test & unload week'), goal: T('قياس التقدم وتخفيف الحمل قبل البطولة', 'Measure progress and unload before competition'),
        components: ['power', 'anaerobic', 'recovery'], loads: [4], weekTypes: ['test'], pattern: P.patRetest }
    ]
  },
  {
    type: 'comp', goal: P.compGoal, components: P.compComp,
    blocks: [
      { name: T('بلوك ٤ — تهدئة وبطولة', 'Block 4 — Taper & competition'), goal: P.b4Goal, components: P.compComp,
        loads: [5, 4], weekTypes: ['taper', 'comp'], pattern: P.patComp }
    ]
  }
];

/* ---------------- Boxing (advanced fight camp) ---------------- */
const boxing = {
  id: 'pt_boxing_camp_adv',
  sport: 'boxing',
  level: 'advanced',
  title: T('معسكر نزال ملاكمة — ١٢ أسبوع (متقدم)', 'Boxing fight camp — 12 weeks (advanced)'),
  goal: T('تجهيز الملاكم لنزال ٨-١٠ جولات: قاعدة هوائية، قوة وقدرة في اللكمة، تحمل جولات متكررة، وسبارينج متدرج، مع نزول وزن تدريجي آمن (٠٫٥-١ كجم في الأسبوع) وتهدئة قبل النزال.',
    'Prepare a boxer for an 8-10 round fight: aerobic base, punching strength and power, repeated-round endurance and progressive sparring, with safe gradual weight loss (0.5-1 kg/week) and a pre-fight taper.'),
  components: ['aerobic', 'anaerobic', 'power', 'max_strength', 'technique', 'tactics', 'reaction', 'prevention'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: T('قاعدة هوائية (رود ورك) وقوة عامة وتكنيك، وبداية ضبط الوزن', 'Aerobic base (roadwork), general strength and technique; begin weight management'),
      components: ['aerobic', 'strength', 'technique', 'prevention'],
      blocks: [
        { name: T('أسبوع ١ — اختبارات ووزن', 'Week 1 — Testing & weigh-in'), goal: T('تقييم بدني وتسجيل الوزن وتكوين الجسم وتحديد خطة النزول', 'Physical testing, body mass and composition, and set the weight plan'),
          components: ['power', 'aerobic', 'anaerobic'], loads: [4], weekTypes: ['test'], pattern: ['test', 'box_tech', 'box_road', 'box_tech', 'gym_base', '', ''] },
        { name: T('بلوك ١ — قاعدة', 'Block 1 — Base'), goal: T('حجم رود ورك عالي بشدة منخفضة وقوة عامة وتكنيك على البادات', 'High-volume low-intensity roadwork, general strength and pad technique'),
          components: ['aerobic', 'strength', 'technique'], loads: [6, 7, 5], weekTypes: ['load', 'load', 'deload'], pattern: ['box_tech', 'gym_base', 'box_road', 'box_tech', 'gym_base', 'box_road', ''] }
      ]
    },
    {
      type: 'spp',
      goal: T('قوة قصوى وسبارينج متدرج (٦ ← ٨ جولات) وتحمل جولات', 'Maximal strength, progressive sparring (6 to 8 rounds) and round endurance'),
      components: ['max_strength', 'anaerobic', 'technique', 'tactics'],
      blocks: [
        { name: T('بلوك ٢ — قوة وسبارينج', 'Block 2 — Strength & sparring'), goal: T('زيادة جولات السبارينج وفترات لاهوائية خاصة بالملاكمة', 'Build sparring rounds and boxing-specific anaerobic intervals'),
          components: ['max_strength', 'anaerobic', 'tactics'], loads: [6, 7, 8, 5], weekTypes: ['load', 'load', 'shock', 'deload'], pattern: ['box_spar', 'gym_max', 'box_tech', 'box_spar', 'gym_max', 'box_hiit', ''] }
      ]
    },
    {
      type: 'precomp',
      goal: T('ذروة السبارينج (١٠-١٢ جولة) وقدرة انفجارية وتطبيق خطة النزال', 'Peak sparring (10-12 rounds), explosive power and fight game-plan'),
      components: ['power', 'anaerobic', 'tactics', 'mental'],
      blocks: [
        { name: T('بلوك ٣ — ذروة المعسكر', 'Block 3 — Camp peak'), goal: T('أعلى حمل في المعسكر: سبارينج بمسافة النزال أو أكتر بجولة وتباين قدرة', 'Highest camp load: sparring at fight distance or one round over, plus contrast power'),
          components: ['power', 'anaerobic', 'tactics'], loads: [8, 9], weekTypes: ['load', 'shock'], pattern: ['box_spar', 'gym_power', 'box_hiit', 'box_spar', 'box_tech', 'box_road', ''] }
      ]
    },
    {
      type: 'taper',
      goal: T('تقليل الحجم ٤٠-٦٠٪ مع الحفاظ على الشدة، والوصول للوزن بأمان', 'Cut volume 40-60% while keeping intensity, and make weight safely'),
      components: ['speed', 'power', 'recovery', 'mental'],
      blocks: [
        { name: T('أسبوع ١١ — تهدئة', 'Week 11 — Taper'), goal: T('آخر سبارينج خفيف قبل النزال بـ ١٠-١٢ يوم، وحدة وسرعة. الوزن في حدود ٣-٥٪ من حد الفئة', 'Last light sparring 10-12 days out, speed and sharpness. Body mass within 3-5% of the limit'),
          components: ['speed', 'power', 'recovery'], loads: [5], weekTypes: ['taper'], pattern: ['box_sharp', 'gym_maint', 'box_tech', 'recovery', 'box_sharp', 'box_road', ''] },
        { name: T('أسبوع النزال', 'Fight week'), goal: T('حدة وثقة بدون تعب. أي تعديل مياه بسيط وتحت إشراف طبي في آخر ٢٤ ساعة فقط، وإعادة ترطيب كاملة بعد الميزان', 'Sharp and confident without fatigue. Any water manipulation minimal, medically supervised and only in the final 24h; full rehydration after weigh-in'),
          components: ['speed', 'mental', 'recovery'], loads: [3], weekTypes: ['comp'], pattern: ['box_sharp', 'recovery', 'box_sharp', 'recovery', '', '', ''] }
      ]
    }
  ],
  sessions: {
    test: combatTest(tm(T('اختبار عدد اللكمات على الكيس في ٣٠ ث', 'Punch output test — max punches on the bag in 30s'), 2, '1', '30s', '10', 'rpe', '3min',
      T('قياس سرعة وتحمل اللكمات', 'Measures punching speed-endurance'), 'anaerobic'), false),
    box_tech: ses(T('تكنيك — بادات وكيس ودفاع', 'Technique — pads, bag & defence'),
      T('تطوير التركيبات والدفاع والقدمين بإيقاع جولات حقيقية', 'Develop combinations, defence and footwork in real round rhythm'),
      ['technique', 'tactics', 'anaerobic', 'reaction'], 7, 90, [
        ...wuStrike(),
        tm(T('جولات بادات مع المدرب (تركيبات + مرتدات)', 'Pad rounds with coach (combinations + counters)'), 1, '6', '3min', '7', 'rpe', '1min',
          T('تركيبات بسرعة وتوقيت ودقة', 'Combination speed, timing and accuracy'), 'technique'),
        tm(T('جولات الكيس الثقيل (قوة وحركة)', 'Heavy-bag rounds (power and movement)'), 1, '5', '3min', '8', 'rpe', '1min',
          T('قوة اللكمة مع تحرك مستمر', 'Punching power while moving'), 'anaerobic'),
        tm(T('دفاع: حبل السليب والرول مع مرتدة', 'Defence: slip-rope and rolls with counter'), 1, '3', '3min', '6', 'rpe', '1min',
          T('حركة الراس والدفاع النشط', 'Head movement and active defence'), 'reaction'),
        tm(T('شغل القرب والكلنش مع شريك', 'Inside fighting and clinch with partner'), 1, '2', '3min', '7', 'rpe', '1min',
          T('السيطرة في المسافة القريبة', 'Control at close range'), 'tactics'),
        PH.neck(),
        ...cdCombat()
      ]),
    box_spar: ses(T('سبارينج', 'Sparring'),
      T('تطبيق خطة النزال ضد شركاء مختلفين بعدد جولات متدرج', 'Apply the fight plan against varied partners with progressive round count'),
      ['tactics', 'anaerobic', 'technique', 'mental'], 9, 90, [
        ...wuStrike(),
        tm(T('جولات بادات تجهيزية', 'Primer pad rounds'), 1, '2', '3min', '6', 'rpe', '1min', T('تجهيز للسبارينج', 'Prepare for sparring'), 'technique'),
        tm(T('سبارينج بشركاء متجددين', 'Sparring with fresh partners'), 1, '6-10', '3min', '8-9', 'rpe', '1min',
          T('جولات بنفس ظروف النزال (المرحلة الخاصة ٦-٨، الذروة ١٠-١٢)', 'Fight-condition rounds (SPP 6-8, peak 10-12)'), 'tactics',
          { note: T('شريك جديد كل ٢-٣ جولات، واقي راس وجوانتي ١٦ أونصة، تصوير للمراجعة', 'Fresh partner every 2-3 rounds, headgear and 16oz gloves, film for review') }),
        tm(T('فينشر على الكيس: لكمات متواصلة', 'Bag finisher: continuous punching'), 1, '3', '1min', '10', 'rpe', '1min',
          T('تحمل لاهوائي في آخر النزال', 'Late-fight anaerobic capacity'), 'anaerobic'),
        PH.neck(),
        ...cdCombat()
      ]),
    box_road: ses(T('رود ورك — جري هوائي', 'Roadwork — aerobic run'),
      T('قاعدة هوائية تسرع الاستشفاء بين الجولات وتساعد على ضبط الوزن', 'Aerobic base to recover between rounds and support weight management'),
      ['aerobic', 'recovery'], 5, 60, [
        wu('ad_jog_in_place', { duration: '5min' }), wu('ex_leg_swings', { sets: 1, reps: '10/direction' }),
        rn('ad_zone_2_easy_run', { sets: 1, duration: '40min', intensity: 'Z2', basis: 'hr' }, T('تحمل هوائي بشدة منخفضة', 'Low-intensity aerobic endurance'), 'aerobic',
          { note: T('الصبح بدري قبل الفطار الخفيف، قيس الوزن بعدها', 'Early morning before a light breakfast; log body mass after') }),
        rn(T('ستريدز', 'Strides'), { sets: 1, reps: '6', distance: '80m', intensity: '80', basis: 'vmax', rest: '60s', restType: 'walk' }, T('حفاظ على مرونة الخطوة والسرعة', 'Maintain stride elasticity and speed'), 'speed'),
        mob('ex_calf_stretch', { sets: 1, duration: '45s' }), mob('ex_hip_flexor_stretch', { sets: 1, duration: '45s' })
      ]),
    box_hiit: ses(T('لياقة خاصة بالنزال — فترات', 'Fight-specific conditioning — intervals'),
      T('رفع التحمل اللاهوائي والقدرة على تكرار الهجمات', 'Raise anaerobic capacity and repeat-burst ability'),
      ['anaerobic', 'vo2max', 'power'], 9, 70, [
        wu('ex_jump_rope', { duration: '6min' }), wu('ad_shadow_boxing', { sets: 2, duration: '3min' }),
        tm(T('جولات كيس بانفجارات: ١٠ ث أقصى كل ٣٠ ث', 'Bag rounds with bursts: 10s all-out every 30s'), 1, '6', '3min', '9', 'rpe', '1min',
          T('محاكاة تغيير الإيقاع في النزال', 'Simulates pace changes in a fight'), 'anaerobic'),
        tm('wg_assault_bike', 1, '10', '15s', '10', 'rpe', '45s', T('قدرة لاهوائية بدون صدمات', 'Low-impact anaerobic power'), 'anaerobic'),
        rn(T('جري ٤٠٠م متكرر', '400m repeats'), { sets: 1, reps: '6', distance: '400m', time: '75-80s', intensity: '90', basis: 'best', rest: '90s', restType: 'walk' },
          T('VO2max وتحمل الجولات', 'VO2max and round endurance'), 'vo2max'),
        st('ex_medicine_ball_slam', 3, '10', '8', 'rpe', '60s', T('قدرة الجذع تحت التعب', 'Trunk power under fatigue'), 'power'),
        ...cdCombat()
      ]),
    box_sharp: ses(T('حدة وسرعة — تهدئة', 'Sharpening — taper'),
      T('سرعة وتوقيت وثقة بحجم قليل وإيقاع النزال', 'Speed, timing and confidence at low volume and fight pace'),
      ['speed', 'reaction', 'tactics', 'mental'], 5, 45, [
        ...wuStrike(),
        tm(T('بادات بإيقاع النزال', 'Fight-pace pads'), 1, '4', '2min', '7', 'rpe', '1min', T('حدة التركيبات الأساسية في خطة النزال', 'Sharpen the key combinations of the plan'), 'technique'),
        tm(T('بادات رد فعل سريعة', 'Fast reaction pads'), 1, '6', '10s', '9', 'rpe', '50s', T('سرعة رد الفعل', 'Reaction speed'), 'reaction'),
        tm(T('شادو بخطة النزال (تخيل الخصم)', 'Game-plan shadow boxing (visualise opponent)'), 1, '3', '3min', '5', 'rpe', '1min',
          T('إعداد ذهني وتثبيت الخطة', 'Mental rehearsal of the plan'), 'mental', { note: T('قيس الوزن الصبح وبالليل، والتزم بخطة التغذية والمياه', 'Weigh morning and evening; stick to the food and fluid plan') }),
        ...cdCombat()
      ]),
    gym_base: gymCombat('base', [PH.neck, PH.cuff]),
    gym_max: gymCombat('max', [PH.neck, PH.cuff]),
    gym_power: gymCombat('power', [PH.neck, PH.core]),
    gym_maint: gymCombat('maint', [PH.neck]),
    recovery: recovery([mob('ad_shoulder_cars', { sets: 1, reps: '5/direction', note: T('تابع الوزن والنوم ٨ ساعات أو أكتر', 'Track body mass and aim for 8h+ sleep') })])
  }
};

/* ---------------- MMA (advanced fight camp) ---------------- */
const mma = {
  id: 'pt_mma_camp_adv',
  sport: 'mma',
  level: 'advanced',
  title: T('معسكر نزال MMA — ١٢ أسبوع (متقدم)', 'MMA fight camp — 12 weeks (advanced)'),
  goal: T('تجهيز المقاتل لنزال ٣ جولات × ٥ دقايق: ضرب ومصارعة وأرضي، تحمل جولات ٥ دقايق، قوة وقدرة، سبارينج متدرج، ونزول وزن تدريجي آمن مع تهدئة قبل النزال.',
    'Prepare a fighter for a 3 x 5min bout: striking, wrestling and grappling, 5-minute round endurance, strength and power, progressive sparring, and safe gradual weight loss with a pre-fight taper.'),
  components: ['anaerobic', 'aerobic', 'power', 'max_strength', 'technique', 'tactics', 'muscular_endurance', 'prevention'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: T('قاعدة هوائية وقوة عامة وتكنيك في كل المجالات', 'Aerobic base, general strength and technique across all ranges'),
      components: ['aerobic', 'strength', 'technique'],
      blocks: [
        { name: T('أسبوع ١ — اختبارات ووزن', 'Week 1 — Testing & weigh-in'), goal: T('تقييم بدني وتسجيل الوزن وخطة النزول', 'Physical testing, body mass and weight plan'),
          components: ['power', 'aerobic', 'anaerobic'], loads: [4], weekTypes: ['test'], pattern: ['test', 'mma_strike', 'mma_grap', 'recovery', 'gym_base', '', ''] },
        { name: T('بلوك ١ — قاعدة', 'Block 1 — Base'), goal: T('حجم فني عالي بشدة متوسطة وقوة عامة', 'High technical volume at moderate intensity and general strength'),
          components: ['aerobic', 'strength', 'technique'], loads: [6, 7, 5], weekTypes: ['load', 'load', 'deload'], pattern: ['mma_strike', 'gym_base', 'mma_grap', 'mma_strike', 'gym_base', 'mma_grap', ''] }
      ]
    },
    {
      type: 'spp',
      goal: T('قوة قصوى وسبارينج MMA وتحمل جولات ٥ دقايق', 'Maximal strength, MMA sparring and 5-minute round endurance'),
      components: ['max_strength', 'anaerobic', 'tactics', 'muscular_endurance'],
      blocks: [
        { name: T('بلوك ٢ — قوة وسبارينج', 'Block 2 — Strength & sparring'), goal: T('دمج المجالات تحت تعب وزيادة جولات السبارينج', 'Integrate ranges under fatigue and build sparring rounds'),
          components: ['max_strength', 'anaerobic', 'tactics'], loads: [6, 7, 8, 5], weekTypes: ['load', 'load', 'shock', 'deload'], pattern: ['mma_strike', 'gym_max', 'mma_grap', 'mma_spar', 'gym_max', 'mma_cond', ''] }
      ]
    },
    {
      type: 'precomp',
      goal: T('ذروة المعسكر: سبارينج كامل بمسافة النزال وخطة الخصم', 'Camp peak: full sparring at fight distance and opponent-specific plan'),
      components: ['power', 'anaerobic', 'tactics', 'mental'],
      blocks: [
        { name: T('بلوك ٣ — ذروة المعسكر', 'Block 3 — Camp peak'), goal: T('أعلى حمل خاص: ٣-٥ جولات × ٥ د وقدرة انفجارية', 'Highest specific load: 3-5 x 5min rounds and explosive power'),
          components: ['power', 'anaerobic', 'tactics'], loads: [8, 9], weekTypes: ['load', 'shock'], pattern: ['mma_spar', 'gym_power', 'mma_grap', 'mma_strike', 'mma_spar', 'mma_cond', ''] }
      ]
    },
    {
      type: 'taper',
      goal: T('تهدئة وحدة والوصول للوزن بأمان', 'Taper, sharpen and make weight safely'),
      components: ['speed', 'power', 'recovery', 'mental'],
      blocks: [
        { name: T('أسبوع ١١ — تهدئة', 'Week 11 — Taper'), goal: T('حجم أقل ٥٠٪ مع شدة عالية قصيرة. الوزن في حدود ٣-٥٪ من حد الفئة', 'Volume down ~50% with short high-intensity work. Mass within 3-5% of the limit'),
          components: ['speed', 'power', 'recovery'], loads: [5], weekTypes: ['taper'], pattern: ['mma_sharp', 'gym_maint', 'mma_grap', 'recovery', 'mma_sharp', '', ''] },
        { name: T('أسبوع النزال', 'Fight week'), goal: T('حدة وثقة. أي تعديل مياه بسيط وتحت إشراف طبي في آخر ٢٤ ساعة، وإعادة ترطيب وكربوهيدرات بعد الميزان', 'Sharp and confident. Any water manipulation minimal, medically supervised, final 24h only; rehydrate and refuel after weigh-in'),
          components: ['speed', 'mental', 'recovery'], loads: [3], weekTypes: ['comp'], pattern: ['mma_sharp', 'recovery', 'mma_sharp', 'recovery', '', '', ''] }
      ]
    }
  ],
  sessions: {
    test: combatTest(tm(T('اختبار سبرول + لكمات: أقصى تكرار في ٦٠ ث', 'Sprawl-and-strike test — max reps in 60s'), 2, '1', '60s', '10', 'rpe', '3min',
      T('تحمل لاهوائي خاص بالـ MMA', 'MMA-specific anaerobic endurance'), 'anaerobic'), true),
    mma_strike: ses(T('ضرب — بادات وكيس وركلات', 'Striking — pads, bag & kicks'),
      T('تركيبات لكم وركل ودخول وخروج مع دفاع ضد الإسقاط', 'Punch-kick combinations, entries/exits and takedown defence'),
      ['technique', 'tactics', 'anaerobic', 'reaction'], 7, 90, [
        ...wuStrike(),
        tm(T('بادات: تركيبات لكم وركل', 'Pads: punch-kick combinations'), 1, '5', '3min', '7', 'rpe', '1min', T('تركيبات بسرعة وقوة', 'Fast, powerful combinations'), 'technique'),
        tm(T('كيس: ضرب ثم سبرول ثم رجوع للوقفة', 'Bag: strike, sprawl, back to stance'), 1, '4', '3min', '8', 'rpe', '1min', T('ربط الضرب بالدفاع ضد الإسقاط', 'Link striking with takedown defence'), 'anaerobic'),
        dr(T('دريل دفاع ضد الركلات والمرتدات', 'Kick defence and counter drill'), { sets: 3, duration: '3min', rest: '1min' }, T('دفاع وتوقيت', 'Defence and timing'), 'reaction'),
        tm(T('ضرب على الأرض (Ground and pound) على الكيس', 'Ground-and-pound on the bag'), 1, '3', '1min', '9', 'rpe', '1min', T('قدرة الضرب من فوق', 'Top-position striking power'), 'power'),
        PH.neck(),
        ...cdCombat()
      ]),
    mma_grap: ses(T('مصارعة وأرضي', 'Wrestling & grappling'),
      T('إسقاط على القفص ودفاع والقيام، وسيطرة وإنهاء على الأرض', 'Cage takedowns and defence, get-ups, ground control and submissions'),
      ['technique', 'tactics', 'muscular_endurance', 'strength'], 8, 90, [
        ...wuGrap(),
        dr(T('دخول سنجل ودابل ليج (تكرار)', 'Single- and double-leg entries (reps)'), { sets: 5, reps: '6/side', rest: '45s' }, T('سرعة ودقة الإسقاط', 'Takedown speed and precision'), 'technique'),
        dr(T('مصارعة القفص: الضغط والقيام من الأرض', 'Cage wrestling: pressing and wall get-ups'), { sets: 4, duration: '3min', rest: '1min' }, T('السيطرة على القفص', 'Cage control'), 'tactics'),
        tm(T('سبارينج أرضي من أوضاع محددة', 'Positional grappling from set positions'), 1, '6', '5min', '8', 'rpe', '1min',
          T('تحمل عضلي وحلول تحت ضغط', 'Muscular endurance and problem-solving under pressure'), 'muscular_endurance'),
        PH.grip(),
        ...cdCombat()
      ]),
    mma_spar: ses(T('سبارينج MMA', 'MMA sparring'),
      T('دمج كل المجالات بنفس زمن الجولات', 'Integrate all ranges at fight round length'),
      ['tactics', 'anaerobic', 'mental', 'technique'], 9, 90, [
        ...wuStrike(),
        tm(T('سبارينج MMA كامل', 'Full MMA sparring'), 1, '3-5', '5min', '8-9', 'rpe', '1min',
          T('ظروف النزال (٣ جولات للنزال العادي، ٥ في الذروة)', 'Fight conditions (3 rounds standard, 5 at peak)'), 'tactics',
          { note: T('شريك جديد كل جولة، جوانتي سبارينج وواقي فم وتصوير', 'Fresh partner each round, sparring gloves, mouthguard, film it') }),
        tm(T('جولات موقفية: آخر دقيقة في الجولة', 'Situational rounds: final minute of a round'), 1, '4', '1min', '10', 'rpe', '1min', T('الإنهاء القوي للجولات', 'Finishing rounds strong'), 'anaerobic'),
        PH.neckSide(),
        ...cdCombat()
      ]),
    mma_cond: ses(T('لياقة خاصة — محاكاة جولات', 'Fight conditioning — round simulation'),
      T('تحمل جولات ٥ دقايق بتغيير إيقاع متكرر', 'Five-minute round endurance with repeated pace changes'),
      ['anaerobic', 'vo2max', 'muscular_endurance', 'power'], 9, 70, [
        wu('ex_jump_rope', { duration: '6min' }), wu('wg_bear_crawl', { sets: 2, distance: '15m' }),
        tm(T('محاكاة جولة: ٣٠ ث كيس / ١٠ سبرول / ٢٠م دفع سليد / ٣٠ ث ضرب أرضي — متكرر', 'Round simulation: 30s bag / 10 sprawls / 20m sled push / 30s ground-and-pound — repeat'), 1, '3', '5min', '9', 'rpe', '1min',
          T('محاكاة متطلبات الجولة', 'Replicates round demands'), 'anaerobic'),
        tm('wg_assault_bike', 1, '8', '20s', '10', 'rpe', '40s', T('قدرة لاهوائية', 'Anaerobic power'), 'anaerobic'),
        st('ad_sandbag_bear_hug_carry', 3, '30m', '8', 'rpe', '90s', T('قوة الكلنش والتحمل', 'Clinch strength endurance'), 'muscular_endurance'),
        ...cdCombat()
      ]),
    mma_sharp: ses(T('حدة وسرعة — تهدئة', 'Sharpening — taper'),
      T('سرعة وتوقيت وثقة بحجم قليل', 'Speed, timing and confidence at low volume'),
      ['speed', 'reaction', 'tactics', 'mental'], 5, 50, [
        ...wuStrike(),
        tm(T('بادات خطة النزال', 'Game-plan pads'), 1, '3', '3min', '7', 'rpe', '1min', T('حدة التركيبات الأساسية', 'Sharpen key combinations'), 'technique'),
        dr(T('دخول إسقاط بإيقاع النزال', 'Fight-pace takedown entries'), { sets: 3, reps: '4/side', rest: '60s' }, T('سرعة الدخول', 'Entry speed'), 'speed'),
        tm(T('شادو MMA (تخيل الخصم)', 'MMA shadow (visualise opponent)'), 1, '2', '3min', '5', 'rpe', '1min', T('إعداد ذهني', 'Mental rehearsal'), 'mental',
          { note: T('قيس الوزن الصبح وبالليل والتزم بخطة التغذية', 'Weigh morning and evening; follow the nutrition plan') }),
        ...cdCombat()
      ]),
    gym_base: gymCombat('base', [PH.neck, PH.groin]),
    gym_max: gymCombat('max', [PH.neck, PH.neckSide]),
    gym_power: gymCombat('power', [PH.neck, PH.grip]),
    gym_maint: gymCombat('maint', [PH.neck]),
    recovery: recovery([mob('ex_adductor_stretch', { sets: 1, duration: '60s' })])
  }
};

/* ---------------- Judo ---------------- */
const judo = {
  id: 'pt_judo_season_int',
  sport: 'judo',
  level: 'intermediate',
  title: T('موسم جودو — مستوى متوسط', 'Judo season — intermediate'),
  goal: T('تطوير قوة القبضة والسحب والقدرة الانفجارية في الرمي، وتحمل الراندوري بنزالات ٤ دقايق، مع ثبات الوزن داخل الفئة ووقاية الكتف والركبة والرقبة.',
    'Develop grip and pulling strength and explosive throwing power, plus randori endurance for 4-minute contests, while holding weight within the category and protecting shoulder, knee and neck.'),
  components: ['strength', 'power', 'anaerobic', 'aerobic', 'technique', 'tactics', 'muscular_endurance', 'prevention'],
  sessionsPerWeek: 6,
  periods: seasonPeriods({
    gppGoal: T('قاعدة هوائية وقوة عامة وقبضة وحجم أوتشيكومي كبير', 'Aerobic base, general strength, grip and high uchikomi volume'),
    gppComp: ['aerobic', 'strength', 'technique', 'muscular_endurance'],
    b1Goal: T('حجم تكرار فني عالي وقوة عامة', 'High technical repetition and general strength'),
    sppGoal: T('قوة قصوى وتحمل راندوري ونجي-كومي', 'Maximal strength, randori endurance and nage-komi'),
    sppComp: ['max_strength', 'anaerobic', 'technique', 'muscular_endurance'],
    b2Goal: T('زيادة جولات الراندوري وقوة السحب القصوى', 'More randori rounds and maximal pulling strength'),
    preGoal: T('قدرة انفجارية في الرمي ومحاكاة البطولة', 'Explosive throwing power and competition simulation'),
    preComp: ['power', 'anaerobic', 'tactics', 'mental'],
    b3Goal: T('سرعة الدخول والرمي ومحاكاة نزالات متتالية', 'Entry and throwing speed with back-to-back contest simulation'),
    compGoal: T('تهدئة ووصول للوزن والبطولة', 'Taper, make weight and compete'),
    compComp: ['power', 'tactics', 'recovery', 'mental'],
    b4Goal: T('حجم أقل وشدة قصيرة، الوزن داخل الفئة بدون تجفيف قاسي', 'Lower volume, short intensity; weight within the category without harsh dehydration'),
    patTest: ['test', 'jd_tech', '', 'jd_tech', 'gym_base', 'recovery', ''],
    patGpp: ['jd_tech', 'gym_base', 'jd_randori', 'jd_tech', 'gym_base', 'jd_cond', ''],
    patSpp: ['jd_tech', 'gym_max', 'jd_randori', 'jd_cond', 'gym_max', 'jd_randori', ''],
    patPre: ['jd_randori', 'gym_power', 'jd_tech', 'jd_comp', 'gym_power', 'jd_cond', ''],
    patRetest: ['test', 'jd_tech', 'recovery', 'jd_randori', 'jd_tech', '', ''],
    patComp: ['jd_tech', 'gym_maint', 'jd_randori', 'recovery', 'jd_tech', 'jd_comp', '']
  }),
  sessions: {
    test: combatTest(dr(T('اختبار الجودو الخاص SJFT (١٥ ث + ٣٠ ث + ٣٠ ث، راحة ١٠ ث)', 'Special Judo Fitness Test — SJFT (15s + 30s + 30s, 10s rests)'), { sets: 1, reps: '1' },
      T('تحمل لاهوائي خاص بالجودو (عدد الرميات والنبض)', 'Judo-specific anaerobic endurance (throws and HR index)'), 'anaerobic'), true),
    jd_tech: ses(T('تكنيك — كوميكاتا وأوتشيكومي ونجي-كومي', 'Technique — kumikata, uchikomi & nage-komi'),
      T('تثبيت التوكوي-وازا ومسكات البدلة والتحول للأرضي', 'Groove tokui-waza, grip fighting and transitions to ne-waza'),
      ['technique', 'tactics', 'muscular_endurance', 'coordination'], 7, 90, [
        ...wuGrap(),
        dr(T('صراع المسكات (كوميكاتا) مع شريك', 'Grip fighting (kumikata) with partner'), { sets: 4, duration: '1min', rest: '30s' }, T('كسب المسكة والتحكم', 'Win and control the grip'), 'tactics'),
        dr(T('أوتشيكومي للتوكوي-وازا', 'Uchikomi — tokui-waza'), { sets: 10, reps: '10', rest: '20s', note: T('يمين وشمال، دخول نظيف وسريع', 'Both sides, clean fast entries') }, T('أتمتة الدخول', 'Automate the entry'), 'technique'),
        tm(T('أوتشيكومي سريع', 'Speed uchikomi'), 1, '6', '20s', '9', 'rpe', '20s', T('سرعة الدخول تحت تعب', 'Entry speed under fatigue'), 'speed'),
        dr(T('نجي-كومي (رمي كامل)', 'Nage-komi (full throws)'), { sets: 5, reps: '5/side', rest: '60s' }, T('إتمام الرمية بقوة وتحكم', 'Complete the throw with power and control'), 'power'),
        dr(T('تحول من الوقوف للأرضي: سيطرة وخنق وكتم', 'Tachi-waza to ne-waza: pins, chokes, armlocks'), { sets: 4, reps: '5', rest: '45s' }, T('استغلال الفرصة على الأرض', 'Capitalise on the ground'), 'technique'),
        ...cdCombat()
      ]),
    jd_randori: ses(T('راندوري وقوف وأرضي', 'Standing & ground randori'),
      T('تحمل نزالات ٤ دقايق وتطبيق الخطة ضد شركاء مختلفين', 'Endurance for 4-minute contests and applying tactics against varied partners'),
      ['anaerobic', 'tactics', 'muscular_endurance', 'mental'], 8, 90, [
        ...wuGrap(),
        tm(T('راندوري وقوف (تاتشي-وازا)', 'Standing randori (tachi-waza)'), 1, '8', '4min', '8', 'rpe', '1min', T('محاكاة النزال بزمنه الحقيقي', 'Contest simulation at real duration'), 'anaerobic',
          { note: T('شريك جديد كل جولة، ٢ جولة ضد أتقل منك', 'Fresh partner each round, 2 rounds vs heavier partner') }),
        tm(T('راندوري أرضي (ني-وازا)', 'Ground randori (ne-waza)'), 1, '5', '3min', '8', 'rpe', '1min', T('تحمل وسيطرة على الأرض', 'Endurance and control on the ground'), 'muscular_endurance'),
        tm(T('جولات جولدن سكور من وضع التعادل', 'Golden-score rounds from a tie'), 1, '3', '1min', '9', 'rpe', '1min', T('حسم النزال تحت تعب', 'Decide the contest under fatigue'), 'mental'),
        ...cdCombat()
      ]),
    jd_cond: ses(T('لياقة خاصة بالجودو وقبضة', 'Judo conditioning & grip'),
      T('تحمل لاهوائي متكرر وقوة تحمل القبضة', 'Repeated anaerobic endurance and grip endurance'),
      ['anaerobic', 'muscular_endurance', 'power'], 8, 65, [
        ...wuGrap(),
        tm(T('فترات أوتشيكومي بالأستك', 'Band uchikomi intervals'), 3, '6', '20s', '9', 'rpe', '10s', T('محاكاة تبادل الهجمات في النزال', 'Mimics attack exchanges in a contest'), 'anaerobic', { setRest: '2min' }),
        st('ad_rope_climb', 4, '1', '8', 'rpe', '90s', T('قوة السحب والقبضة', 'Pulling and grip strength'), 'strength'),
        tm(T('تعليق على البدلة (جي هانج)', 'Gi hang'), 3, '1', '30-45s', '9', 'rpe', '90s', T('تحمل القبضة زي مسكة الكم والياقة', 'Grip endurance like sleeve/lapel grips'), 'muscular_endurance'),
        rn('ad_sled_push_sprints', { sets: 1, reps: '6', distance: '15m', intensity: '9', basis: 'rpe', rest: '60s', restType: 'walk' }, T('قدرة الدفع بالرجلين', 'Leg drive power'), 'power'),
        ...cdCombat()
      ]),
    jd_comp: ses(T('محاكاة بطولة / يوم بطولة', 'Competition simulation / tournament day'),
      T('نزالات متتالية بقواعد البطولة وراحة زي الجدول الحقيقي', 'Back-to-back contests under competition rules with real schedule rests'),
      ['tactics', 'anaerobic', 'mental'], 9, 80, [
        ...wuGrap(),
        tm(T('نزالات بقواعد IJF ضد شركاء متجددين', 'IJF-rules contests vs fresh partners'), 1, '4', '4min', '9', 'rpe', '10min', T('محاكاة أدوار البطولة', 'Simulates tournament rounds'), 'tactics',
          { note: T('في يوم البطولة: إحماء ٢٠ د قبل كل نزال وكربوهيدرات ومياه بين الأدوار', 'On tournament day: 20min warm-up before each contest, carbs and fluids between rounds') }),
        dr(T('مراجعة الفيديو والقرارات مع المدرب', 'Video and decision review with coach'), { sets: 1, duration: '15min' }, T('تعلم من النزالات', 'Learn from the contests'), 'tactics'),
        ...cdCombat()
      ]),
    gym_base: gymCombat('base', [PH.grip, PH.neck]),
    gym_max: gymCombat('max', [PH.grip, PH.neck]),
    gym_power: gymCombat('power', [PH.grip, PH.neck]),
    gym_maint: gymCombat('maint', [PH.grip]),
    recovery: recovery([mob('ad_shoulder_cars', { sets: 1, reps: '5/direction' })])
  }
};

/* ---------------- Wrestling ---------------- */
const wrestling = {
  id: 'pt_wrestling_season_int',
  sport: 'wrestling',
  level: 'intermediate',
  title: T('موسم مصارعة — مستوى متوسط', 'Wrestling season — intermediate'),
  goal: T('رفع قوة الجسم كله والرقبة والقبضة، وسرعة الشوت والدفاع بالسبرول، وتحمل نزال ٢ × ٣ دقايق، مع ثبات الوزن داخل الفئة بطريقة آمنة.',
    'Build whole-body, neck and grip strength, shot speed and sprawl defence, and endurance for a 2 x 3min match, while holding weight safely within the class.'),
  components: ['strength', 'power', 'anaerobic', 'muscular_endurance', 'technique', 'tactics', 'aerobic', 'prevention'],
  sessionsPerWeek: 6,
  periods: seasonPeriods({
    gppGoal: T('قاعدة هوائية وقوة عامة ورقبة وتكنيك الوقفة والشوت', 'Aerobic base, general strength, neck and stance/shot technique'),
    gppComp: ['aerobic', 'strength', 'technique', 'prevention'],
    b1Goal: T('حجم دريلنج عالي وقوة عامة وتقوية الرقبة', 'High drilling volume, general strength and neck conditioning'),
    sppGoal: T('قوة قصوى ومصارعة لايف وتحمل خاص', 'Maximal strength, live wrestling and specific endurance'),
    sppComp: ['max_strength', 'anaerobic', 'muscular_endurance', 'technique'],
    b2Goal: T('زيادة جولات اللايف وقوة السحب والدفع', 'More live rounds and pulling/pushing strength'),
    preGoal: T('قدرة انفجارية للشوت ومحاكاة البطولة', 'Explosive shot power and tournament simulation'),
    preComp: ['power', 'anaerobic', 'tactics', 'mental'],
    b3Goal: T('سرعة الشوت والإنهاء ونزالات متتالية', 'Shot speed, finishes and back-to-back matches'),
    compGoal: T('تهدئة ووصول للوزن والبطولة', 'Taper, make weight and compete'),
    compComp: ['power', 'tactics', 'recovery', 'mental'],
    b4Goal: T('حجم أقل وحدة عالية والوزن داخل الفئة بدون تجفيف قاسي', 'Lower volume, high sharpness, weight within class without harsh dehydration'),
    patTest: ['test', 'wr_tech', '', 'wr_tech', 'gym_base', 'recovery', ''],
    patGpp: ['wr_tech', 'gym_base', 'wr_live', 'wr_tech', 'gym_base', 'wr_cond', ''],
    patSpp: ['wr_tech', 'gym_max', 'wr_live', 'wr_cond', 'gym_max', 'wr_live', ''],
    patPre: ['wr_live', 'gym_power', 'wr_tech', 'wr_comp', 'gym_power', 'wr_cond', ''],
    patRetest: ['test', 'wr_tech', 'recovery', 'wr_live', 'wr_tech', '', ''],
    patComp: ['wr_tech', 'gym_maint', 'wr_live', 'recovery', 'wr_tech', 'wr_comp', '']
  }),
  sessions: {
    test: combatTest(tm(T('اختبار سبرول + شوت: أقصى تكرار في ٦٠ ث', 'Sprawl-and-shot test — max reps in 60s'), 2, '1', '60s', '10', 'rpe', '3min',
      T('تحمل لاهوائي خاص بالمصارعة', 'Wrestling-specific anaerobic endurance'), 'anaerobic'), true),
    wr_tech: ses(T('تكنيك — وقفة وشوت وسبرول وبارتير', 'Technique — stance, shots, sprawl & par terre'),
      T('سرعة ونظافة الشوت، دفاع السبرول، والسيطرة في البارتير', 'Fast clean shots, sprawl defence and par-terre control'),
      ['technique', 'tactics', 'coordination', 'muscular_endurance'], 7, 90, [
        ...wuGrap(),
        dr(T('وقفة وحركة (Stance & motion) مع تغيير مستوى', 'Stance and motion with level changes'), { sets: 3, duration: '1min', rest: '30s' }, T('وقفة ثابتة وحركة سريعة', 'Solid stance and quick motion'), 'technique'),
        dr(T('خطوة الاختراق + سنجل ودابل ليج', 'Penetration step + single/double leg'), { sets: 5, reps: '8/side', rest: '45s' }, T('سرعة ودقة الشوت', 'Shot speed and precision'), 'technique'),
        dr(T('سبرول ثم الالتفاف خلف الخصم (Go-behind)', 'Sprawl to go-behind'), { sets: 4, reps: '6', rest: '45s' }, T('دفاع وتحويله لنقاط', 'Defend and convert to points'), 'technique'),
        dr(T('صراع الإيدين (Hand fighting)', 'Hand fighting'), { sets: 4, duration: '1min', rest: '30s' }, T('السيطرة على الإيدين والوصول لزاوية الشوت', 'Control ties and create shot angles'), 'tactics'),
        dr(T('بارتير: جات رينش وليج ليس ودفاعهم', 'Par terre: gut wrench, leg lace and defence'), { sets: 4, reps: '5', rest: '45s' }, T('نقاط من الأرض', 'Scoring from par terre'), 'technique'),
        ...cdCombat()
      ]),
    wr_live: ses(T('مصارعة لايف', 'Live wrestling'),
      T('تحمل النزال وتطبيق التكنيك تحت مقاومة كاملة', 'Match endurance and technique under full resistance'),
      ['anaerobic', 'tactics', 'muscular_endurance', 'mental'], 8, 90, [
        ...wuGrap(),
        tm(T('لايف من الوقوف', 'Live from neutral'), 1, '6', '3min', '8', 'rpe', '1min', T('محاكاة فترات النزال', 'Simulates match periods'), 'anaerobic', { note: T('شريك جديد كل جولة', 'Fresh partner every round') }),
        tm(T('مواقف: ٣٠ ث شوت كلوك / بارتير', 'Situations: 30s shot clock / par terre'), 1, '6', '30s', '9', 'rpe', '30s', T('التعامل مع مواقف النقاط الحاسمة', 'Handle critical scoring situations'), 'tactics'),
        tm(T('جولات "أول نقطة تكسب"', 'First-score-wins rounds'), 1, '4', '1min', '9', 'rpe', '1min', T('المبادرة والحسم', 'Initiative and finishing'), 'mental'),
        PH.neckSide(),
        ...cdCombat()
      ]),
    wr_cond: ses(T('لياقة خاصة بالمصارعة', 'Wrestling conditioning'),
      T('تحمل لاهوائي متكرر وقوة تحمل الجسم كله', 'Repeated anaerobic endurance and whole-body strength endurance'),
      ['anaerobic', 'muscular_endurance', 'power'], 8, 65, [
        ...wuGrap(),
        tm(T('فترات سبرول + شوت', 'Sprawl + shot intervals'), 3, '6', '20s', '9', 'rpe', '10s', T('تكرار المجهود زي تبادل الهجمات', 'Repeat efforts like attack exchanges'), 'anaerobic', { setRest: '2min' }),
        st(T('حمل الزميل (Buddy carry)', 'Buddy carry'), 4, '20m', '8', 'rpe', '90s', T('قوة الرجلين والجذع تحت وزن حقيقي', 'Leg and trunk strength under live load'), 'muscular_endurance'),
        st('ad_rope_climb', 4, '1', '8', 'rpe', '90s', T('قوة السحب والقبضة', 'Pulling and grip strength'), 'strength'),
        rn('ad_hill_sprint', { sets: 1, reps: '8', duration: '12s', intensity: '95', basis: 'vmax', rest: '60s', restType: 'walk' }, T('قدرة الرجلين والتسارع', 'Leg power and acceleration'), 'power'),
        ...cdCombat()
      ]),
    wr_comp: ses(T('محاكاة بطولة / يوم بطولة', 'Tournament simulation / competition day'),
      T('نزالات متتالية بقواعد UWW وراحة زي جدول البطولة', 'Back-to-back UWW-rules matches with tournament-like rests'),
      ['tactics', 'anaerobic', 'mental'], 9, 80, [
        ...wuGrap(),
        tm(T('نزالات ٢ × ٣ د (راحة ٣٠ ث بين الفترتين)', 'Matches of 2 x 3min (30s between periods)'), 1, '4', '6min', '9', 'rpe', '12min', T('محاكاة أدوار البطولة', 'Simulates tournament rounds'), 'tactics',
          { note: T('وزن الصبح، كربوهيدرات ومياه بين الأدوار', 'Morning weigh-in; carbs and fluids between rounds') }),
        dr(T('مراجعة فيديو وقرارات', 'Video and decision review'), { sets: 1, duration: '15min' }, T('تعلم من النزالات', 'Learn from the matches'), 'tactics'),
        ...cdCombat()
      ]),
    gym_base: gymCombat('base', [PH.neck, PH.grip]),
    gym_max: gymCombat('max', [PH.neck, PH.grip]),
    gym_power: gymCombat('power', [PH.neck, PH.neckSide]),
    gym_maint: gymCombat('maint', [PH.neck]),
    recovery: recovery([mob('ad_neck_cars', { sets: 1, reps: '5/direction' })])
  }
};

/* ---------------- Karate kumite ---------------- */
const karate = {
  id: 'pt_karate_season_int',
  sport: 'karate',
  level: 'intermediate',
  title: T('موسم كاراتيه كوميتيه — مستوى متوسط', 'Karate kumite season — intermediate'),
  goal: T('رفع سرعة رد الفعل والانفجارية في الدخول والتوقيت، وتحمل نزالات ٣ دقايق متتالية، مع وقاية الخلفية والمقربات والكاحل.',
    'Raise reaction speed, explosive entries and timing, and endurance for successive 3-minute bouts, while protecting hamstrings, adductors and ankles.'),
  components: ['reaction', 'speed', 'power', 'anaerobic', 'agility', 'technique', 'tactics', 'prevention'],
  sessionsPerWeek: 6,
  periods: seasonPeriods({
    gppGoal: T('قاعدة هوائية وقوة عامة وكيهون ومرونة', 'Aerobic base, general strength, kihon and flexibility'),
    gppComp: ['aerobic', 'strength', 'technique', 'mobility'],
    b1Goal: T('حجم تكنيك عالي وقوة عامة', 'High technical volume and general strength'),
    sppGoal: T('قوة قصوى وسرعة وتحمل نزالات', 'Maximal strength, speed and bout endurance'),
    sppComp: ['max_strength', 'speed', 'anaerobic', 'technique'],
    b2Goal: T('سرعة الدخول والتوقيت مع تحمل لاهوائي', 'Entry speed and timing with anaerobic endurance'),
    preGoal: T('قدرة وسرعة رد فعل ونزالات بقواعد WKF', 'Power, reaction speed and WKF-rules bouts'),
    preComp: ['power', 'reaction', 'tactics', 'mental'],
    b3Goal: T('أقصى سرعة ورد فعل ونزالات متتالية', 'Maximal speed and reaction with successive bouts'),
    compGoal: T('تهدئة ووزن ثابت وبطولة', 'Taper, stable weight and competition'),
    compComp: ['speed', 'tactics', 'recovery', 'mental'],
    b4Goal: T('حجم أقل وسرعة عالية وثقة', 'Lower volume, high speed and confidence'),
    patTest: ['test', 'ka_tech', '', 'ka_tech', 'gym_base', 'recovery', ''],
    patGpp: ['ka_tech', 'gym_base', 'ka_cond', 'ka_tech', 'gym_base', 'ka_kumite', ''],
    patSpp: ['ka_tech', 'gym_max', 'ka_kumite', 'ka_speed', 'gym_max', 'ka_cond', ''],
    patPre: ['ka_speed', 'gym_power', 'ka_kumite', 'ka_tech', 'gym_power', 'ka_kumite', ''],
    patRetest: ['test', 'ka_tech', 'recovery', 'ka_kumite', 'ka_speed', '', ''],
    patComp: ['ka_tech', 'gym_maint', 'ka_speed', 'recovery', 'ka_tech', 'ka_kumite', '']
  }),
  sessions: {
    test: combatTest(tm(T('اختبار سرعة الضربات على البادات (عدد صحيح في ١٠ ث)', 'Pad strike speed test — clean strikes in 10s'), 3, '1', '10s', '10', 'rpe', '2min',
      T('سرعة وتكرار الضربات', 'Striking speed and frequency'), 'speed'), false),
    ka_tech: ses(T('تكنيك — ضربات وركلات وحركة قدمين', 'Technique — punches, kicks & footwork'),
      T('سرعة ودقة الكيزامي والجياكو والماواشي مع التحكم في المسافة', 'Fast accurate kizami, gyaku and mawashi with distance control'),
      ['technique', 'speed', 'coordination', 'tactics'], 6, 90, [
        ...wuKick(),
        dr(T('كيزامي-زوكي وجياكو-زوكي على البادات', 'Kizami-zuki and gyaku-zuki on pads'), { sets: 5, reps: '10/side', rest: '45s' }, T('دخول سريع ورجوع للمسافة', 'Fast entry and return to distance'), 'technique'),
        dr(T('ماواشي-جيري جودان وتشودان', 'Mawashi-geri jodan and chudan'), { sets: 4, reps: '8/side', rest: '45s' }, T('ركلات بنقاط عالية بتحكم', 'Controlled high-scoring kicks'), 'technique'),
        dr(T('حركة قدمين ومسافة (أشي-صاباكي) مع شريك', 'Footwork and distance (ashi-sabaki) with partner'), { sets: 4, duration: '2min', rest: '45s' }, T('التحكم في المسافة والتوقيت', 'Distance and timing control'), 'tactics'),
        dr(T('مرتدات (ديآي) على هجوم الخصم', 'Counter-attacks (deai) on opponent\'s attack'), { sets: 4, reps: '8', rest: '45s' }, T('توقيت المرتدة', 'Counter timing'), 'reaction'),
        ...cdKick()
      ]),
    ka_kumite: ses(T('كوميتيه — نزالات تدريبية', 'Kumite — practice bouts'),
      T('تطبيق الخطة في نزالات ٣ دقايق بقواعد WKF', 'Apply tactics in 3-minute WKF-rules bouts'),
      ['tactics', 'anaerobic', 'reaction', 'mental'], 8, 85, [
        ...wuKick(),
        dr(T('مواقف: سنشو (أول نقطة) وآخر ٣٠ ث', 'Scenarios: senshu (first point) and last 30s'), { sets: 6, duration: '30s', rest: '30s' }, T('إدارة النتيجة والوقت', 'Score and clock management'), 'tactics'),
        tm(T('نزالات كوميتيه بقواعد WKF', 'Kumite bouts under WKF rules'), 1, '6', '3min', '8', 'rpe', '1min', T('محاكاة النزال بزمنه', 'Bout simulation at real duration'), 'anaerobic',
          { note: T('خصوم مختلفين في الطول والأسلوب', 'Opponents of varied height and style') }),
        ...cdKick()
      ]),
    ka_speed: ses(T('سرعة ورد فعل وانفجارية', 'Speed, reaction & power'),
      T('رد فعل بصري ودخول انفجاري بأقل زمن', 'Visual reaction and explosive entries in minimal time'),
      ['reaction', 'speed', 'power', 'agility'], 7, 60, [
        ...wuKick(),
        dr('dr_discs_react', { sets: 3, reps: '6', rest: '45s' }, T('رد فعل بصري', 'Visual reaction'), 'reaction'),
        tm(T('بادات رد فعل: المدرب يفتح والمقاتل يضرب', 'Reaction pads: coach flashes, athlete strikes'), 1, '6', '10s', '10', 'rpe', '50s', T('زمن رد فعل ودقة', 'Reaction time and accuracy'), 'reaction'),
        dr('ad_pogo_hop', { sets: 3, reps: '15', rest: '60s' }, T('مرونة الكاحل وسرعة الارتداد', 'Ankle stiffness and rebound speed'), 'power'),
        st('ad_lateral_bound_and_stick', 3, '4/side', '8', 'rpe', '75s', T('انفجارية جانبية للزاوية', 'Lateral explosiveness for angles'), 'power'),
        rn('ad_reaction_start_sprint', { sets: 1, reps: '6', distance: '5m', intensity: '100', basis: 'vmax', rest: '60s', restType: 'walk' }, T('انطلاقة برد فعل', 'Reactive starts'), 'acceleration'),
        ...cdKick()
      ]),
    ka_cond: ses(T('لياقة خاصة — فترات', 'Specific conditioning — intervals'),
      T('تحمل لاهوائي متكرر لنزالات متتالية', 'Repeated anaerobic endurance for successive bouts'),
      ['anaerobic', 'aerobic', 'speed'], 8, 60, [
        ...wuKick(),
        tm(T('فترات بادات بأقصى سرعة', 'Maximal-speed pad intervals'), 1, '10', '20s', '9', 'rpe', '40s', T('محاكاة تبادل الهجمات', 'Simulates attack exchanges'), 'anaerobic'),
        tm(T('حركة قدمين بونس + دخول بإشارة', 'Bounce footwork + entries on cue'), 3, '4', '30s', '8', 'rpe', '30s', T('تحمل حركة القدمين', 'Footwork endurance'), 'anaerobic', { setRest: '2min' }),
        tm('wg_assault_bike', 1, '6', '30s', '9', 'rpe', '90s', T('قدرة لاهوائية بدون صدمات', 'Low-impact anaerobic capacity'), 'anaerobic'),
        ...cdKick()
      ]),
    gym_base: gymCombat('base', [PH.ham, PH.groin]),
    gym_max: gymCombat('max', [PH.ham, PH.groin]),
    gym_power: gymCombat('power', [PH.ham, PH.ankle]),
    gym_maint: gymCombat('maint', [PH.groin]),
    recovery: recovery([mob('wg_butterfly_stretch', { sets: 2, duration: '45s' })])
  }
};

/* ---------------- Taekwondo ---------------- */
const taekwondo = {
  id: 'pt_taekwondo_season_int',
  sport: 'taekwondo',
  level: 'intermediate',
  title: T('موسم تايكوندو — مستوى متوسط', 'Taekwondo season — intermediate'),
  goal: T('رفع سرعة وتكرار الركلات والقدرة الانفجارية ومرونة الحوض، وتحمل جولات ٢ دقيقة (أفضل ٣ جولات)، مع وقاية الخلفية والكاحل والمقربات.',
    'Raise kick speed and frequency, explosive power and hip mobility, plus endurance for 2-minute rounds (best of 3), while protecting hamstrings, ankles and adductors.'),
  components: ['speed', 'power', 'anaerobic', 'reaction', 'mobility', 'technique', 'tactics', 'prevention'],
  sessionsPerWeek: 6,
  periods: seasonPeriods({
    gppGoal: T('قاعدة هوائية وقوة عامة ومرونة وحجم ركلات', 'Aerobic base, general strength, flexibility and kick volume'),
    gppComp: ['aerobic', 'strength', 'mobility', 'technique'],
    b1Goal: T('حجم ركلات عالي ومرونة وقوة عامة', 'High kicking volume, flexibility and general strength'),
    sppGoal: T('قوة قصوى وسرعة ركلات وتحمل الجولات', 'Maximal strength, kick speed and round endurance'),
    sppComp: ['max_strength', 'speed', 'anaerobic', 'technique'],
    b2Goal: T('تكرار ركلات سريع تحت تعب', 'Fast kick repetition under fatigue'),
    preGoal: T('قدرة ورد فعل ونزالات بقواعد WT', 'Power, reaction and WT-rules bouts'),
    preComp: ['power', 'reaction', 'tactics', 'mental'],
    b3Goal: T('أقصى سرعة ركلات وقرارات تكتيكية', 'Maximal kick speed and tactical decisions'),
    compGoal: T('تهدئة ووزن داخل الفئة وبطولة', 'Taper, weight within category and competition'),
    compComp: ['speed', 'tactics', 'recovery', 'mental'],
    b4Goal: T('حجم أقل وحدة عالية والوزن بدون تجفيف قاسي', 'Lower volume, high sharpness, weight without harsh dehydration'),
    patTest: ['test', 'tkd_kick', '', 'tkd_kick', 'gym_base', 'recovery', ''],
    patGpp: ['tkd_kick', 'gym_base', 'tkd_cond', 'tkd_kick', 'gym_base', 'tkd_spar', ''],
    patSpp: ['tkd_kick', 'gym_max', 'tkd_spar', 'tkd_speed', 'gym_max', 'tkd_cond', ''],
    patPre: ['tkd_speed', 'gym_power', 'tkd_spar', 'tkd_kick', 'gym_power', 'tkd_spar', ''],
    patRetest: ['test', 'tkd_kick', 'recovery', 'tkd_spar', 'tkd_speed', '', ''],
    patComp: ['tkd_kick', 'gym_maint', 'tkd_speed', 'recovery', 'tkd_kick', 'tkd_spar', '']
  }),
  sessions: {
    test: combatTest(dr(T('اختبار سرعة الركلة FSKT-10s (بانديل تشاجي بالتبادل)', 'Frequency Speed of Kick Test — FSKT-10s (alternating bandal chagi)'), { sets: 2, reps: '1', rest: '3min' },
      T('سرعة وتكرار الركلات', 'Kick speed and frequency'), 'speed'), false),
    tkd_kick: ses(T('تكنيك — ركلات على البادلز والدرع', 'Technique — paddle & body-protector kicks'),
      T('سرعة ودقة الركلات مع حركة قدمين وتغيير زاوية', 'Fast accurate kicks with footwork and angle changes'),
      ['technique', 'speed', 'coordination', 'mobility'], 6, 90, [
        ...wuKick(),
        dr(T('بانديل تشاجي على البادلز', 'Bandal chagi on paddles'), { sets: 5, reps: '10/leg', rest: '45s' }, T('ركلة سريعة للنقاط', 'Fast scoring kick'), 'technique'),
        dr(T('دوليو تشاجي على الدرع', 'Dollyo chagi to body protector'), { sets: 4, reps: '10/leg', rest: '45s' }, T('ركلة قوية تسجل على الـ PSS', 'Powerful kick that registers on PSS'), 'technique'),
        dr(T('كت كيك وركلة دفع (Push kick)', 'Cut kick and push kick'), { sets: 4, reps: '8/leg', rest: '45s' }, T('إيقاف تقدم الخصم', 'Stop the opponent\'s advance'), 'tactics'),
        dr(T('ركلات للراس (نيريو وديت تشاجي)', 'Head kicks (naeryo and dwit chagi)'), { sets: 3, reps: '6/leg', rest: '60s' }, T('ركلات بنقاط عالية', 'High-value scoring kicks'), 'technique'),
        ...cdKick()
      ]),
    tkd_spar: ses(T('نزالات تدريبية (كيوروجي)', 'Sparring (kyorugi)'),
      T('تطبيق الخطة في جولات ٢ دقيقة بقواعد WT', 'Apply tactics in 2-minute WT-rules rounds'),
      ['tactics', 'anaerobic', 'reaction', 'mental'], 8, 85, [
        ...wuKick(),
        tm(T('نزالات ٣ جولات × ٢ د (راحة ١ د)', 'Bouts of 3 x 2min rounds (1min rest)'), 3, '3', '2min', '8', 'rpe', '1min', T('محاكاة النزال بزمنه', 'Bout simulation at real duration'), 'anaerobic', { setRest: '5min' }),
        tm(T('جولات موقفية: متأخر بنقطتين آخر ٣٠ ث', 'Situational: down 2 points, last 30s'), 1, '4', '30s', '9', 'rpe', '60s', T('إدارة النتيجة والوقت', 'Score and clock management'), 'tactics'),
        ...cdKick()
      ]),
    tkd_speed: ses(T('سرعة ركلات ورد فعل', 'Kick speed & reaction'),
      T('أقصى سرعة ركلات ورد فعل وانفجارية الرجل', 'Maximal kick speed, reaction and leg explosiveness'),
      ['speed', 'reaction', 'power'], 7, 60, [
        ...wuKick(),
        tm(T('أقصى عدد ركلات على البادل في ١٠ ث', 'Max paddle kicks in 10s'), 1, '6', '10s', '10', 'rpe', '50s', T('سرعة تكرار الركلة', 'Kick frequency'), 'speed'),
        tm(T('ركلة برد فعل على إشارة المدرب', 'Reaction kicks on coach signal'), 1, '8', '8s', '10', 'rpe', '30s', T('زمن رد الفعل', 'Reaction time'), 'reaction'),
        dr('ad_pogo_hop', { sets: 3, reps: '15', rest: '60s' }, T('مرونة الكاحل وارتداد سريع', 'Ankle stiffness and fast rebound'), 'power'),
        st('ad_single_leg_lateral_hop_and_stick', 3, '5/side', '7', 'rpe', '60s', T('ثبات الرجل الأساسية في الركلة', 'Support-leg stability when kicking'), 'balance'),
        ...cdKick()
      ]),
    tkd_cond: ses(T('لياقة خاصة — فترات بادلز', 'Specific conditioning — paddle intervals'),
      T('تحمل لاهوائي خاص بجولات ٢ دقيقة', 'Anaerobic endurance for 2-minute rounds'),
      ['anaerobic', 'aerobic', 'speed'], 8, 60, [
        ...wuKick(),
        tm(T('فترات ركلات بالبادلز', 'Paddle kick intervals'), 3, '8', '10s', '9', 'rpe', '20s', T('محاكاة تبادل الهجمات في الجولة', 'Simulates attack exchanges in a round'), 'anaerobic', { setRest: '3min' }),
        rn(T('جري ٢٠٠م متكرر', '200m repeats'), { sets: 1, reps: '6', distance: '200m', intensity: '85', basis: 'best', rest: '90s', restType: 'walk' }, T('تحمل لاهوائي وهوائي', 'Anaerobic and aerobic endurance'), 'anaerobic'),
        ...cdKick()
      ]),
    gym_base: gymCombat('base', [PH.ham, PH.groin]),
    gym_max: gymCombat('max', [PH.ham, PH.ankle]),
    gym_power: gymCombat('power', [PH.ham, PH.groin]),
    gym_maint: gymCombat('maint', [PH.ankle]),
    recovery: recovery([mob('ad_pigeon_stretch', { sets: 1, duration: '60s' }), mob('wg_butterfly_stretch', { sets: 2, duration: '45s' })])
  }
};

/* ---------------- Kickboxing (fight camp) ---------------- */
const kickboxing = {
  id: 'pt_kickboxing_camp_int',
  sport: 'kickboxing',
  level: 'intermediate',
  title: T('معسكر نزال كيك بوكسينج — ١٠ أسابيع (متوسط)', 'Kickboxing fight camp — 10 weeks (intermediate)'),
  goal: T('تجهيز المقاتل لنزال ٣ جولات × ٣ دقايق: تركيبات لكم وركل، تحمل جولات، قوة وقدرة، سبارينج متدرج، ونزول وزن تدريجي آمن مع تهدئة قبل النزال.',
    'Prepare a fighter for a 3 x 3min bout: punch-kick combinations, round endurance, strength and power, progressive sparring, and safe gradual weight loss with a pre-fight taper.'),
  components: ['anaerobic', 'aerobic', 'power', 'strength', 'technique', 'tactics', 'reaction', 'prevention'],
  sessionsPerWeek: 5,
  periods: [
    {
      type: 'gpp',
      goal: T('قاعدة هوائية وقوة عامة وتكنيك', 'Aerobic base, general strength and technique'),
      components: ['aerobic', 'strength', 'technique'],
      blocks: [
        { name: T('أسبوع ١ — اختبارات ووزن', 'Week 1 — Testing & weigh-in'), goal: T('تقييم بدني وتسجيل الوزن وخطة النزول', 'Physical testing, body mass and weight plan'),
          components: ['power', 'aerobic', 'anaerobic'], loads: [4], weekTypes: ['test'], pattern: ['test', 'kb_tech', '', 'kb_road', 'gym_base', '', ''] },
        { name: T('بلوك ١ — قاعدة', 'Block 1 — Base'), goal: T('رود ورك وتكنيك وقوة عامة', 'Roadwork, technique and general strength'),
          components: ['aerobic', 'strength', 'technique'], loads: [5, 6], weekTypes: ['load', 'load'], pattern: ['kb_tech', 'gym_base', 'kb_road', 'kb_tech', 'gym_base', '', ''] }
      ]
    },
    {
      type: 'spp',
      goal: T('قوة قصوى وسبارينج متدرج وتحمل جولات', 'Maximal strength, progressive sparring and round endurance'),
      components: ['max_strength', 'anaerobic', 'tactics'],
      blocks: [
        { name: T('بلوك ٢ — قوة وسبارينج', 'Block 2 — Strength & sparring'), goal: T('زيادة جولات السبارينج وفترات لاهوائية', 'Build sparring rounds and anaerobic intervals'),
          components: ['max_strength', 'anaerobic', 'tactics'], loads: [6, 7, 5], weekTypes: ['load', 'shock', 'deload'], pattern: ['kb_spar', 'gym_max', 'kb_tech', 'kb_hiit', 'gym_max', 'kb_road', ''] }
      ]
    },
    {
      type: 'precomp',
      goal: T('ذروة السبارينج وقدرة انفجارية وخطة الخصم', 'Peak sparring, explosive power and opponent plan'),
      components: ['power', 'anaerobic', 'tactics', 'mental'],
      blocks: [
        { name: T('بلوك ٣ — ذروة المعسكر', 'Block 3 — Camp peak'), goal: T('سبارينج بمسافة النزال + جولة، وتباين قدرة', 'Sparring at fight distance plus one round, and contrast power'),
          components: ['power', 'anaerobic', 'tactics'], loads: [7, 8], weekTypes: ['load', 'shock'], pattern: ['kb_spar', 'gym_power', 'kb_hiit', 'kb_spar', 'kb_tech', '', ''] }
      ]
    },
    {
      type: 'taper',
      goal: T('تهدئة وحدة والوصول للوزن بأمان', 'Taper, sharpen and make weight safely'),
      components: ['speed', 'power', 'recovery', 'mental'],
      blocks: [
        { name: T('أسبوع ٩ — تهدئة', 'Week 9 — Taper'), goal: T('حجم أقل ٤٠-٦٠٪ والوزن في حدود ٣-٥٪ من حد الفئة', 'Volume down 40-60%, mass within 3-5% of the limit'),
          components: ['speed', 'power', 'recovery'], loads: [5], weekTypes: ['taper'], pattern: ['kb_sharp', 'gym_maint', 'kb_tech', 'recovery', 'kb_sharp', '', ''] },
        { name: T('أسبوع النزال', 'Fight week'), goal: T('حدة وثقة. أي تعديل مياه بسيط وتحت إشراف طبي، وإعادة ترطيب بعد الميزان', 'Sharp and confident. Any water manipulation minimal and supervised; rehydrate after weigh-in'),
          components: ['speed', 'mental', 'recovery'], loads: [3], weekTypes: ['comp'], pattern: ['kb_sharp', 'recovery', 'kb_sharp', '', '', '', ''] }
      ]
    }
  ],
  sessions: {
    test: combatTest(tm(T('اختبار عدد الضربات (لكم وركل) على الكيس في ٣٠ ث', 'Strike output test — punches and kicks on the bag in 30s'), 2, '1', '30s', '10', 'rpe', '3min',
      T('سرعة وتحمل الضربات', 'Striking speed-endurance'), 'anaerobic'), false),
    kb_tech: ses(T('تكنيك — بادات وتاي بادز وكيس', 'Technique — pads, Thai pads & bag'),
      T('تركيبات لكم وركل ودفاع وحركة قدمين', 'Punch-kick combinations, defence and footwork'),
      ['technique', 'tactics', 'anaerobic'], 7, 85, [
        ...wuStrike(),
        tm(T('جولات بادات: تركيبات تنتهي بركلة', 'Pad rounds: combinations finishing with a kick'), 1, '5', '3min', '7', 'rpe', '1min', T('ربط اللكم بالركل', 'Link punches to kicks'), 'technique'),
        tm(T('جولات كيس ثقيل: لو كيك وركلات جسم', 'Heavy-bag rounds: low kicks and body kicks'), 1, '4', '3min', '8', 'rpe', '1min', T('قوة الركلة وتحمل الجولة', 'Kick power and round endurance'), 'anaerobic'),
        dr(T('دفاع: صد الركلة (تشيك) ومرتدة', 'Defence: kick check and counter'), { sets: 3, duration: '2min', rest: '1min' }, T('دفاع وتوقيت', 'Defence and timing'), 'reaction'),
        PH.neck(),
        ...cdCombat()
      ]),
    kb_spar: ses(T('سبارينج', 'Sparring'),
      T('تطبيق الخطة ضد شركاء مختلفين بعدد جولات متدرج', 'Apply the plan vs varied partners with progressive rounds'),
      ['tactics', 'anaerobic', 'mental'], 9, 80, [
        ...wuStrike(),
        tm(T('سبارينج كيك بوكسينج', 'Kickboxing sparring'), 1, '4-6', '3min', '8-9', 'rpe', '1min', T('ظروف النزال', 'Fight conditions'), 'tactics',
          { note: T('واقي راس وقصبة وجوانتي ١٦ أونصة، شريك جديد كل جولتين', 'Headgear, shin guards, 16oz gloves; new partner every 2 rounds') }),
        tm(T('فينشر على الكيس', 'Bag finisher'), 1, '3', '1min', '10', 'rpe', '1min', T('تحمل آخر الجولة', 'Late-round capacity'), 'anaerobic'),
        PH.neck(),
        ...cdCombat()
      ]),
    kb_road: ses(T('رود ورك — جري هوائي', 'Roadwork — aerobic run'),
      T('قاعدة هوائية واستشفاء وضبط وزن', 'Aerobic base, recovery and weight management'),
      ['aerobic', 'recovery'], 5, 55, [
        wu('ad_jog_in_place', { duration: '5min' }), wu('ex_leg_swings', { sets: 1, reps: '10/direction' }),
        rn('ad_zone_2_easy_run', { sets: 1, duration: '35min', intensity: 'Z2', basis: 'hr' }, T('تحمل هوائي', 'Aerobic endurance'), 'aerobic'),
        rn(T('ستريدز', 'Strides'), { sets: 1, reps: '6', distance: '80m', intensity: '80', basis: 'vmax', rest: '60s', restType: 'walk' }, T('سرعة ومرونة الخطوة', 'Speed and stride elasticity'), 'speed'),
        mob('ex_calf_stretch', { sets: 1, duration: '45s' })
      ]),
    kb_hiit: ses(T('لياقة خاصة — فترات', 'Fight conditioning — intervals'),
      T('تحمل لاهوائي وتكرار الانفجارات', 'Anaerobic capacity and repeat bursts'),
      ['anaerobic', 'vo2max', 'power'], 9, 65, [
        wu('ex_jump_rope', { duration: '6min' }), wu('ad_shadow_boxing', { sets: 2, duration: '3min' }),
        tm(T('كيس بانفجارات: ١٠ ث أقصى كل ٣٠ ث', 'Bag with bursts: 10s all-out every 30s'), 1, '5', '3min', '9', 'rpe', '1min', T('تغيير الإيقاع في النزال', 'Pace changes in the fight'), 'anaerobic'),
        tm('wg_assault_bike', 1, '8', '15s', '10', 'rpe', '45s', T('قدرة لاهوائية', 'Anaerobic power'), 'anaerobic'),
        tm(T('ركلات متبادلة على الكيس (سويتش كيك)', 'Alternating switch kicks on the bag'), 3, '1', '30s', '9', 'rpe', '60s', T('تحمل الرجلين تحت تعب', 'Leg endurance under fatigue'), 'muscular_endurance'),
        ...cdCombat()
      ]),
    kb_sharp: ses(T('حدة وسرعة — تهدئة', 'Sharpening — taper'),
      T('سرعة وتوقيت وثقة بحجم قليل', 'Speed, timing and confidence at low volume'),
      ['speed', 'reaction', 'mental'], 5, 45, [
        ...wuStrike(),
        tm(T('بادات بإيقاع النزال', 'Fight-pace pads'), 1, '3', '2min', '7', 'rpe', '1min', T('حدة التركيبات', 'Sharpen combinations'), 'technique'),
        tm(T('بادات رد فعل', 'Reaction pads'), 1, '6', '10s', '9', 'rpe', '50s', T('سرعة رد الفعل', 'Reaction speed'), 'reaction',
          { note: T('قيس الوزن الصبح وبالليل', 'Weigh morning and evening') }),
        ...cdCombat()
      ]),
    gym_base: gymCombat('base', [PH.neck, PH.ham]),
    gym_max: gymCombat('max', [PH.neck, PH.ham]),
    gym_power: gymCombat('power', [PH.neck, PH.groin]),
    gym_maint: gymCombat('maint', [PH.neck]),
    recovery: recovery([mob('ex_calf_stretch', { sets: 2, duration: '45s' })])
  }
};

/* ---------------- Fencing ---------------- */
function gymFence(phase) {
  const pre = [PH.knee(), PH.cuff()];
  if (phase === 'base') {
    return ses(T('جيم — قوة عامة وتوازن الجهتين', 'Gym — general strength & bilateral balance'),
      T('قوة عامة وتصحيح عدم التوازن بين الرجل الأمامية والخلفية', 'General strength and correcting front/back leg asymmetry'),
      ['strength', 'balance', 'core', 'prevention'], 6, 65, [
        ...wuGym(),
        st('ex_goblet_squat', 3, '10', '7', 'rpe', '90s', T('قوة الرجلين الأساسية', 'Basic leg strength'), 'strength', { tempo: '3-1-1-0' }),
        st('ex_reverse_lunge', 3, '8/leg', '7', 'rpe', '75s', T('قوة الطعنة والرجوع منها', 'Lunge and recovery strength'), 'strength', { note: T('ابدأ بالرجل الأضعف', 'Start with the weaker leg') }),
        st('ex_single_leg_rdl', 3, '8/leg', '7', 'rpe', '75s', T('خلفية قوية وتوازن', 'Hamstring strength and balance'), 'strength'),
        st('ex_hip_thrust', 3, '10', '65', '1rm', '90s', T('قوة دفع الحوض في الطعنة', 'Hip drive for the lunge'), 'strength'),
        PH.core(),
        ...pre,
        ...cdGym()
      ]);
  }
  if (phase === 'max') {
    return ses(T('جيم — قوة قصوى', 'Gym — maximal strength'),
      T('رفع القوة القصوى للرجلين كأساس لسرعة الطعنة', 'Raise maximal leg strength as a base for lunge speed'),
      ['max_strength', 'strength', 'core'], 7, 65, [
        ...wuGym(),
        st('wg_trap_bar_deadlift', 4, '4', '80-85', '1rm', '3min', T('قوة قصوى للجسم كله', 'Whole-body maximal strength'), 'max_strength', { tempo: '1-0-X-0' }),
        st('ex_bulgarian_split_squat', 4, '5/leg', '8', 'rpe', '2min', T('قوة الرجل الواحدة في وضع الطعنة', 'Single-leg strength in lunge position'), 'max_strength'),
        st('ex_lateral_lunge', 3, '6/side', '7', 'rpe', '90s', T('قوة المقربات والحوض', 'Adductor and hip strength'), 'strength'),
        PH.ham(),
        ...pre,
        ...cdGym()
      ]);
  }
  if (phase === 'power') {
    return ses(T('جيم — قدرة انفجارية', 'Gym — power'),
      T('سرعة الطعنة والفليش ورد الفعل الانفجاري', 'Lunge and flèche speed with explosive reactions'),
      ['power', 'speed', 'max_strength'], 7, 60, [
        ...wuGym(),
        st('ad_trap_bar_deadlift_to_broad_jump_contrast', 3, '3 + 3 jumps', '85', '1rm', '3min', T('تباين ثقيل ثم نط', 'Heavy-then-jump contrast'), 'power'),
        st('ad_alternate_leg_bound', 3, '6/leg', '8', 'rpe', '90s', T('انفجارية أفقية للفليش', 'Horizontal power for the flèche'), 'power'),
        st('ad_lateral_bound_and_stick', 3, '4/side', '8', 'rpe', '75s', T('قوة وثبات الهبوط', 'Power and landing control'), 'power'),
        ...pre,
        ...cdGym()
      ]);
  }
  return ses(T('جيم — صيانة في الموسم', 'Gym — in-season maintenance'),
    T('الحفاظ على القوة والسرعة بأقل تعب', 'Maintain strength and speed with minimal fatigue'),
    ['max_strength', 'power', 'prevention'], 5, 45, [
      ...wuGym(),
      st('ex_bulgarian_split_squat', 2, '5/leg', '7', 'rpe', '90s', T('صيانة قوة الرجل الواحدة', 'Maintain single-leg strength'), 'strength'),
      dr('ad_countermovement_jump', { sets: 3, reps: '3', rest: '90s' }, T('صيانة الانفجارية', 'Maintain power'), 'power'),
      ...pre,
      ...cdGym()
    ]);
}
const fencing = {
  id: 'pt_fencing_season_int',
  sport: 'fencing',
  level: 'intermediate',
  title: T('موسم سلاح (مبارزة) — مستوى متوسط', 'Fencing season — intermediate'),
  goal: T('رفع سرعة رد الفعل والطعنة وحركة القدمين، وتحمل الجولات (بول لـ ٥ لمسات وإقصاء لـ ١٥)، مع تصحيح عدم التوازن بين الجهتين ووقاية الركبة الأمامية والكتف.',
    'Raise reaction, lunge and footwork speed and endurance for pool bouts (to 5) and DE bouts (to 15), while correcting left-right asymmetry and protecting the front knee and shoulder.'),
  components: ['reaction', 'speed', 'power', 'agility', 'technique', 'tactics', 'anaerobic', 'prevention'],
  sessionsPerWeek: 5,
  periods: seasonPeriods({
    gppGoal: T('قاعدة هوائية وقوة عامة وحركة قدمين أساسية', 'Aerobic base, general strength and basic footwork'),
    gppComp: ['aerobic', 'strength', 'technique', 'balance'],
    b1Goal: T('حجم حركة قدمين عالي وقوة وتوازن الجهتين', 'High footwork volume, strength and bilateral balance'),
    sppGoal: T('قوة قصوى وسرعة حركة قدمين ودروس فنية', 'Maximal strength, footwork speed and technical lessons'),
    sppComp: ['max_strength', 'agility', 'technique', 'anaerobic'],
    b2Goal: T('سرعة الطعنة وتحمل حركة القدمين', 'Lunge speed and footwork endurance'),
    preGoal: T('قدرة ورد فعل ونزالات بول وإقصاء', 'Power, reaction and pool/DE bouting'),
    preComp: ['power', 'reaction', 'tactics', 'mental'],
    b3Goal: T('أقصى سرعة رد فعل ونزالات بظروف البطولة', 'Maximal reaction speed and bouts in tournament conditions'),
    compGoal: T('تهدئة وحدة وبطولة', 'Taper, sharpness and competition'),
    compComp: ['reaction', 'tactics', 'recovery', 'mental'],
    b4Goal: T('حجم أقل وحدة عالية وثقة', 'Lower volume, high sharpness and confidence'),
    patTest: ['test', 'fe_lesson', '', 'fe_foot', 'gym_base', '', ''],
    patGpp: ['fe_foot', 'gym_base', 'fe_lesson', '', 'gym_base', 'fe_bout', ''],
    patSpp: ['fe_foot', 'gym_max', 'fe_lesson', 'fe_speed', 'gym_max', 'fe_bout', ''],
    patPre: ['fe_speed', 'gym_power', 'fe_lesson', 'fe_bout', '', 'fe_bout', 'recovery'],
    patRetest: ['test', 'fe_lesson', 'recovery', 'fe_bout', '', '', ''],
    patComp: ['fe_lesson', 'gym_maint', 'fe_speed', 'recovery', '', 'fe_bout', '']
  }),
  sessions: {
    test: racketTest(tm(T('اختبار حركة القدمين: تقدم-تراجع-طعنة ٤ مرات على مسافة ١٤م', 'Footwork test: advance-retreat-lunge x4 over 14m'), 1, '2', '15s', '100', 'best', '3min',
      T('سرعة حركة القدمين الخاصة بالسلاح', 'Fencing-specific footwork speed'), 'agility')),
    fe_foot: ses(T('حركة قدمين وطعنة', 'Footwork & lunge'),
      T('سرعة وكفاءة التقدم والتراجع والطعنة والفليش مع توازن', 'Fast efficient advances, retreats, lunges and flèche with balance'),
      ['agility', 'speed', 'technique', 'anaerobic'], 7, 70, [
        ...wuCourt(),
        tm(T('سلالم حركة قدمين: تقدم-تراجع-طعنة', 'Footwork ladders: advance-retreat-lunge'), 1, '6', '30s', '8', 'rpe', '30s', T('سرعة وتحمل حركة القدمين', 'Footwork speed and endurance'), 'agility'),
        tm(T('"اتبع القائد" مع شريك (تغيير إيقاع)', 'Follow-the-leader with partner (rhythm changes)'), 1, '6', '20s', '9', 'rpe', '40s', T('رد فعل والحفاظ على المسافة', 'Reaction and distance keeping'), 'reaction'),
        dr(T('طعنة ورجوع سريع للوقفة (على هدف)', 'Lunge and fast recovery to guard (on target)'), { sets: 4, reps: '8', rest: '60s' }, T('سرعة ودقة الطعنة والرجوع', 'Lunge speed, accuracy and recovery'), 'speed'),
        dr(T('فليش من المسافة الصحيحة', 'Flèche from correct distance'), { sets: 3, reps: '5', rest: '60s' }, T('هجوم مفاجئ', 'Surprise attack'), 'power'),
        ...cdCourt()
      ]),
    fe_lesson: ses(T('درس فردي ودريلز مع شريك', 'Individual lesson & partner drills'),
      T('تحسين التكنيك واختيار التوقيت والمسافة', 'Refine technique, timing and distance choice'),
      ['technique', 'tactics', 'reaction'], 6, 75, [
        ...wuCourt(),
        dr(T('درس فردي مع المدرب', 'Individual lesson with coach'), { sets: 1, duration: '20min' }, T('تصحيح التكنيك والتكتيك', 'Technical and tactical correction'), 'technique'),
        dr(T('صد ورد (باراد-ريبوست)', 'Parry-riposte drills'), { sets: 4, reps: '10', rest: '45s' }, T('دفاع وهجوم مضاد', 'Defence and counter-attack'), 'technique'),
        dr(T('دريل المسافة والتوقيت مع شريك', 'Distance and timing drill with partner'), { sets: 4, duration: '3min', rest: '1min' }, T('اختيار لحظة الهجوم', 'Choosing the moment to attack'), 'tactics'),
        dr(T('دقة نقطة السلاح على هدف الحيطة', 'Point control on wall target'), { sets: 3, reps: '20', rest: '45s' }, T('دقة اللمسة', 'Touch accuracy'), 'technique'),
        ...cdCourt()
      ]),
    fe_bout: ses(T('نزالات بول وإقصاء', 'Pool & DE bouting'),
      T('تطبيق الخطة في نزالات بظروف البطولة', 'Apply tactics in tournament-like bouts'),
      ['tactics', 'anaerobic', 'mental', 'reaction'], 8, 90, [
        ...wuCourt(),
        dr(T('نزالات بول لـ ٥ لمسات (٣ د)', 'Pool bouts to 5 touches (3min)'), { sets: 6, duration: '3min', rest: '3min' }, T('محاكاة دور البول', 'Pool-round simulation'), 'tactics'),
        dr(T('نزالات إقصاء لـ ١٥ لمسة (٣ × ٣ د، راحة ١ د)', 'DE bouts to 15 (3 x 3min, 1min rest)'), { sets: 2, duration: '9min', rest: '10min' }, T('تحمل وتركيز نزالات الإقصاء', 'Endurance and focus for DE bouts'), 'anaerobic',
          { note: T('مياه وكربوهيدرات خفيفة بين النزالات', 'Fluids and light carbs between bouts') }),
        ...cdCourt()
      ]),
    fe_speed: ses(T('سرعة ورد فعل', 'Speed & reaction'),
      T('زمن رد فعل أقل وانطلاق انفجاري', 'Shorter reaction time and explosive starts'),
      ['reaction', 'speed', 'power'], 7, 55, [
        ...wuCourt(),
        dr('dr_discs_react', { sets: 3, reps: '6', rest: '45s' }, T('رد فعل بصري', 'Visual reaction'), 'reaction'),
        dr(T('طعنة على إشارة ضوئية/صوتية', 'Lunge on light/sound cue'), { sets: 5, reps: '4', rest: '45s' }, T('زمن رد الفعل في الطعنة', 'Lunge reaction time'), 'reaction'),
        rn('dr_sprint_accel', { sets: 1, reps: '6', distance: '10m', intensity: '100', basis: 'vmax', rest: '75s', restType: 'walk' }, T('تسارع', 'Acceleration'), 'acceleration'),
        dr('ad_pogo_hop', { sets: 3, reps: '15', rest: '60s' }, T('مرونة الكاحل', 'Ankle stiffness'), 'power'),
        ...cdCourt()
      ]),
    gym_base: gymFence('base'),
    gym_max: gymFence('max'),
    gym_power: gymFence('power'),
    gym_maint: gymFence('maint'),
    recovery: recovery([mob('ad_couch_stretch', { sets: 1, duration: '60s' })])
  }
};

export const PLAN_TEMPLATES_RC = [
  tennis, padel, squash, badminton, tableTennis,
  boxing, mma, judo, wrestling, karate, taekwondo, kickboxing, fencing
];
