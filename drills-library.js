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
  conditioning: { ar: 'كارديو وتكييف',   en: 'Cardio & conditioning' }
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
  }
];