/*
 * ADAM — بيوميكانيك العضلات (مكمّل لـ library/biomech.js)
 * كل عضلة: m = نمط اسمها الإنجليزي في شاشة التشريح (زي MINFO هناك)،
 * joints = المفاصل اللي بتعدّي عليها، two = عضلة مفصلين ولا لأ،
 * act = شغلها في التمرين، plane = المستوى، long = إمتى بتبقى مشدودة على الآخر،
 * bias = إزاي تركّز عليها، exL = تمارين بتحمّلها وهي مشدودة، exS = وهي مقبوضة،
 * topic = صفحة الحركة المرتبطة في مكتبة البيوميكانيك.
 * كل نص [عربي, إنجليزي].
 */
export const BIOMECH_MUSCLES = [
  /* ---------------- الصدر والكتف ---------------- */
  {
    id: 'pec_major', m: 'pectoralis major|part of pectoralis', g: 'upper', joints: ['shoulder'], two: false, topic: 'hpush',
    t: ['الصدر (البكتورال الكبيرة)', 'Pectoralis major'],
    act: ['بتقرّب الدراع للصدر، وبتلفه للداخل. الجزء العلوي بيرفع الدراع لقدام، والجزء السفلي بينزّله من فوق لتحت.', 'Brings the arm across the chest and rotates it inward. The upper part lifts the arm forward; the lower part pulls it down from overhead.'],
    plane: ['مستوى اللف (التقريب الأفقي) والمستوى الأمامي الخلفي.', 'Transverse plane (horizontal adduction) and sagittal plane.'],
    long: ['لما الدراع مفتوح لجنب ونازل ورا مستوى الجسم: تحت في الفلاي أو البنش.', 'With the arm out to the side and behind the body: the bottom of a fly or bench press.'],
    bias: [
      ['بنش مايل ٣٠–٤٥ درجة بيزوّد شغل الجزء العلوي (الترقوي).', 'A 30–45 degree incline increases work for the upper (clavicular) part.'],
      ['الديبس والبنش المقلوب بيركّزوا على الجزء السفلي.', 'Dips and decline pressing emphasise the lower part.'],
      ['خد المدى كامل تحت بتحكّم، ده أكتر جزء بيبني العضلة.', 'Use the full range at the bottom with control; that stretched position builds the muscle well.']
    ],
    exL: ['ex_dumbbell_flyes', 'ex_barbell_bench_press', 'ex_pushup'], exS: ['ex_cable_crossover', 'ek_butterfly_machine']
  },
  {
    id: 'serratus', m: 'serratus anterior', g: 'upper', joints: ['shoulder'], two: false, topic: 'vpush',
    t: ['السيراتس (المنشارية الأمامية)', 'Serratus anterior'],
    act: ['بتزق لوح الكتف لقدام حوالين الضلوع وبتلفه لفوق وانت رافع دراعك. بتمنع لوح الكتف إنه يبرز لورا.', 'Pushes the shoulder blade forward around the ribs and rotates it upward as you raise your arm. Keeps the shoulder blade from winging.'],
    plane: ['حركة لوح الكتف على القفص الصدري.', 'Shoulder blade movement on the rib cage.'],
    long: ['لما لوح الكتف راجع لورا ومضموم.', 'When the shoulder blade is pulled back and squeezed.'],
    bias: [
      ['في الضغط كمّل الحركة بزقة زيادة في الآخر (Push-up plus).', 'Finish a push-up with an extra push at the top (push-up plus).'],
      ['في الضغط فوق الراس خلّي لوح الكتف يلف لفوق مع الدراع، ماتثبتهوش.', 'In overhead pressing, let the shoulder blade rotate up with the arm; do not pin it.']
    ],
    exL: ['ad_serratus_wall_slide'], exS: ['wg_scapular_push_up', 'ad_supine_serratus_punch']
  },
  {
    id: 'deltoid', m: 'deltoid', g: 'upper', joints: ['shoulder'], two: false, topic: 'vpush',
    t: ['الكتف (الدالية)', 'Deltoid'],
    act: ['تلات أجزاء: الأمامي بيرفع الدراع لقدام، الجانبي بيرفعه لجنب، والخلفي بيرجّعه لورا.', 'Three parts: the front lifts the arm forward, the side lifts it out to the side, and the rear pulls it back.'],
    plane: ['التلات مستويات حسب الجزء.', 'All three planes, depending on the part.'],
    long: ['الجانبي: الدراع نازل قدام الجسم أو وراه. الخلفي: الدراع معدّي الصدر. الأمامي: الدراع ورا الجسم.', 'Side part: arm down across or behind the body. Rear: arm across the chest. Front: arm behind the body.'],
    bias: [
      ['الرفرفة الجانبية أريح للكتف لما الدراع قدام الجسم بحوالي ٣٠ درجة (مستوى لوح الكتف).', 'Lateral raises are friendlier to the shoulder with the arm about 30 degrees in front of the body (scapular plane).'],
      ['الدمبل في الرفرفة بيبقى أخف تحت وأتقل فوق. الكابل بيدّي شد من أول الحركة.', 'With a dumbbell the raise is easy at the bottom and hard at the top. A cable keeps tension from the start.'],
      ['الجزء الأمامي بيشتغل كتير في البنش والضغط، فغالبًا محتاج شغل زيادة أقل من الجانبي والخلفي.', 'The front part already works hard in pressing, so it usually needs less extra work than the side and rear parts.']
    ],
    exL: ['wg_cable_lateral_raise'], exS: ['ex_lateral_raise', 'ex_rear_delt_fly', 'ex_face_pull', 'wg_overhead_press']
  },
  {
    id: 'rotator_cuff', m: 'supraspinatus|infraspinatus|teres minor|subscapularis', g: 'upper', joints: ['shoulder'], two: false, topic: 'throw',
    t: ['عضلات الكفّة المدورة', 'Rotator cuff'],
    act: ['أربع عضلات صغيرة بتثبّت راس عضمة الدراع في نص المفصل. فوق الشوكة بتبدأ رفع الدراع، تحت الشوكة والمدورة الصغيرة بيلفوا الدراع لبرّه، وتحت لوح الكتف بتلفه لجوه.', 'Four small muscles that keep the head of the upper-arm bone centred in the joint. Supraspinatus starts lifting the arm, infraspinatus and teres minor rotate it outward, and subscapularis rotates it inward.'],
    plane: ['مستوى اللف أساسًا (لف الدراع لبرّه ولجوه).', 'Mainly the transverse plane (outward and inward rotation).'],
    long: ['اللف لبرّه بيتمطّ لما الدراع يلف لجوه، والعكس.', 'The outward rotators stretch when the arm rotates inward, and vice versa.'],
    bias: [
      ['أوزان خفيفة وعدات أكتر وحركة بطيئة متحكم فيها.', 'Light loads, higher reps and slow, controlled movement.'],
      ['مهمة جدًا للي بيرمي أو بيلعب رياضات فوق الراس، لأنها بتفرمل الدراع في آخر الرمية.', 'Very important for throwing and overhead sports, because they brake the arm at the end of the throw.']
    ],
    exL: [], exS: ['ex_band_external_rotation', 'ad_side_lying_external_rotation', 'ek_internal_cable_rotation']
  },
  {
    id: 'lats', m: 'latissimus|teres major', g: 'upper', joints: ['shoulder', 'back'], two: false, topic: 'vpull',
    t: ['اللاتس (الظهرية العريضة)', 'Latissimus dorsi'],
    act: ['بتنزّل الدراع من فوق لتحت ولجنب الجسم، وبترجّعه لورا، وبتلفه لجوه. ومتوصلة بلفافة الضهر فبتساعد في ثبات الجذع.', 'Pulls the arm down from overhead and to the side, draws it back, and rotates it inward. Connected to the back fascia, it also helps stabilise the trunk.'],
    plane: ['المستوى الأمامي الخلفي والجانبي.', 'Sagittal and frontal planes.'],
    long: ['لما الدراع مرفوع فوق الراس على الآخر، زي أول العقلة أو البول أوفر.', 'With the arm fully overhead, as at the start of a pull-up or a pullover.'],
    bias: [
      ['فكّر إنك بتنزّل الكوع ناحية وسطك، مش بتسحب بإيدك.', 'Think of driving the elbow towards your hip rather than pulling with your hand.'],
      ['السحب بدراع مفرود (Straight-arm pulldown) بيشغّلها من غير البايسبس.', 'A straight-arm pulldown works it without the biceps.'],
      ['خد المدى كامل فوق في العقلة واللات.', 'Use the full stretch at the top of pull-ups and pulldowns.']
    ],
    exL: ['ex_pullup', 'ex_lat_pulldown', 'ek_dumbbell_bent_arm_pullover'], exS: ['ex_one_arm_dumbbell_row', 'ek_straight_arm_push_down']
  },
  {
    id: 'trapezius', m: 'trapezius', g: 'upper', joints: ['shoulder', 'back'], two: false, topic: 'hpull',
    t: ['الترابيس (شبه المنحرفة)', 'Trapezius'],
    act: ['الجزء العلوي بيرفع الكتف لفوق، الأوسط بيضم لوح الكتف لورا، والسفلي بينزّله لتحت. التلاتة مع بعض بيلفّوا لوح الكتف لفوق وانت رافع دراعك.', 'The upper part lifts the shoulder, the middle squeezes the shoulder blades back, and the lower part pulls them down. Together they rotate the shoulder blade upward as you raise your arm.'],
    plane: ['حركة لوح الكتف في كل الاتجاهات.', 'Shoulder blade movement in every direction.'],
    long: ['العلوي: الكتف نازل والراس مايلة للناحية التانية. الأوسط: لوح الكتف لقدام.', 'Upper part: shoulder down and head tilted away. Middle part: shoulder blade forward.'],
    bias: [
      ['الشراجز للجزء العلوي. الرو بكوع مفتوح والـ Face pull للأوسط. الرفع على شكل Y وانت نايم على بطنك للسفلي.', 'Shrugs for the upper part. Wide-elbow rows and face pulls for the middle. Prone Y raises for the lower part.'],
      ['ناس كتير محتاجة السفلي والأوسط أكتر من العلوي لوضع الكتف.', 'Many people need more lower and middle trapezius work than upper for shoulder posture.']
    ],
    exL: ['wg_chest_supported_row'], exS: ['ex_shrugs', 'ex_face_pull', 'ex_band_pull_apart']
  },
  {
    id: 'rhomboid', m: 'rhomboid', g: 'upper', joints: ['shoulder'], two: false, topic: 'hpull',
    t: ['الرومبويد (المعينية)', 'Rhomboids'],
    act: ['بتضم لوح الكتف ناحية العمود الفقري وبتلفه لتحت.', 'Pulls the shoulder blade towards the spine and rotates it downward.'],
    plane: ['حركة لوح الكتف لورا ولقدام.', 'Shoulder blade movement back and forward.'],
    long: ['لما لوح الكتف يتزق لقدام، زي آخر الضغط أو أول الرو.', 'When the shoulder blade moves forward, as at the top of a push-up or the start of a row.'],
    bias: [['ابدأ أي رو بضم لوح الكتف قبل ما الكوع يتثني.', 'Start every row by squeezing the shoulder blade before the elbow bends.']],
    exL: ['wg_chest_supported_row'], exS: ['ex_seated_cable_row', 'ex_band_pull_apart']
  },

  /* ---------------- الدراع ---------------- */
  {
    id: 'biceps', m: 'biceps brachii', g: 'arm', joints: ['shoulder', 'elbow'], two: true, topic: 'vpull',
    t: ['البايسبس (ذات الرأسين العضدية)', 'Biceps brachii'],
    act: ['بتثني الكوع، وبتلف الكف لفوق (Supination)، وبتساعد في رفع الدراع لقدام. عضلة مفصلين: الكتف والكوع.', 'Bends the elbow, turns the palm up (supination), and helps lift the arm forward. A two-joint muscle: shoulder and elbow.'],
    plane: ['المستوى الأمامي الخلفي.', 'Sagittal plane.'],
    long: ['لما الكوع مفرود والدراع ورا الجسم، زي البايسبس على بنش مايل.', 'With the elbow straight and the arm behind the body, as in an incline curl.'],
    bias: [
      ['الكف لفوق بيشغّل البايسبس أكتر. الكف ناحية الجسم (هامر) بيحوّل الشغل للبراكياليس والساعد.', 'Palms up works the biceps most. Palms facing in (hammer) shifts work to the brachialis and forearm.'],
      ['الدراع ورا الجسم بيمطّ الراس الطويلة. الدراع قدام الجسم بيقصّرها.', 'Arm behind the body stretches the long head; arm in front of the body shortens it.']
    ],
    exL: ['ek_incline_biceps_curl_with_dumbbell'], exS: ['ex_concentration_curl', 'ex_preacher_curl']
  },
  {
    id: 'brachialis', m: '^brachialis|brachioradialis', g: 'arm', joints: ['elbow'], two: false, topic: 'vpull',
    t: ['البراكياليس والساعد العضدي', 'Brachialis and brachioradialis'],
    act: ['البراكياليس بيثني الكوع في أي وضع للكف. البراكيوراديالس أقوى لما الكف ناحية الجسم.', 'The brachialis bends the elbow whatever the forearm position. The brachioradialis is strongest with the palm facing in.'],
    plane: ['المستوى الأمامي الخلفي.', 'Sagittal plane.'],
    long: ['لما الكوع مفرود على الآخر.', 'With the elbow fully straight.'],
    bias: [['الهامر والمسكة المقلوبة (الكف لتحت) بيقللوا شغل البايسبس ويزوّدوا شغلهم.', 'Hammer and reverse-grip (palm down) curls reduce biceps work and increase theirs.']],
    exL: [], exS: ['ex_hammer_curl', 'ek_hammer_curls_with_rope_and_cable']
  },
  {
    id: 'triceps', m: 'triceps brachii|anconeus', g: 'arm', joints: ['shoulder', 'elbow'], two: true, topic: 'hpush',
    t: ['الترايسبس (ثلاثية الرؤوس)', 'Triceps brachii'],
    act: ['بتفرد الكوع. الراس الطويلة كمان بترجّع الدراع لورا، فهي عضلة مفصلين، والراسين التانيين على الكوع بس.', 'Straightens the elbow. The long head also draws the arm back, so it crosses two joints; the other two heads cross the elbow only.'],
    plane: ['المستوى الأمامي الخلفي.', 'Sagittal plane.'],
    long: ['الراس الطويلة: الدراع فوق الراس والكوع مثني على الآخر.', 'Long head: arm overhead with the elbow fully bent.'],
    bias: [
      ['الفرد فوق الراس بيمطّ الراس الطويلة وبيشغّلها أكتر.', 'Overhead extensions stretch and load the long head more.'],
      ['البوش داون والكوع جنب الجسم بيشغّل الراسين التانيين كويس.', 'Pushdowns with the elbow at your side work the other two heads well.']
    ],
    exL: ['ex_overhead_triceps_extension', 'ex_skull_crusher'], exS: ['ex_triceps_pushdown']
  },
  {
    id: 'forearm_flex', m: 'flexor carpi|palmaris longus|flexor digitorum superficialis|flexor digitorum profundus|flexor pollicis longus|pronator', g: 'arm', joints: ['elbow'], two: false, topic: 'hinge',
    t: ['عضلات ثني الرسغ والصوابع', 'Wrist and finger flexors'],
    act: ['بتثني الرسغ والصوابع وبتعمل القبضة. منشأها من الناحية الداخلية للكوع.', 'Flex the wrist and fingers and create grip. They start from the inner side of the elbow.'],
    plane: ['المستوى الأمامي الخلفي للرسغ.', 'Sagittal plane at the wrist.'],
    long: ['لما الرسغ والصوابع مفرودين لورا.', 'With the wrist and fingers bent back.'],
    bias: [['الشيل التقيل (Farmer carry) والديدلفت والعقلة بيقوّوا القبضة. وجع الناحية الداخلية للكوع غالبًا من الحمل الزيادة عليها.', 'Heavy carries, deadlifts and pull-ups build grip. Pain on the inner elbow is often from overload here.']],
    exL: [], exS: ['wg_wrist_curl']
  },
  {
    id: 'forearm_ext', m: 'extensor carpi|extensor digitorum(?! longus| brevis)|extensor indicis|extensor digiti minimi|supinator', g: 'arm', joints: ['elbow'], two: false, topic: 'hinge',
    t: ['عضلات فرد الرسغ والصوابع', 'Wrist and finger extensors'],
    act: ['بتفرد الرسغ لورا وبتثبّته وانت قافل إيدك. منشأها من الناحية الخارجية للكوع.', 'Bend the wrist back and hold it steady while you grip. They start from the outer side of the elbow.'],
    plane: ['المستوى الأمامي الخلفي للرسغ.', 'Sagittal plane at the wrist.'],
    long: ['لما الرسغ مثني لقدام والصوابع مقفولة.', 'With the wrist bent forward and the fingers closed.'],
    bias: [['في وجع الناحية الخارجية للكوع (التنس)، الانقباض الثابت والنزول البطيء بيساعدوا، بإشراف الأخصائي.', 'For outer elbow pain (tennis elbow), isometrics and slow lowering help, under a specialist\'s guidance.']],
    exL: ['ad_eccentric_wrist_extension'], exS: ['wg_wrist_extension', 'ad_isometric_wrist_extension']
  },

  /* ---------------- الجذع ---------------- */
  {
    id: 'rectus_abd', m: 'rectus abdominis', g: 'trunk', joints: ['back'], two: false, topic: 'core',
    t: ['البطن المستقيمة', 'Rectus abdominis'],
    act: ['بتثني الجذع لقدام، وبتمنع الضهر إنه يتقوّس لورا، وبتميّل الحوض لورا.', 'Bends the trunk forward, stops the lower back arching, and tilts the pelvis back.'],
    plane: ['المستوى الأمامي الخلفي.', 'Sagittal plane.'],
    long: ['لما الجسم مفرود والضهر مقوّس، زي آخر حركة العجلة (Ab wheel).', 'With the body stretched long and the back arched, as at the far point of an ab-wheel rollout.'],
    bias: [
      ['الرول آوت والديد بج بيشغّلوها وهي بتقاوم التقوّس، وده دورها الأهم.', 'Rollouts and dead bugs work it resisting extension, which is its most important job.'],
      ['الكرانش يتعمل بتحكّم ومدى مريح.', 'Do crunches with control and a comfortable range.']
    ],
    exL: ['ex_ab_wheel_rollout'], exS: ['ex_crunch', 'ek_seated_ab_crunch_with_cable', 'ex_dead_bug']
  },
  {
    id: 'obliques', m: 'external oblique|internal oblique', g: 'trunk', joints: ['back'], two: false, topic: 'core',
    t: ['البطن الجانبية', 'Obliques'],
    act: ['بتلف الجذع وبتميّله لجنب، والأهم إنها بتقاوم اللف والميل. الخارجية بتلف لعكس ناحيتها والداخلية لنفس ناحيتها.', 'Rotate and side-bend the trunk, and most importantly resist rotation and side bending. The external oblique turns you to the opposite side, the internal to the same side.'],
    plane: ['مستوى اللف والمستوى الجانبي.', 'Transverse and frontal planes.'],
    long: ['لما الجذع ملفوف أو مايل للناحية التانية.', 'With the trunk turned or bent to the opposite side.'],
    bias: [['ابدأ بتمارين ضد اللف (Pallof والسايد بلانك) وبعدين تمارين اللف زي الوود تشوب.', 'Start with anti-rotation (Pallof press, side plank), then add rotation such as woodchops.']],
    exL: [], exS: ['wg_pallof_press', 'ex_side_plank', 'ex_cable_woodchopper']
  },
  {
    id: 'tva', m: 'transvers.*abdom|transversus abdominis|diaphragm', g: 'trunk', joints: ['back'], two: false, topic: 'core',
    t: ['العضلة العميقة والحجاب الحاجز', 'Transversus abdominis and diaphragm'],
    act: ['مش بيحرّكوا مفصل. بيعلّوا الضغط جوه البطن ويشدّوا حوالين الوسط زي الحزام، وده بيثبّت العمود الفقري تحت الحمل.', 'They do not move a joint. They raise pressure inside the abdomen and tighten around the waist like a belt, which stabilises the spine under load.'],
    plane: ['ثبات من غير حركة.', 'Stability without movement.'],
    long: ['—', '—'],
    bias: [['نفس عميق في البطن والجنب والضهر (٣٦٠ درجة) وبعدين شد قبل أي رفعة تقيلة.', 'Take a deep breath into the belly, sides and back (360 degrees), then brace before any heavy lift.']],
    exL: [], exS: ['ex_dead_bug', 'ex_plank', 'ex_bird_dog']
  },
  {
    id: 'erectors', m: 'iliocostalis|longissimus|spinalis|semispinalis|multifidus|erector', g: 'trunk', joints: ['back'], two: false, topic: 'hinge',
    t: ['عضلات الضهر الطولية', 'Erector spinae'],
    act: ['بتفرد الضهر وبتمنعه يتقوّس لقدام تحت الحمل. في أغلب الرفعات بتشتغل ثابتة مش بتتحرك.', 'Extend the spine and stop it rounding under load. In most lifts they work isometrically rather than moving.'],
    plane: ['المستوى الأمامي الخلفي.', 'Sagittal plane.'],
    long: ['لما الضهر مثني لقدام.', 'With the spine bent forward.'],
    bias: [['الديدلفت والرومانيان بيقوّوها ثابتة. الباك إكستنشن والسوبرمان بيشغّلوها وهي بتتحرك.', 'Deadlifts and Romanian deadlifts strengthen them isometrically. Back extensions and supermans work them through movement.']],
    exL: ['ek_hyperextensions'], exS: ['ex_superman', 'ex_bird_dog']
  },
  {
    id: 'neck', m: 'sternocleidomastoid|splenius|scalenus|longus colli|longus capitis|levator scapulae', g: 'trunk', joints: ['back'], two: false, topic: 'core',
    t: ['عضلات الرقبة', 'Neck muscles'],
    act: ['بتحرك الراس لقدام ولورا ولجنب وبتلفها، وبتثبّتها وقت الجري والاحتكاك والخبطات.', 'Move the head forward, back and sideways and turn it, and hold it steady during running, contact and impacts.'],
    plane: ['التلات مستويات.', 'All three planes.'],
    long: ['عكس اتجاه شغل كل عضلة.', 'Opposite to each muscle\'s direction of pull.'],
    bias: [['الانقباض الثابت في كل الاتجاهات بداية آمنة، ومهم للرياضات اللي فيها احتكاك.', 'Isometric holds in every direction are a safe start and matter for contact sports.']],
    exL: [], exS: ['ek_static_neck_flexion_and_extension', 'ek_static_neck_side_flexion', 'ad_deep_neck_flexor_head_lift']
  },

  /* ---------------- الحوض والرجل ---------------- */
  {
    id: 'glute_max', m: 'gluteus maximus', g: 'lower', joints: ['hip'], two: false, topic: 'hinge',
    t: ['المقعدة الكبيرة', 'Gluteus maximus'],
    act: ['بتفرد الحوض (ترجّع الفخذ لورا)، وبتلف الفخذ لبرّه، وأليافها العلوية بتبعّده لجنب.', 'Extends the hip (drives the thigh back), rotates the thigh outward, and its upper fibres move it out to the side.'],
    plane: ['المستوى الأمامي الخلفي أساسًا.', 'Mainly the sagittal plane.'],
    long: ['لما الحوض مثني على الآخر: تحت في السكوات العميق، والرومانيان، واللانچ بخطوة طويلة.', 'With the hip deeply bent: the bottom of a deep squat, a Romanian deadlift, or a long-stride lunge.'],
    bias: [
      ['الهيب ثراست أصعب نقطة فيه فوق (العضلة مقبوضة). السكوات والسبليت سكوات أصعب تحت (العضلة مشدودة). الاتنين مفيدين.', 'The hip thrust is hardest at the top (shortened). Squats and split squats are hardest at the bottom (lengthened). Both are useful.'],
      ['ميل خفيف لقدام في السبليت سكوات بيزوّد شغلها.', 'A slight forward lean in split squats increases its work.']
    ],
    exL: ['ex_bulgarian_split_squat', 'ex_romanian_deadlift', 'ex_barbell_back_squat'], exS: ['ex_hip_thrust', 'ex_glute_bridge']
  },
  {
    id: 'glute_med', m: 'gluteus medius|gluteus minimus|tensor fasciae latae', g: 'lower', joints: ['hip'], two: false, topic: 'run',
    t: ['المقعدة الجانبية (الوسطى والصغرى)', 'Gluteus medius and minimus'],
    act: ['بتبعّد الفخذ لجنب، والأهم إنها بتمسك الحوض مستوي وانت واقف على رجل واحدة، في المشي والجري والسلم.', 'Move the thigh out to the side and, more importantly, hold the pelvis level when you stand on one leg: walking, running and stairs.'],
    plane: ['المستوى الجانبي.', 'Frontal plane.'],
    long: ['لما الفخذ معدّي ناحية الرجل التانية.', 'With the thigh crossed towards the other leg.'],
    bias: [
      ['تمرين الرفع الجانبي وانت نايم على جنبك بيشغّلها كويس. وتمارين الرجل الواحدة بتدرّبها على شغلها الحقيقي.', 'Side-lying hip abduction works it well; single-leg exercises train its real job.'],
      ['ضعفها بيبان في الحوض اللي بيقع لجنب والركبة اللي بتدخل لجوه.', 'Weakness shows as the hip dropping and the knee caving in.']
    ],
    exL: [], exS: ['wg_side_lying_hip_abduction', 'wg_banded_monster_walk', 'ek_thigh_abductor', 'ex_side_plank']
  },
  {
    id: 'deep_rot', m: 'piriformis|gemellus|obturator|quadratus femoris', g: 'lower', joints: ['hip'], two: false, topic: 'squat',
    t: ['عضلات اللف العميقة للحوض', 'Deep hip rotators'],
    act: ['بتلف الفخذ لبرّه وبتثبّت راس عضمة الفخذ في الحوض.', 'Rotate the thigh outward and keep the head of the thigh bone seated in the hip.'],
    plane: ['مستوى اللف.', 'Transverse plane.'],
    long: ['لما الفخذ ملفوف لجوه.', 'With the thigh rotated inward.'],
    bias: [['الكلامشيل وتمارين الاتزان على رجل واحدة.', 'Clamshells and single-leg balance work.']],
    exL: [], exS: ['wg_clamshell']
  },
  {
    id: 'iliopsoas', m: 'psoas major|iliacus', g: 'lower', joints: ['hip', 'back'], two: true, topic: 'run',
    t: ['عضلة ثني الحوض (الإليوبسواس)', 'Iliopsoas'],
    act: ['أقوى عضلة بترفع الفخذ لقدام، والبسواس متوصل بفقرات أسفل الضهر فبيأثر على وضعه.', 'The strongest muscle for lifting the thigh forward; the psoas attaches to the lower spine and affects its position.'],
    plane: ['المستوى الأمامي الخلفي.', 'Sagittal plane.'],
    long: ['لما الحوض مفرود لورا، زي الرجل الخلفية في اللانچ.', 'With the hip extended behind you, as with the back leg in a lunge.'],
    bias: [['مهمة جدًا للجري والسرعة (رفع الركبة). القعدة الطويلة بتخليها مشدودة، فمطّها بيريّح ناس كتير.', 'Very important for running and sprinting (knee drive). Long sitting keeps it short, so stretching it helps many people.']],
    exL: ['ex_hip_flexor_stretch'], exS: ['wg_hanging_knee_raise', 'ad_supine_banded_psoas_march']
  },
  {
    id: 'rectus_fem', m: 'rectus femoris', g: 'lower', joints: ['hip', 'knee'], two: true, topic: 'squat',
    t: ['الفخذ الأمامي المستقيمة', 'Rectus femoris'],
    act: ['الجزء الوحيد من الفخذ الأمامي اللي بيعدّي مفصلين: بيفرد الركبة وبيثني الحوض.', 'The only quadriceps part that crosses two joints: it straightens the knee and bends the hip.'],
    plane: ['المستوى الأمامي الخلفي.', 'Sagittal plane.'],
    long: ['لما الحوض مفرود لورا والركبة مثنية، زي الرجل الخلفية في البلغاري.', 'With the hip extended and the knee bent, as with the back leg in a Bulgarian split squat.'],
    bias: [['في السكوات طولها مش بيتغير كتير لأن المفصلين بيتثنوا مع بعض. جهاز الرجل الأمامي والسيسي سكوات بيشغّلوها أكتر.', 'In the squat its length barely changes because both joints bend together. Leg extensions and sissy squats work it more.']],
    exL: ['wg_sissy_squat'], exS: ['ex_leg_extension']
  },
  {
    id: 'vasti', m: 'vastus', g: 'lower', joints: ['knee'], two: false, topic: 'squat',
    t: ['الفخذ الأمامي (الواسعات)', 'Vasti (quadriceps)'],
    act: ['تلات عضلات بتفرد الركبة بس. أكبر شغلها في السكوات واللانچ والطلوع والنزول.', 'Three muscles that only straighten the knee. They do most of the work in squats, lunges, climbing and landing.'],
    plane: ['المستوى الأمامي الخلفي.', 'Sagittal plane.'],
    long: ['لما الركبة مثنية على الآخر: تحت في السكوات العميق.', 'With the knee deeply bent: the bottom of a deep squat.'],
    bias: [
      ['جذع مفرود وركبة بتتقدم قدام الصوابع بيزوّدوا شغلها.', 'An upright trunk and knees travelling past the toes increase their work.'],
      ['السبانش سكوات (انقباض ثابت) بيستخدم في وجع وتر الرضفة بإشراف أخصائي.', 'The Spanish squat (isometric) is used for patellar tendon pain under a specialist\'s guidance.']
    ],
    exL: ['ex_barbell_back_squat', 'ex_bulgarian_split_squat', 'ex_front_squat'], exS: ['ex_leg_extension', 'ad_spanish_squat']
  },
  {
    id: 'hamstrings', m: 'biceps femoris|semitendinosus|semimembranosus', g: 'lower', joints: ['hip', 'knee'], two: true, topic: 'hinge',
    t: ['الخلفية (الهامسترينج)', 'Hamstrings'],
    act: ['بتفرد الحوض (ترجّع الفخذ لورا) وبتثني الركبة. عضلة مفصلين، ما عدا الراس القصيرة اللي على الركبة بس.', 'Extend the hip (drive the thigh back) and bend the knee. Two-joint muscles, except the short head of biceps femoris, which crosses the knee only.'],
    plane: ['المستوى الأمامي الخلفي.', 'Sagittal plane.'],
    long: ['لما الحوض مثني والركبة مفرودة، زي تحت في الرومانيان.', 'With the hip bent and the knee straight, as at the bottom of a Romanian deadlift.'],
    bias: [
      ['جهاز الخلفية وانت قاعد (الحوض مثني) بيمطّها أكتر من وانت نايم، وده أحسن لبناء العضلة.', 'The seated leg curl (hip bent) stretches them more than the lying curl, which is better for building muscle.'],
      ['النوردك بيقلل إصابات شد الخلفية في الرياضات اللي فيها جري سريع.', 'Nordic curls reduce hamstring strain injuries in sprinting sports.']
    ],
    exL: ['ex_romanian_deadlift', 'ek_seated_leg_curl', 'ex_nordic_hamstring_curl'], exS: ['ek_lying_leg_curl_machine']
  },
  {
    id: 'adductors', m: 'adductor(?! hallucis| pollicis)|gracilis|pectineus', g: 'lower', joints: ['hip'], two: false, topic: 'squat',
    t: ['الضامّة (عضلات الفخذ الداخلية)', 'Adductors'],
    act: ['بتقرّب الفخذ ناحية الجسم. الضامّة الكبيرة (Magnus) كمان بتفرد الحوض وبتشتغل جامد تحت في السكوات.', 'Bring the thigh in towards the body. The adductor magnus also extends the hip and works hard at the bottom of a squat.'],
    plane: ['المستوى الجانبي.', 'Frontal plane.'],
    long: ['لما الرجلين مفتوحين على الآخر، زي السومو أو اللانچ الجانبي.', 'With the legs wide apart, as in a sumo stance or a lateral lunge.'],
    bias: [['الكوبنهاجن بلانك بيقلل إصابات الحوض والضامّة في الكورة.', 'The Copenhagen plank reduces groin injuries in football.']],
    exL: ['ex_lateral_lunge', 'ek_pile_squat_with_dumbbell'], exS: ['ex_copenhagen_plank', 'ad_supine_adductor_ball_squeeze']
  },
  {
    id: 'gastroc', m: 'gastrocnemius|plantaris', g: 'lower', joints: ['knee', 'ankle'], two: true, topic: 'jump',
    t: ['السمانة الخارجية (الجاستروك)', 'Gastrocnemius'],
    act: ['بتشد الكعب لفوق (تطلّعك على صوابعك) وبتساعد في ثني الركبة. بتشتغل أكتر والركبة مفرودة.', 'Pulls the heel up (raises you onto your toes) and helps bend the knee. Works most with the knee straight.'],
    plane: ['المستوى الأمامي الخلفي.', 'Sagittal plane.'],
    long: ['الركبة مفرودة والكعب نازل تحت مستوى الصوابع، زي تحت في السمانة على سلمة.', 'Knee straight and heel below the toes, as at the bottom of a calf raise on a step.'],
    bias: [['اعمل السمانة وانت واقف على سلمة، وانزل للآخر واثبت ثانية تحت.', 'Do standing calf raises on a step, lower fully and pause for a second at the bottom.']],
    exL: ['ex_calf_raise', 'ek_donkey_calf_raises'], exS: ['ex_standing_calf_raise_machine']
  },
  {
    id: 'soleus', m: 'soleus', g: 'lower', joints: ['ankle'], two: false, topic: 'run',
    t: ['السمانة العميقة (السوليوس)', 'Soleus'],
    act: ['بتشد الكعب لفوق، وبتشتغل أكتر والركبة مثنية. أكبر عضلة بتشيل الحمل في الجري.', 'Pulls the heel up and works most with the knee bent. The muscle that takes the most load in running.'],
    plane: ['المستوى الأمامي الخلفي.', 'Sagittal plane.'],
    long: ['الركبة مثنية والكاحل مثني لفوق.', 'Knee bent and ankle flexed upward.'],
    bias: [['السمانة وانت قاعد (الركبة مثنية) بتركّز عليها. مهمة جدًا للعدّائين ولوتر أكيليس.', 'Seated calf raises (knee bent) focus on it. Very important for runners and for the Achilles tendon.']],
    exL: ['ad_bent_knee_soleus_stretch'], exS: ['ek_seated_calf_raise_using_machine', 'ad_bent_knee_soleus_raise']
  },
  {
    id: 'tib_ant', m: 'tibialis anterior|extensor digitorum longus|extensor hallucis longus', g: 'lower', joints: ['ankle'], two: false, topic: 'run',
    t: ['عضلة القصبة الأمامية', 'Tibialis anterior'],
    act: ['بترفع مشط الرجل لفوق، وبتتحكم في نزول القدم بعد ما الكعب يلمس الأرض في المشي والجري.', 'Lifts the front of the foot and controls the foot as it lowers after the heel lands in walking and running.'],
    plane: ['المستوى الأمامي الخلفي.', 'Sagittal plane.'],
    long: ['لما المشط ممدود لتحت (زي الوقوف على الصوابع).', 'With the foot pointed down, as when standing on your toes.'],
    bias: [['تمرين رفع المشط وضهرك على الحيطة بيقوّيها، وبيساعد ناس كتير عندها وجع قصبة.', 'Tibialis raises with your back against a wall strengthen it and help many people with shin pain.']],
    exL: [], exS: ['ad_tibialis_raise']
  },
  {
    id: 'peroneals', m: 'fibularis|peroneus|tibialis posterior', g: 'lower', joints: ['ankle'], two: false, topic: 'jump',
    t: ['عضلات ثبات الكاحل (الشظوية والقصبة الخلفية)', 'Ankle stabilisers (peroneals and tibialis posterior)'],
    act: ['الشظوية بتلف القدم لبرّه وبتحمي من التواء الكاحل. القصبة الخلفية بتلفها لجوه وبتسند قوس القدم.', 'The peroneals turn the foot outward and protect against ankle sprains. Tibialis posterior turns it inward and supports the arch.'],
    plane: ['المستوى الجانبي للقدم.', 'Frontal plane at the foot.'],
    long: ['عكس اتجاه شغل كل عضلة.', 'Opposite to each muscle\'s direction of pull.'],
    bias: [['تمارين الاتزان على رجل واحدة والأستك للف القدم لبرّه، خصوصًا بعد التواء قديم.', 'Single-leg balance and banded eversion, especially after a previous sprain.']],
    exL: [], exS: ['ad_banded_ankle_eversion', 'ex_calf_raise']
  }
];

export const MUSCLE_GROUPS = [
  ['upper', 'الصدر والضهر والكتف', 'Chest, back and shoulders'],
  ['arm', 'الدراع والساعد', 'Arms and forearms'],
  ['trunk', 'الجذع والرقبة', 'Trunk and neck'],
  ['lower', 'الحوض والرجل', 'Hips and legs']
];
