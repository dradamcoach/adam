/*
 * ADAM — برامج تغذية إضافية
 *
 * نفس شكل NUTRITION_PROGRAMS: كل برنامج 7 أيام (فطار/غدا/عشا/سناك)، والأصناف
 * بمعرّفاتها من FOOD_LIBRARY أو FOOD_LIBRARY_EXTRA. الأهداف (targets) محسوبة
 * من نفس الأكل اللي جوه كل برنامج — متوسط الأيام السبعة.
 *
 * دي نقطة بداية للمدرب يعدّل عليها حسب وزن العميل وهدفه، مش وصفة طبية.
 */

export const NUTRITION_PROGRAMS_EXTRA = [
  {
    id: 'ramadan_iftar_suhoor',
    ar: 'رمضان — إفطار وسحور (أسبوع كامل)',
    en: 'Ramadan — iftar & suhoor (full week)',
    goal: 'fitness',
    desc: { ar: 'في البرنامج ده: الفطار = فتح الصيام (بلح ومية وشوربة)، الغدا = الإفطار الأساسي، العشا = السحور، والسناك = ما بين الإفطار والسحور. السحور بطيء الهضم عشان تقضي النهار، والحلو بكمية محسوبة.', en: 'Meal keys here mean: breakfast = breaking the fast (dates, water, soup), lunch = main iftar, dinner = suhoor, snack = between iftar and suhoor. Slow-digesting suhoor, sweets in measured portions.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2250, protein: 119, carbs: 293, fat: 70 },
    days: [
      {
        breakfast: [{ id: 'dates', g: 45 }, { id: 'water', g: 300 }, { id: 'lentil_soup', g: 255 }],
        lunch: [{ id: 'chicken_grilled_dish', g: 255 }, { id: 'rice_koshari', g: 205 }, { id: 'salata_baladi', g: 155 }],
        dinner: [{ id: 'foul_oil', g: 205 }, { id: 'bread_baladi', g: 90 }, { id: 'egg_whole', g: 100 }, { id: 'yogurt_plain', g: 175 }],
        snack: [{ id: 'khoshaf', g: 205 }],
      },
      {
        breakfast: [{ id: 'dates', g: 55 }, { id: 'water', g: 300 }, { id: 'soup_lesan_asfour', g: 310 }],
        lunch: [{ id: 'molokhia_arnab', g: 435 }, { id: 'rice_white', g: 250 }, { id: 'salata_zabadi', g: 150 }],
        dinner: [{ id: 'oats_milk', g: 375 }, { id: 'banana', g: 150 }, { id: 'peanut_butter', g: 20 }],
        snack: [{ id: 'konafa', g: 100 }],
      },
      {
        breakfast: [{ id: 'dates', g: 55 }, { id: 'erk_sous', g: 305 }, { id: 'shorbet_firakh', g: 305 }],
        lunch: [{ id: 'fish_singari', g: 370 }, { id: 'rice_white', g: 245 }, { id: 'salata_baladi', g: 185 }],
        dinner: [{ id: 'cheese_qarish', g: 185 }, { id: 'egg_whole', g: 125 }, { id: 'bread_baladi', g: 110 }, { id: 'cucumber', g: 185 }],
        snack: [{ id: 'belila', g: 305 }],
      },
      {
        breakfast: [{ id: 'dates', g: 50 }, { id: 'water', g: 300 }, { id: 'foul_nabet', g: 320 }],
        lunch: [{ id: 'warak_enab_lahma', g: 265 }, { id: 'kofta', g: 160 }, { id: 'salata_baladi', g: 160 }],
        dinner: [{ id: 'foul_plain', g: 215 }, { id: 'tahina', g: 15 }, { id: 'bread_baladi', g: 95 }, { id: 'yogurt_greek', g: 180 }],
        snack: [{ id: 'basbousa', g: 65 }, { id: 'milk_low_fat', g: 215 }],
      },
      {
        breakfast: [{ id: 'dates', g: 55 }, { id: 'tamarind_drink', g: 315 }, { id: 'lentil_soup', g: 315 }],
        lunch: [{ id: 'sinia_frakh_batates', g: 500 }, { id: 'salata_baladi', g: 190 }],
        dinner: [{ id: 'oats_overnight', g: 440 }, { id: 'banana', g: 125 }],
        snack: [{ id: 'khoshaf', g: 250 }],
      },
      {
        breakfast: [{ id: 'dates', g: 50 }, { id: 'water', g: 300 }, { id: 'soup_vegetable', g: 270 }],
        lunch: [{ id: 'bamya_lahma', g: 325 }, { id: 'rice_white', g: 215 }, { id: 'chicken_breast', g: 110 }],
        dinner: [{ id: 'foul_iskandarani', g: 215 }, { id: 'bread_baladi', g: 95 }, { id: 'cheese_white_light', g: 65 }, { id: 'yogurt_plain', g: 185 }],
        snack: [{ id: 'qatayef', g: 95 }],
      },
      {
        breakfast: [{ id: 'dates', g: 45 }, { id: 'karkade_sweet', g: 255 }, { id: 'shorbet_firakh', g: 255 }],
        lunch: [{ id: 'fattah', g: 355 }, { id: 'beef_lean', g: 100 }, { id: 'salata_baladi', g: 150 }],
        dinner: [{ id: 'egg_whole', g: 100 }, { id: 'cheese_qarish', g: 150 }, { id: 'bread_shami_brown', g: 70 }, { id: 'cucumber', g: 150 }, { id: 'yogurt_greek', g: 150 }],
        snack: [{ id: 'kharoub', g: 255 }, { id: 'konafa', g: 60 }],
      },
    ]
  },
  {
    id: 'vegetarian_egyptian',
    ar: 'نباتي على الطريقة المصرية',
    en: 'Egyptian vegetarian',
    goal: 'fitness',
    desc: { ar: 'نباتي بالبيض والألبان: محشي وبامية بالزيت وفول وطعمية وعدس وترمس. البروتين جاي من البقول والبيض والجبنة القريش والزبادي، ومتوزع على اليوم كله.', en: 'Lacto-ovo vegetarian the Egyptian way: mahshi, okra, foul, taameya, lentils and lupini. Protein from legumes, eggs, qarish cheese and yogurt, spread across the day.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2001, protein: 101, carbs: 266, fat: 62 },
    days: [
      {
        breakfast: [{ id: 'foul_oil', g: 250 }, { id: 'egg_whole', g: 100 }, { id: 'bread_baladi', g: 90 }, { id: 'salata_baladi', g: 150 }],
        lunch: [{ id: 'mahshi_kousa', g: 250 }, { id: 'lentil_soup', g: 250 }, { id: 'yogurt_plain', g: 170 }],
        dinner: [{ id: 'cheese_qarish', g: 200 }, { id: 'tomato', g: 150 }, { id: 'bread_shami_brown', g: 70 }],
        snack: [{ id: 'guava', g: 150 }, { id: 'almonds', g: 20 }],
      },
      {
        breakfast: [{ id: 'taameya_sandwich', g: 200 }, { id: 'yogurt_greek', g: 190 }],
        lunch: [{ id: 'koshari_plain', g: 395 }, { id: 'salata_baladi', g: 170 }],
        dinner: [{ id: 'eggah', g: 200 }, { id: 'bread_baladi', g: 50 }, { id: 'cucumber', g: 170 }],
        snack: [{ id: 'lupini', g: 170 }, { id: 'apple', g: 170 }],
      },
      {
        breakfast: [{ id: 'oats_milk', g: 325 }, { id: 'banana', g: 130 }, { id: 'walnuts', g: 15 }],
        lunch: [{ id: 'bamya_zeit', g: 270 }, { id: 'rice_white', g: 215 }, { id: 'egg_whole', g: 110 }, { id: 'salata_zabadi', g: 130 }],
        dinner: [{ id: 'foul_plain', g: 215 }, { id: 'tahina', g: 15 }, { id: 'bread_baladi', g: 100 }],
        snack: [{ id: 'yogurt_greek', g: 185 }, { id: 'strawberry', g: 110 }],
      },
      {
        breakfast: [{ id: 'cheese_qarish', g: 175 }, { id: 'egg_whole', g: 115 }, { id: 'bread_toast_brown', g: 70 }, { id: 'tomato', g: 175 }],
        lunch: [{ id: 'fasolia_beida_salsa', g: 350 }, { id: 'rice_white', g: 230 }, { id: 'salata_baladi', g: 175 }],
        dinner: [{ id: 'hummus_dip', g: 115 }, { id: 'bread_shami_brown', g: 80 }, { id: 'cucumber', g: 175 }],
        snack: [{ id: 'milk_low_fat', g: 290 }, { id: 'dates', g: 35 }],
      },
      {
        breakfast: [{ id: 'foul_sandwich', g: 205 }, { id: 'egg_whole', g: 60 }, { id: 'laban_rayeb', g: 285 }],
        lunch: [{ id: 'mujaddara', g: 360 }, { id: 'salata_zabadi', g: 180 }],
        dinner: [{ id: 'shakshouka', g: 300 }, { id: 'bread_baladi', g: 55 }],
        snack: [{ id: 'lupini', g: 120 }, { id: 'orange', g: 180 }],
      },
      {
        breakfast: [{ id: 'oats_overnight', g: 355 }, { id: 'apple', g: 175 }],
        lunch: [{ id: 'mahshi_felfel', g: 355 }, { id: 'lentil_soup', g: 295 }, { id: 'yogurt_plain', g: 200 }],
        dinner: [{ id: 'cheese_white_light', g: 70 }, { id: 'egg_whole', g: 120 }, { id: 'bread_baladi', g: 105 }, { id: 'cucumber', g: 175 }],
        snack: [{ id: 'pumpkin_seeds', g: 25 }, { id: 'grapes', g: 120 }],
      },
      {
        breakfast: [{ id: 'besara', g: 220 }, { id: 'egg_whole', g: 110 }, { id: 'bread_baladi', g: 100 }],
        lunch: [{ id: 'kolkas_khodra', g: 325 }, { id: 'rice_white', g: 195 }, { id: 'cheese_qarish', g: 165 }],
        dinner: [{ id: 'yogurt_greek', g: 220 }, { id: 'granola', g: 35 }, { id: 'banana', g: 110 }],
        snack: [{ id: 'chickpeas', g: 110 }, { id: 'cucumber', g: 110 }],
      },
    ]
  },
  {
    id: 'budget_high_protein',
    ar: 'بروتين عالي بميزانية قليلة',
    en: 'Budget high protein',
    goal: 'fitness',
    desc: { ar: 'بروتين عالي من أرخص المصادر: بيض وجبنة قريش وفول وعدس وترمس وكبدة فراخ وفرخة كاملة وسردين. مناسب للي بيتمرن وميزانيته محدودة.', en: 'High protein from the cheapest sources: eggs, qarish cheese, foul, lentils, lupini, chicken liver, whole chicken and sardines. For trainees on a tight budget.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2300, protein: 170, carbs: 264, fat: 63 },
    days: [
      {
        breakfast: [{ id: 'egg_whole', g: 150 }, { id: 'foul_plain', g: 200 }, { id: 'bread_baladi', g: 90 }],
        lunch: [{ id: 'chicken_whole', g: 200 }, { id: 'rice_white', g: 250 }, { id: 'salata_baladi', g: 150 }],
        dinner: [{ id: 'cheese_qarish', g: 250 }, { id: 'bread_baladi', g: 90 }, { id: 'tomato', g: 150 }],
        snack: [{ id: 'lupini', g: 150 }, { id: 'banana', g: 120 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 170 }, { id: 'cheese_qarish', g: 170 }, { id: 'bread_baladi', g: 100 }],
        lunch: [{ id: 'chicken_liver', g: 225 }, { id: 'rice_white', g: 225 }, { id: 'bread_baladi', g: 50 }, { id: 'salata_baladi', g: 170 }],
        dinner: [{ id: 'foul_plain', g: 280 }, { id: 'egg_whole', g: 110 }, { id: 'bread_baladi', g: 50 }],
        snack: [{ id: 'milk_skim', g: 335 }, { id: 'dates', g: 35 }],
      },
      {
        breakfast: [{ id: 'oats', g: 75 }, { id: 'milk_skim', g: 330 }, { id: 'egg_whole', g: 110 }],
        lunch: [{ id: 'sardines_canned', g: 200 }, { id: 'rice_white', g: 275 }, { id: 'salata_baladi', g: 165 }],
        dinner: [{ id: 'cheese_qarish', g: 220 }, { id: 'egg_whole', g: 110 }, { id: 'bread_baladi', g: 100 }],
        snack: [{ id: 'lupini', g: 165 }, { id: 'orange', g: 165 }],
      },
      {
        breakfast: [{ id: 'foul_plain', g: 290 }, { id: 'egg_whole', g: 175 }, { id: 'bread_baladi', g: 105 }],
        lunch: [{ id: 'chicken_breast', g: 210 }, { id: 'macaroni_red', g: 345 }, { id: 'salata_baladi', g: 175 }],
        dinner: [{ id: 'yogurt_plain', g: 395 }, { id: 'cheese_qarish', g: 115 }],
        snack: [{ id: 'banana', g: 140 }, { id: 'peanuts', g: 25 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 165 }, { id: 'bread_baladi', g: 100 }, { id: 'cheese_qarish', g: 110 }, { id: 'tomato', g: 165 }],
        lunch: [{ id: 'lentils', g: 390 }, { id: 'rice_white', g: 165 }, { id: 'chicken_liver', g: 165 }],
        dinner: [{ id: 'foul_plain', g: 220 }, { id: 'tahina', g: 10 }, { id: 'bread_baladi', g: 50 }, { id: 'egg_white', g: 110 }],
        snack: [{ id: 'milk_skim', g: 335 }, { id: 'oats', g: 35 }],
      },
      {
        breakfast: [{ id: 'taameya', g: 85 }, { id: 'foul_plain', g: 190 }, { id: 'bread_baladi', g: 85 }],
        lunch: [{ id: 'chicken_whole', g: 190 }, { id: 'freekeh', g: 190 }, { id: 'molokhia', g: 190 }],
        dinner: [{ id: 'egg_whole', g: 145 }, { id: 'cheese_qarish', g: 145 }, { id: 'bread_baladi', g: 45 }],
        snack: [{ id: 'lupini', g: 145 }, { id: 'guava', g: 145 }],
      },
      {
        breakfast: [{ id: 'oats', g: 85 }, { id: 'milk_skim', g: 360 }, { id: 'peanut_butter', g: 20 }],
        lunch: [{ id: 'fish_tilapia', g: 300 }, { id: 'rice_white', g: 300 }, { id: 'salata_baladi', g: 180 }],
        dinner: [{ id: 'cheese_qarish', g: 240 }, { id: 'egg_whole', g: 120 }, { id: 'bread_baladi', g: 110 }],
        snack: [{ id: 'yogurt_plain', g: 205 }, { id: 'banana', g: 120 }],
      },
    ]
  },
  {
    id: 'lean_bulk',
    ar: 'تضخيم نظيف',
    en: 'Lean bulk',
    goal: 'muscle_gain',
    desc: { ar: 'زيادة بسيطة فوق احتياجك عشان تبني عضل بأقل دهون ممكنة. بروتين عالي في كل وجبة، والنشويات أكتر حوالين التمرين.', en: 'A small surplus to build muscle with minimal fat gain. High protein at every meal, more carbs around training.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2858, protein: 204, carbs: 317, fat: 86 },
    days: [
      {
        breakfast: [{ id: 'oats', g: 90 }, { id: 'milk_low_fat', g: 300 }, { id: 'whey', g: 30 }, { id: 'banana', g: 120 }],
        lunch: [{ id: 'chicken_breast', g: 220 }, { id: 'rice_white', g: 350 }, { id: 'veg_sauteed', g: 150 }, { id: 'olive_oil', g: 10 }],
        dinner: [{ id: 'beef_lean', g: 180 }, { id: 'potato_oven', g: 250 }, { id: 'salata_baladi', g: 150 }],
        snack: [{ id: 'yogurt_greek', g: 200 }, { id: 'granola', g: 40 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 165 }, { id: 'egg_white', g: 110 }, { id: 'bread_toast_brown', g: 100 }, { id: 'cheese_white_light', g: 45 }],
        lunch: [{ id: 'shish_tawook', g: 275 }, { id: 'rice_koshari', g: 330 }, { id: 'hummus_dip', g: 65 }, { id: 'salata_baladi', g: 165 }],
        dinner: [{ id: 'fish_salmon', g: 200 }, { id: 'sweet_potato', g: 275 }, { id: 'broccoli', g: 165 }],
        snack: [{ id: 'protein_bar', g: 65 }, { id: 'apple', g: 165 }],
      },
      {
        breakfast: [{ id: 'foul_oil', g: 190 }, { id: 'egg_whole', g: 145 }, { id: 'bread_baladi', g: 130 }],
        lunch: [{ id: 'kofta', g: 190 }, { id: 'pasta_cooked', g: 285 }, { id: 'salata_baladi', g: 145 }],
        dinner: [{ id: 'chicken_breast', g: 170 }, { id: 'quinoa', g: 240 }, { id: 'veg_mixed_boiled', g: 145 }],
        snack: [{ id: 'milk_low_fat', g: 285 }, { id: 'dates', g: 50 }, { id: 'almonds', g: 20 }],
      },
      {
        breakfast: [{ id: 'oats_milk', g: 420 }, { id: 'whey', g: 35 }, { id: 'peanut_butter', g: 25 }],
        lunch: [{ id: 'fish_denis', g: 360 }, { id: 'rice_white', g: 360 }, { id: 'salata_baladi', g: 180 }],
        dinner: [{ id: 'freekeh_chicken', g: 480 }],
        snack: [{ id: 'yogurt_greek', g: 240 }, { id: 'banana', g: 145 }, { id: 'honey', g: 20 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 165 }, { id: 'bread_shami_brown', g: 155 }, { id: 'turkey_smoked', g: 65 }, { id: 'tomato', g: 165 }],
        lunch: [{ id: 'sinia_frakh_batates', g: 545 }, { id: 'rice_white', g: 165 }],
        dinner: [{ id: 'fish_tuna_can', g: 155 }, { id: 'pasta_cooked', g: 275 }, { id: 'salata_baladi', g: 165 }],
        snack: [{ id: 'whey', g: 35 }, { id: 'oats', g: 55 }, { id: 'banana', g: 110 }],
      },
      {
        breakfast: [{ id: 'cheese_qarish', g: 215 }, { id: 'egg_whole', g: 110 }, { id: 'bread_baladi', g: 145 }, { id: 'honey', g: 15 }],
        lunch: [{ id: 'beef_lean', g: 215 }, { id: 'rice_white', g: 325 }, { id: 'bamya_zeit', g: 215 }],
        dinner: [{ id: 'chicken_breast', g: 195 }, { id: 'potato', g: 325 }, { id: 'green_beans', g: 160 }],
        snack: [{ id: 'yogurt_greek', g: 215 }, { id: 'mixed_nuts', g: 25 }],
      },
      {
        breakfast: [{ id: 'oats', g: 105 }, { id: 'milk_low_fat', g: 345 }, { id: 'whey', g: 35 }, { id: 'banana', g: 140 }],
        lunch: [{ id: 'kabsa_chicken', g: 520 }, { id: 'salata_zabadi', g: 175 }],
        dinner: [{ id: 'egg_whole', g: 115 }, { id: 'egg_white', g: 175 }, { id: 'bread_toast_brown', g: 105 }, { id: 'avocado', g: 70 }],
        snack: [{ id: 'rice_cakes', g: 35 }, { id: 'peanut_butter', g: 25 }, { id: 'milk_low_fat', g: 290 }],
      },
    ]
  },
  {
    id: 'endurance_athlete',
    ar: 'رياضي تحمّل (جري وعجل وسباحة)',
    en: 'Endurance athlete',
    goal: 'performance',
    desc: { ar: 'نشويات عالية عشان مخزون الجليكوجين في التمرينات الطويلة، وبروتين كفاية للاستشفاء. السناك بيتاخد قبل أو بعد التمرين حسب ميعاده.', en: 'High carbohydrate to keep glycogen topped up for long sessions, with enough protein for recovery. Time the snack before or after training.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 3002, protein: 172, carbs: 433, fat: 66 },
    days: [
      {
        breakfast: [{ id: 'oats', g: 100 }, { id: 'milk_low_fat', g: 305 }, { id: 'banana', g: 155 }, { id: 'honey', g: 20 }],
        lunch: [{ id: 'chicken_breast', g: 185 }, { id: 'pasta_cooked', g: 405 }, { id: 'salata_baladi', g: 155 }],
        dinner: [{ id: 'fish_tilapia', g: 225 }, { id: 'rice_white', g: 355 }, { id: 'veg_sauteed', g: 155 }],
        snack: [{ id: 'dates', g: 60 }, { id: 'sports_drink', g: 510 }, { id: 'yogurt_plain', g: 175 }],
      },
      {
        breakfast: [{ id: 'bread_baladi', g: 140 }, { id: 'foul_plain', g: 260 }, { id: 'egg_whole', g: 105 }, { id: 'orange_juice', g: 260 }],
        lunch: [{ id: 'koshari', g: 470 }, { id: 'yogurt_greek', g: 180 }],
        dinner: [{ id: 'chicken_grilled_dish', g: 260 }, { id: 'potato', g: 365 }, { id: 'salata_baladi', g: 155 }],
        snack: [{ id: 'rice_cakes', g: 40 }, { id: 'honey', g: 20 }, { id: 'banana', g: 125 }],
      },
      {
        breakfast: [{ id: 'granola', g: 85 }, { id: 'yogurt_greek', g: 265 }, { id: 'strawberry', g: 160 }],
        lunch: [{ id: 'kabsa_chicken', g: 475 }, { id: 'salata_baladi', g: 160 }],
        dinner: [{ id: 'beef_lean', g: 160 }, { id: 'pasta_cooked', g: 370 }, { id: 'green_beans', g: 160 }],
        snack: [{ id: 'energy_gel', g: 40 }, { id: 'dates', g: 55 }, { id: 'milk_chocolate', g: 315 }],
      },
      {
        breakfast: [{ id: 'oats_milk', g: 440 }, { id: 'banana', g: 165 }, { id: 'dates', g: 35 }],
        lunch: [{ id: 'fish_denis', g: 330 }, { id: 'rice_white', g: 385 }, { id: 'salata_baladi', g: 165 }],
        dinner: [{ id: 'egg_whole', g: 165 }, { id: 'bread_shami_brown', g: 155 }, { id: 'cheese_qarish', g: 110 }, { id: 'tomato', g: 165 }],
        snack: [{ id: 'sugarcane_juice', g: 330 }, { id: 'semit', g: 100 }],
      },
      {
        breakfast: [{ id: 'foul_sandwich', g: 385 }, { id: 'egg_whole', g: 115 }],
        lunch: [{ id: 'freekeh_chicken', g: 510 }, { id: 'salata_zabadi', g: 170 }],
        dinner: [{ id: 'macaroni_red', g: 455 }, { id: 'turkey_breast', g: 170 }],
        snack: [{ id: 'banana', g: 170 }, { id: 'yogurt_greek', g: 190 }, { id: 'honey', g: 25 }],
      },
      {
        breakfast: [{ id: 'oats', g: 110 }, { id: 'milk_low_fat', g: 325 }, { id: 'dates', g: 45 }, { id: 'walnuts', g: 15 }],
        lunch: [{ id: 'shish_tawook', g: 220 }, { id: 'rice_koshari', g: 380 }, { id: 'salata_baladi', g: 165 }],
        dinner: [{ id: 'sweet_potato', g: 380 }, { id: 'fish_salmon', g: 165 }, { id: 'spinach', g: 110 }],
        snack: [{ id: 'milk_chocolate', g: 325 }, { id: 'rice_cakes', g: 35 }],
      },
      {
        breakfast: [{ id: 'taameya_sandwich', g: 185 }, { id: 'foul_sandwich', g: 175 }, { id: 'orange_juice', g: 260 }],
        lunch: [{ id: 'chicken_breast', g: 185 }, { id: 'rice_white', g: 415 }, { id: 'molokhia', g: 205 }],
        dinner: [{ id: 'pasta_cooked', g: 310 }, { id: 'fish_tuna_can', g: 145 }, { id: 'salata_baladi', g: 155 }],
        snack: [{ id: 'energy_gel', g: 40 }, { id: 'banana', g: 155 }, { id: 'sports_drink', g: 520 }],
      },
    ]
  },
  {
    id: 'office_worker_3meals',
    ar: 'موظف مكتب — 3 وجبات',
    en: 'Office worker — 3 meals',
    goal: 'lose_weight',
    desc: { ar: 'تلات وجبات بس من غير سناكات، مناسبة لليوم المكتبي: فطار سريع، غدا ينفع يتاخد في علبة للشغل، وعشا خفيف. عجز بسيط وبروتين كويس عشان تنزل بهدوء وإنت قاعد أغلب اليوم.', en: 'Three meals, no snacks, built for a desk day: a quick breakfast, a lunch that packs for work and a light dinner. A modest deficit with solid protein for steady loss while mostly seated.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 1748, protein: 122, carbs: 198, fat: 52 },
    days: [
      {
        breakfast: [{ id: 'foul_plain', g: 210 }, { id: 'egg_whole', g: 105 }, { id: 'bread_baladi', g: 95 }, { id: 'cucumber', g: 105 }],
        lunch: [{ id: 'chicken_breast', g: 190 }, { id: 'rice_white', g: 210 }, { id: 'salata_baladi', g: 210 }],
        dinner: [{ id: 'yogurt_greek', g: 210 }, { id: 'oats', g: 40 }, { id: 'apple', g: 160 }, { id: 'almonds', g: 15 }],
        snack: [],
      },
      {
        breakfast: [{ id: 'cheese_qarish', g: 175 }, { id: 'bread_toast_brown', g: 70 }, { id: 'tomato', g: 175 }, { id: 'egg_whole', g: 60 }, { id: 'coffee_milk', g: 280 }],
        lunch: [{ id: 'shish_tawook', g: 235 }, { id: 'bread_shami_brown', g: 80 }, { id: 'hummus_dip', g: 70 }, { id: 'salata_baladi', g: 175 }],
        dinner: [{ id: 'lentil_soup', g: 350 }, { id: 'bread_baladi', g: 55 }, { id: 'cheese_white_light', g: 45 }],
        snack: [],
      },
      {
        breakfast: [{ id: 'oats_milk', g: 340 }, { id: 'banana', g: 115 }],
        lunch: [{ id: 'fish_singari', g: 340 }, { id: 'rice_white', g: 205 }, { id: 'salata_baladi', g: 170 }],
        dinner: [{ id: 'eggah', g: 205 }, { id: 'bread_baladi', g: 50 }, { id: 'salata_zabadi', g: 135 }],
        snack: [],
      },
      {
        breakfast: [{ id: 'taameya_sandwich', g: 200 }, { id: 'yogurt_plain', g: 190 }],
        lunch: [{ id: 'fasolia_lahma', g: 335 }, { id: 'rice_white', g: 200 }, { id: 'chicken_breast', g: 90 }],
        dinner: [{ id: 'turkey_smoked', g: 90 }, { id: 'bread_toast_brown', g: 65 }, { id: 'cheese_white_light', g: 35 }, { id: 'cucumber', g: 170 }, { id: 'orange', g: 170 }],
        snack: [],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 110 }, { id: 'bread_shami_brown', g: 75 }, { id: 'cheese_white_light', g: 45 }, { id: 'cucumber', g: 165 }, { id: 'cappuccino', g: 260 }],
        lunch: [{ id: 'chicken_grilled_dish', g: 270 }, { id: 'rice_koshari', g: 165 }, { id: 'salata_baladi', g: 165 }],
        dinner: [{ id: 'yogurt_greek', g: 220 }, { id: 'granola', g: 35 }, { id: 'strawberry', g: 110 }],
        snack: [],
      },
      {
        breakfast: [{ id: 'foul_sandwich', g: 215 }, { id: 'egg_whole', g: 65 }, { id: 'tea_plain', g: 240 }],
        lunch: [{ id: 'bisella_lahma', g: 380 }, { id: 'rice_white', g: 225 }, { id: 'yogurt_greek', g: 190 }],
        dinner: [{ id: 'fish_tuna_can', g: 125 }, { id: 'bread_baladi', g: 55 }, { id: 'salata_baladi', g: 250 }, { id: 'olive_oil', g: 5 }],
        snack: [],
      },
      {
        breakfast: [{ id: 'oats_overnight', g: 355 }, { id: 'apple', g: 120 }],
        lunch: [{ id: 'kabsa_chicken', g: 415 }, { id: 'salata_zabadi', g: 145 }],
        dinner: [{ id: 'cheese_qarish', g: 180 }, { id: 'egg_whole', g: 120 }, { id: 'bread_baladi', g: 55 }, { id: 'tomato', g: 180 }],
        snack: [],
      },
    ]
  },
  {
    id: 'student_budget',
    ar: 'طالب — أكل رخيص وسهل',
    en: 'Student — cheap & easy',
    goal: 'fitness',
    desc: { ar: 'أكل الطلبة الحقيقي: فول وطعمية وكشري ومكرونة وبيض وعدس، بكميات محسوبة. مفيش طبخ معقد، وأغلبه يتلاقي في أي مكان جنب الجامعة.', en: 'Real student food: foul, taameya, koshari, pasta, eggs and lentils in measured amounts. No complicated cooking, and most of it is sold near any campus.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2292, protein: 113, carbs: 320, fat: 66 },
    days: [
      {
        breakfast: [{ id: 'foul_sandwich', g: 365 }, { id: 'tea_sugar', g: 260 }],
        lunch: [{ id: 'koshari', g: 430 }],
        dinner: [{ id: 'egg_whole', g: 160 }, { id: 'bread_baladi', g: 95 }, { id: 'cheese_white', g: 30 }, { id: 'tomato', g: 110 }],
        snack: [{ id: 'banana', g: 130 }, { id: 'milk_full', g: 270 }],
      },
      {
        breakfast: [{ id: 'taameya_sandwich', g: 200 }, { id: 'foul_sandwich', g: 190 }],
        lunch: [{ id: 'macaroni_red', g: 390 }, { id: 'egg_whole', g: 110 }, { id: 'salata_baladi', g: 165 }],
        dinner: [{ id: 'cheese_qarish', g: 165 }, { id: 'bread_baladi', g: 100 }, { id: 'cucumber', g: 165 }],
        snack: [{ id: 'lupini', g: 165 }, { id: 'orange', g: 165 }],
      },
      {
        breakfast: [{ id: 'oats', g: 80 }, { id: 'milk_full', g: 285 }, { id: 'banana', g: 115 }],
        lunch: [{ id: 'lentils', g: 345 }, { id: 'rice_white', g: 230 }, { id: 'salata_baladi', g: 170 }],
        dinner: [{ id: 'eggah', g: 230 }, { id: 'bread_baladi', g: 105 }],
        snack: [{ id: 'peanuts', g: 35 }, { id: 'dates', g: 35 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 110 }, { id: 'foul_plain', g: 220 }, { id: 'bread_baladi', g: 100 }],
        lunch: [{ id: 'chicken_whole', g: 200 }, { id: 'rice_koshari', g: 275 }, { id: 'salata_baladi', g: 165 }],
        dinner: [{ id: 'yogurt_plain', g: 190 }, { id: 'bread_baladi', g: 100 }, { id: 'cheese_qarish', g: 110 }],
        snack: [{ id: 'banana', g: 135 }, { id: 'tea_sugar', g: 265 }],
      },
      {
        breakfast: [{ id: 'foul_oil', g: 225 }, { id: 'bread_baladi', g: 100 }, { id: 'egg_whole', g: 55 }],
        lunch: [{ id: 'koshari', g: 445 }, { id: 'salata_zabadi', g: 110 }],
        dinner: [{ id: 'sardines_canned', g: 100 }, { id: 'bread_baladi', g: 100 }, { id: 'tomato', g: 165 }],
        snack: [{ id: 'milk_full', g: 280 }, { id: 'biscuits', g: 35 }],
      },
      {
        breakfast: [{ id: 'taameya', g: 120 }, { id: 'foul_plain', g: 150 }, { id: 'bread_baladi', g: 90 }],
        lunch: [{ id: 'mesa2aa_batates', g: 305 }, { id: 'rice_white', g: 205 }, { id: 'egg_whole', g: 100 }],
        dinner: [{ id: 'fish_tuna_can', g: 140 }, { id: 'pasta_cooked', g: 205 }, { id: 'salata_baladi', g: 150 }],
        snack: [{ id: 'guava', g: 150 }, { id: 'lupini', g: 100 }],
      },
      {
        breakfast: [{ id: 'oats', g: 85 }, { id: 'milk_full', g: 310 }, { id: 'peanut_butter', g: 20 }],
        lunch: [{ id: 'mujaddara', g: 435 }, { id: 'salata_zabadi', g: 185 }],
        dinner: [{ id: 'egg_whole', g: 185 }, { id: 'bread_baladi', g: 110 }, { id: 'cheese_qarish', g: 125 }],
        snack: [{ id: 'banana', g: 150 }, { id: 'dates', g: 35 }],
      },
    ]
  },
  {
    id: 'low_gi_style',
    ar: 'أكل صحي بطيء الامتصاص (نمط منخفض السكر)',
    en: 'Low-GI style healthy eating',
    goal: 'fitness',
    desc: { ar: 'نمط أكل صحي عام: حبوب كاملة وبقول وخضار كتير وبروتين في كل وجبة وسكر قليل، عشان الشبع يطول والطاقة تفضل ثابتة. ده مش نظام علاجي للسكر — لو عندك سكر أو أي حالة صحية، اسأل دكتورك أو أخصائي التغذية قبل ما تغيّر أكلك.', en: 'General healthy eating: whole grains, legumes, plenty of vegetables, protein at each meal and little added sugar for steadier energy and fullness. Not a medical diabetes diet — if you have diabetes or any condition, consult your doctor or dietitian first.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 1805, protein: 133, carbs: 191, fat: 60 },
    days: [
      {
        breakfast: [{ id: 'oats_water', g: 325 }, { id: 'milk_skim', g: 195 }, { id: 'walnuts', g: 20 }, { id: 'apple', g: 130 }],
        lunch: [{ id: 'chicken_breast', g: 195 }, { id: 'freekeh', g: 235 }, { id: 'veg_sauteed', g: 195 }, { id: 'salata_baladi', g: 195 }],
        dinner: [{ id: 'yogurt_greek', g: 260 }, { id: 'cucumber', g: 195 }, { id: 'chia_seeds', g: 15 }],
        snack: [{ id: 'almonds', g: 25 }, { id: 'guava', g: 130 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 120 }, { id: 'bread_toast_brown', g: 70 }, { id: 'cheese_qarish', g: 120 }, { id: 'tomato', g: 180 }],
        lunch: [{ id: 'fish_denis', g: 300 }, { id: 'bulgur', g: 240 }, { id: 'salata_baladi', g: 240 }, { id: 'olive_oil', g: 5 }],
        dinner: [{ id: 'lentil_soup', g: 360 }, { id: 'salata_zabadi', g: 145 }],
        snack: [{ id: 'pear', g: 180 }, { id: 'pistachio', g: 25 }],
      },
      {
        breakfast: [{ id: 'foul_plain', g: 245 }, { id: 'olive_oil', g: 10 }, { id: 'egg_whole', g: 60 }, { id: 'bread_shami_brown', g: 60 }, { id: 'salata_baladi', g: 185 }],
        lunch: [{ id: 'fasolia_lahma', g: 365 }, { id: 'barley', g: 220 }],
        dinner: [{ id: 'cheese_white_light', g: 75 }, { id: 'egg_whole', g: 120 }, { id: 'cucumber', g: 185 }, { id: 'pepper_colored', g: 120 }],
        snack: [{ id: 'yogurt_plain', g: 210 }, { id: 'strawberry', g: 120 }],
      },
      {
        breakfast: [{ id: 'oats_overnight', g: 280 }, { id: 'strawberry', g: 110 }],
        lunch: [{ id: 'shish_tawook', g: 225 }, { id: 'quinoa', g: 200 }, { id: 'tabbouleh', g: 170 }],
        dinner: [{ id: 'fish_tuna_can', g: 135 }, { id: 'chickpeas', g: 110 }, { id: 'salata_baladi', g: 225 }, { id: 'olive_oil', g: 5 }],
        snack: [{ id: 'apple', g: 170 }, { id: 'almonds', g: 15 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 130 }, { id: 'bread_toast_brown', g: 80 }, { id: 'avocado', g: 65 }, { id: 'tomato', g: 130 }],
        lunch: [{ id: 'chicken_breast', g: 195 }, { id: 'lentils', g: 260 }, { id: 'taro_leaves', g: 260 }],
        dinner: [{ id: 'yogurt_greek', g: 260 }, { id: 'walnuts', g: 20 }, { id: 'cucumber', g: 195 }],
        snack: [{ id: 'orange', g: 195 }, { id: 'lupini', g: 130 }],
      },
      {
        breakfast: [{ id: 'cheese_qarish', g: 190 }, { id: 'bread_shami_brown', g: 90 }, { id: 'cucumber', g: 190 }, { id: 'olives', g: 25 }],
        lunch: [{ id: 'fish_singari', g: 380 }, { id: 'bulgur', g: 190 }, { id: 'veg_mixed_boiled', g: 190 }],
        dinner: [{ id: 'foul_nabet', g: 380 }, { id: 'egg_whole', g: 65 }],
        snack: [{ id: 'guava', g: 190 }, { id: 'pumpkin_seeds', g: 20 }],
      },
      {
        breakfast: [{ id: 'oats_water', g: 315 }, { id: 'milk_skim', g: 190 }, { id: 'chia_seeds', g: 15 }, { id: 'pear', g: 125 }],
        lunch: [{ id: 'sabanekh_lahma', g: 380 }, { id: 'rice_brown', g: 190 }, { id: 'salata_zabadi', g: 150 }],
        dinner: [{ id: 'egg_whole', g: 125 }, { id: 'cheese_qarish', g: 125 }, { id: 'bread_toast_brown', g: 40 }, { id: 'salata_baladi', g: 190 }],
        snack: [{ id: 'yogurt_plain', g: 215 }, { id: 'pistachio', g: 20 }],
      },
    ]
  },
  {
    id: 'pregnancy_friendly_general',
    ar: 'أكل متوازن للحامل (إرشادات عامة)',
    en: 'Pregnancy-friendly (general guidance)',
    goal: 'fitness',
    desc: { ar: 'إرشادات عامة مش خطة طبية: أكل مطبوخ كويس، ألبان كتير للكالسيوم، لحمة وبقول وخضار ورقية للحديد، وسمك قليل الزئبق. من غير فسيخ ولا كبدة ولا بيض نص سوا، وكافيين قليل. لازم تمشي على كلام دكتورك — هو اللي يحدد السعرات والمكملات حسب مرحلة الحمل.', en: 'General guidance, not a medical plan: well-cooked food, plenty of dairy for calcium, meat, legumes and leafy greens for iron, low-mercury fish. No feseekh, liver or runny eggs, little caffeine. Always follow your doctor, who sets calories and supplements for your stage of pregnancy.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 2196, protein: 143, carbs: 263, fat: 66 },
    days: [
      {
        breakfast: [{ id: 'foul_oil', g: 200 }, { id: 'egg_whole', g: 100 }, { id: 'bread_baladi', g: 90 }, { id: 'orange', g: 150 }],
        lunch: [{ id: 'beef_lean', g: 150 }, { id: 'rice_white', g: 200 }, { id: 'taro_leaves', g: 200 }, { id: 'salata_baladi', g: 150 }],
        dinner: [{ id: 'yogurt_plain', g: 170 }, { id: 'oats', g: 40 }, { id: 'banana', g: 100 }],
        snack: [{ id: 'milk_low_fat', g: 255 }, { id: 'dates', g: 30 }, { id: 'almonds', g: 15 }],
      },
      {
        breakfast: [{ id: 'oats_milk', g: 340 }, { id: 'strawberry', g: 115 }, { id: 'walnuts', g: 15 }],
        lunch: [{ id: 'chicken_grilled_dish', g: 285 }, { id: 'freekeh', g: 225 }, { id: 'salata_zabadi', g: 135 }],
        dinner: [{ id: 'cheese_qarish', g: 170 }, { id: 'egg_whole', g: 115 }, { id: 'bread_shami_brown', g: 80 }, { id: 'cucumber', g: 170 }],
        snack: [{ id: 'guava', g: 170 }, { id: 'yogurt_greek', g: 170 }],
      },
      {
        breakfast: [{ id: 'cheese_white_light', g: 70 }, { id: 'egg_whole', g: 120 }, { id: 'bread_toast_brown', g: 70 }, { id: 'tomato', g: 180 }],
        lunch: [{ id: 'lentil_soup', g: 295 }, { id: 'fish_denis', g: 235 }, { id: 'rice_white', g: 235 }],
        dinner: [{ id: 'foul_plain', g: 235 }, { id: 'tahina', g: 20 }, { id: 'bread_baladi', g: 55 }],
        snack: [{ id: 'milk_low_fat', g: 295 }, { id: 'banana', g: 140 }, { id: 'dried_figs', g: 35 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 120 }, { id: 'foul_plain', g: 240 }, { id: 'bread_baladi', g: 110 }],
        lunch: [{ id: 'molokhia', g: 300 }, { id: 'chicken_breast', g: 180 }, { id: 'rice_white', g: 240 }],
        dinner: [{ id: 'yogurt_greek', g: 240 }, { id: 'granola', g: 35 }, { id: 'apple', g: 180 }],
        snack: [{ id: 'milk_low_fat', g: 300 }, { id: 'dates', g: 35 }],
      },
      {
        breakfast: [{ id: 'oats_overnight', g: 365 }, { id: 'banana', g: 120 }],
        lunch: [{ id: 'bamya_lahma', g: 365 }, { id: 'rice_white', g: 245 }, { id: 'salata_baladi', g: 185 }],
        dinner: [{ id: 'egg_whole', g: 120 }, { id: 'cheese_qarish', g: 185 }, { id: 'bread_baladi', g: 55 }, { id: 'cucumber', g: 185 }],
        snack: [{ id: 'orange', g: 185 }, { id: 'almonds', g: 25 }, { id: 'yogurt_plain', g: 205 }],
      },
      {
        breakfast: [{ id: 'foul_iskandarani', g: 215 }, { id: 'bread_baladi', g: 95 }, { id: 'egg_whole', g: 55 }],
        lunch: [{ id: 'sinia_frakh_batates', g: 430 }, { id: 'salata_zabadi', g: 130 }],
        dinner: [{ id: 'lentils', g: 215 }, { id: 'rice_white', g: 110 }, { id: 'salata_baladi', g: 160 }],
        snack: [{ id: 'milk_low_fat', g: 270 }, { id: 'guava', g: 160 }, { id: 'dates', g: 30 }],
      },
      {
        breakfast: [{ id: 'cheese_qarish', g: 190 }, { id: 'egg_whole', g: 125 }, { id: 'bread_shami_brown', g: 90 }, { id: 'tomato', g: 190 }],
        lunch: [{ id: 'fish_bass', g: 315 }, { id: 'rice_white', g: 250 }, { id: 'veg_sauteed', g: 190 }],
        dinner: [{ id: 'yogurt_greek', g: 250 }, { id: 'oats', g: 40 }, { id: 'strawberry', g: 125 }, { id: 'walnuts', g: 20 }],
        snack: [{ id: 'milk_low_fat', g: 315 }, { id: 'banana', g: 150 }],
      },
    ]
  },
  {
    id: 'senior_maintenance',
    ar: 'كبار السن — تثبيت وصحة',
    en: 'Senior maintenance',
    goal: 'fitness',
    desc: { ar: 'أكل طري وسهل الهضم، بروتين في كل وجبة عشان العضل ما يضعفش مع السن، وألبان للكالسيوم وخضار وشوربة للألياف والسوائل. لو فيه أمراض مزمنة أو أدوية، اسأل الدكتور قبل أي تغيير.', en: 'Soft, easy-to-digest food with protein at every meal to protect muscle with age, dairy for calcium, and vegetables and soups for fibre and fluids. With chronic conditions or medications, check with the doctor first.' },
    /* محسوبة من الأكل اللي تحت — متوسط الأيام */
    targets: { kcal: 1797, protein: 115, carbs: 220, fat: 52 },
    days: [
      {
        breakfast: [{ id: 'oats_milk', g: 370 }, { id: 'banana', g: 125 }],
        lunch: [{ id: 'fish_tilapia', g: 220 }, { id: 'rice_white', g: 220 }, { id: 'veg_mixed_boiled', g: 185 }],
        dinner: [{ id: 'yogurt_plain', g: 210 }, { id: 'cheese_qarish', g: 125 }, { id: 'bread_baladi', g: 55 }],
        snack: [{ id: 'guava', g: 150 }, { id: 'milk_low_fat', g: 245 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 115 }, { id: 'foul_plain', g: 170 }, { id: 'bread_baladi', g: 70 }, { id: 'tomato', g: 115 }],
        lunch: [{ id: 'shorbet_firakh', g: 285 }, { id: 'chicken_breast', g: 135 }, { id: 'rice_white', g: 170 }, { id: 'salata_zabadi', g: 135 }],
        dinner: [{ id: 'cheese_qarish', g: 170 }, { id: 'cucumber', g: 170 }, { id: 'bread_toast_brown', g: 35 }],
        snack: [{ id: 'apple', g: 170 }, { id: 'walnuts', g: 10 }, { id: 'laban_rayeb', g: 275 }],
      },
      {
        breakfast: [{ id: 'cheese_white_light', g: 55 }, { id: 'egg_whole', g: 55 }, { id: 'bread_shami_brown', g: 75 }, { id: 'cucumber', g: 110 }, { id: 'milk_low_fat', g: 215 }],
        lunch: [{ id: 'kolkas_khodra', g: 325 }, { id: 'beef_lean', g: 110 }, { id: 'rice_white', g: 160 }],
        dinner: [{ id: 'lentil_soup', g: 325 }, { id: 'bread_baladi', g: 30 }],
        snack: [{ id: 'yogurt_greek', g: 185 }, { id: 'banana', g: 110 }],
      },
      {
        breakfast: [{ id: 'oats_water', g: 300 }, { id: 'milk_low_fat', g: 180 }, { id: 'dates', g: 25 }],
        lunch: [{ id: 'fish_singari', g: 360 }, { id: 'potato', g: 240 }, { id: 'salata_baladi', g: 180 }],
        dinner: [{ id: 'eggah', g: 180 }, { id: 'bread_baladi', g: 55 }, { id: 'salata_zabadi', g: 145 }],
        snack: [{ id: 'orange', g: 180 }, { id: 'milk_low_fat', g: 240 }],
      },
      {
        breakfast: [{ id: 'foul_plain', g: 245 }, { id: 'olive_oil', g: 5 }, { id: 'egg_whole', g: 60 }, { id: 'bread_baladi', g: 75 }],
        lunch: [{ id: 'bisella_lahma', g: 370 }, { id: 'rice_white', g: 185 }],
        dinner: [{ id: 'yogurt_plain', g: 210 }, { id: 'oats', g: 35 }, { id: 'strawberry', g: 125 }],
        snack: [{ id: 'cheese_qarish', g: 125 }, { id: 'cucumber', g: 125 }, { id: 'pear', g: 185 }],
      },
      {
        breakfast: [{ id: 'egg_whole', g: 120 }, { id: 'cheese_qarish', g: 120 }, { id: 'bread_toast_brown', g: 75 }, { id: 'tomato', g: 120 }],
        lunch: [{ id: 'sabanekh_lahma', g: 365 }, { id: 'rice_white', g: 220 }, { id: 'salata_zabadi', g: 145 }],
        dinner: [{ id: 'soup_vegetable', g: 365 }, { id: 'bread_baladi', g: 35 }, { id: 'cheese_white_light', g: 50 }],
        snack: [{ id: 'milk_low_fat', g: 305 }, { id: 'banana', g: 120 }],
      },
      {
        breakfast: [{ id: 'oats_milk', g: 340 }, { id: 'walnuts', g: 10 }, { id: 'apple', g: 115 }],
        lunch: [{ id: 'chicken_grilled_dish', g: 225 }, { id: 'potato', g: 225 }, { id: 'veg_sauteed', g: 170 }],
        dinner: [{ id: 'foul_nabet', g: 340 }, { id: 'egg_whole', g: 55 }, { id: 'bread_baladi', g: 35 }],
        snack: [{ id: 'yogurt_greek', g: 190 }, { id: 'dates', g: 25 }],
      },
    ]
  },
];
