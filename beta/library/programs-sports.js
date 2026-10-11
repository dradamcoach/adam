/*
 * ADAM — برامج تغذية جاهزة: أهداف، رياضات، وحالات شائعة
 *
 * نفس شكل NUTRITION_PROGRAMS: كل برنامج 2–3 أنماط أيام (فطار/غدا/عشا/سناك)
 * بتتوزّع على الأسبوع بالدور، والأصناف بمعرّفاتها من FOOD_LIBRARY أو
 * FOOD_LIBRARY_EXTRA. الأهداف (targets) محسوبة من نفس الأكل اللي جوه كل
 * برنامج — متوسط الأيام — بالأداة tools/check-nutrition.js (--write)،
 * مش متكتوبة بالإيد. لو غيّرت أي جرامات هنا شغّل الأداة تاني.
 *
 * "60 كيلو" و"85 كيلو" = وزن مرجعي؛ المدرب يعدّل الكميات حسب وزن العميل.
 *
 * برامج الحالات الصحية عليها medicalReview: true — دي نقطة بداية عامة
 * لازم دكتور العميل أو أخصائي التغذية العلاجية يراجعها قبل ما تتطبق،
 * خصوصاً لو فيه أدوية (سكر، ضغط، إلخ). مش وصفة علاجية.
 */

export const NUTRITION_PROGRAMS_SPORTS = [

  /* ================= أهداف × وزن مرجعي ================= */

  {
    id: 'fat_loss_60kg',
    ar: 'تخسيس معتدل — 60 كيلو',
    en: 'Moderate fat loss — 60 kg',
    goal: 'lose_weight',
    desc: { ar: 'عجز معتدل في السعرات مع بروتين حوالي 2 جم لكل كيلو عشان العضل يفضل. نزول نص كيلو تقريباً في الأسبوع. أكل بيت مصري عادي.', en: 'Moderate calorie deficit with about 2 g/kg protein to keep muscle. Roughly 0.5 kg loss per week. Everyday Egyptian home food.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 1457, protein: 125, carbs: 174, fat: 30 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 100 }, { id: 'egg_white', g: 100 }, { id: 'bread_baladi', g: 90 }, { id: 'cheese_qarish', g: 80 }, { id: 'tomato', g: 120 }],
        lunch: [{ id: 'chicken_breast', g: 170 }, { id: 'rice_white', g: 180 }, { id: 'salata_baladi', g: 200 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'yogurt_greek', g: 250 }, { id: 'cucumber', g: 150 }, { id: 'walnuts', g: 10 }],
        snack: [{ id: 'apple', g: 180 }],
      },
      {
        breakfast: [{ id: 'foul_plain', g: 200 }, { id: 'bread_baladi', g: 80 }, { id: 'egg_white', g: 100 }, { id: 'salata_baladi', g: 150 }],
        lunch: [{ id: 'fish_tilapia', g: 200 }, { id: 'potato', g: 200 }, { id: 'green_beans', g: 200 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'cheese_qarish', g: 150 }, { id: 'bread_toast_brown', g: 40 }, { id: 'cucumber', g: 150 }],
        snack: [{ id: 'orange', g: 200 }],
      },
      {
        breakfast: [{ id: 'oats', g: 50 }, { id: 'milk_skim', g: 250 }, { id: 'strawberry', g: 100 }, { id: 'egg_whole', g: 60 }],
        lunch: [{ id: 'veal', g: 150 }, { id: 'rice_brown', g: 180 }, { id: 'molokhia', g: 200 }],
        dinner: [{ id: 'fish_tuna_can', g: 120 }, { id: 'salata_baladi', g: 200 }, { id: 'bread_baladi', g: 45 }],
        snack: [{ id: 'guava', g: 180 }],
      },
    ]
  },
  {
    id: 'fat_loss_85kg',
    ar: 'تخسيس معتدل — 85 كيلو',
    en: 'Moderate fat loss — 85 kg',
    goal: 'lose_weight',
    desc: { ar: 'نفس فكرة التخسيس المعتدل لوزن أكبر: عجز معقول وبروتين عالي في كل وجبة، ونشويات أكتر حوالين التمرين. الهدف نص كيلو لكيلو في الأسبوع.', en: 'Moderate fat loss for a heavier client: sensible deficit, high protein at every meal, more carbs around training. Aim for 0.5–1 kg per week.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2093, protein: 180, carbs: 245, fat: 45 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 100 }, { id: 'egg_white', g: 150 }, { id: 'bread_baladi', g: 100 }, { id: 'cheese_qarish', g: 100 }, { id: 'tomato', g: 150 }],
        lunch: [{ id: 'chicken_breast', g: 230 }, { id: 'rice_white', g: 250 }, { id: 'salata_baladi', g: 250 }, { id: 'olive_oil', g: 10 }],
        dinner: [{ id: 'yogurt_greek', g: 300 }, { id: 'oats', g: 30 }, { id: 'strawberry', g: 100 }],
        snack: [{ id: 'apple', g: 200 }, { id: 'almonds', g: 15 }],
      },
      {
        breakfast: [{ id: 'foul_oil', g: 250 }, { id: 'bread_baladi', g: 100 }, { id: 'egg_white', g: 150 }, { id: 'salata_baladi', g: 150 }],
        lunch: [{ id: 'fish_tilapia', g: 280 }, { id: 'potato', g: 300 }, { id: 'green_beans', g: 250 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'cheese_qarish', g: 200 }, { id: 'bread_toast_brown', g: 60 }, { id: 'cucumber', g: 200 }],
        snack: [{ id: 'banana', g: 120 }, { id: 'yogurt_greek', g: 170 }],
      },
      {
        breakfast: [{ id: 'oats', g: 70 }, { id: 'milk_skim', g: 300 }, { id: 'banana', g: 100 }, { id: 'egg_white', g: 100 }],
        lunch: [{ id: 'veal', g: 220 }, { id: 'rice_brown', g: 250 }, { id: 'molokhia', g: 250 }, { id: 'salata_baladi', g: 150 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'fish_tuna_can', g: 150 }, { id: 'salata_baladi', g: 200 }, { id: 'bread_baladi', g: 80 }],
        snack: [{ id: 'guava', g: 200 }, { id: 'yogurt_greek', g: 200 }],
      },
    ]
  },
  {
    id: 'lean_gain_60kg',
    ar: 'زيادة عضل نضيفة — 60 كيلو',
    en: 'Lean gain — 60 kg',
    goal: 'muscle_gain',
    desc: { ar: 'فايض بسيط في السعرات عشان الزيادة تبقى عضل مش دهون: ربع لنص كيلو في الشهر. نشويات كويسة للتمرين وبروتين متوزع على 4 وجبات.', en: 'Small calorie surplus so the gain is mostly muscle: about 0.25–0.5 kg per month. Good carbs for training and protein spread over 4 meals.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2373, protein: 149, carbs: 274, fat: 78 },
    days: [
      {
        breakfast: [{ id: 'oats', g: 80 }, { id: 'milk_full', g: 300 }, { id: 'banana', g: 120 }, { id: 'peanut_butter', g: 20 }],
        lunch: [{ id: 'chicken_thigh', g: 180 }, { id: 'rice_white', g: 300 }, { id: 'salata_baladi', g: 150 }],
        dinner: [{ id: 'egg_whole', g: 150 }, { id: 'cheese_qarish', g: 100 }, { id: 'bread_baladi', g: 100 }, { id: 'tomato', g: 100 }],
        snack: [{ id: 'yogurt_greek', g: 200 }, { id: 'dates', g: 40 }],
      },
      {
        breakfast: [{ id: 'foul_oil', g: 250 }, { id: 'egg_whole', g: 100 }, { id: 'bread_baladi', g: 120 }, { id: 'salata_baladi', g: 100 }],
        lunch: [{ id: 'beef_lean', g: 150 }, { id: 'macaroni_red', g: 300 }, { id: 'salata_baladi', g: 150 }],
        dinner: [{ id: 'fish_tuna_can', g: 120 }, { id: 'bread_shami_brown', g: 80 }, { id: 'cucumber', g: 100 }, { id: 'olive_oil', g: 5 }],
        snack: [{ id: 'milk_full', g: 250 }, { id: 'dates', g: 40 }, { id: 'almonds', g: 20 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 150 }, { id: 'bread_baladi', g: 100 }, { id: 'cheese_white_light', g: 60 }, { id: 'tomato', g: 100 }],
        lunch: [{ id: 'fish_tilapia', g: 200 }, { id: 'rice_koshari', g: 280 }, { id: 'salata_tahina', g: 60 }],
        dinner: [{ id: 'yogurt_greek', g: 250 }, { id: 'granola', g: 50 }, { id: 'banana', g: 100 }],
        snack: [{ id: 'bread_toast_brown', g: 50 }, { id: 'peanut_butter', g: 20 }, { id: 'milk_low_fat', g: 250 }],
      },
    ]
  },
  {
    id: 'lean_gain_85kg',
    ar: 'زيادة عضل نضيفة — 85 كيلو',
    en: 'Lean gain — 85 kg',
    goal: 'muscle_gain',
    desc: { ar: 'فايض محسوب لوزن أكبر: بروتين حوالي 2 جم لكل كيلو ونشويات عالية للتمرين التقيل. لو الوسط بيزيد بسرعة قلّل النشويات شوية.', en: 'Measured surplus for a heavier lifter: about 2 g/kg protein and high carbs for heavy training. If the waist grows fast, trim the carbs a little.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 3165, protein: 211, carbs: 360, fat: 100 },
    days: [
      {
        breakfast: [{ id: 'oats', g: 100 }, { id: 'milk_full', g: 350 }, { id: 'banana', g: 150 }, { id: 'peanut_butter', g: 30 }],
        lunch: [{ id: 'chicken_breast', g: 250 }, { id: 'rice_white', g: 400 }, { id: 'salata_baladi', g: 200 }, { id: 'olive_oil', g: 10 }],
        dinner: [{ id: 'egg_whole', g: 150 }, { id: 'cheese_qarish', g: 150 }, { id: 'bread_baladi', g: 120 }, { id: 'tomato', g: 150 }],
        snack: [{ id: 'yogurt_greek', g: 250 }, { id: 'dates', g: 60 }, { id: 'walnuts', g: 20 }],
      },
      {
        breakfast: [{ id: 'foul_oil', g: 300 }, { id: 'egg_whole', g: 150 }, { id: 'bread_baladi', g: 150 }, { id: 'salata_baladi', g: 150 }],
        lunch: [{ id: 'beef_lean', g: 220 }, { id: 'macaroni_red', g: 400 }, { id: 'salata_baladi', g: 200 }],
        dinner: [{ id: 'fish_tuna_can', g: 150 }, { id: 'bread_shami_brown', g: 100 }, { id: 'avocado', g: 80 }, { id: 'cucumber', g: 150 }],
        snack: [{ id: 'milk_full', g: 300 }, { id: 'oats', g: 50 }, { id: 'banana', g: 120 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 150 }, { id: 'egg_white', g: 100 }, { id: 'bread_baladi', g: 150 }, { id: 'cheese_white_light', g: 80 }, { id: 'tomato', g: 150 }],
        lunch: [{ id: 'fish_tilapia', g: 280 }, { id: 'rice_koshari', g: 400 }, { id: 'salata_tahina', g: 80 }],
        dinner: [{ id: 'yogurt_greek', g: 300 }, { id: 'granola', g: 70 }, { id: 'banana', g: 120 }],
        snack: [{ id: 'whey', g: 30 }, { id: 'milk_low_fat', g: 300 }, { id: 'peanut_butter', g: 20 }],
      },
    ]
  },
  {
    id: 'maintenance_60kg',
    ar: 'تثبيت وزن — 60 كيلو',
    en: 'Maintenance — 60 kg',
    goal: 'fitness',
    desc: { ar: 'سعرات قد الاحتياج عشان الوزن يثبت، مع بروتين كويس وأكل متنوع: فول وطعمية ومحشي وسمك. مرن ومناسب كأسلوب حياة.', en: 'Calories at maintenance so weight holds, with solid protein and varied food: foul, taameya, fish and home stews. Flexible enough to live with.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 1911, protein: 110, carbs: 225, fat: 66 },
    days: [
      {
        breakfast: [{ id: 'foul_oil', g: 200 }, { id: 'egg_whole', g: 60 }, { id: 'bread_baladi', g: 90 }, { id: 'salata_baladi', g: 120 }],
        lunch: [{ id: 'chicken_thigh', g: 150 }, { id: 'rice_white', g: 220 }, { id: 'molokhia', g: 200 }],
        dinner: [{ id: 'yogurt_plain', g: 200 }, { id: 'cheese_qarish', g: 100 }, { id: 'bread_toast_brown', g: 50 }, { id: 'cucumber', g: 120 }],
        snack: [{ id: 'banana', g: 120 }, { id: 'almonds', g: 15 }],
      },
      {
        breakfast: [{ id: 'oats', g: 60 }, { id: 'milk_low_fat', g: 250 }, { id: 'apple', g: 150 }, { id: 'peanut_butter', g: 15 }],
        lunch: [{ id: 'kofta', g: 150 }, { id: 'macaroni_red', g: 220 }, { id: 'salata_baladi', g: 150 }],
        dinner: [{ id: 'egg_whole', g: 100 }, { id: 'cheese_white_light', g: 50 }, { id: 'bread_baladi', g: 90 }, { id: 'tomato', g: 120 }],
        snack: [{ id: 'mango', g: 150 }, { id: 'yogurt_greek', g: 150 }],
      },
      {
        breakfast: [{ id: 'taameya', g: 100 }, { id: 'bread_baladi', g: 90 }, { id: 'salata_tahina', g: 50 }, { id: 'tomato', g: 100 }],
        lunch: [{ id: 'fish_bouri', g: 200 }, { id: 'rice_koshari', g: 200 }, { id: 'bamya_zeit', g: 200 }],
        dinner: [{ id: 'yogurt_greek', g: 200 }, { id: 'dates', g: 30 }, { id: 'walnuts', g: 15 }],
        snack: [{ id: 'orange', g: 200 }],
      },
    ]
  },
  {
    id: 'maintenance_85kg',
    ar: 'تثبيت وزن — 85 كيلو',
    en: 'Maintenance — 85 kg',
    goal: 'fitness',
    desc: { ar: 'تثبيت وزن لجسم أكبر ونشاط متوسط: 4 وجبات مشبعة من الأكل المصري المعتاد مع بروتين في كل وجبة.', en: 'Maintenance for a larger, moderately active client: 4 filling meals of familiar Egyptian food with protein at each.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2619, protein: 158, carbs: 296, fat: 93 },
    days: [
      {
        breakfast: [{ id: 'foul_oil', g: 250 }, { id: 'egg_whole', g: 100 }, { id: 'bread_baladi', g: 120 }, { id: 'salata_baladi', g: 150 }],
        lunch: [{ id: 'chicken_thigh', g: 220 }, { id: 'rice_white', g: 300 }, { id: 'molokhia', g: 250 }],
        dinner: [{ id: 'yogurt_plain', g: 200 }, { id: 'cheese_qarish', g: 150 }, { id: 'bread_toast_brown', g: 70 }, { id: 'cucumber', g: 150 }],
        snack: [{ id: 'banana', g: 150 }, { id: 'almonds', g: 25 }],
      },
      {
        breakfast: [{ id: 'oats', g: 80 }, { id: 'milk_low_fat', g: 300 }, { id: 'apple', g: 150 }, { id: 'peanut_butter', g: 25 }],
        lunch: [{ id: 'kofta', g: 200 }, { id: 'macaroni_red', g: 300 }, { id: 'salata_baladi', g: 200 }],
        dinner: [{ id: 'egg_whole', g: 150 }, { id: 'cheese_white_light', g: 60 }, { id: 'bread_baladi', g: 120 }, { id: 'tomato', g: 150 }],
        snack: [{ id: 'mango', g: 200 }, { id: 'yogurt_greek', g: 200 }],
      },
      {
        breakfast: [{ id: 'taameya', g: 130 }, { id: 'egg_whole', g: 60 }, { id: 'bread_baladi', g: 120 }, { id: 'salata_tahina', g: 60 }, { id: 'tomato', g: 120 }],
        lunch: [{ id: 'fish_bouri', g: 280 }, { id: 'rice_koshari', g: 280 }, { id: 'bamya_zeit', g: 250 }],
        dinner: [{ id: 'yogurt_greek', g: 250 }, { id: 'dates', g: 40 }, { id: 'walnuts', g: 20 }],
        snack: [{ id: 'orange', g: 200 }, { id: 'lupini', g: 100 }],
      },
    ]
  },
  {
    id: 'recomp_60kg',
    ar: 'إعادة تشكيل الجسم — 60 كيلو',
    en: 'Body recomposition — 60 kg',
    goal: 'fitness',
    desc: { ar: 'سعرات قريبة من التثبيت أو أقل شوية، وبروتين عالي جداً مع تمرين مقاومة منتظم: الدهون تنزل والعضل يزيد ببطء. الميزان ممكن ما يتحركش — تابع المقاسات والصور.', en: 'Calories at or slightly below maintenance with very high protein and regular resistance training: fat drops while muscle builds slowly. The scale may not move — track measurements and photos.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 1789, protein: 146, carbs: 216, fat: 40 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 100 }, { id: 'egg_white', g: 100 }, { id: 'bread_baladi', g: 90 }, { id: 'cheese_qarish', g: 80 }, { id: 'tomato', g: 120 }],
        lunch: [{ id: 'chicken_breast', g: 170 }, { id: 'rice_white', g: 220 }, { id: 'salata_baladi', g: 200 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'yogurt_greek', g: 250 }, { id: 'oats', g: 30 }, { id: 'banana', g: 100 }],
        snack: [{ id: 'lupini', g: 100 }, { id: 'apple', g: 150 }],
      },
      {
        breakfast: [{ id: 'foul_plain', g: 250 }, { id: 'egg_whole', g: 60 }, { id: 'bread_baladi', g: 90 }, { id: 'salata_baladi', g: 150 }],
        lunch: [{ id: 'fish_tilapia', g: 220 }, { id: 'potato', g: 250 }, { id: 'green_beans', g: 200 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'cheese_qarish', g: 150 }, { id: 'bread_toast_brown', g: 50 }, { id: 'cucumber', g: 150 }],
        snack: [{ id: 'yogurt_greek', g: 200 }, { id: 'strawberry', g: 120 }, { id: 'almonds', g: 15 }],
      },
      {
        breakfast: [{ id: 'oats', g: 60 }, { id: 'milk_skim', g: 300 }, { id: 'banana', g: 100 }],
        lunch: [{ id: 'veal', g: 170 }, { id: 'rice_brown', g: 200 }, { id: 'molokhia', g: 200 }, { id: 'salata_baladi', g: 150 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'egg_whole', g: 100 }, { id: 'cheese_white_light', g: 50 }, { id: 'bread_shami_brown', g: 60 }, { id: 'cucumber', g: 150 }],
        snack: [{ id: 'guava', g: 180 }, { id: 'yogurt_greek', g: 170 }],
      },
    ]
  },
  {
    id: 'recomp_85kg',
    ar: 'إعادة تشكيل الجسم — 85 كيلو',
    en: 'Body recomposition — 85 kg',
    goal: 'fitness',
    desc: { ar: 'إعادة تشكيل لوزن أكبر: بروتين عالي جداً في كل وجبة ونشويات متوسطة أغلبها قبل وبعد التمرين. مناسب للي راجع للتمرين أو عنده دهون زيادة بسيطة.', en: 'Recomposition for a heavier client: very high protein every meal, moderate carbs mostly around training. Suits returning lifters or those with a little extra fat.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2359, protein: 203, carbs: 271, fat: 54 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 150 }, { id: 'egg_white', g: 100 }, { id: 'bread_baladi', g: 120 }, { id: 'cheese_qarish', g: 100 }, { id: 'tomato', g: 150 }],
        lunch: [{ id: 'chicken_breast', g: 250 }, { id: 'rice_white', g: 280 }, { id: 'salata_baladi', g: 250 }, { id: 'olive_oil', g: 10 }],
        dinner: [{ id: 'yogurt_greek', g: 300 }, { id: 'oats', g: 40 }, { id: 'banana', g: 120 }],
        snack: [{ id: 'lupini', g: 150 }, { id: 'apple', g: 180 }],
      },
      {
        breakfast: [{ id: 'foul_plain', g: 300 }, { id: 'egg_whole', g: 100 }, { id: 'bread_baladi', g: 120 }, { id: 'salata_baladi', g: 150 }],
        lunch: [{ id: 'fish_tilapia', g: 300 }, { id: 'potato', g: 300 }, { id: 'green_beans', g: 250 }, { id: 'olive_oil', g: 10 }],
        dinner: [{ id: 'cheese_qarish', g: 200 }, { id: 'bread_toast_brown', g: 70 }, { id: 'cucumber', g: 200 }],
        snack: [{ id: 'yogurt_greek', g: 250 }, { id: 'strawberry', g: 150 }, { id: 'almonds', g: 20 }],
      },
      {
        breakfast: [{ id: 'oats', g: 80 }, { id: 'milk_skim', g: 350 }, { id: 'banana', g: 120 }, { id: 'whey', g: 25 }],
        lunch: [{ id: 'veal', g: 250 }, { id: 'rice_brown', g: 280 }, { id: 'molokhia', g: 250 }],
        dinner: [{ id: 'egg_whole', g: 100 }, { id: 'egg_white', g: 100 }, { id: 'cheese_white_light', g: 60 }, { id: 'bread_shami_brown', g: 80 }, { id: 'cucumber', g: 150 }],
        snack: [{ id: 'guava', g: 200 }, { id: 'yogurt_greek', g: 200 }],
      },
    ]
  },

  /* ================= تغذية الرياضيين ================= */

  {
    id: 'endurance_high_carb_day',
    ar: 'يوم تمرين تحمّل — نشويات عالية',
    en: 'Endurance training day — high carb',
    goal: 'performance',
    desc: { ar: 'ليوم فيه تمرين طويل (جري، عجل، سباحة) لرياضي حوالي 65 كيلو: نشويات 7–8 جم لكل كيلو. السناك = أثناء وبعد التمرين (بلح وموز ومشروب رياضي). يوم التمرين الخفيف قلّل الرز والمكرونة.', en: 'For a long-session day (running, cycling, swimming), ~65 kg athlete: about 7–8 g/kg carbs. Snack = during and after the session (dates, banana, sports drink). On easy days cut the rice and pasta.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 3026, protein: 143, carbs: 514, fat: 48 },
    days: [
      {
        breakfast: [{ id: 'oats', g: 100 }, { id: 'milk_low_fat', g: 300 }, { id: 'banana', g: 150 }, { id: 'honey', g: 25 }],
        lunch: [{ id: 'chicken_breast', g: 180 }, { id: 'rice_white', g: 450 }, { id: 'salata_baladi', g: 150 }],
        dinner: [{ id: 'pasta_cooked', g: 350 }, { id: 'fish_tuna_can', g: 120 }, { id: 'tomato', g: 150 }, { id: 'olive_oil', g: 5 }],
        snack: [{ id: 'dates', g: 60 }, { id: 'banana', g: 120 }, { id: 'sports_drink', g: 500 }],
      },
      {
        breakfast: [{ id: 'foul_plain', g: 250 }, { id: 'bread_baladi', g: 150 }, { id: 'egg_whole', g: 100 }, { id: 'orange_juice', g: 250 }],
        lunch: [{ id: 'fish_tilapia', g: 220 }, { id: 'rice_koshari', g: 400 }, { id: 'green_beans', g: 200 }],
        dinner: [{ id: 'yogurt_fruit', g: 200 }, { id: 'granola', g: 70 }, { id: 'banana', g: 150 }],
        snack: [{ id: 'rice_cakes', g: 40 }, { id: 'honey', g: 30 }, { id: 'dates', g: 40 }, { id: 'sports_drink', g: 500 }],
      },
      {
        breakfast: [{ id: 'oats_milk', g: 400 }, { id: 'dates', g: 60 }, { id: 'banana', g: 120 }],
        lunch: [{ id: 'chicken_thigh', g: 180 }, { id: 'pasta_cooked', g: 450 }, { id: 'salata_baladi', g: 150 }],
        dinner: [{ id: 'koshari_plain', g: 450 }, { id: 'yogurt_plain', g: 200 }],
        snack: [{ id: 'bread_baladi', g: 90 }, { id: 'honey', g: 25 }, { id: 'energy_gel', g: 40 }, { id: 'sports_drink', g: 500 }],
      },
    ]
  },
  {
    id: 'team_match_day',
    ar: 'يوم الماتش — رياضة جماعية',
    en: 'Match day — team sport',
    goal: 'performance',
    desc: { ar: 'لكورة ويد وسلة، لاعب حوالي 70 كيلو. الغدا = وجبة ما قبل الماتش (قبله بـ 3–4 ساعات): نشويات عالية وقليلة الدهون والألياف. السناك = قبل الماتش بساعة وبين الشوطين. العشا = استشفاء بعد الماتش (بروتين ونشويات ولبن بالشوكولاتة). من غير أكل جديد يوم الماتش.', en: 'Football, handball, basketball; ~70 kg player. Lunch = pre-match meal 3–4 h before: high carb, low fat and fibre. Snack = ~1 h before and at half-time. Dinner = post-match recovery (protein, carbs, chocolate milk). Nothing new on match day.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2741, protein: 159, carbs: 418, fat: 49 },
    days: [
      {
        breakfast: [{ id: 'oats', g: 80 }, { id: 'milk_low_fat', g: 300 }, { id: 'banana', g: 120 }, { id: 'honey', g: 20 }],
        lunch: [{ id: 'chicken_breast', g: 150 }, { id: 'rice_white', g: 400 }, { id: 'zucchini', g: 100 }],
        dinner: [{ id: 'fish_tilapia', g: 200 }, { id: 'rice_white', g: 300 }, { id: 'salata_baladi', g: 150 }, { id: 'milk_chocolate', g: 300 }],
        snack: [{ id: 'banana', g: 120 }, { id: 'rice_cakes', g: 30 }, { id: 'honey', g: 20 }, { id: 'sports_drink', g: 500 }],
      },
      {
        breakfast: [{ id: 'bread_fino', g: 100 }, { id: 'egg_whole', g: 100 }, { id: 'cheese_qarish', g: 80 }, { id: 'honey', g: 20 }],
        lunch: [{ id: 'macaroni_red', g: 450 }, { id: 'chicken_breast', g: 130 }],
        dinner: [{ id: 'chicken_thigh', g: 180 }, { id: 'potato', g: 350 }, { id: 'green_beans', g: 150 }, { id: 'milk_chocolate', g: 300 }],
        snack: [{ id: 'dates', g: 50 }, { id: 'banana', g: 100 }, { id: 'sports_drink', g: 500 }],
      },
    ]
  },
  {
    id: 'team_pre_match_day',
    ar: 'اليوم اللي قبل الماتش',
    en: 'Day before a match',
    goal: 'performance',
    desc: { ar: 'تعبئة جليكوجين معتدلة قبل الماتش بيوم، لاعب حوالي 70 كيلو: نشويات عالية من أكل متعوّد عليه، دهون قليلة، وألياف أقل في العشا عشان المعدة تبقى خفيفة. اشرب مية كويس طول اليوم.', en: 'Moderate glycogen top-up the day before, ~70 kg player: high carbs from familiar food, low fat, lighter fibre at dinner so the stomach stays settled. Drink water well all day.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2982, protein: 160, carbs: 487, fat: 45 },
    days: [
      {
        breakfast: [{ id: 'oats', g: 90 }, { id: 'milk_low_fat', g: 300 }, { id: 'banana', g: 150 }, { id: 'honey', g: 25 }],
        lunch: [{ id: 'chicken_breast', g: 180 }, { id: 'rice_white', g: 450 }, { id: 'zucchini', g: 150 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'pasta_cooked', g: 400 }, { id: 'fish_tuna_can', g: 100 }, { id: 'tomato', g: 100 }],
        snack: [{ id: 'yogurt_fruit', g: 200 }, { id: 'dates', g: 50 }, { id: 'orange_juice', g: 250 }],
      },
      {
        breakfast: [{ id: 'bread_baladi', g: 150 }, { id: 'foul_plain', g: 200 }, { id: 'egg_whole', g: 60 }, { id: 'honey', g: 20 }],
        lunch: [{ id: 'fish_tilapia', g: 200 }, { id: 'rice_koshari', g: 400 }, { id: 'potato', g: 200 }],
        dinner: [{ id: 'macaroni_red', g: 400 }, { id: 'chicken_breast', g: 100 }],
        snack: [{ id: 'rice_pudding', g: 200 }, { id: 'banana', g: 120 }, { id: 'dates', g: 40 }],
      },
    ]
  },
  {
    id: 'athlete_recovery_day',
    ar: 'يوم الاستشفاء (بعد ماتش أو حمل عالي)',
    en: 'Recovery day (after a match or hard block)',
    goal: 'performance',
    desc: { ar: 'يوم راحة بعد مجهود عالي: بروتين عالي متوزع على اليوم لإصلاح العضل، نشويات متوسطة لتعويض المخزون، وسمك وفواكه وخضار ملونة ومكسرات. مية كتير.', en: 'Rest day after hard effort: high protein spread through the day for muscle repair, moderate carbs to refill stores, plus fish, colourful fruit and veg, and nuts. Plenty of water.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2077, protein: 150, carbs: 236, fat: 62 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 150 }, { id: 'bread_baladi', g: 100 }, { id: 'cheese_qarish', g: 100 }, { id: 'tomato', g: 150 }, { id: 'cucumber', g: 100 }],
        lunch: [{ id: 'fish_salmon', g: 180 }, { id: 'rice_brown', g: 250 }, { id: 'broccoli', g: 200 }],
        dinner: [{ id: 'yogurt_greek', g: 250 }, { id: 'oats', g: 30 }, { id: 'strawberry', g: 120 }, { id: 'walnuts', g: 20 }],
        snack: [{ id: 'orange', g: 200 }, { id: 'milk_low_fat', g: 250 }],
      },
      {
        breakfast: [{ id: 'oats', g: 80 }, { id: 'milk_low_fat', g: 300 }, { id: 'banana', g: 120 }, { id: 'chia_seeds', g: 10 }],
        lunch: [{ id: 'chicken_breast', g: 200 }, { id: 'sweet_potato', g: 300 }, { id: 'spinach', g: 150 }, { id: 'olive_oil', g: 10 }],
        dinner: [{ id: 'sardines_canned', g: 100 }, { id: 'bread_shami_brown', g: 80 }, { id: 'salata_baladi', g: 200 }],
        snack: [{ id: 'yogurt_greek', g: 200 }, { id: 'pomegranate', g: 150 }],
      },
      {
        breakfast: [{ id: 'foul_oil', g: 200 }, { id: 'egg_whole', g: 100 }, { id: 'bread_baladi', g: 90 }, { id: 'salata_baladi', g: 150 }],
        lunch: [{ id: 'fish_bouri', g: 220 }, { id: 'freekeh', g: 250 }, { id: 'molokhia', g: 200 }],
        dinner: [{ id: 'cheese_qarish', g: 150 }, { id: 'bread_toast_brown', g: 60 }, { id: 'cucumber', g: 150 }],
        snack: [{ id: 'kiwi', g: 150 }, { id: 'yogurt_greek', g: 200 }, { id: 'walnuts', g: 15 }],
      },
    ]
  },
  {
    id: 'strength_power_athlete',
    ar: 'رياضي قوة وانفجارية',
    en: 'Strength & power athlete',
    goal: 'performance',
    desc: { ar: 'لرفع الأثقال والقوة البدنية والعدو القصير والرمي، رياضي حوالي 85 كيلو: بروتين أكتر من 2 جم لكل كيلو، ونشويات كفاية للتمرين التقيل، ووجبة بروتين ونشويات بعد التمرين.', en: 'Weightlifting, powerlifting, sprints and throws; ~85 kg athlete: over 2 g/kg protein, enough carbs for heavy sessions, and a protein-plus-carb meal after training.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 3233, protein: 218, carbs: 381, fat: 94 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 200 }, { id: 'bread_baladi', g: 150 }, { id: 'cheese_qarish', g: 100 }, { id: 'tomato', g: 150 }],
        lunch: [{ id: 'beef_lean', g: 220 }, { id: 'rice_white', g: 400 }, { id: 'salata_baladi', g: 200 }],
        dinner: [{ id: 'chicken_breast', g: 200 }, { id: 'potato', g: 350 }, { id: 'green_beans', g: 200 }, { id: 'olive_oil', g: 10 }],
        snack: [{ id: 'yogurt_greek', g: 250 }, { id: 'oats', g: 50 }, { id: 'banana', g: 120 }],
      },
      {
        breakfast: [{ id: 'oats', g: 100 }, { id: 'milk_full', g: 350 }, { id: 'banana', g: 150 }, { id: 'peanut_butter', g: 25 }],
        lunch: [{ id: 'chicken_thigh', g: 250 }, { id: 'macaroni_red', g: 400 }, { id: 'salata_baladi', g: 200 }],
        dinner: [{ id: 'fish_tilapia', g: 250 }, { id: 'rice_white', g: 300 }, { id: 'zucchini', g: 200 }],
        snack: [{ id: 'whey', g: 30 }, { id: 'milk_low_fat', g: 300 }, { id: 'dates', g: 50 }],
      },
      {
        breakfast: [{ id: 'foul_oil', g: 250 }, { id: 'egg_whole', g: 150 }, { id: 'bread_baladi', g: 150 }, { id: 'salata_baladi', g: 100 }],
        lunch: [{ id: 'kofta', g: 220 }, { id: 'rice_koshari', g: 350 }, { id: 'salata_baladi', g: 200 }],
        dinner: [{ id: 'fish_tuna_can', g: 150 }, { id: 'pasta_cooked', g: 300 }, { id: 'tomato', g: 150 }, { id: 'olive_oil', g: 5 }],
        snack: [{ id: 'cheese_qarish', g: 200 }, { id: 'bread_toast_brown', g: 60 }, { id: 'honey', g: 20 }],
      },
    ]
  },
  {
    id: 'combat_camp_weight',
    ar: 'رياضات قتالية — معسكر وضبط وزن',
    en: 'Combat sports — camp weight management',
    goal: 'performance',
    desc: { ar: 'لمصارعة وجودو وملاكمة وكاراتيه، لاعب حوالي 70 كيلو: نزول تدريجي نص لكيلو في الأسبوع على مدار المعسكر، بروتين عالي ونشويات حوالين التمرين. ممنوع التجفيف والساونا والتجويع وحبوب المية قبل الميزان — لو الفرق كبير كلّم المدرب والدكتور.', en: 'Wrestling, judo, boxing, karate; ~70 kg athlete: gradual 0.5–1 kg per week across camp, high protein, carbs around training. No dehydration, sauna cuts, starving or water pills before weigh-in — if the gap is large, talk to the coach and doctor.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2193, protein: 179, carbs: 295, fat: 36 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 100 }, { id: 'egg_white', g: 100 }, { id: 'bread_baladi', g: 120 }, { id: 'cheese_qarish', g: 80 }, { id: 'cucumber', g: 150 }],
        lunch: [{ id: 'chicken_breast', g: 200 }, { id: 'rice_white', g: 300 }, { id: 'salata_baladi', g: 200 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'fish_tilapia', g: 200 }, { id: 'potato', g: 300 }, { id: 'green_beans', g: 200 }],
        snack: [{ id: 'yogurt_greek', g: 250 }, { id: 'banana', g: 120 }, { id: 'dates', g: 30 }],
      },
      {
        breakfast: [{ id: 'oats', g: 70 }, { id: 'milk_skim', g: 300 }, { id: 'banana', g: 100 }, { id: 'egg_white', g: 100 }],
        lunch: [{ id: 'veal', g: 200 }, { id: 'rice_brown', g: 300 }, { id: 'molokhia', g: 200 }],
        dinner: [{ id: 'fish_tuna_can', g: 120 }, { id: 'bread_shami_brown', g: 90 }, { id: 'salata_baladi', g: 200 }],
        snack: [{ id: 'cheese_qarish', g: 150 }, { id: 'apple', g: 180 }, { id: 'banana', g: 120 }],
      },
      {
        breakfast: [{ id: 'foul_plain', g: 200 }, { id: 'egg_whole', g: 60 }, { id: 'bread_baladi', g: 120 }, { id: 'salata_baladi', g: 150 }],
        lunch: [{ id: 'chicken_breast', g: 200 }, { id: 'sweet_potato', g: 350 }, { id: 'broccoli', g: 200 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'yogurt_greek', g: 250 }, { id: 'oats', g: 50 }, { id: 'strawberry', g: 100 }],
        snack: [{ id: 'lupini', g: 100 }, { id: 'orange', g: 200 }, { id: 'dates', g: 30 }],
      },
    ]
  },
  {
    id: 'young_athlete_13_17',
    ar: 'ناشئ رياضي (13–17 سنة)',
    en: 'Young athlete (13–17)',
    goal: 'performance',
    desc: { ar: 'للنمو والتمرين مع بعض: سعرات كفاية من غير رجيم، ألبان 3 مرات في اليوم للعضم، بروتين من الأكل العادي، ونشويات للطاقة. من غير أي مكملات ولا مشروبات طاقة. أي تخسيس للناشئ لازم يكون بمتابعة دكتور.', en: 'Growth plus training: enough energy with no dieting, dairy three times a day for bones, protein from normal food, carbs for energy. No supplements or energy drinks. Any weight loss for a young athlete needs a doctor involved.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2511, protein: 128, carbs: 317, fat: 84 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 100 }, { id: 'bread_baladi', g: 120 }, { id: 'cheese_white', g: 40 }, { id: 'milk_full', g: 250 }, { id: 'tomato', g: 100 }],
        lunch: [{ id: 'chicken_thigh', g: 150 }, { id: 'rice_white', g: 300 }, { id: 'molokhia', g: 200 }, { id: 'salata_baladi', g: 100 }],
        dinner: [{ id: 'foul_oil', g: 200 }, { id: 'bread_baladi', g: 90 }, { id: 'yogurt_plain', g: 170 }],
        snack: [{ id: 'banana', g: 120 }, { id: 'milk_low_fat', g: 250 }, { id: 'dates', g: 30 }],
      },
      {
        breakfast: [{ id: 'oats', g: 80 }, { id: 'milk_full', g: 300 }, { id: 'banana', g: 120 }, { id: 'peanut_butter', g: 15 }],
        lunch: [{ id: 'kofta', g: 150 }, { id: 'macaroni_red', g: 300 }, { id: 'salata_baladi', g: 150 }],
        dinner: [{ id: 'egg_whole', g: 100 }, { id: 'cheese_qarish', g: 100 }, { id: 'bread_baladi', g: 90 }, { id: 'cucumber', g: 100 }],
        snack: [{ id: 'yogurt_fruit', g: 200 }, { id: 'guava', g: 150 }, { id: 'almonds', g: 15 }],
      },
      {
        breakfast: [{ id: 'taameya', g: 100 }, { id: 'foul_oil', g: 150 }, { id: 'bread_baladi', g: 120 }, { id: 'salata_baladi', g: 100 }],
        lunch: [{ id: 'fish_bouri', g: 200 }, { id: 'rice_koshari', g: 280 }, { id: 'bamya_zeit', g: 200 }],
        dinner: [{ id: 'cheese_qarish', g: 120 }, { id: 'bread_baladi', g: 90 }, { id: 'tomato', g: 100 }, { id: 'milk_full', g: 250 }],
        snack: [{ id: 'mango', g: 200 }, { id: 'peanuts', g: 20 }],
      },
    ]
  },

  /* ================= عميل جيم عادي ================= */

  {
    id: 'gym_training_day',
    ar: 'يوم تمرين — جيم',
    en: 'Gym client — training day',
    goal: 'fitness',
    desc: { ar: 'ليوم فيه تمرين حديد، عميل حوالي 75 كيلو: نشويات أكتر حوالين التمرين وبروتين في كل وجبة. السناك قبل أو بعد التمرين حسب ميعاده. يتبدّل مع "يوم راحة — جيم".', en: 'For a lifting day, ~75 kg client: more carbs around training and protein at every meal. Take the snack before or after training. Alternate with "Gym client — rest day".' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2419, protein: 170, carbs: 284, fat: 68 },
    days: [
      {
        breakfast: [{ id: 'oats', g: 80 }, { id: 'milk_low_fat', g: 300 }, { id: 'banana', g: 120 }, { id: 'peanut_butter', g: 15 }],
        lunch: [{ id: 'chicken_breast', g: 200 }, { id: 'rice_white', g: 300 }, { id: 'salata_baladi', g: 200 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'egg_whole', g: 150 }, { id: 'cheese_qarish', g: 100 }, { id: 'bread_baladi', g: 90 }, { id: 'tomato', g: 150 }],
        snack: [{ id: 'yogurt_greek', g: 200 }, { id: 'dates', g: 40 }],
      },
      {
        breakfast: [{ id: 'foul_oil', g: 200 }, { id: 'egg_whole', g: 100 }, { id: 'bread_baladi', g: 120 }, { id: 'salata_baladi', g: 100 }],
        lunch: [{ id: 'beef_lean', g: 180 }, { id: 'macaroni_red', g: 300 }, { id: 'salata_baladi', g: 150 }],
        dinner: [{ id: 'fish_tilapia', g: 200 }, { id: 'potato', g: 250 }, { id: 'green_beans', g: 150 }],
        snack: [{ id: 'whey', g: 30 }, { id: 'banana', g: 120 }, { id: 'milk_low_fat', g: 250 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 100 }, { id: 'egg_white', g: 100 }, { id: 'bread_baladi', g: 120 }, { id: 'cheese_white_light', g: 50 }, { id: 'tomato', g: 100 }],
        lunch: [{ id: 'chicken_thigh', g: 180 }, { id: 'rice_koshari', g: 280 }, { id: 'molokhia', g: 200 }],
        dinner: [{ id: 'yogurt_greek', g: 250 }, { id: 'oats', g: 40 }, { id: 'strawberry', g: 100 }],
        snack: [{ id: 'rice_cakes', g: 30 }, { id: 'peanut_butter', g: 15 }, { id: 'banana', g: 120 }, { id: 'milk_low_fat', g: 250 }],
      },
    ]
  },
  {
    id: 'gym_rest_day',
    ar: 'يوم راحة — جيم',
    en: 'Gym client — rest day',
    goal: 'fitness',
    desc: { ar: 'نفس العميل في يوم مفيش فيه تمرين: البروتين زي ما هو عشان الاستشفاء، والنشويات أقل (رز وعيش أقل) وخضار أكتر. يتبدّل مع "يوم تمرين — جيم".', en: 'Same client on a non-training day: protein stays the same for recovery, carbs come down (less rice and bread) and vegetables go up. Alternate with "Gym client — training day".' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 1892, protein: 142, carbs: 189, fat: 65 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 150 }, { id: 'cheese_qarish', g: 100 }, { id: 'bread_baladi', g: 90 }, { id: 'tomato', g: 150 }, { id: 'cucumber', g: 100 }],
        lunch: [{ id: 'chicken_breast', g: 200 }, { id: 'rice_white', g: 200 }, { id: 'salata_baladi', g: 250 }, { id: 'olive_oil', g: 10 }],
        dinner: [{ id: 'yogurt_greek', g: 250 }, { id: 'walnuts', g: 20 }, { id: 'strawberry', g: 100 }],
        snack: [{ id: 'lupini', g: 100 }, { id: 'apple', g: 150 }],
      },
      {
        breakfast: [{ id: 'foul_oil', g: 200 }, { id: 'egg_whole', g: 100 }, { id: 'bread_baladi', g: 90 }, { id: 'salata_baladi', g: 150 }],
        lunch: [{ id: 'fish_salmon', g: 180 }, { id: 'potato', g: 250 }, { id: 'broccoli', g: 200 }],
        dinner: [{ id: 'cheese_qarish', g: 150 }, { id: 'cucumber', g: 150 }, { id: 'bread_toast_brown', g: 40 }, { id: 'olives', g: 30 }],
        snack: [{ id: 'yogurt_greek', g: 200 }, { id: 'almonds', g: 20 }],
      },
    ]
  },

  /* ================= حالات صحية شائعة — لازم مراجعة طبية ================= */

  {
    id: 'diabetes_t2_friendly',
    ar: 'مناسب للسكر من النوع التاني',
    en: 'Type 2 diabetes friendly',
    goal: 'fitness',
    medicalReview: true,
    desc: { ar: 'لازم دكتور العميل أو أخصائي التغذية العلاجية يراجعه الأول، خصوصاً مع الأنسولين أو الأقراص. نشويات بطيئة (عيش سن وبرغل وفريك وبقول وشوفان) متوزعة بالتساوي تقريباً على الوجبات، بروتين وخضار في كل وجبة، ومفيش عصاير ولا سكر مضاف.', en: 'Must be reviewed first by the client\'s doctor or a clinical dietitian, especially with insulin or tablets. Low-GI carbs (wholemeal bread, bulgur, freekeh, legumes, oats) spread fairly evenly across meals, protein and vegetables at each meal, no juice or added sugar.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 1454, protein: 124, carbs: 160, fat: 38 },
    days: [
      {
        breakfast: [{ id: 'foul_plain', g: 120 }, { id: 'bread_shami_brown', g: 50 }, { id: 'egg_whole', g: 60 }, { id: 'cucumber', g: 100 }, { id: 'tomato', g: 100 }],
        lunch: [{ id: 'chicken_breast', g: 150 }, { id: 'bulgur', g: 150 }, { id: 'green_beans', g: 200 }, { id: 'salata_baladi', g: 150 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'yogurt_greek', g: 200 }, { id: 'cheese_qarish', g: 80 }, { id: 'bread_toast_brown', g: 50 }, { id: 'cucumber', g: 150 }],
        snack: [{ id: 'apple', g: 150 }, { id: 'almonds', g: 15 }],
      },
      {
        breakfast: [{ id: 'oats', g: 50 }, { id: 'milk_skim', g: 250 }, { id: 'walnuts', g: 15 }],
        lunch: [{ id: 'fish_tilapia', g: 180 }, { id: 'lentils', g: 100 }, { id: 'rice_brown', g: 80 }, { id: 'salata_baladi', g: 150 }],
        dinner: [{ id: 'egg_whole', g: 100 }, { id: 'bread_shami_brown', g: 60 }, { id: 'tomato', g: 150 }, { id: 'cheese_white_light', g: 30 }],
        snack: [{ id: 'yogurt_greek', g: 170 }, { id: 'guava', g: 150 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 100 }, { id: 'cheese_qarish', g: 80 }, { id: 'bread_brown', g: 80 }, { id: 'tomato', g: 100 }, { id: 'cucumber', g: 100 }],
        lunch: [{ id: 'veal', g: 150 }, { id: 'freekeh', g: 130 }, { id: 'molokhia', g: 200 }],
        dinner: [{ id: 'yogurt_greek', g: 200 }, { id: 'oats', g: 40 }, { id: 'strawberry', g: 100 }],
        snack: [{ id: 'orange', g: 150 }, { id: 'pumpkin_seeds', g: 15 }],
      },
    ]
  },
  {
    id: 'dash_lower_sodium',
    ar: 'ضغط عالي — ملح أقل (DASH)',
    en: 'Hypertension — DASH-style, lower sodium',
    goal: 'fitness',
    medicalReview: true,
    desc: { ar: 'لازم الدكتور أو أخصائي التغذية العلاجية يراجعه الأول، خصوصاً مع أدوية الضغط أو الكلى. أسلوب DASH: خضار وفاكهة كتير، ألبان قليلة الدسم، بقول ومكسرات غير مملحة وحبوب كاملة. الطبخ بملح قليل، ومن غير مخلل ولا جبنة قديمة ولا فسيخ ولا لانشون ولا شوربة مكعبات.', en: 'Must be reviewed first by a doctor or clinical dietitian, especially with blood-pressure or kidney medication. DASH style: lots of vegetables and fruit, low-fat dairy, legumes, unsalted nuts and whole grains. Cook with little salt; no pickles, aged cheese, feseekh, luncheon or stock cubes.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 1871, protein: 126, carbs: 239, fat: 51 },
    days: [
      {
        breakfast: [{ id: 'oats', g: 60 }, { id: 'milk_low_fat', g: 300 }, { id: 'banana', g: 120 }, { id: 'walnuts', g: 15 }],
        lunch: [{ id: 'chicken_breast', g: 170 }, { id: 'rice_brown', g: 250 }, { id: 'green_beans', g: 200 }, { id: 'salata_baladi', g: 200 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'yogurt_low_fat', g: 250 }, { id: 'cheese_qarish', g: 80 }, { id: 'bread_shami_brown', g: 70 }, { id: 'cucumber', g: 150 }, { id: 'tomato', g: 150 }],
        snack: [{ id: 'orange', g: 200 }, { id: 'almonds', g: 20 }],
      },
      {
        breakfast: [{ id: 'foul_plain', g: 200 }, { id: 'egg_whole', g: 60 }, { id: 'bread_shami_brown', g: 70 }, { id: 'tomato', g: 150 }, { id: 'cucumber', g: 100 }, { id: 'olive_oil', g: 5 }],
        lunch: [{ id: 'fish_tilapia', g: 200 }, { id: 'sweet_potato', g: 250 }, { id: 'spinach', g: 200 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'yogurt_low_fat', g: 250 }, { id: 'bread_toast_brown', g: 40 }, { id: 'banana', g: 120 }],
        snack: [{ id: 'guava', g: 200 }, { id: 'milk_low_fat', g: 200 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 100 }, { id: 'bread_brown', g: 70 }, { id: 'avocado', g: 60 }, { id: 'tomato', g: 150 }],
        lunch: [{ id: 'veal', g: 150 }, { id: 'freekeh', g: 250 }, { id: 'bamya_zeit', g: 200 }],
        dinner: [{ id: 'cheese_qarish', g: 150 }, { id: 'bread_shami_brown', g: 60 }, { id: 'pepper_colored', g: 150 }, { id: 'cucumber', g: 150 }],
        snack: [{ id: 'apple', g: 180 }, { id: 'yogurt_low_fat', g: 200 }, { id: 'walnuts', g: 15 }],
      },
    ]
  },
  {
    id: 'fatty_liver_weight_loss',
    ar: 'دهون على الكبد — تخسيس',
    en: 'Fatty liver (MAFLD) — weight loss',
    goal: 'lose_weight',
    medicalReview: true,
    desc: { ar: 'لازم دكتور الكبد أو أخصائي التغذية العلاجية يراجعه الأول. نزول وزن تدريجي (7–10% من الوزن على شهور) بأكل على الطريقة المتوسطية: سمك وزيت زيتون بكمية محسوبة وخضار وحبوب كاملة. من غير عصاير ولا مياه غازية ولا حلويات ولا مقليات.', en: 'Must be reviewed first by the liver doctor or a clinical dietitian. Gradual weight loss (7–10% of body weight over months) with Mediterranean-style food: fish, measured olive oil, vegetables and whole grains. No juice, soft drinks, sweets or fried food.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 1403, protein: 111, carbs: 165, fat: 37 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 100 }, { id: 'cheese_qarish', g: 60 }, { id: 'bread_shami_brown', g: 60 }, { id: 'tomato', g: 150 }, { id: 'cucumber', g: 150 }],
        lunch: [{ id: 'fish_tilapia', g: 200 }, { id: 'rice_brown', g: 150 }, { id: 'salata_baladi', g: 250 }, { id: 'olive_oil', g: 10 }],
        dinner: [{ id: 'yogurt_greek', g: 200 }, { id: 'oats', g: 30 }, { id: 'strawberry', g: 120 }],
        snack: [{ id: 'apple', g: 150 }, { id: 'walnuts', g: 15 }],
      },
      {
        breakfast: [{ id: 'foul_plain', g: 200 }, { id: 'olive_oil', g: 5 }, { id: 'bread_shami_brown', g: 50 }, { id: 'salata_baladi', g: 150 }],
        lunch: [{ id: 'chicken_breast', g: 170 }, { id: 'bulgur', g: 180 }, { id: 'zucchini', g: 200 }],
        dinner: [{ id: 'fish_tuna_can', g: 100 }, { id: 'salata_baladi', g: 200 }, { id: 'bread_toast_brown', g: 40 }],
        snack: [{ id: 'yogurt_greek', g: 170 }, { id: 'guava', g: 150 }],
      },
      {
        breakfast: [{ id: 'oats', g: 40 }, { id: 'milk_skim', g: 250 }, { id: 'chia_seeds', g: 10 }, { id: 'apple', g: 100 }],
        lunch: [{ id: 'fish_salmon', g: 150 }, { id: 'sweet_potato', g: 200 }, { id: 'green_beans', g: 200 }],
        dinner: [{ id: 'cheese_qarish', g: 150 }, { id: 'cucumber', g: 150 }, { id: 'tomato', g: 100 }, { id: 'bread_shami_brown', g: 40 }],
        snack: [{ id: 'orange', g: 180 }, { id: 'almonds', g: 15 }],
      },
    ]
  },
  {
    id: 'pcos_friendly',
    ar: 'تكيس المبايض (PCOS)',
    en: 'PCOS friendly',
    goal: 'fitness',
    medicalReview: true,
    desc: { ar: 'لازم الدكتورة أو أخصائي التغذية العلاجية يراجعوه الأول، خصوصاً مع أدوية زي الميتفورمين. نشويات بطيئة بكمية معتدلة متوزعة على اليوم، بروتين في كل وجبة يطوّل الشبع، ودهون صحية من المكسرات والأفوكادو والسمك. مفيد مع تمرين مقاومة منتظم.', en: 'Must be reviewed first by her doctor or a clinical dietitian, especially with medication such as metformin. Moderate low-GI carbs spread through the day, protein at every meal for fullness, healthy fats from nuts, avocado and fish. Works best with regular resistance training.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 1462, protein: 117, carbs: 146, fat: 48 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 100 }, { id: 'cheese_qarish', g: 60 }, { id: 'bread_brown', g: 50 }, { id: 'avocado', g: 50 }, { id: 'tomato', g: 100 }],
        lunch: [{ id: 'chicken_breast', g: 160 }, { id: 'bulgur', g: 180 }, { id: 'salata_baladi', g: 200 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'yogurt_greek', g: 200 }, { id: 'chia_seeds', g: 10 }, { id: 'strawberry', g: 100 }, { id: 'walnuts', g: 10 }],
        snack: [{ id: 'lupini', g: 80 }, { id: 'apple', g: 130 }],
      },
      {
        breakfast: [{ id: 'foul_plain', g: 150 }, { id: 'egg_whole', g: 60 }, { id: 'bread_shami_brown', g: 50 }, { id: 'cucumber', g: 150 }, { id: 'olive_oil', g: 5 }],
        lunch: [{ id: 'fish_salmon', g: 150 }, { id: 'quinoa', g: 150 }, { id: 'broccoli', g: 200 }],
        dinner: [{ id: 'cheese_qarish', g: 150 }, { id: 'bread_toast_brown', g: 30 }, { id: 'tomato', g: 100 }, { id: 'cucumber', g: 100 }],
        snack: [{ id: 'yogurt_greek', g: 170 }, { id: 'guava', g: 120 }],
      },
      {
        breakfast: [{ id: 'oats', g: 40 }, { id: 'milk_skim', g: 250 }, { id: 'walnuts', g: 15 }, { id: 'strawberry', g: 100 }],
        lunch: [{ id: 'veal', g: 150 }, { id: 'freekeh', g: 150 }, { id: 'molokhia', g: 200 }],
        dinner: [{ id: 'shakshouka', g: 250 }, { id: 'bread_shami_brown', g: 40 }, { id: 'cucumber', g: 100 }],
        snack: [{ id: 'yogurt_greek', g: 170 }, { id: 'orange', g: 150 }],
      },
    ]
  },
  {
    id: 'pregnancy_2nd_3rd_trimester',
    ar: 'حمل — التلت التاني والتالت',
    en: 'Pregnancy — 2nd & 3rd trimester',
    goal: 'fitness',
    medicalReview: true,
    desc: { ar: 'لازم دكتورة النسا أو أخصائي التغذية العلاجية يراجعوه الأول — هما اللي يحددوا السعرات والمكملات. أكل مطبوخ كويس: بيض مستوي خالص، لحمة وفراخ مستوية، ألبان مبسترة بس (من غير جبنة فلاحي خام ولا مش)، وسمك قليل الزئبق. من غير فسيخ ولا رنجة ولا كبدة ولا تونة كتير، وكافيين قليل. اغسلي الخضار كويس.', en: 'Must be reviewed first by her doctor (obstetrician) or a clinical dietitian, who set calories and supplements. Well-cooked food: fully set eggs, well-done meat and chicken, pasteurised dairy only (no raw village cheese or mish), low-mercury fish. No feseekh, smoked herring or liver, limited tuna, little caffeine. Wash vegetables well.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2126, protein: 120, carbs: 260, fat: 70 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 100 }, { id: 'foul_oil', g: 150 }, { id: 'bread_baladi', g: 90 }, { id: 'tomato', g: 100 }, { id: 'cucumber', g: 100 }],
        lunch: [{ id: 'beef_lean', g: 130 }, { id: 'rice_white', g: 250 }, { id: 'molokhia', g: 200 }, { id: 'salata_baladi', g: 150 }],
        dinner: [{ id: 'yogurt_plain', g: 200 }, { id: 'cheese_qarish', g: 80 }, { id: 'bread_shami_brown', g: 60 }, { id: 'cucumber', g: 100 }],
        snack: [{ id: 'milk_full', g: 250 }, { id: 'dates', g: 40 }, { id: 'orange', g: 150 }],
      },
      {
        breakfast: [{ id: 'oats', g: 70 }, { id: 'milk_full', g: 300 }, { id: 'banana', g: 120 }, { id: 'walnuts', g: 15 }],
        lunch: [{ id: 'fish_salmon', g: 150 }, { id: 'rice_white', g: 200 }, { id: 'broccoli', g: 150 }, { id: 'salata_baladi', g: 150 }],
        dinner: [{ id: 'lentil_soup', g: 300 }, { id: 'bread_baladi', g: 60 }, { id: 'yogurt_plain', g: 150 }],
        snack: [{ id: 'guava', g: 180 }, { id: 'almonds', g: 20 }, { id: 'yogurt_greek', g: 150 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 100 }, { id: 'cheese_qarish', g: 100 }, { id: 'bread_baladi', g: 90 }, { id: 'tomato', g: 100 }],
        lunch: [{ id: 'chicken_thigh', g: 170 }, { id: 'rice_koshari', g: 220 }, { id: 'taro_leaves', g: 200 }],
        dinner: [{ id: 'sardines_canned', g: 90 }, { id: 'bread_shami_brown', g: 70 }, { id: 'salata_baladi', g: 150 }],
        snack: [{ id: 'milk_full', g: 250 }, { id: 'banana', g: 120 }, { id: 'dried_apricot', g: 30 }],
      },
    ]
  },
  {
    id: 'older_adult_protein',
    ar: 'كبار السن — بروتين أعلى',
    en: 'Older adult — protein focused',
    goal: 'fitness',
    medicalReview: true,
    desc: { ar: 'لازم الدكتور أو أخصائي التغذية العلاجية يراجعه الأول، خصوصاً مع أمراض الكلى أو أدوية كتير. بروتين 25–30 جم تقريباً في كل وجبة رئيسية عشان العضل ما يضعفش مع السن، أكل طري وسهل المضغ، ألبان للكالسيوم، وشوربة وسوائل كفاية. أحسن مع تمرين مقاومة خفيف.', en: 'Must be reviewed first by a doctor or clinical dietitian, especially with kidney disease or many medications. About 25–30 g protein per main meal to slow age-related muscle loss, soft easy-to-chew food, dairy for calcium, soups and enough fluids. Best combined with light resistance training.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 1630, protein: 116, carbs: 194, fat: 44 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 100 }, { id: 'cheese_qarish', g: 100 }, { id: 'bread_toast_brown', g: 50 }, { id: 'tomato', g: 100 }],
        lunch: [{ id: 'fish_tilapia', g: 150 }, { id: 'rice_white', g: 220 }, { id: 'zucchini', g: 150 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'yogurt_greek', g: 200 }, { id: 'oats', g: 40 }, { id: 'banana', g: 100 }],
        snack: [{ id: 'milk_low_fat', g: 250 }, { id: 'mango', g: 120 }],
      },
      {
        breakfast: [{ id: 'foul_plain', g: 200 }, { id: 'egg_whole', g: 60 }, { id: 'bread_baladi', g: 60 }, { id: 'tomato', g: 100 }],
        lunch: [{ id: 'chicken_breast', g: 130 }, { id: 'mesa2aa_batates', g: 250 }, { id: 'shorbet_firakh', g: 250 }],
        dinner: [{ id: 'cheese_qarish', g: 200 }, { id: 'bread_toast_brown', g: 60 }, { id: 'cucumber', g: 100 }],
        snack: [{ id: 'yogurt_greek', g: 170 }, { id: 'banana', g: 100 }],
      },
      {
        breakfast: [{ id: 'oats_milk', g: 300 }, { id: 'cheese_qarish', g: 120 }],
        lunch: [{ id: 'kofta_dawood_basha', g: 200 }, { id: 'rice_white', g: 180 }, { id: 'molokhia', g: 200 }],
        dinner: [{ id: 'lentil_soup', g: 300 }, { id: 'yogurt_greek', g: 150 }, { id: 'bread_baladi', g: 40 }],
        snack: [{ id: 'milk_low_fat', g: 250 }, { id: 'pear', g: 120 }],
      },
    ]
  },
  {
    id: 'vegetarian_lacto_ovo_protein',
    ar: 'نباتي — ألبان وبيض وبقول',
    en: 'Vegetarian — dairy, eggs & legumes',
    goal: 'fitness',
    medicalReview: true,
    desc: { ar: 'لازم أخصائي التغذية أو الدكتور يراجعه الأول، خصوصاً للحديد وفيتامين B12. نباتي بالبيض والألبان وبروتين أعلى للي بيتمرن: عدس وحمص وفول وترمس وفاصوليا مع زبادي يوناني وجبنة قريش في كل يوم. البقول مع حاجة فيها فيتامين C (سلطة، برتقان) عشان الحديد يتمتص أحسن.', en: 'Must be reviewed first by a dietitian or doctor, especially for iron and vitamin B12. Lacto-ovo vegetarian with higher protein for active clients: lentils, chickpeas, foul, lupini and beans plus Greek yogurt and qarish cheese daily. Pair legumes with vitamin C (salad, orange) for better iron absorption.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2091, protein: 128, carbs: 276, fat: 57 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 150 }, { id: 'cheese_qarish', g: 100 }, { id: 'bread_brown', g: 70 }, { id: 'tomato', g: 150 }],
        lunch: [{ id: 'lentils', g: 300 }, { id: 'rice_white', g: 200 }, { id: 'salata_baladi', g: 150 }, { id: 'yogurt_greek', g: 150 }],
        dinner: [{ id: 'foul_plain', g: 200 }, { id: 'tahina', g: 15 }, { id: 'bread_baladi', g: 60 }, { id: 'salata_baladi', g: 100 }],
        snack: [{ id: 'yogurt_greek', g: 200 }, { id: 'walnuts', g: 20 }, { id: 'banana', g: 100 }],
      },
      {
        breakfast: [{ id: 'oats', g: 70 }, { id: 'milk_low_fat', g: 300 }, { id: 'peanut_butter', g: 20 }, { id: 'banana', g: 100 }],
        lunch: [{ id: 'chickpeas', g: 250 }, { id: 'bulgur', g: 200 }, { id: 'salata_tahina', g: 60 }, { id: 'yogurt_greek', g: 150 }],
        dinner: [{ id: 'egg_whole', g: 100 }, { id: 'cheese_white_light', g: 60 }, { id: 'bread_shami_brown', g: 70 }, { id: 'cucumber', g: 150 }],
        snack: [{ id: 'lupini', g: 150 }, { id: 'orange', g: 150 }],
      },
      {
        breakfast: [{ id: 'foul_oil', g: 200 }, { id: 'egg_whole', g: 100 }, { id: 'bread_baladi', g: 90 }, { id: 'salata_baladi', g: 100 }],
        lunch: [{ id: 'fasolia_beida_salsa', g: 300 }, { id: 'rice_white', g: 200 }, { id: 'salata_zabadi', g: 150 }],
        dinner: [{ id: 'cottage_cheese', g: 200 }, { id: 'bread_toast_brown', g: 50 }, { id: 'tomato', g: 150 }],
        snack: [{ id: 'yogurt_greek', g: 200 }, { id: 'dates', g: 30 }, { id: 'almonds', g: 20 }],
      },
    ]
  },
];
