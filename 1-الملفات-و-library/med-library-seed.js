/*
 * ADAM — بذرة محتوى المكتبة الطبية
 *
 * ⚠️ مهم جدًا: دي مقالات مبدئية عامة (تثقيف صحي عام) بتتحفظ كمسودات
 * (status: draft) بس — مش معتمدة ومش هتوصل لأي عميل إلا لو دكتور أو
 * صيدلي مرخّص فعلاً راجعها وعدّلها ووافق عليها من داخل التطبيق.
 * مفيش فيها أي جرعات دوائية أو تشخيص لحالة بعينها — الهدف إنها تكون
 * نقطة بداية توفّر وقت الكتابة على المتخصص، مش بديل عن مراجعته.
 *
 * IMPORTANT: these are general starting-point drafts (status: draft
 * only) — never shown to clients until a licensed doctor/pharmacist
 * reviews and approves them inside the app. No dosing or individual
 * diagnosis — just a head start that saves the specialist's time.
 */

export const MED_LIBRARY_SEED = [

  /* ==================== طبيب عظام ==================== */
  {
    specialty: 'ortho',
    category: 'condition',
    title: 'الفرق بين الشد والالتواء والكسر',
    titleEn: 'The difference between a strain, a sprain, and a fracture',
    body: 'الشد (Strain) إصابة في العضلة أو الوتر بسبب تمدد أو انقباض مفاجئ زيادة عن طاقته. الالتواء (Sprain) إصابة في الرباط اللي بيربط بين عظمتين، وغالبًا بتحصل بسبب حركة مفاجئة أو التواء في المفصل. الكسر إصابة في العظم نفسه، وممكن يكون كسر كامل أو شعري (إجهاد).\n\nالثلاثة بيشتركوا في ألم وتورم واحمرار محتمل، لكن درجة الخطورة وطريقة التعامل تختلف تمامًا، وده اللي بيخلي التقييم من طبيب عظام مهم قبل ما نقرر العميل يرجع يتمرن ولا لأ.',
    bodyEn: 'A strain is an injury to a muscle or tendon caused by a sudden stretch or contraction beyond its capacity. A sprain is an injury to a ligament connecting two bones, usually from a sudden movement or a twist at the joint. A fracture is an injury to the bone itself, which can be a complete break or a hairline (stress) fracture.\n\nAll three can involve pain, swelling, and possible redness, but their severity and management differ completely — which is why an orthopedic evaluation matters before deciding whether a client is cleared to return to training.'
  },
  {
    specialty: 'ortho',
    category: 'condition',
    title: 'إصابة الرباط الصليبي الأمامي (ACL)',
    titleEn: 'Anterior cruciate ligament (ACL) injury',
    body: 'الرباط الصليبي الأمامي بيثبّت مفصل الركبة، وبيتصاب غالبًا في الرياضات اللي فيها تغيير اتجاه مفاجئ أو هبوط خاطئ بعد قفزة. من علاماته الشائعة: صوت "طقة" وقت الإصابة، تورم سريع خلال ساعات، وإحساس بعدم ثبات الركبة.\n\nالتعامل معاه (تحفظي أو جراحي) بيعتمد على مستوى نشاط الرياضي ودرجة الإصابة، وبرنامج التأهيل بعد الإصابة أو الجراحة بياخد شهور وبيتدرج في التحميل تدريجيًا. القرار النهائي والمتابعة لازم تكون مع طبيب العظام المسؤول عن الحالة.',
    bodyEn: 'The anterior cruciate ligament stabilizes the knee joint, and it is most often injured in sports involving a sudden change of direction or a bad landing after a jump. Common signs include a "pop" at the moment of injury, rapid swelling within hours, and a feeling of the knee giving way.\n\nManagement (conservative or surgical) depends on the athlete\'s activity level and the severity of the injury, and post-injury or post-surgery rehab takes months with a gradual increase in loading. The final decision and follow-up must stay with the orthopedic surgeon managing the case.'
  },
  {
    specialty: 'ortho',
    category: 'condition',
    title: 'كسور الإجهاد عند العدّائين',
    titleEn: 'Stress fractures in runners',
    body: 'كسر الإجهاد شرخ دقيق في العظم بيحصل مع تكرار الحمل من غير راحة كافية، شائع في عظمة الساق والقدم عند عدّائي المسافات والسرعة. من عوامل الخطورة: زيادة حجم أو شدة التدريب بسرعة، نقص الطاقة المتاحة للجسم (Energy availability)، ونقص كثافة العظم.\n\nالعلامة المميزة إن الألم بيبدأ موضعي وبيزيد تدريجيًا مع الحمل ويتحسن بالراحة، على عكس آلام العضلات العادية. أي شك في كسر إجهاد محتاج تقييم وأشعة قبل الاستمرار في التدريب، لأن الاستمرار من غيره ممكن يحول الشرخ لكسر كامل.',
    bodyEn: 'A stress fracture is a tiny crack in the bone caused by repeated loading without enough recovery, common in the shin and foot bones of distance and sprint runners. Risk factors include rapidly increasing training volume or intensity, low energy availability, and low bone density.\n\nThe distinguishing sign is that the pain is localized, gradually worsens with loading, and improves with rest — unlike ordinary muscle soreness. Any suspicion of a stress fracture needs evaluation and imaging before continuing training, because continuing without one can turn the crack into a complete fracture.'
  },
  {
    specialty: 'ortho',
    category: 'condition',
    title: 'إصابات الكفة المدورة بالكتف',
    titleEn: 'Rotator cuff injuries of the shoulder',
    body: 'الكفة المدورة مجموعة عضلات وأوتار بتثبّت مفصل الكتف وبتساعد في حركته، وبتتعرض للإجهاد مع الحركات المتكررة فوق مستوى الكتف (زي السباحة والرمي والرفع). الألم غالبًا بيزيد مع الرفع الجانبي أو النوم على الجنب المصاب.\n\nمعظم الحالات البسيطة والمتوسطة بتستجيب للتأهيل والعلاج الطبيعي من غير تدخل جراحي، لكن التقييم من طبيب العظام مهم لاستبعاد تمزق كامل في الوتر محتاج تدخل مختلف.',
    bodyEn: 'The rotator cuff is a group of muscles and tendons that stabilize the shoulder joint and help it move; it is stressed by repeated overhead movements (swimming, throwing, lifting). Pain often worsens with a lateral raise or sleeping on the affected side.\n\nMost mild-to-moderate cases respond to rehab and physical therapy without surgery, but an orthopedic evaluation is important to rule out a full-thickness tendon tear, which needs a different approach.'
  },
  {
    specialty: 'ortho',
    category: 'education',
    title: 'إمتى لازم تروح لطبيب عظام؟',
    titleEn: 'When should you see an orthopedic doctor?',
    body: 'مش كل ألم عضلي محتاج طبيب عظام فورًا، لكن فيه علامات بتستاهل تقييم متخصص: ألم مستمر أكتر من أسبوعين من غير تحسن، تورم أو تغيّر واضح في شكل المفصل، إحساس بعدم ثبات أو "طقطقة" مؤلمة في المفصل، أو ألم بيمنعك تحمل وزنك بشكل طبيعي.\n\nلو حصل أي من علامات الخطر الموجودة فوق في المكتبة (زي العجز الكامل عن تحميل الوزن بعد إصابة مباشرة) الأمر مش محتاج تفكير — روح فورًا.',
    bodyEn: 'Not every muscle ache needs an orthopedic doctor right away, but some signs are worth a specialist evaluation: pain lasting more than two weeks without improvement, visible swelling or a change in the joint\'s shape, a feeling of instability or a painful "clicking" in the joint, or pain that prevents normal weight-bearing.\n\nIf any of the red-flag signs elsewhere in this library appear (such as a complete inability to bear weight after a direct injury), there is no need to think it over — seek care immediately.'
  },

  /* ==================== طبيب أشعة ==================== */
  {
    specialty: 'radiology',
    category: 'imaging',
    title: 'الأشعة السينية (X-ray) — إمتى بتستخدم؟',
    titleEn: 'X-ray — when is it used?',
    body: 'الأشعة السينية أسرع وأرخص وسيلة تصوير، وبتبان بيها العظام بوضوح، فهي الاختيار الأول لما يكون فيه شك في كسر. مش بتبيّن تفاصيل الأنسجة الرخوة زي الأربطة والأوتار والغضاريف بنفس الوضوح.\n\nلو الأشعة السينية طلعت سليمة لكن الألم مستمر، ده مش معناه إن مفيش إصابة — يمكن يكون فيه إصابة في نسيج رخو محتاجة نوع تصوير تاني زي الرنين المغناطيسي.',
    bodyEn: 'X-ray is the fastest and cheapest imaging option and shows bone clearly, making it the first choice when a fracture is suspected. It does not show soft-tissue detail — ligaments, tendons, cartilage — with the same clarity.\n\nIf an X-ray comes back clear but the pain persists, that does not mean there is no injury — there may be a soft-tissue injury that needs a different imaging type, such as an MRI.'
  },
  {
    specialty: 'radiology',
    category: 'imaging',
    title: 'الرنين المغناطيسي (MRI) — إمتى بيتطلب؟',
    titleEn: 'MRI — when is it needed?',
    body: 'الرنين المغناطيسي بيدّي تفاصيل دقيقة جدًا عن الأنسجة الرخوة: الأربطة، الأوتار، الغضاريف، والعضلات، وده اللي بيخليه الاختيار الأساسي في إصابات زي تمزق الرباط الصليبي أو مشاكل الكفة المدورة أو الغضروف الهلالي بالركبة.\n\nمياخدش أشعة مؤيّنة (مش زي X-ray أو CT)، لكن بياخد وقت أطول في الجلسة، وممكن ميكونش مناسب لبعض الحالات (زي وجود أجسام معدنية معينة بالجسم) — القرار ده بيتاخد مع الطبيب المعالج.',
    bodyEn: 'MRI gives very detailed images of soft tissue: ligaments, tendons, cartilage, and muscle, which is why it is the primary choice for injuries such as an ACL tear, rotator cuff problems, or a torn meniscus in the knee.\n\nIt does not use ionizing radiation (unlike X-ray or CT), but the scan takes longer, and it may not be suitable for some cases (such as certain metal implants in the body) — that decision is made with the treating physician.'
  },
  {
    specialty: 'radiology',
    category: 'imaging',
    title: 'الأشعة المقطعية (CT) للعظام',
    titleEn: 'CT scan for bone injuries',
    body: 'الأشعة المقطعية بتدّي صور مقطعية تفصيلية للعظام أوضح بكتير من الأشعة السينية العادية، ومفيدة جدًا في تقييم الكسور المعقدة أو الكسور القريبة من المفاصل قبل التخطيط لأي تدخل جراحي.\n\nبتستخدم فيها أشعة مؤيّنة بجرعة أعلى من الأشعة السينية العادية، فبتتحدد بحرص حسب الحاجة الفعلية، وقرار عملها بيرجع لتقييم الطبيب المعالج.',
    bodyEn: 'CT provides detailed cross-sectional bone images that are much clearer than a plain X-ray, and it is very useful for assessing complex fractures or fractures near joints before planning any surgical intervention.\n\nIt uses a higher radiation dose than a plain X-ray, so it is ordered carefully based on actual need, and the decision to order one rests with the treating physician.'
  },
  {
    specialty: 'radiology',
    category: 'imaging',
    title: 'الموجات فوق الصوتية (السونار) في إصابات الملاعب',
    titleEn: 'Ultrasound in sports injuries',
    body: 'السونار وسيلة تصوير سريعة وآمنة (من غير أي أشعة مؤيّنة) بتستخدم كتير في تقييم إصابات العضلات والأوتار السطحية، وميزتها إن ممكن تتعمل وإنت بتحرك المفصل عشان يتقيّم أداؤه أثناء الحركة نفسها.\n\nمش بتصلح لتقييم العظام أو الإصابات العميقة جوه المفصل بنفس دقة الرنين المغناطيسي، فبتستخدم غالبًا كخطوة أولى سريعة أو لمتابعة تطور إصابة معروفة.',
    bodyEn: 'Ultrasound is a fast, safe imaging method (no ionizing radiation) widely used to assess injuries of muscles and superficial tendons, and it has the advantage of being performed while moving the joint to assess it in motion.\n\nIt is not as suitable for assessing bone or deep injuries inside the joint with the same precision as MRI, so it is often used as a quick first step or to monitor the progress of a known injury.'
  },
  {
    specialty: 'radiology',
    category: 'education',
    title: 'قراءة تقرير الأشعة — مصطلحات شائعة',
    titleEn: 'Reading a radiology report — common terms',
    body: 'تقرير الأشعة بيوصف اللي طبيب الأشعة شايفه في الصورة، لكن التفسير الطبي الكامل وربطه بحالتك وأعراضك مسؤولية الطبيب المعالج، مش التقرير لوحده. من المصطلحات الشائعة اللي ممكن تشوفها: "Edema" (تورم/احتقان في النسيج)، "Effusion" (سائل زايد داخل المفصل)، "Tendinopathy" (إجهاد مزمن في الوتر)، و"Partial tear" مقابل "Complete/Full-thickness tear" (تمزق جزئي مقابل تمزق كامل).\n\nمهم جدًا إن العميل ميحاولش يشخّص حالته بنفسه من التقرير لوحده من غير رجوع للطبيب اللي طلب الأشعة.',
    bodyEn: 'A radiology report describes what the radiologist sees in the image, but the full medical interpretation and how it relates to your condition and symptoms is the treating physician\'s responsibility, not the report alone. Common terms you may see include "edema" (tissue swelling/congestion), "effusion" (excess fluid inside the joint), "tendinopathy" (chronic tendon strain), and "partial tear" versus "complete/full-thickness tear".\n\nIt is very important that a client not try to diagnose their own condition from the report alone without going back to the physician who ordered the imaging.'
  },

  /* ==================== صيدلي ==================== */
  {
    specialty: 'pharmacist',
    category: 'medication',
    title: 'مسكنات الألم الشائعة (NSAIDs) والرياضة',
    titleEn: 'Common pain relievers (NSAIDs) and sport',
    body: 'مضادات الالتهاب غير الستيرويدية (زي الإيبوبروفين) بتستخدم كتير لتسكين الألم والتورم بعد إصابات الملاعب، لكن الاستخدام المتكرر أو لفترة طويلة من غير إشراف ممكن يأثر على المعدة والكلى، وميتاخدش قبل مجهود بدني شديد لأنه بيقلل الإحساس التحذيري بالألم وممكن يخفي إصابة بتتفاقم.\n\nأي قرار خاص بنوع الدواء أو مدة استخدامه أو الجرعة المناسبة لازم ياخده الصيدلي أو الطبيب المعالج حسب الحالة الصحية للعميل، مش قرار شخصي من الرياضي أو المدرب.',
    bodyEn: 'Nonsteroidal anti-inflammatory drugs (such as ibuprofen) are widely used to relieve pain and swelling after sports injuries, but repeated or prolonged unsupervised use can affect the stomach and kidneys, and they should not be taken before intense physical effort because they dull the pain warning signal and can mask a worsening injury.\n\nAny decision about the type of medication, how long to use it, or the appropriate dose must be made by the pharmacist or treating physician based on the client\'s health status, not as a personal decision by the athlete or coach.'
  },
  {
    specialty: 'pharmacist',
    category: 'supplement',
    title: 'المكملات الشائعة عند الرياضيين: نظرة عامة',
    titleEn: 'Common supplements among athletes: an overview',
    body: 'من أكتر المكملات شيوعًا عند الرياضيين: بروتين مصل اللبن (Whey)، الكرياتين، والكافيين. البروتين بيساعد في تلبية احتياج الجسم اليومي لو النظام الغذائي مش كافي، والكرياتين من أكتر المكملات اللي عليها أبحاث كتيرة لدعم القوة والأداء في التمارين قصيرة الشدة، والكافيين بيستخدم لتحسين التركيز والأداء قبل التمرين.\n\nكل مكمّل له اعتبارات صحية وتفاعلات محتملة مع حالات معينة أو أدوية تانية، فقرار إضافة أي مكمّل لازم يمر على صيدلي أو أخصائي تغذية يعرف الحالة الصحية الكاملة للعميل.',
    bodyEn: 'Among the most common supplements for athletes are whey protein, creatine, and caffeine. Protein helps meet daily needs when diet alone falls short; creatine is one of the most heavily researched supplements for supporting strength and performance in short, high-intensity efforts; and caffeine is used to improve focus and performance before training.\n\nEvery supplement carries health considerations and possible interactions with certain conditions or other medications, so the decision to add any supplement must go through a pharmacist or nutrition specialist who knows the client\'s full health picture.'
  },
  {
    specialty: 'pharmacist',
    category: 'education',
    title: 'التداخل بين الأدوية والتمرين',
    titleEn: 'Medication and exercise interactions',
    body: 'بعض الأدوية الشائعة (زي أدوية الضغط أو الحساسية أو حتى بعض المضادات الحيوية) ممكن يكون ليها تأثير على الأداء الرياضي أو على استجابة الجسم للمجهود — سواء بتقليل معدل ضربات القلب المتوقع، أو التأثير على التوازن والتركيز، أو زيادة الحساسية للحرارة.\n\nمن المهم إن أي عميل بياخد دواء بشكل مستمر يبلّغ فريقه الرياضي (المدرب والصيدلي) عشان البرنامج التدريبي ييتصمم بشكل آمن حوالين الدواء ده.',
    bodyEn: 'Some common medications (such as blood pressure or allergy medications, or even certain antibiotics) can affect athletic performance or the body\'s response to exertion — whether by lowering the expected heart rate, affecting balance and focus, or increasing heat sensitivity.\n\nIt is important that any client taking a medication regularly inform their sports team (coach and pharmacist) so the training program can be designed safely around that medication.'
  },
  {
    specialty: 'pharmacist',
    category: 'education',
    title: 'أهمية إبلاغ فريقك الطبي بكل حاجة بتاخدها',
    titleEn: 'Why it matters to tell your medical team everything you take',
    body: 'كتير من الرياضيين بياخدوا أدوية أو مكملات من غير ما يبلّغوا مدربهم أو الفريق الطبي المسؤول عنهم، فاكرين إنها حاجة بسيطة أو مالهاش علاقة بالتمرين. لكن أي دواء أو مكمّل ممكن يأثر على قرارات التأهيل، توقيت التمرين، أو حتى نتيجة فحص منشطات لو الرياضي بيلعب في مسابقات رسمية.\n\nقاعدة بسيطة: أي حاجة بتاخدها بانتظام — دواء، مكمّل، أو حتى فيتامين — لازم يعرفها فريقك الطبي على المنصة.',
    bodyEn: 'Many athletes take medications or supplements without telling their coach or the medical team responsible for them, assuming it is minor or unrelated to training. But any medication or supplement can affect rehab decisions, training timing, or even a doping test result if the athlete competes in official events.\n\nSimple rule: anything you take regularly — medication, supplement, or even a vitamin — should be known to your medical team on the platform.'
  },

  /* ==================== أخصائي علاج طبيعي ==================== */
  {
    specialty: 'physio',
    category: 'protocol',
    title: 'مبادئ العلاج الطبيعي بعد الإصابة',
    titleEn: 'Principles of physical therapy after an injury',
    body: 'العلاج الطبيعي الفعّال بيعتمد على مبدأ التحميل التدريجي: تقليل الحمل المؤلم في البداية من غير توقف كامل عن الحركة، بعدين استعادة مدى الحركة الطبيعي، بعدين تقوية تدريجية، وأخيرًا تمارين تحاكي متطلبات الرياضة نفسها قبل العودة الكاملة.\n\nالانتقال من مرحلة للتانية بيبقى بمعايير واضحة (زي مستوى الألم أو القدرة على أداء حركة معينة بدون تعويض) مش بعدد أيام ثابت، لأن كل حالة بتختلف في سرعة استجابتها.',
    bodyEn: 'Effective physical therapy relies on the principle of gradual loading: reducing painful load early on without stopping movement completely, then restoring normal range of motion, then progressive strengthening, and finally exercises that mimic the demands of the sport itself before a full return.\n\nMoving from one stage to the next follows clear criteria (such as pain level or the ability to perform a movement without compensation), not a fixed number of days, because each case responds at a different pace.'
  },
  {
    specialty: 'physio',
    category: 'protocol',
    title: 'العلاج اليدوي والتحفيز الكهربائي — نظرة عامة',
    titleEn: 'Manual therapy and electrical stimulation — an overview',
    body: 'العلاج اليدوي (Manual therapy) بيشمل تقنيات زي التدليك العلاجي وتحريك المفصل بشكل يدوي لتحسين مدى الحركة وتقليل التيبس. التحفيز الكهربائي (زي TENS) بيستخدم أحيانًا للمساعدة في تسكين الألم مؤقتًا.\n\nالتقنيات دي بتكون أكثر فاعلية لما تترافق مع برنامج تمارين تأهيلية فعّالة، مش كبديل عنه — التمرين نفسه هو اللي بيبني القوة والتحمل على المدى الطويل.',
    bodyEn: 'Manual therapy includes techniques such as therapeutic massage and manually mobilizing the joint to improve range of motion and reduce stiffness. Electrical stimulation (such as TENS) is sometimes used to help relieve pain temporarily.\n\nThese techniques are more effective alongside an active rehab exercise program, not as a replacement for it — exercise itself is what builds strength and endurance over the long term.'
  },
  {
    specialty: 'physio',
    category: 'education',
    title: 'الإطالة مقابل التقوية — إمتى تحتاج كل واحدة؟',
    titleEn: 'Stretching versus strengthening — when do you need each?',
    body: 'الإطالة بتساعد على تحسين مدى الحركة والمرونة، ومفيدة كجزء من الإحماء أو التهدئة، لكنها لوحدها مش كافية لعلاج ضعف عضلي أو منع إصابة متكررة. التقوية هي اللي بتبني قدرة العضلة والوتر على تحمل الحمل بمرور الوقت وبتقلل خطر تكرار الإصابة.\n\nالبرنامج المتوازن بيجمع الاتنين حسب احتياج الحالة، مش نوع واحد بس — والتقييم المهني هو اللي بيحدد النسبة المناسبة لكل رياضي.',
    bodyEn: 'Stretching helps improve range of motion and flexibility and is useful as part of a warm-up or cool-down, but on its own it is not enough to treat muscle weakness or prevent a repeat injury. Strengthening is what builds the muscle and tendon\'s capacity to tolerate load over time and reduces the risk of re-injury.\n\nA balanced program combines both according to the case\'s needs, not just one — and a professional assessment is what determines the right mix for each athlete.'
  },
  {
    specialty: 'physio',
    category: 'protocol',
    title: 'مراحل العودة للرياضة بعد الإصابة (Return to Sport)',
    titleEn: 'Stages of return to sport after an injury',
    body: 'العودة الآمنة للرياضة بعد إصابة بتمر عادة بمراحل: استعادة مدى الحركة الكامل بدون ألم، بعدين تقوية تدريجية توصل لمستوى قوة قريب من الجانب السليم، بعدين تمارين تحمّل وظيفية (جري، قفز، تغيير اتجاه)، وأخيرًا تمارين رياضية محددة تحاكي طبيعة اللعبة قبل الرجوع للمنافسة الكاملة.\n\nالعجلة في الرجوع قبل اكتمال المراحل دي من أكبر أسباب تكرار الإصابة، والقرار النهائي بالرجوع لازم يكون بالاتفاق بين المدرب وأخصائي التأهيل.',
    bodyEn: 'A safe return to sport after an injury usually moves through stages: restoring full pain-free range of motion, then progressive strengthening up to a level close to the uninjured side, then functional load-bearing exercises (running, jumping, changing direction), and finally sport-specific drills that mimic the demands of the game before returning to full competition.\n\nRushing the return before these stages are complete is one of the biggest causes of re-injury, and the final return-to-play decision must be a joint agreement between the coach and the rehab specialist.'
  },

  /* ==================== أخصائي تأهيل ==================== */
  {
    specialty: 'rehab',
    category: 'condition',
    title: 'متلازمة الإفراط في التدريب (Overtraining Syndrome)',
    titleEn: 'Overtraining syndrome',
    body: 'متلازمة الإفراط في التدريب بتحصل لما يكون حمل التدريب أكبر من قدرة الجسم على التعافي منه لفترة طويلة، من غير راحة أو تغذية كافية. من علاماتها: هبوط مستمر في الأداء رغم استمرار التدريب، تعب عام وإرهاق مش بيتحسن بالراحة العادية، اضطراب في النوم، تغيّر في المزاج أو زيادة سرعة الانفعال، وزيادة قابلية الإصابة أو المرض المتكرر.\n\nالتعامل معاها بيحتاج تقليل حمل التدريب فعليًا (مش بس يوم راحة أو اتنين) لفترة كافية، مع تقييم النوم والتغذية والحمل النفسي، ومتابعة دقيقة لعلامات التعافي قبل الرجوع التدريجي لمستوى التدريب المعتاد.',
    bodyEn: 'Overtraining syndrome occurs when training load exceeds the body\'s capacity to recover from it over a long period, without adequate rest or nutrition. Signs include a persistent drop in performance despite continued training, general fatigue that does not improve with normal rest, disrupted sleep, mood changes or increased irritability, and greater susceptibility to injury or recurring illness.\n\nManaging it requires an actual reduction in training load (not just a day or two off) for a sufficient period, along with assessing sleep, nutrition, and psychological load, and closely tracking signs of recovery before gradually returning to the usual training level.'
  },
  {
    specialty: 'rehab',
    category: 'protocol',
    title: 'بروتوكول POLICE للإصابات الحادة',
    titleEn: 'The POLICE protocol for acute injuries',
    body: 'بروتوكول POLICE (تطوير حديث لبروتوكول RICE القديم) بيرمز لـ: الحماية (Protection)، التحميل الأمثل (Optimal Loading)، الثلج (Ice)، الضغط (Compression)، والرفع (Elevation). الفرق الأساسي عن RICE إن الراحة الكاملة اتستبدلت بـ"تحميل أمثل" — يعني حركة خفيفة ومتحكم فيها بدل التوقف التام، لأن الحركة المبكرة المناسبة بتساعد على التعافي.\n\nده بروتوكول للإسعافات الأولية في أول 48-72 ساعة بعد الإصابة الحادة، وبعدها لازم انتقال لخطة تأهيل منظمة تحت إشراف مختص.',
    bodyEn: 'The POLICE protocol (a modern update of the older RICE protocol) stands for Protection, Optimal Loading, Ice, Compression, and Elevation. The key difference from RICE is that complete rest is replaced with "optimal loading" — light, controlled movement instead of total immobilization, because appropriate early movement supports recovery.\n\nThis is a first-aid protocol for the first 48–72 hours after an acute injury, after which there must be a transition to a structured rehab plan under a specialist\'s supervision.'
  },
  {
    specialty: 'rehab',
    category: 'education',
    title: 'مراحل التأهيل بعد الإصابة — إطار عام',
    titleEn: 'Stages of rehab after an injury — a general framework',
    body: 'برنامج التأهيل الجيد بيمر عادة بأربع مراحل: تهدئة الالتهاب وحماية المنطقة المصابة، استعادة مدى الحركة الطبيعي، تقوية تدريجية للعضلات والأوتار المحيطة، وأخيرًا تمارين وظيفية تحاكي حركة الرياضة الفعلية. كل مرحلة ليها معايير واضحة للانتقال للي بعدها، مش مدة زمنية ثابتة.\n\nتخطي مرحلة أو العجلة في التقدم من أكتر أسباب تكرار الإصابة أو إطالة مدة التعافي الفعلية.',
    bodyEn: 'A good rehab program usually moves through four stages: calming inflammation and protecting the injured area, restoring normal range of motion, progressively strengthening the surrounding muscles and tendons, and finally functional exercises that mimic the actual movement of the sport. Each stage has clear criteria for moving to the next, not a fixed time period.\n\nSkipping a stage or rushing progress is one of the leading causes of re-injury or of actually prolonging recovery time.'
  },
  {
    specialty: 'rehab',
    category: 'education',
    title: 'الوقاية من تكرار الإصابة',
    titleEn: 'Preventing repeat injuries',
    body: 'أكتر من نص إصابات الرياضيين بتكون إصابات متكررة لنفس المنطقة، غالبًا بسبب الرجوع للتمرين بدري قبل اكتمال القوة والتحكم الحركي الكامل. من أهم عوامل الوقاية: برنامج تقوية وقائي مستمر (مش بس بعد الإصابة)، إحماء منظم قبل كل تمرين، إدارة حمل التدريب بشكل تدريجي بدون قفزات مفاجئة، والاهتمام بالنوم والتغذية كجزء أساسي من التعافي.\n\nمتابعة دورية مع أخصائي التأهيل حتى بعد التعافي الكامل بتساعد في اكتشاف أي ضعف متبقي قبل ما يتحول لإصابة جديدة.',
    bodyEn: 'More than half of athletic injuries are repeat injuries to the same area, often because of returning to training early, before strength and full motor control are complete. Key prevention factors include an ongoing preventive strengthening program (not just after an injury), a structured warm-up before every session, gradually managing training load without sudden jumps, and treating sleep and nutrition as an essential part of recovery.\n\nRegular follow-up with a rehab specialist even after full recovery helps catch any remaining weakness before it turns into a new injury.'
  },

  /* ==================== طبيب طب رياضي ==================== */
  {
    specialty: 'sports_medicine',
    category: 'education',
    title: 'دور طبيب الطب الرياضي — إمتى نلجأ له تحديدًا؟',
    titleEn: 'The role of a sports medicine doctor — when exactly do you need one?',
    body: 'طبيب الطب الرياضي متخصص في الحالات اللي بتحصل بسبب أو أثناء ممارسة الرياضة، وبيشوف الصورة الكاملة للرياضي: الإصابة، الحمل التدريبي، الأداء، والحالة العامة مع بعض — مش بس المنطقة المصابة زي طبيب العظام، ولا الجانب الحركي بس زي أخصائي التأهيل.\n\nبيكون الاختيار المناسب لما يكون فيه أكتر من عامل مؤثر في نفس الوقت — زي رياضي بيعاني من إصابات متكررة، هبوط في الأداء مع تعب عام، أو حاجة لتقييم شامل قبل موسم أو مسابقة مهمة.',
    bodyEn: 'A sports medicine doctor specializes in conditions caused by or occurring during sport, and looks at the athlete\'s full picture together: the injury, training load, performance, and overall health — not just the injured area like an orthopedist, or just the movement side like a rehab specialist.\n\nThey are the right choice when more than one factor is at play at once — such as an athlete with recurring injuries, a performance drop combined with general fatigue, or a need for a comprehensive assessment before an important season or competition.'
  },
  {
    specialty: 'sports_medicine',
    category: 'protocol',
    title: 'الفحص الطبي الدوري قبل الموسم الرياضي (PPE)',
    titleEn: 'The pre-participation examination (PPE) before a sports season',
    body: 'الفحص الطبي قبل الموسم (Pre-participation Examination) فحص شامل بيتعمل قبل ما الرياضي يبدأ موسم تدريبي أو تنافسي جديد، وبيشمل عادة: التاريخ المرضي والعائلي، فحص القلب والأوعية الدموية، فحص الجهاز الحركي (المفاصل والعضلات)، وأحيانًا تقييم للياقة العامة حسب نوع الرياضة.\n\nهدفه الأساسي اكتشاف أي عامل خطورة (زي مشكلة قلبية غير معروفة أو ضعف عضلي غير متوازن) قبل ما يتحول لمشكلة أثناء المجهود الشديد، ومفروض يتكرر بشكل دوري مش مرة واحدة بس.',
    bodyEn: 'The pre-participation examination is a comprehensive check done before an athlete starts a new training or competitive season, and it usually includes personal and family medical history, a cardiovascular exam, a musculoskeletal exam (joints and muscles), and sometimes a general fitness assessment depending on the sport.\n\nIts main goal is to catch any risk factor (such as an undiagnosed heart issue or an imbalanced muscular weakness) before it turns into a problem during intense effort, and it should be repeated periodically, not done just once.'
  },
  {
    specialty: 'sports_medicine',
    category: 'condition',
    title: 'الإجهاد الحراري وضربة الشمس أثناء التمرين',
    titleEn: 'Heat illness and heatstroke during exercise',
    body: 'الإجهاد الحراري بيحصل لما الجسم يعجز يبرّد نفسه بكفاءة أثناء المجهود في جو حر أو رطب، وبيبدأ بأعراض زي تعب زايد وصداع ودوخة وتقلصات عضلية، وممكن يتطور لضربة شمس (حالة طارئة) لو ظهرت لخبطة في التركيز أو ارتفاع شديد في حرارة الجسم أو توقف التعرّق.\n\nالوقاية بتعتمد على الترطيب الكافي قبل وأثناء وبعد التمرين، التأقلم التدريجي مع الحر، وتجنب المجهود الشديد في أوقات الذروة الحرارية. أي علامة تدل على ضربة شمس محتملة (تلخبط ذهني، فقدان وعي، حرارة مرتفعة جدًا) حالة طوارئ لازم تدخل طبي فوري.',
    bodyEn: 'Heat illness occurs when the body cannot cool itself efficiently during exertion in hot or humid conditions, starting with symptoms such as excessive fatigue, headache, dizziness, and muscle cramps, and it can progress to heatstroke (a medical emergency) if confusion, a sharp rise in body temperature, or a stop in sweating appears.\n\nPrevention relies on adequate hydration before, during, and after exercise, gradual heat acclimatization, and avoiding intense effort during peak heat hours. Any sign of possible heatstroke (mental confusion, loss of consciousness, very high temperature) is an emergency requiring immediate medical attention.'
  },
  {
    specialty: 'sports_medicine',
    category: 'condition',
    title: 'نقص التوافر الطاقي عند الرياضيين (RED-S)',
    titleEn: 'Relative Energy Deficiency in Sport (RED-S)',
    body: 'نقص التوافر الطاقي (Relative Energy Deficiency in Sport) بيحصل لما الطاقة اللي الرياضي بياخدها من الأكل مش كافية لتغطية احتياجات التمرين مع باقي وظائف الجسم الأساسية، سواء كان ده مقصود (تقييد أكل) أو غير مقصود (زيادة حمل تدريب من غير زيادة أكل مناسبة).\n\nالتأثيرات بتتعدى الأداء الرياضي لتشمل صحة العظام، الدورة الهرمونية، والمناعة، وبتتشابه أعراضه أحيانًا مع الإفراط في التدريب. التقييم والتعامل معاها بيحتاج فريق متكامل (طبيب طب رياضي وأخصائي تغذية، وأحيانًا أخصائي نفسي) مش حل غذائي بسيط بس.',
    bodyEn: 'Relative Energy Deficiency in Sport happens when the energy an athlete takes in from food is not enough to cover training demands alongside the body\'s other essential functions, whether that is intentional (restricted eating) or unintentional (increased training load without a matching increase in food intake).\n\nIts effects go beyond athletic performance to include bone health, hormonal cycles, and immunity, and its symptoms sometimes resemble overtraining. Assessing and managing it needs an integrated team (a sports medicine doctor and a nutrition specialist, and sometimes a psychologist), not just a simple dietary fix.'
  },
  {
    specialty: 'sports_medicine',
    category: 'protocol',
    title: 'ارتجاج المخ في الرياضة — مبدأ "لو فيه شك، اخرج"',
    titleEn: 'Concussion in sport — the "if in doubt, sit out" principle',
    body: 'ارتجاج المخ إصابة في وظيفة المخ بتحصل بسبب ضربة مباشرة أو غير مباشرة للرأس، وممكن تظهر أعراضه (صداع، دوخة، تلخبط، حساسية للضوء) فورًا أو بعد ساعات. القاعدة الأساسية في أي شك بارتجاج: الرياضي يخرج من الملعب فورًا ومايرجعش لنفس اليوم، حتى لو الأعراض خفت بسرعة.\n\nالعودة للرياضة بعد ارتجاج بتكون تدريجية على مراحل (راحة ذهنية وجسدية، بعدين نشاط خفيف، بعدين مجهود متزايد) وبإشراف طبي مباشر — العجلة في الرجوع بعد ارتجاج من أخطر القرارات اللي ممكن تتاخد في الطب الرياضي.',
    bodyEn: 'A concussion is an injury to brain function caused by a direct or indirect blow to the head, and its symptoms (headache, dizziness, confusion, light sensitivity) can appear immediately or hours later. The fundamental rule for any suspected concussion is that the athlete leaves the field immediately and does not return the same day, even if symptoms fade quickly.\n\nReturn to sport after a concussion is gradual and staged (mental and physical rest, then light activity, then increasing effort) and under direct medical supervision — rushing the return after a concussion is one of the most dangerous decisions that can be made in sports medicine.'
  },

  /* ==================== أخصائي نفسي رياضي ==================== */
  {
    specialty: 'psychologist',
    category: 'education',
    title: 'قلق ما قبل المنافسة — حاجة طبيعية ومتقدر تتعامل معاها',
    titleEn: 'Pre-competition anxiety — normal, and manageable',
    body: 'التوتر قبل المنافسة إحساس طبيعي جدًا ومعظم الرياضيين بيمروا بيه، وبدرجة معينة ممكن حتى يحسّن مستوى التركيز والانتباه. المشكلة بتبقى لما القلق يوصل لدرجة بيأثر فيها على الأداء أو النوم أو الاستمتاع بالرياضة نفسها.\n\nمن الأساليب العامة اللي بتساعد: روتين ثابت قبل المنافسة، تمارين تنفس بسيطة، والتركيز على العملية (الأداء نفسه) بدل النتيجة بس. لو القلق بقى مستمر وبيأثر بشكل واضح على حياة الرياضي اليومية مش بس يوم المنافسة، التقييم من أخصائي نفسي رياضي بيساعد يحدد السبب والأسلوب الأنسب للتعامل معاه.',
    bodyEn: 'Pre-competition nervousness is a very normal feeling and most athletes experience it; at a certain level it can even improve focus and attention. The issue arises when anxiety reaches a level that affects performance, sleep, or enjoyment of the sport itself.\n\nGeneral approaches that help include a consistent pre-competition routine, simple breathing exercises, and focusing on the process (the performance itself) rather than only the outcome. If the anxiety becomes persistent and clearly affects the athlete\'s daily life, not just competition day, an assessment by a sports psychologist helps identify the cause and the most suitable approach for managing it.'
  },
  {
    specialty: 'psychologist',
    category: 'condition',
    title: 'الاحتراق النفسي الرياضي (Burnout)',
    titleEn: 'Athlete burnout',
    body: 'الاحتراق النفسي حالة من الإنهاك الجسدي والذهني بتحصل مع استمرار ضغط التدريب والمنافسة لفترة طويلة من غير توازن كافي، ومن علاماتها الشائعة: فقدان الحماس والدافع اللي كان موجود قبل كده، إحساس دائم بالإرهاق مش بيتحسن بالراحة العادية، وابتعاد تدريجي عن الرياضة نفسيًا حتى لو الرياضي مستمر فيها جسديًا.\n\nبتتشابه أحيانًا مع الإفراط في التدريب الجسدي، لكن جانبها النفسي محتاج تقييم منفصل. التعامل معاها بيحتاج مراجعة شاملة لحمل التدريب والحياة حوالين الرياضة مع بعض، مش بس يوم راحة أو اتنين.',
    bodyEn: 'Burnout is a state of physical and mental exhaustion that develops from sustained training and competition pressure over a long period without enough balance. Common signs include losing the enthusiasm and motivation that used to be there, a persistent sense of exhaustion that does not improve with normal rest, and gradually disengaging from the sport emotionally even while continuing to participate physically.\n\nIt sometimes resembles physical overtraining, but its psychological side needs a separate assessment. Managing it requires a comprehensive review of both training load and life around the sport together, not just a day or two of rest.'
  },
  {
    specialty: 'psychologist',
    category: 'education',
    title: 'الخوف من تكرار الإصابة بعد العودة للرياضة',
    titleEn: 'Fear of re-injury after returning to sport',
    body: 'كتير من الرياضيين بيكملوا التعافي الجسدي بالكامل (قوة، مدى حركة، لياقة) لكن بيفضل عندهم تردد أو خوف من تكرار نفس الإصابة، خصوصًا في الحركات اللي كانت سبب الإصابة الأولى. ده إحساس شائع جدًا ومش معناه ضعف أو مبالغة.\n\nتجاهل الجانب ده والاعتماد على الجاهزية الجسدية بس ممكن يأثر على طريقة أداء الحركة أو يأخر الثقة الكاملة في الرجوع للمستوى السابق. دمج الجانب النفسي في خطة العودة للرياضة (بالتنسيق بين أخصائي التأهيل والأخصائي النفسي) بيساعد الرياضي يرجع بثقة كاملة مش بس بجسم سليم.',
    bodyEn: 'Many athletes complete their physical recovery fully (strength, range of motion, fitness) but are left with hesitation or fear of repeating the same injury, especially in the movements that caused the original injury. This is a very common feeling and does not mean weakness or exaggeration.\n\nIgnoring this side and relying on physical readiness alone can affect how a movement is performed or delay full confidence in returning to the previous level. Integrating the psychological side into the return-to-sport plan (coordinated between the rehab specialist and the psychologist) helps the athlete return with full confidence, not just a sound body.'
  },
  {
    specialty: 'psychologist',
    category: 'education',
    title: 'الجانب النفسي في التعافي من الإصابات الطويلة',
    titleEn: 'The psychological side of recovering from long-term injuries',
    body: 'الإصابة الطويلة مش بس تحدي جسدي — بتيجي معاها في الغالب إحساس بالإحباط، فقدان جزء من الهوية أو الروتين اليومي، وأحيانًا قلق على مستقبل الرياضي الرياضي. التعامل مع الجانب ده بشكل واعي بيحسّن التزام الرياضي ببرنامج التأهيل نفسه.\n\nالتواصل المستمر مع الفريق (المدرب والأخصائي والأخصائي النفسي) عن الحالة النفسية أثناء التعافي، مش بس التقدم الجسدي، بيساعد في اكتشاف أي صعوبة بدري والتعامل معاها قبل ما تأثر على الالتزام بالبرنامج.',
    bodyEn: 'A long-term injury is not just a physical challenge — it often brings a sense of frustration, the loss of part of one\'s identity or daily routine, and sometimes worry about the athlete\'s future in the sport. Consciously addressing this side improves the athlete\'s commitment to the rehab program itself.\n\nOngoing communication with the team (coach, specialist, and psychologist) about the athlete\'s emotional state during recovery, not just physical progress, helps catch any difficulty early and address it before it affects adherence to the program.'
  }
];
