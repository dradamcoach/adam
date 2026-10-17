/*
 * ADAM Explore - SAMPLE DATA ONLY (Phase 1 prototype)
 *
 * Every name, place and description below is invented for the prototype.
 * Nothing here is a real person, clinic, club, gym or store, and no
 * rating, price, phone number or availability is stored on purpose.
 *
 * This file is the only thing a real backend replaces later: it must keep
 * the same listing shape and the same api.fetchAll() promise contract.
 * It does not touch Firebase, Auth, Firestore or any live data.
 */
(function (root) {
  'use strict';

  var KINDS = ['coach', 'specialist', 'clinic', 'store', 'club', 'gym'];

  var CITIES = {
    alexandria: { ar: 'الإسكندرية', en: 'Alexandria' },
    cairo:      { ar: 'القاهرة',    en: 'Cairo' },
    giza:       { ar: 'الجيزة',     en: 'Giza' },
    mansoura:   { ar: 'المنصورة',   en: 'Mansoura' }
  };

  var SPECIALTIES = {
    strength:        { ar: 'تدريب القوة',           en: 'Strength training',     kinds: ['coach', 'gym'] },
    hypertrophy:     { ar: 'بناء العضلات',          en: 'Muscle building',       kinds: ['coach', 'gym'] },
    powerlifting:    { ar: 'رفع الأثقال',           en: 'Powerlifting',          kinds: ['coach', 'club', 'gym'] },
    weight_loss:     { ar: 'إنقاص الوزن',           en: 'Weight loss',           kinds: ['coach', 'specialist', 'gym'] },
    womens_fitness:  { ar: 'لياقة السيدات',         en: 'Women’s fitness',  kinds: ['coach', 'gym'] },
    running:         { ar: 'الجري',                 en: 'Running',               kinds: ['coach', 'club'] },
    sprinting:       { ar: 'العدو السريع',          en: 'Sprinting',             kinds: ['coach', 'club'] },
    youth:           { ar: 'الفئات السنية',         en: 'Youth development',     kinds: ['coach', 'club'] },
    football:        { ar: 'كرة القدم',             en: 'Football',              kinds: ['coach', 'club'] },
    swimming:        { ar: 'السباحة',               en: 'Swimming',              kinds: ['club'] },
    conditioning:    { ar: 'الإعداد البدني',        en: 'Conditioning',          kinds: ['coach', 'gym'] },
    mobility:        { ar: 'المرونة والحركة',       en: 'Mobility',              kinds: ['coach', 'gym'] },
    prehab:          { ar: 'الوقاية من الإصابات',   en: 'Injury prevention',     kinds: ['coach', 'clinic'] },
    functional:      { ar: 'تدريب وظيفي',           en: 'Functional training',   kinds: ['gym', 'coach'] },
    group_classes:   { ar: 'كلاسات جماعية',         en: 'Group classes',         kinds: ['gym', 'club'] },
    physio:          { ar: 'علاج طبيعي',            en: 'Physiotherapy',         kinds: ['specialist', 'clinic'] },
    rehab_knee:      { ar: 'تأهيل الركبة',          en: 'Knee rehabilitation',   kinds: ['specialist', 'clinic'] },
    rehab_shoulder:  { ar: 'تأهيل الكتف',           en: 'Shoulder rehabilitation', kinds: ['specialist', 'clinic'] },
    orthopaedics:    { ar: 'جراحة العظام',          en: 'Orthopaedics',          kinds: ['specialist', 'clinic'] },
    sports_medicine: { ar: 'الطب الرياضي',          en: 'Sports medicine',       kinds: ['specialist', 'clinic'] },
    massage:         { ar: 'مساج رياضي',            en: 'Sports massage',        kinds: ['specialist', 'clinic'] },
    psychology:      { ar: 'علم النفس الرياضي',     en: 'Sport psychology',      kinds: ['specialist'] },
    clinical_nutrition: { ar: 'تغذية علاجية',       en: 'Clinical nutrition',    kinds: ['specialist'] },
    sports_nutrition:   { ar: 'تغذية رياضية',       en: 'Sports nutrition',      kinds: ['specialist'] },
    supplements:     { ar: 'مكملات غذائية',         en: 'Supplements',           kinds: ['store'] },
    rehab_gear:      { ar: 'أدوات التأهيل',         en: 'Rehab equipment',       kinds: ['store'] },
    training_gear:   { ar: 'أدوات التدريب',         en: 'Training equipment',    kinds: ['store'] },
    sportswear:      { ar: 'ملابس رياضية',          en: 'Sportswear',            kinds: ['store'] }
  };

  /* trust: 'checked'  = ADAM staff finished checking the credentials (date shown)
   *        'reviewed' = the page content was reviewed; credentials NOT checked yet
   * No listing may use a verified look before its checks are complete. */
  function L(id, kind, name, headline, about, cities, modes, langs, specs, services, trust, checkedOn) {
    return {
      id: id, kind: kind,
      name: { ar: name[0], en: name[1] },
      headline: { ar: headline[0], en: headline[1] },
      about: { ar: about[0], en: about[1] },
      cities: cities,                       /* in-person locations */
      area: cities.length ? { ar: cities[0][1][0], en: cities[0][1][1] } : null,
      modes: modes,                         /* ['inperson','online'] */
      langs: langs,                         /* ['ar','en'] */
      specs: specs,
      services: services.map(function (s) { return { ar: s[0], en: s[1] }; }),
      trust: trust, checkedOn: checkedOn || null,
      sample: true
    };
  }
  function C(key, area) { return [key, area]; }

  var LISTINGS = [
    /* ---------- coaches ---------- */
    L('c-hossam', 'coach', ['كابتن حسام رزق', 'Coach Hossam Rizk'],
      ['قوة وبناء عضلات — حضوري وأونلاين', 'Strength and muscle building — in person and online'],
      ['برامج قوة تدريجية بتتعدل كل أسبوعين حسب أداء العميل.', 'Progressive strength programs, adjusted every two weeks from the client’s performance.'],
      [C('alexandria', ['سموحة', 'Smouha'])], ['inperson', 'online'], ['ar', 'en'], ['strength', 'hypertrophy', 'powerlifting'],
      [['برنامج قوة فردي', 'Individual strength program'], ['متابعة أونلاين أسبوعية', 'Weekly online follow-up'], ['تقييم حركي أولي', 'Initial movement assessment']],
      'checked', '2026-09-12'),
    L('c-salma', 'coach', ['كابتن سلمى نبيل', 'Coach Salma Nabil'],
      ['لياقة للسيدات وإنقاص الوزن — أونلاين', 'Women’s fitness and weight loss — online'],
      ['متابعة أونلاين لسيدات بمستويات مختلفة، بتمارين تتعمل في البيت أو الجيم.', 'Online coaching for women at different levels, with sessions done at home or in a gym.'],
      [], ['online'], ['ar'], ['womens_fitness', 'weight_loss'],
      [['خطة تمرين منزلية', 'Home training plan'], ['متابعة أسبوعية بالرسائل', 'Weekly follow-up by message']],
      'reviewed'),
    L('c-yara', 'coach', ['كابتن يارا خالد', 'Coach Yara Khaled'],
      ['تطوير الجري والعدو السريع للمراحل السنية', 'Running and sprint development for youth squads'],
      ['حصص جماعية وفردية لتحسين التقنية والسرعة، مع متابعة الحمل التدريبي.', 'Group and individual sessions on technique and speed, with training-load follow-up.'],
      [C('cairo', ['مدينة نصر', 'Nasr City'])], ['inperson'], ['ar', 'en'], ['running', 'sprinting', 'youth'],
      [['حصة عدو جماعية', 'Group sprint session'], ['تحليل تقنية الجري', 'Running technique analysis']],
      'checked', '2026-08-30'),
    L('c-omar', 'coach', ['كابتن عمر شريف', 'Coach Omar Sherif'],
      ['إعداد بدني للاعبي كرة القدم', 'Physical preparation for football players'],
      ['برامج إعداد بدني لقبل الموسم وأثنائه مع تمارين خفة الحركة.', 'Pre-season and in-season physical preparation with agility work.'],
      [C('giza', ['الدقي', 'Dokki'])], ['inperson', 'online'], ['ar'], ['football', 'conditioning', 'youth'],
      [['إعداد بدني فردي', 'Individual conditioning'], ['برنامج فريق', 'Team program']],
      'reviewed'),
    L('c-dina', 'coach', ['كابتن دينا حسن', 'Coach Dina Hassan'],
      ['مرونة ووقاية من الإصابات', 'Mobility and injury prevention'],
      ['تمارين حركة ومرونة لتقليل الإصابات المتكررة عند الرياضيين والعاملين المكتبيين.', 'Mobility and prevention work to reduce recurring injuries in athletes and desk workers.'],
      [C('alexandria', ['ستانلي', 'Stanley'])], ['inperson', 'online'], ['ar', 'en'], ['mobility', 'prehab'],
      [['جلسة مرونة فردية', 'Individual mobility session'], ['برنامج وقاية منزلي', 'Home prevention program']],
      'reviewed'),

    /* ---------- specialists ---------- */
    L('s-sara', 'specialist', ['د. سارة منصور', 'Dr. Sara Mansour'],
      ['أخصائية علاج طبيعي — تأهيل إصابات الملاعب', 'Physiotherapist — sports injury rehabilitation'],
      ['تقييم وعلاج إصابات الركبة والكتف مع خطة تمارين للبيت.', 'Assessment and treatment of knee and shoulder injuries with a home exercise plan.'],
      [C('alexandria', ['ستانلي', 'Stanley'])], ['inperson', 'online'], ['ar', 'en'], ['physio', 'rehab_knee', 'rehab_shoulder'],
      [['تقييم أولي', 'Initial assessment'], ['جلسة علاج طبيعي', 'Physiotherapy session'], ['متابعة أونلاين', 'Online follow-up']],
      'checked', '2026-09-12'),
    L('s-nour', 'specialist', ['نور أيمن', 'Nour Ayman'],
      ['أخصائية تغذية علاجية', 'Clinical nutritionist'],
      ['خطط غذائية لإنقاص الوزن وحالات السكر والضغط بالتنسيق مع الطبيب المعالج.', 'Meal plans for weight loss and for diabetes or blood pressure, coordinated with the treating doctor.'],
      [C('cairo', ['المعادي', 'Maadi'])], ['online', 'inperson'], ['ar', 'en'], ['clinical_nutrition', 'weight_loss'],
      [['استشارة تغذية', 'Nutrition consultation'], ['خطة غذائية مكتوبة', 'Written meal plan']],
      'checked', '2026-09-01'),
    L('s-karim', 'specialist', ['كريم هاني', 'Karim Hany'],
      ['أخصائي علم نفس رياضي', 'Sport psychologist'],
      ['دعم نفسي للاعبين قبل المنافسات وبعد الإصابات.', 'Mental support for athletes before competitions and after injuries.'],
      [C('alexandria', ['سيدي جابر', 'Sidi Gaber'])], ['inperson', 'online'], ['ar'], ['psychology'],
      [['جلسة فردية', 'Individual session'], ['جلسة أونلاين', 'Online session']],
      'reviewed'),
    L('s-tarek', 'specialist', ['د. طارق عادل', 'Dr. Tarek Adel'],
      ['استشاري جراحة العظام والمفاصل', 'Orthopaedic and joint consultant'],
      ['فحص وتشخيص إصابات الركبة والرباط الصليبي وخطة العلاج.', 'Examination, diagnosis and treatment planning for knee and ligament injuries.'],
      [C('cairo', ['الزمالك', 'Zamalek'])], ['inperson'], ['ar', 'en'], ['orthopaedics', 'rehab_knee', 'sports_medicine'],
      [['كشف عظام', 'Orthopaedic consultation'], ['تقرير طبي', 'Medical report']],
      'checked', '2026-08-18'),
    L('s-mona', 'specialist', ['منى سمير', 'Mona Samir'],
      ['أخصائية مساج رياضي', 'Sports massage therapist'],
      ['جلسات استشفاء بعد التدريب والمنافسات.', 'Recovery sessions after training and competitions.'],
      [C('giza', ['المهندسين', 'Mohandessin'])], ['inperson'], ['ar'], ['massage'],
      [['مساج استشفاء', 'Recovery massage'], ['مساج رياضي', 'Sports massage']],
      'reviewed'),
    L('s-adam', 'specialist', ['آدم فوزي', 'Adam Fawzy'],
      ['أخصائي تغذية رياضية — أونلاين', 'Sports nutritionist — online'],
      ['تغذية للاعبين في فترات الإعداد والمنافسة.', 'Nutrition for athletes in preparation and competition phases.'],
      [], ['online'], ['ar', 'en'], ['sports_nutrition', 'weight_loss'],
      [['خطة تغذية رياضية', 'Sports nutrition plan'], ['متابعة شهرية', 'Monthly follow-up']],
      'reviewed'),

    /* ---------- clinics ---------- */
    L('k-delta', 'clinic', ['مركز دلتا للتأهيل', 'Delta Rehab Center'],
      ['تأهيل عظام وعلاج طبيعي — فريق متعدد التخصصات', 'Orthopaedic rehab and physiotherapy — multi-disciplinary team'],
      ['مركز بيجمع أخصائيين تأهيل وعلاج طبيعي تحت سقف واحد مع خطة متابعة.', 'A center that brings rehabilitation and physiotherapy specialists together with a follow-up plan.'],
      [C('alexandria', ['رشدي', 'Rushdy'])], ['inperson'], ['ar', 'en'], ['physio', 'rehab_knee', 'rehab_shoulder', 'orthopaedics'],
      [['تقييم تأهيلي', 'Rehab assessment'], ['جلسات علاج طبيعي', 'Physiotherapy sessions'], ['برنامج عودة للملاعب', 'Return-to-sport program']],
      'checked', '2026-09-05'),
    L('k-meridian', 'clinic', ['مركز ميريديان للطب الرياضي', 'Meridian Sports Medicine Center'],
      ['طب رياضي وقياس أداء', 'Sports medicine and performance testing'],
      ['فحص ما قبل الموسم واختبارات الأداء وتقارير اللياقة.', 'Pre-season screening, performance tests and fitness reports.'],
      [C('cairo', ['التجمع الخامس', 'Fifth Settlement'])], ['inperson'], ['ar', 'en'], ['sports_medicine', 'prehab'],
      [['فحص ما قبل الموسم', 'Pre-season screening'], ['اختبارات أداء', 'Performance tests']],
      'checked', '2026-08-22'),
    L('k-nile', 'clinic', ['عيادة النيل للعلاج الطبيعي', 'Nile Physio Clinic'],
      ['علاج طبيعي ويدوي', 'Physiotherapy and manual therapy'],
      ['علاج يدوي وتمارين تأهيلية لآلام الظهر والرقبة والإصابات الرياضية.', 'Manual therapy and rehab exercise for back and neck pain and sports injuries.'],
      [C('giza', ['العجوزة', 'Agouza'])], ['inperson'], ['ar'], ['physio', 'massage'],
      [['جلسة علاج طبيعي', 'Physiotherapy session'], ['علاج يدوي', 'Manual therapy']],
      'reviewed'),
    L('k-mansoura', 'clinic', ['مركز المنصورة للعظام والتأهيل', 'Mansoura Ortho and Rehab Center'],
      ['عظام وتأهيل ما بعد الجراحة', 'Orthopaedics and post-surgery rehabilitation'],
      ['متابعة تأهيل بعد جراحات الركبة والكتف.', 'Rehab follow-up after knee and shoulder surgery.'],
      [C('mansoura', ['وسط البلد', 'Downtown'])], ['inperson'], ['ar'], ['orthopaedics', 'rehab_knee', 'rehab_shoulder'],
      [['كشف عظام', 'Orthopaedic consultation'], ['تأهيل بعد الجراحة', 'Post-surgery rehab']],
      'reviewed'),

    /* ---------- stores ---------- */
    L('t-powerfuel', 'store', ['باور فيول', 'PowerFuel'],
      ['مكملات غذائية وأدوات تدريب — توصيل لكل المحافظات', 'Supplements and training gear — delivery nationwide'],
      ['متجر أونلاين بمنتجات عليها بيانات المصدر والمكونات.', 'An online store whose products list their source and ingredients.'],
      [], ['online'], ['ar', 'en'], ['supplements', 'training_gear'],
      [['توصيل لكل المحافظات', 'Nationwide delivery'], ['استبدال خلال مدة محددة', 'Returns within a set period']],
      'reviewed'),
    L('t-rehabgear', 'store', ['ريهاب جير', 'ReHab Gear'],
      ['أدوات تأهيل وباندات مقاومة', 'Rehab tools and resistance bands'],
      ['أدوات بسيطة لتمارين التأهيل المنزلية مع شرح استخدام.', 'Simple tools for home rehab exercises, each with usage notes.'],
      [], ['online'], ['ar', 'en'], ['rehab_gear'],
      [['توصيل', 'Delivery'], ['شرح استخدام لكل منتج', 'Usage notes for every product']],
      'reviewed'),
    L('t-kit', 'store', ['كيت سبورت', 'Kit Sport'],
      ['ملابس وأحذية رياضية', 'Sportswear and shoes'],
      ['ملابس تدريب وجري وأحذية بمقاسات متنوعة.', 'Training and running clothes and shoes in a range of sizes.'],
      [C('cairo', ['وسط البلد', 'Downtown'])], ['inperson', 'online'], ['ar'], ['sportswear'],
      [['فرع للمعاينة', 'Showroom'], ['طلب أونلاين', 'Online ordering']],
      'reviewed'),
    L('t-ironworks', 'store', ['أيرون وركس', 'Ironworks Equipment'],
      ['أجهزة وأوزان للجيم المنزلي', 'Home-gym machines and weights'],
      ['أوزان حرة وبنشات وأجهزة للجيم المنزلي.', 'Free weights, benches and machines for the home gym.'],
      [C('giza', ['6 أكتوبر', '6th of October'])], ['inperson', 'online'], ['ar'], ['training_gear'],
      [['معاينة الأجهزة', 'Equipment showroom'], ['توصيل وتركيب', 'Delivery and set-up']],
      'reviewed'),

    /* ---------- clubs ---------- */
    L('b-harbor', 'club', ['نادي الميناء لألعاب القوى', 'Harbor Athletics Club'],
      ['فرق جري ووثب لفئات سنية متعددة', 'Running and jumping squads for several age groups'],
      ['فرق تحت 14 وتحت 18 وكبار، مع متابعة طبية دورية.', 'Under-14, under-18 and senior squads, with periodic medical follow-up.'],
      [C('alexandria', ['الشاطبي', 'Shatby'])], ['inperson'], ['ar', 'en'], ['running', 'sprinting', 'youth'],
      [['فرق سنية', 'Age-group squads'], ['تدريب أسبوعي', 'Weekly training']],
      'checked', '2026-09-08'),
    L('b-runners', 'club', ['نادي العدائين', 'Runners Social Club'],
      ['جري جماعي أسبوعي للمبتدئين', 'Weekly group runs for beginners'],
      ['مجموعات جري بمستويات مختلفة مع مدرب في كل مجموعة.', 'Run groups at different levels, each led by a coach.'],
      [C('cairo', ['الشيخ زايد', 'Sheikh Zayed'])], ['inperson'], ['ar', 'en'], ['running', 'group_classes'],
      [['جري جماعي', 'Group runs'], ['تحضير لسباقات الشوارع', 'Road-race preparation']],
      'reviewed'),
    L('b-aqua', 'club', ['نادي أكوا للسباحة', 'Aqua Swim Club'],
      ['سباحة لكل الأعمار', 'Swimming for all ages'],
      ['مجموعات للأطفال والكبار وفرق منافسات.', 'Groups for children and adults, plus competition squads.'],
      [C('giza', ['الهرم', 'Haram'])], ['inperson'], ['ar'], ['swimming', 'youth'],
      [['تعليم سباحة', 'Swimming lessons'], ['فريق منافسات', 'Competition squad']],
      'reviewed'),
    L('b-future', 'club', ['أكاديمية المستقبل للكرة', 'Future Football Academy'],
      ['تدريب ناشئين كرة القدم', 'Football training for juniors'],
      ['مراحل سنية مع تقييم بدني دوري.', 'Age stages with periodic physical assessment.'],
      [C('mansoura', ['الجامعة', 'University district'])], ['inperson'], ['ar'], ['football', 'youth'],
      [['مراحل سنية', 'Age stages'], ['تقييم بدني', 'Physical assessment']],
      'checked', '2026-07-30'),

    /* ---------- gyms ---------- */
    L('g-fitpro', 'gym', ['فيت برو جيم', 'FitPro Gym'],
      ['أجهزة وكلاسات ومدربين', 'Equipment, classes and coaches'],
      ['جيم متكامل بكلاسات جماعية ومنطقة أوزان حرة.', 'A full gym with group classes and a free-weights area.'],
      [C('alexandria', ['المنتزه', 'Montaza'])], ['inperson'], ['ar', 'en'], ['group_classes', 'strength', 'weight_loss'],
      [['اشتراك شهري', 'Monthly membership'], ['كلاسات جماعية', 'Group classes'], ['تدريب شخصي', 'Personal training']],
      'checked', '2026-09-10'),
    L('g-iron', 'gym', ['أيرون هاوس', 'Iron House'],
      ['جيم قوة وأثقال حرة', 'Strength and free-weights gym'],
      ['منطقة رفع أثقال ومنصات ومدربين قوة.', 'A lifting area with platforms and strength coaches.'],
      [C('alexandria', ['العجمي', 'Agami'])], ['inperson'], ['ar'], ['powerlifting', 'strength', 'hypertrophy'],
      [['اشتراك شهري', 'Monthly membership'], ['منصات رفع', 'Lifting platforms']],
      'reviewed'),
    L('g-ladies', 'gym', ['جيم نون للسيدات', 'Noon Ladies Gym'],
      ['جيم للسيدات فقط', 'Women-only gym'],
      ['كلاسات ومدربات وأجهزة في مكان للسيدات فقط.', 'Classes, women coaches and equipment in a women-only space.'],
      [C('cairo', ['مصر الجديدة', 'Heliopolis'])], ['inperson'], ['ar', 'en'], ['womens_fitness', 'group_classes', 'weight_loss'],
      [['اشتراك شهري', 'Monthly membership'], ['كلاسات سيدات', 'Women’s classes']],
      'reviewed'),
    L('g-func', 'gym', ['ورك شوب للتدريب الوظيفي', 'Workshop Functional Training'],
      ['تدريب وظيفي ومجموعات صغيرة', 'Functional training in small groups'],
      ['مجموعات صغيرة بتدريب وظيفي وإعداد بدني.', 'Small groups doing functional training and conditioning.'],
      [C('giza', ['الشيخ زايد', 'Sheikh Zayed'])], ['inperson'], ['ar', 'en'], ['functional', 'conditioning', 'mobility'],
      [['مجموعات صغيرة', 'Small groups'], ['تقييم أولي', 'Initial assessment']],
      'reviewed')
  ];

  /* Simulates the network. window.__adamExploreFail = N makes the next N calls fail
   * (used by the test script and by ?xerr=1 on explore.html to exercise the error state). */
  /* Sample listings are shown ONLY when asked for (?data=sample or ADAM_FEATURES.exploreSample = true).
   * Otherwise the screen shows real listings, which come from window.ADAM_EXPLORE_REAL.load()
   * (a promise of an array with the same shape as LISTINGS; not wired yet, so it is empty and every
   * category shows "قريبًا / Coming soon" until a real club, gym, specialist, coach, store or clinic joins). */
  var SAMPLE = !!(root.ADAM_FEATURES && root.ADAM_FEATURES.exploreSample === true);
  try {
    if (/[?&]data=sample\b/.test((root.location && root.location.search) || '')) { SAMPLE = true; root.sessionStorage.setItem('adamExploreSample', '1'); }
    else if (/[?&]data=real\b/.test((root.location && root.location.search) || '')) { SAMPLE = false; root.sessionStorage.removeItem('adamExploreSample'); }
    else if (root.sessionStorage.getItem('adamExploreSample') === '1') SAMPLE = true;
  } catch (e) { /* no storage: the URL / flag decide */ }
  function fetchReal() {
    return new Promise(function (resolve, reject) {
      var real = root.ADAM_EXPLORE_REAL;
      if (real && typeof real.load === 'function') {
        Promise.resolve(real.load()).then(function (list) { resolve(Array.isArray(list) ? list : []); }, reject);
      } else setTimeout(function () { resolve([]); }, 120);
    });
  }
  function fetchAll() {
    if (!SAMPLE) return fetchReal();
    return new Promise(function (resolve, reject) {
      var ms = root.__adamExploreDelay != null ? root.__adamExploreDelay : 350;
      setTimeout(function () {
        if (root.__adamExploreFail > 0) {
          root.__adamExploreFail -= 1;
          reject(new Error('sample-network-error'));
          return;
        }
        resolve(JSON.parse(JSON.stringify(LISTINGS)));
      }, ms);
    });
  }

  root.ADAM_EXPLORE_DATA = {
    KINDS: KINDS, CITIES: CITIES, SPECIALTIES: SPECIALTIES,
    api: { fetchAll: fetchAll }, isSample: SAMPLE
  };
})(window);
