import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc, deleteField, collection, getDocs, onSnapshot, query, where, orderBy } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { firebaseConfig, COACH_EMAIL } from './firebase-config.js';
import { REHAB_TEMPLATES } from './rehab-templates.js';
import { FOOD_LIBRARY, FOOD_CATEGORIES } from './food-library.js';
import { SPORTS, SPORT_GROUPS, SPORT_METRICS, METRIC_FIELDS, SPORT_TEMPLATES } from './sports.js';
import { SPECIALTIES, specialtyName, specialtyIcon, specialtyIconSvg, MED_CATEGORIES, MED_REVIEW, DEFAULT_RED_FLAGS, SESSION_TYPES, BOOKING_STATUS } from './providers.js';
import { MED_LIBRARY_SEED } from './med-library-seed.js';
import { EXERCISE_LIBRARY } from './exercise-library.js';

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
    open_mylib: '⭐ مكتبتي الخاصة',
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
    focus_training: '🏋️ تمرين',
    focus_nutrition: '🍎 تغذية',
    focus_rehab: '🩹 تأهيل',
    focus_medical: '🩺 استشارة طبية',
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
    ob_sleep_label: 'مواعيد نومك',
    ob_sleep_hint: 'لو شغلك ورديات ومواعيدك بتتغير، حط المواعيد الغالبة عليك دلوقتي',
    ob_sleep_time_label: 'بتنام الساعة كام',
    ob_wake_time_label: 'بتصحى الساعة كام',
    ob_meals_per_day_label: 'حابب تاكل كام وجبة في اليوم؟',
    pick_meals_per_day: '— اختر عدد الوجبات —',
    meals_per_day_count: '{n} وجبات',
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
    rest_msg: 'يوم راحة 😌',
    no_plan: 'مفيش برنامج لليوم ده',
    day_plan: 'برنامج يوم {day}',
    of_exercises: '{a} من {b} تمارين',
    well_done: 'أحسنت يا بطل 💪',
    remaining: 'لسه باقي {n} تمارين',

    days: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
    days_short: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],

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
    welcome_pillars_title: 'مش تمرين بس... ولا أكل بس... ولا تأهيل بس',
    welcome_pillars_sub: 'دوس على أي جزء تحت تشوف شكله الكامل وبرنامج أسبوع كامل ليه',
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
    how_it_works_step1_text: 'هدفك، رياضتك، أي إصابة حالية أو سابقة، وأي حاجة محتاجها فريقك يعرفها',
    how_it_works_step2_title: 'هيتظبطلك برنامج فعلي',
    how_it_works_step2_text: 'مدرب أو متخصص حقيقي بيراجع حالتك ويبني برنامجك بنفسه، مش برنامج جاهز للكل',
    how_it_works_step3_title: 'تابع وعدّل أسبوعيًا',
    how_it_works_step3_text: 'تسجّل تقدمك أول بأول، وفريقك يعدّل البرنامج معاك حسب اللي بتحسّه',
    welcome_audience_title: 'مين البرنامج ده مناسبله؟',
    welcome_audience_1: 'رياضي عائد من إصابة وعاوز تأهيل مضبوط قبل ما يرجع يلعب',
    welcome_audience_2: 'مبتدئ عاوز يبدأ صح من غير ما يتلخبط في تمارين مش مناسبة له',
    welcome_audience_3: 'لاعب بيستعد لموسم أو بطولة ومحتاج برنامج مبني على توقيت محدد',
    welcome_audience_4: 'حد عاوز يتابع نظام غذائي فعلي مع أخصائي، مش أرقام عامة بس',
    welcome_stories_title: 'قبل وبعد',
    story_before_label: 'قبل',
    story_after_label: 'بعد',
    welcome_team_title: 'فريقك المتخصص',
    welcome_faq_title: 'أسئلة شائعة',
    welcome_lead_title: 'لسه مش متأكد؟ اتكلم مع فريقنا الأول',
    welcome_lead_sub: 'اكتب بياناتك وهيتواصل معاك حد من الفريق يجاوبك على أي سؤال',
    lead_name_ph: 'اسمك',
    lead_contact_ph: 'رقم تليفونك أو إيميلك',
    lead_message_ph: 'سؤالك أو أي حاجة عاوز تقولها (اختياري)',
    lead_submit_btn: 'ابعت',
    lead_submitted_msg: 'وصلت رسالتك — هيتواصل معاك فريقنا قريب',
    need_lead_fields: 'اكتب اسمك ورقم تليفونك أو إيميلك',
    provider_apply_title: 'مدرب أو متخصص وعايز تنضم لينا؟',
    provider_apply_sub: 'ابعتلنا بياناتك وهنراجعها ونرجعلك بالرد',
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
    open_mylib: '⭐ My own library',
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
    focus_training: '🏋️ Training',
    focus_nutrition: '🍎 Nutrition',
    focus_rehab: '🩹 Rehab',
    focus_medical: '🩺 Medical consultation',
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
    ob_sleep_label: 'Your sleep schedule',
    ob_sleep_hint: 'If your work is shifts and your times change, put whatever fits your current schedule',
    ob_sleep_time_label: 'Bedtime',
    ob_wake_time_label: 'Wake-up time',
    ob_meals_per_day_label: 'How many meals a day do you like?',
    pick_meals_per_day: '— Choose number of meals —',
    meals_per_day_count: '{n} meals',
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
    rest_msg: 'Rest day 😌',
    no_plan: 'No program for this day',
    day_plan: '{day} program',
    of_exercises: '{a} of {b} exercises',
    well_done: 'Well done, champ 💪',
    remaining: '{n} exercises left',

    days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    days_short: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],

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
    welcome_pillars_title: 'Not just training... not just food... not just rehab',
    welcome_pillars_sub: 'Tap any part below to see its full shape and a complete week\'s program',
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
    how_it_works_step1_text: 'Your goal, your sport, any current or past injury, and anything your team needs to know',
    how_it_works_step2_title: "You'll get a real program",
    how_it_works_step2_text: 'A real coach or specialist reviews your case and builds your program themselves — not a one-size-fits-all plan',
    how_it_works_step3_title: 'Track and adjust weekly',
    how_it_works_step3_text: 'Log your progress as you go, and your team adjusts the program with you based on how you feel',
    welcome_audience_title: 'Who is this program for?',
    welcome_audience_1: 'An athlete returning from injury who wants proper rehab before getting back to play',
    welcome_audience_2: 'A beginner who wants to start right without getting lost in exercises that don\'t suit them',
    welcome_audience_3: 'A player preparing for a season or competition who needs a program built around a set timeline',
    welcome_audience_4: 'Someone who wants an actual nutrition plan with a specialist, not just generic numbers',
    welcome_stories_title: 'Before & after',
    story_before_label: 'Before',
    story_after_label: 'After',
    welcome_team_title: 'Your specialist team',
    welcome_faq_title: 'Frequently asked questions',
    welcome_lead_title: "Not sure yet? Talk to our team first",
    welcome_lead_sub: "Leave your details and someone from the team will reach out to answer any question",
    lead_name_ph: 'Your name',
    lead_contact_ph: 'Your phone number or email',
    lead_message_ph: 'Your question or anything you want to say (optional)',
    lead_submit_btn: 'Send',
    lead_submitted_msg: "Your message was sent — our team will reach out soon",
    need_lead_fields: 'Enter your name and phone number or email',
    provider_apply_title: 'Are you a coach or specialist who wants to join us?',
    provider_apply_sub: "Send us your details and we'll review them and get back to you",
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
const MEAL_ICONS = { breakfast: '🌅', lunch: '🍽️', dinner: '🌙', snack: '🥤' };
const SECTION_ICONS = {
  warmup: '🔥',
  main: '🏋️',
  cardio: '🏃',
  mobility: '🔄',
  flexibility: '🧘'
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
    setDetails: Array.isArray(data.setDetails) ? data.setDetails : []
  };
}

/* بترجع true لو أي حقل من حقول التفاصيل التشريحية متملي */
function exerciseHasAnatomyDetail(exercise) {
  return !!(exercise && (exercise.goal || exercise.primaryMuscles || exercise.secondaryMuscles || exercise.origin || exercise.insertion || exercise.injuryBenefit || exercise.howTo));
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
  if (exercise.setDetails && exercise.setDetails.length) {
    return exercise.setDetails.map(function (set, index) {
      const parts = [(set.reps || '?') + '×' + (set.weight || '?' ) + (lang === 'ar' ? 'كجم' : 'kg')];
      if (set.rest) parts.push(set.rest);
      return (index + 1) + ') ' + parts.join(' — ');
    }).join('   ');
  }
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

const welcomeScreen = document.getElementById('welcome-screen');
const welcomeStickyCta = document.getElementById('welcome-sticky-cta');
const welcomeFaqList = document.getElementById('welcome-faq-list');
const welcomeTeamSection = document.getElementById('welcome-team-section');
const welcomeTeamGrid = document.getElementById('welcome-team-grid');
const welcomeStoriesSection = document.getElementById('welcome-stories-section');
const welcomeStoriesGrid = document.getElementById('welcome-stories-grid');
const providerSubscriptionScreen = document.getElementById('provider-subscription-screen');
const trustStatItem = document.getElementById('trust-stat-item');
const trustStatText = document.getElementById('trust-stat-text');
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

function fillSpecialtyCheckboxes(container, selected) {
  if (!container) return;
  const sel = selected || [];
  container.innerHTML = '';
  Object.keys(SPECIALTIES).forEach(function (key) {
    const label = document.createElement('label');
    label.className = 'specialty-check';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = key;
    input.checked = sel.indexOf(key) !== -1;
    label.appendChild(input);
    const span = document.createElement('span');
    span.textContent = specialtyIcon(key) + ' ' + specialtyName(key, lang);
    label.appendChild(span);
    container.appendChild(label);
  });
}

function readSpecialtyCheckboxes(container) {
  if (!container) return [];
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
  return (list || []).map(function (key) { return specialtyName(key, lang); }).join('، ');
}
let phPickedImage = '';
let onboardingEmail = '';
let onboardingIsNewSignup = false;
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
  [welcomeScreen, trialEndedScreen, loginScreen, signupScreen, onboardingScreen, teamScreen, injuryScreen, teamViewScreen, medLibraryScreen, bookingsScreen, clientsScreen, classesScreen, classDetailScreen, providersScreen, providerHomeScreen, coachScreen, libraryScreen, mylibScreen, foodScreen, clientScreen, clientProfileScreen, subscriptionScreen, providerSubscriptionScreen, adminPanelScreen, chatScreen, chatInboxScreen, calculatorsScreen, progressScreen].forEach(function (s) {
    s.classList.add('hidden');
  });
  screen.classList.remove('hidden');
  logoutButton.classList.toggle('hidden', screen === loginScreen || screen === welcomeScreen);
  welcomeStickyCta.classList.toggle('hidden', screen !== welcomeScreen);
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
  signOut(auth);
});

onAuthStateChanged(auth, async function (user) {
  if (!user) {
    currentProviderEmail = '';
    currentProviderSpecialty = '';
    currentProviderSpecialties = [];
    currentProviderData = null;
    showScreen(welcomeScreen);
    return;
  }

  const email = user.email.toLowerCase();

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

    if (!clientData || !clientData.onboarded) {
      onboardingEmail = email;
      // مفيش مستند عميل خالص لسه = حساب اتعمل لوحده من صفحة التعريف، مش كوتش ضايفه
      onboardingIsNewSignup = !clientData;
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
});

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
    const emailEl = item.querySelector('.client-email');
    const name = (nameEl ? nameEl.textContent : '').toLowerCase();
    const email = (emailEl ? emailEl.textContent : '').toLowerCase();
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
  openAdminPanelBtn.classList.toggle('hidden', !isFullAdminAccount());
  openProviderSubscriptionBtn.classList.toggle('hidden', isFullAdminAccount());
  refreshProviderSubBanner();

  clientsList.innerHTML = '';
  clientsMessage.textContent = t('loading');
  try {
    const snapshot = await getDocs(collection(db, 'clients'));
    let mine;
    if (isFullAdminAccount()) {
      // عضو الفريق الإداري (أو صاحب المنصة) يشوف كل العملاء من غير استثناء
      mine = snapshot.docs;
    } else if (isFullCoachRole()) {
      // كل مدرب يشوف عملاءه بس — العملاء القدام من غير coachEmail بيفضلوا
      // تابعين للحساب القديم (COACH_EMAIL) عشان مانخسرش بيانات موجودة
      mine = snapshot.docs.filter(function (clientDoc) {
        const ownerEmail = clientDoc.data().coachEmail || COACH_EMAIL.toLowerCase();
        return ownerEmail === currentProviderEmail;
      });
    } else {
      // المتخصصين (غير المدرب) بيشوفوا بس العملاء اللي اختاروهم في فريقهم
      mine = snapshot.docs.filter(function (clientDoc) {
        const team = clientDoc.data().team || {};
        return Object.keys(team).some(function (key) { return team[key] === currentProviderEmail; });
      });
    }

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

async function showClientRow(email, name, sport, injuryCount) {
  const item = document.createElement('li');

  const nameLine = document.createElement('div');
  nameLine.className = 'client-name';
  nameLine.textContent = name;

  if (injuryCount) {
    const flag = document.createElement('div');
    flag.className = 'client-injury-flag';
    const flagIcon = document.createElement('span');
    flagIcon.className = 'inline-icon';
    flagIcon.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 21.5 20h-19L12 3.5z"></path><line x1="12" y1="9.5" x2="12" y2="14"></line><circle cx="12" cy="17" r="0.7" fill="currentColor" stroke="none"></circle></svg>';
    flag.appendChild(flagIcon);
    const flagText = document.createElement('span');
    flagText.textContent = injuryCount > 1
      ? fill('client_injury_flag_many', { n: injuryCount })
      : t('client_injury_flag');
    flag.appendChild(flagText);
    item.appendChild(flag);
  }

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
    tag.className = 'sport-tag sport-tag-icon';
    setSportTag(tag, sport);
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
      ['anatomy_goal', exercise.goal],
      ['anatomy_primary', exercise.primaryMuscles],
      ['anatomy_secondary', exercise.secondaryMuscles],
      ['anatomy_origin', exercise.origin],
      ['anatomy_insertion', exercise.insertion],
      ['anatomy_injury_benefit', exercise.injuryBenefit]
    ];
    rows.forEach(function (row) {
      const key = row[0], value = row[1];
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
  if (exercise.imageUrl) return exercise.imageUrl;
  if (exercise.image) return IMAGE_BASE + exercise.image;
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
  return (exercise && exercise.name) || '';
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

  if (exercise.rest)  items.push({ icon: EX_TAG_ICON_REST,  text: exercise.rest, primary: false });
  if (exercise.load)  items.push({ icon: EX_TAG_ICON_LOAD,  text: exercise.load, primary: false });
  if (exercise.rpe)   items.push({ icon: null,              text: 'RPE ' + exercise.rpe, primary: false });
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
function applyCoachScopeTabs() {
  tabTraining.classList.remove('hidden');
  tabRehab.classList.remove('hidden');
  tabNutrition.classList.remove('hidden');
  tabConsult.classList.remove('hidden');
  return 'training';
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
  coachMessage.textContent = t('loading');
  showScreen(coachScreen);
  const defaultMode = applyCoachScopeTabs();
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

    coachDay = todayIndex;
    nutDay = todayIndex;
    fillSectionPicker();
    fillBodyParts();
    fillTemplatePicker();
    fillSportSelect(coachSport, true);
    fillCoachMuscleSelect();
    coachSport.value = currentClientSport;
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
  if (docTooBig(coachRehab, coachMessage)) return;
  coachMessage.textContent = t('saving');
  try {
    await setDoc(doc(db, 'rehab', currentClient), coachRehab);
    setStatusMessage(coachMessage, t('saved_rehab'), 'success');
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

  SECTION_KEYS.forEach(function (key) {
    const list = tpl.sections[key] || [];
    list.forEach(function (source) {
      const match = matchLibraryExercise(source.en);
      const libPhoto = match ? libraryImageFor('exercise_' + match.id) : '';
      coachWeek[coachDay].sections[key].push(makeExercise({
        libId: match ? match.id : '',
        name: match ? exerciseLibName(match) : source.en,
        sets: source.sets,
        reps: source.reps,
        imageUrl: libPhoto,
        image: libPhoto ? '' : ((match && match.images && match.images.length) ? match.images[0] : findLibraryImage(source.en)),
        primaryMuscles: match ? musclesListText(match.primaryMuscles) : '',
        secondaryMuscles: match ? musclesListText(match.secondaryMuscles) : '',
        howTo: (match && match.howTo) ? (match.howTo[lang] || match.howTo.ar || match.howTo.en || '') : ''
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

document.getElementById('open-library-btn').addEventListener('click', openLibrary);
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
  EXERCISE_LIBRARY.forEach(function (exercise) {
    const enName = (exercise.name && exercise.name.en) ? normaliseName(exercise.name.en) : '';
    if (enName) localByName[enName] = exercise;
  });

  const merged = EXERCISE_LIBRARY.slice();

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

  libraryData = merged;

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
}

async function ensureRemoteLibrary() {
  if (remoteLibraryState !== 'idle') return;
  remoteLibraryState = 'loading';
  try {
    const response = await fetch(LIBRARY_URL);
    const remote = await response.json();
    mergeRemoteLibrary(remote);
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
  // وبعدين نضم المكتبة الكبيرة بصورها فوقها
  ensureRemoteLibrary();
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

  const all = [''].concat(categories.slice().sort());

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
    if (term && exerciseLibName(exercise).toLowerCase().indexOf(term) === -1) return false;
    return true;
  });

  libGrid.innerHTML = '';
  const shown = matches.slice(0, 60);

  shown.forEach(function (exercise) {
    const card = document.createElement('div');
    card.className = 'ex-card';

    const libImageKey = 'exercise_' + exercise.id;
    const libPhoto = libraryImageFor(libImageKey);
    const shot = document.createElement('div');
    shot.className = 'ex-shot';

    if (libPhoto) {
      const image = document.createElement('img');
      image.src = libPhoto;
      image.alt = '';
      image.loading = 'lazy';
      shot.appendChild(image);

      const zoom = document.createElement('button');
      zoom.type = 'button';
      zoom.className = 'zoom-badge';
      zoom.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"></circle><line x1="15.5" y1="15.5" x2="20" y2="20"></line></svg>';
      zoom.addEventListener('click', function (event) {
        event.stopPropagation();
        lightboxTitle.textContent = exerciseLibName(exercise);
        lightboxImages.innerHTML = '';
        addShot(libPhoto, '');
        lightbox.classList.remove('hidden');
      });
      shot.appendChild(zoom);

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
    } else if (exercise.images && exercise.images.length) {
      const image = document.createElement('img');
      image.src = IMAGE_BASE + exercise.images[0];
      image.alt = '';
      image.loading = 'lazy';
      shot.appendChild(image);

      const zoom = document.createElement('button');
      zoom.type = 'button';
      zoom.className = 'zoom-badge';
      zoom.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"></circle><line x1="15.5" y1="15.5" x2="20" y2="20"></line></svg>';
      zoom.addEventListener('click', function (event) {
        event.stopPropagation();
        openPreview({ name: exerciseLibName(exercise), image: exercise.images[0], imageUrl: '' });
      });
      shot.appendChild(zoom);
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
    meta.textContent = musclesListText(exercise.primaryMuscles) + ' · ' + equipName(exercise.equipment);

    body.appendChild(name);
    body.appendChild(meta);

    if (exercise.howTo) {
      const howTo = document.createElement('div');
      howTo.className = 'ex-meta';
      howTo.textContent = (typeof exercise.howTo === 'object') ? (exercise.howTo[lang] || exercise.howTo.ar || exercise.howTo.en || '') : exercise.howTo;
      body.appendChild(howTo);
    }

    card.appendChild(body);

    card.addEventListener('click', function () {
      const built = makeExercise({
        libId: exercise.id,
        name: exerciseLibName(exercise),
        primaryMuscles: musclesListText(exercise.primaryMuscles),
        secondaryMuscles: musclesListText(exercise.secondaryMuscles),
        howTo: (exercise.howTo && typeof exercise.howTo === 'object') ? (exercise.howTo[lang] || exercise.howTo.ar || exercise.howTo.en || '') : (exercise.howTo || ''),
        image: (!libPhoto && exercise.images && exercise.images.length) ? exercise.images[0] : '',
        imageUrl: libPhoto || ''
      });
      if (libraryContext === 'class') {
        addExerciseToCurrentClass(built);
        return;
      }
      showScreen(coachScreen);
      addToTarget(built);
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
let clientEmail = '';
let clientSport = '';
let clientName = '';
let doneToday = [];
let actualSetsToday = {};
let rehabDoneToday = [];
let rehabActualSetsToday = {};
let progressHistory = [];
let clientMode = 'training';

const clientTraining = document.getElementById('client-training');
const clientRehabPanel = document.getElementById('client-rehab');
const ctabTraining = document.getElementById('ctab-training');
const ctabRehab = document.getElementById('ctab-rehab');
const clientTabs = document.getElementById('client-tabs');

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
    await renderClientConsultRequests();
    setStatusMessage(clientConsultMessage, t('client_consult_sent_msg'), 'success');
  } catch (error) {
    clientConsultMessage.textContent = t('problem') + error.message;
  }
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
    clientName = (meDoc.exists() && meDoc.data().name) ? meDoc.data().name : '';
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

    actualSetsToday = (progressDoc.exists() && progressDoc.data().date === today && progressDoc.data().actualSets)
      ? progressDoc.data().actualSets : {};

    rehabDoneToday = (progressDoc.exists() && progressDoc.data().rehabDate === today && Array.isArray(progressDoc.data().rehabDone))
      ? progressDoc.data().rehabDone : [];
    rehabActualSetsToday = (progressDoc.exists() && progressDoc.data().rehabDate === today && progressDoc.data().rehabActualSets)
      ? progressDoc.data().rehabActualSets : {};

    const hasRehab = rehabHasContent(clientRehab);
    const hasNutrition = nutritionHasContent(clientNutrition);
    ctabRehab.classList.toggle('hidden', !hasRehab);
    ctabNutrition.classList.toggle('hidden', !hasNutrition);
    // شريط التابات نفسه كان بيتخفي بالكامل لو مفيش تأهيل أو تغذية —
    // ده كان بيمنع الوصول لتابات "نشاطي" و"الكلاس" و"المتجر" كمان
    // (مالهاش علاقة بالتأهيل/التغذية) لو العميل لسه ملوش برنامج منهم.
    // التاب الوحيد اللي فعلاً لازم يتخفي هو تاب التمرين الأساسي نفسه
    // لو مفيش أي محتوى خالص (تمرين ولا تأهيل ولا تغذية)
    clientTabs.classList.remove('hidden');
    setClientMode('training');

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

function dayVolume(day) {
  let total = 0;
  SECTION_KEYS.forEach(function (key) {
    (day.sections[key] || []).forEach(function (exercise) {
      total += exerciseVolume(exercise);
    });
  });
  return total;
}

function actualDayVolume(day) {
  let total = 0;
  SECTION_KEYS.forEach(function (key) {
    (day.sections[key] || []).forEach(function (exercise, index) {
      total += actualVolume(exercise, actualSetsToday[key + ':' + index]);
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
    const actualTotal = actualDayVolume(clientWeek[clientDay]);
    if (actualTotal > 0) {
      volumeText += (volumeText ? ' — ' : '') + t('actual_volume_label') + ': ' + Math.round(actualTotal).toLocaleString() + ' ' + (lang === 'ar' ? 'كجم' : 'kg');
    }
  }
  dayVolumeEl.textContent = volumeText;

  const totalWeek = weekVolume(clientWeek);
  weekVolumeEl.textContent = totalWeek > 0
    ? (t('week_volume') + ': ' + Math.round(totalWeek).toLocaleString() + ' ' + (lang === 'ar' ? 'كجم' : 'kg'))
    : '';
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
    history: progressHistory,
    actualSets: actualSetsToday
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
    rehabActualSets: rehabActualSetsToday
  }, { merge: true });
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
      setIconLabel(title, sectionIconSvg(key), sectionName(key));
      head.appendChild(title);

      const count = document.createElement('div');
      count.className = 'section-count';
      count.textContent = fill('count_ex', { n: list.length });
      head.appendChild(count);

      block.appendChild(head);

      const ul = document.createElement('ul');
      list.forEach(function (exercise, index) {
        const exKey = key + ':' + index;
        const item = document.createElement('li');
        item.dataset.key = exKey;
        item.appendChild(exerciseRow(exercise));

        const details = document.createElement('span');
        details.textContent = setsSummaryText(exercise);
        item.appendChild(details);

        if (isToday && doneToday.indexOf(exKey) !== -1) {
          item.classList.add('done');
        }

        if (isToday) {
          item.addEventListener('click', function () {
            item.classList.toggle('done');
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
      const isCurrentPhase = index === clientRehab.currentPhase;
      const ul = document.createElement('ul');
      phase.exercises.forEach(function (exercise, exIndex) {
        const rehabExKey = 'p' + index + ':' + exIndex;
        const item = document.createElement('li');
        item.appendChild(exerciseRow(exercise));

        const details = document.createElement('span');
        details.textContent = setsSummaryText(exercise);
        item.appendChild(details);

        if (isCurrentPhase && rehabDoneToday.indexOf(rehabExKey) !== -1) {
          item.classList.add('done');
        }

        if (isCurrentPhase) {
          item.addEventListener('click', function () {
            item.classList.toggle('done');
            const pos = rehabDoneToday.indexOf(rehabExKey);
            if (item.classList.contains('done')) {
              if (pos === -1) rehabDoneToday.push(rehabExKey);
            } else if (pos !== -1) {
              rehabDoneToday.splice(pos, 1);
            }
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
function foodDisplayName(item) {
  if (item && item.foodId) {
    const found = allFoods().filter(function (f) { return f.id === item.foodId; })[0];
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
    setStatusMessage(coachMessage, t('saved_nutrition'), 'success');
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
      const addPhotoBtn = document.createElement('button');
      addPhotoBtn.type = 'button';
      addPhotoBtn.className = 'food-photo-btn';
      addPhotoBtn.title = t('add_photo_short');
      addPhotoBtn.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="15" rx="2"></rect><circle cx="8.5" cy="10" r="1.7"></circle><path d="M4 17l5-5 3.5 3.5L16 12l4 5"></path></svg>';
      addPhotoBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        pickLibraryImage(foodImageKey);
      });
      li.appendChild(addPhotoBtn);
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
    setStatusMessage(foodMessage, t('food_saved'), 'success');
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
    loadWelcomeTeamPreview();
    loadWelcomeStories();
    loadWelcomeTrustStat();
    fillProviderApplySpecialtySelect();
  }
  if (!calculatorsScreen.classList.contains('hidden')) fillCalcSelects();
  if (!progressScreen.classList.contains('hidden')) fillCheckinSelects();
  if (!coachScreen.classList.contains('hidden')) {
    if (coachMode === 'rehab') showRehab();
    else if (coachMode === 'nutrition') showNutrition();
    else if (coachMode === 'injuries') loadCoachInjuryReports();
    else showCoachDay();
  }
  if (!clientScreen.classList.contains('hidden')) {
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
  if (!clientsScreen.classList.contains('hidden')) loadClients();
  if (!providersScreen.classList.contains('hidden')) { fillSpecialtySelect(); loadProviders(); }
  if (!providerHomeScreen.classList.contains('hidden') && currentProviderData) showProviderHome(currentProviderData);
  if (!onboardingScreen.classList.contains('hidden')) { fillGenderSelect(); fillDobSelects(); fillActivitySelect(); fillSportSelect(obSport, true); fillGoalSelect(); renderGenderRows(); renderActivityTiles(); renderSportGroupDial(); renderSportRows(); renderGoalTiles(); renderFocusChips(); fillWorkNatureSelect(); renderWorkNatureRows(); fillTrainingDaysSelect(); renderTrainingDaysRows(); fillMealsPerDaySelect(); renderMealsPerDayRows(); }
  if (!teamScreen.classList.contains('hidden')) loadTeamPicker(selectedTeam);
  if (!injuryScreen.classList.contains('hidden')) { refreshHotspots(); loadInjuryHistory(); }
  if (!teamViewScreen.classList.contains('hidden')) loadTeamView();
  if (!clientProfileScreen.classList.contains('hidden')) fillClientProfileSelects();
  if (!coachScreen.classList.contains('hidden')) fillCoachMuscleSelect();
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
  providerHomeSpecialty.textContent = specs.length ? specialtyListName(specs) : '';

  // صاحب المنصة (الحساب القديم) تخصصه "مدرب" ثابت مايتغيرش من هنا
  if (phSpecialtyBox) phSpecialtyBox.classList.toggle('hidden', isLegacyCoachAccount());
  fillSpecialtyCheckboxes(phSpecialtyMulti, specs);

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
  phOpenMedlibBtn.classList.toggle('hidden', !specialtiesHaveFlag(specs, 'medical'));
  phBackBtn.classList.remove('hidden');
  loadProviderOwnReviews();
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

async function loadProviders() {
  providersList.innerHTML = '';
  providersMessage.textContent = t('loading');
  try {
    const snapshot = await getDocs(collection(db, 'providers'));
    providers = snapshot.docs.map(function (item) {
      return Object.assign({ id: item.id }, item.data());
    });

    // بنحسب هنا عدد المتدربين الفعلي لكل متخصص (من مجموعة العملاء
    // كاملة) ونخزنه في مستند المتخصص نفسه كـ clientsCount — عشان شاشة
    // "فريقك" عند العميل تقدر تعرض الرقم، مع إن قواعد الأمان مش بتسمح
    // لحساب عميل عادي إنه يقرا مجموعة العملاء كلها بنفسه
    try {
      const clientsSnapshot = await getDocs(collection(db, 'clients'));
      const counts = {};
      clientsSnapshot.docs.forEach(function (clientDoc) {
        const data = clientDoc.data();
        const coachEmail = (data.coachEmail || COACH_EMAIL).toLowerCase();
        counts[coachEmail] = (counts[coachEmail] || 0) + 1;
        const team = data.team || {};
        Object.keys(team).forEach(function (key) {
          const specialistEmail = team[key];
          if (specialistEmail) counts[specialistEmail] = (counts[specialistEmail] || 0) + 1;
        });
      });
      await Promise.all(providers.map(function (provider) {
        const n = counts[provider.email] || 0;
        if (provider.clientsCount === n) return Promise.resolve();
        provider.clientsCount = n;
        return setDoc(doc(db, 'providers', provider.email), { clientsCount: n }, { merge: true }).catch(function () {});
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
      specLine.textContent = specialtyListName(providerSpecs) + (provider.isAdminTeam ? (' · ' + t('admin_team_badge')) : '');

      const emailLine = document.createElement('div');
      emailLine.className = 'client-email';
      emailLine.textContent = provider.email;

      item.appendChild(nameLine);
      item.appendChild(specLine);
      item.appendChild(emailLine);

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

      providersList.appendChild(item);
    });
  } catch (error) {
    providersMessage.textContent = t('problem') + error.message;
  }
}

document.getElementById('open-providers-btn').addEventListener('click', function () {
  showScreen(providersScreen);
  fillSpecialtySelect();
  loadProviders();
});

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
  let newSpecialties;
  if (isLegacyCoachAccount()) {
    newSpecialties = ['coach'];
  } else {
    newSpecialties = readSpecialtyCheckboxes(phSpecialtyMulti);
    if (!newSpecialties.length) {
      providerHomeMessage.textContent = t('need_one_specialty');
      return;
    }
  }
  updated.specialties = newSpecialties;
  updated.specialty = newSpecialties[0];
  updated.isMedical = specialtiesHaveFlag(newSpecialties, 'medical');

  providerHomeMessage.textContent = t('saving');
  try {
    await setDoc(doc(db, 'providers', currentProviderEmail), updated, { merge: true });
    currentProviderData = Object.assign({}, currentProviderData, updated);
    currentProviderSpecialties = newSpecialties;
    currentProviderSpecialty = newSpecialties.indexOf('coach') !== -1 ? 'coach' : (newSpecialties[0] || '');
    applyCoachScopeTabs();
    phOpenMedlibBtn.classList.toggle('hidden', !specialtiesHaveFlag(newSpecialties, 'medical'));
    providerHomeSpecialty.textContent = specialtyListName(newSpecialties);
    setSpecialtyLabel(providerHomeTitle, newSpecialties, updated.name || '');
    setStatusMessage(providerHomeMessage, t('profile_saved'), 'success');
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

const WELCOME_PILLAR_KEYS = ['training', 'rehab', 'nutrition', 'medical'];
const welcomeSamplesTitle = document.getElementById('welcome-samples-title');
const welcomeSamplesGrid = document.getElementById('welcome-samples');
const welcomeProgramTitle = document.getElementById('welcome-program-title');
const wpDayTitle = document.getElementById('wp-day-title');
const wpLine1 = document.getElementById('wp-line-1');
const wpLine2 = document.getElementById('wp-line-2');
const wpLine3 = document.getElementById('wp-line-3');
const wpLine4 = document.getElementById('wp-line-4');
let currentWelcomePillar = 'training';
const welcomePillarDetail = document.getElementById('welcome-pillar-detail');

function renderWelcomePillarDetail(pillarKey) {
  if (!welcomePillarDetail) return;
  currentWelcomePillar = pillarKey;

  document.querySelectorAll('.welcome-pillar-btn').forEach(function (btn) {
    btn.classList.toggle('active', btn.getAttribute('data-pillar') === pillarKey);
  });

  const lines = [1, 2, 3, 4].map(function (n) {
    return t('welcome_pillar_' + pillarKey + '_line_' + n);
  });

  welcomePillarDetail.innerHTML =
    '<h4 class="wp-detail-title">' + t('welcome_pillar_' + pillarKey + '_week_title') + '</h4>' +
    lines.map(function (line) { return '<div class="wp-detail-line">' + line + '</div>'; }).join('') +
    '<div class="wp-detail-stat">' + t('welcome_pillar_' + pillarKey + '_stat') + '</div>' +
    '<div class="wp-detail-team">' + t('welcome_pillar_' + pillarKey + '_team') + '</div>' +
    '<div class="wp-detail-note">' + t('welcome_pillars_note') + '</div>';

  renderWelcomeTour(pillarKey);
}

/*
 * جولة الصفحة الرئيسية: عينات التمارين/الأكل/التخصصات وشكل البرنامج
 * بتتغيّر حسب التخصص المختار — كل المحتوى ده مسحوب من نفس البيانات
 * الحقيقية المستخدمة جوه التطبيق (REHAB_TEMPLATES / FOOD_LIBRARY /
 * SPECIALTIES)، مش نصوص تسويقية مُلفّقة.
 */
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
    const picks = ['physio', 'ortho', 'sports_medicine', 'psychologist'];
    return picks.map(function (key) {
      return {
        icon: specialtyIconSvg(key),
        name: specialtyName(key, lang),
        detail: t('welcome_medical_case_detail')
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

function renderWelcomeSamples(pillarKey) {
  if (!welcomeSamplesGrid) return;
  welcomeSamplesTitle.textContent = t('welcome_samples_title_' + pillarKey);

  welcomeSamplesGrid.innerHTML = '';
  welcomeSampleItems(pillarKey).forEach(function (item) {
    const card = document.createElement('div');
    card.className = 'sample-ex-card';

    const icon = document.createElement('span');
    icon.className = 'inline-icon';
    icon.innerHTML = item.icon;
    card.appendChild(icon);

    const name = document.createElement('div');
    name.className = 'sample-ex-name';
    name.textContent = item.name;
    card.appendChild(name);

    const detail = document.createElement('div');
    detail.className = 'sample-ex-detail';
    detail.textContent = item.detail;
    card.appendChild(detail);

    welcomeSamplesGrid.appendChild(card);
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

function renderWelcomeProgramPreview(pillarKey) {
  if (!wpDayTitle) return;
  welcomeProgramTitle.textContent = t('welcome_program_title_' + pillarKey);

  const preview = welcomeProgramPreview(pillarKey);
  wpDayTitle.textContent = preview.title;
  [wpLine1, wpLine2, wpLine3, wpLine4].forEach(function (el, index) {
    el.textContent = preview.lines[index] || '';
    el.classList.toggle('hidden', !preview.lines[index]);
  });
}

function renderWelcomeTour(pillarKey) {
  renderWelcomeSamples(pillarKey);
  renderWelcomeProgramPreview(pillarKey);
}

/* ---------- شريط الثقة: عدد العملاء الحقيقي (لو موجود) ---------- */

async function loadWelcomeTrustStat() {
  try {
    const statsDoc = await getDoc(doc(db, 'publicStats', 'summary'));
    if (statsDoc.exists()) {
      const data = statsDoc.data();
      const count = Number(data.clientsCount) || 0;
      if (count > 0) {
        trustStatText.textContent = fill('trust_stat_clients', { n: count });
        trustStatItem.classList.remove('hidden');
        return;
      }
    }
  } catch (error) {
    // من غير Firestore، مفيش رقم نعرضه — نسيب البند مخفي وخلاص
  }
  trustStatItem.classList.add('hidden');
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

  welcomeTeamSection.classList.remove('hidden');
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
    specialty.textContent = specialtyListName(specs);
    card.appendChild(specialty);

    welcomeTeamGrid.appendChild(card);
  });
}

/* ---------- أسئلة شائعة ---------- */

const FAQ_KEYS = ['1', '2', '3', '4', '5'];

function renderWelcomeFaq() {
  welcomeFaqList.innerHTML = '';
  FAQ_KEYS.forEach(function (key) {
    const item = document.createElement('div');
    item.className = 'welcome-faq-item';

    const question = document.createElement('button');
    question.type = 'button';
    question.className = 'welcome-faq-question';

    const qText = document.createElement('span');
    qText.textContent = t('faq_q' + key);
    question.appendChild(qText);

    const arrow = document.createElement('span');
    arrow.className = 'faq-arrow';
    arrow.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>';
    question.appendChild(arrow);

    item.appendChild(question);

    const answer = document.createElement('div');
    answer.className = 'welcome-faq-answer hidden';
    answer.textContent = t('faq_a' + key);
    item.appendChild(answer);

    question.addEventListener('click', function () {
      const willOpen = answer.classList.contains('hidden');
      item.classList.toggle('open', willOpen);
      answer.classList.toggle('hidden', !willOpen);
    });

    welcomeFaqList.appendChild(item);
  });
}

function loadWelcomeExtras() {
  renderWelcomeFaq();
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

document.getElementById('lead-submit-btn').addEventListener('click', async function () {
  const name = leadNameInput.value.trim();
  const contact = leadContactInput.value.trim();
  if (!name || !contact) {
    leadMessageStatus.textContent = t('need_lead_fields');
    return;
  }

  leadMessageStatus.textContent = t('saving');
  try {
    const id = 'lead_' + Date.now();
    await setDoc(doc(db, 'leads', id), {
      name: name,
      contact: contact,
      message: leadMessageInput.value.trim(),
      contacted: false,
      createdAt: new Date().toISOString()
    });
    setStatusMessage(leadMessageStatus, t('lead_submitted_msg'), 'success');
    leadNameInput.value = '';
    leadContactInput.value = '';
    leadMessageInput.value = '';
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

document.querySelectorAll('.welcome-pillar-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    renderWelcomePillarDetail(btn.getAttribute('data-pillar'));
  });
});

renderWelcomePillarDetail(currentWelcomePillar);
loadWelcomeExtras();

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

    const icon = document.createElement('span');
    icon.className = 'choice-icon';
    icon.innerHTML = iconMap[key];
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

const TRAINING_DAYS_KEYS = ['2', '3', '4', '5', '6'];
const MEALS_PER_DAY_KEYS = ['3', '4', '5', '6'];

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

function trainingDaysName(key) {
  return fill('training_days_count', { n: key });
}

function mealsPerDayName(key) {
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
  renderChoiceDial('goal-ring', 'goal-center', GOAL_KEYS, GOAL_ICONS, goalName, obGoal.value, t('pick_goal'), function (key) {
    obGoal.value = key;
    renderGoalTiles();
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
  renderChoiceRows(obSportRows, sportsInGroup, iconMap, sportName, obSport.value, function (key) {
    obSport.value = key;
    renderSportRows();
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

function fillPhoneCodeSelect() {
  const keep = obPhoneCode.value;
  obPhoneCode.innerHTML = '';
  PHONE_COUNTRY_CODES.forEach(function (item) {
    const option = document.createElement('option');
    option.value = item.code;
    option.textContent = item.code + ' ' + item[lang];
    obPhoneCode.appendChild(option);
  });
  obPhoneCode.value = keep || '+20';
}

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

function prefillOnboarding(data) {
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
  obDobDay.value = (data && data.dob && data.dob.day) || '';
  obDobMonth.value = (data && data.dob && data.dob.month) || '';
  obDobYear.value = (data && data.dob && data.dob.year) || '';
  obWeight.value = (data && data.weight) || '';
  obHeight.value = (data && data.height) || '';
  obActivity.value = (data && data.activity) || '';
  obSport.value = (data && data.sport) || '';
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
    return;
  }

  onboardingMessage.textContent = t('saving');
  try {
    const clientPayload = {
      name: name,
      phone: (obPhone.value.trim() ? (obPhoneCode.value + ' ' + obPhone.value.trim()) : ''),
      gender: gender,
      dob: { day: dobDay, month: dobMonth, year: dobYear },
      age: age,
      weight: weight,
      height: height,
      activity: activity,
      sport: obSport.value || '',
      goal: goal,
      focus: obFocus.slice(),
      workNature: obWorkNature.value || '',
      trainingDaysPref: obTrainingDays.value || '',
      sleepTime: obSleepTime.value || '',
      wakeTime: obWakeTime.value || '',
      mealsPerDay: obMealsPerDay.value || '',
      firstMealTime: obFirstMealTime.value || '',
      lastMealTime: obLastMealTime.value || '',
      painFlag: obPainFlag.checked,
      painNote: obPainFlag.checked ? obPainNote.value.trim() : '',
      photo: obPickedImage
    };
    // تجربة مجانية 30 يوم — بس لحساب اتعمل لوحده من صفحة التعريف
    if (onboardingIsNewSignup) {
      clientPayload.trialStartedAt = new Date().toISOString().slice(0, 10);
    }
    await setDoc(doc(db, 'clients', onboardingEmail), clientPayload, { merge: true });
    onboardingMessage.textContent = '';
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
  loadAdminPanel();
});

document.getElementById('admin-panel-back-btn').addEventListener('click', function () {
  showScreen(clientsScreen);
  loadClients();
});

async function loadAdminPanel() {
  await fetchPaymentSettings();
  const settingsVodafone = document.getElementById('settings-vodafone');
  const settingsInstapay = document.getElementById('settings-instapay');
  const settingsBank = document.getElementById('settings-bank');
  settingsVodafone.value = (paymentSettings && paymentSettings.vodafoneNumber) || '';
  settingsInstapay.value = (paymentSettings && paymentSettings.instapayHandle) || '';
  settingsBank.value = (paymentSettings && paymentSettings.bankDetails) || '';
  settingsMessage.textContent = '';

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
  return item.title || item.titleEn || '';
}

function medItemBody(item) {
  if (!item) return '';
  if (lang === 'en' && item.bodyEn) return item.bodyEn;
  return item.body || item.bodyEn || '';
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
  setDoc(doc(db, 'providers', email), { lastActiveAt: new Date().toISOString() }, { merge: true }).catch(function () {
    // مش مشكلة لو فشل التحديث ده — مجرد إشارة نشاط، مش بيانات أساسية
  });
}

let teamEditEmail = '';
let teamEditMode = 'onboarding';
let teamGroupedProviders = [];

async function loadTeamPicker(prefillTeam) {
  teamList.innerHTML = '';
  teamMessage.textContent = t('loading');
  selectedTeam = Object.assign({}, prefillTeam || {});

  try {
    const snapshot = await getDocs(collection(db, 'providers'));
    teamProviders = snapshot.docs.map(function (item) {
      return Object.assign({ id: item.id }, item.data());
    });

    await fetchAllProviderReviews();

    if (!teamProviders.length) {
      teamMessage.textContent = t('no_providers_yet');
      return;
    }
    teamMessage.textContent = '';

    // تجميع حسب التخصص — المتخصص اللي عنده أكتر من تخصص بيظهر في كل قسم يخصه
    // (مثلاً مدرب + أخصائي تغذية بيظهر تحت "مدربين" وتحت "أخصائيي تغذية")
    const bySpecialty = {};
    teamProviders.forEach(function (provider) {
      providerSpecialties(provider).forEach(function (key) {
        if (!bySpecialty[key]) bySpecialty[key] = [];
        bySpecialty[key].push(provider);
      });
    });
    Object.keys(bySpecialty).forEach(function (specialty) {
      bySpecialty[specialty].sort(function (a, b) { return providerScore(b) - providerScore(a); });
    });

    teamGroupedProviders = [];

    Object.keys(SPECIALTIES).forEach(function (specialty) {
      const list = bySpecialty[specialty];
      if (!list || !list.length) return;

      const section = document.createElement('div');
      section.className = 'team-specialty-section';
      const heading = document.createElement('h3');
      heading.className = 'welcome-section-title';
      heading.textContent = specialtyName(specialty, lang);
      section.appendChild(heading);
      teamList.appendChild(section);

      list.forEach(function (provider, index) {
        const card = document.createElement('div');
        card.className = 'ex-card';

        if (provider.photo) {
          const image = document.createElement('img');
          image.src = provider.photo;
          image.alt = '';
          card.appendChild(image);
        }

        const body = document.createElement('div');
        body.className = 'ex-body';

        const badgesRow = document.createElement('div');
        badgesRow.className = 'team-badges';
        if (index === 0) {
          const recBadge = document.createElement('span');
          recBadge.className = 'team-badge recommended';
          recBadge.textContent = t('recommended_badge');
          badgesRow.appendChild(recBadge);
        }
        if (isProviderRecentlyActive(provider)) {
          const activeBadge = document.createElement('span');
          activeBadge.className = 'team-badge active-now';
          activeBadge.textContent = t('active_now_badge');
          badgesRow.appendChild(activeBadge);
        }
        if (badgesRow.childNodes.length) body.appendChild(badgesRow);

        const name = document.createElement('div');
        name.className = 'ex-name';
        setSpecialtyLabel(name, specialty, provider.name);
        body.appendChild(name);

        const meta = document.createElement('div');
        meta.className = 'ex-meta';
        meta.textContent = provider.bio || '';
        body.appendChild(meta);

        const stats = ratingStatsFor(provider.email);
        const stars = document.createElement('div');
        stars.className = 'stars-display';
        stars.innerHTML = starsDisplayMarkup(stats.avg, stats.count);
        body.appendChild(stars);

        card.appendChild(body);

        card.addEventListener('click', function () {
          const already = selectedTeam[specialty] === provider.email;
          if (already) {
            delete selectedTeam[specialty];
          } else {
            selectedTeam[specialty] = provider.email;
          }
          renderTeamSelection();
        });

        teamGroupedProviders.push({ provider: provider, specialty: specialty });
        section.appendChild(card);
      });
    });

    renderTeamSelection();
  } catch (error) {
    teamMessage.textContent = t('problem') + error.message;
  }
}

function renderTeamSelection() {
  const cards = teamList.querySelectorAll('.ex-card');
  teamGroupedProviders.forEach(function (entry, index) {
    const card = cards[index];
    if (!card) return;
    card.classList.toggle('selected', selectedTeam[entry.specialty] === entry.provider.email);
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
    name.textContent = lead.name + ' — ' + lead.contact;
    card.appendChild(name);

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
      } catch (error) {
        rowMessage.textContent = t('problem') + error.message;
      }
    });

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