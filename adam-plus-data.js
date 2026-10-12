/*
 * ADAM+ — بيانات الرحلات والطلعات (عربي / إنجليزي)
 * ⚠️ المحتوى هنا إرشادي عام للّياقة. رحلات التأهيل مراحل عامة جدًا ومش تشخيص
 * ولا بديل عن متخصص — وكل رحلة تأهيل فيها زرار تواصل مع متخصص.
 */

export const GOVERNORATES = [
  ['cairo', 'القاهرة', 'Cairo'], ['giza', 'الجيزة', 'Giza'], ['alex', 'الإسكندرية', 'Alexandria'],
  ['qalyubia', 'القليوبية', 'Qalyubia'], ['sharqia', 'الشرقية', 'Sharqia'], ['dakahlia', 'الدقهلية', 'Dakahlia'],
  ['gharbia', 'الغربية', 'Gharbia'], ['menoufia', 'المنوفية', 'Menoufia'], ['beheira', 'البحيرة', 'Beheira'],
  ['kafr', 'كفر الشيخ', 'Kafr El Sheikh'], ['damietta', 'دمياط', 'Damietta'], ['portsaid', 'بورسعيد', 'Port Said'],
  ['ismailia', 'الإسماعيلية', 'Ismailia'], ['suez', 'السويس', 'Suez'], ['fayoum', 'الفيوم', 'Fayoum'],
  ['beni', 'بني سويف', 'Beni Suef'], ['minya', 'المنيا', 'Minya'], ['asyut', 'أسيوط', 'Asyut'],
  ['sohag', 'سوهاج', 'Sohag'], ['qena', 'قنا', 'Qena'], ['luxor', 'الأقصر', 'Luxor'], ['aswan', 'أسوان', 'Aswan'],
  ['redsea', 'البحر الأحمر', 'Red Sea'], ['newvalley', 'الوادي الجديد', 'New Valley'], ['matrouh', 'مطروح', 'Matrouh'],
  ['northsinai', 'شمال سيناء', 'North Sinai'], ['southsinai', 'جنوب سيناء', 'South Sinai']
];

export const EVENT_TYPES = [
  ['marathon', 'ماراثون / سباق', 'Marathon / race'],
  ['group_run', 'جري جماعي', 'Group run'],
  ['workout', 'تمرين جماعي', 'Group workout'],
  ['class', 'كلاس', 'Class'],
  ['match', 'مباراة / بطولة', 'Match / tournament'],
  ['hike', 'رحلة / طلعة', 'Trip / hike'],
  ['other', 'أخرى', 'Other']
];

export const INJURY_AREAS = [
  ['knee', 'الركبة', 'Knee'], ['shoulder', 'الكتف', 'Shoulder'], ['low_back', 'أسفل الظهر', 'Lower back'],
  ['ankle', 'الكاحل', 'Ankle'], ['neck', 'الرقبة', 'Neck'], ['hamstring', 'الفخذ الخلفي', 'Hamstring'],
  ['hip', 'الحوض والفخذ', 'Hip'], ['elbow', 'الكوع والرسغ', 'Elbow & wrist'], ['foot', 'القدم والعقب', 'Foot & heel']
];

export const DIETS = [
  ['cut', 'تنشيف', 'Cutting'], ['bulk', 'تضخيم', 'Bulking'], ['fasting', 'صيام متقطع', 'Intermittent fasting'],
  ['vegetarian', 'نباتي', 'Vegetarian'], ['ramadan', 'رمضان', 'Ramadan'], ['budget', 'اقتصادي', 'Budget'],
  ['balanced', 'متوازن', 'Balanced']
];

export const GOALS = [
  ['muscle', 'زيادة عضل', 'Build muscle'], ['fat', 'حرق دهون', 'Fat loss'], ['run', 'جري', 'Running'],
  ['fitness', 'لياقة عامة', 'General fitness'], ['performance', 'أداء رياضي', 'Sport performance'],
  ['rehab', 'تأهيل', 'Rehab'], ['nutrition', 'تغذية', 'Nutrition']
];

/* كلمات بتربط هدف العميل المكتوب برحلة */
export const GOAL_KEYWORDS = [
  [/10\s*(k|ك)|عشر[ةه]? كيلو|10 كم/i, 'r10k'], [/5\s*(k|ك)|خمس[ةه]? كيلو|5 كم/i, 'r5k'],
  [/نصف ماراثون|half|21/i, 'r21k'], [/ماراثون|marathon/i, 'r10k'], [/جري|اجري|run/i, 'r5k'],
  [/عضل|ضخ|تضخيم|muscle|bulk|build/i, 'build8'], [/تنشيف|دهون|خسار|وزن|اخس|fat|lose|weight|cut/i, 'fatloss8'],
  [/ركب|knee|acl|صليب/i, 'rehab_knee'], [/كتف|shoulder/i, 'rehab_shoulder'], [/ظهر|back|disc|غضروف/i, 'rehab_back'],
  [/كاحل|ankle|التواء/i, 'rehab_ankle'], [/رقب|neck|posture|وضعية/i, 'rehab_neck'],
  [/سباح|swim/i, 'swim1k'], [/دراج|عجل|cycl|bike/i, 'cycle50'], [/ملاكم|box/i, 'boxing6'],
  [/كورة|كرة قدم|football|soccer/i, 'football6'], [/يوجا|yoga/i, 'yoga30'], [/كروس|crossfit/i, 'cf6'],
  [/سحب|بول|pull.?up|عقل/i, 'pullup8'], [/سرعة|عدو|sprint|speed/i, 'sprint6'], [/صيام|fasting/i, 'diet_fasting'],
  [/رمضان|ramadan/i, 'diet_ramadan'], [/نباتي|vegan|vegetarian/i, 'diet_veg'], [/لياقة|fitness|بداية|مبتدئ/i, 'strength4']
];

const C = { blue: '#1d5a8a', green: '#17614a', brown: '#6b4527', purple: '#553a76', teal: '#2c5f5a', red: '#7a3340', gold: '#6b5a24', slate: '#3b4a5c' };

/* خطوة = [أسبوع، عنوان ع، عنوان en، [ [مهمة ع، en], ... ]] */
function steps(list) {
  return list.map(function (s) {
    return { w: s[0], t: { ar: s[1], en: s[2] }, tasks: s[3].map(function (k) { return { ar: k[0], en: k[1] }; }) };
  });
}

const REHAB_NOTE = {
  ar: 'ده إرشاد عام بمراحل مبسطة، مش تشخيص ولا بديل عن متخصص. لو الوجع شديد أو بيزيد، أو فيه تنميل أو ضعف أو تورم واضح أو وجع بالليل، اكشف عند طبيب أو أخصائي قبل ما تكمل.',
  en: 'This is general guidance in simple phases, not a diagnosis or a substitute for a specialist. If pain is severe or worsening, or you have numbness, weakness, obvious swelling or night pain, see a doctor or specialist before continuing.'
};

export const JOURNEYS = [
  /* ------------------------------ جري ------------------------------ */
  { id: 'r5k', goal: 'run', sport: 'running', level: 'beginner', weeks: 6, color: C.green, big: '5K', spec: 'coach',
    title: { ar: 'اجري أول 5 كم', en: 'Run your first 5K' }, sub: { ar: 'للمبتدئين · 3 مرات في الأسبوع', en: 'For beginners · 3 runs a week' },
    steps: steps([
      [1, 'جري ومشي بالتبادل', 'Run/walk intervals', [['اسخن بمشي سريع 5 دقايق', 'Warm up with 5 minutes of brisk walking'], ['اجري دقيقة وامشي دقيقتين، كرر 8 مرات', 'Run 1 min, walk 2 min, repeat 8 times'], ['3 مرات في الأسبوع بينها يوم راحة', '3 sessions with a rest day between']]],
      [2, 'نزود الجري', 'Longer run intervals', [['اجري دقيقتين وامشي دقيقتين، كرر 6 مرات', 'Run 2 min, walk 2 min, repeat 6 times'], ['حافظ على سرعة تقدر تتكلم فيها', 'Keep a pace where you can still talk']]],
      [3, 'أربع دقايق جري', 'Four-minute runs', [['اجري 4 دقايق وامشي دقيقتين، كرر 4 مرات', 'Run 4 min, walk 2 min, repeat 4 times'], ['اشرب مياه قبل وبعد الجري', 'Drink water before and after']]],
      [4, 'ست دقايق جري', 'Six-minute runs', [['اجري 6 دقايق وامشي دقيقتين، كرر 3 مرات', 'Run 6 min, walk 2 min, repeat 3 times'], ['اهتم بحذاء مريح وخطوات قصيرة', 'Wear comfortable shoes and keep strides short']]],
      [5, 'عشر دقايق جري', 'Ten-minute runs', [['اجري 10 دقايق وامشي دقيقتين، كرر مرتين', 'Run 10 min, walk 2 min, repeat twice'], ['جري واحد أطول: 15 دقيقة متواصلة', 'One longer run: 15 minutes continuous']]],
      [6, 'جاهز لـ 5 كم', 'Ready for 5K', [['جريتين من 20 إلى 25 دقيقة متواصلة', 'Two runs of 20 to 25 continuous minutes'], ['الجري الأخير: جرب 5 كم بالسرعة اللي تناسبك', 'Final run: try 5 km at your own comfortable pace']]]
    ]) },
  { id: 'r10k', goal: 'run', sport: 'running', level: 'intermediate', weeks: 10, color: C.blue, big: '10K', spec: 'coach',
    title: { ar: 'اجري 10 كم', en: 'Run 10K' }, sub: { ar: 'لو بتجري 5 كم بالفعل · ينتهي بسباق', en: 'If you can already run 5K · ends with a race' },
    steps: steps([
      [1, 'قاعدة الجري', 'Build the base', [['3 جريات سهلة: 25 إلى 30 دقيقة', '3 easy runs of 25 to 30 minutes'], ['جري طويل 6 كم في آخر الأسبوع', 'Long run of 6 km at the weekend']]],
      [2, 'زيادة خفيفة', 'Small increase', [['جريتين سهلتين و جري طويل 7 كم', 'Two easy runs and a 7 km long run'], ['تمرين قوة خفيف للرجلين مرة', 'One light leg-strength session']]],
      [3, 'أول سرعات', 'First speed work', [['4 تكرارات: 2 دقيقة أسرع وبعدها دقيقتين سهل', '4 reps: 2 min faster, 2 min easy'], ['جري طويل 8 كم', 'Long run of 8 km']]],
      [4, 'أسبوع تخفيف', 'Recovery week', [['قلل المسافة للنص تقريبًا', 'Cut distance by about half'], ['نوم كفاية وإطالات خفيفة', 'Sleep well and stretch gently']]],
      [5, 'جري طويل أطول', 'Longer long run', [['جري طويل 9 كم', 'Long run of 9 km'], ['جريتين سهلتين 30 دقيقة', 'Two easy 30-minute runs']]],
      [6, 'سرعة وتحمل', 'Speed and endurance', [['5 تكرارات: 3 دقايق سرعة متوسطة', '5 reps: 3 min at moderate speed'], ['جري طويل 10 كم', 'Long run of 10 km']]],
      [7, 'سرعة السباق', 'Race pace', [['20 دقيقة بسرعة السباق المتوقعة', '20 minutes at expected race pace'], ['جري سهل ومريح الباقي', 'Easy runs for the rest']]],
      [8, 'أقوى أسبوع', 'Peak week', [['جري طويل 10 كم بهدوء', 'Easy 10 km long run'], ['تدريب سرعة خفيف مرة', 'One light speed session']]],
      [9, 'تخفيف قبل السباق', 'Taper', [['قلل الحجم 30% وحافظ على الراحة', 'Reduce volume by 30% and rest well'], ['جهز الحذاء والملابس', 'Prepare shoes and clothes']]],
      [10, 'يوم السباق', 'Race week', [['جريتين قصيرتين سهلتين', 'Two short easy runs'], ['السباق: ابدأ بهدوء وزود في النص الثاني', 'Race: start easy and push in the second half']]]
    ]) },
  { id: 'r21k', goal: 'run', sport: 'marathon', level: 'advanced', weeks: 12, color: C.purple, big: '21K', spec: 'coach',
    title: { ar: 'اجري نصف ماراثون', en: 'Run a half marathon' }, sub: { ar: 'لو بتجري 10 كم · 12 أسبوع', en: 'If you can run 10K · 12 weeks' },
    steps: steps([
      [1, 'تثبيت الأساس', 'Settle the base', [['3 جريات سهلة، جري طويل 10 كم', '3 easy runs, long run 10 km']]],
      [2, 'زيادة تدريجية', 'Gradual build', [['جري طويل 12 كم', 'Long run 12 km'], ['جري سرعة خفيف مرة', 'One light tempo run']]],
      [3, 'تمرين عتبة', 'Threshold work', [['20 دقيقة بسرعة قوية ومريحة', '20 min at comfortably hard pace'], ['جري طويل 13 كم', 'Long run 13 km']]],
      [4, 'أسبوع تخفيف', 'Recovery week', [['قلل المسافة الكلية 30%', 'Cut total distance by 30%']]],
      [5, 'جري طويل 15 كم', 'Long run 15 km', [['اشرب وكل أثناء الجري الطويل', 'Practice fuelling and drinking on long runs']]],
      [6, 'تكرارات تحمل', 'Endurance reps', [['3 × 8 دقايق بسرعة السباق', '3 x 8 min at race pace'], ['جري طويل 16 كم', 'Long run 16 km']]],
      [7, 'أسبوع تخفيف', 'Recovery week', [['راحة وإطالات ونوم', 'Rest, stretching and sleep']]],
      [8, 'جري طويل 18 كم', 'Long run 18 km', [['بسرعة سهلة وثابتة', 'At steady easy pace']]],
      [9, 'جري سرعة السباق', 'Race-pace long run', [['10 كم من الجري الطويل بسرعة السباق', '10 km of the long run at race pace']]],
      [10, 'أعلى حجم', 'Peak volume', [['جري طويل 19 كم مرة واحدة فقط', 'One long run of 19 km only']]],
      [11, 'تخفيف قبل السباق', 'Taper', [['قلل المسافة 40% وحافظ على جريات قصيرة', 'Cut distance 40% and keep short runs']]],
      [12, 'أسبوع السباق', 'Race week', [['جريتين سهلتين قصيرتين', 'Two short easy runs'], ['السباق: ابدأ بهدوء واحتفظ بطاقة للنهاية', 'Race: start easy and save energy for the end']]]
    ]) },
  { id: 'sprint6', goal: 'performance', sport: 'sprint', level: 'intermediate', weeks: 6, color: C.red, big: '100m', spec: 'coach',
    title: { ar: 'سرعة أعلى في العدو', en: 'Faster sprinting' }, sub: { ar: 'تحسين السرعة والانطلاق · 6 أسابيع', en: 'Improve speed and starts · 6 weeks' },
    steps: steps([
      [1, 'تسخين وميكانيكا', 'Warm-up and mechanics', [['تمارين رفع الركبة وركل الكعب 3 جولات', 'High knees and butt kicks, 3 rounds'], ['4 انطلاقات 20 متر بجهد 80%', '4 starts of 20 m at 80% effort']]],
      [2, 'انطلاق', 'Acceleration', [['6 انطلاقات 30 متر مع راحة كاملة', '6 starts of 30 m with full rest'], ['تمرين قوة: سكوات وقفز', 'Strength: squats and jumps']]],
      [3, 'سرعة قصوى', 'Top speed', [['4 جريات 40 متر بجهد 95%', '4 runs of 40 m at 95% effort']]],
      [4, 'تخفيف', 'Recovery week', [['حجم أقل وإطالات وفوم رولر', 'Lower volume, stretching and foam rolling']]],
      [5, 'تحمل السرعة', 'Speed endurance', [['3 جريات 80 متر مع راحة 4 دقايق', '3 runs of 80 m with 4 min rest']]],
      [6, 'اختبار', 'Test', [['اختبار 60 متر وسجل الزمن', 'Test a 60 m sprint and record the time']]]
    ]) },
  /* ------------------------------ قوة وبناء ------------------------------ */
  { id: 'build8', goal: 'muscle', sport: 'bodybuilding', level: 'intermediate', weeks: 8, color: C.brown, big: '60', spec: 'coach', plan: { goal: 'muscle', days: 4 }, program: 'bulk',
    title: { ar: 'ابنِ جسمك في شهرين', en: 'Build your body in 2 months' }, sub: { ar: 'تمرين وأكل وقياسات كل أسبوعين', en: 'Training, food and check-ins every 2 weeks' },
    steps: steps([
      [1, 'تأسيس', 'Foundation', [['4 أيام تمرين، ركز على الأداء الصح', '4 training days focused on clean form'], ['قس وزنك والخصر وصور نفسك', 'Record weight, waist and a photo']]],
      [2, 'زيادة الأحمال', 'Progressive load', [['زود وزن أو تكرار في كل تمرين رئيسي', 'Add weight or reps on each main lift'], ['بروتين في كل وجبة', 'Protein at every meal']]],
      [3, 'حجم أعلى', 'More volume', [['زود مجموعة في العضلات الضعيفة', 'Add a set to your weaker muscles'], ['7 إلى 9 ساعات نوم', '7 to 9 hours of sleep']]],
      [4, 'قياس ومراجعة', 'Check-in', [['قياسات جديدة وصور', 'New measurements and photos'], ['عدّل الأكل لو الوزن ثابت', 'Adjust food if weight is stuck']]],
      [5, 'شدة أعلى', 'Higher intensity', [['اقترب من الفشل في آخر مجموعة', 'Take the last set close to failure']]],
      [6, 'كمل بثبات', 'Stay consistent', [['حافظ على الأيام الأربعة والأكل', 'Keep the four days and the eating plan']]],
      [7, 'تخفيف خفيف', 'Light deload', [['خفف الأوزان 20% وارتاح', 'Reduce weights by 20% and recover']]],
      [8, 'القياس النهائي', 'Final check', [['قياسات وصور نهائية ومقارنة', 'Final measurements, photos and comparison'], ['خطط للدورة الجاية', 'Plan the next block']]]
    ]) },
  { id: 'strength4', goal: 'fitness', sport: 'general', level: 'beginner', weeks: 4, color: C.slate, big: '4w', spec: 'coach', plan: { goal: 'fitness', days: 3 },
    title: { ar: 'ابدأ لياقتك', en: 'Start your fitness' }, sub: { ar: 'للمبتدئين · 3 أيام أسبوعيًا', en: 'For beginners · 3 days a week' },
    steps: steps([
      [1, 'تعوّد الحركة', 'Learn the moves', [['3 أيام جسم كامل بأوزان خفيفة', '3 full-body days with light weights'], ['مشي 20 دقيقة في أيام الراحة', '20-minute walks on rest days']]],
      [2, 'ثبّت العادة', 'Lock in the habit', [['نفس الأيام والمواعيد', 'Same days and times'], ['زود تكرار أو وزن بسيط', 'Add a small amount of reps or weight']]],
      [3, 'قوة أكتر', 'More strength', [['أضف تمرين سحب وتمرين دفع', 'Add one pull and one push exercise']]],
      [4, 'قياس التقدم', 'Measure progress', [['اختبار: عدد الضغط والسكوات في دقيقة', 'Test: push-ups and squats in one minute'], ['اختار رحلتك الجاية', 'Pick your next journey']]]
    ]) },
  { id: 'home6', goal: 'fitness', sport: 'calisthenics', level: 'beginner', weeks: 6, color: C.teal, big: 'HOME', spec: 'coach', plan: { goal: 'fitness', days: 3, equip: 'home' },
    title: { ar: 'تمرين في البيت', en: 'Home workout' }, sub: { ar: 'من غير أجهزة · 6 أسابيع', en: 'No equipment · 6 weeks' },
    steps: steps([
      [1, 'أساسيات', 'Basics', [['ضغط (على الركبة لو محتاج) وسكوات ولانجز', 'Push-ups (on knees if needed), squats and lunges'], ['3 أيام أسبوعيًا', '3 days a week']]],
      [2, 'عدد أكتر', 'More reps', [['زود 2 تكرار في كل تمرين', 'Add 2 reps to each exercise']]],
      [3, 'ثبات الجسم', 'Core control', [['أضف بلانك وجسر الجلوتس', 'Add plank and glute bridge']]],
      [4, 'دوائر', 'Circuits', [['3 دوائر من 5 تمارين بدون راحة طويلة', '3 circuits of 5 exercises with short rest']]],
      [5, 'صعوبة أعلى', 'Harder variations', [['ضغط عادي وسكوات قفز', 'Full push-ups and jump squats']]],
      [6, 'اختبار', 'Test', [['اختبر نفسك وقارن بالأسبوع الأول', 'Retest yourself against week 1']]]
    ]) },
  { id: 'pullup8', goal: 'muscle', sport: 'calisthenics', level: 'intermediate', weeks: 8, color: C.slate, big: '1', spec: 'coach',
    title: { ar: 'أول عقلة (Pull-up)', en: 'Your first pull-up' }, sub: { ar: 'تقوية السحب · 8 أسابيع', en: 'Build pulling strength · 8 weeks' },
    steps: steps([
      [1, 'تعليق', 'Hangs', [['تعليق على العقلة 3 × 20 ثانية', 'Dead hang 3 x 20 s'], ['تجديف بالدمبل أو الكابل', 'Rows with dumbbells or cable']]],
      [2, 'سحب بمساعدة', 'Assisted pulls', [['عقلة بشريط مطاط أو جهاز', 'Band or machine assisted pull-ups'], ['3 × 6', '3 x 6']]],
      [3, 'نزول بطيء', 'Negatives', [['اطلع بالقفز وانزل في 5 ثواني', 'Jump up, lower in 5 seconds'], ['3 × 5', '3 x 5']]],
      [4, 'تخفيف', 'Light week', [['تمارين الظهر بحمل أخف', 'Lighter back work']]],
      [5, 'مساعدة أقل', 'Less assistance', [['قلل المساعدة تدريجيًا', 'Reduce assistance step by step']]],
      [6, 'نصف العقلة', 'Partial reps', [['اسحب لنصف المدى بدون مساعدة', 'Partial range reps unassisted']]],
      [7, 'محاولات', 'Attempts', [['حاول عقلة كاملة بعد تسخين جيد', 'Try a full pull-up after a good warm-up']]],
      [8, 'أول عقلة', 'First rep', [['سجل أول عقلة وكمل للتكرارات', 'Log your first rep and keep building']]]
    ]) },
  { id: 'fatloss8', goal: 'fat', sport: 'general', level: 'beginner', weeks: 8, color: C.teal, big: '5kg', spec: 'nutritionist', plan: { goal: 'fat', days: 4 }, program: 'cut_light',
    title: { ar: 'اخسّ دهون بأمان', en: 'Lose fat safely' }, sub: { ar: 'تمرين + أكل · 8 أسابيع', en: 'Training + food · 8 weeks' },
    steps: steps([
      [1, 'ابدأ بعجز بسيط', 'Start with a small deficit', [['اتبع خطة أكل بعجز هادي', 'Follow a gentle-deficit eating plan'], ['مشي 8 آلاف خطوة يوميًا', '8,000 steps a day']]],
      [2, 'بروتين وتمرين قوة', 'Protein and strength', [['3 أيام قوة لحماية العضل', '3 strength days to protect muscle'], ['شرب مياه كفاية', 'Drink enough water']]],
      [3, 'ثبّت الروتين', 'Hold the routine', [['وزّن نفسك مرة أسبوعيًا بنفس الظروف', 'Weigh yourself weekly under the same conditions']]],
      [4, 'مراجعة', 'Review', [['قس الخصر وقارن الصور', 'Measure waist and compare photos']]],
      [5, 'كمل بثبات', 'Stay steady', [['زود الخطوات 1000', 'Add 1,000 steps']]],
      [6, 'كسر الثبات', 'Plateau check', [['راجع الكميات لو الوزن واقف', 'Review portions if weight has stalled']]],
      [7, 'قوة وكارديو', 'Strength and cardio', [['كارديو خفيف 2 مرة', 'Two light cardio sessions']]],
      [8, 'قياس نهائي', 'Final check', [['قياسات نهائية وخطة للحفاظ على الوزن', 'Final measurements and a maintenance plan']]]
    ]) },
  /* ------------------------------ رياضات ------------------------------ */
  { id: 'football6', goal: 'performance', sport: 'football', level: 'intermediate', weeks: 6, color: C.green, big: 'FIT', spec: 'coach',
    title: { ar: 'لياقة لاعب كرة القدم', en: 'Footballer fitness' }, sub: { ar: 'تحمل وسرعة وتغيير اتجاه · 6 أسابيع', en: 'Endurance, speed and agility · 6 weeks' },
    steps: steps([
      [1, 'قاعدة هوائية', 'Aerobic base', [['جري متواصل 25 دقيقة مرتين', 'Two 25-minute continuous runs'], ['تمرين قوة للرجلين', 'Leg strength session']]],
      [2, 'تكرارات', 'Intervals', [['6 × 2 دقيقة جري سريع وراحة دقيقتين', '6 x 2 min fast running with 2 min rest']]],
      [3, 'رشاقة', 'Agility', [['تمارين مخروطات وتغيير اتجاه', 'Cone drills and change of direction']]],
      [4, 'تخفيف', 'Recovery week', [['حجم أقل وإطالات', 'Lower volume and stretching']]],
      [5, 'سرعة', 'Speed', [['انطلاقات 20 إلى 30 متر', '20 to 30 m sprints'], ['قفزات خفيفة', 'Light plyometrics']]],
      [6, 'ما قبل المباريات', 'Match readiness', [['مباراة تجريبية وتحكم في الحمل', 'Practice match with load control']]]
    ]) },
  { id: 'swim1k', goal: 'performance', sport: 'swimming', level: 'beginner', weeks: 6, color: C.blue, big: '1km', spec: 'coach',
    title: { ar: 'اسبح كيلو كامل', en: 'Swim 1 km' }, sub: { ar: 'من 200 متر لكيلو · 6 أسابيع', en: 'From 200 m to 1 km · 6 weeks' },
    steps: steps([
      [1, 'تنفس وأسلوب', 'Breathing and technique', [['8 × 25 متر مع راحة 30 ثانية', '8 x 25 m with 30 s rest'], ['تمارين تنفس على الحيط', 'Wall breathing drills']]],
      [2, '200 متر', '200 m', [['4 × 50 متر', '4 x 50 m']]],
      [3, '400 متر', '400 m', [['2 × 200 متر', '2 x 200 m']]],
      [4, '600 متر', '600 m', [['3 × 200 متر مع راحة قصيرة', '3 x 200 m with short rest']]],
      [5, '800 متر', '800 m', [['2 × 400 متر', '2 x 400 m']]],
      [6, 'كيلو', '1 km', [['حاول 1000 متر متواصلة بهدوء', 'Try 1,000 m continuous at an easy pace']]]
    ]) },
  { id: 'cycle50', goal: 'performance', sport: 'cycling', level: 'intermediate', weeks: 8, color: C.gold, big: '50K', spec: 'coach',
    title: { ar: 'دراجة 50 كم', en: 'Cycle 50 km' }, sub: { ar: 'تحمل على الدراجة · 8 أسابيع', en: 'Build cycling endurance · 8 weeks' },
    steps: steps([
      [1, 'ابدأ بـ 20 كم', 'Start at 20 km', [['3 خروجات: 10 و10 و20 كم', '3 rides: 10, 10 and 20 km']]],
      [2, '25 كم', '25 km', [['زود الخروجة الطويلة 5 كم', 'Add 5 km to the long ride']]],
      [3, '30 كم', '30 km', [['اتدرب على الطلوع في خروجة واحدة', 'Practice hills on one ride']]],
      [4, 'تخفيف', 'Recovery week', [['خروجات قصيرة سهلة', 'Short easy rides']]],
      [5, '35 كم', '35 km', [['اشرب كل 15 دقيقة', 'Sip water every 15 minutes']]],
      [6, '40 كم', '40 km', [['خروجة بسرعة ثابتة', 'Steady-pace ride']]],
      [7, '45 كم', '45 km', [['كل وجبة خفيفة في النص', 'Eat a light snack halfway']]],
      [8, '50 كم', '50 km', [['الخروجة الكبيرة 50 كم', 'The big 50 km ride']]]
    ]) },
  { id: 'boxing6', goal: 'performance', sport: 'boxing', level: 'beginner', weeks: 6, color: C.red, big: 'BOX', spec: 'coach',
    title: { ar: 'أساسيات الملاكمة', en: 'Boxing basics' }, sub: { ar: 'وقفة وضربات ولياقة · 6 أسابيع', en: 'Stance, punches and conditioning · 6 weeks' },
    steps: steps([
      [1, 'الوقفة والحركة', 'Stance and footwork', [['وقفة ثابتة وحركة قدمين 3 جولات', 'Stance and footwork, 3 rounds']]],
      [2, 'الجاب والكروس', 'Jab and cross', [['تكرار الجاب والكروس على الظل', 'Shadow boxing jab and cross']]],
      [3, 'الهوك والدفاع', 'Hook and defense', [['ضيف الهوك وحركة الرأس', 'Add hook and head movement']]],
      [4, 'كومبو', 'Combinations', [['5 جولات كومبو على الكيس', '5 bag rounds of combos']]],
      [5, 'لياقة', 'Conditioning', [['نط الحبل 5 جولات', 'Skipping rope, 5 rounds']]],
      [6, 'جولات كاملة', 'Full rounds', [['6 جولات 3 دقايق على الكيس', '6 x 3-min bag rounds']]]
    ]) },
  { id: 'cf6', goal: 'performance', sport: 'crossfit', level: 'beginner', weeks: 6, color: C.purple, big: 'CF', spec: 'coach',
    title: { ar: 'مقدمة كروسفت', en: 'CrossFit intro' }, sub: { ar: 'حركات أساسية بأمان · 6 أسابيع', en: 'Fundamental movements safely · 6 weeks' },
    steps: steps([
      [1, 'حركات الجسم', 'Bodyweight movements', [['سكوات وضغط وسحب بالشريط', 'Squats, push-ups and banded pulls']]],
      [2, 'تحميل خفيف', 'Light loading', [['ديدليفت وبرس بأوزان خفيفة جدًا', 'Deadlift and press with very light loads']]],
      [3, 'دوائر قصيرة', 'Short circuits', [['AMRAP 8 دقايق', '8-minute AMRAP']]],
      [4, 'تخفيف', 'Recovery week', [['حجم أقل وتحرك مرن', 'Lower volume and mobility']]],
      [5, 'نفس أطول', 'More capacity', [['AMRAP 12 دقيقة', '12-minute AMRAP']]],
      [6, 'اختبار', 'Benchmark', [['اختبر دورة وقارنها بالأسبوع الثالث', 'Repeat a circuit and compare to week 3']]]
    ]) },
  { id: 'yoga30', goal: 'fitness', sport: 'yoga', level: 'beginner', weeks: 4, color: C.teal, big: '30', spec: 'coach',
    title: { ar: 'يوجا 30 يوم', en: '30 days of yoga' }, sub: { ar: 'مرونة وهدوء · 4 أسابيع', en: 'Flexibility and calm · 4 weeks' },
    steps: steps([
      [1, 'تنفس وإطالة', 'Breath and stretch', [['10 دقايق يوميًا', '10 minutes daily']]],
      [2, 'وضعيات أساسية', 'Foundational poses', [['15 دقيقة، وضعيات الوقوف', '15 minutes of standing poses']]],
      [3, 'توازن وثبات', 'Balance and core', [['20 دقيقة مع توازن', '20 minutes including balance']]],
      [4, 'روتين كامل', 'Full routine', [['30 دقيقة روتين كامل', 'A full 30-minute routine']]]
    ]) },
  /* ------------------------------ تأهيل (مراحل عامة) ------------------------------ */
  { id: 'rehab_knee', goal: 'rehab', injury: 'knee', level: 'beginner', weeks: 12, color: C.purple, big: 'KNEE', spec: 'rehab', note: REHAB_NOTE,
    title: { ar: 'ارجع بعد وجع الركبة', en: 'Return after knee pain' }, sub: { ar: 'مع متخصص التأهيل · مراحل عامة', en: 'With a rehab specialist · general phases' },
    steps: steps([
      [1, 'تهدئة وحماية', 'Calm and protect', [['قلل الأنشطة اللي بتزود الوجع', 'Reduce activities that increase pain'], ['حركة خفيفة بدون وجع', 'Gentle pain-free movement']]],
      [2, 'مدى الحركة', 'Range of motion', [['ثني ومد الركبة بدون وجع', 'Pain-free bending and straightening']]],
      [3, 'تنشيط العضلات', 'Muscle activation', [['شد الفخذ الأمامي ورفع الساق مستقيمة', 'Quad sets and straight-leg raises']]],
      [4, 'تقوية أولية', 'Early strengthening', [['جسر الجلوتس وجلسة حائط خفيفة', 'Glute bridges and light wall sits']]],
      [6, 'تقوية', 'Strengthening', [['سكوات جزئي وخطوة على سلمة', 'Partial squats and step-ups']]],
      [8, 'توازن', 'Balance', [['وقفة على رجل واحدة', 'Single-leg stance']]],
      [10, 'نشاط تدريجي', 'Gradual activity', [['مشي سريع ثم جري خفيف لو متخصصك وافق', 'Brisk walking then light jogging if your specialist agrees']]],
      [12, 'العودة للرياضة', 'Return to sport', [['حدّد مع متخصصك معايير العودة للملعب', 'Agree return-to-sport criteria with your specialist']]]
    ]) },
  { id: 'rehab_shoulder', goal: 'rehab', injury: 'shoulder', level: 'beginner', weeks: 8, color: C.purple, big: 'SHLD', spec: 'rehab', note: REHAB_NOTE,
    title: { ar: 'ارجع بعد وجع الكتف', en: 'Return after shoulder pain' }, sub: { ar: 'مراحل عامة · مع متخصص', en: 'General phases · with a specialist' },
    steps: steps([
      [1, 'تهدئة', 'Calm', [['تجنب الحركات فوق الراس المؤلمة', 'Avoid painful overhead movement'], ['حركة البندول الخفيفة', 'Gentle pendulum swings']]],
      [2, 'حركة سلبية', 'Gentle range', [['رفع الذراع بمساعدة الذراع الثانية', 'Assisted arm raises with the other arm']]],
      [3, 'ثبات لوح الكتف', 'Shoulder blade control', [['ضم لوحي الكتف وسحب بالشريط', 'Scapular squeezes and band pulls']]],
      [5, 'تقوية الكفة', 'Rotator cuff', [['دوران خارجي بالشريط', 'External rotation with a band']]],
      [7, 'قوة وظيفية', 'Functional strength', [['ضغط وسحب بأوزان خفيفة', 'Pressing and pulling with light weights']]],
      [8, 'عودة تدريجية', 'Gradual return', [['ارجع للتمرين بحمل أقل وزود تدريجيًا', 'Return with lighter loads and progress slowly']]]
    ]) },
  { id: 'rehab_back', goal: 'rehab', injury: 'low_back', level: 'beginner', weeks: 6, color: C.purple, big: 'BACK', spec: 'rehab', note: REHAB_NOTE,
    title: { ar: 'ارجع بعد وجع أسفل الظهر', en: 'Return after lower back pain' }, sub: { ar: 'مراحل عامة · مع متخصص', en: 'General phases · with a specialist' },
    steps: steps([
      [1, 'حركة خفيفة', 'Keep gently moving', [['مشي قصير متكرر', 'Short frequent walks'], ['تجنب الراحة الطويلة جدًا', 'Avoid long bed rest']]],
      [2, 'مرونة', 'Mobility', [['حركة الحوض وقطة جمل', 'Pelvic tilts and cat-camel']]],
      [3, 'ثبات الجذع', 'Core stability', [['بيرد دوج وبلانك قصير', 'Bird-dog and short planks']]],
      [4, 'جسر الجلوتس', 'Glute strength', [['جسر الجلوتس 3 × 12', 'Glute bridge 3 x 12']]],
      [5, 'وظيفي', 'Functional', [['رفع من الأرض بوضع صح بوزن خفيف', 'Light lifts from the floor with good form']]],
      [6, 'استمرار', 'Keep going', [['روتين أسبوعي للوقاية', 'A weekly routine for prevention']]]
    ]) },
  { id: 'rehab_ankle', goal: 'rehab', injury: 'ankle', level: 'beginner', weeks: 6, color: C.purple, big: 'ANKLE', spec: 'rehab', note: REHAB_NOTE,
    title: { ar: 'ارجع بعد التواء الكاحل', en: 'Return after an ankle sprain' }, sub: { ar: 'مراحل عامة · مع متخصص', en: 'General phases · with a specialist' },
    steps: steps([
      [1, 'حماية', 'Protect', [['قلل الوزن على القدم لو بتوجع', 'Reduce load on the foot if painful'], ['حركة أصابع وكاحل خفيفة', 'Gentle toe and ankle movement']]],
      [2, 'مدى الحركة', 'Range of motion', [['كتابة الحروف بالقدم في الهوا', 'Draw the alphabet with your foot']]],
      [3, 'تقوية', 'Strength', [['رفع الكعب وشريط المقاومة', 'Calf raises and band resistance']]],
      [4, 'توازن', 'Balance', [['وقفة على رجل واحدة 30 ثانية', 'Single-leg stance for 30 seconds']]],
      [5, 'حركة جانبية', 'Side-to-side', [['خطوات جانبية بالشريط', 'Banded side steps']]],
      [6, 'عودة', 'Return', [['جري خفيف على سطح مستوي لو مفيش وجع', 'Easy jogging on flat ground if pain-free']]]
    ]) },
  { id: 'rehab_neck', goal: 'rehab', injury: 'neck', level: 'beginner', weeks: 4, color: C.purple, big: 'NECK', spec: 'rehab', note: REHAB_NOTE,
    title: { ar: 'الرقبة والوضعية', en: 'Neck and posture' }, sub: { ar: 'لمن يقعد كتير · 4 أسابيع', en: 'For long sitting hours · 4 weeks' },
    steps: steps([
      [1, 'وعي بالوضعية', 'Posture awareness', [['كل ساعة قوم وحرك رقبتك وكتفك', 'Every hour stand and move neck and shoulders']]],
      [2, 'إطالة', 'Stretching', [['إطالة الرقبة والصدر', 'Neck and chest stretches']]],
      [3, 'تقوية', 'Strengthening', [['سحب الذقن للخلف وتجديف بالشريط', 'Chin tucks and band rows']]],
      [4, 'عادة يومية', 'Daily habit', [['روتين 5 دقايق يوميًا', 'A 5-minute daily routine']]]
    ]) },
  /* ------------------------------ نظام أكل ------------------------------ */
  { id: 'diet_cut', goal: 'nutrition', diet: 'cut', level: 'beginner', weeks: 4, color: C.teal, big: 'CUT', spec: 'nutritionist', program: 'cut_light',
    title: { ar: 'تنشيف هادي', en: 'Gentle cutting' }, sub: { ar: 'أكل مصري عادي · 4 أسابيع', en: 'Everyday Egyptian food · 4 weeks' },
    steps: steps([
      [1, 'ابدأ الخطة', 'Start the plan', [['اتبع خطة الأكل وسجل وجباتك', 'Follow the plan and log meals']]],
      [2, 'بروتين', 'Protein', [['بروتين في كل وجبة رئيسية', 'Protein in every main meal']]],
      [3, 'مراجعة', 'Review', [['وزن وقياسات وتعديل الكميات', 'Weight, measurements and portion tweaks']]],
      [4, 'ثبات', 'Consistency', [['حافظ على العادات وخطط للشهر الجاي', 'Keep the habits and plan next month']]]
    ]) },
  { id: 'diet_bulk', goal: 'nutrition', diet: 'bulk', level: 'beginner', weeks: 8, color: C.brown, big: 'BULK', spec: 'nutritionist', program: 'bulk',
    title: { ar: 'تضخيم نضيف', en: 'Lean bulking' }, sub: { ar: 'زيادة وزن تدريجية · 8 أسابيع', en: 'Gradual weight gain · 8 weeks' },
    steps: steps([
      [1, 'فائض بسيط', 'Small surplus', [['اتبع خطة التضخيم وسجل الأكل', 'Follow the bulking plan and log meals']]],
      [3, 'قياس', 'Check', [['وزن أسبوعي، زيادة 0.25 إلى 0.5 كجم', 'Weekly weight, gain 0.25 to 0.5 kg']]],
      [5, 'تعديل', 'Adjust', [['زود سعرات لو الوزن ثابت', 'Add calories if weight stalls']]],
      [8, 'مراجعة', 'Review', [['قياسات وصور ومقارنة', 'Measurements, photos and comparison']]]
    ]) },
  { id: 'diet_fasting', goal: 'nutrition', diet: 'fasting', level: 'beginner', weeks: 4, color: C.slate, big: '16:8', spec: 'nutritionist', program: 'fasting_2meals',
    title: { ar: 'صيام متقطع 16:8', en: 'Intermittent fasting 16:8' }, sub: { ar: 'نافذة أكل 8 ساعات · 4 أسابيع', en: '8-hour eating window · 4 weeks' },
    steps: steps([
      [1, '12:12', '12:12', [['نافذة أكل 12 ساعة للبداية', 'Start with a 12-hour eating window']]],
      [2, '14:10', '14:10', [['اقفل نافذة الأكل 10 ساعات', 'Narrow the window to 10 hours']]],
      [3, '16:8', '16:8', [['نافذة أكل 8 ساعات', 'An 8-hour eating window']]],
      [4, 'ثبات', 'Consistency', [['حافظ على النافذة وشرب مياه كفاية', 'Keep the window and drink plenty of water']]]
    ]) },
  { id: 'diet_veg', goal: 'nutrition', diet: 'vegetarian', level: 'beginner', weeks: 4, color: C.green, big: 'VEG', spec: 'nutritionist', program: 'vegetarian',
    title: { ar: 'أكل نباتي متوازن', en: 'Balanced vegetarian eating' }, sub: { ar: 'بروتين من مصادر نباتية · 4 أسابيع', en: 'Plant protein sources · 4 weeks' },
    steps: steps([
      [1, 'مصادر البروتين', 'Protein sources', [['فول وعدس وبقوليات وبيض وألبان', 'Beans, lentils, legumes, eggs and dairy']]],
      [2, 'تنويع', 'Variety', [['نوّع الألوان في الطبق', 'Add colour variety to your plate']]],
      [3, 'مراجعة العناصر', 'Nutrient check', [['اسأل أخصائي عن الحديد وB12', 'Ask a specialist about iron and B12']]],
      [4, 'ثبات', 'Consistency', [['حافظ على الروتين', 'Keep the routine']]]
    ]) },
  { id: 'diet_ramadan', goal: 'nutrition', diet: 'ramadan', level: 'beginner', weeks: 4, color: C.gold, big: 'RMD', spec: 'nutritionist', program: 'ramadan',
    title: { ar: 'تغذية وتمرين في رمضان', en: 'Ramadan nutrition and training' }, sub: { ar: 'فطار وسحور وتمرين خفيف', en: 'Iftar, suhoor and light training' },
    steps: steps([
      [1, 'فطار متوازن', 'Balanced iftar', [['ابدأ بتمر ومياه ثم وجبة متوازنة', 'Start with dates and water then a balanced meal']]],
      [2, 'سحور', 'Suhoor', [['بروتين وكارب بطيء وسوائل', 'Protein, slow carbs and fluids']]],
      [3, 'تمرين خفيف', 'Light training', [['تمرين بعد الفطار بساعة تقريبًا', 'Train about an hour after iftar']]],
      [4, 'نوم', 'Sleep', [['حاول تنام 7 ساعات مقسمة', 'Aim for 7 hours of sleep, split if needed']]]
    ]) }
];
