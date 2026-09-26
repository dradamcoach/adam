/*
 * المخطط الموسمي (التخطيط الرياضي) — التعريفات الثابتة
 * =====================================================
 * الموسم ← فترات ← بلوكات (شهور) ← أسابيع ← تمرينة ← تمرين.
 * كل مستوى ليه: الهدف، العناصر اللي بنشتغل عليها، وشدة الحمل (١-١٠).
 * الملف ده بيانات بس (مفيش كود بيعتمد على البرنامج) عشان القوالب
 * والاختبارات يستخدموه كمان.
 */

/* العناصر البدنية والفنية */
export const PLAN_COMPONENTS = [
  { id: 'max_strength', g: 'strength', ar: 'قوة قصوى', en: 'Max strength' },
  { id: 'strength', g: 'strength', ar: 'قوة عضلية', en: 'Strength' },
  { id: 'hypertrophy', g: 'strength', ar: 'تضخيم', en: 'Hypertrophy' },
  { id: 'power', g: 'strength', ar: 'قدرة (قوة مميزة بالسرعة)', en: 'Power' },
  { id: 'muscular_endurance', g: 'strength', ar: 'تحمل عضلي', en: 'Muscular endurance' },
  { id: 'core', g: 'strength', ar: 'ثبات الجذع', en: 'Core stability' },
  { id: 'speed', g: 'speed', ar: 'سرعة', en: 'Speed' },
  { id: 'acceleration', g: 'speed', ar: 'تسارع', en: 'Acceleration' },
  { id: 'max_velocity', g: 'speed', ar: 'سرعة قصوى', en: 'Max velocity' },
  { id: 'speed_endurance', g: 'speed', ar: 'تحمل سرعة', en: 'Speed endurance' },
  { id: 'special_endurance', g: 'speed', ar: 'تحمل خاص', en: 'Special endurance' },
  { id: 'reaction', g: 'speed', ar: 'سرعة رد فعل', en: 'Reaction' },
  { id: 'agility', g: 'speed', ar: 'رشاقة وتغيير اتجاه', en: 'Agility / COD' },
  { id: 'aerobic', g: 'endurance', ar: 'تحمل هوائي', en: 'Aerobic endurance' },
  { id: 'threshold', g: 'endurance', ar: 'العتبة اللاهوائية', en: 'Threshold' },
  { id: 'vo2max', g: 'endurance', ar: 'الحد الأقصى للأكسجين', en: 'VO2max' },
  { id: 'anaerobic', g: 'endurance', ar: 'تحمل لاهوائي', en: 'Anaerobic capacity' },
  { id: 'mobility', g: 'movement', ar: 'مرونة ومدى حركي', en: 'Mobility / flexibility' },
  { id: 'coordination', g: 'movement', ar: 'توافق', en: 'Coordination' },
  { id: 'balance', g: 'movement', ar: 'توازن', en: 'Balance' },
  { id: 'technique', g: 'skill', ar: 'مهارة وتكنيك', en: 'Technique' },
  { id: 'tactics', g: 'skill', ar: 'خططي', en: 'Tactics' },
  { id: 'recovery', g: 'care', ar: 'استشفاء', en: 'Recovery' },
  { id: 'prevention', g: 'care', ar: 'وقاية من الإصابات', en: 'Injury prevention' },
  { id: 'mental', g: 'care', ar: 'إعداد نفسي', en: 'Mental prep' }
];

/* أنواع الفترات: التقليدي (ماتفييف) + البلوكات */
export const PLAN_PERIOD_TYPES = [
  { id: 'gpp', ar: 'إعداد عام', en: 'General preparation', color: '#5cc2ff' },
  { id: 'spp', ar: 'إعداد خاص', en: 'Specific preparation', color: '#3df08a' },
  { id: 'precomp', ar: 'ما قبل المنافسات', en: 'Pre-competition', color: '#ffc94a' },
  { id: 'comp', ar: 'منافسات', en: 'Competition', color: '#ff7a7f' },
  { id: 'taper', ar: 'تهدئة قبل البطولة', en: 'Taper', color: '#b58cff' },
  { id: 'transition', ar: 'انتقالية (راحة إيجابية)', en: 'Transition', color: '#93a5bd' },
  { id: 'accumulation', ar: 'تراكم (بلوك)', en: 'Accumulation block', color: '#4fe3d2' },
  { id: 'transmutation', ar: 'تحويل (بلوك)', en: 'Transmutation block', color: '#ff9f43' },
  { id: 'realization', ar: 'تحقيق (بلوك)', en: 'Realization block', color: '#ff8cc6' },
  { id: 'rehab', ar: 'تأهيل ورجوع للملعب', en: 'Return to play', color: '#8fd3ff' }
];

/* نوع الأسبوع */
export const PLAN_WEEK_TYPES = [
  { id: 'load', ar: 'تحميل', en: 'Loading' },
  { id: 'shock', ar: 'صدمة (حمل عالي)', en: 'Shock' },
  { id: 'deload', ar: 'تخفيف واستشفاء', en: 'Deload' },
  { id: 'test', ar: 'اختبارات', en: 'Testing' },
  { id: 'comp', ar: 'منافسة', en: 'Competition' },
  { id: 'taper', ar: 'تهدئة', en: 'Taper' }
];

/* درجة الحمل ١-١٠ */
export const PLAN_LOAD_LEVELS = [
  { max: 3, ar: 'خفيف', en: 'Light', color: '#5cc2ff' },
  { max: 5, ar: 'متوسط', en: 'Moderate', color: '#3df08a' },
  { max: 7, ar: 'عالي', en: 'High', color: '#ffc94a' },
  { max: 9, ar: 'أقل من الأقصى', en: 'Submaximal', color: '#ff9f43' },
  { max: 10, ar: 'أقصى', en: 'Maximal', color: '#ff5a5f' }
];

/* نوع التمرين جوه التمرينة — كل نوع ليه خاناته */
export const PLAN_ITEM_KINDS = [
  { id: 'strength', ar: 'قوة / جيم', en: 'Strength / gym', fields: ['sets', 'reps', 'intensity', 'tempo', 'rest'] },
  { id: 'run', ar: 'جري / مضمار', en: 'Run / track', fields: ['sets', 'reps', 'distance', 'time', 'intensity', 'rest', 'restType', 'setRest'] },
  { id: 'swim', ar: 'سباحة', en: 'Swim', fields: ['sets', 'reps', 'distance', 'stroke', 'time', 'intensity', 'rest'] },
  { id: 'timed', ar: 'بالزمن / فترات', en: 'Timed / intervals', fields: ['sets', 'reps', 'duration', 'intensity', 'rest'] },
  { id: 'wod', ar: 'كروس فيت / هايروكس', en: 'CrossFit / HYROX', fields: ['format', 'duration', 'reps', 'distance', 'intensity', 'rest'] },
  { id: 'drill', ar: 'مهارة / درل', en: 'Skill / drill', fields: ['sets', 'reps', 'duration', 'distance', 'rest'] },
  { id: 'warmup', ar: 'إحماء', en: 'Warm-up', fields: ['sets', 'reps', 'duration', 'distance'] },
  { id: 'mobility', ar: 'مرونة / تهدئة', en: 'Mobility / cool-down', fields: ['sets', 'reps', 'duration'] }
];

/* الشدة محسوبة على إيه */
export const PLAN_BASES = [
  { id: '1rm', ar: '% من أقصى وزن (1RM)', en: '% of 1RM', unit: '%' },
  { id: 'rpe', ar: 'المجهود RPE (١-١٠)', en: 'RPE (1-10)', unit: '' },
  { id: 'rir', ar: 'عدات متبقية RIR', en: 'Reps in reserve (RIR)', unit: '' },
  { id: 'vmax', ar: '% من أقصى سرعة', en: '% of max speed', unit: '%' },
  { id: 'best', ar: '% من أحسن زمن', en: '% of best time', unit: '%' },
  { id: 'hr', ar: 'منطقة النبض', en: 'Heart-rate zone', unit: '' },
  { id: 'pace', ar: 'سرعة (دقيقة/كم)', en: 'Pace (min/km)', unit: '' },
  { id: 'css', ar: 'سرعة السباحة الحرجة CSS', en: 'Critical swim speed (CSS)', unit: '' },
  { id: 'watts', ar: 'وات / % FTP', en: 'Watts / % FTP', unit: '' }
];

export const PLAN_REST_TYPES = [
  { id: 'passive', ar: 'راحة سلبية', en: 'Passive' },
  { id: 'walk', ar: 'مشي', en: 'Walk back' },
  { id: 'jog', ar: 'جري خفيف', en: 'Easy jog' },
  { id: 'active', ar: 'راحة إيجابية', en: 'Active' }
];

export const PLAN_WOD_FORMATS = [
  { id: 'fortime', ar: 'بأسرع وقت (For Time)', en: 'For time' },
  { id: 'amrap', ar: 'أكبر عدد جولات (AMRAP)', en: 'AMRAP' },
  { id: 'emom', ar: 'كل دقيقة (EMOM)', en: 'EMOM' },
  { id: 'tabata', ar: 'تاباتا', en: 'Tabata' },
  { id: 'intervals', ar: 'فترات شغل وراحة', en: 'Intervals' },
  { id: 'chipper', ar: 'تشيبر', en: 'Chipper' },
  { id: 'hyrox_sim', ar: 'محاكاة هايروكس', en: 'HYROX simulation' }
];

export const PLAN_STROKES = [
  { id: 'free', ar: 'حرة', en: 'Freestyle' },
  { id: 'back', ar: 'ظهر', en: 'Backstroke' },
  { id: 'breast', ar: 'صدر', en: 'Breaststroke' },
  { id: 'fly', ar: 'فراشة', en: 'Butterfly' },
  { id: 'im', ar: 'متنوع', en: 'IM' },
  { id: 'kick', ar: 'رجلين (كيك)', en: 'Kick' },
  { id: 'pull', ar: 'دراعات (بول)', en: 'Pull' },
  { id: 'drill', ar: 'تكنيك', en: 'Drill' }
];

/* مسافات جاهزة للاختيار السريع */
export const TRACK_DISTANCES = ['10m', '20m', '30m', '40m', '50m', '60m', '80m', '100m', '120m', '150m', '200m', '250m', '300m', '400m', '500m', '600m', '800m', '1000m', '1200m', '1500m', '2000m', '3000m', '5000m', '10km'];
export const SWIM_DISTANCES = ['25m', '50m', '75m', '100m', '150m', '200m', '300m', '400m', '800m', '1500m'];
