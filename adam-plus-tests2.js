// ADAM+ — fitness test catalogue (sports + military/police). Data only; engine lives in adam-plus-tests.js.
// type: beep | yoyo1 | yoyo2 | ift | count (timed reps) | dist (timed, enter distance) | watch (stopwatch) | val (manual number) | calc (calculator)
// u (unit): rep | m | s (mm:ss) | sec (seconds, decimals) | kg | cm | x
export const TEST_CATS = [
  ['all', 'الكل', 'All'], ['aerobic', 'تحمل هوائي', 'Aerobic'], ['speed', 'سرعة ورشاقة', 'Speed & agility'], ['power', 'قدرة', 'Power'],
  ['strength', 'قوة وتحمل عضلي', 'Strength & endurance'], ['flex', 'مرونة', 'Flexibility'], ['swim', 'سباحة وتجديف', 'Swim & row'],
  ['mil', 'عسكري وشرطة', 'Military & police'], ['calc', 'حاسبات', 'Calculators']
];
const t = (k, cat, ar, en, type, o, ar2, en2) => Object.assign({ k: k, cat: cat, ar: ar, en: en, type: type, hi: 1, u: 'rep', ar2: ar2 || '', en2: en2 || '' }, o || {});
export const TESTS = [
  /* ---- aerobic ---- */
  t('beep', 'aerobic', 'اختبار البيب (20 متر)', 'Beep test (20 m shuttle)', 'beep', { u: 'shut' }, 'جري ذهاب وإياب بين خطين، والسرعة بتزيد كل مستوى. بيقدّر قدرتك الهوائية VO2max.', 'Run back and forth between two lines; speed rises each level. Estimates aerobic fitness (VO2max).'),
  t('yoyo1', 'aerobic', 'يو-يو تعافي متقطع - مستوى 1', 'Yo-Yo Intermittent Recovery L1', 'yoyo1', { u: 'm' }, 'جري 2×20 متر مع راحة 10 ثواني بعد كل شوط. للرياضات الجماعية. بيقدّر VO2max.', '2×20 m shuttles with 10 s recovery after each. For team sports. Estimates VO2max.'),
  t('yoyo2', 'aerobic', 'يو-يو تعافي متقطع - مستوى 2', 'Yo-Yo Intermittent Recovery L2', 'yoyo2', { u: 'm' }, 'نفس الفكرة بس أسرع وأصعب. للاعبين المتقدمين.', 'Same format but faster and harder. For advanced players.'),
  t('ift', 'aerobic', 'اختبار 30-15 المتقطع', '30-15 Intermittent Fitness Test', 'ift', { u: 'kmh' }, 'جري 30 ثانية ومشي 15 ثانية، السرعة تبدأ 8 كم/س وتزيد 0.5 كل مرحلة. النتيجة سرعتك النهائية (VIFT).', '30 s run / 15 s walk, starting at 8 km/h and rising 0.5 km/h per stage. Result is your final speed (VIFT).'),
  t('cooper', 'aerobic', 'اختبار كوبر (12 دقيقة)', 'Cooper 12-minute run', 'dist', { u: 'm', secs: 720 }, 'اجري أبعد مسافة في 12 دقيقة وسجّلها. بيقدّر VO2max.', 'Run as far as you can in 12 minutes, then enter the distance. Estimates VO2max.'),
  t('walk6', 'aerobic', 'مشي 6 دقائق', '6-minute walk test', 'dist', { u: 'm', secs: 360 }, 'امشي أبعد مسافة في 6 دقائق بسرعتك. مناسب لكبار السن وللتأهيل.', 'Walk as far as you can in 6 minutes at your own pace. Good for older adults and rehab.'),
  t('run800', 'aerobic', 'جري 800 متر', '800 m run', 'watch', { u: 's', hi: 0 }, 'اجري 800 متر بأقل زمن.', 'Run 800 m as fast as you can.'),
  t('run1500', 'aerobic', 'جري 1500 متر', '1500 m run', 'watch', { u: 's', hi: 0 }, 'اجري 1500 متر بأقل زمن.', 'Run 1500 m as fast as you can.'),
  t('run1mi', 'aerobic', 'جري ميل (1.6 كم)', '1-mile run', 'watch', { u: 's', hi: 0 }, 'اجري ميل (1609 متر) بأقل زمن.', 'Run 1 mile (1609 m) as fast as you can.'),
  t('run15', 'aerobic', 'جري 2.4 كم (1.5 ميل)', '2.4 km (1.5 mile) run', 'watch', { u: 's', hi: 0, vo2: 'run' }, 'اجري 2.4 كم بأقل زمن. التايمر بيحسب الزمن وبيقدّر VO2max.', 'Run 2.4 km as fast as you can. The stopwatch times it and estimates VO2max.'),
  t('run2mi', 'aerobic', 'جري ميلين (3.2 كم)', '2-mile run', 'watch', { u: 's', hi: 0 }, 'اجري ميلين (3.2 كم) بأقل زمن.', 'Run 2 miles (3.2 km) as fast as you can.'),
  t('run3mi', 'aerobic', 'جري 3 أميال (4.8 كم)', '3-mile run', 'watch', { u: 's', hi: 0 }, 'اجري 3 أميال (4.8 كم) بأقل زمن.', 'Run 3 miles (4.8 km) as fast as you can.'),
  t('run5k', 'aerobic', 'جري 5 كم', '5 km run', 'watch', { u: 's', hi: 0 }, 'اجري 5 كم بأقل زمن.', 'Run 5 km as fast as you can.'),
  /* ---- speed & agility ---- */
  t('sp30', 'speed', 'عدو 30 متر', '30 m sprint', 'watch', { u: 'sec', hi: 0, dec: 1 }, 'الأدق إن حد تاني يوقّف التايمر عند خط النهاية، أو سجّل الزمن يدوي.', 'Most accurate when someone else stops the timer at the line, or enter the time manually.'),
  t('sp60', 'speed', 'عدو 60 متر', '60 m sprint', 'watch', { u: 'sec', hi: 0, dec: 1 }, 'نفس فكرة 30 متر.', 'Same idea as the 30 m sprint.'),
  t('sp100', 'speed', 'عدو 100 متر', '100 m sprint', 'watch', { u: 'sec', hi: 0, dec: 1 }, 'نفس فكرة 30 متر.', 'Same idea as the 30 m sprint.'),
  t('sp300', 'speed', 'عدو 300 متر', '300 m run', 'watch', { u: 'sec', hi: 0, dec: 1 }, 'مستخدم في بطاريات الشرطة والأكاديميات.', 'Used in police and academy batteries.'),
  t('sp400', 'speed', 'عدو 400 متر', '400 m run', 'watch', { u: 'sec', hi: 0, dec: 1 }, 'اجري لفة كاملة بأقل زمن.', 'One full lap as fast as you can.'),
  t('ttest', 'speed', 'اختبار T للرشاقة', 'T-test (agility)', 'watch', { u: 'sec', hi: 0, dec: 1 }, 'أربع أقماع على شكل حرف T (10 م أمام و5 م جنب كل ناحية): عدو أمام، جانبي لليمين، جانبي لليسار، رجوع. سجّل الزمن.', 'Four cones in a T (10 m ahead, 5 m to each side): sprint forward, shuffle right, shuffle left, back-pedal. Record the time.'),
  t('illinois', 'speed', 'اختبار إلينوي للرشاقة', 'Illinois agility test', 'watch', { u: 'sec', hi: 0, dec: 1 }, 'مضمار 10×5 متر بأقماع وسط، ركض متعرج بينها. سجّل الزمن.', '10×5 m course with centre cones, weave through them. Record the time.'),
  t('p505', 'speed', 'اختبار 505 للرشاقة', '505 agility test', 'watch', { u: 'sec', hi: 0, dec: 2 }, 'اجري 10 م، لف على خط الـ15 م، واجري 5 م راجع. بيقيس تغيير الاتجاه.', 'Run 10 m, turn at the 15 m line and sprint 5 m back. Measures change of direction.'),
  t('sh10x4', 'speed', 'جري 10×4 متر', '10×4 m shuttle run', 'watch', { u: 'sec', hi: 0, dec: 1 }, 'ذهاب وإياب 10 مرات بين خطين على بعد 4 متر.', 'Ten runs between two lines 4 m apart.'),
  /* ---- power ---- */
  t('vjump', 'power', 'وثب عمودي', 'Vertical jump', 'val', { u: 'cm' }, 'علّم أعلى نقطة توصلها واقف، وبعدين أعلى نقطة بعد القفز. الفرق = القفزة. أحسن محاولة من 3.', 'Mark your standing reach, then your reach at the top of a jump. The difference is the jump. Best of 3.'),
  t('slj', 'power', 'وثب طويل من الثبات', 'Standing long jump', 'val', { u: 'cm' }, 'اقفز لأبعد مسافة بالقدمين من غير جري. قِس من الخط لأقرب كعب. أحسن محاولة من 3.', 'Jump as far as you can with two feet, no run-up. Measure from the line to the nearest heel. Best of 3.'),
  t('medball', 'power', 'رمي كرة طبية', 'Medicine-ball throw', 'val', { u: 'm' }, 'ارمي الكرة الطبية (عادة 3 كجم للخلف فوق الرأس) لأبعد مسافة. اكتب المسافة بالمتر.', 'Throw a medicine ball (often 3 kg, overhead backward) as far as you can. Enter metres.'),
  /* ---- strength & muscular endurance ---- */
  t('pushups', 'strength', 'ضغط في دقيقة', '1-minute push-ups', 'count', { secs: 60 }, 'أكبر عدد ضغط في 60 ثانية بشكل سليم.', 'Max clean push-ups in 60 seconds.'),
  t('pushups2', 'strength', 'ضغط في دقيقتين', '2-minute push-ups', 'count', { secs: 120 }, 'أكبر عدد ضغط في دقيقتين. صدرك ينزل لزاوية 90° للكوع.', 'Max push-ups in 2 minutes. Lower until the elbows reach about 90°.'),
  t('hrpush', 'strength', 'ضغط مع رفع اليدين (دقيقتين)', 'Hand-release push-ups (2 min)', 'count', { secs: 120 }, 'انزل بصدرك على الأرض، ارفع إيديك لحظة، وارجع اضغط. أكبر عدد في دقيقتين.', 'Lower your chest to the floor, lift your hands briefly, then push up. Max reps in 2 minutes.'),
  t('situps', 'strength', 'جلوس من الرقود في دقيقة', '1-minute sit-ups', 'count', { secs: 60 }, 'أكبر عدد جلوس من الرقود في 60 ثانية.', 'Max sit-ups in 60 seconds.'),
  t('situps2', 'strength', 'جلوس من الرقود في دقيقتين', '2-minute sit-ups', 'count', { secs: 120 }, 'أكبر عدد جلوس من الرقود في دقيقتين.', 'Max sit-ups in 2 minutes.'),
  t('squats', 'strength', 'سكوات وزن الجسم في دقيقة', '1-minute bodyweight squats', 'count', { secs: 60 }, 'أكبر عدد سكوات للتوازي في 60 ثانية.', 'Max parallel-depth squats in 60 seconds.'),
  t('burpees', 'strength', 'بيربي في دقيقة', '1-minute burpees', 'count', { secs: 60 }, 'أكبر عدد بيربي كامل في 60 ثانية.', 'Max full burpees in 60 seconds.'),
  t('chair', 'strength', 'وقوف من الكرسي (30 ثانية)', '30-second chair stand', 'count', { secs: 30 }, 'أكبر عدد وقوف وجلوس من كرسي في 30 ثانية. مناسب لكبار السن وللتأهيل.', 'Max stand-ups from a chair in 30 s. Good for older adults and rehab.'),
  t('pullups', 'strength', 'عقلة (أقصى عدد)', 'Pull-ups (max reps)', 'val', { u: 'rep' }, 'أكبر عدد عقلة كاملة من غير تأرجح. اكتب العدد.', 'Max strict pull-ups without swinging. Enter the count.'),
  t('plank', 'strength', 'ثبات البلانك', 'Plank hold', 'watch', { u: 's' }, 'اثبت على البلانك لأطول وقت بشكل سليم، والتايمر يحسب.', 'Hold a clean plank as long as you can; the stopwatch times it.'),
  t('wallsit', 'strength', 'ثبات الكرسي على الحيطة', 'Wall sit', 'watch', { u: 's' }, 'ضهرك على الحيطة وركبك 90° لأطول وقت.', 'Back against the wall, knees at 90°, as long as you can.'),
  t('hang', 'strength', 'تعلّق بالعقلة', 'Dead hang', 'watch', { u: 's' }, 'علّق نفسك على العقلة لأطول وقت.', 'Hang from a bar as long as you can.'),
  t('balance', 'strength', 'توازن على رجل واحدة', 'Single-leg balance', 'watch', { u: 's' }, 'اثبت على رجل واحدة وعينك مقفولة (أو مفتوحة للمبتدئ). وقّف لما ترجلك التانية تلمس الأرض.', 'Stand on one leg, eyes closed (open for beginners). Stop when the other foot touches down.'),
  t('dl3', 'strength', 'ديدلفت 3 تكرارات (أقصى وزن)', '3-rep max deadlift', 'val', { u: 'kg' }, 'أتقل وزن ترفعه 3 مرات بفورم سليم. اكتب الوزن بالكيلو. اعمل إحماء كامل وبمساعدة مراقب.', 'Heaviest weight you can deadlift for 3 clean reps. Enter kg. Warm up fully and use a spotter.'),
  t('grip', 'strength', 'قوة قبضة اليد', 'Grip strength', 'val', { u: 'kg' }, 'بجهاز الدينامومتر: أحسن محاولة من 3 لكل إيد. اكتب أعلى رقم.', 'With a hand dynamometer: best of 3 per hand. Enter the highest number.'),
  /* ---- flexibility ---- */
  t('sitreach', 'flex', 'ثني الجذع من الجلوس', 'Sit-and-reach', 'val', { u: 'cm' }, 'اقعد ورجلك مفرودة قدام صندوق القياس وامسك أبعد نقطة. اكتب السنتيمترات (سالب لو ما وصلتش لمشط القدم).', 'Sit with legs straight against the box and reach as far as you can. Enter cm (negative if short of the toes).'),
  /* ---- swim & row ---- */
  t('swim50', 'swim', 'سباحة 50 متر', '50 m swim', 'watch', { u: 'sec', hi: 0, dec: 1 }, 'اسبح 50 متر بأقل زمن. سجّل الزمن يدوي لو حد تاني بيوقّت.', 'Swim 50 m as fast as you can. Enter the time manually if someone else is timing.'),
  t('swim200', 'swim', 'سباحة 200 متر', '200 m swim', 'watch', { u: 's', hi: 0 }, 'اسبح 200 متر بأقل زمن.', 'Swim 200 m as fast as you can.'),
  t('swim400', 'swim', 'سباحة 400 متر', '400 m swim', 'watch', { u: 's', hi: 0 }, 'اسبح 400 متر بأقل زمن.', 'Swim 400 m as fast as you can.'),
  t('cswim', 'swim', 'كوبر سباحة (12 دقيقة)', 'Cooper swim (12 min)', 'dist', { u: 'm', secs: 720 }, 'اسبح أبعد مسافة في 12 دقيقة.', 'Swim as far as you can in 12 minutes.'),
  t('row2k', 'swim', 'تجديف 2000 متر', '2000 m row', 'watch', { u: 's', hi: 0 }, 'جهاز التجديف: 2000 متر بأقل زمن. سجّل زمن الجهاز لو أدق.', 'Rowing ergometer: 2000 m as fast as you can. Enter the machine time if more accurate.'),
  /* ---- military / police components ---- */
  t('sdc', 'mil', 'جري–سحب–حمل (5×50 م)', 'Sprint-drag-carry', 'watch', { u: 's', hi: 0 }, 'خمس لفات 50 متر: عدو، سحب زحافة، جري جانبي، حمل جراكن، عدو. سجّل الزمن الكلي.', 'Five 50 m laps: sprint, sled drag, lateral shuffle, carry, sprint. Record total time.'),
  /* ---- calculators ---- */
  t('rm1', 'calc', 'حاسبة 1RM (أقصى وزن)', '1RM calculator', 'calc', { u: 'kg', inputs: [['w', 'الوزن (كجم)', 'Weight (kg)', 60], ['r', 'عدد التكرارات (1-10)', 'Reps (1-10)', 5]] }, 'اعمل مجموعة لحد الإرهاق تقريباً بين 2 و10 تكرارات، والحاسبة تقدّر أقصى وزن لمرة واحدة (إبلي وبرزيكي).', 'Do a near-failure set of 2–10 reps and estimate your one-rep max (Epley and Brzycki).'),
  t('css', 'calc', 'سرعة السباحة الحرجة CSS', 'Swim critical speed (CSS)', 'calc', { u: 'x', hi: 0, inputs: [['a', 'زمن 400 م (ثواني)', '400 m time (s)', 360], ['b', 'زمن 200 م (ثواني)', '200 m time (s)', 170]] }, 'اسبح 400 م و200 م بأقصى مجهود (راحة 10-15 دقيقة بينهم). الحاسبة تطلع زمن الـ100 م المناسب للتدريب.', 'Swim 400 m and 200 m at max effort (10–15 min rest between). Gives your training pace per 100 m.'),
  t('rock', 'calc', 'مشي ميل (روكبورت) VO2max', 'Rockport 1-mile walk', 'calc', { u: 'x', inputs: [['t', 'زمن المشي (دقائق)', 'Walk time (min)', 15], ['h', 'نبض آخر المشي', 'Heart rate at the end', 130], ['a', 'السن', 'Age', 30], ['w', 'الوزن (كجم)', 'Weight (kg)', 75], ['g', 'النوع: 1 رجل / 0 سيدة', 'Sex: 1 male / 0 female', 1]] }, 'امشي ميل بأسرع مشي ثابت، وقِس النبض في الآخر. بيقدّر VO2max. مناسب للمبتدئين.', 'Walk 1 mile as briskly as you can and take your heart rate at the end. Estimates VO2max. Good for beginners.')
];
/* Military / police batteries: lists of events (each opens the matching test). No scoring tables on purpose: standards differ by country, age, sex and change over time. */
export const BATTERIES = [
  { k: 'apft', ar: 'اختبار اللياقة القديم للجيش الأمريكي (APFT)', en: 'US Army APFT (legacy)', ev: ['pushups2', 'situps2', 'run2mi'], ar2: 'ضغط دقيقتين + جلوس دقيقتين + جري ميلين.', en2: '2-min push-ups + 2-min sit-ups + 2-mile run.' },
  { k: 'acft', ar: 'اختبار لياقة القتال (ACFT)', en: 'US Army Combat Fitness Test (ACFT)', ev: ['dl3', 'medball', 'hrpush', 'sdc', 'plank', 'run2mi'], ar2: 'ديدلفت 3RM، رمي كرة، ضغط برفع اليدين، جري-سحب-حمل، بلانك، جري ميلين. نسخة الجيش الحالية قد تختلف.', en2: '3RM deadlift, power throw, hand-release push-ups, sprint-drag-carry, plank, 2-mile run. The current Army version may differ.' },
  { k: 'navy', ar: 'اختبار اللياقة البحرية (PRT)', en: 'US Navy PRT', ev: ['pushups2', 'plank', 'run15'], ar2: 'ضغط دقيقتين + بلانك + جري 1.5 ميل.', en2: '2-min push-ups + plank + 1.5-mile run.' },
  { k: 'usmc', ar: 'اختبار اللياقة البحري (USMC PFT)', en: 'US Marine Corps PFT', ev: ['pullups', 'plank', 'run3mi'], ar2: 'عقلة + بلانك + جري 3 أميال.', en2: 'Pull-ups + plank + 3-mile run.' },
  { k: 'police', ar: 'بطارية شرطة / كليات / أكاديميات (نموذج عام)', en: 'Police / academy battery (generic)', ev: ['cooper', 'pushups', 'situps', 'sp300', 'illinois', 'vjump'], ar2: 'نموذج عام شائع: كوبر، ضغط وجلوس دقيقة، عدو 300 م، إلينوي، وثب عمودي. أي أكاديمية ليها معاييرها.', en2: 'A common generic set: Cooper, 1-min push-ups/sit-ups, 300 m, Illinois, vertical jump. Each academy has its own standards.' },
  { k: 'fire', ar: 'لياقة الإطفاء والإنقاذ (نموذج عام)', en: 'Fire / rescue fitness (generic)', ev: ['beep', 'pullups', 'plank', 'grip', 'sdc'], ar2: 'بيب تست، عقلة، بلانك، قبضة، جري-سحب-حمل.', en2: 'Beep test, pull-ups, plank, grip strength, sprint-drag-carry.' }
];

/* Rating tables (indicative only). VO2max: The Cooper Institute percentile norms (reprinted by Garmin with permission), thresholds = lower bound of
   Fair/Good/Excellent/Superior per age band 20-29,30-39,40-49,50-59,60-69,70-79. Push-ups: ACSM-based table as published by Topend Sports
   (bounds = lowest count for Average/Above avg/Good/Excellent per band 17-19,20-29,30-39,40-49,50-59,60+). */
export const VO2_NORMS = {
  m: [[41.7, 45.4, 51.1, 55.4], [40.5, 44, 48.3, 54], [38.5, 42.4, 46.4, 52.5], [35.6, 39.2, 43.4, 48.9], [32.3, 35.5, 39.5, 45.7], [29.4, 32.3, 36.7, 42.1]],
  f: [[36.1, 39.5, 43.9, 49.6], [34.4, 37.8, 42.4, 47.4], [33, 36.3, 39.7, 45.3], [30.1, 33, 36.7, 41.1], [27.5, 30, 33, 37.8], [25.9, 28.1, 30.9, 36.7]]
};
export const VO2_LABELS = [['ضعيف', 'Poor'], ['مقبول', 'Fair'], ['جيد', 'Good'], ['ممتاز', 'Excellent'], ['متفوق', 'Superior']];
export const PUSH_NORMS = {
  m: [[31, 35, 47, 56], [24, 30, 39, 47], [20, 25, 34, 41], [16, 21, 28, 34], [13, 18, 25, 31], [11, 17, 24, 30]],
  f: [[18, 21, 27, 35], [17, 23, 30, 36], [14, 22, 30, 37], [11, 17, 24, 31], [10, 14, 21, 25], [5, 12, 19, 23]]
};
export const PUSH_LABELS = [['أقل من المتوسط', 'Below average'], ['متوسط', 'Average'], ['فوق المتوسط', 'Above average'], ['جيد', 'Good'], ['ممتاز', 'Excellent']];
