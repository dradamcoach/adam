/*
 * ADAM — الحالات الخاصة (أمراض مزمنة / حمل)
 *
 * ⚠️ اقرا ده الأول:
 * الملف ده **مش وصفة علاجية ومش بديل عن الطبيب**. هو قايمة
 * "احتياطات مدرّب" — يعني الحاجات اللي أي مدرب أو أخصائي تغذية
 * محترم لازم ياخد باله منها قبل ما يكتب برنامج لحالة زي دي،
 * والعلامات اللي لو ظهرت على العميل يقف فورًا ويرجع لدكتوره.
 *
 * كل حالة فيها:
 *   care  = احتياطات عامة متعارف عليها في التدريب (مش جرعات ولا علاج)
 *   stop  = علامات خطر → وقف التمرين واتصل بالطبيب
 *   scope = الحالة دي بتأثر على إيه: تدريب / تغذية / الاتنين
 *   clearance = محتاجة إذن طبي مكتوب قبل تفعيل البرنامج؟
 *
 * القرار الطبي بيفضل للطبيب. التطبيق بيقف البرنامج لحد ما
 * الطبيب يكتب إذنه — مش بيعوّض عنه.
 */

export const HEALTH_SCOPES = {
  training:  { ar: 'التدريب',  en: 'Training' },
  nutrition: { ar: 'التغذية',  en: 'Nutrition' },
  both:      { ar: 'الاتنين',  en: 'Both' }
};

export const HEALTH_CONDITIONS = {
  diabetes_t1: {
    icon: '🩸', scope: 'both', clearance: true,
    ar: 'سكري نوع ١', en: 'Type 1 diabetes',
    care: {
      ar: [
        'قياس السكر قبل التمرين وبعده — والمدرب يعرف الأرقام',
        'ميتمرّنش وهو صايم من غير ما دكتوره يقول إنه ينفع',
        'يبقى معاه مصدر سكر سريع في الحقيبة دايمًا',
        'تغيير شدة التمرين فجأة بيغيّر احتياجه — أي تعديل يعدّي على الدكتور',
        'تجنّب التمرين في الحر الشديد أو لوحده في الأول'
      ],
      en: [
        'Check blood sugar before and after — the coach should know the numbers',
        'No fasted training unless the doctor approves it',
        'Always carry a fast-acting sugar source',
        'Sudden intensity changes shift his needs — any change goes through the doctor',
        'Avoid extreme heat, and avoid training alone at the start'
      ]
    },
    stop: {
      ar: ['رعشة أو عرق بارد أو دوخة مفاجئة', 'تشوّش أو كلام مش مترابط', 'عطش شديد مع كتر تبوّل', 'غثيان أو قيء'],
      en: ['Shakiness, cold sweat or sudden dizziness', 'Confusion or slurred speech', 'Extreme thirst with frequent urination', 'Nausea or vomiting']
    }
  },

  diabetes_t2: {
    icon: '🩸', scope: 'both', clearance: true,
    ar: 'سكري نوع ٢', en: 'Type 2 diabetes',
    care: {
      ar: [
        'المشي بعد الأكل من أنفع الحاجات — ابدأ من هنا',
        'تدريب المقاومة مهم، بس التدرّج بطيء في الأول',
        'الكشف على القدم قبل أي برنامج جري أو وقوف طويل',
        'التوقيت بين الأكل والتمرين يفرق — ثبّته ولا تغيّره كل يوم',
        'أي تعديل في الأكل أو الدوا قرار الدكتور مش قرارك'
      ],
      en: [
        'Walking after meals is one of the most useful things — start there',
        'Resistance training matters, but progress slowly at first',
        'Check the feet before any running or long-standing program',
        'Meal-to-training timing matters — keep it consistent',
        'Any change to food or medication is the doctor’s call, not yours'
      ]
    },
    stop: {
      ar: ['دوخة أو رعشة أو عرق بارد', 'ألم أو تنميل في القدم', 'جرح في القدم مش بيلتئم', 'زغللة مفاجئة'],
      en: ['Dizziness, shaking or cold sweat', 'Foot pain or numbness', 'A foot wound that is not healing', 'Sudden blurred vision']
    }
  },

  hypertension: {
    icon: '💓', scope: 'both', clearance: true,
    ar: 'ضغط مرتفع', en: 'High blood pressure',
    care: {
      ar: [
        'ممنوع كتم النفس أثناء الرفع — الزفير مع المجهود',
        'بلاش تمارين فوق مستوى الراس بأوزان تقيلة في الأول',
        'التسخين والتهدئة مش اختياريين',
        'قياس الضغط قبل الحصة في أول أسبوعين',
        'الملح في الأكل موضوع الدكتور — بس المدرب لازم يعرف الهدف'
      ],
      en: [
        'No breath-holding while lifting — exhale on effort',
        'Avoid heavy overhead work early on',
        'Warm-up and cool-down are not optional',
        'Measure blood pressure before the session for the first two weeks',
        'Dietary salt is the doctor’s call — but the coach must know the target'
      ]
    },
    stop: {
      ar: ['صداع شديد أو ألم في الرقبة', 'ألم أو ضيق في الصدر', 'زغللة أو طنين في الودن', 'نَفَس قصير غير طبيعي'],
      en: ['Severe headache or neck pain', 'Chest pain or tightness', 'Blurred vision or ringing ears', 'Unusual shortness of breath']
    }
  },

  heart: {
    icon: '❤️', scope: 'both', clearance: true,
    ar: 'مشكلة في القلب', en: 'Heart condition',
    care: {
      ar: [
        'مفيش برنامج من غير تقرير مكتوب من دكتور القلب — من غير استثناء',
        'اشتغل في حدود النبض اللي الدكتور كتبه، مش اللي المعادلة بتقوله',
        'التدرّج بطيء جدًا، وكل زيادة تتراجع',
        'التمرين في وجود حد تاني أفضل في الأول'
      ],
      en: [
        'No program without a written cardiologist report — no exceptions',
        'Work inside the heart-rate range the doctor set, not a formula',
        'Progress very slowly, and review every increase',
        'Better to train with someone else present at first'
      ]
    },
    stop: {
      ar: ['أي ألم أو ضغط في الصدر', 'خفقان غير منتظم', 'نَفَس قصير مع مجهود بسيط', 'إغماء أو قرب إغماء'],
      en: ['Any chest pain or pressure', 'Irregular palpitations', 'Shortness of breath on light effort', 'Fainting or near-fainting']
    }
  },

  asthma: {
    icon: '🫁', scope: 'training', clearance: true,
    ar: 'ربو', en: 'Asthma',
    care: {
      ar: [
        'البخاخة معاه في كل حصة — مش في العربية',
        'تسخين أطول من المعتاد بيقلّل النوبة',
        'الهوا البارد والجاف والتراب محفّزات — راعي مكان التمرين',
        'التمارين المتقطّعة غالبًا أسهل من المجهود المستمر الطويل'
      ],
      en: [
        'Inhaler in every session — not left in the car',
        'A longer warm-up reduces exercise-induced attacks',
        'Cold dry air and dust are triggers — mind the venue',
        'Intervals are usually easier than long continuous effort'
      ]
    },
    stop: {
      ar: ['صفير في الصدر أو كحة مستمرة', 'صعوبة في الكلام من قصر النفس', 'البخاخة مش بتريّح زي العادة'],
      en: ['Wheezing or persistent cough', 'Too breathless to speak', 'The inhaler is not helping as usual']
    }
  },

  pcos: {
    icon: '🌸', scope: 'both', clearance: false,
    ar: 'تكيس المبايض', en: 'PCOS',
    care: {
      ar: [
        'تدريب المقاومة + المشي أنفع من الكارديو الطويل لوحده',
        'النتيجة بطيئة وده طبيعي — بلاش تقارن بحالات تانية',
        'النوم والتوتر بيأثروا على النتيجة قد الأكل بالظبط',
        'أي كلام عن الدوا أو الهرمونات للدكتور'
      ],
      en: [
        'Resistance training plus walking beats long cardio alone',
        'Progress is slower and that is normal — do not compare',
        'Sleep and stress affect results as much as food does',
        'Anything about medication or hormones goes to the doctor'
      ]
    },
    stop: {
      ar: ['ألم شديد أو مفاجئ في البطن', 'نزيف غير طبيعي'],
      en: ['Severe or sudden abdominal pain', 'Abnormal bleeding']
    }
  },

  thyroid: {
    icon: '🦋', scope: 'both', clearance: false,
    ar: 'الغدة الدرقية', en: 'Thyroid condition',
    care: {
      ar: [
        'التعب والوزن ممكن يتغيّروا لأسباب مالهاش علاقة بالبرنامج',
        'لو الجرعة اتعدّلت حديثًا، خفّف الحمل شوية لحد ما تستقر',
        'راقب النبض وقت الراحة ولو اتغيّر كتير قول للدكتور'
      ],
      en: [
        'Fatigue and weight can shift for reasons unrelated to the program',
        'If the dose changed recently, ease the load until things settle',
        'Watch resting heart rate and report big changes to the doctor'
      ]
    },
    stop: {
      ar: ['خفقان شديد', 'رعشة مستمرة في الإيد', 'إرهاق مفاجئ غير طبيعي'],
      en: ['Strong palpitations', 'Persistent hand tremor', 'Sudden unusual exhaustion']
    }
  },

  kidney: {
    icon: '🫘', scope: 'both', clearance: true,
    ar: 'مشكلة في الكلى', en: 'Kidney condition',
    care: {
      ar: [
        'البروتين والمياه هنا قرار الدكتور **بالأرقام** — المدرب ميجتهدش',
        'ممنوع أي مكمّل قبل موافقة الدكتور، حتى الكرياتين',
        'راقب التورّم في الرجلين'
      ],
      en: [
        'Protein and fluid targets here come from the doctor **as numbers** — the coach does not improvise',
        'No supplement without the doctor’s approval, creatine included',
        'Watch for swelling in the legs'
      ]
    },
    stop: {
      ar: ['تورّم في الرجلين أو الوش', 'قلة التبوّل', 'إرهاق شديد أو غثيان'],
      en: ['Swelling in legs or face', 'Reduced urination', 'Severe fatigue or nausea']
    }
  },

  liver: {
    icon: '🫀', scope: 'both', clearance: true,
    ar: 'كبد دهني / مشكلة في الكبد', en: 'Fatty liver / liver condition',
    care: {
      ar: [
        'نزول الوزن التدريجي هو أنفع تدخّل — بلاش حميات قاسية',
        'ممنوع أي مكمّل حرق دهون خالص',
        'المشي اليومي + مقاومة معتدلة أساس البرنامج'
      ],
      en: [
        'Gradual weight loss is the most useful intervention — no crash diets',
        'No fat-burner supplements at all',
        'Daily walking plus moderate resistance is the base'
      ]
    },
    stop: {
      ar: ['اصفرار في العين أو الجلد', 'ألم في الجنب اليمين فوق', 'انتفاخ في البطن'],
      en: ['Yellowing of eyes or skin', 'Pain in the upper right side', 'Abdominal swelling']
    }
  },

  disc: {
    icon: '🦴', scope: 'training', clearance: true,
    ar: 'انزلاق غضروفي / ألم ضهر', en: 'Disc problem / back pain',
    care: {
      ar: [
        'ممنوع الانحناء بحمل لحد ما الأخصائي يقول غير كده',
        'تثبيت الجذع قبل أي حمل على العمود الفقري',
        'الألم اللي بينزل في الرجل علامة توقّف مش علامة تحدّي',
        'التدرّج بالمدى قبل التدرّج بالوزن'
      ],
      en: [
        'No loaded spinal flexion until the specialist says otherwise',
        'Core bracing before any spinal load',
        'Pain radiating down the leg is a stop sign, not a challenge',
        'Progress range of motion before load'
      ]
    },
    stop: {
      ar: ['ألم بينزل في الرجل أو تنميل', 'ضعف مفاجئ في الرجل', 'أي مشكلة في التحكّم في التبوّل — طوارئ فورًا'],
      en: ['Pain or numbness radiating down the leg', 'Sudden leg weakness', 'Any loss of bladder control — emergency, immediately']
    }
  },

  arthritis: {
    icon: '🦵', scope: 'training', clearance: false,
    ar: 'خشونة / التهاب مفاصل', en: 'Arthritis / joint pain',
    care: {
      ar: [
        'التسخين الطويل بيفرق جدًا',
        'المدى اللي من غير ألم هو المدى المسموح',
        'المية والدراجة أرحم من الجري في البداية',
        'ألم بيفضل أكتر من ٢٤ ساعة بعد الحصة = الحمل كان كتير'
      ],
      en: [
        'A long warm-up makes a real difference',
        'The pain-free range is the allowed range',
        'Water and cycling are kinder than running at the start',
        'Pain lasting more than 24h after a session means the load was too much'
      ]
    },
    stop: {
      ar: ['تورّم أو سخونة في المفصل', 'ألم حاد مفاجئ', 'قفل في المفصل'],
      en: ['Swelling or heat in the joint', 'Sudden sharp pain', 'Joint locking']
    }
  },

  osteoporosis: {
    icon: '🦴', scope: 'both', clearance: true,
    ar: 'هشاشة عظام', en: 'Osteoporosis',
    care: {
      ar: [
        'ممنوع الانحناء الحاد للأمام أو لف الجذع بحمل',
        'تمارين التوازن مهمة قد تمارين القوة — منع الوقوع هدف أساسي',
        'تحميل تدريجي على العظم مفيد، بس بإشراف'
      ],
      en: [
        'No deep forward bending or loaded trunk twisting',
        'Balance work matters as much as strength — fall prevention is a goal',
        'Gradual bone loading helps, but under supervision'
      ]
    },
    stop: {
      ar: ['ألم مفاجئ في الضهر بعد حركة بسيطة', 'نقص في الطول أو تقوّس ملحوظ'],
      en: ['Sudden back pain after a minor movement', 'Noticeable height loss or curvature']
    }
  },

  anemia: {
    icon: '🩸', scope: 'both', clearance: false,
    ar: 'أنيميا', en: 'Anaemia',
    care: {
      ar: [
        'الإرهاق هنا مش كسل — عدّل الحمل على حسب اليوم',
        'قلّل الكارديو الطويل لحد ما التحليل يتحسّن',
        'الحديد ومصادره كلام أخصائي التغذية والدكتور'
      ],
      en: [
        'The fatigue here is not laziness — adjust load day by day',
        'Reduce long cardio until labs improve',
        'Iron and its sources are for the dietitian and doctor'
      ]
    },
    stop: {
      ar: ['دوخة أو إغماء', 'خفقان مع مجهود بسيط', 'شحوب شديد'],
      en: ['Dizziness or fainting', 'Palpitations on light effort', 'Marked pallor']
    }
  },

  ibs: {
    icon: '🌀', scope: 'nutrition', clearance: false,
    ar: 'قولون عصبي', en: 'IBS',
    care: {
      ar: [
        'الوجبة الكبيرة قبل التمرين مشكلة — قسّمها',
        'حدّد المحفّزات بالتجربة والتسجيل مش بالحذف العشوائي',
        'التوتر جزء من الصورة'
      ],
      en: [
        'A big pre-workout meal is a problem — split it',
        'Find triggers by logging, not by random elimination',
        'Stress is part of the picture'
      ]
    },
    stop: {
      ar: ['دم مع البراز', 'نزول وزن من غير سبب', 'ألم شديد مستمر'],
      en: ['Blood in stool', 'Unexplained weight loss', 'Severe persistent pain']
    }
  },

  gout: {
    icon: '🦶', scope: 'both', clearance: false,
    ar: 'نقرس', en: 'Gout',
    care: {
      ar: [
        'وقت النوبة: راحة للمفصل، مفيش تحميل',
        'المياه مهمة جدًا',
        'الأكل والمكمّلات هنا كلام الدكتور مش اجتهاد'
      ],
      en: [
        'During a flare: rest the joint, no loading',
        'Fluids matter a lot',
        'Food and supplements here are the doctor’s call'
      ]
    },
    stop: {
      ar: ['تورّم وسخونة واحمرار في مفصل', 'ألم حاد مفاجئ بالليل'],
      en: ['Swollen, hot, red joint', 'Sudden severe night pain']
    }
  },

  epilepsy: {
    icon: '⚡', scope: 'training', clearance: true,
    ar: 'صرع', en: 'Epilepsy',
    care: {
      ar: [
        'ممنوع السباحة أو التمرين لوحده من غير مرافق',
        'بلاش أوزان حرة فوق الراس من غير تأمين',
        'قلة النوم والإرهاق الشديد محفّزات'
      ],
      en: [
        'No swimming or training alone without a companion',
        'No free weights overhead without a spotter',
        'Sleep loss and extreme fatigue are triggers'
      ]
    },
    stop: {
      ar: ['أي أعراض سابقة للنوبة يعرفها هو', 'تشوّش أو فقدان انتباه مفاجئ'],
      en: ['Any aura he recognises', 'Sudden confusion or loss of attention']
    }
  }
};

/*
 * الحمل ليه معاملة خاصة: مش "مرض"، والفكر كله بيتغيّر —
 * الهدف بقى الحفاظ على اللياقة والراحة، مش نزول الوزن.
 * الأسابيع بتحدّد الاحتياطات، فبنسأل عنها.
 */
export const PREGNANCY = {
  icon: '🤰',
  ar: 'حمل', en: 'Pregnancy',
  clearance: true,
  care: {
    ar: [
      'الهدف مش نزول وزن — الهدف تفضل متحركة وقوية ومرتاحة',
      'اختبار الكلام: لو مقدرتش تتكلم جملة كاملة، الشدة كتير',
      'ميّة كتير، ومتتمرنش في حر شديد',
      'بعد الشهر التالت: بلاش تمارين على الضهر لفترة طويلة',
      'بلاش أي رياضة فيها احتكاك أو خطر وقوع',
      'الاتزان بيتغيّر مع كبر البطن — قلّل التمارين على رجل واحدة',
      'ألم الحوض أو الضهر علامة تعديل مش علامة توقّف كامل — اسألي دكتورك'
    ],
    en: [
      'The goal is not weight loss — it is staying mobile, strong and comfortable',
      'Talk test: if she cannot speak a full sentence, the intensity is too high',
      'Plenty of fluids, and no training in high heat',
      'After the first trimester: avoid long periods lying flat on the back',
      'No contact sport and nothing with a fall risk',
      'Balance changes as the bump grows — reduce single-leg work',
      'Pelvic or back pain means adjust, not necessarily stop — ask her doctor'
    ]
  },
  /*
   * العلامات دي متعارف عليها دوليًا كأسباب لوقف التمرين فورًا
   * والتوجّه للطبيب. مكتوبة هنا عشان تكون قدام عين العميلة
   * والمدرب، مش عشان التطبيق يشخّص
   */
  stop: {
    ar: [
      'أي نزيف مهبلي',
      'تقلصات منتظمة ومؤلمة',
      'نزول ماء',
      'ضيق نفس قبل ما تبدأي مجهود',
      'دوخة أو صداع أو ألم في الصدر',
      'ألم أو تورّم في بطة الرجل',
      'ضعف في العضلات بيأثر على اتزانك'
    ],
    en: [
      'Any vaginal bleeding',
      'Regular painful contractions',
      'Fluid leaking',
      'Shortness of breath before starting exertion',
      'Dizziness, headache or chest pain',
      'Calf pain or swelling',
      'Muscle weakness affecting balance'
    ]
  }
};

export const POSTPARTUM = {
  icon: '🍼',
  ar: 'ما بعد الولادة', en: 'Postpartum',
  clearance: true,
  care: {
    ar: [
      'مفيش برنامج قبل إذن الدكتور — والمدة بتختلف بين ولادة طبيعية وقيصرية',
      'تقييم انفصال عضلات البطن قبل أي تمارين بطن',
      'قاع الحوض الأول، وبعدين الباقي',
      'الرضاعة بتزوّد الاحتياج من السعرات والمياه',
      'النوم المتقطّع بيأثر على التعافي — عدّل الحمل على حسب اليوم'
    ],
    en: [
      'No program before medical clearance — timing differs for vaginal vs caesarean',
      'Assess abdominal separation before any abdominal work',
      'Pelvic floor first, everything else after',
      'Breastfeeding raises calorie and fluid needs',
      'Broken sleep affects recovery — adjust load day by day'
    ]
  },
  stop: {
    ar: ['نزيف بيزيد مع المجهود', 'ألم في الجرح', 'تسريب بول أو ضغط في قاع الحوض', 'ألم شديد في الضهر أو الحوض'],
    en: ['Bleeding that increases with effort', 'Pain at the incision', 'Urine leakage or pelvic-floor heaviness', 'Severe back or pelvic pain']
  }
};

/* ترتيب العرض في شاشة البيانات */
export const CONDITION_ORDER = [
  'diabetes_t2', 'diabetes_t1', 'hypertension', 'heart', 'asthma',
  'thyroid', 'pcos', 'anemia', 'kidney', 'liver',
  'disc', 'arthritis', 'osteoporosis', 'ibs', 'gout', 'epilepsy'
];

/*
 * الدورة الشهرية — مش "حالة مرضية"، دي فسيولوجيا طبيعية بتأثر
 * على التدريب فعلًا. التقسيم هنا بسيط ومتعارف عليه، والهدف إن
 * المدرب يعرف إن الأداء بيتغيّر عبر الشهر بدل ما يفسّر أي هبوط
 * على إنه كسل، وإن العميلة تفهم إن ده طبيعي.
 *
 * ⚠️ الأرقام دي متوسطات — كل ست مختلفة، والدورة غير المنتظمة
 * أو المؤلمة جدًا موضوع دكتور مش موضوع مدرب.
 */
export const CYCLE_PHASES = {
  period: {
    ar: 'أيام الدورة', en: 'Period days',
    icon: '🔴', days: [1, 5],
    note: {
      ar: 'الطاقة غالبًا أقل والألم وارد. الحركة الخفيفة بتساعد — والراحة مش فشل.',
      en: 'Energy is usually lower and cramps are common. Light movement helps — resting is not failure.'
    },
    train: {
      ar: ['مشي أو سباحة أو إطالة لو التعب كتير', 'لو حاسة إنك كويسة، تمرّني عادي — مفيش مانع', 'قلّلي الحمل مش عدد الأيام'],
      en: ['Walk, swim or stretch if fatigue is high', 'If you feel fine, train normally — nothing forbidden', 'Reduce load, not the number of days']
    }
  },
  follicular: {
    ar: 'ما بعد الدورة', en: 'Follicular',
    icon: '🌱', days: [6, 13],
    note: {
      ar: 'غالبًا أحسن فترة في الشهر: الطاقة والتحمّل بيرجعوا.',
      en: 'Usually the best stretch of the month: energy and tolerance come back.'
    },
    train: {
      ar: ['أحسن وقت للأوزان الأتقل والأرقام الجديدة', 'الاستشفاء أسرع — تحمّلي حجم تدريب أكبر'],
      en: ['Best window for heavier loads and new numbers', 'Recovery is faster — handle a bigger training volume']
    }
  },
  ovulation: {
    ar: 'فترة التبويض', en: 'Ovulation',
    icon: '⭐', days: [14, 16],
    note: {
      ar: 'القوة في قمتها تقريبًا، بس الأربطة بتبقى أرخى شوية.',
      en: 'Strength is near its peak, but ligaments are a little laxer.'
    },
    train: {
      ar: ['كويس للأرقام القصوى', 'خدي بالك من تمارين القفز والتغيير المفاجئ للاتجاه — خطر الركبة أعلى شوية', 'إحماء أطول'],
      en: ['Good for maximal efforts', 'Be careful with jumping and sharp direction changes — knee risk is slightly higher', 'Longer warm-up']
    }
  },
  luteal: {
    ar: 'ما قبل الدورة', en: 'Luteal',
    icon: '🌙', days: [17, 28],
    note: {
      ar: 'ممكن احتباس مياه وتقلّب مزاج وإرهاق أسرع. الوزن على الميزان بيزيد من غير دهون.',
      en: 'Water retention, mood swings and faster fatigue are common. Scale weight rises without added fat.'
    },
    train: {
      ar: ['ماتوزنيش نفسك الأيام دي وتتضايقي — الرقم مضلّل', 'الحر بيتعب أكتر — مياه أكتر ومكان أبرد', 'حافظي على البرنامج بحمل أقل شوية بدل ما توقفي'],
      en: ['Do not weigh yourself these days and get upset — the number misleads', 'Heat feels harder — more fluids, cooler venue', 'Keep the program at slightly lower load instead of stopping']
    }
  }
};

export const CYCLE_ORDER = ['period', 'follicular', 'ovulation', 'luteal'];

/*
 * علامات لازم تروح لدكتور — مش حاجة المدرب يتعامل معاها
 */
export const CYCLE_RED_FLAGS = {
  ar: [
    'نزيف غزير جدًا أو بيطول أكتر من المعتاد',
    'ألم شديد بيمنعك عن يومك',
    'غياب الدورة تلات شهور أو أكتر من غير حمل',
    'دورة غير منتظمة خالص مع تغيّر في الوزن أو الشعر'
  ],
  en: [
    'Very heavy bleeding or bleeding lasting longer than usual',
    'Pain severe enough to stop your day',
    'Three or more missed periods without pregnancy',
    'Very irregular cycles with weight or hair changes'
  ]
};