/*
 * ADAM — مكتبة الاختبارات الخاصة بكل رياضة
 * Sport-specific field and lab tests: swimming, cycling, rowing, athletics, team sports,
 * racket, combat, CrossFit / HYROX, gymnastics, climbing, precision sports, dance, youth talent ID.
 *
 * Norm tables are only included where a recognised published classification exists
 * (source named in `source`). Otherwise `norms: []` and interpretation is in `notes`.
 * Validate with:  node tools/check-hub.js tests library/tests-sport.js
 */

const L = (ar, en) => ({ ar, en });
const EQ = (...pairs) => pairs.map(([ar, en]) => L(ar, en));

/* bands for "higher is better": cuts descending, one rating per band */
const hiB = (cuts, rs) => rs.map((r, i) => {
  if (i === 0) return { r, min: cuts[0] };
  if (i === rs.length - 1) return { r, max: cuts[i - 1] };
  return { r, min: cuts[i], max: cuts[i - 1] };
});
/* bands for "lower is better": cuts ascending */
const loB = (cuts, rs) => rs.map((r, i) => {
  if (i === 0) return { r, max: cuts[0] };
  if (i === rs.length - 1) return { r, min: cuts[i - 1] };
  return { r, min: cuts[i - 1], max: cuts[i] };
});
const NORM = (ar, en, sex, bands, age) => ({ group: L(ar, en), sex, ...(age ? { age } : {}), bands });

/* shared equipment */
const POOL = ['حمام سباحة 25 أو 50 متر', '25 m or 50 m pool'];
const WATCH = ['ساعة إيقاف', 'Stopwatch'];
const CONES = ['أقماع', 'Cones'];
const TAPE = ['شريط قياس', 'Measuring tape'];
const GATES = ['بوابات توقيت ضوئية (أو ساعة إيقاف)', 'Timing gates (or stopwatch)'];
const AUDIO = ['ملف صوتي للاختبار وسماعة', 'Test audio file and speaker'];
const HRM = ['جهاز قياس نبض', 'Heart-rate monitor'];
const ERG = ['جهاز تجديف Concept2 (أو ما يعادله)', 'Concept2 rowing ergometer (or equivalent)'];
const POWER = ['دراجة بعدّاد قدرة (باور ميتر) أو ترينر ذكي', 'Bike with power meter or smart trainer'];
const LACTATE = ['جهاز قياس لاكتات محمول', 'Portable lactate analyser'];

/* ============================== SWIMMING & WATER POLO ============================== */
const SWIM = [
  {
    id: 'ts_swim_css',
    name: L('اختبار السرعة الحرجة للسباحة CSS (400/200)', 'Critical Swim Speed (CSS) test (400/200)'),
    category: 'aerobic',
    sports: ['swimming', 'triathlon'],
    population: L('سباحين وترايثلون من المستوى المتوسط فأعلى', 'Swimmers and triathletes, intermediate and above'),
    measures: L('إيقاع العتبة الهوائية/اللاكتيك في السباحة الحرة لكل 100 متر', 'Threshold (critical) pace per 100 m in front crawl'),
    protocol: L(
      '1) إحماء 10-15 دقيقة سباحة سهلة وتدريجات. 2) 400 متر أقصى جهد منتظم من الدفع من الحيطة (بدون غطس). 3) راحة إيجابية 5-10 دقايق سباحة سهلة. 4) 200 متر أقصى جهد. 5) احسب CSS = (زمن 400 - زمن 200) ÷ 2 بالثواني لكل 100 متر.',
      '1) Warm up 10-15 min easy swimming with build-ups. 2) Swim 400 m all-out, evenly paced, push start (no dive). 3) 5-10 min easy active recovery. 4) Swim 200 m all-out. 5) CSS (s/100 m) = (T400 - T200) / 2.'
    ),
    equipment: EQ(POOL, WATCH),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Wakayoshi K et al. (1992) Int J Sports Med 13:367-371 (critical swimming velocity); Swim Smooth CSS protocol',
    notes: L(
      'الناتج هو زمن الـ 100 متر عند السرعة الحرجة، وده قريب من إيقاع العتبة اللي ينفع تستمر عليه حوالي 30 دقيقة. استخدمه لتحديد مناطق التدريب (مثلاً CSS +3 إلى +5 ثواني للتحمل). مفيش جداول معايير رسمية؛ قارن السباح بنفسه كل 6-8 أسابيع.',
      'The result is the 100 m time at critical speed, close to a pace sustainable for about 30 min. Use it to set training zones (e.g. CSS +3 to +5 s for aerobic sets). There are no official norm tables; compare the swimmer with themselves every 6-8 weeks.'
    )
  },
  {
    id: 'ts_swim_t30',
    name: L('اختبار T-30 (أقصى مسافة في 30 دقيقة)', 'T-30 test (max distance in 30 min)'),
    category: 'aerobic',
    sports: ['swimming', 'triathlon'],
    measures: L('التحمل الهوائي وإيقاع العتبة في السباحة', 'Aerobic endurance and threshold pace in swimming'),
    protocol: L(
      '1) إحماء 10-15 دقيقة. 2) اسبح أطول مسافة ممكنة في 30 دقيقة متواصلة بإيقاع منتظم. 3) المدرب يعد الطولات ويسجل المسافة لأقرب 25 متر. 4) إيقاع T-30 لكل 100 متر = 1800 ÷ (المسافة ÷ 100).',
      '1) Warm up 10-15 min. 2) Swim the greatest distance possible in 30 min continuous, evenly paced. 3) Coach counts lengths and records distance to the nearest 25 m. 4) T-30 pace per 100 m = 1800 / (distance / 100).'
    ),
    equipment: EQ(POOL, WATCH, ['عداد طولات أو ورقة تسجيل', 'Lap counter or record sheet']),
    unit: 'm',
    better: 'higher',
    norms: [],
    source: 'Olbrecht J (2000) The Science of Winning: Planning, Periodizing and Optimizing Swim Training',
    notes: L(
      'إيقاع T-30 بيستخدم كمرجع للعتبة اللاهوائية. التقسيم المتساوي للإيقاع شرط لصحة الاختبار؛ لو السباح بدأ سريع جدًا أعد الاختبار.',
      'T-30 pace is used as an anaerobic-threshold reference. Even pacing is essential; if the swimmer starts far too fast, repeat the test another day.'
    )
  },
  {
    id: 'ts_swim_50_tt',
    name: L('اختبار زمن 50 متر سباحة', '50 m swim time trial'),
    category: 'speed',
    sports: ['swimming', 'triathlon', 'water_polo'],
    measures: L('السرعة القصوى في السباحة', 'Maximal swimming speed'),
    protocol: L(
      '1) إحماء كامل مع 2-3 تدريجات سريعة. 2) بداية بالغطس من المكعب (أو دفع من الحيطة وسجل ده). 3) 50 متر أقصى سرعة بالطريقة المطلوبة. 4) سجل الزمن لأقرب 0.01 ثانية، ويفضل توقيت إلكتروني.',
      '1) Full warm-up with 2-3 fast build-ups. 2) Dive start from the block (or push start, and record which). 3) Swim 50 m all-out in the chosen stroke. 4) Record time to 0.01 s, electronic timing preferred.'
    ),
    equipment: EQ(POOL, ['مكعب بداية', 'Starting block'], WATCH),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'World Aquatics (FINA) Points Table: points = 1000 x (base time / swim time)^3',
    notes: L(
      'لمقارنة الأزمنة بين الطرق والمسافات والجنسين استخدم نقاط World Aquatics: النقاط = 1000 × (الزمن الأساسي ÷ زمن السباح)^3، والزمن الأساسي هو الرقم القياسي العالمي المعتمد للسنة وطول الحمام.',
      'To compare times across strokes, distances and sexes use World Aquatics points: points = 1000 x (base time / swim time)^3, where base time is the current world record for that event and pool length.'
    )
  },
  {
    id: 'ts_swim_100_tt',
    name: L('اختبار زمن 100 متر سباحة', '100 m swim time trial'),
    category: 'anaerobic',
    sports: ['swimming', 'triathlon', 'water_polo'],
    measures: L('السرعة وتحمل السرعة في السباحة', 'Speed and speed endurance in swimming'),
    protocol: L(
      '1) إحماء كامل. 2) بداية بالغطس. 3) 100 متر أقصى جهد وسجل زمن أول 50 وثاني 50. 4) سجل الزمن الكلي لأقرب 0.01 ثانية.',
      '1) Full warm-up. 2) Dive start. 3) Swim 100 m all-out, recording first and second 50 m splits. 4) Record total time to 0.01 s.'
    ),
    equipment: EQ(POOL, ['مكعب بداية', 'Starting block'], WATCH),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'World Aquatics (FINA) Points Table; Maglischo EW (2003) Swimming Fastest',
    notes: L(
      'الفرق بين نصفي السباق مؤشر لتحمل السرعة وتوزيع الجهد. استخدم نقاط World Aquatics للمقارنة بين السباحين.',
      'The split difference between halves indicates speed endurance and pacing. Use World Aquatics points to compare swimmers.'
    )
  },
  {
    id: 'ts_swim_7x200_step',
    name: L('اختبار الخطوات 7×200 متر (لاكتات)', '7 x 200 m incremental step test (lactate)'),
    category: 'aerobic',
    sports: ['swimming', 'triathlon'],
    population: L('سباحين منافسين', 'Competitive swimmers'),
    measures: L('العتبة اللاكتيكية ومنحنى اللاكتات/النبض مع السرعة', 'Lactate threshold and lactate/heart-rate-velocity curve'),
    protocol: L(
      '1) إحماء قياسي. 2) 7 تكرارات 200 متر حرة تبدأ كل 5 دقايق. 3) أول تكرار سهل جدًا وكل تكرار أسرع من اللي قبله بحوالي 3-5 ثواني، والسابع أقصى جهد. 4) بعد كل تكرار: قياس النبض فورًا وعينة دم للاكتات من الإصبع أو الأذن. 5) ارسم اللاكتات مقابل السرعة وحدد سرعة 4 ملي مول/لتر أو نقطة الانكسار.',
      '1) Standard warm-up. 2) 7 x 200 m front crawl starting every 5 min. 3) First rep very easy, each rep about 3-5 s faster than the previous, the 7th maximal. 4) After each rep record heart rate immediately and take a finger or earlobe blood lactate sample. 5) Plot lactate vs velocity and identify the speed at 4 mmol/L or the breakpoint.'
    ),
    equipment: EQ(POOL, WATCH, HRM, LACTATE),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Pyne DB, Lee H, Swanwick KM (2001) Monitoring the lactate threshold in world-ranked swimmers. Med Sci Sports Exerc 33(2):291-297',
    notes: L(
      'النتيجة المسجلة هنا = زمن الـ 100 متر عند 4 ملي مول/لتر. لو المنحنى اتحرك يمين (سرعة أعلى عند نفس اللاكتات) يبقى التحمل الهوائي اتحسن. كرر الاختبار بنفس الحمام ونفس التوقيت من اليوم.',
      'The recorded result is the 100 m time at 4 mmol/L. A right shift of the curve (faster speed at the same lactate) indicates improved aerobic fitness. Repeat in the same pool and at the same time of day.'
    )
  },
  {
    id: 'ts_swim_kick_test',
    name: L('اختبار الرجلين بالبورد (100/200 متر)', 'Kick test with board (100/200 m)'),
    category: 'skill',
    sports: ['swimming', 'triathlon'],
    measures: L('قوة وكفاءة ضربات الرجلين في السباحة', 'Kick power and efficiency in swimming'),
    protocol: L(
      '1) إحماء. 2) بداية دفع من الحيطة ماسك البورد بإيد ممدودة. 3) 100 أو 200 متر رجلين فقط أقصى جهد (حدد المسافة وثبتها). 4) سجل الزمن.',
      '1) Warm up. 2) Push start holding a kickboard with arms extended. 3) Kick 100 or 200 m all-out (choose one distance and keep it fixed). 4) Record time.'
    ),
    equipment: EQ(POOL, ['بورد سباحة', 'Kickboard'], WATCH),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Maglischo EW (2003) Swimming Fastest; common national-federation squad testing (e.g. Swim England, USA Swimming)',
    notes: L(
      'قارن نسبة زمن الرجلين لزمن السباحة الكاملة لنفس المسافة؛ الفرق الكبير معناه إن الرجلين نقطة ضعف. سباحين الـ 50 و100 والصدر محتاجين رجلين أقوى نسبيًا.',
      'Compare the kick time with the full-stroke time over the same distance; a large gap flags the kick as a weakness. Sprinters and breaststrokers need a relatively stronger kick.'
    )
  },
  {
    id: 'ts_swim_pull_test',
    name: L('اختبار الذراعين بالعوامة (400 متر سحب)', 'Pull test with pull buoy (400 m)'),
    category: 'skill',
    sports: ['swimming', 'triathlon'],
    measures: L('قوة وتحمل الذراعين في السباحة', 'Arm pulling power and endurance'),
    protocol: L(
      '1) إحماء. 2) عوامة بين الفخذين (بدون مجاديف إلا لو ثابتة في كل الاختبارات). 3) 400 متر ذراعين أقصى جهد منتظم. 4) سجل الزمن وعدد الضربات لكل طول لو ممكن.',
      '1) Warm up. 2) Pull buoy between thighs (no paddles unless used in every test). 3) Swim 400 m pull, all-out and evenly paced. 4) Record time and strokes per length if possible.'
    ),
    equipment: EQ(POOL, ['عوامة سحب', 'Pull buoy'], WATCH),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Maglischo EW (2003) Swimming Fastest; national-federation squad testing practice',
    notes: L(
      'لو زمن السحب قريب جدًا أو أسرع من السباحة الكاملة فده غالبًا بيدل على رجلين أو وضع جسم ضعيف.',
      'If pull time is very close to or faster than full-stroke time, it usually indicates a weak kick or poor body position.'
    )
  },
  {
    id: 'ts_swim_start_15m',
    name: L('اختبار البداية لـ 15 متر', '15 m start time test'),
    category: 'power',
    sports: ['swimming'],
    measures: L('كفاءة البداية (رد الفعل + الطيران + الانزلاق تحت الماء)', 'Start effectiveness (reaction, flight and underwater phase)'),
    protocol: L(
      '1) علّم 15 متر من الحيطة على الحارة. 2) كاميرا جانبية عند علامة الـ 15 متر. 3) بداية رسمية بإشارة. 4) الزمن من الإشارة لحد ما رأس السباح يعدي الـ 15 متر. 5) خد أفضل محاولة من 3 براحة كاملة.',
      '1) Mark 15 m from the wall on the lane rope. 2) Side-on camera at the 15 m mark. 3) Official start signal. 4) Time from signal until the head passes 15 m. 5) Best of 3 trials with full rest.'
    ),
    equipment: EQ(POOL, ['مكعب بداية', 'Starting block'], ['كاميرا فيديو', 'Video camera'], WATCH),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Tor E, Pease DL, Ball KA (2015) Key parameters of the swimming start and their relationship to start performance. J Sports Sci 33(13):1313-1321',
    notes: L(
      'حلل الفيديو لتقسيم الزمن: زمن المكعب، مسافة الطيران، عمق وزمن الانزلاق. مقياس ممتاز لمتابعة تحسن سباحين المسافات القصيرة.',
      'Break the video down into block time, flight distance and underwater depth/time. Very useful for tracking sprint swimmers.'
    )
  },
  {
    id: 'ts_wpolo_msst',
    name: L('اختبار السباحة المكوكية المتدرجة لكرة الماء', 'Multistage shuttle swim test (water polo)'),
    category: 'aerobic',
    sports: ['water_polo'],
    measures: L('اللياقة الهوائية الخاصة بكرة الماء', 'Water-polo-specific aerobic fitness'),
    protocol: L(
      '1) حدد مسافة المكوك حسب البروتوكول المعتمد لفريقك وثبّتها. 2) اللاعب يسبح ذهاب وعودة مع إشارات صوتية بتسرع كل مستوى. 3) لازم يلمس الخط قبل الإشارة. 4) الاختبار بينتهي لما يتأخر عن إشارتين متتاليتين. 5) سجل المستوى وعدد المكوكات.',
      '1) Set the shuttle distance per your adopted protocol and keep it fixed. 2) The player swims back and forth to audio beeps that speed up each level. 3) The line must be reached before each beep. 4) The test ends after two consecutive missed beeps. 5) Record level and shuttles completed.'
    ),
    equipment: EQ(POOL, AUDIO, ['خطوط أو أقماع طافية للتعليم', 'Lane markers or floating markers']),
    unit: 'shuttles',
    better: 'higher',
    norms: [],
    source: 'Rechichi C, Dawson B, Lawrence SR (2000) A multistage shuttle swim test to assess aerobic fitness in competitive water polo players. J Sci Med Sport 3(1):55-64',
    notes: L(
      'أنسب من الجري لتقييم لاعب كرة الماء لأنه بيشمل اللفّ والتسارع في المية. ثبّت شكل اللفّ (بدون دفع من الحيطة لو ده البروتوكول).',
      'More specific than running tests because it includes in-water turns and accelerations. Keep the turning rule fixed (e.g. no wall push-off if that is the protocol).'
    )
  },
  {
    id: 'ts_wpolo_eggbeater_jump',
    name: L('اختبار الوثب من الماء (إيجبيتر)', 'In-water vertical jump (eggbeater boost)'),
    category: 'power',
    sports: ['water_polo'],
    measures: L('قدرة الرجلين في الماء بحركة الإيجبيتر', 'In-water leg power using the eggbeater kick'),
    protocol: L(
      '1) اللاعب في المية العميقة جنب حيطة عليها مسطرة مدرجة. 2) يبدأ من وضع الإيجبيتر والكتفين عند سطح المية. 3) يطلع لأقصى ارتفاع بإيد واحدة ممدودة ويلمس المسطرة. 4) خد أفضل 3 محاولات بالسنتيمتر فوق سطح المية.',
      '1) Player in deep water next to a wall with a graduated scale. 2) Start in eggbeater position with shoulders at the surface. 3) Boost to maximum height with one arm extended, touching the scale. 4) Record best of 3 attempts in cm above the water surface.'
    ),
    equipment: EQ(['حمام عميق', 'Deep-water pool'], ['مسطرة مدرجة على الحيطة أو فيديو', 'Wall-mounted scale or video']),
    unit: 'cm',
    better: 'higher',
    norms: [],
    source: 'Platanou T (2005) On-water and dryland vertical jump in water polo players. J Sports Med Phys Fitness 45(1):26-31',
    notes: L(
      'مرتبط بقدرة اللاعب على التصويب والصد. الارتفاع في المية مالوش علاقة قوية بالوثب على الأرض، فلازم يتقاس في المية.',
      'Relates to shooting and blocking ability. In-water height correlates only weakly with land jumps, so test it in the water.'
    )
  },
  {
    id: 'ts_wpolo_throw_velocity',
    name: L('سرعة التصويب في كرة الماء', 'Water polo throwing velocity'),
    category: 'power',
    sports: ['water_polo'],
    measures: L('سرعة الكرة عند التصويب', 'Ball velocity when shooting'),
    protocol: L(
      '1) إحماء كتف كامل. 2) التصويب من 5 أمتار على المرمى بدون حارس. 3) رادار خلف المرمى في خط الكرة. 4) 3-5 تصويبات براحة 30 ثانية، سجل الأعلى.',
      '1) Full shoulder warm-up. 2) Shoot from 5 m at an empty goal. 3) Radar gun behind the goal in line with the ball. 4) 3-5 shots with 30 s rest; record the fastest.'
    ),
    equipment: EQ(['رادار سرعة', 'Radar gun'], ['كرة ماء رسمية', 'Official water polo ball'], ['مرمى', 'Goal']),
    unit: 'km/h',
    better: 'higher',
    norms: [],
    source: 'Ferragut C et al. (2011) Anthropometry and throwing velocity in elite water polo by specific playing positions. J Hum Kinet 27:31-44',
    notes: L(
      'قارن حسب المركز؛ اللاعبين الأجنحة والسنتر عادة أسرع. سجل كمان دقة التصويب لأن السرعة لوحدها مش كفاية.',
      'Compare by playing position; wings and centres are usually faster. Also record accuracy, as velocity alone is not enough.'
    )
  }
];

/* ================================== CYCLING ================================== */
const CYC = [
  {
    id: 'ts_cyc_ftp20',
    name: L('اختبار FTP لمدة 20 دقيقة', 'FTP 20-minute test'),
    category: 'aerobic',
    sports: ['cycling', 'triathlon'],
    measures: L('قدرة العتبة الوظيفية (FTP) بالوات لكل كيلو', 'Functional threshold power (FTP) in W/kg'),
    protocol: L(
      '1) إحماء 20 دقيقة سهل. 2) 3 × 1 دقيقة بدالة سريعة مع دقيقة سهلة. 3) 5 دقايق سهل. 4) 5 دقايق أقصى جهد (لتفريغ الطاقة اللاهوائية). 5) 10 دقايق سهل. 6) 20 دقيقة أقصى جهد منتظم. 7) FTP = 0.95 × متوسط قدرة الـ 20 دقيقة، واقسمه على وزن الجسم.',
      '1) 20 min easy warm-up. 2) 3 x 1 min fast pedalling with 1 min easy. 3) 5 min easy. 4) 5 min all-out (to blunt anaerobic contribution). 5) 10 min easy. 6) 20 min all-out, evenly paced. 7) FTP = 0.95 x average 20-min power, divided by body mass.'
    ),
    equipment: EQ(POWER, ['ميزان', 'Scale']),
    unit: 'W/kg',
    better: 'higher',
    norms: [
      NORM('فئات سباقات Zwift حسب FTP (النظام القديم قبل 2023)', 'Zwift racing categories by FTP (pre-2023 W/kg system)', 'any',
        hiB([4.6, 4.0, 3.2, 2.5], ['excellent', 'very_good', 'good', 'average', 'below_average']))
    ],
    source: 'Allen H, Coggan A (2010) Training and Racing with a Power Meter, 2nd ed.; Zwift category thresholds (A+ >=4.6, A 4.0-4.6, B 3.2-4.0, C 2.5-3.2, D <2.5 W/kg)',
    notes: L(
      'التقسيم: ممتاز = A+، جيد جدًا = A، جيد = B، متوسط = C، أقل من المتوسط = D. في جدول Power Profile لكوجان قمة المستوى العالمي حوالي 6.4 وات/كجم للرجال وحوالي 5.7 للسيدات. سباقات السيدات في Zwift كان لها حدود مختلفة.',
      'Mapping: excellent = A+, very good = A, good = B, average = C, below average = D. On the Coggan power-profile chart the top of world class is about 6.4 W/kg for men and about 5.7 W/kg for women. Women-only Zwift races used different thresholds.'
    )
  },
  {
    id: 'ts_cyc_ramp',
    name: L('اختبار الرامب (تزايد القدرة كل دقيقة)', 'Ramp test (1-min incremental)'),
    category: 'aerobic',
    sports: ['cycling', 'triathlon'],
    measures: L('أقصى قدرة هوائية (MAP) وتقدير FTP', 'Maximal aerobic power (MAP) and FTP estimate'),
    protocol: L(
      '1) إحماء 5-10 دقايق سهل. 2) الترينر يزود المقاومة كل دقيقة (مثلاً 20 وات/دقيقة، أو حسب برنامج Zwift/TrainerRoad). 3) كمّل لحد ما مش قادر تحافظ على القدرة المطلوبة. 4) سجل أفضل متوسط قدرة لدقيقة واحدة. 5) FTP ≈ 0.75 × أفضل دقيقة.',
      '1) 5-10 min easy warm-up. 2) Trainer increases load every minute (e.g. 20 W/min, or per the Zwift/TrainerRoad protocol). 3) Continue until the target power can no longer be held. 4) Record best 1-min average power. 5) FTP ~ 0.75 x best 1-min power.'
    ),
    equipment: EQ(['ترينر ذكي بتحكم ERG', 'Smart trainer in ERG mode'], ['تطبيق تدريب (Zwift / TrainerRoad)', 'Training app (Zwift / TrainerRoad)']),
    unit: 'W',
    better: 'higher',
    norms: [],
    source: 'TrainerRoad and Zwift ramp-test protocols (FTP = 75% of best 1-min power)',
    notes: L(
      'أسهل من اختبار الـ 20 دقيقة وأقل إجهادًا نفسيًا، لكن ممكن يبالغ في FTP لراكبي السرعة (قدرة لاهوائية عالية) ويقلله لراكبي التحمل. للمعايير اقسم FTP على الوزن وقارن بجدول اختبار FTP 20 دقيقة.',
      'Easier and less mentally demanding than the 20-min test, but may overestimate FTP in sprint-type riders and underestimate it in diesel-type riders. For norms, divide FTP by body mass and use the FTP 20-min table.'
    )
  },
  {
    id: 'ts_cyc_5min_power',
    name: L('أقصى قدرة 5 دقايق (Power Profile)', '5-minute maximal power (power profile)'),
    category: 'aerobic',
    sports: ['cycling', 'triathlon'],
    measures: L('القدرة عند الحد الأقصى لاستهلاك الأكسجين (VO2max)', 'Power around VO2max'),
    protocol: L(
      '1) إحماء 15-20 دقيقة مع جهدين قصيرين. 2) 5 دقايق أقصى جهد منتظم على طلعة أو ترينر. 3) سجل متوسط القدرة واقسم على الوزن.',
      '1) 15-20 min warm-up with two short efforts. 2) 5 min all-out, evenly paced, on a climb or trainer. 3) Record average power and divide by body mass.'
    ),
    equipment: EQ(POWER),
    unit: 'W/kg',
    better: 'higher',
    norms: [],
    source: 'Allen H, Coggan A (2010) Training and Racing with a Power Meter - Power Profile chart',
    notes: L(
      'في جدول كوجان قمة المستوى العالمي للرجال حوالي 7.6 وات/كجم لـ 5 دقايق (وللسيدات حوالي 6.6). قارن الـ 5 ثواني والدقيقة والـ 5 دقايق والـ FTP مع بعض عشان تعرف نوع الراكب (سبرينتر، متسلق، تايم ترايل).',
      'On the Coggan chart the top of world class is about 7.6 W/kg for 5 min in men (about 6.6 in women). Compare 5 s, 1 min, 5 min and FTP together to profile the rider (sprinter, climber, time-trialist).'
    )
  },
  {
    id: 'ts_cyc_1min_power',
    name: L('أقصى قدرة دقيقة واحدة', '1-minute maximal power'),
    category: 'anaerobic',
    sports: ['cycling'],
    measures: L('القدرة اللاهوائية (اللاكتيكية)', 'Anaerobic (glycolytic) capacity'),
    protocol: L(
      '1) إحماء 15-20 دقيقة. 2) دقيقة أقصى جهد من بداية متحركة بسرعة متوسطة. 3) سجل متوسط القدرة واقسم على الوزن.',
      '1) 15-20 min warm-up. 2) 1 min all-out from a rolling start at moderate speed. 3) Record average power and divide by body mass.'
    ),
    equipment: EQ(POWER),
    unit: 'W/kg',
    better: 'higher',
    norms: [],
    source: 'Allen H, Coggan A (2010) Training and Racing with a Power Meter - Power Profile chart',
    notes: L(
      'قمة جدول كوجان للرجال حوالي 11.5 وات/كجم (وللسيدات حوالي 9.3). مهم لسباقات الكريتيريوم والتراك والهجمات القصيرة.',
      'The top of the Coggan chart is about 11.5 W/kg for men (about 9.3 for women). Important for criteriums, track and short attacks.'
    )
  },
  {
    id: 'ts_cyc_5s_sprint',
    name: L('أقصى قدرة سبرينت 5 ثواني', '5-second sprint power'),
    category: 'power',
    sports: ['cycling'],
    measures: L('القدرة العصبية العضلية القصوى', 'Peak neuromuscular power'),
    protocol: L(
      '1) إحماء كامل. 2) من سرعة بطيئة (حوالي 20-25 كم/س) سبرينت أقصى 6-8 ثواني واقف على البدالات. 3) سجل أعلى متوسط لـ 5 ثواني. 4) أفضل محاولة من 2-3 براحة 5 دقايق.',
      '1) Full warm-up. 2) From a slow roll (about 20-25 km/h), sprint all-out for 6-8 s out of the saddle. 3) Record the best 5-s average. 4) Best of 2-3 trials with 5 min rest.'
    ),
    equipment: EQ(POWER),
    unit: 'W/kg',
    better: 'higher',
    norms: [],
    source: 'Allen H, Coggan A (2010) Training and Racing with a Power Meter - Power Profile chart',
    notes: L(
      'قمة جدول كوجان للرجال حوالي 24 وات/كجم (وللسيدات حوالي 19.4). الترس وسرعة البداية لازم يتثبتوا في كل مرة.',
      'The top of the Coggan chart is about 24 W/kg for men (about 19.4 for women). Keep gearing and starting speed identical each time.'
    )
  },
  {
    id: 'ts_cyc_critical_power',
    name: L('القدرة الحرجة CP (اختبار 3 و12 دقيقة)', 'Critical power (3- and 12-minute trials)'),
    category: 'aerobic',
    sports: ['cycling', 'triathlon'],
    measures: L('القدرة الحرجة (الحد بين الشدة الثقيلة والقصوى) وسعة W\'', 'Critical power (heavy/severe boundary) and W\' capacity'),
    protocol: L(
      '1) إحماء 15 دقيقة. 2) 3 دقايق أقصى جهد منتظم وسجل متوسط القدرة P3. 3) راحة 30 دقيقة سهل (أو في يوم تاني). 4) 12 دقيقة أقصى جهد وسجل P12. 5) CP = (P12×720 − P3×180) ÷ 540. 6) W\' (جول) = (P3 − CP) × 180.',
      '1) 15 min warm-up. 2) 3 min all-out, evenly paced; record average power P3. 3) 30 min easy recovery (or another day). 4) 12 min all-out; record P12. 5) CP = (P12 x 720 - P3 x 180) / 540. 6) W\' (J) = (P3 - CP) x 180.'
    ),
    equipment: EQ(POWER),
    unit: 'W',
    better: 'higher',
    norms: [],
    source: 'Monod H, Scherrer J (1965) Ergonomics 8:329-338; Karsten B et al. (2015) Validity and reliability of critical power field testing. Eur J Appl Physiol 115:197-204',
    notes: L(
      'الـ CP عادة أعلى شوية من FTP. W\' هو "خزان" الشغل فوق CP؛ مفيد لتخطيط الهجمات وتقسيم الجهد في التايم ترايل.',
      'CP is usually slightly higher than FTP. W\' is the finite work capacity above CP, useful for planning attacks and pacing time trials.'
    )
  }
];

/* ================================== ROWING ================================== */
const ROW = [
  {
    id: 'ts_row_2000_erg',
    name: L('اختبار 2000 متر على جهاز التجديف', '2000 m ergometer test'),
    category: 'aerobic',
    sports: ['rowing'],
    measures: L('الأداء الكلي في التجديف (هوائي + لاهوائي)', 'Overall rowing performance (aerobic + anaerobic)'),
    protocol: L(
      '1) ثبّت الـ drag factor حسب سياسة الفريق وسجله. 2) إحماء 10-15 دقيقة مع 3-4 دفعات قصيرة. 3) 2000 متر أقصى جهد. 4) سجل الزمن الكلي ومتوسط الـ split لكل 500 متر ومعدل الضربات.',
      '1) Set and record the drag factor per team policy. 2) 10-15 min warm-up with 3-4 short bursts. 3) Row 2000 m all-out. 4) Record total time, average split per 500 m and stroke rate.'
    ),
    equipment: EQ(ERG),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Concept2 Indoor Rower; World Rowing / British Rowing ergometer testing standards',
    notes: L(
      'القدرة بالوات = 2.80 ÷ (الثواني لكل متر)^3 (معادلة Concept2). كمرجع تقريبي: رجال الوزن الثقيل على المستوى الدولي غالبًا بين 5:40 و6:00، والسيدات بين 6:20 و6:50. قارن اللاعب بنفسه وبزمايله في نفس فئة الوزن.',
      'Watts = 2.80 / (seconds per metre)^3 (Concept2 formula). As a rough reference, international heavyweight men usually row 5:40-6:00 and women 6:20-6:50. Compare athletes with themselves and within the same weight class.'
    )
  },
  {
    id: 'ts_row_500_erg',
    name: L('اختبار 500 متر تجديف', '500 m ergometer sprint'),
    category: 'anaerobic',
    sports: ['rowing', 'crossfit', 'hyrox'],
    measures: L('القدرة اللاهوائية في التجديف', 'Rowing anaerobic power'),
    protocol: L(
      '1) إحماء كامل. 2) بداية ثابتة (الجهاز واقف). 3) 500 متر أقصى جهد. 4) سجل الزمن وأعلى وات.',
      '1) Full warm-up. 2) Standing start (flywheel stopped). 3) Row 500 m all-out. 4) Record time and peak watts.'
    ),
    equipment: EQ(ERG),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Concept2 Indoor Rower ranking events; British Rowing testing practice',
    notes: L(
      'الفرق بين split الـ 500 وsplit الـ 2000 بيوضح هل اللاعب محتاج سرعة ولا تحمل أكتر.',
      'The difference between 500 m split and 2000 m split shows whether the athlete needs more speed or more endurance.'
    )
  },
  {
    id: 'ts_row_6000_erg',
    name: L('اختبار 6000 متر تجديف', '6000 m ergometer test'),
    category: 'aerobic',
    sports: ['rowing'],
    measures: L('التحمل الهوائي في التجديف', 'Rowing aerobic endurance'),
    protocol: L(
      '1) إحماء 10 دقايق. 2) 6000 متر أقصى جهد منتظم. 3) سجل الزمن ومتوسط الـ split ومعدل الضربات.',
      '1) 10 min warm-up. 2) Row 6000 m all-out, evenly paced. 3) Record time, average split and stroke rate.'
    ),
    equipment: EQ(ERG),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'British Rowing and US Rowing national team ergometer testing (6k standard test)',
    notes: L(
      'مؤشر قوي للقاعدة الهوائية. الـ split في الـ 6k عادة أبطأ من الـ 2k بحوالي 6-10 ثواني لكل 500 متر عند المجدفين المدربين.',
      'A strong indicator of aerobic base. In trained rowers the 6k split is typically about 6-10 s per 500 m slower than their 2k split.'
    )
  },
  {
    id: 'ts_row_30r20',
    name: L('اختبار 30 دقيقة بمعدل 20 ضربة (30r20)', '30-minute test at rate 20 (30r20)'),
    category: 'aerobic',
    sports: ['rowing'],
    measures: L('التحمل الهوائي وكفاءة الضربة عند معدل ثابت', 'Aerobic endurance and stroke power at a fixed rate'),
    protocol: L(
      '1) إحماء. 2) 30 دقيقة أقصى مسافة مع الالتزام بمعدل 20 ضربة/دقيقة بالظبط. 3) سجل المسافة ومتوسط الـ split.',
      '1) Warm up. 2) 30 min for maximum distance holding exactly 20 strokes per minute. 3) Record distance and average split.'
    ),
    equipment: EQ(ERG),
    unit: 'm',
    better: 'higher',
    norms: [],
    source: 'US Rowing and collegiate rowing standard test (30 min at r20)',
    notes: L(
      'تثبيت المعدل بيخلي الاختبار يقيس قوة كل ضربة مش السرعة في الضرب. أي ضربات فوق 20 بتلغي صحة المقارنة.',
      'Fixing the rate makes the test measure power per stroke rather than turnover. Rating above 20 invalidates comparisons.'
    )
  },
  {
    id: 'ts_row_7x4_step',
    name: L('اختبار الخطوات 7×4 دقايق (لاكتات)', '7 x 4-minute incremental step test (lactate)'),
    category: 'aerobic',
    sports: ['rowing'],
    population: L('مجدفين منافسين', 'Competitive rowers'),
    measures: L('العتبات اللاكتيكية والقدرة عند 4 ملي مول/لتر', 'Lactate thresholds and power at 4 mmol/L'),
    protocol: L(
      '1) حدد القدرات المستهدفة من أفضل 2000 متر (تبدأ سهلة وتزيد كل خطوة). 2) 7 خطوات × 4 دقايق مع دقيقة راحة بينهم، والسابعة أقصى جهد. 3) في الراحة: لاكتات من الأذن ونبض. 4) ارسم اللاكتات مقابل القدرة وحدد القدرة عند 4 ملي مول/لتر.',
      '1) Set target powers from the best 2000 m (easy start, increasing each step). 2) 7 steps x 4 min with 1 min rest, the 7th all-out. 3) In each rest take an earlobe lactate and heart rate. 4) Plot lactate vs power and identify power at 4 mmol/L.'
    ),
    equipment: EQ(ERG, HRM, LACTATE),
    unit: 'W',
    better: 'higher',
    norms: [],
    source: 'Tanner RK, Gore CJ (eds) (2013) Physiological Tests for Elite Athletes, 2nd ed., Australian Institute of Sport - rowing protocol',
    notes: L(
      'النتيجة المسجلة = القدرة عند 4 ملي مول/لتر. تحرك المنحنى لليمين = تحسن هوائي. ثبّت الـ drag factor والتغذية قبل الاختبار.',
      'Recorded result = power at 4 mmol/L. A right shift of the curve indicates aerobic improvement. Keep drag factor and pre-test nutrition constant.'
    )
  }
];

/* ============================== RUNNING & ATHLETICS ============================== */
const VDOT_NOTE = L(
  'احسب VDOT (معادلة دانيالز وجيلبرت): v = المسافة ÷ الزمن بالمتر/دقيقة، VO2 = −4.60 + 0.182258v + 0.000104v²، ونسبة الحد الأقصى = 0.8 + 0.1894393e^(−0.012778t) + 0.2989558e^(−0.1932605t) حيث t بالدقايق، وVDOT = VO2 ÷ النسبة. أمثلة من جداول دانيالز لـ 5 كم: VDOT 40 ≈ 24:08، VDOT 50 ≈ 19:57، VDOT 60 ≈ 17:03. استخدم VDOT لتحديد إيقاعات E/M/T/I/R.',
  'Compute VDOT (Daniels & Gilbert): v = distance / time in m/min, VO2 = -4.60 + 0.182258v + 0.000104v^2, fraction of max = 0.8 + 0.1894393e^(-0.012778t) + 0.2989558e^(-0.1932605t) with t in minutes, VDOT = VO2 / fraction. Examples from the Daniels tables for 5 km: VDOT 40 ~ 24:08, VDOT 50 ~ 19:57, VDOT 60 ~ 17:03. Use VDOT to set E/M/T/I/R paces.'
);
const RUN = [
  {
    id: 'ts_run_3200_tt',
    name: L('اختبار زمن 3200 متر (مع VDOT)', '3200 m time trial (with VDOT)'),
    category: 'aerobic',
    sports: ['running', 'middle_dist', 'marathon', 'triathlon', 'trail_running'],
    measures: L('الأداء الهوائي وتقدير VDOT لإيقاعات التدريب', 'Aerobic performance and VDOT estimate for training paces'),
    protocol: L(
      '1) إحماء 15 دقيقة جري سهل + تدريجات. 2) 8 لفات على تراك 400 متر (أو مسار مسطح مقاس) بأقصى جهد منتظم. 3) سجل زمن كل لفة والزمن الكلي. 4) احسب VDOT من الزمن.',
      '1) 15 min easy running + strides. 2) Run 8 laps of a 400 m track (or a flat measured course) at even maximal effort. 3) Record lap splits and total time. 4) Compute VDOT from the time.'
    ),
    equipment: EQ(['تراك 400 متر', '400 m track'], WATCH),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Daniels J (2014) Daniels\' Running Formula, 3rd ed.; Daniels J, Gilbert J (1979) Oxygen Power',
    notes: VDOT_NOTE
  },
  {
    id: 'ts_run_5k_tt',
    name: L('اختبار زمن 5 كم (مع VDOT)', '5 km time trial (with VDOT)'),
    category: 'aerobic',
    sports: ['running', 'middle_dist', 'marathon', 'triathlon', 'trail_running'],
    measures: L('الأداء الهوائي وتقدير VDOT', 'Aerobic performance and VDOT estimate'),
    protocol: L(
      '1) إحماء 15-20 دقيقة. 2) 5000 متر (12.5 لفة تراك أو مسار مقاس) بأقصى جهد منتظم. 3) سجل الزمن وتقسيم كل كيلو. 4) احسب VDOT.',
      '1) 15-20 min warm-up. 2) Run 5000 m (12.5 track laps or a measured course) at even maximal effort. 3) Record time and km splits. 4) Compute VDOT.'
    ),
    equipment: EQ(['تراك أو مسار مقاس', 'Track or measured course'], WATCH),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Daniels J (2014) Daniels\' Running Formula, 3rd ed. (VDOT tables)',
    notes: VDOT_NOTE
  },
  {
    id: 'ts_run_age_graded',
    name: L('نسبة الأداء المعدّلة حسب السن (Age-grading)', 'Age-graded performance percentage'),
    category: 'aerobic',
    sports: ['running', 'middle_dist', 'marathon', 'sprint', 'walking'],
    population: L('كل الأعمار وخاصة الماسترز (35+)', 'All ages, especially masters (35+)'),
    measures: L('مستوى الأداء مقارنة بأفضل أداء عالمي لنفس السن والجنس', 'Performance level relative to the age- and sex-specific world standard'),
    protocol: L(
      '1) سجل زمن السباق أو الاختبار الرسمي (مثلاً 5 كم أو 10 كم). 2) هات الزمن المعياري لنفس المسافة والسن والجنس من جداول WMA. 3) النسبة = الزمن المعياري ÷ زمن اللاعب × 100.',
      '1) Record an official race or test time (e.g. 5 km or 10 km). 2) Look up the age/sex standard for that distance in the WMA tables. 3) Percentage = age standard / athlete time x 100.'
    ),
    equipment: EQ(['جداول WMA أو حاسبة Age-grading', 'WMA tables or an age-grading calculator']),
    unit: '%',
    better: 'higher',
    norms: [
      NORM('تصنيف WMA لمستوى الأداء', 'WMA performance classes', 'any',
        hiB([90, 80, 70, 60], ['excellent', 'very_good', 'good', 'average', 'below_average']))
    ],
    source: 'World Masters Athletics age-grading tables (Jones A, 2020 update); WMA classes: 90%+ world class, 80%+ national class, 70%+ regional class, 60%+ local class',
    notes: L(
      'التقسيم: ممتاز = مستوى عالمي، جيد جدًا = مستوى قومي، جيد = مستوى إقليمي، متوسط = مستوى محلي. طريقة عادلة لمقارنة عداء عنده 50 سنة بعداء عنده 25.',
      'Mapping: excellent = world class, very good = national class, good = regional class, average = local class. A fair way to compare a 50-year-old with a 25-year-old.'
    )
  },
  {
    id: 'ts_run_150_se',
    name: L('اختبار 150 متر (تحمل سرعة للعدائين)', '150 m speed-endurance test (sprinters)'),
    category: 'anaerobic',
    sports: ['sprint', 'hurdles'],
    measures: L('تحمل السرعة والمحافظة على السرعة القصوى', 'Speed endurance and maintenance of maximal velocity'),
    protocol: L(
      '1) إحماء عدو كامل مع 3-4 تسارعات. 2) بداية من البلوك أو وقوف (ثبّت نوع البداية). 3) 150 متر أقصى سرعة على المنحنى ثم المستقيم. 4) توقيت إلكتروني أو ساعتين والمتوسط. 5) محاولة واحدة أو 2 براحة 10-15 دقيقة.',
      '1) Full sprint warm-up with 3-4 accelerations. 2) Block or standing start (keep it constant). 3) Run 150 m all-out, bend then straight. 4) Electronic timing, or two stopwatches averaged. 5) One trial, or two with 10-15 min rest.'
    ),
    equipment: EQ(['تراك', 'Track'], GATES, ['بلوك بداية', 'Starting blocks']),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Haugen T et al. (2019) The training and development of elite sprint performance: an integration of scientific and best practice literature. Sports Med Open 5:44',
    notes: L(
      'قارنه بأفضل 100 متر للعداء: لو الفرق بيكبر يبقى تحمل السرعة محتاج شغل. مفيد لعدائي 200 و400 متر في فترة الإعداد الخاص.',
      'Compare with the athlete\'s best 100 m: a growing gap signals a speed-endurance deficit. Useful for 200 m and 400 m runners in the specific preparation phase.'
    )
  },
  {
    id: 'ts_run_300_se',
    name: L('اختبار 300 متر (تحمل خاص لـ 400 متر)', '300 m special-endurance test (400 m runners)'),
    category: 'anaerobic',
    sports: ['sprint', 'hurdles', 'middle_dist'],
    population: L('عدائين 400 متر و400 حواجز و800 متر', '400 m, 400 m hurdles and 800 m athletes'),
    measures: L('التحمل اللاكتيكي والقدرة على الحفاظ على السرعة', 'Lactic (glycolytic) endurance and ability to hold speed'),
    protocol: L(
      '1) إحماء كامل. 2) بداية من البلوك في حارة 300 متر. 3) 300 متر أقصى جهد مع تسجيل زمن الـ 100 والـ 200 لو ممكن. 4) قياس لاكتات بعد 3-5 دقايق (اختياري).',
      '1) Full warm-up. 2) Block start at the 300 m mark. 3) Run 300 m all-out with 100 m and 200 m splits if possible. 4) Optional blood lactate 3-5 min after.'
    ),
    equipment: EQ(['تراك', 'Track'], GATES, ['بلوك بداية', 'Starting blocks']),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Haugen T et al. (2019) Sports Med Open 5:44; common 400 m coaching practice (special-endurance testing)',
    notes: L(
      'من أكتر الاختبارات ارتباطًا بزمن الـ 400 متر. اعمله بعد يوم راحة، ولاحظ علامات الإجهاد الزائد (نوم، نبض الراحة، ألم) قبل تكراره لأن حمله العصبي والأيضي عالي.',
      'One of the tests most closely related to 400 m time. Perform it after a rest day and check overtraining markers (sleep, resting HR, soreness) before repeating, as its neural and metabolic load is high.'
    )
  },
  {
    id: 'ts_run_30m_fly',
    name: L('اختبار 30 متر طائر (أقصى سرعة)', '30 m flying sprint (maximal velocity)'),
    category: 'speed',
    sports: ['sprint', 'hurdles', 'long_jump', 'football', 'rugby'],
    measures: L('السرعة القصوى بعد التسارع', 'Maximal sprinting velocity'),
    protocol: L(
      '1) منطقة تسارع 20-30 متر ثم منطقة قياس 30 متر ببوابتين ضوئيتين. 2) العداء يتسارع ويدخل منطقة القياس بأقصى سرعة. 3) 2-3 محاولات براحة 4-6 دقايق، خد الأفضل. 4) السرعة (م/ث) = 30 ÷ الزمن.',
      '1) 20-30 m acceleration zone then a 30 m timed zone between two timing gates. 2) Athlete accelerates and enters the timed zone at top speed. 3) 2-3 trials with 4-6 min rest; take the best. 4) Velocity (m/s) = 30 / time.'
    ),
    equipment: EQ(['بوابتين توقيت ضوئية', 'Two timing gates'], CONES, ['تراك', 'Track']),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Haugen T et al. (2019) Sports Med Open 5:44; Haugen T, Buchheit M (2016) Sprint running performance monitoring. Sports Med 46:641-656',
    notes: L(
      'عدائي 100 متر الرجال على المستوى العالمي بيوصلوا لسرعات قصوى حوالي 11.5-12.4 م/ث (يعني حوالي 2.4-2.6 ثانية لـ 30 متر). ساعة الإيقاف اليدوي مش دقيقة كفاية للمسافات دي.',
      'World-class male 100 m sprinters reach peak velocities of about 11.5-12.4 m/s (about 2.4-2.6 s over 30 m). Hand timing is not accurate enough over this distance.'
    )
  },
  {
    id: 'ts_run_standing_triple',
    name: L('الوثبة الثلاثية من الثبات', 'Standing triple jump'),
    category: 'power',
    sports: ['sprint', 'long_jump', 'high_jump', 'hurdles'],
    measures: L('القدرة الأفقية والمرونة الارتدادية للرجلين', 'Horizontal power and reactive leg strength'),
    protocol: L(
      '1) الوقوف خلف الخط بالقدمين. 2) دفعة بالقدمين والهبوط على رجل واحدة (حجلة)، ثم خطوة على الرجل التانية، ثم وثبة والهبوط بالقدمين في حفرة الرمل. 3) قياس المسافة من الخط لأقرب أثر. 4) أفضل 3 محاولات.',
      '1) Stand behind the line with both feet. 2) Two-foot take-off landing on one foot (hop), a step onto the other foot, then a jump landing on both feet in the sand pit. 3) Measure from the line to the nearest mark. 4) Best of 3 attempts.'
    ),
    equipment: EQ(['حفرة رمل', 'Sand pit'], TAPE),
    unit: 'm',
    better: 'higher',
    norms: [],
    source: 'Mackala K, Fostiak M, Kowalski K (2015) Selected determinants of acceleration in the 100 m sprint. J Hum Kinet 45:135-148',
    notes: L(
      'مرتبط بقوة التسارع في العدو والوثب. سجل النتيجة نسبة لطول الجسم كمان لو هتقارن ناشئين.',
      'Related to sprint acceleration and jumping. Also express it relative to height when comparing youth athletes.'
    )
  },
  {
    id: 'ts_run_5_bound',
    name: L('اختبار الخمس وثبات (5-bound)', 'Five-bound test'),
    category: 'power',
    sports: ['sprint', 'long_jump', 'hurdles', 'middle_dist'],
    measures: L('القدرة الأفقية المتكررة والارتداد', 'Repeated horizontal power and elastic reactivity'),
    protocol: L(
      '1) بداية من الوقوف بالقدمين. 2) 5 وثبات متبادلة (يمين-شمال) متتالية بأقصى مسافة. 3) الهبوط الأخير بالقدمين (حفرة رمل أو مرتبة). 4) قياس المسافة الكلية؛ أفضل محاولتين أو 3.',
      '1) Start standing with feet together. 2) Perform 5 consecutive alternate-leg bounds for maximum distance. 3) Land the last one on both feet (sand pit or mat). 4) Measure total distance; best of 2-3 trials.'
    ),
    equipment: EQ(['حفرة رمل أو مرتبة هبوط', 'Sand pit or landing mat'], TAPE),
    unit: 'm',
    better: 'higher',
    norms: [],
    source: 'Hudgins B, Scharfenberg J, Triplett NT, McBride JM (2013) Relationship between jumping ability and running performance in events of varying distance. J Strength Cond Res 27(3):563-567',
    notes: L(
      'ارتبط في الدراسات بأداء العدو والمسافات المتوسطة. سطح الجري لازم يكون واحد في كل مرة.',
      'Linked in research to sprint and middle-distance performance. Use the same surface every time.'
    )
  },
  {
    id: 'ts_run_ohb_shot',
    name: L('رمي الجلة للخلف فوق الرأس', 'Overhead backward shot throw'),
    category: 'power',
    sports: ['shot_put', 'javelin', 'sprint', 'weightlifting'],
    measures: L('القدرة الكلية للجسم (امتداد الفخذ والركبة والكاحل)', 'Total-body power (triple extension)'),
    protocol: L(
      '1) الوقوف ضهرك لمنطقة الرمي والكعبين عند الخط. 2) الجلة بالإيدين تحت مستوى الوسط (رجال 7.26 أو 4 كجم، سيدات 4 أو 3 كجم؛ ثبّت الوزن). 3) ثني ثم امتداد كامل ورمي الجلة للخلف فوق الرأس. 4) قياس المسافة لأول أثر؛ أفضل 3.',
      '1) Stand with your back to the throwing area, heels at the line. 2) Hold the shot in both hands below the waist (men 7.26 or 4 kg, women 4 or 3 kg; keep it fixed). 3) Dip then fully extend, throwing the shot backwards overhead. 4) Measure to the first mark; best of 3.'
    ),
    equipment: EQ(['جلة بوزن ثابت', 'Shot of fixed mass'], TAPE, ['منطقة رمي آمنة', 'Safe throwing area']),
    unit: 'm',
    better: 'higher',
    norms: [],
    source: 'World Athletics Coaches Education and Certification System (throws); Stockbrugger BA, Haennel RG (2003) Contributing factors to performance of a medicine ball explosive power test. J Strength Cond Res 17(4):768-774',
    notes: L(
      'من أشهر اختبارات الرماة؛ ممكن تضيف الرمي الأمامي من تحت (Forward underhand throw) كاختبار مكمل. خلي المنطقة خالية تمامًا لأسباب أمان.',
      'A staple throwers\' test; add the forward underhand throw as a complementary test. Keep the landing area completely clear for safety.'
    )
  },
  {
    id: 'ts_run_lt_30min',
    name: L('اختبار العتبة الميداني 30 دقيقة (فريل)', '30-minute threshold field test (Friel)'),
    category: 'aerobic',
    sports: ['running', 'marathon', 'triathlon', 'trail_running'],
    measures: L('نبض وإيقاع العتبة اللاكتيكية', 'Lactate-threshold heart rate and pace'),
    protocol: L(
      '1) إحماء 15 دقيقة. 2) جري 30 دقيقة لوحدك بأقصى جهد منتظم (زي سباق). 3) اضغط Lap بعد أول 10 دقايق. 4) متوسط النبض في آخر 20 دقيقة = نبض العتبة (LTHR)، ومتوسط الإيقاع = إيقاع العتبة. 5) سجل المسافة الكلية.',
      '1) 15 min warm-up. 2) Run 30 min solo at race-like maximal steady effort. 3) Press lap after the first 10 min. 4) Average HR over the last 20 min = LTHR; average pace = threshold pace. 5) Record total distance.'
    ),
    equipment: EQ(['ساعة GPS', 'GPS watch'], HRM),
    unit: 'm',
    better: 'higher',
    norms: [],
    source: 'Friel J (2016) The Triathlete\'s Training Bible, 4th ed. (LTHR field test)',
    notes: L(
      'الناتج الأهم هو نبض العتبة لتحديد مناطق النبض (مثلاً منطقة 2 في الجري = 85-89% من LTHR). مسار مسطح وجو معتدل لنتيجة قابلة للمقارنة.',
      'The key output is LTHR for heart-rate zones (e.g. running zone 2 = 85-89% of LTHR). Use a flat route and mild conditions for comparable results.'
    )
  }
];

/* ================================== TEAM SPORTS ================================== */
const TEAM = [
  {
    id: 'ts_team_yoyo_ir1',
    name: L('اختبار يو-يو للتحمل المتقطع مستوى 1 (حسب الرياضة)', 'Yo-Yo Intermittent Recovery Test level 1 (sport-specific use)'),
    category: 'aerobic',
    sports: ['football', 'basketball', 'handball', 'rugby', 'futsal', 'hockey'],
    measures: L('القدرة على تكرار الجهد العالي مع استشفاء قصير', 'Ability to repeat intense efforts with short recovery'),
    protocol: L(
      '1) مسار 20 متر ذهاب وعودة + منطقة استشفاء 5 متر خلف خط البداية. 2) الجري 2×20 متر على إيقاع الصافرة ثم 10 ثواني هرولة (5+5 متر). 3) السرعة بتزيد تدريجيًا. 4) أول تأخير = إنذار، التأخير التاني = نهاية الاختبار. 5) سجل المسافة الكلية بالمتر.',
      '1) 20 m shuttle course plus a 5 m recovery zone behind the start line. 2) Run 2 x 20 m to the beeps then 10 s active recovery (2 x 5 m jog). 3) Speed increases progressively. 4) First miss = warning, second miss = test ends. 5) Record total distance in metres.'
    ),
    equipment: EQ(CONES, AUDIO, TAPE),
    unit: 'm',
    better: 'higher',
    norms: [],
    source: 'Bangsbo J, Iaia FM, Krustrup P (2008) The Yo-Yo intermittent recovery test. Sports Med 38(1):37-51; Krustrup P et al. (2003) Med Sci Sports Exerc 35:697-705',
    notes: L(
      'تقدير VO2max (مل/كجم/د) = المسافة × 0.0084 + 36.4. قيم مرجعية تقريبية من الأبحاث: لاعبو كرة القدم المحترفين الرجال غالبًا 2000-2500 متر، ولاعبات النخبة 1300-1800 متر. في السلة واليد والرجبي قارن باللاعبين في نفس المستوى والمركز، والفرق بين المراكز كبير (مثلاً لاعبو الوسط في الكورة أعلى من المدافعين وحراس المرمى).',
      'VO2max estimate (ml/kg/min) = distance x 0.0084 + 36.4. Approximate research reference values: professional male footballers commonly 2000-2500 m, elite female footballers 1300-1800 m. In basketball, handball and rugby compare within the same level and position; positional differences are large (e.g. football midfielders above centre-backs and goalkeepers).'
    )
  },
  {
    id: 'ts_team_30_15_ift',
    name: L('اختبار 30-15 للياقة المتقطعة (بوشيه)', '30-15 Intermittent Fitness Test (Buchheit)'),
    category: 'aerobic',
    sports: ['football', 'basketball', 'handball', 'rugby', 'futsal', 'hockey'],
    measures: L('السرعة الهوائية المتقطعة القصوى (VIFT) مع تغيير الاتجاه', 'Maximal intermittent running velocity (VIFT) including changes of direction'),
    protocol: L(
      '1) مسار 40 متر مع منطقة 3 متر عند الطرفين والنص. 2) جري 30 ثانية ذهاب وعودة على إيقاع الصافرة، ثم 15 ثانية مشي للخط التالي. 3) البداية 8 كم/س وتزيد 0.5 كم/س كل مرحلة. 4) الاختبار بينتهي لما اللاعب ما يوصلش لمنطقة الـ 3 متر 3 مرات متتالية. 5) VIFT = سرعة آخر مرحلة مكتملة.',
      '1) 40 m course with 3 m zones at each end and the middle. 2) Run 30 s back and forth to the beeps, then walk 15 s to the next line. 3) Start at 8 km/h, +0.5 km/h each stage. 4) Test ends when the player fails to reach the 3 m zone on three consecutive beeps. 5) VIFT = speed of the last completed stage.'
    ),
    equipment: EQ(CONES, AUDIO, TAPE),
    unit: 'km/h',
    better: 'higher',
    norms: [],
    source: 'Buchheit M (2008) The 30-15 Intermittent Fitness Test: accuracy for individualizing interval training of young intermittent sport players. J Strength Cond Res 22(2):365-374',
    notes: L(
      'VO2max = 28.3 − 2.15G − 0.741A − 0.0357W + 0.0586×A×VIFT + 1.03×VIFT (G: 1 رجال، 2 سيدات؛ A السن؛ W الوزن). الأهم استخدام VIFT لتحديد سرعات الإنترفال (مثلاً 90-95% VIFT في تمارين 15/15). لاعبو الرياضات الجماعية الرجال المحترفين غالبًا حوالي 19-21 كم/س.',
      'VO2max = 28.3 - 2.15G - 0.741A - 0.0357W + 0.0586 x A x VIFT + 1.03 x VIFT (G: 1 male, 2 female; A age; W body mass). Its main use is prescribing interval speeds (e.g. 90-95% VIFT for 15/15 runs). Professional male team-sport players commonly score about 19-21 km/h.'
    )
  },
  {
    id: 'ts_team_rsa_6x30',
    name: L('اختبار تكرار السرعة 6×30 متر', 'Repeated-sprint ability 6 x 30 m'),
    category: 'anaerobic',
    sports: ['football', 'basketball', 'handball', 'rugby', 'futsal', 'hockey'],
    measures: L('القدرة على تكرار العدو السريع ومؤشر التعب', 'Repeated-sprint ability and fatigue index'),
    protocol: L(
      '1) إحماء كامل مع تسارعات. 2) 6 × 30 متر عدو مستقيم أقصى سرعة. 3) انطلاقة كل 25 ثانية (الرجوع هرولة لخط البداية). 4) سجل زمن كل عدوة. 5) احسب أفضل زمن، المتوسط، ونسبة الهبوط.',
      '1) Full warm-up with accelerations. 2) 6 x 30 m straight-line maximal sprints. 3) One sprint every 25 s (jog back to the start). 4) Record each sprint time. 5) Calculate best, mean and percentage decrement.'
    ),
    equipment: EQ(GATES, CONES),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Girard O, Mendez-Villanueva A, Bishop D (2011) Repeated-sprint ability - Part I: factors contributing to fatigue. Sports Med 41(8):673-694',
    notes: L(
      'النتيجة المسجلة = متوسط الزمن. نسبة الهبوط Sdec% = (مجموع الأزمنة ÷ (أفضل زمن × 6) − 1) × 100. مؤشر التعب التقليدي = (أبطأ − أسرع) ÷ أسرع × 100. Sdec أكثر ثباتًا. المتوسط أهم من مؤشر التعب لأن اللاعب البطيء ممكن يطلع "تعبه أقل".',
      'Recorded result = mean sprint time. Sdec% = (sum of times / (best x 6) - 1) x 100. Classic fatigue index = (slowest - fastest) / fastest x 100. Sdec is more reliable. Mean time matters more than any fatigue index, because a slow player can show a "small" decrement.'
    )
  },
  {
    id: 'ts_team_rsa_6x40',
    name: L('اختبار تكرار السرعة 6×40 متر (20+20 مع لفّة)', 'Repeated-sprint ability 6 x 40 m (20 + 20 m shuttle)'),
    category: 'anaerobic',
    sports: ['football', 'futsal', 'handball', 'basketball', 'rugby'],
    measures: L('تكرار العدو مع تغيير اتجاه 180 درجة', 'Repeated sprints with a 180-degree change of direction'),
    protocol: L(
      '1) إحماء. 2) 6 تكرارات: عدو 20 متر، لفّة 180 درجة، رجوع 20 متر. 3) 20 ثانية راحة سلبية بين كل تكرار. 4) سجل زمن كل تكرار.',
      '1) Warm up. 2) 6 repetitions of: sprint 20 m, 180-degree turn, sprint 20 m back. 3) 20 s passive recovery between repetitions. 4) Record each time.'
    ),
    equipment: EQ(GATES, CONES),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Impellizzeri FM et al. (2008) Validity of a repeated-sprint test for football. Int J Sports Med 29(11):899-905',
    notes: L(
      'النتيجة المسجلة = متوسط الزمن (RSAmean)، وارتبط بالمسافة عالية الشدة في المباريات. احسب Sdec% بنفس معادلة اختبار 6×30.',
      'Recorded result = mean time (RSAmean), which was related to high-intensity match running. Compute Sdec% with the same formula as the 6 x 30 m test.'
    )
  },
  {
    id: 'ts_fb_bangsbo_sprint',
    name: L('اختبار بانجسبو للعدو المتكرر (7×34.2 متر)', 'Bangsbo sprint test (7 x 34.2 m)'),
    category: 'anaerobic',
    sports: ['football', 'hockey', 'rugby'],
    measures: L('تكرار العدو مع تغيير اتجاه وتعب', 'Repeated sprinting with changes of direction'),
    protocol: L(
      '1) مسار 34.2 متر فيه جزء سلالوم بالأقماع في النص. 2) 7 عدوات أقصى سرعة. 3) 25 ثانية هرولة للرجوع لخط البداية (حوالي 40 متر). 4) سجل الأزمنة السبعة.',
      '1) 34.2 m course with a cone slalom section in the middle. 2) 7 maximal sprints. 3) 25 s active recovery jogging back to the start (about 40 m). 4) Record all seven times.'
    ),
    equipment: EQ(GATES, CONES, TAPE),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Bangsbo J (1994) Fitness Training in Football: A Scientific Approach; Wragg CB, Maxwell NS, Doust JH (2000) Eur J Appl Physiol 83:77-83',
    notes: L(
      'سجل أفضل زمن ومتوسط الأزمنة ومؤشر التعب. ثبّت الأرضية والأحذية بين الاختبارات.',
      'Record best time, mean time and fatigue index. Keep surface and footwear constant between tests.'
    )
  },
  {
    id: 'ts_fb_lspt',
    name: L('اختبار لوفبرا للتمرير في كرة القدم (LSPT)', 'Loughborough Soccer Passing Test (LSPT)'),
    category: 'skill',
    sports: ['football', 'futsal'],
    measures: L('دقة وسرعة التمرير تحت ضغط الوقت والقرار', 'Passing speed and accuracy under time and decision pressure'),
    protocol: L(
      '1) جهّز الملعب بالمقاسات الموجودة في البروتوكول: مستطيل تمرير و4 بنشات أهداف ملونة. 2) اللاعب يمرر 16 تمريرة (8 قصيرة و8 طويلة) بترتيب عشوائي بيقوله المُختبر. 3) الزمن من أول تمريرة لحد لمس آخر كرة للهدف. 4) تُضاف ثواني عقوبة (مثلاً: 5 ثواني للكرة اللي تفوت البنش أو تروح لهدف غلط، 3 ثواني لو ما لمستش منطقة الهدف، 2 ثانية للمس الكرة باليد أو التمرير من برا المنطقة، ثانية لكل ثانية فوق 43 ثانية)، وتُخصم ثانية لو الكرة لمست الشريط اللي في نص الهدف. 5) النتيجة = الزمن + العقوبات.',
      '1) Set up to the protocol dimensions: a passing area and four coloured target benches. 2) Player performs 16 passes (8 short, 8 long) in a random order called by the tester. 3) Time from the first pass until the last ball hits a target. 4) Add penalty seconds (e.g. 5 s for missing the bench or hitting the wrong one, 3 s for missing the target area, 2 s for handling the ball or passing outside the zone, 1 s per second over 43 s) and subtract 1 s for hitting the central target strip. 5) Score = time + penalties.'
    ),
    equipment: EQ(['4 بنشات أهداف أو ألواح ملونة', 'Four target benches or coloured boards'], CONES, WATCH, ['كور مقاس 5', 'Size 5 balls']),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Ali A et al. (2007) Reliability and validity of two tests of soccer skill. J Sports Sci 25(13):1461-1470',
    notes: L(
      'في الدراسة الأصلية اللاعبين النخبة سجلوا أداء أفضل بوضوح من غير النخبة. مفيد لقياس تأثير التعب (اعمله بعد مجهود) أو الجفاف على المهارة.',
      'In the original study elite players scored clearly better than non-elite players. Useful for measuring the effect of fatigue (perform after exercise) or dehydration on skill.'
    )
  },
  {
    id: 'ts_futsal_fiet',
    name: L('اختبار الفوتسال للتحمل المتقطع (FIET)', 'Futsal Intermittent Endurance Test (FIET)'),
    category: 'aerobic',
    sports: ['futsal'],
    measures: L('التحمل المتقطع الخاص بالفوتسال', 'Futsal-specific intermittent endurance'),
    protocol: L(
      '1) جهّز المسار حسب البروتوكول الأصلي. 2) جري مكوكي متقطع على إيقاع صوتي مع فترات توقف قصيرة. 3) السرعة بتزيد كل مرحلة لحد الإرهاق. 4) سجل آخر مرحلة مكتملة والمسافة.',
      '1) Set up the course per the original protocol. 2) Intermittent shuttle running to audio cues with brief pauses. 3) Speed increases each stage until exhaustion. 4) Record last completed stage and distance.'
    ),
    equipment: EQ(CONES, AUDIO, TAPE),
    unit: 'm',
    better: 'higher',
    norms: [],
    source: 'Castagna C, Barbero Alvarez JC (2010) Physiological demands of an intermittent futsal-oriented high-intensity test. J Strength Cond Res 24(9):2322-2329',
    notes: L(
      'مصمم يحاكي طبيعة الفوتسال (جري قصير وتوقفات)، وبيستخدم كبديل خاص عن اختبارات الجري المستمر.',
      'Designed to mimic futsal activity (short runs and stops); used as a sport-specific alternative to continuous running tests.'
    )
  },
  {
    id: 'ts_bball_lane_agility',
    name: L('اختبار رشاقة المنطقة (NBA Lane Agility)', 'NBA lane agility drill'),
    category: 'agility',
    sports: ['basketball'],
    measures: L('الرشاقة والتنقل الدفاعي (أمام، جانبي، خلفي)', 'Agility and defensive movement (forward, lateral, backward)'),
    protocol: L(
      '1) البداية عند الزاوية الشمال للمنطقة على خط النهاية. 2) عدو للأمام لخط الرمية الحرة، سلايد يمين بعرض المنطقة، جري للخلف لخط النهاية، سلايد شمال لنقطة البداية. 3) لمس الأرض عند نقطة البداية وتكرار المسار في الاتجاه العكسي. 4) أفضل محاولتين؛ أي قطع للأقماع يلغي المحاولة.',
      '1) Start at the left corner of the lane on the baseline. 2) Sprint forward to the free-throw line, defensive-slide right across the lane, backpedal to the baseline, slide left back to the start. 3) Touch the start point and repeat the course in the reverse direction. 4) Best of two trials; cutting a cone voids the trial.'
    ),
    equipment: EQ(['ملعب سلة', 'Basketball court'], CONES, GATES),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'NBA Draft Combine strength & agility testing protocol',
    notes: L(
      'نتائج لاعبي الـ NBA Draft Combine غالبًا بين حوالي 10.5 و12 ثانية؛ أقل من 10.5 يعتبر من أفضل النتائج. قارن حسب المركز (الأجنحة وصانعي اللعب أسرع من لاعبي الارتكاز).',
      'NBA Draft Combine results mostly fall between about 10.5 and 12 s; under 10.5 s is among the best. Compare by position (guards and wings are quicker than centres).'
    )
  },
  {
    id: 'ts_bball_34_sprint',
    name: L('عدو ثلاثة أرباع الملعب (3/4 Court Sprint)', 'Three-quarter court sprint'),
    category: 'speed',
    sports: ['basketball'],
    measures: L('سرعة العدو الخاصة بكرة السلة', 'Basketball-specific sprint speed'),
    protocol: L(
      '1) البداية من خط النهاية. 2) عدو أقصى سرعة لخط الرمية الحرة في نص الملعب التاني (حوالي 22.9 متر / 75 قدم). 3) أفضل محاولتين براحة كاملة.',
      '1) Start on the baseline. 2) Sprint all-out to the far free-throw line (about 22.9 m / 75 ft). 3) Best of two trials with full rest.'
    ),
    equipment: EQ(['ملعب سلة', 'Basketball court'], GATES),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'NBA Draft Combine strength & agility testing protocol',
    notes: L(
      'أغلب نتائج الـ Combine حوالي 3.1-3.5 ثانية، وأقل من 3.1 سريع جدًا. التوقيت الإلكتروني ضروري للمقارنة.',
      'Most Combine results are about 3.1-3.5 s; under 3.1 s is very fast. Electronic timing is needed for comparisons.'
    )
  },
  {
    id: 'ts_vb_spike_jump',
    name: L('ارتفاع الضربة الساحقة (Spike Reach)', 'Spike jump (approach jump reach)'),
    category: 'power',
    sports: ['volleyball'],
    measures: L('أقصى ارتفاع وصول بالإيد بعد الاقتراب', 'Maximal one-hand reach height after an approach'),
    protocol: L(
      '1) قيس الوصول من الوقوف (إيد واحدة ممدودة). 2) اقتراب 3-4 خطوات زي الضرب الساحق. 3) وثب ولمس أعلى ريشة في جهاز Vertec أو علامة على الحيطة بإيد الضرب. 4) أفضل 3 محاولات. 5) ارتفاع الوثب = ارتفاع الوصول − الوصول من الوقوف.',
      '1) Measure standing one-hand reach. 2) 3-4 step spike approach. 3) Jump and touch the highest Vertec vane or wall mark with the hitting hand. 4) Best of 3 attempts. 5) Jump height = reach height - standing reach.'
    ),
    equipment: EQ(['جهاز Vertec أو حيطة مدرجة', 'Vertec or graduated wall'], TAPE),
    unit: 'cm',
    better: 'higher',
    norms: [],
    source: 'Sheppard JM et al. (2008) Relative importance of strength, power, and anthropometric measures to jump performance of elite volleyball players. J Strength Cond Res 22(3):758-765; FIVB player spike/block reach records',
    notes: L(
      'الاتحاد الدولي FIVB بينشر ارتفاع الضربة والصد للاعبين الدوليين. كمرجع تقريبي: رجال المستوى الدولي غالبًا 330-365 سم، والسيدات 290-320 سم. سجل الوصول والوثب الصافي الاتنين.',
      'FIVB publishes spike and block reach for international players. As a rough reference, international men are commonly 330-365 cm and women 290-320 cm. Record both reach and net jump height.'
    )
  },
  {
    id: 'ts_vb_block_jump',
    name: L('ارتفاع حائط الصد (Block Reach)', 'Block jump (two-hand reach)'),
    category: 'power',
    sports: ['volleyball'],
    measures: L('أقصى ارتفاع وصول بالإيدين في حائط الصد', 'Maximal two-hand reach in a block jump'),
    protocol: L(
      '1) الوقوف والإيدين قدام الكتف زي وضع الصد. 2) وثبة من الثبات (مع ثني سريع) ولمس أعلى نقطة بالإيدين الاتنين. 3) أفضل 3 محاولات. 4) سجل ارتفاع الوصول والوثب الصافي.',
      '1) Stand with hands in front of the shoulders in a blocking stance. 2) Countermovement jump without steps, reaching as high as possible with both hands. 3) Best of 3 attempts. 4) Record reach height and net jump.'
    ),
    equipment: EQ(['جهاز Vertec أو حيطة مدرجة', 'Vertec or graduated wall'], TAPE),
    unit: 'cm',
    better: 'higher',
    norms: [],
    source: 'Sheppard JM et al. (2008) J Strength Cond Res 22(3):758-765; FIVB player block-reach records',
    notes: L(
      'ممكن كمان تعمل نسخة بخطوة جانبية (slide/cross-over) قبل الصد لأنها أقرب للمباراة. عادة الصد أقل من الضرب بحوالي 15-25 سم.',
      'You can add a side-step (slide or cross-over) version, which is closer to match play. Block reach is usually about 15-25 cm lower than spike reach.'
    )
  },
  {
    id: 'ts_hb_throw_velocity',
    name: L('سرعة التصويب في كرة اليد', 'Handball throwing velocity'),
    category: 'power',
    sports: ['handball'],
    measures: L('سرعة الكرة في التصويب من الثبات، بخطوات، ومن الوثب', 'Ball velocity in standing, run-up and jump throws'),
    protocol: L(
      '1) إحماء كتف كامل. 2) 3 أنواع: تصويب من 7 متر من الثبات، تصويب بـ 3 خطوات اقتراب، تصويب من الوثب. 3) رادار خلف المرمى. 4) 3 محاولات لكل نوع براحة 30-60 ثانية؛ سجل الأعلى مع اشتراط دخول الكرة المرمى.',
      '1) Full shoulder warm-up. 2) Three throw types: 7 m standing throw, 3-step run-up throw, jump throw. 3) Radar behind the goal. 4) 3 trials per type with 30-60 s rest; record the fastest that hits the goal.'
    ),
    equipment: EQ(['رادار سرعة', 'Radar gun'], ['كرة يد رسمية حسب الفئة', 'Official handball for the category'], ['مرمى', 'Goal']),
    unit: 'km/h',
    better: 'higher',
    norms: [],
    source: 'Gorostiaga EM et al. (2005) Differences in physical fitness and throwing velocity among elite and amateur male handball players. Int J Sports Med 26:225-232',
    notes: L(
      'اللاعبين النخبة أسرع بوضوح من الهواة، والتصويب بخطوات أسرع من الثبات. التصويب بخطوات عند الرجال النخبة غالبًا حوالي 85-100 كم/س. ربطه بقوة الصدر والكتف ووزن الجسم الخالي من الدهون.',
      'Elite players throw clearly faster than amateurs, and run-up throws are faster than standing throws. Elite men\'s run-up throws are commonly about 85-100 km/h. Relate it to upper-body strength and lean mass.'
    )
  },
  {
    id: 'ts_rugby_bronco',
    name: L('اختبار البرونكو (رجبي)', 'Bronco test (rugby)'),
    category: 'aerobic',
    sports: ['rugby'],
    measures: L('التحمل الهوائي مع تغيير الاتجاه', 'Aerobic endurance with changes of direction'),
    protocol: L(
      '1) علّم خطوط عند 0 و20 و40 و60 متر. 2) مجموعة واحدة = 0→20→0 ثم 0→40→0 ثم 0→60→0 (240 متر). 3) 5 مجموعات متواصلة بدون راحة (1200 متر). 4) سجل الزمن الكلي.',
      '1) Mark lines at 0, 20, 40 and 60 m. 2) One set = 0-20-0, then 0-40-0, then 0-60-0 (240 m). 3) 5 continuous sets with no rest (1200 m). 4) Record total time.'
    ),
    equipment: EQ(CONES, WATCH, TAPE),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Professional rugby union conditioning practice (New Zealand Rugby, RFU academies); practitioner-developed test with limited peer-reviewed norms',
    notes: L(
      'لاعبو الرجبي المحترفين غالبًا بيخلصوه في حوالي 4:30-5:30، والظهيرين أسرع من المهاجمين. لازم اللاعب يعدي الخط بالرجل في كل لفّة.',
      'Professional rugby players commonly finish in roughly 4:30-5:30, with backs faster than forwards. The player must cross each line with a foot at every turn.'
    )
  },
  {
    id: 'ts_team_1200_shuttle',
    name: L('اختبار 1.2 كم مكوكي', '1.2 km shuttle run test'),
    category: 'aerobic',
    sports: ['rugby', 'football', 'hockey'],
    measures: L('التحمل الهوائي الخاص بالرياضات الجماعية', 'Team-sport aerobic endurance'),
    protocol: L(
      '1) مسار مكوكي مستقيم (20 متر عادة؛ ثبّت الطول المعتمد عندك). 2) جري ذهاب وعودة بأقصى سرعة لحد إكمال 1200 متر. 3) سجل الزمن الكلي.',
      '1) Straight shuttle course (usually 20 m; keep your adopted length fixed). 2) Run back and forth as fast as possible until 1200 m is completed. 3) Record total time.'
    ),
    equipment: EQ(CONES, WATCH, TAPE),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Used in Australian rugby league, Australian football and Australian Defence Force physical assessment; e.g. Gabbett TJ, rugby league fitness studies (J Sci Med Sport, J Strength Cond Res)',
    notes: L(
      'اختبار بسيط ومكلفش، لكن النتيجة بتتأثر كتير بمهارة اللفّ وطول المكوك، فما تقارنش بين نسخ مختلفة.',
      'Simple and cheap, but results depend heavily on turning skill and shuttle length, so do not compare different versions.'
    )
  },
  {
    id: 'ts_hockey_ssdt',
    name: L('اختبار العدو والمراوغة المكوكي للهوكي (SSDT)', 'Hockey Shuttle Sprint and Dribble Test (SSDT)'),
    category: 'skill',
    sports: ['hockey'],
    measures: L('العدو المتكرر بالكرة وبدونها في الهوكي', 'Repeated sprinting with and without the ball in field hockey'),
    protocol: L(
      '1) جهّز المسار المكوكي بمقاسات لمينك وزملاؤه. 2) نسخة عدو بدون كرة ونسخة مع مراوغة الكرة بالعصا. 3) التكرارات بفترات راحة قصيرة ثابتة. 4) سجل مجموع الزمن لكل نسخة.',
      '1) Set up the shuttle course to Lemmink et al. dimensions. 2) A sprint-only version and a dribbling version with ball and stick. 3) Repetitions with short fixed rests. 4) Record total time for each version.'
    ),
    equipment: EQ(GATES, CONES, ['عصا وكرة هوكي', 'Hockey stick and ball']),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Lemmink KAPM, Elferink-Gemser MT, Visscher C (2004) Evaluation of the reliability of two field hockey specific sprint and dribble tests in young field hockey players. Br J Sports Med 38:138-142',
    notes: L(
      'الفرق بين زمن المراوغة وزمن العدو بيعكس كفاءة التحكم في الكرة على السرعة. استخدم في انتقاء ومتابعة الناشئين.',
      'The difference between dribble and sprint times reflects ball control at speed. Used in youth selection and monitoring.'
    )
  },
  {
    id: 'ts_hockey_slsdt',
    name: L('اختبار العدو والمراوغة المتعرج للهوكي (SlSDT)', 'Hockey Slalom Sprint and Dribble Test (SlSDT)'),
    category: 'agility',
    sports: ['hockey'],
    measures: L('الرشاقة والمراوغة في مسار متعرج', 'Agility and dribbling through a slalom course'),
    protocol: L(
      '1) مسار سلالوم بالأقماع حسب البروتوكول. 2) مرة عدو بدون كرة ومرة بمراوغة الكرة. 3) أفضل محاولة لكل نسخة.',
      '1) Cone slalom course per the protocol. 2) One run without the ball and one dribbling. 3) Best trial for each version.'
    ),
    equipment: EQ(GATES, CONES, ['عصا وكرة هوكي', 'Hockey stick and ball']),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Lemmink KAPM, Elferink-Gemser MT, Visscher C (2004) Br J Sports Med 38:138-142',
    notes: L(
      'في الدراسة الأصلية الاختبارين كانوا ثابتين (reliable) عند الناشئين وبيفرقوا بين مستويات اللعب.',
      'In the original study both tests were reliable in youth players and discriminated between playing levels.'
    )
  },
  {
    id: 'ts_base_60yd',
    name: L('عدو 60 ياردة (بيسبول)', '60-yard dash (baseball)'),
    category: 'speed',
    sports: ['baseball'],
    measures: L('السرعة في مسافة 54.9 متر', 'Running speed over 54.9 m'),
    protocol: L(
      '1) إحماء. 2) بداية من الوقوف (أو بداية الخطوة الجانبية حسب الكشافة). 3) عدو 60 ياردة (54.86 متر) أقصى سرعة. 4) أفضل محاولتين بتوقيت إلكتروني.',
      '1) Warm up. 2) Standing start (or the scout-specified start). 3) Sprint 60 yards (54.86 m) all-out. 4) Best of two trials, electronically timed.'
    ),
    equipment: EQ(GATES, TAPE),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Professional baseball scouting (20-80 scale); MLB Draft Combine testing',
    notes: L(
      'على مقياس الكشافة 20-80 التقريبي: حوالي 7.0 ثانية = متوسط (50)، وحوالي 6.7 ثانية = فوق المتوسط بوضوح (60)، وأقل من 6.5 = سرعة نخبة.',
      'On the approximate 20-80 scouting scale: about 7.0 s = average (50), about 6.7 s = plus (60), under 6.5 s = elite speed.'
    )
  },
  {
    id: 'ts_base_pitch_velocity',
    name: L('سرعة الرمية (بيسبول)', 'Pitching velocity (baseball)'),
    category: 'power',
    sports: ['baseball'],
    measures: L('سرعة الكرة في الرمية السريعة', 'Fastball velocity'),
    protocol: L(
      '1) إحماء رمي تدريجي كامل. 2) 5-10 رميات سريعة من الـ mound للكاتشر. 3) رادار أو نظام تتبع خلف الكاتشر. 4) سجل الأعلى والمتوسط.',
      '1) Full progressive throwing warm-up. 2) 5-10 fastballs from the mound to a catcher. 3) Radar gun or tracking system behind the catcher. 4) Record peak and average.'
    ),
    equipment: EQ(['رادار سرعة أو نظام تتبع', 'Radar gun or tracking system'], ['كور بيسبول', 'Baseballs']),
    unit: 'km/h',
    better: 'higher',
    norms: [],
    source: 'MLB Statcast pitch-velocity data; American Sports Medicine Institute (ASMI) pitch-count guidelines for youth',
    notes: L(
      'متوسط الرمية السريعة (four-seam) في MLB في المواسم الأخيرة حوالي 94 ميل/س (حوالي 151 كم/س). عند الناشئين التزم بحدود عدد الرميات والراحة لحماية الكوع والكتف.',
      'Average MLB four-seam fastball velocity in recent seasons is about 94 mph (about 151 km/h). In youth, follow pitch-count and rest guidelines to protect the elbow and shoulder.'
    )
  }
];

/* ================================== RACKET SPORTS ================================== */
const RACKET = [
  {
    id: 'ts_tennis_hit_turn',
    name: L('اختبار Hit & Turn للتنس', 'Hit & Turn Tennis Test'),
    category: 'aerobic',
    sports: ['tennis', 'padel'],
    measures: L('التحمل الخاص بالتنس مع حركة جانبية وضربات وهمية', 'Tennis-specific endurance with lateral movement and shadow strokes'),
    protocol: L(
      '1) اللاعب في نص خط القاعدة ومعاه المضرب. 2) مع الإشارة الصوتية يتحرك جانبيًا لعلامة على اليمين أو الشمال ويعمل ضربة وهمية (فورهاند/باكهاند) ويرجع للنص. 3) الإيقاع بيزيد كل مستوى. 4) الاختبار بينتهي لما يتأخر عن الإشارة مرتين متتاليتين أو يوقف. 5) سجل آخر مستوى مكتمل.',
      '1) Player at the centre of the baseline holding a racket. 2) On each audio signal, move sideways to a marker on the right or left, play a shadow forehand or backhand and return to the centre. 3) Tempo increases each level. 4) Test ends after two consecutive late arrivals or voluntary stop. 5) Record the last completed level.'
    ),
    equipment: EQ(['ملعب تنس', 'Tennis court'], ['مضرب', 'Racket'], AUDIO, HRM),
    unit: 'level',
    better: 'higher',
    norms: [],
    source: 'Ferrauti A, Kinner V, Fernandez-Fernandez J (2011) The Hit & Turn Tennis Test: an acoustically controlled endurance test for tennis players. J Sports Sci 29(5):485-494',
    notes: L(
      'أقرب لطبيعة التنس من اختبارات الجري المستقيم. استخدم أقصى نبض والمستوى النهائي لتحديد شدة تدريبات التحمل على الملعب.',
      'Closer to tennis movement than straight-line running tests. Use peak heart rate and final level to set on-court endurance training intensity.'
    )
  },
  {
    id: 'ts_tennis_spider',
    name: L('اختبار العنكبوت للتنس (Spider Drill)', 'Tennis spider drill'),
    category: 'agility',
    sports: ['tennis', 'padel'],
    measures: L('الرشاقة وتغيير الاتجاه في مساحة الملعب', 'Agility and change of direction across the court'),
    protocol: L(
      '1) حط مضرب أو صندوق عند نص خط القاعدة. 2) 5 كور عند: تقاطع خط القاعدة مع خط الفردي يمين وشمال، تقاطع خط الإرسال مع خط الفردي يمين وشمال، ونص خط الإرسال. 3) من الإشارة يجيب الكور واحدة واحدة ويحطها على المضرب. 4) الزمن من البداية لحد آخر كورة. 5) أفضل محاولتين.',
      '1) Place a racket or box at the centre mark of the baseline. 2) Place 5 balls at: both baseline/singles-sideline corners, both service-line/singles-sideline intersections, and the centre of the service line. 3) On the signal, retrieve the balls one at a time and place each on the racket. 4) Time from start until the last ball is placed. 5) Best of two trials.'
    ),
    equipment: EQ(['ملعب تنس', 'Tennis court'], ['5 كور تنس', '5 tennis balls'], ['مضرب أو صندوق', 'Racket or box'], WATCH),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Fernandez-Fernandez J, Ulbricht A, Ferrauti A (2014) Fitness testing of tennis players: how valuable is it? Br J Sports Med 48:i22-i31; USTA and Tennis Australia player testing',
    notes: L(
      'ثبّت ترتيب جمع الكور في كل مرة. مفيد لمتابعة الناشئين وبعد الرجوع من إصابات الكاحل والركبة.',
      'Keep the ball-collection order the same each time. Useful for tracking juniors and after ankle or knee injuries.'
    )
  },
  {
    id: 'ts_tennis_serve_velocity',
    name: L('سرعة الإرسال في التنس', 'Tennis serve velocity'),
    category: 'power',
    sports: ['tennis'],
    measures: L('سرعة الكرة في الإرسال الأول', 'First-serve ball speed'),
    protocol: L(
      '1) إحماء كتف وإرسالات تدريجية. 2) 10 إرسالات أولى بأقصى سرعة على مربع الإرسال. 3) رادار خلف اللاعب أو عند الشبكة. 4) سجل أعلى سرعة ومتوسط الإرسالات الصحيحة ونسبة الدخول.',
      '1) Shoulder warm-up and progressive serves. 2) 10 maximal first serves into the service box. 3) Radar behind the server or at the net. 4) Record peak speed, mean of serves in, and percentage in.'
    ),
    equipment: EQ(['رادار سرعة', 'Radar gun'], ['كور تنس', 'Tennis balls']),
    unit: 'km/h',
    better: 'higher',
    norms: [],
    source: 'Fernandez-Fernandez J, Ulbricht A, Ferrauti A (2014) Br J Sports Med 48:i22-i31',
    notes: L(
      'السرعة لازم تتقيم مع نسبة الدخول؛ سرعة عالية بنسبة دخول ضعيفة مش ميزة. متابعة مفيدة بعد برامج القوة والقدرة للكتف والجذع.',
      'Assess speed together with serve percentage; high speed with a poor percentage is not an asset. Useful for tracking shoulder and trunk power programmes.'
    )
  },
  {
    id: 'ts_badm_footwork',
    name: L('اختبار حركة القدمين متعدد الاتجاهات للريشة', 'Badminton multi-directional footwork test'),
    category: 'agility',
    sports: ['badminton'],
    measures: L('سرعة التنقل في الملعب للزوايا الست', 'Speed of court coverage to the six corners'),
    protocol: L(
      '1) اللاعب في نص الملعب. 2) علامات أو ريشات عند 6 نقاط: الزاويتين الأماميتين، جانبي نص الملعب، والزاويتين الخلفيتين. 3) يتحرك بخطوات الريشة للنقطة المطلوبة (بترتيب ثابت أو إشارة ضوئية)، يلمس ويرجع للنص. 4) سجل الزمن لعدد ثابت من اللمسات (مثلاً 16).',
      '1) Player at the court centre (base). 2) Markers or shuttles at 6 points: two front corners, two mid-court sides, two rear corners. 3) Move with badminton footwork to the called point (fixed order or light cue), touch it and return to base. 4) Record time for a fixed number of touches (e.g. 16).'
    ),
    equipment: EQ(['ملعب ريشة', 'Badminton court'], ['ريشات أو أقماع أو إضاءات', 'Shuttles, cones or lights'], WATCH),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Phomsoupha M, Laffaye G (2015) The science of badminton: game characteristics, anthropometry, physiology, visual fitness and biomechanics. Sports Med 45(4):473-495; Chin MK et al. (1995) Br J Sports Med 29(3):153-157',
    notes: L(
      'النسخة بالإشارات الضوئية العشوائية بتضيف عنصر الإدراك ورد الفعل. ثبّت عدد اللمسات والترتيب علشان المقارنة.',
      'The random light-cue version adds perception and reaction. Keep the number of touches and the order fixed for comparisons.'
    )
  },
  {
    id: 'ts_badm_endurance',
    name: L('اختبار التحمل الخاص بالريشة الطائرة', 'Badminton-specific endurance field test'),
    category: 'aerobic',
    sports: ['badminton'],
    measures: L('التحمل الهوائي الخاص بالريشة والعتبة', 'Badminton-specific aerobic performance and threshold'),
    protocol: L(
      '1) اللاعب بيتحرك بين نقاط على الملعب بحركات الريشة ويعمل ضربات وهمية. 2) إيقاع بيزيد بإشارات صوتية أو ضوئية. 3) قياس النبض طول الاختبار (ولاكتات لو متاح). 4) الاختبار بينتهي عند الإرهاق؛ سجل آخر مستوى.',
      '1) Player moves between court points with badminton footwork, playing shadow strokes. 2) Tempo increases via audio or light cues. 3) Heart rate throughout (lactate if available). 4) Test ends at exhaustion; record last level.'
    ),
    equipment: EQ(['ملعب ريشة', 'Badminton court'], ['مضرب', 'Racket'], AUDIO, HRM),
    unit: 'level',
    better: 'higher',
    norms: [],
    source: 'Wonisch M et al. (2003) Validation of a field test for the non-invasive determination of badminton specific aerobic performance. Br J Sports Med 37:115-118',
    notes: L(
      'بيسمح بتحديد نقطة انكسار النبض كعتبة بدون عينات دم. أنسب من اختبارات الجري لتخطيط تدريبات الملعب.',
      'Allows a heart-rate deflection point to be used as a threshold without blood samples. More relevant than running tests for planning on-court training.'
    )
  },
  {
    id: 'ts_squash_ghosting',
    name: L('اختبار الجوستنج المتدرج للاسكواش', 'Squash incremental ghosting test'),
    category: 'aerobic',
    sports: ['squash'],
    measures: L('اللياقة الهوائية الخاصة بالاسكواش', 'Squash-specific aerobic fitness'),
    protocol: L(
      '1) اللاعب في الـ T ومعاه المضرب. 2) مع كل إشارة (صوت أو ضوء) يتحرك لواحدة من 6 زوايا (أمامي، نص، خلفي يمين وشمال)، يعمل ضربة وهمية ويرجع للـ T. 3) الفترة بين الإشارات بتقل كل مستوى. 4) الاختبار بينتهي عند التأخر المتكرر أو الإرهاق؛ سجل المستوى.',
      '1) Player on the T with a racket. 2) On each cue (sound or light) move to one of 6 corners (front, middle, back on each side), play a shadow stroke and return to the T. 3) Interval between cues shortens each level. 4) Test ends on repeated late arrival or exhaustion; record the level.'
    ),
    equipment: EQ(['ملعب اسكواش', 'Squash court'], ['مضرب', 'Racket'], AUDIO, HRM),
    unit: 'level',
    better: 'higher',
    norms: [],
    source: 'Girard O et al. (2005) Specific incremental test in elite squash players. Br J Sports Med 39:921-926',
    notes: L(
      'في الدراسة الأصلية VO2max في الاختبار ده كان مشابه لاختبار السير المتحرك، مع استجابة أقرب لطبيعة اللعبة.',
      'In the original study, VO2max reached in this test was similar to treadmill testing, with a response closer to match demands.'
    )
  },
  {
    id: 'ts_squash_cod',
    name: L('اختبار سرعة تغيير الاتجاه للاسكواش', 'Squash change-of-direction speed test'),
    category: 'agility',
    sports: ['squash'],
    measures: L('سرعة التنقل وتغيير الاتجاه داخل الملعب', 'On-court movement and change-of-direction speed'),
    protocol: L(
      '1) مسار ثابت من الـ T للزوايا بترتيب محدد حسب البروتوكول. 2) لمس الهدف في كل زاوية بالمضرب والرجوع للـ T. 3) سجل الزمن الكلي؛ أفضل محاولتين براحة كاملة.',
      '1) A fixed route from the T to the corners in a set order per the protocol. 2) Touch the target in each corner with the racket and return to the T. 3) Record total time; best of two with full rest.'
    ),
    equipment: EQ(['ملعب اسكواش', 'Squash court'], ['مضرب', 'Racket'], GATES),
    unit: 's',
    better: 'lower',
    norms: [],
    source: 'Wilkinson M, Leedham D, Morton K, Kerr J, Winter EM (2009) Validity of a squash-specific test of change-of-direction speed. Int J Sports Physiol Perform 4(2):176-185',
    notes: L(
      'الاختبار فرّق بوضوح بين اللاعبين حسب ترتيبهم في الدراسة الأصلية؛ مفيد للمقارنة داخل نفس الأكاديمية.',
      'The test clearly discriminated between players by ranking in the original study; useful for comparisons within the same academy.'
    )
  },
  {
    id: 'ts_tt_eye_hand',
    name: L('اختبار توافق العين واليد لتنس الطاولة', 'Table tennis eye-hand coordination test'),
    category: 'reaction',
    sports: ['table_tennis'],
    population: L('ناشئين 7-12 سنة (انتقاء المواهب)', 'Youth 7-12 years (talent identification)'),
    measures: L('التوافق بين العين واليد والإدراك الحركي', 'Eye-hand coordination and perceptual-motor skill'),
    protocol: L(
      '1) اللاعب قدام ترابيزة تنس طاولة نصها مرفوع رأسي (أو حيطة) على مسافة ثابتة. 2) يرمي كرة تنس طاولة بإيد ويلقطها بالإيد التانية بعد ما تخبط في السطح، بالتبادل. 3) عدد اللقطات الصحيحة في 30 ثانية. 4) أفضل محاولة من 2.',
      '1) Player faces a table tennis table with one half folded vertical (or a wall) at a fixed distance. 2) Throw a table tennis ball with one hand and catch it with the other after it rebounds, alternating hands. 3) Count correct catches in 30 s. 4) Best of 2 trials.'
    ),
    equipment: EQ(['ترابيزة تنس طاولة', 'Table tennis table'], ['كور تنس طاولة', 'Table tennis balls'], WATCH),
    unit: 'reps',
    better: 'higher',
    norms: [],
    source: 'Faber IR, Oosterveld FGJ, Nijhuis-Van der Sanden MWG (2014) Does an eye-hand coordination test have added value as part of talent identification in table tennis? A validity and reproducibility study. PLoS One 9(1):e85657',
    notes: L(
      'جزء من بطارية اختبارات الإدراك الحركي الهولندية لانتقاء ناشئين تنس الطاولة. قارن بنفس الفئة العمرية لأن النتيجة بتتحسن بسرعة مع السن.',
      'Part of the Dutch perceptual-motor battery for table tennis talent identification. Compare within the same age group, as scores improve quickly with age.'
    )
  }
];

/* ================================== COMBAT SPORTS ================================== */
const COMBAT = [
  {
    id: 'ts_judo_sjft',
    name: L('اختبار اللياقة الخاص بالجودو (SJFT)', 'Special Judo Fitness Test (SJFT)'),
    category: 'anaerobic',
    sports: ['judo'],
    population: L('لاعبين جودو رجال (كبار)', 'Adult male judo athletes'),
    measures: L('القدرة اللاهوائية والهوائية الخاصة بالجودو', 'Judo-specific anaerobic and aerobic fitness'),
    protocol: L(
      '1) التوري في النص وكل أوكي على بعد 3 متر منه (المسافة بين الأوكيين 6 متر)، والأوكيين في نفس الوزن تقريبًا. 2) 3 فترات: 15 ثانية، 30 ثانية، 30 ثانية، وبينهم 10 ثواني راحة. 3) في كل فترة التوري يجري للأوكي ويرميه بـ إيبون سيوي ناجي ويجري للتاني، بأقصى عدد رميات. 4) قياس النبض فورًا بعد الاختبار وبعد دقيقة. 5) المؤشر = (نبض النهاية + نبض بعد دقيقة) ÷ مجموع الرميات.',
      '1) Tori stands in the middle with each uke 3 m away (6 m between ukes); ukes of similar mass. 2) Three bouts: 15 s, 30 s, 30 s with 10 s rest between. 3) In each bout tori runs to an uke and throws with ippon-seoi-nage, then runs to the other, for maximum throws. 4) Heart rate immediately after and 1 min after the test. 5) Index = (HR final + HR 1 min) / total throws.'
    ),
    equipment: EQ(['تاتامي', 'Tatami'], ['2 أوكي بوزن قريب من اللاعب', 'Two ukes of similar body mass'], WATCH, HRM),
    unit: 'score',
    better: 'lower',
    norms: [
      NORM('لاعبين جودو رجال — جدول تصنيف فرانكيني 2009', 'Male judo athletes - Franchini 2009 classification', 'm',
        loB([11.74, 13.04, 13.95, 14.85], ['excellent', 'good', 'average', 'poor', 'very_poor']))
    ],
    source: 'Sterkowicz S (1995) Special Judo Fitness Test; Franchini E, Del Vecchio FB, Sterkowicz S (2009) A special judo fitness test classificatory table. Arch Budo 5:127-129',
    notes: L(
      'المؤشر الأقل = لياقة أحسن. التصنيف الأصلي: ممتاز ≤ 11.73، جيد 11.74-13.03، متوسط 13.04-13.94، ضعيف 13.95-14.84، ضعيف جدًا ≥ 14.85. سجل كمان عدد الرميات الكلي ونبض بعد دقيقة لأن كل واحد بيوضح جانب مختلف.',
      'Lower index = better fitness. Original classes: excellent <= 11.73, good 11.74-13.03, average 13.04-13.94, poor 13.95-14.84, very poor >= 14.85. Also record total throws and 1-min HR, as each shows a different aspect.'
    )
  },
  {
    id: 'ts_judo_jgst_iso',
    name: L('اختبار قوة القبضة بالجي (ثابت)', 'Judogi grip strength test - isometric'),
    category: 'muscular_endurance',
    sports: ['judo', 'wrestling', 'mma'],
    measures: L('تحمل قبضة الجي والذراعين الثابت', 'Isometric gi-grip and arm endurance'),
    protocol: L(
      '1) جاكيت جودو ملفوف على بار عقلة. 2) اللاعب يمسك الجي بالإيدين ويطلع لحد ما الدقن فوق مستوى الإيدين (الكوع مثني). 3) يثبت أطول وقت ممكن. 4) الوقت بيقف لما الدقن ينزل تحت مستوى الإيدين.',
      '1) A judo jacket wrapped over a pull-up bar. 2) Athlete grips the gi with both hands and pulls up until the chin is above the hands (elbows flexed). 3) Hold as long as possible. 4) Time stops when the chin drops below the hands.'
    ),
    equipment: EQ(['بار عقلة', 'Pull-up bar'], ['جاكيت جودو', 'Judogi jacket'], WATCH),
    unit: 's',
    better: 'higher',
    norms: [],
    source: 'Franchini E, Miarka B, Matheus L, Del Vecchio FB (2011) Endurance in judogi grip strength tests: comparison between elite and non-elite judo players. Arch Budo 7(1):1-4',
    notes: L(
      'اللاعبين النخبة سجلوا أزمنة أعلى من غير النخبة في الدراسة الأصلية. مهم جدًا للمصارعين والجودو لأن القبضة بتتعب بدري في النزال.',
      'Elite players recorded longer times than non-elite players in the original study. Highly relevant to grapplers, as grip fatigues early in a bout.'
    )
  },
  {
    id: 'ts_judo_jgst_dyn',
    name: L('اختبار قوة القبضة بالجي (متحرك)', 'Judogi grip strength test - dynamic'),
    category: 'muscular_endurance',
    sports: ['judo', 'wrestling', 'mma'],
    measures: L('تحمل قبضة الجي والسحب الديناميكي', 'Dynamic gi-grip pulling endurance'),
    protocol: L(
      '1) نفس تجهيز الاختبار الثابت. 2) اللاعب يعمل عقلة كاملة ماسك الجي (من فرد كامل لحد الدقن فوق الإيدين). 3) أقصى عدد تكرارات صحيحة بدون راحة.',
      '1) Same set-up as the isometric test. 2) Athlete performs full pull-ups gripping the gi (from full extension until the chin is above the hands). 3) Maximum correct repetitions without rest.'
    ),
    equipment: EQ(['بار عقلة', 'Pull-up bar'], ['جاكيت جودو', 'Judogi jacket']),
    unit: 'reps',
    better: 'higher',
    norms: [],
    source: 'Franchini E et al. (2011) Arch Budo 7(1):1-4',
    notes: L(
      'اعمل الاختبار الثابت والمتحرك في أيام مختلفة أو براحة كاملة بينهم.',
      'Perform the isometric and dynamic versions on different days or with full rest between them.'
    )
  },
  {
    id: 'ts_tkd_fskt10',
    name: L('اختبار تردد سرعة الركل 10 ثواني (FSKT-10s)', 'Frequency Speed of Kick Test 10 s (FSKT-10s)'),
    category: 'speed',
    sports: ['taekwondo', 'kickboxing', 'karate'],
    measures: L('سرعة وتكرار الركل', 'Kicking speed and frequency'),
    protocol: L(
      '1) كيس ركل على ارتفاع الجذع. 2) اللاعب في وضع القتال على بعد مناسب. 3) أقصى عدد ركلات دائرية (بندل تشاجي) بالتبادل يمين وشمال في 10 ثواني. 4) تتحسب الركلات الصحيحة بس.',
      '1) Kick bag at trunk height. 2) Athlete in fighting stance at a suitable distance. 3) Maximum alternating right/left roundhouse kicks (bandal chagi) in 10 s. 4) Count only valid kicks.'
    ),
    equipment: EQ(['كيس ركل أو واقي صدر', 'Kick bag or chest protector'], WATCH),
    unit: 'reps',
    better: 'higher',
    norms: [],
    source: 'da Silva Santos JF, Franchini E et al. - Frequency Speed of Kick Test series (e.g. Santos JFS, Franchini E (2016) Is frequency speed of kick test responsive to training? A study with taekwondo athletes. Sport Sci Health 12:377-382)',
    notes: L(
      'صوّر الاختبار بالفيديو لعد الركلات بدقة. ممكن تستخدمه للكاراتيه والكيك بوكسينج بنفس الركلة الدائرية.',
      'Video the test to count kicks accurately. Also usable in karate and kickboxing with the roundhouse kick.'
    )
  },
  {
    id: 'ts_tkd_fskt_mult',
    name: L('اختبار تردد الركل المتعدد (FSKT-mult)', 'Multiple Frequency Speed of Kick Test (FSKT-mult)'),
    category: 'anaerobic',
    sports: ['taekwondo', 'kickboxing', 'karate'],
    measures: L('تحمل سرعة الركل ومؤشر هبوط الركل', 'Kicking speed endurance and kick decrement index'),
    protocol: L(
      '1) نفس تجهيز FSKT-10s. 2) 5 مجموعات × 10 ثواني أقصى ركلات بالتبادل، بينهم 10 ثواني راحة. 3) سجل عدد الركلات في كل مجموعة. 4) مؤشر الهبوط KDI% = (1 − (مجموع الركلات ÷ (أفضل مجموعة × 5))) × 100.',
      '1) Same set-up as FSKT-10s. 2) 5 sets x 10 s of maximal alternating kicks with 10 s rest. 3) Record kicks per set. 4) Kick decrement index KDI% = (1 - (total kicks / (best set x 5))) x 100.'
    ),
    equipment: EQ(['كيس ركل أو واقي صدر', 'Kick bag or chest protector'], WATCH),
    unit: 'reps',
    better: 'higher',
    norms: [],
    source: 'da Silva Santos JF, Franchini E et al. - Frequency Speed of Kick Test series (Santos JFS et al., J Strength Cond Res; Sport Sci Health)',
    notes: L(
      'النتيجة المسجلة = مجموع الركلات في الخمس مجموعات. KDI أقل = قدرة أحسن على الحفاظ على سرعة الركل.',
      'Recorded result = total kicks across the five sets. A lower KDI means better maintenance of kicking speed.'
    )
  },
  {
    id: 'ts_karate_ksat',
    name: L('اختبار الكاراتيه الهوائي الخاص (KSAT)', 'Karate-Specific Aerobic Test (KSAT)'),
    category: 'aerobic',
    sports: ['karate'],
    measures: L('التحمل الخاص بالكاراتيه (كوميتيه)', 'Karate-specific (kumite) endurance'),
    protocol: L(
      '1) كيس ملاكمة بارتفاع مناسب. 2) مجموعات متدرجة من تقنيات الكاراتيه (كيزامي زوكي، جياكو زوكي، ماواشي جيري) على إيقاع صوتي. 3) مدة المجهود بتزيد تدريجيًا مع فترات راحة قصيرة. 4) الاختبار بينتهي لما اللاعب ما يقدرش يكمل الإيقاع. 5) سجل الزمن الكلي حتى الإرهاق.',
      '1) Punch bag at a suitable height. 2) Progressive sets of karate techniques (kizami-zuki, gyaku-zuki, mawashi-geri) to an audio signal. 3) Work duration increases progressively with short rests. 4) Test ends when the athlete cannot keep the pace. 5) Record total time to exhaustion.'
    ),
    equipment: EQ(['كيس ملاكمة', 'Punch bag'], AUDIO, HRM),
    unit: 's',
    better: 'higher',
    norms: [],
    source: 'Chaabene H, Hachana Y, Franchini E, et al. (2012) Reliability and construct validity of the karate-specific aerobic test. J Strength Cond Res 26(12):3454-3460',
    notes: L(
      'اللاعبين الدوليين سجلوا أزمنة أطول بوضوح من اللاعبين المحليين في الدراسة الأصلية. سجل أقصى نبض ولاكتات بعد الاختبار لو متاح.',
      'International-level karateka lasted clearly longer than national-level athletes in the original study. Record peak heart rate and post-test lactate if available.'
    )
  },
  {
    id: 'ts_box_punch_output',
    name: L('اختبار عدد اللكمات في راوند (3 دقايق)', 'Punch output test (3-minute round)'),
    category: 'anaerobic',
    sports: ['boxing', 'kickboxing', 'mma'],
    measures: L('معدل اللكمات والتحمل الخاص بالملاكمة', 'Punch output and boxing-specific endurance'),
    protocol: L(
      '1) كيس ملاكمة (يفضل بحساسات أو عداد لكمات). 2) راوند 3 دقايق بأقصى معدل لكمات مع تقنية صحيحة (جاب-كروس-هوك). 3) سجل عدد اللكمات الكلي وكل دقيقة لوحدها. 4) ممكن تكرره 3 راوندات بدقيقة راحة لمحاكاة النزال.',
      '1) Punch bag (ideally with sensors or a punch counter). 2) 3-min round at maximal output with correct technique (jab-cross-hook). 3) Record total punches and punches per minute. 4) Optionally repeat 3 rounds with 1 min rest to simulate a bout.'
    ),
    equipment: EQ(['كيس ملاكمة', 'Punch bag'], ['جوانتي', 'Gloves'], ['عداد لكمات أو فيديو', 'Punch counter or video'], WATCH),
    unit: 'reps',
    better: 'higher',
    norms: [],
    source: 'Smith MS (2006) Physiological profile of senior and junior England international amateur boxers. J Sports Sci Med 5(CSSI):74-89; Chaabene H et al. (2015) Amateur boxing: physical and physiological attributes. Sports Med 45(3):337-352',
    notes: L(
      'انخفاض عدد اللكمات من الدقيقة الأولى للتالتة مؤشر للتعب. لو فيه حساسات قوة، سجل القوة كمان لأن العدد لوحده ممكن يشجع على لكمات خفيفة.',
      'A drop in punches from minute one to minute three indicates fatigue. If force sensors are available, record force too, as counts alone can encourage light punches.'
    )
  },
  {
    id: 'ts_box_bag_frequency',
    name: L('اختبار تردد اللكمات 10 ثواني', '10-second punch frequency test'),
    category: 'speed',
    sports: ['boxing', 'kickboxing', 'mma'],
    measures: L('سرعة وتردد اللكمات', 'Punching speed and frequency'),
    protocol: L(
      '1) وضع القتال قدام الكيس. 2) أقصى عدد لكمات مستقيمة (جاب-كروس بالتبادل) في 10 ثواني مع لمس الكيس بقوة معقولة. 3) أفضل محاولتين براحة دقيقتين.',
      '1) Fighting stance in front of the bag. 2) Maximum straight punches (alternating jab-cross) in 10 s with meaningful contact. 3) Best of two trials with 2 min rest.'
    ),
    equipment: EQ(['كيس ملاكمة', 'Punch bag'], ['جوانتي', 'Gloves'], ['فيديو للعد', 'Video for counting']),
    unit: 'reps',
    better: 'higher',
    norms: [],
    source: 'Chaabene H et al. (2015) Sports Med 45(3):337-352 (review of boxing-specific tests)',
    notes: L(
      'ثبّت نوع الجوانتي ووزنه والمسافة من الكيس. مفيد لمتابعة تأثير تدريبات السرعة العصبية.',
      'Keep glove type/mass and distance from the bag constant. Useful for tracking neural speed training.'
    )
  },
  {
    id: 'ts_wrestling_dummy_throw',
    name: L('اختبار رمي الدمية (مصارعة)', 'Wrestling dummy-throw test'),
    category: 'anaerobic',
    sports: ['wrestling'],
    measures: L('القدرة اللاهوائية الخاصة بالمصارعة', 'Wrestling-specific anaerobic power and capacity'),
    protocol: L(
      '1) دمية مصارعة بوزن ثابت مناسب لفئة الوزن. 2) أقصى عدد رميات صحيحة (مثلاً رمية الوسط أو السوبليكس) في 30 ثانية. 3) نسخة التحمل: 3 × 30 ثانية براحة 30 ثانية. 4) نبض بعد الاختبار وبعد دقيقة.',
      '1) Wrestling dummy of a fixed mass suited to the weight class. 2) Maximum correct throws (e.g. hip throw or suplex) in 30 s. 3) Endurance version: 3 x 30 s with 30 s rest. 4) Heart rate after and 1 min after.'
    ),
    equipment: EQ(['دمية مصارعة', 'Wrestling dummy'], ['مرتبة مصارعة', 'Wrestling mat'], WATCH, HRM),
    unit: 'reps',
    better: 'higher',
    norms: [],
    source: 'Chaabene H et al. (2017) Physical and physiological attributes of wrestlers: an update. J Strength Cond Res 31(5):1411-1442',
    notes: L(
      'مفيش بروتوكول دولي موحد؛ ثبّت وزن الدمية ونوع الرمية وقارن اللاعب بنفسه. ممكن تحسب مؤشر زي SJFT (نبض ÷ رميات).',
      'There is no single international protocol; fix dummy mass and throw type and compare athletes with themselves. An SJFT-like index (HR / throws) can be calculated.'
    )
  },
  {
    id: 'ts_grappling_grip',
    name: L('قوة القبضة للمصارعين قبل وبعد النزال', 'Grip strength for grapplers (pre/post bout)'),
    category: 'strength',
    sports: ['judo', 'wrestling', 'mma'],
    measures: L('أقصى قوة قبضة والحفاظ عليها بعد المجهود', 'Maximal grip strength and its maintenance after fighting'),
    protocol: L(
      '1) دينامومتر يد مضبوط على مقاس الإيد. 2) واقف، الدراع جنب الجسم والكوع مفرود. 3) 3 محاولات لكل إيد براحة دقيقة وسجل الأفضل. 4) كرر القياس فورًا بعد راندوري أو نزال تجريبي واحسب نسبة الهبوط.',
      '1) Hand dynamometer adjusted to hand size. 2) Standing, arm by the side, elbow extended. 3) Three trials per hand with 1 min rest; record the best. 4) Repeat immediately after randori or a simulated bout and calculate the percentage drop.'
    ),
    equipment: EQ(['دينامومتر قبضة', 'Handgrip dynamometer']),
    unit: 'kg',
    better: 'higher',
    norms: [],
    source: 'Franchini E et al. (2011) Physiological profiles of elite judo athletes. Sports Med 41(2):147-166',
    notes: L(
      'في الجودو الفرق بين النخبة وغيرهم بيبان أكتر في الحفاظ على القبضة بعد المجهود من القوة القصوى نفسها. قارن بمعايير القبضة العامة حسب السن والجنس في اختبارات اللياقة العامة.',
      'In judo, elite vs non-elite differences appear more in grip maintenance after effort than in maximal strength itself. Compare with general age/sex grip norms in the general fitness tests.'
    )
  },
  {
    id: 'ts_mma_round_sim',
    name: L('محاكاة راوند MMA (3 × 5 دقايق)', 'MMA simulated rounds (3 x 5 min)'),
    category: 'anaerobic',
    sports: ['mma'],
    measures: L('القدرة على الحفاظ على الأداء عبر الراوندات', 'Ability to sustain output across rounds'),
    protocol: L(
      '1) 3 راوندات × 5 دقايق بدقيقة راحة. 2) كل راوند بيجمع: لكمات وركلات على الكيس، محاولات إسقاط على دمية أو زميل، ثم ضرب من فوق (ground and pound) على الدمية بتوقيتات ثابتة. 3) سجل عدد الضربات الكلي، النبض، والمجهود المُدرك (RPE)، ولاكتات بعد كل راوند لو متاح.',
      '1) 3 rounds x 5 min with 1 min rest. 2) Each round combines bag strikes, takedown attempts on a dummy or partner, then ground-and-pound on a dummy, in fixed time blocks. 3) Record total strikes, heart rate, RPE, and lactate after each round if available.'
    ),
    equipment: EQ(['كيس ملاكمة', 'Punch bag'], ['دمية جرابلينج', 'Grappling dummy'], HRM, WATCH),
    unit: 'reps',
    better: 'higher',
    norms: [],
    source: 'Kirk C, Hurst HT, Atkins S (2015) Measuring the workload of mixed martial arts using accelerometry, time motion analysis and lactate. Int J Perform Anal Sport 15(1):359-370; James LP et al. (2016) Towards a determinant model of mixed martial arts performance. Sports Med 46(10):1525-1551',
    notes: L(
      'اختبار متابعة وليس معيار دولي: ثبّت ترتيب وتوقيت المحطات بالظبط كل مرة. الهبوط في عدد الضربات من الراوند الأول للتالت أهم من الرقم نفسه.',
      'A monitoring test rather than an international standard: keep the station order and timing identical each time. The drop in strikes from round one to three matters more than the absolute number.'
    )
  }
];

/* ============================== CROSSFIT BENCHMARKS & HYROX ============================== */
const CF_SOURCE = 'CrossFit benchmark workouts (CrossFit Journal, "The Girls" and Hero WODs); tiers are approximate community distributions (WODwell, Beyond the Whiteboard)';
const CF = (id, ar, en, wodAr, wodEn, unit, better, category, tiersAr, tiersEn, extraEq) => ({
  id,
  name: L(ar, en),
  category,
  sports: ['crossfit'],
  measures: L('اللياقة العامة عالية الشدة في تمرين مرجعي ثابت', 'High-intensity general fitness on a fixed benchmark workout'),
  protocol: L(
    '1) إحماء 10-15 دقيقة مع مجموعات خفيفة من نفس الحركات. 2) ' + wodAr + ' 3) سجل النتيجة وهل كانت Rx (الأوزان والمعايير الرسمية) ولا متعدلة (Scaled). 4) كرر كل 8-12 أسبوع بنفس المعايير.',
    '1) Warm up 10-15 min with light sets of the same movements. 2) ' + wodEn + ' 3) Record the score and whether it was Rx (official loads and standards) or scaled. 4) Retest every 8-12 weeks under the same standards.'
  ),
  equipment: EQ(...extraEq, WATCH),
  unit,
  better,
  norms: [],
  source: CF_SOURCE,
  notes: L(
    'مستويات تقريبية منشورة في مواقع البنشمارك (Rx): ' + tiersAr + ' دي مش جداول علمية رسمية؛ الأهم مقارنة اللاعب بنفسه وبنفس المعايير.',
    'Approximate tiers published by benchmark databases (Rx): ' + tiersEn + ' These are not formal scientific norms; the key comparison is the athlete against themselves under the same standards.'
  )
});

const CROSSFIT = [
  CF('ts_cf_fran', 'فران (Fran)', 'Fran',
    '21-15-9 تكرار: ثراستر 43/29 كجم (95/65 رطل) + عقلة، في أسرع وقت.',
    '21-15-9 reps of thrusters 43/29 kg (95/65 lb) and pull-ups, for time.',
    's', 'lower', 'anaerobic',
    'نخبة أقل من 3 دقايق، متقدم حوالي 3-5 دقايق، متوسط حوالي 5-8 دقايق، مبتدئ أكتر من 8 دقايق.',
    'elite under 3 min, advanced about 3-5 min, intermediate about 5-8 min, beginner over 8 min.',
    [['بار وأوزان', 'Barbell and plates'], ['بار عقلة', 'Pull-up bar']]),
  CF('ts_cf_grace', 'جريس (Grace)', 'Grace',
    '30 كلين آند جيرك بوزن 61/43 كجم (135/95 رطل) في أسرع وقت.',
    '30 clean and jerks at 61/43 kg (135/95 lb), for time.',
    's', 'lower', 'anaerobic',
    'نخبة أقل من دقيقتين، متقدم حوالي 2-3 دقايق، متوسط حوالي 3-5 دقايق، مبتدئ أكتر من 6 دقايق.',
    'elite under 2 min, advanced about 2-3 min, intermediate about 3-5 min, beginner over 6 min.',
    [['بار وأوزان', 'Barbell and plates']]),
  CF('ts_cf_helen', 'هيلين (Helen)', 'Helen',
    '3 جولات: جري 400 متر + 21 كيتل بل سوينج 24/16 كجم + 12 عقلة، في أسرع وقت.',
    '3 rounds of 400 m run, 21 kettlebell swings 24/16 kg and 12 pull-ups, for time.',
    's', 'lower', 'aerobic',
    'نخبة أقل من 8 دقايق، متقدم حوالي 8-10 دقايق، متوسط حوالي 10-13 دقيقة، مبتدئ أكتر من 14 دقيقة.',
    'elite under 8 min, advanced about 8-10 min, intermediate about 10-13 min, beginner over 14 min.',
    [['كيتل بل', 'Kettlebell'], ['بار عقلة', 'Pull-up bar']]),
  CF('ts_cf_cindy', 'سيندي (Cindy)', 'Cindy',
    'أكبر عدد جولات في 20 دقيقة (AMRAP): 5 عقلة + 10 ضغط + 15 سكوات بوزن الجسم.',
    'As many rounds as possible in 20 min of 5 pull-ups, 10 push-ups and 15 air squats.',
    'reps', 'higher', 'muscular_endurance',
    'نخبة 25 جولة أو أكتر، متقدم حوالي 20-24، متوسط حوالي 13-19، مبتدئ أقل من 12 (النتيجة = عدد الجولات).',
    'elite 25+ rounds, advanced about 20-24, intermediate about 13-19, beginner under 12 (score = rounds).',
    [['بار عقلة', 'Pull-up bar']]),
  CF('ts_cf_murph', 'مِرف (Murph)', 'Murph',
    'جري 1 ميل (1.6 كم) + 100 عقلة + 200 ضغط + 300 سكوات + جري 1 ميل، بسترة وزن 9/6 كجم (20/14 رطل)؛ التمارين في النص ممكن تتقسم.',
    '1 mile (1.6 km) run, 100 pull-ups, 200 push-ups, 300 air squats, 1 mile run, wearing a 9/6 kg (20/14 lb) vest; the middle section may be partitioned.',
    'min', 'lower', 'aerobic',
    'نخبة أقل من 40 دقيقة بالسترة، متقدم حوالي 40-50، متوسط حوالي 50-65، مبتدئ أكتر من 65 دقيقة.',
    'elite under 40 min with vest, advanced about 40-50, intermediate about 50-65, beginner over 65 min.',
    [['سترة أوزان', 'Weight vest'], ['بار عقلة', 'Pull-up bar']]),
  CF('ts_cf_diane', 'ديان (Diane)', 'Diane',
    '21-15-9 تكرار: ديدلفت 102/70 كجم (225/155 رطل) + ضغط بالوقوف على اليدين (HSPU)، في أسرع وقت.',
    '21-15-9 reps of deadlifts 102/70 kg (225/155 lb) and handstand push-ups, for time.',
    's', 'lower', 'strength',
    'نخبة أقل من 3 دقايق، متقدم حوالي 3-5 دقايق، متوسط حوالي 5-8 دقايق، مبتدئ أكتر من 10 دقايق.',
    'elite under 3 min, advanced about 3-5 min, intermediate about 5-8 min, beginner over 10 min.',
    [['بار وأوزان', 'Barbell and plates'], ['حيطة ومرتبة للرأس', 'Wall and head mat']]),
  CF('ts_cf_isabel', 'إيزابيل (Isabel)', 'Isabel',
    '30 سناتش بوزن 61/43 كجم (135/95 رطل) في أسرع وقت.',
    '30 snatches at 61/43 kg (135/95 lb), for time.',
    's', 'lower', 'power',
    'نخبة أقل من دقيقتين، متقدم حوالي 2-3 دقايق، متوسط حوالي 3-5 دقايق، مبتدئ أكتر من 6 دقايق.',
    'elite under 2 min, advanced about 2-3 min, intermediate about 3-5 min, beginner over 6 min.',
    [['بار وأوزان', 'Barbell and plates']]),
  CF('ts_cf_annie', 'آني (Annie)', 'Annie',
    '50-40-30-20-10 تكرار: نط حبل دبل أندر + سيت أب (AbMat)، في أسرع وقت.',
    '50-40-30-20-10 reps of double-unders and AbMat sit-ups, for time.',
    's', 'lower', 'muscular_endurance',
    'نخبة أقل من 7 دقايق، متقدم حوالي 7-9 دقايق، متوسط حوالي 9-12 دقيقة، مبتدئ أكتر من 13 دقيقة.',
    'elite under 7 min, advanced about 7-9 min, intermediate about 9-12 min, beginner over 13 min.',
    [['حبل نط سريع', 'Speed rope'], ['مخدة بطن AbMat', 'AbMat']]),
  CF('ts_cf_karen', 'كارين (Karen)', 'Karen',
    '150 رمية كرة حائط (Wall ball) بكرة 9/6 كجم (20/14 رطل) لهدف 3/2.7 متر (10/9 قدم)، في أسرع وقت.',
    '150 wall-ball shots with a 9/6 kg (20/14 lb) ball to a 3/2.7 m (10/9 ft) target, for time.',
    's', 'lower', 'muscular_endurance',
    'نخبة أقل من 6 دقايق، متقدم حوالي 6-8 دقايق، متوسط حوالي 8-11 دقيقة، مبتدئ أكتر من 12 دقيقة.',
    'elite under 6 min, advanced about 6-8 min, intermediate about 8-11 min, beginner over 12 min.',
    [['كرة حائط', 'Wall ball'], ['هدف على الحيطة', 'Wall target']])
];

const HYROX_SRC = 'HYROX official Rulebook (current season) - race format, divisions and station standards';
const HYROX = [
  {
    id: 'ts_hyrox_race',
    name: L('زمن سباق هايروكس الكامل', 'HYROX full race time'),
    category: 'aerobic',
    sports: ['hyrox'],
    measures: L('اللياقة الهجينة (تحمل + قوة تحمل)', 'Hybrid fitness (endurance + strength endurance)'),
    protocol: L(
      '1) 8 مرات: جري 1 كم ثم محطة. 2) المحطات بالترتيب: سكي إرج 1000 متر، دفع زلاجة 50 متر، سحب زلاجة 50 متر، بيربي برود جمب 80 متر، تجديف 1000 متر، فارمرز كاري 200 متر، لانجز بشنطة رمل 100 متر، 100 رمية كرة حائط. 3) سجل الزمن الكلي وتقسيم الجري والمحطات والـ Roxzone.',
      '1) 8 times: 1 km run then a station. 2) Stations in order: SkiErg 1000 m, sled push 50 m, sled pull 50 m, burpee broad jumps 80 m, row 1000 m, farmers carry 200 m, sandbag lunges 100 m, 100 wall balls. 3) Record total time plus run, station and Roxzone splits.'
    ),
    equipment: EQ(['تجهيزات سباق هايروكس الرسمية أو محاكاة كاملة', 'Official HYROX race set-up or full simulation'], WATCH),
    unit: 'min',
    better: 'lower',
    norms: [],
    source: HYROX_SRC,
    notes: L(
      'أوزان فئة Open: دفع الزلاجة 152 كجم رجال / 102 كجم سيدات (شامل الزلاجة)، سحب 103/78 كجم، فارمرز 2×24 / 2×16 كجم، شنطة رمل 20/10 كجم، كرة حائط 6 كجم لـ 3 متر / 4 كجم لـ 2.7 متر؛ فئة Pro أتقل. أسرع الرجال المحترفين حوالي 53-58 دقيقة والسيدات حوالي 56-62 دقيقة، وأغلب المشاركين في Open بيخلصوا بين ساعة وربع وساعتين. راجع الـ Rulebook الحالي لأن الأوزان ممكن تتغير.',
      'Open division loads: sled push 152 kg men / 102 kg women (including sled), sled pull 103/78 kg, farmers carry 2 x 24 / 2 x 16 kg, sandbag 20/10 kg, wall ball 6 kg to 3 m / 4 kg to 2.7 m; Pro is heavier. The fastest elite men finish in about 53-58 min and elite women about 56-62 min; most Open athletes finish between about 1 h 15 and 2 h. Check the current Rulebook, as loads can change.'
    )
  },
  {
    id: 'ts_hyrox_skierg_1000',
    name: L('محطة سكي إرج 1000 متر (هايروكس)', 'HYROX station test: SkiErg 1000 m'),
    category: 'aerobic',
    sports: ['hyrox', 'crossfit'],
    measures: L('تحمل الجزء العلوي والجذع', 'Upper-body and trunk endurance'),
    protocol: L(
      '1) إحماء. 2) 1000 متر على SkiErg بأقصى جهد (في اختبار منفصل أو بعد جري 1 كم لمحاكاة السباق؛ حدد وثبّت). 3) سجل الزمن ومتوسط الـ split.',
      '1) Warm up. 2) 1000 m on the SkiErg at maximal effort (fresh, or after a 1 km run to simulate racing; choose and keep fixed). 3) Record time and average split.'
    ),
    equipment: EQ(['جهاز سكي إرج Concept2', 'Concept2 SkiErg']),
    unit: 's',
    better: 'lower',
    norms: [],
    source: HYROX_SRC + '; Concept2 SkiErg',
    notes: L(
      'قارن زمن المحطة في الاختبار بزمنها في السباق؛ الفرق الكبير معناه إن التعب من الجري بيأثر، ومحتاج تدريب "compromised running".',
      'Compare the test time with the race split; a large gap shows run-induced fatigue and a need for compromised-running training.'
    )
  },
  {
    id: 'ts_hyrox_row_1000',
    name: L('محطة تجديف 1000 متر (هايروكس)', 'HYROX station test: Row 1000 m'),
    category: 'aerobic',
    sports: ['hyrox', 'crossfit', 'rowing'],
    measures: L('تحمل الجسم كله على جهاز التجديف', 'Whole-body rowing endurance'),
    protocol: L(
      '1) إحماء. 2) 1000 متر تجديف بأقصى جهد (منفصل أو بعد جري 1 كم؛ ثبّت الطريقة). 3) سجل الزمن والـ split ومعدل الضربات.',
      '1) Warm up. 2) Row 1000 m at maximal effort (fresh or after a 1 km run; keep the method fixed). 3) Record time, split and stroke rate.'
    ),
    equipment: EQ(ERG),
    unit: 's',
    better: 'lower',
    norms: [],
    source: HYROX_SRC + '; Concept2 Indoor Rower',
    notes: L(
      'في السباق الهدف تقسيم جهد يسمح بجري قوي بعد المحطة، فسجل كمان زمن الكيلو اللي بعدها.',
      'In a race the aim is pacing that still allows a strong run afterwards, so also record the following 1 km split.'
    )
  },
  {
    id: 'ts_hyrox_sled_push',
    name: L('محطة دفع الزلاجة 50 متر (هايروكس)', 'HYROX station test: sled push 50 m'),
    category: 'strength',
    sports: ['hyrox', 'crossfit', 'rugby'],
    measures: L('قوة وتحمل الرجلين في الدفع', 'Leg drive strength-endurance'),
    protocol: L(
      '1) زلاجة بالوزن الرسمي لفئتك على نفس نوع الأرضية لو ممكن. 2) 4 × 12.5 متر (50 متر) دفع بأسرع وقت. 3) سجل الزمن.',
      '1) Sled at the official load for your division, on similar flooring if possible. 2) Push 4 x 12.5 m (50 m) as fast as possible. 3) Record time.'
    ),
    equipment: EQ(['زلاجة دفع وأوزان', 'Push sled and plates']),
    unit: 's',
    better: 'lower',
    norms: [],
    source: HYROX_SRC,
    notes: L(
      'الاحتكاك بيختلف جدًا حسب الأرضية، فما تقارنش إلا على نفس السطح ونفس الزلاجة.',
      'Friction varies greatly with the surface, so only compare on the same floor with the same sled.'
    )
  },
  {
    id: 'ts_hyrox_wallballs_100',
    name: L('محطة 100 رمية كرة حائط (هايروكس)', 'HYROX station test: 100 wall balls'),
    category: 'muscular_endurance',
    sports: ['hyrox', 'crossfit'],
    measures: L('تحمل الرجلين والكتفين تحت التعب', 'Leg and shoulder endurance under fatigue'),
    protocol: L(
      '1) كرة وارتفاع هدف حسب فئتك (Open: 6 كجم لـ 3 متر رجال، 4 كجم لـ 2.7 متر سيدات). 2) 100 تكرار صحيح (سكوات تحت مستوى الركبة ولمس الهدف). 3) سجل الزمن وعدد مرات الراحة.',
      '1) Ball and target per division (Open: 6 kg to 3 m men, 4 kg to 2.7 m women). 2) 100 valid reps (squat below parallel, hit the target). 3) Record time and number of breaks.'
    ),
    equipment: EQ(['كرة حائط', 'Wall ball'], ['هدف على الحيطة', 'Wall target']),
    unit: 's',
    better: 'lower',
    norms: [],
    source: HYROX_SRC,
    notes: L(
      'آخر محطة في السباق، فالأدق تختبرها بعد مجهود سابق (مثلاً بعد جري 1 كم ولانجز). خطة تقسيم ثابتة (مثلاً 20-15-15...) بتقلل الوقت الضايع.',
      'It is the final station, so testing after prior work (e.g. after a 1 km run and lunges) is more realistic. A fixed set-break plan (e.g. 20-15-15...) reduces wasted time.'
    )
  }
];

/* ============================ GYMNASTICS, CLIMBING, PRECISION, WINTER, DANCE ============================ */
const TOPS_SRC = 'USA Gymnastics Talent Opportunity Program (TOPs) physical abilities testing manual (current edition)';
const OTHER = [
  {
    id: 'ts_gym_tops_battery',
    name: L('بطارية القدرات البدنية للجمباز (TOPs)', 'Gymnastics physical abilities battery (USA Gymnastics TOPs)'),
    category: 'battery',
    sports: ['gymnastics'],
    population: L('ناشئات جمباز فني 7-10 سنين', 'Young artistic gymnasts aged 7-10'),
    measures: L('القوة النسبية، القدرة، المرونة، والتحكم في الجسم للجمباز', 'Relative strength, power, flexibility and body control for gymnastics'),
    protocol: L(
      '1) اختبارات قوة: تسلق الحبل، الوقوف على اليدين بالضغط (press handstand)، رفع الرجلين من التعلق، الـ cast handstand على البار، وثبات الوقوف على اليدين. 2) اختبار سرعة/قدرة (عدو). 3) اختبارات مرونة (الشقلبة/الاسبليت ومرونة الكتف). 4) كل بند بيتسجل بالنقاط حسب جدول الدليل الرسمي للسنة.',
      '1) Strength items: rope climb, press handstands, hanging leg lifts, cast handstands on bar, handstand hold. 2) Speed/power item (sprint). 3) Flexibility items (splits and shoulder flexibility). 4) Each item is scored with the official manual tables for that year.'
    ),
    equipment: EQ(['حبل تسلق', 'Climbing rope'], ['بار (عارضة)', 'Bar'], ['مراتب', 'Mats'], WATCH, TAPE),
    unit: 'points',
    better: 'higher',
    norms: [],
    source: TOPS_SRC + '; FIG Age Group Development Programme',
    notes: L(
      'البنود وطريقة التقييم بتتحدث كل كام سنة، فاستخدم دليل السنة الحالية للنقاط. البطارية بتستخدم لاختيار الناشئات للمعسكرات القومية في أمريكا ومنها اتاخدت أفكار كتير لبرامج انتقاء في دول تانية.',
      'Items and scoring are updated periodically, so use the current manual for points. The battery selects young gymnasts for US national camps and has inspired talent programmes elsewhere.'
    )
  },
  {
    id: 'ts_gym_rope_climb',
    name: L('تسلق الحبل بالإيدين (جمباز)', 'Rope climb, arms only (gymnastics)'),
    category: 'strength',
    sports: ['gymnastics', 'calisthenics', 'crossfit'],
    measures: L('القوة النسبية للجزء العلوي', 'Relative upper-body pulling strength'),
    protocol: L(
      '1) البداية قاعد أو واقف والرجلين في وضع L (أو straddle) حسب البروتوكول. 2) تسلق بالإيدين فقط لعلامة ثابتة (مثلاً 4 أو 5 متر حسب الفئة). 3) الزمن من البداية للمس العلامة.',
      '1) Start seated or standing with legs in L (or straddle) per the protocol. 2) Climb with arms only to a fixed mark (e.g. 4 or 5 m by age group). 3) Time from start until the mark is touched.'
    ),
    equipment: EQ(['حبل تسلق', 'Climbing rope'], ['مرتبة تحت الحبل', 'Mat under the rope'], WATCH),
    unit: 's',
    better: 'lower',
    norms: [],
    source: TOPS_SRC,
    notes: L(
      'لازم مرتبة أمان ومدرب واقف. ثبّت ارتفاع العلامة ووضع الرجلين علشان المقارنة.',
      'A safety mat and spotter are required. Keep mark height and leg position fixed for comparisons.'
    )
  },
  {
    id: 'ts_gym_press_handstand',
    name: L('الضغط للوقوف على اليدين (Press Handstand)', 'Press handstands (gymnastics)'),
    category: 'strength',
    sports: ['gymnastics', 'calisthenics'],
    measures: L('قوة الكتف والجذع والتحكم والمرونة الإيجابية', 'Shoulder and core strength, control and active flexibility'),
    protocol: L(
      '1) البداية واقف أو في وضع straddle والإيدين على الأرض. 2) طلوع بالضغط (بدون قفز) لوضع الوقوف على اليدين والنزول بتحكم. 3) عدد التكرارات الصحيحة في الوقت أو العدد المحدد بالدليل.',
      '1) Start standing or in straddle with hands on the floor. 2) Press (no jump) up to handstand and lower under control. 3) Count correct repetitions within the time or count set by the manual.'
    ),
    equipment: EQ(['مرتبة', 'Mat'], WATCH),
    unit: 'reps',
    better: 'higher',
    norms: [],
    source: TOPS_SRC,
    notes: L(
      'التكرار بيتحسب بس لو الجسم وصل للوقوف المستقيم بدون قفزة. سجل جودة الأداء كمان.',
      'A repetition only counts if a straight handstand is reached without a jump. Also note execution quality.'
    )
  },
  {
    id: 'ts_gym_leg_lifts',
    name: L('رفع الرجلين من التعلق (جمباز)', 'Hanging leg lifts (gymnastics)'),
    category: 'muscular_endurance',
    sports: ['gymnastics', 'calisthenics'],
    measures: L('قوة وتحمل عضلات البطن ومثنيات الفخذ', 'Abdominal and hip-flexor strength-endurance'),
    protocol: L(
      '1) تعلق على العقلة أو السلم الحائط. 2) رفع الرجلين مفرودة لحد ما القدمين تلمس البار أو الإيدين. 3) أقصى عدد صحيح في الوقت المحدد بالدليل.',
      '1) Hang from a bar or stall bars. 2) Lift straight legs until the feet touch the bar or hands. 3) Maximum correct reps in the time set by the manual.'
    ),
    equipment: EQ(['عقلة أو سلم حائط', 'Bar or stall bars'], WATCH),
    unit: 'reps',
    better: 'higher',
    norms: [],
    source: TOPS_SRC,
    notes: L(
      'التكرارات بالمرجحة أو الركب مثنية ما تتحسبش.',
      'Repetitions with swinging or bent knees are not counted.'
    )
  },
  {
    id: 'ts_gym_handstand_hold',
    name: L('ثبات الوقوف على اليدين', 'Handstand hold'),
    category: 'balance',
    sports: ['gymnastics', 'calisthenics', 'cheerleading'],
    measures: L('التوازن والتحكم في الوقوف على اليدين', 'Handstand balance and control'),
    protocol: L(
      '1) طلوع للوقوف على اليدين على الأرض (بدون حيطة). 2) الثبات بجسم مستقيم أطول وقت (بحد أقصى حسب الدليل، مثلًا 60 ثانية). 3) الوقت بيقف لما الإيدين تتحرك أو الرجلين تنزل.',
      '1) Kick up to a freestanding handstand on the floor. 2) Hold with a straight body as long as possible (up to the manual limit, e.g. 60 s). 3) Time stops when the hands move or the feet come down.'
    ),
    equipment: EQ(['مرتبة', 'Mat'], WATCH),
    unit: 's',
    better: 'higher',
    norms: [],
    source: TOPS_SRC,
    notes: L(
      'حدد إذا كان مسموح بتعديل اليدين أو لا وثبّت القاعدة.',
      'Decide whether hand adjustments are allowed and keep the rule fixed.'
    )
  },
  {
    id: 'ts_climb_max_hang',
    name: L('أقصى تعلق بالأصابع (% من وزن الجسم)', 'Finger-strength max hang (% body mass)'),
    category: 'strength',
    sports: ['climbing'],
    population: L('متسلقين عندهم سنتين تدريب على الأقل', 'Climbers with at least two years of training'),
    measures: L('القوة القصوى لقبضة الأصابع على حافة 20 مم', 'Maximal finger strength on a 20 mm edge'),
    protocol: L(
      '1) إحماء تدريجي على الـ hangboard. 2) حافة 20 مم، قبضة half-crimp، الدراعين مفرودين. 3) تعلق 10 ثواني بوزن إضافي (حزام أو أوزان) أو تخفيف بالبكرة، وزوّد لحد أقصى وزن تقدر تكمل بيه 10 ثواني. 4) راحة 3 دقايق بين المحاولات. 5) النتيجة % = (وزن الجسم + الإضافي) ÷ وزن الجسم × 100.',
      '1) Progressive warm-up on the hangboard. 2) 20 mm edge, half-crimp grip, arms straight. 3) Hang 10 s with added load (belt or weights) or pulley assistance, increasing to the heaviest load held for the full 10 s. 4) 3 min rest between attempts. 5) Result % = (body mass + added load) / body mass x 100.'
    ),
    equipment: EQ(['هانج بورد بحافة 20 مم', 'Hangboard with 20 mm edge'], ['حزام أوزان وأوزان', 'Weight belt and plates'], ['ميزان', 'Scale'], WATCH),
    unit: '%',
    better: 'higher',
    norms: [],
    source: 'Lopez-Rivera E, Gonzalez-Badillo JJ (2012) The effects of two maximum grip strength training methods using the same effort duration and different edge depth on grip endurance in elite climbers. Sports Technol 5(3-4):100-110; Balas J et al. (2012) Hand-arm strength and endurance as predictors of climbing performance. Eur J Sport Sci 12(1):16-25',
    notes: L(
      'قوة الأصابع النسبية من أقوى العوامل المرتبطة بمستوى التسلق. المتسلقين المتقدمين غالبًا بيتعدوا 150% من وزن الجسم على 20 مم لمدة 10 ثواني. ما يتعملش للناشئين تحت 16 سنة بأوزان إضافية لحماية صفائح النمو في الأصابع.',
      'Relative finger strength is among the strongest correlates of climbing grade. Advanced climbers commonly exceed 150% of body mass on 20 mm for 10 s. Avoid added-load testing in climbers under 16 to protect finger growth plates.'
    )
  },
  {
    id: 'ts_climb_repeaters',
    name: L('تحمل الأصابع المتقطع (Repeaters 7:3)', 'Intermittent finger endurance (7:3 repeaters)'),
    category: 'muscular_endurance',
    sports: ['climbing'],
    measures: L('تحمل عضلات الساعد والأصابع المتقطع', 'Intermittent forearm and finger endurance'),
    protocol: L(
      '1) حافة 20 مم بوزن الجسم (أو نسبة ثابتة من أقصى تعلق، مثلًا 60%). 2) تعلق 7 ثواني وراحة 3 ثواني بشكل متواصل. 3) كمّل لحد ما مش قادر تكمل 7 ثواني. 4) سجل عدد التكرارات المكتملة.',
      '1) 20 mm edge at body mass (or a fixed percentage of max hang, e.g. 60%). 2) Hang 7 s, rest 3 s, continuously. 3) Continue until a 7 s hang cannot be completed. 4) Record completed repetitions.'
    ),
    equipment: EQ(['هانج بورد بحافة 20 مم', 'Hangboard with 20 mm edge'], ['تايمر فترات', 'Interval timer']),
    unit: 'reps',
    better: 'higher',
    norms: [],
    source: 'Balas J et al. (2012) Eur J Sport Sci 12(1):16-25; Lopez-Rivera E, Gonzalez-Badillo JJ (2012) Sports Technol 5(3-4):100-110',
    notes: L(
      'ثبّت الحافة والقبضة والحمل النسبي. تحسن التحمل بدون تحسن القوة القصوى معناه إن محتاج تركز على القوة.',
      'Keep edge, grip and relative load fixed. Improved endurance without improved max strength suggests a need to focus on strength.'
    )
  },
  {
    id: 'ts_golf_clubhead_speed',
    name: L('سرعة رأس المضرب (درايفر)', 'Driver club-head speed'),
    category: 'power',
    sports: ['golf'],
    measures: L('سرعة رأس المضرب لحظة الضرب', 'Club-head speed at impact'),
    protocol: L(
      '1) إحماء كامل وضربات تدريجية. 2) 5-10 ضربات درايفر بأقصى سرعة متحكم فيها. 3) قياس بجهاز رادار/لونش مونيتور. 4) سجل الأعلى ومتوسط أفضل 3 ضربات مع جودة الضرب (smash factor).',
      '1) Full warm-up and progressive swings. 2) 5-10 driver swings at maximal controlled speed. 3) Measure with a launch monitor or radar. 4) Record the peak and mean of the best 3, with strike quality (smash factor).'
    ),
    equipment: EQ(['لونش مونيتور أو رادار سرعة المضرب', 'Launch monitor or swing-speed radar'], ['درايفر', 'Driver'], ['كور جولف', 'Golf balls']),
    unit: 'km/h',
    better: 'higher',
    norms: [],
    source: 'TrackMan tour and amateur averages; Parker J et al. (2017) Physical tests and golf performance - golf-specific power literature',
    notes: L(
      'متوسطات TrackMan المنشورة: لاعبي PGA Tour حوالي 113-115 ميل/س (حوالي 182-185 كم/س)، LPGA حوالي 94 ميل/س (حوالي 151 كم/س)، والهاوي الراجل المتوسط حوالي 93 ميل/س (حوالي 150 كم/س). كل 1 ميل/س زيادة بيدي تقريبًا 2-3 ياردة مسافة إضافية.',
      'Published TrackMan averages: PGA Tour about 113-115 mph (about 182-185 km/h), LPGA about 94 mph (about 151 km/h), average male amateur about 93 mph (about 150 km/h). Each extra 1 mph adds roughly 2-3 yards of carry.'
    )
  },
  {
    id: 'ts_archery_holding',
    name: L('اختبار الثبات عند أقصى شد (رماية بالسهام)', 'Full-draw holding test (archery)'),
    category: 'muscular_endurance',
    sports: ['archery'],
    measures: L('تحمل عضلات الكتف والظهر عند الثبات في وضع الشد', 'Shoulder and back endurance while holding at full draw'),
    protocol: L(
      '1) قوس المنافسة (أو قوس تدريب بنفس الوزن) وبدون سهم أو بشريط أمان (شريط SPT). 2) الشد لوضع الانكور الكامل بوضع جسم صحيح. 3) الثبات أطول وقت ممكن مع الحفاظ على الوضع. 4) الوقت بيقف لما الشد يرجع أو الوضع ينهار.',
      '1) Competition bow (or a training bow of the same draw weight) with no arrow, or a safety strap (SPT band). 2) Draw to full anchor with correct posture. 3) Hold as long as possible while maintaining form. 4) Time stops when the draw creeps forward or form breaks.'
    ),
    equipment: EQ(['قوس بوزن شد ثابت', 'Bow of fixed draw weight'], ['شريط SPT أو ضاغط قوس', 'SPT strap or bow trainer'], WATCH),
    unit: 's',
    better: 'higher',
    norms: [],
    source: 'World Archery Coach\'s Manual (specific physical training, holding exercises); Ertan H et al. (2003) Activation patterns in forearm muscles during archery shooting. Hum Mov Sci 22(1):37-45',
    notes: L(
      'ممنوع تمامًا تفك الوتر بدون سهم (dry fire) لأنه بيبوظ القوس وخطر. ممكن تستخدم نسخة التكرارات (مثلًا 10 ثواني ثبات × عدد تكرارات) لقياس التحمل الخاص.',
      'Never release the string without an arrow (dry fire), as it damages the bow and is dangerous. A repeat version (e.g. 10 s holds x repetitions) can measure specific endurance.'
    )
  },
  {
    id: 'ts_shooting_hold_stability',
    name: L('ثبات التصويب (سكات SCATT)', 'Aiming hold stability (SCATT)'),
    category: 'balance',
    sports: ['shooting'],
    measures: L('ثبات السلاح أثناء التصويب ونسبة الوقت داخل المنطقة العشرية', 'Weapon stability during aiming and time inside the 10 ring'),
    protocol: L(
      '1) تركيب حساس SCATT أو نظام تدريب إلكتروني على السلاح. 2) 20-40 طلقة جافة أو حية في وضع المنافسة. 3) سجل نسبة وقت التصويب داخل حلقة العشرة (مثلًا 10a0 خلال آخر ثانية قبل الضغط) ومتوسط النتيجة.',
      '1) Mount a SCATT sensor or electronic training system on the rifle or pistol. 2) Fire 20-40 dry or live shots in competition position. 3) Record the percentage of aiming time inside the 10 ring (e.g. 10a0 over the last second before release) and mean score.'
    ),
    equipment: EQ(['نظام SCATT أو ما يعادله', 'SCATT or equivalent system'], ['سلاح المنافسة', 'Competition rifle or pistol']),
    unit: '%',
    better: 'higher',
    norms: [],
    source: 'Mononen K et al. (2007) Relationships between postural balance, rifle stability and shooting accuracy among novice rifle shooters. Scand J Med Sci Sports 17(2):180-185; SCATT training system metrics',
    notes: L(
      'ثبات الجسم (التوازن) وثبات السلاح من أهم محددات الدقة. ممكن تكمله بقياس اهتزاز الجسم على منصة قوة.',
      'Body balance and weapon stability are key determinants of accuracy. Complement with postural sway on a force plate.'
    )
  },
  {
    id: 'ts_ski_box_jump_90',
    name: L('اختبار الوثب الجانبي على الصندوق 90 ثانية (تزلج)', '90-second lateral box jump (skiing)'),
    category: 'anaerobic',
    sports: ['skiing', 'ice_skating'],
    measures: L('التحمل اللاهوائي والقدرة المتكررة للرجلين', 'Anaerobic endurance and repeated leg power'),
    protocol: L(
      '1) صندوق بارتفاع وعرض ثابتين حسب بروتوكول فريقك. 2) اللاعب واقف جنب الصندوق ويوثب جانبيًا فوقه وينزل الناحية التانية بشكل متواصل. 3) عدد مرات لمس سطح الصندوق في 90 ثانية. 4) سجل كمان العدد في أول وآخر 30 ثانية.',
      '1) Box of fixed height and width per your team protocol. 2) Athlete stands beside the box and jumps laterally onto it and down the other side, continuously. 3) Count box-top contacts in 90 s. 4) Also record counts in the first and last 30 s.'
    ),
    equipment: EQ(['صندوق وثب ثابت', 'Stable plyo box'], WATCH),
    unit: 'reps',
    better: 'higher',
    norms: [],
    source: 'U.S. Ski & Snowboard alpine athlete testing battery; Andersen RE, Montgomery DL (1988) Physiology of alpine skiing. Sports Med 6(4):210-221',
    notes: L(
      'بيحاكي زمن نزول سباق الجاينت سلالوم تقريبًا. الهبوط في آخر 30 ثانية مقارنة بأول 30 ثانية بيعكس التعب.',
      'Roughly mimics a giant-slalom run duration. The drop from the first to the last 30 s reflects fatigue.'
    )
  },
  {
    id: 'ts_dance_daft',
    name: L('اختبار اللياقة الهوائية الخاص بالرقص (DAFT)', 'Dance Aerobic Fitness Test (DAFT)'),
    category: 'aerobic',
    sports: ['dance', 'cheerleading'],
    measures: L('اللياقة الهوائية الخاصة بالرقص', 'Dance-specific aerobic fitness'),
    protocol: L(
      '1) الراقص يتعلم جملة حركية بسيطة من الفيديو الرسمي للاختبار. 2) 5 مراحل كل واحدة 4 دقايق على موسيقى بإيقاع وشدة بتزيد. 3) قياس النبض طول الاختبار وبعده. 4) سجل آخر مرحلة مكتملة والنبض في كل مرحلة.',
      '1) The dancer learns a simple movement sequence from the official test video. 2) Five 4-minute stages to music with increasing tempo and intensity. 3) Heart rate throughout and after. 4) Record the last completed stage and heart rate at each stage.'
    ),
    equipment: EQ(['فيديو وموسيقى الاختبار', 'Test video and music'], HRM, ['مساحة 4×4 متر تقريبًا', 'About 4 x 4 m floor space']),
    unit: 'level',
    better: 'higher',
    norms: [],
    source: 'Wyon MA, Redding E, Abt G, Head A, Sharp NCC (2003) Development, reliability and validity of a multistage dance specific aerobic fitness test (DAFT). J Dance Med Sci 7(3):80-84',
    notes: L(
      'نبض أقل عند نفس المرحلة في إعادة الاختبار = تحسن اللياقة. أنسب للراقصين من اختبارات الجري أو الدراجة.',
      'A lower heart rate at the same stage on retest indicates improved fitness. More relevant to dancers than running or cycling tests.'
    )
  },
  {
    id: 'ts_dance_hidt',
    name: L('اختبار الأداء عالي الشدة للرقص (HIDT)', 'High-Intensity Dance Performance Fitness Test (HIDT)'),
    category: 'anaerobic',
    sports: ['dance', 'cheerleading'],
    measures: L('اللياقة عالية الشدة والاستشفاء الخاص بالرقص', 'High-intensity dance fitness and recovery'),
    protocol: L(
      '1) جملة رقص قصيرة عالية الشدة (قفزات وتغيير اتجاه) متعلّمة من الفيديو الرسمي. 2) أداء الجملة بالكامل. 3) قياس النبض عند النهاية وأثناء الاستشفاء (مثلًا بعد 1 و2 و3 دقايق).',
      '1) A short high-intensity dance sequence (jumps and direction changes) learned from the official video. 2) Perform the full sequence. 3) Measure heart rate at the end and during recovery (e.g. at 1, 2 and 3 min).'
    ),
    equipment: EQ(['فيديو وموسيقى الاختبار', 'Test video and music'], HRM),
    unit: 'bpm',
    better: 'lower',
    norms: [],
    source: 'Redding E, Weller P, Ehrenberg S, et al. (2009) The development of a high intensity dance performance fitness test. J Dance Med Sci 13(1):3-9',
    notes: L(
      'النتيجة المسجلة = النبض بعد دقيقة من الانتهاء؛ نزول أسرع للنبض = استشفاء أحسن.',
      'Recorded result = heart rate 1 min after finishing; faster heart-rate recovery indicates better fitness.'
    )
  },
  {
    id: 'ts_dance_jump',
    name: L('اختبار الوثب للراقصين والتشجيع الاستعراضي', 'Jump test for dancers and cheerleaders'),
    category: 'power',
    sports: ['dance', 'cheerleading', 'gymnastics'],
    measures: L('قدرة الرجلين في الوثب العمودي', 'Vertical jump leg power'),
    protocol: L(
      '1) إحماء ووثبات خفيفة. 2) وثبة عمودية بثني سريع (CMJ) والإيدين على الوسط على بساط قياس أو تطبيق. 3) نسخة تانية: سوتيه متكرر (sauté) لمدة 15-30 ثانية وقياس متوسط الارتفاع. 4) أفضل 3 محاولات للوثبة الواحدة.',
      '1) Warm up with light jumps. 2) Countermovement jump with hands on hips on a contact mat or app. 3) Second version: repeated sautés for 15-30 s, recording mean height. 4) Best of 3 for the single jump.'
    ),
    equipment: EQ(['بساط قياس الوثب أو تطبيق فيديو', 'Jump mat or video app']),
    unit: 'cm',
    better: 'higher',
    norms: [],
    source: 'Angioi M, Metsios GS, Koutedakis Y, Wyon MA (2009) Fitness in contemporary dance: a systematic review. Int J Sports Med 30(7):475-484',
    notes: L(
      'في مراجعة أنجيوي ارتبطت قدرة الوثب بتقييم الأداء الفني عند الراقصين. في التشجيع الاستعراضي مفيد لقياس جاهزية القفزات والـ toe touch.',
      'In the Angioi review, jump power was related to rated dance performance. In cheerleading it helps gauge readiness for jumps such as the toe touch.'
    )
  }
];

/* ================================ YOUTH TALENT IDENTIFICATION ================================ */
const YOUTH = [
  {
    id: 'ts_youth_ktk',
    name: L('اختبار التوافق الحركي للأطفال (KTK)', 'Körperkoordinationstest für Kinder (KTK)'),
    category: 'battery',
    sports: ['all'],
    population: L('أطفال 5-14 سنة', 'Children aged 5-14'),
    measures: L('التوافق الحركي الكلي (معامل الحركة MQ)', 'Gross motor coordination (motor quotient, MQ)'),
    protocol: L(
      '1) المشي للخلف على 3 عوارض توازن بعروض 6 و4.5 و3 سم. 2) الحجل على رجل واحدة فوق مخدات إسفنج بارتفاع بيزيد. 3) الوثب الجانبي بالقدمين فوق خط لمدة 15 ثانية (مرتين). 4) النقل الجانبي على لوحين خشب لمدة 20 ثانية (مرتين). 5) حوّل الدرجات الخام لمعامل حركي MQ حسب السن والجنس من جداول KTK.',
      '1) Walking backwards along three balance beams 6, 4.5 and 3 cm wide. 2) Hopping on one leg over stacked foam pads of increasing height. 3) Jumping sideways with both feet over a line for 15 s (two trials). 4) Moving sideways on two wooden boards for 20 s (two trials). 5) Convert raw scores to a motor quotient (MQ) by age and sex using KTK tables.'
    ),
    equipment: EQ(['3 عوارض توازن KTK', 'Three KTK balance beams'], ['مخدات إسفنج 5 سم', '5 cm foam pads'], ['لوح وثب جانبي', 'Sideways-jump board'], ['لوحين خشب للنقل الجانبي', 'Two transfer boards'], WATCH),
    unit: 'score',
    better: 'higher',
    norms: [
      NORM('معامل الحركة MQ (المتوسط 100 والانحراف 15)', 'Motor quotient MQ (mean 100, SD 15)', 'any',
        hiB([131, 116, 86, 71, 56], ['excellent', 'very_good', 'average', 'below_average', 'poor', 'very_poor']), [5, 14])
    ],
    source: 'Kiphard EJ, Schilling F (1974; 2007 revision) Körperkoordinationstest für Kinder; Vandorpe B et al. (2011) The KorperkoordinationsTest fur Kinder: reference values and suitability for 6-12-year-old children in Flanders. Scand J Med Sci Sports 21(3):378-388',
    notes: L(
      'التصنيف الأصلي: 131-145 عالي جدًا، 116-130 جيد، 86-115 طبيعي، 71-85 ضعف متوسط في التوافق، 56-70 ضعف شديد. من أكتر البطاريات استخدامًا في انتقاء المواهب في أوروبا (مثلًا بلجيكا وألمانيا).',
      'Original classes: 131-145 very high, 116-130 good, 86-115 normal, 71-85 moderate coordination disorder, 56-70 severe disorder. One of the most used talent-ID batteries in Europe (e.g. Belgium and Germany).'
    )
  },
  {
    id: 'ts_youth_dmt',
    name: L('اختبار الحركة الألماني DMT 6-18', 'German Motor Test (DMT 6-18)'),
    category: 'battery',
    sports: ['all'],
    population: L('أطفال وناشئين 6-18 سنة', 'Children and adolescents aged 6-18'),
    measures: L('اللياقة الحركية الشاملة (سرعة، توافق، مرونة، قوة، تحمل)', 'Overall motor fitness (speed, coordination, flexibility, strength, endurance)'),
    protocol: L(
      '1) عدو 20 متر. 2) المشي للخلف على عوارض توازن. 3) الوثب الجانبي بالقدمين لمدة 15 ثانية. 4) ثني الجذع للأمام من الوقوف. 5) ضغط لمدة 40 ثانية. 6) جلوس من الرقود لمدة 40 ثانية. 7) الوثب العريض من الثبات. 8) جري 6 دقايق. 9) حوّل كل نتيجة لدرجة معيارية حسب السن والجنس من جداول DMT.',
      '1) 20 m sprint. 2) Balancing backwards on beams. 3) Jumping sideways for 15 s. 4) Standing forward bend. 5) Push-ups in 40 s. 6) Sit-ups in 40 s. 7) Standing long jump. 8) 6-minute run. 9) Convert each result to a standard score by age and sex using DMT tables.'
    ),
    equipment: EQ(GATES, ['عوارض توازن', 'Balance beams'], ['لوح وثب جانبي', 'Sideways-jump board'], ['صندوق مرونة', 'Flexibility box'], TAPE, CONES),
    unit: 'score',
    better: 'higher',
    norms: [],
    source: 'Bös K et al. (2009) Deutscher Motorik-Test 6-18 (DMT 6-18). Hamburg: Czwalina',
    notes: L(
      'بيستخدم في المدارس والأندية في ألمانيا ودول تانية للمسح وانتقاء المواهب. الجداول المعيارية موجودة في دليل الاختبار حسب السن والجنس.',
      'Used in schools and clubs in Germany and elsewhere for screening and talent identification. Normative tables by age and sex are in the test manual.'
    )
  },
  {
    id: 'ts_youth_ats',
    name: L('بطارية البحث عن المواهب الأسترالية', 'Australian Talent Search test battery'),
    category: 'battery',
    sports: ['all'],
    population: L('طلاب مدارس حوالي 11-15 سنة', 'School students around 11-15 years'),
    measures: L('الخصائص الجسمية والبدنية لتوجيه الناشئ لرياضة مناسبة', 'Physical and anthropometric profile to guide youth towards suitable sports'),
    protocol: L(
      '1) قياسات جسمية: الطول، الطول جالسًا، طول الذراعين (arm span)، الوزن. 2) رمي كرة السلة من الجلوس (قدرة الجزء العلوي). 3) الوثب العمودي. 4) عدو 40 متر. 5) اختبار رشاقة. 6) اختبار الجري المكوكي المتدرج 20 متر. 7) قارن الملف بمتطلبات كل رياضة (مثلًا الطول وطول الذراعين للتجديف والسلة).',
      '1) Anthropometry: height, sitting height, arm span, body mass. 2) Seated basketball throw (upper-body power). 3) Vertical jump. 4) 40 m sprint. 5) Agility run. 6) 20 m multistage shuttle run. 7) Match the profile to each sport\'s demands (e.g. height and arm span for rowing and basketball).'
    ),
    equipment: EQ(['جهاز قياس الطول وميزان', 'Stadiometer and scale'], ['كرة سلة', 'Basketball'], GATES, CONES, AUDIO, TAPE),
    unit: 'score',
    better: 'higher',
    norms: [],
    source: 'Australian Sports Commission / Australian Institute of Sport National Talent Search Program (1994); Hoare DG, Warr CR (2000) Talent identification and women\'s soccer: an Australian experience. J Sports Sci 18(9):751-758',
    notes: L(
      'الهدف مش ترتيب الأطفال وإنما توجيه كل طفل للرياضة اللي ملفه الجسمي والبدني بيناسبها. خد في الاعتبار العمر البيولوجي (البلوغ المبكر أو المتأخر) قبل أي قرار انتقاء.',
      'The aim is not to rank children but to direct each child towards sports that suit their physical profile. Account for biological maturation (early vs late maturers) before any selection decision.'
    )
  }
];

export const SPORT_TESTS_SPORT = [...SWIM, ...CYC, ...ROW, ...RUN, ...TEAM, ...RACKET, ...COMBAT, ...CROSSFIT, ...HYROX, ...OTHER, ...YOUTH];
