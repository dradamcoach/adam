/*
 * ADAM — مكتبة المكملات الغذائية والفيتامينات
 *
 * ⚠️ مهم جدًا:
 * المكتبة دي مرجع تعليمي للمدرب والمتخصص — مش وصفة طبية. الجرعات
 * المكتوبة هي المدى الشائع في المراجع الرياضية للبالغ السليم، وأي حد
 * عنده حالة مرضية أو بياخد دوا أو حامل/مرضعة لازم يرجع لطبيب أو أخصائي
 * تغذية إكلينيكي قبل أي مكمل.
 *
 * القاعدة اللي المفروض تتقال للعميل: الأكل الأول، والمكمل بيسدّ نقص
 * مش بيبني برنامج. مفيش مكمل بيعوّض تمرين وحش أو نوم قليل.
 *
 * cat   = التصنيف
 * dose  = الجرعة الشائعة
 * when  = التوقيت
 * use   = بيستخدم ليه
 * care  = تحذيرات وملاحظات
 * grade = قوة الدليل العلمي: strong / moderate / limited
 */

export const SUPPLEMENT_CATEGORIES = {
  protein:     { ar: 'بروتينات',            en: 'Proteins' },
  performance: { ar: 'أداء وقوة',           en: 'Performance & strength' },
  vitamin:     { ar: 'فيتامينات',           en: 'Vitamins' },
  mineral:     { ar: 'معادن',               en: 'Minerals' },
  fat:         { ar: 'دهون صحية',           en: 'Healthy fats' },
  joint:       { ar: 'مفاصل وأوتار',        en: 'Joints & tendons' },
  recovery:    { ar: 'استشفاء ونوم',        en: 'Recovery & sleep' },
  gut:         { ar: 'هضم',                 en: 'Digestion' },
  weight:      { ar: 'تحكم في الوزن',       en: 'Weight management' },
  hydration:   { ar: 'ترطيب وأملاح',        en: 'Hydration & electrolytes' }
};

export const EVIDENCE_GRADES = {
  strong:   { ar: 'دليل قوي',      en: 'Strong evidence' },
  moderate: { ar: 'دليل متوسط',    en: 'Moderate evidence' },
  limited:  { ar: 'دليل محدود',    en: 'Limited evidence' }
};

export const SUPPLEMENT_LIBRARY = [

  /* ---------------- بروتينات ---------------- */
  {
    id: 'sup_whey', cat: 'protein', icon: '🥤', grade: 'strong',
    ar: 'واي بروتين (مركّز/معزول)', en: 'Whey protein (concentrate / isolate)',
    dose: { ar: '20–40 جم للجرعة', en: '20–40 g per serving' },
    when: { ar: 'بعد التمرين أو في أي وقت لسد احتياج البروتين اليومي', en: 'After training, or any time to hit the daily protein target' },
    use: { ar: 'أسهل طريقة لرفع البروتين اليومي لما الأكل مايكفيش — امتصاصه سريع وفيه ليوسين عالي', en: 'The simplest way to raise daily protein when food falls short — fast absorbing and high in leucine' },
    care: { ar: 'اللي عنده حساسية لاكتوز يستعمل الأيزوليت. مش أحسن من الأكل، بس أسهل.', en: 'Use isolate if lactose-intolerant. Not better than food, just more convenient.' }
  },
  {
    id: 'sup_casein', cat: 'protein', icon: '🥛', grade: 'moderate',
    ar: 'كازين', en: 'Casein protein',
    dose: { ar: '25–40 جم', en: '25–40 g' },
    when: { ar: 'قبل النوم أو في فترة طويلة من غير أكل', en: 'Before bed, or across a long gap without food' },
    use: { ar: 'بروتين بطيء الهضم بيدي إطلاق أحماض أمينية ممتد لساعات', en: 'Slow-digesting protein giving a steady amino-acid release for hours' },
    care: { ar: 'الزبادي اليوناني والجبنة القريش بيدّوا نفس الفكرة من أكل حقيقي.', en: 'Greek yoghurt and cottage cheese give the same effect from real food.' }
  },
  {
    id: 'sup_plant_protein', cat: 'protein', icon: '🌱', grade: 'moderate',
    ar: 'بروتين نباتي (بازلاء/أرز)', en: 'Plant protein (pea / rice)',
    dose: { ar: '25–40 جم', en: '25–40 g' },
    when: { ar: 'زي الواي', en: 'Same as whey' },
    use: { ar: 'بديل للنباتيين أو اللي عنده حساسية من الألبان', en: 'An option for vegetarians or anyone reacting to dairy' },
    care: { ar: 'الخلطات (بازلاء + أرز) أحسن من نوع واحد عشان الأحماض الأمينية تكتمل.', en: 'Blends (pea + rice) beat a single source for a complete amino profile.' }
  },
  {
    id: 'sup_mass_gainer', cat: 'protein', icon: '🍶', grade: 'limited',
    ar: 'ماس جينر', en: 'Mass gainer',
    dose: { ar: 'حسب فرق السعرات المطلوب', en: 'Scaled to the calorie gap' },
    when: { ar: 'بين الوجبات', en: 'Between meals' },
    use: { ar: 'للنحيف جدًا اللي مش قادر ياكل سعرات كفاية', en: 'For a very lean client who cannot eat enough calories' },
    care: { ar: 'معظمه سكر غالي — لبن بالموز والشوفان وزبدة الفول بيعمل نفس الشغل بربع التمن.', en: 'Mostly expensive sugar — milk with banana, oats and peanut butter does the same for a quarter of the price.' }
  },

  /* ---------------- أداء وقوة ---------------- */
  {
    id: 'sup_creatine', cat: 'performance', icon: '💪', grade: 'strong',
    ar: 'كرياتين مونوهيدرات', en: 'Creatine monohydrate',
    dose: { ar: '3–5 جم يوميًا (مش لازم مرحلة تحميل)', en: '3–5 g daily (no loading phase needed)' },
    when: { ar: 'أي وقت في اليوم، المهم الانتظام', en: 'Any time of day — consistency is what matters' },
    use: { ar: 'أكتر مكمل مدروس في الرياضة: بيزوّد القوة والقدرة على التكرارات وحجم العضلة', en: 'The most researched sports supplement: more strength, more reps, more muscle size' },
    care: { ar: 'بيزوّد الماء جوه العضلة فالميزان بيعلى ١–٢ كيلو في الأول — ده مش دهون. اشرب مياه كفاية.', en: 'It pulls water into muscle so the scale rises 1–2 kg early on — that is not fat. Drink enough water.' }
  },
  {
    id: 'sup_caffeine', cat: 'performance', icon: '☕', grade: 'strong',
    ar: 'كافيين', en: 'Caffeine',
    dose: { ar: '3–6 مجم لكل كيلو من الوزن', en: '3–6 mg per kg of body weight' },
    when: { ar: 'قبل التمرين بـ 45–60 دقيقة', en: '45–60 minutes before training' },
    use: { ar: 'بيقلل الإحساس بالمجهود ويحسّن التركيز والأداء في التحمّل والقوة', en: 'Lowers perceived effort and improves focus, endurance and strength output' },
    care: { ar: 'تجنّبه قبل النوم بـ 8 ساعات. اللي عنده ضغط أو قلق يقلّل الجرعة.', en: 'Avoid within 8 hours of bed. Anyone with hypertension or anxiety should use a lower dose.' }
  },
  {
    id: 'sup_beta_alanine', cat: 'performance', icon: '⚡', grade: 'strong',
    ar: 'بيتا ألانين', en: 'Beta-alanine',
    dose: { ar: '3–5 جم يوميًا مقسّمة', en: '3–5 g daily, split into doses' },
    when: { ar: 'أي وقت — التراكم هو المهم مش التوقيت', en: 'Any time — accumulation matters, not timing' },
    use: { ar: 'بيحسّن الأداء في المجهود من دقيقة لـ 4 دقايق (سباحة، 400 و800 متر، كروس فيت)', en: 'Improves performance in efforts lasting 1–4 minutes (swimming, 400 m and 800 m, CrossFit)' },
    care: { ar: 'بيعمل نمنمة في الجلد — عرض طبيعي ومش ضار، قسّم الجرعة عشان يقل.', en: 'Causes skin tingling — harmless; splitting the dose reduces it.' }
  },
  {
    id: 'sup_citrulline', cat: 'performance', icon: '🍉', grade: 'moderate',
    ar: 'سيترولين مالات', en: 'Citrulline malate',
    dose: { ar: '6–8 جم', en: '6–8 g' },
    when: { ar: 'قبل التمرين بساعة', en: 'One hour before training' },
    use: { ar: 'بيزوّد تدفق الدم والتحمّل العضلي داخل الجلسة', en: 'Raises blood flow and muscular endurance within the session' },
    care: { ar: 'تأثيره أوضح في التمارين عالية الحجم منه في الرفعات التقيلة.', en: 'The effect shows more in high-volume work than in heavy singles.' }
  },
  {
    id: 'sup_bcaa', cat: 'performance', icon: '💊', grade: 'limited',
    ar: 'بي سي إيه إيه (BCAA)', en: 'BCAAs',
    dose: { ar: '5–10 جم', en: '5–10 g' },
    when: { ar: 'حوالين التمرين', en: 'Around training' },
    use: { ar: 'بيتباع على إنه بيقلل الهدم العضلي', en: 'Marketed as reducing muscle breakdown' },
    care: { ar: 'لو بروتينك اليومي كفاية، مفيش فايدة إضافية تقريبًا — الفلوس دي أحسن تروح لواي بروتين أو أكل.', en: 'If daily protein is adequate there is almost no added benefit — that money is better spent on whey or food.' }
  },
  {
    id: 'sup_hmb', cat: 'performance', icon: '🧪', grade: 'limited',
    ar: 'إتش إم بي (HMB)', en: 'HMB',
    dose: { ar: '3 جم يوميًا', en: '3 g daily' },
    when: { ar: 'مقسّمة على اليوم', en: 'Split through the day' },
    use: { ar: 'ممكن يساعد في تقليل فقد العضلة في فترات الراحة أو الإصابة', en: 'May help limit muscle loss during layoffs or injury' },
    care: { ar: 'فايدته شبه معدومة للمتدرب المتقدم اللي بروتينه كفاية.', en: 'Close to useless for a trained client already eating enough protein.' }
  },
  {
    id: 'sup_nitrate', cat: 'performance', icon: '🥬', grade: 'moderate',
    ar: 'نترات (عصير بنجر)', en: 'Dietary nitrate (beetroot juice)',
    dose: { ar: '300–600 مجم نترات', en: '300–600 mg nitrate' },
    when: { ar: 'قبل السباق بـ 2–3 ساعات', en: '2–3 hours before the race' },
    use: { ar: 'بيقلل استهلاك الأكسجين ويحسّن أداء التحمّل', en: 'Lowers oxygen cost and improves endurance performance' },
    care: { ar: 'غسول الفم المطهّر بيقلل تأثيره — بلاش قبله.', en: 'Antibacterial mouthwash blunts the effect — skip it beforehand.' }
  },

  /* ---------------- فيتامينات ---------------- */
  {
    id: 'sup_vit_d', cat: 'vitamin', icon: '☀️', grade: 'strong',
    ar: 'فيتامين د3', en: 'Vitamin D3',
    dose: { ar: '1000–2000 وحدة يوميًا للمحافظة', en: '1000–2000 IU daily for maintenance' },
    when: { ar: 'مع وجبة فيها دهون', en: 'With a meal containing fat' },
    use: { ar: 'مهم لصحة العظم والعضلة والمناعة — والنقص منتشر جدًا رغم الشمس', en: 'Key for bone, muscle and immune health — deficiency is very common despite the sun' },
    care: { ar: 'الجرعات العالية (50 ألف وحدة) لازم بتحليل وبقرار طبيب، مش من نفسك.', en: 'High doses (50,000 IU) need a blood test and a doctor\'s decision, not self-prescription.' }
  },
  {
    id: 'sup_vit_c', cat: 'vitamin', icon: '🍊', grade: 'moderate',
    ar: 'فيتامين سي', en: 'Vitamin C',
    dose: { ar: '200–500 مجم يوميًا', en: '200–500 mg daily' },
    when: { ar: 'مع الأكل', en: 'With food' },
    use: { ar: 'مضاد أكسدة وبيساعد في تكوين الكولاجين والمناعة', en: 'An antioxidant that supports collagen formation and immunity' },
    care: { ar: 'جرعات ضخمة بعد التمرين ممكن تقلل تكيّف التدريب — خليك في المدى الطبيعي.', en: 'Mega-doses right after training may blunt training adaptation — stay in the normal range.' }
  },
  {
    id: 'sup_b_complex', cat: 'vitamin', icon: '🅱️', grade: 'moderate',
    ar: 'فيتامينات ب المركّبة', en: 'B-complex vitamins',
    dose: { ar: 'جرعة يومية واحدة', en: 'One daily dose' },
    when: { ar: 'الصبح مع الفطار', en: 'In the morning with breakfast' },
    use: { ar: 'بتشتغل في إنتاج الطاقة من الأكل — مهمة للنباتيين وللّي سعراته قليلة', en: 'Involved in turning food into energy — important for vegetarians and low-calorie diets' },
    care: { ar: 'ب12 تحديدًا لازم للنباتي الكامل. البول بيبقى أصفر فاقع وده طبيعي.', en: 'B12 specifically is essential for a full vegan. Bright yellow urine is normal.' }
  },
  {
    id: 'sup_vit_b12', cat: 'vitamin', icon: '💉', grade: 'strong',
    ar: 'فيتامين ب12', en: 'Vitamin B12',
    dose: { ar: '250–1000 ميكروجرام', en: '250–1000 mcg' },
    when: { ar: 'الصبح', en: 'Morning' },
    use: { ar: 'ضروري للدم والأعصاب — مصدره حيواني بس', en: 'Essential for blood and nerves — found only in animal foods' },
    care: { ar: 'النباتي الكامل محتاجه إجباري مش اختياري.', en: 'For a full vegan this is mandatory, not optional.' }
  },
  {
    id: 'sup_multivitamin', cat: 'vitamin', icon: '🧃', grade: 'limited',
    ar: 'ملتي فيتامين', en: 'Multivitamin',
    dose: { ar: 'قرص يوميًا', en: 'One tablet daily' },
    when: { ar: 'مع أكبر وجبة', en: 'With the largest meal' },
    use: { ar: 'شبكة أمان للّي أكله محدود أو بيعمل رجيم قاسي', en: 'A safety net for a limited diet or an aggressive cut' },
    care: { ar: 'مش بديل عن الخضار والفاكهة، ومش بيزوّد أداء لو مفيش نقص أصلًا.', en: 'Not a substitute for vegetables and fruit, and no performance gain without an actual deficiency.' }
  },

  /* ---------------- معادن ---------------- */
  {
    id: 'sup_magnesium', cat: 'mineral', icon: '🌙', grade: 'moderate',
    ar: 'ماغنيسيوم', en: 'Magnesium',
    dose: { ar: '200–400 مجم', en: '200–400 mg' },
    when: { ar: 'بالليل قبل النوم', en: 'At night before bed' },
    use: { ar: 'بيساهم في انقباض العضلة والنوم، والنقص شائع مع العرق الكتير', en: 'Involved in muscle contraction and sleep; deficiency is common with heavy sweating' },
    care: { ar: 'نوع السيترات والجلايسينات أسهل على المعدة من الأكسيد.', en: 'Citrate and glycinate sit easier on the stomach than oxide.' }
  },
  {
    id: 'sup_zinc', cat: 'mineral', icon: '🛡️', grade: 'moderate',
    ar: 'زنك', en: 'Zinc',
    dose: { ar: '15–30 مجم', en: '15–30 mg' },
    when: { ar: 'مع الأكل', en: 'With food' },
    use: { ar: 'مهم للمناعة وللتئام الجروح', en: 'Important for immunity and wound healing' },
    care: { ar: 'الجرعة العالية لفترة طويلة بتقلل امتصاص النحاس — مدة محدودة بس.', en: 'High doses long-term reduce copper absorption — use for limited periods only.' }
  },
  {
    id: 'sup_iron', cat: 'mineral', icon: '🩸', grade: 'strong',
    ar: 'حديد', en: 'Iron',
    dose: { ar: 'حسب نتيجة التحليل', en: 'Based on blood-test results' },
    when: { ar: 'على معدة فاضية مع فيتامين سي', en: 'On an empty stomach with vitamin C' },
    use: { ar: 'نقصه بيضرب أداء التحمّل بشكل واضح، وشائع عند السيدات والعدّائين', en: 'A deficiency clearly damages endurance performance; common in women and runners' },
    care: { ar: '⚠️ ماياخدوش من غير تحليل — الزيادة ضارة فعلًا. القهوة والشاي بيقللوا امتصاصه.', en: '⚠️ Never take without a blood test — excess is genuinely harmful. Tea and coffee block absorption.' }
  },
  {
    id: 'sup_calcium', cat: 'mineral', icon: '🦴', grade: 'moderate',
    ar: 'كالسيوم', en: 'Calcium',
    dose: { ar: '500–1000 مجم لو الأكل مش كفاية', en: '500–1000 mg if diet falls short' },
    when: { ar: 'مقسّم على اليوم مع الأكل', en: 'Split through the day with food' },
    use: { ar: 'لصحة العظم خصوصًا مع رياضات الاصطدام والوزن المنخفض', en: 'For bone health, especially in contact sports and low body weight' },
    care: { ar: 'خده بعيد عن الحديد بساعتين عشان مايمنعش امتصاصه.', en: 'Take it two hours away from iron so it does not block absorption.' }
  },
  {
    id: 'sup_sodium_bicarb', cat: 'mineral', icon: '🧂', grade: 'moderate',
    ar: 'بيكربونات الصوديوم', en: 'Sodium bicarbonate',
    dose: { ar: '0.2–0.3 جم لكل كيلو', en: '0.2–0.3 g per kg' },
    when: { ar: 'قبل المنافسة بـ 60–150 دقيقة', en: '60–150 minutes before competition' },
    use: { ar: 'بيقاوم الحموضة في المجهود العالي من 1–10 دقايق', en: 'Buffers acidity in high-intensity efforts of 1–10 minutes' },
    care: { ar: '⚠️ بيعمل اضطراب معدة قوي عند ناس كتير — جرّبه في التمرين الأول، أبدًا مش يوم المنافسة.', en: '⚠️ Causes serious gut upset in many people — trial it in training, never on competition day.' }
  },

  /* ---------------- دهون صحية ---------------- */
  {
    id: 'sup_omega3', cat: 'fat', icon: '🐟', grade: 'strong',
    ar: 'أوميجا 3 (زيت سمك)', en: 'Omega-3 (fish oil)',
    dose: { ar: '1–3 جم EPA+DHA', en: '1–3 g combined EPA + DHA' },
    when: { ar: 'مع وجبة', en: 'With a meal' },
    use: { ar: 'بيقلل الالتهاب ويساعد صحة القلب والمفصل والمخ', en: 'Lowers inflammation and supports heart, joint and brain health' },
    care: { ar: '⚠️ اللي بياخد مسيّلات دم يسأل طبيبه. اقرا كمية EPA وDHA مش حجم الكبسولة.', en: '⚠️ Anyone on blood thinners must ask their doctor. Read the EPA and DHA content, not the capsule size.' }
  },
  {
    id: 'sup_omega3_vegan', cat: 'fat', icon: '🌿', grade: 'moderate',
    ar: 'أوميجا 3 من الطحالب', en: 'Algae omega-3',
    dose: { ar: '1–2 جم', en: '1–2 g' },
    when: { ar: 'مع وجبة', en: 'With a meal' },
    use: { ar: 'بديل نباتي كامل لزيت السمك', en: 'A fully plant-based alternative to fish oil' },
    care: { ar: 'أغلى، بس هو المصدر النباتي الوحيد اللي بيدي DHA فعلًا.', en: 'More expensive, but the only plant source that actually delivers DHA.' }
  },
  {
    id: 'sup_mct', cat: 'fat', icon: '🥥', grade: 'limited',
    ar: 'زيت إم سي تي', en: 'MCT oil',
    dose: { ar: '5–15 مل', en: '5–15 ml' },
    when: { ar: 'الصبح أو قبل مجهود طويل', en: 'Morning, or before a long effort' },
    use: { ar: 'دهون سريعة الامتصاص، بتستخدم في الأنظمة الكيتونية', en: 'Rapidly absorbed fat, used in ketogenic diets' },
    care: { ar: 'الجرعة الكبيرة بتعمل مغص وإسهال — ابدأ بصغير.', en: 'A large dose causes cramping and diarrhoea — start small.' }
  },

  /* ---------------- مفاصل وأوتار ---------------- */
  {
    id: 'sup_collagen', cat: 'joint', icon: '🦵', grade: 'moderate',
    ar: 'كولاجين + فيتامين سي', en: 'Collagen + vitamin C',
    dose: { ar: '15 جم كولاجين مع 50 مجم فيتامين سي', en: '15 g collagen with 50 mg vitamin C' },
    when: { ar: 'قبل تمرين التأهيل بـ 30–60 دقيقة', en: '30–60 minutes before the rehab session' },
    use: { ar: 'بيدعم الأوتار والأربطة، ومفيد في تأهيل إصابات الوتر', en: 'Supports tendon and ligament tissue; useful in tendon rehab' },
    care: { ar: 'التوقيت مهم هنا — قبل التحميل بشوية عشان يوصل للوتر وهو بيتحمّل.', en: 'Timing matters here — shortly before loading, so it reaches the tendon while it is loaded.' }
  },
  {
    id: 'sup_glucosamine', cat: 'joint', icon: '🔗', grade: 'limited',
    ar: 'جلوكوزامين وكوندرويتين', en: 'Glucosamine & chondroitin',
    dose: { ar: '1500 مجم جلوكوزامين', en: '1500 mg glucosamine' },
    when: { ar: 'يوميًا مع الأكل', en: 'Daily with food' },
    use: { ar: 'بيستخدم في خشونة المفاصل', en: 'Used for joint osteoarthritis' },
    care: { ar: 'النتايج متضاربة، والتأثير لو موجود بيظهر بعد شهور. ده قرار طبي مش تدريبي.', en: 'Results are mixed and any effect takes months. This is a medical decision, not a coaching one.' }
  },
  {
    id: 'sup_curcumin', cat: 'joint', icon: '🟡', grade: 'moderate',
    ar: 'كركمين', en: 'Curcumin',
    dose: { ar: '500–1000 مجم مع بيبرين', en: '500–1000 mg with piperine' },
    when: { ar: 'مع الأكل', en: 'With food' },
    use: { ar: 'بيقلل الالتهاب ووجع العضلات بعد التمرين', en: 'Reduces inflammation and post-exercise muscle soreness' },
    care: { ar: '⚠️ بيتعارض مع مسيّلات الدم. الكركم العادي في الأكل امتصاصه ضعيف.', en: '⚠️ Interacts with blood thinners. Plain dietary turmeric is poorly absorbed.' }
  },

  /* ---------------- استشفاء ونوم ---------------- */
  {
    id: 'sup_tart_cherry', cat: 'recovery', icon: '🍒', grade: 'moderate',
    ar: 'كرز حامض (Tart cherry)', en: 'Tart cherry',
    dose: { ar: '30 مل مركّز مرتين يوميًا', en: '30 ml concentrate twice daily' },
    when: { ar: 'قبل وبعد المنافسات المتقاربة', en: 'Around closely spaced competitions' },
    use: { ar: 'بيقلل وجع العضلات ويحسّن النوم', en: 'Reduces muscle soreness and improves sleep' },
    care: { ar: 'أنفع في أيام المنافسات المتلاحقة منه كاستخدام يومي دائم.', en: 'More useful across congested competition days than as a permanent daily habit.' }
  },
  {
    id: 'sup_ashwagandha', cat: 'recovery', icon: '🌾', grade: 'moderate',
    ar: 'أشواجاندا', en: 'Ashwagandha',
    dose: { ar: '300–600 مجم', en: '300–600 mg' },
    when: { ar: 'بالليل', en: 'At night' },
    use: { ar: 'بيساعد في التعامل مع الضغط العصبي وجودة النوم', en: 'Helps with stress load and sleep quality' },
    care: { ar: '⚠️ ممنوع في الحمل، واللي عنده مشاكل غدة درقية يسأل طبيبه.', en: '⚠️ Not for pregnancy; anyone with a thyroid condition should ask their doctor.' }
  },
  {
    id: 'sup_melatonin', cat: 'recovery', icon: '😴', grade: 'moderate',
    ar: 'ميلاتونين', en: 'Melatonin',
    dose: { ar: '0.5–3 مجم', en: '0.5–3 mg' },
    when: { ar: 'قبل النوم بـ 30–60 دقيقة', en: '30–60 minutes before bed' },
    use: { ar: 'بيساعد في ضبط النوم بعد السفر أو تغيير مواعيد التمرين', en: 'Helps reset sleep after travel or a change in training times' },
    care: { ar: 'الجرعة الصغيرة أنفع من الكبيرة. مش حل دائم لقلة النوم — الحل ضبط المواعيد.', en: 'A small dose works better than a large one. Not a permanent fix for poor sleep — fix the schedule.' }
  },

  /* ---------------- هضم ---------------- */
  {
    id: 'sup_probiotic', cat: 'gut', icon: '🦠', grade: 'moderate',
    ar: 'بروبيوتيك', en: 'Probiotics',
    dose: { ar: '1–10 مليار وحدة', en: '1–10 billion CFU' },
    when: { ar: 'يوميًا', en: 'Daily' },
    use: { ar: 'بيدعم صحة الجهاز الهضمي، ومفيد بعد مضاد حيوي أو في السفر', en: 'Supports gut health; useful after antibiotics or while travelling' },
    care: { ar: 'الزبادي والمخللات الطبيعية مصدر رخيص وكويس.', en: 'Yoghurt and naturally fermented pickles are a cheap, good source.' }
  },
  {
    id: 'sup_fiber', cat: 'gut', icon: '🌾', grade: 'moderate',
    ar: 'ألياف (سيليوم)', en: 'Fibre (psyllium)',
    dose: { ar: '5–10 جم', en: '5–10 g' },
    when: { ar: 'مع مياه كتير', en: 'With plenty of water' },
    use: { ar: 'بيساعد في الإمساك والإحساس بالشبع في الرجيم', en: 'Helps with constipation and with fullness during a cut' },
    care: { ar: 'من غير مياه كفاية بيعمل العكس. ابعده عن مواعيد الأدوية.', en: 'Without enough water it makes things worse. Keep it away from medication times.' }
  },
  {
    id: 'sup_digestive_enzymes', cat: 'gut', icon: '⚗️', grade: 'limited',
    ar: 'إنزيمات هضمية', en: 'Digestive enzymes',
    dose: { ar: 'حسب المنتج', en: 'As per product' },
    when: { ar: 'مع الوجبة', en: 'With the meal' },
    use: { ar: 'بتستخدم مع انتفاخ أو صعوبة هضم', en: 'Used for bloating or difficult digestion' },
    care: { ar: 'الانتفاخ المتكرر عايز تشخيص مش مكمل — حوّله لطبيب.', en: 'Recurring bloating needs a diagnosis, not a supplement — refer to a doctor.' }
  },

  /* ---------------- تحكم في الوزن ---------------- */
  {
    id: 'sup_green_tea', cat: 'weight', icon: '🍵', grade: 'limited',
    ar: 'مستخلص الشاي الأخضر', en: 'Green tea extract',
    dose: { ar: '250–500 مجم', en: '250–500 mg' },
    when: { ar: 'الصبح', en: 'Morning' },
    use: { ar: 'بيتباع كحارق دهون', en: 'Sold as a fat burner' },
    care: { ar: '⚠️ الجرعات العالية اترصد معاها أذى للكبد. التأثير على الوزن ضعيف جدًا مقابل العجز في السعرات.', en: '⚠️ Liver injury has been reported with high doses. The weight effect is tiny next to a calorie deficit.' }
  },
  {
    id: 'sup_fat_burner', cat: 'weight', icon: '🔥', grade: 'limited',
    ar: 'حارقات الدهون التجارية', en: 'Commercial fat burners',
    dose: { ar: '—', en: '—' },
    when: { ar: '—', en: '—' },
    use: { ar: 'خلطات بتعتمد أساسًا على الكافيين', en: 'Blends that mostly rely on caffeine' },
    care: { ar: '⚠️ كتير منها مكوناته مش مكتوبة بصدق ومنها ممنوع في الرياضة. مفيش حاجة منها بتحرق دهون من غير عجز سعرات.', en: '⚠️ Many are mislabelled and some contain banned substances. None burns fat without a calorie deficit.' }
  },
  {
    id: 'sup_l_carnitine', cat: 'weight', icon: '🧬', grade: 'limited',
    ar: 'إل كارنيتين', en: 'L-carnitine',
    dose: { ar: '2 جم', en: '2 g' },
    when: { ar: 'مع وجبة فيها كارب', en: 'With a carb-containing meal' },
    use: { ar: 'بيتباع لحرق الدهون وتحسين الاستشفاء', en: 'Sold for fat burning and recovery' },
    care: { ar: 'الدليل على الحرق ضعيف جدًا. لو هتستعمله فاحتمال الاستشفاء أقرب من الحرق.', en: 'The fat-loss evidence is very weak. If used at all, recovery is a likelier benefit than fat loss.' }
  },

  /* ---------------- ترطيب وأملاح ---------------- */
  {
    id: 'sup_electrolytes', cat: 'hydration', icon: '🧂', grade: 'strong',
    ar: 'أملاح (إلكتروليتس)', en: 'Electrolytes',
    dose: { ar: '300–700 مجم صوديوم لكل لتر', en: '300–700 mg sodium per litre' },
    when: { ar: 'أثناء المجهود الطويل أو في الحر', en: 'During long efforts or in the heat' },
    use: { ar: 'بتعوّض الصوديوم اللي بيخرج مع العرق وبتمنع التقلصات والإجهاد الحراري', en: 'Replaces sodium lost in sweat and helps prevent cramps and heat strain' },
    care: { ar: 'اللي بيعرّق كتير أو بيتمرن في الشمس محتاجها فعلًا — مش رفاهية في الصيف المصري.', en: 'A heavy sweater training in the sun genuinely needs this — not a luxury in Egyptian summer.' }
  },
  {
    id: 'sup_sports_drink', cat: 'hydration', icon: '🥤', grade: 'strong',
    ar: 'مشروب رياضي (كارب + أملاح)', en: 'Sports drink (carbs + electrolytes)',
    dose: { ar: '30–60 جم كارب في الساعة', en: '30–60 g carbs per hour' },
    when: { ar: 'أثناء المجهود اللي بيعدّي 60–90 دقيقة', en: 'During efforts longer than 60–90 minutes' },
    use: { ar: 'بيحافظ على الأداء في التحمّل الطويل', en: 'Maintains performance in long endurance work' },
    care: { ar: 'مالوش لازمة في تمرين ٤٥ دقيقة في الجيم — سعرات زيادة وبس.', en: 'Pointless in a 45-minute gym session — just extra calories.' }
  },
  {
    id: 'sup_ors', cat: 'hydration', icon: '💧', grade: 'strong',
    ar: 'محلول معالجة الجفاف', en: 'Oral rehydration solution',
    dose: { ar: 'كيس على لتر مياه', en: 'One sachet per litre of water' },
    when: { ar: 'بعد جفاف شديد أو نزلة معوية', en: 'After heavy dehydration or a stomach bug' },
    use: { ar: 'أسرع طريقة لتعويض السوائل والأملاح', en: 'The fastest way to replace fluid and salts' },
    care: { ar: 'لو الجفاف شديد أو مصحوب بقيء متكرر، ده موقف طبي مش تدريبي.', en: 'Severe dehydration or repeated vomiting is a medical situation, not a coaching one.' }
  }
];
