/*
 * مكتبة الرياضة — التعريفات الثابتة
 * ====================================
 * الاختبارات بمعاييرها، الأدوات، القوانين والمقاسات، والجمل والخطط.
 * بيانات بس — القوالب والاختبارات بتستخدمها.
 */

export const TEST_CATEGORIES = [
  { id: 'body_comp', ar: 'قياسات الجسم وتركيبه', en: 'Body composition' },
  { id: 'flexibility', ar: 'مرونة', en: 'Flexibility' },
  { id: 'strength', ar: 'قوة عضلية', en: 'Strength' },
  { id: 'power', ar: 'قدرة (قوة انفجارية)', en: 'Power' },
  { id: 'speed', ar: 'سرعة', en: 'Speed' },
  { id: 'agility', ar: 'رشاقة وتغيير اتجاه', en: 'Agility' },
  { id: 'aerobic', ar: 'تحمل هوائي', en: 'Aerobic endurance' },
  { id: 'anaerobic', ar: 'تحمل لاهوائي', en: 'Anaerobic capacity' },
  { id: 'muscular_endurance', ar: 'تحمل عضلي', en: 'Muscular endurance' },
  { id: 'balance', ar: 'توازن', en: 'Balance' },
  { id: 'movement', ar: 'جودة الحركة', en: 'Movement quality' },
  { id: 'reaction', ar: 'سرعة رد الفعل والتوافق', en: 'Reaction & coordination' },
  { id: 'skill', ar: 'مهاري خاص بالرياضة', en: 'Sport skill' },
  { id: 'health', ar: 'صحي ووظيفي', en: 'Health & functional' },
  { id: 'battery', ar: 'بطاريات اختبارات', en: 'Test batteries' }
];

/* التقدير — من الأعلى للأقل */
export const TEST_RATINGS = [
  { id: 'excellent', ar: 'ممتاز', en: 'Excellent', color: '#2ee07a' },
  { id: 'very_good', ar: 'جيد جدًا', en: 'Very good', color: '#7be495' },
  { id: 'good', ar: 'جيد', en: 'Good', color: '#b8e86b' },
  { id: 'average', ar: 'متوسط', en: 'Average', color: '#ffc94a' },
  { id: 'below_average', ar: 'أقل من المتوسط', en: 'Below average', color: '#ff9f43' },
  { id: 'poor', ar: 'ضعيف', en: 'Poor', color: '#ff7a7f' },
  { id: 'very_poor', ar: 'ضعيف جدًا', en: 'Very poor', color: '#e8363d' }
];

export const TEST_UNITS = ['s', 'min', 'm', 'cm', 'km', 'reps', 'kg', 'kg/bw', 'ml/kg/min', 'level', 'score', 'W', 'W/kg', '%', 'bpm', 'kg/m2', 'mm', 'deg', 'points', 'shuttles', 'km/h', 'mmHg'];

export const EQUIP_CATEGORIES = [
  { id: 'free_weights', ar: 'أوزان حرة', en: 'Free weights' },
  { id: 'machines', ar: 'أجهزة جيم', en: 'Gym machines' },
  { id: 'cardio', ar: 'أجهزة كارديو', en: 'Cardio machines' },
  { id: 'functional', ar: 'تدريب وظيفي', en: 'Functional training' },
  { id: 'speed_agility', ar: 'سرعة ورشاقة', en: 'Speed & agility' },
  { id: 'plyometric', ar: 'بليومتري ووثب', en: 'Plyometrics' },
  { id: 'mobility_recovery', ar: 'مرونة واستشفاء', en: 'Mobility & recovery' },
  { id: 'testing', ar: 'قياس واختبارات', en: 'Testing & measurement' },
  { id: 'tech', ar: 'تكنولوجيا وأجهزة تتبع', en: 'Tech & tracking' },
  { id: 'athletics', ar: 'ألعاب قوى', en: 'Athletics' },
  { id: 'aquatic', ar: 'سباحة ومياه', en: 'Aquatics' },
  { id: 'combat', ar: 'رياضات قتالية', en: 'Combat sports' },
  { id: 'racket', ar: 'رياضات المضرب', en: 'Racket sports' },
  { id: 'team_sports', ar: 'رياضات جماعية', en: 'Team sports' },
  { id: 'gymnastics', ar: 'جمباز', en: 'Gymnastics' },
  { id: 'cycling_rowing', ar: 'دراجات وتجديف', en: 'Cycling & rowing' },
  { id: 'rehab', ar: 'تأهيل وعلاج طبيعي', en: 'Rehab & physio' },
  { id: 'safety', ar: 'أمان وإسعافات', en: 'Safety & first aid' },
  { id: 'other', ar: 'متنوع', en: 'Other' }
];

export const TACTIC_KINDS = [
  { id: 'combination', ar: 'جملة حركية', en: 'Combination' },
  { id: 'attack', ar: 'هجوم', en: 'Attack' },
  { id: 'defense', ar: 'دفاع', en: 'Defense' },
  { id: 'counter', ar: 'هجوم مضاد', en: 'Counter' },
  { id: 'set_piece', ar: 'كرات ثابتة ولعبات محفوظة', en: 'Set piece / play' },
  { id: 'system', ar: 'طريقة لعب وتشكيل', en: 'System / formation' },
  { id: 'transition', ar: 'تحول', en: 'Transition' },
  { id: 'game_plan', ar: 'خطة مباراة / سباق', en: 'Game / race plan' }
];

export const RULE_SECTIONS = [
  { id: 'field', ar: 'الملعب والمقاسات', en: 'Field & dimensions' },
  { id: 'equipment', ar: 'الأدوات الرسمية', en: 'Official equipment' },
  { id: 'format', ar: 'الزمن ونظام اللعب', en: 'Duration & format' },
  { id: 'players', ar: 'اللاعبين والتبديل', en: 'Players & substitutions' },
  { id: 'scoring', ar: 'التسجيل والفوز', en: 'Scoring & winning' },
  { id: 'categories', ar: 'الفئات العمرية والأوزان', en: 'Age & weight categories' },
  { id: 'key_rules', ar: 'أهم القوانين والمخالفات', en: 'Key rules & fouls' }
];
