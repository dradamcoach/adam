/*
 * ADAM Program Builder - SAMPLE catalog, people and programs (Phase 3 prototype)
 *
 * Everything here is SAMPLE data written for this prototype: invented people, invented programs,
 * and short original exercise instructions. No images, videos or third-party exercise media are used.
 * It is NOT connected to the app's real exercise libraries (exercise-library.js, drills-library.js);
 * the picker reads ADAM_BUILDER_DATA.api.catalog(), so a later step can swap in the real libraries.
 * No Firebase, Auth, Firestore or network is used.
 */
(function (root) {
  'use strict';

  var CATS = {
    strength:     { ar: 'قوة',                 en: 'Strength' },
    crossfit:     { ar: 'كروس فيت',            en: 'CrossFit' },
    hyrox:        { ar: 'هايروكس',             en: 'HYROX' },
    agility:      { ar: 'رشاقة (سلالم وحواجز وأقماع)', en: 'Agility (ladders, hurdles, cones)' },
    conditioning: { ar: 'كارديو وتكييف',       en: 'Conditioning' },
    bands:        { ar: 'كاوتش مطاطي (سحب ومقاومة)', en: 'Resistance bands (pulls)' },
    ropes:        { ar: 'حبال',                en: 'Ropes' },
    climbing:     { ar: 'تسلّق صناعي',         en: 'Climbing wall' },
    rehab:        { ar: 'تأهيل',               en: 'Rehab' },
    mobility:     { ar: 'مرونة',               en: 'Mobility' }
  };

  var METRICS = {
    reps:     { ar: 'تكرارات', en: 'reps' },
    time:     { ar: 'ثانية',   en: 'sec' },
    distance: { ar: 'متر',     en: 'm' },
    cals:     { ar: 'سعر',     en: 'cal' }
  };

  /* X(id, arName, enName, cat, equipment, metric, sets, value, restSec, howAr, howEn, impact) */
  var LIST = [];
  function X(id, an, en, cat, eq, metric, sets, val, rest, ha, he, impact) {
    LIST.push({ id: id, name: { ar: an, en: en }, cat: cat, equip: eq, metric: metric, sets: sets, val: val, rest: rest, how: { ar: ha, en: he }, impact: impact || 'low' });
  }

  /* ---- strength ---- */
  X('bx_squat', 'سكوات بالبار', 'Back squat', 'strength', 'barbell', 'reps', 4, 6, 120, 'البار على الكتف الخلفي، انزل لحد ما تتوازى الفخذين مع الأرض والضهر محايد، واطلع بقوة.', 'Bar on the upper back, descend until thighs are parallel with a neutral spine, drive up.');
  X('bx_rdl', 'ديدلفت روماني', 'Romanian deadlift', 'strength', 'barbell', 'reps', 3, 8, 90, 'ركب مفتوحة شوية، ادفع الحوض لورا والبار قريب من الرجلين لحد ما تحس بشد في الهامسترينج.', 'Soft knees, push the hips back with the bar close to the legs until the hamstrings stretch.');
  X('bx_bench', 'بنش بريس', 'Bench press', 'strength', 'barbell', 'reps', 4, 8, 90, 'كتفين مشدودين لورا، انزل البار لنص الصدر وادفع لفوق بتحكّم.', 'Shoulders set back, lower the bar to mid-chest and press up under control.');
  X('bx_row', 'سحب بالبار منحني', 'Bent-over row', 'strength', 'barbell', 'reps', 3, 10, 90, 'ضهر مستقيم ومنحني للأمام، اسحب البار ناحية البطن بدون ما تتأرجح.', 'Hinge forward with a flat back and pull the bar to the belly without swinging.');
  X('bx_ohp', 'ضغط كتف واقف', 'Standing overhead press', 'strength', 'dumbbell', 'reps', 3, 8, 90, 'بطن مشدودة، ادفع الدمبلين فوق الراس بدون ما تقوّس الضهر.', 'Brace the abs and press the dumbbells overhead without arching the back.');
  X('bx_pullup', 'عقلة', 'Pull-up', 'strength', 'pull-up bar', 'reps', 4, 6, 90, 'اسحب لحد ما الدقن تعدّي البار، وانزل بتحكّم لآخر الذراع.', 'Pull until the chin clears the bar and lower under control to full extension.');
  X('bx_lunge', 'لانج متبادل', 'Walking lunge', 'strength', 'dumbbell', 'reps', 3, 12, 60, 'خطوة كبيرة لقدّام، الركبة الأمامية فوق الكعب، وانزل عمودي.', 'Long step forward, front knee over the heel, lower straight down.');
  X('bx_plank', 'بلانك', 'Plank', 'strength', 'body only', 'time', 3, 45, 45, 'جسم في خط مستقيم من الكتف للكعب، بطن وجلوتس مشدودين.', 'Body in one line from shoulders to heels with abs and glutes tight.');

  /* ---- CrossFit ---- */
  X('bx_thruster', 'ثراستر', 'Thruster', 'crossfit', 'barbell', 'reps', 3, 10, 90, 'سكوات أمامي ثم دفع البار فوق الراس في حركة واحدة متصلة.', 'A front squat flowing straight into an overhead press in one movement.', 'high');
  X('bx_wallball', 'وول بول', 'Wall ball', 'crossfit', 'wall ball', 'reps', 3, 15, 60, 'سكوات كامل وارمِ الكرة على علامة عالية على الحيطة واستقبلها على الصدر.', 'Full squat then throw the ball to a high target and catch it at the chest.', 'high');
  X('bx_burpee', 'بيربي', 'Burpee', 'crossfit', 'body only', 'reps', 3, 10, 60, 'انزل لبلانك والصدر يلمس الأرض ثم اقفز لفوق.', 'Drop to a plank with the chest to the floor, then jump up.', 'high');
  X('bx_boxjump', 'قفز على بوكس', 'Box jump', 'crossfit', 'box', 'reps', 4, 6, 90, 'اقفز بالرجلين على البوكس وانزل بالخطوة مش بالقفز.', 'Jump with both feet onto the box and step down rather than jump down.', 'high');
  X('bx_du', 'دابل أندر', 'Double under', 'crossfit', 'jump rope', 'reps', 4, 30, 60, 'نطة واحدة والحبل يعدّي مرتين، الحركة من الرسغ.', 'One jump, two rope passes; the movement comes from the wrists.', 'high');
  X('bx_kbswing', 'سوينج كيتل بيل', 'Kettlebell swing', 'crossfit', 'kettlebells', 'reps', 4, 15, 60, 'الحركة من الحوض مش من الذراع، والضهر محايد.', 'Drive from the hips, not the arms, with a neutral back.');
  X('bx_t2b', 'رجلين للبار', 'Toes-to-bar', 'crossfit', 'pull-up bar', 'reps', 3, 8, 75, 'معلّق على البار، ارفع أصابع رجليك للبار بتحكّم.', 'Hang from the bar and lift the toes to it under control.');

  /* ---- HYROX ---- */
  X('bx_hx_ski', 'سكي إرج (هايروكس)', 'SkiErg (HYROX)', 'hyrox', 'ski erg', 'distance', 1, 1000, 0, 'شدّ بالكتفين والبطن مش بالذراعين بس، إيقاع ثابت.', 'Pull with the lats and core, not just the arms, at a steady rhythm.');
  X('bx_hx_sledpush', 'دفع سليد (هايروكس)', 'Sled push (HYROX)', 'hyrox', 'sled', 'distance', 4, 12, 60, 'جسم مائل وخطوات قصيرة قوية، الضغط من الرجلين.', 'Lean in and drive with short powerful steps from the legs.');
  X('bx_hx_sledpull', 'سحب سليد (هايروكس)', 'Sled pull (HYROX)', 'hyrox', 'sled', 'distance', 4, 12, 60, 'اسحب الحبل يد على يد وانت ماشي لورا بثبات.', 'Pull the rope hand over hand while stepping back steadily.');
  X('bx_hx_burpeebj', 'بيربي ونط عريض (هايروكس)', 'Burpee broad jump (HYROX)', 'hyrox', 'body only', 'distance', 1, 80, 0, 'بيربي ثم نطة عريضة لقدّام، كرّر لحد المسافة.', 'A burpee followed by a broad jump forward; repeat for the distance.', 'high');
  X('bx_hx_row', 'روينج (هايروكس)', 'Rowing (HYROX)', 'hyrox', 'rower', 'distance', 1, 1000, 0, 'رجلين ثم ضهر ثم ذراع، والرجوع بالعكس.', 'Legs, then back, then arms; return in reverse order.');
  X('bx_hx_farmers', 'مشي حمل (هايروكس)', 'Farmers carry (HYROX)', 'hyrox', 'kettlebells', 'distance', 3, 50, 60, 'حِمل تقيل في الإيدين، كتف لأسفل وخطوات ثابتة.', 'Heavy weights in both hands, shoulders down, steady steps.');
  X('bx_hx_lunges', 'لانج بشنطة رمل (هايروكس)', 'Sandbag lunges (HYROX)', 'hyrox', 'sandbag', 'distance', 1, 100, 0, 'شنطة الرمل على الكتفين، لانج متبادل بخطوات ثابتة.', 'Sandbag across the shoulders, alternating lunges with steady steps.');
  X('bx_hx_run', 'جري 1 كم (هايروكس)', '1 km run (HYROX)', 'hyrox', 'body only', 'distance', 1, 1000, 0, 'جري بسرعة ثابتة بين محطات التمرين.', 'Run at an even pace between stations.');

  /* ---- agility: ladders, hurdles, cones ---- */
  X('bx_ladder_ickey', 'سلم رشاقة: إيكي شافل', 'Ladder: Ickey shuffle', 'agility', 'ladder', 'time', 4, 30, 30, 'خطوتين جانبيتين داخل كل مربع وخارج، خفة في القدمين.', 'Two quick steps in each square with an in-in-out rhythm and light feet.', 'medium');
  X('bx_ladder_lateral', 'سلم رشاقة: جانبي', 'Ladder: lateral run', 'agility', 'ladder', 'time', 4, 30, 30, 'جري جانبي سريع داخل السلم، العين لقدّام.', 'Fast lateral steps through the ladder with eyes up.', 'medium');
  X('bx_hurdle_hops', 'حواجز: نطات متتالية', 'Hurdles: continuous hops', 'agility', 'hurdles', 'reps', 4, 6, 60, 'اقفز بالرجلين فوق الحواجز بأقل وقت على الأرض.', 'Hop over the hurdles with both feet and minimal ground contact.', 'high');
  X('bx_hurdle_walk', 'حواجز: مشي فوقها', 'Hurdles: walk-overs', 'agility', 'hurdles', 'reps', 3, 8, 45, 'ارفع الركبة والحوض مفتوح وانت معدّي الحاجز، حركة بطيئة بتحكّم.', 'Lift the knee and open the hip while stepping over, slow and controlled.');
  X('bx_cone_5105', 'أقماع: 5-10-5', 'Cones: 5-10-5 shuttle', 'agility', 'cones', 'reps', 5, 1, 60, 'ثلاث أقماع بمسافة 5 متر، لمس الخط وتغيير اتجاه سريع.', 'Three cones 5 m apart: touch each line and change direction quickly.', 'high');
  X('bx_cone_t', 'أقماع: تمرين T', 'Cones: T-drill', 'agility', 'cones', 'reps', 5, 1, 60, 'عدو لقدّام ثم جانبي يمين وشمال ثم رجوع بظهرك.', 'Sprint forward, shuffle left and right, then backpedal.', 'high');
  X('bx_cone_zig', 'أقماع: زجزاج', 'Cones: zigzag weave', 'agility', 'cones', 'reps', 5, 1, 45, 'جري متعرّج بين الأقماع بخطوات قصيرة.', 'Weave between cones with short quick steps.', 'medium');

  /* ---- conditioning ---- */
  X('bx_assault', 'عجلة هوائية فترات', 'Assault bike intervals', 'conditioning', 'assault bike', 'time', 6, 30, 90, 'جهد عالي لمدة الفترة ثم راحة كاملة.', 'High effort for the interval then full rest.');
  X('bx_tabata', 'تاباتا', 'Tabata block', 'conditioning', 'body only', 'time', 8, 20, 10, '20 ثانية جهد و10 راحة لـ8 جولات على حركة واحدة.', '20 s work and 10 s rest for 8 rounds on one movement.', 'high');
  X('bx_jumprope', 'نط حبل فترات', 'Jump rope intervals', 'conditioning', 'jump rope', 'time', 5, 60, 30, 'نطات خفيفة بإيقاع ثابت على الرسغ.', 'Light, steady jumps driven by the wrists.', 'medium');
  X('bx_sledrag', 'جر سليد', 'Sled drag', 'conditioning', 'sled', 'distance', 4, 20, 60, 'امشي لورا وانت بتجر السليد، ضهر مستقيم.', 'Walk backwards dragging the sled with a straight back.');

  /* ---- resistance bands (rubber-band pulls) ---- */
  X('bx_band_pullapart', 'سحب كاوتش للجانبين', 'Band pull-apart', 'bands', 'bands', 'reps', 3, 15, 45, 'امسك الكاوتش قدّام الصدر واسحبه للجانبين لحد ما تتلامس الكتافين لورا.', 'Hold the band at chest height and pull it apart until the shoulder blades squeeze.');
  X('bx_band_face', 'فيس بول بالكاوتش', 'Band face pull', 'bands', 'bands', 'reps', 3, 15, 45, 'اسحب الكاوتش ناحية الوجه والكوع عالي مع فتح الإيدين.', 'Pull the band towards the face with high elbows and open hands.');
  X('bx_band_row', 'سحب كاوتش جالس', 'Seated band row', 'bands', 'bands', 'reps', 3, 12, 60, 'اجلس والرجلين مفرودة، اسحب الكاوتش للبطن والضهر مستقيم.', 'Sit with legs extended and pull the band to the belly with a straight back.');
  X('bx_band_pallof', 'بالوف بالكاوتش', 'Band Pallof press', 'bands', 'bands', 'reps', 3, 10, 45, 'قاوم الدوران وانت بتدفع الكاوتش قدّام الصدر.', 'Resist rotation while pressing the band straight out from the chest.');
  X('bx_band_assist', 'عقلة بمساعدة كاوتش', 'Band-assisted pull-up', 'bands', 'bands', 'reps', 3, 6, 90, 'الكاوتش تحت الركبة بيساعدك في الجزء الأصعب من العقلة.', 'The band under the knee helps through the hardest part of the pull-up.');
  X('bx_band_sprint', 'جري بمقاومة كاوتش (مع زميل)', 'Band-resisted sprint (partner)', 'bands', 'bands', 'distance', 5, 15, 90, 'زميل يمسك الكاوتش من الخلف وانت بتتسارع لقدّام بميل خفيف.', 'A partner holds the band behind you as you accelerate forward with a slight lean.', 'high');

  /* ---- ropes ---- */
  X('bx_rope_climb', 'تسلّق الحبل', 'Rope climb', 'ropes', 'rope', 'reps', 3, 3, 120, 'اطلع بالرجلين والإيدين بالتبادل. نزول بتحكّم، ومع مشرف وسطح أرضي ناعم.', 'Climb using legs and arms alternately. Descend under control, with a spotter and a soft landing area.', 'high');
  X('bx_rope_wave', 'موجات الحبل القتالي', 'Battle rope waves', 'ropes', 'battle rope', 'time', 5, 30, 45, 'ركب مثنية، موجات متبادلة بالذراعين بإيقاع ثابت.', 'Knees bent, alternate arm waves at a steady rhythm.');
  X('bx_rope_slam', 'ضرب الحبل للأرض', 'Battle rope slams', 'ropes', 'battle rope', 'time', 5, 20, 45, 'ارفع الحبال فوق الراس واضربها للأرض بقوة من الجسم كله.', 'Raise the ropes overhead and slam them down with the whole body.');

  /* ---- artificial climbing wall ---- */
  X('bx_wall_traverse', 'تسلّق جانبي على الحيطة', 'Climbing wall traverse', 'climbing', 'climbing wall', 'time', 4, 60, 90, 'تحرّك جانبي على الحيطة الصناعية بارتفاع قريب من الأرض. حلبة صالحة ومشرف مدرّب.', 'Move sideways on an artificial wall low to the ground. Use an approved wall and a trained supervisor.', 'medium');
  X('bx_wall_easy', 'مسار سهل بحبل أمان', 'Easy route with top-rope', 'climbing', 'climbing wall', 'reps', 3, 2, 120, 'مسار سهل مع حبل أمان وشخص مؤمّن مدرّب فقط.', 'An easy route on top-rope with a trained belayer only.', 'high');
  X('bx_wall_downclimb', 'نزول تسلّق', 'Down-climb', 'climbing', 'climbing wall', 'reps', 3, 3, 90, 'انزل على نفس المسار ببطء لتحكّم أفضل في القدمين.', 'Climb back down the same route slowly for better foot control.', 'medium');

  /* ---- rehab and mobility ---- */
  X('bx_glutebridge', 'جلوت بريدج', 'Glute bridge', 'rehab', 'body only', 'reps', 3, 12, 45, 'ارفع الحوض بالضغط على الكعبين وثبّت ثانيتين فوق.', 'Lift the hips by pressing through the heels and hold for two seconds at the top.');
  X('bx_clam', 'كلام جانبي بكاوتش', 'Banded side-lying clam', 'rehab', 'bands', 'reps', 3, 15, 30, 'نايم على جنبك، افتح الركبة العليا مع الكعبين ملتصقين.', 'Side-lying, open the top knee with the heels together.');
  X('bx_wallslide', 'انزلاق على الحيطة للكتف', 'Wall slide', 'rehab', 'body only', 'reps', 3, 10, 30, 'ضهرك على الحيطة، اطلع بالذراعين لفوق وانزل ببطء.', 'Back against the wall, slide the arms up and down slowly.');
  X('bx_calf', 'رفع سمانة بطيء', 'Slow calf raise', 'rehab', 'body only', 'reps', 3, 12, 45, '3 ثواني لفوق و3 لتحت على كعب كامل الحركة.', 'Three seconds up and three down through the full range.');
  X('bx_balance', 'توازن على رجل واحدة', 'Single-leg balance', 'rehab', 'body only', 'time', 3, 30, 30, 'قف على رجل واحدة بركبة مرنة وعين على نقطة ثابتة.', 'Stand on one leg with a soft knee and eyes on a fixed point.');
  X('bx_extrot', 'دوران خارجي للكتف بكاوتش', 'Band shoulder external rotation', 'rehab', 'bands', 'reps', 3, 15, 30, 'كوع ملتصق بالجسم، دوّر الساعد للخارج بتحكّم.', 'Elbow tucked at the side, rotate the forearm outward under control.');
  X('bx_hipflexor', 'إطالة ثني الحوض', 'Hip flexor stretch', 'mobility', 'body only', 'time', 2, 40, 15, 'وضع لانج ثابت، ادفع الحوض لقدّام بدون تقوّس الضهر.', 'Hold a half-kneeling position and shift the hips forward without arching the back.');
  X('bx_thoracic', 'دوران الضهر العلوي', 'Thoracic rotation', 'mobility', 'body only', 'reps', 2, 10, 15, 'على أربع، إيد ورا الراس وافتح الكوع ناحية السقف.', 'On all fours, hand behind the head, rotate the elbow towards the ceiling.');

  /* -------------------------------------------------------------- people */
  /* qualified: a specialist whose credentials were checked (sample flag). Rehab approval needs qualified = true. */
  var USERS = [
    { id: 'u-coach-hossam', role: 'coach',      name: { ar: 'كابتن حسام — مدرب', en: 'Coach Hossam — coach' } },
    { id: 'u-spec-sara',    role: 'specialist', qualified: true,  name: { ar: 'د. سارة — أخصائية (معتمدة)', en: 'Dr. Sara — specialist (qualified)' } },
    { id: 'u-spec-karim',   role: 'specialist', qualified: false, name: { ar: 'د. كريم — أخصائي (لسه ماتفحصتش)', en: 'Dr. Karim — specialist (not checked yet)' } },
    { id: 'u-admin-ahmed',  role: 'admin',      name: { ar: 'أحمد — إدارة', en: 'Ahmed — admin' } },
    { id: 'u-client-mona',  role: 'client',     name: { ar: 'منى — عميلة', en: 'Mona — client' } },
    { id: 'u-client-omar',  role: 'client',     name: { ar: 'عمر — عميل', en: 'Omar — client' } },
    { id: 'u-player-youssef', role: 'client',   name: { ar: 'يوسف — لاعب في الفريق', en: 'Youssef — team player' } }
  ];

  /* the coach's sample team; groups A/B/C are the team's sub-groups */
  var TEAM = {
    id: 'team-falcons', name: { ar: 'فريق الصقور (تجريبي)', en: 'Falcons squad (sample)' },
    groups: ['A', 'B', 'C'],
    members: [
      { id: 'u-player-youssef', name: { ar: 'يوسف', en: 'Youssef' }, group: 'A' },
      { id: 'p-adam', name: { ar: 'آدم', en: 'Adam' }, group: 'A' },
      { id: 'p-nour', name: { ar: 'نور', en: 'Nour' }, group: 'A' },
      { id: 'p-karim', name: { ar: 'كريم', en: 'Karim' }, group: 'B' },
      { id: 'p-salma', name: { ar: 'سلمى', en: 'Salma' }, group: 'B' },
      { id: 'p-omar2', name: { ar: 'عمر س.', en: 'Omar S.' }, group: 'B' },
      { id: 'p-hana', name: { ar: 'هنا', en: 'Hana' }, group: 'C' },
      { id: 'p-ziad', name: { ar: 'زياد', en: 'Ziad' }, group: 'C' },
      { id: 'p-laila', name: { ar: 'ليلى', en: 'Laila' }, group: 'C' }
    ]
  };

  root.ADAM_BUILDER_DATA = {
    CATS: CATS, METRICS: METRICS, USERS: USERS, TEAM: TEAM, isSample: true,
    api: { catalog: function () { return Promise.resolve(LIST.slice()); } },
    _list: LIST
  };
})(window);
