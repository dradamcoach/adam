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
  rehab: {
    ar: 'أخصائي تأهيل', en: 'Rehabilitation specialist',
    icon: '🩹',
    scopes: ['rehab', 'training'],
    books: true, medical: true
  },
  physio: {
    ar: 'أخصائي علاج طبيعي', en: 'Physiotherapist',
    icon: '🖐️',
    scopes: ['rehab'],
    books: true, medical: true
  },
  ortho: {
    ar: 'طبيب عظام', en: 'Orthopaedic doctor',
    icon: '🦴',
    scopes: ['rehab', 'consult'],
    books: true, medical: true
  },
  radiology: {
    ar: 'طبيب أشعة', en: 'Radiologist',
    icon: '🩻',
    scopes: ['consult'],
    books: true, medical: true
  },
  sports_medicine: {
    ar: 'طبيب طب رياضي', en: 'Sports medicine doctor',
    icon: '🩺',
    scopes: ['rehab', 'consult'],
    books: true, medical: true
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