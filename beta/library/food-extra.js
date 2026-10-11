/*
 * ADAM — إضافات مكتبة الأغذية (دفعة تانية)
 *
 * نفس نظام المكتبة الأساسية: كل القيم لكل 100 جرام (أو 100 مل للسوائل).
 * c = سعرات | p = بروتين | cb = كربوهيدرات | f = دهون  (جرام/100جم)
 *
 * الأصناف المفردة من جداول التركيب الغذائي القياسية. الأكلات المركبة
 * محسوبة على الطريقة البيتية المعتادة في مصر — تقديرية وبتختلف حسب
 * كمية الزيت والسمنة، فالمدرب يعدّلها لو وصفة العميل مختلفة.
 */

export const FOOD_LIBRARY_EXTRA = [

  /* ---------------- بروتين ---------------- */
  { id: 'rabbit_cooked',     cat: 'protein', ar: 'أرانب مسلوقة/مطهية',        en: 'Rabbit, stewed',              c: 173, p: 33,   cb: 0,    f: 3.5 },
  { id: 'chicken_wings',     cat: 'protein', ar: 'أجنحة فراخ مشوية',           en: 'Chicken wings, roasted',      c: 250, p: 23,   cb: 0,    f: 17.5 },
  { id: 'lamb_leg',          cat: 'protein', ar: 'فخدة ضاني مشوية',            en: 'Lamb leg, roasted',           c: 230, p: 26,   cb: 0,    f: 14 },
  { id: 'beef_burger_patty', cat: 'protein', ar: 'قرص برجر لحمة مشوي',         en: 'Beef burger patty, grilled',  c: 250, p: 20,   cb: 3,    f: 17.5 },
  { id: 'turkey_smoked',     cat: 'protein', ar: 'تركي مدخن (شرائح)',          en: 'Smoked turkey slices',        c: 105, p: 18,   cb: 3,    f: 2 },
  { id: 'fish_bass',         cat: 'protein', ar: 'سمك قاروص مشوي',             en: 'Sea bass, grilled',           c: 124, p: 23.6, cb: 0,    f: 2.6 },
  { id: 'fish_denis',        cat: 'protein', ar: 'سمك دنيس مشوي',              en: 'Sea bream, grilled',          c: 135, p: 24,   cb: 0,    f: 4.3 },
  { id: 'tuna_oil',          cat: 'protein', ar: 'تونة بالزيت (مصفّاة)',       en: 'Tuna in oil, drained',        c: 198, p: 29,   cb: 0,    f: 8.2 },
  { id: 'feseekh',           cat: 'protein', ar: 'فسيخ',                       en: 'Feseekh (salted fish)',       c: 180, p: 22,   cb: 0,    f: 10 },

  /* ---------------- نشويات ومخبوزات ---------------- */
  { id: 'semit',             cat: 'carb', ar: 'سميط بالسمسم',                 en: 'Semit (sesame bread ring)',   c: 300, p: 10,   cb: 52,   f: 5.5 },
  { id: 'bread_shami_brown', cat: 'carb', ar: 'عيش شامي أسمر (بر)',           en: 'Whole-wheat pita',            c: 250, p: 10,   cb: 48,   f: 2.5 },
  { id: 'bread_tortilla',    cat: 'carb', ar: 'عيش تورتيلا (راب)',            en: 'Tortilla wrap',               c: 310, p: 8,    cb: 51,   f: 8 },
  { id: 'bread_toast_brown', cat: 'carb', ar: 'توست أسمر (قمح كامل)',         en: 'Whole-wheat toast',           c: 250, p: 12,   cb: 43,   f: 3.5 },
  { id: 'rice_cakes',        cat: 'carb', ar: 'رايس كيك (كعك الرز)',          en: 'Rice cakes',                  c: 387, p: 8,    cb: 81,   f: 3 },
  { id: 'oats_water',        cat: 'carb', ar: 'شوفان مطبوخ بالمية',           en: 'Oatmeal cooked in water',     c: 71,  p: 2.5,  cb: 12,   f: 1.5 },
  { id: 'oats_milk',         cat: 'carb', ar: 'شوفان مطبوخ باللبن',           en: 'Oatmeal cooked in milk',      c: 105, p: 4.5,  cb: 14,   f: 3.5 },
  { id: 'oats_overnight',    cat: 'carb', ar: 'شوفان بايت (لبن وزبادي)',      en: 'Overnight oats',              c: 110, p: 5,    cb: 16,   f: 3 },
  { id: 'granola',           cat: 'carb', ar: 'جرانولا',                      en: 'Granola',                     c: 471, p: 10,   cb: 64,   f: 20 },
  { id: 'potato_oven',       cat: 'carb', ar: 'بطاطس في الفرن',               en: 'Oven-roasted potatoes',       c: 130, p: 2.5,  cb: 20,   f: 4.5 },
  { id: 'lupini',            cat: 'carb', ar: 'ترمس مسلوق',                   en: 'Lupini beans, boiled',        c: 119, p: 15.6, cb: 9.9,  f: 2.9 },
  { id: 'kidney_beans',      cat: 'carb', ar: 'فاصوليا حمرا مسلوقة',          en: 'Kidney beans, boiled',        c: 127, p: 8.7,  cb: 22.8, f: 0.5 },
  { id: 'molasses',          cat: 'carb', ar: 'عسل أسود',                     en: 'Sugarcane molasses',          c: 290, p: 0,    cb: 75,   f: 0.1 },

  /* ---------------- ألبان ---------------- */
  { id: 'mish',              cat: 'dairy', ar: 'مش',                          en: 'Mish (aged cheese)',          c: 200, p: 12,   cb: 4,    f: 15 },
  { id: 'ayran',             cat: 'dairy', ar: 'لبن زبادي للشرب (عيران)',     en: 'Ayran (yogurt drink)',        c: 36,  p: 1.7,  cb: 2.8,  f: 2 },
  { id: 'cheese_halloumi',   cat: 'dairy', ar: 'جبنة حلومي',                  en: 'Halloumi cheese',             c: 321, p: 21,   cb: 2,    f: 26 },
  { id: 'cheese_white_light',cat: 'dairy', ar: 'جبنة بيضاء لايت',             en: 'Light white cheese',          c: 170, p: 16,   cb: 4,    f: 10 },
  { id: 'milk_low_fat',      cat: 'dairy', ar: 'لبن نص دسم',                  en: 'Low-fat milk (2%)',           c: 50,  p: 3.3,  cb: 4.8,  f: 2 },
  { id: 'milk_chocolate',    cat: 'dairy', ar: 'لبن بالشوكولاتة',             en: 'Chocolate milk',              c: 83,  p: 3.2,  cb: 12,   f: 2.5 },
  { id: 'yogurt_low_fat',    cat: 'dairy', ar: 'زبادي لايت',                  en: 'Low-fat yogurt',              c: 63,  p: 5.3,  cb: 7,    f: 1.6 },
  { id: 'eshta',             cat: 'dairy', ar: 'قشطة بلدي',                   en: 'Eshta (clotted cream)',       c: 330, p: 2.5,  cb: 3,    f: 34 },
  { id: 'creme_caramel',     cat: 'dairy', ar: 'كريم كراميل',                 en: 'Creme caramel',               c: 140, p: 4,    cb: 22,   f: 4 },

  /* ---------------- فاكهة ---------------- */
  { id: 'mulberry',          cat: 'fruit', ar: 'توت',                         en: 'Mulberries',                  c: 45,  p: 1.4,  cb: 9.8,  f: 0.4 },
  { id: 'cherries',          cat: 'fruit', ar: 'كريز',                        en: 'Cherries',                    c: 63,  p: 1.1,  cb: 14.5, f: 0.2 },
  { id: 'prickly_pear',      cat: 'fruit', ar: 'تين شوكي',                    en: 'Prickly pear',                c: 42,  p: 0.7,  cb: 9,    f: 0.5 },
  { id: 'persimmon',         cat: 'fruit', ar: 'كاكا',                        en: 'Persimmon',                   c: 70,  p: 0.6,  cb: 17,   f: 0.2 },
  { id: 'melon_shamam',      cat: 'fruit', ar: 'شمام',                        en: 'Honeydew melon',              c: 36,  p: 0.5,  cb: 9,    f: 0.1 },
  { id: 'grapefruit',        cat: 'fruit', ar: 'جريب فروت',                   en: 'Grapefruit',                  c: 42,  p: 0.8,  cb: 10,   f: 0.1 },
  { id: 'dates_rotab',       cat: 'fruit', ar: 'بلح رطب (طازة)',              en: 'Fresh dates (rutab)',         c: 140, p: 1.5,  cb: 33,   f: 0.3 },
  { id: 'dried_figs',        cat: 'fruit', ar: 'تين مجفف',                    en: 'Dried figs',                  c: 249, p: 3.3,  cb: 58,   f: 0.9 },

  /* ---------------- خضار ---------------- */
  { id: 'pepper_colored',    cat: 'veg', ar: 'فلفل ألوان',                    en: 'Bell pepper (red/yellow)',    c: 31,  p: 1,    cb: 6,    f: 0.3 },
  { id: 'chard',             cat: 'veg', ar: 'سلق',                           en: 'Swiss chard',                 c: 19,  p: 1.8,  cb: 2.8,  f: 0.2 },
  { id: 'coriander_leaves',  cat: 'veg', ar: 'كزبرة خضرا',                    en: 'Fresh coriander',             c: 23,  p: 2.1,  cb: 2.8,  f: 0.5 },
  { id: 'pumpkin',           cat: 'veg', ar: 'قرع عسلي',                      en: 'Pumpkin',                     c: 26,  p: 1,    cb: 5.5,  f: 0.1 },
  { id: 'green_onion',       cat: 'veg', ar: 'بصل أخضر',                      en: 'Green onion',                 c: 32,  p: 1.8,  cb: 5.7,  f: 0.2 },
  { id: 'veg_sauteed',       cat: 'veg', ar: 'خضار سوتيه',                    en: 'Sauteed vegetables',          c: 60,  p: 1.8,  cb: 7,    f: 3 },
  { id: 'veg_mixed_boiled',  cat: 'veg', ar: 'خضار مشكل مسلوق',               en: 'Mixed vegetables, boiled',    c: 65,  p: 2.9,  cb: 13,   f: 0.2 },
  { id: 'fava_green',        cat: 'veg', ar: 'فول أخضر',                      en: 'Green fava beans',            c: 88,  p: 7.9,  cb: 12,   f: 0.7 },

  /* ---------------- دهون ومكسرات ---------------- */
  { id: 'lebb_abyad',        cat: 'fat', ar: 'لب أبيض',                       en: 'Watermelon seeds, roasted',   c: 557, p: 28,   cb: 15,   f: 47 },
  { id: 'mixed_nuts',        cat: 'fat', ar: 'مكسرات مشكلة',                  en: 'Mixed nuts',                  c: 607, p: 20,   cb: 21,   f: 54 },
  { id: 'almond_butter',     cat: 'fat', ar: 'زبدة لوز',                      en: 'Almond butter',               c: 614, p: 21,   cb: 19,   f: 56 },
  { id: 'hazelnut_spread',   cat: 'fat', ar: 'شوكولاتة بالبندق (نوتيلا)',     en: 'Chocolate hazelnut spread',   c: 539, p: 6.3,  cb: 57.5, f: 31 },
  { id: 'toum',              cat: 'fat', ar: 'تومية (صوص توم)',               en: 'Toum (garlic sauce)',         c: 600, p: 1,    cb: 5,    f: 64 },

  /* ---------------- أكلات مصرية وبيتي ---------------- */
  { id: 'mahshi_kousa',      cat: 'dish', ar: 'محشي كوسة',                    en: 'Stuffed zucchini',            c: 110, p: 2.5,  cb: 16,   f: 4 },
  { id: 'mahshi_felfel',     cat: 'dish', ar: 'محشي فلفل',                    en: 'Stuffed peppers',             c: 115, p: 2.5,  cb: 17,   f: 4 },
  { id: 'mahshi_betingan',   cat: 'dish', ar: 'محشي باذنجان',                 en: 'Stuffed eggplant',            c: 125, p: 2.4,  cb: 17,   f: 5.3 },
  { id: 'warak_enab_lahma',  cat: 'dish', ar: 'ورق عنب باللحمة',              en: 'Vine leaves with meat',       c: 170, p: 7,    cb: 16,   f: 8.5 },
  { id: 'molokhia_arnab',    cat: 'dish', ar: 'ملوخية بالأرانب',              en: 'Molokhia with rabbit',        c: 110, p: 10,   cb: 4,    f: 6 },
  { id: 'bamya_zeit',        cat: 'dish', ar: 'بامية بالصلصة (من غير لحمة)',  en: 'Okra in tomato sauce, no meat', c: 75, p: 2,    cb: 8,    f: 4 },
  { id: 'bisella_lahma',     cat: 'dish', ar: 'بسلة بالجزر واللحمة',          en: 'Peas & carrots with meat',    c: 110, p: 7,    cb: 9,    f: 5 },
  { id: 'fasolia_lahma',     cat: 'dish', ar: 'فاصوليا خضرا باللحمة',         en: 'Green beans with meat',       c: 95,  p: 6.5,  cb: 6,    f: 5 },
  { id: 'sabanekh_lahma',    cat: 'dish', ar: 'سبانخ باللحمة',                en: 'Spinach stew with meat',      c: 95,  p: 7,    cb: 4,    f: 5.8 },
  { id: 'kolkas_khodra',     cat: 'dish', ar: 'قلقاس بالخضرة',                en: 'Taro with chard',             c: 100, p: 3,    cb: 13,   f: 4 },
  { id: 'fasolia_beida_salsa', cat: 'dish', ar: 'فاصوليا بيضا بالصلصة',       en: 'White bean stew',             c: 120, p: 6,    cb: 16,   f: 3.5 },
  { id: 'moussaka_lahma',    cat: 'dish', ar: 'مسقعة باللحمة المفرومة',       en: 'Moussaka with minced meat',   c: 150, p: 6,    cb: 8,    f: 10.5 },
  { id: 'sinia_frakh_batates', cat: 'dish', ar: 'صينية فراخ بالبطاطس',        en: 'Oven chicken with potatoes',  c: 150, p: 11,   cb: 10,   f: 7.3 },
  { id: 'hamam_mahshi',      cat: 'dish', ar: 'حمام محشي',                    en: 'Stuffed pigeon',              c: 230, p: 14,   cb: 14,   f: 13.5 },
  { id: 'kofta_dawood_basha', cat: 'dish', ar: 'داوود باشا',                  en: 'Meatballs in tomato sauce',   c: 180, p: 11,   cb: 6,    f: 12.5 },
  { id: 'kofta_tahina',      cat: 'dish', ar: 'كفتة بالطحينة في الفرن',       en: 'Baked kofta with tahini',     c: 230, p: 14,   cb: 5,    f: 17 },
  { id: 'shish_tawook',      cat: 'dish', ar: 'شيش طاووق',                    en: 'Shish tawook',                c: 160, p: 23,   cb: 3,    f: 6 },
  { id: 'fish_singari',      cat: 'dish', ar: 'سمك سنجاري',                   en: 'Fish singari (baked)',        c: 120, p: 17,   cb: 4,    f: 4 },
  { id: 'shrimp_breaded',    cat: 'dish', ar: 'جمبري بانيه',                  en: 'Breaded shrimp, fried',       c: 240, p: 13,   cb: 18,   f: 13 },
  { id: 'roz_khalta',        cat: 'dish', ar: 'رز بالخلطة',                   en: 'Rice with liver & nuts',      c: 200, p: 6,    cb: 28,   f: 7 },
  { id: 'kawareh',           cat: 'dish', ar: 'كوارع',                        en: 'Cow trotters',                c: 120, p: 12,   cb: 0.5,  f: 8 },
  { id: 'foul_nabet',        cat: 'dish', ar: 'شوربة فول نابت',               en: 'Sprouted fava soup',          c: 70,  p: 5,    cb: 9,    f: 1.3 },
  { id: 'lentil_soup_cream', cat: 'dish', ar: 'شوربة عدس بالزبدة (مطاعم)',    en: 'Creamy lentil soup',          c: 95,  p: 4.5,  cb: 11,   f: 3.5 },
  { id: 'soup_lesan_asfour', cat: 'dish', ar: 'شوربة لسان عصفور',             en: 'Orzo soup',                   c: 60,  p: 3,    cb: 8,    f: 1.8 },
  { id: 'soup_vegetable',    cat: 'dish', ar: 'شوربة خضار',                   en: 'Vegetable soup',              c: 40,  p: 1.5,  cb: 6,    f: 1.2 },
  { id: 'feteer_meat',       cat: 'dish', ar: 'فطير باللحمة',                 en: 'Feteer with meat',            c: 300, p: 11,   cb: 27,   f: 16.5 },
  { id: 'goulash_meat',      cat: 'dish', ar: 'جلاش باللحمة',                 en: 'Goulash (phyllo) with meat',  c: 310, p: 10,   cb: 28,   f: 17.5 },
  { id: 'sambousek_cheese',  cat: 'dish', ar: 'سمبوسك جبنة',                  en: 'Cheese sambousek, fried',     c: 300, p: 9,    cb: 30,   f: 16 },

  /* ساندوتشات الشارع */
  { id: 'taameya_sandwich',  cat: 'dish', ar: 'ساندوتش طعمية',                en: 'Taameya sandwich',            c: 240, p: 8,    cb: 30,   f: 10 },
  { id: 'foul_sandwich',     cat: 'dish', ar: 'ساندوتش فول',                  en: 'Foul sandwich',               c: 190, p: 7,    cb: 30,   f: 5 },

  /* أكلات شامية وخليجية منتشرة في مصر */
  { id: 'hummus_dip',        cat: 'dish', ar: 'حمص بالطحينة',                 en: 'Hummus',                      c: 177, p: 7.9,  cb: 14.3, f: 9.6 },
  { id: 'tabbouleh',         cat: 'dish', ar: 'تبولة',                        en: 'Tabbouleh',                   c: 120, p: 2,    cb: 10,   f: 8 },
  { id: 'fattoush',          cat: 'dish', ar: 'فتوش',                         en: 'Fattoush',                    c: 90,  p: 1.8,  cb: 10,   f: 5 },
  { id: 'manakish_zaatar',   cat: 'dish', ar: 'مناقيش زعتر',                  en: 'Manakish with zaatar',        c: 350, p: 8,    cb: 45,   f: 15 },
  { id: 'kabsa_chicken',     cat: 'dish', ar: 'كبسة فراخ',                    en: 'Chicken kabsa',               c: 170, p: 10,   cb: 20,   f: 5.5 },
  { id: 'freekeh_chicken',   cat: 'dish', ar: 'فريك بالفراخ',                 en: 'Freekeh with chicken',        c: 165, p: 10,   cb: 18,   f: 6 },
  { id: 'mujaddara',         cat: 'dish', ar: 'مجدرة',                        en: 'Mujaddara (lentils & rice)',  c: 150, p: 5.5,  cb: 22,   f: 4.5 },

  /* وجبات سريعة */
  { id: 'fried_chicken',     cat: 'dish', ar: 'فراخ مقلية (بروستد)',          en: 'Fried chicken (broasted)',    c: 260, p: 19,   cb: 9,    f: 16.5 },
  { id: 'chicken_nuggets',   cat: 'dish', ar: 'ناجتس فراخ',                   en: 'Chicken nuggets',             c: 296, p: 15,   cb: 16,   f: 19 },
  { id: 'crispy_chicken_sandwich', cat: 'dish', ar: 'ساندوتش فراخ كريسبي',    en: 'Crispy chicken sandwich',     c: 250, p: 12,   cb: 25,   f: 11.5 },
  { id: 'cheeseburger',      cat: 'dish', ar: 'تشيز برجر',                    en: 'Cheeseburger',                c: 265, p: 14,   cb: 24,   f: 12.5 },
  { id: 'crepe_chicken',     cat: 'dish', ar: 'كريب فراخ',                    en: 'Chicken crepe',               c: 230, p: 12,   cb: 22,   f: 10.5 },
  { id: 'potato_chips',      cat: 'dish', ar: 'شيبسي',                        en: 'Potato chips',                c: 536, p: 7,    cb: 53,   f: 34 },

  /* حلويات */
  { id: 'qatayef',           cat: 'dish', ar: 'قطايف بالمكسرات',              en: 'Qatayef with nuts',           c: 330, p: 6,    cb: 45,   f: 14 },
  { id: 'luqmet_elqadi',     cat: 'dish', ar: 'لقمة القاضي (زلابية)',         en: 'Luqmet el-qadi',              c: 360, p: 4,    cb: 50,   f: 16 },
  { id: 'kahk',              cat: 'dish', ar: 'كحك العيد',                    en: 'Kahk (Eid cookies)',          c: 480, p: 6,    cb: 58,   f: 25 },
  { id: 'halawa_tahinia',    cat: 'dish', ar: 'حلاوة طحينية',                 en: 'Halawa (tahini halva)',       c: 530, p: 12,   cb: 55,   f: 30 },
  { id: 'belila',            cat: 'dish', ar: 'بليلة باللبن',                 en: 'Belila (wheat with milk)',    c: 130, p: 4,    cb: 22,   f: 3 },
  { id: 'khoshaf',           cat: 'dish', ar: 'خشاف',                         en: 'Khoshaf (dried fruit compote)', c: 110, p: 1.5, cb: 25,   f: 0.8 },

  /* ---------------- مشروبات ---------------- */
  { id: 'sobia',             cat: 'drink', ar: 'سوبيا',                       en: 'Sobia',                       c: 95,  p: 1.2,  cb: 19,   f: 1.6 },
  { id: 'karkade_sweet',     cat: 'drink', ar: 'كركديه بالسكر',               en: 'Hibiscus drink, sweetened',   c: 45,  p: 0,    cb: 11.5, f: 0 },
  { id: 'tamarind_drink',    cat: 'drink', ar: 'تمر هندي',                    en: 'Tamarind drink',              c: 60,  p: 0.1,  cb: 15,   f: 0 },
  { id: 'kharoub',           cat: 'drink', ar: 'خروب',                        en: 'Carob drink',                 c: 55,  p: 0.2,  cb: 14,   f: 0 },
  { id: 'erk_sous',          cat: 'drink', ar: 'عرقسوس',                      en: 'Licorice drink',              c: 26,  p: 0,    cb: 6.5,  f: 0 },
  { id: 'lemon_mint',        cat: 'drink', ar: 'ليمون بالنعناع',              en: 'Lemon mint juice',            c: 50,  p: 0.1,  cb: 12.5, f: 0 },
  { id: 'guava_juice',       cat: 'drink', ar: 'عصير جوافة',                  en: 'Guava juice',                 c: 57,  p: 0.3,  cb: 14,   f: 0.1 },
  { id: 'banana_milk',       cat: 'drink', ar: 'موز باللبن',                  en: 'Banana milkshake',            c: 85,  p: 3,    cb: 13,   f: 2.5 },
  { id: 'hummus_sham',       cat: 'drink', ar: 'حمص الشام',                   en: 'Hummus el-sham (hot chickpea drink)', c: 80, p: 3.5, cb: 12, f: 2 },
  { id: 'cappuccino',        cat: 'drink', ar: 'كابتشينو (بدون سكر)',         en: 'Cappuccino, no sugar',        c: 40,  p: 2.1,  cb: 3.3,  f: 2 },
  { id: 'latte',             cat: 'drink', ar: 'لاتيه (بدون سكر)',            en: 'Latte, no sugar',             c: 50,  p: 2.6,  cb: 4,    f: 2.6 },
  { id: 'turkish_coffee_sugar', cat: 'drink', ar: 'قهوة تركي مظبوط',          en: 'Turkish coffee, medium sugar', c: 28, p: 0.2,  cb: 6.8,  f: 0.1 },
  { id: 'tea_milk',          cat: 'drink', ar: 'شاي بلبن بسكر',               en: 'Milk tea with sugar',         c: 40,  p: 1.3,  cb: 6,    f: 1.2 },
  { id: 'green_tea',         cat: 'drink', ar: 'شاي أخضر',                    en: 'Green tea',                   c: 1,   p: 0.2,  cb: 0,    f: 0 },
  { id: 'sports_drink',      cat: 'drink', ar: 'مشروب رياضي (أملاح)',         en: 'Sports drink',                c: 26,  p: 0,    cb: 6.4,  f: 0 },

  /* ---------------- مكملات وأكل رياضي ---------------- */
  { id: 'protein_bar',       cat: 'supplement', ar: 'بروتين بار',             en: 'Protein bar',                 c: 350, p: 30,   cb: 35,   f: 10 },
  { id: 'whey_isolate',      cat: 'supplement', ar: 'واي أيزوليت',            en: 'Whey isolate',                c: 370, p: 88,   cb: 2,    f: 1 },
  { id: 'plant_protein',     cat: 'supplement', ar: 'بروتين نباتي',           en: 'Plant protein powder',        c: 380, p: 75,   cb: 8,    f: 6 },
  { id: 'energy_gel',        cat: 'supplement', ar: 'جل طاقة',                en: 'Energy gel',                  c: 256, p: 0,    cb: 64,   f: 0 }

];

/*
 * مقادير بيتية للأصناف الجديدة: [معرّف الوحدة, وزنها بالجرام]
 * نفس وحدات FOOD_UNITS في المكتبة الأساسية
 */
export const FOOD_SERVINGS_EXTRA = {
  /* بروتين */
  rabbit_cooked:     [['palm', 100], ['piece', 250]],
  chicken_wings:     [['piece', 35], ['plate', 200]],
  lamb_leg:          [['palm', 100], ['slice', 60]],
  beef_burger_patty: [['piece', 110]],
  turkey_smoked:     [['slice', 20]],
  fish_bass:         [['piece', 300], ['palm', 100]],
  fish_denis:        [['piece', 300], ['palm', 100]],
  tuna_oil:          [['can', 130]],
  feseekh:           [['piece', 150], ['palm', 100]],

  /* نشويات */
  semit:             [['piece', 90]],
  bread_shami_brown: [['loaf', 70]],
  bread_tortilla:    [['piece', 60]],
  bread_toast_brown: [['slice', 30]],
  rice_cakes:        [['piece', 9]],
  oats_water:        [['bowl', 240], ['cup', 234]],
  oats_milk:         [['bowl', 250], ['cup', 240]],
  oats_overnight:    [['cup', 240], ['bowl', 280]],
  granola:           [['cup', 120], ['tbsp', 8], ['handful', 30]],
  potato_oven:       [['plate', 200], ['cup', 150]],
  lupini:            [['cup', 166], ['handful', 40]],
  kidney_beans:      [['cup', 177], ['plate', 200]],
  molasses:          [['tbsp', 20], ['tsp', 7]],

  /* ألبان */
  mish:              [['tbsp', 20]],
  ayran:             [['glass', 250], ['can', 250]],
  cheese_halloumi:   [['slice', 30]],
  cheese_white_light:[['slice', 30], ['tbsp', 20]],
  milk_low_fat:      [['glass', 240], ['cup', 240]],
  milk_chocolate:    [['glass', 240], ['can', 250]],
  yogurt_low_fat:    [['piece', 170], ['cup', 245]],
  eshta:             [['tbsp', 15]],
  creme_caramel:     [['piece', 100]],

  /* فاكهة */
  mulberry:          [['cup', 140], ['handful', 50]],
  cherries:          [['cup', 138], ['handful', 60]],
  prickly_pear:      [['piece', 100]],
  persimmon:         [['piece', 170]],
  melon_shamam:      [['slice', 160], ['cup', 170]],
  grapefruit:        [['piece', 250]],
  dates_rotab:       [['piece', 15], ['handful', 60]],
  dried_figs:        [['piece', 20], ['handful', 40]],

  /* خضار */
  pepper_colored:    [['piece', 120], ['cup', 150]],
  chard:             [['cup', 36], ['plate', 150]],
  coriander_leaves:  [['cup', 16], ['tbsp', 1]],
  pumpkin:           [['cup', 116], ['slice', 150]],
  green_onion:       [['piece', 15], ['cup', 100]],
  veg_sauteed:       [['cup', 150], ['plate', 200]],
  veg_mixed_boiled:  [['cup', 180], ['plate', 200]],
  fava_green:        [['cup', 150], ['plate', 200]],

  /* دهون ومكسرات */
  lebb_abyad:        [['handful', 30], ['tbsp', 10]],
  mixed_nuts:        [['handful', 30]],
  almond_butter:     [['tbsp', 16], ['thumb', 12]],
  hazelnut_spread:   [['tbsp', 19], ['tsp', 7]],
  toum:              [['tbsp', 15], ['tsp', 5]],

  /* أكلات */
  mahshi_kousa:      [['piece', 70], ['plate', 250]],
  mahshi_felfel:     [['piece', 150], ['plate', 250]],
  mahshi_betingan:   [['piece', 80], ['plate', 250]],
  warak_enab_lahma:  [['piece', 15], ['plate', 250]],
  molokhia_arnab:    [['plate', 350], ['bowl', 300]],
  bamya_zeit:        [['plate', 250], ['bowl', 250]],
  bisella_lahma:     [['plate', 250], ['bowl', 250]],
  fasolia_lahma:     [['plate', 250], ['bowl', 250]],
  sabanekh_lahma:    [['plate', 250], ['bowl', 250]],
  kolkas_khodra:     [['plate', 250], ['bowl', 250]],
  fasolia_beida_salsa: [['plate', 250], ['bowl', 250]],
  moussaka_lahma:    [['plate', 250]],
  sinia_frakh_batates: [['plate', 350]],
  hamam_mahshi:      [['piece', 300]],
  kofta_dawood_basha:[['piece', 30], ['plate', 250]],
  kofta_tahina:      [['plate', 250]],
  shish_tawook:      [['piece', 30], ['plate', 200], ['sandwich', 180]],
  fish_singari:      [['plate', 300]],
  shrimp_breaded:    [['piece', 20], ['plate', 200]],
  roz_khalta:        [['plate', 250], ['cup', 160]],
  kawareh:           [['bowl', 300], ['plate', 300]],
  foul_nabet:        [['bowl', 300]],
  lentil_soup_cream: [['bowl', 250]],
  soup_lesan_asfour: [['bowl', 250]],
  soup_vegetable:    [['bowl', 250]],
  feteer_meat:       [['slice', 100], ['piece', 300]],
  goulash_meat:      [['slice', 120], ['plate', 200]],
  sambousek_cheese:  [['piece', 30]],
  taameya_sandwich:  [['sandwich', 180]],
  foul_sandwich:     [['sandwich', 170]],
  hummus_dip:        [['tbsp', 30], ['plate', 150]],
  tabbouleh:         [['plate', 150], ['cup', 160]],
  fattoush:          [['plate', 200]],
  manakish_zaatar:   [['piece', 110]],
  kabsa_chicken:     [['plate', 400]],
  freekeh_chicken:   [['plate', 350]],
  mujaddara:         [['plate', 300], ['cup', 200]],
  fried_chicken:     [['piece', 130], ['plate', 300]],
  chicken_nuggets:   [['piece', 18]],
  crispy_chicken_sandwich: [['sandwich', 210]],
  cheeseburger:      [['sandwich', 200]],
  crepe_chicken:     [['piece', 300]],
  potato_chips:      [['piece', 40], ['handful', 25]],
  qatayef:           [['piece', 45]],
  luqmet_elqadi:     [['piece', 12], ['plate', 150]],
  kahk:              [['piece', 40]],
  halawa_tahinia:    [['tbsp', 25], ['slice', 40]],
  belila:            [['bowl', 250]],
  khoshaf:           [['bowl', 250], ['cup', 240]],

  /* مشروبات */
  sobia:             [['glass', 250]],
  karkade_sweet:     [['glass', 250]],
  tamarind_drink:    [['glass', 250]],
  kharoub:           [['glass', 250]],
  erk_sous:          [['glass', 250]],
  lemon_mint:        [['glass', 250]],
  guava_juice:       [['glass', 250]],
  banana_milk:       [['glass', 300]],
  hummus_sham:       [['cup', 200], ['glass', 250]],
  cappuccino:        [['cup', 240]],
  latte:             [['cup', 300]],
  turkish_coffee_sugar: [['cup', 70]],
  tea_milk:          [['glass', 240]],
  green_tea:         [['glass', 240], ['cup', 240]],
  sports_drink:      [['can', 500], ['glass', 250]],

  /* مكملات */
  protein_bar:       [['piece', 60]],
  whey_isolate:      [['scoop', 30]],
  plant_protein:     [['scoop', 33]],
  energy_gel:        [['piece', 40]]
};
