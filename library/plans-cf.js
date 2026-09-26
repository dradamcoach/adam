/*
 * قوالب الخطط الموسمية للكروس فيت والهايروكس:
 * أون رامب للمبتدئين، تجهيز للأوبن (متوسط)، متسابق كروس فيت (متقدم)،
 * أول سباق هايروكس (مبتدئ)، هايروكس برو (متقدم)، وهايروكس دبلز/ريلاي (متوسط).
 * كل قالب دورة كاملة: فترات ← بلوكات ← أسابيع ← تمرينات فيها شكل الويد، الحركات، العدات،
 * الأوزان (RX والمعدل في الملاحظة)، الزمن الأقصى، والشدة المستهدفة.
 * الدوال الصغيرة تحت بتختصر الكتابة بس، وكل دالة بترجع نسخة جديدة، والناتج بيانات عادية.
 */
const t = (ar, en) => ({ ar, en });
const P = (ar, en, component) => ({ purpose: t(ar, en), component });
const N = (ar, en) => ({ note: t(ar, en) });
/* قوة: libId (أو null مع name في x) — مجموعات — عدات — شدة — أساس — راحة */
const S = (libId, sets, reps, intensity, basis, rest, x = {}) =>
  Object.assign({ kind: 'strength' }, libId ? { libId } : {}, { sets, reps, intensity, basis, rest }, x);
/* ويد متعدد الحركات: الشكل — الوصف الكامل بالعربي والإنجليزي */
const WOD = (format, ar, en, x = {}) => Object.assign({ kind: 'wod', format, name: t(ar, en) }, x);
/* ويد/محطة مربوطة بتمرين من المكتبة */
const WODL = (libId, format, x = {}) => Object.assign({ kind: 'wod', libId, format }, x);
const RUN = (libId, x = {}) => Object.assign({ kind: 'run' }, libId ? { libId } : {}, x);
const DR = (libId, x = {}) => Object.assign({ kind: 'drill' }, libId ? { libId } : {}, x);
const TM = (libId, x = {}) => Object.assign({ kind: 'timed' }, libId ? { libId } : {}, x);
const wu = (libId, x = {}) => Object.assign({ kind: 'warmup', libId }, x);
const wuN = (ar, en, x = {}) => Object.assign({ kind: 'warmup', name: t(ar, en) }, x);
const mob = (libId, x = {}) => Object.assign({ kind: 'mobility', libId }, x);
const mobN = (ar, en, x = {}) => Object.assign({ kind: 'mobility', name: t(ar, en) }, x);

/* ===== إحماء وتهدئة متكررين ===== */
const cfGen = () => wuN(
  'إحماء عام ٢-٣ جولات: ٢٥٠م تجديف أو ٣٠ث نط حبل، ١٠ سكوات هوائي، ١٠ تمرير عصاية فوق الراس، ٥ إنش ورم، ١٠ جامبينج جاك',
  'General warm-up, 2-3 rounds: 250m row or 30s jump rope, 10 air squats, 10 PVC pass-throughs, 5 inchworms, 10 jumping jacks',
  { duration: '8min', note: t('مجهود خفيف RPE 3-4 لحد ما تعرق عرق خفيف', 'Easy effort RPE 3-4 until a light sweat') });
const hipAnkle = () => [
  wu('wg_worlds_greatest_stretch', { sets: 1, reps: '3/side' }),
  wu('ad_knee_to_wall_ankle_mobilization', { sets: 1, reps: '10/side', note: t('الركبة تعدي صباع القدم والكعب على الأرض', 'Knee tracks past the toes with the heel down') })
];
const shoulderPrep = () => [
  wu('ad_band_pass_through', { sets: 2, reps: '10' }),
  wu('wg_scapular_pull_up', { sets: 2, reps: '8', note: t('تعلق وشد لوح الكتف لتحت من غير ما تثني الكوع', 'Hang and depress the scapulae without bending the elbows') })
];
const barbellWU = (ar, en) => wuN(
  'إحماء البار (برجنر) بالبار الفاضي: ' + ar,
  'Empty-bar Burgener warm-up: ' + en,
  { sets: 2, reps: '5 each', note: t('ركز على الوضع والتوقيت مش على السرعة', 'Focus on positions and timing, not speed') });
const coolCF = () => [
  mob('ad_couch_stretch', { duration: '1min/side' }),
  mob('ad_foam_roller_thoracic_extension', { duration: '2min' }),
  mobN('تنفس بطيء من الأنف ورجوع النبض لأقل من ١٢٠', 'Slow nasal breathing until HR drops below 120', { duration: '3min' })
];
const coolLegs = () => [
  mob('ad_pigeon_stretch', { duration: '1min/side' }),
  mob('ex_hamstring_stretch', { duration: '45s/side' }),
  mob('ad_banded_ankle_dorsiflexion_mobilization', { duration: '1min/side' })
];
const runWU = () => [
  wuN('جري سهل ١٠ دقايق في زون ٢ + تمارين جري: A-skip، B-skip، رفع ركبة، ركل خلفي ٢×٢٠م لكل واحد',
    'Easy 10-min Z2 jog + running drills: A-skip, B-skip, high knees, butt kicks 2x20m each', { duration: '15min' }),
  wu('ad_strides', { sets: 1, reps: '4', distance: '80m', note: t('تسارع تدريجي لحد ٨٥٪ ورجوع مشي', 'Build to ~85% then walk back') })
];
const hyroxWU = () => [
  wuN('إحماء هايروكس: ٥ دقايق سكي إرج أو تجديف سهل ثم جولتين: ١٠ لانج مشي، ١٠ وول بول خفيف، ٥ بيربي، ١٠ سوينج كيتل بيل',
    'HYROX warm-up: 5 min easy SkiErg or row, then 2 rounds: 10 walking lunges, 10 light wall balls, 5 burpees, 10 KB swings', { duration: '12min' }),
  wu('wg_worlds_greatest_stretch', { sets: 1, reps: '3/side' })
];

/* ============ 1) كروس فيت — أون رامب للمبتدئين (8 أسابيع) ============ */
const T_CF_ONRAMP = {
  id: 'pt_crossfit_onramp_beg',
  sport: 'crossfit',
  level: 'beginner',
  title: t('كروس فيت — أون رامب للمبتدئين ٨ أسابيع', 'CrossFit — 8-week On-Ramp (beginner)'),
  goal: t('تعليم معايير الحركات التسعة الأساسية (عائلة السكوات، الضغط، الرفعة الميتة) والجمباز الأساسي وطرق التعديل (Scaling)، ثم رفع الشدة تدريجيًا لحد أول ويدات مرجعية (Benchmark) وإعادة اختبار البداية في الأسبوع الثامن.',
    'Teach the nine foundational movements (squat, press and deadlift families), basic gymnastics and how to scale, then build intensity gradually into the first benchmark WODs and a retest of the baseline in week 8.'),
  components: ['technique', 'strength', 'muscular_endurance', 'aerobic', 'mobility'],
  sessionsPerWeek: 3,
  periods: [
    {
      type: 'gpp',
      goal: t('الميكانيكا قبل الثبات وقبل الشدة: تعليم الحركات بأوزان خفيفة، اختبار البداية، ويدات قصيرة (٦-١٠ دقايق) بمجهود متوسط.', 'Mechanics, then consistency, then intensity: teach movements with light loads, take a baseline, short WODs (6-10 min) at moderate effort.'),
      components: ['technique', 'mobility', 'strength'],
      blocks: [
        {
          name: t('أسبوع ١ — اختبار البداية وفحص الحركة', 'Week 1 — Baseline and movement screen'),
          goal: t('اختبار البداية (Baseline) لتسجيل نقطة البداية، وفحص المدى الحركي في السكوات والضغط فوق الراس والهينج، وتعليم أول عائلتين حركة.', 'Record the Baseline WOD, screen range of motion in the squat, overhead position and hinge, and introduce the first two movement families.'),
          components: ['technique', 'mobility'],
          loads: [3],
          weekTypes: ['test'],
          pattern: ['base', '', 'rsquat', '', 'rhinge', '', '']
        },
        {
          name: t('بلوك ١ — معايير الحركة (أسابيع ٢-٤)', 'Block 1 — Movement standards (weeks 2-4)'),
          goal: t('٣ حصص: سكوات، هينج، ضغط + جمباز. الأوزان على RPE 6 والويد ٧-١٢ دقيقة. كل أسبوع زود وزن بسيط لو التكنيك ثابت في كل العدات.', '3 sessions: squat, hinge, press + gymnastics. Loads at RPE 6, WODs 7-12 min. Add a little load weekly only if technique holds on every rep.'),
          components: ['technique', 'strength', 'muscular_endurance'],
          loads: [4, 5, 6],
          weekTypes: ['load', 'load', 'load'],
          pattern: ['rsquat', '', 'rhinge', '', 'rpress', '', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('إدخال الرفعات الأولمبية الأساسية (هانج باور كلين)، دمج الحركات في ويدات مختلطة، وأول ويد مرجعي (سيندي) بتعديل مناسب.', 'Introduce the basic Olympic lift (hang power clean), combine movements in mixed-modal WODs and do the first benchmark (Cindy) with suitable scaling.'),
      components: ['technique', 'muscular_endurance', 'aerobic', 'power'],
      blocks: [
        {
          name: t('بلوك ٢ — شدة تدريجية وأول بنشمارك (أسابيع ٥-٧)', 'Block 2 — Gradual intensity and first benchmark (weeks 5-7)'),
          goal: t('الويدات توصل ١٢-٢٠ دقيقة بمجهود RPE 7-8. الأسبوع السابع تخفيف (أوزان وحجم أقل ٣٠٪) استعدادًا لأسبوع الاختبار.', 'WODs reach 12-20 min at RPE 7-8. Week 7 is a deload (30% less load and volume) ahead of test week.'),
          components: ['muscular_endurance', 'aerobic', 'technique', 'power'],
          loads: [5, 6, 4],
          weekTypes: ['load', 'load', 'deload'],
          pattern: ['rclean', '', 'rpj', '', 'rbench', '', '']
        }
      ]
    },
    {
      type: 'comp',
      goal: t('أسبوع البنشماركات: إعادة اختبار البداية ومقارنتها بالأسبوع الأول، وأول تجربة لفران وهيلين بتعديل.', 'Benchmark week: retest the Baseline against week 1 and a first go at scaled Fran and Helen.'),
      components: ['muscular_endurance', 'aerobic', 'mental'],
      blocks: [
        {
          name: t('أسبوع ٨ — أسبوع البنشمارك', 'Week 8 — Benchmark week'),
          goal: t('٣ اختبارات: البداية، فران معدّل، هيلين معدّلة. سجل الزمن ونوع التعديل عشان تبني عليهم في الكلاسات العادية.', 'Three tests: Baseline, scaled Fran, scaled Helen. Log times and scales to build on in regular classes.'),
          components: ['muscular_endurance', 'aerobic', 'mental'],
          loads: [5],
          weekTypes: ['test'],
          pattern: ['base', '', 'bfran', '', 'bhelen', '', '']
        }
      ]
    }
  ],
  sessions: {
    base: {
      title: t('اختبار البداية (Baseline) وفحص الحركة', 'Baseline test and movement screen'),
      goal: t('تسجيل نقطة البداية وتحديد التعديلات المناسبة لكل حركة.', 'Record a starting score and set the right scaling for each movement.'),
      components: ['muscular_endurance', 'technique', 'mobility'],
      rpe: 7, duration: 60,
      items: [
        cfGen(),
        ...shoulderPrep(),
        DR(null, { name: t('فحص الحركة: سكوات هوائي، أوفرهيد سكوات بالعصاية، هينج بالعصاية على الضهر، هولو هولد ٢٠ث', 'Movement screen: air squat, PVC overhead squat, PVC-on-back hinge, 20s hollow hold'), sets: 1, reps: '5 each', ...P('تقييم المدى والتحكم: عمق السكوات، وضع الدراع فوق الراس، الضهر المحايد في الهينج', 'Assess range and control: squat depth, overhead arm position, neutral spine in the hinge', 'technique'), ...N('صور فيديو من الجنب واكتب أي قصور (كاحل، حوض، كتف) عشان نديله مرونة خاصة', 'Film from the side and note any limitation (ankle, hip, shoulder) for targeted mobility') }),
        WOD('fortime', 'اختبار البداية بأسرع وقت: ٥٠٠م تجديف، ٤٠ سكوات هوائي، ٣٠ سيت أب (أب مات)، ٢٠ ضغط، ١٠ عقلة', 'Baseline for time: 500m row, 40 air squats, 30 AbMat sit-ups, 20 push-ups, 10 pull-ups',
          { duration: '15min', intensity: '8', basis: 'rpe', ...P('رقم مرجعي نقيس بيه التحسن في الأسبوع الثامن', 'A reference score to measure progress in week 8', 'muscular_endurance'), ...N('معدّل: ضغط على بوكس أو على الركب، سحب على الحلق بدل العقلة. سجل الزمن وكل تعديل. الحد الأقصى ١٥ دقيقة.', 'Scaled: box or knee push-ups, ring rows instead of pull-ups. Log the time and every scale. 15-min cap.') }),
        S('ex_goblet_squat', 3, '8', '6', 'rpe', '90s', { tempo: '3-1-1-0', ...P('تحديد وزن العمل للسكوات بالتحكم الكامل', 'Find a controlled working load for the squat', 'strength') }),
        ...coolCF()
      ]
    },
    rsquat: {
      title: t('عائلة السكوات + ويد قصير', 'Squat family + short WOD'),
      goal: t('تعليم السكوات الهوائي ثم الفرونت ثم الأوفرهيد، وبناء قوة الرجلين بأوزان خفيفة.', 'Teach the air squat, front squat and overhead squat, and build leg strength with light loads.'),
      components: ['technique', 'strength', 'muscular_endurance'],
      rpe: 6, duration: 60,
      items: [
        cfGen(),
        ...hipAnkle(),
        DR(null, { name: t('تسلسل السكوات: سكوات هوائي ← فرونت سكوات بالعصاية ← أوفرهيد سكوات بالعصاية', 'Squat progression: air squat → PVC front squat → PVC overhead squat'), sets: 3, reps: '5 each', ...P('معايير الحركة: الوسط تحت مستوى الركبة، الكعب على الأرض، الضهر محايد، الركبة في اتجاه الصوابع', 'Movement standards: hip crease below the knee, heels down, neutral spine, knees tracking the toes', 'technique') }),
        S('ex_front_squat', 4, '5', '6', 'rpe', '2min', { tempo: '3-1-1-0', ...P('قوة الرجلين والجذع ووضع الفرونت راك', 'Leg and trunk strength and front-rack position', 'strength'), ...N('ابدأ بالبار الفاضي (٢٠/١٥ كجم) وزود ٢.٥ كجم كل أسبوع لو كل العدات نضيفة. لو الفرونت راك صعب استخدم جوبلت سكوات.', 'Start with the empty bar (20/15 kg), add 2.5 kg weekly if every rep is clean. If the rack is limited, use goblet squats.') }),
        WOD('amrap', 'AMRAP ٨ دقايق: ٢٠٠م جري، ١٢ سكوات هوائي، ٨ سحب على الحلق', 'AMRAP 8: 200m run, 12 air squats, 8 ring rows',
          { duration: '8min', intensity: '7', basis: 'rpe', ...P('أول تعرض للشدة بحركات بسيطة مع الحفاظ على المعايير', 'First exposure to intensity with simple movements while holding standards', 'muscular_endurance'), ...N('إيقاع ثابت تقدر تكمل بيه من غير وقوف طويل. معدّل: ٢٠٠م تجديف أو مشي سريع، سكوات على بوكس. RX: ١٥ سكوات و٥ عقلة.', 'Steady pace you can hold without long stops. Scaled: 200m row or brisk walk, squats to a box. RX: 15 squats and 5 pull-ups.') }),
        S('ex_hollow_body_hold', 3, '20s', '7', 'rpe', '40s', { ...P('ثبات الجذع (الهولو) أساس كل حركات الجمباز', 'Hollow-body midline control, the base of all gymnastics', 'core'), ...N('لو الضهر اترفع من الأرض اثني الركب', 'If the low back lifts, bend the knees') }),
        ...coolLegs()
      ]
    },
    rhinge: {
      title: t('الرفعة الميتة والسوينج + ويد', 'Deadlift and swing + WOD'),
      goal: t('تعليم الهينج الآمن من الأرض ونقله للسوينج والحركات السريعة.', 'Teach a safe hinge from the floor and transfer it to the swing and faster movements.'),
      components: ['technique', 'strength', 'aerobic'],
      rpe: 6, duration: 60,
      items: [
        cfGen(),
        wu('ex_glute_bridge', { sets: 2, reps: '12' }),
        DR(null, { name: t('تسلسل الرفعة الميتة: هينج بالعصاية ← رومانيان بالبار الفاضي ← ديدليفت من الأرض', 'Deadlift progression: PVC hinge → empty-bar RDL → deadlift from the floor'), sets: 3, reps: '5 each', ...P('الضهر محايد، البار لازق في الرجل، الدفع بالرجلين مش بالضهر', 'Neutral spine, bar close to the legs, drive with the legs not the back', 'technique') }),
        S('ex_deadlift', 5, '5', '6', 'rpe', '2min', { tempo: '2-0-1-1', ...P('قوة السلسلة الخلفية بتكنيك ثابت', 'Posterior-chain strength with consistent technique', 'strength'), ...N('زود ٥ كجم كل أسبوع لحد RPE 7. وقف المجموعة لو الضهر اتقوس.', 'Add 5 kg weekly up to RPE 7. Stop the set if the back rounds.') }),
        DR('dr_kb_swing', { sets: 3, reps: '10', ...P('تعليم السوينج الروسي: الحوض هو اللي بيحرك الكيتل مش الدراع', 'Teach the Russian swing: the hips move the bell, not the arms', 'technique') }),
        WOD('fortime', '٣ جولات بأسرع وقت: ١٥ سوينج كيتل بيل روسي، ١٠ ستيب أب على البوكس، ٢٥٠م تجديف', '3 rounds for time: 15 Russian KB swings, 10 box step-ups, 250m row',
          { duration: '12min', intensity: '7', basis: 'rpe', ...P('ربط الهينج بالتحمل الهوائي وضبط الإيقاع', 'Link the hinge to aerobic work and pacing', 'aerobic'), ...N('RX: سوينج أمريكي ٢٤/١٦ كجم وبوكس ٦٠/٥٠ سم. معدّل: روسي ١٦/١٢ كجم وبوكس ٤٠ سم. الحد الأقصى ١٢ دقيقة.', 'RX: American swing 24/16 kg, 60/50 cm box. Scaled: Russian 16/12 kg, 40 cm box. 12-min cap.') }),
        S('ex_side_plank', 2, '30s/side', '6', 'rpe', '30s', P('ثبات الجذع الجانبي لحماية الضهر', 'Lateral trunk stability to protect the back', 'core')),
        ...coolLegs()
      ]
    },
    rpress: {
      title: t('عائلة الضغط + أساسيات الجمباز', 'Press family + gymnastics basics'),
      goal: t('تعليم الضغط الستريكت ثم البوش بريس ثم البوش جيرك، وبناء أساس العقلة والكيب.', 'Teach the strict press, push press and push jerk, and build the base for pull-ups and the kip.'),
      components: ['technique', 'strength', 'core'],
      rpe: 6, duration: 60,
      items: [
        cfGen(),
        ...shoulderPrep(),
        DR(null, { name: t('تسلسل الضغط بالعصاية ثم البار الفاضي: ستريكت بريس ← بوش بريس ← بوش جيرك', 'Press progression with PVC then empty bar: strict press → push press → push jerk'), sets: 3, reps: '5 each', ...P('الدفعة من الرجلين (دِب ودرايف)، الراس تطلع من الشباك، البار فوق نص القدم', 'Leg drive (dip and drive), head through the window, bar over mid-foot', 'technique') }),
        S('ex_overhead_barbell_press', 5, '5', '6', 'rpe', '2min', { tempo: '2-0-1-0', ...P('قوة الكتف والجذع في الوضع فوق الراس', 'Shoulder and trunk strength overhead', 'strength'), ...N('الضلوع لتحت والمؤخرة مشدودة، من غير تقويس الضهر', 'Ribs down, glutes squeezed, no back arching') }),
        S('dr_ring_row', 4, '8', '2', 'rir', '90s', { ...P('قوة السحب الأفقي كتمهيد للعقلة', 'Horizontal pulling strength as a pull-up base', 'strength'), ...N('كل ما الرجل تتقدم لقدام الحركة تصعب. التقدم: عقلة سلبية ٣×٣ بنزول ٥ ثواني.', 'Walk the feet forward to make it harder. Progression: negative pull-ups 3x3 with a 5s lower.') }),
        DR('wg_hollow_rock', { name: t('هولو وآرتش سوينج على العقلة (أساس الكيب)', 'Hollow-arch swings on the bar (kip foundation)'), sets: 3, reps: '8', ...P('تعليم الكيب بأمان: الحركة من الكتف والجذع مش من الرجلين', 'Teach the kip safely: motion from shoulders and trunk, not the legs', 'coordination') }),
        WOD('emom', 'EMOM ١٠ دقايق: الدقايق الفردية ١٠ بوش بريس خفيف، الزوجية ١٢ سيت أب + ٦ ضغط', 'EMOM 10: odd minutes 10 light push presses, even minutes 12 sit-ups + 6 push-ups',
          { duration: '10min', intensity: '6', basis: 'rpe', ...P('تكرار الحركات تحت تعب خفيف مع وقت راحة جوه كل دقيقة', 'Repeat the movements under light fatigue with rest inside each minute', 'muscular_endurance'), ...N('RX: بوش بريس ٣٥/٢٥ كجم. معدّل: البار الفاضي أو دمبل ٢×٧.٥ كجم، ضغط على بوكس. لازم يفضل ١٥-٢٠ ثانية راحة.', 'RX: push press 35/25 kg. Scaled: empty bar or 2x7.5 kg dumbbells, box push-ups. Keep 15-20s rest each minute.') }),
        ...coolCF()
      ]
    },
    rclean: {
      title: t('الهانج باور كلين + فرونت سكوات + ويد', 'Hang power clean + front squat + WOD'),
      goal: t('تعليم أول رفعة أولمبية (من فوق لتحت) وربطها بالفرونت سكوات وويد قصير سريع.', 'Teach the first Olympic lift (top-down) and link it to the front squat and a short, fast WOD.'),
      components: ['technique', 'power', 'strength', 'anaerobic'],
      rpe: 7, duration: 60,
      items: [
        cfGen(),
        barbellWU('جامب، شراج، هاي بول، مسل كلين، فرونت سكوات', 'jumps, shrugs, high pulls, muscle cleans, front squats'),
        DR(null, { name: t('تسلسل الكلين من فوق لتحت: وضع الهانج ← جامب وشراج ← هاي بول ← استلام فرونت راك', 'Top-down clean progression: hang position → jump and shrug → high pull → front-rack receive'), sets: 3, reps: '3 each', ...P('ترتيب الحركة: الفرد الكامل للحوض قبل ما الدراع تسحب، والكوع يلف بسرعة', 'Sequence: full hip extension before the arms pull, fast elbows', 'technique') }),
        S('ad_hang_power_clean', 5, '3', '6', 'rpe', '2min', { ...P('قدرة انفجارية بتكنيك سليم', 'Explosive power with sound technique', 'power'), ...N('الوزن محكوم بالتكنيك: لو الكوع بطيء أو البار بعيد ارجع وزن أقل', 'Load is limited by technique: slow elbows or a looping bar means go lighter') }),
        S('ex_front_squat', 3, '5', '7', 'rpe', '2min', { tempo: '3-0-1-0', ...P('قوة الرجلين في وضع الاستلام', 'Leg strength in the receiving position', 'strength') }),
        WOD('fortime', 'بأسرع وقت ٢١-١٥-٩: ديدليفت وبيربي', 'For time 21-15-9: deadlifts and burpees',
          { duration: '10min', intensity: '8', basis: 'rpe', ...P('أول ويد قصير عالي الشدة (لاهوائي) مع حركة معروفة', 'First short, high-intensity (anaerobic) WOD with familiar movements', 'anaerobic'), ...N('RX: ديدليفت ٧٠/٤٥ كجم. معدّل: ٥٠/٣٥ كجم وبيربي من غير نطة. الحد الأقصى ١٠ دقايق. قسم الديدليفت مجموعات صغيرة (٧-٧-٧) من غير ما تبوظ الضهر.', 'RX: deadlift 70/45 kg. Scaled: 50/35 kg, step-back burpees. 10-min cap. Break deadlifts into small sets (7-7-7) and keep the back neutral.') }),
        ...coolCF()
      ]
    },
    rpj: {
      title: t('بوش جيرك + جمباز + فترات تحمل', 'Push jerk + gymnastics + engine intervals'),
      goal: t('تطوير الضغط الديناميكي، أول محاولات العقلة بالكيب، وفترات تحمل هوائي متعددة الأجهزة.', 'Develop dynamic pressing, first kipping pull-up attempts and multi-modal aerobic intervals.'),
      components: ['power', 'technique', 'aerobic', 'muscular_endurance'],
      rpe: 7, duration: 60,
      items: [
        cfGen(),
        ...shoulderPrep(),
        S('wg_push_press', 5, '3', '7', 'rpe', '2min', { ...P('نقل القوة من الرجلين للبار فوق الراس', 'Transfer leg drive to the bar overhead', 'power'), ...N('الدِب قصير ومستقيم (٥-١٠ سم) والكعب على الأرض لحد نهاية الدرايف', 'Short, vertical dip (5-10 cm), heels down until the drive finishes') }),
        DR('ex_pullup', { name: t('عقلة بالكيب: ٣ هولو/آرتش ثم عقلة، أو عقلة بالأستك', 'Kipping pull-up: 3 hollow/arch swings then a pull-up, or banded pull-ups'), sets: 4, reps: '3-5', rest: '90s', ...P('ربط الكيب بالسحب بأمان مع قوة ستريكت كافية', 'Link the kip to the pull safely with enough strict strength', 'technique') }),
        WOD('intervals', '٤ جولات: ٣ دقايق شغل / ١ دقيقة راحة — ٢٥٠م تجديف، ١٢ وول بول، وفي الباقي أقصى عدد بيربي', '4 rounds: 3 min work / 1 min rest — 250m row, 12 wall balls, max burpees in the remaining time',
          { duration: '16min', intensity: '7', basis: 'rpe', ...P('بناء التحمل الهوائي وتعلم تثبيت الإيقاع من جولة لجولة', 'Build aerobic capacity and learn to repeat the same pace every round', 'aerobic'), ...N('RX: وول بول ٩/٦ كجم لهدف ٣/٢.٧م. معدّل: ٦/٤ كجم لهدف أوطى. الهدف: عدد البيربي ما يقلش أكتر من ٢ بين الجولات.', 'RX: wall ball 9/6 kg to 3/2.7 m. Scaled: 6/4 kg to a lower target. Goal: burpee count drops by no more than 2 between rounds.') }),
        S('ex_walking_lunge', 3, '10/leg', '6', 'rpe', '60s', P('قوة رجل واحدة وتوازن', 'Single-leg strength and balance', 'strength')),
        ...coolLegs()
      ]
    },
    rbench: {
      title: t('أول بنشمارك: سيندي + ديدليفت', 'First benchmark: Cindy + deadlift'),
      goal: t('أداء أول ويد مرجعي بتعديل ثابت يتكرر بعد كده للمقارنة، مع جلسة قوة خفيفة.', 'Do the first benchmark with a fixed scale that can be repeated for comparison, plus light strength work.'),
      components: ['muscular_endurance', 'aerobic', 'strength'],
      rpe: 7, duration: 60,
      items: [
        cfGen(),
        ...shoulderPrep(),
        DR(null, { name: t('جولة تجريبية بالتعديل المختار + تحديد خطة الإيقاع', 'One practice round with the chosen scale + set a pacing plan'), sets: 1, reps: '1 round', ...P('اختيار تعديل يسمح بـ ٦-١٢ جولة من غير ما الحركة تبوظ', 'Choose a scale that allows 6-12 rounds without movement breaking down', 'technique') }),
        WOD('amrap', 'سيندي — AMRAP ٢٠ دقيقة: ٥ عقلة، ١٠ ضغط، ١٥ سكوات هوائي', 'Cindy — AMRAP 20: 5 pull-ups, 10 push-ups, 15 air squats', { duration: '20min', intensity: '7', basis: 'rpe', ...P('أول بنشمارك: تحمل عضلي وهوائي بإيقاع ثابت لمدة ٢٠ دقيقة', 'First benchmark: muscular and aerobic endurance at a steady pace for 20 minutes', 'muscular_endurance'), ...N('معدّل: سحب على الحلق وضغط على بوكس. سجل الجولات والتعديل. في أسبوع التخفيف (٧) اعمل ١٢ دقيقة بس بمجهود سهل.', 'Scaled: ring rows and box push-ups. Log rounds and scale. In deload week 7 do only 12 min at an easy effort.') }),
        S('ex_deadlift', 3, '5', '7', 'rpe', '2min', P('الحفاظ على قوة الهينج', 'Maintain hinge strength', 'strength')),
        ...coolCF()
      ]
    },
    bfran: {
      title: t('بنشمارك: فران معدّل', 'Benchmark: scaled Fran'),
      goal: t('أول تجربة لأشهر ويد قصير في الكروس فيت بشدة عالية وأمان.', 'A first, safe high-intensity go at CrossFit\'s best-known short WOD.'),
      components: ['anaerobic', 'muscular_endurance', 'mental'],
      rpe: 9, duration: 50,
      items: [
        cfGen(),
        barbellWU('فرونت سكوات، بوش بريس، ثراستر', 'front squats, push presses, thrusters'),
        DR('dr_thruster', { sets: 3, reps: '5', rest: '60s', ...P('تسخين الثراستر بوزن الويد ومراجعة الحركة', 'Build to Fran load and rehearse the thruster', 'technique') }),
        WOD('fortime', 'فران بأسرع وقت ٢١-١٥-٩: ثراستر وعقلة', 'Fran for time 21-15-9: thrusters and pull-ups',
          { duration: '10min', intensity: '9', basis: 'rpe', ...P('قياس القدرة اللاهوائية والتحمل العضلي في جهد قصير', 'Measure anaerobic capacity and muscular endurance in a short effort', 'anaerobic'), ...N('RX: ٤٣/٢٩ كجم وعقلة. معدّل للمبتدئ: ٢٥/١٥ كجم وسحب على الحلق أو عقلة بالنطة. الحد الأقصى ١٠ دقايق.', 'RX: 43/29 kg with pull-ups. Beginner scale: 25/15 kg with ring rows or jumping pull-ups. 10-min cap.') }),
        mobN('مشي ٥ دقايق وتنفس بطيء بعد الجهد', 'Walk 5 min with slow breathing after the effort', { duration: '5min' }),
        ...coolCF()
      ]
    },
    bhelen: {
      title: t('بنشمارك: هيلين معدّلة', 'Benchmark: scaled Helen'),
      goal: t('بنشمارك متوسط الطول يجمع الجري والسوينج والعقلة.', 'A medium-length benchmark combining running, swings and pull-ups.'),
      components: ['aerobic', 'muscular_endurance', 'mental'],
      rpe: 8, duration: 55,
      items: [
        cfGen(),
        ...runWU().slice(1),
        DR('dr_kb_swing', { sets: 2, reps: '8', ...P('تسخين السوينج بوزن الويد', 'Build swings to WOD load', 'technique') }),
        WOD('fortime', 'هيلين — ٣ جولات بأسرع وقت: ٤٠٠م جري، ٢١ سوينج كيتل بيل، ١٢ عقلة', 'Helen — 3 rounds for time: 400m run, 21 KB swings, 12 pull-ups',
          { duration: '18min', intensity: '8', basis: 'rpe', ...P('تحمل هوائي مع شغل عضلي متقطع وإدارة الإيقاع', 'Aerobic endurance with intermittent muscular work and pacing', 'aerobic'), ...N('RX: ٢٤/١٦ كجم أمريكي وعقلة. معدّل: ١٦/١٢ كجم روسي وسحب على الحلق. الجري بإيقاع تقدر تتكلم فيه بصعوبة. الحد الأقصى ١٨ دقيقة.', 'RX: 24/16 kg American with pull-ups. Scaled: 16/12 kg Russian with ring rows. Run at a pace where talking is hard but possible. 18-min cap.') }),
        ...coolLegs()
      ]
    }
  }
};

/* ============ 2) كروس فيت — تجهيز للأوبن (متوسط، 14 أسبوع) ============ */
const T_CF_OPEN = {
  id: 'pt_crossfit_open_int',
  sport: 'crossfit',
  level: 'intermediate',
  title: t('كروس فيت — تجهيز للأوبن ١٤ أسبوع (متوسط)', 'CrossFit — 14-week CrossFit Open prep (intermediate)'),
  goal: t('رفع القوة والرفعات الأولمبية، زيادة حجم الجمباز (تشست تو بار، تو تو بار، HSPU، دابل أندر)، وبناء محرك هوائي وعتبة عالية، ثم التعود على شكل ويدات الأوبن واستراتيجية الإيقاع، مع إعادة اختبار البنشماركات قبل الأوبن.',
    'Raise strength and Olympic lifting, grow gymnastics volume (C2B, T2B, HSPU, double-unders), build an aerobic engine and a high threshold, then rehearse Open-style workouts and pacing strategy, with benchmark retests before the Open.'),
  components: ['max_strength', 'power', 'technique', 'muscular_endurance', 'aerobic', 'threshold', 'anaerobic', 'mental'],
  sessionsPerWeek: 5,
  periods: [
    {
      type: 'gpp',
      goal: t('تراكم: قوة أساسية بحجم عالي (٧٠-٧٧٪)، تكنيك الرفعات الأولمبية، قوة ستريكت للجمباز، وقاعدة هوائية زون ٢-٣.', 'Accumulation: base strength with higher volume (70-77%), Olympic-lift technique, strict gymnastics strength and a Z2-Z3 aerobic base.'),
      components: ['strength', 'technique', 'aerobic', 'muscular_endurance'],
      blocks: [
        {
          name: t('أسبوع ١ — اختبارات البداية', 'Week 1 — Baseline testing'),
          goal: t('1RM سكوات خلفي وكلين آند جيرك، ٢٠٠٠م تجديف، أقصى تو تو بار ودابل أندر متواصل، وفران. الأرقام دي بتحدد نسب الأوزان والإيقاع طول الدورة.', 'Back squat and clean and jerk 1RM, 2000m row, max unbroken T2B and double-unders, and Fran. These numbers set loads and paces for the cycle.'),
          components: ['max_strength', 'aerobic', 'muscular_endurance'],
          loads: [4],
          weekTypes: ['test'],
          pattern: ['tStr', '', 'tEng', '', 'tBench', '', '']
        },
        {
          name: t('بلوك ١ — تراكم (أسابيع ٢-٥)', 'Block 1 — Accumulation (weeks 2-5)'),
          goal: t('السكوات ٥×٥ على ٧٠ ← ٧٣ ← ٧٧٪ ثم تخفيف ٦٠٪. الجمباز ستريكت ونضافة الكيب. التحمل زون ٢-٣ لمدة ٣٠-٤٠ دقيقة. الأسبوع الرابع صدمة والخامس تخفيف.', 'Squat 5x5 at 70 → 73 → 77% then a 60% deload. Strict gymnastics and clean kipping. Z2-Z3 aerobic work for 30-40 min. Week 4 is a shock week, week 5 a deload.'),
          components: ['strength', 'technique', 'aerobic', 'muscular_endurance'],
          loads: [5, 6, 7, 4],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['strA', 'engA', 'gymA', '', 'strB', 'mixA', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('تكثيف: قوة ٨٠-٨٦٪، كومبلكسات أولمبية أتقل، جمباز بحجم عالي تحت التعب، وفترات على العتبة وVO2.', 'Intensification: strength at 80-86%, heavier Olympic complexes, high-volume gymnastics under fatigue, and threshold and VO2 intervals.'),
      components: ['max_strength', 'power', 'threshold', 'muscular_endurance', 'technique'],
      blocks: [
        {
          name: t('بلوك ٢ — تكثيف وحجم جمباز (أسابيع ٦-٩)', 'Block 2 — Intensity and gymnastics volume (weeks 6-9)'),
          goal: t('الفرونت سكوات ٥×٣ على ٨٠ ← ٨٣ ← ٨٦٪ ثم ٧٠٪. EMOM جمباز بيزيد دقيقتين كل أسبوع. فترات عتبة ٦×٥٠٠م. أسبوع ٩ تخفيف.', 'Front squat 5x3 at 80 → 83 → 86% then 70%. Gymnastics EMOMs grow by 2 min weekly. Threshold 6x500m. Week 9 deload.'),
          components: ['max_strength', 'threshold', 'muscular_endurance', 'power'],
          loads: [6, 7, 8, 4],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['strA2', 'engB', 'gymB', '', 'strB2', 'mixB', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('تخصيص للأوبن: محاكاة ويدات أوبن بالقواعد والحكم، تجربة استراتيجية الإيقاع والإحماء، ثم إعادة الاختبارات.', 'Open specificity: judged Open-style simulations, rehearsing pacing and warm-up strategy, then retesting.'),
      components: ['anaerobic', 'muscular_endurance', 'mental', 'threshold'],
      blocks: [
        {
          name: t('أسبوع ١٠ — محاكاة الأوبن', 'Week 10 — Open simulation'),
          goal: t('ويدين محاكاة بحكم ومعايير رسمية (No-rep)، مع قوة ثقيلة قليلة الحجم.', 'Two judged simulations with official standards (no-reps), plus heavy, low-volume strength.'),
          components: ['anaerobic', 'muscular_endurance', 'mental'],
          loads: [7],
          weekTypes: ['shock'],
          pattern: ['strP', 'openSim', '', 'engB', 'gymB', 'openSim', '']
        },
        {
          name: t('أسبوع ١١ — إعادة الاختبارات', 'Week 11 — Retest week'),
          goal: t('نفس اختبارات الأسبوع الأول بعد حجم أقل؛ قارن الأرقام وحدد نقط القوة والضعف قبل الأوبن.', 'Repeat the week-1 tests on reduced volume; compare numbers and set strengths and weaknesses before the Open.'),
          components: ['max_strength', 'aerobic', 'muscular_endurance'],
          loads: [5],
          weekTypes: ['test'],
          pattern: ['tStr', '', 'tEng', '', 'tBench', '', '']
        }
      ]
    },
    {
      type: 'comp',
      goal: t('أسابيع الأوبن الثلاثة: أداء ويد الأسبوع بأفضل استعداد، إعادة لو في مكسب واضح، وحفاظ على القوة والتحمل بحجم قليل.', 'The three Open weeks: perform each workout fresh, redo when a clear gain is likely, and maintain strength and engine on low volume.'),
      components: ['anaerobic', 'muscular_endurance', 'mental', 'recovery'],
      blocks: [
        {
          name: t('بلوك الأوبن — ٣ أسابيع (أسابيع ١٢-١٤)', 'Open block — 3 weeks (weeks 12-14)'),
          goal: t('ويد الأوبن يوم الجمعة بعد يوم خفيف، إعادة يوم الاتنين لو قررت، وجلسة قوة ومهارة قصيرة وجلسة استشفاء هوائي.', 'Open workout on Friday after an easy day, optional redo on Monday, one short strength/skill session and one aerobic recovery session.'),
          components: ['anaerobic', 'muscular_endurance', 'mental', 'recovery'],
          loads: [5, 5, 5],
          weekTypes: ['comp', 'comp', 'comp'],
          pattern: ['openRedo', 'strP', 'flush', '', 'openDay', '', '']
        }
      ]
    }
  ],
  sessions: {
    tStr: {
      title: t('اختبار: 1RM سكوات خلفي وكلين آند جيرك', 'Test: back squat and clean and jerk 1RM'),
      goal: t('تحديد الحد الأقصى لحساب نسب الأوزان.', 'Establish maxes to set training percentages.'),
      components: ['max_strength', 'power'],
      rpe: 9, duration: 90,
      items: [
        cfGen(), ...hipAnkle(),
        wuN('صعود للسكوات: البار ×١٠، ٥٠٪ ×٥، ٦٥٪ ×٣، ٧٥٪ ×٢، ٨٥٪ ×١، ٩٢٪ ×١', 'Squat ramp: bar x10, 50% x5, 65% x3, 75% x2, 85% x1, 92% x1', { sets: 6, reps: '10-5-3-2-1-1' }),
        S('ex_barbell_back_squat', 3, '1', '97-102', '1rm', '4min', { ...P('اختبار 1RM سكوات: ٢-٣ محاولات بعد التسخين', 'Back squat 1RM: 2-3 attempts after the ramp', 'max_strength'), ...N('زود ٢.٥-٥ كجم بين المحاولات. سجل أتقل عدة بعمق كامل.', 'Add 2.5-5 kg between attempts. Log the heaviest full-depth rep.') }),
        barbellWU('ديدليفت كلين، هاي بول، مسل كلين، فرونت سكوات، بوش جيرك', 'clean deadlift, high pull, muscle clean, front squat, push jerk'),
        S(null, 5, '1', '85-100', '1rm', '2-3min', { name: t('كلين آند جيرك — بناء لـ 1RM', 'Clean and jerk — build to 1RM'), ...P('اختبار أقصى كلين آند جيرك (باور أو سكوات، جيرك بأي شكل)', 'Clean and jerk max (power or squat clean, any jerk style)', 'power'), ...N('٦٠٪ ×٢، ٧٠٪ ×١، ٨٠٪ ×١ ثم مفردات. وقف لو التكنيك بدأ يبوظ.', '60% x2, 70% x1, 80% x1, then singles. Stop when technique breaks.') }),
        ...coolLegs()
      ]
    },
    tEng: {
      title: t('اختبار: ٢٠٠٠م تجديف وجمباز متواصل', 'Test: 2000m row and unbroken gymnastics'),
      goal: t('قياس المحرك الهوائي وأقصى عدد متواصل في الجمباز.', 'Measure the aerobic engine and max unbroken gymnastics.'),
      components: ['aerobic', 'threshold', 'muscular_endurance'],
      rpe: 9, duration: 70,
      items: [
        cfGen(),
        wuN('تجديف ٥ دقايق متدرج + ٣×١٠ ضربات قوية على سرعة السباق', '5-min progressive row + 3x10 hard strokes at race pace', { duration: '8min' }),
        WODL('ex_rowing_machine', 'fortime', { name: t('٢٠٠٠م تجديف بأسرع وقت', '2000m row for time'), distance: '2000m', intensity: '10', basis: 'rpe', ...P('اختبار العتبة والتحمل الهوائي؛ متوسط الـ ٥٠٠م هو مرجع فترات التجديف', 'Threshold and aerobic test; the average /500m sets rowing interval paces', 'threshold'), ...N('ابدأ ٢ ث/٥٠٠م أبطأ من المستهدف أول ٥٠٠م، ثبت، وسرّع آخر ٣٠٠م. الدامبر ٥-٦.', 'Start 2s/500m slower than target for the first 500m, hold, then kick the last 300m. Damper 5-6.') }),
        S('dr_toes_to_bar', 1, 'max unbroken', '10', 'rpe', '5min', P('أقصى تو تو بار متواصل', 'Max unbroken toes-to-bar', 'muscular_endurance')),
        WODL('dr_double_under', 'amrap', { name: t('أقصى دابل أندر في دقيقة', 'Max double-unders in 1 minute'), duration: '1min', intensity: '10', basis: 'rpe', ...P('اختبار كفاءة نط الحبل تحت ضغط الوقت', 'Test double-under efficiency under time pressure', 'coordination') }),
        ...coolCF()
      ]
    },
    tBench: {
      title: t('اختبار: فران + قوة جمباز ستريكت', 'Test: Fran + strict gymnastics strength'),
      goal: t('بنشمارك لاهوائي قصير وقياس القوة الستريكت في الجمباز.', 'A short anaerobic benchmark and a strict gymnastics strength check.'),
      components: ['anaerobic', 'muscular_endurance', 'strength'],
      rpe: 9, duration: 70,
      items: [
        cfGen(), ...shoulderPrep(),
        DR('dr_thruster', { sets: 3, reps: '5', rest: '90s', ...P('صعود لوزن فران ومراجعة الإيقاع', 'Build to Fran load and rehearse rhythm', 'technique') }),
        WOD('fortime', 'فران بأسرع وقت ٢١-١٥-٩: ثراستر ٤٣/٢٩ كجم وعقلة', 'Fran for time 21-15-9: thrusters 43/29 kg and pull-ups',
          { duration: '10min', intensity: '10', basis: 'rpe', ...P('قياس القدرة اللاهوائية والتحمل العضلي للجزء العلوي', 'Measure anaerobic capacity and upper-body muscular endurance', 'anaerobic'), ...N('معدّل: ٣٥/٢٥ كجم وعقلة بأستك. خطة مقترحة: ٢١ (١٢-٩)، ١٥ (٨-٧)، ٩ متواصل.', 'Scaled: 35/25 kg with banded pull-ups. Suggested splits: 21 (12-9), 15 (8-7), 9 unbroken.') }),
        S('ex_pullup', 1, 'max strict', '10', 'rpe', '4min', P('أقصى عقلة ستريكت بعد ١٥ دقيقة راحة', 'Max strict pull-ups after 15 min rest', 'strength')),
        S('wg_wall_handstand_push_up', 1, 'max strict', '10', 'rpe', '4min', { ...P('أقصى HSPU ستريكت (أو بايك على بوكس)', 'Max strict HSPU (or box pike push-ups)', 'strength'), ...N('سجل نوع الحركة وارتفاع الأطباق تحت الراس لو استخدمت', 'Log the variation and any abmat/plate height used') }),
        ...coolCF()
      ]
    },
    strA: {
      title: t('سكوات + سناتش تكنيك + ويد قصير', 'Squat + snatch technique + short WOD'),
      goal: t('قوة الرجلين بحجم عالي، تعليم السناتش بأوزان متوسطة، وويد ٨-١٠ دقايق.', 'High-volume leg strength, snatch technique at moderate loads and an 8-10 min WOD.'),
      components: ['strength', 'technique', 'anaerobic'],
      rpe: 7, duration: 75,
      items: [
        cfGen(), ...hipAnkle(),
        S('ex_barbell_back_squat', 5, '5', '70-77', '1rm', '2-3min', { tempo: '3-1-1-0', ...P('تراكم قوة: ٧٠٪ ثم ٧٣٪ ثم ٧٧٪، أسبوع التخفيف ٣×٥ على ٦٠٪', 'Accumulation: 70%, 73%, 77%, deload 3x5 at 60%', 'strength') }),
        barbellWU('مسل سناتش، أوفرهيد سكوات، سناتش بالانس', 'muscle snatch, overhead squat, snatch balance'),
        S('ad_power_snatch', 10, '2', '60-70', '1rm', 'EMOM', { ...P('EMOM ١٠: عدتين باور سناتش كل دقيقة لتثبيت المسار والسرعة تحت البار', 'EMOM 10: 2 power snatches each minute to groove bar path and speed under the bar', 'technique'), ...N('النسبة من 1RM السناتش (لو مش معروف: ٦٠-٧٠٪ من 1RM الكلين آند جيرك تقريبًا).', 'Percent of snatch 1RM (if unknown, roughly 60-70% of clean and jerk 1RM).') }),
        WOD('amrap', 'AMRAP ١٠: ١٠ بوكس جامب ٦٠/٥٠ سم، ٨ هانج باور سناتش ٤٣/٢٩ كجم، ٦ بيربي فوق البار', 'AMRAP 10: 10 box jumps 60/50 cm, 8 hang power snatches 43/29 kg, 6 bar-facing burpees',
          { duration: '10min', intensity: '8', basis: 'rpe', ...P('قدرة لاهوائية ودورات سريعة على البار تحت التعب', 'Anaerobic power and fast barbell cycling under fatigue', 'anaerobic'), ...N('معدّل: ٣٠/٢٠ كجم، ستيب أب بدل الجامب. السناتش متواصل أو ٥+٣.', 'Scaled: 30/20 kg, step-ups instead of jumps. Snatches unbroken or 5+3.') }),
        ...coolLegs()
      ]
    },
    engA: {
      title: t('محرك هوائي — قاعدة زون ٢-٣', 'Aerobic engine — Z2-Z3 base'),
      goal: t('بناء القاعدة الهوائية بأجهزة مختلفة وتحسين الاستشفاء بين الويدات.', 'Build the aerobic base across modalities and improve recovery between WODs.'),
      components: ['aerobic', 'coordination', 'recovery'],
      rpe: 5, duration: 60,
      items: [
        cfGen(),
        TM('ex_rowing_machine', { sets: 1, duration: '12min', intensity: 'Z2', basis: 'hr', rest: '2min', ...P('قاعدة هوائية بتنفس من الأنف', 'Aerobic base, nasal breathing', 'aerobic'), ...N('إيقاع تقدر تتكلم فيه جمل كاملة. سجل متوسط الـ ٥٠٠م وحاول يتحسن ١-٢ ث كل أسبوع بنفس النبض.', 'Conversational pace. Log average /500m and aim to improve 1-2s weekly at the same HR.') }),
        TM('wg_assault_bike', { sets: 1, duration: '12min', intensity: 'Z2-Z3', basis: 'hr', rest: '2min', ...P('تحمل هوائي على الأسولت بايك بإيقاع ثابت', 'Steady aerobic work on the air bike', 'aerobic') }),
        RUN('ad_zone_2_easy_run', { duration: '12min', intensity: 'Z2', basis: 'hr', ...P('جري سهل للقاعدة الهوائية وتحمل الأوتار', 'Easy running for the aerobic base and tendon tolerance', 'aerobic') }),
        DR('dr_double_under', { sets: 5, duration: '1min', rest: '1min', ...P('ممارسة الدابل أندر وأنت مرتاح: هدف ٣٠-٥٠ متواصل', 'Fresh double-under practice: aim for 30-50 unbroken', 'coordination') }),
        ...coolCF()
      ]
    },
    gymA: {
      title: t('قوة جمباز ستريكت + EMOM', 'Strict gymnastics strength + EMOM'),
      goal: t('بناء القوة الستريكت اللي بتحمي الكتف وبتخلي الكيب أكفأ.', 'Build the strict strength that protects the shoulders and makes kipping efficient.'),
      components: ['strength', 'technique', 'core', 'muscular_endurance'],
      rpe: 7, duration: 65,
      items: [
        cfGen(), ...shoulderPrep(),
        S('ex_pullup', 5, '4-6', '2', 'rir', '2min', { tempo: '2-1-1-0', ...P('قوة عقلة ستريكت (هدف ١٢+ متواصل)', 'Strict pull-up strength (goal 12+ unbroken)', 'strength'), ...N('لو أكتر من ١٠ ستريكت استخدم وزن إضافي ٥-١٠ كجم', 'If you have 10+ strict, add 5-10 kg') }),
        S('wg_pike_push_up', 5, '5-8', '2', 'rir', '2min', { ...P('قوة ضغط فوق الراس كتمهيد لـ HSPU', 'Overhead pressing strength toward HSPU', 'strength'), ...N('التقدم: بايك على بوكس ← HSPU ستريكت بأطباق تحت الراس ← HSPU كامل', 'Progression: box pike → strict HSPU with abmats → full HSPU') }),
        DR('dr_toes_to_bar', { sets: 4, reps: '5', rest: '90s', ...P('تكنيك الكيب في التو تو بار: رجلين مقفولين وضرب الكيب بإيقاع', 'T2B kipping rhythm: legs together, timed kip', 'technique') }),
        WOD('emom', 'EMOM ١٢: (١) ١٢/١٠ كالوري أسولت بايك (٢) ٨ تو تو بار (٣) ١٢ وول بول ٩/٦ كجم', 'EMOM 12: (1) 12/10 cal air bike (2) 8 toes-to-bar (3) 12 wall balls 9/6 kg',
          { duration: '12min', intensity: '7', basis: 'rpe', ...P('تكرار حركات الأوبن الشائعة بجودة تحت تعب متوسط', 'Repeat common Open movements with quality under moderate fatigue', 'muscular_endurance'), ...N('معدّل: رفع ركب معلق، وول بول ٦/٤ كجم. لازم يفضل ١٥ ث راحة كل دقيقة.', 'Scaled: hanging knee raises, 6/4 kg wall ball. Keep 15s rest each minute.') }),
        S('ex_hollow_body_hold', 3, '30s', '7', 'rpe', '30s', P('ثبات الجذع للكيب والجمباز', 'Midline control for kipping and gymnastics', 'core')),
        ...coolCF()
      ]
    },
    strB: {
      title: t('ديدليفت + ضغط + كلين + ويد', 'Deadlift + press + clean + WOD'),
      goal: t('قوة السلسلة الخلفية والضغط، تكنيك الكلين، وويد متوسط بجري.', 'Posterior-chain and pressing strength, clean technique and a medium WOD with running.'),
      components: ['strength', 'power', 'aerobic', 'technique'],
      rpe: 7, duration: 75,
      items: [
        cfGen(), wu('ex_glute_bridge', { sets: 2, reps: '12' }),
        S('ex_deadlift', 4, '5', '70-77', '1rm', '2-3min', { tempo: '2-0-1-1', ...P('قوة الهينج بتراكم حجم', 'Hinge strength through volume accumulation', 'strength') }),
        S('ex_overhead_barbell_press', 4, '6', '67-72', '1rm', '2min', P('قوة الضغط الستريكت (أساس الجيرك والـ HSPU)', 'Strict pressing strength (base for jerks and HSPU)', 'strength')),
        S('ad_power_clean', 8, '2', '65-72', '1rm', 'EMOM', P('EMOM ٨: عدتين باور كلين بسرعة ودقة', 'EMOM 8: 2 power cleans, fast and precise', 'power')),
        WOD('fortime', '٤ جولات بأسرع وقت: ٤٠٠م جري، ١٠ باور كلين ٥٠/٣٥ كجم، ١٠ بيربي جانبي فوق البار', '4 rounds for time: 400m run, 10 power cleans 50/35 kg, 10 lateral bar burpees',
          { duration: '16min', intensity: '8', basis: 'rpe', ...P('ثبات الإيقاع في ويد متوسط (١٢-١٦ دقيقة) يجمع الجري والبار', 'Hold pace in a 12-16 min WOD combining running and the barbell', 'aerobic'), ...N('معدّل: ٤٠/٢٥ كجم. هدف: فرق الزمن بين أسرع وأبطأ جولة أقل من ٢٠ ث.', 'Scaled: 40/25 kg. Target: fastest and slowest rounds within 20s.') }),
        ...coolLegs()
      ]
    },
    mixA: {
      title: t('تشيبر طويل مختلط', 'Long mixed-modal chipper'),
      goal: t('تحمل عضلي وهوائي في ويد ٢٠-٢٥ دقيقة وتعلم تقسيم العدات.', 'Muscular and aerobic endurance in a 20-25 min WOD and learning to break up reps.'),
      components: ['muscular_endurance', 'aerobic', 'mental'],
      rpe: 8, duration: 60,
      items: [
        cfGen(), ...shoulderPrep(),
        WOD('chipper', 'تشيبر بأسرع وقت: ١٠٠٠م تجديف، ٥٠ وول بول، ٤٠ سوينج كيتل بيل، ٣٠ بوكس جامب أوفر، ٢٠ تو تو بار، ١٠ باور كلين', 'Chipper for time: 1000m row, 50 wall balls, 40 KB swings, 30 box jump-overs, 20 toes-to-bar, 10 power cleans',
          { duration: '25min', intensity: '7-8', basis: 'rpe', ...P('إدارة الإيقاع والتقسيم في ويد طويل', 'Pacing and rep-breaking in a long WOD', 'muscular_endurance'), ...N('RX: وول بول ٩/٦ كجم، سوينج ٢٤/١٦ كجم، بوكس ٦٠/٥٠ سم، كلين ٦٠/٤٠ كجم. معدّل: ٦/٤، ١٦/١٢، ستيب أوفر، رفع ركب، ٤٠/٢٥. خطة: الوول بول ٥×١٠ براحة ٥ أنفاس.', 'RX: 9/6 kg wall ball, 24/16 kg swing, 60/50 cm box, 60/40 kg clean. Scaled: 6/4, 16/12, step-overs, knee raises, 40/25. Plan: wall balls 5x10 with 5 breaths between.') }),
        S('ex_bulgarian_split_squat', 3, '8/leg', '2', 'rir', '90s', P('قوة رجل واحدة وتوازن الحوض', 'Single-leg strength and pelvic control', 'strength')),
        S('ex_side_plank', 2, '30s/side', '7', 'rpe', '30s', P('ثبات الجذع الجانبي', 'Lateral trunk stability', 'core')),
        ...coolCF()
      ]
    },
    strA2: {
      title: t('فرونت سكوات ثقيل + سناتش كومبلكس + لادر أوبن', 'Heavy front squat + snatch complex + Open-style ladder'),
      goal: t('قوة قصوى في الرجلين، سناتش أتقل، وويد سلم (لادر) زي الأوبن.', 'Max leg strength, heavier snatches and an Open-style ladder WOD.'),
      components: ['max_strength', 'power', 'anaerobic'],
      rpe: 8, duration: 75,
      items: [
        cfGen(), ...hipAnkle(),
        S('ex_front_squat', 5, '3', '80-86', '1rm', '3min', { tempo: '2-1-X-0', ...P('تكثيف: ٨٠٪ ثم ٨٣٪ ثم ٨٦٪، أسبوع التخفيف ٣×٣ على ٧٠٪', 'Intensification: 80%, 83%, 86%, deload 3x3 at 70%', 'max_strength'), ...N('النسبة من 1RM الفرونت (تقريبًا ٨٥٪ من السكوات الخلفي)', 'Percent of front squat 1RM (about 85% of back squat)') }),
        barbellWU('مسل سناتش، سناتش بالانس، أوفرهيد سكوات', 'muscle snatch, snatch balance, overhead squat'),
        S(null, 5, '1+1+1', '70-80', '1rm', '2min', { name: t('كومبلكس: هانج باور سناتش + باور سناتش + أوفرهيد سكوات', 'Complex: hang power snatch + power snatch + overhead squat'), ...P('قوة واستقرار السناتش بأوزان أعلى', 'Snatch strength and stability at higher loads', 'power') }),
        WOD('amrap', 'AMRAP ٨ لادر: ٣-٦-٩-١٢-١٥-١٨... جراوند تو أوفرهيد ٤٣/٢٩ كجم + بيربي فوق البار بنفس العدد', 'AMRAP 8 ladder: 3-6-9-12-15-18... ground-to-overhead 43/29 kg + the same number of bar-facing burpees',
          { duration: '8min', intensity: '9', basis: 'rpe', ...P('تحمل لاهوائي بصيغة أوبن كلاسيكية وإدارة التقسيم لما العدات تكبر', 'Anaerobic endurance in a classic Open format and managing splits as reps climb', 'anaerobic'), ...N('معدّل: ٣٠/٢٠ كجم. السكور = إجمالي العدات. البيربي بإيقاع ثابت من غير وقوف.', 'Scaled: 30/20 kg. Score = total reps. Steady burpees, no standing rests.') }),
        ...coolLegs()
      ]
    },
    engB: {
      title: t('عتبة وVO2 — تجديف وجري', 'Threshold and VO2 — row and run'),
      goal: t('رفع العتبة اللاهوائية عشان تشتغل أسرع في ويدات ١٠-٢٠ دقيقة من غير انهيار.', 'Raise the threshold so you can go faster in 10-20 min WODs without blowing up.'),
      components: ['threshold', 'vo2max', 'aerobic'],
      rpe: 8, duration: 60,
      items: [
        cfGen(),
        WODL('dr_rower_intervals', 'intervals', { sets: 6, reps: '1', distance: '500m', intensity: '8', basis: 'rpe', rest: '1:30', ...P('فترات عتبة: سرعة الـ ٢٠٠٠م ناقص ١-٢ ث/٥٠٠م', 'Threshold intervals: 2k test pace minus 1-2s/500m', 'threshold'), ...N('كل الفترات لازم تكون في حدود ٢ ث من بعض. أسبوع ٨ (صدمة): ٧ فترات.', 'All reps within 2s of each other. Week 8 (shock): 7 reps.') }),
        RUN('ex_interval_running', { sets: 1, reps: '6', distance: '400m', intensity: '9', basis: 'rpe', rest: '90s', restType: 'walk', ...P('فترات VO2 في الجري', 'VO2 intervals on the run', 'vo2max'), ...N('سرعة تقدر تكررها ٦ مرات بنفس الزمن تقريبًا', 'A pace you can repeat six times at nearly the same time') }),
        WODL('dr_double_under', 'tabata', { name: t('تاباتا دابل أندر: ٢٠ث شغل / ١٠ث راحة × ٨', 'Double-under Tabata: 20s on / 10s off x 8'), duration: '4min', intensity: '8', basis: 'rpe', ...P('دابل أندر تحت تعب النفس', 'Double-unders under breathing fatigue', 'coordination'), ...N('السكور = أقل جولة. معدّل: سينجل أندر ×٢', 'Score = lowest round. Scaled: single-unders x2') }),
        ...coolCF()
      ]
    },
    gymB: {
      title: t('حجم جمباز تحت التعب', 'Gymnastics volume under fatigue'),
      goal: t('تشست تو بار وHSPU وتو تو بار بحجم عالي مع نبض مرتفع زي الأوبن.', 'High-volume chest-to-bar, HSPU and toes-to-bar with an elevated heart rate, like the Open.'),
      components: ['muscular_endurance', 'technique', 'strength'],
      rpe: 8, duration: 65,
      items: [
        cfGen(), ...shoulderPrep(),
        DR(null, { name: t('تشست تو بار بالكيب + محاولات بار مسل أب (أو ترانزشن بالأستك)', 'Kipping chest-to-bar + bar muscle-up attempts (or banded transitions)'), sets: 5, reps: '3-5', rest: '90s', ...P('تطوير الكيب القوي والوصول بالصدر للبار', 'Develop a powerful kip and chest contact', 'technique') }),
        WOD('emom', 'EMOM ١٦ (يزيد دقيقتين أسبوعيًا): (١) ٨-١٢ تشست تو بار (٢) ٦-٨ HSPU بالكيب (٣) ١٥/١٢ كالوري تجديف (٤) راحة', 'EMOM 16 (add 2 min weekly): (1) 8-12 chest-to-bar (2) 6-8 kipping HSPU (3) 15/12 cal row (4) rest',
          { duration: '16min', intensity: '8', basis: 'rpe', ...P('تحمل عضلي في الجمباز مع نبض عالي', 'Gymnastics muscular endurance with an elevated heart rate', 'muscular_endurance'), ...N('معدّل: عقلة عادية، HSPU بأطباق أو بايك. لو فشلت تكمل العدات في الدقيقة قلل ٢ عدة.', 'Scaled: regular pull-ups, abmat or pike HSPU. If you fail to finish in the minute, drop 2 reps.') }),
        S('dr_toes_to_bar', 4, '10-15', '2', 'rir', '90s', P('حجم تو تو بار بمجموعات متواصلة', 'Toes-to-bar volume in unbroken sets', 'muscular_endurance')),
        S('wg_l_sit_hold', 3, '20s', '8', 'rpe', '40s', P('قوة الجذع وضغط الكتف لتحت', 'Trunk strength and shoulder depression', 'core')),
        ...coolCF()
      ]
    },
    strB2: {
      title: t('ديدليفت ثقيل + كلين آند جيرك + ويد دمبل', 'Heavy deadlift + clean and jerk + dumbbell WOD'),
      goal: t('قوة قصوى في الهينج، كلين آند جيرك أتقل، وويد دمبل زي الأوبن.', 'Max hinge strength, heavier clean and jerks and an Open-style dumbbell WOD.'),
      components: ['max_strength', 'power', 'anaerobic'],
      rpe: 8, duration: 75,
      items: [
        cfGen(), wu('ex_glute_bridge', { sets: 2, reps: '12' }),
        S('ex_deadlift', 4, '3', '80-86', '1rm', '3min', { tempo: '1-0-X-1', ...P('قوة قصوى في السلسلة الخلفية', 'Max posterior-chain strength', 'max_strength') }),
        barbellWU('ديدليفت كلين، هاي بول، فرونت سكوات، بوش جيرك', 'clean deadlift, high pull, front squat, push jerk'),
        S(null, 6, '2', '75-85', '1rm', '2min', { name: t('كومبلكس: باور كلين + بوش جيرك (عدتين من كل واحد)', 'Complex: power clean + push jerk (2 each)'), ...P('كلين آند جيرك تحت وزن أتقل بتكنيك ثابت', 'Clean and jerk under heavier loads with consistent technique', 'power') }),
        WOD('amrap', 'AMRAP ١٢: ١٠ سناتش دمبل بالتبادل ٢٢.٥/١٥ كجم، ١٠ بوكس جامب أوفر، ١٠ تو تو بار', 'AMRAP 12: 10 alternating DB snatches 22.5/15 kg, 10 box jump-overs, 10 toes-to-bar',
          { duration: '12min', intensity: '8', basis: 'rpe', ...P('ويد أوبن كلاسيكي بثلاث حركات وإيقاع ثابت', 'A classic three-movement Open couplet/triplet at a steady pace', 'muscular_endurance'), ...N('معدّل: ١٥/١٠ كجم، ستيب أوفر، رفع ركب.', 'Scaled: 15/10 kg, step-overs, knee raises.') }),
        ...coolLegs()
      ]
    },
    mixB: {
      title: t('ويدين أوبن مع راحة', 'Two Open-style pieces with rest'),
      goal: t('تكرار جهدين عالين في نفس الجلسة وتعلم الاستشفاء السريع.', 'Repeat two hard efforts in one session and learn fast recovery.'),
      components: ['anaerobic', 'threshold', 'muscular_endurance', 'mental'],
      rpe: 9, duration: 60,
      items: [
        cfGen(), ...shoulderPrep(),
        WOD('amrap', 'الجزء أ — AMRAP ٩: ١٥ وول بول، ١٢ كالوري تجديف، ٩ ثراستر ٤٣/٢٩ كجم', 'Part A — AMRAP 9: 15 wall balls, 12 cal row, 9 thrusters 43/29 kg',
          { duration: '9min', intensity: '8', basis: 'rpe', ...P('إيقاع قريب من العتبة لمدة ٩ دقايق', 'Near-threshold pace for 9 minutes', 'threshold'), ...N('معدّل: وول بول ٦/٤ كجم، ثراستر ٣٠/٢٠ كجم.', 'Scaled: 6/4 kg wall ball, 30/20 kg thrusters.') }),
        mobN('راحة ٤ دقايق: مشي وتنفس', '4-min rest: walk and breathe', { duration: '4min' }),
        WOD('fortime', 'الجزء ب — بأسرع وقت: ٥٠ دابل أندر، ٢٠ سوينج كيتل بيل ٢٤/١٦، ٥٠ دابل أندر، ١٠ تشست تو بار', 'Part B — for time: 50 double-unders, 20 KB swings 24/16, 50 double-unders, 10 chest-to-bar',
          { duration: '6min', intensity: '9', basis: 'rpe', ...P('جهد لاهوائي قصير بعد تعب مسبق', 'Short anaerobic effort under pre-fatigue', 'anaerobic'), ...N('معدّل: ١٠٠ سينجل أندر بدل كل ٥٠ دابل، عقلة عادية.', 'Scaled: 100 single-unders per 50 DU, regular pull-ups.') }),
        S('ex_walking_lunge', 3, '12/leg', '2', 'rir', '90s', P('قوة وتحمل عضلي للرجلين', 'Leg strength endurance', 'muscular_endurance')),
        ...coolCF()
      ]
    },
    strP: {
      title: t('قوة ثقيلة قليلة الحجم + مهارة', 'Heavy low-volume strength + skill'),
      goal: t('الحفاظ على القوة والإحساس بالوزن التقيل من غير تعب متراكم قبل وأثناء الأوبن.', 'Keep strength and a feel for heavy loads without accumulated fatigue before and during the Open.'),
      components: ['max_strength', 'power', 'technique'],
      rpe: 6, duration: 55,
      items: [
        cfGen(), ...hipAnkle(),
        S('ex_barbell_back_squat', 3, '2', '85-88', '1rm', '3min', { ...P('صيانة القوة القصوى بحجم قليل', 'Maintain max strength on low volume', 'max_strength'), ...N('في أسابيع الأوبن: ٢×٢ على ٨٠٪ بس', 'During Open weeks: only 2x2 at 80%') }),
        S(null, 8, '1', '80-85', '1rm', 'EMOM', { name: t('كلين آند جيرك EMOM ٨ مفردات', 'Clean and jerk EMOM 8 singles'), ...P('سرعة وثقة تحت الوزن التقيل', 'Speed and confidence under heavy loads', 'power') }),
        DR('dr_double_under', { sets: 3, reps: '50', rest: '60s', ...P('إبقاء المهارة حاضرة وأنت مرتاح', 'Keep the skill sharp while fresh', 'coordination') }),
        ...coolCF()
      ]
    },
    openSim: {
      title: t('محاكاة ويد أوبن بحكم', 'Judged Open workout simulation'),
      goal: t('تجربة يوم الأوبن كامل: الإحماء، الإيقاع المخطط، معايير الحكم، والتقسيم.', 'Rehearse the full Open day: warm-up, planned pacing, judging standards and splits.'),
      components: ['anaerobic', 'muscular_endurance', 'mental', 'tactics'],
      rpe: 9, duration: 60,
      items: [
        cfGen(),
        wuN('إحماء خاص ١٠ دقايق بنفس حركات الويد وبشدة متدرجة (نفس بروتوكول يوم الأوبن)', '10-min specific warm-up with the WOD movements at rising intensity (same protocol as Open day)', { duration: '10min' }),
        DR(null, { name: t('مراجعة المعايير مع الحكم: الوصول الكامل، لمس الصدر، قفل الكوع', 'Review standards with the judge: full lockout, chest contact, hip extension'), sets: 1, reps: '1', ...P('تقليل الـ No-rep اللي بيضيع وقت وطاقة', 'Minimise no-reps that waste time and energy', 'tactics') }),
        WOD('fortime', 'محاكاة أوبن — بأسرع وقت (حد ١٥ دقيقة): ٥ جولات من ١٢ تو تو بار + ١٥ كالوري تجديف + ٩ ثراستر ٤٣/٢٩ كجم، ثم أقصى باور كلين ٦٠/٤٠ كجم في الوقت الباقي', 'Open simulation — for time (15-min cap): 5 rounds of 12 toes-to-bar + 15 cal row + 9 thrusters 43/29 kg, then max power cleans 60/40 kg in the remaining time',
          { duration: '15min', intensity: '9-10', basis: 'rpe', ...P('أداء أقصى بخطة إيقاع مسبقة ومعايير رسمية', 'Max effort with a pre-set pacing plan and official standards', 'anaerobic'), ...N('ممكن تستبدله بويد أوبن من سنة سابقة. معدّل: رفع ركب، ٣٠/٢٠ كجم، ٤٠/٢٥ كجم. سجل زمن كل جولة وقارنه بالخطة.', 'Can be swapped for a previous-year Open workout. Scaled: knee raises, 30/20 kg, 40/25 kg. Log each round time against the plan.') }),
        mobN('تبريد: ١٠ دقايق بايك سهل وتنفس', 'Cool-down: 10 min easy bike and breathing', { duration: '10min' }),
        ...coolCF().slice(0, 2)
      ]
    },
    openDay: {
      title: t('يوم الأوبن — ويد الأسبوع الرسمي', 'Open day — official workout of the week'),
      goal: t('أداء ويد الأوبن المعلن بأفضل جاهزية وتسجيل السكور بشكل رسمي.', 'Perform the announced Open workout at best readiness and submit a valid score.'),
      components: ['anaerobic', 'muscular_endurance', 'mental'],
      rpe: 10, duration: 60,
      items: [
        cfGen(),
        wuN('إحماء خاص ١٥ دقيقة: جولتين بحركات الويد بشدة ٥٠ ثم ٧٠٪ + ٢-٣ دفعات قصيرة بشدة السباق ثم ٣-٥ دقايق راحة', '15-min specific warm-up: 2 rounds of the WOD movements at 50 then 70% + 2-3 short bursts at race pace, then 3-5 min rest', { duration: '15min' }),
        WOD('amrap', 'ويد الأوبن الرسمي للأسبوع (حسب الإعلان: AMRAP أو بأسرع وقت بحد زمني)', 'Official Open workout of the week (as announced: AMRAP or for time with a cap)',
          { duration: '20min', intensity: '10', basis: 'rpe', ...P('أفضل سكور ممكن بخطة تقسيم مكتوبة مسبقًا', 'Best possible score using a pre-written split plan', 'anaerobic'), ...N('اكتب الخطة قبلها بيوم: تقسيم العدات، الزمن المستهدف لكل جزء، وأماكن الراحة. اختار RX أو Scaled حسب اختبارات أسبوع ١١.', 'Write the plan the day before: rep splits, target split times and planned rest points. Choose RX or Scaled based on week-11 tests.') }),
        mobN('تبريد ١٠ دقايق بايك سهل ثم مرونة', '10-min easy bike cool-down then mobility', { duration: '10min' }),
        ...coolCF().slice(0, 2)
      ]
    },
    openRedo: {
      title: t('إعادة الأوبن (اختياري) أو مهارة خفيفة', 'Open redo (optional) or light skill'),
      goal: t('إعادة الويد لو في مكسب متوقع ٣٪ أو أكتر بتعديل الخطة، وإلا جلسة مهارة خفيفة.', 'Redo the workout if a 3%+ gain is likely with an adjusted plan; otherwise a light skill session.'),
      components: ['anaerobic', 'tactics', 'technique'],
      rpe: 8, duration: 60,
      items: [
        cfGen(),
        DR(null, { name: t('مراجعة فيديو المحاولة الأولى: فين ضاع الوقت (راحة، No-rep، تقسيم)', 'Review the first-attempt video: where time was lost (rests, no-reps, splits)'), sets: 1, reps: '1', ...P('قرار الإعادة مبني على بيانات مش إحساس', 'Base the redo decision on data, not feelings', 'tactics') }),
        WOD('amrap', 'إعادة ويد الأوبن بخطة معدلة (أو بديل: EMOM ١٠ مهارة خفيفة من حركات الويد بنسبة ٥٠٪)', 'Redo of the Open workout with the adjusted plan (or alternative: EMOM 10 light skill work on the WOD movements at 50%)',
          { duration: '20min', intensity: '10', basis: 'rpe', ...P('تحسين السكور من خلال تعديل الإيقاع والتقسيم', 'Improve the score by adjusting pacing and splits', 'anaerobic'), ...N('ما تعيدش لو النوم أو الاستشفاء ضعيف أو لو الويد طويل (أكتر من ١٥ دقيقة) والأسبوع الجاي قريب.', 'Skip the redo if sleep or recovery is poor, or if the WOD is long (15+ min) and the next week is close.') }),
        ...coolCF()
      ]
    },
    flush: {
      title: t('استشفاء هوائي ومرونة', 'Aerobic flush and mobility'),
      goal: t('تسريع الاستشفاء بين ويدات الأوبن بحركة سهلة ومرونة.', 'Speed up recovery between Open workouts with easy movement and mobility.'),
      components: ['recovery', 'aerobic', 'mobility'],
      rpe: 3, duration: 45,
      items: [
        TM('ad_steady_state_bike_ride', { duration: '20min', intensity: 'Z1-Z2', basis: 'hr', ...P('دورة دموية وتنشيط من غير إجهاد', 'Circulation and activation without stress', 'recovery') }),
        TM('ex_rowing_machine', { duration: '10min', intensity: '3', basis: 'rpe', ...P('حركة سهلة لكل الجسم', 'Easy whole-body movement', 'recovery') }),
        mob('wg_worlds_greatest_stretch', { sets: 2, reps: '3/side' }),
        ...coolLegs(),
        ...coolCF().slice(1)
      ]
    }
  }
};

/* ============ 3) كروس فيت — متسابق متقدم (16 أسبوع) ============ */
const T_CF_COMP = {
  id: 'pt_crossfit_comp_adv',
  sport: 'crossfit',
  level: 'advanced',
  title: t('كروس فيت — دورة متسابق ١٦ أسبوع (متقدم)', 'CrossFit — 16-week competitor cycle (advanced)'),
  goal: t('الوصول لقمة الأداء في بطولة (أونلاين أو حضوري) من خلال: قوة قصوى ورفعات أولمبية بنسب 1RM مخططة، حجم جمباز عالي المهارة، محرك هوائي يتطور من القاعدة للعتبة للـ VO2، ثم محاكاة أيام البطولة وتهدئة ٣ أسابيع.',
    'Peak for a competition (online or in-person) through planned %1RM strength and Olympic lifting, high-skill gymnastics volume, an engine built from base to threshold to VO2, then competition-day simulations and a 3-week taper.'),
  components: ['max_strength', 'power', 'technique', 'muscular_endurance', 'aerobic', 'threshold', 'vo2max', 'anaerobic', 'mental', 'recovery'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'accumulation',
      goal: t('تراكم: حجم قوة ٧٢-٧٨٪، أولمبي تكنيك ٧٠-٧٨٪، حجم جمباز عالي بجودة، وقاعدة هوائية طويلة (زون ٢-٣).', 'Accumulation: strength volume at 72-78%, Olympic technique at 70-78%, high-quality gymnastics volume and a long Z2-Z3 aerobic base.'),
      components: ['strength', 'technique', 'aerobic', 'muscular_endurance'],
      blocks: [
        {
          name: t('أسبوع ١ — اختبارات', 'Week 1 — Testing'),
          goal: t('1RM سناتش وكلين آند جيرك وسكوات خلفي، أقصى رينج مسل أب وHSPU ستريكت، ٢٠٠٠م تجديف وفران.', 'Snatch, clean and jerk and back squat 1RM, max ring muscle-ups and strict HSPU, 2000m row and Fran.'),
          components: ['max_strength', 'power', 'aerobic', 'anaerobic'],
          loads: [5],
          weekTypes: ['test'],
          pattern: ['tA', '', 'tB', '', 'tC', '', 'long1']
        },
        {
          name: t('بلوك ١ — تراكم (أسابيع ٢-٥)', 'Block 1 — Accumulation (weeks 2-5)'),
          goal: t('سكوات ٥×٥ على ٧٢ ← ٧٥ ← ٧٨٪ ثم ٦٠٪. أولمبي ثلاثيات وثنائيات ٧٠-٧٨٪. جمباز ٢٠٠-٣٠٠ عدة أسبوعيًا. هوائي ٩٠-١٢٠ دقيقة أسبوعيًا زون ٢-٣. أسبوع ٤ صدمة وأسبوع ٥ تخفيف.', 'Squat 5x5 at 72 → 75 → 78% then 60%. Olympic triples and doubles at 70-78%. 200-300 gymnastics reps weekly. 90-120 min of Z2-Z3 aerobic work weekly. Week 4 shock, week 5 deload.'),
          components: ['strength', 'technique', 'aerobic', 'muscular_endurance'],
          loads: [6, 7, 8, 4],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['sq1', 'aer1', 'gym1', '', 'cj1', 'mix1', 'long1']
        }
      ]
    },
    {
      type: 'transmutation',
      goal: t('تحويل: قوة ٨٢-٨٨٪، أولمبي ٨٠-٩٠٪، جمباز عالي المهارة تحت التعب، فترات عتبة وVO2، وويدات قصيرة بجهود متكررة.', 'Transmutation: strength at 82-88%, Olympic lifts at 80-90%, high-skill gymnastics under fatigue, threshold and VO2 intervals, and short repeated-effort WODs.'),
      components: ['max_strength', 'power', 'threshold', 'vo2max', 'muscular_endurance'],
      blocks: [
        {
          name: t('بلوك ٢ — تكثيف (أسابيع ٦-٩)', 'Block 2 — Intensification (weeks 6-9)'),
          goal: t('فرونت سكوات ٥×٣ على ٨٢ ← ٨٥ ← ٨٨٪ ثم ٧٠٪. سناتش وكلين آند جيرك ٨٠-٩٠٪ مفردات وثنائيات. فترات عتبة ٤×٨ دقايق. أسبوع ٨ صدمة وأسبوع ٩ تخفيف.', 'Front squat 5x3 at 82 → 85 → 88% then 70%. Snatch and clean and jerk at 80-90% singles and doubles. Threshold 4x8 min. Week 8 shock, week 9 deload.'),
          components: ['max_strength', 'power', 'threshold', 'vo2max'],
          loads: [7, 8, 9, 4],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['sq2', 'thr2', 'gym2', '', 'cj2', 'mix2', 'aer1']
        }
      ]
    },
    {
      type: 'realization',
      goal: t('تحقيق: محاكاة أيام بطولة (٣ إيفنتات في اليوم ليومين ورا بعض)، قمة قوة ٩٠-٩٥٪، ثم إعادة الاختبارات.', 'Realization: back-to-back competition-day simulations (3 events per day), strength peak at 90-95%, then retests.'),
      components: ['anaerobic', 'max_strength', 'mental', 'tactics', 'recovery'],
      blocks: [
        {
          name: t('بلوك ٣ — محاكاة البطولة (أسابيع ١٠-١٢)', 'Block 3 — Competition simulation (weeks 10-12)'),
          goal: t('يومين محاكاة ورا بعض كل أسبوع بإحماء وتغذية وتوقيتات البطولة. أسبوع ١١ صدمة، أسبوع ١٢ تخفيف بمحاكاة يوم واحد مختصرة.', 'Two back-to-back simulation days weekly with competition warm-up, fuelling and timing. Week 11 shock, week 12 deload with one shortened day.'),
          components: ['anaerobic', 'muscular_endurance', 'mental', 'tactics'],
          loads: [8, 9, 5],
          weekTypes: ['load', 'shock', 'deload'],
          pattern: ['pk', 'thr2', 'gym2', '', 'sim1', 'sim2', 'aer1']
        },
        {
          name: t('أسبوع ١٣ — إعادة الاختبارات', 'Week 13 — Retest'),
          goal: t('نفس اختبارات الأسبوع الأول لتأكيد المكسب وضبط أوزان الافتتاح في البطولة.', 'Repeat week-1 tests to confirm gains and set competition opening attempts.'),
          components: ['max_strength', 'power', 'aerobic'],
          loads: [6],
          weekTypes: ['test'],
          pattern: ['tA', '', 'tB', '', 'tC', '', 'aer1']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('تهدئة: الحجم ينزل ٤٠-٦٠٪ والشدة تفضل عالية، عشان التعب يروح والجاهزية تطلع لأعلى مستوى يوم البطولة.', 'Taper: volume drops 40-60% while intensity stays high, so fatigue clears and readiness peaks on competition day.'),
      components: ['power', 'anaerobic', 'recovery', 'mental'],
      blocks: [
        {
          name: t('أسابيع ١٤-١٥ — تهدئة تدريجية', 'Weeks 14-15 — Progressive taper'),
          goal: t('أسبوع ١٤: الحجم -٤٠٪ مع محاكاة مصغرة. أسبوع ١٥: الحجم -٥٥٪، مفردات ٨٥-٩٠٪ وجهود قصيرة حادة.', 'Week 14: volume -40% with a mini simulation. Week 15: volume -55%, singles at 85-90% and short sharp efforts.'),
          components: ['power', 'anaerobic', 'recovery'],
          loads: [6, 4],
          weekTypes: ['taper', 'taper'],
          pattern: ['tpA', 'aer1', 'tpB', '', 'tpSim', '', '']
        },
        {
          name: t('أسبوع ١٦ — أسبوع البطولة', 'Week 16 — Competition week'),
          goal: t('جلستين تنشيط خفاف (Primer) ثم يومين بطولة. نوم، تغذية، وخطة لكل إيفنت.', 'Two light primer sessions, then two competition days. Sleep, fuelling and an event-by-event plan.'),
          components: ['mental', 'recovery', 'anaerobic'],
          loads: [3],
          weekTypes: ['comp'],
          pattern: ['tpA', '', 'tpB', '', 'compD', 'compD', '']
        }
      ]
    }
  ],
  sessions: {
    tA: {
      title: t('اختبار: 1RM سناتش وكلين آند جيرك', 'Test: snatch and clean and jerk 1RM'),
      goal: t('تحديد الحد الأقصى في الرفعات الأولمبية لحساب النسب.', 'Establish Olympic lift maxes to set percentages.'),
      components: ['power', 'max_strength', 'technique'],
      rpe: 9, duration: 90,
      items: [
        cfGen(), ...hipAnkle(), ...shoulderPrep(),
        barbellWU('مسل سناتش، سناتش بالانس، أوفرهيد سكوات', 'muscle snatch, snatch balance, overhead squat'),
        S(null, 6, '1', '85-100', '1rm', '2min', { name: t('سناتش — بناء لـ 1RM', 'Snatch — build to 1RM'), ...P('اختبار أقصى سناتش (سكوات أو باور)', 'Snatch max test (squat or power)', 'power'), ...N('٥٠٪×٣، ٦٠٪×٢، ٧٠٪×٢، ٨٠٪×١، ٨٥٪×١ ثم مفردات بزيادة ٢-٣ كجم. أقصى ٣ محاولات فاشلة.', '50%x3, 60%x2, 70%x2, 80%x1, 85%x1 then singles adding 2-3 kg. Max 3 misses.') }),
        S(null, 6, '1', '85-100', '1rm', '2-3min', { name: t('كلين آند جيرك — بناء لـ 1RM', 'Clean and jerk — build to 1RM'), ...P('اختبار أقصى كلين آند جيرك', 'Clean and jerk max test', 'power') }),
        ...coolCF()
      ]
    },
    tB: {
      title: t('اختبار: 1RM سكوات خلفي + جمباز أقصى', 'Test: back squat 1RM + max gymnastics'),
      goal: t('القوة القصوى في الرجلين والقوة/التحمل في الجمباز.', 'Max leg strength and gymnastics strength-endurance.'),
      components: ['max_strength', 'muscular_endurance', 'strength'],
      rpe: 9, duration: 90,
      items: [
        cfGen(), ...hipAnkle(),
        wuN('صعود: البار ×١٠، ٥٠٪×٥، ٦٥٪×٣، ٧٥٪×٢، ٨٥٪×١، ٩٢٪×١', 'Ramp: bar x10, 50%x5, 65%x3, 75%x2, 85%x1, 92%x1', { sets: 6, reps: '10-5-3-2-1-1' }),
        S('ex_barbell_back_squat', 3, '1', '97-103', '1rm', '4min', P('اختبار 1RM سكوات خلفي', 'Back squat 1RM test', 'max_strength')),
        S(null, 1, 'max unbroken', '10', 'rpe', '5min', { name: t('أقصى رينج مسل أب متواصل', 'Max unbroken ring muscle-ups'), ...P('تحمل الجمباز عالي المهارة', 'High-skill gymnastics endurance', 'muscular_endurance') }),
        S('wg_wall_handstand_push_up', 1, 'max strict', '10', 'rpe', '5min', P('أقصى HSPU ستريكت', 'Max strict HSPU', 'strength')),
        S('ex_pullup', 1, 'max strict', '10', 'rpe', '3min', P('أقصى عقلة ستريكت', 'Max strict pull-ups', 'strength')),
        ...coolLegs()
      ]
    },
    tC: {
      title: t('اختبار: ٢٠٠٠م تجديف + فران', 'Test: 2000m row + Fran'),
      goal: t('قياس المحرك الهوائي والقدرة اللاهوائية في نفس الجلسة.', 'Measure aerobic engine and anaerobic capacity in one session.'),
      components: ['threshold', 'anaerobic', 'aerobic'],
      rpe: 10, duration: 90,
      items: [
        cfGen(),
        WODL('ex_rowing_machine', 'fortime', { name: t('٢٠٠٠م تجديف بأسرع وقت', '2000m row for time'), distance: '2000m', intensity: '10', basis: 'rpe', ...P('اختبار العتبة؛ متوسط الـ ٥٠٠م مرجع كل فترات التجديف', 'Threshold test; average /500m sets every rowing interval', 'threshold'), ...N('مستهدف متقدم: رجال أقل من ٦:٥٠، سيدات أقل من ٧:٥٠', 'Advanced targets: men sub-6:50, women sub-7:50') }),
        mobN('راحة ٣٠ دقيقة: مشي، بايك سهل، وإحماء خاص للثراستر والعقلة', '30-min rest: walk, easy bike and a specific thruster/pull-up warm-up', { duration: '30min' }),
        WOD('fortime', 'فران بأسرع وقت ٢١-١٥-٩: ثراستر ٤٣/٢٩ كجم وعقلة', 'Fran for time 21-15-9: thrusters 43/29 kg and pull-ups',
          { duration: '8min', intensity: '10', basis: 'rpe', ...P('القدرة اللاهوائية ودورة البار السريعة', 'Anaerobic capacity and fast barbell cycling', 'anaerobic'), ...N('مستهدف متقدم: أقل من ٣:٣٠. خطة: ٢١ متواصل أو ١٢-٩، ١٥ متواصل، ٩ متواصل.', 'Advanced target: sub-3:30. Plan: 21 unbroken or 12-9, 15 unbroken, 9 unbroken.') }),
        ...coolCF()
      ]
    },
    sq1: {
      title: t('سكوات + سناتش تراكم + ويد قصير', 'Squat + snatch accumulation + short WOD'),
      goal: t('حجم قوة الرجلين وتكنيك السناتش بثلاثيات، وويد قصير عالي الجودة.', 'Leg strength volume and snatch technique with triples, plus a short high-quality WOD.'),
      components: ['strength', 'technique', 'power', 'anaerobic'],
      rpe: 7, duration: 90,
      items: [
        cfGen(), ...hipAnkle(),
        barbellWU('مسل سناتش، سناتش بالانس، أوفرهيد سكوات', 'muscle snatch, snatch balance, overhead squat'),
        S(null, 5, '3', '70-78', '1rm', '2min', { name: t('سناتش (هانج + من الأرض + من الأرض)', 'Snatch complex (hang + floor + floor)'), ...P('تثبيت المسار والسرعة تحت البار بحجم عالي', 'Groove bar path and turnover under volume', 'technique'), ...N('٧٠٪ ← ٧٣٪ ← ٧٨٪، تخفيف ٦٥٪', '70% → 73% → 78%, deload 65%') }),
        S('ex_barbell_back_squat', 5, '5', '72-78', '1rm', '3min', { tempo: '3-1-1-0', ...P('تراكم قوة: ٧٢ ← ٧٥ ← ٧٨٪، تخفيف ٣×٥ على ٦٠٪', 'Accumulation: 72 → 75 → 78%, deload 3x5 at 60%', 'strength') }),
        WOD('fortime', '٣ جولات بأسرع وقت: ١٥ سناتش باور ٤٣/٢٩ كجم، ١٥ بار فيسنج بيربي، ١٥ كالوري بايك', '3 rounds for time: 15 power snatches 43/29 kg, 15 bar-facing burpees, 15 cal bike',
          { duration: '10min', intensity: '8', basis: 'rpe', ...P('دورة بار سريعة وقدرة لاهوائية', 'Fast barbell cycling and anaerobic power', 'anaerobic'), ...N('مستهدف: ٧-٨ دقايق. السناتش ٨+٧ أو متواصل بتاتش آند جو.', 'Target: 7-8 min. Snatches 8+7 or unbroken touch-and-go.') }),
        S('ex_nordic_hamstring_curl', 3, '5', '8', 'rpe', '90s', { tempo: '4-0-X-0', ...P('وقاية الأوتار الخلفية مع حجم الجري والسبرنت', 'Hamstring protection given running and sprint volume', 'prevention') }),
        ...coolLegs()
      ]
    },
    aer1: {
      title: t('محرك هوائي — فترات طويلة متعددة الأجهزة', 'Aerobic engine — long multi-modal intervals'),
      goal: t('رفع السعة الهوائية والكفاءة على كل الأجهزة (تجديف، سكي، بايك، جري).', 'Raise aerobic capacity and efficiency across modalities (row, ski, bike, run).'),
      components: ['aerobic', 'recovery', 'coordination'],
      rpe: 5, duration: 70,
      items: [
        cfGen(),
        WOD('intervals', '٣ جولات × ١٢ دقيقة (راحة ٣ دقايق): ٤ دقايق تجديف، ٤ دقايق سكي إرج، ٤ دقايق أسولت بايك', '3 rounds x 12 min (3 min rest): 4 min row, 4 min SkiErg, 4 min air bike',
          { duration: '45min', intensity: 'Z2-Z3', basis: 'hr', ...P('حجم هوائي عالي بشدة قليلة لتحسين الاستشفاء وتحمل الويدات الطويلة', 'High aerobic volume at low intensity to improve recovery and long-WOD endurance', 'aerobic'), ...N('تنفس من الأنف أغلب الوقت. في بلوك التحويل والتهدئة استخدمها كجلسة استشفاء ٣٠-٤٠ دقيقة زون ٢ بس.', 'Mostly nasal breathing. In the transmutation block and taper use it as a 30-40 min Z2-only recovery session.') }),
        DR('dr_double_under', { sets: 4, reps: '50', rest: '60s', ...P('صيانة مهارة الدابل أندر', 'Maintain double-under skill', 'coordination') }),
        S('ad_turkish_get_up', 3, '2/side', '7', 'rpe', '60s', P('ثبات الكتف والجذع', 'Shoulder and trunk stability', 'prevention')),
        ...coolCF()
      ]
    },
    gym1: {
      title: t('حجم جمباز عالي المهارة', 'High-skill gymnastics volume'),
      goal: t('رينج مسل أب، HSPU، مشي على اليدين، تسلق الحبل، وبيستول بحجم عالي وجودة.', 'Ring muscle-ups, HSPU, handstand walking, rope climbs and pistols with high volume and quality.'),
      components: ['muscular_endurance', 'technique', 'strength', 'balance'],
      rpe: 7, duration: 80,
      items: [
        cfGen(), ...shoulderPrep(),
        DR(null, { name: t('مشي على اليدين ١٥م × ٨ + ثبات ٣٠ث', 'Handstand walk 15m x 8 + 30s freestanding holds'), sets: 8, distance: '15m', rest: '60s', ...P('توازن وتحكم في وضع المقلوب', 'Inverted balance and control', 'balance') }),
        S(null, 5, '5-7', '2', 'rir', '2min', { name: t('رينج مسل أب بالكيب — مجموعات متواصلة', 'Kipping ring muscle-ups — unbroken sets'), ...P('تحمل رينج مسل أب بجودة (هدف ١٠+ متواصل)', 'Quality ring muscle-up endurance (goal 10+ unbroken)', 'muscular_endurance') }),
        S('wg_wall_handstand_push_up', 5, '6-10', '2', 'rir', '90s', { name: t('HSPU ستريكت بديفيسيت ٥-١٠ سم', 'Strict deficit HSPU (5-10 cm)'), ...P('قوة ضغط فوق الراس بمدى أكبر', 'Overhead pressing strength through extended range', 'strength') }),
        WOD('emom', 'EMOM ١٥: (١) ٢ تسلق حبل ٤.٥م (٢) ١٠ بيستول بالتبادل (٣) ١٥ تو تو بار', 'EMOM 15: (1) 2 rope climbs 4.5m (2) 10 alternating pistols (3) 15 toes-to-bar',
          { duration: '15min', intensity: '7', basis: 'rpe', ...P('حجم جمباز متنوع بإيقاع ثابت', 'Varied gymnastics volume at a steady pace', 'muscular_endurance'), ...N('أسبوع ٤ (صدمة): EMOM ٢١. في التخفيف: EMOM ٩.', 'Week 4 (shock): EMOM 21. Deload: EMOM 9.') }),
        S('wg_l_sit_hold', 3, '30s', '8', 'rpe', '45s', P('قوة الجذع وضغط الكتف', 'Trunk strength and shoulder depression', 'core')),
        ...coolCF()
      ]
    },
    cj1: {
      title: t('كلين آند جيرك + ديدليفت + ويد', 'Clean and jerk + deadlift + WOD'),
      goal: t('تكنيك الكلين آند جيرك بثنائيات، قوة الهينج، وويد متوسط.', 'Clean and jerk technique with doubles, hinge strength and a medium WOD.'),
      components: ['power', 'strength', 'technique', 'muscular_endurance'],
      rpe: 7, duration: 90,
      items: [
        cfGen(), wu('ex_glute_bridge', { sets: 2, reps: '12' }),
        barbellWU('ديدليفت كلين، هاي بول، مسل كلين، فرونت سكوات، بوش جيرك', 'clean deadlift, high pull, muscle clean, front squat, push jerk'),
        S(null, 5, '2+1', '70-78', '1rm', '2min', { name: t('كومبلكس: ٢ كلين + ١ سبليت جيرك', 'Complex: 2 cleans + 1 split jerk'), ...P('ربط الكلين بالجيرك بثقة ودقة', 'Link clean to jerk with precision', 'technique') }),
        S('ad_clean_pull', 3, '3', '90-100', '1rm', '2min', { ...P('قوة السحب للكلين (النسبة من 1RM الكلين)', 'Clean pulling strength (percent of clean 1RM)', 'strength') }),
        S('ex_deadlift', 4, '5', '72-78', '1rm', '3min', P('حجم قوة السلسلة الخلفية', 'Posterior-chain strength volume', 'strength')),
        WOD('amrap', 'AMRAP ١٤: ٥ رينج مسل أب، ١٠ كلين آند جيرك ٦١/٤٣ كجم (جريس الخفيفة)، ٢٠٠م جري', 'AMRAP 14: 5 ring muscle-ups, 10 clean and jerks 61/43 kg, 200m run',
          { duration: '14min', intensity: '8', basis: 'rpe', ...P('جمباز وبار متوسط تحت إيقاع ثابت', 'Gymnastics and a moderate barbell at a steady pace', 'muscular_endurance'), ...N('الكلين آند جيرك مفردات سريعة (تاتش آند جو ممنوع لو بيبوظ الضهر). هدف: ٦+ جولات.', 'Clean and jerks as fast singles. Goal: 6+ rounds.') }),
        ...coolLegs()
      ]
    },
    mix1: {
      title: t('ويد مختلط ٢٠-٢٥ دقيقة + إكسسوري', 'Mixed-modal 20-25 min WOD + accessories'),
      goal: t('تحمل عضلي وهوائي في ويدات متوسطة وطويلة مع تمارين وقاية.', 'Muscular and aerobic endurance in medium-long WODs plus prehab accessories.'),
      components: ['muscular_endurance', 'aerobic', 'prevention'],
      rpe: 8, duration: 75,
      items: [
        cfGen(), ...shoulderPrep(),
        WOD('fortime', '٥ جولات بأسرع وقت: ٤٠٠م جري، ٢٠ وول بول ٩/٦ كجم، ١٥ سوينج أمريكي ٣٢/٢٤ كجم، ١٠ تشست تو بار', '5 rounds for time: 400m run, 20 wall balls 9/6 kg, 15 American KB swings 32/24 kg, 10 chest-to-bar',
          { duration: '25min', intensity: '7-8', basis: 'rpe', ...P('إيقاع ثابت في ويد طويل بحركات متعددة', 'Steady pacing through a long multi-movement WOD', 'muscular_endurance'), ...N('مستهدف: ١٨-٢١ دقيقة، والجولات في حدود ١٥ ث من بعض.', 'Target: 18-21 min with rounds within 15s of each other.') }),
        S('ex_bulgarian_split_squat', 3, '8/leg', '2', 'rir', '90s', P('قوة رجل واحدة وتوازن', 'Single-leg strength and balance', 'strength')),
        S('ex_copenhagen_plank', 3, '20s/side', '7', 'rpe', '45s', P('وقاية منطقة الحوض والضامة', 'Groin and adductor prevention', 'prevention')),
        S('ex_band_pull_apart', 3, '20', '6', 'rpe', '45s', P('توازن عضلات الكتف مع حجم الضغط والجمباز', 'Shoulder balance given pressing and gymnastics volume', 'prevention')),
        ...coolCF()
      ]
    },
    long1: {
      title: t('جلسة طويلة زون ٢-٣ (شريك أو فردي)', 'Long Z2-Z3 session (partner or solo)'),
      goal: t('حجم هوائي طويل (٤٥-٦٠ دقيقة) بحركات متنوعة لتحمل أيام البطولة الطويلة.', 'Long aerobic volume (45-60 min) with varied movements to handle long competition days.'),
      components: ['aerobic', 'muscular_endurance', 'mental'],
      rpe: 6, duration: 80,
      items: [
        cfGen(),
        WOD('amrap', 'AMRAP ٤٥ بإيقاع زون ٣: ٨٠٠م جري، ٤٠٠م تجديف، ٢٠ لانج مشي بدمبل ٢×٢٢.٥/١٥ كجم، ١٥ بوكس ستيب أوفر، ١٠ ديفل بريس ٢×٢٢.٥/١٥ كجم', 'AMRAP 45 at Z3 pace: 800m run, 400m row, 20 DB walking lunges 2x22.5/15 kg, 15 box step-overs, 10 devil presses 2x22.5/15 kg',
          { duration: '45min', intensity: 'Z3', basis: 'hr', ...P('تحمل هوائي طويل مع شغل عضلي خفيف', 'Long aerobic endurance with light muscular work', 'aerobic'), ...N('ما تعديش زون ٣؛ لو النبض طلع امشي. مع شريك: كل واحد يعمل جولة كاملة بالتبادل (٦٠ دقيقة).', 'Do not exceed Z3; walk if HR climbs. With a partner: alternate full rounds (60 min).') }),
        S('ex_hip_thrust', 3, '10', '2', 'rir', '90s', P('قوة الألوية لحماية الضهر والركبة', 'Glute strength to protect back and knees', 'prevention')),
        ...coolLegs()
      ]
    },
    sq2: {
      title: t('فرونت سكوات ثقيل + سناتش ثقيل + سبرنت', 'Heavy front squat + heavy snatch + sprint'),
      goal: t('قوة قصوى وقدرة عالية في الرجلين والسناتش، وويد سبرنت قصير.', 'Max leg strength and snatch power, plus a short sprint WOD.'),
      components: ['max_strength', 'power', 'anaerobic'],
      rpe: 8, duration: 90,
      items: [
        cfGen(), ...hipAnkle(),
        barbellWU('مسل سناتش، سناتش بالانس، أوفرهيد سكوات', 'muscle snatch, snatch balance, overhead squat'),
        S(null, 6, '2', '80-88', '1rm', '2min', { name: t('سناتش — ثنائيات ثم مفردات', 'Snatch — doubles then singles'), ...P('سناتش تقيل بتكنيك ثابت: ٢×٢ على ٨٠٪، ٢×٢ على ٨٥٪، ٢×١ على ٨٨-٩٠٪', 'Heavy snatches with stable technique: 2x2 at 80%, 2x2 at 85%, 2x1 at 88-90%', 'power') }),
        S('ex_front_squat', 5, '3', '82-88', '1rm', '3min', { tempo: '2-1-X-0', ...P('تكثيف: ٨٢ ← ٨٥ ← ٨٨٪، تخفيف ٣×٣ على ٧٠٪', 'Intensification: 82 → 85 → 88%, deload 3x3 at 70%', 'max_strength') }),
        WOD('fortime', 'بأسرع وقت ٢١-١٥-٩: كالوري أسولت بايك وأوفرهيد سكوات ٤٣/٢٩ كجم', 'For time 21-15-9: air bike calories and overhead squats 43/29 kg',
          { duration: '7min', intensity: '9', basis: 'rpe', ...P('سبرنت لاهوائي مع ثبات فوق الراس تحت التعب', 'Anaerobic sprint with overhead stability under fatigue', 'anaerobic'), ...N('مستهدف: أقل من ٥ دقايق. الأوفرهيد متواصل.', 'Target: sub-5 min. Overhead squats unbroken.') }),
        ...coolLegs()
      ]
    },
    thr2: {
      title: t('عتبة وVO2 — فترات', 'Threshold and VO2 — intervals'),
      goal: t('رفع العتبة (أطول مدة بشدة عالية) والـ VO2max.', 'Raise threshold (longest sustainable hard pace) and VO2max.'),
      components: ['threshold', 'vo2max', 'aerobic'],
      rpe: 8, duration: 70,
      items: [
        cfGen(),
        WOD('intervals', '٤ × ٨ دقايق على العتبة (راحة ٢ دقيقة): تبادل تجديف / جري / سكي / بايك', '4 x 8 min at threshold (2 min rest): alternate row / run / ski / bike',
          { duration: '40min', intensity: 'Z4', basis: 'hr', ...P('العتبة: أقصى إيقاع ثابت تقدر تحافظ عليه ٣٠-٤٠ دقيقة', 'Threshold: the highest steady pace you can hold for 30-40 min', 'threshold'), ...N('التجديف: سرعة الـ ٢٠٠٠م + ٤-٦ ث/٥٠٠م. أسبوع ٨ (صدمة): ٥ فترات.', 'Row: 2k pace + 4-6s/500m. Week 8 (shock): 5 intervals.') }),
        WODL('ad_air_bike_calorie_sprints', 'intervals', { sets: 8, reps: '1', duration: '30s', intensity: '10', basis: 'rpe', rest: '90s', ...P('فترات VO2 وقدرة لاهوائية: ٣٠ث أقصى / ٩٠ث سهل', 'VO2 and anaerobic power: 30s max / 90s easy', 'vo2max'), ...N('سجل الكالوري في كل فترة؛ وقف لو نزلت أكتر من ١٥٪ عن أول فترة.', 'Log calories each rep; stop if output drops more than 15% below rep 1.') }),
        ...coolCF()
      ]
    },
    gym2: {
      title: t('جمباز عالي المهارة تحت التعب', 'High-skill gymnastics under fatigue'),
      goal: t('الحفاظ على جودة المسل أب والـ HSPU وتسلق الحبل من غير رجلين مع نبض عالي.', 'Keep muscle-up, HSPU and legless rope-climb quality with a high heart rate.'),
      components: ['muscular_endurance', 'technique', 'anaerobic'],
      rpe: 8, duration: 75,
      items: [
        cfGen(), ...shoulderPrep(),
        S('ad_rope_climb', 5, '1', '2', 'rir', '90s', { name: t('تسلق حبل من غير رجلين ٤.٥م', 'Legless rope climb 4.5m'), ...P('قوة السحب القصوى في مهارة بطولات', 'Max pulling strength in a competition skill', 'strength') }),
        WOD('intervals', '٥ جولات: ٢ دقيقة شغل / ١ دقيقة راحة — ١٥ كالوري تجديف ثم أقصى بار مسل أب في الباقي', '5 rounds: 2 min work / 1 min rest — 15 cal row then max bar muscle-ups in the remaining time',
          { duration: '15min', intensity: '9', basis: 'rpe', ...P('مسل أب بجودة بعد جهد هوائي عالي', 'Quality muscle-ups after a hard aerobic effort', 'muscular_endurance'), ...N('السكور = أقل جولة. مجموعات ٣-٥ مع راحة قصيرة جدًا بدل الفشل.', 'Score = lowest round. Sets of 3-5 with very short rests rather than failure.') }),
        WOD('emom', 'EMOM ١٢: (١) ٨ HSPU بالكيب ستريكت ستايل (٢) ١٥م مشي على اليدين (٣) ١٢ تو تو بار + ١٠ دابل أندر', 'EMOM 12: (1) 8 kipping HSPU (2) 15m handstand walk (3) 12 toes-to-bar + 10 double-unders',
          { duration: '12min', intensity: '8', basis: 'rpe', ...P('مهارات المقلوب والجذع تحت التعب', 'Inverted and midline skills under fatigue', 'technique') }),
        ...coolCF()
      ]
    },
    cj2: {
      title: t('كلين آند جيرك ثقيل + ويد متكرر', 'Heavy clean and jerk + repeat-effort WOD'),
      goal: t('كلين آند جيرك ٨٠-٩٠٪ وجهود متكررة بشدة عالية.', 'Clean and jerk at 80-90% and repeated high-intensity efforts.'),
      components: ['power', 'max_strength', 'anaerobic'],
      rpe: 8, duration: 90,
      items: [
        cfGen(), wu('ex_glute_bridge', { sets: 2, reps: '12' }),
        barbellWU('ديدليفت كلين، هاي بول، فرونت سكوات، سبليت جيرك', 'clean deadlift, high pull, front squat, split jerk'),
        S(null, 6, '1+1', '80-90', '1rm', '2-3min', { name: t('كلين + جيرك (١+١)', 'Clean + jerk (1+1)'), ...P('ثنائيات ٨٠-٨٥٪ ثم مفردات ٨٧-٩٠٪', 'Doubles at 80-85% then singles at 87-90%', 'power') }),
        S('ex_barbell_back_squat', 3, '3', '85', '1rm', '3min', P('صيانة القوة القصوى في السكوات الخلفي', 'Maintain back squat max strength', 'max_strength')),
        WOD('intervals', '٣ جولات × ٤ دقايق شغل / ٢ دقيقة راحة: ٣ كلين آند جيرك ٨٥/٦٠ كجم، ٩ بار فيسنج بيربي، ثم أقصى كالوري سكي في الباقي', '3 rounds x 4 min work / 2 min rest: 3 clean and jerks 85/60 kg, 9 bar-facing burpees, then max SkiErg calories in the remaining time',
          { duration: '18min', intensity: '9', basis: 'rpe', ...P('قدرة وكفاءة مع بار تقيل وتكرار الجهد', 'Power and efficiency with a heavy bar across repeated efforts', 'anaerobic') }),
        ...coolLegs()
      ]
    },
    mix2: {
      title: t('ويدات قصيرة متكررة (سبرنت ميكس)', 'Short repeat-effort sprint WODs'),
      goal: t('تحمل لاهوائي والاستشفاء السريع بين جهود قصيرة زي الهيتس في البطولات.', 'Anaerobic endurance and fast recovery between short efforts, like competition heats.'),
      components: ['anaerobic', 'muscular_endurance', 'mental'],
      rpe: 9, duration: 70,
      items: [
        cfGen(), ...shoulderPrep(),
        WOD('fortime', 'الهيت ١ (حد ٥ دقايق): ٣٠ وول بول ٩/٦ كجم، ١٥ باور كلين ٦١/٤٣ كجم، ٣٠ دابل أندر', 'Heat 1 (5-min cap): 30 wall balls 9/6 kg, 15 power cleans 61/43 kg, 30 double-unders',
          { duration: '5min', intensity: '9', basis: 'rpe', ...P('جهد قصير عالي جدًا', 'Very hard short effort', 'anaerobic') }),
        mobN('راحة ٦ دقايق: مشي وتنفس وتجهيز الهيت الجاي', '6-min rest: walk, breathe and set up the next heat', { duration: '6min' }),
        WOD('fortime', 'الهيت ٢ (حد ٦ دقايق): ٢١-١٥-٩ ثراستر ٤٣/٢٩ كجم وتشست تو بار', 'Heat 2 (6-min cap): 21-15-9 thrusters 43/29 kg and chest-to-bar',
          { duration: '6min', intensity: '9', basis: 'rpe', ...P('تكرار الجهد بعد استشفاء قصير', 'Repeat the effort after short recovery', 'anaerobic') }),
        mobN('راحة ٦ دقايق', '6-min rest', { duration: '6min' }),
        WOD('fortime', 'الهيت ٣ (حد ٦ دقايق): ١٠٠٠م تجديف ثم ٢٠ بيربي فوق التجديف', 'Heat 3 (6-min cap): 1000m row then 20 burpees over the rower',
          { duration: '6min', intensity: '9', basis: 'rpe', ...P('صلابة ذهنية وإيقاع تحت تعب متراكم', 'Mental toughness and pacing under accumulated fatigue', 'mental') }),
        ...coolCF()
      ]
    },
    pk: {
      title: t('قمة القوة — مفردات ثقيلة', 'Strength peak — heavy singles'),
      goal: t('تعود الجهاز العصبي على الأوزان ٩٠-٩٥٪ بحجم قليل جدًا.', 'Expose the nervous system to 90-95% loads with very low volume.'),
      components: ['max_strength', 'power'],
      rpe: 8, duration: 70,
      items: [
        cfGen(), ...hipAnkle(),
        S(null, 4, '1', '88-93', '1rm', '2-3min', { name: t('سناتش مفردات', 'Snatch singles'), ...P('قمة القدرة في السناتش', 'Peak snatch power', 'power'), ...N('أسبوع ١٢ (تخفيف): ٣ مفردات على ٨٥٪ بس', 'Week 12 (deload): 3 singles at 85% only') }),
        S(null, 4, '1', '88-93', '1rm', '3min', { name: t('كلين آند جيرك مفردات', 'Clean and jerk singles'), ...P('قمة القدرة في الكلين آند جيرك', 'Peak clean and jerk power', 'power') }),
        S('ex_barbell_back_squat', 2, '1', '90-95', '1rm', '4min', { ...P('قمة القوة القصوى في الرجلين', 'Peak max leg strength', 'max_strength'), ...N('+ مجموعة باك أوف ١×٣ على ٨٠٪', '+ one back-off set 1x3 at 80%') }),
        ...coolLegs()
      ]
    },
    sim1: {
      title: t('محاكاة البطولة — اليوم الأول (٣ إيفنتات)', 'Competition simulation — Day 1 (3 events)'),
      goal: t('محاكاة يوم بطولة: إيفنت رفع، سبرنت، وويد طويل، مع إحماء وتغذية بين الإيفنتات.', 'Simulate a competition day: a lifting event, a sprint and a long WOD, with warm-ups and fuelling between events.'),
      components: ['anaerobic', 'max_strength', 'muscular_endurance', 'mental', 'tactics'],
      rpe: 9, duration: 180,
      items: [
        cfGen(),
        wuN('إحماء إيفنت ١: سناتش تدريجي حتى ٨٥٪ خلال ١٥ دقيقة', 'Event 1 warm-up: build snatches to 85% over 15 min', { duration: '15min' }),
        S(null, 1, '1', '95-100', '1rm', '6min window', { name: t('إيفنت ١ — أقصى سناتش في ٦ دقايق', 'Event 1 — max snatch in a 6-min window'), ...P('أداء رفعة قصوى تحت ضغط الوقت والتوتر', 'Max lift under time pressure and stress', 'max_strength'), ...N('٣ محاولات: الافتتاح ٩٠٪ (مضمون)، التانية ٩٥٪، التالتة رقم قياسي. ما تبدأش بأكتر من ٩٠٪.', '3 attempts: open at 90% (sure make), second 95%, third a PR attempt. Never open above 90%.') }),
        WOD('fortime', 'إيفنت ٢ (حد ٦ دقايق، بعد ٦٠ دقيقة راحة): ٢١-١٥-٩ كالوري أسولت بايك وبار مسل أب', 'Event 2 (6-min cap, after 60 min rest): 21-15-9 air bike calories and bar muscle-ups',
          { duration: '6min', intensity: '10', basis: 'rpe', ...P('سبرنت لاهوائي بمهارة عالية', 'High-skill anaerobic sprint', 'anaerobic'), ...N('خلال الراحة: وجبة خفيفة (كربوهيدرات ٣٠-٥٠ جم) وسوائل وإلكتروليت.', 'During the break: a small snack (30-50 g carbs), fluids and electrolytes.') }),
        WOD('fortime', 'إيفنت ٣ (حد ٢٥ دقيقة، بعد ٩٠ دقيقة راحة): ٥ جولات — ٤٠٠م جري، ١٥ وول بول ٩/٦ كجم، ١٠ تشست تو بار، ٥ ديدليفت ١٢٥/٨٥ كجم', 'Event 3 (25-min cap, after 90 min rest): 5 rounds — 400m run, 15 wall balls 9/6 kg, 10 chest-to-bar, 5 deadlifts 125/85 kg',
          { duration: '25min', intensity: '8-9', basis: 'rpe', ...P('ويد طويل بإيقاع مخطط بعد إيفنتين', 'A long WOD with planned pacing after two events', 'muscular_endurance'), ...N('الجولة الأولى أبطأ ٥٪ من المستهدف، وسرّع من الجولة الرابعة.', 'Round 1 about 5% slower than target, push from round 4.') }),
        mobN('تبريد ١٠ دقايق بايك سهل + وجبة استشفاء (بروتين + كربوهيدرات) خلال ساعة', '10-min easy bike cool-down + recovery meal (protein + carbs) within an hour', { duration: '10min' }),
        ...coolLegs().slice(0, 2)
      ]
    },
    sim2: {
      title: t('محاكاة البطولة — اليوم التاني (٣ إيفنتات)', 'Competition simulation — Day 2 (3 events)'),
      goal: t('الأداء وأنت متعب من اليوم الأول: إيفنت تحمل، لادر رفع، وفاينال قصير.', 'Perform on day-1 fatigue: an endurance event, a lifting ladder and a short final.'),
      components: ['aerobic', 'power', 'anaerobic', 'mental'],
      rpe: 9, duration: 180,
      items: [
        cfGen(),
        WOD('fortime', 'إيفنت ٤ (حد ٢٠ دقيقة): ١٠٠٠م سكي إرج، ٢٠٠٠م بايك إرج، ١٦٠٠م جري', 'Event 4 (20-min cap): 1000m SkiErg, 2000m bike erg, 1600m run',
          { duration: '20min', intensity: '8', basis: 'rpe', ...P('تحمل هوائي على أجهزة مختلفة بعد يوم تعب', 'Multi-modal aerobic endurance on day-2 fatigue', 'aerobic') }),
        S(null, 6, '1', '80-92', '1rm', '45s per bar', { name: t('إيفنت ٥ — لادر كلين آند جيرك: بار أتقل كل ٤٥ ثانية', 'Event 5 — clean and jerk ladder: a heavier bar every 45s'), ...P('قدرة وسرعة قرار تحت الوقت', 'Power and quick decisions on the clock', 'power'), ...N('البارات من ٨٠٪ لـ ٩٢٪ بزيادات ٢-٣٪. الفشل يوقف اللادر.', 'Bars from 80% to 92% in 2-3% jumps. A miss ends the ladder.') }),
        WOD('fortime', 'إيفنت ٦ — فاينال (حد ١٠ دقايق): ٤٠ دابل أندر، ٢٠ HSPU، ٢٠ ثراستر ٦١/٤٣ كجم، ١٠ رينج مسل أب', 'Event 6 — final (10-min cap): 40 double-unders, 20 HSPU, 20 thrusters 61/43 kg, 10 ring muscle-ups',
          { duration: '10min', intensity: '10', basis: 'rpe', ...P('جهد أقصى في آخر إيفنت وأنت متراكم عليك تعب', 'Max effort in the final event under accumulated fatigue', 'anaerobic') }),
        mobN('تبريد ومرونة ١٠ دقايق + تقييم مكتوب لكل إيفنت (إيه اللي نجح وإيه اللي يتعدل)', '10-min cool-down and mobility + written review of each event (what worked, what to change)', { duration: '10min' }),
        ...coolCF().slice(0, 2)
      ]
    },
    tpA: {
      title: t('تهدئة — تنشيط رفعات وسرعة', 'Taper — lifting and speed primer'),
      goal: t('الحفاظ على الحدة العصبية بحجم قليل جدًا.', 'Keep neural sharpness with very low volume.'),
      components: ['power', 'max_strength', 'recovery'],
      rpe: 6, duration: 60,
      items: [
        cfGen(), ...hipAnkle(),
        S(null, 3, '1', '85-90', '1rm', '2min', { name: t('سناتش مفردات', 'Snatch singles'), ...P('حدة عصبية من غير تعب', 'Neural sharpness without fatigue', 'power') }),
        S(null, 3, '1', '85-90', '1rm', '2min', { name: t('كلين آند جيرك مفردات', 'Clean and jerk singles'), ...P('ثقة في أوزان الافتتاح', 'Confidence at opening loads', 'power') }),
        S('ex_front_squat', 2, '2', '80', '1rm', '2min', P('صيانة القوة', 'Maintain strength', 'max_strength')),
        WODL('ad_air_bike_calorie_sprints', 'intervals', { sets: 4, reps: '1', duration: '15s', intensity: '10', basis: 'rpe', rest: '2min', ...P('تنشيط الجهاز اللاهوائي من غير إرهاق', 'Prime the anaerobic system without fatigue', 'anaerobic') }),
        ...coolCF()
      ]
    },
    tpB: {
      title: t('تهدئة — مهارة جمباز وإيقاع', 'Taper — gymnastics skill and pacing'),
      goal: t('مهارات الجمباز بجودة عالية وحجم قليل، وتجربة الإيقاع لجهود قصيرة.', 'High-quality, low-volume gymnastics skills and pacing rehearsal for short efforts.'),
      components: ['technique', 'anaerobic', 'mental'],
      rpe: 6, duration: 55,
      items: [
        cfGen(), ...shoulderPrep(),
        DR(null, { name: t('مهارات: ٣×٣ رينج مسل أب، ٣×٥ HSPU، ٣×١٠م مشي على اليدين', 'Skills: 3x3 ring muscle-ups, 3x5 HSPU, 3x10m handstand walk'), sets: 3, reps: '3-5', rest: '90s', ...P('ثقة ومهارة وأنت مرتاح', 'Confidence and skill while fresh', 'technique') }),
        WOD('fortime', '٣ جولات: ٢٠٠م جري + ١٠ وول بول + ٥ تشست تو بار بإيقاع السباق، راحة ٣ دقايق بين الجولات', '3 rounds: 200m run + 10 wall balls + 5 chest-to-bar at race pace, 3 min rest between rounds',
          { duration: '12min', intensity: '8', basis: 'rpe', ...P('الإحساس بإيقاع البطولة من غير تعب', 'Feel competition pace without fatigue', 'anaerobic') }),
        ...coolCF()
      ]
    },
    tpSim: {
      title: t('تهدئة — محاكاة مصغرة', 'Taper — mini simulation'),
      goal: t('إيفنتين قصيرين بنص الحجم لمراجعة الإحماء والتغذية والإيقاع.', 'Two short events at half volume to rehearse warm-up, fuelling and pacing.'),
      components: ['anaerobic', 'mental', 'tactics'],
      rpe: 7, duration: 90,
      items: [
        cfGen(),
        WOD('fortime', 'إيفنت مصغر ١ (حد ٤ دقايق): ١٥-١٠-٥ كالوري بايك وبار مسل أب', 'Mini event 1 (4-min cap): 15-10-5 bike calories and bar muscle-ups',
          { duration: '4min', intensity: '9', basis: 'rpe', ...P('سبرنت قصير بجودة', 'Short, quality sprint', 'anaerobic') }),
        mobN('راحة ٤٥ دقيقة بتغذية البطولة المخططة', '45-min rest using the planned competition fuelling', { duration: '45min' }),
        WOD('fortime', 'إيفنت مصغر ٢ (حد ١٠ دقايق): ٣ جولات — ٤٠٠م جري، ١٢ وول بول، ٦ باور كلين ٧٠/٤٧ كجم', 'Mini event 2 (10-min cap): 3 rounds — 400m run, 12 wall balls, 6 power cleans 70/47 kg',
          { duration: '10min', intensity: '8', basis: 'rpe', ...P('إيقاع مخطط وتنفيذ هادي', 'Planned pacing and calm execution', 'tactics'), ...N('أسبوع ١٥: جولتين بس.', 'Week 15: only 2 rounds.') }),
        ...coolCF()
      ]
    },
    compD: {
      title: t('يوم البطولة', 'Competition day'),
      goal: t('تنفيذ خطة كل إيفنت: إحماء، إيقاع، تغذية، واستشفاء بين الإيفنتات.', 'Execute the plan for every event: warm-up, pacing, fuelling and recovery between events.'),
      components: ['mental', 'anaerobic', 'recovery', 'tactics'],
      rpe: 10, duration: 240,
      items: [
        wuN('إحماء عام ١٠ دقايق قبل كل إيفنت بـ ٣٠-٤٠ دقيقة + إحماء خاص بحركات الإيفنت', '10-min general warm-up 30-40 min before each event + a specific warm-up with the event movements', { duration: '25min' }),
        WOD('fortime', 'إيفنتات البطولة حسب الجدول الرسمي (لكل إيفنت خطة إيقاع وتقسيم مكتوبة)', 'Competition events per the official schedule (a written pacing and split plan for each)',
          { duration: '120min', intensity: '10', basis: 'rpe', ...P('أفضل أداء ممكن في كل إيفنت', 'Best possible performance in every event', 'anaerobic'), ...N('بين الإيفنتات: كربوهيدرات سريعة ٣٠-٦٠ جم/ساعة، سوائل وإلكتروليت، ولبس دافي. ركز على الإيفنت الجاي بس.', 'Between events: 30-60 g/h fast carbs, fluids and electrolytes, stay warm. Focus only on the next event.') }),
        mobN('تبريد بعد كل إيفنت: ٥-١٠ دقايق بايك سهل وتنفس', 'Cool-down after each event: 5-10 min easy bike and breathing', { duration: '10min' }),
        ...coolLegs()
      ]
    }
  }
};

/* ===== جلسات هايروكس متكررة (دوال عشان كل قالب ياخد نسخة مستقلة) ===== */
/* جري سهل زون ٢ + ستريدز */
const hxEasy = (dur, minutes, ar, en) => ({
  title: t('جري سهل زون ٢ + ستريدز', 'Easy Z2 run + strides'),
  goal: t('بناء القاعدة الهوائية (أساس ٦٠-٧٠٪ من زمن السباق جري) واستشفاء نشط.', 'Build the aerobic base (running is 60-70% of race time) and recover actively.'),
  components: ['aerobic', 'recovery', 'speed'],
  rpe: 4, duration: minutes,
  items: [
    RUN('ad_zone_2_easy_run', { duration: dur, intensity: 'Z2', basis: 'hr', ...P('حجم هوائي سهل بتنفس من الأنف وإيقاع تقدر تتكلم فيه', 'Easy aerobic volume, nasal breathing, conversational pace', 'aerobic'), ...N(ar, en) }),
    RUN('ad_strides', { sets: 1, reps: '6', distance: '100m', intensity: '85', basis: 'vmax', rest: '60s', restType: 'walk', ...P('كفاءة الخطوة والسرعة من غير تعب', 'Stride efficiency and speed without fatigue', 'speed') }),
    S('ex_single_leg_rdl', 2, '8/leg', '6', 'rpe', '45s', P('ثبات الكاحل والحوض للجري', 'Ankle and hip stability for running', 'prevention')),
    ...coolLegs()
  ]
});
/* اختبار ٥ كم + ١٠٠٠م تجديف */
const hxTT = (ar, en) => ({
  title: t('اختبار: ٥ كم جري + ١٠٠٠م تجديف', 'Test: 5 km run + 1000m row'),
  goal: t('تحديد سرعة الجري المرجعية (منها سرعة السباق والعتبة) وزمن التجديف.', 'Set the reference run pace (race and threshold paces come from it) and a row time.'),
  components: ['aerobic', 'threshold'],
  rpe: 9, duration: 75,
  items: [
    ...runWU(),
    RUN('wg_running', { name: t('٥ كم جري بأسرع وقت (تايم تريال)', '5 km time trial'), distance: '5km', intensity: '9', basis: 'rpe', rest: '15min', ...P('مرجع السرعات: سرعة السباق ≈ سرعة الـ ٥ كم + ٢٠-٤٥ ث/كم، والعتبة ≈ + ١٠-١٥ ث/كم', 'Pace anchor: race pace ≈ 5 km pace + 20-45 s/km, threshold ≈ + 10-15 s/km', 'threshold'), ...N(ar, en) }),
    WODL('dr_hyrox_row', 'fortime', { name: t('١٠٠٠م تجديف بأسرع وقت (بعد ١٥ دقيقة راحة)', '1000m row for time (after 15 min rest)'), distance: '1000m', intensity: '9', basis: 'rpe', ...P('زمن مرجعي لمحطة التجديف', 'Reference time for the row station', 'threshold'), ...N('دامبر ٥-٧. ابدأ ثابت وسرّع آخر ٢٥٠م.', 'Damper 5-7. Start steady, kick the last 250m.') }),
    ...coolLegs()
  ]
});
/* تنشيط أسبوع السباق */
const hxPrim = () => ({
  title: t('تنشيط قبل السباق (Primer)', 'Pre-race primer'),
  goal: t('تنشيط الجهاز العصبي والإحساس بإيقاع السباق من غير أي تعب.', 'Wake up the nervous system and feel race pace without any fatigue.'),
  components: ['speed', 'recovery', 'mental'],
  rpe: 4, duration: 40,
  items: [
    ...runWU(),
    RUN('dr_hyrox_run', { name: t('٤×٤٠٠م على سرعة السباق', '4x400m at race pace'), sets: 1, reps: '4', distance: '400m', intensity: '7', basis: 'rpe', rest: '90s', restType: 'jog', ...P('تذكير الجسم بإيقاع السباق', 'Remind the body of race pace', 'speed') }),
    WOD('intervals', '٢ جولة خفيفة: ١٠ وول بول + ١٢.٥م دفع سليد خفيف + ١٠ لانج — راحة كاملة', '2 easy rounds: 10 wall balls + 12.5m light sled push + 10 lunges — full rest',
      { duration: '8min', intensity: '5', basis: 'rpe', ...P('تنشيط حركات المحطات من غير إجهاد', 'Prime station movements without fatigue', 'technique') }),
    ...coolLegs().slice(0, 2)
  ]
});

/* ============ 4) هايروكس — أول سباق للمبتدئين (12 أسبوع) ============ */
const T_HX_FIRST = {
  id: 'pt_hyrox_first_beg',
  sport: 'hyrox',
  level: 'beginner',
  title: t('هايروكس — أول سباق ١٢ أسبوع (مبتدئ، أوبن)', 'HYROX — first race in 12 weeks (beginner, Open division)'),
  goal: t('إنهاء أول سباق هايروكس (٨ × ١ كم جري + ٨ محطات) بإيقاع منظم ومن غير إصابة: بناء قاعدة جري، تعلم تكنيك المحطات الثمانية، التعود على الجري بعد المحطات (Compromised running)، ثم محاكاة السباق وتهدئة.',
    'Finish a first HYROX race (8 x 1 km run + 8 stations) with controlled pacing and no injury: build a running base, learn the eight stations, get used to running after stations (compromised running), then race simulation and taper.'),
  components: ['aerobic', 'muscular_endurance', 'strength', 'technique', 'threshold', 'mental'],
  sessionsPerWeek: 4,
  periods: [
    {
      type: 'gpp',
      goal: t('قاعدة جري زون ٢، قوة عامة لكل الجسم، وتعلم تكنيك المحطات الثمانية بأوزان أقل من السباق.', 'Z2 running base, general full-body strength and learning all eight stations below race weights.'),
      components: ['aerobic', 'strength', 'technique'],
      blocks: [
        {
          name: t('أسبوع ١ — اختبار ٥ كم وتعارف على المحطات', 'Week 1 — 5 km test and station walkthrough'),
          goal: t('اختبار ٥ كم (أو ٣ كم للمبتدئ جدًا) و١٠٠٠م تجديف، وجلسة تعليم لكل المحطات.', 'A 5 km test (or 3 km for complete beginners), a 1000m row test and a technique session covering every station.'),
          components: ['aerobic', 'technique'],
          loads: [4],
          weekTypes: ['test'],
          pattern: ['tt', '', 'stTech', '', 'easy', '', '']
        },
        {
          name: t('بلوك ١ — قاعدة (أسابيع ٢-٤)', 'Block 1 — Base (weeks 2-4)'),
          goal: t('جري ٢-٣ مرات أسبوعيًا زون ٢ (الحجم يزيد ١٠٪ أسبوعيًا بحد أقصى)، قوة عامة ٢-٣ مجموعات RPE 7، وتكنيك محطات. أسبوع ٤ تخفيف.', '2-3 Z2 runs weekly (volume up by 10% per week at most), general strength 2-3 sets at RPE 7 and station technique. Week 4 deload.'),
          components: ['aerobic', 'strength', 'technique'],
          loads: [5, 6, 3],
          weekTypes: ['load', 'load', 'deload'],
          pattern: ['strF', 'easy', '', 'stTech', '', 'long', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('قوة التحمل للمحطات بأوزان السباق، فترات عتبة، وأول جلسات الجري بعد المحطات.', 'Station strength-endurance at race weights, threshold intervals and the first compromised-running sessions.'),
      components: ['muscular_endurance', 'threshold', 'aerobic'],
      blocks: [
        {
          name: t('بلوك ٢ — تحمل خاص وجري بعد المحطات (أسابيع ٥-٨)', 'Block 2 — Specific endurance and compromised running (weeks 5-8)'),
          goal: t('فترات ١ كم على العتبة، ٤ جولات جري + محطة، ومحطات بوزن السباق. أسبوع ٧ صدمة وأسبوع ٨ تخفيف.', '1 km threshold repeats, 4 rounds of run + station, and stations at race weight. Week 7 shock, week 8 deload.'),
          components: ['muscular_endurance', 'threshold', 'aerobic'],
          loads: [5, 6, 7, 4],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['strE', 'thr', '', 'comp1', '', 'long', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('محاكاة السباق: نص سباق ثم سباق كامل بمجهود ٨٠-٨٥٪ لتجربة الإيقاع والتغذية والانتقالات (Roxzone).', 'Race simulation: a half race then a full race at 80-85% effort to rehearse pacing, fuelling and Roxzone transitions.'),
      components: ['muscular_endurance', 'aerobic', 'mental', 'tactics'],
      blocks: [
        {
          name: t('أسبوع ٩ — نص سباق', 'Week 9 — Half simulation'),
          goal: t('٤ × (١ كم + محطة) بالمسافات الكاملة للمحطات من ١ لـ ٤.', '4 x (1 km + station) with full distances for stations 1-4.'),
          components: ['muscular_endurance', 'aerobic', 'tactics'],
          loads: [7],
          weekTypes: ['load'],
          pattern: ['strE', 'easy', '', 'comp1', '', 'halfSim', '']
        },
        {
          name: t('أسبوع ١٠ — سباق كامل تجريبي', 'Week 10 — Full race rehearsal'),
          goal: t('٨ × (١ كم + محطة) بمجهود ٨٠-٨٥٪ مع نفس لبس وأكل يوم السباق.', '8 x (1 km + station) at 80-85% effort with race-day kit and nutrition.'),
          components: ['muscular_endurance', 'mental', 'tactics'],
          loads: [8],
          weekTypes: ['shock'],
          pattern: ['strE', 'easy', '', 'thr', '', 'fullSim', '']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('تقليل الحجم ٤٠-٥٠٪ مع الحفاظ على لمسة الإيقاع، والوصول ليوم السباق مرتاح.', 'Cut volume 40-50% while keeping a touch of pace, and arrive at race day fresh.'),
      components: ['recovery', 'aerobic', 'mental'],
      blocks: [
        {
          name: t('أسبوع ١١ — تهدئة', 'Week 11 — Taper'),
          goal: t('جلسة إيقاع سباق قصيرة وجريين سهلين.', 'One short race-pace session and two easy runs.'),
          components: ['recovery', 'aerobic'],
          loads: [5],
          weekTypes: ['taper'],
          pattern: ['easy', '', 'taperMix', '', 'easy', '', '']
        },
        {
          name: t('أسبوع ١٢ — أسبوع السباق', 'Week 12 — Race week'),
          goal: t('جري سهل، تنشيط قبل السباق بيومين، ثم السباق.', 'Easy run, a primer two days out, then the race.'),
          components: ['mental', 'recovery'],
          loads: [3],
          weekTypes: ['comp'],
          pattern: ['easy', '', 'prim', '', '', 'race', '']
        }
      ]
    }
  ],
  sessions: {
    tt: hxTT('لو جديد على الجري: اختبر ٣ كم بدل ٥ كم. سجل الزمن ومتوسط النبض.', 'If new to running: test 3 km instead of 5 km. Log time and average HR.'),
    easy: hxEasy('35-45min', 55, 'ابدأ ٣٠ دقيقة وزود ٥ دقايق كل أسبوع تحميل. لو النبض طلع عن زون ٢ امشي دقيقة.', 'Start at 30 min and add 5 min each loading week. If HR drifts above Z2, walk for a minute.'),
    prim: hxPrim(),
    stTech: {
      title: t('تكنيك المحطات الثمانية', 'Technique for the eight stations'),
      goal: t('تعلم الحركة الاقتصادية لكل محطة عشان توفر طاقة للجري.', 'Learn an economical technique for each station to save energy for the runs.'),
      components: ['technique', 'muscular_endurance'],
      rpe: 5, duration: 75,
      items: [
        ...hyroxWU(),
        DR('dr_hyrox_ski', { sets: 3, distance: '250m', rest: '90s', ...P('سكي: الحركة من الحوض والجذع مش من الدراع، والدراع مفرودة لحد الوسط', 'Ski: drive from hips and trunk, not the arms; arms long to the hips', 'technique') }),
        DR('dr_hyrox_sled_push', { sets: 4, distance: '12.5m', rest: '90s', ...P('دفع السليد: الجسم مايل ٤٥ درجة، الدراع مفرودة، خطوات قصيرة سريعة', 'Sled push: body at 45°, arms locked, short fast steps', 'technique'), ...N('ابدأ بـ ٦٠-٧٠٪ من وزن السباق ووصل للوزن الكامل في بلوك ٢', 'Start at 60-70% of race weight and reach full weight in Block 2') }),
        DR('dr_hyrox_sled_pull', { sets: 4, distance: '12.5m', rest: '90s', ...P('سحب السليد: إيد ورا إيد، الضهر مستقيم، والرجوع لورا جوه المربع', 'Sled pull: hand over hand, flat back, step back within the box', 'technique') }),
        DR('dr_hyrox_burpee_bj', { sets: 3, distance: '20m', rest: '90s', ...P('بيربي برود جامب: إيقاع ثابت وقفزة متوسطة بدل قفزة قصوى', 'Burpee broad jump: steady rhythm and a moderate jump rather than a max jump', 'technique') }),
        DR('dr_hyrox_row', { sets: 3, distance: '250m', rest: '60s', ...P('تجديف: رجلين ثم ضهر ثم دراع، ٢٤-٢٨ ضربة/دقيقة', 'Row: legs, back, arms; 24-28 strokes/min', 'technique') }),
        DR('dr_hyrox_farmers', { sets: 3, distance: '50m', rest: '60s', ...P('حمل الفلاح: خطوات سريعة، كتف لتحت، وقلل الوقفات', 'Farmers carry: quick steps, shoulders down, minimise put-downs', 'technique') }),
        DR('dr_hyrox_lunges', { sets: 3, distance: '20m', rest: '90s', ...P('لانجز بالشنطة: الركبة الخلفية تلمس الأرض والجذع عمودي', 'Sandbag lunges: back knee touches, torso upright', 'technique') }),
        DR('dr_hyrox_wallballs', { sets: 4, reps: '15', rest: '60s', ...P('وول بول: سكوات كامل ورمية من الرجلين للهدف', 'Wall balls: full squat and throw driven from the legs to the target', 'technique'), ...N('أوزان الأوبن: رجال ٦ كجم لهدف ٣م، سيدات ٤ كجم لهدف ٢.٧م', 'Open weights: men 6 kg to 3 m, women 4 kg to 2.7 m') }),
        mob('ad_couch_stretch', { duration: '1min/side' }),
        mob('ad_foam_roller_thoracic_extension', { duration: '2min' })
      ]
    },
    strF: {
      title: t('قوة عامة لكل الجسم', 'General full-body strength'),
      goal: t('بناء قوة الرجلين والسحب والدفع والقبضة اللي كل المحطات محتاجاها.', 'Build the leg, pull, push and grip strength every station needs.'),
      components: ['strength', 'core', 'prevention'],
      rpe: 7, duration: 60,
      items: [
        ...hyroxWU(),
        S('ex_goblet_squat', 3, '10', '7', 'rpe', '90s', { tempo: '3-1-1-0', ...P('قوة الرجلين للوول بول واللانجز', 'Leg strength for wall balls and lunges', 'strength') }),
        S('ex_romanian_deadlift', 3, '8', '7', 'rpe', '90s', P('السلسلة الخلفية لدفع وسحب السليد', 'Posterior chain for sled push and pull', 'strength')),
        S('ex_walking_lunge', 3, '10/leg', '7', 'rpe', '90s', P('قوة رجل واحدة وثبات', 'Single-leg strength and stability', 'strength')),
        S('ex_one_arm_dumbbell_row', 3, '10/side', '7', 'rpe', '60s', P('قوة السحب للسليد والتجديف', 'Pulling strength for sled pull and row', 'strength')),
        S('ex_pushup', 3, '8-12', '2', 'rir', '60s', P('قوة الدفع للبيربي والسليد', 'Pushing strength for burpees and the sled', 'strength')),
        S('ex_farmers_carry', 3, '40m', '7', 'rpe', '60s', P('قوة القبضة والجذع', 'Grip and trunk strength', 'strength')),
        S('ex_plank', 3, '40s', '6', 'rpe', '30s', P('ثبات الجذع', 'Trunk stability', 'core')),
        ...coolLegs()
      ]
    },
    long: {
      title: t('جري طويل زون ٢', 'Long Z2 run'),
      goal: t('زيادة التحمل الهوائي وتحمل العضلات والأوتار لمسافة السباق.', 'Grow aerobic endurance and muscle/tendon tolerance to race distance.'),
      components: ['aerobic', 'mental'],
      rpe: 5, duration: 90,
      items: [
        wuN('مشي سريع ٥ دقايق + تمارين حركة للحوض والكاحل', '5-min brisk walk + hip and ankle mobility drills', { duration: '8min' }),
        RUN('ad_zone_2_easy_run', { duration: '45-75min', intensity: 'Z2', basis: 'hr', ...P('أطول جري في الأسبوع بإيقاع سهل', 'Longest run of the week at an easy pace', 'aerobic'), ...N('التدرج: ٤٥ ← ٥٠ ← (تخفيف ٣٥) ← ٥٥ ← ٦٠ ← ٦٥ ← (تخفيف ٤٥) دقيقة. مسموح مشي دقيقة كل ١٠ دقايق.', 'Progression: 45 → 50 → (deload 35) → 55 → 60 → 65 → (deload 45) min. A 1-min walk every 10 min is fine.') }),
        ...coolLegs()
      ]
    },
    strE: {
      title: t('قوة تحمل للمحطات بوزن السباق', 'Station strength-endurance at race weight'),
      goal: t('التعود على أوزان السباق وتحمل المحطات الأصعب (السليد، اللانجز، الوول بول).', 'Adapt to race weights and the hardest stations (sleds, lunges, wall balls).'),
      components: ['muscular_endurance', 'strength', 'technique'],
      rpe: 7, duration: 70,
      items: [
        ...hyroxWU(),
        S('ex_front_squat', 4, '6', '7', 'rpe', '2min', { tempo: '3-0-1-0', ...P('قوة الرجلين في وضع قريب من الوول بول', 'Leg strength in a wall-ball-like position', 'strength') }),
        WODL('dr_hyrox_sled_push', 'intervals', { sets: 4, distance: '25m', intensity: '8', basis: 'rpe', rest: '2min', ...P('دفع السليد بوزن السباق', 'Sled push at race weight', 'muscular_endurance'), ...N('أوزان الأوبن شامل السليد: رجال ١٥٢ كجم، سيدات ١٠٢ كجم. لو الجيم مفيهوش نفس السليد استخدم RPE 8.', 'Open weights incl. sled: men 152 kg, women 102 kg. If your gym sled differs, go by RPE 8.') }),
        WODL('dr_hyrox_sled_pull', 'intervals', { sets: 4, distance: '25m', intensity: '8', basis: 'rpe', rest: '2min', ...P('سحب السليد بوزن السباق', 'Sled pull at race weight', 'muscular_endurance'), ...N('رجال ١٠٣ كجم، سيدات ٧٨ كجم شامل السليد', 'Men 103 kg, women 78 kg incl. sled') }),
        WOD('intervals', '٤ جولات (راحة ٢ دقيقة): ٢٥ وول بول، ٢٥م لانجز بشنطة رمل، ٥٠م حمل فلاح', '4 rounds (2 min rest): 25 wall balls, 25m sandbag lunges, 50m farmers carry',
          { duration: '24min', intensity: '7', basis: 'rpe', ...P('تحمل عضلي للرجلين والقبضة بأوزان السباق', 'Leg and grip muscular endurance at race weights', 'muscular_endurance'), ...N('أوبن: وول بول ٦/٤ كجم، شنطة ٢٠/١٠ كجم، فارمرز ٢×٢٤/٢×١٦ كجم. الوول بول مجموعات ١٠-١٥ بس.', 'Open: wall ball 6/4 kg, sandbag 20/10 kg, farmers 2x24/2x16 kg. Wall balls in sets of 10-15.') }),
        ...coolLegs()
      ]
    },
    thr: {
      title: t('فترات عتبة ١ كم', '1 km threshold repeats'),
      goal: t('رفع سرعة العتبة عشان سرعة السباق تبقى أسهل.', 'Raise threshold speed so race pace feels easier.'),
      components: ['threshold', 'aerobic'],
      rpe: 7, duration: 60,
      items: [
        ...runWU(),
        RUN('dr_tempo_run', { name: t('٥ × ١ كم على العتبة', '5 x 1 km at threshold'), sets: 1, reps: '5', distance: '1km', intensity: '7', basis: 'rpe', rest: '90s', restType: 'jog', ...P('العتبة: مجهود "صعب مريح"، سرعة الـ ٥ كم + ١٠-١٥ ث/كم', 'Threshold: "comfortably hard", 5 km pace + 10-15 s/km', 'threshold'), ...N('أسبوع ٧ (صدمة): ٦ فترات. أسبوع ٨ (تخفيف): ٣ فترات.', 'Week 7 (shock): 6 reps. Week 8 (deload): 3 reps.') }),
        S('ex_step_up', 3, '10/leg', '7', 'rpe', '60s', P('قوة رجل واحدة للجري', 'Single-leg strength for running', 'strength')),
        ...coolLegs()
      ]
    },
    comp1: {
      title: t('جري بعد المحطات (Compromised running)', 'Compromised running'),
      goal: t('التعود على الجري بإيقاع ثابت ورجلك تقيلة بعد المحطة، وتدريب الانتقالات.', 'Learn to hold a steady pace on heavy legs straight after a station, and practise transitions.'),
      components: ['muscular_endurance', 'aerobic', 'tactics'],
      rpe: 7, duration: 70,
      items: [
        ...hyroxWU(),
        WOD('intervals', '٤ جولات (راحة ٢ دقيقة): ١ كم جري بسرعة السباق المستهدفة + محطة — (١) ٥٠٠م سكي (٢) ٢٥م دفع سليد (٣) ٢٥ وول بول (٤) ٥٠م لانجز بشنطة', '4 rounds (2 min rest): 1 km at target race pace + a station — (1) 500m ski (2) 25m sled push (3) 25 wall balls (4) 50m sandbag lunges',
          { duration: '40min', intensity: '7', basis: 'rpe', ...P('ثبات إيقاع الجري بعد المحطة (أول ٢٠٠م هي الأصعب)', 'Hold run pace after each station (the first 200m are the hardest)', 'muscular_endurance'), ...N('سرعة السباق للمبتدئ ≈ سرعة الـ ٥ كم + ٤٥-٦٠ ث/كم. أسبوع ٧: ٥ جولات. أسبوع ٨: ٣ جولات.', 'Beginner race pace ≈ 5 km pace + 45-60 s/km. Week 7: 5 rounds. Week 8: 3 rounds.') }),
        DR(null, { name: t('تدريب الروكس زون: دخول وخروج المحطة بسرعة، شرب ميه وأنت ماشي', 'Roxzone practice: fast station entry and exit, drink on the move'), sets: 4, reps: '1', ...P('توفير ٢-٤ دقايق ضايعة في الانتقالات', 'Save the 2-4 minutes typically lost in transitions', 'tactics') }),
        ...coolLegs()
      ]
    },
    halfSim: {
      title: t('نص سباق محاكاة', 'Half-race simulation'),
      goal: t('أول ٤ جري و٤ محطات بالمسافات الكاملة بإيقاع السباق.', 'The first 4 runs and 4 stations at full distance and race pace.'),
      components: ['muscular_endurance', 'aerobic', 'tactics'],
      rpe: 8, duration: 75,
      items: [
        ...hyroxWU(),
        WOD('hyrox_sim', 'نص سباق: ١ كم + ١٠٠٠م سكي، ١ كم + ٥٠م دفع سليد، ١ كم + ٥٠م سحب سليد، ١ كم + ٨٠م بيربي برود جامب', 'Half race: 1 km + 1000m ski, 1 km + 50m sled push, 1 km + 50m sled pull, 1 km + 80m burpee broad jumps',
          { duration: '50min', intensity: '7-8', basis: 'rpe', ...P('تجربة الإيقاع وأوزان السباق في أصعب نص من ناحية القوة', 'Rehearse pacing and race weights through the strength-heavy half', 'muscular_endurance'), ...N('سجل زمن كل جري وكل محطة. الجري التاني والتالت لازم يبقوا في حدود ٢٠ ث من الأول.', 'Log every run and station split. Runs 2 and 3 should be within 20s of run 1.') }),
        ...coolLegs()
      ]
    },
    fullSim: {
      title: t('سباق كامل تجريبي ٨٠-٨٥٪', 'Full race rehearsal at 80-85%'),
      goal: t('تجربة السباق كله: الإيقاع، الأكل قبلها، الميه، اللبس، والانتقالات.', 'Rehearse the whole race: pacing, pre-race meal, hydration, kit and transitions.'),
      components: ['muscular_endurance', 'aerobic', 'mental', 'tactics'],
      rpe: 8, duration: 120,
      items: [
        ...hyroxWU(),
        WOD('hyrox_sim', 'سباق كامل: ٨ × (١ كم جري + محطة): سكي ١٠٠٠م، دفع سليد ٥٠م، سحب سليد ٥٠م، بيربي برود جامب ٨٠م، تجديف ١٠٠٠م، فارمرز ٢٠٠م، لانجز بشنطة ١٠٠م، ١٠٠ وول بول', 'Full race: 8 x (1 km run + station): 1000m ski, 50m sled push, 50m sled pull, 80m burpee broad jumps, 1000m row, 200m farmers carry, 100m sandbag lunges, 100 wall balls',
          { duration: '100min', intensity: '7-8', basis: 'rpe', ...P('ثقة إنك تكمل السباق ومعرفة الزمن المتوقع', 'Confidence to finish and a realistic time prediction', 'muscular_endurance'), ...N('مجهود ٨٠-٨٥٪ مش سباق كامل. لو الجيم مفيهوش كل المحطات: استبدل سحب السليد بسحب حبل، والسكي بتجديف.', 'Effort 80-85%, not an all-out race. If the gym lacks stations: rope pull for sled pull, row for ski.') }),
        mobN('تبريد ١٠ دقايق مشي + أكل استشفاء (بروتين + كربوهيدرات)', '10-min walk cool-down + recovery meal (protein + carbs)', { duration: '10min' }),
        ...coolLegs().slice(0, 2)
      ]
    },
    taperMix: {
      title: t('إيقاع سباق مختصر (تهدئة)', 'Short race-pace session (taper)'),
      goal: t('الإحساس بإيقاع السباق بحجم قليل.', 'Feel race pace on low volume.'),
      components: ['aerobic', 'muscular_endurance', 'recovery'],
      rpe: 6, duration: 55,
      items: [
        ...hyroxWU(),
        WOD('intervals', '٤ جولات (راحة ٣ دقايق): ٥٠٠م بسرعة السباق + نص محطة (٥٠٠م سكي / ٢٥م دفع سليد / ٤٠م بيربي برود جامب / ٥٠ وول بول)', '4 rounds (3 min rest): 500m at race pace + half a station (500m ski / 25m sled push / 40m BBJ / 50 wall balls)',
          { duration: '30min', intensity: '7', basis: 'rpe', ...P('الحفاظ على الإيقاع والثقة من غير تعب', 'Maintain pace feel and confidence without fatigue', 'muscular_endurance') }),
        ...coolLegs()
      ]
    },
    race: {
      title: t('يوم السباق — هايروكس أوبن', 'Race day — HYROX Open'),
      goal: t('إنهاء السباق بإيقاع منظم: أول ٢ كم أبطأ شوية، ثبات في النص، وتسريع في آخر ٢ كم.', 'Finish with controlled pacing: slightly slower first 2 km, steady middle, push the last 2 km.'),
      components: ['muscular_endurance', 'aerobic', 'mental'],
      rpe: 9, duration: 150,
      items: [
        wuN('إحماء السباق ٢٠ دقيقة: جري سهل ٨ دقايق، تمارين جري، ٣ ستريدز، ٥ وول بول، ٥ بيربي — وخلص قبل الانطلاق بـ ١٠ دقايق', '20-min race warm-up: 8 min easy jog, drills, 3 strides, 5 wall balls, 5 burpees — finish 10 min before the start', { duration: '20min' }),
        WOD('hyrox_sim', 'السباق: ٨ × (١ كم جري + محطة) بالترتيب: سكي ١٠٠٠م، دفع سليد ٥٠م، سحب سليد ٥٠م، بيربي برود جامب ٨٠م، تجديف ١٠٠٠م، فارمرز ٢٠٠م، لانجز ١٠٠م، ١٠٠ وول بول', 'Race: 8 x (1 km run + station) in order: 1000m ski, 50m sled push, 50m sled pull, 80m burpee broad jumps, 1000m row, 200m farmers carry, 100m lunges, 100 wall balls',
          { duration: '90-120min', intensity: '8-9', basis: 'rpe', ...P('أول سباق: الهدف إنك تخلص بإيقاع منظم وتستمتع', 'First race: finish with controlled pacing and enjoy it', 'mental'), ...N('أوزان الأوبن رجال/سيدات: دفع ١٥٢/١٠٢، سحب ١٠٣/٧٨، فارمرز ٢×٢٤/٢×١٦، شنطة ٢٠/١٠، وول بول ٦/٤ كجم. الوول بول مجموعات ١٠ من الأول. جيل أو كربوهيدرات بعد المحطة ٤.', 'Open men/women: push 152/102, pull 103/78, farmers 2x24/2x16, sandbag 20/10, wall ball 6/4 kg. Wall balls in sets of 10 from the start. Gel or carbs after station 4.') }),
        mobN('تبريد مشي ١٠ دقايق وسوائل وأكل خلال ساعة', '10-min walk cool-down, fluids and a meal within an hour', { duration: '10min' })
      ]
    }
  }
};

/* ============ 5) هايروكس — برو متقدم (16 أسبوع) ============ */
const PRO_W = t('أوزان البرو رجال/سيدات: دفع سليد ٢٠٢/١٥٢ كجم، سحب ١٥٣/١٠٣ كجم (شامل السليد)، فارمرز ٢×٣٢/٢×٢٤ كجم، شنطة ٣٠/٢٠ كجم، وول بول ٩/٦ كجم لهدف ٣/٢.٧م.',
  'Pro men/women: sled push 202/152 kg, sled pull 153/103 kg (incl. sled), farmers 2x32/2x24 kg, sandbag 30/20 kg, wall ball 9/6 kg to 3/2.7 m.');
const T_HX_PRO = {
  id: 'pt_hyrox_pro_adv',
  sport: 'hyrox',
  level: 'advanced',
  title: t('هايروكس — برو ١٦ أسبوع (متقدم)', 'HYROX — 16-week Pro division cycle (advanced)'),
  goal: t('تحقيق زمن مستهدف في فئة البرو (مثال: رجال أقل من ٦٥ دقيقة، سيدات أقل من ٧٢ دقيقة) من خلال: قوة قصوى وقدرة للسليد التقيل، فترات ١ كم على سرعة السباق، فترات محطات على الزمن المستهدف، محاكاة كاملة، وتهدئة ٣ أسابيع.',
    'Hit a Pro-division target time (e.g. men sub-65, women sub-72) through max strength and power for heavy sleds, 1 km repeats at race pace, station intervals at target splits, full simulations and a 3-week taper.'),
  components: ['aerobic', 'threshold', 'vo2max', 'max_strength', 'muscular_endurance', 'power', 'tactics', 'mental'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: t('قاعدة: حجم جري عالي زون ٢ (٤٥-٦٠ كم أسبوعيًا)، قوة قصوى ٧٥-٨٢٪، وتحمل عضلي للمحطات بأوزان البرو.', 'Base: high Z2 running volume (45-60 km/week), max strength at 75-82% and station muscular endurance at Pro weights.'),
      components: ['aerobic', 'max_strength', 'muscular_endurance', 'threshold'],
      blocks: [
        {
          name: t('أسبوع ١ — اختبارات', 'Week 1 — Testing'),
          goal: t('٥ كم تايم تريال، ١٠٠٠م تجديف، واختبارات محطات (سكي، سليد، وول بول، فارمرز) لتحديد السرعات والأزمنة المستهدفة.', '5 km time trial, 1000m row and station tests (ski, sleds, wall balls, farmers) to set paces and target splits.'),
          components: ['aerobic', 'threshold', 'muscular_endurance'],
          loads: [5],
          weekTypes: ['test'],
          pattern: ['tt', 'easy', '', 'stTest', '', 'long', '']
        },
        {
          name: t('بلوك ١ — قاعدة وقوة (أسابيع ٢-٥)', 'Block 1 — Base and strength (weeks 2-5)'),
          goal: t('سكوات ٥×٥ على ٧٥ ← ٧٨ ← ٨٢٪ ثم ٦٥٪. عتبة ٦ ← ٧ ← ٨ × ١ كم. الجري الطويل ٧٠ ← ٨٠ ← ٩٠ دقيقة. أسبوع ٤ صدمة وأسبوع ٥ تخفيف (-٤٠٪).', 'Squat 5x5 at 75 → 78 → 82% then 65%. Threshold 6 → 7 → 8 x 1 km. Long run 70 → 80 → 90 min. Week 4 shock, week 5 deload (-40%).'),
          components: ['aerobic', 'max_strength', 'threshold', 'muscular_endurance'],
          loads: [6, 7, 8, 4],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['strH', 'thrA', 'easy', 'strE', '', 'compA', 'long']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('تخصيص: ١ كم على سرعة السباق بحجم متزايد، فترات محطات على الزمن المستهدف، قوة وقدرة للسليد التقيل، وجري بعد المحطات لمسافات أطول.', 'Specific: growing volume of 1 km at race pace, station intervals at target splits, strength and power for heavy sleds, and longer compromised running.'),
      components: ['threshold', 'muscular_endurance', 'power', 'tactics'],
      blocks: [
        {
          name: t('بلوك ٢ — سرعة السباق والمحطات (أسابيع ٦-٩)', 'Block 2 — Race pace and stations (weeks 6-9)'),
          goal: t('١ كم على سرعة السباق ٨ ← ١٠ ← ١٢ مرة، سكوات ٤×٣ على ٨٥٪، سليد تقيل ١٢٠٪. أسبوع ٨ صدمة وأسبوع ٩ تخفيف.', '1 km at race pace 8 → 10 → 12 reps, squat 4x3 at 85%, heavy sleds at 120%. Week 8 shock, week 9 deload.'),
          components: ['threshold', 'muscular_endurance', 'power'],
          loads: [7, 8, 9, 4],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['strP', 'racePace', 'easy', 'stInt', '', 'compB', 'long']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('محاكاة: نص سباق خلفي ثم سباق كامل بشدة ٩٥٪، ثم إعادة الاختبارات لتثبيت خطة الأزمنة.', 'Simulation: back-half race then a full race at 95%, then retests to lock in the split plan.'),
      components: ['muscular_endurance', 'threshold', 'mental', 'tactics'],
      blocks: [
        {
          name: t('بلوك ٣ — محاكاة (أسابيع ١٠-١٢)', 'Block 3 — Simulation (weeks 10-12)'),
          goal: t('أسبوع ١٠: النص التاني من السباق (جري ٥-٨ + محطات ٥-٨). أسبوع ١١: سباق كامل ٩٥٪. أسبوع ١٢: تخفيف.', 'Week 10: back half of the race (runs 5-8 + stations 5-8). Week 11: full race at 95%. Week 12: deload.'),
          components: ['muscular_endurance', 'tactics', 'mental'],
          loads: [8, 9, 5],
          weekTypes: ['load', 'shock', 'deload'],
          pattern: ['strP', 'racePace', 'easy', 'stInt', '', 'sim', 'long']
        },
        {
          name: t('أسبوع ١٣ — إعادة الاختبارات', 'Week 13 — Retest'),
          goal: t('٥ كم واختبارات المحطات؛ حدّث الأزمنة المستهدفة وخطة السباق النهائية.', '5 km and station tests; update target splits and the final race plan.'),
          components: ['threshold', 'muscular_endurance'],
          loads: [6],
          weekTypes: ['test'],
          pattern: ['tt', 'easy', '', 'stTest', '', 'easy', '']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('الحجم ينزل ٣٠ ← ٥٠ ← ٦٥٪ والشدة تفضل على سرعة السباق، عشان الرجلين تبقى طازة للسليد والجري.', 'Volume drops 30 → 50 → 65% while intensity stays at race pace, so the legs are fresh for sleds and running.'),
      components: ['recovery', 'threshold', 'mental'],
      blocks: [
        {
          name: t('أسابيع ١٤-١٥ — تهدئة', 'Weeks 14-15 — Taper'),
          goal: t('جلسة سرعة سباق وجلسة ميكس مختصرة وقوة صيانة؛ الباقي جري سهل.', 'One race-pace session, one short mixed session and maintenance strength; everything else easy running.'),
          components: ['recovery', 'threshold', 'max_strength'],
          loads: [6, 4],
          weekTypes: ['taper', 'taper'],
          pattern: ['strM', 'racePace', 'easy', '', 'tpMix', '', 'easy']
        },
        {
          name: t('أسبوع ١٦ — أسبوع السباق', 'Week 16 — Race week'),
          goal: t('جري سهل، تنشيط قبل السباق بيومين، والسباق.', 'Easy runs, a primer two days out, and the race.'),
          components: ['mental', 'recovery'],
          loads: [3],
          weekTypes: ['comp'],
          pattern: ['easy', '', 'easy', 'prim', '', 'race', '']
        }
      ]
    }
  ],
  sessions: {
    tt: hxTT('مستهدف برو: رجال ١٧:٠٠-١٨:٣٠، سيدات ١٩:٠٠-٢٠:٣٠. سرعة السباق = سرعة الـ ٥ كم + ٢٠-٣٠ ث/كم.', 'Pro targets: men 17:00-18:30, women 19:00-20:30. Race pace = 5 km pace + 20-30 s/km.'),
    easy: hxEasy('45-60min', 70, 'سرعة سهلة (رجال تقريبًا ٤:٥٠-٥:٢٠/كم، سيدات ٥:٢٠-٥:٥٠/كم) أو حسب النبض. في التهدئة ٣٠-٤٠ دقيقة.', 'Easy pace (roughly men 4:50-5:20/km, women 5:20-5:50/km) or by HR. In the taper 30-40 min.'),
    prim: hxPrim(),
    stTest: {
      title: t('اختبارات المحطات بأوزان البرو', 'Station tests at Pro weights'),
      goal: t('قياس زمن كل محطة أساسية وتحديد الأزمنة المستهدفة في السباق.', 'Time each key station and set race target splits.'),
      components: ['muscular_endurance', 'threshold', 'strength'],
      rpe: 9, duration: 90,
      items: [
        ...hyroxWU(),
        WODL('dr_hyrox_ski', 'fortime', { distance: '1000m', intensity: '9', basis: 'rpe', ...P('زمن سكي مرجعي', 'Reference ski time', 'threshold'), ...N('مستهدف سباق رجال ٣:٥٠-٤:٠٥، سيدات ٤:١٥-٤:٣٥ (السباق أبطأ ٥-٨٪ من الاختبار).', 'Race target men 3:50-4:05, women 4:15-4:35 (race is 5-8% slower than the test).') }),
        WODL('dr_hyrox_sled_push', 'fortime', { distance: '50m', intensity: '9', basis: 'rpe', rest: '8min', ...P('زمن دفع السليد التقيل بعد ٨ دقايق راحة', 'Heavy sled push time after 8 min rest', 'strength'), ...N(PRO_W.ar, PRO_W.en) }),
        WODL('dr_hyrox_sled_pull', 'fortime', { distance: '50m', intensity: '9', basis: 'rpe', rest: '8min', ...P('زمن سحب السليد التقيل', 'Heavy sled pull time', 'strength') }),
        WODL('dr_hyrox_wallballs', 'fortime', { reps: '100', intensity: '9', basis: 'rpe', rest: '8min', ...P('١٠٠ وول بول بأسرع وقت وتحديد التقسيم الأنسب', '100 wall balls for time and find the best split', 'muscular_endurance'), ...N('مستهدف رجال ٤:٠٠-٤:٣٠، سيدات ٤:٣٠-٥:٠٠. جرب ٤×٢٥ أو ٥×٢٠ بـ ٥ أنفاس راحة.', 'Target men 4:00-4:30, women 4:30-5:00. Try 4x25 or 5x20 with 5 breaths rest.') }),
        WODL('dr_hyrox_farmers', 'fortime', { distance: '200m', intensity: '9', basis: 'rpe', ...P('زمن فارمرز من غير وقوف', 'Farmers carry time without put-downs', 'strength') }),
        ...coolLegs()
      ]
    },
    strH: {
      title: t('قوة قصوى', 'Max strength'),
      goal: t('قوة قصوى في الرجلين والسلسلة الخلفية والسحب، أساس السليد التقيل في البرو.', 'Max leg, posterior-chain and pulling strength, the base for heavy Pro sleds.'),
      components: ['max_strength', 'strength', 'prevention'],
      rpe: 8, duration: 80,
      items: [
        ...hyroxWU(),
        S('ex_barbell_back_squat', 5, '5', '75-82', '1rm', '3min', { tempo: '3-1-X-0', ...P('قوة الرجلين: ٧٥ ← ٧٨ ← ٨٢٪، تخفيف ٣×٥ على ٦٥٪', 'Leg strength: 75 → 78 → 82%, deload 3x5 at 65%', 'max_strength') }),
        S('wg_trap_bar_deadlift', 4, '5', '78-82', '1rm', '3min', P('قوة السلسلة الخلفية لدفع وسحب السليد', 'Posterior-chain strength for sled push and pull', 'max_strength')),
        S('wg_weighted_pull_up', 4, '5', '2', 'rir', '2min', P('قوة السحب لسحب السليد والتجديف', 'Pulling strength for sled pull and row', 'strength')),
        WODL('ad_sled_push_sprints', 'intervals', { name: t('دفع سليد تقيل ١٢٠٪ من وزن البرو', 'Heavy sled push at 120% of Pro weight'), sets: 5, distance: '12.5m', intensity: '9', basis: 'rpe', rest: '2min', ...P('قوة أفقية فوق وزن السباق عشان وزن السباق يبان أخف', 'Horizontal strength above race load so race weight feels lighter', 'max_strength') }),
        S('ex_bulgarian_split_squat', 3, '8/leg', '2', 'rir', '90s', P('قوة رجل واحدة للانجز والجري', 'Single-leg strength for lunges and running', 'strength')),
        S('ex_copenhagen_plank', 3, '25s/side', '7', 'rpe', '45s', P('وقاية الضامة مع حجم الجري واللانجز', 'Adductor protection given run and lunge volume', 'prevention')),
        ...coolLegs()
      ]
    },
    thrA: {
      title: t('عتبة — ١ كم فترات', 'Threshold — 1 km repeats'),
      goal: t('رفع سرعة العتبة للجري بعد المحطات.', 'Raise threshold speed for running between stations.'),
      components: ['threshold', 'aerobic'],
      rpe: 7, duration: 75,
      items: [
        ...runWU(),
        RUN('dr_tempo_run', { name: t('٦-٨ × ١ كم على العتبة', '6-8 x 1 km at threshold'), sets: 1, reps: '6-8', distance: '1km', intensity: '3:35-3:45', basis: 'pace', rest: '60s', restType: 'jog', ...P('العتبة: سرعة الـ ٥ كم + ١٠-١٥ ث/كم', 'Threshold: 5 km pace + 10-15 s/km', 'threshold'), ...N('السرعة المكتوبة لرجال برو؛ سيدات تقريبًا ٣:٥٥-٤:٠٥/كم. ٦ ← ٧ ← ٨ ثم ٤ في التخفيف.', 'Paces shown for Pro men; women roughly 3:55-4:05/km. 6 → 7 → 8, then 4 on deload.') }),
        RUN('ad_strides', { sets: 1, reps: '4', distance: '150m', intensity: '90', basis: 'vmax', rest: '90s', restType: 'walk', ...P('سرعة واقتصاد حركي بعد التعب', 'Speed and economy after fatigue', 'speed') }),
        ...coolLegs()
      ]
    },
    strE: {
      title: t('تحمل المحطات بأوزان البرو', 'Station endurance at Pro weights'),
      goal: t('تحمل عضلي للمحطات الأخيرة (فارمرز، لانجز، وول بول) بأوزان البرو.', 'Muscular endurance for the late stations (farmers, lunges, wall balls) at Pro weights.'),
      components: ['muscular_endurance', 'strength'],
      rpe: 8, duration: 75,
      items: [
        ...hyroxWU(),
        WODL('dr_hyrox_wallballs', 'emom', { name: t('EMOM ١٠: ٢٠ وول بول ٩/٦ كجم', 'EMOM 10: 20 wall balls 9/6 kg'), duration: '10min', intensity: '8', basis: 'rpe', ...P('إيقاع وول بول ثابت تحت تعب (٢٠٠ عدة)', 'Steady wall-ball rhythm under fatigue (200 reps)', 'muscular_endurance'), ...N('أسبوع ٤ (صدمة): ٢٢ عدة كل دقيقة.', 'Week 4 (shock): 22 reps per minute.') }),
        WODL('dr_hyrox_lunges', 'intervals', { sets: 4, distance: '50m', intensity: '8', basis: 'rpe', rest: '2min', ...P('لانجز بالشنطة بوزن البرو (٣٠/٢٠ كجم)', 'Sandbag lunges at Pro weight (30/20 kg)', 'muscular_endurance') }),
        WODL('dr_hyrox_farmers', 'intervals', { sets: 4, distance: '100m', intensity: '8', basis: 'rpe', rest: '90s', ...P('قبضة وسرعة في الفارمرز بوزن البرو (٢×٣٢/٢×٢٤)', 'Grip and speed in farmers at Pro weight (2x32/2x24)', 'strength') }),
        WODL('dr_hyrox_burpee_bj', 'intervals', { sets: 4, distance: '40m', intensity: '8', basis: 'rpe', rest: '90s', ...P('إيقاع بيربي برود جامب ثابت', 'Steady burpee broad jump rhythm', 'muscular_endurance') }),
        ...coolLegs()
      ]
    },
    compA: {
      title: t('جري بعد المحطات — ٥ جولات', 'Compromised running — 5 rounds'),
      goal: t('الحفاظ على سرعة السباق في الجري بعد محطات بأوزان البرو.', 'Hold race pace running after Pro-weight stations.'),
      components: ['muscular_endurance', 'threshold', 'tactics'],
      rpe: 8, duration: 80,
      items: [
        ...hyroxWU(),
        WOD('intervals', '٥ جولات (راحة ٩٠ث): ١ كم بسرعة السباق + محطة — (١) ٥٠٠م سكي (٢) ٢٥م دفع سليد (٣) ٢٥م سحب سليد (٤) ٤٠م بيربي برود جامب (٥) ٣٠ وول بول', '5 rounds (90s rest): 1 km at race pace + a station — (1) 500m ski (2) 25m sled push (3) 25m sled pull (4) 40m BBJ (5) 30 wall balls',
          { duration: '45min', intensity: '3:50-4:05', basis: 'pace', ...P('إيقاع جري ثابت على رجل تقيلة', 'Steady run pace on heavy legs', 'muscular_endurance'), ...N('السرعة لرجال برو؛ سيدات ٤:١٥-٤:٣٠/كم. أول ٢٠٠م بعد المحطة لا تتأخر أكتر من ٥ ث عن الإيقاع.', 'Pace for Pro men; women 4:15-4:30/km. The first 200m after a station no more than 5s off pace.') }),
        DR(null, { name: t('روكس زون: دخول وخروج في أقل من ٢٠ث لكل محطة', 'Roxzone: in and out under 20s per station'), sets: 5, reps: '1', ...P('تقليل وقت الانتقالات (٣-٥ دقايق في السباق)', 'Cut transition time (3-5 min in a race)', 'tactics') }),
        ...coolLegs()
      ]
    },
    long: {
      title: t('جري طويل مع نهاية سريعة', 'Long run with a fast finish'),
      goal: t('تحمل هوائي طويل مع آخر ١٠-١٥ دقيقة على سرعة ثابتة أسرع.', 'Long aerobic endurance with the last 10-15 min at a faster steady pace.'),
      components: ['aerobic', 'threshold', 'mental'],
      rpe: 6, duration: 110,
      items: [
        wuN('جري سهل ١٠ دقايق + حركية للحوض', '10-min easy jog + hip mobility', { duration: '10min' }),
        RUN('ad_zone_2_easy_run', { duration: '70-100min', intensity: 'Z2', basis: 'hr', ...P('حجم هوائي كبير لتحمل السباق ٦٠-٧٥ دقيقة', 'Large aerobic volume to sustain a 60-75 min race', 'aerobic'), ...N('٧٠ ← ٨٠ ← ٩٠ دقيقة في بلوك ١، ٨٠-١٠٠ في بلوك ٢، و٦٠ في أسابيع التخفيف.', '70 → 80 → 90 min in Block 1, 80-100 in Block 2, 60 on deload weeks.') }),
        RUN('dr_tempo_run', { name: t('نهاية سريعة ١٠-١٥ دقيقة', '10-15 min fast finish'), duration: '10-15min', intensity: '4:05-4:20', basis: 'pace', ...P('الجري بسرعة قريبة من السباق وأنت متعب', 'Run near race pace when tired', 'threshold') }),
        ...coolLegs()
      ]
    },
    strP: {
      title: t('قوة وقدرة للسليد التقيل', 'Strength and power for heavy sleds'),
      goal: t('قوة قصوى ٨٥٪ مع قدرة انفجارية وسليد تقيل فوق وزن السباق.', 'Max strength at 85% with explosive power and sleds above race weight.'),
      components: ['max_strength', 'power', 'strength'],
      rpe: 8, duration: 80,
      items: [
        ...hyroxWU(),
        S('ex_barbell_back_squat', 4, '3', '85', '1rm', '3min', { ...P('قوة قصوى مع حجم أقل', 'Max strength with lower volume', 'max_strength'), ...N('أسبوع ٨: ٥×٣. التخفيف: ٣×٣ على ٧٥٪. في بلوك المحاكاة: ٣×٣ بس.', 'Week 8: 5x3. Deload: 3x3 at 75%. In the simulation block: only 3x3.') }),
        DR('dr_box_jump', { sets: 4, reps: '3', rest: '90s', ...P('قدرة انفجارية بعد السكوات (تباين)', 'Explosive power after squats (contrast)', 'power') }),
        S('ad_power_clean', 5, '2', '75-80', '1rm', '2min', P('قدرة كل الجسم وسرعة الفرد', 'Whole-body power and rate of force development', 'power')),
        WODL('dr_hyrox_sled_push', 'intervals', { name: t('دفع سليد ١٢٠٪ من وزن البرو', 'Sled push at 120% of Pro weight'), sets: 6, distance: '12.5m', intensity: '9', basis: 'rpe', rest: '2min', ...P('قوة أفقية فوق وزن السباق', 'Horizontal strength above race load', 'max_strength') }),
        WODL('dr_hyrox_sled_pull', 'intervals', { name: t('سحب سليد ١٢٠٪ من وزن البرو', 'Sled pull at 120% of Pro weight'), sets: 4, distance: '12.5m', intensity: '9', basis: 'rpe', rest: '2min', ...P('قوة السحب التقيل للسليد', 'Heavy sled-pull strength', 'max_strength') }),
        ...coolLegs()
      ]
    },
    racePace: {
      title: t('١ كم على سرعة السباق', '1 km at race pace'),
      goal: t('تثبيت سرعة السباق لحد ما تبقى تلقائية، مع راحة قصيرة زي الروكس زون.', 'Make race pace automatic, with short rests like the Roxzone.'),
      components: ['threshold', 'aerobic', 'tactics'],
      rpe: 7, duration: 75,
      items: [
        ...runWU(),
        RUN('dr_hyrox_run', { name: t('٨-١٢ × ١ كم على سرعة السباق', '8-12 x 1 km at race pace'), sets: 1, reps: '8-12', distance: '1km', intensity: '3:50-4:00', basis: 'pace', rest: '60s', restType: 'jog', ...P('اقتصاد الجري على سرعة السباق بالظبط', 'Running economy at exact race pace', 'threshold'), ...N('رجال برو ٣:٥٠-٤:٠٠، سيدات ٤:١٥-٤:٢٥/كم. ٨ ← ١٠ ← ١٢ ثم ٦ في التخفيف. في التهدئة: ٦ ثم ٤.', 'Pro men 3:50-4:00, women 4:15-4:25/km. 8 → 10 → 12, then 6 on deload. In the taper: 6 then 4.') }),
        WODL('dr_hyrox_wallballs', 'amrap', { name: t('بعد آخر ١ كم: ٥٠ وول بول بإيقاع السباق', 'After the last km: 50 wall balls at race rhythm'), reps: '50', intensity: '8', basis: 'rpe', ...P('ربط سرعة الجري بآخر محطة', 'Link race-pace running to the final station', 'muscular_endurance') }),
        ...coolLegs()
      ]
    },
    stInt: {
      title: t('فترات محطات على الزمن المستهدف', 'Station intervals at target splits'),
      goal: t('التعود على إيقاع كل محطة بالزمن المستهدف بالظبط.', 'Learn the exact target rhythm for each station.'),
      components: ['muscular_endurance', 'threshold', 'tactics'],
      rpe: 8, duration: 80,
      items: [
        ...hyroxWU(),
        WODL('dr_hyrox_ski', 'intervals', { sets: 4, distance: '500m', time: '1:55/500m', intensity: '8', basis: 'rpe', rest: '90s', ...P('إيقاع سكي السباق (رجال ١:٥٥، سيدات ٢:٠٥/٥٠٠م)', 'Race ski pace (men 1:55, women 2:05/500m)', 'threshold') }),
        WODL('dr_hyrox_row', 'intervals', { sets: 4, distance: '500m', time: '1:53/500m', intensity: '8', basis: 'rpe', rest: '90s', ...P('إيقاع تجديف السباق (رجال ١:٥٣، سيدات ٢:٠٥/٥٠٠م)', 'Race row pace (men 1:53, women 2:05/500m)', 'threshold') }),
        WOD('intervals', '٤ جولات (راحة ٢ دقيقة): ٢٥ وول بول ٩/٦ كجم في ٦٠-٦٥ث + ٢٠٠م جري بسرعة السباق + ٢٥م لانجز بالشنطة', '4 rounds (2 min rest): 25 wall balls 9/6 kg in 60-65s + 200m at race pace + 25m sandbag lunges',
          { duration: '20min', intensity: '8', basis: 'rpe', ...P('إيقاع الوول بول واللانجز تحت تعب الجري', 'Wall-ball and lunge rhythm under running fatigue', 'muscular_endurance') }),
        WODL('dr_hyrox_burpee_bj', 'intervals', { sets: 3, distance: '40m', time: '1:30', intensity: '8', basis: 'rpe', rest: '90s', ...P('بيربي برود جامب على إيقاع ٣:٠٠ للـ ٨٠م', 'BBJ at a 3:00 pace per 80m', 'muscular_endurance') }),
        ...coolLegs()
      ]
    },
    compB: {
      title: t('ساندويتش محطات — ٢ كم + محطتين', 'Station sandwich — 2 km + two stations'),
      goal: t('جري أطول على سرعة السباق بين محطتين متتاليتين.', 'Longer race-pace running between back-to-back stations.'),
      components: ['muscular_endurance', 'threshold', 'mental'],
      rpe: 8, duration: 85,
      items: [
        ...hyroxWU(),
        WOD('intervals', '٣ جولات (راحة ٣ دقايق): ٢ كم بسرعة السباق + محطتين — (١) ٥٠٠م تجديف + ٥٠ وول بول (٢) ١٠٠م فارمرز + ٥٠م لانجز (٣) ٥٠٠م سكي + ٤٠م بيربي برود جامب', '3 rounds (3 min rest): 2 km at race pace + two stations — (1) 500m row + 50 wall balls (2) 100m farmers + 50m lunges (3) 500m ski + 40m BBJ',
          { duration: '50min', intensity: '8', basis: 'rpe', ...P('تحمل خاص بالسباق بأوزان البرو', 'Race-specific endurance at Pro weights', 'muscular_endurance'), ...N(PRO_W.ar, PRO_W.en) }),
        S('ex_hip_thrust', 3, '8', '2', 'rir', '90s', P('قوة الألوية للسليد والجري', 'Glute strength for sleds and running', 'strength')),
        ...coolLegs()
      ]
    },
    sim: {
      title: t('محاكاة السباق', 'Race simulation'),
      goal: t('تجربة خطة الأزمنة والتغذية والانتقالات تحت تعب حقيقي.', 'Test the split plan, fuelling and transitions under real fatigue.'),
      components: ['muscular_endurance', 'threshold', 'mental', 'tactics'],
      rpe: 9, duration: 120,
      items: [
        ...hyroxWU(),
        WOD('hyrox_sim', 'أسبوع ١٠: النص التاني (٤ × ١ كم + تجديف ١٠٠٠م، فارمرز ٢٠٠م، لانجز ١٠٠م، ١٠٠ وول بول) بعد ٢٠ دقيقة جري زون ٣. أسبوع ١١: سباق كامل ٨ × (١ كم + محطة). أسبوع ١٢: ٤ × (١ كم + نص محطة)', 'Week 10: back half (4 x 1 km + 1000m row, 200m farmers, 100m lunges, 100 wall balls) after a 20-min Z3 run. Week 11: full race 8 x (1 km + station). Week 12: 4 x (1 km + half station)',
          { duration: '65-75min', intensity: '9', basis: 'rpe', ...P('تنفيذ الأزمنة المستهدفة بشدة ٩٥٪', 'Execute target splits at 95% effort', 'muscular_endurance'), ...N('أزمنة مستهدفة رجال أقل من ٦٥ دقيقة: جري ٣:٥٥/كم، سكي ٣:٥٥، دفع ٣:٠٠، سحب ٤:٠٠، بيربي ٣:١٠، تجديف ٣:٥٠، فارمرز ١:٢٠، لانجز ٣:٤٥، وول بول ٤:١٥، روكس زون ٥:٠٠. سيدات +٨-١٢٪.', 'Men sub-65 targets: runs 3:55/km, ski 3:55, push 3:00, pull 4:00, BBJ 3:10, row 3:50, farmers 1:20, lunges 3:45, wall balls 4:15, Roxzone 5:00. Women +8-12%.') }),
        mobN('تبريد ١٠ دقايق + أكل استشفاء، وراجع الأزمنة مقابل الخطة', '10-min cool-down + recovery meal; review splits against the plan', { duration: '10min' }),
        ...coolLegs().slice(0, 2)
      ]
    },
    strM: {
      title: t('قوة صيانة (تهدئة)', 'Maintenance strength (taper)'),
      goal: t('الحفاظ على القوة والقدرة بحجم قليل جدًا.', 'Maintain strength and power on very low volume.'),
      components: ['max_strength', 'power', 'recovery'],
      rpe: 6, duration: 50,
      items: [
        ...hyroxWU(),
        S('ex_barbell_back_squat', 3, '2', '80', '1rm', '3min', P('صيانة القوة القصوى', 'Maintain max strength', 'max_strength')),
        DR('dr_box_jump', { sets: 3, reps: '3', rest: '90s', ...P('حدة عصبية', 'Neural sharpness', 'power') }),
        WODL('dr_hyrox_sled_push', 'intervals', { sets: 3, distance: '12.5m', intensity: '7', basis: 'rpe', rest: '2min', ...P('إحساس السليد بوزن السباق', 'Feel the sled at race weight', 'strength') }),
        ...coolLegs()
      ]
    },
    tpMix: {
      title: t('ميكس سباق مختصر (تهدئة)', 'Short race mix (taper)'),
      goal: t('الإحساس بإيقاع السباق كامل بحجم ٤٠٪.', 'Feel full race rhythm at 40% volume.'),
      components: ['threshold', 'muscular_endurance', 'recovery'],
      rpe: 7, duration: 60,
      items: [
        ...hyroxWU(),
        WOD('intervals', '٤ جولات (راحة ٣ دقايق): ١ كم بسرعة السباق + نص محطة (٥٠٠م سكي / ٢٥م دفع سليد / ٥٠٠م تجديف / ٥٠ وول بول)', '4 rounds (3 min rest): 1 km at race pace + half a station (500m ski / 25m sled push / 500m row / 50 wall balls)',
          { duration: '35min', intensity: '8', basis: 'rpe', ...P('ثقة في الإيقاع من غير تعب متراكم', 'Pace confidence without accumulated fatigue', 'threshold'), ...N('أسبوع ١٥: ٣ جولات بس.', 'Week 15: only 3 rounds.') }),
        ...coolLegs()
      ]
    },
    race: {
      title: t('يوم السباق — هايروكس برو', 'Race day — HYROX Pro'),
      goal: t('تنفيذ خطة الأزمنة: جري ثابت، سليد بإيقاع مستمر من غير وقفات، وتسريع في آخر ٢ كم والوول بول.', 'Execute the split plan: even running, continuous sleds without stops, and a push over the last 2 km and wall balls.'),
      components: ['muscular_endurance', 'threshold', 'mental', 'tactics'],
      rpe: 10, duration: 120,
      items: [
        wuN('إحماء ٢٠-٢٥ دقيقة: جري سهل ١٠ دقايق، تمارين جري، ٣ ستريدز، ٢×١٢.٥م دفع سليد خفيف لو متاح، ١٠ وول بول', '20-25 min warm-up: 10 min easy jog, drills, 3 strides, 2x12.5m light sled push if available, 10 wall balls', { duration: '25min' }),
        WOD('hyrox_sim', 'السباق: ٨ × (١ كم جري + محطة) بأوزان البرو بالترتيب الرسمي', 'Race: 8 x (1 km run + station) at Pro weights in official order',
          { duration: '60-75min', intensity: '10', basis: 'rpe', ...P('أفضل زمن ممكن بخطة أزمنة مكتوبة', 'Best possible time with a written split plan', 'muscular_endurance'), ...N(PRO_W.ar + ' الجري ١-٢ أبطأ ٣-٥ ث/كم من المستهدف. جيل ٢٠-٣٠ جم كربوهيدرات بعد المحطة ٣ و٦.', PRO_W.en + ' Runs 1-2 3-5 s/km slower than target. A 20-30 g carb gel after stations 3 and 6.') }),
        mobN('تبريد مشي وسوائل وأكل خلال ساعة', 'Walk cool-down, fluids and a meal within an hour', { duration: '10min' })
      ]
    }
  }
};

/* ============ 6) هايروكس — دبلز / ريلاي متوسط (10 أسابيع) ============ */
const T_HX_DOUBLES = {
  id: 'pt_hyrox_doubles_int',
  sport: 'hyrox',
  level: 'intermediate',
  title: t('هايروكس — دبلز وريلاي ١٠ أسابيع (متوسط)', 'HYROX — 10-week Doubles and Relay prep (intermediate)'),
  goal: t('تجهيز فريق دبلز (الاتنين بيجروا الـ ٨ كم مع بعض ويقسموا شغل المحطات) أو ريلاي (٤ لاعبين، كل واحد ٢ × (١ كم + محطة)): جري على سرعة أعلى من الفردي، تقسيم ذكي للمحطات حسب نقاط قوة كل لاعب، تبديلات سريعة، ومحاكاة كفريق.',
    'Prepare a Doubles team (both run all 8 km together and split station work) or a Relay team (4 athletes, each 2 x (1 km + station)): faster-than-singles running, smart station splits based on each athlete\'s strengths, fast change-overs and team simulations.'),
  components: ['aerobic', 'threshold', 'muscular_endurance', 'strength', 'tactics', 'mental'],
  sessionsPerWeek: 4,
  periods: [
    {
      type: 'gpp',
      goal: t('اختبارات فردية وكفريق، قاعدة جري، وقوة عامة.', 'Individual and team testing, running base and general strength.'),
      components: ['aerobic', 'strength', 'technique'],
      blocks: [
        {
          name: t('أسبوع ١ — اختبارات وتوزيع الأدوار', 'Week 1 — Testing and role assignment'),
          goal: t('٥ كم لكل لاعب، واختبار محطات بالنص لكل لاعب لتحديد مين ياخد أي جزء من كل محطة.', 'A 5 km test for each athlete and half-station tests for each to decide who takes which share of each station.'),
          components: ['aerobic', 'tactics'],
          loads: [4],
          weekTypes: ['test'],
          pattern: ['tt', '', 'pTest', '', 'easy', '', '']
        },
        {
          name: t('بلوك ١ — قاعدة (أسابيع ٢-٣)', 'Block 1 — Base (weeks 2-3)'),
          goal: t('جري زون ٢ وطويل، قوة عامة، وأول جلسات "أنا وانت" على المحطات.', 'Z2 and long runs, general strength and the first "you go, I go" station sessions.'),
          components: ['aerobic', 'strength', 'muscular_endurance'],
          loads: [5, 6],
          weekTypes: ['load', 'load'],
          pattern: ['strF2', 'easy', '', 'partner', '', 'long', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('عتبة أعلى (سرعة الدبلز أسرع ١٠-٢٠ ث/كم من الفردي)، تحمل المحطات بأوزان السباق، وتبديلات سريعة تحت التعب.', 'Higher threshold (Doubles pace is 10-20 s/km faster than singles), station endurance at race weights and fast change-overs under fatigue.'),
      components: ['threshold', 'muscular_endurance', 'tactics'],
      blocks: [
        {
          name: t('بلوك ٢ — تخصيص (أسابيع ٤-٦)', 'Block 2 — Specific (weeks 4-6)'),
          goal: t('فترات عتبة ٥ ← ٦ × ١ كم، جري بعد المحطات كفريق. أسبوع ٥ صدمة وأسبوع ٦ تخفيف.', 'Threshold 5 → 6 x 1 km, team compromised running. Week 5 shock, week 6 deload.'),
          components: ['threshold', 'muscular_endurance', 'tactics'],
          loads: [6, 7, 4],
          weekTypes: ['load', 'shock', 'deload'],
          pattern: ['strE2', 'thr', '', 'partner', '', 'compD', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('محاكاة كفريق: نص سباق ثم سباق كامل بشدة ٩٠٪ وتثبيت خطة التقسيم.', 'Team simulation: half race then a full race at 90% and lock in the split plan.'),
      components: ['muscular_endurance', 'tactics', 'mental'],
      blocks: [
        {
          name: t('بلوك ٣ — محاكاة (أسابيع ٧-٨)', 'Block 3 — Simulation (weeks 7-8)'),
          goal: t('أسبوع ٧: نص سباق كفريق. أسبوع ٨: سباق كامل ٩٠٪ بنفس خطة التقسيم والتبديل.', 'Week 7: team half race. Week 8: full race at 90% with the final split and change-over plan.'),
          components: ['muscular_endurance', 'tactics', 'mental'],
          loads: [7, 8],
          weekTypes: ['load', 'shock'],
          pattern: ['strE2', 'easy', '', 'compD', '', 'simD', '']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('تقليل الحجم ٤٠-٦٠٪ مع جلسة إيقاع فريق مختصرة، والوصول للسباق مرتاحين.', 'Cut volume 40-60% with one short team-pace session and arrive fresh.'),
      components: ['recovery', 'tactics', 'mental'],
      blocks: [
        {
          name: t('أسبوع ٩ — تهدئة', 'Week 9 — Taper'),
          goal: t('جلسة فريق مختصرة وجريين سهلين.', 'One short team session and two easy runs.'),
          components: ['recovery', 'tactics'],
          loads: [5],
          weekTypes: ['taper'],
          pattern: ['easy', '', 'tpD', '', 'easy', '', '']
        },
        {
          name: t('أسبوع ١٠ — أسبوع السباق', 'Week 10 — Race week'),
          goal: t('جري سهل، تنشيط قبل السباق بيومين، والسباق.', 'Easy run, a primer two days out, and the race.'),
          components: ['mental', 'recovery'],
          loads: [3],
          weekTypes: ['comp'],
          pattern: ['easy', '', '', 'prim', '', 'raceD', '']
        }
      ]
    }
  ],
  sessions: {
    tt: hxTT('كل لاعب يختبر لوحده. سرعة الفريق في السباق بتتحدد على اللاعب الأبطأ في الجري.', 'Each athlete tests alone. Team race pace is set by the slower runner.'),
    easy: hxEasy('35-50min', 60, 'لو ممكن اجروا مع بعض عشان تتعودوا على نفس الإيقاع.', 'Run together when possible to get used to a shared rhythm.'),
    prim: hxPrim(),
    pTest: {
      title: t('اختبار محطات لكل لاعب وتوزيع الأدوار', 'Station tests per athlete and role assignment'),
      goal: t('معرفة مين أسرع في كل محطة لتقسيم الشغل بذكاء.', 'Find who is faster at each station to split the work smartly.'),
      components: ['muscular_endurance', 'tactics', 'strength'],
      rpe: 8, duration: 90,
      items: [
        ...hyroxWU(),
        WODL('dr_hyrox_ski', 'fortime', { name: t('٥٠٠م سكي لكل لاعب', '500m ski per athlete'), distance: '500m', intensity: '9', basis: 'rpe', ...P('زمن سكي لكل لاعب', 'Ski time per athlete', 'threshold') }),
        WODL('dr_hyrox_sled_push', 'fortime', { name: t('٢٥م دفع سليد لكل لاعب (راحة بالتبادل)', '25m sled push per athlete (alternate rest)'), distance: '25m', intensity: '9', basis: 'rpe', rest: '3min', ...P('مين أقوى في السليد', 'Who is stronger on the sled', 'strength') }),
        WODL('dr_hyrox_burpee_bj', 'fortime', { name: t('٤٠م بيربي برود جامب لكل لاعب', '40m BBJ per athlete'), distance: '40m', intensity: '9', basis: 'rpe', rest: '3min', ...P('إيقاع البيربي لكل لاعب', 'BBJ rhythm per athlete', 'muscular_endurance') }),
        WODL('dr_hyrox_wallballs', 'fortime', { name: t('٥٠ وول بول لكل لاعب', '50 wall balls per athlete'), reps: '50', intensity: '9', basis: 'rpe', rest: '3min', ...P('تحمل الوول بول لكل لاعب', 'Wall-ball endurance per athlete', 'muscular_endurance') }),
        DR(null, { name: t('جلسة تخطيط: جدول مين ياخد كام في كل محطة وإمتى التبديل', 'Planning: a table of who takes how much of each station and when to switch'), sets: 1, reps: '1', ...P('خطة تقسيم مبنية على الأرقام', 'A data-based split plan', 'tactics'), ...N('قاعدة: التبديل كل ٢٥٠م في السكي والتجديف، كل ١٢.٥م في السليد، كل ١٠-١٥ وول بول. اللاعب الأقوى ياخد ٥٥-٦٠٪ من السليد. في الريلاي: خلي كل لاعب ياخد المحطتين الأنسب ليه.', 'Rule of thumb: switch every 250m on ski and row, every 12.5m on sleds, every 10-15 wall balls. The stronger athlete takes 55-60% of the sleds. In Relay: give each athlete the two stations that suit them.') }),
        ...coolLegs()
      ]
    },
    strF2: {
      title: t('قوة عامة للفريق', 'General strength for the team'),
      goal: t('قوة الرجلين والسحب والقبضة للمحطات.', 'Leg, pull and grip strength for the stations.'),
      components: ['strength', 'core', 'prevention'],
      rpe: 7, duration: 65,
      items: [
        ...hyroxWU(),
        S('ex_barbell_back_squat', 4, '6', '72-77', '1rm', '2-3min', { tempo: '3-0-1-0', ...P('قوة الرجلين للسليد والوول بول', 'Leg strength for sleds and wall balls', 'strength') }),
        S('ex_romanian_deadlift', 3, '8', '2', 'rir', '2min', P('السلسلة الخلفية للسحب والدفع', 'Posterior chain for pushing and pulling', 'strength')),
        S('ex_bent_over_row', 3, '8', '2', 'rir', '90s', P('قوة السحب للسليد والتجديف', 'Pulling strength for sled pull and row', 'strength')),
        S('ex_walking_lunge', 3, '12/leg', '7', 'rpe', '90s', P('قوة رجل واحدة للانجز', 'Single-leg strength for lunges', 'strength')),
        S('ex_farmers_carry', 3, '50m', '8', 'rpe', '90s', P('القبضة والجذع', 'Grip and trunk', 'strength')),
        S('ex_side_plank', 3, '30s/side', '6', 'rpe', '30s', P('ثبات الجذع الجانبي', 'Lateral trunk stability', 'core')),
        ...coolLegs()
      ]
    },
    partner: {
      title: t('محطات "أنا وانت" + جري متزامن', '"You go, I go" stations + synchronised running'),
      goal: t('تعلم التبديل السريع وتقسيم المحطات والجري بنفس الإيقاع جنب بعض.', 'Learn fast switches, station splits and running side by side at one pace.'),
      components: ['muscular_endurance', 'tactics', 'aerobic'],
      rpe: 7, duration: 75,
      items: [
        ...hyroxWU(),
        WOD('intervals', 'بالتبادل (واحد شغال والتاني بيرتاح): ١٠٠٠م تجديف (تبديل كل ٢٥٠م)، ٥٠م دفع سليد (كل ١٢.٥م)، ١٠٠ وول بول (كل ١٠-١٥)، ٢٠٠م فارمرز (كل ٥٠م)', 'Alternating (one works, one rests): 1000m row (switch every 250m), 50m sled push (every 12.5m), 100 wall balls (every 10-15), 200m farmers (every 50m)',
          { duration: '25min', intensity: '8', basis: 'rpe', ...P('شغل عالي الشدة بفترات راحة قصيرة زي السباق بالظبط', 'High-intensity work with short rests, exactly like the race', 'muscular_endurance'), ...N('أوزان الدبلز (أوبن): دفع ١٥٢/١٠٢، سحب ١٠٣/٧٨، فارمرز ٢×٢٤/٢×١٦، وول بول ٦/٤ كجم. التبديل في أقل من ٣ ثواني.', 'Doubles (Open) weights: push 152/102, pull 103/78, farmers 2x24/2x16, wall ball 6/4 kg. Switch in under 3 seconds.') }),
        RUN('dr_hyrox_run', { name: t('٤ × ١ كم جري مع بعض على سرعة السباق', '4 x 1 km together at race pace'), sets: 1, reps: '4', distance: '1km', intensity: '7', basis: 'rpe', rest: '90s', restType: 'walk', ...P('الجري كفريق بإيقاع اللاعب الأبطأ من غير ما يتقطع', 'Run as a team at the slower athlete\'s pace without splitting up', 'aerobic'), ...N('اللاعب الأسرع يجري نص خطوة ورا ويدي الإيقاع بالكلام.', 'The faster athlete runs half a step behind and paces verbally.') }),
        ...coolLegs()
      ]
    },
    long: {
      title: t('جري طويل زون ٢', 'Long Z2 run'),
      goal: t('تحمل هوائي للسباق.', 'Aerobic endurance for the race.'),
      components: ['aerobic', 'mental'],
      rpe: 5, duration: 85,
      items: [
        wuN('مشي سريع ٥ دقايق + حركية للحوض والكاحل', '5-min brisk walk + hip and ankle mobility', { duration: '8min' }),
        RUN('ad_zone_2_easy_run', { duration: '50-70min', intensity: 'Z2', basis: 'hr', ...P('حجم هوائي أسبوعي', 'Weekly aerobic volume', 'aerobic'), ...N('٥٠ دقيقة أسبوع ٢، و٦٠-٧٠ أسبوع ٣.', '50 min in week 2, 60-70 in week 3.') }),
        ...coolLegs()
      ]
    },
    strE2: {
      title: t('قوة تحمل المحطات', 'Station strength-endurance'),
      goal: t('تحمل عضلي بأوزان السباق مع قوة صيانة.', 'Muscular endurance at race weights plus maintenance strength.'),
      components: ['muscular_endurance', 'strength'],
      rpe: 8, duration: 70,
      items: [
        ...hyroxWU(),
        S('ex_front_squat', 4, '4', '78-82', '1rm', '2-3min', P('قوة الرجلين بنسبة أعلى', 'Leg strength at a higher percentage', 'max_strength')),
        WODL('dr_hyrox_sled_push', 'intervals', { sets: 6, distance: '12.5m', intensity: '8', basis: 'rpe', rest: '60s', ...P('دفعات قصيرة بوزن السباق زي تبديلات الدبلز', 'Short race-weight pushes like Doubles switches', 'muscular_endurance') }),
        WODL('dr_hyrox_sled_pull', 'intervals', { sets: 6, distance: '12.5m', intensity: '8', basis: 'rpe', rest: '60s', ...P('سحبات قصيرة بوزن السباق', 'Short race-weight pulls', 'muscular_endurance') }),
        WOD('intervals', '٤ جولات (راحة ٩٠ث): ٢٠ وول بول، ٢٥م لانجز بالشنطة، ٤٠م بيربي برود جامب', '4 rounds (90s rest): 20 wall balls, 25m sandbag lunges, 40m burpee broad jumps',
          { duration: '20min', intensity: '8', basis: 'rpe', ...P('تحمل رجلين للمحطات الأخيرة', 'Leg endurance for the late stations', 'muscular_endurance') }),
        ...coolLegs()
      ]
    },
    thr: {
      title: t('عتبة — ١ كم فترات', 'Threshold — 1 km repeats'),
      goal: t('رفع العتبة لأن الدبلز أسرع في الجري من الفردي.', 'Raise threshold, since Doubles running is faster than singles.'),
      components: ['threshold', 'aerobic'],
      rpe: 7, duration: 60,
      items: [
        ...runWU(),
        RUN('dr_tempo_run', { name: t('٥-٦ × ١ كم على العتبة', '5-6 x 1 km at threshold'), sets: 1, reps: '5-6', distance: '1km', intensity: '7-8', basis: 'rpe', rest: '75s', restType: 'jog', ...P('العتبة: سرعة الـ ٥ كم + ١٠-١٥ ث/كم', 'Threshold: 5 km pace + 10-15 s/km', 'threshold'), ...N('أسبوع ٦ (تخفيف): ٣ فترات.', 'Week 6 (deload): 3 reps.') }),
        S('ex_step_up', 3, '10/leg', '7', 'rpe', '60s', P('قوة رجل واحدة للجري', 'Single-leg strength for running', 'strength')),
        ...coolLegs()
      ]
    },
    compD: {
      title: t('جري بعد المحطات كفريق', 'Team compromised running'),
      goal: t('الجري مع بعض بسرعة السباق بعد محطات مقسومة وتبديلات سريعة.', 'Run together at race pace after split stations and quick switches.'),
      components: ['muscular_endurance', 'threshold', 'tactics'],
      rpe: 8, duration: 75,
      items: [
        ...hyroxWU(),
        WOD('intervals', '٤ جولات (راحة ٢ دقيقة): ١ كم مع بعض بسرعة السباق + محطة مقسومة — (١) ١٠٠٠م سكي (٢) ٥٠م دفع + ٥٠م سحب سليد (٣) ٨٠م بيربي برود جامب (٤) ١٠٠ وول بول', '4 rounds (2 min rest): 1 km together at race pace + a split station — (1) 1000m ski (2) 50m sled push + 50m sled pull (3) 80m burpee broad jumps (4) 100 wall balls',
          { duration: '45min', intensity: '8', basis: 'rpe', ...P('إيقاع فريق ثابت وتقسيم فعال للمحطات', 'Steady team pace and efficient station splits', 'muscular_endurance'), ...N('نفذوا خطة التقسيم من أسبوع ١ وسجلوا زمن كل محطة. أسبوع ٥ (صدمة): ٥ جولات بإضافة ١٠٠٠م تجديف.', 'Use the week-1 split plan and log each station. Week 5 (shock): 5 rounds, adding a 1000m row.') }),
        DR(null, { name: t('تبديلات: لمس الإيد والتبديل في أقل من ٣ ث، والمرتاح يشرب ويجهز', 'Change-overs: hand tag and switch in under 3s; the resting athlete drinks and gets ready'), sets: 6, reps: '1', ...P('توفير دقيقة أو أكتر في السباق', 'Save a minute or more in the race', 'tactics') }),
        ...coolLegs()
      ]
    },
    simD: {
      title: t('محاكاة سباق دبلز / ريلاي', 'Doubles / Relay race simulation'),
      goal: t('تجربة الخطة كاملة كفريق: الإيقاع، التقسيم، التبديل، والتغذية.', 'Rehearse the whole team plan: pacing, splits, change-overs and fuelling.'),
      components: ['muscular_endurance', 'tactics', 'mental'],
      rpe: 9, duration: 110,
      items: [
        ...hyroxWU(),
        WOD('hyrox_sim', 'أسبوع ٧: نص سباق (٤ × ١ كم + سكي، دفع، سحب، بيربي). أسبوع ٨: سباق كامل ٨ × (١ كم + محطة) بشدة ٩٠٪. ريلاي: كل لاعب ٢ × (١ كم + محطة) وتسليم في منطقة التبديل', 'Week 7: half race (4 x 1 km + ski, push, pull, BBJ). Week 8: full race 8 x (1 km + station) at 90%. Relay: each athlete 2 x (1 km + station) with a tag in the change zone',
          { duration: '50-80min', intensity: '8-9', basis: 'rpe', ...P('تنفيذ خطة الفريق تحت تعب حقيقي', 'Execute the team plan under real fatigue', 'muscular_endurance'), ...N('مستهدف دبلز متوسط: ٦٥-٨٠ دقيقة. الريلاي: كل لاعب يروح في أقصى شدة على جزئه لأن عنده راحة طويلة.', 'Intermediate Doubles target: 65-80 min. Relay: each athlete goes near-max on their leg since rest is long.') }),
        mobN('تبريد ١٠ دقايق ومراجعة الأزمنة وتعديل خطة التقسيم', '10-min cool-down, review splits and adjust the split plan', { duration: '10min' }),
        ...coolLegs().slice(0, 2)
      ]
    },
    tpD: {
      title: t('إيقاع فريق مختصر (تهدئة)', 'Short team-pace session (taper)'),
      goal: t('الحفاظ على الإيقاع والتبديلات بحجم قليل.', 'Keep pace and change-overs sharp on low volume.'),
      components: ['tactics', 'aerobic', 'recovery'],
      rpe: 6, duration: 50,
      items: [
        ...hyroxWU(),
        WOD('intervals', '٣ جولات (راحة ٣ دقايق): ٥٠٠م مع بعض بسرعة السباق + نص محطة مقسومة (٥٠٠م تجديف / ٢٥م دفع سليد / ٥٠ وول بول)', '3 rounds (3 min rest): 500m together at race pace + half a split station (500m row / 25m sled push / 50 wall balls)',
          { duration: '25min', intensity: '7', basis: 'rpe', ...P('ثقة في الخطة من غير تعب', 'Confidence in the plan without fatigue', 'tactics') }),
        ...coolLegs()
      ]
    },
    raceD: {
      title: t('يوم السباق — دبلز / ريلاي', 'Race day — Doubles / Relay'),
      goal: t('تنفيذ خطة الفريق: جري مع بعض بإيقاع ثابت، تبديلات سريعة، وتسريع في آخر ٢ كم.', 'Execute the team plan: run together at a steady pace, fast switches, push the last 2 km.'),
      components: ['muscular_endurance', 'tactics', 'mental'],
      rpe: 9, duration: 120,
      items: [
        wuN('إحماء ٢٠ دقيقة مع بعض: جري سهل، تمارين جري، ستريدز، ٥ وول بول و٥ بيربي لكل لاعب', '20-min warm-up together: easy jog, drills, strides, 5 wall balls and 5 burpees each', { duration: '20min' }),
        WOD('hyrox_sim', 'السباق: ٨ × (١ كم جري + محطة) — دبلز: الاتنين يجروا كل كيلو ويقسموا المحطات. ريلاي: كل لاعب ٢ × (١ كم + محطة)', 'Race: 8 x (1 km run + station) — Doubles: both run every km and split stations. Relay: each athlete 2 x (1 km + station)',
          { duration: '60-80min', intensity: '9', basis: 'rpe', ...P('أفضل زمن للفريق بخطة التقسيم المتفق عليها', 'Best team time with the agreed split plan', 'muscular_endurance'), ...N('أوزان الدبلز رجال/سيدات/مختلط حسب الفئة (أوبن). اتفقوا على كلمات قصيرة للتبديل. جيل بعد المحطة ٤.', 'Doubles weights per category (men/women/mixed, Open). Agree short switch calls. A gel after station 4.') }),
        mobN('تبريد مشي وسوائل وأكل خلال ساعة', 'Walk cool-down, fluids and a meal within an hour', { duration: '10min' })
      ]
    }
  }
};

export const PLAN_TEMPLATES_CF = [T_CF_ONRAMP, T_CF_OPEN, T_CF_COMP, T_HX_FIRST, T_HX_PRO, T_HX_DOUBLES];
