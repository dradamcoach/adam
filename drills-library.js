/*
 * ADAM — مكتبة الدريلات: كروس فيت · هايروكس · كارديو · دريلات ملاعب
 *
 * ⚠️ زي باقي المحتوى المبدئي: دي نقطة بداية، راجعها وعدّلها على
 * أسلوبك وعلى مستوى عميلك قبل ما تسندها. الدريلات دي فيها حركات
 * سريعة وتغيير اتجاه وقفز — ماتديهاش لعميل لسه بيبني أساسه، ولا
 * لحالة محتاجة إذن طبي لسه مجاش.
 *
 * المفاتيح (equipment / category) بتستخدم نفس القيم في app.js.
 */

export const DRILL_CATEGORIES = {
  crossfit:     { ar: 'كروس فيت',        en: 'CrossFit' },
  hyrox:        { ar: 'هايروكس',         en: 'HYROX' },
  agility:      { ar: 'دريلات ملاعب',    en: 'Field drills' },
  conditioning: { ar: 'كارديو وتكييف',   en: 'Cardio & conditioning' },
  track:        { ar: 'جري وألعاب قوى ومضمار', en: 'Running & track' }
};

/* أدوات الملاعب والصالات الوظيفية اللي مش موجودة في مكتبة الحديد */
export const DRILL_EQUIPMENT = {
  'cones':        { ar: 'أقماع',          en: 'Cones' },
  'discs':        { ar: 'أطباق',          en: 'Marker discs' },
  'hurdles':      { ar: 'حواجز',          en: 'Hurdles' },
  'ladder':       { ar: 'سلم رشاقة',      en: 'Agility ladder' },
  'sled':         { ar: 'سليد',           en: 'Sled' },
  'rower':        { ar: 'روينج',          en: 'Rower' },
  'ski erg':      { ar: 'سكي إرج',        en: 'SkiErg' },
  'assault bike': { ar: 'عجلة هوائية',    en: 'Assault bike' },
  'wall ball':    { ar: 'وول بول',        en: 'Wall ball' },
  'sandbag':      { ar: 'شنطة رمل',       en: 'Sandbag' },
  'jump rope':    { ar: 'حبل نط',         en: 'Jump rope' },
  'box':          { ar: 'بوكس',           en: 'Plyo box' },
  'rings':        { ar: 'حلق',            en: 'Rings' },
  'pull-up bar':  { ar: 'بار عقلة',       en: 'Pull-up bar' },
  'battle rope':  { ar: 'حبال قتالية',    en: 'Battle ropes' },
  'parachute':    { ar: 'باراشوت جري',    en: 'Running parachute' }
};

export const DRILLS_LIBRARY = [

  /* ==================== كروس فيت — CrossFit ==================== */
  {
    id: 'dr_thruster',
    name: { ar: 'ثراستر', en: 'Thruster' },
    category: 'crossfit', equipment: 'barbell',
    primaryMuscles: ['quadriceps', 'shoulders'], secondaryMuscles: ['glutes', 'triceps'],
    howTo: {
      ar: 'من وضع الفرونت سكوات، انزل لسكوات كامل واطلع بسرعة، واستغل دفعة الرجلين تكمّل البار فوق الراس في حركة واحدة متصلة. البار بيرجع على الكتف ويكرر.',
      en: 'From a front rack, drop into a full squat and drive up fast, using the leg drive to carry the bar overhead in one continuous move. Return the bar to the shoulders and repeat.'
    }
  },
  {
    id: 'dr_wall_ball',
    name: { ar: 'وول بول', en: 'Wall Ball Shot' },
    category: 'crossfit', equipment: 'wall ball',
    primaryMuscles: ['quadriceps', 'shoulders'], secondaryMuscles: ['glutes', 'abdominals'],
    howTo: {
      ar: 'امسك الكرة على الصدر، انزل سكوات كامل، واطلع بقوة وارمِ الكرة على علامة على الحيطة (٣ متر للرجالة / ٢.٧ للستات). استقبلها على الصدر وانزل تاني في نفس الحركة.',
      en: 'Hold the ball at the chest, squat to full depth, drive up and throw the ball to a target on the wall (10ft men / 9ft women). Catch it at the chest and flow straight into the next rep.'
    }
  },
  {
    id: 'dr_box_jump',
    name: { ar: 'قفز على البوكس', en: 'Box Jump' },
    category: 'crossfit', equipment: 'box',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['calves', 'hamstrings'],
    howTo: {
      ar: 'من وقفة عرض الحوض، انزل ربع سكوات وارمِ ذراعيك واقفز على البوكس بالرجلين. انزل بهدوء — النزول بالخطوة أأمن للركبة من القفز لتحت في التكرارات الكتير.',
      en: 'From hip-width stance, dip into a quarter squat, swing the arms and jump onto the box with both feet. Step down under control — stepping down is kinder to the knees than rebounding on high reps.'
    }
  },
  {
    id: 'dr_burpee',
    name: { ar: 'بيربي', en: 'Burpee' },
    category: 'crossfit', equipment: 'body only',
    primaryMuscles: ['chest', 'quadriceps'], secondaryMuscles: ['abdominals', 'shoulders'],
    howTo: {
      ar: 'من الوقوف، انزل بإيديك على الأرض وارمِ رجليك لورا لوضع بلانك، صدرك يلمس الأرض، ارجع رجليك واقفز لفوق بتصفيقة فوق الراس.',
      en: 'From standing, place the hands down and kick the feet back to a plank, chest to the floor, jump the feet back in and jump up with a clap overhead.'
    }
  },
  {
    id: 'dr_double_under',
    name: { ar: 'دابل أندر (نطتين)', en: 'Double Under' },
    category: 'crossfit', equipment: 'jump rope',
    primaryMuscles: ['calves'], secondaryMuscles: ['shoulders', 'abdominals'],
    howTo: {
      ar: 'نطة واحدة يمر فيها الحبل تحت رجليك مرتين. الرسغ هو اللي بيلف مش الذراع، والقفزة أعلى شوية من النط العادي مع جسم مشدود.',
      en: 'One jump, two rope passes. The wrists spin the rope — not the arms — and the jump is slightly higher than a single under with a tight body.'
    }
  },
  {
    id: 'dr_toes_to_bar',
    name: { ar: 'رجلين للبار', en: 'Toes-to-Bar' },
    category: 'crossfit', equipment: 'pull-up bar',
    primaryMuscles: ['abdominals'], secondaryMuscles: ['lats', 'forearms'],
    howTo: {
      ar: 'معلّق من البار، استخدم أرجحة الكتف (kip) واطوِ حوضك عشان توصل أصابع رجليك للبار، وارجع بتحكّم من غير ما تفقد الشد.',
      en: 'Hanging from the bar, use a shoulder kip and posterior pelvic tilt to bring the toes to the bar, then return under control without losing tension.'
    }
  },
  {
    id: 'dr_kb_swing',
    name: { ar: 'سوينج كيتل بيل', en: 'Kettlebell Swing' },
    category: 'crossfit', equipment: 'kettlebells',
    primaryMuscles: ['glutes', 'hamstrings'], secondaryMuscles: ['lower back', 'shoulders'],
    howTo: {
      ar: 'الحركة من الحوض مش من الذراع: ارجع الكيتل بين رجليك ثم افرد حوضك بقوة عشان ترميها لقدام. الضهر يفضل محايد طول الوقت.',
      en: 'The move comes from the hips, not the arms: hinge the bell back between the legs, then snap the hips forward to float it up. The back stays neutral throughout.'
    }
  },
  {
    id: 'dr_devil_press',
    name: { ar: 'ديفل بريس', en: 'Devil Press' },
    category: 'crossfit', equipment: 'dumbbell',
    primaryMuscles: ['shoulders', 'chest'], secondaryMuscles: ['glutes', 'abdominals'],
    howTo: {
      ar: 'بيربي وإيديك على دمبلين، وبعد ما تقف ارمِ الدمبلين فوق راسك في حركة واحدة (سناتش بالدمبلين). تمرين مرهق جدًا — قلّل العدد في الأول.',
      en: 'A burpee with a dumbbell in each hand, then swing both dumbbells overhead in one movement as you stand. Very taxing — keep the reps low at first.'
    }
  },
  {
    id: 'dr_pistol_squat',
    name: { ar: 'سكوات على رجل واحدة', en: 'Pistol Squat' },
    category: 'crossfit', equipment: 'body only',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['abdominals', 'hamstrings'],
    howTo: {
      ar: 'قف على رجل واحدة والتانية مفرودة قدامك، انزل سكوات كامل بتحكّم واطلع. لو صعبة، امسك حاجة أو انزل على بوكس عالي في الأول.',
      en: 'Stand on one leg with the other extended forward, squat to full depth under control and stand up. Hold a support or squat to a high box while learning.'
    }
  },
  {
    id: 'dr_hspu',
    name: { ar: 'ضغط الكتف بالمقلوب', en: 'Handstand Push-up' },
    category: 'crossfit', equipment: 'body only',
    primaryMuscles: ['shoulders'], secondaryMuscles: ['triceps', 'abdominals'],
    howTo: {
      ar: 'من وقفة اليدين على الحيطة، انزل براسك لحد ما تلمس وسادة تحتك ثم ادفع لفوق. ممنوعة تمامًا لأي حد عنده ضغط أو مشكلة في الرقبة.',
      en: 'From a wall-supported handstand, lower until the head touches a pad and press back up. Not suitable at all for anyone with high blood pressure or a neck issue.'
    }
  },
  {
    id: 'dr_ring_row',
    name: { ar: 'سحب على الحلق', en: 'Ring Row' },
    category: 'crossfit', equipment: 'rings',
    primaryMuscles: ['lats', 'middle back'], secondaryMuscles: ['biceps', 'abdominals'],
    howTo: {
      ar: 'امسك الحلق وجسمك مايل في خط مستقيم، اسحب صدرك للحلق مع ضم لوحي الكتف. كل ما رجليك تقرب من تحت الحلق كل ما التمرين صعب.',
      en: 'Hold the rings with the body in a straight incline, pull the chest to the rings squeezing the shoulder blades. The closer the feet get under the rings, the harder it gets.'
    }
  },
  {
    id: 'dr_man_maker',
    name: { ar: 'مان ميكر', en: 'Man Maker' },
    category: 'crossfit', equipment: 'dumbbell',
    primaryMuscles: ['shoulders', 'middle back'], secondaryMuscles: ['chest', 'abdominals'],
    howTo: {
      ar: 'بلانك على دمبلين → تجديف يمين → تجديف شمال → ضغط → قفزة للوقوف → كلين وبريس فوق الراس. تكرار واحد بيساوي كل ده.',
      en: 'Plank on dumbbells → right row → left row → push-up → jump to stand → clean and press overhead. All of that is one rep.'
    }
  },

  /* ==================== هايروكس — HYROX ==================== */
  /*
   * محطات السباق الرسمية بالترتيب، وكل محطة بيسبقها ١ كم جري.
   * الأوزان بتختلف حسب الفئة (Open / Pro / Doubles) — راجع
   * الموقع الرسمي قبل أي برنامج مخصص لسباق.
   */
  {
    id: 'dr_hyrox_ski',
    name: { ar: 'هايروكس ١: سكي إرج ١٠٠٠م', en: 'HYROX 1: SkiErg 1000m' },
    category: 'hyrox', equipment: 'ski erg',
    primaryMuscles: ['lats', 'abdominals'], secondaryMuscles: ['triceps', 'glutes'],
    howTo: {
      ar: 'المحطة الأولى. السحب من الجذع والحوض مش من الذراعين بس: اقفل جذعك، اسحب المقابض لحد الحوض، وارجع بهدوء. إيقاع ثابت أحسن من بداية سريعة.',
      en: 'Station one. The pull comes from the trunk and hips, not just the arms: brace, pull the handles past the hips, and recover smoothly. A steady rate beats a fast start.'
    }
  },
  {
    id: 'dr_hyrox_sled_push',
    name: { ar: 'هايروكس ٢: دفع السليد ٥٠م', en: 'HYROX 2: Sled Push 50m' },
    category: 'hyrox', equipment: 'sled',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['calves', 'abdominals'],
    howTo: {
      ar: 'ميل جسمك لقدام في خط واحد من الكعب للراس، إيدين مفرودة، وخطوات قصيرة سريعة. أصعب محطة على الرجلين — لو وقفت هتلاقي صعوبة تبدأ تاني.',
      en: 'Lean in with a straight line from heel to head, arms extended, short fast steps. The hardest station on the legs — if you stop, restarting is brutal.'
    }
  },
  {
    id: 'dr_hyrox_sled_pull',
    name: { ar: 'هايروكس ٣: سحب السليد ٥٠م', en: 'HYROX 3: Sled Pull 50m' },
    category: 'hyrox', equipment: 'sled',
    primaryMuscles: ['lats', 'middle back'], secondaryMuscles: ['biceps', 'glutes'],
    howTo: {
      ar: 'اسحب الحبل إيد ورا إيد وانت راجع لورا وجسمك مايل، أو من وضع القرفصاء. خلّي الحبل مشدود طول الوقت عشان السليد ما يقفش.',
      en: 'Pull the rope hand over hand while walking backwards with the body leaning, or from a seated brace. Keep constant tension so the sled never stops.'
    }
  },
  {
    id: 'dr_hyrox_burpee_bj',
    name: { ar: 'هايروكس ٤: بيربي بقفزة طويلة ٨٠م', en: 'HYROX 4: Burpee Broad Jump 80m' },
    category: 'hyrox', equipment: 'body only',
    primaryMuscles: ['quadriceps', 'chest'], secondaryMuscles: ['glutes', 'abdominals'],
    howTo: {
      ar: 'بيربي ثم قفزة طويلة لقدام، وتكرار لحد ما تقطع المسافة. قفزات أقصر وإيقاع ثابت بيخلّصوا أسرع من قفزات طويلة بتوقّف.',
      en: 'A burpee then a broad jump forward, repeated across the distance. Shorter jumps at a steady rhythm finish faster than long jumps with pauses.'
    }
  },
  {
    id: 'dr_hyrox_row',
    name: { ar: 'هايروكس ٥: روينج ١٠٠٠م', en: 'HYROX 5: Row 1000m' },
    category: 'hyrox', equipment: 'rower',
    primaryMuscles: ['lats', 'quadriceps'], secondaryMuscles: ['glutes', 'biceps'],
    howTo: {
      ar: 'الترتيب: رجلين ← جذع ← ذراعين، والرجوع بالعكس. ٦٠٪ من القوة من الرجلين. اضبط الـdamper على ٤-٦ لمعظم الناس.',
      en: 'Sequence: legs → body → arms, and reverse on the recovery. Around 60% of the power is legs. A damper of 4-6 suits most people.'
    }
  },
  {
    id: 'dr_hyrox_farmers',
    name: { ar: 'هايروكس ٦: حمل الفلاح ٢٠٠م', en: 'HYROX 6: Farmers Carry 200m' },
    category: 'hyrox', equipment: 'kettlebells',
    primaryMuscles: ['forearms', 'traps'], secondaryMuscles: ['abdominals', 'glutes'],
    howTo: {
      ar: 'امشِ بخطوات سريعة وكتفين لورا وجذع مقفول. القبضة هي اللي بتستسلم الأول — درّب المسك المعلّق في برنامجك.',
      en: 'Walk with quick steps, shoulders back and trunk braced. Grip fails first — train hangs and holds in the program.'
    }
  },
  {
    id: 'dr_hyrox_lunges',
    name: { ar: 'هايروكس ٧: لانجز بشنطة رمل ١٠٠م', en: 'HYROX 7: Sandbag Lunges 100m' },
    category: 'hyrox', equipment: 'sandbag',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['hamstrings', 'abdominals'],
    howTo: {
      ar: 'الشنطة على الكتفين ورا الرقبة، خطوة لقدام والركبة الخلفية تلمس الأرض في كل تكرار. أصعب محطة على الرجلين بعد السليد.',
      en: 'Sandbag across the shoulders behind the neck, step forward and touch the back knee down every rep. The second hardest leg station after the sled.'
    }
  },
  {
    id: 'dr_hyrox_wallballs',
    name: { ar: 'هايروكس ٨: ١٠٠ وول بول', en: 'HYROX 8: 100 Wall Balls' },
    category: 'hyrox', equipment: 'wall ball',
    primaryMuscles: ['quadriceps', 'shoulders'], secondaryMuscles: ['glutes', 'abdominals'],
    howTo: {
      ar: 'المحطة الأخيرة وانت مرهق. قسّمها من أول تكرار (١٠×١٠ أو ٢٠×٥) بدل ما تبدأ كبير وتقف. عمق السكوات كامل وإلا التكرار مايتحسبش.',
      en: 'The final station, on empty legs. Break it up from rep one (10×10 or 20×5) instead of going big and stalling. Full squat depth or the rep does not count.'
    }
  },
  {
    id: 'dr_hyrox_run',
    name: { ar: 'هايروكس: جري ١ كم بين المحطات', en: 'HYROX: 1km run between stations' },
    category: 'hyrox', equipment: 'body only',
    primaryMuscles: ['quadriceps', 'calves'], secondaryMuscles: ['hamstrings', 'glutes'],
    howTo: {
      ar: 'تمانية كيلومتر إجمالي، كل واحد بعد محطة وانت تعبان — ده اللي بيميّز هايروكس. درّب الجري بعد المجهود (compromised running) مش الجري وانت مرتاح.',
      en: 'Eight kilometres in total, each one run on tired legs — that is what defines HYROX. Train compromised running, not fresh running.'
    }
  },

  /* ==================== دريلات ملاعب — Field drills ==================== */
  {
    id: 'dr_cone_5_10_5',
    name: { ar: 'دريل ٥-١٠-٥ (أقماع)', en: '5-10-5 Pro Agility (cones)' },
    category: 'agility', equipment: 'cones',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['calves', 'hamstrings'],
    howTo: {
      ar: 'تلات أقماع على خط واحد كل ٥ ياردة. ابدأ من القمع الأوسط، اجرِ ٥ لجنب والمس الأرض، ١٠ للجنب التاني والمس، ٥ رجوع للنص. المفتاح هو خفض الحوض عند تغيير الاتجاه.',
      en: 'Three cones in a line 5 yards apart. Start at the middle, sprint 5 to one side and touch, 10 to the other and touch, 5 back to the middle. The key is dropping the hips on every change of direction.'
    }
  },
  {
    id: 'dr_cone_t_drill',
    name: { ar: 'دريل حرف T (أقماع)', en: 'T-Drill (cones)' },
    category: 'agility', equipment: 'cones',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['calves', 'abductors'],
    howTo: {
      ar: 'أربع أقماع على شكل T. جري أمامي ١٠م، تحرك جانبي ٥م يمين، ١٠م شمال، ٥م يمين، ثم رجوع للخلف للبداية. بيقيس تغيير الاتجاه في كل الاتجاهات.',
      en: 'Four cones in a T. Sprint forward 10m, shuffle 5m right, 10m left, 5m right, then backpedal to the start. Tests change of direction in every plane.'
    }
  },
  {
    id: 'dr_cone_box',
    name: { ar: 'دريل المربع (٤ أقماع)', en: 'Box Drill (4 cones)' },
    category: 'agility', equipment: 'cones',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: 'مربع ضلعه ٥م. جري أمامي على الضلع الأول، جانبي على التاني، رجوع للخلف على التالت، جانبي على الرابع. كرر بالعكس.',
      en: 'A 5m square. Sprint the first side, shuffle the second, backpedal the third, shuffle the fourth. Repeat in reverse.'
    }
  },
  {
    id: 'dr_cone_zigzag',
    name: { ar: 'زجزاج بين الأقماع', en: 'Zig-zag Cone Run' },
    category: 'agility', equipment: 'cones',
    primaryMuscles: ['quadriceps', 'abductors'], secondaryMuscles: ['calves', 'glutes'],
    howTo: {
      ar: 'صف أقماع كل ٢م بالتبادل يمين وشمال. اجرِ بينهم بزوايا حادة مع ميل الجسم ناحية الاتجاه الجديد، والعين لقدام مش على رجليك.',
      en: 'A row of cones 2m apart alternating left and right. Run through with sharp angles, leaning into each new direction, eyes up not on your feet.'
    }
  },
  {
    id: 'dr_discs_react',
    name: { ar: 'دريل الأطباق الملوّنة (رد فعل)', en: 'Coloured Disc Reaction Drill' },
    category: 'agility', equipment: 'discs',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: 'وزّع أطباق بألوان مختلفة حوالين اللاعب. المدرب ينادي لون أو يشاور، واللاعب يجري يلمسه ويرجع للنص. ده بيدرّب رد الفعل مش الرشاقة بس.',
      en: 'Spread coloured discs around the athlete. The coach calls a colour or points, the athlete sprints to touch it and returns to the middle. This trains reaction, not just agility.'
    }
  },
  {
    id: 'dr_discs_shuttle',
    name: { ar: 'شاتل الأطباق (نقل)', en: 'Disc Shuttle Carry' },
    category: 'agility', equipment: 'discs',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['glutes', 'lower back'],
    howTo: {
      ar: 'كوّم أطباق على خط، واللاعب ينقلها واحد واحد لخط تاني على بعد ١٠-٢٠م. بيجمع بين الجري وتغيير الاتجاه والانحناء المتكرر.',
      en: 'Stack discs on one line; the athlete carries them one at a time to a line 10-20m away. Combines running, direction change and repeated hinging.'
    }
  },
  {
    id: 'dr_hurdle_hops',
    name: { ar: 'قفز فوق الحواجز (رجلين)', en: 'Two-foot Hurdle Hops' },
    category: 'agility', equipment: 'hurdles',
    primaryMuscles: ['calves', 'quadriceps'], secondaryMuscles: ['glutes', 'hamstrings'],
    howTo: {
      ar: 'صف حواجز صغيرة كل ٦٠-٨٠سم. اقفز فوقهم بالرجلين بأقل وقت تلامس مع الأرض. ركبتك متلمسش صدرك — الحركة من الكاحل.',
      en: 'A row of low hurdles 60-80cm apart. Hop over with both feet, minimising ground contact time. Knees should not tuck to the chest — the move comes from the ankle.'
    }
  },
  {
    id: 'dr_hurdle_lateral',
    name: { ar: 'قفز جانبي فوق الحواجز', en: 'Lateral Hurdle Hops' },
    category: 'agility', equipment: 'hurdles',
    primaryMuscles: ['abductors', 'quadriceps'], secondaryMuscles: ['calves', 'glutes'],
    howTo: {
      ar: 'نفس الصف بس بتقفز جانبي. بيدرّب ثبات الركبة في الاتجاه الجانبي — وده مهم جدًا للوقاية من إصابات الرباط الصليبي.',
      en: 'The same row but hopping sideways. Trains frontal-plane knee stability — one of the most useful drills for ACL injury prevention.'
    }
  },
  {
    id: 'dr_hurdle_walkover',
    name: { ar: 'مشي فوق الحواجز (إطالة ديناميكية)', en: 'Hurdle Walkovers' },
    category: 'agility', equipment: 'hurdles',
    primaryMuscles: ['glutes', 'hamstrings'], secondaryMuscles: ['abductors', 'quadriceps'],
    howTo: {
      ar: 'امشِ فوق الحواجز برفع الركبة عالي ومرور الرجل فوق الحاجز. تمرين إحماء ممتاز بيفتح الحوض قبل الجري أو القفز.',
      en: 'Walk over the hurdles lifting the knee high and passing the leg over. An excellent warm-up that opens the hips before running or jumping.'
    }
  },
  {
    id: 'dr_ladder_icky',
    name: { ar: 'سلم الرشاقة — إن إن آوت', en: 'Agility Ladder — In-In-Out-Out' },
    category: 'agility', equipment: 'ladder',
    primaryMuscles: ['calves'], secondaryMuscles: ['quadriceps', 'abductors'],
    howTo: {
      ar: 'رجلين جوه المربع ثم رجلين بره، وتقدم للمربع اللي بعده. السرعة تيجي بعد الدقة — ابدأ بطيء لحد ما النمط يبقى تلقائي.',
      en: 'Both feet in the square then both feet out, advancing square by square. Speed comes after accuracy — start slow until the pattern is automatic.'
    }
  },
  {
    id: 'dr_ladder_lateral',
    name: { ar: 'سلم الرشاقة — تحرك جانبي', en: 'Agility Ladder — Lateral Shuffle' },
    category: 'agility', equipment: 'ladder',
    primaryMuscles: ['abductors'], secondaryMuscles: ['calves', 'glutes'],
    howTo: {
      ar: 'تحرك جانبي على طول السلم برجل داخل كل مربع. الحوض منخفض والكتفين لقدام طول الوقت.',
      en: 'Shuffle sideways along the ladder placing a foot in each square. Hips stay low and shoulders face forward throughout.'
    }
  },
  {
    id: 'dr_shuttle_run',
    name: { ar: 'جري مكوكي بين الخطوط', en: 'Shuttle Run' },
    category: 'agility', equipment: 'cones',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['calves', 'glutes'],
    howTo: {
      ar: 'خطين على بعد ١٠-٢٠م، جري ذهاب وعودة لعدد مرات أو لوقت محدد. الفرملة والانطلاق هما المجهود الحقيقي مش الجري نفسه.',
      en: 'Two lines 10-20m apart, running back and forth for reps or time. The braking and re-acceleration are the real work, not the running.'
    }
  },
  {
    id: 'dr_sprint_accel',
    name: { ar: 'انطلاقات تسارع ٢٠م', en: '20m Acceleration Sprints' },
    category: 'agility', equipment: 'cones',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['calves', 'hamstrings'],
    howTo: {
      ar: 'انطلاق من الثبات لمسافة ٢٠م بأقصى سرعة، وراحة كاملة (٢-٣ دقايق) بين كل انطلاقة. ده تدريب سرعة مش تدريب لياقة — الراحة جزء من التمرين.',
      en: 'Accelerate from a standstill over 20m at full speed, with full recovery (2-3 min) between reps. This is speed work, not conditioning — the rest is part of the session.'
    }
  },
  {
    id: 'dr_parachute_sprint',
    name: { ar: 'جري بالباراشوت', en: 'Parachute Sprint' },
    category: 'agility', equipment: 'parachute',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['calves', 'hamstrings'],
    howTo: {
      ar: 'جري بمقاومة الباراشوت لمسافة ٢٠-٤٠م. المقاومة لازم تكون خفيفة — لو غيّرت شكل جريك يبقى الحمل كبير وبيعلّم نمط غلط.',
      en: 'Sprint 20-40m against parachute drag. The resistance must stay light — if it changes your running form, the load is too high and teaches a bad pattern.'
    }
  },

  /* ==================== كارديو وتكييف — Cardio & conditioning ==================== */
  {
    id: 'dr_assault_bike_intervals',
    name: { ar: 'فترات على العجلة الهوائية', en: 'Assault Bike Intervals' },
    category: 'conditioning', equipment: 'assault bike',
    primaryMuscles: ['quadriceps', 'shoulders'], secondaryMuscles: ['lats', 'calves'],
    howTo: {
      ar: 'مثال: ١٠ × (٢٠ ثانية أقصى مجهود / ٤٠ ثانية راحة). العجلة الهوائية بتوصل للنبض الأقصى أسرع من أي جهاز — خليك واقعي في العدد.',
      en: 'For example 10 × (20s max effort / 40s easy). The air bike drives heart rate up faster than any other machine — be realistic with the number of rounds.'
    }
  },
  {
    id: 'dr_rower_intervals',
    name: { ar: 'فترات روينج ٥٠٠م', en: 'Rower 500m Intervals' },
    category: 'conditioning', equipment: 'rower',
    primaryMuscles: ['lats', 'quadriceps'], secondaryMuscles: ['glutes', 'biceps'],
    howTo: {
      ar: 'مثال: ٦ × ٥٠٠م براحة ٩٠ ثانية. اهدف لزمن ثابت في كل تكرار — الثبات أهم من تكرار واحد سريع.',
      en: 'For example 6 × 500m with 90s rest. Aim for the same split every rep — consistency matters more than one fast piece.'
    }
  },
  {
    id: 'dr_battle_ropes',
    name: { ar: 'حبال قتالية', en: 'Battle Ropes' },
    category: 'conditioning', equipment: 'battle rope',
    primaryMuscles: ['shoulders'], secondaryMuscles: ['abdominals', 'lats', 'forearms'],
    howTo: {
      ar: 'وقفة نصف سكوات وجسم مشدود، وموجات متبادلة أو متوازية لمدة ٢٠-٣٠ ثانية. الحركة من الكتف والجذع مش من الرسغ.',
      en: 'Quarter-squat stance with a braced body, alternating or double waves for 20-30 seconds. The movement comes from the shoulders and trunk, not the wrists.'
    }
  },
  {
    id: 'dr_tabata',
    name: { ar: 'تاباتا (٢٠/١٠ × ٨)', en: 'Tabata (20/10 × 8)' },
    category: 'conditioning', equipment: 'body only',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['abdominals', 'shoulders'],
    howTo: {
      ar: '٢٠ ثانية مجهود أقصى / ١٠ ثواني راحة × ٨ جولات = ٤ دقايق. أي حركة بسيطة تنفع (سكوات، بيربي، نط). المفتاح إن الـ٢٠ ثانية تبقى فعلاً أقصى مجهود.',
      en: '20s max effort / 10s rest × 8 rounds = 4 minutes. Any simple movement works (squats, burpees, skipping). The point is that the 20 seconds is genuinely maximal.'
    }
  },
  {
    id: 'dr_emom',
    name: { ar: 'إيموم (كل دقيقة على الدقيقة)', en: 'EMOM (Every Minute On the Minute)' },
    category: 'conditioning', equipment: 'other',
    primaryMuscles: ['quadriceps'], secondaryMuscles: ['abdominals', 'shoulders'],
    howTo: {
      ar: 'في بداية كل دقيقة تعمل عدد محدد من التكرارات، والباقي من الدقيقة راحة. كل ما تخلص أسرع كل ما ترتاح أكتر — وده اللي بيخلّي الإيقاع يضبط نفسه.',
      en: 'At the top of every minute you perform a set number of reps; the rest of the minute is recovery. Finishing faster earns more rest, which self-regulates the pace.'
    }
  },
  {
    id: 'dr_fartlek',
    name: { ar: 'فارتلك (جري متغيّر السرعة)', en: 'Fartlek Run' },
    category: 'conditioning', equipment: 'body only',
    primaryMuscles: ['quadriceps', 'calves'], secondaryMuscles: ['hamstrings', 'glutes'],
    howTo: {
      ar: 'جري مستمر بتغيير السرعة بشكل حر: دقيقة سريع، تلاتة هادي، وهكذا. مناسب جدًا كبداية لتدريب الفترات لأنه أقل ضغطًا نفسيًا من الأرقام.',
      en: 'Continuous running with free changes of pace: a minute hard, three easy, and so on. A good entry to interval work because it is less mentally rigid than fixed numbers.'
    }
  },
  {
    id: 'dr_tempo_run',
    name: { ar: 'جري تيمبو', en: 'Tempo Run' },
    category: 'conditioning', equipment: 'body only',
    primaryMuscles: ['quadriceps', 'calves'], secondaryMuscles: ['hamstrings', 'glutes'],
    howTo: {
      ar: '٢٠-٤٠ دقيقة بسرعة "مريحة بصعوبة" — تقدر تقول جملة قصيرة بس مش تتكلم بحرية. أهم تدريب لتحسين التحمّل الهوائي.',
      en: '20-40 minutes at a "comfortably hard" pace — you can say a short sentence but not hold a conversation. The single most useful session for aerobic endurance.'
    }
  },
  {
    id: 'dr_sled_drag',
    name: { ar: 'سحب السليد للمسافة', en: 'Sled Drag for Distance' },
    category: 'conditioning', equipment: 'sled',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['hamstrings', 'calves'],
    howTo: {
      ar: 'سحب السليد لمسافة ٢٠-٤٠م بوزن معتدل ومشي مستمر. أفضل تدريب تكييف للي عنده مشكلة في الركبة — مفيش مرحلة هبوط ولا صدمة.',
      en: 'Drag the sled 20-40m at a moderate weight with continuous walking. One of the best conditioning options for a knee issue — no eccentric loading and no impact.'
    }
  },
  {
    id: 'dr_wall_ball_conditioning',
    name: { ar: 'وول بول للتكييف', en: 'Wall Ball Conditioning' },
    category: 'conditioning', equipment: 'wall ball',
    primaryMuscles: ['quadriceps', 'shoulders'], secondaryMuscles: ['glutes', 'abdominals'],
    howTo: {
      ar: 'مجموعات ٢٠-٣٠ تكرار متصلة. بيرفع النبض بسرعة لأنه بيشغّل الرجلين والكتف مع بعض ورفع الذراعين فوق الراس.',
      en: 'Continuous sets of 20-30 reps. It spikes heart rate fast because it loads legs and shoulders together with the arms overhead.'
    }
  },
  {
    id: 'dr_farmers_carry_cond',
    name: { ar: 'حمل الفلاح للمسافة', en: 'Farmers Carry for Distance' },
    category: 'conditioning', equipment: 'kettlebells',
    primaryMuscles: ['forearms', 'traps'], secondaryMuscles: ['abdominals', 'glutes'],
    howTo: {
      ar: '٣-٥ جولات × ٤٠-٦٠م. تمرين ممتاز للقبضة وثبات الجذع، وآمن جدًا لأن الحمل بيكون على الجسم كله موزّع.',
      en: '3-5 rounds × 40-60m. Excellent for grip and trunk stability, and very safe because the load is distributed through the whole body.'
    }
  },
  {
    id: 'dr_jump_rope_intervals',
    name: { ar: 'فترات نط الحبل', en: 'Jump Rope Intervals' },
    category: 'conditioning', equipment: 'jump rope',
    primaryMuscles: ['calves'], secondaryMuscles: ['shoulders', 'abdominals'],
    howTo: {
      ar: '١٠ × (٣٠ ثانية نط / ٣٠ ثانية راحة). أرخص وأسهل تدريب تكييف، وبيحسّن التناسق وثبات الكاحل كمان.',
      en: '10 × (30s skipping / 30s rest). The cheapest and simplest conditioning there is, and it also improves coordination and ankle stiffness.'
    }
  },
  {
    id: 'dr_stair_intervals',
    name: { ar: 'صعود السلالم بفترات', en: 'Stair Interval Climbs' },
    category: 'conditioning', equipment: 'other',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['calves', 'hamstrings'],
    howTo: {
      ar: 'اصعد بسرعة وانزل مشي كراحة، ٦-١٠ جولات. متاح لأي حد في أي عمارة — والنزول هو اللي بيوجع العضلة فاهبط بهدوء.',
      en: 'Climb fast and walk down as recovery, 6-10 rounds. Available to anyone with a staircase — the descent causes the soreness, so come down easy.'
    }
  },

  /* ==================== جري وألعاب قوى ومضمار — Running & Track ==================== */
  {
    id: 'dr_trk_a_skip',
    name: { ar: 'إيه سكيب (A-Skip)', en: 'A-Skip' },
    category: 'track', equipment: 'body only', type: 'distance_time',
    primaryMuscles: ['hamstrings', 'quadriceps'], secondaryMuscles: ['calves', 'abdominals'],
    howTo: {
      ar: 'مشية نطّ إيقاعية: ارفع الركبة لمستوى الحوض والكعب للمؤخرة، وانزل القدم تحت مركز الجسم على مشط القدم. ٢-٣ × ٢٠-٣٠م. الهدف ميكانيكا جري سليمة مش سرعة.',
      en: 'Rhythmic skip: drive the knee to hip height with the foot dorsiflexed, then strike down under the centre of mass on the ball of the foot. 2-3 × 20-30m. It trains running mechanics, not speed.'
    }
  },
  {
    id: 'dr_trk_b_skip',
    name: { ar: 'بي سكيب (B-Skip)', en: 'B-Skip' },
    category: 'track', equipment: 'body only', type: 'distance_time',
    primaryMuscles: ['hamstrings', 'quadriceps'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: 'زي الإيه سكيب بس مدّ الرجل لقدّام في نهاية رفع الركبة ثم اسحبها لتحت بقوة (حركة «المخلب»). ٢-٣ × ٢٠-٣٠م. بيدرّب الإمساك بالأرض.',
      en: 'Like the A-Skip, but extend the leg forward at the top of the knee drive, then paw it down and back actively. 2-3 × 20-30m. Trains the ground-contact "pawing" action.'
    }
  },
  {
    id: 'dr_trk_c_skip',
    name: { ar: 'سي سكيب (C-Skip)', en: 'C-Skip' },
    category: 'track', equipment: 'body only', type: 'distance_time',
    primaryMuscles: ['hamstrings'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: 'كعب الرجل يطلع للمؤخرة ثم الركبة تتقدّم لقدّام (حركة دايرية). ٢ × ٢٠م. تمرين ربط بين تحمّل الهامسترنج وتوقيت الخطوة.',
      en: 'Heel recovers to the glute, then the knee swings through (a cycling motion). 2 × 20m. Links hamstring work to stride timing.'
    }
  },
  {
    id: 'dr_trk_high_knees',
    name: { ar: 'هاي نيز (رفع الركب)', en: 'High Knees' },
    category: 'track', equipment: 'body only', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['calves', 'abdominals'],
    howTo: {
      ar: 'جري في المكان أو للأمام بتردد عالٍ: الركبة لمستوى الحوض ومشط القدم لتحت وزراعين متبادلين. ٣ × ١٠-٢٠م أو ١٠-١٥ ثانية.',
      en: 'Fast-frequency running in place or forward: knees to hip height, ball-of-foot contacts and a strong arm swing. 3 × 10-20m or 10-15 s.'
    }
  },
  {
    id: 'dr_trk_butt_kicks',
    name: { ar: 'بات كيكس (رفع الكعب)', en: 'Butt Kicks' },
    category: 'track', equipment: 'body only', type: 'distance_time',
    primaryMuscles: ['hamstrings'], secondaryMuscles: ['calves'],
    howTo: {
      ar: 'جري خفيف يلمس فيه الكعب المؤخرة مع بقاء الركبة تحت الحوض. ٣ × ٢٠م. تسخين للهامسترنج وتحسين استرجاع الرجل.',
      en: 'Light running where the heel lifts to the glute while the knee stays under the hip. 3 × 20m. Warms up the hamstrings and improves leg recovery.'
    }
  },
  {
    id: 'dr_trk_straight_leg_bound',
    name: { ar: 'نطّ بالرجل المفرودة', en: 'Straight-Leg Bounds' },
    category: 'track', equipment: 'body only', type: 'distance_time',
    primaryMuscles: ['hamstrings', 'glutes'], secondaryMuscles: ['calves', 'lower back'],
    howTo: {
      ar: 'ابقى مفرود الركبة وحرّك الرجل من الحوض "خبطة" لتحت وورا (زي المقص). ٢-٣ × ٢٠-٣٠م. بيعلّم الدفع الخلفي للأرض.',
      en: 'Keep the knee near-straight and swing the whole leg from the hip, clawing down and back. 2-3 × 20-30m. Teaches the backward ground push.'
    }
  },
  {
    id: 'dr_trk_wicket_run',
    name: { ar: 'ووكيت ران (حواجز صغيرة)', en: 'Wicket Runs' },
    category: 'track', equipment: 'hurdles', type: 'distance_time',
    primaryMuscles: ['hamstrings', 'glutes'], secondaryMuscles: ['calves', 'quadriceps'],
    howTo: {
      ar: '٦-٨ حواجز قصيرة (١٥-٢٠سم) متباعدة ٢-٢.٢م للمبتدئ حتى ٢.٦م للمتقدم، اجري فوقها بخطوات سريعة بدون ما تتغير المسافة. ٣-٤ × ٦-٨ حواجز.',
      en: '6-8 mini-hurdles (15-20cm) spaced ~2.0-2.2m for beginners up to ~2.6m for advanced athletes; run over them with quick, even steps. 3-4 × 6-8 hurdles.'
    }
  },
  {
    id: 'dr_trk_stride',
    name: { ar: 'ستريدز (انطلاقات تعافي)', en: 'Strides' },
    category: 'track', equipment: 'body only', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: 'جري مريح ٨٠-١٠٠م: تسارع تدريجي لـ٨٥-٩٠٪ من السرعة بدون إجهاد ثم تخفيف. ٤-٦ × بعد الجري الخفيف. بيحسّن الشكل والأداء بدون تعب.',
      en: 'Relaxed 80-100m runs: build gradually to ~85-90% speed without straining, then ease off. 4-6 × after an easy run. Improves form without fatigue.'
    }
  },
  {
    id: 'dr_trk_flying_30',
    name: { ar: 'جري ٣٠م بسرعة مطلقة (Fly 30)', en: 'Flying 30m Sprint' },
    category: 'track', equipment: 'cones', type: 'distance_time',
    primaryMuscles: ['hamstrings', 'glutes'], secondaryMuscles: ['quadriceps', 'calves'],
    howTo: {
      ar: 'ابدأ بتسارع ٢٠-٣٠م ثم "منطقة" ٣٠م بأقصى سرعة (علّم بقمعين) ثم تخفيف. راحة كاملة ٤-٦ دقايق. ٣-٤ مرات بس. لأقصى سرعة، مش للتعب.',
      en: 'Build up over 20-30m, then hit a marked 30m zone at top speed (two cones), then decelerate. Full recovery of 4-6 min. Only 3-4 reps — this is maximum-velocity work, not conditioning.'
    }
  },
  {
    id: 'dr_trk_block_start',
    name: { ar: 'انطلاق من البلوك', en: 'Block Starts' },
    category: 'track', equipment: 'other', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['hamstrings', 'calves'],
    howTo: {
      ar: 'اضبط البلوك (الأمامي ٤٥-٥٠سم والخلفي ٧٥-٨٠سم تقريبًا من الخط)، "على مكانك - إستعد - انطلق"، ادفع بالرجلين مع دفع الجسم لـ٤٥° لأول ٣-٤ خطوات. ٤-٦ × ١٠-٣٠م.',
      en: 'Set the blocks (front ~45-50cm, rear ~75-80cm behind the line), "set — go", drive with both legs at a ~45° body angle for the first 3-4 steps. 4-6 × 10-30m.'
    }
  },
  {
    id: 'dr_trk_hill_sprint',
    name: { ar: 'جري صاعد (طلعات)', en: 'Hill Sprints' },
    category: 'track', equipment: 'body only', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['calves', 'hamstrings'],
    howTo: {
      ar: 'طلعة ميلها ٤-٨٪ لمسافة ٢٠-٤٠م بأقصى جهد ونزول مشي كراحة (٢-٣ دقايق). ٥-٨ مرات. بتقوّي دفع الأرض وبتقلّل ضغط الهامسترنج.',
      en: 'A 4-8% slope for 20-40m at max effort, walk down as recovery (2-3 min). 5-8 reps. Builds drive and lowers hamstring strain compared to flat max-speed work.'
    }
  },
  {
    id: 'dr_trk_sprint_30',
    name: { ar: 'عدو ٣٠م', en: '30m Sprint' },
    category: 'track', equipment: 'cones', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['hamstrings', 'calves'],
    howTo: {
      ar: 'من الثبات (وقفة عالية أو بلوك) ٣٠م بأقصى جهد، تتسجل الزمن. راحة ٣-٥ دقايق. ٣-٥ مرات.',
      en: 'Maximal 30m from a standing or block start, time each rep. Rest 3-5 min. 3-5 reps.'
    }
  },
  {
    id: 'dr_trk_sprint_60',
    name: { ar: 'عدو ٦٠م', en: '60m Sprint' },
    category: 'track', equipment: 'cones', type: 'distance_time',
    primaryMuscles: ['hamstrings', 'glutes'], secondaryMuscles: ['quadriceps', 'calves'],
    howTo: {
      ar: '٦٠م بأقصى جهد: مرحلة التسارع ثم التثبيت. راحة ٥-٨ دقايق. ٢-٤ مرات. اختبار وتدريب لسرعة ٦٠م.',
      en: 'Maximal 60m covering acceleration then maintenance. Rest 5-8 min. 2-4 reps. Used both as a test and as training.'
    }
  },
  {
    id: 'dr_trk_rep_150',
    name: { ar: 'تكرارات ١٥٠م', en: '150m Repeats' },
    category: 'track', equipment: 'cones', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: '١٥٠م بـ٩٠-٩٥٪ من السرعة القصوى (٣٠م تسارع + ٩٠م سرعة + ٣٠م تخفيف). راحة ٤-٦ دقايق. ٣-٥ مرات. لسرعة التحمّل لعدائي ١٠٠-٢٠٠م.',
      en: '150m at 90-95% (30m build + 90m float + 30m ease). Rest 4-6 min. 3-5 reps. Speed endurance for 100-200m athletes.'
    }
  },
  {
    id: 'dr_trk_rep_200',
    name: { ar: 'تكرارات ٢٠٠م', en: '200m Repeats' },
    category: 'track', equipment: 'cones', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: '٢٠٠م بسرعة السباق أو أبطأ بقليل، راحة ٣-٥ دقايق (أطول للأسرع). ٤-٦ مرات. تحمّل سرعة وتكيّف مع حمض اللاكتيك.',
      en: '200m at race pace or slightly slower with 3-5 min rest (longer if faster). 4-6 reps. Speed endurance and lactate tolerance.'
    }
  },
  {
    id: 'dr_trk_rep_300',
    name: { ar: 'تكرارات ٣٠٠م', en: '300m Repeats' },
    category: 'track', equipment: 'cones', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: '٣٠٠م بـ٩٠-٩٥٪ من أفضل زمن ٤٠٠م (مقسوم)، راحة ٦-١٠ دقايق. ٢-٤ مرات. بيبني سرعة تحمّل خاصة لعدائي ٤٠٠م.',
      en: '300m at 90-95% of best-400 pace, rest 6-10 min. 2-4 reps. Builds 400m-specific speed endurance.'
    }
  },
  {
    id: 'dr_trk_rep_400',
    name: { ar: 'تكرارات ٤٠٠م', en: '400m Repeats' },
    category: 'track', equipment: 'cones', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: '٤٠٠م بسرعة ٨٥-٩٥٪ من أفضل زمن، راحة ٣-٥ دقايق (فترات ثابتة). ٤-٨ مرات. للتحمّل الهوائي واللاهوائي.',
      en: '400m at 85-95% of best time, rest 3-5 min (fixed). 4-8 reps. Aerobic and anaerobic endurance.'
    }
  },
  {
    id: 'dr_trk_rep_800',
    name: { ar: 'تكرارات ٨٠٠م', en: '800m Repeats' },
    category: 'track', equipment: 'cones', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: '٨٠٠م بسرعة سباق ٥ كم إلى ٣ كم، راحة ٢-٣ دقايق جري خفيف. ٣-٥ مرات. للمتوسط والتحمّل.',
      en: '800m at 5km-to-3km race pace with 2-3 min easy jog. 3-5 reps. Middle-distance and endurance work.'
    }
  },
  {
    id: 'dr_trk_rep_1000',
    name: { ar: 'تكرارات ١٠٠٠م', en: '1000m Repeats' },
    category: 'track', equipment: 'cones', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: '١٠٠٠م بسرعة عتبة اللاكتات (تقريبًا سرعة ١٠كم)، راحة ٢-٣ دقايق. ٣-٦ مرات. لتحمّل العتبة.',
      en: '1000m at threshold (~10k) pace with 2-3 min rest. 3-6 reps. Threshold endurance.'
    }
  },
  {
    id: 'dr_trk_tempo_100',
    name: { ar: 'تيمبو ١٠٠م', en: '100m Tempo Runs' },
    category: 'track', equipment: 'cones', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: '١٠٠م بـ٦٥-٧٥٪ بإيقاع مريح ومشي رجوع، ١٠-١٦ مرة. بنية هوائية للعدائين بدون إجهاد عضلي كبير.',
      en: '100m at 65-75% effort, relaxed, walk back, 10-16 reps. Builds an aerobic base for sprinters with low muscular cost.'
    }
  },
  {
    id: 'dr_trk_tempo_200',
    name: { ar: 'تيمبو ٢٠٠م', en: '200m Tempo Runs' },
    category: 'track', equipment: 'cones', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: '٢٠٠م بـ٧٠-٧٥٪، راحة ٦٠-٩٠ث، ٦-١٠ مرات. تحمّل هوائي مناسب لأسابيع الأساس.',
      en: '200m at 70-75% with 60-90 s rest, 6-10 reps. Aerobic capacity suited to base-phase weeks.'
    }
  },
  {
    id: 'dr_trk_easy_run',
    name: { ar: 'جري خفيف (قاعدة هوائية)', en: 'Easy Run (Aerobic Base)' },
    category: 'track', equipment: 'body only', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['calves', 'glutes'],
    howTo: {
      ar: '٢٠-٦٠ دقيقة بنبض ٦٥-٧٥٪ من الأقصى وبإمكانك تتكلم. أساس التحمّل واسترجاع بين الحصص الصعبة.',
      en: '20-60 min at 65-75% of max HR while still able to talk. The base of endurance and recovery between hard sessions.'
    }
  },
  {
    id: 'dr_trk_long_run',
    name: { ar: 'جري طويل', en: 'Long Run' },
    category: 'track', equipment: 'body only', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['calves', 'glutes'],
    howTo: {
      ar: 'جري مستمر ٦٠-١٢٠ دقيقة بإيقاع مريح مرة في الأسبوع. زوّد الزمن تدريجيًا (≤١٠٪ في الأسبوع).',
      en: 'Continuous 60-120 min at a comfortable pace once a week. Increase duration gradually (≤10% per week).'
    }
  },
  {
    id: 'dr_trk_threshold_run',
    name: { ar: 'جري عتبة (تمبو)', en: 'Threshold (Tempo) Run' },
    category: 'track', equipment: 'body only', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: '٢٠-٤٠ دقيقة بسرعة "صعب مريح" (قريبة من سباق ١٠-١٥ كم). ممكن مقسّمة لمرتين. بترفع عتبة اللاكتات.',
      en: '20-40 min at "comfortably hard" pace (near 10-15k race pace); can be split in two. Raises the lactate threshold.'
    }
  },
  {
    id: 'dr_trk_hurdle_trail',
    name: { ar: 'دريل رجل الخلف للحواجز', en: 'Hurdle Trail-Leg Drill' },
    category: 'track', equipment: 'hurdles', type: 'distance_time',
    primaryMuscles: ['hamstrings', 'glutes'], secondaryMuscles: ['adductors', 'abductors'],
    howTo: {
      ar: 'امش/اجري جنب الحاجز وارفع رجل الخلف فقط فوقه (ركبة للجنب ثم للأمام) والجسم مستقيم. ٣ × ٥ حواجز لكل رجل.',
      en: 'Walk or jog alongside the hurdle and lift only the trail leg over (knee out, then forward) keeping the trunk upright. 3 × 5 hurdles per leg.'
    }
  },
  {
    id: 'dr_trk_hurdle_lead',
    name: { ar: 'دريل رجل الأمام للحواجز', en: 'Hurdle Lead-Leg Drill' },
    category: 'track', equipment: 'hurdles', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['glutes', 'abdominals'],
    howTo: {
      ar: 'ركّز على رجل الأمام: ركبة عالية ثم مدّ الرجل فوق الحاجز وارجع بالقدم أسفل بسرعة تحت الجسم. ٣ × ٥ حواجز لكل رجل.',
      en: 'Focus on the lead leg: high knee, extend over the hurdle then snap the foot down under the body quickly. 3 × 5 hurdles per leg.'
    }
  },
  {
    id: 'dr_trk_hurdle_3step',
    name: { ar: '٣ خطوات بين الحواجز', en: '3-Step Hurdle Rhythm' },
    category: 'track', equipment: 'hurdles', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'hamstrings'], secondaryMuscles: ['glutes', 'calves'],
    howTo: {
      ar: 'حواجز بمسافات سباق (١٠٠م حواجز للسيدات ٨.٥م، ١١٠م حواجز للرجال ٩.١٤م) بإيقاع ٣ خطوات بين الحاجز والتاني. ٣-٥ × ٥ حواجز.',
      en: 'Hurdles at race spacing (100m hurdles women 8.5m, 110m hurdles men 9.14m) with a 3-step rhythm between hurdles. 3-5 × 5 hurdles.'
    }
  },
  {
    id: 'dr_trk_baton_exchange',
    name: { ar: 'تسليم واستلام العصا (تتابع)', en: 'Baton Exchange (Relay)' },
    category: 'track', equipment: 'other', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['shoulders', 'calves'],
    howTo: {
      ar: 'المستلم يبدأ بعلامة (٦-٩ قدم) ويجري عند وصول المسلّم، ويمد ذراعه للخلف ثابتة، والمسلّم يضع العصا في اليد بدون نظر. ٦-١٠ تكرارات.',
      en: 'The receiver starts at a check-mark (6-9 ft), runs when the passer arrives, then holds a steady backward arm; the passer places the baton without looking. 6-10 reps.'
    }
  },
  {
    id: 'dr_trk_long_jump_approach',
    name: { ar: 'تقرّب الوثب الطويل', en: 'Long Jump Approach Run' },
    category: 'track', equipment: 'other', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['hamstrings', 'calves'],
    howTo: {
      ar: 'اضبط علامات التقرّب (١٠-١٦ خطوة)، جري متسارع ثابت ثم ضغط الخطوة الأخيرة. ٦-١٠ تقرّبات من غير وثب.',
      en: 'Set run-up marks (10-16 strides), accelerate evenly and set up the final stride. 6-10 run-throughs without jumping.'
    }
  },
  {
    id: 'dr_trk_triple_jump_hops',
    name: { ar: 'قفزات الوثب الثلاثي (هوب-ستيب-جامب)', en: 'Triple Jump Phases (Hop-Step-Jump)' },
    category: 'track', equipment: 'body only', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['hamstrings', 'calves'],
    howTo: {
      ar: 'قفزة على رجل ثم الأخرى ثم هبوط على الاتنين بإيقاع متوازن. ٣-٥ × ٣ قفزات. لعمل فقط بعد قوة كافية وأرض مناسبة.',
      en: 'Hop on one leg, step to the other, then jump landing on both with balanced rhythm. 3-5 × 3 phases. Only with adequate strength base and a proper surface.'
    }
  },
  {
    id: 'dr_trk_high_jump_curve',
    name: { ar: 'تقرّب القفز العالي (منحنى J)', en: 'High Jump J-Curve Approach' },
    category: 'track', equipment: 'other', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['calves', 'abdominals'],
    howTo: {
      ar: '٨-١٠ خطوات بشكل J: ٣-٤ مستقيمة ثم منحنى مع ميل داخلي، والخطوة الأخيرة قصيرة. ٦-١٠ تقرّبات.',
      en: '8-10 strides in a J shape: 3-4 straight then a curve with an inward lean and a shortened last step. 6-10 approaches.'
    }
  },
  {
    id: 'dr_trk_shot_put_glide',
    name: { ar: 'دفع الجلّة (غلايد)', en: 'Shot Put Glide Drill' },
    category: 'track', equipment: 'other', type: 'distance_time',
    primaryMuscles: ['shoulders', 'chest'], secondaryMuscles: ['quadriceps', 'triceps'],
    howTo: {
      ar: 'من وضع الظهر للهدف: اغلق بالرجل وادفع بالوزن لقدّام ثم دفع الجلّة بالكتف والذراع. ٣ × ٦ رميات بوزن خفيف.',
      en: 'From a rear-facing start: glide with the legs, transfer the weight forward, then drive the shot through the shoulder and arm. 3 × 6 throws with a light implement.'
    }
  },
  {
    id: 'dr_trk_javelin_crossover',
    name: { ar: 'رمي الرمح (كروس أوفر)', en: 'Javelin Cross-Step Drill' },
    category: 'track', equipment: 'other', type: 'distance_time',
    primaryMuscles: ['shoulders', 'abdominals'], secondaryMuscles: ['quadriceps', 'lats'],
    howTo: {
      ar: '٥ خطوات كروس مع الرمح للخلف ثم رمية بالصدر والكتف — بدون جري كامل في البداية. ٣ × ٦. وزن/رمح خفيف.',
      en: '5 cross-steps with the javelin drawn back, then a chest-and-shoulder throw — without a full run-up at first. 3 × 6 with a light implement.'
    }
  },
  {
    id: 'dr_trk_med_ball_throws',
    name: { ar: 'رميات كرة طبية للألعاب', en: 'Med-Ball Power Throws' },
    category: 'track', equipment: 'other', type: 'distance_time',
    primaryMuscles: ['shoulders', 'abdominals'], secondaryMuscles: ['chest', 'glutes'],
    howTo: {
      ar: 'رميات أمامية/من فوق الراس/دوّارة بأقصى سرعة بكرة ٢-٤ كجم، ٣-٤ × ٥-٨. بتحسّن القدرة قبل الرمي والوثب.',
      en: 'Chest, overhead and rotational throws with a 2-4kg ball at maximum speed, 3-4 × 5-8. Develops power for throwing and jumping events.'
    }
  },
  {
    id: 'dr_trk_sled_sprint',
    name: { ar: 'سليد سبرنت (تسارع بمقاومة)', en: 'Sled Sprint' },
    category: 'track', equipment: 'sled', type: 'distance_time',
    primaryMuscles: ['quadriceps', 'glutes'], secondaryMuscles: ['hamstrings', 'calves'],
    howTo: {
      ar: 'حمل خفيف (١٠-٢٠٪ من وزن الجسم) لـ١٥-٣٠م بأقصى جهد مع ميل للأمام. ٤-٦ مرات. تسارع مش تعب.',
      en: 'Light load (10-20% body mass) over 15-30m at maximum effort with forward lean. 4-6 reps. For acceleration, not fatigue.'
    }
  }
];
