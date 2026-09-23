/*
 * ADAM — مكتبة المكملات: إضافات
 *
 * نفس قواعد المكتبة الأساسية: مرجع تعليمي للمدرب والمتخصص، مش وصفة
 * طبية. الجرعات هي المدى الشائع للبالغ السليم. أي حد عنده مرض مزمن أو
 * بياخد أدوية أو حامل/مرضعة يرجع لطبيب أو صيدلي قبل أي مكمل.
 *
 * للرياضي اللي بيتعمله كشف منشطات: أي مكمل ممكن يكون ملوّث بمادة
 * ممنوعة، فالأفضل منتج عليه اختبار طرف ثالث (Informed Sport أو NSF
 * Certified for Sport)، والمسؤولية في الآخر على اللاعب.
 *
 * نفس المفاتيح: id, cat, icon, grade, ar, en, dose, when, use, care
 */

export const SUPPLEMENT_LIBRARY_EXTRA = [

  /* ---------------- بروتينات ---------------- */
  {
    id: 'sup_eaa', cat: 'protein', icon: '', grade: 'limited',
    ar: 'أحماض أمينية أساسية (EAA)', en: 'Essential amino acids (EAAs)',
    dose: { ar: '10–15 جم (فيها حوالي 2–3 جم ليوسين)', en: '10–15 g (providing about 2–3 g leucine)' },
    when: { ar: 'حوالين التمرين، أو مع وجبة نباتية بروتينها ضعيف', en: 'Around training, or alongside a low-protein plant-based meal' },
    use: { ar: 'بتحفّز بناء العضلة أحسن من الـ BCAA لأنها فيها التسع أحماض الأساسية — مفيدة لو الشخص مش قادر ياخد وجبة بروتين كاملة', en: 'Stimulates muscle protein synthesis better than BCAAs because it contains all nine essential amino acids — useful when a full protein meal is not practical' },
    care: { ar: 'لو البروتين اليومي كفاية، فايدتها الإضافية صغيرة جدًا والواي أرخص وبيدّي نفس الأحماض. اللي عنده مرض كلى أو كبد أو مرض وراثي في التمثيل الغذائي (زي الفينيل كيتونيوريا) يسأل طبيبه. للرياضي: اختار منتج عليه اختبار طرف ثالث زي Informed Sport.', en: 'With adequate daily protein the added benefit is very small, and whey is cheaper and supplies the same amino acids. Anyone with kidney or liver disease, or an inherited metabolic disorder such as phenylketonuria, should ask their doctor. Tested athletes: choose a third-party tested product (e.g. Informed Sport).' }
  },
  {
    id: 'sup_egg_protein', cat: 'protein', icon: '', grade: 'moderate',
    ar: 'بروتين بياض البيض', en: 'Egg white protein',
    dose: { ar: '25–40 جم للجرعة', en: '25–40 g per serving' },
    when: { ar: 'زي الواي — بعد التمرين أو لسد احتياج اليوم', en: 'Same as whey — after training or to reach the daily target' },
    use: { ar: 'بروتين حيواني كامل وخالي من اللاكتوز، بديل كويس للي عنده مشكلة مع الألبان ومش نباتي', en: 'A complete, lactose-free animal protein — a good option for someone who reacts to dairy but is not vegetarian' },
    care: { ar: 'ممنوع تمامًا لأي حد عنده حساسية بيض. اللي عنده مرض كلى مزمن يحدد كمية البروتين مع طبيبه. البيض الحقيقي أرخص بكتير. للرياضي: منتج عليه اختبار طرف ثالث.', en: 'Strictly avoid with an egg allergy. Anyone with chronic kidney disease should set protein intake with their doctor. Whole eggs are far cheaper. Tested athletes: use a third-party tested product.' }
  },

  /* ---------------- أداء وقوة ---------------- */
  {
    id: 'sup_carb_gel', cat: 'performance', icon: '', grade: 'strong',
    ar: 'جِل كربوهيدرات', en: 'Carbohydrate gels',
    dose: { ar: 'الجِل الواحد 20–30 جم كارب؛ الهدف 30–60 جم في الساعة، ولحد 90 جم في الساعة للمتعوّد (جلوكوز + فركتوز)', en: 'One gel is 20–30 g carbs; aim for 30–60 g per hour, up to 90 g per hour in a trained gut (glucose + fructose)' },
    when: { ar: 'أثناء المجهود اللي بيعدّي 60–90 دقيقة، كل 20–30 دقيقة مع رشفات مياه', en: 'During efforts longer than 60–90 minutes, every 20–30 minutes with sips of water' },
    use: { ar: 'بيحافظ على سكر الدم ومخزون الجلايكوجين في الماراثون وسباقات الدراجات والترايثلون', en: 'Maintains blood glucose and glycogen in marathons, cycling races and triathlon' },
    care: { ar: 'لازم يتجرّب في التمرين الأول عشان المعدة تتعوّد — مش يوم السباق. خده مع مياه مش مع مشروب رياضي مركّز عشان مايعملش مغص. مريض السكر يحسبه مع طبيبه. بعض الأنواع فيها كافيين، فاحسبه ضمن جرعة الكافيين. للرياضي: منتج عليه اختبار طرف ثالث.', en: 'Trial it in training so the gut adapts — never first on race day. Take it with water, not a concentrated sports drink, to avoid gut cramps. People with diabetes should plan it with their doctor. Some gels contain caffeine — count it in the total caffeine dose. Tested athletes: use a third-party tested product.' }
  },
  {
    id: 'sup_ketone_ester', cat: 'performance', icon: '', grade: 'limited',
    ar: 'كيتون إستر', en: 'Ketone esters',
    dose: { ar: 'حوالي 0.3–0.5 جم لكل كيلو (غالبًا 25 جم للجرعة)', en: 'About 0.3–0.5 g per kg (often 25 g per serving)' },
    when: { ar: 'قبل المجهود بـ 30–60 دقيقة، أو بعده في بعض بروتوكولات الاستشفاء', en: '30–60 minutes before exercise, or afterwards in some recovery protocols' },
    use: { ar: 'بيرفع الكيتونات في الدم كمصدر طاقة بديل — الأبحاث على الأداء متضاربة ومعظمها مش بيورّي تحسّن', en: 'Raises blood ketones as an alternative fuel — performance research is mixed and mostly shows no gain' },
    care: { ar: 'غالي جدًا وطعمه صعب وبيعمل اضطراب معدة. مريض السكر ممنوع يستعمله من غير طبيب لأنه بيلخبط قراءة الكيتونات. مش للحامل أو المرضعة. مش ممنوع في كشف المنشطات، بس اختار منتج عليه اختبار طرف ثالث.', en: 'Very expensive, unpleasant tasting and often causes gut upset. People with diabetes must not use it without a doctor, as it confuses ketone monitoring. Not for pregnancy or breastfeeding. Not prohibited in sport, but choose a third-party tested product.' }
  },
  {
    id: 'sup_taurine', cat: 'performance', icon: '', grade: 'limited',
    ar: 'تورين', en: 'Taurine',
    dose: { ar: '1–3 جم', en: '1–3 g' },
    when: { ar: 'قبل التمرين بـ 1–2 ساعة', en: '1–2 hours before training' },
    use: { ar: 'موجود في مشروبات الطاقة، وفيه أبحاث صغيرة على التحمّل ووجع العضلات — النتايج مش ثابتة', en: 'Found in energy drinks, with small studies on endurance and muscle soreness — results are inconsistent' },
    care: { ar: 'آمن غالبًا لحد 3 جم في اليوم. ممكن ينزّل الضغط شوية، فاللي بياخد دوا ضغط يسأل طبيبه. المشكلة الحقيقية في مشروبات الطاقة هي الكافيين والسكر مش التورين. اللي عنده مرض كلى، والحامل والمرضعة، يتجنّبوه. للرياضي: منتج عليه اختبار طرف ثالث.', en: 'Generally safe up to 3 g a day. May lower blood pressure slightly, so anyone on blood-pressure medication should ask their doctor. In energy drinks the real concern is the caffeine and sugar, not the taurine. Avoid with kidney disease and in pregnancy or breastfeeding. Tested athletes: use a third-party tested product.' }
  },
  {
    id: 'sup_tyrosine', cat: 'performance', icon: '', grade: 'limited',
    ar: 'إل تيروزين', en: 'L-tyrosine',
    dose: { ar: '100–150 مجم لكل كيلو (يعني حوالي 7–10 جم لشخص 70 كيلو)', en: '100–150 mg per kg (about 7–10 g for a 70 kg person)' },
    when: { ar: 'قبل المجهود بساعة، في ظروف ضغط زي الحر الشديد أو قلة النوم', en: 'One hour before, under stress such as severe heat or sleep loss' },
    use: { ar: 'ممكن يحافظ على التركيز والذاكرة تحت الضغط — التأثير على الأداء البدني نفسه ضعيف', en: 'May preserve focus and working memory under stress — effect on physical performance itself is weak' },
    care: { ar: 'ممنوع مع أدوية الاكتئاب من نوع MAOI (ممكن يرفع الضغط بشكل خطير). اللي عنده فرط نشاط غدة درقية أو بياخد هرمون الغدة (ليفوثيروكسين) أو ليفودوبا يسأل طبيبه. ممكن يعمل صداع للي عنده صداع نصفي. مش للحامل أو المرضعة. للرياضي: منتج عليه اختبار طرف ثالث.', en: 'Contraindicated with MAOI antidepressants (risk of a dangerous blood-pressure rise). Anyone with an overactive thyroid, or taking thyroid hormone (levothyroxine) or levodopa, should ask their doctor. May trigger migraine. Not for pregnancy or breastfeeding. Tested athletes: use a third-party tested product.' }
  },
  {
    id: 'sup_sodium_phosphate', cat: 'performance', icon: '', grade: 'limited',
    ar: 'فوسفات الصوديوم', en: 'Sodium phosphate',
    dose: { ar: '50 مجم لكل كيلو كتلة عضلية يوميًا (حوالي 3–4 جم) مقسّمة على 3–4 جرعات', en: '50 mg per kg fat-free mass daily (about 3–4 g), split into 3–4 doses' },
    when: { ar: 'لمدة 3–6 أيام قبل المنافسة', en: 'For 3–6 days before competition' },
    use: { ar: 'ممكن يحسّن أداء التحمّل واستهلاك الأكسجين، بس الأبحاث قليلة ومتضاربة', en: 'May improve endurance performance and oxygen uptake, but the research is small and mixed' },
    care: { ar: 'ممنوع تمامًا لمريض الكلى. بيعمل اضطراب معدة وإسهال. فيه صوديوم عالي فمش مناسب لمريض الضغط أو القلب. ماتاخدوش مع الكالسيوم في نفس الوقت. مش ممنوع في كشف المنشطات، بس اختار منتج عليه اختبار طرف ثالث.', en: 'Strictly avoid with kidney disease. Causes gut upset and diarrhoea. High in sodium, so unsuitable with hypertension or heart disease. Do not take at the same time as calcium. Not prohibited in sport, but choose a third-party tested product.' }
  },
  {
    id: 'sup_test_booster', cat: 'performance', icon: '', grade: 'limited',
    ar: 'رافعات التستوستيرون (تريبيولس، تونجكات علي، حلبة)', en: 'Testosterone boosters (tribulus, tongkat ali, fenugreek)',
    dose: { ar: '—', en: '—' },
    when: { ar: '—', en: '—' },
    use: { ar: 'بتتباع على إنها بترفع التستوستيرون والعضلة — عند الراجل السليم مفيش دليل إنها بتزوّد العضلة أو القوة', en: 'Sold as raising testosterone and muscle — in healthy men there is no evidence they increase muscle or strength' },
    care: { ar: 'من أخطر الفئات في كشف المنشطات: منتجات كتير اتلاقى فيها ستيرويدات أو بروهورمونات مش مكتوبة على العلبة. لو فيه أعراض نقص هرمون فده تحليل وطبيب ذكورة أو غدد، مش مكمل. الحلبة بتنزّل السكر وممكن تتداخل مع مسيّلات الدم. اترصد أذى للكبد مع بعض الخلطات. ممنوعة للحامل، ومش مناسبة لمرضى البروستاتا أو الأورام الهرمونية. للرياضي: لو لازم، منتج عليه اختبار طرف ثالث زي Informed Sport بس.', en: 'One of the riskiest categories for doping: many products have been found to contain undeclared steroids or prohormones. Symptoms of low testosterone need a blood test and a doctor, not a supplement. Fenugreek lowers blood glucose and may interact with blood thinners. Liver injury has been reported with some blends. Avoid in pregnancy and with prostate disease or hormone-sensitive cancers. Tested athletes: if used at all, only a third-party tested product such as Informed Sport.' }
  },

  /* ---------------- فيتامينات ---------------- */
  {
    id: 'sup_folate', cat: 'vitamin', icon: '', grade: 'strong',
    ar: 'حمض الفوليك', en: 'Folic acid',
    dose: { ar: '400 ميكروجرام يوميًا (الطبيب ممكن يزوّدها في حالات معيّنة)', en: '400 mcg daily (a doctor may prescribe more in specific cases)' },
    when: { ar: 'من قبل الحمل بشهر على الأقل ولحد آخر الشهور الأولى — أي وقت في اليوم', en: 'From at least one month before conception through early pregnancy — any time of day' },
    use: { ar: 'بيقلل خطر عيوب الأنبوب العصبي عند الجنين — ضروري لأي ست بتخطط للحمل', en: 'Reduces the risk of neural tube defects in the baby — essential for any woman planning a pregnancy' },
    care: { ar: 'الجرعات العالية ممكن تخبّي نقص ب12، فالنباتي يعمل تحليل ب12. بيتداخل مع الميثوتريكسات وبعض أدوية الصرع (زي الفينيتوين) — لازم طبيب. خارج الحمل، الخضار الورقية والبقوليات بتكفي معظم الناس.', en: 'High doses can mask B12 deficiency, so vegetarians should have B12 checked. Interacts with methotrexate and some antiepileptics (e.g. phenytoin) — needs a doctor. Outside pregnancy planning, leafy greens and legumes cover most people.' }
  },
  {
    id: 'sup_vit_k2', cat: 'vitamin', icon: '', grade: 'limited',
    ar: 'فيتامين ك2 (MK-7)', en: 'Vitamin K2 (MK-7)',
    dose: { ar: '90–180 ميكروجرام', en: '90–180 mcg' },
    when: { ar: 'مع وجبة فيها دهون، وغالبًا مع فيتامين د', en: 'With a meal containing fat, often alongside vitamin D' },
    use: { ar: 'بيتباع لصحة العظم وتوجيه الكالسيوم — الدليل على تقليل الكسور لسه محدود', en: 'Sold for bone health and calcium handling — evidence for fewer fractures is still limited' },
    care: { ar: 'ممنوع تمامًا لأي حد بياخد وارفارين (ماريفان) من غير طبيبه، لأنه بيبطّل مفعول الدوا ويرفع خطر الجلطات. مسيّلات الدم الأحدث تتراجع مع الطبيب برضه. الحامل والمرضعة يلتزموا بالأكل.', en: 'Strictly avoid on warfarin without the prescribing doctor, as it counteracts the drug and raises clot risk. Newer blood thinners should also be reviewed with the doctor. In pregnancy and breastfeeding stick to food sources.' }
  },
  {
    id: 'sup_vit_e', cat: 'vitamin', icon: '', grade: 'limited',
    ar: 'فيتامين هـ (E)', en: 'Vitamin E',
    dose: { ar: 'الاحتياج 15 مجم يوميًا من الأكل؛ مفيش جرعة روتينية إلا لنقص مثبت وبقرار طبيب', en: 'The need is 15 mg daily from food; no routine supplement dose unless a confirmed deficiency and a doctor\'s decision' },
    when: { ar: 'مع وجبة فيها دهون', en: 'With a meal containing fat' },
    use: { ar: 'مضاد أكسدة — المكسرات والبذور والزيوت بتغطيه بسهولة، ومفيش فايدة رياضية من المكمل', en: 'An antioxidant — nuts, seeds and oils cover it easily, and the supplement brings no sports benefit' },
    care: { ar: 'الجرعات العالية (400 وحدة فأكتر) مرتبطة بزيادة خطر النزيف وممكن تقلل تكيّف التدريب. بيتعارض مع مسيّلات الدم ومضادات الصفايح. يتوقف قبل أي عملية. الحامل ماتاخدش جرعات عالية.', en: 'High doses (400 IU and above) are linked to higher bleeding risk and may blunt training adaptation. Interacts with blood thinners and antiplatelet drugs. Stop before any surgery. No high doses in pregnancy.' }
  },

  /* ---------------- معادن ---------------- */
  {
    id: 'sup_iodine', cat: 'mineral', icon: '', grade: 'limited',
    ar: 'يود', en: 'Iodine',
    dose: { ar: '150 ميكروجرام يوميًا (الحامل والمرضعة محتاجين أكتر — بقرار طبيب)', en: '150 mcg daily (pregnancy and breastfeeding need more — per doctor)' },
    when: { ar: 'مع الأكل', en: 'With food' },
    use: { ar: 'ضروري لهرمونات الغدة الدرقية — الملح المعالج باليود في مصر بيغطي معظم الناس', en: 'Essential for thyroid hormones — iodised salt in Egypt covers most people' },
    care: { ar: 'الزيادة بتعمل خلل في الغدة زي النقص بالظبط. اللي عنده أي مرض غدة درقية ماياخدوش غير بطبيب الغدد. بيتداخل مع الأميودارون والليثيوم وأدوية الغدة. مكملات الطحالب البحرية (الكِلب) ممكن تكون فيها جرعات ضخمة.', en: 'Too much disrupts the thyroid just like too little. Anyone with a thyroid condition should use it only through an endocrinologist. Interacts with amiodarone, lithium and thyroid medication. Kelp and seaweed supplements can contain very large doses.' }
  },
  {
    id: 'sup_potassium', cat: 'mineral', icon: '', grade: 'limited',
    ar: 'بوتاسيوم', en: 'Potassium',
    dose: { ar: 'من الأكل أساسًا (حوالي 2600–3400 مجم يوميًا من كل المصادر)؛ المكمل بقرار طبيب بس', en: 'Mainly from food (about 2600–3400 mg daily from all sources); supplements only on medical advice' },
    when: { ar: 'مع الأكل', en: 'With food' },
    use: { ar: 'مهم للعضلة والقلب والضغط — الموز والبطاطس والبقوليات والخضار أحسن وأأمن مصدر', en: 'Important for muscle, heart and blood pressure — bananas, potatoes, legumes and vegetables are the best and safest sources' },
    care: { ar: 'زيادة البوتاسيوم في الدم ممكن تعمل اضطراب خطير في ضربات القلب. ممنوع كمكمل لمريض الكلى أو اللي بياخد أدوية ضغط من نوع ACE أو ARB أو مدرّات حافظة للبوتاسيوم (زي السبيرونولاكتون). بدائل الملح قليلة الصوديوم فيها بوتاسيوم عالي — نفس التحذير.', en: 'High blood potassium can cause dangerous heart-rhythm problems. Not to be supplemented with kidney disease, or on ACE inhibitors, ARBs or potassium-sparing diuretics (e.g. spironolactone). Low-sodium salt substitutes are high in potassium — same warning.' }
  },

  /* ---------------- دهون صحية ---------------- */
  {
    id: 'sup_black_seed', cat: 'fat', icon: '', grade: 'limited',
    ar: 'زيت حبة البركة', en: 'Black seed oil (Nigella sativa)',
    dose: { ar: '1–3 جم يوميًا (حوالي 1–2.5 مل)', en: '1–3 g daily (about 1–2.5 ml)' },
    when: { ar: 'مع الأكل', en: 'With food' },
    use: { ar: 'فيه أبحاث صغيرة على الدهون في الدم والسكر والالتهاب — مفيش دليل على تحسين الأداء الرياضي', en: 'Small studies on blood lipids, glucose and inflammation — no evidence it improves sports performance' },
    care: { ar: 'ممكن ينزّل السكر والضغط، فاللي بياخد أدوية سكر أو ضغط يراقب ويسأل طبيبه. ممكن يتعارض مع مسيّلات الدم ويتوقف قبل العمليات بأسبوعين. الزيت المركّز مش للحامل. اترصدت حالات أذى كلى مع جرعات عالية، فمريض الكلى أو الكبد يتجنّبه.', en: 'Can lower blood glucose and blood pressure, so anyone on diabetes or blood-pressure medication should monitor and ask their doctor. May interact with blood thinners; stop two weeks before surgery. The concentrated oil is not for pregnancy. Kidney injury has been reported with high doses, so avoid with kidney or liver disease.' }
  },

  /* ---------------- مفاصل وأوتار ---------------- */
  {
    id: 'sup_boswellia', cat: 'joint', icon: '', grade: 'limited',
    ar: 'بوسويليا (اللبان الدكر)', en: 'Boswellia serrata (frankincense extract)',
    dose: { ar: '100–250 مجم مستخلص معياري غني بـ AKBA يوميًا', en: '100–250 mg of an AKBA-standardised extract daily' },
    when: { ar: 'مع الأكل، ولمدة 8–12 أسبوع قبل الحكم عليه', en: 'With food, for 8–12 weeks before judging it' },
    use: { ar: 'فيه أبحاث صغيرة على تقليل الألم في خشونة الركبة — مش على الإصابات الرياضية الحادة', en: 'Small studies show reduced pain in knee osteoarthritis — not in acute sports injuries' },
    care: { ar: 'ممكن يعمل حموضة واضطراب معدة. ممكن يتعارض مع مسيّلات الدم. مش للحامل أو المرضعة. الألم المستمر في المفصل محتاج تشخيص الأول.', en: 'May cause heartburn and gut upset. May interact with blood thinners. Not for pregnancy or breastfeeding. Persistent joint pain needs a diagnosis first.' }
  },
  {
    id: 'sup_uc2', cat: 'joint', icon: '', grade: 'limited',
    ar: 'كولاجين نوع 2 غير مُمسوخ (UC-II)', en: 'Undenatured type II collagen (UC-II)',
    dose: { ar: '40 مجم يوميًا (بيدّي 10 مجم كولاجين نشط)', en: '40 mg daily (providing 10 mg active collagen)' },
    when: { ar: 'مرة واحدة يوميًا، ويفضّل على معدة فاضية', en: 'Once daily, ideally on an empty stomach' },
    use: { ar: 'بيشتغل على المناعة في المفصل بجرعة صغيرة جدًا — أبحاث قليلة على ألم الركبة', en: 'Acts on joint immune signalling at a tiny dose — limited research on knee pain' },
    care: { ar: 'غير الكولاجين المتحلل اللي بيتاخد بالـ 15 جم — مايتبدلوش ببعض. مصدره غضروف فراخ، فاللي عنده حساسية فراخ أو بيض يتجنّبه. مفيش بيانات كفاية للحامل أو المرضعة.', en: 'Not the same as hydrolysed collagen taken at 15 g — they are not interchangeable. Sourced from chicken cartilage, so avoid with chicken or egg allergy. Not enough data for pregnancy or breastfeeding.' }
  },

  /* ---------------- استشفاء ونوم ---------------- */
  {
    id: 'sup_theanine', cat: 'recovery', icon: '', grade: 'limited',
    ar: 'إل ثيانين', en: 'L-theanine',
    dose: { ar: '100–200 مجم', en: '100–200 mg' },
    when: { ar: 'مع الكافيين الصبح، أو قبل النوم بساعة', en: 'With caffeine in the morning, or one hour before bed' },
    use: { ar: 'ممكن يهدّي التوتر ويقلل رعشة الكافيين — الدليل على النوم ضعيف', en: 'May ease tension and take the jittery edge off caffeine — sleep evidence is weak' },
    care: { ar: 'ممكن ينزّل الضغط شوية، فاللي بياخد دوا ضغط أو منوّمات يسأل طبيبه أو الصيدلي. مفيش بيانات كفاية للحامل أو المرضعة. للرياضي: منتج عليه اختبار طرف ثالث.', en: 'May lower blood pressure slightly, so anyone on blood-pressure medication or sedatives should ask their doctor or pharmacist. Not enough data for pregnancy or breastfeeding. Tested athletes: use a third-party tested product.' }
  },
  {
    id: 'sup_glycine', cat: 'recovery', icon: '', grade: 'limited',
    ar: 'جلايسين', en: 'Glycine',
    dose: { ar: '3 جم', en: '3 g' },
    when: { ar: 'قبل النوم بساعة', en: 'One hour before bed' },
    use: { ar: 'فيه أبحاث صغيرة إنه بيحسّن الإحساس بجودة النوم ويقلل التعب الصبح', en: 'Small studies suggest better perceived sleep quality and less morning fatigue' },
    care: { ar: 'بيقلل مفعول دوا الكلوزابين — ممنوع معاه. مفيش بيانات كفاية للحامل أو المرضعة. قلة النوم المستمرة محتاجة ضبط مواعيد أو تقييم طبي، مش مكمل.', en: 'Reduces the effect of clozapine — do not combine. Not enough data for pregnancy or breastfeeding. Ongoing poor sleep needs schedule changes or a medical review, not a supplement.' }
  },
  {
    id: 'sup_nac', cat: 'recovery', icon: '', grade: 'limited',
    ar: 'إن أسيتيل سيستين (NAC)', en: 'N-acetylcysteine (NAC)',
    dose: { ar: '600–1200 مجم يوميًا', en: '600–1200 mg daily' },
    when: { ar: 'مع الأكل، ولفترة قصيرة', en: 'With food, for short periods' },
    use: { ar: 'مضاد أكسدة بيتباع للاستشفاء — الاستخدام اليومي الطويل ممكن يقلل تكيّف التدريب زي جرعات فيتامين سي الضخمة', en: 'An antioxidant sold for recovery — long-term daily use may blunt training adaptation, like vitamin C mega-doses' },
    care: { ar: 'في مصر ده دوا (مذيب للبلغم) — استشير الصيدلي. ممنوع مع النيتروجلسرين (بيعمل هبوط ضغط وصداع شديد). ممكن يعمل تقلّص في الشعب عند مريض الربو. بيعمل غثيان واضطراب معدة. الحامل والمرضعة بطبيب بس.', en: 'In Egypt it is sold as a medicine (mucolytic) — consult the pharmacist. Do not combine with nitroglycerin (severe low blood pressure and headache). May trigger bronchospasm in asthma. Causes nausea and gut upset. Pregnancy and breastfeeding only with a doctor.' }
  },

  /* ---------------- هضم ---------------- */
  {
    id: 'sup_glutamine', cat: 'gut', icon: '', grade: 'limited',
    ar: 'جلوتامين', en: 'Glutamine',
    dose: { ar: '5–10 جم', en: '5–10 g' },
    when: { ar: 'مع مياه، في أي وقت', en: 'With water, any time' },
    use: { ar: 'بيتباع للعضلة والمناعة — مفيش دليل إنه بيبني عضلة، وفيه أبحاث قليلة على نفاذية الأمعاء في مجهود التحمّل في الحر', en: 'Sold for muscle and immunity — no evidence it builds muscle; a little research on gut permeability during endurance work in heat' },
    care: { ar: 'ممنوع لمريض تليّف الكبد (ممكن يزوّد الأمونيا ويعمل لخبطة في الوعي) ولمريض الكلى. اللي عنده صرع أو اضطراب ثنائي القطب يسأل طبيبه. الحامل والمرضعة يتجنّبوه. للرياضي: منتج عليه اختبار طرف ثالث.', en: 'Avoid with liver cirrhosis (can raise ammonia and cause confusion) and with kidney disease. Anyone with epilepsy or bipolar disorder should ask their doctor. Avoid in pregnancy and breastfeeding. Tested athletes: use a third-party tested product.' }
  },
  {
    id: 'sup_ginger', cat: 'gut', icon: '', grade: 'moderate',
    ar: 'زنجبيل (مستخلص أو كبسولات)', en: 'Ginger (extract or capsules)',
    dose: { ar: '1–2 جم يوميًا مقسّمة', en: '1–2 g daily, split' },
    when: { ar: 'قبل السفر أو مع الأكل', en: 'Before travel, or with food' },
    use: { ar: 'بيقلل الغثيان ودوار الحركة، وفيه أبحاث صغيرة على وجع العضلات', en: 'Reduces nausea and motion sickness, with small studies on muscle soreness' },
    care: { ar: 'ممكن يتعارض مع مسيّلات الدم ومضادات الصفايح، وينزّل السكر مع أدوية السكر. ممكن يزوّد الحموضة. اللي عنده حصوات مرارة يسأل طبيبه. في غثيان الحمل الجرعة ماتعدّيش 1 جم في اليوم وبعد موافقة الطبيب.', en: 'May interact with blood thinners and antiplatelets, and lower glucose alongside diabetes medication. Can worsen heartburn. Anyone with gallstones should ask their doctor. For pregnancy nausea keep to 1 g a day or less, and only with the doctor\'s approval.' }
  },
  {
    id: 'sup_peppermint_oil', cat: 'gut', icon: '', grade: 'moderate',
    ar: 'زيت النعناع (كبسولات مغلّفة معويًا)', en: 'Peppermint oil (enteric-coated capsules)',
    dose: { ar: '180–225 مجم، 2–3 مرات يوميًا', en: '180–225 mg, 2–3 times daily' },
    when: { ar: 'قبل الأكل بنص ساعة لساعة', en: '30–60 minutes before meals' },
    use: { ar: 'بيقلل المغص والانتفاخ في القولون العصبي', en: 'Reduces cramping and bloating in irritable bowel syndrome' },
    care: { ar: 'بيزوّد الارتجاع والحموضة. ماتكسرش الكبسولة. مضادات الحموضة ومثبطات مضخة البروتون (زي الأوميبرازول) بتدوّب الغلاف بدري — خليهم بعيد بساعتين. بيتداخل مع السيكلوسبورين. تشخيص القولون العصبي لازم من طبيب الأول. مفيش بيانات كفاية للحامل.', en: 'Worsens reflux and heartburn. Do not break the capsule. Antacids and proton-pump inhibitors (e.g. omeprazole) dissolve the coating early — keep them two hours apart. Interacts with ciclosporin. IBS must be diagnosed by a doctor first. Not enough data for pregnancy.' }
  },

  /* ---------------- تحكم في الوزن ---------------- */
  {
    id: 'sup_cla', cat: 'weight', icon: '', grade: 'limited',
    ar: 'سي إل إيه (CLA)', en: 'Conjugated linoleic acid (CLA)',
    dose: { ar: '3–4 جم يوميًا', en: '3–4 g daily' },
    when: { ar: 'مع الوجبات', en: 'With meals' },
    use: { ar: 'بيتباع لحرق الدهون — التأثير في الأبحاث ضئيل جدًا ومالوش قيمة عملية مقارنة بالعجز في السعرات', en: 'Sold for fat loss — the effect in studies is tiny and of no practical value next to a calorie deficit' },
    care: { ar: 'ممكن يزوّد مقاومة الإنسولين ودهون الكبد وينزّل الكوليسترول النافع في بعض الأبحاث — مريض السكر أو الكبد الدهني يتجنّبه. ممكن يتعارض مع مسيّلات الدم. مش للحامل أو المرضعة. للرياضي: منتج عليه اختبار طرف ثالث.', en: 'Some studies show worse insulin resistance, more liver fat and lower HDL — avoid with diabetes or fatty liver. May interact with blood thinners. Not for pregnancy or breastfeeding. Tested athletes: use a third-party tested product.' }
  },
  {
    id: 'sup_berberine', cat: 'weight', icon: '', grade: 'limited',
    ar: 'بربرين', en: 'Berberine',
    dose: { ar: '500 مجم، 2–3 مرات يوميًا', en: '500 mg, 2–3 times daily' },
    when: { ar: 'مع الوجبات', en: 'With meals' },
    use: { ar: 'فيه أبحاث على تحسين السكر والدهون في الدم، واتشهر على السوشيال كبديل للأدوية — تأثيره على الوزن صغير', en: 'Some research on blood glucose and lipids, and hyped online as a drug alternative — its effect on weight is small' },
    care: { ar: 'ممنوع تمامًا للحامل والمرضعة (خطر على الجنين والرضيع). بيتداخل مع أدوية كتير: أدوية السكر (ميتفورمين، إنسولين، سلفونيل يوريا) وممكن يعمل هبوط سكر، والسيكلوسبورين، وأدوية بتتكسّر في الكبد — لازم مراجعة صيدلي. بيعمل إمساك واضطراب معدة. مش بديل لعلاج السكر.', en: 'Strictly avoid in pregnancy and breastfeeding (risk to the baby). Interacts with many drugs: diabetes medication (metformin, insulin, sulfonylureas) with a risk of low blood glucose, ciclosporin, and drugs cleared by the liver — needs a pharmacist review. Causes constipation and gut upset. Not a replacement for diabetes treatment.' }
  },
  {
    id: 'sup_glucomannan', cat: 'weight', icon: '', grade: 'limited',
    ar: 'جلوكومانان (ألياف الكونجاك)', en: 'Glucomannan (konjac fibre)',
    dose: { ar: '1 جم قبل كل وجبة (3 جم يوميًا) مع كوباية أو اتنين مياه', en: '1 g before each meal (3 g daily) with one to two glasses of water' },
    when: { ar: 'قبل الوجبة بنص ساعة', en: '30 minutes before a meal' },
    use: { ar: 'ألياف بتنفخ في المعدة وبتدّي إحساس بالشبع — التأثير على الوزن صغير ولازم مع عجز سعرات', en: 'A fibre that swells in the stomach for fullness — the weight effect is small and only alongside a calorie deficit' },
    care: { ar: 'ممكن يسد الزور أو المريء لو اتاخد ناشف أو من غير مياه كفاية — ممنوع للي عنده صعوبة بلع. خليه بعيد عن الأدوية بساعة على الأقل لأنه بيقلل امتصاصها. مع أدوية السكر ممكن ينزّل السكر. بيعمل انتفاخ في الأول.', en: 'Can block the throat or oesophagus if taken dry or without enough water — avoid with any swallowing difficulty. Keep at least one hour from medication, as it reduces absorption. May lower glucose alongside diabetes medication. Causes bloating at first.' }
  },

  /* ---------------- ترطيب وأملاح ---------------- */
  {
    id: 'sup_glycerol', cat: 'hydration', icon: '', grade: 'moderate',
    ar: 'جليسرول (فرط ترطيب)', en: 'Glycerol (hyperhydration)',
    dose: { ar: '1–1.2 جم لكل كيلو مع 25–35 مل مياه لكل كيلو', en: '1–1.2 g per kg with 25–35 ml water per kg' },
    when: { ar: 'قبل المنافسة بساعة ونص لـ 3 ساعات، في سباقات تحمّل طويلة في الحر', en: '1.5–3 hours before competition, for long endurance events in the heat' },
    use: { ar: 'بيخلّي الجسم يحتفظ بمياه زيادة قبل السباق عشان يقلل الجفاف في الحر', en: 'Helps the body hold extra fluid before a race to reduce dehydration in the heat' },
    care: { ar: 'بيزوّد الوزن 0.5–1 كيلو، فمش مناسب لرياضات الأوزان أو الطلوع. ممكن يعمل صداع وغثيان وانتفاخ — يتجرّب في التمرين الأول. ممنوع لمريض الكلى أو القلب أو الضغط، وللحامل. كشف المنشطات: اتشال من قائمة WADA سنة 2018 كمادة ممنوعة، بس راجع القائمة الحالية مع هيئة مكافحة المنشطات، والحقن الوريدي فوق 100 مل في 12 ساعة ممنوع في كل الأحوال. اختار منتج عليه اختبار طرف ثالث.', en: 'Adds 0.5–1 kg of body weight, so unsuitable for weight-class or climbing events. May cause headache, nausea and bloating — trial it in training first. Avoid with kidney, heart or blood-pressure disease, and in pregnancy. Anti-doping: removed from the WADA prohibited list in 2018, but check the current list with your anti-doping organisation; IV infusions over 100 ml per 12 hours remain prohibited regardless. Choose a third-party tested product.' }
  }
];
