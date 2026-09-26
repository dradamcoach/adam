/*
 * خطط موسمية جاهزة — ألعاب الميدان والرياضات الهوائية
 * وثب طويل، وثب عالي، دفع جلة، رمي رمح، دراجات طريق، تجديف ٢٠٠٠م،
 * ترايثلون أولمبي، ومشي صحي للمبتدئين.
 * كل قالب: فترات ← بلوكات ← أسابيع (حمل ١-١٠) ← تمرينات مفصلة.
 */

const t = (ar, en) => ({ ar, en });
const W = (ar, en, x) => ({ kind: 'warmup', name: t(ar, en), ...x });
const M = (ar, en, x) => ({ kind: 'mobility', name: t(ar, en), ...x });
const wl = (libId, x) => ({ kind: 'warmup', libId, ...x });
const ml = (libId, x) => ({ kind: 'mobility', libId, ...x });

/* إحماء وتهدئة المضمار (بيرجعوا نسخة جديدة كل مرة) */
const trackWU = (strides) => {
  const a = [
    W('جري خفيف + مرونة ديناميكية', 'Easy jog + dynamic mobility', { duration: '12min' }),
    wl('ex_leg_swings', { sets: 2, reps: '10/leg' }),
    wl('ad_a_skip', { sets: 2, distance: '20m' }),
    wl('ad_b_skip', { sets: 2, distance: '20m' })
  ];
  if (strides) a.push(wl('ad_strides', { sets: 1, reps: '3', distance: '60m', note: t('تدريجي لحد ٨٥٪ تقريبًا', 'Progressive up to about 85%') }));
  return a;
};
const trackCD = () => [
  M('جري خفيف للتهدئة + إطالات ثابتة', 'Easy cool-down jog + static stretching', { duration: '10min' }),
  ml('ex_hip_flexor_stretch', { sets: 2, duration: '40s', note: t('لكل رجل', 'Each side') })
];
const gymWU = () => [
  W('عجلة ثابتة خفيفة', 'Easy stationary bike', { duration: '8min' }),
  wl('ad_90_90_hip_switches', { sets: 2, reps: '8' }),
  wl('wg_banded_lateral_walk', { sets: 2, reps: '10/side' })
];
const gymCD = () => [
  M('إطالات ثابتة للرجلين والظهر', 'Static stretching legs and back', { duration: '8min' })
];
const throwWU = () => [
  W('جري خفيف + مرونة ديناميكية', 'Easy jog + dynamic mobility', { duration: '10min' }),
  wl('ex_band_external_rotation', { sets: 2, reps: '15' }),
  wl('ex_thoracic_rotation', { sets: 2, reps: '8/side' }),
  wl('ex_arm_circles', { sets: 1, reps: '15/direction' })
];

export const PLAN_TEMPLATES_FIELD = [
  /* ============================ ١) وثب طويل — متقدم ============================ */
  {
    id: 'pt_long_jump_adv',
    sport: 'long_jump',
    level: 'advanced',
    title: t('وثب طويل — متقدم (موسم ١٨ أسبوع)', 'Long jump — advanced (18-week season)'),
    goal: t('رفع سرعة الاقتراب اللي اللاعب يقدر يتحكم فيها وتحويل القوة القصوى لقدرة ارتقاء، مع ثبات علامات الاقتراب للوصول لأحسن رقم في البطولة الرئيسية.', 'Raise controllable approach speed and convert max strength into take-off power, with consistent approach marks, to peak at the main championship.'),
    components: ['acceleration', 'max_velocity', 'power', 'max_strength', 'technique'],
    sessionsPerWeek: 6,
    periods: [
      {
        type: 'gpp',
        goal: t('بناء القاعدة: قوة عامة، تحمل عضلي ومسار ارتقاء سليم، وكمية بليومتري منخفضة الشدة.', 'Build the base: general strength, work capacity and sound take-off mechanics with low-intensity plyometric volume.'),
        components: ['strength', 'acceleration', 'aerobic', 'technique'],
        blocks: [
          {
            name: t('بلوك ١ — اختبارات ودخول', 'Block 1 — Testing & entry'),
            goal: t('قياس خط الأساس (٣٠م، ٢٠م طاير، ٥ وثبات، 3RM) وتحديد الأحمال.', 'Baseline testing (30m, 20m fly, 5-bound, 3RM) to set training loads.'),
            components: ['acceleration', 'max_velocity', 'power', 'max_strength'],
            loads: [4], weekTypes: ['test'],
            pattern: ['lj_test', 'lj_tempo', 'lj_gen_strength', '', 'lj_gen_plyo', 'lj_tempo', '']
          },
          {
            name: t('بلوك ٢ — قاعدة عامة', 'Block 2 — General base'),
            goal: t('تضخيم وقوة عامة، تسارع على طلعة، وتكنيك ارتقاء من اقتراب قصير.', 'Hypertrophy and general strength, hill acceleration and take-off technique from short approaches.'),
            components: ['strength', 'hypertrophy', 'acceleration', 'technique'],
            loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['lj_accel', 'lj_gen_strength', 'lj_tempo', 'lj_gen_plyo', 'lj_gen_strength', 'lj_tech_short', '']
          }
        ]
      },
      {
        type: 'spp',
        goal: t('قوة قصوى ثم تحويلها لقدرة، بوندينج أفقي عالي الشدة، والانتقال من الاقتراب القصير للمتوسط والكامل.', 'Max strength then conversion to power, high-intensity horizontal bounding, and progression from short to mid and full approaches.'),
        components: ['max_strength', 'power', 'acceleration', 'max_velocity', 'technique'],
        blocks: [
          {
            name: t('بلوك ٣ — قوة قصوى واقتراب قصير', 'Block 3 — Max strength & short approach'),
            goal: t('سكوات ٨٥-٩٠٪ وكلين ٨٠-٨٥٪، بوندينج ١٥٠-١٧٠ ارتكاز، ووثبات من ٨-١٠ خطوات.', 'Squat 85-90% and clean 80-85%, 150-170 bounding contacts, and 8-10 stride approach jumps.'),
            components: ['max_strength', 'power', 'acceleration', 'technique'],
            loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['lj_accel', 'lj_max_strength', 'lj_tempo', 'lj_tech_short', 'lj_bounds', 'lj_max_strength', '']
          },
          {
            name: t('بلوك ٤ — تحويل القوة لقدرة', 'Block 4 — Power conversion'),
            goal: t('سرعة قصوى بالطاير والويكتس، تمارين تباين (كونتراست)، ووثبات من الاقتراب الكامل.', 'Max velocity (flying runs, wickets), contrast training and full-approach jumps.'),
            components: ['power', 'max_velocity', 'technique', 'max_strength'],
            loads: [7, 8, 5], weekTypes: ['load', 'shock', 'deload'],
            pattern: ['lj_maxv', 'lj_power', 'lj_tempo', 'lj_tech_full', 'lj_bounds', 'lj_max_strength', '']
          }
        ]
      },
      {
        type: 'precomp',
        goal: t('إعادة الاختبار، تثبيت الاقتراب الكامل تحت ضغط، ومسابقات تجريبية.', 'Retest, stabilise the full approach under pressure and use control competitions.'),
        components: ['technique', 'max_velocity', 'power', 'mental'],
        blocks: [
          {
            name: t('بلوك ٥ — أسبوع اختبارات', 'Block 5 — Testing week'),
            goal: t('إعادة نفس اختبارات البداية ومقارنة النتائج لضبط فترة المنافسات.', 'Repeat the baseline tests and compare to fine-tune the competition phase.'),
            components: ['acceleration', 'max_velocity', 'power', 'max_strength'],
            loads: [4], weekTypes: ['test'],
            pattern: ['lj_test', 'lj_tempo', 'lj_tech_full', '', 'lj_power', 'lj_tempo', '']
          },
          {
            name: t('بلوك ٦ — مسابقات تجريبية', 'Block 6 — Control competitions'),
            goal: t('حجم أقل وشدة عالية، مسابقة تجريبية آخر كل أسبوع لتثبيت روتين المنافسة.', 'Lower volume, high intensity, a control competition at the end of each week to rehearse the routine.'),
            components: ['technique', 'max_velocity', 'power', 'mental'],
            loads: [7, 6], weekTypes: ['load', 'comp'],
            pattern: ['lj_maxv', 'lj_power', 'lj_tempo', 'lj_tech_full', '', 'lj_primer', 'lj_comp']
          }
        ]
      },
      {
        type: 'comp',
        goal: t('الحفاظ على السرعة والقدرة بحجم منخفض والمنافسة كل أسبوع.', 'Maintain speed and power with low volume while competing weekly.'),
        components: ['max_velocity', 'power', 'technique', 'mental'],
        blocks: [
          {
            name: t('بلوك ٧ — منافسات', 'Block 7 — Competition'),
            goal: t('تمرينتين عاليتي الشدة قصيرتين في الأسبوع + منافسة؛ القوة ٨٥٪ لتكرارات قليلة للحفاظ.', 'Two short high-intensity sessions per week + competition; strength at 85% for low reps to maintain.'),
            components: ['max_velocity', 'power', 'technique'],
            loads: [6, 5], weekTypes: ['load', 'comp'],
            pattern: ['lj_tech_full', 'lj_power', 'lj_tempo', 'lj_maxv', '', 'lj_primer', 'lj_comp']
          }
        ]
      },
      {
        type: 'taper',
        goal: t('تهدئة: خفض الحجم ٤٠-٥٠٪ مع الحفاظ على الشدة للوصول للقمة في البطولة الرئيسية.', 'Taper: cut volume 40-50% while keeping intensity to peak at the main championship.'),
        components: ['max_velocity', 'power', 'recovery', 'mental'],
        blocks: [
          {
            name: t('بلوك ٨ — أسبوع البطولة', 'Block 8 — Championship week'),
            goal: t('لمسات سرعة واقتراب قليلة جدًا وجهاز عصبي فريش يوم البطولة.', 'A few speed and approach touches, fresh nervous system on championship day.'),
            components: ['max_velocity', 'technique', 'recovery', 'mental'],
            loads: [3], weekTypes: ['taper'],
            pattern: ['lj_maxv', '', 'lj_tech_full', 'lj_tempo', '', 'lj_primer', 'lj_comp']
          }
        ]
      }
    ],
    sessions: {
      lj_test: {
        title: t('اختبارات الوثب الطويل (ميدان + جيم)', 'Long jump testing (field + gym)'),
        goal: t('قياس السرعة والقدرة والقوة عشان نحسب الأحمال ونتابع التطور.', 'Measure speed, power and strength to set loads and track progress.'),
        components: ['acceleration', 'max_velocity', 'power', 'max_strength'],
        rpe: 8, duration: 120,
        items: [
          ...trackWU(true),
          { kind: 'run', libId: 'ad_30_m_sprint_test', sets: 1, reps: '2', distance: '30m', intensity: '100', basis: 'vmax', rest: '5min', restType: 'walk', purpose: t('قياس التسارع من وضع ٣ نقط', 'Measure acceleration from a 3-point start'), component: 'acceleration', note: t('توقيت إلكتروني لو متاح؛ سجل أحسن محاولة', 'Electronic timing if available; record the best trial') },
          { kind: 'run', libId: 'ad_flying_sprint', sets: 1, reps: '2', distance: '20m', intensity: '100', basis: 'vmax', rest: '6min', restType: 'walk', purpose: t('قياس السرعة القصوى (٢٠م طاير بعد ٣٠م اقتراب)', 'Measure max velocity (20m fly after a 30m run-in)'), component: 'max_velocity' },
          { kind: 'drill', libId: 'ad_standing_broad_jump_test', sets: 1, reps: '3', rest: '2min', purpose: t('قياس القدرة الأفقية من الثبات', 'Measure horizontal power from standing'), component: 'power' },
          { kind: 'drill', name: t('اختبار ٥ وثبات متتالية من الثبات', 'Standing 5-bound test'), sets: 1, reps: '2', rest: '3min', purpose: t('قياس القدرة الارتدادية الأفقية (الأقرب لطبيعة الوثب)', 'Measure horizontal reactive power, closest to jumping demands'), component: 'power', note: t('مرجع المتقدم: ١٦-١٨م تقريبًا', 'Advanced reference: about 16-18 m') },
          { kind: 'strength', libId: 'ad_power_clean', sets: 1, reps: '3', intensity: '9', basis: 'rpe', rest: '3min', purpose: t('الوصول لأقصى ٣ تكرارات (3RM) في الباور كلين', 'Work up to a 3RM power clean'), component: 'power', note: t('٤-٥ مجموعات تصاعدية قبل المحاولة الأساسية', '4-5 ramp-up sets before the test set') },
          { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 1, reps: '3', intensity: '9-10', basis: 'rpe', tempo: '2-0-X-0', rest: '4min', purpose: t('الوصول لـ 3RM سكوات لحساب نسب الموسم', 'Work up to a 3RM squat to calculate season percentages'), component: 'max_strength', note: t('1RM تقديري = 3RM × 1.08', 'Estimated 1RM = 3RM x 1.08') },
          ...trackCD()
        ]
      },
      lj_accel: {
        title: t('تسارع + تكنيك جري', 'Acceleration + running mechanics'),
        goal: t('تحسين أول ٣٠م: زاوية الدفع، طول الخطوة التدريجي وقوة الدفع الأفقي.', 'Improve the first 30 m: push angle, progressive step length and horizontal force.'),
        components: ['acceleration', 'power', 'technique'],
        rpe: 7, duration: 90,
        items: [
          ...trackWU(false),
          { kind: 'drill', libId: 'ad_wall_drive', sets: 3, reps: '5/leg', rest: '60s', purpose: t('ثبات زاوية الجسم وإيقاع رفع الركبة في التسارع', 'Groove body angle and knee drive for acceleration'), component: 'acceleration' },
          { kind: 'run', libId: 'ad_sled_resisted_sprint', sets: 1, reps: '5', distance: '20m', intensity: '90', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('زيادة القوة الأفقية في مرحلة الدفع', 'Increase horizontal force in the drive phase'), component: 'acceleration', note: t('حمل السليد يسبب نقص سرعة ١٠٪ تقريبًا (١٠-١٥٪ من وزن الجسم). في الإعداد العام استبدله بطلعة ٥-٨٪', 'Sled load causing ~10% velocity loss (10-15% BW). In GPP replace with a 5-8% hill') },
          { kind: 'run', libId: 'dr_sprint_accel', sets: 2, reps: '4', distance: '30m', time: '4.0-4.2s', intensity: '95', basis: 'vmax', rest: '3min', restType: 'walk', setRest: '6min', purpose: t('تسارع حر من ٣ نقط بجودة عالية', 'High-quality free acceleration from a 3-point start'), component: 'acceleration' },
          { kind: 'drill', libId: 'ad_medicine_ball_scoop_toss', sets: 3, reps: '4', rest: '90s', purpose: t('قدرة امتداد ثلاثي (كاحل-ركبة-حوض)', 'Triple-extension power'), component: 'power', note: t('كرة ٤-٥ كجم لأقصى مسافة', '4-5 kg ball for max distance') },
          ...trackCD()
        ]
      },
      lj_maxv: {
        title: t('سرعة قصوى وإيقاع', 'Max velocity & rhythm'),
        goal: t('رفع السرعة القصوى وتعليم الجري "العالي" بارتكاز تحت الحوض زي آخر الاقتراب.', 'Raise max velocity and teach tall front-side running with foot strike under the hips, as at the end of the approach.'),
        components: ['max_velocity', 'coordination', 'technique'],
        rpe: 8, duration: 90,
        items: [
          ...trackWU(true),
          { kind: 'run', libId: 'ad_wicket_run', sets: 1, reps: '5', distance: '40m', intensity: '90-95', basis: 'vmax', rest: '4min', restType: 'walk', purpose: t('ثبات طول ومعدل الخطوة على السرعة العالية', 'Stabilise stride length and frequency at high speed'), component: 'max_velocity', note: t('مسافة الويكتس ١.٩٠-٢.١٠م حسب اللاعب، ١٥م اقتراب قبلهم', 'Wicket spacing 1.90-2.10 m per athlete, 15 m run-in') },
          { kind: 'run', libId: 'ad_flying_sprint', sets: 2, reps: '3', distance: '20m', time: '1.95-2.05s', intensity: '98', basis: 'vmax', rest: '5min', restType: 'walk', setRest: '8min', purpose: t('تحفيز أقصى سرعة (٢٠م طاير بعد ٣٠م اقتراب)', 'Max velocity stimulus (20m fly after 30m run-in)'), component: 'max_velocity' },
          { kind: 'run', name: t('إن-آند-آوت (٢٠ سريع / ٢٠ طفو / ٢٠ سريع)', 'In-and-outs (20 fast / 20 float / 20 fast)'), sets: 1, reps: '3', distance: '60m', intensity: '95', basis: 'vmax', rest: '5min', restType: 'walk', purpose: t('الحفاظ على الاسترخاء وقت السرعة العالية والتحكم فيها زي آخر الاقتراب', 'Relaxation and control at high speed, as needed at the end of the approach'), component: 'max_velocity' },
          ...trackCD()
        ]
      },
      lj_tech_short: {
        title: t('تكنيك: اقتراب قصير وارتقاء', 'Technique: short approach & take-off'),
        goal: t('تكرار الارتقاء بجودة عالية من اقتراب قصير: خطوة قبل أخيرة مخفّضة، ارتكاز نشط وطيران متوازن.', 'High-quality take-off repetitions from short approaches: lowered penultimate, active plant and balanced flight.'),
        components: ['technique', 'power', 'coordination'],
        rpe: 7, duration: 95,
        items: [
          ...trackWU(true),
          { kind: 'drill', name: t('ارتقاء ٣ خطوات (يمين-شمال-ارتقاء) على العشب', '3-step take-off drill (right-left-take-off) on grass'), sets: 3, reps: '5', rest: '60s', purpose: t('إيقاع الخطوتين الأخيرتين: قبل الأخيرة طويلة ومنخفضة والأخيرة قصيرة وسريعة', 'Last-two-step rhythm: long, low penultimate and short, quick last step'), component: 'technique' },
          { kind: 'drill', name: t('بوب أب من اقتراب ٦ خطوات', 'Pop-ups off a 6-stride approach'), sets: 2, reps: '5', rest: '2min', purpose: t('ارتقاء عمودي كامل ووضع الطيران (ركبة الحرة عالية والجذع مستقيم)', 'Full vertical take-off and flight posture (free knee high, torso upright)'), component: 'technique', note: t('الهبوط في الحفرة على رجل الارتقاء', 'Land in the pit on the take-off leg') },
          { kind: 'run', name: t('جري إيقاع اقتراب ٨ خطوات على المسار', '8-stride approach rhythm runs on the runway'), sets: 1, reps: '4', distance: '18m', intensity: '90', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('ثبات علامة البداية وعلامة التحكم قبل اللوحة', 'Consistent start mark and check mark before the board'), component: 'technique' },
          { kind: 'drill', name: t('وثبات من اقتراب ٨-١٠ خطوات', 'Jumps from an 8-10 stride approach'), sets: 1, reps: '8', intensity: '85-90', basis: 'best', rest: '4min', purpose: t('تكرار الارتقاء الكامل بسرعة متوسطة عالية وحمل أقل من الاقتراب الكامل', 'Full take-offs at mid-high speed with less load than the full approach'), component: 'technique', note: t('سجّل مسافة الفاول واللمسة على اللوحة لكل وثبة', 'Record foul distance and board contact on every jump') },
          { kind: 'strength', libId: 'ex_hanging_leg_raise', sets: 3, reps: '10', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '60s', purpose: t('قوة المثنيات لرفع الرجلين في الهبوط', 'Hip-flexor strength for leg shoot in the landing'), component: 'core' },
          ...trackCD()
        ]
      },
      lj_tech_full: {
        title: t('تكنيك: اقتراب كامل ووثبات منافسة', 'Technique: full approach & competition jumps'),
        goal: t('ضبط الاقتراب الكامل (١٨-٢٠ خطوة) بأقصى سرعة يمكن التحكم فيها ونقل السرعة للارتقاء.', 'Dial in the full approach (18-20 strides) at max controllable speed and transfer it into the take-off.'),
        components: ['technique', 'max_velocity', 'power'],
        rpe: 8, duration: 100,
        items: [
          ...trackWU(true),
          { kind: 'run', name: t('جري اقتراب كامل بعلامات التحكم (بدون وثب)', 'Full approach run-throughs with check marks (no jump)'), sets: 1, reps: '4', distance: '42m', intensity: '95', basis: 'vmax', rest: '5min', restType: 'walk', purpose: t('ثبات الاقتراب: انحراف أقل من ١٠سم عند علامة الـ٤ خطوات واللوحة', 'Approach consistency: under 10 cm deviation at the 4-stride mark and board'), component: 'technique', note: t('قيس سرعة آخر ٥م لو فيه بوابات توقيت', 'Measure last-5m speed if timing gates are available') },
          { kind: 'drill', name: t('وثبات من اقتراب متوسط (١٢-١٤ خطوة)', 'Mid-approach jumps (12-14 strides)'), sets: 1, reps: '4', intensity: '90-95', basis: 'best', rest: '5min', purpose: t('ربط السرعة العالية بالارتقاء قبل المحاولات الكاملة', 'Link high speed with take-off before full attempts'), component: 'technique' },
          { kind: 'drill', name: t('وثبات من الاقتراب الكامل', 'Full-approach jumps'), sets: 1, reps: '6', intensity: '95-100', basis: 'best', rest: '7min', purpose: t('تنفيذ الوثبة كاملة بظروف المنافسة', 'Execute complete jumps under competition conditions'), component: 'power', note: t('وقف بعد ٦ وثبات أو لو السرعة قلت أكتر من ٣٪', 'Stop after 6 jumps or if approach speed drops more than 3%') },
          { kind: 'strength', libId: 'ex_side_plank', sets: 3, reps: '30s/side', intensity: '7', basis: 'rpe', rest: '45s', purpose: t('ثبات الجذع الجانبي وقت الارتكاز', 'Lateral trunk stiffness at the plant'), component: 'core' },
          ...trackCD()
        ]
      },
      lj_bounds: {
        title: t('بليومتري أفقي: بوندينج وحجلات', 'Horizontal plyometrics: bounds & hops'),
        goal: t('قدرة ارتدادية وصلابة الرجل وقت الارتكاز (زمن ارتكاز قصير) — ١٥٠-١٧٠ ارتكاز.', 'Reactive power and leg stiffness at ground contact (short contact times) — 150-170 contacts.'),
        components: ['power', 'max_strength', 'coordination'],
        rpe: 8, duration: 80,
        items: [
          ...trackWU(false),
          { kind: 'drill', libId: 'ad_pogo_hop', sets: 2, reps: '15', rest: '90s', purpose: t('صلابة الكاحل وسرعة الارتداد', 'Ankle stiffness and fast rebound'), component: 'power' },
          { kind: 'drill', libId: 'ad_alternate_leg_bound', sets: 5, reps: '1', distance: '30m', rest: '3min', purpose: t('قدرة أفقية بارتكاز نشط تحت الحوض', 'Horizontal power with an active plant under the hips'), component: 'power', note: t('سجّل الزمن وعدد الارتكازات؛ الهدف تقليل الارتكازات بنفس الزمن', 'Record time and number of contacts; aim for fewer contacts at the same time') },
          { kind: 'drill', name: t('حجلات على رجل واحدة', 'Single-leg hops'), sets: 1, reps: '3/leg', distance: '20m', rest: '3min', purpose: t('قوة رجل الارتقاء بشكل منفرد وتعويض الفرق بين الرجلين', 'Unilateral take-off leg power and balancing left-right differences'), component: 'power' },
          { kind: 'drill', libId: 'ad_depth_jump', sets: 3, reps: '4', rest: '2min', purpose: t('قوة ارتدادية عالية (زمن ارتكاز أقل من ٠.٢ ث)', 'High reactive strength (ground contact under 0.2 s)'), component: 'power', note: t('صندوق ٥٠-٦٠سم، اسقط واطلع فورًا', '50-60 cm box, drop and rebound immediately') },
          { kind: 'drill', libId: 'dr_hurdle_hops', sets: 3, reps: '6', rest: '2min', purpose: t('ارتداد رأسي متكرر بارتكاز قصير', 'Repeated vertical rebounds with short contacts'), component: 'power', note: t('حواجز ٧٦-٨٤سم', '76-84 cm hurdles') },
          ...trackCD()
        ]
      },
      lj_gen_plyo: {
        title: t('بليومتري عام وكرة طبية', 'General plyometrics & med ball'),
        goal: t('تجهيز الأوتار والكاحل لأحمال البوندينج اللي جاية بشدة منخفضة ومتوسطة (١٠٠-١٢٠ ارتكاز).', 'Prepare tendons and ankles for later bounding loads at low-moderate intensity (100-120 contacts).'),
        components: ['power', 'coordination', 'prevention'],
        rpe: 6, duration: 75,
        items: [
          ...trackWU(false),
          { kind: 'drill', libId: 'ad_pogo_hop', sets: 3, reps: '20', rest: '60s', purpose: t('تحمل الكاحل والأوتار', 'Ankle and tendon conditioning'), component: 'prevention' },
          { kind: 'drill', libId: 'ad_power_skip', sets: 3, reps: '1', distance: '30m', rest: '90s', purpose: t('توافق الذراعين مع الرجلين في الدفع', 'Arm-leg coordination in the push'), component: 'coordination' },
          { kind: 'drill', libId: 'dr_hurdle_hops', sets: 4, reps: '5', rest: '90s', purpose: t('ارتداد رأسي منخفض الشدة', 'Low-intensity vertical rebounds'), component: 'power', note: t('حواجز ٥٠-٦٠سم', '50-60 cm hurdles') },
          { kind: 'drill', libId: 'ad_broad_jump', sets: 4, reps: '3', rest: '90s', purpose: t('قدرة أفقية وهبوط مسيطر عليه', 'Horizontal power and controlled landing'), component: 'power' },
          { kind: 'drill', libId: 'ad_single_leg_forward_hop_and_stick', sets: 2, reps: '5/leg', rest: '60s', purpose: t('ثبات الركبة والحوض في الهبوط على رجل واحدة', 'Knee and hip control landing on one leg'), component: 'prevention' },
          { kind: 'drill', libId: 'ad_medicine_ball_overhead_backward_throw', sets: 3, reps: '5', rest: '90s', purpose: t('قدرة امتداد الجسم كله', 'Whole-body extension power'), component: 'power', note: t('كرة ٤ كجم', '4 kg ball') },
          ...trackCD()
        ]
      },
      lj_gen_strength: {
        title: t('قوة عامة وتضخيم', 'General strength & hypertrophy'),
        goal: t('زيادة الكتلة العضلية الوظيفية وقوة السلسلة الخلفية وتجهيز الأوتار.', 'Build functional muscle mass, posterior-chain strength and tendon resilience.'),
        components: ['strength', 'hypertrophy', 'prevention'],
        rpe: 7, duration: 80,
        items: [
          ...gymWU(),
          { kind: 'strength', libId: 'ad_hang_power_clean', sets: 4, reps: '4', intensity: '70', basis: '1rm', rest: '2min', purpose: t('تعلم وتكرار الامتداد الثلاثي السريع', 'Groove fast triple extension'), component: 'power' },
          { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 4, reps: '6', intensity: '75', basis: '1rm', tempo: '3-0-1-0', rest: '3min', purpose: t('قوة عامة للرجلين وتضخيم', 'General leg strength and hypertrophy'), component: 'strength' },
          { kind: 'strength', libId: 'ex_romanian_deadlift', sets: 3, reps: '8', intensity: '2', basis: 'rir', tempo: '3-1-1-0', rest: '2min', purpose: t('قوة الخلفية والمؤخرة', 'Hamstring and glute strength'), component: 'strength' },
          { kind: 'strength', libId: 'ex_bulgarian_split_squat', sets: 3, reps: '8/leg', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '90s', purpose: t('قوة الرجل الواحدة وثبات الحوض', 'Single-leg strength and pelvic control'), component: 'strength' },
          { kind: 'strength', libId: 'ex_nordic_hamstring_curl', sets: 3, reps: '5', intensity: '8', basis: 'rpe', tempo: '4-0-X-0', rest: '2min', purpose: t('وقاية الخلفية من الشد (قوة لامركزية)', 'Hamstring injury prevention (eccentric strength)'), component: 'prevention' },
          { kind: 'strength', libId: 'wg_single_leg_calf_raise', sets: 3, reps: '12/leg', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '60s', purpose: t('تحمل وتر أكيليس والسمانة', 'Achilles and calf capacity'), component: 'prevention' },
          ...gymCD()
        ]
      },
      lj_max_strength: {
        title: t('قوة قصوى', 'Max strength'),
        goal: t('رفع القوة القصوى بتكرارات قليلة وأوزان عالية بسرعة تنفيذ نية قصوى.', 'Raise max strength with low reps, heavy loads and maximal intent.'),
        components: ['max_strength', 'power'],
        rpe: 8, duration: 85,
        items: [
          ...gymWU(),
          { kind: 'strength', libId: 'ad_power_clean', sets: 5, reps: '2', intensity: '80-85', basis: '1rm', rest: '3min', purpose: t('قدرة قصوى من الأرض', 'Maximal power from the floor'), component: 'power' },
          { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 5, reps: '3', intensity: '85-90', basis: '1rm', tempo: '2-0-X-0', rest: '4min', purpose: t('قوة قصوى للرجلين', 'Maximal leg strength'), component: 'max_strength', note: t('أسبوع التخفيف: ٣×٣ على ٧٥٪', 'Deload week: 3x3 at 75%') },
          { kind: 'strength', libId: 'ek_step_ups_with_barbell', sets: 3, reps: '4/leg', intensity: '8', basis: 'rpe', tempo: '1-0-X-0', rest: '2min', purpose: t('قوة رجل الارتقاء بشكل منفرد', 'Unilateral take-off leg strength'), component: 'max_strength', note: t('صندوق بارتفاع الركبة تقريبًا', 'Box at about knee height') },
          { kind: 'strength', libId: 'ex_romanian_deadlift', sets: 3, reps: '5', intensity: '80', basis: '1rm', tempo: '3-0-1-0', rest: '2min', purpose: t('قوة السلسلة الخلفية', 'Posterior-chain strength'), component: 'strength', note: t('النسبة من 1RM الرومانيان', 'Percentage of RDL 1RM') },
          { kind: 'strength', libId: 'ex_nordic_hamstring_curl', sets: 2, reps: '4', intensity: '8', basis: 'rpe', tempo: '4-0-X-0', rest: '2min', purpose: t('الحفاظ على القوة اللامركزية للخلفية', 'Maintain eccentric hamstring strength'), component: 'prevention' },
          ...gymCD()
        ]
      },
      lj_power: {
        title: t('قدرة وتباين (كونتراست)', 'Power & contrast training'),
        goal: t('تحويل القوة لسرعة إنتاج قوة: أحمال ثقيلة يليها وثب بدون وزن (تنشيط ما بعد الانقباض).', 'Convert strength into rate of force development: heavy lift followed by unloaded jumps (post-activation potentiation).'),
        components: ['power', 'max_strength'],
        rpe: 7, duration: 70,
        items: [
          ...gymWU(),
          { kind: 'strength', libId: 'ad_power_clean', sets: 4, reps: '2', intensity: '85', basis: '1rm', rest: '3min', purpose: t('قدرة قصوى بحجم قليل', 'Maximal power at low volume'), component: 'power' },
          { kind: 'strength', libId: 'ad_back_squat_to_jump_squat_contrast', sets: 4, reps: '2+4', intensity: '85', basis: '1rm', tempo: '2-0-X-0', rest: '4min', purpose: t('تنشيط الجهاز العصبي ثم تحويله لوثب انفجاري', 'Potentiate with heavy squats then express as explosive jumps'), component: 'power', note: t('٢ سكوات على ٨٥٪ ثم خلال ٣٠ ثانية ٤ وثبات سكوات بدون وزن', '2 squats at 85%, then within 30 s 4 unloaded squat jumps') },
          { kind: 'strength', libId: 'ad_trap_bar_jump', sets: 3, reps: '4', intensity: '30', basis: '1rm', rest: '2min', purpose: t('قدرة بسرعة عالية بحمل خفيف', 'High-velocity loaded jumps'), component: 'power', note: t('النسبة من 1RM الديدليفت بالبار السداسي', 'Percentage of trap-bar deadlift 1RM') },
          { kind: 'drill', libId: 'ad_medicine_ball_overhead_backward_throw', sets: 3, reps: '4', rest: '90s', purpose: t('قدرة امتداد الجسم كله', 'Whole-body extension power'), component: 'power', note: t('كرة ٤ كجم', '4 kg ball') },
          ...gymCD()
        ]
      },
      lj_tempo: {
        title: t('تيمبو ممتد + جذع', 'Extensive tempo + core'),
        goal: t('يوم منخفض الشدة لتحسين الاستشفاء والقاعدة الهوائية وثبات الجذع.', 'Low-intensity day to improve recovery, aerobic base and trunk stability.'),
        components: ['aerobic', 'core', 'recovery'],
        rpe: 4, duration: 60,
        items: [
          W('جري خفيف + حركات مرونة', 'Easy jog + mobility drills', { duration: '10min' }),
          { kind: 'run', name: t('تيمبو ممتد على النجيل', 'Extensive tempo runs on grass'), sets: 2, reps: '6', distance: '100m', time: '15-16s', intensity: '65-70', basis: 'best', rest: '45s', restType: 'walk', setRest: '3min', purpose: t('تحمل هوائي واستشفاء نشط بدون ضغط عصبي', 'Aerobic capacity and active recovery with no neural stress'), component: 'aerobic' },
          { kind: 'strength', libId: 'ex_dead_bug', sets: 3, reps: '10/side', intensity: '7', basis: 'rpe', tempo: '2-1-2-0', rest: '45s', purpose: t('ثبات الجذع ومنع تقوس أسفل الظهر', 'Anti-extension trunk control'), component: 'core' },
          { kind: 'strength', libId: 'ex_copenhagen_plank', sets: 3, reps: '20s/side', intensity: '7', basis: 'rpe', rest: '45s', purpose: t('قوة المقربات ووقاية الحوض', 'Adductor strength and groin protection'), component: 'prevention' },
          { kind: 'strength', libId: 'ex_bird_dog', sets: 2, reps: '8/side', intensity: '6', basis: 'rpe', tempo: '2-2-2-0', rest: '30s', purpose: t('ثبات الحوض والظهر', 'Lumbopelvic control'), component: 'core' },
          ml('wg_worlds_greatest_stretch', { sets: 2, reps: '5/side' }),
          ml('ad_90_90_hip_switches', { sets: 2, reps: '8' })
        ]
      },
      lj_primer: {
        title: t('تنشيط قبل المسابقة', 'Pre-competition primer'),
        goal: t('تنشيط الجهاز العصبي وتأكيد علامات الاقتراب بحجم قليل جدًا.', 'Prime the nervous system and confirm approach marks with very low volume.'),
        components: ['acceleration', 'technique', 'mental'],
        rpe: 5, duration: 50,
        items: [
          ...trackWU(true),
          { kind: 'run', libId: 'dr_sprint_accel', sets: 1, reps: '3', distance: '20m', intensity: '95', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('تنشيط سريع بدون تعب', 'Quick neural activation without fatigue'), component: 'acceleration' },
          { kind: 'run', name: t('جري اقتراب كامل للتأكد من العلامة', 'Full approach run-throughs to confirm the mark'), sets: 1, reps: '2', distance: '42m', intensity: '90-95', basis: 'vmax', rest: '5min', restType: 'walk', purpose: t('تأكيد علامة البداية حسب اتجاه الريح', 'Confirm the start mark for the wind conditions'), component: 'technique' },
          ...trackCD()
        ]
      },
      lj_comp: {
        title: t('يوم المسابقة', 'Competition day'),
        goal: t('تنفيذ روتين المنافسة: إحماء ثابت، ضبط الاقتراب، و٦ محاولات بتركيز كامل.', 'Execute the competition routine: consistent warm-up, approach check and 6 fully focused attempts.'),
        components: ['technique', 'power', 'mental'],
        rpe: 9, duration: 150,
        items: [
          ...trackWU(true),
          { kind: 'run', name: t('جري اقتراب على مسار المسابقة', 'Approach run-throughs on the competition runway'), sets: 1, reps: '3', distance: '42m', intensity: '95', basis: 'vmax', rest: '4min', restType: 'walk', purpose: t('ضبط العلامة على المسار الرسمي', 'Adjust the mark on the official runway'), component: 'technique' },
          { kind: 'drill', name: t('محاولات المسابقة (٣ تأهيل + ٣ نهائي)', 'Competition attempts (3 qualifying + 3 final)'), sets: 1, reps: '6', intensity: '100', basis: 'best', rest: '10-15min', purpose: t('أفضل وثبة في المسابقة', 'Best jump of the competition'), component: 'power', note: t('بين المحاولات: خليك دافي، ٢ تسارع ٢٠م قبل كل محاولة، وراجع الفاول مع المدرب', 'Between rounds: stay warm, 2 x 20 m accelerations before each attempt, review foul distance with the coach') },
          M('تهدئة وإطالات بعد المسابقة', 'Post-competition cool-down and stretching', { duration: '15min' })
        ]
      }
    }
  },
  /* ============================ ٢) وثب عالي — متوسط ============================ */
  {
    id: 'pt_high_jump_int',
    sport: 'high_jump',
    level: 'intermediate',
    title: t('وثب عالي — متوسط (موسم ١٦ أسبوع)', 'High jump — intermediate (16-week season)'),
    goal: t('بناء اقتراب منحني ثابت (J) وارتقاء عمودي قوي، مع رفع القوة والقدرة الارتدادية لتحسين الرقم الشخصي ٥-١٠سم.', 'Build a consistent J-curve approach and a strong vertical take-off, raising strength and reactive power to add 5-10 cm to the personal best.'),
    components: ['technique', 'power', 'strength', 'acceleration', 'coordination'],
    sessionsPerWeek: 5,
    periods: [
      {
        type: 'gpp',
        goal: t('قاعدة قوة عامة، تجهيز الكاحل والأوتار، وتعلم أساسيات الارتقاء بالسيزرز والبوب أب.', 'General strength base, ankle and tendon preparation, and take-off fundamentals through scissors and pop-ups.'),
        components: ['strength', 'coordination', 'technique', 'prevention'],
        blocks: [
          {
            name: t('بلوك ١ — اختبارات ودخول', 'Block 1 — Testing & entry'),
            goal: t('قياس ٣٠م، الوثب العمودي، الوثب الطويل من الثبات و5RM سكوات.', 'Measure 30m sprint, vertical jump, standing long jump and 5RM squat.'),
            components: ['acceleration', 'power', 'strength'],
            loads: [4], weekTypes: ['test'],
            pattern: ['hj_test', '', 'hj_tech', '', 'hj_strength', '', '']
          },
          {
            name: t('بلوك ٢ — قاعدة عامة', 'Block 2 — General base'),
            goal: t('قوة عامة ٧٠-٧٥٪، بليومتري منخفض الشدة، وتسارع على خط مستقيم.', 'General strength at 70-75%, low-intensity plyometrics and straight-line acceleration.'),
            components: ['strength', 'acceleration', 'coordination', 'technique'],
            loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['hj_speed', 'hj_strength', 'hj_tech', '', 'hj_plyo', 'hj_strength', '']
          }
        ]
      },
      {
        type: 'spp',
        goal: t('قوة قصوى، جري المنحنى، ووثبات من اقتراب قصير على العارضة.', 'Max strength, curve running and short-approach jumps over the bar.'),
        components: ['max_strength', 'technique', 'power', 'acceleration'],
        blocks: [
          {
            name: t('بلوك ٣ — قوة قصوى ومنحنى', 'Block 3 — Max strength & curve'),
            goal: t('سكوات ٨٠-٨٥٪، جري دوائر ومنحنى، وارتقاء من ٥-٧ خطوات.', 'Squat 80-85%, circle and curve runs, and take-offs from 5-7 strides.'),
            components: ['max_strength', 'technique', 'power'],
            loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['hj_curve', 'hj_max', 'hj_tech', '', 'hj_plyo', 'hj_max', '']
          }
        ]
      },
      {
        type: 'precomp',
        goal: t('إعادة الاختبار، الاقتراب الكامل، وتحويل القوة لقدرة مع مسابقات تجريبية.', 'Retest, full approach, and conversion of strength to power with control competitions.'),
        components: ['power', 'technique', 'mental'],
        blocks: [
          {
            name: t('بلوك ٤ — أسبوع اختبارات', 'Block 4 — Testing week'),
            goal: t('مقارنة نتائج الاختبارات بالبداية وتحديد ارتفاعات البداية في المسابقات.', 'Compare tests with baseline and set opening heights for competitions.'),
            components: ['power', 'acceleration', 'max_strength'],
            loads: [4], weekTypes: ['test'],
            pattern: ['hj_test', '', 'hj_tech_full', '', 'hj_power', '', '']
          },
          {
            name: t('بلوك ٥ — قدرة ومسابقات تجريبية', 'Block 5 — Power & control competitions'),
            goal: t('اقتراب كامل ٩-١١ خطوة، تمارين قدرة بحجم قليل، ومسابقة تجريبية آخر الأسبوع.', 'Full 9-11 stride approach, low-volume power work and a control competition at the weekend.'),
            components: ['power', 'technique', 'mental'],
            loads: [7, 6], weekTypes: ['load', 'comp'],
            pattern: ['hj_curve', 'hj_power', 'hj_tech_full', '', 'hj_speed', '', 'hj_comp']
          }
        ]
      },
      {
        type: 'comp',
        goal: t('الحفاظ على القدرة والتكنيك مع المنافسة أسبوعيًا.', 'Maintain power and technique while competing weekly.'),
        components: ['power', 'technique', 'mental'],
        blocks: [
          {
            name: t('بلوك ٦ — منافسات', 'Block 6 — Competition'),
            goal: t('تمرينة تكنيك وتمرينة قدرة قصيرة في الأسبوع والباقي استشفاء.', 'One technique and one short power session per week, the rest is recovery.'),
            components: ['power', 'technique', 'recovery'],
            loads: [6, 5, 6], weekTypes: ['comp', 'load', 'comp'],
            pattern: ['hj_tech_full', 'hj_power', '', 'hj_curve', '', 'hj_comp', '']
          }
        ]
      },
      {
        type: 'taper',
        goal: t('تهدئة قبل البطولة: حجم أقل ٥٠٪ وشدة عالية.', 'Pre-championship taper: 50% less volume with high intensity.'),
        components: ['power', 'recovery', 'mental'],
        blocks: [
          {
            name: t('بلوك ٧ — أسبوع البطولة', 'Block 7 — Championship week'),
            goal: t('لمسات اقتراب وسرعة قليلة ولاعب فريش يوم البطولة.', 'A few approach and speed touches, fresh athlete on championship day.'),
            components: ['technique', 'recovery', 'mental'],
            loads: [3], weekTypes: ['taper'],
            pattern: ['hj_curve', '', 'hj_tech_full', '', 'hj_speed', '', 'hj_comp']
          }
        ]
      }
    ],
    sessions: {
      hj_test: {
        title: t('اختبارات الوثب العالي', 'High jump testing'),
        goal: t('قياس السرعة والقدرة العمودية والقوة لتحديد الأحمال.', 'Measure speed, vertical power and strength to set loads.'),
        components: ['acceleration', 'power', 'strength'],
        rpe: 7, duration: 100,
        items: [
          ...trackWU(true),
          { kind: 'run', libId: 'ad_30_m_sprint_test', sets: 1, reps: '2', distance: '30m', intensity: '100', basis: 'vmax', rest: '5min', restType: 'walk', purpose: t('قياس التسارع', 'Measure acceleration'), component: 'acceleration' },
          { kind: 'drill', libId: 'ad_vertical_jump_test', sets: 1, reps: '3', rest: '90s', purpose: t('قياس القدرة العمودية من الثبات', 'Measure standing vertical power'), component: 'power' },
          { kind: 'drill', name: t('وثبة رأسية من اقتراب ٣ خطوات (رجل الارتقاء)', 'Vertical jump off a 3-step approach (take-off leg)'), sets: 1, reps: '3', rest: '2min', purpose: t('قياس القدرة العمودية على رجل واحدة بسرعة اقتراب', 'Measure single-leg vertical power with approach speed'), component: 'power', note: t('المس أعلى نقطة على الحائط أو لوح القياس', 'Touch the highest point on the wall or vane') },
          { kind: 'drill', libId: 'ad_standing_broad_jump_test', sets: 1, reps: '3', rest: '2min', purpose: t('قياس القدرة الأفقية', 'Measure horizontal power'), component: 'power' },
          { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 1, reps: '5', intensity: '8-9', basis: 'rpe', tempo: '2-0-X-0', rest: '4min', purpose: t('الوصول لـ 5RM لحساب نسب الموسم', 'Work up to a 5RM to calculate season percentages'), component: 'strength', note: t('1RM تقديري = 5RM × 1.15', 'Estimated 1RM = 5RM x 1.15') },
          ...trackCD()
        ]
      },
      hj_speed: {
        title: t('تسارع وسرعة', 'Acceleration & speed'),
        goal: t('تحسين السرعة المستقيمة اللي بتتحول بعدين لسرعة على المنحنى.', 'Improve straight-line speed that later transfers into curve speed.'),
        components: ['acceleration', 'max_velocity', 'coordination'],
        rpe: 7, duration: 75,
        items: [
          ...trackWU(false),
          { kind: 'run', libId: 'dr_sprint_accel', sets: 2, reps: '4', distance: '20m', time: '3.1-3.3s', intensity: '95', basis: 'vmax', rest: '2min', restType: 'walk', setRest: '5min', purpose: t('تسارع من وضع وقوف متقدم', 'Acceleration from a standing split start'), component: 'acceleration' },
          { kind: 'run', libId: 'ad_flying_sprint', sets: 1, reps: '4', distance: '20m', intensity: '95', basis: 'vmax', rest: '4min', restType: 'walk', purpose: t('سرعة قصوى وجري مرتفع الحوض', 'Max velocity with tall hip posture'), component: 'max_velocity', note: t('٢٠م اقتراب قبل الـ٢٠م الطاير', '20 m run-in before the 20 m fly') },
          { kind: 'drill', libId: 'ad_power_skip', sets: 3, reps: '1', distance: '30m', rest: '90s', purpose: t('توافق الذراعين والرجل الحرة زي حركة الارتقاء', 'Arm and free-knee coordination like the take-off action'), component: 'coordination' },
          ...trackCD()
        ]
      },
      hj_curve: {
        title: t('جري المنحنى والاقتراب', 'Curve running & approach'),
        goal: t('تعلم الميل للداخل على المنحنى بالجسم كله وثبات اقتراب J (٥ مستقيم + ٤-٥ منحنى).', 'Learn whole-body inward lean on the curve and a consistent J approach (5 straight + 4-5 curve).'),
        components: ['technique', 'acceleration', 'coordination'],
        rpe: 6, duration: 75,
        items: [
          ...trackWU(false),
          { kind: 'run', name: t('جري دوائر (نصف قطر ٦-٨م)', 'Circle runs (6-8 m radius)'), sets: 2, reps: '3', distance: '40m', intensity: '80', basis: 'vmax', rest: '90s', restType: 'walk', setRest: '3min', purpose: t('الميل من الكاحل مش من الوسط وقوة الكاحل الخارجي', 'Lean from the ankles, not the waist, and outside ankle strength'), component: 'technique', note: t('اتجاه الدوران حسب رجل الارتقاء', 'Direction according to take-off leg') },
          { kind: 'run', name: t('جري منحنى J على علامات الاقتراب', 'J-curve runs on approach marks'), sets: 1, reps: '6', distance: '25m', intensity: '85-90', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('ثبات علامة البداية وعلامة بداية المنحنى', 'Consistent start mark and curve entry mark'), component: 'technique', note: t('سجل مكان آخر خطوة؛ الهدف انحراف أقل من ١٥سم', 'Record the last foot plant; target under 15 cm deviation') },
          { kind: 'drill', name: t('بوب أب من منحنى ٥ خطوات', 'Pop-ups off a 5-stride curve'), sets: 2, reps: '4', rest: '2min', purpose: t('ارتقاء عمودي من الميل على المنحنى وركبة حرة عالية', 'Vertical take-off out of the curve lean with a high free knee'), component: 'technique' },
          { kind: 'strength', libId: 'ex_side_plank', sets: 3, reps: '30s/side', intensity: '7', basis: 'rpe', rest: '45s', purpose: t('ثبات الجذع الجانبي على المنحنى', 'Lateral trunk stability on the curve'), component: 'core' },
          ...trackCD()
        ]
      },
      hj_tech: {
        title: t('تكنيك: سيزرز وبوب أب وارتقاء قصير', 'Technique: scissors, pop-ups & short approach'),
        goal: t('تحسين الارتقاء والعبور بحجم عالي من اقتراب قصير وعارضة منخفضة أو متوسطة.', 'High-volume take-off and bar clearance work from short approaches with low-mid bar heights.'),
        components: ['technique', 'coordination', 'power'],
        rpe: 6, duration: 90,
        items: [
          ...trackWU(false),
          { kind: 'drill', name: t('سيزرز من اقتراب ٥ خطوات', 'Scissor jumps from a 5-stride approach'), sets: 2, reps: '5', rest: '90s', purpose: t('ارتقاء عمودي وتوقيت الرجل الحرة والدراعين', 'Vertical take-off and timing of free leg and arms'), component: 'technique', note: t('العارضة ٧٠-٨٠٪ من الرقم الشخصي', 'Bar at 70-80% of PB') },
          { kind: 'drill', name: t('عبور خلفي من الثبات (باك أوفر)', 'Standing back-overs'), sets: 2, reps: '5', rest: '90s', purpose: t('وضع التقوس فوق العارضة وتوقيت رفع الرجلين', 'Arch position over the bar and leg-kick timing'), component: 'technique', note: t('من على صندوق ٣٠-٤٠سم في الأول', 'Start from a 30-40 cm box') },
          { kind: 'drill', name: t('وثبات من اقتراب ٥-٧ خطوات على العارضة', 'Jumps from a 5-7 stride approach over the bar'), sets: 1, reps: '10', intensity: '85-90', basis: 'best', rest: '3min', purpose: t('ربط المنحنى بالارتقاء والعبور بشدة متوسطة عالية', 'Link curve, take-off and clearance at mid-high intensity'), component: 'technique', note: t('ارفع العارضة ٣سم كل وثبتين ناجحتين', 'Raise the bar 3 cm after every two clean clearances') },
          { kind: 'strength', libId: 'ex_hanging_leg_raise', sets: 3, reps: '8', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '60s', purpose: t('رفع الرجلين بسرعة بعد العبور', 'Quick leg lift after clearing the bar'), component: 'core' },
          ...trackCD()
        ]
      },
      hj_tech_full: {
        title: t('تكنيك: الاقتراب الكامل', 'Technique: full approach'),
        goal: t('وثبات من الاقتراب الكامل (٩-١١ خطوة) بسرعة المنافسة وارتفاعات قريبة من الرقم الشخصي.', 'Full-approach jumps (9-11 strides) at competition speed with heights near the PB.'),
        components: ['technique', 'power', 'mental'],
        rpe: 8, duration: 90,
        items: [
          ...trackWU(true),
          { kind: 'run', name: t('جري اقتراب كامل بدون ارتقاء', 'Full approach run-throughs without take-off'), sets: 1, reps: '4', distance: '28m', intensity: '90-95', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('تأكيد العلامات وإيقاع تسارع آخر ٣ خطوات', 'Confirm marks and the rhythm of the last 3 accelerating steps'), component: 'technique' },
          { kind: 'drill', name: t('وثبات اقتراب كامل بتصاعد الارتفاع', 'Full-approach jumps with rising bar'), sets: 1, reps: '8', intensity: '90-100', basis: 'best', rest: '4min', purpose: t('الوثب تحت ظروف المسابقة من ٩٠٪ لحد ١٠٠٪ من الرقم', 'Jump under competition conditions from 90% up to 100% of PB'), component: 'technique', note: t('ابدأ من ارتفاع البداية في المسابقة؛ ٨-١٠ وثبات كحد أقصى', 'Start at the competition opening height; 8-10 jumps max') },
          { kind: 'drill', libId: 'ad_single_leg_pogo_hop', sets: 2, reps: '10/leg', rest: '60s', purpose: t('صلابة كاحل رجل الارتقاء', 'Take-off ankle stiffness'), component: 'power' },
          ...trackCD()
        ]
      },
      hj_plyo: {
        title: t('بليومتري رأسي', 'Vertical plyometrics'),
        goal: t('قوة ارتدادية عمودية وصلابة الكاحل (٨٠-١٢٠ ارتكاز).', 'Vertical reactive strength and ankle stiffness (80-120 contacts).'),
        components: ['power', 'coordination', 'prevention'],
        rpe: 7, duration: 70,
        items: [
          ...trackWU(false),
          { kind: 'drill', libId: 'ad_pogo_hop', sets: 3, reps: '15', rest: '60s', purpose: t('صلابة الكاحل وسرعة الارتداد', 'Ankle stiffness and fast rebound'), component: 'power' },
          { kind: 'drill', libId: 'dr_hurdle_hops', sets: 4, reps: '5', rest: '2min', purpose: t('ارتداد رأسي متكرر بارتكاز قصير', 'Repeated vertical rebounds with short contacts'), component: 'power', note: t('حواجز ٦٠-٧٦سم', '60-76 cm hurdles') },
          { kind: 'drill', libId: 'ad_lateral_bound_and_stick', sets: 3, reps: '5/side', rest: '90s', purpose: t('قوة جانبية وثبات الهبوط (مهمة للمنحنى)', 'Lateral power and landing control (key for the curve)'), component: 'power' },
          { kind: 'drill', libId: 'ad_depth_jump', sets: 3, reps: '4', rest: '2min', purpose: t('قوة ارتدادية عالية', 'High reactive strength'), component: 'power', note: t('صندوق ٣٠-٤٠سم للمستوى المتوسط', '30-40 cm box for intermediate level') },
          { kind: 'drill', name: t('وثبات رجل واحدة للمس هدف عالي', 'Single-leg jumps to touch a high target'), sets: 2, reps: '5/leg', rest: '90s', purpose: t('محاكاة الارتقاء على رجل واحدة بدراع واحدة أو اتنين', 'Simulate the single-leg take-off with single or double arm action'), component: 'power' },
          ...trackCD()
        ]
      },
      hj_strength: {
        title: t('قوة عامة', 'General strength'),
        goal: t('قوة أساسية للرجلين والجذع وتقوية الكاحل والسمانة.', 'Foundational leg and trunk strength with ankle and calf conditioning.'),
        components: ['strength', 'hypertrophy', 'prevention'],
        rpe: 7, duration: 70,
        items: [
          ...gymWU(),
          { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 4, reps: '6', intensity: '70-75', basis: '1rm', tempo: '3-0-1-0', rest: '3min', purpose: t('قوة عامة للرجلين', 'General leg strength'), component: 'strength' },
          { kind: 'strength', libId: 'ad_hang_power_clean', sets: 4, reps: '3', intensity: '65-70', basis: '1rm', rest: '2min', purpose: t('تعلم الامتداد الثلاثي السريع', 'Learn fast triple extension'), component: 'power' },
          { kind: 'strength', libId: 'ex_step_up', sets: 3, reps: '8/leg', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '90s', purpose: t('قوة رجل الارتقاء', 'Take-off leg strength'), component: 'strength' },
          { kind: 'strength', libId: 'ex_romanian_deadlift', sets: 3, reps: '8', intensity: '2', basis: 'rir', tempo: '3-1-1-0', rest: '2min', purpose: t('قوة السلسلة الخلفية', 'Posterior-chain strength'), component: 'strength' },
          { kind: 'strength', libId: 'wg_single_leg_calf_raise', sets: 3, reps: '12/leg', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '60s', purpose: t('قوة السمانة ووتر أكيليس', 'Calf and Achilles strength'), component: 'prevention' },
          { kind: 'strength', libId: 'ex_copenhagen_plank', sets: 3, reps: '20s/side', intensity: '7', basis: 'rpe', rest: '45s', purpose: t('وقاية المقربات', 'Adductor protection'), component: 'prevention' },
          ...gymCD()
        ]
      },
      hj_max: {
        title: t('قوة قصوى', 'Max strength'),
        goal: t('رفع القوة القصوى لتحسين قدرة الارتقاء.', 'Raise max strength to improve take-off force.'),
        components: ['max_strength', 'power'],
        rpe: 8, duration: 75,
        items: [
          ...gymWU(),
          { kind: 'strength', libId: 'ad_power_clean', sets: 4, reps: '3', intensity: '75-80', basis: '1rm', rest: '3min', purpose: t('قدرة قصوى', 'Maximal power'), component: 'power' },
          { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 4, reps: '4', intensity: '80-85', basis: '1rm', tempo: '2-0-X-0', rest: '3min', purpose: t('قوة قصوى للرجلين', 'Maximal leg strength'), component: 'max_strength', note: t('أسبوع التخفيف: ٣×٣ على ٧٠٪', 'Deload week: 3x3 at 70%') },
          { kind: 'strength', libId: 'ex_bulgarian_split_squat', sets: 3, reps: '5/leg', intensity: '8', basis: 'rpe', tempo: '2-0-X-0', rest: '2min', purpose: t('قوة الرجل الواحدة', 'Single-leg strength'), component: 'max_strength' },
          { kind: 'strength', libId: 'ex_nordic_hamstring_curl', sets: 3, reps: '4', intensity: '8', basis: 'rpe', tempo: '4-0-X-0', rest: '2min', purpose: t('وقاية الخلفية', 'Hamstring injury prevention'), component: 'prevention' },
          { kind: 'strength', libId: 'ad_isometric_heel_raise_hold', sets: 3, reps: '30s', intensity: '8', basis: 'rpe', rest: '60s', purpose: t('قوة ثابتة للسمانة ووتر أكيليس', 'Isometric calf and Achilles strength'), component: 'prevention', note: t('بوزن إضافي على رجل واحدة', 'Loaded, single leg') },
          ...gymCD()
        ]
      },
      hj_power: {
        title: t('قدرة وتباين', 'Power & contrast'),
        goal: t('تحويل القوة لقدرة ارتقاء سريعة بحجم قليل.', 'Convert strength into fast take-off power with low volume.'),
        components: ['power', 'max_strength'],
        rpe: 7, duration: 60,
        items: [
          ...gymWU(),
          { kind: 'strength', libId: 'ad_power_clean', sets: 3, reps: '2', intensity: '80-85', basis: '1rm', rest: '3min', purpose: t('قدرة قصوى بحجم قليل', 'Maximal power at low volume'), component: 'power' },
          { kind: 'strength', libId: 'ad_back_squat_to_jump_squat_contrast', sets: 3, reps: '3+4', intensity: '80', basis: '1rm', tempo: '2-0-X-0', rest: '4min', purpose: t('تنشيط ثم وثب انفجاري', 'Potentiate then jump explosively'), component: 'power', note: t('٣ سكوات على ٨٠٪ ثم ٤ وثبات رأسية بدون وزن', '3 squats at 80%, then 4 unloaded vertical jumps') },
          { kind: 'drill', libId: 'ad_medicine_ball_overhead_backward_throw', sets: 3, reps: '4', rest: '90s', purpose: t('قدرة امتداد الجسم', 'Whole-body extension power'), component: 'power', note: t('كرة ٣-٤ كجم', '3-4 kg ball') },
          ...gymCD()
        ]
      },
      hj_comp: {
        title: t('يوم المسابقة', 'Competition day'),
        goal: t('تنفيذ روتين المسابقة واختيار ارتفاعات ذكية.', 'Execute the competition routine and smart height selection.'),
        components: ['technique', 'power', 'mental'],
        rpe: 9, duration: 150,
        items: [
          ...trackWU(true),
          { kind: 'run', name: t('ضبط الاقتراب على المسابقة', 'Approach check on the competition apron'), sets: 1, reps: '3', distance: '28m', intensity: '90-95', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('ضبط العلامات على الأرضية الرسمية', 'Adjust marks on the official surface'), component: 'technique' },
          { kind: 'drill', name: t('محاولات المسابقة', 'Competition attempts'), sets: 1, reps: '6-12', intensity: '95-100', basis: 'best', rest: '3-10min', purpose: t('أعلى ارتفاع ممكن', 'Clear the highest possible height'), component: 'power', note: t('ارتفاع البداية ≈ ٩٠٪ من الرقم الشخصي؛ ما تعديش ارتفاعات كتير', 'Opening height about 90% of PB; do not waste attempts on many low heights') },
          M('تهدئة وإطالات', 'Cool-down and stretching', { duration: '15min' })
        ]
      }
    }
  },
  /* ============================ ٣) دفع جلة — متقدم ============================ */
  {
    id: 'pt_shot_put_adv',
    sport: 'shot_put',
    level: 'advanced',
    title: t('دفع جلة — متقدم (موسم ١٨ أسبوع)', 'Shot put — advanced (18-week season)'),
    goal: t('رفع القوة القصوى والقدرة الانفجارية ونقلها لسرعة إطلاق أعلى، مع ثبات التكنيك (زحف أو دوران) للوصول لأحسن رقم في البطولة الرئيسية.', 'Raise max strength and explosive power and transfer them into higher release speed, with stable technique (glide or rotation), to peak at the main championship.'),
    components: ['max_strength', 'power', 'technique', 'speed'],
    sessionsPerWeek: 6,
    periods: [
      {
        type: 'gpp',
        goal: t('تضخيم وقوة عامة، حجم رميات عالي بالكرة الطبية، وتدريبات تكنيك أساسية.', 'Hypertrophy and general strength, high medicine-ball throw volume and fundamental technique drills.'),
        components: ['hypertrophy', 'strength', 'technique', 'power'],
        blocks: [
          {
            name: t('بلوك ١ — اختبارات ودخول', 'Block 1 — Testing & entry'),
            goal: t('قياس 3RM (سكوات، بنش، كلين)، رمية خلفية بالكرة، ورمية من الثبات.', 'Measure 3RM (squat, bench, clean), back overhead med-ball throw and standing put.'),
            components: ['max_strength', 'power', 'technique'],
            loads: [4], weekTypes: ['test'],
            pattern: ['sp_test', 'sp_tech', 'sp_hyper', '', 'sp_medball', 'sp_hyper', '']
          },
          {
            name: t('بلوك ٢ — تضخيم وتكنيك', 'Block 2 — Hypertrophy & technique'),
            goal: t('تضخيم ٧٠-٧٥٪ (٦-٨ تكرار)، ١٠٠-١٢٠ رمية كرة طبية في الأسبوع، و٦٠-٨٠ رمية تكنيك.', 'Hypertrophy at 70-75% (6-8 reps), 100-120 med-ball throws per week and 60-80 technique puts.'),
            components: ['hypertrophy', 'strength', 'technique', 'power'],
            loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['sp_tech', 'sp_hyper', 'sp_medball', 'sp_tech', 'sp_hyper', 'sp_medball', '']
          }
        ]
      },
      {
        type: 'spp',
        goal: t('قوة قصوى بأحمال ٨٥-٩٢٪ ثم تحويلها لقدرة، ورمي بأدوات تقيلة ثم أداة المنافسة والخفيفة.', 'Max strength at 85-92% then conversion to power, throwing heavy implements then competition and light implements.'),
        components: ['max_strength', 'power', 'technique', 'speed'],
        blocks: [
          {
            name: t('بلوك ٣ — قوة قصوى وأداة تقيلة', 'Block 3 — Max strength & heavy implement'),
            goal: t('سكوات وبنش ٨٥-٩٠٪، ورميات كاملة بجلة أتقل ٠.٥-١.٥ كجم.', 'Squat and bench at 85-90%, full throws with a shot 0.5-1.5 kg heavier.'),
            components: ['max_strength', 'technique', 'power'],
            loads: [7, 8, 9, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['sp_throw_heavy', 'sp_max', 'sp_medball', 'sp_throw_heavy', 'sp_max', 'sp_tech', '']
          },
          {
            name: t('بلوك ٤ — قدرة وأداة المنافسة', 'Block 4 — Power & competition implement'),
            goal: t('رفعات أولمبية سريعة، رمي بأداة المنافسة والخفيفة لرفع سرعة الإطلاق.', 'Fast Olympic lifts, competition- and light-implement throws to raise release speed.'),
            components: ['power', 'speed', 'technique', 'max_strength'],
            loads: [7, 8, 5], weekTypes: ['load', 'shock', 'deload'],
            pattern: ['sp_throw_comp', 'sp_max', 'sp_medball', 'sp_throw_light', 'sp_power', 'sp_throw_heavy', '']
          }
        ]
      },
      {
        type: 'precomp',
        goal: t('إعادة الاختبار ومسابقات تجريبية، والحجم بينزل والشدة بتطلع.', 'Retest and control competitions, volume falling and intensity rising.'),
        components: ['power', 'technique', 'mental'],
        blocks: [
          {
            name: t('بلوك ٥ — أسبوع اختبارات', 'Block 5 — Testing week'),
            goal: t('مقارنة القوة والقدرة بالبداية وتحديد أحمال فترة المنافسات.', 'Compare strength and power with baseline and set competition-phase loads.'),
            components: ['max_strength', 'power', 'technique'],
            loads: [4], weekTypes: ['test'],
            pattern: ['sp_test', '', 'sp_throw_comp', '', 'sp_power', 'sp_tech', '']
          },
          {
            name: t('بلوك ٦ — مسابقات تجريبية', 'Block 6 — Control competitions'),
            goal: t('٣٠-٤٠ رمية في الأسبوع بأداة المنافسة والخفيفة ومسابقة تجريبية.', '30-40 throws per week with competition and light implements plus a control competition.'),
            components: ['technique', 'power', 'mental'],
            loads: [7, 6], weekTypes: ['load', 'comp'],
            pattern: ['sp_throw_comp', 'sp_power', 'sp_medball', 'sp_throw_light', '', 'sp_primer', 'sp_comp']
          }
        ]
      },
      {
        type: 'comp',
        goal: t('الحفاظ على القوة (٢ تكرار على ٨٥-٩٠٪) والسرعة والمنافسة كل أسبوع.', 'Maintain strength (doubles at 85-90%) and speed while competing weekly.'),
        components: ['power', 'technique', 'mental'],
        blocks: [
          {
            name: t('بلوك ٧ — منافسات', 'Block 7 — Competition'),
            goal: t('رمي بجودة عالية وحجم قليل والقوة للحفاظ فقط.', 'High-quality, low-volume throwing, strength for maintenance only.'),
            components: ['power', 'technique', 'mental'],
            loads: [6, 5], weekTypes: ['load', 'comp'],
            pattern: ['sp_throw_comp', 'sp_power', '', 'sp_throw_light', '', 'sp_primer', 'sp_comp']
          }
        ]
      },
      {
        type: 'taper',
        goal: t('تهدئة: خفض الحجم ٥٠٪ مع رمي خفيف وسريع للوصول للقمة.', 'Taper: cut volume by 50% with light, fast throws to peak.'),
        components: ['speed', 'recovery', 'mental'],
        blocks: [
          {
            name: t('بلوك ٨ — أسبوع البطولة', 'Block 8 — Championship week'),
            goal: t('لاعب سريع وفريش: رميات قليلة بالأداة الخفيفة وأداة المنافسة.', 'Fast, fresh athlete: few throws with light and competition implements.'),
            components: ['speed', 'technique', 'recovery'],
            loads: [3], weekTypes: ['taper'],
            pattern: ['sp_throw_light', '', 'sp_throw_comp', 'sp_power', '', 'sp_primer', 'sp_comp']
          }
        ]
      }
    ],
    sessions: {
      sp_test: {
        title: t('اختبارات دفع الجلة', 'Shot put testing'),
        goal: t('قياس القوة القصوى والقدرة والرمي من الثبات.', 'Measure max strength, power and standing throw.'),
        components: ['max_strength', 'power', 'technique'],
        rpe: 8, duration: 130,
        items: [
          ...throwWU(),
          { kind: 'drill', libId: 'ad_medicine_ball_overhead_backward_throw', sets: 1, reps: '3', rest: '2min', purpose: t('قياس قدرة الامتداد الكلي (كرة ٤ كجم)', 'Measure total-body extension power (4 kg ball)'), component: 'power' },
          { kind: 'drill', name: t('رمية من الثبات بأداة المنافسة', 'Standing put with the competition shot'), sets: 1, reps: '4', intensity: '100', basis: 'best', rest: '3min', purpose: t('قياس قدرة وضع القوة (باور بوزيشن)', 'Measure power-position throwing'), component: 'power' },
          { kind: 'drill', libId: 'ad_standing_broad_jump_test', sets: 1, reps: '3', rest: '2min', purpose: t('قياس قدرة الرجلين', 'Measure leg power'), component: 'power' },
          { kind: 'strength', libId: 'ad_power_clean', sets: 1, reps: '3', intensity: '9', basis: 'rpe', rest: '3min', purpose: t('الوصول لـ 3RM باور كلين', 'Work up to a 3RM power clean'), component: 'power' },
          { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 1, reps: '3', intensity: '9-10', basis: 'rpe', tempo: '2-0-X-0', rest: '4min', purpose: t('الوصول لـ 3RM سكوات', 'Work up to a 3RM squat'), component: 'max_strength', note: t('1RM تقديري = 3RM × 1.08', 'Estimated 1RM = 3RM x 1.08') },
          { kind: 'strength', libId: 'ex_barbell_bench_press', sets: 1, reps: '3', intensity: '9-10', basis: 'rpe', tempo: '2-1-X-0', rest: '4min', purpose: t('الوصول لـ 3RM بنش برس', 'Work up to a 3RM bench press'), component: 'max_strength' },
          ...gymCD()
        ]
      },
      sp_tech: {
        title: t('تكنيك: تدريبات الزحف / الدوران ورمي من الثبات', 'Technique: glide / rotation drills & standing puts'),
        goal: t('ثبات وضع القوة، ترتيب الحركة (رجل ← حوض ← جذع ← دراع) وحجم رمي عالي بشدة متوسطة.', 'Stable power position, correct sequencing (leg - hip - trunk - arm) and high throw volume at moderate intensity.'),
        components: ['technique', 'coordination', 'power'],
        rpe: 6, duration: 90,
        items: [
          ...throwWU(),
          { kind: 'drill', name: t('رمي من الثبات (وضع القوة)', 'Standing puts (power position)'), sets: 2, reps: '8', intensity: '85-90', basis: 'best', rest: '90s', purpose: t('ترتيب الحركة من الرجل اليمين للحوض ثم الدراع', 'Sequencing from drive leg through hip to arm'), component: 'technique', note: t('بأداة المنافسة', 'With the competition shot') },
          { kind: 'drill', name: t('زحف: تمرين A والزحف على الخط / دوران: جنوب أفريقي ونصف لفة', 'Glide: A-drill and line glides / Rotation: South African and half-turn drills'), sets: 3, reps: '6', rest: '90s', purpose: t('دخول وضع القوة متوازن والرجل الشمال بتنزل بسرعة', 'Balanced arrival in the power position with a fast left-foot plant'), component: 'technique', note: t('اختار حسب تكنيك اللاعب؛ نص الرميات بدون إطلاق', 'Choose by athlete technique; half of reps without release') },
          { kind: 'drill', name: t('رميات كاملة بشدة متوسطة', 'Full throws at moderate intensity'), sets: 1, reps: '15', intensity: '85-90', basis: 'best', rest: '2min', purpose: t('تثبيت الإيقاع الكامل بدون ضغط', 'Stabilise the full rhythm without strain'), component: 'technique', note: t('فيديو لكل ٥ رميات', 'Video every 5 throws') },
          { kind: 'strength', libId: 'ex_band_external_rotation', sets: 2, reps: '15', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '45s', purpose: t('صحة الكتف والتوازن العضلي', 'Shoulder health and muscle balance'), component: 'prevention' },
          ml('ex_shoulder_stretch', { sets: 2, duration: '30s' }),
          ml('ex_thoracic_rotation', { sets: 2, reps: '8/side' })
        ]
      },
      sp_throw_heavy: {
        title: t('رمي بالأداة التقيلة', 'Heavy implement throwing'),
        goal: t('قوة خاصة: رميات كاملة بجلة أتقل (رجال ٨-٩ كجم، سيدات ٥ كجم) بدون ما التكنيك يبوظ.', 'Special strength: full throws with a heavier shot (men 8-9 kg, women 5 kg) without technique breakdown.'),
        components: ['power', 'max_strength', 'technique'],
        rpe: 8, duration: 90,
        items: [
          ...throwWU(),
          { kind: 'drill', name: t('رميات من الثبات بأداة المنافسة (تسخين)', 'Standing puts with competition shot (build-up)'), sets: 1, reps: '6', intensity: '85', basis: 'best', rest: '90s', purpose: t('تسخين خاص وإحساس بالإيقاع', 'Specific warm-up and rhythm feel'), component: 'technique' },
          { kind: 'drill', name: t('رميات من الثبات بالأداة التقيلة', 'Standing puts with the heavy shot'), sets: 2, reps: '5', intensity: '8', basis: 'rpe', rest: '2min', purpose: t('قوة خاصة لوضع القوة', 'Special strength for the power position'), component: 'max_strength' },
          { kind: 'drill', name: t('رميات كاملة بالأداة التقيلة', 'Full throws with the heavy shot'), sets: 1, reps: '15', intensity: '8-9', basis: 'rpe', rest: '3min', purpose: t('قوة خاصة بالإيقاع الكامل', 'Special strength within the full rhythm'), component: 'power', note: t('المسافة المتوقعة ≈ ٩٠٪ من رقمك بأداة المنافسة؛ وقف لو التكنيك وقع', 'Expected distance about 90% of your competition-shot PB; stop if technique breaks down') },
          { kind: 'drill', name: t('رميات كاملة بأداة المنافسة (تباين)', 'Full throws with competition shot (contrast)'), sets: 1, reps: '5', intensity: '92-95', basis: 'best', rest: '3min', purpose: t('نقل القوة الخاصة للأداة الرسمية', 'Transfer special strength back to the official implement'), component: 'power' },
          ml('ex_shoulder_stretch', { sets: 2, duration: '30s' }),
          ml('ad_open_book', { sets: 2, reps: '8/side' })
        ]
      },
      sp_throw_comp: {
        title: t('رمي بأداة المنافسة', 'Competition implement throwing'),
        goal: t('رميات كاملة بشدة عالية (٩٥-١٠٠٪) بظروف المنافسة.', 'High-intensity full throws (95-100%) under competition conditions.'),
        components: ['technique', 'power', 'mental'],
        rpe: 8, duration: 90,
        items: [
          ...throwWU(),
          { kind: 'drill', name: t('رميات من الثبات ونصف دوران (تسخين)', 'Standing and half-turn puts (build-up)'), sets: 1, reps: '6', intensity: '85-90', basis: 'best', rest: '90s', purpose: t('تسخين خاص تدريجي', 'Progressive specific warm-up'), component: 'technique' },
          { kind: 'drill', name: t('رميات كاملة بأداة المنافسة', 'Full throws with the competition shot'), sets: 2, reps: '6', intensity: '95-100', basis: 'best', rest: '3min', purpose: t('أقصى سرعة إطلاق بتكنيك ثابت', 'Maximal release speed with stable technique'), component: 'power', note: t('المجموعة الثانية: ٦ رميات "مسابقة" بترتيب محاولات حقيقي وراحة ٥ دقايق', 'Second set: 6 "competition" throws in real round order with 5 min rest') },
          { kind: 'drill', libId: 'ad_medicine_ball_rotational_throw', sets: 3, reps: '4/side', rest: '90s', purpose: t('قدرة دورانية للجذع', 'Rotational trunk power'), component: 'power', note: t('كرة ٤-٥ كجم على الحائط', '4-5 kg ball against a wall') },
          ml('ex_shoulder_stretch', { sets: 2, duration: '30s' }),
          ml('ad_open_book', { sets: 2, reps: '8/side' })
        ]
      },
      sp_throw_light: {
        title: t('رمي بالأداة الخفيفة (سرعة)', 'Light implement throwing (speed)'),
        goal: t('رفع سرعة الحركة والإطلاق بجلة أخف (رجال ٦-٦.٥ كجم، سيدات ٣-٣.٥ كجم).', 'Raise movement and release speed with a lighter shot (men 6-6.5 kg, women 3-3.5 kg).'),
        components: ['speed', 'power', 'technique'],
        rpe: 7, duration: 80,
        items: [
          ...throwWU(),
          { kind: 'drill', name: t('رميات من الثبات بالأداة الخفيفة', 'Standing puts with the light shot'), sets: 1, reps: '6', intensity: '9', basis: 'rpe', rest: '90s', purpose: t('سرعة ضرب الإطلاق', 'Fast strike at release'), component: 'speed' },
          { kind: 'drill', name: t('رميات كاملة بالأداة الخفيفة', 'Full throws with the light shot'), sets: 1, reps: '12', intensity: '9-10', basis: 'rpe', rest: '2min', purpose: t('إيقاع أسرع وجهاز عصبي أسرع', 'Faster rhythm and faster nervous system'), component: 'speed', note: t('المسافة المتوقعة ≈ ١٠٥-١٠٨٪ من رقم المنافسة', 'Expected distance about 105-108% of competition PB') },
          { kind: 'drill', name: t('رميات كاملة بأداة المنافسة', 'Full throws with the competition shot'), sets: 1, reps: '4', intensity: '95-100', basis: 'best', rest: '3min', purpose: t('نقل السرعة للأداة الرسمية', 'Transfer speed to the official implement'), component: 'power' },
          ml('ex_shoulder_stretch', { sets: 2, duration: '30s' })
        ]
      },
      sp_medball: {
        title: t('كرة طبية ووثب وتسارع', 'Med ball, jumps & acceleration'),
        goal: t('قدرة عامة وخاصة بحجم عالي: رميات متعددة الاتجاهات، وثب، وتسارعات قصيرة.', 'General and special power at high volume: multidirectional throws, jumps and short accelerations.'),
        components: ['power', 'acceleration', 'coordination'],
        rpe: 6, duration: 70,
        items: [
          ...throwWU(),
          { kind: 'drill', libId: 'ad_medicine_ball_overhead_backward_throw', sets: 4, reps: '5', rest: '90s', purpose: t('قدرة الامتداد الكلي', 'Total-body extension power'), component: 'power', note: t('كرة ٥-٧ كجم', '5-7 kg ball') },
          { kind: 'drill', libId: 'ad_medicine_ball_rotational_throw', sets: 4, reps: '5/side', rest: '90s', purpose: t('قدرة الجذع الدورانية', 'Rotational trunk power'), component: 'power' },
          { kind: 'drill', libId: 'ad_medicine_ball_chest_pass', sets: 3, reps: '6', rest: '60s', purpose: t('سرعة دفع الدراعين', 'Arm push speed'), component: 'power', note: t('من وضع الرمي، كرة ٣-٤ كجم', 'From the throwing stance, 3-4 kg ball') },
          { kind: 'drill', libId: 'ad_broad_jump', sets: 4, reps: '3', rest: '90s', purpose: t('قدرة الرجلين', 'Leg power'), component: 'power' },
          { kind: 'run', libId: 'dr_sprint_accel', sets: 1, reps: '5', distance: '20m', intensity: '95', basis: 'vmax', rest: '2min', restType: 'walk', purpose: t('سرعة وقدرة عامة', 'General speed and power'), component: 'acceleration' },
          ...gymCD()
        ]
      },
      sp_hyper: {
        title: t('قوة وتضخيم', 'Strength & hypertrophy'),
        goal: t('زيادة الكتلة العضلية والقوة العامة كأساس للقوة القصوى.', 'Increase muscle mass and general strength as a base for max strength.'),
        components: ['hypertrophy', 'strength', 'power'],
        rpe: 7, duration: 95,
        items: [
          ...gymWU(),
          { kind: 'strength', libId: 'ad_power_clean', sets: 5, reps: '3', intensity: '70-75', basis: '1rm', rest: '2min', purpose: t('قدرة وتكنيك الرفعات الأولمبية', 'Olympic-lift power and technique'), component: 'power' },
          { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 4, reps: '6', intensity: '72-77', basis: '1rm', tempo: '3-0-1-0', rest: '3min', purpose: t('قوة وتضخيم الرجلين', 'Leg strength and hypertrophy'), component: 'hypertrophy' },
          { kind: 'strength', libId: 'ex_barbell_bench_press', sets: 4, reps: '6', intensity: '72-77', basis: '1rm', tempo: '3-0-1-0', rest: '3min', purpose: t('قوة وتضخيم الدفع', 'Pressing strength and hypertrophy'), component: 'hypertrophy' },
          { kind: 'strength', libId: 'ex_romanian_deadlift', sets: 3, reps: '8', intensity: '2', basis: 'rir', tempo: '3-0-1-0', rest: '2min', purpose: t('قوة السلسلة الخلفية', 'Posterior-chain strength'), component: 'strength' },
          { kind: 'strength', libId: 'ex_bent_over_row', sets: 4, reps: '8', intensity: '2', basis: 'rir', tempo: '2-1-1-0', rest: '90s', purpose: t('توازن الدفع والسحب وصحة الكتف', 'Push-pull balance and shoulder health'), component: 'hypertrophy' },
          { kind: 'strength', libId: 'ex_cable_woodchopper', sets: 3, reps: '10/side', intensity: '2', basis: 'rir', tempo: '1-0-2-0', rest: '60s', purpose: t('قوة الجذع الدورانية', 'Rotational trunk strength'), component: 'core' },
          ...gymCD()
        ]
      },
      sp_max: {
        title: t('قوة قصوى', 'Max strength'),
        goal: t('رفع القوة القصوى في السكوات والبنش والرفعات الأولمبية.', 'Raise max strength in squat, bench and Olympic lifts.'),
        components: ['max_strength', 'power'],
        rpe: 9, duration: 100,
        items: [
          ...gymWU(),
          { kind: 'strength', libId: 'ad_power_clean', sets: 5, reps: '2', intensity: '85', basis: '1rm', rest: '3min', purpose: t('قدرة قصوى', 'Maximal power'), component: 'power' },
          { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 5, reps: '3', intensity: '85-90', basis: '1rm', tempo: '2-0-X-0', rest: '4min', purpose: t('قوة قصوى للرجلين', 'Maximal leg strength'), component: 'max_strength', note: t('أسبوع الصدمة: ٤×٢ على ٩٢٪', 'Shock week: 4x2 at 92%') },
          { kind: 'strength', libId: 'ex_barbell_bench_press', sets: 5, reps: '3', intensity: '85-90', basis: '1rm', tempo: '2-1-X-0', rest: '4min', purpose: t('قوة قصوى للدفع', 'Maximal pressing strength'), component: 'max_strength' },
          { kind: 'strength', libId: 'wg_push_press', sets: 4, reps: '3', intensity: '80', basis: '1rm', rest: '3min', purpose: t('نقل قوة الرجلين للدراعين بسرعة', 'Fast transfer of leg drive into the arms'), component: 'power' },
          { kind: 'strength', libId: 'ex_bent_over_row', sets: 3, reps: '6', intensity: '2', basis: 'rir', tempo: '2-1-1-0', rest: '2min', purpose: t('توازن الكتف', 'Shoulder balance'), component: 'strength' },
          ...gymCD()
        ]
      },
      sp_power: {
        title: t('قدرة: رفعات أولمبية وتباين', 'Power: Olympic lifts & contrast'),
        goal: t('سرعة إنتاج القوة بحجم قليل وجودة عالية.', 'Rate of force development with low volume and high quality.'),
        components: ['power', 'speed', 'max_strength'],
        rpe: 7, duration: 75,
        items: [
          ...gymWU(),
          { kind: 'strength', libId: 'ad_power_snatch', sets: 4, reps: '2', intensity: '75-80', basis: '1rm', rest: '3min', purpose: t('سرعة الامتداد الثلاثي', 'Triple-extension speed'), component: 'power' },
          { kind: 'strength', libId: 'ad_hang_power_clean', sets: 4, reps: '2', intensity: '80-85', basis: '1rm', rest: '3min', purpose: t('قدرة من التعليق (زي مسار الرمية)', 'Power from the hang, similar to the throw path'), component: 'power' },
          { kind: 'strength', libId: 'ex_barbell_bench_press', sets: 3, reps: '3', intensity: '60', basis: '1rm', tempo: '1-0-X-0', rest: '2min', purpose: t('بنش سريع (سرعة البار عالية)', 'Speed bench (high bar velocity)'), component: 'speed', note: t('كل مجموعة يليها ٣ دفعات صدر بالكرة الطبية', 'Each set followed by 3 med-ball chest passes') },
          { kind: 'strength', libId: 'ad_back_squat_to_jump_squat_contrast', sets: 3, reps: '2+3', intensity: '87', basis: '1rm', tempo: '2-0-X-0', rest: '4min', purpose: t('تنشيط ثم وثب انفجاري', 'Potentiate then jump explosively'), component: 'power' },
          ...gymCD()
        ]
      },
      sp_primer: {
        title: t('تنشيط قبل المسابقة', 'Pre-competition primer'),
        goal: t('رميات قليلة سريعة وتنشيط عصبي بدون تعب.', 'A few fast throws and neural activation without fatigue.'),
        components: ['speed', 'technique', 'mental'],
        rpe: 5, duration: 50,
        items: [
          ...throwWU(),
          { kind: 'drill', name: t('رميات كاملة بالأداة الخفيفة', 'Full throws with the light shot'), sets: 1, reps: '4', intensity: '90', basis: 'best', rest: '2min', purpose: t('سرعة وإحساس بالإيقاع', 'Speed and rhythm feel'), component: 'speed' },
          { kind: 'drill', name: t('رميات كاملة بأداة المنافسة', 'Full throws with the competition shot'), sets: 1, reps: '4', intensity: '90-95', basis: 'best', rest: '2min', purpose: t('ثقة وتأكيد التكنيك', 'Confidence and technique confirmation'), component: 'technique' },
          { kind: 'strength', libId: 'ad_hang_power_clean', sets: 3, reps: '2', intensity: '70', basis: '1rm', rest: '2min', purpose: t('تنشيط الجهاز العصبي', 'Neural activation'), component: 'power' }
        ]
      },
      sp_comp: {
        title: t('يوم المسابقة', 'Competition day'),
        goal: t('روتين إحماء ثابت و٦ محاولات بأقصى تركيز.', 'Consistent warm-up routine and 6 maximally focused attempts.'),
        components: ['power', 'technique', 'mental'],
        rpe: 9, duration: 150,
        items: [
          ...throwWU(),
          { kind: 'drill', name: t('رميات الإحماء في الدائرة', 'Warm-up throws in the circle'), sets: 1, reps: '4-6', intensity: '90-95', basis: 'best', rest: '2min', purpose: t('ضبط الإيقاع على الدائرة الرسمية', 'Adjust rhythm to the official circle'), component: 'technique' },
          { kind: 'drill', name: t('محاولات المسابقة (٣ + ٣)', 'Competition attempts (3 + 3)'), sets: 1, reps: '6', intensity: '100', basis: 'best', rest: '8-15min', purpose: t('أحسن رمية في المسابقة', 'Best throw of the competition'), component: 'power', note: t('المحاولة الأولى رمية آمنة ٩٥٪ للتأهل', 'First attempt a safe 95% throw to qualify') },
          M('تهدئة وإطالات', 'Cool-down and stretching', { duration: '15min' })
        ]
      }
    }
  },
  /* ============================ ٤) رمي رمح — متوسط ============================ */
  {
    id: 'pt_javelin_int',
    sport: 'javelin',
    level: 'intermediate',
    title: t('رمي رمح — متوسط (موسم ١٦ أسبوع)', 'Javelin — intermediate (16-week season)'),
    goal: t('تحسين سرعة الاقتراب والخطوات المتقاطعة ونقلها للرمية مع كتف وكوع محميين، وتطوير قدرة الجذع الدورانية لرفع الرقم الشخصي.', 'Improve approach and crossover speed and transfer it into the throw with a protected shoulder and elbow, developing rotational trunk power to raise the personal best.'),
    components: ['technique', 'power', 'core', 'prevention', 'speed'],
    sessionsPerWeek: 5,
    periods: [
      {
        type: 'gpp',
        goal: t('قاعدة قوة عامة، تأهيل وقائي للكتف والكوع، وحجم عالي من رمي الكور الخفيفة.', 'General strength base, shoulder and elbow prehab, and high volume of light ball throws.'),
        components: ['strength', 'prevention', 'technique', 'core'],
        blocks: [
          {
            name: t('بلوك ١ — اختبارات ودخول', 'Block 1 — Testing & entry'),
            goal: t('قياس ٣٠م، رمية الكرة الطبية من فوق الراس، الوثب الطويل، و5RM سكوات.', 'Measure 30m sprint, overhead med-ball throw, standing long jump and 5RM squat.'),
            components: ['acceleration', 'power', 'strength'],
            loads: [4], weekTypes: ['test'],
            pattern: ['jv_test', '', 'jv_throw_tech', '', 'jv_strength', 'jv_trunk', '']
          },
          {
            name: t('بلوك ٢ — قاعدة ووقاية', 'Block 2 — Base & prehab'),
            goal: t('قوة عامة ٧٠-٧٥٪، ٢٠٠-٢٥٠ رمية كرة خفيفة في الأسبوع، وجري متقاطع بسرعة متوسطة.', 'General strength at 70-75%, 200-250 light ball throws per week and crossover runs at moderate speed.'),
            components: ['strength', 'prevention', 'technique', 'coordination'],
            loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['jv_crossover', 'jv_strength', 'jv_throw_tech', '', 'jv_trunk', 'jv_strength', '']
          }
        ]
      },
      {
        type: 'spp',
        goal: t('قوة خاصة بأدوات تقيلة، قدرة أولمبية، وانتقال للرمي من ٥ خطوات.', 'Special strength with heavy implements, Olympic power and progression to 5-stride throws.'),
        components: ['power', 'max_strength', 'technique', 'core'],
        blocks: [
          {
            name: t('بلوك ٣ — قوة خاصة', 'Block 3 — Special strength'),
            goal: t('رمي كور ١-٢ كجم ورمح أتقل، كلين ٧٥-٨٠٪، وقدرة دورانية للجذع.', 'Throws with 1-2 kg balls and a heavier javelin, clean at 75-80%, rotational trunk power.'),
            components: ['power', 'max_strength', 'technique', 'core'],
            loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['jv_crossover', 'jv_power', 'jv_throw_heavy', '', 'jv_throw_tech', 'jv_trunk', '']
          }
        ]
      },
      {
        type: 'precomp',
        goal: t('إعادة الاختبار، الاقتراب الكامل، ومسابقات تجريبية.', 'Retest, full approach and control competitions.'),
        components: ['technique', 'power', 'mental'],
        blocks: [
          {
            name: t('بلوك ٤ — أسبوع اختبارات', 'Block 4 — Testing week'),
            goal: t('مقارنة النتائج بالبداية وضبط حمل الرمي.', 'Compare with baseline and adjust throwing load.'),
            components: ['power', 'acceleration', 'strength'],
            loads: [4], weekTypes: ['test'],
            pattern: ['jv_test', '', 'jv_throw_tech', '', 'jv_power', '', '']
          },
          {
            name: t('بلوك ٥ — اقتراب كامل ومسابقات تجريبية', 'Block 5 — Full approach & control competitions'),
            goal: t('رمي من الاقتراب الكامل بأداة المنافسة والخفيفة ومسابقة تجريبية.', 'Full-approach throws with competition and light javelins plus a control competition.'),
            components: ['technique', 'power', 'mental'],
            loads: [7, 6], weekTypes: ['load', 'comp'],
            pattern: ['jv_crossover', 'jv_power', 'jv_throw_tech', '', 'jv_trunk', '', 'jv_comp']
          }
        ]
      },
      {
        type: 'comp',
        goal: t('الحفاظ على السرعة والقدرة وصحة الكتف مع منافسة أسبوعية.', 'Maintain speed, power and shoulder health with weekly competition.'),
        components: ['power', 'technique', 'prevention', 'mental'],
        blocks: [
          {
            name: t('بلوك ٦ — منافسات', 'Block 6 — Competition'),
            goal: t('تمرينة رمي واحدة بحجم قليل وتمرينة قدرة قصيرة في الأسبوع.', 'One low-volume throwing session and one short power session per week.'),
            components: ['power', 'technique', 'prevention'],
            loads: [6, 5, 6], weekTypes: ['comp', 'load', 'comp'],
            pattern: ['jv_throw_tech', 'jv_power', '', 'jv_crossover', '', 'jv_comp', '']
          }
        ]
      },
      {
        type: 'taper',
        goal: t('تهدئة قبل البطولة: كتف فريش وسرعة عالية.', 'Pre-championship taper: fresh shoulder and high speed.'),
        components: ['speed', 'recovery', 'mental'],
        blocks: [
          {
            name: t('بلوك ٧ — أسبوع البطولة', 'Block 7 — Championship week'),
            goal: t('رميات قليلة جدًا وخطوات متقاطعة سريعة.', 'Very few throws and sharp crossovers.'),
            components: ['speed', 'technique', 'recovery'],
            loads: [3], weekTypes: ['taper'],
            pattern: ['jv_crossover', '', 'jv_throw_tech', '', 'jv_trunk', '', 'jv_comp']
          }
        ]
      }
    ],
    sessions: {
      jv_test: {
        title: t('اختبارات رمي الرمح', 'Javelin testing'),
        goal: t('قياس السرعة والقدرة العامة والخاصة والقوة.', 'Measure speed, general and special power, and strength.'),
        components: ['acceleration', 'power', 'strength'],
        rpe: 7, duration: 110,
        items: [
          ...throwWU(),
          { kind: 'run', libId: 'ad_30_m_sprint_test', sets: 1, reps: '2', distance: '30m', intensity: '100', basis: 'vmax', rest: '5min', restType: 'walk', purpose: t('قياس التسارع', 'Measure acceleration'), component: 'acceleration' },
          { kind: 'drill', libId: 'ad_standing_broad_jump_test', sets: 1, reps: '3', rest: '2min', purpose: t('قياس قدرة الرجلين', 'Measure leg power'), component: 'power' },
          { kind: 'drill', name: t('رمية كرة طبية ٢ كجم من فوق الراس للأمام (من الثبات)', 'Standing forward overhead throw, 2 kg med ball'), sets: 1, reps: '3', rest: '2min', purpose: t('قياس القدرة الخاصة لحركة الرمي', 'Measure throwing-specific power'), component: 'power' },
          { kind: 'drill', libId: 'ad_medicine_ball_overhead_backward_throw', sets: 1, reps: '3', rest: '2min', purpose: t('قياس قدرة الامتداد الكلي (٣ كجم)', 'Measure total-body extension power (3 kg)'), component: 'power' },
          { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 1, reps: '5', intensity: '8-9', basis: 'rpe', tempo: '2-0-X-0', rest: '4min', purpose: t('الوصول لـ 5RM سكوات', 'Work up to a 5RM squat'), component: 'strength', note: t('1RM تقديري = 5RM × 1.15', 'Estimated 1RM = 5RM x 1.15') },
          { kind: 'strength', libId: 'ex_pullup', sets: 1, reps: 'max', intensity: '10', basis: 'rpe', rest: '3min', purpose: t('قوة السحب والتوازن العضلي للكتف', 'Pulling strength and shoulder balance'), component: 'strength' },
          ...gymCD()
        ]
      },
      jv_crossover: {
        title: t('خطوات متقاطعة وسرعة اقتراب', 'Crossovers & approach speed'),
        goal: t('الحفاظ على السرعة وقت سحب الرمح والخطوات المتقاطعة، والحوض سابق الكتف.', 'Keep speed through the withdrawal and crossover steps with hips ahead of shoulders.'),
        components: ['technique', 'speed', 'coordination'],
        rpe: 6, duration: 75,
        items: [
          ...trackWU(false),
          { kind: 'run', name: t('سحب الرمح مع المشي ثم الجري الخفيف', 'Javelin withdrawal walking, then jogging'), sets: 2, reps: '4', distance: '30m', intensity: '60-70', basis: 'vmax', rest: '60s', restType: 'walk', setRest: '2min', purpose: t('سحب الرمح بدون ما الكتف يلف أو الرمح يقع', 'Withdraw without shoulder rotation or javelin tip dropping'), component: 'technique' },
          { kind: 'run', name: t('جري متقاطع ٥ خطوات بالرمح', '5-stride crossover runs with javelin'), sets: 2, reps: '4', distance: '30m', intensity: '85', basis: 'vmax', rest: '90s', restType: 'walk', setRest: '3min', purpose: t('إيقاع الخطوات المتقاطعة والرجل تسبق الجسم', 'Crossover rhythm with legs running ahead of the body'), component: 'technique' },
          { kind: 'run', name: t('اقتراب كامل ينتهي بخطوة الارتكاز (بدون رمي)', 'Full approach into the block step (no release)'), sets: 1, reps: '5', distance: '30m', intensity: '90', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('ثبات العلامات والوصول لوضع الارتكاز متوازن', 'Consistent marks and a balanced arrival in the block'), component: 'technique' },
          { kind: 'run', libId: 'dr_sprint_accel', sets: 1, reps: '4', distance: '30m', intensity: '95', basis: 'vmax', rest: '3min', restType: 'walk', purpose: t('سرعة عامة', 'General speed'), component: 'acceleration' },
          ...trackCD()
        ]
      },
      jv_throw_tech: {
        title: t('رمي بأدوات خفيفة وتكنيك', 'Light implement & technique throwing'),
        goal: t('حجم رمي عالي بأدوات خفيفة (كور ٣٠٠-٥٠٠جم ورمح أخف) لتحسين مسار الدراع وسرعة الإطلاق.', 'High throwing volume with light implements (300-500 g balls and a lighter javelin) to improve arm path and release speed.'),
        components: ['technique', 'speed', 'coordination'],
        rpe: 6, duration: 85,
        items: [
          ...throwWU(),
          { kind: 'drill', name: t('رمي كور خفيفة (٣٠٠-٥٠٠جم) على الحائط والملعب', 'Light ball throws (300-500 g) against a wall and in the field'), sets: 3, reps: '10', rest: '60s', purpose: t('مسار الدراع العالي والكوع فوق الكتف', 'High arm path with the elbow above the shoulder'), component: 'technique' },
          { kind: 'drill', name: t('رمي من الثبات بالرمح (غرس في الأرض)', 'Standing javelin throws (stick into the ground)'), sets: 2, reps: '6', rest: '60s', purpose: t('خط الشد من القدم للرمح وتوجيه طرف الرمح', 'Force line from foot to javelin and tip alignment'), component: 'technique' },
          { kind: 'drill', name: t('رمي من ٣ خطوات بالرمح الخفيف', '3-stride throws with a light javelin'), sets: 1, reps: '10', intensity: '85-90', basis: 'best', rest: '90s', purpose: t('ربط خطوة الارتكاز بالإطلاق بسرعة', 'Link the block step and release at speed'), component: 'speed', note: t('رجال ٦٠٠-٧٠٠جم، سيدات ٤٠٠-٥٠٠جم', 'Men 600-700 g, women 400-500 g') },
          { kind: 'drill', name: t('رمي من ٥ خطوات أو اقتراب كامل بأداة المنافسة', '5-stride or full-approach throws with the competition javelin'), sets: 1, reps: '8', intensity: '90-95', basis: 'best', rest: '3min', purpose: t('نقل التكنيك لأداة المنافسة', 'Transfer technique to the competition javelin'), component: 'technique', note: t('في الإعداد العام من ٥ خطوات فقط؛ وقف فورًا لو فيه ألم في الكوع', 'In GPP from 5 strides only; stop immediately if there is elbow pain') },
          { kind: 'strength', libId: 'ad_side_lying_external_rotation', sets: 2, reps: '15', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '45s', purpose: t('قوة الدوران الخارجي لحماية الكتف', 'External rotation strength to protect the shoulder'), component: 'prevention' },
          ml('ad_sleeper_stretch', { sets: 2, duration: '30s' })
        ]
      },
      jv_throw_heavy: {
        title: t('رمي بأدوات تقيلة (قوة خاصة)', 'Heavy implement throwing (special strength)'),
        goal: t('قوة خاصة لسلسلة الرمي بكور تقيلة ورمح أتقل مع حجم محسوب لحماية الكوع.', 'Special strength for the throwing chain with heavy balls and a heavier javelin, with controlled volume to protect the elbow.'),
        components: ['power', 'max_strength', 'technique'],
        rpe: 7, duration: 80,
        items: [
          ...throwWU(),
          { kind: 'drill', name: t('رمي كرة طبية ٢-٣ كجم من فوق الراس (ركوع ثم وقوف)', 'Overhead med-ball throws 2-3 kg (kneeling, then standing)'), sets: 3, reps: '6', rest: '90s', purpose: t('قوة الجذع والكتف في وضع القوس (البو)', 'Trunk and shoulder strength in the bow position'), component: 'power' },
          { kind: 'drill', name: t('رمي كور تقيلة ١-٢ كجم من ٣ خطوات', 'Heavy ball throws 1-2 kg from 3 strides'), sets: 2, reps: '6', rest: '2min', purpose: t('قوة خاصة بنفس مسار الرمي', 'Special strength along the throwing path'), component: 'max_strength' },
          { kind: 'drill', name: t('رمي رمح أتقل من ٥ خطوات', 'Heavier javelin throws from 5 strides'), sets: 1, reps: '8', intensity: '8', basis: 'rpe', rest: '2min', purpose: t('قوة خاصة بالحفاظ على التكنيك', 'Special strength while preserving technique'), component: 'power', note: t('رجال ٩٠٠-١٠٠٠جم، سيدات ٧٠٠جم', 'Men 900-1000 g, women 700 g') },
          { kind: 'strength', libId: 'ex_face_pull', sets: 3, reps: '15', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '45s', purpose: t('توازن الكتف الخلفي ولوح الكتف', 'Posterior shoulder and scapular balance'), component: 'prevention' },
          ml('ad_sleeper_stretch', { sets: 2, duration: '30s' }),
          ml('ad_open_book', { sets: 2, reps: '8/side' })
        ]
      },
      jv_trunk: {
        title: t('قدرة الجذع الدورانية + تأهيل الكتف', 'Rotational trunk power + shoulder prehab'),
        goal: t('قدرة دورانية للجذع ووقاية الكتف والكوع ولوح الكتف.', 'Rotational trunk power and shoulder, elbow and scapular prehab.'),
        components: ['core', 'power', 'prevention'],
        rpe: 5, duration: 60,
        items: [
          ...throwWU(),
          { kind: 'drill', libId: 'ad_medicine_ball_rotational_throw', sets: 4, reps: '5/side', rest: '60s', purpose: t('قدرة دورانية للجذع', 'Rotational trunk power'), component: 'power', note: t('كرة ٣-٤ كجم', '3-4 kg ball') },
          { kind: 'drill', libId: 'ad_medicine_ball_soccer_throw', sets: 3, reps: '6', rest: '60s', purpose: t('قوة القوس (جذع وكتف) زي وضع الرمية', 'Bow-position strength (trunk and shoulder) as in the throw'), component: 'power' },
          { kind: 'strength', libId: 'ad_landmine_rotation', sets: 3, reps: '8/side', intensity: '2', basis: 'rir', tempo: '1-0-1-0', rest: '60s', purpose: t('نقل القوة من الحوض للكتف', 'Force transfer from hips to shoulders'), component: 'core' },
          { kind: 'strength', libId: 'wg_pallof_press', sets: 3, reps: '10/side', intensity: '7', basis: 'rpe', tempo: '1-2-1-0', rest: '45s', purpose: t('ثبات ضد الدوران', 'Anti-rotation stability'), component: 'core' },
          { kind: 'strength', libId: 'wg_prone_y_raise', sets: 2, reps: '12', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '45s', purpose: t('قوة أسفل الترابيس وثبات لوح الكتف', 'Lower-trap strength and scapular stability'), component: 'prevention' },
          { kind: 'strength', libId: 'ad_eccentric_wrist_extension', sets: 2, reps: '15', intensity: '2', basis: 'rir', tempo: '4-0-1-0', rest: '45s', purpose: t('وقاية الكوع والساعد', 'Elbow and forearm protection'), component: 'prevention' },
          ml('ad_sleeper_stretch', { sets: 2, duration: '30s' })
        ]
      },
      jv_strength: {
        title: t('قوة عامة', 'General strength'),
        goal: t('قوة أساسية للرجلين والجذع والسحب، مع بولأوفر لتقوية سلسلة الرمي.', 'Foundational leg, trunk and pulling strength, with pullovers for the throwing chain.'),
        components: ['strength', 'hypertrophy', 'prevention'],
        rpe: 7, duration: 80,
        items: [
          ...gymWU(),
          { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 4, reps: '6', intensity: '70-75', basis: '1rm', tempo: '3-0-1-0', rest: '3min', purpose: t('قوة الرجلين', 'Leg strength'), component: 'strength' },
          { kind: 'strength', libId: 'ad_hang_power_clean', sets: 4, reps: '3', intensity: '65-70', basis: '1rm', rest: '2min', purpose: t('تعلم الامتداد الثلاثي', 'Learn triple extension'), component: 'power' },
          { kind: 'strength', libId: 'ex_pullup', sets: 4, reps: '6-8', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '2min', purpose: t('قوة السحب', 'Pulling strength'), component: 'strength' },
          { kind: 'strength', libId: 'ek_dumbbell_bent_arm_pullover', sets: 3, reps: '10', intensity: '3', basis: 'rir', tempo: '3-1-1-0', rest: '90s', purpose: t('قوة اللاتس والصدر بمدى حركي زي الرمية', 'Lat and chest strength through a throwing-like range'), component: 'strength' },
          { kind: 'strength', libId: 'ex_bulgarian_split_squat', sets: 3, reps: '8/leg', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '90s', purpose: t('قوة رجل الارتكاز', 'Block-leg strength'), component: 'strength' },
          { kind: 'strength', libId: 'ex_band_external_rotation', sets: 3, reps: '15', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '45s', purpose: t('وقاية الكتف', 'Shoulder prehab'), component: 'prevention' },
          ...gymCD()
        ]
      },
      jv_power: {
        title: t('قدرة وقوة قصوى', 'Power & max strength'),
        goal: t('قوة قصوى معتدلة وقدرة أولمبية لرفع سرعة الاقتراب والارتكاز.', 'Moderate max strength and Olympic power to raise approach and block speed.'),
        components: ['power', 'max_strength'],
        rpe: 7, duration: 70,
        items: [
          ...gymWU(),
          { kind: 'strength', libId: 'ad_power_clean', sets: 4, reps: '3', intensity: '75-80', basis: '1rm', rest: '3min', purpose: t('قدرة قصوى', 'Maximal power'), component: 'power' },
          { kind: 'strength', libId: 'ad_power_snatch', sets: 3, reps: '2', intensity: '70-75', basis: '1rm', rest: '2min', purpose: t('سرعة وامتداد كامل للجسم فوق الراس', 'Speed and full overhead extension'), component: 'power' },
          { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 4, reps: '4', intensity: '80-85', basis: '1rm', tempo: '2-0-X-0', rest: '3min', purpose: t('قوة قصوى للرجلين', 'Maximal leg strength'), component: 'max_strength' },
          { kind: 'drill', libId: 'ad_broad_jump', sets: 3, reps: '3', rest: '90s', purpose: t('قدرة الرجلين', 'Leg power'), component: 'power' },
          { kind: 'strength', libId: 'ad_side_lying_external_rotation', sets: 2, reps: '12', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '45s', purpose: t('وقاية الكتف', 'Shoulder prehab'), component: 'prevention' },
          ...gymCD()
        ]
      },
      jv_comp: {
        title: t('يوم المسابقة', 'Competition day'),
        goal: t('روتين إحماء ثابت و٦ محاولات بتركيز كامل وكتف محمي.', 'Consistent warm-up routine and 6 focused attempts with a protected shoulder.'),
        components: ['technique', 'power', 'mental'],
        rpe: 9, duration: 150,
        items: [
          ...throwWU(),
          { kind: 'drill', name: t('رميات إحماء متدرجة (٣ خطوات ثم اقتراب كامل)', 'Progressive warm-up throws (3 strides, then full approach)'), sets: 1, reps: '5', intensity: '85-95', basis: 'best', rest: '2min', purpose: t('ضبط العلامات والإيقاع', 'Adjust marks and rhythm'), component: 'technique' },
          { kind: 'drill', name: t('محاولات المسابقة (٣ + ٣)', 'Competition attempts (3 + 3)'), sets: 1, reps: '6', intensity: '100', basis: 'best', rest: '8-15min', purpose: t('أحسن رمية في المسابقة', 'Best throw of the competition'), component: 'power', note: t('خلّي الكتف دافي بين الجولات بالأستك', 'Keep the shoulder warm between rounds with a band') },
          M('تهدئة وإطالات الكتف', 'Cool-down and shoulder stretching', { duration: '15min' })
        ]
      }
    }
  },
  /* ============================ ٥) دراجات طريق — متوسط ============================ */
  {
    id: 'pt_cycling_road_int',
    sport: 'cycling',
    level: 'intermediate',
    title: t('دراجات طريق — متوسط (١٤ أسبوع مبني على FTP)', 'Road cycling — intermediate (14-week FTP-based plan)'),
    goal: t('رفع الـFTP بنسبة ٥-٨٪ وتحسين القدرة على تكرار الهجمات فوق العتبة، للوصول لسباق الطريق الهدف في أحسن حالة.', 'Raise FTP by 5-8% and improve repeatability above threshold to arrive at the target road race in peak form.'),
    components: ['aerobic', 'threshold', 'vo2max', 'muscular_endurance', 'strength'],
    sessionsPerWeek: 5,
    periods: [
      {
        type: 'gpp',
        goal: t('قاعدة هوائية (زون ٢)، سويت سبوت، وقوة عامة في الجيم مرتين في الأسبوع.', 'Aerobic base (Zone 2), sweet spot and general gym strength twice a week.'),
        components: ['aerobic', 'muscular_endurance', 'strength'],
        blocks: [
          {
            name: t('بلوك ١ — اختبار FTP ودخول', 'Block 1 — FTP test & entry'),
            goal: t('اختبار ٢٠ دقيقة لتحديد الـFTP ومناطق النبض والوات.', '20-minute test to set FTP, power and heart-rate zones.'),
            components: ['threshold', 'aerobic'],
            loads: [4], weekTypes: ['test'],
            pattern: ['', 'cy_ftp_test', 'cy_recovery', 'cy_gym', '', 'cy_endurance', 'cy_recovery']
          },
          {
            name: t('بلوك ٢ — قاعدة وسويت سبوت', 'Block 2 — Base & sweet spot'),
            goal: t('زيادة مدة الركوب الطويل ١٥-٢٠ دقيقة كل أسبوع، وسويت سبوت من ٣×١٠ لـ ٣×١٥ دقيقة.', 'Extend the long ride by 15-20 min weekly and sweet spot from 3x10 to 3x15 min.'),
            components: ['aerobic', 'muscular_endurance', 'strength'],
            loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['', 'cy_sweetspot', 'cy_gym', 'cy_tempo', '', 'cy_endurance', 'cy_recovery']
          }
        ]
      },
      {
        type: 'spp',
        goal: t('بناء: فترات عتبة وVO2max مع الحفاظ على الركوب الطويل والجيم مرة في الأسبوع.', 'Build: threshold and VO2max intervals while keeping the long ride and gym once a week.'),
        components: ['threshold', 'vo2max', 'aerobic'],
        blocks: [
          {
            name: t('بلوك ٣ — عتبة وVO2', 'Block 3 — Threshold & VO2'),
            goal: t('عتبة من ٢×١٢ لـ ٢×٢٠ دقيقة و٥×٤ دقايق على ١١٠-١٢٠٪ FTP.', 'Threshold from 2x12 to 2x20 min and 5x4 min at 110-120% FTP.'),
            components: ['threshold', 'vo2max', 'aerobic'],
            loads: [6, 7, 8], weekTypes: ['load', 'load', 'shock'],
            pattern: ['', 'cy_threshold', 'cy_gym', 'cy_vo2', '', 'cy_endurance', 'cy_recovery']
          },
          {
            name: t('بلوك ٤ — تخفيف وإعادة اختبار', 'Block 4 — Recovery & FTP retest'),
            goal: t('أسبوع تخفيف وإعادة اختبار الـFTP وتحديث كل المناطق.', 'Recovery week, FTP retest and update all zones.'),
            components: ['threshold', 'recovery'],
            loads: [4], weekTypes: ['test'],
            pattern: ['', 'cy_ftp_test', 'cy_recovery', '', 'cy_sweetspot', 'cy_endurance', '']
          }
        ]
      },
      {
        type: 'precomp',
        goal: t('تخصص السباق: هجمات متكررة فوق العتبة، محاكاة سباق، وركوب طويل بإيقاع السباق.', 'Race specialty: repeated efforts above threshold, race simulation and long rides at race tempo.'),
        components: ['vo2max', 'anaerobic', 'threshold', 'tactics'],
        blocks: [
          {
            name: t('بلوك ٥ — محاكاة السباق', 'Block 5 — Race simulation'),
            goal: t('فترات VO2 قصيرة (٣٠/٣٠)، محاكاة سباق بهجمات، وتغذية زي يوم السباق.', 'Short VO2 intervals (30/30), race simulation with attacks and race-day fuelling practice.'),
            components: ['vo2max', 'anaerobic', 'tactics'],
            loads: [7, 8, 5], weekTypes: ['load', 'shock', 'deload'],
            pattern: ['', 'cy_vo2', 'cy_gym', 'cy_race_sim', '', 'cy_endurance', 'cy_recovery']
          }
        ]
      },
      {
        type: 'taper',
        goal: t('تهدئة: خفض الحجم ٤٠-٥٠٪ مع الحفاظ على لمسات شدة عالية قصيرة.', 'Taper: cut volume 40-50% while keeping short high-intensity touches.'),
        components: ['vo2max', 'recovery', 'mental'],
        blocks: [
          {
            name: t('بلوك ٦ — تهدئة', 'Block 6 — Taper'),
            goal: t('نفس الشدة بنص عدد الفترات وركوب طويل ٦٠٪ من المعتاد.', 'Same intensity with half the intervals and a long ride at 60% of usual.'),
            components: ['vo2max', 'threshold', 'recovery'],
            loads: [4], weekTypes: ['taper'],
            pattern: ['', 'cy_vo2', 'cy_recovery', 'cy_threshold', '', 'cy_endurance', 'cy_recovery']
          },
          {
            name: t('بلوك ٧ — أسبوع السباق', 'Block 7 — Race week'),
            goal: t('رجلين فريش وتنشيط قبل السباق بيوم.', 'Fresh legs and an opener the day before the race.'),
            components: ['recovery', 'mental', 'tactics'],
            loads: [3], weekTypes: ['comp'],
            pattern: ['', 'cy_vo2', 'cy_recovery', '', '', 'cy_opener', 'cy_race']
          }
        ]
      }
    ],
    sessions: {
      cy_ftp_test: {
        title: t('اختبار FTP (٢٠ دقيقة)', 'FTP test (20 minutes)'),
        goal: t('تحديد الـFTP = ٩٥٪ من متوسط وات الـ٢٠ دقيقة، ونبض العتبة (LTHR) = متوسط نبض آخر ٢٠ دقيقة.', 'Set FTP = 95% of 20-minute average power; LTHR = average heart rate of the 20 minutes.'),
        components: ['threshold', 'vo2max'],
        rpe: 9, duration: 65,
        items: [
          W('تسخين تدريجي من زون ١ لزون ٣', 'Progressive warm-up Zone 1 to Zone 3', { duration: '15min' }),
          { kind: 'timed', libId: 'ad_bike_cadence_drills', sets: 1, reps: '3', duration: '1min', intensity: '5', basis: 'rpe', rest: '1min', note: t('تدوير ١٠٠-١١٠ دورة/دقيقة', 'Cadence 100-110 rpm'), purpose: t('تنشيط العضلات وتدوير سريع', 'Neuromuscular activation with high cadence'), component: 'coordination' },
          { kind: 'timed', name: t('مجهود تفريغ ٥ دقايق', '5-minute blow-out effort'), sets: 1, duration: '5min', intensity: '9', basis: 'rpe', rest: '10min', purpose: t('تفريغ الطاقة اللاهوائية عشان الاختبار يقيس العتبة بدقة', 'Deplete anaerobic capacity so the test reflects threshold'), component: 'vo2max' },
          { kind: 'timed', name: t('اختبار ٢٠ دقيقة بأقصى متوسط ثابت', '20-minute max sustainable effort'), sets: 1, duration: '20min', intensity: '10', basis: 'rpe', purpose: t('تحديد الـFTP ومناطق التدريب', 'Determine FTP and training zones'), component: 'threshold', note: t('ابدأ متحفظ أول ٥ دقايق وزوّد تدريجيًا؛ طريق مستوي أو ترينر', 'Start conservatively for 5 min then build; flat road or trainer') },
          M('تهدئة سهلة زون ١', 'Easy cool-down Zone 1', { duration: '10min' })
        ]
      },
      cy_recovery: {
        title: t('ركوب استشفاء', 'Recovery ride'),
        goal: t('تحريك الدم والاستشفاء بدون أي حمل (أقل من ٥٥٪ FTP).', 'Promote blood flow and recovery with no load (under 55% FTP).'),
        components: ['recovery', 'aerobic'],
        rpe: 2, duration: 50,
        items: [
          W('بداية سهلة جدًا', 'Very easy start', { duration: '10min' }),
          { kind: 'timed', libId: 'ad_steady_state_bike_ride', sets: 1, duration: '30min', intensity: 'Z1', basis: 'hr', purpose: t('استشفاء نشط', 'Active recovery'), component: 'recovery', note: t('أقل من ٥٥٪ FTP، تدوير ٩٠-١٠٠', 'Under 55% FTP, cadence 90-100') },
          { kind: 'timed', libId: 'ad_bike_cadence_drills', sets: 1, reps: '4', duration: '1min', intensity: '3', basis: 'rpe', rest: '2min', note: t('تدوير ١١٠ دورة/دقيقة بدون ما الوسط ينط', 'Cadence 110 rpm without bouncing'), purpose: t('نعومة التدوير', 'Pedalling smoothness'), component: 'coordination' },
          ml('ex_hip_flexor_stretch', { sets: 2, duration: '40s' })
        ]
      },
      cy_endurance: {
        title: t('ركوب طويل تحمل (زون ٢)', 'Long endurance ride (Zone 2)'),
        goal: t('رفع القاعدة الهوائية وحرق الدهون وتحمل الوقت على الدراجة.', 'Build aerobic base, fat oxidation and time-in-the-saddle durability.'),
        components: ['aerobic', 'muscular_endurance'],
        rpe: 5, duration: 210,
        items: [
          W('بداية سهلة زون ١', 'Easy start Zone 1', { duration: '15min' }),
          { kind: 'timed', libId: 'wg_cycling', name: t('ركوب تحمل زون ٢', 'Zone 2 endurance ride'), sets: 1, duration: '150-180min', intensity: 'Z2', basis: 'hr', purpose: t('تحمل هوائي طويل', 'Long aerobic endurance'), component: 'aerobic', note: t('٥٦-٧٥٪ FTP (٦٩-٨٣٪ من نبض العتبة)، تدوير ٨٥-٩٥. كُل ٦٠-٨٠ جم كربوهيدرات في الساعة', '56-75% FTP (69-83% LTHR), cadence 85-95. Eat 60-80 g carbs per hour') },
          { kind: 'timed', name: t('بلوكات تيمبو داخل الركوب الطويل', 'Tempo blocks inside the long ride'), sets: 1, reps: '2', duration: '15min', intensity: '76-87% FTP', basis: 'watts', rest: '10min', purpose: t('تحمل عضلي على إيقاع السباق بعد تعب', 'Muscular endurance at race tempo when fatigued'), component: 'muscular_endurance', note: t('في آخر ساعة؛ من بلوك ٣ وطالع', 'In the final hour; from Block 3 onwards') },
          M('تهدئة + إطالات', 'Cool-down + stretching', { duration: '10min' })
        ]
      },
      cy_tempo: {
        title: t('ركوب منتصف الأسبوع (زون ٢-٣)', 'Mid-week endurance ride (Zone 2-3)'),
        goal: t('حجم هوائي إضافي مع بلوكات تيمبو بتدوير منخفض لقوة الرجل.', 'Extra aerobic volume with low-cadence tempo blocks for leg strength.'),
        components: ['aerobic', 'muscular_endurance', 'strength'],
        rpe: 5, duration: 90,
        items: [
          W('تسخين تدريجي', 'Progressive warm-up', { duration: '15min' }),
          { kind: 'timed', libId: 'ad_steady_state_bike_ride', sets: 1, duration: '40min', intensity: 'Z2', basis: 'hr', purpose: t('حجم هوائي', 'Aerobic volume'), component: 'aerobic' },
          { kind: 'timed', name: t('تيمبو بتدوير منخفض (٥٥-٦٥ دورة) على طلعة', 'Low-cadence tempo (55-65 rpm) on a climb'), sets: 1, reps: '3', duration: '8min', intensity: '76-85% FTP', basis: 'watts', rest: '4min', purpose: t('قوة عضلية خاصة للدراجة', 'Bike-specific muscular strength'), component: 'muscular_endurance', note: t('الجذع ثابت والركبة مستقيمة؛ وقف لو فيه ألم ركبة', 'Stable trunk and knee tracking; stop if knee pain') },
          M('تهدئة سهلة', 'Easy cool-down', { duration: '10min' })
        ]
      },
      cy_sweetspot: {
        title: t('سويت سبوت', 'Sweet spot'),
        goal: t('أعلى عائد على الـFTP بأقل تعب نسبي (٨٨-٩٤٪ FTP).', 'Best FTP return for relatively low fatigue (88-94% FTP).'),
        components: ['threshold', 'muscular_endurance', 'aerobic'],
        rpe: 7, duration: 90,
        items: [
          W('تسخين تدريجي + ٣ تسارعات ١٠ ثواني', 'Progressive warm-up + 3 x 10 s spin-ups', { duration: '15min' }),
          { kind: 'timed', name: t('فترات سويت سبوت', 'Sweet spot intervals'), sets: 1, reps: '3', duration: '12-15min', intensity: '88-94% FTP', basis: 'watts', rest: '5min', purpose: t('رفع العتبة وتحمل العضلات', 'Raise threshold and muscular endurance'), component: 'threshold', note: t('الأسبوع الأول ٣×١٠، يزيد لحد ٣×١٥ أو ٢×٢٠. تدوير ٨٥-٩٥', 'Week 1: 3x10, progress to 3x15 or 2x20. Cadence 85-95') },
          { kind: 'timed', libId: 'ad_steady_state_bike_ride', sets: 1, duration: '20min', intensity: 'Z2', basis: 'hr', purpose: t('حجم هوائي بعد الفترات', 'Aerobic volume after the intervals'), component: 'aerobic' },
          M('تهدئة سهلة', 'Easy cool-down', { duration: '10min' })
        ]
      },
      cy_threshold: {
        title: t('فترات عتبة (FTP)', 'Threshold intervals (FTP)'),
        goal: t('رفع القدرة المستدامة عند العتبة (٩٥-١٠٥٪ FTP).', 'Raise sustainable power at threshold (95-105% FTP).'),
        components: ['threshold', 'muscular_endurance'],
        rpe: 8, duration: 90,
        items: [
          W('تسخين تدريجي + ٣×١ دقيقة على ١٠٥٪', 'Progressive warm-up + 3 x 1 min at 105%', { duration: '20min' }),
          { kind: 'timed', name: t('فترات عتبة', 'Threshold intervals'), sets: 1, reps: '2', duration: '12-20min', intensity: '95-100% FTP', basis: 'watts', rest: '6min', purpose: t('رفع الـFTP', 'Raise FTP'), component: 'threshold', note: t('يبدأ ٢×١٢ ويزيد ٤ دقايق كل أسبوع لحد ٢×٢٠', 'Start 2x12, add 4 min per week up to 2x20') },
          { kind: 'timed', name: t('أوفر-أندر (٢ دقيقة ٩٥٪ / ١ دقيقة ١٠٥٪)', 'Over-unders (2 min 95% / 1 min 105%)'), sets: 1, reps: '1', duration: '9min', intensity: '95-105% FTP', basis: 'watts', rest: '5min', purpose: t('التعامل مع اللاكتيك حوالين العتبة زي الطلعات', 'Clear lactate around threshold, as on climbs'), component: 'threshold' },
          M('تهدئة سهلة', 'Easy cool-down', { duration: '10min' })
        ]
      },
      cy_vo2: {
        title: t('فترات VO2max', 'VO2max intervals'),
        goal: t('رفع الحد الأقصى لاستهلاك الأكسجين والقدرة على الهجمات (١٠٦-١٢٠٪ FTP).', 'Raise VO2max and attacking capacity (106-120% FTP).'),
        components: ['vo2max', 'anaerobic'],
        rpe: 9, duration: 80,
        items: [
          W('تسخين تدريجي + ٢×٣٠ث سريع', 'Progressive warm-up + 2 x 30 s fast', { duration: '20min' }),
          { kind: 'timed', name: t('فترات ٤ دقايق VO2', '4-minute VO2 intervals'), sets: 1, reps: '5', duration: '4min', intensity: '110-120% FTP', basis: 'watts', rest: '4min', purpose: t('وقت أطول قرب الـVO2max', 'Accumulate time near VO2max'), component: 'vo2max', note: t('في التهدئة: ٣ فترات بس بنفس الشدة', 'Taper weeks: only 3 reps at the same intensity') },
          { kind: 'timed', name: t('٣٠/٣٠ (٣٠ث قوي / ٣٠ث سهل)', '30/30s (30 s hard / 30 s easy)'), sets: 2, reps: '8', duration: '30s', intensity: '120-130% FTP', basis: 'watts', rest: '30s', setRest: '5min', purpose: t('قدرة على تكرار الهجمات', 'Repeat-attack capacity'), component: 'anaerobic', note: t('من بلوك ٥ وطالع', 'From Block 5 onwards') },
          M('تهدئة سهلة', 'Easy cool-down', { duration: '10min' })
        ]
      },
      cy_race_sim: {
        title: t('محاكاة سباق', 'Race simulation'),
        goal: t('تجربة ظروف السباق: إيقاع ثابت، هجمات، طلعات، وتغذية.', 'Rehearse race conditions: steady tempo, attacks, climbs and fuelling.'),
        components: ['tactics', 'vo2max', 'threshold', 'anaerobic'],
        rpe: 8, duration: 150,
        items: [
          W('تسخين تدريجي', 'Progressive warm-up', { duration: '20min' }),
          { kind: 'timed', name: t('إيقاع سباق مع هجمات ٢٠ ثانية كل ٥ دقايق', 'Race tempo with 20 s surges every 5 min'), sets: 1, duration: '60min', intensity: '80-90% FTP', basis: 'watts', purpose: t('تحمل التغيرات المفاجئة في الإيقاع', 'Tolerate sudden pace changes'), component: 'tactics', note: t('الهجمات على ١٥٠٪ FTP؛ ممكن في جروب رايد منظم', 'Surges at 150% FTP; can be done in a structured group ride') },
          { kind: 'timed', name: t('طلعات بمجهود قوي', 'Hard climbing efforts'), sets: 1, reps: '3', duration: '5min', intensity: '105-110% FTP', basis: 'watts', rest: '5min', purpose: t('محاكاة الطلعات الحاسمة', 'Simulate decisive climbs'), component: 'vo2max' },
          { kind: 'timed', name: t('سبرنت نهاية السباق', 'Finishing sprints'), sets: 1, reps: '3', duration: '15s', intensity: '10', basis: 'rpe', rest: '5min', purpose: t('سبرنت بعد تعب', 'Sprint under fatigue'), component: 'anaerobic' },
          M('تهدئة سهلة', 'Easy cool-down', { duration: '15min' })
        ]
      },
      cy_gym: {
        title: t('جيم لدعم الدراجة', 'Gym support for cycling'),
        goal: t('قوة الرجلين والجذع ووقاية الركبة والظهر بدون تعب زيادة.', 'Leg and trunk strength and knee/back protection without excessive fatigue.'),
        components: ['strength', 'core', 'prevention'],
        rpe: 6, duration: 60,
        items: [
          ...gymWU(),
          { kind: 'strength', libId: 'ex_barbell_back_squat', sets: 4, reps: '5', intensity: '75-80', basis: '1rm', tempo: '3-0-1-0', rest: '3min', purpose: t('قوة الدفع على البدال', 'Pedal-stroke force'), component: 'strength', note: t('في البناء والتخصص: ٣×٤ على ٨٠٪ للحفاظ فقط', 'Build and specialty: 3x4 at 80% for maintenance only') },
          { kind: 'strength', libId: 'ex_romanian_deadlift', sets: 3, reps: '6', intensity: '2', basis: 'rir', tempo: '3-0-1-0', rest: '2min', purpose: t('قوة الخلفية والظهر للوضع المنحني', 'Hamstring and back strength for the bent-over position'), component: 'strength' },
          { kind: 'strength', libId: 'ex_bulgarian_split_squat', sets: 3, reps: '8/leg', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '90s', purpose: t('قوة الرجل الواحدة وتوازن اليمين والشمال', 'Single-leg strength and left-right balance'), component: 'strength' },
          { kind: 'strength', libId: 'ex_side_plank', sets: 3, reps: '30s/side', intensity: '7', basis: 'rpe', rest: '45s', purpose: t('ثبات الجذع', 'Trunk stability'), component: 'core' },
          { kind: 'strength', libId: 'ex_bird_dog', sets: 3, reps: '8/side', intensity: '6', basis: 'rpe', tempo: '2-2-2-0', rest: '30s', purpose: t('ثبات أسفل الظهر', 'Lower-back control'), component: 'prevention' },
          ...gymCD()
        ]
      },
      cy_opener: {
        title: t('تنشيط قبل السباق', 'Pre-race opener'),
        goal: t('تفتيح الرجلين بدون تعب قبل السباق بيوم.', 'Open the legs without fatigue the day before the race.'),
        components: ['vo2max', 'recovery'],
        rpe: 4, duration: 50,
        items: [
          W('ركوب سهل زون ٢', 'Easy Zone 2 ride', { duration: '20min' }),
          { kind: 'timed', name: t('فترات تنشيط', 'Openers'), sets: 1, reps: '3', duration: '1min', intensity: '110-120% FTP', basis: 'watts', rest: '3min', purpose: t('تجهيز الجهاز الهوائي والعضلات للسباق', 'Prime aerobic system and muscles for racing'), component: 'vo2max' },
          { kind: 'timed', name: t('سبرنت قصير', 'Short sprints'), sets: 1, reps: '2', duration: '10s', intensity: '9', basis: 'rpe', rest: '3min', purpose: t('تنشيط عصبي', 'Neural activation'), component: 'anaerobic' },
          M('ركوب سهل للتهدئة', 'Easy spin cool-down', { duration: '10min' })
        ]
      },
      cy_race: {
        title: t('يوم السباق', 'Race day'),
        goal: t('تنفيذ خطة السباق والتغذية.', 'Execute the race and fuelling plan.'),
        components: ['tactics', 'threshold', 'mental'],
        rpe: 9, duration: 180,
        items: [
          W('تسخين: ١٥ دقيقة تدريجي + ٢×١ دقيقة على ١٠٥٪', 'Warm-up: 15 min progressive + 2 x 1 min at 105%', { duration: '20min' }),
          { kind: 'timed', name: t('سباق الطريق', 'Road race'), sets: 1, duration: '120-150min', intensity: '9', basis: 'rpe', purpose: t('أحسن نتيجة في السباق الهدف', 'Best result in the target race'), component: 'tactics', note: t('وفّر طاقتك في الجروب، ٦٠-٩٠ جم كربوهيدرات في الساعة، واتحرك في آخر ٢٠٪ من السباق', 'Save energy in the bunch, 60-90 g carbs per hour, and make your move in the final 20%') },
          M('تهدئة سهلة', 'Easy cool-down', { duration: '10min' })
        ]
      }
    }
  },
  /* ============================ ٦) تجديف ٢٠٠٠م — متقدم ============================ */
  {
    id: 'pt_rowing_2k_adv',
    sport: 'rowing',
    level: 'advanced',
    title: t('تجديف ٢٠٠٠م — متقدم (موسم ١٦ أسبوع)', 'Rowing 2000m — advanced (16-week season)'),
    goal: t('تحسين زمن ٢٠٠٠م على الإرج والمية ٢-٤ ثواني عن طريق قاعدة هوائية ضخمة (UT2/UT1)، رفع العتبة (AT)، وتحمل إيقاع السباق (TR) مع قوة وقدرة في الجيم.', 'Improve 2000m erg and water time by 2-4 s through a large aerobic base (UT2/UT1), a higher threshold (AT) and race-rate tolerance (TR), supported by gym strength and power.'),
    components: ['aerobic', 'threshold', 'vo2max', 'strength', 'power'],
    sessionsPerWeek: 7,
    periods: [
      {
        type: 'gpp',
        goal: t('حجم عالي UT2/UT1 (٧٠-٨٠٪ من الوقت) وقوة عامة وتحمل عضلي في الجيم.', 'High UT2/UT1 volume (70-80% of time) with general strength and muscular endurance in the gym.'),
        components: ['aerobic', 'strength', 'muscular_endurance', 'technique'],
        blocks: [
          {
            name: t('بلوك ١ — اختبار ٦ كم ودخول', 'Block 1 — 6k test & entry'),
            goal: t('اختبار ٦٠٠٠م لتحديد مستوى القاعدة الهوائية وحساب الـsplits.', '6000m test to assess aerobic base and set training splits.'),
            components: ['aerobic', 'threshold'],
            loads: [4], weekTypes: ['test'],
            pattern: ['rw_test_6k', 'rw_ut2', 'rw_strength', 'rw_ut2', '', 'rw_ut1', 'rw_cross']
          },
          {
            name: t('بلوك ٢ — قاعدة هوائية', 'Block 2 — Aerobic base'),
            goal: t('١٦٠-٢٠٠ كم في الأسبوع (إرج + مية)، UT1 مرتين، وجيم مرتين.', '160-200 km per week (erg + water), UT1 twice and gym twice.'),
            components: ['aerobic', 'strength', 'muscular_endurance'],
            loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['rw_ut2', 'rw_strength', 'rw_ut1', 'rw_ut2', 'rw_strength', 'rw_at', 'rw_cross']
          }
        ]
      },
      {
        type: 'spp',
        goal: t('رفع العتبة (AT) وإدخال شغل TR، والجيم بيتحول لقوة قصوى وقدرة.', 'Raise threshold (AT) and introduce TR work, gym shifts to max strength and power.'),
        components: ['threshold', 'vo2max', 'max_strength', 'power'],
        blocks: [
          {
            name: t('بلوك ٣ — عتبة وقوة', 'Block 3 — Threshold & strength'),
            goal: t('AT مرة وTR مرة في الأسبوع والباقي UT2، وديدليفت وكلين ٨٠-٨٧٪.', 'One AT and one TR session per week, the rest UT2; deadlift and clean at 80-87%.'),
            components: ['threshold', 'vo2max', 'max_strength', 'aerobic'],
            loads: [7, 8, 9, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['rw_ut2', 'rw_power', 'rw_at', 'rw_ut2', 'rw_power', 'rw_tr', 'rw_cross']
          }
        ]
      },
      {
        type: 'precomp',
        goal: t('اختبار ٢٠٠٠م، شغل على إيقاع وسرعة السباق، وتجربة خطة السباق.', '2000m test, work at race rate and pace, and race-plan rehearsal.'),
        components: ['vo2max', 'anaerobic', 'threshold', 'tactics'],
        blocks: [
          {
            name: t('بلوك ٤ — اختبار ٢ كم', 'Block 4 — 2k test'),
            goal: t('اختبار ٢٠٠٠م كامل لتحديث الـsplits وخطة السباق.', 'Full 2000m test to update splits and the race plan.'),
            components: ['vo2max', 'anaerobic', 'mental'],
            loads: [4], weekTypes: ['test'],
            pattern: ['rw_ut2', 'rw_power', 'rw_ut2', '', 'rw_test_2k', 'rw_cross', '']
          },
          {
            name: t('بلوك ٥ — إيقاع السباق', 'Block 5 — Race pace'),
            goal: t('TR وقطع على سرعة السباق مرتين في الأسبوع مع الحفاظ على UT2.', 'TR and race-pace pieces twice a week while maintaining UT2.'),
            components: ['vo2max', 'anaerobic', 'tactics', 'aerobic'],
            loads: [7, 8, 5], weekTypes: ['load', 'shock', 'deload'],
            pattern: ['rw_ut2', 'rw_power', 'rw_tr', 'rw_ut2', 'rw_race_pace', 'rw_ut1', 'rw_cross']
          }
        ]
      },
      {
        type: 'comp',
        goal: t('سباقات تجريبية ورئيسية مع حجم معتدل وشدة عالية.', 'Trial and main regattas with moderate volume and high intensity.'),
        components: ['tactics', 'vo2max', 'mental'],
        blocks: [
          {
            name: t('بلوك ٦ — سباقات', 'Block 6 — Racing'),
            goal: t('سباق آخر كل أسبوع وقطعة سرعة سباق واحدة في النص.', 'A race at the end of each week and one race-pace session mid-week.'),
            components: ['tactics', 'vo2max', 'aerobic'],
            loads: [6, 5], weekTypes: ['comp', 'comp'],
            pattern: ['rw_ut2', 'rw_race_pace', 'rw_ut1', 'rw_power', 'rw_ut2', 'rw_primer', 'rw_race']
          }
        ]
      },
      {
        type: 'taper',
        goal: t('تهدئة: خفض الحجم ٤٠-٥٠٪ والحفاظ على لمسات TR وسرعة السباق.', 'Taper: cut volume 40-50% while keeping TR and race-pace touches.'),
        components: ['recovery', 'vo2max', 'mental'],
        blocks: [
          {
            name: t('بلوك ٧ — أسبوع البطولة', 'Block 7 — Championship week'),
            goal: t('قارب سريع ورجلين فريش يوم البطولة.', 'Sharp boat and fresh legs on championship day.'),
            components: ['recovery', 'tactics', 'mental'],
            loads: [3], weekTypes: ['taper'],
            pattern: ['rw_ut2', 'rw_race_pace', 'rw_ut2', '', 'rw_tr', 'rw_primer', 'rw_race']
          }
        ]
      }
    ],
    sessions: {
      rw_test_6k: {
        title: t('اختبار ٦٠٠٠م على الإرج', '6000m erg test'),
        goal: t('قياس القاعدة الهوائية وحساب الـsplits لكل منطقة تدريب.', 'Assess aerobic base and derive splits for each training band.'),
        components: ['aerobic', 'threshold', 'mental'],
        rpe: 9, duration: 60,
        items: [
          W('تسخين إرج UT2 + ٣×٢٠ ضربة بإيقاع متزايد', 'Erg UT2 warm-up + 3 x 20 strokes building rate', { duration: '15min' }),
          { kind: 'timed', libId: 'ex_rowing_machine', name: t('اختبار ٦٠٠٠م', '6000m test'), sets: 1, distance: '6000m', duration: '20-21min', time: '1:40-1:43/500m', intensity: '10', basis: 'rpe', purpose: t('قياس التحمل الهوائي', 'Measure aerobic endurance'), component: 'aerobic', note: t('إيقاع ٢٨-٣٠، ابدأ ثابت وزوّد آخر ١٠٠٠م. الأزمنة مثال لرياضي ٢ كم = ٦:١٠', 'Rate 28-30, start even and lift the last 1000m. Times are an example for a 6:10 2k athlete') },
          M('تهدئة إرج سهل + إطالات', 'Easy erg cool-down + stretching', { duration: '15min' })
        ]
      },
      rw_test_2k: {
        title: t('اختبار ٢٠٠٠م على الإرج', '2000m erg test'),
        goal: t('قياس الأداء في السباق وتحديث السرعات المستهدفة.', 'Measure race performance and update target splits.'),
        components: ['vo2max', 'anaerobic', 'mental'],
        rpe: 10, duration: 60,
        items: [
          W('تسخين إرج: ١٠ دقايق UT2 + ٢٠ دقيقة تدريجي', 'Erg warm-up: 10 min UT2 + progressive build', { duration: '20min' }),
          { kind: 'timed', libId: 'ex_rowing_machine', name: t('قطع تنشيط قبل الاختبار', 'Pre-test primers'), sets: 1, reps: '3', distance: '250m', time: '1:33-1:35/500m', intensity: '8', basis: 'rpe', rest: '2min', purpose: t('تجهيز الجسم لإيقاع السباق', 'Prime for race rate'), component: 'vo2max', note: t('إيقاع ٣٢-٣٤', 'Rate 32-34') },
          { kind: 'timed', libId: 'ex_rowing_machine', name: t('اختبار ٢٠٠٠م', '2000m test'), sets: 1, distance: '2000m', duration: '6:05-6:10', time: '1:32-1:33/500m', intensity: '10', basis: 'rpe', purpose: t('أحسن زمن ٢ كم', 'Best 2k time'), component: 'vo2max', note: t('خطة: بداية ٢٥٠م أسرع ٢-٣ث، ١٢٥٠م ثابت على الهدف، آخر ٥٠٠م زيادة. إيقاع ٣٢-٣٦', 'Plan: first 250m 2-3 s faster, steady 1250m on target, lift the last 500m. Rate 32-36') },
          M('تهدئة إرج سهل ١٠-١٥ دقيقة', 'Easy erg cool-down 10-15 min', { duration: '15min' })
        ]
      },
      rw_ut2: {
        title: t('UT2 — تحمل هوائي طويل', 'UT2 — long aerobic endurance'),
        goal: t('بناء القاعدة الهوائية وكفاءة الضربة على نبض منخفض (٦٥-٧٥٪ من أقصى نبض).', 'Build aerobic base and stroke efficiency at low heart rate (65-75% HRmax).'),
        components: ['aerobic', 'technique'],
        rpe: 4, duration: 90,
        items: [
          W('تجديف سهل + تمارين تكنيك (بيك دريل، أذرع فقط، أذرع وجسم)', 'Easy paddle + technique drills (pick drill, arms only, arms and body)', { duration: '10min' }),
          { kind: 'timed', libId: 'ex_rowing_machine', name: t('UT2 متواصل (مية أو إرج)', 'Continuous UT2 (water or erg)'), sets: 1, duration: '60-80min', time: '1:55-2:00/500m', intensity: 'Z2', basis: 'hr', purpose: t('قاعدة هوائية وكفاءة', 'Aerobic base and efficiency'), component: 'aerobic', note: t('إيقاع ١٨-٢٠. السرعة = سرعة ٢ كم + ٢٢-٢٨ث/٥٠٠م', 'Rate 18-20. Split = 2k split + 22-28 s/500m') },
          { kind: 'drill', name: t('ضربات بتركيز تكنيكي كل ١٠ دقايق', 'Technical focus strokes every 10 min'), sets: 1, reps: '6', duration: '1min', purpose: t('تحسين التوقيت والمسكة والدفع بالرجل', 'Improve timing, catch and leg drive'), component: 'technique' },
          ml('ex_hamstring_stretch', { sets: 2, duration: '40s' })
        ]
      },
      rw_ut1: {
        title: t('UT1 — تحمل هوائي متوسط', 'UT1 — moderate aerobic endurance'),
        goal: t('رفع القدرة الهوائية بشدة أعلى من UT2 (٧٥-٨٥٪ من أقصى نبض).', 'Develop aerobic power above UT2 (75-85% HRmax).'),
        components: ['aerobic', 'threshold'],
        rpe: 6, duration: 90,
        items: [
          W('تسخين UT2 + ٣×١ دقيقة بإيقاع ٢٤', 'UT2 warm-up + 3 x 1 min at rate 24', { duration: '15min' }),
          { kind: 'timed', libId: 'ex_rowing_machine', name: t('قطع UT1', 'UT1 pieces'), sets: 1, reps: '3', duration: '20min', time: '1:47-1:51/500m', intensity: 'Z3', basis: 'hr', rest: '3min', purpose: t('قدرة هوائية', 'Aerobic power'), component: 'aerobic', note: t('إيقاع ٢٠-٢٢-٢٤ (زوّد الإيقاع مع كل قطعة). سرعة ٢ كم + ١٤-١٨ث', 'Rate 20-22-24 (step rate each piece). 2k split + 14-18 s') },
          M('تهدئة سهلة + إطالات', 'Easy cool-down + stretching', { duration: '12min' })
        ]
      },
      rw_at: {
        title: t('AT — عتبة لاهوائية', 'AT — anaerobic threshold'),
        goal: t('رفع العتبة اللاهوائية عشان السرعة المستدامة في وسط السباق تطلع (٨٥-٩٠٪ من أقصى نبض).', 'Raise anaerobic threshold so the sustainable mid-race speed increases (85-90% HRmax).'),
        components: ['threshold', 'aerobic'],
        rpe: 8, duration: 80,
        items: [
          W('تسخين UT2 + ٣ قطع ٢٥٠م تدريجي', 'UT2 warm-up + 3 x 250m progressive', { duration: '15min' }),
          { kind: 'timed', libId: 'ex_rowing_machine', name: t('قطع AT', 'AT pieces'), sets: 1, reps: '3', duration: '12min', time: '1:41-1:44/500m', intensity: 'Z4', basis: 'hr', rest: '4min', purpose: t('رفع العتبة', 'Raise threshold'), component: 'threshold', note: t('إيقاع ٢٤-٢٦. سرعة ٢ كم + ٨-١١ث. بديل: ٤×٢٠٠٠م راحة ٥ دقايق', 'Rate 24-26. 2k split + 8-11 s. Alternative: 4 x 2000m, 5 min rest') },
          { kind: 'timed', libId: 'ex_rowing_machine', name: t('UT2 سهل بعد القطع', 'Easy UT2 after the pieces'), sets: 1, duration: '15min', intensity: 'Z2', basis: 'hr', purpose: t('استشفاء نشط وحجم هوائي', 'Active recovery and aerobic volume'), component: 'aerobic' },
          M('تهدئة وإطالات', 'Cool-down and stretching', { duration: '10min' })
        ]
      },
      rw_tr: {
        title: t('TR — تدريب على إيقاع السباق', 'TR — transport / race-rate training'),
        goal: t('رفع الـVO2max وتحمل اللاكتيك على إيقاع السباق (٩٠-١٠٠٪ من أقصى نبض).', 'Develop VO2max and lactate tolerance at race rate (90-100% HRmax).'),
        components: ['vo2max', 'anaerobic', 'technique'],
        rpe: 9, duration: 80,
        items: [
          W('تسخين UT2 + ٣×٢٠ ضربة إيقاع ٢٨-٣٢-٣٦', 'UT2 warm-up + 3 x 20 strokes at rate 28-32-36', { duration: '20min' }),
          { kind: 'timed', libId: 'dr_rower_intervals', name: t('٨×٥٠٠م على سرعة السباق', '8 x 500m at race pace'), sets: 1, reps: '8', distance: '500m', time: '1:31-1:34/500m', intensity: 'Z5', basis: 'hr', rest: '3:30', purpose: t('رفع الـVO2max على إيقاع السباق', 'Develop VO2max at race rate'), component: 'vo2max', note: t('إيقاع ٣٢-٣٤. في أسبوع البطولة: ٤ قطع بس', 'Rate 32-34. Championship week: only 4 reps') },
          { kind: 'drill', name: t('بدايات سباق (٥ قصيرة + ١٥ عالي + ضبط)', 'Race starts (5 short + 15 high + settle)'), sets: 1, reps: '4', duration: '40s', purpose: t('تنفيذ بداية السباق والانتقال للإيقاع الثابت', 'Execute race start and settle into rhythm'), component: 'technique' },
          M('تهدئة UT2 سهلة', 'Easy UT2 cool-down', { duration: '15min' })
        ]
      },
      rw_race_pace: {
        title: t('قطع على سرعة السباق', 'Race-pace pieces'),
        goal: t('تثبيت سرعة السباق المستهدفة وتقسيم الـ٢ كم ذهنيًا.', 'Lock in target race pace and mentally segment the 2k.'),
        components: ['vo2max', 'anaerobic', 'tactics'],
        rpe: 9, duration: 75,
        items: [
          W('تسخين UT2 + بدايات قصيرة', 'UT2 warm-up + short starts', { duration: '20min' }),
          { kind: 'timed', libId: 'ex_rowing_machine', name: t('٣×٧٥٠م على سرعة السباق المستهدفة', '3 x 750m at target race pace'), sets: 1, reps: '3', distance: '750m', time: '1:32/500m', intensity: '100', basis: 'best', rest: '6min', purpose: t('إحساس السرعة المستهدفة تحت تعب', 'Feel the target split under fatigue'), component: 'anaerobic', note: t('إيقاع ٣٤-٣٦، القطعة الأولى تبدأ ببداية سباق', 'Rate 34-36, first piece begins with a race start') },
          { kind: 'timed', libId: 'ex_rowing_machine', name: t('٢٥٠م سبرنت نهاية', '250m finishing sprints'), sets: 1, reps: '2', distance: '250m', time: '1:28-1:30/500m', intensity: '10', basis: 'rpe', rest: '4min', purpose: t('قوة النهاية', 'Finishing power'), component: 'anaerobic', note: t('إيقاع ٣٨+', 'Rate 38+') },
          M('تهدئة UT2 سهلة', 'Easy UT2 cool-down', { duration: '15min' })
        ]
      },
      rw_strength: {
        title: t('قوة وتحمل عضلي', 'Strength & muscular endurance'),
        goal: t('قوة عامة للرجلين والظهر والسحب مع تحمل عضلي عالي التكرار.', 'General leg, back and pulling strength with high-rep muscular endurance.'),
        components: ['strength', 'muscular_endurance', 'core'],
        rpe: 7, duration: 80,
        items: [
          ...gymWU(),
          { kind: 'strength', libId: 'ex_deadlift', sets: 4, reps: '6', intensity: '75', basis: '1rm', tempo: '2-0-1-0', rest: '3min', purpose: t('قوة الرجلين والظهر للدفعة', 'Leg and back strength for the drive'), component: 'strength' },
          { kind: 'strength', libId: 'ex_front_squat', sets: 4, reps: '6', intensity: '72-75', basis: '1rm', tempo: '3-0-1-0', rest: '3min', purpose: t('قوة الرجلين بوضع جذع مستقيم', 'Leg strength with an upright torso'), component: 'strength' },
          { kind: 'strength', libId: 'ex_bent_over_row', sets: 4, reps: '8', intensity: '2', basis: 'rir', tempo: '1-1-2-0', rest: '2min', purpose: t('قوة السحب (بديل البنش بول)', 'Pulling strength (bench-pull substitute)'), component: 'strength' },
          { kind: 'strength', libId: 'ex_barbell_bench_press', sets: 3, reps: '8', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '2min', purpose: t('توازن الدفع والسحب وحماية الضلوع', 'Push-pull balance and rib protection'), component: 'prevention' },
          { kind: 'strength', libId: 'ex_walking_lunge', sets: 3, reps: '20', intensity: '6', basis: 'rpe', rest: '90s', purpose: t('تحمل عضلي للرجلين', 'Leg muscular endurance'), component: 'muscular_endurance' },
          { kind: 'strength', libId: 'ex_side_plank', sets: 3, reps: '45s/side', intensity: '7', basis: 'rpe', rest: '45s', purpose: t('ثبات الجذع ووقاية أسفل الظهر', 'Trunk stability and lower-back protection'), component: 'core' },
          ...gymCD()
        ]
      },
      rw_power: {
        title: t('قوة قصوى وقدرة', 'Max strength & power'),
        goal: t('قوة قصوى وسرعة إنتاج القوة لمرحلة الدفعة بالرجلين.', 'Max strength and rate of force development for the leg drive.'),
        components: ['max_strength', 'power', 'core'],
        rpe: 8, duration: 75,
        items: [
          ...gymWU(),
          { kind: 'strength', libId: 'ad_power_clean', sets: 4, reps: '3', intensity: '75-80', basis: '1rm', rest: '2min', purpose: t('قدرة الامتداد الثلاثي زي الدفعة', 'Triple-extension power like the drive'), component: 'power' },
          { kind: 'strength', libId: 'ex_deadlift', sets: 4, reps: '3', intensity: '85-87', basis: '1rm', tempo: '2-0-X-0', rest: '3min', purpose: t('قوة قصوى', 'Maximal strength'), component: 'max_strength', note: t('فترة السباقات: ٣×٢ على ٨٥٪ للحفاظ', 'Racing phase: 3x2 at 85% for maintenance') },
          { kind: 'strength', libId: 'ex_bent_over_row', sets: 4, reps: '5', intensity: '80', basis: '1rm', tempo: '1-0-X-1', rest: '2min', purpose: t('سحب قوي وسريع', 'Strong, fast pull'), component: 'max_strength' },
          { kind: 'strength', libId: 'ad_trap_bar_jump', sets: 3, reps: '4', intensity: '30', basis: '1rm', rest: '2min', purpose: t('قدرة بسرعة عالية', 'High-velocity power'), component: 'power' },
          { kind: 'strength', libId: 'ex_ab_wheel_rollout', sets: 3, reps: '8', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '60s', purpose: t('ثبات الجذع ضد التقوس', 'Anti-extension trunk strength'), component: 'core' },
          ...gymCD()
        ]
      },
      rw_cross: {
        title: t('تدريب تبادلي UT2 (دراجة أو جري)', 'Cross-training UT2 (bike or run)'),
        goal: t('حجم هوائي إضافي بدون ضغط على الضهر والضلوع.', 'Extra aerobic volume without loading the back and ribs.'),
        components: ['aerobic', 'recovery', 'mobility'],
        rpe: 4, duration: 75,
        items: [
          W('بداية سهلة', 'Easy start', { duration: '10min' }),
          { kind: 'timed', libId: 'ex_stationary_bike', sets: 1, duration: '50min', intensity: 'Z2', basis: 'hr', purpose: t('حجم هوائي وتنشيط الدورة الدموية', 'Aerobic volume and circulation'), component: 'aerobic', note: t('ممكن جري ٤٠ دقيقة زون ٢ بدل الدراجة', 'Can be replaced by a 40-minute Zone 2 run') },
          ml('ad_foam_roller_thoracic_extension', { sets: 1, duration: '3min' }),
          ml('ad_pigeon_stretch', { sets: 2, duration: '45s' })
        ]
      },
      rw_primer: {
        title: t('تنشيط قبل السباق', 'Pre-race primer'),
        goal: t('قارب سريع ورجلين فريش قبل السباق بيوم.', 'Sharp boat and fresh legs the day before the race.'),
        components: ['technique', 'vo2max', 'mental'],
        rpe: 4, duration: 50,
        items: [
          W('تجديف UT2 سهل', 'Easy UT2 paddle', { duration: '20min' }),
          { kind: 'drill', name: t('بدايات سباق قصيرة', 'Short race starts'), sets: 1, reps: '3', duration: '15s', purpose: t('تأكيد البداية', 'Confirm the start sequence'), component: 'technique' },
          { kind: 'timed', libId: 'ex_rowing_machine', name: t('قطع على سرعة السباق', 'Race-pace bursts'), sets: 1, reps: '2', distance: '250m', time: '1:32/500m', intensity: '8', basis: 'rpe', rest: '4min', purpose: t('إحساس السرعة بدون تعب', 'Feel race speed without fatigue'), component: 'vo2max' },
          M('تهدئة سهلة', 'Easy cool-down', { duration: '10min' })
        ]
      },
      rw_race: {
        title: t('يوم السباق ٢٠٠٠م', '2000m race day'),
        goal: t('تنفيذ خطة السباق: بداية قوية، ضبط الإيقاع، هجوم في النص، ونهاية قوية.', 'Execute the race plan: strong start, settle, mid-race move and strong finish.'),
        components: ['tactics', 'vo2max', 'mental'],
        rpe: 10, duration: 90,
        items: [
          W('إحماء على المية: ٢٠ دقيقة UT2 + ٢ بداية + ٢×٢٠ ضربة على سرعة السباق', 'On-water warm-up: 20 min UT2 + 2 starts + 2 x 20 strokes at race pace', { duration: '30min' }),
          { kind: 'timed', name: t('سباق ٢٠٠٠م', '2000m race'), sets: 1, distance: '2000m', duration: '6:05-6:10', time: '1:32/500m', intensity: '100', basis: 'best', purpose: t('أحسن زمن ممكن', 'Best possible time'), component: 'tactics', note: t('بداية ٤٠-٤٤، ضبط ٣٤-٣٦، هجوم عند ١٠٠٠م، نهاية ٣٨+ آخر ٢٥٠م', 'Start 40-44, settle 34-36, move at 1000m, finish 38+ in the last 250m') },
          M('تهدئة UT2 سهلة', 'Easy UT2 cool-down', { duration: '20min' })
        ]
      }
    }
  },
  /* ============================ ٧) ترايثلون أولمبي — متوسط ============================ */
  {
    id: 'pt_triathlon_olympic_int',
    sport: 'triathlon',
    level: 'intermediate',
    title: t('ترايثلون أولمبي — متوسط (١٦ أسبوع)', 'Olympic triathlon — intermediate (16 weeks)'),
    goal: t('إنهاء سباق أولمبي (١.٥ كم سباحة، ٤٠ كم دراجة، ١٠ كم جري) بأحسن زمن عن طريق رفع الـCSS والـFTP وسرعة الجري عند العتبة، والتعود على الانتقال من الدراجة للجري.', 'Finish an Olympic-distance race (1.5 km swim, 40 km bike, 10 km run) in the best time by raising CSS, FTP and threshold run pace, and adapting to the bike-to-run transition.'),
    components: ['aerobic', 'threshold', 'vo2max', 'technique', 'muscular_endurance'],
    sessionsPerWeek: 6,
    periods: [
      {
        type: 'gpp',
        goal: t('قاعدة هوائية في الـ٣ رياضات، تكنيك سباحة، وقوة عامة لمنع الإصابات.', 'Aerobic base in all three sports, swim technique and general strength for injury prevention.'),
        components: ['aerobic', 'technique', 'strength', 'prevention'],
        blocks: [
          {
            name: t('بلوك ١ — اختبارات ودخول', 'Block 1 — Testing & entry'),
            goal: t('اختبار CSS (٤٠٠م + ٢٠٠م)، FTP ٢٠ دقيقة، واختبار ٥ كم جري لتحديد المناطق.', 'CSS test (400m + 200m), 20-minute FTP and 5 km run test to set zones.'),
            components: ['threshold', 'aerobic'],
            loads: [4], weekTypes: ['test'],
            pattern: ['', 'tri_test_swim', 'tri_run_easy_str', 'tri_test_bike', 'tri_swim_tech', 'tri_test_run', 'tri_bike_long']
          },
          {
            name: t('بلوك ٢ — قاعدة هوائية', 'Block 2 — Aerobic base'),
            goal: t('زيادة الحجم الأسبوعي ٨-١٠٪، سباحة تكنيك، سويت سبوت، وجري طويل زون ٢.', 'Grow weekly volume 8-10%, technique swimming, sweet spot and Zone 2 long runs.'),
            components: ['aerobic', 'technique', 'muscular_endurance', 'strength'],
            loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['', 'tri_swim_tech', 'tri_bike_int', 'tri_run_easy_str', 'tri_swim_css', 'tri_bike_long', 'tri_run_long']
          }
        ]
      },
      {
        type: 'spp',
        goal: t('بناء: فترات عتبة في الـ٣ رياضات وتمرينات بريك (دراجة + جري).', 'Build: threshold intervals in all three sports and brick sessions (bike + run).'),
        components: ['threshold', 'vo2max', 'muscular_endurance', 'aerobic'],
        blocks: [
          {
            name: t('بلوك ٣ — عتبة وبريك', 'Block 3 — Threshold & bricks'),
            goal: t('CSS مرة، جري فترات مرة، ودراجة عتبة مرة، وبريك أسبوعي.', 'One CSS swim, one run interval session, one bike threshold session and a weekly brick.'),
            components: ['threshold', 'vo2max', 'muscular_endurance'],
            loads: [6, 7, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['', 'tri_swim_css', 'tri_bike_int', 'tri_run_int', 'tri_swim_tech', 'tri_brick', 'tri_run_long']
          }
        ]
      },
      {
        type: 'precomp',
        goal: t('تخصص السباق: إيقاع السباق، سباحة مياه مفتوحة، وبريك على سرعة السباق.', 'Race specificity: race pace, open-water swimming and race-pace bricks.'),
        components: ['threshold', 'tactics', 'muscular_endurance', 'mental'],
        blocks: [
          {
            name: t('بلوك ٤ — إعادة اختبار', 'Block 4 — Retest'),
            goal: t('إعادة الاختبارات وتحديث المناطق وسرعات السباق.', 'Repeat tests and update zones and race paces.'),
            components: ['threshold', 'recovery'],
            loads: [4], weekTypes: ['test'],
            pattern: ['', 'tri_test_swim', 'tri_run_easy_str', 'tri_test_bike', 'tri_swim_tech', 'tri_test_run', '']
          },
          {
            name: t('بلوك ٥ — إيقاع السباق', 'Block 5 — Race pace'),
            goal: t('بريك على سرعة السباق، سباحة مفتوحة بتوجيه النظر، وجري على سرعة ١٠ كم.', 'Race-pace bricks, open-water swimming with sighting and 10 km pace running.'),
            components: ['threshold', 'tactics', 'muscular_endurance'],
            loads: [7, 8, 8, 4], weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['', 'tri_swim_css', 'tri_bike_int', 'tri_run_int', 'tri_open_water', 'tri_brick', 'tri_run_long']
          }
        ]
      },
      {
        type: 'taper',
        goal: t('تهدئة: خفض الحجم ٣٠-٥٠٪ مع الحفاظ على الشدة للوصول فريش يوم السباق.', 'Taper: cut volume 30-50% while keeping intensity to arrive fresh on race day.'),
        components: ['recovery', 'threshold', 'mental'],
        blocks: [
          {
            name: t('بلوك ٦ — تهدئة', 'Block 6 — Taper'),
            goal: t('نص عدد الفترات بنفس الشدة، وبريك قصير.', 'Half the intervals at the same intensity, and a short brick.'),
            components: ['recovery', 'threshold'],
            loads: [5], weekTypes: ['taper'],
            pattern: ['', 'tri_swim_css', 'tri_bike_int', 'tri_run_easy_str', 'tri_open_water', 'tri_brick', 'tri_run_easy_str']
          },
          {
            name: t('بلوك ٧ — أسبوع السباق', 'Block 7 — Race week'),
            goal: t('لمسات قصيرة على سرعة السباق وتنشيط قبل السباق بيوم.', 'Short race-pace touches and an opener the day before.'),
            components: ['recovery', 'tactics', 'mental'],
            loads: [3], weekTypes: ['comp'],
            pattern: ['', 'tri_swim_tech', 'tri_run_easy_str', 'tri_bike_int', '', 'tri_opener', 'tri_race']
          }
        ]
      }
    ],
    sessions: {
      tri_test_swim: {
        title: t('اختبار CSS (٤٠٠م + ٢٠٠م)', 'CSS test (400m + 200m)'),
        goal: t('حساب سرعة السباحة الحرجة: CSS = (٤٠٠ - ٢٠٠) ÷ (زمن ٤٠٠ - زمن ٢٠٠).', 'Calculate critical swim speed: CSS = (400 - 200) / (T400 - T200).'),
        components: ['threshold', 'technique'],
        rpe: 8, duration: 60,
        items: [
          { kind: 'warmup', libId: 'ad_easy_freestyle_swim', distance: '400m', note: t('سهل + ٤×٥٠م تكنيك', 'Easy + 4 x 50m drills') },
          { kind: 'swim', name: t('٤×٥٠م تدريجي', '4 x 50m build'), sets: 1, reps: '4', distance: '50m', stroke: 'free', intensity: '6-8', basis: 'rpe', rest: '15s', purpose: t('تجهيز للاختبار', 'Prepare for the test'), component: 'technique' },
          { kind: 'swim', name: t('اختبار ٤٠٠م', '400m time trial'), sets: 1, distance: '400m', stroke: 'free', time: '7:20', intensity: '10', basis: 'rpe', rest: '5min', purpose: t('الزمن الأول لحساب CSS', 'First time for the CSS calculation'), component: 'threshold', note: t('الزمن مثال؛ سجّل زمنك الحقيقي', 'Time is an example; record your actual time') },
          { kind: 'swim', name: t('اختبار ٢٠٠م', '200m time trial'), sets: 1, distance: '200m', stroke: 'free', time: '3:30', intensity: '10', basis: 'rpe', rest: '3min', purpose: t('الزمن التاني لحساب CSS', 'Second time for the CSS calculation'), component: 'threshold' },
          M('سباحة سهلة للتهدئة ٢٠٠م', 'Easy swim-down 200m', { duration: '6min' })
        ]
      },
      tri_test_bike: {
        title: t('اختبار FTP دراجة (٢٠ دقيقة)', 'Bike FTP test (20 minutes)'),
        goal: t('FTP = ٩٥٪ من متوسط وات الـ٢٠ دقيقة، ونبض العتبة = متوسط النبض.', 'FTP = 95% of 20-minute average power; LTHR = average heart rate.'),
        components: ['threshold'],
        rpe: 9, duration: 60,
        items: [
          W('تسخين تدريجي على الترينر', 'Progressive warm-up on the trainer', { duration: '15min' }),
          { kind: 'timed', name: t('مجهود تفريغ ٥ دقايق', '5-minute blow-out effort'), sets: 1, duration: '5min', intensity: '9', basis: 'rpe', rest: '10min', purpose: t('تفريغ الطاقة اللاهوائية', 'Deplete anaerobic capacity'), component: 'vo2max' },
          { kind: 'timed', name: t('اختبار ٢٠ دقيقة', '20-minute test'), sets: 1, duration: '20min', intensity: '10', basis: 'rpe', purpose: t('تحديد الـFTP', 'Determine FTP'), component: 'threshold', note: t('ابدأ متحفظ وزوّد آخر ٥ دقايق', 'Start conservatively and lift in the final 5 min') },
          M('تهدئة سهلة', 'Easy cool-down', { duration: '10min' })
        ]
      },
      tri_test_run: {
        title: t('اختبار ٥ كم جري', '5 km run test'),
        goal: t('تحديد سرعة العتبة (≈ سرعة ٥ كم + ١٥-٢٠ث/كم) ومناطق النبض.', 'Set threshold pace (about 5k pace + 15-20 s/km) and heart-rate zones.'),
        components: ['threshold', 'vo2max'],
        rpe: 9, duration: 60,
        items: [
          W('جري خفيف + حركات ديناميكية', 'Easy jog + dynamic drills', { duration: '15min' }),
          wl('ad_strides', { sets: 1, reps: '4', distance: '80m' }),
          { kind: 'run', name: t('اختبار ٥ كم على مضمار أو طريق مستوي', '5 km time trial on track or flat road'), sets: 1, distance: '5km', duration: '23min', time: '23:00', intensity: '10', basis: 'rpe', purpose: t('تحديد سرعات الجري', 'Set run paces'), component: 'threshold', note: t('الزمن مثال لرياضي ١٠ كم في ٤٨ دقيقة', 'Example time for a 48-minute 10 km athlete') },
          M('جري خفيف للتهدئة + إطالات', 'Easy cool-down jog + stretching', { duration: '12min' })
        ]
      },
      tri_swim_tech: {
        title: t('سباحة تكنيك وتحمل هوائي', 'Swim technique & aerobic'),
        goal: t('تحسين كفاءة الضربة (المسكة، وضع الجسم، التنفس الثنائي) مع حجم هوائي.', 'Improve stroke efficiency (catch, body position, bilateral breathing) with aerobic volume.'),
        components: ['technique', 'aerobic'],
        rpe: 5, duration: 60,
        items: [
          { kind: 'warmup', libId: 'ad_easy_freestyle_swim', distance: '300m' },
          { kind: 'swim', name: t('تكنيك: كاتش أب، ٦ رفسات تبديل، سحب الصوابع', 'Drills: catch-up, 6-kick switch, fingertip drag'), sets: 1, reps: '8', distance: '50m', stroke: 'drill', intensity: '4', basis: 'rpe', rest: '15s', purpose: t('تحسين المسكة ووضع الجسم', 'Improve catch and body position'), component: 'technique' },
          { kind: 'swim', name: t('سحب بالعوامة ودراعات (بول)', 'Pull with buoy'), sets: 1, reps: '4', distance: '100m', stroke: 'pull', intensity: 'CSS+8s/100m', basis: 'css', rest: '20s', purpose: t('قوة السحب وتنفس كل ٣ ضربات', 'Pull strength and breathing every 3 strokes'), component: 'technique' },
          { kind: 'swim', name: t('سباحة هوائية ثابتة', 'Steady aerobic swim'), sets: 1, reps: '6', distance: '100m', stroke: 'free', time: '1:55-2:00', intensity: 'CSS+5s/100m', basis: 'css', rest: '15s', purpose: t('قاعدة هوائية بتكنيك سليم', 'Aerobic base with sound technique'), component: 'aerobic' },
          { kind: 'swim', name: t('رفسات بالبورد', 'Kick with board'), sets: 1, reps: '4', distance: '50m', stroke: 'kick', intensity: '6', basis: 'rpe', rest: '20s', purpose: t('رفسة من الحوض بدون ما الرجلين تنزل', 'Kick from the hips without legs sinking'), component: 'technique' },
          M('سباحة سهلة للتهدئة ١٠٠م', 'Easy swim-down 100m', { duration: '4min' })
        ]
      },
      tri_swim_css: {
        title: t('سباحة CSS (عتبة)', 'CSS swim (threshold)'),
        goal: t('رفع سرعة العتبة في السباحة والقدرة على الحفاظ عليها ١٥٠٠م.', 'Raise threshold swim speed and the ability to hold it for 1500m.'),
        components: ['threshold', 'aerobic'],
        rpe: 7, duration: 65,
        items: [
          { kind: 'warmup', libId: 'ad_easy_freestyle_swim', distance: '400m', note: t('٢٠٠ سهل + ٤×٥٠ تكنيك', '200 easy + 4 x 50 drills') },
          { kind: 'swim', name: t('٤×٥٠م تدريجي', '4 x 50m build'), sets: 1, reps: '4', distance: '50m', stroke: 'free', intensity: '6-8', basis: 'rpe', rest: '15s', purpose: t('تجهيز للسرعة', 'Prepare for pace'), component: 'technique' },
          { kind: 'swim', name: t('فترات CSS', 'CSS intervals'), sets: 1, reps: '10-15', distance: '100m', stroke: 'free', time: '1:50', intensity: 'CSS', basis: 'css', rest: '15s', purpose: t('رفع سرعة العتبة', 'Raise threshold speed'), component: 'threshold', note: t('ابدأ ١٠ وزوّد لحد ١٥. بديل: ٣×٤٠٠م على CSS+٢ث راحة ٣٠ث', 'Start with 10, build to 15. Alternative: 3 x 400m at CSS+2 s, 30 s rest') },
          { kind: 'swim', name: t('سرعة قصيرة', 'Short speed'), sets: 1, reps: '4', distance: '25m', stroke: 'free', intensity: '9', basis: 'rpe', rest: '30s', purpose: t('سرعة البداية وتجاوز الزحام في السباق', 'Start speed and breaking away in the race'), component: 'vo2max' },
          M('سباحة سهلة للتهدئة ٢٠٠م', 'Easy swim-down 200m', { duration: '6min' })
        ]
      },
      tri_open_water: {
        title: t('سباحة مياه مفتوحة', 'Open-water swim'),
        goal: t('التوجيه والنظر لقدام، السباحة جنب لاعبين، والتعامل مع البدلة والأمواج.', 'Sighting, swimming in a group and handling wetsuit and chop.'),
        components: ['technique', 'tactics', 'aerobic'],
        rpe: 6, duration: 60,
        items: [
          { kind: 'warmup', libId: 'ad_easy_freestyle_swim', distance: '300m' },
          { kind: 'swim', name: t('سباحة بالنظر لقدام كل ٦ ضربات', 'Sighting every 6 strokes'), sets: 1, reps: '6', distance: '100m', stroke: 'free', intensity: 'CSS+3s/100m', basis: 'css', rest: '20s', purpose: t('توجيه بدون فقد السرعة', 'Sighting without losing speed'), component: 'technique' },
          { kind: 'swim', name: t('بداية سباق + ٢٠٠م سريع ثم ضبط الإيقاع', 'Race start + fast 200m then settle'), sets: 1, reps: '3', distance: '400m', stroke: 'free', intensity: 'CSS', basis: 'css', rest: '2min', purpose: t('محاكاة بداية السباق والاستقرار', 'Simulate the race start and settling'), component: 'tactics' },
          { kind: 'swim', name: t('سباحة متواصلة بسرعة السباق', 'Continuous swim at race pace'), sets: 1, distance: '1000m', duration: '19-20min', stroke: 'free', intensity: 'CSS+3s/100m', basis: 'css', purpose: t('ثبات الإيقاع في المية المفتوحة', 'Pace consistency in open water'), component: 'aerobic', note: t('دايمًا مع زميل أو في منطقة فيها إنقاذ', 'Always with a partner or in a lifeguarded area') },
          M('سباحة سهلة', 'Easy swim-down', { duration: '5min' })
        ]
      },
      tri_bike_int: {
        title: t('دراجة فترات (سويت سبوت / عتبة)', 'Bike intervals (sweet spot / threshold)'),
        goal: t('رفع الـFTP والقدرة على الحفاظ على وات السباق ٤٠ كم.', 'Raise FTP and the ability to hold race power for 40 km.'),
        components: ['threshold', 'muscular_endurance'],
        rpe: 7, duration: 75,
        items: [
          W('تسخين تدريجي + ٣×٣٠ث تدوير سريع', 'Progressive warm-up + 3 x 30 s high cadence', { duration: '15min' }),
          { kind: 'timed', name: t('فترات سويت سبوت / عتبة', 'Sweet spot / threshold intervals'), sets: 1, reps: '3', duration: '10-15min', intensity: '88-95% FTP', basis: 'watts', rest: '5min', purpose: t('رفع العتبة', 'Raise threshold'), component: 'threshold', note: t('القاعدة: ٣×١٠ سويت سبوت. البناء: ٣×١٢ على ٩٥-١٠٠٪. تخصص السباق: ٢×٢٠ على وات السباق (٩٠-٩٥٪). أسبوع السباق: ٣×٣ دقايق بس', 'Base: 3x10 sweet spot. Build: 3x12 at 95-100%. Race-specific: 2x20 at race power (90-95%). Race week: 3 x 3 min only') },
          { kind: 'timed', libId: 'ad_steady_state_bike_ride', sets: 1, duration: '15min', intensity: 'Z2', basis: 'hr', purpose: t('حجم هوائي', 'Aerobic volume'), component: 'aerobic' },
          M('تهدئة سهلة', 'Easy cool-down', { duration: '10min' })
        ]
      },
      tri_bike_long: {
        title: t('دراجة طويلة زون ٢', 'Long Zone 2 ride'),
        goal: t('قاعدة هوائية وتحمل عضلي وتجربة التغذية على الدراجة.', 'Aerobic base, muscular endurance and on-bike fuelling practice.'),
        components: ['aerobic', 'muscular_endurance'],
        rpe: 5, duration: 150,
        items: [
          W('بداية سهلة', 'Easy start', { duration: '15min' }),
          { kind: 'timed', libId: 'wg_cycling', name: t('ركوب طويل زون ٢', 'Zone 2 long ride'), sets: 1, duration: '90-120min', intensity: 'Z2', basis: 'hr', purpose: t('تحمل هوائي', 'Aerobic endurance'), component: 'aerobic', note: t('٦٠-٧٥٪ FTP، تدوير ٨٥-٩٥، ٦٠ جم كربوهيدرات في الساعة', '60-75% FTP, cadence 85-95, 60 g carbs per hour') },
          { kind: 'timed', name: t('وضع الإيرو على إيقاع السباق', 'Aero position at race effort'), sets: 1, reps: '3', duration: '8min', intensity: '85-90% FTP', basis: 'watts', rest: '5min', purpose: t('تعوّد الجسم على الوضع الإيرو بوات السباق', 'Adapt to the aero position at race power'), component: 'muscular_endurance' },
          M('تهدئة + إطالات الحوض', 'Cool-down + hip stretching', { duration: '10min' })
        ]
      },
      tri_run_easy_str: {
        title: t('جري سهل + قوة ووقاية', 'Easy run + strength & prevention'),
        goal: t('حجم جري هوائي بدون ضغط، وقوة للرجلين والجذع لمنع إصابات الجري.', 'Low-stress aerobic run volume plus leg and trunk strength to prevent running injuries.'),
        components: ['aerobic', 'strength', 'prevention'],
        rpe: 5, duration: 75,
        items: [
          W('مشي سريع ثم جري خفيف', 'Brisk walk into easy jog', { duration: '5min' }),
          { kind: 'run', libId: 'wg_running', name: t('جري سهل زون ٢', 'Easy Zone 2 run'), sets: 1, duration: '35-45min', intensity: 'Z2', basis: 'hr', purpose: t('قاعدة هوائية للجري', 'Aerobic running base'), component: 'aerobic', note: t('في أسبوع السباق: ٢٥ دقيقة + ٤ ستريدز', 'Race week: 25 min + 4 strides') },
          { kind: 'run', libId: 'ad_strides', sets: 1, reps: '4', distance: '80m', intensity: '85', basis: 'vmax', rest: '60s', restType: 'walk', purpose: t('كفاءة الخطوة وسرعة الرجل', 'Stride efficiency and leg speed'), component: 'speed' },
          { kind: 'strength', libId: 'ex_bulgarian_split_squat', sets: 3, reps: '8/leg', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '60s', purpose: t('قوة الرجل الواحدة', 'Single-leg strength'), component: 'strength' },
          { kind: 'strength', libId: 'wg_single_leg_calf_raise', sets: 3, reps: '15/leg', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '45s', purpose: t('وقاية وتر أكيليس والسمانة', 'Achilles and calf protection'), component: 'prevention' },
          { kind: 'strength', libId: 'wg_banded_lateral_walk', sets: 2, reps: '12/side', intensity: '7', basis: 'rpe', rest: '30s', purpose: t('قوة الحوض الجانبية لثبات الركبة', 'Hip abductor strength for knee control'), component: 'prevention' },
          { kind: 'strength', libId: 'ex_face_pull', sets: 2, reps: '15', intensity: '2', basis: 'rir', tempo: '2-1-2-0', rest: '45s', purpose: t('صحة الكتف للسباحة', 'Shoulder health for swimming'), component: 'prevention' },
          ml('ex_calf_stretch', { sets: 2, duration: '40s' })
        ]
      },
      tri_run_int: {
        title: t('جري فترات (عتبة / سرعة ١٠ كم)', 'Run intervals (threshold / 10 km pace)'),
        goal: t('رفع سرعة العتبة في الجري وتحمل سرعة الـ١٠ كم.', 'Raise threshold run pace and tolerance of 10 km pace.'),
        components: ['threshold', 'vo2max'],
        rpe: 8, duration: 70,
        items: [
          W('جري خفيف + حركات ديناميكية', 'Easy jog + dynamic drills', { duration: '15min' }),
          wl('ad_a_skip', { sets: 2, distance: '20m' }),
          { kind: 'run', libId: 'ex_interval_running', name: t('فترات ١ كم على سرعة العتبة', '1 km repeats at threshold pace'), sets: 1, reps: '5-6', distance: '1000m', time: '4:40-4:45', intensity: '4:40-4:45/km', basis: 'pace', rest: '90s', restType: 'jog', purpose: t('رفع سرعة العتبة', 'Raise threshold pace'), component: 'threshold', note: t('سرعة ١٠ كم - ٥ث/كم تقريبًا. تخصص السباق: ٣×٢ كم على سرعة ١٠ كم راحة ٢ دقيقة', 'About 10 km pace - 5 s/km. Race-specific: 3 x 2 km at 10 km pace, 2 min rest') },
          { kind: 'run', name: t('٤٠٠م سريع', '400m fast'), sets: 1, reps: '4', distance: '400m', time: '1:45', intensity: '4:20/km', basis: 'pace', rest: '90s', restType: 'jog', purpose: t('VO2max وسرعة نهاية السباق', 'VO2max and finishing speed'), component: 'vo2max' },
          M('جري خفيف للتهدئة + إطالات', 'Easy cool-down jog + stretching', { duration: '10min' })
        ]
      },
      tri_run_long: {
        title: t('جري طويل زون ٢', 'Long Zone 2 run'),
        goal: t('تحمل هوائي للجري وقوة الأوتار والعظام.', 'Aerobic running endurance and tendon and bone resilience.'),
        components: ['aerobic', 'muscular_endurance'],
        rpe: 5, duration: 100,
        items: [
          W('مشي سريع ثم جري خفيف', 'Brisk walk into easy jog', { duration: '5min' }),
          { kind: 'run', libId: 'wg_running', name: t('جري طويل زون ٢', 'Zone 2 long run'), sets: 1, duration: '60-90min', intensity: 'Z2', basis: 'hr', purpose: t('تحمل هوائي', 'Aerobic endurance'), component: 'aerobic', note: t('زوّد ١٠ دقايق كل أسبوع تحميل؛ آخر ١٠ دقايق على سرعة السباق في تخصص السباق', 'Add 10 min each loading week; last 10 min at race pace in the race-specific block') },
          { kind: 'run', libId: 'ad_strides', sets: 1, reps: '4', distance: '80m', intensity: '85', basis: 'vmax', rest: '60s', restType: 'walk', purpose: t('الحفاظ على شكل الجري بعد تعب', 'Maintain form when fatigued'), component: 'technique' },
          ml('ex_hamstring_stretch', { sets: 2, duration: '40s' }),
          ml('ex_calf_stretch', { sets: 2, duration: '40s' })
        ]
      },
      tri_brick: {
        title: t('بريك: دراجة + جري', 'Brick: bike + run'),
        goal: t('التعود على الجري بعد الدراجة (رجلين تقيلة) وتجربة الانتقال T2.', 'Adapt to running off the bike (heavy legs) and rehearse T2.'),
        components: ['muscular_endurance', 'threshold', 'tactics'],
        rpe: 8, duration: 120,
        items: [
          W('تسخين دراجة تدريجي', 'Progressive bike warm-up', { duration: '15min' }),
          { kind: 'timed', name: t('دراجة مع بلوكات على وات السباق', 'Bike with race-power blocks'), sets: 1, reps: '3', duration: '12min', intensity: '88-95% FTP', basis: 'watts', rest: '5min', purpose: t('وات السباق وإدارة المجهود', 'Race power and effort management'), component: 'muscular_endurance', note: t('آخر ١٠ دقايق تدوير ٩٠+ للتجهيز للجري', 'Last 10 min at 90+ rpm to prepare for the run') },
          { kind: 'drill', name: t('انتقال سريع T2 (خلع الخوذة ولبس الجزمة)', 'Fast T2 transition (helmet off, shoes on)'), sets: 1, reps: '1', purpose: t('انتقال أقل من ٦٠ ثانية', 'Transition under 60 s'), component: 'tactics' },
          { kind: 'run', libId: 'wg_running', name: t('جري بعد الدراجة على سرعة السباق', 'Run off the bike at race pace'), sets: 1, distance: '3-5km', duration: '15-25min', time: '4:45-4:50/km', intensity: '4:45-4:50/km', basis: 'pace', purpose: t('إيقاع الجري بعد الدراجة', 'Run rhythm off the bike'), component: 'threshold', note: t('أول كيلو ما تستعجلش؛ ركّز على خطوات قصيرة وسريعة', 'Do not rush the first km; focus on short, quick steps') },
          M('مشي + إطالات', 'Walk + stretching', { duration: '10min' })
        ]
      },
      tri_opener: {
        title: t('تنشيط قبل السباق', 'Pre-race opener'),
        goal: t('لمسة قصيرة في الـ٣ رياضات وتجهيز المعدات.', 'Short touch in all three sports and equipment check.'),
        components: ['recovery', 'mental'],
        rpe: 3, duration: 50,
        items: [
          { kind: 'swim', name: t('سباحة قصيرة مع ٤×٢٥م سريع', 'Short swim with 4 x 25m fast'), sets: 1, distance: '600m', stroke: 'free', intensity: '4', basis: 'rpe', rest: '20s', purpose: t('إحساس بالمية', 'Water feel'), component: 'technique' },
          { kind: 'timed', name: t('دراجة سهلة مع ٣×١ دقيقة على وات السباق', 'Easy ride with 3 x 1 min at race power'), sets: 1, duration: '20min', intensity: 'Z2', basis: 'hr', purpose: t('فحص الدراجة وتنشيط الرجلين', 'Bike check and leg activation'), component: 'recovery' },
          { kind: 'run', name: t('جري خفيف مع ٤ ستريدز', 'Easy jog with 4 strides'), sets: 1, duration: '10min', intensity: 'Z1', basis: 'hr', purpose: t('تنشيط خفيف', 'Light activation'), component: 'recovery' }
        ]
      },
      tri_race: {
        title: t('يوم السباق — ترايثلون أولمبي', 'Race day — Olympic triathlon'),
        goal: t('تنفيذ خطة الإيقاع والتغذية في الـ٣ مراحل.', 'Execute the pacing and fuelling plan across the three legs.'),
        components: ['tactics', 'threshold', 'mental'],
        rpe: 9, duration: 170,
        items: [
          W('إحماء: جري ١٠ دقايق + سباحة ٥ دقايق مع ٣ تسارعات', 'Warm-up: 10 min jog + 5 min swim with 3 surges', { duration: '20min' }),
          { kind: 'swim', name: t('سباحة ١٥٠٠م', '1500m swim'), sets: 1, distance: '1500m', duration: '28-30min', stroke: 'free', intensity: 'CSS+2s/100m', basis: 'css', purpose: t('سباحة ثابتة بأقل مجهود ضايع', 'Steady swim with minimal wasted effort'), component: 'aerobic', note: t('أول ٢٠٠م قوية للخروج من الزحام ثم اضبط', 'Strong first 200m to clear traffic, then settle') },
          { kind: 'timed', name: t('دراجة ٤٠ كم', '40 km bike'), sets: 1, duration: '70-80min', intensity: '85-92% FTP', basis: 'watts', purpose: t('وات ثابت وتغذية ٦٠-٧٥ جم في الساعة', 'Even power and 60-75 g carbs per hour'), component: 'muscular_endurance' },
          { kind: 'run', name: t('جري ١٠ كم', '10 km run'), sets: 1, distance: '10km', duration: '48min', time: '48:00', intensity: '4:48/km', basis: 'pace', purpose: t('جري بإيقاع سالب (التاني أسرع من الأول)', 'Negative-split run'), component: 'threshold' },
          M('مشي وتهدئة وتعويض سوائل', 'Walk, cool-down and rehydration', { duration: '15min' })
        ]
      }
    }
  },
  /* ============================ ٨) مشي صحي — مبتدئ ============================ */
  {
    id: 'pt_walking_health_beg',
    sport: 'walking',
    level: 'beginner',
    title: t('مشي للصحة وإنقاص الوزن — مبتدئ (٨ أسابيع)', 'Walking for health & weight loss — beginner (8 weeks)'),
    goal: t('بناء عادة مشي يومية آمنة للكبار وكبار السن: الوصول لـ٧٠٠٠-٨٠٠٠ خطوة في اليوم و١٥٠ دقيقة مشي سريع في الأسبوع، مع قوة وتوازن أساسيين لتقليل خطر الوقوع.', 'Build a safe daily walking habit for adults and older adults: reach 7,000-8,000 steps per day and 150 minutes of brisk walking per week, with basic strength and balance to reduce fall risk.'),
    components: ['aerobic', 'strength', 'balance', 'mobility'],
    sessionsPerWeek: 5,
    periods: [
      {
        type: 'gpp',
        goal: t('بداية تدريجية: مشي مريح يومي، زيادة الخطوات ١٠٠٠ كل أسبوع، وتعلم تمارين القوة والتوازن.', 'Gradual start: comfortable daily walking, add 1,000 steps each week and learn strength and balance basics.'),
        components: ['aerobic', 'strength', 'balance'],
        blocks: [
          {
            name: t('بلوك ١ — تقييم البداية', 'Block 1 — Starting assessment'),
            goal: t('قياس اختبار المشي ٦ دقايق، القيام من الكرسي ٣٠ ثانية، التوازن، ومتوسط الخطوات اليومية.', 'Measure 6-minute walk, 30-second chair stand, balance and average daily steps.'),
            components: ['aerobic', 'strength', 'balance'],
            loads: [3], weekTypes: ['test'],
            pattern: ['wk_test', '', 'wk_easy', 'wk_strength', '', 'wk_easy', '']
          },
          {
            name: t('بلوك ٢ — بناء العادة', 'Block 2 — Building the habit'),
            goal: t('مشي ٢٠-٣٥ دقيقة، أول فترات مشي سريع، وقوة مرتين في الأسبوع.', '20-35 minute walks, first brisk intervals and strength twice a week.'),
            components: ['aerobic', 'strength', 'balance'],
            loads: [3, 4, 5], weekTypes: ['load', 'load', 'load'],
            pattern: ['wk_easy', 'wk_strength', 'wk_brisk', '', 'wk_strength', 'wk_long', '']
          }
        ]
      },
      {
        type: 'spp',
        goal: t('تطوير: فترات مشي سريع أطول، مشي على طلعة، ومشي طويل ٤٥-٦٠ دقيقة.', 'Progress: longer brisk intervals, incline walking and 45-60 minute long walks.'),
        components: ['aerobic', 'muscular_endurance', 'balance'],
        blocks: [
          {
            name: t('بلوك ٣ — تطوير', 'Block 3 — Progression'),
            goal: t('١٥٠ دقيقة مشي سريع في الأسبوع وطلعات أو سلالم مرة في الأسبوع.', '150 minutes of brisk walking per week and hills or stairs once a week.'),
            components: ['aerobic', 'muscular_endurance', 'strength'],
            loads: [5, 6, 4], weekTypes: ['load', 'load', 'deload'],
            pattern: ['wk_brisk', 'wk_strength', '', 'wk_hills', 'wk_strength', 'wk_long', '']
          },
          {
            name: t('بلوك ٤ — إعادة التقييم', 'Block 4 — Reassessment'),
            goal: t('إعادة الاختبارات ومقارنة النتائج ووضع خطة الاستمرار.', 'Repeat the tests, compare results and plan for continuation.'),
            components: ['aerobic', 'balance', 'strength'],
            loads: [4], weekTypes: ['test'],
            pattern: ['wk_test', '', 'wk_brisk', 'wk_strength', '', 'wk_long', '']
          }
        ]
      }
    ],
    sessions: {
      wk_test: {
        title: t('تقييم اللياقة الصحية', 'Health fitness assessment'),
        goal: t('قياسات بسيطة وآمنة لمتابعة التحسن (يُفضل موافقة الطبيب قبل البرنامج لو فيه أمراض مزمنة).', 'Simple, safe measures to track progress (medical clearance recommended if there are chronic conditions).'),
        components: ['aerobic', 'strength', 'balance'],
        rpe: 5, duration: 45,
        items: [
          W('مشي هادي + تحريك المفاصل', 'Easy walk + joint mobility', { duration: '8min' }),
          { kind: 'run', name: t('اختبار المشي ٦ دقايق', '6-minute walk test'), sets: 1, duration: '6min', intensity: '6-7', basis: 'rpe', purpose: t('قياس التحمل الهوائي (أقصى مسافة في ٦ دقايق)', 'Measure aerobic fitness (max distance in 6 minutes)'), component: 'aerobic', note: t('في ممر أو ملعب مقاس؛ سجّل المسافة والنبض بعد الاختبار', 'In a measured corridor or track; record distance and heart rate afterwards') },
          { kind: 'drill', name: t('اختبار القيام من الكرسي ٣٠ ثانية', '30-second chair stand test'), sets: 1, reps: 'max', rest: '2min', purpose: t('قياس قوة الرجلين', 'Measure leg strength'), component: 'strength', note: t('إيدين متقاطعة على الصدر، كرسي ٤٣سم', 'Arms crossed on chest, 43 cm chair') },
          { kind: 'drill', libId: 'ad_timed_up_and_go_test', sets: 1, reps: '2', rest: '1min', purpose: t('قياس الحركة والتوازن الديناميكي', 'Measure mobility and dynamic balance'), component: 'balance' },
          { kind: 'drill', libId: 'ad_single_leg_balance_progression', name: t('اختبار الوقوف على رجل واحدة', 'Single-leg stance test'), sets: 1, reps: '2/leg', rest: '30s', purpose: t('قياس التوازن الثابت (بحد أقصى ٣٠ ثانية)', 'Measure static balance (max 30 s)'), component: 'balance', note: t('جنب حيطة أو كرسي للأمان', 'Next to a wall or chair for safety') },
          M('إطالات خفيفة', 'Gentle stretching', { duration: '5min', note: t('سجّل كمان الوزن ومحيط الوسط ومتوسط الخطوات آخر ٣ أيام', 'Also record weight, waist circumference and average steps over the last 3 days') })
        ]
      },
      wk_easy: {
        title: t('مشي مريح', 'Easy walk'),
        goal: t('مشي متواصل بشدة تسمح بالكلام بجمل كاملة (اختبار الكلام).', 'Continuous walking at an intensity that allows full sentences (talk test).'),
        components: ['aerobic', 'recovery'],
        rpe: 3, duration: 40,
        items: [
          W('مشي بطيء + دوائر الكاحل والدراعين', 'Slow walk + ankle and arm circles', { duration: '5min' }),
          { kind: 'run', libId: 'wg_walking', name: t('مشي متواصل مريح', 'Continuous easy walk'), sets: 1, duration: '20-30min', intensity: '3-4', basis: 'rpe', purpose: t('بناء القاعدة الهوائية وحرق الدهون بأمان', 'Build aerobic base and burn fat safely'), component: 'aerobic', note: t('زوّد ٥ دقايق كل أسبوع؛ هدف الخطوات اليومي = متوسطك + ١٠٠٠ خطوة', 'Add 5 min each week; daily step target = your baseline + 1,000 steps') },
          ml('ex_calf_stretch', { sets: 2, duration: '30s' }),
          ml('ex_quad_stretch', { sets: 2, duration: '30s', note: t('اسند على حيطة', 'Hold a wall for support') })
        ]
      },
      wk_brisk: {
        title: t('مشي سريع بالفترات', 'Brisk walking intervals'),
        goal: t('رفع اللياقة الهوائية بفترات مشي سريع (تقدر تتكلم بكلمات قليلة بس) مع مشي هادي بينها.', 'Improve aerobic fitness with brisk intervals (only a few words possible) separated by easy walking.'),
        components: ['aerobic', 'muscular_endurance'],
        rpe: 5, duration: 45,
        items: [
          W('مشي هادي + حركات ديناميكية', 'Easy walk + dynamic movements', { duration: '8min' }),
          { kind: 'run', libId: 'ad_brisk_walk', sets: 1, reps: '5-6', duration: '3-4min', intensity: '6', basis: 'rpe', rest: '2min', restType: 'walk', purpose: t('رفع النبض لمنطقة التحمل وتحسين الكفاءة القلبية', 'Raise heart rate into the endurance zone and improve cardiac efficiency'), component: 'aerobic', note: t('بداية: ٥×(٣ سريع / ٢ هادي). تطوير: ٦×(٤ سريع / ١ هادي). خطوات قصيرة وسريعة ودراعات بتتحرك', 'Start: 5 x (3 brisk / 2 easy). Progress: 6 x (4 brisk / 1 easy). Short, quick steps with active arms') },
          { kind: 'run', libId: 'wg_walking', name: t('مشي هادي للتهدئة', 'Easy cool-down walk'), sets: 1, duration: '5min', intensity: '3', basis: 'rpe', purpose: t('رجوع النبض تدريجيًا', 'Gradual heart-rate return'), component: 'recovery' },
          ml('ex_hamstring_stretch', { sets: 2, duration: '30s' }),
          ml('ex_calf_stretch', { sets: 2, duration: '30s' })
        ]
      },
      wk_long: {
        title: t('مشي طويل آخر الأسبوع', 'Weekend long walk'),
        goal: t('زيادة مدة المشي المتواصل وحرق سعرات أكتر، ويُفضل مع العيلة أو الأصحاب.', 'Extend continuous walking time and energy expenditure, ideally with family or friends.'),
        components: ['aerobic', 'muscular_endurance'],
        rpe: 4, duration: 70,
        items: [
          W('مشي بطيء', 'Slow walk', { duration: '5min' }),
          { kind: 'run', libId: 'wg_walking', name: t('مشي طويل متواصل', 'Continuous long walk'), sets: 1, duration: '35-60min', intensity: 'Z2', basis: 'hr', purpose: t('تحمل هوائي وحرق دهون', 'Aerobic endurance and fat burning'), component: 'aerobic', note: t('زون ٢ ≈ ٦٠-٧٠٪ من أقصى نبض (٢٢٠ - السن). ابدأ ٣٥ دقيقة وزوّد ٥ كل أسبوع لحد ٦٠', 'Zone 2 about 60-70% of max HR (220 - age). Start at 35 min, add 5 min weekly up to 60') },
          { kind: 'run', libId: 'ad_brisk_walk', sets: 1, reps: '3', duration: '2min', intensity: '6', basis: 'rpe', rest: '3min', restType: 'walk', purpose: t('لمسات سرعة داخل المشي الطويل', 'Short pickups within the long walk'), component: 'aerobic', note: t('من بلوك ٣ وطالع', 'From Block 3 onwards') },
          ml('ex_hip_flexor_stretch', { sets: 2, duration: '30s' }),
          ml('ex_calf_stretch', { sets: 2, duration: '30s' })
        ]
      },
      wk_hills: {
        title: t('مشي على طلعة أو سلالم', 'Incline or stair walking'),
        goal: t('تقوية الرجلين والقلب بدون جري، على مشاية مائلة أو طلعة أو سلالم.', 'Strengthen legs and heart without running, on an inclined treadmill, hill or stairs.'),
        components: ['aerobic', 'muscular_endurance', 'strength'],
        rpe: 6, duration: 40,
        items: [
          W('مشي على أرض مستوية', 'Walk on flat ground', { duration: '8min' }),
          { kind: 'run', libId: 'wg_treadmill_incline_walk', sets: 1, reps: '5-6', duration: '2min', intensity: '6-7', basis: 'rpe', rest: '2min', restType: 'walk', purpose: t('قوة الرجلين والمؤخرة وتحمل القلب', 'Leg and glute strength and cardiovascular endurance'), component: 'muscular_endurance', note: t('ميل ٥-٨٪ بسرعة ٤-٥ كم/س، أو صعود سلالم بإيقاع ثابت ومسك الدرابزين', '5-8% incline at 4-5 km/h, or steady stair climbing holding the rail') },
          { kind: 'run', libId: 'wg_walking', name: t('مشي هادي للتهدئة', 'Easy cool-down walk'), sets: 1, duration: '8min', intensity: '3', basis: 'rpe', purpose: t('رجوع النبض تدريجيًا', 'Gradual heart-rate return'), component: 'recovery' },
          ml('ex_calf_stretch', { sets: 2, duration: '30s' }),
          ml('ex_hip_flexor_stretch', { sets: 2, duration: '30s' })
        ]
      },
      wk_strength: {
        title: t('قوة وتوازن أساسي', 'Basic strength & balance'),
        goal: t('قوة الرجلين والجذع والدراعين للحياة اليومية وتقليل خطر الوقوع.', 'Leg, trunk and arm strength for daily life and reduced fall risk.'),
        components: ['strength', 'balance', 'mobility'],
        rpe: 5, duration: 35,
        items: [
          W('مشي في المكان + دوائر الكتف والكاحل', 'March in place + shoulder and ankle circles', { duration: '5min' }),
          { kind: 'strength', name: t('القيام والجلوس من الكرسي', 'Sit-to-stand from a chair'), sets: 2, reps: '8-12', intensity: '3', basis: 'rir', tempo: '3-0-1-0', rest: '60s', purpose: t('قوة الرجلين للحياة اليومية', 'Leg strength for daily life'), component: 'strength', note: t('سهّلها بالإيدين على الكرسي، وصعّبها بدمبل على الصدر', 'Easier with hands on the chair, harder holding a dumbbell at the chest') },
          { kind: 'strength', libId: 'wg_wall_push_up', sets: 2, reps: '10', intensity: '3', basis: 'rir', tempo: '2-0-1-0', rest: '60s', purpose: t('قوة الصدر والدراعين', 'Chest and arm strength'), component: 'strength' },
          { kind: 'strength', libId: 'wg_banded_row', sets: 2, reps: '12', intensity: '3', basis: 'rir', tempo: '2-1-1-0', rest: '60s', purpose: t('قوة الضهر وتحسين الوقفة', 'Back strength and better posture'), component: 'strength' },
          { kind: 'strength', libId: 'ex_glute_bridge', sets: 2, reps: '12', intensity: '3', basis: 'rir', tempo: '2-1-1-0', rest: '45s', purpose: t('قوة المؤخرة وحماية أسفل الضهر', 'Glute strength and lower-back protection'), component: 'strength' },
          { kind: 'strength', libId: 'ex_calf_raise', sets: 2, reps: '12', intensity: '3', basis: 'rir', tempo: '2-1-2-0', rest: '45s', purpose: t('قوة السمانة لخطوة أقوى وتوازن أحسن', 'Calf strength for a stronger step and better balance'), component: 'strength', note: t('امسك في كرسي أو حيطة', 'Hold a chair or wall') },
          { kind: 'drill', libId: 'ad_tandem_stance_hold', sets: 2, reps: '30s/side', rest: '30s', purpose: t('توازن ثابت', 'Static balance'), component: 'balance', note: t('جنب حيطة؛ صعّبها بغمض العين لو آمن', 'Next to a wall; progress by closing eyes if safe') },
          { kind: 'drill', libId: 'ad_heel_to_toe_walk', sets: 2, distance: '5m', rest: '30s', purpose: t('توازن ديناميكي أثناء المشي', 'Dynamic balance while walking'), component: 'balance' },
          ml('ex_hamstring_stretch', { sets: 2, duration: '30s' }),
          ml('ex_shoulder_stretch', { sets: 2, duration: '30s' })
        ]
      }
    }
  }

];
