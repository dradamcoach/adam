/*
 * ADAM — ميكانيكا الحركة (Biomechanics)
 * محتوى تعليمي عام كتبه فريق ADAM، مش بديل لتقييم أخصائي. مستنّي مراجعة متخصص قبل الإطلاق النهائي.
 * المدى الحركي = قيم مرجعية شائعة (AAOS) لشخص سليم، والأفراد بيختلفوا.
 */

/* ---------- العضلات (مفتاح -> [عربي, إنجليزي]) ---------- */
export const MU = {
  delt_a: ['الدالية الأمامية', 'Anterior deltoid'], delt_l: ['الدالية الوسطى', 'Middle deltoid'], delt_p: ['الدالية الخلفية', 'Posterior deltoid'],
  pec_maj: ['الصدرية الكبرى', 'Pectoralis major'], pec_clav: ['الصدرية (الجزء العلوي)', 'Pectoralis major (clavicular)'], pec_min: ['الصدرية الصغرى', 'Pectoralis minor'],
  lat: ['العريضة الظهرية', 'Latissimus dorsi'], teres_maj: ['المدورة الكبرى', 'Teres major'], teres_min: ['المدورة الصغرى', 'Teres minor'],
  subscap: ['تحت الكتف', 'Subscapularis'], supra: ['فوق الشوكة', 'Supraspinatus'], infra: ['تحت الشوكة', 'Infraspinatus'], coracobr: ['الغرابية العضدية', 'Coracobrachialis'],
  biceps_b: ['ذات الرأسين (الباي)', 'Biceps brachii'], triceps_b: ['ثلاثية الرؤوس (الترايسبس)', 'Triceps brachii'], brachialis: ['العضدية', 'Brachialis'], brachiorad: ['العضدية الكعبرية', 'Brachioradialis'],
  pron_teres: ['الكابة المدورة', 'Pronator teres'], supinator: ['القالبة للساعد', 'Supinator'],
  wrist_flex: ['قابضات الرسغ', 'Wrist flexors'], wrist_ext: ['باسطات الرسغ', 'Wrist extensors'],
  trap_u: ['المنحرفة العلوية', 'Upper trapezius'], trap_m: ['المنحرفة الوسطى', 'Middle trapezius'], trap_l: ['المنحرفة السفلية', 'Lower trapezius'],
  rhomb: ['المعينية', 'Rhomboids'], lev_scap: ['رافعة الكتف', 'Levator scapulae'], serratus: ['المسننة الأمامية', 'Serratus anterior'],
  scm: ['القصية الترقوية الخشائية', 'Sternocleidomastoid'], scalenes: ['الأخمعية', 'Scalenes'], neck_ext: ['باسطات الرقبة', 'Neck extensors'], neck_flex: ['قابضات الرقبة العميقة', 'Deep neck flexors'],
  erector: ['الناصبة الفقرية', 'Erector spinae'], multifidus: ['المُتعددة الشُعَب', 'Multifidus'], rect_ab: ['المستقيمة البطنية (السِتّ بَكّ)', 'Rectus abdominis'],
  obliques: ['المائلة البطنية', 'Obliques'], tva: ['المستعرضة البطنية', 'Transversus abdominis'], quad_lumb: ['المربعة القطنية', 'Quadratus lumborum'],
  psoas: ['القطنية الحرقفية', 'Psoas / iliacus'], rect_fem: ['المستقيمة الفخذية', 'Rectus femoris'], sartorius: ['الخياطية', 'Sartorius'], tfl: ['الموترة للفافة العريضة', 'TFL'],
  glute_max: ['الإليوية الكبرى (المؤخرة)', 'Gluteus maximus'], glute_med: ['الإليوية الوسطى', 'Gluteus medius'], glute_min: ['الإليوية الصغرى', 'Gluteus minimus'],
  hams: ['الخلفية للفخذ (الهامسترينج)', 'Hamstrings'], adductors: ['المقرِّبات (باطن الفخذ)', 'Adductors'], deep_er: ['المدورات العميقة للورك', 'Deep hip rotators'],
  quads: ['الرباعية الفخذية (الفخذ الأمامي)', 'Quadriceps'], vastus: ['الفاستس (الأوسع)', 'Vasti'], popliteus: ['المأبضية', 'Popliteus'],
  gastroc: ['التوأمية (السمانة)', 'Gastrocnemius'], soleus: ['النعلية', 'Soleus'], tib_ant: ['الظنبوبية الأمامية', 'Tibialis anterior'], tib_post: ['الظنبوبية الخلفية', 'Tibialis posterior'],
  peroneals: ['الشظوية', 'Peroneals'], foot_int: ['عضلات القدم الداخلية', 'Foot intrinsics'], core_all: ['عضلات الكور', 'Core muscles']
};

const PL = { sag: ['المستوى السهمي', 'Sagittal plane'], fro: ['المستوى الجبهي', 'Frontal plane'], tra: ['المستوى المستعرض', 'Transverse plane'] };
export const PLANES = PL;

/* ---------- المفاصل ---------- */
/* mv: [id, عربي, إنجليزي, أقصى مدى بالدرجات, مستوى, عضلات[]] */
export const JOINTS = [
  {
    id: 'shoulder', ar: 'مفصل الكتف', en: 'Shoulder (glenohumeral)', area: 'shoulder',
    type: ['كروي (ball and socket): أكتر مفصل حركة في الجسم وأقلهم ثباتًا، وثباته جاي من العضلات والأربطة مش من العظم.', 'Ball-and-socket: the most mobile and least stable joint; its stability comes from muscles and ligaments rather than bone.'],
    mv: [
      ['flex', 'ثني (رفع الدراع قدام)', 'Flexion (arm forward)', 180, 'sag', ['delt_a', 'pec_clav', 'coracobr', 'biceps_b']],
      ['ext', 'بسط (الدراع ورا)', 'Extension (arm back)', 60, 'sag', ['lat', 'teres_maj', 'delt_p', 'triceps_b']],
      ['abd', 'إبعاد (رفع جانبي)', 'Abduction (lateral raise)', 180, 'fro', ['delt_l', 'supra']],
      ['add', 'تقريب (سحب الدراع للجسم)', 'Adduction', 30, 'fro', ['pec_maj', 'lat', 'teres_maj']],
      ['er', 'دوران خارجي', 'External rotation', 90, 'tra', ['infra', 'teres_min', 'delt_p']],
      ['ir', 'دوران داخلي', 'Internal rotation', 70, 'tra', ['subscap', 'pec_maj', 'lat', 'teres_maj']],
      ['hadd', 'تقريب أفقي (ضغط الصدر)', 'Horizontal adduction (pressing)', 135, 'tra', ['pec_maj', 'delt_a']],
      ['habd', 'إبعاد أفقي (فتح للخلف)', 'Horizontal abduction (rear fly)', 45, 'tra', ['delt_p', 'infra', 'teres_min', 'trap_m']]
    ],
    key: [
      ['كفة الدوارين (فوق الشوكة وتحت الشوكة والمدورة الصغرى وتحت الكتف) بتثبّت رأس العضد جوه التجويف، ولازم تكون قوية ومتوازنة قبل الأوزان التقيلة.', 'The rotator cuff (supraspinatus, infraspinatus, teres minor, subscapularis) centres the humeral head in the socket and must be strong and balanced before heavy loading.'],
      ['رفع الدراع فوق الراس بيحتاج ٢ لـ ١: حوالي ٢ درجة من الكتف نفسه مقابل ١ درجة من حركة اللوح (إيقاع الكتف واللوح).', 'Raising the arm overhead needs scapulohumeral rhythm: roughly 2 degrees at the shoulder per 1 degree of scapular rotation.'],
      ['الضغط فوق الراس بيحتاج حركة كافية في الصدر العلوي (الظهر الصدري) والكتف، ولو مش متوفرة الضهر السفلي بيعوّض.', 'Overhead pressing needs enough thoracic and shoulder mobility; if missing, the lower back compensates.']
    ],
    err: [
      ['رفع الكتف لأذنك (shrugging) في الرفرفة الجانبية: الترابيس بتاخد الشغل من الدالية.', 'Shrugging toward the ears in lateral raises: the traps take over from the deltoid.'],
      ['فتح الكوع زيادة عن اللازم في البنش (٩٠ درجة من الجسم): بيزوّد الضغط على مقدمة الكتف.', 'Flaring the elbows to 90 degrees in bench press raises stress on the front of the shoulder.'],
      ['نزول الدراع ورا خط الجسم بعمق في الديبس والبنش: بيحمّل الكتف في أضعف وضع.', 'Letting the upper arm drop far behind the torso in dips/bench loads the shoulder in its weakest position.'],
      ['القوس الزايد في أسفل الظهر وقت الضغط فوق الراس: تعويض عن نقص مدى الكتف.', 'Excessive lumbar arching in overhead pressing: compensation for limited shoulder range.']
    ],
    inj: [
      ['اصطدام الكتف (Impingement)', 'Shoulder impingement', 'ضغط الأوتار تحت قمة الكتف لما الدراع بترتفع وسط ضعف في اللوح وكفة الدوارين.', 'Tendons are pinched under the acromion during elevation, usually with weak scapular control and rotator cuff.'],
      ['تمزق كفة الدوارين', 'Rotator cuff tear', 'حمل زايد أو متكرر فوق الراس، أو سقطة على دراع ممدود.', 'Repeated or excessive overhead loading, or a fall on an outstretched arm.'],
      ['خلع الكتف', 'Shoulder dislocation', 'دوران خارجي مع إبعاد قوي للدراع (زي الاصطدام أو الرمي).', 'Forced external rotation with abduction (contact or throwing).']
    ]
  },
  {
    id: 'scapula', ar: 'لوح الكتف (الحزام الكتفي)', en: 'Scapula (shoulder girdle)', area: 'shoulder',
    type: ['اللوح مش متصل بالجسم بمفصل عظمي، متعلّق بعضلات بتحركه وبتديه الثبات. أي مشكلة في اللوح بتأثر على الكتف كله.', 'The scapula has no bony joint to the trunk; it floats on muscle. Any scapular problem affects the whole shoulder.'],
    mv: [
      ['elev', 'رفع (كتف لفوق)', 'Elevation (shrug)', 40, 'fro', ['trap_u', 'lev_scap', 'rhomb']],
      ['depr', 'خفض', 'Depression', 10, 'fro', ['trap_l', 'lat', 'pec_min']],
      ['prot', 'إبعاد للأمام (Protraction)', 'Protraction', 25, 'tra', ['serratus', 'pec_min']],
      ['retr', 'تقريب للخلف (Retraction)', 'Retraction', 25, 'tra', ['rhomb', 'trap_m']],
      ['uprot', 'دوران لفوق', 'Upward rotation', 60, 'fro', ['trap_u', 'trap_l', 'serratus']],
      ['dnrot', 'دوران لتحت', 'Downward rotation', 30, 'fro', ['rhomb', 'pec_min', 'lat']]
    ],
    key: [
      ['المسننة الأمامية والمنحرفة السفلية هما سر ثبات اللوح في الرفع فوق الراس.', 'Serratus anterior and lower trapezius are the key stabilisers of the scapula in overhead work.'],
      ['تمارين السحب (Rows, Face pull) محتاجة ثبات اللوح الأول قبل ما تشد بالدراع.', 'Pulling exercises (rows, face pulls) need scapular setting before the arm pulls.']
    ],
    err: [
      ['سحب الوزن بالدراع بس من غير تحريك اللوح (أو بالعكس الشدّ بالرقبة والترابيس).', 'Pulling with the arms only without scapular movement (or yanking with the neck and traps).'],
      ['اللوح الجناحي (بيبرز من الضهر) وقت الضغط أو البلانك: ضعف في المسننة الأمامية.', 'Scapular winging in presses or planks: weak serratus anterior.']
    ],
    inj: [['ألم الرقبة والترابيس', 'Neck and upper-trap pain', 'تعويض ضعف اللوح بشد الرقبة والمنحرفة العلوية لفترات طويلة.', 'Chronic overuse of the upper traps and neck to compensate for weak scapular stabilisers.']]
  },
  {
    id: 'elbow', ar: 'مفصل الكوع', en: 'Elbow', area: 'elbow',
    type: ['مفصل مفصلي (hinge) يتحرك في اتجاهين بس: ثني وبسط. جزء منه كمان بيتحكم في دوران الساعد.', 'Hinge joint: mainly flexion and extension, with the forearm rotating at the radioulnar joint.'],
    mv: [
      ['flex', 'ثني', 'Flexion', 150, 'sag', ['biceps_b', 'brachialis', 'brachiorad']],
      ['ext', 'بسط', 'Extension', 150, 'sag', ['triceps_b']]
    ],
    key: [
      ['الباي بيشتغل أقوى لما الكف متقلبة لفوق (supinated)، والعضدية (brachialis) بتشتغل أكتر لما الكف لتحت، والعضدية الكعبرية في القبضة المحايدة (Hammer).', 'The biceps works most with the palm up (supinated); the brachialis dominates with the palm down; the brachioradialis with a neutral (hammer) grip.'],
      ['الترايسبس رأسه الطويل بيعدي على الكتف، فبيتمدد أكتر في تمارين فوق الراس.', 'The long head of the triceps crosses the shoulder, so it is stretched more in overhead exercises.']
    ],
    err: [
      ['تحريك الكوع للأمام وقت الكيرل وتأرجح الجذع: تحويل الشغل لعضلات تانية.', 'Swinging the elbows forward and rocking the torso in curls: shifts work away from the target.'],
      ['فتح الكوع للجانب في الترايسبس فوق الراس (الكوع مش ثابت).', 'Elbows drifting out in overhead triceps work.'],
      ['القفل الكامل العنيف للكوع تحت حمل تقيل.', 'Slamming into hard lockout at the elbow under heavy load.']
    ],
    inj: [
      ['كوع التنس والجولف', 'Tennis / golfer’s elbow', 'تحميل متكرر لأوتار الباسطات (الجانب الخارجي) أو القابضات (الجانب الداخلي) من الرسغ، غالبًا من قبضة قوية متكررة.', 'Repeated loading of the wrist extensor tendons (outer elbow) or flexor tendons (inner elbow), typically from repetitive gripping.'],
      ['التهاب وتر الترايسبس', 'Triceps tendinopathy', 'زيادة سريعة في حجم تمارين البسط أو الديبس.', 'A rapid rise in volume of extension work or dips.']
    ]
  },
  {
    id: 'forearm', ar: 'الساعد (الكب والقلب)', en: 'Forearm (pronation / supination)', area: 'elbow',
    type: ['دوران الراديوس حوالين الألنا. بيحدد وضع الكف: لفوق (قلب) أو لتحت (كب).', 'The radius rotates around the ulna, setting the palm up (supination) or down (pronation).'],
    mv: [
      ['sup', 'قلب (الكف لفوق)', 'Supination', 80, 'tra', ['biceps_b', 'supinator']],
      ['pro', 'كب (الكف لتحت)', 'Pronation', 80, 'tra', ['pron_teres']]
    ],
    key: [['قبضة السحب (overhand / underhand) بتغيّر العضلة المسيطرة: القبضة العكسية بتزوّد مساهمة الباي.', 'Grip choice shifts the dominant muscle: an underhand pull-up recruits the biceps more.']],
    err: [['تثبيت الرسغ في وضع منحني وقت السحب بيزوّد الضغط على الأوتار.', 'A bent wrist under pulling loads adds stress on the tendons.']],
    inj: [['ألم الساعد من القبضة', 'Forearm overuse pain', 'قبضة قوية ومتكررة بدون راحة (سحب، ديدلفت، تسلق).', 'Frequent heavy gripping without rest (pulling, deadlifts, climbing).']]
  },
  {
    id: 'wrist', ar: 'مفصل الرسغ', en: 'Wrist', area: 'elbow',
    type: ['مفصل بيضاوي: ثني وبسط وإمالة جانبية. بيتحمّل ضغط كبير في الضغط والديبس والبلانك على الكف.', 'Ellipsoid joint: flexion, extension and side deviation; heavily loaded in presses, push-ups and planks.'],
    mv: [
      ['flex', 'ثني', 'Flexion', 80, 'sag', ['wrist_flex']],
      ['ext', 'بسط', 'Extension', 70, 'sag', ['wrist_ext']],
      ['rad', 'إمالة ناحية الإبهام (Radial)', 'Radial deviation', 20, 'fro', ['wrist_ext', 'wrist_flex']],
      ['uln', 'إمالة ناحية الخنصر (Ulnar)', 'Ulnar deviation', 30, 'fro', ['wrist_ext', 'wrist_flex']]
    ],
    key: [['الرسغ المحايد (مستقيم مع الساعد) تحت الحمل بيقلل الضغط على الأوتار والعصب الأوسط.', 'A neutral wrist under load reduces stress on tendons and the median nerve.']],
    err: [['الباسطات المتراخية: البار بيميل للخلف على الرسغ في البنش.', 'The bar rolling back on a bent wrist in bench press.'], ['الضغط على الكفوف بكامل الوزن لما الرسغ مش مرن (استخدم قبضة أو كوع).', 'Full body weight on extended wrists with limited mobility (use fists or forearm variations).']],
    inj: [['متلازمة النفق الرسغي', 'Carpal tunnel syndrome', 'ضغط على العصب الأوسط بسبب وضعيات رسغ متطرفة أو متكررة.', 'Median nerve compression from sustained or repeated extreme wrist positions.'], ['شد الرسغ (Sprain)', 'Wrist sprain', 'السقوط على كف مفرود أو حمل مفاجئ.', 'A fall on an outstretched hand or a sudden load.']]
  },
  {
    id: 'cervical', ar: 'الفقرات العنقية (الرقبة)', en: 'Cervical spine (neck)', area: 'neck',
    type: ['٧ فقرات، مرنة جدًا وبتشيل راس تقيلة (٤ ـ ٥ كجم). الثبات بيجي من عضلات الرقبة العميقة.', 'Seven highly mobile vertebrae carrying a 4-5 kg head; stability comes from the deep neck flexors.'],
    mv: [
      ['flex', 'ثني (الدقن للصدر)', 'Flexion', 45, 'sag', ['scm', 'neck_flex']],
      ['ext', 'بسط (النظر لفوق)', 'Extension', 45, 'sag', ['neck_ext', 'trap_u']],
      ['lat', 'ميل جانبي', 'Lateral flexion', 45, 'fro', ['scalenes', 'scm', 'trap_u']],
      ['rot', 'دوران', 'Rotation', 80, 'tra', ['scm', 'neck_ext']]
    ],
    key: [['كل سنتيمتر ميلان للراس للأمام بيزوّد الحمل على الرقبة جدًا، فوضعية الموبايل والكمبيوتر بتؤثر على الرقبة.', 'Every centimetre the head moves forward multiplies the load on the neck, so phone and desk posture matter.']],
    err: [['مد الدقن للأمام (chin poke) في تمارين الضغط والبلانك والسحب.', 'Poking the chin forward in presses, planks and pulls.'], ['رفع الرقبة بقوة وقت الكرنش بدل ما ينثني الجذع.', 'Pulling on the neck during crunches instead of curling the trunk.']],
    inj: [['شد الرقبة والصداع التوتري', 'Neck strain and tension headache', 'وضعيات رقبة ثابتة وراس للأمام مع ضعف قابضات الرقبة العميقة.', 'Prolonged forward-head posture with weak deep neck flexors.']]
  },
  {
    id: 'thoracic', ar: 'الفقرات الصدرية (منتصف الضهر)', en: 'Thoracic spine', area: 'low_back',
    type: ['١٢ فقرة متصلة بالضلوع، فمرونتها أقل في الثني والبسط، لكنها أهم مكان للدوران.', 'Twelve vertebrae attached to the ribs: less flexion/extension but the main site of trunk rotation.'],
    mv: [
      ['flex', 'ثني', 'Flexion', 40, 'sag', ['rect_ab', 'obliques']],
      ['ext', 'بسط', 'Extension', 25, 'sag', ['erector', 'multifidus', 'trap_m']],
      ['rot', 'دوران', 'Rotation', 40, 'tra', ['obliques', 'multifidus']],
      ['lat', 'ميل جانبي', 'Lateral flexion', 25, 'fro', ['obliques', 'quad_lumb', 'erector']]
    ],
    key: [['لو منتصف الضهر متيبّس، الضهر السفلي والكتف بيدفعوا التمن (زيادة حركة وضغط).', 'If the mid-back is stiff, the lower back and shoulders pay the price with excess motion and stress.']],
    err: [['تدوير الضهر السفلي بدل الصدري في تمارين الدوران (woodchop، سبحة، جولف).', 'Rotating through the lower back instead of the thoracic spine in rotational drills.']],
    inj: [['ألم منتصف الضهر', 'Mid-back stiffness / pain', 'وضعية جلوس منحنية مع ضعف عضلات الضهر العلوية.', 'Slouched sitting with weak upper-back muscles.']]
  },
  {
    id: 'lumbar', ar: 'الفقرات القطنية (أسفل الضهر)', en: 'Lumbar spine and pelvis', area: 'low_back',
    type: ['٥ فقرات كبيرة بتشيل وزن الجسم. بتتحرك للثني والبسط أكتر من الدوران، ووظيفتها الأساسية الثبات مش المرونة.', 'Five large vertebrae bearing body weight: built for stability rather than rotation, with flexion/extension as the main motions.'],
    mv: [
      ['flex', 'ثني', 'Flexion', 60, 'sag', ['rect_ab', 'obliques', 'psoas']],
      ['ext', 'بسط', 'Extension', 25, 'sag', ['erector', 'multifidus', 'quad_lumb']],
      ['lat', 'ميل جانبي', 'Lateral flexion', 25, 'fro', ['quad_lumb', 'obliques', 'erector']],
      ['rot', 'دوران (قليل جدًا)', 'Rotation (very small)', 5, 'tra', ['obliques', 'multifidus']],
      ['apt', 'ميلان الحوض للأمام', 'Anterior pelvic tilt', 15, 'sag', ['psoas', 'rect_fem', 'erector']],
      ['ppt', 'ميلان الحوض للخلف', 'Posterior pelvic tilt', 15, 'sag', ['rect_ab', 'glute_max', 'hams']]
    ],
    key: [
      ['الكور عبارة عن "اسطوانة" (البطن قدام، الضهر ورا، الحجاب فوق، قاع الحوض تحت) بتحمي الضهر بضغط داخل البطن (bracing).', 'The core is a cylinder (abs in front, back muscles behind, diaphragm above, pelvic floor below) that protects the spine through bracing.'],
      ['الهدف في الأوزان: ضهر محايد ثابت، والحركة تيجي من الورك مش من أسفل الضهر.', 'In lifting the goal is a neutral, stable spine, with motion coming from the hips, not the lumbar spine.']
    ],
    err: [
      ['تدوير الضهر السفلي (butt wink) في آخر نزول السكوات: غالبًا قلة مرونة في الورك أو الكاحل.', 'Lumbar flexion at the bottom of the squat (butt wink), often from limited hip or ankle mobility.'],
      ['قوس زايد في الضهر السفلي في الضغط فوق الراس والبلانك.', 'Excess lumbar arch in overhead presses and planks.'],
      ['رفع الوزن بتقويس الضهر وتحميل الفقرات في الديدلفت.', 'Rounding the back under load in deadlifts.']
    ],
    inj: [
      ['ألم أسفل الضهر الميكانيكي', 'Mechanical low back pain', 'تكرار ثني الضهر تحت حمل، أو جلوس طويل مع ضعف الكور والإليوية.', 'Repeated loaded flexion, or long sitting with weak core and glutes.'],
      ['انزلاق غضروفي', 'Disc herniation', 'ثني + دوران تحت حمل، أو رفع مفاجئ بضهر مقوّس.', 'Loaded flexion plus rotation, or a sudden lift with a rounded back.']
    ]
  },
  {
    id: 'hip', ar: 'مفصل الورك', en: 'Hip', area: 'hip',
    type: ['كروي عميق: تجويف الحوض بيحتوي رأس الفخذ، فهو أثبت من الكتف. ده أهم مصدر للقوة في الجري والقفز والسكوات.', 'Deep ball-and-socket: more stable than the shoulder and the primary power source in running, jumping and squatting.'],
    mv: [
      ['flex', 'ثني', 'Flexion', 120, 'sag', ['psoas', 'rect_fem', 'sartorius', 'tfl']],
      ['ext', 'بسط', 'Extension', 30, 'sag', ['glute_max', 'hams']],
      ['abd', 'إبعاد', 'Abduction', 45, 'fro', ['glute_med', 'glute_min', 'tfl']],
      ['add', 'تقريب', 'Adduction', 30, 'fro', ['adductors']],
      ['ir', 'دوران داخلي', 'Internal rotation', 45, 'tra', ['glute_min', 'tfl', 'adductors']],
      ['er', 'دوران خارجي', 'External rotation', 45, 'tra', ['deep_er', 'glute_max']]
    ],
    key: [
      ['الإليوية الكبرى هي أقوى عضلة بسط للورك، والهامسترينج بتساعدها، وبتشتغل مع الرباعية في النزول والصعود.', 'Gluteus maximus is the strongest hip extensor, with the hamstrings assisting, and works with the quads in squat and lunge patterns.'],
      ['الإليوية الوسطى بتثبت الحوض في الوقوف على رجل واحدة، وضعفها بيخلّي الركبة تنهار للداخل (valgus).', 'Gluteus medius stabilises the pelvis in single-leg stance; weakness lets the knee collapse inward (valgus).'],
      ['مرونة الورك المحدودة بتتعوّض من أسفل الضهر أو الركبة.', 'Limited hip mobility is compensated at the lower back or knee.']
    ],
    err: [
      ['انهيار الركبة لجوه وقت السكوات واللانجز.', 'Knees collapsing inward in squats and lunges.'],
      ['السكوات بالركبة بس من غير ثني الورك (الحوض مش بيرجع للخلف).', 'Squatting from the knees without hip hinge (pelvis not moving back).'],
      ['استخدام أسفل الضهر بدل الإليوية في الهيب ثراست (قوس زايد في آخر الحركة).', 'Using the lower back instead of the glutes in hip thrusts (over-arching at lockout).']
    ],
    inj: [
      ['شد الفخذ الأمامي/ثنية الورك', 'Hip flexor strain', 'ركل أو جري سريع مع قلة إحماء، أو ضعف في العضلة.', 'Fast kicking or sprinting without warm-up or with weak hip flexors.'],
      ['اصطدام الفخذ بالحوض (FAI)', 'Femoroacetabular impingement', 'شكل عظمي يسبب احتكاك في ثني الورك العميق، بيظهر كألم في الأربية.', 'Bony shape causes pinching in deep hip flexion, felt as groin pain.'],
      ['التهاب الوتر الجانبي (Greater trochanteric pain)', 'Gluteal tendinopathy', 'ضعف الإليوية الوسطى وتحميل متكرر وقت الجري.', 'Weak gluteus medius with repetitive loading in running.']
    ]
  },
  {
    id: 'knee', ar: 'مفصل الركبة', en: 'Knee', area: 'knee',
    type: ['أكبر مفصل في الجسم، يتحرك أساسًا ثني وبسط مع دوران بسيط، وثباته جاي من الأربطة (الصليبي والجانبية) والغضاريف والعضلات.', 'The largest joint: mainly hinge motion with a little rotation, stabilised by ligaments (ACL/PCL, collaterals), menisci and muscles.'],
    mv: [
      ['flex', 'ثني', 'Flexion', 135, 'sag', ['hams', 'gastroc', 'popliteus', 'sartorius']],
      ['ext', 'بسط', 'Extension', 135, 'sag', ['quads', 'vastus', 'rect_fem']],
      ['ir', 'دوران داخلي للساق (والركبة مثنية)', 'Tibial internal rotation (knee flexed)', 10, 'tra', ['hams', 'popliteus']],
      ['er', 'دوران خارجي للساق (والركبة مثنية)', 'Tibial external rotation (knee flexed)', 10, 'tra', ['hams']]
    ],
    key: [
      ['الرباط الصليبي الأمامي (ACL) بيمنع انزلاق الساق للأمام، والخلفي (PCL) بيمنع انزلاقها للخلف.', 'ACL prevents the tibia sliding forward; PCL prevents it sliding back.'],
      ['الركبة تحت حمل بتتحرك مع اتجاه الصابع، يعني خلي الركبة في اتجاه صوابع القدم الثانية.', 'Under load the knee should track in line with the toes (second toe).'],
      ['الهامسترينج بتحمي الصليبي لأنها بتمنع انزلاق الساق للأمام، فتقويتها وقاية مهمة.', 'The hamstrings protect the ACL by resisting forward tibial glide, so strengthening them is a key preventive step.'],
      ['الركبة المثنية ٩٠ درجة بتتحمل قوى انضغاط تقدر تتعدى عدة أضعاف وزن الجسم، فالتحكم أهم من العمق الزايد.', 'At 90° of flexion knee compression can exceed several times body weight, so control matters more than extra depth.']
    ],
    err: [
      ['انهيار الركبة للداخل (valgus) في الهبوط والسكوات والجري.', 'Inward knee collapse (valgus) in landing, squatting and running.'],
      ['ارتداد الركبة (bouncing) في آخر النزول بسرعة بدون تحكم.', 'Bouncing out of the bottom of a squat without control.'],
      ['تمديد الركبة بقوة لآخره بحمل كبير في جهاز الفخذ الأمامي.', 'Forced, heavy end-range knee extension on machines.']
    ],
    inj: [
      ['قطع الرباط الصليبي الأمامي', 'ACL tear', 'غالبًا غير احتكاكي: هبوط أو تغيير اتجاه سريع بركبة مفرودة ومنهارة للداخل.', 'Usually non-contact: landing or cutting with an extended, inward-collapsing knee.'],
      ['متلازمة الركبة الرضفية الفخذية (Runner’s knee)', 'Patellofemoral pain', 'زيادة حمل الجري/السكوات مع ضعف الإليوية والفخذ وانهيار الركبة.', 'Sudden load increase in running/squats with weak glutes/quads and knee valgus.'],
      ['تمزق الغضروف الهلالي', 'Meniscus tear', 'دوران مع ثقل على ركبة مثنية.', 'Twisting on a flexed, weight-bearing knee.'],
      ['التهاب وتر الرضفة (ركبة القافز)', 'Patellar tendinopathy', 'قفز وهبوط متكرر بدون راحة كافية.', 'Repetitive jumping and landing without enough recovery.']
    ]
  },
  {
    id: 'ankle', ar: 'مفصل الكاحل', en: 'Ankle (talocrural)', area: 'ankle',
    type: ['مفصل مفصلي بيتحكم في ثني القدم لفوق ولتحت، وبيشيل أكتر من ضعف وزن الجسم في المشي والجري.', 'Hinge joint controlling foot up/down motion, carrying several times body weight in walking and running.'],
    mv: [
      ['df', 'ثني ظهري (القدم لفوق)', 'Dorsiflexion', 20, 'sag', ['tib_ant']],
      ['pf', 'ثني أخمصي (على أطراف الصوابع)', 'Plantarflexion', 50, 'sag', ['gastroc', 'soleus', 'tib_post', 'peroneals']]
    ],
    key: [
      ['الثني الظهري المحدود بيخلّي الكعب يرتفع في السكوات ويضغط على الركبة والضهر.', 'Limited dorsiflexion lifts the heels in squats and shifts stress to the knees and back.'],
      ['السمانة التوأمية بتشتغل مع الركبة المفرودة، والنعلية بتشتغل مع الركبة المثنية (تمارين جلوس).', 'Gastrocnemius works best with the knee straight, soleus with the knee bent (seated calf raise).']
    ],
    err: [['رفع الكعوب في السكوات: قلة مرونة في الكاحل (ممكن رفع الكعب بشريحة مؤقتًا).', 'Heels rising in squats: limited ankle mobility.'], ['تعويض نقص الحركة بانهيار القدم لجوه.', 'Compensating for limited motion by letting the foot collapse inward.']],
    inj: [['التواء الكاحل', 'Ankle sprain', 'انقلاب القدم للداخل (inversion) أثناء الهبوط أو تغيير الاتجاه.', 'Foot rolling inward (inversion) during landing or cutting.'], ['التهاب وتر أخيل', 'Achilles tendinopathy', 'زيادة سريعة في الجري والقفز أو ضعف السمانة.', 'Fast increases in running and jumping or weak calves.']]
  },
  {
    id: 'foot', ar: 'القدم (تحت الكاحل)', en: 'Foot (subtalar and arches)', area: 'foot',
    type: ['القدم بتتحول من "ممتص صدمات" مرن لما بتلمس الأرض لـ"رافعة" صلبة وقت الدفع. قوس القدم بيتحكم في ده.', 'The foot switches from a flexible shock absorber at contact to a rigid lever at push-off; the arch controls this.'],
    mv: [
      ['inv', 'انقلاب لداخل (Inversion)', 'Inversion', 35, 'fro', ['tib_post', 'tib_ant']],
      ['ev', 'انقلاب لبرّه (Eversion)', 'Eversion', 15, 'fro', ['peroneals']]
    ],
    key: [['عضلات القدم الداخلية والظنبوبية الخلفية بتحمل القوس، ومش لازم الحذاء يعمل كل الشغل.', 'The foot intrinsics and tibialis posterior support the arch; the shoe need not do all the work.']],
    err: [['انهيار القوس (over-pronation) مع الركبة لجوه وقت الجري والقفز.', 'Arch collapse (over-pronation) with the knee drifting in during running and jumping.']],
    inj: [['التهاب اللفافة الأخمصية', 'Plantar fasciitis', 'حمل زايد على القدم بدون إحماء أو مع سمانة مشدودة وقوس ضعيف.', 'Excess foot loading with tight calves and a weak arch.'], ['التهاب سمحاق الساق (Shin splints)', 'Shin splints', 'زيادة سريعة في الجري على أرض صلبة.', 'Rapid increases in running volume, especially on hard surfaces.']]
  }
];

/* ---------- أنماط الحركة ---------- */
/* joints: [مفصل, عربي, إنجليزي] */
export const PATTERNS = [
  {
    id: 'squat', ar: 'القرفصاء (Squat)', en: 'Squat', rx: /squat|leg press|hack|sissy|wall sit|thruster|goblet|pistol|box squat/i,
    mus: ['glute_max', 'quads', 'adductors', 'erector', 'core_all'],
    joints: [['hip', 'ثني في النزول وبسط في الصعود', 'Flexion down, extension up'], ['knee', 'ثني ثم بسط', 'Flexion then extension'], ['ankle', 'ثني ظهري ثم ثني أخمصي', 'Dorsiflexion then plantarflexion']],
    load: ['أصعب نقطة قرب أسفل الحركة لأن ذراع العزم على الركبة والورك بيكون أكبر ما يمكن.', 'The hardest point is near the bottom, where the moment arm at the knee and hip is greatest.'],
    cues: [['ابدأ بدفع الحوض للخلف قليلًا مع ثني الركبة في نفس الوقت.', 'Start by sitting the hips back slightly while bending the knees.'], ['الركبة في اتجاه صوابع القدم والوزن على منتصف القدم.', 'Knees track over the toes with weight through mid-foot.'], ['صدر مرفوع وضهر محايد وبطن مشدودة قبل النزول.', 'Chest up, neutral spine, brace before descending.'], ['ارفع بدفع الأرض بالقدمين مش بالضهر.', 'Stand up by pushing the floor away, not by extending the back.']],
    err: [['الركبة تنهار لداخل.', 'Knees caving in.'], ['الكعبين يتحركوا من الأرض.', 'Heels lifting.'], ['الضهر يتقوس في آخر النزول.', 'Back rounding at the bottom.'], ['الحوض يطلع قبل الصدر (good morning squat).', 'Hips rising before the chest.']]
  },
  {
    id: 'lunge', ar: 'اللانجز والخطوة (رجل واحدة)', en: 'Lunge / split squat / step-up', rx: /lunge|split squat|step[- ]?up|bulgarian|single[- ]leg squat|skater squat|cossack/i,
    mus: ['glute_max', 'quads', 'glute_med', 'adductors', 'hams'],
    joints: [['hip', 'ثني ثم بسط مع ثبات الحوض', 'Flexion then extension with pelvic control'], ['knee', 'ثني ثم بسط', 'Flexion then extension'], ['ankle', 'ثني ظهري ثم أخمصي', 'Dorsiflexion then plantarflexion']],
    load: ['الحمل على الرجل الأمامية أعلى، وتثبيت الحوض بالإليوية الوسطى هو التحدي الحقيقي.', 'The front leg carries most load, and pelvic control by the gluteus medius is the real challenge.'],
    cues: [['خطوة طويلة كفاية عشان الركبة الأمامية ماتعدّيش الصوابع بكتير.', 'A long enough stride so the front knee does not travel far past the toes.'], ['الجذع مستقيم والحوض مستوي.', 'Upright torso and level pelvis.'], ['انزل عمودي مش للأمام.', 'Lower straight down, not forward.']],
    err: [['الركبة الأمامية تميل لجوه.', 'Front knee collapsing in.'], ['الحوض يميل لجانب (ضعف الإليوية الوسطى).', 'Pelvic drop to one side (weak glute medius).'], ['خطوة قصيرة جدًا تحمل الركبة زيادة.', 'A stride that is too short overloads the knee.']]
  },
  {
    id: 'hinge', ar: 'ثني الورك (Hinge): ديدلفت وRDL', en: 'Hip hinge (deadlift, RDL, hip thrust)', rx: /deadlift|romanian|rdl|good morning|hip thrust|glute bridge|bridge|kettlebell swing|swing|hyperextension|back extension|pull[- ]?through|stiff[- ]?leg|clean pull/i,
    mus: ['glute_max', 'hams', 'erector', 'adductors', 'lat'],
    joints: [['hip', 'ثني للخلف ثم بسط قوي', 'Hinge back then forceful extension'], ['knee', 'ثني خفيف يتغير حسب التمرين', 'Slight flexion, varies by lift'], ['lumbar', 'ثبات (ضهر محايد)', 'Stable (neutral spine)']],
    load: ['أقصى عزم على الضهر والورك لما البار بعيد عن الجسم، فخلّي البار قريب من رجلك.', 'Peak torque on the spine and hip occurs when the bar is far from the body, so keep it close to your legs.'],
    cues: [['الحوض يروح للخلف كأنك بتقفل باب بمؤخرتك، والركبة تثني قليلًا بس.', 'Push the hips back as if closing a door with your backside; bend the knees only a little.'], ['شد اللوح لتحت وشد البطن (bracing) قبل ما تبدأ.', 'Pull the shoulder blades down and brace before starting.'], ['القفل في الآخر بالإليوية مش بتقويس الضهر.', 'Finish with the glutes, not by hyperextending the back.'], ['البار ماشي ملاصق للرجل طول الوقت.', 'Keep the bar in contact with the legs throughout.']],
    err: [['تقويس الضهر في النزول.', 'Rounding the back during the lift.'], ['البار بعيد عن الرجل.', 'Bar drifting away from the legs.'], ['قفل زايد بالضهر في آخر الصعود.', 'Hyperextending the lower back at lockout.'], ['تحويل الـRDL لسكوات بثني الركبة زيادة.', 'Turning an RDL into a squat by over-bending the knees.']]
  },
  {
    id: 'hpush', ar: 'دفع أفقي (ضغط وبنش)', en: 'Horizontal push (bench, push-up)', rx: /bench press|push[- ]?up|chest press|dumbbell press|fly|flye|pec deck|cable cross|pushup|floor press|svend/i,
    mus: ['pec_maj', 'delt_a', 'triceps_b', 'serratus'],
    joints: [['shoulder', 'تقريب أفقي', 'Horizontal adduction'], ['elbow', 'بسط', 'Extension'], ['scapula', 'ثبات (تقريب خفيف للوح للخلف)', 'Stabilisation (slightly retracted)']],
    load: ['أصعب نقطة قرب الصدر لما الذراع طويل، وفي الفلاي الحمل أكبر على الكتف بسبب ذراع عزم أطول.', 'The hardest point is near the chest; flys load the shoulder more because of a longer moment arm.'],
    cues: [['اللوح مشدود للخلف ولتحت قبل النزول.', 'Set the shoulder blades back and down first.'], ['الكوع بزاوية حوالي ٤٥ ـ ٧٥ درجة مع الجسم مش ٩٠.', 'Elbows at roughly 45-75 degrees from the torso, not 90.'], ['الرسغ فوق الكوع والبار على الكف مش على الأصابع.', 'Keep the wrist stacked over the elbow with the bar over the heel of the hand.']],
    err: [['فتح الكوع زيادة (٩٠ درجة).', 'Elbows flared to 90 degrees.'], ['رفع الأكتاف لقدام (ظهور الكتف قدام).', 'Shoulders rolling forward.'], ['ارتداد البار على الصدر.', 'Bouncing the bar off the chest.'], ['حوض يرتفع من البنش بدل الدفع.', 'Hips lifting off the bench.']]
  },
  {
    id: 'vpush', ar: 'دفع رأسي (ضغط كتف وديبس)', en: 'Vertical push (overhead press, dips)', rx: /overhead|shoulder press|military|arnold|push press|jerk|\bdips?\b|handstand|pike push|landmine press/i,
    mus: ['delt_a', 'delt_l', 'triceps_b', 'trap_u', 'serratus'],
    joints: [['shoulder', 'ثني وإبعاد مع دوران خارجي', 'Flexion and abduction with external rotation'], ['elbow', 'بسط', 'Extension'], ['scapula', 'دوران لفوق', 'Upward rotation']],
    load: ['أعلى حمل على الكتف لما الدراع بيعدي مستوى الأذن، وعلى الضهر السفلي لو القوس زايد.', 'Highest shoulder load occurs as the arm passes ear level; the lower back is loaded if you over-arch.'],
    cues: [['البطن والإليوية مشدودين، أضلاعك للأسفل (مفيش قوس).', 'Brace abs and glutes, ribs down (no arch).'], ['البار بيمشي في خط مستقيم قريب من الوش.', 'The bar travels straight, close to the face.'], ['ادفع الراس لقدام تحت البار في الآخر (قفل الكتف).', 'Move the head through at the top for full shoulder lockout.']],
    err: [['قوس زايد في الضهر السفلي.', 'Excessive lumbar arch.'], ['البار لقدام الجسم بعيد.', 'Bar looping forward of the body.'], ['النزول بعمق شديد في الديبس مع كتف لقدام.', 'Dropping too deep in dips with shoulders rolled forward.']]
  },
  {
    id: 'hpull', ar: 'سحب أفقي (Rows)', en: 'Horizontal pull (rows)', rx: /row|face pull|rear delt|reverse fly|bent[- ]over|seated cable|t[- ]?bar|inverted|renegade|pendlay/i,
    mus: ['rhomb', 'trap_m', 'lat', 'delt_p', 'biceps_b', 'erector'],
    joints: [['scapula', 'تقريب للخلف', 'Retraction'], ['shoulder', 'بسط ودوران خارجي حسب التمرين', 'Extension and external rotation depending on the lift'], ['elbow', 'ثني', 'Flexion']],
    load: ['الحمل عالي على الضهر السفلي في الرو المنحني لأن الجذع بيشتغل ثبات ضد الجاذبية.', 'The lower back works isometrically against gravity in bent-over rows.'],
    cues: [['ابدأ الشد بتحريك اللوح للخلف مش بثني الكوع بس.', 'Start the pull by moving the shoulder blades back, not just bending the elbows.'], ['ضهر محايد والجذع ثابت.', 'Neutral spine with a steady torso.'], ['الكوع ماشي ناحية الورك.', 'Drive the elbow toward the hip.']],
    err: [['تأرجح الجذع لتحريك الوزن.', 'Rocking the torso to move the weight.'], ['رفع الكتف لأذنك.', 'Shrugging toward the ears.'], ['تقويس الضهر.', 'Rounding the back.']]
  },
  {
    id: 'vpull', ar: 'سحب رأسي (عقلة وبولداون)', en: 'Vertical pull (pull-ups, pulldowns)', rx: /pull[- ]?up|chin[- ]?up|pulldown|lat pull|muscle[- ]?up|rope climb|climb/i,
    mus: ['lat', 'teres_maj', 'biceps_b', 'rhomb', 'trap_l', 'brachialis'],
    joints: [['shoulder', 'بسط وتقريب', 'Extension and adduction'], ['elbow', 'ثني', 'Flexion'], ['scapula', 'خفض ودوران لتحت', 'Depression and downward rotation']],
    load: ['أصعب نقطة في أسفل الحركة والدراع ممدود (dead hang) لأن الكتف بيكون تحت أكبر شد.', 'The hardest point is the bottom dead hang, where the shoulder is under greatest stretch.'],
    cues: [['ابدأ بخفض اللوح قبل ما تثني الكوع.', 'Begin by depressing the scapulae before bending the elbows.'], ['الصدر لقدام والدقن فوق البار.', 'Chest to the bar with the chin over it.'], ['انزل بتحكم لآخر الحركة.', 'Lower under control to the full hang.']],
    err: [['الكيبينج (تأرجح) من غير تحكم.', 'Uncontrolled kipping.'], ['رفع الكتف لأذنك طول الوقت.', 'Staying shrugged to the ears.'], ['نزول جزئي بدون مدى كامل.', 'Partial lowering without full range.']]
  },
  {
    id: 'curl', ar: 'ثني الكوع (باي)', en: 'Elbow flexion (biceps curls)', rx: /curl|hammer|preacher|concentration|zottman|spider/i,
    mus: ['biceps_b', 'brachialis', 'brachiorad'],
    joints: [['elbow', 'ثني ضد المقاومة', 'Flexion against resistance'], ['forearm', 'قلب (حسب القبضة)', 'Supination (grip dependent)']],
    load: ['العزم أكبر لما الساعد أفقي (حوالي ٩٠ درجة)، فالتمرين بيبقى أصعب في المنتصف.', 'The torque is greatest when the forearm is horizontal (about 90 degrees), so the middle of the range is the hardest.'],
    cues: [['الكوع ثابت جنب الجسم.', 'Elbows pinned near the sides.'], ['الرسغ محايد.', 'Neutral wrist.'], ['نزول بطيء ٢ ـ ٣ ثواني.', 'Lower slowly over 2-3 seconds.']],
    err: [['تأرجح الجذع.', 'Swinging the torso.'], ['الكوع يتحرك لقدام.', 'Elbows drifting forward.'], ['مدى جزئي في النزول.', 'Short range on the way down.']]
  },
  {
    id: 'triext', ar: 'بسط الكوع (ترايسبس)', en: 'Elbow extension (triceps)', rx: /triceps|tricep|pushdown|skull|french|tricep kickback|jm press/i,
    mus: ['triceps_b'],
    joints: [['elbow', 'بسط ضد المقاومة', 'Extension against resistance'], ['shoulder', 'ثابت (أو مثني في فوق الراس)', 'Fixed (or flexed in overhead versions)']],
    load: ['الرأس الطويل بيتحمّل أكتر وهو ممدود فوق الراس، وبيشتغل بقوة في الجزء الأخير من البسط في الكابل.', 'The long head works hardest when stretched overhead.'],
    cues: [['الكوع ثابت جنب الراس أو الجسم.', 'Keep the elbows fixed beside the head or torso.'], ['افرد الكوع بالكامل بتحكم.', 'Extend fully, under control.']],
    err: [['فتح الكوع للجانب.', 'Elbows flaring out.'], ['تحريك الكتف بدل الكوع.', 'Moving the shoulder instead of the elbow.']]
  },
  {
    id: 'sraise', ar: 'تمارين الكتف المفردة (رفرفة)', en: 'Shoulder isolation (raises)', rx: /lateral raise|front raise|upright row|shrug|y raise|t raise|external rotation|internal rotation|rotator|scaption|cuban|side raise/i,
    mus: ['delt_l', 'delt_a', 'delt_p', 'trap_u', 'supra', 'infra'],
    joints: [['shoulder', 'إبعاد أو ثني أو دوران', 'Abduction, flexion or rotation'], ['scapula', 'دوران لفوق مع الرفع', 'Upward rotation with elevation']],
    load: ['الذراع بيكون طويل (ذراع عزم كبير) فالأوزان الخفيفة كفاية، وزيادة الوزن بتحوّل الشغل للترابيس.', 'The arm is a long lever, so light weights suffice; heavier loads shift work to the traps.'],
    cues: [['ارفع لحد مستوى الكتف تقريبًا.', 'Raise to about shoulder height.'], ['الكوع أعلى من الرسغ شوية.', 'Keep the elbow slightly above the wrist.'], ['الرقبة مرتاحة والأكتاف لتحت.', 'Neck relaxed, shoulders down.']],
    err: [['التأرجح بالجذع.', 'Using body swing.'], ['رفع الكتف للأذن.', 'Shrugging.'], ['الرفع فوق مستوى الكتف بوزن تقيل (اصطدام).', 'Lifting above shoulder height with heavy load (impingement risk).']]
  },
  {
    id: 'coreAnti', ar: 'ثبات الكور (بلانك ومقاومة)', en: 'Core stability (planks, anti-extension/rotation)', rx: /plank|rollout|ab wheel|dead bug|bird dog|pallof|hollow|stir the pot|bear crawl|farmer|suitcase|carry|walk|hold/i,
    mus: ['tva', 'rect_ab', 'obliques', 'multifidus', 'glute_max'],
    joints: [['lumbar', 'ثبات ضد البسط أو الدوران', 'Stability against extension or rotation'], ['hip', 'ثبات', 'Stability'], ['scapula', 'ثبات', 'Stability']],
    load: ['الشغل أصعب كل ما زاد ذراع العزم (مثلًا الدراع بعيد عن الجسم في الرول أوت).', 'Difficulty rises with the moment arm (e.g. arms further out in a rollout).'],
    cues: [['ضلوعك لتحت وحوضك مايل للخلف قليلًا.', 'Ribs down with a slight posterior pelvic tilt.'], ['تنفس بهدوء وانت مشدود.', 'Breathe calmly while braced.'], ['خط مستقيم من الراس للكعب.', 'Straight line from head to heels.']],
    err: [['الحوض ينزل (قوس في الضهر).', 'Hips sagging (arching the back).'], ['الحوض يرتفع زيادة.', 'Hips piking up.'], ['حبس النفس.', 'Holding the breath.']]
  },
  {
    id: 'coreFlex', ar: 'ثني الجذع (بطن)', en: 'Trunk flexion (crunch, sit-up, leg raise)', rx: /crunch|sit[- ]?up|leg raise|knee raise|v[- ]?up|toe[- ]?touch|flutter|bicycle|reverse crunch|cable crunch/i,
    mus: ['rect_ab', 'obliques', 'psoas'],
    joints: [['lumbar', 'ثني', 'Flexion'], ['thoracic', 'ثني', 'Flexion'], ['hip', 'ثني (في رفع الرجل)', 'Flexion (in leg raises)']],
    load: ['السِت أب الكامل بيشغّل ثنية الورك أكتر من البطن، والكرنش القصير بيركز على البطن.', 'Full sit-ups recruit the hip flexors more; short crunches isolate the abs.'],
    cues: [['اللف يبدأ من الصدر مش من الرقبة.', 'Curl from the chest, not the neck.'], ['الضهر السفلي ملاصق للأرض في رفع الرجل.', 'Keep the lower back flat in leg raises.']],
    err: [['شد الرقبة بالإيدين.', 'Pulling on the neck.'], ['تأرجح الرجلين بقوة بدل التحكم.', 'Swinging the legs instead of controlling them.']]
  },
  {
    id: 'rotation', ar: 'الدوران (Woodchop وروسيان)', en: 'Rotation (woodchop, Russian twist)', rx: /twist|woodchop|chop|rotational|landmine rotation|medicine ball (throw|slam)|slam/i,
    mus: ['obliques', 'multifidus', 'glute_max', 'tva'],
    joints: [['thoracic', 'دوران', 'Rotation'], ['hip', 'دوران وحمل', 'Rotation and load'], ['lumbar', 'ثبات (دوران بسيط)', 'Stability with minimal rotation']],
    load: ['القوة بتنتقل من الأرض للورك للصدر، فالحوض والصدر لازم يشتغلوا مع بعض.', 'Force flows from the ground through the hips to the trunk, so hips and chest work together.'],
    cues: [['الدوران من الصدر والحوض مش من أسفل الضهر.', 'Rotate from the thoracic spine and hips, not the lumbar spine.'], ['القدم على الأرض بتدفع.', 'Drive from the feet.']],
    err: [['لف الضهر السفلي بسرعة بحمل.', 'Fast loaded rotation through the lower back.']]
  },
  {
    id: 'legiso', ar: 'تمارين الفخذ والسمانة المفردة', en: 'Leg isolation (extension, curl, calf raise)', rx: /leg extension|leg curl|lying curl|seated curl|calf|hamstring curl|nordic|tibialis|adduction|abduction|clam|fire hydrant|donkey|glute kickback/i,
    mus: ['quads', 'hams', 'gastroc', 'soleus', 'glute_med', 'adductors'],
    joints: [['knee', 'ثني أو بسط حسب الجهاز', 'Flexion or extension by machine'], ['ankle', 'ثني أخمصي في السمانة', 'Plantarflexion in calf raises'], ['hip', 'إبعاد أو تقريب', 'Abduction or adduction']],
    load: ['في بسط الركبة بالجهاز العزم أعلى قرب الفرد الكامل، فاستخدم وزن معتدل وتحكم.', 'In machine knee extension the torque is highest near full extension, so use moderate loads and control.'],
    cues: [['مدى كامل وبطيء.', 'Full, slow range.'], ['السمانة: وقفة في الأعلى ثانية.', 'Calf raise: pause at the top.']],
    err: [['مدى جزئي.', 'Partial range.'], ['تأرجح الجسم.', 'Using momentum.']]
  },
  {
    id: 'plyo', ar: 'القفز والبلايومترك', en: 'Jumping and plyometrics', rx: /jump|\bhop|bound|plyo|depth drop|box jump|burpee|pogo|broad jump|tuck/i,
    mus: ['glute_max', 'quads', 'gastroc', 'soleus', 'hams'],
    joints: [['hip', 'بسط انفجاري', 'Explosive extension'], ['knee', 'بسط انفجاري وامتصاص عند الهبوط', 'Explosive extension, absorption on landing'], ['ankle', 'ثني أخمصي سريع', 'Fast plantarflexion']],
    load: ['الهبوط بيحمّل المفاصل بقوى أعلى من القفز نفسه (٣ ـ ٧ أضعاف وزن الجسم)، فتعلّم الهبوط الأول.', 'Landing loads the joints more than jumping (roughly 3-7 times body weight), so learn landing first.'],
    cues: [['اهبط بصوت هادي وركبة مثنية وفي اتجاه الصوابع.', 'Land softly with bent knees tracking over the toes.'], ['ذراعين بيساعدوا في القفز.', 'Use the arms to help the jump.'], ['زمن تلامس قصير في الارتداد.', 'Short ground contact in reactive jumps.']],
    err: [['الهبوط بركبة مفرودة أو منهارة لداخل.', 'Landing with straight or inward-collapsing knees.'], ['الهبوط بصوت عالي.', 'Loud, stiff landings.'], ['قفز بدون إحماء.', 'Jumping without a warm-up.']]
  },
  {
    id: 'run', ar: 'الجري والسرعة', en: 'Running and speed', rx: /\b(sprint|sprints|run|running|jog|shuttle|stride|strides|acceleration|a-?skip|high knees?|butt kicks?|fartlek|intervals?|tempo|hill|sled)\b/i,
    mus: ['glute_max', 'hams', 'quads', 'gastroc', 'soleus', 'psoas'],
    joints: [['hip', 'ثني وبسط سريع', 'Fast flexion and extension'], ['knee', 'ثني وبسط', 'Flexion and extension'], ['ankle', 'ثني أخمصي وارتداد', 'Plantarflexion and recoil']],
    load: ['في السبرنت الهامسترينج بتشتغل تمددية قوية في نهاية مرحلة التأرجح، وهي أكتر مكان لإصابة السبرنترز.', 'In sprinting the hamstrings work eccentrically late in the swing phase, the most common injury site.'],
    cues: [['ميلان بسيط للجسم كله للأمام مش من الوسط.', 'Lean the whole body slightly, not from the waist.'], ['الدفع من الأرض مش شد الرجل لقدام.', 'Push the ground away rather than reaching forward.'], ['ذراعين بزاوية ٩٠ درجة وبيتحركوا لقدام ولورا.', 'Arms at 90 degrees swinging forward and back.']],
    err: [['الخطوة الطويلة أمام الجسم (overstriding).', 'Over-striding ahead of the body.'], ['تدوير الجذع بزيادة.', 'Excess trunk rotation.'], ['الكعب هو أول ملامسة بقوة في السرعة العالية.', 'Heavy heel striking at high speed.']]
  },
  {
    id: 'oly', ar: 'الرفعات الأولمبية', en: 'Olympic lifts (clean, snatch, jerk)', rx: /clean|snatch|jerk|power clean|hang clean|high pull/i,
    mus: ['glute_max', 'quads', 'hams', 'trap_u', 'erector', 'delt_l'],
    joints: [['hip', 'بسط انفجاري', 'Explosive extension'], ['knee', 'بسط انفجاري', 'Explosive extension'], ['ankle', 'ثني أخمصي انفجاري', 'Explosive plantarflexion'], ['shoulder', 'رفع وتلقف', 'Elevation and catch']],
    load: ['القوة بتتولد من تتابع بسط الورك ثم الركبة ثم الكاحل (triple extension)، والذراع بتوجه البار بس.', 'Power comes from triple extension (hip, knee, ankle in sequence); the arms only guide the bar.'],
    cues: [['البار قريب من الجسم طول الوقت.', 'Keep the bar close to the body throughout.'], ['ابدأ بدفع الأرض وانتهي بالشراغ.', 'Start by pushing the floor, finish with the shrug.'], ['تلقف بقدمين ثابتين.', 'Receive with a stable base.']],
    err: [['تقويس الضهر في الشد الأول.', 'Rounding the back in the first pull.'], ['شد البار بالذراع بدري.', 'Pulling early with the arms.'], ['رسغ مرتخي يسبب إصابة في التلقف.', 'Weak wrist positions in the catch.']]
  },
  {
    id: 'mobility', ar: 'إطالة ومرونة', en: 'Stretching and mobility', rx: /stretch|mobility|foam|release|yoga|cat[- ]cow|child|pigeon|hip opener|thoracic|rotation drill|warm/i,
    mus: ['core_all'],
    joints: [['hip', 'مدى حركة', 'Range of motion'], ['thoracic', 'مدى حركة', 'Range of motion'], ['shoulder', 'مدى حركة', 'Range of motion']],
    load: ['الهدف شد خفيف مش وجع، والمرونة الفعالة بتجي مع قوة في آخر المدى.', 'Aim for a mild stretch, not pain; usable mobility comes with strength at end range.'],
    cues: [['تنفس عميق وبطيء.', 'Slow, deep breathing.'], ['شد ٢٠ ـ ٤٥ ثانية بدون ارتداد.', 'Hold 20-45 seconds without bouncing.']],
    err: [['الارتداد العنيف.', 'Aggressive bouncing.'], ['شد لحد الوجع.', 'Stretching into pain.']]
  }
];

/* لو معرفناش النمط من الاسم، نستنتج من العضلة الأساسية */
export const MUSCLE_JOINT = {
  chest: [['shoulder', 'تقريب أفقي', 'Horizontal adduction'], ['elbow', 'بسط', 'Extension']],
  shoulders: [['shoulder', 'ثني وإبعاد', 'Flexion and abduction'], ['scapula', 'دوران لفوق', 'Upward rotation']],
  biceps: [['elbow', 'ثني', 'Flexion'], ['forearm', 'قلب', 'Supination']],
  triceps: [['elbow', 'بسط', 'Extension']],
  forearms: [['wrist', 'ثني وبسط', 'Flexion and extension']],
  abdominals: [['lumbar', 'ثني أو ثبات', 'Flexion or stability']],
  quadriceps: [['knee', 'بسط', 'Extension'], ['hip', 'ثني (المستقيمة)', 'Flexion (rectus femoris)']],
  hamstrings: [['hip', 'بسط', 'Extension'], ['knee', 'ثني', 'Flexion']],
  glutes: [['hip', 'بسط وإبعاد ودوران خارجي', 'Extension, abduction and external rotation']],
  calves: [['ankle', 'ثني أخمصي', 'Plantarflexion']],
  lats: [['shoulder', 'بسط وتقريب', 'Extension and adduction'], ['scapula', 'خفض', 'Depression']],
  'middle back': [['scapula', 'تقريب للخلف', 'Retraction']],
  'lower back': [['lumbar', 'بسط وثبات', 'Extension and stability'], ['hip', 'بسط', 'Extension']],
  traps: [['scapula', 'رفع وتقريب', 'Elevation and retraction']],
  neck: [['cervical', 'ثني وبسط ودوران', 'Flexion, extension, rotation']],
  adductors: [['hip', 'تقريب', 'Adduction']],
  abductors: [['hip', 'إبعاد', 'Abduction']]
};

export const EQUIP_NOTE = {
  barbell: ['البار بيسمح بأعلى أحمال، ويد واحدة مش بتشتغل مستقلة فمحتاج انتباه لتوازن الجانبين.', 'A barbell allows the heaviest loads, but both sides move together so imbalances can hide.'],
  dumbbell: ['الدمبل بيخلّي كل جانب يشتغل مستقل ويكشف الفرق بين الجانبين، ويسمح بمسار حركة طبيعي أكتر.', 'Dumbbells make each side work independently, expose imbalances and allow a more natural path.'],
  cable: ['الكابل بيدي مقاومة ثابتة طول المدى، وبيسمح باتجاهات متعددة.', 'Cables give near-constant tension through the range and allow many angles.'],
  machine: ['الجهاز بيثبّت المسار فبيقلل الحاجة للتوازن، مناسب للمبتدئين وللعزل.', 'Machines fix the path, reducing the stability demand; good for beginners and isolation.'],
  'body only': ['وزن الجسم: الحمل بيتغير مع زاوية الجسم والرافعة، فتغيير الوضعية بيسهل أو بيصعب التمرين.', 'Bodyweight: load changes with body angle and leverage, so adjusting position makes it easier or harder.'],
  bands: ['الاستك بيزيد المقاومة كل ما اتمدد، فأصعب نقطة في آخر المدى.', 'Bands add resistance as they stretch, making the end range hardest.'],
  kettlebells: ['مركز الكتلة في الكيتل بيل بعيد عن اليد، فبيزود الطلب على القبضة والثبات.', 'The kettlebell’s offset centre of mass raises grip and stabiliser demand.'],
  'smith machine': ['السميث بيثبّت المسار رأسيًا، فالتحكم بالحوض والركبة بيتغير عن البار الحر.', 'The Smith machine fixes a vertical path, changing hip and knee mechanics versus a free bar.']
};

/* ---------- الجري والمشي والسبرنت ---------- */
export const GAIT = [
  {
    id: 'gait', ar: 'دورة المشي والجري', en: 'The gait cycle',
    body: [
      ['دورة الخطوة بتتقسم لمرحلتين: الارتكاز (القدم على الأرض، حوالي ٦٠٪ في المشي وأقل في الجري) والتأرجح (القدم في الهواء).', 'The gait cycle has a stance phase (foot on the ground, about 60% of walking and less in running) and a swing phase (foot in the air).'],
      ['مراحل الارتكاز: ملامسة الأرض، الاستجابة للحمل (امتصاص الصدمة)، منتصف الارتكاز، ثم الدفع (toe-off).', 'Stance phases: initial contact, loading response (shock absorption), mid-stance, then push-off.'],
      ['مراحل التأرجح: أوائل التأرجح، منتصفه، ثم أواخره، وفيها الهامسترينج بتكبح الساق قبل الملامسة (شغل تمددي).', 'Swing phases: initial, mid and terminal swing, when the hamstrings brake the leg eccentrically before contact.'],
      ['في الجري مفيش مرحلة "الدعم المزدوج" ويظهر زمن طيران، وبيتضاعف الحمل على المفاصل.', 'Running has no double-support period and adds a flight phase, which multiplies joint loading.']
    ]
  },
  {
    id: 'sprint', ar: 'مراحل السبرنت (مهم للـ٤٠٠ متر)', en: 'Sprint phases (400 m relevant)', hot: true,
    body: [
      ['البداية والانطلاق: دفع قوي من الأرض بزاوية جسم منخفضة، وزمن تلامس طويل نسبيًا لتوليد قوة أفقية.', 'Start and drive: powerful pushes with a low body angle and relatively long ground contacts to produce horizontal force.'],
      ['التسارع: الجذع بيرتفع تدريجيًا خلال ٣٠ ـ ٤٠ متر، وطول الخطوة بيزيد وتردد الخطوة بيتحسن.', 'Acceleration: the trunk rises gradually over 30-40 m while stride length grows.'],
      ['أقصى سرعة: جذع مستقيم تقريبًا وزمن تلامس قصير جدًا (حوالي ٠٫٠٨ ـ ٠٫١٢ ثانية)، والدفع تحت مركز الجسم.', 'Maximum velocity: near-upright trunk and very short contacts (about 0.08-0.12 s), pushing beneath the centre of mass.'],
      ['تحمّل السرعة (ثلث الـ٤٠٠م الأخير): الإجهاد بيقلل تردد الخطوة وبيزيد زمن التلامس، وهنا بتظهر أخطاء الفورم والإصابات.', 'Speed endurance (last third of a 400 m): fatigue lowers stride rate and lengthens contacts, where form breaks down and injuries appear.'],
      ['خطوة الـ٤٠٠م مطلوب فيها اقتصاد في الطاقة: استرخاء الوش والكتف والإيد، ومحافظة على الجذع مرتفع في المنحنى.', 'In a 400 m, economy matters: relax face, shoulders and hands, and keep the torso tall through the bend.']
    ]
  },
  {
    id: 'curve', ar: 'الجري في المنحنى', en: 'Running the bend', hot: true,
    body: [
      ['في المنحنى الجسم بيميل للداخل وبيحصل عزم جانبي على الركبة والكاحل، والرجل الشمال (اليسرى) بتعاني من ضغط زيادة.', 'On the bend the body leans inward, loading the knee and ankle laterally, with extra stress on the left leg.'],
      ['اذرع الداخلية بتتحرك أقل، والخارجية أكتر لتوازن الجسم.', 'The inside arm moves less and the outside arm more to balance the body.'],
      ['تقوية الإليوية الوسطى وثبات الكاحل بيقلل خطر الإصابة هنا.', 'Gluteus medius strength and ankle stability reduce injury risk here.']
    ]
  },
  {
    id: 'faults', ar: 'أخطاء الجري الشائعة وإيه سببها', en: 'Common running faults and causes',
    body: [
      ['الخطوة الزايدة (overstriding): الملامسة قدام الجسم بتفرمل وبتحمل الركبة. السبب: عدد خطوات قليل أو ضعف الإليوية.', 'Over-striding: contact ahead of the body brakes and loads the knee; cause: low cadence or weak glutes.'],
      ['هبوط الحوض: ضعف الإليوية الوسطى.', 'Pelvic drop: weak gluteus medius.'],
      ['ميل الجذع للأمام من الوسط: ضعف الكور أو تعب.', 'Bending forward at the waist: weak core or fatigue.'],
      ['تدوير الذراع عرضيًا: توتر الكتف وضعف في الكور.', 'Arms crossing the body: shoulder tension and weak core.'],
      ['انهيار الركبة لداخل والقدم تنقلب: ضعف في الورك والقوس.', 'Knee collapse and foot roll-in: weak hips and arch.']
    ]
  },
  {
    id: 'walk', ar: 'المشي الصحي', en: 'Healthy walking', body: [
      ['الكعب بيلمس الأرض أولًا ثم القدم تتدحرج للأمام وتدفع بالصوابع.', 'The heel lands first, then the foot rolls forward and pushes off through the toes.'],
      ['الذراعين بيتأرجحوا عكس الرجلين (دوران الجذع الطبيعي).', 'The arms swing opposite to the legs (natural trunk rotation).'],
      ['مشي متكرر على أرض صلبة بدون مرونة في الكاحل ممكن يسبب ألم القدم والركبة.', 'Frequent walking on hard surfaces with stiff ankles may cause foot and knee pain.']
    ]
  }
];

/* ---------- الوضعية والجسم ---------- */
export const POSTURE = [
  { id: 'neutral', ar: 'الوضعية المحايدة', en: 'Neutral posture', desc: ['خط وهمي بيمر من الودن للكتف للورك للركبة للكاحل. الضهر بيحافظ على انحناءاته الطبيعية (٣ منحنيات).', 'An imaginary line passes through the ear, shoulder, hip, knee and ankle, preserving the spine’s three natural curves.'], tight: [], weak: [], fix: [['حرّك كل ساعة، مش بس تصحيح وضعية ثابتة.', 'Move every hour; no single posture is perfect for long.']] },
  { id: 'fwdhead', ar: 'الراس للأمام (Forward head)', en: 'Forward head posture', desc: ['الراس بيتقدّم عن الكتف، وبيزيد الحمل على الرقبة العلوية.', 'The head sits ahead of the shoulders, increasing load on the upper neck.'], tight: ['trap_u', 'lev_scap', 'neck_ext'], weak: ['neck_flex'], fix: [['تمرين ثني الرقبة العميقة (chin tuck)، وتقوية الضهر العلوي.', 'Chin tucks and upper-back strengthening.']] },
  { id: 'rounded', ar: 'الكتف المدور (Upper crossed)', en: 'Rounded shoulders (upper crossed)', desc: ['الكتفين بيتقدموا والضهر العلوي بيتحدّب بسبب شد الصدر وضعف الضهر العلوي.', 'Shoulders drift forward and the upper back rounds because of tight chest and weak upper-back muscles.'], tight: ['pec_min', 'pec_maj', 'trap_u'], weak: ['rhomb', 'trap_l', 'serratus', 'neck_flex'], fix: [['تمارين سحب (rows وface pull)، إطالة الصدر، وحركة الصدر العلوي.', 'Rows, face pulls, chest stretching and thoracic mobility.']] },
  { id: 'apt', ar: 'ميلان الحوض للأمام (Lower crossed)', en: 'Anterior pelvic tilt (lower crossed)', desc: ['الحوض بيميل للأمام وبيتقوس أسفل الضهر، شائع مع الجلوس الطويل.', 'The pelvis tips forward and the lower back arches, common with long sitting.'], tight: ['psoas', 'rect_fem', 'erector'], weak: ['glute_max', 'rect_ab', 'hams'], fix: [['إطالة ثنية الورك، وتقوية الإليوية والبطن (hip thrust، dead bug).', 'Hip flexor stretches and glute/abs strengthening (hip thrusts, dead bugs).']] },
  { id: 'valgus', ar: 'الركبة للداخل (Knee valgus)', en: 'Knee valgus', desc: ['الركبة بتنحني ناحية الداخل وقت الحركة، عامل خطر للصليبي والركبة الرضفية.', 'The knee collapses inward during motion, a risk factor for ACL and patellofemoral injury.'], tight: ['adductors', 'tfl'], weak: ['glute_med', 'glute_max', 'tib_post'], fix: [['تقوية الإليوية الوسطى (clam، monster walk)، وتدريب الهبوط.', 'Strengthen gluteus medius (clams, monster walks) and train landing.']] },
  { id: 'flatfoot', ar: 'القدم المسطحة / الانقلاب لداخل', en: 'Flat foot / over-pronation', desc: ['القوس الطولي بينخفض زيادة وقت الحمل.', 'The arch lowers excessively under load.'], tight: ['gastroc', 'soleus'], weak: ['tib_post', 'foot_int'], fix: [['تمرين short foot، وتقوية السمانة والظنبوبية الخلفية.', 'Short-foot exercise and calf/tibialis posterior strengthening.']] },
  { id: 'scoliosis', ar: 'الجنف (انحراف العمود الفقري)', en: 'Scoliosis', desc: ['انحناء جانبي في العمود الفقري. لازم فحص طبي، وماينفعش علاج ذاتي.', 'A lateral curvature of the spine; needs medical assessment and should not be self-treated.'], tight: [], weak: [], fix: [['حوّل للطبيب أو أخصائي علاج طبيعي.', 'Refer to a doctor or physiotherapist.']] }
];

/* ---------- آليات الإصابة ---------- */
export const INJURIES = [
  { id: 'hamstring', area: 'hamstring', ar: 'شد الهامسترينج', en: 'Hamstring strain', mech: ['شغل تمددي قوي في أواخر التأرجح أثناء السبرنت، أو مط سريع للرجل.', 'Strong eccentric work in late swing during sprinting, or a fast stretch of the leg.'], risk: ['إحماء ناقص، تعب، إصابة سابقة، ضعف نوردك.', 'Poor warm-up, fatigue, previous strain, weak eccentric hamstring strength.'], prevent: ['تمارين نوردك والRDL، إحماء سرعة تدريجي، وزيادة حجم السبرنت تدريجيًا.', 'Nordic curls and RDLs, a gradual speed warm-up and progressive sprint volume.'] },
  { id: 'acl', area: 'knee', ar: 'قطع الرباط الصليبي', en: 'ACL injury', mech: ['هبوط أو تغيير اتجاه بركبة شبه مفرودة ومنهارة لداخل.', 'Landing or cutting with a nearly straight, inward-collapsing knee.'], risk: ['ضعف الهامسترينج والإليوية، نمط هبوط مرتفع، تعب.', 'Weak hamstrings/glutes, stiff landing patterns, fatigue.'], prevent: ['برامج وقاية عصبية عضلية (FIFA 11+)، تدريب الهبوط، تقوية الورك.', 'Neuromuscular prevention programmes (e.g. FIFA 11+), landing training, hip strength.'] },
  { id: 'pfps', area: 'knee', ar: 'ألم الركبة الأمامي', en: 'Patellofemoral pain', mech: ['حمل متكرر على الرضفة مع انهيار الركبة وضعف الإليوية.', 'Repeated patellar load with knee valgus and weak glutes.'], risk: ['زيادة مفاجئة في الجري أو السكوات.', 'Sudden increases in running or squatting.'], prevent: ['تقوية الورك والفخذ، وتدرج في الحمل.', 'Hip/quad strengthening and gradual load progression.'] },
  { id: 'achilles', area: 'ankle', ar: 'وتر أخيل', en: 'Achilles tendinopathy', mech: ['حمل متكرر على الوتر مع قفز وجري.', 'Repetitive tendon loading with running and jumping.'], risk: ['قفزة سريعة في الحجم، سمانة ضعيفة.', 'Rapid volume jumps and weak calves.'], prevent: ['رفع السمانة التمددي والبطيء، وزيادة تدريجية.', 'Slow/eccentric calf raises and gradual progression.'] },
  { id: 'ankle', area: 'ankle', ar: 'التواء الكاحل', en: 'Ankle sprain', mech: ['انقلاب القدم لداخل أثناء الهبوط أو تغيير الاتجاه.', 'Foot rolling inward on landing or cutting.'], risk: ['التواء سابق وضعف توازن.', 'Previous sprain and poor balance.'], prevent: ['تدريب التوازن على رجل واحدة، وتقوية الشظوية.', 'Single-leg balance training and peroneal strengthening.'] },
  { id: 'shinsplints', area: 'foot', ar: 'التهاب سمحاق الساق', en: 'Shin splints', mech: ['حمل متكرر على عظمة الساق والعضلات حواليها.', 'Repetitive stress on the tibia and surrounding muscles.'], risk: ['زيادة سريعة في الجري على أرض صلبة، أحذية متهالكة.', 'Fast increases in running on hard surfaces; worn shoes.'], prevent: ['تدرج، تقوية السمانة والقدم، وتنويع الأرض.', 'Gradual progression, calf/foot strengthening and varied surfaces.'] },
  { id: 'lbp', area: 'low_back', ar: 'ألم أسفل الضهر', en: 'Low back pain', mech: ['ثني متكرر تحت حمل أو جلوس طويل مع ضعف كور.', 'Repeated loaded flexion or long sitting with weak core.'], risk: ['ضعف الإليوية، تيبس الورك، رفع بضهر مقوّس.', 'Weak glutes, stiff hips, lifting with a rounded back.'], prevent: ['تقوية الكور والإليوية، تعلم نمط الhinge، وحركة منتظمة.', 'Core/glute strength, learning the hinge pattern and regular movement.'] },
  { id: 'impingement', area: 'shoulder', ar: 'اصطدام الكتف', en: 'Shoulder impingement', mech: ['ضغط الأوتار تحت قمة الكتف وقت الرفع.', 'Tendons pinched under the acromion during elevation.'], risk: ['ضعف اللوح وكفة الدوارين، وضعية الكتف المدور.', 'Weak scapular and cuff muscles, rounded-shoulder posture.'], prevent: ['تقوية كفة الدوارين، تمارين سحب، وتجنب الرفع فوق الراس بحمل تقيل.', 'Rotator cuff work, pulling exercises and avoiding heavy overhead loading.'] },
  { id: 'elbow', area: 'elbow', ar: 'كوع التنس/الجولف', en: 'Tennis / golfer’s elbow', mech: ['تحميل متكرر لأوتار الساعد.', 'Repetitive forearm tendon loading.'], risk: ['قبضة قوية ومتكررة، تكنيك رديء.', 'Heavy repetitive gripping, poor technique.'], prevent: ['تقوية الساعد التمددية وتنويع القبضة.', 'Eccentric forearm strengthening and varied grips.'] },
  { id: 'hipfai', area: 'hip', ar: 'ألم الأربية والورك', en: 'Hip / groin pain', mech: ['ثني عميق للورك أو حركة جانبية سريعة.', 'Deep hip flexion or fast lateral movement.'], risk: ['ضعف المقرّبات، تيبس.', 'Weak adductors and stiffness.'], prevent: ['تقوية المقرّبات (Copenhagen) ومرونة الورك.', 'Adductor strengthening (Copenhagen plank) and hip mobility.'] },
  { id: 'plantar', area: 'foot', ar: 'التهاب اللفافة الأخمصية', en: 'Plantar fasciitis', mech: ['حمل زايد على قوس القدم.', 'Excess loading of the foot arch.'], risk: ['سمانة مشدودة، وزن زايد، حذاء غير مناسب.', 'Tight calves, increased weight, unsuitable shoes.'], prevent: ['إطالة السمانة، تقوية القدم، وتدرج في الجري.', 'Calf stretching, foot strengthening and gradual running load.'] },
  { id: 'neck', area: 'neck', ar: 'شد الرقبة', en: 'Neck strain', mech: ['وضعية ثابتة والراس لقدام مع ضغط شاشة.', 'Sustained forward-head posture at screens.'], risk: ['ضعف قابضات الرقبة العميقة.', 'Weak deep neck flexors.'], prevent: ['chin tucks، وفواصل حركة كل ٤٥ دقيقة.', 'Chin tucks and movement breaks every 45 minutes.'] }
];

/* ---------- مبادئ الميكانيكا ---------- */
export const PRINCIPLES = [
  { id: 'lever', ar: 'الرافعة وذراع العزم', en: 'Levers and moment arm', body: [['العزم = القوة × المسافة العمودية عن المفصل. كل ما بعد الوزن عن المفصل، زاد الحمل عليه. مثال: رفرفة جانبية بذراع ممدودة أصعب بكتير من ذراع مثني بنفس الوزن.', 'Torque = force × perpendicular distance from the joint. The farther the weight is from the joint, the greater the load. A straight-arm lateral raise is much harder than a bent-arm one with the same weight.'], ['في الديدلفت: البار القريب من الجسم يقلل ذراع العزم على الضهر.', 'In the deadlift, a bar close to the body shortens the moment arm on the back.']] },
  { id: 'chain', ar: 'السلسلة الحركية', en: 'The kinetic chain', body: [['الجسم بيشتغل كسلسلة: القوة بتنتقل من الأرض للقدم للركبة للورك للجذع للدراع. أي حلقة ضعيفة أو متيبسة بتأثر على اللي بعدها.', 'The body works as a chain: force travels from the ground through foot, knee, hip, trunk to the arm. A weak or stiff link affects the next.']] },
  { id: 'jbj', ar: 'مفصل بمفصل: ثبات ولا مرونة؟', en: 'Joint by joint: stability or mobility?', body: [['كل مفصل ليه وظيفة رئيسية: القدم (ثبات)، الكاحل (مرونة)، الركبة (ثبات)، الورك (مرونة)، أسفل الضهر (ثبات)، منتصف الضهر (مرونة)، اللوح (ثبات)، الكتف (مرونة). لما مفصل يفقد وظيفته، المفصل اللي جنبه بيعوّض ويتضرر.', 'Each joint has a main role: foot (stability), ankle (mobility), knee (stability), hip (mobility), lumbar (stability), thoracic (mobility), scapula (stability), shoulder (mobility). When one loses its role, the neighbour compensates and gets overloaded.']] },
  { id: 'ssc', ar: 'دورة الشد والانقباض (SSC)', en: 'Stretch-shortening cycle', body: [['العضلة لما تتمدد بسرعة قبل ما تنقبض بتخزن طاقة مرنة وبتديك قوة أكبر (زي النزول قبل القفزة). ده أساس البلايومترك.', 'A muscle stretched quickly before it contracts stores elastic energy and produces more force (the dip before a jump). This is the basis of plyometrics.']] },
  { id: 'fv', ar: 'علاقة القوة بالسرعة', en: 'Force-velocity relationship', body: [['كل ما الحمل زاد، السرعة قلت، والعكس. عشان كده التدريب للسرعة بيستخدم أوزان خفيفة وحركة سريعة، والتدريب للقوة بيستخدم أوزان تقيلة.', 'The heavier the load, the slower the movement. Speed training uses light loads at high speed; strength training uses heavy loads.']] },
  { id: 'eccon', ar: 'أنواع الانقباض', en: 'Contraction types', body: [['متحدّ (concentric): العضلة بتقصر. تمددي (eccentric): العضلة بتطول وهي بتتحكم (النزول). ثابت (isometric): بدون حركة.', 'Concentric: the muscle shortens. Eccentric: it lengthens under control (the lowering phase). Isometric: no movement.'], ['الانقباض التمددي بيتحمل أكبر قوة، وأكتر سبب لوجع العضلات المتأخر وإصابات الشد، وأهم لوقاية الأوتار.', 'Eccentric contractions handle the highest forces, cause most muscle soreness and strains, and are valuable for tendon protection.']] },
  { id: 'stab', ar: 'الثبات والتنفس (Bracing)', en: 'Stability and bracing', body: [['شد البطن في كل الاتجاهات مع نفس عميق قبل الحمل بيزود ضغط البطن الداخلي وبيثبّت العمود الفقري. مش بس "شد الكرش لجوه".', 'Bracing the abdomen in all directions with a deep breath before loading raises intra-abdominal pressure and stabilises the spine, not just “pulling the belly in”.']] },
  { id: 'rom', ar: 'المدى الكامل ولا الجزئي؟', en: 'Full vs partial range of motion', body: [['المدى الكامل بتحكم بيحسّن المرونة والقوة في كل الزوايا وبيعتبر الأفضل في الغالب، لكن لو المدى بيسبب وجع أو انهيار فورم، قلّله مؤقتًا وارجع تزوده مع الوقت.', 'Controlled full range generally builds strength and mobility across angles. If it causes pain or breakdown in form, reduce it temporarily and rebuild.']] }
];

/* ---------- أدوات ---------- */
const NORM = (s) => String(s || '').toLowerCase()
  .replace(/[ً-ٰٟ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي');
export const norm = NORM;
export const jointById = (id) => JOINTS.find((j) => j.id === id);
export const patternById = (id) => PATTERNS.find((p) => p.id === id);

const ORDER = ['oly', 'plyo', 'run', 'hinge', 'squat', 'lunge', 'sraise', 'vpull', 'hpull', 'vpush', 'hpush', 'legiso', 'curl', 'triext', 'coreFlex', 'coreAnti', 'rotation'];
/* يختار نمط الحركة لتمرين من المكتبة */
export function derive(ex) {
  const nameEn = String((ex.name && ex.name.en) || ex.name || '');
  const nameAr = String((ex.name && ex.name.ar) || '');
  const cat = String(ex.category || '').toLowerCase();
  let pat = null;
  if (cat === 'stretching' || cat === 'mobility') pat = patternById('mobility');
  if (!pat) { for (let i = 0; i < ORDER.length; i++) { const p = patternById(ORDER[i]); if (p && p.rx.test(nameEn)) { pat = p; break; } } }
  if (!pat && cat === 'plyometrics') pat = patternById('plyo');
  if (!pat && (cat === 'speed' || cat === 'cardio')) pat = patternById('run');
  const pm = (ex.primaryMuscles || []).map((m) => String(m).toLowerCase());
  let joints = pat ? pat.joints : [];
  if (!pat) {
    const seen = {}; joints = [];
    pm.forEach((m) => (MUSCLE_JOINT[m] || []).forEach((j) => { if (!seen[j[0]]) { seen[j[0]] = 1; joints.push(j); } }));
  }
  const eq = String(ex.equipment || '').toLowerCase();
  return { pat: pat, joints: joints, equip: EQUIP_NOTE[eq] || null, pm: pm, nameAr: nameAr };
}

/* فهرس للبحث الشامل: [{t: النوع, id, ar, en, kw, sub?}] */
export function bioIndex() {
  const out = [];
  JOINTS.forEach((j) => {
    out.push({ t: 'joint', id: j.id, ar: j.ar, en: j.en, kw: j.mv.map((m) => m[1] + ' ' + m[2]).join(' ') });
    j.mv.forEach((m) => out.push({ t: 'move', id: j.id, mv: m[0], ar: m[1] + ' · ' + j.ar, en: m[2] + ' · ' + j.en, kw: m[5].map((k) => MU[k] ? MU[k][0] + ' ' + MU[k][1] : '').join(' ') }));
  });
  Object.keys(MU).forEach((k) => out.push({ t: 'muscle', id: k, ar: MU[k][0], en: MU[k][1], kw: '' }));
  PATTERNS.forEach((p) => out.push({ t: 'pattern', id: p.id, ar: p.ar, en: p.en, kw: '' }));
  GAIT.forEach((g) => out.push({ t: 'gait', id: g.id, ar: g.ar, en: g.en, kw: 'جري سبرنت مشي running sprint walk' }));
  POSTURE.forEach((p) => out.push({ t: 'posture', id: p.id, ar: p.ar, en: p.en, kw: 'وضعية posture' }));
  INJURIES.forEach((i) => out.push({ t: 'injury', id: i.id, ar: i.ar, en: i.en, kw: 'اصابه injury' }));
  PRINCIPLES.forEach((p) => out.push({ t: 'principle', id: p.id, ar: p.ar, en: p.en, kw: 'مبادئ ميكانيكا principles' }));
  return out;
}
