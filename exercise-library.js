/*
 * ADAM — مكتبة التمارين الأساسية (عربي / إنجليزي)
 *
 * ⚠️ ملاحظة مهنية: دي مكتبة بداية بتغطي التمارين الأكتر شيوعًا في
 * برامج التدريب، بمعلومات العضلات المستهدفة وطريقة الأداء المختصرة.
 * زي أي محتوى مبدئي تاني في المنصة — راجعها وعدّلها حسب أسلوبك قبل
 * ما تسندها لعميل، خصوصًا لو عنده أي حالة أو إصابة خاصة.
 * تقدر تضيف تمارينك الخاصة من "مكتبتي" في أي وقت.
 *
 * المفاتيح (muscles/equipment/category) بتستخدم نفس القيم المعرّفة في
 * app.js (MUSCLES / EQUIPMENT / CATEGORY_KEYS) عشان الترجمة والفلاتر
 * والأيقونات تشتغل تلقائي من غير أي تعديل إضافي.
 *
 * IMPORTANT: a starting-point library of common exercises with target
 * muscles and a short how-to. Like other seed content in this app,
 * review and adapt before assigning — especially for clients with an
 * injury or condition. Coaches can add their own exercises anytime
 * from "My Library".
 */

export const EXERCISE_LIBRARY = [

  /* ==================== صدر — Chest ==================== */
  {
    id: 'ex_barbell_bench_press',
    name: { ar: 'بنش برس بار', en: 'Barbell Bench Press' },
    category: 'strength', equipment: 'barbell',
    primaryMuscles: ['chest'], secondaryMuscles: ['triceps', 'shoulders'],
    howTo: {
      ar: 'استلقِ على البنش والقدمين ثابتتين على الأرض. أنزل البار ببطء لمنتصف الصدر مع ثبات لوحي الكتف، وادفعه لأعلى بخط مستقيم تقريبًا حتى تمديد كامل للذراعين.',
      en: 'Lie on the bench with feet flat on the floor. Lower the bar under control to mid-chest while keeping the shoulder blades pinned, then press it back up in a near-straight line to full arm extension.'
    }
  },
  {
    id: 'ex_incline_barbell_bench_press',
    name: { ar: 'بنش برس مائل بار', en: 'Incline Barbell Bench Press' },
    category: 'strength', equipment: 'barbell',
    primaryMuscles: ['chest'], secondaryMuscles: ['shoulders', 'triceps'],
    howTo: {
      ar: 'نفس حركة البنش برس العادي لكن على بنش مائل بزاوية 30-45 درجة، وده بيركّز الحمل أكتر على الجزء العلوي من الصدر.',
      en: 'Same movement as the flat bench press but on a 30-45° incline bench, which shifts more of the load onto the upper chest.'
    }
  },
  {
    id: 'ex_dumbbell_bench_press',
    name: { ar: 'بنش برس دمبل', en: 'Dumbbell Bench Press' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['chest'], secondaryMuscles: ['triceps', 'shoulders'],
    howTo: {
      ar: 'امسك دمبلين وانت مستلقي على البنش، وانزلهم جنب الصدر مع تحكم، وادفعهم لأعلى لحد ما الذراعين تقرب من الاستقامة من غير ما تصطدم الدمبلين ببعض بقوة.',
      en: 'Lie on the bench holding a dumbbell in each hand. Lower them to chest level under control, then press up until the arms are nearly straight without banging the dumbbells together.'
    }
  },
  {
    id: 'ex_incline_dumbbell_press',
    name: { ar: 'بنش برس مائل دمبل', en: 'Incline Dumbbell Press' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['chest'], secondaryMuscles: ['shoulders', 'triceps'],
    howTo: {
      ar: 'نفس بنش الدمبل لكن على بنش مائل، بيركّز أكتر على أعلى الصدر والكتف الأمامي.',
      en: 'Same as the dumbbell bench press but on an incline bench, emphasizing the upper chest and front deltoid more.'
    }
  },
  {
    id: 'ex_dumbbell_flyes',
    name: { ar: 'فتح صدر دمبل', en: 'Dumbbell Flyes' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['chest'],
    howTo: {
      ar: 'استلقِ على البنش والدمبلين فوق الصدر بانحناء بسيط في المرفق. افتح الذراعين لجانبين لحد ما تحس بشد خفيف في الصدر، وارجع لأعلى بنفس المسار من غير ما تقفل المرفق تمامًا.',
      en: 'Lie on the bench with dumbbells above the chest and a slight elbow bend. Open the arms out to the sides until you feel a light chest stretch, then bring them back along the same path without fully locking the elbows.'
    }
  },
  {
    id: 'ex_pushup',
    name: { ar: 'ضغط عادي', en: 'Push-up' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['chest'], secondaryMuscles: ['triceps', 'shoulders', 'abdominals'],
    howTo: {
      ar: 'ابدأ في وضع اللوح الخشبي بإيدين تحت الكتف مباشرة، وأنزل الجسم كوحدة واحدة لحد ما الصدر يقرب من الأرض، وادفع لأعلى من غير ما ينزل الوسط.',
      en: 'Start in a plank with hands directly under the shoulders. Lower the body as one unit until the chest nears the floor, then push back up without letting the hips sag.'
    }
  },
  {
    id: 'ex_cable_crossover',
    name: { ar: 'كروس أوفر كابل', en: 'Cable Crossover' },
    category: 'strength', equipment: 'cable',
    primaryMuscles: ['chest'],
    howTo: {
      ar: 'قف في نص جهاز الكابل ومقبض في كل إيد فوق مستوى الكتف. اجمع الإيدين لقدام في حركة نصف دائرية لحد ما يتقابلوا قدام الصدر مع انحناء بسيط في المرفق.',
      en: 'Stand centered between two cable stacks with a handle in each hand above shoulder height. Bring the hands together in a wide arc until they meet in front of the chest, keeping a slight elbow bend.'
    }
  },
  {
    id: 'ex_chest_dip',
    name: { ar: 'دِپس صدر', en: 'Chest Dip' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['chest'], secondaryMuscles: ['triceps', 'shoulders'],
    howTo: {
      ar: 'اتعلق على متوازي الدِپس والجسم مايل قدام شوية. انزل لحد ما تحس بشد في الصدر، وادفع لأعلى تاني بدون قفل المرفق بقوة.',
      en: 'Support yourself on parallel dip bars, leaning the torso slightly forward. Lower until you feel a chest stretch, then push back up without slamming the elbows locked.'
    }
  },

  /* ==================== ظهر — Back ==================== */
  {
    id: 'ex_deadlift',
    name: { ar: 'الرفعة الميتة', en: 'Deadlift' },
    category: 'strength', equipment: 'barbell',
    primaryMuscles: ['lower back', 'hamstrings', 'glutes'], secondaryMuscles: ['lats', 'traps', 'forearms'],
    howTo: {
      ar: 'قف والبار قريب من الساق، وامسكه بإيدين عرض الكتف. حافظ على استقامة الظهر وارفع بدفع الأرض بالرجلين مع فرد الوركين، والبار يفضل قريب من الجسم طول الحركة.',
      en: 'Stand with the bar close to your shins and grip it just outside the legs. Keep the back neutral and lift by pushing the floor away and extending the hips, keeping the bar close to the body throughout.'
    }
  },
  {
    id: 'ex_pullup',
    name: { ar: 'العقلة (سحب فوق)', en: 'Pull-up' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['lats'], secondaryMuscles: ['biceps', 'middle back'],
    howTo: {
      ar: 'اتعلق على البار بمسكة أوسع من الكتف وكف الإيد لقدام. اسحب الجسم لأعلى لحد ما الدقن يعدي البار، وانزل بتحكم لحد تمديد كامل للذراع.',
      en: 'Hang from the bar with a wider-than-shoulder overhand grip. Pull the body up until the chin clears the bar, then lower under control to full arm extension.'
    }
  },
  {
    id: 'ex_chinup',
    name: { ar: 'شين أب (سحب بقبضة معكوسة)', en: 'Chin-up' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['lats'], secondaryMuscles: ['biceps'],
    howTo: {
      ar: 'نفس العقلة لكن بمسكة معكوسة (كف الإيد لناحيتك) وأضيق شوية من عرض الكتف — بتشرك البايسبس أكتر.',
      en: 'Same movement as the pull-up but with an underhand grip, roughly shoulder-width — this brings the biceps in more.'
    }
  },
  {
    id: 'ex_lat_pulldown',
    name: { ar: 'سحب أمامي (لات بولداون)', en: 'Lat Pulldown' },
    category: 'strength', equipment: 'cable',
    primaryMuscles: ['lats'], secondaryMuscles: ['biceps', 'middle back'],
    howTo: {
      ar: 'اجلس والمقبض ممسوك بعرض أوسع من الكتف. اسحبه لأسفل لحد صدرك مع فرد الصدر للأمام قليلًا، وارجع لأعلى بتحكم من غير ما تسيب الوزن يسحبك.',
      en: 'Sit with the bar gripped wider than shoulder width. Pull it down to upper chest level while opening the chest slightly, then return under control without letting the weight yank you up.'
    }
  },
  {
    id: 'ex_bent_over_row',
    name: { ar: 'تجديف بار منحني', en: 'Bent Over Barbell Row' },
    category: 'strength', equipment: 'barbell',
    primaryMuscles: ['middle back'], secondaryMuscles: ['lats', 'biceps'],
    howTo: {
      ar: 'انحنِ من الوركين والظهر مستقيم والبار ممسوك عرض الكتف. اسحب البار لأسفل البطن مع ضم لوحي الكتف، وانزله بتحكم.',
      en: 'Hinge forward from the hips with a neutral back, holding the bar with a shoulder-width grip. Pull it to the lower abdomen while squeezing the shoulder blades together, then lower with control.'
    }
  },
  {
    id: 'ex_one_arm_dumbbell_row',
    name: { ar: 'تجديف دمبل بإيد واحدة', en: 'One-Arm Dumbbell Row' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['middle back'], secondaryMuscles: ['lats', 'biceps'],
    howTo: {
      ar: 'اسند إيد وركبة على البنش والإيد التانية شايلة الدمبل ومعلّقة لأسفل. اسحب الدمبل لجنب الخصر مع ثبات الجذع، وانزله بتحكم.',
      en: 'Support one hand and knee on the bench with the other arm holding a dumbbell hanging down. Row it up toward the hip while keeping the torso stable, then lower under control.'
    }
  },
  {
    id: 'ex_seated_cable_row',
    name: { ar: 'تجديف كابل جالس', en: 'Seated Cable Row' },
    category: 'strength', equipment: 'cable',
    primaryMuscles: ['middle back'], secondaryMuscles: ['lats', 'biceps'],
    howTo: {
      ar: 'اجلس ورجليك ثابتة والظهر مستقيم. اسحب المقبض لناحية البطن مع ضم لوحي الكتف للخلف، وارجع لقدام بتحكم من غير ما ينحني الظهر.',
      en: 'Sit with feet braced and back upright. Pull the handle toward the abdomen while squeezing the shoulder blades back, then return forward under control without rounding the back.'
    }
  },
  {
    id: 'ex_t_bar_row',
    name: { ar: 'تجديف تي بار', en: 'T-Bar Row' },
    category: 'strength', equipment: 'barbell',
    primaryMuscles: ['middle back'], secondaryMuscles: ['lats', 'biceps'],
    howTo: {
      ar: 'قف فوق البار والجذع مايل لقدام والظهر ثابت. اسحب المقبض لأعلى ناحية الصدر مع ضم الكتفين، وانزل بتحكم.',
      en: 'Straddle the bar with the torso hinged forward and the back braced. Pull the handle up toward the chest while squeezing the shoulder blades, then lower under control.'
    }
  },
  {
    id: 'ex_face_pull',
    name: { ar: 'فيس بول', en: 'Face Pull' },
    category: 'strength', equipment: 'cable',
    primaryMuscles: ['shoulders'], secondaryMuscles: ['traps', 'middle back'],
    howTo: {
      ar: 'اسحب الحبل من جهاز الكابل لناحية الوش مع فتح المرفقين للجانبين، مع تركيز على ضم لوحي الكتف — تمرين ممتاز لصحة الكتف.',
      en: 'Pull the rope attachment toward your face while flaring the elbows out to the sides, focusing on squeezing the shoulder blades together — an excellent shoulder-health exercise.'
    }
  },

  /* ==================== كتف — Shoulders ==================== */
  {
    id: 'ex_overhead_barbell_press',
    name: { ar: 'ضغط كتف بار (أوفرهيد)', en: 'Overhead Barbell Press' },
    category: 'strength', equipment: 'barbell',
    primaryMuscles: ['shoulders'], secondaryMuscles: ['triceps'],
    howTo: {
      ar: 'قف والبار على مستوى الترقوة. ادفعه لأعلى الرأس بخط مستقيم لحد تمديد كامل، وانزله بتحكم من غير ما ينحني الظهر للخلف بزيادة.',
      en: 'Stand with the bar at collarbone height. Press it straight overhead to full extension, then lower under control without over-arching the lower back.'
    }
  },
  {
    id: 'ex_dumbbell_shoulder_press',
    name: { ar: 'ضغط كتف دمبل', en: 'Dumbbell Shoulder Press' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['shoulders'], secondaryMuscles: ['triceps'],
    howTo: {
      ar: 'اجلس أو قف ودمبل في كل إيد عند مستوى الكتف. ادفعهم لأعلى لحد تمديد شبه كامل، وانزلهم بتحكم.',
      en: 'Sit or stand with a dumbbell in each hand at shoulder height. Press them up to near-full extension, then lower under control.'
    }
  },
  {
    id: 'ex_lateral_raise',
    name: { ar: 'رفرفة جانبية', en: 'Lateral Raise' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['shoulders'],
    howTo: {
      ar: 'امسك دمبل في كل إيد وانت واقف، وارفعهم لجانبين لحد مستوى الكتف تقريبًا مع انحناء بسيط في المرفق، وانزل بتحكم من غير ما تستعين بزخم الجسم.',
      en: 'Hold a dumbbell in each hand while standing. Raise them out to the sides to roughly shoulder height with a slight elbow bend, then lower under control without swinging the body for momentum.'
    }
  },
  {
    id: 'ex_front_raise',
    name: { ar: 'رفرفة أمامية', en: 'Front Raise' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['shoulders'],
    howTo: {
      ar: 'ارفع الدمبل أو البار لقدام لحد مستوى الكتف تقريبًا بذراع شبه مستقيمة، وانزل بتحكم.',
      en: 'Raise a dumbbell or barbell in front of you to roughly shoulder height with a near-straight arm, then lower under control.'
    }
  },
  {
    id: 'ex_rear_delt_fly',
    name: { ar: 'رفرفة كتف خلفي', en: 'Rear Delt Fly' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['shoulders'], secondaryMuscles: ['middle back'],
    howTo: {
      ar: 'انحنِ لقدام من الوركين ودمبل في كل إيد. افتح الذراعين لجانبين مع تركيز على الكتف الخلفي، وارجع بتحكم.',
      en: 'Hinge forward from the hips holding a dumbbell in each hand. Open the arms out to the sides focusing on the rear deltoid, then return under control.'
    }
  },
  {
    id: 'ex_arnold_press',
    name: { ar: 'ضغط أرنولد', en: 'Arnold Press' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['shoulders'], secondaryMuscles: ['triceps'],
    howTo: {
      ar: 'ابدأ بالدمبلين قدام الوش وكف الإيد لناحيتك، وادفعهم لأعلى مع تدوير الإيد لحد ما توصل لوضع الضغط العادي فوق الرأس.',
      en: 'Start with the dumbbells in front of the face, palms facing you, and press up while rotating the hands until reaching a standard overhead press position.'
    }
  },
  {
    id: 'ex_upright_row',
    name: { ar: 'سحب علوي (أب رايت رو)', en: 'Upright Row' },
    category: 'strength', equipment: 'barbell',
    primaryMuscles: ['shoulders'], secondaryMuscles: ['traps'],
    howTo: {
      ar: 'امسك البار عرض الكتف قدام الجسم، وارفعه لأعلى لحد مستوى الصدر تقريبًا مع قيادة المرفقين للأعلى، وانزل بتحكم.',
      en: 'Hold the bar with a shoulder-width grip in front of the body. Raise it up to roughly chest height leading with the elbows, then lower under control.'
    }
  },
  {
    id: 'ex_shrugs',
    name: { ar: 'هز الكتف (شراج)', en: 'Shrugs' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['traps'],
    howTo: {
      ar: 'امسك دمبل في كل إيد وارفع الكتفين لأعلى ناحية الودن مع ثبات الذراعين، واثبت لحظة، وانزل بتحكم.',
      en: 'Hold a dumbbell in each hand and lift the shoulders straight up toward the ears with the arms staying still, pause briefly, then lower under control.'
    }
  },

  /* ==================== أرجل — Legs ==================== */
  {
    id: 'ex_barbell_back_squat',
    name: { ar: 'سكوات خلفي بار', en: 'Barbell Back Squat' },
    category: 'strength', equipment: 'barbell',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['hamstrings'],
    howTo: {
      ar: 'حط البار على أعلى الظهر (مش على الرقبة)، وانزل الوركين للخلف وللأسفل مع ثبات الصدر لأعلى لحد ما الفخذ يبقى موازي للأرض تقريبًا، وادفع الأرض بالرجلين للرجوع لأعلى.',
      en: 'Rest the bar on the upper back (not the neck). Push the hips back and down while keeping the chest up until the thighs are roughly parallel to the floor, then drive through the legs to stand back up.'
    }
  },
  {
    id: 'ex_front_squat',
    name: { ar: 'سكوات أمامي', en: 'Front Squat' },
    category: 'strength', equipment: 'barbell',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['glutes', 'abdominals'],
    howTo: {
      ar: 'حط البار على مقدمة الكتف والمرفقين لأعلى. انزل في سكوات مع ثبات الجذع منتصب أكتر من السكوات الخلفي، وادفع لأعلى.',
      en: 'Rest the bar across the front of the shoulders with the elbows up. Squat down keeping the torso more upright than a back squat, then drive back up.'
    }
  },
  {
    id: 'ex_leg_press',
    name: { ar: 'ضغط أرجل (ليج برس)', en: 'Leg Press' },
    category: 'strength', equipment: 'machine',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['glutes', 'hamstrings'],
    howTo: {
      ar: 'اجلس في الجهاز ورجليك على اللوحة بعرض الكتف. انزل اللوحة لحد ما الركبة تعمل زاوية 90 درجة تقريبًا، وادفع بدون قفل الركبة بقوة في النهاية.',
      en: 'Sit in the machine with feet shoulder-width on the platform. Lower it until the knees reach roughly 90°, then press back up without locking the knees hard at the top.'
    }
  },
  {
    id: 'ex_romanian_deadlift',
    name: { ar: 'رفعة رومانية', en: 'Romanian Deadlift' },
    category: 'strength', equipment: 'barbell',
    primaryMuscles: ['hamstrings'], secondaryMuscles: ['glutes', 'lower back'],
    howTo: {
      ar: 'امسك البار وانحنِ من الوركين مع ثبات انحناء بسيط في الركبة، وانزل البار قريب من الرجل لحد ما تحس بشد في أوتار الركبة، وارجع بفرد الوركين.',
      en: 'Hold the bar and hinge from the hips with a slight, fixed knee bend. Lower the bar close to the legs until you feel a hamstring stretch, then return by driving the hips forward.'
    }
  },
  {
    id: 'ex_leg_curl',
    name: { ar: 'ثني ركبة (ليج كيرل)', en: 'Leg Curl' },
    category: 'strength', equipment: 'machine',
    primaryMuscles: ['hamstrings'],
    howTo: {
      ar: 'استلقِ أو اجلس في الجهاز وثبّت الوسادة خلف الكاحل. اثنِ الركبة وسحب الوسادة لناحية المؤخرة، وارجع بتحكم.',
      en: 'Lie or sit in the machine with the pad behind the ankle. Curl the knee, pulling the pad toward the glutes, then return under control.'
    }
  },
  {
    id: 'ex_leg_extension',
    name: { ar: 'فرد ركبة (ليج إكستنشن)', en: 'Leg Extension' },
    category: 'strength', equipment: 'machine',
    primaryMuscles: ['quadriceps'],
    howTo: {
      ar: 'اجلس في الجهاز والوسادة على مقدمة الكاحل. افرد الركبة لأعلى لحد استقامة الرجل تقريبًا، وانزل بتحكم.',
      en: 'Sit in the machine with the pad on the front of the ankle. Extend the knee up until the leg is nearly straight, then lower under control.'
    }
  },
  {
    id: 'ex_walking_lunge',
    name: { ar: 'لَنج مشي', en: 'Walking Lunge' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['hamstrings'],
    howTo: {
      ar: 'اتقدم بخطوة كبيرة لقدام وانزل لحد ما الركبتين يعملوا زاوية 90 درجة تقريبًا، وادفع للأمام على الرجل الأمامية للانتقال للخطوة الجاية.',
      en: 'Step forward with a long stride and lower until both knees form roughly 90°, then push off the front leg to move into the next step.'
    }
  },
  {
    id: 'ex_bulgarian_split_squat',
    name: { ar: 'سكوات بلغاري', en: 'Bulgarian Split Squat' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['quadriceps', 'glutes'],
    howTo: {
      ar: 'حط ظهر رجل واحدة على بنش خلفك والرجل التانية قدام. انزل في سكوات على الرجل الأمامية لحد زاوية 90 درجة تقريبًا، وادفع لأعلى.',
      en: 'Rest the top of one foot on a bench behind you with the other leg forward. Lower into a squat on the front leg to roughly 90°, then push back up.'
    }
  },
  {
    id: 'ex_calf_raise',
    name: { ar: 'رفرفة سمانة (وقوف)', en: 'Standing Calf Raise' },
    category: 'strength', equipment: 'machine',
    primaryMuscles: ['calves'],
    howTo: {
      ar: 'قف وقدميك على حافة مرتفعة قليلًا. ارفع الكعبين لأعلى قد ما تقدر، واثبت لحظة، وانزل ببطء لحد ما تحس بشد في السمانة.',
      en: 'Stand with the balls of your feet on a slightly raised edge. Raise the heels as high as possible, pause briefly, then lower slowly until you feel a calf stretch.'
    }
  },
  {
    id: 'ex_hip_thrust',
    name: { ar: 'هيب ثرست', en: 'Hip Thrust' },
    category: 'strength', equipment: 'barbell',
    primaryMuscles: ['glutes'], secondaryMuscles: ['hamstrings'],
    howTo: {
      ar: 'اسند أعلى الظهر على بنش والبار فوق الحوض. ادفع الوركين لأعلى لحد ما الجذع يبقى مستقيم مع الفخذين، مع شد قوي في الأرداف أعلى الحركة، وانزل بتحكم.',
      en: 'Rest your upper back on a bench with the bar over your hips. Drive the hips up until the torso is in line with the thighs, squeezing the glutes hard at the top, then lower under control.'
    }
  },

  /* ==================== ذراعين — Arms ==================== */
  {
    id: 'ex_barbell_curl',
    name: { ar: 'باي بار', en: 'Barbell Curl' },
    category: 'strength', equipment: 'barbell',
    primaryMuscles: ['biceps'],
    howTo: {
      ar: 'قف والبار ممسوك بعرض الكتف وكف الإيد لقدام. اثنِ المرفق ورفع البار لأعلى مع ثبات المرفقين جنب الجسم، وانزل بتحكم.',
      en: 'Stand holding the bar with an underhand, shoulder-width grip. Curl it up by bending the elbows, keeping them pinned to your sides, then lower under control.'
    }
  },
  {
    id: 'ex_dumbbell_curl',
    name: { ar: 'باي دمبل', en: 'Dumbbell Curl' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['biceps'],
    howTo: {
      ar: 'امسك دمبل في كل إيد وكف الإيد لقدام. اثنِ المرفق لرفع الدمبل لأعلى، وانزل بتحكم من غير ما تتأرجح بالجسم.',
      en: 'Hold a dumbbell in each hand, palms facing forward. Curl by bending the elbow, then lower under control without swinging the body.'
    }
  },
  {
    id: 'ex_hammer_curl',
    name: { ar: 'باي هامر', en: 'Hammer Curl' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['biceps'], secondaryMuscles: ['forearms'],
    howTo: {
      ar: 'نفس باي الدمبل لكن كف الإيد لناحية الجسم طول الحركة (وضع المطرقة) — بيشرك الساعد أكتر.',
      en: 'Same as the dumbbell curl but with palms facing your body throughout (a hammer grip) — this brings the forearms in more.'
    }
  },
  {
    id: 'ex_concentration_curl',
    name: { ar: 'باي تركيز', en: 'Concentration Curl' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['biceps'],
    howTo: {
      ar: 'اجلس ومرفقك مسند على الفخذ الداخلي، وارفع الدمبل بحركة معزولة من غير حركة في الكتف، وانزل بتحكم.',
      en: 'Sit with the elbow braced against the inner thigh. Curl the dumbbell with an isolated motion, avoiding shoulder movement, then lower under control.'
    }
  },
  {
    id: 'ex_triceps_pushdown',
    name: { ar: 'ضغط ترايسبس كابل', en: 'Triceps Pushdown' },
    category: 'strength', equipment: 'cable',
    primaryMuscles: ['triceps'],
    howTo: {
      ar: 'قف قدام جهاز الكابل والمرفقين ثابتين جنب الجسم. ادفع المقبض لأسفل لحد فرد كامل للذراع، وارجع بتحكم من غير ما يتحرك المرفق لقدام أو للخلف.',
      en: 'Stand facing the cable machine with elbows pinned to your sides. Push the handle down to full arm extension, then return under control without the elbows drifting forward or back.'
    }
  },
  {
    id: 'ex_skull_crusher',
    name: { ar: 'سكل كراشر', en: 'Skull Crusher' },
    category: 'strength', equipment: 'barbell',
    primaryMuscles: ['triceps'],
    howTo: {
      ar: 'استلقِ على البنش والبار فوق الوش بذراع ممدودة. اثنِ المرفق بس لإنزال البار ناحية الجبهة، وارجع لفرد كامل من غير حركة في الكتف.',
      en: 'Lie on the bench with the bar over your face and arms extended. Bend only the elbows to lower the bar toward the forehead, then extend back up without moving the shoulders.'
    }
  },
  {
    id: 'ex_overhead_triceps_extension',
    name: { ar: 'فرد ترايسبس فوق الرأس', en: 'Overhead Triceps Extension' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['triceps'],
    howTo: {
      ar: 'امسك دمبل بإيدين فوق الرأس. انزله خلف الرقبة بثني المرفق، وارجع لفرد كامل مع ثبات المرفقين لقدام.',
      en: 'Hold a dumbbell overhead with both hands. Lower it behind the head by bending the elbows, then extend back up while keeping the elbows pointed forward.'
    }
  },
  {
    id: 'ex_close_grip_bench_press',
    name: { ar: 'بنش برس مسكة ضيقة', en: 'Close-Grip Bench Press' },
    category: 'strength', equipment: 'barbell',
    primaryMuscles: ['triceps'], secondaryMuscles: ['chest'],
    howTo: {
      ar: 'نفس البنش برس لكن بمسكة أضيق من عرض الكتف، وده بيشرك الترايسبس أكتر من الصدر.',
      en: 'Same as the bench press but with a narrower-than-shoulder-width grip, which brings the triceps in more than the chest.'
    }
  },

  /* ==================== بطن — Core ==================== */
  {
    id: 'ex_plank',
    name: { ar: 'بلانك', en: 'Plank' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['abdominals'],
    howTo: {
      ar: 'استند على الساعدين وأصابع القدم والجسم في خط مستقيم من الكتف للكاحل، مع شد البطن والأرداف، وثبّت الوضع من غير ما ينزل الوسط أو يرتفع.',
      en: 'Support yourself on the forearms and toes with the body in a straight line from shoulders to ankles. Brace the abs and glutes and hold the position without letting the hips sag or pike.'
    }
  },
  {
    id: 'ex_crunch',
    name: { ar: 'كرنش', en: 'Crunch' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['abdominals'],
    howTo: {
      ar: 'استلقِ والركب مثنية والقدم على الأرض. ارفع أعلى الظهر عن الأرض بشد عضلات البطن من غير ما تسحب الرقبة بإيدك، وانزل بتحكم.',
      en: 'Lie down with knees bent and feet flat. Curl the upper back off the floor by contracting the abs, without pulling on the neck with your hands, then lower under control.'
    }
  },
  {
    id: 'ex_hanging_leg_raise',
    name: { ar: 'رفع رجل معلق', en: 'Hanging Leg Raise' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['abdominals'],
    howTo: {
      ar: 'اتعلق على البار وارفع الرجلين لقدام لحد ما تكون موازية للأرض تقريبًا أو أعلى، من غير ما تتأرجح، وانزل بتحكم.',
      en: 'Hang from a bar and raise the legs forward until roughly parallel to the floor or higher, avoiding swinging, then lower under control.'
    }
  },
  {
    id: 'ex_russian_twist',
    name: { ar: 'راشن تويست', en: 'Russian Twist' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['abdominals'],
    howTo: {
      ar: 'اجلس والركب مثنية والجذع مايل شوية للخلف، ولف الجذع لجانبين بالتبادل مع إمكانية إمساك وزن خفيف بالإيد.',
      en: 'Sit with knees bent and torso leaned back slightly. Rotate the torso side to side, optionally holding a light weight for extra resistance.'
    }
  },
  {
    id: 'ex_cable_woodchopper',
    name: { ar: 'وود تشوبر كابل', en: 'Cable Woodchopper' },
    category: 'strength', equipment: 'cable',
    primaryMuscles: ['abdominals'],
    howTo: {
      ar: 'قف جنب جهاز الكابل والمقبض فوق ناحية واحدة. اسحبه بحركة قطرية لناحية الجسم التانية مع لف الجذع، وارجع بتحكم.',
      en: 'Stand beside the cable machine with the handle set high to one side. Pull it diagonally across the body while rotating the torso, then return under control.'
    }
  },
  {
    id: 'ex_ab_wheel_rollout',
    name: { ar: 'رول آوت بعجلة البطن', en: 'Ab Wheel Rollout' },
    category: 'strength', equipment: 'other',
    primaryMuscles: ['abdominals'],
    howTo: {
      ar: 'اركع وامسك عجلة البطن قدامك. ادفعها لقدام مع فرد الجسم وشد البطن قوي، وارجع لوضع البداية من غير ما ينزل الظهر.',
      en: 'Kneel and hold the ab wheel in front of you. Roll it forward while extending the body and bracing the abs hard, then pull back to the start without letting the lower back sag.'
    }
  },
  {
    id: 'ex_side_plank',
    name: { ar: 'بلانك جانبي', en: 'Side Plank' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['abdominals'],
    howTo: {
      ar: 'استند على ساعد واحد وحافة القدم في وضع جانبي، والجسم في خط مستقيم، وثبّت الوضع من غير ما ينزل الورك.',
      en: 'Support yourself on one forearm and the side of the foot, keeping the body in a straight line, and hold the position without letting the hip drop.'
    }
  },

  /* ==================== كارديو — Cardio ==================== */
  {
    id: 'ex_treadmill_running',
    name: { ar: 'جري على المشاية', en: 'Treadmill Running' },
    category: 'cardio', equipment: 'machine',
    primaryMuscles: ['quadriceps', 'hamstrings', 'calves'],
    howTo: {
      ar: 'اجري بسرعة وميل مناسبين لهدفك (تحمل أو حرق دهون)، وحافظ على وضع جسم منتصب وخطوة طبيعية من غير ما ترتكز بالكعب بقوة.',
      en: 'Run at a speed and incline suited to your goal (endurance or fat loss), keeping an upright posture and a natural stride without heavy heel-striking.'
    }
  },
  {
    id: 'ex_jump_rope',
    name: { ar: 'نط الحبل', en: 'Jump Rope' },
    category: 'cardio', equipment: 'other',
    primaryMuscles: ['calves'],
    howTo: {
      ar: 'دوّر الحبل بالمعصم مش بالذراع كله، وانط بقفزات صغيرة وخفيفة على أطراف الأصابع.',
      en: 'Turn the rope with the wrists, not the whole arm, and jump with small, light hops on the balls of the feet.'
    }
  },
  {
    id: 'ex_rowing_machine',
    name: { ar: 'جهاز التجديف', en: 'Rowing Machine' },
    category: 'cardio', equipment: 'machine',
    primaryMuscles: ['middle back'], secondaryMuscles: ['hamstrings', 'quadriceps', 'biceps'],
    howTo: {
      ar: 'ادفع بالرجلين الأول، وبعدين انحنِ الجذع للخلف قليلًا، وبعدين اسحب المقبض للصدر — وارجع بنفس الترتيب معكوس.',
      en: 'Drive with the legs first, then lean the torso back slightly, then pull the handle to the chest — return in the reverse order.'
    }
  },
  {
    id: 'ex_stationary_cycling',
    name: { ar: 'عجلة ثابتة', en: 'Stationary Cycling' },
    category: 'cardio', equipment: 'machine',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['hamstrings', 'calves'],
    howTo: {
      ar: 'اضبط ارتفاع السرج بحيث تبقى الركبة شبه فارطة عند أسفل الدواسة، وحافظ على مقاومة وسرعة مناسبة لهدفك.',
      en: 'Set the seat height so the knee is nearly extended at the bottom of the pedal stroke, and keep resistance and cadence matched to your goal.'
    }
  },
  {
    id: 'ex_stair_climber',
    name: { ar: 'جهاز السلم', en: 'Stair Climber' },
    category: 'cardio', equipment: 'machine',
    primaryMuscles: ['glutes', 'quadriceps'],
    howTo: {
      ar: 'اصعد بخطوة ثابتة والجذع منتصب من غير ما تتكئ على المقابض بوزنك كله.',
      en: 'Step at a steady pace with an upright torso, without leaning your full weight on the handrails.'
    }
  },
  {
    id: 'ex_burpees',
    name: { ar: 'بيربيز', en: 'Burpees' },
    category: 'cardio', equipment: 'body only',
    primaryMuscles: ['abdominals'], secondaryMuscles: ['chest', 'quadriceps', 'shoulders'],
    howTo: {
      ar: 'من وضع الوقوف انزل لضغط، اعمل ضغطة واحدة، ارجع الرجلين لقدام، واقفز لأعلى بإيدين فوق الرأس — وكرر.',
      en: 'From standing, drop into a push-up position, perform one push-up, jump the feet back forward, then jump up with arms overhead — repeat.'
    }
  },

  /* ==================== إطالة وموبيليتي — Stretching / Mobility ==================== */
  {
    id: 'ex_hamstring_stretch',
    name: { ar: 'إطالة أوتار الركبة', en: 'Hamstring Stretch' },
    category: 'stretching', equipment: 'body only',
    primaryMuscles: ['hamstrings'],
    howTo: {
      ar: 'اجلس ورجل ممدودة والتانية مثنية، وامد الجسم لقدام ناحية الرجل الممدودة لحد ما تحس بشد خلف الفخذ، وثبّت من غير ألم.',
      en: 'Sit with one leg extended and the other bent, then hinge forward toward the extended leg until you feel a stretch behind the thigh, holding without pain.'
    }
  },
  {
    id: 'ex_quad_stretch',
    name: { ar: 'إطالة الفخذ الأمامي', en: 'Quad Stretch' },
    category: 'stretching', equipment: 'body only',
    primaryMuscles: ['quadriceps'],
    howTo: {
      ar: 'قف على رجل واحدة وامسك كاحل الرجل التانية من الخلف وقرّبه من المؤخرة لحد ما تحس بشد في مقدمة الفخذ، وثبّت التوازن.',
      en: 'Stand on one leg, hold the other ankle behind you, and pull it toward the glutes until you feel a stretch in the front of the thigh, keeping your balance.'
    }
  },
  {
    id: 'ex_shoulder_stretch',
    name: { ar: 'إطالة الكتف', en: 'Cross-Body Shoulder Stretch' },
    category: 'stretching', equipment: 'body only',
    primaryMuscles: ['shoulders'],
    howTo: {
      ar: 'مد ذراع واحدة أمام الصدر وامسكها بالإيد التانية من فوق أو تحت المرفق، واسحبها لناحية الصدر بلطف لحد ما تحس بشد في الكتف.',
      en: 'Bring one arm across the chest and hold it with the other hand above or below the elbow, gently pulling it toward the chest until you feel a shoulder stretch.'
    }
  },
  {
    id: 'ex_cat_cow',
    name: { ar: 'قطة وبقرة (كات-كاو)', en: 'Cat-Cow' },
    category: 'stretching', equipment: 'body only',
    primaryMuscles: ['lower back'],
    howTo: {
      ar: 'ابدأ على أربعة، وقوّس الظهر لأعلى مع شد البطن (قطة)، وبعدين اعكس الحركة بإنزال البطن ورفع الصدر والرأس (بقرة)، وكرر ببطء.',
      en: 'Start on all fours, round the back upward while bracing the abs (cat), then reverse into an arched back with the chest and head lifted (cow), repeating slowly.'
    }
  },
  {
    id: 'ex_hip_flexor_stretch',
    name: { ar: 'إطالة مثنية الورك', en: 'Hip Flexor Stretch' },
    category: 'stretching', equipment: 'body only',
    primaryMuscles: ['adductors'],
    howTo: {
      ar: 'اركع على ركبة واحدة والرجل التانية لقدام بزاوية 90 درجة، وادفع الحوض لقدام بلطف لحد ما تحس بشد في مقدمة الورك الخلفية.',
      en: 'Kneel on one knee with the other foot forward at 90°, gently pushing the hips forward until you feel a stretch in the front of the back hip.'
    }
  },
  {
    id: 'ex_childs_pose',
    name: { ar: 'وضعية الطفل', en: "Child's Pose" },
    category: 'stretching', equipment: 'body only',
    primaryMuscles: ['lower back'],
    howTo: {
      ar: 'اجلس على الكعبين وامد الجذع والذراعين لقدام على الأرض لحد ما تحس بإطالة لطيفة في أسفل الظهر والكتف، وتنفس بعمق.',
      en: 'Sit back on your heels and extend the torso and arms forward along the floor until you feel a gentle stretch in the lower back and shoulders, breathing deeply.'
    }
  },
  {
    id: 'ex_goblet_squat',
    name: { ar: 'سكوات جوبلت', en: 'Goblet Squat' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['glutes'],
    howTo: {
      ar: 'امسك دمبل واحد قدام صدرك بإيدين، وانزل بالسكوات مع الحفاظ على الجذع منتصب والكوعين جوه الركبتين، وارجع لأعلى بدفع من الكعبين.',
      en: 'Hold one dumbbell close to your chest with both hands, squat down keeping the torso upright and elbows inside the knees, then drive back up through the heels.'
    }
  },
  {
    id: 'ex_sumo_deadlift',
    name: { ar: 'ديدليفت سومو', en: 'Sumo Deadlift' },
    category: 'strength', equipment: 'barbell',
    primaryMuscles: ['hamstrings'], secondaryMuscles: ['glutes', 'quadriceps', 'lower back'],
    howTo: {
      ar: 'قف برجلين واسعتين وأصابع القدم لبرا شوية، وامسك البار جوه الركبتين، وارفعه بمد الركبتين والورك مع الحفاظ على استقامة الظهر.',
      en: 'Stand with a wide stance and toes turned slightly out, grip the bar inside the knees, and lift by extending the knees and hips together while keeping the back straight.'
    }
  },
  {
    id: 'ex_glute_bridge',
    name: { ar: 'جسر الألوية', en: 'Glute Bridge' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['glutes'], secondaryMuscles: ['hamstrings'],
    howTo: {
      ar: 'استلقِ على ظهرك والركبتين مثنيتين والقدمين على الأرض، وارفع الحوض لأعلى بالضغط على الألوية لحد ما الجسم يبقى خط مستقيم من الركبة للكتف، وانزل ببطء.',
      en: 'Lie on your back with knees bent and feet flat, squeeze the glutes to lift the hips until the body forms a straight line from knee to shoulder, then lower slowly.'
    }
  },
  {
    id: 'ex_kettlebell_swing',
    name: { ar: 'سوينج كيتل بيل', en: 'Kettlebell Swing' },
    category: 'strength', equipment: 'kettlebells',
    primaryMuscles: ['glutes'], secondaryMuscles: ['hamstrings', 'lower back'],
    howTo: {
      ar: 'امسك الكيتل بيل بإيدين وارجع بالورك لخلف (هينج)، وادفع بالورك لقدام بقوة عشان الكيتل بيل يطلع لمستوى الكتف، والحركة كلها من الورك مش الكتف.',
      en: 'Hold the kettlebell with both hands, hinge back at the hips, then drive the hips forward powerfully to swing the kettlebell to shoulder height — the power comes from the hips, not the arms.'
    }
  },
  {
    id: 'ex_farmers_carry',
    name: { ar: 'مشي الفلاح (فارمرز كاري)', en: "Farmer's Carry" },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['forearms'], secondaryMuscles: ['traps', 'abdominals'],
    howTo: {
      ar: 'امسك دمبلين ثقيلين جنب جسمك، وامشي بخطوات ثابتة مع الحفاظ على الجذع منتصب والكتفين لخلف من غير ما تميل لأي جنب.',
      en: 'Hold a heavy dumbbell in each hand at your sides, and walk with controlled steps while keeping the torso upright and shoulders back without leaning to either side.'
    }
  },
  {
    id: 'ex_box_jump',
    name: { ar: 'قفز الصندوق', en: 'Box Jump' },
    category: 'plyometrics', equipment: 'other',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: 'قف قدام صندوق ثابت، وانزل بربع سكوات، وافقز لأعلى بالذراعين للاستعانة، واهبط بالكامل فوق الصندوق بركبتين مرنتين، وانزل تاني بهدوء.',
      en: 'Stand in front of a sturdy box, dip into a quarter squat, jump up using your arms for momentum, land fully on top with soft knees, then step back down calmly.'
    }
  },
  {
    id: 'ex_mountain_climbers',
    name: { ar: 'مونتن كلايمبرز', en: 'Mountain Climbers' },
    category: 'cardio', equipment: 'body only',
    primaryMuscles: ['abdominals'], secondaryMuscles: ['shoulders'],
    howTo: {
      ar: 'ابدأ في وضع البلانك، وحرك ركبة واحدة لصدرك بسرعة وبعدين بدلها بالتانية بشكل متتابع زي الجري في مكانك مع ثبات الحوض.',
      en: 'Start in a plank position and rapidly drive one knee toward your chest, then alternate legs in a running motion while keeping the hips stable.'
    }
  },
  {
    id: 'ex_reverse_lunge',
    name: { ar: 'لنج خلفي', en: 'Reverse Lunge' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['glutes'],
    howTo: {
      ar: 'وأنت واقف، اخطُ برجل واحدة لخلف وانزل لحد ما الركبة الأمامية تبقى بزاوية 90 درجة، وارجع لوضع البداية بدفع من الرجل الأمامية.',
      en: 'From standing, step one leg back and lower until the front knee reaches about 90°, then push back up through the front leg to standing.'
    }
  },
  {
    id: 'ex_step_up',
    name: { ar: 'صعود درجة (ستيب أب)', en: 'Step-Up' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['glutes'],
    howTo: {
      ar: 'قف قدام بنش أو درجة ثابتة، واصعد بركبة واحدة لحد ما الرجل تبقى مفرودة بالكامل فوق البنش، وانزل ببطء وكرر بالتبادل.',
      en: 'Stand facing a sturdy bench or step, step up with one leg until it fully extends on top, then lower back down slowly and alternate legs.'
    }
  },
  {
    id: 'ex_single_leg_rdl',
    name: { ar: 'رومانيان ديدليفت رجل واحدة', en: 'Single-Leg Romanian Deadlift' },
    category: 'strength', equipment: 'dumbbell',
    primaryMuscles: ['hamstrings'], secondaryMuscles: ['glutes'],
    howTo: {
      ar: 'قف على رجل واحدة والدمبل في الإيد المقابلة، وانحني لقدام من الورك مع مد الرجل التانية لخلف لحد ما جسمك يبقى شبه أفقي، وارجع لأعلى بتحكم.',
      en: 'Stand on one leg holding a dumbbell in the opposite hand, hinge forward at the hips while extending the other leg back until roughly horizontal, then return under control.'
    }
  },
  {
    id: 'ex_cable_pull_through',
    name: { ar: 'كابل بول ثرو', en: 'Cable Pull-Through' },
    category: 'strength', equipment: 'cable',
    primaryMuscles: ['glutes'], secondaryMuscles: ['hamstrings'],
    howTo: {
      ar: 'قف وضهرك للجهاز والحبل بين رجليك، وانحني لقدام من الورك مع ثبات الركبتين شوية، وبعدين ادفع بالورك لقدام لحد ما تقف باستقامة كاملة.',
      en: 'Stand facing away from the cable machine with the rope between your legs, hinge forward at the hips with slightly bent knees, then drive the hips forward to full standing.'
    }
  },
  {
    id: 'ex_band_lateral_walk',
    name: { ar: 'مشي جانبي بالأستك', en: 'Band Lateral Walk' },
    category: 'strength', equipment: 'bands',
    primaryMuscles: ['abductors'], secondaryMuscles: ['glutes'],
    howTo: {
      ar: 'حط الأستك حوالين الكاحلين أو فوق الركبتين، وانزل بنص سكوات، وامشي بخطوات جانبية صغيرة مع الحفاظ على شد مستمر في الأستك.',
      en: 'Place a resistance band around your ankles or above the knees, drop into a quarter squat, and take small sideways steps while keeping constant tension on the band.'
    }
  },
  {
    id: 'ex_wall_sit',
    name: { ar: 'جلسة الحيط (وول سيت)', en: 'Wall Sit' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['quadriceps'],
    howTo: {
      ar: 'اتكئ بضهرك على الحيط وانزل لحد ما الركبتين بزاوية 90 درجة زي إنك قاعد على كرسي وهمي، وثبّت الوضعية لأطول مدة ممكنة.',
      en: 'Lean your back against a wall and slide down until the knees form a 90° angle as if sitting on an invisible chair, holding the position as long as you can.'
    }
  },
  {
    id: 'ex_dead_bug',
    name: { ar: 'الحشرة الميتة (ديد باج)', en: 'Dead Bug' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['abdominals'],
    howTo: {
      ar: 'استلقِ على ظهرك والذراعين والركبتين لأعلى بزاوية 90 درجة، ومد ذراع ورجل مقابلة لبرا ببطء مع ثبات أسفل الظهر ملزوق بالأرض، وارجع وكرر بالتبادل.',
      en: 'Lie on your back with arms and knees raised at 90°, slowly extend one arm and the opposite leg out while keeping the lower back pressed to the floor, then return and alternate.'
    }
  },
  {
    id: 'ex_bird_dog',
    name: { ar: 'بيرد دوج', en: 'Bird Dog' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['lower back'], secondaryMuscles: ['abdominals'],
    howTo: {
      ar: 'ابدأ على أربعة، ومد ذراع ورجل مقابلة في نفس الوقت لحد ما تبقوا في خط واحد مع الجذع، وثبّت 2-3 ثواني قبل ما ترجع وتبدّل الجانب.',
      en: 'Start on all fours and extend one arm and the opposite leg at the same time until they align with the torso, hold for 2-3 seconds, then return and switch sides.'
    }
  },
  {
    id: 'ex_superman',
    name: { ar: 'سوبرمان', en: 'Superman' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['lower back'], secondaryMuscles: ['glutes'],
    howTo: {
      ar: 'استلقِ على بطنك والذراعين مفرودين لقدام، وارفع الذراعين والصدر والرجلين لأعلى في نفس الوقت، وثبّت لثانيتين وانزل ببطء.',
      en: 'Lie face down with arms extended forward, lift the arms, chest, and legs off the floor at the same time, hold for a couple of seconds, then lower slowly.'
    }
  },
  {
    id: 'ex_seated_shoulder_press_machine',
    name: { ar: 'كتف بالجهاز (جلوس)', en: 'Seated Machine Shoulder Press' },
    category: 'strength', equipment: 'machine',
    primaryMuscles: ['shoulders'], secondaryMuscles: ['triceps'],
    howTo: {
      ar: 'اجلس على الجهاز وضهرك ملزوق باللوح، وادفع المقابض لأعلى لحد مد شبه كامل للذراعين، وارجع ببطء من غير ما تقفل الكوعين بقوة.',
      en: 'Sit with your back flat against the pad, press the handles upward to near-full arm extension, then lower slowly without locking the elbows hard.'
    }
  },
  {
    id: 'ex_preacher_curl',
    name: { ar: 'بايسبس بريتشر', en: 'Preacher Curl' },
    category: 'strength', equipment: 'e-z curl bar',
    primaryMuscles: ['biceps'],
    howTo: {
      ar: 'اجلس على مقعد البريتشر والذراعين مسندين بالكامل على اللوح المائل، وارفع البار لأعلى بثني الكوع بس من غير رفع الكتف، وانزل ببطء لحد مد شبه كامل.',
      en: 'Sit at the preacher bench with your arms fully supported on the pad, curl the bar up by bending only at the elbow without lifting the shoulder, then lower slowly to near-full extension.'
    }
  },
  {
    id: 'ex_standing_calf_raise_machine',
    name: { ar: 'سمانة بالجهاز (وقوف)', en: 'Standing Machine Calf Raise' },
    category: 'strength', equipment: 'machine',
    primaryMuscles: ['calves'],
    howTo: {
      ar: 'قف على الجهاز والكتفين تحت اللوح، وارفع الكعبين لأعلى قدر الإمكان بالضغط على أصابع القدم، وانزل لحد إحساس إطالة خفيفة في السمانة.',
      en: 'Stand on the machine with your shoulders under the pads, rise onto your toes as high as possible, then lower down until you feel a light stretch in the calves.'
    }
  },
  {
    id: 'ex_battle_ropes',
    name: { ar: 'حبال المعركة (باتل روبس)', en: 'Battle Ropes' },
    category: 'cardio', equipment: 'other',
    primaryMuscles: ['shoulders'], secondaryMuscles: ['abdominals'],
    howTo: {
      ar: 'امسك طرف كل حبل بإيد، وحرك الذراعين بالتبادل لأعلى وأسفل بسرعة عالية مع نص سكوات ثابت وثبات في الجذع.',
      en: 'Hold one end of each rope, alternate driving your arms up and down rapidly while holding a stable quarter-squat stance with a braced core.'
    }
  },

  /* ==================== إحماء وحركية — Warm-up & mobility ==================== */
  {
    id: 'ex_ankle_circles',
    name: { ar: 'دوائر الكاحل', en: 'Ankle Circles' },
    category: 'stretching', equipment: 'body only',
    primaryMuscles: ['calves'],
    howTo: {
      ar: 'ارفع القدم عن الأرض ولف الكاحل في دوائر كاملة وبطيئة في الاتجاهين، مع تثبيت الركبة قدر الإمكان.',
      en: 'Lift one foot off the floor and draw slow full circles with the ankle in both directions, keeping the knee as still as possible.'
    }
  },
  {
    id: 'ex_leg_swings',
    name: { ar: 'مرجحة الرجل', en: 'Leg Swings' },
    category: 'stretching', equipment: 'body only',
    primaryMuscles: ['hamstrings'], secondaryMuscles: ['glutes', 'quadriceps'],
    howTo: {
      ar: 'امسك حاجة ثابتة للتوازن، ومرجح الرجل لقدام ولورا في مدى مريح ومتحكم فيه، وبعدين كرر بالعرض. حركة إحماء مش إطالة ثابتة.',
      en: 'Hold something stable for balance and swing one leg forward and back through a comfortable controlled range, then repeat side to side. A warm-up drill, not a static stretch.'
    }
  },
  {
    id: 'ex_arm_circles',
    name: { ar: 'دوائر الذراعين', en: 'Arm Circles' },
    category: 'stretching', equipment: 'body only',
    primaryMuscles: ['shoulders'],
    howTo: {
      ar: 'افرد ذراعيك للجانبين ولف دوائر صغيرة وكبّرها تدريجيًا، وبعدين اعكس الاتجاه.',
      en: 'Extend your arms to the sides and draw small circles, gradually widening them, then reverse the direction.'
    }
  },
  {
    id: 'ex_thoracic_rotation',
    name: { ar: 'دوران الفقرات الصدرية', en: 'Thoracic Rotation' },
    category: 'stretching', equipment: 'body only',
    primaryMuscles: ['middle back'], secondaryMuscles: ['abdominals'],
    howTo: {
      ar: 'من وضع الركوع على أربع، حط إيد ورا الرأس ولف الكوع لأعلى بالتدريج لحد ما يبص للسقف، وارجع ببطء. الحركة من وسط الظهر مش من أسفل الظهر.',
      en: 'From all fours, place one hand behind your head and rotate the elbow up toward the ceiling, then return slowly. The movement comes from the mid-back, not the lower back.'
    }
  },
  {
    id: 'ex_band_pull_apart',
    name: { ar: 'فتح الأستك للجانبين', en: 'Band Pull Apart' },
    category: 'strength', equipment: 'bands',
    primaryMuscles: ['middle back'], secondaryMuscles: ['shoulders', 'traps'],
    howTo: {
      ar: 'امسك الأستك بالإيدين بعرض الكتفين والذراعين ممدودة قدامك، واسحبه للجانبين لحد ما يقرب من صدرك مع تقريب لوحي الكتف، وارجع بتحكم.',
      en: 'Hold a band at shoulder width with arms extended in front, pull it apart until it nears your chest while squeezing the shoulder blades, then return under control.'
    }
  },
  {
    id: 'ex_band_external_rotation',
    name: { ar: 'دوران خارجي بالأستك', en: 'Band External Rotation' },
    category: 'strength', equipment: 'bands',
    primaryMuscles: ['shoulders'],
    howTo: {
      ar: 'ثبّت الكوع جنب جسمك بزاوية 90 درجة، وشد الأستك للخارج بتدوير الساعد بعيد عن البطن من غير ما الكوع يتحرك عن مكانه.',
      en: 'Keep the elbow tucked at your side at 90°, and rotate the forearm outward against the band without letting the elbow drift away from your body.'
    }
  },

  /* ==================== وزن الجسم والأداء — Bodyweight & performance ==================== */
  {
    id: 'ex_bodyweight_squat',
    name: { ar: 'سكوات بوزن الجسم', en: 'Bodyweight Squat' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['glutes', 'hamstrings'],
    howTo: {
      ar: 'قف والقدمين بعرض الكتفين، وانزل بالورك لورا وتحت مع إبقاء الصدر مرفوع والكعبين على الأرض، وقف تاني بالضغط على وسط القدم.',
      en: 'Stand with feet shoulder-width apart, sit the hips back and down while keeping the chest up and heels down, then stand by pushing through midfoot.'
    }
  },
  {
    id: 'ex_lateral_lunge',
    name: { ar: 'لانج جانبي', en: 'Lateral Lunge' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['glutes', 'adductors'],
    howTo: {
      ar: 'اخطي خطوة واسعة للجانب وانزل بالورك على الرجل دي مع إبقاء الرجل التانية ممدودة، وادفع بالكعب للرجوع لوضع الوقوف.',
      en: 'Take a wide step to the side and sit the hips back over that leg while the other stays straight, then push through the heel to return to standing.'
    }
  },
  {
    id: 'ex_single_leg_squat',
    name: { ar: 'سكوات على رجل واحدة', en: 'Single Leg Squat' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['glutes', 'hamstrings'],
    howTo: {
      ar: 'قف على رجل واحدة وانزل بتحكم في المدى اللي تقدر تتحكم فيه من غير ما الركبة تميل للداخل، وارجع لأعلى. تقدر تستعين بحاجة للتوازن في البداية.',
      en: 'Stand on one leg and lower under control through a range you can manage without the knee caving inward, then rise back up. Use a support for balance at first.'
    }
  },
  {
    id: 'ex_nordic_hamstring_curl',
    name: { ar: 'نورديك لأوتار الركبة', en: 'Nordic Hamstring Curl' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['hamstrings'], secondaryMuscles: ['glutes'],
    howTo: {
      ar: 'اركع وخلي حد يثبّت كعبيك، ومِل بجسمك لقدام ببطء شديد مع شد أوتار الركبة ومنع السقوط قدر الإمكان، واستقبل الأرض بإيديك. تمرين قوي جدًا — ابدأ بعدد قليل.',
      en: 'Kneel with your heels anchored, lower your torso forward as slowly as possible using the hamstrings to resist, and catch yourself with your hands. Very demanding — start with low volume.'
    }
  },
  {
    id: 'ex_copenhagen_plank',
    name: { ar: 'بلانك كوبنهاجن', en: 'Copenhagen Plank' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['adductors'], secondaryMuscles: ['abdominals'],
    howTo: {
      ar: 'استند على ساعدك في وضع بلانك جانبي، وحط الرجل العليا على بنش، وارفع الورك والرجل السفلية مع الضغط بالفخذ الداخلي على البنش.',
      en: 'Set up in a side plank on your forearm with the top leg resting on a bench, then lift the hips and the bottom leg while pressing the inner thigh into the bench.'
    }
  },
  {
    id: 'ex_hollow_body_hold',
    name: { ar: 'ثبات الجسم المقوّس (هولو)', en: 'Hollow Body Hold' },
    category: 'strength', equipment: 'body only',
    primaryMuscles: ['abdominals'],
    howTo: {
      ar: 'استلقِ على ظهرك وارفع الكتفين والرجلين شوية عن الأرض مع لزق أسفل الظهر بالأرض تمامًا، وثبّت. لو أسفل ظهرك اتقوس اقرب رجليك ناحيتك.',
      en: 'Lie on your back and lift the shoulders and legs slightly off the floor while pressing the lower back flat into the ground, and hold. If the lower back arches, bring the legs closer in.'
    }
  },
  {
    id: 'ex_medicine_ball_slam',
    name: { ar: 'ضرب الكرة الطبية', en: 'Medicine Ball Slam' },
    category: 'plyometrics', equipment: 'medicine ball',
    primaryMuscles: ['abdominals'], secondaryMuscles: ['shoulders', 'lats'],
    howTo: {
      ar: 'ارفع الكرة فوق رأسك بامتداد كامل، واضربها في الأرض بأقصى قوة مع ثني الورك والبطن، والتقطها وكرر.',
      en: 'Raise the ball overhead to full extension, slam it into the floor as hard as possible by hinging through the hips and trunk, then pick it up and repeat.'
    }
  },

  /* ==================== كارديو ميداني — Field cardio ==================== */
  {
    id: 'ex_interval_running',
    name: { ar: 'جري متقطع', en: 'Interval Running' },
    category: 'cardio', equipment: 'body only',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['hamstrings', 'calves'],
    howTo: {
      ar: 'بدّل بين فترات جري بسرعة عالية وفترات مشي أو جري خفيف للاستشفاء، حسب التوقيت المحدد في البرنامج.',
      en: 'Alternate between bouts of hard running and periods of walking or easy jogging for recovery, following the work-to-rest timing set in the program.'
    }
  },
  {
    id: 'ex_sprint_intervals',
    name: { ar: 'فترات عدو (سبرنت)', en: 'Sprint Intervals' },
    category: 'cardio', equipment: 'body only',
    primaryMuscles: ['hamstrings'], secondaryMuscles: ['glutes', 'quadriceps', 'calves'],
    howTo: {
      ar: 'بعد إحماء كويس، اعدُ بأقصى سرعة للمسافة المحددة وبعدين خد راحة كاملة قبل التكرار الجاي. الإحماء هنا مش اختياري.',
      en: 'After a thorough warm-up, sprint at maximum effort for the prescribed distance, then take full recovery before the next rep. The warm-up is not optional here.'
    }
  },
  {
    id: 'ex_shuttle_run',
    name: { ar: 'جري مكوكي', en: 'Shuttle Run' },
    category: 'cardio', equipment: 'body only',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['hamstrings', 'glutes', 'calves'],
    howTo: {
      ar: 'اجري بسرعة بين علامتين على مسافة محددة مع الوقوف وتغيير الاتجاه عند كل علامة. ركّز على نزول الورك عند التوقف عشان تحمي الركبة.',
      en: 'Run at speed between two markers a set distance apart, decelerating and changing direction at each one. Focus on sinking the hips when stopping to protect the knee.'
    }
  },
  {
    id: 'ex_stationary_bike',
    name: { ar: 'دراجة ثابتة', en: 'Bicycling, Stationary' },
    category: 'cardio', equipment: 'machine',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['hamstrings', 'glutes', 'calves'],
    howTo: {
      ar: 'اظبط ارتفاع الكرسي بحيث تبقى الركبة شبه ممدودة في أخفض نقطة، واحتفظ بإيقاع ثابت على المقاومة والمدة المحددين.',
      en: 'Set the seat height so the knee is almost straight at the lowest point, and hold a steady cadence at the prescribed resistance and duration.'
    }
  },

  /* ==================== إطالات إضافية — Additional stretches ==================== */
  {
    id: 'ex_calf_stretch',
    name: { ar: 'إطالة السمانة', en: 'Calf Stretch' },
    category: 'stretching', equipment: 'body only',
    primaryMuscles: ['calves'],
    howTo: {
      ar: 'قف مواجه حائط وحط رجل لورا مفرودة والكعب على الأرض، ومِل بجسمك لقدام لحد إحساس إطالة في السمانة، وثبّت.',
      en: 'Face a wall with one leg back, knee straight and heel on the floor, then lean forward until you feel a stretch in the calf and hold.'
    }
  },
  {
    id: 'ex_adductor_stretch',
    name: { ar: 'إطالة المقربات', en: 'Adductor Stretch' },
    category: 'stretching', equipment: 'body only',
    primaryMuscles: ['adductors'],
    howTo: {
      ar: 'من وضع الوقوف بقدمين متباعدتين، انزل بالورك على رجل واحدة مع إبقاء التانية ممدودة لحد إحساس إطالة في الفخذ الداخلي، وثبّت.',
      en: 'From a wide stance, shift your hips over one leg while the other stays straight until you feel a stretch in the inner thigh, and hold.'
    }
  },
  {
    id: 'ex_neck_stretch',
    name: { ar: 'إطالة الرقبة', en: 'Neck Stretch' },
    category: 'stretching', equipment: 'body only',
    primaryMuscles: ['neck'], secondaryMuscles: ['traps'],
    howTo: {
      ar: 'مِل رأسك برفق ناحية كتف واحدة لحد إحساس إطالة على الجنب التاني من الرقبة، وثبّت من غير أي شد مفاجئ، وكرر على الناحية التانية.',
      en: 'Gently tilt your head toward one shoulder until you feel a stretch along the opposite side of the neck, hold without any sudden pulling, then repeat on the other side.'
    }
  }
];
