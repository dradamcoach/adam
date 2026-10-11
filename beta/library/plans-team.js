/*
 * ADAM — قوالب مخطط موسمي للألعاب الجماعية
 * كرة قدم (كبار متقدم + ناشئين)، سلة، يد، طائرة، خماسي، رجبي، هوكي ميدان، بيسبول.
 * كل قالب موسم كامل: فترة إعداد (عام وخاص) ← ما قبل المنافسات ← منافسات بدورة أسبوعية
 * حول يوم الماتش (MD-4 ... MD+1) ← فترة انتقالية، مع أسابيع اختبارات وتخفيف.
 * كل تمرين مكتوب بالشدة والحجم والراحة والهدف والعنصر البدني.
 * Validate: node tools/check-plans.js library/plans-team.js
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
/* timed rounds / intervals / games: sets, reps, duration, intensity, basis, rest */
const tm = (x, sets, reps, duration, intensity, basis, rest, purpose, component, extra) =>
  clean({ kind: 'timed', ...ref(x), sets, reps, duration, intensity, basis, rest, purpose, component, ...(extra || {}) });
const dr = (x, o, purpose, component, extra) => clean({ kind: 'drill', ...ref(x), ...o, purpose, component, ...(extra || {}) });
const rn = (x, o, purpose, component, extra) => clean({ kind: 'run', ...ref(x), ...o, purpose, component, ...(extra || {}) });
const wu = (x, o) => clean({ kind: 'warmup', ...ref(x), ...(o || {}) });
const mob = (x, o) => clean({ kind: 'mobility', ...ref(x), ...(o || {}) });
const breathe = (min) => mob(T('تنفس بطني بطيء (٤ ثواني شهيق / ٦ ثواني زفير)', 'Slow diaphragmatic breathing (4s in / 6s out)'), { duration: min || '4min' });
const SIDE = T('لكل ناحية', 'Each side');

/* ---------- Warm-ups & cool-downs ---------- */
const wuPitch = () => [
  wu(T('جري خفيف بتنويعات: جانبي، للخلف، فتح وقفل الحوض', 'Easy jog with variations: side-steps, backwards, hip in/out'), { duration: '5min' }),
  wu('wg_worlds_greatest_stretch', { sets: 1, reps: '3/side' }),
  wu('ad_a_skip', { sets: 2, distance: '20m', note: T('بعدها B-skip وكاريوكا ٢ × ٢٠م', 'Then B-skip and carioca 2 x 20m') }),
  wu(T('انطلاقات متدرجة ٦٠-٧٠-٨٠-٩٠٪ من السرعة القصوى', 'Progressive strides at 60-70-80-90% of max speed'), { sets: 1, reps: '4', distance: '40m' })
];
const wuRondo = () => wu(T('روندو ٥ ضد ٢ في مربع ١٢×١٢م (لمستين)', 'Rondo 5v2 in a 12x12m grid (two-touch)'), { sets: 2, duration: '3min' });
const wuGym = () => [
  wu('ex_stationary_bike', { duration: '6min' }),
  wu('wg_worlds_greatest_stretch', { sets: 1, reps: '3/side' }),
  wu('wg_banded_monster_walk', { sets: 2, distance: '10m' }),
  wu('ad_pogo_hop', { sets: 2, reps: '10' })
];
const wuCourt = () => [
  wu('ex_jump_rope', { duration: '3min' }),
  wu(T('تجهيز حركي على الملعب: شافل، كاريوكا، رجوع للخلف، لانج مع لف الجذع', 'Court movement prep: shuffles, carioca, backpedal, lunge with rotation'), { duration: '6min' }),
  wu('dr_ladder_icky', { sets: 2, reps: '2' }),
  wu(T('نطات متدرجة: بوجو ثم نطات تحضيرية ٥٠-٧٠-٩٠٪', 'Progressive jumps: pogos then prep jumps at 50-70-90%'), { sets: 1, reps: '8' })
];
const cdPitch = () => [
  mob(T('جري خفيف ومشي للتهدئة', 'Easy jog and walk-down'), { duration: '5min' }),
  mob('ex_hamstring_stretch', { sets: 1, duration: '45s', note: SIDE }),
  mob('ex_hip_flexor_stretch', { sets: 1, duration: '45s', note: SIDE })
];
const cdCourt = () => [
  mob(T('مشي وتنفس للتهدئة', 'Walk and breathe down'), { duration: '4min' }),
  mob('ex_calf_stretch', { sets: 1, duration: '45s', note: SIDE }),
  mob('ad_90_90_hip_switches', { sets: 2, reps: '6/side' })
];
const cdGym = () => [mob('ad_open_book', { sets: 1, reps: '8/side' }), breathe('3min')];

/* ---------- Prehab / injury prevention ---------- */
const PH = {
  nordic: (sets, reps) => st('ex_nordic_hamstring_curl', sets || 3, reps || '5', '8', 'rpe', '2min',
    T('قوة لامركزية للخلفية لتقليل إصابات شد الهامسترينج', 'Eccentric hamstring strength to reduce hamstring strain risk'), 'prevention',
    { tempo: '4-0-X-0', note: T('نزول بطيء على قد ما تقدر، والإيدين يزقوا للرجوع', 'Lower as slowly as possible, push back up with the hands') }),
  cph: (sets, reps, short) => st(short ? 'ad_short_lever_copenhagen_plank' : 'ex_copenhagen_plank', sets || 3, reps || '20s/side', '7', 'rpe', '60s',
    T('تقوية المقربات ووقاية من إصابات الفخذ الداخلي والحوض (الجروين)', 'Adductor strength to reduce groin injury risk'), 'prevention'),
  squeeze: () => st('ad_supine_adductor_ball_squeeze', 2, '5 x 5s', '8', 'rpe', '30s',
    T('تنشيط المقربات قبل الشغل السريع', 'Adductor activation before fast work'), 'prevention'),
  soleus: (sets) => st('ek_seated_calf_raise_using_machine', sets || 3, '12', '2', 'rir', '60s',
    T('قوة السوليوس لتحمل حمل الجري وحماية وتر أكيليس', 'Soleus strength for running load tolerance and Achilles protection'), 'prevention', { tempo: '2-1-2-0' }),
  heel: () => st('ad_eccentric_heel_drop', 3, '12/leg', '7', 'rpe', '45s',
    T('وقاية وتر أكيليس مع النط والانطلاقات', 'Achilles resilience for jumping and sprinting'), 'prevention', { tempo: '3-0-1-0' }),
  spanish: (sets) => st('ad_spanish_squat', sets || 4, '45s hold', '7', 'rpe', '60s',
    T('انقباض ثابت يخفف ألم وتر الرضفة ويقويه', 'Isometric loading to calm and strengthen the patellar tendon'), 'prevention'),
  cuff: () => st('ex_band_external_rotation', 3, '15', '2', 'rir', '45s',
    T('تقوية الكفة المدورة لفرملة دراع الرمي', 'Rotator-cuff strength to decelerate the throwing arm'), 'prevention', { tempo: '2-1-2-0' }),
  ytw: () => st('wg_prone_y_raise', 2, '10', '2', 'rir', '45s',
    T('تقوية أسفل الترابيس وثبات لوح الكتف', 'Lower-trap and scapular control'), 'prevention', { tempo: '2-2-2-0' }),
  serratus: () => st('ad_serratus_wall_slide', 2, '10', '2', 'rir', '45s',
    T('تحكم في لوح الكتف مع الرفع فوق الراس', 'Scapular upward rotation for overhead work'), 'prevention'),
  neck: () => st('ek_static_neck_flexion_and_extension', 3, '4 x 10s/direction', '6', 'rpe', '45s',
    T('قوة الرقبة الثابتة لتحمل الالتحامات وتقليل إصابات الرأس والرقبة', 'Isometric neck strength for collisions, reduces head and neck injury risk'), 'prevention'),
  ankle: () => st('ad_single_leg_balance_progression', 2, '30s/leg', '6', 'rpe', '30s',
    T('توازن وثبات الكاحل لتقليل الالتواءات', 'Balance and ankle control to reduce sprains'), 'balance'),
  pallof: () => st('wg_pallof_press', 3, '10/side', '2', 'rir', '45s',
    T('ثبات الجذع ضد الدوران', 'Anti-rotation core stability'), 'core', { tempo: '1-2-1-0' })
};

/* ---------- Tests ---------- */
const TST = {
  cmj: () => dr('ad_countermovement_jump', { sets: 1, reps: '3', rest: '60s' },
    T('قياس القدرة الانفجارية للرجلين ومتابعة التعب العصبي العضلي', 'Measure lower-limb power and monitor neuromuscular fatigue'), 'power',
    { note: T('الإيدين على الوسط، سجل أحسن محاولة بالسنتيمتر', 'Hands on hips, record the best attempt in cm') }),
  sprint: (dist) => rn(dist === '20m' ? T('اختبار عدو ٢٠م (زمن ١٠م و٢٠م)', '20m sprint test (10m and 20m splits)') : 'ad_30_m_sprint_test',
    { sets: 1, reps: '3', distance: dist || '30m', rest: '3min', restType: 'walk' },
    T('قياس التسارع والسرعة بخلايا ضوئية', 'Measure acceleration and speed with timing gates'), 'acceleration',
    { note: T('بداية من الوقوف ٥٠سم ورا الخط، سجل زمن ١٠م والزمن الكلي', 'Standing start 50cm behind the line, record the 10m split and total time') }),
  cod: () => rn('ad_505_agility_test', { sets: 1, reps: '2/side', distance: '10m', rest: '2min', restType: 'walk' },
    T('قياس تغيير الاتجاه ١٨٠ درجة من الناحيتين', '180-degree change-of-direction ability on both sides'), 'agility'),
  tdrill: () => rn('dr_cone_t_drill', { sets: 1, reps: '2', distance: '40m', rest: '2min', restType: 'walk' },
    T('رشاقة متعددة الاتجاهات (أمام، جانبي، خلف)', 'Multi-directional agility (forward, lateral, backward)'), 'agility'),
  yoyo: () => rn('ad_yo_yo_intermittent_recovery_test_level_1', { sets: 1, distance: '2 x 20m shuttles', rest: '10s', restType: 'active' },
    T('قياس التحمل المتقطع عالي الشدة (المسافة الكلية بالمتر)', 'Measure high-intensity intermittent endurance (total distance in m)'), 'vo2max',
    { note: T('راحة إيجابية ١٠ ث (٢ × ٥م) بين المكوكات، ينتهي بعد فشلين', '10s active recovery (2 x 5m) between shuttles, ends after two misses') }),
  ift: () => rn(T('اختبار ٣٠-١٥ للياقة المتقطعة (30-15 IFT)', '30-15 Intermittent Fitness Test (30-15 IFT)'), { sets: 1, distance: '40m shuttles', rest: '15s', restType: 'walk' },
    T('تحديد السرعة النهائية (VIFT) لتقنين جري الفترات', 'Establish final speed (VIFT) to prescribe interval running'), 'vo2max',
    { note: T('مراحل ٣٠ ث جري / ١٥ ث مشي، السرعة تزيد ٠.٥ كم/س كل مرحلة', '30s run / 15s walk stages, speed rises 0.5 km/h per stage') }),
  strength: (x, reps, comp) => st(x, 1, reps || '3RM', '100', '1rm', '3min',
    T('تحديد أقصى قوة لتقنين أحمال الجيم', 'Establish max strength to set gym loads'), comp || 'max_strength',
    { note: T('٣-٤ مجموعات تسخين متدرجة، ٣ محاولات بحد أقصى', '3-4 progressive warm-up sets, max 3 attempts') })
};

/* ---------- Match item ---------- */
const matchItem = (title, duration, purpose, note) => dr(title, { sets: 1, duration }, purpose, 'tactics', note ? { note } : undefined);

/* ================================================================== */
/* 1) Football — advanced senior team, full season                     */
/* ================================================================== */
const footballAdv = {
  id: 'pt_football_season_adv',
  sport: 'football',
  level: 'advanced',
  title: T('موسم كرة قدم كامل — فريق أول (متقدم)', 'Football full season — senior first team (advanced)'),
  goal: T('بناء قاعدة بدنية في الإجازة، تجهيز الفريق في ٦ أسابيع إعداد للوصول لأول ماتش جاهز، ثم الحفاظ على السرعة والقوة واللياقة طول الموسم بدورة أسبوعية حول يوم الماتش مع أقل نسبة إصابات.',
    'Build a physical base in the off-season, prepare the squad in a 6-week pre-season to be ready for the first match, then maintain speed, strength and fitness all season with a match-day microcycle and minimal injuries.'),
  components: ['aerobic', 'vo2max', 'speed_endurance', 'max_velocity', 'acceleration', 'strength', 'power', 'tactics', 'prevention', 'recovery'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: T('برنامج فردي في آخر الإجازة: قاعدة هوائية وقوة عامة عشان اللاعب يدخل الإعداد من غير إصابات', 'Late off-season individual programme: aerobic base and general strength so players arrive at pre-season injury-free'),
      components: ['aerobic', 'vo2max', 'strength', 'prevention'],
      blocks: [
        {
          name: T('بلوك ١ — برنامج الإجازة الفردي', 'Block 1 — Individual off-season programme'),
          goal: T('رجوع تدريجي لحمل الجري والقوة (جري متصل + فترات ٤ × ٤ دقايق + جيم عام)', 'Gradual return to running and strength load (continuous runs + 4 x 4min intervals + general gym)'),
          components: ['aerobic', 'vo2max', 'strength', 'prevention'],
          loads: [3, 4, 5], weekTypes: ['load', 'load', 'load'],
          pattern: ['off_aero', 'off_gym', '', 'off_hiit', 'off_gym', 'off_aero', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: T('الإعداد الخاص: اختبارات، ثم تحميل تدريجي لتحمل السرعة والقوة والماتشات المصغرة', 'Specific preparation: testing, then progressive loading of speed endurance, strength and small-sided games'),
      components: ['vo2max', 'speed_endurance', 'max_strength', 'acceleration', 'tactics'],
      blocks: [
        {
          name: T('أسبوع إعداد ١ — اختبارات', 'Pre-season week 1 — Testing'),
          goal: T('قياس المستوى (CMJ، عدو ١٠/٣٠م، ٥٠٥، يويو IR1) وتقسيم اللاعيبة لمجموعات حمل', 'Profile the squad (CMJ, 10/30m sprint, 505, Yo-Yo IR1) and set load groups'),
          components: ['power', 'acceleration', 'vo2max', 'technique'],
          loads: [5], weekTypes: ['test'],
          pattern: ['test', 'pre_ssg', 'pre_gym_str', 'md_p1', 'pre_speed', 'pre_ssg', '']
        },
        {
          name: T('أسابيع إعداد ٢-٤ — تحميل', 'Pre-season weeks 2-4 — Loading'),
          goal: T('أعلى حجم في الموسم: ماتشات مصغرة، تكرار سبرنت، قوة قصوى، وأول ودية', 'Highest volume of the season: SSGs, repeated sprints, max strength, first friendly'),
          components: ['vo2max', 'speed_endurance', 'max_strength', 'acceleration', 'tactics'],
          loads: [6, 7, 8], weekTypes: ['load', 'load', 'shock'],
          pattern: ['pre_ssg', 'pre_gym_str', 'pre_speed', 'md_p1', 'pre_rsa', 'friendly', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: T('تحويل القوة لقدرة، والدخول في الدورة الأسبوعية للماتش مع وديات بدقايق متزايدة (٦٠ ← ٩٠ دقيقة)', 'Convert strength to power and adopt the match-week microcycle, with friendlies of rising minutes (60 to 90)'),
      components: ['power', 'max_velocity', 'speed_endurance', 'tactics'],
      blocks: [
        {
          name: T('أسابيع إعداد ٥-٦ — قدرة ووديات', 'Pre-season weeks 5-6 — Power & friendlies'),
          goal: T('حدة بدنية وتكتيكية، والأسبوع الأخير تهدئة قبل أول ماتش رسمي', 'Physical and tactical sharpness, final week tapers into the first official match'),
          components: ['power', 'max_velocity', 'speed_endurance', 'tactics'],
          loads: [7, 5], weekTypes: ['load', 'taper'],
          pattern: ['md_p1', 'pre_gym_power', 'pre_ssg', 'pre_rsa', 'md_m2', 'md_m1', 'friendly']
        }
      ]
    },
    {
      type: 'comp',
      goal: T('الحفاظ على السرعة والقوة واللياقة طول الموسم بدورة أسبوعية: MD+1 استشفاء، MD-4 قوة وشغل مكثف، MD-3 شغل ممتد وسرعة قصوى، MD-2 تكتيك، MD-1 تنشيط', 'Maintain speed, strength and fitness all season with a weekly microcycle: MD+1 recovery, MD-4 strength/intensive, MD-3 extensive/max velocity, MD-2 tactical, MD-1 activation'),
      components: ['max_velocity', 'strength', 'vo2max', 'tactics', 'recovery', 'prevention'],
      blocks: [
        {
          name: T('دور أول — دورة ماتش كل أسبوع', 'First round — one match per week'),
          goal: T('تثبيت الدورة الأسبوعية وتعويض اللاعيبة اللي ملعبتش (أقل من ٦٠ دقيقة)', 'Establish the weekly microcycle and top up players with under 60 minutes'),
          components: ['max_velocity', 'strength', 'tactics', 'recovery'],
          loads: [6, 6, 7, 5], weekTypes: ['comp', 'comp', 'comp', 'comp'],
          pattern: ['md_p1', '', 'md_m4', 'md_m3', 'md_m2', 'md_m1', 'match']
        },
        {
          name: T('ضغط ماتشات — ماتشين في الأسبوع', 'Congested fixtures — two matches per week'),
          goal: T('استشفاء وتنشيط بس بين الماتشات، مفيش حمل إضافي للأساسيين، مداورة في التشكيل', 'Recovery and activation only between matches, no extra load for starters, squad rotation'),
          components: ['recovery', 'tactics', 'speed'],
          loads: [7, 6], weekTypes: ['comp', 'comp'],
          pattern: ['md_p1', 'md_m1', 'match', 'md_p1', 'md_m2', 'md_m1', 'match']
        },
        {
          name: T('نص الموسم — أسبوع إعادة اختبار', 'Mid-season — re-test week'),
          goal: T('قياس CMJ والسرعة و٣٠-١٥ لمتابعة الحالة وتحديث السرعات المستهدفة', 'CMJ, sprint and 30-15 IFT to monitor status and update running targets'),
          components: ['power', 'acceleration', 'vo2max'],
          loads: [5], weekTypes: ['test'],
          pattern: ['md_p1', '', 'test_in', 'md_m3', 'md_m2', 'md_m1', 'match']
        },
        {
          name: T('دور تاني — الحفاظ على الحدة', 'Second round — keep the edge'),
          goal: T('صيانة القوة (٨٥٪ لعدات قليلة) والتعرض للسرعة القصوى كل أسبوع، والحمل يتظبط حسب دقايق اللعب', 'Maintain strength (85% low reps) and weekly max-velocity exposure, with load adjusted to minutes played'),
          components: ['max_velocity', 'strength', 'tactics', 'recovery', 'prevention'],
          loads: [6, 7, 6, 6, 5], weekTypes: ['comp', 'comp', 'comp', 'comp', 'comp'],
          pattern: ['md_p1', '', 'md_m4', 'md_m3', 'md_m2', 'md_m1', 'match']
        }
      ]
    },
    {
      type: 'transition',
      goal: T('راحة إيجابية جسدية وذهنية مع الحفاظ على حد أدنى من اللياقة وتمرين النورديك', 'Physical and mental rest while keeping a minimum of fitness and Nordic work'),
      components: ['recovery', 'aerobic', 'prevention'],
      blocks: [
        {
          name: T('انتقالية — راحة إيجابية', 'Transition — active rest'),
          goal: T('رياضات تانية وجري خفيف ومرونة، من غير ضغط', 'Other sports, easy running and mobility, no pressure'),
          components: ['recovery', 'aerobic', 'mobility'],
          loads: [2, 2, 3], weekTypes: ['deload', 'deload', 'deload'],
          pattern: ['trans_active', '', '', 'trans_active', '', '', '']
        }
      ]
    }
  ],
  sessions: {
    off_aero: ses(T('جري هوائي متصل + انطلاقات (فردي)', 'Continuous aerobic run + strides (individual)'),
      T('بناء القاعدة الهوائية لتسريع الاستشفاء بين المجهودات', 'Build the aerobic base to speed recovery between efforts'),
      ['aerobic', 'prevention', 'core'], 5, 60, [
        ...wuPitch().slice(0, 3),
        rn(T('جري هوائي متصل', 'Continuous aerobic run'), { duration: '35min', intensity: 'Z2 (70-75% HRmax)', basis: 'hr' },
          T('رفع القدرة الهوائية وكفاءة القلب', 'Raise aerobic capacity and cardiac efficiency'), 'aerobic', { note: T('تزيد ٥ دقايق كل أسبوع لحد ٤٥ دقيقة', 'Add 5min per week up to 45min') }),
        rn(T('انطلاقات مريحة', 'Relaxed strides'), { sets: 1, reps: '6', distance: '80m', intensity: '80', basis: 'vmax', rest: '60s', restType: 'walk' },
          T('الحفاظ على ميكانيكية الجري السريع', 'Keep fast-running mechanics'), 'speed'),
        PH.nordic(2, '5'),
        st('ex_side_plank', 3, '30s/side', '6', 'rpe', '30s', T('ثبات جانبي للجذع والحوض', 'Lateral trunk and pelvic stability'), 'core'),
        ...cdPitch()
      ]),
    off_hiit: ses(T('فترات هوائية عالية الشدة ٤ × ٤ + تسارع (فردي)', 'High-intensity aerobic intervals 4 x 4 + acceleration (individual)'),
      T('رفع الحد الأقصى لاستهلاك الأكسجين قبل الإعداد', 'Raise VO2max before pre-season'),
      ['vo2max', 'acceleration', 'prevention'], 7, 60, [
        ...wuPitch(),
        rn('ex_interval_running', { sets: 4, duration: '4min', intensity: 'Z4-Z5 (90-95% HRmax)', basis: 'hr', rest: '3min', restType: 'jog' },
          T('فترات ٤ × ٤ (هيلجيرود) لرفع VO2max', '4 x 4min (Helgerud) intervals to raise VO2max'), 'vo2max', { note: T('راحة ٣ دقايق جري خفيف عند ٦٠-٧٠٪ من أقصى نبض', '3min jog recovery at 60-70% HRmax') }),
        rn('dr_sprint_accel', { sets: 1, reps: '6', distance: '20m', intensity: '95', basis: 'vmax', rest: '90s', restType: 'walk' },
          T('الحفاظ على التسارع وتجهيز الخلفية للسبرنت', 'Keep acceleration and prepare hamstrings for sprinting'), 'acceleration'),
        PH.cph(2, '15s/side'),
        ...cdPitch()
      ]),
    off_gym: ses(T('جيم عام — قوة وتضخيم وظيفي', 'General gym — strength & functional hypertrophy'),
      T('بناء القوة العامة وحجم العضل اللي يحمي من الإصابات', 'Build general strength and protective muscle mass'),
      ['strength', 'hypertrophy', 'prevention', 'core'], 7, 70, [
        ...wuGym().slice(0, 3),
        st('ex_barbell_back_squat', 4, '6', '75', '1rm', '2min 30s', T('قوة عامة للرجلين وأساس للقدرة', 'General leg strength and foundation for power'), 'strength', { tempo: '3-1-1-0' }),
        st('ex_romanian_deadlift', 3, '8', '2', 'rir', '2min', T('قوة الخلفية والمؤخرة في وضع الإطالة', 'Hamstring and glute strength at length'), 'strength', { tempo: '3-0-1-0' }),
        st('ex_bulgarian_split_squat', 3, '8/leg', '2', 'rir', '90s', T('قوة رجل واحدة وثبات الحوض', 'Single-leg strength and pelvic control'), 'strength', { tempo: '2-0-1-0' }),
        st('ex_barbell_bench_press', 3, '8', '70', '1rm', '2min', T('قوة الجزء العلوي للالتحامات', 'Upper-body strength for duels'), 'strength', { tempo: '2-0-1-0' }),
        st('ex_pullup', 3, '6-8', '2', 'rir', '2min', T('توازن الدفع والسحب وقوة الضهر', 'Push/pull balance and back strength'), 'strength'),
        PH.nordic(3, '5'),
        PH.cph(3, '20s/side'),
        PH.soleus(3),
        PH.pallof(),
        ...cdGym()
      ]),
    test: ses(T('يوم اختبارات الإعداد', 'Pre-season testing day'),
      T('تحديد مستوى كل لاعب وتقنين الأحمال والسرعات المستهدفة', 'Profile every player and set loads and running targets'),
      ['power', 'acceleration', 'agility', 'vo2max'], 8, 100, [
        ...wuPitch(),
        TST.cmj(),
        TST.sprint('30m'),
        TST.cod(),
        TST.yoyo(),
        dr(T('قياس الوزن ونسبة الدهون وسؤال عن الإصابات السابقة', 'Body mass, skinfolds and injury-history screening'), { sets: 1, reps: '1' },
          T('متابعة التكوين الجسماني وتحديد اللاعيبة الأكثر عرضة للإصابة', 'Track body composition and flag higher-risk players'), 'prevention'),
        ...cdPitch()
      ]),
    pre_ssg: ses(T('تكتيك + ماتشات مصغرة (إعداد)', 'Tactical + small-sided games (pre-season)'),
      T('لياقة خاصة بالكرة: VO2max وقرار تحت الضغط', 'Ball-specific conditioning: VO2max and decisions under pressure'),
      ['vo2max', 'tactics', 'technique', 'agility'], 7, 95, [
        ...wuPitch().slice(0, 3), wuRondo(),
        dr(T('نمط تمرير ولعب بين الخطوط (٣ خطوط)', 'Passing pattern and play between the lines (3 lines)'), { sets: 3, duration: '6min', rest: '90s' },
          T('سرعة التمرير واستلام الكرة على القدم البعيدة', 'Passing speed and receiving on the back foot'), 'technique'),
        tm(T('ماتش مصغر ٤ ضد ٤ + حراس — ملعب ٤٠×٣٠م', 'SSG 4v4 + GKs — 40x30m pitch'), 4, undefined, '4min', '8', 'rpe', '2min',
          T('شدة عالية بنبض ٨٥-٩٠٪ مع كرة لرفع VO2max', 'High intensity at 85-90% HRmax with the ball to raise VO2max'), 'vo2max',
          { restType: 'active', note: T('كور جاهزة حوالين الملعب، تشجيع مستمر من المدربين', 'Balls ready around the pitch, constant coach encouragement') }),
        tm(T('ماتش ٨ ضد ٨ — نص ملعب (٦٥×٥٠م) بمبادئ الضغط', '8v8 — half pitch (65x50m) with pressing principles'), 2, undefined, '10min', '7', 'rpe', '3min',
          T('تطبيق مبادئ الضغط والتحول بمسافات جري أكبر', 'Apply pressing and transition principles over larger distances'), 'tactics', { restType: 'active' }),
        dr(T('إنهاء من عرضيات وتمريرات بينية', 'Finishing from crosses and through-balls'), { sets: 2, duration: '8min', rest: '2min' },
          T('دقة التسديد تحت تعب', 'Finishing accuracy under fatigue'), 'technique'),
        ...cdPitch()
      ]),
    pre_speed: ses(T('سرعة: تسارع وسرعة قصوى وتغيير اتجاه', 'Speed: acceleration, max velocity and change of direction'),
      T('رفع التسارع والسرعة القصوى وحماية الخلفية بالتعرض للسرعة العالية', 'Develop acceleration and top speed, protecting hamstrings through high-speed exposure'),
      ['acceleration', 'max_velocity', 'agility', 'prevention'], 7, 80, [
        ...wuPitch(),
        rn('dr_sprint_accel', { sets: 2, reps: '4', distance: '20m', intensity: '95-100', basis: 'vmax', rest: '90s', restType: 'walk', setRest: '4min' },
          T('تسارع من أوضاع مختلفة (واقف، ٣ نقاط، ماشي)', 'Acceleration from varied starts (standing, 3-point, rolling)'), 'acceleration'),
        rn('ad_sled_resisted_sprint', { sets: 1, reps: '5', distance: '20m', intensity: '10', basis: 'rpe', rest: '2min', restType: 'walk' },
          T('قوة الدفع الأفقي في أول خطوات', 'Horizontal force in the first steps'), 'acceleration',
          { note: T('حمل يقلل السرعة حوالي ١٠٪ (١٠-٢٠٪ من وزن الجسم)', 'Load that slows velocity about 10% (10-20% of body mass)') }),
        rn('ad_flying_sprint', { sets: 1, reps: '4', distance: '20m build + 20m fly', intensity: '95-100', basis: 'vmax', rest: '3min', restType: 'walk' },
          T('التعرض للسرعة القصوى (أهم وقاية للخلفية)', 'Max-velocity exposure (key hamstring protection)'), 'max_velocity',
          { note: T('راقب السرعة بـ GPS، الهدف ٩٥٪ أو أكتر من أقصى سرعة', 'Monitor with GPS, target 95%+ of max speed') }),
        rn('dr_cone_5_10_5', { sets: 1, reps: '6', distance: '20m', intensity: '95', basis: 'best', rest: '90s', restType: 'walk' },
          T('فرملة وتغيير اتجاه وانطلاق', 'Braking, cutting and re-acceleration'), 'agility'),
        dr(T('١ ضد ١ هجوم ودفاع في قناة ١٥×١٠م', '1v1 attack vs defence in a 15x10m channel'), { sets: 3, reps: '6', rest: '45s' },
          T('رشاقة برد فعل على المنافس بالكرة', 'Reactive agility against an opponent with the ball'), 'agility'),
        PH.nordic(3, '4'),
        ...cdPitch()
      ]),
    pre_gym_str: ses(T('جيم — قوة قصوى', 'Gym — maximal strength'),
      T('رفع القوة القصوى كأساس للسرعة والقدرة', 'Raise maximal strength as the foundation for speed and power'),
      ['max_strength', 'strength', 'prevention', 'core'], 8, 75, [
        ...wuGym(),
        st('ex_barbell_back_squat', 4, '4', '85', '1rm', '3min', T('قوة قصوى للرجلين', 'Maximal leg strength'), 'max_strength', { tempo: '2-0-X-0' }),
        st('ex_hip_thrust', 3, '6', '2', 'rir', '2min', T('قوة المؤخرة لمد الحوض في السبرنت', 'Glute strength for hip extension when sprinting'), 'max_strength', { tempo: '1-1-X-0' }),
        st('ex_single_leg_rdl', 3, '6/leg', '2', 'rir', '90s', T('قوة الخلفية على رجل واحدة وثبات', 'Single-leg hamstring strength and control'), 'strength', { tempo: '3-0-1-0' }),
        st('ex_barbell_bench_press', 3, '5', '80', '1rm', '2min 30s', T('قوة الجزء العلوي للالتحامات', 'Upper-body strength for duels'), 'max_strength'),
        st('wg_weighted_pull_up', 3, '5', '8', 'rpe', '2min', T('قوة السحب والضهر', 'Pulling and back strength'), 'max_strength'),
        PH.nordic(3, '5'),
        PH.cph(3, '25s/side'),
        PH.soleus(3),
        ...cdGym()
      ]),
    pre_gym_power: ses(T('جيم — قدرة وبلايومتريك', 'Gym — power & plyometrics'),
      T('تحويل القوة لقدرة انفجارية للانطلاق والنط', 'Convert strength into explosive power for sprinting and jumping'),
      ['power', 'max_strength', 'prevention'], 7, 70, [
        ...wuGym(),
        st('ad_hang_power_clean', 4, '3', '70-75', '1rm', '2min 30s', T('إنتاج قوة سريع من الحوض (معدل تطور القوة)', 'Rapid hip force production (rate of force development)'), 'power'),
        st('ad_back_squat_to_jump_squat_contrast', 4, '3 + 5', '80', '1rm', '3min', T('تباين ثقيل/سريع لتنشيط القدرة (PAPE)', 'Heavy/fast contrast to potentiate power (PAPE)'), 'power',
          { note: T('٣ سكوات عند ٨٠٪ ثم ٥ نطات سكوات بوزن الجسم بعد ٢٠-٣٠ ث', '3 squats at 80% then 5 bodyweight jump squats after 20-30s') }),
        st('ad_depth_jump', 3, '5', '9', 'rpe', '2min', T('قوة ارتدادية سريعة (نط من بوكس ٣٠-٤٠سم)', 'Fast reactive strength (drop from a 30-40cm box)'), 'power', { note: T('١٥ لمسة، أقل وقت على الأرض', '15 contacts, minimal ground contact time') }),
        st('ad_lateral_bound_and_stick', 3, '4/side', '8', 'rpe', '90s', T('قدرة جانبية وثبات في الهبوط لتغيير الاتجاه', 'Lateral power and landing control for cutting'), 'power', { note: T('٢٤ لمسة', '24 contacts') }),
        st('ad_medicine_ball_rotational_throw', 3, '5/side', '8', 'rpe', '60s', T('قدرة دورانية للتسديد والالتحام', 'Rotational power for shooting and duels'), 'power'),
        PH.nordic(2, '4'),
        PH.cph(2, '20s/side'),
        ...cdGym()
      ]),
    pre_rsa: ses(T('تكرار سبرنت + فترات عالية الشدة', 'Repeated sprints + high-intensity intervals'),
      T('رفع القدرة على تكرار السبرنت والاستشفاء السريع بينهم', 'Improve repeated-sprint ability and fast recovery between sprints'),
      ['speed_endurance', 'vo2max', 'anaerobic', 'tactics'], 8, 85, [
        ...wuPitch(), wuRondo(),
        rn(T('تكرار سبرنت ٦ × ٣٠م — انطلاقة كل ٢٠ ث', 'Repeated sprints 6 x 30m — depart every 20s'), { sets: 3, reps: '6', distance: '30m', intensity: '100', basis: 'vmax', rest: '20s', restType: 'walk', setRest: '4min' },
          T('تحمل السرعة وقدرة تكرار المجهود الأقصى زي مواقف الماتش', 'Speed endurance and repeated maximal efforts like match passages'), 'speed_endurance',
          { note: T('أقصى مجهود كل تكرار، الهدف انخفاض أقل من ٦٪ بين أحسن وأوحش زمن', 'Maximal effort every rep, target under 6% decrement best vs worst') }),
        rn(T('فترات ١٥ ث / ١٥ ث عند ٩٥٪ من VIFT', '15s/15s intervals at 95% VIFT'), { sets: 2, reps: '10', duration: '15s', intensity: '9', basis: 'rpe', rest: '15s', restType: 'passive', setRest: '3min' },
          T('وقت أطول عند نبض قريب من الأقصى لرفع VO2max', 'More time near max heart rate to raise VO2max'), 'vo2max',
          { note: T('المسافة لكل ١٥ ث = ٩٥٪ × VIFT من اختبار ٣٠-١٥ (حوالي ٧٠-٨٠م)', 'Distance per 15s = 95% x VIFT from the 30-15 IFT (about 70-80m)') }),
        tm(T('ماتش ٧ ضد ٧ + ٢ جوكر — ملعب ٥٠×٤٠م، استحواذ لتحولات', '7v7 + 2 floaters — 50x40m, possession to transitions'), 3, undefined, '6min', '7', 'rpe', '2min',
          T('تحولات هجومية ودفاعية سريعة بعد فقد الكرة', 'Fast attacking and defensive transitions after losing the ball'), 'tactics', { restType: 'active' }),
        PH.squeeze(),
        ...cdPitch()
      ]),
    friendly: ses(T('ماتش ودي', 'Friendly match'),
      T('زيادة دقايق اللعب تدريجيًا وتجربة التشكيل', 'Build match minutes progressively and test line-ups'),
      ['tactics', 'speed_endurance', 'mental'], 8, 110, [
        ...wuPitch(), wuRondo(),
        matchItem(T('ماتش ودي', 'Friendly match'), '2 x 45min',
          T('تطبيق خطة اللعب وتراكم دقايق لعب بشدة الماتش', 'Apply the game model and accumulate match-intensity minutes'),
          T('الأساسيين: ٤٥ ← ٦٠ ← ٧٥ ← ٩٠ دقيقة على مدار الوديات', 'Starters: 45 then 60, 75, 90 minutes across the friendlies')),
        rn(T('تعويض للبدلاء بعد الماتش', 'Post-match top-up for substitutes'), { sets: 1, reps: '6', distance: '60m', intensity: '85-90', basis: 'vmax', rest: '45s', restType: 'walk' },
          T('تعويض حمل الجري السريع للي لعب أقل من ٤٥ دقيقة', 'Top up high-speed running for players with under 45 minutes'), 'speed_endurance'),
        ...cdPitch()
      ]),
    md_p1: ses(T('MD+1 — استشفاء للأساسيين وتعويض للبدلاء', 'MD+1 — recovery for starters, compensation for substitutes'),
      T('إرجاع الأساسيين لحالتهم وتعويض حمل الماتش للي ملعبش', 'Restore starters and give non-starters the match load they missed'),
      ['recovery', 'mobility', 'speed_endurance'], 3, 60, [
        wu('ex_stationary_bike', { duration: '5min' }),
        mob(T('أساسيين: عجلة أو سباحة خفيفة', 'Starters: easy bike or pool session'), { duration: '20min', note: T('نبض أقل من ٦٥٪ من الأقصى', 'Heart rate under 65% HRmax') }),
        mob('ad_foam_roller_thoracic_extension', { sets: 1, duration: '2min' }),
        mob('ad_90_90_hip_switches', { sets: 2, reps: '6/side' }),
        mob('ex_hamstring_stretch', { sets: 1, duration: '45s', note: SIDE }),
        tm(T('بدلاء (أقل من ٦٠ د): ماتش ٥ ضد ٥ — ٣٥×٢٥م', 'Non-starters (<60 min): SSG 5v5 — 35x25m'), 4, undefined, '4min', '8', 'rpe', '2min',
          T('تعويض الحمل الأيضي للماتش', 'Replace the metabolic load of the match'), 'vo2max', { restType: 'active' }),
        rn(T('بدلاء: جري سريع وسبرنت', 'Non-starters: high-speed running and sprints'), { sets: 2, reps: '4', distance: '60m', intensity: '90', basis: 'vmax', rest: '45s', restType: 'walk', setRest: '3min' },
          T('تعويض الجري السريع والسرعة القصوى', 'Replace high-speed running and max-velocity exposure'), 'speed_endurance'),
        PH.nordic(2, '4')
      ]),
    md_m4: ses(T('MD-4 — قوة + شغل مكثف (ماتشات صغيرة)', 'MD-4 — strength + intensive (small-sided games)'),
      T('أعلى حمل عصبي عضلي في الأسبوع: قوة، تسارع وفرملة في مساحات صغيرة', 'Highest neuromuscular load of the week: strength, accelerations and decelerations in small spaces'),
      ['strength', 'power', 'agility', 'anaerobic', 'prevention'], 7, 100, [
        ...wuGym().slice(0, 2),
        st('ad_hang_power_clean', 3, '3', '75', '1rm', '2min', T('صيانة القدرة', 'Maintain power'), 'power'),
        st('ex_barbell_back_squat', 3, '3', '85', '1rm', '3min', T('صيانة القوة القصوى بأقل تعب', 'Maintain max strength with minimal fatigue'), 'max_strength', { tempo: '2-0-X-0' }),
        PH.nordic(2, '4'),
        PH.cph(2, '20s/side'),
        ...wuPitch().slice(2),
        tm(T('ماتش مصغر ٤ ضد ٤ — ملعب ٣٠×٢٠م بدون حراس (كونز)', 'SSG 4v4 — 30x20m, cone goals, no GKs'), 6, undefined, '2min', '9', 'rpe', '2min',
          T('أعلى عدد تسارع وفرملة وتغيير اتجاه', 'Maximise accelerations, decelerations and changes of direction'), 'anaerobic', { restType: 'passive' }),
        dr(T('١ ضد ١ و ٢ ضد ١ ثم تسديد', '1v1 and 2v1 to finish'), { sets: 2, reps: '8', rest: '60s' },
          T('مواجهات فردية وإنهاء', 'Individual duels and finishing'), 'technique'),
        ...cdPitch().slice(0, 2)
      ]),
    md_m3: ses(T('MD-3 — شغل ممتد + سرعة قصوى', 'MD-3 — extensive + max velocity'),
      T('مساحات كبيرة وجري سريع وتعرض للسرعة القصوى زي الماتش', 'Large spaces, high-speed running and max-velocity exposure like the match'),
      ['max_velocity', 'aerobic', 'tactics'], 7, 90, [
        ...wuPitch(),
        rn('ad_flying_sprint', { sets: 1, reps: '4', distance: '30m build + 20m fly', intensity: '95-100', basis: 'vmax', rest: '3min', restType: 'walk' },
          T('التعرض للسرعة القصوى مرة في الأسبوع على الأقل', 'At least one max-velocity exposure per week'), 'max_velocity'),
        tm(T('لعب مراكز ٧ ضد ٧ + ٣ — ملعب ٥٠×٤٠م', 'Positional play 7v7 + 3 — 50x40m'), 3, undefined, '6min', '6', 'rpe', '90s',
          T('بناء اللعب من الخلف وخلق الزيادة العددية', 'Build-up play and creating overloads'), 'tactics'),
        tm(T('ماتش ١٠ ضد ١٠ — ثلاث أرباع الملعب (٧٥×٦٥م)', '10v10 — three-quarter pitch (75x65m)'), 3, undefined, '10min', '7', 'rpe', '3min',
          T('حجم جري سريع ومسافات زي الماتش في إطار تكتيكي', 'Match-like distances and high-speed running in a tactical frame'), 'aerobic', { restType: 'active' }),
        rn(T('جري ممتد عالي السرعة', 'Extensive high-speed runs'), { sets: 1, reps: '6', distance: '60m', intensity: '85', basis: 'vmax', rest: '40s', restType: 'walk' },
          T('تكملة حجم الجري السريع لو الماتشات مغطتهوش', 'Complete high-speed running volume if the games fell short'), 'speed_endurance', { note: T('حسب قراءة الـ GPS', 'According to the GPS readout') }),
        ...cdPitch()
      ]),
    md_m2: ses(T('MD-2 — تكتيك وحمل منخفض', 'MD-2 — tactical, low load'),
      T('تجهيز خطة الماتش بحمل خفيف والحفاظ على الحدة', 'Prepare the match plan with low load while staying sharp'),
      ['tactics', 'reaction', 'technique'], 4, 70, [
        ...wuPitch().slice(0, 3), wuRondo(),
        dr(T('تنظيم ١١ ضد ١١ ضد تشكيل المنافس (ربع شدة)', '11v11 shape vs opponent structure (walk-through to half pace)'), { sets: 2, duration: '12min', rest: '2min' },
          T('تحركات الفريق والضغط حسب خطة الماتش', 'Team movements and pressing triggers for the match plan'), 'tactics'),
        dr(T('كور ثابتة دفاعية (ركنيات وأخطاء)', 'Defensive set pieces (corners and free kicks)'), { sets: 1, duration: '12min' },
          T('تنظيم الرقابة والمناطق في الكور الثابتة', 'Marking and zonal organisation at set pieces'), 'tactics'),
        rn('ad_reaction_start_sprint', { sets: 1, reps: '6', distance: '10m', intensity: '100', basis: 'vmax', rest: '60s', restType: 'walk' },
          T('حدة عصبية بحجم قليل', 'Neural sharpness at low volume'), 'reaction'),
        ...cdPitch().slice(0, 2)
      ]),
    md_m1: ses(T('MD-1 — تنشيط وكور ثابتة', 'MD-1 — activation & set pieces'),
      T('تنشيط سريع وثقة قبل الماتش بأقل تعب', 'Quick activation and confidence before the match with minimal fatigue'),
      ['speed', 'tactics', 'mental'], 3, 50, [
        ...wuPitch().slice(0, 3), wuRondo(),
        rn('ad_ball_drop_sprint', { sets: 1, reps: '5', distance: '5-10m', intensity: '100', basis: 'vmax', rest: '60s', restType: 'walk' },
          T('رد فعل وانطلاق سريع من غير حمل', 'Reaction and quick starts without fatigue'), 'reaction'),
        dr(T('كور ثابتة هجومية وضربات جزاء', 'Attacking set pieces and penalties'), { sets: 1, duration: '15min' },
          T('تثبيت حركات الكور الثابتة', 'Rehearse set-piece routines'), 'tactics'),
        dr(T('إنهاء خفيف (تسديد بلمسة ولمستين)', 'Light finishing (one and two-touch shots)'), { sets: 1, duration: '8min' },
          T('ثقة المهاجمين قبل الماتش', 'Striker confidence before the match'), 'technique'),
        breathe('3min')
      ]),
    match: ses(T('يوم الماتش (MD)', 'Match day (MD)'),
      T('أعلى أداء في الماتش الرسمي', 'Peak performance in the official match'),
      ['tactics', 'speed_endurance', 'mental'], 9, 130, [
        wu(T('إحماء ما قبل الماتش (RAMP): جري ومرونة ديناميكية', 'Pre-match RAMP warm-up: jogging and dynamic mobility'), { duration: '8min' }),
        wuRondo(),
        wu(T('انطلاقات وتغيير اتجاه متدرج ثم ٣ سبرنت ٢٠م', 'Progressive runs and cuts, then 3 x 20m sprints'), { duration: '6min' }),
        matchItem(T('ماتش رسمي', 'Official match'), '90min',
          T('تطبيق خطة اللعب بأعلى شدة', 'Execute the game plan at full intensity'),
          T('البدلاء يعملوا إعادة إحماء ٥ دقايق كل ١٥ دقيقة في الشوط التاني', 'Substitutes re-warm for 5min every 15min in the second half')),
        mob(T('تهدئة بعد الماتش + مشروب استشفاء (كربوهيدرات وبروتين خلال ٣٠ دقيقة)', 'Post-match cool-down + recovery drink (carbohydrate and protein within 30min)'), { duration: '10min' })
      ]),
    test_in: ses(T('MD-4 — إعادة اختبار نص الموسم', 'MD-4 — mid-season re-test'),
      T('متابعة الحالة وتحديث VIFT والسرعات المستهدفة', 'Monitor status and update VIFT and running targets'),
      ['power', 'acceleration', 'vo2max', 'prevention'], 7, 90, [
        ...wuPitch(),
        TST.cmj(),
        TST.sprint('30m'),
        TST.ift(),
        PH.nordic(2, '4'),
        PH.cph(2, '20s/side'),
        ...cdPitch()
      ]),
    trans_active: ses(T('راحة إيجابية — نشاط حر ولياقة أساسية', 'Active rest — free activity and basic fitness'),
      T('استشفاء جسدي وذهني مع حد أدنى من اللياقة', 'Physical and mental recovery with a fitness floor'),
      ['recovery', 'aerobic', 'prevention', 'mobility'], 3, 50, [
        wu(T('مشي سريع أو جري خفيف', 'Brisk walk or easy jog'), { duration: '5min' }),
        rn(T('جري أو عجلة أو سباحة مريحة (اختيار اللاعب)', 'Easy run, bike or swim (player choice)'), { duration: '30min', intensity: 'Z2', basis: 'hr' },
          T('الحفاظ على القاعدة الهوائية', 'Keep the aerobic base'), 'aerobic', { note: T('ممكن تستبدلها برياضة تانية: بادل، تنس، سباحة', 'Can be replaced by another sport: padel, tennis, swimming') }),
        st('ex_bodyweight_squat', 2, '15', '5', 'rpe', '60s', T('قوة عامة خفيفة', 'Light general strength'), 'muscular_endurance'),
        st('ex_pushup', 2, '12', '5', 'rpe', '60s', T('قوة عامة للجزء العلوي', 'General upper-body strength'), 'muscular_endurance'),
        PH.nordic(2, '5'),
        mob('ad_pigeon_stretch', { sets: 1, duration: '60s', note: SIDE }),
        breathe()
      ])
  }
};

/* ================================================================== */
/* 2) Football — intermediate youth (U15-U17)                          */
/* ================================================================== */
const wuFifa = () => [
  wu(T('فيفا ١١+ الجزء ١: جري مستقيم، فتح وقفل الحوض، دوران حول الزميل، التحام كتف بكتف، جري لقدام ولورا', 'FIFA 11+ part 1: straight running, hip out/in, circling partner, shoulder contact, quick forwards and backwards'), { duration: '8min' }),
  wu(T('فيفا ١١+ الجزء ٣: جري عبر الملعب ٧٥٪، بوندينج، ارتكاز وقطع', 'FIFA 11+ part 3: across the pitch at 75%, bounding, plant and cut'), { duration: '4min' })
];
const fifaPart2 = () => [
  st('ex_plank', 3, '30s', '6', 'rpe', '30s', T('فيفا ١١+ الجزء ٢: ثبات الجذع (المستوى ٢: رفع رجل بالتبادل)', 'FIFA 11+ part 2: trunk stability (level 2: alternate leg lifts)'), 'core'),
  st('ex_side_plank', 2, '20s/side', '6', 'rpe', '30s', T('ثبات جانبي للحوض والجذع', 'Lateral pelvic and trunk stability'), 'core'),
  PH.nordic(3, '3-5'),
  st('ad_single_leg_balance_progression', 2, '30s/leg', '6', 'rpe', '30s', T('توازن على رجل واحدة مع تمرير الكرة لزميل', 'Single-leg balance while passing a ball with a partner'), 'balance'),
  st('ad_single_leg_lateral_hop_and_stick', 2, '5/leg', '6', 'rpe', '45s', T('هبوط سليم (الركبة فوق القدم) لحماية الرباط الصليبي', 'Safe landing (knee over toes) to protect the ACL'), 'prevention',
    { note: T('ركز على الركبة ما تدخلش لجوه', 'Knee must not collapse inwards') })
];

const footballYouth = {
  id: 'pt_football_youth_int',
  sport: 'football',
  level: 'intermediate',
  title: T('موسم كرة قدم ناشئين (تحت ١٥ لـ تحت ١٧) — متوسط', 'Youth football season (U15-U17) — intermediate'),
  goal: T('تطوير المهارة والسرعة والتوافق مع بناء قوة أساسية آمنة وبرنامج وقاية فيفا ١١+، مع مراعاة مرحلة النمو (طفرة الطول) والحفاظ على متعة اللعب.',
    'Develop technique, speed and coordination while building safe foundational strength and the FIFA 11+ prevention programme, respecting growth stage (peak height velocity) and keeping the game enjoyable.'),
  components: ['technique', 'speed', 'acceleration', 'agility', 'coordination', 'strength', 'prevention', 'tactics'],
  sessionsPerWeek: 5,
  periods: [
    {
      type: 'gpp',
      goal: T('إعداد عام: اختبارات، توافق ومهارة، قوة بوزن الجسم، ولياقة من خلال اللعب', 'General preparation: testing, coordination and technique, bodyweight strength, fitness through games'),
      components: ['technique', 'coordination', 'strength', 'aerobic', 'prevention'],
      blocks: [
        {
          name: T('أسبوع ١ — اختبارات وقياس النمو', 'Week 1 — Testing & growth screening'),
          goal: T('قياس الطول (واقف وقاعد) والوزن لحساب مرحلة النمو، واختبارات بدنية أساسية', 'Measure standing/sitting height and mass for maturity status, plus baseline fitness tests'),
          components: ['power', 'acceleration', 'vo2max', 'technique'],
          loads: [4], weekTypes: ['test'],
          pattern: ['y_test', '', 'y_tech_speed', '', 'y_ssg', '', '']
        },
        {
          name: T('بلوك ١ — أساسيات الحركة والقوة', 'Block 1 — Movement & strength foundations'),
          goal: T('تعليم تكنيك السكوات والهبوط والنورديك، ورفع اللياقة بالماتشات المصغرة', 'Teach squat, landing and Nordic technique, and build fitness via small-sided games'),
          components: ['strength', 'coordination', 'technique', 'aerobic', 'prevention'],
          loads: [5, 6, 4], weekTypes: ['load', 'load', 'deload'],
          pattern: ['', 'y_strength', 'y_ssg', '', 'y_tech_speed', 'y_strength', 'y_ssg']
        }
      ]
    },
    {
      type: 'precomp',
      goal: T('سرعة ورشاقة بالكرة، ومبادئ اللعب، ووديات', 'Speed and agility with the ball, principles of play and friendlies'),
      components: ['speed', 'agility', 'tactics', 'technique'],
      blocks: [
        {
          name: T('بلوك ٢ — سرعة ووديات', 'Block 2 — Speed & friendlies'),
          goal: T('نقل القوة للسرعة وتطبيق مبادئ اللعب في ماتشات ودية', 'Transfer strength to speed and apply principles of play in friendlies'),
          components: ['speed', 'agility', 'tactics', 'technique'],
          loads: [6, 5], weekTypes: ['load', 'taper'],
          pattern: ['', 'y_strength', 'y_ssg', '', 'y_tech_speed', 'y_tactical', 'y_match']
        }
      ]
    },
    {
      type: 'comp',
      goal: T('دوري الناشئين: ماتش كل أسبوع، تطوير مستمر للمهارة والسرعة، وقوة مرتين في الأسبوع بجرعة صغيرة', 'Youth league: one match per week, continued technical and speed development, small-dose strength twice a week'),
      components: ['technique', 'speed', 'tactics', 'strength', 'prevention'],
      blocks: [
        {
          name: T('دوري — المرحلة الأولى', 'League — phase 1'),
          goal: T('دورة أسبوعية ثابتة: قوة ← ماتشات مصغرة ← سرعة ← تكتيك ← ماتش', 'Stable weekly cycle: strength, SSG, speed, tactics, match'),
          components: ['technique', 'speed', 'tactics', 'strength'],
          loads: [5, 6, 6, 4], weekTypes: ['comp', 'comp', 'comp', 'deload'],
          pattern: ['', 'y_strength', 'y_ssg', '', 'y_tech_speed', 'y_tactical', 'y_match']
        },
        {
          name: T('أسبوع إعادة اختبار', 'Re-test week'),
          goal: T('متابعة التطور ومعدل النمو وضبط الأحمال للي في طفرة الطول', 'Track progress and growth rate, adjust loads for players in their growth spurt'),
          components: ['power', 'acceleration', 'vo2max'],
          loads: [4], weekTypes: ['test'],
          pattern: ['', 'y_test', 'y_ssg', '', 'y_tech_speed', 'y_tactical', 'y_match']
        },
        {
          name: T('دوري — المرحلة الثانية', 'League — phase 2'),
          goal: T('الحفاظ على المستوى مع تخفيف في فترة الامتحانات', 'Maintain performance, lighter during school exams'),
          components: ['technique', 'speed', 'tactics', 'prevention'],
          loads: [5, 6, 5], weekTypes: ['comp', 'comp', 'comp'],
          pattern: ['', 'y_strength', 'y_ssg', '', 'y_tech_speed', 'y_tactical', 'y_match']
        }
      ]
    },
    {
      type: 'transition',
      goal: T('راحة ولعب حر ورياضات تانية', 'Rest, free play and other sports'),
      components: ['recovery', 'coordination', 'aerobic'],
      blocks: [
        {
          name: T('انتقالية — لعب حر', 'Transition — free play'),
          goal: T('رياضات متنوعة لتطوير التوافق العام وتقليل الإجهاد والملل', 'Varied sports to develop general coordination and prevent burnout'),
          components: ['recovery', 'coordination', 'aerobic'],
          loads: [2, 2], weekTypes: ['deload', 'deload'],
          pattern: ['y_active', '', '', 'y_active', '', '', '']
        }
      ]
    }
  ],
  sessions: {
    y_test: ses(T('يوم اختبارات الناشئين', 'Youth testing day'),
      T('تحديد المستوى ومرحلة النمو لتقنين التدريب', 'Profile fitness and maturity status to individualise training'),
      ['power', 'acceleration', 'agility', 'vo2max'], 7, 100, [
        ...wuFifa(),
        dr(T('قياسات النمو: الطول واقف وقاعد والوزن', 'Growth measures: standing height, sitting height, body mass'), { sets: 1, reps: '1' },
          T('حساب مرحلة النضج (قبل/أثناء/بعد طفرة الطول) لضبط الحمل', 'Estimate maturity offset (pre/circa/post-PHV) to adjust load'), 'prevention',
          { note: T('كرر كل ٣ شهور؛ زيادة أكتر من ٧ سم في السنة معناها طفرة نمو', 'Repeat every 3 months; growth above 7cm per year indicates the growth spurt') }),
        TST.cmj(),
        TST.sprint('30m'),
        TST.cod(),
        TST.yoyo(),
        ...cdPitch()
      ]),
    y_tech_speed: ses(T('مهارة + سرعة وتوافق', 'Technique + speed & coordination'),
      T('تطوير المهارة الفردية والتسارع والتوافق في مرحلة حساسة للسرعة', 'Develop individual technique, acceleration and coordination in a speed-sensitive window'),
      ['technique', 'acceleration', 'coordination', 'reaction'], 6, 90, [
        ...wuFifa(),
        dr(T('تحكم بالكرة: لمسات بباطن ووش وخارج القدم في مساحة ١٠×١٠م', 'Ball mastery: inside, laces and outside touches in a 10x10m box'), { sets: 3, duration: '4min', rest: '60s' },
          T('إتقان التحكم بالقدمين الاتنين', 'Two-footed ball control'), 'technique'),
        dr('ad_agility_ladder_icky_shuffle', { sets: 4, reps: '2', rest: '30s', note: T('بعد السلم استلام كرة وتمرير', 'Receive and pass a ball after the ladder') },
          T('سرعة القدمين والتوافق', 'Foot speed and coordination'), 'coordination'),
        rn('dr_sprint_accel', { sets: 2, reps: '4', distance: '15m', intensity: '95', basis: 'vmax', rest: '60s', restType: 'walk', setRest: '3min' },
          T('تسارع بتكنيك سليم (ميل الجسم ودفع الأرض)', 'Acceleration with sound technique (body lean and ground push)'), 'acceleration'),
        rn('dr_discs_react', { sets: 1, reps: '6', distance: '10m', intensity: '100', basis: 'vmax', rest: '60s', restType: 'walk' },
          T('رد فعل على إشارة لون وانطلاق', 'React to a colour cue and sprint'), 'reaction'),
        dr(T('مراوغة ١ ضد ١ ثم تسديد', '1v1 dribble then shot'), { sets: 3, reps: '5', rest: '45s' },
          T('المراوغة بسرعة وتغيير الإيقاع', 'Dribbling at speed and changing pace'), 'technique'),
        dr(T('تمرير واستلام في مثلث بلمستين', 'Two-touch passing and receiving in triangles'), { sets: 2, duration: '6min', rest: '60s' },
          T('جودة الاستلام وفتح الجسم', 'Quality first touch and open body shape'), 'technique'),
        ...cdPitch()
      ]),
    y_strength: ses(T('قوة وقاية (فيفا ١١+) وتكنيك رفعات', 'Prevention strength (FIFA 11+) & lifting technique'),
      T('قوة أساسية آمنة وتعلم الحركات والهبوط لتقليل الإصابات', 'Safe foundational strength, movement and landing skills to reduce injuries'),
      ['strength', 'prevention', 'core', 'balance'], 6, 70, [
        wuFifa()[0],
        ...fifaPart2(),
        st('ex_goblet_squat', 3, '8', '6', 'rpe', '90s', T('تكنيك السكوات وقوة الرجلين', 'Squat technique and leg strength'), 'strength', { tempo: '3-1-1-0', note: T('الوزن يزيد بس لما التكنيك يبقى ممتاز', 'Add load only when technique is excellent') }),
        st('wg_split_squat', 2, '8/leg', '6', 'rpe', '60s', T('قوة رجل واحدة وثبات الركبة', 'Single-leg strength and knee control'), 'strength'),
        st('ex_pushup', 3, '8-12', '2', 'rir', '60s', T('قوة الجزء العلوي للالتحامات', 'Upper-body strength for duels'), 'strength'),
        st('ek_body_row', 3, '8-10', '2', 'rir', '60s', T('قوة السحب وتوازن الكتف', 'Pulling strength and shoulder balance'), 'strength'),
        PH.cph(2, '15s/side', true),
        mob('ad_90_90_hip_switches', { sets: 2, reps: '6/side' })
      ]),
    y_ssg: ses(T('ماتشات مصغرة ولياقة بالكرة', 'Small-sided games & ball conditioning'),
      T('رفع اللياقة المتقطعة من خلال اللعب مع قرار سريع', 'Build intermittent fitness through play with fast decisions'),
      ['vo2max', 'technique', 'tactics', 'agility'], 7, 85, [
        ...wuFifa(), wuRondo(),
        tm(T('ماتش مصغر ٣ ضد ٣ — ملعب ٢٥×٢٠م (أهداف صغيرة)', 'SSG 3v3 — 25x20m (small goals)'), 4, undefined, '3min', '8', 'rpe', '2min',
          T('لمسات كتير وشدة عالية وتحولات سريعة', 'Many touches, high intensity and quick transitions'), 'vo2max', { restType: 'active' }),
        tm(T('ماتش ٤ ضد ٤ + حراس — ملعب ٣٥×٢٥م', '4v4 + GKs — 35x25m'), 4, undefined, '4min', '7', 'rpe', '2min',
          T('لياقة متقطعة وإنهاء الهجمة', 'Intermittent fitness and finishing attacks'), 'vo2max', { restType: 'active' }),
        dr(T('مواجهات ١ ضد ١ دفاع وهجوم', '1v1 attacking and defending duels'), { sets: 2, reps: '6', rest: '45s' },
          T('الرشاقة الدفاعية وحماية الكرة', 'Defensive agility and shielding the ball'), 'agility'),
        ...cdPitch()
      ]),
    y_tactical: ses(T('مبادئ اللعب والكور الثابتة (MD-1)', 'Principles of play & set pieces (MD-1)'),
      T('فهم التمركز والتحولات بحمل خفيف قبل الماتش', 'Understand positioning and transitions at low load before the match'),
      ['tactics', 'technique', 'speed'], 4, 60, [
        ...wuFifa(),
        dr(T('لعب مراكز ٨ ضد ٨ — خطوط وتحركات بدون ضغط عالي', '8v8 positional play — lines and movements without high pressing'), { sets: 2, duration: '10min', rest: '2min' },
          T('التمركز والمسافات بين اللاعيبة', 'Positioning and distances between players'), 'tactics'),
        dr(T('كور ثابتة هجومية ودفاعية', 'Attacking and defensive set pieces'), { sets: 1, duration: '10min' },
          T('تنظيم الكور الثابتة', 'Set-piece organisation'), 'tactics'),
        rn('ad_reaction_start_sprint', { sets: 1, reps: '5', distance: '10m', intensity: '100', basis: 'vmax', rest: '60s', restType: 'walk' },
          T('تنشيط عصبي قبل الماتش', 'Neural activation before the match'), 'reaction'),
        breathe('3min')
      ]),
    y_match: ses(T('ماتش (دوري أو ودي)', 'Match (league or friendly)'),
      T('تطبيق المهارات والمبادئ في ماتش حقيقي', 'Apply skills and principles in a real match'),
      ['tactics', 'technique', 'mental'], 8, 110, [
        ...wuFifa(),
        wu(T('انطلاقات قصيرة وتمرير سريع', 'Short sprints and quick passing'), { duration: '6min' }),
        matchItem(T('ماتش ناشئين', 'Youth match'), '2 x 40min',
          T('تطبيق ما اتعلم في الأسبوع', 'Apply the week\'s learning'),
          T('تحت ١٧: شوطين ٤٥ دقيقة. مداورة عادلة في دقايق اللعب', 'U17: 2 x 45min. Fair rotation of playing minutes')),
        ...cdPitch()
      ]),
    y_active: ses(T('لعب حر ورياضات متنوعة', 'Free play & multi-sport'),
      T('توافق عام ومتعة وراحة ذهنية', 'General coordination, enjoyment and mental rest'),
      ['coordination', 'aerobic', 'recovery'], 3, 60, [
        wu(T('ألعاب جري ومطاردة', 'Running and tag games'), { duration: '8min' }),
        dr(T('رياضة تانية: سلة أو يد أو طائرة أو سباحة', 'Another sport: basketball, handball, volleyball or swimming'), { sets: 1, duration: '40min' },
          T('توافق عام وتنويع حركي', 'General coordination and movement variety'), 'coordination'),
        PH.nordic(2, '4'),
        breathe('3min')
      ])
  }
};

/* ================================================================== */
/* 3) Basketball — intermediate season                                 */
/* ================================================================== */
const basketball = {
  id: 'pt_basketball_season_int',
  sport: 'basketball',
  level: 'intermediate',
  title: T('موسم كرة سلة — مستوى متوسط', 'Basketball season — intermediate'),
  goal: T('رفع القوة والقدرة على النط والرشاقة الدفاعية ولياقة تكرار المجهود، والحفاظ عليها في الموسم مع إدارة حمل النط وحماية وتر الركبة والكاحل.',
    'Develop strength, jumping power, defensive agility and repeated-effort fitness, then maintain them in season while managing jump load and protecting the patellar tendon and ankles.'),
  components: ['power', 'max_strength', 'agility', 'speed_endurance', 'anaerobic', 'technique', 'tactics', 'prevention'],
  sessionsPerWeek: 5,
  periods: [
    {
      type: 'gpp',
      goal: T('إعداد عام: قوة أساسية وقاعدة هوائية ومهارات فردية', 'General preparation: foundational strength, aerobic base and individual skills'),
      components: ['strength', 'aerobic', 'technique', 'prevention'],
      blocks: [
        {
          name: T('أسبوع ١ — اختبارات', 'Week 1 — Testing'),
          goal: T('CMJ، عدو ٢٠م، ٥٠٥، يويو IR1، و٣RM تراب بار', 'CMJ, 20m sprint, 505, Yo-Yo IR1 and trap-bar 3RM'),
          components: ['power', 'acceleration', 'agility', 'vo2max'],
          loads: [4], weekTypes: ['test'],
          pattern: ['bb_test', 'bb_skill_speed', '', 'bb_gym_str', 'bb_court_cond', '', '']
        },
        {
          name: T('بلوك ١ — قاعدة قوة ولياقة', 'Block 1 — Strength & fitness base'),
          goal: T('قوة عامة ٣ × أسبوع ولياقة على الملعب بحجم متوسط', 'General strength and moderate-volume court conditioning'),
          components: ['strength', 'aerobic', 'technique', 'prevention'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['bb_gym_str', 'bb_skill_speed', 'bb_court_cond', '', 'bb_gym_str', 'bb_team', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: T('قوة قصوى وقدرة ولياقة خاصة بنسبة شغل وراحة زي الماتش', 'Max strength, power and specific conditioning at game-like work:rest'),
      components: ['max_strength', 'power', 'anaerobic', 'agility', 'tactics'],
      blocks: [
        {
          name: T('بلوك ٢ — قوة وقدرة ولياقة خاصة', 'Block 2 — Strength, power & specific fitness'),
          goal: T('أعلى حمل في الإعداد مع عدد نطات محسوب', 'Peak preparation load with a counted jump volume'),
          components: ['max_strength', 'power', 'anaerobic', 'agility'],
          loads: [6, 7, 8, 5], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['bb_gym_str', 'bb_court_cond', 'bb_skill_speed', '', 'bb_gym_power', 'bb_team', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: T('تحويل القوة لقدرة وماتشات تجريبية', 'Convert strength to power, with scrimmage games'),
      components: ['power', 'speed', 'tactics', 'anaerobic'],
      blocks: [
        {
          name: T('بلوك ٣ — ماتشات تجريبية', 'Block 3 — Scrimmages'),
          goal: T('حدة بدنية وتكتيكية وتهدئة قبل أول ماتش', 'Physical and tactical sharpness, taper into the first game'),
          components: ['power', 'tactics', 'anaerobic'],
          loads: [7, 5], weekTypes: ['load', 'taper'],
          pattern: ['bb_recovery', 'bb_gym_power', 'bb_court_cond', 'bb_team', 'bb_skill_speed', 'bb_shootaround', 'bb_game']
        }
      ]
    },
    {
      type: 'comp',
      goal: T('صيانة القوة والقدرة بأقل تعب واستشفاء بين الماتشات', 'Maintain strength and power with minimal fatigue and recover between games'),
      components: ['power', 'strength', 'tactics', 'recovery', 'prevention'],
      blocks: [
        {
          name: T('دوري — ماتش في الأسبوع', 'League — one game per week'),
          goal: T('G+1 استشفاء، G-4 جيم صيانة، G-3 تدريب فريق، G-2 سرعة ومهارة، G-1 شوت أراوند', 'G+1 recovery, G-4 maintenance gym, G-3 team practice, G-2 speed and skill, G-1 shootaround'),
          components: ['power', 'strength', 'tactics', 'recovery'],
          loads: [6, 7, 6, 5], weekTypes: ['comp', 'comp', 'comp', 'comp'],
          pattern: ['bb_recovery', '', 'bb_gym_maint', 'bb_team', 'bb_skill_speed', 'bb_shootaround', 'bb_game']
        },
        {
          name: T('أسبوع إعادة اختبار', 'Re-test week'),
          goal: T('CMJ وعدو ٢٠م لمتابعة التعب والحالة', 'CMJ and 20m sprint to monitor fatigue and status'),
          components: ['power', 'acceleration'],
          loads: [5], weekTypes: ['test'],
          pattern: ['bb_recovery', '', 'bb_test', 'bb_team', 'bb_skill_speed', 'bb_shootaround', 'bb_game']
        },
        {
          name: T('ماتشين في الأسبوع', 'Two games per week'),
          goal: T('استشفاء وتنشيط بس بين الماتشات', 'Only recovery and activation between games'),
          components: ['recovery', 'tactics', 'power'],
          loads: [7, 6], weekTypes: ['comp', 'comp'],
          pattern: ['bb_recovery', 'bb_shootaround', 'bb_game', 'bb_recovery', 'bb_gym_maint', 'bb_shootaround', 'bb_game']
        }
      ]
    },
    {
      type: 'transition',
      goal: T('راحة إيجابية واستشفاء الأوتار', 'Active rest and tendon recovery'),
      components: ['recovery', 'aerobic', 'mobility'],
      blocks: [
        {
          name: T('انتقالية', 'Transition'),
          goal: T('نشاط خفيف من غير نط كتير', 'Light activity with little jumping'),
          components: ['recovery', 'aerobic', 'mobility'],
          loads: [2, 3], weekTypes: ['deload', 'deload'],
          pattern: ['bb_active', '', '', 'bb_active', '', '', '']
        }
      ]
    }
  ],
  sessions: {
    bb_test: ses(T('يوم اختبارات السلة', 'Basketball testing day'),
      T('تحديد المستوى وتقنين الأحمال', 'Profile players and set loads'),
      ['power', 'acceleration', 'agility', 'vo2max'], 8, 100, [
        ...wuCourt(),
        TST.cmj(),
        TST.sprint('20m'),
        TST.cod(),
        TST.strength('wg_trap_bar_deadlift', '3RM'),
        TST.yoyo(),
        ...cdCourt()
      ]),
    bb_gym_str: ses(T('جيم — قوة', 'Gym — strength'),
      T('قوة الرجلين والجذع كأساس للنط والالتحام', 'Leg and trunk strength as the base for jumping and contact'),
      ['max_strength', 'strength', 'prevention', 'core'], 7, 75, [
        ...wuGym(),
        st('wg_trap_bar_deadlift', 4, '5', '80', '1rm', '3min', T('قوة الرجلين بحمل أقل على الضهر', 'Leg strength with less spinal load'), 'max_strength', { tempo: '2-0-X-0' }),
        st('ex_front_squat', 3, '5', '78', '1rm', '2min 30s', T('قوة الفخذ الأمامي والجذع المستقيم', 'Quad strength with an upright trunk'), 'max_strength', { tempo: '3-0-1-0' }),
        st('ex_bulgarian_split_squat', 3, '6/leg', '2', 'rir', '90s', T('قوة رجل واحدة للانطلاق والنط', 'Single-leg strength for take-offs'), 'strength'),
        st('ex_dumbbell_bench_press', 3, '8', '2', 'rir', '90s', T('قوة الدفع للالتحام تحت السلة', 'Pushing strength for contact under the rim'), 'strength'),
        st('ex_pullup', 3, '6-8', '2', 'rir', '90s', T('قوة السحب للريباوند', 'Pulling strength for rebounding'), 'strength'),
        PH.spanish(3),
        PH.heel(),
        PH.pallof(),
        ...cdGym()
      ]),
    bb_gym_power: ses(T('جيم — قدرة ونط', 'Gym — power & jumping'),
      T('رفع ارتفاع النط والانطلاق السريع', 'Raise jump height and first-step quickness'),
      ['power', 'max_strength', 'prevention'], 7, 70, [
        ...wuGym(),
        st('ad_hang_power_clean', 4, '3', '70', '1rm', '2min 30s', T('إنتاج قوة سريع من الحوض', 'Rapid hip force production'), 'power'),
        st('ad_trap_bar_jump', 4, '4', '20-30', '1rm', '2min', T('نط بحمل خفيف لأعلى قدرة', 'Loaded jumps at the optimal power load'), 'power'),
        st('ad_depth_jump', 3, '5', '9', 'rpe', '2min', T('قوة ارتدادية لنط الريباوند', 'Reactive strength for rebound jumps'), 'power', { note: T('بوكس ٣٠-٤٠سم، ١٥ لمسة', '30-40cm box, 15 contacts') }),
        st('ad_single_leg_forward_hop_and_stick', 3, '4/leg', '7', 'rpe', '60s', T('قدرة رجل واحدة وثبات في الهبوط (لاي أب)', 'Single-leg power and landing control (lay-ups)'), 'power', { note: T('٢٤ لمسة', '24 contacts') }),
        st('ad_medicine_ball_chest_pass', 3, '6', '8', 'rpe', '60s', T('قدرة الدفع للتمريرة الصدرية', 'Pushing power for chest passes'), 'power'),
        PH.spanish(3),
        ...cdGym()
      ]),
    bb_gym_maint: ses(T('جيم صيانة (موسم)', 'In-season maintenance gym'),
      T('الحفاظ على القوة والقدرة بأقل تعب ونط', 'Keep strength and power with minimal fatigue and jumping'),
      ['strength', 'power', 'prevention'], 6, 55, [
        ...wuGym().slice(0, 3),
        st('wg_trap_bar_deadlift', 3, '3', '85', '1rm', '2min 30s', T('صيانة القوة القصوى', 'Maintain max strength'), 'max_strength'),
        st('ad_trap_bar_jump', 3, '3', '20', '1rm', '90s', T('صيانة القدرة', 'Maintain power'), 'power'),
        st('ex_single_leg_rdl', 2, '6/leg', '2', 'rir', '60s', T('توازن وقوة الخلفية', 'Balance and hamstring strength'), 'strength'),
        PH.spanish(3),
        PH.ankle(),
        ...cdGym()
      ]),
    bb_court_cond: ses(T('لياقة خاصة على الملعب', 'Court-specific conditioning'),
      T('القدرة على تكرار الجري السريع والدفاع والنط زي الماتش', 'Repeat sprints, defensive slides and jumps like the game'),
      ['speed_endurance', 'anaerobic', 'agility', 'tactics'], 8, 80, [
        ...wuCourt(),
        rn(T('تكرار سبرنت على الملعب ٦ × (١٤م + ١٤م) — انطلاقة كل ٢٥ ث', 'Repeated court sprints 6 x (14m + 14m) — depart every 25s'), { sets: 3, reps: '6', distance: '28m', intensity: '100', basis: 'vmax', rest: '25s', restType: 'walk', setRest: '3min' },
          T('تكرار السبرنت بتغيير اتجاه زي الهجمة المرتدة', 'Repeated sprints with a turn like fast breaks'), 'speed_endurance'),
        tm('ad_mirror_drill', 3, '4', '15s', '9', 'rpe', '30s', T('رشاقة دفاعية برد فعل (الوقفة الدفاعية)', 'Reactive defensive agility in stance'), 'agility', { setRest: '2min' }),
        tm(T('٣ ضد ٣ نص ملعب — بدون وقفات', '3v3 half-court — continuous'), 4, undefined, '3min', '8', 'rpe', '2min',
          T('لياقة خاصة بالمهارة وقرار تحت تعب', 'Skill-based conditioning and decisions under fatigue'), 'anaerobic'),
        dr(T('هجمة مرتدة ٣ ضد ٢ متواصلة (ملعب كامل)', 'Continuous 3v2 fast break (full court)'), { sets: 3, duration: '4min', rest: '90s' },
          T('التحولات السريعة وإنهاء الهجمة', 'Quick transitions and finishing'), 'tactics'),
        dr(T('رميات حرة تحت تعب', 'Free throws under fatigue'), { sets: 3, reps: '10', rest: '30s' },
          T('دقة التصويب بعد مجهود', 'Shooting accuracy after exertion'), 'technique'),
        ...cdCourt()
      ]),
    bb_skill_speed: ses(T('مهارة + سرعة وحركة قدمين', 'Skill + speed & footwork'),
      T('الخطوة الأولى وحركة القدمين الدفاعية والتصويب بسرعة الماتش', 'First step, defensive footwork and game-speed shooting'),
      ['acceleration', 'agility', 'technique', 'reaction'], 6, 80, [
        ...wuCourt(),
        rn('ad_shuffle_to_sprint', { sets: 2, reps: '4', distance: '5m + 10m', intensity: '95', basis: 'vmax', rest: '60s', restType: 'walk', setRest: '2min' },
          T('الانتقال من الوقفة الدفاعية للانطلاق', 'Transition from defensive stance to sprint'), 'acceleration'),
        rn('dr_cone_box', { sets: 1, reps: '6', distance: '20m', intensity: '95', basis: 'best', rest: '60s', restType: 'walk' },
          T('تغيير اتجاه متعدد (أمام، جانبي، خلف)', 'Multi-directional cutting (forward, lateral, back)'), 'agility'),
        dr(T('كلوز آوت + دفاع على الدريبل', 'Close-outs + on-ball defence vs dribble'), { sets: 3, reps: '6', rest: '45s' },
          T('فرملة سريعة وحماية المنطقة', 'Fast braking and protecting the lane'), 'agility'),
        dr(T('تصويب بسرعة الماتش: ٥ مناطق × ١٠ (استلام وتصويب)', 'Game-speed shooting: 5 spots x 10 (catch-and-shoot)'), { sets: 1, reps: '50', duration: '12min' },
          T('ثبات التصويب بإيقاع الماتش', 'Shooting consistency at game rhythm'), 'technique'),
        dr(T('دريبل بالإيدين الاتنين وإنهاء عند السلة', 'Two-hand ball handling and finishing at the rim'), { sets: 3, duration: '4min', rest: '60s' },
          T('التحكم في الكرة والإنهاء بالإيدين الاتنين', 'Ball control and two-handed finishing'), 'technique'),
        ...cdCourt()
      ]),
    bb_team: ses(T('تدريب الفريق — تكتيك وماتش تجريبي', 'Team practice — tactics & scrimmage'),
      T('تنفيذ الخطط الهجومية والدفاعية بشدة الماتش', 'Execute offensive and defensive systems at game intensity'),
      ['tactics', 'anaerobic', 'technique'], 7, 100, [
        ...wuCourt(),
        dr(T('٥ ضد ٥ نص ملعب: خطط هجومية (بيك آند رول)', '5v5 half-court: offensive sets (pick-and-roll)'), { sets: 3, duration: '8min', rest: '2min' },
          T('قراءة الدفاع وتنفيذ الخطط', 'Read the defence and run sets'), 'tactics'),
        dr(T('دفاع مناطق ورجل لرجل ودوران المساعدة', 'Zone and man-to-man defence with help rotations'), { sets: 3, duration: '6min', rest: '2min' },
          T('التواصل والمساعدة الدفاعية', 'Communication and help defence'), 'tactics'),
        tm(T('ماتش تجريبي ٥ ضد ٥ ملعب كامل', '5v5 full-court scrimmage'), 4, undefined, '6min', '8', 'rpe', '2min',
          T('شدة الماتش وتطبيق الخطط', 'Game intensity and system execution'), 'anaerobic', { note: T('عد النطات: الهدف أقل من ١٥٠ نطة للاعب', 'Count jumps: target under 150 per player') }),
        dr(T('رميات حرة', 'Free throws'), { sets: 2, reps: '10', rest: '30s' }, T('ثبات الرمية الحرة', 'Free-throw consistency'), 'technique'),
        ...cdCourt()
      ]),
    bb_shootaround: ses(T('G-1 — شوت أراوند وتنشيط', 'G-1 — shootaround & activation'),
      T('تنشيط خفيف ومراجعة خطة الماتش', 'Light activation and game-plan review'),
      ['technique', 'tactics', 'speed'], 3, 50, [
        ...wuCourt().slice(0, 2),
        rn('ad_reaction_start_sprint', { sets: 1, reps: '4', distance: '5m', intensity: '100', basis: 'vmax', rest: '45s', restType: 'walk' },
          T('تنشيط عصبي خفيف', 'Light neural activation'), 'reaction'),
        dr(T('مراجعة خطط الخصم (مشي وسرعة نص)', 'Opponent scout walk-through (walk to half pace)'), { sets: 1, duration: '15min' },
          T('فهم خطة الماتش', 'Understand the game plan'), 'tactics'),
        dr(T('تصويب خفيف: قريب ومتوسط وتلاتة', 'Light shooting: close, mid-range and threes'), { sets: 1, reps: '60', duration: '12min' },
          T('ثقة وإحساس بالكرة', 'Confidence and touch'), 'technique'),
        breathe('3min')
      ]),
    bb_game: ses(T('يوم الماتش', 'Game day'),
      T('أعلى أداء في الماتش', 'Peak game performance'),
      ['tactics', 'anaerobic', 'mental'], 9, 110, [
        ...wuCourt(),
        matchItem(T('ماتش رسمي', 'Official game'), '4 x 10min', T('تنفيذ خطة الماتش', 'Execute the game plan'),
          T('إحماء قصير للبدلاء قبل الدخول (٢ دقيقة)', 'Short 2min re-warm for substitutes before entering')),
        mob(T('تهدئة ومشروب استشفاء (كربوهيدرات وبروتين)', 'Cool-down and recovery drink (carbohydrate and protein)'), { duration: '10min' })
      ]),
    bb_recovery: ses(T('G+1 — استشفاء وتعويض للبدلاء', 'G+1 — recovery & top-up for bench players'),
      T('استشفاء للأساسيين وحمل تعويضي للي لعب أقل من ١٥ دقيقة', 'Recovery for starters and a top-up for players under 15 minutes'),
      ['recovery', 'mobility', 'anaerobic'], 3, 50, [
        wu('ex_stationary_bike', { duration: '5min' }),
        mob(T('أساسيين: عجلة خفيفة أو حمام سباحة', 'Starters: easy bike or pool'), { duration: '15min' }),
        mob('ad_foam_roller_thoracic_extension', { sets: 1, duration: '2min' }),
        mob('ad_90_90_hip_switches', { sets: 2, reps: '6/side' }),
        mob('ex_calf_stretch', { sets: 1, duration: '45s', note: SIDE }),
        tm(T('بدلاء: ٣ ضد ٣ نص ملعب', 'Bench players: 3v3 half-court'), 4, undefined, '3min', '8', 'rpe', '90s',
          T('تعويض الحمل الأيضي للماتش', 'Replace the metabolic load of the game'), 'anaerobic')
      ]),
    bb_active: ses(T('راحة إيجابية', 'Active rest'),
      T('استشفاء وحفاظ على اللياقة من غير نط', 'Recovery and fitness without jumping'),
      ['recovery', 'aerobic', 'mobility'], 3, 45, [
        wu(T('مشي سريع', 'Brisk walk'), { duration: '5min' }),
        rn(T('عجلة أو سباحة أو جري خفيف', 'Bike, swim or easy run'), { duration: '30min', intensity: 'Z2', basis: 'hr' },
          T('الحفاظ على القاعدة الهوائية بأقل حمل على الأوتار', 'Keep the aerobic base with low tendon load'), 'aerobic'),
        PH.spanish(2),
        mob('ad_pigeon_stretch', { sets: 1, duration: '60s', note: SIDE }),
        breathe()
      ])
  }
};

/* ================================================================== */
/* 4) Handball — intermediate season                                   */
/* ================================================================== */
const handball = {
  id: 'pt_handball_season_int',
  sport: 'handball',
  level: 'intermediate',
  title: T('موسم كرة يد — مستوى متوسط', 'Handball season — intermediate'),
  goal: T('بناء القوة والقدرة في الرمي والنط، ولياقة تكرار المجهود والالتحام، والحفاظ عليها في الموسم مع حماية كتف الرمي والركبة والكاحل.',
    'Build throwing and jumping strength and power plus repeated-effort and contact fitness, then maintain them in season while protecting the throwing shoulder, knees and ankles.'),
  components: ['power', 'max_strength', 'speed_endurance', 'agility', 'anaerobic', 'technique', 'tactics', 'prevention'],
  sessionsPerWeek: 5,
  periods: [
    {
      type: 'gpp',
      goal: T('إعداد عام: قوة أساسية وقاعدة هوائية وتجهيز الكتف لحمل الرمي', 'General preparation: foundational strength, aerobic base and shoulder conditioning for throwing load'),
      components: ['strength', 'aerobic', 'technique', 'prevention'],
      blocks: [
        {
          name: T('أسبوع ١ — اختبارات', 'Week 1 — Testing'),
          goal: T('CMJ، عدو ٣٠م، ٥٠٥، يويو IR1، وسرعة الرمية بالرادار', 'CMJ, 30m sprint, 505, Yo-Yo IR1 and radar throwing velocity'),
          components: ['power', 'acceleration', 'agility', 'vo2max'],
          loads: [4], weekTypes: ['test'],
          pattern: ['hb_test', 'hb_speed_tech', '', 'hb_gym_str', 'hb_court_cond', '', '']
        },
        {
          name: T('بلوك ١ — قاعدة', 'Block 1 — Base'),
          goal: T('قوة عامة ولياقة هوائية متقطعة وعدد رميات متدرج', 'General strength, intermittent aerobic fitness and a progressive throw count'),
          components: ['strength', 'aerobic', 'technique', 'prevention'],
          loads: [5, 6, 7, 4], weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['hb_gym_str', 'hb_speed_tech', 'hb_court_cond', '', 'hb_gym_str', 'hb_team', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: T('قوة قصوى وقدرة رمي ولياقة خاصة بالهجمات المرتدة والالتحام', 'Max strength, throwing power and conditioning specific to fast breaks and contact'),
      components: ['max_strength', 'power', 'speed_endurance', 'agility', 'tactics'],
      blocks: [
        {
          name: T('بلوك ٢ — قوة وقدرة ولياقة خاصة', 'Block 2 — Strength, power & specific fitness'),
          goal: T('أعلى حمل في الإعداد', 'Peak preparation load'),
          components: ['max_strength', 'power', 'speed_endurance', 'agility'],
          loads: [6, 7, 8, 5], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['hb_gym_str', 'hb_court_cond', 'hb_speed_tech', '', 'hb_gym_power', 'hb_team', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: T('تحويل القوة لقدرة وماتشات ودية', 'Convert strength to power with friendly games'),
      components: ['power', 'speed', 'tactics'],
      blocks: [
        {
          name: T('بلوك ٣ — وديات', 'Block 3 — Friendlies'),
          goal: T('حدة بدنية وتكتيكية وتهدئة قبل أول ماتش', 'Physical and tactical sharpness, taper into the first match'),
          components: ['power', 'tactics', 'speed_endurance'],
          loads: [7, 5], weekTypes: ['load', 'taper'],
          pattern: ['hb_recovery', 'hb_gym_power', 'hb_court_cond', 'hb_team', 'hb_speed_tech', 'hb_prematch', 'hb_game']
        }
      ]
    },
    {
      type: 'comp',
      goal: T('صيانة القوة والقدرة والسرعة بأقل تعب، وإدارة عدد الرميات', 'Maintain strength, power and speed with minimal fatigue and managed throw counts'),
      components: ['power', 'strength', 'tactics', 'recovery', 'prevention'],
      blocks: [
        {
          name: T('دوري — المرحلة الأولى', 'League — phase 1'),
          goal: T('MD+1 استشفاء، MD-4 جيم صيانة، MD-3 تدريب فريق، MD-2 سرعة ومهارة، MD-1 تنشيط', 'MD+1 recovery, MD-4 maintenance gym, MD-3 team practice, MD-2 speed and skill, MD-1 activation'),
          components: ['power', 'strength', 'tactics', 'recovery'],
          loads: [6, 7, 6, 5], weekTypes: ['comp', 'comp', 'comp', 'comp'],
          pattern: ['hb_recovery', '', 'hb_gym_maint', 'hb_team', 'hb_speed_tech', 'hb_prematch', 'hb_game']
        },
        {
          name: T('أسبوع إعادة اختبار', 'Re-test week'),
          goal: T('CMJ وعدو وسرعة رمية لمتابعة الحالة', 'CMJ, sprint and throwing velocity to monitor status'),
          components: ['power', 'acceleration'],
          loads: [5], weekTypes: ['test'],
          pattern: ['hb_recovery', '', 'hb_test', 'hb_team', 'hb_speed_tech', 'hb_prematch', 'hb_game']
        },
        {
          name: T('دوري — المرحلة الثانية', 'League — phase 2'),
          goal: T('الحفاظ على الحدة للأسابيع الحاسمة', 'Keep the edge for the decisive weeks'),
          components: ['power', 'tactics', 'recovery', 'prevention'],
          loads: [6, 6], weekTypes: ['comp', 'comp'],
          pattern: ['hb_recovery', '', 'hb_gym_maint', 'hb_team', 'hb_speed_tech', 'hb_prematch', 'hb_game']
        }
      ]
    },
    {
      type: 'transition',
      goal: T('راحة إيجابية وراحة لكتف الرمي', 'Active rest and throwing-shoulder unloading'),
      components: ['recovery', 'aerobic', 'mobility'],
      blocks: [
        {
          name: T('انتقالية', 'Transition'),
          goal: T('نشاط خفيف ومرونة من غير رمي', 'Light activity and mobility, no throwing'),
          components: ['recovery', 'aerobic', 'mobility'],
          loads: [2, 3], weekTypes: ['deload', 'deload'],
          pattern: ['hb_active', '', '', 'hb_active', '', '', '']
        }
      ]
    }
  ],
  sessions: {
    hb_test: ses(T('يوم اختبارات كرة اليد', 'Handball testing day'),
      T('تحديد المستوى وتقنين الأحمال', 'Profile players and set loads'),
      ['power', 'acceleration', 'agility', 'vo2max'], 8, 100, [
        ...wuCourt(), PH.cuff(),
        TST.cmj(),
        TST.sprint('30m'),
        TST.cod(),
        dr(T('اختبار سرعة الرمية بالرادار: ٣ رميات بالوثب من ٩م', 'Radar throwing-velocity test: 3 jump shots from 9m'), { sets: 1, reps: '3', rest: '60s' },
          T('قياس قدرة الرمي (كم/س)', 'Measure throwing power (km/h)'), 'power'),
        TST.yoyo(),
        ...cdCourt()
      ]),
    hb_gym_str: ses(T('جيم — قوة', 'Gym — strength'),
      T('قوة الرجلين والجزء العلوي للرمي والالتحام', 'Lower and upper-body strength for throwing and contact'),
      ['max_strength', 'strength', 'prevention', 'core'], 7, 75, [
        ...wuGym().slice(0, 3), PH.cuff(),
        st('ex_barbell_back_squat', 4, '5', '80', '1rm', '3min', T('قوة الرجلين للنط والانطلاق', 'Leg strength for jumping and sprinting'), 'max_strength', { tempo: '2-0-X-0' }),
        st('ex_barbell_bench_press', 4, '5', '80', '1rm', '2min 30s', T('قوة الدفع للالتحام والرمي', 'Pushing strength for contact and throwing'), 'max_strength'),
        st('ex_one_arm_dumbbell_row', 3, '8/side', '2', 'rir', '90s', T('توازن الكتف وقوة السحب', 'Shoulder balance and pulling strength'), 'strength'),
        st('ex_romanian_deadlift', 3, '6', '2', 'rir', '2min', T('قوة الخلفية والمؤخرة', 'Hamstring and glute strength'), 'strength', { tempo: '3-0-1-0' }),
        st('wg_landmine_press', 3, '8/side', '2', 'rir', '90s', T('دفع فوق الراس بإيد واحدة بأمان للكتف', 'Shoulder-friendly single-arm overhead pressing'), 'strength'),
        PH.nordic(3, '5'),
        PH.cph(3, '20s/side'),
        PH.ytw(),
        ...cdGym()
      ]),
    hb_gym_power: ses(T('جيم — قدرة رمي ونط', 'Gym — throwing & jumping power'),
      T('تحويل القوة لسرعة رمي ونط أعلى', 'Convert strength into faster throws and higher jumps'),
      ['power', 'max_strength', 'prevention'], 7, 70, [
        ...wuGym().slice(0, 3), PH.cuff(),
        st('ad_hang_power_clean', 4, '3', '70', '1rm', '2min 30s', T('إنتاج قوة سريع من الحوض', 'Rapid hip force production'), 'power'),
        st('ad_bench_press_to_plyo_push_up_contrast', 4, '3 + 5', '85', '1rm', '3min', T('تباين ثقيل/سريع لقدرة الدفع', 'Heavy/fast contrast for pushing power'), 'power',
          { note: T('٣ بنش عند ٨٥٪ ثم ٥ ضغط انفجاري', '3 bench at 85% then 5 plyo push-ups') }),
        st('ad_medicine_ball_rotational_throw', 3, '5/side', '8', 'rpe', '60s', T('نقل القوة من الرجل للجذع للدراع (سلسلة الرمي)', 'Transfer force leg-trunk-arm (throwing chain)'), 'power'),
        st('ad_medicine_ball_soccer_throw', 3, '6', '8', 'rpe', '60s', T('قدرة الرمي فوق الراس', 'Overhead throwing power'), 'power', { note: T('كرة ٢-٣ كجم', '2-3kg ball') }),
        st('ad_lateral_bound_and_stick', 3, '4/side', '8', 'rpe', '90s', T('قدرة جانبية وهبوط آمن للاعيبة الجناح والخط الخلفي', 'Lateral power and safe landing for wings and backs'), 'power', { note: T('٢٤ لمسة', '24 contacts') }),
        PH.nordic(2, '4'),
        ...cdGym()
      ]),
    hb_gym_maint: ses(T('جيم صيانة (موسم)', 'In-season maintenance gym'),
      T('الحفاظ على القوة والقدرة بأقل تعب', 'Keep strength and power with minimal fatigue'),
      ['strength', 'power', 'prevention'], 6, 55, [
        ...wuGym().slice(0, 3), PH.cuff(),
        st('ex_barbell_back_squat', 3, '3', '85', '1rm', '2min 30s', T('صيانة القوة القصوى', 'Maintain max strength'), 'max_strength'),
        st('ex_barbell_bench_press', 3, '3', '85', '1rm', '2min 30s', T('صيانة قوة الدفع', 'Maintain pushing strength'), 'max_strength'),
        st('wg_jump_squat', 3, '4', '8', 'rpe', '90s', T('صيانة القدرة', 'Maintain power'), 'power'),
        PH.nordic(2, '4'),
        PH.cph(2, '20s/side'),
        mob('ad_sleeper_stretch', { sets: 2, duration: '40s', note: T('لكتف الرمي، من غير ألم', 'Throwing shoulder, pain-free') })
      ]),
    hb_court_cond: ses(T('لياقة خاصة — هجمات مرتدة والتحام', 'Specific conditioning — fast breaks & contact'),
      T('تكرار السبرنت والدفاع والالتحام زي الماتش', 'Repeated sprints, defensive shuffles and contact like the match'),
      ['speed_endurance', 'anaerobic', 'agility', 'tactics'], 8, 80, [
        ...wuCourt(),
        rn(T('تكرار سبرنت هجمة مرتدة ٦ × ٣٠م — انطلاقة كل ٢٥ ث', 'Repeated fast-break sprints 6 x 30m — depart every 25s'), { sets: 3, reps: '6', distance: '30m', intensity: '100', basis: 'vmax', rest: '25s', restType: 'walk', setRest: '3min' },
          T('تكرار السبرنت والرجوع الدفاعي', 'Repeated sprints and defensive recovery runs'), 'speed_endurance', { note: T('آخر ٥م استلام كرة وتصويب', 'Receive and shoot in the last 5m') }),
        tm(T('فترات دفاع ٦-٠: تحرك جانبي وتقدم وخروج', '6-0 defence intervals: lateral shuffle, step-out and recover'), 3, '6', '20s', '9', 'rpe', '20s',
          T('تحمل الحركة الدفاعية بنسبة شغل وراحة زي الماتش', 'Defensive movement endurance at match work:rest'), 'anaerobic', { setRest: '2min' }),
        tm(T('دويلات التحام ١ ضد ١ في مربع ٣×٣م (زق وتثبيت)', '1v1 contact duels in a 3x3m box (push and hold)'), 3, '4', '10s', '9', 'rpe', '30s',
          T('قوة الالتحام والثبات', 'Contact strength and stability'), 'strength', { setRest: '2min' }),
        tm(T('ماتش ٤ ضد ٤ — نص ملعب (٢٠×٢٠م)', '4v4 — half court (20x20m)'), 4, undefined, '4min', '8', 'rpe', '2min',
          T('لياقة خاصة بالمهارة وقرار تحت تعب', 'Skill-based conditioning and decisions under fatigue'), 'anaerobic'),
        ...cdCourt()
      ]),
    hb_speed_tech: ses(T('سرعة + تكنيك الرمي', 'Speed + throwing technique'),
      T('الخطوة الأولى والخداع وتكنيك التصويب بعدد رميات محسوب', 'First step, feints and shooting technique with counted throws'),
      ['acceleration', 'agility', 'technique', 'reaction'], 6, 85, [
        ...wuCourt(), PH.cuff(),
        rn('ad_backpedal_to_sprint', { sets: 2, reps: '4', distance: '5m + 10m', intensity: '95', basis: 'vmax', rest: '60s', restType: 'walk', setRest: '2min' },
          T('التحول من الدفاع للهجوم', 'Switch from defence to attack'), 'acceleration'),
        rn('dr_cone_t_drill', { sets: 1, reps: '5', distance: '40m', intensity: '95', basis: 'best', rest: '75s', restType: 'walk' },
          T('رشاقة متعددة الاتجاهات', 'Multi-directional agility'), 'agility'),
        dr(T('خداع ١ ضد ١ واختراق', '1v1 feints and penetration'), { sets: 3, reps: '6', rest: '45s' },
          T('خداع المدافع والاختراق بسرعة', 'Beat the defender and penetrate at speed'), 'agility'),
        dr(T('تصويب من الخط الخلفي (٩م) بالوثب ومن الجناح', 'Back-court jump shots (9m) and wing shots'), { sets: 4, reps: '8', rest: '60s' },
          T('دقة وسرعة التصويب', 'Shooting accuracy and velocity'), 'technique', { note: T('إجمالي الرميات القوية أقل من ٨٠ في التمرينة', 'Keep full-effort throws under 80 per session') }),
        dr(T('حراس المرمى: رد فعل ومرونة', 'Goalkeepers: reaction and flexibility'), { sets: 3, duration: '5min', rest: '60s' },
          T('سرعة رد فعل الحارس', 'Goalkeeper reaction speed'), 'reaction'),
        ...cdCourt()
      ]),
    hb_team: ses(T('تدريب الفريق — تكتيك وماتش تجريبي', 'Team practice — tactics & scrimmage'),
      T('تنفيذ الخطط الهجومية والدفاعية بشدة الماتش', 'Execute attack and defence systems at match intensity'),
      ['tactics', 'anaerobic', 'technique'], 7, 100, [
        ...wuCourt(), PH.cuff(),
        dr(T('هجوم ٦ ضد ٦ ضد دفاع ٦-٠ و٥-١', '6v6 attack vs 6-0 and 5-1 defence'), { sets: 3, duration: '8min', rest: '2min' },
          T('خطط الهجوم المنظم', 'Set attacking plays'), 'tactics'),
        dr(T('هجمة مرتدة أولى وتانية', 'First and second-wave fast break'), { sets: 3, duration: '5min', rest: '90s' },
          T('التحولات السريعة', 'Quick transitions'), 'tactics'),
        tm(T('ماتش تجريبي ٧ ضد ٧', '7v7 scrimmage'), 2, undefined, '12min', '8', 'rpe', '3min',
          T('شدة الماتش وتطبيق الخطط', 'Match intensity and system execution'), 'anaerobic'),
        ...cdCourt()
      ]),
    hb_prematch: ses(T('MD-1 — تنشيط وخطة الماتش', 'MD-1 — activation & game plan'),
      T('تنشيط خفيف ومراجعة خطة الخصم', 'Light activation and opponent review'),
      ['technique', 'tactics', 'speed'], 3, 50, [
        ...wuCourt().slice(0, 2), PH.cuff(),
        rn('ad_reaction_start_sprint', { sets: 1, reps: '4', distance: '10m', intensity: '100', basis: 'vmax', rest: '60s', restType: 'walk' },
          T('تنشيط عصبي خفيف', 'Light neural activation'), 'reaction'),
        dr(T('مراجعة خطط الخصم (مشي وسرعة نص)', 'Opponent walk-through (walk to half pace)'), { sets: 1, duration: '15min' },
          T('فهم خطة الماتش', 'Understand the game plan'), 'tactics'),
        dr(T('تصويب خفيف للجناح والدائرة و٧م', 'Light shooting: wing, pivot and 7m'), { sets: 1, reps: '30', duration: '10min' },
          T('ثقة وإحساس بالكرة', 'Confidence and feel'), 'technique'),
        breathe('3min')
      ]),
    hb_game: ses(T('يوم الماتش', 'Match day'),
      T('أعلى أداء في الماتش', 'Peak match performance'),
      ['tactics', 'anaerobic', 'mental'], 9, 100, [
        ...wuCourt(), PH.cuff(),
        matchItem(T('ماتش رسمي', 'Official match'), '2 x 30min', T('تنفيذ خطة الماتش', 'Execute the game plan'),
          T('الحارس يعمل إحماء رد فعل ١٠ دقايق مخصوص', 'Goalkeeper does a dedicated 10min reaction warm-up')),
        mob(T('تهدئة ومرونة كتف ومشروب استشفاء', 'Cool-down, shoulder mobility and recovery drink'), { duration: '10min' })
      ]),
    hb_recovery: ses(T('MD+1 — استشفاء وتعويض', 'MD+1 — recovery & top-up'),
      T('استشفاء للأساسيين وحمل تعويضي للبدلاء', 'Recovery for starters and top-up for substitutes'),
      ['recovery', 'mobility', 'speed_endurance'], 3, 50, [
        wu('ex_stationary_bike', { duration: '5min' }),
        mob(T('أساسيين: عجلة خفيفة أو حمام سباحة', 'Starters: easy bike or pool'), { duration: '15min' }),
        mob('ad_sleeper_stretch', { sets: 2, duration: '40s' }),
        mob('ad_90_90_hip_switches', { sets: 2, reps: '6/side' }),
        rn(T('بدلاء: سبرنت هجمة مرتدة', 'Substitutes: fast-break sprints'), { sets: 2, reps: '5', distance: '30m', intensity: '95', basis: 'vmax', rest: '30s', restType: 'walk', setRest: '3min' },
          T('تعويض الجري السريع', 'Replace high-speed running'), 'speed_endurance'),
        tm(T('بدلاء: ٣ ضد ٣ نص ملعب', 'Substitutes: 3v3 half court'), 3, undefined, '3min', '8', 'rpe', '90s',
          T('تعويض الحمل الأيضي للماتش', 'Replace the metabolic load of the match'), 'anaerobic')
      ]),
    hb_active: ses(T('راحة إيجابية', 'Active rest'),
      T('استشفاء وحفاظ على اللياقة من غير رمي', 'Recovery and fitness without throwing'),
      ['recovery', 'aerobic', 'mobility'], 3, 45, [
        wu(T('مشي سريع', 'Brisk walk'), { duration: '5min' }),
        rn(T('جري خفيف أو عجلة أو سباحة', 'Easy run, bike or swim'), { duration: '30min', intensity: 'Z2', basis: 'hr' },
          T('الحفاظ على القاعدة الهوائية', 'Keep the aerobic base'), 'aerobic'),
        PH.cuff(),
        PH.nordic(2, '5'),
        breathe()
      ])
  }
};

/* ================================================================== */
/* 5) Volleyball — intermediate season (jump-load managed)             */
/* ================================================================== */
const JUMP_NOTE = (ar, en) => ({ note: T(ar, en) });
const volleyball = {
  id: 'pt_volleyball_season_int',
  sport: 'volleyball',
  level: 'intermediate',
  title: T('موسم كرة طائرة — مستوى متوسط (مع إدارة حمل النط)', 'Volleyball season — intermediate (jump-load managed)'),
  goal: T('رفع ارتفاع النط والقدرة وسرعة الحركة على الملعب، مع إدارة عدد النطات أسبوعيًا لحماية وتر الرضفة، وحماية كتف الضرب، والحفاظ على المستوى في الموسم.',
    'Raise jump height, power and court quickness while managing weekly jump counts to protect the patellar tendon and the hitting shoulder, then hold performance through the season.'),
  components: ['power', 'max_strength', 'agility', 'reaction', 'technique', 'tactics', 'prevention'],
  sessionsPerWeek: 5,
  periods: [
    {
      type: 'gpp',
      goal: T('إعداد عام: قوة أساسية، تحمل الأوتار، وتكنيك الهبوط، بعدد نطات متدرج', 'General preparation: foundational strength, tendon tolerance and landing technique with progressive jump counts'),
      components: ['strength', 'prevention', 'technique', 'coordination'],
      blocks: [
        {
          name: T('أسبوع ١ — اختبارات', 'Week 1 — Testing'),
          goal: T('CMJ، ارتفاع الضرب والصد، T-test، رمي كرة طبية، وتوازن Y', 'CMJ, spike and block reach, T-test, med-ball throw and Y-balance'),
          components: ['power', 'agility', 'balance'],
          loads: [4], weekTypes: ['test'],
          pattern: ['vb_test', 'vb_skill', '', 'vb_gym_str', 'vb_skill', '', '']
        },
        {
          name: T('بلوك ١ — قاعدة قوة وأوتار', 'Block 1 — Strength & tendon base'),
          goal: T('قوة عامة وتمرين ثابت للوتر، والنطات تزيد تدريجيًا (≤ ١٠٪ في الأسبوع)', 'General strength and isometric tendon work, jump counts rising gradually (up to 10% per week)'),
          components: ['strength', 'prevention', 'technique'],
          loads: [5, 6, 6, 4], weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['vb_gym_str', 'vb_skill', 'vb_cond', '', 'vb_gym_str', 'vb_team', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: T('قوة قصوى وبلايومتريك وسرعة حركة خاصة بالطائرة', 'Max strength, plyometrics and volleyball-specific quickness'),
      components: ['max_strength', 'power', 'agility', 'reaction', 'tactics'],
      blocks: [
        {
          name: T('بلوك ٢ — قوة ونط', 'Block 2 — Strength & jump'),
          goal: T('أعلى حمل نط في الموسم مع يوم نط عالي ويوم منخفض بالتبادل', 'Highest jump load of the season, alternating high and low jump days'),
          components: ['max_strength', 'power', 'agility', 'tactics'],
          loads: [6, 7, 8, 5], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['vb_gym_str', 'vb_skill', 'vb_team', '', 'vb_gym_power', 'vb_cond', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: T('تحويل القوة لقدرة نط وماتشات ودية', 'Convert strength into jump power with friendly matches'),
      components: ['power', 'reaction', 'tactics'],
      blocks: [
        {
          name: T('بلوك ٣ — وديات', 'Block 3 — Friendlies'),
          goal: T('حدة ونط أعلى، وتخفيض عدد النطات قبل أول ماتش', 'Sharpness and higher jumps, reduced jump counts before the first match'),
          components: ['power', 'reaction', 'tactics'],
          loads: [7, 5], weekTypes: ['load', 'taper'],
          pattern: ['vb_recovery', 'vb_gym_power', 'vb_team', 'vb_skill', 'vb_cond', 'vb_prematch', 'vb_match']
        }
      ]
    },
    {
      type: 'comp',
      goal: T('الحفاظ على القوة والنط مع توزيع النطات: عالي MD-3، متوسط MD-2، قليل MD-1', 'Maintain strength and jump with distributed jump load: high MD-3, moderate MD-2, low MD-1'),
      components: ['power', 'strength', 'tactics', 'recovery', 'prevention'],
      blocks: [
        {
          name: T('دوري — المرحلة الأولى', 'League — phase 1'),
          goal: T('دورة أسبوعية ثابتة حول الماتش', 'Stable weekly cycle around the match'),
          components: ['power', 'strength', 'tactics', 'recovery'],
          loads: [6, 7], weekTypes: ['comp', 'comp'],
          pattern: ['vb_recovery', '', 'vb_gym_maint', 'vb_team', 'vb_skill', 'vb_prematch', 'vb_match']
        },
        {
          name: T('أسبوع إعادة اختبار', 'Re-test week'),
          goal: T('CMJ وارتفاع الضرب لمتابعة التعب وحالة الوتر', 'CMJ and spike reach to monitor fatigue and tendon status'),
          components: ['power', 'prevention'],
          loads: [5], weekTypes: ['test'],
          pattern: ['vb_recovery', '', 'vb_test', 'vb_team', 'vb_skill', 'vb_prematch', 'vb_match']
        },
        {
          name: T('دوري — المرحلة الثانية', 'League — phase 2'),
          goal: T('الحفاظ على الحدة وتقليل النطات لو وجع الوتر زاد', 'Keep the edge and cut jumps if tendon pain rises'),
          components: ['power', 'tactics', 'recovery', 'prevention'],
          loads: [6, 5], weekTypes: ['comp', 'comp'],
          pattern: ['vb_recovery', '', 'vb_gym_maint', 'vb_team', 'vb_skill', 'vb_prematch', 'vb_match']
        }
      ]
    },
    {
      type: 'transition',
      goal: T('راحة للأوتار والكتف مع نشاط خفيف', 'Rest for tendons and shoulder with light activity'),
      components: ['recovery', 'aerobic', 'mobility'],
      blocks: [
        {
          name: T('انتقالية', 'Transition'),
          goal: T('نشاط من غير نط وتمرين ثابت للوتر', 'No-jump activity and isometric tendon work'),
          components: ['recovery', 'aerobic', 'prevention'],
          loads: [2, 3], weekTypes: ['deload', 'deload'],
          pattern: ['vb_active', '', '', 'vb_active', '', '', '']
        }
      ]
    }
  ],
  sessions: {
    vb_test: ses(T('يوم اختبارات الطائرة', 'Volleyball testing day'),
      T('تحديد المستوى ومتابعة حالة الأوتار', 'Profile players and monitor tendon status'),
      ['power', 'agility', 'balance'], 7, 90, [
        ...wuCourt(),
        TST.cmj(),
        dr(T('ارتفاع الضرب (اقتراب ٣ خطوات) وارتفاع الصد — فيرتك', 'Spike reach (3-step approach) and block reach — Vertec'), { sets: 1, reps: '3 each', rest: '60s' },
          T('قياس النط الخاص باللعبة', 'Measure sport-specific jump height'), 'power'),
        TST.tdrill(),
        st('ad_medicine_ball_overhead_backward_throw', 1, '3', '10', 'rpe', '90s', T('قياس القدرة الكلية للجسم (رمية ٣ كجم)', 'Total-body power (3kg throw)'), 'power'),
        dr('ad_y_balance_test', { sets: 1, reps: '3/leg', rest: '30s' },
          T('كشف عدم التماثل بين الرجلين (فرق أكتر من ٤سم = خطر إصابة)', 'Screen leg asymmetry (over 4cm difference = injury risk)'), 'balance'),
        dr(T('مقياس ألم وتر الرضفة (VISA-P) وسكوات على بوكس مائل', 'Patellar tendon score (VISA-P) and decline single-leg squat pain'), { sets: 1, reps: '1' },
          T('متابعة حالة الوتر أسبوعيًا', 'Weekly tendon monitoring'), 'prevention'),
        ...cdCourt()
      ]),
    vb_gym_str: ses(T('جيم — قوة ووتر', 'Gym — strength & tendon'),
      T('قوة الرجلين والجذع وتحمل الأوتار', 'Leg and trunk strength and tendon tolerance'),
      ['max_strength', 'strength', 'prevention', 'core'], 7, 75, [
        ...wuGym().slice(0, 3), PH.cuff(),
        st('ex_front_squat', 4, '5', '80', '1rm', '3min', T('قوة الفخذ الأمامي للنط', 'Quad strength for jumping'), 'max_strength', { tempo: '3-0-X-0' }),
        st('ex_romanian_deadlift', 3, '6', '2', 'rir', '2min', T('قوة السلسلة الخلفية', 'Posterior-chain strength'), 'strength', { tempo: '3-0-1-0' }),
        st('ex_bulgarian_split_squat', 3, '6/leg', '2', 'rir', '90s', T('قوة رجل واحدة (رجل الارتقاء)', 'Single-leg strength (take-off leg)'), 'strength'),
        st('ex_pullup', 3, '6-8', '2', 'rir', '90s', T('قوة السحب وتوازن الكتف', 'Pulling strength and shoulder balance'), 'strength'),
        PH.spanish(4),
        PH.heel(),
        PH.ytw(),
        PH.pallof(),
        ...cdGym()
      ]),
    vb_gym_power: ses(T('جيم — قدرة وبلايومتريك', 'Gym — power & plyometrics'),
      T('رفع ارتفاع النط بعدد لمسات محسوب', 'Raise jump height with counted contacts'),
      ['power', 'max_strength', 'prevention'], 7, 70, [
        ...wuGym().slice(0, 3), PH.cuff(),
        st('ad_hang_power_clean', 4, '3', '70', '1rm', '2min 30s', T('إنتاج قوة سريع من الحوض', 'Rapid hip force production'), 'power'),
        st('ad_trap_bar_jump', 4, '4', '20-30', '1rm', '2min', T('نط بحمل خفيف لأعلى قدرة', 'Loaded jumps at the optimal power load'), 'power'),
        st('ex_box_jump', 3, '5', '8', 'rpe', '90s', T('قدرة النط بهبوط خفيف على الوتر', 'Jump power with low landing stress'), 'power', JUMP_NOTE('١٥ لمسة', '15 contacts')),
        st('ad_depth_jump', 3, '4', '9', 'rpe', '2min', T('قوة ارتدادية للنط بعد الاقتراب', 'Reactive strength for the approach jump'), 'power', JUMP_NOTE('بوكس ٣٠سم، ١٢ لمسة', '30cm box, 12 contacts')),
        st('ad_medicine_ball_overhead_backward_throw', 3, '5', '8', 'rpe', '60s', T('قدرة كلية للجسم', 'Total-body power'), 'power'),
        PH.spanish(3),
        mob('ad_open_book', { sets: 1, reps: '8/side', note: T('مجموع لمسات الجيم ٢٧ + نطات الملعب: الهدف ٦٠-٨٠ في اليوم ده', 'Gym contacts 27 + court jumps: target 60-80 total today') })
      ]),
    vb_gym_maint: ses(T('جيم صيانة (موسم)', 'In-season maintenance gym'),
      T('الحفاظ على القوة والقدرة بأقل نطات', 'Keep strength and power with minimal jumps'),
      ['strength', 'power', 'prevention'], 6, 55, [
        ...wuGym().slice(0, 3), PH.cuff(),
        st('ex_front_squat', 3, '3', '85', '1rm', '2min 30s', T('صيانة القوة القصوى', 'Maintain max strength'), 'max_strength'),
        st('ad_trap_bar_jump', 3, '3', '20', '1rm', '90s', T('صيانة القدرة بلمسات قليلة', 'Maintain power with few contacts'), 'power'),
        st('ex_single_leg_rdl', 2, '6/leg', '2', 'rir', '60s', T('توازن وقوة الخلفية', 'Balance and hamstring strength'), 'strength'),
        PH.spanish(4),
        PH.ytw()
      ]),
    vb_skill: ses(T('مهارة — استقبال وإعداد ودفاع (نط قليل)', 'Skill — reception, setting & defence (low jump)'),
      T('مهارات الكرة بدون حمل نط عالي', 'Ball skills without high jump load'),
      ['technique', 'reaction', 'agility'], 5, 90, [
        ...wuCourt(), PH.cuff(),
        dr(T('استقبال إرسال (٣ لاعيبة) على أهداف', 'Serve reception (3-player) to targets'), { sets: 4, reps: '15', rest: '60s' },
          T('دقة الاستقبال للمعد', 'Passing accuracy to the setter'), 'technique'),
        dr(T('إرسال بالقفز العائم ومن الثبات على مناطق', 'Float and standing serves to zones'), { sets: 3, reps: '12', rest: '60s' },
          T('دقة الإرسال', 'Serving accuracy'), 'technique'),
        dr(T('دفاع ملعب وتغطية على ضربات المدرب', 'Court defence and cover vs coach attacks'), { sets: 4, reps: '10', rest: '45s' },
          T('رد الفعل والقراءة الدفاعية', 'Reaction and defensive reading'), 'reaction'),
        rn('ad_split_step_to_lunge_reaction', { sets: 3, reps: '6/side', distance: '3m', intensity: '100', basis: 'vmax', rest: '45s', restType: 'walk', setRest: '90s' },
          T('خطوة أولى سريعة للكرة', 'Fast first step to the ball'), 'reaction'),
        dr(T('إعداد وتوزيع للمعد (بدون ضرب كامل)', 'Setter distribution (no full attacks)'), { sets: 3, reps: '15', rest: '60s' },
          T('دقة الإعداد والتوقيت', 'Setting accuracy and timing'), 'technique', JUMP_NOTE('يوم نط منخفض: أقل من ٦٠ نطة للاعب', 'Low jump day: under 60 jumps per player')),
        ...cdCourt()
      ]),
    vb_team: ses(T('تدريب الفريق — ٦ ضد ٦ (يوم نط عالي)', 'Team practice — 6v6 (high jump day)'),
      T('ضرب وصد وماتشات تجريبية بعدد نطات محسوب', 'Attacking, blocking and scrimmage with counted jumps'),
      ['tactics', 'power', 'technique'], 7, 110, [
        ...wuCourt(), PH.cuff(),
        dr(T('ضرب من المراكز ٤ و٢ و٦ (بايب)', 'Attacking from positions 4, 2 and 6 (pipe)'), { sets: 4, reps: '8', rest: '90s' },
          T('قوة ودقة الضرب', 'Hitting power and accuracy'), 'technique'),
        dr(T('صد جماعي: قراءة وتحرك ٣ خطوات', 'Team blocking: read and 3-step move'), { sets: 3, reps: '8', rest: '90s' },
          T('توقيت الصد وتغطية الشبكة', 'Block timing and net coverage'), 'tactics'),
        dr(T('ماتش ٦ ضد ٦ بنظام الموجات (Wash)', '6v6 wash drill'), { sets: 3, duration: '10min', rest: '3min' },
          T('تطبيق الأنظمة بشدة الماتش', 'Apply systems at match intensity'), 'tactics'),
        dr(T('ماتش تجريبي — ٢ ست', 'Scrimmage — 2 sets'), { sets: 1, duration: '35min' },
          T('ضغط الماتش والتحول بين الهجوم والدفاع', 'Match pressure and attack-defence transitions'), 'tactics',
          JUMP_NOTE('يوم نط عالي: ١٢٠-١٦٠ نطة للاعب، سجلها بجهاز أو بالعدّ', 'High jump day: 120-160 jumps per player, log with a device or by counting')),
        ...cdCourt()
      ]),
    vb_cond: ses(T('لياقة خاصة على الملعب', 'Court-specific conditioning'),
      T('تكرار مجهود قصير وسريع (٥-١٠ ث) زي الرالي', 'Repeated short explosive efforts (5-10s) like rallies'),
      ['anaerobic', 'agility', 'reaction'], 7, 70, [
        ...wuCourt(),
        tm(T('فترات رالي: دفاع وتغطية ٨ ث / راحة ١٦ ث', 'Rally intervals: dig and cover 8s / 16s rest'), 3, '8', '8s', '9', 'rpe', '16s',
          T('تحمل المجهود المتكرر بنسبة رالي حقيقية', 'Repeated-effort endurance at real rally ratios'), 'anaerobic', { setRest: '2min 30s' }),
        rn('dr_cone_t_drill', { sets: 1, reps: '6', distance: '40m', intensity: '95', basis: 'best', rest: '60s', restType: 'walk' },
          T('رشاقة متعددة الاتجاهات', 'Multi-directional agility'), 'agility'),
        dr(T('تحرك صد على الشبكة: ٣ صدات متتالية (يمين، نص، شمال)', 'Block-move-block: 3 consecutive blocks (left, middle, right)'), { sets: 4, reps: '3', rest: '60s' },
          T('سرعة التحرك الجانبي على الشبكة', 'Lateral speed along the net'), 'agility', JUMP_NOTE('١٢ نطة، هبوط على الرجلين', '12 jumps, two-foot landings')),
        rn('ad_ball_drop_sprint', { sets: 1, reps: '6', distance: '5m', intensity: '100', basis: 'vmax', rest: '45s', restType: 'walk' },
          T('رد فعل وانطلاق للكرة', 'React and sprint to the ball'), 'reaction'),
        ...cdCourt()
      ]),
    vb_prematch: ses(T('MD-1 — تنشيط وخطة الماتش (نط قليل)', 'MD-1 — activation & game plan (low jump)'),
      T('تنشيط خفيف ومراجعة الخصم بأقل من ٣٠ نطة', 'Light activation and opponent review with under 30 jumps'),
      ['technique', 'tactics', 'reaction'], 3, 60, [
        ...wuCourt().slice(0, 2), PH.cuff(),
        dr(T('إرسال واستقبال خفيف', 'Light serve and receive'), { sets: 2, reps: '12', rest: '60s' },
          T('إحساس بالكرة', 'Ball feel'), 'technique'),
        dr(T('مراجعة دوران الخصم ومناطق ضربه', 'Review opponent rotations and hitting zones'), { sets: 1, duration: '15min' },
          T('خطة الصد والدفاع', 'Block and defence plan'), 'tactics'),
        dr(T('ضرب بنص قوة (٥ لكل لاعب)', 'Half-power attacks (5 each)'), { sets: 1, reps: '5' },
          T('توقيت بدون حمل', 'Timing without load'), 'technique'),
        breathe('3min')
      ]),
    vb_match: ses(T('يوم الماتش', 'Match day'),
      T('أعلى أداء في الماتش', 'Peak match performance'),
      ['tactics', 'power', 'mental'], 9, 140, [
        ...wuCourt(), PH.cuff(),
        matchItem(T('ماتش رسمي (أحسن ٣ من ٥)', 'Official match (best of 5)'), '90-120min', T('تنفيذ خطة الماتش', 'Execute the game plan'),
          T('البدلاء يفضلوا متحركين ويعملوا نطتين كل ست', 'Substitutes keep moving and do two prep jumps each set')),
        mob(T('تهدئة ومرونة كتف ومشروب استشفاء', 'Cool-down, shoulder mobility and recovery drink'), { duration: '10min' })
      ]),
    vb_recovery: ses(T('MD+1 — استشفاء', 'MD+1 — recovery'),
      T('استشفاء الأوتار والكتف', 'Tendon and shoulder recovery'),
      ['recovery', 'mobility', 'prevention'], 2, 45, [
        wu('ex_stationary_bike', { duration: '5min' }),
        mob(T('عجلة خفيفة أو حمام سباحة', 'Easy bike or pool'), { duration: '15min' }),
        PH.spanish(3),
        mob('ad_sleeper_stretch', { sets: 2, duration: '40s' }),
        mob('ad_90_90_hip_switches', { sets: 2, reps: '6/side' }),
        mob('ex_calf_stretch', { sets: 1, duration: '45s', note: SIDE })
      ]),
    vb_active: ses(T('راحة إيجابية بدون نط', 'No-jump active rest'),
      T('استشفاء وحفاظ على اللياقة وصحة الوتر', 'Recovery, fitness and tendon health'),
      ['recovery', 'aerobic', 'prevention'], 3, 45, [
        wu(T('مشي سريع', 'Brisk walk'), { duration: '5min' }),
        rn(T('عجلة أو سباحة', 'Bike or swim'), { duration: '30min', intensity: 'Z2', basis: 'hr' },
          T('الحفاظ على القاعدة الهوائية بدون صدمات', 'Keep the aerobic base without impact'), 'aerobic'),
        PH.spanish(3),
        PH.cuff(),
        breathe()
      ])
  }
};

/* ================================================================== */
/* 6) Futsal — intermediate season                                     */
/* ================================================================== */
const futsal = {
  id: 'pt_futsal_season_int',
  sport: 'futsal',
  level: 'intermediate',
  title: T('موسم كرة الصالات (خماسي) — مستوى متوسط', 'Futsal season — intermediate'),
  goal: T('رفع القدرة على تكرار السبرنت وتغيير الاتجاه والتحمل المتقطع عالي الشدة، مع قوة وقاية للمقربات والخلفية، والحفاظ عليها في موسم ماتش كل أسبوع.',
    'Develop repeated-sprint ability, change of direction and high-intensity intermittent endurance with preventive adductor and hamstring strength, then maintain them through a weekly-match season.'),
  components: ['speed_endurance', 'agility', 'acceleration', 'vo2max', 'strength', 'technique', 'tactics', 'prevention'],
  sessionsPerWeek: 5,
  periods: [
    {
      type: 'gpp',
      goal: T('إعداد عام: قاعدة هوائية متقطعة وقوة عامة ووقاية', 'General preparation: intermittent aerobic base, general strength and prevention'),
      components: ['aerobic', 'strength', 'prevention', 'technique'],
      blocks: [
        {
          name: T('أسبوع ١ — اختبارات', 'Week 1 — Testing'),
          goal: T('CMJ، عدو ٢٠م، ٥٠٥، يويو IR1', 'CMJ, 20m sprint, 505, Yo-Yo IR1'),
          components: ['power', 'acceleration', 'agility', 'vo2max'],
          loads: [4], weekTypes: ['test'],
          pattern: ['fs_test', 'fs_ssg', '', 'fs_gym_str', 'fs_tactical', '', '']
        },
        {
          name: T('بلوك ١ — قاعدة', 'Block 1 — Base'),
          goal: T('قوة عامة ولياقة بالكرة بحجم متوسط', 'General strength and ball-based fitness at moderate volume'),
          components: ['aerobic', 'strength', 'prevention', 'technique'],
          loads: [5, 6, 4], weekTypes: ['load', 'load', 'deload'],
          pattern: ['fs_gym_str', 'fs_ssg', 'fs_power_speed', '', 'fs_gym_str', 'fs_tactical', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: T('تحمل سرعة وتكرار سبرنت وماتشات مصغرة عالية الشدة', 'Speed endurance, repeated sprints and high-intensity small-sided games'),
      components: ['speed_endurance', 'agility', 'vo2max', 'max_strength'],
      blocks: [
        {
          name: T('بلوك ٢ — لياقة خاصة', 'Block 2 — Specific fitness'),
          goal: T('أعلى حمل في الإعداد', 'Peak preparation load'),
          components: ['speed_endurance', 'agility', 'vo2max', 'max_strength'],
          loads: [6, 7, 8], weekTypes: ['load', 'load', 'shock'],
          pattern: ['fs_gym_str', 'fs_rsa', 'fs_ssg', '', 'fs_power_speed', 'fs_tactical', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: T('قدرة وسرعة ووديات مع تهدئة قبل أول ماتش', 'Power, speed and friendlies, tapering into the first match'),
      components: ['power', 'acceleration', 'tactics'],
      blocks: [
        {
          name: T('بلوك ٣ — وديات', 'Block 3 — Friendlies'),
          goal: T('حدة بدنية وتكتيكية', 'Physical and tactical sharpness'),
          components: ['power', 'acceleration', 'tactics'],
          loads: [7, 5], weekTypes: ['load', 'taper'],
          pattern: ['fs_recovery', 'fs_power_speed', 'fs_rsa', 'fs_ssg', 'fs_tactical', 'fs_prematch', 'fs_match']
        }
      ]
    },
    {
      type: 'comp',
      goal: T('صيانة السرعة والقوة واللياقة بدورة أسبوعية حول الماتش', 'Maintain speed, strength and fitness with a match-week microcycle'),
      components: ['acceleration', 'strength', 'tactics', 'recovery', 'prevention'],
      blocks: [
        {
          name: T('دوري — المرحلة الأولى', 'League — phase 1'),
          goal: T('MD+1 استشفاء، MD-4 قوة وسرعة، MD-3 ماتشات مصغرة، MD-2 تكتيك، MD-1 تنشيط', 'MD+1 recovery, MD-4 strength and speed, MD-3 SSG, MD-2 tactics, MD-1 activation'),
          components: ['acceleration', 'strength', 'tactics', 'recovery'],
          loads: [6, 6, 7, 5], weekTypes: ['comp', 'comp', 'comp', 'comp'],
          pattern: ['fs_recovery', '', 'fs_gym_maint', 'fs_ssg', 'fs_tactical', 'fs_prematch', 'fs_match']
        },
        {
          name: T('أسبوع إعادة اختبار', 'Re-test week'),
          goal: T('CMJ وعدو ويويو لمتابعة الحالة', 'CMJ, sprint and Yo-Yo to monitor status'),
          components: ['power', 'acceleration', 'vo2max'],
          loads: [5], weekTypes: ['test'],
          pattern: ['fs_recovery', '', 'fs_test', 'fs_ssg', 'fs_tactical', 'fs_prematch', 'fs_match']
        },
        {
          name: T('دوري — المرحلة الثانية', 'League — phase 2'),
          goal: T('الحفاظ على الحدة', 'Keep the edge'),
          components: ['acceleration', 'tactics', 'prevention'],
          loads: [6], weekTypes: ['comp'],
          pattern: ['fs_recovery', '', 'fs_gym_maint', 'fs_ssg', 'fs_tactical', 'fs_prematch', 'fs_match']
        }
      ]
    },
    {
      type: 'transition',
      goal: T('راحة إيجابية', 'Active rest'),
      components: ['recovery', 'aerobic'],
      blocks: [
        {
          name: T('انتقالية', 'Transition'),
          goal: T('نشاط خفيف ورياضات تانية', 'Light activity and other sports'),
          components: ['recovery', 'aerobic'],
          loads: [2], weekTypes: ['deload'],
          pattern: ['fs_active', '', '', 'fs_active', '', '', '']
        }
      ]
    }
  ],
  sessions: {
    fs_test: ses(T('يوم اختبارات الخماسي', 'Futsal testing day'),
      T('تحديد المستوى وتقنين الأحمال', 'Profile players and set loads'),
      ['power', 'acceleration', 'agility', 'vo2max'], 8, 90, [
        ...wuCourt(),
        TST.cmj(),
        TST.sprint('20m'),
        TST.cod(),
        TST.yoyo(),
        ...cdCourt()
      ]),
    fs_gym_str: ses(T('جيم — قوة ووقاية', 'Gym — strength & prevention'),
      T('قوة الرجلين والمقربات والخلفية لتحمل الفرملة وتغيير الاتجاه', 'Leg, adductor and hamstring strength to tolerate braking and cutting'),
      ['max_strength', 'strength', 'prevention', 'core'], 7, 70, [
        ...wuGym(),
        st('ex_barbell_back_squat', 4, '5', '80', '1rm', '3min', T('قوة الرجلين للفرملة والانطلاق', 'Leg strength for braking and acceleration'), 'max_strength', { tempo: '3-0-X-0' }),
        st('ex_hip_thrust', 3, '6', '2', 'rir', '2min', T('قوة مد الحوض للانطلاق', 'Hip-extension strength for acceleration'), 'strength'),
        st('ex_lateral_lunge', 3, '6/side', '2', 'rir', '90s', T('قوة جانبية وتحمل المقربات', 'Lateral strength and adductor tolerance'), 'strength'),
        st('ex_one_arm_dumbbell_row', 3, '8/side', '2', 'rir', '60s', T('قوة السحب والجذع', 'Pulling and trunk strength'), 'strength'),
        PH.nordic(3, '5'),
        PH.cph(3, '25s/side'),
        PH.ankle(),
        ...cdGym()
      ]),
    fs_gym_maint: ses(T('MD-4 — جيم صيانة + تسارع', 'MD-4 — maintenance gym + acceleration'),
      T('صيانة القوة والتسارع بأقل تعب', 'Maintain strength and acceleration with minimal fatigue'),
      ['strength', 'acceleration', 'prevention'], 6, 70, [
        ...wuGym().slice(0, 3),
        st('ex_barbell_back_squat', 3, '3', '85', '1rm', '2min 30s', T('صيانة القوة القصوى', 'Maintain max strength'), 'max_strength'),
        st('wg_jump_squat', 3, '4', '8', 'rpe', '90s', T('صيانة القدرة', 'Maintain power'), 'power'),
        PH.nordic(2, '4'),
        PH.cph(2, '20s/side'),
        rn('dr_sprint_accel', { sets: 1, reps: '6', distance: '10m', intensity: '100', basis: 'vmax', rest: '60s', restType: 'walk' },
          T('تسارع قصير زي أبعاد الملعب', 'Short accelerations matching court dimensions'), 'acceleration'),
        rn('ad_shuffle_to_sprint', { sets: 1, reps: '6', distance: '3m + 10m', intensity: '100', basis: 'vmax', rest: '60s', restType: 'walk' },
          T('انطلاق من الوقفة الدفاعية', 'Sprint from defensive stance'), 'agility'),
        ...cdCourt().slice(0, 2)
      ]),
    fs_power_speed: ses(T('قدرة وسرعة وتغيير اتجاه', 'Power, speed & change of direction'),
      T('رفع التسارع وتغيير الاتجاه والقوة الارتدادية', 'Develop acceleration, cutting and reactive strength'),
      ['acceleration', 'agility', 'power', 'reaction'], 7, 75, [
        ...wuCourt(),
        st('ad_depth_jump', 3, '5', '9', 'rpe', '2min', T('قوة ارتدادية سريعة', 'Fast reactive strength'), 'power', { note: T('بوكس ٣٠سم، ١٥ لمسة', '30cm box, 15 contacts') }),
        st('ad_lateral_bound_and_stick', 3, '4/side', '8', 'rpe', '90s', T('قدرة جانبية وهبوط ثابت', 'Lateral power and stable landing'), 'power', { note: T('٢٤ لمسة', '24 contacts') }),
        rn('dr_sprint_accel', { sets: 2, reps: '4', distance: '15m', intensity: '100', basis: 'vmax', rest: '75s', restType: 'walk', setRest: '3min' },
          T('تسارع أقصى', 'Maximal acceleration'), 'acceleration'),
        rn('dr_cone_5_10_5', { sets: 1, reps: '6', distance: '20m', intensity: '95', basis: 'best', rest: '90s', restType: 'walk' },
          T('فرملة وتغيير اتجاه ١٨٠ درجة', 'Braking and 180-degree cuts'), 'agility'),
        dr(T('١ ضد ١ برد فعل على المدافع في قناة ١٠×٥م', 'Reactive 1v1 vs a defender in a 10x5m channel'), { sets: 3, reps: '5', rest: '45s' },
          T('رشاقة برد فعل بالكرة', 'Reactive agility with the ball'), 'agility'),
        ...cdCourt()
      ]),
    fs_ssg: ses(T('ماتشات مصغرة عالية الشدة', 'High-intensity small-sided games'),
      T('لياقة متقطعة خاصة بالخماسي مع القرار السريع', 'Futsal-specific intermittent fitness with fast decisions'),
      ['vo2max', 'anaerobic', 'technique', 'tactics'], 8, 85, [
        ...wuCourt().slice(0, 3),
        wu(T('روندو ٤ ضد ١ في مربع ٨×٨م (لمستين)', 'Rondo 4v1 in an 8x8m box (two-touch)'), { sets: 2, duration: '3min' }),
        tm(T('ماتش ٢ ضد ٢ + ٢ جوكر — ملعب ٢٠×١٥م', '2v2 + 2 floaters — 20x15m'), 6, undefined, '90s', '9', 'rpe', '90s',
          T('أعلى شدة وتسارع وتغيير اتجاه', 'Maximum intensity, accelerations and cuts'), 'anaerobic'),
        tm(T('ماتش ٣ ضد ٣ + حراس — ملعب ٢٠×٢٠م', '3v3 + GKs — 20x20m'), 4, undefined, '3min', '8', 'rpe', '2min',
          T('لياقة متقطعة عالية الشدة', 'High-intensity intermittent fitness'), 'vo2max'),
        tm(T('ماتش ٤ ضد ٤ + حراس — ملعب كامل (٤٠×٢٠م)', '4v4 + GKs — full court (40x20m)'), 3, undefined, '5min', '8', 'rpe', '2min',
          T('شدة الماتش وتطبيق الخطط', 'Match intensity and system execution'), 'tactics',
          { note: T('تغيير اللاعيبة كل ٢-٣ دقايق زي الماتش', 'Rolling subs every 2-3min like the match') }),
        ...cdCourt()
      ]),
    fs_rsa: ses(T('تكرار سبرنت وتحمل سرعة', 'Repeated sprints & speed endurance'),
      T('القدرة على تكرار السبرنت بتغيير اتجاه والاستشفاء السريع', 'Repeat sprints with cuts and recover fast'),
      ['speed_endurance', 'anaerobic', 'agility'], 8, 75, [
        ...wuCourt(),
        rn(T('تكرار سبرنت ٦ × (١٠م + ١٠م) بلفة — انطلاقة كل ٢٠ ث', 'Repeated shuttle sprints 6 x (10m + 10m) — depart every 20s'), { sets: 3, reps: '6', distance: '20m', intensity: '100', basis: 'vmax', rest: '20s', restType: 'passive', setRest: '4min' },
          T('تكرار السبرنت بتغيير اتجاه زي الماتش', 'Repeated sprints with a turn like match play'), 'speed_endurance',
          { note: T('الهدف انخفاض أقل من ٥٪ بين أحسن وأوحش تكرار', 'Target under 5% decrement best vs worst rep') }),
        rn(T('فترات ١٥ ث / ١٥ ث عند ٩٥٪ من VIFT (مكوكي)', '15s/15s shuttle intervals at 95% VIFT'), { sets: 2, reps: '8', duration: '15s', intensity: '9', basis: 'rpe', rest: '15s', restType: 'passive', setRest: '3min' },
          T('وقت أطول عند نبض قريب من الأقصى', 'More time near maximal heart rate'), 'vo2max'),
        dr(T('هجمات مرتدة ٢ ضد ١ و٣ ضد ٢', '2v1 and 3v2 counter-attacks'), { sets: 3, reps: '6', rest: '45s' },
          T('التحولات السريعة والإنهاء', 'Quick transitions and finishing'), 'tactics'),
        PH.squeeze(),
        ...cdCourt()
      ]),
    fs_tactical: ses(T('تكتيك — أنظمة اللعب والكور الثابتة', 'Tactics — systems of play & set pieces'),
      T('تنظيم ٣-١ و٤-٠، الضغط، والكور الثابتة', 'Organise 3-1 and 4-0 rotations, pressing and set pieces'),
      ['tactics', 'technique'], 5, 75, [
        ...wuCourt().slice(0, 3),
        dr(T('دوران ٣-١ و٤-٠ ضد دفاع متقدم', '3-1 and 4-0 rotations vs a high press'), { sets: 3, duration: '8min', rest: '2min' },
          T('تحركات الهجوم المنظم', 'Structured attacking movements'), 'tactics'),
        dr(T('الحارس الطائر (٥ ضد ٤) والدفاع ضده', 'Fly goalkeeper (5v4) and defending it'), { sets: 2, duration: '8min', rest: '2min' },
          T('مواقف الزيادة والنقص العددي', 'Overload and underload situations'), 'tactics'),
        dr(T('كور ثابتة: ركنيات وتماس وضربات حرة', 'Set pieces: corners, kick-ins and free kicks'), { sets: 1, duration: '12min' },
          T('تنظيم الكور الثابتة', 'Set-piece organisation'), 'tactics'),
        ...cdCourt()
      ]),
    fs_prematch: ses(T('MD-1 — تنشيط', 'MD-1 — activation'),
      T('تنشيط خفيف وثقة قبل الماتش', 'Light activation and confidence before the match'),
      ['speed', 'tactics', 'technique'], 3, 45, [
        ...wuCourt().slice(0, 2),
        rn('ad_reaction_start_sprint', { sets: 1, reps: '5', distance: '5m', intensity: '100', basis: 'vmax', rest: '45s', restType: 'walk' },
          T('تنشيط عصبي', 'Neural activation'), 'reaction'),
        dr(T('روندو وتمرير سريع', 'Rondos and quick passing'), { sets: 2, duration: '5min', rest: '60s' },
          T('إحساس بالكرة', 'Ball feel'), 'technique'),
        dr(T('مراجعة الكور الثابتة', 'Set-piece review'), { sets: 1, duration: '12min' },
          T('تثبيت الحركات', 'Rehearse routines'), 'tactics'),
        breathe('3min')
      ]),
    fs_match: ses(T('يوم الماتش', 'Match day'),
      T('أعلى أداء في الماتش', 'Peak match performance'),
      ['tactics', 'speed_endurance', 'mental'], 9, 110, [
        ...wuCourt(),
        matchItem(T('ماتش رسمي', 'Official match'), '2 x 20min', T('تنفيذ خطة الماتش', 'Execute the game plan'),
          T('وقت فعلي، التغيير كل ٣-٦ دقايق للحفاظ على الشدة', 'Stopped-clock time, rotate every 3-6min to keep intensity')),
        mob(T('تهدئة ومشروب استشفاء', 'Cool-down and recovery drink'), { duration: '10min' })
      ]),
    fs_recovery: ses(T('MD+1 — استشفاء وتعويض', 'MD+1 — recovery & top-up'),
      T('استشفاء للأساسيين وتعويض للبدلاء', 'Recovery for starters, top-up for substitutes'),
      ['recovery', 'mobility', 'speed_endurance'], 3, 50, [
        wu('ex_stationary_bike', { duration: '5min' }),
        mob(T('أساسيين: عجلة خفيفة أو حمام سباحة', 'Starters: easy bike or pool'), { duration: '15min' }),
        mob('ad_90_90_hip_switches', { sets: 2, reps: '6/side' }),
        mob('ex_adductor_stretch', { sets: 1, duration: '45s' }),
        tm(T('بدلاء: ماتش ٢ ضد ٢ — ٢٠×١٥م', 'Substitutes: 2v2 — 20x15m'), 5, undefined, '90s', '9', 'rpe', '90s',
          T('تعويض الحمل الأيضي', 'Replace the metabolic load'), 'anaerobic'),
        rn(T('بدلاء: سبرنت ٢٠م', 'Substitutes: 20m sprints'), { sets: 1, reps: '6', distance: '20m', intensity: '100', basis: 'vmax', rest: '45s', restType: 'walk' },
          T('تعويض التعرض للسرعة', 'Replace sprint exposure'), 'acceleration')
      ]),
    fs_active: ses(T('راحة إيجابية', 'Active rest'),
      T('استشفاء وحفاظ على اللياقة', 'Recovery and fitness maintenance'),
      ['recovery', 'aerobic', 'prevention'], 3, 45, [
        wu(T('مشي سريع', 'Brisk walk'), { duration: '5min' }),
        rn(T('جري خفيف أو عجلة أو سباحة', 'Easy run, bike or swim'), { duration: '30min', intensity: 'Z2', basis: 'hr' },
          T('الحفاظ على القاعدة الهوائية', 'Keep the aerobic base'), 'aerobic'),
        PH.nordic(2, '5'),
        PH.cph(2, '20s/side'),
        breathe()
      ])
  }
};

/* ================================================================== */
/* 7) Rugby — advanced pre-season (collision, power, repeated effort)  */
/* ================================================================== */
const rugby = {
  id: 'pt_rugby_preseason_adv',
  sport: 'rugby',
  level: 'advanced',
  title: T('إعداد رجبي — مستوى متقدم (التحام، قدرة، تكرار مجهود)', 'Rugby pre-season — advanced (collision, power, repeated effort)'),
  goal: T('تجهيز الجسم للالتحامات (كتلة عضلية وقوة ورقبة قوية)، رفع القدرة والسرعة، وبناء القدرة على تكرار المجهود عالي الشدة (سبرنت + التحام + قيام من الأرض) للوصول لأول ماتش جاهز.',
    'Prepare the body for collisions (muscle mass, strength, a strong neck), develop power and speed, and build repeated high-intensity effort ability (sprint + contact + get-up) to be ready for the first fixture.'),
  components: ['hypertrophy', 'max_strength', 'power', 'acceleration', 'speed_endurance', 'anaerobic', 'tactics', 'prevention'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'gpp',
      goal: T('إعداد عام: تضخيم وقوة أساسية وقاعدة هوائية وتكنيك الالتحام الآمن', 'General preparation: hypertrophy, foundational strength, aerobic base and safe contact technique'),
      components: ['hypertrophy', 'strength', 'aerobic', 'technique', 'prevention'],
      blocks: [
        {
          name: T('أسبوع ١ — اختبارات', 'Week 1 — Testing'),
          goal: T('CMJ، عدو ١٠/٤٠م، 3RM سكوات وبنش وعقلة، ٣٠-١٥ IFT، وتكوين الجسم', 'CMJ, 10/40m sprint, 3RM squat, bench and chin-up, 30-15 IFT and body composition'),
          components: ['power', 'max_strength', 'acceleration', 'vo2max'],
          loads: [5], weekTypes: ['test'],
          pattern: ['rg_test', 'rg_aero', '', 'rg_gym_hyp', 'rg_team', 'rg_gym_hyp', '']
        },
        {
          name: T('بلوك ١ — تضخيم وقاعدة', 'Block 1 — Hypertrophy & base'),
          goal: T('زيادة الكتلة العضلية والقاعدة الهوائية وتكنيك الالتحام بشدة متدرجة', 'Increase muscle mass and aerobic base, contact technique at graded intensity'),
          components: ['hypertrophy', 'aerobic', 'technique', 'prevention'],
          loads: [6, 7, 8, 5], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['rg_gym_hyp', 'rg_speed', 'rg_aero', 'rg_contact', 'rg_gym_hyp', 'rg_team', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: T('قوة قصوى، التحام كامل، وتكرار المجهود (RHIE)', 'Maximal strength, full contact and repeated high-intensity efforts (RHIE)'),
      components: ['max_strength', 'speed_endurance', 'anaerobic', 'tactics', 'prevention'],
      blocks: [
        {
          name: T('بلوك ٢ — قوة وتكرار مجهود', 'Block 2 — Strength & repeated effort'),
          goal: T('أعلى حمل في الإعداد: قوة ٨٥-٩٠٪ ومجموعات RHIE والتحام كامل', 'Peak pre-season load: 85-90% strength, RHIE sets and full contact'),
          components: ['max_strength', 'speed_endurance', 'anaerobic', 'tactics'],
          loads: [7, 8, 9, 5], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['rg_gym_str', 'rg_speed', 'rg_rhie', '', 'rg_gym_str', 'rg_contact', 'rg_team']
        }
      ]
    },
    {
      type: 'precomp',
      goal: T('تحويل القوة لقدرة، وماتشات تجريبية بدقايق متزايدة', 'Convert strength to power, with trial matches of rising minutes'),
      components: ['power', 'max_velocity', 'speed_endurance', 'tactics'],
      blocks: [
        {
          name: T('بلوك ٣ — قدرة وماتشات تجريبية', 'Block 3 — Power & trial matches'),
          goal: T('قدرة وسرعة قصوى وتطبيق خطط اللعب، والأسبوع الأخير تهدئة', 'Power, top speed and game-plan execution, final week tapers'),
          components: ['power', 'max_velocity', 'tactics', 'speed_endurance'],
          loads: [8, 7, 5], weekTypes: ['load', 'load', 'taper'],
          pattern: ['rg_recovery', 'rg_gym_power', 'rg_rhie', 'rg_team', 'rg_speed', 'rg_captains', 'rg_match']
        }
      ]
    },
    {
      type: 'comp',
      goal: T('دخول الموسم بدورة أسبوعية: MD+1 استشفاء، MD-5 جيم قدرة، MD-4 يوم الالتحام، MD-2 تدريب فريق وسرعة، MD-1 كابتنز رن', 'Enter the season with a weekly cycle: MD+1 recovery, MD-5 power gym, MD-4 contact day, MD-2 team run and speed, MD-1 captain\'s run'),
      components: ['power', 'strength', 'tactics', 'recovery', 'prevention'],
      blocks: [
        {
          name: T('أول أسبوعين في الموسم', 'First two weeks of the season'),
          goal: T('الحفاظ على القوة والقدرة والاستشفاء الكامل بين الماتشات', 'Maintain strength and power with full recovery between matches'),
          components: ['power', 'strength', 'tactics', 'recovery'],
          loads: [6, 6], weekTypes: ['comp', 'comp'],
          pattern: ['rg_recovery', 'rg_gym_power', 'rg_contact', '', 'rg_team', 'rg_captains', 'rg_match']
        }
      ]
    }
  ],
  sessions: {
    rg_test: ses(T('يوم اختبارات الرجبي', 'Rugby testing day'),
      T('تحديد المستوى وتقنين الأحمال والسرعات', 'Profile players and set loads and running targets'),
      ['power', 'max_strength', 'acceleration', 'vo2max'], 8, 150, [
        ...wuPitch(),
        TST.cmj(),
        rn(T('اختبار عدو ٤٠م (زمن ١٠م و٤٠م)', '40m sprint test (10m and 40m splits)'), { sets: 1, reps: '3', distance: '40m', rest: '3min', restType: 'walk' },
          T('قياس التسارع والسرعة القصوى', 'Measure acceleration and top speed'), 'acceleration'),
        TST.strength('ex_barbell_back_squat', '3RM'),
        TST.strength('ex_barbell_bench_press', '3RM'),
        TST.strength('wg_weighted_pull_up', '3RM', 'strength'),
        TST.ift(),
        dr(T('الوزن ونسبة الدهون (مجموع ٧ ثنيات جلد)', 'Body mass and skinfolds (sum of 7)'), { sets: 1, reps: '1' },
          T('متابعة الكتلة العضلية وتكوين الجسم للالتحام', 'Track lean mass and body composition for contact'), 'hypertrophy',
          { note: T('القوة الصبح، و٣٠-١٥ بعد الضهر', 'Strength tests in the morning, 30-15 IFT in the afternoon') }),
        ...cdPitch().slice(0, 2)
      ]),
    rg_gym_hyp: ses(T('جيم — تضخيم وقوة عامة', 'Gym — hypertrophy & general strength'),
      T('زيادة الكتلة العضلية اللي تحمي في الالتحام', 'Build protective muscle mass for collisions'),
      ['hypertrophy', 'strength', 'prevention'], 7, 80, [
        ...wuGym().slice(0, 3),
        st('ex_barbell_back_squat', 4, '8', '70', '1rm', '2min 30s', T('تضخيم وقوة الرجلين', 'Leg hypertrophy and strength'), 'hypertrophy', { tempo: '3-1-1-0' }),
        st('ex_barbell_bench_press', 4, '8', '70', '1rm', '2min', T('تضخيم الصدر والكتف والترايسبس', 'Chest, shoulder and triceps hypertrophy'), 'hypertrophy', { tempo: '3-0-1-0' }),
        st('ex_romanian_deadlift', 3, '10', '2', 'rir', '2min', T('تضخيم وقوة السلسلة الخلفية', 'Posterior-chain hypertrophy and strength'), 'hypertrophy', { tempo: '3-0-1-0' }),
        st('ex_chinup', 4, '8', '2', 'rir', '90s', T('تضخيم الضهر والبايسبس', 'Back and biceps hypertrophy'), 'hypertrophy'),
        st('ex_dumbbell_shoulder_press', 3, '10', '2', 'rir', '90s', T('تضخيم الكتف وثباته', 'Shoulder hypertrophy and stability'), 'hypertrophy'),
        st('ad_sandbag_bear_hug_carry', 3, '30m', '8', 'rpe', '90s', T('قوة الجذع والقبضة في الالتحام (الرك والمول)', 'Trunk and grip strength for rucks and mauls'), 'strength'),
        PH.neck(),
        PH.nordic(3, '5'),
        ...cdGym()
      ]),
    rg_gym_str: ses(T('جيم — قوة قصوى', 'Gym — maximal strength'),
      T('رفع القوة القصوى لكسب الالتحام والإسكرام', 'Raise maximal strength to win collisions and scrums'),
      ['max_strength', 'strength', 'prevention'], 8, 80, [
        ...wuGym().slice(0, 3),
        st('ex_barbell_back_squat', 5, '3', '87.5', '1rm', '3min', T('قوة قصوى للرجلين', 'Maximal leg strength'), 'max_strength', { tempo: '2-0-X-0' }),
        st('ex_barbell_bench_press', 5, '3', '87.5', '1rm', '3min', T('قوة قصوى للدفع', 'Maximal pushing strength'), 'max_strength'),
        st('wg_weighted_pull_up', 4, '4', '8', 'rpe', '2min 30s', T('قوة السحب القصوى', 'Maximal pulling strength'), 'max_strength'),
        st('ex_hip_thrust', 3, '6', '2', 'rir', '2min', T('قوة مد الحوض للدفع في الالتحام', 'Hip-extension strength for leg drive in contact'), 'strength'),
        st('ek_hack_squat_machine', 2, '8', '2', 'rir', '90s', T('حجم إضافي للفخذ الأمامي بأمان', 'Extra quad volume safely'), 'hypertrophy'),
        PH.neck(),
        PH.nordic(3, '5'),
        PH.cph(2, '25s/side'),
        ...cdGym()
      ]),
    rg_gym_power: ses(T('جيم — قدرة', 'Gym — power'),
      T('تحويل القوة لقدرة انفجارية للانطلاق والالتحام', 'Convert strength into explosive power for sprinting and contact'),
      ['power', 'max_strength', 'prevention'], 7, 70, [
        ...wuGym(),
        st('ad_power_clean', 5, '2', '80', '1rm', '2min 30s', T('معدل تطور القوة من الحوض', 'Rate of force development from the hips'), 'power'),
        st('ad_trap_bar_deadlift_to_broad_jump_contrast', 4, '3 + 3', '85', '1rm', '3min', T('تباين ثقيل/سريع للقدرة الأفقية', 'Heavy/fast contrast for horizontal power'), 'power',
          { note: T('٣ ديدليفت عند ٨٥٪ ثم ٣ وثب طويل بعد ٢٠-٣٠ ث', '3 deadlifts at 85% then 3 broad jumps after 20-30s') }),
        st('ad_bench_press_to_plyo_push_up_contrast', 4, '3 + 4', '85', '1rm', '3min', T('قدرة الدفع لكسب الالتحام (هاند أوف)', 'Pushing power for contact and fends'), 'power'),
        st('ad_medicine_ball_rotational_throw', 3, '5/side', '8', 'rpe', '60s', T('قدرة دورانية للتمرير والالتحام', 'Rotational power for passing and contact'), 'power'),
        PH.neck(),
        PH.nordic(2, '4'),
        ...cdGym()
      ]),
    rg_speed: ses(T('سرعة — تسارع وسرعة قصوى', 'Speed — acceleration & max velocity'),
      T('رفع التسارع والسرعة القصوى وحماية الخلفية', 'Develop acceleration and top speed, protecting the hamstrings'),
      ['acceleration', 'max_velocity', 'agility', 'prevention'], 7, 75, [
        ...wuPitch(),
        rn('dr_sprint_accel', { sets: 2, reps: '4', distance: '20m', intensity: '95-100', basis: 'vmax', rest: '2min', restType: 'walk', setRest: '4min' },
          T('تسارع من أوضاع مختلفة (واقف، على الأرض، بعد التحام)', 'Acceleration from varied starts (standing, from the ground, after contact)'), 'acceleration'),
        rn('ad_sled_resisted_sprint', { sets: 1, reps: '6', distance: '20m', intensity: '9', basis: 'rpe', rest: '2min', restType: 'walk' },
          T('قوة الدفع الأفقي', 'Horizontal force production'), 'acceleration',
          { note: T('فورواردز: حمل يقلل السرعة ٣٠-٤٠٪، باكس: ١٠-٢٠٪', 'Forwards: load that slows velocity 30-40%, backs: 10-20%') }),
        rn('ad_flying_sprint', { sets: 1, reps: '4', distance: '30m build + 20m fly', intensity: '95-100', basis: 'vmax', rest: '3min', restType: 'walk' },
          T('التعرض للسرعة القصوى (الباكس بالأخص)', 'Max-velocity exposure (especially backs)'), 'max_velocity'),
        rn('dr_cone_5_10_5', { sets: 1, reps: '6', distance: '20m', intensity: '95', basis: 'best', rest: '90s', restType: 'walk' },
          T('خطوة جانبية وتغيير اتجاه لكسر خط الدفاع', 'Side-step and cutting to break the line'), 'agility'),
        PH.nordic(2, '4'),
        ...cdPitch()
      ]),
    rg_aero: ses(T('لياقة هوائية — فترات بسرعة MAS وتيمبو', 'Aerobic conditioning — MAS intervals & tempo'),
      T('رفع القاعدة الهوائية لتسريع الاستشفاء بين المجهودات', 'Raise the aerobic base to recover faster between efforts'),
      ['aerobic', 'vo2max', 'recovery'], 6, 60, [
        ...wuPitch().slice(0, 3),
        rn(T('فترات ١٥ ث / ١٥ ث عند ١٢٠٪ من MAS', '15s/15s intervals at 120% MAS'), { sets: 3, reps: '8', duration: '15s', intensity: '8', basis: 'rpe', rest: '15s', restType: 'walk', setRest: '3min' },
          T('رفع VO2max بتحكم في مسافة كل لاعب', 'Raise VO2max with individual distances'), 'vo2max',
          { note: T('المسافة لكل ١٥ ث = ١٢٠٪ × MAS (من ٣٠-١٥ IFT)', 'Distance per 15s = 120% x MAS (from the 30-15 IFT)') }),
        rn('dr_tempo_run', { sets: 1, reps: '10', distance: '100m', intensity: '70', basis: 'vmax', rest: '45s', restType: 'walk' },
          T('تيمبو ممتد لكفاءة الاستشفاء', 'Extensive tempo for recovery efficiency'), 'aerobic'),
        rn('wg_assault_bike', { sets: 4, duration: '3min', intensity: 'Z3-Z4', basis: 'hr', rest: '2min', restType: 'active' },
          T('حجم هوائي إضافي بدون صدمات (للفورواردز التقال)', 'Extra aerobic volume without impact (heavier forwards)'), 'aerobic'),
        ...cdPitch()
      ]),
    rg_contact: ses(T('يوم الالتحام — تكنيك ومصارعة وقوة التحام', 'Contact day — technique, wrestle & collision strength'),
      T('التحام آمن وفعّال (تاكل، كلين أوت، مصارعة)', 'Safe, effective contact (tackle, clean-out, wrestle)'),
      ['technique', 'strength', 'prevention', 'anaerobic'], 8, 80, [
        ...wuPitch().slice(0, 3),
        wu(T('تنشيط الرقبة والكتف: ضغط ثابت في كل الاتجاهات', 'Neck and shoulder activation: isometric presses in all directions'), { sets: 1, duration: '3min' }),
        dr(T('تدرج التاكل: ركبة ← مشي ← جري نص ← سرعة كاملة', 'Tackle progression: kneeling, walking, half pace, full speed'), { sets: 4, reps: '5/side', rest: '60s' },
          T('تكنيك التاكل الآمن (الراس ورا، الكتف، رجلين تشتغل)', 'Safe tackle technique (head behind, shoulder, leg drive)'), 'technique',
          { note: T('راس المدافع دايمًا على جنب المهاجم مش قدامه', 'Tackler\'s head always to the side of the ball carrier, never in front') }),
        tm(T('مصارعة ١ ضد ١ على الوضع (أرض ووقوف)', '1v1 wrestle for position (ground and standing)'), 3, '4', '10s', '9', 'rpe', '30s',
          T('قوة التحام وتحكم في الجسم', 'Contact strength and body control'), 'strength', { setRest: '2min' }),
        dr(T('كلين أوت ورك: دخول منخفض ودفع', 'Ruck clean-outs: low entry and drive'), { sets: 3, reps: '6', rest: '60s' },
          T('كسب الكورة في الرك', 'Win ruck possession'), 'technique'),
        tm(T('لياقة التحام: شيلد + قيام من الأرض + تاكل', 'Contact conditioning: hit shield + get-up + tackle'), 3, '5', '20s', '9', 'rpe', '40s',
          T('تكرار الالتحام تحت تعب', 'Repeated contact under fatigue'), 'anaerobic', { setRest: '3min' }),
        PH.neck(),
        ...cdPitch().slice(0, 2)
      ]),
    rg_rhie: ses(T('تكرار المجهود عالي الشدة (RHIE)', 'Repeated high-intensity efforts (RHIE)'),
      T('القدرة على سبرنت والتحام وقيام متكرر زي مواقف الماتش الحاسمة', 'Ability to repeat sprint, contact and get-up like decisive match passages'),
      ['speed_endurance', 'anaerobic', 'vo2max', 'tactics'], 9, 80, [
        ...wuPitch(),
        rn(T('RHIE: سبرنت ٢٠م + نزول وقيام + ضرب شيلد — كل ٢٠ ث', 'RHIE: 20m sprint + down-up + shield hit — every 20s'), { sets: 3, reps: '6', distance: '20m', intensity: '100', basis: 'vmax', rest: '20s', restType: 'walk', setRest: '3min' },
          T('محاكاة أصعب فترات الماتش', 'Replicate worst-case match passages'), 'speed_endurance'),
        rn(T('تكرار سبرنت ٦ × ٤٠م — كل ٣٠ ث (باكس)', 'Repeated sprints 6 x 40m — every 30s (backs)'), { sets: 2, reps: '6', distance: '40m', intensity: '100', basis: 'vmax', rest: '30s', restType: 'walk', setRest: '4min' },
          T('تحمل السرعة للاعيبة الخط الخلفي', 'Speed endurance for backs'), 'speed_endurance',
          { note: T('الفورواردز: ٦ × ٢٠م + ٦ ضربات شيلد', 'Forwards: 6 x 20m + 6 shield hits') }),
        tm(T('تاتش رجبي ٧ ضد ٧ — ملعب ٥٠×٤٠م', 'Touch rugby 7v7 — 50x40m'), 3, undefined, '5min', '8', 'rpe', '2min',
          T('لياقة بالكورة وقرار تحت تعب', 'Ball-based conditioning and decisions under fatigue'), 'tactics'),
        ...cdPitch()
      ]),
    rg_team: ses(T('تدريب الفريق — وحدات وخطط', 'Team training — units & patterns'),
      T('تنظيم الإسكرام واللاين أوت وخطط الهجوم والدفاع', 'Organise scrum, lineout and attack/defence patterns'),
      ['tactics', 'technique', 'aerobic'], 6, 90, [
        ...wuPitch(),
        dr(T('فورواردز: إسكرام على الماكينة ثم لايف', 'Forwards: machine scrums then live'), { sets: 4, reps: '4', rest: '90s' },
          T('ثبات وقوة الإسكرام', 'Scrum stability and power'), 'technique', { note: T('الرقبة والضهر في وضع محايد، وقف فورًا لو في ألم', 'Neutral neck and spine, stop at any pain') }),
        dr(T('لاين أوت: رمي ورفع ومول', 'Lineout: throw, lift and maul'), { sets: 3, reps: '6', rest: '60s' },
          T('كسب الكرة الثابتة', 'Win set-piece ball'), 'technique'),
        dr(T('باكس: خطط هجوم من الإسكرام واللاين أوت', 'Backs: strike moves from scrum and lineout'), { sets: 3, duration: '8min', rest: '2min' },
          T('تنفيذ خطط الهجوم', 'Execute attacking moves'), 'tactics'),
        dr(T('هجوم ضد دفاع ١٥ ضد ١٥ (لمس ثم التحام محدود)', '15v15 attack vs defence (touch then limited contact)'), { sets: 3, duration: '6min', rest: '2min' },
          T('خط الدفاع والتواصل والهجوم المنظم', 'Defensive line speed, communication and structured attack'), 'tactics'),
        ...cdPitch()
      ]),
    rg_captains: ses(T('MD-1 — كابتنز رن', 'MD-1 — captain\'s run'),
      T('مراجعة سريعة وتنشيط قبل الماتش', 'Quick review and activation before the match'),
      ['tactics', 'speed', 'mental'], 3, 40, [
        ...wuPitch().slice(0, 3),
        dr(T('لاين أوت وخطط هجوم (مشي وسرعة نص)', 'Lineout calls and strike moves (walk to half pace)'), { sets: 1, duration: '15min' },
          T('تثبيت الخطط', 'Rehearse plays'), 'tactics'),
        rn('ad_reaction_start_sprint', { sets: 1, reps: '4', distance: '10m', intensity: '100', basis: 'vmax', rest: '60s', restType: 'walk' },
          T('تنشيط عصبي', 'Neural activation'), 'reaction'),
        breathe('3min')
      ]),
    rg_match: ses(T('ماتش (تجريبي أو رسمي)', 'Match (trial or official)'),
      T('أعلى أداء ودقايق لعب متزايدة', 'Peak performance and rising match minutes'),
      ['tactics', 'anaerobic', 'mental'], 9, 120, [
        ...wuPitch(),
        wu(T('التحامات تحضيرية خفيفة وتنشيط رقبة', 'Light contact primers and neck activation'), { duration: '5min' }),
        matchItem(T('ماتش رجبي', 'Rugby match'), '2 x 40min', T('تنفيذ خطة اللعب', 'Execute the game plan'),
          T('الماتشات التجريبية: ٤٠ ← ٦٠ دقيقة للأساسيين', 'Trial matches: 40 then 60 minutes for starters')),
        mob(T('تهدئة وثلج للكدمات ومشروب استشفاء (بروتين وكربوهيدرات)', 'Cool-down, ice for knocks and recovery drink (protein and carbohydrate)'), { duration: '15min' })
      ]),
    rg_recovery: ses(T('MD+1 — استشفاء', 'MD+1 — recovery'),
      T('استشفاء من الالتحامات وتعويض للبدلاء', 'Recover from collisions and top up non-starters'),
      ['recovery', 'mobility', 'anaerobic'], 3, 60, [
        wu('ex_stationary_bike', { duration: '5min' }),
        mob(T('أساسيين: حمام سباحة ومشي في المية', 'Starters: pool session and water walking'), { duration: '20min' }),
        mob('ad_neck_cars', { sets: 2, reps: '5/direction' }),
        mob('ad_90_90_hip_switches', { sets: 2, reps: '6/side' }),
        mob('ad_foam_roller_thoracic_extension', { sets: 1, duration: '2min' }),
        rn(T('بدلاء: RHIE مختصر', 'Non-starters: short RHIE block'), { sets: 2, reps: '5', distance: '20m', intensity: '100', basis: 'vmax', rest: '20s', restType: 'walk', setRest: '3min' },
          T('تعويض حمل الماتش', 'Replace match load'), 'speed_endurance')
      ])
  }
};

/* ================================================================== */
/* 8) Field hockey — intermediate season                               */
/* ================================================================== */
const hockey = {
  id: 'pt_hockey_season_int',
  sport: 'hockey',
  level: 'intermediate',
  title: T('موسم هوكي الميدان — مستوى متوسط', 'Field hockey season — intermediate'),
  goal: T('رفع تكرار السبرنت والتسارع وتغيير الاتجاه في وضع الانحناء، مع قوة الجذع وأسفل الضهر والمقربات، والحفاظ عليها في الموسم بتبديلات متكررة.',
    'Develop repeated sprints, acceleration and change of direction in a crouched posture, with trunk, lower-back and adductor strength, and maintain them through a season of rolling substitutions.'),
  components: ['speed_endurance', 'acceleration', 'agility', 'vo2max', 'strength', 'technique', 'tactics', 'prevention'],
  sessionsPerWeek: 5,
  periods: [
    {
      type: 'gpp',
      goal: T('إعداد عام: قاعدة هوائية وقوة عامة ووقاية الضهر', 'General preparation: aerobic base, general strength and back care'),
      components: ['aerobic', 'strength', 'core', 'technique'],
      blocks: [
        {
          name: T('أسبوع ١ — اختبارات', 'Week 1 — Testing'),
          goal: T('CMJ، عدو ٣٠م (من غير وبالكرة)، ٥٠٥، يويو IR1', 'CMJ, 30m sprint (with and without ball), 505, Yo-Yo IR1'),
          components: ['power', 'acceleration', 'agility', 'vo2max'],
          loads: [4], weekTypes: ['test'],
          pattern: ['hk_test', 'hk_ssg', '', 'hk_gym_str', 'hk_tactical', '', '']
        },
        {
          name: T('بلوك ١ — قاعدة', 'Block 1 — Base'),
          goal: T('قوة عامة وجذع قوي ولياقة بالكورة', 'General strength, a strong trunk and ball-based fitness'),
          components: ['aerobic', 'strength', 'core', 'technique'],
          loads: [5, 6, 4], weekTypes: ['load', 'load', 'deload'],
          pattern: ['hk_gym_str', 'hk_ssg', 'hk_speed', '', 'hk_gym_str', 'hk_tactical', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: T('تكرار سبرنت وماتشات مصغرة عالية الشدة وقوة قصوى', 'Repeated sprints, high-intensity small-sided games and max strength'),
      components: ['speed_endurance', 'vo2max', 'max_strength', 'agility'],
      blocks: [
        {
          name: T('بلوك ٢ — لياقة خاصة', 'Block 2 — Specific fitness'),
          goal: T('أعلى حمل في الإعداد', 'Peak preparation load'),
          components: ['speed_endurance', 'vo2max', 'max_strength', 'agility'],
          loads: [6, 7, 8, 5], weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['hk_gym_str', 'hk_rsa', 'hk_ssg', '', 'hk_gym_power', 'hk_speed', 'hk_tactical']
        }
      ]
    },
    {
      type: 'precomp',
      goal: T('قدرة وسرعة ووديات', 'Power, speed and friendlies'),
      components: ['power', 'acceleration', 'tactics'],
      blocks: [
        {
          name: T('بلوك ٣ — وديات', 'Block 3 — Friendlies'),
          goal: T('حدة بدنية وتكتيكية وتهدئة قبل أول ماتش', 'Physical and tactical sharpness, taper into the first match'),
          components: ['power', 'acceleration', 'tactics'],
          loads: [7, 5], weekTypes: ['load', 'taper'],
          pattern: ['hk_recovery', 'hk_gym_power', 'hk_rsa', 'hk_ssg', 'hk_tactical', 'hk_prematch', 'hk_match']
        }
      ]
    },
    {
      type: 'comp',
      goal: T('صيانة السرعة والقوة بدورة أسبوعية حول الماتش', 'Maintain speed and strength with a match-week microcycle'),
      components: ['acceleration', 'strength', 'tactics', 'recovery', 'prevention'],
      blocks: [
        {
          name: T('دوري — المرحلة الأولى', 'League — phase 1'),
          goal: T('MD+1 استشفاء، MD-4 جيم صيانة، MD-3 ماتشات مصغرة، MD-2 سرعة وتكتيك، MD-1 تنشيط', 'MD+1 recovery, MD-4 maintenance gym, MD-3 SSG, MD-2 speed and tactics, MD-1 activation'),
          components: ['acceleration', 'strength', 'tactics', 'recovery'],
          loads: [6, 6, 7], weekTypes: ['comp', 'comp', 'comp'],
          pattern: ['hk_recovery', '', 'hk_gym_maint', 'hk_ssg', 'hk_speed', 'hk_prematch', 'hk_match']
        },
        {
          name: T('أسبوع إعادة اختبار', 'Re-test week'),
          goal: T('CMJ وعدو ويويو لمتابعة الحالة', 'CMJ, sprint and Yo-Yo to monitor status'),
          components: ['power', 'acceleration', 'vo2max'],
          loads: [5], weekTypes: ['test'],
          pattern: ['hk_recovery', '', 'hk_test', 'hk_ssg', 'hk_tactical', 'hk_prematch', 'hk_match']
        },
        {
          name: T('دوري — المرحلة الثانية', 'League — phase 2'),
          goal: T('الحفاظ على الحدة', 'Keep the edge'),
          components: ['acceleration', 'tactics', 'prevention'],
          loads: [6], weekTypes: ['comp'],
          pattern: ['hk_recovery', '', 'hk_gym_maint', 'hk_ssg', 'hk_speed', 'hk_prematch', 'hk_match']
        }
      ]
    },
    {
      type: 'transition',
      goal: T('راحة إيجابية', 'Active rest'),
      components: ['recovery', 'aerobic'],
      blocks: [
        {
          name: T('انتقالية', 'Transition'),
          goal: T('نشاط خفيف ومرونة الحوض والضهر', 'Light activity and hip/back mobility'),
          components: ['recovery', 'aerobic', 'mobility'],
          loads: [2], weekTypes: ['deload'],
          pattern: ['hk_active', '', '', 'hk_active', '', '', '']
        }
      ]
    }
  ],
  sessions: {
    hk_test: ses(T('يوم اختبارات الهوكي', 'Hockey testing day'),
      T('تحديد المستوى وتقنين الأحمال', 'Profile players and set loads'),
      ['power', 'acceleration', 'agility', 'vo2max'], 8, 100, [
        ...wuPitch(),
        TST.cmj(),
        TST.sprint('30m'),
        rn(T('اختبار عدو ٣٠م بالكورة (دريبل)', '30m sprint dribble test'), { sets: 1, reps: '2', distance: '30m', rest: '3min', restType: 'walk' },
          T('السرعة مع التحكم بالكورة (الفرق عن العدو من غير كورة = كفاءة المهارة)', 'Speed with ball control (gap vs. plain sprint = skill efficiency)'), 'technique'),
        TST.cod(),
        TST.yoyo(),
        ...cdPitch()
      ]),
    hk_gym_str: ses(T('جيم — قوة وجذع', 'Gym — strength & trunk'),
      T('قوة الرجلين وأسفل الضهر والجذع لتحمل وضع الانحناء', 'Leg, lower-back and trunk strength to tolerate the crouched posture'),
      ['max_strength', 'strength', 'core', 'prevention'], 7, 75, [
        ...wuGym(),
        st('ex_front_squat', 4, '5', '80', '1rm', '3min', T('قوة الفخذ مع جذع مستقيم', 'Leg strength with an upright trunk'), 'max_strength', { tempo: '3-0-X-0' }),
        st('ex_romanian_deadlift', 3, '6', '2', 'rir', '2min', T('قوة الخلفية وأسفل الضهر في وضع الانحناء', 'Hamstring and lower-back strength in a hinged posture'), 'strength', { tempo: '3-0-1-0' }),
        st('ex_lateral_lunge', 3, '6/side', '2', 'rir', '90s', T('قوة جانبية وتحمل المقربات للدفاع المنخفض', 'Lateral strength and adductor tolerance for low defending'), 'strength'),
        st('ex_one_arm_dumbbell_row', 3, '8/side', '2', 'rir', '60s', T('قوة السحب وثبات الجذع', 'Pulling strength and trunk stability'), 'strength'),
        st('ek_hyperextensions', 3, '12', '2', 'rir', '60s', T('تحمل عضلات أسفل الضهر', 'Lower-back muscular endurance'), 'prevention'),
        PH.nordic(3, '5'),
        PH.cph(3, '20s/side'),
        PH.pallof(),
        ...cdGym()
      ]),
    hk_gym_power: ses(T('جيم — قدرة', 'Gym — power'),
      T('تحويل القوة لقدرة للانطلاق والضرب', 'Convert strength into power for acceleration and hitting'),
      ['power', 'max_strength', 'core'], 7, 65, [
        ...wuGym(),
        st('ad_hang_power_clean', 4, '3', '70', '1rm', '2min 30s', T('إنتاج قوة سريع من الحوض', 'Rapid hip force production'), 'power'),
        st('ad_back_squat_to_jump_squat_contrast', 4, '3 + 5', '80', '1rm', '3min', T('تباين ثقيل/سريع', 'Heavy/fast contrast'), 'power'),
        st('ad_lateral_bound_and_stick', 3, '4/side', '8', 'rpe', '90s', T('قدرة جانبية وهبوط ثابت', 'Lateral power and stable landing'), 'power', { note: T('٢٤ لمسة', '24 contacts') }),
        st('ad_medicine_ball_rotational_throw', 3, '6/side', '8', 'rpe', '60s', T('قدرة دورانية للضربة والدفعة (بوش)', 'Rotational power for the hit and push pass'), 'power'),
        PH.nordic(2, '4'),
        ...cdGym()
      ]),
    hk_gym_maint: ses(T('MD-4 — جيم صيانة', 'MD-4 — maintenance gym'),
      T('صيانة القوة والقدرة بأقل تعب', 'Maintain strength and power with minimal fatigue'),
      ['strength', 'power', 'prevention'], 6, 55, [
        ...wuGym().slice(0, 3),
        st('ex_front_squat', 3, '3', '85', '1rm', '2min 30s', T('صيانة القوة القصوى', 'Maintain max strength'), 'max_strength'),
        st('wg_jump_squat', 3, '4', '8', 'rpe', '90s', T('صيانة القدرة', 'Maintain power'), 'power'),
        st('ad_medicine_ball_rotational_throw', 2, '5/side', '8', 'rpe', '60s', T('صيانة القدرة الدورانية', 'Maintain rotational power'), 'power'),
        PH.nordic(2, '4'),
        PH.cph(2, '20s/side'),
        ...cdGym()
      ]),
    hk_speed: ses(T('سرعة بالعصا والكورة', 'Speed with stick & ball'),
      T('تسارع وتغيير اتجاه في وضع الانحناء بالكورة', 'Acceleration and cutting in a crouched posture with the ball'),
      ['acceleration', 'agility', 'technique', 'reaction'], 6, 75, [
        ...wuPitch(),
        rn('dr_sprint_accel', { sets: 2, reps: '4', distance: '20m', intensity: '95-100', basis: 'vmax', rest: '90s', restType: 'walk', setRest: '3min' },
          T('تسارع أقصى', 'Maximal acceleration'), 'acceleration'),
        rn(T('سبرنت بالكورة (دريبل) ١٥م + تمريرة', '15m sprint dribble + pass'), { sets: 2, reps: '4', distance: '15m', intensity: '95', basis: 'vmax', rest: '60s', restType: 'walk', setRest: '2min' },
          T('سرعة مع تحكم بالكورة', 'Speed with ball control'), 'technique'),
        rn('dr_cone_zigzag', { sets: 1, reps: '6', distance: '20m', intensity: '95', basis: 'best', rest: '75s', restType: 'walk' },
          T('تغيير اتجاه في وضع منخفض', 'Cutting in a low posture'), 'agility', { note: T('بالعصا والكورة في آخر تكرارين', 'Stick and ball on the last two reps') }),
        dr(T('١ ضد ١ هجوم ودفاع (تاكل وإيليمينيشن)', '1v1 attack vs defence (tackling and eliminations)'), { sets: 3, reps: '6', rest: '45s' },
          T('رشاقة برد فعل ضد المنافس', 'Reactive agility against an opponent'), 'agility'),
        dr(T('ركنيات قصيرة: دفعة وإيقاف وتسديد (دراج فليك)', 'Penalty corners: injection, stop and drag-flick'), { sets: 3, reps: '6', rest: '60s' },
          T('تنفيذ الركنية القصيرة', 'Penalty-corner execution'), 'technique'),
        ...cdPitch()
      ]),
    hk_ssg: ses(T('ماتشات مصغرة', 'Small-sided games'),
      T('لياقة متقطعة بالكورة وقرار سريع', 'Intermittent fitness with the ball and fast decisions'),
      ['vo2max', 'anaerobic', 'tactics', 'technique'], 8, 85, [
        ...wuPitch().slice(0, 3),
        wu(T('روندو ٥ ضد ٢ بالعصا في مربع ١٥×١٥م', 'Stick rondo 5v2 in a 15x15m grid'), { sets: 2, duration: '3min' }),
        tm(T('ماتش ٣ ضد ٣ — ملعب ٣٠×٢٠م (أهداف صغيرة)', '3v3 — 30x20m (small goals)'), 4, undefined, '2min', '9', 'rpe', '2min',
          T('أعلى شدة وتسارع', 'Maximum intensity and accelerations'), 'anaerobic'),
        tm(T('ماتش ٥ ضد ٥ + حراس — ملعب ٤٥×٣٥م', '5v5 + GKs — 45x35m'), 4, undefined, '4min', '8', 'rpe', '2min',
          T('لياقة متقطعة عالية الشدة', 'High-intensity intermittent fitness'), 'vo2max'),
        tm(T('ماتش ٨ ضد ٨ — نص ملعب', '8v8 — half pitch'), 2, undefined, '8min', '7', 'rpe', '3min',
          T('تطبيق مبادئ الضغط والتحولات', 'Apply pressing principles and transitions'), 'tactics'),
        ...cdPitch()
      ]),
    hk_rsa: ses(T('تكرار سبرنت وتحمل سرعة', 'Repeated sprints & speed endurance'),
      T('القدرة على تكرار السبرنت في فترة تواجد اللاعب في الملعب', 'Repeat sprints across a player\'s on-field stint'),
      ['speed_endurance', 'vo2max', 'anaerobic'], 8, 75, [
        ...wuPitch(),
        rn(T('تكرار سبرنت ٦ × ٣٠م — انطلاقة كل ٢٥ ث', 'Repeated sprints 6 x 30m — depart every 25s'), { sets: 3, reps: '6', distance: '30m', intensity: '100', basis: 'vmax', rest: '25s', restType: 'walk', setRest: '4min' },
          T('تحمل السرعة زي فترات الضغط في الماتش', 'Speed endurance like pressing phases'), 'speed_endurance',
          { note: T('آخر مجموعة بالعصا في وضع الانحناء', 'Last set with the stick in the crouched position') }),
        rn(T('فترات ٣٠ ث / ٣٠ ث عند ٩٠٪ من VIFT', '30s/30s intervals at 90% VIFT'), { sets: 2, reps: '8', duration: '30s', intensity: '9', basis: 'rpe', rest: '30s', restType: 'passive', setRest: '3min' },
          T('رفع VO2max', 'Raise VO2max'), 'vo2max'),
        PH.squeeze(),
        ...cdPitch()
      ]),
    hk_tactical: ses(T('تكتيك — أنظمة وضغط وكور ثابتة', 'Tactics — structure, press & set pieces'),
      T('تنظيم الفريق والضغط والركنيات القصيرة', 'Team structure, pressing and penalty corners'),
      ['tactics', 'technique'], 5, 80, [
        ...wuPitch().slice(0, 3),
        dr(T('بناء اللعب من الخلف ضد ضغط ١١ ضد ١١', 'Build-up vs 11v11 press'), { sets: 3, duration: '8min', rest: '2min' },
          T('خروج الكورة تحت ضغط', 'Play out under pressure'), 'tactics'),
        dr(T('ضغط عالي ومنطقة (زون بريس)', 'High press and zonal press'), { sets: 2, duration: '8min', rest: '2min' },
          T('ضغط منظم لاسترجاع الكورة', 'Organised press to regain the ball'), 'tactics'),
        dr(T('ركنيات قصيرة هجومية ودفاعية', 'Attacking and defending penalty corners'), { sets: 1, duration: '15min' },
          T('تنفيذ الركنية القصيرة والدفاع عنها', 'Execute and defend penalty corners'), 'tactics'),
        ...cdPitch()
      ]),
    hk_prematch: ses(T('MD-1 — تنشيط', 'MD-1 — activation'),
      T('تنشيط خفيف وثقة قبل الماتش', 'Light activation and confidence before the match'),
      ['speed', 'tactics', 'technique'], 3, 45, [
        ...wuPitch().slice(0, 3),
        rn('ad_reaction_start_sprint', { sets: 1, reps: '5', distance: '10m', intensity: '100', basis: 'vmax', rest: '60s', restType: 'walk' },
          T('تنشيط عصبي', 'Neural activation'), 'reaction'),
        dr(T('تمرير واستلام سريع', 'Quick passing and receiving'), { sets: 2, duration: '5min', rest: '60s' },
          T('إحساس بالكورة', 'Ball feel'), 'technique'),
        dr(T('مراجعة الركنيات القصيرة', 'Penalty-corner review'), { sets: 1, duration: '12min' },
          T('تثبيت الحركات', 'Rehearse routines'), 'tactics'),
        breathe('3min')
      ]),
    hk_match: ses(T('يوم الماتش', 'Match day'),
      T('أعلى أداء في الماتش', 'Peak match performance'),
      ['tactics', 'speed_endurance', 'mental'], 9, 110, [
        ...wuPitch(),
        matchItem(T('ماتش رسمي', 'Official match'), '4 x 15min', T('تنفيذ خطة الماتش', 'Execute the game plan'),
          T('تبديلات متكررة: فترات ٦-١٠ دقايق للاعب للحفاظ على شدة السبرنت', 'Rolling subs: 6-10min stints per player to keep sprint intensity')),
        mob(T('تهدئة ومرونة الحوض والضهر ومشروب استشفاء', 'Cool-down, hip and back mobility, recovery drink'), { duration: '10min' })
      ]),
    hk_recovery: ses(T('MD+1 — استشفاء وتعويض', 'MD+1 — recovery & top-up'),
      T('استشفاء للأساسيين وتعويض للبدلاء', 'Recovery for starters, top-up for substitutes'),
      ['recovery', 'mobility', 'speed_endurance'], 3, 50, [
        wu('ex_stationary_bike', { duration: '5min' }),
        mob(T('أساسيين: عجلة خفيفة أو حمام سباحة', 'Starters: easy bike or pool'), { duration: '15min' }),
        mob('ex_hip_flexor_stretch', { sets: 1, duration: '45s', note: SIDE }),
        mob('wg_cat_cow_stretch', { sets: 1, reps: '10' }),
        rn(T('بدلاء: سبرنت ٣٠م', 'Substitutes: 30m sprints'), { sets: 2, reps: '5', distance: '30m', intensity: '95', basis: 'vmax', rest: '30s', restType: 'walk', setRest: '3min' },
          T('تعويض الجري السريع', 'Replace high-speed running'), 'speed_endurance'),
        tm(T('بدلاء: ٣ ضد ٣ — ٣٠×٢٠م', 'Substitutes: 3v3 — 30x20m'), 3, undefined, '2min', '9', 'rpe', '2min',
          T('تعويض الحمل الأيضي', 'Replace the metabolic load'), 'anaerobic')
      ]),
    hk_active: ses(T('راحة إيجابية', 'Active rest'),
      T('استشفاء وحفاظ على اللياقة ومرونة الضهر', 'Recovery, fitness and back mobility'),
      ['recovery', 'aerobic', 'mobility'], 3, 45, [
        wu(T('مشي سريع', 'Brisk walk'), { duration: '5min' }),
        rn(T('جري خفيف أو عجلة أو سباحة', 'Easy run, bike or swim'), { duration: '30min', intensity: 'Z2', basis: 'hr' },
          T('الحفاظ على القاعدة الهوائية', 'Keep the aerobic base'), 'aerobic'),
        PH.nordic(2, '5'),
        mob('wg_cat_cow_stretch', { sets: 1, reps: '10' }),
        breathe()
      ])
  }
};

/* ================================================================== */
/* 9) Baseball — intermediate season (rotational power, arm care)      */
/* ================================================================== */
const armCareBlock = () => [
  st('ad_side_lying_external_rotation', 2, '12', '2', 'rir', '30s', T('قوة الدوران الخارجي لفرملة الدراع بعد الرمية', 'External-rotation strength to decelerate the arm after release'), 'prevention', { tempo: '2-1-3-0' }),
  st('wg_prone_y_raise', 2, '10', '2', 'rir', '30s', T('أسفل الترابيس وثبات لوح الكتف', 'Lower trap and scapular control'), 'prevention'),
  st('ad_supine_serratus_punch', 2, '12', '2', 'rir', '30s', T('تنشيط السيراتس لحركة لوح الكتف', 'Serratus activation for scapular motion'), 'prevention'),
  st('wg_wrist_curl', 2, '15', '2', 'rir', '30s', T('قوة قابضات الساعد لحماية الرباط الداخلي للكوع', 'Forearm flexor strength to protect the elbow UCL'), 'prevention')
];
const baseball = {
  id: 'pt_baseball_season_int',
  sport: 'baseball',
  level: 'intermediate',
  title: T('موسم بيسبول — مستوى متوسط (قدرة دورانية ورعاية دراع الرمي)', 'Baseball season — intermediate (rotational power & arm care)'),
  goal: T('رفع القدرة الدورانية لسرعة الضرب والرمي، والسرعة في أول خطوة والجري بين القواعد، مع برنامج رمي متدرج ورعاية للكتف والكوع طول الموسم.',
    'Develop rotational power for bat and throwing speed, first-step and base-running speed, with a progressive throwing programme and shoulder/elbow care all season.'),
  components: ['power', 'max_strength', 'acceleration', 'technique', 'prevention', 'mobility', 'core'],
  sessionsPerWeek: 5,
  periods: [
    {
      type: 'gpp',
      goal: T('إعداد عام: قوة أساسية، مدى حركي للكتف والحوض، وبداية برنامج الرمي', 'General preparation: foundational strength, shoulder and hip range of motion, start of the throwing programme'),
      components: ['strength', 'mobility', 'prevention', 'core'],
      blocks: [
        {
          name: T('أسبوع ١ — اختبارات', 'Week 1 — Testing'),
          goal: T('CMJ، عدو ٥٥م (٦٠ ياردة)، رمي كرة طبية دوراني، قوة القبضة، ومدى حركة الكتف', 'CMJ, 55m (60-yard) sprint, rotational med-ball throw, grip strength and shoulder range of motion'),
          components: ['power', 'acceleration', 'prevention'],
          loads: [3], weekTypes: ['test'],
          pattern: ['bs_test', 'bs_arm_care', '', 'bs_gym_str', 'bs_skill', '', '']
        },
        {
          name: T('بلوك ١ — قاعدة', 'Block 1 — Base'),
          goal: T('قوة عامة ومرونة، ورمي خفيف متدرج (لونج توس لحد ٣٥م)', 'General strength and mobility, progressive light throwing (long toss up to 35m)'),
          components: ['strength', 'mobility', 'prevention', 'core'],
          loads: [4, 5, 3], weekTypes: ['load', 'load', 'deload'],
          pattern: ['bs_gym_str', 'bs_arm_care', 'bs_speed', '', 'bs_gym_str', 'bs_skill', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: T('قوة قصوى وقدرة دورانية ورمي بشدة أعلى (بولبن للرماة)', 'Max strength, rotational power and higher-intensity throwing (bullpens for pitchers)'),
      components: ['max_strength', 'power', 'acceleration', 'technique'],
      blocks: [
        {
          name: T('بلوك ٢ — قوة وقدرة', 'Block 2 — Strength & power'),
          goal: T('زيادة سرعة المضرب والرمية', 'Increase bat and throwing velocity'),
          components: ['max_strength', 'power', 'acceleration', 'technique'],
          loads: [5, 6, 7], weekTypes: ['load', 'load', 'shock'],
          pattern: ['bs_gym_power', 'bs_arm_care', 'bs_speed', '', 'bs_gym_str', 'bs_skill', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: T('ماتشات تجريبية وتحويل القدرة لأداء في الملعب', 'Exhibition games, turning power into on-field performance'),
      components: ['power', 'technique', 'tactics'],
      blocks: [
        {
          name: T('بلوك ٣ — ماتشات تجريبية', 'Block 3 — Exhibition games'),
          goal: T('عدد رميات وإنينجز متدرج وتهدئة قبل الدوري', 'Progressive pitch counts and innings, taper before the league'),
          components: ['power', 'technique', 'tactics'],
          loads: [6, 4], weekTypes: ['load', 'taper'],
          pattern: ['bs_recovery', 'bs_gym_power', 'bs_skill', 'bs_arm_care', 'bs_speed', 'bs_game', '']
        }
      ]
    },
    {
      type: 'comp',
      goal: T('صيانة القوة والقدرة، ورعاية يومية للدراع، و٢-٣ ماتشات في الأسبوع', 'Maintain strength and power, daily arm care, 2-3 games per week'),
      components: ['power', 'strength', 'prevention', 'tactics', 'recovery'],
      blocks: [
        {
          name: T('دوري', 'League'),
          goal: T('جيم صيانة مرتين، رعاية دراع، وحدود رميات للرماة', 'Maintenance gym twice, arm care, pitch-count limits for pitchers'),
          components: ['power', 'strength', 'prevention', 'tactics'],
          loads: [6, 6, 7, 5], weekTypes: ['comp', 'comp', 'comp', 'comp'],
          pattern: ['bs_recovery', 'bs_gym_maint', 'bs_skill', '', 'bs_arm_care', 'bs_game', 'bs_game']
        }
      ]
    },
    {
      type: 'transition',
      goal: T('راحة للدراع ونشاط عام', 'Arm rest and general activity'),
      components: ['recovery', 'mobility'],
      blocks: [
        {
          name: T('انتقالية', 'Transition'),
          goal: T('من غير رمي، مرونة ونشاط هوائي خفيف', 'No throwing, mobility and light aerobic activity'),
          components: ['recovery', 'mobility', 'aerobic'],
          loads: [2], weekTypes: ['deload'],
          pattern: ['bs_active', '', '', 'bs_active', '', '', '']
        }
      ]
    }
  ],
  sessions: {
    bs_test: ses(T('يوم اختبارات البيسبول', 'Baseball testing day'),
      T('تحديد المستوى وكشف مخاطر الكتف والكوع', 'Profile players and screen shoulder/elbow risk'),
      ['power', 'acceleration', 'prevention'], 6, 90, [
        ...wuPitch().slice(0, 3),
        dr(T('مدى حركة الكتف: دوران داخلي وخارجي (القوس الكلي)', 'Shoulder range of motion: IR and ER (total arc)'), { sets: 1, reps: '2/side' },
          T('نقص أكتر من ٥ درجات في القوس الكلي لدراع الرمي = خطر إصابة', 'Total-arc deficit over 5 degrees on the throwing arm = injury risk'), 'prevention'),
        TST.cmj(),
        rn(T('اختبار عدو ٦٠ ياردة (٥٥م) بزمن ١٠ ياردة', '60-yard (55m) sprint with 10-yard split'), { sets: 1, reps: '2', distance: '55m', rest: '4min', restType: 'walk' },
          T('قياس السرعة في أول خطوة والجري بين القواعد', 'Measure first-step and base-running speed'), 'acceleration'),
        st('ad_medicine_ball_rotational_throw', 1, '3/side', '10', 'rpe', '90s', T('قياس القدرة الدورانية (مسافة أو سرعة الكورة)', 'Measure rotational power (distance or ball speed)'), 'power', { note: T('كرة ٣ كجم', '3kg ball') }),
        dr('ad_grip_dynamometer_test', { sets: 1, reps: '3/hand', rest: '30s' },
          T('قوة القبضة ومتابعة تعب الساعد', 'Grip strength and forearm fatigue monitoring'), 'strength'),
        dr(T('سرعة الرمية بالرادار (بعد إحماء رمي كامل)', 'Radar throwing velocity (after a full throwing warm-up)'), { sets: 1, reps: '3' },
          T('خط أساس لسرعة الرمية', 'Baseline throwing velocity'), 'power'),
        ...cdPitch().slice(0, 2)
      ]),
    bs_gym_str: ses(T('جيم — قوة', 'Gym — strength'),
      T('قوة الرجلين والجذع كأساس للقدرة الدورانية', 'Leg and trunk strength as the base for rotational power'),
      ['max_strength', 'strength', 'core', 'prevention'], 7, 70, [
        ...wuGym().slice(0, 3),
        st('wg_trap_bar_deadlift', 4, '5', '80', '1rm', '3min', T('قوة الرجلين والحوض', 'Leg and hip strength'), 'max_strength', { tempo: '2-0-X-0' }),
        st('wg_front_foot_elevated_split_squat', 3, '6/leg', '2', 'rir', '90s', T('قوة رجل واحدة وثبات الحوض (رجل الخطوة)', 'Single-leg strength and pelvic control (stride leg)'), 'strength'),
        st('ex_dumbbell_bench_press', 3, '8', '2', 'rir', '90s', T('قوة دفع بالدمبل (أأمن للكتف من البار)', 'Dumbbell pressing (more shoulder-friendly than the barbell)'), 'strength'),
        st('ex_one_arm_dumbbell_row', 3, '8/side', '2', 'rir', '60s', T('قوة السحب وتوازن الكتف', 'Pulling strength and shoulder balance'), 'strength'),
        st('wg_pallof_press', 3, '10/side', '2', 'rir', '45s', T('ثبات الجذع ضد الدوران', 'Anti-rotation core stability'), 'core'),
        st('ex_face_pull', 3, '15', '2', 'rir', '45s', T('صحة الكتف والكفة المدورة', 'Shoulder and rotator-cuff health'), 'prevention'),
        PH.cph(2, '20s/side'),
        mob('ad_90_90_hip_switches', { sets: 2, reps: '6/side', note: T('الدوران الداخلي للحوض مهم لنقل القوة في الضرب والرمي', 'Hip internal rotation is key to transfer force in hitting and throwing') })
      ]),
    bs_gym_power: ses(T('جيم — قدرة دورانية', 'Gym — rotational power'),
      T('رفع سرعة المضرب والرمية بقدرة دورانية', 'Increase bat and throwing speed through rotational power'),
      ['power', 'core', 'max_strength'], 7, 65, [
        ...wuGym().slice(0, 3),
        st('ad_medicine_ball_rotational_throw', 4, '5/side', '9', 'rpe', '60s', T('رمية دورانية (سكوب توس) لسرعة المضرب', 'Rotational scoop toss for bat speed'), 'power', { note: T('كرة ٢-٤ كجم، أقصى سرعة', '2-4kg ball, maximal intent') }),
        st('ad_landmine_rotation', 3, '6/side', '8', 'rpe', '60s', T('قوة الدوران والتحكم في الجذع', 'Rotational strength and trunk control'), 'power'),
        st('ad_hang_power_clean', 4, '3', '70', '1rm', '2min 30s', T('إنتاج قوة سريع من الحوض', 'Rapid hip force production'), 'power'),
        st('ad_lateral_bound_and_stick', 3, '4/side', '8', 'rpe', '90s', T('قدرة جانبية زي خطوة الرمي', 'Lateral power like the throwing stride'), 'power'),
        st('wg_cable_woodchop', 3, '8/side', '2', 'rir', '45s', T('قوة الجذع في نمط دوراني', 'Trunk strength in a rotational pattern'), 'core'),
        mob('ad_sleeper_stretch', { sets: 2, duration: '40s', note: T('لدراع الرمي، من غير ألم', 'Throwing arm, pain-free') })
      ]),
    bs_gym_maint: ses(T('جيم صيانة (موسم)', 'In-season maintenance gym'),
      T('صيانة القوة والقدرة بأقل تعب للدراع', 'Maintain strength and power with minimal arm fatigue'),
      ['strength', 'power', 'prevention'], 5, 50, [
        ...wuGym().slice(0, 3),
        st('wg_trap_bar_deadlift', 3, '3', '85', '1rm', '2min 30s', T('صيانة القوة القصوى', 'Maintain max strength'), 'max_strength'),
        st('ad_medicine_ball_rotational_throw', 3, '4/side', '8', 'rpe', '60s', T('صيانة القدرة الدورانية', 'Maintain rotational power'), 'power'),
        st('wg_front_foot_elevated_split_squat', 2, '6/leg', '3', 'rir', '60s', T('صيانة قوة الرجل الواحدة', 'Maintain single-leg strength'), 'strength'),
        ...armCareBlock().slice(0, 2)
      ]),
    bs_arm_care: ses(T('برنامج الرمي ورعاية الدراع', 'Throwing programme & arm care'),
      T('زيادة حمل الرمي تدريجيًا مع حماية الكتف والكوع', 'Build throwing load progressively while protecting shoulder and elbow'),
      ['prevention', 'technique', 'mobility'], 5, 60, [
        wu(T('روتين الأستك (J-Band): دوران داخلي وخارجي وفتح وسحب', 'Band routine (J-Band style): IR/ER, abduction and rows'), { duration: '8min' }),
        wu('ad_open_book', { sets: 1, reps: '8/side' }),
        dr(T('لونج توس: بناء على قوس لحد المسافة المستهدفة ثم رميات مستقيمة', 'Long toss: on-arc build to target distance, then pull-downs'), { sets: 1, reps: '30-45 throws', distance: '14-55m', duration: '20min' },
          T('بناء قوة وتحمل الدراع بشكل متدرج', 'Build arm strength and endurance progressively'), 'technique',
          { note: T('المسافة تزيد ٣-٥م في الأسبوع؛ وقف لو في ألم في الكوع أو الكتف', 'Add 3-5m per week; stop with any elbow or shoulder pain') }),
        dr(T('الرماة: بولبن ٢٥-٣٥ رمية عند ٧٥-٩٠٪ مجهود', 'Pitchers: bullpen 25-35 pitches at 75-90% effort'), { sets: 1, reps: '25-35' },
          T('تكنيك الرمي والتحكم في المناطق', 'Pitching mechanics and command'), 'technique', { note: T('يوم بولبن ويوم راحة من الرمي القوي على الأقل', 'At least one day off hard throwing after a bullpen') }),
        ...armCareBlock(),
        mob('ad_sleeper_stretch', { sets: 2, duration: '40s' })
      ]),
    bs_speed: ses(T('سرعة وجري بين القواعد', 'Speed & base running'),
      T('أول خطوة سريعة وجري القواعد والرشاقة في الدفاع', 'Quick first step, base running and defensive agility'),
      ['acceleration', 'agility', 'reaction', 'technique'], 6, 65, [
        ...wuPitch(),
        rn('dr_sprint_accel', { sets: 2, reps: '4', distance: '10m', intensity: '100', basis: 'vmax', rest: '90s', restType: 'walk', setRest: '3min' },
          T('انطلاقة من وضع الليد (خطوة جانبية ثم سبرنت)', 'Start from a lead-off (crossover then sprint)'), 'acceleration'),
        rn(T('جري من القاعدة الأولى للتانية (سرقة قاعدة)', 'First-to-second base steal'), { sets: 1, reps: '6', distance: '27m', intensity: '100', basis: 'vmax', rest: '2min', restType: 'walk' },
          T('سرعة سرقة القاعدة', 'Base-stealing speed'), 'acceleration'),
        rn(T('جري حول القواعد (هوم لتالتة) بزاوية دخول صحيحة', 'Home-to-third running with correct turns'), { sets: 1, reps: '3', distance: '82m', intensity: '95', basis: 'vmax', rest: '3min', restType: 'walk' },
          T('تكنيك اللف حوالين القاعدة', 'Base-rounding technique'), 'technique'),
        rn('ad_ball_drop_sprint', { sets: 1, reps: '6', distance: '5m', intensity: '100', basis: 'vmax', rest: '45s', restType: 'walk' },
          T('رد فعل للاعيبة الإنفيلد', 'Reaction for infielders'), 'reaction'),
        PH.nordic(2, '4'),
        ...cdPitch().slice(0, 2)
      ]),
    bs_skill: ses(T('مهارة — ضرب ودفاع', 'Skill — hitting & fielding'),
      T('سرعة المضرب وجودة التلامس، والدفاع والرمي الدقيق', 'Bat speed and contact quality, fielding and accurate throws'),
      ['technique', 'power', 'reaction', 'tactics'], 5, 100, [
        ...wuPitch().slice(0, 3),
        dr(T('ضرب من التي ثم فرونت توس (متابعة سرعة المضرب)', 'Tee work then front toss (bat-speed tracking)'), { sets: 3, reps: '10', rest: '60s' },
          T('ميكانيكية المرجحة وسرعة المضرب', 'Swing mechanics and bat speed'), 'technique'),
        dr(T('باتينج براكتس لايف', 'Live batting practice'), { sets: 3, reps: '8', rest: '2min' },
          T('قراءة الرمية واختيار الضربة', 'Pitch recognition and swing decisions'), 'technique'),
        dr(T('دفاع إنفيلد: جراوند بولز ورمي للقاعدة الأولى', 'Infield: ground balls and throws to first'), { sets: 3, reps: '10', rest: '60s' },
          T('سرعة التعامل مع الكورة ودقة الرمي', 'Glove work and throwing accuracy'), 'technique'),
        dr(T('دفاع أوتفيلد: فلاي بولز ورمي للكاتشر (كرو هوب)', 'Outfield: fly balls and crow-hop throws to the cutoff'), { sets: 2, reps: '8', rest: '60s' },
          T('القراءة والطريق للكورة والرمي', 'Reads, routes and throws'), 'technique'),
        dr(T('مواقف لعب: دبل بلاي وكت أوف ورن داون', 'Situational play: double plays, cut-offs and rundowns'), { sets: 1, duration: '15min' },
          T('التنظيم الدفاعي', 'Defensive organisation'), 'tactics'),
        ...cdPitch().slice(0, 2)
      ]),
    bs_game: ses(T('يوم الماتش', 'Game day'),
      T('أعلى أداء مع احترام حدود الرميات', 'Peak performance within pitch-count limits'),
      ['tactics', 'technique', 'mental'], 7, 180, [
        ...wuPitch().slice(0, 3),
        wu(T('إحماء رمي متدرج ولونج توس خفيف', 'Progressive throwing warm-up and light long toss'), { duration: '12min' }),
        matchItem(T('ماتش بيسبول', 'Baseball game'), '9 innings (2:30-3:00)', T('تنفيذ خطة الماتش', 'Execute the game plan'),
          T('الرماة: حد أقصى للرميات حسب الجدول (مثلًا ٨٥-١٠٠) وأيام راحة بعدها', 'Pitchers: pitch-count cap per plan (e.g. 85-100) with mandated rest days')),
        mob(T('تهدئة ورعاية الدراع (أستك خفيف ودوران خارجي)', 'Cool-down and arm care (light bands and external rotation)'), { duration: '12min' })
      ]),
    bs_recovery: ses(T('استشفاء بعد الماتش', 'Post-game recovery'),
      T('استشفاء الدراع والجسم', 'Arm and whole-body recovery'),
      ['recovery', 'mobility', 'prevention'], 2, 40, [
        wu('ex_stationary_bike', { duration: '10min' }),
        mob('ad_sleeper_stretch', { sets: 2, duration: '40s' }),
        mob('ad_open_book', { sets: 1, reps: '8/side' }),
        st('ad_side_lying_external_rotation', 2, '15', '3', 'rir', '30s', T('ضخ دم خفيف للكفة المدورة', 'Light flush for the rotator cuff'), 'recovery'),
        mob('ad_90_90_hip_switches', { sets: 2, reps: '6/side' })
      ]),
    bs_active: ses(T('راحة إيجابية', 'Active rest'),
      T('راحة للدراع مع نشاط عام', 'Arm rest with general activity'),
      ['recovery', 'aerobic', 'mobility'], 3, 45, [
        wu(T('مشي سريع', 'Brisk walk'), { duration: '5min' }),
        rn(T('عجلة أو جري خفيف', 'Bike or easy run'), { duration: '30min', intensity: 'Z2', basis: 'hr' },
          T('الحفاظ على اللياقة العامة', 'Keep general fitness'), 'aerobic'),
        ...armCareBlock().slice(0, 2),
        breathe()
      ])
  }
};

export const PLAN_TEMPLATES_TEAM = [
  footballAdv, footballYouth, basketball, handball, volleyball, futsal,
  rugby, hockey, baseball
];
