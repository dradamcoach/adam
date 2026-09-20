/*
 * ADAM — مكتبة برامج التغذية
 *
 * كل برنامج عبارة عن أنماط أيام بتتوزّع على الأسبوع. الأصناف كلها
 * من مكتبة الأغذية (food-library.js) بمعرّفاتها، والجرامات مكتوبة
 * هنا — فالقيم الغذائية بتتحسب من المكتبة نفسها وقت التطبيق، مش
 * أرقام متكتوبة بالإيد ممكن تتعارض معاها.
 *
 * ⚠️ دي نقطة بداية مش وصفة نهائية: المدرب بيطبّقها وبعدين يعدّل
 * الكميات حسب وزن العميل وهدفه — الأهداف اللي جنب كل برنامج
 * محسوبة من نفس الأكل اللي جواه، يعني هي فعلاً اللي البرنامج بيديه.
 */

export const NUTRITION_PROGRAMS = [
  {
    id: 'cut_light',
    ar: 'تخسيس هادي',
    en: 'Gentle cut',
    goal: 'lose_weight',
    desc: { ar: 'نزول تدريجي مع بروتين عالي عشان العضل ما يروحش. أكل مصري عادي، مفيش حاجة غريبة.', en: 'Gradual loss with high protein so muscle is protected. Everyday Egyptian food.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 1721, protein: 134, carbs: 210, fat: 39 },
    days: [
      {
        breakfast: [{ id: 'foul_plain', g: 300 }, { id: 'bread_baladi', g: 90 }, { id: 'salata_baladi', g: 225 }],
        lunch: [{ id: 'chicken_breast', g: 225 }, { id: 'rice_white', g: 225 }, { id: 'salata_baladi', g: 225 }],
        dinner: [{ id: 'yogurt_greek', g: 300 }, { id: 'cucumber', g: 225 }],
        snack: [{ id: 'apple', g: 225 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 150 }, { id: 'bread_brown', g: 90 }, { id: 'tomato', g: 150 }],
        lunch: [{ id: 'fish_tilapia', g: 270 }, { id: 'potato', g: 225 }, { id: 'green_beans', g: 225 }],
        dinner: [{ id: 'cheese_qarish', g: 180 }, { id: 'bread_baladi', g: 45 }, { id: 'tomato', g: 150 }],
        snack: [{ id: 'orange', g: 225 }],
      },
      {
        breakfast: [{ id: 'oats', g: 75 }, { id: 'milk_skim', g: 300 }, { id: 'banana', g: 150 }],
        lunch: [{ id: 'beef_lean', g: 210 }, { id: 'rice_white', g: 225 }, { id: 'molokhia', g: 225 }],
        dinner: [{ id: 'egg_whole', g: 150 }, { id: 'salata_baladi', g: 225 }],
        snack: [{ id: 'guava', g: 225 }],
      },
    ]
  },
  {
    id: 'cut_strict',
    ar: 'تخسيس أسرع',
    en: 'Faster cut',
    goal: 'lose_weight',
    desc: { ar: 'سعرات أقل وبروتين أعلى. مناسب لفترة قصيرة تحت متابعة، مش أسلوب حياة.', en: 'Fewer calories, more protein. For a short supervised phase, not a lifestyle.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 1497, protein: 190, carbs: 119, fat: 30 },
    days: [
      {
        breakfast: [{ id: 'egg_white', g: 325 }, { id: 'egg_whole', g: 80 }, { id: 'bread_brown', g: 50 }],
        lunch: [{ id: 'chicken_breast', g: 290 }, { id: 'salata_baladi', g: 325 }, { id: 'rice_brown', g: 160 }],
        dinner: [{ id: 'fish_tilapia', g: 245 }, { id: 'broccoli', g: 245 }],
        snack: [{ id: 'yogurt_plain', g: 245 }],
      },
      {
        breakfast: [{ id: 'cheese_qarish', g: 245 }, { id: 'tomato', g: 245 }, { id: 'bread_baladi', g: 50 }],
        lunch: [{ id: 'shrimp', g: 290 }, { id: 'quinoa', g: 195 }, { id: 'zucchini', g: 245 }],
        dinner: [{ id: 'yogurt_greek', g: 325 }, { id: 'strawberry', g: 160 }],
        snack: [{ id: 'cucumber', g: 245 }],
      },
    ]
  },
  {
    id: 'maintain',
    ar: 'تثبيت',
    en: 'Maintenance',
    goal: 'fitness',
    desc: { ar: 'توازن يحافظ على وزنك ويديك طاقة للتمرين. ده اللي بنرجعله بعد أي دايت.', en: 'Balanced: holds your weight and fuels training. Where you land after any diet.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2187, protein: 123, carbs: 245, fat: 83 },
    days: [
      {
        breakfast: [{ id: 'foul_oil', g: 255 }, { id: 'bread_baladi', g: 115 }, { id: 'egg_whole', g: 65 }],
        lunch: [{ id: 'chicken_thigh', g: 230 }, { id: 'rice_white', g: 255 }, { id: 'salata_baladi', g: 190 }],
        dinner: [{ id: 'yogurt_greek', g: 255 }, { id: 'dates', g: 50 }, { id: 'almonds', g: 25 }],
        snack: [{ id: 'banana', g: 155 }],
      },
      {
        breakfast: [{ id: 'oats', g: 75 }, { id: 'milk_full', g: 320 }, { id: 'peanut_butter', g: 25 }],
        lunch: [{ id: 'kofta', g: 230 }, { id: 'macaroni_red', g: 255 }, { id: 'salata_baladi', g: 190 }],
        dinner: [{ id: 'cheese_white', g: 100 }, { id: 'bread_baladi', g: 75 }, { id: 'cucumber', g: 130 }],
        snack: [{ id: 'mango', g: 190 }],
      },
      {
        breakfast: [{ id: 'taameya', g: 155 }, { id: 'bread_baladi', g: 115 }, { id: 'salata_tahina', g: 75 }],
        lunch: [{ id: 'fish_bouri', g: 255 }, { id: 'roz_meammar', g: 190 }, { id: 'okra', g: 190 }],
        dinner: [{ id: 'milk_full', g: 320 }, { id: 'figs', g: 100 }],
        snack: [{ id: 'apple', g: 190 }],
      },
    ]
  },
  {
    id: 'bulk',
    ar: 'تضخيم',
    en: 'Bulk',
    goal: 'muscle_gain',
    desc: { ar: 'زيادة محسوبة عشان العضل يكبر من غير دهون كتير. أكل كتير بس مش عشوائي.', en: 'A measured surplus so muscle grows without much fat. More food, still structured.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 3001, protein: 201, carbs: 284, fat: 120 },
    days: [
      {
        breakfast: [{ id: 'oats', g: 95 }, { id: 'milk_full', g: 310 }, { id: 'banana', g: 125 }, { id: 'peanut_butter', g: 30 }],
        lunch: [{ id: 'chicken_breast', g: 260 }, { id: 'rice_white', g: 310 }, { id: 'olive_oil', g: 10 }, { id: 'salata_baladi', g: 155 }],
        dinner: [{ id: 'beef_lean', g: 205 }, { id: 'potato', g: 260 }, { id: 'green_beans', g: 155 }],
        snack: [{ id: 'yogurt_greek', g: 260 }, { id: 'dates', g: 60 }, { id: 'walnuts', g: 30 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 205 }, { id: 'bread_baladi', g: 125 }, { id: 'cheese_white', g: 60 }],
        lunch: [{ id: 'kofta', g: 260 }, { id: 'roz_meammar', g: 310 }, { id: 'salata_baladi', g: 155 }],
        dinner: [{ id: 'fish_salmon', g: 205 }, { id: 'sweet_potato', g: 260 }, { id: 'broccoli', g: 155 }],
        snack: [{ id: 'milk_full', g: 310 }, { id: 'almonds', g: 30 }, { id: 'honey', g: 20 }],
      },
      {
        breakfast: [{ id: 'fattah', g: 310 }, { id: 'milk_full', g: 260 }],
        lunch: [{ id: 'chicken_thigh', g: 260 }, { id: 'macaroni_red', g: 310 }, { id: 'salata_baladi', g: 155 }],
        dinner: [{ id: 'fish_tuna_can', g: 155 }, { id: 'bread_brown', g: 95 }, { id: 'avocado', g: 80 }],
        snack: [{ id: 'whey', g: 30 }, { id: 'banana', g: 125 }, { id: 'oats', g: 40 }],
      },
    ]
  },
  {
    id: 'fasting_2meals',
    ar: 'صيام متقطع — وجبتين',
    en: 'Intermittent fasting — 2 meals',
    goal: 'lose_weight',
    desc: { ar: 'نافذة أكل ضيقة: وجبتين كبار بدل تلاتة. البروتين موزّع عليهم الاتنين.', en: 'A tight eating window: two bigger meals instead of three, protein split across both.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 1780, protein: 167, carbs: 148, fat: 55 },
    days: [
      {
        breakfast: [],
        lunch: [{ id: 'chicken_breast', g: 290 }, { id: 'rice_white', g: 260 }, { id: 'salata_baladi', g: 260 }, { id: 'olive_oil', g: 10 }],
        dinner: [{ id: 'fish_tilapia', g: 260 }, { id: 'potato', g: 260 }, { id: 'yogurt_greek', g: 260 }],
        snack: [],
      },
      {
        breakfast: [],
        lunch: [{ id: 'beef_lean', g: 260 }, { id: 'macaroni_red', g: 330 }, { id: 'salata_baladi', g: 260 }],
        dinner: [{ id: 'egg_whole', g: 195 }, { id: 'cheese_qarish', g: 155 }, { id: 'bread_baladi', g: 80 }, { id: 'tomato', g: 195 }],
        snack: [],
      },
    ]
  },
  {
    id: 'vegetarian',
    ar: 'نباتي',
    en: 'Vegetarian',
    goal: 'fitness',
    desc: { ar: 'بروتين من البقول والألبان والبيض. للي مش بياكل لحوم، والبروتين فيه مظبوط مش ناقص.', en: 'Protein from legumes, dairy and eggs. For non-meat eaters, with the protein actually covered.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2007, protein: 116, carbs: 274, fat: 55 },
    days: [
      {
        breakfast: [{ id: 'foul_plain', g: 300 }, { id: 'bread_baladi', g: 110 }, { id: 'tahina', g: 25 }],
        lunch: [{ id: 'lentils', g: 360 }, { id: 'rice_white', g: 240 }, { id: 'salata_baladi', g: 180 }],
        dinner: [{ id: 'yogurt_greek', g: 300 }, { id: 'walnuts', g: 30 }],
        snack: [{ id: 'banana', g: 145 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 180 }, { id: 'cheese_qarish', g: 120 }, { id: 'bread_brown', g: 70 }],
        lunch: [{ id: 'chickpeas', g: 300 }, { id: 'bulgur', g: 240 }, { id: 'salata_tahina', g: 70 }],
        dinner: [{ id: 'cottage_cheese', g: 240 }, { id: 'cucumber', g: 180 }],
        snack: [{ id: 'dates', g: 60 }, { id: 'almonds', g: 30 }],
      },
    ]
  },
  {
    id: 'ramadan',
    ar: 'رمضان — فطار وسحور',
    en: 'Ramadan — iftar and suhoor',
    goal: 'fitness',
    desc: { ar: 'الفطار خفيف الأول وبعدين الأساسي، والسحور بطيء الهضم عشان تقضي النهار. الترتيب مقصود.', en: 'A light opener then the main iftar, and a slow-digesting suhoor to carry the day.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2228, protein: 126, carbs: 249, fat: 83 },
    days: [
      {
        breakfast: [{ id: 'dates', g: 50 }, { id: 'water', g: 300 }, { id: 'shorbet_firakh', g: 300 }],
        lunch: [{ id: 'chicken_thigh', g: 240 }, { id: 'rice_white', g: 300 }, { id: 'salata_baladi', g: 180 }],
        dinner: [{ id: 'oats', g: 70 }, { id: 'milk_full', g: 300 }, { id: 'peanut_butter', g: 25 }],
        snack: [{ id: 'yogurt_plain', g: 240 }],
      },
      {
        breakfast: [{ id: 'dates', g: 50 }, { id: 'lentil_soup', g: 300 }],
        lunch: [{ id: 'kofta', g: 240 }, { id: 'roz_meammar', g: 300 }, { id: 'molokhia', g: 180 }],
        dinner: [{ id: 'foul_plain', g: 300 }, { id: 'bread_baladi', g: 70 }, { id: 'cheese_qarish', g: 95 }],
        snack: [{ id: 'milk_full', g: 300 }],
      },
    ]
  },
  {
    id: 'athlete',
    ar: 'رياضي — بروتين عالي',
    en: 'Athlete — high protein',
    goal: 'performance',
    desc: { ar: 'كربوهيدرات حوالين التمرين وبروتين عالي طول اليوم. للي بيتمرن أربع أيام فأكتر.', en: 'Carbs around training and high protein all day. For four-plus sessions a week.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2566, protein: 205, carbs: 266, fat: 74 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 185 }, { id: 'oats', g: 85 }, { id: 'milk_skim', g: 305 }],
        lunch: [{ id: 'chicken_breast', g: 270 }, { id: 'rice_white', g: 305 }, { id: 'salata_baladi', g: 185 }, { id: 'olive_oil', g: 10 }],
        dinner: [{ id: 'fish_salmon', g: 220 }, { id: 'sweet_potato', g: 245 }, { id: 'spinach', g: 185 }],
        snack: [{ id: 'whey', g: 30 }, { id: 'banana', g: 145 }],
      },
      {
        breakfast: [{ id: 'foul_plain', g: 245 }, { id: 'egg_whole', g: 120 }, { id: 'bread_brown', g: 110 }],
        lunch: [{ id: 'beef_lean', g: 245 }, { id: 'pasta_cooked', g: 305 }, { id: 'green_beans', g: 185 }],
        dinner: [{ id: 'yogurt_greek', g: 305 }, { id: 'chia_seeds', g: 15 }, { id: 'strawberry', g: 120 }],
        snack: [{ id: 'cottage_cheese', g: 185 }, { id: 'dates', g: 50 }],
      },
    ]
  },
  {
    id: 'budget',
    ar: 'ميزانية محدودة',
    en: 'On a budget',
    goal: 'fitness',
    desc: { ar: 'بروتين رخيص: فول وبيض وعدس وفراخ. نفس الشغل العلمي بأقل تكلفة ممكنة.', en: 'Cheap protein: beans, eggs, lentils, chicken. Same science, lowest cost.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2002, protein: 121, carbs: 279, fat: 45 },
    days: [
      {
        breakfast: [{ id: 'foul_plain', g: 285 }, { id: 'bread_baladi', g: 105 }, { id: 'tomato', g: 115 }],
        lunch: [{ id: 'lentils', g: 340 }, { id: 'rice_white', g: 230 }, { id: 'salata_baladi', g: 170 }],
        dinner: [{ id: 'egg_whole', g: 170 }, { id: 'cheese_qarish', g: 115 }, { id: 'bread_baladi', g: 70 }],
        snack: [{ id: 'banana', g: 135 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 170 }, { id: 'bread_baladi', g: 105 }],
        lunch: [{ id: 'chicken_whole', g: 230 }, { id: 'rice_white', g: 230 }, { id: 'molokhia', g: 170 }],
        dinner: [{ id: 'foul_plain', g: 285 }, { id: 'salata_baladi', g: 170 }],
        snack: [{ id: 'dates', g: 55 }],
      },
    ]
  },
];