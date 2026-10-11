/*
 * مكتبة الرياضة — الجمل الحركية والخطط التكتيكية
 * =================================================
 * جمل الرياضات القتالية، طرق اللعب والتشكيلات، الكرات الثابتة، وخطط السباقات.
 * كل عنصر: النوع، المستوى، الاسم، الوصف، إمتى تستخدمه، الخطوات بالترتيب، ونقاط تعليمية.
 * بيانات بس — مفيش منطق هنا. التحقق: node tools/check-hub.js tactics library/tactics.js
 *
 * ترقيم اللكمات المستخدم في الملاكمة والكيك بوكسينج (للاعب الأرثوذكس، اليد الشمال قدام):
 * 1 = جاب (مستقيمة أمامية)، 2 = كروس (مستقيمة خلفية)، 3 = هوك أمامي، 4 = هوك خلفي،
 * 5 = أبركات أمامي، 6 = أبركات خلفي. بعض المدارس بترقّم بشكل مختلف — اتفق مع لاعبك.
 */

const p = (ar, en) => ({ ar, en });

/* T(id, sport, kind, level, [nameAr, nameEn], [descAr, descEn], [whenAr, whenEn], [[stepAr, stepEn], ...], [[cueAr, cueEn], ...]) */
function T(id, sport, kind, level, name, desc, when, steps, cues) {
  const o = {
    id: 'tc_' + id, sport, kind, level,
    name: p(name[0], name[1]),
    desc: p(desc[0], desc[1]),
    when: p(when[0], when[1]),
    steps: steps.map((s) => p(s[0], s[1]))
  };
  if (cues && cues.length) o.cues = cues.map((c) => p(c[0], c[1]));
  return o;
}

const ALL = [];

/* ───────────── ملاكمة ───────────── */
ALL.push(
  T('boxing_1_2', 'boxing', 'combination', 'beginner',
    ['جملة ١-٢ (جاب - كروس)', '1-2 (jab - cross)'],
    ['أساس كل الجمل: الجاب بيقيس المسافة ويفتح الجارد، والكروس هي اللكمة القوية اللي بتخلص بيها.', 'The foundation of every combination: the jab measures distance and opens the guard, the cross is the power finish.'],
    ['من المسافة المتوسطة لما الخصم ثابت أو بيرجع لورا في خط مستقيم.', 'From mid range when the opponent is static or backing up in a straight line.'],
    [
      ['من وقفة الحراسة، جاب سريع ناحية وش الخصم مع خطوة صغيرة بالرجل الأمامية.', 'From guard, fire a quick jab at the face with a small step of the lead foot.'],
      ['رجّع الجاب لنفس الطريق وإنت بتلف الرجل الخلفية والحوض لقدام.', 'Retract the jab on the same line while pivoting the rear foot and turning the hips.'],
      ['اضرب الكروس في خط مستقيم والدقن مستخبية ورا الكتف.', 'Throw the cross in a straight line with the chin tucked behind the shoulder.'],
      ['رجّع الإيد الخلفية للدقن فورًا واطلع من خط الهجوم بزاوية أو خطوة لورا.', 'Bring the rear hand straight back to the chin and exit the line with an angle or step back.']
    ],
    [['الجاب يرجع أسرع ما راح.', 'The jab comes back faster than it goes out.'], ['الإيد اللي مش بتضرب فاضلة على الدقن.', 'The non-punching hand stays on the chin.']]),

  T('boxing_1_2_3', 'boxing', 'combination', 'beginner',
    ['جملة ١-٢-٣ (جاب - كروس - هوك أمامي)', '1-2-3 (jab - cross - lead hook)'],
    ['الكروس بتحمّل الوزن على الرجل الأمامية فالهوك الأمامي بيطلع طبيعي بتحويل الوزن تاني.', 'The cross loads weight onto the lead leg, so the lead hook flows naturally as the weight shifts back.'],
    ['لما الخصم بيرفع الجارد في النص بعد الـ١-٢ ويسيب جنب الراس مفتوح.', 'When the opponent closes the middle after the 1-2 and leaves the side of the head open.'],
    [
      ['جاب لقياس المسافة.', 'Jab to measure distance.'],
      ['كروس كاملة بلف الحوض لحد ما الوزن ييجي على الرجل الأمامية.', 'Full cross, rotating the hips until the weight settles on the lead leg.'],
      ['لف الرجل الأمامية والحوض للجهة العكسية واضرب الهوك والكوع في مستوى القبضة.', 'Pivot the lead foot and hips back and throw the hook with the elbow level with the fist.'],
      ['خلّص بخطوة لزاوية أو بـ"رول" تحت الرد المتوقع.', 'Finish by stepping to an angle or rolling under the expected return.']
    ],
    [['الهوك قصير — الزاوية حوالي ٩٠ درجة عند الكوع.', 'Keep the hook short, roughly 90 degrees at the elbow.']]),

  T('boxing_1_1_2', 'boxing', 'combination', 'beginner',
    ['جملة ١-١-٢ (جاب مزدوج - كروس)', '1-1-2 (double jab - cross)'],
    ['الجاب الأول بيقفل المسافة أو يعمي الخصم، والتاني بيثبته، والكروس بتنزل وهو متجمد.', 'The first jab closes distance or blinds, the second freezes him, and the cross lands while he is set.'],
    ['ضد خصم طويل أو بيرجع لورا، أو لما الجاب الواحد مش واصل.', 'Against a taller opponent or one who retreats, or when a single jab falls short.'],
    [
      ['جاب أول بخطوة لقدام لكسر المسافة.', 'First jab with a forward step to break distance.'],
      ['جاب تاني من غير ما ترجع الإيد للآخر (نص رجوع).', 'Second jab from a half-retracted hand.'],
      ['كروس مستقيمة ورا الجاب التاني على طول.', 'Cross straight behind the second jab.'],
      ['اطلع بزاوية أو كمّل بهوك أمامي لو الخصم ساب نفسه.', 'Exit on an angle or add a lead hook if he stays in range.']
    ],
    [['غيّر إيقاع الجابين — مش لازم نفس السرعة.', 'Vary the rhythm of the two jabs — they need not be the same speed.']]),

  T('boxing_1_2_3_2', 'boxing', 'combination', 'intermediate',
    ['جملة ١-٢-٣-٢', '1-2-3-2'],
    ['جملة أربع لكمات بتتبادل فيها اليمين والشمال، والكروس الأخيرة بتلاقي الخصم بعد ما قفل الجنب عشان الهوك.', 'A four-punch alternating combination; the last cross finds the middle after the opponent covers for the hook.'],
    ['لما الخصم محشور على الحبال أو بيصد بثبات من غير ما يتحرك.', 'When the opponent is on the ropes or shells up without moving.'],
    [
      ['جاب - كروس لإجبار الخصم يقفل.', 'Jab-cross to force him to cover.'],
      ['هوك أمامي على جنب الراس أو الجارد.', 'Lead hook to the side of the head or the guard.'],
      ['كروس في النص اللي اتفتح لما رفع كوعه للهوك.', 'Cross through the gap opened when he lifted the elbow for the hook.'],
      ['اطلع بزاوية ناحية الإيد الأمامية بتاعته.', 'Exit to the side of his lead hand.']
    ],
    [['كل لكمة بتجهز للي بعدها — التوازن ثابت بين الرجلين.', 'Each punch sets up the next — keep balance centred between the feet.']]),

  T('boxing_body_head', 'boxing', 'combination', 'intermediate',
    ['جملة بطن - راس (٢ للبطن - ٣ للراس)', 'Body-head (2 to the body, 3 to the head)'],
    ['تنزل على البطن عشان الخصم ينزل إيده، وبعدين تطلع للراس في الفتحة اللي حصلت.', 'Go downstairs to drag the guard down, then come upstairs through the gap.'],
    ['ضد خصم جارده عالي وثابت، أو في الجولات الأولى لبناء الإرهاق.', 'Against a high, tight guard, or in early rounds to build fatigue.'],
    [
      ['جاب للوش لتغطية النزول.', 'Jab to the face to cover the level change.'],
      ['انزل بالركب (مش بالضهر) واضرب كروس للبطن.', 'Drop with the knees, not the waist, and throw the cross to the body.'],
      ['اطلع بالوزن واضرب هوك أمامي للراس.', 'Rise with the weight transfer and throw a lead hook to the head.'],
      ['اطلع برة الخط أو ارجع للجارد.', 'Exit the line or reset to guard.']
    ],
    [['الراس برة خط الوسط وإنت نازل.', 'Keep your head off the centre line while you drop.'], ['اضرب البطن تحت الكوع مش فيه.', 'Hit the body under the elbow, not into it.']]),

  T('boxing_double_hook', 'boxing', 'combination', 'intermediate',
    ['هوك مزدوج (بطن ثم راس)', 'Double lead hook (body then head)'],
    ['هوكين بنفس الإيد: الأول للكبد/الضلوع والتاني للراس من غير ما ترجع الإيد.', 'Two hooks with the same hand: first to the liver/ribs, second to the head without resetting.'],
    ['من المسافة القريبة لما الخصم بيصد بكوعه ناحية البطن.', 'At close range when the opponent drops the elbow to protect the body.'],
    [
      ['اقفل المسافة بجاب أو خطوة.', 'Close distance with a jab or step.'],
      ['هوك أمامي للجنب/البطن مع ثني الركب.', 'Lead hook to the side/body while bending the knees.'],
      ['من غير ما ترجع الإيد، اطلع بالركب واضرب هوك للراس.', 'Without resetting the hand, rise and throw the hook to the head.'],
      ['كمّل بكروس أو اطلع بـ"رول".', 'Follow with a cross or roll out.']
    ]),

  T('boxing_slip_counter', 'boxing', 'counter', 'intermediate',
    ['سليب (مراوغة بالراس) وكاونتر', 'Slip and counter'],
    ['تحرّك الراس برة خط الجاب أو الكروس وترد فورًا وإنت الخصم مكشوف.', 'Move the head off the line of the jab or cross and counter while the opponent is exposed.'],
    ['ضد خصم بيعتمد على الجاب أو بيضرب نفس اللكمة كتير.', 'Against an opponent who relies on the jab or repeats the same punch.'],
    [
      ['اقرا كتف الخصم الأمامي وهو بيبدأ الجاب.', 'Read the lead shoulder as the jab starts.'],
      ['سليب لبرة (ناحية إيده الأمامية) بلف بسيط في الجذع وثني الركبة.', 'Slip outside with a small trunk rotation and knee bend.'],
      ['وإنت مايل، رد بكروس فوق جابه أو للبطن.', 'From the slipped position, counter with a cross over his jab or to the body.'],
      ['ارجع للوقفة واطلع بزاوية.', 'Recover to stance and take an angle.']
    ],
    [['السليب صغير — بس كفاية تعدي الراس من اللكمة.', 'Slip just enough for the punch to miss.'], ['العين على الخصم طول الوقت.', 'Eyes on the opponent the whole time.']]),

  T('boxing_roll_under', 'boxing', 'counter', 'intermediate',
    ['رول (دوران تحت الهوك) وكاونتر', 'Roll under the hook and counter'],
    ['تنزل وتلف بجسمك على شكل حرف U تحت الهوك وترد بهوك من الجهة التانية.', 'Drop and move the head in a U-shape under the hook, then counter with a hook from the other side.'],
    ['لما الخصم بيضرب هوك واسع أو بيكمّل جمله بهوك.', 'When the opponent throws wide hooks or finishes combinations with a hook.'],
    [
      ['شوف بداية الهوك من الكوع اللي بيترفع.', 'Spot the hook as the elbow lifts.'],
      ['انزل بالركب ولف الراس تحت اللكمة من جهة للتانية.', 'Bend the knees and move the head under the punch from one side to the other.'],
      ['اطلع على الجهة التانية والوزن محمّل.', 'Come up on the far side with weight loaded.'],
      ['رد بهوك أو أبركات من الجهة اللي طلعت فيها.', 'Counter with a hook or uppercut from the side you rise on.']
    ],
    [['ماتوطيش الراس لقدام — انزل بالركب.', 'Do not bow forward — drop with the legs.']]),

  T('boxing_check_hook', 'boxing', 'counter', 'advanced',
    ['تشيك هوك', 'Check hook'],
    ['هوك أمامي مع لف على الرجل الأمامية بيخلّي الخصم المندفع يعدّي في الفراغ ويتضرب.', 'A lead hook thrown while pivoting on the lead foot so the charging opponent runs past into it.'],
    ['ضد خصم بيهجم بخط مستقيم ومندفع بجسمه لقدام.', 'Against an opponent who rushes forward in a straight line.'],
    [
      ['استنى الخصم لما يدخل المسافة ووزنه لقدام.', 'Wait for him to enter range with his weight forward.'],
      ['اضرب هوك أمامي قصير في نفس لحظة دخوله.', 'Throw a short lead hook as he steps in.'],
      ['لف على بطن الرجل الأمامية والرجل الخلفية تلف حوالي ٩٠ درجة.', 'Pivot on the ball of the lead foot, swinging the rear foot about 90 degrees.'],
      ['بقيت على جنبه — كمّل أو اطلع.', 'You are now at his side — follow up or exit.']
    ],
    [['اللف مع اللكمة مش بعدها.', 'The pivot happens with the punch, not after.']]),

  T('boxing_pull_counter', 'boxing', 'counter', 'advanced',
    ['بول كاونتر (سحب الراس ورد)', 'Pull counter'],
    ['تسحب الوزن والراس على الرجل الخلفية عشان الجاب يقع قصير، وترجع بكروس فورًا.', 'Shift weight onto the back leg so the jab falls short, then snap back with a cross.'],
    ['ضد خصم بيجاب كتير وبيسيب إيده بره أو بيرجعها بطيء.', 'Against a busy jabber who leaves the jab out or retracts slowly.'],
    [
      ['خلّي المسافة على طرف جاب الخصم.', 'Stay at the edge of his jab range.'],
      ['مع الجاب، اسحب الجذع والوزن لورا على الرجل الخلفية من غير ما تتحرك الرجلين.', 'As the jab comes, lean the trunk and weight back over the rear leg without moving the feet.'],
      ['امسك الجاب بإيدك الخلفية أو خليها تعدي قصيرة.', 'Catch the jab with the rear hand or let it fall short.'],
      ['ارجع بالوزن لقدام وكروس على طول فوق إيده.', 'Shift forward and throw the cross over his arm.']
    ],
    [['الدقن مستخبية وإنت ساحب.', 'Keep the chin tucked while leaning back.']]),

  T('boxing_parry_counter', 'boxing', 'counter', 'beginner',
    ['صد بالكف (باري) وجاب مضاد', 'Parry and counter jab'],
    ['تحوّل الجاب بكفك الخلفي لبرة وترد بجاب أو ١-٢ وهو إيده ممدودة.', 'Deflect the jab with the rear palm and reply with a jab or 1-2 while his arm is extended.'],
    ['أول دفاع يتعلم للمبتدئين، ضد الجاب المستقيم.', 'A first defence to teach beginners against straight jabs.'],
    [
      ['الكف الخلفي قدام الدقن ومفتوح شوية.', 'Rear palm open slightly in front of the chin.'],
      ['حرّك الكف لبرة حركة قصيرة لما الجاب يوصل.', 'Push the jab aside with a short palm movement as it arrives.'],
      ['رد بجاب أو ١-٢ فورًا.', 'Answer immediately with a jab or 1-2.'],
      ['ارجع للحراسة.', 'Return to guard.']
    ],
    [['ماتمدش الإيد لقدام تدوّر على اللكمة.', 'Do not reach out to find the punch.']]),

  T('boxing_high_guard', 'boxing', 'defense', 'beginner',
    ['الجارد العالي (شل دفاعي)', 'High guard shell'],
    ['القبضتين على الجبهة/الصدغ والكوعين لازقين على الضلوع، بتمتص اللكمات وتدور على فرصة الرد.', 'Gloves at the forehead/temples and elbows glued to the ribs to absorb punches while looking for a counter.'],
    ['تحت ضغط لكمات متتالية، أو وإنت محشور لحد ما تلاقي مخرج.', 'Under a flurry, or when trapped until you find an exit.'],
    [
      ['ارفع القبضتين لحد الجبهة والكوعين قافلين الجنب.', 'Raise both gloves to the forehead with elbows covering the sides.'],
      ['ضم الدقن وبص من بين القبضتين.', 'Tuck the chin and look between the gloves.'],
      ['امتص اللكمات بحركة جذع بسيطة، مش ثابت زي الحيطة.', 'Absorb with small trunk movements rather than standing like a wall.'],
      ['أول ما الخصم يوقف أو يوسع، رد بجملة قصيرة واطلع بزاوية.', 'As soon as he pauses or goes wide, counter with a short combination and angle out.']
    ],
    [['الجارد مش مكان تقعد فيه — ده محطة قبل الرد.', 'The shell is a waypoint, not a place to live.']]),

  T('boxing_philly_shell', 'boxing', 'defense', 'advanced',
    ['الفيلي شل (الكتف الأمامي)', 'Philly shell (shoulder roll)'],
    ['الإيد الأمامية منخفضة على البطن، والكتف الأمامي بيحمي الدقن، والإيد الخلفية على الخد. الرد بالكروس بعد رول الكتف.', 'Lead hand low across the stomach, lead shoulder protects the chin, rear hand at the cheek; counter with the cross after the shoulder roll.'],
    ['لملاكم متقدم عنده قراءة مسافة ممتازة، ضد خصم بيعتمد على الكروس.', 'For an advanced boxer with excellent distance reading, against opponents who lead with the cross.'],
    [
      ['اقف أجنب شوية والإيد الأمامية على البطن.', 'Stand more bladed with the lead arm across the stomach.'],
      ['مع كروس الخصم، لف الكتف الأمامي لفوق والدقن وراه.', 'On his cross, roll the lead shoulder up with the chin behind it.'],
      ['الوزن يروح على الرجل الخلفية وبعدين يرجع.', 'Weight shifts to the rear leg, then returns.'],
      ['رد بكروس فورًا من الوضع المحمّل.', 'Fire the cross back from the loaded position.']
    ],
    [['مكشوف للهوك الأمامي بتاع الخصم وللأبركات — محتاج خبرة.', 'Leaves you exposed to the lead hook and uppercut — needs experience.']]),

  T('boxing_clinch', 'boxing', 'defense', 'intermediate',
    ['الكلينش (الاحتضان) والخروج', 'Clinch and exit'],
    ['تربط دراعات الخصم عشان توقف هجومه أو تاخد نفس، وتطلع بزاوية أو لكمة لما الحكم يفصل أو قبلها.', 'Tie up the opponent’s arms to stop his attack or recover, then exit with an angle or punch on the break.'],
    ['وإنت متأذي أو تعبان، أو ضد خصم أقصر بيشتغل من قريب.', 'When hurt or tired, or against a shorter inside fighter.'],
    [
      ['ادخل للمسافة القريبة جدًا بعد جملة أو لكمة.', 'Step in tight behind a punch.'],
      ['اربط دراع الخصم تحت إبطك أو امسك دراعاته من فوق (أوفرهوك).', 'Trap his arm under your armpit or control both arms over the top.'],
      ['حط وزنك عليه وراسك جنب راسه عشان تتعبه.', 'Lean your weight on him with your head beside his.'],
      ['مع الفصل، اطلع بزاوية أو لكمة قصيرة بعد الأمر.', 'On the break, exit on an angle or throw a short shot after the command.']
    ],
    [['الكلينش المتكرر بدون ضرب ممكن ياخد عليه إنذار.', 'Repeated holding without punching can draw a warning.']]),

  T('boxing_ring_cutting', 'boxing', 'game_plan', 'intermediate',
    ['قفل الحلبة (رينج كاتنج)', 'Cutting off the ring'],
    ['بدل ما تجري ورا الخصم المتحرك، بتمشي بخطوات جانبية تقفل عليه الزوايا لحد ما يتحشر على الحبال أو الكورنر.', 'Instead of following a mover, step laterally to cut off his escape routes until he is trapped on the ropes or in a corner.'],
    ['ضد ملاكم حركي (آوت بوكسر) بيلف حوالين الحلبة.', 'Against an outboxer circling the ring.'],
    [
      ['خليك في النص تقريبًا وماتمشيش وراه في دايرة.', 'Hold the centre and do not follow him in a circle.'],
      ['اتحرك بخطوة جانبية في نفس اتجاه حركته عشان تقفل الطريق.', 'Step laterally in the direction he is moving to cut the path.'],
      ['استخدم الجاب والجملة للبطن عشان توقف حركته.', 'Use the jab and body shots to stop his feet.'],
      ['لما يتحشر، اشتغل جمل قصيرة وماتسيبش مخرج.', 'Once trapped, work short combinations and deny the exit.'],
      ['لو لف، غيّر الزاوية تاني بدل ما تطارده.', 'If he escapes, re-cut the angle rather than chasing.']
    ],
    [['رجلك الأمامية تقفل الجهة اللي عايز يهرب منها.', 'Your lead foot blocks the side he wants to escape to.']]),

  T('boxing_rope_escape', 'boxing', 'defense', 'intermediate',
    ['الخروج من الحبال بالدوران', 'Pivot off the ropes'],
    ['بدل ما تفضل محشور، بتصد وتلف على رجلك الأمامية عشان تبدّل المكان مع الخصم.', 'Instead of staying trapped, block and pivot on the lead foot to swap positions with the opponent.'],
    ['لما ضهرك على الحبال أو في الكورنر.', 'With your back on the ropes or in a corner.'],
    [
      ['اقفل الجارد وامتص أول جملة.', 'Shell up and absorb the first burst.'],
      ['اضرب لكمة قصيرة (جاب أو هوك) عشان توقف الخصم.', 'Throw a short punch to freeze him.'],
      ['لف على بطن الرجل الأمامية للجهة المفتوحة.', 'Pivot on the ball of the lead foot toward the open side.'],
      ['هو دلوقتي على الحبال — اشتغل أو ارجع للنص.', 'He is now on the ropes — attack or return to the centre.']
    ]),

  T('boxing_feint_1_2', 'boxing', 'attack', 'intermediate',
    ['خداع الجاب ثم كروس', 'Feint jab, cross'],
    ['حركة خداع بالكتف أو الإيد بتخلي الخصم يرد فعل، وبعدين الكروس بتنزل في الوقت اللي هو بيتحرك فيه.', 'A shoulder or hand feint draws a reaction, then the cross lands during that reaction.'],
    ['ضد خصم بيرد بسرعة على أي جاب (بيصد أو بيكاونتر).', 'Against an opponent who reacts quickly to every jab.'],
    [
      ['اعمل حركة جاب نصها بالكتف والإيد.', 'Show half a jab with the shoulder and hand.'],
      ['راقب رد فعله: رفع جارد، خطوة لورا، أو كاونتر.', 'Watch his reaction: guard lift, step back or counter.'],
      ['اضرب الكروس في الفتحة اللي حصلت.', 'Throw the cross into the gap he created.'],
      ['كمّل بهوك أو اطلع.', 'Add a hook or exit.']
    ]),

  T('boxing_1_6_3_2', 'boxing', 'combination', 'advanced',
    ['جملة ١-٦-٣-٢ (جاب - أبركات خلفي - هوك - كروس)', '1-6-3-2 (jab - rear uppercut - lead hook - cross)'],
    ['جملة للمسافة القريبة بتفتح الجارد من تحت بالأبركات وبعدين من الجنب بالهوك.', 'An inside combination that splits the guard from below with the uppercut, then from the side with the hook.'],
    ['ضد خصم بيقفل بجارد عالي ضيق أو بيوطي راسه وهو داخل.', 'Against a tight high guard or an opponent who ducks in.'],
    [
      ['جاب للدخول.', 'Jab to step in.'],
      ['أبركات خلفي قصير بين القبضتين.', 'Short rear uppercut between the gloves.'],
      ['هوك أمامي على الجنب اللي اتفتح.', 'Lead hook to the side that opens.'],
      ['كروس في النص.', 'Cross down the middle.'],
      ['اطلع بزاوية.', 'Exit on an angle.']
    ],
    [['الأبركات من الرجلين مش من الدراع بس.', 'The uppercut comes from the legs, not just the arm.']]),

  T('boxing_vs_pressure', 'boxing', 'game_plan', 'intermediate',
    ['خطة ضد ملاكم ضاغط', 'Game plan vs a pressure fighter'],
    ['تتحكم في المسافة بالجاب والحركة الجانبية وتعاقبه على الدخول بالكاونتر والكلينش.', 'Control range with the jab and lateral movement and punish his entries with counters and clinches.'],
    ['قدام خصم أقصر أو قوي بيدخل على طول.', 'Against a shorter or stronger opponent who walks forward.'],
    [
      ['جاب مستمر في الوش وإنت بتتحرك لبرة من إيده القوية.', 'Constant jab while moving away from his power hand.'],
      ['ماتقفش على الحبال — ارجع للنص دايمًا.', 'Stay off the ropes — always reset to the centre.'],
      ['أول ما يدخل: تشيك هوك، أو ١-٢ وتلف، أو كلينش.', 'When he enters: check hook, 1-2 and pivot, or clinch.'],
      ['اضرب البطن لما يوطي عشان يدخل.', 'Punish his ducking entries with body shots.'],
      ['خلّي الجولة الأخيرة بحركة أكتر لو إنت متقدم في النقط.', 'Move more in the last round if ahead on points.']
    ]),

  T('boxing_vs_southpaw', 'boxing', 'game_plan', 'intermediate',
    ['خطة أرثوذكس ضد ساوث باو', 'Orthodox vs southpaw plan'],
    ['معركة على مكان الرجل الأمامية: اللي رجله برّه بياخد زاوية الكروس الأنضف.', 'A battle for lead-foot position: whoever has the outside foot gets the cleaner cross angle.'],
    ['لما تقابل لاعب إيده اليمين قدام (ساوث باو).', 'When facing a left-handed (southpaw) stance.'],
    [
      ['حط رجلك الأمامية برّه رجله الأمامية.', 'Place your lead foot outside his lead foot.'],
      ['اتحرك لشمالك (بعيد عن كروسه الشمال).', 'Circle to your left, away from his left cross.'],
      ['الكروس اليمين مباشرة في النص هي سلاحك الأساسي.', 'The straight right down the middle is your main weapon.'],
      ['هوك أمامي على كتفه الأمامي أو من فوقه.', 'Throw the lead hook around or over his lead shoulder.'],
      ['اضرب البطن باليمين للكبد المكشوف من الناحية دي.', 'Attack his exposed body with right hands.']
    ]),

  T('boxing_body_investment', 'boxing', 'game_plan', 'intermediate',
    ['خطة الاستثمار في البطن', 'Body-investment plan'],
    ['تركيز على ضرب البطن في الجولات الأولى عشان تقلل حركة ونَفَس الخصم في الجولات الأخيرة.', 'Focus on body punching early so the opponent’s movement and breathing fade in later rounds.'],
    ['ضد خصم حركي أو في نزال طويل (٨ جولات فأكثر).', 'Against a mover or in longer fights (8 rounds or more).'],
    [
      ['الجولات الأولى: جاب للبطن وكروس للبطن مع كل دخول.', 'Early rounds: jab and cross to the body on every entry.'],
      ['اخلط بطن - راس عشان مايقفلش تحت بس.', 'Mix body-head so he cannot just cover low.'],
      ['راقب علامات التعب: إيده بتنزل، رجليه بتبطأ.', 'Watch for fatigue: hands dropping, feet slowing.'],
      ['الجولات الأخيرة: ارفع الحجم على الراس لما جارده ينزل.', 'Later rounds: increase head volume as his guard drops.']
    ])
);

/* ───────────── كيك بوكسينج ومواي تاي ───────────── */
ALL.push(
  T('kickboxing_1_2_low_kick', 'kickboxing', 'combination', 'beginner',
    ['جاب - كروس - لو كيك خلفي', 'Jab - cross - rear low kick'],
    ['الكروس بتلف الحوض وتخلي الرجل الخلفية جاهزة، فاللو كيك على فخدة الخصم الأمامية بتطلع في نفس الإيقاع.', 'The cross rotates the hips and loads the rear leg, so the low kick to the opponent’s lead thigh flows in rhythm.'],
    ['لما الخصم بيرفع الجارد للكمات وحاطط وزنه على رجله الأمامية.', 'When the opponent covers the punches with weight on his lead leg.'],
    [
      ['جاب يثبت الخصم.', 'Jab to freeze the opponent.'],
      ['كروس كاملة بلف الحوض.', 'Full cross with hip rotation.'],
      ['اطلع لبرة بالرجل الأمامية شوية ولف الرجل الخلفية لو كيك على الفخدة الخارجية.', 'Step the lead foot slightly out and swing the rear low kick into the outer thigh.'],
      ['ارجع للوقفة والإيدين فوق.', 'Recover to stance with hands up.']
    ],
    [['اضرب بالقصبة مش بالقدم.', 'Strike with the shin, not the foot.'], ['الإيد اللي على نفس جهة الركلة تنزل ورا لتوازن، والتانية على الوش.', 'Same-side arm swings back for balance; the other guards the face.']]),

  T('kickboxing_dutch_combo', 'kickboxing', 'combination', 'intermediate',
    ['الجملة الهولندية: ١-٢-٣ ولو كيك', 'Dutch combination: 1-2-3 low kick'],
    ['جملة لكمات متتالية تخلي الخصم يرفع جارده، وتختمها بلو كيك وهو ثابت. أشهر أسلوب في المدرسة الهولندية.', 'A punching flurry makes the opponent cover up, then the low kick lands while he is planted. A staple of the Dutch style.'],
    ['ضد خصم بيقفل جارده ويقف مكانه تحت الضغط.', 'Against an opponent who shells up and stands still under pressure.'],
    [
      ['جاب.', 'Jab.'],
      ['كروس.', 'Cross.'],
      ['هوك أمامي — الوزن يرجع على الرجل الأمامية وبعدين يتحول.', 'Lead hook — weight shifts back and forth.'],
      ['لو كيك خلفي على الفخدة الأمامية للخصم.', 'Rear low kick to the opponent’s lead thigh.'],
      ['ارجع للوقفة أو كمّل بجملة تانية.', 'Reset or chain into the next combination.']
    ]),

  T('kickboxing_switch_kick', 'kickboxing', 'attack', 'intermediate',
    ['سويتش كيك (ركلة بالرجل الأمامية مع تبديل)', 'Switch kick'],
    ['تبدّل الرجلين بسرعة عشان ترمي الركلة الدائرية بالرجل الأمامية بقوة الرجل الخلفية.', 'A quick stance switch lets you throw a powerful roundhouse with the lead leg.'],
    ['للبطن أو الكبد لما الخصم بيفتح جنبه، أو بعد جاب.', 'To the body or liver when the opponent opens his side, often after a jab.'],
    [
      ['جاب أو خداع بالإيد.', 'Jab or hand feint.'],
      ['بدّل الرجلين بنطة صغيرة — الأمامية ترجع والخلفية تيجي قدام.', 'Switch feet with a small hop — lead foot back, rear foot forward.'],
      ['لف على بطن الرجل الواقفة وارمي الركلة الدائرية.', 'Pivot on the ball of the standing foot and throw the roundhouse.'],
      ['رجّع الرجل لوقفتك الأصلية.', 'Return the leg to your original stance.']
    ],
    [['التبديل صغير وسريع — مايبانش.', 'Keep the switch small and fast so it does not telegraph.']]),

  T('kickboxing_teep', 'kickboxing', 'defense', 'beginner',
    ['التيب (الركلة الأمامية الدافعة)', 'Teep (push kick)'],
    ['ركلة أمامية دافعة بباطن القدم في البطن أو الحوض بتوقف الخصم وتحافظ على المسافة.', 'A front push kick with the ball/sole of the foot to the stomach or hips to stop the opponent and keep range.'],
    ['ضد خصم بيضغط ولاعب قدام بسرعة، أو لكسر إيقاعه.', 'Against an aggressive forward pressure fighter, or to break his rhythm.'],
    [
      ['ارفع ركبة الرجل الأمامية لمستوى الحوض.', 'Lift the lead knee to hip height.'],
      ['ادفع القدم لقدام في بطن الخصم مع دفع الحوض.', 'Drive the foot into his stomach with a hip push.'],
      ['رجّع الرجل بسرعة لنفس المكان.', 'Retract the leg quickly to the same place.'],
      ['كمّل بجاب - كروس أو اطلع بزاوية.', 'Follow with a jab-cross or angle off.']
    ]),

  T('kickboxing_check_counter', 'kickboxing', 'counter', 'intermediate',
    ['صد اللو كيك بالقصبة (تشيك) وكاونتر', 'Check the low kick and counter'],
    ['ترفع القصبة تستقبل ركلة الخصم، وترد فورًا وهو لسه على رجل واحدة.', 'Raise the shin to block the kick and counter while he is still on one leg.'],
    ['ضد خصم بيعتمد على اللو كيك.', 'Against a heavy low kicker.'],
    [
      ['اقرا لف حوض الخصم.', 'Read his hip turn.'],
      ['ارفع ركبتك الأمامية لبرة شوية والقصبة تقابل ركلته.', 'Lift the lead knee slightly out so your shin meets his kick.'],
      ['نزّل الرجل لقدام مش لورا.', 'Plant the foot forward, not back.'],
      ['اضرب كروس أو ١-٢ فورًا.', 'Fire a cross or 1-2 immediately.']
    ],
    [['الإيدين فوق وإنت بتصد — الخصم ممكن يدمج لكمة.', 'Keep the hands up while checking — he may double up with a punch.']]),

  T('kickboxing_catch_kick', 'kickboxing', 'counter', 'intermediate',
    ['مسك الركلة والرد', 'Catch the kick and counter'],
    ['تمسك الركلة الدائرية للبطن وترد بلكمة أو بكنس (سويب) حسب القانون.', 'Catch a body roundhouse and counter with a punch or a sweep, depending on the rules.'],
    ['ضد ركلات البطن المتكررة. في قواعد K-1 مسموح مسكة لحظية ورد واحد بس، وفي المواي تاي المسك والكنس مسموحين.', 'Against repeated body kicks. K-1 rules allow only a momentary catch with one strike; Muay Thai allows catches and sweeps.'],
    [
      ['امتص الركلة بالكوع والجنب مع لف بسيط.', 'Absorb the kick with elbow and side, turning slightly.'],
      ['لفّ دراعك حوالين الرجل وامسكها.', 'Wrap the arm around the leg to trap it.'],
      ['اضرب كروس فورًا أو اكنس رجل الارتكاز بلو كيك.', 'Throw an immediate cross or sweep the standing leg with a low kick.'],
      ['سيب الرجل وارجع للوقفة.', 'Release and reset.']
    ]),

  T('kickboxing_muay_thai_clinch_knees', 'kickboxing', 'attack', 'intermediate',
    ['مواي تاي: الكلينش (بلم) والركب', 'Muay Thai: plum clinch and knees'],
    ['تمسك رقبة الخصم بالإيدين فوق بعض، تكسر وقفته وتضرب ركب للبطن والضلوع.', 'Clasp both hands behind the opponent’s head, break his posture and drive knees into the body and ribs.'],
    ['في قواعد المواي تاي (الكلينش المفتوح)، ضد خصم بيدخل قريب.', 'Under Muay Thai rules (open clinch), against an opponent who comes close.'],
    [
      ['ادخل بعد جملة وحط الإيدين ورا راس الخصم (مش ورا الرقبة).', 'Enter behind a combination and place both hands on the back of his head.'],
      ['الكوعين يضغطوا على ترقوته عشان يقفل دراعاته برة.', 'Squeeze the elbows onto his collarbones to keep his arms outside.'],
      ['اسحب راسه لتحت وحرّكه يمين وشمال عشان يفقد توازنه.', 'Pull the head down and steer him side to side to off-balance him.'],
      ['اضرب ركبة مستقيمة أو دائرية وإنت ساحبه.', 'Throw straight or curved knees as you pull.'],
      ['اكسر بكوع أو اسحبه للأرض (سويب) واطلع.', 'Break with an elbow or turn him to the canvas, then exit.']
    ]),

  T('kickboxing_muay_thai_teep_plan', 'kickboxing', 'game_plan', 'intermediate',
    ['مواي تاي: خطة التحكم بالتيب والركلات', 'Muay Thai: teep-and-kick control plan'],
    ['في المواي تاي الحكام بيقدّروا التوازن والركلات النضيفة والتحكم أكتر من كتر اللكمات، فالخطة بتعتمد على التيب والركلة الدائرية والظهور مسيطر.', 'Muay Thai judges reward balance, clean kicks and control more than punch volume, so the plan relies on the teep, roundhouse and looking dominant.'],
    ['في نزال ٥ جولات بقواعد المواي تاي.', 'In a five-round Muay Thai bout.'],
    [
      ['الجولة الأولى: قراءة الخصم بالتيب والجاب.', 'Round 1: read the opponent with teeps and jabs.'],
      ['الجولتين ٢ و٣: ركلات دائرية للبطن وتشيك كل لو كيك.', 'Rounds 2-3: body roundhouses and check every low kick.'],
      ['اكسب الكلينش وماتتقلبش.', 'Win the clinch exchanges and never get turned.'],
      ['الجولة ٤: الجولة الحاسمة غالبًا — أعلى شدة.', 'Round 4: usually decisive — highest intensity.'],
      ['الجولة ٥: لو متقدم، تيب ومسافة وتحكم.', 'Round 5: if ahead, teep, distance and control.']
    ]),

  T('kickboxing_muay_thai_elbow', 'kickboxing', 'counter', 'advanced',
    ['مواي تاي: صد الجاب ثم كوع', 'Muay Thai: parry the jab, elbow'],
    ['تحوّل الجاب وتدخل للمسافة القريبة جدًا وتضرب كوع أفقي أو صاعد.', 'Parry the jab, step into close range and land a horizontal or rising elbow.'],
    ['في قواعد المواي تاي فقط (الكوع ممنوع في الكيك بوكسينج و K-1)، ضد خصم بيجاب من بعيد.', 'Muay Thai rules only (elbows are illegal in kickboxing and K-1), against a long-range jabber.'],
    [
      ['باري للجاب بالكف الخلفي.', 'Parry the jab with the rear palm.'],
      ['خطوة لقدام برجلك الأمامية للمسافة القريبة.', 'Step in with the lead foot to close range.'],
      ['كوع خلفي أفقي أو كوع أمامي صاعد للدقن.', 'Rear horizontal elbow or lead rising elbow to the chin.'],
      ['امسك كلينش أو اطلع.', 'Clinch or exit.']
    ]),

  T('kickboxing_body_head_kick', 'kickboxing', 'combination', 'advanced',
    ['كروس للبطن ثم هاي كيك', 'Cross to the body, high kick'],
    ['تنزل الجارد بلكمة للبطن، وبعدين ركلة دائرية عالية للراس في الفتحة.', 'Drag the guard down with a body punch, then kick high into the gap.'],
    ['ضد خصم بينزل كوعه يحمي بطنه.', 'Against an opponent who drops his elbows to protect the body.'],
    [
      ['جاب للوش.', 'Jab to the face.'],
      ['انزل واضرب كروس للبطن.', 'Level change and cross to the body.'],
      ['اطلع وسويتش كيك أو ركلة خلفية عالية للراس.', 'Rise into a switch kick or rear high kick to the head.'],
      ['رجّع الرجل وارفع الإيدين.', 'Retract the leg and hands up.']
    ]),

  T('kickboxing_low_kick_plan', 'kickboxing', 'game_plan', 'intermediate',
    ['خطة تكسير الرجل الأمامية', 'Lead-leg chopping plan'],
    ['تركيز على لو كيك متكرر على نفس الرجل عشان تقلل حركة الخصم وقوة لكماته.', 'Repeated low kicks to the same leg to cut the opponent’s movement and punching power.'],
    ['ضد خصم ما بيعرفش يتشيك أو واقف وزنه على رجله الأمامية.', 'Against an opponent who does not check or stands heavy on his lead leg.'],
    [
      ['ادخل اللو كيك في آخر كل جملة لكمات.', 'Finish every punching combination with a low kick.'],
      ['نوّع: فخدة خارجية، فخدة داخلية، سمانة.', 'Vary targets: outer thigh, inner thigh, calf.'],
      ['راقب علامات الأذى: الرجل بترتفع، بيغير الوقفة.', 'Watch for damage: the leg lifts early or he switches stance.'],
      ['لما يتأذى، زوّد الركلات واضغط.', 'Once hurt, increase kick volume and pressure.']
    ]),

  T('kickboxing_feint_kick_cross', 'kickboxing', 'attack', 'intermediate',
    ['خداع بالركلة ثم كروس', 'Feint kick, cross'],
    ['تبيّن إنك رايح تركل عشان الخصم ينزل إيده أو يرفع رجله للتشيك، وتضرب كروس.', 'Show a kick so the opponent drops his hand or lifts to check, then land the cross.'],
    ['ضد خصم بيتشيك كل ركلة أو بينزل إيده.', 'Against someone who checks every kick or drops his hands.'],
    [
      ['لف الحوض كأنك رايح ترمي لو كيك.', 'Turn the hips as if throwing a low kick.'],
      ['وقف الحركة لما الخصم يرد فعل.', 'Stop as he reacts.'],
      ['اضرب كروس أو ١-٢ وهو على رجل واحدة.', 'Throw the cross or 1-2 while he stands on one leg.']
    ]),

  T('kickboxing_spinning_back_kick', 'kickboxing', 'counter', 'advanced',
    ['ركلة خلفية دوّارة ضد خصم مندفع', 'Spinning back kick counter'],
    ['ركلة خلفية بعد لف بتستقبل الخصم وهو داخل بسرعة على البطن.', 'A spinning back kick meets the rushing opponent in the body.'],
    ['ضد خصم بيطارد في خط مستقيم.', 'Against an opponent who chases in a straight line.'],
    [
      ['خطوة لورا تسحب الخصم لقدام.', 'Step back to draw him forward.'],
      ['لف على الرجل الأمامية والعين على الخصم من فوق الكتف.', 'Spin on the lead foot, looking over the shoulder at the target.'],
      ['ادفع الكعب في بطنه في خط مستقيم.', 'Drive the heel into his body in a straight line.'],
      ['كمّل اللفة وارجع للوقفة.', 'Complete the turn and return to stance.']
    ],
    [['العين تسبق الجسم في اللفة.', 'The eyes lead the spin.']])
);

/* ───────────── فنون قتالية مختلطة (MMA) ───────────── */
ALL.push(
  T('mma_punch_double_leg', 'mma', 'combination', 'intermediate',
    ['١-٢ ثم دبل ليج', '1-2 into double leg'],
    ['اللكمات بتخلي الخصم يرفع الجارد ويقف مستقيم، فالنزول للرجلين بيبقى مستخبي ورا الكروس.', 'Punches make the opponent raise his guard and stand tall, hiding the level change behind the cross.'],
    ['ضد خصم بيصد اللكمات بالجارد العالي أو بيرد بكاونتر.', 'Against an opponent who covers high or counters punches.'],
    [
      ['جاب - كروس للراس.', 'Jab-cross to the head.'],
      ['مع رجوع الكروس، انزل بالركب (تغيير مستوى).', 'As the cross returns, change levels with the knees.'],
      ['خطوة اختراق (بينتريشن ستيب) والراس على صدره والإيدين ورا الركب.', 'Penetration step with the head on his chest and hands behind the knees.'],
      ['اسحب الركب وادفع بالكتف ولف ناحية الجنب.', 'Pull the knees, drive with the shoulder and turn the corner.'],
      ['انزل فوقه في الجارد أو نص الجارد وثبّت.', 'Land in his guard or half guard and establish control.']
    ],
    [['غيّر المستوى وإنت لسه بعيد عن رد الركبة.', 'Change level before you enter knee range.']]),

  T('mma_cage_single_leg', 'mma', 'attack', 'intermediate',
    ['مصارعة القفص: تثبيت ثم سنجل ليج', 'Cage wrestling: pin and single leg'],
    ['تزق الخصم على القفص تقفل حركته، وبعدين تنزل على رجل واحدة وتخلصها بعيد عن القفص.', 'Pin the opponent to the fence to kill his movement, then drop to a single leg and finish away from the cage.'],
    ['لما الخصم ضهره للقفص أو في الكلينش.', 'When the opponent’s back is on the fence or in the clinch.'],
    [
      ['ادفع الخصم للقفص وراسك تحت دقنه ووزنك عليه.', 'Drive him to the fence with your head under his chin and weight on him.'],
      ['اتحكم في دراع (أندرهوك) وبعدين انزل للرجل الأمامية.', 'Secure an underhook, then drop to the near leg.'],
      ['اقفل إيديك حوالين الرجل وارفعها بين رجليك.', 'Lock your hands around the leg and lift it between your legs.'],
      ['اسحبه بعيد عن القفص ولف أو اعمل تريب (سحب رجل الارتكاز).', 'Pull him off the fence and run the pipe or trip the standing leg.'],
      ['ثبّت فوقه وخد وضع السيطرة.', 'Land on top and consolidate.']
    ]),

  T('mma_body_lock_trip', 'mma', 'attack', 'intermediate',
    ['بودي لوك على القفص ثم تريب', 'Body lock trip on the cage'],
    ['تقفل إيديك حوالين وسط الخصم، تسحب حوضه بعيد عن القفص وتشيل رجله من تحت.', 'Lock the hands around the waist, pull the hips off the fence and trip the leg out.'],
    ['في الكلينش على القفص لما تكون عندك أندرهوك أو دبل أندر.', 'In the cage clinch when you have an underhook or double unders.'],
    [
      ['اقفل الإيدين (جريب) تحت دراعاته حوالين الوسط.', 'Clasp hands around his waist under his arms.'],
      ['اسحب وسطه ناحيتك وصدرك لازق فيه.', 'Pull his hips into you, chest to chest.'],
      ['لف رجلك ورا رجله (أوتسايد تريب) أو اضرب رجله من جوه.', 'Hook behind his leg (outside trip) or reap from inside.'],
      ['ميّل بوزنك لنفس الجهة وانزل فوقه.', 'Drive your weight in that direction and land on top.']
    ]),

  T('mma_sprawl_and_brawl', 'mma', 'game_plan', 'intermediate',
    ['سبرول آند براول (دفاع المصارعة والوقوف)', 'Sprawl and brawl'],
    ['خطة للاعب الضارب: يمنع أي نزول للأرض ويرجع يقف بسرعة عشان يكسب في الوقوف.', 'A striker’s plan: stop every takedown and get back up fast to win on the feet.'],
    ['ضد مصارع أو لاعب جيو جيتسو ضعيف في الوقوف.', 'Against a wrestler or grappler who is weaker on the feet.'],
    [
      ['خليك في النص بعيد عن القفص.', 'Stay in the centre, away from the fence.'],
      ['وقفة أوطى شوية والإيد الأمامية جاهزة تصد الراس.', 'Slightly lower stance, lead hand ready to frame the head.'],
      ['مع أي نزول: سبرول ورجّع الرجلين لورا والحوض على الأرض.', 'On any shot: sprawl, kick the legs back and drive hips down.'],
      ['خد أندرهوك ولف واطلع واقف.', 'Win an underhook, circle out and stand.'],
      ['عاقبه على الدخول بأبركات أو ركبة (حسب القانون) وكاونتر.', 'Punish entries with uppercuts, knees (where legal) and counters.']
    ]),

  T('mma_sprawl_front_headlock', 'mma', 'defense', 'intermediate',
    ['سبرول وفرونت هيدلوك', 'Sprawl to front headlock'],
    ['بعد السبرول تتحكم في راس الخصم ودراعه وتختار: جيوتين، ترجع تقف، أو تلف وراه.', 'After the sprawl, control the head and an arm and choose: guillotine, stand up, or go behind.'],
    ['لما الخصم يدخل على رجليك وراسه يوطى.', 'When the opponent shoots in with his head low.'],
    [
      ['سبرول بالحوض لتحت والرجلين لورا.', 'Sprawl with hips down and legs back.'],
      ['لف دراعك حوالين راسه (فرونت هيدلوك) والإيد التانية تمسك دراعه.', 'Wrap his head in a front headlock and control an arm.'],
      ['حط وزنك على راسه وخليه يتعب.', 'Sag your weight onto his head.'],
      ['اختار: خنقة جيوتين، أو تلف وراه وتاخد ضهره، أو تزقه وتقف.', 'Choose: guillotine, spin behind to his back, or push off and stand.']
    ]),

  T('mma_ground_and_pound', 'mma', 'attack', 'intermediate',
    ['جراوند آند باوند من الجارد', 'Ground and pound from guard'],
    ['تقعد معتدل جوه جارد الخصم وتضرب لكمات وكيعان (حسب القانون) مع الحذر من الخنقات والمفاصل.', 'Posture up inside the opponent’s guard and strike with punches and elbows (where legal) while staying safe from submissions.'],
    ['وإنت فوق في الجارد المقفول أو نص الجارد.', 'On top in closed guard or half guard.'],
    [
      ['ثبّت إيديك على الوسط أو البطن واطلع بضهرك معتدل.', 'Post on his hips/belly and posture up.'],
      ['خلّي ركبك واسعة ووزنك في حوضه.', 'Knees wide, weight into his hips.'],
      ['اضرب لكمات قصيرة وكوع وماتسيبش إيدك في مكانها.', 'Throw short punches and elbows without leaving your arms extended.'],
      ['لما يحاول يمسك إيدك أو يقفل رجليه، افتح الجارد وعدّي للجنب أو المونت.', 'When he grabs your arm or locks his legs, open the guard and pass to side control or mount.'],
      ['كمّل الضرب من الوضع الأحسن.', 'Continue striking from the better position.']
    ],
    [['ماتنزلش راسك جوه جارده — دي خنقة مثلث.', 'Do not drop your head inside his guard — that is a triangle waiting to happen.']]),

  T('mma_takedown_chain', 'mma', 'combination', 'advanced',
    ['سلسلة نزول: دبل ليج ثم سنجل ثم تريب', 'Takedown chain: double to single to trip'],
    ['لو أول محاولة اتصدت، تتحول للتانية على طول من غير ما تفصل.', 'If the first attempt is stuffed, flow straight into the next without disengaging.'],
    ['ضد خصم دفاعه كويس بيصد النزول الأول بالسبرول أو بالقفص.', 'Against a good defensive wrestler who sprawls or uses the fence.'],
    [
      ['دبل ليج.', 'Shoot the double leg.'],
      ['لما يسبرول، سيب رجل وامسك التانية (سنجل ليج).', 'When he sprawls, release one leg and switch to the single.'],
      ['ارفع الرجل واقف على رجليك.', 'Lift the leg and come up to your feet.'],
      ['اضرب رجل الارتكاز بتريب أو اسحبها (أنكل بيك).', 'Trip or pick the standing ankle.'],
      ['انزل فوقه وثبّت.', 'Finish on top and consolidate.']
    ]),

  T('mma_catch_kick_takedown', 'mma', 'counter', 'intermediate',
    ['مسك الركلة ونزول', 'Catch the kick to takedown'],
    ['تمسك الركلة الدائرية للبطن وتكنس رجل الارتكاز أو تدفع لقدام وتنزل الخصم.', 'Catch a body kick and sweep or drive through the standing leg to take him down.'],
    ['ضد لاعب كيك بوكسينج بيرمي ركلات بطن كتير.', 'Against a kickboxer throwing frequent body kicks.'],
    [
      ['امتص الركلة وامسك الرجل تحت دراعك.', 'Absorb the kick and trap the leg under your arm.'],
      ['اتحرك لقدام ناحيته وارفع الرجل لفوق.', 'Step into him and lift the leg high.'],
      ['اكنس رجل الارتكاز برجلك أو ادفعه لورا.', 'Sweep his standing leg or drive him backward.'],
      ['انزل في نص الجارد أو فوقه مباشرة.', 'Land in half guard or on top.']
    ]),

  T('mma_wall_walk', 'mma', 'defense', 'intermediate',
    ['الوقوف على القفص (وول ووك)', 'Wall walk (getting up on the cage)'],
    ['لما تكون تحت وضهرك للقفص، تستخدمه يسندك عشان تقوم وتفصل.', 'When you are down with your back to the fence, use it as support to stand and separate.'],
    ['بعد نزول وإنت قاعد أو ضهرك للقفص.', 'After a takedown when you are seated against the fence.'],
    [
      ['ضهرك للقفص، خد أندرهوك وحط الإيد التانية على رسغه.', 'Back to the fence, win an underhook and control his wrist.'],
      ['حط كفوف رجليك قريب من حوضك.', 'Plant your feet close to your hips.'],
      ['اطلع بكتفك وضهرك على القفص لفوق.', 'Walk your shoulders up the fence.'],
      ['لما تقف، لف ناحية الأندرهوك واطلع للنص.', 'Once standing, turn toward the underhook side and circle out.']
    ]),

  T('mma_mount_escape', 'mma', 'defense', 'beginner',
    ['الهروب من المونت (أوبا)', 'Mount escape (upa / bridge and roll)'],
    ['تقفل دراع ورجل الخصم على جهة وتعمل جسر بالحوض وتقلبه.', 'Trap the opponent’s arm and leg on one side, bridge and roll him over.'],
    ['وإنت تحت الخصم وهو راكب فوقك (المونت).', 'When mounted by the opponent.'],
    [
      ['احمي وشك وخلّي الكوعين قريبين.', 'Protect your face and keep elbows tight.'],
      ['امسك دراعه من الكوع وثبته على صدرك.', 'Trap one of his arms at the elbow against your chest.'],
      ['حط رجلك على رجله من نفس الجهة (اقفلها).', 'Block his foot on the same side with your foot.'],
      ['جسر عالي بالحوض ناحية الكتف المقفول واقلبه.', 'Bridge high over the trapped shoulder and roll him.'],
      ['تبقى جوه جارده — اطلع بضهرك واضرب أو قوم.', 'You land in his guard — posture, strike or stand.']
    ]),

  T('mma_back_take_rnc', 'mma', 'attack', 'advanced',
    ['أخذ الضهر وخنقة خلفية (RNC)', 'Back take to rear-naked choke'],
    ['لما الخصم يقوم من تحتك أو يلف، تاخد ضهره بالهوكس وتخلص بخنقة خلفية.', 'When the opponent turns or stands from bottom, take his back with hooks and finish the rear-naked choke.'],
    ['في الاسكرامبل أو لما الخصم يدّي ضهره عشان يقوم.', 'In scrambles or when he gives his back to get up.'],
    [
      ['امسك الوسط من ورا (بودي لوك) أو سيت بيلت (دراع فوق ودراع تحت).', 'Secure a body lock or seat belt grip (one arm over, one under).'],
      ['حط الهوك الأول بعدين التاني جوه فخاده.', 'Insert the first hook, then the second, inside his thighs.'],
      ['اضرب لكمات لحد ما يرفع إيده.', 'Strike until he lifts his hands.'],
      ['ادخل الدراع تحت الدقن والتانية ورا الراس واقفل.', 'Slide the arm under the chin, the other behind the head, and lock.'],
      ['اعصر بالكوعين والصدر لقدام.', 'Squeeze elbows together and expand the chest.']
    ]),

  T('mma_wrestler_plan', 'mma', 'game_plan', 'intermediate',
    ['خطة المصارع: ضغط، نزول، سيطرة', 'Wrestler’s plan: pressure, takedown, control'],
    ['تضغط بالضربات عشان تقفل المسافة، تثبت الخصم على القفص وتنزله، وتكسب الجولة بالسيطرة والجراوند آند باوند.', 'Pressure with strikes to close distance, pin to the fence, take down and win the round with control and ground-and-pound.'],
    ['للاعب مصارعة أو جيو جيتسو قدام ضارب أفضل منه.', 'For a wrestler or grappler facing a better striker.'],
    [
      ['اضغط لقدام بالجاب والفينت، ماتقفش في مسافة الضارب.', 'Walk forward behind jabs and feints; do not stand at the striker’s range.'],
      ['اوصل للقفص أو للكلينش.', 'Get to the fence or clinch.'],
      ['سلسلة نزول متواصلة لحد ما ينزل.', 'Chain takedowns until he goes down.'],
      ['تحكم فوقه واضرب وعدّي للوضع الأحسن.', 'Control on top, strike and pass to better positions.'],
      ['لو قام، ارجع للقفص تاني.', 'If he stands, return him to the fence.']
    ])
);

/* ───────────── جودو ───────────── */
ALL.push(
  T('judo_kumikata_basic', 'judo', 'game_plan', 'beginner',
    ['كوميكاتا: المسكة الأساسية (كم وياقة)', 'Kumikata: standard sleeve-lapel grip'],
    ['الإيد الساحبة (هيكيتي) على الكم عند الكوع، والإيد الرافعة (تسوريتي) على الياقة. أساس السيطرة على توازن الخصم.', 'Pulling hand (hikite) on the sleeve at the elbow, lifting hand (tsurite) on the lapel. The basis of controlling the opponent’s balance.'],
    ['في بداية كل تبادل، وفي تعليم المبتدئين قبل أي رمية.', 'At the start of every exchange, and for beginners before any throw.'],
    [
      ['ادخل بالإيد الرافعة الأول على الياقة عند مستوى الصدر.', 'Take the lapel first with the lifting hand at chest level.'],
      ['خد الكم تحت الكوع بالإيد الساحبة.', 'Take the sleeve below the elbow with the pulling hand.'],
      ['حافظ على وقفة معتدلة (شيزنتاي) والركب مثنية شوية.', 'Keep a natural upright posture (shizentai) with soft knees.'],
      ['اشتغل كوزوشي (إخلال التوازن) بالسحب والدفع قبل الرمية.', 'Work kuzushi (off-balancing) by pulling and pushing before throwing.'],
      ['هاجم خلال ثواني من أخذ المسكة.', 'Attack within seconds of establishing the grip.']
    ],
    [['المسك من غير هجوم لفترة بياخد إنذار سلبية (شيدو).', 'Holding without attacking draws a passivity penalty (shido).']]),

  T('judo_grip_break', 'judo', 'defense', 'beginner',
    ['كسر مسكة الخصم', 'Breaking the opponent’s grip'],
    ['تفك مسكة الخصم المسيطرة بسرعة قبل ما يعمل كوزوشي عليك، وتاخد مسكتك إنت.', 'Strip the opponent’s dominant grip before he can off-balance you, then take your own.'],
    ['لما الخصم ياخد مسكة ياقة عالية أو مسكة الضهر.', 'When the opponent secures a high collar or back grip.'],
    [
      ['اتحكم في رسغ الإيد اللي ماسكاك بالإيدين.', 'Control the gripping wrist with both hands.'],
      ['اكسر بحركة حادة لتحت ولبرة مع سحب الجسم لورا.', 'Strip with a sharp downward-outward movement while turning the body away.'],
      ['خد مسكتك فورًا قبل ما يرجع.', 'Take your own grip immediately before he regrips.'],
      ['هاجم أو حرّك الخصم.', 'Attack or move him.']
    ],
    [['ماتكسرش بدراع واحدة وإنت واقف ثابت.', 'Do not strip one-handed while standing static.']]),

  T('judo_ai_kenka_yotsu', 'judo', 'game_plan', 'intermediate',
    ['أي يوتسو وكنكا يوتسو (نفس الجهة وعكسها)', 'Ai-yotsu vs kenka-yotsu grip strategy'],
    ['أي يوتسو: اللاعبين نفس الجهة (يمين ضد يمين). كنكا يوتسو: جهات عكس (يمين ضد شمال) وبيبقى صراع على الإيد الرافعة من برة.', 'Ai-yotsu: same stance (right vs right). Kenka-yotsu: opposite stances (right vs left), a fight for the outside lifting-hand grip.'],
    ['قبل المباراة لما تعرف جهة الخصم.', 'Before the match once you know the opponent’s stance.'],
    [
      ['حدد جهة الخصم في أول تبادل.', 'Identify his stance in the first exchange.'],
      ['في أي يوتسو: اكسب مسكة الكم الأول وسيطر على إيده الرافعة.', 'In ai-yotsu: win the sleeve first and neutralise his lifting hand.'],
      ['في كنكا يوتسو: حط إيدك الرافعة فوق إيده (من برة).', 'In kenka-yotsu: get your lifting hand on top/outside of his.'],
      ['اختار رميات تناسب الوضع: أوتشي ماتا وأوساوتو في أي يوتسو، سيوي ناجي وكوأوتشي في كنكا يوتسو.', 'Choose suitable throws: uchi-mata and osoto in ai-yotsu, seoi-nage and ko-uchi in kenka-yotsu.']
    ]),

  T('judo_ouchi_uchimata', 'judo', 'combination', 'intermediate',
    ['رينراكو: أوأوتشي جاري ← أوتشي ماتا', 'Renraku: o-uchi-gari to uchi-mata'],
    ['أوأوتشي جاري بيخلي الخصم يرجع رجله ويوزن لقدام، فتدخل أوتشي ماتا في رد فعله.', 'O-uchi-gari makes the opponent step back and lean forward, and uchi-mata enters on that reaction.'],
    ['في أي يوتسو ضد خصم بيدافع بسحب رجله لورا.', 'In ai-yotsu against an opponent who defends by withdrawing the leg.'],
    [
      ['كوزوشي لورا وجنب بالإيدين.', 'Kuzushi back and to the side with both hands.'],
      ['أوأوتشي جاري: احصد رجله القريبة من جوه.', 'O-uchi-gari: reap his near leg from the inside.'],
      ['هو يسحب رجله ويميل لقدام ليحافظ على توازنه.', 'He withdraws the leg and leans forward to recover.'],
      ['لف بسرعة وادخل رجلك بين رجليه وارفع (أوتشي ماتا) مع سحب الكم.', 'Turn in quickly, drive your leg between his and lift (uchi-mata) with a strong sleeve pull.'],
      ['كمّل الرمية ولف معاه.', 'Complete the throw with rotation.']
    ]),

  T('judo_kouchi_seoi', 'judo', 'combination', 'intermediate',
    ['رينراكو: كوأوتشي جاري ← سيوي ناجي', 'Renraku: ko-uchi-gari to seoi-nage'],
    ['كوأوتشي بيخلي الخصم يرفع رجله ويدفع لقدام، فتلف تحت منه بسيوي ناجي.', 'Ko-uchi makes him lift the foot and push forward, so you drop under him with seoi-nage.'],
    ['ضد خصم طويل أو في كنكا يوتسو.', 'Against a taller opponent or in kenka-yotsu.'],
    [
      ['اسحب الخصم لقدام شوية.', 'Draw the opponent forward slightly.'],
      ['كوأوتشي جاري على كعب رجله القريبة من جوه.', 'Ko-uchi-gari sweeping the heel of his near foot from inside.'],
      ['يرفع رجله ويرجع لقدام.', 'He lifts the foot and comes forward.'],
      ['لف تحت منه وإنت نازل بالركب (سيوي ناجي).', 'Turn in low with bent knees for seoi-nage.'],
      ['اسحب الكم وارمي فوق الكتف.', 'Pull the sleeve and throw over the shoulder.']
    ]),

  T('judo_ouchi_kouchi', 'judo', 'combination', 'beginner',
    ['رينراكو: أوأوتشي جاري ← كوأوتشي جاري', 'Renraku: o-uchi-gari to ko-uchi-gari'],
    ['حصدين من الداخل على رجلين مختلفتين، كل واحد بيجهز التاني.', 'Two inside reaps on different legs, each setting up the other.'],
    ['تعليم الرينراكو للمبتدئين، ضد خصم واقف ورجليه واسعة.', 'Teaching renraku to beginners; against a wide-stanced opponent.'],
    [
      ['كوزوشي لورا.', 'Kuzushi backward.'],
      ['أوأوتشي على رجله الشمال (للاعب يمين).', 'O-uchi on his left leg (for a right-handed player).'],
      ['يسحب رجله ويحط وزنه على اليمين.', 'He pulls the leg away, weight onto the right.'],
      ['كوأوتشي على رجله اليمين وادفع لورا.', 'Ko-uchi on his right foot and drive back.']
    ]),

  T('judo_uchimata_kenken', 'judo', 'attack', 'advanced',
    ['أوتشي ماتا كِن كِن (بالنط)', 'Uchi-mata ken-ken (hopping)'],
    ['لو الخصم قاوم أوتشي ماتا، تكمّل بالنط على رجل الارتكاز لحد ما يفقد توازنه.', 'If the opponent resists uchi-mata, hop on the supporting leg until his balance breaks.'],
    ['لما الرمية دخلت بس الخصم ثابت.', 'When the throw is in but the opponent is anchored.'],
    [
      ['ادخل أوتشي ماتا ورجلك بين رجليه.', 'Enter uchi-mata with your leg between his.'],
      ['خلّي رجلك الرافعة مرفوعة جوه ووزنه عليها.', 'Keep your reaping leg lifted inside with his weight on it.'],
      ['انط برجل الارتكاز لقدام خطوات صغيرة.', 'Hop forward on the supporting leg in small steps.'],
      ['مع كل نطة اسحب الكم ولف الراس للجهة المعاكسة.', 'With each hop pull the sleeve and turn your head away.'],
      ['كمّل الرمية لما يفقد توازنه.', 'Finish once he loses balance.']
    ]),

  T('judo_uchimata_sukashi', 'judo', 'counter', 'advanced',
    ['أوتشي ماتا سوكاشي (تفادي ورد)', 'Uchi-mata sukashi'],
    ['تتفادى رجل الخصم الرافعة وتخليها تعدي في الفراغ، وتقلبه في اتجاه حركته.', 'Evade the attacker’s reaping leg so it swings through air, then turn him over in the direction of his own momentum.'],
    ['ضد لاعب بيعتمد على أوتشي ماتا.', 'Against a habitual uchi-mata thrower.'],
    [
      ['حس بالدخول والرجل الرافعة جاية بين رجليك.', 'Feel the entry as the reaping leg comes between yours.'],
      ['اقفل رجليك وحرّك حوضك لورا عشان رجله تعدي في الفراغ.', 'Close your legs and shift hips back so his leg swings through.'],
      ['لفه بإيديك في نفس اتجاه حركته.', 'Rotate him with your hands in the direction he is already moving.'],
      ['كمّل على الأرض لو ماوقعش على ضهره.', 'Continue into newaza if he does not land on his back.']
    ]),

  T('judo_osoto_gaeshi', 'judo', 'counter', 'intermediate',
    ['أوسوتو جايشي (رد الأوسوتو)', 'Osoto-gaeshi'],
    ['لما الخصم يهاجم أوسوتو جاري وهو مش مخلخل توازنك، تثبت وترد عليه بنفس الرمية.', 'When the opponent attacks osoto-gari without breaking your balance, anchor and reverse it with the same throw.'],
    ['ضد أوسوتو جاري ضعيف الكوزوشي.', 'Against an osoto-gari with poor kuzushi.'],
    [
      ['انزل بالحوض والركب واثبت أول ما يدخل.', 'Drop your hips and knees and anchor as he enters.'],
      ['امسكه قريب من صدرك.', 'Hold him tight to your chest.'],
      ['ارفع رجلك واحصد رجل الارتكاز بتاعته.', 'Reap his supporting leg with yours.'],
      ['وجّهه لورا على ضهره.', 'Drive him backward onto his back.']
    ]),

  T('judo_tachi_to_newaza', 'judo', 'transition', 'intermediate',
    ['التحول من الوقوف للأرض (تاتشي واذا ← ني واذا)', 'Transition from tachi-waza to newaza'],
    ['بعد رمية ماجابتش إيبون، تنزل على طول لتثبيت (أوساي كومي) أو خنقة قبل ما الخصم يفلت.', 'After a throw that does not score ippon, follow straight down into a hold (osaekomi) or strangle before the opponent escapes.'],
    ['بعد أي رمية وقع فيها الخصم على جنبه أو بطنه.', 'After any throw where the opponent lands on his side or front.'],
    [
      ['ماتسيبش الكم بعد الرمية.', 'Keep the sleeve grip after the throw.'],
      ['انزل على طول جنب الخصم وصدرك على صدره.', 'Drop immediately beside him, chest to chest.'],
      ['ثبّت بكيسا جاتامي أو يوكو شيهو جاتامي.', 'Pin with kesa-gatame or yoko-shiho-gatame.'],
      ['حافظ على التثبيت ٢٠ ثانية للإيبون (١٠ ثواني = وازاري).', 'Hold 20 seconds for ippon (10 seconds = waza-ari).']
    ],
    [['السرعة أهم من الشكل — الحكم بيدي وقت قصير في النيواذا.', 'Speed matters more than form — the referee allows little newaza time.']]),

  T('judo_turtle_attack', 'judo', 'attack', 'advanced',
    ['مهاجمة الخصم في وضع السلحفاة', 'Attacking the turtle'],
    ['الخصم على بطنه وركبه مقفول؛ تقلبه على ضهره للتثبيت أو تدخل خنقة من ورا.', 'The opponent is face down on knees and elbows; turn him onto his back for a hold or attack a strangle from behind.'],
    ['بعد رمية فاشلة للخصم وهو نزل يحمي نفسه.', 'After the opponent drops to his knees defensively.'],
    [
      ['روح لجنب الخصم مش قدامه.', 'Go to his side, not his front.'],
      ['ادخل إيد تحت دراعه البعيد وامسك ياقته أو حزامه.', 'Thread a hand under his far arm and grip the lapel or belt.'],
      ['اقلبه على ضهره بلف جسمك (رول).', 'Roll him over by rotating your body.'],
      ['ثبّت فورًا أو ادخل خنقة أوكوري إيري جيمي من الضهر.', 'Pin immediately or attack okuri-eri-jime from the back.']
    ])
);

/* ───────────── مصارعة ───────────── */
ALL.push(
  T('wrestling_double_leg', 'wrestling', 'attack', 'beginner',
    ['الدبل ليج (الرجلين)', 'Double leg takedown'],
    ['نزول على الرجلين الاتنين بخطوة اختراق ودفع بالكتف.', 'Takedown on both legs using a penetration step and shoulder drive.'],
    ['ضد خصم واقف مستقيم أو بيتقدم لقدام.', 'Against an upright opponent or one stepping forward.'],
    [
      ['اعمل تحضير (هاند فايت أو سناب) عشان يرفع راسه.', 'Set up with hand fighting or a snap so his head comes up.'],
      ['انزل بالركب مع الضهر معتدل.', 'Change levels with the knees, back straight.'],
      ['خطوة اختراق والركبة الأمامية تنزل بين رجليه.', 'Penetration step with the lead knee dropping between his feet.'],
      ['راسك على جنب صدره والإيدين ورا الركب.', 'Head on the side of his chest, hands behind his knees.'],
      ['اطلع برجلك الخلفية لقدام ولف الزاوية (رن ذا كورنر) وانزله.', 'Step up with the trail leg, turn the corner and finish.']
    ],
    [['الراس فوق والضهر مستقيم — مش بتوطي.', 'Head up and back straight — do not bend over.']]),

  T('wrestling_single_leg', 'wrestling', 'attack', 'beginner',
    ['السنجل ليج (رجل واحدة)', 'Single leg takedown'],
    ['تمسك رجل الخصم الأمامية، ترفعها وتخلّص بسحب أو لف أو تريب.', 'Grab the opponent’s lead leg, lift it and finish by running the pipe, turning or tripping.'],
    ['ضد خصم رجله الأمامية قدام زيادة.', 'Against an opponent with an extended lead leg.'],
    [
      ['انزل وادخل على الرجل الأمامية وراسك على جنبها الخارجي.', 'Drop and shoot to the lead leg with your head on the outside.'],
      ['اقفل إيديك حوالين الرجل واطلع واقف.', 'Lock hands around the leg and come to your feet.'],
      ['ارفع الرجل بين فخادك.', 'Lift the leg between your thighs.'],
      ['خلّص: رن ذا بايب (لف وسحب لتحت) أو تريب لرجل الارتكاز.', 'Finish: run the pipe or trip the standing leg.']
    ]),

  T('wrestling_single_to_double', 'wrestling', 'combination', 'intermediate',
    ['سلسلة: سنجل ← دبل', 'Chain: single leg to double leg'],
    ['لو الخصم دافع السنجل بالبعد برجله الأخرى، تسيب وتمسك الرجلين.', 'If he defends the single by stepping the other leg back or wide, switch to the double.'],
    ['ضد دفاع السنجل بالحركة.', 'Against a single leg defended with movement.'],
    [
      ['ادخل سنجل ليج.', 'Shoot the single leg.'],
      ['لما يلف بعيد أو يحط وزنه على الرجل التانية، ادخل إيدك الفاضية ورا ركبته التانية.', 'As he circles or loads the other leg, reach the free hand behind his far knee.'],
      ['ادفع بالكتف في وسطه.', 'Drive the shoulder into his hips.'],
      ['لف الزاوية وانزله.', 'Turn the corner and finish.']
    ]),

  T('wrestling_sprawl', 'wrestling', 'defense', 'beginner',
    ['السبرول (دفاع النزول)', 'Sprawl'],
    ['ترمي رجليك لورا وتحط حوضك ووزنك على ضهر الخصم عشان توقف النزول.', 'Throw the legs back and drop hips and weight on the opponent’s upper back to stop the shot.'],
    ['ضد أي محاولة نزول على الرجلين.', 'Against any leg attack.'],
    [
      ['الإيدين تصد راسه أو كتافه (كروس فيس / فريم).', 'Hands frame his head or shoulders.'],
      ['ارمي الرجلين لورا وواسعة.', 'Kick the legs back and wide.'],
      ['حوضك ينزل على الأرض ووزنك عليه.', 'Drop your hips to the mat, weight on him.'],
      ['اتحكم في الراس وروح للفرونت هيدلوك أو لف وراه.', 'Control the head and move to front headlock or go behind.']
    ],
    [['الحوض لتحت — مش لفوق.', 'Hips down, not up.']]),

  T('wrestling_front_headlock', 'wrestling', 'combination', 'intermediate',
    ['سلسلة الفرونت هيدلوك', 'Front headlock series'],
    ['من السناب داون أو السبرول، تتحكم في راس ودراع الخصم وتختار نقطة: لف وراه، أو قلب، أو خنقة (في الـMMA).', 'From a snap-down or sprawl, control head and arm and choose: spin behind, turn, or choke (in MMA).'],
    ['لما الخصم يوطي راسه أو يدخل بدون تحضير.', 'When the opponent drops his head or shoots without a setup.'],
    [
      ['سناب داون: اسحب راسه لتحت من الرقبة.', 'Snap down: pull his head down by the neck.'],
      ['اقفل الفرونت هيدلوك: دراع حوالين الراس والتانية تمسك دراعه فوق الكوع.', 'Lock the front headlock: one arm around the head, the other controlling his arm above the elbow.'],
      ['اتحرك بزاوية على جنب الدراع المقفولة.', 'Move to the angle on the side of the trapped arm.'],
      ['لف وراه (سبين بيهايند) للنقط، أو في الحرة: جاتور رول للتعريض.', 'Spin behind for points, or in freestyle use a gator roll for exposure.']
    ]),

  T('wrestling_ankle_pick', 'wrestling', 'attack', 'intermediate',
    ['أنكل بيك (سحب الكاحل)', 'Ankle pick'],
    ['تسحب راس الخصم لقدام عشان يحط وزنه على رجله الأمامية، وتمسك كاحلها.', 'Pull the opponent’s head forward so he loads his lead leg, then pick that ankle.'],
    ['ضد خصم بيقف مستقيم ووزنه على الرجل الأمامية.', 'Against an upright opponent with weight on the lead leg.'],
    [
      ['امسك رقبته (كولار تاي) واسحبه لقدام.', 'Take a collar tie and pull him forward.'],
      ['خطوة جانبية وانزل.', 'Step to the side and level change.'],
      ['امسك الكاحل وادفع بإيد الرقبة لورا.', 'Grab the ankle while pushing the head back with the collar hand.'],
      ['هو يقع على ضهره أو جنبه — اتحكم.', 'He falls to his back or side — take control.']
    ]),

  T('wrestling_arm_drag', 'wrestling', 'attack', 'intermediate',
    ['آرم دراج (سحب الدراع) للضهر', 'Arm drag to the back'],
    ['تسحب دراع الخصم عبر جسمك وتطلع على جنبه أو ضهره.', 'Drag the opponent’s arm across your body to get to his side or back.'],
    ['لما الخصم يمد إيده لمسكة أو يدفع.', 'When the opponent reaches or pushes.'],
    [
      ['امسك رسغه بالإيد المعاكسة.', 'Grab his wrist with your opposite hand.'],
      ['الإيد التانية تمسك فوق الكوع (الترايسبس).', 'Your other hand grips above the elbow (triceps).'],
      ['اسحب الدراع عبر جسمك وخطوة لبرة.', 'Pull the arm across and step outside.'],
      ['اطلع على جنبه وخد الضهر أو نزّل.', 'Come to his side, take the back or finish a takedown.']
    ]),

  T('wrestling_duck_under', 'wrestling', 'attack', 'intermediate',
    ['داك أندر (الدخول تحت الدراع)', 'Duck under'],
    ['تدخل راسك تحت دراع الخصم الماسكة رقبتك وتطلع وراه.', 'Duck your head under the opponent’s arm that is tying your neck and come out behind him.'],
    ['لما الخصم ماسك كولار تاي وبيدفع.', 'When the opponent has a collar tie and is leaning in.'],
    [
      ['ارفع كوعه اللي ماسك رقبتك.', 'Lift the elbow of his collar-tie arm.'],
      ['انزل وادخل راسك تحت الدراع.', 'Drop and slide your head under the arm.'],
      ['راسك تزق دراعه لفوق وإنت بتلف.', 'Your head drives his arm up as you circle.'],
      ['اقفل الوسط من ورا (ريير بودي لوك) وانزله.', 'Lock a rear body lock and take him down.']
    ]),

  T('wrestling_gut_wrench', 'wrestling', 'attack', 'intermediate',
    ['جت رنش (القلب من الأرض)', 'Gut wrench (par terre)'],
    ['في وضع الأرض (بار تير) تقفل إيديك حوالين وسط الخصم وتقلبه على ضهره للتعريض.', 'In par terre, lock hands around the opponent’s waist and turn him through danger for exposure points.'],
    ['في المصارعة الحرة والرومانية لما الخصم على بطنه أو ركبه.', 'In freestyle and Greco when the opponent is on his stomach or knees.'],
    [
      ['روح لجنبه وادخل إيديك حوالين وسطه تحت الضلوع.', 'Go to his side and lock hands around his waist below the ribs.'],
      ['صدرك لازق في جنبه وركبك قريبة.', 'Chest tight to his side, knees close.'],
      ['ارفع وسطه ولف عليه بجسمك في اتجاه راسه.', 'Lift his hips and roll across toward his head.'],
      ['كمّل اللفة لو ينفع قلبة تانية.', 'Continue rolling for repeat turns.']
    ]),

  T('wrestling_leg_lace', 'wrestling', 'attack', 'advanced',
    ['ليج ليس (قفل الرجلين) في الحرة', 'Leg lace (freestyle)'],
    ['تقفل رجلين الخصم في بعض من وضع الأرض وتقلبه مرات متتالية للتعريض.', 'Lock the opponent’s ankles from par terre and roll him repeatedly for exposure.'],
    ['المصارعة الحرة فقط (الرومانية ممنوع فيها مسك الرجلين).', 'Freestyle only (Greco-Roman forbids holds below the waist).'],
    [
      ['روح ناحية رجلين الخصم وهو على بطنه.', 'Move to the opponent’s legs while he is on his stomach.'],
      ['اقفل كاحليه بين دراعك وصدرك (أو بإيدين مقفولة).', 'Lock his ankles between your arms and chest.'],
      ['ارفع رجليه ولف على جنبك.', 'Lift his legs and roll to your side.'],
      ['كل لفة كاملة = نقطتين تعريض.', 'Each full roll scores 2 exposure points.']
    ]),

  T('wrestling_greco_body_lock', 'wrestling', 'attack', 'advanced',
    ['الرومانية: بودي لوك ورمي', 'Greco-Roman: body lock and throw'],
    ['تقفل إيديك حوالين وسط الخصم من قدام، تشيله وترميه بتقوّس الضهر (سوبلكس) أو لف.', 'Lock around the opponent’s waist, lift and throw with a back arch (suplex) or turn.'],
    ['في المصارعة الرومانية لما تكسب دبل أندرهوك.', 'In Greco-Roman when you win double underhooks.'],
    [
      ['اكسب الأندرهوكس الاتنين وقفل الإيدين ورا ضهره.', 'Win double underhooks and lock hands behind his back.'],
      ['اسحب وسطه لوسطك (هيب تو هيب).', 'Pull his hips into yours.'],
      ['انزل بالركب تحت مركز ثقله.', 'Drop your hips below his centre of mass.'],
      ['ارفعه بالرجلين وقوّس الضهر ولف راسك للجنب.', 'Lift with the legs, arch and turn your head to the side.'],
      ['هبّط عليه وامسك التعريض.', 'Land on top and hold the exposure.']
    ],
    [['رمية عالية الخطورة — تتعلم على مرتبة وبعد إتقان الأساسيات.', 'High-risk throw — teach on crash mats after fundamentals are solid.']]),

  T('wrestling_hand_fight_plan', 'wrestling', 'game_plan', 'intermediate',
    ['خطة الضغط والهاند فايت', 'Hand-fighting pressure plan'],
    ['تضغط لقدام وتكسب معركة الإيدين عشان الخصم يتعب ويتراجع (سلبية) وتفتح النزول.', 'Walk forward and win the hand fight so the opponent tires and backs up (passivity), creating takedown openings.'],
    ['ضد خصم لياقته أقل أو بيحب يستنى.', 'Against a less-fit opponent or a counter wrestler.'],
    [
      ['خطوة لقدام مستمرة وسيطرة على النص.', 'Constant forward steps and control of the centre.'],
      ['اكسب مسكة الرسغ والكولار تاي.', 'Win wrist control and collar ties.'],
      ['سناب داون متكرر عشان يرفع راسه.', 'Repeated snap-downs to make him lift his head.'],
      ['هاجم لما يتراجع أو يرفع راسه.', 'Shoot when he retreats or lifts his head.'],
      ['في الحرة والرومانية: ضغط منطقة الحماية بيجيب نقطة السلبية/الخروج.', 'In freestyle/Greco, pushing him out of the zone earns passivity/step-out points.']
    ])
);

/* ───────────── كاراتيه (كوميتيه) ───────────── */
ALL.push(
  T('karate_kizami_gyaku', 'karate', 'combination', 'beginner',
    ['كيزامي زوكي ← جياكو زوكي', 'Kizami-zuki to gyaku-zuki'],
    ['لكمة أمامية سريعة بتقفل المسافة أو تشتت، وبعدها لكمة عكسية بقوة الحوض — أشهر جملة في الكوميتيه.', 'A fast lead punch closes distance or distracts, followed by a hip-driven reverse punch — the most common kumite combination.'],
    ['من المسافة المتوسطة لما الخصم بيرد على الكيزامي بالصد.', 'From mid range when the opponent reacts to the kizami by blocking.'],
    [
      ['من الكاماي، انزلاق لقدام مع كيزامي زوكي جودان.', 'From kamae, slide forward with kizami-zuki jodan.'],
      ['اسحب الإيد الأمامية لهيكيتي وإنت بتلف الحوض.', 'Pull the lead hand back (hikite) as the hips rotate.'],
      ['جياكو زوكي تشودان أو جودان بتحكم (كيمي).', 'Gyaku-zuki chudan or jodan with control (kime).'],
      ['زانشين: ارجع للمسافة والتركيز مستمر.', 'Zanshin: return to distance with continued awareness.']
    ],
    [['اللكمة المسجلة لازم تكون بتحكم ومسافة صحيحة وزانشين.', 'A scoring punch needs control, correct distance and zanshin.']]),

  T('karate_deai_gyaku', 'karate', 'counter', 'intermediate',
    ['دي آي: جياكو زوكي لحظة دخول الخصم', 'Deai: gyaku-zuki on the opponent’s entry'],
    ['تضرب في نفس لحظة بداية هجوم الخصم (سين نو سين) قبل ما لكمته توصل.', 'Strike at the very moment the opponent starts his attack (sen no sen), before his technique arrives.'],
    ['ضد خصم بيهاجم بإيقاع متوقع أو بخطوة كبيرة.', 'Against an opponent with a predictable rhythm or big step-in.'],
    [
      ['حافظ على المسافة على طرف هجومه.', 'Hold distance at the edge of his attack range.'],
      ['اقرا بداية الحركة (الكتف أو الرجل الأمامية).', 'Read the start of movement (shoulder or lead foot).'],
      ['انزل شوية واضرب جياكو زوكي تشودان وإنت ثابت.', 'Drop slightly and fire gyaku-zuki chudan on the spot.'],
      ['اطلع بزاوية أو ارجع لورا.', 'Exit on an angle or back out.']
    ]),

  T('karate_jodan_mawashi', 'karate', 'attack', 'intermediate',
    ['خداع باللكمة ← جودان ماواشي جيري (٣ نقط)', 'Punch feint to jodan mawashi-geri (3 points)'],
    ['الخصم يرفع الجارد أو يرجع من خداع اللكمة، والركلة الدائرية للراس بتاخد إيبون (٣ نقط) حسب قانون WKF.', 'The opponent reacts to a punch feint and the roundhouse to the head scores ippon (3 points) under WKF rules.'],
    ['ضد خصم بيرد على اللكمات بالصد العالي أو بخطوة لورا في خط مستقيم.', 'Against an opponent who high-blocks punches or retreats in a straight line.'],
    [
      ['خداع كيزامي زوكي.', 'Feint a kizami-zuki.'],
      ['ارفع ركبة الرجل الأمامية أو الخلفية لفوق وجنب.', 'Chamber the knee high and to the side.'],
      ['لف على رجل الارتكاز واضرب بمشط القدم في الراس بتحكم.', 'Pivot on the supporting foot and strike the head with the instep under control.'],
      ['رجّع الرجل وزانشين.', 'Retract and show zanshin.']
    ]),

  T('karate_kizami_chudan_geri', 'karate', 'combination', 'intermediate',
    ['كيزامي زوكي ← تشودان ماواشي جيري (نقطتين)', 'Kizami-zuki to chudan mawashi-geri (2 points)'],
    ['اللكمة الأمامية بترفع جارد الخصم، والركلة للبطن بتاخد وازاري (نقطتين).', 'The lead punch lifts the guard and the body kick scores waza-ari (2 points).'],
    ['ضد خصم بيرفع إيده على اللكمات.', 'Against an opponent who raises his hands to punches.'],
    [
      ['كيزامي زوكي جودان.', 'Kizami-zuki jodan.'],
      ['وهو بيصد لفوق، ارفع الركبة الخلفية.', 'As he blocks high, chamber the rear knee.'],
      ['ماواشي جيري تشودان على البطن أو الجنب.', 'Mawashi-geri chudan to the stomach or side.'],
      ['زانشين.', 'Zanshin.']
    ]),

  T('karate_sweep_score', 'karate', 'attack', 'advanced',
    ['آشي باراي (كنس) ← تقنية على الأرض', 'Ashi-barai sweep to a finishing technique'],
    ['تكنس رجل الخصم الأمامية ولما يقع تسجّل تقنية بتحكم = إيبون (٣ نقط).', 'Sweep the opponent’s lead foot and score a controlled technique on the fallen opponent for ippon (3 points).'],
    ['ضد خصم وزنه على رجله الأمامية أو واقف ثابت.', 'Against a front-weighted or static opponent.'],
    [
      ['امسك كم أو دراع الخصم (مسموح لحظيًا للتقنية).', 'Take a brief grip on the sleeve or arm (allowed momentarily for the technique).'],
      ['اكنس رجله الأمامية من برة لجوه عند الكاحل.', 'Sweep his lead ankle from outside in.'],
      ['اسحب الدراع ناحيتك ليقع.', 'Pull the arm to take him down.'],
      ['جياكو زوكي أو لكمة لتحت بتحكم فورًا.', 'Immediately deliver a controlled downward gyaku-zuki.']
    ]),

  T('karate_kick_counter', 'karate', 'counter', 'intermediate',
    ['خطوة لورا ثم جياكو زوكي ضد الركلة', 'Step back and gyaku-zuki vs a kick'],
    ['تخلي ركلة الخصم تقع قصيرة بخطوة لورا، وترد بجياكو زوكي وهو بينزل رجله.', 'Let the kick fall short with a step back and counter with gyaku-zuki as the leg lands.'],
    ['ضد لاعب بيعتمد على الركلات الدائرية.', 'Against a roundhouse-kick specialist.'],
    [
      ['حافظ على مسافة مسحوبة شوية.', 'Keep slightly long distance.'],
      ['مع ركلته، خطوة انزلاق لورا.', 'On his kick, slide back.'],
      ['وهو بينزل رجله، ادخل انزلاق لقدام.', 'As his foot lands, slide forward.'],
      ['جياكو زوكي تشودان.', 'Gyaku-zuki chudan.']
    ]),

  T('karate_senshu_plan', 'karate', 'game_plan', 'intermediate',
    ['خطة المسافة والسينشو', 'Distance and senshu plan'],
    ['في قانون WKF أول نقطة بدون رد من الخصم بتدي "سينشو" (أفضلية عند التعادل)، فالخطة تبدأ بمسافة محسوبة وهدف أول نقطة نضيفة.', 'Under WKF rules the first unopposed point gives senshu (tie-break advantage), so the plan starts with controlled distance and aiming for the first clean score.'],
    ['في مباريات الكوميتيه ٣ دقايق.', 'In three-minute kumite bouts.'],
    [
      ['أول ٣٠ ثانية: قراءة إيقاع الخصم وتوقيته.', 'First 30 seconds: read his rhythm and timing.'],
      ['هاجم بتقنية واحدة واثقة لأول نقطة.', 'Attack with one committed technique for the first point.'],
      ['بعد السينشو: مسافة وحركة وكاونتر.', 'After senshu: distance, movement and counters.'],
      ['لو متأخر: زوّد الخداع والهجمات المركّبة.', 'If behind: increase feints and combination attacks.'],
      ['آخر ١٥ ثانية: ماتهربش — الهروب ممكن ياخد عقوبة وتخسر السينشو.', 'Final 15 seconds: avoid fleeing — it can be penalised and cost senshu.']
    ])
);

/* ───────────── تايكوندو ───────────── */
ALL.push(
  T('taekwondo_bandal', 'taekwondo', 'attack', 'beginner',
    ['بندال تشاجي بالرجل الأمامية للجذع', 'Front-leg bandal chagi to the trunk'],
    ['ركلة دائرية سريعة بالرجل الأمامية على واقي الصدر (نقطتين حسب قانون World Taekwondo).', 'A fast lead-leg roundhouse to the trunk protector (2 points under World Taekwondo rules).'],
    ['أساس التسجيل؛ لما الخصم في وقفة مقفولة ومسافة قريبة.', 'The basic scoring kick; when the opponent is in closed stance at close range.'],
    [
      ['من الوقفة الجانبية، خطوة صغيرة أو انزلاق للمسافة.', 'From side stance, take a small step or slide into range.'],
      ['ارفع الركبة الأمامية بسرعة.', 'Snap the lead knee up.'],
      ['لف رجل الارتكاز واضرب بمشط القدم على الواقي.', 'Pivot the supporting foot and hit the protector with the instep.'],
      ['ارجع للوقفة فورًا.', 'Recover to stance immediately.']
    ]),

  T('taekwondo_double_kick', 'taekwondo', 'combination', 'intermediate',
    ['دوبال دانجسانج (ركلة مزدوجة)', 'Dubal dangsang (double roundhouse)'],
    ['ركلتين دائريتين متتاليتين برجلين مختلفتين في الهوا أو بنطة، بتلاحق الخصم لما يرجع.', 'Two alternating roundhouse kicks in quick succession, chasing the opponent as he retreats.'],
    ['ضد خصم بيرجع لورا بعد الركلة الأولى.', 'Against an opponent who backs away from the first kick.'],
    [
      ['بندال بالرجل الخلفية للجذع.', 'Rear-leg bandal to the trunk.'],
      ['وإنت بتنزلها، ابدأ الرجل التانية بنطة.', 'As it lands, launch the other leg with a hop.'],
      ['بندال تاني للجذع أو للراس.', 'Second bandal to the trunk or head.'],
      ['ارجع للوقفة.', 'Recover.']
    ]),

  T('taekwondo_cut_kick', 'taekwondo', 'defense', 'beginner',
    ['كت كيك (ركلة القطع الأمامية)', 'Cut kick (front-leg push)'],
    ['ترفع الرجل الأمامية وتقطع دخول الخصم بدفعة في الجذع أو الحوض.', 'Lift the lead leg and cut off the opponent’s entry with a push to the trunk or hips.'],
    ['ضد خصم بيهجم لقدام أو بيحضّر ركلة خلفية.', 'Against an opponent rushing in or chambering a rear-leg kick.'],
    [
      ['اقرا الخطوة الأولى للخصم.', 'Read his first step.'],
      ['ارفع الركبة الأمامية على طول.', 'Lift the lead knee immediately.'],
      ['ادفع بباطن القدم في جذعه.', 'Push with the sole into his trunk.'],
      ['كمّل ببندال أو ارجع.', 'Follow with a bandal or reset.']
    ]),

  T('taekwondo_back_kick_counter', 'taekwondo', 'counter', 'intermediate',
    ['دويت تشاجي (ركلة خلفية) كاونتر', 'Dwit chagi (back kick) counter'],
    ['ركلة خلفية دوّارة على الجذع وقت هجوم الخصم. الركلة الدوّارة على الجذع بتاخد ٤ نقط.', 'A spinning back kick to the trunk as the opponent attacks. A turning kick to the trunk scores 4 points.'],
    ['ضد خصم بيهجم ببندال بالرجل الخلفية في خط مستقيم.', 'Against rear-leg bandal attacks in a straight line.'],
    [
      ['حافظ على وقفة مقفولة ومسافة متوسطة.', 'Hold closed stance at mid range.'],
      ['مع بداية ركلته، لف على الرجل الأمامية والعين على الهدف.', 'As he starts his kick, spin on the lead foot with eyes on target.'],
      ['ادفع الكعب في خط مستقيم في جذعه.', 'Drive the heel straight into his trunk.'],
      ['كمّل اللفة وارجع للوقفة.', 'Complete the turn and recover.']
    ]),

  T('taekwondo_front_head_kick', 'taekwondo', 'attack', 'advanced',
    ['ركلة الراس بالرجل الأمامية بعد خداع', 'Front-leg head kick after a feint'],
    ['تخدع بركلة للجذع عشان الخصم ينزل إيده أو يصد تحت، وبعدين ركلة للراس بنفس الرجل (٣ نقط).', 'Feint a trunk kick so the opponent lowers his guard, then kick the head with the same leg (3 points).'],
    ['ضد خصم بيصد ركلات الجذع بإيده.', 'Against an opponent who arm-blocks trunk kicks.'],
    [
      ['ارفع الركبة الأمامية كأنها بندال للجذع.', 'Chamber the lead knee as if for a trunk bandal.'],
      ['وقفها لحظة واستنى رد الفعل.', 'Pause briefly for the reaction.'],
      ['كمّل لفوق: بندال أو نيريو تشاجي (ركلة نازلة) على الراس.', 'Continue upward: bandal or naeryo chagi (axe kick) to the head.'],
      ['ارجع للوقفة.', 'Recover.']
    ]),

  T('taekwondo_spinning_hook', 'taekwondo', 'counter', 'advanced',
    ['دوي هوريو تشاجي (ركلة خطافية دوّارة للراس)', 'Dwi huryeo chagi (spinning hook to the head)'],
    ['ركلة خطافية دوّارة للراس — الركلة الدوّارة للراس بتاخد ٥ نقط.', 'A spinning hook kick to the head — a turning kick to the head scores 5 points.'],
    ['ضد خصم بيدخل بإيده نازلة أو بيطارد.', 'Against an opponent entering with a low guard or chasing.'],
    [
      ['خطوة لورا أو استنى في الوقفة المقفولة.', 'Step back or wait in closed stance.'],
      ['لف على الرجل الأمامية والعين تسبق.', 'Spin on the lead foot, eyes first.'],
      ['افرد الرجل واسحبها بالكعب على جنب الراس.', 'Extend the leg and sweep the heel across the head.'],
      ['كمّل اللفة وارجع.', 'Complete the turn and recover.']
    ]),

  T('taekwondo_cut_rear_bandal', 'taekwondo', 'combination', 'intermediate',
    ['كت كيك ← بندال بالرجل الخلفية', 'Cut kick to rear bandal'],
    ['الكت كيك بيثبت الخصم أو يرجّعه، والبندال الخلفي بيلاقيه وهو بيستعيد توازنه.', 'The cut kick stops or pushes him back, and the rear bandal lands while he regains balance.'],
    ['ضد خصم بيحب يضغط لقدام.', 'Against a forward-pressing opponent.'],
    [
      ['كت كيك في الجذع.', 'Cut kick to the trunk.'],
      ['نزّل الرجل لقدام قريب منه.', 'Land the foot forward, close to him.'],
      ['بندال بالرجل الخلفية للجذع.', 'Rear-leg bandal to the trunk.'],
      ['ارجع للوقفة.', 'Recover.']
    ]),

  T('taekwondo_stance_plan', 'taekwondo', 'game_plan', 'intermediate',
    ['خطة الوقفة المفتوحة والمقفولة', 'Open vs closed stance plan'],
    ['الوقفة المقفولة: نفس الرجل الأمامية للاعبين (صدور لنفس الجهة)، المفتوحة: رجلين أمامية مختلفة. كل وضع ليه ركلات أسهل.', 'Closed stance: both players lead with the same leg; open stance: opposite leads. Each opens different kicks.'],
    ['تحليل الخصم في أول جولة.', 'Analysing the opponent in round 1.'],
    [
      ['في الوقفة المقفولة: بندال بالرجل الأمامية على البطن، ودويت تشاجي كاونتر.', 'Closed stance: lead-leg bandal to the stomach and dwit chagi counters.'],
      ['في الوقفة المفتوحة: بندال بالرجل الخلفية على الصدر/البطن المفتوح، وركلات للراس.', 'Open stance: rear-leg bandal to the open chest/stomach and head kicks.'],
      ['غيّر الوقفة بخطوة (ستانس سويتش) عشان تجبره على الوضع اللي في صالحك.', 'Switch stance with a step to force the alignment that favours you.'],
      ['خطط لكل جولة لوحدها: الجولات بتتحسب منفصلة (الفوز بأفضل ٢ من ٣).', 'Plan round by round: rounds are scored separately (best of three).']
    ]),

  T('taekwondo_step_back_counter', 'taekwondo', 'counter', 'beginner',
    ['خطوة لورا ثم بندال مضاد', 'Step-back counter bandal'],
    ['ترجع خطوة عشان ركلة الخصم تقع قصيرة وترد ببندال وهو لسه بينزل رجله.', 'Step back so the opponent’s kick falls short, then counter with a bandal while his foot is landing.'],
    ['ضد خصم بيهاجم بركلة واحدة كبيرة.', 'Against an opponent throwing single committed kicks.'],
    [
      ['خطوة انزلاق لورا بالرجل الخلفية.', 'Slide back with the rear foot.'],
      ['ركلته تعدي قصيرة.', 'His kick falls short.'],
      ['اضرب بندال للجذع وهو بينزل.', 'Bandal to the trunk as he lands.']
    ])
);

/* ───────────── مبارزة ───────────── */
ALL.push(
  T('fencing_direct_lunge', 'fencing', 'attack', 'beginner',
    ['هجوم مباشر بالطعنة (لانج)', 'Direct attack with a lunge'],
    ['هجوم بسيط في خط مستقيم: الدراع تتمد الأول وبعدين الطعنة.', 'A simple straight-line attack: arm extends first, then the lunge.'],
    ['لما الخصم يتحرك لقدام من غير انتباه أو المسافة تكون مناسبة.', 'When the opponent steps forward carelessly or distance is right.'],
    [
      ['من وقفة الإن جارد، حدد مسافة الطعنة.', 'From en garde, judge lunge distance.'],
      ['افرد الدراع وسن السلاح ناحية الهدف.', 'Extend the arm with the point threatening the target.'],
      ['ادفع بالرجل الخلفية واطعن بالرجل الأمامية.', 'Push off the back leg and lunge with the front leg.'],
      ['ارجع للإن جارد بسرعة.', 'Recover quickly to en garde.']
    ],
    [['الدراع قبل الرجل — ده اللي بيدي الأولوية في الشيش والسيف.', 'Hand before foot — it establishes right of way in foil and sabre.']]),

  T('fencing_parry_riposte', 'fencing', 'counter', 'beginner',
    ['صد ٤ (كارت) ورد مباشر', 'Parry 4 (quarte) and riposte'],
    ['تصد هجوم الخصم على الخط الداخلي وترد فورًا باللمسة — الأولوية تنتقل ليك بعد الصد.', 'Parry the attack in the inside line and riposte immediately — right of way passes to you after the parry.'],
    ['ضد الهجوم المباشر على الصدر من الجهة الداخلية.', 'Against direct attacks to the inside line.'],
    [
      ['استنى الهجوم في الإن جارد والمسافة مسيطر عليها.', 'Wait in en garde with controlled distance.'],
      ['حرّك السلاح للداخل وخبط شفرة الخصم بجزء الشفرة القوي.', 'Move the blade inside and meet his blade with your forte.'],
      ['افرد الدراع فورًا باللمسة (ريبوست).', 'Extend immediately for the riposte.'],
      ['ارجع للإن جارد.', 'Recover to en garde.']
    ]),

  T('fencing_disengage', 'fencing', 'attack', 'intermediate',
    ['هجوم بالتحويل (ديسإنجيج)', 'Attack with a disengage'],
    ['لما الخصم يحاول يمسك أو يخبط سلاحك، تعدي من تحت شفرته للخط التاني وتطعن.', 'When the opponent tries to engage or beat your blade, pass under it to the other line and hit.'],
    ['ضد خصم بيدور على الشفرة (بيحب يعمل بيت أو إنجيجمنت).', 'Against an opponent who seeks the blade.'],
    [
      ['قرّب المسافة وخلّي الخصم يدور على شفرتك.', 'Close distance and let him look for your blade.'],
      ['وهو بيحرك شفرته، حرّك السن بحركة لولبية صغيرة من تحت.', 'As his blade moves, pass your point under it in a small spiral.'],
      ['افرد الدراع في الخط المفتوح.', 'Extend into the open line.'],
      ['اطعن.', 'Lunge.']
    ]),

  T('fencing_one_two', 'fencing', 'attack', 'intermediate',
    ['هجوم مركّب: خداع وتحويل (وان - تو)', 'Compound attack: feint-disengage (one-two)'],
    ['خداع بالتهديد في خط عشان الخصم يصد، وبعدين تحوّل للخط التاني وتطعن.', 'Threaten one line to draw a parry, then disengage into the other line and hit.'],
    ['ضد خصم بيصد بسرعة ويرد (بيصد كتير).', 'Against a fast parry-riposte fencer.'],
    [
      ['افرد الدراع تهديد في الخط الداخلي (الخداع).', 'Extend to threaten the inside line (feint).'],
      ['الخصم يتحرك للصد.', 'He moves to parry.'],
      ['حوّل السن للخط الخارجي من تحت شفرته.', 'Disengage under his blade to the outside line.'],
      ['اطعن في نفس اللحظة.', 'Lunge on the disengage.']
    ],
    [['الخداع لازم يكون مقنع — الدراع ممدودة بجد.', 'The feint must be convincing — a real extension.']]),

  T('fencing_beat_attack', 'fencing', 'attack', 'beginner',
    ['هجوم بخبطة على الشفرة (بيت)', 'Beat attack'],
    ['تخبط شفرة الخصم خبطة حادة عشان تبعدها وتاخد الأولوية، وتهجم على طول.', 'A sharp beat on the opponent’s blade clears it and takes right of way, followed by an immediate attack.'],
    ['ضد خصم ماد دراعه أو سلاحه في خط (point in line).', 'Against an opponent with arm extended or point in line.'],
    [
      ['قرّب المسافة.', 'Close distance.'],
      ['اخبط شفرته بشفرتك في جزئها الضعيف.', 'Beat his blade on its weak part with yours.'],
      ['افرد الدراع مباشرة.', 'Extend immediately.'],
      ['اطعن أو فلاش (في الشيش والإيبيه).', 'Lunge, or flèche in foil and épée.']
    ]),

  T('fencing_stop_hit', 'fencing', 'counter', 'advanced',
    ['الضربة المضادة الموقِفة (ستوب هيت)', 'Stop hit (counter-attack)'],
    ['تلمس الخصم أثناء تحضيره أو هجومه المركب. في الشيش والسيف لازم تسبق الحركة النهائية للهجوم بزمن واضح، في الإيبيه اللي يلمس الأول ياخد.', 'Hit into the opponent’s preparation or compound attack. In foil and sabre it must clearly precede the final action; in épée the first hit scores.'],
    ['ضد خصم بيحضّر بخطوات طويلة أو بيعمل خداع كتير.', 'Against long preparations or excessive feints.'],
    [
      ['حافظ على المسافة وراقب التحضير.', 'Keep distance and watch the preparation.'],
      ['مع أول حركة غير هجومية (خطوة أو خداع)، افرد الدراع.', 'On his first non-attacking movement (step or feint), extend.'],
      ['المس على الهدف الأقرب (الدراع في الإيبيه والسيف).', 'Hit the nearest target (the arm in épée and sabre).'],
      ['ارجع بعيد بسرعة.', 'Retreat out of distance.']
    ]),

  T('fencing_distance_plan', 'fencing', 'game_plan', 'intermediate',
    ['لعب المسافة (سحب الخصم وكسر الإيقاع)', 'Distance play (drawing and breaking rhythm)'],
    ['تتحكم في المسافة بالتقدم والتراجع عشان تجبر الخصم يهاجم من بعيد أو تلاقيه في المسافة الغلط.', 'Control distance with advances and retreats to force the opponent to attack short or to catch him at the wrong distance.'],
    ['في أي نزال، خصوصًا ضد خصم أسرع أو أطول.', 'Every bout, especially against a faster or taller fencer.'],
    [
      ['اتقدم وارجع بخطوات مختلفة الطول عشان تكسر إيقاعه.', 'Advance and retreat with varied step lengths to break his rhythm.'],
      ['اسحب هجومه بخطوة لورا في اللحظة الأخيرة عشان يقع قصير.', 'Draw his attack and retreat at the last moment to make him fall short.'],
      ['هاجم وهو بيسترجع (ريميز أو ريبريز).', 'Attack while he recovers (remise or reprise).'],
      ['قرب خط التحذير في آخر المضمار، ماتتراجعش أكتر — هاجم أو اصد.', 'Near the rear warning line, stop retreating — attack or parry.']
    ]),

  T('fencing_fleche', 'fencing', 'attack', 'advanced',
    ['الفلاش (الهجوم الطائر)', 'Flèche'],
    ['هجوم مفاجئ بالجري: الدراع تتمد والرجل الخلفية تعدي الأمامية واللمسة قبل ما الرجل الخلفية تلمس الأرض. ممنوع في السيف.', 'A running attack: arm extends and the back leg crosses in front, hitting before the rear foot lands. Not allowed in sabre.'],
    ['في الشيش والإيبيه ضد خصم بيتراجع ببطء أو من مسافة متوسطة.', 'In foil and épée against a slow retreater or from mid distance.'],
    [
      ['افرد الدراع أولًا.', 'Extend the arm first.'],
      ['ميّل الوزن لقدام على الرجل الأمامية.', 'Shift weight over the front leg.'],
      ['ادفع بالرجل الأمامية والخلفية تعدي.', 'Explode off the front leg as the back leg crosses.'],
      ['المس وكمّل الجري جنب الخصم من غير تصادم.', 'Hit and run past the opponent without contact.']
    ]),

  T('fencing_second_intention', 'fencing', 'counter', 'advanced',
    ['النية التانية (سكند إنتنشن)', 'Second intention'],
    ['تعمل هجوم مقصود يفشل عشان تستدرج كاونتر أو صد ورد من الخصم، وإنت مستعد تصده وترد (كاونتر ريبوست أو صد للستوب هيت).', 'Make a deliberate false attack to draw the opponent’s counter-attack or parry-riposte, then parry it and score.'],
    ['ضد خصم بيحب الستوب هيت أو الصد والرد.', 'Against habitual counter-attackers or parry-riposters.'],
    [
      ['اعمل هجوم نصه (خطوة وتمديد مش كامل).', 'Make a half-committed false attack.'],
      ['الخصم يعمل كاونتر أو صد ورد.', 'He counter-attacks or parries and ripostes.'],
      ['اصد حركته (كاونتر باري).', 'Parry his action.'],
      ['رد فورًا باللمسة.', 'Riposte immediately.']
    ])
);

/* ───────────── كرة القدم ───────────── */
ALL.push(
  T('football_433', 'football', 'system', 'beginner',
    ['طريقة ٤-٣-٣', '4-3-3 system'],
    ['٤ مدافعين، ٣ وسط (ارتكاز ٦ واتنين ٨)، ٣ مهاجمين (جناحين ورأس حربة). بتدي عرض كبير في الهجوم ومثلثات تمرير طبيعية وضغط عالي قوي.', 'Four defenders, three midfielders (a 6 and two 8s), three forwards (two wingers and a striker). Gives natural width, passing triangles and a strong high press.'],
    ['للفرق اللي بتحب الاستحواذ والضغط العالي وعندها أجنحة سريعة.', 'For possession-and-pressing teams with quick wingers.'],
    [
      ['الظهيرين يطلعوا لنص الملعب والجناحين يفتحوا على الخط أو يدخلوا للعمق.', 'Full-backs push high while wingers hold width or step inside.'],
      ['الارتكاز (٦) ينزل بين قلبي الدفاع أو قدامهم لبناء اللعب.', 'The 6 drops between or in front of the centre-backs to build up.'],
      ['لاعبي الـ٨ يتحركوا بين الخطوط ويعملوا جري داخل منطقة الجزاء.', 'The 8s occupy the half-spaces and make runs into the box.'],
      ['رأس الحربة يثبت قلبي الدفاع أو ينزل يربط.', 'The striker pins centre-backs or drops to link.'],
      ['في الدفاع: يتحول غالبًا لـ٤-٥-١ أو ٤-١-٤-١.', 'Out of possession it usually becomes 4-5-1 or 4-1-4-1.']
    ],
    [['الارتكاز الوحيد ممكن ينكشف في الهجمات المرتدة — لازم تأمين من الظهير أو الـ٨.', 'The lone 6 can be exposed on counters — cover with a full-back or an 8.']]),

  T('football_4231', 'football', 'system', 'beginner',
    ['طريقة ٤-٢-٣-١', '4-2-3-1 system'],
    ['٤ دفاع، ارتكازين (دوبل بيفوت)، ٣ خلف المهاجم (جناحين وصانع لعب ١٠)، ومهاجم صريح. متوازنة بين الدفاع والهجوم.', 'Four defenders, a double pivot, three behind the striker (two wide, a 10) and a lone striker. Balanced between defence and attack.'],
    ['لما تحتاج أمان في النص مع صانع لعب حر.', 'When you need central security plus a free creative 10.'],
    [
      ['الارتكازين: واحد يبني وواحد يغطي.', 'Double pivot: one builds, one screens.'],
      ['الـ١٠ يستلم بين خط وسط ودفاع الخصم.', 'The 10 receives between the opponent’s midfield and defence.'],
      ['الجناحين يدخلوا للعمق ويسيبوا الخط للظهير.', 'Wide players come inside and leave the flank to the full-backs.'],
      ['المهاجم يثبت ويعمل جري في الضهر.', 'The striker pins and runs in behind.'],
      ['في الدفاع: ٤-٤-٢ والـ١٠ يطلع مع المهاجم.', 'Out of possession: 4-4-2 with the 10 joining the striker.']
    ]),

  T('football_352', 'football', 'system', 'intermediate',
    ['طريقة ٣-٥-٢', '3-5-2 system'],
    ['٣ قلب دفاع، ظهيرين طائرين (وينج باك)، ٣ وسط، ومهاجمين. تفوق عددي في النص ومهاجمين ضد قلبي دفاع.', 'Three centre-backs, two wing-backs, three central midfielders and two strikers. Central overload and two strikers against two centre-backs.'],
    ['لما عندك ظهيرين لياقتهم عالية ومهاجمين بيكملوا بعض.', 'When you have high-endurance wing-backs and a complementary strike pair.'],
    [
      ['الـ٣ في الخلف يبنوا اللعب وتقدر تطلع بالقلب الجانبي.', 'The back three build play; wide centre-backs can step out with the ball.'],
      ['الوينج باك يدّي العرض كامل على الخط.', 'Wing-backs provide all the width.'],
      ['وسط ٣: ارتكاز واتنين ٨ بيدخلوا.', 'Midfield three: a holder and two runners.'],
      ['المهاجمين: واحد يثبت وواحد يتحرك.', 'Front two: one pins, one moves.'],
      ['في الدفاع يتحول لـ٥-٣-٢.', 'Defends as 5-3-2.']
    ],
    [['الضعف في الأطراف لو الوينج باك اتأخر في الرجوع.', 'Weakness on the flanks if wing-backs are late recovering.']]),

  T('football_442', 'football', 'system', 'beginner',
    ['طريقة ٤-٤-٢', '4-4-2 system'],
    ['خطين من ٤ ومهاجمين. بسيطة وواضحة، أقوى شكل دفاعي في المنطقة الوسطى والشكل المثالي لتعليم المبادئ.', 'Two banks of four and two strikers. Simple and clear — a very compact mid-block shape and ideal for teaching principles.'],
    ['للفرق اللي بتلعب دفاع منظم ومرتدات، أو في الفئات السنية.', 'For organised defending and counter-attacking teams, or youth teams.'],
    [
      ['خطين من ٤ على مسافة ١٠-١٥ متر بين الخطين.', 'Two lines of four about 10-15 m apart.'],
      ['المهاجمين يوجهوا بناء الخصم لجهة واحدة.', 'Strikers show the opponent’s build-up to one side.'],
      ['اللعب على الأطراف: الجناح والظهير (٢ ضد ١).', 'Wide play: winger and full-back create 2v1s.'],
      ['مهاجم يثبت ومهاجم ينزل أو يجري ورا.', 'One striker holds, the other drops or runs behind.']
    ]),

  T('football_high_press', 'football', 'defense', 'intermediate',
    ['الضغط العالي (هاي بريس)', 'High press'],
    ['الفريق كله يطلع يضغط على بناء الخصم في نصه، يقفل خطوط التمرير ويجبره على الكرة الطويلة أو الغلط قرب مرماه.', 'The whole team presses the opponent’s build-up in his half, blocks passing lanes and forces long balls or errors near his goal.'],
    ['ضد فريق بيبني من الخلف وقلوب دفاعه ضعيفة بالكرة.', 'Against a build-up team with weak ball-playing defenders.'],
    [
      ['المهاجم يضغط قلب الدفاع بزاوية تقفل التمرير للجهة التانية (ظل الضغط).', 'The striker presses a centre-back on a curve, cutting the switch (cover shadow).'],
      ['حدد إشارات الضغط: تمريرة للظهير، استلام وضهره للملعب، تمريرة ضعيفة.', 'Define pressing triggers: pass to the full-back, player receiving facing his goal, a poor touch.'],
      ['مع الإشارة: الجناح يضغط الظهير، والـ٨ يقفل الارتكاز، والظهير بتاعنا يطلع على جناحهم.', 'On the trigger: winger presses the full-back, 8 marks the 6, our full-back jumps their winger.'],
      ['خط الدفاع يطلع لفوق يقلل المسافات.', 'The back line steps up to stay compact.'],
      ['لو الكرة اتقطعت: هجمة سريعة على المرمى.', 'On a turnover: attack the goal immediately.']
    ],
    [['اضغط مع بعض أو ماتضغطش — الضغط الفردي بيفتح مساحات.', 'Press together or not at all — individual pressing opens gaps.']]),

  T('football_mid_block', 'football', 'defense', 'intermediate',
    ['البلوك المتوسط', 'Mid block'],
    ['الفريق يستنى في نص الملعب في شكل مضغوط (غالبًا ٤-٤-٢)، يسيب الخصم يبني ويضغط لما الكرة تدخل منطقة محددة.', 'The team waits around halfway in a compact shape (often 4-4-2), lets the opponent build and presses when the ball enters a set zone.'],
    ['لما عايز توازن بين الأمان والفرص المرتدة، أو ضد فريق أقوى فنيًا.', 'To balance security and counter chances, or against a technically superior team.'],
    [
      ['خط الضغط الأول عند نص الملعب تقريبًا.', 'First line of pressure around the halfway line.'],
      ['اقفل العمق: ماتسمحش بتمرير بين الخطوط.', 'Close the centre: deny passes between the lines.'],
      ['وجّه الكرة للخط (الطرف) واستخدم الخط كمدافع إضافي.', 'Force play wide and use the touchline as an extra defender.'],
      ['اضغط بقوة (فخ) لما الكرة تروح للطرف.', 'Trap aggressively once the ball goes wide.'],
      ['اقطع وانطلق لمرتدة.', 'Win it and break.']
    ]),

  T('football_low_block', 'football', 'defense', 'intermediate',
    ['البلوك المنخفض', 'Low block'],
    ['الفريق يرجع قريب من منطقة جزائه في خطين مضغوطين (٤-٥-١ أو ٥-٤-١)، يقفل المساحات في الضهر وبين الخطوط.', 'The team drops close to its box in two compact lines (4-5-1 or 5-4-1), closing space behind and between the lines.'],
    ['وإنت متقدم في آخر الماتش، أو ضد فريق أقوى بكتير.', 'When protecting a lead late, or against a much stronger team.'],
    [
      ['خط الدفاع على حدود منطقة الجزاء تقريبًا.', 'Back line around the edge of the box.'],
      ['خط الوسط قريب جدًا (١٠ متر أو أقل).', 'Midfield line very close (10 m or less).'],
      ['اقفل العمق وسيب العرضيات من بعيد.', 'Protect the centre and concede only deep crosses.'],
      ['ضغط على حامل الكرة قريب المنطقة وتغطية مباشرة.', 'Pressure the ball near the box with immediate cover.'],
      ['خلي مهاجم أو اتنين جاهزين للمرتدة.', 'Keep one or two outlets for the counter.']
    ]),

  T('football_gegenpress', 'football', 'transition', 'advanced',
    ['الضغط العكسي بعد فقد الكرة (جيجن بريس)', 'Counter-press (gegenpressing)'],
    ['أول ما الكرة تضيع، أقرب ٣-٤ لاعبين يضغطوا فورًا لمدة ٥-٦ ثواني عشان يرجعوها قبل ما الخصم ينظم مرتدته.', 'Immediately after losing the ball, the nearest 3-4 players press for about 5-6 seconds to win it back before the opponent can counter.'],
    ['للفرق اللي بتهاجم بأعداد كبيرة وقريبة من بعض.', 'For teams that attack with many players close together.'],
    [
      ['لحظة الفقد: أقرب لاعب يضغط حامل الكرة على طول.', 'At the moment of loss: nearest player presses the ball carrier at once.'],
      ['اللي حواليه يقفلوا أقرب خيارات التمرير.', 'Those nearby close the nearest passing options.'],
      ['الباقيين يأمنوا العمق (ريست ديفنس).', 'The rest protect the centre (rest defence).'],
      ['لو الكرة ماتقطعتش في ٥-٦ ثواني: ارجع للشكل الدفاعي أو خطأ تكتيكي.', 'If not regained in 5-6 seconds: drop into shape or take a tactical foul.']
    ]),

  T('football_rest_defence', 'football', 'transition', 'advanced',
    ['الدفاع الاحتياطي أثناء الهجوم (ريست ديفنس)', 'Rest defence'],
    ['وإنت بتهاجم، بتسيب هيكل ثابت (غالبًا ٣+٢ أو ٢+٣) ورا الكرة عشان تمنع المرتدة لو الكرة ضاعت.', 'While attacking, leave a fixed structure (often 3+2 or 2+3) behind the ball to stop counters if possession is lost.'],
    ['في أي هجوم منظم، خصوصًا ضد فريق مرتداته سريعة.', 'In every settled attack, especially against fast counter-attacking teams.'],
    [
      ['حدد مين يفضل ورا: قلبي دفاع وظهير أو ارتكاز.', 'Assign who stays: centre-backs plus a full-back or the 6.'],
      ['راقب مهاجمي الخصم: واحد زيادة عن عددهم.', 'Keep one more player than their forwards.'],
      ['خلّي مسافات قصيرة عشان الضغط العكسي.', 'Keep distances short for counter-pressing.'],
      ['لو الكرة ضاعت: اضغط أو ارجع حسب مكانك.', 'On loss: press or recover depending on your position.']
    ]),

  T('football_buildup_back', 'football', 'attack', 'intermediate',
    ['بناء اللعب من الخلف', 'Build-up from the back'],
    ['تبدأ من الحارس وقلبي الدفاع بتمريرات قصيرة عشان تسحب ضغط الخصم وتلاقي لاعب حر في الوسط.', 'Start from the goalkeeper and centre-backs with short passes to draw the press and find a free midfielder.'],
    ['ضد فريق بيضغط بعدد قليل، أو لما عندك قلوب دفاع وحارس بيعرفوا يلعبوا.', 'Against a light press, or when your keeper and centre-backs are comfortable on the ball.'],
    [
      ['قلبي الدفاع يفتحوا لعرض منطقة الجزاء والحارس في النص.', 'Centre-backs split to the width of the box with the keeper central.'],
      ['الارتكاز ينزل قدامهم أو بينهم (٣+١).', 'The 6 drops in front or between them (3+1).'],
      ['الظهيرين يطلعوا عالي ويفتحوا.', 'Full-backs push high and wide.'],
      ['مرر عشان تسحب المضغط، وبعدين العب على اللاعب الحر (الثالث).', 'Pass to draw a presser, then play to the free (third) player.'],
      ['لو الضغط قوي جدًا: كرة طويلة لرأس الحربة أو خلف ظهير الخصم.', 'If the press is too strong: go long to the striker or behind their full-back.']
    ]),

  T('football_third_man', 'football', 'combination', 'intermediate',
    ['تمريرة الرجل الثالث', 'Third-man combination'],
    ['لاعب (أ) يمرر لـ(ب) اللي يرجعها أو يحولها لـ(ج) اللي كان بيجري — (ج) بيستلم وهو مواجه للمرمى وحر.', 'Player A passes to B, who sets or lays it off to C running forward — C receives facing play and unmarked.'],
    ['لكسر ضغط الخصم أو دخول بين الخطوط.', 'To break a press or get between the lines.'],
    [
      ['(أ) قلب الدفاع يمرر لـ(ب) المهاجم النازل.', 'A (centre-back) passes into B (dropping striker).'],
      ['(ب) يرجع الكرة بلمسة واحدة لـ(ج) الـ٨.', 'B sets it first time to C (the 8).'],
      ['(ج) يستلم وهو مواجه ويمرر في العمق أو يجري بالكرة.', 'C receives facing forward and plays through or carries the ball.'],
      ['(ب) يلف ويجري في الضهر.', 'B spins and runs in behind.']
    ],
    [['توقيت جري (ج) أهم من السرعة.', 'The timing of C’s run matters more than speed.']]),

  T('football_overlap', 'football', 'combination', 'beginner',
    ['الأوفرلاب والأندرلاب على الطرف', 'Overlap and underlap on the flank'],
    ['الظهير يجري من ورا الجناح لبرة (أوفرلاب) أو لجوه (أندرلاب) عشان يعمل ٢ ضد ١ ضد ظهير الخصم.', 'The full-back runs around the winger on the outside (overlap) or inside (underlap) to create a 2v1 against the opposing full-back.'],
    ['لما الجناح معاه الكرة ومواجه ظهير الخصم لوحده.', 'When the winger has the ball isolated against their full-back.'],
    [
      ['الجناح يستلم ويواجه الظهير ويدخل للجوه شوية.', 'The winger receives and drives slightly inside.'],
      ['الظهير يجري من ورا الجناح لبرة (أوفرلاب) أو لجوه (أندرلاب).', 'The full-back runs outside (overlap) or inside (underlap).'],
      ['الجناح يقرا المدافع: يمرر للجري أو يدخل هو.', 'The winger reads the defender: release the runner or go himself.'],
      ['عرضية أرضية للمنطقة أو كت باك.', 'Low cross into the box or a cut-back.']
    ]),

  T('football_switch_play', 'football', 'attack', 'intermediate',
    ['تحويل اللعب للجهة الضعيفة', 'Switching play to the weak side'],
    ['تسحب الخصم لجهة بتمريرات قصيرة وبعدين تنقل الكرة بسرعة للجهة التانية اللي فيها مساحة وتفوق عددي.', 'Draw the opponent to one side with short passes, then move the ball quickly to the far side where there is space and a numerical edge.'],
    ['ضد دفاع بيقفل جهة الكرة بقوة (بيضغط ناحية الكرة).', 'Against a defence that shifts heavily to the ball side.'],
    [
      ['تمريرات قصيرة في جهة واحدة تسحب خط الوسط.', 'Short passes on one side to pull the midfield across.'],
      ['اللاعب اللي في الجهة التانية يفضل واسع جدًا.', 'Far-side wide player stays very wide.'],
      ['تحويل بكرة طويلة أو من خلال الارتكاز في لمستين.', 'Switch with a long diagonal or through the 6 in two passes.'],
      ['هاجم بسرعة قبل ما الدفاع يتحرك (١ ضد ١ أو ٢ ضد ١).', 'Attack quickly before the defence shifts (1v1 or 2v1).']
    ]),

  T('football_counter_attack', 'football', 'counter', 'intermediate',
    ['الهجمة المرتدة السريعة', 'Fast counter-attack'],
    ['بعد قطع الكرة في نصك، تهاجم في أقل من ١٠-١٥ ثانية بعدد قليل من التمريرات قبل ما الخصم يرجع.', 'After winning the ball in your half, attack within 10-15 seconds with few passes before the opponent recovers.'],
    ['بعد قطع الكرة في بلوك متوسط أو منخفض والخصم متقدم بأعداد.', 'After winning the ball in a mid/low block with the opponent committed forward.'],
    [
      ['أول تمريرة لقدام (للمهاجم أو في المساحة) مش للجنب.', 'First pass forward (to the striker or into space), not sideways.'],
      ['الجناحين ينطلقوا في المساحات على الأطراف.', 'Wingers sprint into wide spaces.'],
      ['حامل الكرة يجري في العمق عشان يثبت المدافعين.', 'The ball carrier drives centrally to fix defenders.'],
      ['آخر تمريرة للاعب الحر أو تسديد.', 'Final pass to the free runner or shoot.']
    ],
    [['٣ لاعبين في الهجمة: واحد بالكرة واتنين في الجنبين.', 'Three in the attack: one on the ball and two wide runners.']]),

  T('football_offside_trap', 'football', 'defense', 'advanced',
    ['الخط العالي ومصيدة التسلل', 'High line and offside trap'],
    ['خط الدفاع يطلع لقدام مع بعض في لحظة التمرير عشان يسيب المهاجم متسلل ويقلل المساحة في النص.', 'The back line steps up together as the pass is played to catch the striker offside and compress the pitch.'],
    ['مع ضغط قوي على الكرة ومدافعين سريعين.', 'With strong pressure on the ball and fast defenders.'],
    [
      ['قلب الدفاع (القائد) يحدد الخط وينادي.', 'The leading centre-back sets and calls the line.'],
      ['لما حامل الكرة يكون تحت ضغط ومايقدرش يمرر للضهر: اطلع لقدام.', 'When the ball carrier is pressured and cannot play behind: step up.'],
      ['لما حامل الكرة حر ومواجه: ارجع (درب).', 'When he is unpressured and facing forward: drop.'],
      ['الخط كله يتحرك مع بعض بلا تأخير.', 'The whole line moves in unison.']
    ],
    [['الغلطة بلاعب واحد متأخر = المهاجم لوحده مع الحارس.', 'One player late means a striker through on goal.']]),

  T('football_corner_near_post', 'football', 'set_piece', 'intermediate',
    ['ركنية هجومية: القائم القريب', 'Attacking corner: near-post flick'],
    ['كرة ركنية قوية للقائم القريب، لاعب يحولها بالراس للقائم البعيد حيث المهاجمين جايين.', 'A driven in-swinger or out-swinger to the near post where one player flicks it on to runners at the far post.'],
    ['ضد دفاع منطقة بيقف في خط واحد.', 'Against zonal defences set in one line.'],
    [
      ['لاعب الفليك يقف قريب من القائم القريب ويبدأ جريه متأخر.', 'Flick-on player starts late and attacks the near post.'],
      ['٢-٣ لاعبين يجروا من عند نقطة الجزاء للقائم البعيد.', '2-3 players run from the penalty spot to the far post.'],
      ['لاعب يعطّل الحارس (بدون خطأ) ولاعب على حدود المنطقة للكرة المرتدة.', 'One screens the keeper (legally), one waits at the edge for rebounds.'],
      ['المسدد يضرب كرة قوية ومنخفضة لمستوى الراس عند القائم القريب.', 'The taker whips a fast ball at head height to the near post.'],
      ['اتنين يفضلوا ورا للأمان من المرتدة.', 'Two stay back to guard against the counter.']
    ]),

  T('football_corner_short', 'football', 'set_piece', 'beginner',
    ['ركنية قصيرة', 'Short corner'],
    ['تمريرة قصيرة للاعب قريب عشان تغير زاوية العرضية أو تسحب مدافع من المنطقة.', 'A short pass to a nearby teammate to change the crossing angle or pull a defender out of the box.'],
    ['ضد فريق طويل بيكسب الكرات الهوائية أو بيقف دفاع منطقة كامل.', 'Against a tall team dominant in the air, or full zonal set-ups.'],
    [
      ['لاعب يقرب من المسدد.', 'A teammate approaches the corner taker.'],
      ['تمريرة قصيرة وعودة (وان تو).', 'Short pass and return (one-two).'],
      ['المسدد يدخل للخط ويعمل عرضية من زاوية أحسن أو كت باك.', 'The taker drives to the byline and crosses from a better angle or cuts back.'],
      ['اللاعبين في المنطقة يعدّلوا مكانهم مع حركة الكرة.', 'Players in the box readjust to the new ball position.']
    ]),

  T('football_corner_defend', 'football', 'set_piece', 'intermediate',
    ['الدفاع عن الركنيات (مختلط: منطقة + رقابة)', 'Defending corners (mixed zonal + man)'],
    ['لاعبين ثابتين في مناطق (خصوصًا القائم القريب ونقطة الـ٦ ياردة)، والباقيين رقابة لرجل على أخطر المهاجمين.', 'Players hold key zones (near post and six-yard line) while the rest man-mark the most dangerous attackers.'],
    ['في كل الركنيات ضد فريق عنده لاعبين طوال محددين.', 'On every corner against teams with identifiable aerial threats.'],
    [
      ['لاعب على القائم القريب أو حوالين الـ٦ ياردة لقطع الكرة الأرضية والقريبة.', 'One player at the near post/six-yard area to clear near balls.'],
      ['٣ لاعبين منطقة على خط الـ٦ ياردة.', 'Three zonal defenders across the six-yard line.'],
      ['رقابة رجل لرجل على أطول ٣-٤ مهاجمين.', 'Man-mark the tallest 3-4 attackers.'],
      ['لاعب على حدود المنطقة للكرات المرتدة.', 'One at the edge of the box for second balls.'],
      ['بعد الإبعاد: الخط كله يطلع لقدام بسرعة.', 'After clearing: the whole line steps out quickly.']
    ],
    [['هاجم الكرة — ماتستناش الكرة تيجي لك.', 'Attack the ball — do not wait for it.']]),

  T('football_free_kick_wide', 'football', 'set_piece', 'intermediate',
    ['ضربة حرة جانبية (عرضية)', 'Wide free kick (delivery)'],
    ['ضربة حرة من جنب الملعب قرب المنطقة، تتلعب عرضية قوية بين خط الدفاع والحارس.', 'A free kick from a wide area near the box, delivered hard into the space between the defensive line and the keeper.'],
    ['للضربات الحرة الجانبية على بعد ٢٠-٣٥ متر من المرمى.', 'Wide free kicks 20-35 m from goal.'],
    [
      ['المهاجمين يقفوا على خط واحد مع آخر مدافع (مش متسللين).', 'Attackers line up level with the last defender (onside).'],
      ['مع لمس الكرة يجروا لمناطق مختلفة (قريب، نص، بعيد).', 'As the ball is struck they attack different zones (near, middle, far).'],
      ['العرضية داخلة للمرمى (إن سوينجر) بين الدفاع والحارس.', 'In-swinging delivery between the defence and the keeper.'],
      ['لاعب للكرة المرتدة واتنين للأمان.', 'One for the rebound and two for rest defence.']
    ]),

  T('football_free_kick_direct', 'football', 'set_piece', 'intermediate',
    ['ضربة حرة مباشرة على المرمى', 'Direct free kick on goal'],
    ['تسديدة مباشرة من حوالي ١٨-٢٥ متر، مع لاعبين قريبين من الحيطة يعطلوا رؤية الحارس.', 'A direct shot from about 18-25 m, with teammates standing near the wall to block the keeper’s view.'],
    ['ضربة حرة في العمق قريب من المنطقة.', 'A central free kick close to the box.'],
    [
      ['حط لاعبين قريب من الحيطة ناحية جهة التسديد (لازم يبعدوا متر على الأقل لو الحيطة ٣ لاعبين أو أكتر).', 'Place teammates near the wall on the shooting side (they must stay at least 1 m from a wall of three or more).'],
      ['لاعب خداع يجري على الكرة ويعديها.', 'A decoy runs over the ball.'],
      ['المسدد يضرب فوق الحيطة أو حواليها للزاوية البعيدة عن الحارس.', 'The taker bends it over or around the wall away from the keeper.'],
      ['لاعبين يجروا للكرة المرتدة من الحارس.', 'Runners follow in for rebounds.']
    ]),

  T('football_free_kick_defend', 'football', 'set_piece', 'beginner',
    ['الدفاع عن الضربة الحرة (الحيطة)', 'Defending free kicks (the wall)'],
    ['الحارس يحدد عدد لاعبي الحيطة ومكانها حسب المسافة والزاوية، والباقيين يأمنوا المنطقة.', 'The keeper sets the number and position of wall players by distance and angle; the rest protect the box.'],
    ['أي ضربة حرة مباشرة قريبة من المنطقة.', 'Any direct free kick near the box.'],
    [
      ['الحارس ينادي عدد الحيطة: العمق ٤-٥، الزاوية ٢-٣، الجنب ١-٢.', 'Keeper calls the wall size: central 4-5, angled 2-3, wide 1-2.'],
      ['أول لاعب في الحيطة يقفل القائم القريب والحارس يغطي الباقي.', 'The end wall player covers the near post; the keeper covers the rest.'],
      ['الحيطة على بعد ٩٫١٥ متر.', 'The wall stands 9.15 m away.'],
      ['لاعب ينام ورا الحيطة ضد الكرة الأرضية (اختياري).', 'Optional: a player lies behind the wall against a low shot.'],
      ['باقي اللاعبين رقابة على المهاجمين.', 'The rest mark attackers.']
    ]),

  T('football_long_throw', 'football', 'set_piece', 'intermediate',
    ['رمية التماس الطويلة', 'Long throw-in'],
    ['رمية تماس بعيدة لمنطقة الجزاء بتتعامل زي الركنية، ومفيش تسلل من رمية التماس.', 'A long throw into the box treated like a corner — there is no offside from a throw-in.'],
    ['رمية تماس في الثلث الأخير وعندك رامي قوي.', 'Final-third throws when you have a long thrower.'],
    [
      ['لاعب طويل يقف عند القائم القريب لتحويل الكرة.', 'A tall player attacks the near post to flick on.'],
      ['مهاجمين للقائم البعيد والنص.', 'Runners to the far post and centre.'],
      ['الرمية سريعة ومنخفضة نسبيًا لمنطقة القائم القريب.', 'Throw flat and fast to the near-post area.'],
      ['لاعبين للكرة التانية على حدود المنطقة.', 'Players on the edge for second balls.']
    ])
);

/* ───────────── كرة السلة ───────────── */
ALL.push(
  T('basketball_pick_and_roll', 'basketball', 'attack', 'beginner',
    ['الحجز والدوران (pick-and-roll)', 'Pick-and-roll'],
    ['لاعب كبير يعمل حجز (سكرين) لحامل الكرة، وبعد ما حامل الكرة يعدّي يدور الحاجز للسلة. بيخلق ٢ ضد ١ على مدافعين.', 'A big sets a screen for the ball handler, then rolls to the rim after the handler uses it, creating a 2v1 against two defenders.'],
    ['أكتر لعبة مستخدمة في السلة الحديثة، ضد الدفاع رجل لرجل.', 'The most-used action in modern basketball, against man-to-man.'],
    [
      ['الحاجز يقف ثابت ملاصق لجنب مدافع حامل الكرة (بزاوية تجاه السلة).', 'The screener sets a stationary screen on the ball defender’s side, angled toward the basket.'],
      ['حامل الكرة يعمل تمويه للجهة العكسية ويعدّي كتف بكتف مع الحاجز.', 'The handler sets up the defender the other way and comes off shoulder to shoulder.'],
      ['الحاجز يدور (رول) للسلة ويده جاهزة للكرة.', 'The screener rolls hard to the rim with hands ready.'],
      ['حامل الكرة يقرا: تمريرة للرول، أو اختراق، أو تسديد، أو تمريرة للجهة الضعيفة.', 'The handler reads: pass to the roller, drive, pull-up shot or kick to the weak side.']
    ],
    [['الحاجز ثابت لحظة الاحتكاك — الحجز المتحرك فاول.', 'Screener must be stationary at contact — a moving screen is a foul.']]),

  T('basketball_pick_and_pop', 'basketball', 'attack', 'intermediate',
    ['الحجز والفتح للتصويب (pick-and-pop)', 'Pick-and-pop'],
    ['زي الـpick-and-roll لكن الحاجز بدل ما يدور للسلة بيفتح لبرة لتسديدة ثلاثية أو متوسطة.', 'Like the pick-and-roll, but the screener pops out for a three or mid-range shot instead of rolling.'],
    ['لما الحاجز مصوّب كويس ومدافعه بيرجع للسلة (drop).', 'When the screener can shoot and his defender drops to the paint.'],
    [
      ['الحجز على مدافع حامل الكرة.', 'Screen on the ball handler’s defender.'],
      ['حامل الكرة يهاجم للسلة يسحب المدافعين.', 'The handler attacks downhill to draw defenders.'],
      ['الحاجز يفتح لورا خط الثلاثة أو لمنطقة فاضية.', 'The screener pops behind the arc or into an open area.'],
      ['تمريرة للحاجز وتسديد أو تمريرة إضافية.', 'Pass to the popper for the shot or an extra pass.']
    ]),

  T('basketball_pnr_coverages', 'basketball', 'defense', 'intermediate',
    ['طرق الدفاع عن الـpick-and-roll', 'Pick-and-roll coverages'],
    ['أشهر الطرق: الدروب (مدافع الحاجز يرجع للسلة)، الهيدج (يطلع يوقف حامل الكرة ويرجع)، الـswitch (تبديل)، والبليتز (مصيدة باتنين).', 'Main options: drop (big sags to the rim), hedge (big shows high then recovers), switch, and blitz (double-team the handler).'],
    ['حسب نوع حامل الكرة والحاجز ومهارات مدافعينك.', 'Choose based on the handler, the screener and your defenders’ skills.'],
    [
      ['دروب: الكبير يقف عند خط الرمية الحرة يحمي السلة ويسيب التسديد المتوسط.', 'Drop: the big sits near the free-throw line protecting the rim and conceding mid-range.'],
      ['هيدج: الكبير يطلع بجسمه قدام حامل الكرة لحظة، والمدافع يرجع لرجله، وبعدين الكبير يرجع للحاجز.', 'Hedge: the big steps out to slow the handler, the guard recovers, then the big returns to the screener.'],
      ['Switch: المدافعين يبدلوا — مناسب لو الأطوال والسرعات متقاربة.', 'Switch: defenders exchange — best when sizes and speeds are similar.'],
      ['بليتز: الاتنين يحاصروا حامل الكرة والباقيين يدوّروا (روتيشن) لتغطية الرول.', 'Blitz: both trap the handler and the others rotate to cover the roller.']
    ]),

  T('basketball_ice_defense', 'basketball', 'defense', 'advanced',
    ['دفاع ICE ضد الحجز الجانبي', 'ICE coverage on side pick-and-roll'],
    ['مدافع الكرة يمنع حامل الكرة من استخدام الحجز ويوجهه لخط النهاية (البيز لاين)، ومدافع الحاجز يستناه تحت.', 'The ball defender denies use of the screen and forces the handler toward the baseline, where the big waits.'],
    ['في الحجز الجانبي على طرف الملعب.', 'On side pick-and-rolls near the sideline.'],
    [
      ['مدافع الكرة يقف بين حامل الكرة والحاجز ويناديه "آيس".', 'The ball defender jumps between handler and screen and calls "ICE".'],
      ['يوجّه حامل الكرة ناحية خط الجنب والنهاية.', 'He forces the handler toward the sideline and baseline.'],
      ['مدافع الحاجز ينزل يقفل الاختراق ناحية البيز لاين.', 'The big drops to cut off the baseline drive.'],
      ['الجهة الضعيفة جاهزة تدوّر على الحاجز لو دار للسلة.', 'Weak side ready to tag the roller.']
    ]),

  T('basketball_motion_offense', 'basketball', 'system', 'intermediate',
    ['هجوم الحركة (Motion 5-out)', 'Motion offense (5-out)'],
    ['خمس لاعبين برة خط الثلاثة بيتحركوا بمبادئ (تمرير، قطع، حجز بعيد عن الكرة، ملء الأماكن) بدل لعبات محفوظة.', 'Five players spaced outside the arc moving by principles (pass, cut, screen away, refill spots) rather than set plays.'],
    ['لفريق عنده لاعبين بيقروا اللعب وبيصوبوا، وضد الدفاع رجل لرجل.', 'For teams of skilled decision-makers and shooters against man-to-man.'],
    [
      ['اللاعبين الخمسة برة القوس بمسافات ٤-٥ متر.', 'All five spaced outside the arc 4-5 m apart.'],
      ['مرّر واقطع (pass and cut) للسلة، ولو مالقتش الكرة اطلع للمكان الفاضي.', 'Pass and cut to the basket; if not open, fill the empty spot.'],
      ['حجز بعيد عن الكرة (screen away) للاعب اللي في الجهة التانية.', 'Screen away for a teammate on the weak side.'],
      ['لو مدافعك بيمنعك: اقطع من ورا (backdoor).', 'If overplayed: backdoor cut.'],
      ['كل لاعب ممكن يسدد أو يخترق لو اتفتح.', 'Anyone shoots or drives when open.']
    ]),

  T('basketball_triangle', 'basketball', 'system', 'advanced',
    ['هجوم المثلث (Triangle offense)', 'Triangle offense'],
    ['شكل مثلث في جهة (السنتر في البوست، لاعب على الجنب، لاعب في الركن) مع لاعبين في الجهة التانية. القراءات بتتحدد حسب رد فعل الدفاع.', 'A sideline triangle (post, wing, corner) plus a two-man game on the weak side, with options dictated by the defence’s reaction.'],
    ['لفريق عنده سنتر بيمرر ولاعبين بيقروا اللعب.', 'For teams with a passing post player and good readers.'],
    [
      ['الكرة للجنب (الوينج) — المثلث يتكوّن في الجهة القوية: بوست، وينج، كورنر.', 'Ball to the wing — the triangle forms: post, wing, corner.'],
      ['الخيار الأول: تمريرة للبوست واللاعبين يقطعوا حوالينه.', 'First option: post entry with cutters around him.'],
      ['لو البوست متقفل: تمريرة للقمة وحجز بعيد عن الكرة (الجهة الضعيفة).', 'If denied: reverse to the top with weak-side screening.'],
      ['القطع من ورا (backdoor) لو المدافعين بيضغطوا خطوط التمرير.', 'Backdoor cuts if defenders overplay passing lanes.'],
      ['تسديد من أول لاعب يتفتح.', 'Shoot with the first open player.']
    ]),

  T('basketball_horns', 'basketball', 'set_piece', 'intermediate',
    ['لعبة Horns', 'Horns set'],
    ['الكبيرين عند زاويتي خط الرمية الحرة (شكل القرون)، والجناحين في الأركان. بتفتح pick-and-roll من أي جهة وخيارات كتيرة.', 'Two bigs at the elbows (horns shape) and two wings in the corners, giving a pick-and-roll to either side and many options.'],
    ['بداية هجوم منظم في نص الملعب ضد رجل لرجل.', 'As a half-court entry against man-to-man.'],
    [
      ['الموزّع على القمة، الكبيرين على الإلبو (الزاويتين)، الجناحين في الكورنرز.', 'Guard at the top, bigs at both elbows, wings in the corners.'],
      ['الموزّع يمرر لكبير أو يستخدم حجز من واحد منهم.', 'The guard passes to a big or uses a ball screen from one.'],
      ['الكبير التاني يدور للسلة أو يفتح (pop).', 'The other big dives or pops.'],
      ['خيارات: حجز مزدوج، تمريرة للكبير ثم قطع من الموزّع، أو هاند أوف.', 'Options: double ball screen, big-to-big pass with a guard cut, or a hand-off.']
    ]),

  T('basketball_give_and_go', 'basketball', 'combination', 'beginner',
    ['مرّر واقطع (Give-and-go)', 'Give-and-go'],
    ['تمرر لزميلك وتقطع فورًا للسلة قدام مدافعك وتستلم الكرة راجعة.', 'Pass to a teammate, cut to the basket in front of your defender, and receive the return pass.'],
    ['لما مدافعك بيتابع الكرة بعينه أو بيتأخر بعد التمريرة.', 'When your defender turns to watch the ball after your pass.'],
    [
      ['مرّر للجنب.', 'Pass to the wing.'],
      ['خطوة تمويه بعيد عن السلة.', 'Jab step away from the basket.'],
      ['اقطع بسرعة للسلة قدام مدافعك (فرونت كت).', 'Cut hard to the rim in front of your defender.'],
      ['استلم الكرة الراجعة ولاي أب.', 'Receive the return pass and finish with a lay-up.']
    ]),

  T('basketball_backdoor', 'basketball', 'attack', 'beginner',
    ['القطع الخلفي (Backdoor cut)', 'Backdoor cut'],
    ['لما المدافع يمنعك تستلم على الجنب، تقطع وراه للسلة وتستلم تمريرة أرضية أو ساقطة.', 'When the defender denies the wing catch, cut behind him to the basket for a bounce or lob pass.'],
    ['ضد دفاع ضاغط بيقفل خطوط التمرير.', 'Against aggressive denial defence.'],
    [
      ['اطلع للجنب كأنك رايح تستلم.', 'Move up to the wing as if to receive.'],
      ['المدافع يقفل خط التمرير بإيده.', 'The defender denies with a hand in the lane.'],
      ['ارجع بقدمك الخارجية واقطع وراه للسلة.', 'Plant the outside foot and cut behind him to the rim.'],
      ['تمريرة أرضية من الموزّع ولاي أب.', 'Bounce pass from the guard and lay-up.']
    ]),

  T('basketball_man_to_man', 'basketball', 'defense', 'beginner',
    ['دفاع رجل لرجل (مبادئ المساعدة)', 'Man-to-man defense (help principles)'],
    ['كل مدافع مسؤول عن لاعب، لكن بيتموضع حسب مكان الكرة: قريب من الكرة = ضغط ومنع، بعيد = مساعدة داخل المنطقة.', 'Each defender guards a player but positions by ball location: one pass away = deny, two passes away = help in the paint.'],
    ['الدفاع الأساسي لأي فريق، خصوصًا الفئات السنية.', 'The base defence for every team, especially youth.'],
    [
      ['مدافع الكرة: ضغط مستمر ووجّه للخط.', 'On-ball: constant pressure, force to the sideline.'],
      ['تمريرة واحدة بعيد: إيد في خط التمرير (ديناي).', 'One pass away: hand in the lane (deny).'],
      ['تمريرتين بعيد: جوه المنطقة في مثلث الرؤية (شايف الكرة ولاعبك).', 'Two passes away: in the help line, seeing ball and man.'],
      ['لو حامل الكرة اخترق: المساعد يوقفه والباقيين يدوّروا.', 'On a drive: the helper stops the ball and others rotate.'],
      ['كل الخمسة يعملوا بوكس أوت وقت التسديد.', 'All five box out on the shot.']
    ]),

  T('basketball_zone_2_3', 'basketball', 'defense', 'beginner',
    ['دفاع المنطقة ٢-٣', '2-3 zone defense'],
    ['اتنين فوق عند القمة وثلاثة تحت (جناحين وسنتر). بيحمي المنطقة الداخلية والريباوند، ومكشوف للتسديد من الجناحين والكورنرز وخط الرمية الحرة.', 'Two up top and three across the baseline. Protects the paint and rebounding; vulnerable at the wings, corners and high post.'],
    ['ضد فريق ضعيف في التسديد الخارجي، أو عندك سنتر طويل.', 'Against poor outside shooting teams, or with a tall centre.'],
    [
      ['الاتنين فوق يغطوا القمة والجنبين لحد الخط الحر.', 'Top two guard the top and wings down to the free-throw line extended.'],
      ['الجناحين تحت يغطوا الكورنر والبلوك.', 'Bottom wings cover the corner and the block.'],
      ['السنتر يحمي البوست والسلة.', 'The centre protects the post and rim.'],
      ['كل الخمسة يتحركوا مع كل تمريرة (مش مع اللاعب).', 'All five shift with every pass, not with players.'],
      ['اللي بيستلم في الهاي بوست (الخط الحر) لازم يتقابل فورًا.', 'Any catch at the high post must be met at once.']
    ]),

  T('basketball_zone_1_3_1', 'basketball', 'defense', 'advanced',
    ['دفاع المنطقة ١-٣-١', '1-3-1 zone defense'],
    ['واحد فوق، ثلاثة في النص (جناحين وواحد في الهاي بوست)، وواحد تحت. بيعمل مصايد على الجنبين والكورنر، ومكشوف في الكورنر والبيز لاين.', 'One up top, three across the middle, one at the baseline. Built to trap wings and corners; vulnerable in the corners and along the baseline.'],
    ['ضد فريق موزّعه ضعيف أو بيبطّأ في التمرير.', 'Against teams with weak guards or slow ball movement.'],
    [
      ['اللاعب اللي فوق يوجّه الكرة للجنب.', 'The top defender forces the ball to a wing.'],
      ['الجناح والقمة يعملوا مصيدة على الجنب.', 'Wing and top defenders trap at the wing.'],
      ['اللاعب اللي في النص يقفل الهاي بوست.', 'The middle defender denies the high post.'],
      ['اللاعب اللي تحت (الروفر) يجري من كورنر لكورنر.', 'The baseline rover covers corner to corner.'],
      ['الجناح البعيد يغطي البلوك في الجهة الضعيفة.', 'The weak-side wing drops to the block.']
    ]),

  T('basketball_box_and_one', 'basketball', 'defense', 'advanced',
    ['دفاع Box-and-one', 'Box-and-one'],
    ['أربعة في منطقة على شكل مربع، ومدافع واحد يراقب نجم الخصم رجل لرجل في كل مكان.', 'Four defenders in a box zone while one shadows the opponent’s best scorer man-to-man everywhere.'],
    ['ضد فريق معتمد على لاعب واحد بيسجل أغلب نقطه.', 'Against a team relying on one dominant scorer.'],
    [
      ['اختار أفضل مدافع للرقابة على النجم.', 'Assign your best defender to the star.'],
      ['يمنعه يستلم (ديناي) طول الوقت.', 'He denies every catch.'],
      ['الأربعة: اتنين على الخط الحر واتنين عند البلوكات.', 'The four: two at the free-throw line, two on the blocks.'],
      ['المربع يتحرك مع الكرة ويسيب الأضعف في التسديد.', 'The box shifts with the ball and gives space to weaker shooters.']
    ]),

  T('basketball_full_court_press', 'basketball', 'defense', 'intermediate',
    ['الضغط على كامل الملعب ١-٢-١-١', 'Full-court press 1-2-1-1'],
    ['ضغط من أول رمية الإدخال بشكل ماسة، هدفه مصايد في الأركان وقطع التمريرات أو إبطاء الخصم.', 'A diamond press from the inbound aiming to trap in the corners and steal passes, or at least burn time.'],
    ['بعد التسجيل، أو لو متأخر في النتيجة، أو ضد موزّعين ضعاف.', 'After scores, when trailing, or against weak ball handlers.'],
    [
      ['لاعب على صاحب رمية الإدخال يضايقه.', 'One player pressures the inbounder.'],
      ['اتنين عند خط الرمية الحرة يمنعوا الاستلام ويعملوا مصيدة بعد الاستلام.', 'Two near the free-throw line deny and trap after the catch.'],
      ['لاعب في نص الملعب لقطع التمريرة الجانبية.', 'One at midcourt picks off lob and sideline passes.'],
      ['آخر لاعب (الأمان) يحمي السلة.', 'The safety protects the basket.'],
      ['لو الكرة عدّت: ارجع بسرعة لدفاعك الأساسي.', 'If broken: sprint back into the half-court defence.']
    ]),

  T('basketball_press_break', 'basketball', 'attack', 'intermediate',
    ['كسر الضغط', 'Press break'],
    ['تنظيم ضد الضغط على كامل الملعب: إدخال سريع، لاعب في النص، ولاعبين على الأطراف عشان تتجنب المصايد.', 'An organised answer to a full-court press: quick inbound, a middle man and wide outlets to avoid traps.'],
    ['ضد أي ضغط على كامل الملعب.', 'Against any full-court press.'],
    [
      ['ارمي الإدخال بسرعة قبل ما الضغط يتنظم.', 'Inbound quickly before the press sets.'],
      ['لاعب ينزل للنص (الخط الحر) كخيار تمرير.', 'A player flashes to the middle as a release.'],
      ['تمرير على الجنب ثم للنص — مش تنطيط في الأركان.', 'Pass wing to middle — do not dribble into corners.'],
      ['بعد ما تعدّي: هاجم السلة (الضغط بيسيب أعداد قليلة ورا).', 'Once through: attack the rim — presses leave few defenders back.']
    ]),

  T('basketball_fast_break', 'basketball', 'transition', 'beginner',
    ['الهجمة الخاطفة بالثلاث خطوط (Fast break)', 'Three-lane fast break'],
    ['بعد ريباوند أو قطع، الفريق يطلع بسرعة في ثلاث خطوط: موزّع في النص وجناحين على الأطراف، عشان ٣ ضد ٢ أو ٢ ضد ١.', 'After a rebound or steal, sprint out in three lanes — handler in the middle, wings wide — to create 3v2 or 2v1.'],
    ['بعد ريباوند دفاعي أو قطع والخصم لسه مرجعش.', 'After a defensive rebound or steal before the opponent gets back.'],
    [
      ['تمريرة أولى سريعة (أوتليت) للموزّع على الجنب.', 'Quick outlet pass to the guard on the side.'],
      ['الموزّع يجري بالكرة في النص.', 'The guard pushes the ball up the middle.'],
      ['الجناحين يجروا على الخطوط لحد خط الثلاثة ويقطعوا للسلة بزاوية ٤٥.', 'Wings run wide to the arc and cut at 45 degrees to the rim.'],
      ['الموزّع يقف عند الخط الحر ويقرا: يمرر أو يكمل.', 'The guard stops at the free-throw line and reads: pass or finish.'],
      ['اللاعب الرابع والخامس (الترايلرز) يدخلوا متأخر للتسديد أو الريباوند.', 'Trailers arrive late for shots or rebounds.']
    ]),

  T('basketball_blob_box', 'basketball', 'set_piece', 'intermediate',
    ['رمية إدخال من خط النهاية: Box', 'BLOB: Box set'],
    ['أربع لاعبين في مربع قدام السلة وحجوزات متتالية عشان يتفتح لاعب للتسديد أو لاي أب.', 'Four players in a box in front of the basket running screens to free a shooter or a lay-up.'],
    ['رمية إدخال من تحت السلة في الهجوم (Baseline out of bounds).', 'Baseline out-of-bounds under your own basket.'],
    [
      ['اتنين كبار على البلوكات واتنين على الإلبو.', 'Two bigs on the blocks, two players at the elbows.'],
      ['الكبير البعيد يعمل حجز للاعب الإلبو القريب وهو ينزل للكورنر (تسديد).', 'The far big screens down for the near elbow player popping to the corner.'],
      ['اللاعب اللي حجز يدور للسلة (سيل).', 'The screener seals and rolls to the rim.'],
      ['الإلبو التاني ينزل حجز للكبير القريب اللي يطلع للقمة كأمان.', 'The other elbow player screens for the near big, who comes up as a safety.'],
      ['الرامي يختار: تسديد الكورنر، أو الدوران للسلة، أو الأمان.', 'The inbounder reads: corner shooter, roller, or safety.']
    ]),

  T('basketball_blob_stack', 'basketball', 'set_piece', 'beginner',
    ['رمية إدخال من خط النهاية: Stack', 'BLOB: Stack set'],
    ['أربع لاعبين في خط واحد (ستاك) قدام الرامي، ومع الإشارة كل واحد يطلع لاتجاه مختلف.', 'Four players in a vertical line in front of the inbounder who break in different directions on a signal.'],
    ['ضد دفاع منطقة أو رجل لرجل عند رمية تحت السلة.', 'Against zone or man on baseline inbounds.'],
    [
      ['الأربعة ورا بعض قدام الرامي.', 'All four line up in front of the inbounder.'],
      ['مع الإشارة: الأول يدور للسلة، التاني للكورنر، التالت للجنب، الرابع للقمة (أمان).', 'On the signal: first dives to the rim, second to the corner, third to the wing, fourth to the top (safety).'],
      ['الرامي يمرر لأول لاعب مفتوح.', 'Inbound to the first open player.'],
      ['اللاعب يسدد أو يدخل الهجوم العادي.', 'He shoots or flows into offence.']
    ]),

  T('basketball_slob', 'basketball', 'set_piece', 'intermediate',
    ['رمية إدخال جانبية (SLOB)', 'Sideline out of bounds (SLOB)'],
    ['رمية من خط الجنب بحجز للاعب يطلع يستلم، وبعد الإدخال حجز للرامي نفسه عشان يستلم مفتوح للتسديد.', 'A sideline inbound using a screen to get the catch, then a screen for the inbounder to receive open for a shot.'],
    ['رمية جانبية في نص ملعب الخصم، خصوصًا آخر الماتش.', 'Sideline inbounds in the frontcourt, especially late in games.'],
    [
      ['الكبير يعمل حجز لموزّع يطلع لورا يستلم الإدخال.', 'A big screens for a guard who comes back to catch.'],
      ['الرامي يمرر ويدخل الملعب.', 'The inbounder passes and steps in.'],
      ['لاعب تاني يعمل حجز للرامي (فلير سكرين) وهو يطلع لخط الثلاثة.', 'Another player sets a flare screen for the inbounder to the arc.'],
      ['تمريرة للرامي وتسديد، أو pick-and-roll لو اتقفل.', 'Pass for the shot, or into pick-and-roll if denied.']
    ]),

  T('basketball_two_for_one', 'basketball', 'game_plan', 'intermediate',
    ['هجمتين مقابل واحدة آخر الربع (2-for-1)', 'Two-for-one at the end of a quarter'],
    ['لما يفضل حوالي ٣٠-٣٦ ثانية، تسدد بسرعة عشان الخصم ياخد هجمة واحدة وترجع لك هجمة أخيرة.', 'With about 30-36 seconds left, shoot early so the opponent gets one possession and you get the last one.'],
    ['آخر كل ربع لما تكون الكرة معاك والساعة قريبة من ٣٥ ثانية.', 'At the end of any quarter with possession around 35 seconds left.'],
    [
      ['اعبر بسرعة وهاجم بين ٣٦ و٢٨ ثانية.', 'Push and attack between about 36 and 28 seconds.'],
      ['خد أول تسديدة كويسة (مش أي تسديدة).', 'Take the first good shot, not any shot.'],
      ['ارجع دفاع قوي — الخصم بيهاجم الساعة.', 'Get back and defend — the opponent will run the clock.'],
      ['الهجمة الأخيرة: لعبة محفوظة تخلص في آخر ٣-٥ ثواني.', 'Final possession: a set play finishing in the last 3-5 seconds.']
    ])
);

/* ───────────── كرة اليد ───────────── */
ALL.push(
  T('handball_6_0', 'handball', 'system', 'beginner',
    ['دفاع ٦-٠', '6-0 defense'],
    ['الستة مدافعين على خط الـ٦ متر (أو قدامه شوية) في خط واحد، بيتحركوا جنب مع الكرة ويطلعوا للاعب اللي معاه الكرة. قوي ضد لاعب الدائرة والاختراق، أضعف ضد التصويب من بعيد.', 'All six defenders on or just in front of the 6 m line, sliding with the ball and stepping out to the shooter. Strong against the pivot and penetration, weaker against long-range shooting.'],
    ['ضد فريق عنده لاعب دائرة قوي وظهراء مش مصوّبين من بعيد.', 'Against a strong pivot and backs who are not long-range shooters.'],
    [
      ['الستة في خط واحد: جناحين، ظهيرين جانبيين (٢)، ولاعبين في النص (�3).', 'Six in one line: two wings, two halves (2s) and two centre defenders (3s).'],
      ['اللي قدامه الكرة يطلع يقابل الرامي (خطوة لقدام) والجيران يقفلوا الفراغ.', 'The defender facing the ball steps out; neighbours close the gap behind.'],
      ['يرجع لخط الـ٦ بعد ما الكرة تتمرر.', 'He drops back to 6 m as the ball is passed.'],
      ['لاعبي النص مسؤولين عن لاعب الدائرة بالتسليم والتسلم.', 'Centre defenders pass the pivot between them.'],
      ['البلوك على التصويب والحارس ياخد الزاوية التانية.', 'Block the shot while the keeper covers the other side.']
    ],
    [['اتفاق البلوك مع الحارس: البلوك يقفل زاوية والحارس ياخد التانية.', 'Agree block and keeper roles: the block takes one corner, the keeper the other.']]),

  T('handball_5_1', 'handball', 'system', 'intermediate',
    ['دفاع ٥-١', '5-1 defense'],
    ['خمسة على خط الـ٦ متر ولاعب متقدم (بتاع الـ٩ متر) بيضايق صانع الألعاب ويقطع التمريرات.', 'Five on the 6 m line and one advanced defender at around 9 m who harasses the centre back and cuts passes.'],
    ['ضد صانع ألعاب مؤثر أو فريق بيلعب كتير في النص.', 'Against an influential centre back or a team that plays through the middle.'],
    [
      ['المدافع المتقدم يضغط على صانع الألعاب ويمنعه يستلم مريح.', 'The advanced defender presses the centre back and disrupts his catch.'],
      ['الخمسة ورا يتحركوا مع الكرة زي الـ٦-٠.', 'The five behind slide with the ball like a 6-0.'],
      ['المتقدم يقطع التمريرات العرضية بين الظهراء.', 'The advanced defender intercepts cross-court passes.'],
      ['لما الكرة تروح للجناح، المتقدم يرجع يساعد في النص.', 'When the ball goes to the wing, the advanced defender helps centrally.']
    ]),

  T('handball_3_2_1', 'handball', 'system', 'advanced',
    ['دفاع ٣-٢-١', '3-2-1 defense'],
    ['دفاع عميق وهجومي على ثلاث خطوط: ٣ على الـ٦ متر، ٢ عند حوالي ٨ متر، و١ متقدم عند الـ٩-١٠ متر. هدفه قطع الكرة وكسر إيقاع الخصم.', 'A deep, aggressive defence on three lines: three at 6 m, two around 8 m, one advanced at 9-10 m. Aims to steal balls and disrupt rhythm.'],
    ['ضد فريق ضعيف في اللعب بدون كرة أو اختراق واحد لواحد.', 'Against teams weak at movement without the ball or at 1v1 play.'],
    [
      ['اللاعب المتقدم (القمة) يضغط على صانع الألعاب.', 'The tip defender presses the centre back.'],
      ['الاتنين في النص (الخط التاني) يضايقوا الظهراء ويقطعوا التمريرات.', 'The two halves pressure the backs and intercept passes.'],
      ['الثلاثة على الخط: جناحين ولاعب في النص للاعب الدائرة.', 'The three on the line: two wings and a centre defender on the pivot.'],
      ['التحرك جماعي والتسليم والتسلم واضح.', 'Move collectively with clear switching.'],
      ['كل قطع كرة يتحول لهجمة سريعة.', 'Turn every steal into a fast break.']
    ]),

  T('handball_fast_break_waves', 'handball', 'transition', 'intermediate',
    ['الهجوم الخاطف بالموجات (١-٢-٣)', 'Fast break waves (1st, 2nd, 3rd)'],
    ['الموجة الأولى: الجناحين يجروا فورًا لتمريرة طويلة من الحارس. الموجة التانية: الظهراء ولاعب الدائرة يهاجموا قبل ما الدفاع يتنظم. الموجة التالتة: هجوم منظم سريع (الهجوم الخاطف الممتد).', 'First wave: wings sprint for a long pass from the keeper. Second wave: backs and pivot attack before the defence sets. Third wave: an extended quick attack into the organised phase.'],
    ['بعد صدة الحارس أو قطع الكرة أو تصويبة خصم خارج المرمى.', 'After a save, a steal or a missed shot.'],
    [
      ['الحارس يرمي تمريرة طويلة للجناح اللي انطلق (الموجة الأولى).', 'The keeper throws long to the sprinting wing (first wave).'],
      ['لو مقفول: الحارس يمرر لأقرب ظهير.', 'If closed: the keeper passes to the nearest back.'],
      ['الظهراء ولاعب الدائرة يطلعوا بسرعة ٤ ضد ٣ أو ٣ ضد ٢ (الموجة التانية).', 'Backs and pivot sprint for 4v3 or 3v2 (second wave).'],
      ['لو الدفاع رجع: تمريرات سريعة واختراق قبل التنظيم (الموجة التالتة).', 'If the defence recovers: quick passes and penetration before it settles (third wave).']
    ]),

  T('handball_crossing', 'handball', 'combination', 'intermediate',
    ['التقاطع (كروسينج)', 'Crossing'],
    ['لاعبين (غالبًا صانع الألعاب والظهير) يجروا عكس بعض ويتقاطعوا، والتمريرة في لحظة التقاطع بتلخبط تسليم وتسلم المدافعين.', 'Two players (often centre and half back) run across each other, with the pass at the crossing point confusing defensive switching.'],
    ['ضد دفاع ٦-٠ أو ٥-١ بيتسلم ويسلم.', 'Against 6-0 or 5-1 defences that switch.'],
    [
      ['صانع الألعاب يهاجم بالكرة بشكل مائل ناحية الظهير.', 'The centre back drives diagonally toward the half back.'],
      ['الظهير يجري من وراه للجهة العكسية.', 'The half back runs behind him in the opposite direction.'],
      ['تمريرة في لحظة التقاطع.', 'Hand-off/pass at the crossing point.'],
      ['اللي استلم يصوّب أو يمرر للجناح أو الدائرة لو المدافع ساب مكانه.', 'The receiver shoots or passes to the wing/pivot if a defender leaves his zone.']
    ]),

  T('handball_piston', 'handball', 'attack', 'beginner',
    ['حركة البستون (المكبس)', 'Piston movement'],
    ['كل ظهير يهاجم الفراغ اللي قدامه بالكرة ويمرر ويرجع لورا، زي مكبس رايح جاي، عشان يثبت المدافعين ويفتح فراغات.', 'Each back attacks the gap in front of him with the ball, passes and retreats like a piston, fixing defenders and opening gaps.'],
    ['الأساس ضد الدفاع المنطقة ٦-٠.', 'The foundation against a 6-0 zone.'],
    [
      ['الظهير يستلم وهو جاري لقدام ناحية الفراغ بين مدافعين.', 'The back receives on the move toward the gap between two defenders.'],
      ['يجذب مدافعين له.', 'He draws two defenders.'],
      ['يمرر للي جنبه اللي بيعمل نفس الحركة.', 'He passes to the next player, who does the same.'],
      ['يرجع لورا لمكانه جاهز للكرة تاني.', 'He retreats to his spot, ready again.'],
      ['لما مدافع يتأخر: تصويب أو تمريرة للجناح أو الدائرة.', 'When a defender is late: shoot or feed the wing or pivot.']
    ]),

  T('handball_pivot_screen', 'handball', 'combination', 'intermediate',
    ['حجز لاعب الدائرة للظهير (بلوك وتصويب)', 'Pivot screen for the back'],
    ['لاعب الدائرة يعمل حجز (بلوك) على مدافع، والظهير يهاجم من جنبه، ولو المدافعين غيّروا يدور لاعب الدائرة ويستلم.', 'The pivot screens a defender, the back attacks off it, and if defenders switch, the pivot rolls for the pass — handball’s pick-and-roll.'],
    ['ضد دفاع ٦-٠ مدافعينه النص طوال.', 'Against a 6-0 with tall centre defenders.'],
    [
      ['لاعب الدائرة يحجز جنب المدافع رقم ٣ أو ٢.', 'The pivot screens beside the 3 or 2 defender.'],
      ['الظهير يهاجم من جنب الحجز ويصوب من بعد ٩ متر أو يخترق.', 'The back attacks off the screen and shoots from 9 m or penetrates.'],
      ['لو المدافع التاني ساب لاعب الدائرة: يدور ويستلم.', 'If the other defender leaves the pivot: roll and receive.'],
      ['تسديد من الدائرة.', 'Finish from 6 m.']
    ]),

  T('handball_wing_in', 'handball', 'attack', 'intermediate',
    ['دخول الجناح كلاعب دائرة تاني', 'Wing running in (second pivot)'],
    ['الجناح يجري على خط الـ٦ متر ناحية النص ويبقى لاعب دائرة تاني، فبيبقى في الدفاع لاعبين دائرة يتقفلوا.', 'The wing runs along the 6 m line into the middle to become a second pivot, overloading the defence’s centre.'],
    ['ضد دفاع ٦-٠ أو ٥-١ عشان تغير الشكل لـ٤-٢.', 'Against 6-0 or 5-1 to switch into a 4-2 shape.'],
    [
      ['الظهير يهاجم ناحية الجناح.', 'The half back attacks toward the wing side.'],
      ['الجناح يجري لجوه على خط الـ٦.', 'The wing runs in along the 6 m line.'],
      ['الظهير البعيد يفتح مكان الجناح (أو صانع الألعاب يملا).', 'The far back or centre refills the width.'],
      ['تمريرة للاعب الدائرة الحر أو تصويب من الفراغ اللي اتفتح.', 'Feed the free pivot or shoot through the new gap.']
    ]),

  T('handball_7v6', 'handball', 'attack', 'advanced',
    ['الهجوم ٧ ضد ٦ (سحب الحارس)', '7v6 attack (empty goal)'],
    ['تبدّل الحارس بلاعب ميدان سابع عشان تعمل تفوق عددي في الهجوم. المرمى بيبقى فاضي فأي فقد للكرة خطر.', 'Replace the goalkeeper with a seventh court player to create an extra attacker. The goal is empty, so any turnover is dangerous.'],
    ['وإنت ناقص لاعب (إيقاف دقيقتين) أو محتاج أهداف ضد دفاع قوي.', 'When short-handed after a 2-minute suspension or chasing goals against a strong defence.'],
    [
      ['اللاعب السابع يدخل بدل الحارس (بدون قميص خاص في القانون الحالي).', 'The seventh player enters for the keeper (no special bib required under current rules).'],
      ['شكل ٤-٢ أو ٣-٣ بلاعبين دائرة.', 'Use a 4-2 or 3-3 with two pivots.'],
      ['تمريرات صبورة لحد ما يتفتح لاعب حر (غالبًا جناح أو دائرة).', 'Patient passing until a free player appears (often wing or pivot).'],
      ['ماتصوبش من بعيد بدون ضمان — الكرة الضايعة هدف في المرمى الفاضي.', 'Avoid low-percentage long shots — a turnover means an empty-net goal.'],
      ['بعد التصويب: الحارس يرجع بسرعة أو أقرب لاعب يجري للمرمى.', 'After the shot: the keeper returns fast or the nearest player sprints back.']
    ]),

  T('handball_defend_7v6', 'handball', 'defense', 'advanced',
    ['الدفاع ضد ٧ ضد ٦', 'Defending the 7v6'],
    ['الدفاع الستة ضد سبعة مهاجمين: تغطية لاعبي الدائرة، ضغط على التمريرات، والتصويب في المرمى الفاضي لو قطعت الكرة.', 'Six defenders against seven attackers: cover the pivots, pressure passing lanes and shoot into the empty net after a steal.'],
    ['لما الخصم يسحب حارسه.', 'When the opponent pulls the keeper.'],
    [
      ['دفاع ٦-٠ ضيق يقفل لاعبين الدائرة.', 'Compact 6-0 to lock down both pivots.'],
      ['اسمح بالتصويب من بعيد بس بلوك قوي.', 'Allow long shots but with a strong block.'],
      ['ضغط مفاجئ على تمريرة متوقعة للقطع.', 'Jump an expected pass for a steal.'],
      ['بعد القطع أو الصدة: تصويب مباشر في المرمى الفاضي من ملعبك.', 'After a steal or save: shoot straight into the empty goal.']
    ]),

  T('handball_quick_throw_off', 'handball', 'transition', 'intermediate',
    ['البداية السريعة بعد الهدف', 'Fast throw-off after conceding'],
    ['بعد ما الخصم يسجل، الحارس يمرر بسرعة للاعب في منطقة البداية في النص ويبدأ الهجوم قبل ما الخصم يرجع دفاع منظم.', 'After conceding, the keeper feeds a player in the centre throw-off area immediately to attack before the opponent sets up.'],
    ['لفريق لياقته عالية وضد خصم بطيء في الرجوع.', 'For a fit team against an opponent slow to transition.'],
    [
      ['الحارس يجيب الكرة بسرعة ويمررها للاعب في منطقة البداية.', 'The keeper retrieves the ball and passes to the player in the throw-off area.'],
      ['اللاعب يبدأ بإشارة الحكم ويمرر لقدام.', 'On the whistle he restarts and passes forward.'],
      ['الظهراء والجناحين منطلقين لقدام.', 'Backs and wings are already sprinting forward.'],
      ['هجوم سريع ضد دفاع لسه مش منظم.', 'Attack quickly against an unset defence.']
    ])
);

/* ───────────── كرة الطائرة ───────────── */
ALL.push(
  T('volleyball_5_1', 'volleyball', 'system', 'intermediate',
    ['نظام ٥-١', '5-1 system'],
    ['معد واحد بيعد في كل الدورات، وخمس ضاربين. بيدي ثبات في التوزيع، والمعد لما يبقى في الخط الأمامي بيبقى فيه ضاربين قدام بس.', 'One setter sets in all six rotations with five hitters. Gives consistent setting; when the setter is front row there are only two front-row attackers.'],
    ['للفرق المتقدمة اللي عندها معد ممتاز.', 'For advanced teams with a strong setter.'],
    [
      ['المعد ومقابله (أوبوزيت) في دورات متقابلة.', 'Setter and opposite are placed opposite each other in the rotation.'],
      ['ضاربين الطرف (أوتسايد) متقابلين، والسنتر متقابلين.', 'Outside hitters opposite each other; middles opposite each other.'],
      ['المعد يتحرك (بينيتريت) من الخط الخلفي لمنطقة ٢/٣ مع كل إرسال للخصم.', 'The setter penetrates from the back row to zone 2/3 on each opponent serve.'],
      ['الليبرو يدخل مكان السنتر في الخط الخلفي.', 'The libero replaces the middles in the back row.'],
      ['والمعد في الخط الخلفي: ٣ ضاربين أماميين + ضرب خلفي (pipe).', 'With the setter back row: three front-row hitters plus the back-row pipe.']
    ]),

  T('volleyball_6_2', 'volleyball', 'system', 'intermediate',
    ['نظام ٦-٢', '6-2 system'],
    ['معدين، كل واحد بيعد وهو في الخط الخلفي، فيبقى دايمًا ٣ ضاربين في الخط الأمامي.', 'Two setters, each setting only from the back row, so there are always three front-row hitters.'],
    ['للفرق اللي عندها معدين كويسين ومحتاجة ٣ ضاربين قدام دايمًا.', 'For teams with two capable setters wanting three front-row attackers at all times.'],
    [
      ['المعدين متقابلين في الدورة.', 'The two setters are opposite each other.'],
      ['المعد اللي في الخلف هو اللي بيعد.', 'The back-row setter sets.'],
      ['لما يطلع الخط الأمامي بيبقى ضارب (أو يتبدل).', 'When he rotates to the front row he becomes a hitter (or is substituted).'],
      ['الضغط على التبديلات لأن فيه تبديلات كتير متكررة.', 'Manage substitutions carefully — the system uses many.']
    ]),

  T('volleyball_serve_receive', 'volleyball', 'defense', 'beginner',
    ['استقبال الإرسال بثلاث لاعبين', 'Three-passer serve receive'],
    ['ثلاث مستقبلين (الليبرو وضاربين الطرف) بيقسموا الملعب لثلاث مناطق عشان يوصلوا كرة مظبوطة للمعد.', 'Three passers (libero and two outsides) split the court into three lanes to deliver a good pass to the setter.'],
    ['في كل استقبال إرسال، خصوصًا ضد الإرسال القوي.', 'Every serve reception, especially against tough servers.'],
    [
      ['الليبرو في النص والضاربين على الجنبين على بعد حوالي ٦-٧ متر من الشبكة.', 'Libero in the middle, outsides on either side about 6-7 m from the net.'],
      ['باقي اللاعبين يستخبوا (بعيد عن طريق الكرة) ومستعدين للهجوم.', 'Other players hide out of the passing lanes, ready to attack.'],
      ['نداء مبكر: "لي" أو "سيب".', 'Call early: "mine" or "out".'],
      ['الكرة بتروح لمنطقة المعد (بين منطقة ٢ و٣، حوالي متر من الشبكة).', 'Pass to the setter target between zones 2 and 3, about 1 m off the net.']
    ],
    [['المنصة (الساعدين) موجهة للهدف قبل وصول الكرة.', 'Angle the platform to the target before contact.']]),

  T('volleyball_quick_attack', 'volleyball', 'attack', 'intermediate',
    ['الضربة السريعة (كويك / A1)', 'Quick attack (first-tempo / A quick)'],
    ['لاعب السنتر يطلع يضرب قبل أو مع إعداد المعد، كرة واطية سريعة قدام المعد، فيسحب حائط الصد السنتر.', 'The middle hitter jumps before or as the setter sets, hitting a low fast ball just in front of the setter and pulling the middle blocker.'],
    ['مع استقبال جيد، لتثبيت سنتر الخصم.', 'Off a good pass, to pin the opponent’s middle blocker.'],
    [
      ['الاستقبال يوصل للمعد مظبوط.', 'A good pass reaches the setter.'],
      ['السنتر يبدأ خطواته وهو الكرة في الهوا ويكون في الهوا وقت الإعداد.', 'The middle starts his approach while the pass is in the air and is airborne at the set.'],
      ['المعد يرفع كرة قصيرة سريعة قدام إيد الضارب.', 'The setter delivers a short, fast ball to the hitter’s hand.'],
      ['الضرب بزاوية أو على الخط حسب الحائط.', 'Hit angle or line depending on the block.']
    ]),

  T('volleyball_combination_play', 'volleyball', 'combination', 'advanced',
    ['اللعب المركّب (X / tandem)', 'Combination play (X and tandem)'],
    ['ضاربين بيتحركوا في نفس المنطقة بتوقيتين مختلفين: السنتر يضرب كويك والضارب التاني يجي وراه أو يتقاطع معاه ويضرب كرة أعلى شوية.', 'Two hitters attack the same area with different tempos: the middle fakes or hits the quick while the second hitter crosses behind or follows for a slightly higher set.'],
    ['ضد حائط صد بيقفز مع السنتر.', 'Against blockers who commit on the middle.'],
    [
      ['السنتر يطلع كويك قدام المعد.', 'The middle jumps for the quick in front of the setter.'],
      ['الضارب التاني يجي متأخر ورا السنتر (تاندم) أو يتقاطع معاه (X).', 'The second hitter comes late behind the middle (tandem) or crosses him (X).'],
      ['المعد يختار حسب الحائط: الكويك أو الكرة التانية.', 'The setter chooses by the block: the quick or the second ball.'],
      ['الضارب يضرب في الفراغ اللي سابه الحائط.', 'The hitter attacks the gap left by the block.']
    ]),

  T('volleyball_pipe', 'volleyball', 'attack', 'intermediate',
    ['الضرب من الخط الخلفي (Pipe)', 'Back-row pipe attack'],
    ['ضارب من الخط الخلفي يقفز قبل خط الـ٣ متر ويضرب كرة في النص، بيضيف ضارب رابع في الهجوم.', 'A back-row hitter takes off behind the 3 m line and attacks through the middle, adding a fourth attacker.'],
    ['مع استقبال جيد والمعد في الخط الأمامي أو لتشتيت الحائط.', 'Off a good pass, especially when the setter is front row or to stretch the block.'],
    [
      ['السنتر يطلع كويك يثبت الحائط.', 'The middle runs a quick to hold the block.'],
      ['الضارب الخلفي يبدأ خطواته من منطقة ٦.', 'The back-row hitter approaches from zone 6.'],
      ['يقفز من ورا خط الـ٣ متر.', 'He takes off behind the 3 m line.'],
      ['يضرب في النص أو للفراغ بين الحائط.', 'He hits through the seam or the middle.']
    ],
    [['القفز لازم يكون ورا خط الهجوم — النزول قدامه مسموح.', 'Take-off must be behind the attack line — landing in front is legal.']]),

  T('volleyball_block_schemes', 'volleyball', 'defense', 'intermediate',
    ['خطط حائط الصد: قراءة، تجمع، التزام', 'Block schemes: read, bunch, commit'],
    ['قراءة: الحائط يستنى الإعداد ويتحرك. تجمّع (بانش): التلاتة قريبين من النص. التزام (كوميت): السنتر يقفز مع الكويك.', 'Read: blockers wait for the set, then move. Bunch: all three start near the middle. Commit: the middle jumps with the quick hitter.'],
    ['حسب هجوم الخصم: فريق معتمد على الكويك، أو على ضارب طرف واحد.', 'Based on the opponent: quick-heavy offences or a single dominant outside.'],
    [
      ['حدد أخطر ضارب قبل كل إرسال.', 'Identify the most dangerous hitter before each serve.'],
      ['اختار: سبريد (منتشر) ضد هجوم الأطراف، بانش ضد النص.', 'Choose: spread against wide attacks, bunch against the middle.'],
      ['العين: الكرة، المعد، الكرة، الضارب.', 'Eye sequence: ball, setter, ball, hitter.'],
      ['اقفل الخط أو الزاوية حسب خطة الدفاع ورا الحائط.', 'Take line or angle according to the floor defence plan.']
    ]),

  T('volleyball_perimeter_defense', 'volleyball', 'defense', 'intermediate',
    ['الدفاع الأرضي المحيطي (Perimeter)', 'Perimeter floor defense'],
    ['اللاعبين الخلفيين على حواف الملعب، ولاعب الأمامي اللي مش في الحائط ينزل يغطي الزاوية القصيرة. قوي ضد الضرب القوي.', 'Back-row defenders spread to the perimeter while the non-blocking front-row player drops to cover the short angle. Strong against hard-driven attacks.'],
    ['ضد فريق بيضرب بقوة أكتر من الكرات الخفيفة (تيب).', 'Against teams that hit hard more than they tip.'],
    [
      ['الحائط يقفل منطقة واحدة (خط أو زاوية).', 'The block takes one zone (line or angle).'],
      ['لاعب منطقة ١ أو ٥ على الخط، ولاعب منطقة ٦ في آخر الملعب.', 'Zone 1 or 5 on the line, zone 6 deep.'],
      ['الضارب الأمامي الحر ينزل لخط الـ٣ متر للزاوية.', 'The free front-row player drops to the 3 m line for the angle.'],
      ['الاستعداد للكرات الخفيفة من اللاعب الأقرب.', 'Nearest player covers tips.']
    ]),

  T('volleyball_transition', 'volleyball', 'transition', 'intermediate',
    ['التحول من الدفاع للهجوم', 'Transition from defense to attack'],
    ['بعد الحائط أو الدفاع الأرضي، الضاربين بيرجعوا بسرعة لورا خط الـ٣ متر عشان ياخدوا خطوات ويضربوا.', 'After blocking or digging, hitters quickly return off the net to open up and approach for the counter-attack.'],
    ['بعد كل صدة (ديج) ناجحة.', 'After every successful dig.'],
    [
      ['الحائط ينزل ويلف ناحية الكرة.', 'Blockers land and turn toward the ball.'],
      ['الضاربين يرجعوا لنقطة بداية الخطوات (حوالي ٣-٤ متر).', 'Hitters retreat to their approach start (about 3-4 m).'],
      ['المعد يوصل للكرة، ولو مش قادر، لاعب تاني يرفع كرة عالية للطرف.', 'The setter gets to the ball; if not, another player sets a high ball to the outside.'],
      ['الضرب من أي مكان متاح.', 'Attack from any available option.']
    ]),

  T('volleyball_serving_plan', 'volleyball', 'game_plan', 'intermediate',
    ['خطة الإرسال التكتيكية', 'Tactical serving plan'],
    ['إرسال موجه لأضعف مستقبل، أو للمنطقة بين لاعبين، أو للضارب اللي هيهاجم عشان تبطأ خطواته.', 'Target the weakest passer, the seam between passers, or the hitter who is about to attack to disrupt his approach.'],
    ['قبل المباراة بالتحليل، وبتتعدل كل دورة.', 'Planned from scouting and adjusted by rotation.'],
    [
      ['حدد أضعف مستقبل في الفريق.', 'Identify the weakest passer.'],
      ['اختار نوع الإرسال: جامب فلوت للدقة، جامب سبين للقوة.', 'Choose the serve: jump float for accuracy, jump spin for power.'],
      ['وجّه الإرسال للفاصل بين لاعبين أو لمنطقة ١ عشان تصعّب تحرك المعد.', 'Serve seams, or to zone 1 to complicate the setter’s penetration.'],
      ['وقت الضغط (نقط ٢٠+): دقة أكتر وأخطاء أقل.', 'Under pressure (20+ points): prioritise accuracy and fewer errors.']
    ])
);


export const SPORT_TACTICS = ALL;
