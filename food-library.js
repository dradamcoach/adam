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
  { id: 'chicken_breast',   icon: '🍗', cat: 'protein', ar: 'صدور فراخ (مسلوق/مشوي)', en: 'Chicken breast, cooked', c: 165, p: 31,   cb: 0,    f: 3.6 },
  { id: 'chicken_thigh',    icon: '🍗', cat: 'protein', ar: 'ورك فراخ بدون جلد',       en: 'Chicken thigh, skinless', c: 209, p: 26,   cb: 0,    f: 10.9 },
  { id: 'chicken_whole',    icon: '🐔', cat: 'protein', ar: 'فرخة كاملة بالجلد',       en: 'Whole chicken with skin', c: 239, p: 27,   cb: 0,    f: 14 },
  { id: 'beef_lean',        icon: '🥩', cat: 'protein', ar: 'لحمة بقري قليلة الدهن',   en: 'Lean beef, cooked',       c: 250, p: 26,   cb: 0,    f: 15 },
  { id: 'beef_mince',       icon: '🥩', cat: 'protein', ar: 'لحمة مفرومة',             en: 'Minced beef',             c: 254, p: 26,   cb: 0,    f: 16 },
  { id: 'veal',             icon: '🥩', cat: 'protein', ar: 'بتلو',                    en: 'Veal',                    c: 172, p: 31,   cb: 0,    f: 4.6 },
  { id: 'liver_beef',       icon: '🥩', cat: 'protein', ar: 'كبدة بقري',               en: 'Beef liver',              c: 175, p: 27,   cb: 5,    f: 4.7 },
  { id: 'fish_tilapia',     icon: '🐟', cat: 'protein', ar: 'سمك بلطي',                en: 'Tilapia',                 c: 129, p: 26,   cb: 0,    f: 2.7 },
  { id: 'fish_salmon',      icon: '🐟', cat: 'protein', ar: 'سلمون',                   en: 'Salmon',                  c: 208, p: 20,   cb: 0,    f: 13 },
  { id: 'fish_tuna_can',    icon: '🐟', cat: 'protein', ar: 'تونة في الماء (مصفّاة)',  en: 'Tuna in water, drained',  c: 116, p: 26,   cb: 0,    f: 0.8 },
  { id: 'shrimp',           icon: '🦐', cat: 'protein', ar: 'جمبري',                   en: 'Shrimp',                  c: 99,  p: 24,   cb: 0.2,  f: 0.3 },
  { id: 'egg_whole',        icon: '🥚', cat: 'protein', ar: 'بيض كامل',                en: 'Whole egg',               c: 143, p: 12.6, cb: 0.7,  f: 9.5 },
  { id: 'egg_white',        icon: '🥚', cat: 'protein', ar: 'بياض بيض',                en: 'Egg white',               c: 52,  p: 11,   cb: 0.7,  f: 0.2 },
  { id: 'turkey_breast',    icon: '🦃', cat: 'protein', ar: 'صدور تركي',               en: 'Turkey breast',           c: 135, p: 30,   cb: 0,    f: 1 },

  /* ---------------- نشويات ---------------- */
  { id: 'rice_white',       icon: '🍚', cat: 'carb', ar: 'رز أبيض مطبوخ',        en: 'White rice, cooked',    c: 130, p: 2.7, cb: 28,   f: 0.3 },
  { id: 'rice_brown',       icon: '🍚', cat: 'carb', ar: 'رز بني مطبوخ',         en: 'Brown rice, cooked',    c: 123, p: 2.7, cb: 26,   f: 1 },
  { id: 'pasta_cooked',     icon: '🍝', cat: 'carb', ar: 'مكرونة مسلوقة',        en: 'Pasta, cooked',         c: 158, p: 5.8, cb: 31,   f: 0.9 },
  { id: 'bread_baladi',     icon: '🥖', cat: 'carb', ar: 'عيش بلدي',             en: 'Baladi bread',          c: 246, p: 8.5, cb: 50,   f: 1.5 },
  { id: 'bread_fino',       icon: '🥖', cat: 'carb', ar: 'عيش فينو',             en: 'White bread roll',      c: 265, p: 9,   cb: 49,   f: 3.2 },
  { id: 'bread_brown',      icon: '🍞', cat: 'carb', ar: 'عيش سن/أسمر',          en: 'Brown bread',           c: 247, p: 13,  cb: 41,   f: 3.4 },
  { id: 'oats',             icon: '🥣', cat: 'carb', ar: 'شوفان (جاف)',          en: 'Oats, dry',             c: 389, p: 17,  cb: 66,   f: 7 },
  { id: 'potato',           icon: '🥔', cat: 'carb', ar: 'بطاطس مسلوقة',         en: 'Potato, boiled',        c: 87,  p: 2,   cb: 20,   f: 0.1 },
  { id: 'sweet_potato',     icon: '🍠', cat: 'carb', ar: 'بطاطا',                en: 'Sweet potato',          c: 86,  p: 1.6, cb: 20,   f: 0.1 },
  { id: 'lentils',          icon: '🍲', cat: 'carb', ar: 'عدس مطبوخ',            en: 'Lentils, cooked',       c: 116, p: 9,   cb: 20,   f: 0.4 },
  { id: 'chickpeas',        icon: '🫘', cat: 'carb', ar: 'حمص مطبوخ',            en: 'Chickpeas, cooked',     c: 164, p: 8.9, cb: 27,   f: 2.6 },
  { id: 'fava_beans',       icon: '🫘', cat: 'carb', ar: 'فول مدمس (بدون زيت)',  en: 'Fava beans, plain',     c: 110, p: 7.6, cb: 19,   f: 0.4 },
  { id: 'white_beans',      icon: '🫘', cat: 'carb', ar: 'فاصوليا بيضاء',        en: 'White beans',           c: 139, p: 9.7, cb: 25,   f: 0.5 },
  { id: 'corn',             icon: '🌽', cat: 'carb', ar: 'ذرة',                  en: 'Corn',                  c: 96,  p: 3.4, cb: 21,   f: 1.5 },
  { id: 'freekeh',          icon: '🌾', cat: 'carb', ar: 'فريك مطبوخ',           en: 'Freekeh, cooked',       c: 132, p: 5,   cb: 26,   f: 1 },

  /* ---------------- ألبان ---------------- */
  { id: 'milk_full',        icon: '🥛', cat: 'dairy', ar: 'لبن كامل الدسم',      en: 'Whole milk',            c: 61,  p: 3.2,  cb: 4.8, f: 3.3 },
  { id: 'milk_skim',        icon: '🥛', cat: 'dairy', ar: 'لبن خالي الدسم',      en: 'Skim milk',             c: 34,  p: 3.4,  cb: 5,   f: 0.1 },
  { id: 'yogurt_plain',     icon: '🥣', cat: 'dairy', ar: 'زبادي عادي',          en: 'Plain yogurt',          c: 61,  p: 3.5,  cb: 4.7, f: 3.3 },
  { id: 'yogurt_greek',     icon: '🥣', cat: 'dairy', ar: 'زبادي يوناني',        en: 'Greek yogurt',          c: 59,  p: 10,   cb: 3.6, f: 0.4 },
  { id: 'cheese_white',     icon: '🧀', cat: 'dairy', ar: 'جبنة بيضاء',          en: 'White cheese',          c: 264, p: 14,   cb: 4,   f: 21 },
  { id: 'cheese_qarish',    icon: '🧀', cat: 'dairy', ar: 'جبنة قريش',           en: 'Qarish cheese',         c: 98,  p: 11,   cb: 3.4, f: 4.3 },
  { id: 'cheese_roumy',     icon: '🧀', cat: 'dairy', ar: 'جبنة رومي',           en: 'Roumy cheese',          c: 393, p: 25,   cb: 1.3, f: 32 },
  { id: 'cottage_cheese',   icon: '🧀', cat: 'dairy', ar: 'جبنة كوتاج',          en: 'Cottage cheese',        c: 98,  p: 11,   cb: 3.4, f: 4.3 },
  { id: 'labneh',           icon: '🥣', cat: 'dairy', ar: 'لبنة',                en: 'Labneh',                c: 174, p: 7.7,  cb: 5,   f: 14 },

  /* ---------------- فاكهة ---------------- */
  { id: 'banana',           icon: '🍌', cat: 'fruit', ar: 'موز',        en: 'Banana',       c: 89,  p: 1.1, cb: 23,  f: 0.3 },
  { id: 'apple',            icon: '🍎', cat: 'fruit', ar: 'تفاح',       en: 'Apple',        c: 52,  p: 0.3, cb: 14,  f: 0.2 },
  { id: 'orange',           icon: '🍊', cat: 'fruit', ar: 'برتقال',     en: 'Orange',       c: 47,  p: 0.9, cb: 12,  f: 0.1 },
  { id: 'dates',            icon: '🌴', cat: 'fruit', ar: 'بلح',        en: 'Dates',        c: 282, p: 2.5, cb: 75,  f: 0.4 },
  { id: 'grapes',           icon: '🍇', cat: 'fruit', ar: 'عنب',        en: 'Grapes',       c: 69,  p: 0.7, cb: 18,  f: 0.2 },
  { id: 'mango',            icon: '🥭', cat: 'fruit', ar: 'مانجو',      en: 'Mango',        c: 60,  p: 0.8, cb: 15,  f: 0.4 },
  { id: 'watermelon',       icon: '🍉', cat: 'fruit', ar: 'بطيخ',       en: 'Watermelon',   c: 30,  p: 0.6, cb: 8,   f: 0.2 },
  { id: 'strawberry',       icon: '🍓', cat: 'fruit', ar: 'فراولة',     en: 'Strawberry',   c: 32,  p: 0.7, cb: 8,   f: 0.3 },
  { id: 'guava',            icon: '🍐', cat: 'fruit', ar: 'جوافة',      en: 'Guava',        c: 68,  p: 2.6, cb: 14,  f: 1 },
  { id: 'figs',             icon: '🫒', cat: 'fruit', ar: 'تين',        en: 'Figs',         c: 74,  p: 0.8, cb: 19,  f: 0.3 },

  /* ---------------- خضار ---------------- */
  { id: 'cucumber',         icon: '🥒', cat: 'veg', ar: 'خيار',              en: 'Cucumber',       c: 15,  p: 0.7, cb: 3.6, f: 0.1 },
  { id: 'tomato',           icon: '🍅', cat: 'veg', ar: 'طماطم',             en: 'Tomato',         c: 18,  p: 0.9, cb: 3.9, f: 0.2 },
  { id: 'lettuce',          icon: '🥬', cat: 'veg', ar: 'خس',                en: 'Lettuce',        c: 15,  p: 1.4, cb: 2.9, f: 0.2 },
  { id: 'broccoli',         icon: '🥦', cat: 'veg', ar: 'بروكلي',            en: 'Broccoli',       c: 34,  p: 2.8, cb: 7,   f: 0.4 },
  { id: 'spinach',          icon: '🥬', cat: 'veg', ar: 'سبانخ',             en: 'Spinach',        c: 23,  p: 2.9, cb: 3.6, f: 0.4 },
  { id: 'carrot',           icon: '🥕', cat: 'veg', ar: 'جزر',               en: 'Carrot',         c: 41,  p: 0.9, cb: 10,  f: 0.2 },
  { id: 'green_beans',      icon: '🫛', cat: 'veg', ar: 'فاصوليا خضراء',     en: 'Green beans',    c: 31,  p: 1.8, cb: 7,   f: 0.1 },
  { id: 'peas',             icon: '🫛', cat: 'veg', ar: 'بسلة',              en: 'Green peas',     c: 81,  p: 5.4, cb: 14,  f: 0.4 },
  { id: 'okra',             icon: '🌿', cat: 'veg', ar: 'بامية',             en: 'Okra',           c: 33,  p: 1.9, cb: 7,   f: 0.2 },
  { id: 'eggplant',         icon: '🍆', cat: 'veg', ar: 'باذنجان',           en: 'Eggplant',       c: 25,  p: 1,   cb: 6,   f: 0.2 },
  { id: 'zucchini',         icon: '🥒', cat: 'veg', ar: 'كوسة',              en: 'Zucchini',       c: 17,  p: 1.2, cb: 3.1, f: 0.3 },
  { id: 'onion',            icon: '🧅', cat: 'veg', ar: 'بصل',               en: 'Onion',          c: 40,  p: 1.1, cb: 9,   f: 0.1 },
  { id: 'pepper_green',     icon: '🫑', cat: 'veg', ar: 'فلفل أخضر',         en: 'Green pepper',   c: 20,  p: 0.9, cb: 4.6, f: 0.2 },

  /* ---------------- دهون ومكسرات ---------------- */
  { id: 'olive_oil',        icon: '🫒', cat: 'fat', ar: 'زيت زيتون',        en: 'Olive oil',       c: 884, p: 0,    cb: 0,  f: 100 },
  { id: 'sunflower_oil',    icon: '🌻', cat: 'fat', ar: 'زيت عباد الشمس',   en: 'Sunflower oil',   c: 884, p: 0,    cb: 0,  f: 100 },
  { id: 'butter',           icon: '🧈', cat: 'fat', ar: 'زبدة',             en: 'Butter',          c: 717, p: 0.9,  cb: 0.1,f: 81 },
  { id: 'ghee',             icon: '🧈', cat: 'fat', ar: 'سمنة',             en: 'Ghee',            c: 900, p: 0,    cb: 0,  f: 100 },
  { id: 'tahina',           icon: '🥜', cat: 'fat', ar: 'طحينة',            en: 'Tahini',          c: 595, p: 17,   cb: 21, f: 54 },
  { id: 'peanut_butter',    icon: '🥜', cat: 'fat', ar: 'زبدة فول سوداني',  en: 'Peanut butter',   c: 588, p: 25,   cb: 20, f: 50 },
  { id: 'almonds',          icon: '🌰', cat: 'fat', ar: 'لوز',              en: 'Almonds',         c: 579, p: 21,   cb: 22, f: 50 },
  { id: 'walnuts',          icon: '🌰', cat: 'fat', ar: 'عين جمل',          en: 'Walnuts',         c: 654, p: 15,   cb: 14, f: 65 },
  { id: 'peanuts',          icon: '🥜', cat: 'fat', ar: 'فول سوداني',       en: 'Peanuts',         c: 567, p: 26,   cb: 16, f: 49 },
  { id: 'avocado',          icon: '🥑', cat: 'fat', ar: 'أفوكادو',          en: 'Avocado',         c: 160, p: 2,    cb: 9,  f: 15 },
  { id: 'olives',           icon: '🫒', cat: 'fat', ar: 'زيتون',            en: 'Olives',          c: 115, p: 0.8,  cb: 6,  f: 11 },

  /* ---------------- أكلات مصرية (تقديرية) ---------------- */
  { id: 'koshari',          icon: '🍛', cat: 'dish', ar: 'كشري (بالصلصة)',      en: 'Koshari with sauce',      c: 165, p: 5,   cb: 30,  f: 3 },
  { id: 'foul_oil',         icon: '🫘', cat: 'dish', ar: 'فول بالزيت',          en: 'Foul with oil',           c: 160, p: 7,   cb: 19,  f: 6.5 },
  { id: 'taameya',          icon: '🧆', cat: 'dish', ar: 'طعمية (مقلية)',       en: 'Taameya (falafel)',       c: 333, p: 13,  cb: 32,  f: 18 },
  { id: 'molokhia',         icon: '🍲', cat: 'dish', ar: 'ملوخية',              en: 'Molokhia',                c: 78,  p: 4,   cb: 6,   f: 4 },
  { id: 'mahshi',           icon: '🥬', cat: 'dish', ar: 'محشي كرنب/ورق عنب',   en: 'Stuffed vine leaves',     c: 155, p: 3,   cb: 22,  f: 6 },
  { id: 'bechamel',         icon: '🍝', cat: 'dish', ar: 'مكرونة بشاميل',       en: 'Bechamel pasta',          c: 200, p: 8,   cb: 21,  f: 9.5 },
  { id: 'roz_meammar',      icon: '🍚', cat: 'dish', ar: 'رز معمر',             en: 'Roz meammar',             c: 210, p: 5,   cb: 26,  f: 9.5 },
  { id: 'shawarma_chicken', icon: '🌯', cat: 'dish', ar: 'شاورما فراخ',         en: 'Chicken shawarma',        c: 190, p: 17,  cb: 6,   f: 11 },
  { id: 'kofta',            icon: '🍢', cat: 'dish', ar: 'كفتة مشوية',          en: 'Grilled kofta',           c: 240, p: 19,  cb: 3,   f: 17 },
  { id: 'hawawshi',         icon: '🥙', cat: 'dish', ar: 'حواوشي',              en: 'Hawawshi',                c: 270, p: 14,  cb: 26,  f: 12 },
  { id: 'besara',           icon: '🍲', cat: 'dish', ar: 'بصارة',               en: 'Bessara',                 c: 130, p: 6,   cb: 16,  f: 4.5 },
  { id: 'baba_ghanoush',    icon: '🍆', cat: 'dish', ar: 'بابا غنوج',           en: 'Baba ghanoush',           c: 130, p: 3,   cb: 9,   f: 9.5 },
  { id: 'salata_baladi',    icon: '🥗', cat: 'dish', ar: 'سلطة بلدي',           en: 'Baladi salad',            c: 35,  p: 1.2, cb: 6,   f: 1 },

  /* ---------------- مشروبات ---------------- */
  { id: 'water',            icon: '💧', cat: 'drink', ar: 'مياه',                en: 'Water',                c: 0,   p: 0,   cb: 0,   f: 0 },
  { id: 'tea_plain',        icon: '🍵', cat: 'drink', ar: 'شاي بدون سكر',        en: 'Tea, no sugar',        c: 1,   p: 0,   cb: 0.3, f: 0 },
  { id: 'coffee_plain',     icon: '☕', cat: 'drink', ar: 'قهوة سادة',           en: 'Coffee, black',        c: 2,   p: 0.1, cb: 0,   f: 0 },
  { id: 'orange_juice',     icon: '🧃', cat: 'drink', ar: 'عصير برتقال طبيعي',   en: 'Fresh orange juice',   c: 45,  p: 0.7, cb: 10,  f: 0.2 },
  { id: 'soft_drink',       icon: '🥤', cat: 'drink', ar: 'مشروب غازي',          en: 'Soft drink',           c: 42,  p: 0,   cb: 11,  f: 0 },
  { id: 'sugar',            icon: '🍬', cat: 'drink', ar: 'سكر',                 en: 'Sugar',                c: 387, p: 0,   cb: 100, f: 0 },
  { id: 'honey',            icon: '🍯', cat: 'drink', ar: 'عسل نحل',             en: 'Honey',                c: 304, p: 0.3, cb: 82,  f: 0 },

  /* ---------------- مكملات ---------------- */
  { id: 'whey',             icon: '🥤', cat: 'supplement', ar: 'بروتين واي',     en: 'Whey protein',    c: 400, p: 80, cb: 8,  f: 6 },
  { id: 'casein',           icon: '🥤', cat: 'supplement', ar: 'كازين',          en: 'Casein protein',  c: 370, p: 78, cb: 7,  f: 3 },
  { id: 'mass_gainer',      icon: '🥤', cat: 'supplement', ar: 'ماس جينر',       en: 'Mass gainer',     c: 380, p: 20, cb: 65, f: 4 },
  { id: 'creatine',         icon: '💊', cat: 'supplement', ar: 'كرياتين',        en: 'Creatine',        c: 0,   p: 0,  cb: 0,  f: 0 },
  { id: 'bcaa',             icon: '💊', cat: 'supplement', ar: 'بي سي إيه إيه',  en: 'BCAA',            c: 0,   p: 0,  cb: 0,  f: 0 },
  { id: 'fish_oil',         icon: '💊', cat: 'supplement', ar: 'زيت سمك',        en: 'Fish oil',        c: 900, p: 0,  cb: 0,  f: 100 },

  /* ---------------- إضافات: بروتين ---------------- */
  { id: 'lamb_chop',        icon: '🍖', cat: 'protein', ar: 'ريش ضاني مشوي',      en: 'Lamb chop, grilled',   c: 250, p: 25,  cb: 0,  f: 16 },
  { id: 'cod',              icon: '🐟', cat: 'protein', ar: 'سمك قد (كود) مسلوق', en: 'Cod, cooked',          c: 105, p: 23,  cb: 0,  f: 0.9 },
  { id: 'sardines_canned',  icon: '🐟', cat: 'protein', ar: 'سردين معلب',         en: 'Sardines, canned',     c: 208, p: 25,  cb: 0,  f: 11.5 },

  /* ---------------- إضافات: نشويات ---------------- */
  { id: 'quinoa',           icon: '🌾', cat: 'carb', ar: 'كينوا مسلوقة',       en: 'Quinoa, cooked',    c: 120, p: 4.4, cb: 21, f: 1.9 },
  { id: 'couscous',         icon: '🌾', cat: 'carb', ar: 'كسكسي مسلوق',        en: 'Couscous, cooked',  c: 112, p: 3.8, cb: 23, f: 0.2 },
  { id: 'barley',           icon: '🌾', cat: 'carb', ar: 'شعير مسلوق',         en: 'Barley, cooked',    c: 123, p: 2.3, cb: 28, f: 0.4 },

  /* ---------------- إضافات: ألبان ---------------- */
  { id: 'cheese_feta',      icon: '🧀', cat: 'dairy', ar: 'جبنة فيتا',        en: 'Feta cheese',        c: 264, p: 14, cb: 4,   f: 21 },
  { id: 'cheese_mozzarella',icon: '🧀', cat: 'dairy', ar: 'جبنة موزاريلا',    en: 'Mozzarella cheese',  c: 254, p: 24, cb: 2.8, f: 16 },
  { id: 'laban_rayeb',      icon: '🥛', cat: 'dairy', ar: 'لبن رايب',         en: 'Fermented milk',     c: 62,  p: 3.3,cb: 4.8, f: 3.3 },

  /* ---------------- إضافات: فاكهة ---------------- */
  { id: 'kiwi',             icon: '🥝', cat: 'fruit', ar: 'كيوي',            en: 'Kiwi',            c: 61, p: 1.1, cb: 15, f: 0.5 },
  { id: 'pineapple',        icon: '🍍', cat: 'fruit', ar: 'أناناس',          en: 'Pineapple',       c: 50, p: 0.5, cb: 13, f: 0.1 },
  { id: 'pomegranate',      icon: '🍎', cat: 'fruit', ar: 'رمان',             en: 'Pomegranate',     c: 83, p: 1.7, cb: 19, f: 1.2 },

  /* ---------------- إضافات: خضار ---------------- */
  { id: 'cauliflower',      icon: '🥦', cat: 'veg', ar: 'قرنبيط',           en: 'Cauliflower',     c: 25, p: 1.9, cb: 5,  f: 0.3 },
  { id: 'mushroom',         icon: '🍄', cat: 'veg', ar: 'مشروم',            en: 'Mushroom',        c: 22, p: 3.1, cb: 3.3,f: 0.3 },
  { id: 'beetroot',         icon: '🥬', cat: 'veg', ar: 'بنجر',             en: 'Beetroot, cooked',c: 44, p: 1.7, cb: 10, f: 0.2 },

  /* ---------------- إضافات: دهون ومكسرات ---------------- */
  { id: 'pumpkin_seeds',    icon: '🎃', cat: 'fat', ar: 'بذر قرع',          en: 'Pumpkin seeds',   c: 559, p: 30, cb: 11, f: 49 },
  { id: 'chia_seeds',       icon: '🌱', cat: 'fat', ar: 'بذر شيا',          en: 'Chia seeds',      c: 486, p: 17, cb: 42, f: 31 },
  { id: 'flaxseed',         icon: '🌱', cat: 'fat', ar: 'بذر كتان',         en: 'Flaxseed',        c: 534, p: 18, cb: 29, f: 42 },

  /* ---------------- إضافات: أكلات مصرية ---------------- */
  { id: 'fattah',           icon: '🍛', cat: 'dish', ar: 'فتة',              en: 'Fattah',           c: 180, p: 9,   cb: 20, f: 7 },
  { id: 'sayadeya',         icon: '🐟', cat: 'dish', ar: 'صيادية سمك',       en: 'Sayadeya (fish & rice)', c: 150, p: 10, cb: 18, f: 4.5 },
  { id: 'lentil_soup',      icon: '🍲', cat: 'dish', ar: 'شوربة عدس',        en: 'Lentil soup',      c: 70,  p: 4.5, cb: 11, f: 1 },

  /* ---------------- إضافات: مشروبات ---------------- */
  { id: 'karkade',          icon: '🍷', cat: 'drink', ar: 'كركديه بدون سكر', en: 'Hibiscus tea, unsweetened', c: 2,  p: 0,   cb: 0.4, f: 0 },
  { id: 'coconut_water',    icon: '🥥', cat: 'drink', ar: 'مياه جوز الهند',   en: 'Coconut water',              c: 19, p: 0.7, cb: 3.7, f: 0.2 },

  /* ---------------- إضافات: أكل مصري وبيتي أكتر ---------------- */

  /* بروتين */
  { id: 'chicken_pane',     icon: '🍗', cat: 'protein', ar: 'بانيه فراخ (مقلي)',     en: 'Breaded chicken, fried',  c: 290, p: 20,  cb: 14,  f: 17 },
  { id: 'chicken_liver',    icon: '🍗', cat: 'protein', ar: 'كبدة فراخ',             en: 'Chicken liver',           c: 167, p: 24,  cb: 1,   f: 6.5 },
  { id: 'beef_fatty',       icon: '🥩', cat: 'protein', ar: 'لحمة بقري كتير الدهن',  en: 'Fatty beef',              c: 332, p: 22,  cb: 0,   f: 27 },
  { id: 'lamb_mince',       icon: '🥩', cat: 'protein', ar: 'لحمة ضاني مفرومة',      en: 'Minced lamb',             c: 282, p: 25,  cb: 0,   f: 20 },
  { id: 'sausage_beef',     icon: '🌭', cat: 'protein', ar: 'سجق بقري',              en: 'Beef sausage',            c: 300, p: 15,  cb: 4,   f: 25 },
  { id: 'luncheon',         icon: '🥓', cat: 'protein', ar: 'لانشون',                en: 'Luncheon meat',           c: 250, p: 12,  cb: 5,   f: 20 },
  { id: 'basterma',         icon: '🥓', cat: 'protein', ar: 'بسطرمة',                en: 'Basterma',                c: 240, p: 33,  cb: 2,   f: 11 },
  { id: 'fish_bouri',       icon: '🐟', cat: 'protein', ar: 'سمك بوري',              en: 'Mullet (bouri)',          c: 150, p: 25,  cb: 0,   f: 5 },
  { id: 'fish_mackerel',    icon: '🐟', cat: 'protein', ar: 'ماكريل / رنجة',         en: 'Mackerel / herring',      c: 205, p: 19,  cb: 0,   f: 14 },
  { id: 'fish_fried',       icon: '🐟', cat: 'protein', ar: 'سمك مقلي',              en: 'Fried fish',              c: 230, p: 22,  cb: 6,   f: 13 },
  { id: 'calamari',         icon: '🦑', cat: 'protein', ar: 'كاليماري',              en: 'Calamari',                c: 92,  p: 16,  cb: 3,   f: 1.4 },
  { id: 'egg_fried',        icon: '🍳', cat: 'protein', ar: 'بيض مقلي بسمنة',        en: 'Fried egg',               c: 196, p: 13,  cb: 1,   f: 15 },

  /* نشويات */
  { id: 'bread_shami',      icon: '🫓', cat: 'carb', ar: 'عيش شامي',              en: 'Shami bread',             c: 275, p: 9,   cb: 55,  f: 1.5 },
  { id: 'bread_toast',      icon: '🍞', cat: 'carb', ar: 'توست أبيض',             en: 'White toast',             c: 265, p: 8,   cb: 49,  f: 3.5 },
  { id: 'macaroni_red',     icon: '🍝', cat: 'carb', ar: 'مكرونة بصلصة حمرا',     en: 'Pasta with red sauce',    c: 135, p: 4.5, cb: 23,  f: 3 },
  { id: 'rice_koshari',     icon: '🍚', cat: 'carb', ar: 'رز بالشعرية',           en: 'Rice with vermicelli',    c: 180, p: 3.5, cb: 32,  f: 4 },
  { id: 'fries',            icon: '🍟', cat: 'carb', ar: 'بطاطس محمرة',           en: 'French fries',            c: 312, p: 3.4, cb: 41,  f: 15 },
  { id: 'cornflakes',       icon: '🥣', cat: 'carb', ar: 'كورن فليكس',            en: 'Cornflakes',              c: 357, p: 7,   cb: 84,  f: 0.4 },
  { id: 'popcorn',          icon: '🍿', cat: 'carb', ar: 'فشار (بدون زبدة)',      en: 'Popcorn, plain',          c: 387, p: 13,  cb: 78,  f: 4.5 },
  { id: 'taro',             icon: '🥔', cat: 'carb', ar: 'قلقاس',                 en: 'Taro',                    c: 112, p: 1.5, cb: 26,  f: 0.2 },
  { id: 'yam_colocasia',    icon: '🍠', cat: 'carb', ar: 'بطاطا مشوية',           en: 'Baked sweet potato',      c: 90,  p: 2,   cb: 21,  f: 0.2 },
  { id: 'bulgur',           icon: '🌾', cat: 'carb', ar: 'برغل',                  en: 'Bulgur',                  c: 83,  p: 3,   cb: 19,  f: 0.2 },

  /* ألبان */
  { id: 'yogurt_fruit',     icon: '🍦', cat: 'dairy', ar: 'زبادي بالفواكه',       en: 'Fruit yogurt',            c: 95,  p: 3.5, cb: 15,  f: 2 },
  { id: 'cheese_istanbuli', icon: '🧀', cat: 'dairy', ar: 'جبنة إسطنبولي',        en: 'Istanbuli cheese',        c: 290, p: 17,  cb: 2,   f: 24 },
  { id: 'cheese_cream',     icon: '🧀', cat: 'dairy', ar: 'جبنة كيري/كريمي',      en: 'Cream cheese',            c: 300, p: 7,   cb: 4,   f: 29 },
  { id: 'rice_pudding',     icon: '🍮', cat: 'dairy', ar: 'أرز باللبن',           en: 'Rice pudding',            c: 140, p: 3.5, cb: 23,  f: 3.5 },
  { id: 'mahalabeya',       icon: '🍮', cat: 'dairy', ar: 'مهلبية',               en: 'Mahalabeya',              c: 125, p: 3,   cb: 20,  f: 3.5 },

  /* فاكهة */
  { id: 'apricot',          icon: '🍑', cat: 'fruit', ar: 'مشمش',                 en: 'Apricot',                 c: 48,  p: 1.4, cb: 11,  f: 0.4 },
  { id: 'peach',            icon: '🍑', cat: 'fruit', ar: 'خوخ',                  en: 'Peach',                   c: 39,  p: 0.9, cb: 10,  f: 0.3 },
  { id: 'plum',             icon: '🍑', cat: 'fruit', ar: 'برقوق',                en: 'Plum',                    c: 46,  p: 0.7, cb: 11,  f: 0.3 },
  { id: 'pear',             icon: '🍐', cat: 'fruit', ar: 'كمثرى',                en: 'Pear',                    c: 57,  p: 0.4, cb: 15,  f: 0.1 },
  { id: 'cantaloupe',       icon: '🍈', cat: 'fruit', ar: 'كنتالوب',              en: 'Cantaloupe',              c: 34,  p: 0.8, cb: 8,   f: 0.2 },
  { id: 'tangerine',        icon: '🍊', cat: 'fruit', ar: 'يوسفي',                en: 'Tangerine',               c: 53,  p: 0.8, cb: 13,  f: 0.3 },
  { id: 'lemon',            icon: '🍋', cat: 'fruit', ar: 'ليمون',                en: 'Lemon',                   c: 29,  p: 1.1, cb: 9,   f: 0.3 },
  { id: 'raisins',          icon: '🍇', cat: 'fruit', ar: 'زبيب',                 en: 'Raisins',                 c: 299, p: 3,   cb: 79,  f: 0.5 },
  { id: 'dried_apricot',    icon: '🍑', cat: 'fruit', ar: 'قمر الدين / مشمش مجفف', en: 'Dried apricot',          c: 241, p: 3.4, cb: 63,  f: 0.5 },
  { id: 'prunes',           icon: '🍇', cat: 'fruit', ar: 'قراصيا',               en: 'Prunes',                  c: 240, p: 2.2, cb: 64,  f: 0.4 },

  /* خضار */
  { id: 'molokhia_leaves',  icon: '🌿', cat: 'veg', ar: 'ورق ملوخية (نيّة)',     en: 'Molokhia leaves, raw',    c: 34,  p: 4.7, cb: 5.2, f: 0.3 },
  { id: 'cabbage',          icon: '🥬', cat: 'veg', ar: 'كرنب',                  en: 'Cabbage',                 c: 25,  p: 1.3, cb: 6,   f: 0.1 },
  { id: 'arugula',          icon: '🌿', cat: 'veg', ar: 'جرجير',                 en: 'Arugula',                 c: 25,  p: 2.6, cb: 3.7, f: 0.7 },
  { id: 'radish',           icon: '🥬', cat: 'veg', ar: 'فجل',                   en: 'Radish',                  c: 16,  p: 0.7, cb: 3.4, f: 0.1 },
  { id: 'taro_leaves',      icon: '🥬', cat: 'veg', ar: 'سبانخ مطبوخة',          en: 'Cooked spinach',          c: 45,  p: 2.9, cb: 4,   f: 2.5 },
  { id: 'turnip',           icon: '🥬', cat: 'veg', ar: 'لفت',                   en: 'Turnip',                  c: 28,  p: 0.9, cb: 6.4, f: 0.1 },
  { id: 'artichoke',        icon: '🌿', cat: 'veg', ar: 'خرشوف',                 en: 'Artichoke',               c: 47,  p: 3.3, cb: 11,  f: 0.2 },
  { id: 'garlic',           icon: '🧄', cat: 'veg', ar: 'توم',                   en: 'Garlic',                  c: 149, p: 6.4, cb: 33,  f: 0.5 },
  { id: 'parsley',          icon: '🌿', cat: 'veg', ar: 'بقدونس',                en: 'Parsley',                 c: 36,  p: 3,   cb: 6,   f: 0.8 },

  /* دهون ومكسرات */
  { id: 'hazelnuts',        icon: '🌰', cat: 'fat', ar: 'بندق',                  en: 'Hazelnuts',               c: 628, p: 15,  cb: 17,  f: 61 },
  { id: 'cashews',          icon: '🥜', cat: 'fat', ar: 'كاجو',                  en: 'Cashews',                 c: 553, p: 18,  cb: 30,  f: 44 },
  { id: 'pistachio',        icon: '🥜', cat: 'fat', ar: 'فستق',                  en: 'Pistachios',              c: 560, p: 20,  cb: 28,  f: 45 },
  { id: 'sesame',           icon: '🌰', cat: 'fat', ar: 'سمسم',                  en: 'Sesame seeds',            c: 573, p: 18,  cb: 23,  f: 50 },
  { id: 'sunflower_seeds',  icon: '🌻', cat: 'fat', ar: 'لب سوري',               en: 'Sunflower seeds',         c: 584, p: 21,  cb: 20,  f: 51 },
  { id: 'coconut_dry',      icon: '🥥', cat: 'fat', ar: 'جوز هند مبشور',         en: 'Dried coconut',           c: 660, p: 6.9, cb: 24,  f: 65 },
  { id: 'mayonnaise',       icon: '🥄', cat: 'fat', ar: 'مايونيز',               en: 'Mayonnaise',              c: 680, p: 1,   cb: 1.5, f: 75 },
  { id: 'cream_whipping',   icon: '🥛', cat: 'fat', ar: 'كريمة خفق',             en: 'Whipping cream',          c: 340, p: 2.1, cb: 3,   f: 36 },

  /* أكلات مصرية */
  { id: 'foul_plain',       icon: '🫘', cat: 'dish', ar: 'فول سادة (من غير زيت)', en: 'Plain foul',             c: 110, p: 7.6, cb: 19,  f: 0.5 },
  { id: 'foul_iskandarani', icon: '🫘', cat: 'dish', ar: 'فول إسكندراني',         en: 'Foul Iskandarani',        c: 175, p: 7,   cb: 20,  f: 8 },
  { id: 'koshari_plain',    icon: '🍛', cat: 'dish', ar: 'كشري من غير تقلية',     en: 'Koshari, no fried onion', c: 140, p: 5,   cb: 28,  f: 1.5 },
  { id: 'macarona_forn',    icon: '🍝', cat: 'dish', ar: 'مكرونة فرن باللحمة',    en: 'Baked pasta with meat',   c: 215, p: 10,  cb: 22,  f: 10 },
  { id: 'kabab',            icon: '🍢', cat: 'dish', ar: 'كباب مشوي',             en: 'Grilled kebab',           c: 250, p: 21,  cb: 2,   f: 18 },
  { id: 'chicken_grilled_dish', icon: '🍗', cat: 'dish', ar: 'ربع فرخة مشوية',   en: 'Grilled quarter chicken', c: 195, p: 25,  cb: 1,   f: 10 },
  { id: 'chicken_pane_dish',icon: '🍗', cat: 'dish', ar: 'بانيه بالبطاطس',        en: 'Breaded chicken & fries', c: 285, p: 15,  cb: 26,  f: 14 },
  { id: 'shawarma_meat',    icon: '🌯', cat: 'dish', ar: 'شاورما لحمة',           en: 'Beef shawarma',           c: 230, p: 17,  cb: 7,   f: 15 },
  { id: 'liver_alex',       icon: '🥙', cat: 'dish', ar: 'كبدة إسكندراني',        en: 'Alexandrian liver',       c: 210, p: 22,  cb: 5,   f: 11 },
  { id: 'sogo2',            icon: '🌭', cat: 'dish', ar: 'سجق بالصلصة',           en: 'Sausage in sauce',        c: 275, p: 14,  cb: 6,   f: 22 },
  { id: 'torly',            icon: '🍲', cat: 'dish', ar: 'طورلي خضار',            en: 'Vegetable torly',         c: 95,  p: 2.5, cb: 11,  f: 5 },
  { id: 'bamya_lahma',      icon: '🍲', cat: 'dish', ar: 'بامية باللحمة',         en: 'Okra with meat',          c: 120, p: 8,   cb: 8,   f: 6 },
  { id: 'moussaka',         icon: '🍆', cat: 'dish', ar: 'مسقعة',                 en: 'Egyptian moussaka',       c: 145, p: 3,   cb: 11,  f: 10 },
  { id: 'shorbet_firakh',   icon: '🍲', cat: 'dish', ar: 'شوربة فراخ',            en: 'Chicken soup',            c: 45,  p: 3.5, cb: 4,   f: 1.5 },
  { id: 'salata_tahina',    icon: '🥗', cat: 'dish', ar: 'سلطة طحينة',            en: 'Tahina salad',            c: 180, p: 5,   cb: 7,   f: 15 },
  { id: 'salata_zabadi',    icon: '🥗', cat: 'dish', ar: 'سلطة زبادي',            en: 'Yogurt salad',            c: 55,  p: 3,   cb: 5,   f: 2.5 },
  { id: 'mesa2aa_batates',  icon: '🥔', cat: 'dish', ar: 'بطاطس بالصلصة',         en: 'Potato in tomato sauce',  c: 110, p: 2.5, cb: 17,  f: 4 },
  { id: 'eggah',            icon: '🍳', cat: 'dish', ar: 'عجة بالخضار',           en: 'Egyptian eggah',          c: 175, p: 11,  cb: 6,   f: 12 },
  { id: 'feteer',           icon: '🥐', cat: 'dish', ar: 'فطير مشلتت',            en: 'Feteer meshaltet',        c: 380, p: 7,   cb: 38,  f: 22 },
  { id: 'shakshouka',       icon: '🍳', cat: 'dish', ar: 'شكشوكة',                en: 'Shakshouka',              c: 120, p: 7,   cb: 6,   f: 8 },
  { id: 'pizza_slice',      icon: '🍕', cat: 'dish', ar: 'بيتزا',                 en: 'Pizza',                   c: 266, p: 11,  cb: 33,  f: 10 },
  { id: 'burger_sandwich',  icon: '🍔', cat: 'dish', ar: 'برجر ساندوتش',          en: 'Burger sandwich',         c: 295, p: 15,  cb: 26,  f: 15 },

  /* حلويات — العميل بياكلها وبيخبّيها، فاحسن تتسجّل */
  { id: 'basbousa',         icon: '🍰', cat: 'dish', ar: 'بسبوسة',                en: 'Basbousa',                c: 350, p: 4,   cb: 52,  f: 14 },
  { id: 'konafa',           icon: '🍰', cat: 'dish', ar: 'كنافة',                 en: 'Konafa',                  c: 380, p: 6,   cb: 47,  f: 19 },
  { id: 'baklava',          icon: '🍰', cat: 'dish', ar: 'بقلاوة',                en: 'Baklava',                 c: 430, p: 6,   cb: 48,  f: 24 },
  { id: 'om_ali',           icon: '🍮', cat: 'dish', ar: 'أم علي',                en: 'Om Ali',                  c: 245, p: 5,   cb: 28,  f: 12 },
  { id: 'chocolate_bar',    icon: '🍫', cat: 'dish', ar: 'لوح شوكولاتة',          en: 'Chocolate bar',           c: 535, p: 7,   cb: 59,  f: 30 },
  { id: 'biscuits',         icon: '🍪', cat: 'dish', ar: 'بسكويت',                en: 'Biscuits',                c: 480, p: 6,   cb: 65,  f: 21 },
  { id: 'ice_cream',        icon: '🍨', cat: 'dish', ar: 'آيس كريم',              en: 'Ice cream',               c: 207, p: 3.5, cb: 24,  f: 11 },
  { id: 'croissant',        icon: '🥐', cat: 'dish', ar: 'كرواسون',               en: 'Croissant',               c: 406, p: 8,   cb: 46,  f: 21 },

  /* مشروبات */
  { id: 'tea_sugar',        icon: '🍵', cat: 'drink', ar: 'شاي بسكرتين',          en: 'Tea with 2 sugars',       c: 13,  p: 0,   cb: 3.3, f: 0 },
  { id: 'coffee_milk',      icon: '☕', cat: 'drink', ar: 'قهوة بلبن',            en: 'Coffee with milk',        c: 25,  p: 1.2, cb: 2.5, f: 1 },
  { id: 'nescafe',          icon: '☕', cat: 'drink', ar: 'نسكافيه ٣×١',          en: 'Instant coffee 3-in-1',   c: 430, p: 4,   cb: 75,  f: 13 },
  { id: 'mango_juice',      icon: '🥤', cat: 'drink', ar: 'عصير مانجا',           en: 'Mango juice',             c: 54,  p: 0.3, cb: 13,  f: 0.2 },
  { id: 'sugarcane_juice',  icon: '🥤', cat: 'drink', ar: 'عصير قصب',             en: 'Sugarcane juice',         c: 70,  p: 0.2, cb: 18,  f: 0 },
  { id: 'soft_drink_diet',  icon: '🥤', cat: 'drink', ar: 'مشروب غازي دايت',      en: 'Diet soft drink',         c: 1,   p: 0,   cb: 0.2, f: 0 },
  { id: 'energy_drink',     icon: '⚡', cat: 'drink', ar: 'مشروب طاقة',           en: 'Energy drink',            c: 45,  p: 0,   cb: 11,  f: 0 },
  { id: 'yansoon',          icon: '🍵', cat: 'drink', ar: 'ينسون/نعناع',          en: 'Anise / mint tea',        c: 2,   p: 0,   cb: 0.4, f: 0 },
  { id: 'sahlab',           icon: '🥛', cat: 'drink', ar: 'سحلب',                 en: 'Sahlab',                  c: 120, p: 3.5, cb: 19,  f: 3.5 }

];

/* ============================================================
   المقادير البيتية — الكوب والملعقة والرغيف بدل الميزان
   مفيش عميل عنده ميزان مطبخ. القياس بالإيد والكوب هو الطريقة
   اللي المدربين بيستخدموها فعلًا، وهي تقريبية بطبيعتها — مكتوب
   على الشاشة إنها تقديرية عشان محدش يفتكرها رقم معملي.
   ============================================================ */

export const FOOD_UNITS = {
  g:       { ar: 'جرام',        en: 'gram',    step: 10  },
  cup:     { ar: 'كوب',         en: 'cup',     step: 0.5 },
  tbsp:    { ar: 'ملعقة كبيرة', en: 'tbsp',    step: 1   },
  tsp:     { ar: 'ملعقة صغيرة', en: 'tsp',     step: 1   },
  piece:   { ar: 'حبة',         en: 'piece',   step: 1   },
  slice:   { ar: 'شريحة',       en: 'slice',   step: 1   },
  loaf:    { ar: 'رغيف',        en: 'loaf',    step: 0.5 },
  glass:   { ar: 'كوباية',      en: 'glass',   step: 0.5 },
  plate:   { ar: 'طبق',         en: 'plate',   step: 0.5 },
  can:     { ar: 'علبة',        en: 'can',     step: 1   },
  bowl:    { ar: 'سلطانية',     en: 'bowl',    step: 0.5 },
  palm:    { ar: 'كف إيدك',     en: 'palm',    step: 0.5 },
  fist:    { ar: 'قبضة إيدك',   en: 'fist',    step: 0.5 },
  thumb:   { ar: 'إبهامك',      en: 'thumb',   step: 1   },
  handful: { ar: 'حفنة',        en: 'handful', step: 0.5 },
  scoop:   { ar: 'سكوب',        en: 'scoop',   step: 1   },
  sandwich:{ ar: 'سندوتش',      en: 'sandwich',step: 1   }
};

/*
 * مقادير مظبوطة لكل صنف: [معرّف الوحدة, وزنها بالجرام]
 * الأرقام دي أوزان متوسطة للحجم المتعارف عليه في مصر
 */
export const FOOD_SERVINGS = {
  /* بروتين */
  chicken_breast:  [['palm', 100], ['piece', 150]],
  chicken_thigh:   [['piece', 120], ['palm', 100]],
  chicken_whole:   [['palm', 100]],
  beef_lean:       [['palm', 100]],
  beef_mince:      [['cup', 225], ['tbsp', 20]],
  veal:            [['palm', 100]],
  liver_beef:      [['palm', 100], ['plate', 150]],
  fish_tilapia:    [['piece', 200], ['palm', 100]],
  fish_salmon:     [['slice', 150], ['palm', 100]],
  fish_tuna_can:   [['can', 140]],
  shrimp:          [['handful', 60], ['plate', 150]],
  egg_whole:       [['piece', 50]],
  egg_white:       [['piece', 33]],
  turkey_breast:   [['palm', 100], ['slice', 30]],
  lamb_chop:       [['piece', 90], ['palm', 100]],
  cod:             [['piece', 150], ['palm', 100]],
  sardines_canned: [['can', 90]],

  /* نشويات */
  rice_white:      [['cup', 158], ['plate', 250], ['fist', 130]],
  rice_brown:      [['cup', 195], ['plate', 250]],
  pasta_cooked:    [['cup', 140], ['plate', 220]],
  bread_baladi:    [['loaf', 90]],
  bread_fino:      [['piece', 60]],
  bread_brown:     [['slice', 28]],
  oats:            [['cup', 80], ['tbsp', 10]],
  potato:          [['piece', 170], ['cup', 150]],
  sweet_potato:    [['piece', 150]],
  lentils:         [['cup', 198], ['bowl', 250]],
  chickpeas:       [['cup', 164], ['handful', 40]],
  fava_beans:      [['cup', 170], ['plate', 200]],
  white_beans:     [['cup', 180], ['plate', 200]],
  corn:            [['cup', 165], ['piece', 90]],
  freekeh:         [['cup', 170], ['plate', 250]],
  quinoa:          [['cup', 185]],
  couscous:        [['cup', 157]],
  barley:          [['cup', 157]],

  /* ألبان */
  milk_full:       [['glass', 240], ['cup', 240]],
  milk_skim:       [['glass', 240]],
  yogurt_plain:    [['cup', 245], ['piece', 170]],
  yogurt_greek:    [['cup', 227], ['piece', 150]],
  cheese_white:    [['slice', 30], ['tbsp', 20]],
  cheese_qarish:   [['tbsp', 25], ['cup', 220]],
  cheese_roumy:    [['slice', 25]],
  cottage_cheese:  [['cup', 225], ['tbsp', 30]],
  labneh:          [['tbsp', 30]],
  cheese_feta:     [['slice', 28], ['tbsp', 25]],
  cheese_mozzarella:[['slice', 28], ['cup', 110]],
  laban_rayeb:     [['glass', 240]],

  /* فاكهة */
  banana:          [['piece', 118]],
  apple:           [['piece', 182]],
  orange:          [['piece', 140]],
  dates:           [['piece', 24], ['handful', 60]],
  grapes:          [['cup', 151], ['handful', 50]],
  mango:           [['piece', 200], ['cup', 165]],
  watermelon:      [['slice', 280], ['cup', 152]],
  strawberry:      [['cup', 144], ['piece', 12]],
  guava:           [['piece', 110]],
  figs:            [['piece', 50]],
  kiwi:            [['piece', 75]],
  pineapple:       [['slice', 84], ['cup', 165]],
  pomegranate:     [['piece', 280], ['cup', 174]],

  /* خضار */
  cucumber:        [['piece', 130], ['cup', 120]],
  tomato:          [['piece', 123], ['cup', 180]],
  lettuce:         [['cup', 47], ['plate', 100]],
  broccoli:        [['cup', 91]],
  spinach:         [['cup', 30], ['plate', 100]],
  carrot:          [['piece', 61], ['cup', 128]],
  green_beans:     [['cup', 125], ['plate', 200]],
  peas:            [['cup', 145]],
  okra:            [['cup', 100], ['plate', 200]],
  eggplant:        [['piece', 250], ['cup', 82]],
  zucchini:        [['piece', 196], ['cup', 124]],
  onion:           [['piece', 110], ['tbsp', 10]],
  pepper_green:    [['piece', 119]],
  cauliflower:     [['cup', 107], ['plate', 200]],
  mushroom:        [['cup', 70]],
  beetroot:        [['piece', 82], ['cup', 136]],

  /* دهون ومكسرات */
  olive_oil:       [['tbsp', 14], ['tsp', 4.5], ['thumb', 12]],
  sunflower_oil:   [['tbsp', 14], ['tsp', 4.5]],
  butter:          [['tbsp', 14], ['tsp', 5], ['thumb', 12]],
  ghee:            [['tbsp', 13], ['tsp', 4.5]],
  tahina:          [['tbsp', 15], ['tsp', 5]],
  peanut_butter:   [['tbsp', 16], ['thumb', 12]],
  almonds:         [['handful', 30], ['piece', 1.2]],
  walnuts:         [['handful', 30], ['piece', 4]],
  peanuts:         [['handful', 30]],
  avocado:         [['piece', 200], ['cup', 150]],
  olives:          [['piece', 4], ['handful', 30]],
  pumpkin_seeds:   [['handful', 30], ['tbsp', 10]],
  chia_seeds:      [['tbsp', 12]],
  flaxseed:        [['tbsp', 10]],

  /* أكلات */
  koshari:         [['plate', 400], ['bowl', 300]],
  foul_oil:        [['plate', 200], ['bowl', 150], ['sandwich', 110]],
  taameya:         [['piece', 30], ['sandwich', 120]],
  molokhia:        [['bowl', 250], ['plate', 250]],
  mahshi:          [['piece', 35], ['plate', 250]],
  bechamel:        [['plate', 300]],
  roz_meammar:     [['plate', 250]],
  shawarma_chicken:[['sandwich', 200], ['plate', 250]],
  kofta:           [['piece', 60], ['plate', 200]],
  hawawshi:        [['piece', 180]],
  besara:          [['plate', 200]],
  baba_ghanoush:   [['tbsp', 30], ['plate', 150]],
  salata_baladi:   [['plate', 150], ['bowl', 120]],
  fattah:          [['plate', 350]],
  sayadeya:        [['plate', 350]],
  lentil_soup:     [['bowl', 250], ['plate', 250]],

  /* مشروبات */
  water:           [['glass', 250]],
  tea_plain:       [['glass', 240]],
  coffee_plain:    [['cup', 240]],
  orange_juice:    [['glass', 248]],
  soft_drink:      [['can', 330], ['glass', 250]],
  karkade:         [['glass', 240]],
  coconut_water:   [['glass', 240]],
  sugar:           [['tsp', 4], ['tbsp', 12]],
  honey:           [['tbsp', 21], ['tsp', 7]],

  /* مكملات */
  whey:            [['scoop', 30]],
  casein:          [['scoop', 32]],
  mass_gainer:     [['scoop', 75]],
  creatine:        [['tsp', 5]],
  bcaa:            [['scoop', 10]],
  fish_oil:        [['piece', 1]],

  /* الإضافات الجديدة */
  chicken_pane:    [['piece', 120], ['palm', 100]],
  chicken_liver:   [['plate', 150], ['palm', 100]],
  beef_fatty:      [['palm', 100]],
  lamb_mince:      [['cup', 225], ['tbsp', 20]],
  sausage_beef:    [['piece', 40], ['plate', 150]],
  luncheon:        [['slice', 25]],
  basterma:        [['slice', 15], ['handful', 40]],
  fish_bouri:      [['piece', 220], ['palm', 100]],
  fish_mackerel:   [['piece', 150], ['palm', 100]],
  fish_fried:      [['piece', 180], ['palm', 100]],
  calamari:        [['plate', 150]],
  egg_fried:       [['piece', 55]],

  bread_shami:     [['loaf', 80]],
  bread_toast:     [['slice', 28]],
  macaroni_red:    [['plate', 300], ['cup', 140]],
  rice_koshari:    [['cup', 158], ['plate', 250]],
  fries:           [['plate', 150], ['handful', 50]],
  cornflakes:      [['cup', 30], ['bowl', 45]],
  popcorn:         [['bowl', 25], ['handful', 8]],
  taro:            [['plate', 200], ['cup', 132]],
  yam_colocasia:   [['piece', 150]],
  bulgur:          [['cup', 182], ['plate', 250]],

  yogurt_fruit:    [['piece', 120], ['cup', 245]],
  cheese_istanbuli:[['slice', 25], ['tbsp', 20]],
  cheese_cream:    [['tbsp', 15], ['piece', 17]],
  rice_pudding:    [['bowl', 200], ['cup', 245]],
  mahalabeya:      [['bowl', 180]],

  apricot:         [['piece', 35], ['handful', 100]],
  peach:           [['piece', 150]],
  plum:            [['piece', 66]],
  pear:            [['piece', 178]],
  cantaloupe:      [['slice', 160], ['cup', 160]],
  tangerine:       [['piece', 88]],
  lemon:           [['piece', 58]],
  raisins:         [['handful', 40], ['tbsp', 10]],
  dried_apricot:   [['piece', 8], ['handful', 40]],
  prunes:          [['piece', 9], ['handful', 40]],

  molokhia_leaves: [['cup', 40]],
  cabbage:         [['cup', 89], ['plate', 150]],
  arugula:         [['cup', 20], ['plate', 60]],
  radish:          [['piece', 4.5], ['cup', 116]],
  taro_leaves:     [['cup', 180], ['plate', 200]],
  turnip:          [['piece', 122], ['cup', 130]],
  artichoke:       [['piece', 128]],
  garlic:          [['piece', 3], ['tsp', 3]],
  parsley:         [['cup', 60], ['tbsp', 4]],

  hazelnuts:       [['handful', 30], ['piece', 1.2]],
  cashews:         [['handful', 30], ['piece', 1.5]],
  pistachio:       [['handful', 30], ['piece', 0.7]],
  sesame:          [['tbsp', 9]],
  sunflower_seeds: [['handful', 30], ['tbsp', 10]],
  coconut_dry:     [['tbsp', 8], ['handful', 25]],
  mayonnaise:      [['tbsp', 14], ['tsp', 5]],
  cream_whipping:  [['tbsp', 15], ['cup', 240]],

  foul_plain:      [['plate', 200], ['bowl', 150], ['sandwich', 110]],
  foul_iskandarani:[['plate', 200], ['sandwich', 120]],
  koshari_plain:   [['plate', 400], ['bowl', 300]],
  macarona_forn:   [['plate', 300]],
  kabab:           [['piece', 60], ['plate', 200]],
  chicken_grilled_dish: [['piece', 250], ['plate', 250]],
  chicken_pane_dish:[['plate', 300]],
  shawarma_meat:   [['sandwich', 200], ['plate', 250]],
  liver_alex:      [['plate', 200], ['sandwich', 150]],
  sogo2:           [['plate', 200], ['sandwich', 130]],
  torly:           [['plate', 250]],
  bamya_lahma:     [['plate', 250], ['bowl', 250]],
  moussaka:        [['plate', 250]],
  shorbet_firakh:  [['bowl', 250]],
  salata_tahina:   [['tbsp', 20], ['plate', 100]],
  salata_zabadi:   [['tbsp', 25], ['plate', 120]],
  mesa2aa_batates: [['plate', 250]],
  eggah:           [['piece', 120], ['plate', 180]],
  feteer:          [['slice', 100], ['piece', 250]],
  shakshouka:      [['plate', 250]],
  pizza_slice:     [['slice', 110]],
  burger_sandwich: [['piece', 200]],

  basbousa:        [['piece', 60], ['slice', 60]],
  konafa:          [['piece', 100], ['slice', 100]],
  baklava:         [['piece', 35]],
  om_ali:          [['bowl', 200]],
  chocolate_bar:   [['piece', 45], ['slice', 8]],
  biscuits:        [['piece', 12], ['handful', 40]],
  ice_cream:       [['scoop', 65], ['bowl', 130]],
  croissant:       [['piece', 60]],

  tea_sugar:       [['glass', 240]],
  coffee_milk:     [['cup', 240]],
  nescafe:         [['piece', 18], ['glass', 240]],
  mango_juice:     [['glass', 248]],
  sugarcane_juice: [['glass', 250]],
  soft_drink_diet: [['can', 330], ['glass', 250]],
  energy_drink:    [['can', 250]],
  yansoon:         [['glass', 240]],
  sahlab:          [['glass', 240]]
};

/*
 * لو الصنف ملوش مقادير مكتوبة، بنرجع لطريقة الإيد — وهي الطريقة
 * المعروفة في التدريب: كف = بروتين، قبضة = نشويات، إبهام = دهون.
 * بتتعرض للعميل وعليها كلمة "تقريبي" عشان يفهم إنها تقدير
 */
export const CAT_PORTIONS = {
  protein:    [['palm', 100]],
  carb:       [['fist', 130]],
  dairy:      [['glass', 200]],
  fruit:      [['fist', 120]],
  veg:        [['fist', 100]],
  fat:        [['thumb', 12]],
  dish:       [['plate', 250]],
  drink:      [['glass', 240]],
  supplement: [['scoop', 30]]
};