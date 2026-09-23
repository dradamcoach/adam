/*
 * ADAM — أجهزة العلاج الطبيعي وبروتوكولاتها
 *
 * ⚠️ الملف ده مرجع مهني لأخصائي علاج طبيعي مرخّص — مش تعليمات
 * علاج ذاتي ولا بديل عن الفحص. الإعدادات المكتوبة نطاقات شائعة
 * في المراجع، والأخصائي هو اللي بيحدد المناسب لكل حالة حسب
 * فحصه هو وحسب الجهاز اللي عنده.
 *
 * موانع الاستعمال مكتوبة مع كل جهاز، ولازم تتقرا قبل أي جلسة.
 */

export const MODALITIES = [
  {
    id: 'shockwave',
    ar: 'موجات تصادمية (شوك ويف)',
    en: 'Shockwave (ESWT)',
    what: { ar: 'نبضات ضغط بتوصل للنسيج العميق وبتحفّز الجسم يعيد بناء الوتر المزمن.', en: 'Pressure pulses reaching deep tissue to restart healing in a chronic tendon.' },
    indications: {
      ar: ['التهاب اللفافة الأخمصية المزمن', 'التهاب أوتار الكتف المتكلّس', 'مرفق لاعب التنس والجولف', 'التهاب وتر أكيلس المزمن', 'آلام الرضفة المزمنة'],
      en: ['Chronic plantar fasciitis', 'Calcific shoulder tendinopathy', 'Tennis and golfer’s elbow', 'Chronic Achilles tendinopathy', 'Chronic patellar tendinopathy']
    },
    contraindications: {
      ar: ['الحمل', 'أورام في منطقة العلاج', 'اضطرابات تجلّط أو مسيولات دم', 'التهاب حاد أو عدوى', 'فوق الرئة أو الأعصاب الكبيرة أو صفيحة النمو عند الأطفال'],
      en: ['Pregnancy', 'Tumour in the treatment area', 'Clotting disorders or anticoagulants', 'Acute inflammation or infection', 'Over lung tissue, major nerves, or a child’s growth plate']
    }
  },
  {
    id: 'ultrasound',
    ar: 'ألتراساوند علاجي',
    en: 'Therapeutic ultrasound',
    what: { ar: 'موجات صوتية بتسخّن النسيج العميق أو بتشتغل نبضي من غير حرارة.', en: 'Sound waves that heat deep tissue, or work pulsed without heat.' },
    indications: {
      ar: ['تيبّس وتليّف النسيج الضام', 'تشنّج عضلي مزمن', 'التهاب أوتار تحت الحاد', 'قبل الإطالة لزيادة المدى'],
      en: ['Connective tissue stiffness and fibrosis', 'Chronic muscle spasm', 'Subacute tendinopathy', 'Before stretching to extend range']
    },
    contraindications: {
      ar: ['فوق العين أو القلب أو الأعضاء التناسلية', 'الحمل — فوق الحوض أو البطن', 'أورام', 'فوق منظّم ضربات القلب', 'جلطة وريدية'],
      en: ['Over the eye, heart or genitals', 'Pregnancy — over pelvis or abdomen', 'Tumours', 'Over a pacemaker', 'Venous thrombosis']
    }
  },
  {
    id: 'tens',
    ar: 'تنس — تنبيه كهربي للأعصاب',
    en: 'TENS',
    what: { ar: 'تيار خفيف بيشوّش على إشارة الألم قبل ما توصل للمخ.', en: 'A light current that scrambles the pain signal before it reaches the brain.' },
    indications: {
      ar: ['ألم حاد أو مزمن', 'ألم أسفل الظهر', 'ألم الرقبة', 'ألم ما بعد الجراحة'],
      en: ['Acute or chronic pain', 'Low back pain', 'Neck pain', 'Post-surgical pain']
    },
    contraindications: {
      ar: ['منظّم ضربات القلب', 'الحمل — فوق البطن', 'فوق الجيب السباتي في الرقبة', 'جلد مصاب أو فاقد الإحساس', 'صرع'],
      en: ['Pacemaker', 'Pregnancy — over the abdomen', 'Over the carotid sinus', 'Broken or numb skin', 'Epilepsy']
    }
  },
  {
    id: 'nmes',
    ar: 'تحفيز كهربي للعضلات',
    en: 'NMES / EMS',
    what: { ar: 'تيار بيخلّي العضلة تنقبض بنفسها — للعضلة اللي مش قادرة تشتغل لوحدها.', en: 'A current that makes the muscle contract — for a muscle that cannot fire on its own.' },
    indications: {
      ar: ['ضعف العضلة الرباعية بعد إصابة الرباط', 'ضمور بعد الجبس', 'إعادة تفعيل العضلة بعد الجراحة', 'ضعف الألوية'],
      en: ['Quadriceps weakness after ACL injury', 'Atrophy after casting', 'Muscle re-education after surgery', 'Glute weakness']
    },
    contraindications: {
      ar: ['منظّم ضربات القلب', 'الحمل', 'جلطة وريدية', 'كسر غير ملتئم في المنطقة', 'فقدان إحساس كامل'],
      en: ['Pacemaker', 'Pregnancy', 'Venous thrombosis', 'Unhealed fracture in the area', 'Complete loss of sensation']
    }
  },
  {
    id: 'laser',
    ar: 'ليزر علاجي منخفض الطاقة',
    en: 'Low-level laser (LLLT)',
    what: { ar: 'ضوء بيدخل النسيج وبيقلّل الالتهاب وبيسرّع الالتئام.', en: 'Light that enters the tissue, calms inflammation and speeds healing.' },
    indications: {
      ar: ['التهاب أوتار', 'التهاب مفاصل خفيف', 'التئام جروح', 'ألم عضلي موضعي'],
      en: ['Tendinopathy', 'Mild arthritis', 'Wound healing', 'Localised muscle pain']
    },
    contraindications: {
      ar: ['فوق العين مباشرة', 'أورام', 'الحمل — فوق البطن', 'فوق الغدة الدرقية', 'جلد عليه وشم داكن أو حساسية ضوء'],
      en: ['Directly over the eye', 'Tumours', 'Pregnancy — over the abdomen', 'Over the thyroid', 'Dark tattoos or photosensitivity']
    }
  },
  {
    id: 'diathermy',
    ar: 'دياثرمي (موجات قصيرة)',
    en: 'Shortwave diathermy',
    what: { ar: 'تسخين عميق واسع للمنطقة كلها قبل التمرين أو الإطالة.', en: 'Broad deep heating of a whole area before exercise or stretching.' },
    indications: {
      ar: ['تيبّس مفصلي مزمن', 'تشنّج عضلي واسع', 'تسخين قبل جلسة تمرين'],
      en: ['Chronic joint stiffness', 'Widespread muscle spasm', 'Warming before an exercise session']
    },
    contraindications: {
      ar: ['أي معدن في الجسم', 'منظّم ضربات القلب', 'الحمل', 'فقدان الإحساس بالحرارة', 'نزيف نشط'],
      en: ['Any metal implant', 'Pacemaker', 'Pregnancy', 'Loss of thermal sensation', 'Active bleeding']
    }
  },
  {
    id: 'traction',
    ar: 'شد فقري (تراكشن)',
    en: 'Spinal traction',
    what: { ar: 'شد محسوب بيفتح المسافة بين الفقرات ويقلّل الضغط على العصب.', en: 'Measured pull that opens the space between vertebrae and unloads the nerve.' },
    indications: {
      ar: ['انزلاق غضروفي مع أعراض عصبية', 'ضيق القناة الشوكية', 'ألم عنقي مع تنميل في الذراع'],
      en: ['Disc herniation with nerve symptoms', 'Spinal stenosis', 'Neck pain with arm numbness']
    },
    contraindications: {
      ar: ['هشاشة عظام شديدة', 'أورام أو عدوى في العمود', 'عدم ثبات فقري', 'الحمل', 'ضغط شديد غير منضبط'],
      en: ['Severe osteoporosis', 'Spinal tumour or infection', 'Spinal instability', 'Pregnancy', 'Severe uncontrolled hypertension']
    }
  },
  {
    id: 'cryo',
    ar: 'تبريد / ضغط بارد',
    en: 'Cryotherapy & compression',
    what: { ar: 'تبريد وضغط بيقلّلوا التورّم والألم في المرحلة الحادة.', en: 'Cold and compression to cut swelling and pain in the acute phase.' },
    indications: {
      ar: ['إصابة حادة أول ٤٨ ساعة', 'تورّم بعد الجراحة', 'ألم بعد جلسة تقيلة'],
      en: ['Acute injury in the first 48 hours', 'Post-surgical swelling', 'Soreness after a heavy session']
    },
    contraindications: {
      ar: ['حساسية البرد', 'ضعف الدورة الدموية الطرفية', 'ظاهرة رينو', 'فقدان الإحساس'],
      en: ['Cold hypersensitivity', 'Poor peripheral circulation', 'Raynaud’s', 'Loss of sensation']
    }
  },
  {
    id: 'heat',
    ar: 'حرارة سطحية',
    en: 'Superficial heat',
    what: { ar: 'كمادات دافئة بتريّح العضلة وبتزوّد المرونة قبل التمرين.', en: 'Warm packs that relax muscle and add flexibility before exercise.' },
    indications: {
      ar: ['تشنّج عضلي', 'تيبّس صباحي', 'قبل الإطالة'],
      en: ['Muscle spasm', 'Morning stiffness', 'Before stretching']
    },
    contraindications: {
      ar: ['التهاب حاد أو تورّم جديد', 'نزيف', 'فقدان الإحساس بالحرارة', 'جلد مصاب'],
      en: ['Acute inflammation or fresh swelling', 'Bleeding', 'Loss of thermal sensation', 'Broken skin']
    }
  },
  {
    id: 'cupping',
    ar: 'حجامة علاجية جافة',
    en: 'Dry cupping',
    what: { ar: 'شفط بيرفع النسيج وبيزوّد الدم الموضعي ويفكّ النقط المؤلمة.', en: 'Suction that lifts tissue, boosts local blood flow and releases trigger points.' },
    indications: {
      ar: ['شد عضلي في الظهر', 'نقط مؤلمة', 'تيبّس اللفافة'],
      en: ['Back muscle tightness', 'Trigger points', 'Fascial stiffness']
    },
    contraindications: {
      ar: ['مسيولات دم', 'جلد مصاب أو حساس', 'دوالي', 'الحمل — أسفل الظهر والبطن'],
      en: ['Anticoagulants', 'Broken or fragile skin', 'Varicose veins', 'Pregnancy — low back and abdomen']
    }
  },
  {
    id: 'drynee',
    ar: 'إبر جافة',
    en: 'Dry needling',
    what: { ar: 'إبرة رفيعة في النقطة المؤلمة بتفكّ الانقباض المزمن فيها.', en: 'A fine needle into the trigger point releasing its chronic contraction.' },
    indications: {
      ar: ['نقط مؤلمة مزمنة', 'تشنّج عضلي عنيد', 'ألم عضلي ليفي موضعي'],
      en: ['Chronic trigger points', 'Stubborn muscle spasm', 'Localised myofascial pain']
    },
    contraindications: {
      ar: ['رهاب الإبر', 'مسيولات دم', 'عدوى موضعية', 'الحمل — بعض المناطق', 'ضعف مناعة'],
      en: ['Needle phobia', 'Anticoagulants', 'Local infection', 'Pregnancy — certain areas', 'Immunosuppression']
    }
  },
  {
    id: 'magnetic',
    ar: 'مجال مغناطيسي نبضي',
    en: 'Pulsed magnetic field',
    what: { ar: 'مجال مغناطيسي بيحفّز العظم والنسيج على الالتئام.', en: 'A magnetic field that stimulates bone and tissue to heal.' },
    indications: {
      ar: ['كسور بطيئة الالتئام', 'التهاب مفاصل', 'ألم مزمن'],
      en: ['Slow-healing fractures', 'Arthritis', 'Chronic pain']
    },
    contraindications: {
      ar: ['منظّم ضربات القلب', 'الحمل', 'أورام', 'صرع'],
      en: ['Pacemaker', 'Pregnancy', 'Tumours', 'Epilepsy']
    }
  },
];

export const MODALITY_PROTOCOLS = [
  {
    id: 'sw_plantar',
    modality: 'shockwave',
    ar: 'لفافة أخمصية مزمنة',
    en: 'Chronic plantar fasciitis',
    note: { ar: 'ثلاث لخمس جلسات بفاصل أسبوع. الألم بيقل بعد الجلسة التانية عادة.', en: 'Three to five sessions a week apart. Pain usually eases after the second.' },
    settings: [
      { ar: 'الضغط', en: 'Pressure', value: '2.0 – 3.0 بار' },
      { ar: 'النبضات', en: 'Pulses', value: '2000' },
      { ar: 'التردد', en: 'Frequency', value: '8 – 12 هرتز' },
      { ar: 'الرأس', en: 'Applicator', value: '15 مم' },
    ],
    sessions: '3 – 5 جلسات',
    frequency: 'أسبوعيًا'
  },
  {
    id: 'sw_shoulder',
    modality: 'shockwave',
    ar: 'أوتار كتف متكلّسة',
    en: 'Calcific shoulder tendinopathy',
    note: { ar: 'بيتصوّر أشعة قبل وبعد عشان نتابع التكلّس نفسه.', en: 'Image before and after to track the calcification itself.' },
    settings: [
      { ar: 'الضغط', en: 'Pressure', value: '2.5 – 3.5 بار' },
      { ar: 'النبضات', en: 'Pulses', value: '2500' },
      { ar: 'التردد', en: 'Frequency', value: '6 – 10 هرتز' },
      { ar: 'الرأس', en: 'Applicator', value: '15 مم' },
    ],
    sessions: '4 – 6 جلسات',
    frequency: 'أسبوعيًا'
  },
  {
    id: 'sw_achilles',
    modality: 'shockwave',
    ar: 'وتر أكيلس مزمن',
    en: 'Chronic Achilles tendinopathy',
    note: { ar: 'لازم يتمشى مع تمارين إطالة لا مركزية — الجهاز لوحده مش كفاية.', en: 'Must run alongside eccentric loading — the device alone is not enough.' },
    settings: [
      { ar: 'الضغط', en: 'Pressure', value: '1.8 – 2.5 بار' },
      { ar: 'النبضات', en: 'Pulses', value: '2000' },
      { ar: 'التردد', en: 'Frequency', value: '10 هرتز' },
    ],
    sessions: '3 – 5 جلسات',
    frequency: 'أسبوعيًا'
  },
  {
    id: 'us_fibrosis',
    modality: 'ultrasound',
    ar: 'تليّف وتيبّس نسيج',
    en: 'Tissue fibrosis and stiffness',
    note: { ar: 'مستمر عشان التسخين العميق، وبعده إطالة على طول والنسيج لسه دافي.', en: 'Continuous for deep heating, then stretch immediately while warm.' },
    settings: [
      { ar: 'التردد', en: 'Frequency', value: '1 ميجاهرتز' },
      { ar: 'الشدة', en: 'Intensity', value: '1.2 – 1.8 وات/سم²' },
      { ar: 'النمط', en: 'Mode', value: 'مستمر' },
      { ar: 'المدة', en: 'Duration', value: '6 – 8 دقايق' },
    ],
    sessions: '6 – 10 جلسات',
    frequency: '3 مرات أسبوعيًا'
  },
  {
    id: 'us_acute',
    modality: 'ultrasound',
    ar: 'التهاب تحت حاد',
    en: 'Subacute inflammation',
    note: { ar: 'نبضي عشان مفيش حرارة — الحرارة في المرحلة دي بتزوّد التورّم.', en: 'Pulsed so there is no heating — heat at this stage increases swelling.' },
    settings: [
      { ar: 'التردد', en: 'Frequency', value: '3 ميجاهرتز' },
      { ar: 'الشدة', en: 'Intensity', value: '0.5 – 0.8 وات/سم²' },
      { ar: 'النمط', en: 'Mode', value: 'نبضي 1:4' },
      { ar: 'المدة', en: 'Duration', value: '5 دقايق' },
    ],
    sessions: '5 – 8 جلسات',
    frequency: 'يوم بعد يوم'
  },
  {
    id: 'tens_back',
    modality: 'tens',
    ar: 'ألم أسفل الظهر',
    en: 'Low back pain',
    note: { ar: 'تردد عالي للتسكين السريع أثناء الجلسة.', en: 'High frequency for fast relief during the session.' },
    settings: [
      { ar: 'التردد', en: 'Frequency', value: '80 – 120 هرتز' },
      { ar: 'عرض النبضة', en: 'Pulse width', value: '50 – 100 ميكروثانية' },
      { ar: 'المدة', en: 'Duration', value: '20 – 30 دقيقة' },
    ],
    sessions: 'حسب الألم',
    frequency: 'يوميًا لو احتاج'
  },
  {
    id: 'tens_chronic',
    modality: 'tens',
    ar: 'ألم مزمن',
    en: 'Chronic pain',
    note: { ar: 'تردد منخفض بيشتغل على الإندورفين — تأثيره أبطأ بس بيدوم أطول.', en: 'Low frequency working through endorphins — slower but longer lasting.' },
    settings: [
      { ar: 'التردد', en: 'Frequency', value: '2 – 10 هرتز' },
      { ar: 'عرض النبضة', en: 'Pulse width', value: '200 – 300 ميكروثانية' },
      { ar: 'المدة', en: 'Duration', value: '30 – 45 دقيقة' },
    ],
    sessions: '10 – 15 جلسة',
    frequency: '3 مرات أسبوعيًا'
  },
  {
    id: 'nmes_quad',
    modality: 'nmes',
    ar: 'تفعيل الرباعية بعد الرباط الصليبي',
    en: 'Quadriceps activation after ACL',
    note: { ar: 'العضلة بتفضل مش عارفة تشتغل بعد الجراحة — ده بيعلّمها تاني.', en: 'The muscle forgets how to fire after surgery — this teaches it again.' },
    settings: [
      { ar: 'التردد', en: 'Frequency', value: '50 هرتز' },
      { ar: 'عرض النبضة', en: 'Pulse width', value: '300 – 400 ميكروثانية' },
      { ar: 'شغل/راحة', en: 'On/off', value: '10ث / 50ث' },
      { ar: 'التكرار', en: 'Reps', value: '10 – 15 انقباضة' },
    ],
    sessions: 'يوميًا',
    frequency: '4 – 6 أسابيع'
  },
  {
    id: 'nmes_glute',
    modality: 'nmes',
    ar: 'ضعف الألوية',
    en: 'Glute weakness',
    note: { ar: 'مع تمرين إرادي في نفس الوقت — مش بدل التمرين.', en: 'Paired with voluntary contraction — not a replacement for it.' },
    settings: [
      { ar: 'التردد', en: 'Frequency', value: '35 – 50 هرتز' },
      { ar: 'عرض النبضة', en: 'Pulse width', value: '250 ميكروثانية' },
      { ar: 'شغل/راحة', en: 'On/off', value: '8ث / 24ث' },
    ],
    sessions: '3 مرات أسبوعيًا',
    frequency: '4 أسابيع'
  },
  {
    id: 'laser_tendon',
    modality: 'laser',
    ar: 'التهاب وتر',
    en: 'Tendinopathy',
    note: { ar: 'جرعة على نقط محددة على طول الوتر.', en: 'Dose delivered to set points along the tendon.' },
    settings: [
      { ar: 'الطول الموجي', en: 'Wavelength', value: '810 – 904 نانومتر' },
      { ar: 'الجرعة', en: 'Dose', value: '4 – 8 جول/سم²' },
      { ar: 'النقاط', en: 'Points', value: '4 – 6 نقط' },
    ],
    sessions: '6 – 12 جلسة',
    frequency: '3 مرات أسبوعيًا'
  },
  {
    id: 'trac_lumbar',
    modality: 'traction',
    ar: 'شد قطني',
    en: 'Lumbar traction',
    note: { ar: 'بيبدأ بنسبة قليلة من وزن الجسم وبيزيد لو العَرَض بيتحسّن.', en: 'Start at a low share of body weight and build if symptoms improve.' },
    settings: [
      { ar: 'الشد', en: 'Force', value: '25 – 50٪ من وزن الجسم' },
      { ar: 'النمط', en: 'Mode', value: 'متقطع' },
      { ar: 'المدة', en: 'Duration', value: '15 – 20 دقيقة' },
    ],
    sessions: '8 – 12 جلسة',
    frequency: '3 مرات أسبوعيًا'
  },
  {
    id: 'trac_cervical',
    modality: 'traction',
    ar: 'شد عنقي',
    en: 'Cervical traction',
    note: { ar: 'بزاوية ثني بسيطة قدّام — مش شد مستقيم.', en: 'At a slight forward flexion angle — not a straight pull.' },
    settings: [
      { ar: 'الشد', en: 'Force', value: '7 – 12 كجم' },
      { ar: 'الزاوية', en: 'Angle', value: '15 – 25 درجة ثني' },
      { ar: 'المدة', en: 'Duration', value: '10 – 15 دقيقة' },
    ],
    sessions: '6 – 10 جلسات',
    frequency: '3 مرات أسبوعيًا'
  },
  {
    id: 'cryo_acute',
    modality: 'cryo',
    ar: 'إصابة حادة',
    en: 'Acute injury',
    note: { ar: 'أول ٤٨ ساعة، مع رفع الطرف.', en: 'First 48 hours, with elevation.' },
    settings: [
      { ar: 'المدة', en: 'Duration', value: '15 – 20 دقيقة' },
      { ar: 'التكرار', en: 'Frequency', value: 'كل ساعتين' },
      { ar: 'الضغط', en: 'Compression', value: 'متوسط' },
    ],
    sessions: 'أول 48 ساعة',
    frequency: 'كل ساعتين'
  },
  {
    id: 'heat_pre',
    modality: 'heat',
    ar: 'تسخين قبل التمرين',
    en: 'Pre-exercise warming',
    note: { ar: 'قبل الإطالة مباشرة عشان النسيج يبقى أطوع.', en: 'Right before stretching so tissue gives more.' },
    settings: [
      { ar: 'المدة', en: 'Duration', value: '15 – 20 دقيقة' },
      { ar: 'الحرارة', en: 'Temperature', value: '40 – 45 مئوية' },
    ],
    sessions: 'كل جلسة',
    frequency: 'قبل التمرين'
  },
];
