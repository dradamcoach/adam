/*
 * ADAM — مكتبة البيوميكانيك
 * كل نص [عربي, إنجليزي]. المحتوى تعليمي ومش بديل عن تقييم أخصائي.
 * راجعها الكوتش أحمد ووافق عليها (13 أكتوبر 2026).
 * الرسومات أصلية لـ ADAM (بتترسم بالكود من fig)، مفيش صور من برّه.
 */
export const BIOMECH = {
  version: '2026-10-13',
  reviewed: true,
  note: [
    'المكتبة دي بتشرح إزاي جسمك بيتحرك عشان تتمرن أذكى وأأمن. لو عندك وجع أو إصابة، الأخصائي هو اللي يحدد المناسب ليك.',
    'This library explains how your body moves so you can train smarter and safer. If you have pain or an injury, a specialist decides what suits you.'
  ],
  joints: [
    ['knee', 'الركبة', 'Knee'], ['hip', 'الحوض', 'Hip'], ['back', 'الضهر', 'Back'],
    ['shoulder', 'الكتف', 'Shoulder'], ['ankle', 'الكاحل', 'Ankle'], ['elbow', 'الكوع والرسغ', 'Elbow and wrist']
  ],
  groups: [
    { id: 'basics', t: ['إزاي جسمك بيتحرك', 'How your body moves'], d: ['٨ أفكار بسيطة بتفسّر ليه تمرين بيبقى أصعب أو أسهل، وليه التكنيك فارق.', '8 simple ideas that explain why an exercise feels harder or easier, and why technique matters.'] },
    { id: 'moves', t: ['الحركات الأساسية', 'Fundamental movements'], d: ['١١ حركة بيتبني عليها أي برنامج: إيه اللي شغال، فين الصعوبة، والأخطاء وتعديلاتها.', '11 movements every program is built on: what works, where it gets hard, and common mistakes with fixes.'] }
  ],

  topics: [
    /* ======================== الأساسيات ======================== */
    {
      id: 'planes', g: 'basics', fig: 'planes', joints: [],
      t: ['المستويات الثلاثة للحركة', 'The three planes of motion'],
      s: ['جسمك بيتحرك لقدام وورا، ولجنب، وبيلف. البرنامج الكويس بيشتغل على التلاتة.', 'Your body moves forward and back, side to side, and in rotation. A good program trains all three.'],
      body: [
        [['المستوى الأمامي الخلفي', 'Sagittal plane'], ['حركات لقدام ولورا زي السكوات والجري والبايسبس. أغلب تمارين الجيم بتبقى هنا.', 'Forward and backward movements such as squats, running and curls. Most gym exercises live here.']],
        [['المستوى الجانبي', 'Frontal plane'], ['حركات لجنب زي اللانچ الجانبي ورفرفة الكتف للجنب. مهمة لثبات الحوض والركبة.', 'Side-to-side movements such as lateral lunges and lateral raises. Important for hip and knee stability.']],
        [['مستوى اللف', 'Transverse plane'], ['حركات الدوران زي الرمي وضربة التنس واللف بالكابل. أغلب الرياضات فيها لف كتير.', 'Rotational movements such as throwing, a tennis swing or cable chops. Most sports involve a lot of rotation.']],
        [['ليه يهمك؟', 'Why it matters'], ['لو برنامجك كله لقدام ولورا، جسمك بيبقى أقل جاهزية للحركات الجانبية واللف اللي بتحصل في الرياضة والحياة. ضيف تمرين جانبي وتمرين لف أو ضد اللف كل أسبوع.', 'If all your training is forward and back, your body is less ready for the sideways and twisting movements of sport and daily life. Add a side-to-side exercise and a rotation or anti-rotation exercise every week.']]
      ],
      ex: ['ex_lateral_lunge', 'wg_pallof_press', 'ad_medicine_ball_rotational_throw']
    },
    {
      id: 'levers', g: 'basics', fig: 'levers', joints: ['elbow', 'ankle'],
      t: ['الروافع في جسمك', 'Levers in your body'],
      s: ['كل مفصل رافعة: نقطة ارتكاز، وقوة من العضلة، ومقاومة. نوع الرافعة بيحدد إذا كانت الحركة لصالح القوة ولا السرعة.', 'Every joint is a lever: a pivot, a muscle force and a resistance. The lever type decides whether the movement favours force or speed.'],
      body: [
        [['النوع الأول', 'First class'], ['الارتكاز في النص، زي المرجيحة. مثال: راسك وهي بتهز لقدام ولورا على الفقرات.', 'Pivot in the middle, like a seesaw. Example: nodding your head on the top of the spine.']],
        [['النوع التاني', 'Second class'], ['المقاومة في النص. مثال: الطلوع على صوابع رجلك (Calf raise)؛ الارتكاز عند الصوابع ووزنك في النص والسمانة بتشد من الكعب. لصالح القوة.', 'Resistance in the middle. Example: a calf raise; the pivot is at the toes, your weight in the middle and the calf pulls on the heel. It favours force.']],
        [['النوع التالت', 'Third class'], ['القوة في النص، وده أغلب مفاصل الجسم. مثال: البايسبس بيشد قريب من الكوع والوزن في إيدك بعيد. العضلة بتشتغل أكتر، بس الإيد بتتحرك بسرعة ومدى كبير.', 'Force in the middle, which is most joints in the body. Example: the biceps pulls close to the elbow while the weight sits far away in your hand. The muscle works harder, but the hand moves fast and far.']],
        [['الخلاصة العملية', 'Practical takeaway'], ['العضلات بتطلّع قوة أكبر بكتير من الوزن اللي بتشيله، عشان كده الأوتار والمفاصل محتاجة تتعود على الحمل بالتدريج.', 'Muscles produce far more force than the weight you lift, which is why tendons and joints need to adapt to load gradually.']]
      ],
      ex: ['ex_calf_raise']
    },
    {
      id: 'moment', g: 'basics', fig: 'moment', joints: ['shoulder', 'back'],
      t: ['العزم وذراع العزم', 'Torque and moment arm'],
      s: ['نفس الوزن بيبقى أتقل كل ما يبعد عن المفصل. ده أهم مفهوم في البيوميكانيك.', 'The same weight feels heavier the further it is from the joint. This is the most important idea in biomechanics.'],
      body: [
        [['المعادلة', 'The formula'], ['العزم = القوة × المسافة العمودية بين خط القوة والمفصل (ذراع العزم). وزن ٥ كيلو على بُعد ٦٠ سم من الكتف بيعمل ضعف العزم اللي بيعمله على بُعد ٣٠ سم.', 'Torque = force × the perpendicular distance between the line of force and the joint (the moment arm). A 5 kg weight 60 cm from the shoulder makes twice the torque it makes at 30 cm.']],
        [['في السكوات', 'In the squat'], ['لو جذعك مايل لقدام أكتر، الحوض بيبعد عن خط البار والحمل بيروح على المقعدة والضهر. لو جذعك مفرود أكتر، الركبة بتبعد عن الخط والحمل بيروح على الفخذ الأمامي.', 'If your trunk leans further forward, the hip moves away from the bar line and the load shifts to the glutes and back. If your trunk is more upright, the knee moves away from the line and the load shifts to the quads.']],
        [['في الديدلفت', 'In the deadlift'], ['كل سنتيمتر البار يبعد فيه عن رجلك بيزوّد العزم على أسفل الضهر. عشان كده البار لازم يمشي لازق في الرجل.', 'Every centimetre the bar drifts away from your legs increases the torque on your lower back. That is why the bar should stay close to your legs.']],
        [['تستخدمه إزاي', 'How to use it'], ['تقدر تصعّب التمرين من غير ما تزوّد وزن: بعّد الوزن عن المفصل (دراع مفرود بدل مثني، أو بلانك بإيدين قدام). وتقدر تسهّله لو في وجع بإنك تقرّب الوزن.', 'You can make an exercise harder without adding weight by moving the load further from the joint (straight arm instead of bent, or a plank with hands further forward). You can make it easier when something hurts by bringing the load closer.']]
      ],
      ex: ['ex_barbell_back_squat', 'ex_deadlift']
    },
    {
      id: 'curve', g: 'basics', fig: 'curve', joints: ['elbow'],
      t: ['منحنى القوة ونقطة الصعوبة', 'Strength curve and sticking point'],
      s: ['التمرين مش بيبقى بنفس الصعوبة طول الحركة. فيه نقطة بتقف فيها، ودي اللي بتحدد الوزن اللي تقدر تشيله.', 'An exercise is not equally hard through the whole range. There is a point where you get stuck, and that point sets the weight you can lift.'],
      body: [
        [['ليه بيحصل؟', 'Why it happens'], ['ذراع العزم بيتغير مع زاوية المفصل، وقدرة العضلة كمان بتتغير حسب طولها. في البايسبس بالدمبل، أصعب نقطة لما الكوع يبقى قايم ٩٠ درجة لأن الدمبل في أبعد مسافة أفقية من الكوع.', 'The moment arm changes with joint angle, and the muscle\'s capacity also changes with its length. In a dumbbell curl, the hardest point is with the elbow at 90 degrees because the dumbbell is at its greatest horizontal distance from the elbow.']],
        [['أمثلة', 'Examples'], ['السكوات: أول الطلوع من تحت قرب ما الفخذ يبقى موازي. البنش: كام سنتيمتر فوق الصدر. الديدلفت: أول ما البار يفارق الأرض أو عند الركبة.', 'Squat: early in the ascent, near thighs parallel. Bench: a few centimetres above the chest. Deadlift: as the bar leaves the floor or at the knees.']],
        [['تتعامل معاها إزاي', 'How to deal with it'], ['وقفة ثانيتين عند نقطة الصعوبة، أو تمرين بمدى جزئي عندها، أو أستك مقاومة بيتقل كل ما تطلع. والأهم: تكنيك ثابت.', 'A two-second pause at the sticking point, partial-range work around it, or a resistance band that gets heavier as you rise. Above all, consistent technique.']]
      ],
      ex: ['ex_barbell_bench_press', 'ex_barbell_back_squat']
    },
    {
      id: 'contraction', g: 'basics', fig: 'contraction', joints: [],
      t: ['أنواع الانقباض', 'Types of muscle action'],
      s: ['العضلة بتشتغل وهي بتقصر، ووهي بتطول، ووهي ثابتة. كل نوع ليه فايدة.', 'A muscle works while shortening, while lengthening and while holding still. Each has its own use.'],
      body: [
        [['انقباض بالقِصَر (Concentric)', 'Concentric'], ['العضلة بتقصر وهي بتشيل، زي طلوع البايسبس. هنا بتحس بالمجهود أكتر.', 'The muscle shortens as it lifts, like the upward phase of a curl. This is where effort feels highest.']],
        [['انقباض بالإطالة (Eccentric)', 'Eccentric'], ['العضلة بتطول وهي بتتحكم في النزول. بتقدر تتحمل وزن أكبر من القِصَر، وبتعمل وجع عضلات أكتر في الأول. مفيدة جدًا لتقوية الأوتار وللوقاية من شد الخلفية.', 'The muscle lengthens while controlling the lowering. It can handle more load than the concentric phase and causes more soreness at first. Very useful for tendon strength and for hamstring strain prevention.']],
        [['انقباض ثابت (Isometric)', 'Isometric'], ['العضلة شغالة من غير ما المفصل يتحرك، زي البلانك أو الحيطة. مفيد في التأهيل لأنه بيقلل الوجع عند ناس كتير وبيقوّي عند زاوية معينة.', 'The muscle works without the joint moving, like a plank or a wall sit. Useful in rehab because it eases pain for many people and builds strength at a specific angle.']],
        [['السرعة', 'Tempo'], ['نزول متحكم فيه (٢–٣ ثواني) بيزوّد وقت الشغل تحت الحمل وبيحسّن التحكم. الطلوع يبقى بنية سرعة لو الهدف قوة انفجارية.', 'A controlled lowering (2–3 seconds) increases time under tension and improves control. Lift with intent to move fast when the goal is power.']]
      ],
      ex: ['ex_plank', 'ex_romanian_deadlift']
    },
    {
      id: 'chains', g: 'basics', fig: 'chains', joints: ['knee'],
      t: ['السلسلة المفتوحة والمقفولة', 'Open and closed chain'],
      s: ['هل رجلك أو إيدك ثابتة على الأرض ولا حرة؟ الفرق بيغيّر شغل المفاصل.', 'Is your foot or hand fixed to the ground, or free? The difference changes how the joints work.'],
      body: [
        [['سلسلة مقفولة', 'Closed chain'], ['الطرف ثابت والجسم هو اللي بيتحرك، زي السكوات والضغط. مفاصل كتير بتشتغل مع بعض، وأقرب لحركة الحياة والرياضة.', 'The limb is fixed and the body moves, like a squat or push-up. Many joints work together, closer to sport and daily movement.']],
        [['سلسلة مفتوحة', 'Open chain'], ['الطرف حر، زي جهاز الرجل الأمامي (Leg extension) أو البايسبس. بتعزل عضلة معينة وبتتحكم في الحمل بدقة.', 'The limb is free, like a leg extension or a curl. It isolates a specific muscle and lets you control the load precisely.']],
        [['أنهي أحسن؟', 'Which is better?'], ['الاتنين مفيدين. في التأهيل، الأخصائي بيختار النوع والمدى حسب الإصابة ومرحلة العلاج، خصوصًا بعد عمليات الركبة.', 'Both are useful. In rehab, the specialist chooses the type and range based on the injury and stage of recovery, especially after knee surgery.']]
      ],
      ex: ['ex_leg_extension', 'ex_goblet_squat']
    },
    {
      id: 'balance', g: 'basics', fig: 'balance', joints: ['ankle'],
      t: ['الثبات ومركز الثقل', 'Stability and centre of mass'],
      s: ['طول ما مركز ثقلك فوق قاعدة رجليك، إنت ثابت. ده سر الوقفة الصح في أي تمرين.', 'As long as your centre of mass is over your base of support, you are stable. That is the secret of a good setup in any exercise.'],
      body: [
        [['قاعدة الارتكاز', 'Base of support'], ['المساحة اللي بين نقط لمسك للأرض. رجلين مفتوحين قاعدة أوسع وثبات أكتر، ورجل واحدة قاعدة صغيرة واتزان أصعب.', 'The area between your points of contact with the ground. Feet apart give a wider base and more stability; one foot gives a small base and harder balance.']],
        [['خط البار', 'The bar line'], ['في السكوات والديدلفت والضغط فوق الراس، البار (ومعاه مركز ثقلك) لازم يفضل فوق نص القدم. لو راح لقدام أو لورا، جسمك بيصرف مجهود عشان ما يقعش بدل ما يشيل.', 'In the squat, deadlift and overhead press, the bar (and your centre of mass with it) should stay over mid-foot. If it drifts forward or back, your body spends effort staying upright instead of lifting.']],
        [['تمرين الاتزان', 'Balance training'], ['التمرين على رجل واحدة وتمارين الاتزان بتقلل تكرار التواء الكاحل عند الناس اللي اتصابوا قبل كده.', 'Single-leg and balance exercises reduce repeat ankle sprains in people who have sprained before.']]
      ],
      ex: ['ex_single_leg_rdl', 'ex_bulgarian_split_squat']
    },
    {
      id: 'fv', g: 'basics', fig: 'fv', joints: [],
      t: ['القوة والسرعة', 'Force and velocity'],
      s: ['كل ما الوزن يتقل، الحركة تبطأ. وأعلى قدرة انفجارية بتطلع في النص.', 'The heavier the load, the slower the movement. Peak power sits in the middle.'],
      body: [
        [['العلاقة', 'The relationship'], ['العضلة تقدر تطلّع قوة كبيرة ببطء أو قوة أقل بسرعة، بس مش الاتنين في نفس الوقت.', 'A muscle can produce high force slowly or lower force quickly, but not both at once.']],
        [['القدرة (Power)', 'Power'], ['القدرة = القوة × السرعة. بتوصل لأعلاها عند أحمال متوسطة، وبتختلف حسب التمرين (أخف في النط وأتقل في رفعات الأولمبي).', 'Power = force × velocity. It peaks at moderate loads, and the exact load varies by exercise (lighter for jumps, heavier for Olympic lifts).']],
        [['تطبيقها في برنامجك', 'Using it in your program'], ['للقوة القصوى: أوزان تقيلة وعدات قليلة. للانفجارية: نط ورمي وأوزان متوسطة بنية سرعة. الرياضي محتاج الاتنين.', 'For maximal strength: heavy loads and low reps. For power: jumps, throws and moderate loads moved with intent. Athletes need both.']]
      ],
      ex: ['ex_box_jump', 'ad_broad_jump', 'ex_medicine_ball_slam']
    },

    /* ======================== الحركات ======================== */
    {
      id: 'squat', g: 'moves', fig: 'squat', joints: ['knee', 'hip', 'ankle', 'back'],
      t: ['السكوات', 'Squat'],
      s: ['نزول وطلوع بثني الركبة والحوض مع بعض. أساس القعدة والقيام والنط.', 'Lowering and rising by bending the knees and hips together. The basis of sitting, standing and jumping.'],
      work: [['الكاحل والركبة والحوض بيتثنوا مع بعض، والضهر ثابت.', 'The ankles, knees and hips bend together while the back stays braced.'], ['الفخذ الأمامي، المقعدة، الضامّة (Adductors)، وعضلات الضهر شغالة ثبات.', 'Quadriceps, glutes and adductors, with the back muscles working to hold position.']],
      hard: ['أول الطلوع من تحت، قرب ما الفخذ يبقى موازي للأرض. هنا المسافة بين خط البار والركبة والحوض في أكبرها.', 'Early in the ascent, near thighs parallel to the floor. Here the distance between the bar line and the knees and hips is at its largest.'],
      body: [
        [['الجذع المفرود والجذع المايل', 'Upright versus leaning trunk'], ['البار فوق الضهر من فوق أو قدام على الكتف (Front squat) بيخلي الجذع مفرود والحمل أكتر على الفخذ الأمامي. البار نازل على الضهر بيميّل الجذع ويحط حمل أكتر على المقعدة والضهر.', 'A high bar or a front squat keeps the trunk upright and puts more load on the quads. A lower bar position tilts the trunk and puts more load on the glutes and back.']],
        [['الركبة قدام الصوابع', 'Knees past toes'], ['طبيعي ومطلوب عند أغلب الناس. لو منعت الركبة إنها تتقدم، الجسم بيميل لقدام والحمل بيتنقل للضهر.', 'Normal and needed for most people. If you stop the knees from travelling forward, the trunk leans more and the load shifts to the back.']]
      ],
      cues: [['رجلك كلها على الأرض والوزن على نص القدم.', 'Whole foot on the floor, weight over mid-foot.'], ['الركب في نفس اتجاه صوابع رجلك.', 'Knees track in line with your toes.'], ['خد نفس واشد بطنك قبل ما تنزل.', 'Breathe in and brace before you descend.'], ['انزل للعمق اللي تقدر تحافظ فيه على ضهرك.', 'Go as deep as you can while keeping your back position.']],
      mistakes: [
        [['الركب بتدخل لجوه', 'Knees caving in'], ['ضغط زيادة على الجزء الداخلي من الركبة والرضفة.', 'Extra stress on the inner knee and kneecap.']],
        [['الكعب بيتشال', 'Heels lifting'], ['الوزن بيروح لقدام والركبة بتتحمل أكتر. غالبًا السبب حركة الكاحل.', 'Weight shifts forward and the knees take more load. Ankle mobility is often the cause.']],
        [['الحوض بيطلع قبل الصدر', 'Hips rising before the chest'], ['السكوات بيتحول لثني بالضهر والحمل بيروح على أسفل الضهر.', 'The squat turns into a back-dominant lift and the lower back takes the load.']],
        [['الضهر بيتقوّس تحت', 'Back rounding at the bottom'], ['تقوّس بسيط عادي، بس تحت وزن تقيل بيزوّد الضغط على فقرات أسفل الضهر. انزل لعمق أقل لحد ما تتحكم.', 'A little rounding is normal, but under heavy load it increases stress on the lower spine. Reduce depth until you control it.']]
      ],
      tweaks: [
        ['knee', ['وجع في الركبة: سكوات على صندوق لعمق مريح، ونزول بطيء ٣ ثواني.', 'Knee pain: box squat to a comfortable depth with a 3-second lowering.']],
        ['back', ['وجع في الضهر: جوبلت أو فرونت سكوات (جذع أكتر استقامة)، أو جهاز الرجل.', 'Back pain: goblet or front squat (more upright trunk), or the leg press.']],
        ['ankle', ['كاحل ناشف: ارفع الكعب على طارة صغيرة واشتغل على مرونة الكاحل.', 'Stiff ankles: raise your heels on a small plate and work on ankle mobility.']],
        ['hip', ['وجع في الحوض: جرّب وقفة أوسع أو أضيق وصوابع لبرّه شوية لحد ما تلاقي المريح.', 'Hip pain: try a wider or narrower stance with toes slightly out until it feels comfortable.']]
      ],
      ex: ['ex_barbell_back_squat', 'ex_goblet_squat', 'wg_heel_elevated_goblet_squat', 'ex_leg_press']
    },
    {
      id: 'hinge', g: 'moves', fig: 'hinge', joints: ['hip', 'back'],
      t: ['الثني من الحوض (الديدلفت)', 'Hip hinge (deadlift)'],
      s: ['ثني من الحوض وضهرك مفرود. أساس شيل أي حاجة من الأرض.', 'Bending at the hips with a neutral back. The basis of picking anything up from the floor.'],
      work: [['الحوض هو المفصل الأساسي، الركبة بتتثني شوية، والضهر ثابت.', 'The hip is the main joint, the knees bend a little and the back stays braced.'], ['المقعدة، الخلفية (Hamstrings)، عضلات الضهر شغالة ثبات، اللاتس بتقرّب البار، والقبضة.', 'Glutes and hamstrings, with the back muscles holding position, the lats keeping the bar close, and grip.']],
      hard: ['في الديدلفت: أول ما البار يفارق الأرض لحد الركبة. في الرومانيان: تحت عند أقصى مطّ للخلفية.', 'In the deadlift: from the floor to the knees. In the Romanian deadlift: at the bottom, where the hamstrings are most stretched.'],
      body: [
        [['البار لازق في الرجل', 'Bar close to the legs'], ['كل ما البار يبعد عن رجلك، ذراع العزم على الحوض والضهر بيكبر. البار يمشي في خط عمودي فوق نص القدم.', 'The further the bar drifts from your legs, the larger the moment arm on the hips and back. The bar should travel vertically over mid-foot.']],
        [['ديدلفت ولا رومانيان؟', 'Deadlift or Romanian?'], ['الديدلفت بيبدأ من الأرض وفيه ثني ركبة أكتر. الرومانيان بيبدأ من فوق ونازل بالحوض لورا والركبة شبه ثابتة، فبيشتغل أكتر على الخلفية.', 'The deadlift starts from the floor with more knee bend. The Romanian deadlift starts from the top and pushes the hips back with nearly fixed knees, so it works the hamstrings more.']]
      ],
      cues: [['البار فوق نص القدم قبل ما تبدأ.', 'Bar over mid-foot before you start.'], ['ادفع الحوض لورا مش لتحت.', 'Push the hips back, not down.'], ['شد إبطك كأنك بتعصر برتقانة، عشان البار يفضل لازق.', 'Squeeze your armpits as if holding oranges to keep the bar close.'], ['اقفل بالمقعدة من غير ما ترجع بضهرك لورا.', 'Finish with the glutes without leaning back.']],
      mistakes: [
        [['الضهر بيتقوّس تحت الحمل', 'Back rounding under load'], ['بيزوّد الضغط على الديسك وأربطة الضهر.', 'Increases stress on the discs and spinal ligaments.']],
        [['البار بعيد عن الجسم', 'Bar drifting forward'], ['عزم أكبر على أسفل الضهر لنفس الوزن.', 'More torque on the lower back for the same weight.']],
        [['ثني ركبة زيادة', 'Too much knee bend'], ['الحركة بتتحول لسكوات والخلفية بتشتغل أقل.', 'The lift turns into a squat and the hamstrings do less.']],
        [['ميلان لورا في الآخر', 'Leaning back at lockout'], ['ضغط على مفاصل الفقرات من غير أي فايدة.', 'Stresses the spinal joints with no benefit.']]
      ],
      tweaks: [
        ['back', ['وجع في الضهر: ديدلفت بالبار السداسي (Trap bar)، أو من فوق صناديق، أو هيب ثراست.', 'Back pain: trap-bar deadlift, pulls from blocks, or hip thrusts.']],
        ['hip', ['شد في الخلفية: رومانيان بمدى أقصر وانقباض ثابت، وزوّد المدى بالتدريج.', 'Hamstring strain: shorter-range Romanian deadlifts and isometrics, adding range gradually.']]
      ],
      ex: ['ex_deadlift', 'ex_romanian_deadlift', 'ex_single_leg_rdl', 'ex_hip_thrust', 'ex_glute_bridge']
    },
    {
      id: 'lunge', g: 'moves', fig: 'lunge', joints: ['knee', 'hip'],
      t: ['اللانچ وتمارين الرجل الواحدة', 'Lunge and single-leg work'],
      s: ['رجل قدام ورجل ورا. بتبني القوة والاتزان وبتكشف الفرق بين الرجلين.', 'One leg forward, one back. Builds strength and balance and shows differences between legs.'],
      work: [['الرجل الأمامية: الحوض والركبة والكاحل. الرجل الخلفية: مطّ لعضلة ثني الحوض.', 'Front leg: hip, knee and ankle. Back leg: stretch on the hip flexors.'], ['الفخذ الأمامي، المقعدة، الضامّة، والمقعدة الجانبية (Glute med) للثبات.', 'Quadriceps, glutes, adductors, and the glute med for side-to-side stability.']],
      hard: ['تحت، لما الركبة الخلفية تقرب من الأرض.', 'At the bottom, when the back knee approaches the floor.'],
      body: [
        [['طول الخطوة', 'Step length'], ['خطوة قصيرة وجذع مفرود: شغل أكتر على الفخذ الأمامي. خطوة أطول وميل خفيف لقدام: شغل أكتر على المقعدة.', 'A short step with an upright trunk works the quads more. A longer step with a slight forward lean works the glutes more.']],
        [['لقدام ولا لورا؟', 'Forward or reverse?'], ['اللانچ لورا أريح للركبة عند ناس كتير، لأن الرجل الأمامية مش محتاجة تفرمل الجسم وهو جاي لقدام.', 'The reverse lunge is easier on the knees for many people, because the front leg does not have to brake the body moving forward.']]
      ],
      cues: [['رجليك على قضبان قطر، مش على حبل.', 'Feet on train tracks, not a tightrope.'], ['انزل لتحت مش لقدام.', 'Drop straight down, not forward.'], ['الركبة الأمامية في اتجاه الصوابع.', 'Front knee tracks over the toes.'], ['ادفع بالرجل الأمامية وانت طالع.', 'Drive through the front foot to stand.']],
      mistakes: [
        [['الركبة الأمامية بتدخل لجوه', 'Front knee caving in'], ['ضغط على الركبة وبيبيّن ضعف في المقعدة الجانبية.', 'Stresses the knee and shows weak lateral hip muscles.']],
        [['الرجلين على خط واحد', 'Feet in one line'], ['اتزان صعب والجسم بيلف.', 'Balance gets hard and the body twists.']],
        [['الدفع بالرجل الخلفية', 'Pushing with the back leg'], ['الرجل الأمامية بتشتغل أقل من المطلوب.', 'The front leg does less work than intended.']]
      ],
      tweaks: [
        ['knee', ['وجع في الركبة: لانچ لورا، أو سبليت سكوات ثابت بمدى أقصر، أو طلوع على صندوق واطي.', 'Knee pain: reverse lunges, static split squats with a shorter range, or low step-ups.']],
        ['hip', ['اتزان ضعيف: امسك حاجة جنبك في الأول.', 'Poor balance: hold a support at first.']]
      ],
      ex: ['ex_reverse_lunge', 'ex_walking_lunge', 'ex_bulgarian_split_squat', 'ex_step_up', 'ex_lateral_lunge']
    },
    {
      id: 'hpush', g: 'moves', fig: 'hpush', joints: ['shoulder', 'elbow'],
      t: ['الدفع لقدام (البنش والضغط)', 'Horizontal push (bench and push-up)'],
      s: ['دفع من الصدر لقدام. البنش والضغط وتمارين الصدر.', 'Pushing away from the chest. Bench press, push-ups and chest work.'],
      work: [['الكتف بيقرّب الدراع للصدر، والكوع بيتفرد، ولوح الكتف ثابت في البنش وبيتحرك في الضغط.', 'The shoulder brings the arm across the chest and the elbow straightens; the shoulder blade stays set on the bench and moves freely in a push-up.'], ['الصدر، مقدمة الكتف، الترايسبس، والسيراتس (Serratus) في الضغط.', 'Chest, front deltoids, triceps, and the serratus anterior in push-ups.']],
      hard: ['كام سنتيمتر فوق الصدر في البنش. وفي الآخر الترايسبس هو اللي بيكمّل.', 'A few centimetres above the chest on the bench. At the top, the triceps finish the lift.'],
      body: [
        [['زاوية الكوع', 'Elbow angle'], ['الكوع حوالي ٤٥ لـ ٧٠ درجة من جسمك أريح للكتف من الكوع المفرود ٩٠ درجة.', 'Elbows at about 45 to 70 degrees from the body are easier on the shoulder than elbows flared to 90 degrees.']],
        [['عرض المسكة', 'Grip width'], ['مسكة أعرض: مدى أقصر وشغل أكتر على الصدر. مسكة أضيق: شغل أكتر على الترايسبس.', 'A wider grip shortens the range and works the chest more. A narrower grip works the triceps more.']]
      ],
      cues: [['لوح الكتف لورا ولتحت وثابت.', 'Shoulder blades back, down and set.'], ['البار ينزل على أسفل الصدر.', 'Lower the bar to the lower chest.'], ['الرسغ فوق الكوع مباشرة.', 'Wrist stacked over the elbow.'], ['في الضغط: جسمك خط واحد من الراس للكعب.', 'In a push-up: one straight line from head to heels.']],
      mistakes: [
        [['الكوع مفرود لبرّه', 'Elbows flared out'], ['ضغط زيادة على مقدمة الكتف.', 'Extra stress on the front of the shoulder.']],
        [['الرسغ مايل لورا', 'Wrist bent back'], ['ضغط على الرسغ ونقل قوة أضعف.', 'Stresses the wrist and transfers force poorly.']],
        [['الوسط بيقع في الضغط', 'Hips sagging in a push-up'], ['ضغط على أسفل الضهر.', 'Loads the lower back.']]
      ],
      tweaks: [
        ['shoulder', ['وجع في الكتف: دمبل بمسكة محايدة، أو بنش على الأرض (Floor press) بيقلل المدى تحت، أو ضغط.', 'Shoulder pain: neutral-grip dumbbells, the floor press (limits the bottom range), or push-ups.']],
        ['elbow', ['وجع في الرسغ: مسكة محايدة أو مقابض ضغط.', 'Wrist pain: a neutral grip or push-up handles.']]
      ],
      ex: ['ex_barbell_bench_press', 'ex_pushup']
    },
    {
      id: 'vpush', g: 'moves', fig: 'vpush', joints: ['shoulder', 'back'],
      t: ['الضغط فوق الراس', 'Overhead press'],
      s: ['رفع الوزن من الكتف لفوق الراس. محتاج كتف بيتحرك كويس وجذع ثابت.', 'Pressing from the shoulders to overhead. Needs mobile shoulders and a stable trunk.'],
      work: [['الكتف بيترفع لفوق، ولوح الكتف بيلف لفوق، والكوع بيتفرد، والجذع ثابت.', 'The arm lifts overhead, the shoulder blade rotates upward, the elbow straightens and the trunk stays braced.'], ['الكتف، الترايسبس، الترابيس العلوية والسيراتس، وعضلات البطن.', 'Deltoids, triceps, upper trapezius and serratus, and the core.']],
      hard: ['من مستوى الجبهة لحد فوق الراس، لأن البار هنا قدام الوش وبعيد عن خط الكتف.', 'From forehead height to the top of the head, because the bar is in front of the face and away from the shoulder line.'],
      body: [
        [['خط البار', 'Bar path'], ['البار يطلع في خط مستقيم فوق نص القدم. رجّع راسك شوية عشان البار يعدّي، وبعدين دخّلها لقدام.', 'The bar rises in a straight line over mid-foot. Move your head back slightly to let it pass, then bring it through.']],
        [['الضهر', 'The back'], ['الميل لورا بيحوّل التمرين لبنش مايل وبيضغط على أسفل الضهر. لو الكتف أو نص الضهر العلوي ناشف، الضهر هو اللي بيعوّض.', 'Leaning back turns it into an incline press and stresses the lower back. If the shoulders or upper back are stiff, the lower back compensates.']]
      ],
      cues: [['شد بطنك ومقعدتك قبل ما تدفع.', 'Brace your abs and glutes before you press.'], ['البار يطلع مستقيم، وراسك تدخل بعد ما يعدّي.', 'Press straight up and bring your head through once the bar passes.'], ['في الآخر: الودان جنب الدراع والبار فوق نص القدم.', 'At the top: ears beside the arms, bar over mid-foot.']],
      mistakes: [
        [['ميلان لورا', 'Leaning back'], ['ضغط على أسفل الضهر.', 'Stresses the lower back.']],
        [['البار بيلف قدام الوش', 'Bar looping around the face'], ['عزم أكبر على الكتف.', 'More torque on the shoulder.']]
      ],
      tweaks: [
        ['shoulder', ['وجع في الكتف وانت رافع: لاند ماين برس (زاوية مايلة)، أو دمبل بمسكة محايدة، أو من وضع نص ركوع.', 'Shoulder pain overhead: landmine press (angled path), neutral-grip dumbbells, or a half-kneeling press.']],
        ['back', ['وجع في الضهر: ضغط وانت قاعد بضهر مسنود.', 'Back pain: seated press with back support.']]
      ],
      ex: ['wg_overhead_press', 'ek_seated_military_press']
    },
    {
      id: 'hpull', g: 'moves', fig: 'hpull', joints: ['shoulder', 'back'],
      t: ['السحب لجسمك (الرو)', 'Horizontal pull (row)'],
      s: ['سحب الوزن ناحية جسمك. بيوازن تمارين الدفع ومهم لوضع الكتف.', 'Pulling a weight towards your body. Balances pushing work and matters for shoulder posture.'],
      work: [['لوح الكتف بيرجع لورا، والكتف بيرجع، والكوع بيتثني. في الرو وانت موطي، الحوض ماسك الوضع.', 'The shoulder blade pulls back, the arm moves back and the elbow bends. In a bent-over row the hips hold the hinge.'], ['اللاتس، الرومبويد، الترابيس الوسطى، خلفية الكتف، والبايسبس.', 'Lats, rhomboids, middle trapezius, rear deltoids and biceps.']],
      hard: ['في الآخر لما الكوع يعدّي جسمك وتعصر لوح الكتف.', 'At the end, when the elbow passes your body and you squeeze the shoulder blades.'],
      body: [
        [['زاوية الجذع', 'Trunk angle'], ['الرو وانت موطي بيحط عزم كبير على أسفل الضهر طول المجموعة. الرو على بنش أو بالكابل قاعد بيشيل الحمل ده.', 'The bent-over row puts a lot of torque on the lower back for the whole set. A chest-supported or seated cable row removes that load.']]
      ],
      cues: [['ابدأ بلوح الكتف وبعدين الكوع.', 'Start with the shoulder blade, then the elbow.'], ['اسحب الكوع ناحية جيبك.', 'Pull the elbow towards your pocket.'], ['ماترفعش كتفك لودانك.', 'Keep your shoulders away from your ears.']],
      mistakes: [
        [['تأرجح بالضهر', 'Swinging with the back'], ['الضهر بيشيل الوزن بدل الضهر العلوي.', 'The lower back moves the weight instead of the upper back.']],
        [['الكتف بيتزق لقدام في الآخر', 'Shoulder rolling forward at the end'], ['ضغط على مقدمة الكتف.', 'Stresses the front of the shoulder.']]
      ],
      tweaks: [
        ['back', ['وجع في الضهر: رو على بنش مايل، أو كابل قاعد، أو دمبل بإيد واحدة وانت ساند.', 'Back pain: chest-supported row, seated cable row, or a supported one-arm dumbbell row.']],
        ['shoulder', ['وجع في الكتف: مسكة محايدة ومدى مريح.', 'Shoulder pain: a neutral grip and a comfortable range.']]
      ],
      ex: ['ex_bent_over_row', 'ex_one_arm_dumbbell_row', 'ex_seated_cable_row', 'ex_face_pull']
    },
    {
      id: 'vpull', g: 'moves', fig: 'vpull', joints: ['shoulder', 'elbow'],
      t: ['السحب من فوق (العقلة)', 'Vertical pull (pull-up)'],
      s: ['سحب جسمك لفوق أو البار لتحت. العقلة واللات.', 'Pulling your body up or a bar down. Pull-ups and lat pulldowns.'],
      work: [['الكتف بينزل لجنب الجسم، ولوح الكتف بينزل لتحت، والكوع بيتثني.', 'The arm drives down to the side, the shoulder blade moves down, and the elbow bends.'], ['اللاتس، الترابيس السفلية، البايسبس، وعضلات الساعد والقبضة.', 'Lats, lower trapezius, biceps, and the forearm and grip muscles.']],
      hard: ['آخر جزء لما الدقن تقرب من البار، والبداية من التعليق الكامل عند المبتدئين.', 'The top, as the chin nears the bar, and the start from a dead hang for beginners.'],
      body: [
        [['المسكة', 'Grip'], ['مسكة من تحت (Chin-up) بتشغّل البايسبس أكتر. المسكة المحايدة أريح للكتف عند ناس كتير. المسكة العريضة جدًا بتقصّر المدى.', 'An underhand grip (chin-up) works the biceps more. A neutral grip is friendlier to many shoulders. A very wide grip shortens the range.']]
      ],
      cues: [['ابدأ بإنك تنزّل لوح كتفك لتحت.', 'Start by pulling your shoulder blades down.'], ['صدرك يطلع ناحية البار.', 'Bring your chest towards the bar.'], ['انزل للآخر بهدوء.', 'Lower all the way with control.']],
      mistakes: [
        [['نص مدى', 'Half reps'], ['قوة في جزء واحد بس من الحركة.', 'Strength in only part of the range.']],
        [['السحب ورا الرقبة', 'Pulling behind the neck'], ['ضغط على مقدمة الكتف من غير فايدة زيادة.', 'Stresses the front of the shoulder with no extra benefit.']]
      ],
      tweaks: [
        ['shoulder', ['وجع في الكتف: مسكة محايدة، أو لات قدام الصدر، أو عقلة بأستك مساعد.', 'Shoulder pain: a neutral grip, lat pulldowns to the front, or band-assisted pull-ups.']],
        ['elbow', ['وجع في الكوع: مسكة محايدة وقلّل الحجم شوية.', 'Elbow pain: a neutral grip and slightly less volume.']]
      ],
      ex: ['ex_pullup', 'ex_chinup', 'ex_lat_pulldown']
    },
    {
      id: 'run', g: 'moves', fig: 'run', joints: ['knee', 'ankle', 'hip'],
      t: ['الجري', 'Running'],
      s: ['الجري سلسلة نطات صغيرة. مع كل خطوة الجسم بيستقبل حوالي ٢ لـ ٣ أضعاف وزنه.', 'Running is a series of small hops. Each step loads the body with about 2 to 3 times body weight.'],
      work: [['الحوض والركبة والكاحل بيستقبلوا الصدمة ويدفعوا. الدراعين بيوازنوا لفّ الجسم.', 'The hips, knees and ankles absorb and push off. The arms balance the body\'s rotation.'], ['السمانة ووتر أكيليس (أكبر شغل عند الكاحل)، الفخذ الأمامي، المقعدة، والخلفية.', 'Calves and Achilles tendon (most work at the ankle), quads, glutes and hamstrings.']],
      hard: ['لحظة نزول الرجل على الأرض. لو الرجل نزلت بعيد قدام الجسم والركبة مفرودة، بتعمل فرملة وحمل أكبر على الركبة والقصبة.', 'The moment the foot lands. If it lands far ahead of the body with a straight knee, it brakes and loads the knee and shin more.'],
      body: [
        [['عدد الخطوات في الدقيقة', 'Cadence'], ['زيادة عدد الخطوات ٥ لـ ١٠٪ بنفس السرعة بتقصّر الخطوة وبتقلل الحمل على الركبة والحوض.', 'Raising step rate by 5 to 10% at the same speed shortens the stride and reduces load on the knees and hips.']],
        [['النزول على الكعب ولا المشط؟', 'Heel or forefoot?'], ['مفيش طريقة واحدة صح للكل. النزول على الكعب بيحط حمل أكتر على الركبة، والنزول على المشط بيحط حمل أكتر على السمانة وأكيليس. التغيير يبقى بالتدريج.', 'There is no single right way for everyone. Heel striking loads the knees more; forefoot striking loads the calves and Achilles more. Change gradually.']],
        [['أكتر سبب للإصابة', 'The biggest cause of injury'], ['زيادة المسافة أو السرعة بسرعة. زوّد الحمل بالتدريج واهتم بتمارين القوة للرجل.', 'Increasing distance or speed too fast. Build load gradually and keep up leg strength work.']]
      ],
      cues: [['رجلك تنزل تحت جسمك تقريبًا.', 'Land with your foot roughly under your body.'], ['خطوات أقصر وأسرع.', 'Shorter, quicker steps.'], ['ميل خفيف لقدام من الكاحل.', 'A slight forward lean from the ankles.'], ['الدراع يتحرك قدام وورا من غير ما يعدّي الجسم.', 'Arms swing forward and back without crossing the body.']],
      mistakes: [
        [['خطوة طويلة قدام الجسم', 'Overstriding'], ['فرملة مع كل خطوة وحمل أكبر على الركبة والقصبة.', 'Braking on every step and more load on the knees and shins.']],
        [['الحوض بيقع لجنب', 'Hip dropping'], ['ضغط على الركبة والجزء الخارجي من الفخذ. محتاج تقوية للمقعدة الجانبية.', 'Stresses the knee and outer thigh. Needs lateral hip strengthening.']]
      ],
      tweaks: [
        ['knee', ['وجع قدام الركبة: زوّد عدد الخطوات ٥–١٠٪، وقلّل المسافة والنزول من المطالع مؤقتًا.', 'Pain at the front of the knee: raise cadence by 5–10% and temporarily cut distance and downhill running.']],
        ['ankle', ['وجع في القصبة أو أكيليس: زيادة تدريجية وتمارين سمانة.', 'Shin or Achilles pain: build up gradually and add calf strengthening.']]
      ],
      ex: ['ex_treadmill_running', 'ex_interval_running', 'ex_calf_raise', 'ex_single_leg_rdl', 'ex_step_up']
    },
    {
      id: 'jump', g: 'moves', fig: 'jump', joints: ['knee', 'ankle'],
      t: ['النط والنزول', 'Jumping and landing'],
      s: ['النط بيطلّع قوة بسرعة، والنزول هو اللي بيحميك أو بيصيبك.', 'Jumping produces force fast; landing is what protects or injures you.'],
      work: [['الحوض والركبة والكاحل بيتفردوا مع بعض في النط، وبيتثنوا مع بعض في النزول عشان يمتصوا الصدمة.', 'The hips, knees and ankles extend together to jump and bend together to absorb the landing.'], ['المقعدة، الفخذ الأمامي، السمانة، والأوتار بتخزّن الطاقة وترجّعها.', 'Glutes, quads and calves, with the tendons storing and returning energy.']],
      hard: ['لحظة النزول. الحمل ممكن يوصل لأضعاف وزن الجسم في جزء من الثانية.', 'The landing. The load can reach several times body weight in a fraction of a second.'],
      body: [
        [['النزول الآمن', 'Safe landing'], ['انزل على المشط وبعدين القدم كلها، والحوض والركبة يتثنوا مع بعض، والركب فوق الصوابع. دخول الركب لجوه في النزول مرتبط بإصابات الرباط الصليبي.', 'Land on the forefoot then the whole foot, bend the hips and knees together, and keep knees over toes. Knees caving in on landing is linked to ACL injuries.']],
        [['الترتيب', 'Progression'], ['اتعلم النزول الأول، وبعدين النط لفوق، وبعدين النط على رجل واحدة. انزل من الصندوق مشي مش نط.', 'Learn to land first, then jump higher, then jump on one leg. Step down from the box instead of jumping down.']]
      ],
      cues: [['انزل بهدوء ومن غير صوت عالي.', 'Land softly and quietly.'], ['الركب فوق الصوابع.', 'Knees over toes.'], ['الحوض يرجع لورا وانت نازل.', 'Sit the hips back as you land.'], ['اثبت ثانيتين بعد النزول.', 'Hold the landing for two seconds.']],
      mistakes: [
        [['نزول برجل مفرودة', 'Stiff-legged landing'], ['الصدمة بتروح على المفاصل بدل العضلات.', 'The impact goes to the joints instead of the muscles.']],
        [['الركب بتدخل لجوه', 'Knees caving in'], ['خطر أكبر على الرباط الصليبي.', 'Higher risk to the ACL.']],
        [['الوزن على الكعب', 'Landing on the heels'], ['الصدمة بتطلع للركبة والضهر.', 'The impact travels to the knees and back.']]
      ],
      tweaks: [
        ['knee', ['وجع في وتر الرضفة: قلّل عدد النطات، واشتغل انقباض ثابت (حيطة أو جهاز رجل)، وصناديق واطية.', 'Patellar tendon pain: fewer jumps, isometric holds (wall sit or leg extension) and low boxes.']],
        ['ankle', ['التواء قديم في الكاحل: تمارين اتزان على رجل واحدة قبل النط.', 'Previous ankle sprain: single-leg balance work before jumping.']]
      ],
      ex: ['ex_box_jump', 'ad_broad_jump', 'ex_goblet_squat', 'ex_calf_raise']
    },
    {
      id: 'throw', g: 'moves', fig: 'throw', joints: ['shoulder', 'back', 'hip'],
      t: ['الرمي واللف', 'Throwing and rotation'],
      s: ['القوة بتطلع من الرجلين، وتعدّي بالحوض والجذع، وتخرج من الدراع. سلسلة واحدة.', 'Force starts in the legs, passes through the hips and trunk, and leaves through the arm. One chain.'],
      work: [['الرجلين والحوض بيبدأوا، الجذع بيلف، الكتف والكوع والرسغ آخر حلقة.', 'The legs and hips start, the trunk rotates, and the shoulder, elbow and wrist are the last links.'], ['المقعدة، عضلات البطن الجانبية (Obliques)، اللاتس، الكتف، وعضلات الكفّة المدورة (Rotator cuff) بتفرمل الدراع في الآخر.', 'Glutes, obliques, lats and shoulders, with the rotator cuff braking the arm at the end.']],
      hard: ['آخر الرمية، لما عضلات الكتف لازم تفرمل الدراع بسرعة.', 'The follow-through, when the shoulder muscles must brake the arm quickly.'],
      body: [
        [['الترتيب', 'Sequencing'], ['كل جزء بيبدأ بعد اللي قبله بلحظة: الحوض، بعدين الصدر، بعدين الدراع. لو الترتيب اتلخبط، القوة بتقل والكتف بيشيل أكتر.', 'Each segment starts just after the one before: hips, then chest, then arm. If the order breaks, force drops and the shoulder takes more load.']],
        [['منين ييجي اللف؟', 'Where rotation comes from'], ['أسفل الضهر حركته في اللف قليلة. اللف لازم ييجي من الحوض ومن نص الضهر العلوي.', 'The lower back has little rotation. Rotation should come from the hips and the upper back.']]
      ],
      cues: [['ابدأ من رجليك والحوض.', 'Start from your legs and hips.'], ['الحوض يلف قبل الكتف.', 'Hips turn before the shoulders.'], ['الدراع آخر حاجة تتحرك.', 'The arm moves last.'], ['كمّل الحركة واهدى في الآخر.', 'Follow through and decelerate.']],
      mistakes: [
        [['الرمي بالدراع بس', 'Throwing with the arm only'], ['ضغط على الكتف والكوع.', 'Stresses the shoulder and elbow.']],
        [['اللف من أسفل الضهر', 'Twisting from the lower back'], ['ضغط على فقرات أسفل الضهر.', 'Stresses the lower spine.']]
      ],
      tweaks: [
        ['shoulder', ['وجع في الكتف: رمي كرة طبية من الصدر، وقلّل الرمي فوق الراس، وقوّي عضلات الكفّة.', 'Shoulder pain: chest throws with a medicine ball, less overhead throwing, and rotator cuff strengthening.']],
        ['back', ['وجع في الضهر: ابدأ بتمارين ضد اللف (Pallof) قبل تمارين اللف.', 'Back pain: start with anti-rotation (Pallof) before rotation exercises.']]
      ],
      ex: ['ad_medicine_ball_rotational_throw', 'ad_medicine_ball_scoop_toss', 'ex_medicine_ball_slam', 'wg_pallof_press']
    },
    {
      id: 'core', g: 'moves', fig: 'core', joints: ['back'],
      t: ['الجذع (الكور)', 'Core'],
      s: ['أهم شغل للجذع إنه يمنع الحركة الزيادة وينقل القوة بين الرجلين والدراعين، مش الكرانش بس.', 'The core\'s main job is to resist unwanted movement and transfer force between legs and arms, not only to crunch.'],
      work: [['العمود الفقري ثابت والحوض محايد، والجذع بيقاوم حمل بيحاول يحرّكه.', 'The spine stays still and the pelvis neutral while the trunk resists a load trying to move it.'], ['البطن المستقيمة، البطن الجانبية، العضلة العميقة (Transversus)، عضلات الضهر، والمقعدة.', 'Rectus abdominis, obliques, transversus abdominis, back extensors and glutes.']],
      hard: ['آخر الوقت أو العدات، لما التعب يخلّي الوسط يقع أو يلف.', 'The end of the set, when fatigue lets the hips sag or twist.'],
      body: [
        [['أربع أنواع', 'Four types'], ['ضد التقوس لورا (بلانك، ديد بج). ضد الميل لجنب (سايد بلانك، شيل شنطة بإيد واحدة). ضد اللف (Pallof، بيرد دوج). وحركات ثني ولف بكمية معقولة.', 'Anti-extension (plank, dead bug). Anti-lateral flexion (side plank, one-arm carry). Anti-rotation (Pallof press, bird dog). Plus flexion and rotation in sensible amounts.']],
        [['الشد والتنفس', 'Bracing and breathing'], ['اشد بطنك من كل ناحية كأن حد هيزقك. في الأوزان التقيلة ممكن تحبس نفسك لحظة في أصعب جزء. اللي عنده ضغط عالي يسأل طبيبه الأول.', 'Brace all around as if someone is about to push you. With heavy loads you may hold your breath briefly through the hardest part. Anyone with high blood pressure should ask their doctor first.']]
      ],
      cues: [['ضلوعك لتحت والحوض محايد.', 'Ribs down, pelvis neutral.'], ['اشد بطنك كأن حد هيزقك.', 'Brace as if someone is about to push you.'], ['اتنفس وانت شادد.', 'Keep breathing while braced.'], ['الجودة قبل الوقت.', 'Quality before time.']],
      mistakes: [
        [['الوسط بيقع في البلانك', 'Hips sagging in a plank'], ['ضغط على أسفل الضهر.', 'Loads the lower back.']],
        [['حبس النفس طول الوقت', 'Holding your breath throughout'], ['الضغط بيعلى من غير داعي.', 'Raises blood pressure unnecessarily.']]
      ],
      tweaks: [
        ['back', ['وجع في الضهر: كرل أب معدّل، وسايد بلانك، وبيرد دوج بثبات وقت قصير وتكرار أكتر.', 'Back pain: modified curl-up, side plank and bird dog with short holds and more repetitions.']]
      ],
      ex: ['ex_plank', 'ex_side_plank', 'ex_dead_bug', 'ex_bird_dog', 'wg_pallof_press']
    }
  ]
};
