/*
 * قوالب المخطط الموسمي — الرياضات المائية
 * ========================================
 * سباحة (سرعة متقدم، مسافات متوسط، ناشئين مبتدئ، مياه مفتوحة)، كرة ماء، غطس، ركوب أمواج.
 * الشدة في السباحة محسوبة على CSS (سرعة السباحة الحرجة لكل ١٠٠م) أو % من أحسن زمن أو RPE.
 * CSS = (٤٠٠ - ٢٠٠) ÷ (زمن ٤٠٠م - زمن ٢٠٠م) — بيتقاس في أسبوع الاختبارات.
 * "CSS+4s" يعني أبطأ من CSS بـ٤ ثواني لكل ١٠٠م، و"CSS-2s" أسرع بثانيتين.
 */

/* ---------- عناصر مشتركة ---------- */
const coolSwim = (m, min) => ({
  kind: 'swim',
  name: { ar: 'تهدئة: سباحة سهلة متنوعة', en: 'Cool-down: easy mixed swim' },
  distance: m + 'm', stroke: 'free', intensity: '2-3', basis: 'rpe', duration: min + 'min',
  purpose: { ar: 'إزالة اللاكتات ورجوع النبض لطبيعته', en: 'Flush lactate and bring heart rate down' },
  component: 'recovery',
  note: { ar: 'حرة وظهر بالتبادل، مد طويل ونفس منتظم', en: 'Alternate free and back, long strokes, relaxed breathing' }
});

const DRY_WARMUP = [
  { kind: 'warmup', libId: 'ex_arm_circles', sets: 2, reps: '10 each way' },
  { kind: 'warmup', libId: 'ad_band_pass_through', sets: 2, reps: '10' },
  { kind: 'warmup', libId: 'wg_worlds_greatest_stretch', sets: 1, reps: '5/side' }
];

const SHOULDER_PREHAB = [
  {
    kind: 'strength', libId: 'ex_band_external_rotation', sets: 3, reps: '15', intensity: '6', basis: 'rpe', tempo: '2-1-2-0', rest: '30s',
    purpose: { ar: 'تقوية الكفة المدورة لحماية كتف السباح', en: 'Rotator-cuff strength to protect the swimmer\'s shoulder' },
    component: 'prevention'
  },
  {
    kind: 'strength', libId: 'wg_prone_y_raise', sets: 2, reps: '12', intensity: '6', basis: 'rpe', tempo: '2-1-2-0', rest: '30s',
    purpose: { ar: 'تقوية أسفل الترابيس وثبات لوح الكتف', en: 'Lower-trap strength and scapular control' },
    component: 'prevention'
  }
];

export const PLAN_TEMPLATES_SWIM = [
  /* =========================================================
   * 1) سباحة سرعة ٥٠/١٠٠م حرة — متقدم — ١٨ أسبوع
   * ========================================================= */
  {
    id: 'pt_swimming_sprint_adv',
    sport: 'swimming',
    level: 'advanced',
    title: { ar: 'موسم سباحة سرعة ٥٠/١٠٠م حرة — متقدم', en: 'Sprint freestyle 50/100m season — advanced' },
    goal: {
      ar: 'بناء قاعدة هوائية وقوة قصوى، وبعدين تحويلها لسرعة سباق وتحمل لاكتات، والوصول لأحسن زمن في ٥٠ و١٠٠م حرة في البطولة الرئيسية بعد تهدئة ٣ أسابيع.',
      en: 'Build an aerobic base and max strength, convert them into race speed and lactate tolerance, and peak for a best 50/100m freestyle at the main meet after a 3-week taper.'
    },
    components: ['aerobic', 'threshold', 'speed', 'speed_endurance', 'max_strength', 'power', 'technique'],
    sessionsPerWeek: 6,
    periods: [
      {
        type: 'gpp',
        goal: {
          ar: 'قاعدة هوائية (حجم ٢٥-٣٠ كم/أسبوع)، تكنيك ورجلين، وقوة قصوى في الجيم مع الحفاظ على سرعة قصيرة.',
          en: 'Aerobic base (25-30 km/week), technique and kick, max strength in the gym while keeping short alactic speed.'
        },
        components: ['aerobic', 'threshold', 'max_strength', 'technique'],
        blocks: [
          {
            name: { ar: 'بلوك ١ — قاعدة هوائية', en: 'Block 1 — Aerobic base' },
            goal: { ar: 'رفع الحجم تدريجيا، تكنيك الشد والتنفس، وتأسيس قوة الجيم.', en: 'Progressive volume, catch and breathing technique, strength foundation in the gym.' },
            components: ['aerobic', 'technique', 'strength'],
            loads: [5, 6, 7],
            weekTypes: ['load', 'load', 'load'],
            pattern: ['sa_aero', 'sa_gym_str', 'sa_css', 'sa_tech_kick', 'sa_gym_str', 'sa_aero', '']
          },
          {
            name: { ar: 'أسبوع اختبارات — CSS', en: 'Test week — CSS' },
            goal: { ar: 'قياس CSS (٤٠٠ + ٢٠٠م) وزمن الانطلاقة ١٥م لتحديد شدات البلوكات الجاية، مع تخفيف الحمل.', en: 'Measure CSS (400 + 200m) and 15m start time to set the next blocks\' intensities, with reduced load.' },
            components: ['threshold', 'speed', 'recovery'],
            loads: [4],
            weekTypes: ['test'],
            pattern: ['sa_test', 'sa_tech_kick', 'sa_aero', 'sa_gym_str', 'sa_tech_kick', 'sa_aero', '']
          },
          {
            name: { ar: 'بلوك ٢ — عتبة وقوة قصوى', en: 'Block 2 — Threshold and max strength' },
            goal: { ar: 'تطوير العتبة على CSS الجديد، قوة قصوى ٨٠-٨٥%، وإدخال سرعة قصيرة مرة في الأسبوع.', en: 'Develop threshold on the new CSS, max strength at 80-85%, and add one short-speed session per week.' },
            components: ['threshold', 'aerobic', 'max_strength', 'speed'],
            loads: [6, 7, 8, 4],
            weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['sa_css', 'sa_gym_str', 'sa_aero', 'sa_speed', 'sa_gym_str', 'sa_aero', '']
          }
        ]
      },
      {
        type: 'spp',
        goal: {
          ar: 'تحويل القاعدة لسرعة سباق: ١٠٠ مقسمة، مجموعات بسرعة السباق، تحمل لاكتات، وتحويل القوة لقدرة انفجارية.',
          en: 'Convert the base into race speed: broken 100s, race-pace sets, lactate tolerance, and strength-to-power conversion.'
        },
        components: ['speed_endurance', 'anaerobic', 'power', 'speed'],
        blocks: [
          {
            name: { ar: 'بلوك ٣ — سرعة السباق', en: 'Block 3 — Race pace' },
            goal: { ar: 'حجم عالي بسرعة الـ١٠٠م، ٦×٥٠ بسرعة السباق، وقدرة في الجيم (كلين، قفز).', en: 'High volume at 100m race pace, 6x50 at race pace, and gym power (cleans, jumps).' },
            components: ['speed_endurance', 'anaerobic', 'power'],
            loads: [7, 8, 9, 5],
            weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['sa_race', 'sa_gym_pow', 'sa_css', 'sa_speed', 'sa_gym_pow', 'sa_aero', '']
          }
        ]
      },
      {
        type: 'precomp',
        goal: {
          ar: 'سرعة قصوى وانطلاقات ودورانات، محاكاة سباق أسبوعية (١٠٠ و٥٠م من البلوك) وتقليل الحجم تدريجيا.',
          en: 'Max speed, starts and turns, weekly race simulation (100 and 50m from the block) and gradual volume reduction.'
        },
        components: ['speed', 'reaction', 'speed_endurance', 'power'],
        blocks: [
          {
            name: { ar: 'بلوك ٤ — سرعة ومحاكاة', en: 'Block 4 — Speed and simulation' },
            goal: { ar: 'أعلى جودة سرعة: ٢٥م من البلوك براحة كاملة، ١٠٠ اختبار زمن كل سبت.', en: 'Highest speed quality: 25s from the block with full rest, a 100m time trial every Saturday.' },
            components: ['speed', 'reaction', 'speed_endurance'],
            loads: [7, 8, 6],
            weekTypes: ['load', 'load', 'test'],
            pattern: ['sa_speed', 'sa_gym_pow', 'sa_race', 'sa_tech_kick', 'sa_speed', 'sa_sim', '']
          }
        ]
      },
      {
        type: 'taper',
        goal: {
          ar: 'تهدئة ٣ أسابيع: الحجم ينزل ٣٠% ثم ٥٠% ثم ٦٠% مع الحفاظ على الشدة، والوصول للبطولة في أحسن حالة.',
          en: '3-week taper: volume down 30%, then 50%, then 60% while keeping intensity, arriving at the meet fresh and sharp.'
        },
        components: ['speed', 'recovery', 'mental'],
        blocks: [
          {
            name: { ar: 'بلوك ٥ — تهدئة وبطولة', en: 'Block 5 — Taper and meet' },
            goal: { ar: 'استشفاء كامل مع لمسات سرعة قصيرة وسرعة سباق، وروتين يوم البطولة.', en: 'Full recovery with short speed and race-pace touches, and the meet-day routine.' },
            components: ['speed', 'recovery', 'mental'],
            loads: [5, 4, 3],
            weekTypes: ['taper', 'taper', 'comp'],
            pattern: ['sa_taper', 'sa_tech_kick', 'sa_speed', 'sa_taper', 'sa_tech_kick', 'sa_meet', '']
          }
        ]
      }
    ],
    sessions: {
      sa_aero: {
        title: { ar: 'تحمل هوائي — ٥٨٠٠م', en: 'Aerobic endurance — 5800m' },
        goal: { ar: 'تطوير القاعدة الهوائية والكفاءة الحركية تحت CSS.', en: 'Develop the aerobic base and stroke efficiency below CSS.' },
        components: ['aerobic', 'muscular_endurance', 'technique'],
        rpe: 5,
        duration: 105,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٢٠٠ حرة + ٢٠٠ ظهر + ٢٠٠ متنوع تكنيك', en: 'Warm-up: 200 free + 200 back + 200 IM drill' }, distance: '600m', stroke: 'im' },
          {
            kind: 'swim', libId: 'ad_freestyle_kick_sets', sets: 1, reps: '8', distance: '100m', stroke: 'kick', intensity: '6', basis: 'rpe', rest: '15s',
            purpose: { ar: 'تحمل الرجلين — الرجلين مصدر أساسي للسرعة في ٥٠ و١٠٠م', en: 'Kick endurance — the kick is a major speed source in 50/100m' },
            component: 'muscular_endurance',
            note: { ar: 'بلوح، فردي بدون زعانف، زوجي بزعانف قصيرة', en: 'With board; odds no fins, evens short fins' }
          },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '50m', stroke: 'drill', intensity: '4', basis: 'rpe', rest: '15s',
            name: { ar: 'تكنيك حرة: كاتش أب / قبضة / ٦ ضربات وتبديل', en: 'Free drill: catch-up / fist / 6-kick switch' },
            purpose: { ar: 'تحسين مسكة الماية (الكاتش) ودوران الجسم', en: 'Improve the catch and body rotation' },
            component: 'technique'
          },
          {
            kind: 'swim', sets: 3, reps: '4', distance: '200m', stroke: 'free', intensity: 'CSS+5s', basis: 'css', rest: '20s', setRest: '1min',
            name: { ar: 'الأساسي: ٣ × (٤×٢٠٠ حرة)', en: 'Main: 3 x (4x200 free)' },
            purpose: { ar: 'تحمل هوائي منطقة ٢ مع ثبات السرعة', en: 'Zone 2 aerobic endurance with even pacing' },
            component: 'aerobic',
            note: { ar: 'المجموعة ١ على CSS+6s، الثانية CSS+5s، الثالثة CSS+4s. تنفس كل ٣ ضربات.', en: 'Round 1 at CSS+6s, round 2 CSS+5s, round 3 CSS+4s. Breathe every 3 strokes.' }
          },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '150m', stroke: 'pull', intensity: 'CSS+4s', basis: 'css', rest: '15s',
            name: { ar: 'دراعات بالبادلز والعوامة', en: 'Pull with paddles and buoy' },
            purpose: { ar: 'قوة تحمل في الشد وطول الضربة', en: 'Pulling strength-endurance and distance per stroke' },
            component: 'muscular_endurance',
            note: { ar: 'عد الضربات كل ٥٠ وحاول تقللها ضربة', en: 'Count strokes per 50 and try to drop one' }
          },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '50m', stroke: 'back', intensity: '5', basis: 'rpe', rest: '15s',
            name: { ar: '٨×٥٠ ظهر / صدر بالتبادل', en: '8x50 back / breast alternating' },
            purpose: { ar: 'توازن عضلي للكتف وتحمل هوائي بطريقة تانية', en: 'Shoulder muscle balance and aerobic work on a second stroke' },
            component: 'aerobic'
          },
          coolSwim(300, 6),
          { kind: 'mobility', libId: 'ad_sleeper_stretch', sets: 2, reps: '30s/side' }
        ]
      },
      sa_css: {
        title: { ar: 'عتبة CSS — ٤٢٠٠م', en: 'CSS threshold — 4200m' },
        goal: { ar: 'رفع سرعة العتبة اللاهوائية عشان السباح يتحمل حجم سرعة أعلى.', en: 'Raise threshold speed so the swimmer tolerates more high-speed volume.' },
        components: ['threshold', 'aerobic', 'speed'],
        rpe: 7,
        duration: 95,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سباحة + ٤×١٠٠ (٥٠ تكنيك / ٥٠ سباحة) متنوع', en: 'Warm-up: 400 swim + 4x100 (50 drill / 50 swim) IM' }, distance: '800m', stroke: 'im' },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '50m', stroke: 'free', intensity: '6-8', basis: 'rpe', rest: '15s',
            name: { ar: '٦×٥٠ تصاعدي ١-٣', en: '6x50 build 1-3' },
            purpose: { ar: 'تجهيز الجهاز العصبي لسرعة المجموعة الأساسية', en: 'Prime the nervous system for main-set pace' },
            component: 'speed'
          },
          {
            kind: 'swim', sets: 3, reps: '8', distance: '50m', stroke: 'free', intensity: 'CSS', basis: 'css', rest: '10s', setRest: '1min',
            name: { ar: 'الأساسي أ: ٣ × (٨×٥٠ على CSS)', en: 'Main A: 3 x (8x50 @ CSS)' },
            purpose: { ar: 'تطوير العتبة بفترات قصيرة تناسب سباح السرعة', en: 'Threshold development with short repeats suited to a sprinter' },
            component: 'threshold',
            note: { ar: 'كل ٥٠ = نص زمن CSS/١٠٠. لو زاد الزمن أكتر من ١ث عن الهدف وقف المجموعة.', en: 'Each 50 = half the CSS/100 time. Stop the set if you drift more than 1s off target.' }
          },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '100m', stroke: 'pull', intensity: 'CSS+2s', basis: 'css', rest: '15s',
            name: { ar: 'الأساسي ب: ٨×١٠٠ دراعات', en: 'Main B: 8x100 pull' },
            purpose: { ar: 'عتبة بالدراعات مع الحفاظ على طول الضربة', en: 'Threshold pulling while holding stroke length' },
            component: 'threshold'
          },
          {
            kind: 'swim', libId: 'ad_freestyle_kick_sets', sets: 1, reps: '12', distance: '50m', stroke: 'kick', intensity: '7-8', basis: 'rpe', rest: '15s',
            purpose: { ar: 'قوة تحمل الرجلين بشدة متصاعدة', en: 'Kick strength-endurance with descending effort' },
            component: 'muscular_endurance',
            note: { ar: 'تنازلي ١-٤ ثلاث مرات', en: 'Descend 1-4 three times' }
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '25m', stroke: 'free', intensity: '95', basis: 'best', rest: '45s',
            name: { ar: '٤×٢٥ سريع من الحيطة', en: '4x25 fast from push' },
            purpose: { ar: 'الحفاظ على السرعة وسط حجم العتبة', en: 'Keep speed in touch within threshold volume' },
            component: 'speed'
          },
          coolSwim(400, 8)
        ]
      },
      sa_tech_kick: {
        title: { ar: 'تكنيك ورجلين تحت الماية — استشفاء', en: 'Technique and underwater kick — recovery' },
        goal: { ar: 'تحسين كفاءة الضربة والدولفين تحت الماية بمجهود خفيف.', en: 'Improve stroke efficiency and underwater dolphin kick at low effort.' },
        components: ['technique', 'recovery', 'power'],
        rpe: 4,
        duration: 75,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سهل حرة وظهر', en: 'Warm-up: 400 easy free and back' }, distance: '400m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '75m', stroke: 'drill', intensity: '4', basis: 'rpe', rest: '15s',
            name: { ar: '٨×٧٥ (٢٥ كاتش أب / ٢٥ قبضة / ٢٥ سباحة)', en: '8x75 (25 catch-up / 25 fist / 25 swim)' },
            purpose: { ar: 'إحساس بالماية ومسكة كوع عالي', en: 'Feel for the water and high-elbow catch' },
            component: 'technique'
          },
          {
            kind: 'swim', sets: 2, reps: '4', distance: '15m', stroke: 'kick', intensity: '8', basis: 'rpe', rest: '30s', setRest: '1min',
            name: { ar: 'دولفين تحت الماية ١٥م (بطن / جنب)', en: 'Underwater dolphin kick 15m (front / side)' },
            purpose: { ar: 'تحسين الجزء تحت الماية بعد الانطلاق والدوران', en: 'Improve the underwater phase after starts and turns' },
            component: 'power',
            note: { ar: 'ستريم لاين محكم، ضربة صغيرة وسريعة من الصدر', en: 'Tight streamline, small fast kick initiated from the chest' }
          },
          {
            kind: 'timed', sets: 6, reps: '1', duration: '20s', intensity: '8', basis: 'rpe', rest: '20s',
            name: { ar: 'رجلين عمودي (الإيدين فوق)', en: 'Vertical kick (hands up)' },
            purpose: { ar: 'قوة الرجلين والجذع بدون ميزة الحيطة', en: 'Leg and trunk power with no wall help' },
            component: 'core'
          },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '100m', stroke: 'free', intensity: '5', basis: 'rpe', rest: '15s',
            name: { ar: '٨×١٠٠ حرة — عدد ضربات', en: '8x100 free — stroke count' },
            purpose: { ar: 'مسافة أطول لكل ضربة (DPS) بنفس الزمن', en: 'More distance per stroke at the same time' },
            component: 'technique',
            note: { ar: 'قلل ضربة كل ٢٥ لحد ما الزمن يبدأ يزيد', en: 'Drop one stroke per 25 until the time starts to slip' }
          },
          coolSwim(200, 5),
          { kind: 'mobility', libId: 'ex_thoracic_rotation', sets: 2, reps: '8/side' }
        ]
      },
      sa_speed: {
        title: { ar: 'سرعة وانطلاقات — ٣٠٠٠م', en: 'Speed and starts — 3000m' },
        goal: { ar: 'سرعة قصوى لاهوائية لاكتيكية بدون تراكم لاكتات، انطلاقات ودورانات.', en: 'Alactic max speed without lactate build-up, starts and turns.' },
        components: ['speed', 'acceleration', 'reaction', 'power'],
        rpe: 8,
        duration: 80,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سباحة + ٣٠٠ رجلين + ٦×٥٠ تصاعدي', en: 'Warm-up: 400 swim + 300 kick + 6x50 build' }, distance: '1000m', stroke: 'im' },
          {
            kind: 'drill', sets: 1, reps: '6', distance: '15m',
            name: { ar: 'تكنيك الانطلاق: بلوك + دخول + خروج لـ١٥م', en: 'Start technique: block + entry + breakout to 15m' },
            purpose: { ar: 'زاوية دخول وخروج صحيحة وأول ضربة قوية', en: 'Correct entry angle, breakout and a strong first stroke' },
            component: 'reaction',
            note: { ar: 'تصوير فيديو لو متاح. راحة كاملة ٢ دقيقة.', en: 'Video if available. Full rest, 2 min.' }
          },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '25m', stroke: 'free', intensity: '100', basis: 'best', rest: '3min',
            name: { ar: '٦×٢٥ أقصى سرعة من البلوك', en: '6x25 max from dive' },
            purpose: { ar: 'سرعة قصوى — الجزء الأول من ٥٠م', en: 'Max velocity — the opening of the 50m' },
            component: 'speed',
            note: { ar: 'الزمن من الإشارة لـ١٥م و٢٥م. الراحة سهلة ٥٠م. وقف لو الزمن زاد أكتر من ٣%.', en: 'Time signal-to-15m and 25m. Easy 50 as recovery. Stop if times slow by more than 3%.' }
          },
          {
            kind: 'swim', sets: 2, reps: '4', distance: '15m', stroke: 'free', intensity: '100', basis: 'best', rest: '45s', setRest: '2min',
            name: { ar: '٨×(١٥م سبرنت + ١٠م سهل) من الحيطة', en: '8x(15m sprint + 10m easy) from push' },
            purpose: { ar: 'تسارع من الحيطة بعد الدوران', en: 'Acceleration off the wall after turns' },
            component: 'acceleration'
          },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '12.5m', stroke: 'free', intensity: '10', basis: 'rpe', rest: '1min',
            name: { ar: 'سبرنت بمقاومة (أستك / باراشوت)', en: 'Resisted sprint (cord / parachute)' },
            purpose: { ar: 'قوة الشد تحت مقاومة لتحويل قوة الجيم لسرعة', en: 'Pulling force under resistance to transfer gym strength' },
            component: 'power'
          },
          {
            kind: 'drill', sets: 1, reps: '8',
            name: { ar: 'دوران شقلبة بسرعة السباق (٧.٥م دخول وخروج)', en: 'Flip turns at race speed (7.5m in and out)' },
            purpose: { ar: 'دوران أسرع وخروج محكم', en: 'Faster turns and tight push-off' },
            component: 'technique'
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '15m', stroke: 'kick', intensity: '10', basis: 'rpe', rest: '1min',
            name: { ar: '٤×١٥م دولفين تحت الماية أقصى', en: '4x15m max underwater dolphin kick' },
            purpose: { ar: 'سرعة الجزء تحت الماية', en: 'Underwater phase speed' },
            component: 'power'
          },
          coolSwim(400, 8)
        ]
      },
      sa_race: {
        title: { ar: 'سرعة سباق وتحمل لاكتات — ١٠٠ مقسمة', en: 'Race pace and lactate tolerance — broken 100s' },
        goal: { ar: 'التعود على سرعة الـ١٠٠م الهدف وتحمل الحموضة في آخر ٢٥م.', en: 'Rehearse goal 100m pace and tolerate acidosis over the final 25m.' },
        components: ['speed_endurance', 'anaerobic', 'mental'],
        rpe: 9,
        duration: 95,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سباحة + ٣٠٠ رجلين + ٣٠٠ متنوع تكنيك', en: 'Warm-up: 400 swim + 300 kick + 300 IM drill' }, distance: '1000m', stroke: 'im' },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '25m', stroke: 'free', intensity: '95', basis: 'best', rest: '30s',
            name: { ar: '٤×٢٥ بسرعة السباق', en: '4x25 at race pace' },
            purpose: { ar: 'ضبط إيقاع الضربة على سرعة السباق', en: 'Lock stroke rate to race pace' },
            component: 'speed'
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '100m', stroke: 'free', intensity: '100', basis: 'best', rest: '4min', restType: 'active',
            name: { ar: '٤×١٠٠ مقسمة (٥٠ + ٢٥ + ٢٥ بـ١٠ث عند كل حيطة)', en: '4x broken 100 (50 + 25 + 25, 10s at each wall)' },
            purpose: { ar: 'السباحة بزمن الـ١٠٠ الهدف (بعد طرح الراحات)', en: 'Swim the goal 100m time (rest subtracted)' },
            component: 'speed_endurance',
            note: { ar: 'أول ٥٠ من البلوك. الراحة ٤ دقايق سباحة سهلة. سجل الأزمنة ومعدل الضربات.', en: 'First 50 from the block. 4 min easy swim between. Log splits and stroke rate.' }
          },
          coolSwim(300, 6),
          {
            kind: 'swim', sets: 1, reps: '6', distance: '50m', stroke: 'free', intensity: '97', basis: 'best', rest: '2min',
            name: { ar: '٦×٥٠ بسرعة الـ١٠٠م (كل ٢:٣٠)', en: '6x50 at 100m race pace (on 2:30)' },
            purpose: { ar: 'تحمل لاكتات بسرعة السباق', en: 'Lactate tolerance at race speed' },
            component: 'anaerobic',
            note: { ar: 'من الحيطة، زمن كل ٥٠ = نص زمن الـ١٠٠ الهدف + ١ث', en: 'From a push; each 50 = half of goal 100 time + 1s' }
          },
          {
            kind: 'swim', libId: 'ad_freestyle_kick_sets', sets: 1, reps: '8', distance: '25m', stroke: 'kick', intensity: '90', basis: 'best', rest: '30s',
            purpose: { ar: 'رجلين قوية وهي متعبة زي آخر السباق', en: 'Strong kick under fatigue, like the end of the race' },
            component: 'anaerobic'
          },
          coolSwim(600, 12)
        ]
      },
      sa_test: {
        title: { ar: 'اختبار CSS + انطلاقة ١٥م', en: 'CSS test + 15m start' },
        goal: { ar: 'قياس CSS وسرعة الانطلاق لتحديث شدات الخطة.', en: 'Measure CSS and start speed to update plan intensities.' },
        components: ['threshold', 'speed'],
        rpe: 8,
        duration: 90,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٦٠٠ سباحة + ٤×٥٠ تصاعدي + ٢×٢٥ سريع', en: 'Warm-up: 600 swim + 4x50 build + 2x25 fast' }, distance: '850m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '400m', stroke: 'free', intensity: '10', basis: 'rpe', rest: '10min', restType: 'active',
            name: { ar: 'اختبار ٤٠٠م حرة (من الحيطة)', en: '400m freestyle time trial (push start)' },
            purpose: { ar: 'الزمن الأول لحساب CSS', en: 'First time for the CSS calculation' },
            component: 'threshold',
            note: { ar: 'سجل الزمن ومتوسط الضربات لكل ٥٠', en: 'Record the time and average strokes per 50' }
          },
          coolSwim(400, 10),
          {
            kind: 'swim', sets: 1, reps: '1', distance: '200m', stroke: 'free', intensity: '10', basis: 'rpe', rest: '10min', restType: 'active',
            name: { ar: 'اختبار ٢٠٠م حرة (من الحيطة)', en: '200m freestyle time trial (push start)' },
            purpose: { ar: 'الزمن التاني لحساب CSS', en: 'Second time for the CSS calculation' },
            component: 'threshold',
            note: { ar: 'CSS/١٠٠م = (زمن ٤٠٠ - زمن ٢٠٠) ÷ ٢', en: 'CSS per 100m = (T400 - T200) / 2' }
          },
          {
            kind: 'swim', sets: 1, reps: '2', distance: '15m', stroke: 'free', intensity: '100', basis: 'best', rest: '4min',
            name: { ar: '٢×١٥م انطلاق من البلوك (بالتوقيت)', en: '2x15m start from the block (timed)' },
            purpose: { ar: 'خط أساس لسرعة الانطلاق', en: 'Baseline for start speed' },
            component: 'reaction'
          },
          coolSwim(600, 12)
        ]
      },
      sa_sim: {
        title: { ar: 'محاكاة سباق — ١٠٠م و٥٠م', en: 'Race simulation — 100m and 50m' },
        goal: { ar: 'تجربة روتين الإحماء والسباق الفعلي وقياس التطور.', en: 'Rehearse the warm-up routine and actual races, and track progress.' },
        components: ['speed_endurance', 'speed', 'mental'],
        rpe: 9,
        duration: 100,
        items: [
          { kind: 'warmup', name: { ar: 'روتين إحماء البطولة: ٤٠٠ سهل + ٤×٥٠ تكنيك + ٤×٥٠ تصاعدي + ٢٠٠ سهل', en: 'Meet warm-up routine: 400 easy + 4x50 drill + 4x50 build + 200 easy' }, distance: '1200m', stroke: 'im' },
          {
            kind: 'swim', sets: 1, reps: '3', distance: '25m', stroke: 'free', intensity: '97', basis: 'best', rest: '1min',
            name: { ar: '٣×٢٥ بسرعة السباق من البلوك', en: '3x25 race pace from the block' },
            purpose: { ar: 'تنشيط قبل السباق', en: 'Pre-race activation' },
            component: 'speed'
          },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '100m', stroke: 'free', intensity: '100', basis: 'best', rest: '20min', restType: 'active',
            name: { ar: '١٠٠م حرة اختبار زمن من البلوك', en: '100m freestyle time trial from the block' },
            purpose: { ar: 'قياس الزمن وتوزيع الجهد (فرق الـ٥٠ الأولى والتانية)', en: 'Measure time and pacing (first vs second 50 split)' },
            component: 'speed_endurance',
            note: { ar: 'الهدف فرق الـ٥٠ الثانية عن الأولى ٢-٣ث بس. سجل الضربات.', en: 'Target a 2-3s gap between the 50 splits. Log stroke counts.' }
          },
          coolSwim(400, 10),
          {
            kind: 'swim', sets: 1, reps: '1', distance: '50m', stroke: 'free', intensity: '100', basis: 'best', rest: '10min',
            name: { ar: '٥٠م حرة اختبار زمن من البلوك', en: '50m freestyle time trial from the block' },
            purpose: { ar: 'السرعة القصوى بعد تعب سباق سابق (زي النهائيات)', en: 'Max speed after a previous race (like finals sessions)' },
            component: 'speed'
          },
          coolSwim(800, 15),
          { kind: 'mobility', libId: 'ex_shoulder_stretch', sets: 2, reps: '30s/side' }
        ]
      },
      sa_taper: {
        title: { ar: 'تهدئة — جودة بحجم قليل', en: 'Taper — low-volume quality' },
        goal: { ar: 'الحفاظ على الإحساس بالسرعة مع استشفاء كامل.', en: 'Keep the feel for speed while fully recovering.' },
        components: ['speed', 'speed_endurance', 'recovery'],
        rpe: 6,
        duration: 70,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سهل + ٤×١٠٠ متنوع تكنيك', en: 'Warm-up: 400 easy + 4x100 IM drill' }, distance: '800m', stroke: 'im' },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '50m', stroke: 'free', intensity: '5', basis: 'rpe', rest: '15s',
            name: { ar: '٦×٥٠ بعدد ضربات السباق', en: '6x50 holding race stroke count' },
            purpose: { ar: 'ضبط طول الضربة', en: 'Stroke-length control' },
            component: 'technique'
          },
          {
            kind: 'swim', sets: 3, reps: '2', distance: '25m', stroke: 'free', intensity: '97', basis: 'best', rest: '1min', setRest: '3min',
            name: { ar: '٣ × (٢×٢٥ بسرعة السباق من البلوك)', en: '3 x (2x25 race pace from the block)' },
            purpose: { ar: 'سرعة عصبية بدون تعب', en: 'Neural speed without fatigue' },
            component: 'speed'
          },
          {
            kind: 'swim', sets: 1, reps: '2', distance: '100m', stroke: 'free', intensity: '98', basis: 'best', rest: '6min', restType: 'active',
            name: { ar: '٢×١٠٠ مقسمة (٥٠ + ٢٥ + ٢٥ بـ١٠ث)', en: '2x broken 100 (50 + 25 + 25, 10s)' },
            purpose: { ar: 'تأكيد إيقاع السباق', en: 'Confirm race rhythm' },
            component: 'speed_endurance'
          },
          {
            kind: 'drill', sets: 1, reps: '4', distance: '15m',
            name: { ar: 'خروج من الحيطة ١٥م (دوران + دولفين)', en: '15m breakouts (turn + dolphin)' },
            purpose: { ar: 'دقة الدوران والخروج', en: 'Turn and breakout precision' },
            component: 'technique'
          },
          coolSwim(400, 8)
        ]
      },
      sa_gym_str: {
        title: { ar: 'جيم — قوة قصوى', en: 'Gym — max strength' },
        goal: { ar: 'رفع القوة القصوى للرجلين والشد مع حماية الكتف.', en: 'Raise max leg and pulling strength while protecting the shoulder.' },
        components: ['max_strength', 'core', 'prevention'],
        rpe: 7,
        duration: 75,
        items: [
          ...DRY_WARMUP,
          {
            kind: 'strength', libId: 'ex_barbell_back_squat', sets: 4, reps: '5', intensity: '80', basis: '1rm', tempo: '3-0-X-0', rest: '3min',
            purpose: { ar: 'قوة قصوى للرجلين — أساس الانطلاق والدفع من الحيطة', en: 'Max leg strength — base for starts and wall push-offs' },
            component: 'max_strength',
            note: { ar: 'في الأسبوع الصادم ٤×٤ على ٨٥%', en: 'Shock week: 4x4 at 85%' }
          },
          {
            kind: 'strength', libId: 'wg_weighted_pull_up', sets: 4, reps: '5', intensity: '8', basis: 'rpe', tempo: '2-0-X-1', rest: '2.5min',
            purpose: { ar: 'قوة الشد (اللاتس) — المحرك الأساسي في الحرة', en: 'Pulling (lat) strength — the main engine of freestyle' },
            component: 'max_strength'
          },
          {
            kind: 'strength', libId: 'ex_romanian_deadlift', sets: 3, reps: '6', intensity: '75', basis: '1rm', tempo: '3-0-1-0', rest: '2min',
            purpose: { ar: 'قوة السلسلة الخلفية للدولفين والانطلاق', en: 'Posterior-chain strength for dolphin kick and starts' },
            component: 'strength'
          },
          {
            kind: 'strength', libId: 'ex_dumbbell_bench_press', sets: 3, reps: '8', intensity: '2', basis: 'rir', tempo: '2-0-1-0', rest: '90s',
            purpose: { ar: 'قوة الدفع وتوازن الكتف', en: 'Pushing strength and shoulder balance' },
            component: 'strength'
          },
          {
            kind: 'strength', libId: 'ex_bulgarian_split_squat', sets: 3, reps: '6/leg', intensity: '7', basis: 'rpe', tempo: '2-0-1-0', rest: '90s',
            purpose: { ar: 'قوة رجل واحدة للانطلاق بقدم متقدمة', en: 'Single-leg strength for the track-start stance' },
            component: 'strength'
          },
          {
            kind: 'strength', libId: 'ex_hollow_body_hold', sets: 3, reps: '30s', intensity: '7', basis: 'rpe', rest: '45s',
            purpose: { ar: 'ثبات الجذع للستريم لاين', en: 'Trunk stiffness for streamline' },
            component: 'core'
          },
          ...SHOULDER_PREHAB,
          { kind: 'mobility', libId: 'ex_hip_flexor_stretch', sets: 2, reps: '30s/side' }
        ]
      },
      sa_gym_pow: {
        title: { ar: 'جيم — قدرة انفجارية', en: 'Gym — power' },
        goal: { ar: 'تحويل القوة القصوى لقدرة سريعة للانطلاق والدوران.', en: 'Convert max strength into fast power for starts and turns.' },
        components: ['power', 'max_strength', 'prevention'],
        rpe: 7,
        duration: 65,
        items: [
          ...DRY_WARMUP,
          {
            kind: 'strength', libId: 'ad_hang_power_clean', sets: 4, reps: '3', intensity: '70', basis: '1rm', tempo: 'X', rest: '2.5min',
            purpose: { ar: 'مد الورك الانفجاري — نفس حركة الدفع من البلوك', en: 'Explosive hip extension — same pattern as the block push' },
            component: 'power'
          },
          {
            kind: 'strength', libId: 'ad_trap_bar_jump', sets: 4, reps: '3', intensity: '30', basis: '1rm', tempo: 'X', rest: '2min',
            purpose: { ar: 'قدرة الرجلين بحمل خفيف وسرعة عالية', en: 'Leg power with light load and high velocity' },
            component: 'power',
            note: { ar: '٣٠% من ١RM الديدليفت بالتراب بار', en: '30% of trap-bar deadlift 1RM' }
          },
          {
            kind: 'drill', libId: 'ad_broad_jump', sets: 4, reps: '3', rest: '90s',
            purpose: { ar: 'قدرة أفقية تشبه الانطلاق من البلوك', en: 'Horizontal power similar to the dive start' },
            component: 'power'
          },
          {
            kind: 'strength', libId: 'ex_barbell_back_squat', sets: 3, reps: '3', intensity: '85', basis: '1rm', tempo: '2-0-X-0', rest: '3min',
            purpose: { ar: 'الحفاظ على القوة القصوى', en: 'Maintain max strength' },
            component: 'max_strength'
          },
          {
            kind: 'strength', libId: 'wg_weighted_pull_up', sets: 4, reps: '3', intensity: '8', basis: 'rpe', tempo: '1-0-X-0', rest: '2min',
            purpose: { ar: 'شد سريع قوي', en: 'Fast, strong pulling' },
            component: 'power'
          },
          {
            kind: 'drill', libId: 'ex_medicine_ball_slam', sets: 3, reps: '6', rest: '60s',
            purpose: { ar: 'قدرة الشد من فوق الراس (زي الكاتش)', en: 'Overhead pulling power (catch pattern)' },
            component: 'power',
            note: { ar: 'كرة ٤-٦ كجم', en: '4-6 kg ball' }
          },
          ...SHOULDER_PREHAB,
          { kind: 'mobility', libId: 'ex_thoracic_rotation', sets: 2, reps: '8/side' }
        ]
      },
      sa_meet: {
        title: { ar: 'يوم البطولة', en: 'Meet day' },
        goal: { ar: 'تنفيذ روتين الإحماء والسباق والتهدئة بدقة.', en: 'Execute warm-up, race and swim-down routine precisely.' },
        components: ['speed', 'speed_endurance', 'mental'],
        rpe: 9,
        duration: 150,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء المسبح: ٤٠٠ سهل + ٤×٥٠ تكنيك + ٤×٥٠ تصاعدي + ٢-٣ انطلاقات ٢٥م + ٢٠٠ سهل', en: 'Pool warm-up: 400 easy + 4x50 drill + 4x50 build + 2-3 dive 25s + 200 easy' }, distance: '1400m', stroke: 'im' },
          { kind: 'warmup', libId: 'ex_band_pull_apart', sets: 2, reps: '15', name: { ar: 'تنشيط قبل النداء: فتح أستك + ٣ نطات', en: 'Pre-call activation: band pull-aparts + 3 jumps' } },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '100m', stroke: 'free', intensity: '100', basis: 'best', rest: '3-6h',
            name: { ar: 'السباق: ١٠٠م / ٥٠م حرة (تمهيدي ثم نهائي)', en: 'Race: 100m / 50m freestyle (heats then finals)' },
            purpose: { ar: 'تحقيق أحسن زمن', en: 'Achieve a best time' },
            component: 'speed_endurance',
            note: { ar: 'إحماء قصير (٦٠٠م) قبل النهائي', en: 'Short warm-up (600m) before finals' }
          },
          coolSwim(800, 15),
          { kind: 'mobility', libId: 'ex_shoulder_stretch', sets: 2, reps: '30s/side' }
        ]
      }
    }
  },

  /* =========================================================
   * 2) سباحة مسافات ٤٠٠-١٥٠٠م — متوسط — ١٦ أسبوع
   * ========================================================= */
  {
    id: 'pt_swimming_distance_int',
    sport: 'swimming',
    level: 'intermediate',
    title: { ar: 'موسم سباحة مسافات ٤٠٠-١٥٠٠م — متوسط', en: 'Distance freestyle 400-1500m season — intermediate' },
    goal: {
      ar: 'رفع CSS بـ٣-٥ ثواني/١٠٠م من خلال قاعدة هوائية وعتبة، وبعدين تحويلها لسرعة سباق ٤٠٠ و١٥٠٠م مع توزيع جهد متساوي.',
      en: 'Improve CSS by 3-5 s/100m through aerobic base and threshold work, then convert it to 400/1500m race pace with even pacing.'
    },
    components: ['aerobic', 'threshold', 'vo2max', 'muscular_endurance', 'technique'],
    sessionsPerWeek: 6,
    periods: [
      {
        type: 'gpp',
        goal: {
          ar: 'اختبار CSS، قاعدة هوائية (١٨-٢٤ كم/أسبوع)، تكنيك حرة وتنفس في الناحيتين، وجيم عام.',
          en: 'CSS test, aerobic base (18-24 km/week), freestyle technique and bilateral breathing, general dryland.'
        },
        components: ['aerobic', 'technique', 'strength'],
        blocks: [
          {
            name: { ar: 'أسبوع اختبار CSS', en: 'CSS test week' },
            goal: { ar: 'تحديد CSS وتقييم التكنيك (عدد ومعدل الضربات).', en: 'Establish CSS and assess technique (stroke count and rate).' },
            components: ['threshold', 'technique'],
            loads: [4],
            weekTypes: ['test'],
            pattern: ['dt_test', 'dt_tech', 'dt_aero', 'dt_dry', 'dt_tech', 'dt_aero', '']
          },
          {
            name: { ar: 'بلوك ١ — قاعدة هوائية', en: 'Block 1 — Aerobic base' },
            goal: { ar: 'حجم متصاعد تحت CSS، دراعات ورجلين، وتكنيك يومي.', en: 'Rising volume below CSS, pull and kick, daily technique.' },
            components: ['aerobic', 'muscular_endurance', 'technique'],
            loads: [5, 6, 7, 4],
            weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['dt_aero', 'dt_dry', 'dt_css', 'dt_tech', 'dt_pull', 'dt_aero', '']
          }
        ]
      },
      {
        type: 'spp',
        goal: {
          ar: 'تطوير العتبة: مجموعات طويلة على CSS و CSS+2s، وقوة تحمل بالبادلز، ثم إعادة الاختبار.',
          en: 'Threshold development: long sets at CSS and CSS+2s, paddle strength-endurance, then retest.'
        },
        components: ['threshold', 'aerobic', 'muscular_endurance'],
        blocks: [
          {
            name: { ar: 'بلوك ٢ — عتبة CSS', en: 'Block 2 — CSS threshold' },
            goal: { ar: 'مرتين عتبة في الأسبوع مع الحفاظ على الحجم الهوائي.', en: 'Two threshold sessions per week while keeping aerobic volume.' },
            components: ['threshold', 'aerobic'],
            loads: [6, 7, 8, 4],
            weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['dt_css', 'dt_dry', 'dt_aero', 'dt_css', 'dt_pull', 'dt_aero', '']
          },
          {
            name: { ar: 'إعادة اختبار CSS', en: 'CSS retest' },
            goal: { ar: 'قياس التحسن وتحديث سرعات سرعة السباق.', en: 'Measure progress and update race-pace targets.' },
            components: ['threshold', 'recovery'],
            loads: [5],
            weekTypes: ['test'],
            pattern: ['dt_test', 'dt_tech', 'dt_aero', 'dt_dry', 'dt_pull', 'dt_aero', '']
          }
        ]
      },
      {
        type: 'precomp',
        goal: {
          ar: 'سرعة سباق ٤٠٠ و١٥٠٠م، VO2max بفترات ١٠٠م، وتوزيع جهد سلبي (النص التاني أسرع).',
          en: '400 and 1500m race pace, VO2max 100m repeats, and negative-split pacing.'
        },
        components: ['vo2max', 'threshold', 'speed_endurance'],
        blocks: [
          {
            name: { ar: 'بلوك ٣ — سرعة السباق', en: 'Block 3 — Race pace' },
            goal: { ar: '١٥٠٠ مقسمة، ٤×(٤×١٠٠) أسرع من CSS، وجودة عالية.', en: 'Broken 1500s, 4x(4x100) faster than CSS, high quality.' },
            components: ['vo2max', 'speed_endurance', 'threshold'],
            loads: [7, 8, 6],
            weekTypes: ['load', 'shock', 'load'],
            pattern: ['dt_race', 'dt_dry', 'dt_aero', 'dt_vo2', 'dt_tech', 'dt_css', '']
          }
        ]
      },
      {
        type: 'taper',
        goal: {
          ar: 'تهدئة ٣ أسابيع (الحجم -٢٥% ثم -٤٠% ثم -٥٥%) مع لمسات بسرعة السباق.',
          en: '3-week taper (volume -25%, -40%, -55%) with race-pace touches.'
        },
        components: ['threshold', 'recovery', 'mental'],
        blocks: [
          {
            name: { ar: 'بلوك ٤ — تهدئة وبطولة', en: 'Block 4 — Taper and meet' },
            goal: { ar: 'وصول للبطولة مرتاح مع إحساس قوي بسرعة السباق.', en: 'Arrive at the meet rested with a sharp feel for race pace.' },
            components: ['recovery', 'speed_endurance', 'mental'],
            loads: [5, 4, 3],
            weekTypes: ['taper', 'taper', 'comp'],
            pattern: ['dt_taper', 'dt_tech', 'dt_css', 'dt_taper', 'dt_tech', 'dt_meet', '']
          }
        ]
      }
    ],
    sessions: {
      dt_test: {
        title: { ar: 'اختبار CSS (٤٠٠ + ٢٠٠م)', en: 'CSS test (400 + 200m)' },
        goal: { ar: 'تحديد CSS اللي بتتبني عليه كل الشدات.', en: 'Set the CSS every intensity is built on.' },
        components: ['threshold', 'technique'],
        rpe: 8,
        duration: 75,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سهل + ٤×٥٠ تكنيك + ٤×٥٠ تصاعدي', en: 'Warm-up: 400 easy + 4x50 drill + 4x50 build' }, distance: '800m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '400m', stroke: 'free', intensity: '10', basis: 'rpe', rest: '10min', restType: 'active',
            name: { ar: 'اختبار ٤٠٠م حرة', en: '400m freestyle time trial' },
            purpose: { ar: 'الزمن الأول لحساب CSS', en: 'First time for CSS' },
            component: 'threshold',
            note: { ar: 'سجل زمن كل ١٠٠ ومتوسط الضربات لكل ٥٠', en: 'Record every 100 split and average strokes per 50' }
          },
          coolSwim(300, 10),
          {
            kind: 'swim', sets: 1, reps: '1', distance: '200m', stroke: 'free', intensity: '10', basis: 'rpe', rest: '10min', restType: 'active',
            name: { ar: 'اختبار ٢٠٠م حرة', en: '200m freestyle time trial' },
            purpose: { ar: 'الزمن التاني لحساب CSS', en: 'Second time for CSS' },
            component: 'threshold',
            note: { ar: 'CSS/١٠٠م = (زمن ٤٠٠ - زمن ٢٠٠) ÷ ٢', en: 'CSS per 100m = (T400 - T200) / 2' }
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '50m', stroke: 'free', intensity: 'CSS', basis: 'css', rest: '20s',
            name: { ar: '٤×٥٠ على CSS — عد الضربات والإيقاع', en: '4x50 at CSS — count strokes and rate' },
            purpose: { ar: 'مرجع للتكنيك على سرعة العتبة', en: 'Technique reference at threshold speed' },
            component: 'technique'
          },
          coolSwim(400, 8)
        ]
      },
      dt_aero: {
        title: { ar: 'تحمل هوائي طويل — ٥٠٠٠م', en: 'Long aerobic — 5000m' },
        goal: { ar: 'تطوير القاعدة الهوائية وثبات السرعة لمسافات طويلة.', en: 'Develop the aerobic base and pace consistency over long distances.' },
        components: ['aerobic', 'muscular_endurance'],
        rpe: 5,
        duration: 100,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٢٠٠ حرة + ٢٠٠ ظهر + ٢٠٠ رجلين', en: 'Warm-up: 200 free + 200 back + 200 kick' }, distance: '600m', stroke: 'im' },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '50m', stroke: 'drill', intensity: '4', basis: 'rpe', rest: '15s',
            name: { ar: '٨×٥٠ تكنيك (دراع واحد / لمس الإبط / سحب الأصابع)', en: '8x50 drill (single-arm / zipper / fingertip drag)' },
            purpose: { ar: 'تجهيز التكنيك قبل الحجم', en: 'Set technique before the volume' },
            component: 'technique'
          },
          {
            kind: 'swim', sets: 1, reps: '3', distance: '800m', stroke: 'free', intensity: 'CSS+6s', basis: 'css', rest: '30s',
            name: { ar: '٣×٨٠٠ حرة (تنفس ٣ / ٥)', en: '3x800 free (breathe 3 / 5)' },
            purpose: { ar: 'تحمل هوائي منطقة ٢ مع تنفس في الناحيتين', en: 'Zone 2 aerobic endurance with bilateral breathing' },
            component: 'aerobic',
            note: { ar: 'كل ٨٠٠ النص التاني أسرع شوية (نيجاتيف سبليت)', en: 'Negative split each 800' }
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '200m', stroke: 'pull', intensity: 'CSS+4s', basis: 'css', rest: '20s',
            name: { ar: '٤×٢٠٠ دراعات بالعوامة', en: '4x200 pull with buoy' },
            purpose: { ar: 'قوة تحمل الشد', en: 'Pulling strength-endurance' },
            component: 'muscular_endurance'
          },
          {
            kind: 'swim', libId: 'ad_freestyle_kick_sets', sets: 1, reps: '6', distance: '100m', stroke: 'kick', intensity: '5', basis: 'rpe', rest: '15s',
            purpose: { ar: 'تحمل الرجلين وثبات وضع الجسم', en: 'Kick endurance and body position' },
            component: 'muscular_endurance'
          },
          coolSwim(200, 5),
          { kind: 'mobility', libId: 'ad_sleeper_stretch', sets: 2, reps: '30s/side' }
        ]
      },
      dt_tech: {
        title: { ar: 'تكنيك واستشفاء نشط', en: 'Technique and active recovery' },
        goal: { ar: 'كفاءة الضربة ومسافة أطول لكل ضربة بمجهود خفيف.', en: 'Stroke efficiency and longer distance per stroke at low effort.' },
        components: ['technique', 'recovery', 'aerobic'],
        rpe: 4,
        duration: 70,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سهل', en: 'Warm-up: 400 easy' }, distance: '400m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '10', distance: '50m', stroke: 'drill', intensity: '4', basis: 'rpe', rest: '15s',
            name: { ar: '١٠×٥٠ تكنيك (دراع واحد / كاتش أب / ٦-٣-٦ / قبضة)', en: '10x50 drill (single-arm / catch-up / 6-3-6 / fist)' },
            purpose: { ar: 'مسكة كوع عالي ودوران الجسم', en: 'High-elbow catch and body rotation' },
            component: 'technique'
          },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '100m', stroke: 'free', intensity: 'CSS+8s', basis: 'css', rest: '15s',
            name: { ar: '٨×١٠٠ حرة — عدد ضربات أقل', en: '8x100 free — fewer strokes' },
            purpose: { ar: 'مسافة أطول لكل ضربة (DPS)', en: 'More distance per stroke (DPS)' },
            component: 'technique',
            note: { ar: 'استخدم التمبو ترينر لو متاح (٥٥-٦٠ ضربة/دقيقة)', en: 'Use a tempo trainer if available (55-60 strokes/min)' }
          },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '50m', stroke: 'kick', intensity: '4', basis: 'rpe', rest: '15s',
            name: { ar: '٨×٥٠ رجلين على الجنب (دراع ممدود)', en: '8x50 side kick (extended arm)' },
            purpose: { ar: 'وضع الجسم والتوازن للتنفس', en: 'Body position and balance for breathing' },
            component: 'technique'
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '100m', stroke: 'im', intensity: '5', basis: 'rpe', rest: '20s',
            name: { ar: '٤×١٠٠ متنوع سهل', en: '4x100 easy IM' },
            purpose: { ar: 'تنويع الحمل على الكتف', en: 'Vary shoulder loading' },
            component: 'coordination'
          },
          coolSwim(200, 5)
        ]
      },
      dt_css: {
        title: { ar: 'عتبة CSS — ٤٤٠٠م', en: 'CSS threshold — 4400m' },
        goal: { ar: 'رفع سرعة العتبة وتحمل حجم طويل عليها.', en: 'Raise threshold speed and sustain long volume at it.' },
        components: ['threshold', 'aerobic'],
        rpe: 7,
        duration: 90,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سباحة + ٢٠٠ رجلين + ٤×٥٠ تصاعدي', en: 'Warm-up: 400 swim + 200 kick + 4x50 build' }, distance: '800m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '400m', stroke: 'free', intensity: 'CSS+2s', basis: 'css', rest: '30s',
            name: { ar: 'الأساسي أ: ٤×٤٠٠ حرة', en: 'Main A: 4x400 free' },
            purpose: { ar: 'عتبة بفترات طويلة — قريب من إيقاع الـ١٥٠٠', en: 'Long-interval threshold — close to 1500m rhythm' },
            component: 'threshold',
            note: { ar: 'أزمنة الـ١٠٠ جوه كل ٤٠٠ متساوية (±١ث)', en: 'Keep 100 splits within each 400 even (±1s)' }
          },
          {
            kind: 'swim', sets: 1, reps: '10', distance: '100m', stroke: 'free', intensity: 'CSS-1s', basis: 'css', rest: '15s',
            name: { ar: 'الأساسي ب: ١٠×١٠٠ حرة', en: 'Main B: 10x100 free' },
            purpose: { ar: 'عتبة عالية بفترات قصيرة', en: 'Upper threshold with short repeats' },
            component: 'threshold'
          },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '50m', stroke: 'kick', intensity: '6', basis: 'rpe', rest: '15s',
            name: { ar: '٦×٥٠ رجلين', en: '6x50 kick' },
            purpose: { ar: 'تحمل الرجلين', en: 'Kick endurance' },
            component: 'muscular_endurance'
          },
          coolSwim(300, 6)
        ]
      },
      dt_pull: {
        title: { ar: 'دراعات وقوة تحمل — ٤٥٠٠م', en: 'Pull and strength-endurance — 4500m' },
        goal: { ar: 'قوة الشد في الماية وتحمل عضلي للدراعات والرجلين.', en: 'In-water pulling strength and arm/leg muscular endurance.' },
        components: ['muscular_endurance', 'aerobic', 'strength'],
        rpe: 6,
        duration: 90,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سباحة + ٢٠٠ متنوع', en: 'Warm-up: 400 swim + 200 IM' }, distance: '600m', stroke: 'im' },
          {
            kind: 'swim', sets: 1, reps: '5', distance: '300m', stroke: 'pull', intensity: 'CSS+3s', basis: 'css', rest: '20s',
            name: { ar: '٥×٣٠٠ دراعات بالبادلز والعوامة', en: '5x300 pull with paddles and buoy' },
            purpose: { ar: 'قوة تحمل الشد — مسكة قوية طول المسافة', en: 'Pulling strength-endurance — strong catch throughout' },
            component: 'muscular_endurance',
            note: { ar: 'بادلز متوسطة الحجم؛ لو في ألم كتف شيلها', en: 'Medium paddles; remove if any shoulder pain' }
          },
          {
            kind: 'swim', libId: 'ad_freestyle_kick_sets', sets: 1, reps: '12', distance: '50m', stroke: 'kick', intensity: '7', basis: 'rpe', rest: '15s',
            purpose: { ar: 'رجلين قوية للدفعة الأخيرة في السباق', en: 'A strong kick for the final push of a race' },
            component: 'muscular_endurance'
          },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '200m', stroke: 'free', intensity: 'CSS+4s', basis: 'css', rest: '20s',
            name: { ar: '٦×٢٠٠ حرة (فردي تنفس ٥)', en: '6x200 free (odds breathe every 5)' },
            purpose: { ar: 'تحمل هوائي مع التحكم في التنفس', en: 'Aerobic endurance with breathing control' },
            component: 'aerobic'
          },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '25m', stroke: 'free', intensity: '9', basis: 'rpe', rest: '20s',
            name: { ar: '٨×٢٥ سريع', en: '8x25 fast' },
            purpose: { ar: 'الحفاظ على السرعة', en: 'Keep speed in touch' },
            component: 'speed'
          },
          coolSwim(300, 6)
        ]
      },
      dt_vo2: {
        title: { ar: 'VO2max — ١٠٠م أسرع من CSS', en: 'VO2max — 100s faster than CSS' },
        goal: { ar: 'رفع الحد الأقصى لاستهلاك الأكسجين وسرعة الـ٤٠٠م.', en: 'Raise VO2max and 400m speed.' },
        components: ['vo2max', 'speed_endurance'],
        rpe: 8,
        duration: 85,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سباحة + ٢٠٠ رجلين + ٤×١٠٠ تصاعدي', en: 'Warm-up: 400 swim + 200 kick + 4x100 build' }, distance: '1000m', stroke: 'free' },
          {
            kind: 'swim', sets: 4, reps: '4', distance: '100m', stroke: 'free', intensity: 'CSS-3s', basis: 'css', rest: '20s', setRest: '2min',
            name: { ar: '٤ × (٤×١٠٠ حرة)', en: '4 x (4x100 free)' },
            purpose: { ar: 'تحفيز VO2max بسرعة الـ٤٠٠م', en: 'VO2max stimulus at 400m pace' },
            component: 'vo2max',
            note: { ar: 'بين المجموعات ١٠٠ سهل', en: 'Easy 100 between rounds' }
          },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '50m', stroke: 'free', intensity: 'CSS-4s', basis: 'css', rest: '20s',
            name: { ar: '٨×٥٠ بسرعة ٤٠٠م الهدف', en: '8x50 at goal 400m pace' },
            purpose: { ar: 'تثبيت إيقاع السباق', en: 'Lock in race rhythm' },
            component: 'speed_endurance'
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '25m', stroke: 'free', intensity: '95', basis: 'best', rest: '40s',
            name: { ar: '٤×٢٥ سبرنت', en: '4x25 sprint' },
            purpose: { ar: 'سرعة للنهاية القوية', en: 'Speed for a strong finish' },
            component: 'speed'
          },
          coolSwim(400, 8)
        ]
      },
      dt_race: {
        title: { ar: '١٥٠٠ مقسمة بسرعة السباق', en: 'Broken 1500 at race pace' },
        goal: { ar: 'التعود على سرعة الـ١٥٠٠ الهدف وتوزيع الجهد.', en: 'Rehearse goal 1500m pace and pacing.' },
        components: ['threshold', 'speed_endurance', 'mental'],
        rpe: 8,
        duration: 85,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٦٠٠ سباحة + ٤×١٠٠ (٥٠ تكنيك / ٥٠ تصاعدي)', en: 'Warm-up: 600 swim + 4x100 (50 drill / 50 build)' }, distance: '1000m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '15', distance: '100m', stroke: 'free', intensity: 'CSS', basis: 'css', rest: '10s',
            name: { ar: '١٥٠٠ مقسمة: ١٥×١٠٠ براحة ١٠ث', en: 'Broken 1500: 15x100 on 10s rest' },
            purpose: { ar: 'سرعة الـ١٥٠٠ الهدف (≈ CSS)', en: 'Goal 1500m pace (≈ CSS)' },
            component: 'threshold',
            note: { ar: 'آخر ٣ أسرع ١-٢ث. الزمن الكلي ناقص الراحات = زمن الـ١٥٠٠ المتوقع.', en: 'Last 3 faster by 1-2s. Total time minus rest = predicted 1500 time.' }
          },
          coolSwim(300, 6),
          {
            kind: 'swim', sets: 1, reps: '4', distance: '50m', stroke: 'free', intensity: 'CSS-4s', basis: 'css', rest: '30s',
            name: { ar: '٤×٥٠ نهاية قوية', en: '4x50 fast finish' },
            purpose: { ar: 'تسريع في آخر السباق وهو متعب', en: 'Finishing kick under fatigue' },
            component: 'speed_endurance'
          },
          coolSwim(400, 8)
        ]
      },
      dt_dry: {
        title: { ar: 'تمرين أرضي — قوة ووقاية', en: 'Dryland — strength and prevention' },
        goal: { ar: 'قوة عامة للشد والجذع ووقاية الكتف.', en: 'General pulling and trunk strength and shoulder prevention.' },
        components: ['strength', 'core', 'prevention'],
        rpe: 6,
        duration: 55,
        items: [
          ...DRY_WARMUP,
          {
            kind: 'strength', libId: 'ex_goblet_squat', sets: 3, reps: '10', intensity: '7', basis: 'rpe', tempo: '3-0-1-0', rest: '75s',
            purpose: { ar: 'قوة رجلين للدفع من الحيطة', en: 'Leg strength for wall push-offs' },
            component: 'strength'
          },
          {
            kind: 'strength', libId: 'ex_pullup', sets: 3, reps: '6-8', intensity: '2', basis: 'rir', tempo: '2-0-1-1', rest: '90s',
            purpose: { ar: 'قوة الشد العمودي', en: 'Vertical pulling strength' },
            component: 'strength',
            note: { ar: 'بالمساعدة لو أقل من ٦ عدات', en: 'Assisted if fewer than 6 reps' }
          },
          {
            kind: 'strength', libId: 'ex_single_leg_rdl', sets: 3, reps: '8/leg', intensity: '7', basis: 'rpe', tempo: '3-0-1-0', rest: '60s',
            purpose: { ar: 'سلسلة خلفية وثبات الحوض', en: 'Posterior chain and pelvic stability' },
            component: 'strength'
          },
          {
            kind: 'strength', libId: 'ek_body_row', sets: 3, reps: '12', intensity: '7', basis: 'rpe', tempo: '2-1-1-0', rest: '60s',
            purpose: { ar: 'عضلات لوح الكتف وتوازن الكتف', en: 'Scapular muscles and shoulder balance' },
            component: 'prevention'
          },
          {
            kind: 'strength', libId: 'ex_dead_bug', sets: 3, reps: '10/side', intensity: '6', basis: 'rpe', tempo: '3-1-3-0', rest: '45s',
            purpose: { ar: 'ثبات الجذع ضد التقوس', en: 'Anti-extension trunk control' },
            component: 'core'
          },
          ...SHOULDER_PREHAB,
          { kind: 'mobility', libId: 'ad_foam_roller_thoracic_extension', sets: 1, reps: '10' }
        ]
      },
      dt_taper: {
        title: { ar: 'تهدئة — سرعة سباق بحجم قليل', en: 'Taper — race pace, low volume' },
        goal: { ar: 'الحفاظ على الإحساس بسرعة السباق مع استشفاء.', en: 'Keep race-pace feel while recovering.' },
        components: ['speed_endurance', 'recovery'],
        rpe: 5,
        duration: 60,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سهل + ٤×٥٠ تكنيك', en: 'Warm-up: 400 easy + 4x50 drill' }, distance: '600m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '3', distance: '200m', stroke: 'free', intensity: 'CSS-2s', basis: 'css', rest: '45s',
            name: { ar: '٣×٢٠٠ بسرعة السباق', en: '3x200 at race pace' },
            purpose: { ar: 'تأكيد إيقاع السباق', en: 'Confirm race rhythm' },
            component: 'speed_endurance'
          },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '50m', stroke: 'free', intensity: '6-8', basis: 'rpe', rest: '20s',
            name: { ar: '٦×٥٠ تصاعدي', en: '6x50 build' },
            purpose: { ar: 'حيوية بدون تعب', en: 'Sharpness without fatigue' },
            component: 'speed'
          },
          {
            kind: 'drill', sets: 1, reps: '4',
            name: { ar: '٤ انطلاقات + ٤ دورانات بسرعة السباق', en: '4 starts + 4 turns at race speed' },
            purpose: { ar: 'تجهيز الانطلاق والدوران', en: 'Prepare starts and turns' },
            component: 'technique'
          },
          coolSwim(400, 8)
        ]
      },
      dt_meet: {
        title: { ar: 'يوم البطولة — ٤٠٠ / ١٥٠٠م', en: 'Meet day — 400 / 1500m' },
        goal: { ar: 'تنفيذ خطة توزيع الجهد وتحقيق أحسن زمن.', en: 'Execute the pacing plan and swim a best time.' },
        components: ['threshold', 'mental'],
        rpe: 9,
        duration: 120,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٦٠٠ سهل + ٤×١٠٠ تصاعدي + ٤×٥٠ بسرعة السباق + ٢٠٠ سهل', en: 'Warm-up: 600 easy + 4x100 build + 4x50 race pace + 200 easy' }, distance: '1400m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '1500m', stroke: 'free', intensity: 'CSS-1s', basis: 'css', rest: 'n/a',
            name: { ar: 'السباق: ١٥٠٠م (أو ٤٠٠م)', en: 'Race: 1500m (or 400m)' },
            purpose: { ar: 'أحسن زمن بتوزيع جهد متساوي أو نيجاتيف', en: 'Best time with even or negative split' },
            component: 'threshold',
            note: { ar: 'أول ١٠٠ مش أسرع من الخطة بأكتر من ٢ث', en: 'First 100 no more than 2s faster than plan' }
          },
          coolSwim(600, 12),
          { kind: 'mobility', libId: 'ex_shoulder_stretch', sets: 2, reps: '30s/side' }
        ]
      }
    }
  },

  /* =========================================================
   * 3) ناشئين — تأسيس ٤ طرق — مبتدئ — ١٢ أسبوع
   * ========================================================= */
  {
    id: 'pt_swimming_agegroup_beg',
    sport: 'swimming',
    level: 'beginner',
    title: { ar: 'تأسيس ناشئين — الأربع طرق والانطلاق والدوران', en: 'Age-group development — all four strokes, starts and turns' },
    goal: {
      ar: 'تعليم وتثبيت تكنيك الحرة والظهر والصدر والفراشة، الرجلين والستريم لاين، والانطلاق والدوران القانوني، والوصول لأول بطولة نادي بثقة.',
      en: 'Teach and consolidate freestyle, backstroke, breaststroke and butterfly technique, kick and streamline, legal starts and turns, and reach a first club gala with confidence.'
    },
    components: ['technique', 'coordination', 'aerobic', 'speed'],
    sessionsPerWeek: 4,
    periods: [
      {
        type: 'gpp',
        goal: {
          ar: 'تقييم أولي، ثم تأسيس الحرة والظهر: وضع الجسم، الستريم لاين، الرجلين، والتنفس الجانبي.',
          en: 'Initial assessment, then freestyle and backstroke foundations: body position, streamline, kick and side breathing.'
        },
        components: ['technique', 'coordination', 'aerobic'],
        blocks: [
          {
            name: { ar: 'أسبوع تقييم', en: 'Assessment week' },
            goal: { ar: 'تقييم التكنيك في الأربع طرق وأزمنة ٢٥م كخط أساس.', en: 'Assess technique in all four strokes and 25m times as a baseline.' },
            components: ['technique', 'speed'],
            loads: [3],
            weekTypes: ['test'],
            pattern: ['ag_test', '', 'ag_fb', '', 'ag_kick', 'ag_dry', '']
          },
          {
            name: { ar: 'بلوك ١ — حرة وظهر', en: 'Block 1 — Freestyle and backstroke' },
            goal: { ar: 'وضع جسم أفقي، رجلين مستمرة، تنفس كل ٣ ضربات، ودوران الكتف في الظهر.', en: 'Horizontal body line, continuous kick, breathing every 3 strokes and shoulder roll in backstroke.' },
            components: ['technique', 'coordination', 'aerobic'],
            loads: [4, 5, 3],
            weekTypes: ['load', 'load', 'deload'],
            pattern: ['ag_fb', '', 'ag_kick', '', 'ag_fb', 'ag_dry', '']
          }
        ]
      },
      {
        type: 'spp',
        goal: {
          ar: 'تأسيس الصدر والفراشة وربط الأربع طرق في المتنوع، مع زيادة بسيطة في المسافة.',
          en: 'Breaststroke and butterfly foundations and linking all four strokes in IM, with a small rise in distance.'
        },
        components: ['technique', 'coordination', 'aerobic'],
        blocks: [
          {
            name: { ar: 'بلوك ٢ — صدر وفراشة ومتنوع', en: 'Block 2 — Breaststroke, butterfly and IM' },
            goal: { ar: 'توقيت الصدر (شد - نفس - رجل - انزلاق) وتموج الفراشة، وأول ١٠٠ متنوع.', en: 'Breaststroke timing (pull-breathe-kick-glide), butterfly undulation, and a first 100 IM.' },
            components: ['technique', 'coordination', 'aerobic'],
            loads: [4, 5, 6, 3],
            weekTypes: ['load', 'load', 'load', 'deload'],
            pattern: ['ag_bf', '', 'ag_fb', 'ag_dry', '', 'ag_im', '']
          }
        ]
      },
      {
        type: 'precomp',
        goal: {
          ar: 'الانطلاق من البلوك وفي الظهر، الدوران القانوني لكل طريقة، ومحاكاة سباقات ٢٥ و٥٠م، ثم إعادة التقييم.',
          en: 'Block and backstroke starts, legal turns for each stroke, 25/50m race practice, then reassessment.'
        },
        components: ['technique', 'speed', 'reaction'],
        blocks: [
          {
            name: { ar: 'بلوك ٣ — انطلاق ودوران', en: 'Block 3 — Starts and turns' },
            goal: { ar: 'دخول آمن من البلوك، دوران شقلبة للحرة والظهر، ولمس بالإيدين للصدر والفراشة.', en: 'Safe block entries, flip turns for free and back, two-hand touch turns for breast and fly.' },
            components: ['technique', 'reaction', 'speed'],
            loads: [5, 6],
            weekTypes: ['load', 'load'],
            pattern: ['ag_turns', '', 'ag_im', 'ag_dry', '', 'ag_turns', '']
          },
          {
            name: { ar: 'أسبوع إعادة التقييم', en: 'Reassessment week' },
            goal: { ar: 'مقارنة التكنيك والأزمنة بأسبوع التقييم الأول واختيار سباقات البطولة.', en: 'Compare technique and times with the first assessment and choose gala events.' },
            components: ['technique', 'speed'],
            loads: [4],
            weekTypes: ['test'],
            pattern: ['ag_test', '', 'ag_turns', '', 'ag_im', '', '']
          }
        ]
      },
      {
        type: 'comp',
        goal: {
          ar: 'بطولة نادي صغيرة: خبرة سباق إيجابية، روتين إحماء، وسباحة قانونية.',
          en: 'Club gala: a positive racing experience, a warm-up routine and legal swimming.'
        },
        components: ['speed', 'mental', 'technique'],
        blocks: [
          {
            name: { ar: 'أسبوع البطولة', en: 'Gala week' },
            goal: { ar: 'تمرين خفيف وممتع قبل البطولة، وسباقين أو تلاتة يوم البطولة.', en: 'Light, fun practice before the gala, then 2-3 races on gala day.' },
            components: ['speed', 'mental'],
            loads: [3],
            weekTypes: ['comp'],
            pattern: ['ag_fb', '', 'ag_turns', '', '', 'ag_gala', '']
          }
        ]
      }
    ],
    sessions: {
      ag_test: {
        title: { ar: 'تقييم تكنيك وأزمنة ٢٥م', en: 'Technique assessment and 25m times' },
        goal: { ar: 'تقييم كل سباح في الأربع طرق بطريقة ممتعة ومشجعة.', en: 'Assess each swimmer in all four strokes in a fun, encouraging way.' },
        components: ['technique', 'speed'],
        rpe: 6,
        duration: 60,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤×٢٥ حرة وظهر سهل + ٤×٢٥ رجلين بلوح', en: 'Warm-up: 4x25 easy free and back + 4x25 kick with board' }, distance: '200m', stroke: 'free' },
          {
            kind: 'drill', sets: 1, reps: '3',
            name: { ar: 'مسافة الانزلاق بالستريم لاين من الحيطة', en: 'Streamline glide distance from the wall' },
            purpose: { ar: 'قياس وضع الجسم والستريم لاين', en: 'Measure body line and streamline quality' },
            component: 'technique',
            note: { ar: 'سجل أحسن مسافة بالمتر', en: 'Record best distance in metres' }
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '25m', stroke: 'im', intensity: '9', basis: 'rpe', rest: '2min',
            name: { ar: '٢٥م بكل طريقة (فراشة، ظهر، صدر، حرة) بالتوقيت', en: '25m of each stroke (fly, back, breast, free) timed' },
            purpose: { ar: 'زمن أساسي وتقييم تكنيك كل طريقة بالفيديو', en: 'Baseline time and video technique check for each stroke' },
            component: 'speed',
            note: { ar: 'تقييم من ٥: وضع الجسم، الرجلين، الدراعات، التنفس، التوقيت', en: 'Score out of 5: body line, kick, arms, breathing, timing' }
          },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '25m', stroke: 'kick', intensity: '9', basis: 'rpe', rest: '2min',
            name: { ar: '٢٥م رجلين حرة بلوح بالتوقيت', en: '25m freestyle kick with board, timed' },
            purpose: { ar: 'قياس قوة الرجلين', en: 'Measure kick strength' },
            component: 'muscular_endurance'
          },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '100m', stroke: 'free', intensity: '7', basis: 'rpe', rest: '3min',
            name: { ar: '١٠٠م حرة متواصلة (بدون وقوف)', en: '100m freestyle continuous (no stopping)' },
            purpose: { ar: 'تحمل هوائي أساسي وتنفس منتظم', en: 'Basic aerobic endurance and rhythmic breathing' },
            component: 'aerobic'
          },
          {
            kind: 'mobility', name: { ar: 'تهدئة: ١٠٠ سهل + لعبة في الماية', en: 'Cool-down: 100 easy + water game' }, duration: '8min'
          }
        ]
      },
      ag_fb: {
        title: { ar: 'تكنيك حرة وظهر', en: 'Freestyle and backstroke technique' },
        goal: { ar: 'وضع جسم أفقي، رجلين من الورك، تنفس جانبي، ودوران الكتف.', en: 'Horizontal body line, kick from the hip, side breathing and shoulder roll.' },
        components: ['technique', 'coordination', 'aerobic'],
        rpe: 5,
        duration: 60,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ١٠٠ حرة سهل + ٤×٢٥ رجلين بلوح', en: 'Warm-up: 100 easy free + 4x25 kick with board' }, distance: '200m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '25m', stroke: 'kick', intensity: '5', basis: 'rpe', rest: '20s',
            name: { ar: '٦×٢٥ رجلين ستريم لاين (بطن / ظهر)', en: '6x25 streamline kick (front / back)' },
            purpose: { ar: 'رجلين من الورك مع ركبة شبه مفرودة وجسم ممدود', en: 'Kick from the hip with near-straight knees and a long body' },
            component: 'technique'
          },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '25m', stroke: 'drill', intensity: '4', basis: 'rpe', rest: '20s',
            name: { ar: '٨×٢٥ حرة: كاتش أب باللوح / ٦ رجلين وتنفس جانبي', en: '8x25 free: catch-up with board / 6-kick side breathing' },
            purpose: { ar: 'دراع يدخل قدام الكتف وتنفس بدون رفع الراس', en: 'Hand entry in front of the shoulder and breathing without lifting the head' },
            component: 'technique'
          },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '25m', stroke: 'drill', intensity: '4', basis: 'rpe', rest: '20s',
            name: { ar: '٨×٢٥ ظهر: دراع واحد / كوباية على الجبهة', en: '8x25 back: single-arm / cup on forehead' },
            purpose: { ar: 'راس ثابتة ودوران الكتف في الظهر', en: 'Still head and shoulder roll in backstroke' },
            component: 'technique'
          },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '25m', stroke: 'free', intensity: '6', basis: 'rpe', rest: '20s',
            name: { ar: '٦×٢٥ حرة كاملة تنفس كل ٣', en: '6x25 full free, breathe every 3' },
            purpose: { ar: 'تطبيق التكنيك في السباحة الكاملة', en: 'Apply technique in full stroke' },
            component: 'coordination'
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '25m', stroke: 'back', intensity: '6', basis: 'rpe', rest: '20s',
            name: { ar: '٤×٢٥ ظهر كامل', en: '4x25 full backstroke' },
            purpose: { ar: 'تطبيق وضع الجسم في الظهر', en: 'Apply body line in backstroke' },
            component: 'coordination'
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '12.5m', stroke: 'free', intensity: '9', basis: 'rpe', rest: '40s',
            name: { ar: 'تتابع سرعة ممتع ٤×١٢.٥م', en: 'Fun sprint relay 4x12.5m' },
            purpose: { ar: 'سرعة وحماس في آخر التمرين', en: 'Speed and fun to finish the session' },
            component: 'speed'
          },
          { kind: 'mobility', libId: 'ex_shoulder_stretch', sets: 1, reps: '20s/side' }
        ]
      },
      ag_bf: {
        title: { ar: 'تكنيك صدر وفراشة', en: 'Breaststroke and butterfly technique' },
        goal: { ar: 'رجل الصدر القانونية والتوقيت، وتموج الفراشة من الصدر.', en: 'Legal breaststroke kick and timing, butterfly undulation from the chest.' },
        components: ['technique', 'coordination'],
        rpe: 5,
        duration: 60,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ١٠٠ حرة + ١٠٠ ظهر سهل', en: 'Warm-up: 100 free + 100 back easy' }, distance: '200m', stroke: 'im' },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '25m', stroke: 'kick', intensity: '5', basis: 'rpe', rest: '20s',
            name: { ar: '٨×٢٥ رجل صدر باللوح', en: '8x25 breaststroke kick with board' },
            purpose: { ar: 'الكعب للمقعدة، القدم للخارج، ورجلين متساويين (قانوني)', en: 'Heels to seat, feet turned out, symmetrical (legal) kick' },
            component: 'technique',
            note: { ar: 'أي رجل دولفين أو مقص تتصحح فورا', en: 'Correct any dolphin or scissor kick immediately' }
          },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '25m', stroke: 'drill', intensity: '4', basis: 'rpe', rest: '20s',
            name: { ar: '٦×٢٥ صدر: ٢ رجل + ١ شد', en: '6x25 breast: 2 kicks + 1 pull' },
            purpose: { ar: 'توقيت: شد - نفس - رجل - انزلاق', en: 'Timing: pull-breathe-kick-glide' },
            component: 'coordination'
          },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '12.5m', stroke: 'kick', intensity: '5', basis: 'rpe', rest: '20s',
            name: { ar: '٨×١٢.٥م دولفين (بطن / جنب / ظهر)', en: '8x12.5m dolphin kick (front / side / back)' },
            purpose: { ar: 'التموج من الصدر مش من الركبة', en: 'Undulation from the chest, not the knees' },
            component: 'technique'
          },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '25m', stroke: 'drill', intensity: '5', basis: 'rpe', rest: '30s',
            name: { ar: '٦×٢٥ فراشة دراع واحد (الدراع التاني قدام)', en: '6x25 single-arm butterfly (other arm forward)' },
            purpose: { ar: 'ربط ضربتين الرجل مع حركة الدراع', en: 'Link the two kicks with the arm stroke' },
            component: 'coordination'
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '12.5m', stroke: 'fly', intensity: '7', basis: 'rpe', rest: '40s',
            name: { ar: '٤×١٢.٥م فراشة كاملة', en: '4x12.5m full butterfly' },
            purpose: { ar: 'فراشة كاملة بمسافة قصيرة عشان التكنيك ما يبوظش', en: 'Short full-stroke fly so technique holds' },
            component: 'technique',
            note: { ar: 'زعانف قصيرة مسموحة للي لسه بيتعلم', en: 'Short fins allowed for learners' }
          },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '25m', stroke: 'breast', intensity: '6', basis: 'rpe', rest: '20s',
            name: { ar: '٦×٢٥ صدر كامل بعدد ضربات أقل', en: '6x25 full breaststroke, fewer strokes' },
            purpose: { ar: 'انزلاق أطول بعد كل ضربة', en: 'Longer glide after each stroke' },
            component: 'technique'
          },
          { kind: 'mobility', name: { ar: 'تهدئة: ١٠٠ ظهر سهل + إطالة كتف', en: 'Cool-down: 100 easy back + shoulder stretch' }, duration: '6min' }
        ]
      },
      ag_kick: {
        title: { ar: 'رجلين وستريم لاين وتحمل ممتع', en: 'Kick, streamline and fun endurance' },
        goal: { ar: 'تقوية الرجلين والستريم لاين وبناء تحمل هوائي بألعاب.', en: 'Build kick strength, streamline and aerobic endurance through games.' },
        components: ['aerobic', 'technique', 'muscular_endurance'],
        rpe: 5,
        duration: 60,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٢٠٠ متنوع سهل (حرة، ظهر، صدر)', en: 'Warm-up: 200 easy mixed (free, back, breast)' }, distance: '200m', stroke: 'im' },
          {
            kind: 'drill', sets: 1, reps: '6',
            name: { ar: 'تحدي الانزلاق: دفع من الحيطة بستريم لاين', en: 'Glide challenge: streamline push-off' },
            purpose: { ar: 'ستريم لاين محكم: إيد فوق إيد والدراعين ورا الودان', en: 'Tight streamline: hand over hand, arms behind the ears' },
            component: 'technique'
          },
          {
            kind: 'timed', sets: 4, reps: '1', duration: '15s', intensity: '7', basis: 'rpe', rest: '30s',
            name: { ar: 'رجلين عمودي في العميق (بمساعدة لو لزم)', en: 'Vertical kick in deep water (assisted if needed)' },
            purpose: { ar: 'قوة الرجلين والثقة في العميق', en: 'Kick strength and deep-water confidence' },
            component: 'muscular_endurance'
          },
          {
            kind: 'swim', libId: 'ad_freestyle_kick_sets', sets: 1, reps: '4', distance: '50m', stroke: 'kick', intensity: '6', basis: 'rpe', rest: '20s',
            purpose: { ar: 'تحمل الرجلين', en: 'Kick endurance' },
            component: 'muscular_endurance',
            note: { ar: 'اختيار: حرة أو ظهر أو دولفين', en: 'Choice: free, back or dolphin' }
          },
          {
            kind: 'swim', sets: 1, reps: '3', distance: '100m', stroke: 'free', intensity: '6', basis: 'rpe', rest: '30s',
            name: { ar: '٣×١٠٠ حرة متواصلة', en: '3x100 free continuous' },
            purpose: { ar: 'تحمل هوائي — السباحة من غير ما يقف', en: 'Aerobic endurance — swimming without stopping' },
            component: 'aerobic',
            note: { ar: 'مبتدئ جدا: ٦×٥٠ بدلها', en: 'Very new swimmers: 6x50 instead' }
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '25m', stroke: 'back', intensity: '5', basis: 'rpe', rest: '20s',
            name: { ar: '٤×٢٥ رجلين ظهر ستريم لاين', en: '4x25 streamline back kick' },
            purpose: { ar: 'وضع جسم عالي على الضهر', en: 'High body position on the back' },
            component: 'technique'
          },
          { kind: 'mobility', name: { ar: 'تهدئة: لعبة التقاط حلقات من القاع + ١٠٠ سهل', en: 'Cool-down: dive-for-rings game + 100 easy' }, duration: '8min' }
        ]
      },
      ag_im: {
        title: { ar: 'متنوع وتحمل هوائي', en: 'IM and aerobic endurance' },
        goal: { ar: 'ربط الأربع طرق بالترتيب الصحيح والتحولات، وبناء تحمل.', en: 'Link all four strokes in the correct order with transitions, and build endurance.' },
        components: ['aerobic', 'coordination', 'technique'],
        rpe: 6,
        duration: 70,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٢٠٠ حرة سهل + ٤×٢٥ تكنيك متنوع', en: 'Warm-up: 200 easy free + 4x25 IM drill' }, distance: '300m', stroke: 'im' },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '50m', stroke: 'im', intensity: '6', basis: 'rpe', rest: '30s',
            name: { ar: '٨×٥٠ متنوع أزواج (فراشة-ظهر / ظهر-صدر / صدر-حرة)', en: '8x50 IM pairs (fly-back / back-breast / breast-free)' },
            purpose: { ar: 'تعلم التحولات في المتنوع', en: 'Learn IM transitions' },
            component: 'coordination'
          },
          {
            kind: 'drill', sets: 1, reps: '4',
            name: { ar: 'تحولات المتنوع: فراشة لظهر، ظهر لصدر، صدر لحرة', en: 'IM transitions: fly-to-back, back-to-breast, breast-to-free' },
            purpose: { ar: 'لمس قانوني ودوران صحيح بين الطرق', en: 'Legal touches and correct turns between strokes' },
            component: 'technique'
          },
          {
            kind: 'swim', sets: 1, reps: '2', distance: '100m', stroke: 'im', intensity: '6', basis: 'rpe', rest: '1min',
            name: { ar: '٢×١٠٠ متنوع', en: '2x100 IM' },
            purpose: { ar: 'سباحة المتنوع كاملة', en: 'Full IM swim' },
            component: 'aerobic'
          },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '50m', stroke: 'free', intensity: '6-8', basis: 'rpe', rest: '20s',
            name: { ar: '٦×٥٠ حرة تنازلي (كل ٢ أسرع)', en: '6x50 free descending (every 2 faster)' },
            purpose: { ar: 'تحمل هوائي والإحساس بالسرعة', en: 'Aerobic endurance and pace awareness' },
            component: 'aerobic'
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '25m', stroke: 'kick', intensity: '6', basis: 'rpe', rest: '20s',
            name: { ar: '٤×٢٥ رجلين متنوع', en: '4x25 IM kick' },
            purpose: { ar: 'رجلين كل الطرق', en: 'Kick for every stroke' },
            component: 'muscular_endurance'
          },
          { kind: 'mobility', name: { ar: 'تهدئة: ١٠٠ سهل + إطالة', en: 'Cool-down: 100 easy + stretch' }, duration: '6min' }
        ]
      },
      ag_turns: {
        title: { ar: 'انطلاق ودوران', en: 'Starts and turns' },
        goal: { ar: 'انطلاق آمن من البلوك وفي الظهر، ودوران قانوني لكل طريقة.', en: 'Safe block and backstroke starts, legal turns for every stroke.' },
        components: ['technique', 'reaction', 'speed'],
        rpe: 5,
        duration: 60,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٢٠٠ متنوع سهل + ٤×١٢.٥م سريع', en: 'Warm-up: 200 easy IM + 4x12.5m fast' }, distance: '250m', stroke: 'im' },
          {
            kind: 'drill', sets: 1, reps: '8',
            name: { ar: 'تدرج الغطس: قعدة - ركبة - وقوف - بلوك', en: 'Dive progression: sitting - kneeling - standing - block' },
            purpose: { ar: 'دخول الماية من ثقب واحد وستريم لاين', en: 'Enter through one hole with a streamline' },
            component: 'technique',
            note: { ar: 'أمان: الغطس فقط في عمق ١.٨م أو أكتر وتحت إشراف المدرب', en: 'Safety: dive only in 1.8m+ depth under coach supervision' }
          },
          {
            kind: 'drill', sets: 1, reps: '6',
            name: { ar: 'انطلاق الظهر من الماية', en: 'Backstroke start from the water' },
            purpose: { ar: 'دفع قوي وقوس فوق الماية', en: 'Strong push and arch over the water' },
            component: 'reaction'
          },
          {
            kind: 'drill', sets: 1, reps: '8',
            name: { ar: 'دوران شقلبة: شقلبة في النص ثم على الحيطة', en: 'Flip turn: mid-pool somersault, then at the wall' },
            purpose: { ar: 'دوران حرة وظهر سريع (الظهر: عد الضربات من الأعلام)', en: 'Fast free and back turns (back: count strokes from the flags)' },
            component: 'technique'
          },
          {
            kind: 'drill', sets: 1, reps: '8',
            name: { ar: 'دوران لمس بالإيدين (صدر وفراشة)', en: 'Two-hand touch turns (breast and fly)' },
            purpose: { ar: 'لمس قانوني بالإيدين مع بعض ودوران سريع', en: 'Legal simultaneous two-hand touch and quick turn' },
            component: 'technique'
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '25m', stroke: 'free', intensity: '9', basis: 'rpe', rest: '1min',
            name: { ar: '٤×٢٥ من البلوك سريع', en: '4x25 fast from the block' },
            purpose: { ar: 'ربط الانطلاق بالسباحة السريعة', en: 'Link the start to fast swimming' },
            component: 'speed'
          },
          { kind: 'mobility', name: { ar: 'تهدئة: ١٠٠ سهل', en: 'Cool-down: 100 easy' }, duration: '5min' }
        ]
      },
      ag_dry: {
        title: { ar: 'تمرين أرضي للناشئين — رشاقة وقوة بوزن الجسم', en: 'Age-group dryland — athleticism and bodyweight strength' },
        goal: { ar: 'أساسيات حركية: جذع، توافق، ومرونة كتف، بدون أوزان.', en: 'Movement basics: trunk, coordination and shoulder mobility, no external load.' },
        components: ['coordination', 'core', 'mobility'],
        rpe: 5,
        duration: 35,
        items: [
          { kind: 'warmup', libId: 'ex_jump_rope', duration: '3min' },
          { kind: 'warmup', libId: 'ex_arm_circles', sets: 2, reps: '10 each way' },
          {
            kind: 'drill', libId: 'wg_bear_crawl', sets: 3, distance: '10m', rest: '30s',
            purpose: { ar: 'توافق وثبات كتف', en: 'Coordination and shoulder stability' },
            component: 'coordination'
          },
          {
            kind: 'strength', libId: 'ex_hollow_body_hold', sets: 3, reps: '15-20s', intensity: '6', basis: 'rpe', rest: '30s',
            purpose: { ar: 'الستريم لاين على الأرض', en: 'Streamline position on land' },
            component: 'core'
          },
          {
            kind: 'strength', libId: 'ex_superman', sets: 3, reps: '10', intensity: '5', basis: 'rpe', rest: '30s',
            purpose: { ar: 'عضلات الضهر لوضع جسم أفقي', en: 'Back muscles for a horizontal body line' },
            component: 'core'
          },
          {
            kind: 'strength', libId: 'ex_glute_bridge', sets: 2, reps: '12', intensity: '5', basis: 'rpe', rest: '30s',
            purpose: { ar: 'تقوية الورك للرجلين', en: 'Hip strength for kicking' },
            component: 'strength'
          },
          {
            kind: 'drill', libId: 'ad_tuck_jump', sets: 3, reps: '5', rest: '45s',
            purpose: { ar: 'قدرة للانطلاق والدوران', en: 'Power for starts and turns' },
            component: 'power'
          },
          { kind: 'mobility', libId: 'ex_shoulder_stretch', sets: 1, reps: '20s/side' },
          { kind: 'mobility', libId: 'ex_childs_pose', sets: 1, reps: '30s' }
        ]
      },
      ag_gala: {
        title: { ar: 'بطولة النادي', en: 'Club gala' },
        goal: { ar: 'سباحة قانونية وأحسن مجهود وخبرة سباق ممتعة.', en: 'Legal swimming, best effort and an enjoyable racing experience.' },
        components: ['speed', 'mental', 'technique'],
        rpe: 7,
        duration: 120,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٢٠٠ سهل + ٤×٢٥ تكنيك + ٢ انطلاقة', en: 'Warm-up: 200 easy + 4x25 drill + 2 starts' }, distance: '350m', stroke: 'im' },
          {
            kind: 'swim', sets: 1, reps: '2-3', distance: '50m', stroke: 'im', intensity: '100', basis: 'best', rest: '30min+',
            name: { ar: 'السباقات: ٢-٣ سباقات ٢٥ / ٥٠م', en: 'Races: 2-3 events of 25 / 50m' },
            purpose: { ar: 'أحسن زمن شخصي بتكنيك قانوني', en: 'Personal best with legal technique' },
            component: 'speed'
          },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '200m', stroke: 'free', intensity: '3', basis: 'rpe', duration: '5min',
            name: { ar: 'تهدئة بعد كل سباق', en: 'Swim-down after each race' },
            purpose: { ar: 'استشفاء بين السباقات', en: 'Recovery between races' },
            component: 'recovery'
          }
        ]
      }
    }
  },

  /* =========================================================
   * 4) مياه مفتوحة ٣-٥ كم — متوسط — ١٢ أسبوع
   * ========================================================= */
  {
    id: 'pt_swimming_openwater_int',
    sport: 'swimming',
    level: 'intermediate',
    title: { ar: 'موسم سباحة مياه مفتوحة ٣-٥ كم — متوسط', en: 'Open-water 3-5 km season — intermediate' },
    goal: {
      ar: 'بناء تحمل هوائي وعتبة على CSS، وإتقان الرؤية (السايتنج) والدرافتنج والدوران حوالين العوامات، وإنهاء سباق ٣-٥ كم بتوزيع جهد صحيح.',
      en: 'Build aerobic endurance and CSS threshold, master sighting, drafting and buoy turns, and finish a 3-5 km race with correct pacing.'
    },
    components: ['aerobic', 'threshold', 'technique', 'tactics', 'muscular_endurance'],
    sessionsPerWeek: 5,
    periods: [
      {
        type: 'gpp',
        goal: {
          ar: 'اختبار CSS، قاعدة هوائية في المسبح، تنفس في الناحيتين، وتعلم الرؤية بدون ما الرجلين تنزل.',
          en: 'CSS test, pool aerobic base, bilateral breathing, and learning to sight without dropping the legs.'
        },
        components: ['aerobic', 'technique', 'strength'],
        blocks: [
          {
            name: { ar: 'أسبوع اختبار', en: 'Test week' },
            goal: { ar: 'CSS، وقياس فرق السرعة بالرؤية وبدونها.', en: 'CSS, plus the pace cost of sighting vs no sighting.' },
            components: ['threshold', 'technique'],
            loads: [4],
            weekTypes: ['test'],
            pattern: ['ow_test', 'ow_sight', 'ow_aero', 'ow_dry', '', 'ow_aero', '']
          },
          {
            name: { ar: 'بلوك ١ — قاعدة ورؤية', en: 'Block 1 — Base and sighting' },
            goal: { ar: 'حجم ١٤-١٨ كم/أسبوع، رؤية كل ٦-٩ ضربات، وعتبة خفيفة.', en: '14-18 km/week, sighting every 6-9 strokes, light threshold work.' },
            components: ['aerobic', 'technique', 'threshold'],
            loads: [5, 6, 4],
            weekTypes: ['load', 'load', 'deload'],
            pattern: ['ow_aero', 'ow_dry', 'ow_sight', 'ow_css', '', 'ow_aero', '']
          }
        ]
      },
      {
        type: 'spp',
        goal: {
          ar: 'تخصص مياه مفتوحة: سباحة طويلة في البحر، مهارات المجموعة (درافتنج، بداية جماعية، عوامات)، وعتبة.',
          en: 'Open-water specifics: long sea swims, pack skills (drafting, mass starts, buoys) and threshold.'
        },
        components: ['aerobic', 'threshold', 'tactics'],
        blocks: [
          {
            name: { ar: 'بلوك ٢ — تخصص مياه مفتوحة', en: 'Block 2 — Open-water specific' },
            goal: { ar: 'سباحة مستمرة ٦٠-٩٠ دقيقة في البحر، ودرافتنج على الرجلين والجنب.', en: 'Continuous 60-90 min sea swims, feet and hip drafting.' },
            components: ['aerobic', 'tactics', 'threshold'],
            loads: [6, 7, 8, 4],
            weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['ow_css', 'ow_dry', 'ow_pack', 'ow_aero', '', 'ow_long', '']
          }
        ]
      },
      {
        type: 'precomp',
        goal: {
          ar: 'محاكاة سباق في المياه المفتوحة بسرعة السباق، وتغييرات إيقاع (سيرج) وخطة تغذية.',
          en: 'Open-water race simulations at race pace, surges and a feeding plan.'
        },
        components: ['threshold', 'tactics', 'mental'],
        blocks: [
          {
            name: { ar: 'بلوك ٣ — محاكاة السباق', en: 'Block 3 — Race simulation' },
            goal: { ar: 'بداية سريعة، استقرار على سرعة السباق، ونهاية قوية وخروج للشط.', en: 'Fast start, settle at race pace, strong finish and beach exit.' },
            components: ['threshold', 'tactics', 'mental'],
            loads: [7, 6],
            weekTypes: ['load', 'load'],
            pattern: ['ow_pack', 'ow_dry', 'ow_css', 'ow_sight', '', 'ow_sim', '']
          }
        ]
      },
      {
        type: 'taper',
        goal: {
          ar: 'تهدئة أسبوعين وسباق: الحجم ينزل ٣٠-٥٠% مع الحفاظ على سرعة السباق.',
          en: 'Two-week taper and race: volume down 30-50% while keeping race pace.'
        },
        components: ['recovery', 'threshold', 'mental'],
        blocks: [
          {
            name: { ar: 'بلوك ٤ — تهدئة وسباق', en: 'Block 4 — Taper and race' },
            goal: { ar: 'وصول للسباق مرتاح، واستكشاف مكان السباق والعلامات.', en: 'Arrive rested, and scout the course and landmarks.' },
            components: ['recovery', 'mental'],
            loads: [4, 3],
            weekTypes: ['taper', 'comp'],
            pattern: ['ow_taper', '', 'ow_sight', 'ow_taper', '', 'ow_race', '']
          }
        ]
      }
    ],
    sessions: {
      ow_test: {
        title: { ar: 'اختبار CSS + تكلفة الرؤية', en: 'CSS test + sighting cost' },
        goal: { ar: 'تحديد CSS وقياس قد إيه الرؤية بتبطئ السباح.', en: 'Set CSS and measure how much sighting slows the swimmer.' },
        components: ['threshold', 'technique'],
        rpe: 8,
        duration: 80,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سهل + ٤×٥٠ تصاعدي', en: 'Warm-up: 400 easy + 4x50 build' }, distance: '600m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '400m', stroke: 'free', intensity: '10', basis: 'rpe', rest: '10min', restType: 'active',
            name: { ar: 'اختبار ٤٠٠م حرة', en: '400m freestyle time trial' },
            purpose: { ar: 'الزمن الأول لحساب CSS', en: 'First time for CSS' },
            component: 'threshold'
          },
          coolSwim(300, 8),
          {
            kind: 'swim', sets: 1, reps: '1', distance: '200m', stroke: 'free', intensity: '10', basis: 'rpe', rest: '10min', restType: 'active',
            name: { ar: 'اختبار ٢٠٠م حرة', en: '200m freestyle time trial' },
            purpose: { ar: 'الزمن التاني — CSS = (ز٤٠٠ - ز٢٠٠) ÷ ٢', en: 'Second time — CSS = (T400 - T200) / 2' },
            component: 'threshold'
          },
          {
            kind: 'swim', sets: 2, reps: '2', distance: '100m', stroke: 'free', intensity: 'CSS', basis: 'css', rest: '30s', setRest: '1min',
            name: { ar: '٢×١٠٠ بدون رؤية ثم ٢×١٠٠ رؤية كل ٦ ضربات', en: '2x100 no sighting, then 2x100 sighting every 6 strokes' },
            purpose: { ar: 'قياس تكلفة الرؤية (الهدف أقل من ٢ث/١٠٠م)', en: 'Measure the sighting cost (target under 2s/100m)' },
            component: 'technique'
          },
          coolSwim(400, 8)
        ]
      },
      ow_aero: {
        title: { ar: 'تحمل هوائي في المسبح — ٤٥٠٠م', en: 'Pool aerobic endurance — 4500m' },
        goal: { ar: 'قاعدة هوائية وسباحة طويلة متواصلة بإيقاع ثابت.', en: 'Aerobic base and long continuous swimming at a steady rhythm.' },
        components: ['aerobic', 'muscular_endurance'],
        rpe: 5,
        duration: 95,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٣٠٠ حرة + ٢٠٠ رجلين + ١٠٠ ظهر', en: 'Warm-up: 300 free + 200 kick + 100 back' }, distance: '600m', stroke: 'im' },
          {
            kind: 'swim', sets: 1, reps: '3', distance: '1000m', stroke: 'free', intensity: 'CSS+6s', basis: 'css', rest: '30s',
            name: { ar: '٣×١٠٠٠ حرة', en: '3x1000 free' },
            purpose: { ar: 'تحمل هوائي طويل منطقة ٢', en: 'Long zone 2 aerobic endurance' },
            component: 'aerobic',
            note: { ar: '١: تنفس كل ٣، ٢: تنفس ٣/٥، ٣: نيجاتيف سبليت', en: '1: breathe every 3, 2: breathe 3/5, 3: negative split' }
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '200m', stroke: 'pull', intensity: 'CSS+4s', basis: 'css', rest: '20s',
            name: { ar: '٤×٢٠٠ دراعات بالبادلز', en: '4x200 pull with paddles' },
            purpose: { ar: 'قوة تحمل الدراعات (المياه المفتوحة معظمها دراعات)', en: 'Arm strength-endurance (open water is pull-dominant)' },
            component: 'muscular_endurance'
          },
          coolSwim(200, 5),
          { kind: 'mobility', libId: 'ad_sleeper_stretch', sets: 2, reps: '30s/side' }
        ]
      },
      ow_sight: {
        title: { ar: 'تكنيك الرؤية والدوران', en: 'Sighting and turning technique' },
        goal: { ar: 'رؤية سريعة (عيون التمساح) بدون ما الجسم ينزل، ودوران حوالين العوامة.', en: 'Quick "crocodile eyes" sighting without sinking hips, and buoy turns.' },
        components: ['technique', 'aerobic', 'tactics'],
        rpe: 5,
        duration: 75,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سهل تنفس في الناحيتين', en: 'Warm-up: 400 easy bilateral breathing' }, distance: '400m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '50m', stroke: 'drill', intensity: '5', basis: 'rpe', rest: '20s',
            name: { ar: '٨×٥٠: ٢٥ سباحة راس بره (تارزان) / ٢٥ عيون التمساح', en: '8x50: 25 head-up (Tarzan) / 25 crocodile eyes' },
            purpose: { ar: 'الرؤية بالعينين فوق الماية بس ثم النفس جنب', en: 'Eyes just above the water, then breathe to the side' },
            component: 'technique'
          },
          {
            kind: 'swim', sets: 1, reps: '10', distance: '100m', stroke: 'free', intensity: 'CSS+4s', basis: 'css', rest: '15s',
            name: { ar: '١٠×١٠٠ رؤية كل ٦ ضربات', en: '10x100 sighting every 6 strokes' },
            purpose: { ar: 'دمج الرؤية في الإيقاع الطبيعي', en: 'Integrate sighting into normal rhythm' },
            component: 'technique',
            note: { ar: 'حط علامة في آخر الحارة وارفع عينك عليها', en: 'Place a target at the end of the lane and sight on it' }
          },
          {
            kind: 'drill', sets: 1, reps: '8', distance: '25m',
            name: { ar: 'دوران عوامة في نص الحارة (دوران كورك سكرو)', en: 'Mid-lane buoy turn (corkscrew turn)' },
            purpose: { ar: 'تغيير اتجاه سريع من غير حيطة', en: 'Fast direction change without a wall' },
            component: 'tactics'
          },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '100m', stroke: 'free', intensity: 'CSS+5s', basis: 'css', rest: '15s',
            name: { ar: '٦×١٠٠ بدون لمس الحيطة (دوران في المية)', en: '6x100 no wall push-off (turn in open water)' },
            purpose: { ar: 'التعود على السباحة بدون راحة الدفع من الحيطة', en: 'Get used to swimming without push-off rest' },
            component: 'aerobic'
          },
          coolSwim(300, 6)
        ]
      },
      ow_css: {
        title: { ar: 'عتبة CSS — ٤٢٠٠م', en: 'CSS threshold — 4200m' },
        goal: { ar: 'رفع سرعة السباق المستدامة.', en: 'Raise sustainable race speed.' },
        components: ['threshold', 'aerobic'],
        rpe: 7,
        duration: 85,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سهل + ٤×١٠٠ تصاعدي', en: 'Warm-up: 400 easy + 4x100 build' }, distance: '800m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '500m', stroke: 'free', intensity: 'CSS+2s', basis: 'css', rest: '30s',
            name: { ar: '٤×٥٠٠ حرة (رؤية كل ٣ طول)', en: '4x500 free (sight every 3rd length)' },
            purpose: { ar: 'عتبة بفترات طويلة بإيقاع السباق', en: 'Long-interval threshold at race rhythm' },
            component: 'threshold'
          },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '100m', stroke: 'free', intensity: 'CSS-2s', basis: 'css', rest: '10s',
            name: { ar: '٨×١٠٠ حرة راحة قصيرة', en: '8x100 free, short rest' },
            purpose: { ar: 'عتبة عالية وتحمل تغييرات السرعة', en: 'Upper threshold and surge tolerance' },
            component: 'threshold'
          },
          coolSwim(400, 8)
        ]
      },
      ow_pack: {
        title: { ar: 'مهارات المجموعة — بداية جماعية ودرافتنج', en: 'Pack skills — mass start and drafting' },
        goal: { ar: 'تعلم السباحة وسط مجموعة، الدرافتنج، والعوامات، وتغيير الإيقاع.', en: 'Swim in a pack, draft, round buoys and surge.' },
        components: ['tactics', 'threshold', 'anaerobic'],
        rpe: 7,
        duration: 80,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سهل + ٤×٥٠ رؤية', en: 'Warm-up: 400 easy + 4x50 sighting' }, distance: '600m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '200m', stroke: 'free', intensity: 'CSS', basis: 'css', rest: '1min',
            name: { ar: '٦×(٥٠ بداية جماعية سريعة + ١٥٠ استقرار على CSS)', en: '6x(50 fast mass start + 150 settle at CSS)' },
            purpose: { ar: 'بداية قوية ثم الرجوع لسرعة السباق بسرعة', en: 'Strong start then quickly settle into race pace' },
            component: 'tactics',
            note: { ar: '٣-٤ سباحين في الحارة مع بعض', en: '3-4 swimmers start together per lane' }
          },
          {
            kind: 'swim', sets: 1, reps: '3', distance: '400m', stroke: 'free', intensity: 'CSS+3s', basis: 'css', rest: '45s',
            name: { ar: '٣×٤٠٠ درافتنج في تلات (القائد يتغير كل ١٠٠)', en: '3x400 drafting in threes (lead changes every 100)' },
            purpose: { ar: 'توفير طاقة ورا الرجلين أو جنب الورك', en: 'Save energy on feet or hip draft' },
            component: 'tactics'
          },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '100m', stroke: 'free', intensity: 'CSS-3s', basis: 'css', rest: '20s',
            name: { ar: '٦×١٠٠ فيها ٢٥ سيرج (تسريع مفاجئ)', en: '6x100 with a 25m surge' },
            purpose: { ar: 'تحمل تغيير الإيقاع لسد فجوة أو الهروب', en: 'Tolerate pace changes to bridge or break away' },
            component: 'anaerobic'
          },
          coolSwim(400, 8)
        ]
      },
      ow_long: {
        title: { ar: 'سباحة طويلة في المياه المفتوحة', en: 'Long open-water swim' },
        goal: { ar: 'تحمل ٦٠-٩٠ دقيقة متواصلة في البحر مع الرؤية والتغذية.', en: '60-90 minutes continuous in the sea with sighting and feeding.' },
        components: ['aerobic', 'technique', 'mental'],
        rpe: 6,
        duration: 110,
        items: [
          { kind: 'warmup', libId: 'ad_band_pass_through', sets: 2, reps: '10', name: { ar: 'إحماء على الشط: أستك + لف دراعات', en: 'Beach warm-up: band pass-throughs + arm circles' } },
          { kind: 'warmup', name: { ar: '١٠ دقايق سباحة سهلة للتأقلم مع الماية', en: '10 min easy swim to acclimatise' }, duration: '10min', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '4000m', stroke: 'free', intensity: 'CSS+8s', basis: 'css', duration: '60-80min',
            name: { ar: 'سباحة متواصلة ٣-٤ كم', en: 'Continuous 3-4 km swim' },
            purpose: { ar: 'تحمل خاص بالمياه المفتوحة والتعود على الموج والتيار', en: 'Open-water specific endurance, waves and currents' },
            component: 'aerobic',
            note: { ar: 'أمان: عوامة ملونة وقارب أو كاياك مرافق. تغذية كل ٢٠-٣٠ دقيقة (جل أو مشروب).', en: 'Safety: tow float and kayak escort. Feed every 20-30 min (gel or drink).' }
          },
          {
            kind: 'drill', sets: 1, reps: '4',
            name: { ar: 'رؤية على علامات أرضية (مبنى، شجرة) كل ٦-٩ ضربات', en: 'Sight on land marks (building, tree) every 6-9 strokes' },
            purpose: { ar: 'خط مستقيم وأقل مسافة', en: 'Straight line and shortest distance' },
            component: 'technique'
          },
          coolSwim(200, 5)
        ]
      },
      ow_dry: {
        title: { ar: 'تمرين أرضي — قوة شد وجذع', en: 'Dryland — pulling and trunk strength' },
        goal: { ar: 'قوة الدراعات والجذع ووقاية الكتف للمسافات الطويلة.', en: 'Arm and trunk strength and shoulder prevention for long distances.' },
        components: ['strength', 'muscular_endurance', 'prevention'],
        rpe: 6,
        duration: 60,
        items: [
          ...DRY_WARMUP,
          {
            kind: 'strength', libId: 'ex_pullup', sets: 4, reps: '6-8', intensity: '2', basis: 'rir', tempo: '2-0-1-1', rest: '90s',
            purpose: { ar: 'قوة الشد', en: 'Pulling strength' },
            component: 'strength'
          },
          {
            kind: 'timed', libId: 'ad_skierg_steady_state', sets: 4, reps: '1', duration: '3min', intensity: '7', basis: 'rpe', rest: '1min',
            purpose: { ar: 'تحمل عضلي للدراعات بحركة قريبة من الشد', en: 'Arm muscular endurance with a pull-like motion' },
            component: 'muscular_endurance'
          },
          {
            kind: 'strength', libId: 'ex_seated_cable_row', sets: 3, reps: '12', intensity: '7', basis: 'rpe', tempo: '2-1-1-0', rest: '60s',
            purpose: { ar: 'عضلات لوح الكتف', en: 'Scapular retractors' },
            component: 'prevention'
          },
          {
            kind: 'strength', libId: 'ex_side_plank', sets: 3, reps: '30s/side', intensity: '6', basis: 'rpe', rest: '30s',
            purpose: { ar: 'ثبات جانبي للجذع مع الدوران', en: 'Lateral trunk stability during rotation' },
            component: 'core'
          },
          ...SHOULDER_PREHAB,
          { kind: 'mobility', libId: 'ex_thoracic_rotation', sets: 2, reps: '8/side' }
        ]
      },
      ow_sim: {
        title: { ar: 'محاكاة سباق في المياه المفتوحة', en: 'Open-water race simulation' },
        goal: { ar: 'تجربة كاملة للسباق: بداية، عوامات، إيقاع، ونهاية.', en: 'A full race rehearsal: start, buoys, rhythm and finish.' },
        components: ['threshold', 'tactics', 'mental'],
        rpe: 8,
        duration: 90,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ١٠ دقايق سهل + ٣×٢٠ ضربة سريعة ورؤية', en: 'Warm-up: 10 min easy + 3x20 fast strokes with sighting' }, duration: '15min', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '200m', stroke: 'free', intensity: '9', basis: 'rpe', rest: '0s',
            name: { ar: 'بداية جماعية من الشط ٢٠٠م', en: 'Beach mass start 200m' },
            purpose: { ar: 'مكان كويس في المجموعة من البداية', en: 'Secure a good pack position from the start' },
            component: 'tactics'
          },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '2000m', stroke: 'free', intensity: 'CSS+2s', basis: 'css', duration: '30-35min',
            name: { ar: '٢٠٠٠م بسرعة السباق مع دوران عوامتين', en: '2000m at race pace with two buoy turns' },
            purpose: { ar: 'ثبات سرعة السباق مع درافتنج ورؤية', en: 'Hold race pace with drafting and sighting' },
            component: 'threshold',
            note: { ar: 'تغذية واحدة عند منتصف المسافة', en: 'One feed at halfway' }
          },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '200m', stroke: 'free', intensity: '9', basis: 'rpe', rest: '0s',
            name: { ar: 'نهاية سريعة ٢٠٠م + خروج جري للشط', en: 'Fast 200m finish + run-out to the beach' },
            purpose: { ar: 'تسريع النهاية وهو متعب', en: 'Finish fast under fatigue' },
            component: 'anaerobic'
          },
          coolSwim(300, 8)
        ]
      },
      ow_taper: {
        title: { ar: 'تهدئة — إيقاع السباق', en: 'Taper — race rhythm' },
        goal: { ar: 'الحفاظ على الإيقاع مع استشفاء.', en: 'Keep rhythm while recovering.' },
        components: ['threshold', 'recovery'],
        rpe: 5,
        duration: 60,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سهل + ٤×٥٠ رؤية', en: 'Warm-up: 400 easy + 4x50 sighting' }, distance: '600m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '200m', stroke: 'free', intensity: 'CSS+1s', basis: 'css', rest: '30s',
            name: { ar: '٤×٢٠٠ بسرعة السباق', en: '4x200 at race pace' },
            purpose: { ar: 'تأكيد إيقاع السباق', en: 'Confirm race rhythm' },
            component: 'threshold'
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '50m', stroke: 'free', intensity: '9', basis: 'rpe', rest: '40s',
            name: { ar: '٤×٥٠ بداية سريعة', en: '4x50 fast start' },
            purpose: { ar: 'تجهيز البداية', en: 'Sharpen the start' },
            component: 'speed'
          },
          coolSwim(300, 6)
        ]
      },
      ow_race: {
        title: { ar: 'يوم السباق', en: 'Race day' },
        goal: { ar: 'تنفيذ خطة السباق والتغذية بأمان.', en: 'Execute the race and feeding plan safely.' },
        components: ['threshold', 'tactics', 'mental'],
        rpe: 9,
        duration: 120,
        items: [
          { kind: 'warmup', libId: 'ad_band_pass_through', sets: 2, reps: '10', name: { ar: 'إحماء أرضي ١٠ دقايق: أستك ودوائر دراعات', en: '10 min land warm-up: bands and arm circles' } },
          { kind: 'warmup', name: { ar: 'إحماء في الماية: ١٠ دقايق مع ٣×٢٠ ضربة سريعة ورؤية على العلامات', en: 'Water warm-up: 10 min incl. 3x20 fast strokes sighting the markers' }, duration: '10min', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '5km', stroke: 'free', intensity: 'CSS+1s', basis: 'css', duration: '60-80min',
            name: { ar: 'السباق ٣-٥ كم', en: 'Race 3-5 km' },
            purpose: { ar: 'أحسن زمن بإيقاع ثابت ونهاية قوية', en: 'Best time with steady rhythm and strong finish' },
            component: 'threshold'
          },
          coolSwim(300, 10)
        ]
      }
    }
  },

  /* =========================================================
   * 5) كرة ماء — متوسط — ١٦ أسبوع
   * ========================================================= */
  {
    id: 'pt_water_polo_int',
    sport: 'water_polo',
    level: 'intermediate',
    title: { ar: 'موسم كرة ماء — متوسط', en: 'Water polo season — intermediate' },
    goal: {
      ar: 'بناء تحمل سباحة وقوة رجلين (إيجبيتر)، قوة وقدرة في الجيم، سرعة سبرنت بالراس بره، ودقة تصويب وهو متعب، والوصول للدوري في أحسن جاهزية ومحافظة عليها.',
      en: 'Build swim endurance and eggbeater leg strength, gym strength and power, head-up sprint speed and shooting accuracy under fatigue, then peak for and sustain the league phase.'
    },
    components: ['aerobic', 'anaerobic', 'speed', 'power', 'strength', 'technique', 'tactics'],
    sessionsPerWeek: 6,
    periods: [
      {
        type: 'gpp',
        goal: {
          ar: 'اختبارات بدنية، قاعدة سباحة هوائية، تحمل إيجبيتر، قوة عامة في الجيم، ومهارات تمرير وتصويب أساسية.',
          en: 'Fitness tests, aerobic swim base, eggbeater endurance, general gym strength and basic passing and shooting.'
        },
        components: ['aerobic', 'strength', 'muscular_endurance', 'technique'],
        blocks: [
          {
            name: { ar: 'أسبوع اختبارات', en: 'Test week' },
            goal: { ar: '٤٠٠م سباحة، ٢٥م سبرنت بالراس بره، ثبات إيجبيتر بوزن، ونطة من الماية.', en: '400m swim, 25m head-up sprint, weighted eggbeater hold and water jump.' },
            components: ['aerobic', 'speed', 'power'],
            loads: [4],
            weekTypes: ['test'],
            pattern: ['wp_test', 'wp_gym_str', 'wp_aero', 'wp_shoot', 'wp_gym_str', 'wp_aero', '']
          },
          {
            name: { ar: 'بلوك ١ — قاعدة وقوة', en: 'Block 1 — Base and strength' },
            goal: { ar: 'حجم سباحة ٣-٤ كم/تمرين، إيجبيتر طويل، وقوة ٧٥-٨٠%.', en: '3-4 km swim per session, long eggbeater work and strength at 75-80%.' },
            components: ['aerobic', 'strength', 'muscular_endurance'],
            loads: [5, 6, 7, 4],
            weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['wp_aero', 'wp_gym_str', 'wp_shoot', 'wp_aero', 'wp_gym_str', 'wp_game', '']
          }
        ]
      },
      {
        type: 'spp',
        goal: {
          ar: 'سبرنت بالراس بره، تحمل لاهوائي، قدرة (كلين، رمي كرة طبية)، وتصويب بعد مجهود.',
          en: 'Head-up sprints, anaerobic capacity, power (cleans, med-ball throws) and shooting after exertion.'
        },
        components: ['speed', 'anaerobic', 'power', 'technique'],
        blocks: [
          {
            name: { ar: 'بلوك ٢ — سرعة وقدرة', en: 'Block 2 — Speed and power' },
            goal: { ar: 'سبرنت ١٥-٢٥م متكرر، ألعاب مصغرة، وتحويل القوة لقدرة.', en: 'Repeated 15-25m sprints, small-sided games and strength-to-power conversion.' },
            components: ['speed', 'anaerobic', 'power'],
            loads: [6, 7, 8, 4],
            weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['wp_sprint', 'wp_gym_str', 'wp_shoot', 'wp_aero', 'wp_gym_pow', 'wp_game', '']
          }
        ]
      },
      {
        type: 'precomp',
        goal: {
          ar: 'تكتيك الفريق (هجوم مرتد، زيادة عددية)، مباريات ودية، وتحمل خاص بالمباراة.',
          en: 'Team tactics (counterattack, power play), friendly matches and match-specific endurance.'
        },
        components: ['tactics', 'anaerobic', 'speed'],
        blocks: [
          {
            name: { ar: 'بلوك ٣ — تجهيز المباريات', en: 'Block 3 — Match preparation' },
            goal: { ar: 'تقسيمات ٦×٦ بزمن المباراة ومباراة ودية كل أسبوع.', en: '6v6 scrimmages at match timing and a weekly friendly.' },
            components: ['tactics', 'anaerobic', 'speed'],
            loads: [7, 8, 6],
            weekTypes: ['load', 'shock', 'load'],
            pattern: ['wp_sprint', 'wp_gym_pow', 'wp_game', 'wp_shoot', 'wp_recovery', 'wp_match', '']
          }
        ]
      },
      {
        type: 'comp',
        goal: {
          ar: 'فترة الدوري: الحفاظ على السرعة والقدرة بحجم أقل، واستشفاء بعد كل مباراة.',
          en: 'League phase: maintain speed and power with less volume, and recover after every match.'
        },
        components: ['speed', 'power', 'tactics', 'recovery'],
        blocks: [
          {
            name: { ar: 'بلوك ٤ — الدوري', en: 'Block 4 — League' },
            goal: { ar: 'دورة أسبوعية: استشفاء - قدرة - تكتيك - سرعة - تصويب - مباراة.', en: 'Weekly cycle: recovery - power - tactics - speed - shooting - match.' },
            components: ['speed', 'power', 'tactics', 'recovery'],
            loads: [6, 7, 6, 5],
            weekTypes: ['comp', 'comp', 'comp', 'comp'],
            pattern: ['wp_recovery', 'wp_gym_pow', 'wp_game', 'wp_sprint', 'wp_shoot', 'wp_match', '']
          }
        ]
      }
    ],
    sessions: {
      wp_test: {
        title: { ar: 'اختبارات كرة الماء', en: 'Water polo fitness tests' },
        goal: { ar: 'قياس التحمل والسرعة وقوة الرجلين في الماية.', en: 'Measure endurance, speed and in-water leg power.' },
        components: ['aerobic', 'speed', 'power'],
        rpe: 8,
        duration: 80,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سباحة + ٢٠٠ رجلين + ٤×٢٥ تصاعدي', en: 'Warm-up: 400 swim + 200 kick + 4x25 build' }, distance: '700m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '400m', stroke: 'free', intensity: '10', basis: 'rpe', rest: '10min', restType: 'active',
            name: { ar: 'اختبار ٤٠٠م حرة', en: '400m freestyle test' },
            purpose: { ar: 'مؤشر التحمل الهوائي', en: 'Aerobic endurance marker' },
            component: 'aerobic'
          },
          {
            kind: 'swim', sets: 1, reps: '2', distance: '25m', stroke: 'free', intensity: '100', basis: 'best', rest: '3min',
            name: { ar: '٢×٢٥م سبرنت بالراس بره من وضع عمودي', en: '2x25m head-up sprint from vertical' },
            purpose: { ar: 'سرعة الهجوم المرتد', en: 'Counterattack speed' },
            component: 'speed',
            note: { ar: 'سجل أحسن زمن', en: 'Record best time' }
          },
          {
            kind: 'timed', sets: 1, reps: '1', duration: 'max', intensity: '10', basis: 'rpe', rest: '5min',
            name: { ar: 'ثبات إيجبيتر بوزن ٥ كجم فوق الراس (لحد الفشل)', en: 'Eggbeater hold with 5 kg overhead (to failure)' },
            purpose: { ar: 'قوة تحمل الرجلين', en: 'Leg strength-endurance' },
            component: 'muscular_endurance',
            note: { ar: 'الكوع لازم يفضل فوق الماية', en: 'Elbows must stay above the water' }
          },
          {
            kind: 'drill', sets: 1, reps: '3',
            name: { ar: 'نطة من الماية (أعلى نقطة على لوحة قياس)', en: 'Water jump (highest reach on a board)' },
            purpose: { ar: 'قدرة الرجلين في الماية (بلوك / تصويب)', en: 'In-water leg power (blocking / shooting)' },
            component: 'power'
          },
          coolSwim(400, 8)
        ]
      },
      wp_aero: {
        title: { ar: 'سباحة هوائية وإيجبيتر', en: 'Aerobic swim and eggbeater' },
        goal: { ar: 'قاعدة هوائية وتحمل الرجلين في الوضع العمودي.', en: 'Aerobic base and vertical leg endurance.' },
        components: ['aerobic', 'muscular_endurance'],
        rpe: 6,
        duration: 80,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ متنوع سهل', en: 'Warm-up: 400 easy mixed' }, distance: '400m', stroke: 'im' },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '200m', stroke: 'free', intensity: 'CSS+5s', basis: 'css', rest: '20s',
            name: { ar: '٦×٢٠٠ حرة', en: '6x200 free' },
            purpose: { ar: 'تحمل هوائي للعب ٤ أرباع', en: 'Aerobic endurance for four quarters' },
            component: 'aerobic'
          },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '50m', stroke: 'free', intensity: '6', basis: 'rpe', rest: '15s',
            name: { ar: '٨×٥٠ حرة بالراس بره', en: '8x50 head-up freestyle' },
            purpose: { ar: 'تكنيك سباحة اللعب (عينك على الكورة)', en: 'Game swimming technique (eyes on the ball)' },
            component: 'technique'
          },
          {
            kind: 'timed', sets: 6, reps: '1', duration: '1min', intensity: '7', basis: 'rpe', rest: '30s',
            name: { ar: 'إيجبيتر والإيدين بره الماية', en: 'Eggbeater with hands out of the water' },
            purpose: { ar: 'تحمل الإيجبيتر — أساس كل المهارات', en: 'Eggbeater endurance — basis of every skill' },
            component: 'muscular_endurance',
            note: { ar: 'مع التقدم: كورة أو وزن ١-٢ كجم', en: 'Progress to holding a ball or 1-2 kg' }
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '50m', stroke: 'breast', intensity: '5', basis: 'rpe', rest: '15s',
            name: { ar: '٤×٥٠ رجل صدر بالراس بره', en: '4x50 head-up breaststroke kick' },
            purpose: { ar: 'قوة الرجل الدائرية للإيجبيتر', en: 'Circular leg strength for eggbeater' },
            component: 'muscular_endurance'
          },
          coolSwim(200, 5)
        ]
      },
      wp_sprint: {
        title: { ar: 'سبرنت وتحمل لاهوائي', en: 'Sprint and anaerobic capacity' },
        goal: { ar: 'سرعة الانطلاق من الوضع العمودي والسبرنت المتكرر.', en: 'Acceleration from vertical and repeated sprint ability.' },
        components: ['speed', 'acceleration', 'anaerobic'],
        rpe: 8,
        duration: 75,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سباحة + ٤×٢٥ تصاعدي بالراس بره', en: 'Warm-up: 400 swim + 4x25 head-up build' }, distance: '500m', stroke: 'free' },
          {
            kind: 'swim', sets: 2, reps: '5', distance: '15m', stroke: 'free', intensity: '100', basis: 'best', rest: '30s', setRest: '2min',
            name: { ar: '١٠×١٥م سبرنت بالراس بره من وضع عمودي', en: '10x15m head-up sprint from vertical' },
            purpose: { ar: 'الانطلاق في الهجوم المرتد', en: 'Counterattack acceleration' },
            component: 'acceleration'
          },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '25m', stroke: 'free', intensity: '95', basis: 'best', rest: '40s',
            name: { ar: '٨×٢٥ سبرنت', en: '8x25 sprint' },
            purpose: { ar: 'سرعة قصوى', en: 'Max speed' },
            component: 'speed'
          },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '20m', stroke: 'free', intensity: '95', basis: 'best', rest: '45s',
            name: { ar: '٦×(١٠م سبرنت + ٥ نطات إيجبيتر + ١٠م سبرنت)', en: '6x(10m sprint + 5 eggbeater jumps + 10m sprint)' },
            purpose: { ar: 'تغيير سريع بين السباحة والوضع العمودي زي المباراة', en: 'Fast horizontal-vertical transitions like a match' },
            component: 'anaerobic'
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '50m', stroke: 'free', intensity: '90', basis: 'best', rest: '1min',
            name: { ar: '٤×٥٠ تحمل لاكتات (هجوم ودفاع)', en: '4x50 lactate (attack and recover)' },
            purpose: { ar: 'الرجوع للدفاع وهو متعب', en: 'Get back on defence while fatigued' },
            component: 'anaerobic'
          },
          coolSwim(300, 6)
        ]
      },
      wp_shoot: {
        title: { ar: 'تمرير وتصويب', en: 'Passing and shooting' },
        goal: { ar: 'دقة التمرير والتصويب من الإيجبيتر وبعد مجهود.', en: 'Passing and shooting accuracy from eggbeater and after exertion.' },
        components: ['technique', 'power', 'tactics'],
        rpe: 7,
        duration: 80,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٣٠٠ سباحة + تمرير أزواج ١٠ دقايق (ناشف وفي الماية)', en: 'Warm-up: 300 swim + 10 min partner passing (dry and wet passes)' }, duration: '15min', stroke: 'free' },
          {
            kind: 'timed', sets: 6, reps: '1', duration: '20s', intensity: '8', basis: 'rpe', rest: '20s',
            name: { ar: 'إيجبيتر حركة جانبية مع كورة', en: 'Lateral eggbeater movement with ball' },
            purpose: { ar: 'مكان وتوازن قبل التصويب', en: 'Position and balance before the shot' },
            component: 'technique'
          },
          {
            kind: 'drill', sets: 5, reps: '5', rest: '1min',
            name: { ar: 'تصويب من ٥م بعد سبرنت ١٠م', en: 'Shot from 5m after a 10m sprint' },
            purpose: { ar: 'تصويب سريع بعد الانطلاق', en: 'Quick shot after a drive' },
            component: 'technique',
            note: { ar: 'ركّن: الزوايا العليا والسفلى بالتبادل', en: 'Target alternating high and low corners' }
          },
          {
            kind: 'drill', sets: 1, reps: '5', rest: '30s',
            name: { ar: 'ضربات جزاء (٥م)', en: 'Penalty shots (5m)' },
            purpose: { ar: 'تصويب تحت ضغط', en: 'Shooting under pressure' },
            component: 'mental'
          },
          {
            kind: 'drill', sets: 4, reps: '3', rest: '1min',
            name: { ar: 'تصويب وهو متعب: ٣٠ث إيجبيتر عالي ثم ٣ تصويبات', en: 'Fatigue shooting: 30s high eggbeater then 3 shots' },
            purpose: { ar: 'دقة في آخر المباراة', en: 'Accuracy late in the match' },
            component: 'power'
          },
          {
            kind: 'drill', sets: 1, reps: '10',
            name: { ar: 'لعب السنتر (الحفرة): استلام ولف وتصويب خلفي', en: 'Centre play: receive, turn and backhand shot' },
            purpose: { ar: 'مهارات مركزية تحت دفاع', en: 'Centre-forward skills under defence' },
            component: 'tactics'
          },
          coolSwim(200, 5)
        ]
      },
      wp_game: {
        title: { ar: 'تحمل خاص باللعب — تقسيمات', en: 'Game conditioning — scrimmages' },
        goal: { ar: 'تحمل بنفس متطلبات المباراة مع قرارات تكتيكية.', en: 'Match-demand conditioning with tactical decisions.' },
        components: ['tactics', 'anaerobic', 'aerobic'],
        rpe: 8,
        duration: 90,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سباحة + تمرير + ٤×١٥م سبرنت', en: 'Warm-up: 400 swim + passing + 4x15m sprint' }, duration: '15min', stroke: 'free' },
          {
            kind: 'drill', sets: 1, reps: '6', rest: '1min',
            name: { ar: 'هجوم مرتد ٣ ضد ٢', en: '3 v 2 counterattack' },
            purpose: { ar: 'قرار سريع في التفوق العددي', en: 'Quick decisions with numerical advantage' },
            component: 'tactics'
          },
          {
            kind: 'drill', sets: 1, reps: '8', duration: '10min',
            name: { ar: 'زيادة عددية ٦ ضد ٥ (باور بلاي)', en: '6 v 5 power play' },
            purpose: { ar: 'تنظيم الهجوم في الزيادة العددية', en: 'Power-play attacking structure' },
            component: 'tactics'
          },
          {
            kind: 'timed', sets: 4, reps: '1', duration: '4min', intensity: '8', basis: 'rpe', rest: '2min',
            name: { ar: 'لعب مصغر ٤ ضد ٤ نص ملعب', en: '4 v 4 small-sided half pool' },
            purpose: { ar: 'تحمل لاهوائي متكرر مع كثافة احتكاك', en: 'Repeated anaerobic efforts with high contact density' },
            component: 'anaerobic'
          },
          {
            kind: 'timed', sets: 4, reps: '1', duration: '7min', intensity: '8', basis: 'rpe', rest: '2min',
            name: { ar: 'تقسيمة ٦ ضد ٦ (٤ أرباع)', en: '6 v 6 scrimmage (four quarters)' },
            purpose: { ar: 'محاكاة المباراة', en: 'Match simulation' },
            component: 'tactics'
          },
          coolSwim(300, 8)
        ]
      },
      wp_gym_str: {
        title: { ar: 'جيم — قوة', en: 'Gym — strength' },
        goal: { ar: 'قوة عامة للرجلين والشد والجذع ووقاية الكتف والحوض.', en: 'General leg, pulling and trunk strength with shoulder and groin prevention.' },
        components: ['strength', 'max_strength', 'prevention'],
        rpe: 7,
        duration: 70,
        items: [
          ...DRY_WARMUP,
          {
            kind: 'strength', libId: 'ex_barbell_back_squat', sets: 4, reps: '5', intensity: '80', basis: '1rm', tempo: '3-0-X-0', rest: '2.5min',
            purpose: { ar: 'قوة الرجلين للإيجبيتر والنط من الماية', en: 'Leg strength for eggbeater and water jumps' },
            component: 'max_strength'
          },
          {
            kind: 'strength', libId: 'ex_pullup', sets: 4, reps: '6', intensity: '8', basis: 'rpe', tempo: '2-0-1-1', rest: '2min',
            purpose: { ar: 'قوة الشد للسباحة والاحتكاك', en: 'Pulling strength for swimming and wrestling for position' },
            component: 'strength'
          },
          {
            kind: 'strength', libId: 'ex_romanian_deadlift', sets: 3, reps: '8', intensity: '70', basis: '1rm', tempo: '3-0-1-0', rest: '2min',
            purpose: { ar: 'سلسلة خلفية وثبات الحوض', en: 'Posterior chain and pelvic stability' },
            component: 'strength'
          },
          {
            kind: 'strength', libId: 'wg_landmine_press', sets: 3, reps: '8/arm', intensity: '7', basis: 'rpe', tempo: '2-0-1-0', rest: '75s',
            purpose: { ar: 'دفع بزاوية آمنة للكتف (بدل الضغط فوق الراس)', en: 'Shoulder-friendly pressing angle (instead of strict overhead)' },
            component: 'strength'
          },
          {
            kind: 'strength', libId: 'ex_copenhagen_plank', sets: 3, reps: '20s/side', intensity: '7', basis: 'rpe', rest: '45s',
            purpose: { ar: 'تقوية العضلات الضامة (أكتر إصابة من الإيجبيتر)', en: 'Adductor strength (most stressed by eggbeater)' },
            component: 'prevention'
          },
          {
            kind: 'strength', libId: 'wg_pallof_press', sets: 3, reps: '10/side', intensity: '7', basis: 'rpe', tempo: '1-2-1-0', rest: '45s',
            purpose: { ar: 'ثبات الجذع ضد الدوران', en: 'Anti-rotation trunk stability' },
            component: 'core'
          },
          ...SHOULDER_PREHAB,
          { kind: 'mobility', libId: 'ad_90_90_hip_switches', sets: 2, reps: '8/side' }
        ]
      },
      wp_gym_pow: {
        title: { ar: 'جيم — قدرة', en: 'Gym — power' },
        goal: { ar: 'قدرة انفجارية للنط والتصويب مع الحفاظ على القوة.', en: 'Explosive power for jumping and shooting while maintaining strength.' },
        components: ['power', 'strength', 'prevention'],
        rpe: 7,
        duration: 60,
        items: [
          ...DRY_WARMUP,
          {
            kind: 'strength', libId: 'ad_hang_power_clean', sets: 4, reps: '3', intensity: '70', basis: '1rm', tempo: 'X', rest: '2min',
            purpose: { ar: 'مد ورك انفجاري', en: 'Explosive hip extension' },
            component: 'power'
          },
          {
            kind: 'drill', libId: 'ex_box_jump', sets: 4, reps: '4', rest: '90s',
            purpose: { ar: 'قدرة الرجلين للنط من الماية', en: 'Leg power for water jumps' },
            component: 'power'
          },
          {
            kind: 'drill', libId: 'ad_medicine_ball_rotational_throw', sets: 3, reps: '6/side', rest: '60s',
            purpose: { ar: 'قدرة الدوران للتصويب', en: 'Rotational power for shooting' },
            component: 'power',
            note: { ar: 'كرة ٣-٥ كجم', en: '3-5 kg ball' }
          },
          {
            kind: 'drill', libId: 'ex_medicine_ball_slam', sets: 3, reps: '6', rest: '60s',
            purpose: { ar: 'قدرة الذراع من فوق الراس', en: 'Overhead arm power' },
            component: 'power'
          },
          {
            kind: 'strength', libId: 'ex_barbell_back_squat', sets: 3, reps: '3', intensity: '82', basis: '1rm', tempo: '2-0-X-0', rest: '2.5min',
            purpose: { ar: 'الحفاظ على القوة في الموسم', en: 'In-season strength maintenance' },
            component: 'max_strength'
          },
          ...SHOULDER_PREHAB,
          { kind: 'mobility', libId: 'ex_thoracic_rotation', sets: 2, reps: '8/side' }
        ]
      },
      wp_recovery: {
        title: { ar: 'استشفاء — سباحة خفيفة ومرونة', en: 'Recovery — easy swim and mobility' },
        goal: { ar: 'استشفاء بعد المباراة أو الحمل العالي.', en: 'Recover after a match or high load.' },
        components: ['recovery', 'mobility'],
        rpe: 3,
        duration: 50,
        items: [
          { kind: 'warmup', name: { ar: '٢٠٠ سهل متنوع', en: '200 easy mixed' }, distance: '200m', stroke: 'im' },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '1000m', stroke: 'free', intensity: '3', basis: 'rpe', duration: '20min',
            name: { ar: '١٠٠٠م سهل (حرة، ظهر، رجلين)', en: '1000m easy (free, back, kick)' },
            purpose: { ar: 'استشفاء نشط', en: 'Active recovery' },
            component: 'recovery'
          },
          { kind: 'mobility', libId: 'ad_90_90_hip_switches', sets: 2, reps: '8/side' },
          { kind: 'mobility', libId: 'ad_sleeper_stretch', sets: 2, reps: '30s/side' },
          { kind: 'mobility', libId: 'ex_hip_flexor_stretch', sets: 2, reps: '30s/side' }
        ]
      },
      wp_match: {
        title: { ar: 'يوم المباراة', en: 'Match day' },
        goal: { ar: 'إحماء كامل ومباراة وتهدئة.', en: 'Full warm-up, match and swim-down.' },
        components: ['tactics', 'anaerobic', 'mental'],
        rpe: 9,
        duration: 110,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء ٢٠ دقيقة: ٣٠٠ سباحة، إيجبيتر، تمرير، تصويب على الحارس، ٤×١٥م سبرنت', en: '20-min warm-up: 300 swim, eggbeater, passing, shots on the keeper, 4x15m sprints' }, duration: '20min', stroke: 'free' },
          {
            kind: 'timed', sets: 4, reps: '1', duration: '8min', intensity: '9', basis: 'rpe', rest: '2-5min',
            name: { ar: 'المباراة (٤ أرباع × ٨ دقايق)', en: 'Match (4 x 8-min quarters)' },
            purpose: { ar: 'تنفيذ خطة اللعب', en: 'Execute the game plan' },
            component: 'tactics'
          },
          coolSwim(400, 10),
          { kind: 'mobility', libId: 'ex_shoulder_stretch', sets: 2, reps: '30s/side' }
        ]
      }
    }
  },

  /* =========================================================
   * 6) غطس (سبرينج بورد) — متوسط — ١٢ أسبوع
   * ========================================================= */
  {
    id: 'pt_diving_int',
    sport: 'diving',
    level: 'intermediate',
    title: { ar: 'موسم غطس سبرينج بورد ١م / ٣م — متوسط', en: 'Springboard diving 1m / 3m season — intermediate' },
    goal: {
      ar: 'تطوير القدرة الانفجارية للارتقاء، ثبات الجذع والمرونة للأشكال (تكور، انثناء، استقامة)، وتقدم آمن على الترامبولين والسلم لقائمة غطسات كاملة في البطولة.',
      en: 'Develop take-off power, trunk stiffness and flexibility for tuck, pike and straight shapes, and a safe trampoline-to-board progression toward a full competition list.'
    },
    components: ['power', 'core', 'mobility', 'technique', 'coordination', 'mental'],
    sessionsPerWeek: 6,
    periods: [
      {
        type: 'gpp',
        goal: {
          ar: 'اختبارات، قدرة بليومترك أرضي، جذع ومرونة، وأساسيات السلم (الاقتراب، الهيرديل، الدخول).',
          en: 'Tests, dryland plyometric power, core and flexibility, and board basics (approach, hurdle, entry).'
        },
        components: ['power', 'core', 'mobility', 'technique'],
        blocks: [
          {
            name: { ar: 'أسبوع اختبارات', en: 'Test week' },
            goal: { ar: 'نطة رأسية، وثب طويل، مرونة الانثناء والكتف، وثبات الهولو.', en: 'Vertical jump, broad jump, pike and shoulder flexibility, hollow hold.' },
            components: ['power', 'mobility', 'core'],
            loads: [4],
            weekTypes: ['test'],
            pattern: ['dv_test', 'dv_core_flex', 'dv_board', 'dv_gym', 'dv_tramp', '', '']
          },
          {
            name: { ar: 'بلوك ١ — أساسيات وقدرة', en: 'Block 1 — Fundamentals and power' },
            goal: { ar: 'بليومترك منخفض لمتوسط، هيرديل ثابت، ودخول عمودي (ريب).', en: 'Low-to-moderate plyometrics, a consistent hurdle and vertical (rip) entries.' },
            components: ['power', 'technique', 'core'],
            loads: [5, 6, 7],
            weekTypes: ['load', 'load', 'shock'],
            pattern: ['dv_dry_plyo', 'dv_board', 'dv_gym', 'dv_tramp', 'dv_core_flex', 'dv_board', '']
          }
        ]
      },
      {
        type: 'spp',
        goal: {
          ar: 'تقدم الشقلبات والتويستات على الترامبولين بالحزام، ثم نقلها للسلم ١م و٣م، وبناء القائمة.',
          en: 'Somersault and twist progressions on trampoline with a harness, transfer to 1m and 3m, and build the list.'
        },
        components: ['technique', 'coordination', 'power'],
        blocks: [
          {
            name: { ar: 'بلوك ٢ — تقدم الغطسات', en: 'Block 2 — Dive progressions' },
            goal: { ar: 'غطسة جديدة لكل مجموعة (أمامي، خلفي، عكسي، داخلي، لف) وتكرار القائمة.', en: 'New dive in each group (forward, back, reverse, inward, twist) and list repetition.' },
            components: ['technique', 'coordination', 'power'],
            loads: [6, 7, 8, 4],
            weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['dv_board', 'dv_dry_plyo', 'dv_tramp', 'dv_list', 'dv_gym', 'dv_board', '']
          }
        ]
      },
      {
        type: 'precomp',
        goal: {
          ar: 'ثبات القائمة كاملة، محاكاة بطولة بتحكيم، وروتين ذهني قبل كل غطسة.',
          en: 'Full-list consistency, judged competition simulations and a pre-dive mental routine.'
        },
        components: ['technique', 'mental', 'power'],
        blocks: [
          {
            name: { ar: 'بلوك ٣ — محاكاة البطولة', en: 'Block 3 — Competition simulation' },
            goal: { ar: 'تكرار القائمة بترتيب البطولة وتحكيم، مع تخفيف في آخر أسبوع.', en: 'List in competition order with scoring, easing off in the last week.' },
            components: ['technique', 'mental'],
            loads: [7, 8, 5],
            weekTypes: ['load', 'shock', 'deload'],
            pattern: ['dv_list', 'dv_dry_plyo', 'dv_board', 'dv_gym', 'dv_tramp', 'dv_sim', '']
          }
        ]
      },
      {
        type: 'comp',
        goal: {
          ar: 'أسبوع البطولة: حجم قليل، ثقة، وتنفيذ القائمة.',
          en: 'Competition week: low volume, confidence and list execution.'
        },
        components: ['mental', 'technique'],
        blocks: [
          {
            name: { ar: 'أسبوع البطولة', en: 'Competition week' },
            goal: { ar: 'غطسات القائمة مرة واحدة بجودة، وبطولة.', en: 'One quality round of the list, then compete.' },
            components: ['mental', 'technique'],
            loads: [4],
            weekTypes: ['comp'],
            pattern: ['dv_board', 'dv_core_flex', 'dv_list', 'dv_tramp', '', 'dv_meet', '']
          }
        ]
      }
    ],
    sessions: {
      dv_test: {
        title: { ar: 'اختبارات بدنية للغطس', en: 'Diving physical tests' },
        goal: { ar: 'قياس القدرة والمرونة والجذع.', en: 'Measure power, flexibility and trunk control.' },
        components: ['power', 'mobility', 'core'],
        rpe: 6,
        duration: 60,
        items: [
          ...DRY_WARMUP,
          {
            kind: 'drill', libId: 'ad_countermovement_jump', sets: 1, reps: '3', rest: '1min',
            purpose: { ar: 'قدرة الارتقاء (أحسن محاولة)', en: 'Take-off power (best of 3)' },
            component: 'power'
          },
          {
            kind: 'drill', libId: 'ad_standing_broad_jump_test', sets: 1, reps: '3', rest: '1min',
            purpose: { ar: 'قدرة أفقية', en: 'Horizontal power' },
            component: 'power'
          },
          {
            kind: 'strength', libId: 'ex_hollow_body_hold', sets: 1, reps: 'max', intensity: '10', basis: 'rpe', rest: '2min',
            purpose: { ar: 'ثبات الجذع للدخول (الهدف ٦٠ث+)', en: 'Trunk stiffness for entries (target 60s+)' },
            component: 'core'
          },
          {
            kind: 'drill', sets: 1, reps: '2',
            name: { ar: 'مرونة الانثناء: جلوس ومد (سم) وعرض مسكة الأستك فوق الراس', en: 'Pike sit-and-reach (cm) and band pass-through grip width' },
            purpose: { ar: 'مرجع المرونة للانثناء والدخول', en: 'Flexibility baseline for pike and entries' },
            component: 'mobility'
          },
          {
            kind: 'timed', libId: 'wg_wall_handstand_push_up', sets: 1, reps: '1', duration: 'max', intensity: '8', basis: 'rpe', rest: '2min',
            name: { ar: 'ثبات وقوف على الإيدين على الحيطة', en: 'Wall handstand hold' },
            purpose: { ar: 'ثبات الكتف للدخول بالإيدين', en: 'Shoulder stability for hands-first entries' },
            component: 'prevention'
          },
          { kind: 'mobility', libId: 'ex_hamstring_stretch', sets: 2, reps: '30s' }
        ]
      },
      dv_dry_plyo: {
        title: { ar: 'بليومترك أرضي وارتقاء', en: 'Dryland plyometrics and take-off' },
        goal: { ar: 'قدرة الارتقاء وتوقيت الدراعين مع الرجلين على الأرض.', en: 'Take-off power and arm-leg timing on land.' },
        components: ['power', 'coordination'],
        rpe: 7,
        duration: 60,
        items: [
          { kind: 'warmup', libId: 'ex_jump_rope', duration: '4min' },
          { kind: 'warmup', libId: 'ad_knee_to_wall_ankle_mobilization', sets: 1, reps: '10/side' },
          {
            kind: 'drill', libId: 'ad_pogo_hop', sets: 3, reps: '15', rest: '60s',
            purpose: { ar: 'صلابة الكاحل لرد فعل السلم', en: 'Ankle stiffness for board recoil' },
            component: 'power'
          },
          {
            kind: 'drill', libId: 'dr_hurdle_hops', sets: 4, reps: '5', rest: '90s',
            purpose: { ar: 'ارتقاء متكرر بزمن تلامس قصير', en: 'Repeated take-offs with short contact time' },
            component: 'power'
          },
          {
            kind: 'drill', libId: 'ad_depth_jump', sets: 4, reps: '4', rest: '2min',
            purpose: { ar: 'قدرة رد الفعل (زي نزول السلم)', en: 'Reactive power (like board depression)' },
            component: 'power',
            note: { ar: 'صندوق ٣٠-٤٥ سم', en: '30-45 cm box' }
          },
          {
            kind: 'drill', sets: 4, reps: '5',
            name: { ar: 'محاكاة الهيرديل والارتقاء على صندوق مع مرجحة الدراعين', en: 'Hurdle and take-off simulation onto a box with arm swing' },
            purpose: { ar: 'توقيت الهيرديل وتوافق الدراعين', en: 'Hurdle timing and arm coordination' },
            component: 'coordination'
          },
          {
            kind: 'drill', sets: 3, reps: '6',
            name: { ar: 'ارتقاء خلفي من الثبات (بريس) على مرتبة', en: 'Standing back take-off (press) onto a mat' },
            purpose: { ar: 'ارتقاء خلفي عمودي بدون ميل', en: 'Vertical back take-off without leaning' },
            component: 'technique'
          },
          { kind: 'mobility', libId: 'ex_calf_stretch', sets: 2, reps: '30s/side' }
        ]
      },
      dv_core_flex: {
        title: { ar: 'جذع ومرونة', en: 'Core and flexibility' },
        goal: { ar: 'أشكال محكمة (تكور، انثناء) وثبات الجسم في الدخول.', en: 'Tight tuck and pike shapes and a rigid body on entry.' },
        components: ['core', 'mobility'],
        rpe: 5,
        duration: 50,
        items: [
          { kind: 'warmup', libId: 'ex_cat_cow', sets: 1, reps: '10' },
          {
            kind: 'strength', libId: 'wg_hollow_rock', sets: 3, reps: '15', intensity: '7', basis: 'rpe', rest: '45s',
            purpose: { ar: 'ثبات جسم مستقيم', en: 'Straight-body stiffness' },
            component: 'core'
          },
          {
            kind: 'strength', libId: 'wg_v_up', sets: 3, reps: '10', intensity: '7', basis: 'rpe', tempo: '1-1-2-0', rest: '45s',
            purpose: { ar: 'سرعة الدخول في شكل الانثناء', en: 'Fast closing into pike' },
            component: 'core'
          },
          {
            kind: 'strength', libId: 'ex_hanging_leg_raise', sets: 3, reps: '8', intensity: '7', basis: 'rpe', tempo: '1-1-2-0', rest: '60s',
            purpose: { ar: 'قوة الانثناء المعلق', en: 'Hanging pike strength' },
            component: 'core'
          },
          {
            kind: 'strength', libId: 'wg_superman_hold', sets: 3, reps: '20s', intensity: '6', basis: 'rpe', rest: '30s',
            purpose: { ar: 'قوة الضهر للخروج من الشقلبة (كيك آوت)', en: 'Back strength for the somersault kick-out' },
            component: 'core'
          },
          { kind: 'mobility', libId: 'ex_hamstring_stretch', sets: 3, reps: '45s', name: { ar: 'إطالة انثناء جلوس مع زميل', en: 'Partner seated pike stretch' } },
          { kind: 'mobility', libId: 'ad_band_pass_through', sets: 2, reps: '10' },
          { kind: 'mobility', libId: 'ad_foam_roller_thoracic_extension', sets: 1, reps: '10' },
          { kind: 'mobility', libId: 'wg_wrist_extension', sets: 1, reps: '15', name: { ar: 'تجهيز الرسغ للدخول بكف مفرود', en: 'Wrist prep for flat-hand entry' } }
        ]
      },
      dv_tramp: {
        title: { ar: 'ترامبولين وسلم ناشف', en: 'Trampoline and dry board' },
        goal: { ar: 'تعلم الشقلبة والتويست بأمان قبل الماية.', en: 'Learn somersaults and twists safely before the water.' },
        components: ['coordination', 'technique', 'balance'],
        rpe: 6,
        duration: 60,
        items: [
          { kind: 'warmup', name: { ar: 'نطات أساسية على الترامبولين ودوران كاحل', en: 'Basic trampoline bounces and ankle circles' }, duration: '8min' },
          {
            kind: 'drill', sets: 3, reps: '10',
            name: { ar: 'أشكال النطة: تكور، انثناء، استقامة، فتح', en: 'Shape jumps: tuck, pike, straight, straddle' },
            purpose: { ar: 'أشكال محكمة في الهوا', en: 'Tight shapes in the air' },
            component: 'coordination'
          },
          {
            kind: 'drill', sets: 3, reps: '5',
            name: { ar: 'شقلبة أمامية متكورة بحزام الأمان', en: 'Front tuck somersault in spotting belt' },
            purpose: { ar: 'إحساس الدوران الأمامي والخروج', en: 'Forward rotation and kick-out timing' },
            component: 'technique'
          },
          {
            kind: 'drill', sets: 3, reps: '5',
            name: { ar: 'شقلبة خلفية متكورة بحزام الأمان', en: 'Back tuck somersault in spotting belt' },
            purpose: { ar: 'إحساس الدوران الخلفي وفتح الرؤية', en: 'Backward rotation and spotting' },
            component: 'technique'
          },
          {
            kind: 'drill', sets: 3, reps: '5',
            name: { ar: 'تويست: نطة مستقيمة نص لفة ثم لفة كاملة', en: 'Twist: straight jump half then full twist' },
            purpose: { ar: 'تكنيك التويست (ضم الدراعين)', en: 'Twist mechanics (arm wrap)' },
            component: 'coordination'
          },
          {
            kind: 'drill', libId: 'ad_single_leg_balance_progression', sets: 2, reps: '30s/leg',
            purpose: { ar: 'توازن للوقوف على طرف السلم', en: 'Balance for standing at the board end' },
            component: 'balance'
          },
          { kind: 'mobility', libId: 'ex_childs_pose', sets: 1, reps: '45s' }
        ]
      },
      dv_board: {
        title: { ar: 'سلم ١م / ٣م — تكنيك', en: 'Springboard 1m / 3m — technique' },
        goal: { ar: 'اقتراب وهيرديل ثابت، ارتقاء عمودي، ودخول بدون رش.', en: 'Consistent approach and hurdle, vertical take-off and a rip entry.' },
        components: ['technique', 'power', 'coordination'],
        rpe: 6,
        duration: 90,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء أرضي ١٠ دقايق + ٤ نطات بالرجل من ١م', en: '10-min dryland warm-up + 4 feet-first jumps from 1m' }, duration: '15min' },
          {
            kind: 'drill', sets: 1, reps: '10',
            name: { ar: 'اقتراب وهيرديل ونطة بالرجل (١م)', en: 'Approach, hurdle and feet-first jump (1m)' },
            purpose: { ar: 'هيرديل ثابت في نفس النقطة كل مرة', en: 'Hurdle landing on the same spot every time' },
            component: 'technique'
          },
          {
            kind: 'drill', sets: 1, reps: '8',
            name: { ar: 'ارتقاء خلفي (بريس) ونطة مستقيمة', en: 'Back press and straight jump' },
            purpose: { ar: 'توقيت نزول السلم مع الدراعين', en: 'Timing board depression with the arms' },
            component: 'power'
          },
          {
            kind: 'drill', sets: 1, reps: '8',
            name: { ar: 'تمرين الدخول: وقوع من الحافة بالإيدين (ريب)', en: 'Entry drill: fall-ins from the edge hands-first (rip)' },
            purpose: { ar: 'دخول عمودي بكف مفرود وجسم مشدود', en: 'Vertical flat-hand entry with a tight body' },
            component: 'technique'
          },
          {
            kind: 'drill', sets: 1, reps: '12',
            name: { ar: 'غطسات القائمة: ٢-٣ من كل مجموعة (أمامي، خلفي، عكسي، داخلي، لف)', en: 'List dives: 2-3 from each group (forward, back, reverse, inward, twist)' },
            purpose: { ar: 'تكرار جودة للغطسات الحالية', en: 'Quality repetitions of current dives' },
            component: 'technique',
            note: { ar: 'غطسة جديدة تبدأ على ١م بعد ما تتثبت على الترامبولين', en: 'A new dive starts on 1m only after it is consistent on trampoline' }
          },
          { kind: 'mobility', libId: 'ex_shoulder_stretch', sets: 2, reps: '30s/side' }
        ]
      },
      dv_list: {
        title: { ar: 'تكرار القائمة على ٣م', en: 'List work on 3m' },
        goal: { ar: 'تنفيذ القائمة كاملة بجودة ثابتة.', en: 'Execute the full list with consistent quality.' },
        components: ['technique', 'mental'],
        rpe: 7,
        duration: 90,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء أرضي + ٦ غطسات سهلة من ١م', en: 'Dryland warm-up + 6 easy dives from 1m' }, duration: '20min' },
          {
            kind: 'drill', sets: 2, reps: '6', rest: '3min',
            name: { ar: 'القائمة كاملة (٦ غطسات) بترتيب البطولة × ٢ جولة', en: 'Full list (6 dives) in competition order x 2 rounds' },
            purpose: { ar: 'ثبات الأداء والتعود على الترتيب', en: 'Performance consistency and familiarity with the order' },
            component: 'technique',
            note: { ar: 'المدرب يدي درجة من ١٠ لكل غطسة', en: 'Coach scores each dive out of 10' }
          },
          {
            kind: 'drill', sets: 1, reps: '4',
            name: { ar: 'تكرار أضعف غطسة', en: 'Repeat the weakest dive' },
            purpose: { ar: 'تحسين نقطة الضعف', en: 'Fix the weak link' },
            component: 'technique'
          },
          {
            kind: 'drill', sets: 1, reps: '6',
            name: { ar: 'روتين ذهني قبل الغطسة (تنفس وتصور)', en: 'Pre-dive mental routine (breath and visualisation)' },
            purpose: { ar: 'تركيز ثابت قبل كل غطسة', en: 'Consistent focus before each dive' },
            component: 'mental'
          },
          { kind: 'mobility', libId: 'ex_hamstring_stretch', sets: 2, reps: '30s' }
        ]
      },
      dv_gym: {
        title: { ar: 'جيم — قوة للغطاس', en: 'Gym — diver strength' },
        goal: { ar: 'قوة الرجلين والكتف بدون زيادة وزن كبيرة.', en: 'Leg and shoulder strength without much mass gain.' },
        components: ['max_strength', 'power', 'prevention'],
        rpe: 7,
        duration: 60,
        items: [
          ...DRY_WARMUP,
          {
            kind: 'strength', libId: 'ex_front_squat', sets: 4, reps: '4', intensity: '80', basis: '1rm', tempo: '2-0-X-0', rest: '2.5min',
            purpose: { ar: 'قوة قصوى للارتقاء بجذع مستقيم', en: 'Max strength for take-off with an upright trunk' },
            component: 'max_strength'
          },
          {
            kind: 'strength', libId: 'ex_romanian_deadlift', sets: 3, reps: '6', intensity: '70', basis: '1rm', tempo: '3-0-1-0', rest: '2min',
            purpose: { ar: 'سلسلة خلفية للارتقاء والخروج', en: 'Posterior chain for take-off and kick-out' },
            component: 'strength'
          },
          {
            kind: 'strength', libId: 'ex_chinup', sets: 3, reps: '6', intensity: '8', basis: 'rpe', tempo: '2-0-1-1', rest: '90s',
            purpose: { ar: 'قوة ضم الدراعين في التويست', en: 'Arm-wrap strength for twisting' },
            component: 'strength'
          },
          {
            kind: 'strength', libId: 'ex_calf_raise', sets: 3, reps: '12', intensity: '7', basis: 'rpe', tempo: '1-1-2-0', rest: '60s',
            purpose: { ar: 'قوة الكاحل لطرد السلم', en: 'Ankle strength for board drive' },
            component: 'strength'
          },
          {
            kind: 'strength', libId: 'ex_nordic_hamstring_curl', sets: 3, reps: '4', intensity: '8', basis: 'rpe', tempo: '4-0-X-0', rest: '90s',
            purpose: { ar: 'وقاية الخلفية مع كثرة النط', en: 'Hamstring protection with high jump volume' },
            component: 'prevention'
          },
          ...SHOULDER_PREHAB,
          { kind: 'mobility', libId: 'ex_hip_flexor_stretch', sets: 2, reps: '30s/side' }
        ]
      },
      dv_sim: {
        title: { ar: 'محاكاة بطولة بتحكيم', en: 'Judged competition simulation' },
        goal: { ar: 'روتين البطولة بالكامل تحت ضغط التحكيم.', en: 'The full competition routine under judging pressure.' },
        components: ['mental', 'technique'],
        rpe: 8,
        duration: 100,
        items: [
          { kind: 'warmup', name: { ar: 'روتين إحماء البطولة: ١٥ دقيقة أرضي + ٢٠ دقيقة على السلم', en: 'Competition warm-up routine: 15 min dryland + 20 min on board' }, duration: '35min' },
          {
            kind: 'drill', sets: 2, reps: '6', rest: '4min',
            name: { ar: 'جولتين قائمة كاملة بتحكيم ٣ حكام', en: 'Two full-list rounds scored by 3 judges' },
            purpose: { ar: 'أداء تحت ضغط والتعود على الانتظار بين الغطسات', en: 'Perform under pressure and manage waiting between dives' },
            component: 'mental'
          },
          {
            kind: 'drill', sets: 1, reps: '1',
            name: { ar: 'مراجعة الفيديو والدرجات', en: 'Video and score review' },
            purpose: { ar: 'تحديد أولويات الأسبوع الجاي', en: 'Set next week\'s priorities' },
            component: 'technique'
          },
          { kind: 'mobility', libId: 'ex_childs_pose', sets: 1, reps: '45s' }
        ]
      },
      dv_meet: {
        title: { ar: 'يوم البطولة', en: 'Competition day' },
        goal: { ar: 'تنفيذ القائمة بثقة.', en: 'Execute the list with confidence.' },
        components: ['mental', 'technique'],
        rpe: 8,
        duration: 150,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء أرضي ١٥ دقيقة: جري خفيف، مرونة، نطات، ارتقاء على الأرض', en: '15-min dryland warm-up: light jog, mobility, jumps, land take-offs' }, duration: '15min' },
          { kind: 'warmup', name: { ar: 'إحماء السلم الرسمي: ٦-٨ غطسات من القائمة', en: 'Official board warm-up: 6-8 list dives' }, duration: '20min' },
          {
            kind: 'drill', sets: 1, reps: '6',
            name: { ar: 'البطولة: ٦ غطسات القائمة', en: 'Competition: 6-dive list' },
            purpose: { ar: 'أحسن مجموع درجات', en: 'Best total score' },
            component: 'technique',
            note: { ar: 'بين الغطسات: دفا، روتين ذهني، ولا تتفرج على المنافسين', en: 'Between dives: stay warm, mental routine, avoid watching rivals' }
          },
          { kind: 'mobility', libId: 'ex_hamstring_stretch', sets: 1, reps: '30s' }
        ]
      }
    }
  },

  /* =========================================================
   * 7) ركوب الأمواج — متوسط — ١٠ أسابيع
   * ========================================================= */
  {
    id: 'pt_surfing_int',
    sport: 'surfing',
    level: 'intermediate',
    title: { ar: 'برنامج ركوب الأمواج — متوسط', en: 'Surfing program — intermediate' },
    goal: {
      ar: 'تحمل تجديف أعلى، سرعة تجديف للحاق بالموجة، بوب أب انفجاري، توازن ديناميكي، وكتف محمي قبل رحلة سيرف أو بطولة محلية.',
      en: 'Greater paddle endurance, paddle speed to catch waves, an explosive pop-up, dynamic balance and a protected shoulder ahead of a surf trip or local contest.'
    },
    components: ['aerobic', 'muscular_endurance', 'power', 'balance', 'prevention', 'technique'],
    sessionsPerWeek: 5,
    periods: [
      {
        type: 'gpp',
        goal: {
          ar: 'اختبارات، قاعدة تحمل تجديف (سباحة ودراعات)، قوة عامة، ووقاية الكتف.',
          en: 'Tests, paddle-endurance base (swim and pull), general strength and shoulder prevention.'
        },
        components: ['aerobic', 'muscular_endurance', 'strength', 'prevention'],
        blocks: [
          {
            name: { ar: 'أسبوع اختبارات', en: 'Test week' },
            goal: { ar: '٤٠٠م سباحة، سبرنت ٢٥م، عدد البوب أب في ٣٠ث، وتوازن رجل واحدة.', en: '400m swim, 25m sprint, pop-ups in 30s and single-leg balance.' },
            components: ['aerobic', 'power', 'balance'],
            loads: [4],
            weekTypes: ['test'],
            pattern: ['sf_test', 'sf_prehab', 'sf_paddle_end', 'sf_strength', '', 'sf_surf', '']
          },
          {
            name: { ar: 'بلوك ١ — تحمل التجديف والقوة', en: 'Block 1 — Paddle endurance and strength' },
            goal: { ar: 'حجم تجديف متصاعد، قوة شد وجذع، وكتف أقوى.', en: 'Rising paddle volume, pulling and trunk strength, stronger shoulder.' },
            components: ['aerobic', 'muscular_endurance', 'strength'],
            loads: [5, 6, 7],
            weekTypes: ['load', 'load', 'shock'],
            pattern: ['sf_paddle_end', 'sf_strength', 'sf_prehab', 'sf_paddle_end', '', 'sf_surf', '']
          }
        ]
      },
      {
        type: 'spp',
        goal: {
          ar: 'سرعة تجديف وقدرة، بوب أب انفجاري، وتوازن ديناميكي قريب من حركات الموجة.',
          en: 'Paddle speed and power, an explosive pop-up and wave-specific dynamic balance.'
        },
        components: ['power', 'speed', 'balance', 'anaerobic'],
        blocks: [
          {
            name: { ar: 'بلوك ٢ — قدرة وتوازن', en: 'Block 2 — Power and balance' },
            goal: { ar: 'سبرنت تجديف ١٥م، بليومترك دفع للبوب أب، ولوح توازن.', en: '15m paddle sprints, push plyometrics for the pop-up, balance board.' },
            components: ['power', 'speed', 'balance'],
            loads: [5, 7, 8, 4],
            weekTypes: ['load', 'load', 'shock', 'deload'],
            pattern: ['sf_paddle_power', 'sf_strength', 'sf_popup', 'sf_paddle_end', '', 'sf_surf', '']
          }
        ]
      },
      {
        type: 'precomp',
        goal: {
          ar: 'نقل اللياقة للموج: جلسات سيرف أكتر، حجم جيم أقل، وجاهزية للرحلة أو البطولة.',
          en: 'Transfer fitness to the waves: more surf sessions, less gym volume, readiness for the trip or contest.'
        },
        components: ['technique', 'power', 'recovery'],
        blocks: [
          {
            name: { ar: 'بلوك ٣ — جاهزية وموج', en: 'Block 3 — Readiness and waves' },
            goal: { ar: 'سيرف مرتين في الأسبوع مع صيانة القدرة والكتف، وتخفيف آخر أسبوع.', en: 'Surf twice a week while maintaining power and the shoulder, easing off in the last week.' },
            components: ['technique', 'power', 'recovery'],
            loads: [6, 4],
            weekTypes: ['load', 'comp'],
            pattern: ['sf_paddle_power', 'sf_popup', 'sf_prehab', '', 'sf_surf', 'sf_surf', '']
          }
        ]
      }
    ],
    sessions: {
      sf_test: {
        title: { ar: 'اختبارات السيرف', en: 'Surf fitness tests' },
        goal: { ar: 'قياس تحمل وسرعة التجديف والبوب أب والتوازن.', en: 'Measure paddle endurance and speed, pop-up and balance.' },
        components: ['aerobic', 'power', 'balance'],
        rpe: 7,
        duration: 70,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٣٠٠ سباحة سهلة + ٤×٢٥ تصاعدي', en: 'Warm-up: 300 easy swim + 4x25 build' }, distance: '400m', stroke: 'free' },
          {
            kind: 'swim', sets: 1, reps: '1', distance: '400m', stroke: 'free', intensity: '10', basis: 'rpe', rest: '8min', restType: 'active',
            name: { ar: 'اختبار ٤٠٠م حرة', en: '400m freestyle test' },
            purpose: { ar: 'مؤشر تحمل التجديف', en: 'Paddle-endurance marker' },
            component: 'aerobic'
          },
          {
            kind: 'swim', sets: 1, reps: '2', distance: '25m', stroke: 'free', intensity: '100', basis: 'best', rest: '3min',
            name: { ar: '٢×٢٥م سبرنت من الثبات', en: '2x25m sprint from a floating start' },
            purpose: { ar: 'مؤشر سرعة اللحاق بالموجة', en: 'Wave-catching speed marker' },
            component: 'speed'
          },
          {
            kind: 'drill', sets: 1, reps: 'max', duration: '30s',
            name: { ar: 'عدد البوب أب الصحيح في ٣٠ث', en: 'Clean pop-ups in 30s' },
            purpose: { ar: 'قدرة وسرعة الوقوف', en: 'Pop-up power and speed' },
            component: 'power'
          },
          {
            kind: 'drill', libId: 'ad_y_balance_test', sets: 1, reps: '3/leg',
            purpose: { ar: 'توازن ديناميكي وفرق بين الرجلين', en: 'Dynamic balance and side-to-side asymmetry' },
            component: 'balance'
          },
          { kind: 'mobility', libId: 'ad_sleeper_stretch', sets: 2, reps: '30s/side' }
        ]
      },
      sf_paddle_end: {
        title: { ar: 'تحمل التجديف (مسبح)', en: 'Paddle endurance (pool)' },
        goal: { ar: 'تحمل الدراعات والكتف للتجديف الطويل خارج منطقة الكسر.', en: 'Arm and shoulder endurance for long paddle-outs.' },
        components: ['aerobic', 'muscular_endurance'],
        rpe: 6,
        duration: 70,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ متنوع سهل', en: 'Warm-up: 400 easy mixed' }, distance: '400m', stroke: 'im' },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '200m', stroke: 'free', intensity: 'CSS+5s', basis: 'css', rest: '20s',
            name: { ar: '٦×٢٠٠ حرة (راس بره كل ٤ ضربات)', en: '6x200 free (head up every 4th stroke)' },
            purpose: { ar: 'تحمل هوائي مع رفع الراس زي وضع التجديف', en: 'Aerobic endurance with head lift like paddling' },
            component: 'aerobic'
          },
          {
            kind: 'swim', sets: 1, reps: '4', distance: '200m', stroke: 'pull', intensity: 'CSS+4s', basis: 'css', rest: '20s',
            name: { ar: '٤×٢٠٠ دراعات بالعوامة والبادلز', en: '4x200 pull with buoy and paddles' },
            purpose: { ar: 'تحمل الدراعات — التجديف كله دراعات', en: 'Arm endurance — paddling is all arms' },
            component: 'muscular_endurance'
          },
          {
            kind: 'swim', sets: 1, reps: '8', distance: '50m', stroke: 'free', intensity: '6', basis: 'rpe', rest: '15s',
            name: { ar: '٨×٥٠ حرة بالراس بره وضهر مقوس', en: '8x50 head-up free with arched back' },
            purpose: { ar: 'تحمل عضلات الضهر في وضع التجديف', en: 'Back-extensor endurance in paddle posture' },
            component: 'muscular_endurance'
          },
          coolSwim(200, 5)
        ]
      },
      sf_paddle_power: {
        title: { ar: 'سرعة وقدرة التجديف', en: 'Paddle speed and power' },
        goal: { ar: 'سرعة اللحاق بالموجة والتجديف للرجوع بسرعة.', en: 'Speed to catch waves and sprint back into position.' },
        components: ['speed', 'power', 'anaerobic'],
        rpe: 8,
        duration: 60,
        items: [
          { kind: 'warmup', name: { ar: 'إحماء: ٤٠٠ سباحة + ٤×٢٥ تصاعدي', en: 'Warm-up: 400 swim + 4x25 build' }, distance: '500m', stroke: 'free' },
          {
            kind: 'swim', sets: 2, reps: '5', distance: '15m', stroke: 'free', intensity: '100', basis: 'best', rest: '45s', setRest: '2min',
            name: { ar: '١٠×١٥م سبرنت (محاكاة اللحاق بالموجة)', en: '10x15m sprint (wave-catch simulation)' },
            purpose: { ar: 'تسارع من الثبات', en: 'Acceleration from a floating start' },
            component: 'speed'
          },
          {
            kind: 'swim', sets: 1, reps: '6', distance: '50m', stroke: 'free', intensity: '90', basis: 'best', rest: '1min',
            name: { ar: '٦×٥٠ سريع', en: '6x50 hard' },
            purpose: { ar: 'تحمل سرعة للتجديف ضد التيار', en: 'Speed endurance for paddling against current' },
            component: 'anaerobic'
          },
          {
            kind: 'timed', libId: 'ad_skierg_sprint_intervals', sets: 8, reps: '1', duration: '20s', intensity: '9', basis: 'rpe', rest: '40s',
            purpose: { ar: 'قدرة الدراعين والضهر (بديل لو مفيش مسبح)', en: 'Arm and back power (alternative when no pool)' },
            component: 'power',
            note: { ar: 'في البحر: ٨×(٢٠ث تجديف أقصى / ٤٠ث سهل) على اللوح', en: 'In the ocean: 8x(20s max paddle / 40s easy) on the board' }
          },
          coolSwim(300, 6)
        ]
      },
      sf_strength: {
        title: { ar: 'جيم — قوة للسيرفر', en: 'Gym — surfer strength' },
        goal: { ar: 'قوة الشد والرجلين والدوران للانعطافات.', en: 'Pulling, leg and rotational strength for turns.' },
        components: ['strength', 'core', 'prevention'],
        rpe: 7,
        duration: 65,
        items: [
          ...DRY_WARMUP,
          {
            kind: 'strength', libId: 'ex_pullup', sets: 4, reps: '6', intensity: '8', basis: 'rpe', tempo: '2-0-1-1', rest: '2min',
            purpose: { ar: 'قوة الشد للتجديف', en: 'Pulling strength for paddling' },
            component: 'strength'
          },
          {
            kind: 'strength', libId: 'wg_trap_bar_deadlift', sets: 4, reps: '5', intensity: '75', basis: '1rm', tempo: '2-0-X-0', rest: '2min',
            purpose: { ar: 'قوة الرجلين والورك للبوتوم تيرن', en: 'Leg and hip strength for the bottom turn' },
            component: 'strength'
          },
          {
            kind: 'strength', libId: 'ex_bulgarian_split_squat', sets: 3, reps: '8/leg', intensity: '7', basis: 'rpe', tempo: '3-0-1-0', rest: '90s',
            purpose: { ar: 'قوة رجل واحدة في وقفة السيرف', en: 'Single-leg strength in surf stance' },
            component: 'strength'
          },
          {
            kind: 'strength', libId: 'ex_one_arm_dumbbell_row', sets: 3, reps: '10/arm', intensity: '7', basis: 'rpe', tempo: '2-1-1-0', rest: '60s',
            purpose: { ar: 'قوة شد أحادي', en: 'Unilateral pulling strength' },
            component: 'strength'
          },
          {
            kind: 'strength', libId: 'ad_landmine_rotation', sets: 3, reps: '8/side', intensity: '7', basis: 'rpe', rest: '60s',
            purpose: { ar: 'قوة الدوران للكات باك', en: 'Rotational strength for cutbacks' },
            component: 'core'
          },
          {
            kind: 'strength', libId: 'wg_pallof_press', sets: 3, reps: '10/side', intensity: '6', basis: 'rpe', tempo: '1-2-1-0', rest: '45s',
            purpose: { ar: 'ثبات الجذع ضد الدوران', en: 'Anti-rotation trunk stability' },
            component: 'core'
          },
          ...SHOULDER_PREHAB,
          { kind: 'mobility', libId: 'ad_90_90_hip_switches', sets: 2, reps: '8/side' }
        ]
      },
      sf_popup: {
        title: { ar: 'بوب أب وقدرة وتوازن', en: 'Pop-up power and balance' },
        goal: { ar: 'وقوف أسرع على اللوح وتوازن ديناميكي.', en: 'A faster pop-up and dynamic balance.' },
        components: ['power', 'balance', 'coordination'],
        rpe: 7,
        duration: 55,
        items: [
          ...DRY_WARMUP,
          {
            kind: 'drill', libId: 'ex_pushup', sets: 4, reps: '5', rest: '60s',
            name: { ar: 'ضغط انفجاري (الإيدين تسيب الأرض)', en: 'Explosive push-up (hands leave the floor)' },
            purpose: { ar: 'قدرة الدفع لأول جزء من البوب أب', en: 'Push power for the first phase of the pop-up' },
            component: 'power'
          },
          {
            kind: 'drill', sets: 5, reps: '5', rest: '45s',
            name: { ar: 'بوب أب من النوم على البطن لوقفة السيرف (على خط)', en: 'Prone-to-stance pop-up (on a line)' },
            purpose: { ar: 'وقوف في خطوة واحدة والرجلين في مكانهم', en: 'One-motion pop-up landing with feet on the line' },
            component: 'technique'
          },
          {
            kind: 'drill', libId: 'wg_skater_hop', sets: 3, reps: '6/side', rest: '60s',
            purpose: { ar: 'نقل الوزن الجانبي مع ثبات الهبوط', en: 'Lateral weight shift with stable landing' },
            component: 'balance'
          },
          {
            kind: 'drill', libId: 'ad_lateral_bound_and_stick', sets: 3, reps: '4/side', rest: '60s',
            purpose: { ar: 'امتصاص القوة زي الهبوط بعد مناورة', en: 'Force absorption like landing a manoeuvre' },
            component: 'power'
          },
          {
            kind: 'timed', libId: 'ek_balance_board', sets: 4, reps: '1', duration: '45s', intensity: '6', basis: 'rpe', rest: '30s',
            purpose: { ar: 'توازن ديناميكي في وقفة السيرف', en: 'Dynamic balance in surf stance' },
            component: 'balance',
            note: { ar: 'تقدم: عيون مقفولة أو مسك كرة', en: 'Progress: eyes closed or catching a ball' }
          },
          {
            kind: 'drill', libId: 'ad_medicine_ball_rotational_throw', sets: 3, reps: '6/side', rest: '60s',
            purpose: { ar: 'قدرة الدوران للانعطاف', en: 'Rotational power for turns' },
            component: 'power'
          },
          { kind: 'mobility', libId: 'ad_pigeon_stretch', sets: 1, reps: '45s/side' }
        ]
      },
      sf_prehab: {
        title: { ar: 'وقاية الكتف ومرونة', en: 'Shoulder prehab and mobility' },
        goal: { ar: 'كتف أقوى ومدى حركي أحسن للضهر والحوض.', en: 'A stronger shoulder and better thoracic and hip range.' },
        components: ['prevention', 'mobility', 'recovery'],
        rpe: 3,
        duration: 35,
        items: [
          { kind: 'warmup', libId: 'ex_cat_cow', sets: 1, reps: '10' },
          ...SHOULDER_PREHAB,
          {
            kind: 'strength', libId: 'wg_prone_t_raise', sets: 2, reps: '12', intensity: '6', basis: 'rpe', tempo: '2-1-2-0', rest: '30s',
            purpose: { ar: 'عضلات منتصف الضهر لوضع التجديف', en: 'Mid-back muscles for paddle posture' },
            component: 'prevention'
          },
          {
            kind: 'strength', libId: 'ad_serratus_wall_slide', sets: 2, reps: '10', intensity: '5', basis: 'rpe', tempo: '2-0-2-0', rest: '30s',
            purpose: { ar: 'حركة لوح الكتف فوق الراس', en: 'Overhead scapular rhythm' },
            component: 'prevention'
          },
          { kind: 'mobility', libId: 'ad_sleeper_stretch', sets: 2, reps: '30s/side' },
          { kind: 'mobility', libId: 'ad_foam_roller_thoracic_extension', sets: 1, reps: '10' },
          { kind: 'mobility', libId: 'ex_thoracic_rotation', sets: 2, reps: '8/side' },
          { kind: 'mobility', libId: 'ad_90_90_hip_switches', sets: 2, reps: '8/side' }
        ]
      },
      sf_surf: {
        title: { ar: 'جلسة سيرف في البحر', en: 'Ocean surf session' },
        goal: { ar: 'تطبيق اللياقة على الموج مع هدف تكنيك واضح.', en: 'Apply fitness in the waves with a clear technique focus.' },
        components: ['technique', 'aerobic', 'balance'],
        rpe: 6,
        duration: 100,
        items: [
          { kind: 'warmup', libId: 'wg_worlds_greatest_stretch', sets: 1, reps: '5/side', name: { ar: 'إحماء على الشط ١٠ دقايق + ٥ بوب أب', en: '10-min beach warm-up + 5 pop-ups' } },
          {
            kind: 'drill', sets: 1, reps: '1', duration: '60-90min',
            name: { ar: 'سيرف: هدف تكنيك واحد (بوتوم تيرن / كات باك)', en: 'Surf: one technique focus (bottom turn / cutback)' },
            purpose: { ar: 'تحسين المناورة المستهدفة', en: 'Improve the target manoeuvre' },
            component: 'technique',
            note: { ar: 'سجل عدد الموجات. أمان: ما تسرفش لوحدك واعرف التيارات قبل النزول.', en: 'Log wave count. Safety: never surf alone and check rip currents first.' }
          },
          {
            kind: 'timed', sets: 1, reps: '1', duration: '10min', intensity: '7', basis: 'rpe',
            name: { ar: 'تجديف مكثف للرجوع لنقطة الانتظار', en: 'Hard paddle-backs to the line-up' },
            purpose: { ar: 'تحمل تجديف خاص', en: 'Specific paddle endurance' },
            component: 'muscular_endurance'
          },
          { kind: 'mobility', libId: 'ex_childs_pose', sets: 1, reps: '45s' }
        ]
      }
    }
  }
];
