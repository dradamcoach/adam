/*
 * ADAM — التخصصات ومقدّمي الخدمة
 *
 * كل تخصص بيحدد:
 *   scopes  : إيه اللي التخصص ده مسموح له يعدّله في ملف العميل
 *   books   : هل بياخد حجوزات جلسات (زي المساج والعلاج الطبيعي)
 *   medical : تخصص طبي — محتواه لازم يتراجع من مختص قبل النشر
 */

export const SPECIALTIES = {
  coach: {
    ar: 'مدرب', en: 'Coach',
    icon: '🏋️',
    scopes: ['training'],
    books: false, medical: false
  },
  nutritionist: {
    ar: 'أخصائي تغذية', en: 'Nutrition specialist',
    icon: '🍎',
    scopes: ['nutrition'],
    books: false, medical: false
  },
  doctor: {
    ar: 'طبيب', en: 'Doctor',
    icon: '🩺',
    scopes: ['consult'],
    books: true, medical: true, clears: true
  },
  rehab: {
    ar: 'أخصائي تأهيل', en: 'Rehabilitation specialist',
    icon: '🩹',
    /* بيشوف العلاج الطبيعي بس (physio_view) — مابيعدّلش فيه */
    scopes: ['rehab', 'training', 'physio_view'],
    books: true, medical: true
  },
  physio: {
    ar: 'أخصائي علاج طبيعي', en: 'Physiotherapist',
    icon: '🖐️',
    /* العلاج الطبيعي تخصص لوحده (تقييم، أجهزة، جلسات، تمارين للبيت) —
       لو الأخصائي بيعمل تأهيل كمان بيضيف تخصص «أخصائي تأهيل» جنبه */
    scopes: ['physio'],
    books: true, medical: true
  },
  ortho: {
    ar: 'طبيب عظام', en: 'Orthopaedic doctor',
    icon: '🦴',
    scopes: ['rehab', 'consult', 'physio'],
    books: true, medical: true, clears: true
  },
  radiology: {
    ar: 'طبيب أشعة', en: 'Radiologist',
    icon: '🩻',
    scopes: ['consult'],
    books: true, medical: true
  },
  sports_medicine: {
    ar: 'طبيب طب رياضي', en: 'Sports medicine doctor',
    icon: '🫀',
    scopes: ['rehab', 'consult', 'physio'],
    books: true, medical: true, clears: true
  },
  pharmacist: {
    ar: 'صيدلي', en: 'Pharmacist',
    icon: '💊',
    scopes: ['consult'],
    books: false, medical: true
  },
  massage: {
    ar: 'أخصائي مساج رياضي', en: 'Sports massage therapist',
    icon: '💆',
    scopes: [],
    books: true, medical: false
  },
  psychologist: {
    ar: 'أخصائي نفسي رياضي', en: 'Sports psychologist',
    icon: '🧠',
    scopes: ['consult'],
    books: true, medical: true
  }
};

/* الخدمات اللي بتتحجز بالجلسة */
export const SESSION_TYPES = {
  massage_sports:   { ar: 'مساج رياضي',            en: 'Sports massage',        minutes: 60 },
  massage_recovery: { ar: 'مساج استشفاء',          en: 'Recovery massage',      minutes: 45 },
  physio_session:   { ar: 'جلسة علاج طبيعي',       en: 'Physiotherapy session', minutes: 45 },
  rehab_session:    { ar: 'جلسة تأهيل',            en: 'Rehab session',         minutes: 60 },
  assessment:       { ar: 'جلسة تقييم',            en: 'Assessment session',    minutes: 30 },
  consult_visit:    { ar: 'كشف / استشارة',         en: 'Consultation visit',    minutes: 20 }
};

export const BOOKING_STATUS = {
  requested: { ar: 'طلب جديد',  en: 'Requested' },
  confirmed: { ar: 'مؤكد',      en: 'Confirmed' },
  done:      { ar: 'تمت',       en: 'Completed' },
  cancelled: { ar: 'ملغي',      en: 'Cancelled' }
};

/*
 * تصنيفات المكتبة الطبية — الهيكل جاهز، والمحتوى بيتكتب من المختص.
 * ⚠️ مقصود إنها تبدأ فاضية: المحتوى الطبي والدوائي لازم يتكتب
 * ويتراجع من طبيب أو صيدلي مرخّص قبل ما يوصل لأي عميل.
 */
export const MED_CATEGORIES = {
  condition:   { ar: 'حالات وإصابات',      en: 'Conditions & injuries' },
  imaging:     { ar: 'أشعة وتشخيص',        en: 'Imaging & diagnostics' },
  medication:  { ar: 'أدوية',              en: 'Medications' },
  supplement:  { ar: 'مكملات',             en: 'Supplements' },
  protocol:    { ar: 'بروتوكولات علاجية',  en: 'Treatment protocols' },
  redflag:     { ar: 'علامات خطر',         en: 'Red flags' },
  education:   { ar: 'تثقيف للعميل',       en: 'Client education' }
};

export const MED_REVIEW = {
  draft:    { ar: 'مسودة',           en: 'Draft' },
  review:   { ar: 'تحت المراجعة',    en: 'Under review' },
  approved: { ar: 'معتمد',           en: 'Approved' }
};

/*
 * قائمة علامات الخطر دي هي الاستثناء الوحيد اللي جاي جاهز، لأنها
 * مش تشخيص ولا علاج — هي إشارات تقول "وقّف ووجّه لطبيب"، ووجودها
 * بيقلل الضرر مش بيزوّده. راجعها وعدّلها زي أي محتوى تاني.
 */
export const DEFAULT_RED_FLAGS = [
  { ar: 'ألم شديد ومفاجئ بعد إصابة مباشرة، مع عجز عن تحميل الوزن',
    en: 'Severe sudden pain after direct trauma with inability to bear weight' },
  { ar: 'تورم سريع أو تغيّر واضح في شكل المفصل أو العظمة',
    en: 'Rapid swelling or visible deformity of a joint or bone' },
  { ar: 'تنميل أو ضعف أو فقدان إحساس في طرف',
    en: 'Numbness, weakness, or loss of sensation in a limb' },
  { ar: 'ألم صدر أو ضيق تنفس أثناء المجهود',
    en: 'Chest pain or shortness of breath during exertion' },
  { ar: 'دوخة أو إغماء أثناء التمرين',
    en: 'Dizziness or fainting during exercise' },
  { ar: 'ألم ليلي مستمر ميتحسنش بالراحة، أو فقدان وزن غير مبرر',
    en: 'Persistent night pain unrelieved by rest, or unexplained weight loss' },
  { ar: 'سخونية مع ألم واحمرار في مفصل',
    en: 'Fever with a hot, red, painful joint' },
  { ar: 'ألم أسفل الظهر مع صعوبة في التحكم في التبول أو التبرز',
    en: 'Low back pain with bladder or bowel control problems' }
];

export function specialtyName(key, lang) {
  return (SPECIALTIES[key] && SPECIALTIES[key][lang]) || key;
}

export function specialtyIcon(key) {
  return (SPECIALTIES[key] && SPECIALTIES[key].icon) || '•';
}

/*
 * أيقونات SVG بديلة للإيموجي — نفس ستايل الخط البسيط المستخدم في باقي
 * الموقع (ui-icon). بتتحط جوه عنصر (مش جوه <option> لأنه مش بيعرض HTML).
 */
const SPECIALTY_ICON_PATHS = {
  doctor: '<path d="M8 3v5.4a4 4 0 0 0 8 0V3"></path><path d="M6.2 3h2.4M15.4 3h2.4"></path><path d="M12 12.4v2.3a4.3 4.3 0 0 0 8.6 0v-1"></path><circle cx="20.6" cy="9.6" r="2.2"></circle>',
  coach: '<rect x="2" y="9" width="3" height="6" rx="1"></rect><rect x="19" y="9" width="3" height="6" rx="1"></rect><line x1="5" y1="12" x2="19" y2="12"></line><rect x="6" y="7" width="2.5" height="10" rx="1"></rect><rect x="15.5" y="7" width="2.5" height="10" rx="1"></rect>',
  nutritionist: '<path d="M12 8.5c-2.8 0-5 2.3-5 5.8 0 3 2.1 5.7 4 5.7.8 0 1.2-.4 1.9-.4.7 0 1.1.4 1.9.4 1.7 0 3.7-2.4 3.9-5.1.2-2.7-1.5-4.6-3.4-5"></path><path d="M12 8.5V6.3c0-.9.7-1.8 2-2"></path>',
  rehab: '<rect x="3" y="9" width="18" height="6" rx="3"></rect><line x1="10" y1="9" x2="10" y2="15"></line><line x1="14" y1="9" x2="14" y2="15"></line>',
  physio: '<path d="M9 12V5.5a1.3 1.3 0 0 1 2.6 0V11"></path><path d="M11.6 11V4.8a1.3 1.3 0 0 1 2.6 0V11"></path><path d="M14.2 11V6a1.3 1.3 0 0 1 2.6 0v7.5"></path><path d="M16.8 12.5V8.3a1.3 1.3 0 0 1 2.6 0V15c0 3.9-2.4 6.5-6 6.5-2.5 0-4-1-5.4-3l-2.7-4.3c-.5-.8-.2-1.7.5-2.1.7-.4 1.6-.2 2.1.5L9 15"></path>',
  ortho: '<circle cx="6" cy="6" r="2.4"></circle><circle cx="18" cy="18" r="2.4"></circle><line x1="7.7" y1="7.7" x2="16.3" y2="16.3" stroke-width="3.5"></line>',
  radiology: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"></rect><line x1="8" y1="8" x2="16" y2="16"></line><line x1="16" y1="8" x2="8" y2="16"></line>',
  sports_medicine: '<path d="M3 12h3.5l2-6 3 12 2-9 1.5 3H21"></path>',
  pharmacist: '<rect x="3.5" y="9" width="17" height="6" rx="3" transform="rotate(-30 12 12)"></rect><line x1="12" y1="8" x2="12" y2="16" transform="rotate(-30 12 12)"></line>',
  massage: '<circle cx="12" cy="6" r="2.2"></circle><path d="M6 17c1-3 3-4.5 6-4.5s5 1.5 6 4.5"></path><path d="M7 20c1-1.5 2.5-2 5-2s4 .5 5 2"></path>',
  psychologist: '<path d="M9 4.5c-2 0-3.5 1.5-3.5 3.3 0 .6.2 1.1.4 1.6-1 .5-1.7 1.6-1.7 2.8 0 1 .5 1.9 1.3 2.4-.2.4-.3.9-.3 1.4 0 2 1.7 3.5 3.7 3.3"></path><path d="M9 4.5c0-1.3 1.1-2.5 2.5-2.5S14 3.2 14 4.5"></path><path d="M15 4.5c2 0 3.5 1.5 3.5 3.3 0 .6-.2 1.1-.4 1.6 1 .5 1.7 1.6 1.7 2.8 0 1-.5 1.9-1.3 2.4.2.4.3.9.3 1.4 0 2-1.7 3.5-3.7 3.3"></path><line x1="12" y1="4.5" x2="12" y2="19.5"></line>'
};

const SPECIALTY_ICON_DEFAULT = '<circle cx="12" cy="12" r="8"></circle>';

export function specialtyIconSvg(key) {
  const inner = SPECIALTY_ICON_PATHS[key] || SPECIALTY_ICON_DEFAULT;
  return '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
}

/*
 * مين له حق يوافق على التمرين لحالة مرضية أو حمل؟
 * مش أي متخصص طبي — الصيدلي والأخصائي النفسي مثلاً طبيين بس
 * مش دورهم يقرروا إن التمرين آمن لقلب أو حمل. الحق ده للأطباء
 * (طبيب عام، عظام، طب رياضي) + صاحب المنصة.
 * وهو مش شخص معيّن: أي طبيب من دول يقدر يرد.
 */
export function specialtyClears(key) {
  return !!(SPECIALTIES[key] && SPECIALTIES[key].clears);
}
