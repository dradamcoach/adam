/*
 * ADAM — مكتبة الأغذية المبدئية
 *
 * كل القيم لكل 100 جرام (أو 100 مل للسوائل).
 *
 * ⚠️ ملاحظة مهنية:
 * - الأصناف المفردة (فراخ، رز، بيض...) قيمها قياسية ومنشورة.
 * - الأكلات المركبة (كشري، ملوخية، فول...) بتختلف كتير حسب طريقة
 *   التحضير والزيت المستخدم — فاعتبرها تقديرات وعدّلها حسب وصفتك.
 * - أي صنف تقدر تعدّله من داخل التطبيق، والتعديل بيتحفظ ليك.
 *
 * c = سعرات | p = بروتين | cb = كربوهيدرات | f = دهون  (جرام/100جم)
 */

export const FOOD_CATEGORIES = {
  protein:    { ar: 'بروتين',        en: 'Protein' },
  carb:       { ar: 'نشويات',        en: 'Carbs' },
  dairy:      { ar: 'ألبان',         en: 'Dairy' },
  fruit:      { ar: 'فاكهة',         en: 'Fruit' },
  veg:        { ar: 'خضار',          en: 'Vegetables' },
  fat:        { ar: 'دهون ومكسرات',  en: 'Fats & nuts' },
  dish:       { ar: 'أكلات مصرية',   en: 'Egyptian dishes' },
  drink:      { ar: 'مشروبات',       en: 'Drinks' },
  supplement: { ar: 'مكملات',        en: 'Supplements' }
};

export const FOOD_LIBRARY = [

  /* ---------------- بروتين ---------------- */
  { id: 'chicken_breast',   cat: 'protein', ar: 'صدور فراخ (مسلوق/مشوي)', en: 'Chicken breast, cooked', c: 165, p: 31,   cb: 0,    f: 3.6 },
  { id: 'chicken_thigh',    cat: 'protein', ar: 'ورك فراخ بدون جلد',       en: 'Chicken thigh, skinless', c: 209, p: 26,   cb: 0,    f: 10.9 },
  { id: 'chicken_whole',    cat: 'protein', ar: 'فرخة كاملة بالجلد',       en: 'Whole chicken with skin', c: 239, p: 27,   cb: 0,    f: 14 },
  { id: 'beef_lean',        cat: 'protein', ar: 'لحمة بقري قليلة الدهن',   en: 'Lean beef, cooked',       c: 250, p: 26,   cb: 0,    f: 15 },
  { id: 'beef_mince',       cat: 'protein', ar: 'لحمة مفرومة',             en: 'Minced beef',             c: 254, p: 26,   cb: 0,    f: 16 },
  { id: 'veal',             cat: 'protein', ar: 'بتلو',                    en: 'Veal',                    c: 172, p: 31,   cb: 0,    f: 4.6 },
  { id: 'liver_beef',       cat: 'protein', ar: 'كبدة بقري',               en: 'Beef liver',              c: 175, p: 27,   cb: 5,    f: 4.7 },
  { id: 'fish_tilapia',     cat: 'protein', ar: 'سمك بلطي',                en: 'Tilapia',                 c: 129, p: 26,   cb: 0,    f: 2.7 },
  { id: 'fish_salmon',      cat: 'protein', ar: 'سلمون',                   en: 'Salmon',                  c: 208, p: 20,   cb: 0,    f: 13 },
  { id: 'fish_tuna_can',    cat: 'protein', ar: 'تونة في الماء (مصفّاة)',  en: 'Tuna in water, drained',  c: 116, p: 26,   cb: 0,    f: 0.8 },
  { id: 'shrimp',           cat: 'protein', ar: 'جمبري',                   en: 'Shrimp',                  c: 99,  p: 24,   cb: 0.2,  f: 0.3 },
  { id: 'egg_whole',        cat: 'protein', ar: 'بيض كامل',                en: 'Whole egg',               c: 143, p: 12.6, cb: 0.7,  f: 9.5 },
  { id: 'egg_white',        cat: 'protein', ar: 'بياض بيض',                en: 'Egg white',               c: 52,  p: 11,   cb: 0.7,  f: 0.2 },
  { id: 'turkey_breast',    cat: 'protein', ar: 'صدور تركي',               en: 'Turkey breast',           c: 135, p: 30,   cb: 0,    f: 1 },

  /* ---------------- نشويات ---------------- */
  { id: 'rice_white',       cat: 'carb', ar: 'رز أبيض مطبوخ',        en: 'White rice, cooked',    c: 130, p: 2.7, cb: 28,   f: 0.3 },
  { id: 'rice_brown',       cat: 'carb', ar: 'رز بني مطبوخ',         en: 'Brown rice, cooked',    c: 123, p: 2.7, cb: 26,   f: 1 },
  { id: 'pasta_cooked',     cat: 'carb', ar: 'مكرونة مسلوقة',        en: 'Pasta, cooked',         c: 158, p: 5.8, cb: 31,   f: 0.9 },
  { id: 'bread_baladi',     cat: 'carb', ar: 'عيش بلدي',             en: 'Baladi bread',          c: 246, p: 8.5, cb: 50,   f: 1.5 },
  { id: 'bread_fino',       cat: 'carb', ar: 'عيش فينو',             en: 'White bread roll',      c: 265, p: 9,   cb: 49,   f: 3.2 },
  { id: 'bread_brown',      cat: 'carb', ar: 'عيش سن/أسمر',          en: 'Brown bread',           c: 247, p: 13,  cb: 41,   f: 3.4 },
  { id: 'oats',             cat: 'carb', ar: 'شوفان (جاف)',          en: 'Oats, dry',             c: 389, p: 17,  cb: 66,   f: 7 },
  { id: 'potato',           cat: 'carb', ar: 'بطاطس مسلوقة',         en: 'Potato, boiled',        c: 87,  p: 2,   cb: 20,   f: 0.1 },
  { id: 'sweet_potato',     cat: 'carb', ar: 'بطاطا',                en: 'Sweet potato',          c: 86,  p: 1.6, cb: 20,   f: 0.1 },
  { id: 'lentils',          cat: 'carb', ar: 'عدس مطبوخ',            en: 'Lentils, cooked',       c: 116, p: 9,   cb: 20,   f: 0.4 },
  { id: 'chickpeas',        cat: 'carb', ar: 'حمص مطبوخ',            en: 'Chickpeas, cooked',     c: 164, p: 8.9, cb: 27,   f: 2.6 },
  { id: 'fava_beans',       cat: 'carb', ar: 'فول مدمس (بدون زيت)',  en: 'Fava beans, plain',     c: 110, p: 7.6, cb: 19,   f: 0.4 },
  { id: 'white_beans',      cat: 'carb', ar: 'فاصوليا بيضاء',        en: 'White beans',           c: 139, p: 9.7, cb: 25,   f: 0.5 },
  { id: 'corn',             cat: 'carb', ar: 'ذرة',                  en: 'Corn',                  c: 96,  p: 3.4, cb: 21,   f: 1.5 },
  { id: 'freekeh',          cat: 'carb', ar: 'فريك مطبوخ',           en: 'Freekeh, cooked',       c: 132, p: 5,   cb: 26,   f: 1 },

  /* ---------------- ألبان ---------------- */
  { id: 'milk_full',        cat: 'dairy', ar: 'لبن كامل الدسم',      en: 'Whole milk',            c: 61,  p: 3.2,  cb: 4.8, f: 3.3 },
  { id: 'milk_skim',        cat: 'dairy', ar: 'لبن خالي الدسم',      en: 'Skim milk',             c: 34,  p: 3.4,  cb: 5,   f: 0.1 },
  { id: 'yogurt_plain',     cat: 'dairy', ar: 'زبادي عادي',          en: 'Plain yogurt',          c: 61,  p: 3.5,  cb: 4.7, f: 3.3 },
  { id: 'yogurt_greek',     cat: 'dairy', ar: 'زبادي يوناني',        en: 'Greek yogurt',          c: 59,  p: 10,   cb: 3.6, f: 0.4 },
  { id: 'cheese_white',     cat: 'dairy', ar: 'جبنة بيضاء',          en: 'White cheese',          c: 264, p: 14,   cb: 4,   f: 21 },
  { id: 'cheese_qarish',    cat: 'dairy', ar: 'جبنة قريش',           en: 'Qarish cheese',         c: 98,  p: 11,   cb: 3.4, f: 4.3 },
  { id: 'cheese_roumy',     cat: 'dairy', ar: 'جبنة رومي',           en: 'Roumy cheese',          c: 393, p: 25,   cb: 1.3, f: 32 },
  { id: 'cottage_cheese',   cat: 'dairy', ar: 'جبنة كوتاج',          en: 'Cottage cheese',        c: 98,  p: 11,   cb: 3.4, f: 4.3 },
  { id: 'labneh',           cat: 'dairy', ar: 'لبنة',                en: 'Labneh',                c: 174, p: 7.7,  cb: 5,   f: 14 },

  /* ---------------- فاكهة ---------------- */
  { id: 'banana',           cat: 'fruit', ar: 'موز',        en: 'Banana',       c: 89,  p: 1.1, cb: 23,  f: 0.3 },
  { id: 'apple',            cat: 'fruit', ar: 'تفاح',       en: 'Apple',        c: 52,  p: 0.3, cb: 14,  f: 0.2 },
  { id: 'orange',           cat: 'fruit', ar: 'برتقال',     en: 'Orange',       c: 47,  p: 0.9, cb: 12,  f: 0.1 },
  { id: 'dates',            cat: 'fruit', ar: 'بلح',        en: 'Dates',        c: 282, p: 2.5, cb: 75,  f: 0.4 },
  { id: 'grapes',           cat: 'fruit', ar: 'عنب',        en: 'Grapes',       c: 69,  p: 0.7, cb: 18,  f: 0.2 },
  { id: 'mango',            cat: 'fruit', ar: 'مانجو',      en: 'Mango',        c: 60,  p: 0.8, cb: 15,  f: 0.4 },
  { id: 'watermelon',       cat: 'fruit', ar: 'بطيخ',       en: 'Watermelon',   c: 30,  p: 0.6, cb: 8,   f: 0.2 },
  { id: 'strawberry',       cat: 'fruit', ar: 'فراولة',     en: 'Strawberry',   c: 32,  p: 0.7, cb: 8,   f: 0.3 },
  { id: 'guava',            cat: 'fruit', ar: 'جوافة',      en: 'Guava',        c: 68,  p: 2.6, cb: 14,  f: 1 },
  { id: 'figs',             cat: 'fruit', ar: 'تين',        en: 'Figs',         c: 74,  p: 0.8, cb: 19,  f: 0.3 },

  /* ---------------- خضار ---------------- */
  { id: 'cucumber',         cat: 'veg', ar: 'خيار',              en: 'Cucumber',       c: 15,  p: 0.7, cb: 3.6, f: 0.1 },
  { id: 'tomato',           cat: 'veg', ar: 'طماطم',             en: 'Tomato',         c: 18,  p: 0.9, cb: 3.9, f: 0.2 },
  { id: 'lettuce',          cat: 'veg', ar: 'خس',                en: 'Lettuce',        c: 15,  p: 1.4, cb: 2.9, f: 0.2 },
  { id: 'broccoli',         cat: 'veg', ar: 'بروكلي',            en: 'Broccoli',       c: 34,  p: 2.8, cb: 7,   f: 0.4 },
  { id: 'spinach',          cat: 'veg', ar: 'سبانخ',             en: 'Spinach',        c: 23,  p: 2.9, cb: 3.6, f: 0.4 },
  { id: 'carrot',           cat: 'veg', ar: 'جزر',               en: 'Carrot',         c: 41,  p: 0.9, cb: 10,  f: 0.2 },
  { id: 'green_beans',      cat: 'veg', ar: 'فاصوليا خضراء',     en: 'Green beans',    c: 31,  p: 1.8, cb: 7,   f: 0.1 },
  { id: 'peas',             cat: 'veg', ar: 'بسلة',              en: 'Green peas',     c: 81,  p: 5.4, cb: 14,  f: 0.4 },
  { id: 'okra',             cat: 'veg', ar: 'بامية',             en: 'Okra',           c: 33,  p: 1.9, cb: 7,   f: 0.2 },
  { id: 'eggplant',         cat: 'veg', ar: 'باذنجان',           en: 'Eggplant',       c: 25,  p: 1,   cb: 6,   f: 0.2 },
  { id: 'zucchini',         cat: 'veg', ar: 'كوسة',              en: 'Zucchini',       c: 17,  p: 1.2, cb: 3.1, f: 0.3 },
  { id: 'onion',            cat: 'veg', ar: 'بصل',               en: 'Onion',          c: 40,  p: 1.1, cb: 9,   f: 0.1 },
  { id: 'pepper_green',     cat: 'veg', ar: 'فلفل أخضر',         en: 'Green pepper',   c: 20,  p: 0.9, cb: 4.6, f: 0.2 },

  /* ---------------- دهون ومكسرات ---------------- */
  { id: 'olive_oil',        cat: 'fat', ar: 'زيت زيتون',        en: 'Olive oil',       c: 884, p: 0,    cb: 0,  f: 100 },
  { id: 'sunflower_oil',    cat: 'fat', ar: 'زيت عباد الشمس',   en: 'Sunflower oil',   c: 884, p: 0,    cb: 0,  f: 100 },
  { id: 'butter',           cat: 'fat', ar: 'زبدة',             en: 'Butter',          c: 717, p: 0.9,  cb: 0.1,f: 81 },
  { id: 'ghee',             cat: 'fat', ar: 'سمنة',             en: 'Ghee',            c: 900, p: 0,    cb: 0,  f: 100 },
  { id: 'tahina',           cat: 'fat', ar: 'طحينة',            en: 'Tahini',          c: 595, p: 17,   cb: 21, f: 54 },
  { id: 'peanut_butter',    cat: 'fat', ar: 'زبدة فول سوداني',  en: 'Peanut butter',   c: 588, p: 25,   cb: 20, f: 50 },
  { id: 'almonds',          cat: 'fat', ar: 'لوز',              en: 'Almonds',         c: 579, p: 21,   cb: 22, f: 50 },
  { id: 'walnuts',          cat: 'fat', ar: 'عين جمل',          en: 'Walnuts',         c: 654, p: 15,   cb: 14, f: 65 },
  { id: 'peanuts',          cat: 'fat', ar: 'فول سوداني',       en: 'Peanuts',         c: 567, p: 26,   cb: 16, f: 49 },
  { id: 'avocado',          cat: 'fat', ar: 'أفوكادو',          en: 'Avocado',         c: 160, p: 2,    cb: 9,  f: 15 },
  { id: 'olives',           cat: 'fat', ar: 'زيتون',            en: 'Olives',          c: 115, p: 0.8,  cb: 6,  f: 11 },

  /* ---------------- أكلات مصرية (تقديرية) ---------------- */
  { id: 'koshari',          cat: 'dish', ar: 'كشري (بالصلصة)',      en: 'Koshari with sauce',      c: 165, p: 5,   cb: 30,  f: 3 },
  { id: 'foul_oil',         cat: 'dish', ar: 'فول بالزيت',          en: 'Foul with oil',           c: 160, p: 7,   cb: 19,  f: 6.5 },
  { id: 'taameya',          cat: 'dish', ar: 'طعمية (مقلية)',       en: 'Taameya (falafel)',       c: 333, p: 13,  cb: 32,  f: 18 },
  { id: 'molokhia',         cat: 'dish', ar: 'ملوخية',              en: 'Molokhia',                c: 78,  p: 4,   cb: 6,   f: 4 },
  { id: 'mahshi',           cat: 'dish', ar: 'محشي كرنب/ورق عنب',   en: 'Stuffed vine leaves',     c: 155, p: 3,   cb: 22,  f: 6 },
  { id: 'bechamel',         cat: 'dish', ar: 'مكرونة بشاميل',       en: 'Bechamel pasta',          c: 200, p: 8,   cb: 21,  f: 9.5 },
  { id: 'roz_meammar',      cat: 'dish', ar: 'رز معمر',             en: 'Roz meammar',             c: 210, p: 5,   cb: 26,  f: 9.5 },
  { id: 'shawarma_chicken', cat: 'dish', ar: 'شاورما فراخ',         en: 'Chicken shawarma',        c: 190, p: 17,  cb: 6,   f: 11 },
  { id: 'kofta',            cat: 'dish', ar: 'كفتة مشوية',          en: 'Grilled kofta',           c: 240, p: 19,  cb: 3,   f: 17 },
  { id: 'hawawshi',         cat: 'dish', ar: 'حواوشي',              en: 'Hawawshi',                c: 270, p: 14,  cb: 26,  f: 12 },
  { id: 'besara',           cat: 'dish', ar: 'بصارة',               en: 'Bessara',                 c: 130, p: 6,   cb: 16,  f: 4.5 },
  { id: 'baba_ghanoush',    cat: 'dish', ar: 'بابا غنوج',           en: 'Baba ghanoush',           c: 130, p: 3,   cb: 9,   f: 9.5 },
  { id: 'salata_baladi',    cat: 'dish', ar: 'سلطة بلدي',           en: 'Baladi salad',            c: 35,  p: 1.2, cb: 6,   f: 1 },

  /* ---------------- مشروبات ---------------- */
  { id: 'water',            cat: 'drink', ar: 'مياه',                en: 'Water',                c: 0,   p: 0,   cb: 0,   f: 0 },
  { id: 'tea_plain',        cat: 'drink', ar: 'شاي بدون سكر',        en: 'Tea, no sugar',        c: 1,   p: 0,   cb: 0.3, f: 0 },
  { id: 'coffee_plain',     cat: 'drink', ar: 'قهوة سادة',           en: 'Coffee, black',        c: 2,   p: 0.1, cb: 0,   f: 0 },
  { id: 'orange_juice',     cat: 'drink', ar: 'عصير برتقال طبيعي',   en: 'Fresh orange juice',   c: 45,  p: 0.7, cb: 10,  f: 0.2 },
  { id: 'soft_drink',       cat: 'drink', ar: 'مشروب غازي',          en: 'Soft drink',           c: 42,  p: 0,   cb: 11,  f: 0 },
  { id: 'sugar',            cat: 'drink', ar: 'سكر',                 en: 'Sugar',                c: 387, p: 0,   cb: 100, f: 0 },
  { id: 'honey',            cat: 'drink', ar: 'عسل نحل',             en: 'Honey',                c: 304, p: 0.3, cb: 82,  f: 0 },

  /* ---------------- مكملات ---------------- */
  { id: 'whey',             cat: 'supplement', ar: 'بروتين واي',     en: 'Whey protein',    c: 400, p: 80, cb: 8,  f: 6 },
  { id: 'casein',           cat: 'supplement', ar: 'كازين',          en: 'Casein protein',  c: 370, p: 78, cb: 7,  f: 3 },
  { id: 'mass_gainer',      cat: 'supplement', ar: 'ماس جينر',       en: 'Mass gainer',     c: 380, p: 20, cb: 65, f: 4 },
  { id: 'creatine',         cat: 'supplement', ar: 'كرياتين',        en: 'Creatine',        c: 0,   p: 0,  cb: 0,  f: 0 }

];