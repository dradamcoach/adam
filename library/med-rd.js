/*
 * ADAM — مسودات المكتبة الطبية من اقتراحات قسم البحث والتطوير (R&D)
 *
 * مهم جدًا: كل المقالات هنا مسودات (status: 'draft') — مش معتمدة ومش
 * هتوصل لأي عميل إلا بعد ما الطبيب المراجع يقراها ويعدّلها ويوافق عليها
 * من داخل التطبيق. مفيش فيها أي جرعات دوائية ولا تشخيص لحالة بعينها،
 * ومش بديل عن الكشف أو العلاج.
 *
 * IMPORTANT: every entry is a DRAFT awaiting physician review. Nothing
 * here may reach a client until a doctor has reviewed, edited and
 * approved it in the app. No drug dosing, no individual diagnosis.
 *
 * Shape: the six fields used by MED_LIBRARY_SEED / MED_LIBRARY_SEED_EXTRA
 * (specialty, category, title, titleEn, body, bodyEn) plus these extra
 * fields, which the current seeding code in app.js ignores:
 *   id          stable key for this batch
 *   status      MED_REVIEW key; always 'draft' here, never 'approved'
 *   audience    'coach' (team-facing) or 'client' (client education)
 *   sources     [{ title, journal, year, url, doi?, read }]
 *               read: true  = abstract/summary was actually read while drafting
 *               read: false = cited from established knowledge, NOT re-read
 *                             in this drafting session; reviewer must verify
 *   reviewNote  English note for the reviewing doctor: what to check first
 * The sources are also written out at the end of body/bodyEn, so they
 * survive even if only the six base fields are imported.
 *
 * SOURCE ACCESS LOG (drafting session, 2026-09-25):
 *  - PubMed pages themselves could not be fetched (rate-limited / reCAPTCHA),
 *    except 41794189 (depression umbrella review), which was read in full.
 *  - 41268875 (MAFLD, Nutr Rev): read via the publisher page (OUP): abstract
 *    opening + key findings summary (frequency, intensity, duration, type,
 *    quality rating). Full results section not read.
 *  - 41665740 (resistance training & brain-age clocks, GeroScience): read via
 *    the PMC full-text page (abstract, participants, intervention, results,
 *    limitations).
 *  - 41762427 (concurrent training umbrella review, Sports Med): abstract read
 *    via the publisher page (Springer). Session-spacing (hours) and modality
 *    (cycling vs running) rules are NOT from this paper — they come from
 *    earlier consensus/meta-analyses and are labelled as such.
 *  - 41963141 (women's resistance training, J Sci Med Sport): abstract read
 *    via ScienceDirect.
 *  - 41877354 (lean mass & incretin therapy, Diabetes Obes Metab): COULD NOT
 *    BE READ. A search suggests it may be Eisa et al. 2026, "Lean Mass Changes
 *    With Incretin Therapy Versus Lifestyle Intervention: A Systematic Review
 *    and Meta-Analysis of Randomised Controlled Trials" (DOI
 *    10.1111/dom.70666), but this was not confirmed and none of its results
 *    are used. That entry relies only on established consensus, and makes no
 *    claim about the paper's findings.
 */

export const MED_LIBRARY_RD = [

  /* ============ 1) الرياضة والكبد الدهني (MAFLD) — للمدرب والأخصائي ============ */
  {
    id: 'rd_mafld_exercise',
    status: 'draft',
    audience: 'coach',
    specialty: 'sports_medicine',
    category: 'protocol',
    title: 'الرياضة لمرضى الكبد الدهني المرتبط بخلل التمثيل الغذائي (MAFLD) — دليل للمدرب والأخصائي',
    titleEn: 'Exercise for metabolic dysfunction–associated fatty liver disease (MAFLD) — a guide for coaches and specialists',
    body: 'الكبد الدهني المرتبط بخلل التمثيل الغذائي (MAFLD، وبيتسمى كمان MASLD، واسمه القديم NAFLD) معناه تراكم دهون في الكبد مع وجود عامل أيضي زي زيادة الوزن، أو السكري نوع ٢، أو ارتفاع دهون الدم، أو الضغط. ده من أشهر أمراض الكبد، وبيرتبط بزيادة خطر أمراض القلب. الإرشادات الطبية بتعتبر الرياضة مع تعديل الأكل أساس التعامل معاه، والتشخيص والمتابعة بيفضلوا مع الطبيب.\n\n'
      + 'مراجعة شاملة حديثة (Umbrella review) في مجلة Nutrition Reviews جمعت المراجعات المنهجية اللي درست الرياضة في الحالة دي. الخلاصة: تمرين من 2 لـ 5 مرات في الأسبوع، بشدة متوسطة لعالية، والجلسة من 30 لـ 60 دقيقة، والجمع بين التمرين الهوائي وتمارين المقاومة هو الأولوية لو مفيش مانع طبي. أكتر نتيجة اتكررت في الأبحاث كانت تحسّن دهون الدم. لكن الباحثين نفسهم قالوا إن حوالي 82% من المراجعات اللي جمعوها جودتها منخفضة أو منخفضة جدًا — يعني الاتجاه العام واضح، لكن "الجرعة المثالية" لسه مش محسومة.\n\n'
      + 'ده ماشي مع الإرشادات الطبية الكبيرة: حوالي 150 دقيقة أو أكتر في الأسبوع نشاط هوائي متوسط الشدة (أو حوالي 75 دقيقة نشاط شديد)، مع تمارين مقاومة مرتين أو تلاتة في الأسبوع، ونزول وزن تدريجي لو فيه زيادة وزن. الرياضة ممكن تقلل دهون الكبد حتى لو الوزن نزل شوية بس، ونزول وزن أكبر بيرتبط عادةً بتحسّن أكبر — وتقييم ده بالتحاليل والأشعة شغل الطبيب مش المدرب.\n\n'
      + 'للمدرب عمليًا:\n'
      + '- متفعّلش أي برنامج قبل الإذن الطبي المكتوب (حالة الكبد في ملف العميل محتاجة إذن طبي).\n'
      + '- ابدأ بشدة خفيفة لمتوسطة (مجهود 4–6 من 10)، وزوّد المدة الأول وبعدين الشدة، والمقاومة تبدأ بمجموعتين وتوصل لتلاتة.\n'
      + '- استخدم القالب التدريبي الطبي الخاص بالحالة دي كنقطة بداية بعد موافقة الطبيب.\n'
      + '- ممنوع أي مكمّل "حرق دهون" خالص، لأن بعض المكملات دي ممكن تضر الكبد، وأي مكمل لازم يعدّي على الطبيب.\n'
      + '- البرنامج ده مش مناسب لو فيه تليّف متقدم أو تشمّع في الكبد (Cirrhosis) — الحالات دي محتاجة خطة من طبيب الكبد نفسه.\n\n'
      + 'وقّف التمرين ووجّه للطبيب فورًا لو ظهر: اصفرار في العين أو الجلد، ألم في الجنب اليمين من فوق، انتفاخ أو تورّم في البطن، قيء فيه دم أو براز أسود، أو أي علامة خطر عامة زي ألم الصدر أو ضيق نفس غير طبيعي أو دوخة وإغماء.\n\n'
      + 'المصادر: Huang X وآخرون، Nutrition Reviews (2025) — https://pubmed.ncbi.nlm.nih.gov/41268875/ ؛ إرشادات EASL-EASD-EASO لمرض الكبد الدهني (2024).',
    bodyEn: 'Metabolic dysfunction–associated fatty liver disease (MAFLD, also called MASLD; formerly NAFLD) means fat build-up in the liver together with a metabolic risk factor such as excess weight, type 2 diabetes, raised blood lipids or high blood pressure. It is one of the most common liver conditions and is linked to higher cardiovascular risk. Medical guidelines treat exercise plus dietary change as the foundation of management; diagnosis and monitoring stay with the doctor.\n\n'
      + 'A recent umbrella review in Nutrition Reviews pooled the systematic reviews on exercise for this condition. In summary: exercise 2–5 times per week, at moderate-to-high intensity, for 30–60 minutes per session, with combined aerobic and resistance training prioritised when there is no medical contraindication. The most consistently reported improvement was in blood lipids. The authors also rated about 82% of the included reviews as low or critically low quality — so the overall direction is clear, but the "ideal dose" is not settled.\n\n'
      + 'This fits the major clinical guidelines: roughly 150 minutes or more per week of moderate aerobic activity (or about 75 minutes of vigorous activity), resistance training two or three times per week, and gradual weight loss where there is excess weight. Exercise can reduce liver fat even with modest weight loss, and larger weight loss is generally associated with greater improvement — assessing this with blood tests and imaging is the doctor\'s job, not the coach\'s.\n\n'
      + 'Practical points for the coach:\n'
      + '- Do not activate any programme before written medical clearance (the liver condition in the client file requires clearance).\n'
      + '- Start at light-to-moderate effort (RPE 4–6 out of 10); increase duration first and intensity second; resistance work starts at two sets and builds to three.\n'
      + '- Use the medical training template for this condition as a starting point once the doctor has approved it.\n'
      + '- No "fat-burner" supplements at all — some can harm the liver — and any supplement goes through the doctor.\n'
      + '- This approach is not suitable for advanced fibrosis or cirrhosis; those clients need a plan from their liver specialist.\n\n'
      + 'Stop exercise and refer to the doctor immediately for: yellowing of the eyes or skin, pain in the upper right abdomen, abdominal swelling, vomiting blood or black stools, or any general red flag such as chest pain, unusual breathlessness, dizziness or fainting.\n\n'
      + 'Sources: Huang X et al., Nutrition Reviews (2025) — https://pubmed.ncbi.nlm.nih.gov/41268875/ ; EASL-EASD-EASO Clinical Practice Guidelines on MASLD (2024).',
    sources: [
      {
        title: 'Exercise-Based Interventions for Metabolic Dysfunction–Associated Fatty Liver Disease: An Umbrella Review of Systematic Reviews and Meta-Analyses',
        journal: 'Nutrition Reviews', year: 2025,
        url: 'https://pubmed.ncbi.nlm.nih.gov/41268875/',
        doi: '10.1093/nutrit/nuaf145',
        read: true
      },
      {
        title: 'EASL-EASD-EASO Clinical Practice Guidelines on the management of metabolic dysfunction-associated steatotic liver disease (MASLD)',
        journal: 'Journal of Hepatology', year: 2024,
        url: 'https://doi.org/10.1016/j.jhep.2024.04.031',
        doi: '10.1016/j.jhep.2024.04.031',
        read: false
      }
    ],
    reviewNote: 'Umbrella-review figures (2–5x/week, 30–60 min, moderate-high intensity, combined AT+RT, 82% low/critically-low quality) come from the publisher abstract/summary; the full results were not read. The 150 min/week guideline figure and the DOI of the EASL-EASD-EASO 2024 guideline are from memory and were not re-read — please verify. Also confirm the cirrhosis exclusion wording and the red-flag list.'
  },

  /* ============ 2) تمارين المقاومة وشيخوخة المخ — تثقيف لكبار السن ============ */
  {
    id: 'rd_resistance_brain_aging',
    status: 'draft',
    audience: 'client',
    specialty: 'sports_medicine',
    category: 'education',
    title: 'تمارين المقاومة ومخّك بعد الستين — إيه اللي نعرفه فعلًا؟',
    titleEn: 'Strength training and your brain after 60 — what we actually know',
    body: 'فيه دراسة حديثة مهمة اتنشرت في مجلة GeroScience: حوالي 300 شخص من كبار السن الأصحاء في الدنمارك (أعمارهم من 62 لـ 70 سنة) اتقسموا بالقرعة لتلات مجموعات: تمارين مقاومة بأوزان تقيلة تحت إشراف 3 مرات في الأسبوع، أو تمارين مقاومة متوسطة (مرة تحت إشراف ومرتين في البيت)، أو مجموعة كمّلت حياتها العادية. التمرين استمر سنة، والمتابعة بأشعة الرنين المغناطيسي على المخ استمرت سنتين.\n\n'
      + 'الباحثين استخدموا حاجة اسمها "عُمر المخ" — ده تقدير بالكمبيوتر من صور الرنين بيقارن مخ الشخص بمخ ناس في أعمار مختلفة. في المجموعتين اللي اتمرنوا، "عمر المخ" المقدّر كان أصغر بحوالي سنة ونص لسنتين وربع مقارنةً بالبداية، ومجموعة المقارنة متغيرتش بشكل واضح. والحلو إن التمرين المتوسط جاب نتيجة قريبة جدًا من التقيل.\n\n'
      + 'لكن خلّينا نكون أمناء في فهم النتيجة:\n'
      + '- "عمر المخ" ده مقياس بحثي من الأشعة، مش تشخيص ومش اختبار ذاكرة.\n'
      + '- الدراسة مابتثبتش إن تمارين المقاومة بتمنع الزهايمر أو الخرف.\n'
      + '- المشاركين كانوا أصحاء ومن بلد أوروبي عالي الدخل، فالنتيجة ممكن تختلف عند ناس تانية.\n'
      + '- الفرق (سنة لسنتين) لسه محتاج دراسات أطول نعرف منها معناه الحقيقي على الصحة.\n\n'
      + 'الرسالة العملية: تمارين المقاومة لكبار السن مفيدة ومعروفة الفايدة للعضلات والعظام والتوازن والقدرة على الحركة اليومية، والدراسة دي بتضيف إشارة مشجعة إنها ممكن تفيد المخ كمان. مش لازم أوزان تقيلة — تمرين متوسط منتظم مرتين لتلات مرات في الأسبوع، يشمل عضلات الجسم الكبيرة، وبيتدرّج بهدوء، ده بداية ممتازة.\n\n'
      + 'قبل ما تبدأ: لو عندك مرض في القلب، أو ضغط مش منتظم، أو سكر، أو هشاشة عظام، أو أي حالة مزمنة، اتكلم مع دكتورك الأول. وأول فترة يكون التمرين مع مدرب يراجع الأداء. وقّف فورًا وكلّم الدكتور لو حسيت بألم في الصدر، أو ضيق نفس غير طبيعي، أو دوخة.\n\n'
      + 'المصدر: Gonzalez-Gomez R وآخرون، GeroScience (2026) — https://pubmed.ncbi.nlm.nih.gov/41665740/',
    bodyEn: 'A notable recent study in the journal GeroScience randomly assigned about 300 healthy older adults in Denmark (aged 62–70) to one of three groups: supervised heavy resistance training three times a week, moderate-intensity resistance training (once supervised plus twice at home each week), or carrying on with their usual routine. The training lasted one year, and brain MRI follow-up continued for two years.\n\n'
      + 'The researchers used a measure called "brain age" — a computer estimate from MRI scans that compares a person\'s brain to brains of people at different ages. In both training groups, estimated brain age was about 1.4 to 2.3 years younger than at the start, while the comparison group showed no clear change. Encouragingly, moderate training did about as well as heavy training.\n\n'
      + 'But let us be honest about what this means:\n'
      + '- "Brain age" is a research measure from imaging, not a diagnosis and not a memory test.\n'
      + '- The study does not show that strength training prevents Alzheimer\'s disease or dementia.\n'
      + '- Participants were healthy people from a high-income European country, so results may differ in other groups.\n'
      + '- A difference of one to two years still needs longer studies to show what it means for health.\n\n'
      + 'The practical message: strength training in later life has well-established benefits for muscle, bone, balance and everyday function, and this study adds an encouraging sign that it may help the brain too. Heavy weights are not required — regular moderate training two to three times a week, covering the major muscle groups and progressing gently, is an excellent start.\n\n'
      + 'Before you start: if you have heart disease, uncontrolled blood pressure, diabetes, osteoporosis or any long-term condition, talk to your doctor first, and train with a coach who checks your technique at the beginning. Stop and contact your doctor straight away if you feel chest pain, unusual breathlessness or dizziness.\n\n'
      + 'Source: Gonzalez-Gomez R et al., GeroScience (2026) — https://pubmed.ncbi.nlm.nih.gov/41665740/',
    sources: [
      {
        title: 'Randomized controlled trial of resistance exercise and brain aging clocks',
        journal: 'GeroScience', year: 2026,
        url: 'https://pubmed.ncbi.nlm.nih.gov/41665740/',
        doi: '10.1007/s11357-026-02141-x',
        read: true
      }
    ],
    reviewNote: 'Trial details (LISA trial, n=309, ages 62-70, HRT 3x/week supervised vs MIT 1 supervised + 2 home sessions vs control; brain-age gap reduction ~1.4-2.3 years; authors\' limitations) were read on the PMC full-text page. Please check that the tone does not overclaim and that the pre-exercise screening list suits older clients.'
  },

  /* ============ 3) الحفاظ على العضلات مع أدوية التخسيس (GLP-1) ============ */
  /* Paper 41877354 could NOT be read — see access log at top. This entry
     relies only on established consensus and makes no claim about that
     paper's results. */
  {
    id: 'rd_glp1_lean_mass',
    status: 'draft',
    audience: 'coach',
    specialty: 'doctor',
    category: 'medication',
    title: 'الحفاظ على العضلات أثناء أدوية التخسيس (زي سيماجلوتايد وتيرزيباتايد)',
    titleEn: 'Preserving lean mass during incretin weight-loss medication (e.g. semaglutide, tirzepatide)',
    body: 'أدوية التخسيس الحديثة اللي بتشتغل على هرمونات الإنكريتين (زي سيماجلوتايد وتيرزيباتايد) بتقلل الشهية وبتساعد على نزول وزن كبير. لكن أي نزول وزن — بالدوا أو بالرجيم — جزء منه بيكون من "الكتلة غير الدهنية" (Lean mass)، ودي بتشمل العضلات. في الدراسات اللي قاست تكوين الجسم، جزء ملحوظ من الوزن النازل مع الأدوية دي كان كتلة غير دهنية، والأبحاث لسه بتقارن ده بنزول الوزن بتغيير نمط الحياة لوحده، ولسه بتدرس تأثيره الحقيقي على القوة والحركة.\n\n'
      + 'ليه ده يهمنا كفريق؟ لأن العضلات مهمة للقوة، والحركة اليومية، والتوازن، والتمثيل الغذائي — خصوصًا عند كبار السن أو اللي عضلاتهم قليلة من الأول. الهدف إن أغلب الوزن النازل يكون دهون، مش عضلات.\n\n'
      + 'اللي عليه اتفاق واسع بين الخبراء:\n'
      + '- تمارين المقاومة: مرتين لتلات مرات في الأسبوع على كل عضلات الجسم الكبيرة، مع تدرّج في الحمل. دي أهم أداة للحفاظ على العضلات.\n'
      + '- البروتين: مع قلة الشهية ناس كتير بياكلوا بروتين أقل من احتياجهم. أخصائي التغذية هو اللي بيحدد الكمية المناسبة لكل عميل، وكتير من المراجعات بتقترح هدف أعلى من الحد الأدنى العام — إلا لو فيه مرض في الكلى أو سبب طبي تاني، وده يتأكد مع الطبيب. عمليًا: البروتين أول حاجة في الوجبة، ويتوزع على الوجبات.\n'
      + '- الحركة اليومية والمشي وشرب مية كفاية، خصوصًا لو فيه غثيان أو قيء.\n'
      + '- متابعة القوة والأداء (مش الميزان بس)، وقياس تكوين الجسم لو متاح.\n\n'
      + 'حدود دورنا — مهم جدًا:\n'
      + '- الدوا وجرعته وأي تغيير فيه قرار الطبيب اللي كاتبه بس. المدرب أو أخصائي التغذية ميقترحش دوا ولا جرعة ولا يوقفه.\n'
      + '- لو العميل بياخد أدوية سكر تانية (زي الإنسولين أو السلفونيل يوريا) ممكن السكر يقل مع التمرين — لازم دكتوره يكون عارف البرنامج.\n\n'
      + 'وجّه العميل لدكتوره بسرعة لو ظهر: ألم شديد ومستمر في البطن (ممكن يمتد للضهر)، قيء مستمر أو علامات جفاف (دوخة، قلة تبوّل)، ألم في الجنب اليمين من فوق، أعراض هبوط سكر (رعشة، عرق بارد، تشوّش)، أو ضعف واضح ومتزايد في القوة.\n\n'
      + 'المصادر: الورقة اللي اقترحها قسم البحث https://pubmed.ncbi.nlm.nih.gov/41877354/ (لم تتم قراءتها أثناء كتابة المسودة — محتاجة مراجعة) ؛ Neeland IJ وآخرون، Diabetes Obes Metab (2024) — https://pubmed.ncbi.nlm.nih.gov/38937282/',
    bodyEn: 'Modern weight-loss medications that act on incretin hormones (such as semaglutide and tirzepatide) reduce appetite and can produce large weight loss. But any weight loss — with medication or diet — includes some loss of lean mass, which includes muscle. In studies that measured body composition, a noticeable share of the weight lost on these medications was lean mass; research is still comparing this with lifestyle-only weight loss and still studying what it means for strength and function.\n\n'
      + 'Why this matters to the team: muscle matters for strength, daily function, balance and metabolic health — especially in older adults or people who start with low muscle mass. The aim is for most of the weight lost to be fat, not muscle.\n\n'
      + 'Where there is broad expert agreement:\n'
      + '- Resistance training: two to three times per week, covering all major muscle groups, with progressive loading. This is the main tool for preserving muscle.\n'
      + '- Protein: with reduced appetite many people eat less protein than they need. The nutrition specialist sets each client\'s target; many reviews suggest aiming above the general minimum — unless there is kidney disease or another medical reason, which must be checked with the doctor. In practice: protein first on the plate, spread across meals.\n'
      + '- Daily movement, walking, and enough fluids — especially with nausea or vomiting.\n'
      + '- Track strength and performance (not just the scale), and body composition if available.\n\n'
      + 'The limits of our role — essential:\n'
      + '- The medication, its dose and any change to it are decided only by the prescribing doctor. Coaches and nutrition specialists do not suggest, dose, or stop medication.\n'
      + '- If the client also takes other glucose-lowering drugs (such as insulin or sulfonylureas), exercise can lower blood sugar — the doctor must know about the programme.\n\n'
      + 'Refer the client promptly to their doctor for: severe, persistent abdominal pain (possibly spreading to the back), persistent vomiting or signs of dehydration (dizziness, reduced urination), pain in the upper right abdomen, symptoms of low blood sugar (shakiness, cold sweat, confusion), or clear, progressive loss of strength.\n\n'
      + 'Sources: paper suggested by R&D https://pubmed.ncbi.nlm.nih.gov/41877354/ (not read while drafting — needs review); Neeland IJ et al., Diabetes Obes Metab (2024) — https://pubmed.ncbi.nlm.nih.gov/38937282/',
    sources: [
      {
        title: 'Paper suggested by R&D (PMID 41877354) — NOT READ; possibly Eisa et al. 2026, "Lean Mass Changes With Incretin Therapy Versus Lifestyle Intervention: A Systematic Review and Meta-Analysis of Randomised Controlled Trials" (unconfirmed)',
        journal: 'Diabetes, Obesity and Metabolism', year: 2026,
        url: 'https://pubmed.ncbi.nlm.nih.gov/41877354/',
        read: false
      },
      {
        title: 'Changes in lean body mass with glucagon-like peptide-1-based therapies and mitigation strategies',
        journal: 'Diabetes, Obesity and Metabolism', year: 2024,
        url: 'https://pubmed.ncbi.nlm.nih.gov/38937282/',
        doi: '10.1111/dom.15728',
        read: false
      }
    ],
    reviewNote: 'PRIORITY. Neither cited paper was read in this session; the entry uses general consensus only. Please (1) confirm what PMID 41877354 actually is and whether its findings change the text, (2) decide whether to add a numeric protein range (deliberately omitted) and the kidney caveat, (3) check the referral red flags (pancreatitis, gallbladder, dehydration, hypoglycaemia with insulin/sulfonylureas). No drug dosing is included.'
  },

  /* ============ 4) التدريب المتزامن (قوة + تحمّل) — للمدرب ============ */
  {
    id: 'rd_concurrent_training',
    status: 'draft',
    audience: 'coach',
    specialty: 'sports_medicine',
    category: 'protocol',
    title: 'التدريب المتزامن (قوة + تحمّل): إزاي نقلل التعارض بينهم',
    titleEn: 'Concurrent training (strength + endurance): minimising interference',
    body: 'التدريب المتزامن معناه إن العميل يجمع تمارين المقاومة وتمارين التحمّل (جري، عجلة، سباحة...) في نفس البرنامج. من زمان فيه قلق من "تأثير التعارض" (Interference effect) — إن الكارديو يقلل مكاسب القوة والعضلات.\n\n'
      + 'مراجعة شاملة حديثة في مجلة Sports Medicine جمعت 17 تحليل تجميعي (144 دراسة، حوالي 1500 مشارك أصحاء، أغلبهم متمرنين على مستوى ترفيهي). النتايج:\n'
      + '- اللياقة الهوائية اتحسنت بالتدريب المتزامن زي تدريب التحمّل لوحده تقريبًا.\n'
      + '- مكاسب القوة والقدرة الانفجارية وحجم العضلات كانت قريبة من تدريب المقاومة لوحده.\n'
      + '- ترتيب التمرين في نفس اليوم مكانش ليه تأثير واضح إحصائيًا بشكل عام، لكن فيه اتجاه إن المقاومة قبل الكارديو ممكن تكون أفضل للقوة والعضلات.\n'
      + '- البيانات على الرياضيين المحترفين والنخبة قليلة، فالنتيجة دي أساسًا للمتمرنين العاديين.\n\n'
      + 'قواعد عملية للمدرب (جزء منها من المراجعة دي، وجزء من الإجماع العلمي والأبحاث الأقدم):\n'
      + '- للعميل العادي: متشيلش الكارديو خوفًا على العضلات — الجمع بينهم مفيد للصحة واللياقة.\n'
      + '- لو الأولوية قوة أو تضخيم: خلي المقاومة الأول في نفس الجلسة، أو افصل بينهم في جلستين.\n'
      + '- لو الجلستين تقال في نفس اليوم: سيب بينهم كام ساعة (غالبًا 6 ساعات أو أكتر لو ينفع)، وحاول متحطش تدريب رجل تقيل مباشرةً بعد جري أو إنترفال عالي الشدة — دي قاعدة متعارف عليها من أبحاث سابقة مش من المراجعة دي.\n'
      + '- العجلة غالبًا بتتعارض أقل من الجري مع قوة الرجلين (من تحليل تجميعي أقدم)، فممكن تكون اختيار أفضل للكارديو عند اللي أولويتهم قوة الرجل.\n'
      + '- زوّد حجم الكارديو بالتدريج، لأن كتر عدد ومدة جلسات التحمّل ممكن يزوّد التعارض.\n'
      + '- الأكل والنوم الكويسين جزء من الحل: طاقة وبروتين كفاية وراحة بين الجلسات التقيلة.\n'
      + '- الرياضي المحترف أو اللي بيجهّز لمنافسة محتاج تخطيط فردي، لأن الأدلة عنده أقل.\n\n'
      + 'المصادر: Held S وآخرون، Sports Medicine (2026) — https://pubmed.ncbi.nlm.nih.gov/41762427/ ؛ Wilson JM وآخرون، J Strength Cond Res (2012) — تحليل تجميعي عن التعارض ونوع الكارديو.',
    bodyEn: 'Concurrent training means combining resistance training and endurance training (running, cycling, swimming, etc.) in the same programme. There has long been concern about an "interference effect" — that cardio blunts strength and muscle gains.\n\n'
      + 'A recent umbrella review in Sports Medicine pooled 17 meta-analyses (144 studies, about 1,500 healthy participants, mostly recreationally trained). Findings:\n'
      + '- Aerobic capacity improved about as much with concurrent training as with endurance training alone.\n'
      + '- Strength, power and hypertrophy gains were comparable to resistance training alone.\n'
      + '- Overall, exercise order within a day had no statistically clear effect, but there was a trend suggesting resistance before endurance may favour strength and hypertrophy.\n'
      + '- Data on highly trained and elite athletes are scarce, so these findings mainly apply to recreational trainees.\n\n'
      + 'Practical rules for coaches (partly from this review, partly from broader consensus and earlier research):\n'
      + '- For general clients: do not drop cardio to "protect muscle" — combining both benefits health and fitness.\n'
      + '- If strength or hypertrophy is the priority: put resistance first in the session, or split them into separate sessions.\n'
      + '- If both sessions are hard and on the same day: leave several hours between them (often 6 hours or more where possible), and avoid heavy leg training straight after hard running or high-intensity intervals — an established rule from earlier research, not from this review.\n'
      + '- Cycling tends to interfere less than running with lower-body strength (earlier meta-analysis), so it may be a better cardio choice when leg strength is the priority.\n'
      + '- Increase endurance volume gradually; higher endurance frequency and duration can increase interference.\n'
      + '- Nutrition and sleep are part of the answer: enough energy and protein, and recovery between hard sessions.\n'
      + '- Elite athletes or those preparing for competition need individual planning, as the evidence for them is thinner.\n\n'
      + 'Sources: Held S et al., Sports Medicine (2026) — https://pubmed.ncbi.nlm.nih.gov/41762427/ ; Wilson JM et al., J Strength Cond Res (2012) — meta-analysis on interference and endurance modality.',
    sources: [
      {
        title: 'Maximizing Adaptations in Concurrent Training: An Umbrella Review of Meta-analyses',
        journal: 'Sports Medicine', year: 2026,
        url: 'https://pubmed.ncbi.nlm.nih.gov/41762427/',
        doi: '10.1007/s40279-026-02401-y',
        read: true
      },
      {
        title: 'Concurrent training: a meta-analysis examining interference of aerobic and resistance exercises',
        journal: 'Journal of Strength and Conditioning Research', year: 2012,
        url: 'https://pubmed.ncbi.nlm.nih.gov/22002517/',
        read: false
      }
    ],
    reviewNote: 'Findings attributed to Held et al. come from the abstract (read). The abstract says sequence had "no significant effects" yet reports a trend with SMD 1.69, p<0.001 for RT-first strength — the text says "trend" only; please check the full paper for how to phrase this. The 6-hour spacing and the cycling-vs-running rule are from earlier literature (Wilson 2012; PMID cited from memory, not re-read) — please verify.'
  },

  /* ============ 5) نمط الحياة كدعم إضافي للمزاج المنخفض / الاكتئاب ============ */
  {
    id: 'rd_lifestyle_low_mood',
    status: 'draft',
    audience: 'client',
    specialty: 'psychologist',
    category: 'education',
    title: 'الرياضة والنوم والأكل كدعم للمزاج المنخفض والاكتئاب — جنب العلاج مش بداله',
    titleEn: 'Exercise, sleep and diet as support for low mood and depression — alongside treatment, not instead of it',
    body: 'الاكتئاب حالة صحية شائعة جدًا، مش ضعف شخصية ولا قلة إيمان ولا "دلع"، وبيتعالج. العلاج الأساسي بيكون مع المختص: علاج نفسي، أو دوا، أو الاتنين حسب تقييم الطبيب. والسؤال اللي بيتكرر: هل نمط الحياة ممكن يساعد جنب العلاج؟\n\n'
      + 'مراجعة شاملة حديثة (Umbrella review) في مجلة Complementary Therapies in Medicine جمعت 46 مراجعة منهجية عن تدخلات نمط الحياة كدعم إضافي لعلاج الاكتئاب عند البالغين. اللي لقوه:\n'
      + '- الرياضة كانت أكتر حاجة ليها تأثير ثابت، خصوصًا التمارين الهوائية متوسطة الشدة وتمارين المقاومة لما تكون تحت إشراف.\n'
      + '- تمارين العقل والجسم (زي اليوجا والتاي تشي) كان ليها فايدة متوسطة لكبيرة، خصوصًا عند كبار السن.\n'
      + '- تحسين الأكل كان ليه فايدة صغيرة لمتوسطة.\n'
      + '- الباحثين نبّهوا إن جودة أغلب الأبحاث منخفضة، فلسه محتاجين دراسات أقوى نعرف منها الكمية المناسبة ومدة استمرار الفايدة.\n\n'
      + 'خطوات صغيرة ممكن تساعد (بعد ما تتكلم مع دكتورك أو المعالج):\n'
      + '- حركة منتظمة بمجهود متوسط، وتبدأ صغير: 10 دقايق مشي أحسن من ولا حاجة، وتزوّد بالتدريج. التمرين مع مدرب أو مع حد بيساعد على الاستمرار.\n'
      + '- مواعيد نوم وصحيان ثابتة قد ما تقدر. ومشاكل النوم شائعة مع الاكتئاب، فقول لدكتورك عليها.\n'
      + '- أكل متوازن ووجبات منتظمة، وقلل الاعتماد على الكافيين في آخر اليوم.\n'
      + '- خليك على تواصل مع ناس بتثق فيهم.\n'
      + '- لو فيه أيام صعبة ومقدرتش تتمرن، ده مش فشل — ارجع بخطوة صغيرة.\n\n'
      + 'مهم: متوقفش أي دوا أو علاج لوحدك، ولا تغيّر جرعته، حتى لو حسيت إنك أحسن مع الرياضة. الرياضة إضافة للعلاج مش بديل عنه.\n\n'
      + 'إمتى تطلب مساعدة مختص؟ لو المزاج المنخفض أو فقدان الاهتمام بالحاجات مستمر أغلب الأيام لأكتر من أسبوعين، أو بيأثر على شغلك أو دراستك أو علاقاتك أو نومك وأكلك — كلّم طبيب أو أخصائي نفسي. تقدر كمان تكلم فريقك الطبي في ADAM وهما يوجّهوك.\n\n'
      + 'اطلب مساعدة فورًا لو جات لك أفكار إنك تأذي نفسك أو إن الحياة ملهاش لازمة: كلّم حد تثق فيه دلوقتي، وروح أقرب طوارئ أو اتصل بالإسعاف على 123، أو الخط الساخن للصحة النفسية التابع لوزارة الصحة. إنك تطلب مساعدة خطوة شجاعة، مش ضعف.\n\n'
      + 'المصدر: Gonzalez-Garcia X وآخرون، Complementary Therapies in Medicine (2026) — https://pubmed.ncbi.nlm.nih.gov/41794189/',
    bodyEn: 'Depression is a very common health condition — not a weakness of character, and not something to "snap out of" — and it is treatable. The main treatment is with a professional: psychological therapy, medication, or both, based on the doctor\'s assessment. A common question is whether lifestyle can help alongside that treatment.\n\n'
      + 'A recent umbrella review in Complementary Therapies in Medicine pooled 46 systematic reviews on lifestyle interventions as an add-on to depression treatment in adults. It found:\n'
      + '- Exercise had the most consistent effect, especially supervised moderate-intensity aerobic exercise and resistance training.\n'
      + '- Mind-body practices (such as yoga and tai chi) showed moderate-to-large benefits, especially in older adults.\n'
      + '- Dietary changes showed small-to-moderate benefits.\n'
      + '- The authors cautioned that most of the research was of low methodological quality, so stronger studies are still needed to define the right amount and how long the benefit lasts.\n\n'
      + 'Small steps that may help (after talking with your doctor or therapist):\n'
      + '- Regular movement at moderate effort, starting small: 10 minutes of walking is better than none, then build up gradually. Training with a coach or a friend helps you keep going.\n'
      + '- Regular sleep and wake times where possible. Sleep problems are common with depression, so tell your doctor about them.\n'
      + '- Balanced, regular meals, and less reliance on caffeine late in the day.\n'
      + '- Stay in touch with people you trust.\n'
      + '- If you miss training on a hard day, that is not failure — come back with a small step.\n\n'
      + 'Important: do not stop or change any medication or treatment on your own, even if you feel better with exercise. Exercise is an addition to treatment, not a replacement for it.\n\n'
      + 'When to seek professional help: if low mood or loss of interest lasts most days for more than two weeks, or affects your work, studies, relationships, sleep or appetite — speak to a doctor or psychologist. You can also contact your medical team on ADAM, who can guide you.\n\n'
      + 'Seek help immediately if you have thoughts of harming yourself or that life is not worth living: talk to someone you trust right now, go to the nearest emergency department or call an ambulance (123 in Egypt), or contact the Ministry of Health mental-health hotline. Asking for help is a brave step, not a weakness.\n\n'
      + 'Source: Gonzalez-Garcia X et al., Complementary Therapies in Medicine (2026) — https://pubmed.ncbi.nlm.nih.gov/41794189/',
    sources: [
      {
        title: 'Lifestyle interventions as adjuvant treatments for depression: An umbrella review of systematic reviews and meta-analyses',
        journal: 'Complementary Therapies in Medicine', year: 2026,
        url: 'https://pubmed.ncbi.nlm.nih.gov/41794189/',
        doi: '10.1016/j.ctim.2026.103336',
        read: true
      }
    ],
    reviewNote: 'PRIORITY (sensitive topic). The abstract was read in full; note it covers exercise, mind-body, diet and multicomponent interventions — the sleep advice is general good practice, not from this review. Please (1) add the verified Egyptian mental-health hotline number (deliberately not written because it could not be verified in this session), (2) check the crisis wording and the two-week threshold, (3) confirm the tone is non-stigmatising in Egyptian Arabic.'
  },

  /* ============ 6) تمارين المقاومة للستات في كل الأعمار — للمدرب ============ */
  {
    id: 'rd_women_resistance_lifespan',
    status: 'draft',
    audience: 'coach',
    specialty: 'sports_medicine',
    category: 'protocol',
    title: 'تمارين المقاومة للستات في كل مراحل العمر — إرشادات عملية للمدرب',
    titleEn: 'Resistance training for women across the lifespan — practical guidance for coaches',
    body: 'أغلب إرشادات تمارين المقاومة اتبنت على أبحاث على رجالة، والستات كانوا ممثلين أقل. تحليل تجميعي حديث في مجلة Journal of Science and Medicine in Sport جمع 126 دراسة على 4019 ست صحية (من 18 سنة وطالع، حوالي تلتينهم بعد انقطاع الدورة، ومتوسط العمر حوالي 51 سنة).\n\n'
      + 'النتايج:\n'
      + '- القوة العضلية زادت بشكل كبير وواضح قبل انقطاع الدورة وبعده، ومن غير فرق بين المجموعتين.\n'
      + '- الكتلة العضلية الوظيفية زادت زيادة صغيرة، والدهون قلّت، في المجموعتين.\n'
      + '- مكانش فيه علاقة واضحة بين النتايج والسن أو مدة البرنامج أو عدد مرات التمرين في الأسبوع. ده مش معناه إن الجرعة مش مهمة — معناه إن الدراسات دي مقدرتش تبيّن فرق.\n'
      + '- الباحثين استنتجوا إن الإرشادات العامة لتمارين المقاومة ممكن تتطبق على الستات، مع أهمية التخصيص لكل عميلة أكتر من قواعد جامدة حسب الجنس أو السن. والرسالة الأساسية: عمره ما بيبقى متأخر.\n\n'
      + 'للمدرب عمليًا (مع الإرشادات العامة المتعارف عليها):\n'
      + '- نفس المبادئ: كل العضلات الكبيرة مرتين على الأقل في الأسبوع، وتحميل تدريجي — زوّد الوزن خطوة صغيرة لما العميلة تكمّل المجموعات بأداء نظيف وفاضل عندها كام تكرار.\n'
      + '- بلاش فكرة "أوزان خفيفة وتكرارات كتير للتنشيف بس" — الست بتستفيد من التحميل التدريجي الحقيقي زي الراجل.\n'
      + '- العميلة المبتدئة أو الكبيرة في السن: ابدأ بحجم قليل وإشراف على الأداء، وضيف تمارين توازن وتمارين قوة سريعة بشكل آمن بالتدريج.\n'
      + '- بعد انقطاع الدورة: تمارين المقاومة مهمة للعضلات والعظام — ولو فيه هشاشة عظام معروفة، البرنامج يتعمل بإذن الطبيب وبالاحتياطات الخاصة بالحالة.\n'
      + '- الحمل وبعد الولادة ومشاكل قاع الحوض ليهم احتياطات خاصة وإذن طبي (موجودين في ملف الحالات الخاصة).\n'
      + '- الدورة الشهرية ممكن تأثر على الإحساس والأداء من شهر للتاني — عدّل حسب إحساس العميلة، من غير ما تلغي التمرين كقاعدة.\n\n'
      + 'المصدر: Isenmann E وآخرون، J Sci Med Sport (2026) — https://pubmed.ncbi.nlm.nih.gov/41963141/',
    bodyEn: 'Most resistance-training guidelines were built on research in men, and women have been under-represented. A recent meta-analysis in the Journal of Science and Medicine in Sport pooled 126 studies of 4,019 healthy women (aged 18 and over; about two-thirds postmenopausal; mean age about 51).\n\n'
      + 'Findings:\n'
      + '- Muscular strength increased substantially in both premenopausal and postmenopausal women, with no difference between the groups.\n'
      + '- Functional (lean) mass increased slightly and fat mass decreased, in both groups.\n'
      + '- Outcomes were not clearly associated with age, programme duration, or weekly training frequency. This does not mean dose is irrelevant — only that these studies could not detect a difference.\n'
      + '- The authors concluded that general resistance-training guidelines appear applicable to women, with individualisation mattering more than rigid sex- or age-based rules. The headline message: it is never too late.\n\n'
      + 'Practical points for coaches (together with established general guidelines):\n'
      + '- Same principles: all major muscle groups at least twice a week, with progressive overload — add a small amount of load once the client completes her sets with clean form and a few reps in reserve.\n'
      + '- Drop the "light weights, high reps, just to tone" idea — women benefit from genuine progressive loading just as men do.\n'
      + '- Beginners and older clients: start with low volume and supervised technique, and gradually add balance work and safe power (faster) exercises.\n'
      + '- After menopause: resistance training matters for muscle and bone — where osteoporosis is known, the programme needs medical clearance and the condition-specific precautions.\n'
      + '- Pregnancy, postpartum and pelvic-floor issues need their own precautions and medical clearance (see the special-conditions file).\n'
      + '- The menstrual cycle may affect how training feels from month to month — adjust to how the client feels rather than cancelling training as a rule.\n\n'
      + 'Source: Isenmann E et al., J Sci Med Sport (2026) — https://pubmed.ncbi.nlm.nih.gov/41963141/',
    sources: [
      {
        title: 'It\'s never too late: The impact of resistance training on strength and body composition in females across the lifespan – A systematic review and meta-analysis',
        journal: 'Journal of Science and Medicine in Sport', year: 2026,
        url: 'https://pubmed.ncbi.nlm.nih.gov/41963141/',
        doi: '10.1016/j.jsams.2026.03.002',
        read: true
      }
    ],
    reviewNote: 'Numbers (126 studies, 4,019 women, 66% postmenopausal, mean age ~51; strength SMD ~1.5 in both groups; lean mass SMD 0.27; fat mass SMD 0.30; no moderation by age/frequency/duration) are from the abstract, read via ScienceDirect. Practical bullets are general guidance (ACSM-style), not from this paper. Please check the osteoporosis and menstrual-cycle wording.'
  }
];

/*
 * قالب تمرين طبي — الكبد الدهني (MAFLD)
 * نفس شكل SPORT_TEMPLATES_EXTRA في library/templates-extra.js، ومعاه:
 *   medical: true      → قالب لحالة مرضية: مسودة محتاجة إذن طبي قبل الاستخدام
 *   condition: 'liver' → مفتاح الحالة في health-conditions.js
 *   status: 'draft'    → لسه محتاج مراجعة الطبيب
 * كل libId موجود في exercise-library.js أو library/exercises-index.js
 * (tools/check-med-rd.js بيتأكد من ده).
 */
export const TEMPLATES_MED_RD = [
  {
    id: 'tpl_med_mafld_foundation',
    group: 'none',
    medical: true,
    condition: 'liver',
    status: 'draft',
    ar: 'كبد دهني (MAFLD) — جسم كامل + مشي (مرحلة تأسيس)',
    en: 'Fatty liver (MAFLD) — Full body + walking (foundation phase)',
    note: {
      ar: 'قالب طبي — ممنوع تفعيله قبل إذن طبي مكتوب من الطبيب المعالج، وده مسودة لسه تحت مراجعة الطبيب. مش مناسب لو فيه تليّف متقدم أو تشمّع في الكبد. الجلسة دي 3 مرات في الأسبوع بأيام مش ورا بعض، والأيام التانية مشي سريع 20–30 دقيقة، عشان المجموع يوصل تدريجيًا لحوالي 150 دقيقة أو أكتر نشاط متوسط في الأسبوع. أول أسبوعين: مجموعتين بمجهود 5–6 من 10، وبعدين 3 مجموعات. زوّد مدة المشي الأول وبعدين الشدة، وزوّد الوزن خطوة صغيرة بس لما العميل يكمّل كل التكرارات بأداء نظيف. العجلة الثابتة أو الإليبتيكال بديل للمشي. وقّف ووجّه للطبيب فورًا لو ظهر اصفرار في العين أو الجلد، أو ألم في الجنب اليمين من فوق، أو انتفاخ في البطن، أو ألم صدر، أو دوخة.',
      en: 'Medical template — do not activate without written clearance from the treating doctor; this is a draft still awaiting physician review. Not suitable for advanced fibrosis or cirrhosis. Run this session 3 times a week on non-consecutive days, with 20–30 minutes of brisk walking on other days, building gradually to about 150+ minutes of moderate activity per week. First two weeks: two sets at RPE 5–6 out of 10, then three sets. Increase walking duration before intensity, and add a small amount of load only once every rep is completed with clean form. A stationary bike or elliptical can replace walking. Stop and refer to the doctor immediately for yellowing of the eyes or skin, pain in the upper right abdomen, abdominal swelling, chest pain, or dizziness.'
    },
    sections: {
      warmup: [
        { libId: 'ad_marching_in_place', en: 'Marching in Place', sets: 1, reps: '3min' },
        { libId: 'ex_arm_circles', en: 'Arm Circles', sets: 1, reps: '10' },
        { libId: 'ex_leg_swings', en: 'Leg Swings', sets: 1, reps: '10' }
      ],
      main: [
        { libId: 'ek_squat_to_bench_with_dumbbells', en: 'Dumbbell Box Squat', sets: 2, reps: '10-12', rest: '90s', rpe: '5-6' },
        { libId: 'wg_machine_chest_press', en: 'Machine Chest Press', sets: 2, reps: '10-12', rest: '90s', rpe: '5-6' },
        { libId: 'ex_seated_cable_row', en: 'Seated Cable Row', sets: 2, reps: '10-12', rest: '90s', rpe: '5-6' },
        { libId: 'ex_glute_bridge', en: 'Glute Bridge', sets: 2, reps: '12', rest: '60s', rpe: '5-6' },
        { libId: 'ex_lat_pulldown', en: 'Lat Pulldown', sets: 2, reps: '10-12', rest: '90s', rpe: '5-6' },
        { libId: 'ex_bird_dog', en: 'Bird Dog', sets: 2, reps: '8', rest: '60s' }
      ],
      cardio: [
        { libId: 'ad_brisk_walk', en: 'Brisk Walk', sets: 1, reps: '20-30min', rpe: '4-6' }
      ],
      mobility: [
        { libId: 'ex_cat_cow', en: 'Cat-Cow', sets: 1, reps: '8' }
      ],
      flexibility: [
        { libId: 'ex_calf_stretch', en: 'Calf Stretch', sets: 2, reps: '30s' },
        { libId: 'ex_hamstring_stretch', en: 'Hamstring Stretch', sets: 2, reps: '30s' },
        { libId: 'wg_doorway_chest_stretch', en: 'Doorway Chest Stretch', sets: 1, reps: '30s' }
      ]
    }
  }
];
