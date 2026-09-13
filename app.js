import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, getDocs, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { firebaseConfig, COACH_EMAIL } from './firebase-config.js';
import { REHAB_TEMPLATES } from './rehab-templates.js';
import { FOOD_LIBRARY, FOOD_CATEGORIES } from './food-library.js';
import { SPORTS, SPORT_GROUPS, SPORT_METRICS, METRIC_FIELDS, SPORT_TEMPLATES } from './sports.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const LIBRARY_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
const IMAGE_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
const MAX_SOURCE_BYTES = 12 * 1024 * 1024;   // أقصى حجم للصورة الأصلية قبل الضغط
const MAX_STORED_BYTES = 700 * 1024;         // أقصى حجم بعد الضغط (حد Firestore مليون بايت)
const IMAGE_MAX_SIDE = 520;                  // أطول ضلع للصورة بعد التصغير

/* ============================ اللغة ============================ */

const TEXT = {
  ar: {
    tagline: 'منصة التدريب والتأهيل والتغذية',
    login_title: 'تسجيل الدخول',
    login_btn: 'دخول',
    email: 'الإيميل',
    password: 'الباسورد',
    logging_in: 'جاري الدخول...',
    bad_login: 'الإيميل أو الباسورد غلط',
    logout: 'تسجيل الخروج',

    my_clients: 'عملائي',
    client_name: 'اسم العميل',
    client_email: 'إيميله',
    add_client: '+ إضافة عميل',
    loading: 'جاري التحميل...',
    no_clients: 'مفيش عملاء لسه، ضيف عميل تحت',
    need_name_email: 'اكتب الاسم والإيميل',
    adding: 'جاري الإضافة...',
    no_activity: 'مفيش نشاط النهاردة',
    done_count: 'خلّص {n} تمارين النهاردة',

    back_clients: '‹ رجوع لقائمة العملاء',
    back_program: '‹ رجوع للبرنامج',
    program_of: 'برنامج {name}',
    day_title: 'اسم اليوم (صدر وترايسبس)',
    rest_day: 'يوم راحة',
    open_library: '📚 اختر من مكتبة التمارين',
    open_mylib: '⭐ مكتبتي الخاصة',
    or_manual: 'أو اكتب التمرين بنفسك',
    ex_name: 'اسم التمرين',
    ex_sets: 'مجموعات',
    ex_reps: 'تكرار',
    add_ex: '+ إضافة تمرين',
    save_program: 'حفظ البرنامج',
    fill_ex: 'كمّل بيانات التمرين',
    saving: 'جاري الحفظ...',
    saved: 'اتحفظ البرنامج ✅',
    problem: 'حصلت مشكلة: ',

    library_title: 'مكتبة التمارين',
    search_ex: 'ابحث عن تمرين...',
    all_muscles: 'كل العضلات',
    all_equipment: 'كل الأدوات',
    loading_library: 'جاري تحميل المكتبة...',
    library_failed: 'مش قادر أحمّل المكتبة، اتأكد من النت',
    no_matches: 'مفيش تمارين بالمواصفات دي',
    showing: 'بيعرض {a} من {b} — ضيّق البحث',
    count_ex: '{n} تمرين',
    added_ex: 'اتضاف: {name} — عدّل المجموعات والتكرار لو تحب',

    mylib_title: 'مكتبتي الخاصة',
    mylib_hint: 'التمارين اللي بتضيفها هنا بتفضل محفوظة ليك',
    add_new_ex: 'إضافة تمرين جديد',
    ex_notes: 'ملاحظات (اختياري)',
    save_to_mylib: '+ حفظ في مكتبتي',
    mylib_empty: 'مكتبتك فاضية — ضيف أول تمرين تحت',
    need_ex_name: 'اكتب اسم التمرين',
    mylib_saved: 'اتحفظ في مكتبتك ✅',
    confirm_delete: 'تمسح التمرين ده من مكتبتك؟',
    choose_image: '🖼️ اختر صورة (اختياري)',
    image_chosen: '🖼️ تغيير الصورة',
    image_too_big: 'الصورة كبيرة، اختار واحدة أصغر من 3 ميجا',
    preparing_image: 'جاري تجهيز الصورة...',
    image_failed: 'مش قادر أقرا الصورة دي، جرب صورة تانية',
    start_position: 'وضع البداية',
    end_position: 'وضع النهاية',
    exercise_image: 'صورة التمرين',
    no_image: 'مفيش صورة للتمرين ده',
    tab_training: '🏋️ تمرين',
    tab_rehab: '🩹 تأهيل',
    add_to: 'إضافة إلى',
    save_rehab: 'حفظ برنامج التأهيل',
    saved_rehab: 'اتحفظ برنامج التأهيل ✅',
    injury_name: 'اسم الإصابة',
    injury_about: 'شرح الإصابة (يقراه العميل)',
    injury_about_ph: 'اكتب شرح مبسط للإصابة، أسبابها، وإيه المتوقع في التأهيل...',
    current_phase: 'المرحلة الحالية',
    add_phase: '+ إضافة مرحلة',
    add_to_phase: 'إضافة تمرين إلى مرحلة',
    phase: 'مرحلة',
    phase_name: 'اسم المرحلة',
    phase_goal: 'هدف المرحلة',
    phase_criteria: 'معايير الانتقال للمرحلة اللي بعدها',
    now: 'الحالية',
    no_phases: 'مفيش مراحل لسه — ضيف أول مرحلة',
    no_rehab: 'مفيش برنامج تأهيل مسنود ليك',
    no_training: 'مفيش برنامج تمرين مسنود ليك',
    confirm_delete_phase: 'تمسح المرحلة دي وكل تمارينها؟',
    sec_warmup: 'إحماء',
    sec_main: 'التمرين الأساسي',
    sec_cardio: 'كارديو',
    sec_mobility: 'موبيليتي',
    sec_flexibility: 'إطالة',
    section_empty: 'مفيش تمارين هنا',
    use_template: 'استخدم قالب جاهز',
    apply_template: 'تحميل القالب',
    template_note: '⚠️ القوالب مسودة مبدئية مبنية على مبادئ التأهيل العامة — راجعها وعدّلها حسب حالة العميل قبل ما تسندها.',
    pick_template: '— اختر قالب —',
    confirm_template: 'ده هيستبدل برنامج التأهيل الحالي بالكامل. تكمل؟',
    template_loaded: 'اتحمّل القالب — راجعه وعدّله قبل الحفظ',
    all_categories: 'كل الأنواع',
    cat_strength: 'قوة',
    cat_stretching: 'إطالة',
    cat_cardio: 'كارديو',
    cat_plyometrics: 'بليومترك',
    cat_powerlifting: 'باورليفتنج',
    cat_strongman: 'سترونجمان',
    cat_olympic: 'رفع أولمبي',
    ex_rest: 'راحة',
    ex_load: 'الحمل',
    ex_rpe: 'الشدة',
    ex_tempo: 'تيمبو',
    tap_to_edit: 'دوس على التمرين للتعديل',
    matching_images: 'بيدوّر على صور التمارين...',
    images_matched: 'لقيت صور لـ {n} تمرين من القالب',
    tab_nutrition: '🍎 تغذية',
    daily_targets: 'الأهداف اليومية',
    t_kcal: 'سعرات',
    t_protein: 'بروتين',
    t_carbs: 'كارب',
    t_fat: 'دهون',
    add_to_meal: 'إضافة إلى وجبة',
    open_food_library: '🍎 مكتبة الأغذية',
    save_nutrition: 'حفظ برنامج التغذية',
    saved_nutrition: 'اتحفظ برنامج التغذية ✅',
    food_library: 'مكتبة الأغذية',
    search_food: 'ابحث عن صنف...',
    add_custom_food: 'إضافة صنف جديد',
    food_name: 'اسم الصنف',
    per_100: 'القيم لكل 100 جرام',
    save_food: '+ حفظ الصنف',
    food_saved: 'اتحفظ الصنف ✅',
    need_food_name: 'اكتب اسم الصنف والسعرات',
    meal_breakfast: 'الفطار',
    meal_lunch: 'الغدا',
    meal_dinner: 'العشا',
    meal_snack: 'سناك',
    no_meals: 'مفيش أكل لليوم ده',
    no_nutrition: 'مفيش برنامج تغذية مسنود ليك',
    grams: 'جم',
    my_food: 'بتاعي',
    all_foods: 'كل الأصناف',
    food_count: '{n} صنف',
    tab_activity: '🏅 نشاطي',
    client_sport: 'رياضة العميل',
    use_sport_template: 'قالب تحضير بدني',
    sport_template_note: '⚠️ القالب بيتحمّل على اليوم المفتوح ويضيف لتماريته — راجعه وعدّله حسب اللاعب ومرحلة موسمه.',
    pick_sport: '— اختر الرياضة —',
    pick_sport_template: '— اختر قالب —',
    sport_template_loaded: 'اتحمّل القالب على {day}',
    log_activity: 'سجّل نشاطك',
    save_activity: '+ تسجيل النشاط',
    activity_history: 'سجل النشاط',
    act_notes: 'ملاحظات (اختياري)',
    activity_saved: 'اتسجّل النشاط ✅',
    no_activity_yet: 'مفيش نشاط مسجّل لسه',
    need_activity: 'اختار رياضة وكمّل بيانة واحدة على الأقل',
    confirm_delete_activity: 'تمسح النشاط ده؟',
    recent_activity: 'آخر نشاط: {text}',
    tab_classes: '👥 الكلاس',
    open_classes: '👥 الكلاسات',
    classes_title: 'الكلاسات',
    back_classes: '‹ رجوع للكلاسات',
    add_class: 'إضافة كلاس',
    class_name: 'اسم الكلاس',
    class_time: 'الميعاد (مثلاً 6:00 م)',
    save_class: '+ حفظ الكلاس',
    class_saved: 'اتحفظ الكلاس ✅',
    need_class_name: 'اكتب اسم الكلاس',
    no_classes: 'مفيش كلاسات لسه — ضيف كلاس تحت',
    class_members: 'أعضاء الكلاس',
    add_member: '+ إضافة عضو',
    no_members: 'مفيش أعضاء لسه',
    members_count: '{n} عضو',
    today_board: 'لوحة النهاردة',
    week_board: 'ترتيب الأسبوع',
    live_on: 'تحديث لحظي شغال',
    live_off: 'التحديث اللحظي متوقف',
    turn_off: 'إيقاف',
    turn_on: 'تشغيل',
    refresh: 'تحديث',
    done_today: 'خلّص النهاردة',
    not_yet_today: 'لسه',
    days_done: '{n} يوم',
    me: 'أنا',
    no_class_yet: 'مش مشترك في أي كلاس لسه',
    confirm_delete_class: 'تمسح الكلاس ده؟',
    already_member: 'العضو ده موجود بالفعل',

    today_workout: 'تمرين اليوم',
    finish_workout: 'إنهاء التمرين',
    start_over: 'ابدأ من جديد',
    rest_msg: 'يوم راحة 😌',
    no_plan: 'مفيش برنامج لليوم ده',
    day_plan: 'برنامج يوم {day}',
    of_exercises: '{a} من {b} تمارين',
    well_done: 'أحسنت يا بطل 💪',
    remaining: 'لسه باقي {n} تمارين',

    days: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
    days_short: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
  },

  en: {
    tagline: 'Training, Rehab & Nutrition Platform',
    login_title: 'Sign In',
    login_btn: 'Sign in',
    email: 'Email',
    password: 'Password',
    logging_in: 'Signing in...',
    bad_login: 'Wrong email or password',
    logout: 'Sign out',

    my_clients: 'My Clients',
    client_name: 'Client name',
    client_email: 'Their email',
    add_client: '+ Add client',
    loading: 'Loading...',
    no_clients: 'No clients yet — add one below',
    need_name_email: 'Enter name and email',
    adding: 'Adding...',
    no_activity: 'No activity today',
    done_count: 'Completed {n} exercises today',

    back_clients: '‹ Back to clients',
    back_program: '‹ Back to program',
    program_of: "{name}'s program",
    day_title: 'Day name (Chest & Triceps)',
    rest_day: 'Rest day',
    open_library: '📚 Pick from exercise library',
    open_mylib: '⭐ My own library',
    or_manual: 'Or type the exercise yourself',
    ex_name: 'Exercise name',
    ex_sets: 'Sets',
    ex_reps: 'Reps',
    add_ex: '+ Add exercise',
    save_program: 'Save program',
    fill_ex: 'Fill in the exercise details',
    saving: 'Saving...',
    saved: 'Program saved ✅',
    problem: 'Something went wrong: ',

    library_title: 'Exercise Library',
    search_ex: 'Search exercises...',
    all_muscles: 'All muscles',
    all_equipment: 'All equipment',
    loading_library: 'Loading library...',
    library_failed: "Couldn't load the library — check your connection",
    no_matches: 'No exercises match these filters',
    showing: 'Showing {a} of {b} — narrow your search',
    count_ex: '{n} exercises',
    added_ex: 'Added: {name} — adjust sets and reps if you like',

    mylib_title: 'My Own Library',
    mylib_hint: 'Exercises you add here stay saved for you',
    add_new_ex: 'Add a new exercise',
    ex_notes: 'Notes (optional)',
    save_to_mylib: '+ Save to my library',
    mylib_empty: 'Your library is empty — add your first exercise below',
    need_ex_name: 'Enter the exercise name',
    mylib_saved: 'Saved to your library ✅',
    confirm_delete: 'Delete this exercise from your library?',
    choose_image: '🖼️ Choose an image (optional)',
    image_chosen: '🖼️ Change image',
    image_too_big: 'Image is too large — pick one under 3 MB',
    preparing_image: 'Preparing image...',
    image_failed: "Couldn't read that image — try another one",
    start_position: 'Start position',
    end_position: 'End position',
    exercise_image: 'Exercise image',
    no_image: 'No image for this exercise',
    tab_training: '🏋️ Training',
    tab_rehab: '🩹 Rehab',
    add_to: 'Add to',
    save_rehab: 'Save rehab program',
    saved_rehab: 'Rehab program saved ✅',
    injury_name: 'Injury name',
    injury_about: 'About the injury (the client reads this)',
    injury_about_ph: 'Write a simple explanation of the injury, its causes, and what to expect...',
    current_phase: 'Current phase',
    add_phase: '+ Add phase',
    add_to_phase: 'Add exercise to a phase',
    phase: 'Phase',
    phase_name: 'Phase name',
    phase_goal: 'Phase goal',
    phase_criteria: 'Criteria to move to the next phase',
    now: 'Current',
    no_phases: 'No phases yet — add the first one',
    no_rehab: 'No rehab program assigned to you',
    no_training: 'No training program assigned to you',
    confirm_delete_phase: 'Delete this phase and all its exercises?',
    sec_warmup: 'Warm-up',
    sec_main: 'Main workout',
    sec_cardio: 'Cardio',
    sec_mobility: 'Mobility',
    sec_flexibility: 'Flexibility',
    section_empty: 'No exercises here',
    use_template: 'Use a ready template',
    apply_template: 'Load template',
    template_note: '⚠️ Templates are starting-point drafts based on general rehab principles — review and adapt them to the client before assigning.',
    pick_template: '— Choose a template —',
    confirm_template: 'This will replace the current rehab program entirely. Continue?',
    template_loaded: 'Template loaded — review and adapt before saving',
    all_categories: 'All types',
    cat_strength: 'Strength',
    cat_stretching: 'Stretching',
    cat_cardio: 'Cardio',
    cat_plyometrics: 'Plyometrics',
    cat_powerlifting: 'Powerlifting',
    cat_strongman: 'Strongman',
    cat_olympic: 'Olympic lifting',
    ex_rest: 'Rest',
    ex_load: 'Load',
    ex_rpe: 'RPE',
    ex_tempo: 'Tempo',
    tap_to_edit: 'Tap an exercise to edit it',
    matching_images: 'Looking up exercise images...',
    images_matched: 'Found images for {n} template exercises',
    tab_nutrition: '🍎 Nutrition',
    daily_targets: 'Daily targets',
    t_kcal: 'Kcal',
    t_protein: 'Protein',
    t_carbs: 'Carbs',
    t_fat: 'Fat',
    add_to_meal: 'Add to a meal',
    open_food_library: '🍎 Food library',
    save_nutrition: 'Save nutrition plan',
    saved_nutrition: 'Nutrition plan saved ✅',
    food_library: 'Food Library',
    search_food: 'Search foods...',
    add_custom_food: 'Add a new food',
    food_name: 'Food name',
    per_100: 'Values per 100 g',
    save_food: '+ Save food',
    food_saved: 'Food saved ✅',
    need_food_name: 'Enter a name and calories',
    meal_breakfast: 'Breakfast',
    meal_lunch: 'Lunch',
    meal_dinner: 'Dinner',
    meal_snack: 'Snack',
    no_meals: 'No food planned for this day',
    no_nutrition: 'No nutrition plan assigned to you',
    grams: 'g',
    my_food: 'mine',
    all_foods: 'All foods',
    food_count: '{n} foods',
    tab_activity: '🏅 My activity',
    client_sport: "Client's sport",
    use_sport_template: 'Conditioning template',
    sport_template_note: '⚠️ The template loads onto the open day and adds to its exercises — review and adapt it to the athlete and their season phase.',
    pick_sport: '— Choose a sport —',
    pick_sport_template: '— Choose a template —',
    sport_template_loaded: 'Template loaded onto {day}',
    log_activity: 'Log your activity',
    save_activity: '+ Log activity',
    activity_history: 'Activity history',
    act_notes: 'Notes (optional)',
    activity_saved: 'Activity logged ✅',
    no_activity_yet: 'No activity logged yet',
    need_activity: 'Pick a sport and fill at least one field',
    confirm_delete_activity: 'Delete this activity?',
    recent_activity: 'Last activity: {text}',
    tab_classes: '👥 Class',
    open_classes: '👥 Classes',
    classes_title: 'Classes',
    back_classes: '‹ Back to classes',
    add_class: 'Add a class',
    class_name: 'Class name',
    class_time: 'Time (e.g. 6:00 PM)',
    save_class: '+ Save class',
    class_saved: 'Class saved ✅',
    need_class_name: 'Enter a class name',
    no_classes: 'No classes yet — add one below',
    class_members: 'Class members',
    add_member: '+ Add member',
    no_members: 'No members yet',
    members_count: '{n} members',
    today_board: "Today's board",
    week_board: 'This week',
    live_on: 'Live updates on',
    live_off: 'Live updates off',
    turn_off: 'Turn off',
    turn_on: 'Turn on',
    refresh: 'Refresh',
    done_today: 'Done today',
    not_yet_today: 'Not yet',
    days_done: '{n} days',
    me: 'Me',
    no_class_yet: 'You are not in a class yet',
    confirm_delete_class: 'Delete this class?',
    already_member: 'That member is already in the class',

    today_workout: "Today's Workout",
    finish_workout: 'Finish workout',
    start_over: 'Start over',
    rest_msg: 'Rest day 😌',
    no_plan: 'No program for this day',
    day_plan: '{day} program',
    of_exercises: '{a} of {b} exercises',
    well_done: 'Well done, champ 💪',
    remaining: '{n} exercises left',

    days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    days_short: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  }
};

const MUSCLES = {
  'abdominals':  { ar: 'البطن',          en: 'Abdominals' },
  'abductors':   { ar: 'المبعدة',        en: 'Abductors' },
  'adductors':   { ar: 'المقربة',        en: 'Adductors' },
  'biceps':      { ar: 'البايسبس',       en: 'Biceps' },
  'calves':      { ar: 'السمانة',        en: 'Calves' },
  'chest':       { ar: 'الصدر',          en: 'Chest' },
  'forearms':    { ar: 'الساعد',         en: 'Forearms' },
  'glutes':      { ar: 'الألوية',        en: 'Glutes' },
  'hamstrings':  { ar: 'أوتار الركبة',   en: 'Hamstrings' },
  'lats':        { ar: 'الظهر العريضة',  en: 'Lats' },
  'lower back':  { ar: 'أسفل الظهر',     en: 'Lower back' },
  'middle back': { ar: 'وسط الظهر',      en: 'Middle back' },
  'neck':        { ar: 'الرقبة',         en: 'Neck' },
  'quadriceps':  { ar: 'الفخذ الأمامي',  en: 'Quadriceps' },
  'shoulders':   { ar: 'الكتف',          en: 'Shoulders' },
  'traps':       { ar: 'الترابيس',       en: 'Traps' },
  'triceps':     { ar: 'الترايسبس',      en: 'Triceps' }
};

const EQUIPMENT = {
  'body only':      { ar: 'وزن الجسم',      en: 'Bodyweight' },
  'dumbbell':       { ar: 'دمبل',           en: 'Dumbbell' },
  'barbell':        { ar: 'بار',            en: 'Barbell' },
  'bands':          { ar: 'أستك مقاومة',    en: 'Bands' },
  'machine':        { ar: 'جهاز',           en: 'Machine' },
  'cable':          { ar: 'كابل',           en: 'Cable' },
  'kettlebells':    { ar: 'كيتل بيل',       en: 'Kettlebell' },
  'medicine ball':  { ar: 'كرة طبية',       en: 'Medicine ball' },
  'exercise ball':  { ar: 'كرة سويسرية',    en: 'Exercise ball' },
  'foam roll':      { ar: 'فوم رول',        en: 'Foam roller' },
  'e-z curl bar':   { ar: 'بار متعرج',      en: 'EZ curl bar' },
  'other':          { ar: 'أخرى',           en: 'Other' }
};

let lang = localStorage.getItem('adam-lang') || 'ar';

function t(key) {
  return (TEXT[lang] && TEXT[lang][key]) || key;
}

function fill(key, values) {
  let out = t(key);
  Object.keys(values).forEach(function (name) {
    out = out.replace('{' + name + '}', values[name]);
  });
  return out;
}

function muscleName(key) {
  return (MUSCLES[key] && MUSCLES[key][lang]) || key || '';
}

function equipName(key) {
  return (EQUIPMENT[key] && EQUIPMENT[key][lang]) || key || t('all_equipment');
}

function days() {
  return TEXT[lang].days;
}

function daysShort() {
  return TEXT[lang].days_short;
}

const langButton = document.getElementById('lang-btn');

function applyLanguage() {
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  langButton.textContent = (lang === 'ar') ? 'EN' : 'ع';

  document.querySelectorAll('[data-t]').forEach(function (node) {
    node.textContent = t(node.getAttribute('data-t'));
  });

  document.querySelectorAll('[data-t-ph]').forEach(function (node) {
    node.placeholder = t(node.getAttribute('data-t-ph'));
  });

  refreshAll();
}

langButton.addEventListener('click', function () {
  lang = (lang === 'ar') ? 'en' : 'ar';
  localStorage.setItem('adam-lang', lang);
  fillSportSelect(document.getElementById('new-sport'), true);
applyLanguage();
});


/* ============================ عام ============================ */

const today = new Date().toDateString();
const todayIndex = (new Date().getDay() + 1) % 7;

/* تاريخ بصيغة YYYY-MM-DD — بنستخدمه لسجل الالتزام الأسبوعي */
function dateStamp(date) {
  return date.getFullYear() + '-'
    + String(date.getMonth() + 1).padStart(2, '0') + '-'
    + String(date.getDate()).padStart(2, '0');
}
const todayStamp = dateStamp(new Date());

const SECTION_KEYS = ['warmup', 'main', 'cardio', 'mobility', 'flexibility'];
const MEAL_KEYS = ['breakfast', 'lunch', 'dinner', 'snack'];
const MEAL_ICONS = { breakfast: '🌅', lunch: '🍽️', dinner: '🌙', snack: '🥤' };
const SECTION_ICONS = {
  warmup: '🔥',
  main: '🏋️',
  cardio: '🏃',
  mobility: '🔄',
  flexibility: '🧘'
};

function sectionName(key) {
  return t('sec_' + key);
}

const BODY_PARTS = {
  '':          { ar: '— اختر المنطقة —', en: '— Choose area —' },
  'shoulder':  { ar: 'الكتف',        en: 'Shoulder' },
  'neck':      { ar: 'الرقبة',       en: 'Neck' },
  'back':      { ar: 'الظهر',        en: 'Back' },
  'lower_back':{ ar: 'أسفل الظهر',   en: 'Lower back' },
  'elbow':     { ar: 'الكوع',        en: 'Elbow' },
  'wrist':     { ar: 'الرسغ',        en: 'Wrist' },
  'hip':       { ar: 'الورك',        en: 'Hip' },
  'knee':      { ar: 'الركبة',       en: 'Knee' },
  'ankle':     { ar: 'الكاحل',       en: 'Ankle' },
  'foot':      { ar: 'القدم',        en: 'Foot' },
  'other':     { ar: 'أخرى',         en: 'Other' }
};

function bodyPartName(key) {
  return (BODY_PARTS[key] && BODY_PARTS[key][lang]) || key || '';
}

/* شكل التمرين الموحّد — أي حقل ناقص بيتملي فاضي */
function makeExercise(data) {
  return {
    name: data.name || '',
    sets: data.sets || 3,
    reps: data.reps || '12',
    rest: data.rest || '',
    load: data.load || '',
    rpe: data.rpe || '',
    tempo: data.tempo || '',
    image: data.image || '',
    imageUrl: data.imageUrl || ''
  };
}

/*
 * بدل ما نخمّن مسارات صور القوالب، بندوّر على التمرين بالاسم داخل
 * المكتبة الحقيقية وقت التحميل. لو لقيناه بنجيب صورته، ولو لأ بيفضل
 * من غير صورة — فمستحيل تظهر صورة مكسورة.
 */
function normaliseName(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    // توحيد المفرد والجمع: raises -> raise ، slides -> slide
    .map(function (word) {
      // توحيد المفرد والجمع: raises -> raise ، slides -> slide
      if (word.length > 3 && word.slice(-1) === 's') return word.slice(0, -1);
      return word;
    })
    .join(' ');
}

function findLibraryImage(englishName) {
  if (!libraryData || !englishName) return '';

  const target = normaliseName(englishName);
  if (!target) return '';
  const targetWords = target.split(' ').filter(function (w) { return w.length > 2; });
  if (!targetWords.length) return '';

  let best = null;
  let bestScore = 0;

  libraryData.forEach(function (exercise) {
    if (!exercise.images || !exercise.images.length) return;
    const candidate = normaliseName(exercise.name);

    let score = 0;
    if (candidate === target) {
      score = 100;
    } else {
      const candidateWords = candidate.split(' ');
      let hits = 0;
      targetWords.forEach(function (word) {
        if (candidateWords.indexOf(word) !== -1) hits++;
      });
      // لازم تطابق أغلب الكلمات المهمة، مش كلمة واحدة
      const coverage = hits / targetWords.length;
      if (coverage >= 0.75) score = coverage * 50 - Math.abs(candidateWords.length - targetWords.length);
    }

    if (score > bestScore) {
      bestScore = score;
      best = exercise;
    }
  });

  return (best && bestScore >= 30) ? best.images[0] : '';
}

function sportName(id) {
  const sport = SPORTS.filter(function (s) { return s.id === id; })[0];
  return sport ? sport[lang] : '';
}

function sportGroupName(key) {
  return (SPORT_GROUPS[key] && SPORT_GROUPS[key][lang]) || key;
}

function sportById(id) {
  return SPORTS.filter(function (s) { return s.id === id; })[0] || null;
}

function metricFieldName(key) {
  return (METRIC_FIELDS[key] && METRIC_FIELDS[key][lang]) || key;
}

function metricFieldUnit(key) {
  const f = METRIC_FIELDS[key];
  return (f && f.unit && f.unit[lang]) || '';
}

/* بيملا أي <select> بكل الرياضات، مجمّعة حسب النوع */
function fillSportSelect(select, includeEmpty) {
  const keep = select.value;
  select.innerHTML = '';

  if (includeEmpty) {
    const none = document.createElement('option');
    none.value = '';
    none.textContent = t('pick_sport');
    select.appendChild(none);
  }

  Object.keys(SPORT_GROUPS).forEach(function (group) {
    const inGroup = SPORTS.filter(function (s) { return s.group === group; });
    if (!inGroup.length) return;

    const optgroup = document.createElement('optgroup');
    optgroup.label = sportGroupName(group);

    inGroup.forEach(function (sport) {
      const option = document.createElement('option');
      option.value = sport.id;
      option.textContent = sport[lang];
      optgroup.appendChild(option);
    });

    select.appendChild(optgroup);
  });

  select.value = keep;
}

const CATEGORY_KEYS = {
  'strength': 'cat_strength',
  'stretching': 'cat_stretching',
  'cardio': 'cat_cardio',
  'plyometrics': 'cat_plyometrics',
  'powerlifting': 'cat_powerlifting',
  'strongman': 'cat_strongman',
  'olympic weightlifting': 'cat_olympic'
};

function categoryName(key) {
  return CATEGORY_KEYS[key] ? t(CATEGORY_KEYS[key]) : key;
}

/* لما تفتح المكتبة من قسم معيّن، نقترح النوع المناسب تلقائيًا */
const SECTION_DEFAULT_CATEGORY = {
  warmup: 'stretching',
  main: 'strength',
  cardio: 'cardio',
  mobility: 'stretching',
  flexibility: 'stretching'
};

const loginScreen = document.getElementById('login-screen');
const clientsScreen = document.getElementById('clients-screen');
const coachScreen = document.getElementById('coach-screen');
const libraryScreen = document.getElementById('library-screen');
const mylibScreen = document.getElementById('mylib-screen');
const clientScreen = document.getElementById('client-screen');
const foodScreen = document.getElementById('food-screen');
const logoutButton = document.getElementById('logout-btn');

/* لوحات وتابات التغذية — معرَّفة هنا مع باقي الشاشات لأن
   setCoachMode و setClientMode بيستخدموها قبل قسم التغذية في الملف */
const nutritionPanel = document.getElementById('nutrition-panel');
const tabNutrition = document.getElementById('tab-nutrition');
const clientNutritionPanel = document.getElementById('client-nutrition');
const ctabNutrition = document.getElementById('ctab-nutrition');
const clientActivityPanel = document.getElementById('client-activity');
const ctabActivity = document.getElementById('ctab-activity');
const classesScreen = document.getElementById('classes-screen');
const classDetailScreen = document.getElementById('class-detail-screen');
const clientClassesPanel = document.getElementById('client-classes');
const ctabClasses = document.getElementById('ctab-classes');

let classes = [];
let currentClass = null;
let liveEnabled = localStorage.getItem('adam-live') !== 'off';
let liveUnsub = null;
let progressCache = {};
let clientsCache = [];

let clientActivity = [];

let coachNutrition = emptyNutrition();
let nutDay = todayIndex;
let clientNutrition = emptyNutrition();
let cNutDay = todayIndex;

function showScreen(screen) {
  [loginScreen, clientsScreen, classesScreen, classDetailScreen, coachScreen, libraryScreen, mylibScreen, foodScreen, clientScreen].forEach(function (s) {
    s.classList.add('hidden');
  });
  screen.classList.remove('hidden');
  logoutButton.classList.toggle('hidden', screen === loginScreen);
  // نقفل الاشتراك اللحظي أول ما نسيب شاشة الكلاس عشان الاستهلاك
  if (screen !== classDetailScreen && typeof stopLive === 'function') stopLive();
  window.scrollTo(0, 0);
}

/* ---------- شكل البيانات + تحويل البرامج القديمة ---------- */

function blankSections() {
  const sections = {};
  SECTION_KEYS.forEach(function (key) {
    sections[key] = [];
  });
  return sections;
}

/*
 * البرامج القديمة كانت بتحفظ day.exercises كقائمة واحدة.
 * الشكل الجديد بيقسمها لأقسام، فبنحوّل القديم تلقائيًا:
 * كل التمارين القديمة بتروح لقسم "التمرين الأساسي".
 */
function normalizeDay(day) {
  const clean = {
    title: (day && day.title) || '',
    rest: !!(day && day.rest),
    sections: blankSections()
  };

  if (day && day.sections) {
    SECTION_KEYS.forEach(function (key) {
      if (Array.isArray(day.sections[key])) clean.sections[key] = day.sections[key];
    });
  } else if (day && Array.isArray(day.exercises)) {
    clean.sections.main = day.exercises;
  }

  return clean;
}

function emptyWeek() {
  return [0, 1, 2, 3, 4, 5, 6].map(function () {
    return normalizeDay(null);
  });
}

function normalizeWeek(week) {
  const out = emptyWeek();
  if (Array.isArray(week)) {
    for (let i = 0; i < 7; i++) {
      out[i] = normalizeDay(week[i]);
    }
  }
  return out;
}

function dayCount(day) {
  let total = 0;
  SECTION_KEYS.forEach(function (key) {
    total += day.sections[key].length;
  });
  return total;
}

function dayHasPlan(day) {
  return day.rest || dayCount(day) > 0;
}

function emptyRehab() {
  return { bodyPart: '', injury: '', about: '', currentPhase: 0, phases: [] };
}

function normalizeRehab(data) {
  const clean = emptyRehab();
  if (!data) return clean;

  clean.bodyPart = data.bodyPart || '';
  clean.injury = data.injury || '';
  clean.about = data.about || '';
  clean.currentPhase = Number(data.currentPhase) || 0;

  if (Array.isArray(data.phases)) {
    clean.phases = data.phases.map(function (phase) {
      return {
        name: (phase && phase.name) || '',
        goal: (phase && phase.goal) || '',
        criteria: (phase && phase.criteria) || '',
        exercises: (phase && Array.isArray(phase.exercises)) ? phase.exercises : []
      };
    });
  }

  if (clean.currentPhase >= clean.phases.length) clean.currentPhase = 0;
  return clean;
}

function rehabHasContent(data) {
  return !!(data && (data.injury || data.about || (data.phases && data.phases.length)));
}

showScreen(loginScreen);

/* ============================ الدخول ============================ */

const loginMessage = document.getElementById('login-message');

document.getElementById('login-btn').addEventListener('click', async function () {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  loginMessage.textContent = t('logging_in');
  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginMessage.textContent = '';
  } catch (error) {
    loginMessage.textContent = t('bad_login');
  }
});

logoutButton.addEventListener('click', function () {
  signOut(auth);
});

onAuthStateChanged(auth, function (user) {
  if (!user) {
    showScreen(loginScreen);
  } else if (user.email.toLowerCase() === COACH_EMAIL.toLowerCase()) {
    showScreen(clientsScreen);
    loadClients();
  } else {
    showScreen(clientScreen);
    loadClient(user.email.toLowerCase());
  }
});

/* ============================ العملاء ============================ */

const clientsList = document.getElementById('clients-list');
const clientsMessage = document.getElementById('clients-message');

async function loadClients() {
  clientsList.innerHTML = '';
  clientsMessage.textContent = t('loading');
  try {
    const snapshot = await getDocs(collection(db, 'clients'));
    if (snapshot.empty) {
      clientsMessage.textContent = t('no_clients');
      return;
    }
    clientsMessage.textContent = '';
    for (const clientDoc of snapshot.docs) {
      await showClientRow(clientDoc.id, clientDoc.data().name, clientDoc.data().sport || '');
    }
  } catch (error) {
    clientsMessage.textContent = t('problem') + error.message;
  }
}

async function showClientRow(email, name, sport) {
  const item = document.createElement('li');

  const nameLine = document.createElement('div');
  nameLine.className = 'client-name';
  nameLine.textContent = name;

  const emailLine = document.createElement('div');
  emailLine.className = 'client-email';
  emailLine.textContent = email;

  const status = document.createElement('div');
  status.className = 'client-status none';
  status.textContent = t('no_activity');

  item.appendChild(nameLine);
  item.appendChild(emailLine);

  if (sport) {
    const tag = document.createElement('div');
    tag.className = 'sport-tag';
    tag.textContent = sportName(sport);
    item.appendChild(tag);
  }

  item.appendChild(status);

  item.addEventListener('click', function () {
    openCoachScreen(email, name, sport);
  });

  clientsList.appendChild(item);

  try {
    const progressDoc = await getDoc(doc(db, 'progress', email));
    if (progressDoc.exists() && progressDoc.data().date === today) {
      status.textContent = fill('done_count', { n: (progressDoc.data().done || []).length });
      status.classList.remove('none');
    }
  } catch (error) {
    // مش مشكلة
  }
}

document.getElementById('add-client-btn').addEventListener('click', async function () {
  const nameInput = document.getElementById('new-name');
  const emailInput = document.getElementById('new-email');
  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();

  if (!name || !email) {
    clientsMessage.textContent = t('need_name_email');
    return;
  }

  clientsMessage.textContent = t('adding');
  try {
    await setDoc(doc(db, 'clients', email), {
      name: name,
      sport: document.getElementById('new-sport').value || ''
    });
    nameInput.value = '';
    emailInput.value = '';
    await loadClients();
  } catch (error) {
    clientsMessage.textContent = t('problem') + error.message;
  }
});

/* ============================ معاينة الصورة ============================ */

const lightbox = document.getElementById('lightbox');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxImages = document.getElementById('lightbox-images');

function closeLightbox() {
  lightbox.classList.add('hidden');
  lightboxImages.innerHTML = '';
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

lightbox.addEventListener('click', function (event) {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !lightbox.classList.contains('hidden')) {
    closeLightbox();
  }
});

function addShot(src, caption) {
  const shot = document.createElement('div');
  shot.className = 'lightbox-shot';

  const image = document.createElement('img');
  image.src = src;
  image.alt = '';
  image.addEventListener('error', function () {
    shot.remove();
    if (!lightboxImages.children.length) showNoImage();
  });
  shot.appendChild(image);

  if (caption) {
    const cap = document.createElement('div');
    cap.className = 'lightbox-cap';
    cap.textContent = caption;
    shot.appendChild(cap);
  }

  lightboxImages.appendChild(shot);
}

function showNoImage() {
  const none = document.createElement('p');
  none.className = 'lightbox-none';
  none.textContent = t('no_image');
  lightboxImages.appendChild(none);
}

function openPreview(exercise) {
  lightboxTitle.textContent = exercise.name || t('exercise_image');
  lightboxImages.innerHTML = '';

  if (exercise.imageUrl) {
    addShot(exercise.imageUrl, '');
  } else if (exercise.image) {
    addShot(IMAGE_BASE + exercise.image, t('start_position'));
    if (/\/0\.jpg$/.test(exercise.image)) {
      addShot(IMAGE_BASE + exercise.image.replace(/\/0\.jpg$/, '/1.jpg'), t('end_position'));
    }
  } else {
    showNoImage();
  }

  lightbox.classList.remove('hidden');
}

function thumbSrc(exercise) {
  if (exercise.imageUrl) return exercise.imageUrl;
  if (exercise.image) return IMAGE_BASE + exercise.image;
  return '';
}

function exerciseRow(exercise) {
  const left = document.createElement('div');
  left.className = 'lib-item';

  const src = thumbSrc(exercise);
  if (src) {
    const thumb = document.createElement('img');
    thumb.className = 'lib-thumb';
    thumb.src = src;
    thumb.alt = '';
    thumb.addEventListener('error', function () {
      thumb.remove();
    });
    thumb.addEventListener('click', function (event) {
      event.stopPropagation();
      openPreview(exercise);
    });
    left.appendChild(thumb);
  }

  const info = document.createElement('div');

  const label = document.createElement('div');
  label.textContent = exercise.name;
  info.appendChild(label);

  const tags = exerciseTags(exercise);
  if (tags) info.appendChild(tags);

  left.appendChild(info);
  return left;
}

/* شرايط التفاصيل: تكرار، راحة، حمل، شدة، تيمبو */
function exerciseTags(exercise) {
  const items = [];

  if (exercise.rest)  items.push({ text: '⏱ ' + exercise.rest, primary: false });
  if (exercise.load)  items.push({ text: '🏋️ ' + exercise.load, primary: false });
  if (exercise.rpe)   items.push({ text: 'RPE ' + exercise.rpe, primary: false });
  if (exercise.tempo) items.push({ text: '⏳ ' + exercise.tempo, primary: false });

  if (!items.length) return null;

  const box = document.createElement('div');
  box.className = 'ex-tags';
  items.forEach(function (item) {
    const tag = document.createElement('span');
    tag.className = 'ex-tag' + (item.primary ? ' primary' : '');
    tag.textContent = item.text;
    box.appendChild(tag);
  });
  return box;
}

/* محرر داخل السطر — للمدرب فقط */
function buildEditor(exercise, onChange) {
  const box = document.createElement('div');
  box.className = 'ex-edit';

  function field(placeholder, key, type) {
    const input = document.createElement('input');
    input.placeholder = placeholder;
    input.value = exercise[key] === undefined ? '' : exercise[key];
    if (type) input.type = type;
    input.addEventListener('click', function (event) {
      event.stopPropagation();
    });
    input.addEventListener('input', function () {
      exercise[key] = (type === 'number') ? Number(input.value) : input.value;
      if (onChange) onChange();
    });
    return input;
  }

  const nameInput = field(t('ex_name'), 'name');
  box.appendChild(nameInput);

  const row1 = document.createElement('div');
  row1.className = 'row';
  row1.appendChild(field(t('ex_sets'), 'sets', 'number'));
  row1.appendChild(field(t('ex_reps'), 'reps'));
  box.appendChild(row1);

  const row2 = document.createElement('div');
  row2.className = 'row four';
  row2.appendChild(field(t('ex_rest'), 'rest'));
  row2.appendChild(field(t('ex_load'), 'load'));
  row2.appendChild(field(t('ex_rpe'), 'rpe'));
  row2.appendChild(field(t('ex_tempo'), 'tempo'));
  box.appendChild(row2);

  return box;
}

/* سطر تمرين قابل للتعديل في شاشة المدرب */
function coachExerciseItem(exercise, onDelete, onChange) {
  const item = document.createElement('li');
  item.className = 'ex-row';

  const top = document.createElement('div');
  top.className = 'ex-row-top';
  top.appendChild(exerciseRow(exercise));

  const details = document.createElement('span');
  details.textContent = exercise.sets + ' × ' + exercise.reps + ' ';

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '✕';
  deleteButton.className = 'delete';
  deleteButton.addEventListener('click', function (event) {
    event.stopPropagation();
    onDelete();
  });

  details.appendChild(deleteButton);
  top.appendChild(details);
  item.appendChild(top);

  let editor = null;
  item.addEventListener('click', function () {
    if (editor) {
      editor.remove();
      editor = null;
      return;
    }
    editor = buildEditor(exercise, onChange);
    item.appendChild(editor);
  });

  return item;
}

/* ============================ شاشة المدرب ============================ */

let coachWeek = emptyWeek();
let coachRehab = emptyRehab();
let coachDay = todayIndex;
let currentClient = '';
let currentClientName = '';
let currentClientSport = '';
let coachMode = 'training';

const coachTitle = document.getElementById('coach-title');
const coachSections = document.getElementById('coach-sections');
const coachMessage = document.getElementById('coach-message');
const dayTitle = document.getElementById('day-title');
const restCheckbox = document.getElementById('rest-day');
const targetSection = document.getElementById('target-section');

const trainingPanel = document.getElementById('training-panel');
const rehabPanel = document.getElementById('rehab-panel');
const tabTraining = document.getElementById('tab-training');
const tabRehab = document.getElementById('tab-rehab');

function setCoachMode(mode) {
  coachMode = mode;
  trainingPanel.classList.toggle('hidden', mode !== 'training');
  rehabPanel.classList.toggle('hidden', mode !== 'rehab');
  nutritionPanel.classList.toggle('hidden', mode !== 'nutrition');
  tabTraining.classList.toggle('active', mode === 'training');
  tabRehab.classList.toggle('active', mode === 'rehab');
  tabNutrition.classList.toggle('active', mode === 'nutrition');
  coachMessage.textContent = '';
  window.scrollTo(0, 0);
}

tabTraining.addEventListener('click', function () {
  saveCurrentDay();
  setCoachMode('training');
});

tabRehab.addEventListener('click', function () {
  saveCurrentDay();
  setCoachMode('rehab');
  showRehab();
});

tabNutrition.addEventListener('click', function () {
  saveCurrentDay();
  if (coachMode === 'rehab') readRehabFields();
  setCoachMode('nutrition');
  showNutrition();
});

document.getElementById('back-btn').addEventListener('click', function () {
  showScreen(clientsScreen);
  loadClients();
});

async function openCoachScreen(email, name, sport) {
  currentClient = email;
  currentClientName = name;
  currentClientSport = sport || '';
  coachTitle.textContent = fill('program_of', { name: name });
  coachMessage.textContent = t('loading');
  showScreen(coachScreen);
  setCoachMode('training');

  try {
    const workoutDoc = await getDoc(doc(db, 'workouts', email));
    coachWeek = normalizeWeek(workoutDoc.exists() ? workoutDoc.data().week : null);

    const rehabDoc = await getDoc(doc(db, 'rehab', email));
    coachRehab = normalizeRehab(rehabDoc.exists() ? rehabDoc.data() : null);

    const nutritionDoc = await getDoc(doc(db, 'nutrition', email));
    coachNutrition = normalizeNutrition(nutritionDoc.exists() ? nutritionDoc.data() : null);

    coachDay = todayIndex;
    nutDay = todayIndex;
    fillSectionPicker();
    fillBodyParts();
    fillTemplatePicker();
    fillSportSelect(coachSport, true);
    coachSport.value = currentClientSport;
    fillSportTemplatePicker();
    showCoachDay();
    showRehab();
    showNutrition();
    coachMessage.textContent = '';
  } catch (error) {
    coachMessage.textContent = t('problem') + error.message;
  }
}

/* ---------- القرص الدوّار ---------- */

const DIAL_RADIUS = 98;
const DIAL_RADIUS_SMALL = 88;

function dialRadius() {
  return window.innerWidth <= 380 ? DIAL_RADIUS_SMALL : DIAL_RADIUS;
}

function renderDial(ringId, dayNameId, subId, week, selected, onPick, describe) {
  const info = describe || function (day, index) {
    return {
      hasPlan: dayHasPlan(day),
      title: day.title || days()[index],
      sub: day.rest ? t('rest_msg')
         : (dayCount(day) ? fill('count_ex', { n: dayCount(day) }) : t('no_plan')),
      isRest: !!day.rest
    };
  };
  const ring = document.getElementById(ringId);
  const step = 360 / 7;
  const ringRotation = -selected * step;
  const radius = dialRadius();

  ring.innerHTML = '';
  ring.style.transform = 'rotate(' + ringRotation + 'deg)';

  daysShort().forEach(function (name, index) {
    const angle = index * step;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'dial-day';
    if (index === selected) button.classList.add('active');
    if (info(week[index], index).hasPlan) button.classList.add('has-plan');

    button.style.transform = 'rotate(' + angle + 'deg) translateY(-' + radius + 'px)';

    const label = document.createElement('span');
    label.textContent = name;
    label.style.transform = 'rotate(' + (-(angle + ringRotation)) + 'deg)';
    button.appendChild(label);

    button.addEventListener('click', function () {
      onPick(index);
    });

    ring.appendChild(button);
  });

  const described = info(week[selected], selected);
  document.getElementById(dayNameId).textContent = described.title;

  const sub = document.getElementById(subId);
  sub.textContent = described.sub;
  sub.classList.toggle('rest', !!described.isRest);
}

function showCoachDays() {
  renderDial('coach-ring', 'coach-dc-day', 'coach-dc-sub', coachWeek, coachDay, function (index) {
    saveCurrentDay();
    coachDay = index;
    showCoachDay();
  });
}

function saveCurrentDay() {
  if (!coachWeek[coachDay]) return;
  coachWeek[coachDay].title = dayTitle.value.trim();
  coachWeek[coachDay].rest = restCheckbox.checked;
}

function fillSectionPicker() {
  const keep = targetSection.value;
  targetSection.innerHTML = '';
  SECTION_KEYS.forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = SECTION_ICONS[key] + '  ' + sectionName(key);
    targetSection.appendChild(option);
  });
  targetSection.value = keep || 'main';
  if (!targetSection.value) targetSection.value = 'main';
}

function showCoachDay() {
  if (coachTitle && currentClientName) {
    coachTitle.textContent = fill('program_of', { name: currentClientName });
  }

  const day = coachWeek[coachDay];
  dayTitle.value = day.title;
  restCheckbox.checked = day.rest;

  coachSections.innerHTML = '';

  SECTION_KEYS.forEach(function (key) {
    const list = day.sections[key];

    const block = document.createElement('div');
    block.className = 'section-block';

    const head = document.createElement('div');
    head.className = 'section-head';

    const title = document.createElement('div');
    title.className = 'section-name';
    title.textContent = SECTION_ICONS[key] + ' ' + sectionName(key);

    const count = document.createElement('div');
    count.className = 'section-count';
    count.textContent = list.length ? fill('count_ex', { n: list.length }) : '';

    head.appendChild(title);
    head.appendChild(count);
    block.appendChild(head);

    if (!list.length) {
      const empty = document.createElement('div');
      empty.className = 'section-empty';
      empty.textContent = t('section_empty');
      block.appendChild(empty);
    } else {
      const ul = document.createElement('ul');
      list.forEach(function (exercise, index) {
        ul.appendChild(coachExerciseItem(exercise, function () {
          list.splice(index, 1);
          showCoachDay();
        }, null));
      });
      block.appendChild(ul);

      const hint = document.createElement('div');
      hint.className = 'edit-hint';
      hint.textContent = t('tap_to_edit');
      block.appendChild(hint);
    }

    coachSections.appendChild(block);
  });

  showCoachDays();
}

document.getElementById('add-btn').addEventListener('click', function () {
  const nameInput = document.getElementById('ex-name');
  const setsInput = document.getElementById('ex-sets');
  const repsInput = document.getElementById('ex-reps');

  if (!nameInput.value.trim() || !setsInput.value || !repsInput.value.trim()) {
    coachMessage.textContent = t('fill_ex');
    return;
  }

  addToTarget(makeExercise({
    name: nameInput.value.trim(),
    sets: Number(setsInput.value),
    reps: repsInput.value.trim(),
    rest: document.getElementById('ex-rest').value.trim(),
    load: document.getElementById('ex-load').value.trim(),
    rpe: document.getElementById('ex-rpe').value.trim(),
    tempo: document.getElementById('ex-tempo').value.trim()
  }));

  nameInput.value = '';
  setsInput.value = '';
  repsInput.value = '';
  document.getElementById('ex-rest').value = '';
  document.getElementById('ex-load').value = '';
  document.getElementById('ex-rpe').value = '';
  document.getElementById('ex-tempo').value = '';
});

document.getElementById('save-btn').addEventListener('click', async function () {
  saveCurrentDay();
  coachMessage.textContent = t('saving');
  try {
    await setDoc(doc(db, 'workouts', currentClient), { week: coachWeek });
    coachMessage.textContent = t('saved');
  } catch (error) {
    coachMessage.textContent = t('problem') + error.message;
  }
});

/* ============================ التأهيل — شاشة المدرب ============================ */

const rehabBodyPart = document.getElementById('rehab-bodypart');
const rehabInjury = document.getElementById('rehab-injury');
const rehabAbout = document.getElementById('rehab-about');
const rehabCurrent = document.getElementById('rehab-current');
const rehabPhases = document.getElementById('rehab-phases');
const targetPhase = document.getElementById('target-phase');
const templatePick = document.getElementById('template-pick');

function fillTemplatePicker() {
  const keep = templatePick.value;
  templatePick.innerHTML = '';

  const none = document.createElement('option');
  none.value = '';
  none.textContent = t('pick_template');
  templatePick.appendChild(none);

  REHAB_TEMPLATES.forEach(function (template) {
    const option = document.createElement('option');
    option.value = template.id;
    option.textContent = bodyPartName(template.bodyPart) + ' — ' + template.name[lang];
    templatePick.appendChild(option);
  });

  templatePick.value = keep;
}

/* ينسخ القالب لبرنامج قابل للتعديل — مش مربوط بالقالب الأصلي */
function applyTemplate(template) {
  return {
    bodyPart: template.bodyPart,
    injury: template.name[lang],
    about: template.about[lang],
    currentPhase: 0,
    phases: template.phases.map(function (phase) {
      return {
        name: phase.name[lang],
        goal: phase.goal[lang],
        criteria: phase.criteria[lang],
        exercises: phase.exercises.map(function (exercise) {
          return makeExercise({
            name: exercise.name[lang],
            sets: exercise.sets,
            reps: exercise.reps
          });
        })
      };
    })
  };
}

document.getElementById('apply-template-btn').addEventListener('click', async function () {
  const id = templatePick.value;
  if (!id) return;

  const template = REHAB_TEMPLATES.filter(function (item) {
    return item.id === id;
  })[0];
  if (!template) return;

  if (rehabHasContent(coachRehab) && !confirm(t('confirm_template'))) return;

  coachRehab = applyTemplate(template);
  fillBodyParts();
  showRehab();
  coachMessage.textContent = t('template_loaded');

  // نحمّل المكتبة (لو مش محمّلة) وندوّر على صورة لكل تمرين بالاسم الإنجليزي
  coachMessage.textContent = t('matching_images');
  try {
    if (!libraryData) {
      const response = await fetch(LIBRARY_URL);
      libraryData = await response.json();
    }
  } catch (error) {
    coachMessage.textContent = t('template_loaded');
    return;
  }

  let matched = 0;
  template.phases.forEach(function (phase, phaseIndex) {
    phase.exercises.forEach(function (source, exIndex) {
      const image = findLibraryImage(source.name.en);
      if (image) {
        coachRehab.phases[phaseIndex].exercises[exIndex].image = image;
        matched++;
      }
    });
  });

  showRehab();
  coachMessage.textContent = matched
    ? fill('images_matched', { n: matched }) + ' — ' + t('template_loaded')
    : t('template_loaded');
});

function fillBodyParts() {
  const keep = rehabBodyPart.value;
  rehabBodyPart.innerHTML = '';
  Object.keys(BODY_PARTS).forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = bodyPartName(key);
    rehabBodyPart.appendChild(option);
  });
  rehabBodyPart.value = keep || coachRehab.bodyPart || '';
}

function readRehabFields() {
  coachRehab.bodyPart = rehabBodyPart.value;
  coachRehab.injury = rehabInjury.value.trim();
  coachRehab.about = rehabAbout.value.trim();
  coachRehab.currentPhase = Number(rehabCurrent.value) || 0;
}

function fillPhasePickers() {
  const keepTarget = targetPhase.value;
  targetPhase.innerHTML = '';
  rehabCurrent.innerHTML = '';

  coachRehab.phases.forEach(function (phase, index) {
    const label = t('phase') + ' ' + (index + 1) + (phase.name ? ' — ' + phase.name : '');

    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = label;
    targetPhase.appendChild(option);

    const currentOption = document.createElement('option');
    currentOption.value = String(index);
    currentOption.textContent = label;
    rehabCurrent.appendChild(currentOption);
  });

  if (keepTarget && Number(keepTarget) < coachRehab.phases.length) {
    targetPhase.value = keepTarget;
  }
  rehabCurrent.value = String(coachRehab.currentPhase);
}

function showRehab() {
  rehabBodyPart.value = coachRehab.bodyPart || '';
  rehabInjury.value = coachRehab.injury;
  rehabAbout.value = coachRehab.about;

  rehabPhases.innerHTML = '';

  if (!coachRehab.phases.length) {
    const empty = document.createElement('p');
    empty.className = 'section-empty';
    empty.textContent = t('no_phases');
    rehabPhases.appendChild(empty);
  }

  coachRehab.phases.forEach(function (phase, index) {
    const block = document.createElement('div');
    block.className = 'phase-block';
    if (index === coachRehab.currentPhase) block.classList.add('current');

    const head = document.createElement('div');
    head.className = 'phase-head';

    const num = document.createElement('div');
    num.className = 'phase-num';
    num.textContent = t('phase') + ' ' + (index + 1);
    head.appendChild(num);

    const right = document.createElement('div');
    right.style.display = 'flex';
    right.style.alignItems = 'center';
    right.style.gap = '6px';

    if (index === coachRehab.currentPhase) {
      const tag = document.createElement('span');
      tag.className = 'phase-tag';
      tag.textContent = t('now');
      right.appendChild(tag);
    }

    const removePhase = document.createElement('button');
    removePhase.type = 'button';
    removePhase.className = 'delete';
    removePhase.textContent = '✕';
    removePhase.addEventListener('click', function () {
      if (!confirm(t('confirm_delete_phase'))) return;
      readRehabFields();
      coachRehab.phases.splice(index, 1);
      if (coachRehab.currentPhase >= coachRehab.phases.length) {
        coachRehab.currentPhase = Math.max(0, coachRehab.phases.length - 1);
      }
      fillPhasePickers();
      showRehab();
    });
    right.appendChild(removePhase);

    head.appendChild(right);
    block.appendChild(head);

    const nameInput = document.createElement('input');
    nameInput.value = phase.name;
    nameInput.placeholder = t('phase_name');
    nameInput.addEventListener('input', function () {
      phase.name = nameInput.value;
    });
    block.appendChild(nameInput);

    const goalInput = document.createElement('input');
    goalInput.value = phase.goal;
    goalInput.placeholder = t('phase_goal');
    goalInput.addEventListener('input', function () {
      phase.goal = goalInput.value;
    });
    block.appendChild(goalInput);

    const criteriaInput = document.createElement('input');
    criteriaInput.value = phase.criteria;
    criteriaInput.placeholder = t('phase_criteria');
    criteriaInput.addEventListener('input', function () {
      phase.criteria = criteriaInput.value;
    });
    block.appendChild(criteriaInput);

    if (!phase.exercises.length) {
      const empty = document.createElement('div');
      empty.className = 'section-empty';
      empty.textContent = t('section_empty');
      block.appendChild(empty);
    } else {
      const ul = document.createElement('ul');
      phase.exercises.forEach(function (exercise, exIndex) {
        ul.appendChild(coachExerciseItem(exercise, function () {
          phase.exercises.splice(exIndex, 1);
          showRehab();
        }, null));
      });
      block.appendChild(ul);

      const hint = document.createElement('div');
      hint.className = 'edit-hint';
      hint.textContent = t('tap_to_edit');
      block.appendChild(hint);
    }

    rehabPhases.appendChild(block);
  });

  fillPhasePickers();
}

document.getElementById('add-phase-btn').addEventListener('click', function () {
  readRehabFields();
  coachRehab.phases.push({ name: '', goal: '', criteria: '', exercises: [] });
  showRehab();
});

document.getElementById('rehab-add-btn').addEventListener('click', function () {
  const nameInput = document.getElementById('rex-name');
  const setsInput = document.getElementById('rex-sets');
  const repsInput = document.getElementById('rex-reps');

  if (!nameInput.value.trim() || !setsInput.value || !repsInput.value.trim()) {
    coachMessage.textContent = t('fill_ex');
    return;
  }

  addToTarget(makeExercise({
    name: nameInput.value.trim(),
    sets: Number(setsInput.value),
    reps: repsInput.value.trim(),
    rest: document.getElementById('rex-rest').value.trim(),
    load: document.getElementById('rex-load').value.trim(),
    rpe: document.getElementById('rex-rpe').value.trim(),
    tempo: document.getElementById('rex-tempo').value.trim()
  }));

  nameInput.value = '';
  setsInput.value = '';
  repsInput.value = '';
  document.getElementById('rex-rest').value = '';
  document.getElementById('rex-load').value = '';
  document.getElementById('rex-rpe').value = '';
  document.getElementById('rex-tempo').value = '';
});

rehabCurrent.addEventListener('change', function () {
  coachRehab.currentPhase = Number(rehabCurrent.value) || 0;
  showRehab();
});

document.getElementById('save-rehab-btn').addEventListener('click', async function () {
  readRehabFields();
  coachMessage.textContent = t('saving');
  try {
    await setDoc(doc(db, 'rehab', currentClient), coachRehab);
    coachMessage.textContent = t('saved_rehab');
  } catch (error) {
    coachMessage.textContent = t('problem') + error.message;
  }
});

/* ---------- وجهة الإضافة (قسم في التمرين أو مرحلة في التأهيل) ---------- */

function addToTarget(exercise) {
  if (coachMode === 'rehab') {
    const index = Number(targetPhase.value);
    if (!coachRehab.phases.length || isNaN(index) || !coachRehab.phases[index]) {
      coachMessage.textContent = t('no_phases');
      return;
    }
    coachRehab.phases[index].exercises.push(exercise);
    showRehab();
    coachMessage.textContent = fill('added_ex', { name: exercise.name });
  } else {
    const key = targetSection.value || 'main';
    coachWeek[coachDay].sections[key].push(exercise);
    showCoachDay();
    coachMessage.textContent = fill('added_ex', { name: exercise.name });
  }
}

/* ---------- قالب التحضير البدني حسب الرياضة ---------- */

const coachSport = document.getElementById('coach-sport');
const sportTemplatePick = document.getElementById('sport-template-pick');

function templatesForSport(sportId) {
  const sport = sportById(sportId);
  const group = sport ? sport.group : 'none';
  // المجموعات اللي ملهاش قالب مخصص بترجع للقالب العام
  const own = SPORT_TEMPLATES.filter(function (tpl) { return tpl.group === group; });
  const general = SPORT_TEMPLATES.filter(function (tpl) { return tpl.group === 'none'; });
  return own.length ? own.concat(general) : general.concat(
    SPORT_TEMPLATES.filter(function (tpl) { return tpl.group !== 'none'; })
  );
}

function fillSportTemplatePicker() {
  const keep = sportTemplatePick.value;
  sportTemplatePick.innerHTML = '';

  const none = document.createElement('option');
  none.value = '';
  none.textContent = t('pick_sport_template');
  sportTemplatePick.appendChild(none);

  templatesForSport(coachSport.value).forEach(function (tpl) {
    const option = document.createElement('option');
    option.value = tpl.id;
    option.textContent = tpl[lang];
    sportTemplatePick.appendChild(option);
  });

  sportTemplatePick.value = keep;
}

coachSport.addEventListener('change', async function () {
  currentClientSport = coachSport.value;
  fillSportTemplatePicker();
  if (!currentClient) return;
  try {
    await setDoc(doc(db, 'clients', currentClient), {
      name: currentClientName,
      sport: currentClientSport
    });
  } catch (error) {
    coachMessage.textContent = t('problem') + error.message;
  }
});

document.getElementById('apply-sport-template').addEventListener('click', async function () {
  const id = sportTemplatePick.value;
  if (!id) return;

  const tpl = SPORT_TEMPLATES.filter(function (item) { return item.id === id; })[0];
  if (!tpl) return;

  saveCurrentDay();

  // نحمّل المكتبة عشان نجيب صور التمارين بالاسم الإنجليزي
  coachMessage.textContent = t('matching_images');
  try {
    if (!libraryData) {
      const response = await fetch(LIBRARY_URL);
      libraryData = await response.json();
    }
  } catch (error) {
    // مش مشكلة — هنكمل من غير صور
  }

  SECTION_KEYS.forEach(function (key) {
    const list = tpl.sections[key] || [];
    list.forEach(function (source) {
      coachWeek[coachDay].sections[key].push(makeExercise({
        name: source.en,
        sets: source.sets,
        reps: source.reps,
        image: findLibraryImage(source.en)
      }));
    });
  });

  if (!coachWeek[coachDay].title) {
    coachWeek[coachDay].title = tpl[lang];
  }

  showCoachDay();
  coachMessage.textContent = fill('sport_template_loaded', { day: days()[coachDay] })
    + ' — ' + (tpl.note ? tpl.note[lang] : '');
});

/* ============================ المكتبة الجاهزة ============================ */

let libraryData = null;

const libSearch = document.getElementById('lib-search');
const libMuscle = document.getElementById('lib-muscle');
const libEquip = document.getElementById('lib-equip');
const libChips = document.getElementById('lib-chips');
let activeCategory = '';
let suggestedCategory = '';
const libGrid = document.getElementById('lib-grid');
const libMessage = document.getElementById('lib-message');

function openLibrary() {
  saveCurrentDay();
  if (coachMode === 'rehab') readRehabFields();
  // اقترح نوع التمرين حسب القسم اللي بتضيف فيه
  suggestedCategory = (coachMode !== 'rehab')
    ? (SECTION_DEFAULT_CATEGORY[targetSection.value] || '')
    : '';
  showScreen(libraryScreen);
  loadLibrary();
}

document.getElementById('open-library-btn').addEventListener('click', openLibrary);
document.getElementById('rehab-library-btn').addEventListener('click', openLibrary);

document.getElementById('lib-back-btn').addEventListener('click', function () {
  showScreen(coachScreen);
  if (coachMode === 'rehab') showRehab(); else showCoachDay();
});

async function loadLibrary() {
  if (libraryData) {
    rebuildLibraryFilters();
    renderLibrary();
    return;
  }
  libMessage.textContent = t('loading_library');
  libGrid.innerHTML = '';
  try {
    const response = await fetch(LIBRARY_URL);
    libraryData = await response.json();
    rebuildLibraryFilters();
    libMessage.textContent = '';
    renderLibrary();
  } catch (error) {
    libMessage.textContent = t('library_failed');
  }
}

function rebuildLibraryFilters() {
  if (!libraryData) return;

  const keepMuscle = libMuscle.value;
  const keepEquip = libEquip.value;

  const keepCategory = activeCategory;
  const muscles = [];
  const equipment = [];
  const categories = [];

  libraryData.forEach(function (exercise) {
    exercise.primaryMuscles.forEach(function (muscle) {
      if (muscles.indexOf(muscle) === -1) muscles.push(muscle);
    });
    if (exercise.equipment && equipment.indexOf(exercise.equipment) === -1) {
      equipment.push(exercise.equipment);
    }
    if (exercise.category && categories.indexOf(exercise.category) === -1) {
      categories.push(exercise.category);
    }
  });

  libMuscle.innerHTML = '';
  libEquip.innerHTML = '';

  if (suggestedCategory && categories.indexOf(suggestedCategory) !== -1) {
    activeCategory = suggestedCategory;
    suggestedCategory = '';
  } else if (categories.indexOf(keepCategory) === -1) {
    activeCategory = keepCategory === '' ? '' : '';
  }

  renderCategoryChips(categories);

  const anyMuscle = document.createElement('option');
  anyMuscle.value = '';
  anyMuscle.textContent = t('all_muscles');
  libMuscle.appendChild(anyMuscle);

  const anyEquip = document.createElement('option');
  anyEquip.value = '';
  anyEquip.textContent = t('all_equipment');
  libEquip.appendChild(anyEquip);

  muscles.sort().forEach(function (muscle) {
    const option = document.createElement('option');
    option.value = muscle;
    option.textContent = muscleName(muscle);
    libMuscle.appendChild(option);
  });

  equipment.sort().forEach(function (item) {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = equipName(item);
    libEquip.appendChild(option);
  });

  libMuscle.value = keepMuscle;
  libEquip.value = keepEquip;
}

const CATEGORY_ICONS = {
  '': '✨',
  'strength': '🏋️',
  'stretching': '🧘',
  'cardio': '🏃',
  'plyometrics': '⚡',
  'powerlifting': '💪',
  'strongman': '🪨',
  'olympic weightlifting': '🥇'
};

function renderCategoryChips(categories) {
  libChips.innerHTML = '';

  const all = [''].concat(categories.slice().sort());

  all.forEach(function (key) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip' + (key === activeCategory ? ' active' : '');
    chip.textContent = (CATEGORY_ICONS[key] || '•') + ' ' + (key === '' ? t('all_categories') : categoryName(key));
    chip.addEventListener('click', function () {
      activeCategory = key;
      renderCategoryChips(categories);
      renderLibrary();
    });
    libChips.appendChild(chip);
  });
}

function renderLibrary() {
  if (!libraryData) return;

  const term = libSearch.value.trim().toLowerCase();
  const muscle = libMuscle.value;
  const equip = libEquip.value;
  const category = activeCategory;

  const matches = libraryData.filter(function (exercise) {
    if (category && exercise.category !== category) return false;
    if (muscle && exercise.primaryMuscles.indexOf(muscle) === -1) return false;
    if (equip && exercise.equipment !== equip) return false;
    if (term && exercise.name.toLowerCase().indexOf(term) === -1) return false;
    return true;
  });

  libGrid.innerHTML = '';
  const shown = matches.slice(0, 60);

  shown.forEach(function (exercise) {
    const card = document.createElement('div');
    card.className = 'ex-card';

    if (exercise.images && exercise.images.length) {
      const shot = document.createElement('div');
      shot.className = 'ex-shot';

      const image = document.createElement('img');
      image.src = IMAGE_BASE + exercise.images[0];
      image.alt = '';
      image.loading = 'lazy';
      shot.appendChild(image);

      const zoom = document.createElement('button');
      zoom.type = 'button';
      zoom.className = 'zoom-badge';
      zoom.textContent = '🔍';
      zoom.addEventListener('click', function (event) {
        event.stopPropagation();
        openPreview({ name: exercise.name, image: exercise.images[0], imageUrl: '' });
      });
      shot.appendChild(zoom);

      card.appendChild(shot);
    }

    const body = document.createElement('div');
    body.className = 'ex-body';

    const name = document.createElement('div');
    name.className = 'ex-name';
    name.textContent = exercise.name;

    const meta = document.createElement('div');
    meta.className = 'ex-meta';
    meta.textContent = exercise.primaryMuscles.map(muscleName).join('، ') + ' · ' + equipName(exercise.equipment);

    body.appendChild(name);
    body.appendChild(meta);
    card.appendChild(body);

    card.addEventListener('click', function () {
      showScreen(coachScreen);
      addToTarget(makeExercise({
        name: exercise.name,
        image: (exercise.images && exercise.images.length) ? exercise.images[0] : ''
      }));
    });

    libGrid.appendChild(card);
  });

  if (matches.length === 0) {
    libMessage.textContent = t('no_matches');
  } else if (matches.length > shown.length) {
    libMessage.textContent = fill('showing', { a: shown.length, b: matches.length });
  } else {
    libMessage.textContent = fill('count_ex', { n: matches.length });
  }
}

libSearch.addEventListener('input', renderLibrary);
libMuscle.addEventListener('change', renderLibrary);
libEquip.addEventListener('change', renderLibrary);

/* ============================ ضغط الصور ============================ */

function compressImage(file, maxSide, quality) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();

    reader.onerror = function () {
      reject(new Error('read failed'));
    };

    reader.onload = function () {
      const image = new Image();

      image.onerror = function () {
        reject(new Error('decode failed'));
      };

      image.onload = function () {
        let width = image.width;
        let height = image.height;

        if (width >= height && width > maxSide) {
          height = Math.round(height * maxSide / width);
          width = maxSide;
        } else if (height > maxSide) {
          width = Math.round(width * maxSide / height);
          height = maxSide;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');
        context.fillStyle = '#0e1729';
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);

        let result = canvas.toDataURL('image/jpeg', quality);
        let attempt = quality;
        while (result.length > MAX_STORED_BYTES && attempt > 0.3) {
          attempt = attempt - 0.12;
          result = canvas.toDataURL('image/jpeg', attempt);
        }

        resolve(result);
      };

      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}

/* ============================ مكتبتي الخاصة ============================ */

let myLibData = [];
let pickedImage = '';

const myLibList = document.getElementById('mylib-list');
const myLibMessage = document.getElementById('mylib-message');
const myName = document.getElementById('my-name');
const myMuscle = document.getElementById('my-muscle');
const myEquip = document.getElementById('my-equip');
const myNotes = document.getElementById('my-notes');
const myFile = document.getElementById('my-file');
const myFileLabel = document.querySelector('#my-file-label span');
const myPreviewBox = document.getElementById('my-preview-box');
const myPreview = document.getElementById('my-preview');

function openMyLib() {
  saveCurrentDay();
  if (coachMode === 'rehab') readRehabFields();
  showScreen(mylibScreen);
  fillMyLibSelects();
  loadMyLib();
}

document.getElementById('open-mylib-btn').addEventListener('click', openMyLib);
document.getElementById('rehab-mylib-btn').addEventListener('click', openMyLib);

document.getElementById('mylib-back-btn').addEventListener('click', function () {
  showScreen(coachScreen);
  if (coachMode === 'rehab') showRehab(); else showCoachDay();
});

myFile.addEventListener('change', async function () {
  const file = myFile.files[0];
  if (!file) return;

  if (file.size > MAX_SOURCE_BYTES) {
    myLibMessage.textContent = t('image_too_big');
    myFile.value = '';
    return;
  }

  myLibMessage.textContent = t('preparing_image');
  try {
    pickedImage = await compressImage(file, IMAGE_MAX_SIDE, 0.7);
    myPreview.src = pickedImage;
    myPreviewBox.classList.remove('hidden');
    myFileLabel.textContent = t('image_chosen');
    myLibMessage.textContent = '';
  } catch (error) {
    myLibMessage.textContent = t('image_failed');
    clearPickedImage();
  }
});

document.getElementById('my-remove-image').addEventListener('click', function () {
  clearPickedImage();
});

function clearPickedImage() {
  pickedImage = '';
  myFile.value = '';
  myPreview.removeAttribute('src');
  myPreviewBox.classList.add('hidden');
  myFileLabel.textContent = t('choose_image');
}

function fillMyLibSelects() {
  const keepMuscle = myMuscle.value;
  const keepEquip = myEquip.value;

  myMuscle.innerHTML = '';
  myEquip.innerHTML = '';

  Object.keys(MUSCLES).forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = muscleName(key);
    myMuscle.appendChild(option);
  });

  Object.keys(EQUIPMENT).forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = equipName(key);
    myEquip.appendChild(option);
  });

  if (keepMuscle) myMuscle.value = keepMuscle;
  if (keepEquip) myEquip.value = keepEquip;
}

async function loadMyLib() {
  myLibList.innerHTML = '';
  myLibMessage.textContent = t('loading');
  try {
    const snapshot = await getDocs(collection(db, 'myExercises'));
    myLibData = snapshot.docs.map(function (item) {
      const data = item.data();
      data.id = item.id;
      return data;
    });
    myLibMessage.textContent = '';
    renderMyLib();
  } catch (error) {
    myLibMessage.textContent = t('problem') + error.message;
  }
}

function renderMyLib() {
  myLibList.innerHTML = '';

  if (myLibData.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = t('mylib_empty');
    myLibList.appendChild(empty);
    return;
  }

  myLibData.forEach(function (exercise) {
    const item = document.createElement('li');

    const left = document.createElement('div');
    left.className = 'lib-item';

    if (exercise.imageUrl) {
      const thumb = document.createElement('img');
      thumb.className = 'lib-thumb';
      thumb.src = exercise.imageUrl;
      thumb.alt = '';
      thumb.addEventListener('error', function () {
        thumb.remove();
      });
      thumb.addEventListener('click', function (event) {
        event.stopPropagation();
        openPreview(exercise);
      });
      left.appendChild(thumb);
    }

    const info = document.createElement('div');

    const name = document.createElement('div');
    name.className = 'my-ex-name';
    name.textContent = exercise.name;
    info.appendChild(name);

    const meta = document.createElement('div');
    meta.className = 'my-ex-meta';
    meta.textContent = muscleName(exercise.muscle) + ' · ' + equipName(exercise.equipment);
    info.appendChild(meta);

    if (exercise.notes) {
      const notes = document.createElement('div');
      notes.className = 'my-ex-notes';
      notes.textContent = exercise.notes;
      info.appendChild(notes);
    }

    left.appendChild(info);
    item.appendChild(left);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '✕';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', async function (event) {
      event.stopPropagation();
      if (!confirm(t('confirm_delete'))) return;
      try {
        await deleteDoc(doc(db, 'myExercises', exercise.id));
        await loadMyLib();
      } catch (error) {
        myLibMessage.textContent = t('problem') + error.message;
      }
    });
    item.appendChild(deleteButton);

    item.addEventListener('click', function () {
      showScreen(coachScreen);
      addToTarget(makeExercise({
        name: exercise.name,
        imageUrl: exercise.imageUrl || ''
      }));
    });

    myLibList.appendChild(item);
  });
}

document.getElementById('my-add-btn').addEventListener('click', async function () {
  const name = myName.value.trim();
  if (!name) {
    myLibMessage.textContent = t('need_ex_name');
    return;
  }

  const id = 'ex_' + Date.now();

  try {
    myLibMessage.textContent = t('saving');
    await setDoc(doc(db, 'myExercises', id), {
      name: name,
      muscle: myMuscle.value,
      equipment: myEquip.value,
      notes: myNotes.value.trim(),
      imageUrl: pickedImage
    });

    myName.value = '';
    myNotes.value = '';
    clearPickedImage();
    await loadMyLib();
    myLibMessage.textContent = t('mylib_saved');
  } catch (error) {
    myLibMessage.textContent = t('problem') + error.message;
  }
});

/* ============================ شاشة العميل ============================ */

let clientWeek = emptyWeek();
let clientRehab = emptyRehab();
let clientDay = todayIndex;
let clientEmail = '';
let clientSport = '';
let doneToday = [];
let progressHistory = [];
let clientMode = 'training';

const clientTraining = document.getElementById('client-training');
const clientRehabPanel = document.getElementById('client-rehab');
const ctabTraining = document.getElementById('ctab-training');
const ctabRehab = document.getElementById('ctab-rehab');
const clientTabs = document.getElementById('client-tabs');

const clientSections = document.getElementById('client-sections');
const dayName = document.getElementById('day-name');
const progress = document.getElementById('progress');
const finishButton = document.getElementById('finish');
const resetButton = document.getElementById('reset');

function setClientMode(mode) {
  clientMode = mode;
  clientTraining.classList.toggle('hidden', mode !== 'training');
  clientRehabPanel.classList.toggle('hidden', mode !== 'rehab');
  clientNutritionPanel.classList.toggle('hidden', mode !== 'nutrition');
  clientActivityPanel.classList.toggle('hidden', mode !== 'activity');
  clientClassesPanel.classList.toggle('hidden', mode !== 'classes');
  ctabTraining.classList.toggle('active', mode === 'training');
  ctabRehab.classList.toggle('active', mode === 'rehab');
  ctabNutrition.classList.toggle('active', mode === 'nutrition');
  ctabActivity.classList.toggle('active', mode === 'activity');
  ctabClasses.classList.toggle('active', mode === 'classes');
  window.scrollTo(0, 0);
}

ctabTraining.addEventListener('click', function () {
  setClientMode('training');
});

ctabRehab.addEventListener('click', function () {
  setClientMode('rehab');
  showClientRehab();
});

ctabNutrition.addEventListener('click', function () {
  setClientMode('nutrition');
  showClientNutrition();
});

ctabActivity.addEventListener('click', function () {
  setClientMode('activity');
  showClientActivity();
});

ctabClasses.addEventListener('click', function () {
  setClientMode('classes');
  showClientClasses();
});

async function loadClient(email) {
  clientEmail = email;
  progress.textContent = t('loading');
  try {
    const workoutDoc = await getDoc(doc(db, 'workouts', email));
    const progressDoc = await getDoc(doc(db, 'progress', email));
    const rehabDoc = await getDoc(doc(db, 'rehab', email));
    const nutritionDoc = await getDoc(doc(db, 'nutrition', email));
    const activityDoc = await getDoc(doc(db, 'activity', email));
    const meDoc = await getDoc(doc(db, 'clients', email));

    clientSport = (meDoc.exists() && meDoc.data().sport) ? meDoc.data().sport : '';
    clientActivity = (activityDoc.exists() && Array.isArray(activityDoc.data().entries))
      ? activityDoc.data().entries : [];

    clientWeek = normalizeWeek(workoutDoc.exists() ? workoutDoc.data().week : null);
    clientRehab = normalizeRehab(rehabDoc.exists() ? rehabDoc.data() : null);
    clientNutrition = normalizeNutrition(nutritionDoc.exists() ? nutritionDoc.data() : null);

    // العلامات القديمة كانت أرقام تخص القائمة الواحدة؛ بنحولها لقسم "التمرين الأساسي"
    const rawDone = (progressDoc.exists() && progressDoc.data().date === today)
      ? (progressDoc.data().done || [])
      : [];
    progressHistory = (progressDoc.exists() && Array.isArray(progressDoc.data().history))
      ? progressDoc.data().history : [];

    doneToday = rawDone.map(function (entry) {
      return (typeof entry === 'number') ? ('main:' + entry) : String(entry);
    });

    const hasRehab = rehabHasContent(clientRehab);
    const hasNutrition = nutritionHasContent(clientNutrition);
    ctabRehab.classList.toggle('hidden', !hasRehab);
    ctabNutrition.classList.toggle('hidden', !hasNutrition);
    clientTabs.classList.toggle('hidden', !hasRehab && !hasNutrition);
    setClientMode('training');

    showClientDay();
    showClientRehab();
    showClientNutrition();
    showClientActivity();
  } catch (error) {
    progress.textContent = t('problem') + error.message;
  }
}

function showClientDays() {
  renderDial('client-ring', 'client-dc-day', 'client-dc-sub', clientWeek, clientDay, function (index) {
    clientDay = index;
    showClientDay();
  });
}

function countDone() {
  return clientSections.querySelectorAll('li.done').length;
}

function totalToday() {
  return dayCount(clientWeek[clientDay]);
}

function updateProgress() {
  if (clientDay !== todayIndex) {
    progress.textContent = fill('day_plan', { day: days()[clientDay] });
  } else if (totalToday() === 0) {
    progress.textContent = '';
  } else {
    progress.textContent = fill('of_exercises', { a: countDone(), b: totalToday() });
  }
}

function saveProgress() {
  const done = [];
  clientSections.querySelectorAll('li.done').forEach(function (item) {
    if (item.dataset.key) done.push(item.dataset.key);
  });

  /*
   * history = الأيام اللي العميل خلّص فيها تمرين، بصيغة YYYY-MM-DD.
   * من غيرها ترتيب الأسبوع في الكلاس مش هيكون له معنى، لأن المستند
   * بيحتفظ بآخر يوم بس. بنحتفظ بآخر 60 يوم ونشيل التكرار.
   */
  if (done.length && progressHistory.indexOf(todayStamp) === -1) {
    progressHistory.push(todayStamp);
  }
  if (!done.length) {
    progressHistory = progressHistory.filter(function (d) { return d !== todayStamp; });
  }
  if (progressHistory.length > 60) {
    progressHistory = progressHistory.slice(-60);
  }

  setDoc(doc(db, 'progress', clientEmail), {
    date: today,
    day: clientDay,
    done: done,
    history: progressHistory
  });
}

function showClientDay() {
  const day = clientWeek[clientDay];
  const isToday = clientDay === todayIndex;

  dayName.textContent = day.title || (isToday ? t('today_workout') : days()[clientDay]);
  clientSections.innerHTML = '';

  const total = dayCount(day);
  finishButton.textContent = t('finish_workout');
  finishButton.classList.toggle('hidden', !isToday || day.rest || total === 0);
  resetButton.classList.toggle('hidden', !isToday || day.rest || total === 0);

  if (day.rest) {
    const rest = document.createElement('p');
    rest.className = 'empty';
    rest.textContent = t('rest_msg');
    clientSections.appendChild(rest);
  } else if (total === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = t('no_plan');
    clientSections.appendChild(empty);
  } else {
    SECTION_KEYS.forEach(function (key) {
      const list = day.sections[key];
      if (!list.length) return;

      const block = document.createElement('div');
      block.className = 'section-block';

      const head = document.createElement('div');
      head.className = 'section-head';

      const title = document.createElement('div');
      title.className = 'section-name';
      title.textContent = SECTION_ICONS[key] + ' ' + sectionName(key);
      head.appendChild(title);

      const count = document.createElement('div');
      count.className = 'section-count';
      count.textContent = fill('count_ex', { n: list.length });
      head.appendChild(count);

      block.appendChild(head);

      const ul = document.createElement('ul');
      list.forEach(function (exercise, index) {
        const item = document.createElement('li');
        item.dataset.key = key + ':' + index;
        item.appendChild(exerciseRow(exercise));

        const details = document.createElement('span');
        details.textContent = exercise.sets + ' × ' + exercise.reps;
        item.appendChild(details);

        if (isToday && doneToday.indexOf(key + ':' + index) !== -1) {
          item.classList.add('done');
        }

        if (isToday) {
          item.addEventListener('click', function () {
            item.classList.toggle('done');
            updateProgress();
            saveProgress();
            finishButton.textContent = t('finish_workout');
          });
        }

        ul.appendChild(item);
      });

      block.appendChild(ul);
      clientSections.appendChild(block);
    });
  }

  showClientDays();
  updateProgress();
}

finishButton.addEventListener('click', function () {
  const left = totalToday() - countDone();
  if (left === 0) {
    finishButton.textContent = t('well_done');
  } else {
    finishButton.textContent = fill('remaining', { n: left });
  }
});

resetButton.addEventListener('click', function () {
  clientSections.querySelectorAll('li').forEach(function (item) {
    item.classList.remove('done');
  });
  updateProgress();
  saveProgress();
  finishButton.textContent = t('finish_workout');
});

/* ---------- التأهيل — شاشة العميل (كل المراحل ظاهرة) ---------- */

const clientRehabTitle = document.getElementById('client-rehab-title');
const clientRehabAbout = document.getElementById('client-rehab-about');
const clientRehabPhases = document.getElementById('client-rehab-phases');

function showClientRehab() {
  if (!rehabHasContent(clientRehab)) {
    clientRehabTitle.textContent = '';
    clientRehabAbout.classList.add('hidden');
    clientRehabPhases.innerHTML = '';
    const none = document.createElement('p');
    none.className = 'rehab-none';
    none.textContent = t('no_rehab');
    clientRehabPhases.appendChild(none);
    return;
  }

  const parts = [];
  if (clientRehab.bodyPart) parts.push(bodyPartName(clientRehab.bodyPart));
  if (clientRehab.injury) parts.push(clientRehab.injury);
  clientRehabTitle.textContent = parts.join(' — ') || t('tab_rehab');

  if (clientRehab.about) {
    clientRehabAbout.textContent = clientRehab.about;
    clientRehabAbout.classList.remove('hidden');
  } else {
    clientRehabAbout.classList.add('hidden');
  }

  clientRehabPhases.innerHTML = '';

  clientRehab.phases.forEach(function (phase, index) {
    const block = document.createElement('div');
    block.className = 'phase-block';
    if (index === clientRehab.currentPhase) block.classList.add('current');

    const head = document.createElement('div');
    head.className = 'phase-head';

    const num = document.createElement('div');
    num.className = 'phase-num';
    num.textContent = t('phase') + ' ' + (index + 1) + (phase.name ? ' — ' + phase.name : '');
    head.appendChild(num);

    if (index === clientRehab.currentPhase) {
      const tag = document.createElement('span');
      tag.className = 'phase-tag';
      tag.textContent = t('now');
      head.appendChild(tag);
    }

    block.appendChild(head);

    if (phase.goal) {
      const goal = document.createElement('div');
      goal.className = 'phase-goal';
      goal.textContent = phase.goal;
      block.appendChild(goal);
    }

    if (phase.exercises.length) {
      const ul = document.createElement('ul');
      phase.exercises.forEach(function (exercise) {
        const item = document.createElement('li');
        item.appendChild(exerciseRow(exercise));

        const details = document.createElement('span');
        details.textContent = exercise.sets + ' × ' + exercise.reps;
        item.appendChild(details);

        ul.appendChild(item);
      });
      block.appendChild(ul);
    } else {
      const empty = document.createElement('div');
      empty.className = 'section-empty';
      empty.textContent = t('section_empty');
      block.appendChild(empty);
    }

    if (phase.criteria) {
      const criteria = document.createElement('div');
      criteria.className = 'phase-goal';
      criteria.textContent = '🎯 ' + phase.criteria;
      block.appendChild(criteria);
    }

    clientRehabPhases.appendChild(block);
  });
}


/* ============================ التغذية ============================ */

function mealName(key) {
  return t('meal_' + key);
}

function foodCategoryName(key) {
  return (FOOD_CATEGORIES[key] && FOOD_CATEGORIES[key][lang]) || key;
}

function blankMeals() {
  const meals = {};
  MEAL_KEYS.forEach(function (key) { meals[key] = []; });
  return meals;
}

function normalizeNutritionDay(day) {
  const clean = { meals: blankMeals() };
  if (day && day.meals) {
    MEAL_KEYS.forEach(function (key) {
      if (Array.isArray(day.meals[key])) clean.meals[key] = day.meals[key];
    });
  }
  return clean;
}

function emptyNutrition() {
  return {
    targets: { kcal: 0, protein: 0, carbs: 0, fat: 0 },
    week: [0, 1, 2, 3, 4, 5, 6].map(function () { return normalizeNutritionDay(null); })
  };
}

function normalizeNutrition(data) {
  const clean = emptyNutrition();
  if (!data) return clean;

  if (data.targets) {
    clean.targets.kcal = Number(data.targets.kcal) || 0;
    clean.targets.protein = Number(data.targets.protein) || 0;
    clean.targets.carbs = Number(data.targets.carbs) || 0;
    clean.targets.fat = Number(data.targets.fat) || 0;
  }

  if (Array.isArray(data.week)) {
    for (let i = 0; i < 7; i++) clean.week[i] = normalizeNutritionDay(data.week[i]);
  }
  return clean;
}

/* عنصر أكل داخل وجبة — بنحفظ قيم الـ100جم وقت الإضافة عشان تعديل
   المكتبة بعدين ميغيّرش خطط قديمة من غير ما تاخد بالك */
function makeFoodItem(food, grams) {
  return {
    name: food[lang] || food.ar || food.en || food.name || '',
    grams: Number(grams) || 100,
    c100: Number(food.c) || 0,
    p100: Number(food.p) || 0,
    cb100: Number(food.cb) || 0,
    f100: Number(food.f) || 0
  };
}

function itemMacros(item) {
  const factor = (Number(item.grams) || 0) / 100;
  return {
    kcal: (item.c100 || 0) * factor,
    protein: (item.p100 || 0) * factor,
    carbs: (item.cb100 || 0) * factor,
    fat: (item.f100 || 0) * factor
  };
}

function mealTotals(list) {
  const total = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  list.forEach(function (item) {
    const m = itemMacros(item);
    total.kcal += m.kcal;
    total.protein += m.protein;
    total.carbs += m.carbs;
    total.fat += m.fat;
  });
  return total;
}

function dayTotals(day) {
  const total = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  MEAL_KEYS.forEach(function (key) {
    const m = mealTotals(day.meals[key]);
    total.kcal += m.kcal;
    total.protein += m.protein;
    total.carbs += m.carbs;
    total.fat += m.fat;
  });
  return total;
}

function nutritionDayCount(day) {
  let n = 0;
  MEAL_KEYS.forEach(function (key) { n += day.meals[key].length; });
  return n;
}

function nutritionHasContent(data) {
  if (!data) return false;
  if (data.targets && (data.targets.kcal || data.targets.protein)) return true;
  return data.week.some(function (day) { return nutritionDayCount(day) > 0; });
}

function nutritionDescribe(day, index) {
  const count = nutritionDayCount(day);
  const totals = dayTotals(day);
  return {
    hasPlan: count > 0,
    title: days()[index],
    sub: count ? Math.round(totals.kcal) + ' ' + t('t_kcal') : t('no_meals'),
    isRest: false
  };
}

/* ---------- شرايط المجاميع ---------- */

function renderTotals(box, totals, targets) {
  box.innerHTML = '';

  const rows = [
    { key: 'kcal',    label: t('t_kcal'),    value: totals.kcal,    target: targets.kcal },
    { key: 'protein', label: t('t_protein'), value: totals.protein, target: targets.protein },
    { key: 'carbs',   label: t('t_carbs'),   value: totals.carbs,   target: targets.carbs },
    { key: 'fat',     label: t('t_fat'),     value: totals.fat,     target: targets.fat }
  ];

  rows.forEach(function (row) {
    const cell = document.createElement('div');
    cell.className = 'total-cell';

    const value = document.createElement('div');
    value.className = 'total-value';
    value.textContent = Math.round(row.value);
    cell.appendChild(value);

    if (row.target) {
      const target = document.createElement('div');
      target.className = 'total-target';
      target.textContent = '/ ' + Math.round(row.target);
      cell.appendChild(target);
    }

    const label = document.createElement('div');
    label.className = 'total-label';
    label.textContent = row.label;
    cell.appendChild(label);

    if (row.target) {
      const bar = document.createElement('div');
      bar.className = 'total-bar';
      const fillBar = document.createElement('span');
      const pct = Math.min(100, (row.value / row.target) * 100);
      fillBar.style.width = pct + '%';
      if (row.value > row.target * 1.05) fillBar.classList.add('over');
      bar.appendChild(fillBar);
      cell.appendChild(bar);
    }

    box.appendChild(cell);
  });
}

/* ---------- شاشة المدرب — التغذية ---------- */

const nutTotalsBox = document.getElementById('nut-totals');
const nutMeals = document.getElementById('nut-meals');
const targetMeal = document.getElementById('target-meal');

const tgKcal = document.getElementById('tg-kcal');
const tgProtein = document.getElementById('tg-protein');
const tgCarbs = document.getElementById('tg-carbs');
const tgFat = document.getElementById('tg-fat');

function readTargets() {
  coachNutrition.targets.kcal = Number(tgKcal.value) || 0;
  coachNutrition.targets.protein = Number(tgProtein.value) || 0;
  coachNutrition.targets.carbs = Number(tgCarbs.value) || 0;
  coachNutrition.targets.fat = Number(tgFat.value) || 0;
}

[tgKcal, tgProtein, tgCarbs, tgFat].forEach(function (input) {
  input.addEventListener('input', function () {
    readTargets();
    showNutrition();
  });
});

function fillMealPicker() {
  const keep = targetMeal.value;
  targetMeal.innerHTML = '';
  MEAL_KEYS.forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = MEAL_ICONS[key] + '  ' + mealName(key);
    targetMeal.appendChild(option);
  });
  targetMeal.value = keep || 'breakfast';
  if (!targetMeal.value) targetMeal.value = 'breakfast';
}

function foodItemRow(item, list, index, editable, onChange) {
  const li = document.createElement('li');

  const info = document.createElement('div');

  const name = document.createElement('div');
  name.className = 'food-name';
  name.textContent = item.name;
  info.appendChild(name);

  const m = itemMacros(item);
  const macros = document.createElement('div');
  macros.className = 'food-macros';
  macros.textContent =
    Math.round(m.kcal) + ' ' + t('t_kcal') + ' · ' +
    t('t_protein') + ' ' + m.protein.toFixed(1) + ' · ' +
    t('t_carbs') + ' ' + m.carbs.toFixed(1) + ' · ' +
    t('t_fat') + ' ' + m.fat.toFixed(1);
  info.appendChild(macros);

  li.appendChild(info);

  const right = document.createElement('div');
  right.style.display = 'flex';
  right.style.alignItems = 'center';
  right.style.gap = '6px';

  if (editable) {
    const grams = document.createElement('input');
    grams.className = 'grams-input';
    grams.type = 'number';
    grams.value = item.grams;
    grams.addEventListener('click', function (e) { e.stopPropagation(); });
    grams.addEventListener('input', function () {
      item.grams = Number(grams.value) || 0;
      if (onChange) onChange();
    });
    right.appendChild(grams);

    const remove = document.createElement('button');
    remove.className = 'delete';
    remove.textContent = '✕';
    remove.addEventListener('click', function (e) {
      e.stopPropagation();
      list.splice(index, 1);
      if (onChange) onChange();
    });
    right.appendChild(remove);
  } else {
    const grams = document.createElement('span');
    grams.textContent = item.grams + ' ' + t('grams');
    right.appendChild(grams);
  }

  li.appendChild(right);
  return li;
}

function renderMeals(container, day, editable, onChange) {
  container.innerHTML = '';

  const total = nutritionDayCount(day);
  if (!total && !editable) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = t('no_meals');
    container.appendChild(empty);
    return;
  }

  MEAL_KEYS.forEach(function (key) {
    const list = day.meals[key];
    if (!editable && !list.length) return;

    const block = document.createElement('div');
    block.className = 'meal-block';

    const head = document.createElement('div');
    head.className = 'meal-head';

    const title = document.createElement('div');
    title.className = 'meal-name';
    title.textContent = MEAL_ICONS[key] + ' ' + mealName(key);
    head.appendChild(title);

    const kcal = document.createElement('div');
    kcal.className = 'meal-kcal';
    kcal.textContent = Math.round(mealTotals(list).kcal) + ' ' + t('t_kcal');
    head.appendChild(kcal);

    block.appendChild(head);

    if (!list.length) {
      const empty = document.createElement('div');
      empty.className = 'section-empty';
      empty.textContent = t('section_empty');
      block.appendChild(empty);
    } else {
      const ul = document.createElement('ul');
      list.forEach(function (item, index) {
        ul.appendChild(foodItemRow(item, list, index, editable, onChange));
      });
      block.appendChild(ul);
    }

    container.appendChild(block);
  });
}

function showNutritionDays() {
  renderDial('nut-ring', 'nut-dc-day', 'nut-dc-sub', coachNutrition.week, nutDay, function (index) {
    nutDay = index;
    showNutrition();
  }, nutritionDescribe);
}

function showNutrition() {
  tgKcal.value = coachNutrition.targets.kcal || '';
  tgProtein.value = coachNutrition.targets.protein || '';
  tgCarbs.value = coachNutrition.targets.carbs || '';
  tgFat.value = coachNutrition.targets.fat || '';

  const day = coachNutrition.week[nutDay];
  renderTotals(nutTotalsBox, dayTotals(day), coachNutrition.targets);
  renderMeals(nutMeals, day, true, showNutrition);
  fillMealPicker();
  showNutritionDays();
}

document.getElementById('save-nutrition-btn').addEventListener('click', async function () {
  readTargets();
  coachMessage.textContent = t('saving');
  try {
    await setDoc(doc(db, 'nutrition', currentClient), coachNutrition);
    coachMessage.textContent = t('saved_nutrition');
  } catch (error) {
    coachMessage.textContent = t('problem') + error.message;
  }
});

/* ---------- مكتبة الأغذية ---------- */

const foodSearch = document.getElementById('food-search');
const foodChips = document.getElementById('food-chips');
const foodList = document.getElementById('food-list');
const foodMessage = document.getElementById('food-message');
const cfName = document.getElementById('cf-name');
const cfCat = document.getElementById('cf-cat');

let myFoods = [];
let activeFoodCat = '';

function allFoods() {
  // الأصناف اللي المدرب ضافها بتيجي الأول، وبتغلب لو نفس الـid
  const custom = myFoods.slice();
  const customIds = custom.map(function (f) { return f.id; });
  const base = FOOD_LIBRARY.filter(function (f) {
    return customIds.indexOf(f.id) === -1;
  });
  return custom.concat(base);
}

function openFoodLibrary() {
  readTargets();
  showScreen(foodScreen);
  fillFoodCatSelect();
  loadMyFoods();
}

document.getElementById('open-food-btn').addEventListener('click', openFoodLibrary);

document.getElementById('food-back-btn').addEventListener('click', function () {
  showScreen(coachScreen);
  showNutrition();
});

function fillFoodCatSelect() {
  const keep = cfCat.value;
  cfCat.innerHTML = '';
  Object.keys(FOOD_CATEGORIES).forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = foodCategoryName(key);
    cfCat.appendChild(option);
  });
  if (keep) cfCat.value = keep;
}

async function loadMyFoods() {
  foodMessage.textContent = t('loading');
  try {
    const snapshot = await getDocs(collection(db, 'myFoods'));
    myFoods = snapshot.docs.map(function (item) {
      const data = item.data();
      data.id = item.id;
      data.custom = true;
      return data;
    });
    foodMessage.textContent = '';
  } catch (error) {
    foodMessage.textContent = t('problem') + error.message;
  }
  renderFoodChips();
  renderFoodList();
}

function renderFoodChips() {
  foodChips.innerHTML = '';
  const keys = [''].concat(Object.keys(FOOD_CATEGORIES));

  keys.forEach(function (key) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip' + (key === activeFoodCat ? ' active' : '');
    chip.textContent = key === '' ? t('all_foods') : foodCategoryName(key);
    chip.addEventListener('click', function () {
      activeFoodCat = key;
      renderFoodChips();
      renderFoodList();
    });
    foodChips.appendChild(chip);
  });
}

function renderFoodList() {
  const term = foodSearch.value.trim().toLowerCase();

  const matches = allFoods().filter(function (food) {
    if (activeFoodCat && food.cat !== activeFoodCat) return false;
    if (!term) return true;
    return String(food.ar || '').toLowerCase().indexOf(term) !== -1
        || String(food.en || '').toLowerCase().indexOf(term) !== -1;
  });

  foodList.innerHTML = '';

  matches.slice(0, 80).forEach(function (food) {
    const li = document.createElement('li');

    const info = document.createElement('div');

    const name = document.createElement('div');
    name.className = 'food-name';
    name.textContent = food[lang] || food.ar || food.en;
    if (food.custom) {
      const badge = document.createElement('span');
      badge.className = 'food-badge';
      badge.textContent = t('my_food');
      name.appendChild(badge);
    }
    info.appendChild(name);

    const per = document.createElement('div');
    per.className = 'food-per100';
    per.textContent = food.c + ' ' + t('t_kcal') + ' · '
      + t('t_protein') + ' ' + food.p + ' · '
      + t('t_carbs') + ' ' + food.cb + ' · '
      + t('t_fat') + ' ' + food.f + '  / 100' + t('grams');
    info.appendChild(per);

    li.appendChild(info);

    li.addEventListener('click', function () {
      const key = targetMeal.value || 'breakfast';
      coachNutrition.week[nutDay].meals[key].push(makeFoodItem(food, 100));
      showScreen(coachScreen);
      showNutrition();
      coachMessage.textContent = fill('added_ex', { name: food[lang] || food.ar || food.en });
    });

    foodList.appendChild(li);
  });

  foodMessage.textContent = matches.length
    ? fill('food_count', { n: matches.length })
    : t('no_matches');
}

foodSearch.addEventListener('input', renderFoodList);

document.getElementById('cf-add-btn').addEventListener('click', async function () {
  const name = cfName.value.trim();
  const kcal = Number(document.getElementById('cf-kcal').value);

  if (!name || !kcal) {
    foodMessage.textContent = t('need_food_name');
    return;
  }

  const id = 'food_' + Date.now();
  foodMessage.textContent = t('saving');

  try {
    await setDoc(doc(db, 'myFoods', id), {
      ar: name,
      en: name,
      cat: cfCat.value || 'protein',
      c: kcal,
      p: Number(document.getElementById('cf-protein').value) || 0,
      cb: Number(document.getElementById('cf-carbs').value) || 0,
      f: Number(document.getElementById('cf-fat').value) || 0
    });

    cfName.value = '';
    document.getElementById('cf-kcal').value = '';
    document.getElementById('cf-protein').value = '';
    document.getElementById('cf-carbs').value = '';
    document.getElementById('cf-fat').value = '';

    await loadMyFoods();
    foodMessage.textContent = t('food_saved');
  } catch (error) {
    foodMessage.textContent = t('problem') + error.message;
  }
});

/* ---------- شاشة العميل — التغذية ---------- */

const cnutTotals = document.getElementById('cnut-totals');
const cnutMeals = document.getElementById('cnut-meals');

function showClientNutrition() {
  if (!nutritionHasContent(clientNutrition)) {
    cnutTotals.innerHTML = '';
    cnutMeals.innerHTML = '';
    const none = document.createElement('p');
    none.className = 'rehab-none';
    none.textContent = t('no_nutrition');
    cnutMeals.appendChild(none);
    return;
  }

  const day = clientNutrition.week[cNutDay];
  renderTotals(cnutTotals, dayTotals(day), clientNutrition.targets);
  renderMeals(cnutMeals, day, false, null);

  renderDial('cnut-ring', 'cnut-dc-day', 'cnut-dc-sub', clientNutrition.week, cNutDay, function (index) {
    cNutDay = index;
    showClientNutrition();
  }, nutritionDescribe);
}


/* ============================ تسجيل النشاط (العميل) ============================ */

const actSport = document.getElementById('act-sport');
const actFields = document.getElementById('act-fields');
const actNotes = document.getElementById('act-notes');
const actList = document.getElementById('act-list');
const actMessage = document.getElementById('act-message');

/* الحقول بتتبني حسب نوع القياس الخاص بالرياضة المختارة */
function renderActivityFields() {
  actFields.innerHTML = '';

  const sport = sportById(actSport.value);
  if (!sport) return;

  const metric = SPORT_METRICS[sport.metric];
  if (!metric) return;

  metric.fields.forEach(function (key) {
    const spec = METRIC_FIELDS[key];
    const input = document.createElement('input');
    input.id = 'actf-' + key;
    input.dataset.field = key;
    input.type = spec.type === 'number' ? 'number' : 'text';
    const unit = metricFieldUnit(key);
    input.placeholder = metricFieldName(key) + (unit ? ' (' + unit + ')' : '');
    actFields.appendChild(input);
  });
}

actSport.addEventListener('change', renderActivityFields);

function activitySummary(entry) {
  const sport = sportById(entry.sportId);
  if (!sport) return '';
  const metric = SPORT_METRICS[sport.metric];
  const parts = [];
  (metric ? metric.fields : []).forEach(function (key) {
    const value = entry.values ? entry.values[key] : '';
    if (value === '' || value === undefined || value === null) return;
    const unit = metricFieldUnit(key);
    parts.push(value + (unit ? ' ' + unit : '') );
  });
  return sportName(entry.sportId) + (parts.length ? ' · ' + parts.join(' · ') : '');
}

function renderActivity() {
  actList.innerHTML = '';

  if (!clientActivity.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = t('no_activity_yet');
    actList.appendChild(empty);
    return;
  }

  const sorted = clientActivity.slice().sort(function (a, b) {
    return String(b.date).localeCompare(String(a.date));
  });

  sorted.forEach(function (entry) {
    const item = document.createElement('li');
    item.className = 'act-entry';

    const head = document.createElement('div');
    head.className = 'act-head';

    const name = document.createElement('div');
    name.className = 'act-sport';
    name.textContent = sportName(entry.sportId);
    head.appendChild(name);

    const right = document.createElement('div');
    right.style.display = 'flex';
    right.style.alignItems = 'center';
    right.style.gap = '6px';

    const date = document.createElement('span');
    date.className = 'act-date';
    date.textContent = entry.date;
    right.appendChild(date);

    const remove = document.createElement('button');
    remove.className = 'delete';
    remove.textContent = '✕';
    remove.addEventListener('click', async function () {
      if (!confirm(t('confirm_delete_activity'))) return;
      clientActivity = clientActivity.filter(function (e) { return e.id !== entry.id; });
      await saveActivity();
      renderActivity();
    });
    right.appendChild(remove);

    head.appendChild(right);
    item.appendChild(head);

    const sport = sportById(entry.sportId);
    const metric = sport ? SPORT_METRICS[sport.metric] : null;
    if (metric) {
      const tags = document.createElement('div');
      tags.className = 'act-metrics';
      metric.fields.forEach(function (key) {
        const value = entry.values ? entry.values[key] : '';
        if (value === '' || value === undefined || value === null) return;
        const tag = document.createElement('span');
        tag.className = 'ex-tag';
        const unit = metricFieldUnit(key);
        tag.textContent = metricFieldName(key) + ': ' + value + (unit ? ' ' + unit : '');
        tags.appendChild(tag);
      });
      if (tags.children.length) item.appendChild(tags);
    }

    if (entry.notes) {
      const notes = document.createElement('div');
      notes.className = 'act-notes';
      notes.textContent = entry.notes;
      item.appendChild(notes);
    }

    actList.appendChild(item);
  });
}

async function saveActivity() {
  await setDoc(doc(db, 'activity', clientEmail), { entries: clientActivity });
}

document.getElementById('act-add-btn').addEventListener('click', async function () {
  const sportId = actSport.value;
  if (!sportId) {
    actMessage.textContent = t('need_activity');
    return;
  }

  const values = {};
  let hasValue = false;
  actFields.querySelectorAll('input').forEach(function (input) {
    const v = input.value.trim();
    if (v) { values[input.dataset.field] = v; hasValue = true; }
  });

  if (!hasValue) {
    actMessage.textContent = t('need_activity');
    return;
  }

  actMessage.textContent = t('saving');

  const now = new Date();
  const stamp = now.getFullYear() + '-'
    + String(now.getMonth() + 1).padStart(2, '0') + '-'
    + String(now.getDate()).padStart(2, '0');

  clientActivity.push({
    id: 'act_' + Date.now(),
    sportId: sportId,
    date: stamp,
    values: values,
    notes: actNotes.value.trim()
  });

  try {
    await saveActivity();
    actFields.querySelectorAll('input').forEach(function (i) { i.value = ''; });
    actNotes.value = '';
    renderActivity();
    actMessage.textContent = t('activity_saved');
  } catch (error) {
    actMessage.textContent = t('problem') + error.message;
  }
});

function showClientActivity() {
  fillSportSelect(actSport, true);
  if (!actSport.value && clientSport) actSport.value = clientSport;
  renderActivityFields();
  renderActivity();
}


/* ============================ الكلاسات ============================ */

/*
 * التحديث اللحظي (onSnapshot) بيستهلك من حصة القراءة المجانية.
 * عشان كده هو شغال في شاشة الكلاس بس، وبيتقفل تلقائيًا أول ما تخرج
 * منها، وفيه زرار إيقاف يدوي + تحديث يدوي كبديل.
 */



const classesList = document.getElementById('classes-list');
const classesMessage = document.getElementById('classes-message');
const clSport = document.getElementById('cl-sport');
const classDetailTitle = document.getElementById('class-detail-title');
const classDetailSub = document.getElementById('class-detail-sub');
const classTodayList = document.getElementById('class-today');
const classWeekList = document.getElementById('class-week');
const classMembersList = document.getElementById('class-members');
const clMemberPick = document.getElementById('cl-member-pick');
const classDetailMessage = document.getElementById('class-detail-message');
const liveDot = document.getElementById('live-dot');
const liveLabel = document.getElementById('live-label');
const liveToggle = document.getElementById('live-toggle');

/* ---------- تواريخ الأسبوع الحالي ---------- */

function weekStamps() {
  // آخر 7 أيام بما فيهم النهاردة
  const out = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push(dateStamp(d));
  }
  return out;
}

/* ---------- تحميل وحفظ ---------- */

async function loadClasses() {
  classesMessage.textContent = t('loading');
  try {
    const snapshot = await getDocs(collection(db, 'classes'));
    classes = snapshot.docs.map(function (item) {
      const data = item.data();
      data.id = item.id;
      if (!Array.isArray(data.members)) data.members = [];
      return data;
    });
    classesMessage.textContent = '';
  } catch (error) {
    classesMessage.textContent = t('problem') + error.message;
  }
  renderClasses();
}

function renderClasses() {
  classesList.innerHTML = '';

  if (!classes.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = t('no_classes');
    classesList.appendChild(empty);
    return;
  }

  classes.forEach(function (cls) {
    const item = document.createElement('li');
    item.className = 'class-card';

    const head = document.createElement('div');
    head.style.display = 'flex';
    head.style.justifyContent = 'space-between';
    head.style.alignItems = 'flex-start';
    head.style.gap = '8px';

    const info = document.createElement('div');

    const name = document.createElement('div');
    name.className = 'class-name';
    name.textContent = cls.name;
    info.appendChild(name);

    const meta = document.createElement('div');
    meta.className = 'class-meta';
    const bits = [];
    if (cls.sport) bits.push(sportName(cls.sport));
    if (cls.time) bits.push(cls.time);
    meta.textContent = bits.join(' · ');
    info.appendChild(meta);

    const count = document.createElement('div');
    count.className = 'class-count';
    count.textContent = fill('members_count', { n: cls.members.length });
    info.appendChild(count);

    head.appendChild(info);

    const remove = document.createElement('button');
    remove.className = 'delete';
    remove.textContent = '✕';
    remove.addEventListener('click', async function (event) {
      event.stopPropagation();
      if (!confirm(t('confirm_delete_class'))) return;
      try {
        await deleteDoc(doc(db, 'classes', cls.id));
        await loadClasses();
      } catch (error) {
        classesMessage.textContent = t('problem') + error.message;
      }
    });
    head.appendChild(remove);

    item.appendChild(head);

    item.addEventListener('click', function () {
      openClassDetail(cls.id);
    });

    classesList.appendChild(item);
  });
}

document.getElementById('open-classes-btn').addEventListener('click', function () {
  showScreen(classesScreen);
  fillSportSelect(clSport, true);
  loadClasses();
});

document.getElementById('classes-back-btn').addEventListener('click', function () {
  showScreen(clientsScreen);
  loadClients();
});

document.getElementById('cl-add-btn').addEventListener('click', async function () {
  const name = document.getElementById('cl-name').value.trim();
  if (!name) {
    classesMessage.textContent = t('need_class_name');
    return;
  }

  classesMessage.textContent = t('saving');
  const id = 'class_' + Date.now();

  try {
    await setDoc(doc(db, 'classes', id), {
      name: name,
      sport: clSport.value || '',
      time: document.getElementById('cl-time').value.trim(),
      members: []
    });
    document.getElementById('cl-name').value = '';
    document.getElementById('cl-time').value = '';
    await loadClasses();
    classesMessage.textContent = t('class_saved');
  } catch (error) {
    classesMessage.textContent = t('problem') + error.message;
  }
});

/* ---------- تفاصيل الكلاس + اللوحات ---------- */

function classById(id) {
  return classes.filter(function (c) { return c.id === id; })[0] || null;
}

async function openClassDetail(id) {
  currentClass = classById(id);
  if (!currentClass) return;

  showScreen(classDetailScreen);
  classDetailTitle.textContent = currentClass.name;

  const bits = [];
  if (currentClass.sport) bits.push(sportName(currentClass.sport));
  if (currentClass.time) bits.push(currentClass.time);
  classDetailSub.textContent = bits.join(' · ');

  document.getElementById('class-members-box').classList.remove('hidden');

  await loadClientsCache();
  fillMemberPicker();
  await refreshBoards();
  startLive();
}

document.getElementById('class-detail-back').addEventListener('click', function () {
  stopLive();
  showScreen(classesScreen);
  renderClasses();
});

async function loadClientsCache() {
  try {
    const snapshot = await getDocs(collection(db, 'clients'));
    clientsCache = snapshot.docs.map(function (item) {
      return { email: item.id, name: item.data().name || item.id };
    });
  } catch (error) {
    clientsCache = [];
  }
}

function clientNameOf(email) {
  const found = clientsCache.filter(function (c) { return c.email === email; })[0];
  return found ? found.name : email;
}

function fillMemberPicker() {
  clMemberPick.innerHTML = '';
  clientsCache.forEach(function (c) {
    const option = document.createElement('option');
    option.value = c.email;
    option.textContent = c.name;
    clMemberPick.appendChild(option);
  });
}

document.getElementById('cl-member-add').addEventListener('click', async function () {
  if (!currentClass) return;
  const email = clMemberPick.value;
  if (!email) return;

  if (currentClass.members.indexOf(email) !== -1) {
    classDetailMessage.textContent = t('already_member');
    return;
  }

  currentClass.members.push(email);
  classDetailMessage.textContent = t('saving');

  try {
    await setDoc(doc(db, 'classes', currentClass.id), {
      name: currentClass.name,
      sport: currentClass.sport || '',
      time: currentClass.time || '',
      members: currentClass.members
    });
    classDetailMessage.textContent = '';
    await refreshBoards();
  } catch (error) {
    classDetailMessage.textContent = t('problem') + error.message;
  }
});

/* بيقرا تقدّم كل عضو مرة واحدة ويخزّنه */
async function loadProgressFor(members) {
  const cache = {};
  for (const email of members) {
    try {
      const snap = await getDoc(doc(db, 'progress', email));
      cache[email] = snap.exists() ? snap.data() : null;
    } catch (error) {
      cache[email] = null;
    }
  }
  return cache;
}

async function refreshBoards() {
  if (!currentClass) return;
  progressCache = await loadProgressFor(currentClass.members);
  renderBoards();
  renderClassMembers();
}

function isDoneToday(entry) {
  return !!(entry && entry.date === today && Array.isArray(entry.done) && entry.done.length > 0);
}

function renderBoards(meEmail) {
  const members = currentClass ? currentClass.members : [];

  /* لوحة النهاردة */
  classTodayList.innerHTML = '';
  if (!members.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = t('no_members');
    classTodayList.appendChild(empty);
  } else {
    members.forEach(function (email) {
      const entry = progressCache[email];
      const done = isDoneToday(entry);

      const item = document.createElement('li');
      item.className = 'board-row';

      const badge = document.createElement('span');
      badge.className = 'rank-badge' + (done ? ' top' : '');
      badge.textContent = done ? '✓' : '·';
      item.appendChild(badge);

      const name = document.createElement('span');
      name.className = 'board-name';
      name.textContent = clientNameOf(email);
      if (meEmail && email === meEmail) {
        const tag = document.createElement('span');
        tag.className = 'board-me';
        tag.textContent = t('me');
        name.appendChild(tag);
      }
      item.appendChild(name);

      const stat = document.createElement('span');
      stat.className = 'board-stat' + (done ? ' done' : '');
      stat.textContent = done
        ? fill('done_count', { n: entry.done.length })
        : t('not_yet_today');
      item.appendChild(stat);

      classTodayList.appendChild(item);
    });
  }

  /* ترتيب الأسبوع — بيعتمد على أيام الالتزام المسجّلة */
  classWeekList.innerHTML = '';
  const stamps = weekStamps();

  const ranked = members.map(function (email) {
    const entry = progressCache[email];
    // سجل التقدّم بيحتفظ بآخر يوم بس، فبنحسب يوم واحد لو ضمن الأسبوع
    let daysDone = 0;
    if (entry && entry.date && stamps.indexOf(entry.date) !== -1
        && Array.isArray(entry.done) && entry.done.length) {
      daysDone = 1;
    }
    if (entry && Array.isArray(entry.history)) {
      daysDone = entry.history.filter(function (d) {
        return stamps.indexOf(d) !== -1;
      }).length;
    }
    return { email: email, days: daysDone };
  }).sort(function (a, b) { return b.days - a.days; });

  if (!ranked.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = t('no_members');
    classWeekList.appendChild(empty);
  } else {
    ranked.forEach(function (row, index) {
      const item = document.createElement('li');
      item.className = 'board-row';

      const badge = document.createElement('span');
      badge.className = 'rank-badge' + (index < 3 && row.days > 0 ? ' top' : '');
      badge.textContent = String(index + 1);
      item.appendChild(badge);

      const name = document.createElement('span');
      name.className = 'board-name';
      name.textContent = clientNameOf(row.email);
      if (meEmail && row.email === meEmail) {
        const tag = document.createElement('span');
        tag.className = 'board-me';
        tag.textContent = t('me');
        name.appendChild(tag);
      }
      item.appendChild(name);

      const stat = document.createElement('span');
      stat.className = 'board-stat' + (row.days ? ' done' : '');
      stat.textContent = fill('days_done', { n: row.days });
      item.appendChild(stat);

      classWeekList.appendChild(item);
    });
  }
}

function renderClassMembers() {
  classMembersList.innerHTML = '';
  if (!currentClass) return;

  currentClass.members.forEach(function (email, index) {
    const item = document.createElement('li');

    const name = document.createElement('div');
    name.textContent = clientNameOf(email);
    item.appendChild(name);

    const remove = document.createElement('button');
    remove.className = 'delete';
    remove.textContent = '✕';
    remove.addEventListener('click', async function () {
      currentClass.members.splice(index, 1);
      try {
        await setDoc(doc(db, 'classes', currentClass.id), {
          name: currentClass.name,
          sport: currentClass.sport || '',
          time: currentClass.time || '',
          members: currentClass.members
        });
        await refreshBoards();
      } catch (error) {
        classDetailMessage.textContent = t('problem') + error.message;
      }
    });
    item.appendChild(remove);

    classMembersList.appendChild(item);
  });
}

/* ---------- التحديث اللحظي (محدود بشاشة الكلاس) ---------- */

function paintLiveState() {
  liveDot.classList.toggle('off', !liveEnabled);
  liveLabel.textContent = liveEnabled ? t('live_on') : t('live_off');
  liveToggle.textContent = liveEnabled ? t('turn_off') : t('turn_on');
}

function startLive() {
  stopLive();
  paintLiveState();
  if (!liveEnabled || !currentClass) return;

  try {
    liveUnsub = onSnapshot(doc(db, 'classes', currentClass.id), function (snap) {
      if (!snap.exists()) return;
      const data = snap.data();
      currentClass.name = data.name;
      currentClass.sport = data.sport || '';
      currentClass.time = data.time || '';
      currentClass.members = Array.isArray(data.members) ? data.members : [];
      refreshBoards();
    });
  } catch (error) {
    liveUnsub = null;
  }
}

function stopLive() {
  if (liveUnsub) {
    try { liveUnsub(); } catch (error) { /* تجاهل */ }
    liveUnsub = null;
  }
}

liveToggle.addEventListener('click', function () {
  liveEnabled = !liveEnabled;
  localStorage.setItem('adam-live', liveEnabled ? 'on' : 'off');
  if (liveEnabled) startLive(); else { stopLive(); paintLiveState(); }
});

document.getElementById('live-refresh').addEventListener('click', function () {
  if (!classDetailScreen.classList.contains('hidden')) refreshBoards();
  else if (!clientClassesPanel.classList.contains('hidden')) showClientClasses();
});

/* ---------- شاشة العميل — الكلاس ---------- */

let myClasses = [];

async function showClientClasses() {
  const box = document.getElementById('client-class-body');
  box.innerHTML = '';

  try {
    const snapshot = await getDocs(collection(db, 'classes'));
    myClasses = snapshot.docs
      .map(function (item) {
        const data = item.data();
        data.id = item.id;
        if (!Array.isArray(data.members)) data.members = [];
        return data;
      })
      .filter(function (c) { return c.members.indexOf(clientEmail) !== -1; });
  } catch (error) {
    myClasses = [];
  }

  if (!myClasses.length) {
    const none = document.createElement('p');
    none.className = 'no-class';
    none.textContent = t('no_class_yet');
    box.appendChild(none);
    return;
  }

  await loadClientsCache();

  for (const cls of myClasses) {
    const title = document.createElement('h2');
    title.textContent = cls.name;
    box.appendChild(title);

    const sub = document.createElement('p');
    sub.className = 'progress';
    const bits = [];
    if (cls.sport) bits.push(sportName(cls.sport));
    if (cls.time) bits.push(cls.time);
    sub.textContent = bits.join(' · ');
    box.appendChild(sub);

    currentClass = cls;
    progressCache = await loadProgressFor(cls.members);

    const todayHead = document.createElement('h3');
    todayHead.textContent = t('today_board');
    box.appendChild(todayHead);

    const todayUl = document.createElement('ul');
    todayUl.id = 'class-today';
    box.appendChild(todayUl);

    const weekHead = document.createElement('h3');
    weekHead.textContent = t('week_board');
    box.appendChild(weekHead);

    const weekUl = document.createElement('ul');
    weekUl.id = 'class-week';
    box.appendChild(weekUl);

    // نعيد استخدام نفس الرسم بس على العناصر الجديدة
    renderBoardsInto(todayUl, weekUl, cls, clientEmail);
  }
}

/* نسخة من renderBoards بتكتب في عناصر محددة (شاشة العميل) */
function renderBoardsInto(todayUl, weekUl, cls, meEmail) {
  const keepToday = classTodayList.innerHTML;
  const members = cls.members;

  todayUl.innerHTML = '';
  members.forEach(function (email) {
    const entry = progressCache[email];
    const done = isDoneToday(entry);

    const item = document.createElement('li');
    item.className = 'board-row';

    const badge = document.createElement('span');
    badge.className = 'rank-badge' + (done ? ' top' : '');
    badge.textContent = done ? '✓' : '·';
    item.appendChild(badge);

    const name = document.createElement('span');
    name.className = 'board-name';
    name.textContent = clientNameOf(email);
    if (email === meEmail) {
      const tag = document.createElement('span');
      tag.className = 'board-me';
      tag.textContent = t('me');
      name.appendChild(tag);
    }
    item.appendChild(name);

    const stat = document.createElement('span');
    stat.className = 'board-stat' + (done ? ' done' : '');
    stat.textContent = done ? fill('done_count', { n: entry.done.length }) : t('not_yet_today');
    item.appendChild(stat);

    todayUl.appendChild(item);
  });

  const stamps = weekStamps();
  const ranked = members.map(function (email) {
    const entry = progressCache[email];
    let daysDone = 0;
    if (entry && entry.date && stamps.indexOf(entry.date) !== -1
        && Array.isArray(entry.done) && entry.done.length) daysDone = 1;
    if (entry && Array.isArray(entry.history)) {
      daysDone = entry.history.filter(function (d) { return stamps.indexOf(d) !== -1; }).length;
    }
    return { email: email, days: daysDone };
  }).sort(function (a, b) { return b.days - a.days; });

  weekUl.innerHTML = '';
  ranked.forEach(function (row, index) {
    const item = document.createElement('li');
    item.className = 'board-row';

    const badge = document.createElement('span');
    badge.className = 'rank-badge' + (index < 3 && row.days > 0 ? ' top' : '');
    badge.textContent = String(index + 1);
    item.appendChild(badge);

    const name = document.createElement('span');
    name.className = 'board-name';
    name.textContent = clientNameOf(row.email);
    if (row.email === meEmail) {
      const tag = document.createElement('span');
      tag.className = 'board-me';
      tag.textContent = t('me');
      name.appendChild(tag);
    }
    item.appendChild(name);

    const stat = document.createElement('span');
    stat.className = 'board-stat' + (row.days ? ' done' : '');
    stat.textContent = fill('days_done', { n: row.days });
    item.appendChild(stat);

    weekUl.appendChild(item);
  });

  classTodayList.innerHTML = keepToday;
}

/* ---------- إعادة الرسم بعد تغيير اللغة ---------- */

function refreshAll() {
  /*
   * القوايم المنسدلة بتتبنى مرة واحدة وبتفضل في الصفحة حتى لو شاشتها
   * مخفية، فبنعيد بناءها دايمًا بعد تغيير اللغة — مش بس لو ظاهرة.
   */
  fillSectionPicker();
  fillBodyParts();
  fillTemplatePicker();
  fillMyLibSelects();
  fillMealPicker();
  fillFoodCatSelect();
  fillSportSelect(document.getElementById('new-sport'), true);
  fillSportSelect(coachSport, true);
  fillSportSelect(clSport, true);
  fillSportTemplatePicker();
  paintLiveState();

  if (!coachScreen.classList.contains('hidden')) {
    if (coachMode === 'rehab') showRehab();
    else if (coachMode === 'nutrition') showNutrition();
    else showCoachDay();
  }
  if (!clientScreen.classList.contains('hidden')) {
    showClientDay();
    showClientRehab();
    showClientNutrition();
    showClientActivity();
  }
  if (!foodScreen.classList.contains('hidden')) {
    renderFoodChips();
    renderFoodList();
  }
  if (!clientsScreen.classList.contains('hidden')) loadClients();
  if (!classesScreen.classList.contains('hidden')) renderClasses();
  if (!classDetailScreen.classList.contains('hidden')) { renderBoards(); renderClassMembers(); }
  if (!libraryScreen.classList.contains('hidden')) {
    rebuildLibraryFilters();
    renderLibrary();
  }
  if (!mylibScreen.classList.contains('hidden')) {
    renderMyLib();
  }
}

applyLanguage();