/*
 * ADAM — مكتبة قوالب التأهيل
 *
 * ⚠️ مهم: دي قوالب مبدئية مبنية على مبادئ التأهيل المتعارف عليها
 * (التدرج في التحميل، ومعايير الانتقال بين المراحل).
 * هي نقطة بداية توفّر وقت الكتابة — مش بديل عن تقييمك المهني.
 * راجع وعدّل أي قالب قبل ما تسنده لعميل.
 *
 * IMPORTANT: these are starting-point drafts based on generally
 * accepted rehab principles. Always review and adapt before assigning.
 */

export const REHAB_TEMPLATES = [

  /* ==================== الكتف ==================== */
  {
    id: 'shoulder_rc_tendinopathy',
    bodyPart: 'shoulder',
    name: { ar: 'التهاب أوتار الكفة المدورة', en: 'Rotator cuff tendinopathy' },
    about: {
      ar: 'إجهاد في أوتار الكفة المدورة، غالبًا من تكرار الحركة فوق مستوى الكتف أو زيادة الحمل بسرعة. الألم بيبان مع الرفع الجانبي والحركات فوق الرأس، وأحيانًا بالليل عند النوم على الجنب المصاب.\n\nالتأهيل بيعتمد على تقليل الحمل المؤلم مؤقتًا، وتحسين تحكم لوح الكتف، وبعدين تقوية تدريجية للأوتار.',
      en: 'Overload of the rotator cuff tendons, usually from repetitive overhead work or a fast jump in training load. Pain shows up with lateral raises and overhead movement, sometimes at night lying on that side.\n\nRehab means temporarily reducing painful load, improving scapular control, then progressively loading the tendon.'
    },
    phases: [
      { name: { ar: 'تهدئة وحماية', en: 'Calm and protect' },
        goal: { ar: 'تقليل الألم والحفاظ على مدى الحركة بدون استفزاز', en: 'Reduce pain, keep range without provoking it' },
        criteria: { ar: 'الألم أقل من 3/10 في الراحة وأثناء الحركة اليومية', en: 'Pain under 3/10 at rest and in daily movement' },
        exercises: [
          { name: { ar: 'بندول الكتف', en: 'Pendulum swings' }, sets: 2, reps: '30 ثانية' },
          { name: { ar: 'انزلاق على الحائط', en: 'Wall slides' }, sets: 3, reps: '10' },
          { name: { ar: 'شد لوح الكتف للخلف', en: 'Scapular retraction' }, sets: 3, reps: '12' }
        ] },
      { name: { ar: 'استعادة التحكم', en: 'Restore control' },
        goal: { ar: 'تحكم أفضل في لوح الكتف وبداية تحميل خفيف', en: 'Better scapular control and light loading' },
        criteria: { ar: 'مدى حركة كامل بدون ألم + تحكم جيد في الرفع', en: 'Full pain-free range with good control on elevation' },
        exercises: [
          { name: { ar: 'دوران خارجي بالأستك', en: 'Band external rotation' }, sets: 3, reps: '15' },
          { name: { ar: 'دوران داخلي بالأستك', en: 'Band internal rotation' }, sets: 3, reps: '15' },
          { name: { ar: 'شد الأستك للجانبين', en: 'Band pull-apart' }, sets: 3, reps: '15' }
        ] },
      { name: { ar: 'تقوية تدريجية', en: 'Progressive strengthening' },
        goal: { ar: 'بناء قوة الكفة المدورة وعضلات الظهر العلوي', en: 'Build cuff and upper-back strength' },
        criteria: { ar: 'تحمّل تحميل متوسط بدون ألم بعدها بـ24 ساعة', en: 'Tolerates moderate load with no next-day pain' },
        exercises: [
          { name: { ar: 'رفرفة جانبية خفيفة', en: 'Light lateral raise' }, sets: 3, reps: '12' },
          { name: { ar: 'تجديف بالأستك', en: 'Band row' }, sets: 3, reps: '12' },
          { name: { ar: 'رفع أمامي محدود المدى', en: 'Front raise, limited range' }, sets: 3, reps: '12' }
        ] },
      { name: { ar: 'العودة للنشاط', en: 'Return to activity' },
        goal: { ar: 'الرجوع للحركات فوق الرأس والتحميل الكامل', en: 'Return to overhead work and full load' },
        criteria: { ar: 'أداء الحركات فوق الرأس بحمل كامل بدون ألم', en: 'Full-load overhead work without pain' },
        exercises: [
          { name: { ar: 'ضغط كتف تدريجي', en: 'Progressive shoulder press' }, sets: 4, reps: '8' },
          { name: { ar: 'سحب علوي', en: 'Lat pulldown' }, sets: 3, reps: '10' },
          { name: { ar: 'حمل فوق الرأس ثابت', en: 'Overhead carry / hold' }, sets: 3, reps: '30 ثانية' }
        ] }
    ]
  },

  {
    id: 'shoulder_frozen',
    bodyPart: 'shoulder',
    name: { ar: 'الكتف المتجمد', en: 'Frozen shoulder (adhesive capsulitis)' },
    about: {
      ar: 'تيبّس تدريجي في محفظة الكتف بيقلل مدى الحركة بشكل واضح، خصوصًا الدوران الخارجي. بيمر بمراحل: ألم متزايد، ثم تيبّس، ثم تحسّن تدريجي — وممكن ياخد شهور.\n\nالتأهيل صبور وتدريجي: إطالة منتظمة لطيفة، وتجنّب الحركات العنيفة اللي بتزود الالتهاب.',
      en: 'Progressive stiffening of the shoulder capsule that markedly limits range, especially external rotation. It moves through painful, frozen, then thawing stages and can take months.\n\nRehab is patient and gradual: regular gentle stretching, avoiding aggressive movement that flares it.'
    },
    phases: [
      { name: { ar: 'مرحلة الألم', en: 'Painful stage' },
        goal: { ar: 'السيطرة على الألم والحفاظ على أي مدى متاح', en: 'Control pain, preserve available range' },
        criteria: { ar: 'نوم أفضل وألم ليلي أقل', en: 'Better sleep, less night pain' },
        exercises: [
          { name: { ar: 'بندول الكتف', en: 'Pendulum swings' }, sets: 3, reps: '30 ثانية' },
          { name: { ar: 'إطالة سلبية بالعصا', en: 'Assisted stick stretch' }, sets: 3, reps: '20 ثانية' }
        ] },
      { name: { ar: 'استعادة المدى', en: 'Regain range' },
        goal: { ar: 'زيادة مدى الحركة تدريجيًا في كل الاتجاهات', en: 'Gradually increase range in all directions' },
        criteria: { ar: 'زيادة ملحوظة في الدوران الخارجي والرفع', en: 'Clear gain in external rotation and elevation' },
        exercises: [
          { name: { ar: 'زحف الأصابع على الحائط', en: 'Wall finger walk' }, sets: 3, reps: '10' },
          { name: { ar: 'إطالة عبر الصدر', en: 'Cross-body stretch' }, sets: 3, reps: '30 ثانية' },
          { name: { ar: 'دوران خارجي بالعصا', en: 'Stick external rotation' }, sets: 3, reps: '12' }
        ] },
      { name: { ar: 'تقوية', en: 'Strengthening' },
        goal: { ar: 'استرجاع القوة بعد تحسّن المدى', en: 'Rebuild strength as range returns' },
        criteria: { ar: 'قوة مقاربة للجهة السليمة', en: 'Strength approaching the other side' },
        exercises: [
          { name: { ar: 'دوران خارجي بالأستك', en: 'Band external rotation' }, sets: 3, reps: '15' },
          { name: { ar: 'تجديف بالأستك', en: 'Band row' }, sets: 3, reps: '12' }
        ] },
      { name: { ar: 'العودة الكاملة', en: 'Full return' },
        goal: { ar: 'وظيفة كاملة في الأنشطة اليومية والتمرين', en: 'Full function in daily life and training' },
        criteria: { ar: 'مدى ووظيفة قريبين من الطبيعي', en: 'Near-normal range and function' },
        exercises: [
          { name: { ar: 'ضغط كتف خفيف', en: 'Light shoulder press' }, sets: 3, reps: '10' },
          { name: { ar: 'سحب علوي', en: 'Lat pulldown' }, sets: 3, reps: '10' }
        ] }
    ]
  },

  /* ==================== الرقبة ==================== */
  {
    id: 'neck_strain',
    bodyPart: 'neck',
    name: { ar: 'شد وآلام الرقبة', en: 'Neck strain / mechanical neck pain' },
    about: {
      ar: 'ألم وتيبّس في الرقبة غالبًا من وضع الجلوس الطويل، أو النوم بوضع غلط، أو إجهاد عضلي. بيصاحبه أحيانًا صداع من قاعدة الجمجمة وشد في الترابيس.\n\nالتأهيل بيركز على تحسين وضع الرأس والرقبة، وتقوية العضلات العميقة، وكسر فترات الجلوس الطويلة.',
      en: 'Neck pain and stiffness, commonly from prolonged sitting, awkward sleeping posture, or muscular overload. Often comes with headaches from the skull base and tight traps.\n\nRehab focuses on head and neck positioning, deep neck flexor strength, and breaking up long sitting bouts.'
    },
    phases: [
      { name: { ar: 'تهدئة', en: 'Settle symptoms' },
        goal: { ar: 'تقليل الألم والتشنج', en: 'Reduce pain and guarding' },
        criteria: { ar: 'ألم أقل وحركة أسهل في الاتجاهات الأساسية', en: 'Less pain, easier movement in main directions' },
        exercises: [
          { name: { ar: 'سحب الذقن للخلف', en: 'Chin tuck' }, sets: 3, reps: '10' },
          { name: { ar: 'دوران الرقبة اللطيف', en: 'Gentle neck rotation' }, sets: 2, reps: '10 لكل جهة' },
          { name: { ar: 'إطالة الترابيس العلوية', en: 'Upper trap stretch' }, sets: 3, reps: '30 ثانية' }
        ] },
      { name: { ar: 'تحكم ووضعية', en: 'Control and posture' },
        goal: { ar: 'تحسين وضعية الرأس وتحمّل الجلوس', en: 'Improve head posture and sitting tolerance' },
        criteria: { ar: 'جلوس ساعة بدون زيادة الألم', en: 'One hour sitting without pain increase' },
        exercises: [
          { name: { ar: 'سحب الذقن بالثبات', en: 'Chin tuck hold' }, sets: 3, reps: '10 ثواني' },
          { name: { ar: 'شد لوح الكتف', en: 'Scapular retraction' }, sets: 3, reps: '12' },
          { name: { ar: 'إطالة العضلة الرافعة للكتف', en: 'Levator scapulae stretch' }, sets: 3, reps: '30 ثانية' }
        ] },
      { name: { ar: 'تقوية', en: 'Strengthening' },
        goal: { ar: 'تقوية الرقبة والظهر العلوي', en: 'Strengthen neck and upper back' },
        criteria: { ar: 'تحمّل يوم عمل كامل بدون أعراض', en: 'Tolerates a full workday symptom-free' },
        exercises: [
          { name: { ar: 'تجديف بالأستك', en: 'Band row' }, sets: 3, reps: '15' },
          { name: { ar: 'شد الأستك للجانبين', en: 'Band pull-apart' }, sets: 3, reps: '15' },
          { name: { ar: 'مقاومة إيزومترية للرقبة', en: 'Isometric neck resistance' }, sets: 3, reps: '10 ثواني' }
        ] },
      { name: { ar: 'وقاية', en: 'Prevention' },
        goal: { ar: 'الحفاظ على النتيجة ومنع الرجوع', en: 'Maintain gains and prevent recurrence' },
        criteria: { ar: 'مفيش أعراض لمدة أسبوعين', en: 'Two weeks symptom-free' },
        exercises: [
          { name: { ar: 'روتين إطالة يومي', en: 'Daily mobility routine' }, sets: 1, reps: '5 دقائق' },
          { name: { ar: 'تقوية الظهر العلوي', en: 'Upper back strengthening' }, sets: 3, reps: '12' }
        ] }
    ]
  },

  /* ==================== أسفل الظهر ==================== */
  {
    id: 'low_back_nonspecific',
    bodyPart: 'lower_back',
    name: { ar: 'آلام أسفل الظهر غير النوعية', en: 'Non-specific low back pain' },
    about: {
      ar: 'أشهر نوع من آلام الظهر، ومش بيكون ليه سبب تركيبي واضح. غالبًا بيتحسن مع الحركة التدريجية، والراحة الطويلة بتأخّر التحسن.\n\nالتأهيل بيركز على استعادة الثقة في الحركة، وتحكم الجذع، وتحميل تدريجي — مش على الراحة.',
      en: 'The most common type of back pain, without a clear structural cause. It usually improves with graded movement; prolonged rest tends to slow recovery.\n\nRehab focuses on restoring confidence in movement, trunk control, and graded loading rather than rest.'
    },
    phases: [
      { name: { ar: 'حركة مبكرة', en: 'Early movement' },
        goal: { ar: 'تقليل الألم وكسر الخوف من الحركة', en: 'Reduce pain and fear of movement' },
        criteria: { ar: 'المشي 15 دقيقة بدون زيادة ألم', en: 'Walk 15 minutes without pain increase' },
        exercises: [
          { name: { ar: 'إمالة الحوض', en: 'Pelvic tilt' }, sets: 3, reps: '10' },
          { name: { ar: 'ركبة للصدر', en: 'Knee to chest' }, sets: 3, reps: '20 ثانية' },
          { name: { ar: 'قطة وبقرة', en: 'Cat-cow' }, sets: 3, reps: '10' },
          { name: { ar: 'مشي خفيف', en: 'Light walking' }, sets: 1, reps: '10 دقائق' }
        ] },
      { name: { ar: 'تحكم الجذع', en: 'Trunk control' },
        goal: { ar: 'تفعيل عضلات الجذع العميقة', en: 'Activate deep trunk muscles' },
        criteria: { ar: 'ثبات البلانك 30 ثانية بتحكم جيد', en: '30-second plank with good control' },
        exercises: [
          { name: { ar: 'الكلب الطائر', en: 'Bird dog' }, sets: 3, reps: '10 لكل جهة' },
          { name: { ar: 'جسر الحوض', en: 'Glute bridge' }, sets: 3, reps: '12' },
          { name: { ar: 'بلانك جانبي على الركبة', en: 'Side plank from knees' }, sets: 3, reps: '20 ثانية' }
        ] },
      { name: { ar: 'تحميل تدريجي', en: 'Graded loading' },
        goal: { ar: 'إدخال أنماط الرفع بحمل خفيف', en: 'Reintroduce hinge and squat patterns' },
        criteria: { ar: 'رفع وزن خفيف بتكنيك سليم بدون ألم', en: 'Light lifting with sound technique, pain-free' },
        exercises: [
          { name: { ar: 'سكوات بوزن الجسم', en: 'Bodyweight squat' }, sets: 3, reps: '12' },
          { name: { ar: 'هيب هينج بعصا', en: 'Hip hinge with dowel' }, sets: 3, reps: '12' },
          { name: { ar: 'حمل جانبي (سوتكيس)', en: 'Suitcase carry' }, sets: 3, reps: '20 متر' }
        ] },
      { name: { ar: 'العودة الكاملة', en: 'Full return' },
        goal: { ar: 'الرجوع للتمرين والشغل بحمل كامل', en: 'Return to full training and work' },
        criteria: { ar: 'تحمّل الحمل الكامل بدون أعراض', en: 'Tolerates full load symptom-free' },
        exercises: [
          { name: { ar: 'ديدليفت تدريجي', en: 'Progressive deadlift' }, sets: 4, reps: '8' },
          { name: { ar: 'سكوات بحمل', en: 'Loaded squat' }, sets: 4, reps: '8' },
          { name: { ar: 'حمل مزدوج (فارمر)', en: "Farmer's carry" }, sets: 3, reps: '30 متر' }
        ] }
    ]
  },

  /* ==================== الكوع ==================== */
  {
    id: 'elbow_lateral_epicondylalgia',
    bodyPart: 'elbow',
    name: { ar: 'مرفق لاعب التنس', en: "Tennis elbow (lateral epicondylalgia)" },
    about: {
      ar: 'ألم على الجانب الخارجي للكوع بسبب إجهاد أوتار العضلات الباسطة للرسغ. بيزيد مع القبضة القوية، ورفع الأشياء بكف لأسفل، والمصافحة.\n\nالتأهيل الأساسي فيه هو التحميل التدريجي للوتر — خصوصًا التمارين البطيئة في مرحلة الإطالة تحت المقاومة.',
      en: 'Pain on the outside of the elbow from overload of the wrist extensor tendons. Worse with gripping, lifting palm-down, and handshakes.\n\nThe core of rehab is progressive tendon loading — especially slow eccentric work.'
    },
    phases: [
      { name: { ar: 'تقليل التهيّج', en: 'Reduce irritability' },
        goal: { ar: 'تقليل الألم وتعديل الأنشطة المستفزة', en: 'Reduce pain and modify provocative activity' },
        criteria: { ar: 'ألم القبضة أقل من 3/10', en: 'Gripping pain under 3/10' },
        exercises: [
          { name: { ar: 'قبضة إيزومترية خفيفة', en: 'Isometric grip hold' }, sets: 4, reps: '30 ثانية' },
          { name: { ar: 'إطالة باسطات الرسغ', en: 'Wrist extensor stretch' }, sets: 3, reps: '30 ثانية' }
        ] },
      { name: { ar: 'تحميل إيزومتري', en: 'Isometric loading' },
        goal: { ar: 'تحميل الوتر بدون حركة مؤلمة', en: 'Load the tendon without painful movement' },
        criteria: { ar: 'تحمّل التمرين الإيزومتري بدون ألم بعده', en: 'Tolerates isometrics with no after-pain' },
        exercises: [
          { name: { ar: 'ثبات بسط الرسغ', en: 'Wrist extension hold' }, sets: 4, reps: '30 ثانية' },
          { name: { ar: 'ضغط كرة مطاطية', en: 'Ball squeeze' }, sets: 3, reps: '15' }
        ] },
      { name: { ar: 'تحميل إيكسنتريك', en: 'Eccentric loading' },
        goal: { ar: 'إعادة بناء تحمّل الوتر', en: 'Rebuild tendon capacity' },
        criteria: { ar: 'قوة قبضة قريبة من الجهة السليمة', en: 'Grip strength near the other side' },
        exercises: [
          { name: { ar: 'بسط رسغ بطيء بالنزول', en: 'Slow eccentric wrist extension' }, sets: 3, reps: '15' },
          { name: { ar: 'دوران الساعد بالدمبل', en: 'Dumbbell forearm rotation' }, sets: 3, reps: '15' }
        ] },
      { name: { ar: 'العودة للنشاط', en: 'Return to activity' },
        goal: { ar: 'الرجوع للقبضة الكاملة والرياضة', en: 'Return to full gripping and sport' },
        criteria: { ar: 'أداء الأنشطة المستفزة سابقًا بدون ألم', en: 'Previously provocative tasks now pain-free' },
        exercises: [
          { name: { ar: 'تمارين قبضة تدريجية', en: 'Progressive grip work' }, sets: 3, reps: '12' },
          { name: { ar: 'تجديف بالدمبل', en: 'Dumbbell row' }, sets: 3, reps: '12' }
        ] }
    ]
  },

  /* ==================== الرسغ ==================== */
  {
    id: 'wrist_sprain',
    bodyPart: 'wrist',
    name: { ar: 'التواء الرسغ', en: 'Wrist sprain' },
    about: {
      ar: 'إجهاد أو تمزق جزئي في أربطة الرسغ، غالبًا بعد الوقوع على اليد المفرودة. بيصاحبه ألم وتورم وصعوبة في تحميل الوزن على اليد.\n\nالتأهيل بيبدأ بالحماية، وبعدين استعادة المدى، وبعدها تحميل تدريجي على الكف.',
      en: 'Strain or partial tear of the wrist ligaments, often after falling on an outstretched hand. Comes with pain, swelling, and difficulty weight-bearing through the hand.\n\nRehab moves from protection, to restoring range, then graded loading through the palm.'
    },
    phases: [
      { name: { ar: 'حماية', en: 'Protection' },
        goal: { ar: 'تقليل التورم والألم', en: 'Reduce swelling and pain' },
        criteria: { ar: 'تورم أقل وألم راحة بسيط', en: 'Less swelling, minimal resting pain' },
        exercises: [
          { name: { ar: 'رفع اليد لأعلى', en: 'Elevation' }, sets: 3, reps: '5 دقائق' },
          { name: { ar: 'تحريك الأصابع', en: 'Finger movement' }, sets: 3, reps: '15' }
        ] },
      { name: { ar: 'استعادة المدى', en: 'Restore range' },
        goal: { ar: 'مدى حركة كامل بدون ألم', en: 'Full pain-free range' },
        criteria: { ar: 'ثني وبسط الرسغ كامل', en: 'Full wrist flexion and extension' },
        exercises: [
          { name: { ar: 'ثني وبسط الرسغ', en: 'Wrist flexion/extension' }, sets: 3, reps: '15' },
          { name: { ar: 'دوران الساعد', en: 'Forearm rotation' }, sets: 3, reps: '15' }
        ] },
      { name: { ar: 'تقوية', en: 'Strengthening' },
        goal: { ar: 'استرجاع قوة القبضة والرسغ', en: 'Rebuild grip and wrist strength' },
        criteria: { ar: 'قوة قبضة 80% من الجهة السليمة', en: 'Grip at 80% of the other side' },
        exercises: [
          { name: { ar: 'ضغط كرة', en: 'Ball squeeze' }, sets: 3, reps: '15' },
          { name: { ar: 'كيرل رسغ خفيف', en: 'Light wrist curl' }, sets: 3, reps: '15' }
        ] },
      { name: { ar: 'تحميل كامل', en: 'Full loading' },
        goal: { ar: 'تحمّل الوزن على الكف', en: 'Tolerate weight-bearing through the hand' },
        criteria: { ar: 'أداء البلانك والضغط بدون ألم', en: 'Plank and push-up pain-free' },
        exercises: [
          { name: { ar: 'بلانك على الكف', en: 'Plank on hands' }, sets: 3, reps: '30 ثانية' },
          { name: { ar: 'ضغط على الحائط', en: 'Wall push-up' }, sets: 3, reps: '12' }
        ] }
    ]
  },

  /* ==================== الورك ==================== */
  {
    id: 'hip_gluteal_tendinopathy',
    bodyPart: 'hip',
    name: { ar: 'التهاب أوتار الألوية', en: 'Gluteal tendinopathy' },
    about: {
      ar: 'ألم على الجانب الخارجي للورك عند البروز العظمي، بيزيد مع النوم على الجنب، والوقوف على رجل واحدة، وصعود السلم.\n\nمهم جدًا تجنّب وضعيات ضغط الوتر (زي تقاطع الرجلين أو الوقوف بميل الحوض)، مع تحميل إيزومتري ثم تدريجي.',
      en: 'Pain on the outer hip over the bony point, worse lying on that side, standing on one leg, and climbing stairs.\n\nAvoiding tendon-compressing positions (crossing legs, hanging on one hip) matters a lot, alongside isometric then graded loading.'
    },
    phases: [
      { name: { ar: 'تقليل الضغط', en: 'Reduce compression' },
        goal: { ar: 'تجنّب الوضعيات الضاغطة وتقليل الألم', en: 'Avoid compressive positions, reduce pain' },
        criteria: { ar: 'نوم أفضل وألم جانبي أقل', en: 'Better sleep, less lateral hip pain' },
        exercises: [
          { name: { ar: 'ثبات إبعاد الورك', en: 'Isometric hip abduction' }, sets: 4, reps: '30 ثانية' },
          { name: { ar: 'جسر الحوض', en: 'Glute bridge' }, sets: 3, reps: '12' }
        ] },
      { name: { ar: 'تفعيل الألوية', en: 'Glute activation' },
        goal: { ar: 'تحسين تحكم الحوض', en: 'Improve pelvic control' },
        criteria: { ar: 'الوقوف على رجل واحدة 30 ثانية بثبات', en: '30-second steady single-leg stand' },
        exercises: [
          { name: { ar: 'المحارة (كلام شل)', en: 'Clamshell' }, sets: 3, reps: '15' },
          { name: { ar: 'إبعاد الورك جانبًا', en: 'Side-lying hip abduction' }, sets: 3, reps: '15' },
          { name: { ar: 'مشي جانبي بالأستك', en: 'Band lateral walk' }, sets: 3, reps: '15 خطوة' }
        ] },
      { name: { ar: 'تحميل وظيفي', en: 'Functional loading' },
        goal: { ar: 'تقوية على رجل واحدة', en: 'Build single-leg strength' },
        criteria: { ar: 'صعود السلم بدون ألم', en: 'Stairs without pain' },
        exercises: [
          { name: { ar: 'صعود صندوق', en: 'Step-up' }, sets: 3, reps: '10 لكل رجل' },
          { name: { ar: 'سكوات على رجل واحدة (جزئي)', en: 'Partial single-leg squat' }, sets: 3, reps: '10' }
        ] },
      { name: { ar: 'العودة للنشاط', en: 'Return to activity' },
        goal: { ar: 'الرجوع للجري والتمرين الكامل', en: 'Return to running and full training' },
        criteria: { ar: 'تحمّل النشاط بدون ألم لليوم التالي', en: 'No next-day pain after activity' },
        exercises: [
          { name: { ar: 'لانج', en: 'Lunge' }, sets: 3, reps: '12' },
          { name: { ar: 'ديدليفت رومانى على رجل', en: 'Single-leg RDL' }, sets: 3, reps: '10' }
        ] }
    ]
  },

  /* ==================== الركبة ==================== */
  {
    id: 'knee_patellofemoral',
    bodyPart: 'knee',
    name: { ar: 'ألم مفصل الرضفة الفخذي', en: 'Patellofemoral pain' },
    about: {
      ar: 'ألم حوالين أو خلف صابونة الركبة، بيزيد مع نزول السلم، والجلوس الطويل بركبة مثنية، والسكوات العميق.\n\nمعظم الحالات بتتحسن بتقوية الفخذ الأمامي والألوية، وتحسين التحكم في اتجاه الركبة أثناء الحركة، مع تعديل الحمل مؤقتًا.',
      en: 'Pain around or behind the kneecap, worse going downstairs, sitting long with a bent knee, and deep squatting.\n\nMost cases improve with quadriceps and glute strengthening, better knee-tracking control, and temporary load modification.'
    },
    phases: [
      { name: { ar: 'تقليل الألم', en: 'Reduce pain' },
        goal: { ar: 'تعديل الحمل وتفعيل الفخذ الأمامي', en: 'Modify load, activate the quads' },
        criteria: { ar: 'نزول السلم بألم أقل من 3/10', en: 'Stairs under 3/10 pain' },
        exercises: [
          { name: { ar: 'شد الفخذ الأمامي ثابت', en: 'Quad set' }, sets: 4, reps: '10 ثواني' },
          { name: { ar: 'رفع الرجل مفرودة', en: 'Straight leg raise' }, sets: 3, reps: '12' },
          { name: { ar: 'سكوات على الحائط (زاوية صغيرة)', en: 'Wall sit, shallow' }, sets: 3, reps: '20 ثانية' }
        ] },
      { name: { ar: 'استعادة القوة', en: 'Rebuild strength' },
        goal: { ar: 'تقوية الفخذ والألوية', en: 'Strengthen quads and glutes' },
        criteria: { ar: 'سكوات لزاوية 60 درجة بدون ألم', en: 'Squat to 60° pain-free' },
        exercises: [
          { name: { ar: 'سكوات جزئي', en: 'Partial squat' }, sets: 3, reps: '12' },
          { name: { ar: 'جسر الحوض', en: 'Glute bridge' }, sets: 3, reps: '15' },
          { name: { ar: 'صعود صندوق منخفض', en: 'Low step-up' }, sets: 3, reps: '10' }
        ] },
      { name: { ar: 'تحكم وحمل', en: 'Control and load' },
        goal: { ar: 'تحكم أفضل في الركبة تحت حمل', en: 'Better knee control under load' },
        criteria: { ar: 'نزول صندوق بتحكم بدون انحراف للركبة', en: 'Controlled step-down without knee collapse' },
        exercises: [
          { name: { ar: 'نزول من صندوق', en: 'Step-down' }, sets: 3, reps: '10' },
          { name: { ar: 'لانج ثابت', en: 'Split squat' }, sets: 3, reps: '10' },
          { name: { ar: 'ليج برس خفيف', en: 'Light leg press' }, sets: 3, reps: '12' }
        ] },
      { name: { ar: 'العودة للرياضة', en: 'Return to sport' },
        goal: { ar: 'الرجوع للجري والقفز', en: 'Return to running and jumping' },
        criteria: { ar: 'اختبار الوثب على رجل واحدة 90% من الجهة السليمة', en: 'Single-leg hop at 90% of the other side' },
        exercises: [
          { name: { ar: 'سكوات كامل', en: 'Full squat' }, sets: 4, reps: '10' },
          { name: { ar: 'قفز خفيف', en: 'Light jumping' }, sets: 3, reps: '10' },
          { name: { ar: 'جري تدريجي', en: 'Graded running' }, sets: 1, reps: '10 دقائق' }
        ] }
    ]
  },

  {
    id: 'knee_patellar_tendinopathy',
    bodyPart: 'knee',
    name: { ar: 'التهاب وتر الرضفة', en: 'Patellar tendinopathy' },
    about: {
      ar: 'ألم تحت صابونة الركبة مباشرة، شائع في رياضات القفز. الألم بيبان مع القفز والهبوط والسكوات العميق، وبيتحسن بالإحماء وبيرجع بعد النشاط.\n\nالعلاج الأساسي تحميل تدريجي للوتر: إيزومتري ← بطيء ثقيل ← تخزين طاقة (قفز).',
      en: 'Pain right below the kneecap, common in jumping sports. It shows with jumping, landing, and deep squats, often warming up during activity and returning after.\n\nThe mainstay is progressive tendon loading: isometric → heavy slow → energy storage (jumping).'
    },
    phases: [
      { name: { ar: 'إيزومتري', en: 'Isometric' },
        goal: { ar: 'تقليل الألم وتحميل الوتر بثبات', en: 'Reduce pain, load the tendon statically' },
        criteria: { ar: 'ألم أقل من 3/10 أثناء التمرين', en: 'Pain under 3/10 during exercise' },
        exercises: [
          { name: { ar: 'سكوات حائط ثابت', en: 'Wall sit hold' }, sets: 5, reps: '45 ثانية' },
          { name: { ar: 'ثبات بسط الركبة', en: 'Isometric knee extension' }, sets: 4, reps: '30 ثانية' }
        ] },
      { name: { ar: 'تحميل بطيء ثقيل', en: 'Heavy slow loading' },
        goal: { ar: 'بناء تحمّل الوتر', en: 'Build tendon capacity' },
        criteria: { ar: 'تحمّل التحميل الثقيل بدون ألم لليوم التالي', en: 'Heavy load with no next-day pain' },
        exercises: [
          { name: { ar: 'سكوات بطيء', en: 'Slow tempo squat' }, sets: 4, reps: '8' },
          { name: { ar: 'ليج برس بطيء', en: 'Slow leg press' }, sets: 4, reps: '8' },
          { name: { ar: 'سكوات بلغاري', en: 'Bulgarian split squat' }, sets: 3, reps: '10' }
        ] },
      { name: { ar: 'تخزين الطاقة', en: 'Energy storage' },
        goal: { ar: 'إدخال القفز والهبوط تدريجيًا', en: 'Reintroduce jumping and landing' },
        criteria: { ar: 'هبوط متحكّم فيه بدون ألم', en: 'Controlled landing, pain-free' },
        exercises: [
          { name: { ar: 'قفز على صندوق', en: 'Box jump' }, sets: 3, reps: '8' },
          { name: { ar: 'قفز في المكان', en: 'Pogo hops' }, sets: 3, reps: '15' }
        ] },
      { name: { ar: 'العودة للرياضة', en: 'Return to sport' },
        goal: { ar: 'الرجوع للتدريب الكامل', en: 'Return to full training' },
        criteria: { ar: 'أداء رياضي كامل بدون أعراض', en: 'Full sport performance symptom-free' },
        exercises: [
          { name: { ar: 'قفز بتغيير اتجاه', en: 'Change-of-direction hops' }, sets: 3, reps: '10' },
          { name: { ar: 'تدريب خاص بالرياضة', en: 'Sport-specific drills' }, sets: 3, reps: '10' }
        ] }
    ]
  },

  {
    id: 'knee_acl_postop',
    bodyPart: 'knee',
    name: { ar: 'ما بعد إصلاح الرباط الصليبي الأمامي', en: 'ACL reconstruction — post-op' },
    about: {
      ar: '⚠️ الحالة دي لازم تمشي مع بروتوكول الجرّاح المعالج والتوقيتات اللي حدّدها. القالب ده إطار عام بس.\n\nالتأهيل بياخد شهور، وبيمر من استعادة البسط الكامل والتحكم العضلي، لمرحلة القوة، ثم العودة التدريجية للرياضة بمعايير موضوعية مش بالوقت بس.',
      en: '⚠️ This must follow the operating surgeon\'s protocol and timelines. This template is a general framework only.\n\nRehab takes months, moving from restoring full extension and muscle control, to strength, then criteria-based (not time-only) return to sport.'
    },
    phases: [
      { name: { ar: 'ما بعد الجراحة مباشرة', en: 'Early post-op' },
        goal: { ar: 'بسط كامل، تفعيل الفخذ، تقليل التورم', en: 'Full extension, quad activation, reduce swelling' },
        criteria: { ar: 'بسط كامل + رفع رجل مفرودة بدون تأخر', en: 'Full extension + straight leg raise without lag' },
        exercises: [
          { name: { ar: 'شد الفخذ الأمامي', en: 'Quad set' }, sets: 5, reps: '10 ثواني' },
          { name: { ar: 'رفع الرجل مفرودة', en: 'Straight leg raise' }, sets: 3, reps: '12' },
          { name: { ar: 'ضخ الكاحل', en: 'Ankle pumps' }, sets: 3, reps: '20' }
        ] },
      { name: { ar: 'استعادة المدى والقوة', en: 'Range and early strength' },
        goal: { ar: 'مدى حركة كامل ومشي طبيعي', en: 'Full range and normal gait' },
        criteria: { ar: 'ثني كامل ومشي بدون عرج', en: 'Full flexion, no limp' },
        exercises: [
          { name: { ar: 'سكوات جزئي', en: 'Partial squat' }, sets: 3, reps: '12' },
          { name: { ar: 'دراجة ثابتة', en: 'Stationary bike' }, sets: 1, reps: '10 دقائق' },
          { name: { ar: 'جسر الحوض', en: 'Glute bridge' }, sets: 3, reps: '15' }
        ] },
      { name: { ar: 'القوة والتحكم', en: 'Strength and control' },
        goal: { ar: 'قوة على رجل واحدة وتحكم في الهبوط', en: 'Single-leg strength and landing control' },
        criteria: { ar: 'قوة الفخذ 80% من الجهة السليمة', en: 'Quad strength at 80% of the other side' },
        exercises: [
          { name: { ar: 'سكوات بلغاري', en: 'Bulgarian split squat' }, sets: 3, reps: '10' },
          { name: { ar: 'نزول من صندوق', en: 'Step-down' }, sets: 3, reps: '12' },
          { name: { ar: 'ديدليفت رومانى على رجل', en: 'Single-leg RDL' }, sets: 3, reps: '10' }
        ] },
      { name: { ar: 'العودة للرياضة', en: 'Return to sport' },
        goal: { ar: 'قفز وتغيير اتجاه بمعايير موضوعية', en: 'Hopping and cutting against objective criteria' },
        criteria: { ar: 'اختبارات الوثب ≥ 90% + موافقة الجرّاح', en: 'Hop tests ≥ 90% + surgeon clearance' },
        exercises: [
          { name: { ar: 'اختبارات الوثب', en: 'Hop testing' }, sets: 3, reps: '5' },
          { name: { ar: 'تدريب تغيير الاتجاه', en: 'Cutting drills' }, sets: 3, reps: '8' },
          { name: { ar: 'جري متدرج', en: 'Progressive running' }, sets: 1, reps: '20 دقيقة' }
        ] }
    ]
  },

  /* ==================== أوتار الركبة ==================== */
  {
    id: 'hamstring_strain',
    bodyPart: 'other',
    name: { ar: 'شد/تمزق أوتار الركبة', en: 'Hamstring strain' },
    about: {
      ar: 'إصابة شائعة في الجري السريع، بتحصل غالبًا في مرحلة الأرجحة الأخيرة قبل ملامسة الأرض. نسبة الارتجاع عالية لو الرجوع للرياضة كان بدري.\n\nالتمارين الإيكسنتريك (زي النورديك) هي حجر الأساس في الوقاية والتأهيل.',
      en: 'A common sprinting injury, usually occurring in late swing phase. Re-injury rates are high if return to sport is rushed.\n\nEccentric work (Nordic curls and similar) is the cornerstone of both rehab and prevention.'
    },
    phases: [
      { name: { ar: 'حماية', en: 'Protection' },
        goal: { ar: 'تقليل الألم والحفاظ على الحركة', en: 'Reduce pain, maintain movement' },
        criteria: { ar: 'مشي طبيعي بدون ألم', en: 'Normal pain-free walking' },
        exercises: [
          { name: { ar: 'انزلاق الكعب', en: 'Heel slide' }, sets: 3, reps: '15' },
          { name: { ar: 'ثبات أوتار الركبة الخفيف', en: 'Light hamstring isometric' }, sets: 4, reps: '20 ثانية' }
        ] },
      { name: { ar: 'تحميل مبكر', en: 'Early loading' },
        goal: { ar: 'تحميل الأوتار بمدى محدود', en: 'Load the hamstrings in a limited range' },
        criteria: { ar: 'قوة جيدة بدون ألم في المدى المتوسط', en: 'Good strength, no pain in mid-range' },
        exercises: [
          { name: { ar: 'جسر الحوض على رجل', en: 'Single-leg glute bridge' }, sets: 3, reps: '12' },
          { name: { ar: 'ثني الركبة بالأستك', en: 'Band hamstring curl' }, sets: 3, reps: '15' }
        ] },
      { name: { ar: 'إيكسنتريك', en: 'Eccentric loading' },
        goal: { ar: 'تحميل إيكسنتريك في مدى طويل', en: 'Eccentric loading at long length' },
        criteria: { ar: 'أداء النورديك بتحكم', en: 'Controlled Nordic curl' },
        exercises: [
          { name: { ar: 'نورديك هامسترينج', en: 'Nordic hamstring curl' }, sets: 3, reps: '6' },
          { name: { ar: 'ديدليفت رومانى', en: 'Romanian deadlift' }, sets: 3, reps: '10' },
          { name: { ar: 'إكستندر أوتار الركبة', en: 'Hamstring extender' }, sets: 3, reps: '12' }
        ] },
      { name: { ar: 'العودة للجري', en: 'Return to running' },
        goal: { ar: 'الرجوع للسرعة القصوى تدريجيًا', en: 'Progressive return to maximal speed' },
        criteria: { ar: 'جري بسرعة قصوى بدون أعراض', en: 'Max-speed running symptom-free' },
        exercises: [
          { name: { ar: 'جري متدرج السرعة', en: 'Graded speed running' }, sets: 5, reps: '60 متر' },
          { name: { ar: 'تدريبات تسارع', en: 'Acceleration drills' }, sets: 4, reps: '20 متر' }
        ] }
    ]
  },

  /* ==================== الكاحل ==================== */
  {
    id: 'ankle_lateral_sprain',
    bodyPart: 'ankle',
    name: { ar: 'التواء الكاحل الخارجي', en: 'Lateral ankle sprain' },
    about: {
      ar: 'أشهر إصابة رياضية على الإطلاق، بتحصل مع لَيّ القدم للداخل. التورم والألم بيكونوا على الجانب الخارجي.\n\nأهم حاجة في التأهيل — واللي بتتنسي كتير — هي تدريب التوازن وحس الوضع، لأنه اللي بيمنع تكرار الالتواء.',
      en: 'The most common sports injury, from the foot rolling inward. Swelling and pain sit on the outer ankle.\n\nThe most important and most often skipped part of rehab is balance and proprioception training — it is what prevents recurrence.'
    },
    phases: [
      { name: { ar: 'حماية وتقليل التورم', en: 'Protect and reduce swelling' },
        goal: { ar: 'تقليل التورم والألم', en: 'Reduce swelling and pain' },
        criteria: { ar: 'تحميل وزن على القدم بدون ألم شديد', en: 'Weight-bearing without significant pain' },
        exercises: [
          { name: { ar: 'ضخ الكاحل', en: 'Ankle pumps' }, sets: 4, reps: '20' },
          { name: { ar: 'رسم الحروف بالقدم', en: 'Ankle alphabet' }, sets: 2, reps: 'مرة كاملة' },
          { name: { ar: 'رفع القدم لأعلى', en: 'Elevation' }, sets: 3, reps: '10 دقائق' }
        ] },
      { name: { ar: 'استعادة المدى', en: 'Restore range' },
        goal: { ar: 'مدى حركة كامل ومشي طبيعي', en: 'Full range and normal gait' },
        criteria: { ar: 'مشي بدون عرج ومدى ثني كامل', en: 'No limp, full dorsiflexion' },
        exercises: [
          { name: { ar: 'إطالة السمانة على الحائط', en: 'Wall calf stretch' }, sets: 3, reps: '30 ثانية' },
          { name: { ar: 'انزلاق الركبة للحائط', en: 'Knee-to-wall mobilisation' }, sets: 3, reps: '15' },
          { name: { ar: 'قلب وعكس القدم بالأستك', en: 'Band inversion/eversion' }, sets: 3, reps: '15' }
        ] },
      { name: { ar: 'توازن وقوة', en: 'Balance and strength' },
        goal: { ar: 'استعادة حس الوضع والقوة', en: 'Restore proprioception and strength' },
        criteria: { ar: 'الوقوف على رجل واحدة 30 ثانية بعين مغلقة', en: '30-second single-leg stand, eyes closed' },
        exercises: [
          { name: { ar: 'وقوف على رجل واحدة', en: 'Single-leg stand' }, sets: 3, reps: '30 ثانية' },
          { name: { ar: 'رفع السمانة', en: 'Calf raise' }, sets: 3, reps: '15' },
          { name: { ar: 'توازن على وسادة', en: 'Balance on cushion' }, sets: 3, reps: '30 ثانية' }
        ] },
      { name: { ar: 'العودة للرياضة', en: 'Return to sport' },
        goal: { ar: 'قفز وتغيير اتجاه بأمان', en: 'Safe hopping and cutting' },
        criteria: { ar: 'قفز وتغيير اتجاه بدون ألم أو عدم ثبات', en: 'Hopping and cutting with no pain or instability' },
        exercises: [
          { name: { ar: 'قفز على رجل واحدة', en: 'Single-leg hop' }, sets: 3, reps: '10' },
          { name: { ar: 'جري متعرج', en: 'Zig-zag running' }, sets: 4, reps: '20 متر' }
        ] }
    ]
  },

  {
    id: 'achilles_tendinopathy',
    bodyPart: 'ankle',
    name: { ar: 'التهاب وتر أخيل', en: 'Achilles tendinopathy' },
    about: {
      ar: 'ألم وتيبّس في وتر أخيل، بيبان بوضوح أول الصبح وعند بداية النشاط. شائع مع زيادة حجم الجري بسرعة.\n\nالعلاج الأساسي تحميل تدريجي: إيزومتري ← رفع سمانة بطيء ثقيل ← قفز. ومهم متوقفش النشاط تمامًا.',
      en: 'Pain and stiffness in the Achilles tendon, most noticeable first thing in the morning and at the start of activity. Common after a rapid increase in running volume.\n\nThe mainstay is progressive loading: isometric → heavy slow calf raises → plyometrics. Complete rest is not the answer.'
    },
    phases: [
      { name: { ar: 'إيزومتري', en: 'Isometric' },
        goal: { ar: 'تقليل الألم بتحميل ثابت', en: 'Reduce pain with static loading' },
        criteria: { ar: 'تيبّس الصبح أقل بشكل ملحوظ', en: 'Noticeably less morning stiffness' },
        exercises: [
          { name: { ar: 'ثبات رفع السمانة', en: 'Calf raise hold' }, sets: 5, reps: '45 ثانية' }
        ] },
      { name: { ar: 'تحميل بطيء ثقيل', en: 'Heavy slow loading' },
        goal: { ar: 'بناء تحمّل الوتر', en: 'Build tendon capacity' },
        criteria: { ar: 'رفع سمانة على رجل واحدة 20 مرة', en: '20 single-leg calf raises' },
        exercises: [
          { name: { ar: 'رفع سمانة بطيء', en: 'Slow calf raise' }, sets: 4, reps: '12' },
          { name: { ar: 'رفع سمانة بركبة مثنية', en: 'Bent-knee calf raise' }, sets: 3, reps: '15' }
        ] },
      { name: { ar: 'تخزين الطاقة', en: 'Energy storage' },
        goal: { ar: 'إدخال القفز تدريجيًا', en: 'Reintroduce hopping' },
        criteria: { ar: 'قفز خفيف بدون ألم', en: 'Light hopping pain-free' },
        exercises: [
          { name: { ar: 'قفز في المكان', en: 'Pogo hops' }, sets: 3, reps: '20' },
          { name: { ar: 'حبل نط خفيف', en: 'Light skipping' }, sets: 3, reps: '30 ثانية' }
        ] },
      { name: { ar: 'العودة للجري', en: 'Return to running' },
        goal: { ar: 'زيادة حجم الجري تدريجيًا', en: 'Progressively rebuild running volume' },
        criteria: { ar: 'جري بالحجم المعتاد بدون أعراض', en: 'Usual running volume symptom-free' },
        exercises: [
          { name: { ar: 'جري متدرج', en: 'Graded running' }, sets: 1, reps: '20 دقيقة' },
          { name: { ar: 'رفع سمانة بحمل', en: 'Loaded calf raise' }, sets: 4, reps: '10' }
        ] }
    ]
  },

  /* ==================== القدم ==================== */
  {
    id: 'plantar_fasciitis',
    bodyPart: 'foot',
    name: { ar: 'التهاب اللفافة الأخمصية', en: 'Plantar fasciitis' },
    about: {
      ar: 'ألم أسفل الكعب، أوضح ما يكون في أول خطوات بعد النوم أو بعد الجلوس الطويل. بيتحسن مع الحركة وبيرجع آخر اليوم.\n\nالتأهيل بيجمع بين إطالة اللفافة والسمانة، وتقوية عضلات القدم الصغيرة، وتحميل تدريجي بطيء.',
      en: 'Pain under the heel, sharpest in the first steps after sleeping or long sitting. It eases with movement and returns later in the day.\n\nRehab combines plantar fascia and calf stretching, intrinsic foot strengthening, and slow progressive loading.'
    },
    phases: [
      { name: { ar: 'تقليل الألم', en: 'Reduce pain' },
        goal: { ar: 'تخفيف ألم أول الصبح', en: 'Ease first-step morning pain' },
        criteria: { ar: 'خطوات الصبح أقل ألمًا', en: 'Less painful morning steps' },
        exercises: [
          { name: { ar: 'تدحرج كرة تحت القدم', en: 'Ball roll under foot' }, sets: 3, reps: '60 ثانية' },
          { name: { ar: 'إطالة اللفافة الأخمصية', en: 'Plantar fascia stretch' }, sets: 3, reps: '30 ثانية' },
          { name: { ar: 'إطالة السمانة', en: 'Calf stretch' }, sets: 3, reps: '30 ثانية' }
        ] },
      { name: { ar: 'تقوية القدم', en: 'Foot strengthening' },
        goal: { ar: 'تقوية عضلات القدم الداخلية', en: 'Strengthen intrinsic foot muscles' },
        criteria: { ar: 'تحمّل الوقوف الطويل', en: 'Tolerates prolonged standing' },
        exercises: [
          { name: { ar: 'تقصير القدم', en: 'Short foot exercise' }, sets: 3, reps: '15' },
          { name: { ar: 'لم منشفة بالأصابع', en: 'Towel curl' }, sets: 3, reps: '15' },
          { name: { ar: 'رفع السمانة', en: 'Calf raise' }, sets: 3, reps: '15' }
        ] },
      { name: { ar: 'تحميل بطيء ثقيل', en: 'Heavy slow loading' },
        goal: { ar: 'تحميل اللفافة تدريجيًا', en: 'Progressively load the fascia' },
        criteria: { ar: 'رفع سمانة بمنشفة تحت الأصابع بدون ألم', en: 'Towel-under-toes calf raise pain-free' },
        exercises: [
          { name: { ar: 'رفع سمانة بمنشفة تحت الأصابع', en: 'Calf raise with towel under toes' }, sets: 4, reps: '12' }
        ] },
      { name: { ar: 'العودة للنشاط', en: 'Return to activity' },
        goal: { ar: 'الرجوع للمشي والجري الكامل', en: 'Return to full walking and running' },
        criteria: { ar: 'نشاط كامل بدون ألم صباحي', en: 'Full activity with no morning pain' },
        exercises: [
          { name: { ar: 'جري متدرج', en: 'Graded running' }, sets: 1, reps: '15 دقيقة' },
          { name: { ar: 'رفع سمانة بحمل', en: 'Loaded calf raise' }, sets: 4, reps: '10' }
        ] }
    ]
  },

  /* ==================== الفخذ الداخلي ==================== */
  {
    id: 'groin_adductor_strain',
    bodyPart: 'other',
    name: { ar: 'شد العضلة المقربة (الأربية)', en: 'Adductor / groin strain' },
    about: {
      ar: 'ألم في الفخذ الداخلي، شائع في رياضات تغيير الاتجاه والركل زي كرة القدم. بيزيد مع ضم الرجلين والحركات الجانبية السريعة.\n\nبرنامج كوبنهاجن للتقريب من أشهر البرامج المثبتة في الوقاية والتأهيل.',
      en: 'Inner-thigh pain, common in cutting and kicking sports like football. Worse with squeezing the legs together and fast lateral movement.\n\nThe Copenhagen adductor programme is one of the best-established approaches for both prevention and rehab.'
    },
    phases: [
      { name: { ar: 'تهدئة', en: 'Settle' },
        goal: { ar: 'تقليل الألم وتحميل إيزومتري خفيف', en: 'Reduce pain, light isometric loading' },
        criteria: { ar: 'ضغط إيزومتري بدون ألم', en: 'Pain-free isometric squeeze' },
        exercises: [
          { name: { ar: 'ضغط كرة بين الركبتين', en: 'Ball squeeze between knees' }, sets: 4, reps: '20 ثانية' }
        ] },
      { name: { ar: 'تحميل مبكر', en: 'Early loading' },
        goal: { ar: 'تحميل تدريجي للمقربات', en: 'Progressively load the adductors' },
        criteria: { ar: 'تحمّل التمرين بدون ألم لليوم التالي', en: 'No next-day soreness' },
        exercises: [
          { name: { ar: 'تقريب الرجل جانبًا', en: 'Side-lying hip adduction' }, sets: 3, reps: '15' },
          { name: { ar: 'كوبنهاجن جزئي (على الركبة)', en: 'Copenhagen plank, short lever' }, sets: 3, reps: '8' }
        ] },
      { name: { ar: 'قوة كاملة', en: 'Full strength' },
        goal: { ar: 'الوصول لقوة مقاربة للجهة السليمة', en: 'Reach near-symmetrical strength' },
        criteria: { ar: 'كوبنهاجن كامل بتحكم', en: 'Full Copenhagen plank with control' },
        exercises: [
          { name: { ar: 'كوبنهاجن كامل', en: 'Full Copenhagen plank' }, sets: 3, reps: '10' },
          { name: { ar: 'لانج جانبي', en: 'Lateral lunge' }, sets: 3, reps: '12' }
        ] },
      { name: { ar: 'العودة للرياضة', en: 'Return to sport' },
        goal: { ar: 'الرجوع للركل وتغيير الاتجاه', en: 'Return to kicking and cutting' },
        criteria: { ar: 'ركل وتغيير اتجاه بدون أعراض', en: 'Kicking and cutting symptom-free' },
        exercises: [
          { name: { ar: 'تدريب تغيير الاتجاه', en: 'Cutting drills' }, sets: 4, reps: '8' },
          { name: { ar: 'ركل تدريجي', en: 'Graded kicking' }, sets: 3, reps: '10' }
        ] }
    ]
  },

  /* ==================== السمانة ==================== */
  {
    id: 'calf_strain',
    bodyPart: 'other',
    name: { ar: 'شد عضلة السمانة', en: 'Calf strain' },
    about: {
      ar: 'إصابة شائعة في الجري والقفز والرياضات المفاجئة. بيحس المصاب بضربة أو شد مفاجئ خلف الساق.\n\nالتأهيل لازم يشمل رفع السمانة بالركبة مفرودة (للتوأمية) وبالركبة مثنية (للنعلية) عشان يغطي العضلتين.',
      en: 'Common in running, jumping, and stop-start sports. Often felt as a sudden strike or pull at the back of the leg.\n\nRehab must include calf raises with the knee straight (gastrocnemius) and bent (soleus) to cover both muscles.'
    },
    phases: [
      { name: { ar: 'حماية', en: 'Protection' },
        goal: { ar: 'تقليل الألم والمشي بشكل طبيعي', en: 'Reduce pain, restore normal walking' },
        criteria: { ar: 'مشي بدون عرج', en: 'Walking without a limp' },
        exercises: [
          { name: { ar: 'ضخ الكاحل', en: 'Ankle pumps' }, sets: 4, reps: '20' },
          { name: { ar: 'رفع سمانة جالسًا', en: 'Seated calf raise' }, sets: 3, reps: '15' }
        ] },
      { name: { ar: 'تحميل تدريجي', en: 'Progressive loading' },
        goal: { ar: 'استعادة قوة السمانة', en: 'Rebuild calf strength' },
        criteria: { ar: 'رفع سمانة على رجل واحدة 15 مرة', en: '15 single-leg calf raises' },
        exercises: [
          { name: { ar: 'رفع سمانة واقفًا', en: 'Standing calf raise' }, sets: 4, reps: '15' },
          { name: { ar: 'رفع سمانة بركبة مثنية', en: 'Bent-knee calf raise' }, sets: 3, reps: '15' }
        ] },
      { name: { ar: 'قوة وقدرة', en: 'Strength and power' },
        goal: { ar: 'إدخال القفز', en: 'Reintroduce plyometrics' },
        criteria: { ar: 'قفز متكرر بدون ألم', en: 'Repeated hopping pain-free' },
        exercises: [
          { name: { ar: 'قفز في المكان', en: 'Pogo hops' }, sets: 3, reps: '20' },
          { name: { ar: 'رفع سمانة بحمل', en: 'Loaded calf raise' }, sets: 4, reps: '10' }
        ] },
      { name: { ar: 'العودة للجري', en: 'Return to running' },
        goal: { ar: 'الرجوع للجري والسرعة', en: 'Return to running and speed' },
        criteria: { ar: 'جري بسرعة كاملة بدون أعراض', en: 'Full-speed running symptom-free' },
        exercises: [
          { name: { ar: 'جري متدرج', en: 'Graded running' }, sets: 1, reps: '20 دقيقة' },
          { name: { ar: 'تدريبات تسارع', en: 'Acceleration drills' }, sets: 4, reps: '20 متر' }
        ] }
    ]
  }

];