/*
 * ADAM — مكتبة الاختبارات العامة (ب) (SPORT_TESTS_GENERAL_B)
 * ============================================================
 * تكملة للمكتبة العامة: التحمل العضلي، التوازن، جودة الحركة، رد الفعل،
 * الاختبارات الصحية والوظيفية (خصوصًا لكبار السن)، وبطاريات الاختبارات.
 * المعايير منقولة من مصادر منشورة ومذكور مصدرها في `source`.
 * لو الاختبار ملوش معايير منشورة معتمدة، `norms` فاضية والتفسير في `notes`.
 * (نبض الراحة، ضغط الدم، نسبة الوسط للطول، مشي 6 دقايق الإكلينيكي وقوة القبضة
 *  موجودين في tests-general.js ومش متكررين هنا.)
 *
 * Companion to the general library: muscular endurance, balance, movement quality,
 * reaction, health/functional tests (especially for older adults) and test batteries.
 * Norms come from published sources named in `source`; where no widely accepted
 * norms exist, `norms` is empty and `notes` explains interpretation.
 */

const t = (ar, en) => ({ ar, en });
const AR_DIG = '٠١٢٣٤٥٦٧٨٩';
const ad = (s) => String(s).replace(/\d/g, (d) => AR_DIG[d]);

/* ---------- الأدوات ---------- */
const EQ = {
  mat: ['مرتبة أرضية', 'Exercise mat'],
  stopwatch: ['ساعة إيقاف', 'Stopwatch'],
  metronome: ['مترونوم (أو تطبيق على الموبايل)', 'Metronome (or phone app)'],
  foam_block: ['قطعة إسفنج أو كرة صغيرة تحت الصدر (حسب البروتوكول)', 'Foam block or small ball under the chest (per protocol)'],
  curl_strip: ['شريط لاصق أو لوح بعلامتين للمسافة المحددة', 'Tape strip or board marked at the set distance'],
  bench: ['بنش مستوي', 'Flat bench'],
  barbell: ['بار ووزن محدد', 'Barbell loaded to the set weight'],
  spotter: ['مساعد (سبوتر)', 'Spotter'],
  plinth: ['سرير فحص أو بنش عالي', 'Treatment table or high bench'],
  strap: ['أحزمة تثبيت أو مساعد يثبت الرجلين', 'Straps or a partner to hold the legs'],
  wedge: ['مسند بزاوية 60 درجة (لاختبار عضلات البطن)', '60° wedge (for the flexor test)'],
  wall: ['حائط مستوي', 'Flat wall'],
  pullbar: ['عقلة', 'Pull-up bar'],
  chair: ['كرسي بدون مساند، ارتفاع المقعد حوالي 43 سم، مسنود على الحائط', 'Armless chair, seat about 43 cm, placed against a wall'],
  armchair: ['كرسي بمساند ثابت (ارتفاع المقعد حوالي 46 سم)', 'Sturdy chair with armrests (seat about 46 cm)'],
  dumbbell_sft: ['دمبل: 2.27 كجم (5 باوند) للسيدات و3.63 كجم (8 باوند) للرجال', 'Dumbbell: 2.27 kg (5 lb) for women, 3.63 kg (8 lb) for men'],
  tape: ['شريط لاصق للأرض', 'Floor tape'],
  tape_m: ['شريط قياس', 'Measuring tape'],
  ruler: ['مسطرة 18 بوصة (45 سم) أو مسطرة مترية', '18-inch (45 cm) or metre ruler'],
  cones: ['أقماع', 'Cones'],
  ybal: ['جهاز Y-Balance أو شريط لاصق وشريط قياس', 'Y-Balance kit, or floor tape and measuring tape'],
  foam: ['وسادة إسفنج متوسطة الكثافة', 'Medium-density foam pad'],
  fms_kit: ['طقم FMS (لوح، عصا، حاجز)', 'FMS kit (board, dowel, hurdle)'],
  dowel: ['عصا خشب', 'Dowel'],
  camera: ['كاميرا أو موبايل للتصوير (أمامي وجانبي)', 'Camera or phone for video (front and side)'],
  box30: ['صندوق ارتفاعه 30 سم', '30 cm box'],
  light_board: ['نظام أضواء تفاعلي (مثل Blazepod أو Fitlight)', 'Reactive light system (e.g. Blazepod, Fitlight)'],
  batak: ['حائط أضواء Batak أو ما يشبهه', 'Batak light wall or similar'],
  plate_table: ['ترابيزة بقرصين قطر 20 سم بين مركزيهم 80 سم ومستطيل في النص', 'Table with two 20 cm discs 80 cm apart (centre to centre) and a rectangle between them'],
  hrm: ['حزام أو ساعة قياس نبض', 'Heart-rate monitor'],
  treadmill: ['سير متحرك أو دراجة ثابتة', 'Treadmill or cycle ergometer'],
  course_20m: ['ممر مستوي 20-30 متر', 'Flat 20-30 m walkway'],
  sft_course: ['مستطيل 45.7 متر (50 ياردة) مُعلّم كل 4.57 متر', '45.7 m (50 yd) rectangle marked every 4.57 m'],
  berg_kit: ['كرسيين (بمساند وبدون)، سلمة، مسطرة، ساعة إيقاف', 'Two chairs (with and without arms), step, ruler, stopwatch'],
  battery_kit: ['أدوات كل اختبار في البطارية حسب الدليل الرسمي', 'Equipment for each item as listed in the official manual'],
  track: ['مضمار أو أرض مستوية مقاسة', 'Track or measured flat surface'],
  none: ['لا يحتاج أدوات خاصة', 'No special equipment']
};
const eq = (...keys) => keys.map((k) => t(EQ[k][0], EQ[k][1]));

/* ---------- بناء جداول المعايير ---------- */
// hi: الأعلى أفضل — الحدود تنازلي. lo: الأقل أفضل — الحدود تصاعدي.
const hi = (rs, cuts) => rs.map((r, i) => { const b = { r }; if (i < cuts.length) b.min = cuts[i]; if (i > 0) b.max = cuts[i - 1]; return b; });
const lo = (rs, cuts) => rs.map((r, i) => { const b = { r }; if (i > 0) b.min = cuts[i - 1]; if (i < cuts.length) b.max = cuts[i]; return b; });
const who = (sex, age) => {
  const kid = age && age[1] < 18;
  if (sex === 'm') return kid ? ['بنين', 'Boys'] : ['رجال', 'Men'];
  if (sex === 'f') return kid ? ['بنات', 'Girls'] : ['سيدات', 'Women'];
  return ['الجميع', 'All'];
};
const grp = (sex, age, note) => {
  const [war, wen] = who(sex, age);
  let ar = war, en = wen;
  if (age) {
    ar += age[1] >= 99 ? ' ' + ad(age[0]) + ' سنة فأكثر' : ' ' + ad(age[0]) + '-' + ad(age[1]) + ' سنة';
    en += age[1] >= 99 ? ' ' + age[0] + '+' : ' ' + age[0] + '-' + age[1];
  }
  if (note) { ar += ' — ' + note[0]; en += ' — ' + note[1]; }
  return t(ar, en);
};
const N = (sex, age, bands, note) => { const n = { group: grp(sex, age, note), sex, bands }; if (age) n.age = [age[0], age[1]]; return n; };
const NL = (ar, en, sex, age, bands) => { const n = { group: t(ar, en), sex, bands }; if (age) n.age = [age[0], age[1]]; return n; };
const table = (sex, rs, rows, dir = hi, note) => rows.map(([a0, a1, ...cuts]) => N(sex, [a0, a1], dir(rs, cuts), note));

const R5 = ['excellent', 'very_good', 'good', 'average', 'poor'];
const R5b = ['excellent', 'good', 'average', 'below_average', 'poor'];

/*
 * Senior Fitness Test (Rikli & Jones): "المدى الطبيعي" = من المئين 25 للمئين 75.
 * فوق المدى = جيد، جوه المدى = متوسط، تحت المدى = أقل من المتوسط.
 * rows: [سن من، سن إلى، الحد الأدنى للمدى، الحد الأعلى للمدى]
 * step: 1 للأعداد الصحيحة (العدّات) علشان الحد الأعلى يفضل جوه المدى، 0 للقياسات المتصلة.
 * k: معامل تحويل (مثلًا بوصة إلى سم، ياردة إلى متر).
 */
const SFT_AGES = [[60, 64], [65, 69], [70, 74], [75, 79], [80, 84], [85, 89], [90, 94]];
const rnd = (x) => Math.round(x * 10) / 10;
const sftHi = (sex, ranges, step = 1, k = 1) => ranges.map(([a, b], i) => N(sex, SFT_AGES[i], [
  { r: 'good', min: rnd(b * k) + step },
  { r: 'average', min: rnd(a * k), max: rnd(b * k) + step },
  { r: 'below_average', max: rnd(a * k) }
]));
const sftLo = (sex, ranges) => ranges.map(([fast, slow], i) => N(sex, SFT_AGES[i], [
  { r: 'good', max: fast },
  { r: 'average', min: fast, max: slow },
  { r: 'below_average', min: slow }
]));
const SFT_SRC = 'Rikli RE, Jones CJ (2001, 2013) Senior Fitness Test Manual, Human Kinetics — normal range = 25th-75th percentile';
const SFT_NOTE_AR = 'المدى الطبيعي من المئين 25 للمئين 75 لنفس السن والجنس: فوقه = جيد، جوّه = متوسط، تحته = أقل من المتوسط ومحتاج تدخل.';
const SFT_NOTE_EN = 'Normal range = 25th to 75th percentile for age and sex: above it = good, within = average, below = below average and worth addressing.';

/* ================= التحمل العضلي ================= */
const P_MUSC_END = [
  {
    id: 'ts_pushup_acsm',
    name: t('اختبار الضغط (ACSM / CSEP)', 'Push-up test (ACSM / CSEP)'),
    category: 'muscular_endurance', sports: ['all'],
    population: t('البالغين الأصحاء 15-69 سنة', 'Healthy adults 15-69'),
    measures: t('التحمل العضلي للصدر والكتف والترايسبس', 'Muscular endurance of the chest, shoulders and triceps'),
    protocol: t('1) الرجال: وضع الضغط العادي على المشطين. السيدات: الضغط المعدّل على الركبتين والرجلين متشابكين. 2) الإيدين بعرض الكتف، الضهر مستقيم، الراس في مستوى الجسم. 3) انزل لحد ما الصدر يقرب من الأرض (حوالي قبضة إيد أو يلمس قطعة إسفنج حسب البروتوكول) واطلع لحد فرد الدراعين. 4) عدّ التكرارات المتتالية الصحيحة من غير وقت محدد. 5) الاختبار يقف لو اتكسر الشكل مرتين ورا بعض أو وقف يرتاح.', '1) Men: standard push-up on the toes. Women: modified push-up on the knees with ankles crossed. 2) Hands shoulder-width, back straight, head in line. 3) Lower until the chest nears the floor (about a fist, or touching a foam block per protocol), then push to straight arms. 4) Count consecutive correct repetitions, no time limit. 5) Stop when form breaks on two consecutive reps or the person rests.'),
    equipment: eq('mat', 'foam_block'),
    unit: 'reps', better: 'higher',
    norms: [
      ...table('m', R5, [[15, 19, 39, 29, 23, 18], [20, 29, 36, 29, 22, 17], [30, 39, 30, 22, 17, 12], [40, 49, 25, 17, 13, 10], [50, 59, 21, 13, 10, 7], [60, 69, 18, 11, 8, 5]]),
      ...table('f', R5, [[15, 19, 33, 25, 18, 12], [20, 29, 30, 21, 15, 10], [30, 39, 27, 20, 13, 8], [40, 49, 24, 15, 11, 5], [50, 59, 21, 11, 7, 2], [60, 69, 17, 12, 5, 2]], hi, ['ضغط على الركبتين', 'modified (knee) push-up'])
    ],
    source: 'CSEP Canadian Physical Activity, Fitness & Lifestyle Approach (3rd ed., 2003); reproduced in ACSM\'s Guidelines for Exercise Testing and Prescription',
    notes: t('التقديرات الأصلية: ممتاز، جيد جدًا، جيد، مقبول (متوسط هنا)، يحتاج تحسين (ضعيف هنا). ثبّت نفس الطريقة (عمق النزول، وجود الإسفنجة) في كل إعادة، لأن اختلاف البروتوكول بيغيّر الرقم كتير.', 'Original categories: excellent, very good, good, fair (average here), needs improvement (poor here). Keep the same depth criterion and block in every retest; protocol differences change the score considerably.')
  },
  {
    id: 'ts_partial_curlup',
    name: t('اختبار الكيرل أب الجزئي (CSEP)', 'Partial curl-up test (CSEP)'),
    category: 'muscular_endurance', sports: ['all'],
    population: t('البالغين الأصحاء 15-69 سنة', 'Healthy adults 15-69'),
    measures: t('التحمل العضلي لعضلات البطن مع ضغط أقل على أسفل الضهر من السيت أب', 'Abdominal muscular endurance with less low-back load than full sit-ups'),
    protocol: t('1) نوم على الضهر، الركبة 90 درجة، القدمين على الأرض ومن غير تثبيت. 2) الدراعين جنب الجسم والكفوف على الأرض وأطراف الصوابع عند الخط الأول. 3) الخط التاني على بعد المسافة المحددة في البروتوكول (غالبًا 10 سم). 4) مترونوم 50 دقة/دقيقة = 25 تكرار في الدقيقة: اطلع لحد ما الصوابع توصل الخط التاني وانزل لحد ما لوح الكتف يلمس الأرض. 5) أقصى حاجة 25 تكرار في دقيقة، والاختبار يقف لو مقدرش يلحق الإيقاع أو الشكل اتكسر.', '1) Lie supine, knees at 90°, feet flat and unanchored. 2) Arms at the sides, palms down, fingertips at the first line. 3) Second line at the protocol distance (commonly 10 cm). 4) Metronome at 50 bpm = 25 curl-ups per minute: curl until the fingertips reach the second line, then lower until the shoulder blades touch the mat. 5) Maximum 25 in one minute; stop if the cadence or form cannot be kept.'),
    equipment: eq('mat', 'curl_strip', 'metronome'),
    unit: 'reps', better: 'higher',
    norms: [
      ...table('m', R5, [[15, 19, 25, 23, 21, 16], [20, 29, 25, 21, 16, 11], [30, 39, 25, 18, 15, 11], [40, 49, 25, 18, 13, 6], [50, 59, 25, 17, 11, 8], [60, 69, 25, 16, 11, 6]]),
      ...table('f', R5, [[15, 19, 25, 22, 17, 12], [20, 29, 25, 18, 14, 5], [30, 39, 25, 19, 10, 6], [40, 49, 25, 19, 11, 4], [50, 59, 25, 19, 10, 6], [60, 69, 25, 17, 8, 3]])
    ],
    source: 'CSEP Canadian Physical Activity, Fitness & Lifestyle Approach (2003); reproduced in ACSM\'s Guidelines for Exercise Testing and Prescription (8th-9th ed.)',
    notes: t('25 هو سقف الاختبار، فالممتاز = اكمل الـ 25. الاختبار ده بيقيس التحمل مش القوة. لو الشخص بيكمل 25 بسهولة استخدم اختبار أصعب زي بطارية ماكجيل.', '25 is the ceiling, so excellent = completing all 25. It measures endurance, not strength. If someone reaches 25 easily, use a harder test such as the McGill torso battery.')
  },
  {
    id: 'ts_prone_plank',
    name: t('اختبار البلانك الأمامي', 'Prone plank hold'),
    category: 'muscular_endurance', sports: ['all'],
    measures: t('التحمل الثابت لعضلات الجذع (الكور)', 'Isometric endurance of the trunk (core) muscles'),
    protocol: t('1) ارتكاز على الساعدين (الكوع تحت الكتف) والمشطين. 2) الجسم خط مستقيم من الراس للكعب، الحوض لا طالع ولا نازل. 3) ابدأ الساعة لما يثبت الوضع. 4) المختبر بينبّه مرة واحدة لو الحوض نزل أو طلع؛ التاني مرة = نهاية الاختبار. 5) سجّل الزمن بالثواني.', '1) Support on the forearms (elbows under shoulders) and toes. 2) Body in a straight line from head to heel, hips neither sagging nor piked. 3) Start timing once the position is set. 4) The tester gives one warning if the hips drift; the second drift ends the test. 5) Record the time in seconds.'),
    equipment: eq('mat', 'stopwatch'),
    unit: 's', better: 'higher',
    norms: [],
    source: 'Strand SL et al. (2014) J Strength Cond Res 28:3542-3548 (reliability and protocol); no widely accepted age/sex norms',
    notes: t('مفيش جداول معايير معتمدة على مستوى واسع. قارن الشخص بنفسه، واعتبر تحسن 10-15% ذو قيمة. البلانك لوحده مش كفاية لتقييم الجذع — كمّله ببطارية ماكجيل (أمامي، خلفي، جانبي) علشان تشوف التوازن بين العضلات. وقّف الاختبار لو حصل ألم في أسفل الضهر.', 'No widely accepted norms exist. Compare each person with themselves; a 10-15% improvement is meaningful. A plank alone does not describe the trunk — pair it with the McGill battery (flexor, extensor, side bridges) to check balance between muscle groups. Stop if low-back pain appears.')
  },
  {
    id: 'ts_ymca_bench_press',
    name: t('اختبار YMCA للبنش بريس (تحمل)', 'YMCA bench press endurance test'),
    category: 'muscular_endurance', sports: ['all'],
    measures: t('التحمل العضلي للجزء العلوي بوزن ثابت', 'Upper-body muscular endurance with a fixed load'),
    protocol: t('1) الوزن ثابت: 36 كجم (80 باوند) للرجال و16 كجم (35 باوند) للسيدات. 2) مترونوم 60 دقة/دقيقة = 30 تكرار في الدقيقة (نزول مع دقة وطلوع مع دقة). 3) ابدأ من الدراعين مفرودين، والبار ينزل للصدر. 4) كمّل لحد ما الشخص مايقدرش يلحق الإيقاع أو يفرد الدراعين. 5) لازم سبوتر.', '1) Fixed load: 36 kg (80 lb) for men, 16 kg (35 lb) for women. 2) Metronome at 60 bpm = 30 lifts per minute (down on one beat, up on the next). 3) Start with arms extended; bar touches the chest. 4) Continue until the cadence cannot be kept or the arms cannot lock out. 5) A spotter is required.'),
    equipment: eq('bench', 'barbell', 'metronome', 'spotter'),
    unit: 'reps', better: 'higher',
    norms: [],
    source: 'Golding LA, Myers CR, Sinning WE (1989) Y\'s Way to Physical Fitness, YMCA of the USA; YMCA Fitness Testing and Assessment Manual',
    notes: t('جداول المئينات الأصلية بالسن والجنس موجودة في دليل YMCA؛ ارجع لها لو عايز تقييم رسمي. الأهم للمدرب: مقارنة الشخص بنفسه على نفس البروتوكول. الوزن الثابت بيخلي الاختبار أسهل نسبيًا على الأوزان التقيلة وأصعب على الخفيفة، فهو بيجمع بين القوة والتحمل.', 'The original age/sex percentile tables are in the YMCA manual; use them for formal rating. For coaches the key is comparing a person with themselves on the same protocol. Because the load is absolute, heavier people find it relatively easier, so the score mixes strength and endurance.')
  },
  {
    id: 'ts_biering_sorensen',
    name: t('اختبار بيرينج-سورنسن لعضلات الضهر', 'Biering-Sørensen back extensor test'),
    category: 'muscular_endurance', sports: ['all'],
    measures: t('التحمل الثابت لعضلات أسفل الضهر (باسطات الجذع)', 'Isometric endurance of the lumbar (trunk extensor) muscles'),
    protocol: t('1) نوم على البطن على سرير، الحوض عند حافة السرير والجذع برّه في الهوا. 2) ثبّت الرجلين عند الحوض والركبة والكاحل (أحزمة أو مساعد). 3) الدراعين متشابكين على الصدر. 4) اثبت والجذع أفقي (موازي للأرض) أطول وقت ممكن. 5) الاختبار يقف لما الجذع ينزل عن الأفقي بوضوح أو يحس بألم؛ سجّل الزمن.', '1) Lie prone on a table with the iliac crests at the edge and the upper body unsupported. 2) Secure the legs at the pelvis, knees and ankles (straps or a partner). 3) Arms crossed over the chest. 4) Hold the trunk horizontal for as long as possible. 5) Stop when the trunk clearly drops below horizontal or pain appears; record the time.'),
    equipment: eq('plinth', 'strap', 'stopwatch'),
    unit: 's', better: 'higher',
    norms: [],
    source: 'Biering-Sørensen F (1984) Spine 9:106-119; McGill SM et al. (1999) Arch Phys Med Rehabil 80:941-944',
    notes: t('بيرينج-سورنسن لقى إن الزمن القليل بيتنبأ بظهور ألم أسفل الضهر لأول مرة عند الرجال. مفيش جدول تقييم واحد متفق عليه؛ استخدمه للمتابعة ومع اختبارات ماكجيل لحساب النسب (البطن ÷ الضهر أقل من 1). ممنوع لو فيه ألم ضهر حاد.', 'Biering-Sørensen found that short holding times predicted first-time low-back pain in men. There is no single agreed rating table; use it for tracking and with the McGill tests to compute ratios (flexor ÷ extensor below 1.0). Avoid during acute back pain.')
  },
  {
    id: 'ts_mcgill_torso_battery',
    name: t('بطارية ماكجيل لتحمل الجذع', 'McGill torso endurance battery'),
    category: 'muscular_endurance', sports: ['all'],
    measures: t('تحمل عضلات البطن والضهر والجانبين والتوازن بينهم', 'Endurance of the trunk flexors, extensors and lateral muscles, and the balance between them'),
    protocol: t('1) عضلات البطن (Flexor): قعدة والضهر مسنود على مسند 60 درجة، الركبة 90 درجة، القدمين مثبتين، الدراعين على الصدر؛ شيل المسند 10 سم لورا واثبت؛ النهاية لما الضهر يرجع يلمس المسند. 2) الضهر (Extensor): زي اختبار سورنسن. 3) الجانب اليمين والشمال (Side bridge): ارتكاز على كوع واحد والرجلين فوق بعض، الجسم مستقيم؛ النهاية لما الحوض ينزل. 4) راحة 5 دقايق بين كل اختبار. 5) سجّل الأزمنة واحسب النسب.', '1) Flexors: sit against a 60° support, knees at 90°, feet anchored, arms across the chest; move the support back 10 cm and hold; stop when the back touches the support. 2) Extensors: as the Sørensen test. 3) Right and left side bridges: on one elbow with the feet stacked, body straight; stop when the hips drop. 4) Rest 5 minutes between tests. 5) Record the times and compute the ratios.'),
    equipment: eq('mat', 'plinth', 'strap', 'wedge', 'stopwatch'),
    unit: 's', better: 'higher',
    norms: [],
    source: 'McGill SM, Childs A, Liebenson C (1999) Arch Phys Med Rehabil 80:941-944; McGill SM (2016) Low Back Disorders, 3rd ed.',
    notes: t('المهم هنا النسب مش الأرقام لوحدها. نسب مرجعية لماكجيل: البطن ÷ الضهر أقل من 1.0 — الجانب اليمين ÷ الشمال بين 0.95 و1.05 — أي جانب ÷ الضهر أقل من 0.75. الخروج عن النسب دي بيشير لعدم توازن مرتبط بآلام أسفل الضهر أكتر من الزمن المطلق.', 'The ratios matter more than the raw times. McGill reference ratios: flexor ÷ extensor below 1.0; right ÷ left side bridge between 0.95 and 1.05; either side bridge ÷ extensor below 0.75. Imbalanced ratios relate to low-back trouble more than absolute times do.')
  },
  {
    id: 'ts_wall_sit',
    name: t('اختبار الجلوس على الحائط', 'Wall sit test'),
    category: 'muscular_endurance', sports: ['all'],
    measures: t('التحمل الثابت لعضلات الفخذ الأمامية', 'Isometric endurance of the quadriceps'),
    protocol: t('1) الضهر ملزوق في الحائط والقدمين بعرض الكتف. 2) انزل لحد ما الفخذ يبقى موازي للأرض والركبة 90 درجة فوق الكاحل. 3) الإيدين على الصدر أو جنب الجسم (مش على الفخذ). 4) ابدأ الساعة واثبت أطول وقت ممكن. 5) النهاية لما الحوض يطلع بوضوح أو الإيدين تتسند.', '1) Back flat against the wall, feet shoulder-width. 2) Slide down until the thighs are parallel to the floor, knees at 90° over the ankles. 3) Hands on the chest or at the sides (not on the thighs). 4) Start timing and hold as long as possible. 5) Stop when the hips clearly rise or the hands are used for support.'),
    equipment: eq('wall', 'stopwatch'),
    unit: 's', better: 'higher',
    norms: [],
    source: 'Common field test (e.g. McArdle, Katch & Katch, Exercise Physiology); no widely accepted published norms',
    notes: t('الجداول المنتشرة على الإنترنت مش من مصدر علمي موثوق، فاستخدمه للمقارنة الذاتية. نسخة الرجل الواحدة بتدي فكرة عن الفرق بين الجانبين (فرق أكتر من 10-15% يستاهل متابعة). مش مناسب مع ألم الركبة الأمامي.', 'The tables circulating online have no solid scientific source, so use it for self-comparison. A single-leg version shows side-to-side differences (more than 10-15% is worth following up). Not suitable with anterior knee pain.')
  },
  {
    id: 'ts_pullups_max',
    name: t('أقصى عدد عقلة', 'Maximum pull-ups'),
    category: 'muscular_endurance', sports: ['all'],
    measures: t('التحمل والقوة النسبية لعضلات الضهر والباي', 'Relative strength-endurance of the back and biceps'),
    protocol: t('1) مسكة أمامية (الكف لبرّه) بعرض الكتف أو أوسع شوية. 2) ابدأ من تعليق كامل والدراعين مفرودين. 3) اطلع لحد ما الدقن تعدي البار، وانزل لفرد كامل. 4) ممنوع المرجحة أو الكيبينج. 5) عدّ التكرارات الصحيحة المتتالية.', '1) Overhand (pronated) grip, shoulder-width or slightly wider. 2) Start from a dead hang with straight arms. 3) Pull until the chin clears the bar, lower to full extension. 4) No swinging or kipping. 5) Count consecutive correct repetitions.'),
    equipment: eq('pullbar'),
    unit: 'reps', better: 'higher',
    norms: [],
    source: 'US Marine Corps Physical Fitness Test (MCO 6100.13A) protocol; no general-population age/sex norms widely accepted',
    notes: t('مفيش معايير عامة معتمدة للبالغين؛ الجيوش ليها جداول درجات خاصة بيها (زي مشاة البحرية الأمريكية). الرقم متأثر جامد بوزن الجسم، فتابع الرقم مع الوزن. لو الشخص مابيعملش ولا عقلة، استخدم التعليق بدراع مثني أو العقلة المعدّلة (FitnessGram).', 'There are no accepted general adult norms; militaries use their own scoring tables (e.g. the US Marine Corps). Body mass strongly affects the score, so track it alongside weight. If the person cannot do one pull-up, use the flexed-arm hang or the FitnessGram modified pull-up.')
  },
  {
    id: 'ts_flexed_arm_hang',
    name: t('التعليق بدراع مثني', 'Flexed-arm hang'),
    category: 'muscular_endurance', sports: ['all'],
    population: t('الأطفال والناشئين والمبتدئين', 'Children, youth and beginners'),
    measures: t('التحمل الثابت لعضلات الدراع والكتف', 'Isometric endurance of the arm and shoulder muscles'),
    protocol: t('1) مسكة أمامية بعرض الكتف. 2) بمساعدة (سلم أو مساعد) اطلع لحد ما الدقن فوق البار والكوع مثني بالكامل. 3) ابدأ الساعة لما يسيب المساعدة. 4) اثبت والدقن فوق البار من غير ما تسند الدقن عليه. 5) النهاية لما الدقن تنزل تحت مستوى البار. (في يوروفيت اسمه Bent arm hang وبيتقاس بنفس الطريقة.)', '1) Overhand grip, shoulder-width. 2) With help (step or partner) get the chin above the bar with elbows fully flexed. 3) Start timing when support is removed. 4) Hold with the chin above the bar without resting it on the bar. 5) Stop when the chin drops below the bar. (Eurofit calls this the bent arm hang, measured the same way.)'),
    equipment: eq('pullbar', 'stopwatch'),
    unit: 's', better: 'higher',
    norms: [],
    source: 'Council of Europe (1988) Eurofit Handbook; Cooper Institute FitnessGram Administration Manual',
    notes: t('الجداول بتختلف حسب البلد والسن؛ للأطفال استخدم جداول يوروفيت الأوروبية (Tomkinson وآخرون 2018) أو FitnessGram لو متاحة. مفيد للمتابعة عند اللي لسه مابيعملوش عقلة كاملة.', 'Norms vary by country and age; for children use the European Eurofit reference values (Tomkinson et al., 2018) or FitnessGram where available. Useful for tracking people who cannot yet do a full pull-up.')
  }
];

/* @@PART2@@ */
/* ================= التوازن ================= */
const P_BALANCE = [
  {
    id: 'ts_stork_balance',
    name: t('اختبار وقفة اللقلق (Stork)', 'Stork balance stand test'),
    category: 'balance', sports: ['all'],
    measures: t('التوازن الثابت على رجل واحدة على مشط القدم', 'Static balance on one leg on the ball of the foot'),
    protocol: t('1) اقف على الرجلين والإيدين على الوسط. 2) ارفع رجل وحط باطن القدم على ركبة الرجل الواقفة من جوه. 3) مع الإشارة ارفع الكعب واقف على المشط. 4) ابدأ الساعة، وسجّل الزمن لحد ما الكعب يلمس الأرض أو الإيدين تسيب الوسط أو القدم المرفوعة تبعد عن الركبة. 5) 3 محاولات لكل رجل وسجّل الأحسن.', '1) Stand on both feet with hands on hips. 2) Place the sole of the free foot against the inside of the standing knee. 3) On the signal, raise the heel and balance on the ball of the foot. 4) Time until the heel touches down, the hands leave the hips or the free foot leaves the knee. 5) Three trials per leg; record the best.'),
    equipment: eq('stopwatch'),
    unit: 's', better: 'higher',
    norms: [
      N('m', [16, 99], hi(R5b, [50, 41, 31, 20])),
      N('f', [16, 99], hi(R5b, [30, 23, 16, 10]))
    ],
    source: 'Johnson BL, Nelson JK (1986) Practical Measurements for Evaluation in Physical Education, 4th ed.',
    notes: t('المعايير للبالغين والناشئين الكبار. قارن الرجلين: فرق كبير ممكن يكون أثر إصابة قديمة في الكاحل أو الركبة. الأرض لازم تكون ثابتة ومش زلقة، والحذاء نفسه في كل مرة (أو حافي).', 'Norms are for adults and older adolescents. Compare legs: a large difference may reflect an old ankle or knee injury. Use a firm, non-slip floor and the same footwear (or barefoot) each time.')
  },
  {
    id: 'ts_y_balance_lq',
    name: t('اختبار Y للتوازن — الطرف السفلي (Y-Balance / SEBT)', 'Y-Balance Test — lower quarter (Y-Balance / SEBT)'),
    category: 'balance', sports: ['all'],
    measures: t('التوازن الديناميكي والتحكم الحركي على رجل واحدة في 3 اتجاهات', 'Dynamic single-leg balance and control in three directions'),
    protocol: t('1) قيس طول الرجل: من الشوكة الحرقفية الأمامية العلوية (ASIS) لحد الكعب الداخلي (الكاحل الإنسي) وهو نايم. 2) اقف حافي على رجل في نص الجهاز (أو تقاطع الشرايط). 3) بالرجل التانية ادفع المؤشر لأبعد مسافة: أمامي (Anterior)، خلفي إنسي (Posteromedial)، خلفي وحشي (Posterolateral). 4) 4 محاولات تجريبية ثم 3 محاولات مسجلة لكل اتجاه وخد الأحسن. 5) المحاولة تبطل لو الرجل لمست الأرض أو ركلت المؤشر أو فقد التوازن. 6) كرر على الرجل التانية.', '1) Measure limb length supine: anterior superior iliac spine to the distal medial malleolus. 2) Stand barefoot on one leg at the centre of the kit (or tape intersection). 3) With the other leg push the indicator as far as possible: anterior, posteromedial, posterolateral. 4) Four practice then three recorded trials per direction; take the best. 5) A trial is void if the reaching foot touches down, kicks the indicator or balance is lost. 6) Repeat on the other leg.'),
    equipment: eq('ybal', 'tape_m'),
    unit: '%', better: 'higher',
    norms: [],
    source: 'Plisky PJ et al. (2006) J Orthop Sports Phys Ther 36:911-919; Plisky PJ et al. (2009) N Am J Sports Phys Ther 4:92-99; Gribble PA et al. (2012) J Athl Train 47:339-357 (SEBT)',
    notes: t('المجموع المركب (Composite) = (أمامي + خلفي إنسي + خلفي وحشي) ÷ (3 × طول الرجل) × 100. في دراسة Plisky على لاعبي كرة سلة ثانوي: فرق الاتجاه الأمامي بين الرجلين 4 سم أو أكتر ارتبط بخطر إصابة أعلى حوالي 2.5 مرة، ومجموع مركب أقل من 94% عند البنات ارتبط بخطر أعلى بكتير. القيم دي خاصة بالعينة دي؛ الأهم المقارنة بين الرجلين ومع نفس الرياضي قبل وبعد الإصابة. اختبار النجمة SEBT هو الأصل بـ 8 اتجاهات، والـ 3 اتجاهات دول كفاية للاستخدام العملي.', 'Composite = (anterior + posteromedial + posterolateral) ÷ (3 × limb length) × 100. In Plisky\'s high-school basketball study, an anterior side-to-side difference of 4 cm or more was linked to about 2.5 times higher injury risk, and a composite under 94% in girls to a much higher risk. These values are sample-specific; side-to-side comparison and the athlete\'s own pre-injury baseline matter most. The Star Excursion Balance Test (SEBT) is the original 8-direction version; these 3 directions are sufficient in practice.')
  },
  {
    id: 'ts_bess',
    name: t('نظام تسجيل أخطاء التوازن (BESS)', 'Balance Error Scoring System (BESS)'),
    category: 'balance', sports: ['all'],
    population: t('الرياضيين — خصوصًا متابعة الارتجاج', 'Athletes — especially concussion follow-up'),
    measures: t('التوازن الثابت تحت ظروف صعبة، ومتابعة الأداء بعد الارتجاج', 'Static postural stability under challenging conditions; post-concussion tracking'),
    protocol: t('1) 3 وقفات، كل واحدة 20 ثانية والعينين مقفولين والإيدين على الوسط: الرجلين جنب بعض، رجل واحدة (الرجل غير المفضلة)، ورجل قدام التانية (Tandem). 2) الـ 3 وقفات على أرض صلبة ثم على وسادة إسفنج (المجموع 6 مواقف). 3) عدّ الأخطاء: فتح العينين، الإيدين تسيب الوسط، خطوة أو وقوع، رفع المشط أو الكعب، ثني الحوض أكتر من 30 درجة، الخروج من الوضع أكتر من 5 ثواني. 4) أقصى حاجة 10 أخطاء لكل موقف. 5) المجموع من 60.', '1) Three stances, each 20 s with eyes closed and hands on hips: double-leg, single-leg (non-dominant) and tandem. 2) Perform all three on a firm surface, then on a foam pad (six conditions). 3) Count errors: opening the eyes, hands off hips, stepping or falling, lifting the forefoot or heel, hip flexion or abduction beyond 30°, staying out of position more than 5 s. 4) Maximum 10 errors per condition. 5) Total out of 60.'),
    equipment: eq('foam', 'stopwatch'),
    unit: 'points', better: 'lower',
    norms: [],
    source: 'Riemann BL, Guskiewicz KM (2000) J Athl Train 35:19-25; Iverson GL, Koehle MS (2013) Arch Clin Neuropsychol 28:337-345 (age norms)',
    notes: t('الأخطاء بتزيد مع السن والإرهاق. الاستخدام الأهم: قياس أساسي (Baseline) قبل الموسم، وبعد الإصابة بقارن بيه. الاختبار ده لوحده مش كفاية لتشخيص الارتجاج — لازم تقييم طبي متكامل (زي SCAT6) وعدم الرجوع للعب في نفس اليوم.', 'Error counts rise with age and fatigue. Its main use: a pre-season baseline to compare with after injury. It cannot diagnose concussion on its own — a full medical assessment (e.g. SCAT6) is required and there is no same-day return to play.')
  },
  {
    id: 'ts_single_leg_stance',
    name: t('الوقوف على رجل واحدة (عيون مفتوحة ومقفولة)', 'Single-leg stance (eyes open and closed)'),
    category: 'balance', sports: ['all'],
    measures: t('التوازن الثابت على رجل واحدة — مؤشر صحي مهم مع التقدم في السن', 'Static single-leg balance — an important health marker with ageing'),
    protocol: t('1) حافي، الدراعين متشابكين على الصدر أو على الوسط. 2) ارفع رجل (من غير ما تلمس الرجل الواقفة). 3) ابدأ الساعة لما الرجل تترفع، واثبت لحد 45 ثانية أو 60 ثانية حسب البروتوكول. 4) النهاية: الرجل المرفوعة تلمس الأرض أو الرجل الواقفة، القدم الواقفة تتحرك، الدراعين تتفك، أو العينين تتفتح في نسخة العين المقفولة. 5) 3 محاولات لكل حالة وسجّل الأحسن.', '1) Barefoot, arms crossed over the chest or on the hips. 2) Lift one foot without touching the standing leg. 3) Start timing when the foot leaves the floor; maximum 45 or 60 s per protocol. 4) Stop when the lifted foot touches the floor or the standing leg, the standing foot moves, the arms uncross, or the eyes open in the eyes-closed version. 5) Three trials per condition; record the best.'),
    equipment: eq('stopwatch'),
    unit: 's', better: 'higher',
    norms: [
      NL('الجميع ٥١-٧٥ سنة — فحص (عيون مفتوحة، ١٠ ثواني)', 'All 51-75 — screen (eyes open, 10 s)', 'any', [51, 75], [{ r: 'average', min: 10 }, { r: 'poor', max: 10 }])
    ],
    source: 'Springer BA et al. (2007) J Geriatr Phys Ther 30:8-15 (age norms); Araujo CG et al. (2022) Br J Sports Med 56:975-980; Vellas BJ et al. (1997) J Am Geriatr Soc 45:735-738',
    notes: t('في دراسة Araujo (2022) اللي مقدروش يقفوا 10 ثواني على رجل واحدة (51-75 سنة) كان عندهم خطر وفاة من كل الأسباب أعلى بحوالي 1.8 مرة. في كبار السن، عدم القدرة على الوقوف 5 ثواني على رجل ارتبط بالسقوط المؤذي (Vellas 1997). الزمن بيقل بوضوح بعد سن 50، والعيون المقفولة بتقلل الزمن جدًا في كل الأعمار؛ جداول Springer بالسن مفيدة للمقارنة التفصيلية.', 'In Araujo (2022), people aged 51-75 who could not stand 10 s on one leg had about 1.8 times higher all-cause mortality risk. In older adults, inability to stand 5 s on one leg was linked to injurious falls (Vellas 1997). Times fall clearly after 50 and eyes-closed times are much shorter at every age; Springer\'s age tables are useful for detailed comparison.')
  },
  {
    id: 'ts_flamingo_balance',
    name: t('اختبار توازن الفلامنجو (يوروفيت)', 'Flamingo balance test (Eurofit)'),
    category: 'balance', sports: ['all'],
    population: t('الأطفال والناشئين (جزء من يوروفيت)', 'Children and youth (part of Eurofit)'),
    measures: t('التوازن الثابت على رجل واحدة فوق عارضة ضيقة', 'Static single-leg balance on a narrow beam'),
    protocol: t('1) عارضة خشب طولها 50 سم وعرضها 3 سم وارتفاعها 4 سم. 2) اقف على الرجل المفضلة على العارضة، واثني الرجل التانية ومسك مشطها بالإيد من نفس الجهة. 3) الإيد التانية للتوازن. 4) ابدأ الساعة ووقفها كل مرة يفقد التوازن (يسيب الرجل أو يقع)، وكمّل لحد مجموع 60 ثانية. 5) السكور = عدد المحاولات اللي احتاجها علشان يكمّل 60 ثانية.', '1) Wooden beam 50 cm long, 3 cm wide, 4 cm high. 2) Stand on the preferred leg on the beam, bend the free leg and hold its foot with the same-side hand. 3) Use the other arm for balance. 4) Start the watch and pause it each time balance is lost (foot released or a fall); continue until 60 s in total. 5) Score = number of attempts needed to complete 60 s.'),
    equipment: t('عارضة خشب 50 × 3 × 4 سم', 'Wooden beam 50 × 3 × 4 cm') ? [t('عارضة خشب 50 × 3 × 4 سم', 'Wooden beam 50 × 3 × 4 cm'), ...eq('stopwatch')] : [],
    unit: 'points', better: 'lower',
    norms: [],
    source: 'Council of Europe (1988) Eurofit: Handbook for the Eurofit Tests of Physical Fitness; Tomkinson GR et al. (2018) Br J Sports Med 52:1445-1456',
    notes: t('عدد المحاولات الأقل = توازن أحسن. لو احتاج أكتر من 15 محاولة في أول 30 ثانية الاختبار بيوقف والسكور بيتسجّل صفر (مايقدرش). للأطفال استخدم القيم المرجعية الأوروبية (Tomkinson 2018) حسب السن والجنس.', 'Fewer attempts = better balance. If more than 15 attempts are needed in the first 30 s, the test is stopped and scored as unable. For children use the European reference values (Tomkinson 2018) by age and sex.')
  },
  {
    id: 'ts_berg_balance',
    name: t('مقياس بيرج للتوازن', 'Berg Balance Scale'),
    category: 'balance', sports: ['all'],
    population: t('كبار السن ومرضى التأهيل العصبي', 'Older adults and neurological rehab patients'),
    measures: t('التوازن الوظيفي في 14 مهمة يومية وخطر السقوط', 'Functional balance across 14 daily tasks and fall risk'),
    protocol: t('1) 14 مهمة، كل واحدة من 0 إلى 4: القيام من القعدة، الوقوف من غير سند، القعدة من غير سند، القعدة من الوقوف، التحويل بين كرسيين، الوقوف والعينين مقفولين، الوقوف والقدمين لازقين، المد لقدام بالدراع، التقاط حاجة من الأرض، اللف والبص لورا، اللف 360 درجة، حط الرجل على سلمة بالتبادل، الوقوف رجل قدام رجل، الوقوف على رجل واحدة. 2) اتبع تعليمات الاستمارة الرسمية بالظبط. 3) اجمع الدرجات (من 56).', '1) Fourteen items scored 0-4: sit to stand, standing unsupported, sitting unsupported, stand to sit, transfers, standing with eyes closed, standing with feet together, reaching forward, picking an object from the floor, turning to look behind, turning 360°, alternate foot on a step, tandem standing, single-leg standing. 2) Follow the official form instructions exactly. 3) Sum the scores (out of 56).'),
    equipment: eq('berg_kit'),
    unit: 'points', better: 'higher',
    norms: [
      NL('كبار السن ومرضى التأهيل', 'Older adults and rehab patients', 'any', null, [
        { r: 'good', min: 41 }, { r: 'below_average', min: 21, max: 41 }, { r: 'poor', max: 21 }
      ])
    ],
    source: 'Berg KO et al. (1989) Physiother Can 41:304-311; Berg KO et al. (1992) Can J Public Health 83 Suppl 2:S7-S11',
    notes: t('41-56 = خطر سقوط منخفض (مستقل)، 21-40 = خطر متوسط (بيمشي بمساعدة)، 0-20 = خطر عالي. كتير من الأبحاث بتعتبر أقل من 45 مؤشر لزيادة خطر السقوط عند كبار السن. الاختبار مش حساس للرياضيين والأصحاء (سقف منخفض).', '41-56 = low fall risk (independent), 21-40 = medium risk (walks with assistance), 0-20 = high risk. Many studies treat a score under 45 as increased fall risk in older adults. It has a low ceiling and is not sensitive in athletes or healthy adults.')
  },
  {
    id: 'ts_four_stage_balance',
    name: t('اختبار التوازن ذو المراحل الأربع (CDC STEADI)', '4-Stage Balance Test (CDC STEADI)'),
    category: 'balance', sports: ['all'],
    population: t('كبار السن — فحص خطر السقوط', 'Older adults — fall-risk screening'),
    measures: t('التوازن الثابت بصعوبة متدرجة', 'Static balance with progressive difficulty'),
    protocol: t('1) 4 وضعيات، كل واحدة 10 ثواني من غير سند ومن غير مساعدة، والمختبر واقف جنبه للأمان. 2) المرحلة 1: القدمين جنب بعض. 3) المرحلة 2: شبه تتابع (كعب رجل جنب إبهام التانية). 4) المرحلة 3: تتابع كامل (كعب رجل قدام صوابع التانية مباشرة). 5) المرحلة 4: الوقوف على رجل واحدة. 6) لو كمّل 10 ثواني يعدّي للمرحلة اللي بعدها؛ السكور = آخر مرحلة كمّلها.', '1) Four positions, each held 10 s without support or aids, with the tester standing close for safety. 2) Stage 1: feet side by side. 3) Stage 2: semi-tandem (instep of one foot beside the big toe of the other). 4) Stage 3: tandem (heel directly in front of the other foot\'s toes). 5) Stage 4: single-leg stand. 6) Progress after each successful 10 s hold; score = last stage completed.'),
    equipment: eq('stopwatch'),
    unit: 'level', better: 'higher',
    norms: [
      NL('كبار السن ٦٥ سنة فأكثر — فحص السقوط', 'Older adults 65+ — fall screen', 'any', [65, 99], [{ r: 'average', min: 3 }, { r: 'poor', max: 3 }])
    ],
    source: 'CDC STEADI (Stopping Elderly Accidents, Deaths & Injuries) — The 4-Stage Balance Test',
    notes: t('حسب CDC: اللي مايقدرش يثبت في وضع التتابع الكامل (المرحلة 3) 10 ثواني عنده خطر سقوط أعلى ومحتاج برنامج توازن وتقييم أشمل. استخدمه مع اختبار TUG والقيام من الكرسي 30 ثانية.', 'Per CDC: anyone who cannot hold the full tandem stance (stage 3) for 10 s is at increased fall risk and needs balance training and a fuller assessment. Use it with the TUG and the 30-s chair stand.')
  }
];

/* ================= جودة الحركة ================= */
const P_MOVEMENT = [
  {
    id: 'ts_fms',
    name: t('فحص الحركة الوظيفية (FMS)', 'Functional Movement Screen (FMS)'),
    category: 'movement', sports: ['all'],
    measures: t('جودة الأنماط الحركية الأساسية، والقيود وعدم التماثل بين الجانبين', 'Quality of fundamental movement patterns, limitations and asymmetries'),
    protocol: t('1) 7 اختبارات، كل واحد من 0 إلى 3: السكوات العميق، تخطي الحاجز، الطعن على خط، حركة الكتف، رفع الرجل المفرودة، ضغط ثبات الجذع، والثبات الدوراني. 2) 3 اختبارات استبعاد للألم (الكتف، مد الضهر، ثني الضهر) — أي ألم = صفر في الاختبار المرتبط. 3) 3 محاولات لكل اختبار، ولكل جانب في الاختبارات الثنائية؛ الدرجة = الجانب الأقل. 4) 3 = حركة سليمة، 2 = بتعويض، 1 = مايقدرش يعمل النمط، 0 = ألم. 5) المجموع من 21.', '1) Seven tests scored 0-3: deep squat, hurdle step, in-line lunge, shoulder mobility, active straight-leg raise, trunk stability push-up, rotary stability. 2) Three pain clearing tests (shoulder, spinal extension, spinal flexion) — any pain scores 0 on the linked test. 3) Three trials per test and per side on bilateral tests; the lower side is scored. 4) 3 = correct pattern, 2 = with compensation, 1 = unable, 0 = pain. 5) Total out of 21.'),
    equipment: eq('fms_kit'),
    unit: 'points', better: 'higher',
    norms: [
      NL('الرياضيين والبالغين النشطين', 'Athletes and active adults', 'any', null, [{ r: 'good', min: 15 }, { r: 'poor', max: 15 }])
    ],
    source: 'Cook G, Burton L, Hoogenboom B (2006) N Am J Sports Phys Ther 1:62-72, 132-139; Kiesel K et al. (2007) N Am J Sports Phys Ther 2:147-158; Moran RW et al. (2017) Br J Sports Med 51:1661-1669',
    notes: t('المجموع 14 أو أقل ارتبط بخطر إصابة أعلى في دراسات قديمة (Kiesel 2007)، لكن التحليلات الأحدث (Moran 2017) لقت إن قدرته على توقع الإصابة ضعيفة. استخدمه أساسًا لتحديد الألم وعدم التماثل (درجات مختلفة بين الجانبين) والاختبارات اللي درجتها 1، وابدأ التصحيح بيها. أي ألم = تحويل لتقييم طبي.', 'A total of 14 or less was linked to higher injury risk in early work (Kiesel 2007), but later reviews (Moran 2017) found weak predictive value. Use it mainly to flag pain, asymmetries (different scores left vs right) and any test scoring 1, and start corrective work there. Any pain = refer for clinical assessment.')
  },
  {
    id: 'ts_overhead_squat_assessment',
    name: t('تقييم السكوات فوق الراس (OHSA)', 'Overhead squat assessment (OHSA)'),
    category: 'movement', sports: ['all'],
    measures: t('التعويضات الحركية في السلسلة الحركية كلها أثناء السكوات', 'Movement compensations across the kinetic chain during a squat'),
    protocol: t('1) حافي، القدمين بعرض الكتف ومتجهين لقدام. 2) الدراعين مفرودين فوق الراس في خط الجسم. 3) 5 تكرارات سكوات لارتفاع كرسي تقريبًا بسرعة عادية. 4) صوّر من قدام ومن الجنب. 5) لاحظ: القدم بتلف لبرّه أو القوس بيسقط، الركبة بتدخل لجوه (Valgus)، ميل الجذع لقدام زيادة، تقوس أسفل الضهر، الدراعين بيقعوا لقدام، ونقل الوزن لجنب.', '1) Barefoot, feet shoulder-width and pointing forward. 2) Arms straight overhead in line with the trunk. 3) Five squats to about chair height at a normal pace. 4) Film from the front and side. 5) Look for: feet turning out or arches collapsing, knees moving in (valgus), excessive forward lean, low-back arching, arms falling forward, and weight shifting to one side.'),
    equipment: eq('dowel', 'camera'),
    unit: 'points', better: 'lower',
    norms: [],
    source: 'Clark MA, Lucett SC (2010) NASM Essentials of Corrective Exercise Training; National Academy of Sports Medicine',
    notes: t('تقييم وصفي مفيهوش معايير رقمية معتمدة. ممكن تسجل عدد التعويضات الملحوظة (كل تعويض = نقطة) للمتابعة. كل تعويض بيشير لعضلات مشدودة أو ضعيفة محتملة (مثلًا دخول الركبة: ضعف العضلة الألوية الوسطى وشد المقربة)، لكن ده افتراض لازم يتأكد باختبارات تانية.', 'A descriptive assessment without validated numerical norms. You can count observed compensations (one point each) for tracking. Each compensation suggests possible tight or weak muscles (e.g. knee valgus: weak gluteus medius, tight adductors), but these are hypotheses to confirm with other tests.')
  },
  {
    id: 'ts_single_leg_squat',
    name: t('تقييم السكوات على رجل واحدة', 'Single-leg squat assessment'),
    category: 'movement', sports: ['all'],
    measures: t('التحكم الحركي في الحوض والركبة والجذع على رجل واحدة', 'Single-leg control of the pelvis, knee and trunk'),
    protocol: t('1) اقف على رجل واحدة والدراعين متشابكين على الصدر (أو ممدودين لقدام). 2) انزل لحد ثني الركبة حوالي 60 درجة واطلع، 5 تكرارات بسرعة ثابتة. 3) صوّر من قدام. 4) قيّم 5 عناصر: الانطباع العام، وضع الجذع، ثبات الحوض (مايقعش ولا يلف)، مفصل الحوض (مايدخلش لجوه)، والركبة (فوق القدم ومش داخلة لجوه). 5) التقييم النهائي: جيد أو متوسط أو ضعيف.', '1) Stand on one leg with arms crossed on the chest (or reaching forward). 2) Squat to about 60° of knee flexion and return, five reps at a steady pace. 3) Film from the front. 4) Rate five criteria: overall impression, trunk posture, pelvic control (no drop or rotation), hip (no adduction or internal rotation) and knee (over the foot, no valgus). 5) Overall rating: good, fair or poor.'),
    equipment: eq('camera'),
    unit: 'score', better: 'higher',
    norms: [],
    source: 'Crossley KM et al. (2011) Am J Sports Med 39:866-873',
    notes: t('تقييم بالملاحظة. في دراسة Crossley، اللي أداءهم "جيد" كان عندهم قوة وتفعيل أحسن لعضلات الألوية الوسطى. قارن الرجلين دايمًا، والفيديو بالحركة البطيئة بيحسّن دقة التقييم. مفيد في متابعة إصابات الركبة (زي الرباط الصليبي والألم الأمامي).', 'An observational rating. In Crossley\'s study, people rated "good" had better hip abductor strength and timing. Always compare both legs; slow-motion video improves accuracy. Useful when following knee injuries (e.g. ACL, patellofemoral pain).')
  },
  {
    id: 'ts_less',
    name: t('نظام تسجيل أخطاء الهبوط (LESS)', 'Landing Error Scoring System (LESS)'),
    category: 'movement', sports: ['all'],
    measures: t('ميكانيكا الهبوط بعد القفز وخطر إصابات الرباط الصليبي', 'Jump-landing mechanics and ACL injury risk'),
    protocol: t('1) صندوق 30 سم، وعلامة على الأرض على بعد نص طول الشخص. 2) انط من على الصندوق لقدام للعلامة، وأول ما ترجل اطلع فورًا بأقصى قفزة عمودية. 3) صوّر من قدام ومن الجنب. 4) 3 محاولات صحيحة. 5) قيّم 17 عنصر (زي ثني الركبة والحوض عند الملامسة، دخول الركبة، عرض القدمين، الهبوط على الكعب، الشكل العام)، واجمع الأخطاء.', '1) A 30 cm box and a floor mark at half the person\'s height away. 2) Jump forward off the box to the mark and rebound immediately into a maximal vertical jump. 3) Film from the front and side. 4) Three valid trials. 5) Score 17 items (e.g. knee and hip flexion at contact, knee valgus, stance width, heel landing, overall impression) and sum the errors.'),
    equipment: eq('box30', 'camera', 'tape'),
    unit: 'points', better: 'lower',
    norms: [
      NL('الرياضيين', 'Athletes', 'any', null, [
        { r: 'excellent', max: 5 }, { r: 'good', min: 5, max: 6 }, { r: 'average', min: 6, max: 7 }, { r: 'poor', min: 7 }
      ])
    ],
    source: 'Padua DA et al. (2009) Am J Sports Med 37:1996-2002; Padua DA et al. (2015) J Sport Rehabil 24:145-151',
    notes: t('تقسيم Padua: 4 أو أقل ممتاز، 5 جيد، 6 متوسط، أكتر من 6 ضعيف. في لاعبي كرة القدم الناشئين، 5 أخطاء أو أكتر ارتبطت بخطر أعلى لإصابة الرباط الصليبي (Padua 2015). خد متوسط المحاولات التلاتة، واستخدمه لتوجيه تدريب الهبوط.', 'Padua categories: 4 or fewer excellent, 5 good, 6 moderate, more than 6 poor. In youth soccer players, 5 or more errors were linked to higher ACL injury risk (Padua 2015). Average the three trials and use the result to guide landing training.')
  },
  {
    id: 'ts_tuck_jump_assessment',
    name: t('تقييم قفزة ضم الركبتين (Tuck jump)', 'Tuck jump assessment'),
    category: 'movement', sports: ['all'],
    measures: t('عيوب تقنية الهبوط والقفز المتكرر تحت إرهاق بسيط', 'Landing and repeated-jump technique flaws under mild fatigue'),
    protocol: t('1) انط قفزات ضم ركبتين متتالية لمدة 10 ثواني، والفخذين يوصلوا موازيين للأرض. 2) صوّر من قدام ومن الجنب. 3) قيّم 10 عناصر (كل عيب = نقطة): دخول الركبة عند الهبوط، الفخذين مش موازيين في القمة، عدم تماثل الفخذين، عرض القدمين غير مناسب، القدمين مش على خط واحد، توقيت ملامسة القدمين مختلف، صوت هبوط عالي، توقف بين القفزات، تدهور الشكل قبل 10 ثواني، عدم الهبوط في نفس المكان.', '1) Perform repeated tuck jumps for 10 s, thighs reaching parallel to the floor. 2) Film from the front and side. 3) Score 10 criteria (one point per flaw): knee valgus on landing, thighs not parallel at peak, thighs unequal side to side, foot placement too wide or narrow, feet not parallel, uneven foot contact timing, excessive landing noise, pause between jumps, technique declining before 10 s, not landing in the same footprint.'),
    equipment: eq('camera', 'stopwatch'),
    unit: 'points', better: 'lower',
    norms: [],
    source: 'Myer GD, Ford KR, Hewett TE (2008) Athl Ther Today 13:39-44',
    notes: t('مفيش جداول بالسن، والتقييم الأساسي بالمقارنة مع نفس الرياضي. Myer اقترح إن الرياضي اللي عنده 6 عيوب أو أكتر يتحط في برنامج تدريب تقني للهبوط. المصداقية بين المقيّمين متوسطة، فخلي نفس الشخص يقيّم كل مرة ومن الفيديو.', 'No age tables; the main use is comparison with the same athlete. Myer suggested that athletes showing six or more flaws be targeted for landing-technique training. Inter-rater reliability is moderate, so have the same rater score from video each time.')
  },
  {
    id: 'ts_ckcuest',
    name: t('اختبار ثبات الطرف العلوي في السلسلة المغلقة (CKCUEST)', 'Closed Kinetic Chain Upper Extremity Stability Test (CKCUEST)'),
    category: 'movement', sports: ['all'],
    measures: t('ثبات وتحكم الكتف ولوح الكتف تحت الحمل في وضع الضغط', 'Shoulder and scapular stability and control under load in a push-up position'),
    protocol: t('1) خطين على الأرض بينهم 91.4 سم (36 بوصة). 2) وضع الضغط والإيدين على الخطين (السيدات ممكن على الركبتين). 3) مع الإشارة: إيد تلمس الإيد التانية وترجع، وبعدين التانية، بالتبادل بأسرع ما يمكن لمدة 15 ثانية. 4) عدّ اللمسات. 5) 3 محاولات بينهم راحة 45 ثانية وخد المتوسط.', '1) Two tape lines 91.4 cm (36 in) apart. 2) Push-up position with hands on the lines (women may use the knee position). 3) On the signal, one hand crosses to touch the other and returns, then the other hand, alternating as fast as possible for 15 s. 4) Count the touches. 5) Three trials with 45 s rest; use the average.'),
    equipment: eq('tape', 'stopwatch'),
    unit: 'reps', better: 'higher',
    norms: [],
    source: 'Goldbeck TG, Davies GJ (2000) J Sport Rehabil 9:35-45; Tucci HT et al. (2014) BMC Musculoskelet Disord 15:1',
    notes: t('في دراسة Goldbeck & Davies المتوسط كان حوالي 18-19 لمسة للرجال وحوالي 20-21 للسيدات (على الركبتين). ممكن تحسب "درجة معيارية" = عدد اللمسات ÷ طول الجسم (بالبوصة). مفيد في مراحل الرجوع للعب بعد إصابات الكتف ولرياضات الرمي والجمباز. وقّف لو فيه ألم.', 'In Goldbeck & Davies the average was about 18-19 touches for men and about 20-21 for women (knee position). A normalised score = touches ÷ body height (inches) is sometimes used. Useful in return-to-play after shoulder injury and for throwing and gymnastics athletes. Stop if painful.')
  }
];

/* @@PART3@@ */

/* ================= رد الفعل والتوافق ================= */
const P_REACTION = [
  {
    id: 'ts_ruler_drop',
    name: t('اختبار التقاط المسطرة (رد الفعل)', 'Ruler drop test (reaction time)'),
    category: 'reaction', sports: ['all'],
    measures: t('زمن رد الفعل البسيط للإيد للمثير البصري', 'Simple visual reaction time of the hand'),
    protocol: t('1) المختبَر قاعد وساعده على ترابيزة والإيد طالعة بره الحرف، والإبهام والسبابة مفتوحين حوالي 3 سم. 2) المختبِر يمسك المسطرة رأسيًا بحيث الصفر يكون عند الحافة العليا للإبهام. 3) من غير إنذار وبعد وقت عشوائي (1-3 ثواني) يسيب المسطرة. 4) المختبَر يقفلها بأسرع ما يمكن. 5) سجّل المسافة بالسنتيمتر عند الحافة العليا للإبهام. 6) اعمل 3-5 محاولات وخد المتوسط (أو الأحسن، بس ثبّت الطريقة).', '1) The subject sits with the forearm on a table and the hand over the edge, thumb and index finger about 3 cm apart. 2) The tester holds the ruler vertically with zero level with the top of the thumb. 3) Without warning, after a random 1-3 s delay, the ruler is released. 4) The subject catches it as fast as possible. 5) Record the distance in cm at the top of the thumb. 6) Do 3-5 trials and use the average (or the best, but keep the same method).'),
    equipment: eq('ruler'),
    unit: 'cm', better: 'lower',
    norms: [],
    source: 'Davis B et al. (2000) Physical Education and the Study of Sport, Harcourt (reproduced by Topend Sports); time conversion from free-fall physics',
    notes: t('حوّل المسافة لزمن: الزمن (ث) = الجذر التربيعي لـ (2 × المسافة بالمتر ÷ 9.81). مثلًا 15 سم ≈ 0.175 ثانية و20 سم ≈ 0.20 ثانية. جدول استرشادي متداول (Davis 2000، مش مقسم بالسن أو الجنس): أقل من 7.5 سم ممتاز، 7.5-15.9 فوق المتوسط، 15.9-20.4 متوسط، 20.4-28 أقل من المتوسط، أكتر من 28 ضعيف. علشان كده مش متسجل كمعايير رسمية؛ استخدمه للمقارنة مع نفس الشخص، وخلي الإيد والوقفة والوقت العشوائي ثابتين.', 'Convert distance to time: time (s) = square root of (2 × distance in metres ÷ 9.81). For example 15 cm ≈ 0.175 s and 20 cm ≈ 0.20 s. A widely reproduced indicative table (Davis 2000, not split by age or sex): under 7.5 cm excellent, 7.5-15.9 above average, 15.9-20.4 average, 20.4-28 below average, over 28 poor. It is therefore not entered as formal norms; use it for within-person comparison and keep the hand, position and random delay constant.')
  },
  {
    id: 'ts_light_reaction',
    name: t('اختبار رد الفعل بالأضواء (Blazepod / Fitlight)', 'Light-based reaction test (Blazepod / Fitlight style)'),
    category: 'reaction', sports: ['all'],
    measures: t('زمن رد الفعل والاختيار والحركة تجاه مثير ضوئي عشوائي، مع تغيير الاتجاه', 'Reaction, choice and movement time to random light cues, including change of direction'),
    protocol: t('1) رتّب 4-6 أضواء بشكل ثابت ومقاس (مثلًا نص دايرة نصف قطرها 1-1.5 متر أو على الحائط). 2) اختار وضع إضاءة عشوائي، وحدد يا إما مدة ثابتة (مثلًا 30 ثانية) يا إما عدد ثابت من الأضواء (مثلًا 20). 3) المختبَر يبدأ من نقطة البداية ويطفي كل ضوء أول ما ينور بالإيد أو الرجل حسب الهدف. 4) سجّل متوسط زمن رد الفعل لكل ضوء (أو عدد الإصابات في المدة). 5) محاولة تعريفية ومحاولتين مسجلين براحة كافية.', '1) Set 4-6 lights in a fixed, measured layout (e.g. a semicircle of 1-1.5 m radius, or on a wall). 2) Choose a random lighting mode and fix either the duration (e.g. 30 s) or the number of cues (e.g. 20). 3) From a start point the subject switches off each light as soon as it turns on, with hand or foot as intended. 4) Record mean reaction time per cue (or total hits in the time). 5) One familiarisation and two recorded trials with full rest.'),
    equipment: eq('light_board', 'tape_m', 'cones'),
    unit: 's', better: 'lower',
    norms: [],
    source: 'Manufacturer testing protocols (Blazepod, Fitlight Trainer); no consensus normative data published',
    notes: t('مفيش معايير منشورة معتمدة، لأن النتيجة بتتغير جدًا مع عدد الأضواء والمسافة بينهم ونوع الجهاز ووضع الإضاءة. الاستخدام الصح: ثبّت نفس الإعداد بالظبط وقارن الرياضي بنفسه أو بزمايله في نفس الفريق. لو عايز تقيس اتخاذ القرار ضيف ألوان "اضرب / متضربش" (go / no-go) وسجّل الأخطاء جنب الزمن.', 'There are no accepted published norms because results change greatly with the number of lights, spacing, device and lighting mode. Correct use: keep the exact same setup and compare the athlete with themself or with team-mates on the same setup. To test decision-making add go / no-go colours and record errors alongside time.')
  },
  {
    id: 'ts_batak_wall',
    name: t('حائط رد الفعل (Batak)', 'Batak / wall reaction board'),
    category: 'reaction', sports: ['all'],
    measures: t('سرعة رد الفعل البصري الحركي والتوافق بين العين والإيد ومجال الرؤية الجانبي', 'Visual-motor reaction speed, hand-eye coordination and peripheral awareness'),
    protocol: t('1) اضبط ارتفاع اللوحة بحيث مركزها في مستوى الكتف، والمختبَر واقف على مسافة ثابتة يقدر يوصل منها لكل الأضواء. 2) اختار وضع ثابت (الشائع: 60 ثانية والضوء يفضل منور لحد ما يتضرب). 3) مع البداية اضرب كل ضوء ينور بأسرع ما يمكن بأي إيد. 4) سجّل عدد الإصابات (وفي بعض الأوضاع متوسط زمن رد الفعل). 5) محاولة تعريفية ومحاولة أو اتنين مسجلين.', '1) Set the board so its centre is at shoulder height, with the subject at a fixed distance from which every light is reachable. 2) Choose a fixed mode (commonly 60 s, with each light staying on until hit). 3) On start, strike each light as it comes on as fast as possible with either hand. 4) Record the number of hits (some modes also give mean reaction time). 5) One familiarisation and one or two recorded trials.'),
    equipment: eq('batak'),
    unit: 'score', better: 'higher',
    norms: [],
    source: 'Batak manufacturer protocols (Quotronics); used in motorsport and team-sport testing',
    notes: t('مفيش جداول معتمدة بالسن أو الجنس، والأرقام المتداولة على النت مرتبطة بموديل الجهاز ووضعه. قارن الشخص بنفسه على نفس الجهاز ونفس الوضع. التعلم بيحسّن النتيجة بسرعة في أول كام مرة، فاعمل جلسات تعريف قبل ما تعتمد على رقم مرجعي.', 'There are no accepted age or sex tables, and figures quoted online are tied to the device model and mode. Compare the person with themself on the same device and mode. Learning improves scores quickly over the first few sessions, so familiarise before setting a baseline.')
  },
  {
    id: 'ts_plate_tapping',
    name: t('اختبار النقر على الأقراص (Plate tapping)', 'Plate tapping test'),
    category: 'reaction', sports: ['all'],
    population: t('الأطفال والمراهقين (من بطارية يوروفيت) والبالغين', 'Children and adolescents (Eurofit item) and adults'),
    measures: t('سرعة حركة الطرف العلوي والتوافق', 'Speed of upper-limb movement and coordination'),
    protocol: t('1) ترابيزة بارتفاع مناسب عليها قرصين قطر 20 سم بين مركزيهم 80 سم، ومستطيل في النص. 2) الإيد الأضعف على المستطيل طول الاختبار. 3) الإيد القوية تنقل بين القرصين وتلمس كل قرص بالتبادل فوق الإيد التانية. 4) 25 دورة كاملة (50 لمسة) بأسرع ما يمكن. 5) سجّل الزمن بالثانية، ومحاولتين وخد الأحسن.', '1) A table at a suitable height with two 20 cm discs 80 cm apart (centre to centre) and a rectangle midway. 2) The non-preferred hand stays on the rectangle throughout. 3) The preferred hand moves back and forth over the other hand, touching each disc alternately. 4) 25 full cycles (50 touches) as fast as possible. 5) Record the time in seconds; two trials, use the best.'),
    equipment: eq('plate_table', 'stopwatch'),
    unit: 's', better: 'lower',
    norms: [],
    source: 'Council of Europe (1988) Eurofit: Handbook for the Eurofit Tests of Physical Fitness',
    notes: t('فيه جداول مئينية قومية من دول أوروبية مختلفة، بس مفيش جدول واحد معتمد دوليًا ينفع ننقله هنا بثقة. استخدمه للمقارنة مع نفس الشخص أو مع جداول قومية لو متاحة لبلدك. لو القرص ما اتلمسش في أي لمسة، اللمسة دي تتعاد.', 'National percentile tables exist from several European countries, but there is no single internationally accepted table we can reproduce with confidence. Use it for within-person comparison or with national tables if available. A missed disc touch must be repeated.')
  }
];

/* ================= صحي ووظيفي (كبار السن أساسًا) ================= */
// نبض الراحة، ضغط الدم، نسبة الوسط للطول، مشي 6 دقايق الإكلينيكي، قوة القبضة،
// الجلوس والوصول (CSEP) وحكّ الضهر موجودين في tests-general.js.
const P_HEALTH = [
  {
    id: 'ts_sft_chair_stand',
    name: t('اختبار القيام من الكرسي 30 ثانية', '30-second chair stand'),
    category: 'health', sports: ['all'],
    population: t('كبار السن 60-94 سنة (Senior Fitness Test)', 'Older adults 60-94 (Senior Fitness Test)'),
    measures: t('قوة وتحمل الطرف السفلي اللازمين للأنشطة اليومية (القيام، السلالم، المشي)', 'Lower-body strength and endurance for daily tasks (rising, stairs, walking)'),
    protocol: t('1) الكرسي مسنود على الحيطة، والمختبَر قاعد في نص المقعد، الضهر مفرود والقدمين على الأرض بعرض الكتف. 2) الدراعين متقاطعين على الصدر. 3) مع إشارة البداية يقوم وقفة كاملة ويرجع يقعد قعدة كاملة، ويكرر بأقصى عدد في 30 ثانية. 4) لو كان أكتر من نص الطريق لفوق عند نهاية الوقت تتحسب عدّة. 5) عدّة أو اتنين للتعريف ثم محاولة واحدة مسجلة.', '1) Chair against a wall; the subject sits mid-seat, back straight, feet flat shoulder-width apart. 2) Arms crossed on the chest. 3) On the signal, rise to a full stand and return to a full sit, repeating as many times as possible in 30 s. 4) If more than halfway up when time ends, it counts as a stand. 5) One or two practice reps, then one recorded trial.'),
    equipment: eq('chair', 'stopwatch'),
    unit: 'reps', better: 'higher',
    norms: [
      ...sftHi('m', [[14, 19], [12, 18], [12, 17], [11, 17], [10, 15], [8, 14], [7, 12]]),
      ...sftHi('f', [[12, 17], [11, 16], [10, 15], [10, 15], [9, 14], [8, 13], [4, 11]])
    ],
    source: SFT_SRC,
    notes: t(SFT_NOTE_AR + ' أقل من 8 عدّات (للجنسين) معيار Rikli & Jones لخطر فقدان الاستقلالية الحركية. وقّف الاختبار لو فيه ألم أو دوخة.', SFT_NOTE_EN + ' Fewer than 8 stands (both sexes) is the Rikli & Jones marker of risk of losing functional independence. Stop if there is pain or dizziness.')
  },
  {
    id: 'ts_sft_arm_curl',
    name: t('اختبار ثني الذراع بالدمبل 30 ثانية', '30-second arm curl'),
    category: 'health', sports: ['all'],
    population: t('كبار السن 60-94 سنة (Senior Fitness Test)', 'Older adults 60-94 (Senior Fitness Test)'),
    measures: t('قوة وتحمل الطرف العلوي للأنشطة اليومية (الشيل والحمل)', 'Upper-body strength and endurance for daily tasks (lifting and carrying)'),
    protocol: t('1) المختبَر قاعد على كرسي بدون مساند، الضهر مفرود، والجنب القوي قريب من طرف الكرسي. 2) الدمبل في الإيد القوية والدراع مفرود لتحت، والكف ناحية الجسم. 3) مع البداية اثني الكوع للآخر مع لف الكف لفوق، وارجع افرد للآخر. 4) أقصى عدد في 30 ثانية والكوع ثابت جنب الجسم. 5) عدّة أو اتنين للتعريف ثم محاولة مسجلة.', '1) The subject sits on an armless chair, back straight, dominant side near the chair edge. 2) Dumbbell in the dominant hand, arm hanging straight, palm facing the body. 3) On the signal, curl through the full range while turning the palm up, then fully extend. 4) As many as possible in 30 s, elbow kept against the side. 5) One or two practice reps, then one recorded trial.'),
    equipment: eq('chair', 'dumbbell_sft', 'stopwatch'),
    unit: 'reps', better: 'higher',
    norms: [
      ...sftHi('m', [[16, 22], [15, 21], [14, 21], [13, 19], [13, 19], [11, 17], [10, 14]], 1, 1),
      ...sftHi('f', [[13, 19], [12, 18], [12, 17], [11, 17], [10, 16], [10, 15], [8, 13]])
    ],
    source: SFT_SRC,
    notes: t(SFT_NOTE_AR + ' الوزن: 5 باوند (2.27 كجم) للسيدات و8 باوند (3.63 كجم) للرجال؛ لو استخدمت وزن مختلف المعايير متنفعش.', SFT_NOTE_EN + ' Weight: 5 lb (2.27 kg) for women and 8 lb (3.63 kg) for men; norms do not apply to other weights.')
  },
  {
    id: 'ts_sft_6min_walk',
    name: t('اختبار المشي 6 دقايق (Senior Fitness Test)', '6-minute walk (Senior Fitness Test)'),
    category: 'health', sports: ['all'],
    population: t('كبار السن الأصحاء نسبيًا 60-94 سنة', 'Community-dwelling older adults 60-94'),
    measures: t('التحمل الهوائي اللازم للمشي والتسوق والأنشطة اليومية', 'Aerobic endurance for walking, shopping and daily activity'),
    protocol: t('1) مستطيل محيطه 45.7 متر (50 ياردة) متعلّم كل 4.57 متر (5 ياردة). 2) المختبَر يمشي بأسرع ما يقدر (من غير جري) حوالين المستطيل لمدة 6 دقايق، ومسموح يقف يرتاح ويكمّل. 3) اديله تنبيه بالوقت عند 3 دقايق و2 ودقيقة. 4) سجّل المسافة الكلية لأقرب علامة. 5) كرسي جنب المسار للراحة، ووقّف لو ظهرت أعراض.', '1) A 45.7 m (50 yd) rectangle marked every 4.57 m (5 yd). 2) The subject walks as fast as possible (no running) around it for 6 min; stopping to rest and continuing is allowed. 3) Call out time at 3, 2 and 1 min remaining. 4) Record total distance to the nearest mark. 5) Keep chairs beside the course and stop if symptoms appear.'),
    equipment: eq('sft_course', 'cones', 'stopwatch', 'tape_m'),
    unit: 'm', better: 'higher',
    norms: [
      ...sftHi('m', [[610, 735], [560, 700], [545, 680], [470, 640], [445, 605], [380, 570], [305, 500]], 0, 0.9144),
      ...sftHi('f', [[545, 660], [500, 635], [480, 615], [435, 585], [385, 540], [340, 510], [275, 440]], 0, 0.9144)
    ],
    source: SFT_SRC + ' (original values in yards, converted to metres)',
    notes: t(SFT_NOTE_AR + ' ده نسخة اللياقة لكبار السن (مشي بأسرع ما يمكن على مستطيل)؛ النسخة الإكلينيكية (ATS، ممر 30 متر وسرعة ذاتية) موجودة في المكتبة العامة باسم ts_6min_walk ومعاييرها مختلفة.', SFT_NOTE_EN + ' This is the older-adult fitness version (fast walking around a rectangle); the clinical ATS version (30 m corridor, self-paced) is in the general library as ts_6min_walk with different norms.')
  },
  {
    id: 'ts_sft_2min_step',
    name: t('اختبار الخطو مكانك دقيقتين', '2-minute step test'),
    category: 'health', sports: ['all'],
    population: t('كبار السن 60-94 سنة، بديل للمشي 6 دقايق لو المكان ضيق', 'Older adults 60-94; alternative to the 6-minute walk when space is limited'),
    measures: t('التحمل الهوائي', 'Aerobic endurance'),
    protocol: t('1) حدد ارتفاع الركبة المطلوب: نص المسافة بين صابونة الركبة وعظمة الحوض الأمامية، وعلّمه على الحيطة. 2) المختبَر يخطو مكانه (مش جري) لمدة دقيقتين ويرفع كل ركبة لحد العلامة. 3) عدّ مرات وصول الركبة اليمين للعلامة. 4) لو مقدرش يوصل للارتفاع، اطلب منه يبطّأ أو يقف ويكمّل والوقت شغال. 5) مسموح يسند بإيد على الحيطة أو كرسي للتوازن.', '1) Set the knee target: midway between the kneecap and the front hip bone (iliac crest), marked on a wall. 2) The subject steps in place (not running) for 2 min, raising each knee to the mark. 3) Count how many times the right knee reaches the mark. 4) If the height cannot be kept, ask them to slow or pause while the clock runs. 5) A hand on a wall or chair for balance is allowed.'),
    equipment: eq('wall', 'tape', 'tape_m', 'stopwatch'),
    unit: 'reps', better: 'higher',
    norms: [
      ...sftHi('m', [[87, 115], [86, 116], [80, 110], [73, 109], [71, 103], [59, 91], [52, 86]]),
      ...sftHi('f', [[75, 107], [73, 107], [68, 101], [68, 100], [60, 90], [55, 85], [44, 72]])
    ],
    source: SFT_SRC,
    notes: t(SFT_NOTE_AR + ' العدّ على الرجل اليمين بس (الخطوات الكلية = الضعف تقريبًا).', SFT_NOTE_EN + ' Count the right knee only (total steps are roughly double).')
  },
  {
    id: 'ts_sft_8ft_up_go',
    name: t('اختبار القيام والمشي 8 أقدام (2.44 متر)', '8-foot up-and-go'),
    category: 'health', sports: ['all'],
    population: t('كبار السن 60-94 سنة (Senior Fitness Test)', 'Older adults 60-94 (Senior Fitness Test)'),
    measures: t('الرشاقة والتوازن الديناميكي وسرعة الحركة الوظيفية', 'Agility, dynamic balance and functional mobility speed'),
    protocol: t('1) كرسي مسنود على الحيطة وقمع على بعد 2.44 متر (8 أقدام) من الحافة الأمامية للمقعد. 2) المختبَر قاعد، الإيدين على الفخذين والقدمين على الأرض. 3) مع "ابدأ" يقوم ويمشي بأسرع ما يقدر (من غير جري) يلف حوالين القمع من أي ناحية ويرجع يقعد. 4) الوقت من "ابدأ" لحد ما يقعد تمامًا. 5) محاولة تعريفية ومحاولتين، وسجّل الأحسن لأقرب 0.1 ثانية.', '1) Chair against a wall and a cone 2.44 m (8 ft) from the front edge of the seat. 2) The subject sits, hands on thighs, feet flat. 3) On "go", rise, walk as quickly as possible (no running) around the cone on either side and sit back down. 4) Time from "go" until fully seated. 5) One practice and two trials; record the best to the nearest 0.1 s.'),
    equipment: eq('chair', 'cones', 'tape_m', 'stopwatch'),
    unit: 's', better: 'lower',
    norms: [
      ...sftLo('m', [[3.8, 5.6], [4.3, 5.9], [4.4, 6.2], [4.6, 7.2], [5.2, 7.6], [5.5, 8.9], [6.2, 10.0]]),
      ...sftLo('f', [[4.4, 6.0], [4.8, 6.4], [4.9, 7.1], [5.2, 7.4], [5.7, 8.7], [6.2, 9.6], [7.3, 11.5]])
    ],
    source: SFT_SRC,
    notes: t(SFT_NOTE_AR + ' هنا الأقل أحسن: أسرع من المدى = جيد. Rikli & Jones اعتبروا أكتر من حوالي 9 ثواني مؤشر لخطر السقوط وفقدان الاستقلالية. ده غير اختبار TUG الإكلينيكي (3 متر وسرعة عادية).', SFT_NOTE_EN + ' Lower is better here: faster than the range = good. Rikli & Jones regard more than about 9 s as a marker of fall risk and loss of independence. This differs from the clinical TUG (3 m at usual pace).')
  },
  {
    id: 'ts_sft_chair_sit_reach',
    name: t('اختبار الجلوس والوصول على الكرسي', 'Chair sit-and-reach'),
    category: 'health', sports: ['all'],
    population: t('كبار السن 60-94 سنة (Senior Fitness Test)', 'Older adults 60-94 (Senior Fitness Test)'),
    measures: t('مرونة العضلات الخلفية للفخذ وأسفل الضهر', 'Hamstring and lower-back flexibility'),
    protocol: t('1) المختبَر قاعد على حافة الكرسي (المسنود على الحيطة). 2) رجل مفرودة لقدام والكعب على الأرض والقدم مثنية 90 درجة، والرجل التانية مثنية والقدم على الأرض. 3) الإيدين فوق بعض والصوابع الوسطى على نفس المستوى. 4) ينحني لقدام ببطء والضهر مفرود ويحاول يوصل لصوابع الرجل أو يعدّيها، ويثبت ثانيتين والركبة مفرودة. 5) قيس المسافة بين طرف الصابع الوسطى وطرف الحذاء: سالب لو موصلش، موجب لو عدّى. 6) محاولتين تعريف ومحاولتين مسجلين، وخد الأحسن.', '1) The subject sits on the front edge of a chair placed against a wall. 2) One leg extended, heel on the floor and ankle at 90°; the other knee bent with the foot flat. 3) Hands overlapped with middle fingers level. 4) Slowly bend forward, back straight, reaching towards or past the toes, and hold 2 s with the knee straight. 5) Measure from the middle fingertip to the tip of the shoe: negative if short, positive if past. 6) Two practice and two recorded trials; use the best.'),
    equipment: eq('chair', 'ruler'),
    unit: 'cm', better: 'higher',
    norms: [
      ...sftHi('m', [[-2.5, 4.0], [-3.0, 3.0], [-3.0, 3.0], [-4.0, 2.0], [-5.5, 1.5], [-5.5, 0.5], [-6.5, -0.5]], 0, 2.54),
      ...sftHi('f', [[-0.5, 5.0], [-0.5, 4.5], [-1.0, 4.0], [-1.5, 3.5], [-2.0, 3.0], [-2.5, 2.5], [-4.5, 1.0]], 0, 2.54)
    ],
    source: SFT_SRC + ' (original values in inches, converted to cm)',
    notes: t(SFT_NOTE_AR + ' الأرقام سالبة لما الصوابع متوصلش لطرف الحذاء. جرّب الناحيتين واختبر الرجل الأفضل وسجّل الناحية. اختبار الجلوس والوصول العادي على الأرض (CSEP) موجود في المكتبة العامة.', SFT_NOTE_EN + ' Scores are negative when the fingertips fall short of the shoe. Try both sides, test the preferred leg and record which side. The standard floor sit-and-reach (CSEP) is in the general library.')
  },
  {
    id: 'ts_tug',
    name: t('اختبار القيام والمشي الموقوت (TUG)', 'Timed Up and Go (TUG)'),
    category: 'health', sports: ['all'],
    population: t('كبار السن وبرامج التأهيل وتقييم خطر السقوط', 'Older adults, rehabilitation and fall-risk screening'),
    measures: t('الحركة الوظيفية والتوازن الديناميكي وخطر السقوط', 'Functional mobility, dynamic balance and fall risk'),
    protocol: t('1) كرسي بمساند (ارتفاع المقعد حوالي 46 سم) وخط على الأرض على بعد 3 متر. 2) المختبَر قاعد والضهر مسنود، لابس جزمته العادية، ومعاه أداة المشي لو بيستخدمها. 3) مع "ابدأ" يقوم ويمشي بسرعته العادية الآمنة لحد الخط، يلف، ويرجع يقعد. 4) الوقت من "ابدأ" لحد ما ضهره يلمس الكرسي. 5) محاولة تعريفية ثم محاولة مسجلة، ولاحظ جودة المشي والتوازن في اللفة.', '1) Chair with armrests (seat about 46 cm) and a floor line 3 m away. 2) The subject sits back in the chair, in usual footwear, with their usual walking aid if any. 3) On "go", stand, walk at a usual safe pace to the line, turn, walk back and sit. 4) Time from "go" until the back touches the chair. 5) One practice then one recorded trial; observe gait quality and balance during the turn.'),
    equipment: eq('armchair', 'tape', 'stopwatch'),
    unit: 's', better: 'lower',
    norms: [
      NL('كبار السن 65 سنة فأكثر', 'Older adults 65+', 'any', [65, 99], [
        { r: 'good', max: 10 }, { r: 'average', min: 10, max: 13.5 },
        { r: 'below_average', min: 13.5, max: 20 }, { r: 'poor', min: 20 }
      ])
    ],
    source: 'Podsiadlo D, Richardson S (1991) J Am Geriatr Soc 39:142-148; Shumway-Cook A et al. (2000) Phys Ther 80:896-903; Bohannon RW (2006) J Geriatr Phys Ther 29:64-68',
    notes: t('التقسيم: أقل من 10 ثواني حركة طبيعية ومستقلة (Podsiadlo)، 13.5 ثانية أو أكتر خطر سقوط أعلى عند كبار السن في المجتمع (Shumway-Cook)، 20 ثانية أو أكتر غالبًا محتاج مساعدة في الحركة. متوسطات Bohannon التقريبية: 8.1 ثانية (60-69)، 9.2 (70-79)، 11.3 (80-99). برنامج STEADI (CDC) بيستخدم 12 ثانية أو أكتر كمؤشر خطر. الاختبار لوحده مش كفاية للحكم على خطر السقوط؛ ادمجه مع التاريخ المرضي واختبارات توازن تانية.', 'Bands: under 10 s normal independent mobility (Podsiadlo); 13.5 s or more higher fall risk in community-dwelling older adults (Shumway-Cook); 20 s or more usually needs mobility assistance. Bohannon\'s approximate means: 8.1 s (60-69), 9.2 s (70-79), 11.3 s (80-99). The CDC STEADI programme uses 12 s or more as a risk marker. The test alone is not enough to judge fall risk; combine it with history and other balance tests.')
  }
];

/* ================= بطاريات الاختبارات ================= */
const P_BATTERY = [
  {
    id: 'ts_eurofit',
    name: t('بطارية يوروفيت (Eurofit)', 'Eurofit test battery'),
    category: 'battery', sports: ['all'],
    population: t('تلاميذ المدارس تقريبًا 6-18 سنة (وفيه نسخة للبالغين)', 'School-age children about 6-18 (an adult version also exists)'),
    measures: t('اللياقة البدنية المرتبطة بالصحة والأداء الحركي العام', 'Health- and performance-related physical fitness'),
    protocol: t('1) القياسات الجسمية: الطول والوزن (وثنايا الجلد حسب الدليل). 2) الترتيب المقترح في الدليل: توازن الفلامنجو، النقر على الأقراص، الجلوس والوصول، الوثب العريض من الثبات، قوة القبضة، الجلوس من الرقود 30 ثانية، التعلق بثني الذراعين، الجري المكوكي 10×5 متر، وفي الآخر الجري المكوكي 20 متر. 3) كل اختبار بالبروتوكول الرسمي ونفس الإحماء. 4) سجّل كل نتيجة لوحدها.', '1) Anthropometry: height and weight (and skinfolds per the manual). 2) Recommended order: flamingo balance, plate tapping, sit-and-reach, standing broad jump, handgrip, sit-ups in 30 s, bent-arm hang, 10×5 m shuttle run, and finally the 20 m shuttle run. 3) Each item follows the official protocol with the same warm-up. 4) Record each result separately.'),
    equipment: eq('battery_kit', 'plate_table', 'mat', 'stopwatch', 'tape_m'),
    unit: 'score', better: 'higher',
    norms: [],
    source: 'Council of Europe (1988, 2nd ed. 1993) Eurofit: Handbook for the Eurofit Tests of Physical Fitness',
    notes: t('مفيش درجة كلية للبطارية. كل اختبار بيتقارن بجداول مئينية قومية حسب السن والجنس (كل دولة عاملة جداولها). كتير من الاختبارات دي موجودة كاختبارات منفصلة في المكتبة (الفلامنجو، النقر على الأقراص، الجلوس والوصول، الوثب العريض، القبضة، الجري المكوكي 20 متر) فقيّم كل واحد من مكانه.', 'There is no overall battery score. Each item is compared with national percentile tables by age and sex (each country produces its own). Many items exist as separate tests in this library (flamingo, plate tapping, sit-and-reach, broad jump, handgrip, 20 m shuttle run), so rate each from its own entry.')
  },
  {
    id: 'ts_fitnessgram',
    name: t('بطارية فيتنس جرام (FitnessGram)', 'FitnessGram'),
    category: 'battery', sports: ['all'],
    population: t('الأطفال والمراهقين في المدارس (تقريبًا 5-17 سنة)', 'School children and adolescents (about 5-17)'),
    measures: t('اللياقة المرتبطة بالصحة: هوائي، تركيب الجسم، قوة وتحمل عضلي، مرونة', 'Health-related fitness: aerobic capacity, body composition, muscular strength and endurance, flexibility'),
    protocol: t('1) التحمل الهوائي: اختبار PACER (جري مكوكي 20 أو 15 متر) أو جري ميل أو اختبار مشي. 2) تركيب الجسم: مؤشر كتلة الجسم أو ثنايا الجلد أو جهاز معاوقة كهربية. 3) عضلات البطن: كيرل أب بإيقاع. 4) قوة ومرونة الضهر: رفع الجذع. 5) الطرف العلوي: ضغط 90 درجة (أو عقلة معدّلة أو تعلق). 6) المرونة: جلوس ووصول "حماية الضهر" أو إطالة الكتف. 7) الترتيب والتفاصيل حسب الدليل الرسمي.', '1) Aerobic capacity: PACER (20 m or 15 m shuttle), one-mile run or walk test. 2) Body composition: BMI, skinfolds or bioelectrical impedance. 3) Abdominal: cadenced curl-up. 4) Trunk extensor strength and flexibility: trunk lift. 5) Upper body: 90° push-up (or modified pull-up, flexed-arm hang). 6) Flexibility: back-saver sit-and-reach or shoulder stretch. 7) Order and details per the official manual.'),
    equipment: eq('battery_kit', 'mat', 'metronome', 'tape_m'),
    unit: 'score', better: 'higher',
    norms: [],
    source: 'The Cooper Institute (2017) FitnessGram Administration Manual, 5th ed., Human Kinetics; Welk GJ, Meredith MD (eds.) FitnessGram/ActivityGram Reference Guide',
    notes: t('مش نظام نسب مئوية ومفيش درجة كلية. كل اختبار بيتقيّم بمعيار صحي حسب السن والجنس: "منطقة اللياقة الصحية" (Healthy Fitness Zone) أو "يحتاج تحسين"، وفي الهوائي وتركيب الجسم فيه كمان "يحتاج تحسين - خطر صحي". الهدف إن كل طفل يوصل للمنطقة الصحية، مش المقارنة بين الأطفال. الحدود موجودة في الدليل الرسمي وبتتحدّث، فارجع للنسخة الحالية.', 'It is not percentile-based and has no total score. Each item is rated against a health criterion for age and sex: Healthy Fitness Zone or Needs Improvement, with an extra Needs Improvement - Health Risk zone for aerobic capacity and body composition. The aim is for every child to reach the healthy zone, not to rank children. Cut-offs are in the official manual and are updated, so use the current edition.')
  },
  {
    id: 'ts_alpha_fit',
    name: t('بطارية ألفا-فِت (ALPHA-FIT)', 'ALPHA-FIT test battery'),
    category: 'battery', sports: ['all'],
    population: t('نسخة للبالغين 18-69 سنة، ونسخة ALPHA للأطفال والمراهقين', 'Adult version 18-69, and the ALPHA version for children and adolescents'),
    measures: t('اللياقة المرتبطة بالصحة بأدوات بسيطة تنفع في المجتمع والعيادات', 'Health-related fitness with simple field tools for community and primary-care use'),
    protocol: t('1) نسخة البالغين (UKK): مؤشر كتلة الجسم ومحيط الوسط، مشي 2 كم، الوقوف على رجل واحدة، المشي على شكل 8، حركة الكتف والرقبة، القفز واللمس، ضغط معدّل، جلوس من الرقود ديناميكي، قرفصاء على رجل واحدة، وقوة القبضة. 2) نسخة الأطفال والمراهقين (ALPHA): الجري المكوكي 20 متر، قوة القبضة، الوثب العريض، مؤشر كتلة الجسم، محيط الوسط، وثنايا الجلد (الترايسبس وتحت لوح الكتف)، والنسخة الموسعة بتضيف الجري المكوكي 4×10 متر. 3) كل اختبار حسب الدليل الرسمي.', '1) Adult version (UKK): BMI and waist circumference, 2-km walk, one-leg stand, figure-of-8 walk, shoulder-neck mobility, jump-and-reach, modified push-up, dynamic sit-up, one-leg squat and handgrip. 2) Child and adolescent version (ALPHA): 20 m shuttle run, handgrip, standing long jump, BMI, waist circumference and skinfolds (triceps, subscapular); the extended version adds the 4×10 m shuttle run. 3) Each item per the official manual.'),
    equipment: eq('battery_kit', 'tape_m', 'stopwatch', 'mat'),
    unit: 'score', better: 'higher',
    norms: [],
    source: 'Suni J et al. (2009) ALPHA-FIT Test Battery for Adults, UKK Institute; Ruiz JR et al. (2011) Br J Sports Med 45:518-524 (ALPHA battery for youth)',
    notes: t('مفيش درجة كلية واحدة. كل اختبار بيتقيّم لوحده بالمقارنة بجداول مرجعية حسب السن والجنس (للبالغين من بيانات UKK الفنلندية، وللأطفال من دراسات أوروبية زي HELENA). مشي 2 كم (UKK) وقوة القبضة والوثب العريض والجري المكوكي 20 متر موجودين كاختبارات منفصلة في المكتبة.', 'There is no single total score. Each item is rated separately against age- and sex-specific reference tables (Finnish UKK data for adults; European studies such as HELENA for youth). The 2-km walk (UKK), handgrip, broad jump and 20 m shuttle run exist as separate tests in this library.')
  },
  {
    id: 'ts_nfl_combine',
    name: t('اختبارات كومباين دوري كرة القدم الأمريكية (NFL Combine)', 'NFL Scouting Combine (summary)'),
    category: 'battery', sports: ['all'],
    population: t('لاعبي الرياضات الجماعية والقوة والسرعة (المرجع الأصلي: لاعبي كرة القدم الأمريكية)', 'Team, speed and power athletes (original reference: American football players)'),
    measures: t('السرعة والقدرة الانفجارية والرشاقة والتحمل العضلي للجزء العلوي', 'Speed, explosive power, agility and upper-body muscular endurance'),
    protocol: t('1) القياسات: الطول والوزن وطول الدراع وحجم الكف وفرد الدراعين. 2) عدو 40 ياردة (36.6 متر) مع زمن أول 10 ياردات. 3) أقصى تكرارات بنش بريس بوزن 225 باوند (102 كجم). 4) الوثب العمودي. 5) الوثب العريض. 6) اختبار الأقماع التلاتة (3-cone). 7) الجري المكوكي 20 ياردة (5-10-5). 8) إحماء كامل وراحة كافية بين الاختبارات، والاختبارات الانفجارية قبل اختبار البنش.', '1) Measurements: height, weight, arm length, hand size and wingspan. 2) 40-yard (36.6 m) dash with a 10-yard split. 3) Maximum bench-press repetitions at 225 lb (102 kg). 4) Vertical jump. 5) Broad jump. 6) Three-cone drill. 7) 20-yard (5-10-5) shuttle. 8) Full warm-up and adequate rest between tests, with explosive tests before the bench press.'),
    equipment: eq('battery_kit', 'cones', 'barbell', 'bench', 'tape_m', 'stopwatch'),
    unit: 'score', better: 'higher',
    norms: [],
    source: 'NFL Scouting Combine official drill descriptions (NFL.com); Robbins DW (2011) J Strength Cond Res 25:2661-2667',
    notes: t('مفيش درجة رسمية مجمّعة. كل اختبار بيتقارن بنتايج اللاعبين في نفس المركز. فيه مؤشرات غير رسمية زي RAS (Relative Athletic Score من 0 لـ10 حسب المركز) بيجمع النتايج مع الطول والوزن. أرقام لاعبي NFL مرجع للنخبة ومش مناسبة كمعايير للهواة أو الناشئين. اختبارات الأقماع التلاتة و5-10-5 والوثب العريض موجودة لوحدها في المكتبة العامة.', 'There is no official composite score. Each drill is compared with players at the same position. Unofficial indices such as RAS (Relative Athletic Score, 0-10 by position) combine results with height and weight. NFL figures are an elite reference and are not suitable norms for recreational or youth athletes. The three-cone, 5-10-5 and broad jump tests exist separately in the general library.')
  },
  {
    id: 'ts_acft_army',
    name: t('اختبار اللياقة القتالية للجيش الأمريكي (ACFT / AFT)', 'Army Combat Fitness Test (ACFT / AFT) summary'),
    category: 'battery', sports: ['all'],
    population: t('العسكريين ورجال الأمن والمتقدمين للكليات العسكرية، ومرجع للياقة الوظيفية العامة', 'Military, police and service applicants; a reference for general functional fitness'),
    measures: t('القوة القصوى والقدرة والتحمل العضلي واللاهوائي والهوائي في مهام شبيهة بالمهام القتالية', 'Maximal strength, power, muscular and anaerobic endurance and aerobic fitness in combat-like tasks'),
    protocol: t('1) رفعة ميتة بالبار السداسي 3 تكرارات بأقصى وزن. 2) رمي كرة طبية 10 رطل (4.5 كجم) لورا فوق الراس من الوقوف (في ACFT فقط). 3) ضغط مع رفع الإيدين من الأرض في دقيقتين. 4) عدو-سحب-حمل 5×50 متر (عدو، سحب زلاجة، حركة جانبية، حمل كيتلبل، عدو). 5) بلانك بأطول وقت. 6) جري 2 ميل (3.2 كم). 7) الترتيب ده ثابت ومحدد بالوقت بين الأحداث.', '1) Hex-bar deadlift, 3-repetition maximum. 2) Standing power throw of a 10 lb (4.5 kg) medicine ball backwards overhead (ACFT only). 3) Hand-release push-ups in 2 min. 4) Sprint-drag-carry 5×50 m (sprint, sled drag, lateral shuffle, kettlebell carry, sprint). 5) Plank for maximum time. 6) Two-mile (3.2 km) run. 7) The order is fixed with set rest between events.'),
    equipment: eq('battery_kit', 'barbell', 'cones', 'stopwatch', 'track'),
    unit: 'points', better: 'higher',
    norms: [],
    source: 'U.S. Army ACFT field testing manual (FM 7-22 and ACFT scoring tables, 2022); U.S. Army Fitness Test (AFT) announcement, 2025',
    notes: t('كل حدث بيتحسب من 0 لـ100 نقطة من جداول رسمية حسب السن والجنس. في ACFT كان فيه 6 أحداث (المجموع 600) والحد الأدنى 60 في كل حدث. في 2025 الجيش استبدله بـ AFT: 5 أحداث بعد حذف رمي الكرة الطبية (المجموع 500)، مع معايير موحدة للجنسين في التخصصات القتالية ومجموع أعلى مطلوب. الجداول الرسمية بتتحدّث، فارجع لأحدث نسخة قبل التقييم. مفيد كنموذج لاختبار اللياقة الوظيفية للضباط والمتقدمين.', 'Each event is scored 0-100 from official tables by age and sex. The ACFT had six events (600 total) with a minimum of 60 per event. In 2025 the Army replaced it with the AFT: five events after dropping the standing power throw (500 total), with sex-neutral standards and a higher total required for combat specialties. Official tables are revised, so check the current version before scoring. Useful as a model for functional fitness testing of officers and applicants.')
  }
];

export const SPORT_TESTS_GENERAL_B = [...P_MUSC_END, ...P_BALANCE, ...P_MOVEMENT, ...P_REACTION, ...P_HEALTH, ...P_BATTERY];
