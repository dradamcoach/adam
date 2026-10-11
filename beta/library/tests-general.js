/*
 * ADAM — مكتبة الاختبارات العامة (SPORT_TESTS_GENERAL)
 * =====================================================
 * اختبارات اللياقة والصحة الأكثر استخدامًا عالميًا، بالبروتوكول والأدوات والمعايير.
 * المعايير منقولة من مصادر منشورة ومذكور مصدرها في `source`.
 * لو الاختبار ملوش معايير منشورة معتمدة، `norms` فاضية والتفسير في `notes`.
 *
 * General fitness and health tests used worldwide, with protocol, equipment and norms.
 * Norms are taken from published sources named in `source`. Where no widely accepted
 * published norms exist, `norms` is empty and `notes` explains how to interpret results.
 */

const t = (ar, en) => ({ ar, en });
const AR_DIG = '٠١٢٣٤٥٦٧٨٩';
const ad = (s) => String(s).replace(/\d/g, (d) => AR_DIG[d]);

/* ---------- الأدوات ---------- */
const EQ = {
  tape: ['شريط قياس مرن غير قابل للمط', 'Non-stretch flexible measuring tape'],
  scale: ['ميزان', 'Weighing scale'],
  stadiometer: ['جهاز قياس الطول (Stadiometer)', 'Stadiometer'],
  caliper: ['كاليبر ثنايا الجلد (مثل Harpenden أو Lange)', 'Skinfold caliper (e.g. Harpenden or Lange)'],
  pen: ['قلم تعليم على الجلد', 'Skin marker pen'],
  calc: ['آلة حاسبة أو شيت حساب', 'Calculator or spreadsheet'],
  stopwatch: ['ساعة إيقاف', 'Stopwatch'],
  hrm: ['حزام أو ساعة قياس نبض', 'Heart-rate monitor'],
  bp: ['جهاز ضغط معتمد بكُم مقاسه مناسب للذراع', 'Validated BP monitor with a correctly sized cuff'],
  sr_box: ['صندوق الجلوس والوصول', 'Sit-and-reach box'],
  ruler: ['مسطرة أو متر', 'Ruler or measuring stick'],
  gonio: ['جونيوميتر أو إنكلينوميتر', 'Goniometer or inclinometer'],
  mat: ['مرتبة أرضية', 'Exercise mat'],
  plinth: ['سرير فحص', 'Treatment table (plinth)'],
  wall: ['حائط مستوي', 'Flat wall'],
  cones: ['أقماع', 'Cones'],
  gates: ['بوابات توقيت ضوئية (الأفضل) أو ساعة إيقاف', 'Timing gates (preferred) or stopwatch'],
  track: ['مضمار أو أرض مستوية مقاسة', 'Track or measured flat surface'],
  audio: ['ملف الصوت الرسمي للاختبار وسماعة', 'Official audio track and speaker'],
  step: ['سلمة أو بنش بارتفاع محدد', 'Step or bench of set height'],
  metronome: ['مترونوم', 'Metronome'],
  bench: ['بنش', 'Bench'],
  barbell: ['بار أوليمبي وأوزان', 'Olympic barbell and plates'],
  rack: ['راك سكوات بحواجز أمان', 'Squat rack with safety bars'],
  spotter: ['مساعد (سبوتر)', 'Spotter'],
  legpress: ['جهاز ليج بريس', 'Leg press machine'],
  dyn: ['دينامومتر قبضة اليد (مثل Jamar أو Takei)', 'Handgrip dynamometer (e.g. Jamar or Takei)'],
  force_plate: ['منصة قوة (Force plate)', 'Force plate'],
  imtp_rig: ['بار ثابت قابل لضبط الارتفاع أو راك خاص', 'Fixed, height-adjustable bar or IMTP rig'],
  jump_mat: ['بساط قياس الوثب أو تطبيق فيديو معتمد (مثل My Jump)', 'Jump mat or validated video app (e.g. My Jump)'],
  chalk: ['طباشير', 'Chalk'],
  jump_board: ['لوح أو حائط مدرّج بالسنتيمتر', 'Wall board marked in centimetres'],
  medball: ['كرة طبية', 'Medicine ball'],
  box: ['صندوق ثابت بارتفاع محدد', 'Stable box of set height'],
  chair: ['كرسي بدون مساند، ارتفاع المقعد حوالي 43 سم، مسنود على الحائط', 'Armless chair, seat about 43 cm, placed against a wall'],
  dumbbell: ['دمبل', 'Dumbbell'],
  pullbar: ['عقلة', 'Pull-up bar'],
  bike: ['عجلة ثابتة مُعايرة (مثل Monark)', 'Calibrated cycle ergometer (e.g. Monark)'],
  treadmill: ['سير متحرك', 'Treadmill'],
  floor_tape: ['شريط لاصق للأرض', 'Floor tape'],
  ybal: ['جهاز Y-Balance أو شريط لاصق وشريط قياس', 'Y-Balance kit, or floor tape and measuring tape'],
  foam: ['وسادة إسفنج متوسطة الكثافة', 'Medium-density foam pad'],
  fms_kit: ['طقم FMS (لوح، عصا، حاجز)', 'FMS kit (board, dowel, hurdle)'],
  dowel: ['عصا خشب', 'Dowel'],
  camera: ['كاميرا أو موبايل للتصوير', 'Camera or phone for video'],
  light_board: ['نظام أضواء تفاعلي (مثل Blazepod أو Fitlight أو Dynavision)', 'Reactive light system (e.g. Blazepod, Fitlight, Dynavision)'],
  tape_m: ['شريط قياس طويل', 'Long measuring tape'],
  sled: ['زلاجة سحب', 'Drag sled'],
  kettlebells: ['كيتل بل', 'Kettlebells'],
  hexbar: ['بار سداسي (Hex bar)', 'Hex (trap) bar'],
  lab: ['جهاز تحليل غازات (معمل)', 'Metabolic cart (laboratory)'],
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
const R7 = ['excellent', 'very_good', 'good', 'average', 'below_average', 'poor', 'very_poor'];
const RPCT = ['excellent', 'very_good', 'good', 'average', 'below_average', 'poor']; // >=P90, P70, P50, P30, P10

/* جدول VO2max — Cooper Institute (Heyward 1998) — مستخدم في أكتر من اختبار بيقدّر VO2max */
const R_VO2 = ['excellent', 'very_good', 'good', 'average', 'poor', 'very_poor'];
const vo2Norms = () => [
  ...table('m', R_VO2, [
    [13, 19, 56.0, 51.0, 45.2, 38.4, 35.0],
    [20, 29, 52.5, 46.5, 42.5, 36.5, 33.0],
    [30, 39, 49.5, 45.0, 41.0, 35.5, 31.5],
    [40, 49, 48.1, 43.8, 39.0, 33.6, 30.2],
    [50, 59, 45.4, 41.0, 35.8, 31.0, 26.1],
    [60, 99, 44.3, 36.5, 32.3, 26.1, 20.5]
  ]),
  ...table('f', R_VO2, [
    [13, 19, 42.0, 39.0, 35.0, 31.0, 25.0],
    [20, 29, 41.1, 37.0, 33.0, 29.0, 23.6],
    [30, 39, 40.1, 35.7, 31.5, 27.0, 22.8],
    [40, 49, 37.0, 32.9, 29.0, 24.5, 21.0],
    [50, 59, 35.8, 31.5, 27.0, 22.8, 20.2],
    [60, 99, 31.5, 30.3, 24.5, 20.2, 17.5]
  ])
];
const VO2_SRC = 'Cooper Institute, Physical Fitness Specialist Manual (1997), reproduced in Heyward VH, Advanced Fitness Assessment and Exercise Prescription (1998)';

/* ================= قياسات الجسم وتركيبه ================= */
const P_BODY = [
  {
    id: 'ts_bmi',
    name: t('مؤشر كتلة الجسم (BMI)', 'Body mass index (BMI)'),
    category: 'body_comp', sports: ['all'],
    population: t('البالغين 18 سنة فأكثر (للأطفال استخدم منحنيات النمو حسب السن)', 'Adults 18+ (use age-specific growth charts for children)'),
    measures: t('نسبة الوزن للطول كمؤشر تقريبي لزيادة الوزن والسمنة', 'Weight relative to height as a rough screen for overweight and obesity'),
    protocol: t('1) قيس الطول حافي بالمتر. 2) قيس الوزن بهدوم خفيفة بالكيلو. 3) احسب: الوزن ÷ (الطول × الطول).', '1) Measure height barefoot in metres. 2) Measure weight in light clothing in kg. 3) Calculate weight ÷ height².'),
    equipment: eq('stadiometer', 'scale', 'calc'),
    unit: 'kg/m2', better: 'lower',
    norms: [NL('البالغين (تصنيف منظمة الصحة العالمية)', 'Adults (WHO classification)', 'any', [18, 99], [
      { r: 'below_average', max: 18.5 }, { r: 'excellent', min: 18.5, max: 25 }, { r: 'average', min: 25, max: 30 },
      { r: 'poor', min: 30, max: 35 }, { r: 'very_poor', min: 35 }
    ])],
    source: 'WHO (2000) Obesity: preventing and managing the global epidemic, Technical Report Series 894',
    notes: t('التصنيف: أقل من 18.5 نحافة، 18.5-24.9 طبيعي، 25-29.9 زيادة وزن، 30-34.9 سمنة درجة أولى، 35-39.9 درجة تانية، 40 فأكثر درجة تالتة. المؤشر ده مبيفرّقش بين العضل والدهون، فممكن يطلع عالي عند لاعبي القوة وكمال الأجسام من غير دهون زيادة — كمّله بمحيط الوسط أو نسبة الدهون.', 'Categories: <18.5 underweight, 18.5-24.9 normal, 25-29.9 overweight, 30-34.9 obesity class I, 35-39.9 class II, 40+ class III. BMI does not separate muscle from fat, so it overestimates fatness in muscular athletes; pair it with waist circumference or body fat %.')
  },
  {
    id: 'ts_waist_circumference',
    name: t('محيط الوسط', 'Waist circumference'),
    category: 'body_comp', sports: ['all'],
    measures: t('دهون البطن (الدهون الحشوية) والخطر الصحي المرتبط بيها', 'Abdominal (visceral) fat and associated health risk'),
    protocol: t('1) الشخص واقف ورجليه مقفولين والبطن مرتخي. 2) حدد نص المسافة بين آخر ضلع وأعلى عظمة الحوض على الجنب. 3) لف الشريط أفقي حوالين الجسم عند النقطة دي من غير ضغط على الجلد. 4) اقرأ في نهاية زفير عادي. 5) كرر مرتين وخد المتوسط (لو الفرق أكتر من 1 سم قيس تالت).', '1) Subject stands with feet together and abdomen relaxed. 2) Locate the midpoint between the lowest rib and the top of the iliac crest at the side. 3) Wrap the tape horizontally at that level without compressing the skin. 4) Read at the end of a normal exhalation. 5) Take two readings and average them (take a third if they differ by more than 1 cm).'),
    equipment: eq('tape'),
    unit: 'cm', better: 'lower',
    norms: [
      NL('رجال — خطر أيضي', 'Men — metabolic risk', 'm', null, [{ r: 'good', max: 94 }, { r: 'average', min: 94, max: 102 }, { r: 'poor', min: 102 }]),
      NL('سيدات — خطر أيضي', 'Women — metabolic risk', 'f', null, [{ r: 'good', max: 80 }, { r: 'average', min: 80, max: 88 }, { r: 'poor', min: 88 }])
    ],
    source: 'WHO (2008) Waist circumference and waist-hip ratio: report of a WHO expert consultation; IDF (2006) consensus',
    notes: t('رجال: 94 سم فأكثر خطر زايد، 102 فأكثر خطر عالي جدًا. سيدات: 80 فأكثر خطر زايد، 88 فأكثر خطر عالي جدًا. الاتحاد الدولي للسكري بيطبّق حدود 94/80 على سكان الشرق الأوسط، وحدود أقل (90/80) لسكان جنوب وشرق آسيا.', 'Men: 94 cm+ increased risk, 102 cm+ substantially increased. Women: 80 cm+ increased, 88 cm+ substantially increased. The IDF applies the 94/80 cut-offs to Middle Eastern populations and lower ones (90/80) to South and East Asian populations.')
  },
  {
    id: 'ts_waist_hip_ratio',
    name: t('نسبة الوسط للأرداف', 'Waist-to-hip ratio'),
    category: 'body_comp', sports: ['all'],
    measures: t('توزيع الدهون وخطر أمراض القلب والتمثيل الغذائي', 'Fat distribution and cardiometabolic risk'),
    protocol: t('1) قيس محيط الوسط زي الاختبار السابق. 2) قيس محيط الأرداف عند أعرض جزء في المقعدة والشخص واقف ورجليه مقفولين. 3) احسب: الوسط ÷ الأرداف.', '1) Measure waist as in the waist circumference test. 2) Measure hips at the widest part of the buttocks, feet together. 3) Calculate waist ÷ hip.'),
    equipment: eq('tape', 'calc'),
    unit: 'score', better: 'lower',
    norms: [
      NL('رجال', 'Men', 'm', null, [{ r: 'good', max: 0.90 }, { r: 'poor', min: 0.90 }]),
      NL('سيدات', 'Women', 'f', null, [{ r: 'good', max: 0.85 }, { r: 'poor', min: 0.85 }])
    ],
    source: 'WHO (2008) Waist circumference and waist-hip ratio: report of a WHO expert consultation',
    notes: t('النسبة من 0.90 للرجال و0.85 للسيدات فأكثر معناها خطر متزايد بشكل كبير لأمراض القلب والسكري. جداول حسب السن (Bray & Gray 1988) موجودة في مراجع ACSM لو محتاج تفصيل أكتر.', 'A ratio of 0.90+ in men or 0.85+ in women indicates substantially increased cardiometabolic risk. Age-specific tables (Bray & Gray 1988) appear in ACSM texts if more detail is needed.')
  },
  {
    id: 'ts_waist_height_ratio',
    name: t('نسبة الوسط للطول', 'Waist-to-height ratio'),
    category: 'body_comp', sports: ['all'],
    measures: t('الدهون المركزية بالنسبة لطول الجسم — مؤشر بسيط لخطر أمراض القلب والسكري', 'Central fat relative to height — a simple screen for cardiometabolic risk'),
    protocol: t('1) قيس محيط الوسط بالسنتيمتر. 2) قيس الطول بالسنتيمتر. 3) احسب: الوسط ÷ الطول.', '1) Measure waist in cm. 2) Measure height in cm. 3) Calculate waist ÷ height.'),
    equipment: eq('tape', 'stadiometer'),
    unit: 'score', better: 'lower',
    norms: [NL('البالغين', 'Adults', 'any', [18, 99], [
      { r: 'below_average', max: 0.4 }, { r: 'excellent', min: 0.4, max: 0.5 }, { r: 'average', min: 0.5, max: 0.6 }, { r: 'poor', min: 0.6 }
    ])],
    source: 'Ashwell M, Gibson S (2016) BMJ Open; NICE obesity guideline CG189, 2022 update',
    notes: t('القاعدة البسيطة: خلّي محيط وسطك أقل من نص طولك. أقل من 0.4 ممكن يدل على نحافة، 0.4-0.49 صحي، 0.5-0.59 خطر متزايد، 0.6 فأكثر خطر عالي.', 'Simple rule: keep your waist below half your height. Below 0.4 may indicate underweight, 0.4-0.49 healthy, 0.5-0.59 increased risk, 0.6+ high risk.')
  },
  {
    id: 'ts_skinfold_jp3',
    name: t('ثنايا الجلد — جاكسون وبولوك 3 مواضع', 'Skinfolds — Jackson-Pollock 3-site'),
    category: 'body_comp', sports: ['all'],
    measures: t('مجموع 3 ثنايا جلد لتقدير كثافة الجسم ونسبة الدهون', 'Sum of three skinfolds to estimate body density and body fat %'),
    protocol: t('1) القياس على الجانب اليمين والشخص واقف مرتخي. 2) رجال: الصدر، البطن، الفخذ. سيدات: الترايسبس، فوق عظمة الحوض (suprailiac)، الفخذ. 3) امسك الثنية بالإبهام والسبابة وحط الكاليبر 1 سم تحت صوابعك واقرأ بعد 2 ثانية. 4) لف على المواضع 2-3 مرات وخد المتوسط (لو الفرق أكتر من 1-2 مم قيس تاني). 5) اجمع الثلاثة واحسب بالمعادلة.', '1) Measure on the right side with the subject standing relaxed. 2) Men: chest, abdomen, thigh. Women: triceps, suprailiac, thigh. 3) Pinch the fold with thumb and index finger, place the caliper 1 cm below the fingers and read after 2 s. 4) Rotate through the sites 2-3 times and average (re-measure if readings differ by more than 1-2 mm). 5) Sum the three sites and apply the equation.'),
    equipment: eq('caliper', 'pen', 'tape', 'calc'),
    unit: 'mm', better: 'lower',
    norms: [],
    source: 'Jackson AS, Pollock ML (1978) Br J Nutr; Jackson, Pollock, Ward (1980) Med Sci Sports Exerc; Siri (1961)',
    notes: t('المجموع (S) بالمليمتر يتحول لكثافة: رجال: الكثافة = 1.10938 − 0.0008267×S + 0.0000016×S² − 0.0002574×السن. سيدات: الكثافة = 1.0994921 − 0.0009929×S + 0.0000023×S² − 0.0001392×السن. بعدين نسبة الدهون (سيري) = (495 ÷ الكثافة) − 450. قيّم النتيجة من اختبار "نسبة الدهون". أهم حاجة إنك تتابع نفس الشخص بنفس المُقيّم ونفس الجهاز؛ المجموع نفسه بالمليمتر مفيد جدًا للمتابعة.', 'Convert the sum (S, mm) to density: Men: BD = 1.10938 − 0.0008267×S + 0.0000016×S² − 0.0002574×age. Women: BD = 1.0994921 − 0.0009929×S + 0.0000023×S² − 0.0001392×age. Then %fat (Siri) = (495 ÷ BD) − 450. Rate the result with the body fat % test. Use the same assessor and caliper for re-tests; the raw sum in mm is itself a very useful tracking metric.')
  },
  {
    id: 'ts_skinfold_jp7',
    name: t('ثنايا الجلد — جاكسون وبولوك 7 مواضع', 'Skinfolds — Jackson-Pollock 7-site'),
    category: 'body_comp', sports: ['all'],
    measures: t('مجموع 7 ثنايا جلد لتقدير نسبة الدهون بدقة أعلى', 'Sum of seven skinfolds for a more complete body fat estimate'),
    protocol: t('1) نفس طريقة القياس في اختبار الـ 3 مواضع. 2) المواضع السبعة: الصدر، تحت الإبط (midaxillary)، الترايسبس، تحت لوح الكتف، البطن، فوق عظمة الحوض، الفخذ. 3) لف مرتين على الأقل وخد المتوسط. 4) اجمع السبعة واحسب.', '1) Same technique as the 3-site test. 2) Seven sites: chest, midaxillary, triceps, subscapular, abdomen, suprailiac, thigh. 3) Take at least two rotations and average. 4) Sum the seven and apply the equation.'),
    equipment: eq('caliper', 'pen', 'tape', 'calc'),
    unit: 'mm', better: 'lower',
    norms: [],
    source: 'Jackson AS, Pollock ML (1978) Br J Nutr; Jackson, Pollock, Ward (1980) Med Sci Sports Exerc',
    notes: t('رجال: الكثافة = 1.112 − 0.00043499×S + 0.00000055×S² − 0.00028826×السن. سيدات: الكثافة = 1.097 − 0.00046971×S + 0.00000056×S² − 0.00012828×السن. نسبة الدهون = (495 ÷ الكثافة) − 450. قيّم النتيجة بجدول "نسبة الدهون".', 'Men: BD = 1.112 − 0.00043499×S + 0.00000055×S² − 0.00028826×age. Women: BD = 1.097 − 0.00046971×S + 0.00000056×S² − 0.00012828×age. %fat = (495 ÷ BD) − 450. Rate with the body fat % test.')
  },
  {
    id: 'ts_skinfold_durnin',
    name: t('ثنايا الجلد — دورنين وورمرسلي 4 مواضع', 'Skinfolds — Durnin-Womersley 4-site'),
    category: 'body_comp', sports: ['all'],
    measures: t('مجموع 4 ثنايا في الجزء العلوي لتقدير نسبة الدهون حسب السن والجنس', 'Sum of four upper-body skinfolds to estimate body fat by age and sex'),
    protocol: t('1) المواضع: البايسبس، الترايسبس، تحت لوح الكتف، فوق عظمة الحوض — على الجانب اليمين. 2) قيس كل موضع مرتين وخد المتوسط. 3) احسب اللوغاريتم العشري للمجموع وطبّق معادلة السن المناسب.', '1) Sites: biceps, triceps, subscapular, suprailiac — right side. 2) Measure each site twice and average. 3) Take log10 of the sum and apply the age-specific equation.'),
    equipment: eq('caliper', 'pen', 'calc'),
    unit: 'mm', better: 'lower',
    norms: [],
    source: 'Durnin JVGA, Womersley J (1974) Br J Nutr 32:77-97',
    notes: t('الكثافة = c − m × log10(المجموع). رجال: 17-19 (1.1620، 0.0630)، 20-29 (1.1631، 0.0632)، 30-39 (1.1422، 0.0544)، 40-49 (1.1620، 0.0700)، 50+ (1.1715، 0.0779). سيدات: 17-19 (1.1549، 0.0678)، 20-29 (1.1599، 0.0717)، 30-39 (1.1423، 0.0632)، 40-49 (1.1333، 0.0612)، 50+ (1.1339، 0.0645). بعدين سيري: (495 ÷ الكثافة) − 450.', 'BD = c − m × log10(sum). Men: 17-19 (1.1620, 0.0630), 20-29 (1.1631, 0.0632), 30-39 (1.1422, 0.0544), 40-49 (1.1620, 0.0700), 50+ (1.1715, 0.0779). Women: 17-19 (1.1549, 0.0678), 20-29 (1.1599, 0.0717), 30-39 (1.1423, 0.0632), 40-49 (1.1333, 0.0612), 50+ (1.1339, 0.0645). Then Siri: (495 ÷ BD) − 450.')
  },
  {
    id: 'ts_body_fat_percent',
    name: t('نسبة الدهون في الجسم', 'Body fat percentage'),
    category: 'body_comp', sports: ['all'],
    measures: t('نسبة كتلة الدهون من وزن الجسم الكلي', 'Fat mass as a percentage of total body mass'),
    protocol: t('1) قدّر النسبة بطريقة ثابتة: ثنايا الجلد، أو InBody/BIA، أو DEXA. 2) في حالة BIA: صايم 3-4 ساعات، مفيش تمرين قبلها بـ 12 ساعة، مثانة فاضية، ونفس ميعاد اليوم كل مرة. 3) قارن بالجدول واستخدم نفس الطريقة في كل متابعة.', '1) Estimate with one consistent method: skinfolds, BIA/InBody, or DEXA. 2) For BIA: 3-4 h fasted, no exercise in the previous 12 h, empty bladder, same time of day each test. 3) Compare with the table and keep the same method for every re-test.'),
    equipment: eq('caliper', 'scale'),
    unit: '%', better: 'lower',
    norms: [
      NL('رجال (تصنيف ACE)', 'Men (ACE categories)', 'm', null, [
        { r: 'below_average', max: 6 }, { r: 'excellent', min: 6, max: 14 }, { r: 'good', min: 14, max: 18 }, { r: 'average', min: 18, max: 25 }, { r: 'poor', min: 25 }
      ]),
      NL('سيدات (تصنيف ACE)', 'Women (ACE categories)', 'f', null, [
        { r: 'below_average', max: 14 }, { r: 'excellent', min: 14, max: 21 }, { r: 'good', min: 21, max: 25 }, { r: 'average', min: 25, max: 32 }, { r: 'poor', min: 32 }
      ])
    ],
    source: 'American Council on Exercise (ACE) body fat categories',
    notes: t('فئات ACE — رجال: دهون أساسية 2-5%، رياضيين 6-13%، لياقة 14-17%، متوسط 18-24%، سمنة 25% فأكثر. سيدات: أساسية 10-13%، رياضيات 14-20%، لياقة 21-24%، متوسط 25-31%، سمنة 32% فأكثر. النسبة تحت حدود الرياضيين (أقل من 6% للرجال و14% للسيدات) مش "أحسن" — ممكن تأثر على الهرمونات والمناعة والدورة الشهرية.', 'ACE categories — Men: essential 2-5%, athletes 6-13%, fitness 14-17%, average 18-24%, obese 25%+. Women: essential 10-13%, athletes 14-20%, fitness 21-24%, average 25-31%, obese 32%+. Values below the athletic range (under 6% men, 14% women) are not "better" and can affect hormones, immunity and menstrual function.')
  },
  {
    id: 'ts_navy_body_fat',
    name: t('نسبة الدهون بطريقة البحرية الأمريكية (المحيطات)', 'US Navy circumference body fat method'),
    category: 'body_comp', sports: ['all'],
    measures: t('تقدير نسبة الدهون من محيطات الرقبة والوسط (والأرداف للسيدات) والطول', 'Body fat estimate from neck, waist (and hip for women) circumferences and height'),
    protocol: t('1) الرقبة: تحت الحنجرة مباشرة والشريط مايل لتحت ناحية الأمام. 2) الوسط للرجال: عند مستوى السُّرة. الوسط للسيدات: أضيق نقطة. 3) الأرداف للسيدات: أعرض نقطة. 4) كل قياس 3 مرات وخد المتوسط. 5) طبّق المعادلة بالبوصة.', '1) Neck: just below the larynx, tape sloping slightly down at the front. 2) Men\'s waist: at the navel. Women\'s waist: narrowest point. 3) Women\'s hips: widest point. 4) Take each measure three times and average. 5) Apply the equation in inches.'),
    equipment: eq('tape', 'stadiometer', 'calc'),
    unit: '%', better: 'lower',
    norms: [],
    source: 'Hodgdon JA, Beckett MB (1984) Naval Health Research Center Reports 84-11 and 84-29',
    notes: t('بالبوصة — رجال: الدهون% = 86.010×log10(الوسط − الرقبة) − 70.041×log10(الطول) + 36.76. سيدات: الدهون% = 163.205×log10(الوسط + الأرداف − الرقبة) − 97.684×log10(الطول) − 78.387. قيّم بجدول "نسبة الدهون". الطريقة سريعة ومفيدة للمتابعة لكن هامش الخطأ حوالي ±3-4%.', 'In inches — Men: %BF = 86.010×log10(waist − neck) − 70.041×log10(height) + 36.76. Women: %BF = 163.205×log10(waist + hip − neck) − 97.684×log10(height) − 78.387. Rate with the body fat % test. Quick and useful for tracking, but error is roughly ±3-4%.')
  },
  {
    id: 'ts_resting_heart_rate',
    name: t('نبض الراحة', 'Resting heart rate'),
    category: 'body_comp', sports: ['all'],
    measures: t('عدد ضربات القلب في الدقيقة وقت الراحة — مؤشر على اللياقة الهوائية والاستشفاء', 'Heartbeats per minute at rest — an indicator of aerobic fitness and recovery'),
    protocol: t('1) الأفضل الصبح بعد الصحيان وقبل القهوة أو القيام من السرير. 2) استلقي 5 دقايق في هدوء. 3) عدّ النبض من الرسغ (radial) لمدة 60 ثانية أو استخدم حزام نبض. 4) خد متوسط 3-5 أيام.', '1) Ideally on waking, before caffeine or getting out of bed. 2) Lie quietly for 5 minutes. 3) Count the radial pulse for 60 s or use a chest strap. 4) Average 3-5 mornings.'),
    equipment: eq('stopwatch', 'hrm'),
    unit: 'bpm', better: 'lower',
    norms: [NL('البالغين', 'Adults', 'any', [18, 99], [
      { r: 'good', max: 60 }, { r: 'average', min: 60, max: 100 }, { r: 'poor', min: 100 }
    ])],
    source: 'American Heart Association — normal adult resting heart rate 60-100 bpm',
    notes: t('الطبيعي 60-100 نبضة/دقيقة. الرياضيين المدرّبين هوائيًا غالبًا 40-60. نبض تحت 60 عند شخص مش متدرب ومعاه دوخة أو إرهاق محتاج كشف طبي. ارتفاع نبض الصبح 5-10 نبضات عن المعتاد ممكن يدل على إرهاق أو بداية مرض أو قلة استشفاء.', 'Normal is 60-100 bpm; aerobically trained athletes are often 40-60. A rate under 60 in an untrained person with dizziness or fatigue needs medical review. A morning rise of 5-10 bpm above usual can signal fatigue, illness or poor recovery.')
  },
  {
    id: 'ts_blood_pressure',
    name: t('ضغط الدم', 'Blood pressure'),
    category: 'body_comp', sports: ['all'],
    measures: t('ضغط الدم الانقباضي والانبساطي وتصنيفه', 'Systolic and diastolic blood pressure and its category'),
    protocol: t('1) مفيش قهوة أو تدخين أو تمرين قبلها بـ 30 دقيقة. 2) قعدة مريحة 5 دقايق، الضهر مسنود، الرجلين على الأرض، الذراع مسنود في مستوى القلب. 3) الكُم على الجلد مباشرة. 4) خد قراءتين بينهم دقيقة وخد المتوسط. 5) التشخيص بيحتاج متوسط قراءات على أكتر من زيارة.', '1) No caffeine, smoking or exercise for 30 minutes before. 2) Sit quietly for 5 minutes, back supported, feet flat, arm supported at heart level. 3) Cuff on bare skin. 4) Take two readings one minute apart and average. 5) Diagnosis needs averaged readings across more than one visit.'),
    equipment: eq('bp'),
    unit: 'mmHg', better: 'lower',
    norms: [
      NL('الضغط الانقباضي (العالي)', 'Systolic', 'any', [18, 99], [
        { r: 'excellent', max: 120 }, { r: 'average', min: 120, max: 130 }, { r: 'below_average', min: 130, max: 140 }, { r: 'poor', min: 140, max: 180 }, { r: 'very_poor', min: 180 }
      ]),
      NL('الضغط الانبساطي (الواطي)', 'Diastolic', 'any', [18, 99], [
        { r: 'excellent', max: 80 }, { r: 'below_average', min: 80, max: 90 }, { r: 'poor', min: 90, max: 120 }, { r: 'very_poor', min: 120 }
      ])
    ],
    source: 'Whelton PK et al. (2017) ACC/AHA Guideline for High Blood Pressure in Adults; American Heart Association',
    notes: t('طبيعي: أقل من 120/80. مرتفع: 120-129 مع أقل من 80. مرحلة أولى: 130-139 أو 80-89. مرحلة تانية: 140/90 فأكثر. أزمة: أكتر من 180 و/أو 120 — محتاج تقييم طبي فوري. التصنيف بياخد الأعلى من الرقمين. أي حد في المرحلة التانية لازم إذن طبي قبل التمرين العنيف.', 'Normal: <120/80. Elevated: 120-129 with <80. Stage 1: 130-139 or 80-89. Stage 2: 140/90+. Crisis: >180 and/or >120 — needs immediate medical assessment. The higher category of the two numbers applies. Anyone in stage 2 needs medical clearance before vigorous exercise.')
  }
];

/* ================= المرونة ================= */
const P_FLEX = [
  {
    id: 'ts_sit_and_reach',
    name: t('اختبار الجلوس والوصول', 'Sit-and-reach test'),
    category: 'flexibility', sports: ['all'],
    measures: t('مرونة عضلات الخلفية وأسفل الضهر', 'Hamstring and lower-back flexibility'),
    protocol: t('1) إحماء خفيف 5 دقايق. 2) اقعد حافي والرجلين مفرودين وبطن القدم على الصندوق. 3) الإيدين فوق بعض والصوابع على نفس المستوى. 4) مد لقدام ببطء على المسطرة واثبت ثانيتين من غير رجّة والركبة مفرودة. 5) محاولتين وخد الأحسن. 6) النقطة صفر للجدول ده على بعد 26 سم من القدم (صندوق CSEP)؛ لو صندوقك مختلف صحّح القراءة.', '1) Warm up lightly for 5 minutes. 2) Sit barefoot, legs straight, soles against the box. 3) Hands overlapped with fingertips level. 4) Reach forward slowly along the scale and hold 2 s without bouncing, knees straight. 5) Two trials, record the best. 6) For this table the zero point is 26 cm before the feet (CSEP box); correct the reading if your box differs.'),
    equipment: eq('sr_box'),
    unit: 'cm', better: 'higher',
    norms: [
      ...table('m', R5, [[15, 19, 39, 34, 29, 24], [20, 29, 40, 34, 30, 25], [30, 39, 38, 33, 28, 23], [40, 49, 35, 29, 24, 18], [50, 59, 35, 28, 24, 16], [60, 69, 33, 25, 20, 15]]),
      ...table('f', R5, [[15, 19, 43, 38, 34, 29], [20, 29, 41, 37, 33, 28], [30, 39, 41, 36, 32, 27], [40, 49, 38, 34, 30, 25], [50, 59, 39, 33, 30, 25], [60, 69, 35, 31, 27, 23]])
    ],
    source: 'Canadian Society for Exercise Physiology (CSEP), Canadian Physical Activity, Fitness & Lifestyle Approach; reproduced in ACSM\'s Guidelines for Exercise Testing and Prescription',
    notes: t('الفئات في الجدول: ممتاز، جيد جدًا، جيد، مقبول (متوسط)، محتاج تحسين (ضعيف). النتيجة بتتأثر بطول الدراعين والرجلين، فالأهم متابعة نفس الشخص.', 'Categories: excellent, very good, good, fair (average), needs improvement (poor). Arm and leg length affect the score, so tracking the same person matters most.')
  },
  {
    id: 'ts_v_sit_reach',
    name: t('اختبار الوصول من جلسة V', 'V-sit reach test'),
    category: 'flexibility', sports: ['all'],
    measures: t('مرونة الخلفية وأسفل الضهر من غير صندوق', 'Hamstring and lower-back flexibility without a box'),
    protocol: t('1) ارسم خط أساس على الأرض وخط قياس عمودي عليه. 2) اقعد حافي والكعبين على خط الأساس، المسافة بين الكعبين 20-30 سم، والخط العمودي في النص. 3) الإيدين فوق بعض، اثنِ لقدام على خط القياس ببطء واثبت ثانيتين والركب مفرودة (زميل ممكن يثبت الركبتين). 4) 3 محاولات تجريبية وبعدين محاولة مسجلة. 5) النقطة صفر عند خط الأساس: قدامه موجب، وراه سالب.', '1) Mark a baseline on the floor and a measuring line perpendicular to it. 2) Sit barefoot with heels on the baseline, 20-30 cm apart, the measuring line between them. 3) Hands overlapped, reach forward slowly along the line and hold 2 s with knees straight (a partner may hold the knees). 4) Three practice reaches, then one recorded trial. 5) Zero is at the baseline: past it is positive, short of it negative.'),
    equipment: eq('floor_tape', 'ruler'),
    unit: 'cm', better: 'higher',
    norms: [],
    source: 'Hoeger WWK, Hopkins DR (1992) Res Q Exerc Sport; President\'s Council on Physical Fitness and Sports',
    notes: t('مفيش جداول بالغين موحدة ومعتمدة للاختبار ده بالسنتيمتر؛ استخدمه للمتابعة (تحسن 3-5 سم تغيير حقيقي). لو محتاج تصنيف استخدم الجلوس والوصول بالصندوق.', 'No single validated adult norm table in centimetres exists for this version; use it for tracking (a 3-5 cm change is meaningful). Use the box sit-and-reach when a rating is needed.')
  },
  {
    id: 'ts_back_scratch',
    name: t('اختبار حكّ الضهر (مرونة الكتف)', 'Back scratch test (shoulder flexibility)'),
    category: 'flexibility', sports: ['all'],
    measures: t('مرونة مفصل الكتف في الحركات المركبة (الدوران والرفع)', 'Combined shoulder range of motion (rotation and elevation)'),
    protocol: t('1) إيد فوق الكتف لتحت على الضهر (الكف ناحية الضهر)، والتانية من تحت لفوق (ضهر الكف على الضهر). 2) حاول تقرّب الصوابع الوسطى من بعض. 3) قيس المسافة بين طرفي الصابعين: تداخل = موجب، فراغ = سالب. 4) محاولتين لكل جانب وسجّل الأحسن وقارن الجانبين.', '1) One hand reaches over the shoulder and down the back (palm to back); the other reaches up from below (back of hand to back). 2) Try to bring the middle fingers together. 3) Measure the gap between fingertips: overlap is positive, gap negative. 4) Two trials per side; record the best and compare sides.'),
    equipment: eq('ruler'),
    unit: 'cm', better: 'higher',
    norms: [],
    source: 'Rikli RE, Jones CJ (2001, 2013) Senior Fitness Test Manual; Topend Sports',
    notes: t('للبالغين الأصغر مفيش جداول بالسنتيمتر معتمدة؛ تقدير عملي شائع: الصوابع متداخلة ممتاز، بتلمس جيد، فراغ بسيط متوسط، فراغ كبير ضعيف. فرق واضح بين الجانبين (أكتر من 5 سم تقريبًا) يستاهل تقييم. لكبار السن (60+) استخدم نسخة Senior Fitness Test بجداولها.', 'No validated centimetre norms exist for younger adults; a common practical scale is: fingers overlap excellent, touch good, small gap average, large gap poor. A clear side-to-side difference (roughly >5 cm) deserves assessment. For adults 60+, use the Senior Fitness Test version with its norms.')
  },
  {
    id: 'ts_thomas_test',
    name: t('اختبار توماس', 'Thomas test'),
    category: 'flexibility', sports: ['all'],
    measures: t('طول العضلات القابضة للفخذ (الحرقفية القطنية، المستقيمة الفخذية، الشد اللفافي)', 'Length of the hip flexors (iliopsoas, rectus femoris, TFL/ITB)'),
    protocol: t('1) اقعد على طرف السرير وبعدين استلقي وانت ماسك ركبة واحدة على صدرك لحد ما أسفل الضهر يلزق في السرير. 2) سيب الرجل التانية تتدلى بحرية. 3) لاحظ: هل الفخذ بيلمس السرير؟ هل الركبة مثنية حوالي 80 درجة؟ هل الرجل بتميل للخارج؟ 4) قيس زاوية الفخذ بالإنكلينوميتر. 5) كرر للجانب التاني.', '1) Sit on the end of the plinth, then lie back hugging one knee to the chest until the lower back is flat. 2) Let the other leg hang freely. 3) Observe: does the thigh touch the table? Is the knee bent about 80°? Does the leg drift outward? 4) Measure the thigh angle with an inclinometer. 5) Repeat on the other side.'),
    equipment: eq('plinth', 'gonio'),
    unit: 'deg', better: 'lower',
    norms: [],
    source: 'Kendall FP et al., Muscles: Testing and Function; Harvey D (1998) Br J Sports Med',
    notes: t('الطبيعي (Kendall): الفخذ بيلمس السرير أو تحته، والركبة مثنية حوالي 80 درجة، ومفيش ميل للخارج. الفخذ فوق السرير = قِصر في الحرقفية القطنية. الركبة أقل من 80 درجة = قِصر في المستقيمة الفخذية. ميل للخارج = شد في TFL/ITB. سجّل الزاوية للمتابعة.', 'Normal (Kendall): thigh on or below the table, knee flexed about 80°, no lateral drift. Thigh above the table = short iliopsoas. Knee under 80° = short rectus femoris. Drift outward = tight TFL/ITB. Record the angle for tracking.')
  },
  {
    id: 'ts_straight_leg_raise',
    name: t('رفع الرجل مفرودة', 'Straight-leg raise (hamstring length)'),
    category: 'flexibility', sports: ['all'],
    measures: t('طول عضلات الخلفية', 'Hamstring length'),
    protocol: t('1) استلقي على ضهرك والرجلين مفرودين. 2) المُقيّم يثبت الرجل التانية والحوض على السرير. 3) ارفع الرجل مفرودة (سلبي بإيد المقيم أو نشط) لحد أول مقاومة أو ما الحوض يبدأ يلف أو الركبة تتني. 4) قيس الزاوية بين الرجل والسرير. 5) كرر للناحية التانية.', '1) Lie supine with both legs straight. 2) The assessor stabilises the opposite leg and pelvis. 3) Raise the straight leg (passively or actively) to first firm resistance, or until the pelvis tilts or the knee bends. 4) Measure the angle between the leg and the table. 5) Repeat on the other side.'),
    equipment: eq('plinth', 'gonio'),
    unit: 'deg', better: 'higher',
    norms: [],
    source: 'Kendall FP et al., Muscles: Testing and Function (normal hamstring length about 80°)',
    notes: t('المرجع الإكلينيكي: حوالي 80 درجة تعتبر طول طبيعي للخلفية عند البالغين. فرق أكتر من 10-15 درجة بين الجانبين يستاهل اهتمام. لو ظهر ألم ممتد لتحت الركبة أو تنميل، ده ممكن يكون عصبي — وقف وحوّل لتقييم.', 'Clinical reference: about 80° is considered normal hamstring length in adults. A side difference over 10-15° is worth addressing. Pain radiating below the knee or tingling may be neural — stop and refer for assessment.')
  },
  {
    id: 'ts_knee_to_wall',
    name: t('اختبار الركبة للحائط (مرونة الكاحل)', 'Knee-to-wall test (ankle dorsiflexion)'),
    category: 'flexibility', sports: ['all'],
    measures: t('مدى ثني الكاحل لفوق مع حمل الوزن', 'Weight-bearing ankle dorsiflexion range'),
    protocol: t('1) قف في وضع طعنة قدام الحائط، صباع رجلك الكبير على خط عمودي على الحائط. 2) ادفع الركبة لقدام لحد ما تلمس الحائط والكعب لازق في الأرض. 3) رجّع القدم لورا تدريجيًا لحد أبعد مسافة الركبة لسه بتلمس فيها والكعب مرفعش. 4) قيس المسافة من الصباع الكبير للحائط. 5) 3 محاولات لكل رجل وخد الأحسن.', '1) Stand in a lunge facing a wall, big toe on a line perpendicular to the wall. 2) Drive the knee forward to touch the wall with the heel down. 3) Move the foot back progressively to the furthest distance at which the knee still touches with the heel down. 4) Measure toe-to-wall distance. 5) Three trials per leg; record the best.'),
    equipment: eq('wall', 'ruler'),
    unit: 'cm', better: 'higher',
    norms: [],
    source: 'Bennell KL et al. (1998) Aust J Physiother; Hoch MC, McKeon PO (2011) J Orthop Res',
    notes: t('مرجع عملي شائع: أقل من حوالي 10 سم يعتبر محدود. فرق أكتر من 1.5-2 سم بين الرجلين مهم خصوصًا بعد التواء الكاحل. كل 1 سم تقريبًا يساوي 3.6 درجة. محدودية الكاحل بتأثر على السكوات والهبوط وممكن تزود الحمل على الركبة.', 'Common practical reference: under about 10 cm is considered limited. A side difference over 1.5-2 cm matters, especially after ankle sprain. Each centimetre is roughly 3.6°. Limited dorsiflexion affects squatting and landing and can increase knee load.')
  },
  {
    id: 'ts_trunk_rotation',
    name: t('اختبار دوران الجذع', 'Trunk rotation test'),
    category: 'flexibility', sports: ['all'],
    measures: t('مرونة دوران الجذع والضهر', 'Trunk and thoracic rotation flexibility'),
    protocol: t('1) الزق شريط قياس أفقي على الحائط في مستوى الكتف، ونقطة الصفر (مثلًا عند 30 سم في نص الشريط) قصاد الكتف. 2) قف والكتف جنب الحائط بمسافة طول دراع، والقدمين ثابتين عرض الكتف. 3) الدراعين مفرودين قدامك، لِف ناحية الحائط لورا وحاول تلمس أبعد نقطة على الشريط بأطراف الصوابع مع ثبات القدمين. 4) اثبت ثانيتين وسجّل. 5) كرر للجانب التاني وقارن.', '1) Fix a horizontal tape on the wall at shoulder height with the zero point opposite the shoulder. 2) Stand side-on to the wall, an arm\'s length away, feet fixed shoulder-width. 3) With arms straight in front, rotate back toward the wall and touch the tape as far as possible with the fingertips, feet still. 4) Hold 2 s and record. 5) Repeat on the other side and compare.'),
    equipment: eq('wall', 'tape'),
    unit: 'cm', better: 'higher',
    norms: [],
    source: 'Topend Sports (trunk rotation test); Johnson BL, Nelson JK (1986) Practical Measurements for Evaluation in Physical Education',
    notes: t('مفيش جداول منشورة معتمدة؛ الأهم المقارنة بين اليمين والشمال ومتابعة التحسن. فرق واضح بين الجانبين مهم في رياضات الدوران (جولف، تنس، رمي، ملاكمة).', 'No validated published norms; focus on left-right comparison and progress. A clear side difference matters in rotational sports (golf, tennis, throwing, boxing).')
  }
];

/* ================= القوة العضلية ================= */
const RM_PROTOCOL = t(
  '1) إحماء عام 5-10 دقايق. 2) مجموعة 5-10 عدات بوزن خفيف (40-60% من المتوقع)، راحة دقيقة. 3) مجموعة 3-5 عدات بـ 60-80%، راحة دقيقتين. 4) زوّد الوزن تدريجيًا وحاول عدة واحدة، راحة 3-5 دقايق بين المحاولات. 5) وصّل للـ 1RM خلال 3-5 محاولات بأداء فني سليم. 6) لازم سبوتر وحواجز أمان.',
  '1) General warm-up for 5-10 minutes. 2) One set of 5-10 reps at a light load (40-60% of expected), rest 1 minute. 3) One set of 3-5 reps at 60-80%, rest 2 minutes. 4) Increase load progressively and attempt single reps, resting 3-5 minutes between attempts. 5) Reach the 1RM within 3-5 attempts with sound technique. 6) Always use a spotter and safety bars.'
);
const RM_NOTE_ESTIMATE = t(
  'لو اختبار 1RM مش مناسب (مبتدئ أو إصابة) قدّره من عدات أقل من 10: معادلة Epley: الوزن × (1 + العدات ÷ 30). معادلة Brzycki: الوزن × 36 ÷ (37 − العدات). النتيجة النسبية = 1RM ÷ وزن الجسم.',
  'If a true 1RM is not appropriate (novice or injury), estimate it from fewer than 10 reps: Epley: load × (1 + reps ÷ 30). Brzycki: load × 36 ÷ (37 − reps). Relative score = 1RM ÷ body mass.'
);
const P_STRENGTH = [
  {
    id: 'ts_1rm_bench_press',
    name: t('أقصى تكرار واحد بنش برس (نسبة لوزن الجسم)', 'Bench press 1RM relative to body mass'),
    category: 'strength', sports: ['all'],
    measures: t('أقصى قوة للصدر والكتف والترايسبس بالنسبة لوزن الجسم', 'Maximal upper-body pushing strength relative to body mass'),
    protocol: RM_PROTOCOL,
    equipment: eq('bench', 'barbell', 'spotter', 'scale'),
    unit: 'kg/bw', better: 'higher',
    norms: table('m', RPCT, [
      [20, 29, 1.48, 1.22, 1.06, 0.93, 0.80],
      [30, 39, 1.24, 1.04, 0.93, 0.83, 0.71],
      [40, 49, 1.10, 0.93, 0.84, 0.76, 0.65],
      [50, 59, 0.97, 0.84, 0.75, 0.68, 0.57],
      [60, 99, 0.89, 0.77, 0.68, 0.63, 0.53]
    ]),
    source: 'The Cooper Institute norms (Universal DVR bench), reproduced in ACSM\'s Guidelines for Exercise Testing and Prescription',
    notes: t('حدود الجدول مبنية على المئينات: ممتاز = المئين 90 فأكثر، جيد جدًا = 70، جيد = 50، متوسط = 30، أقل من المتوسط = 10، ضعيف تحت 10. المعايير الأصلية اتعملت على جهاز Universal، فالبار الحر ممكن يدي أرقام مختلفة شوية. جداول السيدات موجودة في نفس المرجع. ' + RM_NOTE_ESTIMATE.ar, 'Cut-offs are percentiles: excellent ≥90th, very good 70th, good 50th, average 30th, below average 10th, poor under the 10th. The original data used a Universal machine, so free-barbell values may differ somewhat. Women\'s tables are in the same reference. ' + RM_NOTE_ESTIMATE.en)
  },
  {
    id: 'ts_1rm_back_squat',
    name: t('أقصى تكرار واحد باك سكوات (نسبة لوزن الجسم)', 'Back squat 1RM relative to body mass'),
    category: 'strength', sports: ['all'],
    measures: t('أقصى قوة للرجلين والجذع بالنسبة لوزن الجسم', 'Maximal lower-body strength relative to body mass'),
    protocol: t(RM_PROTOCOL.ar + ' 7) العمق: مفصل الفخذ تحت مستوى الركبة أو على الأقل الفخذ موازي للأرض — ثبّت نفس العمق في كل اختبار.', RM_PROTOCOL.en + ' 7) Depth: hip crease below the top of the knee, or at least thighs parallel — keep the same depth standard every test.'),
    equipment: eq('rack', 'barbell', 'spotter', 'scale'),
    unit: 'kg/bw', better: 'higher',
    norms: [],
    source: 'NSCA Essentials of Strength Training and Conditioning (1RM protocol); Suchomel TJ, Nimphius S, Stone MH (2016) Sports Med 46:1419-1449',
    notes: t('مفيش جداول سكّانية منشورة بنفس جودة البنش. إطار Suchomel وزملاؤه (2016) للرياضيين: أقل من 1.5 × وزن الجسم "عجز قوة" والأولوية لبناء القوة، 1.5-2.0 مرحلة ربط القوة بالأداء، 2.0 فأكثر "احتياطي قوة" والتركيز يتحول للقدرة والسرعة. (الأرقام دي للرجال الرياضيين أساسًا.) ' + RM_NOTE_ESTIMATE.ar, 'No population norms of the same quality as the bench press exist. Framework for athletes (Suchomel et al. 2016): under 1.5 × body mass is a "strength deficit" (build strength first), 1.5-2.0 is the strength-association phase, 2.0+ is a "strength reserve" where emphasis shifts to power and speed (figures mainly for male athletes). ' + RM_NOTE_ESTIMATE.en)
  },
  {
    id: 'ts_1rm_deadlift',
    name: t('أقصى تكرار واحد ديدلفت (نسبة لوزن الجسم)', 'Deadlift 1RM relative to body mass'),
    category: 'strength', sports: ['all'],
    measures: t('أقصى قوة للسلسلة الخلفية والقبضة', 'Maximal posterior-chain and grip strength'),
    protocol: t(RM_PROTOCOL.ar + ' 7) الضهر محايد طول الحركة، والعدة بتتحسب لما الركبة والفخذ يتفردوا بالكامل. ممنوع الرفع بضهر مقوّس — وقف المحاولة لو الفورم باظ.', RM_PROTOCOL.en + ' 7) Neutral spine throughout; the rep counts at full hip and knee lockout. Stop the attempt if the back rounds.'),
    equipment: eq('barbell', 'chalk', 'scale'),
    unit: 'kg/bw', better: 'higher',
    norms: [],
    source: 'NSCA Essentials of Strength Training and Conditioning (1RM protocol)',
    notes: t('مفيش معايير سكانية معتمدة في المراجع العلمية للديدلفت؛ استخدمه للمتابعة ومقارنة الرياضي بنفسه أو بزمايله في نفس الرياضة. للاختبارات الجماعية، الديدلفت بالبار السداسي (زي اختبار الجيش الأمريكي) أأمن. ' + RM_NOTE_ESTIMATE.ar, 'No validated population norms exist in the scientific literature; use it to track the athlete against themselves or teammates in the same sport. For group testing, the hex-bar deadlift (as in the US Army test) is safer. ' + RM_NOTE_ESTIMATE.en)
  },
  {
    id: 'ts_leg_press_1rm',
    name: t('أقصى تكرار واحد ليج بريس (نسبة لوزن الجسم)', 'Leg press 1RM relative to body mass'),
    category: 'strength', sports: ['all'],
    measures: t('أقصى قوة دفع للرجلين على جهاز', 'Maximal machine-based leg pushing strength'),
    protocol: t('1) اضبط المقعد بحيث الركبة تبدأ من حوالي 90 درجة. 2) إحماء بوزن خفيف 8-10 عدات. 3) زوّد الوزن تدريجيًا بمحاولات عدة واحدة وراحة 3-5 دقايق. 4) سجّل أتقل وزن اتدفع لفرد الركبة الكامل من غير رفع الحوض.', '1) Set the seat so the knees start at about 90°. 2) Warm up with a light load for 8-10 reps. 3) Increase the load progressively with single attempts and 3-5 minutes rest. 4) Record the heaviest load pressed to full knee extension without the hips lifting.'),
    equipment: eq('legpress', 'scale'),
    unit: 'kg/bw', better: 'higher',
    norms: table('m', RPCT, [
      [20, 29, 2.27, 2.05, 1.91, 1.74, 1.51],
      [30, 39, 2.07, 1.85, 1.71, 1.59, 1.43],
      [40, 49, 1.92, 1.74, 1.62, 1.51, 1.35],
      [50, 59, 1.80, 1.64, 1.52, 1.39, 1.22],
      [60, 99, 1.73, 1.56, 1.43, 1.30, 1.16]
    ]),
    source: 'The Cooper Institute norms (Universal DVR leg press), reproduced in ACSM\'s Guidelines for Exercise Testing and Prescription',
    notes: t('المعايير اتعملت على جهاز Universal DVR؛ أجهزة الليج بريس المايلة (45 درجة) بتدي أرقام أعلى بكتير لأن جزء من الوزن بيشيله الجهاز — استخدم الجدول للأجهزة الأفقية فقط، وقارن الشخص بنفسه على نفس الجهاز. المئينات: ممتاز 90، جيد جدًا 70، جيد 50، متوسط 30، أقل من المتوسط 10.', 'Norms come from a Universal DVR machine; 45° sled leg presses give much higher values because the sled carries part of the load — use the table only for horizontal machines and compare a person with themselves on the same machine. Percentiles: excellent 90th, very good 70th, good 50th, average 30th, below average 10th.')
  },
  {
    id: 'ts_handgrip',
    name: t('قوة القبضة (دينامومتر اليد)', 'Handgrip strength (dynamometer)'),
    category: 'strength', sports: ['all'],
    measures: t('قوة القبضة القصوى — مؤشر على القوة العامة والصحة وخطر الساركوبينيا عند الكبار', 'Maximal grip strength — a marker of overall strength, health and sarcopenia risk in older adults'),
    protocol: t('1) اضبط مقبض الجهاز بحيث السلامية التانية من الصوابع تبقى عند 90 درجة. 2) واقف، الدراع جنب الجسم ومفرود وبعيد شوية عن الجسم. 3) اضغط بأقصى قوة 2-3 ثواني من غير ما تحرك الدراع. 4) محاولتين لكل إيد بالتبادل، دقيقة راحة. 5) لجدول CSEP: اجمع أحسن قراءة لليمين مع أحسن قراءة للشمال.', '1) Adjust the handle so the second finger joint sits at about 90°. 2) Stand with the arm straight at the side, slightly away from the body. 3) Squeeze maximally for 2-3 s without swinging the arm. 4) Two trials per hand, alternating, with a minute of rest. 5) For the CSEP table, add the best right-hand and best left-hand scores.'),
    equipment: eq('dyn'),
    unit: 'kg', better: 'higher',
    norms: [
      ...table('m', R5, [[15, 19, 113, 103, 95, 84], [20, 29, 124, 113, 106, 97], [30, 39, 123, 113, 105, 97], [40, 49, 119, 110, 102, 94], [50, 59, 110, 102, 96, 87], [60, 69, 102, 93, 86, 79]], hi, ['مجموع اليدين', 'both hands combined']),
      ...table('f', R5, [[15, 19, 71, 64, 59, 54], [20, 29, 71, 65, 61, 55], [30, 39, 73, 66, 61, 56], [40, 49, 73, 65, 59, 55], [50, 59, 65, 59, 55, 51], [60, 69, 60, 54, 51, 48]], hi, ['مجموع اليدين', 'both hands combined']),
      NL('رجال 60 سنة فأكثر — فحص الساركوبينيا (أقوى إيد)', 'Men 60+ — sarcopenia screen (stronger hand)', 'm', [60, 99], [{ r: 'average', min: 27 }, { r: 'poor', max: 27 }]),
      NL('سيدات 60 سنة فأكثر — فحص الساركوبينيا (أقوى إيد)', 'Women 60+ — sarcopenia screen (stronger hand)', 'f', [60, 99], [{ r: 'average', min: 16 }, { r: 'poor', max: 16 }])
    ],
    source: 'CSEP Canadian Physical Activity, Fitness & Lifestyle Approach (combined grip norms, in ACSM\'s Guidelines); Cruz-Jentoft AJ et al. (2019) EWGSOP2, Age Ageing',
    notes: t('جدول CSEP بيستخدم مجموع اليدين. جدول الساركوبينيا (EWGSOP2) بيستخدم أعلى قراءة لإيد واحدة: أقل من 27 كجم للرجال و16 كجم للسيدات = ضعف في القوة يستدعي تقييم. ضعف القبضة مرتبط بزيادة خطر الوفاة وأمراض القلب في الدراسات الكبيرة.', 'The CSEP table uses both hands combined. The sarcopenia screen (EWGSOP2) uses the best single-hand value: under 27 kg for men or 16 kg for women indicates low strength and warrants assessment. Low grip strength is linked to higher mortality and cardiovascular risk in large cohort studies.')
  },
  {
    id: 'ts_imtp',
    name: t('سحب منتصف الفخذ الإيزومتري (IMTP)', 'Isometric mid-thigh pull (IMTP)'),
    category: 'strength', sports: ['all'],
    measures: t('أقصى قوة إيزومترية ومعدل تطور القوة للجسم كله', 'Whole-body maximal isometric force and rate of force development'),
    protocol: t('1) البار ثابت في منتصف الفخذ، الركبة 125-145 درجة والفخذ 140-150 درجة (وضع السحبة التانية). 2) الوقوف على منصة القوة، مسكة ثابتة (يفضل أحزمة). 3) شد خفيف لإزالة الارتخاء وثبات تام قبل البداية. 4) عند الإشارة: شد "بأسرع وأقوى ما يمكن" لمدة 3-5 ثواني. 5) 2-3 محاولات بأقصى جهد وبينهم 1-2 دقيقة راحة.', '1) Fixed bar at mid-thigh with knee angle 125-145° and hip angle 140-150° (second-pull position). 2) Stand on a force plate with a secure grip (straps recommended). 3) Apply light pre-tension and remain completely still before the start. 4) On command, pull "as fast and as hard as possible" for 3-5 s. 5) Two to three maximal trials with 1-2 minutes rest.'),
    equipment: eq('imtp_rig', 'force_plate'),
    unit: 'kg/bw', better: 'higher',
    norms: [],
    source: 'Comfort P et al. (2019) Standardization and methodological considerations for the IMTP, Strength Cond J 41(2):57-79',
    notes: t('النتيجة الأساسية أقصى قوة (نيوتن)؛ للمقارنة بين الأشخاص قسّمها على وزن الجسم بالنيوتن فتطلع "أضعاف وزن الجسم". معدل تطور القوة (RFD) في أول 100-250 ملي ثانية مهم للرياضات الانفجارية. القيم بتختلف كتير حسب البروتوكول والجهاز، فمفيش معايير موحدة — قارن الرياضي بنفسه وبفريقه بنفس الإعدادات.', 'The key output is peak force (N); divide by body weight in newtons to express it as multiples of body weight. Rate of force development over the first 100-250 ms matters for explosive sports. Values vary widely with protocol and equipment, so there are no universal norms — compare athletes with themselves and their squad using identical settings.')
  },
  {
    id: 'ts_estimated_1rm',
    name: t('تقدير أقصى تكرار من عدات متعددة', 'Estimated 1RM from a multi-rep set'),
    category: 'strength', sports: ['all'],
    population: t('المبتدئين وكبار السن والحالات اللي مش مناسب لها رفع أقصى', 'Novices, older adults and anyone for whom a maximal lift is not appropriate'),
    measures: t('تقدير القوة القصوى بأمان من عدد عدات حتى الفشل الفني بوزن أقل من الأقصى', 'Safe estimate of maximal strength from reps to technical failure at a submaximal load'),
    protocol: t('1) إحماء بوزن خفيف. 2) اختار وزن تقدر تشيله 3-10 مرات. 3) اعمل أكبر عدد عدات بأداء فني سليم لحد الفشل الفني. 4) طبّق المعادلة. 5) كرر بعد 4-8 أسابيع بنفس الوزن أو نفس عدد العدات.', '1) Warm up with a light load. 2) Choose a load you can lift 3-10 times. 3) Perform as many clean reps as possible to technical failure. 4) Apply the equation. 5) Re-test after 4-8 weeks with the same load or rep target.'),
    equipment: eq('barbell', 'calc'),
    unit: 'kg', better: 'higher',
    norms: [],
    source: 'Brzycki M (1993) JOPERD 64:88-90; Epley B (1985) Boyd Epley Workout',
    notes: t('Epley: 1RM = الوزن × (1 + العدات ÷ 30). Brzycki: 1RM = الوزن × 36 ÷ (37 − العدات). الدقة بتقل كل ما العدات تزيد عن 10. بعد التقدير، قسّم على وزن الجسم وقيّم بجداول 1RM المناسبة.', 'Epley: 1RM = load × (1 + reps ÷ 30). Brzycki: 1RM = load × 36 ÷ (37 − reps). Accuracy drops above 10 reps. After estimating, divide by body mass and rate with the matching 1RM table.')
  }
];

/* ================= القدرة (القوة الانفجارية) ================= */
const VJ_NORMS = () => [
  NL('رجال (مرجع عام)', 'Men (general reference)', 'm', null, hi(R7, [71, 61, 51, 41, 31, 21])),
  NL('سيدات (مرجع عام)', 'Women (general reference)', 'f', null, hi(R7, [61, 51, 41, 31, 21, 11]))
];
const P_POWER = [
  {
    id: 'ts_countermovement_jump',
    name: t('الوثب العمودي بحركة معاكسة (CMJ)', 'Countermovement jump (CMJ)'),
    category: 'power', sports: ['all'],
    measures: t('قدرة الرجلين الانفجارية باستخدام دورة الإطالة والتقصير', 'Lower-body explosive power using the stretch-shortening cycle'),
    protocol: t('1) إحماء ديناميكي 8-10 دقايق ووثبات تجريبية. 2) الإيدين على الوسط (أو بمرجحة لو ده المعتمد عندك — ثبّت الاختيار). 3) نزول سريع لعمق يختاره اللاعب ثم وثب لأعلى بأقصى قوة. 4) الهبوط في نفس المكان والرجلين مفرودين لحظة الهبوط. 5) 3-5 محاولات، 30-60 ثانية راحة، سجّل الأحسن (أو المتوسط للمتابعة).', '1) Dynamic warm-up for 8-10 minutes with practice jumps. 2) Hands on hips (or with arm swing if that is your standard — keep it consistent). 3) Fast dip to a self-selected depth, then jump up maximally. 4) Land in the same spot with legs straight at touchdown. 5) Three to five trials with 30-60 s rest; record the best (or mean for monitoring).'),
    equipment: eq('jump_mat', 'force_plate'),
    unit: 'cm', better: 'higher',
    norms: [],
    source: 'Bosco C et al. (1983) Eur J Appl Physiol; Claudino JG et al. (2017) J Sci Med Sport (CMJ for monitoring)',
    notes: t('بساط الوثب وتطبيقات زمن الطيران بتدي أرقام أقل من اختبار سارجنت على الحائط، فمتقارنش بين الطريقتين. مع منصة القوة تقدر تحسب القدرة والـ RSI المعدّل. للمتابعة اليومية، هبوط أكتر من حوالي 5-10% عن المعتاد ممكن يدل على إرهاق عصبي عضلي. معادلة Sayers للقدرة القصوى: القدرة (واط) = 60.7 × الارتفاع (سم) + 45.3 × الوزن (كجم) − 2055.', 'Jump mats and flight-time apps give lower values than the wall-based Sargent test, so do not compare methods. A force plate adds power and modified RSI. For monitoring, a drop of more than about 5-10% from baseline may indicate neuromuscular fatigue. Sayers equation for peak power: W = 60.7 × height (cm) + 45.3 × mass (kg) − 2055.')
  },
  {
    id: 'ts_squat_jump',
    name: t('الوثب من وضع القرفصاء الثابت (SJ)', 'Squat jump (SJ)'),
    category: 'power', sports: ['all'],
    measures: t('القدرة الانفجارية المركّزة من غير دورة إطالة وتقصير', 'Concentric-only explosive power without the stretch-shortening cycle'),
    protocol: t('1) الإيدين على الوسط. 2) انزل لزاوية ركبة حوالي 90 درجة واثبت 2-3 ثواني. 3) اوثب لأعلى بأقصى قوة من غير أي نزول إضافي قبل الوثبة. 4) لو حصل نزول (عدّة معاكسة) المحاولة تتلغي. 5) 3 محاولات وسجّل الأحسن.', '1) Hands on hips. 2) Descend to about 90° knee angle and hold 2-3 s. 3) Jump up maximally without any further dip. 4) Any countermovement voids the trial. 5) Three trials; record the best.'),
    equipment: eq('jump_mat', 'force_plate'),
    unit: 'cm', better: 'higher',
    norms: [],
    source: 'Bosco C et al. (1983) Eur J Appl Physiol 50:273-282',
    notes: t('مفيد مع CMJ: نسبة الاستفادة من الحركة المعاكسة (EUR) = CMJ ÷ SJ. نسبة حوالي 1.0 تعني استفادة ضعيفة من المرونة المطاطية (يفضّل تدريب بليومتري)، والنسب الأعلى تعني استخدام أحسن لدورة الإطالة والتقصير.', 'Useful alongside the CMJ: eccentric utilisation ratio (EUR) = CMJ ÷ SJ. A ratio near 1.0 suggests little use of elastic energy (favour plyometric work); higher ratios indicate better use of the stretch-shortening cycle.')
  },
  {
    id: 'ts_sargent_jump',
    name: t('اختبار سارجنت للوثب العمودي', 'Vertical jump (Sargent test)'),
    category: 'power', sports: ['all'],
    measures: t('ارتفاع الوثب العمودي بمرجحة الذراعين', 'Vertical jump height with arm swing'),
    protocol: t('1) قف جنب الحائط، ومد الإيد الأقرب لفوق وعلّم أعلى نقطة (الوصول الثابت). 2) من الثبات، انزل ومرجح الدراعين واوثب علّم أعلى نقطة ممكنة. 3) الفرق بين العلامتين هو النتيجة. 4) 3 محاولات وسجّل الأحسن.', '1) Stand side-on to the wall, reach up with the near hand and mark the standing reach. 2) From standing, dip, swing the arms and jump to mark the highest point. 3) The difference between the marks is the score. 4) Three trials; record the best.'),
    equipment: eq('jump_board', 'chalk'),
    unit: 'cm', better: 'higher',
    norms: VJ_NORMS(),
    source: 'Sargent DA (1921) Am Phys Educ Rev; norms from Chu DA (1996) Explosive Power and Strength, via Topend Sports',
    notes: t('الفئات للرجال: أكتر من 70 سم ممتاز، 61-70 جيد جدًا، 51-60 فوق المتوسط، 41-50 متوسط، 31-40 تحت المتوسط، 21-30 ضعيف، أقل من 21 ضعيف جدًا. للسيدات: أكتر من 60، 51-60، 41-50، 31-40، 21-30، 11-20، أقل من 11. الجدول مرجع عام للبالغين وليس حسب السن.', 'Men: >70 cm excellent, 61-70 very good, 51-60 above average, 41-50 average, 31-40 below average, 21-30 poor, <21 very poor. Women: >60, 51-60, 41-50, 31-40, 21-30, 11-20, <11. This is a general adult reference, not age-specific.')
  },
  {
    id: 'ts_standing_broad_jump',
    name: t('الوثب الطويل من الثبات', 'Standing broad jump'),
    category: 'power', sports: ['all'],
    measures: t('القدرة الأفقية للرجلين', 'Horizontal lower-body power'),
    protocol: t('1) القدمين عرض الحوض خلف خط البداية. 2) مرجحة الدراعين وثني الركبتين ثم الوثب لقدام بأقصى مسافة. 3) الهبوط على القدمين من غير وقوع لورا. 4) القياس من خط البداية لأقرب نقطة لمسها الجسم (عادة الكعب اللي ورا). 5) 3 محاولات وسجّل الأحسن.', '1) Feet hip-width behind the line. 2) Swing the arms, bend the knees, and jump forward as far as possible. 3) Land on both feet without falling back. 4) Measure from the line to the nearest point of contact (usually the rear heel). 5) Three trials; record the best.'),
    equipment: eq('tape_m', 'floor_tape', 'mat'),
    unit: 'cm', better: 'higher',
    norms: [
      NL('رجال (مرجع عام)', 'Men (general reference)', 'm', null, hi(R7, [251, 241, 231, 221, 211, 191])),
      NL('سيدات (مرجع عام)', 'Women (general reference)', 'f', null, hi(R7, [201, 191, 181, 171, 161, 141]))
    ],
    source: 'Davis B et al. (2000) Physical Education and the Study of Sport, via Topend Sports; Eurofit (1988); ALPHA-fit (Ruiz et al. 2011)',
    notes: t('رجال: أكتر من 250 سم ممتاز، 241-250 جيد جدًا، 231-240 فوق المتوسط، 221-230 متوسط، 211-220 تحت المتوسط، 191-210 ضعيف، أقل من 191 ضعيف جدًا. سيدات: أكتر من 200، 191-200، 181-190، 171-180، 161-170، 141-160، أقل من 141. الجدول ده بيستخدم كمرجع للشباب والرياضيين؛ للأطفال والمراهقين استخدم جداول ALPHA-fit أو Eurofit حسب السن.', 'Men: >250 cm excellent, 241-250 very good, 231-240 above average, 221-230 average, 211-220 below average, 191-210 poor, <191 very poor. Women: >200, 191-200, 181-190, 171-180, 161-170, 141-160, <141. This table is used as a reference for young adults and athletes; for children and adolescents use the age-based ALPHA-fit or Eurofit tables.')
  },
  {
    id: 'ts_seated_medball_chest_throw',
    name: t('رمي الكرة الطبية من الصدر جلوسًا', 'Seated medicine-ball chest throw'),
    category: 'power', sports: ['all'],
    measures: t('قدرة الجزء العلوي من الجسم (الدفع)', 'Upper-body pushing power'),
    protocol: t('1) اقعد والضهر لازق في الحائط والرجلين مفرودين. 2) امسك الكرة (عادة 2-3 كجم للرجال، 1-2 كجم للسيدات والناشئين؛ 4 كجم في بعض البروتوكولات) عند الصدر. 3) ارمِ لقدام بأقصى قوة والضهر فضل لازق في الحائط. 4) القياس من الحائط لمكان أول لمسة للكرة. 5) 3 محاولات وسجّل الأحسن.', '1) Sit with the back against a wall and legs straight. 2) Hold the ball (commonly 2-3 kg for men, 1-2 kg for women and youth; 4 kg in some protocols) at the chest. 3) Push it forward as hard as possible while the back stays on the wall. 4) Measure from the wall to the first contact point. 5) Three trials; record the best.'),
    equipment: eq('medball', 'wall', 'tape_m'),
    unit: 'm', better: 'higher',
    norms: [],
    source: 'Davis KL et al. (2008) J Strength Cond Res; Harris C et al. (2011) J Strength Cond Res (reliability)',
    notes: t('مفيش معايير موحدة لأن وزن الكرة والبروتوكول بيختلفوا. ثبّت نفس الكرة ونفس الجلسة في كل مرة وقارن الشخص بنفسه.', 'No universal norms exist because ball mass and protocol vary. Keep the same ball and position every time and compare the person with themselves.')
  },
  {
    id: 'ts_medball_overhead_back_throw',
    name: t('رمي الكرة الطبية فوق الرأس للخلف', 'Standing overhead backward medicine-ball throw'),
    category: 'power', sports: ['all'],
    measures: t('القدرة الكلية للجسم (امتداد الفخذ والركبة والكاحل — الامتداد الثلاثي)', 'Total-body power (triple extension of hip, knee and ankle)'),
    protocol: t('1) قف وضهرك لخط الرمي، الكرة بين الرجلين بالدراعين مفرودين. 2) انزل لنص سكوات ثم افرد الجسم بسرعة وارمِ الكرة فوق راسك لورا. 3) القياس من الخط لأول لمسة. 4) 3 محاولات وسجّل الأحسن. 5) خلّي المنطقة ورا فاضية تمامًا.', '1) Stand with your back to the throwing line, ball held between the legs with straight arms. 2) Drop into a half squat, then extend explosively and throw the ball back over your head. 3) Measure from the line to the first contact. 4) Three trials; record the best. 5) Keep the landing area completely clear.'),
    equipment: eq('medball', 'tape_m'),
    unit: 'm', better: 'higher',
    norms: [],
    source: 'Stockbrugger BA, Haennel RG (2001) J Strength Cond Res 15:431-438; Kraemer WJ, Fleck SJ, Deschenes MR (2012) Exercise Physiology',
    notes: t('مرتبط بقوة بالوثب العمودي والقدرة الأولمبية. مفيش جداول موحدة؛ ثبّت وزن الكرة (غالبًا 3-4 كجم) وقارن الشخص بنفسه.', 'Correlates strongly with vertical jump and Olympic-lift power. No universal tables; fix ball mass (often 3-4 kg) and compare the person with themselves.')
  },
  {
    id: 'ts_drop_jump_rsi',
    name: t('مؤشر القوة الارتدادية — الوثب من السقوط (RSI)', 'Reactive strength index — drop jump (RSI)'),
    category: 'power', sports: ['all'],
    measures: t('القدرة على امتصاص الهبوط والارتداد بسرعة (دورة إطالة وتقصير سريعة)', 'Ability to absorb landing and rebound quickly (fast stretch-shortening cycle)'),
    protocol: t('1) قف على صندوق (عادة 30 سم؛ ممكن 20-60 سم). 2) انزل من على الصندوق بالخطو لقدام (مش نط). 3) أول ما تلمس الأرض اوثب لأعلى بأقصى ارتفاع وأقل زمن تلامس ممكن. 4) الإيدين على الوسط. 5) 3 محاولات بينهم 60 ثانية. 6) RSI = ارتفاع الوثب (متر) ÷ زمن التلامس (ثانية).', '1) Stand on a box (commonly 30 cm; 20-60 cm possible). 2) Step off forward (do not jump off). 3) On landing, jump up as high as possible with the shortest possible ground contact. 4) Hands on hips. 5) Three trials with 60 s rest. 6) RSI = jump height (m) ÷ contact time (s).'),
    equipment: eq('box', 'jump_mat', 'force_plate'),
    unit: 'score', better: 'higher',
    norms: [],
    source: 'Young W (1995) Modern Athlete and Coach; Flanagan EP, Comyns TM (2008) Strength Cond J 30(5):32-38',
    notes: t('اختبار متقدم — للرياضيين اللي عندهم أساس قوة وخبرة في البليومتري. القيم بتختلف حسب ارتفاع الصندوق والجهاز، فمفيش معايير موحدة؛ استخدم نفس الصندوق وتابع التغيير. لو زمن التلامس أكتر من حوالي 0.25 ثانية فالحركة بقت "بطيئة" ومش بتقيس الارتداد السريع. تقدر تعمل أكتر من ارتفاع وتختار الارتفاع اللي بيدي أعلى RSI.', 'Advanced test — for athletes with a strength base and plyometric experience. Values depend on box height and device, so there are no universal norms; use the same box and track change. If contact time exceeds about 0.25 s the action is "slow" and no longer reflects fast reactive strength. You can test several heights and use the one that gives the highest RSI.')
  },
  {
    id: 'ts_rsi_10_5',
    name: t('اختبار 10/5 للقفز المتكرر (RSI)', '10/5 repeated jump test (RSI)'),
    category: 'power', sports: ['all'],
    measures: t('قوة الارتداد السريعة من القفزات المتكررة القصيرة التلامس', 'Fast reactive strength from repeated short-contact hops'),
    protocol: t('1) الإيدين على الوسط. 2) اعمل 10 قفزات متتالية على مشط القدم بأقصى ارتفاع وأقصر تلامس. 3) الركب شبه مفرودة (زي النطة على الحبل). 4) خد أحسن 5 قفزات واحسب متوسط RSI (ارتفاع ÷ زمن تلامس). 5) محاولتين بينهم دقيقتين.', '1) Hands on hips. 2) Perform 10 consecutive hops on the balls of the feet, maximising height and minimising contact. 3) Knees nearly straight (like rope skipping). 4) Average the RSI (height ÷ contact time) of the best 5 hops. 5) Two trials with 2 minutes rest.'),
    equipment: eq('jump_mat', 'force_plate'),
    unit: 'score', better: 'higher',
    norms: [],
    source: 'Comyns TM et al. (2019) J Strength Cond Res; Harper D et al. (2011) Reliability of the 10/5 repeated jump test',
    notes: t('بيقيس صلابة الكاحل والوتر (Achilles) — مهم للعدائين والوثب وألعاب الكرة. مفيش معايير موحدة؛ تابع التغيير بنفس الجهاز. مفيد في مراحل الرجوع بعد إصابات الكاحل ووتر أكيليس (قارن الرجلين بالقفز على رجل واحدة).', 'Reflects ankle and Achilles stiffness — important for sprinters, jumpers and ball sports. No universal norms; track change on the same device. Useful in return-to-play after ankle and Achilles injuries (compare single-leg versions).')
  },
  {
    id: 'ts_single_leg_hop_battery',
    name: t('بطارية اختبارات الحجل على رجل واحدة', 'Single-leg hop test battery'),
    category: 'power', sports: ['all'],
    population: t('الرياضيين في مرحلة الرجوع بعد إصابات الركبة والكاحل (مثل الرباط الصليبي)', 'Athletes returning from knee or ankle injury (e.g. ACL reconstruction)'),
    measures: t('قدرة وثبات كل رجل ونسبة التماثل بين الرجلين', 'Single-leg power and control, and limb symmetry'),
    protocol: t('1) أربع اختبارات: حجلة واحدة لأبعد مسافة، 3 حجلات متتالية، 3 حجلات متقاطعة على خط، وحجل 6 متر على الوقت. 2) الهبوط لازم يتثبت ثانيتين من غير لمس بالرجل التانية. 3) محاولة تجريبية ثم محاولتين لكل رجل، ابدأ بالسليمة. 4) نسبة التماثل (LSI) = (المصابة ÷ السليمة) × 100 — وللاختبار الموقوت: (السليمة ÷ المصابة) × 100.', '1) Four tests: single hop for distance, triple hop, crossover hop over a line, and 6 m timed hop. 2) Each landing must be held for 2 s without touching down with the other foot. 3) One practice and two trials per leg, uninjured side first. 4) Limb symmetry index (LSI) = (involved ÷ uninvolved) × 100 — for the timed hop use (uninvolved ÷ involved) × 100.'),
    equipment: eq('tape_m', 'floor_tape', 'stopwatch'),
    unit: '%', better: 'higher',
    norms: [NL('معيار الرجوع للعب (نسبة التماثل)', 'Return-to-sport criterion (LSI)', 'any', null, [{ r: 'good', min: 90 }, { r: 'poor', max: 90 }])],
    source: 'Noyes FR et al. (1991) Am J Sports Med 19:513-518; Grindem H et al. (2016) Br J Sports Med',
    notes: t('المعيار الشائع للرجوع: نسبة تماثل 90% فأكثر في كل الاختبارات، مع باقي معايير القوة والثقة. نسبة التماثل لوحدها ممكن تخدع لو الرجل السليمة نفسها ضعفت بعد الإصابة — قارن كمان بالأرقام قبل الإصابة لو متوفرة.', 'Common return criterion: LSI of 90% or more on all tests, together with strength and confidence criteria. LSI alone can mislead if the uninjured limb has also weakened — compare with pre-injury values where available.')
  }
];

/* ================= السرعة ================= */
const SPRINT_NOTE = t(
  'التوقيت بالبوابات الضوئية هو المعيار؛ التوقيت اليدوي غالبًا بيطلع أسرع بحوالي 0.1-0.2 ثانية ومينفعش يتقارن بالإلكتروني. طريقة البداية (من وقوف، والقدم الأمامية 0.3-0.5 متر ورا البوابة الأولى) لازم تتثبت. مفيش معايير سكّانية موحدة لأن النتيجة بتتأثر بالأرضية والحذاء والبداية؛ قارن اللاعب بنفسه وبزمايله في نفس الرياضة والمستوى. تغيير أقل من حوالي 0.03-0.05 ثانية غالبًا في حدود خطأ القياس.',
  'Electronic timing gates are the standard; hand timing usually reads about 0.1-0.2 s faster and cannot be compared with electronic times. Fix the start method (standing start, front foot 0.3-0.5 m behind the first gate). There are no universal population norms because surface, footwear and start method affect results; compare athletes with themselves and with peers of the same sport and level. Changes smaller than about 0.03-0.05 s are usually within measurement error.'
);
const sprintProto = (dist) => t(
  `1) إحماء 10-15 دقيقة يشمل عدو تدريجي. 2) بداية من وقوف خلف خط البداية بنفس المسافة كل مرة. 3) عدو بأقصى سرعة لما بعد خط ${ad(dist)} متر بخطوتين على الأقل. 4) 2-3 محاولات بينهم 2-3 دقايق راحة كاملة. 5) سجّل أسرع زمن.`,
  `1) Warm up for 10-15 minutes including build-up runs. 2) Standing start behind the line, same set-up every time. 3) Sprint at maximum effort through the ${dist} m line (keep running a few strides past it). 4) Two to three trials with 2-3 minutes of full rest. 5) Record the fastest time.`
);
const sprint = (id, dist, arName, enName, measuresAr, measuresEn, extraAr = '', extraEn = '') => ({
  id, name: t(arName, enName), category: 'speed', sports: ['all'],
  measures: t(measuresAr, measuresEn), protocol: sprintProto(dist),
  equipment: eq('gates', 'cones', 'track'), unit: 's', better: 'lower', norms: [],
  source: 'NSCA Essentials of Strength Training and Conditioning (speed testing); Haugen T, Buchheit M (2016) Sports Med 46:641-656',
  notes: t((extraAr ? extraAr + ' ' : '') + SPRINT_NOTE.ar, (extraEn ? extraEn + ' ' : '') + SPRINT_NOTE.en)
});
const flyProto = (dist) => t(
  `1) منطقة تسارع 20-30 متر قبل البوابة الأولى. 2) اللاعب يوصل لأقصى سرعة قبل البوابة الأولى. 3) الزمن بيتحسب بين البوابتين على مسافة ${ad(dist)} متر. 4) 2-3 محاولات بينهم 3-4 دقايق راحة. 5) السرعة القصوى (م/ث) = المسافة ÷ الزمن.`,
  `1) A 20-30 m acceleration zone before the first gate. 2) The athlete reaches top speed before the first gate. 3) Time is taken between two gates ${dist} m apart. 4) Two to three trials with 3-4 minutes rest. 5) Maximal velocity (m/s) = distance ÷ time.`
);
const flying = (id, dist) => ({
  id, name: t(`عدو طائر ${ad(dist)} متر`, `Flying ${dist} m sprint`), category: 'speed', sports: ['all'],
  measures: t('السرعة القصوى بعد التسارع', 'Maximal velocity after acceleration'),
  protocol: flyProto(dist), equipment: eq('gates', 'cones', 'track'), unit: 's', better: 'lower', norms: [],
  source: 'Haugen T, Buchheit M (2016) Sports Med 46:641-656; NSCA Essentials of Strength Training and Conditioning',
  notes: t('لازم بوابات ضوئية — التوقيت اليدوي على مسافات قصيرة كده خطؤه كبير. حوّل الزمن لسرعة بالمتر/ثانية أو كم/ساعة (× 3.6) علشان تستخدمه في تحديد شدة تمارين السرعة القصوى. ' + SPRINT_NOTE.ar, 'Timing gates are required — hand timing over such short distances is too error-prone. Convert time to m/s or km/h (× 3.6) to prescribe maximal-velocity training. ' + SPRINT_NOTE.en)
});
const P_SPEED = [
  sprint('ts_sprint_10m', 10, 'عدو 10 متر', '10 m sprint', 'التسارع الأولي (أول خطوات)', 'Initial acceleration (first steps)', 'أهم مسافة لرياضات الكرة والقتال اللي فيها انطلاقات قصيرة.', 'The key distance for ball and combat sports with short bursts.'),
  sprint('ts_sprint_20m', 20, 'عدو 20 متر', '20 m sprint', 'التسارع', 'Acceleration', 'ممكن تاخد زمن 10 متر من نفس العدوة لو عندك 3 بوابات.', 'You can capture a 10 m split in the same run with three gates.'),
  sprint('ts_sprint_30m', 30, 'عدو 30 متر', '30 m sprint', 'التسارع والانتقال للسرعة القصوى', 'Acceleration and transition toward top speed', 'جزء من بطاريات كتير (ومنها اختبارات اتحادات كرة القدم والرجبي).', 'Part of many batteries, including football and rugby federation testing.'),
  sprint('ts_sprint_40m', 40, 'عدو 40 متر', '40 m sprint', 'التسارع والسرعة القصوى', 'Acceleration and maximal speed', 'البوابات عند 10 و20 و30 و40 متر بتديك منحنى السرعة كامل.', 'Gates at 10, 20, 30 and 40 m give the full speed profile.'),
  sprint('ts_sprint_40yd', 36.58, 'عدو 40 ياردة', '40-yard dash', 'التسارع والسرعة (اختبار كومباين الـ NFL)', 'Acceleration and speed (NFL Combine test)', '40 ياردة = 36.58 متر، والبداية من وضع 3 نقاط في الكومباين. في كومباين الـ NFL اللاعبين السريعين في مراكز المهارة غالبًا بيجروا حوالي 4.3-4.6 ثانية إلكتروني، ولاعبي الخط الهجومي حوالي 5.0-5.4 ثانية.', '40 yd = 36.58 m, from a three-point start at the Combine. At the NFL Combine, fast skill-position players commonly run about 4.3-4.6 s (electronic), and offensive linemen about 5.0-5.4 s.'),
  flying('ts_flying_10m', 10),
  flying('ts_flying_20m', 20),
  flying('ts_flying_30m', 30),
  {
    ...sprint('ts_sprint_50m_youth', 50, 'عدو 50 متر (ناشئين)', '50 m sprint (youth)', 'السرعة العامة عند الأطفال والمراهقين', 'General running speed in children and adolescents', 'اختبار أساسي في بطاريات لياقة المدارس في اليابان وشرق آسيا، وبيستخدم كتير في انتقاء الناشئين.', 'A core item in school fitness batteries in Japan and East Asia and widely used in youth talent identification.'),
    population: t('الأطفال والناشئين 6-18 سنة', 'Children and adolescents 6-18'),
    source: 'Japanese Ministry of Education (MEXT) New Physical Fitness Test; NSCA Essentials of Strength Training and Conditioning'
  }
];
P_SPEED[4].protocol = t('1) إحماء 10-15 دقيقة. 2) بداية من وضع 3 نقاط (إيد على الأرض) أو من وقوف — ثبّت الطريقة. 3) عدو بأقصى سرعة لما بعد خط 40 ياردة (36.58 متر). 4) محاولتين بينهم 3 دقايق راحة. 5) سجّل الأسرع، وسجّل زمن 10 ياردات لو عندك بوابة.', '1) Warm up for 10-15 minutes. 2) Three-point start (hand down) or standing start — keep it consistent. 3) Sprint through the 40-yard (36.58 m) line. 4) Two trials with 3 minutes rest. 5) Record the fastest, plus the 10-yard split if a gate is available.');

/* ================= الرشاقة وتغيير الاتجاه ================= */
const P_AGILITY = [
  {
    id: 'ts_illinois_agility',
    name: t('اختبار إلينوي للرشاقة', 'Illinois agility test'),
    category: 'agility', sports: ['all'],
    measures: t('الرشاقة وتغيير الاتجاه مع السرعة', 'Agility and change of direction at speed'),
    protocol: t('1) ملعب 10 متر طول × 5 متر عرض، 4 أقماع في الأركان و4 أقماع في النص بينهم 3.3 متر. 2) البداية منبطح على البطن والإيدين جنب الكتف. 3) عند الإشارة: قوم واجري 10 متر، لف، ارجع، بعدين اعمل زجزاج بين أقماع النص رايح جاي، وبعدين 10 متر لقدام ورجوع لخط النهاية. 4) محاولتين وسجّل الأحسن. 5) لمس أي قمع = إعادة.', '1) Course 10 m long × 5 m wide: four cones at the corners and four centre cones 3.3 m apart. 2) Start lying face down, hands by the shoulders. 3) On "go", get up and sprint 10 m, turn, return, weave up and back through the centre cones, then sprint 10 m out and back to finish. 4) Two trials; record the best. 5) Knocking a cone = repeat.'),
    equipment: eq('cones', 'gates', 'tape_m'),
    unit: 's', better: 'lower',
    norms: [
      NL('رجال (مرجع عام)', 'Men (general reference)', 'm', null, lo(R5b, [15.2, 16.2, 18.2, 19.4])),
      NL('سيدات (مرجع عام)', 'Women (general reference)', 'f', null, lo(R5b, [17.0, 18.0, 21.8, 23.1]))
    ],
    source: 'Getchell B (1979) Physical Fitness: A Way of Life; norms from Davis B et al. (2000) Physical Education and the Study of Sport, via Topend Sports',
    notes: t('رجال: أقل من 15.2 ثانية ممتاز، 15.2-16.1 فوق المتوسط، 16.2-18.1 متوسط، 18.2-19.3 تحت المتوسط، أكتر من 19.3 ضعيف. سيدات: أقل من 17.0، 17.0-17.9، 18.0-21.7، 21.8-23.0، أكتر من 23.0. الاختبار طويل (حوالي 15-20 ثانية) فجزء منه بيقيس السرعة والتحمل كمان مش الرشاقة بس.', 'Men: <15.2 s excellent, 15.2-16.1 above average, 16.2-18.1 average, 18.2-19.3 below average, >19.3 poor. Women: <17.0, 17.0-17.9, 18.0-21.7, 21.8-23.0, >23.0. The test is long (about 15-20 s), so it also reflects speed and endurance, not only agility.')
  },
  {
    id: 'ts_t_test',
    name: t('اختبار T للرشاقة', 'T-test (agility)'),
    category: 'agility', sports: ['all'],
    measures: t('الرشاقة بحركات أمامية وجانبية وخلفية', 'Agility with forward, lateral and backward movement'),
    protocol: t('1) 4 أقماع على شكل T: قمع البداية (A)، وقمع B على بعد 9.14 متر (10 ياردات) قدامه، وقمعين C وD على بعد 4.57 متر يمين وشمال B. 2) اجري لقدام لـ B والمس قاعدته بإيدك اليمين. 3) خطوات جانبية (من غير تقاطع رجلين) لـ C والمسه بالشمال. 4) جانبي لـ D والمسه باليمين. 5) جانبي لـ B والمسه بالشمال. 6) ارجع لورا لـ A. 7) محاولتين وسجّل الأحسن.', '1) Four cones in a T: start cone A, cone B 9.14 m (10 yd) ahead, cones C and D 4.57 m either side of B. 2) Sprint to B and touch its base with the right hand. 3) Shuffle left (no crossing feet) to C and touch with the left hand. 4) Shuffle right to D, touch with the right hand. 5) Shuffle back to B, touch with the left hand. 6) Backpedal to A. 7) Two trials; record the best.'),
    equipment: eq('cones', 'gates', 'tape_m'),
    unit: 's', better: 'lower',
    norms: [
      NL('رجال (مرجع عام)', 'Men (general reference)', 'm', null, lo(['excellent', 'good', 'average', 'poor'], [9.5, 10.5, 11.5])),
      NL('سيدات (مرجع عام)', 'Women (general reference)', 'f', null, lo(['excellent', 'good', 'average', 'poor'], [10.5, 11.5, 12.5]))
    ],
    source: 'Semenick D (1990) NSCA Journal 12(1):36-37; Pauole K et al. (2000) J Strength Cond Res 14:443-450; ratings via Topend Sports',
    notes: t('رجال: أقل من 9.5 ثانية ممتاز، 9.5-10.5 جيد، 10.5-11.5 متوسط، أكتر من 11.5 ضعيف. سيدات: أقل من 10.5، 10.5-11.5، 11.5-12.5، أكتر من 12.5.', 'Men: <9.5 s excellent, 9.5-10.5 good, 10.5-11.5 average, >11.5 poor. Women: <10.5, 10.5-11.5, 11.5-12.5, >12.5.')
  },
  {
    id: 'ts_505_agility',
    name: t('اختبار 505 للرشاقة', '505 agility test'),
    category: 'agility', sports: ['all'],
    measures: t('سرعة تغيير الاتجاه 180 درجة', 'Speed of a 180° change of direction'),
    protocol: t('1) بوابة عند خط 10 متر، وخط الدوران عند 15 متر. 2) اللاعب يبدأ من 0 ويجري بأقصى سرعة، يعدّي البوابة، يلف على خط 15 متر (رجل على الخط أو بعده)، ويرجع يعدّي البوابة تاني. 3) الزمن بيتحسب من أول عبور لتاني عبور (5 متر رايح + 5 متر راجع). 4) محاولتين لكل رجل دوران وسجّل الأحسن لكل ناحية.', '1) Gate at 10 m, turning line at 15 m. 2) Athlete starts at 0, sprints through the gate, turns on the 15 m line (foot on or over it) and sprints back through the gate. 3) Time runs from first to second gate crossing (5 m in + 5 m out). 4) Two trials turning on each foot; record the best for each side.'),
    equipment: eq('gates', 'cones', 'tape_m'),
    unit: 's', better: 'lower',
    norms: [],
    source: 'Draper JA, Lancaster MG (1985) Aust J Sci Med Sport; Nimphius S et al. (2016) J Strength Cond Res (COD deficit)',
    notes: t('مفيش جداول سكّانية موحدة. استخدم "عجز تغيير الاتجاه" (COD deficit) = زمن 505 − زمن 10 متر عدو: الرقم ده بيفصل مهارة الدوران عن السرعة الخطية — لو عالي، اشتغل على تكنيك الدوران والفرملة. قارن الجانبين.', 'No universal population tables. Use the COD deficit = 505 time − 10 m sprint time: it separates turning ability from linear speed — if high, work on turning and braking technique. Compare sides.')
  },
  {
    id: 'ts_pro_agility',
    name: t('اختبار برو أجيليتي (5-10-5 / 20 ياردة شاتل)', 'Pro agility (5-10-5 / 20-yard shuttle)'),
    category: 'agility', sports: ['all'],
    measures: t('تغيير الاتجاه الجانبي والتسارع والفرملة', 'Lateral change of direction, acceleration and braking'),
    protocol: t('1) 3 خطوط بينهم 5 ياردات (4.57 متر). 2) ابدأ في الخط الأوسط في وضع 3 نقاط. 3) اجري 5 ياردات يمين والمس الخط بإيدك، بعدين 10 ياردات شمال والمس الخط، بعدين 5 ياردات ترجع وتعدّي الخط الأوسط. 4) محاولتين، مرة تبدأ يمين ومرة شمال، وسجّل الأحسن.', '1) Three lines 5 yd (4.57 m) apart. 2) Start on the middle line in a three-point stance. 3) Sprint 5 yd to one side and touch the line with the hand, 10 yd to the other side and touch, then 5 yd back through the middle line. 4) Two trials, one starting each direction; record the best.'),
    equipment: eq('cones', 'gates', 'tape_m'),
    unit: 's', better: 'lower',
    norms: [],
    source: 'NFL Scouting Combine protocol; NSCA Essentials of Strength Training and Conditioning',
    notes: t('جزء من كومباين الـ NFL. مفيش جداول سكّانية معتمدة؛ لاعبي الكومباين في مراكز المهارة غالبًا حوالي 4.0-4.4 ثانية. التوقيت اليدوي بيطلع أسرع من الإلكتروني.', 'Part of the NFL Combine. No validated population tables; skill-position players at the Combine are commonly around 4.0-4.4 s. Hand timing reads faster than electronic.')
  },
  {
    id: 'ts_three_cone',
    name: t('اختبار الأقماع الثلاثة (L-drill)', 'Three-cone drill (L-drill)'),
    category: 'agility', sports: ['all'],
    measures: t('الرشاقة والدوران الحاد والسيطرة على الجسم', 'Agility, tight turning and body control'),
    protocol: t('1) 3 أقماع على شكل L، كل ضلع 5 ياردات (4.57 متر). 2) من قمع البداية اجري للقمع التاني والمسه وارجع. 3) اجري تاني للقمع التاني، لف حواليه من برا واتجه للقمع التالت، لف حواليه، وارجع حوالين القمع التاني لحد خط البداية. 4) محاولتين وسجّل الأحسن.', '1) Three cones in an L, 5 yd (4.57 m) per side. 2) From the start cone sprint to cone 2, touch the line and return. 3) Sprint back to cone 2, round it on the outside to cone 3, loop cone 3, and return around cone 2 to finish. 4) Two trials; record the best.'),
    equipment: eq('cones', 'gates', 'tape_m'),
    unit: 's', better: 'lower',
    norms: [],
    source: 'NFL Scouting Combine protocol',
    notes: t('مفيش معايير سكّانية منشورة؛ بيستخدم أساسًا لمقارنة اللاعبين في نفس الرياضة والمركز.', 'No published population norms; mainly used to compare players within the same sport and position.')
  },
  {
    id: 'ts_hexagon_agility',
    name: t('اختبار السداسي للرشاقة', 'Hexagon agility test'),
    category: 'agility', sports: ['all'],
    measures: t('سرعة القدمين والرشاقة مع الحفاظ على التوازن', 'Foot speed and agility while maintaining balance'),
    protocol: t('1) ارسم سداسي على الأرض طول ضلعه 60.5 سم وزواياه 120 درجة. 2) قف في النص ووشك لضلع ثابت طول الاختبار. 3) اقفز بالرجلين برا الضلع الأول ورجع جوه، وبعدين الضلع اللي بعده باتجاه عقارب الساعة، لحد ما تكمّل 3 لفات كاملة (18 قفزة للخارج). 4) لو لمست الخط أو فقدت الاتجاه أعد المحاولة. 5) 3 محاولات وسجّل الأحسن.', '1) Mark a hexagon with 60.5 cm sides and 120° angles. 2) Stand in the centre, facing the same direction throughout. 3) Jump with both feet over the first side and back in, then the next side clockwise, until three full circuits are done (18 outward jumps). 4) Touching a line or turning the body means a restart. 5) Three trials; record the best.'),
    equipment: eq('floor_tape', 'stopwatch'),
    unit: 's', better: 'lower',
    norms: [],
    source: 'Beekhuizen KS et al. (2009) J Strength Cond Res 23:2167-2171; Johnson & Nelson (1986)',
    notes: t('مفيش جداول معتمدة موحدة؛ مفيد للمتابعة ولرياضات المضرب والملاكمة. ثبّت اتجاه الدوران في كل اختبار.', 'No validated universal tables; useful for tracking and for racket and combat sports. Keep the direction consistent between tests.')
  },
  {
    id: 'ts_arrowhead_agility',
    name: t('اختبار رأس السهم للرشاقة', 'Arrowhead agility test'),
    category: 'agility', sports: ['all'],
    measures: t('الرشاقة وتغيير الاتجاه لليمين والشمال في الرياضات الجماعية', 'Change of direction to both sides for team sports'),
    protocol: t('1) خط بداية عرضه 5 متر (قمعين)، قمع في النص على بعد 10 متر، وقمع على بعد 15 متر، وقمعين جانبيين على بعد 5 متر من قمع النص. 2) اجري للقمع الأوسط، لف للقمع الجانبي (يمين أو شمال)، ثم للقمع البعيد، ثم ارجع لخط النهاية. 3) محاولتين لكل اتجاه، بينهم 2-3 دقايق. 4) سجّل الأحسن لكل ناحية.', '1) A 5 m start line (two cones), a middle cone 10 m ahead, a far cone at 15 m, and two side cones 5 m either side of the middle cone. 2) Sprint to the middle cone, cut to a side cone (left or right), then to the far cone, then back to the finish. 3) Two trials each way with 2-3 minutes rest. 4) Record the best for each side.'),
    equipment: eq('cones', 'gates', 'tape_m'),
    unit: 's', better: 'lower',
    norms: [],
    source: 'Topend Sports (Arrowhead agility test protocol); used in Australian and Irish team-sport talent testing',
    notes: t('مفيش معايير منشورة معتمدة. أهم استخدام: مقارنة اليمين والشمال (فرق واضح = نقطة ضعف في تغيير الاتجاه لناحية معينة).', 'No validated published norms. Its main use is comparing left and right (a clear difference shows a weaker cutting side).')
  }
];

/* ================= التحمل الهوائي ================= */
const TEAM = ['football', 'futsal', 'basketball', 'handball', 'rugby', 'hockey', 'volleyball', 'water_polo', 'tennis', 'padel', 'squash', 'badminton'];
const VO2_RATE = t('قيّم الـ VO2max الناتج بجدول "الحد الأقصى لاستهلاك الأكسجين".', 'Rate the resulting VO2max with the "VO2max categories" test.');
const P_AEROBIC = [
  {
    id: 'ts_cooper_12min',
    name: t('اختبار كوبر 12 دقيقة', 'Cooper 12-minute run'),
    category: 'aerobic', sports: ['all'],
    measures: t('التحمل الهوائي (تقدير الحد الأقصى لاستهلاك الأكسجين)', 'Aerobic endurance (estimated VO2max)'),
    protocol: t('1) مضمار 400 متر بعلامات كل 100 متر. 2) إحماء 10 دقايق. 3) اجري (أو امشي لو اضطريت) أكبر مسافة ممكنة في 12 دقيقة بالظبط. 4) عند الصفارة وقف مكانك وقيس المسافة لأقرب 10 متر. 5) اختبار واحد.', '1) 400 m track marked every 100 m. 2) Warm up for 10 minutes. 3) Run (walking if needed) as far as possible in exactly 12 minutes. 4) Stop at the whistle and measure distance to the nearest 10 m. 5) One trial.'),
    equipment: eq('track', 'stopwatch', 'cones'),
    unit: 'm', better: 'higher',
    norms: [
      ...table('m', R5b, [[13, 14, 2700, 2400, 2200, 2100], [15, 16, 2800, 2500, 2300, 2200], [17, 19, 3000, 2700, 2500, 2300], [20, 29, 2800, 2400, 2200, 1600], [30, 39, 2700, 2300, 1900, 1500], [40, 49, 2500, 2100, 1700, 1400], [50, 99, 2400, 2000, 1600, 1300]]),
      ...table('f', R5b, [[13, 14, 2000, 1900, 1600, 1500], [15, 16, 2100, 2000, 1700, 1600], [17, 20, 2300, 2100, 1800, 1700], [20, 29, 2700, 2200, 1800, 1500], [30, 39, 2500, 2000, 1700, 1400], [40, 49, 2300, 1900, 1500, 1200], [50, 99, 2200, 1700, 1400, 1100]])
    ],
    source: 'Cooper KH (1968) JAMA 203:201-204; norm table via Topend Sports',
    notes: t('تقدير VO2max (مل/كجم/دقيقة) = (المسافة بالمتر − 504.9) ÷ 44.73. الفئات: ممتاز، فوق المتوسط، متوسط، تحت المتوسط، ضعيف. الحرارة والرطوبة بتأثر جدًا — اختبر في جو معتدل ونفس الظروف.', 'Estimated VO2max (ml/kg/min) = (distance in m − 504.9) ÷ 44.73. Categories: excellent, above average, average, below average, poor. Heat and humidity have a large effect — test in mild conditions and keep them consistent.')
  },
  {
    id: 'ts_beep_test',
    name: t('اختبار الجري المكوكي المتدرج (البيب تست / ليجيه)', 'Multistage fitness test (beep test / Léger 20 m shuttle)'),
    category: 'aerobic', sports: ['all'],
    measures: t('الحد الأقصى لاستهلاك الأكسجين (تقديري) والتحمل الهوائي', 'Estimated VO2max and aerobic endurance'),
    protocol: t('1) مسافة 20 متر بين خطين على أرض غير زلقة. 2) شغّل الصوت الرسمي: اجري بين الخطين وتوصل للخط مع الصفارة. 3) السرعة بتزيد كل دقيقة تقريبًا (مستوى). 4) لو متوصلتش للخط مع الصفارة ياخد إنذار؛ التاني على التوالي = نهاية الاختبار. 5) سجّل آخر مستوى ومكوك اتكمّلوا (مثلًا 9.5).', '1) 20 m between two lines on a non-slip surface. 2) Play the official audio: run between the lines, reaching each line on the beep. 3) Speed increases about every minute (level). 4) Missing a line earns a warning; a second consecutive miss ends the test. 5) Record the last completed level and shuttle (e.g. 9.5).'),
    equipment: eq('audio', 'cones', 'tape_m'),
    unit: 'level', better: 'higher',
    norms: [],
    source: 'Léger LA, Lambert J (1982) Eur J Appl Physiol; Léger LA et al. (1988) J Sports Sci 6:93-101; Ramsbottom R et al. (1988) Br J Sports Med',
    notes: t('تقدير VO2max للبالغين (18+) من Léger 1988: VO2max = −24.4 + 6.0 × السرعة (كم/س) لآخر مستوى مكتمل. للأطفال 6-18: VO2max = 31.025 + 3.238×السرعة − 3.248×السن + 0.1536×السرعة×السن. في نسخة Léger 1988 المستوى الأول 8.5 كم/س والزيادة 0.5 كم/س كل مستوى — راجع جدول السرعات للنسخة الصوتية اللي بتستخدمها. ' + VO2_RATE.ar, 'Adult (18+) VO2max from Léger 1988: VO2max = −24.4 + 6.0 × speed (km/h) of the last completed stage. For ages 6-18: VO2max = 31.025 + 3.238×speed − 3.248×age + 0.1536×speed×age. In the Léger 1988 version stage 1 is 8.5 km/h rising 0.5 km/h per stage — check the speed table for the audio version you use. ' + VO2_RATE.en)
  },
  {
    id: 'ts_yoyo_ir1',
    name: t('اختبار يو-يو للاستشفاء المتقطع — المستوى 1', 'Yo-Yo Intermittent Recovery Test — Level 1'),
    category: 'aerobic', sports: TEAM,
    measures: t('القدرة على تكرار الجهد العالي مع استشفاء قصير (هوائي أساسًا مع مساهمة لاهوائية)', 'Ability to repeat high-intensity efforts with short recovery (mainly aerobic with an anaerobic contribution)'),
    protocol: t('1) مسافة 20 متر للجري + منطقة استشفاء 5 متر ورا خط البداية. 2) مع الصوت: جري 20 متر رايح و20 راجع (2 × 20 متر)، بعدين 10 ثواني استشفاء نشط (مشي/هرولة 2 × 5 متر). 3) السرعة بتبدأ من 10 كم/س وبتزيد تدريجيًا. 4) الفشل مرتين في الوصول للخط = نهاية. 5) النتيجة = إجمالي المسافة بالمتر.', '1) A 20 m running lane plus a 5 m recovery zone behind the start. 2) On the audio: run 2 × 20 m (out and back), then 10 s of active recovery (walk/jog 2 × 5 m). 3) Speed starts at 10 km/h and increases progressively. 4) Failing to reach the line twice ends the test. 5) Score = total distance in metres.'),
    equipment: eq('audio', 'cones', 'tape_m'),
    unit: 'm', better: 'higher',
    norms: [],
    source: 'Bangsbo J, Iaia FM, Krustrup P (2008) Sports Med 38:37-51; Krustrup P et al. (2003) Med Sci Sports Exerc',
    notes: t('تقدير VO2max (مل/كجم/دقيقة) = المسافة × 0.0084 + 36.4. الاختبار حساس جدًا للتغير في لياقة لاعبي الرياضات الجماعية، والمقارنة الأنسب تكون مع لاعبين في نفس الرياضة والمستوى والمركز. ' + VO2_RATE.ar, 'Estimated VO2max (ml/kg/min) = distance × 0.0084 + 36.4. The test is very sensitive to fitness change in team-sport players; compare with players of the same sport, level and position. ' + VO2_RATE.en)
  },
  {
    id: 'ts_yoyo_ir2',
    name: t('اختبار يو-يو للاستشفاء المتقطع — المستوى 2', 'Yo-Yo Intermittent Recovery Test — Level 2'),
    category: 'aerobic', sports: TEAM,
    population: t('رياضيين مدرّبين كويس', 'Well-trained athletes'),
    measures: t('القدرة على تكرار جهد عالي جدًا — مساهمة لاهوائية أكبر من المستوى 1', 'Ability to repeat very intense efforts — larger anaerobic contribution than Level 1'),
    protocol: t('1) نفس تجهيز المستوى 1 (20 متر + 5 متر استشفاء، 10 ثواني راحة نشطة). 2) السرعة بتبدأ من 13 كم/س وبتزيد أسرع. 3) الفشل مرتين = نهاية. 4) النتيجة = إجمالي المسافة.', '1) Same set-up as Level 1 (20 m + 5 m recovery zone, 10 s active rest). 2) Speed starts at 13 km/h and rises faster. 3) Two failures end the test. 4) Score = total distance.'),
    equipment: eq('audio', 'cones', 'tape_m'),
    unit: 'm', better: 'higher',
    norms: [],
    source: 'Bangsbo J, Iaia FM, Krustrup P (2008) Sports Med 38:37-51; Krustrup P et al. (2006) Med Sci Sports Exerc',
    notes: t('تقدير VO2max = المسافة × 0.0136 + 45.3. مناسب للاعبين المتقدمين؛ للمبتدئين والناشئين استخدم المستوى 1.', 'Estimated VO2max = distance × 0.0136 + 45.3. Suited to advanced players; use Level 1 for novices and youth.')
  },
  {
    id: 'ts_yoyo_endurance',
    name: t('اختبار يو-يو للتحمل', 'Yo-Yo Endurance Test'),
    category: 'aerobic', sports: ['all'],
    measures: t('التحمل الهوائي المستمر (بديل للبيب تست)', 'Continuous aerobic endurance (an alternative to the beep test)'),
    protocol: t('1) جري مستمر 2 × 20 متر مع الصوت من غير فترات راحة. 2) المستوى 1 بيبدأ من 8 كم/س والمستوى 2 (للمدرّبين) من 11.5 كم/س. 3) الفشل مرتين = نهاية. 4) النتيجة = المسافة الكلية أو آخر مستوى.', '1) Continuous 2 × 20 m shuttles to the audio, without rest periods. 2) Level 1 starts at 8 km/h; Level 2 (trained) at 11.5 km/h. 3) Two failures end the test. 4) Score = total distance or last level.'),
    equipment: eq('audio', 'cones', 'tape_m'),
    unit: 'm', better: 'higher',
    norms: [],
    source: 'Bangsbo J (1994) Fitness Training in Football: A Scientific Approach; Bangsbo J (1996) Yo-Yo Tests',
    notes: t('بيقيس نفس القدرة اللي بيقيسها البيب تست تقريبًا. مفيش جداول سكانية موحدة؛ تابع اللاعب بنفسه.', 'Measures much the same quality as the beep test. No universal population tables; track the athlete over time.')
  },
  {
    id: 'ts_30_15_ift',
    name: t('اختبار اللياقة المتقطع 30-15', '30-15 Intermittent Fitness Test (30-15 IFT)'),
    category: 'aerobic', sports: TEAM,
    measures: t('السرعة الهوائية المتقطعة القصوى (VIFT) والقدرة على الاستشفاء وتغيير الاتجاه', 'Maximal intermittent running velocity (VIFT), recovery and change-of-direction ability'),
    protocol: t('1) ملعب 40 متر بمناطق 3 متر في النص والأطراف. 2) جري مكوكي 30 ثانية مع الصوت، بعدين 15 ثانية راحة سلبية (مشي للخط التالي). 3) السرعة بتبدأ من 8 كم/س وبتزيد 0.5 كم/س كل مرحلة. 4) الاختبار بيخلص لما اللاعب ميقدرش يوصل لمنطقة الـ 3 متر 3 مرات متتالية. 5) النتيجة = سرعة آخر مرحلة اكتملت (VIFT).', '1) A 40 m course with 3 m zones at the middle and ends. 2) Shuttle running for 30 s to the audio, then 15 s passive recovery (walking to the next line). 3) Speed starts at 8 km/h and rises 0.5 km/h per stage. 4) The test ends when the player fails to reach the 3 m zone three consecutive times. 5) Score = speed of the last completed stage (VIFT).'),
    equipment: eq('audio', 'cones', 'tape_m'),
    unit: 'km/h', better: 'higher',
    norms: [],
    source: 'Buchheit M (2008) J Strength Cond Res 22:365-374',
    notes: t('تقدير VO2max = 28.3 − 2.15×الجنس − 0.741×السن − 0.0357×الوزن + 0.0586×السن×VIFT + 1.03×VIFT (الجنس: 1 رجال، 2 سيدات). ميزته الكبيرة: الـ VIFT بيستخدم مباشرة لتحديد سرعات التدريب الفتري (مثلًا 90-95% من VIFT في تمارين 15/15).', 'Estimated VO2max = 28.3 − 2.15×G − 0.741×age − 0.0357×mass + 0.0586×age×VIFT + 1.03×VIFT (G: 1 male, 2 female). Its big advantage: VIFT directly sets interval-training speeds (e.g. 90-95% VIFT for 15/15 runs).')
  },
  {
    id: 'ts_run_1_5_mile',
    name: t('جري 1.5 ميل', '1.5-mile run'),
    category: 'aerobic', sports: ['all'],
    measures: t('التحمل الهوائي (تقدير VO2max)', 'Aerobic endurance (estimated VO2max)'),
    protocol: t('1) مسافة 2414 متر (6 لفات مضمار 400 متر + 14 متر). 2) إحماء 5-10 دقايق. 3) اجري المسافة في أسرع زمن ممكن بتوزيع مجهود منتظم. 4) سجّل الزمن بالدقايق (مثلًا 11:30 = 11.5 دقيقة).', '1) 2,414 m (six laps of a 400 m track plus 14 m). 2) Warm up for 5-10 minutes. 3) Cover the distance as fast as possible with even pacing. 4) Record time in minutes (e.g. 11:30 = 11.5 min).'),
    equipment: eq('track', 'stopwatch'),
    unit: 'min', better: 'lower',
    norms: [],
    source: 'Cooper KH (1968) JAMA; ACSM\'s Guidelines for Exercise Testing and Prescription (field test estimation)',
    notes: t('تقدير VO2max (مل/كجم/دقيقة) = 3.5 + 483 ÷ الزمن بالدقايق. ' + VO2_RATE.ar + ' غير مناسب للأشخاص الخاملين تمامًا أو عندهم عوامل خطورة قلبية من غير تصريح طبي.', 'Estimated VO2max (ml/kg/min) = 3.5 + 483 ÷ time in minutes. ' + VO2_RATE.en + ' Not suitable for very sedentary people or those with cardiac risk factors without medical clearance.')
  },
  {
    id: 'ts_run_2_4km',
    name: t('جري 2.4 كم', '2.4 km run'),
    category: 'aerobic', sports: ['all'],
    measures: t('التحمل الهوائي — منتشر في اختبارات الجيوش والشرطة والمدارس', 'Aerobic endurance — common in military, police and school testing'),
    protocol: t('1) مسافة 2400 متر (6 لفات مضمار 400 متر). 2) إحماء. 3) اجري بأسرع زمن ممكن بتوزيع منتظم. 4) سجّل الزمن بالدقايق.', '1) 2,400 m (six laps of a 400 m track). 2) Warm up. 3) Run as fast as possible with even pacing. 4) Record the time in minutes.'),
    equipment: eq('track', 'stopwatch'),
    unit: 'min', better: 'lower',
    norms: [],
    source: 'Cooper KH (1968); used in UK Armed Forces and Singapore NAPFA testing',
    notes: t('المسافة شبه مطابقة لجري 1.5 ميل، فتقدر تستخدم نفس المعادلة تقريبًا: VO2max ≈ 3.5 + 483 ÷ الزمن بالدقايق. الحدود المطلوبة بتختلف حسب الجهة (جيش، شرطة، مدرسة) والسن والجنس — ارجع للائحة الجهة نفسها.', 'The distance is almost identical to 1.5 miles, so the same equation applies approximately: VO2max ≈ 3.5 + 483 ÷ time in minutes. Pass standards vary by organisation (military, police, school), age and sex — use that organisation\'s own regulations.')
  },
  {
    id: 'ts_rockport_walk',
    name: t('اختبار روكبورت للمشي ميل', 'Rockport 1-mile walk test'),
    category: 'aerobic', sports: ['all'],
    population: t('المبتدئين وكبار السن ومن لا يستطيع الجري', 'Beginners, older adults and anyone who cannot run'),
    measures: t('تقدير VO2max من المشي السريع', 'Estimated VO2max from brisk walking'),
    protocol: t('1) مسافة 1609 متر (4 لفات مضمار + 9 متر). 2) امشي بأسرع ما تقدر من غير جري. 3) سجّل الزمن بالدقايق (عشري). 4) قيس النبض فورًا عند النهاية (حزام نبض أو 15 ثانية × 4). 5) طبّق المعادلة.', '1) 1,609 m (four laps plus 9 m). 2) Walk as fast as possible without running. 3) Record time in decimal minutes. 4) Take the heart rate immediately at the finish (strap, or 15 s count × 4). 5) Apply the equation.'),
    equipment: eq('track', 'stopwatch', 'hrm', 'scale'),
    unit: 'ml/kg/min', better: 'higher',
    norms: vo2Norms(),
    source: 'Kline GM et al. (1987) Med Sci Sports Exerc 19:253-259; VO2max categories: ' + VO2_SRC,
    notes: t('VO2max = 132.853 − 0.0769×الوزن (باوند) − 0.3877×السن + 6.315×الجنس (1 رجل، 0 ست) − 3.2649×الزمن (دقيقة) − 0.1565×النبض. الوزن بالباوند = الكيلو × 2.2046. الجدول بيقيّم الـ VO2max المحسوب.', 'VO2max = 132.853 − 0.0769×weight (lb) − 0.3877×age + 6.315×sex (1 male, 0 female) − 3.2649×time (min) − 0.1565×HR. Weight in lb = kg × 2.2046. The table rates the calculated VO2max.')
  },
  {
    id: 'ts_6min_walk',
    name: t('اختبار المشي 6 دقايق (إكلينيكي)', '6-minute walk test (clinical)'),
    category: 'aerobic', sports: ['all'],
    population: t('المرضى وكبار السن وبرامج التأهيل القلبي والرئوي', 'Patients, older adults, cardiac and pulmonary rehab'),
    measures: t('القدرة الوظيفية على المشي والتحمل تحت الأقصى', 'Functional walking capacity and submaximal endurance'),
    protocol: t('1) ممر مستوي 30 متر بعلامات كل 3 متر وأقماع عند الأطراف. 2) راحة 10 دقايق قاعد قبل الاختبار، وقيس النبض والضغط. 3) التعليمات: "امشي أكبر مسافة تقدر عليها في 6 دقايق، مسموح تبطّأ أو تقف وتكمّل". 4) شجّع بعبارات موحدة كل دقيقة. 5) سجّل المسافة الكلية والنبض والتشبع ودرجة ضيق النفس (بورج).', '1) Flat 30 m corridor marked every 3 m with cones at each end. 2) Rest seated 10 minutes beforehand; record HR and BP. 3) Instruction: "walk as far as you can in 6 minutes; you may slow down or stop and resume". 4) Use standard encouragement each minute. 5) Record total distance, HR, SpO2 and Borg dyspnoea rating.'),
    equipment: eq('tape_m', 'cones', 'stopwatch', 'hrm'),
    unit: 'm', better: 'higher',
    norms: [],
    source: 'ATS Statement (2002) Am J Respir Crit Care Med 166:111-117; Enright PL, Sherrill DL (1998) Am J Respir Crit Care Med 158:1384-1387',
    notes: t('المسافة المتوقعة للبالغين الأصحاء (Enright & Sherrill): رجال = 7.57×الطول (سم) − 5.02×السن − 1.76×الوزن (كجم) − 309. سيدات = 2.11×الطول − 2.29×الوزن − 5.78×السن + 667. النسبة من المتوقع أهم من الرقم لوحده. وقف الاختبار لو حصل ألم صدر أو ضيق نفس شديد أو دوخة أو شحوب.', 'Predicted distance for healthy adults (Enright & Sherrill): men = 7.57×height (cm) − 5.02×age − 1.76×weight (kg) − 309; women = 2.11×height − 2.29×weight − 5.78×age + 667. Percent of predicted matters more than the raw number. Stop for chest pain, severe breathlessness, dizziness or pallor.')
  },
  {
    id: 'ts_queens_college_step',
    name: t('اختبار كوينز كوليدج للصعود', 'Queens College step test'),
    category: 'aerobic', sports: ['all'],
    measures: t('تقدير VO2max من نبض الاستشفاء بعد صعود السلم', 'Estimated VO2max from recovery heart rate after stepping'),
    protocol: t('1) سلمة ارتفاعها 41.3 سم (16.25 بوصة). 2) اطلع وانزل 3 دقايق: رجال 24 دورة/دقيقة (مترونوم 96)، سيدات 22 دورة/دقيقة (مترونوم 88). 3) عند النهاية قف واعد النبض من الثانية 5 للثانية 20 (15 ثانية) واضرب × 4.', '1) Step height 41.3 cm (16.25 in). 2) Step up and down for 3 minutes: men 24 cycles/min (metronome 96), women 22 cycles/min (metronome 88). 3) At the end, stand and count the pulse from 5 to 20 s (15 s) and multiply by 4.'),
    equipment: eq('step', 'metronome', 'stopwatch', 'hrm'),
    unit: 'ml/kg/min', better: 'higher',
    norms: vo2Norms(),
    source: 'McArdle WD et al. (1972) Med Sci Sports 4:182-186; VO2max categories: ' + VO2_SRC,
    notes: t('رجال: VO2max = 111.33 − 0.42 × النبض. سيدات: VO2max = 65.81 − 0.1847 × النبض. الجدول بيقيّم الـ VO2max المحسوب. الأدوية اللي بتأثر على النبض (زي حاصرات بيتا) بتبوّظ النتيجة.', 'Men: VO2max = 111.33 − 0.42 × HR. Women: VO2max = 65.81 − 0.1847 × HR. The table rates the calculated VO2max. Heart-rate-altering medication (e.g. beta-blockers) invalidates the result.')
  },
  {
    id: 'ts_harvard_step',
    name: t('اختبار هارفارد للصعود', 'Harvard step test'),
    category: 'aerobic', sports: ['all'],
    population: t('الشباب الأصحاء والرياضيين', 'Healthy young adults and athletes'),
    measures: t('اللياقة الهوائية من سرعة استشفاء النبض', 'Aerobic fitness from heart-rate recovery'),
    protocol: t('1) بنش ارتفاعه 50.8 سم (20 بوصة) للرجال (وكثير بيستخدموا 40 سم للسيدات). 2) اطلع وانزل 30 مرة في الدقيقة لمدة 5 دقايق أو لحد الإرهاق. 3) اقعد فورًا. 4) اعد النبض 30 ثانية عند: 1-1.5 دقيقة، 2-2.5، 3-3.5 بعد النهاية. 5) مؤشر اللياقة = (100 × مدة الاختبار بالثواني) ÷ (2 × مجموع العدّات التلاتة).', '1) Bench 50.8 cm (20 in) for men (40 cm is often used for women). 2) Step up and down 30 times per minute for 5 minutes or until exhaustion. 3) Sit immediately. 4) Count the pulse for 30 s at 1-1.5, 2-2.5 and 3-3.5 minutes after stopping. 5) Fitness index = (100 × test duration in s) ÷ (2 × sum of the three counts).'),
    equipment: eq('step', 'metronome', 'stopwatch'),
    unit: 'score', better: 'higher',
    norms: [NL('البالغين (تصنيف Brouha)', 'Adults (Brouha ratings)', 'any', null, hi(R5b, [90, 80, 65, 55]))],
    source: 'Brouha L (1943) Res Q 14:31-36; ratings via Topend Sports',
    notes: t('التصنيف: أكتر من 90 ممتاز، 80-89 جيد، 65-79 فوق المتوسط، 55-64 تحت المتوسط، أقل من 55 ضعيف. الصعود 5 دقايق على ارتفاع كبير مُجهد — مش مناسب للناس ذوي الوزن الزايد جدًا أو مشاكل الركبة.', 'Ratings: >90 excellent, 80-89 good, 65-79 high average, 55-64 low average, <55 poor. Five minutes on a high step is demanding — not suitable for very heavy individuals or those with knee problems.')
  },
  {
    id: 'ts_ymca_step',
    name: t('اختبار YMCA للصعود 3 دقايق', 'YMCA 3-minute step test'),
    category: 'aerobic', sports: ['all'],
    measures: t('اللياقة الهوائية من نبض الاستشفاء بعد دقيقة', 'Aerobic fitness from 1-minute recovery heart rate'),
    protocol: t('1) سلمة ارتفاعها 30.5 سم (12 بوصة). 2) مترونوم 96 (يعني 24 صعدة كاملة في الدقيقة: طلوع-طلوع-نزول-نزول). 3) اطلع وانزل 3 دقايق. 4) اقعد فورًا في خلال 5 ثواني واعد النبض لمدة دقيقة كاملة.', '1) Step height 30.5 cm (12 in). 2) Metronome at 96 (24 full steps per minute: up-up-down-down). 3) Step for 3 minutes. 4) Sit within 5 s and count the pulse for one full minute.'),
    equipment: eq('step', 'metronome', 'stopwatch', 'hrm'),
    unit: 'bpm', better: 'lower',
    norms: [
      ...table('m', R7, [[18, 25, 79, 88, 95, 102, 111, 124], [26, 35, 79, 88, 96, 104, 114, 126]], lo),
      ...table('f', R7, [[18, 25, 85, 96, 104, 113, 122, 135], [26, 35, 85, 95, 104, 113, 122, 134]], lo)
    ],
    source: 'Golding LA, Myers CR, Sinning WE (1989) Y\'s Way to Physical Fitness, YMCA of the USA; via Topend Sports',
    notes: t('الفئات: ممتاز، جيد، فوق المتوسط، متوسط، تحت المتوسط، ضعيف، ضعيف جدًا. الجدول هنا لسن 18-35؛ الجداول الكاملة لحد 65+ موجودة في دليل اختبارات YMCA.', 'Categories: excellent, good, above average, average, below average, poor, very poor. The table here covers ages 18-35; full tables to age 65+ are in the YMCA Fitness Testing and Assessment Manual.')
  },
  {
    id: 'ts_ukk_2km_walk',
    name: t('اختبار UKK للمشي 2 كم', 'UKK 2 km walk test'),
    category: 'aerobic', sports: ['all'],
    population: t('البالغين الأصحاء 20-65 سنة', 'Healthy adults 20-65'),
    measures: t('مؤشر اللياقة الهوائية من زمن المشي والنبض والسن ومؤشر الكتلة', 'Aerobic fitness index from walking time, heart rate, age and BMI'),
    protocol: t('1) مسار مستوي 2 كم. 2) إحماء 5 دقايق. 3) امشي بأسرع وتيرة منتظمة تقدر عليها من غير جري. 4) سجّل الزمن (دقايق وثواني) والنبض عند النهاية مباشرة. 5) احسب المؤشر.', '1) Flat 2 km course. 2) Warm up for 5 minutes. 3) Walk at the fastest steady pace you can without running. 4) Record time (min and s) and heart rate at the finish. 5) Calculate the index.'),
    equipment: eq('track', 'stopwatch', 'hrm'),
    unit: 'score', better: 'higher',
    norms: [NL('البالغين 20-65 (مؤشر UKK)', 'Adults 20-65 (UKK index)', 'any', [20, 65], hi(R5b, [131, 111, 90, 70]))],
    source: 'Oja P et al. (1991) Int J Sports Med 12:356-362; UKK Institute, Finland',
    notes: t('رجال: المؤشر = 420 − (الدقايق×11.6 + الثواني×0.2 + النبض×0.56 + BMI×2.6 − السن×0.2). سيدات: 304 − (الدقايق×8.5 + الثواني×0.14 + النبض×0.32 + BMI×1.1 − السن×0.4). التفسير: 100 = متوسط الناس في نفس السن والجنس؛ أكتر من 130 أعلى بكتير، 111-130 فوق المتوسط، 90-110 متوسط، 70-89 تحت المتوسط، أقل من 70 أقل بكتير.', 'Men: index = 420 − (min×11.6 + s×0.2 + HR×0.56 + BMI×2.6 − age×0.2). Women: 304 − (min×8.5 + s×0.14 + HR×0.32 + BMI×1.1 − age×0.4). Interpretation: 100 = average for age and sex; >130 well above, 111-130 above average, 90-110 average, 70-89 below average, <70 well below.')
  },
  {
    id: 'ts_astrand_cycle',
    name: t('اختبار أستراند-ريمنج على العجلة', 'Åstrand-Ryhming cycle ergometer test'),
    category: 'aerobic', sports: ['all'],
    measures: t('تقدير VO2max من نبض الحالة المستقرة على حمل ثابت تحت الأقصى', 'Estimated VO2max from steady-state heart rate at a fixed submaximal load'),
    protocol: t('1) اضبط المقعد. 2) بدّل 6 دقايق على 50 لفة/دقيقة بحمل ثابت (غالبًا 50-100 واط للسيدات و100-150 واط للرجال حسب اللياقة). 3) الهدف نبض بين 125 و170. 4) سجّل النبض في الدقيقة 5 و6؛ لو الفرق أكتر من 5 نبضات كمّل دقيقة زيادة. 5) استخدم متوسط الدقيقتين الأخيرتين مع نوموجرام أستراند وصحّح بمعامل السن.', '1) Set the saddle height. 2) Pedal for 6 minutes at 50 rpm on a fixed load (commonly 50-100 W for women and 100-150 W for men, depending on fitness). 3) Aim for a heart rate between 125 and 170. 4) Record HR at minutes 5 and 6; if they differ by more than 5 bpm, extend by a minute. 5) Use the mean of the last two minutes with the Åstrand nomogram and apply the age correction.'),
    equipment: eq('bike', 'hrm', 'metronome', 'stopwatch'),
    unit: 'ml/kg/min', better: 'higher',
    norms: vo2Norms(),
    source: 'Åstrand PO, Ryhming I (1954) J Appl Physiol 7:218-221; Åstrand I (1960) age correction; VO2max categories: ' + VO2_SRC,
    notes: t('معامل تصحيح السن (أستراند 1960): 15 سنة 1.10، 25 سنة 1.00، 35 سنة 0.87، 40 سنة 0.83، 45 سنة 0.78، 50 سنة 0.75، 55 سنة 0.71، 60 سنة 0.68، 65 سنة 0.65. النوموجرام بيدي لتر/دقيقة — اضربه × 1000 واقسم على الوزن. الخطأ الفردي ممكن يوصل 10-15%، فهو أنسب للمتابعة.', 'Age correction factors (Åstrand 1960): 15 y 1.10, 25 y 1.00, 35 y 0.87, 40 y 0.83, 45 y 0.78, 50 y 0.75, 55 y 0.71, 60 y 0.68, 65 y 0.65. The nomogram gives L/min — multiply by 1000 and divide by body mass. Individual error can reach 10-15%, so it is best for tracking.')
  },
  {
    id: 'ts_bruce_treadmill',
    name: t('بروتوكول بروس على السير', 'Bruce treadmill protocol'),
    category: 'aerobic', sports: ['all'],
    measures: t('الحد الأقصى لاستهلاك الأكسجين (تقديري من الزمن أو مباشر مع تحليل الغازات)', 'VO2max (estimated from time, or measured directly with gas analysis)'),
    protocol: t('1) مراحل كل واحدة 3 دقايق: 1.7 ميل/س (2.7 كم/س) وميل 10%، 2.5 ميل/س و12%، 3.4 ميل/س و14%، 4.2 ميل/س و16%، 5.0 ميل/س و18%، 5.5 ميل/س و20%، 6.0 ميل/س و22%. 2) ممنوع مسك الدرابزين. 3) كمّل لحد الإرهاق الإرادي أو ظهور علامات توقف. 4) سجّل الزمن الكلي بالدقايق.', '1) Three-minute stages: 1.7 mph (2.7 km/h) at 10% grade, 2.5 mph 12%, 3.4 mph 14%, 4.2 mph 16%, 5.0 mph 18%, 5.5 mph 20%, 6.0 mph 22%. 2) No handrail holding. 3) Continue to volitional exhaustion or a stopping criterion. 4) Record total time in minutes.'),
    equipment: eq('treadmill', 'hrm', 'bp'),
    unit: 'ml/kg/min', better: 'higher',
    norms: vo2Norms(),
    source: 'Bruce RA et al. (1973) Am Heart J 85:546-562; Foster C et al. (1984) Am Heart J 107:1229-1234; VO2max categories: ' + VO2_SRC,
    notes: t('تقدير VO2max من الزمن (T بالدقايق، Foster 1984): 14.76 − 1.379T + 0.451T² − 0.012T³. اختبار أقصى — للأشخاص اللي عندهم عوامل خطورة لازم إشراف طبي ورسم قلب. الجدول بيقيّم الـ VO2max.', 'VO2max from time (T in minutes, Foster 1984): 14.76 − 1.379T + 0.451T² − 0.012T³. A maximal test — people with risk factors need medical supervision and ECG monitoring. The table rates the VO2max.')
  },
  {
    id: 'ts_vo2max_categories',
    name: t('الحد الأقصى لاستهلاك الأكسجين (VO2max) — التصنيف', 'VO2max categories'),
    category: 'aerobic', sports: ['all'],
    measures: t('تصنيف اللياقة القلبية التنفسية حسب السن والجنس — مقاس مباشرة أو مقدّر من أي اختبار ميداني', 'Cardiorespiratory fitness rating by age and sex — measured directly or estimated from any field test'),
    protocol: t('1) القياس المباشر: اختبار متدرج لحد الإرهاق على السير أو العجلة مع جهاز تحليل غازات، وخد أعلى متوسط 30 ثانية (أو 15). 2) علامات الوصول للأقصى: ثبات الـ VO2 رغم زيادة الحمل، RER أعلى من 1.10، نبض قريب من الأقصى المتوقع. 3) أو استخدم قيمة مقدّرة من كوبر أو البيب تست أو يو-يو أو اختبارات المشي.', '1) Direct measurement: graded test to exhaustion on a treadmill or cycle with gas analysis; take the highest 30 s (or 15 s) average. 2) Maximal criteria: VO2 plateau despite rising workload, RER above 1.10, heart rate near age-predicted maximum. 3) Or use a value estimated from Cooper, beep test, Yo-Yo or walking tests.'),
    equipment: eq('lab', 'treadmill', 'bike', 'hrm'),
    unit: 'ml/kg/min', better: 'higher',
    norms: vo2Norms(),
    source: VO2_SRC + '; ACSM\'s Guidelines for Exercise Testing and Prescription',
    notes: t('الفئات في الجدول (من الأعلى): متفوق، ممتاز، جيد، مقبول، ضعيف، ضعيف جدًا. التقديرات الميدانية خطؤها ممكن يوصل ±10% أو أكتر. نتائج الـ VO2max على العجلة بتطلع عادة أقل بحوالي 5-10% من السير. سجل FRIEND (Kaminsky وزملاؤه 2015) مرجع أحدث للقيم المرجعية على السير.', 'Table categories (from top): superior, excellent, good, fair, poor, very poor. Field estimates can be off by ±10% or more. Cycle VO2max is typically about 5-10% lower than treadmill values. The FRIEND registry (Kaminsky et al. 2015) is a more recent treadmill reference.')
  }
];

/* ================= التحمل اللاهوائي ================= */
const P_ANAEROBIC = [
  {
    id: 'ts_rast',
    name: t('اختبار RAST للعدو اللاهوائي', 'Running-based anaerobic sprint test (RAST)'),
    category: 'anaerobic', sports: ['all'],
    measures: t('القدرة اللاهوائية القصوى والمتوسطة ومؤشر التعب في الجري', 'Peak and mean anaerobic power and fatigue index in running'),
    protocol: t('1) إحماء 10 دقايق. 2) 6 مرات عدو 35 متر بأقصى سرعة، بين كل واحدة 10 ثواني بالظبط (بيلف ويجري الاتجاه العكسي). 3) سجّل زمن كل عدوة. 4) قيس الوزن قبل الاختبار.', '1) Warm up for 10 minutes. 2) Six maximal 35 m sprints with exactly 10 s between them (turning to run back the other way). 3) Record each sprint time. 4) Weigh the athlete beforehand.'),
    equipment: eq('gates', 'cones', 'tape_m', 'scale'),
    unit: 'W', better: 'higher',
    norms: [],
    source: 'Draper PN, Whyte G (1997) Peak Performance 96:3-5; Zagatto AM et al. (2009) J Strength Cond Res 23:1820-1827',
    notes: t('القدرة لكل عدوة (واط) = الوزن × 35² ÷ الزمن³. القدرة القصوى = أعلى قيمة، المتوسطة = متوسط الست. مؤشر التعب = (أعلى قدرة − أقل قدرة) ÷ مجموع أزمنة الست عدوات. مفيش جداول موحدة؛ قسّم على الوزن (واط/كجم) للمقارنة وتابع التغيير.', 'Power per sprint (W) = mass × 35² ÷ time³. Peak power = highest value; mean power = average of six. Fatigue index = (max power − min power) ÷ total time of the six sprints. No universal tables; divide by mass (W/kg) for comparison and track change.')
  },
  {
    id: 'ts_wingate',
    name: t('اختبار وينجيت اللاهوائي', 'Wingate anaerobic test'),
    category: 'anaerobic', sports: ['all'],
    measures: t('القدرة اللاهوائية القصوى والمتوسطة ومعدل الهبوط في 30 ثانية', 'Peak and mean anaerobic power and fatigue over 30 s'),
    protocol: t('1) إحماء 5-10 دقايق على العجلة مع 2-3 انطلاقات قصيرة. 2) المقاومة عادة 0.075 كجم لكل كجم من الوزن (عجلة Monark)، ومع الرياضيين المدربين ممكن تكون أعلى. 3) بدّل بأقصى سرعة وبعدين الحمل ينزل مرة واحدة، وكمّل 30 ثانية بأقصى مجهود. 4) تهدئة 3-5 دقايق بعدها لتجنب الدوخة.', '1) Warm up for 5-10 minutes on the ergometer with 2-3 short bursts. 2) Resistance is usually 0.075 kg per kg of body mass (Monark), higher for trained athletes. 3) Spin up to maximal cadence, drop the load, and continue all-out for 30 s. 4) Cool down for 3-5 minutes to avoid dizziness.'),
    equipment: eq('bike', 'scale'),
    unit: 'W/kg', better: 'higher',
    norms: [],
    source: 'Bar-Or O (1987) Sports Med 4:381-394; Inbar O, Bar-Or O, Skinner JS (1996) The Wingate Anaerobic Test',
    notes: t('المخرجات: القدرة القصوى (غالبًا أول 5 ثواني)، القدرة المتوسطة للـ 30 ثانية، ومؤشر التعب % = (القصوى − الأقل) ÷ القصوى × 100. القيم بتختلف كتير حسب المقاومة والجهاز، فمفيش جداول موحدة معتمدة. اختبار مُجهد جدًا وممكن يسبب غثيان.', 'Outputs: peak power (usually first 5 s), mean power over 30 s, and fatigue index % = (peak − lowest) ÷ peak × 100. Values vary greatly with resistance and ergometer, so no universal validated tables exist. Very demanding and may cause nausea.')
  },
  {
    id: 'ts_300yd_shuttle',
    name: t('اختبار الجري المكوكي 300 ياردة', '300-yard shuttle run'),
    category: 'anaerobic', sports: ['all'],
    measures: t('التحمل اللاهوائي (القدرة اللاهوائية اللاكتيكية) مع تغيير الاتجاه', 'Anaerobic (lactic) capacity with changes of direction'),
    protocol: t('1) خطين بينهم 25 ياردة (22.86 متر). 2) اجري 12 مرة بين الخطين (6 رايح جاي = 300 ياردة) بأقصى سرعة والمس الخط برجلك. 3) راحة 5 دقايق وكرر. 4) النتيجة = متوسط المحاولتين.', '1) Two lines 25 yd (22.86 m) apart. 2) Sprint 12 lengths (6 round trips = 300 yd) as fast as possible, touching each line with a foot. 3) Rest 5 minutes and repeat. 4) Score = average of the two trials.'),
    equipment: eq('cones', 'stopwatch', 'tape_m'),
    unit: 's', better: 'lower',
    norms: [],
    source: 'Gilliam GM (1983) 300 yard shuttle run, NSCA Journal 5(5):46; NSCA Essentials of Strength Training and Conditioning',
    notes: t('الفرق بين المحاولتين بيدي فكرة عن قدرة الاستشفاء: فرق كبير (أكتر من حوالي 5 ثواني) يدل على ضعف في الاستشفاء بين الجهود العالية. مفيش معايير سكانية موحدة.', 'The difference between the two trials indicates recovery ability: a large gap (more than about 5 s) suggests poor recovery between high-intensity efforts. No universal population norms.')
  },
  {
    id: 'ts_run_400m',
    name: t('جري 400 متر', '400 m run'),
    category: 'anaerobic', sports: ['sprint', 'running', 'all'],
    measures: t('التحمل اللاهوائي والسرعة الخاصة (تحمل السرعة)', 'Anaerobic capacity and speed endurance'),
    protocol: t('1) إحماء كامل 20-30 دقيقة زي السباق. 2) بداية من وضع البلوك (أو وقوف — ثبّت الطريقة). 3) اجري 400 متر في الحارة بأقصى جهد. 4) سجّل الزمن الكلي وزمن كل 100 أو 200 متر لو ممكن.', '1) Full race-style warm-up for 20-30 minutes. 2) Block start (or standing — keep it consistent). 3) Run 400 m in lane at maximal effort. 4) Record total time and 100 m or 200 m splits if possible.'),
    equipment: eq('track', 'gates', 'stopwatch'),
    unit: 's', better: 'lower',
    norms: [],
    source: 'World Athletics Competition Rules; Hanon C, Gajer B (2009) J Strength Cond Res 23:524-531 (400 m pacing)',
    notes: t('حلّل توزيع المجهود: في السباقات المتوزعة كويس الـ 200 التانية غالبًا أبطأ من الأولى بحوالي 1-3 ثانية؛ فرق أكبر بكتير يدل على بداية سريعة زيادة أو ضعف تحمل السرعة. قارن كمان مع أحسن زمن 200 متر (احتياطي السرعة). ممكن تقيس اللاكتات بعد 3-5 دقايق لو متاح.', 'Analyse pacing: in well-distributed races the second 200 m is usually about 1-3 s slower than the first; a much larger gap suggests too fast a start or limited speed endurance. Compare with the athlete\'s best 200 m (speed reserve). Blood lactate 3-5 minutes post-run can be added if available.')
  }
];

/* @@PARTS@@ */
export const SPORT_TESTS_GENERAL = [...P_BODY, ...P_FLEX, ...P_STRENGTH, ...P_POWER, ...P_SPEED, ...P_AGILITY, ...P_AEROBIC, ...P_ANAEROBIC];
