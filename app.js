import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc as fbSetDoc, addDoc as fbAddDoc, updateDoc as fbUpdateDoc, deleteDoc, deleteField, collection, getDocs, onSnapshot, query, where, orderBy } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { firebaseConfig, COACH_EMAIL } from './firebase-config.js';
import { REHAB_TEMPLATES as BASE_REHAB_TEMPLATES } from './rehab-templates.js';
import { FOOD_LIBRARY as BASE_FOOD_LIBRARY, FOOD_CATEGORIES, FOOD_UNITS, FOOD_SERVINGS as BASE_FOOD_SERVINGS, CAT_PORTIONS } from './food-library.js';
import { NUTRITION_PROGRAMS as BASE_NUTRITION_PROGRAMS } from './nutrition-programs.js';
import { MODALITIES as BASE_MODALITIES, MODALITY_PROTOCOLS as BASE_MODALITY_PROTOCOLS } from './modalities-library.js';
import { HEALTH_CONDITIONS, CONDITION_ORDER, PREGNANCY, POSTPARTUM, CYCLE_PHASES, CYCLE_ORDER, CYCLE_RED_FLAGS } from './health-conditions.js';
import { SUPPLEMENT_LIBRARY as BASE_SUPPLEMENT_LIBRARY, SUPPLEMENT_CATEGORIES, EVIDENCE_GRADES } from './supplement-library.js';
import { SPORTS, SPORT_GROUPS, SPORT_METRICS, METRIC_FIELDS, SPORT_TEMPLATES as BASE_SPORT_TEMPLATES } from './sports.js';
import { SPECIALTIES, specialtyName, specialtyIconSvg, MED_CATEGORIES, MED_REVIEW, DEFAULT_RED_FLAGS, SESSION_TYPES, BOOKING_STATUS, specialtyClears } from './providers.js';
import { MED_LIBRARY_SEED as BASE_MED_LIBRARY_SEED } from './med-library-seed.js';
import { EXERCISE_LIBRARY as BASE_EXERCISES } from './exercise-library.js';
import { DRILLS_LIBRARY, DRILL_CATEGORIES, DRILL_EQUIPMENT } from './drills-library.js';
/*
 * الإضافات الجديدة — كل مكتبة ليها ملف "extra" جنب الأصلي، والأصلي
 * زي ما هو من غير أي تعديل. بنجمعهم هنا مرة واحدة وباقي الكود بيشتغل
 * على الأسماء القديمة نفسها
 */
import { SPORT_TEMPLATES_EXTRA } from './library/templates-extra.js';
import { REHAB_TEMPLATES_EXTRA } from './library/rehab-extra.js';
import { FOOD_LIBRARY_EXTRA, FOOD_SERVINGS_EXTRA } from './library/food-extra.js';
import { NUTRITION_PROGRAMS_EXTRA } from './library/programs-extra.js';
import { SUPPLEMENT_LIBRARY_EXTRA } from './library/supplements-extra.js';
import { MED_LIBRARY_SEED_EXTRA } from './library/med-extra.js';
import { MODALITIES_EXTRA, MODALITY_PROTOCOLS_EXTRA } from './library/modalities-extra.js';
import { MODALITY_VALUES_EN } from './library/modalities-en.js';

/* ============================================================
   حارس الكتابة في قاعدة البيانات
   Firestore بيرفض أي حقل قيمته undefined ويرمي الشاشة كلها في الخطأ.
   ده حصل فعلًا في التسجيل: حقل "مين رشحك" كان بيطلع undefined لو
   مستند المتخصص مالوش حقل email، فالعميل ميقدرش يكمّل تسجيل خالص.
   بدل ما نلاحق كل حقل على حدة، بنشيل أي undefined من أي بيانات
   رايحة للداتابيز. الحقل الفاضي بيتشال، والباقي بيتكتب عادي.
   ============================================================ */
function dropUndefined(value) {
  if (Array.isArray(value)) {
    return value.filter(function (item) { return item !== undefined; }).map(dropUndefined);
  }
  // بنسيب التواريخ وأي كائن مش عادي زي ما هو
  if (!value || typeof value !== 'object' || value instanceof Date) return value;
  if (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) return value;
  const out = {};
  Object.keys(value).forEach(function (key) {
    if (value[key] === undefined) return;
    out[key] = dropUndefined(value[key]);
  });
  return out;
}

function setDoc(ref, data, options) {
  return options === undefined
    ? fbSetDoc(ref, dropUndefined(data))
    : fbSetDoc(ref, dropUndefined(data), options);
}

function addDoc(ref, data) {
  return fbAddDoc(ref, dropUndefined(data));
}

function updateDoc(ref, data) {
  return fbUpdateDoc(ref, dropUndefined(data));
}


/*
 * مكتبة التمارين = تمارين الحديد + الدريلات (كروس فيت/هايروكس/ملاعب/كارديو).
 * بنضمّهم في قايمة واحدة عشان البحث والفلاتر والقوالب تشتغل عليهم
 * كلهم من غير أي مسار تاني في الكود
 */
const EXERCISE_LIBRARY = BASE_EXERCISES.concat(DRILLS_LIBRARY);
const REHAB_TEMPLATES = BASE_REHAB_TEMPLATES.concat(REHAB_TEMPLATES_EXTRA);
const FOOD_LIBRARY = BASE_FOOD_LIBRARY.concat(FOOD_LIBRARY_EXTRA);
const FOOD_SERVINGS = Object.assign({}, BASE_FOOD_SERVINGS, FOOD_SERVINGS_EXTRA);
const NUTRITION_PROGRAMS = BASE_NUTRITION_PROGRAMS.concat(NUTRITION_PROGRAMS_EXTRA);
const MODALITIES = BASE_MODALITIES.concat(MODALITIES_EXTRA);
const MODALITY_PROTOCOLS = BASE_MODALITY_PROTOCOLS.concat(MODALITY_PROTOCOLS_EXTRA);
const SUPPLEMENT_LIBRARY = BASE_SUPPLEMENT_LIBRARY.concat(SUPPLEMENT_LIBRARY_EXTRA);
const SPORT_TEMPLATES = BASE_SPORT_TEMPLATES.concat(SPORT_TEMPLATES_EXTRA);
// الإضافات بتتحط في الآخر عشان أرقام seed_0..seed_30 القديمة ما تتغيّرش
const MED_LIBRARY_SEED = BASE_MED_LIBRARY_SEED.concat(MED_LIBRARY_SEED_EXTRA);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const LIBRARY_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
const IMAGE_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
const MAX_SOURCE_BYTES = 12 * 1024 * 1024;   // أقصى حجم للصورة الأصلية قبل الضغط
const MAX_STORED_BYTES = 700 * 1024;         // أقصى حجم بعد الضغط (حد Firestore مليون بايت)
const IMAGE_MAX_SIDE = 520;                  // أطول ضلع للصورة بعد التصغير
// صور التمارين بتتخزن جوه مستند البرنامج نفسه مع باقي التمارين، فبنصغّرها
// أكتر من باقي الصور عشان برنامج كامل بصور مايعديش حد المستند (1 ميجا)
const EXERCISE_IMAGE_MAX_SIDE = 360;

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
    quick_add_coach_btn: '+ إضافة مدرب جديد',
    pv_specialty_coach_hint: 'اختيار "كوتش" بيدّي صلاحيات مدرب كاملة (يشوف ويدير كل العملاء)، وأي تخصص تاني بيشوف بس العملاء اللي متضافين لفريقه',
    admin_team_badge: 'فريق إداري',
    grant_admin_team_label: 'صلاحية إدارية كاملة (زي صاحب المنصة بالظبط)',
    loading: 'جاري التحميل...',
    no_clients: 'مفيش عملاء لسه، ضيف عميل تحت',
    clients_search_ph: 'ابحث باسم العميل أو إيميله',
    coach_muscle_label: 'العضلة المستهدفة النهاردة',
    coach_muscle_hint: 'لما تفتح المكتبة هتلاقيها مفلترة على العضلة دي على طول',
    save_day_as_template: 'احفظ اليوم ده كقالب',
    delete_my_template: 'امسح القالب',
    my_template_name_ph: 'اسم القالب (مثلاً: يوم دفع — لاعبين كورة)',
    my_template_hint: 'القالب بيتحفظ باسمك وبيظهر لك في أي عميل — والمتخصصين التانيين يقدروا يستعملوه كمان',
    my_template_save: 'حفظ',
    my_template_cancel: 'إلغاء',
    my_templates_group: 'قوالبي',
    ready_templates_group: 'قوالب جاهزة',
    other_coaches_templates_group: 'قوالب متخصصين تانيين',
    template_day_empty: 'اليوم ده فاضي — ضيف تمارين الأول وبعدين احفظه كقالب',
    template_needs_name: 'اكتب اسم للقالب',
    template_saved: 'اتحفظ القالب "{name}" ({count} تمرين) — هتلاقيه في قوالبي',
    template_deleted: 'اتمسح القالب "{name}"',
    client_injury_flag: 'بلاغ إصابة محتاج مراجعة',
    client_injury_flag_many: '{n} بلاغات إصابة محتاجة مراجعة',
    no_client_search_results: 'مفيش عميل بالاسم أو الإيميل ده',
    need_name_email: 'اكتب الاسم والإيميل',
    adding: 'جاري الإضافة...',
    no_activity: 'مفيش نشاط النهاردة',
    done_count: 'خلّص {n} تمارين النهاردة',

    back_clients: '‹ رجوع لقائمة العملاء',
    back_program: '‹ رجوع للبرنامج',
    program_of: 'برنامج {name}',
    day_title: 'اسم اليوم (صدر وترايسبس)',
    rest_day: 'يوم راحة',
    open_library: 'اختر من مكتبة التمارين',
    open_mylib: 'مكتبتي الخاصة',
    or_manual: 'أو اكتب التمرين بنفسك',
    ex_name: 'اسم التمرين',
    ex_sets: 'مجموعات',
    ex_reps: 'تكرار',
    add_ex: '+ إضافة تمرين',
    save_program: 'حفظ البرنامج',
    fill_ex: 'كمّل بيانات التمرين',
    saving: 'جاري الحفظ...',
    saved: 'اتحفظ البرنامج',
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
    mylib_saved: 'اتحفظ في مكتبتك',
    confirm_delete: 'تمسح التمرين ده من مكتبتك؟',
    choose_image: 'اختر صورة (اختياري)',
    image_chosen: 'تغيير الصورة',
    image_too_big: 'الصورة كبيرة، اختار واحدة أصغر من 3 ميجا',
    preparing_image: 'جاري تجهيز الصورة...',
    image_failed: 'مش قادر أقرا الصورة دي، جرب صورة تانية',
    image_uploaded: 'اتضافت الصورة',
    add_photo_short: 'أضف صورة',
    change_photo: 'غيّر الصورة',
    add_template_photo: '+ صورة للبرنامج',
    pick_template_first: 'اختار برنامج من القائمة الأول',
    start_position: 'وضع البداية',
    end_position: 'وضع النهاية',
    exercise_image: 'صورة التمرين',
    no_image: 'مفيش صورة للتمرين ده',
    tab_training: 'تمرين',
    tab_rehab: 'تأهيل',
    tab_injuries: 'إصابات',
    tab_consult: 'استشارة',
    consult_hint: 'دوّن هنا ملاحظاتك وتوصياتك لهذا العميل — هتفضل محفوظة وتقدر تعدّلها في أي وقت.',
    consult_notes_label: 'ملاحظات وتوصيات',
    consult_notes_ph: 'اكتب ملاحظاتك أو توصياتك للعميل هنا...',
    consult_save_btn: 'حفظ الملاحظات',
    consult_saved_msg: 'اتحفظت الملاحظات',
    consult_requests_title: 'طلبات استشارة من العميل',
    consult_no_requests: 'مفيش طلبات استشارة من العميل ده',
    consult_status_pending: 'في انتظار الرد',
    consult_status_answered: 'تم الرد',
    consult_asked_on: 'اتبعت في',
    consult_note_updated: 'آخر تحديث',
    client_consult_ask_title: 'اطلب استشارة',
    client_consult_ask_hint: 'اختار المتخصص واكتب سؤالك أو شكوتك — هيوصله ويرد عليك هنا',
    client_consult_pick_provider: '— اختر المتخصص —',
    client_consult_text_ph: 'اكتب سؤالك أو شكوتك بالتفصيل...',
    client_consult_send_btn: 'إرسال الطلب',
    client_consult_need_fields: 'اختار المتخصص واكتب سؤالك الأول',
    client_consult_sent_msg: 'اتبعت طلبك — هيوصله وهيرد عليك',
    client_consult_replies_title: 'ردود فريقك',
    client_consult_no_replies: 'مفيش ردود لسه — أول ما متخصص يكتبلك هتلاقيه هنا',
    client_consult_requests_title: 'طلباتك السابقة',
    client_consult_no_requests: 'لسه ما طلبتش أي استشارة',
    add_to: 'إضافة إلى',
    save_rehab: 'حفظ برنامج التأهيل',
    saved_rehab: 'اتحفظ برنامج التأهيل',
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
    template_note: 'القوالب مسودة مبدئية مبنية على مبادئ التأهيل العامة — راجعها وعدّلها حسب حالة العميل قبل ما تسندها.',
    pick_template: '— اختر قالب —',
    confirm_template: 'ده هيستبدل برنامج التأهيل الحالي بالكامل. تكمل؟',
    template_loaded: 'اتحمّل القالب — راجعه وعدّله قبل الحفظ',
    all_categories: 'كل الأنواع',
    cat_strength: 'قوة',
    cat_crossfit: 'كروس فيت',
    cat_hyrox: 'هايروكس',
    cat_agility: 'دريلات ملاعب',
    cat_conditioning: 'كارديو وتكييف',
    welcome_mail_title: 'الرسالة الترحيبية التلقائية',
    welcome_mail_hint: 'أي حد يسيب إيميله في صفحة التعريف بيوصله شرح كامل عن البرنامج فورًا. الرابط ده بتجيبه من Google Apps Script (خطوة واحدة مكتوبة في ملف الشرح).',
    welcome_url_ph: 'رابط Apps Script (بيبدأ بـ https://script.google.com/macros/s/...)',
    welcome_secret_ph: 'كلمة السر اللي كتبتها في السكريبت',
    welcome_on_label: 'فعّل الإرسال التلقائي',
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
    per_set_add: '+ حدد كل مجموعة لوحدها',
    per_set_edit: 'عدّل تفاصيل كل مجموعة',
    per_set_hide: 'اخفِ تفاصيل المجموعات',
    per_set_clear: 'امسح تفاصيل المجموعات',
    per_set_weight: 'الوزن (كجم)',
    anatomy_add: '+ تفاصيل تشريحية (اختياري)',
    anatomy_edit: 'عدّل التفاصيل التشريحية',
    anatomy_hide: 'اخفِ التفاصيل التشريحية',
    ex_photo_add: '+ إضافة صورة للتمرين',
    ex_photo_change: 'تغيير صورة التمرين',
    ex_photo_remove: 'حذف الصورة',
    doc_too_big: 'البرنامج بقى كبير جدًا بسبب الصور — امسح صورة أو اتنين من التمارين وجرّب تحفظ تاني',
    doc_size_warning: 'حجم البرنامج قرّب على الحد الأقصى بسبب الصور — خلي بالك',
    anatomy_section_title: 'تفاصيل تشريحية (اختياري)',
    anatomy_howto: 'طريقة الأداء',
    anatomy_goal: 'الهدف من التمرين',
    anatomy_primary: 'العضلات الأساسية',
    anatomy_secondary: 'العضلات المساعدة',
    anatomy_origin: 'منشأ العضلة',
    anatomy_insertion: 'اندغام العضلة',
    anatomy_injury_benefit: 'مدى إفادته للإصابة',
    back_generic: 'رجوع',
    open_calc_btn: 'الحاسبات',
    calculators_title: 'الحاسبات',
    calc_tab_bmi: 'BMI',
    calc_tab_bmr: 'BMR / TDEE',
    calc_tab_1rm: 'الرفعة القصوى',
    calc_tab_macro: 'الماكروز',
    calc_tab_hr: 'نبض القلب',
    calc_tab_water: 'الماء',
    calc_tab_unit: 'تحويل وحدات',
    calc_weight_kg: 'الوزن (كجم)',
    calc_height_cm: 'الطول (سم)',
    calc_btn: 'احسب',
    gender_male: 'ذكر',
    gender_female: 'أنثى',
    calc_age: 'العمر',
    calc_lift_weight: 'الوزن المرفوع',
    calc_reps_done: 'عدد العدات',
    calc_tdee_manual: 'السعرات اليومية (TDEE)',
    calc_macro_hint: 'سيب خانة السعرات فاضية وهياخدها تلقائي لو حسبت BMR/TDEE فوق',
    calc_resting_hr: 'نبض الراحة (اختياري)',
    calc_exercise_minutes: 'دقايق التمرين (اختياري)',
    calc_unit_weight: 'الوزن',
    calc_unit_height: 'الطول',
    calc_unit_distance: 'المسافة',
    calc_kg: 'كجم',
    calc_lb: 'رطل (lb)',
    calc_cm: 'سم',
    calc_ft: 'قدم',
    calc_in: 'بوصة',
    calc_km: 'كم',
    calc_mi: 'ميل',
    calc_need_numbers: 'دخل أرقام صحيحة',
    act_level_sedentary: 'قليل الحركة (شغل مكتبي)',
    act_level_light: 'نشاط خفيف (1-3 أيام/أسبوع)',
    act_level_moderate: 'نشاط متوسط (3-5 أيام/أسبوع)',
    act_level_active: 'نشاط عالي (6-7 أيام/أسبوع)',
    act_level_very_active: 'نشاط عالي جدًا (شغل بدني + تمرين)',
    goal_maintenance: 'ثبات الوزن',
    goal_cutting: 'تنشيف',
    goal_aggressive_cut: 'تنشيف سريع',
    goal_bulking: 'تضخيم',
    goal_aggressive_bulk: 'تضخيم سريع',
    bmi_cat_under: 'نقص في الوزن',
    bmi_cat_normal: 'وزن طبيعي',
    bmi_cat_over: 'زيادة في الوزن',
    bmi_cat_obese: 'سمنة',
    calc_bmi_label: 'مؤشر كتلة الجسم',
    calc_bmr_label: 'معدل الأيض الأساسي (BMR)',
    calc_tdee_label: 'احتياجك اليومي من السعرات (TDEE)',
    calc_rm_label: 'أقصى وزن لعدة واحدة (1RM) تقديريًا',
    calc_rm_table_title: 'جدول النسب والعدات',
    calc_macro_cal_label: 'السعرات المستهدفة',
    calc_macro_protein_label: 'بروتين',
    calc_macro_carbs_label: 'كاربوهيدرات',
    calc_macro_fat_label: 'دهون',
    calc_hr_maxhr_label: 'أقصى معدل نبض تقديريًا',
    calc_hr_zone1: 'المنطقة 1 — تعافي خفيف',
    calc_hr_zone2: 'المنطقة 2 — حرق دهون / إحماء',
    calc_hr_zone3: 'المنطقة 3 — تحمل هوائي',
    calc_hr_zone4: 'المنطقة 4 — عتبة اللاكتات',
    calc_hr_zone5: 'المنطقة 5 — أقصى مجهود',
    calc_water_label: 'احتياجك اليومي من الماء',
    kcal_day: 'سعرة/يوم',
    calc_g: 'جم',
    calc_bpm: 'نبضة/دقيقة',
    calc_liters: 'لتر',
    open_progress_btn: 'المتابعة',
    progress_title: 'المتابعة والتقدم',
    progress_for_client: 'بيانات: {name}',
    pgtab_inbody: 'InBody',
    pgtab_checkins: 'تقارير المتابعة',
    pgtab_appt: 'المواعيد',
    ib_add_title: 'تسجيل قياس جديد',
    ib_bodyfat: 'نسبة الدهون %',
    ib_muscle: 'الكتلة العضلية (كجم)',
    ib_visceral: 'الدهون الحشوية (مستوى)',
    ib_water: 'نسبة الماء بالجسم %',
    ib_notes: 'ملاحظات (اختياري)',
    ib_save_btn: '+ حفظ القياس',
    ib_saved_msg: 'تم حفظ القياس',
    ib_history_title: 'سجل القياسات',
    ib_empty: 'لسه مفيش قياسات مسجّلة',
    ib_summary_title: 'ملخص التقدم',
    ib_summary_period: 'من {from} لحد {to} ({days} يوم)',
    ib_weight_label: 'الوزن',
    ib_bodyfat_label: 'نسبة الدهون',
    ib_muscle_label: 'الكتلة العضلية',
    ib_visceral_label: 'الدهون الحشوية',
    ib_water_label: 'نسبة الماء بالجسم',
    checkin_add_title: 'إضافة تقرير متابعة',
    checkin_note_ph: 'اكتب أي ملاحظة (اختياري)',
    checkin_save_btn: '+ إرسال التقرير',
    checkin_saved_msg: 'تم إرسال التقرير',
    checkin_history_title: 'سجل التقارير',
    checkin_empty: 'لسه مفيش تقارير متابعة',
    period_daily: 'يومي',
    period_weekly: 'أسبوعي',
    period_monthly: 'شهري',
    scale_level_1: 'ضعيف جدًا',
    scale_level_2: 'ضعيف',
    scale_level_3: 'متوسط',
    scale_level_4: 'جيد',
    scale_level_5: 'ممتاز',
    soreness_level_1: 'مفيش وجع',
    soreness_level_2: 'وجع بسيط',
    soreness_level_3: 'وجع متوسط',
    soreness_level_4: 'وجع شديد',
    soreness_level_5: 'وجع شديد جدًا',
    adherence_full: 'التزام كامل بالبرنامج',
    adherence_partial: 'التزام جزئي',
    adherence_none: 'مش ملتزم',
    energy_label: 'مستوى الطاقة',
    sleep_label: 'جودة النوم',
    soreness_label: 'الشد العضلي / الوجع',
    adherence_label: 'الالتزام بالبرنامج',
    appt_title: 'موعد القياس / الـ InBody الجاي',
    appt_note_ph: 'ملاحظة عن الموعد (اختياري)',
    appt_save_btn: 'حفظ الموعد',
    appt_clear_btn: 'إلغاء الموعد',
    appt_saved_msg: 'تم حفظ الموعد',
    appt_cleared_msg: 'تم إلغاء الموعد',
    appt_need_date: 'حدد تاريخ الموعد',
    no_appt_set: 'مفيش موعد متحدد دلوقتي',
    next_appt_label: 'الموعد الجاي',
    welcome_samples_title_training: 'لمحة من مكتبة التمارين',
    welcome_samples_title_rehab: 'لمحة من تمارين التأهيل',
    welcome_samples_title_nutrition: 'لمحة من مكتبة الأكل',
    welcome_samples_title_medical: 'تخصصات الاستشارة الطبية',
    welcome_program_title_training: 'شكل برنامجك هيبقى إزاي',
    welcome_program_title_rehab: 'شكل برنامج التأهيل هيبقى إزاي',
    welcome_program_title_nutrition: 'شكل يوم أكلك هيبقى إزاي',
    welcome_program_title_medical: 'إزاي الاستشارة الطبية بتشتغل',
    kcal_100g: 'سعرة/100ج',
    welcome_medical_case_detail: 'استشارة متخصصة عن طريق الشات',
    welcome_medical_step_1: 'تبلّغ عن الإصابة أو تسأل سؤالك من داخل التطبيق',
    welcome_medical_step_2: 'متخصص حقيقي في المجال يراجع حالتك',
    welcome_medical_step_3: 'بتاخد رد وخطة متابعة واضحة',
    welcome_medical_step_4: 'تكمّل متابعتك مع فريقك من داخل التطبيق',
    cc_idle: 'مفيش نشاط',
    no_specialty: 'من غير تخصص',
    ai_on_label: 'فعّل المساعد الذكي في الشات',
    ai_on_hint: 'بيستعمل نفس الرابط اللي فوق. قبل ما تفعّله لازم تحط GEMINI_KEY و FIREBASE_API_KEY في Script properties جوه Apps Script — الشرح في ملف الإعداد.',
    settings_migrated: 'الإعدادات اتنقلت للمكان الجديد — المساعد الذكي والترحيب شغالين تاني',
    settings_missing_url: 'الرابط فاضي — المساعد الذكي والرسالة الترحيبية مش هيشتغلوا من غيره',
    cb_schedule: 'جدوله',
    cp_full_edit: 'عدّل كل إجاباتك ›',
    cp_full_edit_hint: 'رياضاتك وأهدافك وجدولك وحالتك الصحية وكل اللي اتسألت عنه في الأول',
    // ---- تأكيد الإيميل ----
    // ---- المكتبة الموسّعة ----
    cat_functional: 'وظيفي',
    cat_mobility: 'مرونة وحركة',
    cat_warmup: 'إحماء وتنشيط',
    cat_core: 'بطن وثبات',
    cat_speed: 'سرعة ورشاقة',
    cat_tactical: 'عسكري وتكتيكي',
    cat_athletic: 'أداء رياضي',
    cat_testing: 'اختبارات',
    cat_rehab: 'تأهيل',
    lib_all_levels: 'كل المستويات',
    level_1: 'مبتدئ',
    level_2: 'متوسط',
    level_3: 'متقدم',
    lib_media_only: 'بصورة بس',
    lib_safe_only: 'مناسب للعميل',
    lib_credits_link: 'حقوق الصور',
    quick_add: 'إضافة سريعة',
    exs_close: 'إغلاق',
    exs_loading: 'بنحمّل التفاصيل...',
    exs_animated: 'البداية والنهاية',
    exs_add: 'أضف للبرنامج',
    exs_prescribe: 'الوصفة',
    exs_howto: 'طريقة الأداء',
    exs_cues: 'نصايح الأداء',
    exs_mistakes: 'أخطاء شائعة',
    exs_alternatives: 'بدائل',
    exs_primary: 'العضلات الأساسية',
    exs_secondary: 'مساعدة',
    exs_caution_client: 'انتبه — العميل عنده: {list}. راجع الاحتياطات قبل ما تضيفه.',
    exs_caution_general: 'احتياطات مع: {list}',
    exs_media_credit: 'مصدر الرسمة وترخيصها',
    exs_add_to: 'هيتضاف في: {target}',
    exs_cues_for_client: 'نصايح للعميل (سطر لكل نصيحة)',
    ex_duration: 'المدة',
    ex_distance: 'المسافة',
    ex_zone: 'الشدة / المنطقة',
    ex_intensity: 'الشدة',
    type_weight_reps: 'وزن وعدات',
    type_reps: 'عدات',
    type_time: 'وقت',
    type_distance: 'مسافة',
    type_distance_time: 'مسافة ووقت',
    credits_title: 'حقوق الصور والرسوم',
    credits_intro: 'رسوم التمارين دي من مصادر مفتوحة ترخيصها بيسمح بالاستخدام التجاري. شرطها إننا نذكر أصحابها ونوضّح اللي غيّرناه — ودي الصفحة دي.',
    credits_by: 'الرسم',
    credits_license: 'الترخيص',
    credits_source: 'المصدر',
    credits_changes: 'اللي غيّرناه',
    credits_count: '{n} رسمة',
    credits_show_list: 'اعرض القايمة كاملة',
    verify_title: 'أكّد إيميلك',
    verify_text: 'بعتنا رسالة على {email}. افتحها ودوس على اللينك اللي جواها، وبعدين ارجع هنا.',
    verify_why: 'ده عشان نتأكد إن الإيميل بتاعك فعلًا — رسايل فريقك وإشعاراتك هتوصل عليه.',
    verify_spam: 'مش لاقي الرسالة؟ بص في الـ Spam أو الرسايل غير المرغوب فيها.',
    verify_done_btn: 'أكّدت خلاص',
    verify_resend_btn: 'ابعت الرسالة تاني',
    verify_resend_wait: 'تقدر تبعت تاني بعد {n} ثانية',
    verify_sent: 'الرسالة اتبعتت',
    verify_not_yet: 'لسه التأكيد ما وصلناش — دوس على اللينك اللي في الرسالة الأول',
    verify_too_many: 'اتبعت رسايل كتير ورا بعض — استنى شوية وجرّب تاني',
    verify_checking: 'بنتأكد...',
    verify_wrong_btn: 'الإيميل ده غلط — عايز أسجّل بإيميل تاني',
    // ---- الإشعارات ----
    notif_title: 'الإشعارات',
    notif_empty: 'مفيش إشعارات لسه — أول ما فريقك يبعتلك أو يعدّل برنامجك هتلاقيها هنا',
    notif_mark_all: 'علّم الكل مقروء',
    notif_push_title: 'إشعارات على الموبايل',
    notif_push_hint: 'عشان توصلك حتى والبرنامج مقفول.',
    notif_push_btn: 'فعّل الإشعارات',
    notif_push_on: 'الإشعارات شغالة على الجهاز ده',
    notif_push_denied: 'الإشعارات مقفولة من المتصفح. افتحها من إعدادات الموقع (علامة القفل جنب العنوان) وارجع دوس تاني.',
    notif_push_ios: 'على الآيفون: دوس زرار المشاركة تحت، واختار "إضافة إلى الشاشة الرئيسية"، وافتح ADAM من الأيقونة الجديدة — وفعّل الإشعارات من هناك.',
    notif_push_unsupported: 'المتصفح ده مش بيدعم الإشعارات — جرّب Chrome',
    notif_push_failed: 'ما قدرناش نفعّل الإشعارات: {reason}',
    notif_now: 'دلوقتي',
    notif_min: 'من {n} دقيقة',
    notif_hour: 'من {n} ساعة',
    notif_day: 'من {n} يوم',
    notif_t_chat_client: 'رسالة جديدة من فريقك',
    notif_b_chat_client: '{text}',
    notif_t_chat_team: 'رسالة من {name}',
    notif_b_chat_team: '{text}',
    notif_t_workout: 'برنامج تمرينك اتحدّث',
    notif_b_workout: 'فريقك عدّل برنامج التمرين — افتحه وشوف الجديد.',
    notif_t_nutrition: 'نظامك الغذائي اتحدّث',
    notif_b_nutrition: 'فريقك عدّل نظام الأكل بتاعك — افتحه وشوف الجديد.',
    notif_t_rehab: 'برنامج التأهيل اتحدّث',
    notif_b_rehab: 'فريقك عدّل برنامج التأهيل — افتحه وشوف الجديد.',
    notif_t_consult_request: 'طلب استشارة من {name}',
    notif_b_consult_request: '{text}',
    notif_t_consult_reply: 'اترد على استشارتك',
    notif_b_consult_reply: '{name} رد عليك — افتح الاستشارات وشوف الرد.',
    notif_t_clearance_client: 'رأي الطبيب وصل',
    notif_b_clearance_client: '{status}',
    notif_t_clearance_team: 'الطبيب رد على طلب الإذن',
    notif_b_clearance_team: '{name}: {status}',
    notif_t_injury_new: 'بلاغ إصابة من {name}',
    notif_b_injury_new: '{parts}',
    notif_t_injury_status: 'بلاغ الإصابة اتحدّث',
    notif_b_injury_status: 'الحالة دلوقتي: {status}',
    notif_t_booking_new: 'طلب حجز من {name}',
    notif_b_booking_new: 'يوم {date}',
    notif_t_booking_status: 'حجزك اتحدّث',
    notif_b_booking_status: 'حجز يوم {date}: {status}',
    notif_t_team_joined: 'عميل جديد في فريقك',
    notif_b_team_joined: '{name} اختارك في فريقه.',
    push_on_label: 'فعّل إشعارات الموبايل',
    push_vapid_ph: 'مفتاح Web Push (من Firebase ← Cloud Messaging)',
    push_settings_hint: 'المفتاح ده عام ومش سر — بتجيبه من إعدادات مشروع Firebase. الإرسال نفسه بيعدّي على نفس رابط Apps Script اللي فوق.',
    ob_sched_label: 'جدول أسبوعك',
    ob_sched_hint: 'حدّد الرياضة ومعادها لكل يوم بتتمرن فيه، ولو بتتمرن أكتر من مرة في اليوم (جيم الصبح وسباحة بالليل مثلًا) دوس «+ حصة تانية». سيب اليوم فاضي لو مش بتتمرن فيه — ده بيخلي مدربك يعرف يظبط برنامجك حوالين مواعيدك.',
    modality_title: 'أجهزة العلاج الطبيعي',
    modality_hint: 'مرجع للإعدادات وموانع الاستعمال. اختار جهاز تشوف بروتوكولاته، وتقدر تضيف الجلسة لخطة العميل.',
    modality_contra: 'موانع الاستعمال — اقراها قبل أي جلسة',
    modality_indications: 'بيتستعمل في',
    modality_protocols: 'البروتوكولات',
    modality_add: '+ ضيفه لخطة العميل',
    modality_added: 'اتضاف للخطة — احفظ التأهيل عشان يتسجّل',
    modality_already: 'البروتوكول ده موجود في الخطة بالفعل',
    modality_plan_title: 'جلسات الأجهزة في خطة العميل',
    show_more_n: 'اعرض {n} كمان',
    sched_rest: '— مفيش —',
    goals_extra: 'وكمان:',
    sched_none: 'مفيش جدول',
    sched_gym: 'جيم',
    sched_add: '+ حصة تانية في نفس اليوم',
    sched_session_n: 'حصة {n}',
    session_n: 'الحصة {n}',
    session_add: '+ حصة',
    session_add_first: '+ قسّم اليوم لأكتر من حصة',
    session_split_btn: 'قسّم زي جدوله',
    session_client_plan: 'جدول العميل اليوم ده: {s}',
    session_sport_ph: 'نوع الحصة',
    session_time: 'معاد الحصة',
    session_title_ph: 'اسم الحصة (مثلًا: سباحة — تحمّل)',
    session_remove: 'امسح الحصة دي',
    session_remove_confirm: 'دوس تاني عشان تمسح الحصة بتمارينها',
    pick_session_btn: 'اتمرّن التمرين ده النهاردة',
    pick_session_confirm: 'متأكد؟ اللي عملته في تمرين {day} النهاردة هيتلغي',
    sess_badge_moved: 'تمرين {day} — بتعمله النهاردة',
    chat_ai_unavailable: 'المساعد الذكي مش متاح دلوقتي — رسالتك وصلت لمدربك وهيرد عليك',
    chat_ai_typing: 'المساعد الذكي بيكتب…',
    nut_lib_title: 'مكتبة برامج التغذية',
    nut_lib_hint: 'اختار برنامج قريب من حالة عميلك، طبّقه، وبعدين عدّل الكميات عليه. الأرقام اللي جنب كل برنامج محسوبة من الأكل اللي جواه فعلًا.',
    np_numbers: '{kcal} سعر · {protein}جم بروتين',
    np_applied: 'اتطبّق "{name}" على الأسبوع — عدّل الكميات وبعدين احفظ',
    pc_clients_n: '{n} عميل',
    no_search_results: 'مفيش نتيجة للبحث ده',
    adm_tab_report: 'تقرير اليوم',
    adm_tab_payment: 'بيانات الدفع',
    adm_tab_welcome: 'رسالة الترحيب',
    adm_tab_stats: 'إحصائية الرئيسية',
    adm_tab_plans: 'الأسعار',
    adm_tab_provider_plans: 'خطط المتخصصين',
    adm_tab_payments: 'طلبات الدفع',
    adm_tab_store: 'المتجر',
    adm_tab_orders: 'طلبات المتجر',
    adm_tab_stories: 'قصص النجاح',
    adm_tab_leads: 'رسايل التواصل',
    adm_tab_apps: 'طلبات الانضمام',
    adm_tab_access: 'إدارة الوصول',
    tile_clients: 'عملائي',
    nav_home: 'الرئيسية',
    nav_profile: 'بروفايلي',
    nav_chat: 'الشات',
    nav_progress: 'متابعتي',
    nav_team: 'فريقي',
    nav_injury: 'بلّغ إصابة',
    nav_medlib: 'المكتبة الطبية',
    nav_calc: 'الحاسبات',
    nav_sub: 'اشتراكي',
    home_hello: 'أهلًا بيك',
    home_hello_named: 'أهلًا {name}',
    home_today_training: 'تمرين النهاردة',
    home_today_food: 'أكل النهاردة',
    home_today_water: 'المية',
    home_today_rehab: 'التأهيل',
    home_open_rehab: 'افتح برنامجك',
    home_rest_day: 'راحة النهاردة',
    home_sets_of: '{done} من {total} مجموعة',
    home_minutes: 'حوالي {n} دقيقة',
    home_kcal_of: '{done} من {total} سعر',
    home_kcal_only: '{n} سعر',
    home_water_of: '{done} من {total} كوب',
    tab_store: 'المتجر',
    store_empty: 'لسه مفيش منتجات في المتجر',
    store_cart_title: 'عربيتك',
    store_checkout_btn: 'إتمام الطلب',
    store_submit_order_btn: 'تأكيد الطلب',
    store_address_ph: 'عنوان التوصيل أو ملاحظة (اختياري)',
    store_my_orders_title: 'طلباتي',
    store_admin_title: 'إدارة المتجر',
    store_orders_title: 'طلبات المتجر',
    product_name_ph: 'اسم المنتج (عربي)',
    product_name_en_ph: 'اسم المنتج (إنجليزي)',
    product_price_ph: 'السعر (جنيه)',
    product_desc_ph: 'وصف المنتج (عربي، اختياري)',
    product_desc_en_ph: 'وصف المنتج (إنجليزي، اختياري)',
    admin_add_product_btn: 'إضافة منتج جديد',
    cat_clothing: 'ملابس رياضية',
    cat_equipment: 'أدوات رياضية',
    cat_supplements: 'مكملات غذائية',
    store_add_to_cart: 'أضف للعربية',
    store_no_orders: 'لسه معملتش أي طلب',
    store_no_orders_admin: 'لسه مفيش طلبات',
    store_order_status_submitted: 'قيد المراجعة',
    store_order_status_confirmed: 'اتأكد',
    store_order_status_delivered: 'اتسلم',
    store_order_status_cancelled: 'اتلغى',
    store_confirm_order_btn: 'تأكيد الطلب',
    store_deliver_order_btn: 'حدّده كـ"اتسلم"',
    store_cancel_order_btn: 'إلغاء الطلب',
    store_order_saved_msg: 'تم إرسال طلبك، وهيتراجع قريب',
    store_cart_empty: 'العربية فاضية',
    store_total_label: 'الإجمالي',
    need_cart_items: 'ضيف منتج واحد على الأقل للعربية',
    currency_egp: 'جنيه',
    product_saved: 'تم حفظ المنتج',
    need_product_fields: 'اكتب اسم المنتج والسعر على الأقل',
    log_actual_btn: 'سجّل اللي عملته فعلًا',
    hide_actual_btn: 'اخفِ',
    actual_label: 'اللي عملته',
    day_volume: 'المخطط',
    actual_volume_label: 'الفعلي',
    week_volume: 'إجمالي حمل الأسبوع',
    tap_to_edit: 'دوس على التمرين للتعديل',
    matching_images: 'بيدوّر على صور التمارين...',
    images_matched: 'لقيت صور لـ {n} تمرين من القالب',
    tab_nutrition: 'تغذية',
    daily_targets: 'الأهداف اليومية',
    t_kcal: 'سعرات',
    t_protein: 'بروتين',
    t_carbs: 'كارب',
    t_fat: 'دهون',
    add_to_meal: 'إضافة إلى وجبة',
    open_food_library: 'مكتبة الأغذية',
    save_nutrition: 'حفظ برنامج التغذية',
    saved_nutrition: 'اتحفظ برنامج التغذية',
    food_library: 'مكتبة الأغذية',
    search_food: 'ابحث عن صنف...',
    add_custom_food: 'إضافة صنف جديد',
    food_name: 'اسم الصنف',
    per_100: 'القيم لكل 100 جرام',
    save_food: '+ حفظ الصنف',
    food_saved: 'اتحفظ الصنف',
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
    all_supps: 'كل المكملات',
    hero2_badge: '30 يوم مجانًا — من غير بطاقة',
    team_strip_title: 'فريق كامل وراك',
    orbit_rating_line: '{avg} من {n} تقييم',
    faq_badge: 'سؤال شائع',
    deck_prev: 'السابق',
    deck_next: 'التالي',
    deck_tap_hint: 'دوس على الكارت تقرا الإجابة · اسحب تشوف التاني',
    deck_swipe_hint: 'اسحب يمين أو شمال',
    team_strip_hint: 'دوس على أي تخصص تشوف شغله',
    coach_does: 'بيكتب برنامجك ويعدّله كل أسبوع',
    medical_case_physio: 'ألم ومدى حركة',
    medical_case_ortho: 'كسور وأربطة وخشونة',
    medical_case_sports_medicine: 'إصابات الملعب والرجوع للّعب',
    medical_case_psychologist: 'ضغط المنافسة والثقة',
    rehab_does: 'بيرجّعك تلعب بعد الإصابة بأمان',
    nutrition_does: 'بيحسب أكلك على وزنك وهدفك',
    doctor_does: 'بيراجع حالتك ويطمّنك',
    psych_does: 'بيشتغل على تركيزك وثقتك',
    role_coach: 'مدرب',
    role_rehab: 'تأهيل',
    role_nutrition: 'تغذية',
    role_doctor: 'طبيب',
    role_psych: 'نفسي',
    hero2_title: 'برنامجك. من متخصص حقيقي.',
    hero2_sub: 'تمرين · تأهيل · تغذية · استشارة طبية',
    hero2_demo_btn: 'شوف برنامج نموذجي',
    hero2_trust_1: 'متخصصين حقيقيين',
    hero2_trust_2: 'بياناتك خاصة',
    hero2_trust_3: 'محتوى مراجَع علميًا',
    stat_exercises: 'تمرين بالصور',
    stat_templates: 'قالب جاهز',
    stat_supps: 'مكمل مشروح',
    stat_specialists: 'متخصص',
    how_it_works_note: '3 خطوات وخلاص',
    lead_reveal_btn: 'اكتب رسالتك',
    pa_reveal_btn: 'قدّم طلب انضمام',
    role_progress: 'متابعة',
    hero_slide5_title: 'جلسة نفسي رياضي',
    hero_slide5_sub: 'قبل المباراة بيومين',
    hero_slide5_rows: 'تمرين تنفّس — 5 دقايق|تصوّر ذهني للأداء|روتين ثابت قبل الماتش|نوم 8 ساعات',
    hero_slide5_foot: 'شغل على التركيز والثقة',
    hero_slide6_title: 'تقدمك الشهر ده',
    hero_slide6_sub: 'قياسات ووزن وأداء',
    hero_slide6_rows: 'الوزن — 82 78.4 كجم|الدهون — 22% 18%|بنش برس — 60 72.5 كجم|التزامك بالبرنامج 85%',
    hero_slide6_foot: 'كل رقم اتسجّل بإيدك واتراجع مع مدربك',
    hero_slide4_title: 'استشارة مع متخصص',
    hero_slide4_sub: 'د. — طبيب طب رياضي',
    hero_slide4_rows: 'بلّغت عن ألم في الركبة|اتراجعت حالتك في ساعتين|وصلك رد وخطة تعديل|تمرين السكوات اتوقف مؤقتًا',
    hero_slide4_foot: 'اترد عليك من غير ما تستنى ميعاد',
    hero_slide1_title: 'برنامج النهاردة',
    hero_slide1_sub: 'الجزء العلوي — دفع',
    hero_slide1_rows: 'إحماء عام — 8 د|بنش برس بار — 4×8|ضغط كتف — 3×10|تفتيح دمبل — 3×12|ترايسبس حبل — 3×15',
    hero_slide1_foot: '3 من 5 تمارين خلصت',
    hero_slide2_title: 'تأهيل الكتف',
    hero_slide2_sub: 'المرحلة 2 — استعادة المدى والقوة',
    hero_slide2_rows: 'بندول الذراع — 3×10|دوران خارجي بمطاط — 3×12|رفع أمامي خفيف — 3×12|شد لوح الكتف — 3×10',
    hero_slide2_foot: 'متابَع مع أخصائي تأهيل',
    hero_slide3_title: 'خطة اليوم الغذائية',
    hero_slide3_sub: '2,400 سعر — 165 جم بروتين',
    hero_slide3_rows: 'فطار — شوفان وبيض|سناك — زبادي يوناني|غدا — فراخ وأرز وسلطة|عشا — سمك وخضار',
    hero_slide3_foot: 'محسوبة على وزنك وهدفك',
    phone_required: 'اكتب رقم موبايلك — ده الرقم اللي هنتواصل بيه معاك',
    phone_too_short: 'الرقم ناقص — رقم {code} لازم يكون {count} أرقام. مثال: {example}',
    phone_too_long: 'الرقم زايد — رقم {code} لازم يكون {count} أرقام. مثال: {example}',
    phone_bad_start: 'الرقم ده مش شكله صح لـ {code} — راجع أول الرقم. مثال: {example}',
    bad_email: 'الإيميل ده مش مظبوط — راجعه',
    lead_phone_ph: 'رقم موبايلك',
    lead_email_ph: 'إيميلك (عشان نفتحلك حساب)',
    lead_interest_ph: 'محتاج إيه؟ (اختياري)',
    lead_interest_label: 'محتاج',
    lead_new: 'جديد',
    daily_report_title: 'تقرير آخر ٢٤ ساعة',
    daily_report_refresh: 'حدّث التقرير',
    daily_report_week: 'تقرير الأسبوع',
    daily_report_day: 'تقرير اليوم',
    report_new_clients: 'عملاء جداد',
    report_new_leads: 'رسايل تواصل',
    report_new_injuries: 'بلاغات إصابة',
    report_new_consults: 'طلبات استشارة',
    report_new_orders: 'طلبات متجر',
    report_total_clients: 'إجمالي العملاء',
    report_alert_injuries: '{n} بلاغ إصابة لسه محدش رد عليه',
    report_alert_leads: '{n} رسالة تواصل جديدة مستنية رد',
    report_alert_consults: '{n} طلب استشارة مستني رد',
    report_alert_payments: '{n} دفعة مستنية مراجعتك',
    report_alert_orders: '{n} طلب متجر جديد',
    report_all_clear: 'مفيش حاجة مستنية منك — كل حاجة تمام',
    report_generated_at: '{range} — آخر تحديث {time}',
    report_range_day: 'آخر ٢٤ ساعة',
    report_range_week: 'آخر ٧ أيام',
    lead_accept_btn: 'اقبله كعميل',
    lead_accepted_btn: 'اتقبل كعميل',
    lead_needs_email: 'محتاج إيميل عشان تقدر تفتحله حساب',
    lead_already_client: 'الشخص ده عميل عندك بالفعل',
    lead_accepted_msg: 'اتعملّه حساب — يسجّل بإيميل {email} ويلاقي نفسه عميل على طول',
    supp_library: 'مكتبة المكملات والفيتامينات',
    supp_search_ph: 'ابحث عن مكمل أو فيتامين...',
    supp_disclaimer: 'المكتبة دي مرجع تعليمي مش وصفة طبية. أي عميل عنده حالة مرضية أو بياخد دوا أو حامل — لازم يرجع لطبيب أو أخصائي تغذية إكلينيكي قبل أي مكمل.',
    supp_dose: 'الجرعة',
    supp_when: 'التوقيت',
    supp_use: 'بيستخدم ليه',
    supp_add_to_plan: '+ ضيفه لخطة العميل',
    supp_already_added: 'موجود في الخطة',
    supp_added: 'اتضاف "{name}" لخطة المكملات — متنساش تحفظ البرنامج',
    supp_note_ph: 'ملاحظة للعميل (اختياري)',
    supp_plan_title: 'المكملات والفيتامينات',
    supp_plan_empty: 'مفيش مكملات في الخطة — افتح المكتبة واختار اللي محتاجه',
    supp_client_note: 'دي المكملات اللي مدربك حددهالك. لو بتاخد أي دوا أو عندك حالة مرضية، اسأل دكتورك الأول.',
    open_supp_library: 'مكتبة المكملات',
    remove: 'شيل',
    food_count: '{n} صنف',
    tab_activity: 'نشاطي',
    client_sport: 'رياضة العميل',
    use_sport_template: 'قالب تحضير بدني',
    sport_template_note: 'القالب بيتحمّل على اليوم المفتوح ويضيف لتماريته — راجعه وعدّله حسب اللاعب ومرحلة موسمه.',
    pick_sport: '— اختر الرياضة —',
    pick_sport_template: '— اختر قالب —',
    sport_template_loaded: 'اتحمّل القالب على {day}',
    ring_move_label: 'إنجاز تمرين اليوم',
    ring_exercise_label: 'أيام نشطة (٧ أيام)',
    ring_stand_label: 'نشاط إضافي (٧ أيام)',
    log_activity: 'سجّل نشاطك',
    save_activity: '+ تسجيل النشاط',
    activity_history: 'سجل النشاط',
    act_notes: 'ملاحظات (اختياري)',
    activity_saved: 'اتسجّل النشاط',
    no_activity_yet: 'مفيش نشاط مسجّل لسه',
    need_activity: 'اختار رياضة وكمّل بيانة واحدة على الأقل',
    confirm_delete_activity: 'تمسح النشاط ده؟',
    recent_activity: 'آخر نشاط: {text}',
    tab_classes: 'الكلاس',
    open_classes: 'الكلاسات',
    classes_title: 'الكلاسات',
    back_classes: '‹ رجوع للكلاسات',
    add_class: 'إضافة كلاس',
    class_name: 'اسم الكلاس',
    class_time: 'الميعاد (مثلاً 6:00 م)',
    save_class: '+ حفظ الكلاس',
    class_saved: 'اتحفظ الكلاس',
    need_class_name: 'اكتب اسم الكلاس',
    no_classes: 'مفيش كلاسات لسه — ضيف كلاس تحت',
    open_providers: 'المتخصصين',
    open_my_profile_btn: 'بروفايلي',
    my_bookings_title: 'حجوزاتي',
    open_bookings_btn: 'حجوزاتي',
    book_session_btn: 'احجز جلسة',
    session_type_label: 'نوع الجلسة',
    booking_date_ph: 'التاريخ',
    booking_note_ph: 'ملاحظة (اختياري)',
    submit_booking_btn: 'إرسال طلب الحجز',
    booking_requested: 'اتبعت طلب الحجز',
    no_bookings: 'مفيش حجوزات لسه',
    need_booking_fields: 'اختار نوع الجلسة والتاريخ',
    providers_title: 'المتخصصين',
    add_provider: 'إضافة متخصص',
    provider_name: 'اسم المتخصص',
    provider_email: 'إيميله',
    save_provider: '+ حفظ المتخصص',
    provider_saved: 'اتحفظ المتخصص',
    need_provider_fields: 'اكتب الاسم والإيميل واختار التخصص',
    no_providers: 'مفيش متخصصين لسه — ضيف واحد تحت',
    pick_specialty: '— اختر التخصص —',
    provider_home_soon: 'شاشتك الخاصة قيد التجهيز — قريب هنضيف هنا كل حاجة تخص تخصصك.',
    show_signup: 'مستخدم جديد؟ اعمل حساب',
    signup_title: 'حساب جديد',
    signup_btn: 'إنشاء الحساب',
    confirm_password: 'أكّد الباسورد',
    back_to_login: 'عندك حساب؟ سجّل دخول',
    need_signup_fields: 'اكتب إيميل وباسورد',
    passwords_mismatch: 'الباسورد مش متطابق',
    weak_password: 'الباسورد لازم يبقى 6 حروف على الأقل',
    email_in_use: 'الإيميل ده متسجل بحساب قبل كده',
    creating_account: 'جاري إنشاء الحساب...',
    ob_lead: 'دقيقتين بس، وفريقك هيبني برنامجك عليها',
    ob_body_label: 'نوع جسمك',
    ob_body_hint: 'اختار الأقرب لشكلك — ده بيغيّر طريقة بناء برنامجك وسعراتك',
    body_ecto: 'نحيف',
    body_ecto_note: 'بتخس بسرعة وبتتعب في زيادة الوزن',
    body_meso: 'رياضي',
    body_meso_note: 'بتبني عضل وبتخس بسهولة نسبيًا',
    body_endo: 'ممتلئ',
    body_endo_note: 'بتزيد بسهولة وبتحتاج مجهود في التنشيف',
    ob_progress_note: 'خلّصت {done} من {total}',
    ob_progress_done: 'كل البيانات تمام — تقدر تكمّل',
    onboarding_title: 'بيانات بسيطة عنك',
    choose_photo: 'اختر صورتك (اختياري)',
    ob_name_ph: 'اسمك',
    ob_weight_ph: 'وزنك (كجم)',
    ob_height_ph: 'طولك (سم)',
    ob_weight_label: 'وزنك (كجم)',
    ob_height_label: 'طولك (سم)',
    ob_age_label: 'سنك',
    ob_dob_label: 'تاريخ ميلادك',
    dob_day: 'يوم',
    dob_month: 'شهر',
    dob_year: 'سنة',
    ob_gender_label: 'النوع',
    pick_gender: '— اختر النوع —',
    gender_male: 'ذكر',
    gender_female: 'أنثى',
    manual_number_hint: 'تقدر كمان تكتب الرقم يدويًا جوّه الصندوق',
    ob_activity_label: 'مستوى نشاطك',
    ob_sport_label: 'رياضتك أو هدفك الأساسي',
    next_btn: 'التالي',
    need_onboarding_fields: 'اكتب اسمك ونوعك وتاريخ ميلادك ووزنك وطولك واختار نشاطك وهدفك',
    pick_activity: '— اختر مستوى النشاط —',
    pick_sport_group: '— اختر نوع الرياضة —',
    pick_sport: '— اختر رياضتك —',
    act_sedentary: 'قليل الحركة (شغل مكتبي)',
    act_light: 'نشاط خفيف',
    act_moderate: 'نشاط متوسط',
    act_active: 'نشيط',
    act_very_active: 'نشيط جدًا / رياضي',
    team_title: 'اختار فريقك',
    team_hint: 'دوس على أي متخصص تحب تشتغل معاه — تقدر تغيّر اختيارك في أي وقت بعدين',
    team_save: 'حفظ والدخول',
    team_save_edit: 'حفظ التغييرات',
    team_skip: 'أكمل من غير ما أختار دلوقتي',
    no_providers_yet: 'لسه مفيش متخصصين متسجلين — تقدر تختار بعدين',
    no_reviews_yet: 'لسه مفيش تقييمات',
    view_team_btn: 'فريقك — قيّم المتخصصين',
    team_view_title: 'فريقك',
    team_view_hint: 'قيّم أي متخصص بتشتغل معاه',
    no_team_yet: 'لسه ما اخترتش فريق — اختار من صفحة الانضمام',
    rate_provider_label: 'تقييمك',
    need_rating: 'اختار عدد النجوم الأول',
    review_comment_ph: 'اكتب رأيك (اختياري)',
    save_review_btn: 'احفظ تقييمك',
    review_saved: 'تم حفظ تقييمك، شكرًا!',
    trainee_count_label: '{n} متدرب بيتابع معاه',
    written_reviews_title: 'آراء العملاء',
    no_written_reviews: 'لسه محدش كتب رأيه',
    chat_with_provider_btn: 'تواصل معاه',
    client_label: 'عميل',
    back_to_client: '‹ رجوع',
    reviews_received_title: 'تقييمات العملاء',
    no_reviews_received: 'لسه محدش قيّمك',
    provider_name_label: 'اسمك',
    provider_name_ph: 'اسمك الكامل',
    platform_owner_label: 'صاحب المنصة',
    your_specialties_label: 'تخصصاتك (تقدر تختار أكتر من واحد)',
    need_one_specialty: 'اختار تخصص واحد على الأقل',
    specialty_locked_hint: 'التخصص ده مقفول على حسابك ومايتشالش — تقدر تزوّد عليه أي تخصص تاني',
    need_one_approved_specialty: 'لازم تفضل بتخصص واحد معتمد على الأقل — مش هينفع تشيلهم كلهم',
    specialty_pending_note: 'مستني موافقة إدارة المنصة على: {list}',
    specialty_sent_for_review: 'اتحفظ — {list} اتبعت لإدارة المنصة للموافقة، وهيشتغل أول ما يتوافق عليه',
    pending_specialties_title: 'تخصصات مستنية موافقتك',
    approve_btn: 'وافق',
    reject_btn: 'ارفض',
    specialty_approved_msg: 'اتوافق على "{spec}" لـ {name} — القسم بتاعه اتفتحله',
    specialty_rejected_msg: 'اترفض "{spec}" لـ {name}',
    lib_access_title: 'المكتبات المتاحة له',
    lib_access_mine_label: 'المكتبات المتاحة ليك',
    lib_access_exercises: 'التمارين',
    lib_access_food: 'التغذية',
    lib_access_supplements: 'المكملات',
    lib_access_rehab: 'قوالب التأهيل',
    lib_access_medical: 'المكتبة الطبية',
    lib_opened_msg: 'اتفتحت مكتبة {lib} لـ {name}',
    lib_closed_msg: 'اتقفلت مكتبة {lib} على {name}',
    lib_locked_msg: 'المكتبة دي مقفولة على حسابك — كلّم إدارة المنصة',
    lib_locked_hint: 'مقفولة — كلّم إدارة المنصة',
    pending_specs_badge: 'طلبات تخصص مستنية',
    specialties_hint: 'خد كورس جديد؟ علّم عليه هنا وهيظهر في بروفايلك وللعملاء وهم بيختاروا فريقهم',
    open_client_profile_btn: 'بروفايلك ›',
    client_profile_title: 'بروفايلك',
    client_profile_hint: 'عدّل بياناتك في أي وقت — فريقك هيشوف آخر تحديث تلقائيًا',
    client_name_field_label: 'اسمك',
    save_profile_btn: 'احفظ التعديلات',
    need_client_profile_fields: 'اكتب اسمك ووزنك وطولك الأول',
    provider_bio_label: 'نبذة عنك',
    provider_bio_ph: 'اكتب نبذة قصيرة عن خبرتك وأسلوبك في الشغل...',
    provider_certs_label: 'شهاداتك وإنجازاتك',
    provider_certs_ph: 'مثال: بكالوريوس تربية رياضية، كورس تأهيل إصابات، بطل مصر سابقًا...',
    save_profile: 'حفظ البروفايل',
    profile_saved: 'اتحفظ البروفايل',
    ob_phone_ph: 'رقم موبايلك',
    ob_goal_label: 'هدفك الأساسي',
    pick_goal: '— اختر هدفك —',
    goal_lose_weight: 'خسارة وزن',
    goal_build_muscle: 'زيادة كتلة عضلية',
    goal_general_fitness: 'لياقة عامة وصحة',
    goal_performance: 'تحسين أداء رياضي',
    goal_rehab_recovery: 'تعافي من إصابة',
    ob_focus_label: 'عايز تشتغل على إيه؟ (اختر كل اللي يهمك)',
    focus_training: 'تمرين',
    focus_nutrition: 'تغذية',
    focus_rehab: 'تأهيل',
    focus_medical: 'استشارة طبية',
    ob_schedule_title: 'جدولك اليومي',
    ob_schedule_hint: 'علشان نظبط برنامجك على مواعيدك الحقيقية',
    ob_work_nature_label: 'طبيعة شغلك ايه؟',
    pick_work_nature: '— اختر طبيعة شغلك —',
    work_nature_desk: 'شغل مكتبي',
    work_nature_physical: 'شغل بدني/حركي',
    work_nature_shift: 'ورديات (يتغير صبح/ليل)',
    work_nature_student: 'طالب',
    work_nature_other: 'حاجة تانية',
    ob_training_days_label: 'تحب تتمرن كام يوم في الأسبوع؟',
    pick_training_days: '— اختر عدد الأيام —',
    training_days_count: '{n} أيام',
    training_days_one: 'يوم واحد',
    training_days_two: 'يومين',
    ob_sleep_label: 'مواعيد نومك',
    ob_sleep_hint: 'لو شغلك ورديات ومواعيدك بتتغير، حط المواعيد الغالبة عليك دلوقتي',
    ob_sleep_time_label: 'بتنام الساعة كام',
    ob_wake_time_label: 'بتصحى الساعة كام',
    ob_sleep_hours_label: 'بتنام كام ساعة في اليوم كله؟',
    ob_sleep_hours_hint: 'المجموع، مش نومة واحدة — لو بتنام بالليل وبتاخد قيلولة، اجمعهم',
    ob_sleep_blocks_label: 'بتنامهم على كام مرة؟',
    sleep_h_lt5: 'أقل من ٥ ساعات',
    sleep_h_5_6: 'من ٥ لـ ٦',
    sleep_h_6_7: 'من ٦ لـ ٧',
    sleep_h_7_8: 'من ٧ لـ ٨',
    sleep_h_8_9: 'من ٨ لـ ٩',
    sleep_h_gt9: 'أكتر من ٩',
    sleep_b_1: 'مرة واحدة بالليل',
    sleep_b_2: 'مرتين — بالليل وقيلولة',
    sleep_b_3plus: 'تلاتة أو أكتر على مدار اليوم',
    cb_sleep_amount: 'ساعات نومه',
    ob_sleep_quality_label: 'نومك شكله إيه؟',
    cb_days: 'بيتمرن',
    cb_meals: 'بياكل',
    cb_sleep: 'نومه',
    pick_sleep_quality: '— اختر شكل نومك —',
    ob_sleep_quality_hint: 'ده بيغيّر حجم البرنامج فعلًا — النوم المتقطع معناه استشفاء أقل',
    sleep_q_solid: 'نومي متواصل',
    sleep_q_broken: 'بصحى في النص',
    sleep_q_short: 'ساعات قليلة',
    sleep_q_shifts: 'ورديات — مواعيدي بتتغير',
    ob_meals_per_day_label: 'حابب تاكل كام وجبة في اليوم؟',
    pick_meals_per_day: '— اختر عدد الوجبات —',
    meals_per_day_count: '{n} وجبات',
    meals_per_day_one: 'وجبة واحدة',
    meals_per_day_two: 'وجبتين',
    ob_meal_times_label: 'مواعيد أكلك',
    ob_first_meal_label: 'أول وجبة',
    ob_last_meal_label: 'آخر وجبة',
    ob_pain_question: 'عندك أي ألم أو مشكلة صحية بتمنعك من التمرين دلوقتي؟',
    ob_pain_note_ph: 'احكيلنا باختصار...',
    report_injury_btn: 'عندك ألم أو إصابة؟ بلّغ عنها',
    injury_title: 'بلّغ عن إصابة أو ألم',
    injury_hint: 'دوس على مكان الألم في الرسمة (تقدر تختار أكتر من مكان)',
    body_front: 'من قدام',
    body_back: 'من ورا',
    injury_desc_label: 'اشرح اللي حاسس بيه',
    injury_desc_ph: 'إمتى بدأ الألم، بيزيد إمتى، وأي حاجة تانية تحب تقولها...',
    choose_scan: 'ارفع أشعة أو صورة (اختياري)',
    injury_submit: 'إرسال البلاغ',
    injury_history: 'بلاغاتك السابقة',
    injury_saved: 'اتبعت البلاغ — هيوصل لفريقك يراجعه',
    need_injury_parts: 'اختار مكان الألم على الرسمة على الأقل',
    no_injury_reports: 'لسه معملتش أي بلاغ',
    status_requested: 'بانتظار المراجعة',
    status_confirmed: 'تحت المتابعة',
    status_done: 'اتراجع',
    no_client_injuries: 'العميل ده لسه معملش أي بلاغ إصابة',
    view_scan_btn: 'عرض الصورة',
    status_update_saved: 'اتحدثت الحالة',
    reported_on: 'بتاريخ',
    open_medlib_btn: 'المكتبة الطبية',
    med_library_title: 'المكتبة الطبية',
    med_library_hint: 'معلومات موثوقة من فريقك الطبي — كل مقال بيتراجع قبل ما ينشر',
    red_flags_title: 'علامات خطر — لازم توقف وتروح لدكتور فورًا',
    all_categories: 'الكل',
    add_med_article: 'إضافة مقال جديد',
    med_title_ph: 'عنوان المقال',
    med_body_ph: 'اكتب المحتوى هنا...',
    choose_med_image: 'إضافة صورة (اختياري)',
    save_draft_btn: 'حفظ كمسودة',
    submit_review_btn: 'إرسال للمراجعة',
    med_articles_title: 'المقالات',
    no_med_articles: 'لسه مفيش مقالات في القسم ده',
    need_med_fields: 'اختار القسم واكتب العنوان والمحتوى',
    med_saved: 'اتحفظ',
    seed_medlib_btn: 'تحميل محتوى مبدئي للمكتبة الطبية',
    team_link: 'فريق الذكاء الاصطناعي',
    seeding_library: 'جاري التحميل...',
    seed_done: 'اتحمل {n} مقال جديد كمسودة — محتاجين مراجعة متخصص قبل ما يشوفهم العميل',
    seed_author_label: 'محتوى مبدئي — محتاج مراجعة متخصص',
    class_members: 'أعضاء الكلاس',
    add_member: '+ إضافة عضو',
    class_exercises_title: 'تمارين الكلاس',
    class_exercises_hint: 'أي حد يقدر يشوفها ويعملها حتى لو مش حاضر الكلاس',
    add_from_library_btn: '+ أضف من المكتبة',
    no_class_exercises: 'لسه مفيش تمارين متحددة للكلاس ده',
    added_class_ex: 'اتضاف: {name}',
    other_classes_title: 'كلاسات تانية — شوف تمارينها',
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
    rest_msg: 'خد راحتك النهاردة — الجسم بيبني وهو مرتاح',
    rest_title: 'يوم راحة',
    no_plan: 'مفيش برنامج لليوم ده',
    no_plan_title: 'اليوم ده لسه فاضي',
    no_rehab_title: 'مفيش برنامج تأهيل',
    ob_health_label: 'في حاجة في صحتك لازم فريقك يعرفها؟',
    ob_health_hint: 'اختار اللي ينطبق عليك. ده بيغيّر برنامجك فعلًا — ومحدش هيشوفه غير فريقك المتابع معاك.',
    ob_health_note_label: 'حاجة تانية تحب تقولها لفريقك؟',
    ob_health_note_ph: 'مثلًا: بعمل غسيل كلوي يومين في الأسبوع',
    ob_health_privacy: 'البيانات دي بتتحفظ عندك في حسابك، وبيشوفها فريقك المتابع معاك بس — مش بتتباع ولا بتروح لأي جهة تانية.',
    ob_preg_label: 'حامل',
    ob_preg_week_label: 'في الأسبوع كام؟',
    ob_postpartum_label: 'ولدت من فترة قريبة',
    preg_tri1: 'التلت الأول',
    preg_tri2: 'التلت التاني',
    preg_tri3: 'التلت التالت',
    preg_week_of: 'الأسبوع {n}',
    safety_open: 'اعرف علامات التوقّف ›',
    safety_sub: 'برنامجك متظبّط على حالتك',
    safety_sheet_title: 'حالتك وبرنامجك',
    safety_care: 'احتياطات وانت بتتمرن',
    safety_stop: 'وقّف فورًا واتصل بدكتورك لو حصل:',
    safety_disclaimer: 'الكلام ده إرشادات عامة للتمرين مع حالتك — مش تشخيص ولا علاج ولا بديل عن دكتورك. أي قرار في الدوا أو الجرعة أو التحاليل قرار الطبيب وحده.',
    clearance_needed: 'محتاج إذن من دكتور قبل ما البرنامج يبدأ',
    clearance_waiting: 'الطلب وصل للطبيب — مستني رده',
    clearance_ok: 'الطبيب وافق على البرنامج',
    clearance_needed_text: 'حالتك محتاجة دكتور يشوفها ويكتب إن التمرين مناسب ليك. فريقك هيتواصل معاك.',
    clearance_ok_text: 'الطبيب راجع حالتك ووافق على البرنامج.',
    coach_health_open: 'شوف الاحتياطات وعلامات التوقّف ›',
    request_clearance_btn: 'اطلب إذن من الطبيب',
    clearance_needed_coach: 'الحالة دي محتاجة طبيب يراجعها ويكتب إن التمرين مناسب. اكتب البرنامج عادي، بس ماتفعّلوش قبل ما الإذن يوصل.',
    clearance_waiting_coach: 'الطلب اتبعت للطبيب في فريق العميل — مستني رده.',
    clearance_ok_coach: 'الطبيب راجع الحالة ووافق. راجع ملاحظاته قبل ما تكتب.',
    clearance_doctor_note: 'ملاحظة الطبيب',
    clearance_sent: 'الطلب اتبعت للطبيب',
    clearance_request_text: 'طلب إذن طبي: {name} — الحالة: {list}. محتاج رأيك: التمرين مناسب؟ وفي حاجة ممنوعة؟',
    adh_health_flag: 'حالة خاصة',
    team_search_ph: 'دوّر باسم المتخصص...',
    team_no_match: 'مفيش متخصص بالاسم ده',
    team_picked_count: 'اخترت {n} من فريقك',
    recommended_short: 'مرشّح',
    provider_profile_title: 'بروفايل المتخصص',
    ps_clients: 'عميل',
    ps_reviews: 'تقييم',
    ps_rating: 'المتوسط',
    ps_certs: 'شهادات وخبرات',
    ps_pick: 'اختاره لهذا التخصص',
    ps_remove: 'شيله من فريقي',
    ob_source_label: 'عرفت ADAM منين؟',
    ob_source_other_ph: 'قولنا عرفتنا منين',
    src_instagram: 'إنستجرام',
    src_facebook: 'فيسبوك',
    src_tiktok: 'تيك توك',
    src_whatsapp: 'واتساب',
    src_youtube: 'يوتيوب',
    src_google: 'بحث جوجل',
    src_friend: 'صاحب قالي',
    src_gym: 'الجيم',
    src_other: 'حاجة تانية',
    heard_from_label: 'عرفنا منين',
    ob_ref_label: 'مين رشّحلك ADAM؟',
    ob_ref_hint: 'لو حد من المدربين أو المتخصصين دلّك علينا، اختاره — عشان ياخد حقه.',
    ob_ref_picked: 'ترشيح من: {name}',
    prov_clients: 'عميل',
    prov_referrals: 'ترشيح',
    prov_rating: 'تقييم',
    prov_open_profile: 'شوف البروفيل',
    open_clearance_btn: 'طلبات الإذن الطبي',
    clearance_screen_title: 'طلبات الإذن الطبي',
    clearance_screen_hint: 'أي طبيب في المنصة يقدر يرد — مش لازم يكون هو طبيب العميل. قرارك بيوصل للمدرب والعميل فورًا.',
    clearance_none: 'مفيش طلبات إذن',
    clearance_none_pending: 'مفيش طلبات مستنية رد',
    clr_filter_pending: 'مستنية رد',
    clr_filter_answered: 'اترد عليها',
    clr_filter_all: 'الكل',
    clr_state_pending: 'مستني رد',
    clr_state_cleared: 'موافق',
    clr_state_restricted: 'موافق بشروط',
    clr_state_denied: 'مرفوض حاليًا',
    clr_state_none: 'من غير قرار',
    clr_btn_cleared: 'موافق',
    clr_btn_restricted: 'موافق بشروط',
    clr_btn_denied: 'مرفوض حاليًا',
    clr_note_ph: 'اكتب شروطك أو سببك — ده اللي المدرب هيشتغل بيه',
    clr_need_note: 'اكتب الشروط أو السبب الأول',
    clr_saved: 'قرارك اتسجّل ووصل للمدرب',
    clr_client_note: 'ملاحظة العميل',
    clr_from: 'الطلب من',
    clr_by: 'قرار',
    clearance_restricted: 'الطبيب وافق بشروط',
    clearance_denied: 'الطبيب مش موافق على البرنامج دلوقتي',
    clearance_restricted_coach: 'الطبيب وافق بشروط — اشتغل في حدودها بالظبط.',
    clearance_denied_coach: 'الطبيب مش موافق دلوقتي. ماتفعّلش برنامج قبل ما يراجع تاني.',
    clearance_restricted_text: 'دكتورك وافق على التمرين بشروط — فريقك عارفها وهيمشي عليها.',
    clearance_denied_text: 'دكتورك شاف إن التمرين مش مناسب دلوقتي. فريقك هيتواصل معاك.',
    ob_cycle_label: 'أتابع دورتي الشهرية مع البرنامج',
    ob_cycle_last_label: 'أول يوم في آخر دورة',
    ob_cycle_len_label: 'طول دورتك بالأيام (المتوسط ٢٨)',
    cycle_day_of: 'اليوم {n}',
    cycle_log_btn: 'دورتي بدأت النهاردة',
    cycle_logged: 'اتسجّلت — البرنامج هيتقرا على أساسها',
    cycle_train_title: 'التمرين في الفترة دي',
    cycle_flags_title: 'دي علامات لازم تشوفي دكتور عشانها:',
    open_adherence_btn: 'لوحة الالتزام',
    adherence_title: 'لوحة الالتزام',
    adherence_hint: 'آخر ٧ أيام — مين ماشي معاك ومين محتاج تكلّمه',
    adh_total: 'عميل',
    adh_attention: 'محتاج انتباه',
    adh_ok: 'ماشي تمام',
    adh_filter_attention: 'محتاجين انتباه',
    adh_filter_all: 'الكل',
    adh_filter_active: 'ماشيين تمام',
    adh_none_attention: 'مفيش حد محتاج انتباه النهاردة',
    adh_none: 'مفيش عملاء في القايمة دي',
    adh_state_silent: 'ساكت',
    adh_state_slipping: 'فاتر',
    adh_state_active: 'نشط',
    adh_never: 'مسجّلش أي حاجة لسه',
    adh_today: 'سجّل النهاردة',
    adh_since: 'آخر نشاط من {n} يوم',
    adh_waiting: 'مستني رد منك',
    adh_waiting_many: 'مستني رد على {n} طلبات',
    adh_trained: 'تمرين',
    adh_logged: 'سجّل أكله',
    adh_water: 'مياه/يوم',
    adh_open: 'افتح برنامجه',
    water_title: 'المياه',
    water_count: '{a} من {b} أكواب',
    picker_title: 'ضيف صنف',
    picker_search_ph: 'دوّر على صنف...',
    picker_add: 'ضيفه',
    no_results: 'مفيش نتيجة — جرّب اسم تاني',
    add_food_btn: '+ ضيف صنف للوجبة دي',
    extra_badge: 'زيادة',
    mark_eaten: 'علّم إنك أكلته',
    by_grams: 'بالجرام',
    approx_note: 'تقريبي',
    meal_empty: 'مفيش حاجة في الوجبة دي',
    fuel_left: 'سعر فاضل',
    fuel_over: 'سعر زيادة',
    fuel_summary: 'أكلت {a} · الخطة {b} · الهدف {c}',
    week_streak_note: 'خلّصت {a} من {b} أيام الأسبوع ده',
    week_streak_empty: 'لسه مفيش أيام تمرين الأسبوع ده',
    start_session_btn: '▶ ابدأ التمرين',
    focus_close: 'اقفل',
    focus_prev: '‹ السابق',
    focus_next: 'التالي ›',
    focus_finish: 'خلّصت',
    focus_of: 'تمرين {a} من {b}',
    focus_sets_left: 'فاضل {n} مجموعة — دوس على الخرزة بعد كل مجموعة',
    focus_sets_done: 'خلّصت كل المجموعات',
    fab_toggle_title: 'أدوات',
    no_meals_title: 'اليوم ده من غير وجبات',
    no_nutrition_title: 'لسه مفيش تغذية',
    sess_badge_today: 'النهاردة',
    sess_stat_ex: 'تمرين',
    sess_stat_sets: 'مجموعة',
    sess_stat_min: 'دقيقة',
    fuel_of: 'من',
    fuel_g: 'جم',
    day_plan: 'برنامج يوم {day}',
    of_exercises: '{a} من {b} تمارين',
    well_done: 'أحسنت يا بطل',
    remaining: 'لسه باقي {n} تمارين',

    days: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
    days_short: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
    days_mini: ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'],

    welcome_hero_title: 'برنامجك الرياضي والتأهيلي والغذائي، في مكان واحد',
    welcome_hero_sub: 'ADAM بيجمّعلك التمرين والتأهيل والتغذية والاستشارة الطبية مع فريق متخصصين، وكله متابع خطوة بخطوة',
    welcome_feature_training_title: 'تمرين مخصص ليك',
    welcome_feature_training_desc: 'برنامج تدريب أسبوعي مقسّم بالتفصيل، وبتسجّل فيه أداءك الفعلي أول بأول',
    welcome_feature_rehab_title: 'تأهيل من الإصابات',
    welcome_feature_rehab_desc: 'برنامج تأهيل بمراحل واضحة، بيتابعه معاك متخصص تأهيل أو علاج طبيعي',
    welcome_feature_nutrition_title: 'خطة تغذية متكاملة',
    welcome_feature_nutrition_desc: 'وجباتك محسوبة على مدار أسبوعك، وبتقدر تتابعها يوم بيوم',
    welcome_feature_medical_title: 'استشارة طبية موثوقة',
    welcome_feature_medical_desc: 'مكتبة طبية معتمدة من متخصصين، وحجز جلسات مع دكاترة وأخصائيين',
    welcome_pillars_title: 'كل حاجة في مكان واحد',
    welcome_pillars_sub: 'دوس على أي جزء تشوف تفاصيله',
    welcome_pillars_note: 'الأجزاء دي كلها بتتفعّل مع اشتراكك، وبتتابعها مع مدربينا ومتخصصينا الفعليين — مش برنامج جاهز وخلاص',
    welcome_pillar_training_week_title: 'أسبوعك هيتقسم كده',
    welcome_pillar_training_line_1: 'يوم 1 — تمرين الجزء العلوي (دفع وسحب)',
    welcome_pillar_training_line_2: 'يوم 2 — تمرين الجزء السفلي (أرجل وكور)',
    welcome_pillar_training_line_3: 'يوم 3 — راحة نشطة أو كارديو خفيف',
    welcome_pillar_training_line_4: 'يوم 4 — تمرين كامل الجسم + قياس الأداء',
    welcome_pillar_training_stat: 'متوسط 4 أيام تدريب أسبوعيًا، وكل مجموعة وتكرار متسجل ومحسوب أول بأول',
    welcome_pillar_training_team: 'بيتابعك مدرب رياضي معتمد وبيعدّل برنامجك حسب أدائك الفعلي',
    welcome_pillar_rehab_week_title: 'خطة تأهيلك بتتقسم على مراحل واضحة',
    welcome_pillar_rehab_line_1: 'يوم 1 — تمارين مرونة وتنشيط للمنطقة المصابة',
    welcome_pillar_rehab_line_2: 'يوم 2 — تمارين تقوية تدريجية تحت متابعة',
    welcome_pillar_rehab_line_3: 'يوم 3 — تقييم الألم والتقدّم مع المتخصص',
    welcome_pillar_rehab_line_4: 'يوم 4 — رجوع تدريجي للحركة الطبيعية أو الرياضة',
    welcome_pillar_rehab_stat: 'كل مرحلة بتتفتح لما تجهز للي بعدها، ومفيش قفزة تسبب إصابة تانية',
    welcome_pillar_rehab_team: 'بيتابعك متخصص تأهيل أو علاج طبيعي وبيراجع حالتك أول بأول',
    welcome_pillar_nutrition_week_title: 'أكلك محسوب على مدار أسبوعك بالكامل',
    welcome_pillar_nutrition_line_1: 'يوم البداية — حساب احتياجك اليومي من السعرات',
    welcome_pillar_nutrition_line_2: '3 إلى 5 وجبات في اليوم حسب مواعيدك ونشاطك',
    welcome_pillar_nutrition_line_3: 'متابعة يومية للسعرات والبروتين والكارب والدهون',
    welcome_pillar_nutrition_line_4: 'تعديل الخطة أسبوعيًا حسب وزنك وتقدّمك',
    welcome_pillar_nutrition_stat: 'كل وجبة ليها سعرات وماكروز محسوبة بالظبط على احتياجك',
    welcome_pillar_nutrition_team: 'بيتابعك أخصائي تغذية وبيعدّل خطتك حسب نتيجتك',
    welcome_pillar_medical_week_title: 'دعمك الطبي متاح طول الأسبوع',
    welcome_pillar_medical_line_1: 'مكتبة طبية مراجَعة من دكاترة ومتخصصين',
    welcome_pillar_medical_line_2: 'تقدر تحجز جلسة استشارة مع دكتور أو أخصائي في تخصصه',
    welcome_pillar_medical_line_3: 'تسجّل أي إصابة أو ألم وتوصل للمتخصص المناسب فورًا',
    welcome_pillar_medical_line_4: 'متابعة مستمرة لحالتك الطبية مع فريقك',
    welcome_pillar_medical_stat: 'كل استشارة ومقال في المكتبة مراجَع من متخصص فعلي',
    welcome_pillar_medical_team: 'بيتابعك دكتور أو أخصائي حسب حالتك (تأهيل، تغذية علاجية، إصابات، أو غيرها)',
    welcome_samples_title: 'لمحة من مكتبة التمارين',
    welcome_sample_ex_1_name: 'سكوات بار',
    welcome_sample_ex_1_detail: '4 مجموعات × 8 تكرارات',
    welcome_sample_ex_2_name: 'ضغط بنش',
    welcome_sample_ex_2_detail: '4 مجموعات × 10 تكرارات',
    welcome_sample_ex_3_name: 'ديدليفت',
    welcome_sample_ex_3_detail: '3 مجموعات × 6 تكرارات',
    welcome_sample_ex_4_name: 'بلانك',
    welcome_sample_ex_4_detail: '3 مجموعات × 40 ثانية',
    welcome_program_title: 'شكل برنامجك هيبقى إزاي',
    welcome_program_day_title: 'يوم 1 — الجزء العلوي',
    welcome_program_line_1: 'إحماء عام — 8 دقايق',
    welcome_program_line_2: 'ضغط بنش — 4×10',
    welcome_program_line_3: 'سحب أرضي — 4×10',
    welcome_program_line_4: 'كتف دمبل — 3×12',
    trust_item_real_team: 'فريق متخصصين حقيقي وراك، مش خوارزمية بس',
    trust_item_private: 'بياناتك ومتابعتك خاصة بيك وبفريقك بس',
    trust_item_medical: 'محتوى تأهيلي مبني على أساس علمي، ومراجَع قبل ما ينشر',
    trust_stat_clients: '+{n} عميل بيتابعوا برنامجهم دلوقتي',
    how_it_works_title: 'هيبقى إزاي؟',
    how_it_works_step1_title: 'سجّل واحكيلنا عن هدفك',
    how_it_works_step1_text: 'هدفك، رياضتك، وأي إصابة.',
    how_it_works_step2_title: 'هيتظبطلك برنامج فعلي',
    how_it_works_step2_text: 'متخصص حقيقي بيكتبه بإيده — مش برنامج جاهز للكل.',
    how_it_works_step3_title: 'تابع وعدّل أسبوعيًا',
    how_it_works_step3_text: 'بتسجّل تقدمك، وفريقك بيعدّل معاك.',
    welcome_audience_title: 'ده مناسب لمين؟',
    welcome_audience_1: 'راجع من إصابة ومحتاج تأهيل مضبوط',
    welcome_audience_2: 'مبتدئ عايز يبدأ صح',
    welcome_audience_3: 'بتستعد لموسم أو بطولة',
    welcome_audience_4: 'عايز تغذية مع أخصائي فعلي',
    welcome_stories_title: 'قبل وبعد',
    story_before_label: 'قبل',
    story_after_label: 'بعد',
    welcome_team_title: 'فريقك المتخصص',
    welcome_faq_title: 'أسئلة شائعة',
    welcome_lead_title: 'لسه مش متأكد؟ اتكلم مع فريقنا الأول',
    welcome_lead_sub: 'هنرد عليك بنفسنا',
    lead_name_ph: 'اسمك',
    lead_contact_ph: 'رقم تليفونك أو إيميلك',
    lead_message_ph: 'سؤالك أو أي حاجة عاوز تقولها (اختياري)',
    lead_submit_btn: 'ابعت',
    lead_submitted_msg: 'وصلت رسالتك — هيتواصل معاك فريقنا قريب',
    need_lead_fields: 'اكتب اسمك ورقم تليفونك أو إيميلك',
    provider_apply_title: 'مدرب أو متخصص وعايز تنضم لينا؟',
    provider_apply_sub: 'هنراجع طلبك ونرجعلك',
    provider_apply_name_ph: 'اسمك',
    provider_apply_email_ph: 'إيميلك',
    provider_apply_contact_ph: 'رقم تليفونك (اختياري)',
    provider_apply_message_ph: 'خبرتك أو شهاداتك (اختياري)',
    provider_apply_submitted_msg: 'وصل طلبك — هنراجعه ونرجعلك بالرد قريب',
    need_provider_apply_fields: 'اكتب اسمك وإيميلك واختر تخصصك',
    admin_provider_apps_title: 'طلبات انضمام مدربين ومتخصصين',
    admin_provider_apps_hint: 'راجع بيانات كل طلب، ولو موافق دوس "قبول" وهيتضاف كمتخصص تلقائي بنفس الإيميل والتخصص اللي كتبهم',
    provider_apps_empty: 'مفيش طلبات انضمام لسه',
    provider_app_status_pending: 'قيد المراجعة',
    provider_app_status_approved: 'اتوافق عليه',
    provider_app_status_rejected: 'اترفض',
    provider_app_approve_btn: 'قبول',
    provider_app_reject_btn: 'رفض',
    provider_app_approved_msg: 'تمام، اتضاف كمتخصص جديد',
    faq_q1: 'فيه مدرب حقيقي وراه ولا الموضوع كله برنامج آلي؟',
    faq_a1: 'فيه فريق حقيقي — مدرب أو متخصص بيشوف حالتك بنفسه ويبني ويعدّل برنامجك. المنصة بتنظّم المتابعة، مش بتحل محل الفريق.',
    faq_q2: 'ينفع أستخدمه لو عندي إصابة حالية؟',
    faq_a2: 'أيوه، من أهداف المنصة إنها تدعم حالات التأهيل من الإصابات. تقدر تسجّل إصابتك وتتابع مع متخصص تأهيل مناسب لحالتك.',
    faq_q3: 'إزاي بادفع؟',
    faq_a3: 'بعد التجربة المجانية، بتختار خطة وتدفع بفودافون كاش أو إنستاباي أو تحويل بنكي، وفريقك بيأكد الاشتراك بعد استلام الدفع.',
    faq_q4: 'ينفع ألغي الاشتراك في أي وقت؟',
    faq_a4: 'أيوه، مفيش التزام طويل — تقدر توقف أو تتواصل مع فريقك في أي وقت.',
    faq_q5: 'بياناتي وتقييماتي الطبية آمنة؟',
    faq_a5: 'بياناتك وأي تقييم أو تقرير طبي بتضيفه بيبقى متاح بس ليك وللمتخصصين المتابعين حالتك.',
    welcome_cta_title: 'جاهز تبدأ؟',
    welcome_cta_note: '30 يوم تجربة مجانية كاملة — من غير أي بطاقة ائتمان',
    welcome_start_btn: 'ابدأ تجربتك المجانية',
    welcome_login_hint: 'عندك حساب بالفعل؟',
    welcome_login_link: 'سجّل دخول',
    back_to_welcome: '‹ الرئيسية',

    trial_banner_text: 'باقي {n} يوم من تجربتك المجانية',
    trial_ended_title: 'انتهت فترة تجربتك المجانية',
    trial_ended_message: 'جربت ADAM لمدة 30 يوم كاملة. تواصل مع فريقك أو مدربك عشان تكمل.',

    recommended_badge: 'موصى به',
    active_now_badge: 'نشط مؤخرًا',
    change_team_btn: 'غيّر فريقك',
    team_edit_title: 'اختار فريقك',
    open_chat_btn: 'الشات',
    open_chat_inbox_btn: 'المحادثات',
    chat_title: 'الشات',
    chat_ai_note: 'هيردّ عليك المساعد الذكي فورًا، ولو محتاج تفاصيل أكتر مدربك هيدخل يرد عليك بنفسه',
    chat_input_ph: 'اكتب رسالتك...',
    chat_send_btn: 'إرسال',
    chat_inbox_title: 'المحادثات',
    chat_inbox_empty: 'مفيش محادثات لسه',
    chat_empty_note: 'ابعت أول رسالة وابدأ المحادثة',
    chat_sender_coach: 'مدربك',
    chat_sender_ai: 'المساعد الذكي',
    chat_thread_with: 'المحادثة مع {name}',
    open_subscription_btn: 'الاشتراك',
    open_provider_subscription_btn: 'اشتراكي',
    provider_subscription_title: 'اشتراكك كمتخصص',
    provider_sub_banner_text: 'اشتراكك كمتخصص لسه مش مفعّل — البرنامج هيفضل شغال عادي، بس يفضل تفعّله عشان تدعم استمرارية المنصة',
    provider_sub_banner_btn: 'اشترك دلوقتي',
    provider_no_plans: 'لسه مفيش خطط اشتراك متاحة لتخصصك — تواصل مع صاحب المنصة',
    subscription_title: 'اشتراكك',
    subscription_status_trial: 'تجربة مجانية — باقي {n} يوم',
    subscription_status_active: 'اشتراك فعّال لغاية {date}',
    subscription_status_none: 'مفيش اشتراك فعّال حاليًا',
    subscription_status_blocked: 'الوصول متوقف حاليًا',
    plans_title: 'خطط الاشتراك',
    plan_price_label: '{price} جنيه',
    plan_offer_label: 'عرض: {price} جنيه بدل {original}',
    plan_duration_opt_1: 'شهر واحد',
    plan_duration_opt_3: '3 شهور',
    plan_duration_opt_6: '6 شهور',
    plan_duration_opt_12: 'سنة كاملة (12 شهر)',
    plan_duration_suffix_1: '/ شهريًا',
    plan_duration_suffix_3: '/ كل 3 شهور',
    plan_duration_suffix_6: '/ كل 6 شهور',
    plan_duration_suffix_12: '/ سنويًا',
    choose_plan_btn: 'اشترك في الخطة دي',
    payment_method_label: 'طريقة الدفع',
    payment_method_vodafone: 'فودافون كاش',
    payment_method_instapay: 'إنستاباي',
    payment_method_bank: 'تحويل بنكي',
    payment_reference_ph: 'رقم العملية / المرجع',
    payment_note_ph: 'أي ملاحظة (اختياري)',
    submit_payment_btn: 'أرسل تأكيد الدفع',
    payment_submitted_msg: 'تم إرسال طلبك — هيتراجع ويتفعّل الاشتراك قريب',
    need_payment_fields: 'اختار خطة وطريقة الدفع واكتب رقم العملية',
    pending_payment_note: 'طلب دفعك قيد المراجعة — هيتفعّل الاشتراك بمجرد التأكيد',
    payment_rejected_note: 'للأسف طلب الدفع اتراجع — تقدر تبعت تاني برقم عملية صحيح',
    payment_settings_note: 'حوّل قيمة الخطة على أي وسيلة من دول، وابعت رقم العملية تحت',
    no_payment_settings: 'وسائل الدفع لسه مش متجهزة — تواصل مع فريقك',
    access_blocked_title: 'تم إيقاف الوصول مؤقتًا',
    access_blocked_message: 'تواصل مع الإدارة لمعرفة التفاصيل',
    provider_blocked_message: 'تم إيقاف حسابك مؤقتًا من الإدارة — تواصل معانا لمعرفة التفاصيل',
    open_admin_btn: 'لوحة التحكم',
    admin_panel_title: 'لوحة التحكم',
    admin_access_title: 'إدارة الوصول',
    admin_access_hint: 'دوّر بإيميل أي عميل أو متخصص عشان تمدّله أو توقف وصوله',
    admin_access_email_ph: 'الإيميل',
    admin_access_lookup_btn: 'ابحث',
    admin_access_not_found: 'مفيش حساب بالإيميل ده',
    admin_access_found_client: 'عميل',
    admin_access_found_provider: 'متخصص',
    admin_access_extend_label: 'امنح وصول لغاية تاريخ',
    admin_access_extend_btn: 'تمديد',
    admin_access_block_btn: 'إيقاف الوصول',
    admin_access_unblock_btn: 'إلغاء الإيقاف',
    admin_access_clear_btn: 'إلغاء أي تمديد يدوي',
    admin_access_current_none: 'مفيش تمديد أو إيقاف يدوي حاليًا',
    admin_access_current_until: 'وصول ممدود لغاية {date}',
    admin_access_current_blocked: 'الوصول متوقف يدويًا',
    admin_provider_plans_title: 'خطط اشتراك المتخصصين',
    admin_provider_plans_hint: 'اختار تخصص معيّن أو "كل التخصصات" — لو المتخصص عنده أكتر من خطة متاحة له، هيشوفهم كلهم ويختار',
    admin_add_provider_plan_btn: 'إضافة خطة جديدة',
    admin_payments_hint: 'طلبات العملاء والمتخصصين مع بعض',
    provider_plan_specialty_all: 'كل التخصصات',
    provider_plan_saved: 'اتحفظت الخطة',
    confirm_delete_provider_plan: 'تحذف خطة الاشتراك دي؟',
    need_provider_plan_fields: 'اختار تخصص واكتب اسم وسعر الخطة على الأقل',
    admin_leads_title: 'رسائل تواصل من الصفحة الرئيسية',
    admin_leads_hint: 'زوار عاوزين يتكلموا مع الفريق قبل ما يسجّلوا — رد عليهم بتليفون أو واتساب',
    leads_empty: 'مفيش رسائل تواصل لسه',
    lead_contacted_label: 'اتم التواصل معاه',
    stories_admin_title: 'قصص نجاح (قبل وبعد)',
    stories_admin_hint: 'بتتعرض في الصفحة الرئيسية — تضيف بس صور عميل وافق كتابيًا على النشر، وتقدر تخفيها في أي وقت',
    story_before_image: 'صورة قبل',
    story_after_image: 'صورة بعد',
    story_caption_ph: 'وصف مختصر (اختياري) — زي "3 شهور تدريب"',
    story_consent_label: 'العميل وافق كتابيًا إن الصور دي تتنشر في الصفحة الرئيسية',
    admin_add_story_btn: 'إضافة القصة',
    story_saved: 'اتحفظت القصة',
    need_story_fields: 'ضيف صورة قبل وصورة بعد، وأكّد إن العميل وافق على النشر',
    stories_empty: 'لسه معملتش أي قصة نجاح',
    public_stats_title: 'إحصائية الصفحة الرئيسية',
    public_stats_hint: 'شريط الثقة في الصفحة الرئيسية بيعرض عدد العملاء الحقيقي — دوس تحديث لما يتغيّر',
    refresh_public_stats_btn: 'تحديث الإحصائية',
    public_stats_updated: 'اتحدّثت الإحصائية',
    admin_plans_title: 'إدارة الأسعار والعروض',
    admin_add_plan_btn: 'إضافة خطة جديدة',
    plan_name_ph: 'اسم الخطة (عربي)',
    plan_name_en_ph: 'اسم الخطة (إنجليزي)',
    plan_price_ph: 'السعر (جنيه)',
    plan_features_ph: 'المميزات — كل ميزة في سطر (عربي)',
    plan_features_en_ph: 'المميزات — كل ميزة في سطر (إنجليزي)',
    plan_offer_label_ph: 'نص العرض (اختياري)',
    plan_offer_price_ph: 'سعر العرض (اختياري)',
    save_plan_btn: 'حفظ الخطة',
    delete_plan_btn: 'حذف الخطة',
    confirm_delete_plan: 'تحذف الخطة دي؟',
    plan_active_label: 'ظاهرة للعملاء',
    payment_settings_title: 'بيانات استلام الدفع',
    vodafone_number_ph: 'رقم فودافون كاش',
    instapay_handle_ph: 'حساب إنستاباي',
    bank_details_ph: 'تفاصيل الحساب البنكي (اختياري)',
    save_settings_btn: 'حفظ البيانات',
    admin_payments_title: 'طلبات الدفع الجديدة',
    no_pending_payments: 'مفيش طلبات دفع جديدة',
    approve_payment_btn: 'تأكيد وتفعيل',
    reject_payment_btn: 'رفض',
    payment_approved_msg: 'اتفعّل الاشتراك',
    payment_rejected_admin_msg: 'اترفض الطلب'
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
    quick_add_coach_btn: '+ Add new coach',
    pv_specialty_coach_hint: 'Picking "Coach" gives full coach access (sees and manages all clients); any other specialty only sees clients added to their own team',
    admin_team_badge: 'Admin team',
    grant_admin_team_label: 'Full admin access (exactly like the platform owner)',
    loading: 'Loading...',
    no_clients: 'No clients yet — add one below',
    clients_search_ph: 'Search by client name or email',
    coach_muscle_label: "Today's target muscle",
    coach_muscle_hint: 'The library opens already filtered to this muscle',
    save_day_as_template: 'Save this day as a template',
    delete_my_template: 'Delete template',
    my_template_name_ph: 'Template name (e.g. Push day — footballers)',
    my_template_hint: 'Saved under your name and available for any client — other specialists can use it too',
    my_template_save: 'Save',
    my_template_cancel: 'Cancel',
    my_templates_group: 'My templates',
    ready_templates_group: 'Ready-made templates',
    other_coaches_templates_group: 'Other specialists\' templates',
    template_day_empty: 'This day is empty — add exercises first, then save it as a template',
    template_needs_name: 'Enter a name for the template',
    template_saved: 'Template "{name}" saved ({count} exercises) — find it under My templates',
    template_deleted: 'Template "{name}" deleted',
    client_injury_flag: 'Injury report needs review',
    client_injury_flag_many: '{n} injury reports need review',
    no_client_search_results: 'No client matches that name or email',
    need_name_email: 'Enter name and email',
    adding: 'Adding...',
    no_activity: 'No activity today',
    done_count: 'Completed {n} exercises today',

    back_clients: '‹ Back to clients',
    back_program: '‹ Back to program',
    program_of: "{name}'s program",
    day_title: 'Day name (Chest & Triceps)',
    rest_day: 'Rest day',
    open_library: 'Pick from exercise library',
    open_mylib: 'My own library',
    or_manual: 'Or type the exercise yourself',
    ex_name: 'Exercise name',
    ex_sets: 'Sets',
    ex_reps: 'Reps',
    add_ex: '+ Add exercise',
    save_program: 'Save program',
    fill_ex: 'Fill in the exercise details',
    saving: 'Saving...',
    saved: 'Program saved',
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
    mylib_saved: 'Saved to your library',
    confirm_delete: 'Delete this exercise from your library?',
    choose_image: 'Choose an image (optional)',
    image_chosen: 'Change image',
    image_too_big: 'Image is too large — pick one under 3 MB',
    preparing_image: 'Preparing image...',
    image_failed: "Couldn't read that image — try another one",
    image_uploaded: 'Photo added',
    add_photo_short: 'Add photo',
    change_photo: 'Change photo',
    add_template_photo: '+ Photo for this program',
    pick_template_first: 'Pick a program from the list first',
    start_position: 'Start position',
    end_position: 'End position',
    exercise_image: 'Exercise image',
    no_image: 'No image for this exercise',
    tab_training: 'Training',
    tab_rehab: 'Rehab',
    tab_injuries: 'Injuries',
    tab_consult: 'Consult',
    consult_hint: 'Write your notes and recommendations for this client here — they stay saved and you can edit them anytime.',
    consult_notes_label: 'Notes & recommendations',
    consult_notes_ph: 'Write your notes or recommendations for the client here...',
    consult_save_btn: 'Save notes',
    consult_saved_msg: 'Notes saved',
    consult_requests_title: 'Consultation requests from this client',
    consult_no_requests: 'No consultation requests from this client',
    consult_status_pending: 'Awaiting reply',
    consult_status_answered: 'Answered',
    consult_asked_on: 'Sent on',
    consult_note_updated: 'Last updated',
    client_consult_ask_title: 'Request a consultation',
    client_consult_ask_hint: "Pick a specialist and write your question — they'll see it and reply here",
    client_consult_pick_provider: '— Choose a specialist —',
    client_consult_text_ph: 'Write your question or concern in detail...',
    client_consult_send_btn: 'Send request',
    client_consult_need_fields: 'Pick a specialist and write your question first',
    client_consult_sent_msg: "Request sent — they'll get it and reply",
    client_consult_replies_title: "Your team's replies",
    client_consult_no_replies: 'No replies yet — anything a specialist writes for you shows up here',
    client_consult_requests_title: 'Your previous requests',
    client_consult_no_requests: "You haven't requested a consultation yet",
    add_to: 'Add to',
    save_rehab: 'Save rehab program',
    saved_rehab: 'Rehab program saved',
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
    template_note: 'Templates are starting-point drafts based on general rehab principles — review and adapt them to the client before assigning.',
    pick_template: '— Choose a template —',
    confirm_template: 'This will replace the current rehab program entirely. Continue?',
    template_loaded: 'Template loaded — review and adapt before saving',
    all_categories: 'All types',
    cat_strength: 'Strength',
    cat_crossfit: 'CrossFit',
    cat_hyrox: 'HYROX',
    cat_agility: 'Field drills',
    cat_conditioning: 'Cardio & conditioning',
    welcome_mail_title: 'Automatic welcome message',
    welcome_mail_hint: 'Anyone who leaves an email on the landing page instantly receives a full explanation of the program. You get this URL from Google Apps Script (one step, written in the guide).',
    welcome_url_ph: 'Apps Script URL (starts with https://script.google.com/macros/s/...)',
    welcome_secret_ph: 'The secret you set inside the script',
    welcome_on_label: 'Enable automatic sending',
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
    per_set_add: '+ Set each set individually',
    per_set_edit: 'Edit per-set details',
    per_set_hide: 'Hide per-set details',
    per_set_clear: 'Clear per-set details',
    per_set_weight: 'Weight (kg)',
    anatomy_add: '+ Anatomy details (optional)',
    anatomy_edit: 'Edit anatomy details',
    anatomy_hide: 'Hide anatomy details',
    ex_photo_add: '+ Add exercise photo',
    ex_photo_change: 'Change exercise photo',
    ex_photo_remove: 'Remove photo',
    doc_too_big: 'This program is too large because of the photos — remove one or two exercise photos and save again',
    doc_size_warning: 'The program is getting close to the size limit because of the photos',
    anatomy_section_title: 'Anatomy details (optional)',
    anatomy_howto: 'How to perform',
    anatomy_goal: 'Goal of the exercise',
    anatomy_primary: 'Primary muscles',
    anatomy_secondary: 'Assisting muscles',
    anatomy_origin: 'Origin',
    anatomy_insertion: 'Insertion',
    anatomy_injury_benefit: 'How it helps the injury',
    back_generic: 'Back',
    open_calc_btn: 'Calculators',
    calculators_title: 'Calculators',
    calc_tab_bmi: 'BMI',
    calc_tab_bmr: 'BMR / TDEE',
    calc_tab_1rm: '1RM',
    calc_tab_macro: 'Macros',
    calc_tab_hr: 'Heart rate',
    calc_tab_water: 'Water',
    calc_tab_unit: 'Unit converter',
    calc_weight_kg: 'Weight (kg)',
    calc_height_cm: 'Height (cm)',
    calc_btn: 'Calculate',
    gender_male: 'Male',
    gender_female: 'Female',
    calc_age: 'Age',
    calc_lift_weight: 'Weight lifted',
    calc_reps_done: 'Reps done',
    calc_tdee_manual: 'Daily calories (TDEE)',
    calc_macro_hint: 'Leave calories empty to auto-fill from the BMR/TDEE calc above',
    calc_resting_hr: 'Resting HR (optional)',
    calc_exercise_minutes: 'Exercise minutes (optional)',
    calc_unit_weight: 'Weight',
    calc_unit_height: 'Height',
    calc_unit_distance: 'Distance',
    calc_kg: 'kg',
    calc_lb: 'lb',
    calc_cm: 'cm',
    calc_ft: 'ft',
    calc_in: 'in',
    calc_km: 'km',
    calc_mi: 'mi',
    calc_need_numbers: 'Enter valid numbers',
    act_level_sedentary: 'Sedentary (desk job)',
    act_level_light: 'Light activity (1-3 days/week)',
    act_level_moderate: 'Moderate activity (3-5 days/week)',
    act_level_active: 'High activity (6-7 days/week)',
    act_level_very_active: 'Very high activity (physical job + training)',
    goal_maintenance: 'Maintenance',
    goal_cutting: 'Cutting',
    goal_aggressive_cut: 'Aggressive cut',
    goal_bulking: 'Bulking',
    goal_aggressive_bulk: 'Aggressive bulk',
    bmi_cat_under: 'Underweight',
    bmi_cat_normal: 'Normal weight',
    bmi_cat_over: 'Overweight',
    bmi_cat_obese: 'Obese',
    calc_bmi_label: 'Body Mass Index',
    calc_bmr_label: 'Basal Metabolic Rate (BMR)',
    calc_tdee_label: 'Your daily calorie needs (TDEE)',
    calc_rm_label: 'Estimated 1-rep max (1RM)',
    calc_rm_table_title: 'Percentage / reps table',
    calc_macro_cal_label: 'Target calories',
    calc_macro_protein_label: 'Protein',
    calc_macro_carbs_label: 'Carbs',
    calc_macro_fat_label: 'Fat',
    calc_hr_maxhr_label: 'Estimated max heart rate',
    calc_hr_zone1: 'Zone 1 — light recovery',
    calc_hr_zone2: 'Zone 2 — fat burn / warm-up',
    calc_hr_zone3: 'Zone 3 — aerobic endurance',
    calc_hr_zone4: 'Zone 4 — lactate threshold',
    calc_hr_zone5: 'Zone 5 — max effort',
    calc_water_label: 'Your daily water needs',
    kcal_day: 'kcal/day',
    calc_g: 'g',
    calc_bpm: 'bpm',
    calc_liters: 'L',
    open_progress_btn: 'Progress',
    progress_title: 'Progress & Follow-up',
    progress_for_client: 'For: {name}',
    pgtab_inbody: 'InBody',
    pgtab_checkins: 'Check-ins',
    pgtab_appt: 'Appointments',
    ib_add_title: 'Log a new measurement',
    ib_bodyfat: 'Body fat %',
    ib_muscle: 'Muscle mass (kg)',
    ib_visceral: 'Visceral fat (level)',
    ib_water: 'Body water %',
    ib_notes: 'Notes (optional)',
    ib_save_btn: '+ Save measurement',
    ib_saved_msg: 'Measurement saved',
    ib_history_title: 'Measurement history',
    ib_empty: 'No measurements logged yet',
    ib_summary_title: 'Progress summary',
    ib_summary_period: 'From {from} to {to} ({days} days)',
    ib_weight_label: 'Weight',
    ib_bodyfat_label: 'Body fat',
    ib_muscle_label: 'Muscle mass',
    ib_visceral_label: 'Visceral fat',
    ib_water_label: 'Body water',
    checkin_add_title: 'Add a follow-up report',
    checkin_note_ph: 'Any notes (optional)',
    checkin_save_btn: '+ Send report',
    checkin_saved_msg: 'Report sent',
    checkin_history_title: 'Report history',
    checkin_empty: 'No follow-up reports yet',
    period_daily: 'Daily',
    period_weekly: 'Weekly',
    period_monthly: 'Monthly',
    scale_level_1: 'Very poor',
    scale_level_2: 'Poor',
    scale_level_3: 'Average',
    scale_level_4: 'Good',
    scale_level_5: 'Excellent',
    soreness_level_1: 'None',
    soreness_level_2: 'Mild',
    soreness_level_3: 'Moderate',
    soreness_level_4: 'Severe',
    soreness_level_5: 'Very severe',
    adherence_full: 'Fully followed the plan',
    adherence_partial: 'Partially followed',
    adherence_none: 'Did not follow',
    energy_label: 'Energy level',
    sleep_label: 'Sleep quality',
    soreness_label: 'Soreness',
    adherence_label: 'Plan adherence',
    appt_title: 'Next InBody / measurement appointment',
    appt_note_ph: 'Note about the appointment (optional)',
    appt_save_btn: 'Save appointment',
    appt_clear_btn: 'Clear appointment',
    appt_saved_msg: 'Appointment saved',
    appt_cleared_msg: 'Appointment cleared',
    appt_need_date: 'Pick an appointment date',
    no_appt_set: 'No appointment set yet',
    next_appt_label: 'Next appointment',
    welcome_samples_title_training: 'A look at the exercise library',
    welcome_samples_title_rehab: 'A look at rehab exercises',
    welcome_samples_title_nutrition: 'A look at the food library',
    welcome_samples_title_medical: 'Medical consultation specialties',
    welcome_program_title_training: 'What your program looks like',
    welcome_program_title_rehab: 'What your rehab program looks like',
    welcome_program_title_nutrition: 'What your eating day looks like',
    welcome_program_title_medical: 'How a medical consultation works',
    kcal_100g: 'kcal/100g',
    welcome_medical_case_detail: 'Specialist consultation via chat',
    welcome_medical_step_1: 'Report an injury or ask your question in the app',
    welcome_medical_step_2: 'A real specialist reviews your case',
    welcome_medical_step_3: 'You get a reply and a clear follow-up plan',
    welcome_medical_step_4: 'You continue tracking with your team in the app',
    cc_idle: 'No activity',
    no_specialty: 'No specialty set',
    ai_on_label: 'Turn on the AI assistant in chat',
    ai_on_hint: 'It uses the same URL above. Before turning it on, add GEMINI_KEY and FIREBASE_API_KEY to Script properties inside Apps Script — the setup file explains how.',
    settings_migrated: 'Settings moved to their new home — the assistant and welcome mail are working again',
    settings_missing_url: 'The URL is empty — the assistant and the welcome email will not work without it',
    cb_schedule: 'Their week',
    cp_full_edit: 'Edit all your answers ›',
    cp_full_edit_hint: 'Your sports, goals, weekly schedule, health and everything you were asked at the start',
    // ---- email verification ----
    // ---- expanded library ----
    cat_functional: 'Functional',
    cat_mobility: 'Mobility',
    cat_warmup: 'Warm-up & activation',
    cat_core: 'Core',
    cat_speed: 'Speed & agility',
    cat_tactical: 'Tactical',
    cat_athletic: 'Athletic performance',
    cat_testing: 'Testing',
    cat_rehab: 'Rehab',
    lib_all_levels: 'All levels',
    level_1: 'Beginner',
    level_2: 'Intermediate',
    level_3: 'Advanced',
    lib_media_only: 'With image only',
    lib_safe_only: 'Safe for this client',
    lib_credits_link: 'Image credits',
    quick_add: 'Quick add',
    exs_close: 'Close',
    exs_loading: 'Loading details...',
    exs_animated: 'Start and end position',
    exs_add: 'Add to program',
    exs_prescribe: 'Prescription',
    exs_howto: 'How to do it',
    exs_cues: 'Coaching cues',
    exs_mistakes: 'Common mistakes',
    exs_alternatives: 'Alternatives',
    exs_primary: 'Primary muscles',
    exs_secondary: 'Secondary',
    exs_caution_client: 'Careful — this client has: {list}. Check the precautions before adding it.',
    exs_caution_general: 'Precautions with: {list}',
    exs_media_credit: 'Image source and licence',
    exs_add_to: 'Will be added to: {target}',
    exs_cues_for_client: 'Cues for the client (one per line)',
    ex_duration: 'Duration',
    ex_distance: 'Distance',
    ex_zone: 'Intensity / zone',
    ex_intensity: 'Intensity',
    type_weight_reps: 'Weight & reps',
    type_reps: 'Reps',
    type_time: 'Time',
    type_distance: 'Distance',
    type_distance_time: 'Distance & time',
    credits_title: 'Image credits',
    credits_intro: 'These exercise drawings come from open sources whose licence allows commercial use. The condition is that we credit the authors and state what we changed — this page does that.',
    credits_by: 'Artwork',
    credits_license: 'Licence',
    credits_source: 'Source',
    credits_changes: 'What we changed',
    credits_count: '{n} drawings',
    credits_show_list: 'Show the full list',
    verify_title: 'Confirm your email',
    verify_text: 'We sent a message to {email}. Open it, tap the link inside, then come back here.',
    verify_why: 'This makes sure the email is really yours — your team’s messages and your notifications go there.',
    verify_spam: 'Can’t find it? Check your Spam or Junk folder.',
    verify_done_btn: 'I’ve confirmed',
    verify_resend_btn: 'Send it again',
    verify_resend_wait: 'You can resend in {n} seconds',
    verify_sent: 'Message sent',
    verify_not_yet: 'We haven’t received the confirmation yet — tap the link in the message first',
    verify_too_many: 'Too many messages in a row — wait a little and try again',
    verify_checking: 'Checking...',
    verify_wrong_btn: 'That email is wrong — sign up with another one',
    // ---- notifications ----
    notif_title: 'Notifications',
    notif_empty: 'No notifications yet — when your team messages you or updates your program, you’ll find it here',
    notif_mark_all: 'Mark all as read',
    notif_push_title: 'Phone notifications',
    notif_push_hint: 'So they reach you even when the app is closed.',
    notif_push_btn: 'Turn on notifications',
    notif_push_on: 'Notifications are on for this device',
    notif_push_denied: 'Notifications are blocked by the browser. Allow them in the site settings (the lock next to the address) and tap again.',
    notif_push_ios: 'On iPhone: tap the Share button, choose "Add to Home Screen", open ADAM from the new icon — and turn notifications on from there.',
    notif_push_unsupported: 'This browser does not support notifications — try Chrome',
    notif_push_failed: 'Could not turn on notifications: {reason}',
    notif_now: 'just now',
    notif_min: '{n} min ago',
    notif_hour: '{n} h ago',
    notif_day: '{n} d ago',
    notif_t_chat_client: 'New message from your team',
    notif_b_chat_client: '{text}',
    notif_t_chat_team: 'Message from {name}',
    notif_b_chat_team: '{text}',
    notif_t_workout: 'Your training program was updated',
    notif_b_workout: 'Your team changed your training program — open it to see what’s new.',
    notif_t_nutrition: 'Your nutrition plan was updated',
    notif_b_nutrition: 'Your team changed your meal plan — open it to see what’s new.',
    notif_t_rehab: 'Your rehab program was updated',
    notif_b_rehab: 'Your team changed your rehab program — open it to see what’s new.',
    notif_t_consult_request: 'Consultation request from {name}',
    notif_b_consult_request: '{text}',
    notif_t_consult_reply: 'Your consultation was answered',
    notif_b_consult_reply: '{name} replied — open consultations to read it.',
    notif_t_clearance_client: 'Your doctor’s opinion is in',
    notif_b_clearance_client: '{status}',
    notif_t_clearance_team: 'The doctor answered the clearance request',
    notif_b_clearance_team: '{name}: {status}',
    notif_t_injury_new: 'Injury report from {name}',
    notif_b_injury_new: '{parts}',
    notif_t_injury_status: 'Your injury report was updated',
    notif_b_injury_status: 'Status now: {status}',
    notif_t_booking_new: 'Booking request from {name}',
    notif_b_booking_new: 'On {date}',
    notif_t_booking_status: 'Your booking was updated',
    notif_b_booking_status: 'Booking on {date}: {status}',
    notif_t_team_joined: 'New client on your team',
    notif_b_team_joined: '{name} picked you for their team.',
    push_on_label: 'Turn on phone notifications',
    push_vapid_ph: 'Web Push key (Firebase → Cloud Messaging)',
    push_settings_hint: 'This key is public, not a secret — you get it from your Firebase project settings. Sending goes through the same Apps Script link above.',
    ob_sched_label: 'Your week',
    ob_sched_hint: 'Set the sport and its time for each day you train. Training more than once a day (gym in the morning, swimming at night)? Tap “+ Another session”. Leave a day empty if you do not train in it — this lets your coach build around your real schedule.',
    modality_title: 'Physiotherapy devices',
    modality_hint: 'A reference for settings and contraindications. Pick a device to see its protocols, and add a session to the client plan.',
    modality_contra: 'Contraindications — read before any session',
    modality_indications: 'Used for',
    modality_protocols: 'Protocols',
    modality_add: '+ Add to client plan',
    modality_added: 'Added to the plan — save the rehab program to store it',
    modality_already: 'That protocol is already in the plan',
    modality_plan_title: 'Device sessions in the client plan',
    show_more_n: 'Show {n} more',
    sched_rest: '— none —',
    goals_extra: 'and also:',
    sched_none: 'No schedule',
    sched_gym: 'Gym',
    sched_add: '+ Another session this day',
    sched_session_n: 'Session {n}',
    session_n: 'Session {n}',
    session_add: '+ Session',
    session_add_first: '+ Split the day into sessions',
    session_split_btn: 'Split like their schedule',
    session_client_plan: "Client's schedule this day: {s}",
    session_sport_ph: 'Session type',
    session_time: 'Session time',
    session_title_ph: 'Session name (e.g. Swimming — endurance)',
    session_remove: 'Delete this session',
    session_remove_confirm: 'Tap again to delete the session and its exercises',
    pick_session_btn: 'Do this workout today',
    pick_session_confirm: 'Sure? What you logged for {day} today will be cleared',
    sess_badge_moved: '{day} workout — doing it today',
    chat_ai_unavailable: 'The assistant is unavailable right now — your message reached your coach and they will reply',
    chat_ai_typing: 'The assistant is typing…',
    nut_lib_title: 'Nutrition program library',
    nut_lib_hint: 'Pick the program closest to your client, apply it, then adjust the amounts. The numbers next to each one are calculated from the food actually in it.',
    np_numbers: '{kcal} kcal · {protein}g protein',
    np_applied: 'Applied "{name}" to the week — adjust the amounts, then save',
    pc_clients_n: '{n} clients',
    no_search_results: 'No results for that search',
    adm_tab_report: "Today's report",
    adm_tab_payment: 'Payment details',
    adm_tab_welcome: 'Welcome message',
    adm_tab_stats: 'Homepage stat',
    adm_tab_plans: 'Pricing',
    adm_tab_provider_plans: 'Provider plans',
    adm_tab_payments: 'Payment requests',
    adm_tab_store: 'Store',
    adm_tab_orders: 'Store orders',
    adm_tab_stories: 'Success stories',
    adm_tab_leads: 'Contact messages',
    adm_tab_apps: 'Join requests',
    adm_tab_access: 'Access control',
    tile_clients: 'My clients',
    nav_home: 'Home',
    nav_profile: 'My profile',
    nav_chat: 'Chat',
    nav_progress: 'My progress',
    nav_team: 'My team',
    nav_injury: 'Report injury',
    nav_medlib: 'Medical library',
    nav_calc: 'Calculators',
    nav_sub: 'My subscription',
    home_hello: 'Welcome',
    home_hello_named: 'Hi {name}',
    home_today_training: "Today's training",
    home_today_food: "Today's food",
    home_today_water: 'Water',
    home_today_rehab: 'Rehab',
    home_open_rehab: 'Open your program',
    home_rest_day: 'Rest day',
    home_sets_of: '{done} of {total} sets',
    home_minutes: 'about {n} min',
    home_kcal_of: '{done} of {total} kcal',
    home_kcal_only: '{n} kcal',
    home_water_of: '{done} of {total} glasses',
    tab_store: 'Store',
    store_empty: 'No products in the store yet',
    store_cart_title: 'Your cart',
    store_checkout_btn: 'Checkout',
    store_submit_order_btn: 'Confirm order',
    store_address_ph: 'Delivery address or note (optional)',
    store_my_orders_title: 'My orders',
    store_admin_title: 'Store management',
    store_orders_title: 'Store orders',
    product_name_ph: 'Product name (Arabic)',
    product_name_en_ph: 'Product name (English)',
    product_price_ph: 'Price (EGP)',
    product_desc_ph: 'Product description (Arabic, optional)',
    product_desc_en_ph: 'Product description (English, optional)',
    admin_add_product_btn: 'Add new product',
    cat_clothing: 'Sportswear',
    cat_equipment: 'Equipment',
    cat_supplements: 'Supplements',
    store_add_to_cart: 'Add to cart',
    store_no_orders: "You haven't placed any orders yet",
    store_no_orders_admin: 'No orders yet',
    store_order_status_submitted: 'Under review',
    store_order_status_confirmed: 'Confirmed',
    store_order_status_delivered: 'Delivered',
    store_order_status_cancelled: 'Cancelled',
    store_confirm_order_btn: 'Confirm order',
    store_deliver_order_btn: 'Mark as delivered',
    store_cancel_order_btn: 'Cancel order',
    store_order_saved_msg: 'Your order was sent and will be reviewed soon',
    store_cart_empty: 'Your cart is empty',
    store_total_label: 'Total',
    need_cart_items: 'Add at least one product to your cart',
    currency_egp: 'EGP',
    product_saved: 'Product saved',
    need_product_fields: 'Enter at least the product name and price',
    log_actual_btn: 'Log what you actually did',
    hide_actual_btn: 'Hide',
    actual_label: 'Actual',
    day_volume: 'Planned',
    actual_volume_label: 'Actual',
    week_volume: "This week's total load",
    tap_to_edit: 'Tap an exercise to edit it',
    matching_images: 'Looking up exercise images...',
    images_matched: 'Found images for {n} template exercises',
    tab_nutrition: 'Nutrition',
    daily_targets: 'Daily targets',
    t_kcal: 'Kcal',
    t_protein: 'Protein',
    t_carbs: 'Carbs',
    t_fat: 'Fat',
    add_to_meal: 'Add to a meal',
    open_food_library: 'Food library',
    save_nutrition: 'Save nutrition plan',
    saved_nutrition: 'Nutrition plan saved',
    food_library: 'Food Library',
    search_food: 'Search foods...',
    add_custom_food: 'Add a new food',
    food_name: 'Food name',
    per_100: 'Values per 100 g',
    save_food: '+ Save food',
    food_saved: 'Food saved',
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
    all_supps: 'All supplements',
    hero2_badge: '30 days free — no card needed',
    team_strip_title: 'A full team behind you',
    orbit_rating_line: '{avg} from {n} reviews',
    faq_badge: 'Common question',
    deck_prev: 'Previous',
    deck_next: 'Next',
    deck_tap_hint: 'Tap a card to read the answer · swipe for the next',
    deck_swipe_hint: 'Swipe left or right',
    team_strip_hint: 'Tap any specialty to see what they do',
    coach_does: 'Writes your program and adjusts it weekly',
    medical_case_physio: 'Pain and range of motion',
    medical_case_ortho: 'Fractures, ligaments, arthritis',
    medical_case_sports_medicine: 'Field injuries and return to play',
    medical_case_psychologist: 'Competition pressure and confidence',
    rehab_does: 'Gets you back to playing safely after injury',
    nutrition_does: 'Builds your meals around your weight and goal',
    doctor_does: 'Reviews your case and reassures you',
    psych_does: 'Works on your focus and confidence',
    role_coach: 'Coach',
    role_rehab: 'Rehab',
    role_nutrition: 'Nutrition',
    role_doctor: 'Doctor',
    role_psych: 'Psychology',
    hero2_title: 'Your program. From a real specialist.',
    hero2_sub: 'Training · Rehab · Nutrition · Medical advice',
    hero2_demo_btn: 'See a sample program',
    hero2_trust_1: 'Real specialists',
    hero2_trust_2: 'Your data stays private',
    hero2_trust_3: 'Evidence-reviewed content',
    stat_exercises: 'exercises with photos',
    stat_templates: 'ready templates',
    stat_supps: 'supplements explained',
    stat_specialists: 'specialists',
    how_it_works_note: 'Three steps, that is it',
    lead_reveal_btn: 'Write your message',
    pa_reveal_btn: 'Apply to join',
    role_progress: 'Progress',
    hero_slide5_title: 'Sports psychology session',
    hero_slide5_sub: 'Two days before the match',
    hero_slide5_rows: 'Breathing drill — 5 min|Performance visualisation|A fixed pre-match routine|Eight hours of sleep',
    hero_slide5_foot: 'Work on focus and confidence',
    hero_slide6_title: 'Your progress this month',
    hero_slide6_sub: 'Measurements, weight, performance',
    hero_slide6_rows: 'Weight — 82 78.4 kg|Body fat — 22% 18%|Bench press — 60 72.5 kg|85% program adherence',
    hero_slide6_foot: 'Every number logged by you, reviewed with your coach',
    hero_slide4_title: 'A consultation with a specialist',
    hero_slide4_sub: 'Sports medicine doctor',
    hero_slide4_rows: 'You reported knee pain|Reviewed within two hours|A reply and a plan change|Squats paused for now',
    hero_slide4_foot: 'Answered without waiting for an appointment',
    hero_slide1_title: "Today's program",
    hero_slide1_sub: 'Upper body — push',
    hero_slide1_rows: 'Warm-up — 8 min|Barbell bench press — 4×8|Overhead press — 3×10|Dumbbell flyes — 3×12|Rope triceps — 3×15',
    hero_slide1_foot: '3 of 5 exercises done',
    hero_slide2_title: 'Shoulder rehab',
    hero_slide2_sub: 'Phase 2 — range and strength',
    hero_slide2_rows: 'Pendulum swings — 3×10|Band external rotation — 3×12|Light front raise — 3×12|Scapular squeeze — 3×10',
    hero_slide2_foot: 'Followed by a rehab specialist',
    hero_slide3_title: "Today's nutrition plan",
    hero_slide3_sub: '2,400 kcal — 165 g protein',
    hero_slide3_rows: 'Breakfast — oats and eggs|Snack — Greek yoghurt|Lunch — chicken, rice, salad|Dinner — fish and vegetables',
    hero_slide3_foot: 'Calculated for your weight and goal',
    phone_required: 'Enter your phone number — this is how we will reach you',
    phone_too_short: 'Number is too short — a {code} number needs {count} digits. Example: {example}',
    phone_too_long: 'Number is too long — a {code} number needs {count} digits. Example: {example}',
    phone_bad_start: 'That does not look like a valid {code} number — check how it starts. Example: {example}',
    bad_email: 'That email does not look right — please check it',
    lead_phone_ph: 'Your phone number',
    lead_email_ph: 'Your email (so we can open an account for you)',
    lead_interest_ph: 'What do you need? (optional)',
    lead_interest_label: 'Needs',
    lead_new: 'New',
    daily_report_title: 'Last 24 hours',
    daily_report_refresh: 'Refresh report',
    daily_report_week: 'Weekly report',
    daily_report_day: 'Daily report',
    report_new_clients: 'New clients',
    report_new_leads: 'Contact messages',
    report_new_injuries: 'Injury reports',
    report_new_consults: 'Consult requests',
    report_new_orders: 'Store orders',
    report_total_clients: 'Total clients',
    report_alert_injuries: '{n} injury report(s) with no reply yet',
    report_alert_leads: '{n} new contact message(s) waiting',
    report_alert_consults: '{n} consult request(s) waiting',
    report_alert_payments: '{n} payment(s) waiting for review',
    report_alert_orders: '{n} new store order(s)',
    report_all_clear: 'Nothing waiting on you — all clear',
    report_generated_at: '{range} — updated {time}',
    report_range_day: 'Last 24 hours',
    report_range_week: 'Last 7 days',
    lead_accept_btn: 'Accept as client',
    lead_accepted_btn: 'Accepted as client',
    lead_needs_email: 'An email is needed to open an account',
    lead_already_client: 'This person is already one of your clients',
    lead_accepted_msg: 'Account created — they sign in with {email} and land straight in as a client',
    supp_library: 'Supplements & vitamins library',
    supp_search_ph: 'Search for a supplement or vitamin...',
    supp_disclaimer: 'This library is an educational reference, not a prescription. Any client with a medical condition, on medication, or pregnant must see a doctor or clinical dietitian before taking anything.',
    supp_dose: 'Dose',
    supp_when: 'Timing',
    supp_use: 'What it is for',
    supp_add_to_plan: '+ Add to client plan',
    supp_already_added: 'Already in the plan',
    supp_added: '"{name}" added to the supplement plan — remember to save the program',
    supp_note_ph: 'Note for the client (optional)',
    supp_plan_title: 'Supplements & vitamins',
    supp_plan_empty: 'No supplements in the plan — open the library and pick what is needed',
    supp_client_note: 'These are the supplements your coach selected for you. If you take any medication or have a medical condition, ask your doctor first.',
    open_supp_library: 'Supplements library',
    remove: 'Remove',
    food_count: '{n} foods',
    tab_activity: 'My activity',
    client_sport: "Client's sport",
    use_sport_template: 'Conditioning template',
    sport_template_note: 'The template loads onto the open day and adds to its exercises — review and adapt it to the athlete and their season phase.',
    pick_sport: '— Choose a sport —',
    pick_sport_template: '— Choose a template —',
    sport_template_loaded: 'Template loaded onto {day}',
    ring_move_label: "Today's workout",
    ring_exercise_label: 'Active days (7d)',
    ring_stand_label: 'Extra activity (7d)',
    log_activity: 'Log your activity',
    save_activity: '+ Log activity',
    activity_history: 'Activity history',
    act_notes: 'Notes (optional)',
    activity_saved: 'Activity logged',
    no_activity_yet: 'No activity logged yet',
    need_activity: 'Pick a sport and fill at least one field',
    confirm_delete_activity: 'Delete this activity?',
    recent_activity: 'Last activity: {text}',
    tab_classes: 'Class',
    open_classes: 'Classes',
    classes_title: 'Classes',
    back_classes: '‹ Back to classes',
    add_class: 'Add a class',
    class_name: 'Class name',
    class_time: 'Time (e.g. 6:00 PM)',
    save_class: '+ Save class',
    class_saved: 'Class saved',
    need_class_name: 'Enter a class name',
    no_classes: 'No classes yet — add one below',
    open_providers: 'Providers',
    open_my_profile_btn: 'My profile',
    my_bookings_title: 'My bookings',
    open_bookings_btn: 'My bookings',
    book_session_btn: 'Book a session',
    session_type_label: 'Session type',
    booking_date_ph: 'Date',
    booking_note_ph: 'Note (optional)',
    submit_booking_btn: 'Send booking request',
    booking_requested: 'Booking request sent',
    no_bookings: 'No bookings yet',
    need_booking_fields: 'Pick a session type and a date',
    providers_title: 'Providers',
    add_provider: 'Add a provider',
    provider_name: 'Provider name',
    provider_email: 'Their email',
    save_provider: '+ Save provider',
    provider_saved: 'Provider saved',
    need_provider_fields: 'Enter name, email, and pick a specialty',
    no_providers: 'No providers yet — add one below',
    pick_specialty: '— Choose specialty —',
    provider_home_soon: 'Your dashboard is on its way — every feature for your specialty lands here soon.',
    show_signup: 'New here? Create an account',
    signup_title: 'Create Account',
    signup_btn: 'Create account',
    confirm_password: 'Confirm password',
    back_to_login: 'Have an account? Sign in',
    need_signup_fields: 'Enter an email and password',
    passwords_mismatch: "Passwords don't match",
    weak_password: 'Password must be at least 6 characters',
    email_in_use: 'That email is already registered',
    creating_account: 'Creating account...',
    ob_lead: 'Two minutes, and your team builds your program on this',
    ob_body_label: 'Your body type',
    ob_body_hint: 'Pick the closest — it changes how your program and calories are built',
    body_ecto: 'Lean',
    body_ecto_note: 'Loses weight fast, struggles to gain',
    body_meso: 'Athletic',
    body_meso_note: 'Builds muscle and leans out fairly easily',
    body_endo: 'Fuller',
    body_endo_note: 'Gains easily, needs more work to lean out',
    ob_progress_note: '{done} of {total} done',
    ob_progress_done: 'All set — you can continue',
    onboarding_title: 'A few quick details',
    choose_photo: 'Choose your photo (optional)',
    ob_name_ph: 'Your name',
    ob_weight_ph: 'Weight (kg)',
    ob_height_ph: 'Height (cm)',
    ob_weight_label: 'Weight (kg)',
    ob_height_label: 'Height (cm)',
    ob_age_label: 'Age',
    ob_dob_label: 'Date of birth',
    dob_day: 'Day',
    dob_month: 'Month',
    dob_year: 'Year',
    ob_gender_label: 'Gender',
    pick_gender: '— Choose gender —',
    gender_male: 'Male',
    gender_female: 'Female',
    manual_number_hint: 'You can also type the number directly in the box',
    ob_activity_label: 'Activity level',
    ob_sport_label: 'Your sport or main goal',
    next_btn: 'Next',
    need_onboarding_fields: 'Enter your name, gender, date of birth, weight, height, activity level and goal',
    pick_activity: '— Choose activity level —',
    pick_sport_group: '— Choose sport type —',
    pick_sport: '— Choose your sport —',
    act_sedentary: 'Sedentary (desk job)',
    act_light: 'Lightly active',
    act_moderate: 'Moderately active',
    act_active: 'Active',
    act_very_active: 'Very active / athlete',
    team_title: 'Choose your team',
    team_hint: 'Tap any specialist you want to work with — you can change this anytime later',
    team_save: 'Save & continue',
    team_save_edit: 'Save changes',
    team_skip: 'Skip for now',
    no_providers_yet: 'No providers registered yet — you can choose later',
    no_reviews_yet: 'No reviews yet',
    view_team_btn: 'Your team — rate your specialists',
    team_view_title: 'Your team',
    team_view_hint: 'Rate any specialist you work with',
    no_team_yet: 'You haven\'t chosen a team yet — pick one from onboarding',
    rate_provider_label: 'Your rating',
    need_rating: 'Choose a star rating first',
    review_comment_ph: 'Write your thoughts (optional)',
    save_review_btn: 'Save your rating',
    review_saved: 'Your rating was saved, thank you!',
    trainee_count_label: '{n} trainees currently with them',
    written_reviews_title: 'Client reviews',
    no_written_reviews: 'No one has written a review yet',
    chat_with_provider_btn: 'Message them',
    client_label: 'Client',
    back_to_client: '‹ Back',
    reviews_received_title: 'Client reviews',
    no_reviews_received: 'No one has reviewed you yet',
    provider_name_label: 'Your name',
    provider_name_ph: 'Your full name',
    platform_owner_label: 'Platform owner',
    your_specialties_label: 'Your specialties (you can pick more than one)',
    need_one_specialty: 'Pick at least one specialty',
    specialty_locked_hint: 'This specialty is locked on your account and cannot be removed — you can still add others',
    need_one_approved_specialty: 'You must keep at least one approved specialty — you cannot remove them all',
    specialty_pending_note: 'Waiting for platform approval on: {list}',
    specialty_sent_for_review: 'Saved — {list} was sent to the platform for approval and starts working once approved',
    pending_specialties_title: 'Specialties awaiting your approval',
    approve_btn: 'Approve',
    reject_btn: 'Reject',
    specialty_approved_msg: '"{spec}" approved for {name} — their section is now open',
    specialty_rejected_msg: '"{spec}" rejected for {name}',
    lib_access_title: 'Libraries available to them',
    lib_access_mine_label: 'Libraries available to you',
    lib_access_exercises: 'Exercises',
    lib_access_food: 'Nutrition',
    lib_access_supplements: 'Supplements',
    lib_access_rehab: 'Rehab templates',
    lib_access_medical: 'Medical library',
    lib_opened_msg: '{lib} library opened for {name}',
    lib_closed_msg: '{lib} library closed for {name}',
    lib_locked_msg: 'This library is closed for your account — contact the platform admin',
    lib_locked_hint: 'Closed — contact the platform admin',
    pending_specs_badge: 'Specialty requests waiting',
    specialties_hint: 'Finished a new course? Tick it here and it shows on your profile and to clients choosing their team',
    open_client_profile_btn: 'Your profile ›',
    client_profile_title: 'Your profile',
    client_profile_hint: 'Update your info any time — your team sees the latest automatically',
    client_name_field_label: 'Your name',
    save_profile_btn: 'Save changes',
    need_client_profile_fields: 'Fill in your name, weight, and height first',
    provider_bio_label: 'About you',
    provider_bio_ph: 'Write a short bio about your experience and approach...',
    provider_certs_label: 'Certifications & achievements',
    provider_certs_ph: 'e.g. Sports science degree, injury rehab course, former national champion...',
    save_profile: 'Save profile',
    profile_saved: 'Profile saved',
    ob_phone_ph: 'Your phone number',
    ob_goal_label: 'Your main goal',
    pick_goal: '— Choose your goal —',
    goal_lose_weight: 'Lose weight',
    goal_build_muscle: 'Build muscle',
    goal_general_fitness: 'General fitness & health',
    goal_performance: 'Improve sports performance',
    goal_rehab_recovery: 'Recover from an injury',
    ob_focus_label: 'What do you want to work on? (pick all that apply)',
    focus_training: 'Training',
    focus_nutrition: 'Nutrition',
    focus_rehab: 'Rehab',
    focus_medical: 'Medical consultation',
    ob_schedule_title: 'Your daily schedule',
    ob_schedule_hint: 'So we can fit your program to your real schedule',
    ob_work_nature_label: 'What\'s the nature of your work?',
    pick_work_nature: '— Choose your work type —',
    work_nature_desk: 'Desk job',
    work_nature_physical: 'Physical / manual job',
    work_nature_shift: 'Shift work (changes morning/night)',
    work_nature_student: 'Student',
    work_nature_other: 'Something else',
    ob_training_days_label: 'How many days a week do you like to train?',
    pick_training_days: '— Choose number of days —',
    training_days_count: '{n} days',
    training_days_one: '1 day',
    training_days_two: '2 days',
    ob_sleep_label: 'Your sleep schedule',
    ob_sleep_hint: 'If your work is shifts and your times change, put whatever fits your current schedule',
    ob_sleep_time_label: 'Bedtime',
    ob_wake_time_label: 'Wake-up time',
    ob_sleep_hours_label: 'How many hours do you sleep in total?',
    ob_sleep_hours_hint: 'The total, not one stretch — if you sleep at night and nap, add them together',
    ob_sleep_blocks_label: 'Across how many sleeps?',
    sleep_h_lt5: 'Under 5 hours',
    sleep_h_5_6: '5 to 6',
    sleep_h_6_7: '6 to 7',
    sleep_h_7_8: '7 to 8',
    sleep_h_8_9: '8 to 9',
    sleep_h_gt9: 'More than 9',
    sleep_b_1: 'One sleep at night',
    sleep_b_2: 'Two — night plus a nap',
    sleep_b_3plus: 'Three or more across the day',
    cb_sleep_amount: 'Sleep hours',
    ob_sleep_quality_label: 'What does your sleep look like?',
    cb_days: 'Trains',
    cb_meals: 'Eats',
    cb_sleep: 'Sleep',
    pick_sleep_quality: '— Choose your sleep pattern —',
    ob_sleep_quality_hint: 'This really changes the size of the program — broken sleep means less recovery',
    sleep_q_solid: 'Solid through the night',
    sleep_q_broken: 'I wake up in the middle',
    sleep_q_short: 'Few hours',
    sleep_q_shifts: 'Shifts — my hours change',
    ob_meals_per_day_label: 'How many meals a day do you like?',
    pick_meals_per_day: '— Choose number of meals —',
    meals_per_day_count: '{n} meals',
    meals_per_day_one: '1 meal',
    meals_per_day_two: '2 meals',
    ob_meal_times_label: 'Your meal times',
    ob_first_meal_label: 'First meal',
    ob_last_meal_label: 'Last meal',
    ob_pain_question: 'Do you have any pain or health issue currently limiting your exercise?',
    ob_pain_note_ph: 'Tell us briefly...',
    report_injury_btn: 'In pain or injured? Report it',
    injury_title: 'Report an injury or pain',
    injury_hint: 'Tap where it hurts on the diagram (you can pick more than one spot)',
    body_front: 'Front',
    body_back: 'Back',
    injury_desc_label: 'Describe what you feel',
    injury_desc_ph: 'When did it start, what makes it worse, anything else worth mentioning...',
    choose_scan: 'Upload a scan or photo (optional)',
    injury_submit: 'Send report',
    injury_history: 'Your past reports',
    injury_saved: 'Report sent — your team will review it',
    need_injury_parts: 'Pick at least one spot on the diagram',
    no_injury_reports: "You haven't reported anything yet",
    status_requested: 'Awaiting review',
    status_confirmed: 'Being followed up',
    status_done: 'Reviewed',
    no_client_injuries: "This client hasn't reported any injuries yet",
    view_scan_btn: 'View image',
    status_update_saved: 'Status updated',
    reported_on: 'on',
    open_medlib_btn: 'Medical library',
    med_library_title: 'Medical library',
    med_library_hint: "Trusted info from your medical team — every article is reviewed before it's published",
    red_flags_title: 'Red flags — stop and see a doctor right away',
    all_categories: 'All',
    add_med_article: 'Add a new article',
    med_title_ph: 'Article title',
    med_body_ph: 'Write the content here...',
    choose_med_image: 'Add an image (optional)',
    save_draft_btn: 'Save as draft',
    submit_review_btn: 'Submit for review',
    med_articles_title: 'Articles',
    no_med_articles: 'No articles in this section yet',
    need_med_fields: 'Pick a category and write the title and content',
    med_saved: 'Saved',
    seed_medlib_btn: 'Load starter content for the medical library',
    team_link: 'AI team',
    seeding_library: 'Loading...',
    seed_done: '{n} new draft articles loaded — need a specialist’s review before clients can see them',
    seed_author_label: 'Starter content — needs specialist review',
    class_members: 'Class members',
    add_member: '+ Add member',
    class_exercises_title: 'Class exercises',
    class_exercises_hint: 'Anyone can view and do these, even without attending the class',
    add_from_library_btn: '+ Add from library',
    no_class_exercises: 'No exercises set for this class yet',
    added_class_ex: 'Added: {name}',
    other_classes_title: 'Other classes — view their exercises',
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
    rest_msg: 'Take it easy today — the body builds while it rests',
    rest_title: 'Rest day',
    no_plan: 'No program for this day',
    no_plan_title: 'This day is still empty',
    no_rehab_title: 'No rehab program',
    ob_health_label: 'Anything about your health your team should know?',
    ob_health_hint: 'Pick whatever applies. It really does change your program — and only your own team can see it.',
    ob_health_note_label: 'Anything else you want to tell your team?',
    ob_health_note_ph: 'e.g. I have dialysis twice a week',
    ob_health_privacy: 'This is stored on your own account and seen only by the team following you — never sold, never sent anywhere else.',
    ob_preg_label: 'Pregnant',
    ob_preg_week_label: 'Which week?',
    ob_postpartum_label: 'Recently gave birth',
    preg_tri1: 'First trimester',
    preg_tri2: 'Second trimester',
    preg_tri3: 'Third trimester',
    preg_week_of: 'Week {n}',
    safety_open: 'See the stop signs ›',
    safety_sub: 'Your program is set around your condition',
    safety_sheet_title: 'Your condition and your program',
    safety_care: 'Precautions while you train',
    safety_stop: 'Stop immediately and call your doctor if:',
    safety_disclaimer: 'This is general guidance for training with your condition — not a diagnosis, not treatment, and not a substitute for your doctor. Any decision about medication, dosing or tests is the doctor\u2019s alone.',
    clearance_needed: 'Needs a doctor\u2019s clearance before the program starts',
    clearance_waiting: 'Request sent to the doctor — awaiting reply',
    clearance_ok: 'The doctor approved this program',
    clearance_needed_text: 'Your condition needs a doctor to review it and confirm training is suitable for you. Your team will be in touch.',
    clearance_ok_text: 'The doctor reviewed your case and approved the program.',
    coach_health_open: 'See precautions and stop signs \u203a',
    request_clearance_btn: 'Request doctor clearance',
    clearance_needed_coach: 'This case needs a doctor to review it and confirm training is suitable. Write the program, but do not activate it before clearance arrives.',
    clearance_waiting_coach: 'The request was sent to the doctor on this client\u2019s team — awaiting reply.',
    clearance_ok_coach: 'The doctor reviewed the case and approved. Read their note before you write.',
    clearance_doctor_note: 'Doctor\u2019s note',
    clearance_sent: 'Request sent to the doctor',
    clearance_request_text: 'Medical clearance request: {name} — condition: {list}. Need your opinion: is training suitable? Anything contraindicated?',
    adh_health_flag: 'Special case',
    team_search_ph: 'Search by name...',
    team_no_match: 'No specialist with that name',
    team_picked_count: 'You picked {n} of your team',
    recommended_short: 'Top pick',
    provider_profile_title: 'Specialist profile',
    ps_clients: 'clients',
    ps_reviews: 'reviews',
    ps_rating: 'average',
    ps_certs: 'Certificates and experience',
    ps_pick: 'Pick for this specialty',
    ps_remove: 'Remove from my team',
    ob_source_label: 'How did you hear about ADAM?',
    ob_source_other_ph: 'Tell us how you found us',
    src_instagram: 'Instagram',
    src_facebook: 'Facebook',
    src_tiktok: 'TikTok',
    src_whatsapp: 'WhatsApp',
    src_youtube: 'YouTube',
    src_google: 'Google search',
    src_friend: 'A friend told me',
    src_gym: 'At the gym',
    src_other: 'Something else',
    heard_from_label: 'Found us via',
    ob_ref_label: 'Who told you about ADAM?',
    ob_ref_hint: 'If a coach or specialist referred you, pick them — so they get credit.',
    ob_ref_picked: 'Referred by: {name}',
    prov_clients: 'clients',
    prov_referrals: 'referrals',
    prov_rating: 'rating',
    prov_open_profile: 'View profile',
    open_clearance_btn: 'Medical clearance requests',
    clearance_screen_title: 'Medical clearance requests',
    clearance_screen_hint: 'Any doctor on the platform can answer — it does not have to be this client\u2019s own doctor. Your decision reaches the coach and client immediately.',
    clearance_none: 'No clearance requests',
    clearance_none_pending: 'Nothing waiting for a reply',
    clr_filter_pending: 'Awaiting reply',
    clr_filter_answered: 'Answered',
    clr_filter_all: 'All',
    clr_state_pending: 'Awaiting reply',
    clr_state_cleared: 'Approved',
    clr_state_restricted: 'Approved with limits',
    clr_state_denied: 'Not approved yet',
    clr_state_none: 'No decision',
    clr_btn_cleared: 'Approve',
    clr_btn_restricted: 'Approve with limits',
    clr_btn_denied: 'Not approved yet',
    clr_note_ph: 'Write your limits or your reason — this is what the coach will work to',
    clr_need_note: 'Write the limits or the reason first',
    clr_saved: 'Your decision was saved and sent to the coach',
    clr_client_note: 'Client note',
    clr_from: 'Requested by',
    clr_by: 'Decided by',
    clearance_restricted: 'Doctor approved with limits',
    clearance_denied: 'Doctor has not approved the program yet',
    clearance_restricted_coach: 'The doctor approved with limits — work strictly inside them.',
    clearance_denied_coach: 'The doctor has not approved yet. Do not activate a program before they review again.',
    clearance_restricted_text: 'Your doctor approved training with limits — your team knows them and will follow them.',
    clearance_denied_text: 'Your doctor judged that training is not suitable right now. Your team will be in touch.',
    ob_cycle_label: 'Track my cycle alongside the program',
    ob_cycle_last_label: 'First day of your last period',
    ob_cycle_len_label: 'Your cycle length in days (28 is average)',
    cycle_day_of: 'Day {n}',
    cycle_log_btn: 'My period started today',
    cycle_logged: 'Logged — the program reads against it now',
    cycle_train_title: 'Training in this phase',
    cycle_flags_title: 'See a doctor about these:',
    open_adherence_btn: 'Adherence board',
    adherence_title: 'Adherence board',
    adherence_hint: 'Last 7 days — who is on track and who needs a call',
    adh_total: 'clients',
    adh_attention: 'need attention',
    adh_ok: 'on track',
    adh_filter_attention: 'Need attention',
    adh_filter_all: 'All',
    adh_filter_active: 'On track',
    adh_none_attention: 'Nobody needs attention today',
    adh_none: 'No clients in this list',
    adh_state_silent: 'Silent',
    adh_state_slipping: 'Slipping',
    adh_state_active: 'Active',
    adh_never: 'Nothing logged yet',
    adh_today: 'Logged today',
    adh_since: 'Last active {n} days ago',
    adh_waiting: 'Waiting for your reply',
    adh_waiting_many: 'Waiting on {n} requests',
    adh_trained: 'Trained',
    adh_logged: 'Logged food',
    adh_water: 'Water/day',
    adh_open: 'Open program',
    water_title: 'Water',
    water_count: '{a} of {b} cups',
    picker_title: 'Add food',
    picker_search_ph: 'Search for a food...',
    picker_add: 'Add it',
    no_results: 'No match — try another name',
    add_food_btn: '+ Add food to this meal',
    extra_badge: 'extra',
    mark_eaten: 'Mark as eaten',
    by_grams: 'By grams',
    approx_note: 'approx.',
    meal_empty: 'Nothing in this meal',
    fuel_left: 'kcal left',
    fuel_over: 'kcal over',
    fuel_summary: 'Eaten {a} · Plan {b} · Goal {c}',
    week_streak_note: '{a} of {b} days done this week',
    week_streak_empty: 'No training days this week yet',
    start_session_btn: '▶ Start workout',
    focus_close: 'Close',
    focus_prev: '‹ Previous',
    focus_next: 'Next ›',
    focus_finish: 'Done',
    focus_of: 'Exercise {a} of {b}',
    focus_sets_left: '{n} sets left — tap a bead after each set',
    focus_sets_done: 'All sets done',
    fab_toggle_title: 'Tools',
    no_meals_title: 'No meals for this day',
    no_nutrition_title: 'No nutrition yet',
    sess_badge_today: 'Today',
    sess_stat_ex: 'exercises',
    sess_stat_sets: 'sets',
    sess_stat_min: 'min',
    fuel_of: 'of',
    fuel_g: 'g',
    day_plan: '{day} program',
    of_exercises: '{a} of {b} exercises',
    well_done: 'Well done, champ',
    remaining: '{n} exercises left',

    days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    days_short: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    days_mini: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],

    welcome_hero_title: 'Your training, rehab and nutrition program — all in one place',
    welcome_hero_sub: 'ADAM brings together training, rehab, nutrition and medical consultation with a team of specialists, all tracked step by step',
    welcome_feature_training_title: 'Training built for you',
    welcome_feature_training_desc: 'A detailed weekly training program, and you log your actual performance as you go',
    welcome_feature_rehab_title: 'Injury rehab',
    welcome_feature_rehab_desc: 'A phased rehab program, followed up by a rehab or physiotherapy specialist',
    welcome_feature_nutrition_title: 'A complete nutrition plan',
    welcome_feature_nutrition_desc: 'Your meals planned across the week, trackable day by day',
    welcome_feature_medical_title: 'Trusted medical guidance',
    welcome_feature_medical_desc: 'A medical library reviewed by specialists, and booking with doctors and specialists',
    welcome_pillars_title: 'Everything in one place',
    welcome_pillars_sub: 'Tap any pillar to see what is inside',
    welcome_pillars_note: 'All of this is unlocked with your subscription, and you follow it with our real coaches and specialists — not just a ready-made plan',
    welcome_pillar_training_week_title: 'Here\'s how your week is split',
    welcome_pillar_training_line_1: 'Day 1 — Upper body (push & pull)',
    welcome_pillar_training_line_2: 'Day 2 — Lower body (legs & core)',
    welcome_pillar_training_line_3: 'Day 3 — Active recovery or light cardio',
    welcome_pillar_training_line_4: 'Day 4 — Full body + performance check',
    welcome_pillar_training_stat: 'About 4 training days a week, every set and rep logged as you go',
    welcome_pillar_training_team: 'A certified coach follows up and adjusts your plan based on your actual performance',
    welcome_pillar_rehab_week_title: 'Your rehab plan is split into clear phases',
    welcome_pillar_rehab_line_1: 'Day 1 — Mobility and activation for the injured area',
    welcome_pillar_rehab_line_2: 'Day 2 — Gradual strengthening, under supervision',
    welcome_pillar_rehab_line_3: 'Day 3 — Pain and progress check with your specialist',
    welcome_pillar_rehab_line_4: 'Day 4 — Gradual return to normal movement or sport',
    welcome_pillar_rehab_stat: 'Each phase unlocks only when you\'re ready for it — no jump that risks a new injury',
    welcome_pillar_rehab_team: 'A rehab or physiotherapy specialist follows up and reviews your case as you go',
    welcome_pillar_nutrition_week_title: 'Your meals are planned across your whole week',
    welcome_pillar_nutrition_line_1: 'Day one — your daily calorie needs calculated',
    welcome_pillar_nutrition_line_2: '3 to 5 meals a day based on your schedule and activity',
    welcome_pillar_nutrition_line_3: 'Daily tracking of calories, protein, carbs and fat',
    welcome_pillar_nutrition_line_4: 'Plan adjusted weekly based on your weight and progress',
    welcome_pillar_nutrition_stat: 'Every meal has calories and macros calculated exactly for your needs',
    welcome_pillar_nutrition_team: 'A nutrition specialist follows up and adjusts your plan based on your results',
    welcome_pillar_medical_week_title: 'Medical support is there all week',
    welcome_pillar_medical_line_1: 'A medical library reviewed by doctors and specialists',
    welcome_pillar_medical_line_2: 'Book a consultation with a doctor or specialist in their field',
    welcome_pillar_medical_line_3: 'Log any injury or pain and reach the right specialist right away',
    welcome_pillar_medical_line_4: 'Ongoing follow-up on your medical case with your team',
    welcome_pillar_medical_stat: 'Every consultation and article in the library is reviewed by a real specialist',
    welcome_pillar_medical_team: 'A doctor or specialist follows up based on your case (rehab, clinical nutrition, injuries, or other)',
    welcome_samples_title: 'A look at the exercise library',
    welcome_sample_ex_1_name: 'Barbell squat',
    welcome_sample_ex_1_detail: '4 sets × 8 reps',
    welcome_sample_ex_2_name: 'Bench press',
    welcome_sample_ex_2_detail: '4 sets × 10 reps',
    welcome_sample_ex_3_name: 'Deadlift',
    welcome_sample_ex_3_detail: '3 sets × 6 reps',
    welcome_sample_ex_4_name: 'Plank',
    welcome_sample_ex_4_detail: '3 sets × 40 seconds',
    welcome_program_title: 'What your program looks like',
    welcome_program_day_title: 'Day 1 — Upper body',
    welcome_program_line_1: 'General warm-up — 8 minutes',
    welcome_program_line_2: 'Bench press — 4×10',
    welcome_program_line_3: 'Seated row — 4×10',
    welcome_program_line_4: 'Dumbbell shoulder press — 3×12',
    trust_item_real_team: 'A real team of specialists behind you, not just an algorithm',
    trust_item_private: 'Your data and follow-up are private to you and your team',
    trust_item_medical: 'Rehab content is built on scientific grounds and reviewed before publishing',
    trust_stat_clients: '+{n} clients are following their program right now',
    how_it_works_title: 'How does it work?',
    how_it_works_step1_title: 'Sign up and tell us your goal',
    how_it_works_step1_text: 'Your goal, your sport, any injury.',
    how_it_works_step2_title: "You'll get a real program",
    how_it_works_step2_text: 'A real specialist writes it — not a template.',
    how_it_works_step3_title: 'Track and adjust weekly',
    how_it_works_step3_text: 'You log progress, your team adjusts.',
    welcome_audience_title: 'Who is this for?',
    welcome_audience_1: 'Coming back from injury',
    welcome_audience_2: 'Starting out and want it done right',
    welcome_audience_3: 'Preparing for a season or a competition',
    welcome_audience_4: 'Want nutrition with a real dietitian',
    welcome_stories_title: 'Before & after',
    story_before_label: 'Before',
    story_after_label: 'After',
    welcome_team_title: 'Your specialist team',
    welcome_faq_title: 'Frequently asked questions',
    welcome_lead_title: "Not sure yet? Talk to our team first",
    welcome_lead_sub: "We will get back to you ourselves",
    lead_name_ph: 'Your name',
    lead_contact_ph: 'Your phone number or email',
    lead_message_ph: 'Your question or anything you want to say (optional)',
    lead_submit_btn: 'Send',
    lead_submitted_msg: "Your message was sent — our team will reach out soon",
    need_lead_fields: 'Enter your name and phone number or email',
    provider_apply_title: 'Are you a coach or specialist who wants to join us?',
    provider_apply_sub: "We review your application and reply",
    provider_apply_name_ph: 'Your name',
    provider_apply_email_ph: 'Your email',
    provider_apply_contact_ph: 'Your phone number (optional)',
    provider_apply_message_ph: 'Your experience or certifications (optional)',
    provider_apply_submitted_msg: "Your application was sent — we'll review it and get back to you soon",
    need_provider_apply_fields: 'Enter your name, email and pick your specialty',
    admin_provider_apps_title: 'Coach & specialist applications',
    admin_provider_apps_hint: 'Review each application, and hit "Approve" to add them as a specialist automatically with the email and specialty they entered',
    provider_apps_empty: 'No applications yet',
    provider_app_status_pending: 'Under review',
    provider_app_status_approved: 'Approved',
    provider_app_status_rejected: 'Rejected',
    provider_app_approve_btn: 'Approve',
    provider_app_reject_btn: 'Reject',
    provider_app_approved_msg: 'Done, added as a new specialist',
    faq_q1: 'Is there a real coach behind it, or is it all automated?',
    faq_a1: "There's a real team — a coach or specialist reviews your case themselves and builds and adjusts your program. The platform organizes the follow-up, it doesn't replace the team.",
    faq_q2: 'Can I use it if I have a current injury?',
    faq_a2: 'Yes — supporting rehab from injuries is one of the platform\'s main goals. You can log your injury and follow up with a rehab specialist suited to your case.',
    faq_q3: 'How do I pay?',
    faq_a3: 'After the free trial, you pick a plan and pay via Vodafone Cash, InstaPay, or bank transfer, and your team confirms the subscription once payment is received.',
    faq_q4: 'Can I cancel anytime?',
    faq_a4: "Yes — there's no long-term commitment. You can stop or contact your team anytime.",
    faq_q5: 'Is my data and medical information safe?',
    faq_a5: 'Your data and any medical assessment or report you add is only available to you and the specialists following your case.',
    welcome_cta_title: 'Ready to start?',
    welcome_cta_note: 'A full 30-day free trial — no credit card needed',
    welcome_start_btn: 'Start your free trial',
    welcome_login_hint: 'Already have an account?',
    welcome_login_link: 'Log in',
    back_to_welcome: '‹ Home',

    trial_banner_text: '{n} days left in your free trial',
    trial_ended_title: 'Your free trial has ended',
    trial_ended_message: "You've tried ADAM for a full 30 days. Contact your team or coach to continue.",

    recommended_badge: 'Recommended',
    active_now_badge: 'Recently active',
    change_team_btn: 'Change your team',
    team_edit_title: 'Choose your team',
    open_chat_btn: 'Chat',
    open_chat_inbox_btn: 'Chats',
    chat_title: 'Chat',
    chat_ai_note: 'The AI assistant replies right away, and your coach will jump in for anything that needs more detail',
    chat_input_ph: 'Type your message...',
    chat_send_btn: 'Send',
    chat_inbox_title: 'Chats',
    chat_inbox_empty: 'No chats yet',
    chat_empty_note: 'Send the first message to start the conversation',
    chat_sender_coach: 'Your coach',
    chat_sender_ai: 'AI assistant',
    chat_thread_with: 'Chat with {name}',
    open_subscription_btn: 'Subscription',
    open_provider_subscription_btn: 'My subscription',
    provider_subscription_title: 'Your subscription as a specialist',
    provider_sub_banner_text: "Your specialist subscription isn't active yet — the app will keep working normally, but activating it helps support the platform",
    provider_sub_banner_btn: 'Subscribe now',
    provider_no_plans: 'No subscription plans are available for your specialty yet — contact the platform owner',
    subscription_title: 'Your subscription',
    subscription_status_trial: 'Free trial — {n} days left',
    subscription_status_active: 'Active subscription until {date}',
    subscription_status_none: 'No active subscription',
    subscription_status_blocked: 'Access is currently paused',
    plans_title: 'Subscription plans',
    plan_price_label: '{price} EGP',
    plan_offer_label: 'Offer: {price} EGP instead of {original}',
    plan_duration_opt_1: '1 month',
    plan_duration_opt_3: '3 months',
    plan_duration_opt_6: '6 months',
    plan_duration_opt_12: '1 year (12 months)',
    plan_duration_suffix_1: '/ month',
    plan_duration_suffix_3: '/ every 3 months',
    plan_duration_suffix_6: '/ every 6 months',
    plan_duration_suffix_12: '/ year',
    choose_plan_btn: 'Subscribe to this plan',
    payment_method_label: 'Payment method',
    payment_method_vodafone: 'Vodafone Cash',
    payment_method_instapay: 'InstaPay',
    payment_method_bank: 'Bank transfer',
    payment_reference_ph: 'Transaction / reference number',
    payment_note_ph: 'Any note (optional)',
    submit_payment_btn: 'Send payment confirmation',
    payment_submitted_msg: 'Your request was sent — it will be reviewed and activated soon',
    need_payment_fields: 'Pick a plan and payment method, and enter the transaction number',
    pending_payment_note: 'Your payment request is under review — the subscription will activate once confirmed',
    payment_rejected_note: 'Unfortunately your payment request was rejected — you can resend with a correct transaction number',
    payment_settings_note: "Transfer the plan's price using any of these, then send the transaction number below",
    no_payment_settings: 'Payment methods are not set up yet — contact your team',
    access_blocked_title: 'Access temporarily paused',
    access_blocked_message: 'Contact the admin for details',
    provider_blocked_message: 'Your account was temporarily paused by the admin — contact us for details',
    open_admin_btn: 'Admin panel',
    admin_panel_title: 'Admin panel',
    admin_access_title: 'Access management',
    admin_access_hint: "Look up any client or provider's email to extend or pause their access",
    admin_access_email_ph: 'Email',
    admin_access_lookup_btn: 'Look up',
    admin_access_not_found: 'No account with that email',
    admin_access_found_client: 'Client',
    admin_access_found_provider: 'Provider',
    admin_access_extend_label: 'Grant access until',
    admin_access_extend_btn: 'Extend',
    admin_access_block_btn: 'Pause access',
    admin_access_unblock_btn: 'Unpause access',
    admin_access_clear_btn: 'Clear manual extension',
    admin_access_current_none: 'No manual extension or pause currently',
    admin_access_current_until: 'Access extended until {date}',
    admin_access_current_blocked: 'Access manually paused',
    admin_provider_plans_title: 'Specialist subscription plans',
    admin_provider_plans_hint: 'Pick a specific specialty or "All specialties" — if a specialist has more than one plan available to them, they\'ll see all of them and choose',
    admin_add_provider_plan_btn: 'Add new plan',
    admin_payments_hint: 'Client and specialist requests together',
    provider_plan_specialty_all: 'All specialties',
    provider_plan_saved: 'Plan saved',
    confirm_delete_provider_plan: 'Delete this subscription plan?',
    need_provider_plan_fields: 'Pick a specialty and enter at least the plan name and price',
    admin_leads_title: 'Homepage contact messages',
    admin_leads_hint: 'Visitors who want to talk to the team before signing up — follow up by phone or WhatsApp',
    leads_empty: 'No contact messages yet',
    lead_contacted_label: 'Followed up',
    stories_admin_title: 'Success stories (before & after)',
    stories_admin_hint: 'Shown on the homepage — only add photos of a client who gave written consent to publish, and you can hide them anytime',
    story_before_image: 'Before photo',
    story_after_image: 'After photo',
    story_caption_ph: 'Short caption (optional) — e.g. "3 months of training"',
    story_consent_label: 'The client gave written consent for these photos to be published on the homepage',
    admin_add_story_btn: 'Add story',
    story_saved: 'Story saved',
    need_story_fields: 'Add a before photo and an after photo, and confirm the client consented to publishing',
    stories_empty: "You haven't added any success stories yet",
    public_stats_title: 'Homepage stats',
    public_stats_hint: 'The trust bar on the homepage shows the real client count — click refresh whenever it changes',
    refresh_public_stats_btn: 'Refresh stat',
    public_stats_updated: 'Stat updated',
    admin_plans_title: 'Manage prices & offers',
    admin_add_plan_btn: 'Add a new plan',
    plan_name_ph: 'Plan name (Arabic)',
    plan_name_en_ph: 'Plan name (English)',
    plan_price_ph: 'Price (EGP)',
    plan_features_ph: 'Features — one per line (Arabic)',
    plan_features_en_ph: 'Features — one per line (English)',
    plan_offer_label_ph: 'Offer text (optional)',
    plan_offer_price_ph: 'Offer price (optional)',
    save_plan_btn: 'Save plan',
    delete_plan_btn: 'Delete plan',
    confirm_delete_plan: 'Delete this plan?',
    plan_active_label: 'Visible to clients',
    payment_settings_title: 'Payment receiving details',
    vodafone_number_ph: 'Vodafone Cash number',
    instapay_handle_ph: 'InstaPay handle',
    bank_details_ph: 'Bank account details (optional)',
    save_settings_btn: 'Save details',
    admin_payments_title: 'New payment requests',
    no_pending_payments: 'No new payment requests',
    approve_payment_btn: 'Confirm & activate',
    reject_payment_btn: 'Reject',
    payment_approved_msg: 'Subscription activated',
    payment_rejected_admin_msg: 'Request rejected'
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
/* أدوات الملاعب والصالات الوظيفية بتتضم لنفس القايمة */
Object.keys(DRILL_EQUIPMENT).forEach(function (key) {
  if (!EQUIPMENT[key]) EQUIPMENT[key] = DRILL_EQUIPMENT[key];
});


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

/*
 * أيقونات SVG بديلة لإيموجي الحالة (✅ / ⚠️) في رسائل الواجهة —
 * setStatusMessage(el, text, type) بيمسح العنصر ويحط أيقونة (لو فيه)
 * وبعدها نص عادي. type: 'success' أو 'warning' أو null (نص بدون أيقونة).
 */
const STATUS_ICON_SUCCESS = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><polyline points="8 12.5 11 15.5 16 9"></polyline></svg>';
const STATUS_ICON_WARNING = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 21.5 20h-19L12 3.5z"></path><line x1="12" y1="9.5" x2="12" y2="13.5"></line><circle cx="12" cy="16.8" r="0.6" fill="currentColor" stroke="none"></circle></svg>';
const DELETE_ICON_SVG = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

function setStatusMessage(el, text, type) {
  el.innerHTML = '';
  if (type === 'success' || type === 'warning') {
    const icon = document.createElement('span');
    icon.className = 'inline-icon status-icon';
    icon.innerHTML = type === 'success' ? STATUS_ICON_SUCCESS : STATUS_ICON_WARNING;
    el.appendChild(icon);
  }
  const label = document.createElement('span');
  label.textContent = text;
  el.appendChild(label);
}

function muscleName(key) {
  return (MUSCLES[key] && MUSCLES[key][lang]) || key || '';
}

function equipName(key) {
  return (EQUIPMENT[key] && EQUIPMENT[key][lang]) || key || t('all_equipment');
}

/* اسم تمرين من مكتبة التمارين المحلية (ثنائي اللغة) — لو الاسم نص عادي
   (مصدر قديم) بيرجعه زي ما هو من غير تعديل */
function exerciseLibName(exercise) {
  if (!exercise || !exercise.name) return '';
  return (typeof exercise.name === 'object') ? (exercise.name[lang] || exercise.name.ar || exercise.name.en || '') : exercise.name;
}

/* نص مترجم مجمّع لقائمة عضلات (مصفوفة مفاتيح زي primaryMuscles) —
   بيتحط جاهز جوه makeExercise() لما نضيف تمرين من المكتبة */
function musclesListText(muscles) {
  return (Array.isArray(muscles) ? muscles : []).map(muscleName).join(lang === 'ar' ? '، ' : ', ');
}

function days() {
  return TEXT[lang].days;
}

function daysShort() {
  return TEXT[lang].days_short;
}

/* اختصار حرف/تلات حروف — لشريط الأسبوع الضيّق في شاشة العميل */
function daysMini() {
  return TEXT[lang].days_mini;
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

  document.querySelectorAll('[data-t-title]').forEach(function (node) {
    const text = t(node.getAttribute('data-t-title'));
    node.title = text;
    node.setAttribute('aria-label', text);
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
const MEAL_ICONS = { breakfast: 'sunrise', lunch: 'plate', dinner: 'moon', snack: 'cup' };
const SECTION_ICONS = {
  warmup: 'flame',
  main: 'training',
  cardio: 'run',
  mobility: 'refresh',
  flexibility: 'yoga'
};

// أيقونات SVG بديلة (لاستخدامها في عناصر الصفحة، مش جوه <option>)
const SECTION_ICON_SVG_PATHS = {
  warmup: '<path d="M12 3c-1 3-4 4-4 8a4 4 0 0 0 8 0c0-1.5-.7-2.5-1.5-3.5.3 1.5-.5 2.5-1.5 2.5-1.2 0-1.5-1-1-2C13 6 13 4.5 12 3z"></path>',
  main: '<rect x="2" y="9" width="3" height="6" rx="1"></rect><rect x="19" y="9" width="3" height="6" rx="1"></rect><line x1="5" y1="12" x2="19" y2="12"></line><rect x="6" y="7" width="2.5" height="10" rx="1"></rect><rect x="15.5" y="7" width="2.5" height="10" rx="1"></rect>',
  cardio: '<path d="M3 12h3.5l2-6 3 12 2-9 1.5 3H21"></path>',
  mobility: '<path d="M4 12a8 8 0 0 1 8-8c2.5 0 4.7 1.2 6 3"></path><path d="M20 12a8 8 0 0 1-8 8c-2.5 0-4.7-1.2-6-3"></path><path d="M18 4v3h-3"></path><path d="M6 20v-3h3"></path>',
  flexibility: '<circle cx="12" cy="5" r="2"></circle><path d="M12 7v6"></path><path d="M12 9l-5-2"></path><path d="M12 9l5-2"></path><path d="M12 13l-3 6"></path><path d="M12 13l3 6"></path>'
};

const MEAL_ICON_SVG_PATHS = {
  breakfast: '<circle cx="12" cy="15" r="4"></circle><line x1="12" y1="3" x2="12" y2="6"></line><line x1="4" y1="15" x2="2" y2="15"></line><line x1="22" y1="15" x2="20" y2="15"></line><line x1="5.5" y1="8.5" x2="7" y2="10"></line><line x1="18.5" y1="8.5" x2="17" y2="10"></line><line x1="3" y1="20" x2="21" y2="20"></line>',
  lunch: '<circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="3.5"></circle>',
  dinner: '<path d="M18 13a7 7 0 1 1-7-9 6 6 0 0 0 7 9z"></path>',
  snack: '<path d="M6 8h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z"></path><path d="M6 8l-1-3h14l-1 3"></path><line x1="12" y1="11" x2="12" y2="17"></line>'
};

function sectionIconSvg(key) {
  return '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (SECTION_ICON_SVG_PATHS[key] || '') + '</svg>';
}

function mealIconSvg(key) {
  return '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (MEAL_ICON_SVG_PATHS[key] || '') + '</svg>';
}

function setIconLabel(el, svgMarkup, text) {
  el.innerHTML = '';
  const icon = document.createElement('span');
  icon.className = 'inline-icon';
  icon.innerHTML = svgMarkup;
  el.appendChild(icon);
  el.appendChild(document.createTextNode(' ' + (text || '')));
}

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
    // معرّف التمرين في المكتبة (لو اتضاف منها) — بنستخدمه عشان نعرض
    // الاسم بلغة الواجهة الحالية بدل ما يفضل مخزّن بلغة واحدة للأبد
    libId: data.libId || '',
    sets: data.sets || 3,
    reps: data.reps || '12',
    rest: data.rest || '',
    load: data.load || '',
    rpe: data.rpe || '',
    tempo: data.tempo || '',
    image: data.image || '',
    imageUrl: data.imageUrl || '',
    /* تفاصيل تشريحية اختيارية — بتتعرض للمدرب والعميل لو اتملت، وبتفضل
       فاضية من غير ما تعطل أي برنامج قديم لو محدش دخلها */
    goal: data.goal || '',
    primaryMuscles: data.primaryMuscles || '',
    secondaryMuscles: data.secondaryMuscles || '',
    origin: data.origin || '',
    insertion: data.insertion || '',
    /* شرح طريقة أداء التمرين — بيتملي تلقائي لما تضيف من مكتبة التمارين،
       وتقدر تكتبه بنفسك لأي تمرين تضيفه من "مكتبتي" */
    howTo: data.howTo || '',
    /* ملحوظة خاصة بالتأهيل: مدى إفادة التمرين ده للإصابة تحديدًا */
    injuryBenefit: data.injuryBenefit || '',
    /* تفاصيل كل مجموعة لوحدها — اختياري. مصفوفة، عنصر لكل مجموعة:
       { weight, reps, rest, tempo }. لو فاضية، بيتعرض التمرين بالشكل
       التقليدي (sets × reps) عشان أي برنامج قديم يفضل شغال زي ما هو. */
    setDetails: Array.isArray(data.setDetails) ? data.setDetails : [],
    /* جديد — كلها اختيارية وفاضية في أي برنامج قديم:
       نوع الوصفة (وزن وعدات / وقت / مسافة…)، المدة، المسافة،
       RIR، منطقة الشدة للكارديو، ونصايح الأداء للعميل (سطر لكل نصيحة) */
    exType: data.exType || '',
    duration: data.duration || '',
    distance: data.distance || '',
    rir: data.rir || '',
    zone: data.zone || '',
    cues: data.cues || '',
    i18n: (data.i18n && typeof data.i18n === 'object') ? data.i18n : null
  };
}

/* بترجع true لو أي حقل من حقول التفاصيل التشريحية متملي */
function exerciseHasAnatomyDetail(exercise) {
  return !!(exercise && (exercise.goal || exercise.primaryMuscles || exercise.secondaryMuscles || exercise.origin || exercise.insertion || exercise.injuryBenefit || exercise.howTo || exercise.cues));
}

/* رقم من نص — بيرجع صفر لو مش قابل للتحويل، عشان حسابات الحمل الإجمالي متتعطلش */
function parseNum(value) {
  const n = parseFloat(value);
  return isNaN(n) ? 0 : n;
}

/* الحمل الإجمالي لتمرين واحد = مجموع (وزن × تكرار) لكل مجموعة */
function exerciseVolume(exercise) {
  if (exercise.setDetails && exercise.setDetails.length) {
    return exercise.setDetails.reduce(function (total, set) {
      return total + parseNum(set.weight) * parseNum(set.reps);
    }, 0);
  }
  const weight = parseNum(exercise.load);
  const reps = parseNum(exercise.reps);
  const sets = parseNum(exercise.sets);
  if (weight && reps && sets) return weight * reps * sets;
  return 0;
}

/* نص وصف المجموعات — تفصيلي لو متوفر، وإلا الشكل التقليدي sets × reps */
function setsSummaryText(exercise) {
  return localiseReps(setsSummaryRaw(exercise));
}

function setsSummaryRaw(exercise) {
  if (exercise.setDetails && exercise.setDetails.length) {
    return exercise.setDetails.map(function (set, index) {
      const parts = [(set.reps || '?') + '×' + (set.weight || '?' ) + (lang === 'ar' ? 'كجم' : 'kg')];
      if (set.rest) parts.push(set.rest);
      return (index + 1) + ') ' + parts.join(' — ');
    }).join('   ');
  }
  // الوقت والمسافة بيتكتبوا بشكلهم بدل "× عدات"
  const type = exercise.exType || '';
  if (type === 'distance_time') {
    const parts = [exercise.distance, exercise.duration].filter(Boolean).join(' / ');
    if (parts) return (Number(exercise.sets) > 1 ? exercise.sets + ' × ' : '') + parts;
  }
  if (type === 'time' && exercise.duration) return exercise.sets + ' × ' + exercise.duration;
  if (type === 'distance' && exercise.distance) return exercise.sets + ' × ' + exercise.distance;
  return exercise.sets + ' × ' + exercise.reps;
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
    // الاسم ممكن يكون نص عادي (المكتبة الكبيرة زمان) أو كائن {ar,en}
    // (الشكل الموحّد بعد الدمج) — بنقارن دايمًا بالاسم الإنجليزي
    const rawName = (exercise.name && typeof exercise.name === 'object')
      ? (exercise.name.en || exercise.name.ar || '')
      : exercise.name;
    if (!rawName) return;
    const candidate = normaliseName(rawName);

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

/*
 * بتدوّر على تمرين في مكتبة التمارين المحلية بالاسم الإنجليزي وترجّع
 * المستند نفسه (مش الصورة بس) — عشان نقدر ناخد منه الاسم العربي والصورة
 * والعضلات وطريقة الأداء. بتستخدمها قوالب التمرين اللي جايه بالإنجليزي.
 */
function matchLibraryExercise(englishName) {
  const target = normaliseName(englishName);
  if (!target) return null;
  const targetWords = target.split(' ').filter(function (w) { return w.length > 2; });
  if (!targetWords.length) return null;

  let best = null;
  let bestScore = 0;

  EXERCISE_LIBRARY.forEach(function (exercise) {
    const enName = (exercise.name && exercise.name.en) ? exercise.name.en : '';
    if (!enName) return;
    const candidate = normaliseName(enName);

    let score = 0;
    if (candidate === target) {
      score = 100;
    } else {
      const candidateWords = candidate.split(' ');
      let hits = 0;
      targetWords.forEach(function (word) {
        if (candidateWords.indexOf(word) !== -1) hits++;
      });
      const coverage = hits / targetWords.length;
      if (coverage >= 0.75) score = coverage * 50 - Math.abs(candidateWords.length - targetWords.length);
    }

    if (score > bestScore) {
      bestScore = score;
      best = exercise;
    }
  });

  return (best && bestScore >= 30) ? best : null;
}

function sportName(id) {
  // "جيم" مش رياضة في القايمة — دي حصة برنامج المدرب نفسه في جدول العميل
  if (id === 'gym') return t('sched_gym');
  const sport = SPORTS.filter(function (s) { return s.id === id; })[0];
  return sport ? sport[lang] : '';
}

function sportGroupName(key) {
  return (SPORT_GROUPS[key] && SPORT_GROUPS[key][lang]) || key;
}

/*
 * أيقونة ولون مميز لكل نوع رياضة — زي تصنيف أنواع التمرين في تطبيق
 * Apple Fitness (كل نوع نشاط له أيقونة ولون خاص بيه)
 */
const SPORT_GROUP_STYLE = {
  none:      { color: '#8e8e93', path: '<circle cx="12" cy="8" r="3.5"></circle><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"></path>' },
  endurance: { color: '#ff9f0a', path: '<path d="M3 12h3.5l2-6 3 12 2-9 1.5 3H21"></path>' },
  team:      { color: '#0a84ff', path: '<circle cx="9" cy="8" r="3"></circle><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"></path><circle cx="17" cy="9" r="2.4"></circle><path d="M15.5 14c2.5.3 4.5 2.3 4.5 6"></path>' },
  racket:    { color: '#ffd60a', path: '<circle cx="9.5" cy="9.5" r="5.5"></circle><line x1="13.5" y1="13.5" x2="19.5" y2="19.5"></line>' },
  combat:    { color: '#ff453a', path: '<circle cx="12" cy="12" r="8"></circle><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line>' },
  strength:  { color: '#ff375f', path: '<rect x="2" y="9" width="3" height="6" rx="1"></rect><rect x="19" y="9" width="3" height="6" rx="1"></rect><line x1="5" y1="12" x2="19" y2="12"></line><rect x="6" y="7" width="2.5" height="10" rx="1"></rect><rect x="15.5" y="7" width="2.5" height="10" rx="1"></rect>' },
  athletics: { color: '#30d158', path: '<circle cx="12" cy="15" r="4.5"></circle><path d="M9.5 11 7 4h3l2 6"></path><path d="M14.5 11 17 4h-3l-2 6"></path>' },
  water:     { color: '#64d2ff', path: '<path d="M3 15c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0 3.5 2 5 0"></path><path d="M3 10c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0 3.5 2 5 0"></path>' },
  gymnastic: { color: '#bf5af2', path: '<circle cx="12" cy="5" r="2"></circle><path d="M12 7v6"></path><path d="M12 9l-5-2"></path><path d="M12 9l5-2"></path><path d="M12 13l-3 6"></path><path d="M12 13l3 6"></path>' },
  winter:    { color: '#5e5ce6', path: '<line x1="12" y1="3" x2="12" y2="21"></line><line x1="4.5" y1="7.5" x2="19.5" y2="16.5"></line><line x1="19.5" y1="7.5" x2="4.5" y2="16.5"></line>' },
  other:     { color: '#a2845e', path: '<path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"></path>' }
};

function sportGroupStyle(group) {
  return SPORT_GROUP_STYLE[group] || SPORT_GROUP_STYLE.other;
}

function sportGroupIconSvg(group) {
  const style = sportGroupStyle(group);
  return '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="' + style.color + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + style.path + '</svg>';
}

/* شارة نوع الرياضة: أيقونة ملوّنة + اسم الرياضة، زي أنواع التمرين في Apple Fitness */
function setSportTag(el, sportId) {
  el.innerHTML = '';
  const sport = sportById(sportId);
  const group = sport ? sport.group : 'other';
  const style = sportGroupStyle(group);
  el.style.borderInlineStartColor = style.color;
  const icon = document.createElement('span');
  icon.className = 'inline-icon';
  icon.innerHTML = sportGroupIconSvg(group);
  el.appendChild(icon);
  el.appendChild(document.createTextNode(' ' + sportName(sportId)));
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
  'olympic weightlifting': 'cat_olympic',
  'crossfit': 'cat_crossfit',
  'hyrox': 'cat_hyrox',
  'agility': 'cat_agility',
  'conditioning': 'cat_conditioning'
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

const welcomeScreen = document.getElementById('welcome-screen');
const welcomeStickyCta = document.getElementById('welcome-sticky-cta');
const welcomeFaqList = document.getElementById('welcome-faq-list');
const welcomeTeamSection = document.getElementById('welcome-team-section');
const welcomeTeamGrid = document.getElementById('welcome-team-grid');
const welcomeStoriesSection = document.getElementById('welcome-stories-section');
const welcomeStoriesGrid = document.getElementById('welcome-stories-grid');
const providerSubscriptionScreen = document.getElementById('provider-subscription-screen');
const paSpecialtyMulti = document.getElementById('pa-specialty-multi');
const trialEndedScreen = document.getElementById('trial-ended-screen');
const trialBanner = document.getElementById('trial-banner');
const loginScreen = document.getElementById('login-screen');
const clientsScreen = document.getElementById('clients-screen');
const coachScreen = document.getElementById('coach-screen');
const libraryScreen = document.getElementById('library-screen');
const mylibScreen = document.getElementById('mylib-screen');
const clientScreen = document.getElementById('client-screen');
const foodScreen = document.getElementById('food-screen');
const supplementsScreen = document.getElementById('supplements-screen');
const subscriptionScreen = document.getElementById('subscription-screen');
const adminPanelScreen = document.getElementById('admin-panel-screen');
const chatScreen = document.getElementById('chat-screen');
const chatInboxScreen = document.getElementById('chat-inbox-screen');
let currentChatEmail = '';
let chatUnsub = null;
let chatReturnScreen = null;
const calculatorsScreen = document.getElementById('calculators-screen');
let calcReturnScreen = null;
const progressScreen = document.getElementById('progress-screen');
let progressReturnScreen = null;
let progressTargetEmail = '';
const logoutButton = document.getElementById('logout-btn');

/* لوحات وتابات التغذية — معرَّفة هنا مع باقي الشاشات لأن
   setCoachMode و setClientMode بيستخدموها قبل قسم التغذية في الملف */
const nutritionPanel = document.getElementById('nutrition-panel');
const tabNutrition = document.getElementById('tab-nutrition');
const clientNutritionPanel = document.getElementById('client-nutrition');
const ctabNutrition = document.getElementById('ctab-nutrition');
const clientActivityPanel = document.getElementById('client-activity');
const ctabActivity = document.getElementById('ctab-activity');
const activityRingsSvg = document.getElementById('activity-rings-svg');
const activityRingsLegend = document.getElementById('activity-rings-legend');
const classesScreen = document.getElementById('classes-screen');
const classDetailScreen = document.getElementById('class-detail-screen');
const clientClassesPanel = document.getElementById('client-classes');
const ctabClasses = document.getElementById('ctab-classes');
const clientStorePanel = document.getElementById('client-store');
const ctabStore = document.getElementById('ctab-store');

const clearanceScreen = document.getElementById('clearance-screen');
const adherenceScreen = document.getElementById('adherence-screen');
const providersScreen = document.getElementById('providers-screen');
const providersList = document.getElementById('providers-list');
const providersMessage = document.getElementById('providers-message');
const pvSpecialtyMulti = document.getElementById('pv-specialty-multi');

const providerHomeScreen = document.getElementById('provider-home-screen');
const providerHomeTitle = document.getElementById('provider-home-title');
const providerHomeSpecialty = document.getElementById('provider-home-specialty');
const providerHomeMessage = document.getElementById('provider-home-message');
const phName = document.getElementById('ph-name');
const phSpecialtyBox = document.getElementById('ph-specialty-box');
const phSpecialtyMulti = document.getElementById('ph-specialty-multi');
const phPhoto = document.getElementById('ph-photo');
const phPhotoLabel = document.querySelector('#ph-photo-label span');
const phPhotoBox = document.getElementById('ph-photo-box');
const phPhotoPreview = document.getElementById('ph-photo-preview');
const phBio = document.getElementById('ph-bio');
const phCerts = document.getElementById('ph-certs');
const phRatingSummary = document.getElementById('ph-rating-summary');
const phReviewsList = document.getElementById('ph-reviews-list');
const phOpenMedlibBtn = document.getElementById('ph-open-medlib-btn');
const phBackBtn = document.getElementById('ph-back-btn');

const signupScreen = document.getElementById('signup-screen');
const signupMessage = document.getElementById('signup-message');

const onboardingScreen = document.getElementById('onboarding-screen');
const onboardingMessage = document.getElementById('onboarding-message');
const obPhoto = document.getElementById('ob-photo');
const obPhotoLabel = document.querySelector('#ob-photo-label span');
const obPhotoBox = document.getElementById('ob-photo-box');
const obPhotoPreview = document.getElementById('ob-photo-preview');
const obName = document.getElementById('ob-name');
const obGender = document.getElementById('ob-gender');
const obGenderRows = document.getElementById('ob-gender-rows');
const obDobDay = document.getElementById('ob-dob-day');
const obDobMonth = document.getElementById('ob-dob-month');
const obDobYear = document.getElementById('ob-dob-year');
const obWeight = document.getElementById('ob-weight');
const obHeight = document.getElementById('ob-height');
const obActivity = document.getElementById('ob-activity');
const obSport = document.getElementById('ob-sport');
/*
 * أكتر من رياضة وأكتر من هدف وجدول أسبوعي.
 * مهم: حقول sport و goal المفردة بتفضل موجودة ومتساوية بأول عنصر
 * في القايمة — عشان كل الكود القديم (شاشة المدرب، قوالب الرياضات،
 * التقرير اليومي، سياق المساعد الذكي) يفضل شغال من غير ما نلمسه
 */
let obSports = [];
let obGoals = [];
let obSchedule = [];   // [{ day, sport, time }]
const obSportRows = document.getElementById('ob-sport-rows');
const obSportRowsLabel = document.getElementById('ob-sport-rows-label');

const teamScreen = document.getElementById('team-screen');
const teamList = document.getElementById('team-list');
const teamMessage = document.getElementById('team-message');
const teamSaveBtn = document.getElementById('team-save-btn');
const teamSkipBtn = document.getElementById('team-skip-btn');
const teamBackBtn = document.getElementById('team-back-btn');

const teamViewScreen = document.getElementById('team-view-screen');
const teamViewList = document.getElementById('team-view-list');

/* ---------- بروفايل العميل — يقدر يفتحه ويعدّله بنفسه في أي وقت ---------- */
const clientProfileScreen = document.getElementById('client-profile-screen');
const cpPhoto = document.getElementById('cp-photo');
const cpPhotoLabel = document.querySelector('#cp-photo-label span');
const cpPhotoBox = document.getElementById('cp-photo-box');
const cpPhotoPreview = document.getElementById('cp-photo-preview');
const cpName = document.getElementById('cp-name');
const cpWeight = document.getElementById('cp-weight');
const cpHeight = document.getElementById('cp-height');
const cpSport = document.getElementById('cp-sport');
const cpActivity = document.getElementById('cp-activity');
const cpGoal = document.getElementById('cp-goal');
const cpDobDay = document.getElementById('cp-dob-day');
const cpDobMonth = document.getElementById('cp-dob-month');
const cpDobYear = document.getElementById('cp-dob-year');
const cpTrainingDays = document.getElementById('cp-training-days');
const cpSleepQuality = document.getElementById('cp-sleep-quality');
const coachBasics = document.getElementById('coach-basics');
const cpSleepTime = document.getElementById('cp-sleep-time');
const cpWakeTime = document.getElementById('cp-wake-time');
const cpMealsPerDay = document.getElementById('cp-meals-per-day');
const cpFirstMealTime = document.getElementById('cp-first-meal-time');
const cpLastMealTime = document.getElementById('cp-last-meal-time');
const cpMessage = document.getElementById('cp-message');
let cpPickedImage = '';

function fillGenericSelect(select, keys, nameFn, placeholderKey) {
  if (!select) return;
  const keep = select.value;
  select.innerHTML = '';
  const none = document.createElement('option');
  none.value = '';
  none.textContent = t(placeholderKey);
  select.appendChild(none);
  keys.forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = nameFn(key);
    select.appendChild(option);
  });
  select.value = keep;
}

function fillClientProfileSelects() {
  fillSportSelect(cpSport, true);
  fillGenericSelect(cpActivity, ACTIVITY_LEVELS, activityName, 'pick_activity');
  fillGenericSelect(cpGoal, GOAL_KEYS, goalName, 'pick_goal');
  fillGenericSelect(cpTrainingDays, TRAINING_DAYS_KEYS, trainingDaysName, 'pick_training_days');
  fillGenericSelect(cpSleepQuality, SLEEP_QUALITY_KEYS, sleepQualityName, 'pick_sleep_quality');
  fillGenericSelect(cpMealsPerDay, MEALS_PER_DAY_KEYS, mealsPerDayName, 'pick_meals_per_day');
  fillCpDobSelects();
}

// نفس منطق fillDobSelects بالظبط بس على صناديق اختيار بروفايل العميل
// (cp-dob-*) بدل صناديق شاشة التعريف الأولى (ob-dob-*)
function fillCpDobSelects() {
  const keepDay = cpDobDay.value;
  const keepMonth = cpDobMonth.value;
  const keepYear = cpDobYear.value;

  cpDobDay.innerHTML = '';
  const dayNone = document.createElement('option');
  dayNone.value = '';
  dayNone.textContent = t('dob_day');
  cpDobDay.appendChild(dayNone);
  for (let day = 1; day <= 31; day++) {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day;
    cpDobDay.appendChild(option);
  }
  cpDobDay.value = keepDay;

  cpDobMonth.innerHTML = '';
  const monthNone = document.createElement('option');
  monthNone.value = '';
  monthNone.textContent = t('dob_month');
  cpDobMonth.appendChild(monthNone);
  MONTH_NAMES[lang].forEach(function (name, index) {
    const option = document.createElement('option');
    option.value = index + 1;
    option.textContent = name;
    cpDobMonth.appendChild(option);
  });
  cpDobMonth.value = keepMonth;

  cpDobYear.innerHTML = '';
  const yearNone = document.createElement('option');
  yearNone.value = '';
  yearNone.textContent = t('dob_year');
  cpDobYear.appendChild(yearNone);
  const nowYear = new Date().getFullYear();
  for (let year = nowYear - 10; year >= nowYear - 90; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    cpDobYear.appendChild(option);
  }
  cpDobYear.value = keepYear;
}

async function openClientProfile() {
  showScreen(clientProfileScreen);
  cpMessage.textContent = t('loading');
  fillClientProfileSelects();
  try {
    const clientDoc = await getDoc(doc(db, 'clients', clientEmail));
    const data = clientDoc.exists() ? clientDoc.data() : {};
    cpName.value = data.name || '';
    cpWeight.value = data.weight || '';
    cpHeight.value = data.height || '';
    cpSport.value = data.sport || '';
    cpActivity.value = data.activity || '';
    cpGoal.value = data.goal || '';
    cpDobDay.value = (data.dob && data.dob.day) || '';
    cpDobMonth.value = (data.dob && data.dob.month) || '';
    cpDobYear.value = (data.dob && data.dob.year) || '';
    cpTrainingDays.value = data.trainingDaysPref || '';
    cpSleepTime.value = data.sleepTime || '';
    cpSleepQuality.value = data.sleepQuality || '';
    cpWakeTime.value = data.wakeTime || '';
    cpMealsPerDay.value = data.mealsPerDay || '';
    cpFirstMealTime.value = data.firstMealTime || '';
    cpLastMealTime.value = data.lastMealTime || '';
    cpPickedImage = data.photo || '';
    if (data.photo) {
      cpPhotoPreview.src = data.photo;
      cpPhotoBox.classList.remove('hidden');
      cpPhotoLabel.textContent = t('image_chosen');
    } else {
      cpPhotoPreview.removeAttribute('src');
      cpPhotoBox.classList.add('hidden');
      cpPhotoLabel.textContent = t('choose_photo');
    }
    cpMessage.textContent = '';
  } catch (error) {
    cpMessage.textContent = t('problem') + error.message;
  }
}

cpPhoto.addEventListener('change', async function () {
  const file = cpPhoto.files[0];
  if (!file) return;

  if (file.size > MAX_SOURCE_BYTES) {
    cpMessage.textContent = t('image_too_big');
    cpPhoto.value = '';
    return;
  }

  cpMessage.textContent = t('preparing_image');
  try {
    cpPickedImage = await compressImage(file, IMAGE_MAX_SIDE, 0.7);
    cpPhotoPreview.src = cpPickedImage;
    cpPhotoBox.classList.remove('hidden');
    cpPhotoLabel.textContent = t('image_chosen');
    cpMessage.textContent = '';
  } catch (error) {
    cpMessage.textContent = t('image_failed');
  }
});

document.getElementById('cp-photo-remove').addEventListener('click', function () {
  cpPickedImage = '';
  cpPhoto.value = '';
  cpPhotoPreview.removeAttribute('src');
  cpPhotoBox.classList.add('hidden');
  cpPhotoLabel.textContent = t('choose_photo');
});

/* تعديل كل الإجابات — بيفتح شاشة البيانات في وضع التعديل */
async function openProfileEditor() {
  const email = clientEmail;
  if (!email) return;
  onboardingEmail = email;
  onboardingIsNewSignup = false;
  onboardingEditMode = true;

  let data = null;
  try {
    const snap = await getDoc(doc(db, 'clients', email));
    data = snap.exists() ? snap.data() : null;
  } catch (error) {
    data = null;
  }
  await loadClientHealth(email);

  showScreen(onboardingScreen);
  prefillOnboarding(data);
  applyOnboardingMode();
}

/* شكل الشاشة بيتغيّر حسب: تسجيل جديد ولا تعديل */
function applyOnboardingMode() {
  const back = document.getElementById('ob-back-btn');
  const next = document.getElementById('ob-next-btn');
  if (back) back.classList.toggle('hidden', !onboardingEditMode);
  if (next) next.textContent = onboardingEditMode ? t('save_profile_btn') : t('next_btn');
}

const cpFullEditBtn = document.getElementById('cp-full-edit-btn');
if (cpFullEditBtn) cpFullEditBtn.addEventListener('click', openProfileEditor);

const obBackBtn = document.getElementById('ob-back-btn');
if (obBackBtn) obBackBtn.addEventListener('click', function () {
  onboardingEditMode = false;
  applyOnboardingMode();
  showScreen(clientScreen);
  loadClient(clientEmail);
});

document.getElementById('cp-save-btn').addEventListener('click', async function () {
  const name = cpName.value.trim();
  const weight = Number(cpWeight.value);
  const height = Number(cpHeight.value);

  if (!name || !weight || !height) {
    cpMessage.textContent = t('need_client_profile_fields');
    return;
  }

  cpMessage.textContent = t('saving');
  try {
    const dobDay = Number(cpDobDay.value);
    const dobMonth = Number(cpDobMonth.value);
    const dobYear = Number(cpDobYear.value);
    const payload = {
      name: name,
      weight: weight,
      height: height,
      sport: cpSport.value || '',
      activity: cpActivity.value || '',
      goal: cpGoal.value || '',
      trainingDaysPref: cpTrainingDays.value || '',
      sleepTime: cpSleepTime.value || '',
      sleepQuality: cpSleepQuality.value || '',
      wakeTime: cpWakeTime.value || '',
      mealsPerDay: cpMealsPerDay.value || '',
      firstMealTime: cpFirstMealTime.value || '',
      lastMealTime: cpLastMealTime.value || '',
      photo: cpPickedImage
    };
    // نحسب السن من تاريخ الميلاد بس لو العميل فعلاً اختار يوم/شهر/سنة
    // كاملين — عشان ميحصلش تعارض بين تاريخ ميلاد ناقص وسن قديم محفوظ
    if (dobDay && dobMonth && dobYear) {
      payload.dob = { day: dobDay, month: dobMonth, year: dobYear };
      payload.age = calcAge(dobDay, dobMonth, dobYear);
    }
    await setDoc(doc(db, 'clients', clientEmail), payload, { merge: true });
    clientName = name;
    setStatusMessage(cpMessage, t('profile_saved'), 'success');
  } catch (error) {
    cpMessage.textContent = t('problem') + error.message;
  }
});

document.getElementById('open-client-profile-btn').addEventListener('click', openClientProfile);

document.getElementById('client-profile-back-btn').addEventListener('click', function () {
  showScreen(clientScreen);
});

const medLibraryScreen = document.getElementById('med-library-screen');
const medLibraryList = document.getElementById('med-library-list');
const medLibraryMessage = document.getElementById('med-library-message');
const medLibraryChips = document.getElementById('med-library-chips');
const medAuthorBox = document.getElementById('med-author-box');
const medCategoryPick = document.getElementById('med-category-pick');
const medTitle = document.getElementById('med-title');
const medBody = document.getElementById('med-body');
const medImageInput = document.getElementById('med-image-input');
const medImageLabel = document.querySelector('#med-image-label span');
const medImageBox = document.getElementById('med-image-box');
const medImagePreview = document.getElementById('med-image-preview');
const medRedFlagsList = document.getElementById('med-red-flags-list');

const bookingsScreen = document.getElementById('bookings-screen');
const bookingsList = document.getElementById('bookings-list');
const bookingsMessage = document.getElementById('bookings-message');

const obPhone = document.getElementById('ob-phone');
const obPhoneCode = document.getElementById('ob-phone-code');
const obGoal = document.getElementById('ob-goal');
const obFocusChips = document.getElementById('ob-focus-chips');
const obWorkNature = document.getElementById('ob-work-nature');
const obWorkNatureRows = document.getElementById('ob-work-nature-rows');
const obTrainingDays = document.getElementById('ob-training-days');
const obTrainingDaysRows = document.getElementById('ob-training-days-rows');
const obSleepTime = document.getElementById('ob-sleep-time');
const obWakeTime = document.getElementById('ob-wake-time');
const obSleepQuality = document.getElementById('ob-sleep-quality');
const obSleepHours = document.getElementById('ob-sleep-hours');
const obSleepHoursRows = document.getElementById('ob-sleep-hours-rows');
const obSleepBlocks = document.getElementById('ob-sleep-blocks');
const obSleepBlocksRows = document.getElementById('ob-sleep-blocks-rows');
const obSleepQualityRows = document.getElementById('ob-sleep-quality-rows');
const obMealsPerDay = document.getElementById('ob-meals-per-day');
const obMealsPerDayRows = document.getElementById('ob-meals-per-day-rows');
const obFirstMealTime = document.getElementById('ob-first-meal-time');
const obLastMealTime = document.getElementById('ob-last-meal-time');
const obPainFlag = document.getElementById('ob-pain-flag');
const obPainNote = document.getElementById('ob-pain-note');

const injuryScreen = document.getElementById('injury-screen');
const injuryPartsChips = document.getElementById('injury-parts-chips');
const injuryDesc = document.getElementById('injury-desc');
const injuryScanLabel = document.querySelector('#injury-scan-label span');
const injuryScan = document.getElementById('injury-scan');
const injuryScanBox = document.getElementById('injury-scan-box');
const injuryScanPreview = document.getElementById('injury-scan-preview');
const injuryMessage = document.getElementById('injury-message');
const injuryHistoryList = document.getElementById('injury-history-list');

let classes = [];
let currentClass = null;
let currentProviderEmail = '';
let currentProviderSpecialty = '';
// دلوقتي المتخصص ممكن يكون له أكتر من تخصص مع بعض (مثلاً مدرب + أخصائي تغذية) —
// currentProviderSpecialties هي القايمة الكاملة، وcurrentProviderSpecialty بتفضل
// "التخصص الأساسي" (أول واحد) عشان الأماكن اللي محتاجة قيمة واحدة بس (خطط الاشتراك مثلاً)
let currentProviderSpecialties = [];
let currentProviderData = null;

// بترجع قايمة تخصصات أي مستند متخصص (provider أو providerApplication) —
// بتدعم الشكل الجديد (specialties: []) وبترجع للقديم (specialty: '') لو مفيش
function providerSpecialties(data) {
  if (data && Array.isArray(data.specialties) && data.specialties.length) return data.specialties.slice();
  if (data && data.specialty) return [data.specialty];
  return [];
}

// عرض/إجراء بيحتاج "هل عند المتخصص القدرة دي؟" على أي حد من تخصصاته
function specialtiesHaveFlag(specialties, flag) {
  return specialties.some(function (key) {
    return !!(SPECIALTIES[key] && SPECIALTIES[key][flag]);
  });
}

/*
 * ============ اعتماد التخصصات ============
 * المتخصص بيختار تخصصاته بنفسه، بس التخصص مايشتغلش غير لما صاحب
 * المنصة يوافق عليه. يعني حد قال "أنا أخصائي تغذية" مايعرفش يكتب
 * برنامج غذائي لحد ما الموافقة تتم. التخصصات المعتمدة في
 * specialties، واللي مستنية في pendingSpecialties.
 */
function providerPendingSpecialties(data) {
  if (data && Array.isArray(data.pendingSpecialties)) return data.pendingSpecialties.slice();
  return [];
}

/*
 * ============ نطاق الصلاحيات ============
 * كل تخصص معتمد بيفتح أقسام معيّنة (scopes) من برنامج العميل:
 * مدرب → تمرين، أخصائي تغذية → تغذية، أخصائي تأهيل → تأهيل وتمرين...
 * صاحب المنصة والفريق الإداري بيشوفوا كل حاجة من غير أي قيد.
 */
const ALL_SCOPES = ['training', 'rehab', 'nutrition', 'consult'];

function approvedScopes() {
  if (isFullAdminAccount()) return ALL_SCOPES.slice();
  const specs = providerSpecialties(currentProviderData);
  const scopes = [];
  specs.forEach(function (key) {
    ((SPECIALTIES[key] && SPECIALTIES[key].scopes) || []).forEach(function (scope) {
      if (scopes.indexOf(scope) === -1) scopes.push(scope);
    });
  });
  return scopes;
}

/*
 * ============ فتح وقفل المكتبات ============
 * صاحب المنصة يقدر يقفل أي مكتبة على أي متخصص لحد ما يتأكد من
 * مستواه. القيمة متخزّنة على مستند المتخصص:
 *   libraryAccess: { exercises: false, food: true, ... }
 * الغياب معناه "مفتوحة" — فالمتخصصين القدام مايتأثروش بالتغيير ده.
 */
const LIBRARY_KEYS = ['exercises', 'food', 'supplements', 'rehab', 'medical'];

function libraryLabel(key) {
  return t('lib_access_' + key);
}

function libraryOpenFor(data, key) {
  const access = data && data.libraryAccess;
  if (!access) return true;
  return access[key] !== false;
}

function libraryOpen(key) {
  if (isFullAdminAccount()) return true;
  return libraryOpenFor(currentProviderData, key);
}

/* بتقفل زرار مكتبة مقفولة وتوضّح السبب بدل ما تختفي من غير تفسير */
/*
 * بتتنادى قبل فتح أي مكتبة. لو مقفولة بترجّع false وتكتب رسالة
 * للمتخصص بدل ما الشاشة تفتح فاضية أو من غير تفسير.
 */
function guardLibrary(key, messageEl) {
  if (libraryOpen(key)) return true;
  if (messageEl) messageEl.textContent = t('lib_locked_msg');
  return false;
}

function applyLibraryLock(button, key) {
  if (!button) return;
  const open = libraryOpen(key);
  button.disabled = !open;
  button.classList.toggle('locked-btn', !open);
  button.title = open ? '' : t('lib_locked_hint');
}

/*
 * lockedKeys = تخصصات مقفولة مايتشالوش (بتتبعت لصاحب المنصة عشان
 * "مدرب" يفضل مختار دايمًا فمايفقدش صلاحياته وقائمة عملائه بالغلط).
 * بتفضل ظاهرة ومعلّمة بس مش قابلة لإلغاء التحديد.
 */
function fillSpecialtyCheckboxes(container, selected, lockedKeys) {
  if (!container) return;
  const sel = selected || [];
  const locked = lockedKeys || [];
  container.innerHTML = '';
  Object.keys(SPECIALTIES).forEach(function (key) {
    const isLocked = locked.indexOf(key) !== -1;
    const label = document.createElement('label');
    label.className = 'specialty-check' + (isLocked ? ' specialty-check-locked' : '');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = key;
    input.checked = isLocked || sel.indexOf(key) !== -1;
    if (isLocked) {
      input.disabled = true;
      label.title = t('specialty_locked_hint');
    }
    label.appendChild(input);
    const iconWrap = document.createElement('span');
    iconWrap.className = 'specialty-chip-icon';
    iconWrap.innerHTML = specialtyIconSvg(key);
    label.appendChild(iconWrap);
    const span = document.createElement('span');
    span.textContent = specialtyName(key, lang);
    label.appendChild(span);
    if (isLocked) {
      const lock = document.createElement('span');
      lock.className = 'specialty-lock';
      lock.appendChild(iconSvg('lock', 'ui-icon'));
      label.appendChild(lock);
    }
    container.appendChild(label);
  });
}

function readSpecialtyCheckboxes(container) {
  if (!container) return [];
  // :checked بتشمل المقفولة كمان (disabled) وده المطلوب — التخصص
  // المقفول جزء من تخصصات الحساب فعلاً مش مجرد شكل
  return Array.prototype.slice.call(container.querySelectorAll('input[type="checkbox"]:checked')).map(function (input) {
    return input.value;
  });
}

// نص/أيقونات معروضة لمجموعة تخصصات (بدل تخصص واحد) — بيقبل سترينج واحد كمان
// عشان الأماكن اللي لسه بتبعت قيمة قديمة
function setSpecialtyLabel(el, specialtyOrList, text) {
  const list = Array.isArray(specialtyOrList) ? specialtyOrList : (specialtyOrList ? [specialtyOrList] : []);
  el.innerHTML = '';
  if (!list.length) {
    el.appendChild(document.createTextNode(text || ''));
    return;
  }
  list.forEach(function (key) {
    const icon = document.createElement('span');
    icon.className = 'inline-icon';
    icon.innerHTML = specialtyIconSvg(key);
    el.appendChild(icon);
  });
  el.appendChild(document.createTextNode(' ' + (text || '')));
}

function specialtyListName(list) {
  return (list || []).map(function (key) { return specialtyName(key, lang); }).join('\u060C ');
}

/*
 * بترسم التخصصات كخانات (chips) جنب بعض بدل سطر نص واحد.
 * كل تخصص بيطلع في خانة لوحده بأيقونته، فالمدرب اللي عنده أكتر من
 * تخصص (مدرب + أخصائي تأهيل + أخصائي تغذية) يبان واضح إنه كده.
 * extra = خانة زيادة اختيارية (زي "الفريق الإداري").
 */
function renderSpecialtyChips(target, list, extra) {
  if (!target) return;
  target.innerHTML = '';
  target.classList.add('specialty-chips');
  (list || []).forEach(function (key) {
    const chip = document.createElement('span');
    chip.className = 'specialty-chip';
    const iconSpan = document.createElement('span');
    iconSpan.className = 'specialty-chip-icon';
    iconSpan.innerHTML = specialtyIconSvg(key);
    chip.appendChild(iconSpan);
    chip.appendChild(document.createTextNode(specialtyName(key, lang)));
    target.appendChild(chip);
  });
  if (extra) {
    const chip = document.createElement('span');
    chip.className = 'specialty-chip specialty-chip-admin';
    chip.textContent = extra;
    target.appendChild(chip);
  }
}
let phPickedImage = '';
let onboardingEmail = '';
let onboardingIsNewSignup = false;
/*
 * وضع التعديل: نفس شاشة البيانات بالظبط، بس متملية ببيانات العميل
 * وبترجّعه لشاشته بدل ما تودّيه على اختيار الفريق.
 * السبب إننا مانعملش نسخة تانية من خمستاشر خانة: لو عدّلنا سؤال
 * في التسجيل هيتعدّل في التعديل لوحده، ومفيش حتة تنسى ورا التانية
 */
let onboardingEditMode = false;
let obPickedImage = '';
let selectedTeam = {};
let obFocus = [];
let selectedInjuryParts = [];
let injuryScanImage = '';
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
  [welcomeScreen, trialEndedScreen, loginScreen, signupScreen, onboardingScreen, teamScreen, injuryScreen, teamViewScreen, medLibraryScreen, bookingsScreen, clientsScreen, clearanceScreen, adherenceScreen, classesScreen, classDetailScreen, providersScreen, providerHomeScreen, coachScreen, libraryScreen, mylibScreen, foodScreen, supplementsScreen, clientScreen, clientProfileScreen, subscriptionScreen, providerSubscriptionScreen, adminPanelScreen, chatScreen, chatInboxScreen, calculatorsScreen, progressScreen,
   // بالـ id مش بمتغيّر — showScreen بتشتغل قبل ما تعريفاتهم توصل
   document.getElementById('verify-screen'), document.getElementById('notif-screen')].forEach(function (s) {
    if (s) s.classList.add('hidden');
  });
  screen.classList.remove('hidden');
  paintNotifBell(screen);
  logoutButton.classList.toggle('hidden', screen === loginScreen || screen === welcomeScreen);
  // الزرار الثابت تحت بيظهر بعد ما زرار الهيرو يعدّي بس — قبل كده
  // بيبقى تكرار لزرار ظاهر قدام عين الزائر أصلًا
  welcomeStickyCta.classList.add('hidden');
  // الشريط السفلي بتاع العميل بيبان على شاشته بس.
  // بندوّر عليه هنا مش بمتغيّر فوق، لأن showScreen بتشتغل قبل ما
  // تعريفات عناصر شاشة العميل توصل لدورها في التحميل
  const appbarEl = document.getElementById('client-appbar');
  if (appbarEl) appbarEl.classList.toggle('hidden', screen !== clientScreen);
  document.body.classList.toggle('on-client', screen === clientScreen);
  document.body.classList.toggle('on-welcome', screen === welcomeScreen);
  if (screen === welcomeScreen) updateStickyCta();
  // نقفل الاشتراك اللحظي أول ما نسيب شاشة الكلاس عشان الاستهلاك
  if (screen !== classDetailScreen && typeof stopLive === 'function') stopLive();
  // ونقفل اشتراك الشات اللحظي أول ما نسيب شاشة الشات عشان الاستهلاك
  if (screen !== chatScreen && typeof stopChatListener === 'function') stopChatListener();
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

  /*
   * أكتر من حصة في اليوم (جيم الصبح + سباحة بالليل):
   * الحصة الأولى هي اليوم نفسه (title/sections) عشان البرامج القديمة
   * تفضل شغالة زي ما هي، والحصص الزيادة في extraSessions
   */
  if (day && day.time) clean.time = String(day.time);
  if (day && day.sport) clean.sport = String(day.sport);
  if (day && Array.isArray(day.extraSessions) && day.extraSessions.length) {
    clean.extraSessions = day.extraSessions.slice(0, MAX_DAY_SESSIONS - 1).map(normalizeSession);
  }

  return clean;
}

const MAX_DAY_SESSIONS = 3;

function normalizeSession(session) {
  const clean = {
    title: (session && session.title) || '',
    time: (session && session.time) || '',
    sport: (session && session.sport) || '',
    sections: blankSections()
  };
  if (session && session.sections) {
    SECTION_KEYS.forEach(function (key) {
      if (Array.isArray(session.sections[key])) clean.sections[key] = session.sections[key];
    });
  }
  return clean;
}

/*
 * كل حصص اليوم كقايمة، كل واحدة شكلها زي يوم عادي { title, sections, time, sport }.
 * الحصة الأولى نسخة خفيفة من اليوم (نفس مصفوفات التمارين) من غير extraSessions،
 * عشان dayCount وأخواتها لما تتنادى على حصة واحدة تعدّ الحصة دي بس
 */
function daySessions(day) {
  if (!day) return [];
  const first = { title: day.title || '', rest: !!day.rest, sections: day.sections || {}, time: day.time || '', sport: day.sport || '' };
  return [first].concat(Array.isArray(day.extraSessions) ? day.extraSessions : []);
}

function hasManySessions(day) {
  return !!(day && Array.isArray(day.extraSessions) && day.extraSessions.length);
}

/* مفتاح تمرين في الحصة: الحصة الأولى زي زمان "main:0"، والباقي "s2|main:0" */
function sessionKeyPrefix(index) {
  return index > 0 ? ('s' + (index + 1) + '|') : '';
}

/* اسم الحصة اللي بيظهر: العنوان، ولو فاضي نوعها، ولو فاضي "الحصة ٢" */
function sessionLabel(session, index) {
  return (session && (tr(session.title) || (session.sport ? sportName(session.sport) : ''))) || fill('session_n', { n: index + 1 });
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
    total += (day.sections[key] || []).length;
  });
  (day.extraSessions || []).forEach(function (session) { total += dayCount(session); });
  return total;
}

function dayHasPlan(day) {
  return day.rest || dayCount(day) > 0;
}

function emptyRehab() {
  return { bodyPart: '', injury: '', about: '', currentPhase: 0, modalities: [], phases: [] };
}

function normalizeRehab(data) {
  const clean = emptyRehab();
  if (!data) return clean;

  clean.bodyPart = data.bodyPart || '';
  clean.injury = data.injury || '';
  clean.about = data.about || '';
  clean.currentPhase = Number(data.currentPhase) || 0;
  /* جلسات الأجهزة المضافة للعميل — جنب مراحل التأهيل في نفس المستند */
  clean.modalities = Array.isArray(data.modalities) ? data.modalities : [];

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

/*
 * التجربة المجانية (30 يوم) — بتتفعّل بس للعميل اللي بيعمل حساب
 * لوحده من صفحة التعريف (مفيش كوتش ضايفه قبل كده)، أما العميل اللي
 * الكوتش ضايفه بنفسه فده اتفاق مباشر بينهم ومش خاضع للتجربة.
 */
const TRIAL_DAYS = 30;

function trialDaysLeft(clientData) {
  if (!clientData || !clientData.trialStartedAt) return null;
  const start = new Date(clientData.trialStartedAt);
  if (isNaN(start.getTime())) return null;
  const passed = Math.floor((Date.now() - start.getTime()) / 86400000);
  return TRIAL_DAYS - passed;
}

function isTrialExpired(clientData) {
  const left = trialDaysLeft(clientData);
  return left !== null && left <= 0;
}

function renderTrialBanner(clientData) {
  const left = trialDaysLeft(clientData);
  if (left === null || left <= 0) {
    trialBanner.classList.add('hidden');
    trialBanner.textContent = '';
    return;
  }
  trialBanner.textContent = fill('trial_banner_text', { n: left });
  trialBanner.classList.remove('hidden');
}

showScreen(welcomeScreen);

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
  // لو كان بيعدّل بروفايله وخرج، الوضع ما يفضلش متعلّق لحد بعده
  onboardingEditMode = false;
  stopNotifListener();
  signOut(auth);
});

onAuthStateChanged(auth, routeUser);

async function routeUser(user) {
  if (!user) {
    currentProviderEmail = '';
    currentProviderSpecialty = '';
    currentProviderSpecialties = [];
    currentProviderData = null;
    stopNotifListener();
    showScreen(welcomeScreen);
    return;
  }

  const email = user.email.toLowerCase();
  startNotifListener(email);

  let providerDoc = null;
  try {
    providerDoc = await getDoc(doc(db, 'providers', email));
  } catch (error) {
    providerDoc = null;
  }

  const providerData = (providerDoc && providerDoc.exists()) ? providerDoc.data() : null;
  // حساب المدرب القديم قبل نظام المتخصصين — لسه شغال لو مش متسجل في providers
  const isLegacyCoach = !providerData && (email === COACH_EMAIL.toLowerCase());

  // الكوتش الأساسي (صاحب المنصة) منيع من الإيقاف عشان محدش يقفل حسابه بالغلط
  if (!isLegacyCoach && providerData && providerData.accessOverride && providerData.accessOverride.blocked) {
    showAccessLocked('provider');
    return;
  }

  const loginSpecs = providerData ? providerSpecialties(providerData) : [];

  if (isLegacyCoach || loginSpecs.indexOf('coach') !== -1) {
    currentProviderEmail = email;
    currentProviderSpecialty = 'coach';
    currentProviderSpecialties = isLegacyCoach ? ['coach'] : loginSpecs;
    currentProviderData = providerData;
    showScreen(clientsScreen);
    loadClients();
    // مهم: منستدعيش touchProviderActivity هنا لو الكوتش ده "قديم"
    // (isLegacyCoach) ومفيش مستند providers ليه أصلاً — لأنها بتعمل
    // setDoc({merge:true}) وهتنشئ مستند providers/{الإيميل} بحقل
    // lastActiveAt بس من غير specialty، وده هيبوّظ isLegacyCoach في
    // أول تسجيل دخول جاي (لأنها بتتحسب من !providerData) ويحوّل صاحب
    // المنصة لمتخصص من غير تخصص. لو المستند موجود فعلاً (كوتش تاني
    // مُضاف بتخصص coach) فالتحديث آمن عادي
    if (providerData) touchProviderActivity(email);
  } else if (providerData) {
    currentProviderEmail = email;
    currentProviderSpecialties = loginSpecs;
    currentProviderSpecialty = loginSpecs[0] || '';
    currentProviderData = providerData;
    showScreen(clientsScreen);
    loadClients();
    touchProviderActivity(email);
  } else {
    let clientDoc = null;
    try {
      clientDoc = await getDoc(doc(db, 'clients', email));
    } catch (error) {
      clientDoc = null;
    }

    const clientData = (clientDoc && clientDoc.exists()) ? clientDoc.data() : null;

    /*
     * تأكيد الإيميل: الحسابات الجديدة بس. العملاء القدام اللي كملوا
     * بياناتهم قبل كده مش هيتقفلوا — مفيش حد هيصحى يلاقي نفسه برّه
     */
    if (needsEmailVerify(user, clientData)) {
      showVerifyScreen(user);
      return;
    }

    if (!clientData || !clientData.onboarded) {
      onboardingEmail = email;
      // مفيش مستند عميل خالص لسه = حساب اتعمل لوحده من صفحة التعريف، مش كوتش ضايفه
      onboardingIsNewSignup = !clientData;
      onboardingEditMode = false;
      await loadClientHealth(email);
      showScreen(onboardingScreen);
      prefillOnboarding(clientData);
    } else if (isAccessBlocked(clientData)) {
      showAccessLocked('blocked', email);
    } else if (clientData.trialStartedAt && isTrialExpired(clientData) && !accessOverrideActive(clientData)) {
      showAccessLocked('trial', email);
    } else {
      showScreen(clientScreen);
      renderTrialBanner(clientData);
      loadClient(email);
    }
  }
  refreshPushSilently();
}

/* ============================ العملاء ============================ */

const clientsList = document.getElementById('clients-list');
const clientsMessage = document.getElementById('clients-message');
const clientsAdminBox = document.getElementById('clients-admin-box');
const clientsSearch = document.getElementById('clients-search');
const openMyProfileBtn = document.getElementById('open-my-profile-btn');
const openBookingsBtn = document.getElementById('open-bookings-btn');
const openAdminPanelBtn = document.getElementById('open-admin-panel-btn');

/*
 * بحث سريع جوه قائمة عملائك — بيفلتر السطور المعروضة بالاسم أو الإيميل
 * وانت بتكتب، من غير ما يجيب من الداتابيز تاني. (ده غير خانة البحث اللي
 * في لوحة التحكم تحت "إدارة الوصول" — دي بتاعة إيقاف/تمديد وصول أي حد،
 * مش عشان تفتح برنامج عميل)
 */
let clientsSearchMsgShown = false;

function applyClientsFilter() {
  if (!clientsSearch) return;
  const query = clientsSearch.value.trim().toLowerCase();
  let visible = 0;

  Array.prototype.forEach.call(clientsList.children, function (item) {
    const nameEl = item.querySelector('.client-name');
    const name = (nameEl ? nameEl.textContent : '').toLowerCase();
    // الإيميل مبقاش معروض في المربع، فبنقراه من الخاصية
    const email = (item.getAttribute('data-email') || '').toLowerCase();
    const match = !query || name.indexOf(query) !== -1 || email.indexOf(query) !== -1;
    item.classList.toggle('hidden', !match);
    if (match) visible++;
  });

  if (query && !visible && clientsList.children.length) {
    clientsMessage.textContent = t('no_client_search_results');
    clientsSearchMsgShown = true;
  } else if (clientsSearchMsgShown) {
    clientsMessage.textContent = '';
    clientsSearchMsgShown = false;
  }
}

if (clientsSearch) {
  clientsSearch.addEventListener('input', applyClientsFilter);
}

function isFullCoachRole() {
  return currentProviderSpecialties.indexOf('coach') !== -1;
}

function providerTakesBookings() {
  return specialtiesHaveFlag(currentProviderSpecialties, 'books');
}

async function loadClients() {
  const fullAccess = isFullCoachRole() || isFullAdminAccount();
  clientsAdminBox.classList.toggle('hidden', !fullAccess);
  // كل حساب (مدرب/صاحب منصة/فريق إداري) لازم يقدر يفتح ويعدّل بروفايله
  // الشخصي (صورة، نبذة، شهادات) — مبقاش في داعي نخفي الزرار ده عن حد
  openMyProfileBtn.classList.remove('hidden');
  openBookingsBtn.classList.toggle('hidden', !providerTakesBookings());
  /* زرار الإذن الطبي بيبان للأطباء ولصاحب المنصة بس */
  const clearanceBtn = document.getElementById('open-clearance-btn');
  clearanceBtn.classList.toggle('hidden', !canClearMedical());
  if (canClearMedical()) loadClearanceRequests().catch(function () {});
  openAdminPanelBtn.classList.toggle('hidden', !isFullAdminAccount());
  openProviderSubscriptionBtn.classList.toggle('hidden', isFullAdminAccount());
  refreshProviderSubBanner();
  if (isFullAdminAccount()) { refreshLeadsBadge(); refreshPendingSpecsBadge(); }

  renderCoachTiles();

  clientsList.innerHTML = '';
  clientsMessage.textContent = t('loading');
  try {
    const snapshot = await getDocs(collection(db, 'clients'));
    /*
     * المدرب يشوف عملاءه، المتخصص يشوف اللي اختاروه في فريقهم،
     * والفريق الإداري يشوف الكل — نفس المنطق المستخدم في لوحة الالتزام
     */
    const mine = filterMyClients(snapshot.docs);

    // خانة البحث مالهاش لازمة لو مفيش عملاء أصلاً
    if (clientsSearch) clientsSearch.classList.toggle('hidden', !mine.length);

    if (!mine.length) {
      clientsMessage.textContent = t('no_clients');
      return;
    }

    /*
     * بلاغات الإصابة كانت بتتعرض جوه شاشة العميل بس، يعني المدرب مكانش
     * يعرف إن في عميل بلّغ غير لما يفتحه هو بنفسه. بنجيب البلاغات اللي
     * لسه محدش راجعها مرة واحدة هنا، ونحط علامة واضحة على سطر العميل
     * في القائمة عشان تبان من غير ما يدوّر.
     */
    let injuryCounts = {};
    try {
      const reportsSnap = await getDocs(collection(db, 'injuryReports'));
      reportsSnap.forEach(function (docSnap) {
        const data = docSnap.data();
        if ((data.status || 'requested') !== 'requested') return;
        if (!data.clientEmail) return;
        injuryCounts[data.clientEmail] = (injuryCounts[data.clientEmail] || 0) + 1;
      });
    } catch (error) {
      injuryCounts = {};
    }

    clientsMessage.textContent = '';
    for (const clientDoc of mine) {
      await showClientRow(
        clientDoc.id,
        clientDoc.data().name,
        clientDoc.data().sport || '',
        injuryCounts[clientDoc.id] || 0
      );
    }
    // لو كان في بحث مكتوب قبل ما القائمة تتحدّث، نطبّقه على السطور الجديدة
    applyClientsFilter();
  } catch (error) {
    clientsMessage.textContent = t('problem') + error.message;
  }
}

/* ============================================================
   لوحة الالتزام — قايمة صباح المدرب
   ده اللي تطبيقات التتبّع الشخصي مستحيل تعمله: عندها العميل لوحده
   مع أرقامه. هنا في مدرب، فالبيانات المفروض توصله هو، مرتّبة
   بالأولوية: مين واقف، مين فاتر، ومين ماشي.
   ============================================================ */

/* بنفصل منطق "مين عملائي" عشان القايمة واللوحة يستخدموه الاتنين */
function filterMyClients(docs) {
  if (isFullAdminAccount()) return docs;
  if (isFullCoachRole()) {
    return docs.filter(function (clientDoc) {
      const ownerEmail = clientDoc.data().coachEmail || COACH_EMAIL.toLowerCase();
      return ownerEmail === currentProviderEmail;
    });
  }
  return docs.filter(function (clientDoc) {
    const team = clientDoc.data().team || {};
    return Object.keys(team).some(function (key) { return team[key] === currentProviderEmail; });
  });
}

const ADH_DAYS = 7;
const ADH_SILENT_DAYS = 3;   /* ساكت أكتر من كده = محتاج تكلّمه */
let adhRows = [];
let adhFilter = 'attention';

/* تواريخ آخر ٧ أيام (النهاردة آخرهم) */
function lastDates(count) {
  const out = [];
  const base = new Date();
  base.setHours(12, 0, 0, 0);
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(base.getDate() - i);
    out.push(dateStamp(d));
  }
  return out;
}

function daysAgo(stamp) {
  if (!stamp) return null;
  const parts = String(stamp).split('-');
  if (parts.length !== 3) return null;
  const then = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), 12, 0, 0, 0);
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  return Math.round((now - then) / 86400000);
}

/*
 * حساب التزام عميل واحد على آخر ٧ أيام.
 * بنعتمد على اللي العميل سجّله فعلًا — مش على اللي المدرب كتبه —
 * عشان الرقم يبقى واقع مش نية
 */
function adherenceFor(progressData, logData, dates) {
  const history = (progressData && Array.isArray(progressData.history)) ? progressData.history : [];
  const days = (logData && logData.days) ? logData.days : {};

  let trained = 0;
  let logged = 0;
  let waterSum = 0;
  let waterDays = 0;
  let last = null;

  dates.forEach(function (stamp) {
    const didTrain = history.indexOf(stamp) !== -1;
    const entry = days[stamp];
    const didLog = !!(entry && ((entry.eaten && entry.eaten.length) || (entry.extra && entry.extra.length)));

    if (didTrain) trained += 1;
    if (didLog) logged += 1;
    if (entry && Number(entry.water) > 0) { waterSum += Number(entry.water); waterDays += 1; }
    if (didTrain || didLog || (entry && Number(entry.water) > 0)) last = stamp;
  });

  const silence = last ? daysAgo(last) : null;
  const score = Math.round(((trained + logged) / (dates.length * 2)) * 100);

  let state = 'active';
  if (silence === null || silence > ADH_SILENT_DAYS) state = 'silent';
  else if (score < 50) state = 'slipping';

  return {
    trained: trained,
    logged: logged,
    water: waterDays ? Math.round(waterSum / waterDays) : 0,
    lastStamp: last,
    silence: silence,
    score: score,
    state: state
  };
}

const ADH_STATE_ORDER = { silent: 0, slipping: 1, active: 2 };

async function loadAdherence() {
  const listBox = document.getElementById('adh-list');
  const message = document.getElementById('adherence-message');
  listBox.innerHTML = '';
  document.getElementById('adh-summary').innerHTML = '';
  document.getElementById('adh-filters').innerHTML = '';
  message.textContent = t('loading');

  try {
    const snapshot = await getDocs(collection(db, 'clients'));
    const mine = filterMyClients(snapshot.docs);

    if (!mine.length) {
      message.textContent = t('no_clients');
      return;
    }

    /* البلاغات والاستشارات اللي لسه مستنية رد — بنجيبهم مرة واحدة */
    const waiting = {};
    try {
      const reports = await getDocs(collection(db, 'injuryReports'));
      reports.forEach(function (docSnap) {
        const data = docSnap.data();
        if ((data.status || 'requested') !== 'requested') return;
        if (!data.clientEmail) return;
        waiting[data.clientEmail] = (waiting[data.clientEmail] || 0) + 1;
      });
    } catch (error) { /* مش مشكلة */ }
    try {
      const consults = await getDocs(collection(db, 'consultRequests'));
      consults.forEach(function (docSnap) {
        const data = docSnap.data();
        if ((data.status || 'pending') === 'answered') return;
        if (!data.clientEmail) return;
        waiting[data.clientEmail] = (waiting[data.clientEmail] || 0) + 1;
      });
    } catch (error) { /* مش مشكلة */ }

    const dates = lastDates(ADH_DAYS);
    const rows = [];

    for (const clientDoc of mine) {
      const email = clientDoc.id;
      let progressData = null;
      let logData = null;
      try { const d = await getDoc(doc(db, 'progress', email)); progressData = d.exists() ? d.data() : null; } catch (e) { progressData = null; }
      try { const d = await getDoc(doc(db, 'foodlog', email)); logData = d.exists() ? d.data() : null; } catch (e) { logData = null; }

      const stats = adherenceFor(progressData, logData, dates);
      /* الحالات الخاصة بتتعلّم في القايمة — المدرب بيتعامل معاها بشكل مختلف */
      const health = await loadHealthFor(email);
      rows.push({
        email: email,
        name: clientDoc.data().name || email,
        sport: clientDoc.data().sport || '',
        waiting: waiting[email] || 0,
        health: health,
        stats: stats
      });
    }

    /* الترتيب: اللي محتاج انتباه الأول، والأطول سكوت قبل غيره */
    rows.sort(function (a, b) {
      const order = ADH_STATE_ORDER[a.stats.state] - ADH_STATE_ORDER[b.stats.state];
      if (order !== 0) return order;
      if (b.waiting !== a.waiting) return b.waiting - a.waiting;
      const sa = a.stats.silence === null ? 999 : a.stats.silence;
      const sb = b.stats.silence === null ? 999 : b.stats.silence;
      if (sb !== sa) return sb - sa;
      return a.stats.score - b.stats.score;
    });

    adhRows = rows;
    message.textContent = '';
    renderAdherence();
    refreshAdherenceBadge();
  } catch (error) {
    message.textContent = t('problem') + error.message;
  }
}

function adhNeedsAttention(row) {
  return row.stats.state !== 'active' || row.waiting > 0;
}

const ADH_FILTERS = ['attention', 'all', 'active'];

function renderAdherence() {
  const summary = document.getElementById('adh-summary');
  const filters = document.getElementById('adh-filters');
  const listBox = document.getElementById('adh-list');

  const total = adhRows.length;
  const attention = adhRows.filter(adhNeedsAttention).length;
  /*
   * "ماشي تمام" = التزامه كويس. ممكن يكون كمان مستني رد، فيظهر في
   * القايمتين — وده صح: هو ماشي، وفي نفس الوقت عليه حاجة منك
   */
  const onTrack = adhRows.filter(function (row) { return row.stats.state === 'active'; }).length;

  summary.innerHTML = '';
  [
    { value: total, label: t('adh_total'), tone: '' },
    { value: attention, label: t('adh_attention'), tone: attention ? 'warn' : 'good' },
    { value: onTrack, label: t('adh_ok'), tone: 'good' }
  ].forEach(function (cell) {
    const box = document.createElement('div');
    box.className = 'adh-stat' + (cell.tone ? ' ' + cell.tone : '');
    const value = document.createElement('strong');
    value.textContent = cell.value;
    box.appendChild(value);
    const label = document.createElement('span');
    label.textContent = cell.label;
    box.appendChild(label);
    summary.appendChild(box);
  });

  filters.innerHTML = '';
  ADH_FILTERS.forEach(function (key) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'adh-chip' + (key === adhFilter ? ' active' : '');
    chip.textContent = t('adh_filter_' + key);
    chip.addEventListener('click', function () {
      adhFilter = key;
      renderAdherence();
    });
    filters.appendChild(chip);
  });

  const shown = adhRows.filter(function (row) {
    if (adhFilter === 'all') return true;
    if (adhFilter === 'attention') return adhNeedsAttention(row);
    return row.stats.state === 'active';
  });

  listBox.innerHTML = '';
  if (!shown.length) {
    const empty = document.createElement('li');
    empty.className = 'adh-empty';
    empty.textContent = adhFilter === 'attention' ? t('adh_none_attention') : t('adh_none');
    listBox.appendChild(empty);
    return;
  }

  shown.forEach(function (row) {
    listBox.appendChild(adherenceCard(row));
  });
}

function adhBarRow(label, value, max, tone) {
  const box = document.createElement('div');
  box.className = 'adh-metric' + (tone ? ' ' + tone : '');

  const head = document.createElement('div');
  head.className = 'adh-metric-head';
  const name = document.createElement('span');
  name.textContent = label;
  head.appendChild(name);
  const num = document.createElement('strong');
  num.textContent = max ? (value + ' / ' + max) : String(value);
  head.appendChild(num);
  box.appendChild(head);

  const bar = document.createElement('div');
  bar.className = 'adh-bar';
  const fillBar = document.createElement('span');
  fillBar.style.width = Math.min(100, max ? (value / max) * 100 : 0) + '%';
  bar.appendChild(fillBar);
  box.appendChild(bar);

  return box;
}

function adherenceCard(row) {
  const item = document.createElement('li');
  item.className = 'adh-card state-' + row.stats.state;

  const head = document.createElement('div');
  head.className = 'adh-head';

  const name = document.createElement('div');
  name.className = 'adh-name';
  name.textContent = row.name;
  head.appendChild(name);

  const pill = document.createElement('span');
  pill.className = 'adh-pill ' + row.stats.state;
  pill.textContent = t('adh_state_' + row.stats.state);
  head.appendChild(pill);
  item.appendChild(head);

  const healthItems = activeHealthItems(row.health);
  if (healthItems.length) {
    const flag = document.createElement('div');
    flag.className = 'adh-health';
    if (needsClearance(row.health) && !clearanceOk(row.health)) flag.classList.add('blocked');
    flag.innerHTML = '';
    healthItems.forEach(function (h, i) {
      if (i) flag.appendChild(document.createTextNode(' · '));
      flag.appendChild(healthIconEl(h));
      flag.appendChild(document.createTextNode(' ' + healthName(h)));
    });
    item.appendChild(flag);
  }

  const sub = document.createElement('div');
  sub.className = 'adh-sub';
  if (row.stats.silence === null) {
    sub.textContent = t('adh_never');
  } else if (row.stats.silence === 0) {
    sub.textContent = t('adh_today');
  } else {
    sub.textContent = fill('adh_since', { n: row.stats.silence });
  }
  item.appendChild(sub);

  if (row.waiting) {
    const flag = document.createElement('div');
    flag.className = 'adh-waiting';
    flag.textContent = row.waiting > 1
      ? fill('adh_waiting_many', { n: row.waiting })
      : t('adh_waiting');
    item.appendChild(flag);
  }

  const metrics = document.createElement('div');
  metrics.className = 'adh-metrics';
  metrics.appendChild(adhBarRow(t('adh_trained'), row.stats.trained, ADH_DAYS, 'train'));
  metrics.appendChild(adhBarRow(t('adh_logged'), row.stats.logged, ADH_DAYS, 'food'));
  metrics.appendChild(adhBarRow(t('adh_water'), row.stats.water, 8, 'water'));
  item.appendChild(metrics);

  const open = document.createElement('button');
  open.type = 'button';
  open.className = 'adh-open';
  open.textContent = t('adh_open');
  open.addEventListener('click', function () {
    openCoachScreen(row.email, row.name, row.sport);
  });
  item.appendChild(open);

  return item;
}

/* العدّاد على الزرار بيتملي بعد أول فتح — مش بنقرا كل العملاء قبل ما يطلبها */
function refreshAdherenceBadge() {
  const badge = document.getElementById('adherence-badge');
  if (!badge) return;
  const n = adhRows.filter(adhNeedsAttention).length;
  badge.textContent = n;
  badge.classList.toggle('hidden', !n);
  renderCoachTiles();
}

document.getElementById('open-adherence-btn').addEventListener('click', function () {
  showScreen(adherenceScreen);
  loadAdherence();
});

document.getElementById('adherence-back-btn').addEventListener('click', function () {
  showScreen(clientsScreen);
});


/* ============================================================
   شاشة المدرب كمربعات
   كانت سبع زراير تحت بعض بتاخد نص الشاشة قبل ما يشوف عميل واحد.
   دلوقتي مربعات على تلات أعمدة، وكل مربع بيقرا حالته من الزرار
   الأصلي المخفي (ظاهر ولا لأ، وعليه عدّاد ولا لأ) — فمفيش منطق
   صلاحيات مكرر، ولو اتغيّر في مكان واحد المربعات بتمشي وراه
   ============================================================ */


/* ============================================================
   لوحة التحكم: قسم واحد في الشاشة بدل ١٣ فوق بعض
   كانت صفحة واحدة طولها متر — التقرير والأسعار والمتجر والقصص
   والرسايل وكل حاجة تحت بعض. دلوقتي مربعات فوق، وكل مربع بيفتح
   قسمه لوحده. نفس المحتوى، بس الشاشة بتقول حاجة واحدة في المرة
   ============================================================ */

const ADMIN_SECTION_ICONS = {
  daily_report_title:        'progress',
  payment_settings_title:    'card',
  welcome_mail_title:        'mail',
  public_stats_title:        'chart',
  admin_plans_title:         'price',
  admin_provider_plans_title:'price',
  admin_payments_title:      'card',
  store_admin_title:         'store',
  store_orders_title:        'box',
  stories_admin_title:       'star',
  admin_leads_title:         'chat',
  admin_provider_apps_title: 'clients',
  admin_access_title:        'lock'
};

let adminSection = 'daily_report_title';

function adminSections() {
  return Array.prototype.slice.call(document.querySelectorAll('#admin-panel-screen .adm-section'));
}

function showAdminSection(key) {
  adminSection = key;
  adminSections().forEach(function (box) {
    box.classList.toggle('hidden', box.getAttribute('data-sec') !== key);
  });
  paintAdminTabs();
}

function paintAdminTabs() {
  const box = document.getElementById('admin-tabs');
  if (!box) return;
  box.querySelectorAll('.home-tile').forEach(function (tile) {
    tile.classList.toggle('on', tile.getAttribute('data-key') === adminSection);
  });
}

function renderAdminTabs() {
  const box = document.getElementById('admin-tabs');
  if (!box) return;
  box.innerHTML = '';
  adminSections().forEach(function (section) {
    const key = section.getAttribute('data-sec');
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'home-tile';
    cell.setAttribute('data-key', key);
    cell.appendChild(iconSvg(ADMIN_SECTION_ICONS[key] || 'gear', 'home-tile-icon'));
    const label = document.createElement('span');
    label.className = 'home-tile-label';
    // العنوان جوه القسم فيه إيموچي أحيانًا — بناخد الترجمة نضيفة
    label.textContent = adminTabLabel(key);
    cell.appendChild(label);

    // عدّاد الرسايل الجديدة بيتنقل على مربعه
    if (key === 'admin_leads_title') {
      const src = document.getElementById('admin-leads-badge');
      if (src && !src.classList.contains('hidden') && src.textContent.trim()) {
        const dot = document.createElement('span');
        dot.className = 'home-tile-badge';
        dot.textContent = src.textContent.trim();
        cell.appendChild(dot);
      }
    }

    cell.addEventListener('click', function () { showAdminSection(key); });
    box.appendChild(cell);
  });
  showAdminSection(adminSection);
}

/* أسماء قصيرة للمربعات — العناوين الأصلية طويلة على مربع */
const ADMIN_TAB_SHORT = {
  daily_report_title:        'adm_tab_report',
  payment_settings_title:    'adm_tab_payment',
  welcome_mail_title:        'adm_tab_welcome',
  public_stats_title:        'adm_tab_stats',
  admin_plans_title:         'adm_tab_plans',
  admin_provider_plans_title:'adm_tab_provider_plans',
  admin_payments_title:      'adm_tab_payments',
  store_admin_title:         'adm_tab_store',
  store_orders_title:        'adm_tab_orders',
  stories_admin_title:       'adm_tab_stories',
  admin_leads_title:         'adm_tab_leads',
  admin_provider_apps_title: 'adm_tab_apps',
  admin_access_title:        'adm_tab_access'
};

function adminTabLabel(key) {
  return t(ADMIN_TAB_SHORT[key] || key);
}

const COACH_TILES = [
  { key: 'clients',   icon: 'clients',   labelKey: 'tile_clients',   scroll: 'clients-list' },
  { key: 'adherence', icon: 'progress',  labelKey: 'open_adherence_btn',        btn: 'open-adherence-btn',  badge: 'adherence-badge' },
  { key: 'chats',     icon: 'chat',      labelKey: 'open_chat_inbox_btn',       btn: 'open-chat-inbox-btn' },
  { key: 'clearance', icon: 'shield',    labelKey: 'open_clearance_btn',        btn: 'open-clearance-btn',  badge: 'clearance-badge' },
  { key: 'bookings',  icon: 'classes',   labelKey: 'open_bookings_btn',         btn: 'open-bookings-btn' },
  { key: 'myprofile', icon: 'profile',   labelKey: 'open_my_profile_btn',       btn: 'open-my-profile-btn' },
  { key: 'mysub',     icon: 'card',      labelKey: 'open_provider_subscription_btn', btn: 'open-provider-subscription-btn' },
  { key: 'admin',     icon: 'gear',      labelKey: 'open_admin_btn',            btn: 'open-admin-panel-btn', badge: 'admin-leads-badge' }
];

function renderCoachTiles() {
  const box = document.getElementById('coach-tiles');
  if (!box) return;
  box.innerHTML = '';
  COACH_TILES.forEach(function (tile) {
    const origin = tile.btn ? document.getElementById(tile.btn) : null;
    // الزرار المخفي لحساب ده = مفيش مربع ليه
    if (tile.btn && (!origin || origin.classList.contains('hidden'))) return;

    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'home-tile';
    cell.setAttribute('data-key', tile.key);
    cell.appendChild(iconSvg(tile.icon, 'home-tile-icon'));
    const label = document.createElement('span');
    label.className = 'home-tile-label';
    label.textContent = t(tile.labelKey);
    cell.appendChild(label);

    if (tile.badge) {
      const src = document.getElementById(tile.badge);
      if (src && !src.classList.contains('hidden') && src.textContent.trim()) {
        const dot = document.createElement('span');
        dot.className = 'home-tile-badge';
        dot.textContent = src.textContent.trim();
        cell.appendChild(dot);
      }
    }

    cell.addEventListener('click', function () {
      if (origin) { origin.click(); return; }
      const target = document.getElementById(tile.scroll);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    box.appendChild(cell);
  });
}

async function showClientRow(email, name, sport, injuryCount) {
  /*
   * كانت سطور طويلة تحت بعض، والمدرب بينزل كتير عشان يلاقي عميل.
   * بقت مربعات: الحروف الأولى في دايرة، الاسم، رياضته، وحالة
   * النهاردة كنقطة ملوّنة. الإيميل اتشال من الوش (بيبان في التلميح
   * عند اللمس المطوّل) لأن المدرب بيدوّر بالاسم مش بالإيميل
   */
  const item = document.createElement('li');
  item.className = 'client-cell';
  item.title = email;
  // البحث بيدوّر في النص ده، فبنسيب الإيميل متاح له من غير ما يتعرض
  item.setAttribute('data-email', email);

  const avatar = document.createElement('span');
  avatar.className = 'cc-avatar';
  avatar.style.setProperty('--cc', providerTint(email));
  avatar.textContent = providerInitials(name || email);
  item.appendChild(avatar);

  const nameLine = document.createElement('div');
  nameLine.className = 'client-name';
  nameLine.textContent = name || email;
  item.appendChild(nameLine);

  if (sport) {
    const tag = document.createElement('div');
    tag.className = 'sport-tag sport-tag-icon cc-sport';
    setSportTag(tag, sport);
    item.appendChild(tag);
  }

  const status = document.createElement('div');
  status.className = 'client-status none';
  // نص قصير — المربع ضيق والجملة الطويلة كانت بتتلف على سطرين
  status.textContent = t('cc_idle');
  item.appendChild(status);

  if (injuryCount) {
    const flag = document.createElement('span');
    flag.className = 'cc-injury';
    flag.textContent = injuryCount > 1 ? String(injuryCount) : '!';
    flag.title = injuryCount > 1
      ? fill('client_injury_flag_many', { n: injuryCount })
      : t('client_injury_flag');
    item.appendChild(flag);
  }

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
      sport: document.getElementById('new-sport').value || '',
      coachEmail: currentProviderEmail
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
const lightboxAnatomy = document.getElementById('lightbox-anatomy');

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
  lightboxTitle.textContent = exerciseDisplayName(exercise) || t('exercise_image');
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

  lightboxAnatomy.innerHTML = '';
  if (exerciseHasAnatomyDetail(exercise)) {
    lightboxAnatomy.classList.remove('hidden');
    const rows = [
      ['anatomy_howto', exercise.howTo],
      ['exs_cues', exercise.cues],
      ['anatomy_goal', exercise.goal],
      ['anatomy_primary', exercise.primaryMuscles],
      ['anatomy_secondary', exercise.secondaryMuscles],
      ['anatomy_origin', exercise.origin],
      ['anatomy_insertion', exercise.insertion],
      ['anatomy_injury_benefit', exercise.injuryBenefit]
    ];
    rows.forEach(function (row) {
      const key = row[0];
      const value = exerciseText(exercise, row[0], row[1]);
      if (!value) return;
      const line = document.createElement('p');
      line.className = 'lightbox-anatomy-row';
      const label = document.createElement('strong');
      label.textContent = t(key) + ': ';
      line.appendChild(label);
      line.appendChild(document.createTextNode(value));
      lightboxAnatomy.appendChild(line);
    });
  } else {
    lightboxAnatomy.classList.add('hidden');
  }

  lightbox.classList.remove('hidden');
}

function thumbSrc(exercise) {
  if (!exercise) return '';
  if (exercise.imageUrl) return exercise.imageUrl;
  if (exercise.image) return IMAGE_BASE + exercise.image;

  /*
   * برامج قديمة (أو قوالب اتطبّقت قبل ما نخزّن الصورة) بتيجي باسم التمرين
   * ومعرّفه بس. بندوّر على صورته في المكتبة بالمعرّف الأول، وبعدين بالاسم
   * الإنجليزي — عشان العميل يشوف صورة الحركة زي ما المدرب بيشوفها
   */
  const entry = exercise.libId ? libraryEntryById(exercise.libId) : null;
  if (entry && entry.images && entry.images.length) return IMAGE_BASE + entry.images[0];

  const enName = (entry && entry.name && entry.name.en) ? entry.name.en : (exercise.en || '');
  if (enName) {
    const path = findLibraryImage(enName);
    if (path) return IMAGE_BASE + path;
  }
  return '';
}

/* بندوّر على تمرين في المكتبة بمعرّفه (المكتبة العربية أو المدموجة) */
function libraryEntryById(id) {
  if (!id) return null;
  const list = libraryData || EXERCISE_LIBRARY;
  for (let i = 0; i < list.length; i++) {
    if (list[i] && list[i].id === id) return list[i];
  }
  return null;
}

/*
 * اسم التمرين المعروض: لو اتضاف من المكتبة بنعرضه بلغة الواجهة الحالية،
 * وإلا بنعرض الاسم المحفوظ (تمارين قديمة أو المدرب كتبها بنفسه)
 */
function exerciseDisplayName(exercise) {
  if (exercise && exercise.libId) {
    const entry = libraryEntryById(exercise.libId);
    if (entry) {
      const name = exerciseLibName(entry);
      if (name) return name;
    }
  }
  // تمرين محفوظ بلغة واحدة: نسخة اللغة التانية لو اتخزنت معاه، أو من القوالب
  if (exercise && exercise.i18n && exercise.i18n[lang] && exercise.i18n[lang].name) return exercise.i18n[lang].name;
  return tr((exercise && exercise.name) || '');
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
  label.textContent = exerciseDisplayName(exercise);
  info.appendChild(label);

  if (!src && exerciseHasAnatomyDetail(exercise)) {
    const detailBtn = document.createElement('button');
    detailBtn.type = 'button';
    detailBtn.className = 'link anatomy-detail-btn';
    detailBtn.textContent = t('anatomy_section_title');
    detailBtn.addEventListener('click', function (event) {
      event.stopPropagation();
      openPreview(exercise);
    });
    info.appendChild(detailBtn);
  }

  const tags = exerciseTags(exercise);
  if (tags) info.appendChild(tags);

  left.appendChild(info);
  return left;
}

const EX_TAG_ICON_REST = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15.5 14"></polyline></svg>';
const EX_TAG_ICON_LOAD = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="9" width="3" height="6" rx="1"></rect><rect x="19" y="9" width="3" height="6" rx="1"></rect><line x1="5" y1="12" x2="19" y2="12"></line><rect x="6" y="7" width="2.5" height="10" rx="1"></rect><rect x="15.5" y="7" width="2.5" height="10" rx="1"></rect></svg>';
const EX_TAG_ICON_TEMPO = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h10"></path><path d="M7 20.5h10"></path><path d="M8 3.5c0 4.3 3 5.3 4 7 1-1.7 4-2.7 4-7"></path><path d="M8 20.5c0-4.3 3-5.3 4-7 1 1.7 4 2.7 4 7"></path></svg>';

/* شرايط التفاصيل: تكرار، راحة، حمل، شدة، تيمبو */
function exerciseTags(exercise) {
  const items = [];

  if (exercise.rest)  items.push({ icon: EX_TAG_ICON_REST,  text: localiseReps(exercise.rest), primary: false });
  if (exercise.load)  items.push({ icon: EX_TAG_ICON_LOAD,  text: localiseReps(exercise.load), primary: false });
  if (exercise.rpe)   items.push({ icon: null,              text: 'RPE ' + exercise.rpe, primary: false });
  if (exercise.rir)   items.push({ icon: null,              text: 'RIR ' + exercise.rir, primary: false });
  if (exercise.zone)  items.push({ icon: null,              text: exercise.zone, primary: false });
  if (exercise.tempo) items.push({ icon: EX_TAG_ICON_TEMPO, text: exercise.tempo, primary: false });

  if (!items.length) return null;

  const box = document.createElement('div');
  box.className = 'ex-tags';
  items.forEach(function (item) {
    const tag = document.createElement('span');
    tag.className = 'ex-tag' + (item.primary ? ' primary' : '');
    if (item.icon) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'inline-icon';
      iconSpan.innerHTML = item.icon;
      tag.appendChild(iconSpan);
    }
    const label = document.createElement('span');
    label.textContent = item.text;
    tag.appendChild(label);
    box.appendChild(tag);
  });
  return box;
}

/* محرر داخل السطر — للمدرب فقط */
function buildEditor(exercise, onChange) {
  if (!Array.isArray(exercise.setDetails)) exercise.setDetails = [];

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
  const setsInput = field(t('ex_sets'), 'sets', 'number');
  setsInput.addEventListener('input', function () {
    if (setsBox) renderSetsBox();
  });
  row1.appendChild(setsInput);
  row1.appendChild(field(t('ex_reps'), 'reps'));
  box.appendChild(row1);

  const row2 = document.createElement('div');
  row2.className = 'row four';
  row2.appendChild(field(t('ex_rest'), 'rest'));
  row2.appendChild(field(t('ex_load'), 'load'));
  row2.appendChild(field(t('ex_rpe'), 'rpe'));
  row2.appendChild(field(t('ex_tempo'), 'tempo'));
  box.appendChild(row2);

  // خانات الوقت والمسافة وRIR — بتظهر للتمارين اللي نوعها محتاجها بس
  const exType = exercise.exType || '';
  if (exType === 'time' || exType === 'distance' || exType === 'distance_time' || exercise.duration || exercise.distance || exercise.rir) {
    const row3 = document.createElement('div');
    row3.className = 'row';
    if (exType !== 'distance') row3.appendChild(field(t('ex_duration'), 'duration'));
    if (exType === 'distance' || exType === 'distance_time' || exercise.distance) row3.appendChild(field(t('ex_distance'), 'distance'));
    if (exType === 'distance_time' || exercise.zone) row3.appendChild(field(t('ex_zone'), 'zone'));
    box.appendChild(row3);
  } else if (exType === 'weight_reps') {
    const row3 = document.createElement('div');
    row3.className = 'row';
    row3.appendChild(field('RIR', 'rir'));
    box.appendChild(row3);
  }
  const cuesInput = field(t('exs_cues_for_client'), 'cues');
  cuesInput.className = 'ex-cues-input';
  box.appendChild(cuesInput);

  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'link per-set-toggle';
  toggleBtn.textContent = exercise.setDetails.length ? t('per_set_edit') : t('per_set_add');
  box.appendChild(toggleBtn);

  let setsBox = null;

  function renderSetsBox() {
    if (setsBox) setsBox.remove();
    setsBox = document.createElement('div');
    setsBox.className = 'per-set-box';

    const count = Math.max(1, Number(exercise.sets) || 1);
    while (exercise.setDetails.length < count) {
      const previous = exercise.setDetails[exercise.setDetails.length - 1] || {};
      exercise.setDetails.push({
        weight: previous.weight || '',
        reps: previous.reps || exercise.reps || '',
        rest: previous.rest || exercise.rest || '',
        tempo: previous.tempo || exercise.tempo || ''
      });
    }
    exercise.setDetails.length = count;

    exercise.setDetails.forEach(function (set, index) {
      const row = document.createElement('div');
      row.className = 'per-set-row';

      const label = document.createElement('span');
      label.className = 'per-set-label';
      label.textContent = (index + 1);
      row.appendChild(label);

      function setField(placeholder, key) {
        const input = document.createElement('input');
        input.placeholder = placeholder;
        input.value = set[key] || '';
        input.addEventListener('click', function (event) { event.stopPropagation(); });
        input.addEventListener('input', function () {
          set[key] = input.value;
          if (onChange) onChange();
        });
        return input;
      }

      row.appendChild(setField(t('per_set_weight'), 'weight'));
      row.appendChild(setField(t('ex_reps'), 'reps'));
      row.appendChild(setField(t('ex_rest'), 'rest'));
      row.appendChild(setField(t('ex_tempo'), 'tempo'));

      setsBox.appendChild(row);
    });

    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'link';
    clearBtn.textContent = t('per_set_clear');
    clearBtn.addEventListener('click', function (event) {
      event.stopPropagation();
      exercise.setDetails = [];
      setsBox.remove();
      setsBox = null;
      toggleBtn.textContent = t('per_set_add');
      if (onChange) onChange();
    });
    setsBox.appendChild(clearBtn);

    box.appendChild(setsBox);
  }

  toggleBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    if (setsBox) {
      setsBox.remove();
      setsBox = null;
      toggleBtn.textContent = exercise.setDetails.length ? t('per_set_edit') : t('per_set_add');
      return;
    }
    toggleBtn.textContent = t('per_set_hide');
    renderSetsBox();
  });

  if (exercise.setDetails.length) {
    toggleBtn.textContent = t('per_set_hide');
    renderSetsBox();
  }

  const anatomyToggleBtn = document.createElement('button');
  anatomyToggleBtn.type = 'button';
  anatomyToggleBtn.className = 'link anatomy-toggle';
  anatomyToggleBtn.textContent = exerciseHasAnatomyDetail(exercise) ? t('anatomy_edit') : t('anatomy_add');
  box.appendChild(anatomyToggleBtn);

  let anatomyBox = null;

  function renderAnatomyBox() {
    if (anatomyBox) anatomyBox.remove();
    anatomyBox = document.createElement('div');
    anatomyBox.className = 'per-set-box anatomy-box';

    anatomyBox.appendChild(field(t('anatomy_howto'), 'howTo'));
    anatomyBox.appendChild(field(t('anatomy_goal'), 'goal'));

    const anatomyRow1 = document.createElement('div');
    anatomyRow1.className = 'row';
    anatomyRow1.appendChild(field(t('anatomy_primary'), 'primaryMuscles'));
    anatomyRow1.appendChild(field(t('anatomy_secondary'), 'secondaryMuscles'));
    anatomyBox.appendChild(anatomyRow1);

    const anatomyRow2 = document.createElement('div');
    anatomyRow2.className = 'row';
    anatomyRow2.appendChild(field(t('anatomy_origin'), 'origin'));
    anatomyRow2.appendChild(field(t('anatomy_insertion'), 'insertion'));
    anatomyBox.appendChild(anatomyRow2);

    anatomyBox.appendChild(field(t('anatomy_injury_benefit'), 'injuryBenefit'));

    box.appendChild(anatomyBox);
  }

  anatomyToggleBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    if (anatomyBox) {
      anatomyBox.remove();
      anatomyBox = null;
      anatomyToggleBtn.textContent = exerciseHasAnatomyDetail(exercise) ? t('anatomy_edit') : t('anatomy_add');
      return;
    }
    anatomyToggleBtn.textContent = t('anatomy_hide');
    renderAnatomyBox();
  });

  if (exerciseHasAnatomyDetail(exercise)) {
    anatomyToggleBtn.textContent = t('anatomy_hide');
    renderAnatomyBox();
  }

  // صورة اختيارية للتمرين ده بالذات (لو المدرب كتبه بنفسه أو عدّله)،
  // بتتخزن كـ data URL على exercise.imageUrl — نفس الحقل اللي exerciseRow/
  // thumbSrc/openPreview بتقراه أصلًا لو التمرين جاي من المكتبة، فبمجرد
  // ما نحطه هنا هيتعرض بنفس الطريقة تلقائيًا من غير أي تعديل تاني
  const photoToggleBtn = document.createElement('button');
  photoToggleBtn.type = 'button';
  photoToggleBtn.className = 'link anatomy-toggle';
  photoToggleBtn.textContent = exercise.imageUrl ? t('ex_photo_change') : t('ex_photo_add');
  box.appendChild(photoToggleBtn);

  let photoBox = null;

  function renderPhotoBox() {
    if (photoBox) photoBox.remove();
    photoBox = document.createElement('div');
    photoBox.className = 'per-set-box';

    if (exercise.imageUrl) {
      const previewBox = document.createElement('div');
      previewBox.className = 'preview-box';
      const preview = document.createElement('img');
      preview.src = exercise.imageUrl;
      preview.alt = '';
      previewBox.appendChild(preview);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'delete';
      removeBtn.innerHTML = DELETE_ICON_SVG;
      removeBtn.title = t('ex_photo_remove');
      removeBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        exercise.imageUrl = '';
        photoToggleBtn.textContent = t('ex_photo_add');
        renderPhotoBox();
        if (onChange) onChange();
      });
      previewBox.appendChild(removeBtn);
      photoBox.appendChild(previewBox);
    }

    const fileLabel = document.createElement('label');
    fileLabel.className = 'file-pick';
    const fileSpan = document.createElement('span');
    fileSpan.textContent = exercise.imageUrl ? t('image_chosen') : t('choose_photo');
    fileLabel.appendChild(fileSpan);

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('click', function (event) {
      event.stopPropagation();
    });
    fileInput.addEventListener('change', async function () {
      const file = fileInput.files[0];
      fileInput.value = '';
      if (!file) return;
      if (file.size > MAX_SOURCE_BYTES) {
        fileSpan.textContent = t('image_too_big');
        return;
      }
      fileSpan.textContent = t('preparing_image');
      try {
        // صورة التمرين بتتخزن جوه مستند البرنامج نفسه (مش ملف منفصل)،
        // وحد المستند 1 ميجا — فبنضغطها أصغر من باقي صور التطبيق عشان
        // المدرب يقدر يحط صور لتمارين كتير من غير ما يوصل للحد
        exercise.imageUrl = await compressImage(file, EXERCISE_IMAGE_MAX_SIDE, 0.6);
        photoToggleBtn.textContent = t('ex_photo_change');
        renderPhotoBox();
        if (onChange) onChange();
      } catch (error) {
        fileSpan.textContent = t('image_failed');
      }
    });
    fileLabel.appendChild(fileInput);
    photoBox.appendChild(fileLabel);

    box.appendChild(photoBox);
  }

  photoToggleBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    if (photoBox) {
      photoBox.remove();
      photoBox = null;
      return;
    }
    renderPhotoBox();
  });

  return box;
}

/* سطر تمرين قابل للتعديل في شاشة المدرب */
function coachExerciseItem(exercise, onDelete, onChange) {
  if (!Array.isArray(exercise.setDetails)) exercise.setDetails = [];

  const item = document.createElement('li');
  item.className = 'ex-row';

  const top = document.createElement('div');
  top.className = 'ex-row-top';
  top.appendChild(exerciseRow(exercise));

  const details = document.createElement('span');
  details.textContent = setsSummaryText(exercise) + ' ';

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = DELETE_ICON_SVG;
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
    editor = buildEditor(exercise, function () {
      details.textContent = '';
      details.textContent = setsSummaryText(exercise) + ' ';
      details.appendChild(deleteButton);
      if (onChange) onChange();
    });
    item.appendChild(editor);
  });

  return item;
}

/* ============================ شاشة المدرب ============================ */

let coachWeek = emptyWeek();
let coachRehab = emptyRehab();
let coachDay = todayIndex;
/* الحصة المفتوحة في اليوم: 0 = الأولى (اليوم نفسه)، 1 و 2 = extraSessions */
let coachSession = 0;
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

const coachMuscle = document.getElementById('coach-muscle');

/*
 * اختيار العضلة المستهدفة لليوم — بيتحفظ في الشاشة بس (مش في البرنامج)
 * وبيستخدم كفلتر جاهز أول ما المدرب يفتح المكتبة، عشان ميضطرش يفلتر
 * بإيده كل مرة
 */
function fillCoachMuscleSelect() {
  if (!coachMuscle) return;
  const keep = coachMuscle.value;
  coachMuscle.innerHTML = '';

  const none = document.createElement('option');
  none.value = '';
  none.textContent = t('all_muscles');
  coachMuscle.appendChild(none);

  Object.keys(MUSCLES).forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = muscleName(key);
    coachMuscle.appendChild(option);
  });

  coachMuscle.value = keep;
}

const trainingPanel = document.getElementById('training-panel');
const rehabPanel = document.getElementById('rehab-panel');
const injuriesPanel = document.getElementById('injuries-panel');
const tabTraining = document.getElementById('tab-training');
const tabRehab = document.getElementById('tab-rehab');
const tabInjuries = document.getElementById('tab-injuries');
const tabInjuriesBadge = document.getElementById('tab-injuries-badge');
const coachInjuriesList = document.getElementById('coach-injuries-list');
const coachInjuriesMessage = document.getElementById('coach-injuries-message');
const tabConsult = document.getElementById('tab-consult');
const tabConsultBadge = document.getElementById('tab-consult-badge');
const consultPanel = document.getElementById('consult-panel');
const consultNotesText = document.getElementById('consult-notes-text');
const consultSaveBtn = document.getElementById('consult-save-btn');
const consultMessage = document.getElementById('consult-message');
const consultRequestsList = document.getElementById('consult-requests-list');

function setCoachMode(mode) {
  coachMode = mode;
  trainingPanel.classList.toggle('hidden', mode !== 'training');
  rehabPanel.classList.toggle('hidden', mode !== 'rehab');
  nutritionPanel.classList.toggle('hidden', mode !== 'nutrition');
  injuriesPanel.classList.toggle('hidden', mode !== 'injuries');
  consultPanel.classList.toggle('hidden', mode !== 'consult');
  tabTraining.classList.toggle('active', mode === 'training');
  tabRehab.classList.toggle('active', mode === 'rehab');
  tabNutrition.classList.toggle('active', mode === 'nutrition');
  tabInjuries.classList.toggle('active', mode === 'injuries');
  tabConsult.classList.toggle('active', mode === 'consult');
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

tabInjuries.addEventListener('click', function () {
  saveCurrentDay();
  if (coachMode === 'rehab') readRehabFields();
  setCoachMode('injuries');
  loadCoachInjuryReports();
});

tabConsult.addEventListener('click', function () {
  saveCurrentDay();
  if (coachMode === 'rehab') readRehabFields();
  setCoachMode('consult');
  loadCoachConsultNotes();
});

// بتاخد إيميل العميل والمتخصص وترجّع معرّف مستند ملاحظات الاستشارة
// الخاص بيهم (كل متخصص له ملاحظاته الخاصة عن نفس العميل، منفصلة عن
// باقي أعضاء الفريق)
function consultNoteDocId(clientEmail, providerEmail) {
  return clientEmail + '__' + providerEmail;
}

/* تاريخ مقروء لأي حقل createdAt/updatedAt (ISO) — بيرجع فاضي لو التاريخ بايظ */
function consultDateText(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB');
  } catch (error) {
    return '';
  }
}

/*
 * طلبات الاستشارة اللي بعتها عميل معيّن لمتخصص معيّن. المتخصص (isCoach)
 * مسموحله يقرا كل الطلبات، فبنجيبها كلها ونفلتر هنا — نفس اللي بيحصل
 * في بلاغات الإصابة بالظبط
 */
async function fetchConsultRequestsFor(clientEmailValue, providerEmail) {
  const snapshot = await getDocs(collection(db, 'consultRequests'));
  return snapshot.docs
    .map(function (item) { return Object.assign({ id: item.id }, item.data()); })
    .filter(function (row) { return row.clientEmail === clientEmailValue && row.providerEmail === providerEmail; })
    .sort(function (a, b) { return String(b.createdAt || '').localeCompare(String(a.createdAt || '')); });
}

function consultRequestCard(row) {
  const item = document.createElement('li');
  item.className = 'injury-report-card status-' + ((row.status || 'pending') === 'answered' ? 'done' : 'requested');

  const body = document.createElement('div');
  body.className = 'client-name';
  body.style.whiteSpace = 'pre-wrap';
  body.textContent = row.text || '';
  item.appendChild(body);

  const meta = document.createElement('div');
  meta.className = 'ex-meta';
  const when = consultDateText(row.createdAt);
  meta.textContent = ((row.status || 'pending') === 'answered' ? t('consult_status_answered') : t('consult_status_pending'))
    + (when ? ' — ' + t('consult_asked_on') + ' ' + when : '');
  item.appendChild(meta);

  return item;
}

async function renderCoachConsultRequests() {
  if (!consultRequestsList) return;
  consultRequestsList.innerHTML = '';
  try {
    const rows = await fetchConsultRequestsFor(currentClient, currentProviderEmail);
    if (!rows.length) {
      const empty = document.createElement('li');
      empty.className = 'section-empty';
      empty.textContent = t('consult_no_requests');
      consultRequestsList.appendChild(empty);
      return;
    }
    rows.forEach(function (row) {
      consultRequestsList.appendChild(consultRequestCard(row));
    });
  } catch (error) {
    // لو القراءة فشلت مش هنوقف باقي الشاشة — الملاحظات نفسها أهم
  }
}

/* عداد صغير على تبويب "استشارة" بعدد الطلبات اللي لسه محدش رد عليها */
async function refreshConsultBadge(email) {
  if (!tabConsultBadge) return;
  tabConsultBadge.classList.add('hidden');
  tabConsultBadge.textContent = '';
  if (!currentProviderEmail) return;
  try {
    const rows = await fetchConsultRequestsFor(email, currentProviderEmail);
    const pending = rows.filter(function (row) { return (row.status || 'pending') !== 'answered'; }).length;
    if (pending) {
      tabConsultBadge.textContent = pending;
      tabConsultBadge.classList.remove('hidden');
    }
  } catch (error) {
    // مش مشكلة لو فشل تحميل العداد
  }
}

async function loadCoachConsultNotes() {
  if (!currentClient || !currentProviderEmail) return;
  consultNotesText.value = '';
  consultMessage.textContent = t('loading');
  try {
    const noteDoc = await getDoc(doc(db, 'consultNotes', consultNoteDocId(currentClient, currentProviderEmail)));
    consultNotesText.value = (noteDoc.exists() && noteDoc.data().text) || '';
    await renderCoachConsultRequests();
    consultMessage.textContent = '';
  } catch (error) {
    consultMessage.textContent = t('problem') + error.message;
  }
}

consultSaveBtn.addEventListener('click', async function () {
  if (!currentClient || !currentProviderEmail) return;
  consultMessage.textContent = t('saving');
  try {
    await setDoc(doc(db, 'consultNotes', consultNoteDocId(currentClient, currentProviderEmail)), {
      clientEmail: currentClient,
      providerEmail: currentProviderEmail,
      providerName: (currentProviderData && currentProviderData.name) || '',
      text: consultNotesText.value.trim(),
      updatedAt: new Date().toISOString()
    });

    // أي طلب استشارة من العميل ده ليا لسه "في انتظار الرد" يتحوّل
    // لـ "تم الرد" بمجرد ما أحفظ ملاحظتي — عشان العميل يعرف إنه اترد عليه
    try {
      const rows = await fetchConsultRequestsFor(currentClient, currentProviderEmail);
      const pending = rows.filter(function (row) { return (row.status || 'pending') !== 'answered'; });
      await Promise.all(pending.map(function (row) {
        return updateDoc(doc(db, 'consultRequests', row.id), {
          status: 'answered',
          answeredAt: new Date().toISOString()
        });
      }));
      // العميل يعرف إن اترد عليه — بس لو كان فعلًا مستني رد
      if (pending.length) {
        const replier = (currentProviderData && currentProviderData.name) || '';
        notify(currentClient, 'consult_reply', {
          target: 'consult',
          params: function () { return { name: replier || t('chat_sender_coach') }; }
        });
      }
      await renderCoachConsultRequests();
      await refreshConsultBadge(currentClient);
    } catch (markError) {
      // الملاحظة اتحفظت فعلاً — لو تحديث حالة الطلبات فشل مش هنفشّل الحفظ
    }

    setStatusMessage(consultMessage, t('consult_saved_msg'), 'success');
  } catch (error) {
    consultMessage.textContent = t('problem') + error.message;
  }
});

/*
 * أي مدرب أو متخصص عنده عميل في فريقه لازم يقدر يبني له أي جزء من
 * البرنامج (تمرين/تأهيل/تغذية) أو يكتب استشارة، من غير ما يتقيّد
 * بتخصصه هو بالذات — طلب صريح من صاحب المنصة إن أي حد يفتح عميل
 * يلاقي كل الأدوات قدامه ويقدر يشتغل معاه بأي حاجة يحتاجها، مش بس
 * الحاجة المرتبطة بتخصصه. تبويب "إصابات" فاضل متاح للكل دايمًا زي
 * ما كان، وتبويب "استشارة" (ملاحظات حرة) بقى متاح للكل كمان عشان
 * أي حد (حتى المدرب) يقدر يدوّن ملاحظة سريعة من غير برنامج رسمي.
 */
/*
 * الأقسام اللي بتتفتح للمتخصص في برنامج العميل بتتحدد من تخصصاته
 * المعتمدة. مثال: حساب "مدرب" معتمد بيفتحله قسم التمرين؛ لما يضيف
 * "أخصائي تغذية" وصاحب المنصة يوافق، قسم التغذية بيتفتح كمان.
 * صاحب المنصة والفريق الإداري بيشوفوا الأقسام كلها دايمًا.
 * تبويب الإصابات مفتوح للكل — أي متخصص لازم يشوف بلاغ إصابة عميله.
 */
function applyCoachScopeTabs() {
  const scopes = approvedScopes();

  tabTraining.classList.toggle('hidden', scopes.indexOf('training') === -1);
  tabRehab.classList.toggle('hidden', scopes.indexOf('rehab') === -1);
  tabNutrition.classList.toggle('hidden', scopes.indexOf('nutrition') === -1);
  tabConsult.classList.toggle('hidden', scopes.indexOf('consult') === -1);

  if (scopes.indexOf('training') !== -1) return 'training';
  if (scopes.indexOf('rehab') !== -1) return 'rehab';
  if (scopes.indexOf('nutrition') !== -1) return 'nutrition';
  if (scopes.indexOf('consult') !== -1) return 'consult';
  // تخصص ملوش أقسام برنامج (زي المساج) — بيفتح على الإصابات
  return 'injuries';
}

document.getElementById('back-btn').addEventListener('click', function () {
  showScreen(clientsScreen);
  loadClients();
});

async function openCoachScreen(email, name, sport) {
  currentClient = email;
  currentClientName = name;
  currentClientSport = sport || '';
  coachTitle.textContent = fill('program_of', { name: name });
  coachBasicsData = null;
  renderCoachBasics();
  coachMessage.textContent = t('loading');
  showScreen(coachScreen);
  const defaultMode = applyCoachScopeTabs();
  // المكتبات المقفولة بتبان مقفولة على الزرار نفسه، مش بس لما يدوس
  applyLibraryLock(document.getElementById('open-library-btn'), 'exercises');
  applyLibraryLock(document.getElementById('open-mylib-btn'), 'exercises');
  applyLibraryLock(document.getElementById('open-food-btn'), 'food');
  applyLibraryLock(document.getElementById('open-supplements-btn'), 'supplements');
  applyLibraryLock(document.getElementById('apply-template-btn'), 'rehab');
  setCoachMode(defaultMode);
  if (defaultMode === 'injuries') loadCoachInjuryReports();
  if (defaultMode === 'consult') loadCoachConsultNotes();

  try {
    const workoutDoc = await getDoc(doc(db, 'workouts', email));
    coachWeek = normalizeWeek(workoutDoc.exists() ? workoutDoc.data().week : null);

    const rehabDoc = await getDoc(doc(db, 'rehab', email));
    coachRehab = normalizeRehab(rehabDoc.exists() ? rehabDoc.data() : null);

    const nutritionDoc = await getDoc(doc(db, 'nutrition', email));
    coachNutrition = normalizeNutrition(nutritionDoc.exists() ? nutritionDoc.data() : null);

    /* الحالة الصحية قبل أي حاجة — المدرب لازم يشوفها قبل ما يكتب حرف */
    coachHealth = await loadHealthFor(email);
    renderCoachHealth();

    const basicsDoc = await getDoc(doc(db, 'clients', email));
    coachBasicsData = basicsDoc.exists() ? basicsDoc.data() : null;
    renderCoachBasics();

    coachDay = todayIndex;
    coachSession = 0;
    nutDay = todayIndex;
    fillSectionPicker();
    fillBodyParts();
    fillTemplatePicker();
    fillSportSelect(coachSport, true);
    fillCoachMuscleSelect();
    coachSport.value = currentClientSport;
    // قوالب المدربين بتتحمّل مرة واحدة في الجلسة — بعد كده بنستعمل النسخة
    // اللي في الذاكرة، فمفيش قراءة زيادة كل مرة تفتح عميل
    if (!myTemplatesLoaded) await loadMyTemplates();
    fillSportTemplatePicker();
    showCoachDay();
    showRehab();
    showNutrition();
    refreshInjuryBadge(email);
    refreshConsultBadge(email);
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
      title: tr(day.title) || days()[index],
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
    coachSession = 0;
    showCoachDay();
  });
}

/* الحاجة اللي المدرب بيعدّل فيها دلوقتي: اليوم نفسه (الحصة الأولى) أو حصة زيادة */
function coachTarget() {
  const day = coachWeek[coachDay];
  if (!day) return { title: '', sections: blankSections() };
  if (coachSession > 0 && day.extraSessions && day.extraSessions[coachSession - 1]) {
    return day.extraSessions[coachSession - 1];
  }
  coachSession = 0;
  return day;
}

function saveCurrentDay() {
  if (!coachWeek[coachDay]) return;
  coachTarget().title = dayTitle.value.trim();
  if (coachSession === 0) coachWeek[coachDay].rest = restCheckbox.checked;
}

/*
 * اسم اليوم/الحصة بيتسجّل وهو بيتكتب — قبل كده لو المدرب كتب الاسم
 * وبعدين ضاف تمرين، الشاشة كانت بتترسم تاني والاسم يضيع
 */
dayTitle.addEventListener('input', function () {
  if (coachWeek[coachDay]) coachTarget().title = dayTitle.value.trim();
});
restCheckbox.addEventListener('change', function () {
  if (coachWeek[coachDay] && coachSession === 0) {
    coachWeek[coachDay].rest = restCheckbox.checked;
    renderCoachSessions();
  }
});

/* حصص العميل في اليوم ده من جدوله الأسبوعي: [{ sport, time }] مترتبة بالمعاد */
function clientScheduleForDay(data, dayIndex) {
  const rows = (data && Array.isArray(data.sportSchedule)) ? data.sportSchedule : [];
  return rows.filter(function (r) { return r.day === dayIndex && r.sport; })
    .sort(function (a, b) { return String(a.time || '99').localeCompare(String(b.time || '99')); });
}

function scheduleSessionText(row) {
  return sportName(row.sport) + (row.time ? ' ' + prettyTime(row.time) : '');
}

/*
 * شريط الحصص فوق عنوان اليوم: الحصة ١ · الحصة ٢ · + حصة
 * ولو العميل كاتب في جدوله إنه بيتمرن أكتر من مرة اليوم ده، بنوريله
 * ده وزرار يقسّم اليوم زيه في دوسة واحدة
 */
function renderCoachSessions() {
  const box = document.getElementById('coach-session-box');
  if (!box) return;
  box.innerHTML = '';
  const day = coachWeek[coachDay];
  if (!day) return;
  const sessions = daySessions(day);
  const multi = sessions.length > 1;
  const planned = clientScheduleForDay(coachBasicsData, coachDay);

  if (planned.length) {
    const hint = document.createElement('p');
    hint.className = 'session-plan-hint';
    hint.textContent = fill('session_client_plan', { s: planned.map(scheduleSessionText).join('  +  ') });
    box.appendChild(hint);
  }

  const bar = document.createElement('div');
  bar.className = 'session-bar';
  if (multi) {
    sessions.forEach(function (session, index) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'session-chip' + (index === coachSession ? ' on' : '');
      chip.dataset.session = String(index);
      const num = document.createElement('span');
      num.className = 'session-num';
      num.textContent = index + 1;
      chip.appendChild(num);
      const label = document.createElement('span');
      label.textContent = sessionLabel(session, index) + (session.time ? ' · ' + prettyTime(session.time) : '');
      chip.appendChild(label);
      const n = dayCount({ sections: session.sections });
      if (n) {
        const count = document.createElement('small');
        count.textContent = n;
        chip.appendChild(count);
      }
      chip.addEventListener('click', function () {
        saveCurrentDay();
        coachSession = index;
        showCoachDay();
      });
      bar.appendChild(chip);
    });
  }
  if (sessions.length < MAX_DAY_SESSIONS && !day.rest) {
    const add = document.createElement('button');
    add.type = 'button';
    add.className = 'session-chip add';
    add.id = 'coach-session-add';
    add.textContent = multi ? t('session_add') : t('session_add_first');
    add.addEventListener('click', function () {
      saveCurrentDay();
      if (!day.extraSessions) day.extraSessions = [];
      const index = day.extraSessions.length + 1;
      const fromPlan = planned[index] || null;
      day.extraSessions.push(normalizeSession(fromPlan ? { sport: fromPlan.sport, time: fromPlan.time } : null));
      // أول مرة يقسّم: الحصة الأولى تاخد معاد ونوع أول حصة في جدول العميل
      if (index === 1 && planned[0] && !day.sport && !day.time) {
        day.sport = planned[0].sport;
        day.time = planned[0].time || '';
      }
      coachSession = index;
      showCoachDay();
    });
    bar.appendChild(add);
  }
  if (planned.length > 1 && sessions.length < Math.min(planned.length, MAX_DAY_SESSIONS) && !day.rest) {
    const split = document.createElement('button');
    split.type = 'button';
    split.className = 'session-chip add plan';
    split.id = 'coach-session-split';
    split.textContent = t('session_split_btn');
    split.addEventListener('click', function () {
      saveCurrentDay();
      if (!day.extraSessions) day.extraSessions = [];
      if (!day.sport && !day.time) { day.sport = planned[0].sport; day.time = planned[0].time || ''; }
      for (let i = sessions.length; i < Math.min(planned.length, MAX_DAY_SESSIONS); i++) {
        day.extraSessions.push(normalizeSession({ sport: planned[i].sport, time: planned[i].time }));
      }
      showCoachDay();
    });
    bar.appendChild(split);
  }
  if (bar.childNodes.length) box.appendChild(bar);

  if (!multi) return;

  /* بيانات الحصة المفتوحة: نوعها ومعادها، وزرار مسح للحصص الزيادة */
  const target = coachTarget();
  const meta = document.createElement('div');
  meta.className = 'session-meta';

  const sport = document.createElement('select');
  sport.id = 'coach-session-sport';
  const none = document.createElement('option');
  none.value = '';
  none.textContent = t('session_sport_ph');
  sport.appendChild(none);
  const keys = ['gym'].concat((coachBasicsData && Array.isArray(coachBasicsData.sports)) ? coachBasicsData.sports : []);
  if (target.sport && keys.indexOf(target.sport) === -1) keys.push(target.sport);
  keys.forEach(function (key) {
    if (!key) return;
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = sportName(key) || key;
    sport.appendChild(opt);
  });
  sport.value = target.sport || '';
  sport.addEventListener('change', function () {
    target.sport = sport.value;
    renderCoachSessions();
  });
  meta.appendChild(sport);

  const time = document.createElement('input');
  time.type = 'time';
  time.id = 'coach-session-time';
  time.value = target.time || '';
  time.setAttribute('aria-label', t('session_time'));
  time.addEventListener('change', function () {
    target.time = time.value;
    renderCoachSessions();
  });
  meta.appendChild(time);

  box.appendChild(meta);

  if (coachSession > 0) {
    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'link danger session-del';
    del.id = 'coach-session-del';
    del.textContent = t('session_remove');
    del.addEventListener('click', function () {
      const count = dayCount({ sections: target.sections });
      if (count && !del.classList.contains('confirming')) {
        del.classList.add('confirming');
        del.textContent = t('session_remove_confirm');
        return;
      }
      day.extraSessions.splice(coachSession - 1, 1);
      if (!day.extraSessions.length) delete day.extraSessions;
      coachSession = Math.max(0, coachSession - 1);
      showCoachDay();
    });
    box.appendChild(del);
  }
}

function fillSectionPicker() {
  const keep = targetSection.value;
  targetSection.innerHTML = '';
  SECTION_KEYS.forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = sectionName(key);
    targetSection.appendChild(option);
  });
  targetSection.value = keep || 'main';
  if (!targetSection.value) targetSection.value = 'main';
}

function showCoachDay() {
  if (coachTitle && currentClientName) {
    coachTitle.textContent = fill('program_of', { name: currentClientName });
  }

  const wholeDay = coachWeek[coachDay];
  const day = coachTarget();
  dayTitle.value = day.title;
  restCheckbox.checked = wholeDay.rest;
  /* يوم الراحة بيخص اليوم كله، مش حصة لوحدها */
  const restLabel = restCheckbox.closest('label');
  if (restLabel) restLabel.classList.toggle('hidden', coachSession > 0);
  dayTitle.placeholder = hasManySessions(wholeDay) ? t('session_title_ph') : t('day_title');
  renderCoachSessions();

  coachSections.innerHTML = '';

  SECTION_KEYS.forEach(function (key) {
    const list = day.sections[key];

    const block = document.createElement('div');
    block.className = 'section-block';

    const head = document.createElement('div');
    head.className = 'section-head';

    const title = document.createElement('div');
    title.className = 'section-name';
    setIconLabel(title, sectionIconSvg(key), sectionName(key));

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

/*
 * حد المستند الواحد في Firestore حوالي 1 ميجا. الصور اللي بتتحط على
 * التمارين بتتخزن جوه مستند البرنامج نفسه، يعني برنامج فيه صور كتير
 * ممكن يعدّي الحد فيفشل الحفظ برسالة غامضة ويضيع تعديل المدرب.
 * الدالة دي بتقيس حجم المستند قبل ما نبعته، وبترجّع رسالة تحذير
 * مفهومة بدل ما نسيب Firestore يرفض من غير ما المدرب يعرف السبب.
 * (الحل الجذري إن الصور تروح Firebase Storage — ده مخطط له بعدين)
 */
const FIRESTORE_DOC_LIMIT = 1048576;
const DOC_SIZE_SAFE_LIMIT = 900000;

function docSizeBytes(data) {
  try {
    return new Blob([JSON.stringify(data)]).size;
  } catch (error) {
    try { return JSON.stringify(data).length; } catch (innerError) { return 0; }
  }
}

/* بترجّع true لو المستند كبير أوي ولازم نوقف الحفظ */
function docTooBig(data, messageEl) {
  const size = docSizeBytes(data);
  if (size > DOC_SIZE_SAFE_LIMIT) {
    if (messageEl) messageEl.textContent = t('doc_too_big');
    return true;
  }
  if (size > DOC_SIZE_SAFE_LIMIT * 0.75 && messageEl) {
    // تحذير بس — الحفظ بيكمل عادي
    setStatusMessage(messageEl, t('doc_size_warning'), 'warning');
  }
  return false;
}

document.getElementById('save-btn').addEventListener('click', async function () {
  saveCurrentDay();
  if (docTooBig({ week: coachWeek }, coachMessage)) return;
  coachMessage.textContent = t('saving');
  try {
    await setDoc(doc(db, 'workouts', currentClient), { week: coachWeek });
    setStatusMessage(coachMessage, t('saved'), 'success');
    notifyProgramChange('workout', 'training');
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
  updateTemplatePhotoPreview();
}

// معاينة/رفع صورة لبرنامج التأهيل المختار في القائمة (rehab_<id> في libraryImages)
const templatePhotoBox = document.getElementById('template-photo-box');
const templatePhotoPreview = document.getElementById('template-photo-preview');
const templatePhotoBtn = document.getElementById('template-photo-btn');

function updateTemplatePhotoPreview() {
  if (!templatePhotoBox || !templatePhotoPreview) return;
  const id = templatePick.value;
  const photo = id ? libraryImageFor('rehab_' + id) : '';
  if (photo) {
    templatePhotoPreview.src = photo;
    templatePhotoBox.classList.remove('hidden');
  } else {
    templatePhotoBox.classList.add('hidden');
    templatePhotoPreview.src = '';
  }
}

templatePick.addEventListener('change', updateTemplatePhotoPreview);

if (templatePhotoBtn) {
  templatePhotoBtn.addEventListener('click', function () {
    const id = templatePick.value;
    if (!id) {
      coachMessage.textContent = t('pick_template_first');
      return;
    }
    pickLibraryImage('rehab_' + id);
  });
}

if (templatePhotoPreview) {
  templatePhotoPreview.addEventListener('click', function () {
    const id = templatePick.value;
    if (!id) return;
    const photo = libraryImageFor('rehab_' + id);
    if (!photo) return;
    const template = REHAB_TEMPLATES.filter(function (item) { return item.id === id; })[0];
    lightboxTitle.textContent = template ? template.name[lang] : '';
    lightboxImages.innerHTML = '';
    addShot(photo, '');
    lightbox.classList.remove('hidden');
  });
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
            reps: exercise.reps,
            goal: exercise.goal ? exercise.goal[lang] : '',
            primaryMuscles: exercise.primaryMuscles ? exercise.primaryMuscles[lang] : '',
            secondaryMuscles: exercise.secondaryMuscles ? exercise.secondaryMuscles[lang] : '',
            origin: exercise.origin ? exercise.origin[lang] : '',
            insertion: exercise.insertion ? exercise.insertion[lang] : '',
            injuryBenefit: exercise.injuryBenefit ? exercise.injuryBenefit[lang] : ''
          });
        })
      };
    })
  };
}

document.getElementById('apply-template-btn').addEventListener('click', async function () {
  if (!guardLibrary('rehab', coachMessage)) return;
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
    const label = t('phase') + ' ' + (index + 1) + (phase.name ? ' — ' + tr(phase.name) : '');

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


/* ============================================================
   أجهزة العلاج الطبيعي
   الأخصائي بيختار جهاز، يشوف بروتوكولاته وإعداداته وموانعه،
   ويضيف الجلسة لخطة العميل. موانع الاستعمال بتتعرض جنب كل جهاز
   مش مخبّية في ورقة تانية — ده أهم جزء في الشاشة دي
   ============================================================ */

let activeModality = '';

/* الأجهزة لأخصائي العلاج الطبيعي والتأهيل وصاحب المنصة بس */
function canUseModalities() {
  if (isFullAdminAccount()) return true;
  const specs = providerSpecialties(currentProviderData || {});
  return specs.indexOf('physio') !== -1 || specs.indexOf('rehab') !== -1
    || specs.indexOf('sports_medicine') !== -1;
}

function modalityName(item) { return item[lang] || item.ar || item.id; }

function modalityById(id) {
  return MODALITIES.filter(function (m) { return m.id === id; })[0] || null;
}

function renderModalityBox() {
  const box = document.getElementById('modality-box');
  if (!box) return;
  const allowed = canUseModalities();
  box.classList.toggle('hidden', !allowed);
  if (!allowed) return;

  const chips = document.getElementById('modality-chips');
  chips.innerHTML = '';
  MODALITIES.forEach(function (item) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'mod-chip' + (activeModality === item.id ? ' on' : '');
    chip.textContent = modalityName(item);
    chip.addEventListener('click', function () {
      activeModality = (activeModality === item.id) ? '' : item.id;
      renderModalityBox();
    });
    chips.appendChild(chip);
  });

  renderModalityDetail();
  renderModalityPlan();
}

function renderModalityDetail() {
  const box = document.getElementById('modality-detail');
  if (!box) return;
  box.innerHTML = '';
  const item = modalityById(activeModality);
  if (!item) return;

  const what = document.createElement('p');
  what.className = 'mod-what';
  what.textContent = item.what[lang] || item.what.ar;
  box.appendChild(what);

  /* موانع الاستعمال الأول — قبل أي إعدادات */
  const warn = document.createElement('div');
  warn.className = 'mod-contra';
  const warnHead = document.createElement('div');
  warnHead.className = 'mod-contra-head';
  warnHead.appendChild(iconSvg('warning', 'ui-icon'));
  const warnTitle = document.createElement('span');
  warnTitle.textContent = t('modality_contra');
  warnHead.appendChild(warnTitle);
  warn.appendChild(warnHead);
  const warnList = document.createElement('ul');
  (item.contraindications[lang] || item.contraindications.ar).forEach(function (line) {
    const li = document.createElement('li');
    li.textContent = line;
    warnList.appendChild(li);
  });
  warn.appendChild(warnList);
  box.appendChild(warn);

  const indTitle = document.createElement('div');
  indTitle.className = 'mod-sub';
  indTitle.textContent = t('modality_indications');
  box.appendChild(indTitle);
  const indList = document.createElement('ul');
  indList.className = 'mod-ind';
  (item.indications[lang] || item.indications.ar).forEach(function (line) {
    const li = document.createElement('li');
    li.textContent = line;
    indList.appendChild(li);
  });
  box.appendChild(indList);

  const protos = MODALITY_PROTOCOLS.filter(function (p) { return p.modality === item.id; });
  if (!protos.length) return;

  const pTitle = document.createElement('div');
  pTitle.className = 'mod-sub';
  pTitle.textContent = t('modality_protocols');
  box.appendChild(pTitle);

  protos.forEach(function (proto) {
    const card = document.createElement('div');
    card.className = 'mod-proto';

    const name = document.createElement('strong');
    name.className = 'mp-name';
    name.textContent = proto[lang] || proto.ar;
    card.appendChild(name);

    const note = document.createElement('p');
    note.className = 'mp-note';
    note.textContent = proto.note[lang] || proto.note.ar;
    card.appendChild(note);

    const grid = document.createElement('div');
    grid.className = 'mp-settings';
    proto.settings.forEach(function (row) {
      const cell = document.createElement('div');
      cell.className = 'mp-set';
      const l = document.createElement('span');
      l.textContent = row[lang] || row.ar;
      const v = document.createElement('strong');
      v.textContent = modalityValueText(row.value);
      cell.appendChild(l);
      cell.appendChild(v);
      grid.appendChild(cell);
    });
    card.appendChild(grid);

    const meta = document.createElement('div');
    meta.className = 'mp-meta';
    meta.textContent = modalityValueText(proto.sessions) + '  ·  ' + modalityValueText(proto.frequency);
    card.appendChild(meta);

    const add = document.createElement('button');
    add.type = 'button';
    add.className = 'secondary mp-add';
    add.textContent = t('modality_add');
    add.addEventListener('click', function () { addModalityToPlan(proto); });
    card.appendChild(add);

    box.appendChild(card);
  });
}

function addModalityToPlan(proto) {
  if (!coachRehab.modalities) coachRehab.modalities = [];
  const exists = coachRehab.modalities.some(function (m) { return m.protocolId === proto.id; });
  if (exists) {
    setStatusMessage(document.getElementById('modality-message'), t('modality_already'), '');
    return;
  }
  coachRehab.modalities.push({
    protocolId: proto.id,
    modality: proto.modality,
    addedAt: new Date().toISOString()
  });
  renderModalityPlan();
  setStatusMessage(document.getElementById('modality-message'), t('modality_added'), 'success');
}

function renderModalityPlan() {
  const box = document.getElementById('modality-plan');
  if (!box) return;
  box.innerHTML = '';
  const list = (coachRehab && coachRehab.modalities) || [];
  if (!list.length) return;

  const title = document.createElement('div');
  title.className = 'mod-sub';
  title.textContent = t('modality_plan_title');
  box.appendChild(title);

  list.forEach(function (row, index) {
    const proto = MODALITY_PROTOCOLS.filter(function (p) { return p.id === row.protocolId; })[0];
    const device = modalityById(row.modality);
    const item = document.createElement('div');
    item.className = 'mod-plan-row';

    const text = document.createElement('span');
    text.textContent = (device ? modalityName(device) : row.modality)
      + (proto ? ' — ' + (proto[lang] || proto.ar) : '');
    item.appendChild(text);

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'mod-del';
    del.appendChild(iconSvg('close', 'ui-icon'));
    del.addEventListener('click', function () {
      coachRehab.modalities.splice(index, 1);
      renderModalityPlan();
    });
    item.appendChild(del);

    box.appendChild(item);
  });
}

function showRehab() {
  renderModalityBox();
  rehabBodyPart.value = coachRehab.bodyPart || '';
  rehabInjury.value = tr(coachRehab.injury);
  rehabAbout.value = tr(coachRehab.about);

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
    removePhase.innerHTML = DELETE_ICON_SVG;
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
    nameInput.value = tr(phase.name);
    nameInput.placeholder = t('phase_name');
    nameInput.addEventListener('input', function () {
      phase.name = nameInput.value;
    });
    block.appendChild(nameInput);

    const goalInput = document.createElement('input');
    goalInput.value = tr(phase.goal);
    goalInput.placeholder = t('phase_goal');
    goalInput.addEventListener('input', function () {
      phase.goal = goalInput.value;
    });
    block.appendChild(goalInput);

    const criteriaInput = document.createElement('input');
    criteriaInput.value = tr(phase.criteria);
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
  if (docTooBig(coachRehab, coachMessage)) return;
  coachMessage.textContent = t('saving');
  try {
    await setDoc(doc(db, 'rehab', currentClient), coachRehab);
    setStatusMessage(coachMessage, t('saved_rehab'), 'success');
    notifyProgramChange('rehab', 'rehab');
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
    coachTarget().sections[key].push(exercise);
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

/* ---------- قوالب المدرب نفسه (myTemplates) ---------- */
/*
 * غير القوالب الجاهزة اللي جوه sports.js، أي مدرب أو متخصص يقدر يحفظ
 * اليوم اللي بناه كقالب باسمه ويرجعه لأي عميل تاني. بنخزّن في القالب
 * معرف التمرين في المكتبة (libId) مش الصورة نفسها — عشان المستند
 * مايكبرش، والصورة بتتجمّع من المكتبة وقت التحميل زي أي تمرين عادي.
 */
let myTemplates = [];
let myTemplatesLoaded = false;

const myTemplateForm = document.getElementById('my-template-form');
const myTemplateName = document.getElementById('my-template-name');
const myTemplateMessage = document.getElementById('my-template-message');
const saveDayTemplateBtn = document.getElementById('save-day-template-btn');
const deleteMyTemplateBtn = document.getElementById('delete-my-template-btn');

function templateTitle(tpl) {
  return (tpl && tpl[lang]) || (tpl && tpl.ar) || (tpl && tpl.en) || '';
}

function isMyTemplate(tpl) {
  return !!(tpl && tpl.custom && tpl.ownerEmail
    && tpl.ownerEmail.toLowerCase() === (currentProviderEmail || '').toLowerCase());
}

async function loadMyTemplates() {
  try {
    const snap = await getDocs(collection(db, 'myTemplates'));
    myTemplates = [];
    snap.forEach(function (docSnap) {
      const data = docSnap.data() || {};
      myTemplates.push({
        id: docSnap.id,
        custom: true,
        group: 'custom',
        ownerEmail: data.ownerEmail || '',
        ownerName: data.ownerName || '',
        ar: data.ar || data.en || '',
        en: data.en || data.ar || '',
        note: data.note || null,
        sections: data.sections || {}
      });
    });
    myTemplates.sort(function (a, b) { return templateTitle(a).localeCompare(templateTitle(b)); });
    myTemplatesLoaded = true;
  } catch (error) {
    // مش مشكلة تمنع الشغل — القوالب الجاهزة تفضل شغالة عادي
    myTemplates = [];
    myTemplatesLoaded = false;
  }
}

function templateById(id) {
  const built = SPORT_TEMPLATES.filter(function (item) { return item.id === id; })[0];
  if (built) return built;
  return myTemplates.filter(function (item) { return item.id === id; })[0] || null;
}

function addTemplateGroup(label, list) {
  if (!list.length) return;
  const group = document.createElement('optgroup');
  group.label = label;
  list.forEach(function (tpl) {
    const option = document.createElement('option');
    option.value = tpl.id;
    option.textContent = templateTitle(tpl)
      + (tpl.custom && !isMyTemplate(tpl) && tpl.ownerName ? ' — ' + tpl.ownerName : '');
    group.appendChild(option);
  });
  sportTemplatePick.appendChild(group);
}

function fillSportTemplatePicker() {
  const keep = sportTemplatePick.value;
  sportTemplatePick.innerHTML = '';

  const none = document.createElement('option');
  none.value = '';
  none.textContent = t('pick_sport_template');
  sportTemplatePick.appendChild(none);

  const mine = myTemplates.filter(isMyTemplate);
  const others = myTemplates.filter(function (tpl) { return !isMyTemplate(tpl); });

  addTemplateGroup(t('my_templates_group'), mine);
  addTemplateGroup(t('ready_templates_group'), templatesForSport(coachSport.value));
  addTemplateGroup(t('other_coaches_templates_group'), others);

  sportTemplatePick.value = keep;
  refreshMyTemplateButtons();
}

function refreshMyTemplateButtons() {
  if (!deleteMyTemplateBtn) return;
  const tpl = templateById(sportTemplatePick.value);
  deleteMyTemplateBtn.classList.toggle('hidden', !isMyTemplate(tpl));
}

/* تحويل اليوم المفتوح لقالب قابل للحفظ — من غير صور عشان حجم المستند */
function currentDayAsTemplateSections() {
  const out = {};
  let count = 0;
  SECTION_KEYS.forEach(function (key) {
    const list = (coachWeek[coachDay] && coachTarget().sections[key]) || [];
    out[key] = list.map(function (ex) {
      const entry = ex.libId ? libraryEntryById(ex.libId) : null;
      count++;
      return {
        libId: ex.libId || '',
        name: ex.name || '',
        en: entry ? (entry.name && entry.name.en ? entry.name.en : '') : '',
        sets: ex.sets || 3,
        reps: ex.reps || '',
        rest: ex.rest || '',
        load: ex.load || '',
        rpe: ex.rpe || '',
        tempo: ex.tempo || ''
      };
    });
  });
  return { sections: out, count: count };
}

if (saveDayTemplateBtn) {
  saveDayTemplateBtn.addEventListener('click', function () {
    myTemplateMessage.textContent = '';
    const built = currentDayAsTemplateSections();
    if (!built.count) {
      myTemplateMessage.textContent = t('template_day_empty');
      return;
    }
    myTemplateForm.classList.remove('hidden');
    myTemplateName.value = (coachWeek[coachDay] && coachTarget().title) || '';
    myTemplateName.focus();
  });
}

if (document.getElementById('my-template-cancel-btn')) {
  document.getElementById('my-template-cancel-btn').addEventListener('click', function () {
    myTemplateForm.classList.add('hidden');
    myTemplateMessage.textContent = '';
  });
}

if (document.getElementById('my-template-save-btn')) {
  document.getElementById('my-template-save-btn').addEventListener('click', async function () {
    const name = myTemplateName.value.trim();
    if (!name) {
      myTemplateMessage.textContent = t('template_needs_name');
      return;
    }
    saveCurrentDay();
    const built = currentDayAsTemplateSections();
    if (!built.count) {
      myTemplateMessage.textContent = t('template_day_empty');
      return;
    }

    const payload = {
      ownerEmail: (currentProviderEmail || '').toLowerCase(),
      ownerName: (currentProviderData && currentProviderData.name) || '',
      ar: name,
      en: name,
      sections: built.sections,
      createdAt: new Date().toISOString()
    };

    if (docTooBig(payload, myTemplateMessage)) return;

    myTemplateMessage.textContent = t('saving');
    try {
      const ref = await addDoc(collection(db, 'myTemplates'), payload);
      myTemplates.push(Object.assign({ id: ref.id, custom: true, group: 'custom' }, payload));
      myTemplates.sort(function (a, b) { return templateTitle(a).localeCompare(templateTitle(b)); });
      fillSportTemplatePicker();
      sportTemplatePick.value = ref.id;
      refreshMyTemplateButtons();
      myTemplateForm.classList.add('hidden');
      myTemplateName.value = '';
      myTemplateMessage.textContent = fill('template_saved', { name: name, count: built.count });
    } catch (error) {
      myTemplateMessage.textContent = t('problem') + error.message;
    }
  });
}

if (deleteMyTemplateBtn) {
  deleteMyTemplateBtn.addEventListener('click', async function () {
    const tpl = templateById(sportTemplatePick.value);
    if (!isMyTemplate(tpl)) return;
    myTemplateMessage.textContent = t('saving');
    try {
      await deleteDoc(doc(db, 'myTemplates', tpl.id));
      myTemplates = myTemplates.filter(function (item) { return item.id !== tpl.id; });
      sportTemplatePick.value = '';
      fillSportTemplatePicker();
      myTemplateMessage.textContent = fill('template_deleted', { name: templateTitle(tpl) });
    } catch (error) {
      myTemplateMessage.textContent = t('problem') + error.message;
    }
  });
}

sportTemplatePick.addEventListener('change', refreshMyTemplateButtons);

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

  const tpl = templateById(id);
  if (!tpl) return;

  saveCurrentDay();

  /*
   * قوالب التمرين مكتوبة بالاسم الإنجليزي بس من غير صور ولا تفاصيل.
   * قبل كده كنا بنحاول نجيب الصورة بـ findLibraryImage، وده بقى مش
   * بيرجّع حاجة خالص من يوم ما المكتبة بقت محلية (exercise-library.js
   * مفيهاش حقل images أصلاً) — فالتمارين الجاية من قالب كانت بتتضاف
   * من غير أي صورة. دلوقتي بنطابق كل تمرين باسمه الإنجليزي على مكتبة
   * التمارين، وناخد منه الاسم العربي وصورته والعضلات وطريقة الأداء —
   * بالظبط زي ما لو المدرب ضافه بإيده من المكتبة.
   */
  coachMessage.textContent = t('matching_images');
  await ensureLibraryImagesLoaded();
  // نضمن إن المكتبة الكبيرة (بصورها) متحمّلة قبل المطابقة، حتى لو المدرب
  // ما فتحش شاشة المكتبة في الجلسة دي
  await ensureRemoteLibrary();
  // قوالب كتير بقت بتشاور على تمارين الفهرس الموسّع بالمعرّف
  await ensureExtraLibrary();
  await ensureExerciseDetails();

  SECTION_KEYS.forEach(function (key) {
    const list = tpl.sections[key] || [];
    list.forEach(function (source) {
      const fromIndex = source.libId ? libraryEntryById(source.libId) : null;
      if (fromIndex && (fromIndex.src || fromIndex._rehab)) {
        prepLibEntry(fromIndex);
        coachTarget().sections[key].push(buildLibExercise(fromIndex, templateValues(source, fromIndex._type)));
        return;
      }
      /*
       * قالب جاهز فيه الاسم الإنجليزي بس، أما قالب المدرب نفسه فبيحفظ
       * libId — فبنجيب التمرين بالمعرف الأول وده أدق، ولو مش موجود
       * (تمرين المدرب كتبه بإيده) بنرجع للمطابقة بالاسم.
       */
      const match = (source.libId ? libraryEntryById(source.libId) : null)
        || matchLibraryExercise(source.en || source.name);
      const libPhoto = match ? libraryImageFor('exercise_' + match.id) : '';
      coachTarget().sections[key].push(makeExercise({
        libId: match ? match.id : '',
        name: match ? exerciseLibName(match) : (source.name || source.en),
        sets: source.sets,
        reps: source.reps,
        rest: source.rest || '',
        load: source.load || '',
        rpe: source.rpe || '',
        tempo: source.tempo || '',
        imageUrl: libPhoto,
        image: libPhoto ? '' : ((match && match.images && match.images.length) ? match.images[0] : findLibraryImage(source.en || source.name)),
        primaryMuscles: match ? musclesListText(match.primaryMuscles) : '',
        secondaryMuscles: match ? musclesListText(match.secondaryMuscles) : '',
        howTo: (match && match.howTo) ? (match.howTo[lang] || match.howTo.ar || match.howTo.en || '') : ''
      }));
    });
  });

  if (!coachTarget().title) {
    coachTarget().title = templateTitle(tpl);
  }

  showCoachDay();
  coachMessage.textContent = fill('sport_template_loaded', { day: days()[coachDay] })
    + (tpl.note ? ' — ' + (tpl.note[lang] || tpl.note.ar || '') : '');
});

/* ============================ المكتبة الجاهزة ============================ */

// المكتبة بقت محلية وثنائية اللغة (عربي/إنجليزي) من exercise-library.js —
// من غير أي اعتماد على الإنترنت أو مصدر خارجي، فبتشتغل فورًا ومترجمة كاملة
let libraryData = EXERCISE_LIBRARY;

const libSearch = document.getElementById('lib-search');
const libMuscle = document.getElementById('lib-muscle');
const libEquip = document.getElementById('lib-equip');
const libChips = document.getElementById('lib-chips');
let activeCategory = '';
let suggestedCategory = '';
let suggestedMuscle = '';
const libGrid = document.getElementById('lib-grid');
const libMessage = document.getElementById('lib-message');

/* ============ صور المكتبات (يرفعها المدرب/المختص بنفسه) ============ */
// المكتبات الجاهزة (تمارين/أكل/تأهيل) معندهاش صور حقيقية أصلًا —
// المجموعة دي في Firestore بتسمح لأي مدرب/مختص إنه يرفع صورة لأي عنصر
// (سواء جاهز أو مضاف حديثًا) بمعرف ثابت: exercise_<id> / food_<id> / rehab_<id>
let libraryImagesMap = {};
let libraryImagesLoaded = false;
let pendingLibraryImageKey = '';
const libImageInput = document.getElementById('lib-image-input');

async function ensureLibraryImagesLoaded() {
  if (libraryImagesLoaded) return;
  try {
    const snapshot = await getDocs(collection(db, 'libraryImages'));
    snapshot.forEach(function (docSnap) {
      libraryImagesMap[docSnap.id] = docSnap.data();
    });
    libraryImagesLoaded = true;
  } catch (error) {
    // هيفضل يعرض المكتبة من غير صور لو فشل التحميل
  }
}

function libraryImageFor(key) {
  return (libraryImagesMap[key] && libraryImagesMap[key].photo) || '';
}

function pickLibraryImage(key) {
  if (!libImageInput) return;
  pendingLibraryImageKey = key;
  libImageInput.value = '';
  libImageInput.click();
}

function setLibraryImageMessage(msg) {
  if (!libraryScreen.classList.contains('hidden')) { libMessage.textContent = msg; return; }
  if (typeof foodScreen !== 'undefined' && foodScreen && !foodScreen.classList.contains('hidden')) { foodMessage.textContent = msg; return; }
  if (typeof coachMessage !== 'undefined' && coachMessage) coachMessage.textContent = msg;
}

function refreshLibraryImageViews() {
  if (!libraryScreen.classList.contains('hidden')) renderLibrary();
  if (typeof foodScreen !== 'undefined' && foodScreen && !foodScreen.classList.contains('hidden')) renderFoodList();
  if (typeof updateTemplatePhotoPreview === 'function') updateTemplatePhotoPreview();
}

if (libImageInput) {
  libImageInput.addEventListener('change', async function () {
    const file = libImageInput.files[0];
    const key = pendingLibraryImageKey;
    libImageInput.value = '';
    if (!file || !key) return;

    if (file.size > MAX_SOURCE_BYTES) {
      setLibraryImageMessage(t('image_too_big'));
      return;
    }

    setLibraryImageMessage(t('preparing_image'));
    try {
      const compressed = await compressImage(file, IMAGE_MAX_SIDE, 0.7);
      await setDoc(doc(db, 'libraryImages', key), {
        photo: compressed,
        updatedAt: new Date().toISOString(),
        updatedBy: currentProviderEmail || ''
      }, { merge: true });
      libraryImagesMap[key] = { photo: compressed };
      setLibraryImageMessage(t('image_uploaded'));
      refreshLibraryImageViews();
    } catch (error) {
      setLibraryImageMessage(t('image_failed'));
    }
  });
}

// المكتبة المشتركة بتتفتح إما من برنامج عميل (تمرين/تأهيل) أو من كلاس —
// المتغير ده بيحدد لمين التمرين اللي هيتضاف لما نضغط على كارت في المكتبة
let libraryContext = 'coach';

function openLibrary() {
  libraryContext = 'coach';
  saveCurrentDay();
  if (coachMode === 'rehab') readRehabFields();
  // اقترح نوع التمرين حسب القسم اللي بتضيف فيه
  suggestedCategory = (coachMode !== 'rehab')
    ? (SECTION_DEFAULT_CATEGORY[targetSection.value] || '')
    : '';
  // العضلة اللي اختارها المدرب لليوم ده تبقى الفلتر الجاهز في المكتبة
  suggestedMuscle = (coachMode !== 'rehab' && coachMuscle) ? (coachMuscle.value || '') : '';
  showScreen(libraryScreen);
  loadLibrary();
}

document.getElementById('open-library-btn').addEventListener('click', function () {
  if (!guardLibrary('exercises', coachMessage)) return;
  openLibrary();
});
document.getElementById('rehab-library-btn').addEventListener('click', openLibrary);

document.getElementById('lib-back-btn').addEventListener('click', function () {
  if (libraryContext === 'class') {
    renderClassExercises(classExercisesList, currentClass, true);
    showScreen(classDetailScreen);
    return;
  }
  showScreen(coachScreen);
  if (coachMode === 'rehab') showRehab(); else showCoachDay();
});

/*
 * المكتبة الكبيرة (المصدر المفتوح free-exercise-db) — دي اللي فيها مئات
 * التمارين بصورها. المكتبة العربية المحلية (EXERCISE_LIBRARY) بتفضل هي
 * الأساس لأنها مترجمة ومشروحة بالعربي، وبنضيف عليها:
 *   1) صور التمارين العربية من المكتبة الكبيرة بمطابقة الاسم الإنجليزي
 *   2) باقي تمارين المكتبة الكبيرة اللي مش موجودة عندنا (بالإنجليزي بصورها)
 * الشاشة بتفتح فورًا بالعربي من غير انتظار، والباقي بيتضاف لما التحميل يخلص.
 * لو النت فشل بتفضل المكتبة العربية شغالة عادي.
 */
let remoteLibraryState = 'idle';   // idle | loading | done

function remoteLibraryId(name) {
  return 'db_' + String(name).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function mergeRemoteLibrary(remote) {
  if (!Array.isArray(remote) || !remote.length) return;

  // فهرس بالاسم الإنجليزي المبسّط عشان المطابقة تبقى سريعة
  const localByName = {};
  baseLibrary().forEach(function (exercise) {
    const enName = (exercise.name && exercise.name.en) ? normaliseName(exercise.name.en) : '';
    if (enName) localByName[enName] = exercise;
  });

  const merged = [];

  remote.forEach(function (item) {
    if (!item || !item.name || !item.primaryMuscles) return;
    const key = normaliseName(item.name);
    const local = localByName[key];

    if (local) {
      // تمرين عربي عندنا بنفس الاسم — ناخد صورته بس ونسيب الترجمة زي ما هي
      if (item.images && item.images.length && !local.images) local.images = item.images;
      return;
    }

    merged.push({
      id: remoteLibraryId(item.name),
      name: { ar: '', en: item.name },
      category: item.category || 'strength',
      equipment: item.equipment || 'other',
      primaryMuscles: item.primaryMuscles || [],
      secondaryMuscles: item.secondaryMuscles || [],
      howTo: { ar: '', en: (item.instructions || []).join(' ') },
      images: item.images || []
    });
  });

  remoteLeftovers = merged;
  rebuildLibraryData();

  /*
   * مرحلة تانية: التمارين العربية اللي اسمها الإنجليزي مش مطابق حرفيًا
   * لاسم في المكتبة الكبيرة (زي "Barbell Bench Press" مقابل
   * "Barbell Bench Press - Medium Grip") — بندوّرلها بمطابقة تقريبية
   * عشان تاخد صورتها هي كمان بدل ما تفضل من غير صورة
   */
  EXERCISE_LIBRARY.forEach(function (exercise) {
    if (exercise.images && exercise.images.length) return;
    const enName = (exercise.name && exercise.name.en) ? exercise.name.en : '';
    if (!enName) return;
    const path = findLibraryImage(enName);
    if (path) exercise.images = [path];
  });

  /*
   * مرحلة تالتة: تمارين اسمها عندنا مختلف تمامًا عن اسمها في المكتبة
   * الكبيرة (زي "Battle Ropes" اللي اسمها هناك "Battling Ropes")، فلا
   * المطابقة الحرفية ولا التقريبية بتلاقيها. الأسماء البديلة مكتوبة
   * في EXERCISE_IMAGE_ALIASES تحت، وكل واحد منها اتأكدنا إن صورته
   * فعلاً بتوصف نفس الحركة — مش مجرد اسم قريب
   */
  Object.keys(EXERCISE_IMAGE_ALIASES).forEach(function (localName) {
    const exercise = EXERCISE_LIBRARY.filter(function (item) {
      return item.name && item.name.en === localName;
    })[0];
    if (!exercise || (exercise.images && exercise.images.length)) return;
    const aliases = EXERCISE_IMAGE_ALIASES[localName];
    for (let i = 0; i < aliases.length; i++) {
      const path = findLibraryImage(aliases[i]);
      if (path) { exercise.images = [path]; return; }
    }
  });
}

/*
 * أسماء بديلة عشان التمرين ياخد صورته من المكتبة الكبيرة.
 * المفتاح = الاسم الإنجليزي عندنا، القيمة = اسمه في المكتبة الكبيرة.
 * التمارين اللي مش موجودة أصلًا هناك (زي Bird Dog و Wall Sit و
 * Hollow Body Hold) سايبينها من غير بديل — أحسن ما نحطّ لها صورة
 * لحركة تانية تغلّط المدرب أو العميل.
 */
const EXERCISE_IMAGE_ALIASES = {
  'Overhead Barbell Press': ['Standing Military Press', 'Seated Barbell Military Press'],
  'Barbell Back Squat': ['Barbell Squat', 'Barbell Full Squat'],
  'Bulgarian Split Squat': ['Split Squat with Dumbbells', 'Split Squats'],
  'Cable Woodchopper': ['Standing Cable Wood Chop'],
  'Ab Wheel Rollout': ['Barbell Ab Rollout - On Knees', 'Barbell Ab Rollout'],
  'Rowing Machine': ['Rowing, Stationary'],
  'Stair Climber': ['Stairmaster'],
  'Cross-Body Shoulder Stretch': ['Shoulder Stretch'],
  'Cat-Cow': ['Cat Stretch'],
  "Farmer's Carry": ["Farmer's Walk"],
  'Cable Pull-Through': ['Pull Through'],
  'Band Lateral Walk': ['Monster Walk'],
  'Seated Machine Shoulder Press': ['Machine Shoulder (Military) Press'],
  'Standing Machine Calf Raise': ['Smith Machine Calf Raise', 'Rocking Standing Calf Raise'],
  'Battle Ropes': ['Battling Ropes'],
  'Nordic Hamstring Curl': ['Natural Glute Ham Raise', 'Glute Ham Raise'],
  'Copenhagen Plank': ['Side Bridge'],
  'Interval Running': ['Running, Treadmill'],
  'Sprint Intervals': ['Wind Sprints'],
  'Shuttle Run': ['Single-Cone Sprint Drill'],
  'Adductor Stretch': ['Adductor/Groin', 'Adductor']
};

/*
 * المكتبة الكبيرة (876 تمرين بصورهم) بتتحمّل من مصدر خارجي على النت.
 * المصدر ده ممكن يرفض الطلب لو اتفتح كتير من نفس الشبكة (429) أو لو
 * النت واقع — ووقتها كانت التمارين بتظهر من غير صور خالص. عشان كده
 * بنحتفظ بنسخة في المتصفح لمدة أسبوع: أول فتح بيجيبها من النت ويخزّنها،
 * وبعد كده بتفتح فورًا من التخزين المحلي من غير أي طلب.
 */
const REMOTE_LIB_CACHE_KEY = 'adam-exercise-db-v1';
const REMOTE_LIB_CACHE_MS = 7 * 24 * 60 * 60 * 1000;

function readRemoteLibraryCache() {
  try {
    const raw = localStorage.getItem(REMOTE_LIB_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items) || !parsed.savedAt) return null;
    if (Date.now() - parsed.savedAt > REMOTE_LIB_CACHE_MS) return null;
    return parsed.items;
  } catch (error) {
    return null;
  }
}

function writeRemoteLibraryCache(remote) {
  try {
    // بنخزّن الحقول اللي بنستعملها بس عشان الحجم يفضل صغير
    const trimmed = remote.map(function (item) {
      return {
        name: item.name,
        category: item.category,
        equipment: item.equipment,
        primaryMuscles: item.primaryMuscles,
        secondaryMuscles: item.secondaryMuscles,
        instructions: item.instructions,
        images: item.images
      };
    });
    localStorage.setItem(REMOTE_LIB_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), items: trimmed }));
  } catch (error) {
    // مساحة المتصفح مليانة — مش مشكلة، هنجيبها من النت المرة الجاية
  }
}

async function ensureRemoteLibrary() {
  if (remoteLibraryState !== 'idle') return;
  remoteLibraryState = 'loading';

  const cached = readRemoteLibraryCache();
  if (cached) {
    mergeRemoteLibrary(cached);
    remoteLibraryState = 'done';
    if (!libraryScreen.classList.contains('hidden')) {
      rebuildLibraryFilters();
      renderLibrary();
    }
    return;
  }

  try {
    const response = await fetch(LIBRARY_URL);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const remote = await response.json();
    mergeRemoteLibrary(remote);
    writeRemoteLibraryCache(remote);
    remoteLibraryState = 'done';
    if (!libraryScreen.classList.contains('hidden')) {
      rebuildLibraryFilters();
      renderLibrary();
    }
  } catch (error) {
    // مفيش نت أو المصدر مش متاح — المكتبة العربية المحلية بتفضل شغالة
    remoteLibraryState = 'idle';
  }
}

function loadLibrary() {
  // بتظهر فورًا بالعربي أو الإنجليزي حسب لغة الموقع الحالية
  rebuildLibraryFilters();
  libMessage.textContent = '';
  renderLibrary();
  // نجيب صور المكتبات (لو اتضافت) ونعيد الرسم لما توصل
  ensureLibraryImagesLoaded().then(function () {
    if (!libraryScreen.classList.contains('hidden')) renderLibrary();
  });
  // الفهرس الموسّع (+٧٠٠ تمرين بالعربي ورسومهم) — أول ما يوصل نعيد الرسم
  ensureExtraLibrary().then(function () {
    if (!libraryScreen.classList.contains('hidden')) {
      rebuildLibraryFilters();
      renderLibrary();
    }
  });
  // وبعدين نضم المكتبة الكبيرة بصورها فوقها
  ensureRemoteLibrary();
}

function rebuildLibraryFilters() {
  if (!libraryData) return;
  libraryData.forEach(prepLibEntry);

  const keepMuscle = libMuscle.value;
  const keepEquip = libEquip.value;
  const levelSel = document.getElementById('lib-level');
  const keepLevel = levelSel ? levelSel.value : '';

  const keepCategory = activeCategory;
  const muscles = [];
  const equipment = [];
  const present = {};

  libraryData.forEach(function (exercise) {
    (exercise.primaryMuscles || []).forEach(function (muscle) {
      if (muscles.indexOf(muscle) === -1) muscles.push(muscle);
    });
    if (exercise.equipment && equipment.indexOf(exercise.equipment) === -1) {
      equipment.push(exercise.equipment);
    }
    if (exercise._g) present[exercise._g] = true;
  });
  // ترتيب ثابت للأقسام بدل الترتيب الأبجدي — القوة الأول والتأهيل في الآخر
  const categories = LIB_GROUP_ORDER.filter(function (g) { return present[g]; });

  libMuscle.innerHTML = '';
  libEquip.innerHTML = '';

  if (suggestedCategory && categories.indexOf(suggestedCategory) !== -1) {
    activeCategory = suggestedCategory;
    libActiveSub = '';
    suggestedCategory = '';
  } else if (categories.indexOf(keepCategory) === -1) {
    activeCategory = '';
    libActiveSub = '';
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

  if (levelSel) {
    levelSel.innerHTML = '';
    [['', t('lib_all_levels')], ['1', t('level_1')], ['2', t('level_2')], ['3', t('level_3')]].forEach(function (o) {
      const op = document.createElement('option');
      op.value = o[0];
      op.textContent = o[1];
      levelSel.appendChild(op);
    });
    levelSel.value = keepLevel;
  }

  // "مناسب للعميل" بيظهر بس لو العميل عنده حالة صحية مسجّلة
  const safeBtn = document.getElementById('lib-safe-only');
  if (safeBtn) {
    const has = clientCautionKeys().length > 0;
    safeBtn.classList.toggle('hidden', !has);
    if (!has) { libSafeOnly = false; safeBtn.classList.remove('active'); }
  }

  // لو المدرب اختار عضلة مستهدفة قبل ما يفتح المكتبة، بنفلتر عليها
  if (suggestedMuscle && muscles.indexOf(suggestedMuscle) !== -1) {
    libMuscle.value = suggestedMuscle;
    suggestedMuscle = '';
  } else {
    libMuscle.value = keepMuscle;
  }
  libEquip.value = keepEquip;
}

const CATEGORY_ICON_PATHS = {
  '': '<rect x="4" y="4" width="7" height="7" rx="1.5"></rect><rect x="13" y="4" width="7" height="7" rx="1.5"></rect><rect x="4" y="13" width="7" height="7" rx="1.5"></rect><rect x="13" y="13" width="7" height="7" rx="1.5"></rect>',
  'strength': '<rect x="2" y="9" width="3" height="6" rx="1"></rect><rect x="19" y="9" width="3" height="6" rx="1"></rect><line x1="5" y1="12" x2="19" y2="12"></line><rect x="6" y="7" width="2.5" height="10" rx="1"></rect><rect x="15.5" y="7" width="2.5" height="10" rx="1"></rect>',
  'stretching': '<circle cx="12" cy="4.5" r="2"></circle><line x1="12" y1="6.5" x2="12" y2="13"></line><line x1="12" y1="8.5" x2="6" y2="6"></line><line x1="12" y1="8.5" x2="18" y2="6"></line><line x1="12" y1="13" x2="7" y2="20"></line><line x1="12" y1="13" x2="17" y2="20"></line>',
  'cardio': '<circle cx="15" cy="4.5" r="2"></circle><line x1="14" y1="6.5" x2="10" y2="11"></line><line x1="10" y1="11" x2="13" y2="14"></line><line x1="13" y1="14" x2="11" y2="20"></line><line x1="10" y1="11" x2="5" y2="9"></line><line x1="13" y1="14" x2="18" y2="16"></line><line x1="14" y1="6.5" x2="18" y2="8"></line>',
  'plyometrics': '<path d="M13 2 5 13h6l-1 9 9-12h-6z"></path>',
  'powerlifting': '<path d="M5 15c0-4.5 2.5-8 6-8 2 0 3.5 1.5 3.5 3.5 0 1.2-.5 2.2-1.3 2.9 2.5.3 4.3 2.3 4.3 5.1 0 1.4-.5 2.5-1.5 2.5H8c-1.7 0-3-1.3-3-3v-3z"></path>',
  'strongman': '<path d="M4.5 16.5 6 11l4-2.5 4.5 1L18 6l3 5-2 8.5H5z"></path>',
  'olympic weightlifting': '<line x1="4" y1="12" x2="20" y2="12"></line><rect x="2" y="8" width="3" height="8" rx="1"></rect><rect x="19" y="8" width="3" height="8" rx="1"></rect><rect x="5.5" y="9.5" width="2.5" height="5" rx="0.8"></rect><rect x="16" y="9.5" width="2.5" height="5" rx="0.8"></rect>'
};

const CATEGORY_ICON_DEFAULT = '<circle cx="12" cy="12" r="8"></circle>';

function categoryIconSvg(key) {
  const inner = CATEGORY_ICON_PATHS[key] || CATEGORY_ICON_DEFAULT;
  return '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
}

function renderCategoryChips(categories) {
  libChips.innerHTML = '';

  const all = [''].concat(categories);

  all.forEach(function (key) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip' + (key === activeCategory ? ' active' : '');

    const icon = document.createElement('span');
    icon.className = 'inline-icon';
    icon.innerHTML = categoryIconSvg(key);
    chip.appendChild(icon);

    const label = document.createElement('span');
    label.textContent = key === '' ? t('all_categories') : categoryName(key);
    chip.appendChild(label);

    chip.addEventListener('click', function () {
      activeCategory = key;
      libActiveSub = '';
      resetLibPage();
      renderCategoryChips(categories);
      renderLibrary();
    });
    libChips.appendChild(chip);
  });
  renderSubChips();
}

/* الأقسام الفرعية بتظهر تحت أول ما تختار قسم (صدر، ضهر… أو ركبة، كاحل…) */
function renderSubChips() {
  const box = document.getElementById('lib-subchips');
  if (!box) return;
  box.innerHTML = '';
  if (!activeCategory || !libraryData) { box.classList.add('hidden'); return; }
  const present = {};
  libraryData.forEach(function (ex) { if (ex._g === activeCategory && ex._s) present[ex._s] = true; });
  const subs = Object.keys(SUBCATS[activeCategory] || {}).filter(function (k) { return present[k]; });
  if (!subs.length) { box.classList.add('hidden'); return; }
  box.classList.remove('hidden');
  [''].concat(subs).forEach(function (key) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip small' + (key === libActiveSub ? ' active' : '');
    chip.setAttribute('data-sub', key);
    chip.textContent = key ? subName(activeCategory, key) : t('all_categories');
    chip.addEventListener('click', function () {
      libActiveSub = key;
      resetLibPage();
      renderSubChips();
      renderLibrary();
    });
    box.appendChild(chip);
  });
}

/*
 * المكتبة كانت بتعرض ٦٠ وبس، وتكتب "٦٠ من ١٨٠" من غير أي طريقة
 * توصل للباقي — يعني تلتين المكتبة كانوا مدفونين. دلوقتي فيه زرار
 * بيزوّد ٦٠ كمان، والعداد بيرجع من الأول مع أي فلتر أو بحث جديد
 */
const LIB_PAGE = 60;
let libShown = LIB_PAGE;

function resetLibPage() { libShown = LIB_PAGE; }

function renderLibrary() {
  if (!libraryData) return;

  const term = libSearch.value.trim();
  const muscle = libMuscle.value;
  const equip = libEquip.value;
  const category = activeCategory;
  const levelSel = document.getElementById('lib-level');
  const level = levelSel ? levelSel.value : '';
  const tokens = term ? libQueryTokens(term) : [];
  const avoid = libSafeOnly ? clientCautionKeys() : [];

  const scored = [];
  libraryData.forEach(function (exercise, index) {
    prepLibEntry(exercise);
    if (category && exercise._g !== category) return;
    if (libActiveSub && exercise._s !== libActiveSub) return;
    if (muscle && (exercise.primaryMuscles || []).indexOf(muscle) === -1) return;
    if (equip && exercise.equipment !== equip) return;
    if (level && String(exercise.level || '') !== level) return;
    if (libMediaOnly && !exercise._media && !(exercise.images && exercise.images.length) && !libraryImageFor('exercise_' + exercise.id)) return;
    if (avoid.length && (exercise.cautions || []).some(function (k) { return avoid.indexOf(k) !== -1; })) return;
    let score = 0;
    if (tokens.length) {
      // كل كلمة لازم تلاقي نفسها (أو مرادف ليها) في الاسم أو العضلة أو الأداة
      for (let i = 0; i < tokens.length; i++) {
        const inName = tokens[i].some(function (w) { return exercise._nameN.indexOf(w) !== -1; });
        const inAny = inName || tokens[i].some(function (w) { return exercise._search.indexOf(w) !== -1; });
        if (!inAny) return;
        score += inName ? 10 : 1;
      }
      const q = normAr(term);
      if (exercise._nameN.indexOf(q) === 0) score += 30;
      else if (exercise._nameN.indexOf(q) !== -1) score += 15;
    }
    scored.push({ ex: exercise, score: score, index: index });
  });
  if (tokens.length) scored.sort(function (a, b) { return (b.score - a.score) || (a.index - b.index); });
  const matches = scored.map(function (row) { return row.ex; });

  libGrid.innerHTML = '';
  const shown = matches.slice(0, libShown);

  shown.forEach(function (exercise) {
    const card = document.createElement('div');
    card.className = 'ex-card';
    card.setAttribute('data-id', exercise.id);

    const libImageKey = 'exercise_' + exercise.id;
    const libPhoto = libraryImageFor(libImageKey);
    const shot = document.createElement('div');
    shot.className = 'ex-shot';
    const src = libPhoto || exercise._media || ((exercise.images && exercise.images.length) ? IMAGE_BASE + exercise.images[0] : '');

    if (src) {
      const image = document.createElement('img');
      image.src = src;
      image.alt = '';
      image.loading = 'lazy';
      shot.appendChild(image);
      if (!libPhoto && exercise._media) shot.classList.add('drawn');
      if (!libPhoto && exercise._frames === 2) {
        const badge = document.createElement('span');
        badge.className = 'anim-badge';
        badge.title = t('exs_animated');
        badge.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="8 5 19 12 8 19 8 5"></polygon></svg>';
        shot.appendChild(badge);
      }
      if (libraryContext !== 'class') {
        const editBadge = document.createElement('button');
        editBadge.type = 'button';
        editBadge.className = 'photo-edit-badge';
        editBadge.title = t('change_photo');
        editBadge.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="15" rx="2"></rect><circle cx="8.5" cy="10" r="1.7"></circle><path d="M4 17l5-5 3.5 3.5L16 12l4 5"></path></svg>';
        editBadge.addEventListener('click', function (event) {
          event.stopPropagation();
          pickLibraryImage(libImageKey);
        });
        shot.appendChild(editBadge);
      }
    } else {
      shot.classList.add('no-photo');
      shot.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="15" rx="2"></rect><circle cx="8.5" cy="10" r="1.7"></circle><path d="M4 17l5-5 3.5 3.5L16 12l4 5"></path></svg><span>' + t('add_photo_short') + '</span>';
      shot.addEventListener('click', function (event) {
        event.stopPropagation();
        pickLibraryImage(libImageKey);
      });
    }

    card.appendChild(shot);

    const body = document.createElement('div');
    body.className = 'ex-body';

    const name = document.createElement('div');
    name.className = 'ex-name';
    name.textContent = exerciseLibName(exercise);

    const meta = document.createElement('div');
    meta.className = 'ex-meta';
    const muscles = musclesListText(exercise.primaryMuscles);
    const subText = subName(exercise._g, exercise._s);
    meta.textContent = [muscles || subText, exercise.equipment && exercise.equipment !== 'other' ? equipName(exercise.equipment) : '']
      .filter(Boolean).join(' · ');

    body.appendChild(name);
    body.appendChild(meta);

    if (exercise.level) {
      const lvl = document.createElement('div');
      lvl.className = 'ex-level lvl-' + exercise.level;
      lvl.textContent = libLevelText(exercise.level);
      body.appendChild(lvl);
    }

    card.appendChild(body);

    // "+" إضافة سريعة بالأرقام الافتراضية — والضغط على الكارت نفسه بيفتح التفاصيل
    const quick = document.createElement('button');
    quick.type = 'button';
    quick.className = 'ex-quick-add';
    quick.title = t('quick_add');
    quick.setAttribute('aria-label', t('quick_add'));
    quick.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
    quick.addEventListener('click', function (event) {
      event.stopPropagation();
      quickAddLibExercise(exercise);
    });
    card.appendChild(quick);

    card.addEventListener('click', function () {
      openExerciseSheet(exercise);
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

  renderMoreBtn('lib-more-btn', libGrid, matches.length, shown.length, function () {
    libShown += LIB_PAGE;
    renderLibrary();
  });
}

/*
 * زرار "اعرض المزيد" — بيتحط تحت أي قايمة مقصوصة. بيتشال لوحده
 * لما يخلص الباقي، فمفيش زرار واقف مالوش لازمة
 */
function renderMoreBtn(id, afterEl, total, shownCount, onMore) {
  const old = document.getElementById(id);
  if (old) old.remove();
  if (total <= shownCount) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = id;
  btn.className = 'secondary more-btn';
  btn.textContent = fill('show_more_n', { n: Math.min(LIB_PAGE, total - shownCount) });
  btn.addEventListener('click', onMore);
  afterEl.parentNode.insertBefore(btn, afterEl.nextSibling);
}

libSearch.addEventListener('input', function () { resetLibPage(); renderLibrary(); });
libMuscle.addEventListener('change', function () { resetLibPage(); renderLibrary(); });
libEquip.addEventListener('change', function () { resetLibPage(); renderLibrary(); });

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
const myHowTo = document.getElementById('my-howto');
const myGoal = document.getElementById('my-goal');
const myPrimary = document.getElementById('my-primary');
const mySecondary = document.getElementById('my-secondary');
const myOrigin = document.getElementById('my-origin');
const myInsertion = document.getElementById('my-insertion');
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

document.getElementById('open-mylib-btn').addEventListener('click', function () {
  if (!guardLibrary('exercises', coachMessage)) return;
  openMyLib();
});
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
    meta.textContent = muscleName(exercise.muscle) + ' · ' + equipName(exercise.equipment) +
      (exerciseHasAnatomyDetail(exercise) ? ' · ' + t('anatomy_section_title') : '');
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
    deleteButton.innerHTML = DELETE_ICON_SVG;
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
        imageUrl: exercise.imageUrl || '',
        howTo: exercise.howTo || '',
        goal: exercise.goal || '',
        primaryMuscles: exercise.primaryMuscles || '',
        secondaryMuscles: exercise.secondaryMuscles || '',
        origin: exercise.origin || '',
        insertion: exercise.insertion || '',
        injuryBenefit: exercise.injuryBenefit || ''
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
      howTo: myHowTo.value.trim(),
      goal: myGoal.value.trim(),
      primaryMuscles: myPrimary.value.trim(),
      secondaryMuscles: mySecondary.value.trim(),
      origin: myOrigin.value.trim(),
      insertion: myInsertion.value.trim(),
      imageUrl: pickedImage
    });

    myName.value = '';
    myNotes.value = '';
    myHowTo.value = '';
    myGoal.value = '';
    myPrimary.value = '';
    mySecondary.value = '';
    myOrigin.value = '';
    myInsertion.value = '';
    clearPickedImage();
    await loadMyLib();
    setStatusMessage(myLibMessage, t('mylib_saved'), 'success');
  } catch (error) {
    myLibMessage.textContent = t('problem') + error.message;
  }
});

/* ============================ شاشة العميل ============================ */

let clientWeek = emptyWeek();
let clientRehab = emptyRehab();
let clientDay = todayIndex;
/*
 * الجلسة اللي العميل بيتمرنها النهاردة فعلًا — مش لازم تكون خطة
 * النهاردة. اللي فاته تمرين الاتنين يقدر يعمله التلات، واللي عايز
 * يقدّم تمرين بكره يعمله النهاردة. الحياة مش بتمشي بجدول ثابت،
 * والبرنامج المفروض يمشي معاها مش العكس
 */
let sessionDay = todayIndex;
/* الحصة المعروضة في اليوم (لو اليوم فيه أكتر من حصة) */
let clientSession = 0;
let clientEmail = '';
let clientRecord = null;
let clientSport = '';
let clientName = '';
let doneToday = [];
let actualSetsToday = {};
/* السبحة: كام مجموعة خلّصها العميل في كل تمرين النهاردة { 'main:0': 3 } */
let setsDoneToday = {};
let rehabSetsDoneToday = {};
let rehabDoneToday = [];
let rehabActualSetsToday = {};
let progressHistory = [];
let clientMode = 'training';

const clientTraining = document.getElementById('client-training');
const clientRehabPanel = document.getElementById('client-rehab');
const ctabTraining = document.getElementById('ctab-training');
const ctabRehab = document.getElementById('ctab-rehab');
const clientTabs = document.getElementById('client-tabs');
const clientHomePanel = document.getElementById('client-home');
const homeHello = document.getElementById('home-hello');
const homeCards = document.getElementById('home-cards');
const homeTiles = document.getElementById('home-tiles');
const clientAppbar = document.getElementById('client-appbar');

const ctabConsult = document.getElementById('ctab-consult');
const ctabConsultBadge = document.getElementById('ctab-consult-badge');
const clientConsultPanel = document.getElementById('client-consult');
const clientConsultProvider = document.getElementById('client-consult-provider');
const clientConsultText = document.getElementById('client-consult-text');
const clientConsultSendBtn = document.getElementById('client-consult-send-btn');
const clientConsultMessage = document.getElementById('client-consult-message');
const clientConsultReplies = document.getElementById('client-consult-replies');
const clientConsultRequests = document.getElementById('client-consult-requests');

// فريق العميل (المدرب الأساسي + أي متخصص اختاره) بأسمائهم — بيتحمّل
// أول ما يفتح تبويب الاستشارة عشان نعرف نعرض الأسماء ونملا قائمة الاختيار
let clientConsultTeam = [];

const clientSections = document.getElementById('client-sections');
const dayName = document.getElementById('day-name');
const progress = document.getElementById('progress');
const dayVolumeEl = document.getElementById('day-volume');
const weekVolumeEl = document.getElementById('week-volume');
const finishButton = document.getElementById('finish');
const resetButton = document.getElementById('reset');

function setClientMode(mode) {
  clientMode = mode;
  clientHomePanel.classList.toggle('hidden', mode !== 'home');
  clientTraining.classList.toggle('hidden', mode !== 'training');
  clientRehabPanel.classList.toggle('hidden', mode !== 'rehab');
  clientNutritionPanel.classList.toggle('hidden', mode !== 'nutrition');
  clientActivityPanel.classList.toggle('hidden', mode !== 'activity');
  clientClassesPanel.classList.toggle('hidden', mode !== 'classes');
  clientStorePanel.classList.toggle('hidden', mode !== 'store');
  clientConsultPanel.classList.toggle('hidden', mode !== 'consult');
  ctabTraining.classList.toggle('active', mode === 'training');
  ctabRehab.classList.toggle('active', mode === 'rehab');
  ctabNutrition.classList.toggle('active', mode === 'nutrition');
  ctabActivity.classList.toggle('active', mode === 'activity');
  ctabClasses.classList.toggle('active', mode === 'classes');
  ctabStore.classList.toggle('active', mode === 'store');
  ctabConsult.classList.toggle('active', mode === 'consult');
  if (mode === 'home') renderClientHome();
  paintAppbar();
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

ctabStore.addEventListener('click', function () {
  setClientMode('store');
  showClientStore();
});

ctabConsult.addEventListener('click', function () {
  setClientMode('consult');
  loadClientConsult();
});


/* ============================================================
   شاشة العميل كأبليكيشن
   قبل كده كان فوق الشاشة سبع تابات، وتحتها شريط عايم بسبع زراير
   تانية — أربعتاشر باب مفتوح في وش العميل في نفس اللحظة. دلوقتي
   أربع أزرار تحت بس (الرئيسية · تمرين · تغذية · تأهيل)، والباقي
   كله جوه الرئيسية كمربعات. الشريط القديم والعايم سايبينهم مخفيين
   في الصفحة عشان كل الربط القديم يفضل شغال من غير ما نلمسه
   ============================================================ */

/* أيقونات مرسومة — مش إيموچي كيبورد. كل واحدة جواها مسارها بس،
   والـsvg نفسه بيتبني في iconSvg() */
const UI_ICONS = {
  home:      '<path d="M3 11.2 12 4l9 7.2"/><path d="M5.5 9.8V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.8"/><path d="M9.6 20v-5.2h4.8V20"/>',
  training:  '<rect x="2" y="9" width="3" height="6" rx="1"/><rect x="19" y="9" width="3" height="6" rx="1"/><line x1="5" y1="12" x2="19" y2="12"/><rect x="6" y="7" width="2.5" height="10" rx="1"/><rect x="15.5" y="7" width="2.5" height="10" rx="1"/>',
  nutrition: '<path d="M12 8.5c-2.8 0-5 2.3-5 5.8 0 3 2.1 5.7 4 5.7.8 0 1.2-.4 1.9-.4.7 0 1.1.4 1.9.4 1.7 0 3.7-2.4 3.9-5.1.2-2.7-1.5-4.6-3.4-5"/><path d="M12 8.5V6.3c0-.9.7-1.8 2-2"/>',
  rehab:     '<circle cx="8.6" cy="5.4" r="2.6"/><path d="M3.4 20.6c0-3.1 2.3-5.6 5.2-5.6s5.2 2.5 5.2 5.6"/><circle cx="16.8" cy="15" r="4.4"/><circle cx="16.8" cy="15" r="1.3"/>',
  store:     '<path d="M4 8l1.5-4h13L20 8"/><path d="M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M9 12a3 3 0 0 0 6 0"/>',
  profile:   '<circle cx="12" cy="8.2" r="3.6"/><path d="M4.8 20c0-4 3.2-7 7.2-7s7.2 3 7.2 7"/>',
  consult:   '<path d="M4 5.5C4 4.7 4.7 4 5.5 4h9L20 9.5V18.5c0 .8-.7 1.5-1.5 1.5h-13C4.7 20 4 19.3 4 18.5z"/><path d="M13 4v4.5a1 1 0 0 0 1 1H19"/><line x1="8" y1="12.5" x2="15" y2="12.5"/><line x1="8" y1="16" x2="13" y2="16"/>',
  activity:  '<circle cx="12" cy="15" r="4.5"/><path d="M9.5 11 7 4h3l2 6"/><path d="M14.5 11 17 4h-3l-2 6"/>',
  classes:   '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><line x1="3.5" y1="9.5" x2="20.5" y2="9.5"/><line x1="8" y1="3.2" x2="8" y2="6.4"/><line x1="16" y1="3.2" x2="16" y2="6.4"/><circle cx="12" cy="14.8" r="2.3"/>',
  chat:      '<path d="M4 5.5h16v10.5H9l-4 3.5v-3.5H4z"/><line x1="8" y1="9.5" x2="16" y2="9.5"/><line x1="8" y1="12.5" x2="13" y2="12.5"/>',
  injury:    '<circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="12" y1="16" x2="12" y2="16.01"/>',
  team:      '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14c2.5.3 4.5 2.3 4.5 6"/>',
  medlib:    '<path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5c-.8 0-1.5-.7-1.5-1.5z"/><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5c.8 0 1.5-.7 1.5-1.5z"/>',
  card:      '<rect x="3" y="5.5" width="18" height="13" rx="2"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="6.5" y1="14" x2="10.5" y2="14"/>',
  calc:      '<rect x="5" y="3" width="14" height="18" rx="2"/><line x1="8" y1="7.5" x2="16" y2="7.5"/><line x1="8.5" y1="12" x2="8.5" y2="12.01"/><line x1="12" y1="12" x2="12" y2="12.01"/><line x1="15.5" y1="12" x2="15.5" y2="12.01"/><line x1="8.5" y1="16" x2="8.5" y2="16.01"/><line x1="12" y1="16" x2="12" y2="16.01"/><line x1="15.5" y1="16" x2="15.5" y2="16.01"/>',
  progress:  '<polyline points="3 17 9 11 13 15 21 6"/><polyline points="15 6 21 6 21 12"/>',
  water:     '<path d="M12 3.2c3.4 4 6 7 6 10.2a6 6 0 0 1-12 0c0-3.2 2.6-6.2 6-10.2z"/>',
  clients:   '<circle cx="8.4" cy="8" r="3"/><path d="M2.6 19.5c0-3.2 2.6-5.8 5.8-5.8s5.8 2.6 5.8 5.8"/><circle cx="17" cy="9.2" r="2.3"/><path d="M15.6 14.1c2.5.3 4.4 2.3 4.4 5.4"/>',
  shield:    '<path d="M12 3l7 3v5.5c0 4.2-2.9 7.9-7 9-4.1-1.1-7-4.8-7-9V6z"/><polyline points="9 12 11 14 15 9.5"/>',
  gear:      '<circle cx="12" cy="12" r="3"/><path d="M19 12c0 .4 0 .8-.1 1.2l2 1.6-2 3.4-2.3-.9c-.6.5-1.3.9-2 1.2L14 21h-4l-.6-2.5c-.7-.3-1.4-.7-2-1.2l-2.3.9-2-3.4 2-1.6C5 12.8 5 12.4 5 12s0-.8.1-1.2l-2-1.6 2-3.4 2.3.9c.6-.5 1.3-.9 2-1.2L10 3h4l.6 2.5c.7.3 1.4.7 2 1.2l2.3-.9 2 3.4-2 1.6c.1.4.1.8.1 1.2z"/>',
  mail:      '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.6 7 8.4 6 8.4-6"/>',
  chart:     '<path d="M3 20h18"/><rect x="5" y="11" width="3.5" height="7" rx="1"/><rect x="10.25" y="7" width="3.5" height="11" rx="1"/><rect x="15.5" y="14" width="3.5" height="4" rx="1"/>',
  price:     '<path d="M20.5 12.6 12.4 20.7a2 2 0 0 1-2.8 0l-6.3-6.3a2 2 0 0 1-.6-1.6l.5-6a2 2 0 0 1 1.8-1.8l6-.5a2 2 0 0 1 1.6.6l6.3 6.3a2 2 0 0 1 0 2.8z"/><circle cx="8.4" cy="8.4" r="1.5"/>',
  box:       '<path d="M3.5 7.5 12 3.6l8.5 3.9v9L12 20.4 3.5 16.4z"/><path d="M3.5 7.5 12 11.4l8.5-3.9"/><line x1="12" y1="11.4" x2="12" y2="20.4"/>',
  star:      '<path d="m12 3.6 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.8l5.9-.9z"/>',
  lock:      '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/><circle cx="12" cy="15.4" r="1.4"/>',
  /* شعارات السوشيال بشكلها المعروف — مرسومة، مش إيموچي كيبورد */
  instagram: '<rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" stroke="none"/>',
  facebook:  '<path d="M13.6 21v-7.6h2.6l.4-3h-3V8.5c0-.9.25-1.5 1.5-1.5h1.6V4.3c-.3 0-1.25-.13-2.35-.13-2.32 0-3.9 1.42-3.9 4.02v2.2H7.8v3h2.65V21"/>',
  tiktok:    '<path d="M14.2 3.2v10.9a3.4 3.4 0 1 1-3.4-3.4c.34 0 .67.05.98.15"/><path d="M14.2 3.2c.35 2.4 2.1 4.1 4.6 4.35"/>',
  whatsapp:  '<path d="M3.6 20.4 5 16.5a7.7 7.7 0 1 1 2.9 2.85z"/><path d="M9.1 9c.3 1.4 1 2.6 2 3.6s2.2 1.7 3.6 2"/><path d="M9.1 9c-.2-.5-.6-.9-1.1-.8-.6.1-1.2.7-1.3 1.4"/><path d="M14.7 14.6c.5.2.9.6.8 1.1-.1.6-.7 1.2-1.4 1.3"/>',
  youtube:   '<rect x="2.6" y="5.4" width="18.8" height="13.2" rx="4"/><path d="M10.4 9.3 15.4 12l-5 2.7z"/>',
  search:    '<circle cx="10.8" cy="10.8" r="6.4"/><line x1="15.6" y1="15.6" x2="20.5" y2="20.5"/>',
  friend:    '<circle cx="8.4" cy="8" r="3"/><path d="M2.6 19.5c0-3.2 2.6-5.8 5.8-5.8s5.8 2.6 5.8 5.8"/><circle cx="17" cy="9.2" r="2.3"/><path d="M15.6 14.1c2.5.3 4.4 2.3 4.4 5.4"/>',
  sparkle:   '<path d="M12 3.4 13.7 9l5.6 1.7-5.6 1.7L12 18l-1.7-5.6L4.7 10.7 10.3 9z"/><path d="M18.4 3.2 19 5l1.8.6-1.8.6-.6 1.8-.6-1.8L16 5.6 17.8 5z"/>',
  /* حالات النوم */
  sleep_solid:  '<path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1z"/>',
  sleep_broken: '<path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1z"/><line x1="3.2" y1="20.8" x2="20.8" y2="3.2" stroke-width="2.2"/>',
  sleep_short:  '<circle cx="12" cy="13" r="7.8"/><path d="M12 9v4.2l2.8 1.7"/><path d="M9.2 2.6h5.6"/>',
  sleep_shifts: '<path d="M4.2 11.4a7.8 7.8 0 0 1 13.2-4.6l2.4 2.2"/><path d="M19.8 12.6a7.8 7.8 0 0 1-13.2 4.6L4.2 15"/><path d="M20 5.2v4h-4"/><path d="M4 18.8v-4h4"/>',
  /* ===== الحالات الصحية: أيقونات طبية مرسومة بدل الإيموچي ===== */
  drop:      '<path d="M12 3.2c3.4 4 6 7 6 10.2a6 6 0 0 1-12 0c0-3.2 2.6-6.2 6-10.2z"/>',
  glucose:   '<path d="M12 3.2c3.4 4 6 7 6 10.2a6 6 0 0 1-12 0c0-3.2 2.6-6.2 6-10.2z"/><path d="M9.4 13.4h5.2"/><path d="M12 10.8v5.2"/>',
  pulse:     '<path d="M3 12.2h3.6l2-5.4 3.2 10.8 2.2-7 1.6 3.4H21"/>',
  heart:     '<path d="M12 20.5s-7.5-4.6-7.5-9.7A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7.5 2.8c0 5.1-7.5 9.7-7.5 9.7z"/>',
  lungs:     '<path d="M12 3.5v9"/><path d="M12 9.5c-1.2-1-2.6-1.4-3.8-.5C6.6 10.1 5 13 5 16.2c0 2.5 1 4.3 2.7 4.3 1.6 0 2.6-1 3.1-2.6"/><path d="M12 9.5c1.2-1 2.6-1.4 3.8-.5C17.4 10.1 19 13 19 16.2c0 2.5-1 4.3-2.7 4.3-1.6 0-2.6-1-3.1-2.6"/>',
  ovary:     '<circle cx="8.6" cy="14.2" r="4.4"/><circle cx="8.6" cy="14.2" r="1.5"/><path d="M11.6 11 19 3.6"/><path d="M15.4 3.6H19v3.6"/>',
  thyroid:   '<path d="M7.6 8.2c-1 3.2.4 6.6 2.6 7.8 1.2.6 2.4.6 3.6 0 2.2-1.2 3.6-4.6 2.6-7.8"/><path d="M6.4 6.4h11.2"/><path d="M12 16.6v4"/>',
  kidney:    '<path d="M9.6 3.8c2.6 0 4.4 2.2 4.4 5.2 0 2.4-1.2 3.4-1.2 5.4 0 2.4 1.8 3.2 1.8 5"/><path d="M9.6 3.8C6.4 3.8 4 7 4 11.4S6.4 20 9.6 20c1.8 0 3.2-1 4-2.6"/>',
  liver:     '<path d="M4 8.4c3.4-2.6 9-3.4 13.4-2.2 2 .6 2.8 2 2.4 4-.6 3.2-3 6.8-6.4 8.4-2.6 1.2-5 .4-6.8-1.6C4.6 14.8 3.6 11.4 4 8.4z"/><path d="M9.4 6.6c.6 3.4 1.6 6.6 3.4 9.4"/>',
  spine:     '<path d="M12 3v18"/><path d="M8.8 5.4h6.4"/><path d="M8.8 9.2h6.4"/><path d="M8.8 13h6.4"/><path d="M8.8 16.8h6.4"/>',
  joint:     '<circle cx="7.4" cy="7.4" r="3"/><circle cx="16.6" cy="16.6" r="3"/><path d="M9.5 9.5l5 5"/>',
  bone:      '<path d="M6.4 17.6 17 7"/><circle cx="4.9" cy="19.1" r="2.1"/><circle cx="7.4" cy="20" r="2.1"/><circle cx="19.1" cy="4.9" r="2.1"/><circle cx="16.6" cy="4" r="2.1"/>',
  stomach:   '<path d="M8.6 3.6v5.2c0 2 1.2 3 2.8 3.4 3 .8 5.2 2.4 5.2 5 0 2.6-2.2 4.4-5 4.4-2.6 0-4.6-1.4-5.2-3.6"/><path d="M6.6 3.6h4"/>',
  toe:       '<path d="M6 20.4c-1-2.4-1.4-5-1.4-7.4C4.6 8 7.6 4 12 4s7.4 4 7.4 9c0 2.4-.4 5-1.4 7.4z"/><circle cx="16.4" cy="8.6" r="1.6"/>',
  bolt:      '<path d="M13.4 2.6 5.6 13.4h5.2l-1.2 8 7.8-10.8h-5.2z"/>',
  pregnant:  '<circle cx="11.4" cy="4.4" r="2.4"/><path d="M11.4 8c-1.8 0-3 1.4-3 3.4V21"/><path d="M11.4 10.4c2.6 0 4.6 1.8 4.6 4.2s-2 4.2-4.6 4.2"/>',
  baby:      '<path d="M7.4 9.6h9.2c0 4.6-2 8.4-4.6 8.4S7.4 14.2 7.4 9.6z"/><path d="M12 9.6V6.4a2.6 2.6 0 0 1 2.6-2.6"/><path d="M9 21h6"/>',
  seedling:  '<path d="M12 20.4v-7"/><path d="M12 13.4c0-3-2.2-5.4-5.2-5.4 0 3 2.2 5.4 5.2 5.4z"/><path d="M12 13.4c0-3.4 2.4-6 5.6-6 0 3.4-2.4 6-5.6 6z"/>',
  star:      '<path d="m12 3.6 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.8l5.9-.9z"/>',
  moon:      '<path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1z"/>',
  warning:   '<path d="M12 3.6 21.4 20H2.6L12 3.6z"/><line x1="12" y1="9.6" x2="12" y2="14.2"/><line x1="12" y1="16.8" x2="12" y2="16.82"/>',
  pill:      '<rect x="3.2" y="9" width="17.6" height="6" rx="3" transform="rotate(-38 12 12)"/><line x1="12" y1="8" x2="12" y2="16" transform="rotate(-38 12 12)"/>',
  check:     '<polyline points="4.5 12.6 9.6 17.4 19.5 6.8"/>',
  trash:     '<path d="M4.6 6.6h14.8"/><path d="M9.2 6.6V4.8h5.6v1.8"/><path d="M6.4 6.6 7.3 20h9.4l.9-13.4"/><line x1="10.2" y1="10" x2="10.5" y2="16.8"/><line x1="13.8" y1="10" x2="13.5" y2="16.8"/>',
  save:      '<path d="M5 4.5h11L19.5 8v11a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5z"/><path d="M8 4.5v5h7v-5"/><rect x="8" y="13" width="8" height="6.5"/>',
  gift:      '<rect x="3.4" y="8.4" width="17.2" height="4.2" rx="1"/><path d="M5 12.6V20h14v-7.4"/><line x1="12" y1="8.4" x2="12" y2="20"/><path d="M12 8.4C10.8 5.6 9.4 4 7.8 4a2.2 2.2 0 0 0 0 4.4z"/><path d="M12 8.4C13.2 5.6 14.6 4 16.2 4a2.2 2.2 0 0 1 0 4.4z"/>',
  graduate:  '<path d="M2.6 8.8 12 4.6l9.4 4.2L12 13z"/><path d="M6.6 10.6v4.6c0 1.6 2.4 2.8 5.4 2.8s5.4-1.2 5.4-2.8v-4.6"/><line x1="21.4" y1="8.8" x2="21.4" y2="14"/>',
  refresh:   '<path d="M4.2 11.4a7.8 7.8 0 0 1 13.2-4.6l2.4 2.2"/><path d="M19.8 12.6a7.8 7.8 0 0 1-13.2 4.6L4.2 15"/><path d="M20 5.2v4h-4"/><path d="M4 18.8v-4h4"/>',
  down:      '<line x1="12" y1="4.5" x2="12" y2="18"/><polyline points="6.5 12.5 12 18.5 17.5 12.5"/>',
  /* ===== الوجبات وأقسام التمرين وتصنيفات الأكل ===== */
  sunrise:   '<circle cx="12" cy="14.6" r="3.6"/><path d="M12 6.6V3.4"/><path d="M5.6 8.2 3.9 6.5"/><path d="M18.4 8.2l1.7-1.7"/><path d="M2.6 18.8h18.8"/>',
  plate:     '<circle cx="12" cy="12" r="7.6"/><circle cx="12" cy="12" r="3.4"/>',
  cup:       '<path d="M6.4 6.4h11.2l-1 13.2H7.4z"/><path d="M6.4 10.4h11.2"/>',
  flame:     '<path d="M12 21c3.6 0 6.2-2.4 6.2-5.8 0-4.2-4-5.6-3.4-10.2-2.2.9-4.4 3-4.4 5.6 0 1.4-.9 2.2-1.8 1.4-.6-.5-.9-1.4-.9-2.2-1.2 1.4-2 3.3-2 5.4C5.7 18.6 8.4 21 12 21z"/>',
  run:       '<circle cx="14.6" cy="4.8" r="2.1"/><path d="M8 21l2.8-5.2-2.4-2.8.9-4.6 3.9-1.4 3 2.7 3.2.9"/><path d="M10.8 15.8 15 17l1.6 4"/><path d="M8.6 9.6 5 10.8"/>',
  yoga:      '<circle cx="12" cy="4.6" r="2.1"/><path d="M12 8v5"/><path d="M4.6 10.4 12 13l7.4-2.6"/><path d="M12 13 8 20"/><path d="M12 13l4 7"/>',
  meat:      '<path d="M8.8 4.2c3.6 0 6.6 2.8 6.6 6.4 0 2.6-1.6 4.2-1.6 6.2 0 1.6 1 2.4 1 3.6"/><path d="M8.8 4.2C5.4 4.2 3 7.2 3 11.2s2.4 7.2 5.8 7.2c1.8 0 3.2-1 4-2.4"/>',
  bowl:      '<path d="M3.4 11.4h17.2c0 4.6-3.8 8.2-8.6 8.2S3.4 16 3.4 11.4z"/><path d="M8.4 8.4c0-1.6 1.6-2 1.6-3.4M12 8.4c0-1.6 1.6-2 1.6-3.4M15.6 8.4c0-1.6 1.6-2 1.6-3.4"/>',
  milk:      '<path d="M9 3h6v3.4l2 3.4V21H7V9.8l2-3.4z"/><path d="M7 12.6h10"/>',
  apple:     '<path d="M12 8.5c-2.8 0-5 2.3-5 5.8 0 3 2.1 5.7 4 5.7.8 0 1.2-.4 1.9-.4.7 0 1.1.4 1.9.4 1.7 0 3.7-2.4 3.9-5.1.2-2.7-1.5-4.6-3.4-5"/><path d="M12 8.5V6.3c0-.9.7-1.8 2-2"/>',
  salad:     '<path d="M3.6 12.6h16.8c0 4.2-3.8 7.4-8.4 7.4S3.6 16.8 3.6 12.6z"/><circle cx="9" cy="8.6" r="2.4"/><circle cx="14.4" cy="9.4" r="2"/>',
  nut:       '<path d="M12 3.6c4 0 7 3.4 7 7.6S16 20 12 20s-7-4.6-7-8.8 3-7.6 7-7.6z"/><path d="M12 5.6v13"/><path d="M8.4 9.2c1.6 1.2 2.6 2.6 3.6 4.4M15.6 9.2c-1.6 1.2-2.6 2.6-3.6 4.4"/>',
  target:    '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="1.2"/>',
  trophy:    '<path d="M7.6 4h8.8v4.6c0 2.6-2 4.6-4.4 4.6S7.6 11.2 7.6 8.6z"/><path d="M7.6 5.4H4.8v1.4c0 1.8 1.2 3 2.8 3.2M16.4 5.4h2.8v1.4c0 1.8-1.2 3-2.8 3.2"/><path d="M12 13.2V17"/><path d="M8.4 20h7.2"/>',
  phone:     '<path d="M6.2 3.6h3l1.6 4-2 1.6a12.4 12.4 0 0 0 6 6l1.6-2 4 1.6v3a2 2 0 0 1-2.2 2C10.6 19.4 4.6 13.4 4.2 5.8a2 2 0 0 1 2-2.2z"/>',
  close:     '<line x1="6.2" y1="6.2" x2="17.8" y2="17.8"/><line x1="17.8" y1="6.2" x2="6.2" y2="17.8"/>',
  ban:       '<circle cx="12" cy="12" r="8.4"/><line x1="6.1" y1="17.9" x2="17.9" y2="6.1"/>',
  doctor_kit: '<path d="M8 3v5.4a4 4 0 0 0 8 0V3"/><path d="M6.2 3h2.4M15.4 3h2.4"/><path d="M12 12.4v2.3a4.3 4.3 0 0 0 8.6 0v-1"/><circle cx="20.6" cy="9.6" r="2.2"/>',
  brain:      '<path d="M9 4.5c-2 0-3.5 1.5-3.5 3.3 0 .6.2 1.1.4 1.6-1 .5-1.7 1.6-1.7 2.8 0 1 .5 1.9 1.3 2.4-.2.4-.3.9-.3 1.4 0 2 1.7 3.5 3.7 3.3"/><path d="M9 4.5c0-1.3 1.1-2.5 2.5-2.5S14 3.2 14 4.5"/><path d="M15 4.5c2 0 3.5 1.5 3.5 3.3 0 .6-.2 1.1-.4 1.6 1 .5 1.7 1.6 1.7 2.8 0 1-.5 1.9-1.3 2.4.2.4.3.9.3 1.4 0 2-1.7 3.5-3.7 3.3"/><line x1="12" y1="4.5" x2="12" y2="19.5"/>'
};

function iconSvg(key, cls) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.7');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('class', cls || 'ui-icon');
  svg.innerHTML = UI_ICONS[key] || UI_ICONS.home;
  return svg;
}

/* ---------- الشريط السفلي ---------- */

const APPBAR_ITEMS = [
  { mode: 'home',      icon: 'home',      labelKey: 'nav_home' },
  { mode: 'training',  icon: 'training',  labelKey: 'tab_training' },
  { mode: 'nutrition', icon: 'nutrition', labelKey: 'tab_nutrition' },
  { mode: 'rehab',     icon: 'rehab',     labelKey: 'tab_rehab' }
];

function goClientMode(mode) {
  // بنعدّي على زراير الشريط القديم عشان كل التحميل المربوط بيها
  // يشتغل زي ما هو — مفيش منطق مكرر
  if (mode === 'home') { setClientMode('home'); return; }
  const btn = { training: ctabTraining, nutrition: ctabNutrition, rehab: ctabRehab }[mode];
  if (btn) btn.click();
}

function renderAppbar() {
  if (!clientAppbar) return;
  clientAppbar.innerHTML = '';
  APPBAR_ITEMS.forEach(function (item) {
    // التأهيل والتغذية بيظهروا بس لو العميل عنده برنامج منهم
    const source = { nutrition: ctabNutrition, rehab: ctabRehab }[item.mode];
    if (source && source.classList.contains('hidden')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'appbar-btn';
    btn.setAttribute('data-mode', item.mode);
    btn.appendChild(iconSvg(item.icon, 'appbar-icon'));
    const label = document.createElement('span');
    label.className = 'appbar-label';
    label.textContent = t(item.labelKey);
    btn.appendChild(label);
    btn.addEventListener('click', function () { goClientMode(item.mode); });
    clientAppbar.appendChild(btn);
  });
  paintAppbar();
}

function paintAppbar() {
  if (!clientAppbar) return;
  clientAppbar.querySelectorAll('.appbar-btn').forEach(function (btn) {
    btn.classList.toggle('on', btn.getAttribute('data-mode') === clientMode);
  });
}

/* ---------- مربعات الرئيسية ---------- */

const CLIENT_TILES = [
  { key: 'profile',  icon: 'profile',  labelKey: 'nav_profile',   btn: 'open-client-profile-btn' },
  { key: 'store',    icon: 'store',    labelKey: 'tab_store',     mode: 'store' },
  { key: 'consult',  icon: 'consult',  labelKey: 'tab_consult',   mode: 'consult', badge: 'ctab-consult-badge' },
  { key: 'chat',     icon: 'chat',     labelKey: 'nav_chat',      btn: 'open-chat-btn' },
  { key: 'activity', icon: 'activity', labelKey: 'tab_activity',  mode: 'activity' },
  { key: 'classes',  icon: 'classes',  labelKey: 'tab_classes',   mode: 'classes' },
  { key: 'progress', icon: 'progress', labelKey: 'nav_progress',  btn: 'open-progress-btn' },
  { key: 'team',     icon: 'team',     labelKey: 'nav_team',      btn: 'view-team-btn' },
  { key: 'injury',   icon: 'injury',   labelKey: 'nav_injury',    btn: 'report-injury-btn' },
  { key: 'medlib',   icon: 'medlib',   labelKey: 'nav_medlib',    btn: 'open-medlib-btn' },
  { key: 'calc',     icon: 'calc',     labelKey: 'nav_calc',      btn: 'open-calc-btn' },
  { key: 'sub',      icon: 'card',     labelKey: 'nav_sub',       btn: 'open-subscription-btn' }
];

function renderClientTiles() {
  if (!homeTiles) return;
  homeTiles.innerHTML = '';
  CLIENT_TILES.forEach(function (tile) {
    // لو الزرار الأصلي مش موجود أو متخفي لحساب العميل ده، مانعرضش مربعه
    const origin = tile.btn ? document.getElementById(tile.btn) : null;
    if (tile.btn && (!origin || origin.classList.contains('nav-off'))) return;

    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'home-tile tile-' + tile.key;
    cell.setAttribute('data-key', tile.key);
    cell.appendChild(iconSvg(tile.icon, 'home-tile-icon'));
    const label = document.createElement('span');
    label.className = 'home-tile-label';
    label.textContent = t(tile.labelKey);
    cell.appendChild(label);

    // العدّاد (زي طلبات الاستشارة المستنية) بيتنقل على المربع
    if (tile.badge) {
      const src = document.getElementById(tile.badge);
      if (src && !src.classList.contains('hidden') && src.textContent.trim()) {
        const dot = document.createElement('span');
        dot.className = 'home-tile-badge';
        dot.textContent = src.textContent.trim();
        cell.appendChild(dot);
      }
    }

    cell.addEventListener('click', function () {
      if (tile.mode) { setClientMode(tile.mode); runModeLoader(tile.mode); return; }
      if (origin) origin.click();
    });
    homeTiles.appendChild(cell);
  });
}

/* التبويبات اللي بقت مربعات محتاجة نفس التحميل اللي كان على زرارها */
function runModeLoader(mode) {
  if (mode === 'store') showClientStore();
  else if (mode === 'consult') loadClientConsult();
  else if (mode === 'activity') showClientActivity();
  else if (mode === 'classes') showClientClasses();
}

/* ---------- ملخّص اليوم ---------- */

function homeCard(icon, title, value, note, onClick, tint) {
  const box = document.createElement('button');
  box.type = 'button';
  box.className = 'home-card' + (tint ? ' hc-' + tint : '');
  box.appendChild(iconSvg(icon, 'home-card-icon'));
  const text = document.createElement('div');
  text.className = 'home-card-text';
  const t1 = document.createElement('span');
  t1.className = 'home-card-title';
  t1.textContent = title;
  const t2 = document.createElement('strong');
  t2.className = 'home-card-value';
  t2.textContent = value;
  text.appendChild(t1);
  text.appendChild(t2);
  if (note) {
    const t3 = document.createElement('span');
    t3.className = 'home-card-note';
    t3.textContent = note;
    text.appendChild(t3);
  }
  box.appendChild(text);
  box.addEventListener('click', onClick);
  return box;
}

function renderHomeSummary() {
  if (!homeCards) return;

  if (homeHello) {
    const name = (clientName || '').split(' ')[0];
    homeHello.textContent = name ? fill('home_hello_named', { name: name }) : t('home_hello');
  }

  homeCards.innerHTML = '';

  /* تمرين النهاردة */
  const day = clientWeek && clientWeek[todayIndex];
  const sets = day ? daySetCount(day) : 0;
  if (sets > 0) {
    const done = Object.keys(setsDoneToday || {}).reduce(function (sum, key) {
      return sum + (Number(setsDoneToday[key]) || 0);
    }, 0);
    homeCards.appendChild(homeCard(
      'training',
      t('home_today_training'),
      fill('home_sets_of', { done: done, total: sets }),
      dayMinutes(day) ? fill('home_minutes', { n: dayMinutes(day) }) : '',
      function () { goClientMode('training'); },
      'train'
    ));
  } else {
    homeCards.appendChild(homeCard(
      'training', t('home_today_training'), t('home_rest_day'), '',
      function () { goClientMode('training'); }, 'train'
    ));
  }

  /* الأكل والمية */
  if (!ctabNutrition.classList.contains('hidden')) {
    // eatenTotals بتاخد يوم البرنامج (اللي فيه الوجبات)، مش يوم السجل
    const planDay = clientNutrition && clientNutrition.week && clientNutrition.week[todayIndex];
    const totals = eatenTotals(planDay);
    const target = Math.round((clientNutrition && clientNutrition.targets && clientNutrition.targets.kcal) || 0);
    homeCards.appendChild(homeCard(
      'nutrition',
      t('home_today_food'),
      target ? fill('home_kcal_of', { done: Math.round(totals.kcal), total: target })
             : fill('home_kcal_only', { n: Math.round(totals.kcal) }),
      '',
      function () { goClientMode('nutrition'); },
      'food'
    ));

    const goal = waterGoal();
    const drunk = logDay().water || 0;
    if (goal) {
      homeCards.appendChild(homeCard(
        'water', t('home_today_water'),
        fill('home_water_of', { done: drunk, total: goal }), '',
        function () { goClientMode('nutrition'); }, 'water'
      ));
    }
  }

  /* التأهيل */
  if (!ctabRehab.classList.contains('hidden')) {
    homeCards.appendChild(homeCard(
      'rehab', t('home_today_rehab'), t('home_open_rehab'), '',
      function () { goClientMode('rehab'); }, 'rehab'
    ));
  }
}

function renderClientHome() {
  renderHomeSummary();
  renderWeekStreak();
  renderClientTiles();
}


/* ---------- استشارة: جانب العميل ---------- */

/*
 * فريق العميل = المدرب الأساسي + أي متخصص اختاره في "فريقك". بنجيب
 * أسماءهم من مستندات providers عشان قائمة الاختيار والردود تبقى بأسماء
 * حقيقية مش إيميلات
 */
async function loadClientConsultTeam() {
  const clientDoc = await getDoc(doc(db, 'clients', clientEmail));
  const data = clientDoc.exists() ? clientDoc.data() : {};
  const team = data.team || {};
  const coachEmail = (data.coachEmail || COACH_EMAIL).toLowerCase();

  const members = [{ specialty: 'coach', email: coachEmail }];
  Object.keys(team).forEach(function (key) {
    const memberEmail = team[key];
    if (!memberEmail) return;
    const already = members.some(function (member) { return member.email === memberEmail; });
    if (!already) members.push({ specialty: key, email: memberEmail });
  });

  const providerDocs = await Promise.all(members.map(function (member) {
    return getDoc(doc(db, 'providers', member.email));
  }));

  clientConsultTeam = members.map(function (member, index) {
    const provider = providerDocs[index].exists() ? providerDocs[index].data() : {};
    const fallbackName = member.email === COACH_EMAIL.toLowerCase() ? t('platform_owner_label') : member.email;
    return {
      email: member.email,
      specialty: (provider.specialty || member.specialty),
      name: provider.name || fallbackName
    };
  });
}

function fillClientConsultProviders() {
  const keep = clientConsultProvider.value;
  clientConsultProvider.innerHTML = '';

  const none = document.createElement('option');
  none.value = '';
  none.textContent = t('client_consult_pick_provider');
  clientConsultProvider.appendChild(none);

  clientConsultTeam.forEach(function (member) {
    const option = document.createElement('option');
    option.value = member.email;
    option.textContent = member.name + ' — ' + specialtyName(member.specialty, lang);
    clientConsultProvider.appendChild(option);
  });

  clientConsultProvider.value = keep;
}

/* الردود = ملاحظة كل متخصص عن العميل ده (قراءة بس من ناحية العميل) */
async function renderClientConsultReplies() {
  clientConsultReplies.innerHTML = '';

  const notes = await Promise.all(clientConsultTeam.map(function (member) {
    return getDoc(doc(db, 'consultNotes', consultNoteDocId(clientEmail, member.email)))
      .catch(function () { return null; });
  }));

  let shown = 0;
  notes.forEach(function (snap, index) {
    if (!snap || !snap.exists()) return;
    const noteData = snap.data();
    if (!noteData.text) return;
    shown++;

    const member = clientConsultTeam[index];
    const card = document.createElement('div');
    card.className = 'about-box';

    const who = document.createElement('div');
    who.className = 'ex-name';
    who.textContent = member.name + ' — ' + specialtyName(member.specialty, lang);
    card.appendChild(who);

    const when = consultDateText(noteData.updatedAt);
    if (when) {
      const meta = document.createElement('div');
      meta.className = 'ex-meta';
      meta.textContent = t('consult_note_updated') + ' ' + when;
      card.appendChild(meta);
    }

    const body = document.createElement('p');
    body.className = 'or';
    body.style.whiteSpace = 'pre-wrap';
    body.style.textAlign = 'start';
    body.textContent = noteData.text;
    card.appendChild(body);

    clientConsultReplies.appendChild(card);
  });

  if (!shown) {
    const empty = document.createElement('p');
    empty.className = 'message';
    empty.textContent = t('client_consult_no_replies');
    clientConsultReplies.appendChild(empty);
  }
}

/*
 * طلبات العميل نفسه — لازم تتجاب باستعلام مقيّد بإيميله (where) مش
 * قراءة المجموعة كلها، عشان قاعدة الأمان مش بتسمحله يقرا طلبات غيره
 */
async function fetchMyConsultRequests() {
  const snapshot = await getDocs(query(collection(db, 'consultRequests'), where('clientEmail', '==', clientEmail)));
  return snapshot.docs
    .map(function (item) { return Object.assign({ id: item.id }, item.data()); })
    .filter(function (row) { return row.clientEmail === clientEmail; })
    .sort(function (a, b) { return String(b.createdAt || '').localeCompare(String(a.createdAt || '')); });
}

function clientConsultProviderName(email) {
  const found = clientConsultTeam.filter(function (member) { return member.email === email; })[0];
  return found ? found.name : email;
}

async function renderClientConsultRequests() {
  clientConsultRequests.innerHTML = '';
  const rows = await fetchMyConsultRequests();

  if (!rows.length) {
    const empty = document.createElement('li');
    empty.className = 'section-empty';
    empty.textContent = t('client_consult_no_requests');
    clientConsultRequests.appendChild(empty);
  } else {
    rows.forEach(function (row) {
      const item = consultRequestCard(row);
      const to = document.createElement('div');
      to.className = 'client-email';
      to.textContent = clientConsultProviderName(row.providerEmail);
      item.insertBefore(to, item.firstChild);
      clientConsultRequests.appendChild(item);
    });
  }

  const pending = rows.filter(function (row) { return (row.status || 'pending') !== 'answered'; }).length;
  ctabConsultBadge.textContent = pending ? pending : '';
  ctabConsultBadge.classList.toggle('hidden', !pending);
}

async function loadClientConsult() {
  if (!clientEmail) return;
  clientConsultMessage.textContent = t('loading');
  try {
    await loadClientConsultTeam();
    fillClientConsultProviders();
    await renderClientConsultReplies();
    await renderClientConsultRequests();
    clientConsultMessage.textContent = '';
  } catch (error) {
    clientConsultMessage.textContent = t('problem') + error.message;
  }
}

clientConsultSendBtn.addEventListener('click', async function () {
  const providerEmail = clientConsultProvider.value;
  const text = clientConsultText.value.trim();

  if (!providerEmail || !text) {
    clientConsultMessage.textContent = t('client_consult_need_fields');
    return;
  }

  clientConsultMessage.textContent = t('saving');
  try {
    const id = 'creq_' + Date.now();
    await setDoc(doc(db, 'consultRequests', id), {
      clientEmail: clientEmail,
      clientName: clientName || '',
      providerEmail: providerEmail,
      text: text,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    clientConsultText.value = '';
    notify(providerEmail, 'consult_request', {
      target: 'consult', about: clientEmail, aboutName: clientName || '',
      params: function () { return { name: clientName || clientEmail, text: text }; }
    });
    await renderClientConsultRequests();
    setStatusMessage(clientConsultMessage, t('client_consult_sent_msg'), 'success');
  } catch (error) {
    clientConsultMessage.textContent = t('problem') + error.message;
  }
});

/*
 * علامة نشاط للعميل — بنكتب وقت آخر دخول على مستنده. بنستعملها في
 * التقرير اليومي عشان تعرف كام عميل لسه بيفتح البرنامج فعلاً، وده
 * أهم رقم في المتابعة: العميل اللي وقف يفتح هو اللي بيسيب بعد كده
 */
function touchClientActivity(email) {
  setDoc(doc(db, 'clients', email), { lastActiveAt: new Date().toISOString() }, { merge: true })
    .catch(function () {
      // مش مشكلة لو فشلت — مجرد إشارة نشاط، مش بيانات أساسية
    });
}

async function loadClient(email) {
  clientEmail = email;
  progress.textContent = t('loading');
  touchClientActivity(email);
  try {
    const workoutDoc = await getDoc(doc(db, 'workouts', email));
    const progressDoc = await getDoc(doc(db, 'progress', email));
    const rehabDoc = await getDoc(doc(db, 'rehab', email));
    const nutritionDoc = await getDoc(doc(db, 'nutrition', email));
    const activityDoc = await getDoc(doc(db, 'activity', email));
    const meDoc = await getDoc(doc(db, 'clients', email));

    clientSport = (meDoc.exists() && meDoc.data().sport) ? meDoc.data().sport : '';
    clientName = (meDoc.exists() && meDoc.data().name) ? meDoc.data().name : '';
    // بيانات العميل الأساسية — الرئيسية والمساعد الذكي بيقروا منها
    clientRecord = meDoc.exists() ? meDoc.data() : null;
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

    // لو بدأ جلسة النهاردة، نكمّل عليها مهما كان اليوم اللي اختاره
    if (progressDoc.exists() && progressDoc.data().date === today
        && typeof progressDoc.data().day === 'number') {
      sessionDay = progressDoc.data().day;
    } else {
      sessionDay = todayIndex;
    }
    clientDay = sessionDay;
    clientSession = -1;

    doneToday = rawDone.map(function (entry) {
      return (typeof entry === 'number') ? ('main:' + entry) : String(entry);
    });

    actualSetsToday = (progressDoc.exists() && progressDoc.data().date === today && progressDoc.data().actualSets)
      ? progressDoc.data().actualSets : {};

    setsDoneToday = (progressDoc.exists() && progressDoc.data().date === today && progressDoc.data().setsDone)
      ? progressDoc.data().setsDone : {};
    rehabSetsDoneToday = (progressDoc.exists() && progressDoc.data().rehabDate === today && progressDoc.data().rehabSetsDone)
      ? progressDoc.data().rehabSetsDone : {};

    /* برامج اتسجلت قبل السبحة: التمرين المعلّم خلصان = كل مجموعاته خلصت */
    doneToday.forEach(function (key) {
      if (setsDoneToday[key] === undefined) setsDoneToday[key] = -1;
    });

    rehabDoneToday = (progressDoc.exists() && progressDoc.data().rehabDate === today && Array.isArray(progressDoc.data().rehabDone))
      ? progressDoc.data().rehabDone : [];
    rehabActualSetsToday = (progressDoc.exists() && progressDoc.data().rehabDate === today && progressDoc.data().rehabActualSets)
      ? progressDoc.data().rehabActualSets : {};

    await loadFoodLog(email);
    await loadClientHealth(email);
    // إعدادات المساعد الذكي — العميل محتاجها عشان يعرف مفعّل ولا لأ
    fetchWelcomeSettings().catch(function () {});

    const hasRehab = rehabHasContent(clientRehab);
    const hasNutrition = nutritionHasContent(clientNutrition);
    ctabRehab.classList.toggle('hidden', !hasRehab);
    ctabNutrition.classList.toggle('hidden', !hasNutrition);
    // شريط التابات نفسه كان بيتخفي بالكامل لو مفيش تأهيل أو تغذية —
    // ده كان بيمنع الوصول لتابات "نشاطي" و"الكلاس" و"المتجر" كمان
    // (مالهاش علاقة بالتأهيل/التغذية) لو العميل لسه ملوش برنامج منهم.
    // التاب الوحيد اللي فعلاً لازم يتخفي هو تاب التمرين الأساسي نفسه
    // لو مفيش أي محتوى خالص (تمرين ولا تأهيل ولا تغذية)
    // الشريط السفلي بيتبني بعد ما نعرف عنده تأهيل وتغذية ولا لأ
    renderAppbar();
    setClientMode('home');

    renderSafetyBanner();
    renderCycleCard();
    showClientDay();
    showClientRehab();
    showClientNutrition();
    showClientActivity();
    refreshClientConsultBadge();
  } catch (error) {
    progress.textContent = t('problem') + error.message;
  }
}

/* عداد على تبويب "استشارة" عند العميل بعدد طلباته اللي لسه محدش رد عليها */
async function refreshClientConsultBadge() {
  if (!ctabConsultBadge || !clientEmail) return;
  try {
    const rows = await fetchMyConsultRequests();
    const pending = rows.filter(function (row) { return (row.status || 'pending') !== 'answered'; }).length;
    ctabConsultBadge.textContent = pending ? pending : '';
    ctabConsultBadge.classList.toggle('hidden', !pending);
  } catch (error) {
    // مش مشكلة لو فشل تحميل العداد
  }
}

/*
 * في نص الدايرة بنكتب اسم اليوم وعدد التمارين بس — عنوان التمرين نفسه
 * بقى في كارت الجلسة تحت، فمفيش داعي يتكرر مرتين على نفس الشاشة
 */
function clientDialDescribe(day, index) {
  return {
    hasPlan: dayHasPlan(day),
    title: days()[index],
    sub: day.rest ? t('rest_title')
       : (dayCount(day) ? fill('count_ex', { n: dayCount(day) }) : t('no_plan')),
    isRest: !!day.rest
  };
}

function showClientDays() {
  renderDial('client-ring', 'client-dc-day', 'client-dc-sub', clientWeek, clientDay, function (index) {
    clientDay = index;
    clientSession = -1;
    showClientDay();
  }, clientDialDescribe);
  renderWeekStreak();
}

/* الحصة المعروضة كيوم لوحده { title, sections, time, sport } */
function clientView() {
  const list = daySessions(clientWeek[clientDay]);
  if (clientSession < 0 || clientSession >= list.length) clientSession = 0;
  return list[clientSession] || { title: '', sections: blankSections() };
}

function clientPrefix() {
  return sessionKeyPrefix(clientSession);
}

/* الحصة خلصت كلها؟ بنحسبها من السبحة نفسها عشان تبقى صح حتى لو مش معروضة */
function sessionIsDone(session, index) {
  const prefix = sessionKeyPrefix(index);
  let total = 0;
  let done = 0;
  SECTION_KEYS.forEach(function (key) {
    (session.sections[key] || []).forEach(function (exercise, i) {
      const sets = exerciseSetCount(exercise) || 1;
      total += 1;
      if (setsDoneFor(setsDoneToday, prefix + key + ':' + i, sets) >= sets) done += 1;
    });
  });
  return total > 0 && done >= total;
}

function wholeDayDone(day) {
  const list = daySessions(day).filter(function (session) { return dayCount({ sections: session.sections }) > 0; });
  return list.length > 0 && daySessions(day).every(function (session, index) {
    return dayCount({ sections: session.sections }) === 0 || sessionIsDone(session, index);
  });
}

/* أول ما يفتح يوم: أول حصة لسه ما خلصتش (لو ده تمرين النهاردة) */
function firstOpenSession(day, isActive) {
  const list = daySessions(day);
  if (!isActive) return 0;
  for (let i = 0; i < list.length; i++) {
    if (dayCount({ sections: list[i].sections }) > 0 && !sessionIsDone(list[i], i)) return i;
  }
  return 0;
}

function renderClientSessionTabs(day, isActive) {
  const box = document.getElementById('client-session-tabs');
  if (!box) return;
  box.innerHTML = '';
  const multi = hasManySessions(day) && !day.rest;
  box.classList.toggle('hidden', !multi);
  if (!multi) return;
  daySessions(day).forEach(function (session, index) {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'session-tab' + (index === clientSession ? ' on' : '');
    tab.dataset.session = String(index);
    if (isActive && sessionIsDone(session, index)) tab.classList.add('done');

    const num = document.createElement('span');
    num.className = 'session-num';
    num.textContent = index + 1;
    tab.appendChild(num);

    const text = document.createElement('span');
    text.className = 'session-tab-text';
    const name = document.createElement('strong');
    name.textContent = sessionLabel(session, index);
    text.appendChild(name);
    if (session.time) {
      const time = document.createElement('small');
      time.textContent = prettyTime(session.time);
      text.appendChild(time);
    }
    tab.appendChild(text);

    tab.addEventListener('click', function () {
      if (clientSession === index) return;
      clientSession = index;
      showClientDay();
    });
    box.appendChild(tab);
  });
}

function countDone() {
  return clientSections.querySelectorAll('li.done').length;
}

function totalToday() {
  return dayCount(clientView());
}

function dayVolume(day) {
  let total = 0;
  SECTION_KEYS.forEach(function (key) {
    (day.sections[key] || []).forEach(function (exercise) {
      total += exerciseVolume(exercise);
    });
  });
  (day.extraSessions || []).forEach(function (session) { total += dayVolume(session); });
  return total;
}

function actualDayVolume(day, prefix) {
  let total = 0;
  SECTION_KEYS.forEach(function (key) {
    (day.sections[key] || []).forEach(function (exercise, index) {
      total += actualVolume(exercise, actualSetsToday[(prefix || '') + key + ':' + index]);
    });
  });
  return total;
}

function weekVolume(week) {
  return week.reduce(function (total, day) { return total + dayVolume(day); }, 0);
}

function updateProgress() {
  if (clientDay !== todayIndex) {
    progress.textContent = fill('day_plan', { day: days()[clientDay] });
  } else if (totalToday() === 0) {
    progress.textContent = '';
  } else {
    progress.textContent = fill('of_exercises', { a: countDone(), b: totalToday() });
  }

  const volume = dayVolume(clientWeek[clientDay]);
  let volumeText = volume > 0 ? (t('day_volume') + ': ' + Math.round(volume).toLocaleString() + ' ' + (lang === 'ar' ? 'كجم' : 'kg')) : '';

  if (clientDay === todayIndex) {
    const actualTotal = daySessions(clientWeek[clientDay]).reduce(function (sum, session, index) {
      return sum + actualDayVolume(session, sessionKeyPrefix(index));
    }, 0);
    if (actualTotal > 0) {
      volumeText += (volumeText ? ' — ' : '') + t('actual_volume_label') + ': ' + Math.round(actualTotal).toLocaleString() + ' ' + (lang === 'ar' ? 'كجم' : 'kg');
    }
  }
  dayVolumeEl.textContent = volumeText;

  const totalWeek = weekVolume(clientWeek);
  weekVolumeEl.textContent = totalWeek > 0
    ? (t('week_volume') + ': ' + Math.round(totalWeek).toLocaleString() + ' ' + (lang === 'ar' ? 'كجم' : 'kg'))
    : '';

  const total = totalToday();
  setSessRing(total ? (countDone() / total) * 100 : 0);
  /* علامة ✓ على تبويب الحصة لما تخلص */
  renderClientSessionTabs(clientWeek[clientDay], clientDay === sessionDay);

  /* علامة اليوم في شريط الأسبوع تتحرك فورًا لما يخلص آخر تمرين */
  renderWeekStreak();

  /* علامة ✓ على كل كارت خلص — الحالة محفوظة على li.done */
  clientSections.querySelectorAll('li.exc-card').forEach(function (item) {
    const check = item.querySelector('.exc-check');
    if (check) check.classList.toggle('on', item.classList.contains('done'));
  });
}

function saveProgress() {
  /* الحصص التانية مش معروضة دلوقتي — علاماتها تفضل زي ما هي */
  const shown = clientPrefix();
  const done = doneToday.filter(function (key) {
    const match = /^s\d+\|/.exec(key);
    return (match ? match[0] : '') !== shown;
  });
  clientSections.querySelectorAll('li.done').forEach(function (item) {
    if (item.dataset.key && done.indexOf(item.dataset.key) === -1) done.push(item.dataset.key);
  });
  doneToday = done;

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
    day: sessionDay,
    done: done,
    history: progressHistory,
    actualSets: actualSetsToday,
    setsDone: setsDoneToday
  }, { merge: true });
}

function actualVolume(exercise, actualArr) {
  if (!actualArr || !actualArr.length) return 0;
  return actualArr.reduce(function (total, set) {
    return total + parseNum(set.weight) * parseNum(set.reps);
  }, 0);
}

function actualSummaryText(actualArr) {
  return actualArr.map(function (set, index) {
    const parts = [(set.reps || '?') + '×' + (set.weight || '?') + (lang === 'ar' ? 'كجم' : 'kg')];
    return (index + 1) + ') ' + parts.join(' — ');
  }).join('   ');
}

function defaultActualSets(exercise) {
  if (exercise.setDetails && exercise.setDetails.length) {
    return exercise.setDetails.map(function (set) {
      return { weight: set.weight || '', reps: set.reps || '' };
    });
  }
  const count = parseNum(exercise.sets) || 1;
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push({ weight: exercise.load || '', reps: exercise.reps || '' });
  }
  return rows;
}

function saveActualSets() {
  setDoc(doc(db, 'progress', clientEmail), {
    date: today,
    actualSets: actualSetsToday
  }, { merge: true });
}

function saveRehabProgress() {
  setDoc(doc(db, 'progress', clientEmail), {
    rehabDate: today,
    rehabDone: rehabDoneToday,
    rehabActualSets: rehabActualSetsToday,
    rehabSetsDone: rehabSetsDoneToday
  }, { merge: true });
}

/* ============================================================
   شاشة العميل — الشكل الجديد: شريط الأسبوع، كارت الجلسة، كروت التمارين
   ============================================================ */

/* ألوان كل قسم — بتلوّن الكارت والصورة البديلة لما التمرين من غير صورة */
const SECTION_TINT = {
  warmup:     ['#f59e0b', '#f97316'],
  main:       ['#22c55e', '#16a34a'],
  cardio:     ['#38bdf8', '#0ea5e9'],
  mobility:   ['#a78bfa', '#8b5cf6'],
  flexibility:['#f472b6', '#ec4899']
};

function sectionTint(key) {
  return SECTION_TINT[key] || SECTION_TINT.main;
}

/* صورة بديلة محترمة لما التمرين ملوش صورة: تدرّج بلون القسم + أيقونته */
function exerciseFallbackArt(sectionKey) {
  const c = sectionTint(sectionKey);
  const box = document.createElement('div');
  box.className = 'exc-fallback';
  box.style.background = 'linear-gradient(135deg, ' + c[0] + '33, ' + c[1] + '14)';
  box.style.color = c[0];
  box.innerHTML = sectionIconSvg(sectionKey);
  return box;
}

/* عدد المجموعات في التمرين — للإحصائيات فوق */
function exerciseSetCount(exercise) {
  if (exercise && exercise.setDetails && exercise.setDetails.length) return exercise.setDetails.length;
  const n = parseInt(exercise && exercise.sets, 10);
  return isNaN(n) ? 0 : n;
}

function daySetCount(day) {
  let total = 0;
  SECTION_KEYS.forEach(function (key) {
    (day.sections[key] || []).forEach(function (exercise) {
      total += exerciseSetCount(exercise);
    });
  });
  (day.extraSessions || []).forEach(function (session) { total += daySetCount(session); });
  return total;
}

/*
 * تقدير زمن الجلسة بالدقايق: كل مجموعة ≈ ٤٥ ثانية شغل + الراحة المكتوبة
 * (أو ٦٠ ثانية لو مش مكتوبة). تقدير تقريبي للعميل مش رقم محاسبي
 */
function dayMinutes(day) {
  let seconds = 0;
  SECTION_KEYS.forEach(function (key) {
    (day.sections[key] || []).forEach(function (exercise) {
      const sets = exerciseSetCount(exercise) || 1;
      let rest = parseNum(exercise.rest);
      if (!rest) rest = 60;
      if (rest > 15) {
        /* مكتوبة بالثواني زي "90 ث" */
      } else {
        rest = rest * 60; /* مكتوبة بالدقايق زي "2 د" */
      }
      seconds += sets * (45 + rest);
    });
  });
  let minutes = Math.round(seconds / 60);
  (day.extraSessions || []).forEach(function (session) { minutes += dayMinutes(session); });
  return minutes;
}

/*
 * شريط إنجاز الأسبوع — مش تكرار للدايرة: بيقول العميل خلّص كام يوم من
 * أيام برنامجه الأسبوع ده. الأيام اللي خلصت خضرا بعلامة ✓، اللي فاتت
 * من غير تمرين رمادية، واللي لسه جاية فاضية
 */
function weekDates() {
  const base = new Date();
  base.setHours(12, 0, 0, 0);
  base.setDate(base.getDate() - todayIndex);
  const out = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push(dateStamp(d));
  }
  return out;
}

function renderWeekStreak() {
  const dots = document.getElementById('ws-dots');
  const note = document.getElementById('ws-note');
  if (!dots || !note) return;
  dots.innerHTML = '';

  const stamps = weekDates();
  const mini = daysMini();
  let planned = 0;
  let done = 0;

  clientWeek.forEach(function (day, index) {
    const hasPlan = !day.rest && dayCount(day) > 0;
    /* اليوم الحالي بيتحسب من الشاشة نفسها عشان العلامة تتحرك فورًا */
    const isDone = (index === todayIndex)
      ? wholeDayDone(clientWeek[sessionDay] || day)
      : progressHistory.indexOf(stamps[index]) !== -1;

    if (hasPlan) planned += 1;
    if (hasPlan && isDone) done += 1;

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'ws-dot';
    if (!hasPlan) dot.classList.add('off');
    else if (isDone) dot.classList.add('on');
    else if (index < todayIndex) dot.classList.add('missed');
    if (index === todayIndex) dot.classList.add('today');
    if (index === clientDay) dot.classList.add('sel');

    const mark = document.createElement('span');
    mark.className = 'ws-mark';
    if (hasPlan && isDone) {
      mark.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12.5 9.5 18 20 6.5"></polyline></svg>';
    }
    dot.appendChild(mark);

    const label = document.createElement('span');
    label.className = 'ws-label';
    label.textContent = mini[index];
    dot.appendChild(label);

    dot.addEventListener('click', function () {
      clientDay = index;
      clientSession = -1;
      showClientDay();
    });

    dots.appendChild(dot);
  });

  note.textContent = planned
    ? fill('week_streak_note', { a: done, b: planned })
    : t('week_streak_empty');
  note.classList.toggle('all-done', planned > 0 && done >= planned);
}

/* ---------- السبحة: خرزة لكل مجموعة ---------- */

/* كام مجموعة خلصت في تمرين — -1 معناها "التمرين كله خلص" من برنامج قديم */
function setsDoneFor(store, key, total) {
  const value = store[key];
  if (value === -1) return total;
  return Math.max(0, Math.min(total, Number(value) || 0));
}

/*
 * بنبني صف الخرز. الدوس على خرزة رقم i:
 *  - لو لسه مخلصتش لحد i  →  بيخلّص لحد i (يعني i+1 مجموعة)
 *  - لو هي آخر خرزة مخلّصة →  بيرجع واحدة لورا (لو دست غلط)
 */
function renderBeads(box, total, doneCount, onChange, big) {
  box.innerHTML = '';
  box.classList.toggle('beads-lg', !!big);
  for (let i = 0; i < total; i++) {
    const bead = document.createElement('button');
    bead.type = 'button';
    bead.className = 'bead';
    if (i < doneCount) bead.classList.add('on');
    if (i === doneCount) bead.classList.add('next');
    bead.setAttribute('aria-label', String(i + 1));
    const inner = document.createElement('span');
    inner.textContent = i + 1;
    bead.appendChild(inner);
    bead.addEventListener('click', function (event) {
      event.stopPropagation();
      onChange(i + 1 === doneCount ? i : i + 1);
    });
    box.appendChild(bead);
  }
}

/* إحصائيات الجلسة: عدد التمارين، المجموعات، الوقت المتوقع */
const SESS_STAT_ICONS = {
  ex:   '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="9" width="3" height="6" rx="1"></rect><rect x="19" y="9" width="3" height="6" rx="1"></rect><line x1="5" y1="12" x2="19" y2="12"></line><rect x="6" y="7" width="2.5" height="10" rx="1"></rect><rect x="15.5" y="7" width="2.5" height="10" rx="1"></rect></svg>',
  sets: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="14" y2="17"></line></svg>',
  time: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15.5 14"></polyline></svg>'
};

function renderSessStats(day) {
  const box = document.getElementById('sess-stats');
  if (!box) return;
  box.innerHTML = '';
  if (day.rest) return;

  const total = dayCount(day);
  if (!total) return;

  const minutes = dayMinutes(day);
  const items = [
    { icon: SESS_STAT_ICONS.ex,   value: total,           label: t('sess_stat_ex') },
    { icon: SESS_STAT_ICONS.sets, value: daySetCount(day), label: t('sess_stat_sets') },
    { icon: SESS_STAT_ICONS.time, value: '~' + minutes,   label: t('sess_stat_min') }
  ];

  items.forEach(function (item) {
    if (!item.value) return;
    const pill = document.createElement('div');
    pill.className = 'sess-stat';

    const icon = document.createElement('span');
    icon.className = 'inline-icon';
    icon.innerHTML = item.icon;
    pill.appendChild(icon);

    const value = document.createElement('strong');
    value.textContent = item.value;
    pill.appendChild(value);

    const label = document.createElement('span');
    label.className = 'sess-stat-label';
    label.textContent = item.label;
    pill.appendChild(label);

    box.appendChild(pill);
  });
}

/* حلقة التقدّم في كارت الجلسة */
const SESS_RING_LEN = 2 * Math.PI * 35;

function setSessRing(pct) {
  const fg = document.getElementById('sess-ring-fg');
  const label = document.getElementById('sess-ring-pct');
  const value = Math.max(0, Math.min(100, Math.round(pct || 0)));
  if (fg) {
    fg.style.strokeDasharray = SESS_RING_LEN.toFixed(1);
    fg.style.strokeDashoffset = (SESS_RING_LEN * (1 - value / 100)).toFixed(1);
    fg.classList.toggle('full', value >= 100);
  }
  if (label) {
    label.textContent = value + '%';
    label.classList.toggle('full', value >= 100);
  }
}

/* كارت حالة (راحة / مفيش برنامج) بشكل محترم بدل سطر رمادي */
const STATE_ART = {
  rest: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M44 36.5A16 16 0 0 1 24.5 17 17 17 0 1 0 44 36.5z"></path><path d="M12 14l2.5 2.5M14.5 11.5L12 14"></path><circle cx="50" cy="16" r="1.6"></circle><circle cx="42" cy="9" r="1.2"></circle></svg>',
  empty: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="10" width="36" height="44" rx="5"></rect><line x1="22" y1="22" x2="42" y2="22"></line><line x1="22" y1="31" x2="36" y2="31"></line><line x1="22" y1="40" x2="30" y2="40"></line></svg>'
};

function clientStateCard(kind, title, text) {
  const box = document.createElement('div');
  box.className = 'state-card state-' + kind;

  const art = document.createElement('div');
  art.className = 'state-art';
  art.innerHTML = STATE_ART[kind] || STATE_ART.empty;
  box.appendChild(art);

  const head = document.createElement('div');
  head.className = 'state-title';
  head.textContent = title;
  box.appendChild(head);

  const body = document.createElement('p');
  body.className = 'state-text';
  body.textContent = text;
  box.appendChild(body);

  return box;
}

/* بيخلّي دايرة الـ ✓ متماشية مع حالة الكارت (خلص/لسه) */
function syncCardCheck(item) {
  const check = item.querySelector('.exc-check');
  if (check) check.classList.toggle('on', item.classList.contains('done'));
}

/* كارت تمرين واحد في شاشة العميل */
function clientExerciseCard(exercise, sectionKey, order) {
  const row = document.createElement('div');
  row.className = 'exc-main';

  const media = document.createElement('div');
  media.className = 'exc-media';

  const src = thumbSrc(exercise);
  if (src) {
    const thumb = document.createElement('img');
    thumb.className = 'exc-photo';
    thumb.src = src;
    thumb.alt = '';
    thumb.loading = 'lazy';
    thumb.addEventListener('error', function () {
      thumb.remove();
      media.insertBefore(exerciseFallbackArt(sectionKey), media.firstChild);
    });
    thumb.addEventListener('click', function (event) {
      event.stopPropagation();
      openPreview(exercise);
    });
    media.appendChild(thumb);
  } else {
    media.appendChild(exerciseFallbackArt(sectionKey));
  }

  const num = document.createElement('span');
  num.className = 'exc-num';
  num.textContent = order;
  media.appendChild(num);
  row.appendChild(media);

  const info = document.createElement('div');
  info.className = 'exc-info';

  const name = document.createElement('div');
  name.className = 'exc-name';
  name.textContent = exerciseDisplayName(exercise);
  info.appendChild(name);

  const chips = document.createElement('div');
  chips.className = 'exc-chips';

  const main = document.createElement('span');
  main.className = 'exc-chip primary';
  main.textContent = localiseReps(setsSummaryText(exercise));
  chips.appendChild(main);

  [
    { text: exercise.rest,  icon: EX_TAG_ICON_REST },
    { text: exercise.load,  icon: EX_TAG_ICON_LOAD },
    { text: exercise.rpe ? ('RPE ' + exercise.rpe) : '', icon: null },
    { text: exercise.tempo, icon: EX_TAG_ICON_TEMPO }
  ].forEach(function (tag) {
    if (!tag.text) return;
    const chip = document.createElement('span');
    chip.className = 'exc-chip';
    if (tag.icon) {
      const icon = document.createElement('span');
      icon.className = 'inline-icon';
      icon.innerHTML = tag.icon;
      chip.appendChild(icon);
    }
    const label = document.createElement('span');
    label.textContent = localiseReps(tag.text);
    chip.appendChild(label);
    chips.appendChild(chip);
  });

  info.appendChild(chips);

  if (!src && exerciseHasAnatomyDetail(exercise)) {
    const detailBtn = document.createElement('button');
    detailBtn.type = 'button';
    detailBtn.className = 'link anatomy-detail-btn';
    detailBtn.textContent = t('anatomy_section_title');
    detailBtn.addEventListener('click', function (event) {
      event.stopPropagation();
      openPreview(exercise);
    });
    info.appendChild(detailBtn);
  }

  row.appendChild(info);

  const check = document.createElement('span');
  check.className = 'exc-check';
  check.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12.5 9.5 18 20 6.5"></polyline></svg>';
  row.appendChild(check);

  return row;
}

/* ============================================================
   وضع التمرين الحالي — تمرين واحد على الشاشة كلها
   شاشة الموبايل صغيرة، فبدل ما التمارين تتزحم فوق بعض العميل
   بيشتغل على واحد بس: صورة كبيرة، سبحة كبيرة، وزرار التالي
   ============================================================ */

const focusMode = document.getElementById('focus-mode');
let focusList = [];
let focusIndex = 0;

/* بنجمع تمارين اليوم بالترتيب مع مفاتيحها عشان نتحرك بينها */
function buildFocusList(day, prefix) {
  const out = [];
  SECTION_KEYS.forEach(function (key) {
    (day.sections[key] || []).forEach(function (exercise, index) {
      out.push({ exercise: exercise, section: key, key: (prefix || '') + key + ':' + index });
    });
  });
  return out;
}

function focusEntry() {
  return focusList[focusIndex] || null;
}

function renderFocusLogBox() {
  const box = document.getElementById('focus-log-box');
  const entry = focusEntry();
  if (!box || !entry) return;
  box.innerHTML = '';

  const rows = (actualSetsToday[entry.key] && actualSetsToday[entry.key].length)
    ? actualSetsToday[entry.key] : defaultActualSets(entry.exercise);

  rows.forEach(function (set, setIndex) {
    const row = document.createElement('div');
    row.className = 'per-set-row';

    const label = document.createElement('span');
    label.className = 'per-set-label';
    label.textContent = (setIndex + 1);
    row.appendChild(label);

    const weightInput = document.createElement('input');
    weightInput.type = 'text';
    weightInput.placeholder = t('per_set_weight');
    weightInput.value = set.weight || '';
    row.appendChild(weightInput);

    const repsInput = document.createElement('input');
    repsInput.type = 'text';
    repsInput.placeholder = t('ex_reps');
    repsInput.value = set.reps || '';
    row.appendChild(repsInput);

    function commit() {
      if (!actualSetsToday[entry.key]) {
        actualSetsToday[entry.key] = rows.map(function (r) { return { weight: r.weight || '', reps: r.reps || '' }; });
      }
      actualSetsToday[entry.key][setIndex] = { weight: weightInput.value.trim(), reps: repsInput.value.trim() };
      saveActualSets();
      updateProgress();
    }
    weightInput.addEventListener('change', commit);
    repsInput.addEventListener('change', commit);

    box.appendChild(row);
  });
}

function renderFocus() {
  const entry = focusEntry();
  if (!entry) return;
  const exercise = entry.exercise;
  const total = focusList.length;
  const tint = sectionTint(entry.section);
  focusMode.style.setProperty('--sec', tint[0]);

  document.getElementById('focus-count').textContent =
    fill('focus_of', { a: focusIndex + 1, b: total });

  const steps = document.getElementById('focus-steps');
  steps.innerHTML = '';
  focusList.forEach(function (row, index) {
    const sets = exerciseSetCount(row.exercise) || 1;
    const seg = document.createElement('span');
    seg.className = 'focus-step';
    if (setsDoneFor(setsDoneToday, row.key, sets) >= sets) seg.classList.add('on');
    if (index === focusIndex) seg.classList.add('cur');
    steps.appendChild(seg);
  });

  const media = document.getElementById('focus-media');
  media.innerHTML = '';
  const src = thumbSrc(exercise);
  if (src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.addEventListener('error', function () {
      img.remove();
      media.appendChild(exerciseFallbackArt(entry.section));
    });
    media.appendChild(img);
  } else {
    media.appendChild(exerciseFallbackArt(entry.section));
  }

  document.getElementById('focus-name').textContent = exerciseDisplayName(exercise);

  const chips = document.getElementById('focus-chips');
  chips.innerHTML = '';
  const main = document.createElement('span');
  main.className = 'exc-chip primary';
  main.textContent = localiseReps(setsSummaryText(exercise));
  chips.appendChild(main);
  [exercise.rest, exercise.load, exercise.rpe ? ('RPE ' + exercise.rpe) : '', exercise.tempo].forEach(function (text) {
    if (!text) return;
    const chip = document.createElement('span');
    chip.className = 'exc-chip';
    chip.textContent = localiseReps(text);
    chips.appendChild(chip);
  });

  const totalSets = exerciseSetCount(exercise) || 1;
  const beads = document.getElementById('focus-beads');
  const note = document.getElementById('focus-beads-note');
  const doneCount = setsDoneFor(setsDoneToday, entry.key, totalSets);

  renderBeads(beads, totalSets, doneCount, function (next) {
    setsDoneToday[entry.key] = next;
    syncFocusToList(entry.key, next >= totalSets);
    renderFocus();
    updateProgress();
    saveProgress();
  }, true);

  const left = totalSets - doneCount;
  note.textContent = left > 0 ? fill('focus_sets_left', { n: left }) : t('focus_sets_done');
  note.classList.toggle('all-done', left === 0);

  const prev = document.getElementById('focus-prev');
  const next = document.getElementById('focus-next');
  prev.disabled = focusIndex === 0;
  next.textContent = (focusIndex === total - 1) ? t('focus_finish') : t('focus_next');
  next.classList.toggle('ready', left === 0);

  renderFocusLogBox();
}

/* نخلّي كارت التمرين في القايمة تحت متماشي مع اللي اتعمل في وضع التمرين */
function syncFocusToList(exKey, isDone) {
  const item = clientSections.querySelector('li[data-key="' + exKey + '"]');
  if (!item) return;
  item.classList.toggle('done', isDone);
  if (typeof item.paintBeads === 'function') item.paintBeads();
  else syncCardCheck(item);
}

function openFocus(startIndex) {
  const whole = clientWeek[clientDay];
  if (!whole || whole.rest) return;
  focusList = buildFocusList(clientView(), clientPrefix());
  if (!focusList.length) return;
  focusIndex = Math.max(0, Math.min(focusList.length - 1, startIndex || 0));
  document.getElementById('focus-log-box').classList.add('hidden');
  document.getElementById('focus-log-toggle').textContent = t('log_actual_btn');
  focusMode.classList.remove('hidden');
  document.body.classList.add('focus-open');
  renderFocus();
}

function closeFocus() {
  focusMode.classList.add('hidden');
  document.body.classList.remove('focus-open');
  showClientDay();
}

document.getElementById('focus-close').addEventListener('click', closeFocus);

document.getElementById('focus-prev').addEventListener('click', function () {
  if (focusIndex > 0) { focusIndex -= 1; renderFocus(); }
});

document.getElementById('focus-next').addEventListener('click', function () {
  if (focusIndex < focusList.length - 1) { focusIndex += 1; renderFocus(); }
  else closeFocus();
});

document.getElementById('focus-log-toggle').addEventListener('click', function () {
  const box = document.getElementById('focus-log-box');
  const open = box.classList.toggle('hidden');
  this.textContent = open ? t('log_actual_btn') : t('hide_actual_btn');
  if (!open) renderFocusLogBox();
});

document.getElementById('start-session-btn').addEventListener('click', function () {
  /* بيبدأ من أول تمرين لسه مخلصش — مش من الأول دايمًا */
  const list = buildFocusList(clientView(), clientPrefix());
  let start = 0;
  for (let i = 0; i < list.length; i++) {
    const sets = exerciseSetCount(list[i].exercise) || 1;
    if (setsDoneFor(setsDoneToday, list[i].key, sets) < sets) { start = i; break; }
  }
  openFocus(start);
});

/* زرار النقط تحت: بيفتح ويقفل شريط الأدوات بدل ما يفضل فوق الكلام */
const fabRow = document.getElementById('client-fab-row');
const fabToggle = document.getElementById('client-fab-toggle');
if (fabToggle && fabRow) {
  fabToggle.addEventListener('click', function () {
    const collapsed = fabRow.classList.toggle('is-collapsed');
    fabToggle.classList.toggle('is-open', !collapsed);
  });
  document.addEventListener('click', function (event) {
    if (fabRow.classList.contains('is-collapsed')) return;
    if (fabRow.contains(event.target) || fabToggle.contains(event.target)) return;
    fabRow.classList.add('is-collapsed');
    fabToggle.classList.remove('is-open');
  });
}

/*
 * زرار "اتمرّن ده النهاردة": بيظهر على أي يوم مش هو الجلسة الحالية
 * وفيه تمارين. الدوس عليه بيخلّي اليوم ده هو تمرين النهاردة.
 * ولو كان بدأ جلسة تانية وخلّص فيها حاجة، بنقوله إن اللي عمله
 * هيتلغي — مش بنلغيه من ورا ضهره
 */
function renderPickSessionBtn(day, isActive) {
  const btn = document.getElementById('pick-session-btn');
  if (!btn) return;

  const empty = !!day.rest || dayCount(day) === 0;
  btn.classList.toggle('hidden', isActive || empty);
  if (isActive || empty) return;

  const started = doneToday.length > 0
    || Object.keys(setsDoneToday || {}).some(function (k) { return setsDoneToday[k] > 0; });

  btn.textContent = t('pick_session_btn');
  btn.classList.toggle('warn', started);

  btn.onclick = function () {
    if (started && !btn.classList.contains('confirming')) {
      btn.classList.add('confirming');
      btn.textContent = fill('pick_session_confirm', { day: days()[sessionDay] });
      return;
    }
    sessionDay = clientDay;
    doneToday = [];
    setsDoneToday = {};
    actualSetsToday = {};
    progressHistory = progressHistory.filter(function (d) { return d !== todayStamp; });
    btn.classList.remove('confirming');
    saveProgress();
    showClientDay();
    renderWeekStreak();
    updateProgress();
  };
}

function showClientDay() {
  const wholeDay = clientWeek[clientDay];
  /*
   * isToday بقت معناها "ده التمرين اللي بيعمله النهاردة" مش
   * "ده يوم النهاردة في التقويم" — عشان يقدر يعمل أي يوم في أي يوم
   */
  const isToday = clientDay === sessionDay;
  if (clientSession < 0) clientSession = firstOpenSession(wholeDay, isToday);
  /* من هنا ورايح "day" = الحصة المعروضة بس (لو اليوم فيه حصة واحدة يبقى اليوم كله) */
  const day = Object.assign({}, clientView(), { rest: !!wholeDay.rest });
  const keyPrefix = clientPrefix();
  const multi = hasManySessions(wholeDay) && !wholeDay.rest;
  renderClientSessionTabs(wholeDay, isToday);

  dayName.textContent = multi
    ? sessionLabel(day, clientSession) + (day.time ? ' · ' + prettyTime(day.time) : '')
    : (tr(day.title) || (clientDay === todayIndex ? t('today_workout') : days()[clientDay]));
  clientSections.innerHTML = '';

  const badge = document.getElementById('sess-badge');
  if (badge) {
    if (clientDay === todayIndex) badge.textContent = t('sess_badge_today');
    else if (isToday) badge.textContent = fill('sess_badge_moved', { day: days()[clientDay] });
    else badge.textContent = days()[clientDay];
    badge.classList.toggle('muted', !isToday);
  }
  const sessCard = document.getElementById('sess-card');
  if (sessCard) sessCard.classList.toggle('is-rest', !!day.rest);
  renderSessStats(day);

  const startBtn = document.getElementById('start-session-btn');
  if (startBtn) startBtn.classList.toggle('hidden', !isToday || !!day.rest || dayCount(day) === 0);

  const total = dayCount(day);
  renderPickSessionBtn(wholeDay, isToday);
  finishButton.textContent = t('finish_workout');
  finishButton.classList.toggle('hidden', !isToday || day.rest || total === 0);
  resetButton.classList.toggle('hidden', !isToday || day.rest || total === 0);

  if (day.rest) {
    clientSections.appendChild(clientStateCard('rest', t('rest_title'), t('rest_msg')));
  } else if (total === 0) {
    clientSections.appendChild(clientStateCard('empty', t('no_plan_title'), t('no_plan')));
  } else {
    let order = 0;
    SECTION_KEYS.forEach(function (key) {
      const list = day.sections[key];
      if (!list.length) return;

      const tint = sectionTint(key);
      const block = document.createElement('div');
      block.className = 'section-block sec-' + key;
      block.style.setProperty('--sec', tint[0]);

      const head = document.createElement('div');
      head.className = 'section-head';

      const title = document.createElement('div');
      title.className = 'section-name';
      setIconLabel(title, sectionIconSvg(key), sectionName(key));
      head.appendChild(title);

      const count = document.createElement('div');
      count.className = 'section-count';
      count.textContent = fill('count_ex', { n: list.length });
      head.appendChild(count);

      block.appendChild(head);

      const ul = document.createElement('ul');
      list.forEach(function (exercise, index) {
        const exKey = keyPrefix + key + ':' + index;
        order += 1;
        const item = document.createElement('li');
        item.className = 'exc-card';
        item.style.setProperty('--sec', tint[0]);
        item.dataset.key = exKey;
        item.appendChild(clientExerciseCard(exercise, key, order));

        if (isToday && doneToday.indexOf(exKey) !== -1) {
          item.classList.add('done');
        }

        if (isToday) {
          /* السبحة: خرزة لكل مجموعة — الدوس عليها بيقفل المجموعة */
          const totalSets = exerciseSetCount(exercise) || 1;
          const beadsBox = document.createElement('div');
          beadsBox.className = 'beads';
          item.appendChild(beadsBox);

          function paintBeads() {
            const n = setsDoneFor(setsDoneToday, exKey, totalSets);
            renderBeads(beadsBox, totalSets, n, function (next) {
              setsDoneToday[exKey] = next;
              item.classList.toggle('done', next >= totalSets);
              paintBeads();
              updateProgress();
              saveProgress();
              finishButton.textContent = t('finish_workout');
            }, false);
            item.classList.toggle('done', n >= totalSets);
            syncCardCheck(item);
          }
          paintBeads();
          item.paintBeads = paintBeads;

          /* الدوس على الكارت نفسه = خلّص التمرين كله أو ارجعه من الأول */
          item.addEventListener('click', function () {
            const willBeDone = !item.classList.contains('done');
            setsDoneToday[exKey] = willBeDone ? totalSets : 0;
            item.classList.toggle('done', willBeDone);
            paintBeads();
            updateProgress();
            saveProgress();
            finishButton.textContent = t('finish_workout');
          });

          const logBtn = document.createElement('button');
          logBtn.type = 'button';
          logBtn.className = 'log-actual-btn';
          const logBtnIcon = document.createElement('span');
          logBtnIcon.className = 'inline-icon';
          logBtnIcon.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"></path><line x1="14" y1="7" x2="17" y2="10"></line></svg>';
          const logBtnLabel = document.createElement('span');
          logBtnLabel.textContent = t('log_actual_btn');
          logBtn.appendChild(logBtnIcon);
          logBtn.appendChild(logBtnLabel);
          const actualSummary = document.createElement('div');
          actualSummary.className = 'actual-summary';
          const actualBox = document.createElement('div');
          actualBox.className = 'per-set-box hidden';

          function refreshActualSummary() {
            const saved = actualSetsToday[exKey];
            actualSummary.textContent = (saved && saved.length) ? (t('actual_label') + ': ' + actualSummaryText(saved)) : '';
          }

          function renderActualBox() {
            actualBox.innerHTML = '';
            const rows = (actualSetsToday[exKey] && actualSetsToday[exKey].length)
              ? actualSetsToday[exKey] : defaultActualSets(exercise);
            rows.forEach(function (set, setIndex) {
              const row = document.createElement('div');
              row.className = 'per-set-row';

              const label = document.createElement('span');
              label.className = 'per-set-label';
              label.textContent = (setIndex + 1);
              row.appendChild(label);

              const weightInput = document.createElement('input');
              weightInput.type = 'text';
              weightInput.placeholder = t('per_set_weight');
              weightInput.value = set.weight || '';
              row.appendChild(weightInput);

              const repsInput = document.createElement('input');
              repsInput.type = 'text';
              repsInput.placeholder = t('ex_reps');
              repsInput.value = set.reps || '';
              row.appendChild(repsInput);

              function commit() {
                if (!actualSetsToday[exKey]) actualSetsToday[exKey] = rows.map(function (r) { return { weight: r.weight || '', reps: r.reps || '' }; });
                actualSetsToday[exKey][setIndex] = { weight: weightInput.value.trim(), reps: repsInput.value.trim() };
                saveActualSets();
                refreshActualSummary();
                updateProgress();
              }
              weightInput.addEventListener('change', commit);
              repsInput.addEventListener('change', commit);
              weightInput.addEventListener('click', function (event) { event.stopPropagation(); });
              repsInput.addEventListener('click', function (event) { event.stopPropagation(); });

              actualBox.appendChild(row);
            });
          }

          logBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            if (actualBox.classList.contains('hidden')) {
              renderActualBox();
              actualBox.classList.remove('hidden');
              logBtnLabel.textContent = t('hide_actual_btn');
            } else {
              actualBox.classList.add('hidden');
              logBtnLabel.textContent = t('log_actual_btn');
            }
          });

          actualBox.addEventListener('click', function (event) { event.stopPropagation(); });
          actualSummary.addEventListener('click', function (event) { event.stopPropagation(); });

          refreshActualSummary();
          item.appendChild(logBtn);
          item.appendChild(actualSummary);
          item.appendChild(actualBox);
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
    /* السبحة لازم تتفضى هي كمان، مش بس علامة التمرين */
    if (item.dataset.key) setsDoneToday[item.dataset.key] = 0;
    if (typeof item.paintBeads === 'function') item.paintBeads();
    else syncCardCheck(item);
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
    clientRehabPhases.appendChild(clientStateCard('empty', t('no_rehab_title'), t('no_rehab')));
    return;
  }

  const parts = [];
  if (clientRehab.bodyPart) parts.push(bodyPartName(clientRehab.bodyPart));
  if (clientRehab.injury) parts.push(tr(clientRehab.injury));
  clientRehabTitle.textContent = parts.join(' — ') || t('tab_rehab');

  if (clientRehab.about) {
    clientRehabAbout.textContent = tr(clientRehab.about);
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
    num.textContent = t('phase') + ' ' + (index + 1) + (phase.name ? ' — ' + tr(phase.name) : '');
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
      goal.textContent = tr(phase.goal);
      block.appendChild(goal);
    }

    if (phase.exercises.length) {
      const isCurrentPhase = index === clientRehab.currentPhase;
      const ul = document.createElement('ul');
      phase.exercises.forEach(function (exercise, exIndex) {
        const rehabExKey = 'p' + index + ':' + exIndex;
        const item = document.createElement('li');
        item.className = 'exc-card';
        item.style.setProperty('--sec', sectionTint('mobility')[0]);
        item.appendChild(clientExerciseCard(exercise, 'mobility', exIndex + 1));

        if (isCurrentPhase && rehabDoneToday.indexOf(rehabExKey) !== -1) {
          item.classList.add('done');
        }
        syncCardCheck(item);

        if (isCurrentPhase) {
          const totalSets = exerciseSetCount(exercise) || 1;
          const beadsBox = document.createElement('div');
          beadsBox.className = 'beads';
          item.appendChild(beadsBox);

          function markRehabDone(isDone) {
            item.classList.toggle('done', isDone);
            syncCardCheck(item);
            const pos = rehabDoneToday.indexOf(rehabExKey);
            if (isDone) {
              if (pos === -1) rehabDoneToday.push(rehabExKey);
            } else if (pos !== -1) {
              rehabDoneToday.splice(pos, 1);
            }
          }

          function paintRehabBeads() {
            const n = setsDoneFor(rehabSetsDoneToday, rehabExKey, totalSets);
            renderBeads(beadsBox, totalSets, n, function (next) {
              rehabSetsDoneToday[rehabExKey] = next;
              markRehabDone(next >= totalSets);
              paintRehabBeads();
              saveRehabProgress();
            }, false);
            markRehabDone(n >= totalSets);
          }

          if (rehabDoneToday.indexOf(rehabExKey) !== -1 && rehabSetsDoneToday[rehabExKey] === undefined) {
            rehabSetsDoneToday[rehabExKey] = -1;
          }
          paintRehabBeads();

          item.addEventListener('click', function () {
            const willBeDone = !item.classList.contains('done');
            rehabSetsDoneToday[rehabExKey] = willBeDone ? totalSets : 0;
            markRehabDone(willBeDone);
            paintRehabBeads();
            saveRehabProgress();
          });

          const logBtn = document.createElement('button');
          logBtn.type = 'button';
          logBtn.className = 'log-actual-btn';
          const logBtnIcon = document.createElement('span');
          logBtnIcon.className = 'inline-icon';
          logBtnIcon.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"></path><line x1="14" y1="7" x2="17" y2="10"></line></svg>';
          const logBtnLabel = document.createElement('span');
          logBtnLabel.textContent = t('log_actual_btn');
          logBtn.appendChild(logBtnIcon);
          logBtn.appendChild(logBtnLabel);
          const actualSummary = document.createElement('div');
          actualSummary.className = 'actual-summary';
          const actualBox = document.createElement('div');
          actualBox.className = 'per-set-box hidden';

          function refreshActualSummary() {
            const saved = rehabActualSetsToday[rehabExKey];
            actualSummary.textContent = (saved && saved.length) ? (t('actual_label') + ': ' + actualSummaryText(saved)) : '';
          }

          function renderActualBox() {
            actualBox.innerHTML = '';
            const rows = (rehabActualSetsToday[rehabExKey] && rehabActualSetsToday[rehabExKey].length)
              ? rehabActualSetsToday[rehabExKey] : defaultActualSets(exercise);
            rows.forEach(function (set, setIndex) {
              const row = document.createElement('div');
              row.className = 'per-set-row';

              const label = document.createElement('span');
              label.className = 'per-set-label';
              label.textContent = (setIndex + 1);
              row.appendChild(label);

              const weightInput = document.createElement('input');
              weightInput.type = 'text';
              weightInput.placeholder = t('per_set_weight');
              weightInput.value = set.weight || '';
              row.appendChild(weightInput);

              const repsInput = document.createElement('input');
              repsInput.type = 'text';
              repsInput.placeholder = t('ex_reps');
              repsInput.value = set.reps || '';
              row.appendChild(repsInput);

              function commit() {
                if (!rehabActualSetsToday[rehabExKey]) rehabActualSetsToday[rehabExKey] = rows.map(function (r) { return { weight: r.weight || '', reps: r.reps || '' }; });
                rehabActualSetsToday[rehabExKey][setIndex] = { weight: weightInput.value.trim(), reps: repsInput.value.trim() };
                saveRehabProgress();
                refreshActualSummary();
              }
              weightInput.addEventListener('change', commit);
              repsInput.addEventListener('change', commit);
              weightInput.addEventListener('click', function (event) { event.stopPropagation(); });
              repsInput.addEventListener('click', function (event) { event.stopPropagation(); });

              actualBox.appendChild(row);
            });
          }

          logBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            if (actualBox.classList.contains('hidden')) {
              renderActualBox();
              actualBox.classList.remove('hidden');
              logBtnLabel.textContent = t('hide_actual_btn');
            } else {
              actualBox.classList.add('hidden');
              logBtnLabel.textContent = t('log_actual_btn');
            }
          });

          actualBox.addEventListener('click', function (event) { event.stopPropagation(); });
          actualSummary.addEventListener('click', function (event) { event.stopPropagation(); });

          refreshActualSummary();
          item.appendChild(logBtn);
          item.appendChild(actualSummary);
          item.appendChild(actualBox);
        }

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
      criteria.appendChild(iconSvg('target', 'ui-icon'));
    criteria.appendChild(document.createTextNode(' ' + tr(phase.criteria)));
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

// أيقونة احتياطية للأصناف اللي المدرب بيضيفها بنفسه (مالهاش أيقونة محفوظة)
const FOOD_CATEGORY_ICONS = {
  protein: 'meat', carb: 'bowl', dairy: 'milk', fruit: 'apple', veg: 'salad',
  fat: 'nut', dish: 'bowl', drink: 'cup', supplement: 'pill'
};

function foodCategoryIcon(key) {
  return FOOD_CATEGORY_ICONS[key] || 'plate';
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
    supplements: [],
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

  // خطة المكملات — بتتحفظ جنب الوجبات في نفس المستند
  if (Array.isArray(data.supplements)) {
    clean.supplements = data.supplements.filter(function (item) {
      return item && typeof item === 'object';
    }).map(function (item) {
      return {
        supId: item.supId || '',
        name: item.name || '',
        dose: item.dose || '',
        when: item.when || '',
        note: item.note || ''
      };
    });
  }
  return clean;
}

/* عنصر أكل داخل وجبة — بنحفظ قيم الـ100جم وقت الإضافة عشان تعديل
   المكتبة بعدين ميغيّرش خطط قديمة من غير ما تاخد بالك */
function makeFoodItem(food, grams) {
  return {
    name: food[lang] || food.ar || food.en || food.name || '',
    // بنحفظ معرّف الصنف كمان مش الاسم بس، عشان لما العميل يبدّل اللغة
    // يشوف الاسم بلغته هو مش بلغة اللي كتب الوجبة
    foodId: food.id || '',
    grams: Number(grams) || 100,
    c100: Number(food.c) || 0,
    p100: Number(food.p) || 0,
    cb100: Number(food.cb) || 0,
    f100: Number(food.f) || 0
  };
}

/*
 * اسم الصنف المعروض: لو الصنف اتضاف من المكتبة (عنده foodId) بنعرض اسمه
 * بلغة الواجهة الحالية، ولو مش موجود (صنف قديم أو مكتوب بالإيد) بنعرض
 * الاسم المحفوظ زي ما هو
 */
function foodById(id) {
  if (!id) return null;
  return allFoods().filter(function (f) { return f.id === id; })[0] || null;
}

function foodDisplayName(item) {
  if (item && item.foodId) {
    const found = foodById(item.foodId);
    if (found) return found[lang] || found.ar || found.en || item.name || '';
  }
  return (item && item.name) || '';
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
  // خطة مكملات لوحدها من غير وجبات لسه محتوى — لازم تبويب التغذية
  // يفضل ظاهر للعميل عشان يشوفها
  if (Array.isArray(data.supplements) && data.supplements.length) return true;
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
    option.textContent = mealName(key);
    targetMeal.appendChild(option);
  });
  targetMeal.value = keep || 'breakfast';
  if (!targetMeal.value) targetMeal.value = 'breakfast';
}

function foodItemRow(item, list, index, editable, onChange) {
  const li = document.createElement('li');

  /* أيقونة الصنف جنب اسمه في الوجبة — بتتجاب من المكتبة بالمعرّف،
     فالبرامج القديمة اللي اتحفظت قبل الأيقونات بتشتغل عادي من غيرها */
  const source = item.foodId ? foodById(item.foodId) : null;
  if (source && (source.icon || source.cat)) {
    const icon = document.createElement('span');
    icon.className = 'meal-food-icon';
    icon.appendChild(iconSvg(foodCategoryIcon(source.cat), 'ui-icon'));
    li.appendChild(icon);
  }

  const info = document.createElement('div');

  const name = document.createElement('div');
  name.className = 'food-name';
  name.textContent = foodDisplayName(item);
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
    remove.innerHTML = DELETE_ICON_SVG;
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
    container.appendChild(clientStateCard('empty', t('no_meals_title'), t('no_meals')));
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
    setIconLabel(title, mealIconSvg(key), mealName(key));
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


/* ============================================================
   مكتبة برامج التغذية
   المدرب كان بيبني أسبوع الأكل صنف صنف لكل عميل من الصفر. دلوقتي
   بيختار برنامج قريب من حالته، بيتطبّق على الأسبوع كله في دوسة،
   وبعدين يعدّل عليه. الأصناف بتتبني من مكتبة الأغذية وقت التطبيق،
   فالقيم اللي بتتحفظ هي نفس قيم المكتبة مش أرقام محفوظة قديمة
   ============================================================ */

function nutProgramName(program) {
  return program[lang] || program.ar || program.en || program.id;
}

function nutProgramDesc(program) {
  const d = program.desc || {};
  return d[lang] || d.ar || d.en || '';
}

/* بيحوّل نمط يوم في المكتبة لوجبات حقيقية بقيم من مكتبة الأغذية */
function buildProgramDay(pattern) {
  const day = { meals: blankMeals() };
  MEAL_KEYS.forEach(function (mealKey) {
    const list = (pattern && pattern[mealKey]) || [];
    day.meals[mealKey] = list.map(function (row) {
      const food = foodById(row.id);
      // صنف مش موجود في المكتبة = بنعدّيه بدل ما نحفظ صفر ونضلّل المدرب
      if (!food) return null;
      return makeFoodItem(food, row.g);
    }).filter(Boolean);
  });
  return day;
}

/* أنماط الأيام بتتوزّع على السبعة بالدور */
function applyNutritionProgram(program) {
  const patterns = program.days || [];
  if (!patterns.length) return;
  coachNutrition.targets = {
    kcal: program.targets.kcal,
    protein: program.targets.protein,
    carbs: program.targets.carbs,
    fat: program.targets.fat
  };
  for (let i = 0; i < 7; i++) {
    coachNutrition.week[i] = buildProgramDay(patterns[i % patterns.length]);
  }
}

function renderNutProgramLibrary() {
  const grid = document.getElementById('nut-lib-grid');
  if (!grid) return;
  grid.innerHTML = '';

  NUTRITION_PROGRAMS.forEach(function (program) {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'nutprog';
    cell.setAttribute('data-id', program.id);

    const name = document.createElement('strong');
    name.className = 'np-name';
    name.textContent = nutProgramName(program);
    cell.appendChild(name);

    const nums = document.createElement('span');
    nums.className = 'np-nums';
    nums.textContent = fill('np_numbers', {
      kcal: program.targets.kcal,
      protein: program.targets.protein
    });
    cell.appendChild(nums);

    const desc = document.createElement('span');
    desc.className = 'np-desc';
    desc.textContent = nutProgramDesc(program);
    cell.appendChild(desc);

    cell.addEventListener('click', function () {
      applyNutritionProgram(program);
      showNutrition();
      setStatusMessage(
        document.getElementById('nut-lib-message'),
        fill('np_applied', { name: nutProgramName(program) }),
        'success'
      );
    });
    grid.appendChild(cell);
  });
}

function showNutrition() {
  tgKcal.value = coachNutrition.targets.kcal || '';
  tgProtein.value = coachNutrition.targets.protein || '';
  tgCarbs.value = coachNutrition.targets.carbs || '';
  tgFat.value = coachNutrition.targets.fat || '';

  renderNutProgramLibrary();

  const day = coachNutrition.week[nutDay];
  renderTotals(nutTotalsBox, dayTotals(day), coachNutrition.targets);
  renderMeals(nutMeals, day, true, showNutrition);
  fillMealPicker();
  renderSuppPlan();
  showNutritionDays();
}

document.getElementById('save-nutrition-btn').addEventListener('click', async function () {
  readTargets();
  coachMessage.textContent = t('saving');
  try {
    await setDoc(doc(db, 'nutrition', currentClient), coachNutrition);
    setStatusMessage(coachMessage, t('saved_nutrition'), 'success');
    notifyProgramChange('nutrition', 'nutrition');
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

document.getElementById('open-food-btn').addEventListener('click', function () {
  if (!guardLibrary('food', coachMessage)) return;
  openFoodLibrary();
});

document.getElementById('food-back-btn').addEventListener('click', function () {
  showScreen(coachScreen);
  showNutrition();
});

/* ==================== مكتبة المكملات والفيتامينات ==================== */
/*
 * مرجع تعليمي للمدرب/المتخصص: كل مكمل مكتوب جنبه الجرعة الشائعة
 * والتوقيت وبيستخدم ليه وتحذيراته وقوة الدليل العلمي عليه. المدرب
 * بيختار اللي يناسب العميل فيتحفظ جوه مستند التغذية بتاعه (supplements)
 * والعميل بيشوفه في تبويب التغذية للقراءة بس.
 */

const suppSearch = document.getElementById('supp-search');
const suppChips = document.getElementById('supp-chips');
const suppList = document.getElementById('supp-list');
const suppMessage = document.getElementById('supp-message');
const suppPlanList = document.getElementById('supp-plan-list');
const suppPlanEmpty = document.getElementById('supp-plan-empty');
let activeSuppCat = '';

function suppCategoryName(key) {
  return (SUPPLEMENT_CATEGORIES[key] && SUPPLEMENT_CATEGORIES[key][lang]) || key;
}

function suppGradeName(key) {
  return (EVIDENCE_GRADES[key] && EVIDENCE_GRADES[key][lang]) || key;
}

function supplementById(id) {
  return SUPPLEMENT_LIBRARY.filter(function (s) { return s.id === id; })[0] || null;
}

function suppText(field) {
  return (field && (field[lang] || field.ar || field.en)) || '';
}

function openSupplementLibrary() {
  showScreen(supplementsScreen);
  suppSearch.value = '';
  renderSuppChips();
  renderSuppList();
}

function renderSuppChips() {
  suppChips.innerHTML = '';
  [''].concat(Object.keys(SUPPLEMENT_CATEGORIES)).forEach(function (key) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip' + (key === activeSuppCat ? ' active' : '');
    chip.textContent = key === '' ? t('all_supps') : suppCategoryName(key);
    chip.addEventListener('click', function () {
      activeSuppCat = key;
      renderSuppChips();
      renderSuppList();
    });
    suppChips.appendChild(chip);
  });
}

function suppDetailRow(label, value) {
  if (!value) return null;
  const row = document.createElement('div');
  row.className = 'supp-row';
  const strong = document.createElement('span');
  strong.className = 'supp-row-label';
  strong.textContent = label + ': ';
  row.appendChild(strong);
  row.appendChild(document.createTextNode(value));
  return row;
}

function renderSuppList() {
  const term = suppSearch.value.trim().toLowerCase();

  const matches = SUPPLEMENT_LIBRARY.filter(function (item) {
    if (activeSuppCat && item.cat !== activeSuppCat) return false;
    if (!term) return true;
    return String(item.ar).toLowerCase().indexOf(term) !== -1
        || String(item.en).toLowerCase().indexOf(term) !== -1;
  });

  suppList.innerHTML = '';

  matches.forEach(function (item) {
    const li = document.createElement('li');
    li.className = 'supp-card';

    const head = document.createElement('div');
    head.className = 'supp-head';

    const icon = document.createElement('span');
    icon.className = 'supp-icon';
    icon.appendChild(iconSvg('pill', 'ui-icon'));
    head.appendChild(icon);

    const titleBox = document.createElement('div');
    titleBox.className = 'supp-title-box';

    const title = document.createElement('div');
    title.className = 'supp-name';
    title.textContent = item[lang] || item.ar;
    titleBox.appendChild(title);

    const meta = document.createElement('div');
    meta.className = 'supp-meta';
    const grade = document.createElement('span');
    grade.className = 'supp-grade supp-grade-' + item.grade;
    grade.textContent = suppGradeName(item.grade);
    meta.appendChild(grade);
    const cat = document.createElement('span');
    cat.className = 'supp-cat';
    cat.textContent = suppCategoryName(item.cat);
    meta.appendChild(cat);
    titleBox.appendChild(meta);

    head.appendChild(titleBox);
    li.appendChild(head);

    const body = document.createElement('div');
    body.className = 'supp-body';
    [
      suppDetailRow(t('supp_dose'), suppText(item.dose)),
      suppDetailRow(t('supp_when'), suppText(item.when)),
      suppDetailRow(t('supp_use'), suppText(item.use))
    ].forEach(function (row) { if (row) body.appendChild(row); });

    const care = document.createElement('p');
    care.className = 'supp-care';
    care.textContent = suppText(item.care);
    body.appendChild(care);
    li.appendChild(body);

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'secondary supp-add-btn';
    const already = suppPlan().some(function (p) { return p.supId === item.id; });
    addBtn.textContent = already ? t('supp_already_added') : t('supp_add_to_plan');
    addBtn.disabled = already;
    addBtn.addEventListener('click', function () {
      addSupplementToPlan(item);
      renderSuppList();
      suppMessage.textContent = fill('supp_added', { name: item[lang] || item.ar });
    });
    li.appendChild(addBtn);

    suppList.appendChild(li);
  });

  if (!matches.length) suppMessage.textContent = t('no_matches');
}

function suppPlan() {
  if (!coachNutrition) return [];
  if (!Array.isArray(coachNutrition.supplements)) coachNutrition.supplements = [];
  return coachNutrition.supplements;
}

function addSupplementToPlan(item) {
  const plan = suppPlan();
  if (plan.some(function (p) { return p.supId === item.id; })) return;
  plan.push({
    supId: item.id,
    name: item[lang] || item.ar,
    dose: suppText(item.dose),
    when: suppText(item.when),
    note: ''
  });
  renderSuppPlan();
}

/* بيرسم خطة المكملات — عند المدرب قابلة للتعديل، وعند العميل للقراءة بس */
function renderSuppPlanInto(listEl, plan, editable) {
  listEl.innerHTML = '';

  plan.forEach(function (entry, index) {
    const source = supplementById(entry.supId);
    const li = document.createElement('li');
    li.className = 'supp-plan-item';

    const icon = document.createElement('span');
    icon.className = 'supp-icon';
    icon.appendChild(iconSvg('pill', 'ui-icon'));
    li.appendChild(icon);

    const info = document.createElement('div');
    info.className = 'supp-plan-info';

    const name = document.createElement('div');
    name.className = 'supp-name';
    // الاسم بيتاخد من المكتبة بلغة الواجهة، وبيرجع للمحفوظ لو المكمل اتشال
    name.textContent = source ? (source[lang] || source.ar) : (entry.name || '');
    info.appendChild(name);

    if (editable) {
      const doseInput = document.createElement('input');
      doseInput.className = 'supp-input';
      doseInput.value = entry.dose || '';
      doseInput.placeholder = t('supp_dose');
      doseInput.addEventListener('input', function () { entry.dose = doseInput.value; });
      info.appendChild(doseInput);

      const whenInput = document.createElement('input');
      whenInput.className = 'supp-input';
      whenInput.value = entry.when || '';
      whenInput.placeholder = t('supp_when');
      whenInput.addEventListener('input', function () { entry.when = whenInput.value; });
      info.appendChild(whenInput);

      const noteInput = document.createElement('input');
      noteInput.className = 'supp-input';
      noteInput.value = entry.note || '';
      noteInput.placeholder = t('supp_note_ph');
      noteInput.addEventListener('input', function () { entry.note = noteInput.value; });
      info.appendChild(noteInput);
    } else {
      const detail = document.createElement('div');
      detail.className = 'supp-plan-detail';
      const bits = [];
      if (entry.dose) bits.push(t('supp_dose') + ': ' + localiseReps(tr(entry.dose)));
      if (entry.when) bits.push(t('supp_when') + ': ' + localiseReps(tr(entry.when)));
      detail.textContent = bits.join('  ·  ');
      info.appendChild(detail);

      if (entry.note) {
        const note = document.createElement('div');
        note.className = 'supp-plan-note';
        note.textContent = entry.note;
        info.appendChild(note);
      }
      if (source) {
        const care = document.createElement('div');
        care.className = 'supp-care';
        care.textContent = suppText(source.care);
        info.appendChild(care);
      }
    }

    li.appendChild(info);

    if (editable) {
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'secondary supp-del-btn';
      del.appendChild(iconSvg('close', 'ui-icon'));
      del.title = t('remove');
      del.addEventListener('click', function () {
        plan.splice(index, 1);
        renderSuppPlan();
      });
      li.appendChild(del);
    }

    listEl.appendChild(li);
  });
}

function renderSuppPlan() {
  if (!suppPlanList) return;
  const plan = suppPlan();
  renderSuppPlanInto(suppPlanList, plan, true);
  if (suppPlanEmpty) suppPlanEmpty.classList.toggle('hidden', plan.length > 0);
}

if (document.getElementById('open-supplements-btn')) {
  document.getElementById('open-supplements-btn').addEventListener('click', function () {
    if (!guardLibrary('supplements', coachMessage)) return;
    openSupplementLibrary();
  });
}

document.getElementById('supp-back-btn').addEventListener('click', function () {
  showScreen(coachScreen);
  showNutrition();
});

suppSearch.addEventListener('input', renderSuppList);

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
  ensureLibraryImagesLoaded().then(function () {
    if (typeof foodScreen !== 'undefined' && foodScreen && !foodScreen.classList.contains('hidden')) renderFoodList();
  });
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
      resetFoodPage();
      renderFoodChips();
      renderFoodList();
    });
    foodChips.appendChild(chip);
  });
}

let foodShown = LIB_PAGE;
function resetFoodPage() { foodShown = LIB_PAGE; }

function renderFoodList() {
  const term = foodSearch.value.trim().toLowerCase();

  const matches = allFoods().filter(function (food) {
    if (activeFoodCat && food.cat !== activeFoodCat) return false;
    if (!term) return true;
    return String(food.ar || '').toLowerCase().indexOf(term) !== -1
        || String(food.en || '').toLowerCase().indexOf(term) !== -1;
  });

  foodList.innerHTML = '';

  matches.slice(0, foodShown).forEach(function (food) {
    const li = document.createElement('li');

    const foodImageKey = 'food_' + food.id;
    const foodPhoto = libraryImageFor(foodImageKey);

    if (foodPhoto) {
      const thumb = document.createElement('img');
      thumb.className = 'food-thumb';
      thumb.src = foodPhoto;
      thumb.alt = '';
      thumb.loading = 'lazy';
      thumb.addEventListener('click', function (event) {
        event.stopPropagation();
        lightboxTitle.textContent = food[lang] || food.ar || food.en;
        lightboxImages.innerHTML = '';
        addShot(foodPhoto, '');
        lightbox.classList.remove('hidden');
      });
      li.appendChild(thumb);
    } else {
      /*
       * مفيش صورة مرفوعة للصنف ده — بنعرض أيقونة الصنف نفسه (كل صنف في
       * المكتبة ليه أيقونته) بدل زرار فاضي، فالمكتبة بقى ليها شكل بصري
       * من غير ما نحمّل أي صور من النت. الضغط على الأيقونة لسه بيفتح
       * رفع صورة حقيقية لو المدرب عايز
       */
      const iconBtn = document.createElement('button');
      iconBtn.type = 'button';
      iconBtn.className = 'food-photo-btn food-icon-btn';
      iconBtn.title = t('add_photo_short');
      iconBtn.appendChild(iconSvg(foodCategoryIcon(food.cat), 'ui-icon'));
      iconBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        pickLibraryImage(foodImageKey);
      });
      li.appendChild(iconBtn);
    }

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

  const shownFoods = Math.min(foodShown, matches.length);
  foodMessage.textContent = matches.length
    ? (matches.length > shownFoods
        ? fill('showing', { a: shownFoods, b: matches.length })
        : fill('food_count', { n: matches.length }))
    : t('no_matches');

  renderMoreBtn('food-more-btn', foodList, matches.length, shownFoods, function () {
    foodShown += LIB_PAGE;
    renderFoodList();
  });
}

foodSearch.addEventListener('input', function () { resetFoodPage(); renderFoodList(); });

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
    setStatusMessage(foodMessage, t('food_saved'), 'success');
  } catch (error) {
    foodMessage.textContent = t('problem') + error.message;
  }
});

/* ---------- شاشة العميل — التغذية ---------- */

const cnutTotals = document.getElementById('cnut-totals');
const cnutMeals = document.getElementById('cnut-meals');
const cnutFuel = document.getElementById('cnut-fuel');

/*
 * كارت الوقود — بديل صف الأرقام الجاف: قوس سعرات كبير في النص،
 * وتحته تلات شرايط للماكروز بلون لكل واحد. العميل يشوف في لمحة
 * هو واصل فين من هدف اليوم
 */
const FUEL_MACROS = [
  { key: 'protein', color: '#22c55e' },
  { key: 'carbs',   color: '#38bdf8' },
  { key: 'fat',     color: '#f59e0b' }
];

const FUEL_ARC_LEN = 2 * Math.PI * 52;

function renderFuelCard(box, totals, targets, planned) {
  if (!box) return;
  box.innerHTML = '';
  const tgs = targets || {};

  const kcal = Math.round(totals.kcal);
  const kcalTarget = Math.round(tgs.kcal || 0);
  const pct = kcalTarget ? Math.min(100, (kcal / kcalTarget) * 100) : 0;

  const wrap = document.createElement('div');
  wrap.className = 'fuel-arc-wrap';
  /* قوس مفتوح من تحت (٢٧٠ درجة) عشان يبان مختلف عن دواير الأيام */
  wrap.innerHTML =
    '<svg class="fuel-arc" viewBox="0 0 120 120" aria-hidden="true">' +
      '<circle class="fa-bg" cx="60" cy="60" r="52"></circle>' +
      '<circle class="fa-fg" cx="60" cy="60" r="52"></circle>' +
    '</svg>';
  const fg = wrap.querySelector('.fa-fg');
  fg.style.strokeDasharray = (FUEL_ARC_LEN * 0.75).toFixed(1) + ' ' + FUEL_ARC_LEN.toFixed(1);
  fg.style.strokeDashoffset = (FUEL_ARC_LEN * 0.75 * (1 - pct / 100)).toFixed(1);

  const center = document.createElement('div');
  center.className = 'fuel-center';

  /*
   * لما العميل بيسجّل: الرقم الكبير = الباقي ليه النهاردة (زي أشهر
   * تطبيقات التغذية)، لأن "فاضلك ٧٦٠ سعر" قرار، و"أكلت ١٨٤٠" مجرد خبر
   */
  const logging = planned !== undefined && planned !== null;
  const left = kcalTarget ? (kcalTarget - kcal) : 0;

  const value = document.createElement('div');
  value.className = 'fuel-kcal';
  if (logging && kcalTarget) {
    value.textContent = Math.abs(Math.round(left)).toLocaleString();
    value.classList.toggle('over', left < 0);
  } else {
    value.textContent = kcal.toLocaleString();
  }
  center.appendChild(value);

  const unit = document.createElement('div');
  unit.className = 'fuel-unit';
  if (logging && kcalTarget) {
    unit.textContent = left < 0 ? t('fuel_over') : t('fuel_left');
  } else {
    unit.textContent = kcalTarget ? (t('fuel_of') + ' ' + kcalTarget.toLocaleString() + ' ' + t('t_kcal')) : t('t_kcal');
  }
  center.appendChild(unit);

  if (logging && kcalTarget) {
    const line = document.createElement('div');
    line.className = 'fuel-line';
    line.textContent = fill('fuel_summary', {
      a: kcal.toLocaleString(),
      b: Math.round(planned.kcal).toLocaleString(),
      c: kcalTarget.toLocaleString()
    });
    center.appendChild(line);
  }

  wrap.appendChild(center);
  box.appendChild(wrap);

  const bars = document.createElement('div');
  bars.className = 'fuel-macros';

  FUEL_MACROS.forEach(function (macro) {
    const target = Math.round(tgs[macro.key] || 0);
    const value2 = Math.round(totals[macro.key] || 0);

    const row = document.createElement('div');
    row.className = 'fuel-macro';
    row.style.setProperty('--m', macro.color);

    const head = document.createElement('div');
    head.className = 'fm-head';

    const label = document.createElement('span');
    label.className = 'fm-label';
    label.textContent = t('t_' + macro.key);
    head.appendChild(label);

    const num = document.createElement('span');
    num.className = 'fm-num';
    num.textContent = target ? (value2 + ' / ' + target + t('fuel_g')) : (value2 + t('fuel_g'));
    head.appendChild(num);

    row.appendChild(head);

    const bar = document.createElement('div');
    bar.className = 'fm-bar';
    const fillBar = document.createElement('span');
    const mpct = target ? Math.min(100, (value2 / target) * 100) : 0;
    fillBar.style.width = mpct + '%';
    if (target && value2 > target * 1.05) fillBar.classList.add('over');
    bar.appendChild(fillBar);
    row.appendChild(bar);

    bars.appendChild(row);
  });

  box.appendChild(bars);
}

/* ============================================================
   حلقة التسجيل — العميل يسجّل اللي أكله فعلًا مش يتفرّج بس
   من غير الحلقة دي المدرب مش عارف العميل التزم ولا لأ، وعدّاد
   السعرات بيقول "الخطة" مش "الواقع"
   ============================================================ */

/* foodlog/{email} = { days: { 'YYYY-MM-DD': { eaten:[], extra:[], water:0 } } } */
let clientFoodLog = {};
const WATER_GOAL_DEFAULT = 8;
const LOG_KEEP_DAYS = 60;

function blankLogDay() {
  return { eaten: [], extra: [], water: 0 };
}

function logDay(stamp) {
  const key = stamp || todayStamp;
  if (!clientFoodLog[key]) clientFoodLog[key] = blankLogDay();
  const day = clientFoodLog[key];
  if (!Array.isArray(day.eaten)) day.eaten = [];
  if (!Array.isArray(day.extra)) day.extra = [];
  if (typeof day.water !== 'number') day.water = 0;
  return day;
}

/* التسجيل بيتحفظ لليوم الحالي بس — مفيش تسجيل بأثر رجعي */
function loggingDayStamp() {
  return todayStamp;
}

function isLoggingDay() {
  return cNutDay === todayIndex;
}

function saveFoodLog() {
  /* بنقصّ الأيام القديمة عشان المستند ميكبرش على حد فايرستور */
  const keys = Object.keys(clientFoodLog).sort();
  while (keys.length > LOG_KEEP_DAYS) {
    delete clientFoodLog[keys.shift()];
  }
  setDoc(doc(db, 'foodlog', clientEmail), { days: clientFoodLog }, { merge: true });
}

async function loadFoodLog(email) {
  try {
    const snap = await getDoc(doc(db, 'foodlog', email));
    clientFoodLog = (snap.exists() && snap.data().days) ? snap.data().days : {};
  } catch (error) {
    clientFoodLog = {};
  }
}

/* مجاميع اللي اتأكل فعلًا النهاردة = وجبات الخطة المعلّمة + اللي اتضاف زيادة */
function eatenTotals(day) {
  const log = logDay();
  const total = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

  if (day) {
    MEAL_KEYS.forEach(function (key) {
      (day.meals[key] || []).forEach(function (item, index) {
        if (log.eaten.indexOf(key + ':' + index) === -1) return;
        const m = itemMacros(item);
        total.kcal += m.kcal;
        total.protein += m.protein;
        total.carbs += m.carbs;
        total.fat += m.fat;
      });
    });
  }

  log.extra.forEach(function (item) {
    const m = itemMacros(item);
    total.kcal += m.kcal;
    total.protein += m.protein;
    total.carbs += m.carbs;
    total.fat += m.fat;
  });

  return total;
}

/* ---------- سبحة المياه ---------- */

function waterGoal() {
  const target = clientNutrition && clientNutrition.targets && clientNutrition.targets.water;
  return Number(target) || WATER_GOAL_DEFAULT;
}

function renderWaterCard() {
  const card = document.getElementById('cnut-water');
  const beads = document.getElementById('water-beads');
  const count = document.getElementById('water-count');
  if (!card || !beads || !count) return;

  /* المياه بتتسجل لليوم الحالي بس */
  card.classList.toggle('hidden', !isLoggingDay());
  if (!isLoggingDay()) return;

  const goal = waterGoal();
  const log = logDay();
  const drunk = Math.max(0, Math.min(goal, log.water || 0));

  count.textContent = fill('water_count', { a: drunk, b: goal });
  count.classList.toggle('all-done', drunk >= goal);

  renderBeads(beads, goal, drunk, function (next) {
    logDay().water = next;
    saveFoodLog();
    renderWaterCard();
  }, false);
}

/* ---------- شيت اختيار الأكل ---------- */

const foodPicker = document.getElementById('food-picker');
const pickerSearch = document.getElementById('picker-search');
const pickerChips = document.getElementById('picker-chips');
const pickerList = document.getElementById('picker-list');
const pickerAmount = document.getElementById('picker-amount');
const paQty = document.getElementById('pa-qty');
let pickerMeal = 'breakfast';
let pickerCat = '';
let pickerFood = null;

/*
 * المقادير البيتية — العميل بيفكّر بـ"كوبين رز" مش بـ"٣١٦ جرام"،
 * ومفيش عميل عنده ميزان مطبخ. بنعرضله وحداته وهو يختار العدد،
 * وإحنا بنحوّل للجرام في الخلفية
 */
let pickerUnit = null;   /* ['cup', 158] أو null يعني بالجرام */
let pickerApprox = false;

function unitName(key) {
  const unit = FOOD_UNITS[key];
  if (!unit) return key;
  return unit[lang] || unit.ar || key;
}

function unitStep(key) {
  return (FOOD_UNITS[key] && FOOD_UNITS[key].step) || 1;
}

/* مقادير الصنف: المكتوبة له، وإلا مقادير تصنيفه — وساعتها تقديرية */
function foodServings(food) {
  if (!food) return { list: [], approx: false };
  const own = FOOD_SERVINGS[food.id];
  if (own && own.length) return { list: own, approx: false };
  const fallback = CAT_PORTIONS[food.cat] || [];
  return { list: fallback, approx: fallback.length > 0 };
}

/* رقم نضيف: 1 مش 1.0، و1.5 تفضل 1.5 */
function tidyNumber(value) {
  const n = Number(value) || 0;
  return (Math.round(n * 100) / 100).toString();
}

function pickerGrams() {
  const qty = Number(paQty.value) || 0;
  return pickerUnit ? (qty * pickerUnit[1]) : qty;
}

function openFoodPicker(mealKey) {
  pickerMeal = mealKey;
  pickerCat = '';
  pickerFood = null;
  pickerSearch.value = '';
  pickerAmount.classList.add('hidden');
  document.getElementById('picker-title').textContent =
    t('picker_title') + ' — ' + mealName(mealKey);
  renderPickerChips();
  renderPickerList();
  foodPicker.classList.remove('hidden');
  document.body.classList.add('focus-open');
}

function closeFoodPicker() {
  foodPicker.classList.add('hidden');
  document.body.classList.remove('focus-open');
}

function renderPickerChips() {
  pickerChips.innerHTML = '';
  const cats = [''].concat(Object.keys(FOOD_CATEGORIES));
  cats.forEach(function (key) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'picker-chip' + (key === pickerCat ? ' active' : '');
    chip.textContent = key ? (FOOD_CATEGORIES[key][lang] || FOOD_CATEGORIES[key].ar) : t('all_foods');
    chip.addEventListener('click', function () {
      pickerCat = key;
      renderPickerChips();
      renderPickerList();
    });
    pickerChips.appendChild(chip);
  });
}

function renderPickerList() {
  const term = pickerSearch.value.trim().toLowerCase();
  const matches = allFoods().filter(function (food) {
    if (pickerCat && food.cat !== pickerCat) return false;
    if (!term) return true;
    return String(food.ar || '').toLowerCase().indexOf(term) !== -1
        || String(food.en || '').toLowerCase().indexOf(term) !== -1;
  });

  pickerList.innerHTML = '';
  if (!matches.length) {
    const empty = document.createElement('li');
    empty.className = 'picker-empty';
    empty.textContent = t('no_results');
    pickerList.appendChild(empty);
    return;
  }

  matches.slice(0, 60).forEach(function (food) {
    const li = document.createElement('li');
    li.className = 'picker-item';

    const icon = document.createElement('span');
    icon.className = 'meal-food-icon';
    icon.appendChild(iconSvg(foodCategoryIcon(food.cat), 'ui-icon'));
    li.appendChild(icon);

    const info = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'food-name';
    name.textContent = food[lang] || food.ar || food.en || '';
    info.appendChild(name);

    const per = document.createElement('div');
    per.className = 'food-per100';
    per.textContent = Math.round(food.c || 0) + ' ' + t('t_kcal') + ' / 100' + t('fuel_g');
    info.appendChild(per);
    li.appendChild(info);

    li.addEventListener('click', function () { pickFood(food); });
    pickerList.appendChild(li);
  });
}

function pickFood(food) {
  pickerFood = food;
  document.getElementById('pa-name').textContent = food[lang] || food.ar || food.en || '';

  /* بنفتح على أول مقدار بيتي للصنف — مش على الجرام */
  const servings = foodServings(food);
  pickerUnit = servings.list.length ? servings.list[0] : null;
  paQty.value = pickerUnit ? 1 : 100;
  paQty.step = pickerUnit ? unitStep(pickerUnit[0]) : 10;

  renderUnitChips();
  renderPickerMacros();
  pickerAmount.classList.remove('hidden');
  pickerAmount.scrollIntoView({ block: 'nearest' });
}

function renderUnitChips() {
  const box = document.getElementById('pa-units');
  box.innerHTML = '';
  const servings = foodServings(pickerFood);
  pickerApprox = servings.approx;

  servings.list.forEach(function (row) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'pa-chip' + ((pickerUnit && pickerUnit[0] === row[0]) ? ' active' : '');
    chip.textContent = unitName(row[0]) + ' · ' + tidyNumber(row[1]) + t('fuel_g');
    chip.addEventListener('click', function () {
      pickerUnit = row;
      paQty.value = 1;
      paQty.step = unitStep(row[0]);
      renderUnitChips();
      renderPickerMacros();
    });
    box.appendChild(chip);
  });

  const gramChip = document.createElement('button');
  gramChip.type = 'button';
  gramChip.className = 'pa-chip' + (pickerUnit ? '' : ' active');
  gramChip.textContent = t('by_grams');
  gramChip.addEventListener('click', function () {
    pickerUnit = null;
    paQty.value = 100;
    paQty.step = 10;
    renderUnitChips();
    renderPickerMacros();
  });
  box.appendChild(gramChip);

  document.getElementById('pa-qty-unit').textContent =
    pickerUnit ? unitName(pickerUnit[0]) : t('fuel_g');
}

function stepQty(direction) {
  const step = pickerUnit ? unitStep(pickerUnit[0]) : 10;
  const next = (Number(paQty.value) || 0) + (direction * step);
  paQty.value = tidyNumber(Math.max(0, next));
  renderPickerMacros();
}

function renderPickerMacros() {
  if (!pickerFood) return;
  const grams = pickerGrams();
  const item = makeFoodItem(pickerFood, grams);
  const m = itemMacros(item);

  const eq = document.getElementById('pa-eq');
  if (pickerUnit) {
    eq.textContent = '= ' + Math.round(grams) + t('fuel_g') + (pickerApprox ? ' · ' + t('approx_note') : '');
    eq.classList.toggle('approx', pickerApprox);
  } else {
    eq.textContent = '';
    eq.classList.remove('approx');
  }
  document.getElementById('pa-minus').disabled = (Number(paQty.value) || 0) <= 0;

  document.getElementById('pa-macros').textContent =
    Math.round(m.kcal) + ' ' + t('t_kcal') + ' · ' +
    t('t_protein') + ' ' + m.protein.toFixed(1) + ' · ' +
    t('t_carbs') + ' ' + m.carbs.toFixed(1) + ' · ' +
    t('t_fat') + ' ' + m.fat.toFixed(1);
}

document.getElementById('pa-plus').addEventListener('click', function () { stepQty(1); });
document.getElementById('pa-minus').addEventListener('click', function () { stepQty(-1); });
paQty.addEventListener('input', renderPickerMacros);

pickerSearch.addEventListener('input', renderPickerList);
document.getElementById('picker-close').addEventListener('click', closeFoodPicker);

document.getElementById('pa-add').addEventListener('click', function () {
  if (!pickerFood) return;
  const grams = pickerGrams();
  if (grams <= 0) return;
  const item = makeFoodItem(pickerFood, Math.round(grams * 10) / 10);
  /* بنحفظ المقدار اللي اختاره عشان يظهرله زي ما سجّله مش بالجرام */
  if (pickerUnit) {
    item.unit = pickerUnit[0];
    item.qty = Number(paQty.value) || 0;
  }
  item.meal = pickerMeal;
  logDay().extra.push(item);
  saveFoodLog();
  closeFoodPicker();
  showClientNutrition();
});

/* ---------- وجبات العميل: يعلّم اللي أكله ويضيف اللي مكانش في الخطة ---------- */

/*
 * النص اللي بيتعرض للكمية: لو العميل سجّلها بمقدار بيتي بنعرضه
 * بلغته ("كوبين · ٣١٦جم")، وإلا بنعرض الجرام زي ما هو
 */
function portionText(item) {
  const grams = Math.round(Number(item.grams) || 0);
  if (item && item.unit && item.qty) {
    return tidyNumber(item.qty) + ' ' + unitName(item.unit) + ' · ' + grams + t('fuel_g');
  }

  /*
   * وجبات الخطة المدرب بيكتبها بالجرام، والعميل مش عنده ميزان —
   * فبنترجمهاله لأقرب مقدار بيتي: "≈ ١.٢٥ كوب · ٢٠٠جم"
   */
  const source = (item && item.foodId) ? foodById(item.foodId) : null;
  const servings = foodServings(source);
  if (servings.list.length && grams > 0) {
    const row = servings.list[0];
    const qty = Math.round((grams / row[1]) * 4) / 4;
    if (qty >= 0.25 && qty <= 8) {
      return '≈ ' + tidyNumber(qty) + ' ' + unitName(row[0]) + ' · ' + grams + t('fuel_g');
    }
  }
  return grams + t('fuel_g');
}

function loggedFoodRow(item, opts) {
  const li = document.createElement('li');
  li.className = 'log-row';
  if (opts.extra) li.classList.add('is-extra');
  if (opts.eaten) li.classList.add('eaten');

  const source = item.foodId ? foodById(item.foodId) : null;
  const icon = document.createElement('span');
  icon.className = 'meal-food-icon';
  icon.appendChild(iconSvg(source ? foodCategoryIcon(source.cat) : 'plate', 'ui-icon'));
  li.appendChild(icon);

  const info = document.createElement('div');
  info.className = 'log-info';

  const nameRow = document.createElement('div');
  nameRow.className = 'log-name';
  nameRow.textContent = foodDisplayName(item);
  if (opts.extra) {
    const badge = document.createElement('span');
    badge.className = 'extra-badge';
    badge.textContent = t('extra_badge');
    nameRow.appendChild(badge);
  }
  info.appendChild(nameRow);

  const m = itemMacros(item);
  const macros = document.createElement('div');
  macros.className = 'food-macros';
  macros.textContent =
    portionText(item) + ' · ' +
    Math.round(m.kcal) + ' ' + t('t_kcal') + ' · ' +
    t('t_protein') + ' ' + m.protein.toFixed(1) + ' · ' +
    t('t_carbs') + ' ' + m.carbs.toFixed(1) + ' · ' +
    t('t_fat') + ' ' + m.fat.toFixed(1);
  info.appendChild(macros);
  li.appendChild(info);

  if (opts.onToggle) {
    const check = document.createElement('button');
    check.type = 'button';
    check.className = 'log-check' + (opts.eaten ? ' on' : '');
    check.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12.5 9.5 18 20 6.5"></polyline></svg>';
    check.setAttribute('aria-label', t('mark_eaten'));
    check.addEventListener('click', opts.onToggle);
    li.appendChild(check);
  }

  if (opts.onRemove) {
    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'log-remove';
    del.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    del.setAttribute('aria-label', t('remove'));
    del.addEventListener('click', opts.onRemove);
    li.appendChild(del);
  }

  return li;
}

function renderClientMeals(container, day) {
  container.innerHTML = '';
  const canLog = isLoggingDay();
  const log = logDay();
  let anything = false;

  MEAL_KEYS.forEach(function (key) {
    const planned = (day && day.meals[key]) ? day.meals[key] : [];
    const extras = canLog ? log.extra.filter(function (item) { return item.meal === key; }) : [];
    if (!planned.length && !extras.length && !canLog) return;
    anything = anything || planned.length > 0 || extras.length > 0;

    const block = document.createElement('div');
    block.className = 'meal-block';

    const head = document.createElement('div');
    head.className = 'meal-head';

    const title = document.createElement('div');
    title.className = 'meal-name';
    setIconLabel(title, mealIconSvg(key), mealName(key));
    head.appendChild(title);

    /* الرقم على اليمين: المخطط، ولو العميل بيسجّل النهاردة بنوري كمان اللي أكله */
    const plannedKcal = Math.round(mealTotals(planned).kcal);
    let eatenKcal = 0;
    planned.forEach(function (item, index) {
      if (log.eaten.indexOf(key + ':' + index) !== -1) eatenKcal += itemMacros(item).kcal;
    });
    extras.forEach(function (item) { eatenKcal += itemMacros(item).kcal; });

    const kcal = document.createElement('div');
    kcal.className = 'meal-kcal';
    kcal.textContent = canLog
      ? (Math.round(eatenKcal) + ' / ' + plannedKcal + ' ' + t('t_kcal'))
      : (plannedKcal + ' ' + t('t_kcal'));
    if (canLog && eatenKcal > 0) kcal.classList.add('has-log');
    head.appendChild(kcal);

    block.appendChild(head);

    if (!planned.length && !extras.length) {
      const empty = document.createElement('div');
      empty.className = 'section-empty';
      empty.textContent = t('meal_empty');
      block.appendChild(empty);
    } else {
      const ul = document.createElement('ul');

      planned.forEach(function (item, index) {
        const itemKey = key + ':' + index;
        const eaten = log.eaten.indexOf(itemKey) !== -1;
        ul.appendChild(loggedFoodRow(item, {
          eaten: canLog && eaten,
          extra: false,
          onToggle: canLog ? function () {
            const day2 = logDay();
            const pos = day2.eaten.indexOf(itemKey);
            if (pos === -1) day2.eaten.push(itemKey);
            else day2.eaten.splice(pos, 1);
            saveFoodLog();
            showClientNutrition();
          } : null
        }));
      });

      extras.forEach(function (item) {
        ul.appendChild(loggedFoodRow(item, {
          eaten: true,
          extra: true,
          onRemove: function () {
            const day2 = logDay();
            const pos = day2.extra.indexOf(item);
            if (pos !== -1) day2.extra.splice(pos, 1);
            saveFoodLog();
            showClientNutrition();
          }
        }));
      });

      block.appendChild(ul);
    }

    if (canLog) {
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.className = 'add-food-btn';
      addBtn.textContent = t('add_food_btn');
      addBtn.addEventListener('click', function () { openFoodPicker(key); });
      block.appendChild(addBtn);
    }

    container.appendChild(block);
  });

  if (!anything && !canLog) {
    container.appendChild(clientStateCard('empty', t('no_meals_title'), t('no_meals')));
  }
}

function showClientSupplements() {
  const box = document.getElementById('cnut-supp-box');
  const list = document.getElementById('cnut-supp-list');
  if (!box || !list) return;
  const plan = (clientNutrition && Array.isArray(clientNutrition.supplements))
    ? clientNutrition.supplements : [];
  box.classList.toggle('hidden', !plan.length);
  if (plan.length) renderSuppPlanInto(list, plan, false);
}

function showClientNutrition() {
  showClientSupplements();

  if (!nutritionHasContent(clientNutrition)) {
    cnutTotals.innerHTML = '';
    if (cnutFuel) cnutFuel.innerHTML = '';
    const waterCard = document.getElementById('cnut-water');
    if (waterCard) waterCard.classList.add('hidden');
    cnutMeals.innerHTML = '';
    cnutMeals.appendChild(clientStateCard('empty', t('no_nutrition_title'), t('no_nutrition')));
    return;
  }

  const day = clientNutrition.week[cNutDay];
  const plannedTotals = dayTotals(day);
  const shown = isLoggingDay() ? eatenTotals(day) : plannedTotals;

  renderFuelCard(cnutFuel, shown, clientNutrition.targets, isLoggingDay() ? plannedTotals : null);
  renderTotals(cnutTotals, shown, clientNutrition.targets);
  renderWaterCard();
  renderClientMeals(cnutMeals, day);

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

/* ============================ حلقات النشاط (زي ساعة أبل) ============================ */

const ACTIVITY_RING_STAND_TARGET = 3; // هدف تسجيلات النشاط الإضافية في آخر 7 أيام

function computeActivityRings() {
  const todayDay = clientWeek[todayIndex] || { sections: {} };
  const totalTodayCount = dayCount(todayDay);
  const doneTodayCount = totalTodayCount > 0 ? Math.min(doneToday.length, totalTodayCount) : doneToday.length;
  const moveRatio = totalTodayCount > 0 ? (doneTodayCount / totalTodayCount) : 0;

  let activeDays = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    if (progressHistory.indexOf(dateStamp(d)) !== -1) activeDays++;
  }
  const exerciseRatio = activeDays / 7;

  const weekAgoStamp = dateStamp(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000));
  const loggedThisWeek = clientActivity.filter(function (entry) {
    return entry.date && entry.date >= weekAgoStamp;
  }).length;
  const standRatio = Math.min(loggedThisWeek / ACTIVITY_RING_STAND_TARGET, 1);

  return {
    moveRatio: moveRatio, doneTodayCount: doneTodayCount, totalTodayCount: totalTodayCount,
    exerciseRatio: exerciseRatio, activeDays: activeDays,
    standRatio: standRatio, loggedThisWeek: loggedThisWeek
  };
}

function ringArcMarkup(cx, cy, r, color, ratio) {
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - Math.min(Math.max(ratio, 0), 1));
  return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="10" opacity="0.18"></circle>'
    + '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="10" stroke-linecap="round" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '" transform="rotate(-90 ' + cx + ' ' + cy + ')"></circle>';
}

function renderActivityRings() {
  if (!activityRingsSvg) return;
  const data = computeActivityRings();
  const moveColor = '#fa2b4d';
  const exerciseColor = '#a6e22a';
  const standColor = '#12d6e0';

  activityRingsSvg.innerHTML = '<svg viewBox="0 0 140 140" width="140" height="140">'
    + ringArcMarkup(70, 70, 60, moveColor, data.moveRatio)
    + ringArcMarkup(70, 70, 45, exerciseColor, data.exerciseRatio)
    + ringArcMarkup(70, 70, 30, standColor, data.standRatio)
    + '</svg>';

  activityRingsLegend.innerHTML = '';
  const rows = [
    { color: moveColor, label: t('ring_move_label'), value: data.doneTodayCount + '/' + data.totalTodayCount },
    { color: exerciseColor, label: t('ring_exercise_label'), value: data.activeDays + '/7' },
    { color: standColor, label: t('ring_stand_label'), value: data.loggedThisWeek + '/' + ACTIVITY_RING_STAND_TARGET }
  ];
  rows.forEach(function (row) {
    const line = document.createElement('div');
    line.className = 'ring-legend-row';
    const dot = document.createElement('span');
    dot.className = 'ring-dot';
    dot.style.background = row.color;
    line.appendChild(dot);
    const label = document.createElement('span');
    label.className = 'ring-legend-label';
    label.textContent = row.label;
    line.appendChild(label);
    const value = document.createElement('span');
    value.className = 'ring-legend-value';
    value.textContent = row.value;
    line.appendChild(value);
    activityRingsLegend.appendChild(line);
  });
}

function renderActivity() {
  renderActivityRings();
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
    setSportTag(name, entry.sportId);
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
    remove.innerHTML = DELETE_ICON_SVG;
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
    setStatusMessage(actMessage, t('activity_saved'), 'success');
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
const classExercisesList = document.getElementById('class-exercises-list');
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
      if (!Array.isArray(data.exercises)) data.exercises = [];
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
    info.className = 'class-card-info';

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
    remove.innerHTML = DELETE_ICON_SVG;
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
      members: [],
      exercises: []
    });
    document.getElementById('cl-name').value = '';
    document.getElementById('cl-time').value = '';
    await loadClasses();
    setStatusMessage(classesMessage, t('class_saved'), 'success');
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
  if (!Array.isArray(currentClass.exercises)) currentClass.exercises = [];
  renderClassExercises(classExercisesList, currentClass, true);

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
  if (found) return found.name;
  // جاي من إشعار؟ الإشعار شايل اسم العميل — أحسن من الإيميل
  const fromNotif = (notifItems || []).filter(function (n) { return n.about === email && n.aboutName; })[0];
  return fromNotif ? fromNotif.aboutName : email;
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
    await saveCurrentClassDoc();
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
      badge.innerHTML = '';
    if (done) badge.appendChild(iconSvg('check', 'ui-icon'));
    else badge.textContent = '·';
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
    remove.innerHTML = DELETE_ICON_SVG;
    remove.addEventListener('click', async function () {
      currentClass.members.splice(index, 1);
      try {
        await saveCurrentClassDoc();
        await refreshBoards();
      } catch (error) {
        classDetailMessage.textContent = t('problem') + error.message;
      }
    });
    item.appendChild(remove);

    classMembersList.appendChild(item);
  });
}

/* ---------- تمارين الكلاس — عشان اللي مش حاضر يقدر يعمل نفس التمرين ---------- */

async function saveCurrentClassDoc() {
  if (!currentClass) return;
  await setDoc(doc(db, 'classes', currentClass.id), {
    name: currentClass.name,
    sport: currentClass.sport || '',
    time: currentClass.time || '',
    members: currentClass.members,
    exercises: currentClass.exercises || []
  });
}

function renderClassExercises(listEl, cls, allowEdit) {
  listEl.innerHTML = '';
  const exercises = (cls && Array.isArray(cls.exercises)) ? cls.exercises : [];

  if (!exercises.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = t('no_class_exercises');
    listEl.appendChild(empty);
    return;
  }

  exercises.forEach(function (exercise, index) {
    const item = document.createElement('li');

    const name = document.createElement('span');
    name.textContent = exercise.name;
    item.appendChild(name);

    item.addEventListener('click', function () {
      openPreview(exercise);
    });

    if (allowEdit) {
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'delete';
      remove.innerHTML = DELETE_ICON_SVG;
      remove.addEventListener('click', async function (event) {
        event.stopPropagation();
        cls.exercises.splice(index, 1);
        try {
          await saveCurrentClassDoc();
          renderClassExercises(listEl, cls, true);
        } catch (error) {
          classDetailMessage.textContent = t('problem') + error.message;
        }
      });
      item.appendChild(remove);
    }

    listEl.appendChild(item);
  });
}

async function addExerciseToCurrentClass(exercise) {
  if (!currentClass) return;
  if (!Array.isArray(currentClass.exercises)) currentClass.exercises = [];
  currentClass.exercises.push(exercise);
  libMessage.textContent = t('saving');
  try {
    await saveCurrentClassDoc();
    setStatusMessage(libMessage, fill('added_class_ex', { name: exercise.name }), 'success');
  } catch (error) {
    libMessage.textContent = t('problem') + error.message;
  }
}

document.getElementById('class-add-exercise-btn').addEventListener('click', function () {
  openLibraryForClass();
});

function openLibraryForClass() {
  libraryContext = 'class';
  suggestedCategory = '';
  showScreen(libraryScreen);
  loadLibrary();
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
      currentClass.exercises = Array.isArray(data.exercises) ? data.exercises : [];
      renderClassExercises(classExercisesList, currentClass, true);
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

  let allClasses = [];
  try {
    const snapshot = await getDocs(collection(db, 'classes'));
    allClasses = snapshot.docs.map(function (item) {
      const data = item.data();
      data.id = item.id;
      if (!Array.isArray(data.members)) data.members = [];
      if (!Array.isArray(data.exercises)) data.exercises = [];
      return data;
    });
  } catch (error) {
    allClasses = [];
  }

  myClasses = allClasses.filter(function (c) { return c.members.indexOf(clientEmail) !== -1; });
  const otherClasses = allClasses.filter(function (c) { return c.members.indexOf(clientEmail) === -1; });

  if (!myClasses.length) {
    const none = document.createElement('p');
    none.className = 'no-class';
    none.textContent = t('no_class_yet');
    box.appendChild(none);
  } else {
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

      if (cls.exercises.length) {
        const exHead = document.createElement('h3');
        exHead.textContent = t('class_exercises_title');
        box.appendChild(exHead);

        const exList = document.createElement('ul');
        box.appendChild(exList);
        renderClassExercises(exList, cls, false);
      }
    }
  }

  // كلاسات تانية العميل مش عضو فيها — بس تمارينها متاحة لأي حد يشوفها
  // ويعملها بنفسه حتى لو مش حاضر الكلاس فعليًا
  const otherWithExercises = otherClasses.filter(function (c) { return c.exercises.length; });
  if (otherWithExercises.length) {
    const otherHead = document.createElement('h2');
    otherHead.textContent = t('other_classes_title');
    box.appendChild(otherHead);

    const otherList = document.createElement('ul');
    otherWithExercises.forEach(function (cls) {
      const wrapper = document.createElement('li');
      wrapper.className = 'class-card';

      const head = document.createElement('div');
      head.className = 'class-card-info';
      head.style.cursor = 'pointer';

      const name = document.createElement('span');
      name.className = 'class-name';
      name.textContent = cls.name;
      head.appendChild(name);

      const count = document.createElement('span');
      count.className = 'class-meta';
      count.textContent = fill('count_ex', { n: cls.exercises.length });
      head.appendChild(count);

      wrapper.appendChild(head);

      const exBox = document.createElement('div');
      exBox.className = 'hidden';
      const exList = document.createElement('ul');
      exBox.appendChild(exList);
      wrapper.appendChild(exBox);

      head.addEventListener('click', function () {
        const willOpen = exBox.classList.contains('hidden');
        exBox.classList.toggle('hidden', !willOpen);
        if (willOpen) renderClassExercises(exList, cls, false);
      });

      otherList.appendChild(wrapper);
    });
    box.appendChild(otherList);
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
    badge.innerHTML = '';
    if (done) badge.appendChild(iconSvg('check', 'ui-icon'));
    else badge.textContent = '·';
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
  fillPhoneCodeSelect();
  fillMealPicker();
  fillFoodCatSelect();
  fillSportSelect(document.getElementById('new-sport'), true);
  fillSportSelect(coachSport, true);
  fillSportSelect(clSport, true);
  fillSportTemplatePicker();
  // القوايم دي كانت بتتبني مرة واحدة بس وقت التحميل وبتفضل عالقة بلغة
  // التحميل الأولانية حتى لو المستخدم بدّل اللغة بعدين — لازم تتبنى تاني
  // هنا زي كل القوايم التانية فوق
  fillProviderPlanSpecialtySelect(newProviderPlanSpecialty);
  fillPlanDurationSelect(newPlanDurationSelect, 1);
  fillPlanDurationSelect(newProviderPlanDurationSelect, 1);
  fillStoreCategoryFilter();
  fillStorePayMethodSelect();
  paintLiveState();

  if (!welcomeScreen.classList.contains('hidden')) {
    renderWelcomePillarDetail(currentWelcomePillar);
    // البنود دي بتتبني بـ textContent وقت التحميل مش بـ data-t، فلازم
    // نعيد بناءها يدويًا بعد تغيير اللغة عشان محتواها يتترجم صح
    renderWelcomeFaq();
    renderAudienceDeck();
    loadWelcomeTeamPreview();
    loadWelcomeStories();
    loadWelcomeTrustStat();
    fillProviderApplySpecialtySelect();
  }
  if (!calculatorsScreen.classList.contains('hidden')) fillCalcSelects();
  if (!progressScreen.classList.contains('hidden')) fillCheckinSelects();
  if (!coachScreen.classList.contains('hidden')) {
    renderCoachBasics();
    if (coachMode === 'rehab') showRehab();
    else if (coachMode === 'nutrition') showNutrition();
    else if (coachMode === 'injuries') loadCoachInjuryReports();
    else showCoachDay();
  }
  if (!clientScreen.classList.contains('hidden')) {
    renderAppbar();
    if (clientMode === 'home') renderClientHome();
    renderSafetyBanner();
    renderCycleCard();
    if (safetySheet && !safetySheet.classList.contains('hidden')) renderSafetySheet();
    showClientDay();
    showClientRehab();
    showClientNutrition();
    showClientActivity();
    showClientClasses();
  }
  if (!foodScreen.classList.contains('hidden')) {
    renderFoodChips();
    renderFoodList();
  }
  if (!supplementsScreen.classList.contains('hidden')) {
    renderSuppChips();
    renderSuppList();
  }
  fillLeadInterestSelect();
  fillPhoneCodeSelect();
  renderHeroSlide();
  renderHeroBand();
  renderTeamStrip();
  /*
   * صفحات التخصص كانت بتترسم مرة واحدة وقت التحميل بس، فكانت بتفضل
   * عالقة بلغة أول تحميل: تفتح الصفحة بالعربي وتبدّل للإنجليزي فتلاقي
   * محتوى الصفحات لسه عربي. لازم تترسم تاني مع كل تبديل لغة زي أي
   * محتوى مبني بالجافاسكريبت
   */
  renderSpecPages();
  renderAudienceDeck();
  if (!onboardingScreen.classList.contains('hidden')) {
    renderHealthChips();
    renderPregnancyBox();
    renderCycleBox();
    renderReferrerRow();
  }
  if (!clientsScreen.classList.contains('hidden')) loadClients();
  if (!adminPanelScreen.classList.contains('hidden')) renderAdminTabs();
  /*
   * اللوحة مبنية بالجافاسكريبت، فلازم تترسم تاني مع تبديل اللغة —
   * من الذاكرة من غير ما نقرا فايرستور تاني
   */
  if (!adherenceScreen.classList.contains('hidden') && adhRows.length) renderAdherence();
  if (!clearanceScreen.classList.contains('hidden') && clearanceRows.length) renderClearanceList();
  if (!providersScreen.classList.contains('hidden')) { fillSpecialtySelect(); loadProviders(); }
  if (!providerHomeScreen.classList.contains('hidden') && currentProviderData) showProviderHome(currentProviderData);
  if (!onboardingScreen.classList.contains('hidden')) { fillGenderSelect(); fillDobSelects(); fillActivitySelect(); fillSportSelect(obSport, true); fillGoalSelect(); renderGenderRows(); renderActivityTiles(); renderSportGroupDial(); renderSportRows(); renderGoalTiles(); renderFocusChips(); fillWorkNatureSelect(); renderWorkNatureRows(); fillTrainingDaysSelect(); renderTrainingDaysRows(); renderScheduleRows(); renderChosenSports(); renderSourceRow(); fillSleepQualitySelect(); fillSleepExtraSelects(); applyOnboardingMode(); fillMealsPerDaySelect(); renderMealsPerDayRows(); }
  if (!teamScreen.classList.contains('hidden')) loadTeamPicker(selectedTeam);
  if (!injuryScreen.classList.contains('hidden')) { refreshHotspots(); loadInjuryHistory(); }
  if (!teamViewScreen.classList.contains('hidden')) loadTeamView();
  if (!clientProfileScreen.classList.contains('hidden')) fillClientProfileSelects();
  if (!coachScreen.classList.contains('hidden')) { fillCoachMuscleSelect(); fillSportTemplatePicker(); }
  if (!clientConsultPanel.classList.contains('hidden')) loadClientConsult();
  if (!consultPanel.classList.contains('hidden')) renderCoachConsultRequests();
  if (!medLibraryScreen.classList.contains('hidden')) loadMedLibrary();
  if (!classesScreen.classList.contains('hidden')) renderClasses();
  if (!classDetailScreen.classList.contains('hidden')) { renderBoards(); renderClassMembers(); renderClassExercises(classExercisesList, currentClass, true); }
  if (!libraryScreen.classList.contains('hidden')) {
    rebuildLibraryFilters();
    renderLibrary();
  }
  if (!mylibScreen.classList.contains('hidden')) {
    renderMyLib();
  }
  if (!subscriptionScreen.classList.contains('hidden')) loadSubscriptionScreen();
  if (!adminPanelScreen.classList.contains('hidden')) loadAdminPanel();
  if (!trialEndedScreen.classList.contains('hidden')) showAccessLocked(currentAccessLockReason);
  if (!chatInboxScreen.classList.contains('hidden')) loadChatInbox();
  if (!chatScreen.classList.contains('hidden') && currentChatEmail) {
    chatTitleText.textContent = chatViewerIsCoach() ? fill('chat_thread_with', { name: clientNameOf(currentChatEmail) }) : t('chat_title');
  }
  // تأكيد الإيميل والإشعارات — متبنيين بالجافاسكريبت فلازم يتعادوا هنا
  const verifyScr = document.getElementById('verify-screen');
  if (verifyScr && !verifyScr.classList.contains('hidden')) { paintVerifyText(); paintVerifyCooldown(); }
  const notifScr = document.getElementById('notif-screen');
  if (notifScr && !notifScr.classList.contains('hidden')) { renderNotifList(); renderPushBox(); }
}

/* ============================ المتخصصين ============================ */

let providers = [];

function showProviderHome(data) {
  currentProviderData = data;
  // صاحب المنصة (الحساب القديم) غالبًا مفيهوش مستند providers أصلاً، يعني
  // data ممكن توصل فاضية — في الحالة دي بنعتبر تخصصه "مدرب" افتراضيًا
  // عشان الأيقونة والتسمية تظهر صح من غير ما نضطر ننشئ مستند بس عشان كده
  const specs = providerSpecialties(data).length ? providerSpecialties(data) : (isLegacyCoachAccount() ? ['coach'] : []);
  phName.value = data.name || '';
  setSpecialtyLabel(providerHomeTitle, specs, data.name || (isLegacyCoachAccount() ? t('platform_owner_label') : ''));
  // التخصصات بتتعرض كخانات جنب بعض (مدرب · أخصائي تأهيل · أخصائي تغذية)
  // بدل سطر واحد مكتوب بفاصلات — أوضح بكتير لما يبقى أكتر من تخصص
  renderSpecialtyChips(providerHomeSpecialty, specs);

  /*
   * قبل كده كان صندوق التخصصات مخفي تمامًا عن صاحب المنصة، فماكانش
   * يقدر يزوّد لنفسه تخصص جديد (مثلاً خد كورس تغذية وعايز يضيفه).
   * دلوقتي الصندوق ظاهر للكل — وصاحب المنصة "مدرب" عنده مقفول بس
   * (مايقدرش يشيله) عشان مايفقدش صلاحياته وقائمة عملائه بالغلط،
   * وأي تخصص تاني يزوّده أو يشيله زي أي متخصص
   */
  if (phSpecialtyBox) phSpecialtyBox.classList.remove('hidden');
  fillSpecialtyCheckboxes(phSpecialtyMulti, specs, isLegacyCoachAccount() ? ['coach'] : []);

  phBio.value = data.bio || '';
  phCerts.value = data.certifications || '';
  phPickedImage = data.photo || '';

  if (data.photo) {
    phPhotoPreview.src = data.photo;
    phPhotoBox.classList.remove('hidden');
    phPhotoLabel.textContent = t('image_chosen');
  } else {
    phPhotoPreview.removeAttribute('src');
    phPhotoBox.classList.add('hidden');
    phPhotoLabel.textContent = t('choose_photo');
  }

  providerHomeMessage.textContent = '';
  // التخصص المستني موافقة بيتعلّم عليه في الخانات كمان عشان مايختفيش
  fillSpecialtyCheckboxes(phSpecialtyMulti, specs.concat(providerPendingSpecialties(data)),
    isLegacyCoachAccount() ? ['coach'] : []);
  renderPendingSpecialtyNote();
  renderMyLibraryAccess();
  phOpenMedlibBtn.classList.toggle('hidden', !specialtiesHaveFlag(specs, 'medical'));
  applyLibraryLock(phOpenMedlibBtn, 'medical');
  phBackBtn.classList.remove('hidden');
  loadProviderOwnReviews();
}

/* سطر "تخصصات مستنية موافقة إدارة المنصة" جوه بروفايل المتخصص */
function renderPendingSpecialtyNote() {
  const note = document.getElementById('ph-pending-note');
  if (!note) return;
  const pending = providerPendingSpecialties(currentProviderData);
  note.classList.toggle('hidden', !pending.length);
  if (pending.length) {
    note.textContent = fill('specialty_pending_note', { list: specialtyListName(pending) });
  }
}

/* بيوري المتخصص أنهي مكتبات مفتوحة له وأنهي مقفولة */
function renderMyLibraryAccess() {
  const box = document.getElementById('ph-lib-access-box');
  const list = document.getElementById('ph-lib-access-list');
  if (!box || !list) return;

  if (isFullAdminAccount()) {
    box.classList.add('hidden');
    return;
  }

  box.classList.remove('hidden');
  list.innerHTML = '';
  LIBRARY_KEYS.forEach(function (key) {
    const open = libraryOpen(key);
    const chip = document.createElement('span');
    chip.className = 'specialty-chip' + (open ? '' : ' specialty-chip-off');
    chip.appendChild(iconSvg(open ? 'check' : 'lock', 'ui-icon'));
    chip.appendChild(document.createTextNode(' ' + libraryLabel(key)));
    list.appendChild(chip);
  });
}

document.getElementById('open-my-profile-btn').addEventListener('click', function () {
  showScreen(providerHomeScreen);
  showProviderHome(currentProviderData || {});
});

document.getElementById('ph-back-btn').addEventListener('click', function () {
  showScreen(clientsScreen);
  loadClients();
});

async function loadProviderOwnReviews() {
  if (!currentProviderEmail) return;
  await fetchAllProviderReviews();
  const stats = ratingStatsFor(currentProviderEmail);
  phRatingSummary.innerHTML = starsDisplayMarkup(stats.avg, stats.count);

  const myReviews = allProviderReviews.filter(function (review) {
    return review.providerEmail === currentProviderEmail;
  }).sort(function (a, b) {
    return (b.createdAt || '').localeCompare(a.createdAt || '');
  });

  phReviewsList.innerHTML = '';
  if (!myReviews.length) {
    const empty = document.createElement('li');
    empty.textContent = t('no_reviews_received');
    phReviewsList.appendChild(empty);
    return;
  }
  myReviews.forEach(function (review) {
    const item = document.createElement('li');
    const starsRow = document.createElement('div');
    starsRow.className = 'stars-row';
    let stars = '';
    for (let i = 1; i <= 5; i++) stars += starIconSvg(i <= (Number(review.rating) || 0));
    starsRow.innerHTML = stars;
    item.appendChild(starsRow);

    const name = document.createElement('div');
    name.textContent = review.clientName || '';
    item.appendChild(name);

    if (review.comment) {
      const comment = document.createElement('div');
      comment.className = 'ex-meta';
      comment.textContent = review.comment;
      item.appendChild(comment);
    }

    phReviewsList.appendChild(item);
  });
}

function fillSpecialtySelect() {
  const keep = readSpecialtyCheckboxes(pvSpecialtyMulti);
  fillSpecialtyCheckboxes(pvSpecialtyMulti, keep);
}

/*
 * موافقة أو رفض تخصص مستني. الموافقة بتنقله من pendingSpecialties
 * لـ specialties (وساعتها بس بيفتحله القسم بتاعه في برنامج العميل)،
 * والرفض بيشيله من المستنيين من غير ما يمس تخصصاته المعتمدة.
 */
async function decidePendingSpecialty(provider, key, approve, messageEl) {
  const approved = providerSpecialties(provider);
  const pending = providerPendingSpecialties(provider).filter(function (item) { return item !== key; });
  const nextApproved = approve && approved.indexOf(key) === -1 ? approved.concat([key]) : approved;

  const payload = {
    specialties: nextApproved,
    pendingSpecialties: pending,
    specialty: nextApproved.indexOf('coach') !== -1 ? 'coach' : (nextApproved[0] || ''),
    isMedical: specialtiesHaveFlag(nextApproved, 'medical')
  };

  if (messageEl) messageEl.textContent = t('saving');
  try {
    await setDoc(doc(db, 'providers', provider.email), payload, { merge: true });
    provider.specialties = nextApproved;
    provider.pendingSpecialties = pending;
    if (messageEl) {
      setStatusMessage(messageEl, fill(approve ? 'specialty_approved_msg' : 'specialty_rejected_msg', {
        spec: specialtyName(key, lang), name: provider.name || provider.email
      }), 'success');
    }
    loadProviders();
    refreshPendingSpecsBadge();
  } catch (error) {
    if (messageEl) messageEl.textContent = t('problem') + error.message;
  }
}

/*
 * مستندات المتخصصين مفتاحها هو الإيميل. في مستندات قديمة اتعملت من
 * غير حقل email جواها (من touchProviderActivity زمان)، والكود اللي
 * بيقرا provider.email كان بيطلع undefined ويكسّر الشاشة أو يكتب في
 * مستند اسمه "undefined". الدالة دي هي الباب الوحيد لقراءتهم
 */
function providerFromDoc(item) {
  const data = Object.assign({ id: item.id }, item.data());
  if (!data.email) data.email = item.id;
  return data;
}

async function loadProviders() {
  providersList.innerHTML = '';
  providersMessage.textContent = t('loading');
  try {
    const snapshot = await getDocs(collection(db, 'providers'));
    providers = snapshot.docs.map(providerFromDoc);

    // بنحسب هنا عدد المتدربين الفعلي لكل متخصص (من مجموعة العملاء
    // كاملة) ونخزنه في مستند المتخصص نفسه كـ clientsCount — عشان شاشة
    // "فريقك" عند العميل تقدر تعرض الرقم، مع إن قواعد الأمان مش بتسمح
    // لحساب عميل عادي إنه يقرا مجموعة العملاء كلها بنفسه
    try {
      const clientsSnapshot = await getDocs(collection(db, 'clients'));
      const counts = {};
      const refs = {};
      clientsSnapshot.docs.forEach(function (clientDoc) {
        const data = clientDoc.data();
        const coachEmail = (data.coachEmail || COACH_EMAIL).toLowerCase();
        counts[coachEmail] = (counts[coachEmail] || 0) + 1;
        const team = data.team || {};
        Object.keys(team).forEach(function (key) {
          const specialistEmail = team[key];
          if (specialistEmail) counts[specialistEmail] = (counts[specialistEmail] || 0) + 1;
        });
        /* الترشيحات: مين جاب العميل ده للمنصة أصلًا — أساس البونص */
        if (data.referredBy) refs[data.referredBy] = (refs[data.referredBy] || 0) + 1;
      });
      await Promise.all(providers.map(function (provider) {
        const n = counts[provider.email] || 0;
        const r = refs[provider.email] || 0;
        if (provider.clientsCount === n && provider.referralsCount === r) return Promise.resolve();
        provider.clientsCount = n;
        provider.referralsCount = r;
        return setDoc(doc(db, 'providers', provider.email), { clientsCount: n, referralsCount: r }, { merge: true }).catch(function () {});
      }));
    } catch (countError) {
      // مش هيمنع عرض القايمة لو فشل حساب العدد لأي سبب
    }

    if (!providers.length) {
      providersMessage.textContent = t('no_providers');
      return;
    }
    providersMessage.textContent = '';

    providers.forEach(function (provider) {
      const item = document.createElement('li');

      const providerSpecs = providerSpecialties(provider);
      const nameLine = document.createElement('div');
      nameLine.className = 'client-name';
      setSpecialtyLabel(nameLine, providerSpecs, provider.name);

      const specLine = document.createElement('div');
      specLine.className = 'client-status';
      renderSpecialtyChips(specLine, providerSpecs, provider.isAdminTeam ? t('admin_team_badge') : '');

      const emailLine = document.createElement('div');
      emailLine.className = 'client-email';
      emailLine.textContent = provider.email;

      item.appendChild(nameLine);
      item.appendChild(specLine);
      item.appendChild(emailLine);

      /*
       * أرقام المتخصص قدام عين صاحب المنصة: كام عميل بيتابعهم،
       * كام عميل جابهم للمنصة (ده اللي البونص بيتحسب عليه)،
       * وتقييم العملاء ليه
       */
      const provStats = ratingStatsFor(provider.email);
      const statsRow = document.createElement('div');
      statsRow.className = 'prov-stats';
      [
        { value: Number(provider.clientsCount) || 0, label: t('prov_clients'), tone: '' },
        { value: Number(provider.referralsCount) || 0, label: t('prov_referrals'), tone: 'ref' },
        { value: provStats.count ? provStats.avg.toFixed(1) : '—', label: t('prov_rating'), tone: 'rate' }
      ].forEach(function (cell) {
        const box = document.createElement('div');
        box.className = 'prov-stat' + (cell.tone ? ' ' + cell.tone : '');
        const v = document.createElement('strong');
        v.textContent = cell.value;
        box.appendChild(v);
        const l = document.createElement('span');
        l.textContent = cell.label;
        box.appendChild(l);
        statsRow.appendChild(box);
      });
      item.appendChild(statsRow);

      const profileBtn = document.createElement('button');
      profileBtn.type = 'button';
      profileBtn.className = 'prov-profile-btn';
      profileBtn.textContent = t('prov_open_profile');
      profileBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        openProviderSheet(provider, '');
      });
      item.appendChild(profileBtn);

      const rowMsg = document.createElement('p');
      rowMsg.className = 'message';

      /*
       * ====== طلبات التخصص المستنية موافقتك ======
       * المتخصص علّم على تخصص جديد — هنا بتوافق أو ترفض. التخصص
       * مابيشتغلش (ومابيظهرش للعملاء) غير بعد الموافقة.
       */
      if (isFullAdminAccount()) {
        const pending = providerPendingSpecialties(provider);
        if (pending.length) {
          const pendBox = document.createElement('div');
          pendBox.className = 'pending-box';

          const pendTitle = document.createElement('div');
          pendTitle.className = 'pending-title';
          pendTitle.textContent = t('pending_specialties_title');
          pendBox.appendChild(pendTitle);

          pending.forEach(function (key) {
            const row = document.createElement('div');
            row.className = 'pending-row';

            const label = document.createElement('span');
            label.className = 'pending-name';
            label.innerHTML = specialtyIconSvg(key);
            label.appendChild(document.createTextNode(' ' + specialtyName(key, lang)));
            row.appendChild(label);

            const okBtn = document.createElement('button');
            okBtn.type = 'button';
            okBtn.className = 'secondary pending-ok';
            okBtn.textContent = t('approve_btn');
            okBtn.addEventListener('click', async function () {
              await decidePendingSpecialty(provider, key, true, rowMsg);
            });
            row.appendChild(okBtn);

            const noBtn = document.createElement('button');
            noBtn.type = 'button';
            noBtn.className = 'secondary pending-no';
            noBtn.textContent = t('reject_btn');
            noBtn.addEventListener('click', async function () {
              await decidePendingSpecialty(provider, key, false, rowMsg);
            });
            row.appendChild(noBtn);

            pendBox.appendChild(row);
          });

          item.appendChild(pendBox);
        }

        /*
         * ====== فتح وقفل المكتبات على المتخصص ده ======
         * تقدر تقفل أي مكتبة لحد ما تتأكد من مستواه، وتفتحها بعدين
         * من غير ما تعمل أي حاجة تانية — التغيير بيشتغل عنده فورًا
         * أول ما يفتح عميل.
         */
        const libBox = document.createElement('div');
        libBox.className = 'lib-access-box';

        const libTitle = document.createElement('div');
        libTitle.className = 'pending-title';
        libTitle.textContent = t('lib_access_title');
        libBox.appendChild(libTitle);

        const libRow = document.createElement('div');
        libRow.className = 'lib-access-row';

        LIBRARY_KEYS.forEach(function (key) {
          const chip = document.createElement('button');
          chip.type = 'button';
          const open = libraryOpenFor(provider, key);
          chip.className = 'secondary lib-chip' + (open ? ' lib-chip-on' : ' lib-chip-off');
          chip.appendChild(iconSvg(open ? 'check' : 'lock', 'ui-icon'));
          chip.appendChild(document.createTextNode(' ' + libraryLabel(key)));
          chip.addEventListener('click', async function () {
            const access = Object.assign({}, provider.libraryAccess || {});
            access[key] = !libraryOpenFor(provider, key);
            rowMsg.textContent = t('saving');
            try {
              await setDoc(doc(db, 'providers', provider.email), { libraryAccess: access }, { merge: true });
              provider.libraryAccess = access;
              const nowOpen = access[key] !== false;
              chip.className = 'secondary lib-chip' + (nowOpen ? ' lib-chip-on' : ' lib-chip-off');
              chip.innerHTML = '';
              chip.appendChild(iconSvg(nowOpen ? 'check' : 'lock', 'ui-icon'));
              chip.appendChild(document.createTextNode(' ' + libraryLabel(key)));
              setStatusMessage(rowMsg, fill(nowOpen ? 'lib_opened_msg' : 'lib_closed_msg', {
                lib: libraryLabel(key), name: provider.name || provider.email
              }), 'success');
            } catch (error) {
              rowMsg.textContent = t('problem') + error.message;
            }
          });
          libRow.appendChild(chip);
        });

        libBox.appendChild(libRow);
        item.appendChild(libBox);
        item.appendChild(rowMsg);
      }

      // بس صاحب المنصة أو عضو إداري موجود فعلاً يقدر يمنح/يسحب الصلاحية
      // الإدارية الكاملة — ومحدش يقدر يعدّلها لنفسه (نفس القيد في قاعدة
      // الأمان)، عشان محدش يمنح نفسه صلاحية زيادة
      if (isFullAdminAccount() && provider.email !== currentProviderEmail) {
        const adminLabel = document.createElement('label');
        adminLabel.className = 'rest';
        const adminCheckbox = document.createElement('input');
        adminCheckbox.type = 'checkbox';
        adminCheckbox.checked = !!provider.isAdminTeam;
        adminLabel.appendChild(adminCheckbox);
        const adminSpan = document.createElement('span');
        adminSpan.textContent = t('grant_admin_team_label');
        adminLabel.appendChild(adminSpan);
        item.appendChild(adminLabel);

        const adminRowMessage = document.createElement('p');
        adminRowMessage.className = 'message';
        item.appendChild(adminRowMessage);

        adminCheckbox.addEventListener('change', async function () {
          adminRowMessage.textContent = t('saving');
          try {
            await updateDoc(doc(db, 'providers', provider.email), { isAdminTeam: adminCheckbox.checked });
            setStatusMessage(adminRowMessage, t('saved'), 'success');
          } catch (error) {
            adminCheckbox.checked = !adminCheckbox.checked;
            adminRowMessage.textContent = t('problem') + error.message;
          }
        });
      }

      // التفاصيل الكاملة بتفضل مبنية زي ما هي، بس مخفية لحد ما
      // صاحب المنصة يدوس على مربع المتخصص
      item.classList.add('prov-detail', 'hidden');
      item.setAttribute('data-email', provider.email);
      providersList.appendChild(item);
    });

    renderProviderGrid();
  } catch (error) {
    providersMessage.textContent = t('problem') + error.message;
  }
}

/* ============================================================
   المتخصصين كمربعات
   كل متخصص كان كارت طويل فيه أرقامه وتخصصاته ومكتباته وصلاحياته،
   فصاحب المنصة بينزل كتير عشان يوصل لواحد. دلوقتي مربعات جمب بعض
   وصورة/حروف كل واحد، واللي تدوس عليه بيفتحلك كارته كامل تحت
   ============================================================ */

let openProviderEmail = '';

function renderProviderGrid() {
  const grid = document.getElementById('providers-grid');
  const search = document.getElementById('providers-search');
  if (!grid) return;

  const term = ((search && search.value) || '').trim().toLowerCase();
  const shown = providers.filter(function (provider) {
    if (!term) return true;
    return String(provider.name || '').toLowerCase().indexOf(term) !== -1
      || String(provider.email || '').toLowerCase().indexOf(term) !== -1;
  });

  grid.innerHTML = '';
  shown.forEach(function (provider) {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'prov-cell' + (openProviderEmail === provider.email ? ' on' : '');
    cell.setAttribute('data-email', provider.email);
    cell.appendChild(providerAvatar(provider));

    const name = document.createElement('span');
    name.className = 'pc-name';
    name.textContent = providerShortName(provider);
    cell.appendChild(name);

    const specs = providerSpecialties(provider);
    const spec = document.createElement('span');
    spec.className = 'pc-spec';
    // مستند من غير تخصص = مستند ناقص. بنقولها صريح بدل خانة فاضية
    spec.textContent = specs.length ? specialtyName(specs[0], lang) : t('no_specialty');
    cell.appendChild(spec);

    const n = Number(provider.clientsCount) || 0;
    const count = document.createElement('span');
    count.className = 'pc-count';
    count.textContent = fill('pc_clients_n', { n: n });
    cell.appendChild(count);

    cell.addEventListener('click', function () {
      openProviderEmail = (openProviderEmail === provider.email) ? '' : provider.email;
      paintProviderDetails();
      renderProviderGrid();
      if (openProviderEmail) {
        const row = providersList.querySelector('.prov-detail[data-email="' + provider.email + '"]');
        if (row) row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    grid.appendChild(cell);
  });

  if (!shown.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = t('no_search_results');
    grid.appendChild(empty);
  }

  paintProviderDetails();
}

function paintProviderDetails() {
  providersList.querySelectorAll('.prov-detail').forEach(function (row) {
    row.classList.toggle('hidden', row.getAttribute('data-email') !== openProviderEmail);
  });
}

document.getElementById('open-providers-btn').addEventListener('click', function () {
  showScreen(providersScreen);
  fillSpecialtySelect();
  loadProviders();
});

const providersSearchInput = document.getElementById('providers-search');
if (providersSearchInput) providersSearchInput.addEventListener('input', renderProviderGrid);

document.getElementById('quick-add-coach-btn').addEventListener('click', function () {
  showScreen(providersScreen);
  fillSpecialtyCheckboxes(pvSpecialtyMulti, ['coach']);
  loadProviders();
  document.getElementById('pv-name').focus();
});

document.getElementById('providers-back-btn').addEventListener('click', function () {
  showScreen(clientsScreen);
  loadClients();
});

document.getElementById('pv-add-btn').addEventListener('click', async function () {
  const nameInput = document.getElementById('pv-name');
  const emailInput = document.getElementById('pv-email');
  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const specialties = readSpecialtyCheckboxes(pvSpecialtyMulti);

  if (!name || !email || !specialties.length) {
    providersMessage.textContent = t('need_provider_fields');
    return;
  }

  providersMessage.textContent = t('adding');
  try {
    // isMedical بيتحسب هنا من تعريف التخصصات في providers.js وقت الإضافة،
    // ومحفوظ على مستند المتخصص نفسه — عشان قاعدة الأمان في firestore.rules
    // تقدر تتحقق منه من غير ما تحتاج قائمة تخصصات مكتوبة يدويًا؛ يعني
    // أي تخصص جديد تضيفه في SPECIALTIES بيشتغل صح تلقائي من غير ما
    // نرجع نعدّل firestore.rules تاني. المتخصص ممكن يكون له أكتر من
    // تخصص مع بعض (مدرب + أخصائي تغذية مثلًا)
    await setDoc(doc(db, 'providers', email), {
      name: name,
      email: email,
      specialty: specialties[0],
      specialties: specialties,
      isMedical: specialtiesHaveFlag(specialties, 'medical')
    });
    nameInput.value = '';
    emailInput.value = '';
    fillSpecialtyCheckboxes(pvSpecialtyMulti, []);
    setStatusMessage(providersMessage, t('provider_saved'), 'success');
    await loadProviders();
  } catch (error) {
    providersMessage.textContent = t('problem') + error.message;
  }
});

/* ---------- بروفايل المتخصص: صورة + نبذة + شهادات ---------- */

phPhoto.addEventListener('change', async function () {
  const file = phPhoto.files[0];
  if (!file) return;

  if (file.size > MAX_SOURCE_BYTES) {
    providerHomeMessage.textContent = t('image_too_big');
    phPhoto.value = '';
    return;
  }

  providerHomeMessage.textContent = t('preparing_image');
  try {
    phPickedImage = await compressImage(file, IMAGE_MAX_SIDE, 0.7);
    phPhotoPreview.src = phPickedImage;
    phPhotoBox.classList.remove('hidden');
    phPhotoLabel.textContent = t('image_chosen');
    providerHomeMessage.textContent = '';
  } catch (error) {
    providerHomeMessage.textContent = t('image_failed');
  }
});

document.getElementById('ph-photo-remove').addEventListener('click', function () {
  phPickedImage = '';
  phPhoto.value = '';
  phPhotoPreview.removeAttribute('src');
  phPhotoBox.classList.add('hidden');
  phPhotoLabel.textContent = t('choose_photo');
});

document.getElementById('ph-save-btn').addEventListener('click', async function () {
  const updated = {
    name: phName.value.trim(),
    bio: phBio.value.trim(),
    certifications: phCerts.value.trim(),
    photo: phPickedImage
  };

  // مهم: صاحب المنصة (الحساب القديم) مفيهوش مستند providers أصلاً —
  // أول مرة يحفظ بروفايله هينشئ المستند ده لأول مرة، فلازم نحط فيه
  // specialty:'coach' صراحةً من غير ما نسيبه فاضي، عشان تسجيل الدخول
  // الجاي يعرف يتعامل معاه كمدرب صح (زي الشرح في onAuthStateChanged)
  // من غير ما يفقد صلاحياته أو قائمة عملائه. غير كده، المتخصص بيختار
  // تخصصاته بنفسه (ممكن أكتر من واحد) من صناديق الاختيار
  let picked = readSpecialtyCheckboxes(phSpecialtyMulti);
  if (isLegacyCoachAccount() && picked.indexOf('coach') === -1) {
    // حزام أمان: حتى لو حصل أي خلل في الواجهة، صاحب المنصة يفضل مدرب
    picked = ['coach'].concat(picked);
  }
  if (!picked.length) {
    providerHomeMessage.textContent = t('need_one_specialty');
    return;
  }

  /*
   * التخصص الجديد مابيشتغلش على طول — بيروح لصاحب المنصة عشان
   * يوافق عليه. اللي معتمد قبل كده بيفضل شغال، والشيل مش محتاج
   * موافقة (المتخصص حر يسيب تخصص في أي وقت).
   * صاحب المنصة والفريق الإداري موافقتهم فورية على نفسهم.
   */
  const alreadyApproved = providerSpecialties(currentProviderData);
  const keptApproved = picked.filter(function (key) { return alreadyApproved.indexOf(key) !== -1; });
  const requested = picked.filter(function (key) { return alreadyApproved.indexOf(key) === -1; });

  let newSpecialties;
  let stillPending = [];

  if (isFullAdminAccount()) {
    newSpecialties = picked;
  } else {
    if (!keptApproved.length) {
      // مايقدرش يشيل آخر تخصص معتمد وإلا هيقفل على نفسه كل حاجة
      providerHomeMessage.textContent = t('need_one_approved_specialty');
      return;
    }
    newSpecialties = keptApproved;
    stillPending = requested;
  }

  updated.specialties = newSpecialties;
  updated.pendingSpecialties = stillPending;
  // "مدرب" بيفضل التخصص الأساسي لو موجود — عشان شاشات كتير بتتعامل
  // مع specialty كقيمة واحدة وبتتوقع المدرب فيها
  updated.specialty = newSpecialties.indexOf('coach') !== -1 ? 'coach' : newSpecialties[0];
  updated.isMedical = specialtiesHaveFlag(newSpecialties, 'medical');

  providerHomeMessage.textContent = t('saving');
  try {
    await setDoc(doc(db, 'providers', currentProviderEmail), updated, { merge: true });
    currentProviderData = Object.assign({}, currentProviderData, updated);
    currentProviderSpecialties = newSpecialties;
    currentProviderSpecialty = newSpecialties.indexOf('coach') !== -1 ? 'coach' : (newSpecialties[0] || '');
    applyCoachScopeTabs();
    phOpenMedlibBtn.classList.toggle('hidden', !specialtiesHaveFlag(newSpecialties, 'medical'));
    renderSpecialtyChips(providerHomeSpecialty, newSpecialties);
    setSpecialtyLabel(providerHomeTitle, newSpecialties, updated.name || '');
    renderPendingSpecialtyNote();
    // الخانات بتترسم تاني عشان التخصص المستني يبان بشكله الصح
    fillSpecialtyCheckboxes(phSpecialtyMulti, newSpecialties.concat(stillPending),
      isLegacyCoachAccount() ? ['coach'] : []);
    if (stillPending.length) {
      setStatusMessage(providerHomeMessage,
        fill('specialty_sent_for_review', { list: specialtyListName(stillPending) }), 'success');
    } else {
      setStatusMessage(providerHomeMessage, t('profile_saved'), 'success');
    }
  } catch (error) {
    providerHomeMessage.textContent = t('problem') + error.message;
  }
});

/* ============================ حساب جديد ============================ */

document.getElementById('show-signup-btn').addEventListener('click', function () {
  signupMessage.textContent = '';
  showScreen(signupScreen);
});

document.getElementById('show-login-btn').addEventListener('click', function () {
  loginMessage.textContent = '';
  showScreen(loginScreen);
});

document.getElementById('welcome-start-btn').addEventListener('click', function () {
  signupMessage.textContent = '';
  showScreen(signupScreen);
});

document.getElementById('welcome-login-btn').addEventListener('click', function () {
  loginMessage.textContent = '';
  showScreen(loginScreen);
});

document.getElementById('welcome-sticky-start-btn').addEventListener('click', function () {
  signupMessage.textContent = '';
  showScreen(signupScreen);
});

/* ---------- عجلة أجزاء البرنامج في صفحة التعريف ---------- */

/*
 * وحدات القياس جوه قوالب التأهيل مكتوبة بالعربي جوه نص التكرارات
 * نفسه (مثال: reps: '30 ثانية')، مش حقل مترجم. بدل ما نعيد كتابة
 * كل القوالب، بنترجم الكلمات دي وقت العرض بس — فالقالب يفضل زي ما
 * هو والزائر الإنجليزي يشوف "30 s".
 */
const REPS_UNITS_EN = {
  'ثانية': 's', 'ثواني': 's', 'ثوانٍ': 's', 'ث': 's',
  'دقيقة': 'min', 'دقائق': 'min', 'د': 'min',
  'متر': 'm', 'خطوة': 'steps', 'جهة': 'each side',
  'رجل': 'leg', 'مرة': 'times', 'لكل': 'per', 'كاملة': 'full',
  'تكرار': 'reps', 'تكرارات': 'reps', 'مجموعات': 'sets', 'جانب': 'side', 'كل جانب': 'each side',
  'دقايق': 'min', 'ساعة': 'h', 'مرات': 'times', 'اتجاه': 'direction', 'كل اتجاه': 'each direction',
  'يوميًا': 'daily', 'يوميا': 'daily', 'أسبوعيًا': 'weekly', 'وحدة': 'IU', 'وحدة دولية': 'IU'
};

function localiseReps(text) {
  if (lang !== 'en' || !text) return text;
  let out = String(text);
  // الأطول الأول عشان "ثواني" ماتتقسمش على "ث"
  // كلمة كاملة بس — "د" لوحدها يعني دقيقة، لكن جوه كلمة زي "بعد" لأ
  Object.keys(REPS_UNITS_EN)
    .sort(function (a, b) { return b.length - a.length; })
    .forEach(function (word) {
      const re = new RegExp('(^|[^\u0600-\u06FF])' + word + '(?![\u0600-\u06FF])', 'g');
      out = out.replace(re, '$1' + REPS_UNITS_EN[word]);
    });
  // "20 م" / "3 كم" / "10 كجم" — بس لو قبلها رقم، عشان حروف الكلام العادي ما تتغيّرش
  out = out.replace(/(\d)\s*كجم/g, '$1 kg').replace(/(\d)\s*كم(?![\u0600-\u06FF])/g, '$1 km')
    .replace(/(\d)\s*جم(?![\u0600-\u06FF])/g, '$1 g').replace(/(\d)\s*م(?![\u0600-\u06FF])/g, '$1 m');
  return out.replace(/\s+/g, ' ').trim();
}

/* ---------- صفحات التخصصات تحت الكاروسيل ---------- */

const WELCOME_PILLAR_KEYS = ['training', 'rehab', 'nutrition', 'medical'];
let currentWelcomePillar = 'training';

/*
 * كل تخصص له صفحة: اسمه، شكل البرنامج اللي هيتكتبله، وتلات عيّنات
 * حقيقية من مكتبة التطبيق. الصفحات فوق بعض والواحدة بتتقلب لما
 * تدوس على تخصصها في الكاروسيل.
 * ده بقى مكان تلات أقسام كانت منفصلة: "كل حاجة في مكان واحد"،
 * "لمحة من المكتبة"، و"شكل البرنامج" — نفس المعلومة في مساحة واحدة
 * وكلام أقل بكتير.
 */
function renderSpecPages() {
  const root = document.getElementById('specpages');
  if (!root) return;

  root.innerHTML = '';

  WELCOME_PILLAR_KEYS.forEach(function (key) {
    const page = document.createElement('article');
    page.className = 'specpage';
    page.setAttribute('data-pillar', key);

    const head = document.createElement('div');
    head.className = 'specpage-head';
    head.innerHTML = '<span class="specpage-dot spd-' + key + '"></span>'
      + '<span class="specpage-title">' + t('welcome_program_title_' + key) + '</span>';
    page.appendChild(head);

    // شكل البرنامج — سطور قصيرة زي ما بتظهر جوه التطبيق
    const preview = welcomeProgramPreview(key);
    const rows = document.createElement('div');
    rows.className = 'specpage-rows';
    preview.lines.slice(0, 4).forEach(function (line, i) {
      if (!line) return;
      const row = document.createElement('div');
      row.className = 'specpage-row';
      row.style.animationDelay = (i * 0.06) + 's';
      row.innerHTML = '<span class="specpage-tick"></span><span>' + localiseReps(line) + '</span>';
      rows.appendChild(row);
    });
    page.appendChild(rows);

    // عيّنات حقيقية من المكتبة
    const chips = document.createElement('div');
    chips.className = 'specpage-chips';
    welcomeSampleItems(key).slice(0, 3).forEach(function (item) {
      const chip = document.createElement('span');
      chip.className = 'specpage-chip';
      chip.innerHTML = item.icon + '<span>' + item.name + '</span>';
      chips.appendChild(chip);
    });
    page.appendChild(chips);

    root.appendChild(page);
  });

  showSpecPage(currentWelcomePillar);
}

function showSpecPage(pillarKey) {
  const root = document.getElementById('specpages');
  if (!root) return;
  currentWelcomePillar = pillarKey;

  const pages = root.querySelectorAll('.specpage');
  const order = WELCOME_PILLAR_KEYS.indexOf(pillarKey);

  let front = null;

  pages.forEach(function (page, i) {
    const offset = ((i - order) % pages.length + pages.length) % pages.length;
    page.classList.toggle('specpage-front', offset === 0);
    page.style.zIndex = String(40 - offset);
    page.style.opacity = offset < 3 ? String(1 - offset * 0.32) : '0';
    page.style.transform = 'translateY(' + (offset * 9) + 'px) scale(' + (1 - offset * 0.04) + ')';
    page.style.pointerEvents = offset === 0 ? 'auto' : 'none';
    if (offset === 0) front = page;
  });

  /*
   * الصندوق بياخد ارتفاع الصفحة اللي قدام بالظبط. قبل كده كان
   * ارتفاعه ثابت، فالتخصص اللي محتواه أطول (التأهيل مثلاً) كان
   * بيتقص من تحت ويبان ناقص.
   */
  if (front) {
    const needed = front.scrollHeight;
    root.style.minHeight = (needed + 20) + 'px';
  }
}

/* التخصص اللي في الكاروسيل بيحدد الصفحة اللي قدام */
function renderWelcomePillarDetail(pillarKey) {
  showSpecPage(pillarKey);
}

function renderWelcomeTour(pillarKey) {
  showSpecPage(pillarKey);
}

function wpIcon(innerPaths) {
  return '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + innerPaths + '</svg>';
}

const WP_TRAINING_ICON = '<rect x="2" y="9" width="3" height="6" rx="1"></rect><rect x="19" y="9" width="3" height="6" rx="1"></rect><line x1="5" y1="12" x2="19" y2="12"></line><rect x="6" y="7" width="2.5" height="10" rx="1"></rect><rect x="15.5" y="7" width="2.5" height="10" rx="1"></rect>';
const WP_REHAB_ICON = '<rect x="3" y="9" width="18" height="6" rx="3"></rect><line x1="10" y1="9" x2="10" y2="15"></line><line x1="14" y1="9" x2="14" y2="15"></line>';
const WP_NUTRITION_ICON = '<path d="M12 8.5c-2.8 0-5 2.3-5 5.8 0 3 2.1 5.7 4 5.7.8 0 1.2-.4 1.9-.4.7 0 1.1.4 1.9.4 1.7 0 3.7-2.4 3.9-5.1.2-2.7-1.5-4.6-3.4-5"></path><path d="M12 8.5V6.3c0-.9.7-1.8 2-2"></path>';

function welcomeSampleItems(pillarKey) {
  if (pillarKey === 'rehab') {
    const template = REHAB_TEMPLATES[0];
    const phase = template && template.phases[0];
    if (!phase) return [];
    return phase.exercises.slice(0, 4).map(function (exercise) {
      return {
        icon: wpIcon(WP_REHAB_ICON),
        name: exercise.name[lang],
        detail: exercise.sets + '×' + exercise.reps
      };
    });
  }

  if (pillarKey === 'nutrition') {
    const picks = ['chicken_breast', 'rice_white', 'banana', 'olive_oil'];
    return picks.map(function (id) {
      const item = FOOD_LIBRARY.filter(function (f) { return f.id === id; })[0];
      if (!item) return null;
      return {
        icon: wpIcon(WP_NUTRITION_ICON),
        name: item[lang],
        detail: item.c + ' ' + t('kcal_100g')
      };
    }).filter(Boolean);
  }

  if (pillarKey === 'medical') {
    /*
     * كل تخصص ليه سطره الخاص. قبل كده كانوا الأربعة بنفس الجملة
     * بالظبط ("استشارة متخصصة عن طريق الشات") — تكرار مش بيضيف حاجة
     * للزائر ولا بيفرّقله بين التخصصات
     */
    const picks = ['physio', 'ortho', 'sports_medicine', 'psychologist'];
    return picks.map(function (key) {
      return {
        icon: specialtyIconSvg(key),
        name: specialtyName(key, lang),
        detail: t('medical_case_' + key)
      };
    });
  }

  // training (الافتراضي)
  return [1, 2, 3, 4].map(function (n) {
    return {
      icon: wpIcon(WP_TRAINING_ICON),
      name: t('welcome_sample_ex_' + n + '_name'),
      detail: t('welcome_sample_ex_' + n + '_detail')
    };
  });
}

function welcomeProgramPreview(pillarKey) {
  if (pillarKey === 'rehab') {
    const template = REHAB_TEMPLATES[0];
    const phase = template && template.phases[0];
    if (!phase) return { title: '', lines: [] };
    return {
      title: template.name[lang] + ' — ' + phase.name[lang],
      lines: phase.exercises.slice(0, 4).map(function (exercise) {
        return exercise.name[lang] + ' — ' + exercise.sets + '×' + exercise.reps;
      })
    };
  }

  if (pillarKey === 'nutrition') {
    const meals = [
      { slotKey: 'meal_breakfast', foodId: 'oats' },
      { slotKey: 'meal_lunch', foodId: 'chicken_breast' },
      { slotKey: 'meal_dinner', foodId: 'fish_tilapia' },
      { slotKey: 'meal_snack', foodId: 'banana' }
    ];
    return {
      title: t('welcome_program_title_nutrition'),
      lines: meals.map(function (meal) {
        const item = FOOD_LIBRARY.filter(function (f) { return f.id === meal.foodId; })[0];
        if (!item) return t(meal.slotKey);
        return t(meal.slotKey) + ' — ' + item[lang] + ' (' + item.c + ' ' + t('kcal_100g') + ')';
      })
    };
  }

  if (pillarKey === 'medical') {
    return {
      title: t('welcome_program_title_medical'),
      lines: [1, 2, 3, 4].map(function (n) { return t('welcome_medical_step_' + n); })
    };
  }

  // training (الافتراضي)
  return {
    title: t('welcome_program_day_title'),
    lines: [1, 2, 3, 4].map(function (n) { return t('welcome_program_line_' + n); })
  };
}


/* ---------- شريط الثقة: عدد العملاء الحقيقي (لو موجود) ---------- */

/*
 * شريط الأرقام اتشال من الصفحة — الأرقام المجردة ماكانتش بتقول حاجة
 * للزائر. الدليل الحقيقي بقى شريط الفريق المرسوم وقسم "فريقك
 * المتخصص" اللي بيعرض المتخصصين الحقيقيين بصورهم.
 */
async function loadWelcomeTrustStat() {
  return;
}

/* ---------- فريق العمل الحقيقي في الصفحة الرئيسية ---------- */

async function loadWelcomeTeamPreview() {
  let providers = [];
  try {
    const snapshot = await getDocs(collection(db, 'providers'));
    providers = snapshot.docs
      .map(function (item) { return Object.assign({ email: item.id }, item.data()); })
      .filter(function (p) { return p.name && providerSpecialties(p).length; })
      .slice(0, 8);
  } catch (error) {
    providers = [];
  }

  welcomeTeamGrid.innerHTML = '';

  if (!providers.length) {
    welcomeTeamSection.classList.add('hidden');
    return;
  }

  /*
   * بدل قسم منفصل بكروت بتاخد مساحة كبيرة، المتخصصين الحقيقيين
   * بيتعرضوا في الكاروسيل اللي فوق بصورهم وتقييماتهم. القسم المنفصل
   * ده بيفضل مخفي طول ما الكاروسيل شايلهم
   */
  await fetchAllProviderReviews().catch(function () {});
  if (setOrbitToProviders(providers)) {
    welcomeTeamSection.classList.add('hidden');
    return;
  }

  /*
   * القسم المنفصل ده اتلغى — الكاروسيل فوق هو اللي بيمثّل الفريق:
   * مشاهد مرسومة دلوقتي، وصور المتخصصين الحقيقية أول ما يوصلوا 10.
   * بنسيب الكود عشان لو حبيت ترجّعه في أي وقت
   */
  welcomeTeamSection.classList.add('hidden');
  return;

  // eslint-disable-next-line no-unreachable
  providers.forEach(function (provider) {
    const specs = providerSpecialties(provider);
    const card = document.createElement('div');
    card.className = 'welcome-team-card';

    const avatar = document.createElement('div');
    avatar.className = 'welcome-team-avatar';
    avatar.innerHTML = (typeof specialtyIconSvg === 'function' && specs[0]) ? specialtyIconSvg(specs[0]) : '';
    card.appendChild(avatar);

    const name = document.createElement('div');
    name.className = 'welcome-team-name';
    name.textContent = provider.name;
    card.appendChild(name);

    const specialty = document.createElement('div');
    specialty.className = 'welcome-team-specialty';
    renderSpecialtyChips(specialty, specs);
    card.appendChild(specialty);

    welcomeTeamGrid.appendChild(card);
  });
}

/* ---------- أسئلة شائعة ---------- */

const FAQ_KEYS = ['1', '2', '3', '4', '5'];

/*
 * ============ مكوّن الكروت المتراصّة (Deck) ============
 * كروت فوق بعض زي الكوتشينة أو إشعارات الموبايل: الكارت اللي قدام
 * كامل، واللي وراه باينين من تحته شوية. تسحب يمين أو شمال (أو تدوس
 * على السهم) فيتقلبوا، وتدوس على الكارت نفسه فيفتح يوريك التفاصيل.
 *
 * نفس المكوّن بيتستعمل في "ده مناسب لمين؟" وفي الأسئلة الشائعة —
 * فالتجربة متسقة والكود واحد.
 */
function createDeck(options) {
  const root = document.getElementById(options.rootId);
  const nav = document.getElementById(options.navId);
  if (!root) return null;

  const items = options.items || [];
  let index = 0;
  let expanded = false;

  root.innerHTML = '';
  if (nav) nav.innerHTML = '';

  const cards = items.map(function (item, i) {
    const card = document.createElement('article');
    card.className = 'deck-card' + (options.cardClass ? ' ' + options.cardClass : '');
    card.innerHTML = options.render(item, i);
    root.appendChild(card);
    return card;
  });

  function layout() {
    const n = cards.length;
    cards.forEach(function (card, i) {
      // المسافة بين الكارت ده واللي قدام (0 = هو اللي قدام)
      const offset = ((i - index) % n + n) % n;
      const visible = offset < 3;

      card.style.zIndex = String(50 - offset);
      card.style.opacity = visible ? String(1 - offset * 0.3) : '0';
      card.style.transform = 'translateY(' + (offset * 11) + 'px) scale(' + (1 - offset * 0.05) + ')';
      card.style.pointerEvents = offset === 0 ? 'auto' : 'none';
      card.classList.toggle('deck-front', offset === 0);
      card.classList.toggle('deck-open', offset === 0 && expanded);
    });

    if (nav) {
      nav.querySelectorAll('.deck-dot').forEach(function (dot, i) {
        dot.classList.toggle('active', i === index);
      });
    }
    root.style.minHeight = (expanded ? 'var(--deck-open-h, 210px)' : 'var(--deck-h, 132px)');
  }

  function go(step) {
    const n = cards.length;
    index = ((index + step) % n + n) % n;
    expanded = false;
    layout();
  }

  function toggleOpen() {
    if (!options.expandable) return;
    expanded = !expanded;
    layout();
  }

  cards.forEach(function (card) {
    card.addEventListener('click', toggleOpen);
  });

  /* السحب باللمس أو بالماوس */
  let startX = 0;
  let dragging = false;

  function onStart(x) { startX = x; dragging = true; }
  function onEnd(x) {
    if (!dragging) return;
    dragging = false;
    const dx = x - startX;
    if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
  }

  root.addEventListener('touchstart', function (e) { onStart(e.touches[0].clientX); }, { passive: true });
  root.addEventListener('touchend', function (e) { onEnd(e.changedTouches[0].clientX); }, { passive: true });
  root.addEventListener('mousedown', function (e) { onStart(e.clientX); });
  root.addEventListener('mouseup', function (e) { onEnd(e.clientX); });

  if (nav) {
    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'deck-arrow';
    prev.innerHTML = '‹';
    prev.setAttribute('aria-label', t('deck_prev'));
    prev.addEventListener('click', function () { go(-1); });
    nav.appendChild(prev);

    const dots = document.createElement('div');
    dots.className = 'deck-dots';
    items.forEach(function (item, i) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'deck-dot';
      dot.setAttribute('aria-label', String(i + 1));
      dot.addEventListener('click', function () { index = i; expanded = false; layout(); });
      dots.appendChild(dot);
    });
    nav.appendChild(dots);

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'deck-arrow';
    next.innerHTML = '›';
    next.setAttribute('aria-label', t('deck_next'));
    next.addEventListener('click', function () { go(1); });
    nav.appendChild(next);
  }

  layout();
  return { go: go, layout: layout };
}

/* ---------- "ده مناسب لمين؟" — كروت بتتقلب ---------- */

const AUDIENCE_CARDS = [
  { key: 1, icon: 'rehab', c: '#f97316' },
  { key: 2, icon: 'training', c: '#22c55e' },
  { key: 3, icon: 'trophy', c: '#a78bfa' },
  { key: 4, icon: 'salad', c: '#38bdf8' }
];

function renderAudienceDeck() {
  createDeck({
    rootId: 'audience-deck',
    navId: 'audience-nav',
    cardClass: 'aud-card',
    items: AUDIENCE_CARDS,
    render: function (item) {
      return '<div class="aud-icon" style="background:' + item.c + '22;color:' + item.c + '">'
        + iconSvg(item.icon, 'ui-icon').outerHTML + '</div>'
        + '<div class="aud-text">' + t('welcome_audience_' + item.key) + '</div>';
    }
  });
}

/* ---------- الأسئلة الشائعة — إشعارات فوق بعض ---------- */

function renderWelcomeFaq() {
  createDeck({
    rootId: 'welcome-faq-list',
    navId: 'faq-nav',
    cardClass: 'notif-card',
    expandable: true,
    items: FAQ_KEYS,
    render: function (key) {
      return '<div class="notif-head">'
        +   '<span class="notif-app">ADAM</span>'
        +   '<span class="notif-time">' + t('faq_badge') + '</span>'
        + '</div>'
        + '<div class="notif-q">' + t('faq_q' + key) + '</div>'
        + '<div class="notif-a">' + t('faq_a' + key) + '</div>';
    }
  });
}

function loadWelcomeExtras() {
  renderWelcomeFaq();
  renderAudienceDeck();
  loadWelcomeTrustStat();
  loadWelcomeTeamPreview();
  loadWelcomeStories();
  fillProviderApplySpecialtySelect();
}

function fillProviderApplySpecialtySelect() {
  if (!paSpecialtyMulti) return;
  const keep = readSpecialtyCheckboxes(paSpecialtyMulti);
  fillSpecialtyCheckboxes(paSpecialtyMulti, keep);
}

/* ---------- لسه مش متأكد؟ اتكلم مع فريقنا الأول (نموذج تواصل) ---------- */

const leadNameInput = document.getElementById('lead-name');
const leadContactInput = document.getElementById('lead-contact');
const leadMessageInput = document.getElementById('lead-message');
const leadMessageStatus = document.getElementById('lead-message-status');

/*
 * الزائر اللي عايز يتكلم مع الفريق قبل ما يسجّل بيسيب بياناته هنا.
 * بقينا ناخد منه الإيميل والموبايل كل واحد لوحده (مش خانة واحدة زي
 * الأول) عشان:
 *   1) الموبايل يتراجع ويتأكد إنه مش ناقص ولا زايد
 *   2) الإيميل هو اللي بيخلّي صاحب المنصة يقدر "يقبله كعميل" بضغطة
 *      واحدة فيتعمله حساب جاهز على طول
 */
const leadPhoneCode = document.getElementById('lead-phone-code');
const leadPhoneInput = document.getElementById('lead-phone');
const leadInterestSelect = document.getElementById('lead-interest');

function fillLeadInterestSelect() {
  if (!leadInterestSelect) return;
  const keep = leadInterestSelect.value;
  leadInterestSelect.innerHTML = '';
  const none = document.createElement('option');
  none.value = '';
  none.textContent = t('lead_interest_ph');
  leadInterestSelect.appendChild(none);
  Object.keys(SPECIALTIES).forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = specialtyName(key, lang);
    leadInterestSelect.appendChild(option);
  });
  leadInterestSelect.value = keep;
}

document.getElementById('lead-submit-btn').addEventListener('click', async function () {
  const name = leadNameInput.value.trim();
  const email = leadContactInput.value.trim().toLowerCase();
  const phoneCheck = validatePhone(leadPhoneCode ? leadPhoneCode.value : '+20', leadPhoneInput ? leadPhoneInput.value : '', true);

  if (!name) {
    leadMessageStatus.textContent = t('need_lead_fields');
    return;
  }
  if (!phoneCheck.ok) {
    leadMessageStatus.textContent = phoneErrorText(leadPhoneCode ? leadPhoneCode.value : '+20', phoneCheck.error);
    return;
  }
  if (email && !isValidEmail(email)) {
    leadMessageStatus.textContent = t('bad_email');
    return;
  }

  const phone = (leadPhoneCode ? leadPhoneCode.value : '+20') + ' ' + phoneCheck.digits;

  leadMessageStatus.textContent = t('saving');
  try {
    const id = 'lead_' + Date.now();
    await setDoc(doc(db, 'leads', id), {
      name: name,
      phone: phone,
      email: email,
      // بنسيب contact زي ما هو عشان الرسايل القديمة تفضل تتعرض عادي
      contact: email || phone,
      interest: leadInterestSelect ? leadInterestSelect.value : '',
      message: leadMessageInput.value.trim(),
      contacted: false,
      accepted: false,
      createdAt: new Date().toISOString()
    });
    /*
     * الرسالة الترحيبية: بتتبعت فورًا من Google Apps Script.
     * فشلها مايوقفش حاجة — الرسالة اتحفظت في الداتا أصلًا وهتوصلك
     * في التقرير اليومي، فالترحيب مكسب زيادة مش شرط
     */
    sendWelcomeMail({ name: name, email: email, phone: phone, interest: leadInterestSelect ? leadInterestSelect.value : '' });

    setStatusMessage(leadMessageStatus, t('lead_submitted_msg'), 'success');
    leadNameInput.value = '';
    leadContactInput.value = '';
    if (leadPhoneInput) leadPhoneInput.value = '';
    leadMessageInput.value = '';
    if (leadInterestSelect) leadInterestSelect.value = '';
  } catch (error) {
    leadMessageStatus.textContent = t('problem') + error.message;
  }
});

/* ---------- طلب انضمام مدرب أو متخصص جديد ---------- */

const paNameInput = document.getElementById('pa-name');
const paEmailInput = document.getElementById('pa-email');
const paContactInput = document.getElementById('pa-contact');
const paMessageInput = document.getElementById('pa-message');
const providerApplyStatus = document.getElementById('provider-apply-status');

document.getElementById('provider-apply-submit-btn').addEventListener('click', async function () {
  const name = paNameInput.value.trim();
  const email = paEmailInput.value.trim().toLowerCase();
  const contact = paContactInput.value.trim();
  const specialties = readSpecialtyCheckboxes(paSpecialtyMulti);
  if (!name || !email || !specialties.length) {
    providerApplyStatus.textContent = t('need_provider_apply_fields');
    return;
  }

  providerApplyStatus.textContent = t('saving');
  try {
    const id = 'app_' + Date.now();
    await setDoc(doc(db, 'providerApplications', id), {
      name: name,
      email: email,
      contact: contact,
      specialty: specialties[0],
      specialties: specialties,
      message: paMessageInput.value.trim(),
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    setStatusMessage(providerApplyStatus, t('provider_apply_submitted_msg'), 'success');
    paNameInput.value = '';
    paEmailInput.value = '';
    paContactInput.value = '';
    paMessageInput.value = '';
    fillSpecialtyCheckboxes(paSpecialtyMulti, []);
  } catch (error) {
    providerApplyStatus.textContent = t('problem') + error.message;
  }
});

/* ---------- قصص نجاح (قبل/بعد) في الصفحة الرئيسية ---------- */

async function loadWelcomeStories() {
  let stories = [];
  try {
    const snapshot = await getDocs(query(
      collection(db, 'successStories'),
      where('active', '==', true),
      where('consentConfirmed', '==', true)
    ));
    stories = snapshot.docs.map(function (item) { return Object.assign({ id: item.id }, item.data()); });
  } catch (error) {
    stories = [];
  }

  welcomeStoriesGrid.innerHTML = '';

  if (!stories.length) {
    welcomeStoriesSection.classList.add('hidden');
    return;
  }

  welcomeStoriesSection.classList.remove('hidden');
  stories.forEach(function (story) {
    const card = document.createElement('div');
    card.className = 'story-card';

    const images = document.createElement('div');
    images.className = 'story-images';

    const beforeBox = document.createElement('div');
    const beforeImg = document.createElement('img');
    beforeImg.src = story.beforeImage;
    beforeImg.alt = '';
    beforeBox.appendChild(beforeImg);
    const beforeLabel = document.createElement('div');
    beforeLabel.className = 'story-image-label';
    beforeLabel.textContent = t('story_before_label');
    beforeBox.appendChild(beforeLabel);
    images.appendChild(beforeBox);

    const afterBox = document.createElement('div');
    const afterImg = document.createElement('img');
    afterImg.src = story.afterImage;
    afterImg.alt = '';
    afterBox.appendChild(afterImg);
    const afterLabel = document.createElement('div');
    afterLabel.className = 'story-image-label';
    afterLabel.textContent = t('story_after_label');
    afterBox.appendChild(afterLabel);
    images.appendChild(afterBox);

    card.appendChild(images);

    if (story.caption) {
      const caption = document.createElement('div');
      caption.className = 'story-caption';
      caption.textContent = story.caption;
      card.appendChild(caption);
    }

    welcomeStoriesGrid.appendChild(card);
  });
}

// عجلة الأعمدة اتشالت — الكاروسيل بقى هو اللي بيختار التخصص
renderSpecPages();
loadWelcomeExtras();
fillLeadInterestSelect();

/* ============ الصفحة الرئيسية: الواجهة الجديدة ============ */
/*
 * الصفحة كانت ٤.٨ شاشة موبايل و٥٣٠ كلمة — الزائر كان بيقرا مجهود قبل
 * ما يشوف حاجة. دلوقتي أول شاشة فيها موبايل بيعرض شكل البرنامج
 * الحقيقي وهو بيتحرك، والفورمات الطويلة اتخبّت ورا زراير.
 */

/* شاشة الموبايل اللي في الهيرو — بتلف على ٣ أمثلة حقيقية من التطبيق */
const HERO_SLIDES = [
  {
    icon: 'training', key: 'training', pillar: 'training', color: '#22c55e', tagKey: 'role_coach',
    titleKey: 'hero_slide1_title', subKey: 'hero_slide1_sub',
    rowsKey: 'hero_slide1_rows', footKey: 'hero_slide1_foot', pct: 60
  },
  {
    icon: 'rehab', key: 'rehab', pillar: 'rehab', color: '#f97316', tagKey: 'role_rehab',
    titleKey: 'hero_slide2_title', subKey: 'hero_slide2_sub',
    rowsKey: 'hero_slide2_rows', footKey: 'hero_slide2_foot', pct: 40
  },
  {
    icon: 'apple', key: 'nutrition', pillar: 'nutrition', color: '#38bdf8', tagKey: 'role_nutrition',
    titleKey: 'hero_slide3_title', subKey: 'hero_slide3_sub',
    rowsKey: 'hero_slide3_rows', footKey: 'hero_slide3_foot', pct: 75
  },
  {
    icon: 'doctor_kit', key: 'medical', pillar: 'medical', color: '#a78bfa', tagKey: 'role_doctor',
    titleKey: 'hero_slide4_title', subKey: 'hero_slide4_sub',
    rowsKey: 'hero_slide4_rows', footKey: 'hero_slide4_foot', pct: 100
  },
  {
    icon: 'brain', key: 'psych', pillar: 'medical', color: '#f472b6', tagKey: 'role_psych',
    titleKey: 'hero_slide5_title', subKey: 'hero_slide5_sub',
    rowsKey: 'hero_slide5_rows', footKey: 'hero_slide5_foot', pct: 55
  },
  {
    icon: 'progress', key: 'progress', pillar: 'training', color: '#fbbf24', tagKey: 'role_progress',
    titleKey: 'hero_slide6_title', subKey: 'hero_slide6_sub',
    rowsKey: 'hero_slide6_rows', footKey: 'hero_slide6_foot', pct: 85
  }
];

let heroSlideIndex = 0;
let heroSlideTimer = null;

/*
 * ============ الشريط العريض ============
 * ست محطات بعدد شاشات الموبايل. الأيقونات مصمتة (filled) مش خطوط
 * رفيعة — بتبان أقوى بكتير في الحجم الصغير. ومع كل محطة فيه خلفية
 * بطابعها: ألياف عضلية للتدريب، نبض للطب، موجات للنفسي... إلخ.
 */
const BAND_NODES = [
  { key: 'training',  pillar: 'training',  color: '#22c55e', labelKey: 'role_coach',
    art: '<rect x="1" y="8" width="4" height="8" rx="2"/><rect x="19" y="8" width="4" height="8" rx="2"/>'
       + '<rect x="5.5" y="5" width="4.5" height="14" rx="2.2"/><rect x="14" y="5" width="4.5" height="14" rx="2.2"/>'
       + '<rect x="9" y="10.4" width="6" height="3.2" rx="1.6"/>' },
  /*
   * كانت ركبة بدعامة، وفي الحجم الصغير كانت بتطلع شبه البرطمان.
   * بقت كتف: نص جسم وعليه حلقة منوّرة على الكتف — الحلقة هي اللي
   * بتقول "المفصل ده هو الموضوع"، وبتتقري من نص نظرة
   */
  { key: 'rehab',     pillar: 'rehab',     color: '#f97316', labelKey: 'role_rehab',
    art: '<circle cx="8.6" cy="4.8" r="3.3"/>'
       + '<path d="M2 21.6c0-4.1 2.9-7.2 6.6-7.2s6.6 3.1 6.6 7.2z"/>'
       + '<circle cx="16.8" cy="15.2" r="6.2" fill="#0b1220"/>'
       + '<circle cx="16.8" cy="15.2" r="5"/>'
       + '<circle cx="16.8" cy="15.2" r="2.4" fill="#0b1220"/>' },
  { key: 'nutrition', pillar: 'nutrition', color: '#38bdf8', labelKey: 'role_nutrition',
    art: '<path d="M12 2a10 10 0 0 1 10 10h-10z"/><path d="M22 12a10 10 0 0 1-15.3 8.5L12 12z" opacity=".72"/>'
       + '<path d="M6.7 20.5A10 10 0 0 1 12 2v10z" opacity=".45"/><circle cx="12" cy="12" r="2.6" fill="#0b1220"/>' },
  { key: 'medical',   pillar: 'medical',   color: '#a78bfa', labelKey: 'role_doctor',
    art: '<path d="M6 2v6a4.2 4.2 0 0 0 8.4 0V2h2.6v6a6.8 6.8 0 0 1-5.5 6.7v2.1a3.2 3.2 0 0 0 6.4 0v-1.3h2.6v1.3a5.8 5.8 0 0 1-11.6 0v-2.1A6.8 6.8 0 0 1 3.4 8V2z"/>'
       + '<circle cx="19.3" cy="12.6" r="3.1"/>' },
  { key: 'psych',     pillar: 'medical',   color: '#f472b6', labelKey: 'role_psych',
    art: '<path d="M12 2a7.6 7.6 0 0 1 7.6 7.6c0 2.8-1.5 4.6-2.9 5.9-.9.9-1.5 1.6-1.5 2.8V20H8.8v-1.7c0-1.2-.6-1.9-1.5-2.8C5.9 14.2 4.4 12.4 4.4 9.6A7.6 7.6 0 0 1 12 2z"/>'
       + '<rect x="9" y="21" width="6" height="2.4" rx="1.2"/>'
       + '<path d="M8.4 9.6c1.6-2.6 3.2 2.6 4.8 0s3.2 2.6 4.8 0" stroke="#0b1220" stroke-width="1.8" fill="none"/>' },
  { key: 'progress',  pillar: 'training',  color: '#fbbf24', labelKey: 'role_progress',
    art: '<rect x="3" y="13" width="4.2" height="8.5" rx="1.6"/><rect x="9.9" y="9" width="4.2" height="12.5" rx="1.6"/>'
       + '<rect x="16.8" y="4.5" width="4.2" height="17" rx="1.6"/>' }
];

/* خلفية بطابع كل تخصص — أنماط SVG بسيطة بتتكرر ورا الهيرو كله */
function specBackdrop(key, color) {
  const c = color;
  if (key === 'training') {
    // ألياف عضلية: خيوط متموّجة متوازية
    return '<pattern id="bgpat" width="54" height="30" patternUnits="userSpaceOnUse">'
      + '<path d="M0 7 Q13 0 27 7 T54 7" fill="none" stroke="' + c + '" stroke-width="3.4" stroke-linecap="round"/>'
      + '<path d="M0 16 Q13 9 27 16 T54 16" fill="none" stroke="' + c + '" stroke-width="3.4" stroke-linecap="round"/>'
      + '<path d="M0 25 Q13 18 27 25 T54 25" fill="none" stroke="' + c + '" stroke-width="3.4" stroke-linecap="round"/>'
      + '</pattern>';
  }
  if (key === 'rehab') {
    // مفصل ودعامة: أقواس متكررة
    return '<pattern id="bgpat" width="40" height="34" patternUnits="userSpaceOnUse">'
      + '<path d="M6 30a14 14 0 0 1 28 0" fill="none" stroke="' + c + '" stroke-width="2.2"/>'
      + '<path d="M12 30a8 8 0 0 1 16 0" fill="none" stroke="' + c + '" stroke-width="2.2"/>'
      + '<circle cx="20" cy="30" r="2.4" fill="' + c + '"/>'
      + '</pattern>';
  }
  if (key === 'nutrition') {
    // حبوب وبذور
    return '<pattern id="bgpat" width="34" height="34" patternUnits="userSpaceOnUse">'
      + '<ellipse cx="9" cy="9" rx="5" ry="3.2" fill="' + c + '" transform="rotate(-28 9 9)"/>'
      + '<ellipse cx="25" cy="22" rx="5" ry="3.2" fill="' + c + '" transform="rotate(22 25 22)"/>'
      + '<circle cx="26" cy="7" r="2.4" fill="' + c + '"/><circle cx="8" cy="26" r="2.4" fill="' + c + '"/>'
      + '</pattern>';
  }
  if (key === 'medical') {
    // نبض قلب
    return '<pattern id="bgpat" width="70" height="30" patternUnits="userSpaceOnUse">'
      + '<path d="M0 18h14l4-11 6 22 5-13h9l4 6h28" fill="none" stroke="' + c + '" stroke-width="2.2" '
      +   'stroke-linecap="round" stroke-linejoin="round"/>'
      + '</pattern>';
  }
  if (key === 'psych') {
    // موجات تركيز متحدة المركز
    return '<pattern id="bgpat" width="52" height="52" patternUnits="userSpaceOnUse">'
      + '<circle cx="26" cy="26" r="7" fill="none" stroke="' + c + '" stroke-width="2"/>'
      + '<circle cx="26" cy="26" r="14" fill="none" stroke="' + c + '" stroke-width="1.7"/>'
      + '<circle cx="26" cy="26" r="21" fill="none" stroke="' + c + '" stroke-width="1.4"/>'
      + '</pattern>';
  }
  // progress — أعمدة صاعدة
  return '<pattern id="bgpat" width="36" height="34" patternUnits="userSpaceOnUse">'
    + '<rect x="3" y="20" width="6" height="12" rx="2" fill="' + c + '"/>'
    + '<rect x="14" y="13" width="6" height="19" rx="2" fill="' + c + '"/>'
    + '<rect x="25" y="6" width="6" height="26" rx="2" fill="' + c + '"/>'
    + '</pattern>';
}

/* بيغيّر خلفية الهيرو حسب التخصص النشط */
function setHeroBackdrop(key, color) {
  const layer = document.getElementById('hero-bg');
  if (!layer) return;
  layer.innerHTML = '<svg width="100%" height="100%" aria-hidden="true">'
    + '<defs>' + specBackdrop(key, color) + '</defs>'
    + '<rect width="100%" height="100%" fill="url(#bgpat)"/>'
    + '</svg>';
  layer.classList.remove('hero-bg-in');
  void layer.offsetWidth;
  layer.classList.add('hero-bg-in');
}

function renderHeroBand() {
  const root = document.getElementById('hero-band');
  if (!root) return;

  const W = 600;   // إحداثيات داخلية — الـSVG بيتمدد على عرض الشاشة
  const H = 118;
  const n = BAND_NODES.length;
  const step = W / n;
  const xs = BAND_NODES.map(function (_, i) { return step * (i + 0.5); });
  const yTop = 46;
  const yDip = 64;

  // مسار متموّج بيعدّي على النقط الأربعة
  let d = 'M0 ' + yDip;
  xs.forEach(function (x, i) {
    const prevX = i === 0 ? 0 : xs[i - 1];
    const cx = (prevX + x) / 2;
    d += ' Q' + cx + ' ' + (i % 2 ? yTop - 14 : yDip + 14) + ' ' + x + ' ' + yTop;
  });
  d += ' Q' + ((xs[n - 1] + W) / 2) + ' ' + (yTop - 12) + ' ' + W + ' ' + yDip;

  let svg = '<svg class="hero-band-svg" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" aria-hidden="true">'
    + '<defs><linearGradient id="bandGrad" x1="0" y1="0" x2="1" y2="0">';
  BAND_NODES.forEach(function (node, i) {
    svg += '<stop offset="' + (i / (n - 1)) + '" stop-color="' + node.color + '"/>';
  });
  svg += '</linearGradient></defs>'
    + '<path d="' + d + '" fill="none" stroke="url(#bandGrad)" stroke-width="2.5" opacity="0.5" '
    +   'stroke-linecap="round" stroke-dasharray="7 6"/>'
    + '<path id="band-track" d="' + d + '" fill="none" stroke="none"/>'
    + '<circle r="5" fill="#fff" opacity="0.95">'
    +   '<animateMotion dur="9s" repeatCount="indefinite" path="' + d + '"/>'
    + '</circle>'
    + '</svg>';

  // النقط نفسها HTML عشان النص يفضل مقروء ومايتمططش مع الـSVG
  let nodes = '<div class="hero-band-nodes">';
  BAND_NODES.forEach(function (node) {
    nodes += '<button type="button" class="band-node" data-pillar="' + node.pillar
      + '" data-key="' + node.key + '">'
      +   '<span class="band-dot" style="background:' + node.color + '22;border-color:' + node.color + '66">'
      +     '<svg viewBox="0 0 24 24" fill="' + node.color + '" '
      +       'stroke-linecap="round" stroke-linejoin="round">' + node.art + '</svg>'
      +   '</span>'
      +   '<span class="band-label">' + t(node.labelKey) + '</span>'
      + '</button>';
  });
  nodes += '</div>';

  root.innerHTML = svg + nodes;

  /*
   * أول ما الشريط يتبني، بننوّر المحطة اللي اللوحة واقفة عليها.
   * من غير السطر ده، أول عرض للصفحة بيبقى فيه لوحة ملوّنة ومحطة
   * مطفية — لأن اللوحة بترسم قبل ما الشريط يتبني
   */
  const current = HERO_SLIDES[heroSlideIndex % HERO_SLIDES.length];
  root.querySelectorAll('.band-node').forEach(function (node) {
    node.classList.toggle('band-node-on', node.getAttribute('data-key') === current.key);
  });
  setHeroBackdrop(current.key, current.color);

  // الضغط على أي جزء بيوَدّي على صفحته تحت
  root.querySelectorAll('.band-node').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const pillar = btn.getAttribute('data-pillar');
      const stationKey = btn.getAttribute('data-key');
      // كل محطة ليها شاشتها بالظبط (نفس الترتيب)، فالربط بالمفتاح
      // أدق من الربط بالعمود — التخصصات الطبية بتشترك في نفس العمود
      const slideIndex = BAND_NODES.map(function (s) { return s.key; }).indexOf(stationKey);
      if (slideIndex !== -1) {
        heroSlideIndex = slideIndex;
        renderHeroSlide();
        startHeroRotation();   // بيصفّر المؤقّت فاختيارك مايتغيّرش فورًا
      }
      /*
       * الكاروسيل تحت بيلف لوحده وبيغيّر الصفحة كل 3 ثواني — لو
       * سيبناه، اختيار الزائر كان هيتلغي بعد لحظة. فبنلفّه هو كمان
       * على نفس التخصص، وده بيصفّر مؤقّته
       */
      const orbitTarget = orbitItems.map(function (f) { return f.pillar; }).indexOf(pillar);
      if (orbitTarget !== -1) goToOrbit(orbitTarget);
      else showSpecPage(pillar);
    });
  });
}

function renderHeroSlide() {
  const rowsBox = document.getElementById('hp-rows');
  if (!rowsBox) return;

  const slide = HERO_SLIDES[heroSlideIndex % HERO_SLIDES.length];
  const avatar = document.getElementById('hp-avatar');
  const name = document.getElementById('hp-name');
  const sub = document.getElementById('hp-sub');
  const foot = document.getElementById('hp-foot');
  const fill = document.getElementById('hp-bar-fill');

  if (avatar) { avatar.innerHTML = ''; avatar.appendChild(iconSvg(slide.icon, 'ui-icon')); }
  if (name) name.textContent = t(slide.titleKey);
  if (sub) sub.textContent = t(slide.subKey);
  if (foot) foot.textContent = t(slide.footKey);
  if (fill) {
    fill.style.width = slide.pct + '%';
    fill.style.background = 'linear-gradient(90deg, ' + slide.color + ', ' + slide.color + 'aa)';
  }

  const tag = document.getElementById('hero-live-tag');
  if (tag) {
    tag.textContent = t(slide.tagKey);
    tag.style.color = slide.color;
    tag.style.background = slide.color + '1f';
    tag.style.borderColor = slide.color + '55';
  }

  const phone = document.getElementById('hero2-phone');
  if (phone) {
    phone.style.borderColor = slide.color + '66';
    phone.classList.remove('hero-live-in');
    // إعادة تشغيل الأنيميشن عشان كل تبديل يبان
    void phone.offsetWidth;
    phone.classList.add('hero-live-in');
  }

  // المحطة المقابلة في الشريط بتنوّر مع الشاشة، والخلفية بتتغيّر معاها
  document.querySelectorAll('.band-node').forEach(function (node) {
    node.classList.toggle('band-node-on', node.getAttribute('data-key') === slide.key);
  });
  setHeroBackdrop(slide.key, slide.color);

  rowsBox.innerHTML = '';
  t(slide.rowsKey).split('|').forEach(function (line, index) {
    const row = document.createElement('div');
    row.className = 'hp-row' + (index < 3 ? ' hp-row-done' : '');
    row.style.animationDelay = (index * 0.07) + 's';

    const tick = document.createElement('span');
    tick.className = 'hp-tick';
    tick.innerHTML = '';
  if (index < 3) tick.appendChild(iconSvg('check', 'ui-icon'));
    row.appendChild(tick);

    const label = document.createElement('span');
    label.textContent = line.trim();
    row.appendChild(label);

    rowsBox.appendChild(row);
  });
}

function startHeroRotation() {
  if (heroSlideTimer) clearInterval(heroSlideTimer);
  renderHeroSlide();
  heroSlideTimer = setInterval(function () {
    // بنوقف اللف لو الصفحة مش ظاهرة عشان مانستهلكش من غير داعي
    if (welcomeScreen.classList.contains('hidden')) return;
    heroSlideIndex++;
    renderHeroSlide();
  }, 3200);
}

if (document.getElementById('hero2-start-btn')) {
  document.getElementById('hero2-start-btn').addEventListener('click', function () {
    showScreen(signupScreen);
  });
}

if (document.getElementById('hero2-demo-btn')) {
  document.getElementById('hero2-demo-btn').addEventListener('click', function () {
    const target = document.querySelector('.team-strip');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* الفورمات الطويلة بتتفتح بالضغط بس — كانت بتاخد ١٣٠٠ بكسل من الصفحة */
function wireReveal(buttonId, formId) {
  const button = document.getElementById(buttonId);
  const form = document.getElementById(formId);
  if (!button || !form) return;
  button.addEventListener('click', function () {
    const open = !form.classList.contains('hidden');
    form.classList.toggle('hidden', open);
    button.classList.toggle('reveal-open', !open);
    if (!open) form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

wireReveal('lead-reveal-btn', 'welcome-lead-form');
wireReveal('pa-reveal-btn', 'welcome-provider-apply-form');

/*
 * الزرار الثابت تحت: بيظهر بس لما زرار "ابدأ" اللي في الهيرو يطلع
 * برا الشاشة. كده الزائر دايمًا قدامه زرار واحد مش اتنين فوق بعض.
 */
function updateStickyCta() {
  if (!welcomeStickyCta || welcomeScreen.classList.contains('hidden')) return;
  const heroBtn = document.getElementById('hero2-start-btn');
  if (!heroBtn) return;
  const past = heroBtn.getBoundingClientRect().bottom < 0;
  welcomeStickyCta.classList.toggle('hidden', !past);
}

window.addEventListener('scroll', updateStickyCta, { passive: true });

/*
 * ============ شخصيات الفريق (رسم SVG) ============
 * كل تخصص ليه شخصية مرسومة بلونه: رأس وكتف بسيطين + شارة صغيرة
 * فيها أداة التخصص. رسم مجرّد بالكامل — مش صورة حد ولا بيدّعي كده،
 * والمكتوب تحته اسم الدور مش اسم شخص.
 * كله SVG جوه الصفحة، يعني مفيش أي ملف بيتحمّل من النت.
 */
const TEAM_FIGURES = [
  { key: 'coach',     c1: '#22c55e', c2: '#15803d', labelKey: 'role_coach',     pillar: 'training' },
  { key: 'rehab',     c1: '#f97316', c2: '#c2410c', labelKey: 'role_rehab',     pillar: 'rehab' },
  { key: 'nutrition', c1: '#38bdf8', c2: '#0369a1', labelKey: 'role_nutrition', pillar: 'nutrition' },
  { key: 'doctor',    c1: '#a78bfa', c2: '#6d28d9', labelKey: 'role_doctor',    pillar: 'medical' },
  { key: 'psych',     c1: '#f472b6', c2: '#be185d', labelKey: 'role_psych',     pillar: 'medical' }
];

/*
 * مشهد مرسوم لكل تخصص — بدل شخصية بلا ملامح، كل بطاقة بتوري
 * أدوات الشغل نفسها: دمبل وبرنامج، ركبة بدعامة، طبق بماكروز،
 * سماعة وتقرير، رأس بموجات تركيز. الصورة بتحكي التخصص من غير كلام.
 */
function sceneArt(key, c1, c2) {
  if (key === 'coach') {
    return ''
      + '<rect x="18" y="26" width="46" height="60" rx="7" fill="#0b1220" opacity=".85"/>'
      + '<rect x="25" y="36" width="32" height="4" rx="2" fill="' + c1 + '" opacity=".95"/>'
      + '<rect x="25" y="46" width="24" height="3.5" rx="1.75" fill="#fff" opacity=".32"/>'
      + '<rect x="25" y="55" width="30" height="3.5" rx="1.75" fill="#fff" opacity=".32"/>'
      + '<rect x="25" y="64" width="20" height="3.5" rx="1.75" fill="#fff" opacity=".32"/>'
      + '<g transform="translate(58 52) rotate(-20)">'
      +   '<rect x="0" y="12" width="9" height="22" rx="3.5" fill="' + c1 + '"/>'
      +   '<rect x="37" y="12" width="9" height="22" rx="3.5" fill="' + c1 + '"/>'
      +   '<rect x="7" y="18" width="32" height="10" rx="4" fill="' + c2 + '"/>'
      + '</g>';
  }
  if (key === 'rehab') {
    return ''
      + '<path d="M44 20c7 0 11 5 11 12v14c0 4 3 6 6 8 6 3 9 8 9 15v13" stroke="' + c2 + '" stroke-width="9" fill="none" stroke-linecap="round"/>'
      + '<circle cx="55" cy="54" r="17" fill="' + c1 + '" opacity=".28"/>'
      + '<circle cx="55" cy="54" r="10" fill="' + c1 + '"/>'
      + '<rect x="30" y="44" width="50" height="7" rx="3.5" fill="#0b1220" opacity=".8"/>'
      + '<rect x="30" y="58" width="50" height="7" rx="3.5" fill="#0b1220" opacity=".8"/>'
      + '<path d="M22 86h64" stroke="' + c1 + '" stroke-width="4" stroke-linecap="round" opacity=".5"/>';
  }
  if (key === 'nutrition') {
    return ''
      + '<circle cx="54" cy="54" r="32" fill="#0b1220" opacity=".85"/>'
      + '<circle cx="54" cy="54" r="32" fill="none" stroke="' + c1 + '" stroke-width="3" opacity=".6"/>'
      + '<path d="M54 22a32 32 0 0 1 27.7 48L54 54z" fill="' + c1 + '"/>'
      + '<path d="M81.7 70A32 32 0 0 1 26 68l28-14z" fill="' + c2 + '" opacity=".9"/>'
      + '<circle cx="54" cy="54" r="10" fill="#0b1220"/>'
      + '<rect x="20" y="86" width="68" height="5" rx="2.5" fill="' + c1 + '" opacity=".45"/>';
  }
  if (key === 'doctor') {
    return ''
      + '<rect x="24" y="20" width="48" height="62" rx="7" fill="#0b1220" opacity=".85"/>'
      + '<rect x="32" y="32" width="26" height="4" rx="2" fill="' + c1 + '" opacity=".9"/>'
      + '<path d="M32 52h8l4-9 6 18 4-9h10" stroke="' + c1 + '" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
      + '<rect x="32" y="68" width="30" height="3.5" rx="1.75" fill="#fff" opacity=".3"/>'
      + '<path d="M72 34v14a11 11 0 0 0 22 0V34" stroke="' + c2 + '" stroke-width="4.5" fill="none" stroke-linecap="round"/>'
      + '<circle cx="83" cy="62" r="7" fill="' + c1 + '"/>';
  }
  // psych — رأس بموجات تركيز
  return ''
    + '<path d="M54 22a26 26 0 0 1 26 26c0 9-5 15-9 19-3 3-5 5-5 9v6H42v-6c0-4-2-6-5-9-4-4-9-10-9-19a26 26 0 0 1 26-26z" fill="#0b1220" opacity=".85"/>'
    + '<path d="M54 22a26 26 0 0 1 26 26c0 9-5 15-9 19-3 3-5 5-5 9v6H42v-6c0-4-2-6-5-9-4-4-9-10-9-19a26 26 0 0 1 26-26z" fill="none" stroke="' + c1 + '" stroke-width="3" opacity=".7"/>'
    + '<path d="M40 52c4-7 8 7 12 0s8 7 12 0" stroke="' + c1 + '" stroke-width="3.6" fill="none" stroke-linecap="round"/>'
    + '<rect x="43" y="84" width="22" height="5" rx="2.5" fill="' + c2 + '"/>'
    + '<circle cx="82" cy="34" r="5" fill="' + c1 + '" opacity=".8"/>'
    + '<circle cx="92" cy="22" r="3" fill="' + c1 + '" opacity=".5"/>';
}

/*
 * البطاقة: لو المتخصص عنده صورة حقيقية بتتعرض هي، وغير كده بيتعرض
 * المشهد المرسوم. يعني أول ما فريقك يرفع صوره، الكاروسيل بيبقى
 * فريقك الحقيقي بدل الرسم من غير ما نغيّر أي حاجة.
 */
function teamFigureSvg(figure) {
  const id = 'tf-' + figure.key;

  if (figure.photo) {
    return ''
      + '<svg class="team-fig-svg" viewBox="0 0 108 108" role="img" aria-hidden="true">'
      +   '<defs>'
      +     '<clipPath id="clip-' + id + '"><rect x="4" y="4" width="100" height="100" rx="26"/></clipPath>'
      +     '<linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">'
      +       '<stop offset="0" stop-color="' + figure.c1 + '"/><stop offset="1" stop-color="' + figure.c2 + '"/>'
      +     '</linearGradient>'
      +   '</defs>'
      +   '<image href="' + figure.photo + '" x="4" y="4" width="100" height="100" '
      +     'preserveAspectRatio="xMidYMid slice" clip-path="url(#clip-' + id + ')"/>'
      +   '<rect x="4" y="4" width="100" height="100" rx="26" fill="none" '
      +     'stroke="url(#' + id + ')" stroke-width="3"/>'
      + '</svg>';
  }

  return ''
    + '<svg class="team-fig-svg" viewBox="0 0 108 108" role="img" aria-hidden="true">'
    +   '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">'
    +     '<stop offset="0" stop-color="' + figure.c1 + '"/>'
    +     '<stop offset="1" stop-color="' + figure.c2 + '"/>'
    +   '</linearGradient></defs>'
    +   '<rect x="4" y="4" width="100" height="100" rx="26" fill="url(#' + id + ')" opacity="0.14"/>'
    +   '<rect x="4" y="4" width="100" height="100" rx="26" fill="none" '
    +     'stroke="url(#' + id + ')" stroke-width="2.5" opacity="0.6"/>'
    +   '<g transform="translate(0 2)">' + sceneArt(figure.key, figure.c1, figure.c2) + '</g>'
    + '</svg>';
}

/*
 * ============ الكاروسيل الدائري ============
 * الشخصيات الخمسة بتتوزّع على دايرة بيضاوية وبتلف لوحدها كل 3 ثواني.
 * اللي قدام بتكبر ويظهر وراها كشاف بلونها، وتحتها سطر واحد بيقول
 * التخصص ده بيعمل إيه. الباقي بيصغر ويبهت في الخلفية.
 * الضغط على أي واحدة بيلفّها لقدام، والضغط تاني بيوَدّي على شغلها.
 * ولو الزائر مفعّل "تقليل الحركة" في نظامه، اللف بيقف ويختار بإيده.
 */
const ORBIT_RX = 124;   // نص عرض الدايرة
const ORBIT_RY = 32;    // نص ارتفاعها — بيضاوية عشان تدّي إحساس عمق
let orbitIndex = 0;
let orbitTimer = null;

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (error) {
    return false;
  }
}

function orbitFrontIndex() {
  const n = orbitItems.length;
  return ((orbitIndex % n) + n) % n;
}

function layoutOrbit() {
  const stage = document.getElementById('orbit-stage');
  if (!stage) return;

  const count = orbitItems.length;
  const step = (2 * Math.PI) / count;
  const front = orbitFrontIndex();

  stage.querySelectorAll('.orbit-fig').forEach(function (cell, i) {
    const angle = (i - orbitIndex) * step + Math.PI / 2;
    const x = Math.cos(angle) * ORBIT_RX;
    const y = Math.sin(angle) * ORBIT_RY;
    // كل ما العنصر يقرب من قدام كل ما كبر ووضح
    const depth = (Math.sin(angle) + 1) / 2;
    /*
     * اللي ورا بيصغر ويبهت ويتعمّي شوية — التعمية (blur) هي اللي
     * بتدي الإحساس إنه بعيد فعلاً بدل ما يبان مزاحم على اللي قدام
     */
    const scale = 0.4 + depth * 0.72;
    const blur = (1 - depth) * 2.4;

    cell.style.transform = 'translate(-50%, -50%) translate(' + x + 'px, ' + y + 'px) scale(' + scale + ')';
    cell.style.opacity = String(0.22 + depth * 0.78);
    cell.style.filter = blur > 0.15 ? 'blur(' + blur.toFixed(2) + 'px)' : 'none';
    cell.style.zIndex = String(Math.round(depth * 100));
    cell.classList.toggle('orbit-front', i === front);
  });

  const figure = orbitItems[front];

  const glow = document.getElementById('orbit-glow');
  if (glow) {
    glow.style.background = 'radial-gradient(circle, ' + figure.c1 + '55 0%, '
      + figure.c1 + '18 45%, transparent 72%)';
  }

  if (figure.pillar) showSpecPage(figure.pillar);

  const role = document.getElementById('orbit-role');
  const line = document.getElementById('orbit-line');
  if (role) {
    role.textContent = figure.name || t(figure.labelKey);
    role.style.color = figure.c1;
  }
  if (line) {
    line.textContent = figure.name
      ? (figure.roleText + (figure.line ? ' · ' + figure.line : ''))
      : (figure.line || t(figure.key + '_does'));
  }

  const dots = document.getElementById('orbit-dots');
  if (dots) {
    dots.querySelectorAll('.orbit-dot').forEach(function (dot, i) {
      const active = i === front;
      dot.classList.toggle('active', active);
      dot.style.background = active ? orbitItems[i].c1 : '';
    });
  }
}

function restartOrbitTimer() {
  if (orbitTimer) clearInterval(orbitTimer);
  if (prefersReducedMotion()) return;
  orbitTimer = setInterval(function () {
    // بتقف وهي برا الشاشة عشان ماتستهلكش من غير داعي
    if (welcomeScreen.classList.contains('hidden')) return;
    orbitIndex++;
    layoutOrbit();
  }, 3000);
}

function goToOrbit(index) {
  orbitIndex = index;
  layoutOrbit();
  restartOrbitTimer();
}

/*
 * الكاروسيل بيعرض فريقك الحقيقي أول ما يبقى فيه متخصصين — بصورهم
 * وأسمائهم وتخصصاتهم. لحد ما ده يحصل، بيعرض المشاهد المرسومة
 * كتعبير عن التخصصات. يعني نفس المكان بيترقّى لوحده.
 */
const SPEC_COLORS = {
  coach:           { c1: '#22c55e', c2: '#15803d', scene: 'coach' },
  rehab:           { c1: '#f97316', c2: '#c2410c', scene: 'rehab' },
  physio:          { c1: '#fb923c', c2: '#9a3412', scene: 'rehab' },
  nutritionist:    { c1: '#38bdf8', c2: '#0369a1', scene: 'nutrition' },
  ortho:           { c1: '#a78bfa', c2: '#6d28d9', scene: 'doctor' },
  sports_medicine: { c1: '#818cf8', c2: '#4338ca', scene: 'doctor' },
  radiology:       { c1: '#c084fc', c2: '#7e22ce', scene: 'doctor' },
  pharmacist:      { c1: '#2dd4bf', c2: '#0f766e', scene: 'doctor' },
  massage:         { c1: '#fbbf24', c2: '#b45309', scene: 'rehab' },
  psychologist:    { c1: '#f472b6', c2: '#be185d', scene: 'psych' }
};

let orbitItems = TEAM_FIGURES.slice();

/* بيحوّل متخصص حقيقي لبطاقة في الكاروسيل */
function providerToOrbitItem(provider) {
  const specs = providerSpecialties(provider);
  const main = specs[0] || 'coach';
  const colors = SPEC_COLORS[main] || SPEC_COLORS.coach;
  const stats = (typeof ratingStatsFor === 'function') ? ratingStatsFor(provider.email) : { avg: 0, count: 0 };
  return {
    key: colors.scene,
    c1: colors.c1,
    c2: colors.c2,
    photo: provider.photo || '',
    name: provider.name,
    roleText: specialtyListName(specs),
    line: stats.count
      ? fill('orbit_rating_line', { avg: stats.avg.toFixed(1), n: stats.count })
      : t(colors.scene + '_does'),
    pillar: specs.indexOf('nutritionist') !== -1 ? 'nutrition'
          : (specialtiesHaveFlag(specs, 'medical') ? 'medical'
          : (specs.indexOf('rehab') !== -1 ? 'rehab' : 'training'))
  };
}

const ORBIT_REAL_TEAM_MIN = 10;

function setOrbitToProviders(providers) {
  /*
   * الرسم بيفضل هو المعروض لحد ما يبقى فيه 10 متخصصين أو أكتر.
   * قبل كده، خمس مشاهد بتغطي كل التخصصات أصدق من عرض متخصص
   * أو اتنين وكأنهم "الفريق الكامل".
   */
  if (!providers || providers.length < ORBIT_REAL_TEAM_MIN) return false;
  orbitItems = providers.slice(0, 8).map(providerToOrbitItem);
  orbitIndex = 0;
  renderTeamStrip();
  return true;
}

function renderTeamStrip() {
  const stage = document.getElementById('orbit-stage');
  const dots = document.getElementById('orbit-dots');
  if (!stage) return;

  stage.innerHTML = '';
  if (dots) dots.innerHTML = '';

  orbitItems.forEach(function (figure, index) {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'orbit-fig';
    cell.innerHTML = teamFigureSvg(figure);
    cell.setAttribute('aria-label', figure.name || t(figure.labelKey));

    cell.addEventListener('click', function () {
      // الصفحة اللي تحت بتتقلب على التخصص ده فورًا — من غير سكرول،
      // لأنها ظاهرة تحته على طول
      goToOrbit(index);
    });

    stage.appendChild(cell);

    if (dots) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'orbit-dot';
      dot.setAttribute('aria-label', figure.name || t(figure.labelKey));
      dot.addEventListener('click', function () { goToOrbit(index); });
      dots.appendChild(dot);
    }
  });

  layoutOrbit();
  restartOrbitTimer();
}


renderTeamStrip();

/*
 * ============ ظهور متدرّج وقت التمرير ============
 * العناصر بتطلع واحدة ورا التانية أول ما توصل للشاشة بدل ما تكون
 * كلها ظاهرة من الأول. بيدّي إحساس إن الصفحة حيّة من غير أي كلام
 * زيادة. ولو الزائر مقفّل الحركة في نظامه، كل حاجة بتظهر عادي.
 */
function setupReveal() {
  const targets = document.querySelectorAll(
    '.welcome-audience-card, .welcome-faq-item, .welcome-step'
  );
  if (!targets.length) return;

  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    targets.forEach(function (el) { el.classList.add('revealed'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const order = el.parentElement
        ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.transitionDelay = Math.min(order, 5) * 0.08 + 's';
      el.classList.add('revealed');
      observer.unobserve(el);
    });
  }, { threshold: 0.15 });

  targets.forEach(function (el) {
    el.classList.add('reveal-me');
    observer.observe(el);
  });
}

setupReveal();

renderHeroBand();
startHeroRotation();

document.getElementById('login-back-welcome-btn').addEventListener('click', function () {
  showScreen(welcomeScreen);
});

document.getElementById('signup-back-welcome-btn').addEventListener('click', function () {
  showScreen(welcomeScreen);
});

document.getElementById('signup-btn').addEventListener('click', async function () {
  const emailInput = document.getElementById('signup-email');
  const passwordInput = document.getElementById('signup-password');
  const password2Input = document.getElementById('signup-password2');

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  const password2 = password2Input.value;

  if (!email || !password) {
    signupMessage.textContent = t('need_signup_fields');
    return;
  }
  if (password !== password2) {
    signupMessage.textContent = t('passwords_mismatch');
    return;
  }

  signupMessage.textContent = t('creating_account');
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    emailInput.value = '';
    passwordInput.value = '';
    password2Input.value = '';
    signupMessage.textContent = '';
    // onAuthStateChanged هيتكفل بعد كده بتحويله لشاشة البيانات
  } catch (error) {
    if (error.code === 'auth/weak-password') {
      signupMessage.textContent = t('weak_password');
    } else if (error.code === 'auth/email-already-in-use') {
      signupMessage.textContent = t('email_in_use');
    } else {
      signupMessage.textContent = t('problem') + error.message;
    }
  }
});

/* ============================ بيانات العميل الأولى ============================ */

const CHECK_ICON = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 9 17 20 6"></polyline></svg>';

function renderChoiceRows(container, keys, iconMap, labelFn, currentValue, onPick) {
  if (!container) return;
  container.innerHTML = '';
  keys.forEach(function (key) {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'choice-row' + (currentValue === key ? ' selected' : '');
    row.setAttribute('data-key', key);

    const icon = document.createElement('span');
    icon.className = 'choice-icon';
    // الخرايط القديمة بتحط SVG جاهز، والجديدة بتحط اسم أيقونة من UI_ICONS
    const art = iconMap[key];
    if (typeof art === 'string' && art.charAt(0) === '<') icon.innerHTML = art;
    else if (UI_ICONS[art]) icon.appendChild(iconSvg(art, 'ui-icon'));
    else icon.textContent = art;
    row.appendChild(icon);

    const label = document.createElement('span');
    label.className = 'choice-label';
    label.textContent = labelFn(key);
    row.appendChild(label);

    const check = document.createElement('span');
    check.className = 'choice-check';
    check.innerHTML = CHECK_ICON;
    row.appendChild(check);

    row.addEventListener('click', function () {
      onPick(key);
    });
    container.appendChild(row);
  });
}

/* دائرة اختيار — بنفس فكرة دائرة أيام الأسبوع: حلقة من أيقونات دائرية
   تلف عشان اللي مختاره يبقى فوق، ومنتصف الدائرة بيعرض اسم المختار كامل */
function renderChoiceDial(ringId, centerId, keys, iconMap, labelFn, currentValue, placeholder, onPick, radiusOverride) {
  const ring = document.getElementById(ringId);
  const center = document.getElementById(centerId);
  if (!ring || !center) return;

  const n = keys.length;
  const step = 360 / n;
  const selectedIndex = Math.max(0, keys.indexOf(currentValue));
  const ringRotation = -selectedIndex * step;
  const radius = radiusOverride || dialRadius();

  ring.innerHTML = '';
  ring.style.transform = 'rotate(' + ringRotation + 'deg)';

  keys.forEach(function (key, index) {
    const angle = index * step;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'dial-day';
    if (key === currentValue) button.classList.add('active');
    button.style.transform = 'rotate(' + angle + 'deg) translateY(-' + radius + 'px)';

    const iconSpan = document.createElement('span');
    iconSpan.innerHTML = iconMap[key];
    iconSpan.style.transform = 'rotate(' + (-(angle + ringRotation)) + 'deg)';
    button.appendChild(iconSpan);

    button.addEventListener('click', function () {
      onPick(key);
    });

    ring.appendChild(button);
  });

  if (currentValue) {
    center.innerHTML = '<span class="dial-center-icon">' + iconMap[currentValue] + '</span><span class="dc-day">' + labelFn(currentValue) + '</span>';
  } else {
    center.innerHTML = '<span class="dc-sub">' + placeholder + '</span>';
  }
}

const GENDER_KEYS = ['male', 'female'];

const GENDER_ICONS = {
  male: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="14" r="6"></circle><line x1="14.5" y1="9.5" x2="20" y2="4"></line><polyline points="14 4 20 4 20 10"></polyline></svg>',
  female: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"></circle><line x1="12" y1="15" x2="12" y2="21"></line><line x1="9" y1="18" x2="15" y2="18"></line></svg>'
};

function genderName(key) {
  return t('gender_' + key);
}

function renderGenderRows() {
  renderChoiceRows(obGenderRows, GENDER_KEYS, GENDER_ICONS, genderName, obGender.value, function (key) {
    obGender.value = key;
    renderGenderRows();
    /*
     * أهم سطرين هنا: لما يغيّر النوع، حاجات الإناث لازم تختفي
     * أو تظهر في نفس اللحظة. من غيرهم كان الراجل بيفضل شايف
     * سؤال الحمل لحد ما حاجة تانية تصادف تعيد الرسم
     */
    renderPregnancyBox();
    renderHealthChips();
    updateObProgress();
  });
}

function fillGenderSelect() {
  const keep = obGender.value;
  obGender.innerHTML = '';
  const none = document.createElement('option');
  none.value = '';
  none.textContent = t('pick_gender');
  obGender.appendChild(none);
  GENDER_KEYS.forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = genderName(key);
    obGender.appendChild(option);
  });
  obGender.value = keep;
}

/* ---------- طبيعة الشغل، أيام التمرين، عدد الوجبات — لمرونة الجدول ---------- */

const WORK_NATURE_KEYS = ['desk', 'physical', 'shift', 'student', 'other'];

const WORK_NATURE_ICONS = {
  desk: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="12" rx="2"></rect><path d="M8 7V5.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2V7"></path><line x1="3" y1="13" x2="21" y2="13"></line></svg>',
  physical: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5l4 4"></path><path d="M13 7l-7.5 7.5a1.8 1.8 0 0 0 0 2.5v0a1.8 1.8 0 0 0 2.5 0L15.5 9.5"></path><path d="M16.5 4.5l3 3"></path><line x1="4" y1="20" x2="7" y2="17"></line></svg>',
  shift: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"></circle><path d="M12 7v5l3.5 2"></path></svg>',
  student: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8.5L12 4l9.5 4.5L12 13z"></path><path d="M6 10.5v4.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5"></path></svg>',
  other: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="12" r="1.4"></circle><circle cx="12" cy="12" r="1.4"></circle><circle cx="18.5" cy="12" r="1.4"></circle></svg>'
};

function workNatureName(key) {
  return t('work_nature_' + key);
}

function renderWorkNatureRows() {
  renderChoiceRows(obWorkNatureRows, WORK_NATURE_KEYS, WORK_NATURE_ICONS, workNatureName, obWorkNature.value, function (key) {
    obWorkNature.value = key;
    renderWorkNatureRows();
  });
}

function fillWorkNatureSelect() {
  const keep = obWorkNature.value;
  obWorkNature.innerHTML = '';
  const none = document.createElement('option');
  none.value = '';
  none.textContent = t('pick_work_nature');
  obWorkNature.appendChild(none);
  WORK_NATURE_KEYS.forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = workNatureName(key);
    obWorkNature.appendChild(option);
  });
  obWorkNature.value = keep;
}

/*
 * من يوم واحد لسبعة: في ناس مش قادرة غير يوم، وفي ناس بتتمرن كل يوم.
 * ومن وجبة واحدة: اللي بيعمل صيام متقطع ممكن ياكل وجبة أو اتنين بس
 */
const TRAINING_DAYS_KEYS = ['1', '2', '3', '4', '5', '6', '7'];
const MEALS_PER_DAY_KEYS = ['1', '2', '3', '4', '5', '6'];

function numChoiceIcon(value) {
  return '<span class="choice-num">' + value + '</span>';
}

const TRAINING_DAYS_ICONS = TRAINING_DAYS_KEYS.reduce(function (map, key) {
  map[key] = numChoiceIcon(key);
  return map;
}, {});

const MEALS_PER_DAY_ICONS = MEALS_PER_DAY_KEYS.reduce(function (map, key) {
  map[key] = numChoiceIcon(key);
  return map;
}, {});

/*
 * شكل النوم مش عدد ساعاته بس. النوم المتقطع (أب بيصحى لعياله،
 * ورديات، أرق) معناه استشفاء أقل — والبرنامج المفروض يتبني على كده
 */
const SLEEP_QUALITY_KEYS = ['solid', 'broken', 'short', 'shifts'];

const SLEEP_QUALITY_ICONS = {
  solid:  'sleep_solid',
  broken: 'sleep_broken',
  short:  'sleep_short',
  shifts: 'sleep_shifts'
};

/*
 * عدد ساعات النوم وعدد مرّاته. مهم إن الاتنين منفصلين: ٧ ساعات
 * على مرة واحدة غير ٧ ساعات على تلات مرات — الاستشفاء مختلف،
 * والناس اللي بتشتغل ورديات أو بتاخد قيلولة بعد الضهر كتير
 */
const SLEEP_HOURS_KEYS = ['lt5', '5_6', '6_7', '7_8', '8_9', 'gt9'];
const SLEEP_BLOCKS_KEYS = ['1', '2', '3plus'];

function sleepHoursName(key) { return t('sleep_h_' + key); }
function sleepBlocksName(key) { return t('sleep_b_' + key); }

function renderSleepHoursRows() {
  if (!obSleepHoursRows) return;
  const icons = {};
  SLEEP_HOURS_KEYS.forEach(function (k) { icons[k] = 'sleep_short'; });
  renderChoiceRows(obSleepHoursRows, SLEEP_HOURS_KEYS, icons, sleepHoursName, obSleepHours.value, function (key) {
    obSleepHours.value = key;
    renderSleepHoursRows();
    updateObProgress();
  });
}

function renderSleepBlocksRows() {
  if (!obSleepBlocksRows) return;
  const icons = { '1': 'sleep_solid', '2': 'sleep_broken', '3plus': 'sleep_shifts' };
  renderChoiceRows(obSleepBlocksRows, SLEEP_BLOCKS_KEYS, icons, sleepBlocksName, obSleepBlocks.value, function (key) {
    obSleepBlocks.value = key;
    renderSleepBlocksRows();
    updateObProgress();
  });
}

function fillSleepExtraSelects() {
  [[obSleepHours, SLEEP_HOURS_KEYS, sleepHoursName], [obSleepBlocks, SLEEP_BLOCKS_KEYS, sleepBlocksName]]
    .forEach(function (row) {
      const el = row[0];
      if (!el) return;
      const keep = el.value;
      el.innerHTML = '';
      row[1].forEach(function (key) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = row[2](key);
        el.appendChild(option);
      });
      el.value = keep;
    });
  renderSleepHoursRows();
  renderSleepBlocksRows();
}

function sleepQualityName(key) {
  return t('sleep_q_' + key);
}

function renderSleepQualityRows() {
  if (!obSleepQualityRows) return;
  renderChoiceRows(obSleepQualityRows, SLEEP_QUALITY_KEYS, SLEEP_QUALITY_ICONS, sleepQualityName, obSleepQuality.value, function (key) {
    obSleepQuality.value = key;
    renderSleepQualityRows();
    updateObProgress();
  });
}

function fillSleepQualitySelect() {
  if (!obSleepQuality) return;
  const keep = obSleepQuality.value;
  obSleepQuality.innerHTML = '';
  SLEEP_QUALITY_KEYS.forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = sleepQualityName(key);
    obSleepQuality.appendChild(option);
  });
  obSleepQuality.value = keep;
  renderSleepQualityRows();
}

/* العربي بيفرّق بين الواحد والاتنين والجمع — "1 أيام" شكلها غلط */
function trainingDaysName(key) {
  if (key === '1') return t('training_days_one');
  if (key === '2') return t('training_days_two');
  return fill('training_days_count', { n: key });
}

function mealsPerDayName(key) {
  if (key === '1') return t('meals_per_day_one');
  if (key === '2') return t('meals_per_day_two');
  return fill('meals_per_day_count', { n: key });
}

function renderTrainingDaysRows() {
  renderChoiceRows(obTrainingDaysRows, TRAINING_DAYS_KEYS, TRAINING_DAYS_ICONS, trainingDaysName, obTrainingDays.value, function (key) {
    obTrainingDays.value = key;
    renderTrainingDaysRows();
  });
}

function fillTrainingDaysSelect() {
  const keep = obTrainingDays.value;
  obTrainingDays.innerHTML = '';
  const none = document.createElement('option');
  none.value = '';
  none.textContent = t('pick_training_days');
  obTrainingDays.appendChild(none);
  TRAINING_DAYS_KEYS.forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = trainingDaysName(key);
    obTrainingDays.appendChild(option);
  });
  obTrainingDays.value = keep;
}

function renderMealsPerDayRows() {
  renderChoiceRows(obMealsPerDayRows, MEALS_PER_DAY_KEYS, MEALS_PER_DAY_ICONS, mealsPerDayName, obMealsPerDay.value, function (key) {
    obMealsPerDay.value = key;
    renderMealsPerDayRows();
  });
}

function fillMealsPerDaySelect() {
  const keep = obMealsPerDay.value;
  obMealsPerDay.innerHTML = '';
  const none = document.createElement('option');
  none.value = '';
  none.textContent = t('pick_meals_per_day');
  obMealsPerDay.appendChild(none);
  MEALS_PER_DAY_KEYS.forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = mealsPerDayName(key);
    obMealsPerDay.appendChild(option);
  });
  obMealsPerDay.value = keep;
}

const MONTH_NAMES = {
  ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

function fillDobSelects() {
  const keepDay = obDobDay.value;
  const keepMonth = obDobMonth.value;
  const keepYear = obDobYear.value;

  obDobDay.innerHTML = '';
  const dayNone = document.createElement('option');
  dayNone.value = '';
  dayNone.textContent = t('dob_day');
  obDobDay.appendChild(dayNone);
  for (let day = 1; day <= 31; day++) {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day;
    obDobDay.appendChild(option);
  }
  obDobDay.value = keepDay;

  obDobMonth.innerHTML = '';
  const monthNone = document.createElement('option');
  monthNone.value = '';
  monthNone.textContent = t('dob_month');
  obDobMonth.appendChild(monthNone);
  MONTH_NAMES[lang].forEach(function (name, index) {
    const option = document.createElement('option');
    option.value = index + 1;
    option.textContent = name;
    obDobMonth.appendChild(option);
  });
  obDobMonth.value = keepMonth;

  obDobYear.innerHTML = '';
  const yearNone = document.createElement('option');
  yearNone.value = '';
  yearNone.textContent = t('dob_year');
  obDobYear.appendChild(yearNone);
  const nowYear = new Date().getFullYear();
  for (let year = nowYear - 10; year >= nowYear - 90; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    obDobYear.appendChild(option);
  }
  obDobYear.value = keepYear;
}

/* السن بالسنين من تاريخ الميلاد — بيراعي لو عيد ميلاده لسه ما جاش السنة دي */
function calcAge(day, month, year) {
  if (!day || !month || !year) return 0;
  const today = new Date();
  let age = today.getFullYear() - year;
  const hadBirthdayThisYear = (today.getMonth() + 1 > month) || ((today.getMonth() + 1 === month) && today.getDate() >= day);
  if (!hadBirthdayThisYear) age -= 1;
  return age;
}

const ACTIVITY_LEVELS = ['sedentary', 'light', 'moderate', 'active', 'very_active'];

const ACTIVITY_ICONS = {
  sedentary: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"></path><rect x="3" y="11" width="18" height="6" rx="2"></rect><line x1="5" y1="17" x2="5" y2="20"></line><line x1="19" y1="17" x2="19" y2="20"></line></svg>',
  light: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="4.5" r="1.8"></circle><path d="M12 7 L9.5 12.5 L12.5 14.5 L11 20"></path><path d="M12.5 14.5 L16 17.5"></path><path d="M9.5 12.5 L6 14.5"></path></svg>',
  moderate: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="15" cy="4.5" r="1.8"></circle><path d="M13 7 L8 10 L11 13 L9 20"></path><path d="M11 13 L16 15 L18 12"></path><path d="M8 10 L4 12"></path></svg>',
  active: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="1.2" y="9.5" width="3" height="5" rx="1"></rect><rect x="19.8" y="9.5" width="3" height="5" rx="1"></rect><rect x="4.5" y="7.5" width="2.5" height="9" rx="1"></rect><rect x="17" y="7.5" width="2.5" height="9" rx="1"></rect><line x1="7" y1="12" x2="17" y2="12"></line></svg>',
  very_active: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5c1.2 3-2.6 4.2-2.6 7.8a2.8 2.8 0 0 0 5.6 0c0-.9-.6-1.7-.6-2.6 1.8 1 2.8 2.8 2.8 4.6a4.8 4.8 0 0 1-9.6 0c0-3.8 2.8-5.8 4.4-9.8z"></path></svg>'
};

function activityName(key) {
  return t('act_' + key);
}

function renderActivityTiles() {
  renderChoiceDial('activity-ring', 'activity-center', ACTIVITY_LEVELS, ACTIVITY_ICONS, activityName, obActivity.value, t('pick_activity'), function (key) {
    obActivity.value = key;
    renderActivityTiles();
  });
}

function fillActivitySelect() {
  const keep = obActivity.value;
  obActivity.innerHTML = '';

  const none = document.createElement('option');
  none.value = '';
  none.textContent = t('pick_activity');
  obActivity.appendChild(none);

  ACTIVITY_LEVELS.forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = activityName(key);
    obActivity.appendChild(option);
  });

  obActivity.value = keep;
}

const GOAL_KEYS = ['lose_weight', 'build_muscle', 'general_fitness', 'performance', 'rehab_recovery'];

const GOAL_ICONS = {
  lose_weight: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l6 6 4-4 8 8"></path><path d="M15 16h6v-6"></path></svg>',
  build_muscle: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16c0-3 1.5-5 4-6"></path><path d="M8 10c0-2.5 2-4.5 4.5-4.5S17 7.5 17 10c0 1-.3 1.9-.9 2.6"></path><circle cx="17.5" cy="13" r="2.3"></circle></svg>',
  general_fitness: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-9-8.3C1.4 8.4 2.7 5 6 4.6c2-.3 3.6.8 4.3 2.2.7-1.4 2.3-2.5 4.3-2.2 3.3.4 4.6 3.8 3 7.1C19 15.6 12 20 12 20z"></path></svg>',
  performance: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v4a5 5 0 0 1-10 0V4z"></path><path d="M5 5H3.2v1.8a3.8 3.8 0 0 0 3.8 3.8"></path><path d="M19 5h1.8v1.8A3.8 3.8 0 0 1 17 10.6"></path><line x1="12" y1="13" x2="12" y2="17"></line><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="17" x2="12" y2="20"></line></svg>',
  rehab_recovery: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
};

function goalName(key) {
  return t('goal_' + key);
}

function renderGoalTiles() {
  /*
   * الدايرة بتوري الهدف الأساسي، والشرايح تحتها بتوري الباقي.
   * الدوس على هدف بيضيفه أو يشيله
   */
  renderChoiceDial('goal-ring', 'goal-center', GOAL_KEYS, GOAL_ICONS, goalName,
    obGoals[0] || '', t('pick_goal'), function (key) {
      toggleInList(obGoals, key);
      obGoal.value = obGoals[0] || '';
      renderGoalTiles();
      renderChosenGoals();
      updateObProgress();
    });
  renderChosenGoals();
}

function renderChosenGoals() {
  const box = document.getElementById('ob-chosen-goals');
  if (!box) return;
  box.innerHTML = '';
  box.classList.toggle('hidden', obGoals.length < 2);
  if (obGoals.length < 2) return;
  const note = document.createElement('span');
  note.className = 'chosen-note';
  note.textContent = t('goals_extra');
  box.appendChild(note);
  obGoals.slice(1).forEach(function (key) {
    const chip = document.createElement('span');
    chip.className = 'chosen-chip static';
    chip.textContent = goalName(key);
    box.appendChild(chip);
  });
}

function fillGoalSelect() {
  const keep = obGoal.value;
  obGoal.innerHTML = '';

  const none = document.createElement('option');
  none.value = '';
  none.textContent = t('pick_goal');
  obGoal.appendChild(none);

  GOAL_KEYS.forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = goalName(key);
    obGoal.appendChild(option);
  });

  obGoal.value = keep;
}

const SPORT_GROUP_KEYS = Object.keys(SPORT_GROUPS);
let selectedSportGroup = '';

function sportGroupIconMap() {
  const map = {};
  SPORT_GROUP_KEYS.forEach(function (key) { map[key] = sportGroupIconSvg(key); });
  return map;
}

function renderSportGroupDial() {
  renderChoiceDial('sport-group-ring', 'sport-group-center', SPORT_GROUP_KEYS, sportGroupIconMap(), sportGroupName, selectedSportGroup, t('pick_sport_group'), function (key) {
    if (selectedSportGroup !== key) {
      selectedSportGroup = key;
      obSport.value = '';
    }
    renderSportGroupDial();
    renderSportRows();
  }, dialRadius() + 14);
}

function renderSportRows() {
  if (!selectedSportGroup) {
    obSportRows.classList.add('hidden');
    obSportRowsLabel.classList.add('hidden');
    obSportRows.innerHTML = '';
    return;
  }
  obSportRows.classList.remove('hidden');
  obSportRowsLabel.classList.remove('hidden');
  const sportsInGroup = SPORTS.filter(function (s) { return s.group === selectedSportGroup; }).map(function (s) { return s.id; });
  const icon = sportGroupIconSvg(selectedSportGroup);
  const iconMap = {};
  sportsInGroup.forEach(function (id) { iconMap[id] = icon; });
  renderMultiRows(obSportRows, sportsInGroup, iconMap, sportName, obSports, function (key) {
    toggleInList(obSports, key);
    obSport.value = obSports[0] || '';
    renderSportRows();
    renderChosenSports();
    renderScheduleRows();
    updateObProgress();
  });
}

/* ============================================================
   جدول الأسبوع: أنهي رياضة في أنهي يوم وإمتى
   المدرب مش بيكتب برنامج في الفراغ — لو عارف إن العميل عنده كورة
   الأحد ٦ مساءً، مش هيحطله رجل تقيلة السبت. الجدول ده هو اللي
   بيخلي البرنامج يمشي مع حياة العميل مش العكس
   ============================================================ */

/* كل حصص اليوم في الجدول بالترتيب اللي العميل ضافها بيه */
function scheduleFor(dayIndex) {
  return obSchedule.filter(function (r) { return r.day === dayIndex; });
}

/* بنعيد كتابة حصص يوم واحد كلها مرة واحدة: [{ sport, time }] */
function setDaySchedule(dayIndex, sessions) {
  const others = obSchedule.filter(function (r) { return r.day !== dayIndex; });
  const mine = sessions.filter(function (r) { return r.sport; }).slice(0, MAX_DAY_SESSIONS)
    .map(function (r) { return { day: dayIndex, sport: r.sport, time: r.time || '' }; });
  obSchedule = others.concat(mine);
  obSchedule.sort(function (a, b) { return a.day - b.day; });
}

function renderScheduleRows() {
  const block = document.getElementById('ob-sched-block');
  const rows = document.getElementById('ob-sched-rows');
  if (!block || !rows) return;

  // مفيش رياضة مختارة = مفيش جدول
  block.classList.toggle('hidden', !obSports.length);
  if (!obSports.length) { obSchedule = obSchedule.filter(function (r) { return r.sport === 'gym'; }); return; }

  rows.innerHTML = '';
  const dayNames = days();
  // "جيم" دايمًا موجود — عشان اللي بيلعب سباحة ويروح الجيم كمان
  const options = obSports.indexOf('gym') === -1 ? obSports.concat(['gym']) : obSports.slice();

  for (let i = 0; i < 7; i++) {
    const sessions = scheduleFor(i).map(function (r) { return { sport: r.sport, time: r.time }; });
    // يوم فاضي بيظهر بصف واحد "— مفيش —"
    const shown = sessions.length ? sessions : [{ sport: '', time: '' }];

    const dayBox = document.createElement('div');
    dayBox.className = 'sched-day-box' + (sessions.length > 1 ? ' multi' : '');
    dayBox.dataset.day = String(i);

    shown.forEach(function (session, index) {
      const row = document.createElement('div');
      row.className = 'sched-row' + (session.sport ? ' on' : '') + (index ? ' extra' : '');

      const name = document.createElement('span');
      name.className = 'sched-day';
      name.textContent = index ? fill('sched_session_n', { n: index + 1 }) : dayNames[i];
      row.appendChild(name);

      const pick = document.createElement('select');
      pick.className = 'sched-sport';
      const none = document.createElement('option');
      none.value = '';
      none.textContent = t('sched_rest');
      pick.appendChild(none);
      options.forEach(function (key) {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = sportName(key);
        pick.appendChild(opt);
      });
      pick.value = session.sport || '';
      row.appendChild(pick);

      const time = document.createElement('input');
      time.type = 'time';
      time.className = 'sched-time';
      time.value = session.time || '';
      time.disabled = !session.sport;
      row.appendChild(time);

      pick.addEventListener('change', function () {
        // "مفيش" على حصة زيادة = امسحها
        shown[index] = { sport: pick.value, time: time.value };
        setDaySchedule(i, shown);
        renderScheduleRows();
        updateObProgress();
      });
      time.addEventListener('change', function () {
        shown[index] = { sport: pick.value, time: time.value };
        setDaySchedule(i, shown);
      });

      dayBox.appendChild(row);
    });

    if (sessions.length && sessions.length < MAX_DAY_SESSIONS) {
      const add = document.createElement('button');
      add.type = 'button';
      add.className = 'sched-add';
      add.textContent = t('sched_add');
      add.addEventListener('click', function () {
        // الحصة الجديدة بتبدأ برياضة مختلفة عن اللي قبلها لو فيه
        const now = scheduleFor(i).map(function (r) { return { sport: r.sport, time: r.time }; });
        const used = now.map(function (r) { return r.sport; });
        const fresh = options.filter(function (k) { return used.indexOf(k) === -1; })[0] || options[0];
        setDaySchedule(i, now.concat([{ sport: fresh, time: '' }]));
        renderScheduleRows();
        updateObProgress();
      });
      dayBox.appendChild(add);
    }

    rows.appendChild(dayBox);
  }
}

/* ---------- اختيار متعدد: نفس شكل الصفوف بس بيسمح بأكتر من واحد ---------- */

function toggleInList(list, key) {
  const i = list.indexOf(key);
  if (i === -1) list.push(key);
  else list.splice(i, 1);
}

function renderMultiRows(container, keys, iconMap, labelFn, chosen, onPick) {
  if (!container) return;
  container.innerHTML = '';
  keys.forEach(function (key) {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'choice-row' + (chosen.indexOf(key) !== -1 ? ' selected' : '');

    const icon = document.createElement('span');
    icon.className = 'choice-icon';
    const art = iconMap[key];
    if (typeof art === 'string' && art.charAt(0) === '<') icon.innerHTML = art;
    else if (UI_ICONS[art]) icon.appendChild(iconSvg(art, 'ui-icon'));
    else icon.textContent = art;
    row.appendChild(icon);

    const label = document.createElement('span');
    label.className = 'choice-label';
    label.textContent = labelFn(key);
    row.appendChild(label);

    const check = document.createElement('span');
    check.className = 'choice-check';
    check.innerHTML = CHECK_ICON;
    row.appendChild(check);

    row.addEventListener('click', function () { onPick(key); });
    container.appendChild(row);
  });
}

/* الرياضات اللي اختارها كشرايح فوق — عشان يشوفها وهو بيلف على المجموعات */
function renderChosenSports() {
  const box = document.getElementById('ob-chosen-sports');
  if (!box) return;
  box.innerHTML = '';
  box.classList.toggle('hidden', !obSports.length);
  obSports.forEach(function (key) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chosen-chip';
    chip.appendChild(document.createTextNode(sportName(key)));
    const x = document.createElement('span');
    x.className = 'chosen-x';
    x.appendChild(iconSvg('close', 'ui-icon'));
    chip.appendChild(x);
    chip.addEventListener('click', function () {
      toggleInList(obSports, key);
      obSport.value = obSports[0] || '';
      obSchedule = obSchedule.filter(function (r) { return r.sport !== key; });
      renderSportRows();
      renderChosenSports();
      renderScheduleRows();
      updateObProgress();
    });
    box.appendChild(chip);
  });
}

const FOCUS_KEYS = ['training', 'nutrition', 'rehab', 'medical'];

function focusName(key) {
  return t('focus_' + key);
}

function renderFocusChips() {
  obFocusChips.innerHTML = '';
  FOCUS_KEYS.forEach(function (key) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip' + (obFocus.indexOf(key) !== -1 ? ' active' : '');
    chip.textContent = focusName(key);
    chip.addEventListener('click', function () {
      const index = obFocus.indexOf(key);
      if (index === -1) obFocus.push(key); else obFocus.splice(index, 1);
      renderFocusChips();
    });
    obFocusChips.appendChild(chip);
  });
}

obPainFlag.addEventListener('change', function () {
  obPainNote.classList.toggle('hidden', !obPainFlag.checked);
});

function resetObPhoto(existingPhoto) {
  obPickedImage = existingPhoto || '';
  if (existingPhoto) {
    obPhotoPreview.src = existingPhoto;
    obPhotoBox.classList.remove('hidden');
    obPhotoLabel.textContent = t('image_chosen');
  } else {
    obPhotoPreview.removeAttribute('src');
    obPhotoBox.classList.add('hidden');
    obPhotoLabel.textContent = t('choose_photo');
  }
}

const PHONE_COUNTRY_CODES = [
  { code: '+20', ar: 'مصر', en: 'Egypt' },
  { code: '+966', ar: 'السعودية', en: 'Saudi Arabia' },
  { code: '+971', ar: 'الإمارات', en: 'UAE' },
  { code: '+974', ar: 'قطر', en: 'Qatar' },
  { code: '+973', ar: 'البحرين', en: 'Bahrain' },
  { code: '+965', ar: 'الكويت', en: 'Kuwait' },
  { code: '+968', ar: 'عمان', en: 'Oman' },
  { code: '+962', ar: 'الأردن', en: 'Jordan' },
  { code: '+961', ar: 'لبنان', en: 'Lebanon' },
  { code: '+963', ar: 'سوريا', en: 'Syria' },
  { code: '+964', ar: 'العراق', en: 'Iraq' },
  { code: '+970', ar: 'فلسطين', en: 'Palestine' },
  { code: '+218', ar: 'ليبيا', en: 'Libya' },
  { code: '+216', ar: 'تونس', en: 'Tunisia' },
  { code: '+213', ar: 'الجزائر', en: 'Algeria' },
  { code: '+212', ar: 'المغرب', en: 'Morocco' },
  { code: '+249', ar: 'السودان', en: 'Sudan' },
  { code: '+1', ar: 'أمريكا / كندا', en: 'USA / Canada' },
  { code: '+44', ar: 'بريطانيا', en: 'UK' },
  { code: '+33', ar: 'فرنسا', en: 'France' },
  { code: '+49', ar: 'ألمانيا', en: 'Germany' },
  { code: '+39', ar: 'إيطاليا', en: 'Italy' },
  { code: '+34', ar: 'إسبانيا', en: 'Spain' },
  { code: '+31', ar: 'هولندا', en: 'Netherlands' },
  { code: '+90', ar: 'تركيا', en: 'Turkey' },
  { code: '+7', ar: 'روسيا', en: 'Russia' },
  { code: '+86', ar: 'الصين', en: 'China' },
  { code: '+91', ar: 'الهند', en: 'India' },
  { code: '+92', ar: 'باكستان', en: 'Pakistan' },
  { code: '+61', ar: 'أستراليا', en: 'Australia' }
];

/*
 * التحقق من رقم الموبايل
 * =======================
 * قبل كده كان الرقم بيتحفظ زي ما هو، فممكن العميل يزوّد رقم أو ينقّص
 * رقم أو يكتب حروف من غير ما حد ياخد باله — وساعتها المدرب مايعرفش
 * يوصله. دلوقتي بنتأكد من عدد الأرقام حسب الدولة نفسها.
 *
 * min/max = عدد الأرقام المطلوب بعد كود الدولة (من غير الصفر اللي في
 * أول الرقم المحلي — بنشيله تلقائي لأن الناس بتكتبه بالعادة).
 * الدول اللي مش في الجدول بيتطبق عليها المدى العام (7–13 رقم).
 */
const PHONE_RULES = {
  '+20':  { min: 10, max: 10, starts: ['10', '11', '12', '15'], example: '10 1234 5678' },
  '+966': { min: 9,  max: 9,  starts: ['5'],  example: '5X XXX XXXX' },
  '+971': { min: 9,  max: 9,  starts: ['5'],  example: '5X XXX XXXX' },
  '+974': { min: 8,  max: 8,  starts: [],     example: 'XXXX XXXX' },
  '+973': { min: 8,  max: 8,  starts: [],     example: 'XXXX XXXX' },
  '+965': { min: 8,  max: 8,  starts: [],     example: 'XXXX XXXX' },
  '+968': { min: 8,  max: 8,  starts: [],     example: 'XXXX XXXX' },
  '+962': { min: 9,  max: 9,  starts: ['7'],  example: '7X XXX XXXX' },
  '+961': { min: 7,  max: 8,  starts: [],     example: 'XX XXX XXX' },
  '+963': { min: 9,  max: 9,  starts: ['9'],  example: '9XX XXX XXX' },
  '+964': { min: 10, max: 10, starts: ['7'],  example: '7XX XXX XXXX' },
  '+970': { min: 9,  max: 9,  starts: ['5'],  example: '5X XXX XXXX' },
  '+218': { min: 9,  max: 9,  starts: ['9'],  example: '9X XXX XXXX' },
  '+216': { min: 8,  max: 8,  starts: [],     example: 'XX XXX XXX' },
  '+213': { min: 9,  max: 9,  starts: ['5', '6', '7'], example: '5XX XXX XXX' },
  '+212': { min: 9,  max: 9,  starts: ['6', '7'], example: '6XX XXX XXX' },
  '+249': { min: 9,  max: 9,  starts: ['9', '1'], example: '9XX XXX XXX' },
  '+1':   { min: 10, max: 10, starts: [],     example: 'XXX XXX XXXX' },
  '+44':  { min: 10, max: 10, starts: ['7'],  example: '7XXX XXXXXX' },
  '+90':  { min: 10, max: 10, starts: ['5'],  example: '5XX XXX XXXX' },
  '+91':  { min: 10, max: 10, starts: ['6', '7', '8', '9'], example: 'XXXXX XXXXX' }
};

const PHONE_RULE_DEFAULT = { min: 7, max: 13, starts: [], example: '' };

// بنشيل أي مسافات أو شرط أو أقواس، وبنحوّل الأرقام العربية (٠١٢) لإنجليزية
function normalisePhoneDigits(raw) {
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
  return String(raw || '')
    .split('')
    .map(function (ch) {
      const arabicIndex = arabicDigits.indexOf(ch);
      return arabicIndex !== -1 ? String(arabicIndex) : ch;
    })
    .join('')
    .replace(/[^0-9]/g, '');
}

/*
 * بترجع { ok, digits, error } — error مفتاح ترجمة عشان الرسالة تطلع
 * بلغة الواجهة. required = false معناها إن الرقم الفاضي مقبول.
 */
function validatePhone(code, raw, required) {
  const rule = PHONE_RULES[code] || PHONE_RULE_DEFAULT;
  let digits = normalisePhoneDigits(raw);

  if (!digits) {
    return required
      ? { ok: false, digits: '', error: 'phone_required' }
      : { ok: true, digits: '' };
  }

  // الناس بتكتب الصفر اللي في أول الرقم المحلي (010...) — بنشيله
  while (digits.length > rule.min && digits.charAt(0) === '0') {
    digits = digits.slice(1);
  }

  // ولو كتب كود الدولة جوه الخانة كمان (2010...) بنشيله هو كمان
  const bareCode = code.replace('+', '');
  if (digits.length > rule.max && digits.indexOf(bareCode) === 0) {
    digits = digits.slice(bareCode.length).replace(/^0+/, '');
  }

  if (digits.length < rule.min) return { ok: false, digits: digits, error: 'phone_too_short' };
  if (digits.length > rule.max) return { ok: false, digits: digits, error: 'phone_too_long' };

  if (rule.starts.length && !rule.starts.some(function (p) { return digits.indexOf(p) === 0; })) {
    return { ok: false, digits: digits, error: 'phone_bad_start' };
  }

  return { ok: true, digits: digits };
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || '').trim());
}

function phoneErrorText(code, key) {
  const rule = PHONE_RULES[code] || PHONE_RULE_DEFAULT;
  const count = rule.min === rule.max ? String(rule.min) : (rule.min + '–' + rule.max);
  return fill(key, { count: count, example: rule.example || '', code: code });
}

/*
 * بتربط خانة رقم + خانة كود الدولة بسطر رسالة تحت الخانة، فالعميل
 * يشوف الغلط وهو بيكتب مش بس لما يدوس حفظ
 */
function attachPhoneValidation(codeSelect, input, hintEl, required) {
  if (!input || !hintEl) return;

  function review() {
    const result = validatePhone(codeSelect ? codeSelect.value : '+20', input.value, required);
    if (!input.value.trim()) {
      hintEl.textContent = '';
      hintEl.className = 'phone-hint';
      input.classList.remove('field-error');
      return;
    }
    if (result.ok) {
      hintEl.innerHTML = '';
  hintEl.appendChild(iconSvg('check', 'ui-icon'));
  hintEl.appendChild(document.createTextNode(' ' + (codeSelect ? codeSelect.value : '') + ' ' + result.digits));
      hintEl.className = 'phone-hint phone-hint-ok';
      input.classList.remove('field-error');
    } else {
      hintEl.textContent = phoneErrorText(codeSelect ? codeSelect.value : '+20', result.error);
      hintEl.className = 'phone-hint phone-hint-bad';
      input.classList.add('field-error');
    }
  }

  input.addEventListener('input', review);
  input.addEventListener('blur', review);
  if (codeSelect) codeSelect.addEventListener('change', review);
}

function fillOnePhoneCodeSelect(select) {
  if (!select) return;
  const keep = select.value;
  select.innerHTML = '';
  PHONE_COUNTRY_CODES.forEach(function (item) {
    const option = document.createElement('option');
    option.value = item.code;
    option.textContent = item.code + '  ' + item[lang];
    select.appendChild(option);
  });
  select.value = keep || '+20';
}

function fillPhoneCodeSelect() {
  fillOnePhoneCodeSelect(obPhoneCode);
  fillOnePhoneCodeSelect(document.getElementById('lead-phone-code'));
}

// المراجعة اللحظية وانت بتكتب — لخانة العميل وخانة رسالة التواصل
fillPhoneCodeSelect();
attachPhoneValidation(obPhoneCode, obPhone, document.getElementById('ob-phone-hint'), true);
attachPhoneValidation(
  document.getElementById('lead-phone-code'),
  document.getElementById('lead-phone'),
  document.getElementById('lead-phone-hint'),
  true
);

/* بتفصل كود الدولة عن رقم الهاتف المخزّن (لو كان متسجل قبل كده بالشكل الجديد) */
function splitStoredPhone(stored) {
  if (!stored) return { code: '+20', number: '' };
  const match = PHONE_COUNTRY_CODES
    .slice()
    .sort(function (a, b) { return b.code.length - a.code.length; })
    .filter(function (item) { return stored.indexOf(item.code) === 0; })[0];
  if (!match) return { code: '+20', number: stored };
  return { code: match.code, number: stored.slice(match.code.length).trim() };
}

/* ============ أنواع الجسم (Somatotypes) ============ */
/*
 * ده مفهوم معروف في التدريب: الناس بتختلف في استجابتها للتمرين
 * والسعرات حسب بنيتها. المدرب بيستعمله كنقطة بداية — مش تصنيف
 * نهائي، وبيتعدّل مع المتابعة.
 * الأشكال مرسومة SVG، والاختيار بيتحفظ مع باقي بيانات العميل.
 */
const BODY_TYPES = [
  { id: 'ecto', labelKey: 'body_ecto', noteKey: 'body_ecto_note', w: 0.72 },
  { id: 'meso', labelKey: 'body_meso', noteKey: 'body_meso_note', w: 1 },
  { id: 'endo', labelKey: 'body_endo', noteKey: 'body_endo_note', w: 1.3 }
];

/* شكل الجسم: نفس الرسمة بعرض مختلف لكل نوع */
function bodyTypeArt(scale, active) {
  const c = active ? '#22c55e' : '#64748b';
  const s = scale;
  const cx = 40;
  const shoulder = 15 * s;
  const waist = 9.5 * s;
  const hip = 12 * s;
  return '<svg viewBox="0 0 80 104" aria-hidden="true">'
    + '<circle cx="' + cx + '" cy="16" r="9" fill="' + c + '"/>'
    // الجذع: كتف عريض ← وسط ← حوض
    + '<path d="M' + (cx - shoulder) + ' 30 '
    +   'Q' + cx + ' 26 ' + (cx + shoulder) + ' 30 '
    +   'L' + (cx + waist) + ' 58 '
    +   'L' + (cx + hip) + ' 74 '
    +   'L' + (cx - hip) + ' 74 '
    +   'L' + (cx - waist) + ' 58 Z" fill="' + c + '"/>'
    // الرجلين
    + '<rect x="' + (cx - hip + 1) + '" y="74" width="' + (hip - 2.5) + '" height="26" rx="' + (hip / 3) + '" fill="' + c + '"/>'
    + '<rect x="' + (cx + 1.5) + '" y="74" width="' + (hip - 2.5) + '" height="26" rx="' + (hip / 3) + '" fill="' + c + '"/>'
    // الدراعين
    + '<rect x="' + (cx - shoulder - 5.5) + '" y="31" width="5" height="30" rx="2.5" fill="' + c + '" opacity=".85"/>'
    + '<rect x="' + (cx + shoulder + 0.5) + '" y="31" width="5" height="30" rx="2.5" fill="' + c + '" opacity=".85"/>'
    + '</svg>';
}

function renderBodyTypes() {
  const box = document.getElementById('ob-body-types');
  const select = document.getElementById('ob-body');
  if (!box || !select) return;

  // القايمة المخفية هي اللي بتتحفظ — الكروت واجهة ليها
  if (!select.options.length) {
    BODY_TYPES.forEach(function (type) {
      const option = document.createElement('option');
      option.value = type.id;
      option.textContent = t(type.labelKey);
      select.appendChild(option);
    });
    select.value = '';
  }

  box.innerHTML = '';
  BODY_TYPES.forEach(function (type) {
    const active = select.value === type.id;
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'body-type' + (active ? ' active' : '');
    card.innerHTML = bodyTypeArt(type.w, active)
      + '<span class="body-type-name">' + t(type.labelKey) + '</span>'
      + '<span class="body-type-note">' + t(type.noteKey) + '</span>';
    card.addEventListener('click', function () {
      select.value = type.id;
      renderBodyTypes();
      updateObProgress();
    });
    box.appendChild(card);
  });
}

/* ============ تقدّم الاستمارة ============ */
/*
 * الزائر بيشوف قد إيه فضل — وده بيقلل إنه يسيب الاستمارة في نصها.
 * الخلفية كمان بتتغيّر مع التقدّم فالشاشة بتبقى حيّة وهو بيكتب.
 */
const OB_FIELDS = [
  function () { return !!obName.value.trim(); },
  function () { return !!obPhone.value.trim(); },
  function () { return !!obGender.value; },
  function () { return !!(obDobDay.value && obDobMonth.value && obDobYear.value); },
  function () { return !!obWeight.value; },
  function () { return !!obHeight.value; },
  function () { const s = document.getElementById('ob-body'); return !!(s && s.value); },
  function () { return !!obActivity.value; },
  function () { return !!obSport.value; },
  function () { return !!obGoal.value; }
];

const OB_BG_STAGES = ['training', 'rehab', 'nutrition', 'medical', 'psych', 'progress'];
let obBgStage = -1;

function updateObProgress() {
  const done = OB_FIELDS.filter(function (fn) {
    try { return fn(); } catch (error) { return false; }
  }).length;
  const pct = Math.round((done / OB_FIELDS.length) * 100);

  const fill = document.getElementById('ob-progress-fill');
  const note = document.getElementById('ob-progress-note');
  if (fill) fill.style.width = pct + '%';
  if (note) {
    note.textContent = pct >= 100
      ? t('ob_progress_done')
      : fill_('ob_progress_note', { done: done, total: OB_FIELDS.length });
  }

  // الخلفية بتترقّى كل ما يخلّص شوية — إحساس بالتقدّم من غير كلام
  const stage = Math.min(OB_BG_STAGES.length - 1, Math.floor((done / OB_FIELDS.length) * OB_BG_STAGES.length));
  if (stage !== obBgStage) {
    obBgStage = stage;
    const key = OB_BG_STAGES[stage];
    const colors = { training: '#22c55e', rehab: '#f97316', nutrition: '#38bdf8',
                     medical: '#a78bfa', psych: '#f472b6', progress: '#fbbf24' };
    const layer = document.getElementById('ob-bg');
    if (layer) {
      layer.innerHTML = '<svg width="100%" height="100%" aria-hidden="true">'
        + '<defs>' + specBackdrop(key, colors[key]) + '</defs>'
        + '<rect width="100%" height="100%" fill="url(#bgpat)"/></svg>';
      layer.classList.remove('ob-bg-in');
      void layer.offsetWidth;
      layer.classList.add('ob-bg-in');
    }
  }
}

/* اسم مختصر لـfill عشان ما يتلخبطش مع متغيّر محلي اسمه fill */
function fill_(key, vars) { return fill(key, vars); }

function prefillOnboarding(data) {
  renderBodyTypes();
  // نرسم الخلفية وشريط التقدّم من أول لحظة، مش بعد أول كتابة
  obBgStage = -1;
  setTimeout(updateObProgress, 0);
  fillGenderSelect();
  fillDobSelects();
  fillActivitySelect();
  fillSportSelect(obSport, true);
  fillGoalSelect();
  fillPhoneCodeSelect();

  const phoneParts = splitStoredPhone(data && data.phone);
  obName.value = (data && data.name) || '';
  obPhoneCode.value = phoneParts.code;
  obPhone.value = phoneParts.number;
  obGender.value = (data && data.gender) || '';
  const bodySelect = document.getElementById('ob-body');
  if (bodySelect) bodySelect.value = (data && data.bodyType) || '';
  renderBodyTypes();

  /* الحالة الصحية بتتقرا من مستندها الخاص، مش من مستند العميل */
  const health = clientHealth || blankHealth();
  obConditions = health.conditions.slice();
  obPregnant = health.pregnancy.active;
  obPostpartum = health.postpartum;
  const pregWeek = document.getElementById('ob-preg-week');
  if (pregWeek) pregWeek.value = health.pregnancy.week || '';
  const healthNote = document.getElementById('ob-health-note');
  if (healthNote) healthNote.value = health.note || '';

  obCycleTrack = health.cycle.track;
  const cycLast = document.getElementById('ob-cycle-last');
  const cycLen = document.getElementById('ob-cycle-len');
  if (cycLast) cycLast.value = health.cycle.lastPeriod || '';
  if (cycLen) cycLen.value = health.cycle.length || '';

  renderHealthChips();
  renderPregnancyBox();
  renderCycleBox();

  obReferrer = (data && data.referredBy) || '';
  obSource = (data && data.heardFrom) || '';
  const srcOther = document.getElementById('ob-source-other');
  if (srcOther) srcOther.value = (data && data.heardFromNote) || '';
  renderSourceRow();
  loadReferrerOptions().then(renderReferrerRow);
  obDobDay.value = (data && data.dob && data.dob.day) || '';
  obDobMonth.value = (data && data.dob && data.dob.month) || '';
  obDobYear.value = (data && data.dob && data.dob.year) || '';
  obWeight.value = (data && data.weight) || '';
  obHeight.value = (data && data.height) || '';
  obActivity.value = (data && data.activity) || '';
  obSport.value = (data && data.sport) || '';
  /* التوافق مع القديم: عميل قديم عنده رياضة واحدة بتتحوّل لقايمة */
  obSports = (data && Array.isArray(data.sports) && data.sports.length)
    ? data.sports.slice()
    : ((data && data.sport) ? [data.sport] : []);
  obGoals = (data && Array.isArray(data.goals) && data.goals.length)
    ? data.goals.slice()
    : ((data && data.goal) ? [data.goal] : []);
  obSchedule = (data && Array.isArray(data.sportSchedule)) ? data.sportSchedule.slice() : [];
  renderChosenSports();
  renderScheduleRows();
  obGoal.value = (data && data.goal) || '';

  const existingSport = sportById(obSport.value);
  selectedSportGroup = existingSport ? existingSport.group : '';

  renderGenderRows();
  renderActivityTiles();
  renderSportGroupDial();
  renderSportRows();
  renderGoalTiles();

  obFocus = (data && Array.isArray(data.focus)) ? data.focus.slice() : [];
  renderFocusChips();

  fillWorkNatureSelect();
  fillTrainingDaysSelect();
  fillMealsPerDaySelect();
  obWorkNature.value = (data && data.workNature) || '';
  obTrainingDays.value = (data && data.trainingDaysPref) || '';
  obSleepTime.value = (data && data.sleepTime) || '';
  /*
   * الترتيب هنا مهم: القوايم دي بتتبني بالجافاسكريبت، ولو حطينا
   * القيمة قبل ما الاختيارات تتعمل بتتجاهل والعميل يلاقي إجاباته
   * عن النوم فاضية. نبنيها الأول وبعدين نحطها
   */
  fillSleepQualitySelect();
  fillSleepExtraSelects();
  if (obSleepQuality) obSleepQuality.value = (data && data.sleepQuality) || '';
  if (obSleepHours) obSleepHours.value = (data && data.sleepHours) || '';
  if (obSleepBlocks) obSleepBlocks.value = (data && data.sleepBlocks) || '';
  renderSleepQualityRows();
  renderSleepHoursRows();
  renderSleepBlocksRows();
  obWakeTime.value = (data && data.wakeTime) || '';
  obMealsPerDay.value = (data && data.mealsPerDay) || '';
  obFirstMealTime.value = (data && data.firstMealTime) || '';
  obLastMealTime.value = (data && data.lastMealTime) || '';
  renderWorkNatureRows();
  renderTrainingDaysRows();
  renderMealsPerDayRows();

  obPainFlag.checked = !!(data && data.painFlag);
  obPainNote.value = (data && data.painNote) || '';
  obPainNote.classList.toggle('hidden', !obPainFlag.checked);

  resetObPhoto(data && data.photo);

  onboardingMessage.textContent = '';
}

obPhoto.addEventListener('change', async function () {
  const file = obPhoto.files[0];
  if (!file) return;

  if (file.size > MAX_SOURCE_BYTES) {
    onboardingMessage.textContent = t('image_too_big');
    obPhoto.value = '';
    return;
  }

  onboardingMessage.textContent = t('preparing_image');
  try {
    obPickedImage = await compressImage(file, IMAGE_MAX_SIDE, 0.7);
    obPhotoPreview.src = obPickedImage;
    obPhotoBox.classList.remove('hidden');
    obPhotoLabel.textContent = t('image_chosen');
    onboardingMessage.textContent = '';
  } catch (error) {
    onboardingMessage.textContent = t('image_failed');
    resetObPhoto('');
    obPhoto.value = '';
  }
});

document.getElementById('ob-photo-remove').addEventListener('click', function () {
  resetObPhoto('');
  obPhoto.value = '';
});

/*
 * أي كتابة أو اختيار في الاستمارة بيحدّث شريط التقدّم والخلفية.
 * بنسمع على الشاشة كلها بدل ما نربط كل خانة لوحدها — أبسط وأضمن
 * إن أي خانة تتضاف بعدين تشتغل من غير ما ننسى نوصّلها
 */
if (onboardingScreen) {
  ['input', 'change', 'click'].forEach(function (evt) {
    onboardingScreen.addEventListener(evt, function () {
      // تأخير بسيط عشان القوايم المخفية تكون اتحدّثت
      setTimeout(updateObProgress, 40);
    });
  });
}

/* بيروح لأول خانة ناقصة ويعلّم عليها */
function scrollToFirstMissing(pairs) {
  for (let i = 0; i < pairs.length; i++) {
    if (pairs[i][0]) continue;
    const el = pairs[i][1];
    if (!el) continue;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('needs-fill');
    setTimeout(function () { el.classList.remove('needs-fill'); }, 2200);
    if (typeof el.focus === 'function' && el.tagName === 'INPUT') el.focus();
    return;
  }
}

document.getElementById('ob-next-btn').addEventListener('click', async function () {
  const name = obName.value.trim();
  const gender = obGender.value;
  const dobDay = Number(obDobDay.value);
  const dobMonth = Number(obDobMonth.value);
  const dobYear = Number(obDobYear.value);
  const age = calcAge(dobDay, dobMonth, dobYear);
  const weight = Number(obWeight.value);
  const height = Number(obHeight.value);
  const activity = obActivity.value;
  const goal = obGoal.value;

  if (!name || !gender || !dobDay || !dobMonth || !dobYear || !age || !weight || !height || !activity || !goal) {
    onboardingMessage.textContent = t('need_onboarding_fields');
    /*
     * الاستمارة طويلة والرسالة في آخرها — العميل كان بيدوس "التالي"
     * ومايحصلش حاجة من غير ما يعرف ليه. دلوقتي بنوديه على أول
     * خانة ناقصة بنفسه
     */
    scrollToFirstMissing([
      [name, obName],
      [gender, document.getElementById('ob-gender-rows')],
      [dobDay && dobMonth && dobYear, obDobDay],
      [weight, obWeight],
      [height, obHeight],
      [activity, document.getElementById('activity-dial')],
      [goal, document.getElementById('goal-ring')]
    ]);
    return;
  }

  /*
   * رقم الموبايل إجباري دلوقتي وبيتراجع قبل الحفظ — ده الرقم اللي
   * المدرب هيتواصل بيه، فرقم ناقص أو زايد معناه عميل ضايع
   */
  const phoneCheck = validatePhone(obPhoneCode.value, obPhone.value, true);
  if (!phoneCheck.ok) {
    onboardingMessage.textContent = phoneErrorText(obPhoneCode.value, phoneCheck.error);
    obPhone.classList.add('field-error');
    obPhone.focus();
    return;
  }
  obPhone.classList.remove('field-error');

  onboardingMessage.textContent = t('saving');
  try {
    const clientPayload = {
      name: name,
      phone: obPhoneCode.value + ' ' + phoneCheck.digits,
      bodyType: (document.getElementById('ob-body') || {}).value || '',
      gender: gender,
      dob: { day: dobDay, month: dobMonth, year: dobYear },
      age: age,
      weight: weight,
      height: height,
      activity: activity,
      sport: obSports[0] || obSport.value || '',
      sports: obSports.slice(),
      goals: obGoals.slice(),
      sportSchedule: obSchedule.slice(),
      goal: obGoals[0] || goal,
      focus: obFocus.slice(),
      workNature: obWorkNature.value || '',
      trainingDaysPref: obTrainingDays.value || '',
      sleepTime: obSleepTime.value || '',
      sleepQuality: (obSleepQuality && obSleepQuality.value) || '',
      sleepHours: (obSleepHours && obSleepHours.value) || '',
      sleepBlocks: (obSleepBlocks && obSleepBlocks.value) || '',
      wakeTime: obWakeTime.value || '',
      mealsPerDay: obMealsPerDay.value || '',
      firstMealTime: obFirstMealTime.value || '',
      lastMealTime: obLastMealTime.value || '',
      referredBy: obReferrer,
      heardFrom: obSource,
      heardFromNote: obSource === 'other'
        ? ((document.getElementById('ob-source-other') || {}).value || '').trim()
        : '',
      painFlag: obPainFlag.checked,
      painNote: obPainFlag.checked ? obPainNote.value.trim() : '',
      photo: obPickedImage
    };
    // تجربة مجانية 30 يوم — بس لحساب اتعمل لوحده من صفحة التعريف
    if (onboardingIsNewSignup) {
      clientPayload.trialStartedAt = new Date().toISOString().slice(0, 10);
    }
    await setDoc(doc(db, 'clients', onboardingEmail), clientPayload, { merge: true });

    /*
     * الحالة الصحية بتتحفظ في مستند منفصل بصلاحيات أضيق — مش جوه
     * مستند العميل، لأن قايمة العملاء بيقراها كل المتخصصين عشان
     * البحث، والبيانات دي مش المفروض توصل غير لفريقه هو
     */
    const healthPayload = healthPayloadFromForm();
    if (!healthIsEmpty(normalizeHealth(healthPayload)) || (clientHealth && !healthIsEmpty(clientHealth))) {
      await setDoc(doc(db, 'health', onboardingEmail), healthPayload, { merge: true });
    }

    onboardingMessage.textContent = '';

    /* وضع التعديل: بيرجع لشاشته على طول — مش بيعدّي على اختيار الفريق تاني */
    if (onboardingEditMode) {
      onboardingEditMode = false;
      applyOnboardingMode();
      showScreen(clientScreen);
      loadClient(onboardingEmail);
      return;
    }

    teamEditEmail = onboardingEmail;
    teamEditMode = 'onboarding';
    teamSaveBtn.textContent = t('team_save');
    teamSkipBtn.classList.remove('hidden');
    teamBackBtn.classList.add('hidden');
    showScreen(teamScreen);
    loadTeamPicker();
  } catch (error) {
    onboardingMessage.textContent = t('problem') + error.message;
  }
});

/* ============================================================
   الحالات الخاصة — أمراض مزمنة وحمل
   العميل اللي بيجي مش رياضي بالضرورة، وحتى الرياضي ممكن يكون
   عنده حاجة. البرنامج هنا مش بيتغيّر لوحده — بيتوقف لحد ما
   الطبيب يكتب إذنه، والمدرب يشوف الاحتياطات قدام عينه.
   ============================================================ */

/* health/{email} = { conditions:[], pregnancy:{...}, postpartum:bool, note:'', clearance:{...} } */
let clientHealth = null;
let obConditions = [];
let obPregnant = false;
let obPostpartum = false;

function blankHealth() {
  return {
    conditions: [],
    pregnancy: { active: false, week: 0 },
    postpartum: false,
    cycle: { track: false, lastPeriod: '', length: 28 },
    note: '',
    clearance: { status: 'none', by: '', at: '', note: '' }
  };
}

function normalizeHealth(data) {
  const clean = blankHealth();
  if (!data) return clean;
  if (Array.isArray(data.conditions)) {
    clean.conditions = data.conditions.filter(function (key) { return !!HEALTH_CONDITIONS[key]; });
  }
  if (data.pregnancy && typeof data.pregnancy === 'object') {
    clean.pregnancy.active = !!data.pregnancy.active;
    clean.pregnancy.week = Number(data.pregnancy.week) || 0;
  }
  clean.postpartum = !!data.postpartum;
  if (data.cycle && typeof data.cycle === 'object') {
    clean.cycle.track = !!data.cycle.track;
    clean.cycle.lastPeriod = String(data.cycle.lastPeriod || '');
    const len = Number(data.cycle.length) || 28;
    clean.cycle.length = Math.max(21, Math.min(40, len));
  }
  clean.note = String(data.note || '');
  if (data.clearance && typeof data.clearance === 'object') {
    clean.clearance.status = String(data.clearance.status || 'none');
    clean.clearance.by = String(data.clearance.by || '');
    clean.clearance.at = String(data.clearance.at || '');
    clean.clearance.note = String(data.clearance.note || '');
  }
  return clean;
}

function healthIsEmpty(health) {
  if (!health) return true;
  return !health.conditions.length && !health.pregnancy.active && !health.postpartum
      && !(health.cycle && health.cycle.track);
}

/* كل الحالات المفعّلة كقائمة موحّدة: مرض مزمن أو حمل أو ما بعد ولادة */
function activeHealthItems(health) {
  if (!health) return [];
  const out = [];
  health.conditions.forEach(function (key) {
    out.push(Object.assign({ key: key }, HEALTH_CONDITIONS[key]));
  });
  if (health.pregnancy.active) out.push(Object.assign({ key: 'pregnancy', week: health.pregnancy.week }, PREGNANCY));
  if (health.postpartum) out.push(Object.assign({ key: 'postpartum' }, POSTPARTUM));
  return out;
}

function healthName(item) {
  return item[lang] || item.ar || item.key;
}

function needsClearance(health) {
  return activeHealthItems(health).some(function (item) { return !!item.clearance; });
}

/* موافق أو موافق بشروط = البرنامج يمشي. مرفوض أو مفيش قرار = لأ */
function clearanceOk(health) {
  const status = health && health.clearance && health.clearance.status;
  return status === 'cleared' || status === 'restricted';
}

function clearanceStatusOf(health) {
  return (health && health.clearance && health.clearance.status) || 'none';
}

/* عنوان الحالة زي ما بيتعرض في الشاشتين */
function clearanceTitle(status) {
  if (status === 'cleared') return t('clearance_ok');
  if (status === 'restricted') return t('clearance_restricted');
  if (status === 'denied') return t('clearance_denied');
  if (status === 'requested') return t('clearance_waiting');
  return t('clearance_needed');
}

/* التلات شهور — بتغيّر الاحتياطات فبنعرضها للعميلة والمدرب */
function trimesterOf(week) {
  const w = Number(week) || 0;
  if (!w) return '';
  if (w <= 13) return 'tri1';
  if (w <= 27) return 'tri2';
  return 'tri3';
}

async function loadClientHealth(email) {
  try {
    const snap = await getDoc(doc(db, 'health', email));
    clientHealth = normalizeHealth(snap.exists() ? snap.data() : null);
  } catch (error) {
    clientHealth = blankHealth();
  }
  return clientHealth;
}

async function loadHealthFor(email) {
  try {
    const snap = await getDoc(doc(db, 'health', email));
    return normalizeHealth(snap.exists() ? snap.data() : null);
  } catch (error) {
    return blankHealth();
  }
}

/* ---------- شاشة البيانات: اختيار الحالات ---------- */

/* ============================================================
   أيقونات الحالات الصحية
   كانت إيموچي كيبورد: شكلها بيختلف من تليفون لتليفون، وبتبان
   لعبة جنب كلام زي "سكري نوع ٢". بقت أيقونات خط زي باقي الموقع
   ============================================================ */
const HEALTH_ICON_KEYS = {
  diabetes_t1: 'glucose', diabetes_t2: 'glucose', hypertension: 'pulse',
  heart: 'heart', asthma: 'lungs', pcos: 'ovary', thyroid: 'thyroid',
  kidney: 'kidney', liver: 'liver', disc: 'spine', arthritis: 'joint',
  osteoporosis: 'bone', anemia: 'drop', ibs: 'stomach', gout: 'toe',
  epilepsy: 'bolt', pregnancy: 'pregnant', postpartum: 'baby',
  period: 'drop', follicular: 'seedling', ovulation: 'star', luteal: 'moon'
};

/* بنستعمل المفتاح لو عرفناه، وإلا بنرجع لأيقونة عامة */
function healthIconEl(item, cls) {
  const key = (item && (item.key || item.id)) || '';
  return iconSvg(HEALTH_ICON_KEYS[key] || 'pulse', cls || 'ui-icon');
}

function healthIconHtml(item) {
  return healthIconEl(item).outerHTML;
}

/*
 * حالات بتخص الإناث بس. حطّيناها هنا مش في health-conditions.js
 * عشان القايمة دي قرار عرض مش بيانات طبية
 */
const FEMALE_ONLY_CONDITIONS = ['pcos'];

function renderHealthChips() {
  const box = document.getElementById('ob-health-chips');
  if (!box) return;
  box.innerHTML = '';

  const femaleClient = ((obGender && obGender.value) || '') === 'female';

  // ولو كان مختار حاجة نسائية وغيّر نوعه، بنشيلها من اختياراته
  if (!femaleClient) {
    obConditions = obConditions.filter(function (k) {
      return FEMALE_ONLY_CONDITIONS.indexOf(k) === -1;
    });
  }

  CONDITION_ORDER.forEach(function (key) {
    const item = HEALTH_CONDITIONS[key];
    if (!item) return;
    // تكيّس المبايض حالة نسائية — مالهاش لازمة في قايمة راجل
    if (FEMALE_ONLY_CONDITIONS.indexOf(key) !== -1 && !femaleClient) return;
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'health-chip' + (obConditions.indexOf(key) !== -1 ? ' active' : '');
    chip.dataset.key = key;

    const icon = document.createElement('span');
    icon.className = 'hc-icon';
    icon.appendChild(healthIconEl(Object.assign({ key: key }, item)));
    chip.appendChild(icon);

    const label = document.createElement('span');
    label.textContent = item[lang] || item.ar;
    chip.appendChild(label);

    chip.addEventListener('click', function () {
      const pos = obConditions.indexOf(key);
      if (pos === -1) obConditions.push(key);
      else obConditions.splice(pos, 1);
      renderHealthChips();
      updateObProgress();
    });

    box.appendChild(chip);
  });
}

function renderPregnancyBox() {
  const toggle = document.getElementById('ob-preg-toggle');
  const post = document.getElementById('ob-postpartum-toggle');
  const weekBox = document.getElementById('ob-preg-week-box');
  const box = document.getElementById('ob-preg-box');
  if (!toggle || !post || !weekBox || !box) return;

  /*
   * الحمل بيظهر لما النوع يكون أنثى أو لسه مختارش — مش منطقي
   * نسأل راجل عن أسبوع الحمل
   */
  const gender = (obGender && obGender.value) || '';
  const femaleOnly = gender === 'female';
  box.classList.toggle('hidden', !femaleOnly);
  if (!femaleOnly) { obPregnant = false; obPostpartum = false; }

  toggle.classList.toggle('active', obPregnant);
  post.classList.toggle('active', obPostpartum);
  weekBox.classList.toggle('hidden', !obPregnant);

  renderCycleBox();

  const tri = document.getElementById('ob-preg-tri');
  const weekInput = document.getElementById('ob-preg-week');
  if (tri && weekInput) {
    const key = trimesterOf(weekInput.value);
    tri.textContent = key ? t('preg_' + key) : '';
    tri.classList.toggle('hidden', !key);
  }
}

function wireHealthStep() {
  const toggle = document.getElementById('ob-preg-toggle');
  const post = document.getElementById('ob-postpartum-toggle');
  const weekInput = document.getElementById('ob-preg-week');
  if (!toggle || !post || !weekInput) return;

  toggle.addEventListener('click', function () {
    obPregnant = !obPregnant;
    if (obPregnant) obPostpartum = false;
    renderPregnancyBox();
    updateObProgress();
  });
  post.addEventListener('click', function () {
    obPostpartum = !obPostpartum;
    if (obPostpartum) obPregnant = false;
    renderPregnancyBox();
    updateObProgress();
  });
  weekInput.addEventListener('input', renderPregnancyBox);
  if (obGender) obGender.addEventListener('change', renderPregnancyBox);
}

/* ============================================================
   الدورة الشهرية — فسيولوجيا مش مرض
   الأداء بيتغيّر عبر الشهر فعلًا. من غير ما نحسبها، أي هبوط
   في الأداء بيتفسّر غلط على إنه كسل — وده ظلم وشغل مش علمي
   ============================================================ */

/* اليوم الحالي في الدورة (١ = أول يوم نزول) */
function cycleDayOf(cycle) {
  if (!cycle || !cycle.track || !cycle.lastPeriod) return 0;
  const gone = daysAgo(cycle.lastPeriod);
  if (gone === null || gone < 0) return 0;
  const length = Math.max(21, Math.min(40, Number(cycle.length) || 28));
  return (gone % length) + 1;
}

function cyclePhaseOf(day) {
  if (!day) return '';
  for (let i = 0; i < CYCLE_ORDER.length; i++) {
    const key = CYCLE_ORDER[i];
    const range = CYCLE_PHASES[key].days;
    if (day >= range[0] && day <= range[1]) return key;
  }
  /* دورة أطول من ٢٨: الأيام الزيادة بتفضل ما قبل الدورة */
  return 'luteal';
}

function cycleActive(health) {
  return !!(health && health.cycle && health.cycle.track && health.cycle.lastPeriod
            && !(health.pregnancy && health.pregnancy.active));
}

function renderCycleCard() {
  const card = document.getElementById('client-cycle');
  if (!card) return;

  if (!cycleActive(clientHealth)) { card.classList.add('hidden'); return; }

  const day = cycleDayOf(clientHealth.cycle);
  const key = cyclePhaseOf(day);
  const phase = CYCLE_PHASES[key];
  if (!day || !phase) { card.classList.add('hidden'); return; }

  card.classList.remove('hidden');
  card.className = 'cycle-card phase-' + key;
  const cycIcon = document.getElementById('cyc-icon');
  cycIcon.innerHTML = '';
  cycIcon.appendChild(healthIconEl({ key: key }));
  document.getElementById('cyc-phase').textContent = phase[lang] || phase.ar;
  document.getElementById('cyc-day').textContent = fill('cycle_day_of', { n: day });
  document.getElementById('cyc-note').textContent = (phase.note && phase.note[lang]) || phase.note.ar;

  const tips = document.getElementById('cyc-tips');
  tips.innerHTML = '';
  ((phase.train && phase.train[lang]) || phase.train.ar || []).forEach(function (line) {
    const li = document.createElement('li');
    li.textContent = line;
    tips.appendChild(li);
  });
}

/* زرار "دورتي بدأت النهاردة" — بيصفّر العدّاد من غير ما تفتح تواريخ */
const cycLogBtn = document.getElementById('cyc-log-btn');
if (cycLogBtn) {
  cycLogBtn.addEventListener('click', async function () {
    const message = document.getElementById('cyc-message');
    if (!clientHealth || !clientEmail) return;
    message.textContent = t('saving');
    try {
      clientHealth.cycle.lastPeriod = todayStamp;
      await setDoc(doc(db, 'health', clientEmail), { cycle: clientHealth.cycle }, { merge: true });
      renderCycleCard();
      setStatusMessage(message, t('cycle_logged'), 'success');
    } catch (error) {
      message.textContent = t('problem') + error.message;
    }
  });
}

/* ---------- شاشة البيانات: متابعة الدورة ---------- */

let obCycleTrack = false;

function renderCycleBox() {
  const box = document.getElementById('ob-cycle-box');
  const toggle = document.getElementById('ob-cycle-toggle');
  const fields = document.getElementById('ob-cycle-fields');
  if (!box || !toggle || !fields) return;

  /* بتظهر للإناث بس، وبتختفي لو حامل */
  const gender = (obGender && obGender.value) || '';
  const hide = gender !== 'female' || obPregnant;
  box.classList.toggle('hidden', hide);
  if (hide) obCycleTrack = false;

  toggle.classList.toggle('active', obCycleTrack);
  fields.classList.toggle('hidden', !obCycleTrack);

  const now = document.getElementById('ob-cycle-now');
  const last = document.getElementById('ob-cycle-last');
  const len = document.getElementById('ob-cycle-len');
  if (now && last && len) {
    const day = cycleDayOf({ track: obCycleTrack, lastPeriod: last.value, length: Number(len.value) || 28 });
    const key = cyclePhaseOf(day);
    if (day && CYCLE_PHASES[key]) {
      now.innerHTML = '';
      now.appendChild(healthIconEl({ key: key }));
      now.appendChild(document.createTextNode(' '
        + (CYCLE_PHASES[key][lang] || CYCLE_PHASES[key].ar)
        + ' · ' + fill('cycle_day_of', { n: day })));
      now.classList.remove('hidden');
    } else {
      now.classList.add('hidden');
    }
  }
}

function wireCycleStep() {
  const toggle = document.getElementById('ob-cycle-toggle');
  const last = document.getElementById('ob-cycle-last');
  const len = document.getElementById('ob-cycle-len');
  if (!toggle || !last || !len) return;
  toggle.addEventListener('click', function () {
    obCycleTrack = !obCycleTrack;
    renderCycleBox();
  });
  last.addEventListener('input', renderCycleBox);
  len.addEventListener('input', renderCycleBox);
}

wireCycleStep();

wireHealthStep();

/* ============================================================
   الإذن الطبي — أي طبيب يرد، مش طبيب معيّن
   الحالة المرضية أو الحمل مابتستناش دكتور واحد يفضى. أي طبيب
   مسجّل في المنصة (طبيب عام/عظام/طب رياضي) + صاحب المنصة
   يقدر يفتح الطلب ويرد عليه، والقرار بيوصل للمدرب والعميل فورًا
   ============================================================ */

/* هل الحساب ده له حق الموافقة؟ */
function canClearMedical() {
  if (isFullAdminAccount()) return true;
  return providerSpecialties(currentProviderData).some(specialtyClears);
}

const CLEARANCE_STATES = {
  cleared:    { tone: 'ok',   icon: 'check' },
  restricted: { tone: 'warn', icon: 'warning' },
  denied:     { tone: 'bad',  icon: 'ban' }
};

let clearanceRows = [];
let clrFilter = 'pending';

async function loadClearanceRequests() {
  const listBox = document.getElementById('clearance-list');
  const message = document.getElementById('clearance-message');
  listBox.innerHTML = '';
  message.textContent = t('loading');

  try {
    const snapshot = await getDocs(collection(db, 'consultRequests'));
    const rows = snapshot.docs
      .map(function (item) { return Object.assign({ id: item.id }, item.data()); })
      .filter(function (row) { return row.kind === 'clearance'; })
      .sort(function (a, b) { return String(b.createdAt || '').localeCompare(String(a.createdAt || '')); });

    /* بنجيب الحالة الصحية لكل طلب عشان الطبيب يقرر وهو شايف الحالة */
    for (const row of rows) {
      row.health = await loadHealthFor(row.clientEmail);
    }

    clearanceRows = rows;
    message.textContent = rows.length ? '' : t('clearance_none');
    renderClearanceList();
    refreshClearanceBadge();
  } catch (error) {
    message.textContent = t('problem') + error.message;
  }
}

function clearanceIsPending(row) {
  return (row.status || 'pending') !== 'answered';
}

function renderClearanceList() {
  const filters = document.getElementById('clr-filters');
  const listBox = document.getElementById('clearance-list');

  filters.innerHTML = '';
  ['pending', 'answered', 'all'].forEach(function (key) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'adh-chip' + (key === clrFilter ? ' active' : '');
    chip.textContent = t('clr_filter_' + key);
    chip.addEventListener('click', function () {
      clrFilter = key;
      renderClearanceList();
    });
    filters.appendChild(chip);
  });

  const shown = clearanceRows.filter(function (row) {
    if (clrFilter === 'all') return true;
    if (clrFilter === 'pending') return clearanceIsPending(row);
    return !clearanceIsPending(row);
  });

  listBox.innerHTML = '';
  if (!shown.length) {
    const empty = document.createElement('li');
    empty.className = 'adh-empty';
    empty.textContent = clrFilter === 'pending' ? t('clearance_none_pending') : t('clearance_none');
    listBox.appendChild(empty);
    return;
  }

  shown.forEach(function (row) { listBox.appendChild(clearanceCard(row)); });
}

function clearanceCard(row) {
  const item = document.createElement('li');
  const status = (row.health && row.health.clearance && row.health.clearance.status) || 'none';
  const pending = clearanceIsPending(row);
  item.className = 'clr-card' + (pending ? ' pending' : (' done ' + ((CLEARANCE_STATES[status] || {}).tone || '')));

  const head = document.createElement('div');
  head.className = 'clr-head';
  const name = document.createElement('div');
  name.className = 'clr-name';
  name.textContent = row.clientName || row.clientEmail;
  head.appendChild(name);

  const pill = document.createElement('span');
  pill.className = 'clr-pill ' + (pending ? 'pending' : ((CLEARANCE_STATES[status] || {}).tone || ''));
  pill.textContent = pending ? t('clr_state_pending') : t('clr_state_' + status);
  head.appendChild(pill);
  item.appendChild(head);

  /* الحالة قدام الطبيب وهو بيقرر */
  const items = activeHealthItems(row.health);
  if (items.length) {
    const conds = document.createElement('div');
    conds.className = 'clr-conds';
    items.forEach(function (h) {
      const chip = document.createElement('span');
      chip.className = 'ch-pill';
      let label = healthName(h);
      if (h.key === 'pregnancy' && h.week) label += ' · ' + fill('preg_week_of', { n: h.week });
      chip.appendChild(healthIconEl(h));
      chip.appendChild(document.createTextNode(' ' + label));
      conds.appendChild(chip);
    });
    item.appendChild(conds);
  }

  if (row.health && row.health.note) {
    const note = document.createElement('div');
    note.className = 'clr-note';
    note.textContent = t('clr_client_note') + ': ' + row.health.note;
    item.appendChild(note);
  }

  const meta = document.createElement('div');
  meta.className = 'clr-meta';
  meta.textContent = (row.fromProvider ? (t('clr_from') + ': ' + row.fromProvider + ' · ') : '')
    + String(row.createdAt || '').slice(0, 10);
  item.appendChild(meta);

  /* شيت الاحتياطات — الطبيب يشوف نفس اللي المدرب شايفه */
  const seeBtn = document.createElement('button');
  seeBtn.type = 'button';
  seeBtn.className = 'prov-profile-btn';
  seeBtn.textContent = t('coach_health_open');
  seeBtn.addEventListener('click', function () {
    const keep = clientHealth;
    clientHealth = row.health;
    renderSafetySheet();
    clientHealth = keep;
    safetySheet.classList.remove('hidden');
    document.body.classList.add('focus-open');
  });
  item.appendChild(seeBtn);

  if (!pending) {
    const decided = document.createElement('div');
    decided.className = 'clr-decided';
    const by = (row.health && row.health.clearance && row.health.clearance.by) || '';
    const when = (row.health && row.health.clearance && row.health.clearance.at) || '';
    const docNote = (row.health && row.health.clearance && row.health.clearance.note) || '';
    decided.textContent = [by && (t('clr_by') + ': ' + by), when, docNote].filter(Boolean).join(' · ');
    item.appendChild(decided);
    return item;
  }

  /* لوحة القرار */
  const box = document.createElement('div');
  box.className = 'clr-decide';

  const noteInput = document.createElement('textarea');
  noteInput.rows = 2;
  noteInput.placeholder = t('clr_note_ph');
  box.appendChild(noteInput);

  const rowMsg = document.createElement('p');
  rowMsg.className = 'message';

  const buttons = document.createElement('div');
  buttons.className = 'clr-actions';
  [
    { key: 'cleared',    cls: 'ok' },
    { key: 'restricted', cls: 'warn' },
    { key: 'denied',     cls: 'bad' }
  ].forEach(function (choice) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'clr-btn ' + choice.cls;
    btn.textContent = t('clr_btn_' + choice.key);
    btn.addEventListener('click', async function () {
      /* الرفض أو الموافقة بشروط من غير سبب مكتوب مالهاش معنى للمدرب */
      if (choice.key !== 'cleared' && !noteInput.value.trim()) {
        rowMsg.textContent = t('clr_need_note');
        noteInput.focus();
        return;
      }
      await decideClearance(row, choice.key, noteInput.value.trim(), rowMsg);
    });
    buttons.appendChild(btn);
  });

  box.appendChild(buttons);
  box.appendChild(rowMsg);
  item.appendChild(box);
  return item;
}

async function decideClearance(row, status, note, message) {
  message.textContent = t('saving');
  try {
    const decision = {
      status: status,
      by: currentProviderEmail || COACH_EMAIL.toLowerCase(),
      at: todayStamp,
      note: note
    };
    await setDoc(doc(db, 'health', row.clientEmail), { clearance: decision }, { merge: true });
    await updateDoc(doc(db, 'consultRequests', row.id), {
      status: 'answered',
      reply: t('clr_state_' + status) + (note ? (' — ' + note) : ''),
      answeredBy: decision.by,
      answeredAt: new Date().toISOString()
    });
    row.status = 'answered';
    row.health.clearance = decision;
    notify(row.clientEmail, 'clearance_client', {
      target: 'training',
      params: function () { return { status: t('clr_state_' + status) }; }
    });
    if (row.fromProvider) {
      notify(row.fromProvider, 'clearance_team', {
        target: 'client', about: row.clientEmail, aboutName: row.clientName || '',
        params: function () { return { name: row.clientName || row.clientEmail, status: t('clr_state_' + status) }; }
      });
    }
    renderClearanceList();
    refreshClearanceBadge();
    setStatusMessage(message, t('clr_saved'), 'success');
  } catch (error) {
    message.textContent = t('problem') + error.message;
  }
}

function refreshClearanceBadge() {
  const badge = document.getElementById('clearance-badge');
  if (!badge) return;
  const n = clearanceRows.filter(clearanceIsPending).length;
  badge.textContent = n;
  badge.classList.toggle('hidden', !n);
  renderCoachTiles();
}

document.getElementById('open-clearance-btn').addEventListener('click', function () {
  showScreen(clearanceScreen);
  loadClearanceRequests();
});

document.getElementById('clearance-back-btn').addEventListener('click', function () {
  showScreen(clientsScreen);
});


/* ============================================================
   الترشيح — مين جاب العميل ده
   المدرب أو المتخصص اللي بيجيب عملاء للمنصة لازم ياخد حقه،
   وعشان ياخده لازم يبقى مسجّل مين جاب مين
   ============================================================ */

/* ============================================================
   عرفتنا منين
   سؤال صغير بس بيقول لنا مجهود الإعلان بيرجع منين فعلًا. بيتخزّن
   مع العميل وبيظهر للمدرب، وبيتجمّع في التقرير اليومي
   ============================================================ */

const SOURCE_KEYS = ['instagram', 'facebook', 'tiktok', 'whatsapp', 'youtube', 'google', 'friend', 'gym', 'other'];

const SOURCE_ICONS = {
  instagram: 'instagram',
  facebook:  'facebook',
  tiktok:    'tiktok',
  whatsapp:  'whatsapp',
  youtube:   'youtube',
  google:    'search',
  friend:    'friend',
  gym:       'training',
  other:     'sparkle'
};

function sourceName(key) {
  return t('src_' + key);
}

let obSource = '';

function renderSourceRow() {
  const row = document.getElementById('ob-source-row');
  const other = document.getElementById('ob-source-other');
  if (!row) return;
  row.innerHTML = '';
  SOURCE_KEYS.forEach(function (key) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'src-chip' + (obSource === key ? ' selected' : '');
    chip.setAttribute('data-key', key);
    const icon = document.createElement('span');
    icon.className = 'src-chip-icon';
    icon.appendChild(iconSvg(SOURCE_ICONS[key] || 'sparkle', 'ui-icon'));
    const label = document.createElement('span');
    label.textContent = sourceName(key);
    chip.appendChild(icon);
    chip.appendChild(label);
    chip.addEventListener('click', function () {
      obSource = (obSource === key) ? '' : key;
      renderSourceRow();
      updateObProgress();
    });
    row.appendChild(chip);
  });
  if (other) other.classList.toggle('hidden', obSource !== 'other');
}

let obReferrer = '';
let refProviders = [];

async function loadReferrerOptions() {
  if (refProviders.length) return refProviders;
  try {
    const snapshot = await getDocs(collection(db, 'providers'));
    refProviders = snapshot.docs.map(providerFromDoc);
  } catch (error) {
    refProviders = [];
  }
  return refProviders;
}

function renderReferrerRow() {
  const row = document.getElementById('ob-ref-row');
  const picked = document.getElementById('ob-ref-picked');
  const search = document.getElementById('ob-ref-search');
  if (!row || !picked) return;

  const term = ((search && search.value) || '').trim().toLowerCase();
  row.innerHTML = '';

  const matches = refProviders.filter(function (provider) {
    if (!term) return true;
    return String(provider.name || '').toLowerCase().indexOf(term) !== -1;
  }).slice(0, 12);

  matches.forEach(function (provider) {
    const pick = document.createElement('button');
    pick.type = 'button';
    pick.className = 'avatar-pick ref-pick' + (obReferrer === provider.email ? ' selected' : '');
    pick.appendChild(providerAvatar(provider));
    const name = document.createElement('span');
    name.className = 'ap-name';
    name.textContent = providerShortName(provider);
    pick.appendChild(name);
    pick.addEventListener('click', function () {
      const key = provider.email || provider.id || '';
      obReferrer = (obReferrer === key) ? '' : key;
      renderReferrerRow();
    });
    row.appendChild(pick);
  });

  const chosen = refProviders.filter(function (p) { return p.email === obReferrer; })[0];
  picked.classList.toggle('hidden', !chosen);
  picked.textContent = chosen ? fill('ob_ref_picked', { name: chosen.name || chosen.email }) : '';
}

const obRefSearch = document.getElementById('ob-ref-search');
if (obRefSearch) obRefSearch.addEventListener('input', renderReferrerRow);


/* ---------- شاشة المدرب: كارت الحالة والبوابة الطبية ---------- */

let coachHealth = null;

/*
 * المدرب لازم يشوف ظروف العميل قبل ما يكتب البرنامج: بيتمرن كام يوم،
 * بياكل كام وجبة، ونومه شكله إيه. من غير السطر ده الإجابات بتتسجّل
 * في الداتابيز ومحدش بيقراها
 */
let coachBasicsData = null;

/* جدول العميل الأسبوعي في سطر واحد: السبت كورة ٦:٣٠م · الاتنين سباحة */
function scheduleLine(data) {
  const rows = (data && Array.isArray(data.sportSchedule)) ? data.sportSchedule : [];
  if (!rows.length) return '';
  const dayNames = days();
  const out = [];
  for (let d = 0; d < 7; d++) {
    const mine = clientScheduleForDay(data, d);
    if (!mine.length) continue;
    out.push((dayNames[d] || '') + ' ' + mine.map(scheduleSessionText).join(' + '));
  }
  return out.join('  ·  ');
}

/* 18:30 → ٦:٣٠ م */
function prettyTime(value) {
  const parts = String(value || '').split(':');
  if (parts.length < 2) return value || '';
  const h = Number(parts[0]);
  if (isNaN(h)) return value;
  const suffix = lang === 'ar' ? (h < 12 ? 'ص' : 'م') : (h < 12 ? 'AM' : 'PM');
  const h12 = (h % 12) || 12;
  return h12 + ':' + parts[1] + ' ' + suffix;
}

function renderCoachBasics() {
  if (!coachBasics) return;
  const data = coachBasicsData;
  if (!data) { coachBasics.classList.add('hidden'); return; }
  const bits = [];
  if (data.trainingDaysPref) {
    bits.push({ icon: 'classes', label: t('cb_days'), value: trainingDaysName(String(data.trainingDaysPref)) });
  }
  if (data.mealsPerDay) {
    bits.push({ icon: 'nutrition', label: t('cb_meals'), value: mealsPerDayName(String(data.mealsPerDay)) });
  }
  if (data.heardFrom) {
    bits.push({
      icon: SOURCE_ICONS[data.heardFrom] || 'sparkle',
      label: t('heard_from_label'),
      value: data.heardFrom === 'other' && data.heardFromNote
        ? data.heardFromNote
        : sourceName(data.heardFrom)
    });
  }
  if (data.sleepHours) {
    bits.push({
      icon: 'sleep_short',
      label: t('cb_sleep_amount'),
      value: sleepHoursName(data.sleepHours)
        + (data.sleepBlocks && data.sleepBlocks !== '1'
            ? ' · ' + sleepBlocksName(data.sleepBlocks) : ''),
      warn: data.sleepHours === 'lt5'
    });
  }
  if (data.sleepQuality) {
    bits.push({
      icon: SLEEP_QUALITY_ICONS[data.sleepQuality] || 'sleep_solid',
      label: t('cb_sleep'),
      value: sleepQualityName(data.sleepQuality),
      warn: data.sleepQuality !== 'solid'
    });
  }
  const sched = scheduleLine(data);
  if (!bits.length && !sched) { coachBasics.classList.add('hidden'); return; }
  coachBasics.classList.remove('hidden');
  coachBasics.innerHTML = '';
  bits.forEach(function (bit) {
    const box = document.createElement('div');
    box.className = 'cbasic' + (bit.warn ? ' warn' : '');
    const icon = document.createElement('span');
    icon.className = 'cbasic-icon';
    icon.appendChild(iconSvg(bit.icon, 'ui-icon'));
    const text = document.createElement('div');
    const label = document.createElement('span');
    label.className = 'cbasic-label';
    label.textContent = bit.label;
    const value = document.createElement('strong');
    value.className = 'cbasic-value';
    value.textContent = bit.value;
    text.appendChild(label);
    text.appendChild(value);
    box.appendChild(icon);
    box.appendChild(text);
    coachBasics.appendChild(box);
  });

  /*
   * الجدول على عرض السطر كله — المدرب لازم يشوف إن العميل عنده
   * كورة الأحد ٦ مساءً قبل ما يحطله رجل تقيلة السبت
   */
  if (sched) {
    const row = document.createElement('div');
    row.className = 'cbasic cbasic-wide';
    row.appendChild(iconSvg('classes', 'ui-icon'));
    const text = document.createElement('div');
    const label = document.createElement('span');
    label.className = 'cbasic-label';
    label.textContent = t('cb_schedule');
    const value = document.createElement('strong');
    value.className = 'cbasic-value';
    value.textContent = sched;
    text.appendChild(label);
    text.appendChild(value);
    row.appendChild(text);
    coachBasics.appendChild(row);
  }
}

function renderCoachHealth() {
  const card = document.getElementById('coach-health');
  if (!card) return;

  const items = activeHealthItems(coachHealth);
  const hasCycle = cycleActive(coachHealth);
  card.classList.toggle('hidden', !items.length && !hasCycle);
  if (!items.length && !hasCycle) return;

  const names = document.getElementById('ch-names');
  names.innerHTML = '';
  items.forEach(function (item) {
    const pill = document.createElement('span');
    pill.className = 'ch-pill';
    let label = healthName(item);
    if (item.key === 'pregnancy' && item.week) {
      label += ' · ' + fill('preg_week_of', { n: item.week });
    }
    pill.appendChild(healthIconEl(item));
    pill.appendChild(document.createTextNode(' ' + label));
    names.appendChild(pill);
  });

  /* طور الدورة الحالي قدام المدرب — عشان يقرا الأداء صح */
  if (cycleActive(coachHealth)) {
    const day = cycleDayOf(coachHealth.cycle);
    const key = cyclePhaseOf(day);
    const phase = CYCLE_PHASES[key];
    if (day && phase) {
      const pill = document.createElement('span');
      pill.className = 'ch-pill cyc';
      pill.appendChild(healthIconEl({ key: key }));
      pill.appendChild(document.createTextNode(' ' + (phase[lang] || phase.ar)
        + ' · ' + fill('cycle_day_of', { n: day })));
      names.appendChild(pill);
    }
  }

  const note = document.getElementById('ch-note');
  note.textContent = coachHealth.note || '';
  note.classList.toggle('hidden', !coachHealth.note);

  /*
   * البوابة: الحالات اللي محتاجة إذن طبي، البرنامج بيفضل
   * متعلّم عليه "لسه مش متأكد" لحد ما الطبيب يكتب موافقته.
   * التطبيق مش بيمنع المدرب — بيمنع إنه ينسى
   */
  const gate = document.getElementById('ch-gate');
  const needs = needsClearance(coachHealth);
  gate.classList.toggle('hidden', !needs);
  card.classList.toggle('blocked', needs && !clearanceOk(coachHealth));

  if (needs) {
    const status = clearanceStatusOf(coachHealth);
    const title = document.getElementById('ch-gate-title');
    const text = document.getElementById('ch-gate-text');
    const btn = document.getElementById('ch-request-clearance');
    const docNote = (coachHealth.clearance && coachHealth.clearance.note) || '';

    gate.className = 'ch-gate ' + status;
    title.textContent = clearanceTitle(status);

    if (status === 'cleared' || status === 'restricted' || status === 'denied') {
      const base = status === 'cleared' ? t('clearance_ok_coach')
                 : status === 'restricted' ? t('clearance_restricted_coach')
                 : t('clearance_denied_coach');
      text.textContent = docNote ? (base + ' — ' + t('clearance_doctor_note') + ': ' + docNote) : base;
      /* المرفوض يقدر يتطلب تاني بعد ما الحالة تتغيّر */
      btn.classList.toggle('hidden', status !== 'denied');
    } else if (status === 'requested') {
      text.textContent = t('clearance_waiting_coach');
      btn.classList.add('hidden');
    } else {
      text.textContent = t('clearance_needed_coach');
      btn.classList.remove('hidden');
    }
  }
}

/*
 * طلب الإذن بيتبعت كاستشارة عادية للطبيب في فريق العميل —
 * نفس الصندوق اللي بيرد منه على أي استشارة، فمفيش مسار جديد يتعلّمه
 */
document.getElementById('ch-request-clearance').addEventListener('click', async function () {
  const message = document.getElementById('ch-gate-message');
  if (!currentClient) return;
  message.textContent = t('saving');
  try {
    const items = activeHealthItems(coachHealth).map(healthName).join(' · ');
    await addDoc(collection(db, 'consultRequests'), {
      clientEmail: currentClient,
      clientName: currentClientName || currentClient,
      providerEmail: '',
      fromProvider: currentProviderEmail || COACH_EMAIL.toLowerCase(),
      kind: 'clearance',
      text: fill('clearance_request_text', { name: currentClientName || currentClient, list: items }),
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    coachHealth.clearance.status = 'requested';
    await setDoc(doc(db, 'health', currentClient), { clearance: coachHealth.clearance }, { merge: true });
    renderCoachHealth();
    setStatusMessage(message, t('clearance_sent'), 'success');
  } catch (error) {
    message.textContent = t('problem') + error.message;
  }
});

document.getElementById('ch-open-btn').addEventListener('click', function () {
  /* نفس شيت العميل بالظبط — بس بالبيانات اللي المدرب فاتحها */
  const keep = clientHealth;
  clientHealth = coachHealth;
  renderSafetySheet();
  clientHealth = keep;
  safetySheet.classList.remove('hidden');
  document.body.classList.add('focus-open');
});


/* ---------- شاشة العميل: شريط الأمان وشيت علامات التوقّف ---------- */

function renderSafetyBanner() {
  const banner = document.getElementById('client-safety-banner');
  if (!banner) return;

  const items = activeHealthItems(clientHealth);
  const hasCycle = cycleActive(clientHealth);
  /* الشريط بيبان كمان لو الدورة بس متابَعة — عشان توصل لنصايح الفترة */
  banner.classList.toggle('hidden', !items.length && !hasCycle);
  if (!items.length && !hasCycle) return;

  const names = items.map(healthName);
  if (hasCycle) {
    const day = cycleDayOf(clientHealth.cycle);
    const phase = CYCLE_PHASES[cyclePhaseOf(day)];
    if (day && phase) names.push(phase[lang] || phase.ar);
  }
  document.getElementById('sb-title').textContent = names.join(' · ');

  const sub = document.getElementById('sb-sub');
  if (clientHealth.pregnancy.active && clientHealth.pregnancy.week) {
    const tri = trimesterOf(clientHealth.pregnancy.week);
    sub.textContent = fill('preg_week_of', { n: clientHealth.pregnancy.week }) + (tri ? ' · ' + t('preg_' + tri) : '');
  } else {
    sub.textContent = t('safety_sub');
  }

  /* حالة الإذن الطبي بتبان للعميل كمان — عشان يعرف هو مستني إيه */
  banner.classList.toggle('waiting', needsClearance(clientHealth) && !clearanceOk(clientHealth));
}

function safetyListBlock(titleText, lines, kind) {
  const box = document.createElement('div');
  box.className = 'safety-list ' + kind;

  const title = document.createElement('div');
  title.className = 'sl-title';
  title.textContent = titleText;
  box.appendChild(title);

  const ul = document.createElement('ul');
  lines.forEach(function (line) {
    const li = document.createElement('li');
    li.textContent = line;
    ul.appendChild(li);
  });
  box.appendChild(ul);
  return box;
}

function renderSafetySheet() {
  const body = document.getElementById('safety-body');
  if (!body) return;
  body.innerHTML = '';

  const items = activeHealthItems(clientHealth);
  if (!items.length && !cycleActive(clientHealth)) return;

  /* حالة الإذن الطبي الأول — دي أهم معلومة للعميل */
  if (needsClearance(clientHealth)) {
    const status = clearanceStatusOf(clientHealth);
    const card = document.createElement('div');
    card.className = 'clearance-card ' + status;
    const head = document.createElement('div');
    head.className = 'cc-title';
    head.textContent = clearanceTitle(status);
    card.appendChild(head);
    const text = document.createElement('p');
    text.className = 'cc-text';
    const docNote = (clientHealth.clearance && clientHealth.clearance.note) || '';
    if (status === 'cleared') text.textContent = docNote || t('clearance_ok_text');
    else if (status === 'restricted') text.textContent = docNote || t('clearance_restricted_text');
    else if (status === 'denied') text.textContent = docNote || t('clearance_denied_text');
    else text.textContent = t('clearance_needed_text');
    card.appendChild(text);
    body.appendChild(card);
  }

  if (cycleActive(clientHealth)) {
    const day = cycleDayOf(clientHealth.cycle);
    const key = cyclePhaseOf(day);
    const phase = CYCLE_PHASES[key];
    if (day && phase) {
      const block = document.createElement('div');
      block.className = 'safety-item';

      const head = document.createElement('div');
      head.className = 'si-head';
      const icon = document.createElement('span');
      icon.className = 'si-icon';
      icon.appendChild(healthIconEl({ key: key }));
      head.appendChild(icon);
      const name = document.createElement('span');
      name.textContent = (phase[lang] || phase.ar) + ' · ' + fill('cycle_day_of', { n: day });
      head.appendChild(name);
      block.appendChild(head);

      block.appendChild(safetyListBlock(t('cycle_train_title'),
        (phase.train && phase.train[lang]) || phase.train.ar || [], 'care'));
      block.appendChild(safetyListBlock(t('cycle_flags_title'),
        CYCLE_RED_FLAGS[lang] || CYCLE_RED_FLAGS.ar, 'stop'));

      body.appendChild(block);
    }
  }

  items.forEach(function (item) {
    const block = document.createElement('div');
    block.className = 'safety-item';

    const head = document.createElement('div');
    head.className = 'si-head';
    const icon = document.createElement('span');
    icon.className = 'si-icon';
    icon.appendChild(healthIconEl(item));
    head.appendChild(icon);
    const name = document.createElement('span');
    name.textContent = healthName(item);
    head.appendChild(name);
    block.appendChild(head);

    const care = (item.care && item.care[lang]) || (item.care && item.care.ar) || [];
    const stop = (item.stop && item.stop[lang]) || (item.stop && item.stop.ar) || [];
    if (care.length) block.appendChild(safetyListBlock(t('safety_care'), care, 'care'));
    if (stop.length) block.appendChild(safetyListBlock(t('safety_stop'), stop, 'stop'));

    body.appendChild(block);
  });
}

const safetySheet = document.getElementById('safety-sheet');

document.getElementById('sb-open-btn').addEventListener('click', function () {
  renderSafetySheet();
  safetySheet.classList.remove('hidden');
  document.body.classList.add('focus-open');
});

document.getElementById('safety-close').addEventListener('click', function () {
  safetySheet.classList.add('hidden');
  document.body.classList.remove('focus-open');
});


function healthPayloadFromForm() {
  const weekInput = document.getElementById('ob-preg-week');
  const noteInput = document.getElementById('ob-health-note');
  const cycLast = document.getElementById('ob-cycle-last');
  const cycLen = document.getElementById('ob-cycle-len');
  return {
    conditions: obConditions.slice(),
    pregnancy: { active: obPregnant, week: obPregnant ? (Number(weekInput && weekInput.value) || 0) : 0 },
    postpartum: obPostpartum,
    cycle: {
      track: obCycleTrack && !obPregnant,
      lastPeriod: (cycLast && cycLast.value) || '',
      length: Number(cycLen && cycLen.value) || 28
    },
    note: (noteInput && noteInput.value.trim()) || ''
  };
}

/* ============================ التقييمات والريفيوهات ============================ */

let allProviderReviews = [];

function starIconSvg(filled) {
  return '<svg class="ui-icon star-icon" viewBox="0 0 24 24" fill="' + (filled ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8z"></path></svg>';
}

async function fetchAllProviderReviews() {
  try {
    const snapshot = await getDocs(collection(db, 'providerReviews'));
    allProviderReviews = snapshot.docs.map(function (item) {
      return item.data();
    });
  } catch (error) {
    allProviderReviews = [];
  }
}

function ratingStatsFor(providerEmail) {
  const list = allProviderReviews.filter(function (review) {
    return review.providerEmail === providerEmail;
  });
  if (!list.length) return { avg: 0, count: 0 };
  const sum = list.reduce(function (total, review) {
    return total + (Number(review.rating) || 0);
  }, 0);
  return { avg: sum / list.length, count: list.length };
}

function starsDisplayMarkup(avg, count) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += starIconSvg(i <= Math.round(avg));
  }
  const label = count > 0 ? (avg.toFixed(1) + ' (' + count + ')') : t('no_reviews_yet');
  return '<span class="stars-row">' + stars + '</span><span>' + label + '</span>';
}

/* ============================ الاشتراكات والأسعار ============================ */

function isLegacyCoachAccount() {
  return !!currentProviderEmail && currentProviderEmail.toLowerCase() === COACH_EMAIL.toLowerCase();
}

/*
 * فريق إداري كامل الصلاحية: صاحب المنصة (isLegacyCoachAccount) يقدر
 * يمنح متخصصين موجودين صلاحية إدارية كاملة زيه بالظبط (حقل isAdminTeam
 * على مستند المتخصص نفسه). القاعدة الأمنية في firestore.rules بتمنع
 * أي حد يمنح نفسه الصلاحية دي — بس صاحب المنصة أو عضو إداري موجود
 * فعلاً يقدر يحطها لغيره
 */
function isFullAdminAccount() {
  return isLegacyCoachAccount() || !!(currentProviderData && currentProviderData.isAdminTeam);
}

/*
 * accessOverride بيتحط يدويًا من لوحة التحكم على مستند العميل أو
 * المتخصص: { until: 'YYYY-MM-DD' } معناها وصول ممدود لغاية تاريخ
 * معين حتى لو التجربة خلصت، و { blocked: true } معناها إيقاف
 * الوصول تمامًا بغض النظر عن أي حاجة تانية.
 */
function accessOverrideActive(data) {
  if (!data || !data.accessOverride || !data.accessOverride.until) return false;
  const untilDate = new Date(data.accessOverride.until);
  if (isNaN(untilDate.getTime())) return false;
  const todayOnly = new Date(new Date().toISOString().slice(0, 10));
  return untilDate >= todayOnly;
}

function isAccessBlocked(data) {
  return !!(data && data.accessOverride && data.accessOverride.blocked);
}

let cachedPlans = [];
let paymentSettings = null;

async function fetchPlans() {
  try {
    const snapshot = await getDocs(collection(db, 'plans'));
    cachedPlans = snapshot.docs
      .map(function (item) { return Object.assign({ id: item.id }, item.data()); })
      .filter(function (plan) { return plan.active !== false; })
      .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
  } catch (error) {
    cachedPlans = [];
  }
  return cachedPlans;
}

async function fetchPaymentSettings() {
  try {
    const settingsDoc = await getDoc(doc(db, 'settings', 'payment'));
    paymentSettings = settingsDoc.exists() ? settingsDoc.data() : null;
  } catch (error) {
    paymentSettings = null;
  }
  return paymentSettings;
}

function planName(plan) {
  return (lang === 'ar' ? plan.nameAr : plan.nameEn) || plan.nameAr || plan.nameEn || '';
}

function planFeaturesList(plan) {
  const raw = (lang === 'ar' ? plan.featuresAr : plan.featuresEn) || '';
  return raw.split('\n').map(function (line) { return line.trim(); }).filter(Boolean);
}

function planOfferLabel(plan) {
  return (lang === 'ar' ? plan.offerLabelAr : plan.offerLabelEn) || plan.offerLabelAr || plan.offerLabelEn || '';
}

function planHasOffer(plan) {
  return plan.offerPrice !== undefined && plan.offerPrice !== null && plan.offerPrice !== '' && !isNaN(Number(plan.offerPrice));
}

function planEffectivePrice(plan) {
  return planHasOffer(plan) ? Number(plan.offerPrice) : Number(plan.price) || 0;
}

// جديد: مدة الاشتراك (شهر / 3 شهور / 6 شهور / سنة) — حقل durationMonths
// اختياري على مستند الخطة؛ لو مش موجود (خطط قديمة اتعملت قبل الميزة دي)
// بيتحسب شهر واحد تلقائيًا عشان الشكل يفضل زي ما هو بالظبط من غير أي تغيير
const PLAN_DURATIONS = [1, 3, 6, 12];

function planDurationMonths(plan) {
  const months = Number(plan && plan.durationMonths);
  return PLAN_DURATIONS.indexOf(months) !== -1 ? months : 1;
}

function planDurationOptionLabel(months) {
  return t('plan_duration_opt_' + months);
}

function planDurationSuffix(plan) {
  return t('plan_duration_suffix_' + planDurationMonths(plan));
}

function fillPlanDurationSelect(select, selectedMonths) {
  select.innerHTML = '';
  PLAN_DURATIONS.forEach(function (months) {
    const option = document.createElement('option');
    option.value = String(months);
    option.textContent = planDurationOptionLabel(months);
    select.appendChild(option);
  });
  select.value = String(PLAN_DURATIONS.indexOf(Number(selectedMonths)) !== -1 ? Number(selectedMonths) : 1);
}

function paymentInstructionLines() {
  const lines = [];
  if (paymentSettings) {
    if (paymentSettings.vodafoneNumber) lines.push(t('payment_method_vodafone') + ': ' + paymentSettings.vodafoneNumber);
    if (paymentSettings.instapayHandle) lines.push(t('payment_method_instapay') + ': ' + paymentSettings.instapayHandle);
    if (paymentSettings.bankDetails) lines.push(t('payment_method_bank') + ': ' + paymentSettings.bankDetails);
  }
  return lines;
}

async function submitPaymentRequest(plan, method, reference, noteText, messageEl, targetEmail) {
  if (!method || !reference.trim()) {
    messageEl.textContent = t('need_payment_fields');
    return;
  }
  messageEl.textContent = t('saving');
  try {
    await setDoc(doc(db, 'clients', targetEmail), {
      pendingPayment: {
        planId: plan.id,
        planName: planName(plan),
        amount: planEffectivePrice(plan),
        method: method,
        reference: reference.trim(),
        note: noteText.trim(),
        submittedAt: new Date().toISOString(),
        status: 'submitted'
      }
    }, { merge: true });
    setStatusMessage(messageEl, t('payment_submitted_msg'), 'success');
    return true;
  } catch (error) {
    messageEl.textContent = t('problem') + error.message;
    return false;
  }
}

function buildPlanCard(plan, allowSubmit, targetEmail, onSubmitted, submitFn) {
  const doSubmit = submitFn || submitPaymentRequest;
  const card = document.createElement('div');
  card.className = 'plan-card';

  const name = document.createElement('div');
  name.className = 'plan-name';
  name.textContent = planName(plan);
  card.appendChild(name);

  const priceRow = document.createElement('div');
  priceRow.className = 'plan-price-row';
  const durationSuffix = planDurationSuffix(plan);
  if (planHasOffer(plan)) {
    const original = document.createElement('span');
    original.className = 'plan-price-original';
    original.textContent = fill('plan_price_label', { price: plan.price });
    priceRow.appendChild(original);

    const offer = document.createElement('span');
    offer.className = 'plan-price-offer';
    offer.textContent = fill('plan_offer_label', { price: plan.offerPrice, original: plan.price }) + ' ' + durationSuffix;
    priceRow.appendChild(offer);
  } else {
    const price = document.createElement('span');
    price.textContent = fill('plan_price_label', { price: plan.price }) + ' ' + durationSuffix;
    priceRow.appendChild(price);
  }
  card.appendChild(priceRow);

  const offerLabel = planOfferLabel(plan);
  if (offerLabel) {
    const badge = document.createElement('div');
    badge.className = 'plan-offer-badge';
    badge.textContent = offerLabel;
    card.appendChild(badge);
  }

  const features = planFeaturesList(plan);
  if (features.length) {
    const list = document.createElement('ul');
    list.className = 'plan-features';
    features.forEach(function (feature) {
      const item = document.createElement('li');
      item.textContent = feature;
      list.appendChild(item);
    });
    card.appendChild(list);
  }

  if (allowSubmit) {
    const chooseBtn = document.createElement('button');
    chooseBtn.type = 'button';
    chooseBtn.className = 'secondary';
    chooseBtn.textContent = t('choose_plan_btn');
    card.appendChild(chooseBtn);

    const form = document.createElement('div');
    form.className = 'plan-pay-form hidden';

    const methodSelect = document.createElement('select');
    [
      ['vodafone_cash', 'payment_method_vodafone'],
      ['instapay', 'payment_method_instapay'],
      ['bank_transfer', 'payment_method_bank']
    ].forEach(function (pair) {
      const option = document.createElement('option');
      option.value = pair[0];
      option.textContent = t(pair[1]);
      methodSelect.appendChild(option);
    });
    form.appendChild(methodSelect);

    const referenceInput = document.createElement('input');
    referenceInput.type = 'text';
    referenceInput.placeholder = t('payment_reference_ph');
    form.appendChild(referenceInput);

    const noteInput = document.createElement('textarea');
    noteInput.rows = 2;
    noteInput.placeholder = t('payment_note_ph');
    form.appendChild(noteInput);

    const submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.textContent = t('submit_payment_btn');
    form.appendChild(submitBtn);

    const formMessage = document.createElement('p');
    formMessage.className = 'message';
    form.appendChild(formMessage);

    chooseBtn.addEventListener('click', function () {
      form.classList.toggle('hidden');
    });

    submitBtn.addEventListener('click', async function () {
      const ok = await doSubmit(plan, methodSelect.value, referenceInput.value, noteInput.value, formMessage, targetEmail);
      if (ok && typeof onSubmitted === 'function') onSubmitted();
    });

    card.appendChild(form);
  }

  return card;
}

function renderPlansInto(container, allowSubmit, targetEmail, onSubmitted, plansList, submitFn, emptyTextKey) {
  container.innerHTML = '';
  const plans = plansList || cachedPlans;

  if (allowSubmit) {
    const lines = paymentInstructionLines();
    const info = document.createElement('p');
    info.className = 'or';
    info.textContent = lines.length ? (t('payment_settings_note') + ' — ' + lines.join(' / ')) : t('no_payment_settings');
    container.appendChild(info);
  }

  if (!plans.length) {
    if (emptyTextKey) {
      const empty = document.createElement('p');
      empty.className = 'or';
      empty.textContent = t(emptyTextKey);
      container.appendChild(empty);
    }
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'plans-grid';
  plans.forEach(function (plan) {
    grid.appendChild(buildPlanCard(plan, allowSubmit, targetEmail, onSubmitted, submitFn));
  });
  container.appendChild(grid);
}

/* ============================ الشات (العميل والفريق والمساعد الذكي) ============================ */

const chatInboxList = document.getElementById('chat-inbox-list');
const chatInboxEmpty = document.getElementById('chat-inbox-empty');
const chatTitleText = document.getElementById('chat-title-text');
const chatMessagesList = document.getElementById('chat-messages-list');
const chatInput = document.getElementById('chat-input');
const chatMessage = document.getElementById('chat-message');

function chatViewerIsCoach() {
  return !!currentProviderEmail;
}

function stopChatListener() {
  if (chatUnsub) {
    try { chatUnsub(); } catch (error) { /* تجاهل */ }
    chatUnsub = null;
  }
}

function renderChatMessages(messages) {
  chatMessagesList.innerHTML = '';

  if (!messages.length) {
    const empty = document.createElement('p');
    empty.className = 'chat-empty-note';
    empty.textContent = t('chat_empty_note');
    chatMessagesList.appendChild(empty);
    return;
  }

  const viewerIsCoach = chatViewerIsCoach();

  messages.forEach(function (msg) {
    const mine = viewerIsCoach ? (msg.sender === 'coach') : (msg.sender === 'client');

    const row = document.createElement('div');
    row.className = 'chat-bubble-row ' + (mine ? 'mine' : 'theirs') + (msg.sender === 'ai' ? ' ai' : '');

    if (!mine) {
      const senderLabel = document.createElement('div');
      senderLabel.className = 'chat-bubble-sender';
      if (msg.sender === 'ai') senderLabel.textContent = t('chat_sender_ai');
      else if (msg.sender === 'coach') senderLabel.textContent = t('chat_sender_coach');
      else senderLabel.textContent = viewerIsCoach ? clientNameOf(currentChatEmail) : '';
      row.appendChild(senderLabel);
    }

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = msg.text || '';
    row.appendChild(bubble);

    chatMessagesList.appendChild(row);
  });

  chatMessagesList.scrollTop = chatMessagesList.scrollHeight;
}

function startChatListener(email) {
  stopChatListener();
  try {
    const messagesQuery = query(collection(db, 'chats', email, 'messages'), orderBy('createdAt'));
    chatUnsub = onSnapshot(messagesQuery, function (snapshot) {
      const messages = snapshot.docs.map(function (item) { return item.data(); });
      renderChatMessages(messages);
    });
  } catch (error) {
    chatUnsub = null;
  }
}

function openChatThread(email, returnScreen) {
  currentChatEmail = email;
  chatReturnScreen = returnScreen;
  chatMessage.textContent = '';
  chatInput.value = '';
  chatTitleText.textContent = chatViewerIsCoach() ? fill('chat_thread_with', { name: clientNameOf(email) }) : t('chat_title');
  chatMessagesList.innerHTML = '';
  showScreen(chatScreen);
  startChatListener(email);
}


/* ============================================================
   المساعد الذكي — الطريق المجاني
   بدل Cloud Functions (اللي محتاجة خطة Blaze مدفوعة)، الرسالة
   بتروح لـ Google Apps Script وهو اللي بيكلّم Gemini بحصته
   المجانية ويرجّع الرد. والتأمين هنا مش بكلمة سر مشتركة: بنبعت
   توكن دخول العميل من فايربيز، وApps Script بيسأل فايربيز نفسها
   هو بتاع مين قبل ما يرد — فحد تاني ما يقدرش يستهلك الحصة
   ============================================================ */

let aiReplyPending = false;
/*
 * الرسايل اللي العميل بعتها والمساعد لسه بيرد على اللي قبلها.
 * من غير الطابور ده كانت بتتلغي في سكوت: العميل يبعت رسالتين ورا
 * بعض، يرد على الأولى وميردش على التانية خالص — وده كان شكله
 * إن المساعد "بيرد مرة وبعدين بيقف"
 */
let aiQueue = [];

function aiChatEnabled() {
  return !!(welcomeSettings && welcomeSettings.url && welcomeSettings.aiEnabled);
}

/* شوية سطور عن العميل عشان الرد يبقى ليه هو مش رد عام */
function aiClientContext() {
  const data = clientRecord || null;
  return {
    name: (clientName || '').split(' ')[0] || '',
    goal: (data && data.goal) ? goalName(data.goal) : '',
    sport: (data && data.sport) ? sportName(data.sport) : '',
    trainingDays: (data && data.trainingDaysPref) || ''
  };
}

function aiTyping(on) {
  const typing = document.getElementById('chat-typing');
  if (typing) typing.classList.toggle('hidden', !on);
}

/*
 * العميل بعت وإحنا لسه بنرد؟ نحط رسالته في الطابور بدل ما نرميها.
 * أول ما الرد الحالي يخلص بناخد اللي اتجمّع كله ونرد عليه مرة واحدة
 * — رد واحد مترابط أحسن من كذا رد مقطّع
 */
function requestAiReply(text) {
  if (!aiChatEnabled()) return;
  if (chatViewerIsCoach()) return;
  aiQueue.push(text);
  if (aiReplyPending) return;
  runAiQueue();
}

async function runAiQueue() {
  if (aiReplyPending || !aiQueue.length) return;
  aiReplyPending = true;
  aiTyping(true);

  const batch = aiQueue.join('\n');
  aiQueue = [];
  const conf = welcomeSettings;

  try {
    const user = auth.currentUser;
    const idToken = user ? await user.getIdToken() : '';
    if (!idToken) { aiFailed('not signed in'); return; }

    const res = await fetch(conf.url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'ai_chat',
        idToken: idToken,
        clientEmail: currentChatEmail,
        text: batch,
        lang: lang,
        context: aiClientContext()
      })
    });
    const data = await res.json().catch(function () { return null; });

    if (!data || !data.ok || !data.reply) {
      // السبب بييجي من السيرفر نفسه — بنطبعه زي ما هو عشان يبان
      aiFailed((data && data.error) || ('http ' + res.status), data && data.build);
      return;
    }

    await addDoc(collection(db, 'chats', currentChatEmail, 'messages'), {
      sender: 'ai',
      text: data.reply,
      createdAt: new Date().toISOString()
    });
    await setDoc(doc(db, 'chats', currentChatEmail), {
      clientEmail: currentChatEmail,
      lastMessage: data.reply,
      lastMessageAt: new Date().toISOString(),
      lastSender: 'ai'
    }, { merge: true });
  } catch (error) {
    aiFailed(error && error.message ? error.message : 'network');
  } finally {
    aiReplyPending = false;
    aiTyping(false);
    // لو العميل بعت تاني وإحنا بنرد، نرد على اللي اتجمّع
    if (aiQueue.length) runAiQueue();
  }
}

/*
 * فشل المساعد مش بيوقف الشات — رسالة العميل وصلت لمدربه فعلًا.
 * بس السكوت التام كان بيخلي أي مشكلة مستحيل تتشاف، فبنكتب السبب
 * في الكونسول (للمطوّر) وسطر هادي للعميل إنه هيرد عليه مدربه
 */
function aiFailed(reason, build) {
  try {
    console.warn('[ADAM] AI reply failed:', reason, build ? ('| script build: ' + build) : '| script build: (قديم — مفيش build)');
  } catch (e) { /* تجاهل */ }
  const box = document.getElementById('chat-message');
  if (box) setStatusMessage(box, t('chat_ai_unavailable'), '');
}

async function sendChatMessage() {
  const text = chatInput.value.trim();
  if (!text || !currentChatEmail) return;

  const sender = chatViewerIsCoach() ? 'coach' : 'client';
  chatInput.value = '';
  chatMessage.textContent = '';

  try {
    await addDoc(collection(db, 'chats', currentChatEmail, 'messages'), {
      sender: sender,
      text: text,
      createdAt: new Date().toISOString()
    });
    await setDoc(doc(db, 'chats', currentChatEmail), {
      clientEmail: currentChatEmail,
      lastMessage: text,
      lastMessageAt: new Date().toISOString(),
      lastSender: sender
    }, { merge: true });
    notifyChat(text);
    requestAiReply(text);
  } catch (error) {
    chatMessage.textContent = t('problem') + error.message;
  }
}

document.getElementById('chat-send-btn').addEventListener('click', sendChatMessage);
chatInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendChatMessage();
  }
});

document.getElementById('open-chat-btn').addEventListener('click', function () {
  openChatThread(clientEmail, clientScreen);
});

document.getElementById('chat-back-btn').addEventListener('click', function () {
  stopChatListener();
  if (chatReturnScreen) showScreen(chatReturnScreen);
  else showScreen(chatViewerIsCoach() ? chatInboxScreen : clientScreen);
});

/* ---------- صندوق وارد المحادثات (المدرب/المتخصص) ---------- */

async function loadChatInbox() {
  chatInboxList.innerHTML = '';
  try {
    const snapshot = await getDocs(collection(db, 'chats'));
    const threads = snapshot.docs
      .map(function (item) { return item.data(); })
      .filter(function (row) { return row && row.clientEmail; })
      .sort(function (a, b) {
        return (b.lastMessageAt || '').localeCompare(a.lastMessageAt || '');
      });

    chatInboxEmpty.classList.toggle('hidden', threads.length > 0);

    threads.forEach(function (thread) {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'chat-inbox-item';

      const name = document.createElement('div');
      name.className = 'chat-inbox-item-name';
      name.textContent = clientNameOf(thread.clientEmail);
      item.appendChild(name);

      const preview = document.createElement('div');
      preview.className = 'chat-inbox-item-preview';
      const prefix = (thread.lastSender === 'ai') ? (t('chat_sender_ai') + ': ') : '';
      preview.textContent = prefix + (thread.lastMessage || '');
      item.appendChild(preview);

      item.addEventListener('click', function () {
        openChatThread(thread.clientEmail, chatInboxScreen);
      });

      chatInboxList.appendChild(item);
    });
  } catch (error) {
    chatInboxEmpty.classList.remove('hidden');
  }
}

document.getElementById('open-chat-inbox-btn').addEventListener('click', function () {
  showScreen(chatInboxScreen);
  loadChatInbox();
});

document.getElementById('chat-inbox-back-btn').addEventListener('click', function () {
  showScreen(clientsScreen);
  loadClients();
});

/* ---------- شاشة الاشتراك (العميل) ---------- */

const subscriptionStatusText = document.getElementById('subscription-status-text');
const subscriptionPaymentArea = document.getElementById('subscription-payment-area');
const subscriptionMessage = document.getElementById('subscription-message');

function renderSubscriptionStatus(data) {
  if (isAccessBlocked(data)) {
    subscriptionStatusText.textContent = t('subscription_status_blocked');
  } else if (accessOverrideActive(data)) {
    subscriptionStatusText.textContent = fill('subscription_status_active', { date: data.accessOverride.until });
  } else if (data.trialStartedAt) {
    const left = trialDaysLeft(data);
    subscriptionStatusText.textContent = (left !== null && left > 0) ? fill('subscription_status_trial', { n: left }) : t('subscription_status_none');
  } else {
    subscriptionStatusText.textContent = t('subscription_status_none');
  }
}

async function loadSubscriptionScreen() {
  subscriptionMessage.textContent = t('loading');
  subscriptionPaymentArea.innerHTML = '';
  try {
    const clientDoc = await getDoc(doc(db, 'clients', clientEmail));
    const data = clientDoc.exists() ? clientDoc.data() : {};
    renderSubscriptionStatus(data);

    const pending = data.pendingPayment;
    if (pending && pending.status === 'submitted') {
      const note = document.createElement('p');
      note.className = 'message';
      note.textContent = t('pending_payment_note');
      subscriptionPaymentArea.appendChild(note);
      subscriptionMessage.textContent = '';
      return;
    }

    if (pending && pending.status === 'rejected') {
      const note = document.createElement('p');
      setStatusMessage(note, t('payment_rejected_note'), 'warning');
      subscriptionPaymentArea.appendChild(note);
    }

    await fetchPlans();
    await fetchPaymentSettings();

    const plansBox = document.createElement('div');
    subscriptionPaymentArea.appendChild(plansBox);
    renderPlansInto(plansBox, true, clientEmail, loadSubscriptionScreen);

    subscriptionMessage.textContent = '';
  } catch (error) {
    subscriptionMessage.textContent = t('problem') + error.message;
  }
}

document.getElementById('open-subscription-btn').addEventListener('click', function () {
  showScreen(subscriptionScreen);
  loadSubscriptionScreen();
});

document.getElementById('subscription-back-btn').addEventListener('click', function () {
  showScreen(clientScreen);
});

/* ---------- اشتراك المتخصصين (كوتش/أخصائي غير صاحب المنصة) ---------- */

let cachedProviderPlans = [];

async function fetchProviderPlans(specialty) {
  try {
    const snapshot = await getDocs(collection(db, 'providerPlans'));
    cachedProviderPlans = snapshot.docs
      .map(function (item) { return Object.assign({ id: item.id }, item.data()); })
      .filter(function (plan) {
        return plan.active !== false && (plan.specialty === 'all' || plan.specialty === specialty);
      });
  } catch (error) {
    cachedProviderPlans = [];
  }
  return cachedProviderPlans;
}

async function submitProviderPaymentRequest(plan, method, reference, noteText, messageEl, targetEmail) {
  if (!method || !reference.trim()) {
    messageEl.textContent = t('need_payment_fields');
    return;
  }
  messageEl.textContent = t('saving');
  try {
    await setDoc(doc(db, 'providers', targetEmail), {
      pendingPayment: {
        planId: plan.id,
        planName: planName(plan),
        amount: planEffectivePrice(plan),
        method: method,
        reference: reference.trim(),
        note: noteText.trim(),
        submittedAt: new Date().toISOString(),
        status: 'submitted'
      }
    }, { merge: true });
    setStatusMessage(messageEl, t('payment_submitted_msg'), 'success');
    return true;
  } catch (error) {
    messageEl.textContent = t('problem') + error.message;
    return false;
  }
}

const providerSubscriptionStatusText = document.getElementById('provider-subscription-status-text');
const providerSubscriptionPaymentArea = document.getElementById('provider-subscription-payment-area');
const providerSubscriptionMessage = document.getElementById('provider-subscription-message');
const openProviderSubscriptionBtn = document.getElementById('open-provider-subscription-btn');
const providerSubBanner = document.getElementById('provider-sub-banner');
const providerSubBannerText = document.getElementById('provider-sub-banner-text');

function renderProviderSubscriptionStatus(data) {
  if (isAccessBlocked(data)) {
    providerSubscriptionStatusText.textContent = t('subscription_status_blocked');
  } else if (accessOverrideActive(data)) {
    providerSubscriptionStatusText.textContent = fill('subscription_status_active', { date: data.accessOverride.until });
  } else {
    providerSubscriptionStatusText.textContent = t('subscription_status_none');
  }
}

async function loadProviderSubscriptionScreen() {
  providerSubscriptionMessage.textContent = t('loading');
  providerSubscriptionPaymentArea.innerHTML = '';
  try {
    const providerDoc = await getDoc(doc(db, 'providers', currentProviderEmail));
    const data = providerDoc.exists() ? providerDoc.data() : {};
    renderProviderSubscriptionStatus(data);

    const pending = data.pendingPayment;
    if (pending && pending.status === 'submitted') {
      const note = document.createElement('p');
      note.className = 'message';
      note.textContent = t('pending_payment_note');
      providerSubscriptionPaymentArea.appendChild(note);
      providerSubscriptionMessage.textContent = '';
      return;
    }

    if (pending && pending.status === 'rejected') {
      const note = document.createElement('p');
      setStatusMessage(note, t('payment_rejected_note'), 'warning');
      providerSubscriptionPaymentArea.appendChild(note);
    }

    await fetchProviderPlans(currentProviderSpecialty);
    await fetchPaymentSettings();

    const plansBox = document.createElement('div');
    providerSubscriptionPaymentArea.appendChild(plansBox);
    renderPlansInto(plansBox, true, currentProviderEmail, loadProviderSubscriptionScreen, cachedProviderPlans, submitProviderPaymentRequest, 'provider_no_plans');

    providerSubscriptionMessage.textContent = '';
  } catch (error) {
    providerSubscriptionMessage.textContent = t('problem') + error.message;
  }
}

document.getElementById('open-provider-subscription-btn').addEventListener('click', function () {
  showScreen(providerSubscriptionScreen);
  loadProviderSubscriptionScreen();
});

document.getElementById('provider-subscription-back-btn').addEventListener('click', function () {
  showScreen(clientsScreen);
  loadClients();
});

document.getElementById('provider-sub-banner-btn').addEventListener('click', function () {
  showScreen(providerSubscriptionScreen);
  loadProviderSubscriptionScreen();
});

// تنبيه بس من غير أي قفل فعلي للوصول — لو المتخصص (غير صاحب المنصة)
// مالوش اشتراك فعّال (accessOverride) بيشوف رسالة تفكير بس، وبيفضل
// يستخدم كل مميزات المنصة عادي
async function refreshProviderSubBanner() {
  if (isFullAdminAccount()) {
    providerSubBanner.classList.add('hidden');
    return;
  }
  try {
    const providerDoc = await getDoc(doc(db, 'providers', currentProviderEmail));
    const data = providerDoc.exists() ? providerDoc.data() : {};
    if (isAccessBlocked(data) || accessOverrideActive(data)) {
      providerSubBanner.classList.add('hidden');
      return;
    }
    providerSubBannerText.textContent = t('provider_sub_banner_text');
    providerSubBanner.classList.remove('hidden');
  } catch (error) {
    providerSubBanner.classList.add('hidden');
  }
}

/* ---------- شاشة "انتهت التجربة / تم إيقاف الوصول" ---------- */

let currentAccessLockReason = 'trial';
let currentAccessLockEmail = '';

async function showAccessLocked(reason, targetEmail) {
  currentAccessLockReason = reason;
  if (targetEmail) currentAccessLockEmail = targetEmail;
  const titleEl = document.getElementById('trial-ended-title-text');
  const messageEl = document.getElementById('trial-ended-message-text');
  const plansBox = document.getElementById('trial-ended-plans');

  if (reason === 'blocked') {
    titleEl.textContent = t('access_blocked_title');
    messageEl.textContent = t('access_blocked_message');
    plansBox.innerHTML = '';
  } else if (reason === 'provider') {
    titleEl.textContent = t('access_blocked_title');
    messageEl.textContent = t('provider_blocked_message');
    plansBox.innerHTML = '';
  } else {
    titleEl.textContent = t('trial_ended_title');
    messageEl.textContent = t('trial_ended_message');
    try {
      await fetchPlans();
      await fetchPaymentSettings();
      renderPlansInto(plansBox, true, currentAccessLockEmail, function () { showAccessLocked('trial'); });
    } catch (error) {
      plansBox.innerHTML = '';
    }
  }
  showScreen(trialEndedScreen);
}

/* ---------- لوحة التحكم (الكوتش الأساسي بس) ---------- */

const settingsMessage = document.getElementById('settings-message');
const publicStatsMessage = document.getElementById('public-stats-message');
const adminPlansList = document.getElementById('admin-plans-list');
const plansAdminMessage = document.getElementById('plans-admin-message');
const newPlanDurationSelect = document.getElementById('new-plan-duration');
fillPlanDurationSelect(newPlanDurationSelect, 1);
const adminPaymentsList = document.getElementById('admin-payments-list');
const accessResultBox = document.getElementById('access-result-box');
const accessMessage = document.getElementById('access-message');

document.getElementById('open-admin-panel-btn').addEventListener('click', function () {
  showScreen(adminPanelScreen);
  renderAdminTabs();
  loadAdminPanel();
});

/*
 * عداد الرسايل الجديدة من الصفحة الرئيسية — بيظهر رقم أحمر على زرار
 * لوحة التحكم، فصاحب المنصة ياخد باله إن في حد مستني رد من غير ما
 * يفتح اللوحة كل شوية
 */
const adminLeadsBadge = document.getElementById('admin-leads-badge');

/*
 * عداد طلبات التخصص المستنية موافقتك — بيظهر على زرار "المتخصصين"
 * عشان ماتسيبش متخصص مستني أيام من غير ما تاخد بالك
 */
const pendingSpecsBadge = document.getElementById('pending-specs-badge');

async function refreshPendingSpecsBadge() {
  if (!pendingSpecsBadge) return;
  pendingSpecsBadge.classList.add('hidden');
  pendingSpecsBadge.textContent = '';
  if (!isFullAdminAccount()) return;
  try {
    const snapshot = await getDocs(collection(db, 'providers'));
    let pending = 0;
    snapshot.forEach(function (item) {
      pending += providerPendingSpecialties(item.data()).length;
    });
    if (pending) {
      pendingSpecsBadge.textContent = pending;
      pendingSpecsBadge.classList.remove('hidden');
    }
  } catch (error) {
    // مش مشكلة لو فشل العداد
  }
}

async function refreshLeadsBadge() {
  if (!adminLeadsBadge) return;
  adminLeadsBadge.classList.add('hidden');
  adminLeadsBadge.textContent = '';
  try {
    const snapshot = await getDocs(collection(db, 'leads'));
    let pending = 0;
    snapshot.forEach(function (item) {
      const data = item.data() || {};
      if (!data.contacted && !data.accepted) pending++;
    });
    if (pending) {
      adminLeadsBadge.textContent = pending;
      adminLeadsBadge.classList.remove('hidden');
    }
    renderCoachTiles();
  } catch (error) {
    // مش مشكلة لو فشل العداد — اللوحة نفسها بتعرض الرسايل عادي
  }
}

document.getElementById('admin-panel-back-btn').addEventListener('click', function () {
  showScreen(clientsScreen);
  loadClients();
});

/* ==================== التقرير اليومي ==================== */
/*
 * ملخّص سريع لكل اللي حصل في الموقع في آخر ٢٤ ساعة (أو آخر أسبوع):
 * عملاء جداد، رسايل تواصل، بلاغات إصابة، طلبات استشارة، طلبات متجر،
 * ومدفوعات مستنية. وتحته تنبيهات بالحاجات اللي محتاجة تدخّل منك —
 * زي بلاغ إصابة لسه محدش رد عليه أو اشتراك قرّب يخلص.
 *
 * كل ده بيتحسب من نفس البيانات اللي في Firestore وقت ما تفتح اللوحة،
 * فمفيش سيرفر ولا خدمة خارجية محتاجة تشتغل عشانه.
 */

let dailyReportDays = 1;

function reportSince(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

function countNewer(docs, since, field) {
  return docs.filter(function (item) {
    const stamp = item[field || 'createdAt'] || '';
    return stamp && stamp >= since;
  }).length;
}

/*
 * مستند العميل مفيهوش createdAt — فـ"عملاء جداد" كان دايمًا صفر.
 * تاريخ التسجيل الحقيقي trialStartedAt (يوم بس من غير ساعة)، فبنعتبره
 * آخر اليوم عشان العميل يتحسب مرة واحدة في تقرير اليوم اللي بعده
 */
function clientJoinedIso(item) {
  if (item.createdAt) return item.createdAt;
  return item.trialStartedAt ? String(item.trialStartedAt).slice(0, 10) + 'T23:59:59Z' : '';
}

async function collectionDocs(name) {
  try {
    const snapshot = await getDocs(collection(db, name));
    return snapshot.docs.map(function (item) { return Object.assign({ id: item.id }, item.data()); });
  } catch (error) {
    return [];
  }
}

function reportTile(value, label, danger) {
  const tile = document.createElement('div');
  tile.className = 'report-tile' + (danger && value > 0 ? ' report-tile-alert' : '');
  const num = document.createElement('div');
  num.className = 'report-value';
  num.textContent = value;
  tile.appendChild(num);
  const cap = document.createElement('div');
  cap.className = 'report-label';
  cap.textContent = label;
  tile.appendChild(cap);
  return tile;
}

async function loadDailyReport() {
  const grid = document.getElementById('daily-report-grid');
  const alerts = document.getElementById('daily-report-alerts');
  const timeNote = document.getElementById('daily-report-time');
  if (!grid) return;

  grid.innerHTML = '';
  alerts.innerHTML = '';
  timeNote.textContent = t('loading');

  const since = reportSince(dailyReportDays);

  const [clients, leads, injuries, consults, orders, providers] = await Promise.all([
    collectionDocs('clients'),
    collectionDocs('leads'),
    collectionDocs('injuryReports'),
    collectionDocs('consultRequests'),
    collectionDocs('storeOrders'),
    collectionDocs('providers')
  ]);

  // الدفعات المستنية مخزّنة جوه مستند العميل/المتخصص نفسه (pendingPayment)
  // مش في مجموعة لوحدها — فبنعدّها من الاتنين
  const payments = clients.concat(providers).filter(function (item) {
    return item.pendingPayment && item.pendingPayment.status === 'submitted';
  });

  grid.appendChild(reportTile(clients.filter(function (c) { const j = clientJoinedIso(c); return j && j >= since; }).length, t('report_new_clients')));
  grid.appendChild(reportTile(countNewer(leads, since), t('report_new_leads')));
  grid.appendChild(reportTile(countNewer(injuries, since), t('report_new_injuries')));
  grid.appendChild(reportTile(countNewer(consults, since), t('report_new_consults')));
  grid.appendChild(reportTile(countNewer(orders, since), t('report_new_orders')));
  grid.appendChild(reportTile(clients.length, t('report_total_clients')));

  // ---- تنبيهات محتاجة تدخّل ----
  const pendingInjuries = injuries.filter(function (r) { return (r.status || 'requested') === 'requested'; }).length;
  const pendingConsults = consults.filter(function (r) { return (r.status || 'pending') === 'pending'; }).length;
  const newLeads = leads.filter(function (l) { return !l.contacted && !l.accepted; }).length;
  const pendingPayments = payments.length;
  const newOrders = orders.filter(function (o) { return (o.status || 'new') === 'new'; }).length;

  const rows = [
    { n: pendingInjuries, text: t('report_alert_injuries') },
    { n: newLeads, text: t('report_alert_leads') },
    { n: pendingConsults, text: t('report_alert_consults') },
    { n: pendingPayments, text: t('report_alert_payments') },
    { n: newOrders, text: t('report_alert_orders') }
  ].filter(function (row) { return row.n > 0; });

  if (!rows.length) {
    const ok = document.createElement('p');
    ok.className = 'report-all-clear';
    ok.textContent = t('report_all_clear');
    alerts.appendChild(ok);
  } else {
    rows.forEach(function (row) {
      const line = document.createElement('div');
      line.className = 'report-alert';
      line.textContent = '• ' + fill(row.text, { n: row.n });
      alerts.appendChild(line);
    });
  }

  timeNote.textContent = fill('report_generated_at', {
    time: new Date().toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-GB'),
    range: dailyReportDays === 1 ? t('report_range_day') : t('report_range_week')
  });
}

if (document.getElementById('daily-report-refresh-btn')) {
  document.getElementById('daily-report-refresh-btn').addEventListener('click', loadDailyReport);
}

if (document.getElementById('daily-report-range-btn')) {
  document.getElementById('daily-report-range-btn').addEventListener('click', function () {
    dailyReportDays = dailyReportDays === 1 ? 7 : 1;
    this.textContent = dailyReportDays === 1 ? t('daily_report_week') : t('daily_report_day');
    loadDailyReport();
  });
}

async function loadAdminPanel() {
  loadDailyReport();
  await fetchPaymentSettings();
  const settingsVodafone = document.getElementById('settings-vodafone');
  const settingsInstapay = document.getElementById('settings-instapay');
  const settingsBank = document.getElementById('settings-bank');
  settingsVodafone.value = (paymentSettings && paymentSettings.vodafoneNumber) || '';
  settingsInstapay.value = (paymentSettings && paymentSettings.instapayHandle) || '';
  settingsBank.value = (paymentSettings && paymentSettings.bankDetails) || '';
  settingsMessage.textContent = '';

  const moved = await migrateWelcomeSettings();
  await fetchWelcomeSettings();
  document.getElementById('settings-welcome-url').value = (welcomeSettings && welcomeSettings.url) || '';
  document.getElementById('settings-welcome-secret').value = await fetchWelcomeSecret();
  document.getElementById('settings-welcome-on').checked = !!(welcomeSettings && welcomeSettings.enabled);
  document.getElementById('settings-ai-on').checked = !!(welcomeSettings && welcomeSettings.aiEnabled);
  document.getElementById('settings-push-on').checked = !!(welcomeSettings && welcomeSettings.pushEnabled);
  document.getElementById('settings-vapid').value = (welcomeSettings && welcomeSettings.vapidKey) || '';
  const welcomeMsg = document.getElementById('welcome-mail-message');
  welcomeMsg.textContent = '';
  if (moved) setStatusMessage(welcomeMsg, t('settings_migrated'), 'success');
  else if (!(welcomeSettings && welcomeSettings.url)) welcomeMsg.textContent = t('settings_missing_url');

  await renderAdminPlansList();
  await renderAdminProviderPlansList();
  await renderAdminPaymentsList();

  fillProductCategorySelect();
  await loadStoreProductsAdmin();
  await loadStoreOrdersAdmin();
  await loadStoriesAdmin();
  await loadLeadsAdmin();
  await loadProviderApplicationsAdmin();

  accessResultBox.innerHTML = '';
  accessResultBox.classList.add('hidden');
  accessMessage.textContent = '';
  document.getElementById('access-lookup-email').value = '';
}

document.getElementById('refresh-public-stats-btn').addEventListener('click', async function () {
  publicStatsMessage.textContent = t('saving');
  try {
    const clientsSnapshot = await getDocs(collection(db, 'clients'));
    await setDoc(doc(db, 'publicStats', 'summary'), {
      clientsCount: clientsSnapshot.size,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    setStatusMessage(publicStatsMessage, t('public_stats_updated'), 'success');
  } catch (error) {
    publicStatsMessage.textContent = t('problem') + error.message;
  }
});

/* ============================================================
   الرسالة الترحيبية التلقائية
   العميل اللي بيسيب إيميله في صفحة التعريف بيوصله شرح كامل عن
   البرنامج فورًا — قبل ما ترد عليه إنت بساعات
   ============================================================ */

let welcomeSettings = null;

/*
 * الإعدادات اتقسمت مستندين:
 *  • settings/public  — الرابط وتشغيل/إيقاف الترحيب والمساعد. مفيهوش
 *    أي سر، وبيتقرا من غير تسجيل دخول — وده لازم، لأن زائر الصفحة
 *    الرئيسية اللي بيسيب إيميله مش مسجّل أصلًا. قبل كده كان بيتقرا
 *    من مستند فيه كلمة السر ومقفول على المسجّلين، فالترحيب مكانش
 *    بيتبعت للزائر خالص.
 *  • settings/welcome — كلمة السر. الإدارة بس بتقراها.
 */
/*
 * الإعدادات كانت كلها في settings/welcome، واتقسمت لما قفلنا كلمة
 * السر: العام راح لـ settings/public. المستند الجديد ده مش بيتعمل
 * لوحده — فأي حساب رفع النسخة الجديدة من غير ما يفتح لوحة التحكم
 * ويحفظ، كان بيلاقي الإعدادات فاضية والمساعد الذكي واقف في سكوت.
 * عشان كده بنرجع للمستند القديم لو الجديد لسه مش موجود، ولوحة
 * التحكم بتنقل البيانات لوحدها أول ما تتفتح
 */
async function fetchWelcomeSettings() {
  welcomeSettings = null;
  try {
    const snap = await getDoc(doc(db, 'settings', 'public'));
    if (snap.exists() && snap.data().url) welcomeSettings = snap.data();
  } catch (error) {
    welcomeSettings = null;
  }
  if (welcomeSettings) return welcomeSettings;

  // الرجوع للمستند القديم — الإدارة بس هي اللي القواعد بتسمحلها تقراه
  try {
    const legacy = await getDoc(doc(db, 'settings', 'welcome'));
    if (legacy.exists() && legacy.data().url) welcomeSettings = legacy.data();
  } catch (error) {
    /* العميل العادي مالوش حق يقراه — طبيعي */
  }
  return welcomeSettings;
}

/*
 * نقل تلقائي: لو الإعدادات لسه في المستند القديم بس، بننسخ الجزء
 * العام للمستند الجديد عشان العملاء يشوفوه. بتحصل مرة واحدة أول ما
 * الإدارة تفتح لوحة التحكم
 */
async function migrateWelcomeSettings() {
  try {
    const pub = await getDoc(doc(db, 'settings', 'public'));
    if (pub.exists() && pub.data().url) return false;

    const legacy = await getDoc(doc(db, 'settings', 'welcome'));
    if (!legacy.exists() || !legacy.data().url) return false;

    const data = legacy.data();
    await setDoc(doc(db, 'settings', 'public'), {
      url: data.url || '',
      enabled: !!data.enabled,
      aiEnabled: !!data.aiEnabled
    }, { merge: true });
    return true;
  } catch (error) {
    return false;
  }
}

/* كلمة السر بتتقرا لما الإدارة تفتح لوحة التحكم بس */
async function fetchWelcomeSecret() {
  try {
    const snap = await getDoc(doc(db, 'settings', 'welcome'));
    return snap.exists() ? (snap.data().secret || '') : '';
  } catch (error) {
    return '';
  }
}

async function sendWelcomeMail(lead) {
  if (!lead || !lead.email) return false;
  const conf = welcomeSettings || await fetchWelcomeSettings();
  if (!conf || !conf.enabled || !conf.url) return false;

  try {
    /*
     * text/plain عشان المتصفح ما يعملش preflight — Apps Script
     * مابيردّش على OPTIONS، فالطلب كان هيفشل بدونها
     */
    await fetch(conf.url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'welcome',
        name: lead.name || '',
        email: lead.email,
        phone: lead.phone || '',
        interest: lead.interest || '',
        lang: lang
      })
    });
    return true;
  } catch (error) {
    /* مفيش داعي نزعج الزائر — الرسالة محفوظة عندنا في كل الأحوال */
    return false;
  }
}

document.getElementById('save-welcome-btn').addEventListener('click', async function () {
  const message = document.getElementById('welcome-mail-message');
  message.textContent = t('saving');
  try {
    const publicPart = {
      url: document.getElementById('settings-welcome-url').value.trim(),
      enabled: document.getElementById('settings-welcome-on').checked,
      aiEnabled: document.getElementById('settings-ai-on').checked,
      pushEnabled: document.getElementById('settings-push-on').checked,
      // المفتاح العام بتاع Web Push — مش سر، بيتقرا من متصفح كل عميل
      vapidKey: document.getElementById('settings-vapid').value.trim()
    };
    // السر لوحده في مستند مقفول — مابيوصلش لمتصفح أي عميل
    const secretPart = {
      secret: document.getElementById('settings-welcome-secret').value.trim()
    };
    await setDoc(doc(db, 'settings', 'public'), publicPart, { merge: true });
    await setDoc(doc(db, 'settings', 'welcome'), secretPart, { merge: true });
    welcomeSettings = publicPart;
    setStatusMessage(message, t('saved'), 'success');
  } catch (error) {
    message.textContent = t('problem') + error.message;
  }
});

document.getElementById('save-settings-btn').addEventListener('click', async function () {
  settingsMessage.textContent = t('saving');
  try {
    await setDoc(doc(db, 'settings', 'payment'), {
      vodafoneNumber: document.getElementById('settings-vodafone').value.trim(),
      instapayHandle: document.getElementById('settings-instapay').value.trim(),
      bankDetails: document.getElementById('settings-bank').value.trim()
    }, { merge: true });
    setStatusMessage(settingsMessage, t('saved'), 'success');
    await fetchPaymentSettings();
  } catch (error) {
    settingsMessage.textContent = t('problem') + error.message;
  }
});

async function fetchAllPlansForAdmin() {
  try {
    const snapshot = await getDocs(collection(db, 'plans'));
    return snapshot.docs
      .map(function (item) { return Object.assign({ id: item.id }, item.data()); })
      .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
  } catch (error) {
    return [];
  }
}

async function renderAdminPlansList() {
  adminPlansList.innerHTML = '';
  const plans = await fetchAllPlansForAdmin();

  plans.forEach(function (plan) {
    const box = document.createElement('div');
    box.className = 'add-box';

    const nameRow = document.createElement('div');
    nameRow.className = 'row';
    const nameArInput = document.createElement('input');
    nameArInput.value = plan.nameAr || '';
    nameArInput.placeholder = t('plan_name_ph');
    const nameEnInput = document.createElement('input');
    nameEnInput.value = plan.nameEn || '';
    nameEnInput.placeholder = t('plan_name_en_ph');
    nameRow.appendChild(nameArInput);
    nameRow.appendChild(nameEnInput);
    box.appendChild(nameRow);

    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.inputMode = 'decimal';
    priceInput.placeholder = t('plan_price_ph');
    priceInput.value = (plan.price !== undefined && plan.price !== null) ? plan.price : '';
    box.appendChild(priceInput);

    const durationSelect = document.createElement('select');
    fillPlanDurationSelect(durationSelect, planDurationMonths(plan));
    box.appendChild(durationSelect);

    const featuresArInput = document.createElement('textarea');
    featuresArInput.rows = 3;
    featuresArInput.placeholder = t('plan_features_ph');
    featuresArInput.value = plan.featuresAr || '';
    box.appendChild(featuresArInput);

    const featuresEnInput = document.createElement('textarea');
    featuresEnInput.rows = 3;
    featuresEnInput.placeholder = t('plan_features_en_ph');
    featuresEnInput.value = plan.featuresEn || '';
    box.appendChild(featuresEnInput);

    const offerRow = document.createElement('div');
    offerRow.className = 'row';
    const offerLabelInput = document.createElement('input');
    offerLabelInput.placeholder = t('plan_offer_label_ph');
    offerLabelInput.value = plan.offerLabelAr || '';
    const offerPriceInput = document.createElement('input');
    offerPriceInput.type = 'number';
    offerPriceInput.inputMode = 'decimal';
    offerPriceInput.placeholder = t('plan_offer_price_ph');
    offerPriceInput.value = (plan.offerPrice !== undefined && plan.offerPrice !== null) ? plan.offerPrice : '';
    offerRow.appendChild(offerLabelInput);
    offerRow.appendChild(offerPriceInput);
    box.appendChild(offerRow);

    const activeLabel = document.createElement('label');
    activeLabel.className = 'rest';
    const activeCheckbox = document.createElement('input');
    activeCheckbox.type = 'checkbox';
    activeCheckbox.checked = plan.active !== false;
    activeLabel.appendChild(activeCheckbox);
    const activeSpan = document.createElement('span');
    activeSpan.textContent = t('plan_active_label');
    activeLabel.appendChild(activeSpan);
    box.appendChild(activeLabel);

    const btnRow = document.createElement('div');
    btnRow.className = 'row';
    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.className = 'secondary';
    saveBtn.textContent = t('save_plan_btn');
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete';
    deleteBtn.innerHTML = DELETE_ICON_SVG;
    btnRow.appendChild(saveBtn);
    btnRow.appendChild(deleteBtn);
    box.appendChild(btnRow);

    const rowMessage = document.createElement('p');
    rowMessage.className = 'message';
    box.appendChild(rowMessage);

    saveBtn.addEventListener('click', async function () {
      rowMessage.textContent = t('saving');
      try {
        await setDoc(doc(db, 'plans', plan.id), {
          nameAr: nameArInput.value.trim(),
          nameEn: nameEnInput.value.trim(),
          price: Number(priceInput.value) || 0,
          durationMonths: Number(durationSelect.value) || 1,
          featuresAr: featuresArInput.value,
          featuresEn: featuresEnInput.value,
          offerLabelAr: offerLabelInput.value.trim(),
          offerLabelEn: offerLabelInput.value.trim(),
          offerPrice: offerPriceInput.value === '' ? null : Number(offerPriceInput.value),
          active: activeCheckbox.checked
        }, { merge: true });
        setStatusMessage(rowMessage, t('saved'), 'success');
      } catch (error) {
        rowMessage.textContent = t('problem') + error.message;
      }
    });

    deleteBtn.addEventListener('click', async function () {
      if (!confirm(t('confirm_delete_plan'))) return;
      try {
        await deleteDoc(doc(db, 'plans', plan.id));
        renderAdminPlansList();
      } catch (error) {
        rowMessage.textContent = t('problem') + error.message;
      }
    });

    adminPlansList.appendChild(box);
  });
}

document.getElementById('add-plan-btn').addEventListener('click', async function () {
  const nameAr = document.getElementById('new-plan-name-ar').value.trim();
  const price = Number(document.getElementById('new-plan-price').value) || 0;
  if (!nameAr || !price) {
    plansAdminMessage.textContent = t('need_onboarding_fields');
    return;
  }
  plansAdminMessage.textContent = t('saving');
  try {
    const offerPriceValue = document.getElementById('new-plan-offer-price').value;
    await setDoc(doc(db, 'plans', 'plan_' + Date.now()), {
      nameAr: nameAr,
      nameEn: document.getElementById('new-plan-name-en').value.trim(),
      price: price,
      durationMonths: Number(newPlanDurationSelect.value) || 1,
      featuresAr: document.getElementById('new-plan-features-ar').value,
      featuresEn: document.getElementById('new-plan-features-en').value,
      offerLabelAr: document.getElementById('new-plan-offer-label').value.trim(),
      offerLabelEn: document.getElementById('new-plan-offer-label').value.trim(),
      offerPrice: offerPriceValue === '' ? null : Number(offerPriceValue),
      active: true,
      order: Date.now()
    });
    ['new-plan-name-ar', 'new-plan-name-en', 'new-plan-price', 'new-plan-features-ar', 'new-plan-features-en', 'new-plan-offer-label', 'new-plan-offer-price'].forEach(function (id) {
      document.getElementById(id).value = '';
    });
    newPlanDurationSelect.value = '1';
    setStatusMessage(plansAdminMessage, t('saved'), 'success');
    renderAdminPlansList();
  } catch (error) {
    plansAdminMessage.textContent = t('problem') + error.message;
  }
});

/* ---------- إدارة خطط اشتراك المتخصصين ---------- */

const adminProviderPlansList = document.getElementById('admin-provider-plans-list');
const newProviderPlanSpecialty = document.getElementById('new-provider-plan-specialty');
const providerPlansAdminMessage = document.getElementById('provider-plans-admin-message');

function fillProviderPlanSpecialtySelect(select) {
  select.innerHTML = '';
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = t('provider_plan_specialty_all');
  select.appendChild(allOption);
  Object.keys(SPECIALTIES).forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = specialtyName(key);
    select.appendChild(option);
  });
}

async function fetchAllProviderPlansForAdmin() {
  try {
    const snapshot = await getDocs(collection(db, 'providerPlans'));
    return snapshot.docs.map(function (item) { return Object.assign({ id: item.id }, item.data()); });
  } catch (error) {
    return [];
  }
}

async function renderAdminProviderPlansList() {
  adminProviderPlansList.innerHTML = '';
  const plans = await fetchAllProviderPlansForAdmin();

  plans.forEach(function (plan) {
    const box = document.createElement('div');
    box.className = 'add-box';

    const specialtyRow = document.createElement('div');
    specialtyRow.className = 'row';
    const specialtySelect = document.createElement('select');
    fillProviderPlanSpecialtySelect(specialtySelect);
    specialtySelect.value = plan.specialty || 'all';
    specialtyRow.appendChild(specialtySelect);
    box.appendChild(specialtyRow);

    const nameRow = document.createElement('div');
    nameRow.className = 'row';
    const nameArInput = document.createElement('input');
    nameArInput.value = plan.nameAr || '';
    nameArInput.placeholder = t('plan_name_ph');
    const nameEnInput = document.createElement('input');
    nameEnInput.value = plan.nameEn || '';
    nameEnInput.placeholder = t('plan_name_en_ph');
    nameRow.appendChild(nameArInput);
    nameRow.appendChild(nameEnInput);
    box.appendChild(nameRow);

    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.inputMode = 'decimal';
    priceInput.placeholder = t('plan_price_ph');
    priceInput.value = (plan.price !== undefined && plan.price !== null) ? plan.price : '';
    box.appendChild(priceInput);

    const durationSelect = document.createElement('select');
    fillPlanDurationSelect(durationSelect, planDurationMonths(plan));
    box.appendChild(durationSelect);

    const featuresArInput = document.createElement('textarea');
    featuresArInput.rows = 3;
    featuresArInput.placeholder = t('plan_features_ph');
    featuresArInput.value = plan.featuresAr || '';
    box.appendChild(featuresArInput);

    const featuresEnInput = document.createElement('textarea');
    featuresEnInput.rows = 3;
    featuresEnInput.placeholder = t('plan_features_en_ph');
    featuresEnInput.value = plan.featuresEn || '';
    box.appendChild(featuresEnInput);

    const activeLabel = document.createElement('label');
    activeLabel.className = 'rest';
    const activeCheckbox = document.createElement('input');
    activeCheckbox.type = 'checkbox';
    activeCheckbox.checked = plan.active !== false;
    activeLabel.appendChild(activeCheckbox);
    const activeSpan = document.createElement('span');
    activeSpan.textContent = t('plan_active_label');
    activeLabel.appendChild(activeSpan);
    box.appendChild(activeLabel);

    const btnRow = document.createElement('div');
    btnRow.className = 'row';
    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.className = 'secondary';
    saveBtn.textContent = t('save_plan_btn');
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete';
    deleteBtn.innerHTML = DELETE_ICON_SVG;
    btnRow.appendChild(saveBtn);
    btnRow.appendChild(deleteBtn);
    box.appendChild(btnRow);

    const rowMessage = document.createElement('p');
    rowMessage.className = 'message';
    box.appendChild(rowMessage);

    saveBtn.addEventListener('click', async function () {
      rowMessage.textContent = t('saving');
      try {
        await setDoc(doc(db, 'providerPlans', plan.id), {
          specialty: specialtySelect.value,
          nameAr: nameArInput.value.trim(),
          nameEn: nameEnInput.value.trim(),
          price: Number(priceInput.value) || 0,
          durationMonths: Number(durationSelect.value) || 1,
          featuresAr: featuresArInput.value,
          featuresEn: featuresEnInput.value,
          active: activeCheckbox.checked
        }, { merge: true });
        setStatusMessage(rowMessage, t('provider_plan_saved'), 'success');
      } catch (error) {
        rowMessage.textContent = t('problem') + error.message;
      }
    });

    deleteBtn.addEventListener('click', async function () {
      if (!confirm(t('confirm_delete_provider_plan'))) return;
      try {
        await deleteDoc(doc(db, 'providerPlans', plan.id));
        renderAdminProviderPlansList();
      } catch (error) {
        rowMessage.textContent = t('problem') + error.message;
      }
    });

    adminProviderPlansList.appendChild(box);
  });
}

fillProviderPlanSpecialtySelect(newProviderPlanSpecialty);

const newProviderPlanDurationSelect = document.getElementById('new-provider-plan-duration');
fillPlanDurationSelect(newProviderPlanDurationSelect, 1);

document.getElementById('add-provider-plan-btn').addEventListener('click', async function () {
  const nameAr = document.getElementById('new-provider-plan-name-ar').value.trim();
  const price = Number(document.getElementById('new-provider-plan-price').value) || 0;
  if (!nameAr || !price) {
    providerPlansAdminMessage.textContent = t('need_provider_plan_fields');
    return;
  }
  providerPlansAdminMessage.textContent = t('saving');
  try {
    await setDoc(doc(db, 'providerPlans', 'provider_plan_' + Date.now()), {
      specialty: newProviderPlanSpecialty.value,
      nameAr: nameAr,
      nameEn: document.getElementById('new-provider-plan-name-en').value.trim(),
      price: price,
      durationMonths: Number(newProviderPlanDurationSelect.value) || 1,
      featuresAr: document.getElementById('new-provider-plan-features-ar').value,
      featuresEn: document.getElementById('new-provider-plan-features-en').value,
      active: true
    });
    ['new-provider-plan-name-ar', 'new-provider-plan-name-en', 'new-provider-plan-price', 'new-provider-plan-features-ar', 'new-provider-plan-features-en'].forEach(function (id) {
      document.getElementById(id).value = '';
    });
    newProviderPlanDurationSelect.value = '1';
    setStatusMessage(providerPlansAdminMessage, t('provider_plan_saved'), 'success');
    renderAdminProviderPlansList();
  } catch (error) {
    providerPlansAdminMessage.textContent = t('problem') + error.message;
  }
});

async function renderAdminPaymentsList() {
  adminPaymentsList.innerHTML = '';
  let pending = [];
  try {
    const clientsSnapshot = await getDocs(collection(db, 'clients'));
    const providersSnapshot = await getDocs(collection(db, 'providers'));
    const pendingClients = clientsSnapshot.docs
      .map(function (item) { return Object.assign({ email: item.id, collectionName: 'clients' }, item.data()); })
      .filter(function (c) { return c.pendingPayment && c.pendingPayment.status === 'submitted'; });
    const pendingProviders = providersSnapshot.docs
      .map(function (item) { return Object.assign({ email: item.id, collectionName: 'providers' }, item.data()); })
      .filter(function (p) { return p.pendingPayment && p.pendingPayment.status === 'submitted'; });
    pending = pendingClients.concat(pendingProviders);
  } catch (error) {
    pending = [];
  }

  if (!pending.length) {
    const note = document.createElement('p');
    note.className = 'message';
    note.textContent = t('no_pending_payments');
    adminPaymentsList.appendChild(note);
    return;
  }

  pending.forEach(function (account) {
    const payment = account.pendingPayment;
    const card = document.createElement('div');
    card.className = 'review-card';

    const name = document.createElement('div');
    name.className = 'ex-name';
    name.textContent = (account.name || account.email) + ' — ' + payment.planName +
      (account.collectionName === 'providers' ? ' (' + specialtyListName(providerSpecialties(account)) + ')' : '');
    card.appendChild(name);

    const meta = document.createElement('div');
    meta.className = 'ex-meta';
    meta.textContent = account.email + ' — ' + payment.amount + ' — ' + t(
      payment.method === 'vodafone_cash' ? 'payment_method_vodafone' :
      payment.method === 'instapay' ? 'payment_method_instapay' : 'payment_method_bank'
    ) + ' — ' + payment.reference;
    card.appendChild(meta);

    if (payment.note) {
      const note = document.createElement('div');
      note.className = 'ex-meta';
      note.textContent = payment.note;
      card.appendChild(note);
    }

    const btnRow = document.createElement('div');
    btnRow.className = 'row';
    const approveBtn = document.createElement('button');
    approveBtn.type = 'button';
    approveBtn.textContent = t('approve_payment_btn');
    const rejectBtn = document.createElement('button');
    rejectBtn.type = 'button';
    rejectBtn.className = 'secondary';
    rejectBtn.textContent = t('reject_payment_btn');
    btnRow.appendChild(approveBtn);
    btnRow.appendChild(rejectBtn);
    card.appendChild(btnRow);

    const rowMessage = document.createElement('p');
    rowMessage.className = 'message';
    card.appendChild(rowMessage);

    approveBtn.addEventListener('click', async function () {
      rowMessage.textContent = t('saving');
      try {
        const until = new Date();
        until.setDate(until.getDate() + 30);
        await updateDoc(doc(db, account.collectionName, account.email), {
          'accessOverride.until': until.toISOString().slice(0, 10),
          'accessOverride.blocked': deleteField(),
          subscriptionPlan: payment.planId,
          pendingPayment: Object.assign({}, payment, { status: 'approved' })
        });
        setStatusMessage(rowMessage, t('payment_approved_msg'), 'success');
        renderAdminPaymentsList();
      } catch (error) {
        rowMessage.textContent = t('problem') + error.message;
      }
    });

    rejectBtn.addEventListener('click', async function () {
      rowMessage.textContent = t('saving');
      try {
        await setDoc(doc(db, account.collectionName, account.email), {
          pendingPayment: Object.assign({}, payment, { status: 'rejected' })
        }, { merge: true });
        setStatusMessage(rowMessage, t('payment_rejected_admin_msg'), 'success');
        renderAdminPaymentsList();
      } catch (error) {
        rowMessage.textContent = t('problem') + error.message;
      }
    });

    adminPaymentsList.appendChild(card);
  });
}

/* ---------- إدارة الوصول (عميل أو متخصص أو أي حد) ---------- */

document.getElementById('access-lookup-btn').addEventListener('click', async function () {
  const email = document.getElementById('access-lookup-email').value.trim().toLowerCase();
  accessResultBox.innerHTML = '';
  accessResultBox.classList.add('hidden');
  if (!email) return;

  accessMessage.textContent = t('loading');
  try {
    const clientDoc = await getDoc(doc(db, 'clients', email));
    let collectionName = '';
    let data = null;
    if (clientDoc.exists()) {
      collectionName = 'clients';
      data = clientDoc.data();
    } else {
      const providerDoc = await getDoc(doc(db, 'providers', email));
      if (providerDoc.exists()) {
        collectionName = 'providers';
        data = providerDoc.data();
      }
    }

    if (!data) {
      accessMessage.textContent = t('admin_access_not_found');
      return;
    }

    accessMessage.textContent = '';
    renderAccessResultBox(email, collectionName, data);
  } catch (error) {
    accessMessage.textContent = t('problem') + error.message;
  }
});

function renderAccessResultBox(email, collectionName, data) {
  accessResultBox.innerHTML = '';
  accessResultBox.classList.remove('hidden');

  const heading = document.createElement('div');
  heading.className = 'ex-name';
  heading.textContent = (data.name || email) + ' — ' + t(collectionName === 'clients' ? 'admin_access_found_client' : 'admin_access_found_provider');
  accessResultBox.appendChild(heading);

  const currentStatus = document.createElement('p');
  currentStatus.className = 'ex-meta';
  if (isAccessBlocked(data)) {
    currentStatus.textContent = t('admin_access_current_blocked');
  } else if (data.accessOverride && data.accessOverride.until) {
    currentStatus.textContent = fill('admin_access_current_until', { date: data.accessOverride.until });
  } else {
    currentStatus.textContent = t('admin_access_current_none');
  }
  accessResultBox.appendChild(currentStatus);

  const extendLabel = document.createElement('label');
  extendLabel.className = 'field-label';
  extendLabel.textContent = t('admin_access_extend_label');
  accessResultBox.appendChild(extendLabel);

  const dateRow = document.createElement('div');
  dateRow.className = 'row';
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateRow.appendChild(dateInput);
  const extendBtn = document.createElement('button');
  extendBtn.type = 'button';
  extendBtn.className = 'secondary';
  extendBtn.textContent = t('admin_access_extend_btn');
  dateRow.appendChild(extendBtn);
  accessResultBox.appendChild(dateRow);

  const actionRow = document.createElement('div');
  actionRow.className = 'row';
  const blockBtn = document.createElement('button');
  blockBtn.type = 'button';
  blockBtn.className = 'secondary';
  blockBtn.textContent = isAccessBlocked(data) ? t('admin_access_unblock_btn') : t('admin_access_block_btn');
  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.className = 'secondary';
  clearBtn.textContent = t('admin_access_clear_btn');
  actionRow.appendChild(blockBtn);
  actionRow.appendChild(clearBtn);
  accessResultBox.appendChild(actionRow);

  extendBtn.addEventListener('click', async function () {
    if (!dateInput.value) return;
    accessMessage.textContent = t('saving');
    try {
      await updateDoc(doc(db, collectionName, email), {
        'accessOverride.until': dateInput.value,
        'accessOverride.blocked': deleteField()
      });
      setStatusMessage(accessMessage, t('admin_access_saved'), 'success');
      const freshDoc = await getDoc(doc(db, collectionName, email));
      renderAccessResultBox(email, collectionName, freshDoc.data());
    } catch (error) {
      accessMessage.textContent = t('problem') + error.message;
    }
  });

  blockBtn.addEventListener('click', async function () {
    accessMessage.textContent = t('saving');
    try {
      const nextBlocked = !isAccessBlocked(data);
      await updateDoc(doc(db, collectionName, email), {
        'accessOverride.blocked': nextBlocked ? true : deleteField()
      });
      setStatusMessage(accessMessage, t('admin_access_saved'), 'success');
      const freshDoc = await getDoc(doc(db, collectionName, email));
      renderAccessResultBox(email, collectionName, freshDoc.data());
    } catch (error) {
      accessMessage.textContent = t('problem') + error.message;
    }
  });

  clearBtn.addEventListener('click', async function () {
    accessMessage.textContent = t('saving');
    try {
      await updateDoc(doc(db, collectionName, email), {
        'accessOverride.until': deleteField(),
        'accessOverride.blocked': deleteField()
      });
      setStatusMessage(accessMessage, t('admin_access_saved'), 'success');
      const freshDoc = await getDoc(doc(db, collectionName, email));
      renderAccessResultBox(email, collectionName, freshDoc.data());
    } catch (error) {
      accessMessage.textContent = t('problem') + error.message;
    }
  });
}

/* ============================ المكتبة الطبية ============================ */

let medLibraryItems = [];
let medCategoryFilter = '';
let medPickedImage = '';
let medLibraryReturnScreen = null;

function medCategoryName(key) {
  return (MED_CATEGORIES[key] && MED_CATEGORIES[key][lang]) || key;
}

function medStatusName(key) {
  return (MED_REVIEW[key] && MED_REVIEW[key][lang]) || key;
}

function isMedicalAuthor() {
  return !!(currentProviderEmail && specialtiesHaveFlag(currentProviderSpecialties, 'medical'));
}

function fillMedCategorySelect() {
  const keep = medCategoryPick.value;
  medCategoryPick.innerHTML = '';
  Object.keys(MED_CATEGORIES).forEach(function (key) {
    if (key === 'redflag') return; // علامات الخطر ليها قسم جاهز مستقل، مش مقالات تتكتب
    const option = document.createElement('option');
    option.value = key;
    option.textContent = medCategoryName(key);
    medCategoryPick.appendChild(option);
  });
  if (keep) medCategoryPick.value = keep;
}

function renderMedRedFlags() {
  medRedFlagsList.innerHTML = '';
  DEFAULT_RED_FLAGS.forEach(function (flag) {
    const item = document.createElement('li');
    item.textContent = flag[lang] || flag.ar;
    medRedFlagsList.appendChild(item);
  });
}

function renderMedCategoryChips() {
  medLibraryChips.innerHTML = '';

  const allChip = document.createElement('span');
  allChip.className = 'chip' + (medCategoryFilter ? '' : ' active');
  allChip.textContent = t('all_categories');
  allChip.addEventListener('click', function () {
    medCategoryFilter = '';
    renderMedCategoryChips();
    renderMedLibraryList();
  });
  medLibraryChips.appendChild(allChip);

  Object.keys(MED_CATEGORIES).forEach(function (key) {
    if (key === 'redflag') return;
    const chip = document.createElement('span');
    chip.className = 'chip' + (medCategoryFilter === key ? ' active' : '');
    chip.textContent = medCategoryName(key);
    chip.addEventListener('click', function () {
      medCategoryFilter = key;
      renderMedCategoryChips();
      renderMedLibraryList();
    });
    medLibraryChips.appendChild(chip);
  });
}

function resetMedForm() {
  medCategoryPick.value = Object.keys(MED_CATEGORIES).filter(function (k) { return k !== 'redflag'; })[0] || '';
  medTitle.value = '';
  medBody.value = '';
  medPickedImage = '';
  medImageInput.value = '';
  medImagePreview.removeAttribute('src');
  medImageBox.classList.add('hidden');
  medImageLabel.textContent = t('choose_med_image');
}

medImageInput.addEventListener('change', async function () {
  const file = medImageInput.files[0];
  if (!file) return;

  if (file.size > MAX_SOURCE_BYTES) {
    medLibraryMessage.textContent = t('image_too_big');
    medImageInput.value = '';
    return;
  }

  medLibraryMessage.textContent = t('preparing_image');
  try {
    medPickedImage = await compressImage(file, IMAGE_MAX_SIDE, 0.7);
    medImagePreview.src = medPickedImage;
    medImageBox.classList.remove('hidden');
    medImageLabel.textContent = t('image_chosen');
    medLibraryMessage.textContent = '';
  } catch (error) {
    medLibraryMessage.textContent = t('image_failed');
  }
});

document.getElementById('med-image-remove').addEventListener('click', function () {
  medPickedImage = '';
  medImageInput.value = '';
  medImagePreview.removeAttribute('src');
  medImageBox.classList.add('hidden');
  medImageLabel.textContent = t('choose_med_image');
});

async function saveMedArticle(status) {
  const title = medTitle.value.trim();
  const body = medBody.value.trim();
  const category = medCategoryPick.value;

  if (!title || !body || !category) {
    medLibraryMessage.textContent = t('need_med_fields');
    return;
  }

  medLibraryMessage.textContent = t('saving');
  try {
    const id = 'med_' + Date.now();
    await setDoc(doc(db, 'medLibrary', id), {
      category: category,
      specialty: currentProviderSpecialty,
      specialties: currentProviderSpecialties,
      title: title,
      body: body,
      image: medPickedImage,
      authorEmail: currentProviderEmail,
      authorName: (currentProviderData && currentProviderData.name) || currentProviderEmail,
      status: status,
      createdAt: new Date().toISOString()
    });
    setStatusMessage(medLibraryMessage, t('med_saved'), 'success');
    resetMedForm();
    loadMedLibrary();
  } catch (error) {
    medLibraryMessage.textContent = t('problem') + error.message;
  }
}

document.getElementById('med-save-draft-btn').addEventListener('click', function () {
  saveMedArticle('draft');
});

document.getElementById('med-submit-review-btn').addEventListener('click', function () {
  saveMedArticle('review');
});

function medStatusOptionsMarkup(currentStatus) {
  return Object.keys(MED_REVIEW).map(function (key) {
    return '<option value="' + key + '"' + (key === (currentStatus || 'draft') ? ' selected' : '') + '>' + medStatusName(key) + '</option>';
  }).join('');
}

function medItemTitle(item) {
  if (!item) return '';
  if (lang === 'en' && item.titleEn) return item.titleEn;
  return tr(item.title || item.titleEn || '');
}

function medItemBody(item) {
  if (!item) return '';
  if (lang === 'en' && item.bodyEn) return item.bodyEn;
  return tr(item.body || item.bodyEn || '');
}

function renderMedLibraryList() {
  medLibraryList.innerHTML = '';
  const author = isMedicalAuthor();

  let items = medLibraryItems.filter(function (item) {
    return author || item.status === 'approved';
  });
  if (medCategoryFilter) {
    items = items.filter(function (item) { return item.category === medCategoryFilter; });
  }
  items.sort(function (a, b) { return String(b.createdAt || '').localeCompare(String(a.createdAt || '')); });

  if (!items.length) {
    const empty = document.createElement('li');
    empty.textContent = t('no_med_articles');
    medLibraryList.appendChild(empty);
    return;
  }

  items.forEach(function (item) {
    const card = document.createElement('li');
    card.className = 'med-article-card status-' + (item.status || 'draft');

    const tag = document.createElement('div');
    tag.className = 'sport-tag';
    tag.textContent = medCategoryName(item.category);
    card.appendChild(tag);

    const title = document.createElement('div');
    title.className = 'client-name';
    title.textContent = medItemTitle(item);
    card.appendChild(title);

    if (item.image) {
      const thumbBtn = document.createElement('button');
      thumbBtn.type = 'button';
      thumbBtn.className = 'med-thumb-btn';
      const thumb = document.createElement('img');
      thumb.src = item.image;
      thumb.alt = '';
      thumbBtn.appendChild(thumb);
      thumbBtn.addEventListener('click', function () {
        lightboxTitle.textContent = medItemTitle(item);
        lightboxImages.innerHTML = '';
        addShot(item.image, '');
        lightbox.classList.remove('hidden');
      });
      card.appendChild(thumbBtn);
    }

    const body = document.createElement('p');
    body.className = 'ex-meta';
    body.textContent = medItemBody(item);
    card.appendChild(body);

    const author2 = document.createElement('div');
    author2.className = 'client-email';
    setSpecialtyLabel(author2, providerSpecialties(item), item.authorName || '');
    card.appendChild(author2);

    if (author) {
      const statusRow = document.createElement('div');
      statusRow.className = 'row';
      const statusSelect = document.createElement('select');
      statusSelect.innerHTML = medStatusOptionsMarkup(item.status);
      statusSelect.addEventListener('change', async function () {
        try {
          await setDoc(doc(db, 'medLibrary', item.id), { status: statusSelect.value }, { merge: true });
          item.status = statusSelect.value;
          card.className = 'med-article-card status-' + statusSelect.value;
          setStatusMessage(medLibraryMessage, t('status_update_saved'), 'success');
        } catch (error) {
          medLibraryMessage.textContent = t('problem') + error.message;
        }
      });
      statusRow.appendChild(statusSelect);
      card.appendChild(statusRow);
    }

    medLibraryList.appendChild(card);
  });
}

async function loadMedLibrary() {
  medAuthorBox.classList.toggle('hidden', !isMedicalAuthor());
  if (isMedicalAuthor()) {
    fillMedCategorySelect();
    if (!medCategoryPick.value) resetMedForm();
  }
  renderMedRedFlags();
  renderMedCategoryChips();

  medLibraryMessage.textContent = t('loading');
  try {
    // اللي مش متخصص طبي بيشوف بس المقالات المعتمدة — لازم فلتر status
    // في نفس طلب الاستعلام عشان يتوافق مع Firestore Rules (مش ممكن نجيب
    // الكل ونفلتر بعدين، الطلب هيترفض من الأساس)
    const snapshot = isMedicalAuthor()
      ? await getDocs(collection(db, 'medLibrary'))
      : await getDocs(query(collection(db, 'medLibrary'), where('status', '==', 'approved')));
    medLibraryItems = snapshot.docs.map(function (item) {
      return Object.assign({ id: item.id }, item.data());
    });
    medLibraryMessage.textContent = '';
  } catch (error) {
    medLibraryItems = [];
    medLibraryMessage.textContent = t('problem') + error.message;
  }
  renderMedLibraryList();
}

document.getElementById('open-medlib-btn').addEventListener('click', function () {
  medLibraryReturnScreen = clientScreen;
  showScreen(medLibraryScreen);
  loadMedLibrary();
});

document.getElementById('ph-open-medlib-btn').addEventListener('click', function () {
  if (!guardLibrary('medical', providerHomeMessage)) return;
  medLibraryReturnScreen = providerHomeScreen;
  showScreen(medLibraryScreen);
  loadMedLibrary();
});

document.getElementById('med-library-back-btn').addEventListener('click', function () {
  showScreen(medLibraryReturnScreen || clientScreen);
});

document.getElementById('seed-medlib-btn').addEventListener('click', async function () {
  clientsMessage.textContent = t('seeding_library');
  try {
    let added = 0;
    for (let i = 0; i < MED_LIBRARY_SEED.length; i++) {
      const seedItem = MED_LIBRARY_SEED[i];
      const id = 'seed_' + i;
      const existing = await getDoc(doc(db, 'medLibrary', id));
      if (existing.exists()) continue;
      await setDoc(doc(db, 'medLibrary', id), {
        category: seedItem.category,
        specialty: seedItem.specialty,
        title: seedItem.title,
        body: seedItem.body,
        titleEn: seedItem.titleEn || '',
        bodyEn: seedItem.bodyEn || '',
        image: '',
        authorEmail: currentProviderEmail,
        authorName: t('seed_author_label'),
        status: 'draft',
        createdAt: new Date().toISOString()
      });
      added++;
    }
    clientsMessage.textContent = fill('seed_done', { n: added });
  } catch (error) {
    clientsMessage.textContent = t('problem') + error.message;
  }
});

/* ============================ اختيار الفريق ============================ */

let teamProviders = [];

/*
 * ترشيح المتخصصين: بنجمع تقييمهم (بمتوسط بايزي بسيط عشان تقييم
 * واحد بـ5 نجوم ميغلبش على تقييمات كتير كويسة) مع مدى نشاطهم
 * الأخير (lastActiveAt) — الأعلى نتيجة يظهر الأول وياخد شارة "موصى به".
 */
function providerScore(provider) {
  const stats = ratingStatsFor(provider.email);
  const bayesianAvg = (stats.avg * stats.count + 4 * 2) / (stats.count + 2);
  let recency = 0;
  if (provider.lastActiveAt) {
    const days = Math.floor((Date.now() - new Date(provider.lastActiveAt).getTime()) / 86400000);
    if (days <= 3) recency = 1;
    else if (days <= 14) recency = 0.6;
    else if (days <= 30) recency = 0.3;
  }
  return bayesianAvg + recency;
}

function isProviderRecentlyActive(provider) {
  if (!provider.lastActiveAt) return false;
  const days = Math.floor((Date.now() - new Date(provider.lastActiveAt).getTime()) / 86400000);
  return days <= 14;
}

function touchProviderActivity(email) {
  // بنكتب الإيميل مع كل لمسة — المستند اللي بيتعمل من هنا كان بيطلع
  // من غير حقل email، وبعدين أي حتة بتقرا provider.email تطلع undefined
  setDoc(doc(db, 'providers', email), { email: email, lastActiveAt: new Date().toISOString() }, { merge: true }).catch(function () {
    // مش مشكلة لو فشل التحديث ده — مجرد إشارة نشاط، مش بيانات أساسية
  });
}

let teamEditEmail = '';
let teamEditMode = 'onboarding';

/* ============================================================
   اختيار الفريق — صور دائرية بدل الكروت العريضة
   الكروت القديمة كانت بتاخد الشاشة كلها لكل متخصص، فالعميل
   بيلف كتير قبل ما يشوف حد تاني. دلوقتي صف صور صغيرة لكل
   تخصص، واللي يعجبه يدوس عليه يفتحله البروفيل كامل
   ============================================================ */

let teamSearchTerm = '';

/*
 * الألقاب مش جزء من الاسم: "د. سارة عبد الله" اسمها الأول "سارة"
 * مش "د." — من غير كده الصور كلها هتطلع مكتوب عليها "د" والأسماء
 * تحتها كلها "د."
 */
const NAME_TITLES = ['د', 'د.', 'دكتور', 'دكتورة', 'أ', 'أ.', 'ا', 'ا.', 'م', 'م.', 'مهندس',
                     'كابتن', 'كابتن.', 'كوتش', 'أستاذ', 'استاذ', 'dr', 'dr.', 'mr', 'mr.',
                     'mrs', 'mrs.', 'ms', 'ms.', 'coach', 'prof', 'prof.'];

function nameParts(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  const stripped = parts.filter(function (part, index) {
    if (index > 1) return true;
    return NAME_TITLES.indexOf(part.toLowerCase()) === -1;
  });
  return stripped.length ? stripped : parts;
}

/* الاسم الأول بس — الاسم الكامل جوه البروفيل */
function providerShortName(provider) {
  const parts = nameParts(provider && provider.name);
  return parts[0] || (provider && provider.email) || '';
}

/* الحروف الأولى من الاسم — بديل محترم لما مفيش صورة */
function providerInitials(name) {
  const parts = nameParts(name);
  if (!parts.length) return '؟';
  if (parts.length === 1) return parts[0].slice(0, 2);
  return parts[0].charAt(0) + parts[1].charAt(0);
}

/* لون ثابت لكل متخصص من اسمه — عشان الحرفين مايبقوش رمادي ممل */
const AVATAR_TINTS = ['#22c55e', '#38bdf8', '#a78bfa', '#f59e0b', '#f472b6', '#2dd4bf'];

function providerTint(email) {
  let sum = 0;
  String(email || '').split('').forEach(function (ch) { sum += ch.charCodeAt(0); });
  return AVATAR_TINTS[sum % AVATAR_TINTS.length];
}

function providerAvatar(provider, size) {
  const wrap = document.createElement('span');
  wrap.className = 'ap-ring';
  if (size) wrap.classList.add('ap-ring-' + size);

  if (provider.photo) {
    const image = document.createElement('img');
    image.src = provider.photo;
    image.alt = '';
    image.loading = 'lazy';
    image.addEventListener('error', function () {
      image.remove();
      wrap.appendChild(initialsNode(provider));
    });
    wrap.appendChild(image);
  } else {
    wrap.appendChild(initialsNode(provider));
  }
  return wrap;
}

function initialsNode(provider) {
  const span = document.createElement('span');
  span.className = 'ap-initials';
  span.textContent = providerInitials(provider.name);
  span.style.color = providerTint(provider.email);
  span.style.background = 'color-mix(in srgb, ' + providerTint(provider.email) + ' 16%, transparent)';
  return span;
}

function providerMatchesSearch(provider) {
  if (!teamSearchTerm) return true;
  const term = teamSearchTerm.toLowerCase();
  return String(provider.name || '').toLowerCase().indexOf(term) !== -1
      || String(provider.email || '').toLowerCase().indexOf(term) !== -1;
}

async function loadTeamPicker(prefillTeam) {
  teamList.innerHTML = '';
  teamMessage.textContent = t('loading');
  selectedTeam = Object.assign({}, prefillTeam || {});
  // الفريق زي ما كان قبل التعديل — عشان نبلّغ المتخصص الجديد بس
  teamBeforeEdit = Object.assign({}, prefillTeam || {});

  try {
    const snapshot = await getDocs(collection(db, 'providers'));
    teamProviders = snapshot.docs.map(providerFromDoc);

    await fetchAllProviderReviews();

    if (!teamProviders.length) {
      teamMessage.textContent = t('no_providers_yet');
      return;
    }
    teamMessage.textContent = '';
    renderTeamPicker();
  } catch (error) {
    teamMessage.textContent = t('problem') + error.message;
  }
}

function renderTeamPicker() {
  teamList.innerHTML = '';

  /* تجميع حسب التخصص — اللي عنده أكتر من تخصص بيظهر في كل قسم يخصه */
  const bySpecialty = {};
  teamProviders.forEach(function (provider) {
    if (!providerMatchesSearch(provider)) return;
    providerSpecialties(provider).forEach(function (key) {
      if (!bySpecialty[key]) bySpecialty[key] = [];
      bySpecialty[key].push(provider);
    });
  });
  Object.keys(bySpecialty).forEach(function (specialty) {
    bySpecialty[specialty].sort(function (a, b) { return providerScore(b) - providerScore(a); });
  });

  let shown = 0;
  Object.keys(SPECIALTIES).forEach(function (specialty) {
    const list = bySpecialty[specialty];
    if (!list || !list.length) return;
    shown += list.length;

    const section = document.createElement('div');
    section.className = 'team-specialty-section';

    const heading = document.createElement('div');
    heading.className = 'team-spec-head';
    const title = document.createElement('h3');
    title.innerHTML = specialtyIconSvg(specialty);
    title.appendChild(document.createTextNode(' ' + specialtyName(specialty, lang)));
    heading.appendChild(title);
    const count = document.createElement('span');
    count.className = 'team-spec-count';
    count.textContent = list.length;
    heading.appendChild(count);
    section.appendChild(heading);

    const row = document.createElement('div');
    row.className = 'avatar-row';

    list.forEach(function (provider, index) {
      const pick = document.createElement('button');
      pick.type = 'button';
      pick.className = 'avatar-pick';
      pick.dataset.email = provider.email;
      pick.dataset.spec = specialty;
      if (selectedTeam[specialty] === provider.email) pick.classList.add('selected');

      pick.appendChild(providerAvatar(provider));

      if (index === 0 && !teamSearchTerm) {
        const badge = document.createElement('span');
        badge.className = 'ap-badge';
        badge.textContent = t('recommended_short');
        pick.appendChild(badge);
      }
      if (isProviderRecentlyActive(provider)) {
        const dot = document.createElement('span');
        dot.className = 'ap-live';
        pick.appendChild(dot);
      }

      const name = document.createElement('span');
      name.className = 'ap-name';
      name.textContent = providerShortName(provider);
      pick.appendChild(name);

      const stats = ratingStatsFor(provider.email);
      if (stats.count) {
        const rating = document.createElement('span');
        rating.className = 'ap-rating';
        rating.innerHTML = '';
    rating.appendChild(iconSvg('star', 'ui-icon'));
    rating.appendChild(document.createTextNode(' ' + stats.avg.toFixed(1)));
        pick.appendChild(rating);
      }

      pick.addEventListener('click', function () {
        openProviderSheet(provider, specialty);
      });

      row.appendChild(pick);
    });

    section.appendChild(row);
    teamList.appendChild(section);
  });

  const empty = document.getElementById('team-empty');
  if (empty) empty.classList.toggle('hidden', shown > 0);

  renderTeamSelection();
}

/* ملخّص اللي اتاختار تحت — عشان العميل يشوف فريقه وهو بيبني */
function renderTeamSelection() {
  teamList.querySelectorAll('.avatar-pick').forEach(function (pick) {
    pick.classList.toggle('selected', selectedTeam[pick.dataset.spec] === pick.dataset.email);
  });

  const box = document.getElementById('team-picked');
  if (!box) return;
  const keys = Object.keys(selectedTeam).filter(function (key) { return !!selectedTeam[key]; });
  box.innerHTML = '';
  box.classList.toggle('hidden', !keys.length);
  if (!keys.length) return;

  const title = document.createElement('div');
  title.className = 'tp-title';
  title.textContent = fill('team_picked_count', { n: keys.length });
  box.appendChild(title);

  const row = document.createElement('div');
  row.className = 'tp-row';
  keys.forEach(function (key) {
    const provider = teamProviders.filter(function (item) { return item.email === selectedTeam[key]; })[0];
    if (!provider) return;
    const chip = document.createElement('span');
    chip.className = 'tp-chip';
    chip.innerHTML = specialtyIconSvg(key);
    chip.appendChild(document.createTextNode(' ' + providerShortName(provider)));
    row.appendChild(chip);
  });
  box.appendChild(row);
}

/* ---------- شيت بروفايل المتخصص ---------- */

const providerSheet = document.getElementById('provider-sheet');
let sheetProvider = null;
let sheetSpecialty = '';

function openProviderSheet(provider, specialty) {
  sheetProvider = provider;
  sheetSpecialty = specialty || '';

  const body = document.getElementById('ps-body');
  document.getElementById('ps-title').textContent = specialty
    ? specialtyName(specialty, lang)
    : t('provider_profile_title');
  body.innerHTML = '';

  const head = document.createElement('div');
  head.className = 'ps-head';
  head.appendChild(providerAvatar(provider, 'lg'));

  const info = document.createElement('div');
  info.className = 'ps-info';

  const name = document.createElement('div');
  name.className = 'ps-name';
  name.textContent = provider.name || provider.email;
  info.appendChild(name);

  const stats = ratingStatsFor(provider.email);
  const stars = document.createElement('div');
  stars.className = 'stars-display';
  stars.innerHTML = starsDisplayMarkup(stats.avg, stats.count);
  info.appendChild(stars);

  if (isProviderRecentlyActive(provider)) {
    const live = document.createElement('span');
    live.className = 'team-badge active-now';
    live.textContent = t('active_now_badge');
    info.appendChild(live);
  }

  head.appendChild(info);
  body.appendChild(head);

  const chips = document.createElement('div');
  chips.className = 'ps-chips';
  renderSpecialtyChips(chips, providerSpecialties(provider));
  body.appendChild(chips);

  /* أرقامه: كام عميل وكام تقييم — العميل بيختار بمعلومة مش بإحساس */
  const numbers = document.createElement('div');
  numbers.className = 'ps-numbers';
  [
    { value: Number(provider.clientsCount) || 0, label: t('ps_clients') },
    { value: stats.count, label: t('ps_reviews') },
    { value: stats.count ? stats.avg.toFixed(1) : '—', label: t('ps_rating') }
  ].forEach(function (cell) {
    const box = document.createElement('div');
    box.className = 'ps-num';
    const v = document.createElement('strong');
    v.textContent = cell.value;
    box.appendChild(v);
    const l = document.createElement('span');
    l.textContent = cell.label;
    box.appendChild(l);
    numbers.appendChild(box);
  });
  body.appendChild(numbers);

  if (provider.bio) {
    const bio = document.createElement('p');
    bio.className = 'ps-bio';
    bio.textContent = provider.bio;
    body.appendChild(bio);
  }

  if (provider.certs) {
    const certs = document.createElement('div');
    certs.className = 'ps-certs';
    const certTitle = document.createElement('div');
    certTitle.className = 'ps-sec-title';
    certTitle.textContent = t('ps_certs');
    certs.appendChild(certTitle);
    const certText = document.createElement('p');
    certText.textContent = provider.certs;
    certs.appendChild(certText);
    body.appendChild(certs);
  }

  const pickBtn = document.getElementById('ps-pick-btn');
  const already = sheetSpecialty && selectedTeam[sheetSpecialty] === provider.email;
  pickBtn.textContent = already ? t('ps_remove') : t('ps_pick');
  pickBtn.classList.toggle('picked', already);
  pickBtn.classList.toggle('hidden', !sheetSpecialty);

  providerSheet.classList.remove('hidden');
  document.body.classList.add('focus-open');
}

function closeProviderSheet() {
  providerSheet.classList.add('hidden');
  document.body.classList.remove('focus-open');
}

document.getElementById('ps-close').addEventListener('click', closeProviderSheet);

document.getElementById('ps-pick-btn').addEventListener('click', function () {
  if (!sheetProvider || !sheetSpecialty) return;
  if (selectedTeam[sheetSpecialty] === sheetProvider.email) {
    delete selectedTeam[sheetSpecialty];
  } else {
    selectedTeam[sheetSpecialty] = sheetProvider.email;
  }
  renderTeamSelection();
  closeProviderSheet();
});

const teamSearchInput = document.getElementById('team-search');
if (teamSearchInput) {
  teamSearchInput.addEventListener('input', function () {
    teamSearchTerm = teamSearchInput.value.trim();
    renderTeamPicker();
  });
}

async function openTeamEditor() {
  teamEditEmail = clientEmail;
  teamEditMode = 'edit';
  teamSaveBtn.textContent = t('team_save_edit');
  teamSkipBtn.classList.add('hidden');
  teamBackBtn.classList.remove('hidden');
  showScreen(teamScreen);
  let existingTeam = {};
  try {
    const clientDoc = await getDoc(doc(db, 'clients', clientEmail));
    existingTeam = (clientDoc.exists() && clientDoc.data().team) ? clientDoc.data().team : {};
  } catch (error) {
    existingTeam = {};
  }
  loadTeamPicker(existingTeam);
}

document.getElementById('change-team-btn').addEventListener('click', openTeamEditor);

teamBackBtn.addEventListener('click', function () {
  showScreen(teamViewScreen);
  loadTeamView();
});

document.getElementById('team-save-btn').addEventListener('click', async function () {
  teamMessage.textContent = t('saving');
  try {
    const payload = {
      team: selectedTeam,
      coachEmail: selectedTeam.coach || ''
    };
    if (teamEditMode === 'onboarding') payload.onboarded = true;
    await setDoc(doc(db, 'clients', teamEditEmail), payload, { merge: true });
    notifyNewTeamMembers(teamBeforeEdit, selectedTeam);
    showScreen(clientScreen);
    loadClient(teamEditEmail);
  } catch (error) {
    teamMessage.textContent = t('problem') + error.message;
  }
});

document.getElementById('team-skip-btn').addEventListener('click', async function () {
  try {
    await setDoc(doc(db, 'clients', onboardingEmail), { onboarded: true }, { merge: true });
  } catch (error) {
    // مش هنوقف العميل بسبب فشل الخطوة دي، هيقدر يختار فريقه بعدين
  }
  showScreen(clientScreen);
  loadClient(onboardingEmail);
});

/* ============================ بلاغ الإصابة والألم ============================ */

function refreshHotspots() {
  document.querySelectorAll('#injury-screen .hotspot').forEach(function (node) {
    node.classList.toggle('selected', selectedInjuryParts.indexOf(node.getAttribute('data-part')) !== -1);
  });

  injuryPartsChips.innerHTML = '';
  selectedInjuryParts.forEach(function (part) {
    const chip = document.createElement('span');
    chip.className = 'chip active';
    chip.textContent = bodyPartName(part);
    injuryPartsChips.appendChild(chip);
  });
}

document.querySelectorAll('#injury-screen .hotspot').forEach(function (node) {
  node.addEventListener('click', function () {
    const part = node.getAttribute('data-part');
    const index = selectedInjuryParts.indexOf(part);
    if (index === -1) selectedInjuryParts.push(part); else selectedInjuryParts.splice(index, 1);
    refreshHotspots();
  });
});

function resetInjuryForm() {
  selectedInjuryParts = [];
  injuryDesc.value = '';
  injuryScanImage = '';
  injuryScan.value = '';
  injuryScanPreview.removeAttribute('src');
  injuryScanBox.classList.add('hidden');
  injuryScanLabel.textContent = t('choose_scan');
  injuryMessage.textContent = '';
  refreshHotspots();
}

injuryScan.addEventListener('change', async function () {
  const file = injuryScan.files[0];
  if (!file) return;

  if (file.size > MAX_SOURCE_BYTES) {
    injuryMessage.textContent = t('image_too_big');
    injuryScan.value = '';
    return;
  }

  injuryMessage.textContent = t('preparing_image');
  try {
    injuryScanImage = await compressImage(file, IMAGE_MAX_SIDE, 0.7);
    injuryScanPreview.src = injuryScanImage;
    injuryScanBox.classList.remove('hidden');
    injuryScanLabel.textContent = t('image_chosen');
    injuryMessage.textContent = '';
  } catch (error) {
    injuryMessage.textContent = t('image_failed');
  }
});

document.getElementById('injury-scan-remove').addEventListener('click', function () {
  injuryScanImage = '';
  injuryScan.value = '';
  injuryScanPreview.removeAttribute('src');
  injuryScanBox.classList.add('hidden');
  injuryScanLabel.textContent = t('choose_scan');
});

async function loadInjuryHistory() {
  injuryHistoryList.innerHTML = '';
  try {
    const snapshot = await getDocs(collection(db, 'injuryReports'));
    const mine = snapshot.docs
      .map(function (item) { return Object.assign({ id: item.id }, item.data()); })
      .filter(function (report) { return report.clientEmail === clientEmail; })
      .sort(function (a, b) { return String(b.createdAt || '').localeCompare(String(a.createdAt || '')); });

    if (!mine.length) {
      const empty = document.createElement('li');
      empty.textContent = t('no_injury_reports');
      injuryHistoryList.appendChild(empty);
      return;
    }

    mine.forEach(function (report) {
      const item = document.createElement('li');

      const parts = document.createElement('div');
      parts.className = 'client-name';
      parts.textContent = (report.bodyParts || []).map(bodyPartName).join('، ');
      item.appendChild(parts);

      if (report.description) {
        const desc = document.createElement('div');
        desc.className = 'client-email';
        desc.textContent = report.description;
        item.appendChild(desc);
      }

      const status = document.createElement('div');
      status.className = 'client-status';
      status.textContent = t('status_' + (report.status || 'requested'));
      item.appendChild(status);

      injuryHistoryList.appendChild(item);
    });
  } catch (error) {
    // مش هنوقف الشاشة بسبب فشل تحميل السجل القديم
  }
}

document.getElementById('injury-submit-btn').addEventListener('click', async function () {
  if (!selectedInjuryParts.length) {
    injuryMessage.textContent = t('need_injury_parts');
    return;
  }

  injuryMessage.textContent = t('saving');
  try {
    const id = 'injury_' + Date.now();
    await setDoc(doc(db, 'injuryReports', id), {
      clientEmail: clientEmail,
      clientName: clientName,
      bodyParts: selectedInjuryParts.slice(),
      description: injuryDesc.value.trim(),
      scan: injuryScanImage,
      status: 'requested',
      createdAt: new Date().toISOString()
    });
    setStatusMessage(injuryMessage, t('injury_saved'), 'success');
    const reportedParts = selectedInjuryParts.slice();
    notify(teamEmailsOf(clientRecord), 'injury_new', {
      target: 'client', about: clientEmail, aboutName: clientName || '',
      params: function () {
        return { name: clientName || clientEmail, parts: reportedParts.map(bodyPartName).join('، ') };
      }
    });
    resetInjuryForm();
    loadInjuryHistory();
  } catch (error) {
    injuryMessage.textContent = t('problem') + error.message;
  }
});

document.getElementById('report-injury-btn').addEventListener('click', function () {
  showScreen(injuryScreen);
  resetInjuryForm();
  loadInjuryHistory();
});

document.getElementById('injury-back-btn').addEventListener('click', function () {
  showScreen(clientScreen);
});

/* ============================ بلاغات الإصابة — شاشة المدرب ============================ */

async function fetchClientInjuryReports(email) {
  const snapshot = await getDocs(collection(db, 'injuryReports'));
  return snapshot.docs
    .map(function (item) { return Object.assign({ id: item.id }, item.data()); })
    .filter(function (report) { return report.clientEmail === email; })
    .sort(function (a, b) { return String(b.createdAt || '').localeCompare(String(a.createdAt || '')); });
}

async function refreshInjuryBadge(email) {
  tabInjuriesBadge.classList.add('hidden');
  tabInjuriesBadge.textContent = '';
  try {
    const reports = await fetchClientInjuryReports(email);
    const pending = reports.filter(function (report) { return (report.status || 'requested') === 'requested'; }).length;
    if (pending) {
      tabInjuriesBadge.textContent = pending;
      tabInjuriesBadge.classList.remove('hidden');
    }
  } catch (error) {
    // مش مشكلة لو فشل تحميل العداد
  }
}

function injuryStatusOptionsMarkup(currentStatus) {
  return ['requested', 'confirmed', 'done'].map(function (key) {
    return '<option value="' + key + '"' + (key === (currentStatus || 'requested') ? ' selected' : '') + '>' + t('status_' + key) + '</option>';
  }).join('');
}

async function loadCoachInjuryReports() {
  if (!currentClient) return;
  coachInjuriesList.innerHTML = '';
  coachInjuriesMessage.textContent = t('loading');
  try {
    const reports = await fetchClientInjuryReports(currentClient);
    coachInjuriesMessage.textContent = '';

    if (!reports.length) {
      coachInjuriesMessage.textContent = t('no_client_injuries');
      return;
    }

    reports.forEach(function (report) {
      const item = document.createElement('li');
      item.className = 'injury-report-card status-' + (report.status || 'requested');

      const parts = document.createElement('div');
      parts.className = 'client-name';
      parts.textContent = (report.bodyParts || []).map(bodyPartName).join('، ');
      item.appendChild(parts);

      if (report.createdAt) {
        const when = document.createElement('div');
        when.className = 'ex-meta';
        try {
          when.textContent = t('reported_on') + ' ' + new Date(report.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB');
        } catch (error) {
          when.textContent = '';
        }
        item.appendChild(when);
      }

      if (report.description) {
        const desc = document.createElement('div');
        desc.className = 'client-email';
        desc.textContent = report.description;
        item.appendChild(desc);
      }

      if (report.scan) {
        const scanBtn = document.createElement('button');
        scanBtn.type = 'button';
        scanBtn.className = 'secondary';
        scanBtn.textContent = t('view_scan_btn');
        scanBtn.addEventListener('click', function () {
          lightboxTitle.textContent = parts.textContent;
          lightboxImages.innerHTML = '';
          addShot(report.scan, '');
          lightbox.classList.remove('hidden');
        });
        item.appendChild(scanBtn);
      }

      const statusRow = document.createElement('div');
      statusRow.className = 'row';
      const statusSelect = document.createElement('select');
      statusSelect.innerHTML = injuryStatusOptionsMarkup(report.status);
      statusSelect.addEventListener('change', async function () {
        try {
          await setDoc(doc(db, 'injuryReports', report.id), { status: statusSelect.value }, { merge: true });
          report.status = statusSelect.value;
          const injuryStatus = statusSelect.value;
          notify(report.clientEmail, 'injury_status', {
            target: 'injury',
            params: function () { return { status: t('status_' + injuryStatus) }; }
          });
          item.className = 'injury-report-card status-' + statusSelect.value;
          setStatusMessage(coachInjuriesMessage, t('status_update_saved'), 'success');
          refreshInjuryBadge(currentClient);
        } catch (error) {
          coachInjuriesMessage.textContent = t('problem') + error.message;
        }
      });
      statusRow.appendChild(statusSelect);
      item.appendChild(statusRow);

      coachInjuriesList.appendChild(item);
    });
  } catch (error) {
    coachInjuriesMessage.textContent = t('problem') + error.message;
  }
}

/* ============================ الحجوزات ============================ */

const SPECIALTY_SESSION_TYPES = {
  rehab: ['rehab_session', 'assessment'],
  physio: ['physio_session', 'assessment'],
  ortho: ['consult_visit', 'assessment'],
  radiology: ['consult_visit'],
  sports_medicine: ['consult_visit', 'assessment'],
  massage: ['massage_sports', 'massage_recovery'],
  psychologist: ['consult_visit']
};

function sessionTypesForSpecialty(specialty) {
  return SPECIALTY_SESSION_TYPES[specialty] || [];
}

function sessionTypeName(key) {
  return (SESSION_TYPES[key] && SESSION_TYPES[key][lang]) || key;
}

function bookingStatusName(key) {
  return (BOOKING_STATUS[key] && BOOKING_STATUS[key][lang]) || key;
}

function bookingStatusOptionsMarkup(currentStatus) {
  return Object.keys(BOOKING_STATUS).map(function (key) {
    return '<option value="' + key + '"' + (key === (currentStatus || 'requested') ? ' selected' : '') + '>' + bookingStatusName(key) + '</option>';
  }).join('');
}

async function fetchProviderBookings(email) {
  const snapshot = await getDocs(collection(db, 'bookings'));
  return snapshot.docs
    .map(function (item) { return Object.assign({ id: item.id }, item.data()); })
    .filter(function (booking) { return booking.providerEmail === email; })
    .sort(function (a, b) { return String(b.createdAt || '').localeCompare(String(a.createdAt || '')); });
}

async function fetchClientBookings(email) {
  const snapshot = await getDocs(collection(db, 'bookings'));
  return snapshot.docs
    .map(function (item) { return Object.assign({ id: item.id }, item.data()); })
    .filter(function (booking) { return booking.clientEmail === email; })
    .sort(function (a, b) { return String(b.createdAt || '').localeCompare(String(a.createdAt || '')); });
}

function bookingCardMarkup(booking) {
  const item = document.createElement('li');
  item.className = 'booking-card status-' + (booking.status || 'requested');

  const title = document.createElement('div');
  title.className = 'client-name';
  title.textContent = sessionTypeName(booking.sessionType) + (booking.clientName ? ' — ' + booking.clientName : '');
  item.appendChild(title);

  if (booking.date) {
    const when = document.createElement('div');
    when.className = 'ex-meta';
    when.textContent = booking.date;
    item.appendChild(when);
  }

  if (booking.note) {
    const note = document.createElement('div');
    note.className = 'client-email';
    note.textContent = booking.note;
    item.appendChild(note);
  }

  const statusLine = document.createElement('div');
  statusLine.className = 'ex-meta';
  statusLine.textContent = bookingStatusName(booking.status || 'requested');
  item.appendChild(statusLine);

  return item;
}

async function loadProviderBookings() {
  if (!currentProviderEmail) return;
  bookingsList.innerHTML = '';
  bookingsMessage.textContent = t('loading');
  try {
    const bookings = await fetchProviderBookings(currentProviderEmail);
    bookingsMessage.textContent = '';

    if (!bookings.length) {
      bookingsMessage.textContent = t('no_bookings');
      return;
    }

    bookings.forEach(function (booking) {
      const item = bookingCardMarkup(booking);

      const statusRow = document.createElement('div');
      statusRow.className = 'row';
      const statusSelect = document.createElement('select');
      statusSelect.innerHTML = bookingStatusOptionsMarkup(booking.status);
      statusSelect.addEventListener('change', async function () {
        try {
          await setDoc(doc(db, 'bookings', booking.id), { status: statusSelect.value }, { merge: true });
          booking.status = statusSelect.value;
          const bookingStatus = statusSelect.value;
          notify(booking.clientEmail, 'booking_status', {
            target: 'home',
            params: function () { return { date: booking.date || '', status: bookingStatusName(bookingStatus) }; }
          });
          item.className = 'booking-card status-' + statusSelect.value;
          setStatusMessage(bookingsMessage, t('status_update_saved'), 'success');
        } catch (error) {
          bookingsMessage.textContent = t('problem') + error.message;
        }
      });
      statusRow.appendChild(statusSelect);
      item.appendChild(statusRow);

      bookingsList.appendChild(item);
    });
  } catch (error) {
    bookingsMessage.textContent = t('problem') + error.message;
  }
}

document.getElementById('open-bookings-btn').addEventListener('click', function () {
  showScreen(bookingsScreen);
  loadProviderBookings();
});

document.getElementById('bookings-back-btn').addEventListener('click', function () {
  showScreen(clientsScreen);
  loadClients();
});

/* ============================ فريق العميل والتقييمات ============================ */

function starPickerMarkup(currentRating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += '<button type="button" class="star-btn' + (i <= currentRating ? ' filled' : '') + '" data-value="' + i + '">' + starIconSvg(i <= currentRating) + '</button>';
  }
  return html;
}

function wireStarPicker(container, onChange) {
  let current = Number(container.getAttribute('data-rating')) || 0;
  function repaint() {
    container.setAttribute('data-rating', current);
    container.innerHTML = starPickerMarkup(current);
    container.querySelectorAll('.star-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        current = Number(btn.getAttribute('data-value'));
        repaint();
        onChange(current);
      });
    });
  }
  repaint();
}

async function loadTeamView() {
  teamViewList.innerHTML = '<p class="message">' + t('loading') + '</p>';

  try {
    const clientDoc = await getDoc(doc(db, 'clients', clientEmail));
    const clientData = clientDoc.exists() ? clientDoc.data() : {};
    const team = clientData.team || {};
    const pickedSpecialties = Object.keys(team).filter(function (key) { return !!team[key]; });

    // المدرب الأساسي جزء من "فريقك" دايمًا، حتى لو العميل ما اختارش
    // حد في specialties بتاعته — coachEmail لو مش محفوظ (عملاء قدام)
    // بيرجع لصاحب المنصة الافتراضي زي ما بقية الكود بيعمل
    const coachEmail = (clientData.coachEmail || COACH_EMAIL).toLowerCase();
    const members = [{ specialty: 'coach', email: coachEmail }].concat(
      pickedSpecialties.map(function (specialty) { return { specialty: specialty, email: team[specialty] }; })
    );

    await fetchAllProviderReviews();

    const providerDocs = await Promise.all(members.map(function (member) {
      return getDoc(doc(db, 'providers', member.email));
    }));

    teamViewList.innerHTML = '';

    members.forEach(function (member, index) {
      const providerSnap = providerDocs[index];
      const specialty = member.specialty;
      const providerEmail = member.email;
      // المدرب الأساسي (لو هو صاحب المنصة القديم) ممكن ميكونش ليه مستند
      // providers أصلاً — في الحالة دي لسه نعرض كارت بسيط بيه، من غير
      // ما نعمل return ونخفيه زي أي متخصص تاني ملوش مستند
      const isOwnerCoach = specialty === 'coach' && providerEmail === COACH_EMAIL.toLowerCase();
      if (!providerSnap.exists() && !isOwnerCoach) return;
      const provider = providerSnap.exists() ? providerSnap.data() : { specialty: 'coach' };

      const card = document.createElement('div');
      card.className = 'review-card';

      if (provider.photo) {
        const photo = document.createElement('img');
        photo.src = provider.photo;
        photo.alt = '';
        photo.className = 'team-member-photo';
        card.appendChild(photo);
      }

      const name = document.createElement('div');
      name.className = 'ex-name';
      setSpecialtyLabel(name, specialty, provider.name || (isOwnerCoach ? t('platform_owner_label') : ''));
      card.appendChild(name);

      const meta = document.createElement('div');
      meta.className = 'ex-meta';
      meta.textContent = specialtyName(specialty, lang);
      card.appendChild(meta);

      if (provider.bio) {
        const bio = document.createElement('p');
        bio.className = 'or';
        bio.textContent = provider.bio;
        card.appendChild(bio);
      }

      if (provider.certifications) {
        const certs = document.createElement('p');
        certs.className = 'or';
        certs.textContent = provider.certifications;
        card.appendChild(certs);
      }

      const stats = ratingStatsFor(providerEmail);
      const statsRow = document.createElement('div');
      statsRow.className = 'stars-display';
      statsRow.innerHTML = starsDisplayMarkup(stats.avg, stats.count);
      card.appendChild(statsRow);

      if (provider.clientsCount) {
        const traineeLine = document.createElement('p');
        traineeLine.className = 'ex-meta';
        traineeLine.textContent = fill('trainee_count_label', { n: provider.clientsCount });
        card.appendChild(traineeLine);
      }

      const chatBtn = document.createElement('button');
      chatBtn.type = 'button';
      chatBtn.className = 'secondary';
      chatBtn.textContent = t('chat_with_provider_btn');
      chatBtn.addEventListener('click', function () {
        openChatThread(clientEmail, teamViewScreen);
      });
      card.appendChild(chatBtn);

      const writtenReviews = allProviderReviews.filter(function (review) {
        return review.providerEmail === providerEmail && (review.comment || '').trim();
      }).sort(function (a, b) {
        return String(b.createdAt || '').localeCompare(String(a.createdAt || ''));
      }).slice(0, 6);

      if (writtenReviews.length) {
        const reviewsTitle = document.createElement('div');
        reviewsTitle.className = 'field-label';
        reviewsTitle.textContent = t('written_reviews_title');
        card.appendChild(reviewsTitle);

        const reviewsList = document.createElement('ul');
        reviewsList.className = 'written-reviews-list';
        writtenReviews.forEach(function (review) {
          const reviewItem = document.createElement('li');

          const reviewHead = document.createElement('div');
          reviewHead.className = 'written-review-head';

          const reviewerName = document.createElement('span');
          reviewerName.className = 'written-review-name';
          reviewerName.textContent = review.clientName || t('client_label');
          reviewHead.appendChild(reviewerName);

          const reviewStars = document.createElement('span');
          reviewStars.className = 'stars-display small';
          reviewStars.innerHTML = starsDisplayMarkup(Number(review.rating) || 0, 0);
          reviewHead.appendChild(reviewStars);

          reviewItem.appendChild(reviewHead);

          const reviewComment = document.createElement('p');
          reviewComment.className = 'or';
          reviewComment.textContent = review.comment;
          reviewItem.appendChild(reviewComment);

          reviewsList.appendChild(reviewItem);
        });
        card.appendChild(reviewsList);
      }

      const myReview = allProviderReviews.find(function (review) {
        return review.providerEmail === providerEmail && review.clientEmail === clientEmail;
      });

      const label = document.createElement('label');
      label.className = 'field-label';
      label.textContent = t('rate_provider_label');
      card.appendChild(label);

      const picker = document.createElement('div');
      picker.className = 'star-picker';
      let myRating = myReview ? Number(myReview.rating) : 0;
      picker.setAttribute('data-rating', myRating);
      card.appendChild(picker);
      wireStarPicker(picker, function (value) { myRating = value; });

      const comment = document.createElement('textarea');
      comment.rows = 2;
      comment.placeholder = t('review_comment_ph');
      comment.value = myReview ? (myReview.comment || '') : '';
      card.appendChild(comment);

      const saveBtn = document.createElement('button');
      saveBtn.type = 'button';
      saveBtn.textContent = t('save_review_btn');
      card.appendChild(saveBtn);

      const message = document.createElement('p');
      message.className = 'message';
      card.appendChild(message);

      saveBtn.addEventListener('click', async function () {
        if (!myRating) {
          message.textContent = t('need_rating');
          return;
        }
        message.textContent = t('saving');
        try {
          const reviewId = providerEmail + '__' + clientEmail;
          await setDoc(doc(db, 'providerReviews', reviewId), {
            providerEmail: providerEmail,
            clientEmail: clientEmail,
            clientName: clientName,
            rating: myRating,
            comment: comment.value.trim(),
            createdAt: new Date().toISOString()
          }, { merge: true });
          message.textContent = t('review_saved');
        } catch (error) {
          message.textContent = t('problem') + error.message;
        }
      });

      if (SPECIALTIES[specialty] && SPECIALTIES[specialty].books) {
        const bookBtn = document.createElement('button');
        bookBtn.type = 'button';
        bookBtn.className = 'book-session-btn';
        const bookBtnIcon = document.createElement('span');
        bookBtnIcon.className = 'inline-icon';
        bookBtnIcon.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15" rx="2"></rect><line x1="3.5" y1="9.5" x2="20.5" y2="9.5"></line><line x1="8" y1="3" x2="8" y2="6.5"></line><line x1="16" y1="3" x2="16" y2="6.5"></line></svg>';
        const bookBtnLabel = document.createElement('span');
        bookBtnLabel.textContent = t('book_session_btn');
        bookBtn.appendChild(bookBtnIcon);
        bookBtn.appendChild(bookBtnLabel);
        card.appendChild(bookBtn);

        const bookingForm = document.createElement('div');
        bookingForm.className = 'booking-form hidden';

        const typeLabel = document.createElement('label');
        typeLabel.className = 'field-label';
        typeLabel.textContent = t('session_type_label');
        bookingForm.appendChild(typeLabel);

        const typeSelect = document.createElement('select');
        sessionTypesForSpecialty(specialty).forEach(function (key) {
          const option = document.createElement('option');
          option.value = key;
          option.textContent = sessionTypeName(key);
          typeSelect.appendChild(option);
        });
        bookingForm.appendChild(typeSelect);

        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.placeholder = t('booking_date_ph');
        bookingForm.appendChild(dateInput);

        const noteInput = document.createElement('textarea');
        noteInput.rows = 2;
        noteInput.placeholder = t('booking_note_ph');
        bookingForm.appendChild(noteInput);

        const submitBtn = document.createElement('button');
        submitBtn.type = 'button';
        submitBtn.textContent = t('submit_booking_btn');
        bookingForm.appendChild(submitBtn);

        const bookingMessage = document.createElement('p');
        bookingMessage.className = 'message';
        bookingForm.appendChild(bookingMessage);

        bookBtn.addEventListener('click', function () {
          bookingForm.classList.toggle('hidden');
        });

        submitBtn.addEventListener('click', async function () {
          if (!typeSelect.value || !dateInput.value) {
            bookingMessage.textContent = t('need_booking_fields');
            return;
          }
          bookingMessage.textContent = t('saving');
          try {
            const id = 'booking_' + Date.now();
            await setDoc(doc(db, 'bookings', id), {
              clientEmail: clientEmail,
              clientName: clientName,
              providerEmail: providerEmail,
              specialty: specialty,
              sessionType: typeSelect.value,
              date: dateInput.value,
              note: noteInput.value.trim(),
              status: 'requested',
              createdAt: new Date().toISOString()
            });
            setStatusMessage(bookingMessage, t('booking_requested'), 'success');
            const bookedDate = dateInput.value;
            notify(providerEmail, 'booking_new', {
              target: 'bookings', about: clientEmail, aboutName: clientName || '',
              params: function () { return { name: clientName || clientEmail, date: bookedDate }; }
            });
            noteInput.value = '';
          } catch (error) {
            bookingMessage.textContent = t('problem') + error.message;
          }
        });

        card.appendChild(bookingForm);
      }

      teamViewList.appendChild(card);
    });
  } catch (error) {
    teamViewList.innerHTML = '<p class="message">' + t('problem') + error.message + '</p>';
  }
}

document.getElementById('view-team-btn').addEventListener('click', function () {
  showScreen(teamViewScreen);
  loadTeamView();
});

document.getElementById('team-view-back-btn').addEventListener('click', function () {
  showScreen(clientScreen);
});

/* ============================ الحاسبات ============================ */

const calcTabsBar = document.getElementById('calc-tabs');
const calcMessage = document.getElementById('calc-message');

const CALC_PANELS = {
  bmi: document.getElementById('calc-bmi'),
  bmr: document.getElementById('calc-bmr'),
  '1rm': document.getElementById('calc-1rm'),
  macro: document.getElementById('calc-macro'),
  hr: document.getElementById('calc-hr'),
  water: document.getElementById('calc-water'),
  unit: document.getElementById('calc-unit')
};
const CALC_TABS = {
  bmi: document.getElementById('cctab-bmi'),
  bmr: document.getElementById('cctab-bmr'),
  '1rm': document.getElementById('cctab-1rm'),
  macro: document.getElementById('cctab-macro'),
  hr: document.getElementById('cctab-hr'),
  water: document.getElementById('cctab-water'),
  unit: document.getElementById('cctab-unit')
};

function showCalcTab(key) {
  Object.keys(CALC_PANELS).forEach(function (k) {
    CALC_PANELS[k].classList.toggle('hidden', k !== key);
    CALC_TABS[k].classList.toggle('active', k === key);
  });
  calcMessage.textContent = '';
}

Object.keys(CALC_TABS).forEach(function (key) {
  CALC_TABS[key].addEventListener('click', function () {
    showCalcTab(key);
  });
});

const bmrActivitySelect = document.getElementById('bmr-activity');
const macroGoalSelect = document.getElementById('macro-goal');

const CALC_ACTIVITY_LEVELS = [
  { value: '1.2', key: 'act_level_sedentary' },
  { value: '1.375', key: 'act_level_light' },
  { value: '1.55', key: 'act_level_moderate' },
  { value: '1.725', key: 'act_level_active' },
  { value: '1.9', key: 'act_level_very_active' }
];
const MACRO_GOALS = [
  { value: 'maintenance', key: 'goal_maintenance', factor: 1 },
  { value: 'cutting', key: 'goal_cutting', factor: 0.85 },
  { value: 'aggressive_cut', key: 'goal_aggressive_cut', factor: 0.75 },
  { value: 'bulking', key: 'goal_bulking', factor: 1.1 },
  { value: 'aggressive_bulk', key: 'goal_aggressive_bulk', factor: 1.2 }
];

function fillCalcSelects() {
  const activeActivity = bmrActivitySelect.value;
  bmrActivitySelect.innerHTML = '';
  CALC_ACTIVITY_LEVELS.forEach(function (item) {
    const option = document.createElement('option');
    option.value = item.value;
    option.textContent = t(item.key);
    bmrActivitySelect.appendChild(option);
  });
  if (activeActivity) bmrActivitySelect.value = activeActivity;

  const activeGoal = macroGoalSelect.value;
  macroGoalSelect.innerHTML = '';
  MACRO_GOALS.forEach(function (item) {
    const option = document.createElement('option');
    option.value = item.value;
    option.textContent = t(item.key);
    macroGoalSelect.appendChild(option);
  });
  if (activeGoal) macroGoalSelect.value = activeGoal;
}

function openCalculators(returnScreen) {
  calcReturnScreen = returnScreen;
  fillCalcSelects();
  showScreen(calculatorsScreen);
  showCalcTab('bmi');
}

document.getElementById('open-calc-btn').addEventListener('click', function () {
  openCalculators(clientScreen);
});
document.getElementById('open-calc-coach-btn').addEventListener('click', function () {
  openCalculators(coachScreen);
});
document.getElementById('calc-back-btn').addEventListener('click', function () {
  showScreen(calcReturnScreen || clientScreen);
});

function calcResultLine(label, value) {
  const line = document.createElement('div');
  line.className = 'calc-line';
  const labelEl = document.createElement('span');
  labelEl.textContent = label;
  const valueEl = document.createElement('strong');
  valueEl.textContent = value;
  line.appendChild(labelEl);
  line.appendChild(valueEl);
  return line;
}

/* ---------- BMI ---------- */
const bmiWeightInput = document.getElementById('bmi-weight');
const bmiHeightInput = document.getElementById('bmi-height');
const bmiResult = document.getElementById('bmi-result');

document.getElementById('bmi-calc-btn').addEventListener('click', function () {
  const weight = parseFloat(bmiWeightInput.value);
  const height = parseFloat(bmiHeightInput.value);
  if (!weight || !height) {
    calcMessage.textContent = t('calc_need_numbers');
    return;
  }
  calcMessage.textContent = '';
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);

  let categoryKey = 'bmi_cat_normal';
  if (bmi < 18.5) categoryKey = 'bmi_cat_under';
  else if (bmi >= 25 && bmi < 30) categoryKey = 'bmi_cat_over';
  else if (bmi >= 30) categoryKey = 'bmi_cat_obese';

  bmiResult.innerHTML = '';
  bmiResult.appendChild(calcResultLine(t('calc_bmi_label'), bmi.toFixed(1) + ' — ' + t(categoryKey)));
  bmiResult.classList.remove('hidden');
});

/* ---------- BMR / TDEE ---------- */
const bmrGenderSelect = document.getElementById('bmr-gender');
const bmrAgeInput = document.getElementById('bmr-age');
const bmrWeightInput = document.getElementById('bmr-weight');
const bmrHeightInput = document.getElementById('bmr-height');
const bmrResult = document.getElementById('bmr-result');
const macroTdeeInput = document.getElementById('macro-tdee');
let lastComputedTDEE = null;

document.getElementById('bmr-calc-btn').addEventListener('click', function () {
  const age = parseFloat(bmrAgeInput.value);
  const weight = parseFloat(bmrWeightInput.value);
  const height = parseFloat(bmrHeightInput.value);
  if (!age || !weight || !height) {
    calcMessage.textContent = t('calc_need_numbers');
    return;
  }
  calcMessage.textContent = '';

  // معادلة Mifflin-St Jeor
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr += (bmrGenderSelect.value === 'male') ? 5 : -161;

  const activityFactor = parseFloat(bmrActivitySelect.value) || 1.2;
  const tdee = bmr * activityFactor;
  lastComputedTDEE = Math.round(tdee);

  bmrResult.innerHTML = '';
  bmrResult.appendChild(calcResultLine(t('calc_bmr_label'), Math.round(bmr) + ' ' + t('kcal_day')));
  bmrResult.appendChild(calcResultLine(t('calc_tdee_label'), lastComputedTDEE + ' ' + t('kcal_day')));
  bmrResult.classList.remove('hidden');

  if (!macroTdeeInput.value) macroTdeeInput.value = lastComputedTDEE;
});

/* ---------- 1RM + جدول العدات ---------- */
const rmWeightInput = document.getElementById('rm-weight');
const rmRepsInput = document.getElementById('rm-reps');
const rmResult = document.getElementById('rm-result');
const rmTable = document.getElementById('rm-table');

const RM_PERCENT_TABLE = [100, 95, 90, 85, 80, 75, 70, 65, 60];
const RM_REPS_TABLE = [1, 2, 4, 6, 8, 10, 12, 15, 20];

document.getElementById('rm-calc-btn').addEventListener('click', function () {
  const weight = parseFloat(rmWeightInput.value);
  const reps = parseFloat(rmRepsInput.value);
  if (!weight || !reps) {
    calcMessage.textContent = t('calc_need_numbers');
    return;
  }
  calcMessage.textContent = '';

  // معادلة Epley لتقدير الرفعة القصوى
  const oneRM = (reps <= 1) ? weight : weight * (1 + reps / 30);

  rmResult.innerHTML = '';
  rmResult.appendChild(calcResultLine(t('calc_rm_label'), Math.round(oneRM) + ' ' + t('calc_kg')));
  rmResult.classList.remove('hidden');

  rmTable.innerHTML = '';
  const title = document.createElement('h3');
  title.textContent = t('calc_rm_table_title');
  rmTable.appendChild(title);
  RM_PERCENT_TABLE.forEach(function (pct, index) {
    const row = document.createElement('div');
    row.className = 'rm-table-row';
    const left = document.createElement('span');
    left.textContent = pct + '% — ' + RM_REPS_TABLE[index] + ' ' + t('ex_reps');
    const right = document.createElement('strong');
    right.textContent = Math.round(oneRM * pct / 100) + ' ' + t('calc_kg');
    row.appendChild(left);
    row.appendChild(right);
    rmTable.appendChild(row);
  });
});

/* ---------- الماكروز ---------- */
const macroWeightInput = document.getElementById('macro-weight');
const macroResult = document.getElementById('macro-result');

document.getElementById('macro-calc-btn').addEventListener('click', function () {
  const weight = parseFloat(macroWeightInput.value);
  const manualTdee = parseFloat(macroTdeeInput.value);
  const tdee = manualTdee || lastComputedTDEE;

  if (!weight || !tdee) {
    calcMessage.textContent = t('calc_need_numbers');
    return;
  }
  calcMessage.textContent = '';

  const goal = MACRO_GOALS.filter(function (item) { return item.value === macroGoalSelect.value; })[0] || MACRO_GOALS[0];
  const targetCalories = Math.round(tdee * goal.factor);

  // بروتين أعلى شوية في التنشيف للحفاظ على الكتلة العضلية
  const isCutGoal = (goal.value === 'cutting' || goal.value === 'aggressive_cut');
  const proteinPerKg = isCutGoal ? 2.2 : 1.8;
  const proteinG = Math.round(weight * proteinPerKg);
  const proteinCal = proteinG * 4;

  const fatCal = targetCalories * 0.25;
  const fatG = Math.round(fatCal / 9);

  const carbCal = Math.max(0, targetCalories - proteinCal - fatCal);
  const carbG = Math.round(carbCal / 4);

  macroResult.innerHTML = '';
  macroResult.appendChild(calcResultLine(t('calc_macro_cal_label'), targetCalories + ' ' + t('kcal_day')));
  macroResult.appendChild(calcResultLine(t('calc_macro_protein_label'), proteinG + ' ' + t('calc_g')));
  macroResult.appendChild(calcResultLine(t('calc_macro_carbs_label'), carbG + ' ' + t('calc_g')));
  macroResult.appendChild(calcResultLine(t('calc_macro_fat_label'), fatG + ' ' + t('calc_g')));
  macroResult.classList.remove('hidden');
});

/* ---------- مناطق نبض القلب ---------- */
const hrAgeInput = document.getElementById('hr-age');
const hrRestingInput = document.getElementById('hr-resting');
const hrResult = document.getElementById('hr-result');

document.getElementById('hr-calc-btn').addEventListener('click', function () {
  const age = parseFloat(hrAgeInput.value);
  if (!age) {
    calcMessage.textContent = t('calc_need_numbers');
    return;
  }
  calcMessage.textContent = '';

  const maxHr = 220 - age;
  const resting = parseFloat(hrRestingInput.value) || 0;
  const zoneKeys = ['calc_hr_zone1', 'calc_hr_zone2', 'calc_hr_zone3', 'calc_hr_zone4', 'calc_hr_zone5'];
  const zoneRanges = [[0.5, 0.6], [0.6, 0.7], [0.7, 0.8], [0.8, 0.9], [0.9, 1.0]];

  function zoneHr(fraction) {
    if (resting) return Math.round((maxHr - resting) * fraction + resting); // معادلة Karvonen
    return Math.round(maxHr * fraction);
  }

  hrResult.innerHTML = '';
  hrResult.appendChild(calcResultLine(t('calc_hr_maxhr_label'), Math.round(maxHr) + ' ' + t('calc_bpm')));
  zoneRanges.forEach(function (range, index) {
    hrResult.appendChild(calcResultLine(t(zoneKeys[index]), zoneHr(range[0]) + ' - ' + zoneHr(range[1]) + ' ' + t('calc_bpm')));
  });
  hrResult.classList.remove('hidden');
});

/* ---------- الماء ---------- */
const waterWeightInput = document.getElementById('water-weight');
const waterMinutesInput = document.getElementById('water-minutes');
const waterResult = document.getElementById('water-result');

document.getElementById('water-calc-btn').addEventListener('click', function () {
  const weight = parseFloat(waterWeightInput.value);
  if (!weight) {
    calcMessage.textContent = t('calc_need_numbers');
    return;
  }
  calcMessage.textContent = '';

  const minutes = parseFloat(waterMinutesInput.value) || 0;
  const baseMl = weight * 35;
  const activityMl = (minutes / 30) * 350;
  const totalLiters = (baseMl + activityMl) / 1000;

  waterResult.innerHTML = '';
  waterResult.appendChild(calcResultLine(t('calc_water_label'), totalLiters.toFixed(1) + ' ' + t('calc_liters')));
  waterResult.classList.remove('hidden');
});

/* ---------- تحويل الوحدات ---------- */
const unitKgInput = document.getElementById('unit-kg');
const unitLbInput = document.getElementById('unit-lb');
const unitCmInput = document.getElementById('unit-cm');
const unitFtInput = document.getElementById('unit-ft');
const unitInInput = document.getElementById('unit-in');
const unitKmInput = document.getElementById('unit-km');
const unitMiInput = document.getElementById('unit-mi');

const KG_PER_LB = 0.45359237;
const CM_PER_IN = 2.54;
const KM_PER_MI = 1.609344;

unitKgInput.addEventListener('input', function () {
  const kg = parseFloat(unitKgInput.value);
  unitLbInput.value = kg ? +(kg / KG_PER_LB).toFixed(1) : '';
});
unitLbInput.addEventListener('input', function () {
  const lb = parseFloat(unitLbInput.value);
  unitKgInput.value = lb ? +(lb * KG_PER_LB).toFixed(1) : '';
});

unitCmInput.addEventListener('input', function () {
  const cm = parseFloat(unitCmInput.value);
  if (!cm) { unitFtInput.value = ''; unitInInput.value = ''; return; }
  const totalIn = cm / CM_PER_IN;
  unitFtInput.value = Math.floor(totalIn / 12);
  unitInInput.value = +(totalIn % 12).toFixed(1);
});
function unitFtInToCm() {
  const feet = parseFloat(unitFtInput.value) || 0;
  const inches = parseFloat(unitInInput.value) || 0;
  if (!feet && !inches) { unitCmInput.value = ''; return; }
  unitCmInput.value = Math.round((feet * 12 + inches) * CM_PER_IN);
}
unitFtInput.addEventListener('input', unitFtInToCm);
unitInInput.addEventListener('input', unitFtInToCm);

unitKmInput.addEventListener('input', function () {
  const km = parseFloat(unitKmInput.value);
  unitMiInput.value = km ? +(km / KM_PER_MI).toFixed(2) : '';
});
unitMiInput.addEventListener('input', function () {
  const mi = parseFloat(unitMiInput.value);
  unitKmInput.value = mi ? +(mi * KM_PER_MI).toFixed(2) : '';
});

/* ============================ المتابعة والتقدم (InBody + تقارير + مواعيد) ============================ */

const progressForClientLabel = document.getElementById('progress-for-client');

const PROGRESS_PANELS = {
  inbody: document.getElementById('progress-inbody'),
  checkins: document.getElementById('progress-checkins'),
  appt: document.getElementById('progress-appt')
};
const PROGRESS_TABS = {
  inbody: document.getElementById('pgtab-inbody'),
  checkins: document.getElementById('pgtab-checkins'),
  appt: document.getElementById('pgtab-appt')
};

function showProgressTab(key) {
  Object.keys(PROGRESS_PANELS).forEach(function (k) {
    PROGRESS_PANELS[k].classList.toggle('hidden', k !== key);
    PROGRESS_TABS[k].classList.toggle('active', k === key);
  });
}

Object.keys(PROGRESS_TABS).forEach(function (key) {
  PROGRESS_TABS[key].addEventListener('click', function () {
    showProgressTab(key);
  });
});

const ibDateInput = document.getElementById('ib-date');
const ibWeightInput = document.getElementById('ib-weight');
const ibBodyfatInput = document.getElementById('ib-bodyfat');
const ibMuscleInput = document.getElementById('ib-muscle');
const ibVisceralInput = document.getElementById('ib-visceral');
const ibWaterInput = document.getElementById('ib-water');
const ibNotesInput = document.getElementById('ib-notes');
const ibFile = document.getElementById('ib-file');
const ibFileLabel = document.querySelector('#ib-file-label span');
const ibPreviewBox = document.getElementById('ib-preview-box');
const ibPreview = document.getElementById('ib-preview');
const ibMessage = document.getElementById('ib-message');
const ibList = document.getElementById('ib-list');
const ibSummary = document.getElementById('ib-progress-summary');

const ciPeriodSelect = document.getElementById('ci-period');
const ciEnergySelect = document.getElementById('ci-energy');
const ciSleepSelect = document.getElementById('ci-sleep');
const ciSorenessSelect = document.getElementById('ci-soreness');
const ciAdherenceSelect = document.getElementById('ci-adherence');
const ciNoteInput = document.getElementById('ci-note');
const ciMessage = document.getElementById('ci-message');
const ciList = document.getElementById('ci-list');

const apptDateInput = document.getElementById('appt-date');
const apptTimeInput = document.getElementById('appt-time');
const apptNoteInput = document.getElementById('appt-note');
const apptMessage = document.getElementById('appt-message');
const apptCurrent = document.getElementById('appt-current');

let inbodyEntries = [];
let checkinEntries = [];
let progressAppointment = null;
let ibPickedImage = '';

const CI_PERIODS = [
  { value: 'daily', key: 'period_daily' },
  { value: 'weekly', key: 'period_weekly' },
  { value: 'monthly', key: 'period_monthly' }
];
const CI_SCALE = [1, 2, 3, 4, 5].map(function (n) { return { value: String(n), key: 'scale_level_' + n }; });
const CI_SORENESS = [1, 2, 3, 4, 5].map(function (n) { return { value: String(n), key: 'soreness_level_' + n }; });
const CI_ADHERENCE = [
  { value: 'full', key: 'adherence_full' },
  { value: 'partial', key: 'adherence_partial' },
  { value: 'none', key: 'adherence_none' }
];

function fillSelectFromList(select, list) {
  const keep = select.value;
  select.innerHTML = '';
  list.forEach(function (item) {
    const option = document.createElement('option');
    option.value = item.value;
    option.textContent = t(item.key);
    select.appendChild(option);
  });
  if (keep) select.value = keep;
}

function fillCheckinSelects() {
  fillSelectFromList(ciPeriodSelect, CI_PERIODS);
  fillSelectFromList(ciEnergySelect, CI_SCALE);
  fillSelectFromList(ciSleepSelect, CI_SCALE);
  fillSelectFromList(ciSorenessSelect, CI_SORENESS);
  fillSelectFromList(ciAdherenceSelect, CI_ADHERENCE);
}

function clearIbPickedImage() {
  ibPickedImage = '';
  ibFile.value = '';
  ibPreview.removeAttribute('src');
  ibPreviewBox.classList.add('hidden');
  ibFileLabel.textContent = t('choose_image');
}

async function openProgress(email, returnScreen, showLabel) {
  if (!email) return;
  progressTargetEmail = email;
  progressReturnScreen = returnScreen;
  progressForClientLabel.classList.toggle('hidden', !showLabel);
  if (showLabel) progressForClientLabel.textContent = fill('progress_for_client', { name: clientNameOf(email) || email });

  ibMessage.textContent = '';
  ciMessage.textContent = '';
  apptMessage.textContent = '';
  clearIbPickedImage();

  fillCheckinSelects();
  if (!ibDateInput.value) ibDateInput.value = dateStamp(new Date());

  showScreen(progressScreen);
  showProgressTab('inbody');

  await loadProgressData();
}

document.getElementById('open-progress-btn').addEventListener('click', function () {
  openProgress(clientEmail, clientScreen, false);
});
document.getElementById('open-progress-coach-btn').addEventListener('click', function () {
  openProgress(currentClient, coachScreen, true);
});
document.getElementById('progress-back-btn').addEventListener('click', function () {
  showScreen(progressReturnScreen || clientScreen);
});

async function loadProgressData() {
  try {
    const ibDoc = await getDoc(doc(db, 'inbody', progressTargetEmail));
    const ibData = ibDoc.exists() ? ibDoc.data() : {};
    inbodyEntries = Array.isArray(ibData.entries) ? ibData.entries : [];
    progressAppointment = ibData.nextAppointment || null;
  } catch (error) {
    inbodyEntries = [];
    progressAppointment = null;
  }
  renderInbodyList();
  renderAppointment();

  try {
    const ciDoc = await getDoc(doc(db, 'checkins', progressTargetEmail));
    const ciData = ciDoc.exists() ? ciDoc.data() : {};
    checkinEntries = Array.isArray(ciData.entries) ? ciData.entries : [];
  } catch (error) {
    checkinEntries = [];
  }
  renderCheckinList();
}

async function saveInbodyDoc() {
  await setDoc(doc(db, 'inbody', progressTargetEmail), {
    entries: inbodyEntries,
    nextAppointment: progressAppointment
  }, { merge: true });
}

async function saveCheckinsDoc() {
  await setDoc(doc(db, 'checkins', progressTargetEmail), { entries: checkinEntries }, { merge: true });
}

/* ---------- InBody ---------- */

ibFile.addEventListener('change', async function () {
  const file = ibFile.files[0];
  if (!file) return;

  if (file.size > MAX_SOURCE_BYTES) {
    ibMessage.textContent = t('image_too_big');
    ibFile.value = '';
    return;
  }

  ibMessage.textContent = t('preparing_image');
  try {
    ibPickedImage = await compressImage(file, IMAGE_MAX_SIDE, 0.7);
    ibPreview.src = ibPickedImage;
    ibPreviewBox.classList.remove('hidden');
    ibFileLabel.textContent = t('image_chosen');
    ibMessage.textContent = '';
  } catch (error) {
    ibMessage.textContent = t('image_failed');
    clearIbPickedImage();
  }
});

document.getElementById('ib-remove-image').addEventListener('click', function () {
  clearIbPickedImage();
});

document.getElementById('ib-add-btn').addEventListener('click', async function () {
  const weight = parseFloat(ibWeightInput.value);
  if (!progressTargetEmail || !weight) {
    ibMessage.textContent = t('calc_need_numbers');
    return;
  }

  const entry = {
    id: 'ib_' + Date.now(),
    date: ibDateInput.value || dateStamp(new Date()),
    weight: weight,
    bodyFat: ibBodyfatInput.value ? parseFloat(ibBodyfatInput.value) : null,
    muscleMass: ibMuscleInput.value ? parseFloat(ibMuscleInput.value) : null,
    visceralFat: ibVisceralInput.value ? parseFloat(ibVisceralInput.value) : null,
    bodyWater: ibWaterInput.value ? parseFloat(ibWaterInput.value) : null,
    notes: ibNotesInput.value.trim(),
    imageUrl: ibPickedImage
  };

  inbodyEntries.push(entry);

  try {
    ibMessage.textContent = t('saving');
    await saveInbodyDoc();
    ibWeightInput.value = '';
    ibBodyfatInput.value = '';
    ibMuscleInput.value = '';
    ibVisceralInput.value = '';
    ibWaterInput.value = '';
    ibNotesInput.value = '';
    clearIbPickedImage();
    ibDateInput.value = dateStamp(new Date());
    renderInbodyList();
    setStatusMessage(ibMessage, t('ib_saved_msg'), 'success');
  } catch (error) {
    inbodyEntries.pop();
    ibMessage.textContent = t('problem') + error.message;
  }
});

function ibEntryLine(label, value, unit, previous) {
  if (value === null || value === undefined) return null;
  const line = document.createElement('div');
  line.className = 'calc-line';
  const labelEl = document.createElement('span');
  labelEl.textContent = label;
  const valueEl = document.createElement('strong');
  let text = value + ' ' + unit;
  if (previous !== null && previous !== undefined) {
    const diff = +(value - previous).toFixed(1);
    if (diff !== 0) text += ' (' + (diff > 0 ? '+' : '') + diff + ')';
  }
  valueEl.textContent = text;
  line.appendChild(labelEl);
  line.appendChild(valueEl);
  return line;
}

function renderInbodyList() {
  ibList.innerHTML = '';
  if (!inbodyEntries.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = t('ib_empty');
    ibList.appendChild(empty);
    ibSummary.classList.add('hidden');
    return;
  }

  const sorted = inbodyEntries.slice().sort(function (a, b) {
    return String(b.date).localeCompare(String(a.date));
  });

  sorted.forEach(function (entry, index) {
    const previous = sorted[index + 1] || null;
    const item = document.createElement('li');
    item.className = 'ex-row';

    const top = document.createElement('div');
    top.className = 'ex-row-top';

    const dateEl = document.createElement('strong');
    dateEl.textContent = entry.date;
    top.appendChild(dateEl);

    const remove = document.createElement('button');
    remove.className = 'delete';
    remove.innerHTML = DELETE_ICON_SVG;
    remove.addEventListener('click', async function () {
      if (!confirm(t('confirm_delete'))) return;
      const backup = inbodyEntries;
      inbodyEntries = inbodyEntries.filter(function (e) { return e.id !== entry.id; });
      try {
        await saveInbodyDoc();
        renderInbodyList();
      } catch (error) {
        inbodyEntries = backup;
        ibMessage.textContent = t('problem') + error.message;
      }
    });
    top.appendChild(remove);
    item.appendChild(top);

    if (entry.imageUrl) {
      const thumb = document.createElement('img');
      thumb.className = 'lib-thumb';
      thumb.src = entry.imageUrl;
      thumb.alt = '';
      thumb.addEventListener('click', function () {
        openPreview({ name: entry.date, imageUrl: entry.imageUrl });
      });
      item.appendChild(thumb);
    }

    const details = document.createElement('div');
    details.className = 'calc-result';
    details.appendChild(ibEntryLine(t('ib_weight_label'), entry.weight, t('calc_kg'), previous ? previous.weight : null));
    const bodyFatLine = ibEntryLine(t('ib_bodyfat_label'), entry.bodyFat, '%', previous ? previous.bodyFat : null);
    if (bodyFatLine) details.appendChild(bodyFatLine);
    const muscleLine = ibEntryLine(t('ib_muscle_label'), entry.muscleMass, t('calc_kg'), previous ? previous.muscleMass : null);
    if (muscleLine) details.appendChild(muscleLine);
    const visceralLine = ibEntryLine(t('ib_visceral_label'), entry.visceralFat, '', previous ? previous.visceralFat : null);
    if (visceralLine) details.appendChild(visceralLine);
    const waterLine = ibEntryLine(t('ib_water_label'), entry.bodyWater, '%', previous ? previous.bodyWater : null);
    if (waterLine) details.appendChild(waterLine);
    item.appendChild(details);

    if (entry.notes) {
      const notes = document.createElement('div');
      notes.className = 'my-ex-notes';
      notes.textContent = entry.notes;
      item.appendChild(notes);
    }

    ibList.appendChild(item);
  });

  if (sorted.length >= 2) {
    const latest = sorted[0];
    const first = sorted[sorted.length - 1];
    const days = Math.max(0, Math.round((new Date(latest.date) - new Date(first.date)) / 86400000));

    ibSummary.innerHTML = '';
    const title = document.createElement('h3');
    title.textContent = t('ib_summary_title');
    ibSummary.appendChild(title);

    const period = document.createElement('p');
    period.className = 'hint-text';
    period.textContent = fill('ib_summary_period', { from: first.date, to: latest.date, days: days });
    ibSummary.appendChild(period);

    const weightLine = ibEntryLine(t('ib_weight_label'), latest.weight, t('calc_kg'), first.weight);
    if (weightLine) ibSummary.appendChild(weightLine);
    const bodyFatLine = ibEntryLine(t('ib_bodyfat_label'), latest.bodyFat, '%', first.bodyFat);
    if (bodyFatLine) ibSummary.appendChild(bodyFatLine);
    const muscleLine = ibEntryLine(t('ib_muscle_label'), latest.muscleMass, t('calc_kg'), first.muscleMass);
    if (muscleLine) ibSummary.appendChild(muscleLine);

    ibSummary.classList.remove('hidden');
  } else {
    ibSummary.classList.add('hidden');
  }
}

/* ---------- تقارير المتابعة ---------- */

document.getElementById('ci-add-btn').addEventListener('click', async function () {
  if (!progressTargetEmail) return;

  const entry = {
    id: 'ci_' + Date.now(),
    date: dateStamp(new Date()),
    period: ciPeriodSelect.value,
    energy: ciEnergySelect.value,
    sleep: ciSleepSelect.value,
    soreness: ciSorenessSelect.value,
    adherence: ciAdherenceSelect.value,
    note: ciNoteInput.value.trim()
  };

  checkinEntries.push(entry);

  try {
    ciMessage.textContent = t('saving');
    await saveCheckinsDoc();
    ciNoteInput.value = '';
    renderCheckinList();
    setStatusMessage(ciMessage, t('checkin_saved_msg'), 'success');
  } catch (error) {
    checkinEntries.pop();
    ciMessage.textContent = t('problem') + error.message;
  }
});

function renderCheckinList() {
  ciList.innerHTML = '';
  if (!checkinEntries.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = t('checkin_empty');
    ciList.appendChild(empty);
    return;
  }

  const sorted = checkinEntries.slice().sort(function (a, b) {
    return String(b.date).localeCompare(String(a.date));
  });

  sorted.forEach(function (entry) {
    const item = document.createElement('li');
    item.className = 'ex-row';

    const top = document.createElement('div');
    top.className = 'ex-row-top';

    const dateEl = document.createElement('strong');
    dateEl.textContent = entry.date + ' — ' + t('period_' + entry.period);
    top.appendChild(dateEl);

    const remove = document.createElement('button');
    remove.className = 'delete';
    remove.innerHTML = DELETE_ICON_SVG;
    remove.addEventListener('click', async function () {
      if (!confirm(t('confirm_delete'))) return;
      const backup = checkinEntries;
      checkinEntries = checkinEntries.filter(function (e) { return e.id !== entry.id; });
      try {
        await saveCheckinsDoc();
        renderCheckinList();
      } catch (error) {
        checkinEntries = backup;
        ciMessage.textContent = t('problem') + error.message;
      }
    });
    top.appendChild(remove);
    item.appendChild(top);

    const tags = document.createElement('div');
    tags.className = 'my-ex-meta';
    tags.textContent = t('energy_label') + ': ' + t('scale_level_' + entry.energy) + ' · ' +
      t('sleep_label') + ': ' + t('scale_level_' + entry.sleep) + ' · ' +
      t('soreness_label') + ': ' + t('soreness_level_' + entry.soreness) + ' · ' +
      t('adherence_label') + ': ' + t('adherence_' + entry.adherence);
    item.appendChild(tags);

    if (entry.note) {
      const note = document.createElement('div');
      note.className = 'my-ex-notes';
      note.textContent = entry.note;
      item.appendChild(note);
    }

    ciList.appendChild(item);
  });
}

/* ---------- مواعيد القياس ---------- */

function renderAppointment() {
  apptCurrent.innerHTML = '';

  if (!progressAppointment || !progressAppointment.date) {
    apptDateInput.value = '';
    apptTimeInput.value = '';
    apptNoteInput.value = '';
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = t('no_appt_set');
    apptCurrent.appendChild(empty);
    apptCurrent.classList.remove('hidden');
    return;
  }

  apptDateInput.value = progressAppointment.date;
  apptTimeInput.value = progressAppointment.time || '';
  apptNoteInput.value = progressAppointment.note || '';

  const title = document.createElement('h3');
  title.textContent = t('next_appt_label');
  apptCurrent.appendChild(title);
  apptCurrent.appendChild(calcResultLine(t('next_appt_label'), progressAppointment.date + (progressAppointment.time ? ' ' + progressAppointment.time : '')));

  if (progressAppointment.note) {
    const note = document.createElement('p');
    note.className = 'hint-text';
    note.textContent = progressAppointment.note;
    apptCurrent.appendChild(note);
  }

  apptCurrent.classList.remove('hidden');
}

document.getElementById('appt-save-btn').addEventListener('click', async function () {
  if (!progressTargetEmail) return;
  if (!apptDateInput.value) {
    apptMessage.textContent = t('appt_need_date');
    return;
  }

  const previous = progressAppointment;
  progressAppointment = {
    date: apptDateInput.value,
    time: apptTimeInput.value || '',
    note: apptNoteInput.value.trim()
  };

  try {
    apptMessage.textContent = t('saving');
    await saveInbodyDoc();
    renderAppointment();
    setStatusMessage(apptMessage, t('appt_saved_msg'), 'success');
  } catch (error) {
    progressAppointment = previous;
    apptMessage.textContent = t('problem') + error.message;
  }
});

document.getElementById('appt-clear-btn').addEventListener('click', async function () {
  if (!progressTargetEmail) return;

  const previous = progressAppointment;
  progressAppointment = null;

  try {
    apptMessage.textContent = t('saving');
    await saveInbodyDoc();
    renderAppointment();
    setStatusMessage(apptMessage, t('appt_cleared_msg'), 'success');
  } catch (error) {
    progressAppointment = previous;
    apptMessage.textContent = t('problem') + error.message;
  }
});

/* ============================ المتجر (Store) ============================ */

const STORE_CATEGORIES = ['clothing', 'equipment', 'supplements'];

function storeCategoryName(key) {
  return t('cat_' + key) || key;
}

function storeProductName(product) {
  return (lang === 'ar' ? product.nameAr : product.nameEn) || product.nameAr || product.nameEn || '';
}

function storeProductDesc(product) {
  return (lang === 'ar' ? product.descAr : product.descEn) || '';
}

let storeProducts = [];
let storeCart = [];
let storeProductsLoaded = false;

const storeCategoryFilter = document.getElementById('store-category-filter');
const storeEmptyMsg = document.getElementById('store-empty-msg');
const storeGrid = document.getElementById('store-grid');
const storeCartBox = document.getElementById('store-cart-box');
const storeCartList = document.getElementById('store-cart-list');
const storeCartTotal = document.getElementById('store-cart-total');
const storeCheckoutForm = document.getElementById('store-checkout-form');
const storePaymentInstructions = document.getElementById('store-payment-instructions');
const storePayMethod = document.getElementById('store-pay-method');
const storePayReference = document.getElementById('store-pay-reference');
const storePayNote = document.getElementById('store-pay-note');
const storeOrderMessage = document.getElementById('store-order-message');
const storeOrdersList = document.getElementById('store-orders-list');

function fillStoreCategoryFilter() {
  const keep = storeCategoryFilter.value;
  storeCategoryFilter.innerHTML = '';
  const anyOption = document.createElement('option');
  anyOption.value = '';
  anyOption.textContent = t('all_categories');
  storeCategoryFilter.appendChild(anyOption);
  STORE_CATEGORIES.forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = storeCategoryName(key);
    storeCategoryFilter.appendChild(option);
  });
  storeCategoryFilter.value = keep;
}

async function loadStoreProducts() {
  try {
    const snapshot = await getDocs(collection(db, 'storeProducts'));
    storeProducts = snapshot.docs
      .map(function (item) { return Object.assign({ id: item.id }, item.data()); })
      .filter(function (p) { return p.active !== false; });
  } catch (error) {
    storeProducts = [];
  }
  storeProductsLoaded = true;
}

function renderStoreGrid() {
  const category = storeCategoryFilter.value;
  const matches = storeProducts.filter(function (p) {
    return !category || p.category === category;
  });

  storeGrid.innerHTML = '';
  storeEmptyMsg.classList.toggle('hidden', matches.length > 0);

  matches.forEach(function (product) {
    const card = document.createElement('div');
    card.className = 'ex-card';

    if (product.imageUrl) {
      const shot = document.createElement('div');
      shot.className = 'ex-shot';
      const image = document.createElement('img');
      image.src = product.imageUrl;
      image.alt = '';
      image.loading = 'lazy';
      shot.appendChild(image);
      card.appendChild(shot);
    }

    const body = document.createElement('div');
    body.className = 'ex-body';

    const name = document.createElement('div');
    name.className = 'ex-name';
    name.textContent = storeProductName(product);
    body.appendChild(name);

    const meta = document.createElement('div');
    meta.className = 'ex-meta';
    meta.textContent = storeCategoryName(product.category);
    body.appendChild(meta);

    const desc = storeProductDesc(product);
    if (desc) {
      const descEl = document.createElement('div');
      descEl.className = 'ex-meta';
      descEl.textContent = desc;
      body.appendChild(descEl);
    }

    const price = document.createElement('div');
    price.className = 'store-price';
    price.textContent = (Number(product.price) || 0) + ' ' + t('currency_egp');
    body.appendChild(price);

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'secondary store-add-btn';
    addBtn.textContent = t('store_add_to_cart');
    addBtn.addEventListener('click', function () {
      addToCart(product);
    });
    body.appendChild(addBtn);

    card.appendChild(body);
    storeGrid.appendChild(card);
  });
}

storeCategoryFilter.addEventListener('change', renderStoreGrid);

function addToCart(product) {
  const existing = storeCart.find(function (item) { return item.productId === product.id; });
  if (existing) {
    existing.qty += 1;
  } else {
    storeCart.push({
      productId: product.id,
      name: storeProductName(product),
      price: Number(product.price) || 0,
      qty: 1
    });
  }
  renderCart();
}

function cartTotal() {
  return storeCart.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
}

function renderCart() {
  storeCartBox.classList.toggle('hidden', storeCart.length === 0);
  storeCartList.innerHTML = '';

  if (!storeCart.length) {
    const empty = document.createElement('li');
    empty.textContent = t('store_cart_empty');
    storeCartList.appendChild(empty);
  }

  storeCart.forEach(function (item, index) {
    const row = document.createElement('li');
    row.className = 'store-cart-row';

    const label = document.createElement('span');
    label.textContent = item.name + ' × ' + item.qty + ' — ' + (item.price * item.qty) + ' ' + t('currency_egp');
    row.appendChild(label);

    const minusBtn = document.createElement('button');
    minusBtn.type = 'button';
    minusBtn.className = 'store-cart-qty-btn';
    minusBtn.textContent = '−';
    minusBtn.addEventListener('click', function () {
      item.qty -= 1;
      if (item.qty <= 0) storeCart.splice(index, 1);
      renderCart();
    });
    row.appendChild(minusBtn);

    const plusBtn = document.createElement('button');
    plusBtn.type = 'button';
    plusBtn.className = 'store-cart-qty-btn';
    plusBtn.textContent = '+';
    plusBtn.addEventListener('click', function () {
      item.qty += 1;
      renderCart();
    });
    row.appendChild(plusBtn);

    storeCartList.appendChild(row);
  });

  storeCartTotal.textContent = t('store_total_label') + ': ' + cartTotal() + ' ' + t('currency_egp');
}

function fillStorePayMethodSelect() {
  const keep = storePayMethod.value;
  storePayMethod.innerHTML = '';
  [
    ['vodafone_cash', 'payment_method_vodafone'],
    ['instapay', 'payment_method_instapay'],
    ['bank_transfer', 'payment_method_bank']
  ].forEach(function (pair) {
    const option = document.createElement('option');
    option.value = pair[0];
    option.textContent = t(pair[1]);
    storePayMethod.appendChild(option);
  });
  storePayMethod.value = keep;
}

document.getElementById('store-checkout-btn').addEventListener('click', async function () {
  if (!storeCart.length) return;
  const willShow = storeCheckoutForm.classList.contains('hidden');
  storeCheckoutForm.classList.toggle('hidden');
  if (willShow) {
    await fetchPaymentSettings();
    const lines = paymentInstructionLines();
    storePaymentInstructions.textContent = lines.length ? lines.join(' · ') : t('no_payment_settings');
  }
});

document.getElementById('store-submit-order-btn').addEventListener('click', async function () {
  if (!storeCart.length) return;
  if (!storePayReference.value.trim()) {
    storeOrderMessage.textContent = t('need_payment_fields');
    return;
  }

  storeOrderMessage.textContent = t('saving');
  try {
    const id = 'order_' + Date.now();
    await setDoc(doc(db, 'storeOrders', id), {
      clientEmail: clientEmail,
      clientName: clientName,
      items: storeCart.map(function (item) {
        return { productId: item.productId, name: item.name, price: item.price, qty: item.qty };
      }),
      total: cartTotal(),
      method: storePayMethod.value,
      reference: storePayReference.value.trim(),
      note: storePayNote.value.trim(),
      status: 'submitted',
      createdAt: new Date().toISOString()
    });
    setStatusMessage(storeOrderMessage, t('store_order_saved_msg'), 'success');
    storeCart = [];
    storePayReference.value = '';
    storePayNote.value = '';
    storeCheckoutForm.classList.add('hidden');
    renderCart();
    await loadMyStoreOrders();
  } catch (error) {
    storeOrderMessage.textContent = t('problem') + error.message;
  }
});

function storeOrderStatusLabel(status) {
  return t('store_order_status_' + status) || status;
}

async function loadMyStoreOrders() {
  storeOrdersList.innerHTML = '';
  let orders = [];
  try {
    const snapshot = await getDocs(query(collection(db, 'storeOrders'), where('clientEmail', '==', clientEmail)));
    orders = snapshot.docs.map(function (item) { return Object.assign({ id: item.id }, item.data()); });
    orders.sort(function (a, b) { return (b.createdAt || '').localeCompare(a.createdAt || ''); });
  } catch (error) {
    orders = [];
  }

  if (!orders.length) {
    const none = document.createElement('li');
    none.textContent = t('store_no_orders');
    storeOrdersList.appendChild(none);
    return;
  }

  orders.forEach(function (order) {
    const row = document.createElement('li');
    const itemsText = (order.items || []).map(function (item) { return item.name + ' ×' + item.qty; }).join('، ');
    row.textContent = itemsText + ' — ' + order.total + ' ' + t('currency_egp') + ' — ' + storeOrderStatusLabel(order.status);
    storeOrdersList.appendChild(row);
  });
}

async function showClientStore() {
  if (!storeProductsLoaded) {
    fillStoreCategoryFilter();
    await loadStoreProducts();
  }
  renderStoreGrid();
  renderCart();
  await loadMyStoreOrders();
}

/* ---------- إدارة المتجر (المدرب/صاحب المنصة) ---------- */

const storeAdminList = document.getElementById('store-admin-list');
const newProductNameAr = document.getElementById('new-product-name-ar');
const newProductNameEn = document.getElementById('new-product-name-en');
const newProductCategory = document.getElementById('new-product-category');
const newProductPrice = document.getElementById('new-product-price');
const newProductDescAr = document.getElementById('new-product-desc-ar');
const newProductDescEn = document.getElementById('new-product-desc-en');
const productFile = document.getElementById('product-file');
const productFileLabel = document.getElementById('product-file-label');
const productPreviewBox = document.getElementById('product-preview-box');
const productPreview = document.getElementById('product-preview');
const productAdminMessage = document.getElementById('product-admin-message');
const storeOrdersAdminList = document.getElementById('store-orders-admin-list');

let pickedProductImage = '';

function fillProductCategorySelect() {
  newProductCategory.innerHTML = '';
  STORE_CATEGORIES.forEach(function (key) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = storeCategoryName(key);
    newProductCategory.appendChild(option);
  });
}

function clearPickedProductImage() {
  pickedProductImage = '';
  productFile.value = '';
  productPreview.src = '';
  productPreviewBox.classList.add('hidden');
  productFileLabel.textContent = t('choose_med_image');
}

productFile.addEventListener('change', async function () {
  const file = productFile.files[0];
  if (!file) return;

  if (file.size > MAX_SOURCE_BYTES) {
    productAdminMessage.textContent = t('image_too_big');
    productFile.value = '';
    return;
  }

  productAdminMessage.textContent = t('preparing_image');
  try {
    pickedProductImage = await compressImage(file, IMAGE_MAX_SIDE, 0.7);
    productPreview.src = pickedProductImage;
    productPreviewBox.classList.remove('hidden');
    productFileLabel.textContent = t('image_chosen');
    productAdminMessage.textContent = '';
  } catch (error) {
    productAdminMessage.textContent = t('image_failed');
    clearPickedProductImage();
  }
});

document.getElementById('product-remove-image').addEventListener('click', function () {
  clearPickedProductImage();
});

async function loadStoreProductsAdmin() {
  storeAdminList.innerHTML = '';
  let products = [];
  try {
    const snapshot = await getDocs(collection(db, 'storeProducts'));
    products = snapshot.docs.map(function (item) { return Object.assign({ id: item.id }, item.data()); });
  } catch (error) {
    products = [];
  }

  if (!products.length) {
    const note = document.createElement('p');
    note.className = 'message';
    note.textContent = t('store_empty');
    storeAdminList.appendChild(note);
    return;
  }

  products.forEach(function (product) {
    const card = document.createElement('div');
    card.className = 'review-card';

    const name = document.createElement('div');
    name.className = 'ex-name';
    name.textContent = storeProductName(product) + ' — ' + (Number(product.price) || 0) + ' ' + t('currency_egp');
    card.appendChild(name);

    const meta = document.createElement('div');
    meta.className = 'ex-meta';
    meta.textContent = storeCategoryName(product.category);
    card.appendChild(meta);

    const activeLabel = document.createElement('label');
    activeLabel.className = 'rest';
    const activeCheckbox = document.createElement('input');
    activeCheckbox.type = 'checkbox';
    activeCheckbox.checked = product.active !== false;
    activeLabel.appendChild(activeCheckbox);
    const activeSpan = document.createElement('span');
    activeSpan.textContent = t('plan_active_label');
    activeLabel.appendChild(activeSpan);
    card.appendChild(activeLabel);

    const btnRow = document.createElement('div');
    btnRow.className = 'row';
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete';
    deleteBtn.innerHTML = DELETE_ICON_SVG;
    btnRow.appendChild(deleteBtn);
    card.appendChild(btnRow);

    const rowMessage = document.createElement('p');
    rowMessage.className = 'message';
    card.appendChild(rowMessage);

    activeCheckbox.addEventListener('change', async function () {
      rowMessage.textContent = t('saving');
      try {
        await updateDoc(doc(db, 'storeProducts', product.id), { active: activeCheckbox.checked });
        storeProductsLoaded = false;
        setStatusMessage(rowMessage, t('product_saved'), 'success');
      } catch (error) {
        rowMessage.textContent = t('problem') + error.message;
      }
    });

    deleteBtn.addEventListener('click', async function () {
      if (!confirm(t('confirm_delete'))) return;
      try {
        await deleteDoc(doc(db, 'storeProducts', product.id));
        storeProductsLoaded = false;
        loadStoreProductsAdmin();
      } catch (error) {
        rowMessage.textContent = t('problem') + error.message;
      }
    });

    storeAdminList.appendChild(card);
  });
}

document.getElementById('add-product-btn').addEventListener('click', async function () {
  const nameAr = newProductNameAr.value.trim();
  const price = Number(newProductPrice.value) || 0;
  if (!nameAr || !price) {
    productAdminMessage.textContent = t('need_product_fields');
    return;
  }

  productAdminMessage.textContent = t('saving');
  try {
    const id = 'product_' + Date.now();
    await setDoc(doc(db, 'storeProducts', id), {
      nameAr: nameAr,
      nameEn: newProductNameEn.value.trim(),
      category: newProductCategory.value,
      price: price,
      descAr: newProductDescAr.value.trim(),
      descEn: newProductDescEn.value.trim(),
      imageUrl: pickedProductImage,
      active: true,
      createdAt: new Date().toISOString()
    });
    setStatusMessage(productAdminMessage, t('product_saved'), 'success');
    newProductNameAr.value = '';
    newProductNameEn.value = '';
    newProductPrice.value = '';
    newProductDescAr.value = '';
    newProductDescEn.value = '';
    clearPickedProductImage();
    storeProductsLoaded = false;
    loadStoreProductsAdmin();
  } catch (error) {
    productAdminMessage.textContent = t('problem') + error.message;
  }
});

function storeOrderAdminStatusButtons(order, container, rowMessage) {
  container.innerHTML = '';

  function statusBtn(labelKey, nextStatus, cls) {
    const btn = document.createElement('button');
    btn.type = 'button';
    if (cls) btn.className = cls;
    btn.textContent = t(labelKey);
    btn.addEventListener('click', async function () {
      rowMessage.textContent = t('saving');
      try {
        await updateDoc(doc(db, 'storeOrders', order.id), { status: nextStatus });
        setStatusMessage(rowMessage, t('saved'), 'success');
        loadStoreOrdersAdmin();
      } catch (error) {
        rowMessage.textContent = t('problem') + error.message;
      }
    });
    container.appendChild(btn);
  }

  if (order.status === 'submitted') {
    statusBtn('store_confirm_order_btn', 'confirmed');
    statusBtn('store_cancel_order_btn', 'cancelled', 'secondary');
  } else if (order.status === 'confirmed') {
    statusBtn('store_deliver_order_btn', 'delivered');
    statusBtn('store_cancel_order_btn', 'cancelled', 'secondary');
  }
}

async function loadStoreOrdersAdmin() {
  storeOrdersAdminList.innerHTML = '';
  let orders = [];
  try {
    const snapshot = await getDocs(collection(db, 'storeOrders'));
    orders = snapshot.docs.map(function (item) { return Object.assign({ id: item.id }, item.data()); });
    orders.sort(function (a, b) { return (b.createdAt || '').localeCompare(a.createdAt || ''); });
  } catch (error) {
    orders = [];
  }

  if (!orders.length) {
    const note = document.createElement('p');
    note.className = 'message';
    note.textContent = t('store_no_orders_admin');
    storeOrdersAdminList.appendChild(note);
    return;
  }

  orders.forEach(function (order) {
    const card = document.createElement('div');
    card.className = 'review-card';

    const name = document.createElement('div');
    name.className = 'ex-name';
    name.textContent = (order.clientName || order.clientEmail) + ' — ' + order.total + ' ' + t('currency_egp');
    card.appendChild(name);

    const itemsText = (order.items || []).map(function (item) { return item.name + ' ×' + item.qty; }).join('، ');
    const meta = document.createElement('div');
    meta.className = 'ex-meta';
    meta.textContent = itemsText + ' — ' + t(
      order.method === 'vodafone_cash' ? 'payment_method_vodafone' :
      order.method === 'instapay' ? 'payment_method_instapay' : 'payment_method_bank'
    ) + ' — ' + order.reference;
    card.appendChild(meta);

    if (order.note) {
      const noteEl = document.createElement('div');
      noteEl.className = 'ex-meta';
      noteEl.textContent = order.note;
      card.appendChild(noteEl);
    }

    const statusLine = document.createElement('div');
    statusLine.className = 'ex-meta';
    statusLine.textContent = storeOrderStatusLabel(order.status);
    card.appendChild(statusLine);

    const btnRow = document.createElement('div');
    btnRow.className = 'row';
    card.appendChild(btnRow);

    const rowMessage = document.createElement('p');
    rowMessage.className = 'message';
    card.appendChild(rowMessage);

    storeOrderAdminStatusButtons(order, btnRow, rowMessage);

    storeOrdersAdminList.appendChild(card);
  });
}

/* ---------- إدارة قصص النجاح (المدرب/صاحب المنصة) ---------- */

const storiesAdminList = document.getElementById('stories-admin-list');
const storyBeforeFile = document.getElementById('story-before-file');
const storyBeforeFileLabel = document.getElementById('story-before-file-label');
const storyBeforePreviewBox = document.getElementById('story-before-preview-box');
const storyBeforePreview = document.getElementById('story-before-preview');
const storyAfterFile = document.getElementById('story-after-file');
const storyAfterFileLabel = document.getElementById('story-after-file-label');
const storyAfterPreviewBox = document.getElementById('story-after-preview-box');
const storyAfterPreview = document.getElementById('story-after-preview');
const storyCaptionInput = document.getElementById('story-caption');
const storyConsentCheckbox = document.getElementById('story-consent-checkbox');
const storyAdminMessage = document.getElementById('story-admin-message');

let pickedStoryBeforeImage = '';
let pickedStoryAfterImage = '';

function clearPickedStoryImage(which) {
  if (which === 'before') {
    pickedStoryBeforeImage = '';
    storyBeforeFile.value = '';
    storyBeforePreview.src = '';
    storyBeforePreviewBox.classList.add('hidden');
    storyBeforeFileLabel.querySelector('span').textContent = t('story_before_image');
  } else {
    pickedStoryAfterImage = '';
    storyAfterFile.value = '';
    storyAfterPreview.src = '';
    storyAfterPreviewBox.classList.add('hidden');
    storyAfterFileLabel.querySelector('span').textContent = t('story_after_image');
  }
}

async function handleStoryFileChange(which) {
  const input = which === 'before' ? storyBeforeFile : storyAfterFile;
  const preview = which === 'before' ? storyBeforePreview : storyAfterPreview;
  const previewBox = which === 'before' ? storyBeforePreviewBox : storyAfterPreviewBox;
  const label = which === 'before' ? storyBeforeFileLabel : storyAfterFileLabel;

  const file = input.files[0];
  if (!file) return;

  if (file.size > MAX_SOURCE_BYTES) {
    storyAdminMessage.textContent = t('image_too_big');
    input.value = '';
    return;
  }

  storyAdminMessage.textContent = t('preparing_image');
  try {
    const compressed = await compressImage(file, IMAGE_MAX_SIDE, 0.7);
    if (which === 'before') pickedStoryBeforeImage = compressed; else pickedStoryAfterImage = compressed;
    preview.src = compressed;
    previewBox.classList.remove('hidden');
    label.querySelector('span').textContent = t('image_chosen');
    storyAdminMessage.textContent = '';
  } catch (error) {
    storyAdminMessage.textContent = t('image_failed');
    clearPickedStoryImage(which);
  }
}

storyBeforeFile.addEventListener('change', function () { handleStoryFileChange('before'); });
storyAfterFile.addEventListener('change', function () { handleStoryFileChange('after'); });

document.getElementById('story-before-remove-image').addEventListener('click', function () {
  clearPickedStoryImage('before');
});
document.getElementById('story-after-remove-image').addEventListener('click', function () {
  clearPickedStoryImage('after');
});

async function loadStoriesAdmin() {
  storiesAdminList.innerHTML = '';
  let stories = [];
  try {
    const snapshot = await getDocs(collection(db, 'successStories'));
    stories = snapshot.docs.map(function (item) { return Object.assign({ id: item.id }, item.data()); });
  } catch (error) {
    stories = [];
  }

  if (!stories.length) {
    const note = document.createElement('p');
    note.className = 'message';
    note.textContent = t('stories_empty');
    storiesAdminList.appendChild(note);
    return;
  }

  stories.forEach(function (story) {
    const card = document.createElement('div');
    card.className = 'review-card';

    const images = document.createElement('div');
    images.className = 'story-images';
    [story.beforeImage, story.afterImage].forEach(function (src) {
      const box = document.createElement('div');
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      box.appendChild(img);
      images.appendChild(box);
    });
    card.appendChild(images);

    if (story.caption) {
      const caption = document.createElement('div');
      caption.className = 'ex-meta';
      caption.textContent = story.caption;
      card.appendChild(caption);
    }

    const activeLabel = document.createElement('label');
    activeLabel.className = 'rest';
    const activeCheckbox = document.createElement('input');
    activeCheckbox.type = 'checkbox';
    activeCheckbox.checked = story.active !== false;
    activeLabel.appendChild(activeCheckbox);
    const activeSpan = document.createElement('span');
    activeSpan.textContent = t('plan_active_label');
    activeLabel.appendChild(activeSpan);
    card.appendChild(activeLabel);

    const btnRow = document.createElement('div');
    btnRow.className = 'row';
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete';
    deleteBtn.innerHTML = DELETE_ICON_SVG;
    btnRow.appendChild(deleteBtn);
    card.appendChild(btnRow);

    const rowMessage = document.createElement('p');
    rowMessage.className = 'message';
    card.appendChild(rowMessage);

    activeCheckbox.addEventListener('change', async function () {
      rowMessage.textContent = t('saving');
      try {
        await updateDoc(doc(db, 'successStories', story.id), { active: activeCheckbox.checked });
        setStatusMessage(rowMessage, t('story_saved'), 'success');
      } catch (error) {
        rowMessage.textContent = t('problem') + error.message;
      }
    });

    deleteBtn.addEventListener('click', async function () {
      if (!confirm(t('confirm_delete'))) return;
      try {
        await deleteDoc(doc(db, 'successStories', story.id));
        loadStoriesAdmin();
      } catch (error) {
        rowMessage.textContent = t('problem') + error.message;
      }
    });

    storiesAdminList.appendChild(card);
  });
}

document.getElementById('add-story-btn').addEventListener('click', async function () {
  if (!pickedStoryBeforeImage || !pickedStoryAfterImage || !storyConsentCheckbox.checked) {
    storyAdminMessage.textContent = t('need_story_fields');
    return;
  }

  storyAdminMessage.textContent = t('saving');
  try {
    const id = 'story_' + Date.now();
    await setDoc(doc(db, 'successStories', id), {
      beforeImage: pickedStoryBeforeImage,
      afterImage: pickedStoryAfterImage,
      caption: storyCaptionInput.value.trim(),
      consentConfirmed: true,
      active: true,
      createdAt: new Date().toISOString()
    });
    setStatusMessage(storyAdminMessage, t('story_saved'), 'success');
    storyCaptionInput.value = '';
    storyConsentCheckbox.checked = false;
    clearPickedStoryImage('before');
    clearPickedStoryImage('after');
    loadStoriesAdmin();
  } catch (error) {
    storyAdminMessage.textContent = t('problem') + error.message;
  }
});

/* ---------- إدارة رسائل التواصل (leads) ---------- */

const adminLeadsList = document.getElementById('admin-leads-list');

async function loadLeadsAdmin() {
  adminLeadsList.innerHTML = '';
  let leads = [];
  try {
    const snapshot = await getDocs(collection(db, 'leads'));
    leads = snapshot.docs.map(function (item) { return Object.assign({ id: item.id }, item.data()); });
    leads.sort(function (a, b) { return (b.createdAt || '').localeCompare(a.createdAt || ''); });
  } catch (error) {
    leads = [];
  }

  if (!leads.length) {
    const note = document.createElement('p');
    note.className = 'message';
    note.textContent = t('leads_empty');
    adminLeadsList.appendChild(note);
    return;
  }

  leads.forEach(function (lead) {
    const card = document.createElement('div');
    card.className = 'review-card';

    const name = document.createElement('div');
    name.className = 'ex-name';
    name.textContent = lead.name;
    if (!lead.contacted && !lead.accepted) {
      const badge = document.createElement('span');
      badge.className = 'lead-new-badge';
      badge.textContent = t('lead_new');
      name.appendChild(badge);
    }
    card.appendChild(name);

    // بيانات التواصل — الموبايل والإيميل كل واحد في سطر وقابل للضغط
    const contactRow = document.createElement('div');
    contactRow.className = 'ex-meta lead-contact-row';
    const phone = lead.phone || (lead.contact && lead.contact.indexOf('@') === -1 ? lead.contact : '');
    const email = lead.email || (lead.contact && lead.contact.indexOf('@') !== -1 ? lead.contact : '');
    if (phone) {
      const tel = document.createElement('a');
      tel.href = 'tel:' + phone.replace(/\s/g, '');
      tel.className = 'lead-link';
      tel.appendChild(iconSvg('phone', 'ui-icon'));
    tel.appendChild(document.createTextNode(' ' + phone));
      contactRow.appendChild(tel);
      const wa = document.createElement('a');
      wa.href = 'https://wa.me/' + phone.replace(/[^0-9]/g, '');
      wa.target = '_blank';
      wa.rel = 'noopener';
      wa.className = 'lead-link';
      wa.textContent = 'واتساب';
      contactRow.appendChild(wa);
    }
    if (email) {
      const mail = document.createElement('a');
      mail.href = 'mailto:' + email;
      mail.className = 'lead-link';
      mail.appendChild(iconSvg('mail', 'ui-icon'));
    mail.appendChild(document.createTextNode(' ' + email));
      contactRow.appendChild(mail);
    }
    card.appendChild(contactRow);

    // بنعرض التخصص المطلوب بس لو معروف — رسالة قديمة فيها قيمة مش
    // موجودة في قائمة التخصصات مانعرضش مفتاحها الخام للمستخدم
    if (lead.interest && SPECIALTIES[lead.interest]) {
      const interest = document.createElement('div');
      interest.className = 'ex-meta';
      interest.textContent = t('lead_interest_label') + ': ' + specialtyName(lead.interest, lang);
      card.appendChild(interest);
    }

    if (lead.message) {
      const message = document.createElement('div');
      message.className = 'ex-meta';
      message.textContent = lead.message;
      card.appendChild(message);
    }

    const contactedLabel = document.createElement('label');
    contactedLabel.className = 'rest';
    const contactedCheckbox = document.createElement('input');
    contactedCheckbox.type = 'checkbox';
    contactedCheckbox.checked = !!lead.contacted;
    contactedLabel.appendChild(contactedCheckbox);
    const contactedSpan = document.createElement('span');
    contactedSpan.textContent = t('lead_contacted_label');
    contactedLabel.appendChild(contactedSpan);
    card.appendChild(contactedLabel);

    const rowMessage = document.createElement('p');
    rowMessage.className = 'message';
    card.appendChild(rowMessage);

    contactedCheckbox.addEventListener('change', async function () {
      rowMessage.textContent = t('saving');
      try {
        await updateDoc(doc(db, 'leads', lead.id), { contacted: contactedCheckbox.checked });
        setStatusMessage(rowMessage, t('saved'), 'success');
        refreshLeadsBadge();
      } catch (error) {
        rowMessage.textContent = t('problem') + error.message;
      }
    });

    /*
     * "اقبله كعميل" — بيعمل مستند عميل جاهز بالاسم والموبايل بتوعه،
     * فأول ما يسجّل بالإيميل ده بيلاقي نفسه عميل فعلاً ومايبدأش من الصفر.
     * محتاج إيميل عشان الإيميل هو معرّف العميل في قاعدة البيانات.
     */
    if (!lead.accepted) {
      const acceptBtn = document.createElement('button');
      acceptBtn.type = 'button';
      acceptBtn.className = 'secondary lead-accept-btn';
      acceptBtn.textContent = t('lead_accept_btn');
      acceptBtn.disabled = !email;
      if (!email) acceptBtn.title = t('lead_needs_email');
      acceptBtn.addEventListener('click', async function () {
        rowMessage.textContent = t('saving');
        try {
          const existing = await getDoc(doc(db, 'clients', email));
          if (existing.exists()) {
            rowMessage.textContent = t('lead_already_client');
            await updateDoc(doc(db, 'leads', lead.id), { accepted: true, contacted: true });
            return;
          }
          await setDoc(doc(db, 'clients', email), {
            name: lead.name || '',
            email: email,
            phone: phone || '',
            coachEmail: (currentProviderEmail || COACH_EMAIL).toLowerCase(),
            onboarded: false,
            fromLead: true,
            trialStartedAt: new Date().toISOString().slice(0, 10),
            createdAt: new Date().toISOString()
          }, { merge: true });
          await updateDoc(doc(db, 'leads', lead.id), { accepted: true, contacted: true });
          setStatusMessage(rowMessage, fill('lead_accepted_msg', { email: email }), 'success');
          acceptBtn.disabled = true;
          acceptBtn.textContent = t('lead_accepted_btn');
          refreshLeadsBadge();
        } catch (error) {
          rowMessage.textContent = t('problem') + error.message;
        }
      });
      card.appendChild(acceptBtn);
    } else {
      const done = document.createElement('div');
      done.className = 'ex-meta lead-accepted-note';
      done.textContent = t('lead_accepted_btn');
      card.appendChild(done);
    }

    adminLeadsList.appendChild(card);
  });
}

/* ---------- إدارة طلبات انضمام المدربين والمتخصصين ---------- */

const adminProviderAppsList = document.getElementById('admin-provider-apps-list');

function providerAppStatusLabel(status) {
  if (status === 'approved') return t('provider_app_status_approved');
  if (status === 'rejected') return t('provider_app_status_rejected');
  return t('provider_app_status_pending');
}

async function loadProviderApplicationsAdmin() {
  adminProviderAppsList.innerHTML = '';
  let apps = [];
  try {
    const snapshot = await getDocs(collection(db, 'providerApplications'));
    apps = snapshot.docs.map(function (item) { return Object.assign({ id: item.id }, item.data()); });
    apps.sort(function (a, b) { return (b.createdAt || '').localeCompare(a.createdAt || ''); });
  } catch (error) {
    apps = [];
  }

  if (!apps.length) {
    const note = document.createElement('p');
    note.className = 'message';
    note.textContent = t('provider_apps_empty');
    adminProviderAppsList.appendChild(note);
    return;
  }

  apps.forEach(function (app) {
    const card = document.createElement('div');
    card.className = 'review-card';

    const name = document.createElement('div');
    name.className = 'ex-name';
    name.textContent = app.name + ' — ' + specialtyListName(providerSpecialties(app));
    card.appendChild(name);

    const emailLine = document.createElement('div');
    emailLine.className = 'ex-meta';
    emailLine.textContent = app.email + (app.contact ? (' · ' + app.contact) : '');
    card.appendChild(emailLine);

    if (app.message) {
      const message = document.createElement('div');
      message.className = 'ex-meta';
      message.textContent = app.message;
      card.appendChild(message);
    }

    const statusLine = document.createElement('div');
    statusLine.className = 'ex-meta';
    statusLine.textContent = providerAppStatusLabel(app.status);
    card.appendChild(statusLine);

    const rowMessage = document.createElement('p');
    rowMessage.className = 'message';

    if (app.status !== 'approved' && app.status !== 'rejected') {
      const actionsRow = document.createElement('div');
      actionsRow.className = 'row';

      const approveBtn = document.createElement('button');
      approveBtn.type = 'button';
      approveBtn.textContent = t('provider_app_approve_btn');
      actionsRow.appendChild(approveBtn);

      const rejectBtn = document.createElement('button');
      rejectBtn.type = 'button';
      rejectBtn.className = 'secondary';
      rejectBtn.textContent = t('provider_app_reject_btn');
      actionsRow.appendChild(rejectBtn);

      approveBtn.addEventListener('click', async function () {
        rowMessage.textContent = t('saving');
        try {
          // نفس منطق إضافة متخصص يدويًا: isMedical بيتحسب من تعريف
          // التخصصات في providers.js عشان أي تخصص جديد يشتغل صح تلقائي
          const appSpecs = providerSpecialties(app);
          await setDoc(doc(db, 'providers', app.email), {
            name: app.name,
            email: app.email,
            specialty: appSpecs[0] || app.specialty,
            specialties: appSpecs.length ? appSpecs : (app.specialty ? [app.specialty] : []),
            isMedical: specialtiesHaveFlag(appSpecs, 'medical')
          });
          await updateDoc(doc(db, 'providerApplications', app.id), { status: 'approved' });
          setStatusMessage(rowMessage, t('provider_app_approved_msg'), 'success');
          await loadProviderApplicationsAdmin();
        } catch (error) {
          rowMessage.textContent = t('problem') + error.message;
        }
      });

      rejectBtn.addEventListener('click', async function () {
        rowMessage.textContent = t('saving');
        try {
          await updateDoc(doc(db, 'providerApplications', app.id), { status: 'rejected' });
          await loadProviderApplicationsAdmin();
        } catch (error) {
          rowMessage.textContent = t('problem') + error.message;
        }
      });

      card.appendChild(actionsRow);
    }

    card.appendChild(rowMessage);
    adminProviderAppsList.appendChild(card);
  });
}

applyLanguage();
/* ============================================================
   تأكيد الإيميل
   ------------------------------------------------------------
   فايربيز بتبعت الرسالة بنفسها ومجانًا — مفيش سيرفر ولا إعداد.
   بنطلب التأكيد من الحسابات الجديدة بس (اللي اتعملت من النهارده)
   ومن أي حد لسه ما كمّلش بياناته. العميل القديم اللي شغال بقاله
   فترة مش هيتقفل عليه
   ============================================================ */

var VERIFY_SINCE = '2026-09-23T00:00:00Z';
var verifySentFor = '';
var verifyCooldownUntil = 0;
var verifyTimer = null;
var verifyUser = null;

function accountIsNew(user) {
  const created = user && user.metadata && user.metadata.creationTime;
  if (!created) return false;
  const time = Date.parse(created);
  return !isNaN(time) && time >= Date.parse(VERIFY_SINCE);
}

function needsEmailVerify(user, clientData) {
  if (!user || user.emailVerified !== false) return false;
  if (accountIsNew(user)) return true;
  // حساب قديم بس لسه ما كمّلش بياناته = لسه ما بدأش فعلًا
  return !(clientData && clientData.onboarded);
}

function verifyContinueUrl() {
  return location.href.split('#')[0].split('?')[0];
}

async function sendVerifyMail(user, message) {
  if (!user) return;
  if (Date.now() < verifyCooldownUntil) { paintVerifyCooldown(); return; }
  try { auth.languageCode = lang; } catch (e) { /* تجاهل */ }
  try {
    try {
      await sendEmailVerification(user, { url: verifyContinueUrl() });
    } catch (error) {
      // لو الدومين مش متسجّل كرابط رجوع، نبعت من غير رابط رجوع
      const code = (error && error.code) || '';
      if (code.indexOf('continue-uri') === -1 && code.indexOf('unauthorized') === -1) throw error;
      await sendEmailVerification(user);
    }
    verifyCooldownUntil = Date.now() + 60 * 1000;
    if (message) setStatusMessage(message, t('verify_sent'), 'success');
    paintVerifyCooldown();
  } catch (error) {
    const code = (error && error.code) || '';
    if (message) {
      message.textContent = code === 'auth/too-many-requests'
        ? t('verify_too_many')
        : t('problem') + ((error && error.message) || '');
    }
    // فايربيز قفلت الإرسال مؤقتًا — نستنى دقيقة قبل ما نجرّب
    if (code === 'auth/too-many-requests') {
      verifyCooldownUntil = Date.now() + 60 * 1000;
      paintVerifyCooldown();
    }
  }
}

function paintVerifyText() {
  const box = document.getElementById('verify-text');
  if (!box || !verifyUser) return;
  // الإيميل إنجليزي جوه جملة عربي — بنعزله عشان النقطة والحروف ما تتقلبش
  const parts = t('verify_text').split('{email}');
  box.textContent = '';
  box.appendChild(document.createTextNode(parts[0] || ''));
  const mail = document.createElement('bdi');
  mail.className = 'verify-email';
  mail.setAttribute('dir', 'ltr');
  mail.textContent = verifyUser.email || '';
  box.appendChild(mail);
  box.appendChild(document.createTextNode(parts.slice(1).join('{email}')));
}

function paintVerifyCooldown() {
  const btn = document.getElementById('verify-resend-btn');
  if (!btn) return;
  const left = Math.ceil((verifyCooldownUntil - Date.now()) / 1000);
  if (left > 0) {
    btn.disabled = true;
    btn.textContent = fill('verify_resend_wait', { n: left });
    clearTimeout(verifyTimer);
    verifyTimer = setTimeout(paintVerifyCooldown, 1000);
  } else {
    btn.disabled = false;
    btn.textContent = t('verify_resend_btn');
  }
}

function showVerifyScreen(user) {
  verifyUser = user;
  showScreen(document.getElementById('verify-screen'));
  document.getElementById('verify-message').textContent = '';
  paintVerifyText();
  paintVerifyCooldown();
  // أول مرة نشوف الحساب ده في الجلسة دي: نبعت الرسالة تلقائي
  const email = (user.email || '').toLowerCase();
  if (verifySentFor !== email) {
    verifySentFor = email;
    sendVerifyMail(user, document.getElementById('verify-message'));
  }
}

/*
 * بنسأل فايربيز: الحساب اتأكد؟ ولو آه بنجدد توكن الدخول — من غير
 * التجديد قواعد الأمان تفضل شايفاه "مش متأكد" لحد ساعة كاملة
 */
async function checkVerified(quiet) {
  const message = document.getElementById('verify-message');
  const user = auth.currentUser;
  if (!user) return false;
  if (!quiet) message.textContent = t('verify_checking');
  try {
    if (typeof user.reload === 'function') await user.reload();
    const fresh = auth.currentUser || user;
    if (fresh.emailVerified) {
      try { await fresh.getIdToken(true); } catch (e) { /* هيتجدد لوحده */ }
      message.textContent = '';
      await routeUser(fresh);
      return true;
    }
    if (!quiet) message.textContent = t('verify_not_yet');
  } catch (error) {
    if (!quiet) message.textContent = t('problem') + ((error && error.message) || '');
  }
  return false;
}

document.getElementById('verify-done-btn').addEventListener('click', function () {
  checkVerified(false);
});

document.getElementById('verify-resend-btn').addEventListener('click', function () {
  sendVerifyMail(auth.currentUser, document.getElementById('verify-message'));
});

/*
 * "الإيميل ده غلط": الحساب لسه متعملش من دقايق ومفيهوش أي بيانات،
 * فبنمسحه خالص. لو سبناه، صاحب الإيميل الحقيقي لما ييجي يسجّل
 * هيلاقي "الإيميل ده مستخدم" ومش هيعرف يدخل
 */
document.getElementById('verify-wrong-btn').addEventListener('click', async function () {
  const user = auth.currentUser;
  verifySentFor = '';
  try {
    if (user && typeof user.delete === 'function' && !user.emailVerified) await user.delete();
  } catch (error) {
    /* لو فايربيز طلبت دخول جديد قبل المسح، بنخرج بس */
  }
  try { await signOut(auth); } catch (e) { /* تجاهل */ }
  showScreen(signupScreen);
});

// العميل بيدوس اللينك من تطبيق الإيميل ويرجع — نكمّل لوحدنا من غير ما يدوس حاجة
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState !== 'visible') return;
  const screen = document.getElementById('verify-screen');
  if (screen && !screen.classList.contains('hidden')) checkVerified(true);
});

/* ============================================================
   الإشعارات
   ------------------------------------------------------------
   كل إشعار مستند في notifications فيه: لمين، من مين، نوعه،
   ونصه باللغتين (عشان لو غيّر اللغة يفضل مفهوم، وعشان إشعار
   الموبايل يوصل بلغة صاحبه هو مش لغة اللي بعت).
   الجرس بيسمع للمستندات دي لحظيًا، ولو صاحبها مفعّل إشعارات
   الموبايل بنطلب من Apps Script يبعتها — مجانًا من غير Blaze
   ============================================================ */

var notifItems = [];
var notifUnsub = null;
var notifFor = '';
var notifReturnScreen = null;
var notifCleaned = false;
var notifChatLast = {};
var teamBeforeEdit = {};
var NOTIF_CHAT_GAP = 3 * 60 * 1000;
var NOTIF_KEEP_DAYS = 45;
var FB_MESSAGING_URL = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js';


function notifMe() {
  const user = auth.currentUser;
  return (user && user.email) ? user.email.toLowerCase() : '';
}

/* بنكتب النص باللغتين: بنبدّل اللغة لحظة ونرجعها — كل دوال الأسماء بتشتغل زي ما هي */
function withLang(target, fn) {
  const keep = lang;
  lang = target;
  try { return fn(); } finally { lang = keep; }
}

function notifClip(text, max) {
  const clean = String(text == null ? '' : text).replace(/\s+/g, ' ').trim();
  return clean.length > max ? clean.slice(0, max - 1) + '…' : clean;
}

// split/join مش replace — عشان رسالة فيها $ ما تتلخبطش
function notifFill(key, params) {
  let out = t(key);
  Object.keys(params || {}).forEach(function (name) {
    out = out.split('{' + name + '}').join(String(params[name] == null ? '' : params[name]));
  });
  return out;
}

function buildNotifText(type, paramsFn) {
  const out = {};
  ['ar', 'en'].forEach(function (target) {
    out[target] = withLang(target, function () {
      const params = paramsFn ? (paramsFn() || {}) : {};
      return {
        t: notifClip(notifFill('notif_t_' + type, params), 90),
        b: notifClip(notifFill('notif_b_' + type, params), 160)
      };
    });
  });
  return out;
}

/* فريق العميل: المدرب الأساسي وكل متخصص اختاره. مفيش فريق = صاحب المنصة */
function teamEmailsOf(data) {
  const out = [];
  if (data && data.coachEmail) out.push(data.coachEmail);
  const team = (data && data.team) || {};
  Object.keys(team).forEach(function (key) { if (team[key]) out.push(team[key]); });
  if (!out.length) out.push(COACH_EMAIL);
  return out;
}

/*
 * الإشعار إضافة — عمره ما يوقف الحاجة الأصلية. أي فشل هنا
 * بيتبلع في سكوت: البرنامج اتحفظ والرسالة وصلت في كل الأحوال
 */
async function notify(recipients, type, opts) {
  try {
    opts = opts || {};
    const me = notifMe();
    if (!me) return 0;
    const list = (Array.isArray(recipients) ? recipients : [recipients])
      .map(function (email) { return String(email || '').trim().toLowerCase(); })
      .filter(function (email, index, all) { return email && email !== me && all.indexOf(email) === index; });
    if (!list.length) return 0;

    const text = buildNotifText(type, opts.params);
    const createdAt = new Date().toISOString();
    let made = 0;
    for (let i = 0; i < list.length; i++) {
      try {
        const ref = await addDoc(collection(db, 'notifications'), {
          to: list[i],
          from: me,
          type: type,
          text: text,
          target: opts.target || '',
          about: opts.about || '',
          aboutName: notifClip(opts.aboutName || '', 80),
          createdAt: createdAt,
          read: false
        });
        made++;
        if (ref && ref.id) sendPush(ref.id);
      } catch (error) { /* نكمّل للي بعده */ }
    }
    return made;
  } catch (error) {
    return 0;
  }
}

function notifyProgramChange(type, target) {
  if (!currentClient) return;
  notify(currentClient, type, { target: target });
}

/*
 * الشات: إشعار واحد كل ٣ دقايق للمحادثة الواحدة — لو بعت عشر
 * رسايل ورا بعض مش هنرن على موبايل حد عشر مرات
 */
function notifyChat(text) {
  const thread = currentChatEmail;
  if (!thread) return;
  const now = Date.now();
  if (notifChatLast[thread] && now - notifChatLast[thread] < NOTIF_CHAT_GAP) return;
  notifChatLast[thread] = now;

  if (chatViewerIsCoach()) {
    notify(thread, 'chat_client', {
      target: 'chat',
      params: function () { return { text: text }; }
    });
  } else {
    notify(teamEmailsOf(clientRecord), 'chat_team', {
      target: 'chat', about: thread, aboutName: clientName || '',
      params: function () { return { name: clientName || thread, text: text }; }
    });
  }
}

function notifyNewTeamMembers(before, after) {
  const old = Object.keys(before || {}).map(function (key) { return before[key]; });
  const added = Object.keys(after || {})
    .map(function (key) { return after[key]; })
    .filter(function (email) { return email && old.indexOf(email) === -1; });
  if (!added.length) return;
  const who = teamEditEmail || clientEmail;
  const name = clientName || who;
  notify(added, 'team_joined', {
    target: 'client', about: who, aboutName: clientName || '',
    params: function () { return { name: name }; }
  });
}

/* ---------- الجرس ---------- */

function notifUnreadCount() {
  return (notifItems || []).filter(function (item) { return !item.read; }).length;
}

function paintNotifBell(screen) {
  const bell = document.getElementById('notif-bell');
  if (!bell) return;
  const current = screen || document.querySelector('.card:not(.hidden)');
  const id = current ? current.id : '';
  const signedIn = !!(auth && auth.currentUser);
  /*
   * الشاشات اللي الجرس مالوش لازمة فيها (لسه ما دخلش، أو بيدخل).
   * القايمة جوه الدالة مش فوق — الدالة دي بتشتغل من showScreen وقت
   * التحميل، قبل ما أي متغيّر متعرّف تحت ياخد قيمته
   */
  const hiddenOn = ['welcome-screen', 'login-screen', 'signup-screen', 'verify-screen', 'onboarding-screen', 'notif-screen', 'trial-ended-screen'];
  bell.classList.toggle('hidden', !signedIn || hiddenOn.indexOf(id) !== -1);
  bell.setAttribute('aria-label', t('notif_title'));

  const n = notifUnreadCount();
  const badge = document.getElementById('notif-badge');
  if (badge) {
    badge.textContent = n > 9 ? '9+' : String(n);
    badge.classList.toggle('hidden', !n);
  }
  bell.classList.toggle('has-unread', n > 0);
  // الرقم كمان في عنوان الصفحة وعلى أيقونة التطبيق لو متثبّت
  document.title = n ? ('(' + n + ') ADAM') : 'ADAM';
  try {
    if (n && navigator.setAppBadge) navigator.setAppBadge(n).catch(function () {});
    else if (!n && navigator.clearAppBadge) navigator.clearAppBadge().catch(function () {});
  } catch (e) { /* مش مدعوم */ }
}

function startNotifListener(email) {
  if (!email) return;
  if (notifFor === email && notifUnsub) return;
  stopNotifListener();
  notifFor = email;
  try {
    const q = query(collection(db, 'notifications'), where('to', '==', email));
    notifUnsub = onSnapshot(q, function (snapshot) {
      notifItems = snapshot.docs
        .map(function (item) { return Object.assign({ id: item.id }, item.data()); })
        .sort(function (a, b) { return String(b.createdAt || '').localeCompare(String(a.createdAt || '')); });
      paintNotifBell();
      const screen = document.getElementById('notif-screen');
      if (screen && !screen.classList.contains('hidden')) renderNotifList();
      cleanOldNotifs();
    }, function () { /* القواعد لسه ما اتنشرتش — الجرس يفضل فاضي */ });
  } catch (error) {
    notifUnsub = null;
  }
}

function stopNotifListener() {
  if (notifUnsub) {
    try { notifUnsub(); } catch (e) { /* تجاهل */ }
  }
  notifUnsub = null;
  notifFor = '';
  notifItems = [];
  notifCleaned = false;
  paintNotifBell();
}

/* المقروء اللي عدّى عليه ٤٥ يوم بيتمسح — مرة واحدة في الجلسة */
function cleanOldNotifs() {
  if (notifCleaned) return;
  notifCleaned = true;
  const cutoff = new Date(Date.now() - NOTIF_KEEP_DAYS * 86400000).toISOString();
  (notifItems || [])
    .filter(function (item) { return item.read && String(item.createdAt || '') < cutoff; })
    .slice(0, 30)
    .forEach(function (item) {
      deleteDoc(doc(db, 'notifications', item.id)).catch(function () {});
    });
}

/* ---------- شاشة الإشعارات ---------- */

var NOTIF_ICONS = {
  chat_client: 'chat', chat_team: 'chat',
  workout: 'training', nutrition: 'nutrition', rehab: 'rehab',
  consult_request: 'consult', consult_reply: 'consult',
  clearance_client: 'shield', clearance_team: 'shield',
  injury_new: 'injury', injury_status: 'injury',
  booking_new: 'classes', booking_status: 'classes',
  team_joined: 'team'
};

function notifAgo(iso) {
  const time = Date.parse(iso || '');
  if (isNaN(time)) return '';
  const minutes = Math.max(0, Math.floor((Date.now() - time) / 60000));
  if (minutes < 1) return t('notif_now');
  if (minutes < 60) return fill('notif_min', { n: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return fill('notif_hour', { n: hours });
  return fill('notif_day', { n: Math.floor(hours / 24) });
}

function notifTextOf(item) {
  const text = item.text || {};
  return text[lang] || text.ar || text.en || { t: '', b: '' };
}

function renderNotifList() {
  const list = document.getElementById('notif-list');
  if (!list) return;
  list.innerHTML = '';
  const items = notifItems || [];
  document.getElementById('notif-empty').classList.toggle('hidden', items.length > 0);
  document.getElementById('notif-mark-all').classList.toggle('hidden', !notifUnreadCount());

  items.slice(0, 80).forEach(function (item) {
    const text = notifTextOf(item);
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'notif-item' + (item.read ? '' : ' unread');
    row.setAttribute('data-id', item.id);
    row.setAttribute('data-type', item.type || '');

    const icon = document.createElement('span');
    icon.className = 'notif-icon';
    icon.appendChild(iconSvg(NOTIF_ICONS[item.type] || 'sparkle', 'ui-icon'));
    row.appendChild(icon);

    const body = document.createElement('span');
    body.className = 'notif-body';
    const title = document.createElement('span');
    title.className = 'notif-item-title';
    title.textContent = text.t || '';
    const line = document.createElement('span');
    line.className = 'notif-item-text';
    line.textContent = text.b || '';
    const when = document.createElement('span');
    when.className = 'notif-item-time';
    when.textContent = notifAgo(item.createdAt);
    body.appendChild(title);
    if (text.b) body.appendChild(line);
    body.appendChild(when);
    row.appendChild(body);

    if (!item.read) {
      const dot = document.createElement('span');
      dot.className = 'notif-dot';
      row.appendChild(dot);
    }

    row.addEventListener('click', function () { openNotif(item); });
    list.appendChild(row);
  });
}

function markNotifRead(item) {
  if (!item || item.read) return;
  item.read = true;
  updateDoc(doc(db, 'notifications', item.id), { read: true }).catch(function () {});
}

function openNotif(item) {
  markNotifRead(item);
  paintNotifBell();
  goToNotifTarget(item);
}

/* كل إشعار بيفتح المكان اللي يخصّه على طول */
function goToNotifTarget(item) {
  const target = item.target || '';
  try {
    if (currentProviderEmail) {
      if (target === 'chat' && item.about) { openChatThread(item.about, chatInboxScreen); return; }
      if (target === 'bookings') { document.getElementById('open-bookings-btn').click(); return; }
      if (item.about) { openCoachScreen(item.about, item.aboutName || clientNameOf(item.about), ''); return; }
      showScreen(clientsScreen);
      loadClients();
      return;
    }
    showScreen(clientScreen);
    if (target === 'chat') { openChatThread(clientEmail, clientScreen); return; }
    if (target === 'injury') { document.getElementById('report-injury-btn').click(); return; }
    if (target === 'consult') { setClientMode('consult'); return; }
    if (target === 'training' || target === 'nutrition' || target === 'rehab') { goClientMode(target); return; }
    goClientMode('home');
  } catch (error) {
    showScreen(currentProviderEmail ? clientsScreen : clientScreen);
  }
}

function openNotifScreen() {
  const current = document.querySelector('.card:not(.hidden)');
  notifReturnScreen = (current && current.id !== 'notif-screen') ? current : null;
  showScreen(document.getElementById('notif-screen'));
  renderNotifList();
  renderPushBox();
}

document.getElementById('notif-bell').addEventListener('click', openNotifScreen);

document.getElementById('notif-back-btn').addEventListener('click', function () {
  if (notifReturnScreen) showScreen(notifReturnScreen);
  else showScreen(currentProviderEmail ? clientsScreen : clientScreen);
});

document.getElementById('notif-mark-all').addEventListener('click', function () {
  (notifItems || []).filter(function (item) { return !item.read; }).slice(0, 60).forEach(markNotifRead);
  paintNotifBell();
  renderNotifList();
});

/* ============================================================
   إشعارات الموبايل (والبرنامج مقفول)
   ------------------------------------------------------------
   المتصفح بيدّينا "عنوان" للجهاز ده (token) ونحفظه في pushTokens.
   لما حد يبعت إشعار، Apps Script بيقرا العنوان ويبعت لجوجل
   ويوصل الموبايل. الآيفون بيسمح بده بس لو الموقع متضاف للشاشة
   الرئيسية — دي قاعدة أبل مش حاجة نقدر نغيّرها
   ============================================================ */

function isIosDevice() {
  const ua = navigator.userAgent || '';
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function isStandaloneApp() {
  try {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
  } catch (e) {
    return false;
  }
}

function pushSupported() {
  return ('Notification' in window) && ('serviceWorker' in navigator) && ('PushManager' in window);
}

function pushFlagKey() {
  return 'adam_push_' + notifMe();
}

function pushIsOnHere() {
  try {
    return pushSupported() && Notification.permission === 'granted' && localStorage.getItem(pushFlagKey()) === '1';
  } catch (e) {
    return false;
  }
}

function pushConfigured() {
  return !!(welcomeSettings && welcomeSettings.url && welcomeSettings.pushEnabled && welcomeSettings.vapidKey);
}

async function renderPushBox() {
  const box = document.getElementById('notif-push-box');
  const text = document.getElementById('notif-push-text');
  const btn = document.getElementById('notif-push-btn');
  if (!box) return;
  if (!welcomeSettings) await fetchWelcomeSettings();
  // الإدارة لسه ما فعّلتهاش؟ الصندوق مايظهرش خالص بدل رسالة محيّرة
  if (!pushConfigured()) { box.classList.add('hidden'); return; }
  box.classList.remove('hidden');
  btn.classList.add('hidden');
  box.classList.remove('is-on');

  if (isIosDevice() && !isStandaloneApp()) { text.textContent = t('notif_push_ios'); return; }
  if (!pushSupported()) { text.textContent = t('notif_push_unsupported'); return; }
  if (pushIsOnHere()) { text.textContent = t('notif_push_on'); box.classList.add('is-on'); return; }
  if (Notification.permission === 'denied') { text.textContent = t('notif_push_denied'); return; }
  text.textContent = t('notif_push_hint');
  btn.classList.remove('hidden');
}

async function getPushToken(vapidKey) {
  const registration = await navigator.serviceWorker.register('./push-sw.js');
  await navigator.serviceWorker.ready;
  const messaging = await import(FB_MESSAGING_URL);
  if (messaging.isSupported && !(await messaging.isSupported())) throw new Error('unsupported');
  return messaging.getToken(messaging.getMessaging(app), {
    vapidKey: vapidKey,
    serviceWorkerRegistration: registration
  });
}

async function savePushToken(token) {
  const me = notifMe();
  if (!me || !token) return;
  let tokens = [];
  try {
    const snap = await getDoc(doc(db, 'pushTokens', me));
    if (snap.exists()) tokens = snap.data().tokens || [];
  } catch (error) { tokens = []; }
  // آخر ٥ أجهزة بس — الموبايل والكمبيوتر والتابلت وخلاص
  tokens = tokens.filter(function (item) { return item !== token; });
  tokens.push(token);
  tokens = tokens.slice(-5);
  await setDoc(doc(db, 'pushTokens', me), { tokens: tokens, lang: lang, updatedAt: new Date().toISOString() });
}

async function enablePush() {
  const text = document.getElementById('notif-push-text');
  const btn = document.getElementById('notif-push-btn');
  if (!welcomeSettings) await fetchWelcomeSettings();
  if (!pushConfigured()) { renderPushBox(); return; }
  btn.disabled = true;
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') { renderPushBox(); return; }
    const token = await getPushToken(welcomeSettings.vapidKey);
    if (!token) throw new Error('no token');
    await savePushToken(token);
    try { localStorage.setItem(pushFlagKey(), '1'); } catch (e) { /* تجاهل */ }
    renderPushBox();
  } catch (error) {
    text.textContent = notifFill('notif_push_failed', { reason: (error && error.message) || '' });
  } finally {
    btn.disabled = false;
  }
}

document.getElementById('notif-push-btn').addEventListener('click', enablePush);

/*
 * كل دخول: لو الجهاز ده مفعّل الإشعارات، بنجدد العنوان بتاعه في
 * السكوت — جوجل بتغيّره كل فترة، ولو ما جددناهوش الإشعارات بتقف
 * من غير ما حد يعرف ليه
 */
function refreshPushSilently() {
  setTimeout(async function () {
    try {
      if (!pushIsOnHere()) return;
      if (!welcomeSettings) await fetchWelcomeSettings();
      if (!pushConfigured()) return;
      const token = await getPushToken(welcomeSettings.vapidKey);
      if (token) await savePushToken(token);
    } catch (error) { /* المرة الجاية */ }
  }, 4000);
}

async function sendPush(id) {
  try {
    if (!welcomeSettings) await fetchWelcomeSettings();
    if (!pushConfigured()) return;
    const user = auth.currentUser;
    if (!user) return;
    const idToken = await user.getIdToken();
    await fetch(welcomeSettings.url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'push', idToken: idToken, id: id })
    });
  } catch (error) { /* الإشعار موجود في الجرس في كل الأحوال */ }
}

// لغة إشعارات الموبايل بتمشي مع لغة البرنامج
document.getElementById('lang-btn').addEventListener('click', function () {
  const me = notifMe();
  if (!me || !pushIsOnHere()) return;
  setDoc(doc(db, 'pushTokens', me), { lang: lang }, { merge: true }).catch(function () {});
});

/* ============================================================
   مكتبة التمارين الموسّعة
   ------------------------------------------------------------
   المكتبة بقت ٣ طبقات فوق بعض:
     ١) exercise-library.js + drills-library.js (زي ما هم)
     ٢) library/exercises-index.js — +٧٠٠ تمرين جديد بحقول كاملة
        (قسم فرعي، مستوى، نوع الوصفة، احتياطات) ورسوم مرخّصة
     ٣) تمارين قوالب التأهيل نفسها بقت تظهر في البحث
   الفهرس بيتحمّل أول ما المدرب يفتح المكتبة بس — العميل اللي بيفتح
   برنامجه مش بينزّله خالص. والتفاصيل (الخطوات والنصايح) ملف لوحده
   بيتحمّل أول ما تمرين يتفتح
   ============================================================ */

var extraLib = null;
var extraLocalMedia = {};
var extraLibPromise = null;
var extraDetails = null;
var extraDetailsPromise = null;
var remoteLeftovers = [];
var rehabLibCache = null;
var libActiveSub = '';
var libMediaOnly = false;
var libSafeOnly = false;

var LIB_GROUP_ORDER = ['strength', 'functional', 'conditioning', 'mobility', 'warmup', 'core', 'plyometrics', 'speed', 'tactical', 'athletic', 'testing', 'rehab'];

var LEGACY_GROUP = {
  cardio: 'conditioning', stretching: 'mobility', crossfit: 'conditioning', hyrox: 'conditioning',
  agility: 'speed', powerlifting: 'strength', 'olympic weightlifting': 'athletic', strongman: 'functional'
};

var MUSCLE_TO_SUB = {
  chest: 'chest', lats: 'back', 'middle back': 'back', 'lower back': 'back', traps: 'back',
  shoulders: 'shoulders', biceps: 'biceps', triceps: 'triceps', quadriceps: 'quads',
  hamstrings: 'hamstrings', glutes: 'glutes', adductors: 'glutes', abductors: 'glutes',
  calves: 'calves', forearms: 'forearms', neck: 'neck'
};

var SUBCATS = {
  strength: { chest: ['صدر', 'Chest'], back: ['ضهر', 'Back'], shoulders: ['كتف', 'Shoulders'], biceps: ['باي', 'Biceps'], triceps: ['تراي', 'Triceps'], quads: ['فخذ أمامي', 'Quads'], hamstrings: ['خلفية', 'Hamstrings'], glutes: ['مؤخرة', 'Glutes'], calves: ['سمانة', 'Calves'], forearms: ['ساعد', 'Forearms'], neck: ['رقبة', 'Neck'] },
  functional: { push: ['دفع', 'Push'], pull: ['سحب', 'Pull'], squat: ['سكوات', 'Squat'], hinge: ['هينج', 'Hinge'], lunge: ['لانج', 'Lunge'], carry: ['حمل ومشي', 'Carry'], rotation: ['لف', 'Rotation'] },
  conditioning: { running: ['جري', 'Running'], rowing: ['تجديف', 'Rowing'], skierg: ['SkiErg', 'SkiErg'], bike: ['عجلة', 'Bike'], sled: ['سلِد', 'Sled'], carries: ['حمل', 'Carries'], ropes: ['حبال', 'Ropes'], jump_rope: ['نط الحبل', 'Jump rope'], circuit: ['دواير', 'Circuits'], swim: ['سباحة', 'Swim'], walk: ['مشي', 'Walk'], crossfit: ['كروس فيت', 'CrossFit'], hyrox: ['هايروكس', 'HYROX'] },
  mobility: { neck: ['رقبة', 'Neck'], thoracic: ['ضهر علوي', 'Thoracic'], shoulder: ['كتف', 'Shoulder'], hip: ['حوض', 'Hip'], ankle: ['كاحل', 'Ankle'], spine: ['عمود فقري', 'Spine'], stretching: ['إطالة', 'Stretching'] },
  warmup: { general: ['عام', 'General'], activation: ['تنشيط', 'Activation'], dynamic: ['ديناميكي', 'Dynamic'] },
  core: { anti_extension: ['ضد الانحناء لورا', 'Anti-extension'], anti_rotation: ['ضد اللف', 'Anti-rotation'], anti_lateral: ['ضد الميل', 'Anti-lateral'], flexion: ['ثني', 'Flexion'], rotation: ['لف', 'Rotation'], stability: ['ثبات', 'Stability'] },
  plyometrics: { jumps: ['نط', 'Jumps'], bounds: ['وثبات', 'Bounds'], hops: ['حجلات', 'Hops'], throws: ['رمي', 'Throws'], upper_body: ['جزء علوي', 'Upper body'] },
  speed: { acceleration: ['تسارع', 'Acceleration'], max_speed: ['سرعة قصوى', 'Max speed'], change_of_direction: ['تغيير اتجاه', 'Change of direction'], ladder: ['سلم رشاقة', 'Ladder'], reaction: ['رد فعل', 'Reaction'] },
  tactical: { load_carriage: ['حمل وزن', 'Load carriage'], obstacle: ['موانع', 'Obstacles'], drag: ['سحب', 'Drags'], crawl: ['زحف', 'Crawls'], test_prep: ['تجهيز اختبارات', 'Test prep'] },
  athletic: { power: ['قدرة', 'Power'], olympic: ['أولمبي', 'Olympic'], contrast: ['تباين', 'Contrast'], sport_specific: ['خاص بالرياضة', 'Sport-specific'] },
  testing: { strength: ['قوة', 'Strength'], endurance: ['تحمّل', 'Endurance'], speed: ['سرعة', 'Speed'], power: ['قدرة', 'Power'], mobility: ['مرونة', 'Mobility'], balance: ['اتزان', 'Balance'], body_composition: ['تكوين الجسم', 'Body composition'] },
  rehab: { shoulder: ['كتف', 'Shoulder'], elbow: ['كوع', 'Elbow'], wrist: ['رسغ', 'Wrist'], neck: ['رقبة', 'Neck'], spine: ['ضهر', 'Spine'], hip: ['حوض', 'Hip'], knee: ['ركبة', 'Knee'], ankle: ['كاحل', 'Ankle'], achilles: ['أخيلس', 'Achilles'], foot: ['قدم', 'Foot'], balance: ['اتزان', 'Balance'], general: ['عام', 'General'] }
};

var REHAB_PART_TO_SUB = { shoulder: 'shoulder', neck: 'neck', back: 'spine', lower_back: 'spine', elbow: 'elbow', wrist: 'wrist', hip: 'hip', knee: 'knee', ankle: 'ankle', foot: 'foot', other: 'general' };

// أدوات جديدة — بنضيفها على نفس الخريطة عشان equipName تشتغل زي ما هي.
// اللي ليه اسم قبل كده (زي أدوات الدريلات) بيفضل باسمه القديم
addMissingKeys(EQUIPMENT, {
  'bench': { ar: 'بنش', en: 'Bench' }, 'pullup bar': { ar: 'عقلة', en: 'Pull-up bar' },
  'smith machine': { ar: 'سميث', en: 'Smith machine' }, 'box': { ar: 'بوكس', en: 'Box' },
  'sled': { ar: 'سلِد', en: 'Sled' }, 'rower': { ar: 'جهاز تجديف', en: 'Rower' },
  'bike': { ar: 'عجلة', en: 'Bike' }, 'skierg': { ar: 'SkiErg', en: 'SkiErg' },
  'treadmill': { ar: 'مشاية', en: 'Treadmill' }, 'jump rope': { ar: 'حبل نط', en: 'Jump rope' },
  'battle rope': { ar: 'حبال باتل', en: 'Battle rope' }, 'sandbag': { ar: 'ساند باج', en: 'Sandbag' },
  'suspension': { ar: 'TRX', en: 'Suspension trainer' }, 'plate': { ar: 'طارة', en: 'Plate' },
  'mini band': { ar: 'أستك صغير', en: 'Mini band' }, 'cones': { ar: 'أقماع', en: 'Cones' },
  'ladder': { ar: 'سلم رشاقة', en: 'Agility ladder' }, 'hurdles': { ar: 'حواجز', en: 'Hurdles' },
  'weight vest': { ar: 'سترة أوزان', en: 'Weight vest' }, 'landmine': { ar: 'لاند ماين', en: 'Landmine' },
  'wall': { ar: 'حيطة', en: 'Wall' }, 'step': { ar: 'استيب', en: 'Step' },
  'bosu': { ar: 'بوسو', en: 'BOSU' }, 'balance board': { ar: 'لوح اتزان', en: 'Balance board' }
});

function addMissingKeys(target, extra) {
  Object.keys(extra).forEach(function (key) { if (!target[key]) target[key] = extra[key]; });
}

Object.assign(CATEGORY_KEYS, {
  functional: 'cat_functional', mobility: 'cat_mobility', warmup: 'cat_warmup', core: 'cat_core',
  speed: 'cat_speed', tactical: 'cat_tactical', athletic: 'cat_athletic', testing: 'cat_testing', rehab: 'cat_rehab'
});

Object.assign(CATEGORY_ICON_PATHS, {
  functional: '<circle cx="12" cy="4.5" r="2"></circle><path d="M6 21l3-7 3 2 3-2 3 7"></path><path d="M7 10l5-2 5 2"></path>',
  conditioning: '<path d="M3 12h4l2-5 4 10 2-5h6"></path>',
  mobility: '<circle cx="12" cy="4.5" r="2"></circle><line x1="12" y1="6.5" x2="12" y2="13"></line><line x1="12" y1="8.5" x2="6" y2="6"></line><line x1="12" y1="8.5" x2="18" y2="6"></line><line x1="12" y1="13" x2="7" y2="20"></line><line x1="12" y1="13" x2="17" y2="20"></line>',
  warmup: '<path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 1.7 1.2 2.7 2.3 3C11 8 11.2 5.3 12 3z"></path>',
  core: '<rect x="7" y="4" width="10" height="16" rx="3"></rect><line x1="12" y1="4" x2="12" y2="20"></line><line x1="7" y1="10" x2="17" y2="10"></line><line x1="7" y1="15" x2="17" y2="15"></line>',
  speed: '<path d="M4 16h7"></path><path d="M2 12h7"></path><path d="M5 8h6"></path><path d="M13 6l7 6-7 6"></path>',
  tactical: '<path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"></path><path d="M9 12l2 2 4-4"></path>',
  athletic: '<circle cx="12" cy="9" r="5"></circle><path d="M9 13.5 7.5 21 12 18.5 16.5 21 15 13.5"></path>',
  testing: '<rect x="5" y="3.5" width="14" height="17" rx="2"></rect><line x1="9" y1="8" x2="15" y2="8"></line><line x1="9" y1="12" x2="15" y2="12"></line><polyline points="9 16 10.5 17.5 13.5 14.5"></polyline>',
  rehab: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"></path><line x1="12" y1="10" x2="12" y2="15"></line><line x1="9.5" y1="12.5" x2="14.5" y2="12.5"></line>'
});

// المكتبة من قسم في البرنامج بتفتح على النوع اللي يناسبه
Object.assign(SECTION_DEFAULT_CATEGORY, { warmup: 'warmup', cardio: 'conditioning', mobility: 'mobility', flexibility: 'mobility' });

function subName(group, sub) {
  const row = SUBCATS[group] && SUBCATS[group][sub];
  return row ? (lang === 'ar' ? row[0] : row[1]) : '';
}

function cautionName(key) {
  if (key === 'pregnancy') return PREGNANCY[lang] || PREGNANCY.ar || key;
  const c = HEALTH_CONDITIONS[key];
  return c ? (c[lang] || c.ar || key) : key;
}

/* ---------- البحث العربي ---------- */

// الهمزات والتاء المربوطة والتشكيل — عشان "ركبة" تلاقي "ركبه" و"اطالة" تلاقي "إطالة"
function normAr(text) {
  return String(text || '').toLowerCase()
    .replace(/[ً-ٰٟـ]/g, '')
    .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
    .replace(/[-_/(),.]/g, ' ').replace(/\s+/g, ' ').trim();
}

// الكلام اللي المدربين بيقولوه فعلًا — أي كلمة منهم بتلاقي الباقي
var LIB_SYNONYMS = [
  ['بنش', 'ضغط صدر', 'bench', 'chest press'], ['سكوات', 'قرفصاء', 'سكوت', 'squat'],
  ['ديدلفت', 'رفعه ميته', 'ديد لفت', 'deadlift'], ['عقله', 'pull up', 'pullup', 'chin up', 'شد لفوق'],
  ['ضغط', 'بوش اب', 'push up', 'pushup'], ['بطن', 'كرانش', 'crunch', 'abs', 'core'],
  ['كتف', 'shoulder', 'دلتا', 'ديلت'], ['باي', 'بايسبس', 'biceps', 'curl', 'كيرل'],
  ['تراي', 'ترايسبس', 'triceps'], ['رجل', 'legs', 'فخد', 'quad'], ['سمانه', 'calf', 'calves'],
  ['مؤخره', 'الويه', 'glute', 'hip thrust', 'هيب ثرست'], ['ضهر', 'ظهر', 'back', 'row'],
  ['بلانك', 'plank'], ['جري', 'run', 'running', 'sprint'], ['تجديف', 'rowing', 'rower'],
  ['عجله', 'دراجه', 'bike', 'cycling'], ['اطاله', 'stretch', 'استرتش'], ['احماء', 'warm up', 'warmup'],
  ['ركبه', 'knee'], ['كاحل', 'ankle'], ['رقبه', 'neck'], ['اخيلس', 'achilles'], ['حوض', 'hip'],
  ['لانج', 'طعن', 'lunge'], ['دمبل', 'dumbbell'], ['بار', 'barbell'], ['كيتل', 'kettlebell'],
  ['اختبار', 'تست', 'test'], ['نط', 'قفز', 'jump'], ['حبل', 'rope']
];

function libQueryTokens(term) {
  return normAr(term).split(' ').filter(Boolean).map(function (token) {
    const group = LIB_SYNONYMS.filter(function (g) {
      return g.some(function (w) { const n = normAr(w); return n === token || (token.length >= 3 && n.indexOf(token) === 0); });
    })[0];
    return group ? [token].concat(group.map(normAr)) : [token];
  });
}

/* ---------- تجهيز كل تمرين (مرة واحدة) ---------- */

function libMediaUrl(ex) {
  if (!ex) return '';
  if (ex._media !== undefined) return ex._media;
  let path = ex.m || '';
  if (!path && extraLocalMedia[ex.id]) path = extraLocalMedia[ex.id][0];
  ex._frames = ex.f || (extraLocalMedia[ex.id] ? extraLocalMedia[ex.id][1] : 0);
  ex._media = path ? ('media/' + path + '.svg') : '';
  return ex._media;
}

function prepLibEntry(ex) {
  if (!ex || ex._prepped) return ex;
  const cat = ex.category || '';
  let group = LIB_GROUP_ORDER.indexOf(cat) !== -1 ? cat : (LEGACY_GROUP[cat] || cat || 'strength');
  const primary = ex.primaryMuscles || [];
  let sub = ex.subcategory || '';
  if (!ex.subcategory) {
    if (group === 'strength' && primary.indexOf('abdominals') !== -1) { group = 'core'; sub = 'stability'; }
    else if (group === 'strength') sub = MUSCLE_TO_SUB[primary[0]] || '';
    else if (cat === 'crossfit' || cat === 'hyrox') sub = cat;
    else if (group === 'mobility') sub = 'stretching';
    else if (cat === 'agility') sub = 'change_of_direction';
    else if (cat === 'olympic weightlifting') sub = 'olympic';
    else if (cat === 'strongman') sub = 'carry';
  }
  ex._g = group;
  ex._s = sub;
  if (!ex.type) {
    const en = String((ex.name && (ex.name.en || ex.name)) || '').toLowerCase();
    ex._type = group === 'conditioning' && cat !== 'crossfit' ? 'distance_time'
      : (group === 'mobility' || /plank|hold|wall sit|hang/.test(en)) ? 'time'
      : (ex.equipment === 'body only' ? 'reps' : 'weight_reps');
  } else {
    ex._type = ex.type;
  }
  libMediaUrl(ex);
  const nm = (typeof ex.name === 'object') ? ex.name : { ar: '', en: ex.name || '' };
  ex._nameN = normAr((nm.ar || '') + ' ' + (nm.en || ''));
  const words = [nm.ar, nm.en, ex.equipment, (EQUIPMENT[ex.equipment] || {}).ar, (EQUIPMENT[ex.equipment] || {}).en]
    .concat(primary.map(function (m) { return (MUSCLES[m] || {}).ar + ' ' + m; }))
    .concat((ex.secondaryMuscles || []).map(function (m) { return (MUSCLES[m] || {}).ar + ' ' + m; }))
    .concat(SUBCATS[group] && SUBCATS[group][sub] ? SUBCATS[group][sub] : [])
    .concat(ex.tags || []);
  ex._search = normAr(words.join(' '));
  ex._prepped = true;
  return ex;
}

/* الفهرس الموسّع: من الشكل المختصر للشكل اللي باقي الكود بيفهمه */
function expandIndexRow(r) {
  return {
    id: r.id, name: r.n, category: r.c, subcategory: r.s,
    primaryMuscles: r.pm || [], secondaryMuscles: r.sm || [], equipment: r.e,
    level: r.l, type: r.t, pattern: r.p, cautions: r.ca || [], tags: r.tg || [],
    src: r.src, m: r.m || '', f: r.f || 0
  };
}

/* تمارين قوالب التأهيل — كل اسم مرة واحدة، والتفاصيل من القالب نفسه */
function rehabLibEntries() {
  if (rehabLibCache) return rehabLibCache;
  const seen = {};
  const out = [];
  REHAB_TEMPLATES.forEach(function (tpl) {
    (tpl.phases || []).forEach(function (phase) {
      (phase.exercises || []).forEach(function (item) {
        const en = item.name && item.name.en;
        if (!en) return;
        const key = normaliseName(en);
        if (seen[key]) return;
        seen[key] = true;
        const reps = String(item.reps || '');
        out.push({
          id: 'rt_' + key.replace(/ /g, '_'),
          name: { ar: item.name.ar || en, en: en },
          category: 'rehab',
          subcategory: REHAB_PART_TO_SUB[tpl.bodyPart] || 'general',
          primaryMuscles: [], secondaryMuscles: [], equipment: 'other',
          type: /ثاني|sec|\bs\b|دقيق|min/i.test(reps) ? 'time' : 'reps',
          cautions: [], tags: [], src: 'rehab',
          _rehab: { goal: item.goal, benefit: item.injuryBenefit, muscles: item.primaryMuscles, sets: item.sets, reps: item.reps, template: tpl }
        });
      });
    });
  });
  rehabLibCache = out;
  return out;
}

function baseLibrary() {
  return EXERCISE_LIBRARY.concat(extraLib || [], rehabLibEntries());
}

function rebuildLibraryData() {
  const base = baseLibrary();
  const names = {};
  base.forEach(function (ex) {
    const en = (ex.name && typeof ex.name === 'object') ? ex.name.en : ex.name;
    if (en) names[normaliseName(en)] = true;
  });
  const leftovers = remoteLeftovers.filter(function (ex) {
    return !names[normaliseName(typeof ex.name === 'object' ? ex.name.en : ex.name)];
  });
  libraryData = base.concat(leftovers);
  libraryData.forEach(prepLibEntry);
}

function ensureExtraLibrary() {
  if (extraLibPromise) return extraLibPromise;
  extraLibPromise = import('./library/exercises-index.js').then(function (mod) {
    extraLocalMedia = mod.LOCAL_MEDIA || {};
    extraLib = (mod.EXERCISE_INDEX || []).map(expandIndexRow);
    // التمارين القديمة ممكن تكون اتجهّزت قبل ما رسومها توصل
    EXERCISE_LIBRARY.forEach(function (ex) { delete ex._media; delete ex._prepped; });
    rebuildLibraryData();
    return extraLib;
  }).catch(function () {
    // النت فصل — المكتبة الأصلية بتفضل شغالة، ونحاول تاني المرة الجاية
    extraLibPromise = null;
    return [];
  });
  return extraLibPromise;
}

function ensureExerciseDetails() {
  if (extraDetails) return Promise.resolve(extraDetails);
  if (extraDetailsPromise) return extraDetailsPromise;
  extraDetailsPromise = import('./library/exercises-details.js').then(function (mod) {
    extraDetails = mod.EXERCISE_DETAILS || {};
    return extraDetails;
  }).catch(function () {
    extraDetailsPromise = null;
    return {};
  });
  return extraDetailsPromise;
}

/* الخطوات والنصايح والأخطاء بلغة الواجهة — من أي طبقة جه التمرين */
function libDetailsOf(ex) {
  const pick = function (v) { return (v && typeof v === 'object') ? (v[lang] || v.ar || v.en || '') : (v || ''); };
  const d = extraDetails && extraDetails[ex.id];
  if (d) {
    const ar = lang === 'ar';
    return { howTo: ar ? d[0] : d[1], cues: (ar ? d[2] : d[3]) || [], mistakes: (ar ? d[4] : d[5]) || [], benefit: '' };
  }
  if (ex._rehab) return { howTo: pick(ex._rehab.goal), cues: [], mistakes: [], benefit: pick(ex._rehab.benefit) };
  return { howTo: pick(ex.howTo), cues: [], mistakes: [], benefit: '' };
}

/* ---------- الوصفة حسب نوع التمرين ---------- */

var PRESCRIPTION_DEFAULTS = {
  weight_reps: { sets: 3, reps: '10', rest: '90s' },
  reps: { sets: 3, reps: '12', rest: '60s' },
  time: { sets: 3, duration: '30s', rest: '30s' },
  distance: { sets: 3, distance: '20m', rest: '90s' },
  distance_time: { sets: 1, duration: '20min', distance: '' }
};

var PRESCRIPTION_FIELDS = {
  weight_reps: ['sets', 'reps', 'load', 'rest', 'tempo', 'intensity'],
  reps: ['sets', 'reps', 'rest', 'tempo'],
  time: ['sets', 'duration', 'rest'],
  distance: ['sets', 'distance', 'load', 'rest'],
  distance_time: ['sets', 'distance', 'duration', 'zone', 'rest']
};

function buildLibExercise(ex, values) {
  const det = libDetailsOf(ex);
  // نسخة باللغتين — عشان العميل اللي بيقلب اللغة يشوف كل حاجة بلغته
  const i18n = {};
  ['ar', 'en'].forEach(function (L) {
    i18n[L] = withLang(L, function () {
      const d = libDetailsOf(ex);
      return {
        name: exerciseLibName(ex),
        howTo: d.howTo,
        cues: d.cues.join('\n'),
        benefit: d.benefit,
        primaryMuscles: ex._rehab ? ((ex._rehab.muscles || {})[L] || '') : musclesListText(ex.primaryMuscles),
        secondaryMuscles: musclesListText(ex.secondaryMuscles)
      };
    });
  });
  const libPhoto = libraryImageFor('exercise_' + ex.id);
  const type = ex._type || ex.type || 'weight_reps';
  const v = Object.assign({}, PRESCRIPTION_DEFAULTS[type] || PRESCRIPTION_DEFAULTS.weight_reps, values || {});
  if (ex._rehab && !values) { v.sets = ex._rehab.sets || v.sets; if (ex._rehab.reps) { if (type === 'time') v.duration = String(ex._rehab.reps); else v.reps = String(ex._rehab.reps); } }
  const isTimeLike = type === 'time' || type === 'distance' || type === 'distance_time';
  return makeExercise({
    libId: ex.id,
    name: exerciseLibName(ex),
    sets: Number(v.sets) || 1,
    // الأنواع اللي مالهاش عدات بنكتب فيها المدة/المسافة — عشان أي شاشة قديمة تعرضها صح
    reps: isTimeLike ? String(v.duration || v.distance || '') : String(v.reps || ''),
    rest: v.rest || '', load: v.load || '', tempo: v.tempo || '',
    rpe: v.intensityKind === 'rir' ? '' : (v.intensity || ''),
    rir: v.intensityKind === 'rir' ? (v.intensity || '') : '',
    duration: v.duration || '', distance: v.distance || '', zone: v.zone || '',
    cues: (v.cues !== undefined ? v.cues : det.cues.join('\n')),
    exType: type,
    primaryMuscles: ex._rehab ? (lang === 'ar' ? (ex._rehab.muscles || {}).ar : (ex._rehab.muscles || {}).en) || '' : musclesListText(ex.primaryMuscles),
    secondaryMuscles: musclesListText(ex.secondaryMuscles),
    howTo: det.howTo,
    injuryBenefit: det.benefit,
    image: (!libPhoto && !libMediaUrl(ex) && ex.images && ex.images.length) ? ex.images[0] : '',
    imageUrl: libPhoto || libMediaUrl(ex) || '',
    i18n: i18n
  });
}

function deliverLibExercise(built) {
  closeExSheet();
  if (libraryContext === 'class') {
    addExerciseToCurrentClass(built);
    return;
  }
  showScreen(coachScreen);
  addToTarget(built);
}

async function quickAddLibExercise(ex) {
  await ensureExerciseDetails();
  deliverLibExercise(buildLibExercise(ex));
}

/* ---------- الشيت: تفاصيل التمرين ---------- */

function exSheetEls() {
  return { wrap: document.getElementById('ex-sheet'), body: document.getElementById('ex-sheet-body') };
}

function closeExSheet() {
  const els = exSheetEls();
  if (els.wrap) els.wrap.classList.add('hidden');
  document.body.classList.remove('sheet-open');
}

function openExSheetShell() {
  const els = exSheetEls();
  els.body.innerHTML = '';
  els.wrap.classList.remove('hidden');
  document.body.classList.add('sheet-open');
  els.wrap.querySelector('.ex-sheet').scrollTop = 0;
  return els.body;
}

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

function clientCautionKeys() {
  if (libraryContext !== 'coach' || !currentClient || !coachHealth) return [];
  try { return activeHealthItems(coachHealth).map(function (item) { return item.key; }); } catch (e) { return []; }
}

function libAlternatives(ex) {
  const muscles = ex.primaryMuscles || [];
  return (libraryData || []).filter(function (other) {
    if (other === ex || other.id === ex.id || other._g !== ex._g) return false;
    if (ex._s && other._s !== ex._s) return false;
    if (!muscles.length) return true;
    return (other.primaryMuscles || []).some(function (m) { return muscles.indexOf(m) !== -1; });
  }).sort(function (a, b) { return (b._media ? 1 : 0) - (a._media ? 1 : 0); }).slice(0, 6);
}

function libLevelText(level) {
  return level ? t('level_' + level) : '';
}

async function openExerciseSheet(ex) {
  prepLibEntry(ex);
  const body = openExSheetShell();
  body.appendChild(el('p', 'hint-text', t('exs_loading')));
  await ensureExerciseDetails();
  const det = libDetailsOf(ex);
  body.innerHTML = '';
  body.setAttribute('data-id', ex.id);

  const media = libraryImageFor('exercise_' + ex.id) || libMediaUrl(ex) || ((ex.images && ex.images.length) ? IMAGE_BASE + ex.images[0] : '');
  if (media) {
    const box = el('div', 'exs-media');
    const img = el('img');
    img.src = media;
    img.alt = exerciseLibName(ex);
    box.appendChild(img);
    if (ex._frames === 2) box.appendChild(el('span', 'exs-media-hint', t('exs_animated')));
    body.appendChild(box);
  }

  body.appendChild(el('h3', 'exs-title', exerciseLibName(ex)));
  const other = (typeof ex.name === 'object' && lang === 'ar') ? ex.name.en : '';
  if (other) body.appendChild(el('p', 'exs-subtitle', other));

  const chips = el('div', 'exs-chips');
  [categoryName(ex._g) + (ex._s && subName(ex._g, ex._s) ? ' · ' + subName(ex._g, ex._s) : ''),
   libLevelText(ex.level), ex.equipment ? equipName(ex.equipment) : '', t('type_' + ex._type)]
    .filter(Boolean).forEach(function (txt) { chips.appendChild(el('span', 'exs-chip', txt)); });
  body.appendChild(chips);

  // الاحتياطات أول حاجة — قبل الخطوات، زي أجهزة العلاج الطبيعي
  const cautions = ex.cautions || [];
  const clientKeys = clientCautionKeys();
  const hits = cautions.filter(function (k) { return clientKeys.indexOf(k) !== -1; });
  if (hits.length) {
    body.appendChild(el('div', 'exs-caution danger', fill('exs_caution_client', { list: hits.map(cautionName).join('، ') })));
  } else if (cautions.length) {
    body.appendChild(el('div', 'exs-caution', fill('exs_caution_general', { list: cautions.map(cautionName).join('، ') })));
  }

  if ((ex.primaryMuscles || []).length || (ex._rehab && ex._rehab.muscles)) {
    const p = el('p', 'exs-line');
    p.appendChild(el('strong', '', t('exs_primary') + ': '));
    p.appendChild(document.createTextNode(ex._rehab ? ((ex._rehab.muscles || {})[lang] || '') : musclesListText(ex.primaryMuscles)));
    if ((ex.secondaryMuscles || []).length) {
      p.appendChild(el('span', 'exs-muted', ' · ' + t('exs_secondary') + ': ' + musclesListText(ex.secondaryMuscles)));
    }
    body.appendChild(p);
  }

  function section(titleKey, content) {
    if (!content || (Array.isArray(content) && !content.length)) return;
    body.appendChild(el('h4', 'exs-h', t(titleKey)));
    if (Array.isArray(content)) {
      const ul = el('ul', 'exs-list');
      content.forEach(function (line) { ul.appendChild(el('li', '', line)); });
      body.appendChild(ul);
    } else {
      body.appendChild(el('p', 'exs-text', content));
    }
  }
  section('exs_howto', det.howTo);
  section('exs_cues', det.cues);
  section('exs_mistakes', det.mistakes);
  section('anatomy_injury_benefit', det.benefit);

  const alts = libAlternatives(ex);
  if (alts.length) {
    body.appendChild(el('h4', 'exs-h', t('exs_alternatives')));
    const row = el('div', 'exs-alts');
    alts.forEach(function (alt) {
      const b = el('button', 'exs-alt', exerciseLibName(alt));
      b.type = 'button';
      b.addEventListener('click', function () { openExerciseSheet(alt); });
      row.appendChild(b);
    });
    body.appendChild(row);
  }

  if (ex.src === 'ek' || ex.src === 'wg' || (libMediaUrl(ex) && !ex.src)) {
    const credit = el('button', 'link exs-credit', t('exs_media_credit'));
    credit.type = 'button';
    credit.addEventListener('click', openMediaCredits);
    body.appendChild(credit);
  }

  const actions = el('div', 'exs-actions');
  const addBtn = el('button', '', t('exs_add'));
  addBtn.type = 'button';
  addBtn.id = 'exs-add-btn';
  addBtn.addEventListener('click', function () {
    if (libraryContext === 'class') { deliverLibExercise(buildLibExercise(ex)); return; }
    openPrescription(ex);
  });
  actions.appendChild(addBtn);
  body.appendChild(actions);
}

/* ---------- الشيت: الوصفة ---------- */

function openPrescription(ex) {
  const body = openExSheetShell();
  const type = ex._type || 'weight_reps';
  const defaults = Object.assign({}, PRESCRIPTION_DEFAULTS[type]);
  if (ex._rehab) { defaults.sets = ex._rehab.sets || defaults.sets; if (type === 'time') defaults.duration = String(ex._rehab.reps || defaults.duration); else defaults.reps = String(ex._rehab.reps || defaults.reps); }
  const det = libDetailsOf(ex);

  body.appendChild(el('h3', 'exs-title', exerciseLibName(ex)));
  body.appendChild(el('p', 'exs-subtitle', t('exs_prescribe') + ' · ' + t('type_' + type)));

  const inputs = {};
  const grid = el('div', 'exs-form');
  const labels = { sets: 'ex_sets', reps: 'ex_reps', load: 'ex_load', rest: 'ex_rest', tempo: 'ex_tempo', duration: 'ex_duration', distance: 'ex_distance', zone: 'ex_zone' };
  (PRESCRIPTION_FIELDS[type] || PRESCRIPTION_FIELDS.weight_reps).forEach(function (key) {
    const wrap = el('label', 'exs-field');
    if (key === 'intensity') {
      wrap.appendChild(el('span', '', t('ex_intensity')));
      const row = el('div', 'exs-intensity');
      const kind = el('select');
      kind.id = 'exs-f-intensity-kind';
      [['rpe', 'RPE'], ['rir', 'RIR']].forEach(function (o) { const op = el('option', '', o[1]); op.value = o[0]; kind.appendChild(op); });
      const val = el('input');
      val.id = 'exs-f-intensity';
      val.inputMode = 'decimal';
      row.appendChild(kind);
      row.appendChild(val);
      wrap.appendChild(row);
      inputs.intensityKind = kind;
      inputs.intensity = val;
    } else {
      wrap.appendChild(el('span', '', t(labels[key])));
      const input = el('input');
      input.id = 'exs-f-' + key;
      input.value = defaults[key] !== undefined ? defaults[key] : '';
      if (key === 'sets') { input.type = 'number'; input.min = '1'; }
      wrap.appendChild(input);
      inputs[key] = input;
    }
    grid.appendChild(wrap);
  });
  body.appendChild(grid);

  const cuesWrap = el('label', 'exs-field wide');
  cuesWrap.appendChild(el('span', '', t('exs_cues_for_client')));
  const cues = el('textarea');
  cues.id = 'exs-f-cues';
  cues.rows = 3;
  cues.value = det.cues.join('\n');
  cuesWrap.appendChild(cues);
  body.appendChild(cuesWrap);

  const where = (coachMode === 'rehab')
    ? ((targetPhase && targetPhase.selectedOptions[0]) ? targetPhase.selectedOptions[0].textContent : '')
    : ((targetSection && targetSection.selectedOptions[0]) ? targetSection.selectedOptions[0].textContent : '');
  if (where) body.appendChild(el('p', 'hint-text', fill('exs_add_to', { target: where })));

  const actions = el('div', 'exs-actions');
  const back = el('button', 'secondary', t('back_generic'));
  back.type = 'button';
  back.addEventListener('click', function () { openExerciseSheet(ex); });
  const ok = el('button', '', t('exs_add'));
  ok.type = 'button';
  ok.id = 'exs-confirm-btn';
  ok.addEventListener('click', function () {
    const values = {};
    Object.keys(inputs).forEach(function (k) { values[k] = inputs[k].value; });
    values.cues = cues.value.trim();
    deliverLibExercise(buildLibExercise(ex, values));
  });
  actions.appendChild(back);
  actions.appendChild(ok);
  body.appendChild(actions);
}

/* ---------- حقوق الصور ---------- */

async function openMediaCredits() {
  const body = openExSheetShell();
  body.appendChild(el('p', 'hint-text', t('exs_loading')));
  let mod;
  try { mod = await import('./library/credits.js'); } catch (e) { body.innerHTML = ''; body.appendChild(el('p', 'message', t('problem'))); return; }
  body.innerHTML = '';
  body.appendChild(el('h3', 'exs-title', t('credits_title')));
  body.appendChild(el('p', 'exs-text', t('credits_intro')));
  Object.keys(mod.MEDIA_SOURCES).forEach(function (key) {
    const s = mod.MEDIA_SOURCES[key];
    const items = mod.MEDIA_CREDITS.filter(function (c) { return c.src === key; });
    const card = el('div', 'credit-card');
    card.appendChild(el('h4', 'exs-h', s.name + ' — ' + fill('credits_count', { n: items.length })));
    const who = el('p', 'exs-line');
    who.appendChild(el('strong', '', t('credits_by') + ': '));
    who.appendChild(document.createTextNode(s.by));
    card.appendChild(who);
    const lic = el('p', 'exs-line');
    lic.appendChild(el('strong', '', t('credits_license') + ': '));
    const a = el('a', '', s.license);
    a.href = s.licenseUrl; a.target = '_blank'; a.rel = 'noopener';
    lic.appendChild(a);
    lic.appendChild(document.createTextNode(' · '));
    const src = el('a', '', t('credits_source'));
    src.href = s.url; src.target = '_blank'; src.rel = 'noopener';
    lic.appendChild(src);
    card.appendChild(lic);
    const ch = el('p', 'exs-line');
    ch.appendChild(el('strong', '', t('credits_changes') + ': '));
    ch.appendChild(document.createTextNode(s.changes[lang] || s.changes.ar));
    card.appendChild(ch);
    const det = el('details', 'credit-list');
    det.appendChild(el('summary', '', t('credits_show_list')));
    const ul = el('ul', 'exs-list');
    items.forEach(function (c) {
      const li = el('li');
      const link = el('a', '', c.title);
      link.href = c.url; link.target = '_blank'; link.rel = 'noopener';
      li.appendChild(link);
      ul.appendChild(li);
    });
    det.appendChild(ul);
    card.appendChild(det);
    body.appendChild(card);
  });
}

document.getElementById('ex-sheet-close').addEventListener('click', closeExSheet);
document.getElementById('ex-sheet').addEventListener('click', function (event) {
  if (event.target.id === 'ex-sheet') closeExSheet();
});
document.getElementById('lib-credits-btn').addEventListener('click', openMediaCredits);
document.getElementById('lib-level').addEventListener('change', function () { resetLibPage(); renderLibrary(); });
document.getElementById('lib-media-only').addEventListener('click', function () {
  libMediaOnly = !libMediaOnly;
  this.classList.toggle('active', libMediaOnly);
  resetLibPage(); renderLibrary();
});
document.getElementById('lib-safe-only').addEventListener('click', function () {
  libSafeOnly = !libSafeOnly;
  this.classList.toggle('active', libSafeOnly);
  resetLibPage(); renderLibrary();
});


/* أرقام القالب → خانات الوصفة: "30s" مدة، "400m" مسافة، "20min" مدة… */
function templateValues(source, type) {
  const reps = String(source.reps || '');
  const v = { sets: source.sets, rest: source.rest || '', load: source.load || '', tempo: source.tempo || '', intensity: source.rpe || '' };
  const isDistance = /\d\s*(m|km|م|كم)\b/i.test(reps) && !/min/i.test(reps);
  if (type === 'time') v.duration = reps;
  else if (type === 'distance') v.distance = reps;
  else if (type === 'distance_time') { if (isDistance) v.distance = reps; else v.duration = reps; }
  else v.reps = reps;
  return v;
}


/* ============================================================
   الترجمة للنصوص المحفوظة
   ------------------------------------------------------------
   القوالب والمكملات والأجهزة بتتنسخ جوه برنامج العميل بلغة المدرب
   وقت ما اتضافت. فلو العميل قلب اللغة كان بيلاقي عربي. بنعمل قاموس
   من كل نص موجود باللغتين في المكتبات، وأي نص محفوظ مطابق لنص فيه
   بيتعرض باللغة الحالية. النص اللي المدرب كتبه بإيده بيفضل زي ما هو
   — ده كلامه هو مش ترجمة. وده بيصلّح البرامج القديمة المحفوظة كمان
   ============================================================ */

var trDict = null;

function trKey(text) {
  return String(text).trim().replace(/\s+/g, ' ');
}

function buildTrDict() {
  const d = { ar: {}, en: {} };
  const add = function (ar, en) {
    if (typeof ar !== 'string' || typeof en !== 'string' || !ar.trim() || !en.trim() || ar === en) return;
    const ka = trKey(ar), ke = trKey(en);
    if (!d.ar[ka]) d.ar[ka] = en;
    if (!d.en[ke]) d.en[ke] = ar;
  };
  const walk = function (node, depth) {
    if (!node || typeof node !== 'object' || depth > 8) return;
    if (Array.isArray(node)) { node.forEach(function (x) { walk(x, depth + 1); }); return; }
    if (typeof node.ar === 'string' && typeof node.en === 'string') add(node.ar, node.en);
    if (typeof node.title === 'string' && typeof node.titleEn === 'string') add(node.title, node.titleEn);
    if (typeof node.body === 'string' && typeof node.bodyEn === 'string') add(node.body, node.bodyEn);
    Object.keys(node).forEach(function (k) { if (node[k] && typeof node[k] === 'object') walk(node[k], depth + 1); });
  };
  [REHAB_TEMPLATES, SUPPLEMENT_LIBRARY, MODALITIES, MODALITY_PROTOCOLS, SPORT_TEMPLATES, NUTRITION_PROGRAMS, MED_LIBRARY_SEED, EXERCISE_LIBRARY]
    .forEach(function (lib) { walk(lib, 0); });
  // مراحل التأهيل: "اسم التمرين — ٣ × ١٠" وغيره بيتكتب من الحقول دي بالظبط
  Object.keys(MODALITY_VALUES_EN).forEach(function (ar) { add(ar, MODALITY_VALUES_EN[ar]); });
  trDict = d;
}

function tr(text) {
  if (!text || typeof text !== 'string') return text;
  if (!trDict) buildTrDict();
  const key = trKey(text);
  if (lang === 'en') return trDict.ar[key] || text;
  return trDict.en[key] || text;
}

function modalityValueText(value) {
  if (lang !== 'en' || !value) return value;
  return MODALITY_VALUES_EN[value] || MODALITY_VALUES_EN[trKey(value)] || value;
}

/* نص من تفاصيل التمرين (الشرح، النصايح، الفايدة…) بلغة الواجهة */
function exerciseText(exercise, key, value) {
  if (!value) return value;
  const map = { anatomy_howto: 'howTo', exs_cues: 'cues', anatomy_injury_benefit: 'benefit', anatomy_primary: 'primaryMuscles', anatomy_secondary: 'secondaryMuscles' };
  const field = map[key];
  const i18n = exercise && exercise.i18n;
  if (field && i18n && i18n[lang] && i18n[lang][field] !== undefined) {
    // لو المدرب عدّل النص بإيده، بنعرض كلامه هو
    const other = lang === 'ar' ? 'en' : 'ar';
    if (value === (i18n[other] || {})[field] || value === i18n[lang][field]) return i18n[lang][field];
  }
  return tr(value);
}
