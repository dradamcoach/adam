/*
 * ADAM — أجهزة وبروتوكولات علاج طبيعي إضافية
 *
 * نفس قواعد modalities-library.js: مرجع مهني لأخصائي علاج طبيعي
 * مرخّص — مش تعليمات علاج ذاتي ولا بديل عن الفحص. الإعدادات هنا
 * نقطة بداية محافظة، والأخصائي هو اللي بيحدد المناسب حسب فحصه
 * ودليل الجهاز اللي عنده. موانع الاستعمال لازم تتقرا قبل أي جلسة.
 *
 * Same rules as modalities-library.js: professional reference for a
 * licensed physiotherapist, not self-treatment. Settings are
 * conservative starting parameters — adjust to the device manual and
 * clinical judgement. Read the contraindications before every session.
 */

export const MODALITIES_EXTRA = [
  {
    id: 'ifc',
    ar: 'تيار متداخل (إنترفيرنشال)',
    en: 'Interferential current (IFC)',
    what: { ar: 'تيارين متوسطي التردد بيتقاطعوا جوه النسيج ويطلعوا تردد منخفض في العمق — أريح على الجلد من التيارات العادية.', en: 'Two medium-frequency currents crossing in the tissue to produce a low beat frequency at depth — more comfortable on the skin than conventional currents.' },
    indications: {
      ar: ['ألم عضلي هيكلي حاد أو مزمن', 'ألم أسفل الظهر والرقبة', 'ألم الركبة والكتف', 'تشنّج عضلي', 'ألم مع تورّم تحت حاد'],
      en: ['Acute or chronic musculoskeletal pain', 'Low back and neck pain', 'Knee and shoulder pain', 'Muscle spasm', 'Subacute pain with swelling']
    },
    contraindications: {
      ar: ['منظّم ضربات القلب أو أي جهاز إلكتروني مزروع', 'الحمل — فوق البطن والحوض وأسفل الظهر', 'فوق الجيب السباتي أو مقدمة الرقبة', 'عبر الصدر عند مرضى القلب', 'جلطة وريدية أو التهاب وريدي', 'أورام في منطقة العلاج', 'عدوى أو جلد مصاب', 'فقدان الإحساس أو صعوبة التواصل', 'صرع — فوق الرأس والرقبة', 'نزيف نشط', 'فوق العين'],
      en: ['Pacemaker or any implanted electronic device', 'Pregnancy — over the abdomen, pelvis and low back', 'Over the carotid sinus or front of the neck', 'Transthoracic placement in cardiac patients', 'Venous thrombosis or thrombophlebitis', 'Tumour in the treatment area', 'Infection or broken skin', 'Impaired sensation or inability to communicate', 'Epilepsy — over the head and neck', 'Active bleeding', 'Over the eye']
    }
  },
  {
    id: 'ipc',
    ar: 'ضغط هوائي متقطع',
    en: 'Intermittent pneumatic compression',
    what: { ar: 'أكمام بتتنفخ وتفضى بالتتابع من الطرف للجذع عشان تساعد رجوع السوائل وتقلّل التورّم.', en: 'Sleeves that inflate and deflate in sequence from the distal limb towards the trunk to help fluid return and reduce swelling.' },
    indications: {
      ar: ['تورّم تحت حاد بعد إصابة أو جراحة', 'الوذمة اللمفاوية — ضمن برنامج متخصص', 'قصور وريدي مزمن', 'استشفاء بعد تمرين تقيل'],
      en: ['Subacute swelling after injury or surgery', 'Lymphoedema — within a specialist programme', 'Chronic venous insufficiency', 'Recovery after heavy training']
    },
    contraindications: {
      ar: ['جلطة وريدية معروفة أو مشتبه فيها', 'التهاب وريدي حاد', 'فشل قلب غير مستقر أو وذمة رئوية', 'مرض شرياني طرفي شديد', 'عدوى أو التهاب خلوي في الطرف', 'كسر غير مستقر أو غير معالج', 'أورام غير معالجة في الطرف', 'جروح مفتوحة أو ترقيع جلد حديث تحت الكم', 'ضغط شديد غير منضبط', 'فقدان الإحساس أو تشوّه شديد في الطرف'],
      en: ['Known or suspected deep vein thrombosis', 'Acute thrombophlebitis', 'Unstable heart failure or pulmonary oedema', 'Severe peripheral arterial disease', 'Infection or cellulitis in the limb', 'Unstable or untreated fracture', 'Untreated malignancy in the limb', 'Open wounds or recent skin graft under the sleeve', 'Severe uncontrolled hypertension', 'Loss of sensation or severe limb deformity']
    }
  },
  {
    id: 'bfr',
    ar: 'تمرين مع تقييد تدفق الدم (BFR)',
    en: 'Blood-flow restriction (BFR) cuffs',
    what: { ar: 'كفّة بتقلّل الدم الراجع من العضلة جزئيًا فتقدر تبني قوة وحجم بأوزان خفيفة جدًا.', en: 'A cuff that partially restricts blood flow so strength and muscle size can be built with very light loads.' },
    indications: {
      ar: ['ضعف وضمور بعد جراحة (بموافقة الجرّاح)', 'لما الأوزان التقيلة ممنوعة أو مؤلمة', 'فقدان الكتلة العضلية عند كبار السن', 'مراحل مبكرة من تأهيل الأوتار والمفاصل'],
      en: ['Weakness and atrophy after surgery (with surgeon approval)', 'When heavy loads are not allowed or are painful', 'Muscle loss in older adults', 'Early-stage tendon and joint rehab']
    },
    contraindications: {
      ar: ['تاريخ جلطة وريدية أو رئوية أو اضطراب تجلّط', 'الحمل', 'مرض شرياني طرفي', 'ضغط غير منضبط', 'مرض قلب غير مستقر أو جلطة قلب حديثة', 'أنيميا منجلية', 'أورام نشطة', 'وذمة لمفاوية أو استئصال غدد لمفاوية في نفس الطرف', 'وصلة غسيل كلوي في نفس الطرف', 'عدوى أو جروح مفتوحة في الطرف', 'دوالي شديدة', 'تاريخ تكسّر عضلي (Rhabdomyolysis)', 'جراحة حديثة من غير موافقة الجرّاح'],
      en: ['History of DVT, pulmonary embolism or a clotting disorder', 'Pregnancy', 'Peripheral arterial disease', 'Uncontrolled hypertension', 'Unstable heart disease or recent heart attack', 'Sickle cell disease', 'Active cancer', 'Lymphoedema or lymph node removal in that limb', 'Dialysis fistula in that limb', 'Infection or open wounds in the limb', 'Severe varicose veins', 'History of rhabdomyolysis', 'Recent surgery without surgeon clearance']
    }
  },
  {
    id: 'wbv',
    ar: 'اهتزاز كامل للجسم',
    en: 'Whole-body vibration',
    what: { ar: 'منصة بتهتز بتردد محدد وبتنشّط العضلات وردود الفعل وانت واقف أو بتتمرن عليها.', en: 'A platform vibrating at a set frequency that activates muscles and reflexes while you stand or exercise on it.' },
    indications: {
      ar: ['تحسين التوازن عند كبار السن — كعامل مساعد', 'تنشيط عضلي قبل التمرين', 'دعم القوة عند اللي مش قادر على أوزان عالية'],
      en: ['Balance training in older adults — as an adjunct', 'Muscle activation before exercise', 'Supporting strength when high loads are not tolerated']
    },
    contraindications: {
      ar: ['الحمل', 'جلطة وريدية حديثة', 'كسر حديث أو جراحة حديثة أو مفصل صناعي حديث', 'منظّم ضربات القلب أو جهاز مزروع', 'صرع', 'انزلاق غضروفي حاد أو ألم ظهر حاد', 'انفصال شبكية أو جراحة عين حديثة', 'حصوات كلى أو مرارة', 'التهاب حاد أو عدوى', 'صداع نصفي شديد', 'هشاشة شديدة مع تاريخ كسور — بقرار الطبيب', 'دوخة أو اضطراب اتزان من الأذن الداخلية'],
      en: ['Pregnancy', 'Recent venous thrombosis', 'Recent fracture, recent surgery or recent joint replacement', 'Pacemaker or implanted device', 'Epilepsy', 'Acute disc herniation or acute back pain', 'Retinal detachment or recent eye surgery', 'Kidney or gallstones', 'Acute inflammation or infection', 'Severe migraine', 'Severe osteoporosis with fracture history — doctor decides', 'Vertigo or vestibular disorder']
    }
  },
  {
    id: 'hydro',
    ar: 'علاج مائي وحمامات متبادلة',
    en: 'Hydrotherapy and contrast baths',
    what: { ar: 'المية بدرجات حرارة مختلفة — حمام متبادل سخن وبارد، غطس في مية باردة، أو تمرين في حمام سباحة دافي بيشيل جزء من وزن الجسم.', en: 'Water at different temperatures — alternating warm and cold baths, cold-water immersion, or exercise in a warm pool that offloads part of body weight.' },
    indications: {
      ar: ['تورّم تحت حاد في اليد أو القدم أو الكاحل', 'استشفاء بعد مجهود عالي أو في الحر', 'خشونة المفاصل وألم الظهر المزمن — تمرين في المية', 'بداية التحميل بعد إصابة في الطرف السفلي'],
      en: ['Subacute swelling of the hand, foot or ankle', 'Recovery after high exertion or in the heat', 'Osteoarthritis and chronic back pain — water-based exercise', 'Early loading after a lower-limb injury']
    },
    contraindications: {
      ar: ['جروح مفتوحة أو عدوى جلدية', 'سلس بول أو براز — حمام السباحة', 'صرع غير منضبط — حمام السباحة', 'مرض قلب غير مستقر أو فشل قلب أو ضغط غير منضبط', 'مرض رئوي شديد — الغطس لحد الصدر', 'حساسية البرد أو ظاهرة رينو — المية الباردة', 'فقدان الإحساس بالحرارة', 'ضعف الدورة الدموية الطرفية — الحمام المتبادل', 'إصابة حادة أول 48 ساعة — المية الدافية', 'جلطة وريدية', 'الحمل — المية السخنة جدًا', 'الخوف الشديد من المية'],
      en: ['Open wounds or skin infection', 'Urinary or faecal incontinence — pool', 'Uncontrolled epilepsy — pool', 'Unstable heart disease, heart failure or uncontrolled hypertension', 'Severe respiratory disease — chest-deep immersion', 'Cold hypersensitivity or Raynaud’s — cold water', 'Loss of thermal sensation', 'Poor peripheral circulation — contrast baths', 'Acute injury in the first 48 hours — warm water', 'Venous thrombosis', 'Pregnancy — very hot water', 'Severe fear of water']
    }
  },
  {
    id: 'infrared',
    ar: 'لمبة أشعة تحت الحمراء',
    en: 'Infrared lamp',
    what: { ar: 'حرارة سطحية بالإشعاع من غير لمس — بتريّح العضلة وتجهّزها للإطالة أو العلاج اليدوي.', en: 'Superficial radiant heat without contact — relaxes muscle and prepares it for stretching or manual therapy.' },
    indications: {
      ar: ['تشنّج عضلي', 'تيبّس مزمن', 'ألم تحت حاد أو مزمن', 'قبل الإطالة أو العلاج اليدوي'],
      en: ['Muscle spasm', 'Chronic stiffness', 'Subacute or chronic pain', 'Before stretching or manual therapy']
    },
    contraindications: {
      ar: ['التهاب حاد أو إصابة جديدة أول 48-72 ساعة', 'نزيف أو اضطرابات نزيف', 'فقدان الإحساس بالحرارة', 'ضعف الدورة الدموية الطرفية', 'فوق العين مباشرة — نظارة حماية', 'سخونية', 'جلد متعرض لعلاج إشعاعي', 'أورام في المنطقة', 'جلد مصاب أو إكزيما نشطة', 'أدوية بتزوّد حساسية الجلد للضوء', 'الحمل — فوق البطن', 'فوق الخصيتين', 'ندبات أو ترقيع جلد حديث', 'مريض مش قادر يبلّغ بالإحساس'],
      en: ['Acute inflammation or fresh injury in the first 48–72 hours', 'Bleeding or bleeding disorders', 'Loss of thermal sensation', 'Poor peripheral circulation', 'Directly over the eye — use protective goggles', 'Fever', 'Skin that has received radiotherapy', 'Tumour in the area', 'Broken skin or active eczema', 'Photosensitising medicines', 'Pregnancy — over the abdomen', 'Over the testes', 'Fresh scars or recent skin grafts', 'Patient unable to report sensation']
    }
  },
];

export const MODALITY_PROTOCOLS_EXTRA = [
  /* ---------- أجهزة موجودة ---------- */
  {
    id: 'sw_elbow',
    modality: 'shockwave',
    ar: 'مرفق لاعب التنس المزمن',
    en: 'Chronic lateral elbow tendinopathy',
    note: { ar: 'مع برنامج تقوية متدرج لعضلات فرد الرسغ، وتجنّب مسار العصب الكعبري. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Pair with progressive wrist-extensor loading and avoid the radial nerve path. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'الضغط', en: 'Pressure', value: '1.5 – 2.5 بار' },
      { ar: 'النبضات', en: 'Pulses', value: '1500 – 2000' },
      { ar: 'التردد', en: 'Frequency', value: '8 – 10 هرتز' },
      { ar: 'الرأس', en: 'Applicator', value: '15 مم' },
    ],
    sessions: '3 – 5 جلسات',
    frequency: 'أسبوعيًا'
  },
  {
    id: 'sw_patellar',
    modality: 'shockwave',
    ar: 'وتر الرضفة المزمن',
    en: 'Chronic patellar tendinopathy',
    note: { ar: 'مع تمارين ثبات ثم تمارين تقيلة بطيئة. ممنوع عند المراهق اللي صفيحة النمو عنده لسه مفتوحة. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Combine with isometric then heavy slow resistance work. Not over an open growth plate in adolescents. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'الضغط', en: 'Pressure', value: '1.5 – 2.5 بار' },
      { ar: 'النبضات', en: 'Pulses', value: '2000' },
      { ar: 'التردد', en: 'Frequency', value: '8 – 10 هرتز' },
    ],
    sessions: '3 – 5 جلسات',
    frequency: 'أسبوعيًا'
  },
  {
    id: 'tens_postop',
    modality: 'tens',
    ar: 'ألم ما بعد الجراحة',
    en: 'Post-operative pain',
    note: { ar: 'الأقطاب حوالين الجرح مش عليه، وبموافقة الجرّاح. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Electrodes around the incision, never on it, with surgeon approval. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'التردد', en: 'Frequency', value: '80 – 100 هرتز' },
      { ar: 'عرض النبضة', en: 'Pulse width', value: '50 – 100 ميكروثانية' },
      { ar: 'الشدة', en: 'Intensity', value: 'تنميل قوي مريح بدون انقباض' },
      { ar: 'المدة', en: 'Duration', value: '30 – 45 دقيقة' },
    ],
    sessions: 'حسب الألم',
    frequency: 'حتى 3 مرات يوميًا'
  },
  {
    id: 'nmes_cast',
    modality: 'nmes',
    ar: 'ضمور بعد الجبس أو التثبيت',
    en: 'Atrophy after casting or immobilisation',
    note: { ar: 'بعد تأكيد التئام الكسر أو موافقة الطبيب، ومع انقباض إرادي في نفس الوقت. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Only once union is confirmed or the doctor approves, combined with a voluntary contraction. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'التردد', en: 'Frequency', value: '30 – 50 هرتز' },
      { ar: 'عرض النبضة', en: 'Pulse width', value: '200 – 300 ميكروثانية' },
      { ar: 'شغل/راحة', en: 'On/off', value: '10ث / 30ث' },
      { ar: 'التكرار', en: 'Reps', value: '10 – 15 انقباضة' },
    ],
    sessions: '12 – 18 جلسة',
    frequency: '3 مرات أسبوعيًا'
  },
  {
    id: 'laser_knee_oa',
    modality: 'laser',
    ar: 'خشونة الركبة',
    en: 'Knee osteoarthritis',
    note: { ar: 'نقط على خط المفصل من الناحيتين، ونظارة حماية للمريض والأخصائي. مساعد للتمرين مش بديل. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Points along both sides of the joint line, with protective eyewear for patient and clinician. An adjunct to exercise, not a replacement. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'الطول الموجي', en: 'Wavelength', value: '808 – 904 نانومتر' },
      { ar: 'الجرعة لكل نقطة', en: 'Dose per point', value: '2 – 4 جول' },
      { ar: 'النقاط', en: 'Points', value: '6 – 8 نقط' },
    ],
    sessions: '8 – 12 جلسة',
    frequency: '2 – 3 مرات أسبوعيًا'
  },
  {
    id: 'dia_stiffness',
    modality: 'diathermy',
    ar: 'تيبّس مفصلي مزمن',
    en: 'Chronic joint stiffness',
    note: { ar: 'شيل أي معدن واتأكد من الإحساس بالحرارة قبل كل جلسة، وبعدها حركة وإطالة على طول. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Remove all metal and check thermal sensation before every session, then move and stretch straight after. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'التردد', en: 'Frequency', value: '27.12 ميجاهرتز' },
      { ar: 'النمط', en: 'Mode', value: 'مستمر' },
      { ar: 'الجرعة', en: 'Dose', value: 'دفا خفيف مريح' },
      { ar: 'المدة', en: 'Duration', value: '15 – 20 دقيقة' },
    ],
    sessions: '6 – 10 جلسات',
    frequency: '2 – 3 مرات أسبوعيًا'
  },
  {
    id: 'cryo_postop',
    modality: 'cryo',
    ar: 'تورّم بعد الجراحة',
    en: 'Post-operative swelling',
    note: { ar: 'دايمًا بحاجز بين التلج والجلد، وافحص الجلد كل جلسة، وتجنب الضغط الطويل فوق العصب الشظوي جنب الركبة. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Always with a barrier between cold and skin, check the skin every session, and avoid prolonged pressure over the fibular nerve near the knee. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'المدة', en: 'Duration', value: '10 – 15 دقيقة' },
      { ar: 'التكرار', en: 'Frequency', value: 'كل 2 – 3 ساعات وانت صاحي' },
      { ar: 'الضغط', en: 'Compression', value: 'خفيف لمتوسط حسب تعليمات الجرّاح' },
    ],
    sessions: 'أول 3 – 7 أيام',
    frequency: 'عدة مرات يوميًا'
  },
  {
    id: 'heat_back',
    modality: 'heat',
    ar: 'تيبّس مزمن في أسفل الظهر',
    en: 'Chronic low back stiffness',
    note: { ar: 'طبقات فوط كفاية وافحص الجلد بعد 5 دقايق، وبعدها تمارين حركة على طول. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Enough towel layers and check the skin after 5 minutes, followed straight away by mobility exercise. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'المدة', en: 'Duration', value: '15 – 20 دقيقة' },
      { ar: 'الطبقات', en: 'Layers', value: '6 – 8 طبقات فوط' },
      { ar: 'الحرارة', en: 'Temperature', value: 'دفا مريح — مش سخونية' },
    ],
    sessions: 'كل جلسة',
    frequency: 'قبل التمرين'
  },
  {
    id: 'cup_back',
    modality: 'cupping',
    ar: 'شد عضلات الظهر المزمن',
    en: 'Chronic back muscle tightness',
    note: { ar: 'كاسات ثابتة جنب العمود الفقري مش عليه، وبلّغ المريض إن العلامات مؤقتة. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Static cups beside the spine, not on it, and tell the patient the marks are temporary. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'عدد الكاسات', en: 'Cups', value: '4 – 6' },
      { ar: 'الشفط', en: 'Suction', value: 'خفيف لمتوسط' },
      { ar: 'المدة', en: 'Duration', value: '5 – 10 دقايق' },
    ],
    sessions: '4 – 6 جلسات',
    frequency: 'أسبوعيًا'
  },
  {
    id: 'dn_trapezius',
    modality: 'drynee',
    ar: 'نقط مؤلمة في العضلة شبه المنحرفة العلوية',
    en: 'Upper trapezius trigger points',
    note: { ar: 'للأخصائي المدرّب بس. مسك العضلة بين الصوابع واتجاه الإبرة بعيد عن قمة الرئة. ألم بعد الجلسة لمدة 24-48 ساعة طبيعي. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Trained clinicians only. Pincer grip, needle directed away from the lung apex. Post-needling soreness for 24–48 hours is normal. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'الإبرة', en: 'Needle', value: '0.25 × 30 مم' },
      { ar: 'النقاط', en: 'Points', value: '1 – 3 نقط' },
      { ar: 'التقنية', en: 'Technique', value: 'مسك بين الصوابع' },
    ],
    sessions: '3 – 6 جلسات',
    frequency: 'أسبوعيًا'
  },

  /* ---------- أجهزة جديدة ---------- */
  {
    id: 'ifc_acute',
    modality: 'ifc',
    ar: 'ألم تحت حاد مع تورّم',
    en: 'Subacute pain with swelling',
    note: { ar: 'أربع أقطاب متقاطعة حوالين المنطقة، وتردد نبض عالي للتسكين. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Four electrodes crossing around the area, with a high beat frequency for pain relief. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'التردد الحامل', en: 'Carrier frequency', value: '4000 هرتز' },
      { ar: 'تردد النبض', en: 'Beat frequency', value: '80 – 120 هرتز' },
      { ar: 'الأقطاب', en: 'Electrodes', value: '4 أقطاب متقاطعة' },
      { ar: 'المدة', en: 'Duration', value: '15 – 20 دقيقة' },
    ],
    sessions: '6 – 10 جلسات',
    frequency: '3 – 5 مرات أسبوعيًا'
  },
  {
    id: 'ifc_chronic',
    modality: 'ifc',
    ar: 'ألم مزمن في الظهر أو الركبة',
    en: 'Chronic back or knee pain',
    note: { ar: 'تردد نبض منخفض مع تمرين نشط في نفس الخطة — مش علاج لوحده. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Low beat frequency within a plan that includes active exercise — not a standalone treatment. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'التردد الحامل', en: 'Carrier frequency', value: '4000 هرتز' },
      { ar: 'تردد النبض', en: 'Beat frequency', value: '1 – 10 هرتز' },
      { ar: 'الشدة', en: 'Intensity', value: 'تنميل قوي مريح' },
      { ar: 'المدة', en: 'Duration', value: '20 – 30 دقيقة' },
    ],
    sessions: '8 – 12 جلسة',
    frequency: '3 مرات أسبوعيًا'
  },
  {
    id: 'ipc_oedema',
    modality: 'ipc',
    ar: 'تورّم الطرف السفلي بعد إصابة أو جراحة',
    en: 'Lower-limb swelling after injury or surgery',
    note: { ar: 'لازم استبعاد الجلطة الوريدية الأول، والطرف مرفوع أثناء الجلسة. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Rule out deep vein thrombosis first, with the limb elevated during the session. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'الضغط', en: 'Pressure', value: '30 – 50 مم زئبق' },
      { ar: 'نفخ/تفريغ', en: 'Inflate/deflate', value: '45ث / 15ث' },
      { ar: 'النمط', en: 'Mode', value: 'متتابع من الطرف للجذع' },
      { ar: 'المدة', en: 'Duration', value: '30 – 45 دقيقة' },
    ],
    sessions: '6 – 10 جلسات',
    frequency: 'يوميًا أو يوم بعد يوم'
  },
  {
    id: 'ipc_recovery',
    modality: 'ipc',
    ar: 'استشفاء بعد تمرين تقيل',
    en: 'Recovery after heavy training',
    note: { ar: 'تأثيره الأساسي على الإحساس بالتعافي — مكمّل للنوم والأكل مش بديل. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Its main effect is on perceived recovery — a complement to sleep and nutrition, not a substitute. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'الضغط', en: 'Pressure', value: '40 – 60 مم زئبق' },
      { ar: 'النمط', en: 'Mode', value: 'متتابع' },
      { ar: 'المدة', en: 'Duration', value: '20 – 30 دقيقة' },
    ],
    sessions: 'حسب الحمل',
    frequency: 'بعد التمارين التقيلة'
  },
  {
    id: 'bfr_lower',
    modality: 'bfr',
    ar: 'تقوية الطرف السفلي بأوزان خفيفة',
    en: 'Low-load lower-limb strengthening',
    note: { ar: 'اقيس ضغط الانسداد الكامل (LOP) الأول، وافحص عوامل خطر الجلطة قبل أي جلسة. بعد الجراحة بموافقة الجرّاح بس. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Measure limb occlusion pressure (LOP) first and screen clotting risk before any session. After surgery only with surgeon approval. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'الضغط', en: 'Pressure', value: '60 – 80٪ من LOP' },
      { ar: 'الحمل', en: 'Load', value: '20 – 30٪ من أقصى تكرار' },
      { ar: 'المجموعات', en: 'Sets', value: '30 – 15 – 15 – 15 تكرار' },
      { ar: 'الراحة', en: 'Rest', value: '30 ثانية بين المجموعات' },
      { ar: 'أقصى وقت للكفّة', en: 'Max cuff time', value: '5 – 10 دقايق لكل تمرين' },
    ],
    sessions: '12 – 18 جلسة',
    frequency: '2 – 3 مرات أسبوعيًا'
  },
  {
    id: 'bfr_upper',
    modality: 'bfr',
    ar: 'تقوية الطرف العلوي بأوزان خفيفة',
    en: 'Low-load upper-limb strengthening',
    note: { ar: 'ضغط أقل من الرجل، والكفّة في أعلى الدراع. وقّف فورًا لو حصل تنميل أو تغيّر لون أو ألم غير متناسب. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Lower pressure than the leg, cuff on the upper arm. Stop at once for numbness, colour change or disproportionate pain. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'الضغط', en: 'Pressure', value: '40 – 50٪ من LOP' },
      { ar: 'الحمل', en: 'Load', value: '20 – 30٪ من أقصى تكرار' },
      { ar: 'المجموعات', en: 'Sets', value: '30 – 15 – 15 – 15 تكرار' },
      { ar: 'الراحة', en: 'Rest', value: '30 ثانية بين المجموعات' },
    ],
    sessions: '12 – 18 جلسة',
    frequency: '2 – 3 مرات أسبوعيًا'
  },
  {
    id: 'wbv_balance',
    modality: 'wbv',
    ar: 'توازن وقوة عند كبار السن',
    en: 'Balance and strength in older adults',
    note: { ar: 'ركب مثنية شوية (مش مفرودة) عشان الاهتزاز ميوصلش للراس، ومع مسكة جنب المنصة. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Knees slightly bent (not locked) so vibration does not travel to the head, with a handrail beside the platform. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'التردد', en: 'Frequency', value: '20 – 30 هرتز' },
      { ar: 'السعة', en: 'Amplitude', value: '1 – 2 مم (منخفضة)' },
      { ar: 'مدة الدفعة', en: 'Bout', value: '30 – 60 ثانية' },
      { ar: 'الدفعات', en: 'Bouts', value: '5 – 8 مع راحة 60 ثانية' },
    ],
    sessions: '16 – 24 جلسة',
    frequency: '2 – 3 مرات أسبوعيًا'
  },
  {
    id: 'wbv_activation',
    modality: 'wbv',
    ar: 'تنشيط عضلي قبل التمرين',
    en: 'Pre-exercise muscle activation',
    note: { ar: 'سكوات خفيف ثابت أو ديناميكي على المنصة كجزء من الإحماء، مش بديل عنه. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Light static or dynamic squats on the platform as part of the warm-up, not a replacement for it. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'التردد', en: 'Frequency', value: '25 – 35 هرتز' },
      { ar: 'السعة', en: 'Amplitude', value: '1 – 2 مم' },
      { ar: 'مدة الدفعة', en: 'Bout', value: '30 – 45 ثانية' },
      { ar: 'الدفعات', en: 'Bouts', value: '2 – 4' },
    ],
    sessions: 'كل جلسة',
    frequency: 'قبل التمرين'
  },
  {
    id: 'hydro_contrast',
    modality: 'hydro',
    ar: 'حمام متبادل لتورّم تحت حاد',
    en: 'Contrast bath for subacute swelling',
    note: { ar: 'بعد أول 72 ساعة، لليد أو القدم أو الكاحل. اختم بالبارد لو الهدف تقليل التورّم، واتأكد من الإحساس بالحرارة. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'After the first 72 hours, for the hand, foot or ankle. Finish on cold when the goal is swelling, and confirm thermal sensation. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'المية الدافية', en: 'Warm water', value: '38 – 40 مئوية' },
      { ar: 'المية الباردة', en: 'Cold water', value: '10 – 15 مئوية' },
      { ar: 'النسبة', en: 'Ratio', value: '3 – 4 دقايق دافي / 1 دقيقة بارد' },
      { ar: 'الدورات', en: 'Cycles', value: '4 – 5 دورات' },
    ],
    sessions: '6 – 10 جلسات',
    frequency: 'يوميًا'
  },
  {
    id: 'hydro_cwi',
    modality: 'hydro',
    ar: 'غطس في مية باردة للاستشفاء',
    en: 'Cold-water immersion for recovery',
    note: { ar: 'مناسب في البطولات والجو الحار. تجنّبه روتينيًا بعد تمارين القوة والتضخيم لأنه ممكن يقلّل التكيّف العضلي. متستخدموش مع مرض قلب من غير موافقة الطبيب. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Useful in tournaments and hot conditions. Avoid it routinely after strength and hypertrophy sessions, as it may blunt muscle adaptation. Not for cardiac patients without medical approval. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'الحرارة', en: 'Temperature', value: '11 – 15 مئوية' },
      { ar: 'المدة', en: 'Duration', value: '10 – 15 دقيقة' },
      { ar: 'العمق', en: 'Depth', value: 'لحد الوسط' },
    ],
    sessions: 'حسب الحمل',
    frequency: 'بعد المجهود العالي'
  },
  {
    id: 'hydro_pool_oa',
    modality: 'hydro',
    ar: 'تمرين في المية لخشونة المفاصل وألم الظهر',
    en: 'Aquatic exercise for osteoarthritis and back pain',
    note: { ar: 'المية بتشيل جزء من الوزن وبتسمح بحركة أسهل، وبعدين بنحوّل التمرين للأرض تدريجيًا. إشراف دايم في الحمام. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Water offloads body weight for easier movement, then exercise progresses gradually to land. Constant supervision in the pool. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'حرارة المية', en: 'Water temperature', value: '32 – 35 مئوية' },
      { ar: 'العمق', en: 'Depth', value: 'من الوسط للصدر' },
      { ar: 'المدة', en: 'Duration', value: '30 – 45 دقيقة' },
    ],
    sessions: '12 – 18 جلسة',
    frequency: '2 – 3 مرات أسبوعيًا'
  },
  {
    id: 'ir_spasm',
    modality: 'infrared',
    ar: 'تشنّج عضلي قبل الإطالة',
    en: 'Muscle spasm before stretching',
    note: { ar: 'اللمبة عمودية على الجلد، ونظارة حماية، وافحص الجلد كل 5 دقايق. إعدادات بداية — عدّل حسب دليل الجهاز وتقديرك الإكلينيكي.', en: 'Lamp perpendicular to the skin, protective goggles, and check the skin every 5 minutes. Starting parameters — adjust to the device manual and clinical judgement.' },
    settings: [
      { ar: 'المسافة', en: 'Distance', value: '50 – 75 سم' },
      { ar: 'المدة', en: 'Duration', value: '10 – 15 دقيقة' },
      { ar: 'الإحساس', en: 'Sensation', value: 'دفا خفيف مريح' },
    ],
    sessions: '6 – 10 جلسات',
    frequency: '2 – 3 مرات أسبوعيًا'
  },
];
