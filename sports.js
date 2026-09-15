/*
 * ADAM — كتالوج الرياضات
 *
 * الفكرة: بدل قائمة رياضات مقفولة، كل رياضة بتتربط بـ"نوع قياس"
 * (metric) بيحدد إيه اللي بيتسجّل فيها. أي رياضة جديدة تتضاف كسطر
 * واحد هنا وبتشتغل في كل حتة في التطبيق تلقائيًا.
 *
 * أنواع القياس:
 *   distance_time : مسافة + زمن            (جري، سباحة، دراجات)
 *   time_only     : زمن بس                 (كورة، تنس، ملاكمة)
 *   reps_sets     : مجموعات وتكرارات        (حديد، جمباز)
 *   rounds        : جولات/أشواط + زمن       (رياضات قتالية، كروسفت)
 *   score         : نقاط/نتيجة + زمن        (رياضات جماعية بنتيجة)
 *   session       : جلسة بمدة بس            (يوجا، بيلاتس، تأهيل)
 */

export const SPORT_METRICS = {
  distance_time: {
    ar: 'مسافة وزمن', en: 'Distance & time',
    fields: ['distance', 'duration']
  },
  time_only: {
    ar: 'زمن', en: 'Time',
    fields: ['duration']
  },
  reps_sets: {
    ar: 'مجموعات وتكرارات', en: 'Sets & reps',
    fields: ['sets', 'reps', 'load']
  },
  rounds: {
    ar: 'جولات وزمن', en: 'Rounds & time',
    fields: ['rounds', 'duration']
  },
  score: {
    ar: 'نتيجة وزمن', en: 'Score & time',
    fields: ['score', 'duration']
  },
  session: {
    ar: 'مدة الجلسة', en: 'Session length',
    fields: ['duration']
  }
};

/* أسماء الحقول */
export const METRIC_FIELDS = {
  distance: { ar: 'المسافة',    en: 'Distance', unit: { ar: 'متر', en: 'm' },   type: 'number' },
  duration: { ar: 'المدة',      en: 'Duration', unit: { ar: 'دقيقة', en: 'min' }, type: 'number' },
  sets:     { ar: 'مجموعات',    en: 'Sets',     unit: { ar: '', en: '' },       type: 'number' },
  reps:     { ar: 'تكرارات',    en: 'Reps',     unit: { ar: '', en: '' },       type: 'text' },
  load:     { ar: 'الحمل',      en: 'Load',     unit: { ar: 'كجم', en: 'kg' },  type: 'text' },
  rounds:   { ar: 'جولات',      en: 'Rounds',   unit: { ar: '', en: '' },       type: 'number' },
  score:    { ar: 'النتيجة',    en: 'Score',    unit: { ar: '', en: '' },       type: 'text' }
};

export const SPORT_GROUPS = {
  none:       { ar: 'بدون رياضة / لياقة عامة', en: 'No sport / general fitness' },
  endurance:  { ar: 'تحمّل',        en: 'Endurance' },
  team:       { ar: 'جماعية',       en: 'Team sports' },
  racket:     { ar: 'مضرب',         en: 'Racket sports' },
  combat:     { ar: 'قتالية',       en: 'Combat sports' },
  strength:   { ar: 'قوة ورفع',     en: 'Strength & lifting' },
  athletics:  { ar: 'ألعاب قوى',    en: 'Athletics' },
  water:      { ar: 'مائية',        en: 'Water sports' },
  gymnastic:  { ar: 'جمباز ومرونة', en: 'Gymnastics & flexibility' },
  winter:     { ar: 'شتوية',        en: 'Winter sports' },
  other:      { ar: 'رياضات أخرى',  en: 'Other sports' }
};

export const SPORTS = [
  { id: 'general',      group: 'none',      metric: 'session',       ar: 'لياقة عامة',        en: 'General fitness' },

  /* تحمّل */
  { id: 'running',      group: 'endurance', metric: 'distance_time', ar: 'جري',               en: 'Running' },
  { id: 'trail_running',group: 'endurance', metric: 'distance_time', ar: 'جري الطرق الوعرة',  en: 'Trail running' },
  { id: 'marathon',     group: 'endurance', metric: 'distance_time', ar: 'ماراثون',           en: 'Marathon' },
  { id: 'cycling',      group: 'endurance', metric: 'distance_time', ar: 'دراجات',            en: 'Cycling' },
  { id: 'triathlon',    group: 'endurance', metric: 'distance_time', ar: 'ترايثلون',          en: 'Triathlon' },
  { id: 'rowing',       group: 'endurance', metric: 'distance_time', ar: 'تجديف',             en: 'Rowing' },
  { id: 'walking',      group: 'endurance', metric: 'distance_time', ar: 'مشي',               en: 'Walking' },

  /* مائية */
  { id: 'swimming',     group: 'water',     metric: 'distance_time', ar: 'سباحة',             en: 'Swimming' },
  { id: 'water_polo',   group: 'water',     metric: 'score',         ar: 'كرة ماء',           en: 'Water polo' },
  { id: 'diving',       group: 'water',     metric: 'session',       ar: 'غطس',               en: 'Diving' },
  { id: 'surfing',      group: 'water',     metric: 'session',       ar: 'ركوب الأمواج',      en: 'Surfing' },

  /* جماعية */
  { id: 'football',     group: 'team',      metric: 'score',         ar: 'كرة قدم',           en: 'Football' },
  { id: 'basketball',   group: 'team',      metric: 'score',         ar: 'كرة سلة',           en: 'Basketball' },
  { id: 'handball',     group: 'team',      metric: 'score',         ar: 'كرة يد',            en: 'Handball' },
  { id: 'volleyball',   group: 'team',      metric: 'score',         ar: 'كرة طائرة',         en: 'Volleyball' },
  { id: 'rugby',        group: 'team',      metric: 'score',         ar: 'رجبي',              en: 'Rugby' },
  { id: 'baseball',     group: 'team',      metric: 'score',         ar: 'بيسبول',            en: 'Baseball' },
  { id: 'hockey',       group: 'team',      metric: 'score',         ar: 'هوكي',              en: 'Hockey' },
  { id: 'futsal',       group: 'team',      metric: 'score',         ar: 'خماسي',             en: 'Futsal' },

  /* مضرب */
  { id: 'tennis',       group: 'racket',    metric: 'score',         ar: 'تنس',               en: 'Tennis' },
  { id: 'table_tennis', group: 'racket',    metric: 'score',         ar: 'تنس طاولة',         en: 'Table tennis' },
  { id: 'squash',       group: 'racket',    metric: 'score',         ar: 'اسكواش',            en: 'Squash' },
  { id: 'badminton',    group: 'racket',    metric: 'score',         ar: 'ريشة طائرة',        en: 'Badminton' },
  { id: 'padel',        group: 'racket',    metric: 'score',         ar: 'بادل',              en: 'Padel' },

  /* قتالية */
  { id: 'boxing',       group: 'combat',    metric: 'rounds',        ar: 'ملاكمة',            en: 'Boxing' },
  { id: 'kickboxing',   group: 'combat',    metric: 'rounds',        ar: 'كيك بوكسينج',       en: 'Kickboxing' },
  { id: 'mma',          group: 'combat',    metric: 'rounds',        ar: 'فنون قتالية مختلطة',en: 'MMA' },
  { id: 'judo',         group: 'combat',    metric: 'rounds',        ar: 'جودو',              en: 'Judo' },
  { id: 'karate',       group: 'combat',    metric: 'rounds',        ar: 'كاراتيه',           en: 'Karate' },
  { id: 'taekwondo',    group: 'combat',    metric: 'rounds',        ar: 'تايكوندو',          en: 'Taekwondo' },
  { id: 'wrestling',    group: 'combat',    metric: 'rounds',        ar: 'مصارعة',            en: 'Wrestling' },
  { id: 'fencing',      group: 'combat',    metric: 'rounds',        ar: 'مبارزة',            en: 'Fencing' },

  /* قوة ورفع */
  { id: 'bodybuilding', group: 'strength',  metric: 'reps_sets',     ar: 'كمال أجسام',        en: 'Bodybuilding' },
  { id: 'powerlifting', group: 'strength',  metric: 'reps_sets',     ar: 'باورليفتنج',        en: 'Powerlifting' },
  { id: 'weightlifting',group: 'strength',  metric: 'reps_sets',     ar: 'رفع أثقال أولمبي',  en: 'Olympic weightlifting' },
  { id: 'crossfit',     group: 'strength',  metric: 'rounds',        ar: 'كروسفت',            en: 'CrossFit' },
  { id: 'strongman',    group: 'strength',  metric: 'reps_sets',     ar: 'سترونجمان',         en: 'Strongman' },
  { id: 'calisthenics', group: 'strength',  metric: 'reps_sets',     ar: 'كاليسثينكس',        en: 'Calisthenics' },

  /* ألعاب قوى */
  { id: 'sprint',       group: 'athletics', metric: 'distance_time', ar: 'عدو سريع',          en: 'Sprinting' },
  { id: 'middle_dist',  group: 'athletics', metric: 'distance_time', ar: 'مسافات متوسطة',     en: 'Middle distance' },
  { id: 'long_jump',    group: 'athletics', metric: 'score',         ar: 'وثب طويل',          en: 'Long jump' },
  { id: 'high_jump',    group: 'athletics', metric: 'score',         ar: 'وثب عالي',          en: 'High jump' },
  { id: 'shot_put',     group: 'athletics', metric: 'score',         ar: 'دفع الجلة',         en: 'Shot put' },
  { id: 'javelin',      group: 'athletics', metric: 'score',         ar: 'رمي الرمح',         en: 'Javelin' },
  { id: 'hurdles',      group: 'athletics', metric: 'distance_time', ar: 'حواجز',             en: 'Hurdles' },

  /* جمباز ومرونة */
  { id: 'gymnastics',   group: 'gymnastic', metric: 'session',       ar: 'جمباز',             en: 'Gymnastics' },
  { id: 'yoga',         group: 'gymnastic', metric: 'session',       ar: 'يوجا',              en: 'Yoga' },
  { id: 'pilates',      group: 'gymnastic', metric: 'session',       ar: 'بيلاتس',            en: 'Pilates' },
  { id: 'dance',        group: 'gymnastic', metric: 'session',       ar: 'رقص',               en: 'Dance' },
  { id: 'cheerleading', group: 'gymnastic', metric: 'session',       ar: 'تشجيع استعراضي',    en: 'Cheerleading' },

  /* شتوية */
  { id: 'skiing',       group: 'winter',    metric: 'session',       ar: 'تزلج على الجليد',   en: 'Skiing' },
  { id: 'ice_skating',  group: 'winter',    metric: 'session',       ar: 'تزحلق على الجليد',  en: 'Ice skating' },

  /* أخرى */
  { id: 'golf',         group: 'other',     metric: 'score',         ar: 'جولف',              en: 'Golf' },
  { id: 'climbing',     group: 'other',     metric: 'session',       ar: 'تسلق',              en: 'Climbing' },
  { id: 'equestrian',   group: 'other',     metric: 'session',       ar: 'فروسية',            en: 'Equestrian' },
  { id: 'archery',      group: 'other',     metric: 'score',         ar: 'رماية بالسهام',     en: 'Archery' },
  { id: 'shooting',     group: 'other',     metric: 'score',         ar: 'رماية',             en: 'Shooting' },
  { id: 'skating',      group: 'other',     metric: 'session',       ar: 'تزلج بعجل',         en: 'Skateboarding' },
  { id: 'parkour',      group: 'other',     metric: 'session',       ar: 'باركور',            en: 'Parkour' },
  { id: 'other_sport',  group: 'other',     metric: 'session',       ar: 'رياضة أخرى',        en: 'Other sport' }
];

/*
 * قوالب تحضير بدني حسب مجموعة الرياضة.
 * ⚠️ مسودة مبدئية — راجعها وعدّلها حسب اللاعب ومرحلة موسمه.
 * التمارين بأسماء إنجليزية عشان التطبيق يدوّر على صورها في المكتبة.
 */
export const SPORT_TEMPLATES = [
  {
    id: 'tpl_endurance_base',
    group: 'endurance',
    ar: 'رياضات التحمّل — بناء القاعدة الهوائية',
    en: 'Endurance sports — Aerobic base phase',
    note: {
      ar: 'أحجام تدريب أطول بشدة منخفضة لمتوسطة قبل موسم المنافسات، مع شغل قوة عام يحمي من إصابات الإفراط.',
      en: 'Longer sessions at low-to-moderate intensity before the race season, plus general strength work to guard against overuse injury.'
    },
    sections: {
      warmup:      [{ en: 'Ankle Circles', sets: 2, reps: '15' }, { en: 'Leg Swings', sets: 2, reps: '12' }],
      main:        [{ en: 'Bodyweight Squat', sets: 3, reps: '15' }, { en: 'Romanian Deadlift', sets: 3, reps: '10' }, { en: 'Glute Bridge', sets: 3, reps: '15' }],
      cardio:      [{ en: 'Bicycling, Stationary', sets: 1, reps: '40min' }],
      mobility:    [{ en: 'Bird Dog', sets: 3, reps: '10' }],
      flexibility: [{ en: 'Calf Stretch', sets: 2, reps: '30s' }, { en: 'Hamstring Stretch', sets: 2, reps: '30s' }]
    }
  },
  {
    id: 'tpl_endurance',
    group: 'endurance',
    ar: 'رياضات التحمّل — تحضير بدني عام',
    en: 'Endurance sports — General conditioning',
    note: {
      ar: 'تركيز على قوة الجذع، ثبات الحوض، وقوة الرجلين المطاطية لتقليل إصابات الإفراط.',
      en: 'Focus on trunk strength, pelvic stability, and elastic leg strength to reduce overuse injury.'
    },
    sections: {
      warmup:      [{ en: 'Ankle Circles', sets: 2, reps: '15' }, { en: 'Leg Swings', sets: 2, reps: '12' }],
      main:        [{ en: 'Bodyweight Squat', sets: 3, reps: '15' }, { en: 'Romanian Deadlift', sets: 3, reps: '10' }, { en: 'Bulgarian Split Squat', sets: 3, reps: '10' }, { en: 'Standing Calf Raises', sets: 4, reps: '15' }],
      cardio:      [],
      mobility:    [{ en: 'Bird Dog', sets: 3, reps: '10' }, { en: 'Glute Bridge', sets: 3, reps: '15' }],
      flexibility: [{ en: 'Calf Stretch', sets: 2, reps: '30s' }, { en: 'Hamstring Stretch', sets: 2, reps: '30s' }]
    }
  },
  {
    id: 'tpl_endurance_peak',
    group: 'endurance',
    ar: 'رياضات التحمّل — الذروة قبل السباق',
    en: 'Endurance sports — Peak/race-specific phase',
    note: {
      ar: 'تقليل حجم التمرين العام وزيادة التخصص في شدة قريبة من سرعة السباق، مع راحة كافية للتعافي قبل المنافسة.',
      en: 'Reduce general volume and shift toward race-pace intensity, with enough rest to recover before competition.'
    },
    sections: {
      warmup:      [{ en: 'Ankle Circles', sets: 2, reps: '12' }, { en: 'Leg Swings', sets: 2, reps: '10' }],
      main:        [{ en: 'Bulgarian Split Squat', sets: 3, reps: '8' }, { en: 'Standing Calf Raises', sets: 3, reps: '12' }],
      cardio:      [{ en: 'Interval Running', sets: 8, reps: '60s' }],
      mobility:    [{ en: 'Bird Dog', sets: 2, reps: '10' }],
      flexibility: [{ en: 'Hamstring Stretch', sets: 2, reps: '20s' }]
    }
  },
  {
    id: 'tpl_team',
    group: 'team',
    ar: 'تحضير بدني — الرياضات الجماعية',
    en: 'Conditioning — team sports',
    note: {
      ar: 'قوة، قدرة انفجارية، وتغيير اتجاه. مهم جدًا العمل على أوتار الركبة والمقربات لتقليل الإصابات الشائعة.',
      en: 'Strength, power, and change of direction. Hamstring and adductor work matters most for injury prevention.'
    },
    sections: {
      warmup:      [{ en: 'Leg Swings', sets: 2, reps: '12' }, { en: 'Lateral Lunge', sets: 2, reps: '10' }],
      main:        [{ en: 'Barbell Squat', sets: 4, reps: '6' }, { en: 'Romanian Deadlift', sets: 3, reps: '8' }, { en: 'Nordic Hamstring Curl', sets: 3, reps: '6' }, { en: 'Copenhagen Plank', sets: 3, reps: '10' }],
      cardio:      [{ en: 'Interval Running', sets: 6, reps: '30s' }],
      mobility:    [{ en: 'Hip Flexor Stretch', sets: 2, reps: '30s' }],
      flexibility: [{ en: 'Adductor Stretch', sets: 2, reps: '30s' }]
    }
  },
  {
    id: 'tpl_racket',
    group: 'racket',
    ar: 'تحضير بدني — رياضات المضرب',
    en: 'Conditioning — racket sports',
    note: {
      ar: 'حركة جانبية، ثبات الكتف، وقوة الدوران. انتبه لحمل الكتف والكوع.',
      en: 'Lateral movement, shoulder stability, and rotational power. Watch shoulder and elbow load.'
    },
    sections: {
      warmup:      [{ en: 'Arm Circles', sets: 2, reps: '15' }, { en: 'Band Pull Apart', sets: 3, reps: '15' }],
      main:        [{ en: 'Lateral Lunge', sets: 3, reps: '12' }, { en: 'Single Leg Squat', sets: 3, reps: '10' }, { en: 'Russian Twist', sets: 3, reps: '20' }],
      cardio:      [{ en: 'Shuttle Run', sets: 6, reps: '20m' }],
      mobility:    [{ en: 'Thoracic Rotation', sets: 3, reps: '10' }],
      flexibility: [{ en: 'Shoulder Stretch', sets: 2, reps: '30s' }]
    }
  },
  {
    id: 'tpl_combat',
    group: 'combat',
    ar: 'تحضير بدني — الرياضات القتالية',
    en: 'Conditioning — combat sports',
    note: {
      ar: 'قدرة انفجارية، تحمّل لا هوائي، وقوة رقبة وجذع. الأحمال بتتوزع على أسابيع حسب قرب النزال.',
      en: 'Explosive power, anaerobic capacity, plus neck and trunk strength. Load is periodised around fight date.'
    },
    sections: {
      warmup:      [{ en: 'Jump Rope', sets: 3, reps: '60s' }, { en: 'Arm Circles', sets: 2, reps: '15' }],
      main:        [{ en: 'Barbell Deadlift', sets: 4, reps: '5' }, { en: 'Push-up', sets: 4, reps: '15' }, { en: 'Pull-up', sets: 4, reps: '8' }, { en: 'Medicine Ball Slam', sets: 3, reps: '12' }],
      cardio:      [{ en: 'Interval Running', sets: 8, reps: '30s' }],
      mobility:    [{ en: 'Hip Flexor Stretch', sets: 2, reps: '30s' }],
      flexibility: [{ en: 'Neck Stretch', sets: 2, reps: '20s' }]
    }
  },
  {
    id: 'tpl_strength_hypertrophy',
    group: 'strength',
    ar: 'رياضات القوة — بناء الحجم العضلي (Hypertrophy)',
    en: 'Strength sports — Hypertrophy phase',
    note: {
      ar: 'حمل متوسط وتكرارات أعلى (8-12) مع حجم تدريبي أكبر — مرحلة بناء الكتلة العضلية قبل مرحلتي القوة والقدرة الانفجارية.',
      en: 'Moderate load with higher reps (8-12) and more total volume — builds muscle mass ahead of the strength and power phases.'
    },
    sections: {
      warmup:      [{ en: 'Band Pull Apart', sets: 3, reps: '15' }, { en: 'Bodyweight Squat', sets: 2, reps: '15' }],
      main:        [{ en: 'Barbell Squat', sets: 4, reps: '10' }, { en: 'Barbell Bench Press - Medium Grip', sets: 4, reps: '10' }, { en: 'Bent Over Barbell Row', sets: 4, reps: '10' }, { en: 'Dumbbell Lunge', sets: 3, reps: '12' }],
      cardio:      [],
      mobility:    [{ en: 'Thoracic Rotation', sets: 3, reps: '10' }],
      flexibility: [{ en: 'Hip Flexor Stretch', sets: 2, reps: '30s' }]
    }
  },
  {
    id: 'tpl_strength',
    group: 'strength',
    ar: 'رياضات القوة — القوة القصوى (Strength)',
    en: 'Strength sports — Max strength phase',
    note: {
      ar: 'التركيز على الحركات الأساسية بتقنية سليمة وتدرج في الحمل. الاستشفاء جزء من البرنامج مش إضافة.',
      en: 'Focus on the main lifts with sound technique and progressive load. Recovery is part of the plan, not an extra.'
    },
    sections: {
      warmup:      [{ en: 'Band Pull Apart', sets: 3, reps: '15' }, { en: 'Bodyweight Squat', sets: 2, reps: '15' }],
      main:        [{ en: 'Barbell Squat', sets: 5, reps: '5' }, { en: 'Barbell Bench Press - Medium Grip', sets: 5, reps: '5' }, { en: 'Barbell Deadlift', sets: 3, reps: '5' }, { en: 'Barbell Shoulder Press', sets: 3, reps: '8' }],
      cardio:      [],
      mobility:    [{ en: 'Thoracic Rotation', sets: 3, reps: '10' }],
      flexibility: [{ en: 'Hip Flexor Stretch', sets: 2, reps: '30s' }]
    }
  },
  {
    id: 'tpl_strength_power',
    group: 'strength',
    ar: 'رياضات القوة — القدرة الانفجارية (Power)',
    en: 'Strength sports — Power phase',
    note: {
      ar: 'أحمال عالية وتكرارات قليلة (2-5) مع راحة كاملة بين المجموعات — الهدف سرعة الأداء مش التعب العضلي، وده بييجي بعد مرحلتي الحجم والقوة.',
      en: 'Heavy loads with low reps (2-5) and full rest between sets — the goal is bar speed, not muscular fatigue. Follows the hypertrophy and strength phases.'
    },
    sections: {
      warmup:      [{ en: 'Band Pull Apart', sets: 3, reps: '15' }, { en: 'Bodyweight Squat', sets: 2, reps: '10' }],
      main:        [{ en: 'Barbell Squat', sets: 5, reps: '3' }, { en: 'Box Jump', sets: 5, reps: '3' }, { en: 'Barbell Shoulder Press', sets: 4, reps: '3' }, { en: 'Medicine Ball Slam', sets: 4, reps: '8' }],
      cardio:      [],
      mobility:    [{ en: 'Thoracic Rotation', sets: 3, reps: '10' }],
      flexibility: [{ en: 'Hip Flexor Stretch', sets: 2, reps: '20s' }]
    }
  },
  {
    id: 'tpl_athletics_gpp',
    group: 'athletics',
    ar: 'ألعاب القوى — الإعداد العام (GPP)',
    en: 'Athletics — General Prep (GPP)',
    note: {
      ar: 'مرحلة بناء القاعدة قبل موسم المنافسات — قوة عامة وحجم عضلي وتحمّل هوائي أساسي، من غير تخصص حركي عالي لسرعة السباق.',
      en: 'Base-building phase before the competition season — general strength, muscle mass, and aerobic base, without race-specific speed work yet.'
    },
    sections: {
      warmup:      [{ en: 'Leg Swings', sets: 2, reps: '12' }, { en: 'Arm Circles', sets: 2, reps: '15' }],
      main:        [{ en: 'Barbell Squat', sets: 4, reps: '8' }, { en: 'Barbell Deadlift', sets: 3, reps: '6' }, { en: 'Pull-up', sets: 3, reps: '8' }, { en: 'Push-up', sets: 3, reps: '15' }],
      cardio:      [{ en: 'Bicycling, Stationary', sets: 1, reps: '20min' }],
      mobility:    [{ en: 'Hip Flexor Stretch', sets: 2, reps: '30s' }, { en: 'Thoracic Rotation', sets: 3, reps: '10' }],
      flexibility: [{ en: 'Hamstring Stretch', sets: 2, reps: '30s' }, { en: 'Calf Stretch', sets: 2, reps: '30s' }]
    }
  },
  {
    id: 'tpl_athletics',
    group: 'athletics',
    ar: 'ألعاب القوى — الإعداد الخاص (SPP)',
    en: 'Athletics — Special Prep (SPP)',
    note: {
      ar: 'قدرة انفجارية وسرعة. تمارين الإيكسنتريك لأوتار الركبة أساسية للعدّائين لتقليل الارتجاع.',
      en: 'Power and speed. Eccentric hamstring work is essential for sprinters to cut re-injury risk.'
    },
    sections: {
      warmup:      [{ en: 'Leg Swings', sets: 2, reps: '12' }, { en: 'Ankle Circles', sets: 2, reps: '15' }],
      main:        [{ en: 'Barbell Squat', sets: 4, reps: '5' }, { en: 'Nordic Hamstring Curl', sets: 3, reps: '6' }, { en: 'Box Jump', sets: 4, reps: '5' }, { en: 'Standing Calf Raises', sets: 4, reps: '12' }],
      cardio:      [{ en: 'Sprint Intervals', sets: 6, reps: '60m' }],
      mobility:    [{ en: 'Hip Flexor Stretch', sets: 2, reps: '30s' }],
      flexibility: [{ en: 'Hamstring Stretch', sets: 2, reps: '30s' }]
    }
  },
  {
    id: 'tpl_athletics_comp',
    group: 'athletics',
    ar: 'ألعاب القوى — مرحلة المنافسات والتايبر',
    en: 'Athletics — Competition & taper',
    note: {
      ar: 'تقليل الحجم الكلي مع الحفاظ على الشدة قبل السباق مباشرة، عشان الجسم يوصل للمنافسة مستريح وقادر على أعلى أداء.',
      en: 'Cut total volume while keeping intensity high right before competition, so the athlete arrives fresh and at peak power.'
    },
    sections: {
      warmup:      [{ en: 'Leg Swings', sets: 2, reps: '10' }, { en: 'Ankle Circles', sets: 2, reps: '12' }],
      main:        [{ en: 'Barbell Squat', sets: 3, reps: '3' }, { en: 'Box Jump', sets: 4, reps: '4' }, { en: 'Standing Calf Raises', sets: 2, reps: '8' }],
      cardio:      [{ en: 'Sprint Intervals', sets: 4, reps: '30m' }],
      mobility:    [{ en: 'Hip Flexor Stretch', sets: 2, reps: '20s' }],
      flexibility: [{ en: 'Hamstring Stretch', sets: 2, reps: '20s' }]
    }
  },
  {
    id: 'tpl_water',
    group: 'water',
    ar: 'تحضير بدني — الرياضات المائية',
    en: 'Conditioning — water sports',
    note: {
      ar: 'صحة الكتف أولوية قصوى للسبّاحين. قوة الظهر والدوران الخارجي بتوازن حجم الشد المتكرر.',
      en: 'Shoulder health is the top priority for swimmers. Back and external-rotation strength balance repetitive pulling.'
    },
    sections: {
      warmup:      [{ en: 'Arm Circles', sets: 2, reps: '15' }, { en: 'Band Pull Apart', sets: 3, reps: '15' }],
      main:        [{ en: 'Pull-up', sets: 3, reps: '8' }, { en: 'Bent Over Barbell Row', sets: 3, reps: '10' }, { en: 'Band External Rotation', sets: 3, reps: '15' }, { en: 'Plank', sets: 3, reps: '45s' }],
      cardio:      [],
      mobility:    [{ en: 'Thoracic Rotation', sets: 3, reps: '10' }],
      flexibility: [{ en: 'Shoulder Stretch', sets: 2, reps: '30s' }]
    }
  },
  {
    id: 'tpl_gymnastic',
    group: 'gymnastic',
    ar: 'تحضير بدني — الجمباز والمرونة',
    en: 'Conditioning — gymnastics & flexibility',
    note: {
      ar: 'قوة في مدى حركة كامل، وتحكم في الأوضاع الصعبة. المرونة تتبنى بقوة مش بإطالة سلبية بس.',
      en: 'Strength through full range and control in end positions. Flexibility is built with strength, not passive stretching alone.'
    },
    sections: {
      warmup:      [{ en: 'Arm Circles', sets: 2, reps: '15' }, { en: 'Cat Cow', sets: 2, reps: '10' }],
      main:        [{ en: 'Pull-up', sets: 4, reps: '6' }, { en: 'Push-up', sets: 4, reps: '12' }, { en: 'Hollow Body Hold', sets: 3, reps: '30s' }, { en: 'Single Leg Squat', sets: 3, reps: '8' }],
      cardio:      [],
      mobility:    [{ en: 'Thoracic Rotation', sets: 3, reps: '10' }, { en: 'Hip Flexor Stretch', sets: 3, reps: '30s' }],
      flexibility: [{ en: 'Hamstring Stretch', sets: 3, reps: '30s' }, { en: 'Shoulder Stretch', sets: 3, reps: '30s' }]
    }
  },
  {
    id: 'tpl_winter',
    group: 'winter',
    ar: 'تحضير بدني — الرياضات الشتوية',
    en: 'Conditioning — winter sports',
    note: {
      ar: 'تركيز على قوة الرجلين والتوازن وثبات الجذع — أساسي في رياضات التزلج بسبب الحمل الجانبي المتكرر على المفاصل.',
      en: 'Focus on leg strength, balance, and trunk stability — essential for skiing/skating due to repeated lateral joint load.'
    },
    sections: {
      warmup:      [{ en: 'Leg Swings', sets: 2, reps: '12' }, { en: 'Arm Circles', sets: 2, reps: '15' }],
      main:        [{ en: 'Barbell Squat', sets: 3, reps: '10' }, { en: 'Single Leg Squat', sets: 3, reps: '8' }, { en: 'Lateral Lunge', sets: 3, reps: '10' }, { en: 'Plank', sets: 3, reps: '45s' }],
      cardio:      [],
      mobility:    [{ en: 'Hip Flexor Stretch', sets: 2, reps: '30s' }],
      flexibility: [{ en: 'Calf Stretch', sets: 2, reps: '30s' }]
    }
  },
  {
    id: 'tpl_other',
    group: 'other',
    ar: 'تحضير بدني — رياضات أخرى',
    en: 'Conditioning — other sports',
    note: {
      ar: 'برنامج قوة وثبات عام يصلح كنقطة بداية لرياضات متنوعة زي التسلق والجولف والرماية — عدّله حسب المتطلبات الحركية الخاصة بكل رياضة.',
      en: 'A general strength & stability starting point for varied sports like climbing, golf, or archery — adapt it to each sport’s specific movement demands.'
    },
    sections: {
      warmup:      [{ en: 'Arm Circles', sets: 2, reps: '15' }, { en: 'Leg Swings', sets: 2, reps: '12' }],
      main:        [{ en: 'Bodyweight Squat', sets: 3, reps: '12' }, { en: 'Push-up', sets: 3, reps: '12' }, { en: 'Plank', sets: 3, reps: '30s' }, { en: 'Bird Dog', sets: 3, reps: '10' }],
      cardio:      [],
      mobility:    [{ en: 'Thoracic Rotation', sets: 3, reps: '10' }],
      flexibility: [{ en: 'Shoulder Stretch', sets: 2, reps: '30s' }]
    }
  },
  {
    id: 'tpl_general',
    group: 'none',
    ar: 'لياقة عامة — برنامج شامل',
    en: 'General fitness — full body',
    note: {
      ar: 'برنامج متوازن للمبتدئين والمتوسطين، مناسب لأي حد مش بيمارس رياضة تخصصية.',
      en: 'A balanced programme for beginners and intermediates who are not training for a specific sport.'
    },
    sections: {
      warmup:      [{ en: 'Bodyweight Squat', sets: 2, reps: '15' }, { en: 'Arm Circles', sets: 2, reps: '15' }],
      main:        [{ en: 'Barbell Squat', sets: 3, reps: '10' }, { en: 'Barbell Bench Press - Medium Grip', sets: 3, reps: '10' }, { en: 'Bent Over Barbell Row', sets: 3, reps: '10' }, { en: 'Barbell Shoulder Press', sets: 3, reps: '10' }],
      cardio:      [{ en: 'Bicycling, Stationary', sets: 1, reps: '15min' }],
      mobility:    [{ en: 'Glute Bridge', sets: 3, reps: '15' }],
      flexibility: [{ en: 'Hamstring Stretch', sets: 2, reps: '30s' }]
    }
  }
];