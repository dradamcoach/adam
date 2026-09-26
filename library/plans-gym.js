/*
 * قوالب الخطط الموسمية لرياضات الجيم: كمال أجسام، باورليفتنج، رفع أثقال أولمبي،
 * سترونج مان، كاليسثنكس، ولياقة عامة (قوة للمبتدئين، حرق دهون، قوة وصحة عظام للسيدات).
 * كل قالب دورة كاملة: فترات ← بلوكات ← أسابيع ← تمرينات بتفاصيل الشدة (مع أساسها)
 * والحجم والتمبو والراحة والهدف. الدوال الصغيرة تحت بتختصر الكتابة بس، والناتج بيانات عادية.
 */
const t = (ar, en) => ({ ar, en });
/* تمرين قوة: libId (أو null مع name في x) — مجموعات — عدات — شدة — أساس الشدة — راحة */
const S = (libId, sets, reps, intensity, basis, rest, x = {}) =>
  Object.assign({ kind: 'strength' }, libId ? { libId } : {}, { sets, reps, intensity, basis, rest }, x);
const P = (ar, en, component) => ({ purpose: t(ar, en), component });
const N = (ar, en) => ({ note: t(ar, en) });
const wu = (libId, x = {}) => Object.assign({ kind: 'warmup', libId }, x);
const wuN = (ar, en, x = {}) => Object.assign({ kind: 'warmup', name: t(ar, en) }, x);
const mob = (libId, x = {}) => Object.assign({ kind: 'mobility', libId }, x);
const mobN = (ar, en, x = {}) => Object.assign({ kind: 'mobility', name: t(ar, en) }, x);
/* مجموعات تسخين متدرجة على الرفعة الأساسية */
const ramp = (libId, reps, ar, en) => ({ kind: 'warmup', libId, sets: reps.split('-').length, reps, note: t(ar, en) });

/* إحماء وتهدئة متكررين (دوال عشان كل تمرينة تاخد نسخة مستقلة) */
const genWU = (libId = 'ex_stationary_bike') => wu(libId, {
  duration: '5min',
  note: t('إحماء عام بمجهود خفيف (RPE 3-4) لحد ما الجسم يسخن ويبدأ عرق خفيف', 'Easy general warm-up (RPE 3-4) until warm with a light sweat')
});
const lowerPrep = () => [
  wu('ad_90_90_hip_switches', { sets: 1, reps: '8/side' }),
  wu('wg_banded_lateral_walk', { sets: 2, reps: '10/side', note: t('تفعيل الألوية الجانبية قبل السكوات والرفعة الميتة', 'Glute med activation before squats and hinges') })
];
const upperPrep = () => [
  wu('ad_band_pass_through', { sets: 2, reps: '10' }),
  wu('ex_band_pull_apart', { sets: 2, reps: '15', note: t('لوح الكتف لورا وتحت، من غير ما ترفع الكتف', 'Scapulae back and down, no shrugging') })
];
const coolLower = () => [
  mob('ad_couch_stretch', { duration: '1min/side' }),
  mob('ex_hamstring_stretch', { duration: '45s/side' })
];
const coolUpper = () => [
  mob('wg_doorway_chest_stretch', { duration: '45s/side' }),
  mob('ad_foam_roller_thoracic_extension', { duration: '2min' })
];
const coolFull = () => mobN('تهدئة ومرونة: حوض، أوتار خلفية، صدر وظهر علوي + تنفس بطيء', 'Cool-down mobility: hips, hamstrings, chest and upper back + slow nasal breathing', { duration: '8min' });

/* ============ 1) كمال أجسام — تضخيم متوسط (16 أسبوع) ============ */
const T_BB_HYP = {
  id: 'pt_bodybuilding_hyp_int',
  sport: 'bodybuilding',
  level: 'intermediate',
  title: t('كمال أجسام — دورة تضخيم ١٦ أسبوع (متوسط)', 'Bodybuilding — 16-week hypertrophy cycle (intermediate)'),
  goal: t('زيادة الكتلة العضلية الصافية مع رفع القوة في رفعات الأساس، بتدرج في الحجم (من الحد الأدنى الفعال للأعلى) وبتقليل العدات المتبقية RIR من ٣ لـ ٠-١، مع أسابيع تخفيف منتظمة.',
    'Add lean muscle mass while raising strength on the base lifts, progressing volume from minimum effective toward maximum adaptive and reducing RIR from 3 to 0-1, with regular deloads.'),
  components: ['hypertrophy', 'strength', 'muscular_endurance', 'technique', 'recovery'],
  sessionsPerWeek: 5,
  periods: [
    {
      type: 'accumulation',
      goal: t('بناء الحجم التدريبي والتكنيك: تقسيمة أعلى/أسفل ثم دفع/سحب/أرجل، والمجموعات بتزيد تدريجيًا.', 'Accumulate volume and groove technique: upper/lower then push/pull/legs, sets added progressively.'),
      components: ['hypertrophy', 'muscular_endurance', 'technique'],
      blocks: [
        {
          name: t('أسبوع ٠ — قياسات وأوزان بداية', 'Week 0 — Baseline and starting loads'),
          goal: t('اختبار 5RM في السكوات والبنش والضغط فوق الرأس، قياسات الجسم والصور، وتحديد أوزان العمل على RIR 3.', 'Test 5RM on squat, bench and overhead press, take body measurements and photos, and set working loads at RIR 3.'),
          components: ['strength', 'technique'],
          loads: [4],
          weekTypes: ['test'],
          pattern: ['test', '', 'upB', '', 'lowB', '', 'cardio']
        },
        {
          name: t('بلوك ١ — تأسيس (أعلى/أسفل)', 'Block 1 — Foundation (upper/lower)'),
          goal: t('٤ أيام أعلى/أسفل، ١٠-١٢ مجموعة أسبوعيًا للعضلة. RIR 3 ثم 2 ثم 1، والأسبوع الرابع تخفيف (نص المجموعات، RIR 4).', '4-day upper/lower, 10-12 weekly sets per muscle. RIR 3, 2, 1, then deload in week 4 (half the sets, RIR 4).'),
          components: ['hypertrophy', 'technique'],
          loads: [5, 6, 7, 3],
          weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['upA', 'lowA', '', 'upB', 'lowB', 'cardio', '']
        },
        {
          name: t('بلوك ٢ — تراكم الحجم (دفع/سحب/أرجل + أعلى/أسفل)', 'Block 2 — Volume accumulation (PPL + upper/lower)'),
          goal: t('٥ أيام، ١٤-١٨ مجموعة أسبوعيًا للعضلة. زود مجموعة للعضلات المتأخرة لو الاستشفاء كويس. الأسبوع الرابع تخفيف.', '5 days, 14-18 weekly sets per muscle. Add a set to lagging muscles if recovery allows. Week 4 is a deload.'),
          components: ['hypertrophy', 'muscular_endurance'],
          loads: [6, 7, 8, 3],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['push', 'pull', 'legs', '', 'upA', 'lowB', 'cardio']
        }
      ]
    },
    {
      type: 'transmutation',
      goal: t('تكثيف: عدات أقل (٥-٨) وأوزان أعلى مع تقنيات شدة (مجموعة قمة + باك أوف، ميو ريبس، جزئيات في وضع الإطالة).', 'Intensification: fewer reps (5-8), heavier loads and intensity techniques (top set + back-offs, myo-reps, lengthened partials).'),
      components: ['hypertrophy', 'max_strength'],
      blocks: [
        {
          name: t('بلوك ٣ — تكثيف', 'Block 3 — Intensification'),
          goal: t('رفع الأوزان مع ثبات الحجم تقريبًا. مجموعة القمة RIR 1، والعزل لحد الفشل الفني في آخر مجموعة. الأسبوع الرابع تخفيف.', 'Raise loads with roughly stable volume. Top sets at RIR 1, isolation to technical failure on the last set. Week 4 deload.'),
          components: ['hypertrophy', 'max_strength', 'strength'],
          loads: [6, 7, 8, 3],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['pushH', 'pullH', 'legsH', '', 'upB', 'lowA', 'cardio']
        }
      ]
    },
    {
      type: 'realization',
      goal: t('حمل زائد وظيفي لمدة أسبوعين ثم تخفيف واختبار لقياس المكسب.', 'Two weeks of functional overreaching, then unload and test to measure gains.'),
      components: ['hypertrophy', 'strength', 'recovery'],
      blocks: [
        {
          name: t('بلوك ٤ — حمل زائد مخطط', 'Block 4 — Planned overreach'),
          goal: t('٦ أيام: جلسات التكثيف + جلسات الحجم. راقب النوم والشهية وأداء الرفعات؛ لو الأداء نزل أكتر من ١٠٪ ادخل التخفيف بدري.', '6 days: intensification + volume sessions. Monitor sleep, appetite and bar performance; if performance drops >10%, unload early.'),
          components: ['hypertrophy', 'muscular_endurance'],
          loads: [8, 9],
          weekTypes: ['load', 'shock'],
          pattern: ['pushH', 'pullH', 'legsH', '', 'push', 'pull', 'legs']
        },
        {
          name: t('أسبوع ١٦ — تخفيف واختبار', 'Week 16 — Unload and test'),
          goal: t('جلستين خفاف (نص المجموعات، RIR 3) ثم إعادة اختبار 5RM والقياسات والصور، ومقارنتها بأسبوع ٠.', 'Two light sessions (half the sets, RIR 3), then retest 5RM, measurements and photos against week 0.'),
          components: ['strength', 'recovery'],
          loads: [4],
          weekTypes: ['test'],
          pattern: ['upA', '', 'lowA', '', 'test', '', '']
        }
      ]
    }
  ],
  sessions: {
    test: {
      title: t('اختبار 5RM وقياسات', '5RM test and measurements'),
      goal: t('تحديد القوة الحالية وحساب 1RM التقديري لنسب الأوزان، وتوثيق القياسات.', 'Establish current strength, estimate 1RM for load percentages and document measurements.'),
      components: ['strength', 'technique'],
      rpe: 8, duration: 75,
      items: [
        genWU('ex_rowing_machine'), ...lowerPrep(),
        ramp('ex_barbell_back_squat', '8-5-3-2-1', 'البار فاضي ×٨، ٥٠٪ ×٥، ٦٥٪ ×٣، ٧٥٪ ×٢، ٨٥٪ ×١ من الـ 5RM المتوقع', 'Empty bar x8, 50% x5, 65% x3, 75% x2, 85% x1 of expected 5RM'),
        S('ex_barbell_back_squat', 1, '5', '1', 'rir', '4min', { ...P('اختبار 5RM: وصل لأتقل ٥ عدات بتكنيك نضيف (RIR 1). 1RM التقديري = الوزن × ١.١٥', '5RM test: reach the heaviest clean set of 5 (RIR 1). Estimated 1RM = load x 1.15', 'max_strength'), ...N('٢-٣ محاولات بعد التسخين بزيادة ٢.٥-٥ كجم', '2-3 attempts after warm-up, adding 2.5-5 kg') }),
        S('ex_barbell_bench_press', 1, '5', '1', 'rir', '4min', { ...P('اختبار 5RM بنش بنفس الطريقة، مع مساعد (سبوتر)', 'Bench 5RM test, same method, with a spotter', 'max_strength') }),
        S('wg_overhead_press', 1, '5', '1', 'rir', '3min', P('اختبار 5RM ضغط فوق الرأس واقف', 'Standing overhead press 5RM test', 'max_strength')),
        S('ex_pullup', 1, 'max', '0', 'rir', '3min', P('أقصى عدد عقلة كاملة (من فرد كامل لذقن فوق البار)', 'Max strict pull-ups (full hang to chin over bar)', 'muscular_endurance')),
        { kind: 'drill', name: t('قياسات وصور التقدم: وزن الصباح، محيط الوسط والصدر والذراع والفخذ، صور بنفس الإضاءة', 'Progress check: morning weight, waist/chest/arm/thigh girths, photos in the same lighting'), sets: 1, reps: '1', ...P('توثيق نقطة البداية عشان نقيس التضخيم فعلًا مش بالإحساس', 'Document the baseline so hypertrophy is measured, not guessed', 'hypertrophy') },
        ...coolLower()
      ]
    },
    upA: {
      title: t('أعلى أ — تركيز أفقي (بنش وتجديف)', 'Upper A — horizontal focus (bench and row)'),
      goal: t('قوة وتضخيم للصدر والظهر في المستوى الأفقي مع أكتاف وذراعين.', 'Strength-hypertrophy for chest and back in the horizontal plane plus shoulders and arms.'),
      components: ['hypertrophy', 'strength'],
      rpe: 8, duration: 75,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        ramp('ex_barbell_bench_press', '10-5-3', 'البار ×١٠، ٥٠٪ ×٥، ٦٥٪ ×٣', 'Bar x10, 50% x5, 65% x3'),
        S('ex_barbell_bench_press', 4, '6-8', '72.5-77.5', '1rm', '3min', { tempo: '3-0-1-0', ...P('الرفعة الأساسية لتضخيم الصدر وبناء قوة الدفع', 'Main lift for chest hypertrophy and pressing strength', 'strength'), ...N('ابدأ ٧٢.٥٪ وزود ٢.٥٪ كل أسبوع لو كل العدات كملت عند RIR 2', 'Start at 72.5% and add 2.5% weekly if all reps are completed at RIR 2') }),
        S('wg_chest_supported_row', 4, '8-10', '3-1', 'rir', '2min', { tempo: '2-1-1-0', ...P('ظهر أوسط وسميك من غير ضغط على أسفل الظهر', 'Mid-back thickness without lower-back fatigue', 'hypertrophy') }),
        S('ex_incline_dumbbell_press', 3, '10-12', '3-1', 'rir', '2min', { tempo: '3-0-1-0', ...P('صدر علوي بمدى حركي كامل', 'Upper chest through a full range', 'hypertrophy') }),
        S('ex_lat_pulldown', 3, '10-12', '2-1', 'rir', '90s', { tempo: '2-1-1-0', ...P('عرض الظهر (اللاتس)', 'Lat width', 'hypertrophy') }),
        S('ex_lateral_raise', 3, '12-15', '1-0', 'rir', '60s', { tempo: '2-0-1-1', ...P('كتف جانبي لعرض الجزء العلوي', 'Side delts for upper-body width', 'hypertrophy') }),
        S('ex_triceps_pushdown', 2, '12-15', '1-0', 'rir', '60s', P('ترايسبس — حجم مباشر', 'Triceps direct volume', 'hypertrophy')),
        S('ex_dumbbell_curl', 2, '10-12', '1-0', 'rir', '60s', { tempo: '2-0-1-1', ...P('بايسبس — حجم مباشر', 'Biceps direct volume', 'hypertrophy') }),
        coolUpper()[0]
      ]
    },
    lowA: {
      title: t('أسفل أ — تركيز سكوات', 'Lower A — squat focus'),
      goal: t('تضخيم الفخذ الأمامي والألوية مع قوة السكوات.', 'Quad and glute hypertrophy with squat strength.'),
      components: ['hypertrophy', 'strength', 'core'],
      rpe: 8, duration: 75,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_barbell_back_squat', '8-5-3-2', 'البار ×٨، ٥٠٪ ×٥، ٦٠٪ ×٣، ٦٧.٥٪ ×٢', 'Bar x8, 50% x5, 60% x3, 67.5% x2'),
        S('ex_barbell_back_squat', 4, '6-8', '70-77.5', '1rm', '3min', { tempo: '3-0-1-0', ...P('الرفعة الأساسية للرجلين: قوة وتضخيم للفخذ الأمامي والألوية', 'Main leg lift: quad and glute strength-hypertrophy', 'strength') }),
        S('ex_romanian_deadlift', 3, '8-10', '3-1', 'rir', '2.5min', { tempo: '3-0-1-0', ...P('الخلفية والألوية في وضع الإطالة', 'Hamstrings and glutes at long muscle lengths', 'hypertrophy') }),
        S('ex_leg_press', 3, '10-12', '2-1', 'rir', '2min', { tempo: '2-1-1-0', ...P('حجم إضافي للفخذ الأمامي بإجهاد قليل للظهر', 'Extra quad volume with low spinal load', 'hypertrophy') }),
        S('ek_seated_leg_curl', 3, '10-12', '1-0', 'rir', '90s', { tempo: '2-0-1-1', ...P('الخلفية بثني الركبة (جالس = إطالة أكبر)', 'Knee-flexion hamstrings (seated = more stretch)', 'hypertrophy') }),
        S('ex_standing_calf_raise_machine', 4, '8-12', '1-0', 'rir', '60s', { tempo: '2-2-1-0', ...P('سمانة مع وقفة ثانيتين تحت في الإطالة', 'Calves with a 2-second pause in the stretch', 'hypertrophy') }),
        S('ex_hanging_leg_raise', 3, '10-15', '2', 'rir', '60s', P('عضلات البطن وثبات الجذع', 'Abs and trunk control', 'core')),
        ...coolLower()
      ]
    },
    upB: {
      title: t('أعلى ب — تركيز رأسي (ضغط فوق الرأس وعقلة)', 'Upper B — vertical focus (overhead press and pull-up)'),
      goal: t('أكتاف وعرض الظهر مع حجم إضافي للصدر والذراعين وصحة الكتف.', 'Shoulders and back width with extra chest/arm volume and shoulder health.'),
      components: ['hypertrophy', 'strength', 'prevention'],
      rpe: 8, duration: 75,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        ramp('wg_overhead_press', '8-5-3', 'البار ×٨، ٥٥٪ ×٥، ٦٥٪ ×٣', 'Bar x8, 55% x5, 65% x3'),
        S('wg_overhead_press', 4, '6-8', '70-75', '1rm', '2.5min', { tempo: '2-0-1-0', ...P('قوة وتضخيم الكتف الأمامي والترايسبس', 'Front delt and triceps strength-hypertrophy', 'strength') }),
        S('ex_pullup', 4, '6-10', '2-1', 'rir', '2min', { tempo: '2-1-1-0', ...P('عرض الظهر؛ زود وزن لو عديت ١٠ عدات بسهولة', 'Back width; add load once 10 reps are easy', 'hypertrophy') }),
        S('wg_machine_chest_press', 3, '10-12', '2-1', 'rir', '90s', { tempo: '3-0-1-0', ...P('حجم صدر بثبات عالي وقرب من الفشل بأمان', 'Stable chest volume that can be taken close to failure safely', 'hypertrophy') }),
        S('ex_seated_cable_row', 3, '10-12', '2-1', 'rir', '90s', { tempo: '2-1-1-0', ...P('ظهر أوسط مع قبضة لوح الكتف في الآخر', 'Mid-back with a scapular squeeze at the end', 'hypertrophy') }),
        S('wg_cable_lateral_raise', 3, '12-15', '1-0', 'rir', '60s', P('كتف جانبي بمقاومة ثابتة على المدى', 'Side delts with constant cable tension', 'hypertrophy')),
        S('ex_face_pull', 3, '15', '2', 'rir', '60s', P('كتف خلفي ودوارات خارجية لصحة الكتف', 'Rear delts and external rotators for shoulder health', 'prevention')),
        S('ex_hammer_curl', 3, '10-12', '1', 'rir', '60s', P('العضلة العضدية والساعد', 'Brachialis and forearms', 'hypertrophy')),
        coolUpper()[1]
      ]
    },
    lowB: {
      title: t('أسفل ب — تركيز مفصل الحوض (ديدليفت)', 'Lower B — hinge focus (deadlift)'),
      goal: t('ألوية وخلفية وقوة سلسلة خلفية، مع رجل واحدة للتوازن بين الجانبين.', 'Glutes, hamstrings and posterior-chain strength, plus unilateral work for balance.'),
      components: ['hypertrophy', 'strength', 'balance'],
      rpe: 8, duration: 75,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_deadlift', '5-3-2', '٤٠٪ ×٥، ٥٥٪ ×٣، ٦٥٪ ×٢', '40% x5, 55% x3, 65% x2'),
        S('ex_deadlift', 3, '5', '70-77.5', '1rm', '3min', { ...P('قوة السلسلة الخلفية بحجم قليل وإجهاد محسوب', 'Posterior-chain strength with low, controlled volume', 'strength'), ...N('كل عدة من الأرض بثبات (مش تنطيط)', 'Reset every rep from the floor, no bouncing') }),
        S('ex_bulgarian_split_squat', 3, '8-10/leg', '2-1', 'rir', '90s', { tempo: '2-0-1-0', ...P('فخذ وألوية برجل واحدة وتصحيح الفرق بين الرجلين', 'Single-leg quad/glute work and side-to-side balance', 'hypertrophy') }),
        S('wg_hack_squat', 3, '10-12', '2-1', 'rir', '2min', { tempo: '3-1-1-0', ...P('فخذ أمامي بمدى عميق وثبات عالي', 'Deep, stable quad work', 'hypertrophy') }),
        S('ek_lying_leg_curl_machine', 3, '10-12', '1-0', 'rir', '90s', { tempo: '2-0-1-1', ...P('الخلفية بثني الركبة', 'Knee-flexion hamstrings', 'hypertrophy') }),
        S('ex_hip_thrust', 3, '10-12', '2', 'rir', '90s', { tempo: '1-0-1-2', ...P('الألوية في الانقباض الكامل مع ثبات ثانيتين فوق', 'Glutes at full contraction with a 2-second hold', 'hypertrophy') }),
        S('ek_seated_calf_raise_using_machine', 3, '12-15', '1', 'rir', '60s', P('السوليوس (سمانة جالس)', 'Soleus (seated calf)', 'hypertrophy')),
        S('wg_cable_crunch', 3, '12-15', '2', 'rir', '60s', P('بطن بمقاومة قابلة للتدرج', 'Loadable ab flexion', 'core')),
        coolLower()[0]
      ]
    },
    push: {
      title: t('دفع — حجم (صدر، أكتاف، ترايسبس)', 'Push — volume (chest, shoulders, triceps)'),
      goal: t('حجم عالي لعضلات الدفع بعدات ٨-١٥.', 'High volume for pushing muscles in the 8-15 rep range.'),
      components: ['hypertrophy', 'muscular_endurance'],
      rpe: 8, duration: 80,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        ramp('ex_barbell_bench_press', '10-5-3', 'البار ×١٠، ٥٠٪ ×٥، ٦٠٪ ×٣', 'Bar x10, 50% x5, 60% x3'),
        S('ex_barbell_bench_press', 4, '8-10', '67.5-72.5', '1rm', '2.5min', { tempo: '3-0-1-0', ...P('حجم أساسي للصدر', 'Primary chest volume', 'hypertrophy') }),
        S('ex_incline_dumbbell_press', 3, '10-12', '2-1', 'rir', '2min', { tempo: '3-0-1-0', ...P('صدر علوي', 'Upper chest', 'hypertrophy') }),
        S('ex_dumbbell_shoulder_press', 3, '10-12', '2-1', 'rir', '2min', P('كتف أمامي وترايسبس', 'Front delts and triceps', 'hypertrophy')),
        S('wg_cable_fly', 3, '12-15', '1-0', 'rir', '60s', { tempo: '2-1-1-0', ...P('صدر في وضع الإطالة بمقاومة ثابتة', 'Chest in the stretched position with constant tension', 'hypertrophy') }),
        S('ex_lateral_raise', 4, '12-20', '1-0', 'rir', '60s', { tempo: '2-0-1-1', ...P('كتف جانبي — أكتر عضلة بتستفيد من الحجم العالي', 'Side delts respond well to high volume', 'hypertrophy') }),
        S('ek_triceps_pushdown_with_rope_and_cable', 3, '12-15', '1-0', 'rir', '60s', P('ترايسبس الرأس الجانبية', 'Triceps lateral head', 'hypertrophy')),
        S('ex_overhead_triceps_extension', 2, '12-15', '1', 'rir', '60s', P('الرأس الطويلة للترايسبس في الإطالة', 'Triceps long head in the stretch', 'hypertrophy')),
        coolUpper()[0]
      ]
    },
    pull: {
      title: t('سحب — حجم (ظهر، كتف خلفي، بايسبس)', 'Pull — volume (back, rear delts, biceps)'),
      goal: t('حجم عالي للظهر بزوايا مختلفة مع كتف خلفي وبايسبس.', 'High back volume from several angles plus rear delts and biceps.'),
      components: ['hypertrophy', 'muscular_endurance'],
      rpe: 8, duration: 80,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        S('ex_bent_over_row', 4, '8-10', '2-1', 'rir', '2min', { tempo: '2-1-1-0', ...P('سُمك الظهر وقوة الجذع', 'Back thickness and trunk strength', 'hypertrophy'), ...N('أول مجموعة تسخين خفيفة ×١٠ مش محسوبة', 'One light x10 warm-up set first, not counted') }),
        S('ex_lat_pulldown', 4, '10-12', '2-1', 'rir', '90s', { tempo: '2-1-1-0', ...P('عرض الظهر', 'Lat width', 'hypertrophy') }),
        S('wg_chest_supported_row', 3, '10-12', '1', 'rir', '90s', P('ظهر علوي ومعيّنية', 'Upper back and rhomboids', 'hypertrophy')),
        S('ek_dumbbell_bent_arm_pullover', 2, '12-15', '1', 'rir', '60s', { tempo: '3-1-1-0', ...P('اللاتس في الإطالة', 'Lats in the stretched position', 'hypertrophy') }),
        S('wg_reverse_pec_deck', 3, '15-20', '1-0', 'rir', '60s', P('كتف خلفي', 'Rear delts', 'hypertrophy')),
        S('ex_shrugs', 3, '10-12', '1', 'rir', '60s', { tempo: '1-2-1-0', ...P('الترابيس العلوية', 'Upper traps', 'hypertrophy') }),
        S('ex_barbell_curl', 3, '8-12', '1', 'rir', '60s', P('بايسبس — حمل تدريجي', 'Biceps — progressive loading', 'hypertrophy')),
        S('ek_alternating_incline_curl_with_dumbbell', 2, '10-12', '0-1', 'rir', '60s', P('بايسبس في الإطالة (بنش مائل)', 'Biceps in the stretch (incline)', 'hypertrophy')),
        coolUpper()[1]
      ]
    },
    legs: {
      title: t('أرجل — حجم', 'Legs — volume'),
      goal: t('حجم عالي للفخذ والخلفية والسمانة.', 'High volume for quads, hamstrings and calves.'),
      components: ['hypertrophy', 'muscular_endurance', 'core'],
      rpe: 9, duration: 85,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_barbell_back_squat', '8-5-3', 'البار ×٨، ٥٠٪ ×٥، ٦٠٪ ×٣', 'Bar x8, 50% x5, 60% x3'),
        S('ex_barbell_back_squat', 4, '8-10', '65-72.5', '1rm', '3min', { tempo: '3-0-1-0', ...P('حجم أساسي للفخذ والألوية', 'Primary quad/glute volume', 'hypertrophy') }),
        S('ex_romanian_deadlift', 3, '10', '2', 'rir', '2min', { tempo: '3-0-1-0', ...P('الخلفية في الإطالة', 'Hamstrings lengthened', 'hypertrophy') }),
        S('ex_walking_lunge', 3, '12/leg', '2', 'rir', '90s', P('فخذ وألوية برجل واحدة', 'Unilateral quads and glutes', 'hypertrophy')),
        S('ex_leg_extension', 3, '12-15', '1-0', 'rir', '60s', { tempo: '2-0-1-1', ...P('الفخذ الأمامي (المستقيمة الفخذية)', 'Quads including rectus femoris', 'hypertrophy') }),
        S('ek_seated_leg_curl', 3, '12-15', '1-0', 'rir', '60s', P('الخلفية بثني الركبة', 'Knee-flexion hamstrings', 'hypertrophy')),
        S('ex_standing_calf_raise_machine', 4, '10-15', '1-0', 'rir', '60s', { tempo: '2-2-1-0', ...P('سمانة', 'Calves', 'hypertrophy') }),
        S('ex_ab_wheel_rollout', 3, '8-12', '2', 'rir', '60s', P('مقاومة فرد الجذع', 'Anti-extension core', 'core')),
        ...coolLower()
      ]
    },
    pushH: {
      title: t('دفع — تكثيف', 'Push — intensification'),
      goal: t('أوزان أعلى في الدفع: مجموعة قمة ثم باك أوف، وميو ريبس للكتف.', 'Heavier pushing: top set then back-offs, myo-reps for delts.'),
      components: ['hypertrophy', 'max_strength'],
      rpe: 9, duration: 75,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        ramp('ex_barbell_bench_press', '8-5-3-1', 'البار ×٨، ٥٠٪ ×٥، ٦٥٪ ×٣، ٧٥٪ ×١', 'Bar x8, 50% x5, 65% x3, 75% x1'),
        S('ex_barbell_bench_press', 1, '5', '80-85', '1rm', '4min', { tempo: '2-1-X-0', ...P('مجموعة قمة ثقيلة (RIR 1) لرفع القوة والتوتر الميكانيكي', 'Heavy top set (RIR 1) for strength and mechanical tension', 'max_strength'), ...N('وقفة ثانية على الصدر', '1-second pause on the chest') }),
        S('ex_barbell_bench_press', 3, '8', '70-72.5', '1rm', '2.5min', { tempo: '3-0-1-0', ...P('باك أوف لحجم التضخيم', 'Back-off sets for hypertrophy volume', 'hypertrophy') }),
        S('ex_incline_dumbbell_press', 3, '6-8', '1', 'rir', '2min', { tempo: '3-0-1-0', ...P('صدر علوي بأوزان أتقل', 'Heavier upper chest', 'hypertrophy') }),
        S('wg_weighted_dip', 3, '6-10', '1', 'rir', '2min', P('صدر سفلي وترايسبس بحمل تدريجي', 'Lower chest and triceps, progressively loaded', 'hypertrophy')),
        S('ex_lateral_raise', 1, '15+5+5+5+5', '0', 'rir', '5 breaths', { ...P('ميو ريبس: مجموعة تفعيل ١٥ ثم ٤ دفعات ×٥ براحة ٥ أنفاس', 'Myo-reps: 15-rep activation set then 4 mini-sets of 5 with 5 breaths rest', 'hypertrophy') }),
        S('ex_close_grip_bench_press', 3, '6-8', '2-1', 'rir', '2min', P('ترايسبس بحمل عالي ودعم البنش', 'Heavy triceps work supporting the bench', 'strength')),
        coolUpper()[0]
      ]
    },
    pullH: {
      title: t('سحب — تكثيف', 'Pull — intensification'),
      goal: t('عقلة بوزن وتجديف تقيل مع جزئيات في وضع الإطالة.', 'Weighted pull-ups, heavy rows and lengthened partials.'),
      components: ['hypertrophy', 'max_strength'],
      rpe: 9, duration: 75,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        ramp('wg_weighted_pull_up', '5-3', 'وزن الجسم ×٥، ثم نص الوزن الإضافي ×٣', 'Bodyweight x5, then half the added load x3'),
        S('wg_weighted_pull_up', 4, '5-7', '2-1', 'rir', '2.5min', { tempo: '2-1-1-0', ...P('قوة وتضخيم اللاتس بحمل عالي', 'Heavy lat strength-hypertrophy', 'max_strength') }),
        S('wg_pendlay_row', 4, '6', '2-1', 'rir', '2min', P('تجديف انفجاري من الأرض لسُمك الظهر', 'Explosive dead-stop row for back thickness', 'strength')),
        S('wg_meadows_row', 3, '8-10/side', '1', 'rir', '90s', P('لاتس وظهر علوي بإيد واحدة', 'Single-arm lats and upper back', 'hypertrophy')),
        S('ex_seated_cable_row', 3, '10+5', '0', 'rir', '90s', { ...P('١٠ عدات كاملة + ٥ جزئيات في وضع الإطالة', '10 full reps + 5 lengthened partials', 'hypertrophy') }),
        S('wg_cable_rear_delt_fly', 3, '15-20', '0-1', 'rir', '60s', P('كتف خلفي', 'Rear delts', 'hypertrophy')),
        S('ex_preacher_curl', 3, '6-10', '1', 'rir', '90s', { tempo: '3-0-1-0', ...P('بايسبس بحمل أعلى ونزول بطيء', 'Heavier biceps with slow eccentrics', 'hypertrophy') }),
        coolUpper()[1]
      ]
    },
    legsH: {
      title: t('أرجل — تكثيف', 'Legs — intensification'),
      goal: t('سكوات قمة ثقيلة وباك أوف، هاك سكوات وجزئيات للخلفية.', 'Heavy squat top set with back-offs, hack squats and hamstring partials.'),
      components: ['hypertrophy', 'max_strength', 'core'],
      rpe: 9, duration: 80,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_barbell_back_squat', '5-3-2-1', '٥٠٪ ×٥، ٦٠٪ ×٣، ٧٠٪ ×٢، ٧٧.٥٪ ×١', '50% x5, 60% x3, 70% x2, 77.5% x1'),
        S('ex_barbell_back_squat', 1, '4-6', '80-85', '1rm', '4min', { tempo: '2-0-X-0', ...P('مجموعة قمة RIR 1', 'Top set at RIR 1', 'max_strength') }),
        S('ex_barbell_back_squat', 3, '6', '72.5', '1rm', '3min', { tempo: '3-0-1-0', ...P('باك أوف لحجم الفخذ', 'Back-offs for quad volume', 'hypertrophy') }),
        S('wg_hack_squat', 3, '6-8', '1', 'rir', '2min', { tempo: '3-1-1-0', ...P('فخذ أمامي تقيل وعميق', 'Heavy, deep quad work', 'hypertrophy') }),
        S('ex_romanian_deadlift', 3, '6-8', '2-1', 'rir', '2.5min', { tempo: '3-0-1-0', ...P('خلفية وألوية بحمل أعلى', 'Heavier hamstrings and glutes', 'hypertrophy') }),
        S('ek_lying_leg_curl_machine', 3, '8-10+4', '0', 'rir', '90s', P('كيرل لحد الفشل + ٤ جزئيات في الإطالة', 'Curls to failure + 4 lengthened partials', 'hypertrophy')),
        S('ex_standing_calf_raise_machine', 4, '6-10', '1', 'rir', '90s', { tempo: '2-2-1-0', ...P('سمانة بحمل عالي', 'Heavy calves', 'hypertrophy') }),
        ...coolLower()
      ]
    },
    cardio: {
      title: t('كارديو منطقة ٢ ومرونة', 'Zone 2 cardio and mobility'),
      goal: t('صحة القلب وتحسين الاستشفاء بين الجلسات من غير ما نأثر على التضخيم.', 'Cardiovascular health and better between-session recovery without blunting hypertrophy.'),
      components: ['aerobic', 'recovery', 'mobility'],
      rpe: 4, duration: 50,
      items: [
        wu('wg_walking', { duration: '5min' }),
        { kind: 'timed', libId: 'wg_treadmill_incline_walk', sets: 1, duration: '30-40min', intensity: 'Z2', basis: 'hr', ...P('هوائي منخفض الشدة (تقدر تتكلم بجمل كاملة)', 'Low-intensity aerobic work (can speak in full sentences)', 'aerobic'), ...N('ميل ٨-١٢٪ وسرعة ٥-٦ كم/س', 'Incline 8-12%, speed 5-6 km/h') },
        coolFull()
      ]
    }
  }
};

/* ============ 2) كمال أجسام — تجهيز لبطولة (متقدم، 16 أسبوع) ============ */
const T_BB_PREP = {
  id: 'pt_bodybuilding_prep_adv',
  sport: 'bodybuilding',
  level: 'advanced',
  title: t('كمال أجسام — تجهيز للبطولة ١٦ أسبوع (متقدم)', 'Bodybuilding — 16-week contest prep (advanced)'),
  goal: t('الوصول للمسرح بأقل نسبة دهون مع الحفاظ على أقصى كتلة عضلية: الحفاظ على الأوزان (الشدة) وتقليل الحجم تدريجيًا مع العجز في السعرات، وتمرين بوزينج يومي، وأسبوع ذروة محسوب.',
    'Reach the stage at minimal body fat while retaining maximal muscle: keep loads (intensity) high, taper volume as the deficit deepens, practise posing daily and run a controlled peak week.'),
  components: ['hypertrophy', 'strength', 'aerobic', 'technique', 'recovery', 'mental'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'spp',
      goal: t('بداية التنشيف (١٦-١٣ أسبوع قبل البطولة): عجز ٣٠٠-٥٠٠ سعر، نزول ٠.٥-٠.٧٪ من وزن الجسم أسبوعيًا، والحجم التدريبي زي الأوف سيزون تقريبًا.', 'Early prep (16-13 weeks out): 300-500 kcal deficit, losing 0.5-0.7% bodyweight per week, training volume close to off-season.'),
      components: ['hypertrophy', 'strength', 'aerobic'],
      blocks: [
        {
          name: t('بلوك ١ — بداية التنشيف', 'Block 1 — Early prep'),
          goal: t('٥ أيام حديد + يوم كارديو وبوزينج. الأوزان ثابتة أو بتزيد، RIR 1-2. خطوات ٨٠٠٠-١٠٠٠٠ يوميًا. الأسبوع الرابع تخفيف تدريبي (مش غذائي).', '5 lifting days + 1 cardio/posing day. Loads held or rising, RIR 1-2. 8,000-10,000 steps/day. Week 4 is a training deload (not a diet break).'),
          components: ['hypertrophy', 'strength', 'aerobic'],
          loads: [7, 8, 8, 5],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['push', 'pull', 'legsQ', 'cardio', 'upper', 'legsH', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('منتصف التنشيف (١٢-٥ أسابيع قبل البطولة): الحجم ينزل ١٥-٣٠٪ على مرحلتين، الشدة ثابتة، الكارديو يزيد تدريجيًا والبوزينج يبقى يومي.', 'Mid prep (12-5 weeks out): volume reduced 15-30% in two steps, intensity maintained, cardio added gradually and posing daily.'),
      components: ['hypertrophy', 'strength', 'aerobic', 'technique'],
      blocks: [
        {
          name: t('بلوك ٢ — منتصف التنشيف أ', 'Block 2 — Mid prep A'),
          goal: t('نفس التقسيمة مع حذف مجموعة من كل تمرين عزل (حوالي -١٥٪ حجم). الكارديو ٣-٤ مرات ٣٠ دقيقة Z2. ريفيد كربوهيدرات يوم أسبوعيًا لو النزول منتظم.', 'Same split, one set removed from each isolation exercise (about -15% volume). Cardio 3-4 x 30 min Z2. One carb refeed day per week if loss is on track.'),
          components: ['hypertrophy', 'aerobic'],
          loads: [7, 8, 7, 4],
          weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['push', 'pull', 'legsQ', 'cardio', 'upper', 'legsH', '']
        },
        {
          name: t('بلوك ٣ — منتصف التنشيف ب', 'Block 3 — Mid prep B'),
          goal: t('الانتقال لتقسيمة أعلى/أسفل بحجم أقل (-٢٥-٣٠٪) مع الحفاظ على الأوزان التقيلة. بوزينج ٢٠-٣٠ دقيقة يوميًا وعرض روتين كامل مرتين أسبوعيًا.', 'Switch to a lower-volume upper/lower split (-25-30%) while keeping heavy loads. Posing 20-30 min daily and a full routine run-through twice weekly.'),
          components: ['hypertrophy', 'strength', 'technique'],
          loads: [7, 7, 6, 4],
          weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['upperL', 'lowerL', 'pose', 'upper', 'legsH', 'pose', '']
        }
      ]
    },
    {
      type: 'comp',
      goal: t('آخر التنشيف وأسبوع الذروة: حجم أقل، شدة محفوظة، ترطيب وصوديوم ثابتين، وتحميل كربوهيدرات محسوب قبل المسرح.', 'Late prep and peak week: lower volume, preserved intensity, consistent water and sodium, and a controlled carb-up before the stage.'),
      components: ['hypertrophy', 'technique', 'mental', 'recovery'],
      blocks: [
        {
          name: t('بلوك ٤ — آخر التنشيف (٤-٢ أسابيع قبل)', 'Block 4 — Late prep (4-2 weeks out)'),
          goal: t('٤ أيام أعلى/أسفل (-٣٥-٤٠٪ حجم)، RIR 2 عشان نحمي الاستشفاء. بوزينج يومي وتدريب على الترانزيشن والنفس. تقييم أسبوعي بالصور مع الكوتش.', '4-day upper/lower (-35-40% volume), RIR 2 to protect recovery. Daily posing plus transitions and breathing. Weekly photo check-ins with the coach.'),
          components: ['hypertrophy', 'technique', 'mental'],
          loads: [6, 6, 5],
          weekTypes: ['load', 'load', 'taper'],
          pattern: ['upperL', 'lowerL', 'pose', 'upperL', 'lowerL', 'pose', '']
        },
        {
          name: t('أسبوع الذروة — البطولة', 'Peak week — Show'),
          goal: t('جلسة كاملة الجسم معتدلة أول الأسبوع، بعدها بامب خفيف. زيادة الكربوهيدرات ٢٤-٤٨ ساعة قبل المسرح، والمياه والصوديوم بدون تلاعب حاد. البطولة آخر الأسبوع.', 'One moderate full-body session early, then a light pump. Raise carbs 24-48 h before stage, no drastic water or sodium manipulation. Show at the end of the week.'),
          components: ['technique', 'mental', 'recovery'],
          loads: [3],
          weekTypes: ['comp'],
          pattern: ['peakA', 'pose', 'peakB', 'pose', '', 'show', '']
        }
      ]
    }
  ],
  sessions: {
    push: {
      title: t('دفع — تنشيف', 'Push — prep'),
      goal: t('الحفاظ على قوة وحجم الصدر والأكتاف والترايسبس أثناء العجز.', 'Maintain chest, shoulder and triceps strength and size in a deficit.'),
      components: ['hypertrophy', 'strength'],
      rpe: 8, duration: 75,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        ramp('ex_incline_barbell_bench_press', '10-5-3-1', 'البار ×١٠، ٥٠٪ ×٥، ٦٥٪ ×٣، ٧٥٪ ×١', 'Bar x10, 50% x5, 65% x3, 75% x1'),
        S('ex_incline_barbell_bench_press', 3, '6-8', '75-80', '1rm', '3min', { tempo: '3-0-1-0', ...P('الرفعة الثقيلة للصدر — الحفاظ على الوزن ده أهم مؤشر إن العضل ما بيتفقدش', 'Heavy chest anchor — holding this load is the key sign muscle is retained', 'strength') }),
        S('ex_dumbbell_bench_press', 3, '8-10', '1-2', 'rir', '2min', { tempo: '3-0-1-0', ...P('حجم الصدر بمدى كامل', 'Full-range chest volume', 'hypertrophy') }),
        S('ex_seated_shoulder_press_machine', 3, '8-10', '1-2', 'rir', '2min', P('كتف أمامي بثبات من غير إجهاد للمفاصل', 'Stable front-delt work with low joint stress', 'hypertrophy')),
        S('ek_butterfly_machine', 2, '12-15', '0-1', 'rir', '60s', { tempo: '2-1-1-1', ...P('عزل الصدر وتحسين الانقباض للبوزينج', 'Chest isolation and mind-muscle squeeze for posing', 'hypertrophy') }),
        S('wg_cable_lateral_raise', 4, '12-15', '0-1', 'rir', '60s', P('عرض الأكتاف — أهم نقطة في الـ V-taper', 'Delt width — the key to the V-taper', 'hypertrophy')),
        S('ek_triceps_pushdown_with_rope_and_cable', 3, '10-12', '1', 'rir', '60s', P('ترايسبس', 'Triceps', 'hypertrophy')),
        { kind: 'timed', libId: 'wg_treadmill_incline_walk', sets: 1, duration: '20-30min', intensity: 'Z2', basis: 'hr', ...P('كارديو بعد الحديد لزيادة صرف الطاقة بأقل تأثير على الاستشفاء', 'Post-lifting cardio to raise energy expenditure with minimal recovery cost', 'aerobic') },
        coolUpper()[0]
      ]
    },
    pull: {
      title: t('سحب — تنشيف', 'Pull — prep'),
      goal: t('الحفاظ على عرض وسمك الظهر والكتف الخلفي.', 'Maintain back width, thickness and rear delts.'),
      components: ['hypertrophy', 'strength'],
      rpe: 8, duration: 75,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        S('wg_weighted_pull_up', 3, '6-8', '1-2', 'rir', '2.5min', { tempo: '2-1-1-0', ...P('اللاتس بحمل عالي؛ الوزن الإضافي هيقل مع نزول وزن الجسم وده طبيعي', 'Heavy lat work; added load drops as bodyweight falls — expected', 'strength') }),
        S('ex_t_bar_row', 3, '8-10', '1-2', 'rir', '2min', { tempo: '2-1-1-0', ...P('سُمك الظهر الأوسط', 'Mid-back thickness', 'hypertrophy') }),
        S('wg_single_arm_cable_row', 3, '10-12/side', '1', 'rir', '90s', P('لاتس سفلي ومدى كامل بإيد واحدة', 'Lower lats through a full single-arm range', 'hypertrophy')),
        S('ek_dumbbell_bent_arm_pullover', 2, '12', '1', 'rir', '60s', { tempo: '3-1-1-0', ...P('اللاتس في الإطالة', 'Lats in the stretch', 'hypertrophy') }),
        S('wg_reverse_pec_deck', 3, '15-20', '0-1', 'rir', '60s', P('كتف خلفي لاكتمال شكل الكتف من الجنب وورا', 'Rear delts for a complete side and back view', 'hypertrophy')),
        S('ex_barbell_curl', 3, '8-10', '1', 'rir', '60s', P('بايسبس', 'Biceps', 'hypertrophy')),
        S('ek_hammer_curls_with_rope_and_cable', 2, '12', '0-1', 'rir', '60s', P('عضدية وساعد', 'Brachialis and forearm', 'hypertrophy')),
        { kind: 'timed', libId: 'wg_treadmill_incline_walk', sets: 1, duration: '20-30min', intensity: 'Z2', basis: 'hr', ...P('كارديو منخفض الشدة', 'Low-intensity cardio', 'aerobic') },
        coolUpper()[1]
      ]
    },
    legsQ: {
      title: t('أرجل — تركيز الفخذ الأمامي', 'Legs — quad focus'),
      goal: t('الحفاظ على حجم وتفاصيل الفخذ الأمامي مع سكوات تقيل.', 'Maintain quad size and detail with heavy squatting.'),
      components: ['hypertrophy', 'strength'],
      rpe: 9, duration: 80,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_barbell_back_squat', '8-5-3-1', 'البار ×٨، ٥٠٪ ×٥، ٦٥٪ ×٣، ٧٥٪ ×١', 'Bar x8, 50% x5, 65% x3, 75% x1'),
        S('ex_barbell_back_squat', 3, '5-7', '75-80', '1rm', '3min', { tempo: '3-0-1-0', ...P('الرفعة الثقيلة للرجلين — حافظ على الوزن', 'Heavy leg anchor — hold the load', 'strength') }),
        S('wg_hack_squat', 3, '8-10', '1', 'rir', '2min', { tempo: '3-1-1-0', ...P('فخذ أمامي عميق', 'Deep quad work', 'hypertrophy') }),
        S('ex_leg_press', 2, '12-15', '1', 'rir', '2min', P('حجم إضافي بإجهاد قليل للظهر', 'Extra volume with low spinal load', 'hypertrophy')),
        S('ex_leg_extension', 3, '12-15', '0', 'rir', '60s', { tempo: '2-0-1-2', ...P('تفاصيل الفخذ (فصل العضلات) مع انقباض ثانيتين', 'Quad separation with a 2-second squeeze', 'hypertrophy') }),
        S('ex_standing_calf_raise_machine', 4, '8-12', '0-1', 'rir', '60s', { tempo: '2-2-1-0', ...P('سمانة', 'Calves', 'hypertrophy') }),
        S('ex_hanging_leg_raise', 3, '12-15', '2', 'rir', '60s', P('بطن وتحكم في الجذع للفاكيوم والبوزينج', 'Abs and trunk control for vacuums and posing', 'core')),
        ...coolLower()
      ]
    },
    legsH: {
      title: t('أرجل — تركيز الخلفية والألوية', 'Legs — hamstrings and glutes'),
      goal: t('الخلفية والألوية (مهمة جدًا في الوضعيات الخلفية).', 'Hamstrings and glutes (critical for back poses).'),
      components: ['hypertrophy', 'strength'],
      rpe: 8, duration: 75,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_romanian_deadlift', '8-5-3', 'البار ×٨، ٥٠٪ ×٥، ٦٥٪ ×٣ من وزن العمل', 'Bar x8, 50% x5, 65% x3 of work weight'),
        S('ex_romanian_deadlift', 3, '6-8', '1-2', 'rir', '2.5min', { tempo: '3-0-1-0', ...P('الخلفية والألوية في الإطالة بحمل عالي', 'Heavy lengthened hamstrings and glutes', 'strength') }),
        S('ek_lying_leg_curl_machine', 3, '8-10', '0-1', 'rir', '90s', { tempo: '2-0-1-1', ...P('الخلفية بثني الركبة', 'Knee-flexion hamstrings', 'hypertrophy') }),
        S('ex_hip_thrust', 3, '8-10', '1', 'rir', '2min', { tempo: '1-0-1-2', ...P('الألوية في الانقباض الكامل', 'Glutes at full contraction', 'hypertrophy') }),
        S('ex_bulgarian_split_squat', 2, '10/leg', '1-2', 'rir', '90s', P('ألوية وفخذ برجل واحدة', 'Single-leg glutes and quads', 'hypertrophy')),
        S('ek_seated_calf_raise_using_machine', 3, '12-15', '0-1', 'rir', '60s', P('سوليوس', 'Soleus', 'hypertrophy')),
        { kind: 'timed', libId: 'ex_stair_climber', sets: 1, duration: '20min', intensity: 'Z2', basis: 'hr', ...P('كارديو منخفض الصدمة', 'Low-impact cardio', 'aerobic') },
        ...coolLower()
      ]
    },
    upper: {
      title: t('أعلى — شدة وتفاصيل', 'Upper — intensity and detail'),
      goal: t('جلسة أعلى بحجم معتدل وتركيز على الأكتاف والذراعين والنقاط الضعيفة.', 'Moderate-volume upper session focusing on delts, arms and weak points.'),
      components: ['hypertrophy', 'strength'],
      rpe: 8, duration: 70,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        S('wg_machine_chest_press', 3, '8-10', '1', 'rir', '2min', { tempo: '3-0-1-0', ...P('صدر بحمل تقيل وثبات', 'Heavy, stable chest work', 'hypertrophy') }),
        S('ex_lat_pulldown', 3, '8-10', '1', 'rir', '2min', { tempo: '2-1-1-0', ...P('عرض الظهر', 'Back width', 'hypertrophy') }),
        S('ex_dumbbell_shoulder_press', 3, '8-10', '1-2', 'rir', '2min', P('أكتاف', 'Shoulders', 'hypertrophy')),
        S('ex_lateral_raise', 1, '15+5+5+5', '0', 'rir', '5 breaths', P('ميو ريبس للكتف الجانبي: حجم عالي في وقت قليل', 'Side-delt myo-reps: high stimulus in little time', 'hypertrophy')),
        S('ex_close_grip_bench_press', 3, '6-8', '1-2', 'rir', '2min', P('ترايسبس بحمل عالي', 'Heavy triceps', 'strength')),
        S('ex_preacher_curl', 3, '8-10', '1', 'rir', '60s', { tempo: '3-0-1-0', ...P('بايسبس', 'Biceps', 'hypertrophy') }),
        { kind: 'drill', name: t('بوزينج: الوضعيات الإجبارية ×٢ لفّة، مسك كل وضعية ١٠-١٥ ث', 'Posing: mandatory poses x2 rounds, hold each 10-15 s'), sets: 2, duration: '10min', ...P('البامب بعد التمرين وقت ممتاز لتدريب الوضعيات', 'The post-workout pump is ideal for posing practice', 'technique') },
        coolUpper()[0]
      ]
    },
    cardio: {
      title: t('كارديو + بوزينج + خطوات', 'Cardio + posing + steps'),
      goal: t('زيادة صرف الطاقة بدون ضغط على العضلات، وتدريب البوزينج.', 'Raise energy expenditure without muscular stress and practise posing.'),
      components: ['aerobic', 'technique', 'recovery'],
      rpe: 4, duration: 70,
      items: [
        wu('wg_walking', { duration: '5min' }),
        { kind: 'timed', libId: 'ad_steady_state_bike_ride', sets: 1, duration: '40-45min', intensity: 'Z2', basis: 'hr', ...P('هوائي منخفض الشدة (٦٠-٧٠٪ من أقصى نبض)', 'Low-intensity aerobic (60-70% HRmax)', 'aerobic'), ...N('خلي الخطوات اليومية ثابتة؛ لو النزول وقف أسبوعين زود ١٠-١٥ دقيقة كارديو أو ٢٠٠٠ خطوة قبل ما تقلل الأكل', 'Keep daily steps consistent; if loss stalls for 2 weeks add 10-15 min cardio or 2,000 steps before cutting food') },
        { kind: 'drill', name: t('روتين بوزينج كامل + الفاكيوم', 'Full posing routine + stomach vacuums'), sets: 3, duration: '20min', ...P('الثبات والتحكم في الوضعيات تحت التعب', 'Control and stability in poses under fatigue', 'technique') },
        coolFull()
      ]
    },
    upperL: {
      title: t('أعلى — آخر التنشيف (حجم منخفض)', 'Upper — late prep (low volume)'),
      goal: t('مجموعتين تقيلتين لكل حركة بأوزان الأوف سيزون تقريبًا، وحجم قليل لحماية الاستشفاء.', 'Two heavy sets per movement near off-season loads, minimal volume to protect recovery.'),
      components: ['hypertrophy', 'strength'],
      rpe: 8, duration: 60,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        ramp('ex_incline_barbell_bench_press', '8-5-2', 'البار ×٨، ٥٥٪ ×٥، ٧٠٪ ×٢', 'Bar x8, 55% x5, 70% x2'),
        S('ex_incline_barbell_bench_press', 2, '6-8', '75-80', '1rm', '3min', { tempo: '3-0-1-0', ...P('إشارة الحفاظ: نفس الوزن = عضل محفوظ', 'Retention signal: same load = muscle retained', 'strength') }),
        S('ex_lat_pulldown', 3, '8-10', '1-2', 'rir', '2min', P('عرض الظهر', 'Back width', 'hypertrophy')),
        S('wg_chest_supported_row', 2, '8-10', '1-2', 'rir', '2min', P('سُمك الظهر بدون إجهاد لأسفل الظهر', 'Back thickness without lower-back stress', 'hypertrophy')),
        S('wg_cable_lateral_raise', 3, '12-15', '1', 'rir', '60s', P('عرض الأكتاف', 'Delt width', 'hypertrophy')),
        S('ek_triceps_pushdown_with_rope_and_cable', 2, '10-12', '1', 'rir', '60s', P('ترايسبس', 'Triceps', 'hypertrophy')),
        S('ex_dumbbell_curl', 2, '10-12', '1', 'rir', '60s', P('بايسبس', 'Biceps', 'hypertrophy')),
        { kind: 'drill', name: t('بوزينج بعد التمرين', 'Post-workout posing'), sets: 2, duration: '10min', ...P('تدريب الوضعيات والتحكم في النفس', 'Pose and breath-control practice', 'technique') },
        coolUpper()[1]
      ]
    },
    lowerL: {
      title: t('أسفل — آخر التنشيف (حجم منخفض)', 'Lower — late prep (low volume)'),
      goal: t('الحفاظ على الرجلين بأقل حجم فعّال وتجنب الإصابات مع الإجهاد العالي.', 'Maintain legs with minimum effective volume and avoid injury under high fatigue.'),
      components: ['hypertrophy', 'strength', 'prevention'],
      rpe: 8, duration: 60,
      items: [
        genWU(), ...lowerPrep(),
        ramp('wg_hack_squat', '10-6-3', 'خفيف ×١٠، متوسط ×٦، تقيل ×٣', 'Light x10, medium x6, heavy x3'),
        S('wg_hack_squat', 2, '6-8', '1-2', 'rir', '3min', { tempo: '3-1-1-0', ...P('فخذ أمامي بأمان أعلى من السكوات الحر مع قلة الطاقة', 'Quads with more safety than free squats when energy is low', 'strength') }),
        S('ex_romanian_deadlift', 2, '6-8', '2', 'rir', '2.5min', { tempo: '3-0-1-0', ...P('خلفية وألوية', 'Hamstrings and glutes', 'hypertrophy') }),
        S('ex_leg_extension', 2, '12-15', '0-1', 'rir', '60s', P('تفاصيل الفخذ', 'Quad detail', 'hypertrophy')),
        S('ek_seated_leg_curl', 2, '10-12', '0-1', 'rir', '60s', P('الخلفية', 'Hamstrings', 'hypertrophy')),
        S('ex_standing_calf_raise_machine', 3, '10-12', '1', 'rir', '60s', P('سمانة', 'Calves', 'hypertrophy')),
        { kind: 'timed', libId: 'wg_treadmill_incline_walk', sets: 1, duration: '30min', intensity: 'Z2', basis: 'hr', ...P('كارديو منخفض الشدة', 'Low-intensity cardio', 'aerobic') },
        ...coolLower()
      ]
    },
    pose: {
      title: t('يوم بوزينج وكارديو خفيف', 'Posing and light cardio day'),
      goal: t('إتقان الوضعيات والروتين الحر والترانزيشن، مع كارديو خفيف.', 'Master mandatory poses, the free routine and transitions, with light cardio.'),
      components: ['technique', 'mental', 'aerobic'],
      rpe: 4, duration: 60,
      items: [
        wu('ex_arm_circles', { sets: 1, reps: '15' }),
        { kind: 'drill', name: t('الوضعيات الإجبارية: ٣ لفّات، مسك كل وضعية ٢٠ ث', 'Mandatory poses: 3 rounds, hold each 20 s'), sets: 3, duration: '15min', ...P('التحمل في المسك تحت الإضاءة زي المسرح', 'Holding endurance as under stage lights', 'technique') },
        { kind: 'drill', name: t('الروتين الحر على الموسيقى + الترانزيشن بين الوضعيات', 'Free routine to music + transitions between poses'), sets: 2, duration: '10min', ...P('انسيابية وثقة على المسرح', 'Flow and stage confidence', 'mental') },
        { kind: 'timed', libId: 'wg_walking', sets: 1, duration: '30-40min', intensity: 'Z1-Z2', basis: 'hr', ...P('خطوات وصرف طاقة بدون إجهاد', 'Steps and energy expenditure without fatigue', 'aerobic') },
        coolFull()
      ]
    },
    peakA: {
      title: t('الذروة أ — جسم كامل معتدل', 'Peak A — moderate full body'),
      goal: t('آخر جلسة بحجم معقول (٥-٦ أيام قبل المسرح) لاستنزاف جليكوجين معتدل قبل التحميل.', 'Last moderately voluminous session (5-6 days out) for modest glycogen depletion before the carb-up.'),
      components: ['hypertrophy', 'muscular_endurance'],
      rpe: 7, duration: 60,
      items: [
        genWU('ex_rowing_machine'),
        S('wg_machine_chest_press', 3, '12', '2', 'rir', '60s', P('صدر — بامب ومقاومة معتدلة', 'Chest — pump with moderate load', 'muscular_endurance')),
        S('ex_lat_pulldown', 3, '12', '2', 'rir', '60s', P('ظهر', 'Back', 'muscular_endurance')),
        S('ex_leg_press', 3, '15', '2', 'rir', '90s', P('رجلين', 'Legs', 'muscular_endurance')),
        S('ex_lateral_raise', 3, '15', '2', 'rir', '45s', P('أكتاف', 'Delts', 'muscular_endurance')),
        S('ek_seated_leg_curl', 2, '15', '2', 'rir', '45s', P('خلفية', 'Hamstrings', 'muscular_endurance')),
        S('ex_triceps_pushdown', 2, '15', '2', 'rir', '45s', { ...P('ترايسبس — سوبرست مع البايسبس', 'Triceps — superset with biceps', 'muscular_endurance') }),
        S('ex_dumbbell_curl', 2, '15', '2', 'rir', '45s', P('بايسبس', 'Biceps', 'muscular_endurance')),
        { kind: 'drill', name: t('بوزينج كامل', 'Full posing'), sets: 2, duration: '10min', ...P('روتين كامل', 'Full routine', 'technique') },
        coolFull()
      ]
    },
    peakB: {
      title: t('الذروة ب — بامب خفيف', 'Peak B — light pump'),
      goal: t('حركة خفيفة وتدفق دم بدون أي إجهاد عضلي (٣ أيام قبل المسرح).', 'Light movement and blood flow with no muscle damage (3 days out).'),
      components: ['recovery', 'technique'],
      rpe: 4, duration: 40,
      items: [
        genWU('ex_rowing_machine'),
        S('wg_banded_row', 2, '20', '4', 'rir', '45s', P('تدفق دم للظهر بدون تكسير', 'Back blood flow without damage', 'recovery')),
        S('ex_pushup', 2, '15', '4', 'rir', '45s', P('بامب خفيف للصدر', 'Light chest pump', 'recovery')),
        S('ex_bodyweight_squat', 2, '20', '4', 'rir', '45s', P('رجلين بدون حمل', 'Unloaded legs', 'recovery')),
        { kind: 'drill', name: t('بوزينج: الوضعيات + الروتين الحر', 'Posing: mandatories + free routine'), sets: 2, duration: '15min', ...P('آخر بروفة كاملة', 'Final full rehearsal', 'technique'), ...N('كربوهيدرات تبدأ تزيد من اليوم ده حسب خطة الكوتش؛ مياه وصوديوم زي الطبيعي', 'Carbs begin rising from today per coach plan; water and sodium as usual') },
        coolFull()
      ]
    },
    show: {
      title: t('يوم البطولة — تسخين قبل المسرح', 'Show day — pump-up before stage'),
      goal: t('بامب تدريجي قبل الصعود ١٥-٢٠ دقيقة، والتركيز على الأداء.', 'Progressive pump-up 15-20 minutes before stage and focus on performance.'),
      components: ['technique', 'mental'],
      rpe: 5, duration: 30,
      items: [
        wu('ex_arm_circles', { sets: 1, reps: '15' }),
        S('wg_banded_row', 3, '15-20', '4', 'rir', '30s', P('بامب الظهر بالأستك', 'Band back pump', 'hypertrophy')),
        S('ex_pushup', 3, '10-15', '4', 'rir', '30s', P('بامب الصدر والترايسبس', 'Chest and triceps pump', 'hypertrophy')),
        S('ek_upright_band_rows', 2, '20', '4', 'rir', '30s', P('بامب الأكتاف والترابيس', 'Delt and trap pump', 'hypertrophy')),
        { kind: 'drill', name: t('بروفة سريعة للوضعيات ورا الكواليس', 'Quick backstage pose run-through'), sets: 1, duration: '5min', ...P('ثقة وتركيز قبل المسرح؛ ما تبالغش في البامب عشان ما يحصلش تشنج', 'Confidence and focus before stage; do not overdo the pump to avoid cramping', 'mental') }
      ]
    }
  }
};

/* ============ 3) باورليفتنج — تجهيز لبطولة (متقدم، 16 أسبوع) ============ */
const sqRamp = () => ramp('ex_barbell_back_squat', '5-3-2-1', 'البار ×٥، ٥٠٪ ×٣، ٦٥٪ ×٢، ٧٥٪ ×١ قبل مجموعات العمل', 'Bar x5, 50% x3, 65% x2, 75% x1 before work sets');
const bpRamp = () => ramp('ex_barbell_bench_press', '8-5-3-1', 'البار ×٨، ٥٠٪ ×٥، ٦٥٪ ×٣، ٧٥٪ ×١', 'Bar x8, 50% x5, 65% x3, 75% x1');
const dlRamp = () => ramp('ex_deadlift', '5-3-2-1', '٤٠٪ ×٥، ٥٥٪ ×٣، ٦٥٪ ×٢، ٧٥٪ ×١', '40% x5, 55% x3, 65% x2, 75% x1');
const compBench = { ...N('بنش بقواعد البطولة: وقفة واضحة على الصدر لحد إشارة "برس"', 'Competition-standard bench: clear pause on the chest until the "press" command') };

const T_PL_MEET = {
  id: 'pt_powerlifting_meet_adv',
  sport: 'powerlifting',
  level: 'advanced',
  title: t('باورليفتنج — تجهيز لبطولة ١٦ أسبوع (متقدم)', 'Powerlifting — 16-week meet prep (advanced)'),
  goal: t('رفع مجموع البطولة (سكوات + بنش + ديدليفت) بتسلسل بلوكات: تضخيم ← قوة ← ذروة ← تهدئة، مع أسبوع أوبنرز واختيار محاولات مبني على بيانات.', 'Raise the meet total (squat + bench + deadlift) through a block sequence: hypertrophy, strength, peaking, taper, with an openers week and data-driven attempt selection.'),
  components: ['max_strength', 'strength', 'hypertrophy', 'technique', 'mental'],
  sessionsPerWeek: 4,
  periods: [
    {
      type: 'accumulation',
      goal: t('تضخيم وحجم عالي بنسب ٦٧.٥-٧٧.٥٪ لبناء عضل وتحمل عمل يسند مراحل القوة.', 'Hypertrophy and high volume at 67.5-77.5% to build muscle and work capacity for the strength phases.'),
      components: ['hypertrophy', 'strength', 'technique'],
      blocks: [
        {
          name: t('بلوك ١ — تراكم (تضخيم)', 'Block 1 — Accumulation (hypertrophy)'),
          goal: t('٥ أسابيع: النسب بتزيد ٢.٥٪ أسبوعيًا (٦٧.٥ ← ٧٥٪) والعدات ٦-٨. الأسبوع الخامس تخفيف ٦٠-٦٥٪ ٣×٥. استخدم 1RM من آخر بطولة أو اختبار حديث.', '5 weeks: percentages rise 2.5% weekly (67.5 to 75%) for 6-8 reps. Week 5 deload at 60-65% 3x5. Use 1RM from the last meet or a recent test.'),
          components: ['hypertrophy', 'strength'],
          loads: [6, 7, 7, 8, 4],
          weekTypes: ['load', 'load', 'load', 'shock', 'deload'],
          pattern: ['acc_sq', 'acc_bp', '', 'acc_dl', 'acc_var', '', '']
        }
      ]
    },
    {
      type: 'transmutation',
      goal: t('تحويل الحجم لقوة: عدات ٣-٥ بنسب ٧٧.٥-٨٧.٥٪ + سنجل قمة RPE 8، وتمارين مساعدة موجهة لنقاط الضعف، ثم ميت ميت (Mock meet) خفيف.', 'Convert volume into strength: 3-5 reps at 77.5-87.5% + an RPE 8 top single, weak-point variations, then a light mock meet.'),
      components: ['max_strength', 'strength', 'technique'],
      blocks: [
        {
          name: t('بلوك ٢ — قوة', 'Block 2 — Strength'),
          goal: t('٣ أسابيع موجة صاعدة: ٨٠ ← ٨٢.٥ ← ٨٥٪ في مجموعات الباك أوف. السنجل القمة لازم يفضل RPE 8 (سرعة البار كويسة).', '3-week ascending wave: 80, 82.5, 85% for back-off sets. The top single must stay at RPE 8 (good bar speed).'),
          components: ['max_strength', 'strength'],
          loads: [7, 8, 9],
          weekTypes: ['load', 'load', 'shock'],
          pattern: ['str_sq', 'str_bp', '', 'str_dl', 'str_var', '', '']
        },
        {
          name: t('أسبوع ٩ — تخفيف واختبار (Mock meet)', 'Week 9 — Deload and mock meet'),
          goal: t('جلسة خفيفة ثم سنجلات RPE 8.5-9 في الثلاث رفعات بقواعد البطولة، لتحديث 1RM التقديري ونسب الذروة.', 'One light session, then RPE 8.5-9 singles on all three lifts under meet rules to update e1RM and peaking percentages.'),
          components: ['max_strength', 'technique', 'mental'],
          loads: [6],
          weekTypes: ['test'],
          pattern: ['pk_light', '', '', 'test', '', '', '']
        }
      ]
    },
    {
      type: 'realization',
      goal: t('الذروة: شدة ٨٥-٩٧.٥٪ بحجم بينزل، سنجلات تقيلة وتعود على الأوزان الكبيرة وأوامر الحكام.', 'Peaking: 85-97.5% intensity with falling volume, heavy singles and habituation to big loads and judges\' commands.'),
      components: ['max_strength', 'technique', 'mental'],
      blocks: [
        {
          name: t('بلوك ٣ — ذروة', 'Block 3 — Peaking'),
          goal: t('أسبوع ١٠: ٣×٣ @ ٨٥٪ — أسبوع ١١: ٣×٢ @ ٨٨-٩٠٪ — أسبوع ١٢: سنجل @ ٩٢.٥٪ + ٢×٢ @ ٨٥٪ — أسبوع ١٣: سنجل @ ٩٥-٩٧.٥٪ (أتقل رفعة قبل البطولة).', 'Wk10: 3x3 @ 85% — Wk11: 3x2 @ 88-90% — Wk12: single @ 92.5% + 2x2 @ 85% — Wk13: single @ 95-97.5% (heaviest lift before the meet).'),
          components: ['max_strength', 'mental'],
          loads: [8, 9, 9, 10],
          weekTypes: ['load', 'load', 'shock', 'shock'],
          pattern: ['pk_sq', 'pk_bp', '', 'pk_dl', 'pk_light', '', '']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('تهدئة: الحجم ينزل ٤٠-٦٠٪ والشدة محفوظة، أسبوع أوبنرز، ثم أسبوع البطولة.', 'Taper: volume down 40-60% with intensity preserved, openers week, then meet week.'),
      components: ['max_strength', 'recovery', 'mental'],
      blocks: [
        {
          name: t('أسبوع ١٤ — تهدئة', 'Week 14 — Taper'),
          goal: t('سنجلات ٨٥-٩٠٪ بحجم قليل جدًا؛ الإجهاد ينزل والقوة تظهر.', 'Singles at 85-90% with very low volume; fatigue dissipates and strength is expressed.'),
          components: ['max_strength', 'recovery'],
          loads: [5],
          weekTypes: ['taper'],
          pattern: ['tp_sb', '', 'tp_dl', '', 'bp_light', '', '']
        },
        {
          name: t('أسبوع ١٥ — الأوبنرز', 'Week 15 — Openers'),
          goal: t('تجربة المحاولات الأولى (٩٠-٩٢٪) بقواعد البطولة. الأوبنر = وزن تقدر ترفعه ٣ مرات في أسوأ يوم. الديدليفت ممكن يتعمل ١٠-١٢ يوم قبل البطولة.', 'Rehearse first attempts (90-92%) under meet rules. Opener = a weight you could triple on a bad day. Deadlift opener can be done 10-12 days out.'),
          components: ['max_strength', 'mental', 'technique'],
          loads: [4],
          weekTypes: ['taper'],
          pattern: ['openers', '', 'bp_light', '', 'primer', '', '']
        },
        {
          name: t('أسبوع ١٦ — البطولة', 'Week 16 — Meet week'),
          goal: t('حركة خفيفة للحفاظ على الإحساس، نوم وأكل منتظم، الوزن في الفئة، والبطولة آخر الأسبوع.', 'Light movement to stay sharp, regular sleep and food, making weight, meet at the end of the week.'),
          components: ['mental', 'recovery', 'max_strength'],
          loads: [2],
          weekTypes: ['comp'],
          pattern: ['bp_light', '', 'primer', '', '', 'meet', '']
        }
      ]
    }
  ],
  sessions: {
    acc_sq: {
      title: t('تراكم — سكوات + بنش', 'Accumulation — squat + bench'),
      goal: t('حجم سكوات وبنش بنسب متوسطة لبناء العضل والتكنيك.', 'Squat and bench volume at moderate percentages for muscle and technique.'),
      components: ['hypertrophy', 'strength', 'technique'],
      rpe: 7, duration: 90,
      items: [
        genWU(), ...lowerPrep(), sqRamp(),
        S('ex_barbell_back_squat', 5, '6', '67.5-75', '1rm', '3min', { tempo: '2-0-X-0', ...P('حجم سكوات لبناء الفخذ والألوية وتثبيت التكنيك', 'Squat volume for quads/glutes and grooved technique', 'hypertrophy'), ...N('أسبوع ١: ٦٧.٥٪، ٢: ٧٠٪، ٣: ٧٢.٥٪، ٤: ٧٥٪، ٥ (تخفيف): ٦٠٪ ٣×٥', 'Wk1 67.5%, wk2 70%, wk3 72.5%, wk4 75%, wk5 (deload) 60% 3x5') }),
        S('ex_barbell_bench_press', 4, '8', '67.5-72.5', '1rm', '2.5min', { tempo: '2-1-X-0', ...P('حجم بنش بوقفة قصيرة', 'Bench volume with a short pause', 'hypertrophy'), ...compBench }),
        S('ek_barbell_good_mornings', 3, '8', '3', 'rir', '2min', { tempo: '3-0-1-0', ...P('تقوية أسفل الظهر والخلفية لدعم وضع الجذع في السكوات', 'Lower-back and hamstring strength to hold torso position in the squat', 'strength') }),
        S('wg_chest_supported_row', 4, '10', '2', 'rir', '90s', P('ظهر علوي لثبات البار في السكوات والبنش', 'Upper back for bar stability in squat and bench', 'hypertrophy')),
        S('ex_ab_wheel_rollout', 3, '10', '2', 'rir', '60s', P('مقاومة فرد الجذع (البريسينج)', 'Anti-extension bracing strength', 'core')),
        ...coolLower()
      ]
    },
    acc_bp: {
      title: t('تراكم — بنش + علوي', 'Accumulation — bench + upper'),
      goal: t('أعلى حجم بنش في الأسبوع مع تضخيم الصدر والترايسبس والظهر.', 'Highest bench volume of the week plus chest, triceps and back hypertrophy.'),
      components: ['hypertrophy', 'strength'],
      rpe: 7, duration: 80,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(), bpRamp(),
        S('ex_barbell_bench_press', 5, '5', '72.5-77.5', '1rm', '3min', { tempo: '2-1-X-0', ...P('حجم بنش بشدة أعلى', 'Higher-intensity bench volume', 'strength'), ...compBench }),
        S('ex_close_grip_bench_press', 3, '8', '2', 'rir', '2min', P('ترايسبس وقفلة البنش', 'Triceps and bench lockout', 'hypertrophy')),
        S('wg_weighted_pull_up', 4, '6-8', '2', 'rir', '2min', P('لاتس لثبات البار ومسار البنش', 'Lats for bar stability and bench path', 'hypertrophy')),
        S('ex_dumbbell_shoulder_press', 3, '10', '2', 'rir', '90s', P('أكتاف أمامية', 'Front delts', 'hypertrophy')),
        S('ex_face_pull', 3, '15', '2', 'rir', '60s', P('صحة الكتف مع حجم البنش العالي', 'Shoulder health under high bench volume', 'prevention')),
        S('ex_triceps_pushdown', 3, '12', '1', 'rir', '60s', P('ترايسبس', 'Triceps', 'hypertrophy')),
        coolUpper()[0]
      ]
    },
    acc_dl: {
      title: t('تراكم — ديدليفت + ضغط فوق الرأس', 'Accumulation — deadlift + overhead press'),
      goal: t('حجم ديدليفت وضغط فوق الرأس وسلسلة خلفية.', 'Deadlift and overhead-press volume plus posterior chain.'),
      components: ['hypertrophy', 'strength'],
      rpe: 8, duration: 85,
      items: [
        genWU(), ...lowerPrep(), dlRamp(),
        S('ex_deadlift', 4, '5', '70-77.5', '1rm', '3min', { ...P('حجم ديدليفت بوضعية البطولة (عادي أو سومو)', 'Deadlift volume in competition stance (conventional or sumo)', 'strength'), ...N('أسبوع ١: ٧٠٪ ويزيد ٢.٥٪ أسبوعيًا؛ التخفيف ٦٠٪ ٣×٣', 'Wk1 70%, +2.5% weekly; deload 60% 3x3') }),
        S('wg_overhead_press', 4, '6', '70-75', '1rm', '2min', P('قوة الكتف والترايسبس للبنش', 'Shoulder and triceps strength supporting the bench', 'hypertrophy')),
        S('wg_barbell_row', 4, '8', '2', 'rir', '2min', P('ظهر علوي وأوسط', 'Upper and mid back', 'hypertrophy')),
        S('ex_bulgarian_split_squat', 3, '8/leg', '2', 'rir', '90s', P('رجل واحدة لتوازن الجانبين وحجم الفخذ', 'Unilateral work for balance and quad volume', 'hypertrophy')),
        S('ex_hanging_leg_raise', 3, '10-12', '2', 'rir', '60s', P('بطن', 'Abs', 'core')),
        ...coolLower()
      ]
    },
    acc_var: {
      title: t('تراكم — متغيرات (سكوات بوقفة، بنش لارسن)', 'Accumulation — variations (pause squat, Larsen press)'),
      goal: t('متغيرات تعالج نقاط الضعف: الوضع في القاع والثبات على البنش.', 'Variations for weak points: position out of the hole and bench stability.'),
      components: ['strength', 'technique', 'hypertrophy'],
      rpe: 7, duration: 80,
      items: [
        genWU(), ...lowerPrep(),
        S(null, 4, '4', '65-70', '1rm', '3min', { name: t('سكوات بوقفة ٢ ثانية في القاع', '2-second pause squat'), tempo: '3-2-X-0', ...P('قوة في القاع والحفاظ على البريسينج', 'Strength out of the hole and brace retention', 'technique'), ...N('النسبة من 1RM السكوات العادي', 'Percentage of competition squat 1RM') }),
        S(null, 4, '6', '67.5-72.5', '1rm', '2.5min', { name: t('بنش لارسن (الرجلين مرفوعة)', 'Larsen press (legs raised)'), tempo: '2-1-X-0', ...P('ثبات الجزء العلوي بدون دفع الرجلين', 'Upper-body stability without leg drive', 'strength') }),
        S('ek_hyperextensions', 3, '12', '2', 'rir', '90s', P('أسفل الظهر والألوية', 'Lower back and glutes', 'hypertrophy')),
        S('ex_dumbbell_bench_press', 3, '10', '2', 'rir', '90s', P('حجم صدر', 'Chest volume', 'hypertrophy')),
        S('ex_lat_pulldown', 3, '12', '2', 'rir', '90s', P('لاتس', 'Lats', 'hypertrophy')),
        S('wg_pallof_press', 3, '10/side', '2', 'rir', '60s', P('مقاومة الدوران للجذع', 'Anti-rotation core', 'core')),
        coolFull()
      ]
    },
    str_sq: {
      title: t('قوة — سكوات + بنش', 'Strength — squat + bench'),
      goal: t('سنجل قمة RPE 8 ثم باك أوف تقيل للسكوات، وبنش ثلاثيات.', 'RPE 8 top single then heavy squat back-offs, bench triples.'),
      components: ['max_strength', 'strength'],
      rpe: 8, duration: 90,
      items: [
        genWU(), ...lowerPrep(), sqRamp(),
        S('ex_barbell_back_squat', 1, '1', '8', 'rpe', '4min', { ...P('سنجل قمة لمراقبة الجاهزية وتعود على الوزن التقيل', 'Top single to monitor readiness and habituate to heavy loads', 'max_strength'), ...N('لو السنجل حسيته RPE 9+ قلل الباك أوف ٥٪', 'If the single feels RPE 9+, cut back-offs by 5%') }),
        S('ex_barbell_back_squat', 4, '4', '80-85', '1rm', '3-4min', { ...P('باك أوف لبناء القوة القصوى', 'Back-offs to build max strength', 'max_strength'), ...N('أسبوع ٦: ٨٠٪، ٧: ٨٢.٥٪، ٨: ٨٥٪', 'Wk6 80%, wk7 82.5%, wk8 85%') }),
        S('ex_barbell_bench_press', 5, '3', '80-85', '1rm', '3min', { ...P('بنش ثلاثيات تقيلة', 'Heavy bench triples', 'max_strength'), ...compBench }),
        S('ek_barbell_good_mornings', 3, '5', '2', 'rir', '2min', P('سلسلة خلفية', 'Posterior chain', 'strength')),
        S('wg_chest_supported_row', 3, '8', '2', 'rir', '90s', P('ظهر علوي', 'Upper back', 'hypertrophy')),
        ...coolLower()
      ]
    },
    str_bp: {
      title: t('قوة — بنش', 'Strength — bench'),
      goal: t('سنجل بنش RPE 8 وباك أوف، مع سبوتو برس للثبات على الصدر.', 'RPE 8 bench single and back-offs, Spoto press for control off the chest.'),
      components: ['max_strength', 'strength'],
      rpe: 8, duration: 75,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(), bpRamp(),
        S('ex_barbell_bench_press', 1, '1', '8', 'rpe', '4min', { ...P('سنجل قمة بقواعد البطولة', 'Top single under meet rules', 'max_strength'), ...compBench }),
        S('ex_barbell_bench_press', 4, '4', '80-82.5', '1rm', '3min', P('باك أوف', 'Back-off sets', 'max_strength')),
        S(null, 3, '4', '72.5-77.5', '1rm', '2.5min', { name: t('سبوتو برس (وقفة ٢ سم فوق الصدر)', 'Spoto press (pause 2 cm above chest)'), tempo: '2-2-X-0', ...P('تحكم في مسار البار وقوة بداية الدفع', 'Bar-path control and strength off the chest', 'technique') }),
        S('wg_weighted_pull_up', 3, '5-6', '2', 'rir', '2min', P('لاتس', 'Lats', 'strength')),
        S('ek_jm_press', 3, '8', '2', 'rir', '90s', P('ترايسبس لقفلة البنش', 'Triceps for bench lockout', 'hypertrophy')),
        S('ex_face_pull', 3, '15', '2', 'rir', '60s', P('صحة الكتف', 'Shoulder health', 'prevention')),
        coolUpper()[0]
      ]
    },
    str_dl: {
      title: t('قوة — ديدليفت + بنش بوقفة', 'Strength — deadlift + paused bench'),
      goal: t('سنجل ديدليفت RPE 8 وثلاثيات تقيلة، وبنش بوقفة طويلة.', 'RPE 8 deadlift single and heavy triples, long-pause bench.'),
      components: ['max_strength', 'strength'],
      rpe: 9, duration: 85,
      items: [
        genWU(), ...lowerPrep(), dlRamp(),
        S('ex_deadlift', 1, '1', '8', 'rpe', '4min', P('سنجل قمة ديدليفت', 'Deadlift top single', 'max_strength')),
        S('ex_deadlift', 3, '3', '82.5-87.5', '1rm', '3-4min', { ...P('ثلاثيات تقيلة للقوة القصوى', 'Heavy triples for max strength', 'max_strength'), ...N('أسبوع ٦: ٨٢.٥٪، ٧: ٨٥٪، ٨: ٨٧.٥٪', 'Wk6 82.5%, wk7 85%, wk8 87.5%') }),
        S(null, 4, '3', '75-80', '1rm', '2.5min', { name: t('بنش بوقفة ٣ ثواني', '3-second pause bench'), tempo: '2-3-X-0', ...P('قوة من الصدر وثبات تحت الأمر', 'Strength off the chest and stability under command', 'strength') }),
        S('wg_pendlay_row', 3, '6', '2', 'rir', '2min', P('ظهر وقوة سحب من الأرض', 'Back and pulling strength off the floor', 'strength')),
        S('ek_hyperextensions', 3, '10', '2', 'rir', '90s', P('أسفل الظهر', 'Lower back', 'hypertrophy')),
        ...coolLower()
      ]
    },
    str_var: {
      title: t('قوة — متغيرات (سكوات من الـ Pins، ديدليفت ديفيست)', 'Strength — variations (pin squat, deficit deadlift)'),
      goal: t('علاج نقاط الضعف: قوة من نقطة التوقف والسرعة من الأرض.', 'Weak-point work: strength from a dead stop and speed off the floor.'),
      components: ['max_strength', 'technique'],
      rpe: 8, duration: 80,
      items: [
        genWU(), ...lowerPrep(),
        S(null, 3, '3', '72.5-77.5', '1rm', '3min', { name: t('سكوات من الـ Pins (تحت الموازي بشوية)', 'Pin squat (just below parallel)'), ...P('قوة بدء من غير ارتداد مطاطي', 'Starting strength without the stretch reflex', 'max_strength') }),
        S(null, 3, '4', '70-75', '1rm', '3min', { name: t('ديدليفت من ديفيست ٥ سم', '5 cm deficit deadlift'), ...P('سرعة من الأرض ووضعية بداية أقوى', 'Speed off the floor and a stronger start position', 'strength') }),
        S('ex_close_grip_bench_press', 4, '5', '75', '1rm', '2.5min', P('ترايسبس وقوة البنش في النص', 'Triceps and mid-range bench strength', 'strength')),
        S('ex_lat_pulldown', 3, '10', '2', 'rir', '90s', P('لاتس', 'Lats', 'hypertrophy')),
        S('wg_pallof_press', 3, '10/side', '2', 'rir', '60s', P('ثبات الجذع', 'Core stability', 'core')),
        coolFull()
      ]
    },
    test: {
      title: t('ميت ميت — سنجلات RPE 8.5-9', 'Mock meet — RPE 8.5-9 singles'),
      goal: t('سنجلات تقيلة بقواعد البطولة (أوامر، أعماق، وقفات) لتحديث 1RM التقديري.', 'Heavy singles under meet rules (commands, depth, pauses) to update estimated 1RM.'),
      components: ['max_strength', 'technique', 'mental'],
      rpe: 9, duration: 120,
      items: [
        genWU(), ...lowerPrep(), sqRamp(),
        S('ex_barbell_back_squat', 1, '1', '8.5-9', 'rpe', '6-8min', { ...P('سنجل سكوات بأوامر "سكوات" و"راك"', 'Squat single with "squat" and "rack" commands', 'max_strength'), ...N('1RM التقديري: RPE 9 ≈ ٩٦٪، RPE 8.5 ≈ ٩٤٪', 'e1RM: RPE 9 ≈ 96%, RPE 8.5 ≈ 94%') }),
        bpRamp(),
        S('ex_barbell_bench_press', 1, '1', '8.5-9', 'rpe', '6-8min', { ...P('سنجل بنش بأوامر "ستارت"، "برس"، "راك"', 'Bench single with "start", "press", "rack" commands', 'max_strength') }),
        dlRamp(),
        S('ex_deadlift', 1, '1', '8.5-9', 'rpe', '6-8min', { ...P('سنجل ديدليفت لحد أمر "داون"', 'Deadlift single until the "down" command', 'max_strength') }),
        coolFull()
      ]
    },
    pk_sq: {
      title: t('ذروة — سكوات + بنش', 'Peaking — squat + bench'),
      goal: t('سكوات تقيل جدًا بحجم قليل، وبنش ثلاثيات/ثنائيات.', 'Very heavy low-volume squats, bench triples/doubles.'),
      components: ['max_strength', 'mental'],
      rpe: 9, duration: 90,
      items: [
        genWU(), ...lowerPrep(), sqRamp(),
        S('ex_barbell_back_squat', 1, '1', '90-97.5', '1rm', '5min', { ...P('سنجل تقيل بيتصاعد أسبوعيًا (أسبوع ١٠ مفيش سنجل: ٣×٣ @ ٨٥٪)', 'Heavy single rising weekly (wk10 no single: 3x3 @ 85%)', 'max_strength'), ...N('١١: ٩٠٪، ١٢: ٩٢.٥٪، ١٣: ٩٥-٩٧.٥٪ — ما تعديش RPE 9', 'Wk11 90%, wk12 92.5%, wk13 95-97.5% — never exceed RPE 9') }),
        S('ex_barbell_back_squat', 3, '2-3', '85-87.5', '1rm', '4min', P('باك أوف للحفاظ على الحجم الأدنى', 'Back-offs to keep minimum volume', 'max_strength')),
        S('ex_barbell_bench_press', 4, '3', '82.5-85', '1rm', '3min', { ...P('بنش بحجم متوسط', 'Moderate bench volume', 'max_strength'), ...compBench }),
        S('wg_chest_supported_row', 3, '8', '2', 'rir', '90s', P('ظهر علوي', 'Upper back', 'hypertrophy')),
        coolLower()[0]
      ]
    },
    pk_bp: {
      title: t('ذروة — بنش تقيل', 'Peaking — heavy bench'),
      goal: t('سنجلات بنش ٩٠-٩٧.٥٪ مع حجم مساعد قليل.', 'Bench singles at 90-97.5% with little accessory volume.'),
      components: ['max_strength', 'mental'],
      rpe: 9, duration: 70,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(), bpRamp(),
        S('ex_barbell_bench_press', 1, '1', '90-97.5', '1rm', '5min', { ...P('سنجل بنش تقيل بقواعد البطولة', 'Heavy competition bench single', 'max_strength'), ...N('١٠: ٨٧.٥٪ ×٢، ١١: ٩٠٪، ١٢: ٩٢.٥٪، ١٣: ٩٥-٩٧.٥٪', 'Wk10 87.5% x2, wk11 90%, wk12 92.5%, wk13 95-97.5%') }),
        S('ex_barbell_bench_press', 3, '3', '85', '1rm', '3min', { ...P('باك أوف', 'Back-offs', 'max_strength'), ...compBench }),
        S('wg_weighted_pull_up', 3, '5', '2', 'rir', '2min', P('لاتس', 'Lats', 'strength')),
        S('ex_triceps_pushdown', 3, '12', '2', 'rir', '60s', P('ترايسبس خفيف', 'Light triceps', 'hypertrophy')),
        coolUpper()[0]
      ]
    },
    pk_dl: {
      title: t('ذروة — ديدليفت', 'Peaking — deadlift'),
      goal: t('سنجلات ديدليفت تقيلة (الديدليفت أكتر رفعة مجهدة فحجمها أقل).', 'Heavy deadlift singles (the most fatiguing lift, so the lowest volume).'),
      components: ['max_strength', 'mental'],
      rpe: 9, duration: 75,
      items: [
        genWU(), ...lowerPrep(), dlRamp(),
        S('ex_deadlift', 1, '1', '90-95', '1rm', '5min', { ...P('سنجل ديدليفت تقيل', 'Heavy deadlift single', 'max_strength'), ...N('١٠: ٣×٢ @ ٨٥٪، ١١: ٩٠٪، ١٢: ٩٢.٥٪، ١٣: ٩٥٪ (١٤ يوم قبل البطولة بحد أقصى)', 'Wk10 3x2 @ 85%, wk11 90%, wk12 92.5%, wk13 95% (no later than 14 days out)') }),
        S('ex_deadlift', 2, '2', '85', '1rm', '4min', P('باك أوف', 'Back-offs', 'max_strength')),
        S(null, 3, '3', '80', '1rm', '3min', { name: t('بنش بوقفة ٣ ثواني', '3-second pause bench'), tempo: '2-3-X-0', ...P('ثبات على الصدر', 'Control on the chest', 'technique') }),
        S('ek_hyperextensions', 2, '10', '3', 'rir', '90s', P('أسفل الظهر خفيف', 'Light lower back', 'prevention')),
        coolLower()[1]
      ]
    },
    pk_light: {
      title: t('جلسة تكنيك خفيفة', 'Light technique session'),
      goal: t('إحساس بالتكنيك وسرعة البار بأوزان خفيفة بدون إجهاد.', 'Technique feel and bar speed at light loads without fatigue.'),
      components: ['technique', 'recovery'],
      rpe: 5, duration: 60,
      items: [
        genWU(), ...lowerPrep(), sqRamp(),
        S('ex_barbell_back_squat', 3, '3', '70', '1rm', '2min', { ...P('سرعة بار وتكنيك', 'Bar speed and technique', 'technique'), ...N('كل عدة بأقصى سرعة صعود ممكنة', 'Every rep with maximal concentric intent') }),
        S('ex_barbell_bench_press', 4, '3', '72.5', '1rm', '2min', { ...P('تكنيك بنش بوقفة', 'Paused bench technique', 'technique'), ...compBench }),
        S('wg_pallof_press', 2, '10/side', '3', 'rir', '60s', P('ثبات الجذع', 'Core stability', 'core')),
        coolFull()
      ]
    },
    tp_sb: {
      title: t('تهدئة — سكوات + بنش', 'Taper — squat + bench'),
      goal: t('سنجلات ٨٥-٩٠٪ بحجم منخفض جدًا.', 'Singles at 85-90% with very low volume.'),
      components: ['max_strength', 'recovery'],
      rpe: 7, duration: 70,
      items: [
        genWU(), ...lowerPrep(), sqRamp(),
        S('ex_barbell_back_squat', 1, '1', '87.5-90', '1rm', '4min', P('سنجل للحفاظ على الإحساس بالوزن', 'Single to keep the heavy-load feel', 'max_strength')),
        S('ex_barbell_back_squat', 2, '2', '80', '1rm', '3min', P('حجم بسيط', 'Minimal volume', 'max_strength')),
        S('ex_barbell_bench_press', 1, '1', '90', '1rm', '4min', { ...P('سنجل بنش', 'Bench single', 'max_strength'), ...compBench }),
        S('ex_barbell_bench_press', 2, '2', '82.5', '1rm', '3min', P('حجم بسيط', 'Minimal volume', 'max_strength')),
        coolLower()[0]
      ]
    },
    tp_dl: {
      title: t('تهدئة — ديدليفت خفيف + بنش', 'Taper — light deadlift + bench'),
      goal: t('ديدليفت متوسط للإحساس وبنش ثنائيات.', 'Moderate deadlift for feel and bench doubles.'),
      components: ['max_strength', 'recovery'],
      rpe: 6, duration: 60,
      items: [
        genWU(), ...lowerPrep(), dlRamp(),
        S('ex_deadlift', 2, '1', '85', '1rm', '4min', P('سنجلات سريعة بدون إجهاد', 'Crisp singles without fatigue', 'max_strength')),
        S('ex_barbell_bench_press', 3, '2', '80', '1rm', '3min', { ...P('بنش ثنائيات', 'Bench doubles', 'max_strength'), ...compBench }),
        coolLower()[1]
      ]
    },
    bp_light: {
      title: t('بنش خفيف + ظهر', 'Light bench + back'),
      goal: t('تكرار حركة البنش (الرفعة الأكثر فنية) بدون إجهاد.', 'Frequent bench practice (the most skill-dependent lift) without fatigue.'),
      components: ['technique', 'recovery'],
      rpe: 5, duration: 45,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        S('ex_barbell_bench_press', 4, '3', '65-70', '1rm', '2min', { ...P('إحساس وتوقيت الأوامر', 'Groove and command timing', 'technique'), ...compBench }),
        S('ex_seated_cable_row', 3, '12', '3', 'rir', '60s', P('ظهر خفيف وتدفق دم', 'Light back work and blood flow', 'recovery')),
        coolUpper()[1]
      ]
    },
    openers: {
      title: t('الأوبنرز — تجربة المحاولة الأولى', 'Openers — first-attempt rehearsal'),
      goal: t('رفع أوزان المحاولة الأولى بقواعد البطولة والتأكد إنها سهلة (RPE 7-8).', 'Hit planned openers under meet rules and confirm they are easy (RPE 7-8).'),
      components: ['max_strength', 'mental', 'technique'],
      rpe: 8, duration: 100,
      items: [
        genWU(), ...lowerPrep(), sqRamp(),
        S('ex_barbell_back_squat', 1, '1', '90-92', '1rm', '6min', { ...P('أوبنر السكوات — لازم يكون RPE 7-8', 'Squat opener — must be RPE 7-8', 'max_strength'), ...N('لو حسيته RPE 9 نزل الأوبنر ٢.٥-٥ كجم', 'If it feels RPE 9, lower the opener by 2.5-5 kg') }),
        S('ex_barbell_bench_press', 1, '1', '90-92', '1rm', '6min', { ...P('أوبنر البنش بأوامر الحكم', 'Bench opener with judge commands', 'max_strength') }),
        S('ex_deadlift', 1, '1', '88-90', '1rm', '6min', { ...P('أوبنر الديدليفت (أو تتعمل قبل البطولة بـ١٠-١٢ يوم)', 'Deadlift opener (or done 10-12 days out)', 'max_strength') }),
        { kind: 'drill', name: t('خطة المحاولات: أوبنر ٩٠-٩٢٪، تانية ٩٦-٩٨٪، تالتة ١٠٠-١٠٣٪ حسب اليوم', 'Attempt plan: opener 90-92%, second 96-98%, third 100-103% depending on the day'), sets: 1, reps: '1', ...P('تحديد المحاولات مسبقًا بيقلل التوتر والقرارات يوم البطولة', 'Pre-planned attempts reduce stress and decisions on meet day', 'mental') },
        coolFull()
      ]
    },
    primer: {
      title: t('تنشيط خفيف (Primer)', 'Light primer'),
      goal: t('سنجلات خفيفة للحفاظ على التوقيت والإحساس بدون أي إجهاد.', 'Light singles to keep timing and feel with zero fatigue.'),
      components: ['technique', 'recovery', 'mental'],
      rpe: 4, duration: 45,
      items: [
        genWU(), ...lowerPrep(),
        S('ex_barbell_back_squat', 3, '1', '65-70', '1rm', '2min', P('إحساس بالعمق والأوامر', 'Depth and command feel', 'technique')),
        S('ex_barbell_bench_press', 3, '1', '65-70', '1rm', '2min', { ...P('توقيت الوقفة', 'Pause timing', 'technique'), ...compBench }),
        coolFull()
      ]
    },
    meet: {
      title: t('يوم البطولة', 'Meet day'),
      goal: t('٣ محاولات في كل رفعة حسب الخطة، مع تسخين محسوب في غرفة الإحماء.', 'Three attempts per lift per plan, with a timed warm-up in the warm-up room.'),
      components: ['max_strength', 'mental'],
      rpe: 10, duration: 240,
      items: [
        wuN('تسخين غرفة الإحماء: ابدأ ٤٠-٥٠ دقيقة قبل الفلايت؛ آخر تسخين ٨٥-٨٨٪ قبل المحاولة الأولى بـ ٥-٧ دقايق', 'Warm-up room: start 40-50 min before your flight; last warm-up at 85-88% 5-7 min before the opener', { sets: 6, reps: '5-3-2-1-1-1' }),
        S('ex_barbell_back_squat', 3, '1', '90-103', '1rm', 'per flight', { ...P('المحاولات: ٩٠-٩٢٪ / ٩٦-٩٨٪ / ١٠٠-١٠٣٪', 'Attempts: 90-92% / 96-98% / 100-103%', 'max_strength'), ...N('اختار المحاولة الجاية حسب سرعة البار، مش حسب الحماس', 'Choose the next attempt by bar speed, not adrenaline') }),
        S('ex_barbell_bench_press', 3, '1', '90-103', '1rm', 'per flight', { ...P('نفس منطق المحاولات؛ ركز على الأوامر', 'Same attempt logic; focus on commands', 'max_strength') }),
        S('ex_deadlift', 3, '1', '90-105', '1rm', 'per flight', { ...P('آخر ديدليفت بيتحدد حسب المجموع المستهدف', 'Final deadlift chosen by the target total', 'max_strength') }),
        mobN('تبريد وأكل وسوائل بين الرفعات؛ كربوهيدرات سريعة كل ٣٠-٤٥ دقيقة', 'Between lifts: stay warm, eat and drink; fast carbs every 30-45 min', { duration: '10min' })
      ]
    }
  }
};

/* ============ 4) باورليفتنج — مبتدئ: تدرج خطي ثم بلوكات (12 أسبوع) ============ */
const T_PL_BEG = {
  id: 'pt_powerlifting_beg',
  sport: 'powerlifting',
  level: 'beginner',
  title: t('باورليفتنج للمبتدئين — ١٢ أسبوع (خطي ثم بلوكات)', 'Beginner powerlifting — 12 weeks (linear to block)'),
  goal: t('تعلم الرفعات الثلاث بتكنيك آمن، وبناء قوة سريعة بالتدرج الخطي، ثم الانتقال لبلوك بسيط بالنسب وانتهاء باختبار 1RM (أول ميت ميت).', 'Learn the three lifts with safe technique, build fast strength with linear progression, then move to a simple percentage block ending with a 1RM test (first mock meet).'),
  components: ['strength', 'max_strength', 'technique', 'core', 'hypertrophy'],
  sessionsPerWeek: 3,
  periods: [
    {
      type: 'gpp',
      goal: t('تدرج خطي: نفس المجموعات والعدات، والوزن يزيد كل جلسة طالما التكنيك نضيف.', 'Linear progression: same sets and reps, load added every session while technique stays clean.'),
      components: ['strength', 'technique', 'core'],
      blocks: [
        {
          name: t('بلوك ١ — تعلم وتدرج خطي', 'Block 1 — Learn and linear progression'),
          goal: t('تبادل جلسة أ وب (أ-ب-أ ثم ب-أ-ب). ابدأ بأوزان خفيفة (RIR 3-4) وزود ٢.٥ كجم سكوات/بنش و٥ كجم ديدليفت كل جلسة.', 'Alternate sessions A and B (A-B-A, then B-A-B). Start light (RIR 3-4) and add 2.5 kg to squat/bench and 5 kg to deadlift every session.'),
          components: ['technique', 'strength'],
          loads: [4, 5, 6],
          weekTypes: ['load', 'load', 'load'],
          pattern: ['lpA', '', 'lpB', '', 'lpA', '', '']
        },
        {
          name: t('بلوك ٢ — استمرار الخطي + تخفيف', 'Block 2 — Continued linear + deload'),
          goal: t('الزيادة بتقل (١-٢.٥ كجم). لو فشلت في نفس الوزن مرتين نزله ١٠٪ وابني تاني. الأسبوع السادس تخفيف (٢×٥ بـ ٨٠٪ من أوزانك). في آخره احسب 1RM التقديري = وزن الـ ٥ × ١.١٥.', 'Increments shrink (1-2.5 kg). If you fail the same load twice, drop 10% and rebuild. Week 6 is a deload (2x5 at 80% of your loads). At its end estimate 1RM = 5-rep load x 1.15.'),
          components: ['strength', 'technique'],
          loads: [6, 7, 3],
          weekTypes: ['load', 'shock', 'deload'],
          pattern: ['lpA', '', 'lpB', '', 'lpA', '', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('أول بلوك بالنسب: حجم ← شدة، ويوم رئيسي لكل رفعة.', 'First percentage block: volume to intensity, one main day per lift.'),
      components: ['strength', 'max_strength', 'hypertrophy'],
      blocks: [
        {
          name: t('بلوك ٣ — قوة بالنسب', 'Block 3 — Percentage strength'),
          goal: t('أسبوع ٧: ٥×٥ @ ٧٥٪ — أسبوع ٨: ٥×٤ @ ٧٧.٥-٨٠٪ — أسبوع ٩: ٤×٣ @ ٨٢.٥-٨٥٪ (من 1RM التقديري).', 'Wk7: 5x5 @ 75% — Wk8: 5x4 @ 77.5-80% — Wk9: 4x3 @ 82.5-85% (of estimated 1RM).'),
          components: ['strength', 'max_strength'],
          loads: [6, 7, 8],
          weekTypes: ['load', 'load', 'shock'],
          pattern: ['blkSq', '', 'blkBp', '', 'blkDl', '', '']
        }
      ]
    },
    {
      type: 'realization',
      goal: t('أوزان تقيلة بحجم قليل، تهدئة، ثم اختبار 1RM بقواعد البطولة.', 'Heavy low-volume work, a short taper, then a 1RM test under meet rules.'),
      components: ['max_strength', 'technique', 'mental'],
      blocks: [
        {
          name: t('بلوك ٤ — تقيل وتهدئة', 'Block 4 — Heavy then taper'),
          goal: t('أسبوع ١٠: ثنائيات وسنجل @ ٨٧.٥-٩٠٪. أسبوع ١١: تهدئة (نص الحجم، ٧٥-٨٠٪).', 'Wk10: doubles and a single @ 87.5-90%. Wk11: taper (half volume, 75-80%).'),
          components: ['max_strength', 'recovery'],
          loads: [8, 5],
          weekTypes: ['shock', 'taper'],
          pattern: ['hvySB', '', 'tech', '', 'hvyDL', '', '']
        },
        {
          name: t('أسبوع ١٢ — اختبار 1RM', 'Week 12 — 1RM test'),
          goal: t('تنشيط خفيف ثم يوم اختبار: ٣ محاولات لكل رفعة زي البطولة.', 'Light primer then test day: three attempts per lift, meet style.'),
          components: ['max_strength', 'mental'],
          loads: [6],
          weekTypes: ['test'],
          pattern: ['primer', '', '', 'test', '', '', '']
        }
      ]
    }
  ],
  sessions: {
    lpA: {
      title: t('جلسة أ — سكوات، بنش، تجديف', 'Session A — squat, bench, row'),
      goal: t('تعلم وتقوية السكوات والبنش بالتدرج الخطي.', 'Learn and strengthen squat and bench with linear progression.'),
      components: ['strength', 'technique'],
      rpe: 7, duration: 70,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_barbell_back_squat', '5-5-3', 'البار ×٥ ×٢، ثم ٧٠٪ من وزن العمل ×٣', 'Bar x5 x2, then 70% of work weight x3'),
        S('ex_barbell_back_squat', 3, '5', '3-1', 'rir', '3min', { tempo: '2-0-1-0', ...P('السكوات: عمق تحت الموازي وركب في اتجاه الصوابع', 'Squat: below parallel, knees tracking the toes', 'strength'), ...N('+٢.٥ كجم كل جلسة طالما آخر عدة نضيفة', '+2.5 kg each session while the last rep stays clean') }),
        S('ex_barbell_bench_press', 3, '5', '3-1', 'rir', '3min', { tempo: '2-1-1-0', ...P('البنش: لوح الكتف مقفول، وقفة خفيفة على الصدر', 'Bench: shoulder blades set, light pause on the chest', 'strength'), ...N('+١-٢.٥ كجم كل جلسة', '+1-2.5 kg each session') }),
        S('ex_bent_over_row', 3, '8', '2', 'rir', '2min', P('ظهر علوي لثبات السكوات والبنش', 'Upper back for squat and bench stability', 'hypertrophy')),
        S('ex_plank', 3, '30-45s', '2', 'rir', '60s', P('تعلم البريسينج وثبات الجذع', 'Learn bracing and trunk stiffness', 'core')),
        ...coolLower()
      ]
    },
    lpB: {
      title: t('جلسة ب — سكوات، ضغط فوق الرأس، ديدليفت', 'Session B — squat, overhead press, deadlift'),
      goal: t('سكوات للمرة التانية، ضغط فوق الرأس، وتعلم الديدليفت.', 'Second squat exposure, overhead press and learning the deadlift.'),
      components: ['strength', 'technique'],
      rpe: 7, duration: 75,
      items: [
        genWU(), ...lowerPrep(),
        S('ex_barbell_back_squat', 3, '5', '3-1', 'rir', '3min', { tempo: '2-0-1-0', ...P('سكوات — تكرار عالي لتعلم أسرع', 'Squat — high frequency for faster learning', 'strength') }),
        S('wg_overhead_press', 3, '5', '3-1', 'rir', '2.5min', { ...P('قوة الأكتاف والجذع وبتدعم البنش', 'Shoulder and trunk strength that supports the bench', 'strength'), ...N('+١ كجم كل جلسة (استخدم أقراص صغيرة)', '+1 kg each session (use micro plates)') }),
        ramp('ex_deadlift', '5-3', '٥٠٪ ×٥، ٧٥٪ ×٣ من وزن العمل', '50% x5, 75% x3 of work weight'),
        S('ex_deadlift', 1, '5', '3-1', 'rir', '3min', { ...P('الديدليفت: ضهر محايد، البار لازق في الرجل', 'Deadlift: neutral spine, bar close to the legs', 'strength'), ...N('+٥ كجم كل جلسة لحد ما الزيادة تبقى صعبة ثم +٢.٥', '+5 kg per session until it gets hard, then +2.5') }),
        S('ex_lat_pulldown', 3, '10', '2', 'rir', '90s', P('لاتس', 'Lats', 'hypertrophy')),
        S('ek_hyperextensions', 2, '12', '3', 'rir', '60s', P('أسفل الظهر والألوية', 'Lower back and glutes', 'prevention')),
        coolLower()[1]
      ]
    },
    blkSq: {
      title: t('بلوك — يوم السكوات', 'Block — squat day'),
      goal: t('اليوم الرئيسي للسكوات بالنسب + بنش خفيف.', 'Main squat day by percentage + light bench.'),
      components: ['strength', 'max_strength'],
      rpe: 8, duration: 80,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_barbell_back_squat', '5-3-2', 'البار ×٥، ٥٠٪ ×٣، ٦٥٪ ×٢', 'Bar x5, 50% x3, 65% x2'),
        S('ex_barbell_back_squat', 5, '5-3', '75-85', '1rm', '3min', { ...P('قوة السكوات بالنسب', 'Squat strength by percentage', 'max_strength'), ...N('٧: ٥×٥ @ ٧٥٪ — ٨: ٥×٤ @ ٧٧.٥-٨٠٪ — ٩: ٤×٣ @ ٨٢.٥-٨٥٪', 'Wk7 5x5 @ 75% — wk8 5x4 @ 77.5-80% — wk9 4x3 @ 82.5-85%') }),
        S('ex_barbell_bench_press', 3, '8', '67.5', '1rm', '2min', P('حجم بنش خفيف', 'Light bench volume', 'hypertrophy')),
        S('ex_bulgarian_split_squat', 3, '8/leg', '2', 'rir', '90s', P('رجل واحدة', 'Single-leg strength', 'hypertrophy')),
        S('ex_dead_bug', 3, '8/side', '2', 'rir', '60s', P('تحكم الجذع', 'Trunk control', 'core')),
        ...coolLower()
      ]
    },
    blkBp: {
      title: t('بلوك — يوم البنش', 'Block — bench day'),
      goal: t('اليوم الرئيسي للبنش بالنسب + مساعدات علوية.', 'Main bench day by percentage + upper accessories.'),
      components: ['strength', 'max_strength', 'hypertrophy'],
      rpe: 8, duration: 70,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        ramp('ex_barbell_bench_press', '8-5-3', 'البار ×٨، ٥٠٪ ×٥، ٦٥٪ ×٣', 'Bar x8, 50% x5, 65% x3'),
        S('ex_barbell_bench_press', 5, '5-3', '75-85', '1rm', '3min', { ...P('قوة البنش بالنسب مع وقفة على الصدر', 'Bench strength by percentage with a chest pause', 'max_strength'), ...N('نفس موجة السكوات', 'Same wave as the squat') }),
        S('ex_close_grip_bench_press', 3, '8', '2', 'rir', '2min', P('ترايسبس', 'Triceps', 'hypertrophy')),
        S('ex_one_arm_dumbbell_row', 3, '10/side', '2', 'rir', '90s', P('ظهر', 'Back', 'hypertrophy')),
        S('ex_face_pull', 3, '15', '2', 'rir', '60s', P('صحة الكتف', 'Shoulder health', 'prevention')),
        coolUpper()[0]
      ]
    },
    blkDl: {
      title: t('بلوك — يوم الديدليفت', 'Block — deadlift day'),
      goal: t('اليوم الرئيسي للديدليفت + سكوات خفيف + ضغط فوق الرأس.', 'Main deadlift day + light squat + overhead press.'),
      components: ['strength', 'max_strength'],
      rpe: 8, duration: 80,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_deadlift', '5-3-2', '٤٠٪ ×٥، ٦٠٪ ×٣، ٧٠٪ ×٢', '40% x5, 60% x3, 70% x2'),
        S('ex_deadlift', 3, '5-3', '75-85', '1rm', '3min', { ...P('قوة الديدليفت بالنسب (٣ مجموعات بس عشان الإجهاد)', 'Deadlift strength by percentage (3 sets only due to fatigue)', 'max_strength') }),
        S('ex_barbell_back_squat', 3, '5', '65', '1rm', '2min', P('سكوات خفيف للتكرار الفني', 'Light squat for technical frequency', 'technique')),
        S('wg_overhead_press', 3, '6', '72.5', '1rm', '2min', P('أكتاف', 'Shoulders', 'strength')),
        S('ex_hanging_leg_raise', 3, '10', '2', 'rir', '60s', P('بطن', 'Abs', 'core')),
        coolLower()[1]
      ]
    },
    hvySB: {
      title: t('تقيل — سكوات + بنش', 'Heavy — squat + bench'),
      goal: t('أول تعرض لأوزان ٨٧.٥-٩٠٪ بأمان.', 'First safe exposure to 87.5-90% loads.'),
      components: ['max_strength', 'mental'],
      rpe: 9, duration: 80,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_barbell_back_squat', '5-3-2-1', 'البار ×٥، ٥٠٪ ×٣، ٦٥٪ ×٢، ٨٠٪ ×١', 'Bar x5, 50% x3, 65% x2, 80% x1'),
        S('ex_barbell_back_squat', 1, '1', '87.5-90', '1rm', '4min', { ...P('سنجل تقيل — لازم يكون بسبوترز أو سيفتي بارز', 'Heavy single — spotters or safety bars required', 'max_strength'), ...N('أسبوع ١١ (تهدئة): ٣×٢ @ ٧٥-٨٠٪ بدل السنجل', 'Wk11 (taper): 3x2 @ 75-80% instead of the single') }),
        S('ex_barbell_back_squat', 2, '2', '82.5', '1rm', '3min', P('ثنائيات', 'Doubles', 'max_strength')),
        S('ex_barbell_bench_press', 1, '1', '87.5-90', '1rm', '4min', P('سنجل بنش مع سبوتر', 'Bench single with a spotter', 'max_strength')),
        S('ex_barbell_bench_press', 2, '2', '82.5', '1rm', '3min', P('ثنائيات', 'Doubles', 'max_strength')),
        coolLower()[0]
      ]
    },
    hvyDL: {
      title: t('تقيل — ديدليفت', 'Heavy — deadlift'),
      goal: t('ثنائيات وسنجل ديدليفت تقيل.', 'Heavy deadlift doubles and a single.'),
      components: ['max_strength'],
      rpe: 9, duration: 65,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_deadlift', '5-3-2-1', '٤٠٪ ×٥، ٦٠٪ ×٣، ٧٠٪ ×٢، ٨٠٪ ×١', '40% x5, 60% x3, 70% x2, 80% x1'),
        S('ex_deadlift', 1, '1', '87.5-90', '1rm', '4min', { ...P('سنجل ديدليفت تقيل بتكنيك ثابت', 'Heavy deadlift single with consistent technique', 'max_strength'), ...N('أسبوع ١١: ٢×٢ @ ٧٥٪ بس', 'Wk11: 2x2 @ 75% only') }),
        S('ex_deadlift', 2, '2', '80', '1rm', '3min', P('ثنائيات', 'Doubles', 'max_strength')),
        S('wg_chest_supported_row', 3, '10', '2', 'rir', '90s', P('ظهر', 'Back', 'hypertrophy')),
        coolLower()[1]
      ]
    },
    tech: {
      title: t('تكنيك خفيف للثلاث رفعات', 'Light technique — all three lifts'),
      goal: t('تكرار الحركة بأوزان ٦٠-٧٠٪ وتعلم أوامر الحكام.', 'Movement practice at 60-70% and learning judges\' commands.'),
      components: ['technique', 'recovery'],
      rpe: 5, duration: 55,
      items: [
        genWU(), ...lowerPrep(),
        S('ex_barbell_back_squat', 3, '3', '65', '1rm', '2min', P('أمر "سكوات" و"راك"', '"Squat" and "rack" commands', 'technique')),
        S('ex_barbell_bench_press', 3, '3', '70', '1rm', '2min', P('وقفة لحد أمر "برس"', 'Pause until the "press" command', 'technique')),
        S('ex_deadlift', 2, '2', '65', '1rm', '2min', P('قفلة كاملة لحد أمر "داون"', 'Full lockout until the "down" command', 'technique')),
        coolFull()
      ]
    },
    primer: {
      title: t('تنشيط قبل الاختبار', 'Pre-test primer'),
      goal: t('سنجلات خفيفة للإحساس بدون تعب.', 'Light singles for feel without fatigue.'),
      components: ['technique', 'recovery'],
      rpe: 4, duration: 40,
      items: [
        genWU(), ...lowerPrep(),
        S('ex_barbell_back_squat', 3, '1', '70', '1rm', '2min', P('إحساس', 'Feel', 'technique')),
        S('ex_barbell_bench_press', 3, '1', '70', '1rm', '2min', P('إحساس', 'Feel', 'technique')),
        coolFull()
      ]
    },
    test: {
      title: t('يوم اختبار 1RM (ميت ميت)', '1RM test day (mock meet)'),
      goal: t('٣ محاولات لكل رفعة: ٩٠٪، ٩٧٪، ١٠٠-١٠٣٪ من 1RM التقديري.', 'Three attempts per lift: 90%, 97%, 100-103% of estimated 1RM.'),
      components: ['max_strength', 'mental'],
      rpe: 10, duration: 150,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_barbell_back_squat', '5-3-2-1-1', 'البار ×٥، ٥٠٪ ×٣، ٦٥٪ ×٢، ٧٥٪ ×١، ٨٥٪ ×١', 'Bar x5, 50% x3, 65% x2, 75% x1, 85% x1'),
        S('ex_barbell_back_squat', 3, '1', '90-103', '1rm', '5-8min', { ...P('محاولات السكوات: ٩٠ / ٩٧ / ١٠٠-١٠٣٪', 'Squat attempts: 90 / 97 / 100-103%', 'max_strength'), ...N('ما تجربش التالتة لو التانية كانت RPE 10', 'Skip the third if the second was RPE 10') }),
        S('ex_barbell_bench_press', 3, '1', '90-103', '1rm', '5-8min', P('محاولات البنش بنفس المنطق', 'Bench attempts, same logic', 'max_strength')),
        S('ex_deadlift', 3, '1', '90-105', '1rm', '5-8min', P('محاولات الديدليفت؛ المجموع = أحسن ٣ رفعات', 'Deadlift attempts; total = best of each lift', 'max_strength')),
        coolFull()
      ]
    }
  }
};

/* ============ 5) رفع أثقال أولمبي — متقدم، تجهيز لبطولة (16 أسبوع) ============ */
const wlWU = () => [
  genWU('ex_rowing_machine'),
  wu('ad_deep_squat_hold', { sets: 1, duration: '1min', note: t('قعدة سكوات عميقة مع فتح الركب والكاحل', 'Deep squat hold opening hips and ankles') }),
  wuN('تسخين بالبار: بيرجنر (سحب عالي، مسل سناتش، سناتش بالنزول، اوفرهيد سكوات)', 'Empty-bar Burgener warm-up (high pull, muscle snatch, snatch drop, overhead squat)', { sets: 2, reps: '5 each' })
];
const pctSn = () => N('النسبة من 1RM السناتش الكامل', 'Percentage of full-snatch 1RM');
const pctCj = () => N('النسبة من 1RM الكلين أند جيرك', 'Percentage of clean & jerk 1RM');

const T_WL_COMP = {
  id: 'pt_weightlifting_comp_adv',
  sport: 'weightlifting',
  level: 'advanced',
  title: t('رفع أثقال أولمبي — تجهيز لبطولة ١٦ أسبوع (متقدم)', 'Weightlifting — 16-week competition prep (advanced)'),
  goal: t('رفع مجموع الخطف والكلين أند جيرك في البطولة: تراكم فني وقوة سحب وسكوات، ثم تحويل للحركات الكاملة بنسب عالية، ثم ذروة بسنجلات ٩٠٪+ ومنافسة تجريبية وتهدئة.', 'Raise the competition snatch and clean & jerk total: technical accumulation with pull and squat strength, transmutation to full lifts at higher percentages, then peaking with 90%+ singles, a mock meet and taper.'),
  components: ['power', 'technique', 'max_strength', 'speed', 'mobility', 'mental'],
  sessionsPerWeek: 6,
  periods: [
    {
      type: 'accumulation',
      goal: t('تراكم: حجم عالي بنسب ٦٥-٧٧٪، متغيرات من التعليق ومن البلوكات، سحبات ٩٠-١٠٠٪، وسكوات ٥×٥.', 'Accumulation: high volume at 65-77%, hang and block variations, pulls at 90-100%, squats 5x5.'),
      components: ['technique', 'strength', 'hypertrophy', 'mobility'],
      blocks: [
        {
          name: t('بلوك ١ — تراكم فني', 'Block 1 — Technical accumulation'),
          goal: t('٦ جلسات: خطف وكلين مرتين في الأسبوع، ويوم سكوات، ويوم تكنيك خفيف. النسب تزيد ٢-٣٪ أسبوعيًا والأسبوع الرابع تخفيف (-٤٠٪ حجم، -١٠٪ شدة).', '6 sessions: snatch and clean twice weekly, a squat day and a light technique day. Percentages rise 2-3% weekly; week 4 deload (-40% volume, -10% intensity).'),
          components: ['technique', 'strength'],
          loads: [6, 7, 8, 4],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['sn1', 'cj1', 'sq1', '', 'sn1', 'cj1', 'tech']
        }
      ]
    },
    {
      type: 'transmutation',
      goal: t('تحويل: الحركات الكاملة بنسب ٧٨-٨٧٪ ثنائيات، سحبات ١٠٠-١١٠٪، وسكوات ثلاثيات ٨٠-٨٧.٥٪.', 'Transmutation: full lifts at 78-87% doubles, pulls at 100-110%, squat triples at 80-87.5%.'),
      components: ['power', 'max_strength', 'technique'],
      blocks: [
        {
          name: t('بلوك ٢ — تحويل وقوة', 'Block 2 — Transmutation and strength'),
          goal: t('الحجم ينزل ٢٠٪ والشدة تطلع. ركز على السرعة تحت البار والاستلام الثابت. الأسبوع الرابع تخفيف.', 'Volume down 20%, intensity up. Focus on speed under the bar and stable receptions. Week 4 deload.'),
          components: ['power', 'max_strength'],
          loads: [7, 8, 9, 4],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['sn2', 'cj2', 'sq2', '', 'sn2', 'cj2', 'tech']
        }
      ]
    },
    {
      type: 'realization',
      goal: t('تحقيق: سنجلات ٨٨-٩٥٪، منافسة تجريبية في أسبوع ١٢، ثم موجة ذروة تانية أقصر.', 'Realization: singles at 88-95%, a mock competition in week 12, then a second, shorter peaking wave.'),
      components: ['power', 'max_strength', 'mental'],
      blocks: [
        {
          name: t('بلوك ٣ — ذروة أولى', 'Block 3 — First peak'),
          goal: t('سنجلات تقيلة (٣-٥ في الحركة) بقرار حسب سرعة البار؛ السكوات ثنائيات ٨٥-٩٠٪. الأسبوع الـ١١ خفيف قبل التجريبية.', 'Heavy singles (3-5 per lift) auto-regulated by bar speed; squat doubles at 85-90%. Week 11 is light before the mock meet.'),
          components: ['power', 'max_strength'],
          loads: [8, 9, 6],
          weekTypes: ['load', 'shock', 'taper'],
          pattern: ['sn3', 'cj3', 'sq3', '', 'sn3', 'cj3', 'tech']
        },
        {
          name: t('أسبوع ١٢ — منافسة تجريبية', 'Week 12 — Mock competition'),
          goal: t('٦ محاولات بالتوقيت والقواعد الرسمية لتحديد الـ PRs واختيار أوزان البطولة.', 'Six attempts with official timing and rules to set PRs and pick competition attempts.'),
          components: ['max_strength', 'mental', 'technique'],
          loads: [8],
          weekTypes: ['test'],
          pattern: ['tp_b', '', 'tp_a', '', '', 'mock', '']
        },
        {
          name: t('بلوك ٤ — ذروة تانية', 'Block 4 — Second peak'),
          goal: t('النسب محسوبة من نتيجة التجريبية. سنجلات ٩٠-٩٥٪ في أسبوع ١٣ ثم تقليل في ١٤.', 'Percentages recalculated from the mock result. Singles at 90-95% in week 13, reduced in week 14.'),
          components: ['power', 'max_strength', 'mental'],
          loads: [9, 7],
          weekTypes: ['shock', 'load'],
          pattern: ['sn3', 'cj3', 'sq3', '', 'sn3', 'cj3', 'tech']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('تهدئة: الحجم ينزل ٤٠-٦٠٪، سنجلات ٨٥-٩٠٪ للحفاظ على الإحساس، ثم البطولة.', 'Taper: volume down 40-60%, singles at 85-90% to keep the feel, then compete.'),
      components: ['recovery', 'power', 'mental'],
      blocks: [
        {
          name: t('أسبوع ١٥ — تهدئة', 'Week 15 — Taper'),
          goal: t('٣ جلسات بس، سنجلات للإحساس والسرعة، ونوم وأكل منتظمين وضبط الوزن.', 'Only 3 sessions, singles for feel and speed, regular sleep and nutrition, weight management.'),
          components: ['recovery', 'power'],
          loads: [4],
          weekTypes: ['taper'],
          pattern: ['tp_a', '', 'tp_b', '', 'tp_a', '', '']
        },
        {
          name: t('أسبوع ١٦ — البطولة', 'Week 16 — Competition'),
          goal: t('جلستين خفاف ثم البطولة.', 'Two light sessions then competition.'),
          components: ['mental', 'power'],
          loads: [2],
          weekTypes: ['comp'],
          pattern: ['tp_a', '', 'tp_b', '', '', 'comp', '']
        }
      ]
    }
  ],
  sessions: {
    sn1: {
      title: t('خطف — تراكم', 'Snatch — accumulation'),
      goal: t('تثبيت مسار البار والوضعيات بمتغيرات من التعليق، مع سحب وأوفرهيد سكوات.', 'Groove bar path and positions with hang variations, plus pulls and overhead squats.'),
      components: ['technique', 'power', 'strength'],
      rpe: 7, duration: 90,
      items: [
        ...wlWU(),
        S(null, 5, '3', '70-75', '1rm', '2min', { name: t('خطف من التعليق (فوق الركبة)', 'Hang snatch (above knee)'), ...P('وضع القوة والامتداد الكامل قبل السحب تحت البار', 'Power position and full extension before pulling under', 'technique'), ...pctSn() }),
        S('ad_power_snatch', 4, '2', '65-70', '1rm', '2min', { ...P('سرعة الامتداد والاستلام العالي', 'Extension speed and a high receive', 'power'), ...pctSn() }),
        S(null, 4, '4', '90-100', '1rm', '2min', { name: t('سحب سناتش', 'Snatch pull'), tempo: '2-0-X-0', ...P('قوة السحب بنفس وضعيات الخطف', 'Pull strength in snatch positions', 'strength'), ...pctSn() }),
        S('ek_overhead_squat_with_barbell', 4, '3', '75-85', '1rm', '2min', { tempo: '3-1-X-0', ...P('ثبات فوق الرأس وقوة الاستلام', 'Overhead stability and receiving strength', 'strength'), ...pctSn() }),
        S('ex_hanging_leg_raise', 3, '10', '2', 'rir', '60s', P('جذع', 'Trunk', 'core')),
        mob('ad_bench_thoracic_extension_stretch', { duration: '2min' })
      ]
    },
    cj1: {
      title: t('كلين أند جيرك — تراكم', 'Clean & jerk — accumulation'),
      goal: t('كلين مع فرونت سكوات، جيرك من الراك، وسحب كلين.', 'Clean + front squat complexes, jerks from the rack and clean pulls.'),
      components: ['technique', 'power', 'strength'],
      rpe: 7, duration: 95,
      items: [
        ...wlWU(),
        S(null, 5, '1+2', '70-75', '1rm', '2.5min', { name: t('كلين + ٢ فرونت سكوات (كومبلكس)', 'Clean + 2 front squats (complex)'), ...P('الاستلام الثابت في الفرونت راك وقوة القيام', 'Solid front-rack receipt and recovery strength', 'technique'), ...pctCj() }),
        S(null, 5, '2', '70-75', '1rm', '2min', { name: t('جيرك سبليت من الراك', 'Split jerk from rack'), ...P('ديب ودرايف مستقيم وتثبيت القدمين', 'Vertical dip-drive and foot placement', 'technique'), ...pctCj() }),
        S('ad_clean_pull', 4, '4', '90-100', '1rm', '2min', { ...P('قوة سحب الكلين', 'Clean pull strength', 'strength'), ...N('النسبة من 1RM الكلين', 'Percentage of clean 1RM') }),
        S('ex_front_squat', 4, '4', '70-75', '1rm', '2.5min', { tempo: '2-0-X-0', ...P('قوة الفرونت سكوات للقيام من الكلين', 'Front-squat strength for clean recoveries', 'max_strength'), ...N('النسبة من 1RM الفرونت سكوات', 'Percentage of front-squat 1RM') }),
        S('ex_plank', 3, '45s', '2', 'rir', '60s', P('ثبات الجذع', 'Trunk stiffness', 'core')),
        mob('ad_couch_stretch', { duration: '1min/side' })
      ]
    },
    sq1: {
      title: t('يوم القوة — سكوات خلفي وضغط', 'Strength day — back squat and pressing'),
      goal: t('قوة الرجلين والجزء العلوي والسلسلة الخلفية.', 'Leg, upper-body and posterior-chain strength.'),
      components: ['max_strength', 'hypertrophy'],
      rpe: 8, duration: 80,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_barbell_back_squat', '5-3-2', 'البار ×٥، ٥٠٪ ×٣، ٦٥٪ ×٢', 'Bar x5, 50% x3, 65% x2'),
        S('ex_barbell_back_squat', 5, '5', '70-77.5', '1rm', '3min', { tempo: '2-0-X-0', ...P('قاعدة القوة للرجلين', 'Leg strength base', 'max_strength') }),
        S('wg_push_press', 4, '4', '70-75', '1rm', '2min', P('قوة الدرايف للجيرك', 'Drive strength for the jerk', 'power')),
        S('ex_romanian_deadlift', 3, '6', '2', 'rir', '2min', { tempo: '3-0-1-0', ...P('خلفية وأسفل ظهر للسحب', 'Hamstrings and lower back for pulling', 'strength') }),
        S('wg_pendlay_row', 3, '8', '2', 'rir', '90s', P('ظهر علوي', 'Upper back', 'hypertrophy')),
        S('ek_hyperextensions', 3, '12', '2', 'rir', '60s', P('أسفل الظهر', 'Lower back', 'prevention')),
        coolLower()[1]
      ]
    },
    tech: {
      title: t('تكنيك خفيف واستشفاء', 'Light technique and recovery'),
      goal: t('تكرار الحركات بأوزان خفيفة جدًا لتثبيت الأنماط الحركية وتسريع الاستشفاء.', 'Very light lift practice to reinforce motor patterns and aid recovery.'),
      components: ['technique', 'recovery', 'mobility'],
      rpe: 4, duration: 60,
      items: [
        ...wlWU(),
        S('ad_muscle_snatch', 4, '3', '50-60', '1rm', '90s', { ...P('مسار البار ولف الكوع', 'Bar path and elbow turnover', 'technique'), ...pctSn() }),
        S(null, 4, '2', '50-60', '1rm', '90s', { name: t('سناتش بالانس', 'Snatch balance'), ...P('السرعة تحت البار والثقة في الاستلام', 'Speed under the bar and confidence in the receive', 'technique'), ...pctSn() }),
        S(null, 4, '3', '50-60', '1rm', '90s', { name: t('بوش جيرك + سبليت جيرك خفيف (شغل رجلين)', 'Light push jerk + split jerk (footwork)'), ...P('توقيت الرجلين في الجيرك', 'Jerk footwork timing', 'technique'), ...pctCj() }),
        coolFull()
      ]
    },
    sn2: {
      title: t('خطف — تحويل', 'Snatch — transmutation'),
      goal: t('خطف كامل ثنائيات بنسب عالية وسحب فوق الـ ١٠٠٪.', 'Full snatch doubles at higher percentages and pulls above 100%.'),
      components: ['power', 'technique', 'max_strength'],
      rpe: 8, duration: 90,
      items: [
        ...wlWU(),
        S(null, 6, '2', '78-85', '1rm', '2.5min', { name: t('خطف كامل', 'Full snatch'), ...P('الحركة التنافسية بشدة عالية', 'Competition lift at high intensity', 'power'), ...N('أسبوع ٥: ٧٨٪، ٦: ٨٠-٨٢٪، ٧: ٨٥٪؛ لو فشلت مرتين نزل ٥٪', 'Wk5 78%, wk6 80-82%, wk7 85%; after two misses drop 5%') }),
        S(null, 4, '3', '100-110', '1rm', '2.5min', { name: t('سحب سناتش', 'Snatch pull'), ...P('قوة سحب فوق وزن الحركة', 'Pull strength above lift weight', 'max_strength'), ...pctSn() }),
        S('ek_overhead_squat_with_barbell', 3, '2', '85-90', '1rm', '2min', { ...P('ثبات فوق الرأس بأوزان قريبة من المنافسة', 'Overhead stability near competition loads', 'strength'), ...pctSn() }),
        S('ex_hanging_leg_raise', 3, '10', '2', 'rir', '60s', P('جذع', 'Trunk', 'core')),
        mob('ad_bench_thoracic_extension_stretch', { duration: '2min' })
      ]
    },
    cj2: {
      title: t('كلين أند جيرك — تحويل', 'Clean & jerk — transmutation'),
      goal: t('كلين أند جيرك كامل بنسب عالية، سحب كلين تقيل وفرونت سكوات.', 'Full clean & jerk at higher percentages, heavy clean pulls and front squats.'),
      components: ['power', 'technique', 'max_strength'],
      rpe: 8, duration: 95,
      items: [
        ...wlWU(),
        S(null, 6, '1+1', '78-85', '1rm', '3min', { name: t('كلين + جيرك', 'Clean + jerk'), ...P('الحركة التنافسية كاملة', 'Full competition lift', 'power'), ...pctCj() }),
        S('ad_clean_pull', 4, '3', '100-110', '1rm', '2.5min', { ...P('قوة السحب', 'Pull strength', 'max_strength'), ...N('النسبة من 1RM الكلين', 'Percentage of clean 1RM') }),
        S('ex_front_squat', 5, '3', '80-85', '1rm', '3min', { ...P('قوة القيام من الكلين التقيل', 'Strength to recover heavy cleans', 'max_strength') }),
        S('ex_plank', 3, '45s', '2', 'rir', '60s', P('جذع', 'Trunk', 'core')),
        mob('ad_couch_stretch', { duration: '1min/side' })
      ]
    },
    sq2: {
      title: t('يوم القوة — ثلاثيات تقيلة', 'Strength day — heavy triples'),
      goal: t('سكوات خلفي ثلاثيات وبوش برس تقيل.', 'Back-squat triples and heavy push press.'),
      components: ['max_strength', 'power'],
      rpe: 8, duration: 75,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_barbell_back_squat', '5-3-2-1', 'البار ×٥، ٥٠٪ ×٣، ٦٥٪ ×٢، ٧٥٪ ×١', 'Bar x5, 50% x3, 65% x2, 75% x1'),
        S('ex_barbell_back_squat', 5, '3', '80-87.5', '1rm', '3min', P('قوة قصوى للرجلين', 'Maximal leg strength', 'max_strength')),
        S('wg_push_press', 4, '3', '75-80', '1rm', '2.5min', P('قوة الدرايف', 'Drive strength', 'power')),
        S('ad_clean_high_pull', 3, '3', '85-90', '1rm', '2min', { ...P('سرعة الامتداد العالي', 'High-extension speed', 'power'), ...N('النسبة من 1RM الكلين', 'Percentage of clean 1RM') }),
        S('ek_hyperextensions', 3, '10', '2', 'rir', '60s', P('أسفل الظهر', 'Lower back', 'prevention')),
        coolLower()[1]
      ]
    },
    sn3: {
      title: t('خطف — ذروة', 'Snatch — peaking'),
      goal: t('سنجلات تقيلة ٨٨-٩٥٪ مع قرار حسب الجاهزية.', 'Heavy singles at 88-95% auto-regulated by readiness.'),
      components: ['power', 'max_strength', 'mental'],
      rpe: 9, duration: 80,
      items: [
        ...wlWU(),
        S(null, 4, '1', '88-95', '1rm', '2.5-3min', { name: t('خطف كامل — سنجلات', 'Full snatch — singles'), ...P('التعود على أوزان المنافسة', 'Habituation to competition loads', 'max_strength'), ...N('وصل للنسبة بقفزات ٣-٥ كجم؛ وقف لو السرعة نزلت أو فشلت مرتين', 'Build in 3-5 kg jumps; stop if speed drops or after two misses') }),
        S(null, 2, '2', '80', '1rm', '2min', { name: t('خطف كامل — باك أوف', 'Full snatch — back-offs'), ...P('تكرار نظيف بعد التقيل', 'Clean repetitions after the heavy work', 'technique'), ...pctSn() }),
        S(null, 3, '2', '100-105', '1rm', '2.5min', { name: t('سحب سناتش', 'Snatch pull'), ...P('الحفاظ على قوة السحب', 'Maintain pull strength', 'strength'), ...pctSn() }),
        mob('ad_bench_thoracic_extension_stretch', { duration: '2min' })
      ]
    },
    cj3: {
      title: t('كلين أند جيرك — ذروة', 'Clean & jerk — peaking'),
      goal: t('سنجلات كلين أند جيرك ٨٨-٩٣٪ وفرونت سكوات تقيل.', 'Clean & jerk singles at 88-93% and heavy front squats.'),
      components: ['power', 'max_strength', 'mental'],
      rpe: 9, duration: 85,
      items: [
        ...wlWU(),
        S(null, 4, '1+1', '88-93', '1rm', '3min', { name: t('كلين أند جيرك — سنجلات', 'Clean & jerk — singles'), ...P('أوزان المنافسة', 'Competition loads', 'max_strength'), ...pctCj() }),
        S('ex_front_squat', 3, '2', '85-90', '1rm', '3min', P('قوة القيام', 'Recovery strength', 'max_strength')),
        S('ad_clean_pull', 2, '2', '100-105', '1rm', '2.5min', P('سحب', 'Pull', 'strength')),
        mob('ad_couch_stretch', { duration: '1min/side' })
      ]
    },
    sq3: {
      title: t('يوم القوة — ذروة', 'Strength day — peaking'),
      goal: t('سكوات ثنائيات تقيلة وجيرك من البلوكات فوق أوزان المنافسة.', 'Heavy squat doubles and jerks from blocks at or above competition loads.'),
      components: ['max_strength', 'power'],
      rpe: 8, duration: 70,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_barbell_back_squat', '5-3-2-1', 'البار ×٥، ٥٠٪ ×٣، ٦٥٪ ×٢، ٧٥٪ ×١', 'Bar x5, 50% x3, 65% x2, 75% x1'),
        S('ex_barbell_back_squat', 3, '2', '88-92', '1rm', '3min', P('الحفاظ على القوة القصوى بحجم قليل', 'Maintain max strength with low volume', 'max_strength')),
        S(null, 4, '1', '90-100', '1rm', '2.5min', { name: t('جيرك من البلوكات', 'Jerk from blocks'), ...P('ثقة في الجيرك بأوزان المنافسة', 'Jerk confidence at competition loads', 'power'), ...N('النسبة من أحسن جيرك', 'Percentage of best jerk') }),
        coolLower()[1]
      ]
    },
    mock: {
      title: t('منافسة تجريبية', 'Mock competition'),
      goal: t('٣ محاولات خطف + ٣ كلين أند جيرك بالتوقيت الرسمي (دقيقة للمحاولة).', 'Three snatch + three clean & jerk attempts with official timing (one minute per attempt).'),
      components: ['max_strength', 'mental', 'technique'],
      rpe: 10, duration: 150,
      items: [
        ...wlWU(),
        S(null, 3, '1', '92-101', '1rm', '3-5min', { name: t('محاولات الخطف', 'Snatch attempts'), ...P('المحاولات: ٩٢-٩٤ / ٩٧-٩٩ / ١٠٠-١٠١٪', 'Attempts: 92-94 / 97-99 / 100-101%', 'max_strength'), ...pctSn() }),
        S(null, 3, '1', '92-101', '1rm', '3-5min', { name: t('محاولات الكلين أند جيرك', 'Clean & jerk attempts'), ...P('نفس المنطق، والتالتة حسب المجموع المستهدف', 'Same logic; third chosen by target total', 'max_strength'), ...pctCj() }),
        coolFull()
      ]
    },
    tp_a: {
      title: t('تهدئة أ — سنجلات للإحساس', 'Taper A — singles for feel'),
      goal: t('خطف وكلين أند جيرك لحد ٨٥-٩٠٪ سنجلات بسرعة.', 'Snatch and clean & jerk up to 85-90% crisp singles.'),
      components: ['power', 'technique'],
      rpe: 7, duration: 70,
      items: [
        ...wlWU(),
        S(null, 3, '1', '80-88', '1rm', '2min', { name: t('خطف كامل', 'Full snatch'), ...P('إحساس بالسرعة والتوقيت', 'Speed and timing feel', 'power'), ...pctSn() }),
        S(null, 3, '1+1', '80-88', '1rm', '2.5min', { name: t('كلين + جيرك', 'Clean + jerk'), ...P('إحساس بالمنافسة', 'Competition feel', 'power'), ...pctCj() }),
        S('ex_front_squat', 2, '2', '75-80', '1rm', '2.5min', P('قوة بدون تعب', 'Strength without fatigue', 'max_strength')),
        coolFull()
      ]
    },
    tp_b: {
      title: t('تهدئة ب — باور وخفيف', 'Taper B — power variants, light'),
      goal: t('باور سناتش وباور كلين خفيف وسكوات خفيف.', 'Light power snatch, power clean and squats.'),
      components: ['power', 'recovery'],
      rpe: 5, duration: 55,
      items: [
        ...wlWU(),
        S('ad_power_snatch', 4, '2', '65-70', '1rm', '90s', { ...P('سرعة', 'Speed', 'power'), ...pctSn() }),
        S('ad_power_clean', 4, '1', '65-70', '1rm', '90s', { ...P('سرعة وتوقيت', 'Speed and timing', 'power'), ...pctCj() }),
        S('ex_barbell_back_squat', 3, '3', '70', '1rm', '2min', P('الحفاظ على الإحساس', 'Keep the feel', 'strength')),
        coolFull()
      ]
    },
    comp: {
      title: t('يوم البطولة', 'Competition day'),
      goal: t('٦ محاولات حسب الخطة؛ الأوبنر ٩٠-٩٣٪ من أحسن رفعة في التجريبية.', 'Six attempts per plan; openers 90-93% of the best mock-meet lift.'),
      components: ['max_strength', 'mental'],
      rpe: 10, duration: 180,
      items: [
        wuN('تسخين في غرفة الإحماء مع العدّاد: آخر تسخين قبل الأوبنر بـ ٣-٤ محاولات', 'Warm-up room synced to the attempt counter: last warm-up 3-4 attempts before your opener', { sets: 8, reps: '3-2-2-1-1-1-1-1' }),
        S(null, 3, '1', '93-102', '1rm', 'per attempt', { name: t('خطف — ٣ محاولات', 'Snatch — 3 attempts'), ...P('أوبنر أكيد، تانية قريبة من الأحسن، تالتة PR لو اليوم يسمح', 'Safe opener, second near best, third a PR if the day allows', 'max_strength'), ...pctSn() }),
        S(null, 3, '1', '93-102', '1rm', 'per attempt', { name: t('كلين أند جيرك — ٣ محاولات', 'Clean & jerk — 3 attempts'), ...P('المجموع هو الهدف؛ اختار حسب ترتيب المنافسين', 'The total is the goal; choose based on competitors', 'max_strength'), ...pctCj() }),
        mobN('بين الحركتين: دفا، سوائل وكربوهيدرات سريعة', 'Between lifts: stay warm, fluids and fast carbs', { duration: '10min' })
      ]
    }
  }
};

/* ============ 6) سترونج مان — متوسط (12 أسبوع) ============ */
const T_SM_INT = {
  id: 'pt_strongman_int',
  sport: 'strongman',
  level: 'intermediate',
  title: t('سترونج مان — تجهيز لبطولة ١٢ أسبوع (متوسط)', 'Strongman — 12-week contest prep (intermediate)'),
  goal: t('بناء قوة أساسية (ديدليفت، ضغط، سكوات) وتحويلها لأداء في الأحداث: يوك، فارمرز، لوج، ديدليفت، حجارة/ساندباج، وميدلي تحت التعب، مع تهدئة لبطولة في آخر الدورة.', 'Build base strength (deadlift, press, squat) and convert it into event performance: yoke, farmers, log, deadlift, stones/sandbag and medleys under fatigue, with a taper into a contest at the end.'),
  components: ['max_strength', 'strength', 'power', 'anaerobic', 'core', 'technique'],
  sessionsPerWeek: 4,
  periods: [
    {
      type: 'gpp',
      goal: t('قاعدة قوة وتضخيم مع تعلم تكنيك الأحداث بأوزان ٦٠-٧٠٪ من أوزان البطولة.', 'Strength and hypertrophy base while learning event technique at 60-70% of contest weights.'),
      components: ['strength', 'hypertrophy', 'technique', 'core'],
      blocks: [
        {
          name: t('بلوك ١ — قاعدة القوة', 'Block 1 — Strength base'),
          goal: t('رفعات أساسية ٥×٥ و٤×٦ بنسب ٧٠-٨٠٪، أحداث خفيفة للتكنيك. الأسبوع الرابع تخفيف.', 'Base lifts 5x5 and 4x6 at 70-80%, light events for technique. Week 4 deload.'),
          components: ['strength', 'hypertrophy', 'technique'],
          loads: [5, 6, 7, 4],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['press1', '', 'dl1', '', 'sq1', 'events1', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('قوة قصوى وأحداث تقيلة: ٨٠-٩٠٪ في الرفعات، أحداث بأوزان ٨٥-١٠٠٪ من البطولة، وميدلي للتحمل اللاهوائي.', 'Max strength and heavy events: 80-90% on lifts, events at 85-100% of contest weight and medleys for anaerobic capacity.'),
      components: ['max_strength', 'anaerobic', 'technique'],
      blocks: [
        {
          name: t('بلوك ٢ — أحداث تقيلة', 'Block 2 — Heavy events'),
          goal: t('أحداث بأوزان البطولة لمسافات أقصر، ثم المسافة تطول. الأسبوع الرابع تخفيف.', 'Events at contest weight over shorter distances, then distance builds. Week 4 deload.'),
          components: ['max_strength', 'anaerobic', 'technique'],
          loads: [6, 7, 8, 4],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['press2', '', 'dl2', '', 'sq2', 'events2', '']
        }
      ]
    },
    {
      type: 'precomp',
      goal: t('محاكاة البطولة: أحداث بالترتيب والأوزان والوقت الرسمي.', 'Contest simulation: events in order at official weights and time limits.'),
      components: ['max_strength', 'anaerobic', 'mental'],
      blocks: [
        {
          name: t('بلوك ٣ — محاكاة', 'Block 3 — Simulation'),
          goal: t('أسبوع ٩ محاكاة جزئية، وأسبوع ١٠ محاكاة كاملة (آخر حمل تقيل). قيّم الأحداث الضعيفة واختار الاستراتيجية.', 'Week 9 partial simulation, week 10 full simulation (last heavy load). Assess weak events and set strategy.'),
          components: ['max_strength', 'anaerobic', 'mental'],
          loads: [8, 9],
          weekTypes: ['load', 'test'],
          pattern: ['press2', '', 'dl2', '', 'sim', '', '']
        }
      ]
    },
    {
      type: 'taper',
      goal: t('تهدئة: حجم قليل، سرعة وإحساس بالأدوات، والبطولة.', 'Taper: low volume, speed and implement feel, then contest.'),
      components: ['recovery', 'mental', 'technique'],
      blocks: [
        {
          name: t('أسبوع ١١ — تهدئة', 'Week 11 — Taper'),
          goal: t('أوزان ٦٠-٧٠٪ للإحساس بالأدوات، لا شيء لحد الفشل.', 'Loads at 60-70% for implement feel; nothing to failure.'),
          components: ['recovery', 'technique'],
          loads: [5],
          weekTypes: ['taper'],
          pattern: ['primer', '', 'events1', '', 'primer', '', '']
        },
        {
          name: t('أسبوع ١٢ — البطولة', 'Week 12 — Contest'),
          goal: t('تنشيط خفيف أول الأسبوع ثم البطولة.', 'Light primer early in the week then contest.'),
          components: ['mental', 'max_strength'],
          loads: [3],
          weekTypes: ['comp'],
          pattern: ['primer', '', '', '', 'contest', '', '']
        }
      ]
    }
  ],
  sessions: {
    press1: {
      title: t('ضغط — قاعدة (لوج + ضغط واقف)', 'Press — base (log + standing press)'),
      goal: t('تكنيك اللوج (كلين وضغط) وقوة الضغط فوق الرأس.', 'Log technique (clean and press) and overhead strength.'),
      components: ['strength', 'technique', 'hypertrophy'],
      rpe: 7, duration: 85,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        S(null, 5, '3', '65-75', '1rm', '2.5min', { name: t('لوج كلين أند برس', 'Log clean and press'), ...P('تكنيك لف اللوج على الصدر والدفع بالرجلين', 'Log roll to the chest and leg-driven press', 'technique'), ...N('كل عدة كلين جديد؛ النسبة من 1RM اللوج', 'Clean every rep; percentage of log 1RM') }),
        S('wg_overhead_press', 4, '6', '70-75', '1rm', '2min', P('قوة ضغط مجردة', 'Strict pressing strength', 'strength')),
        S('ex_close_grip_bench_press', 3, '8', '2', 'rir', '2min', P('ترايسبس للقفلة فوق الرأس', 'Triceps for overhead lockout', 'hypertrophy')),
        S('wg_barbell_row', 4, '8', '2', 'rir', '90s', P('ظهر علوي لثبات الرف (الراك)', 'Upper back for a solid rack position', 'hypertrophy')),
        S('ad_overhead_carry', 3, '1', '7', 'rpe', '90s', { distance: '20m', ...P('ثبات الكتف والجذع فوق الرأس', 'Overhead shoulder and trunk stability', 'core') }),
        coolUpper()[1]
      ]
    },
    dl1: {
      title: t('ديدليفت — قاعدة', 'Deadlift — base'),
      goal: t('قوة الديدليفت وقبضة وسلسلة خلفية.', 'Deadlift strength, grip and posterior chain.'),
      components: ['strength', 'hypertrophy'],
      rpe: 8, duration: 80,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_deadlift', '5-3-2', '٤٠٪ ×٥، ٦٠٪ ×٣، ٧٠٪ ×٢', '40% x5, 60% x3, 70% x2'),
        S('ex_deadlift', 5, '3', '72.5-80', '1rm', '3min', { ...P('قوة الديدليفت بقبضة مزدوجة الوش أو هوك، بدون ستراب في أول مجموعتين', 'Deadlift strength with mixed/hook grip, no straps for the first two sets', 'max_strength') }),
        S('ex_romanian_deadlift', 3, '8', '2', 'rir', '2min', { tempo: '3-0-1-0', ...P('خلفية وألوية', 'Hamstrings and glutes', 'hypertrophy') }),
        S('ex_farmers_carry', 4, '1', '7', 'rpe', '2min', { distance: '30m', ...P('قبضة ووضعية الحمل (٦٠-٧٠٪ من وزن البطولة)', 'Grip and carry posture (60-70% of contest weight)', 'technique') }),
        S('ek_hyperextensions', 3, '12', '2', 'rir', '60s', P('أسفل الظهر', 'Lower back', 'prevention')),
        coolLower()[1]
      ]
    },
    sq1: {
      title: t('سكوات + حمل أمامي', 'Squat + front carries'),
      goal: t('قوة السكوات والجذع لليوك والحجارة.', 'Squat and trunk strength for yoke and stones.'),
      components: ['strength', 'core'],
      rpe: 7, duration: 75,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_barbell_back_squat', '5-3-2', 'البار ×٥، ٥٥٪ ×٣، ٦٥٪ ×٢', 'Bar x5, 55% x3, 65% x2'),
        S('ex_barbell_back_squat', 5, '5', '70-77.5', '1rm', '3min', P('قوة الرجلين', 'Leg strength', 'strength')),
        S('ek_zecher_squats', 3, '6', '2', 'rir', '2min', P('وضعية الحمل الأمامي زي الساندباج والحجارة', 'Front-loaded position like sandbag and stones', 'strength')),
        S('ad_sandbag_bear_hug_carry', 3, '1', '7', 'rpe', '2min', { distance: '30m', ...P('حمل في الحضن وتحمل الجذع', 'Bear-hug carry and trunk endurance', 'core') }),
        S('ex_ab_wheel_rollout', 3, '10', '2', 'rir', '60s', P('بريسينج', 'Bracing', 'core')),
        coolLower()[0]
      ]
    },
    events1: {
      title: t('أحداث — تكنيك وميدلي خفيف', 'Events — technique and light medley'),
      goal: t('تعلم اليوك والفارمرز والساندباج بأوزان خفيفة، وتحمل لاهوائي.', 'Learn yoke, farmers and sandbag at light loads, plus anaerobic conditioning.'),
      components: ['technique', 'anaerobic', 'core'],
      rpe: 7, duration: 70,
      items: [
        genWU('ex_rowing_machine'), ...lowerPrep(),
        S(null, 5, '1', '6-7', 'rpe', '2min', { name: t('يوك ووك', 'Yoke walk'), distance: '20m', ...P('بداية سريعة وخطوات قصيرة سريعة وضهر ثابت', 'Fast start, short quick steps, braced spine', 'technique'), ...N('٦٠-٧٠٪ من وزن البطولة', '60-70% of contest weight') }),
        S('ex_farmers_carry', 4, '1', '7', 'rpe', '2min', { distance: '20m', ...P('التقاط سريع وسرعة في المشي', 'Fast pick and fast walking', 'technique') }),
        S(null, 4, '3', '7', 'rpe', '90s', { name: t('ساندباج للكتف', 'Sandbag to shoulder'), ...P('نمط الحجارة: لف الشنطة والدفع بالحوض', 'Stone pattern: lap the bag and drive with the hips', 'technique') }),
        { kind: 'wod', name: t('ميدلي خفيف ×٣: ٢٠م دفع زحافة + ٢٠م فارمرز + ٥ ساندباج للكتف، راحة ٣ دقايق', 'Light medley x3: 20 m sled push + 20 m farmers + 5 sandbag to shoulder, 3 min rest'), format: 'intervals', sets: 3, rest: '3min', ...P('تحمل لاهوائي والتنقل بين الأدوات', 'Anaerobic capacity and implement transitions', 'anaerobic') },
        coolFull()
      ]
    },
    press2: {
      title: t('ضغط — تقيل (لوج/أكسل)', 'Press — heavy (log/axle)'),
      goal: t('لوج تقيل للقوة القصوى وأكسل للتنويع.', 'Heavy log for max strength and axle for variety.'),
      components: ['max_strength', 'power'],
      rpe: 9, duration: 85,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        S(null, 1, '1', '8', 'rpe', '4min', { name: t('لوج — سنجل قمة', 'Log — top single'), ...P('التعود على الوزن التقيل', 'Heavy-load habituation', 'max_strength') }),
        S(null, 4, '2-3', '80-87.5', '1rm', '3min', { name: t('لوج كلين أند برس', 'Log clean and press'), ...P('قوة قصوى في الحدث', 'Event max strength', 'max_strength'), ...N('أسبوع ٥: ٤×٣ @ ٨٠٪، ٦: ٤×٣ @ ٨٢.٥٪، ٧: ٤×٢ @ ٨٧.٥٪', 'Wk5 4x3 @ 80%, wk6 4x3 @ 82.5%, wk7 4x2 @ 87.5%') }),
        S(null, 3, '3', '75', '1rm', '2.5min', { name: t('أكسل بوش برس', 'Axle push press'), ...P('قبضة سميكة وقوة الدرايف', 'Thick-bar grip and leg drive', 'power') }),
        S('wg_weighted_pull_up', 3, '6', '2', 'rir', '2min', P('ظهر', 'Back', 'strength')),
        S('ex_triceps_pushdown', 3, '12', '1', 'rir', '60s', P('ترايسبس', 'Triceps', 'hypertrophy')),
        coolUpper()[0]
      ]
    },
    dl2: {
      title: t('ديدليفت — تقيل + حجارة', 'Deadlift — heavy + stones'),
      goal: t('ديدليفت تقيل (أو من ارتفاع ٤٥ سم) وحجارة أطلس.', 'Heavy deadlift (or 18-inch pull) and atlas stones.'),
      components: ['max_strength', 'power'],
      rpe: 9, duration: 85,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_deadlift', '5-3-2-1', '٤٠٪ ×٥، ٦٠٪ ×٣، ٧٠٪ ×٢، ٨٠٪ ×١', '40% x5, 60% x3, 70% x2, 80% x1'),
        S('ex_deadlift', 4, '2-3', '82.5-90', '1rm', '3-4min', { ...P('قوة قصوى في الديدليفت', 'Deadlift max strength', 'max_strength'), ...N('بستراب زي البطولة', 'With straps as in contest') }),
        S('wg_rack_pull', 3, '3', '90-100', '1rm', '3min', { ...P('قفلة ديدليفت ١٨ إنش (٤٥ سم)', '18-inch (45 cm) deadlift lockout', 'max_strength'), ...N('النسبة من 1RM الديدليفت', 'Percentage of deadlift 1RM') }),
        S(null, 5, '1', '8', 'rpe', '90s', { name: t('حجر أطلس فوق البار (لود)', 'Atlas stone over bar / to platform'), ...P('لف الحجر وامتداد الحوض السريع', 'Lapping and fast hip extension', 'power'), ...N('ابدأ ٨٠٪ من وزن البطولة ووصل للوزن الكامل', 'Start at 80% of contest weight and build to full') }),
        S('ex_hanging_leg_raise', 3, '10', '2', 'rir', '60s', P('بطن', 'Abs', 'core')),
        coolLower()[1]
      ]
    },
    sq2: {
      title: t('سكوات تقيل + يوك', 'Heavy squat + yoke'),
      goal: t('قوة قصوى في السكوات ويوك تقيل لمسافات قصيرة.', 'Maximal squat strength and heavy short yoke runs.'),
      components: ['max_strength', 'core'],
      rpe: 8, duration: 80,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ek_squat_to_bench_with_barbell', '5-3-2', 'البار ×٥، ٥٥٪ ×٣، ٧٠٪ ×٢', 'Bar x5, 55% x3, 70% x2'),
        S('ek_squat_to_bench_with_barbell', 5, '3', '80-87.5', '1rm', '3min', { ...P('بوكس سكوات: قوة من الوقفة ووضع ضهر مستقيم', 'Box squat: strength from a pause and an upright back', 'max_strength'), ...N('النسبة من 1RM السكوات العادي', 'Percentage of free squat 1RM') }),
        S(null, 4, '1', '8', 'rpe', '3min', { name: t('يوك تقيل', 'Heavy yoke'), distance: '15m', ...P('وزن البطولة أو أعلى بـ ٥-١٠٪ لمسافة أقصر', 'Contest weight or 5-10% heavier over a shorter distance', 'max_strength') }),
        S('ad_suitcase_hold', 3, '30s/side', '8', 'rpe', '60s', P('مقاومة الميل الجانبي والقبضة', 'Anti-lateral flexion and grip', 'core')),
        coolLower()[0]
      ]
    },
    events2: {
      title: t('أحداث — تقيل وميدلي', 'Events — heavy and medley'),
      goal: t('فارمرز بوزن البطولة وميدلي تحت التعب.', 'Contest-weight farmers and medleys under fatigue.'),
      components: ['anaerobic', 'technique', 'max_strength'],
      rpe: 9, duration: 75,
      items: [
        genWU('ex_rowing_machine'), ...lowerPrep(),
        S('ex_farmers_carry', 4, '1', '9', 'rpe', '3min', { distance: '20-30m', ...P('فارمرز بوزن البطولة؛ الهدف ما تنزلش الأوزان', 'Contest-weight farmers; aim for no drops', 'max_strength') }),
        S(null, 4, '1', '8', 'rpe', '2.5min', { name: t('ساندباج كاري + تحميل على رف', 'Sandbag carry + load to platform'), distance: '15m', ...P('نقل تحت التعب', 'Loading under fatigue', 'anaerobic') }),
        { kind: 'wod', name: t('ميدلي ×٣: ٢٠م يوك + ٢٠م فارمرز + ٢٠م جر إطار/زحافة، أسرع وقت، راحة ٤ دقايق', 'Medley x3: 20 m yoke + 20 m farmers + 20 m tyre/sled drag, for time, 4 min rest'), format: 'fortime', sets: 3, rest: '4min', ...P('التحمل اللاهوائي والتنقل السريع بين الأدوات', 'Anaerobic capacity and fast implement transitions', 'anaerobic') },
        coolFull()
      ]
    },
    sim: {
      title: t('محاكاة البطولة', 'Contest simulation'),
      goal: t('الأحداث بالترتيب والأوزان والوقت الرسمي (٦٠-٧٥ ث للحدث).', 'Events in contest order at official weights and time caps (60-75 s per event).'),
      components: ['max_strength', 'anaerobic', 'mental'],
      rpe: 10, duration: 120,
      items: [
        genWU('ex_rowing_machine'), ...lowerPrep(),
        S(null, 1, 'max', '10', 'rpe', '10min', { name: t('لوج لأقصى عدات في ٦٠ ث', 'Log for max reps in 60 s'), ...P('حدث الضغط', 'Pressing event', 'max_strength') }),
        S(null, 1, '1', '10', 'rpe', '10min', { name: t('يوك ٢٠م على الوقت', 'Yoke 20 m for time'), distance: '20m', ...P('حدث الحمل', 'Carry event', 'max_strength') }),
        S('ex_deadlift', 1, 'max', '10', 'rpe', '10min', { ...P('ديدليفت لأقصى عدات في ٦٠ ث', 'Deadlift for max reps in 60 s', 'max_strength') }),
        S(null, 1, '5', '10', 'rpe', '10min', { name: t('حجارة أطلس ٥ حجارة على الوقت', 'Atlas stones: 5-stone series for time'), ...P('الحدث الأخير', 'Final event', 'anaerobic') }),
        coolFull()
      ]
    },
    primer: {
      title: t('تنشيط خفيف', 'Light primer'),
      goal: t('إحساس بالأدوات وسرعة بدون تعب.', 'Implement feel and speed without fatigue.'),
      components: ['technique', 'recovery'],
      rpe: 5, duration: 50,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        S(null, 4, '2', '65-70', '1rm', '2min', { name: t('لوج كلين أند برس', 'Log clean and press'), ...P('إحساس', 'Feel', 'technique') }),
        S('ex_deadlift', 3, '2', '65-70', '1rm', '2min', P('سرعة', 'Speed', 'technique')),
        S('ex_farmers_carry', 2, '1', '6', 'rpe', '2min', { distance: '20m', ...P('قبضة وإيقاع', 'Grip and rhythm', 'technique') }),
        coolFull()
      ]
    },
    contest: {
      title: t('يوم البطولة', 'Contest day'),
      goal: t('أداء كل حدث حسب الاستراتيجية: عدات، وقت، وأدوات.', 'Execute each event to plan: reps, times and implements.'),
      components: ['max_strength', 'mental', 'anaerobic'],
      rpe: 10, duration: 240,
      items: [
        wuN('تسخين لكل حدث: ٢-٣ تسخينات على الأداة نفسها (٥٠-٧٠-٨٥٪)', 'Warm up each event with 2-3 sets on the implement (50-70-85%)', { sets: 3, reps: '1-2' }),
        { kind: 'drill', name: t('الأحداث حسب جدول البطولة', 'Events per contest schedule'), sets: 5, reps: '1', ...P('استراتيجية: ابدأ بسرعة في أحداث الوقت، وخطط للعدات في أحداث الـ ٦٠ ث', 'Strategy: start fast on timed events, pace reps on 60 s events', 'mental') },
        mobN('بين الأحداث: أكل خفيف وسوائل ودفا', 'Between events: light food, fluids and stay warm', { duration: '10min' })
      ]
    }
  }
};

/* ============ 7) كاليسثنكس — متوسط: مهارات وقوة (12 أسبوع) ============ */
const caliWU = () => [
  wu('ex_jump_rope', { duration: '3min' }),
  wu('ex_arm_circles', { sets: 1, reps: '10 each way' }),
  wu('wg_scapular_pull_up', { sets: 2, reps: '8', note: t('تحكم في لوح الكتف قبل العقلة', 'Scapular control before pulling') }),
  wuN('تسخين الرسغ: دوائر، ضغط على الكفوف وضهر الكف', 'Wrist prep: circles, palm and back-of-hand rocks', { sets: 1, duration: '2min' })
];

const T_CALI_INT = {
  id: 'pt_calisthenics_int',
  sport: 'calisthenics',
  level: 'intermediate',
  title: t('كاليسثنكس — مهارات وقوة ١٢ أسبوع (متوسط)', 'Calisthenics — 12-week skills and strength (intermediate)'),
  goal: t('الوصول لأول مسل أب نضيف على البار، ٢٠+ عقلة و٣٠+ متوازي، وقوف على اليدين ٣٠ ث على الحيطة وضغط كتف بالمقلوب جزئي، بتدرج من القوة الأساسية للقوة بوزن ثم التعبير عن المهارة.', 'Achieve a first clean bar muscle-up, 20+ pull-ups and 30+ dips, a 30 s wall handstand and partial handstand push-ups, progressing from base strength to weighted strength to skill expression.'),
  components: ['strength', 'max_strength', 'muscular_endurance', 'technique', 'balance', 'core', 'mobility'],
  sessionsPerWeek: 4,
  periods: [
    {
      type: 'gpp',
      goal: t('اختبار البداية ثم بناء القوة الأساسية بحجم عالي ومهارة يومية بسيطة.', 'Baseline testing, then base strength with high volume and simple daily skill practice.'),
      components: ['strength', 'muscular_endurance', 'technique'],
      blocks: [
        {
          name: t('أسبوع ١ — اختبار البداية', 'Week 1 — Baseline test'),
          goal: t('أقصى عقلة، متوازي، ضغط، مسك هولو وإل سيت ووقوف على الحيطة — عشان نحدد الحجم.', 'Max pull-ups, dips, push-ups, hollow and L-sit holds and wall handstand — to set training volume.'),
          components: ['strength', 'muscular_endurance'],
          loads: [4],
          weekTypes: ['test'],
          pattern: ['test', '', 'skill', '', 'legs1', '', '']
        },
        {
          name: t('بلوك ١ — قوة أساسية', 'Block 1 — Base strength'),
          goal: t('حجم العقلة والمتوازي ٥٠-٧٠٪ من أقصى عدد في المجموعة، مع زيادة مجموعة كل أسبوع. الأسبوع الخامس تخفيف.', 'Pull-up and dip sets at 50-70% of max reps, adding a set each week. Week 5 deload.'),
          components: ['strength', 'muscular_endurance', 'technique'],
          loads: [5, 6, 7, 3],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['pull1', 'push1', '', 'legs1', 'skill', '', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('قوة بوزن إضافي وتدرجات المسل أب والضغط بالمقلوب.', 'Weighted strength and muscle-up and handstand push-up progressions.'),
      components: ['max_strength', 'technique', 'power'],
      blocks: [
        {
          name: t('بلوك ٢ — قوة بوزن وتدرجات المهارة', 'Block 2 — Weighted strength and skill progressions'),
          goal: t('عقلة ومتوازي بوزن (٣-٥ عدات RIR 2)، عقلة للصدر انفجارية، ترانزيشن المسل أب، ونزول بطيء للضغط بالمقلوب. الأسبوع الرابع تخفيف.', 'Weighted pull-ups and dips (3-5 reps at RIR 2), explosive chest-to-bar, muscle-up transitions and slow handstand push-up negatives. Week 4 deload.'),
          components: ['max_strength', 'power', 'technique'],
          loads: [6, 7, 8, 4],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['pull2', 'push2', '', 'legs2', 'skill', '', '']
        }
      ]
    },
    {
      type: 'realization',
      goal: t('التعبير عن المهارة: محاولات مسل أب كاملة وقوف أطول وإعادة الاختبار.', 'Skill expression: full muscle-up attempts, longer holds and retesting.'),
      components: ['technique', 'max_strength', 'balance'],
      blocks: [
        {
          name: t('بلوك ٣ — تعبير عن المهارة', 'Block 3 — Skill expression'),
          goal: t('محاولات مسل أب كاملة وهو فريش (أول الجلسة)، وحجم أقل بشدة أعلى. أسبوع ١١ أخف للاختبار.', 'Full muscle-up attempts while fresh (start of session), lower volume at higher intensity. Week 11 lighter before testing.'),
          components: ['technique', 'max_strength'],
          loads: [8, 6],
          weekTypes: ['load', 'taper'],
          pattern: ['pull2', 'push2', '', 'skill', 'legs2', '', '']
        },
        {
          name: t('أسبوع ١٢ — إعادة الاختبار', 'Week 12 — Retest'),
          goal: t('نفس اختبارات أسبوع ١ + محاولة مسل أب.', 'Same tests as week 1 + muscle-up attempt.'),
          components: ['strength', 'technique'],
          loads: [4],
          weekTypes: ['test'],
          pattern: ['skill', '', '', 'test', '', '', '']
        }
      ]
    }
  ],
  sessions: {
    test: {
      title: t('اختبارات كاليسثنكس', 'Calisthenics testing'),
      goal: t('قياس القوة والتحمل والمهارة لتحديد الحجم ومتابعة التقدم.', 'Measure strength, endurance and skill to set volume and track progress.'),
      components: ['strength', 'muscular_endurance', 'technique'],
      rpe: 9, duration: 70,
      items: [
        ...caliWU(),
        S('ad_max_pull_up_test', 1, 'max', '0', 'rir', '5min', P('أقصى عقلة كاملة (من فرد كامل لذقن فوق البار)', 'Max strict pull-ups (dead hang to chin over bar)', 'muscular_endurance')),
        S('wg_dip', 1, 'max', '0', 'rir', '5min', P('أقصى متوازي (كتف تحت الكوع)', 'Max dips (shoulder below elbow)', 'muscular_endurance')),
        S('ex_pushup', 1, 'max', '0', 'rir', '4min', P('أقصى ضغط بجسم مستقيم', 'Max push-ups with a rigid body line', 'muscular_endurance')),
        { kind: 'timed', libId: 'wg_l_sit_hold', sets: 1, duration: 'max', rest: '3min', ...P('أقصى زمن إل سيت (أو تاك)', 'Max L-sit (or tuck) hold', 'core') },
        { kind: 'timed', name: t('وقوف على اليدين — الصدر للحيطة', 'Chest-to-wall handstand hold'), sets: 1, duration: 'max', rest: '3min', ...P('تحمل وخط الجسم في الوقوف', 'Handstand endurance and line', 'balance') },
        { kind: 'drill', name: t('محاولة مسل أب (أو أقصى عقلة للصدر)', 'Muscle-up attempt (or max chest-to-bar)'), sets: 3, reps: '1', ...P('مستوى المهارة الحالي', 'Current skill level', 'technique') },
        coolUpper()[0]
      ]
    },
    pull1: {
      title: t('سحب — قوة أساسية', 'Pull — base strength'),
      goal: t('حجم عقلة وتجديف ومسك هولو.', 'Pull-up and row volume with hollow holds.'),
      components: ['strength', 'muscular_endurance', 'core'],
      rpe: 7, duration: 60,
      items: [
        ...caliWU(),
        S('ex_pullup', 5, '5-8', '2-3', 'rir', '2min', { tempo: '2-1-1-0', ...P('حجم العقلة (٥٠-٧٠٪ من أقصى عدد)', 'Pull-up volume (50-70% of max reps)', 'strength') }),
        S('ex_chinup', 3, '6-8', '2', 'rir', '2min', P('بايسبس ولاتس بقبضة معكوسة', 'Biceps and lats with a supinated grip', 'strength')),
        S('ek_body_row', 3, '10-12', '2', 'rir', '90s', { tempo: '2-1-1-0', ...P('ظهر أفقي — رجلين مرفوعة لو سهل', 'Horizontal pulling — elevate feet when easy', 'hypertrophy') }),
        S('wg_negative_pull_up', 3, '3', '2', 'rir', '2min', { tempo: '5-0-1-0', ...P('نزول ٥ ثواني للقوة الإكسنترك', '5-second eccentrics for strength', 'strength') }),
        { kind: 'timed', libId: 'ex_hollow_body_hold', sets: 4, duration: '20-30s', rest: '60s', ...P('خط الجسم الأساسي للمسل أب والوقوف', 'Base body line for muscle-ups and handstands', 'core') },
        coolUpper()[1]
      ]
    },
    push1: {
      title: t('دفع — قوة أساسية', 'Push — base strength'),
      goal: t('حجم متوازي وضغط وبايك للأكتاف.', 'Dip, push-up and pike-push volume for shoulders.'),
      components: ['strength', 'muscular_endurance'],
      rpe: 7, duration: 60,
      items: [
        ...caliWU(),
        S('wg_dip', 5, '6-10', '2-3', 'rir', '2min', { tempo: '2-0-1-0', ...P('حجم المتوازي — أساس الجزء التاني من المسل أب', 'Dip volume — the base for the second half of the muscle-up', 'strength') }),
        S('wg_pike_push_up', 4, '6-10', '2', 'rir', '2min', { tempo: '3-0-1-0', ...P('قوة الكتف في وضع رأسي', 'Vertical shoulder strength', 'strength') }),
        S('wg_archer_push_up', 3, '5/side', '2', 'rir', '90s', P('قوة دفع أحادية', 'Unilateral pushing strength', 'strength')),
        S('wg_scapular_push_up', 2, '12', '3', 'rir', '60s', P('السيراتس وثبات الكتف', 'Serratus and shoulder stability', 'prevention')),
        { kind: 'timed', libId: 'wg_l_sit_hold', sets: 4, duration: '10-20s', rest: '60s', ...P('ضغط الكتف لتحت وقوة الجذع', 'Shoulder depression and compression strength', 'core'), ...N('تاك إل سيت لو الكامل صعب', 'Tuck L-sit if full is too hard') },
        coolUpper()[0]
      ]
    },
    legs1: {
      title: t('رجلين وجذع', 'Legs and trunk'),
      goal: t('قوة رجل واحدة وخلفية وجذع.', 'Single-leg, hamstring and trunk strength.'),
      components: ['strength', 'balance', 'core'],
      rpe: 7, duration: 55,
      items: [
        genWU('ex_jump_rope'), ...lowerPrep(),
        S('ex_bulgarian_split_squat', 4, '8-10/leg', '2', 'rir', '90s', { tempo: '3-0-1-0', ...P('قوة رجل واحدة', 'Single-leg strength', 'strength') }),
        S('wg_assisted_pistol_squat', 3, '5/leg', '2', 'rir', '90s', P('تدرج البيستول', 'Pistol progression', 'balance')),
        S('ex_nordic_hamstring_curl', 3, '4-6', '2', 'rir', '2min', { tempo: '4-0-1-0', ...P('الخلفية ووقاية الإصابات', 'Hamstrings and injury prevention', 'prevention') }),
        S('wg_cossack_squat', 2, '6/side', '3', 'rir', '60s', P('مرونة الحوض الجانبية', 'Lateral hip mobility', 'mobility')),
        S('ex_hanging_leg_raise', 3, '8-12', '2', 'rir', '60s', P('قوة الضغط (كومبريشن)', 'Compression strength', 'core')),
        ...coolLower()
      ]
    },
    skill: {
      title: t('مهارة — وقوف على اليدين وجذع', 'Skill — handstand and trunk'),
      goal: t('وقت جودة على الوقوف على اليدين والتوازن.', 'Quality handstand time and balance.'),
      components: ['technique', 'balance', 'core', 'mobility'],
      rpe: 5, duration: 45,
      items: [
        ...caliWU(),
        { kind: 'timed', libId: 'wg_wall_walk', sets: 4, duration: '20-40s', rest: '90s', ...P('وقوف الصدر للحيطة وخط جسم مستقيم', 'Chest-to-wall line and stacking', 'balance') },
        { kind: 'drill', name: t('طلوع بالرجل (كيك أب) للوقوف الحر بجانب الحيطة', 'Kick-ups to freestanding handstand near a wall'), sets: 10, reps: '1', ...P('التوازن بالصوابع والكفوف', 'Balance with fingers and palms', 'balance'), ...N('١٠ دقايق مجموع، راحة لحد ما تحس إنك فريش', '10 min total, rest until fresh') },
        { kind: 'timed', libId: 'wg_hollow_rock', sets: 3, duration: '20s', rest: '60s', ...P('خط الجسم الديناميكي', 'Dynamic hollow line', 'core') },
        mob('ad_foam_roller_thoracic_extension', { duration: '2min' }),
        mob('wg_cat_cow_stretch', { duration: '1min' })
      ]
    },
    pull2: {
      title: t('سحب — بوزن ومسل أب', 'Pull — weighted and muscle-up'),
      goal: t('عقلة بوزن وعقلة للصدر انفجارية وترانزيشن المسل أب.', 'Weighted pull-ups, explosive chest-to-bar and muscle-up transitions.'),
      components: ['max_strength', 'power', 'technique'],
      rpe: 8, duration: 70,
      items: [
        ...caliWU(),
        { kind: 'drill', name: t('ترانزيشن المسل أب على بار واطي أو بأستك', 'Muscle-up transition on a low bar or with a band'), sets: 5, reps: '3', ...P('تعلم لف الكوع فوق البار (أهم جزء في المسل أب)', 'Learn the wrist/elbow turnover over the bar (the crux of the muscle-up)', 'technique'), ...N('في بلوك ٣: ابدأ بـ ٥ محاولات مسل أب كاملة قبل الترانزيشن', 'In block 3: start with 5 full muscle-up attempts before transitions') },
        S(null, 5, '3', '1-2', 'rir', '2min', { name: t('عقلة انفجارية للصدر (Chest-to-bar)', 'Explosive chest-to-bar pull-up'), tempo: '2-0-X-0', ...P('ارتفاع السحب اللازم للمسل أب', 'Pull height needed for the muscle-up', 'power') }),
        S('wg_weighted_pull_up', 4, '3-5', '2', 'rir', '2.5min', { ...P('قوة قصوى في السحب', 'Maximal pulling strength', 'max_strength'), ...N('ابدأ بـ ٥-١٠٪ من وزن الجسم', 'Start with 5-10% of bodyweight') }),
        S('ek_body_row', 3, '8-10', '1-2', 'rir', '90s', { tempo: '2-2-1-0', ...P('تجديف بوقفة فوق', 'Rows with a top pause', 'hypertrophy') }),
        S('dr_toes_to_bar', 3, '6-10', '2', 'rir', '90s', P('قوة الجذع على البار وضبط الأرجحة', 'Bar core strength and swing control', 'core')),
        coolUpper()[1]
      ]
    },
    push2: {
      title: t('دفع — بوزن وضغط بالمقلوب', 'Push — weighted and handstand push-up'),
      goal: t('متوازي بوزن، نزول بطيء للضغط بالمقلوب، ومتوازي على البار.', 'Weighted dips, slow handstand push-up negatives and straight-bar dips.'),
      components: ['max_strength', 'strength', 'technique'],
      rpe: 8, duration: 70,
      items: [
        ...caliWU(),
        S('wg_weighted_dip', 4, '3-5', '2', 'rir', '2.5min', { ...P('قوة قصوى في الدفع', 'Maximal pushing strength', 'max_strength') }),
        S('wg_wall_handstand_push_up', 4, '2-4', '2', 'rir', '2.5min', { tempo: '5-0-1-0', ...P('نزول ٥ ثواني والطلوع بمساعدة أو جزئي', '5-second descents, assisted or partial ascents', 'strength') }),
        S(null, 3, '5-8', '2', 'rir', '2min', { name: t('متوازي على البار المستقيم', 'Straight-bar dip'), ...P('الجزء التاني من المسل أب', 'The second half of the muscle-up', 'technique') }),
        S('wg_feet_elevated_pike_push_up', 3, '6-8', '2', 'rir', '90s', P('حجم للكتف', 'Shoulder volume', 'hypertrophy')),
        { kind: 'timed', libId: 'wg_l_sit_hold', sets: 4, duration: '15-25s', rest: '60s', ...P('إل سيت أطول', 'Longer L-sit', 'core') },
        coolUpper()[0]
      ]
    },
    legs2: {
      title: t('رجلين — قوة وانفجار', 'Legs — strength and power'),
      goal: t('بيستول، قفز، وخلفية.', 'Pistols, jumps and hamstrings.'),
      components: ['strength', 'power', 'balance'],
      rpe: 7, duration: 55,
      items: [
        genWU('ex_jump_rope'), ...lowerPrep(),
        S('dr_pistol_squat', 4, '3-5/leg', '2', 'rir', '2min', { tempo: '3-0-1-0', ...P('قوة وتوازن رجل واحدة', 'Single-leg strength and balance', 'balance') }),
        S('wg_jump_squat', 4, '5', '3', 'rir', '90s', P('انفجار — أقصى ارتفاع وهبوط هادي', 'Power — max height, soft landing', 'power')),
        S('ex_nordic_hamstring_curl', 3, '5-6', '2', 'rir', '2min', { tempo: '4-0-1-0', ...P('خلفية', 'Hamstrings', 'prevention') }),
        S('ex_single_leg_rdl', 3, '8/leg', '2', 'rir', '60s', P('توازن وسلسلة خلفية', 'Balance and posterior chain', 'balance')),
        ...coolLower()
      ]
    }
  }
};

/* ============ 8) لياقة عامة — مبتدئ: قوة كاملة الجسم وصحة (12 أسبوع) ============ */
const fullWU = () => [
  genWU(),
  wu('wg_worlds_greatest_stretch', { sets: 1, reps: '4/side' }),
  wu('ex_glute_bridge', { sets: 1, reps: '12' }),
  wu('ex_band_pull_apart', { sets: 1, reps: '15' })
];

const T_GEN_STR_BEG = {
  id: 'pt_general_strength_beg',
  sport: 'general',
  level: 'beginner',
  title: t('قوة وصحة للمبتدئين — كامل الجسم ٣ مرات أسبوعيًا (١٢ أسبوع)', 'Beginner strength and health — full body 3x/week (12 weeks)'),
  goal: t('تعلم الأنماط الحركية الأساسية (سكوات، مفصل الحوض، دفع، سحب، حمل، ثبات جذع) بأمان، وزيادة القوة ٣٠-٥٠٪ وتحسين اللياقة والصحة العامة.', 'Learn the fundamental movement patterns (squat, hinge, push, pull, carry, trunk stability) safely, increase strength by 30-50% and improve general fitness and health.'),
  components: ['strength', 'technique', 'core', 'mobility', 'aerobic'],
  sessionsPerWeek: 3,
  periods: [
    {
      type: 'gpp',
      goal: t('تعلم الحركات بأوزان خفيفة ودمبل وكيتل بيل، وتقوية الأوتار والمفاصل.', 'Learn the movements with light dumbbells and kettlebells, strengthen tendons and joints.'),
      components: ['technique', 'strength', 'mobility'],
      blocks: [
        {
          name: t('أسبوع ١ — تقييم وتعلم', 'Week 1 — Assessment and learning'),
          goal: t('اختبارات بسيطة لتحديد أوزان البداية، وتعلم الحركات من غير ضغط.', 'Simple tests to set starting loads and learn the movements without pressure.'),
          components: ['technique', 'strength'],
          loads: [3],
          weekTypes: ['test'],
          pattern: ['test', '', 'fbA', '', 'fbB', '', '']
        },
        {
          name: t('بلوك ١ — أساسيات الحركة', 'Block 1 — Movement foundations'),
          goal: t('٢-٣ مجموعات × ١٠-١٢ عدة على RIR 3. لما تكمل كل العدات بسهولة زود ٢ كجم. الأسبوع الخامس أخف (مجموعتين بس).', '2-3 sets x 10-12 reps at RIR 3. When all reps are easy, add 2 kg. Week 5 lighter (two sets only).'),
          components: ['technique', 'strength', 'core'],
          loads: [4, 5, 6, 3],
          weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['fbA', '', 'fbB', '', 'fbC', '', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('إدخال البار والتراب بار، وعدات ٦-٨ لبناء القوة.', 'Introduce the barbell and trap bar, 6-8 reps to build strength.'),
      components: ['strength', 'technique', 'core'],
      blocks: [
        {
          name: t('بلوك ٢ — بناء القوة', 'Block 2 — Building strength'),
          goal: t('٣-٤ مجموعات × ٦-٨ على RIR 2؛ تدرج مزدوج: وصل لـ ٨ عدات في كل المجموعات ثم زود الوزن ورجع لـ ٦. الأسبوع التاسع تخفيف.', '3-4 sets x 6-8 at RIR 2; double progression: reach 8 reps on all sets, then add load and return to 6. Week 9 deload.'),
          components: ['strength', 'technique'],
          loads: [5, 6, 7, 3],
          weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['fbA2', '', 'fbB2', '', 'fbC2', '', '']
        }
      ]
    },
    {
      type: 'realization',
      goal: t('أسبوعين بأوزان أعلى (٥-٦ عدات) ثم إعادة الاختبار.', 'Two weeks at higher loads (5-6 reps) then retest.'),
      components: ['strength', 'core'],
      blocks: [
        {
          name: t('بلوك ٣ — تثبيت القوة', 'Block 3 — Consolidating strength'),
          goal: t('نفس جلسات البلوك ٢ بعدات ٥-٦ على RIR 2 في الحركات الأساسية.', 'Same block 2 sessions with 5-6 reps at RIR 2 on the main lifts.'),
          components: ['strength'],
          loads: [7, 5],
          weekTypes: ['load', 'taper'],
          pattern: ['fbA2', '', 'fbB2', '', 'fbC2', '', '']
        },
        {
          name: t('أسبوع ١٢ — إعادة التقييم', 'Week 12 — Reassessment'),
          goal: t('نفس اختبارات أسبوع ١ وقارن النتايج، ثم خطط للمرحلة الجاية.', 'Repeat the week 1 tests, compare results and plan the next phase.'),
          components: ['strength', 'muscular_endurance'],
          loads: [4],
          weekTypes: ['test'],
          pattern: ['fbA', '', '', 'test', '', '', '']
        }
      ]
    }
  ],
  sessions: {
    test: {
      title: t('تقييم القوة واللياقة', 'Strength and fitness assessment'),
      goal: t('تحديد نقطة البداية بأمان (من غير أقصى وزن لعدة واحدة).', 'Establish a safe baseline (no true 1-rep max).'),
      components: ['strength', 'muscular_endurance', 'core'],
      rpe: 7, duration: 60,
      items: [
        ...fullWU(),
        S('ex_goblet_squat', 1, '10', '2', 'rir', '3min', P('أتقل دمبل تعمل بيه ١٠ عدات نضيفة وفاضل عدتين', 'Heaviest dumbbell for 10 clean reps with 2 in reserve', 'strength')),
        S('wg_kettlebell_romanian_deadlift', 1, '10', '2', 'rir', '3min', P('نفس الطريقة لمفصل الحوض', 'Same method for the hip hinge', 'strength')),
        S('ex_pushup', 1, 'max', '1', 'rir', '3min', { ...P('أقصى ضغط بجسم مستقيم (على الركب أو مائل لو لازم)', 'Max push-ups with a rigid line (kneeling or incline if needed)', 'muscular_endurance') }),
        S('ex_one_arm_dumbbell_row', 1, '10/side', '2', 'rir', '2min', P('قوة السحب', 'Pulling strength', 'strength')),
        S('ad_plank_endurance_test', 1, 'max', '0', 'rir', '2min', P('تحمل الجذع', 'Trunk endurance', 'core')),
        { kind: 'drill', name: t('قياسات: الوزن، محيط الوسط، ضغط الدم والنبض وقت الراحة', 'Measurements: weight, waist girth, resting blood pressure and heart rate'), sets: 1, reps: '1', ...P('متابعة مؤشرات الصحة', 'Track health markers', 'recovery') },
        coolFull()
      ]
    },
    fbA: {
      title: t('جسم كامل أ — سكوات ودفع أفقي', 'Full body A — squat and horizontal push'),
      goal: t('تعلم السكوات والضغط والتجديف.', 'Learn the squat, press and row.'),
      components: ['strength', 'technique', 'core'],
      rpe: 6, duration: 55,
      items: [
        ...fullWU(),
        S('ex_goblet_squat', 3, '10-12', '3', 'rir', '90s', { tempo: '3-1-1-0', ...P('نمط السكوات: ضهر مستقيم وركب مع الصوابع', 'Squat pattern: tall chest, knees track toes', 'technique') }),
        S('ex_dumbbell_bench_press', 3, '10-12', '3', 'rir', '90s', { tempo: '2-1-1-0', ...P('دفع أفقي للصدر والترايسبس', 'Horizontal push for chest and triceps', 'strength') }),
        S('ex_seated_cable_row', 3, '10-12', '3', 'rir', '90s', { tempo: '2-1-1-0', ...P('سحب أفقي وقوام مستقيم', 'Horizontal pull and posture', 'strength') }),
        S('ex_dead_bug', 2, '8/side', '3', 'rir', '60s', P('ثبات أسفل الظهر مع حركة الأطراف', 'Lower-back control while limbs move', 'core')),
        coolFull()
      ]
    },
    fbB: {
      title: t('جسم كامل ب — مفصل الحوض ودفع رأسي', 'Full body B — hinge and vertical push'),
      goal: t('تعلم مفصل الحوض والضغط فوق الرأس والسحب الرأسي.', 'Learn the hinge, overhead press and vertical pull.'),
      components: ['strength', 'technique', 'core'],
      rpe: 6, duration: 55,
      items: [
        ...fullWU(),
        S('wg_kettlebell_romanian_deadlift', 3, '10-12', '3', 'rir', '90s', { tempo: '3-0-1-0', ...P('مفصل الحوض: الحوض لورا والضهر محايد', 'Hip hinge: hips back, neutral spine', 'technique') }),
        S('ex_dumbbell_shoulder_press', 3, '10-12', '3', 'rir', '90s', P('قوة الكتف', 'Shoulder strength', 'strength')),
        S('ex_lat_pulldown', 3, '10-12', '3', 'rir', '90s', { tempo: '2-1-1-0', ...P('سحب رأسي', 'Vertical pull', 'strength') }),
        S('ex_farmers_carry', 3, '1', '6', 'rpe', '90s', { distance: '30m', ...P('قبضة وثبات الجذع أثناء المشي', 'Grip and trunk stability while walking', 'core') }),
        coolFull()
      ]
    },
    fbC: {
      title: t('جسم كامل ج — رجل واحدة وجذع', 'Full body C — single leg and trunk'),
      goal: t('توازن وقوة رجل واحدة، ضغط، وثبات جذع.', 'Single-leg balance and strength, pressing and trunk stability.'),
      components: ['strength', 'balance', 'core'],
      rpe: 6, duration: 55,
      items: [
        ...fullWU(),
        S('ex_step_up', 3, '8-10/leg', '3', 'rir', '90s', P('قوة رجل واحدة وتوازن', 'Single-leg strength and balance', 'balance')),
        S('wg_incline_push_up', 3, '8-12', '2', 'rir', '90s', P('ضغط بتدرج (انزل الارتفاع كل ما تقوى)', 'Scalable push-up (lower the height as you get stronger)', 'strength')),
        S('ex_glute_bridge', 3, '12-15', '2', 'rir', '60s', { tempo: '1-0-1-2', ...P('ألوية', 'Glutes', 'strength') }),
        S('wg_pallof_press', 2, '10/side', '3', 'rir', '60s', P('مقاومة الدوران', 'Anti-rotation', 'core')),
        { kind: 'timed', libId: 'ad_brisk_walk', sets: 1, duration: '15min', intensity: 'Z2', basis: 'hr', ...P('هوائي خفيف بعد الحديد لصحة القلب', 'Easy aerobic finisher for heart health', 'aerobic') },
        coolFull()
      ]
    },
    fbA2: {
      title: t('جسم كامل أ٢ — سكوات بالبار وبنش', 'Full body A2 — barbell squat and bench'),
      goal: t('قوة السكوات والبنش بالبار.', 'Barbell squat and bench strength.'),
      components: ['strength', 'core'],
      rpe: 7, duration: 60,
      items: [
        ...fullWU(),
        ramp('ex_barbell_back_squat', '8-5', 'البار ×٨، ٦٠٪ من وزن العمل ×٥', 'Bar x8, 60% of work weight x5'),
        S('ex_barbell_back_squat', 4, '6-8', '2', 'rir', '2.5min', { tempo: '3-0-1-0', ...P('السكوات بالبار — أهم تمرين للرجلين والعظام', 'Barbell squat — the key lower-body and bone-loading exercise', 'strength'), ...N('في بلوك ٣: ٤×٥-٦', 'Block 3: 4x5-6') }),
        S('ex_barbell_bench_press', 3, '6-8', '2', 'rir', '2.5min', { tempo: '2-1-1-0', ...P('قوة الدفع', 'Pressing strength', 'strength') }),
        S('ex_one_arm_dumbbell_row', 3, '8-10/side', '2', 'rir', '90s', P('ظهر', 'Back', 'strength')),
        S('ex_side_plank', 2, '30s/side', '3', 'rir', '45s', P('جذع جانبي', 'Lateral trunk', 'core')),
        coolFull()
      ]
    },
    fbB2: {
      title: t('جسم كامل ب٢ — تراب بار وضغط واقف', 'Full body B2 — trap bar and standing press'),
      goal: t('قوة الرفع من الأرض والضغط الواقف.', 'Lifting-from-the-floor and standing press strength.'),
      components: ['strength', 'core'],
      rpe: 7, duration: 60,
      items: [
        ...fullWU(),
        ramp('wg_trap_bar_deadlift', '8-5', '٥٠٪ ×٨، ٧٠٪ ×٥ من وزن العمل', '50% x8, 70% x5 of work weight'),
        S('wg_trap_bar_deadlift', 4, '5-6', '2', 'rir', '2.5min', P('أأمن طريقة لتعلم الرفع التقيل من الأرض', 'The safest way to learn heavy lifting from the floor', 'strength')),
        S('wg_overhead_press', 3, '6-8', '2', 'rir', '2min', P('ضغط واقف بالبار (أو دمبل)', 'Standing barbell (or dumbbell) press', 'strength')),
        S('ex_lat_pulldown', 3, '8-10', '2', 'rir', '90s', P('سحب رأسي', 'Vertical pull', 'strength')),
        S('ex_farmers_carry', 3, '1', '7', 'rpe', '90s', { distance: '30m', ...P('قبضة وجذع', 'Grip and trunk', 'core') }),
        coolFull()
      ]
    },
    fbC2: {
      title: t('جسم كامل ج٢ — لانج وهيب ثرست', 'Full body C2 — lunge and hip thrust'),
      goal: t('قوة رجل واحدة وألوية وجذع مع لياقة.', 'Single-leg, glute and trunk strength with conditioning.'),
      components: ['strength', 'balance', 'core', 'aerobic'],
      rpe: 7, duration: 60,
      items: [
        ...fullWU(),
        S('ex_reverse_lunge', 3, '8/leg', '2', 'rir', '90s', P('رجل واحدة بدمبل', 'Dumbbell single-leg work', 'strength')),
        S('ex_hip_thrust', 3, '8-10', '2', 'rir', '2min', { tempo: '1-0-1-2', ...P('ألوية', 'Glutes', 'strength') }),
        S('ex_incline_dumbbell_press', 3, '8-10', '2', 'rir', '90s', P('صدر علوي وأكتاف', 'Upper chest and shoulders', 'strength')),
        S('ex_face_pull', 2, '15', '2', 'rir', '60s', P('قوام وصحة الكتف', 'Posture and shoulder health', 'prevention')),
        { kind: 'timed', libId: 'ex_rowing_machine', sets: 5, duration: '1min', rest: '1min', intensity: '7', basis: 'rpe', ...P('فترات خفيفة للياقة القلب', 'Easy intervals for cardio fitness', 'aerobic') },
        coolFull()
      ]
    }
  }
};

/* ============ 9) لياقة عامة — متوسط: حرق دهون وإعادة تشكيل الجسم (12 أسبوع) ============ */
const stepsNote = () => N('هدف الخطوات اليومي: ٨٠٠٠ في البلوك الأول ← ١٠٠٠٠ ← ١٢٠٠٠ في الآخر', 'Daily step target: 8,000 in block 1, then 10,000, then 12,000 at the end');

const T_GEN_FAT_INT = {
  id: 'pt_general_fatloss_int',
  sport: 'general',
  level: 'intermediate',
  title: t('حرق دهون وإعادة تشكيل الجسم — ١٢ أسبوع (متوسط)', 'Fat loss and body recomposition — 12 weeks (intermediate)'),
  goal: t('خسارة ٥-٨٪ من الدهون مع الحفاظ على (أو زيادة) الكتلة العضلية: قوة تقيلة للحفاظ على العضل، كوندشننج متدرج، وهدف خطوات يومي يزيد صرف الطاقة، مع عجز غذائي معتدل (٣٠٠-٥٠٠ سعر) وبروتين ١.٦-٢.٢ جم/كجم.', 'Lose 5-8% body fat while keeping (or adding) muscle: heavy strength work to retain muscle, progressive conditioning and a daily step target to raise expenditure, with a moderate 300-500 kcal deficit and 1.6-2.2 g/kg protein.'),
  components: ['strength', 'hypertrophy', 'aerobic', 'anaerobic', 'muscular_endurance', 'core'],
  sessionsPerWeek: 5,
  periods: [
    {
      type: 'gpp',
      goal: t('قاعدة قوة وتحمل هوائي؛ الكوندشننج بشدة متوسطة والخطوات ٨٠٠٠ يوميًا.', 'Strength base and aerobic endurance; moderate conditioning and 8,000 daily steps.'),
      components: ['strength', 'aerobic', 'hypertrophy'],
      blocks: [
        {
          name: t('أسبوع ١ — اختبارات وقياسات', 'Week 1 — Tests and measurements'),
          goal: t('اختبار 5RM تقديري واختبار تجديف ٢ كم وقياسات الجسم، مع جلستين قوة عاديتين.', 'Estimated 5RM tests, a 2 km row test and body measurements, plus two regular strength sessions.'),
          components: ['strength', 'aerobic'],
          loads: [4],
          weekTypes: ['test'],
          pattern: ['test', '', 'lowA', '', 'upA', 'steps', '']
        },
        {
          name: t('بلوك ١ — قاعدة', 'Block 1 — Base'),
          goal: t('قوة ٣-٤×٦-٨ على RIR 2، فترات هوائية طويلة، يوم خطوات وحركة. الأسبوع الخامس تخفيف (-٣٠٪ حجم).', 'Strength 3-4x6-8 at RIR 2, longer aerobic intervals, a steps-and-mobility day. Week 5 deload (-30% volume).'),
          components: ['strength', 'aerobic', 'hypertrophy'],
          loads: [5, 6, 7, 4],
          weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['lowA', 'upA', 'cond', '', 'fullB', 'steps', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('زيادة كثافة الكوندشننج (ميتكون وفترات لاهوائية) مع الحفاظ على الأوزان التقيلة؛ الخطوات ١٠٠٠٠.', 'Increase conditioning density (metcons and anaerobic intervals) while keeping heavy loads; 10,000 steps.'),
      components: ['strength', 'anaerobic', 'muscular_endurance'],
      blocks: [
        {
          name: t('بلوك ٢ — كثافة', 'Block 2 — Density'),
          goal: t('قوة ٤×٥-٦ لحماية العضل، سوبرست للمساعدات لتوفير الوقت، وميتكون ١٢-١٦ دقيقة. الأسبوع التاسع تخفيف.', 'Strength 4x5-6 to protect muscle, supersetted accessories to save time, 12-16 min metcons. Week 9 deload.'),
          components: ['strength', 'anaerobic', 'muscular_endurance'],
          loads: [6, 7, 8, 4],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['lowB', 'upB', 'metcon', '', 'fullB', 'steps', '']
        }
      ]
    },
    {
      type: 'realization',
      goal: t('أعلى صرف طاقة (خطوات ١٢٠٠٠) مع شدة محفوظة، ثم إعادة الاختبار.', 'Peak energy expenditure (12,000 steps) with maintained intensity, then retest.'),
      components: ['strength', 'anaerobic', 'aerobic'],
      blocks: [
        {
          name: t('بلوك ٣ — ذروة الحرق', 'Block 3 — Peak burn'),
          goal: t('جلستين كوندشننج في الأسبوع وقوة بحجم أقل (٣ مجموعات). الأسبوع ١١ أخف.', 'Two conditioning sessions per week and lower-volume strength (3 sets). Week 11 lighter.'),
          components: ['anaerobic', 'aerobic', 'strength'],
          loads: [8, 6],
          weekTypes: ['shock', 'load'],
          pattern: ['lowB', 'metcon', 'upB', '', 'cond', 'steps', '']
        },
        {
          name: t('أسبوع ١٢ — إعادة الاختبار', 'Week 12 — Retest'),
          goal: t('نفس اختبارات أسبوع ١ والقياسات والصور، ثم خطة الصيانة.', 'Repeat week 1 tests, measurements and photos, then plan maintenance.'),
          components: ['strength', 'aerobic'],
          loads: [5],
          weekTypes: ['test'],
          pattern: ['lowA', '', '', 'test', '', 'steps', '']
        }
      ]
    }
  ],
  sessions: {
    test: {
      title: t('اختبارات القوة واللياقة', 'Strength and fitness tests'),
      goal: t('قياس القوة واللياقة والجسم كنقطة مقارنة.', 'Measure strength, fitness and body composition as a reference.'),
      components: ['strength', 'aerobic'],
      rpe: 8, duration: 75,
      items: [
        genWU('ex_rowing_machine'), ...lowerPrep(),
        ramp('ex_barbell_back_squat', '8-5-3-1', 'البار ×٨، ٥٠٪ ×٥، ٧٠٪ ×٣، ٨٥٪ ×١ من المتوقع', 'Bar x8, 50% x5, 70% x3, 85% x1 of expected'),
        S('ex_barbell_back_squat', 1, '5', '1', 'rir', '4min', P('5RM سكوات (1RM التقديري = الوزن × ١.١٥)', 'Squat 5RM (estimated 1RM = load x 1.15)', 'strength')),
        S('ex_barbell_bench_press', 1, '5', '1', 'rir', '4min', P('5RM بنش', 'Bench 5RM', 'strength')),
        S('ex_pullup', 1, 'max', '0', 'rir', '3min', P('أقصى عقلة (أو لات بولداون ١٠RM)', 'Max pull-ups (or lat pulldown 10RM)', 'muscular_endurance')),
        { kind: 'timed', libId: 'ex_rowing_machine', sets: 1, reps: '1', distance: '2000m', duration: '7-10min', intensity: '9', basis: 'rpe', ...P('اختبار تجديف ٢ كم — مؤشر اللياقة الهوائية', '2 km row test — aerobic fitness marker', 'aerobic'), ...N('سجل الزمن والسرعة لكل ٥٠٠م', 'Record time and split per 500 m') },
        { kind: 'drill', name: t('قياسات: وزن الصباح (متوسط ٣ أيام)، محيط الوسط والحوض، صور', 'Measurements: morning weight (3-day average), waist and hip girths, photos'), sets: 1, reps: '1', ...P('متابعة إعادة التشكيل مش الوزن بس', 'Track recomposition, not just scale weight', 'recovery') },
        coolFull()
      ]
    },
    lowA: {
      title: t('أسفل أ — قوة', 'Lower A — strength'),
      goal: t('سكوات تقيل ومفصل حوض للحفاظ على عضل الرجلين.', 'Heavy squat and hinge to retain leg muscle.'),
      components: ['strength', 'hypertrophy', 'core'],
      rpe: 8, duration: 65,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_barbell_back_squat', '8-5-3', 'البار ×٨، ٥٠٪ ×٥، ٦٥٪ ×٣', 'Bar x8, 50% x5, 65% x3'),
        S('ex_barbell_back_squat', 4, '6-8', '70-77.5', '1rm', '2.5min', { tempo: '3-0-1-0', ...P('الحمل التقيل إشارة للجسم يحافظ على العضل وقت العجز', 'Heavy load signals muscle retention during a deficit', 'strength') }),
        S('ex_romanian_deadlift', 3, '8', '2', 'rir', '2min', { tempo: '3-0-1-0', ...P('خلفية وألوية', 'Hamstrings and glutes', 'hypertrophy') }),
        S('ex_walking_lunge', 3, '10/leg', '2', 'rir', '90s', P('رجل واحدة وصرف طاقة عالي', 'Single-leg work with high energy cost', 'muscular_endurance')),
        S('ex_leg_curl', 3, '10-12', '1', 'rir', '60s', P('خلفية', 'Hamstrings', 'hypertrophy')),
        S('ex_ab_wheel_rollout', 3, '8-10', '2', 'rir', '60s', P('جذع', 'Trunk', 'core')),
        coolLower()[0]
      ]
    },
    upA: {
      title: t('أعلى أ — قوة', 'Upper A — strength'),
      goal: t('بنش وتجديف وعقلة للحفاظ على عضل الجزء العلوي.', 'Bench, rows and pull-ups to retain upper-body muscle.'),
      components: ['strength', 'hypertrophy'],
      rpe: 8, duration: 60,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        ramp('ex_barbell_bench_press', '8-5-3', 'البار ×٨، ٥٠٪ ×٥، ٦٥٪ ×٣', 'Bar x8, 50% x5, 65% x3'),
        S('ex_barbell_bench_press', 4, '6-8', '70-77.5', '1rm', '2.5min', { tempo: '2-1-1-0', ...P('قوة الدفع', 'Pressing strength', 'strength') }),
        S('ex_pullup', 4, '5-8', '2', 'rir', '2min', P('سحب رأسي (بمساعدة لو لزم)', 'Vertical pull (assisted if needed)', 'strength')),
        S('ex_dumbbell_shoulder_press', 3, '8-10', '2', 'rir', '90s', { ...P('أكتاف — سوبرست مع التجديف', 'Shoulders — superset with the row', 'hypertrophy') }),
        S('wg_chest_supported_row', 3, '10', '2', 'rir', '90s', P('ظهر', 'Back', 'hypertrophy')),
        S('ex_lateral_raise', 2, '15', '1', 'rir', '45s', P('أكتاف جانبية', 'Side delts', 'hypertrophy')),
        coolUpper()[1]
      ]
    },
    cond: {
      title: t('كوندشننج هوائي — فترات', 'Aerobic conditioning — intervals'),
      goal: t('رفع اللياقة الهوائية وصرف الطاقة بأقل إجهاد للمفاصل.', 'Raise aerobic fitness and energy expenditure with low joint stress.'),
      components: ['aerobic', 'threshold'],
      rpe: 7, duration: 50,
      items: [
        genWU('ex_rowing_machine'),
        { kind: 'timed', libId: 'ad_threshold_cruise_intervals', name: t('فترات عتبة على الدراجة أو التجديف', 'Threshold intervals on bike or rower'), sets: 4, duration: '5min', rest: '2min', intensity: 'Z4', basis: 'hr', ...P('العتبة اللاهوائية — تقدر تتكلم بكلمتين تلاتة بس', 'Threshold — only a few words possible', 'threshold'), ...N('بلوك ٣: ٥×٥ دقايق', 'Block 3: 5x5 min') },
        { kind: 'timed', libId: 'wg_treadmill_incline_walk', sets: 1, duration: '20min', intensity: 'Z2', basis: 'hr', ...P('هوائي منخفض الشدة لصرف طاقة إضافي', 'Low-intensity aerobic for extra expenditure', 'aerobic') },
        coolFull()
      ]
    },
    fullB: {
      title: t('جسم كامل ب — قوة وتحمل', 'Full body B — strength and endurance'),
      goal: t('ديدليفت وضغط واقف مع دائرة مساعدات بكثافة.', 'Deadlift and standing press plus a dense accessory circuit.'),
      components: ['strength', 'muscular_endurance', 'core'],
      rpe: 8, duration: 65,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_deadlift', '5-3-2', '٤٠٪ ×٥، ٦٠٪ ×٣، ٧٠٪ ×٢', '40% x5, 60% x3, 70% x2'),
        S('ex_deadlift', 3, '5', '75-80', '1rm', '3min', P('قوة السلسلة الخلفية', 'Posterior-chain strength', 'strength')),
        S('wg_overhead_press', 3, '6-8', '2', 'rir', '2min', P('قوة الكتف والجذع', 'Shoulder and trunk strength', 'strength')),
        { kind: 'wod', name: t('دائرة ٣ جولات: ١٠ دمبل رو لكل إيد + ١٠ جوبلت سكوات + ١٥ سوينج كيتل بيل + ٣٠م فارمرز', 'Circuit x3: 10/arm dumbbell row + 10 goblet squats + 15 kettlebell swings + 30 m farmers carry'), format: 'intervals', sets: 3, rest: '90s', intensity: '7', basis: 'rpe', ...P('كثافة عالية وصرف طاقة مع الحفاظ على الحركة النضيفة', 'High density and energy cost with clean movement', 'muscular_endurance') },
        S('ex_side_plank', 2, '30-40s/side', '2', 'rir', '45s', P('جذع جانبي', 'Lateral trunk', 'core')),
        coolFull()
      ]
    },
    steps: {
      title: t('يوم خطوات وحركة', 'Steps and mobility day'),
      goal: t('صرف طاقة غير تدريبي (NEAT) واستشفاء نشط.', 'Non-exercise energy expenditure (NEAT) and active recovery.'),
      components: ['aerobic', 'recovery', 'mobility'],
      rpe: 3, duration: 60,
      items: [
        wu('ex_arm_circles', { sets: 1, reps: '10' }),
        { kind: 'timed', libId: 'ad_brisk_walk', sets: 1, duration: '45-60min', intensity: 'Z1-Z2', basis: 'hr', ...P('مشي سريع في الهوا الطلق لاستكمال هدف الخطوات', 'Brisk outdoor walk toward the step target', 'aerobic'), ...stepsNote() },
        mobN('روتين مرونة ١٥ دقيقة: حوض، ضهر علوي، كاحل، أوتار خلفية', '15-minute mobility routine: hips, upper back, ankles, hamstrings', { duration: '15min' })
      ]
    },
    lowB: {
      title: t('أسفل ب — قوة كثيفة', 'Lower B — dense strength'),
      goal: t('سكوات أمامي تقيل وسوبرست للمساعدات.', 'Heavy front squat and supersetted accessories.'),
      components: ['strength', 'muscular_endurance'],
      rpe: 8, duration: 60,
      items: [
        genWU(), ...lowerPrep(),
        ramp('ex_front_squat', '8-5-3', 'البار ×٨، ٥٠٪ ×٥، ٦٥٪ ×٣', 'Bar x8, 50% x5, 65% x3'),
        S('ex_front_squat', 4, '5-6', '75-80', '1rm', '2.5min', { ...P('قوة الفخذ والجذع', 'Quad and trunk strength', 'strength'), ...N('النسبة من 1RM الفرونت سكوات (≈ ٨٠-٨٥٪ من السكوات الخلفي)', 'Percentage of front-squat 1RM (≈ 80-85% of back squat)') }),
        S('ex_hip_thrust', 3, '8-10', '2', 'rir', '60s', { tempo: '1-0-1-2', ...P('ألوية — سوبرست مع البلغاري', 'Glutes — superset with split squats', 'hypertrophy') }),
        S('ex_bulgarian_split_squat', 3, '8/leg', '2', 'rir', '90s', P('رجل واحدة', 'Single leg', 'strength')),
        S('ex_kettlebell_swing', 4, '15', '7', 'rpe', '45s', P('قدرة الحوض وصرف طاقة عالي', 'Hip power and high energy cost', 'power')),
        coolLower()[1]
      ]
    },
    upB: {
      title: t('أعلى ب — قوة كثيفة', 'Upper B — dense strength'),
      goal: t('بنش مائل وتجديف تقيل مع سوبرست.', 'Incline press and heavy rows in supersets.'),
      components: ['strength', 'hypertrophy', 'muscular_endurance'],
      rpe: 8, duration: 55,
      items: [
        genWU('ex_rowing_machine'), ...upperPrep(),
        S('ex_incline_barbell_bench_press', 4, '5-6', '2', 'rir', '2min', { tempo: '2-1-1-0', ...P('دفع تقيل — سوبرست مع التجديف', 'Heavy press — superset with the row', 'strength') }),
        S('ex_bent_over_row', 4, '6-8', '2', 'rir', '2min', P('ظهر تقيل', 'Heavy back', 'strength')),
        S('ex_dumbbell_bench_press', 3, '10-12', '1', 'rir', '60s', P('حجم صدر', 'Chest volume', 'hypertrophy')),
        S('ex_lat_pulldown', 3, '10-12', '1', 'rir', '60s', P('حجم ظهر', 'Back volume', 'hypertrophy')),
        S('ex_face_pull', 2, '15', '2', 'rir', '45s', P('صحة الكتف', 'Shoulder health', 'prevention')),
        coolUpper()[0]
      ]
    },
    metcon: {
      title: t('ميتكون لاهوائي', 'Anaerobic metcon'),
      goal: t('تحمل لاهوائي وصرف طاقة عالي في وقت قصير.', 'Anaerobic capacity and high energy expenditure in a short time.'),
      components: ['anaerobic', 'vo2max', 'muscular_endurance'],
      rpe: 9, duration: 45,
      items: [
        genWU('ex_rowing_machine'),
        wu('wg_inchworm', { sets: 1, reps: '6' }),
        { kind: 'timed', libId: 'dr_assault_bike_intervals', sets: 8, duration: '30s', rest: '90s', intensity: '9', basis: 'rpe', ...P('فترات قصيرة شديدة لرفع VO2max', 'Short hard intervals to raise VO2max', 'vo2max') },
        { kind: 'wod', name: t('AMRAP ١٢ دقيقة: ١٠ ثرستر دمبل، ١٠ بوكس ستيب أوفر، ٢٠٠م تجديف', 'AMRAP 12: 10 dumbbell thrusters, 10 box step-overs, 200 m row'), format: 'amrap', duration: '12min', intensity: '8', basis: 'rpe', ...P('تحمل عضلي ولاهوائي', 'Muscular and anaerobic endurance', 'anaerobic'), ...N('بلوك ٣: ١٦ دقيقة', 'Block 3: 16 minutes') },
        coolFull()
      ]
    }
  }
};

/* ============ 10) لياقة عامة — مبتدئ: قوة السيدات وصحة العظام (10 أسابيع) ============ */
const womenWU = () => [
  genWU(),
  wu('ad_90_90_hip_switches', { sets: 1, reps: '6/side' }),
  wu('wg_banded_glute_bridge', { sets: 1, reps: '12' }),
  wu('wg_cat_cow_stretch', { sets: 1, reps: '8' })
];

const T_GEN_WOMEN_BEG = {
  id: 'pt_general_women_strength_beg',
  sport: 'general',
  level: 'beginner',
  title: t('قوة السيدات وصحة العظام — ١٠ أسابيع (مبتدئ)', 'Women\'s strength and bone health — 10 weeks (beginner)'),
  goal: t('بناء قوة الألوية والظهر والجذع وتحسين كثافة العظام بأحمال متدرجة (توصل لـ ٥-٦ عدات RIR 2 في الحركات الأساسية) وتمارين قفز خفيفة، مع قوام أفضل ووقاية من الإصابات.', 'Build glute, back and trunk strength and support bone density with progressive loading (reaching 5-6 reps at RIR 2 on the main lifts) and low-level impact work, with better posture and injury prevention.'),
  components: ['strength', 'core', 'power', 'balance', 'prevention', 'mobility'],
  sessionsPerWeek: 3,
  periods: [
    {
      type: 'gpp',
      goal: t('تعلم الحركات والتحكم، ورفع التحمل العضلي تدريجيًا، وإدخال قفز خفيف جدًا.', 'Learn the movements and control, gradually build muscular endurance and introduce very light impact.'),
      components: ['technique', 'strength', 'core', 'balance'],
      blocks: [
        {
          name: t('أسبوع ١ — تقييم وتعلم', 'Week 1 — Assessment and learning'),
          goal: t('اختبارات آمنة لتحديد أوزان البداية وتعلم الحركات.', 'Safe tests to set starting loads and learn the movements.'),
          components: ['technique', 'strength'],
          loads: [3],
          weekTypes: ['test'],
          pattern: ['test', '', 'fA', '', 'fB', '', '']
        },
        {
          name: t('بلوك ١ — أساس وتحكم', 'Block 1 — Foundation and control'),
          goal: t('٣×١٠-١٢ على RIR 3 وتمبو بطيء في النزول. زودي الوزن ١-٢ كجم لما كل العدات تبقى سهلة. الأسبوع الخامس أخف.', '3x10-12 at RIR 3 with slow eccentrics. Add 1-2 kg once all reps feel easy. Week 5 lighter.'),
          components: ['strength', 'core', 'technique'],
          loads: [4, 5, 6, 3],
          weekTypes: ['load', 'load', 'load', 'deload'],
          pattern: ['fA', '', 'fB', '', 'fC', '', '']
        }
      ]
    },
    {
      type: 'spp',
      goal: t('أحمال أعلى تحفز العظم (عدات ٥-٨ على RIR 2) وقفز متدرج.', 'Higher, bone-stimulating loads (5-8 reps at RIR 2) and progressive impact.'),
      components: ['strength', 'power', 'core'],
      blocks: [
        {
          name: t('بلوك ٢ — قوة وتحميل العظام', 'Block 2 — Strength and bone loading'),
          goal: t('٤×٦-٨ ثم ٤×٥-٦ على RIR 2 في السكوات والتراب بار والهيب ثرست؛ قفز ٣٠-٥٠ هبوط في الجلسة. الأسبوع التاسع أخف.', '4x6-8 then 4x5-6 at RIR 2 on squat, trap-bar deadlift and hip thrust; 30-50 landings per session. Week 9 lighter.'),
          components: ['strength', 'power'],
          loads: [5, 6, 7, 3],
          weekTypes: ['load', 'load', 'shock', 'deload'],
          pattern: ['fA2', '', 'fB2', '', 'fC2', '', '']
        }
      ]
    },
    {
      type: 'realization',
      goal: t('إعادة التقييم ومقارنة التقدم.', 'Reassess and compare progress.'),
      components: ['strength', 'core'],
      blocks: [
        {
          name: t('أسبوع ١٠ — إعادة التقييم', 'Week 10 — Reassessment'),
          goal: t('نفس اختبارات أسبوع ١ + جلسة قوة عادية.', 'Repeat the week 1 tests + one regular strength session.'),
          components: ['strength', 'core'],
          loads: [4],
          weekTypes: ['test'],
          pattern: ['fA2', '', '', 'test', '', '', '']
        }
      ]
    }
  ],
  sessions: {
    test: {
      title: t('تقييم القوة والتوازن', 'Strength and balance assessment'),
      goal: t('نقطة بداية آمنة بدون أقصى وزن.', 'A safe baseline without max lifts.'),
      components: ['strength', 'balance', 'core'],
      rpe: 6, duration: 55,
      items: [
        ...womenWU(),
        S('ex_goblet_squat', 1, '10', '2', 'rir', '3min', P('أتقل دمبل لـ ١٠ عدات نضيفة وفاضل عدتين', 'Heaviest dumbbell for 10 clean reps with 2 in reserve', 'strength')),
        S('ex_hip_thrust', 1, '10', '2', 'rir', '3min', P('نفس الطريقة للهيب ثرست', 'Same method for the hip thrust', 'strength')),
        S('ex_pushup', 1, 'max', '1', 'rir', '3min', P('أقصى ضغط (مائل أو على الركب حسب المستوى)', 'Max push-ups (incline or kneeling as needed)', 'muscular_endurance')),
        S('ad_plank_endurance_test', 1, 'max', '0', 'rir', '2min', P('تحمل الجذع', 'Trunk endurance', 'core')),
        { kind: 'timed', libId: 'ad_single_leg_balance_progression', sets: 2, duration: 'max/leg', rest: '60s', ...P('توازن على رجل واحدة (عين مفتوحة ثم مقفولة)', 'Single-leg balance (eyes open then closed)', 'balance') },
        coolFull()
      ]
    },
    fA: {
      title: t('جلسة أ — سكوات وسحب', 'Session A — squat and pull'),
      goal: t('نمط السكوات وقوة الظهر وجذع.', 'Squat pattern, back strength and trunk.'),
      components: ['strength', 'core', 'technique'],
      rpe: 6, duration: 55,
      items: [
        ...womenWU(),
        S('ex_goblet_squat', 3, '10-12', '3', 'rir', '90s', { tempo: '3-1-1-0', ...P('السكوات: قوة الرجلين وتحميل عظام الحوض', 'Squat: leg strength and hip bone loading', 'strength') }),
        S('ex_lat_pulldown', 3, '10-12', '3', 'rir', '90s', { tempo: '2-1-1-0', ...P('ظهر وقوام', 'Back and posture', 'strength') }),
        S('ex_glute_bridge', 3, '12-15', '2', 'rir', '60s', { tempo: '1-0-1-2', ...P('ألوية', 'Glutes', 'strength') }),
        S('ex_bird_dog', 2, '8/side', '3', 'rir', '45s', P('ثبات الجذع وأسفل الظهر', 'Trunk and lower-back stability', 'core')),
        { kind: 'drill', libId: 'ad_jump_rope_basic_bounce', sets: 3, duration: '20s', rest: '40s', ...P('قفز خفيف جدًا لتحفيز العظام (هبوط ناعم)', 'Very light impact to stimulate bone (soft landings)', 'power') },
        coolFull()
      ]
    },
    fB: {
      title: t('جلسة ب — مفصل الحوض ودفع', 'Session B — hinge and push'),
      goal: t('مفصل الحوض، الدفع، والحمل.', 'Hip hinge, pushing and carrying.'),
      components: ['strength', 'core', 'technique'],
      rpe: 6, duration: 55,
      items: [
        ...womenWU(),
        S('wg_kettlebell_romanian_deadlift', 3, '10-12', '3', 'rir', '90s', { tempo: '3-0-1-0', ...P('خلفية وألوية وأسفل ظهر قوي', 'Hamstrings, glutes and a strong lower back', 'strength') }),
        S('wg_incline_push_up', 3, '8-12', '2', 'rir', '90s', P('قوة الدفع', 'Pushing strength', 'strength')),
        S('ex_seated_cable_row', 3, '10-12', '3', 'rir', '90s', P('ظهر علوي وقوام', 'Upper back and posture', 'strength')),
        S('ex_farmers_carry', 3, '1', '6', 'rpe', '90s', { distance: '30m', ...P('قبضة وجذع ووضعية', 'Grip, trunk and posture', 'core') }),
        coolFull()
      ]
    },
    fC: {
      title: t('جلسة ج — ألوية ورجل واحدة', 'Session C — glutes and single leg'),
      goal: t('ألوية جانبية ورجل واحدة وتوازن.', 'Lateral glutes, single-leg strength and balance.'),
      components: ['strength', 'balance', 'prevention'],
      rpe: 6, duration: 50,
      items: [
        ...womenWU(),
        S('ex_step_up', 3, '8-10/leg', '3', 'rir', '90s', P('قوة رجل واحدة وتوازن', 'Single-leg strength and balance', 'balance')),
        S('ex_hip_thrust', 3, '10-12', '3', 'rir', '90s', { tempo: '1-0-1-2', ...P('ألوية', 'Glutes', 'strength') }),
        S('wg_banded_lateral_walk', 2, '12/side', '2', 'rir', '45s', P('الألوية الجانبية لثبات الركبة', 'Glute med for knee stability', 'prevention')),
        S('wg_prone_y_raise', 2, '12', '2', 'rir', '45s', P('ظهر علوي ضد التحدب', 'Upper back against rounding', 'prevention')),
        S('ex_dead_bug', 2, '8/side', '3', 'rir', '45s', P('جذع', 'Trunk', 'core')),
        coolFull()
      ]
    },
    fA2: {
      title: t('جلسة أ٢ — سكوات تقيل وسحب', 'Session A2 — heavier squat and pull'),
      goal: t('أحمال أعلى في السكوات لتحفيز العظام، مع ظهر وقفز.', 'Higher squat loads for bone stimulus, plus back and jumps.'),
      components: ['strength', 'power', 'core'],
      rpe: 7, duration: 60,
      items: [
        ...womenWU(),
        ramp('ek_squat_to_bench_with_barbell', '8-5', 'البار ×٨، ٦٠٪ من وزن العمل ×٥', 'Bar x8, 60% of work weight x5'),
        S('ek_squat_to_bench_with_barbell', 4, '6-8', '2', 'rir', '2.5min', { tempo: '3-0-1-0', ...P('بوكس سكوات بالبار: أمان وعمق ثابت وحمل أعلى', 'Barbell box squat: safety, consistent depth and higher load', 'strength'), ...N('أسبوع ٨: ٤×٥-٦', 'Week 8: 4x5-6') }),
        S('wg_assisted_pull_up', 3, '6-8', '2', 'rir', '2min', P('عقلة بمساعدة — هدف أول عقلة كاملة', 'Assisted pull-up — working toward a first full rep', 'strength')),
        S('ad_countermovement_jump', 3, '5', '3', 'rir', '90s', P('قفز ثم هبوط ثابت لتحفيز العظام', 'Jumps with stable landings for bone stimulus', 'power')),
        S('wg_pallof_press', 2, '10/side', '2', 'rir', '45s', P('مقاومة الدوران', 'Anti-rotation', 'core')),
        coolFull()
      ]
    },
    fB2: {
      title: t('جلسة ب٢ — تراب بار وضغط', 'Session B2 — trap bar and press'),
      goal: t('رفع تقيل من الأرض وضغط فوق الرأس لتحميل العمود الفقري بأمان.', 'Heavy floor lifting and overhead pressing to load the spine safely.'),
      components: ['strength', 'core'],
      rpe: 7, duration: 60,
      items: [
        ...womenWU(),
        ramp('wg_trap_bar_deadlift', '8-5', '٥٠٪ ×٨، ٧٠٪ ×٥ من وزن العمل', '50% x8, 70% x5 of work weight'),
        S('wg_trap_bar_deadlift', 4, '5-6', '2', 'rir', '2.5min', P('أهم تمرين لتحميل العظام والقوة الوظيفية', 'Key exercise for bone loading and functional strength', 'strength')),
        S('ex_dumbbell_shoulder_press', 3, '8-10', '2', 'rir', '90s', P('تحميل رأسي وقوة الكتف', 'Vertical loading and shoulder strength', 'strength')),
        S('ex_one_arm_dumbbell_row', 3, '8-10/side', '2', 'rir', '90s', P('ظهر', 'Back', 'strength')),
        S('ex_farmers_carry', 3, '1', '7', 'rpe', '90s', { distance: '30m', ...P('حمل تقيل للجذع والقبضة', 'Heavy carry for trunk and grip', 'core') }),
        coolFull()
      ]
    },
    fC2: {
      title: t('جلسة ج٢ — ألوية تقيل وقفز', 'Session C2 — heavy glutes and impact'),
      goal: t('هيب ثرست بالبار ورجل واحدة وقفز متدرج.', 'Barbell hip thrust, single-leg work and progressive impact.'),
      components: ['strength', 'power', 'balance'],
      rpe: 7, duration: 55,
      items: [
        ...womenWU(),
        S('ex_hip_thrust', 4, '6-8', '2', 'rir', '2min', { tempo: '1-0-1-2', ...P('ألوية بحمل عالي', 'Heavily loaded glutes', 'strength') }),
        S('ex_reverse_lunge', 3, '8/leg', '2', 'rir', '90s', P('رجل واحدة وتوازن', 'Single leg and balance', 'balance')),
        S('ek_hyperextensions', 3, '10-12', '2', 'rir', '60s', P('عضلات الضهر للقوام وحماية الفقرات', 'Back extensors for posture and spine health', 'prevention')),
        { kind: 'drill', libId: 'ex_jump_rope', sets: 5, duration: '30s', rest: '30s', ...P('قفز متكرر خفيف (٥٠ هبوط تقريبًا)', 'Repeated light impact (about 50 landings)', 'power') },
        S('ex_side_plank', 2, '30s/side', '2', 'rir', '45s', P('جذع جانبي', 'Lateral trunk', 'core')),
        coolFull()
      ]
    }
  }
};

export const PLAN_TEMPLATES_GYM = [T_BB_HYP,T_BB_PREP,T_PL_MEET,T_PL_BEG,T_WL_COMP,T_SM_INT,T_CALI_INT,T_GEN_STR_BEG,T_GEN_FAT_INT,T_GEN_WOMEN_BEG];
