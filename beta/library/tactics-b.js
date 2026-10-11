/*
 * مكتبة الرياضة — الخطط التكتيكية (الجزء التاني)
 * =================================================
 * الرجبي، الهوكي، الصالات، كرة الماء، البيسبول، رياضات المضرب، وخطط السباقات
 * (عدو، مسافات متوسطة، ماراثون، جري، دراجات، ترايثلون، سباحة، تجديف، هايروكس، كروس فيت).
 * كل عنصر: النوع، المستوى، الاسم، الوصف، إمتى تستخدمه، الخطوات بالترتيب، ونقاط تعليمية.
 * بيانات بس — مفيش منطق هنا. التحقق: node tools/check-hub.js tactics library/tactics-b.js
 *
 * ملحوظة: "هوكي" هنا المقصود بيه هوكي الميدان (الأكثر انتشارًا في مصر) وقوانين FIH.
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

/* ───────────── رجبي ───────────── */
ALL.push(
  T('rugby_scrum_8_9', 'rugby', 'set_piece', 'intermediate',
    ['لعبة من الاسكرام (٨-٩)', 'Scrum play (8-9)'],
    ['استغلال كرة الاسكرام النضيفة: رقم ٨ بيشيل الكورة من ورا الاسكرام ويهاجم الجنب الضيق مع الـ٩، والدفاع لسه متجمع.', 'Use clean scrum ball: the No. 8 picks from the base and attacks the short side with the 9 while the defence is still bunched.'],
    ['اسكرام ثابت متقدم، وخصوصًا لما الجنب الضيق فيه مساحة وجناح واحد بس مدافع.', 'A stable, going-forward scrum, especially when the short side has space and only one defender.'],
    [
      ['اتفقوا على الإشارة قبل الإدخال: كورة سريعة لرقم ٨.', 'Agree the call before the feed: quick ball to the No. 8.'],
      ['الهوكر يكعب الكورة لورا لحد رجلين رقم ٨ والمهاجمين يثبتوا الدفعة.', 'The hooker strikes the ball back to the No. 8’s feet while the pack holds the shove.'],
      ['رقم ٨ يشيل الكورة ويجري ناحية الجنب الضيق ويثبت الفلانكر المدافع.', 'The No. 8 picks up and runs at the short side, fixing the defending flanker.'],
      ['يمرر للـ٩ أو الجناح في الفراغ، أو يكمل بنفسه لو المدافع راح للتمريرة.', 'Pass to the 9 or wing in space, or carry on if the defender drifts to the pass.'],
      ['الفلانكرز يفكوا بسرعة ويدعموا لتكوين راك سريع.', 'Flankers detach quickly to support and secure a fast ruck.']
    ],
    [['رقم ٨ ميشيلش الكورة غير لما تكون ثابتة عند رجله.', 'The No. 8 picks only when the ball is settled at his feet.'], ['الجنب الضيق = سرعة قرار، مش قوة بس.', 'Short side is about speed of decision, not just power.']]),

  T('rugby_lineout_maul', 'rugby', 'set_piece', 'intermediate',
    ['لاين أوت ومول دافع', 'Lineout catch and drive maul'],
    ['استلام الكورة في اللاين أوت وتكوين مول منظم يدفع لقدام، وهو من أقوى طرق التسجيل قرب خط الخصم.', 'Win the lineout and form an organised driving maul — one of the most effective scoring tools near the opponent’s line.'],
    ['لاين أوت داخل الـ٢٢ متر بتوع الخصم، أو بعد ركلة جزاء للخط.', 'A lineout inside the opponent’s 22, typically after a penalty kicked to touch.'],
    [
      ['الهوكر يرمي في خط مستقيم للقافز المتفق عليه (غالبًا في النص أو الخلف).', 'The hooker throws straight to the called jumper (often middle or back).'],
      ['الرافعين يرفعوا القافز وينزلوه بثبات والكورة محمية ناحية ضهره.', 'Lifters raise and return the jumper safely with the ball protected away from the defence.'],
      ['اللاعبين يتقفلوا حوالين حامل الكورة ويتنقل الكورة لآخر لاعب في المول.', 'Players bind around the catcher and the ball is transferred to the back of the maul.'],
      ['الدفع منخفض ومتزامن في اتجاه واحد، مع تغيير الزاوية لو الدفاع وقف المول.', 'Drive low and together in one direction, changing angle if the defence stalls it.'],
      ['لما يعدوا الخط، آخر لاعب ينزل الكورة، أو الـ٩ يفتح اللعب لو المول وقف.', 'Once over the line the tail player grounds; if the maul stops, the 9 releases the ball.']
    ],
    [['الرمية المستقيمة شرط قانوني — رمية معوجة = اسكرام للخصم.', 'A straight throw is a legal requirement — not straight gives the opponent a scrum.'], ['القانون: لو المول وقف مرتين لازم الكورة تطلع.', 'Law: if the maul stops twice, the ball must be used.']]),

  T('rugby_pods_1331', 'rugby', 'system', 'advanced',
    ['نظام مجموعات ١-٣-٣-١', '1-3-3-1 forward pod system'],
    ['توزيع الثمانية مهاجمين على عرض الملعب: واحد على كل خط تماس، ومجموعتين من ٣ في النص، عشان الهجوم يلاقي حامل كورة ودعم في كل حتة.', 'Spread the eight forwards across the pitch — one on each edge and two pods of three in midfield — so the attack has carriers and support everywhere.'],
    ['في اللعب المفتوح بعد أكتر من مرحلة، لفرق عندها لياقة وتواصل كويس.', 'In open multi-phase play for fit teams with good communication.'],
    [
      ['حدد الأدوار: المهاجم الطرفي (غالبًا فلانكر أو هوكر) واقف قرب خط التماس.', 'Assign roles: an edge forward (often a flanker or hooker) near each touchline.'],
      ['مجموعتين من ٣ مهاجمين بين الـ١٥ متر يمين وشمال.', 'Two pods of three forwards between the 15-metre lines.'],
      ['الباك لاين بيقف ورا المجموعات أو بينها عشان يلعب خارجها ويستغل المساحة.', 'Backs sit behind or between the pods to play out the back and exploit space.'],
      ['كل مجموعة: واحد يشيل الكورة واتنين يدعموا ويكوّنوا الراك بسرعة.', 'In each pod one carries and two clean out the ruck immediately.'],
      ['بعد كل راك، المجموعات ترجع تتوزع على نفس الشكل قبل المرحلة الجاية.', 'After each ruck the pods reset to the same shape before the next phase.']
    ],
    [['الشكل أهم من الأسماء: أي لاعب يكمّل الفراغ الأقرب ليه.', 'Shape matters more than names: fill the nearest gap.']]),

  T('rugby_pick_and_go', 'rugby', 'attack', 'beginner',
    ['بيك آند جو قرب الخط', 'Pick and go near the line'],
    ['المهاجمين بيشيلوا الكورة من الراك ويخبطوا على طول بخطوات قصيرة، عشان يكسبوا سنتيمترات لحد الخط والدفاع مش قادر يتنظم.', 'Forwards pick from the base of the ruck and drive straight in short bursts, gaining inches to the line before the defence can reorganise.'],
    ['على بُعد ٥ متر أو أقل من خط التسجيل.', 'Within about five metres of the try line.'],
    [
      ['الـ٩ مش بيمرر؛ المهاجم القريب يشيل الكورة مباشرة من الراك.', 'The 9 does not pass; the nearest forward picks directly from the ruck.'],
      ['يدخل منخفض جدًا بالكتف ناحية الفراغ بين المدافعين.', 'Go in very low, shoulder first, at the gap between defenders.'],
      ['اتنين دعم يتقفلوا عليه على طول عشان يكملوا الدفع.', 'Two supporters latch on immediately to add drive.'],
      ['بعد التوقف، يمد الكورة لورا أو يمدها لخط التسجيل لو قريب.', 'When stopped, place the ball back or reach for the line if close.']
    ],
    [['وطي أكتر من المدافع.', 'Be lower than the defender.'], ['مد الكورة للخط مسموح بس بعد التوقف مباشرة (دبل موفمنت ممنوع).', 'Reaching is only legal immediately on being tackled (no double movement).']]),

  T('rugby_2v1_overlap', 'rugby', 'attack', 'beginner',
    ['٢ ضد ١ واستغلال الزيادة العددية', '2v1 draw-and-pass overlap'],
    ['حامل الكورة يثبت المدافع الأخير بالجري عليه، ويمرر في الوقت الصح للزميل اللي بره فيجري للخط لوحده.', 'The ball carrier fixes the last defender by running at him, then passes at the right moment so the outside man runs in clear.'],
    ['لما عندك مهاجمين أكتر من المدافعين على الطرف.', 'Whenever attackers outnumber defenders on the edge.'],
    [
      ['اجري على الكتف الداخلي للمدافع، مش ناحية خط التماس.', 'Run at the defender’s inside shoulder, not toward the touchline.'],
      ['خلّي الزميل على بعد ٣-٥ متر لبره ولورا شوية عشان التمريرة تبقى لورا.', 'Keep the support player 3-5 m wide and slightly deep so the pass goes backwards.'],
      ['مرر بالإيدين الاتنين لما المدافع يلتزم بيك (وزنه اتنقل عليك).', 'Pass two-handed once the defender commits his weight to you.'],
      ['الزميل ياخد الكورة وهو جاري بسرعة ويدخل على خط مستقيم.', 'The receiver takes it at pace and straightens toward the line.']
    ],
    [['بدري = المدافع يلحق الزميل، متأخر = تتمسك.', 'Too early and he drifts onto the receiver; too late and you get tackled.']]),

  T('rugby_blitz_defence', 'rugby', 'defense', 'advanced',
    ['الدفاع الهجومي (بليتز)', 'Blitz (rush) defence'],
    ['خط الدفاع كله بيطلع بسرعة وبشكل متوازي من غير ما يستنى، عشان يقلل وقت ومساحة الهجوم ويكسب الاحتكاك قدام خط الأفضلية.', 'The whole line rushes up quickly and evenly, cutting the attack’s time and space and winning contact in front of the gain line.'],
    ['ضد فرق بتعتمد على التمرير الواسع أو لاعب ١٠ بيحب الوقت.', 'Against teams relying on wide passing or a fly-half who needs time.'],
    [
      ['الخط يتنظم بسرعة بعد الراك وكل مدافع يحدد لاعبه ("أنا معاه").', 'Reset quickly after the ruck and call your man.'],
      ['الطلوع مع بعض على إشارة واحدة (غالبًا أول لمسة للـ٩).', 'Go together on one trigger, usually the 9 touching the ball.'],
      ['المدافعين الخارجيين يقفلوا من بره لجوه عشان يحبسوا الكورة.', 'Outside defenders come in from out to in to trap the ball.'],
      ['اللي بيتدخل أول يستهدف الكورة، والتاني يحاول يسرق أو يبطّأ الراك.', 'The first tackler targets the ball; the second contests or slows the ruck.']
    ],
    [['أي لاعب يطلع لوحده بيعمل ثغرة.', 'A single defender rushing alone creates a hole.'], ['ماتعديش خط الأوفسايد (آخر رجل في الراك).', 'Stay onside behind the hindmost foot of the ruck.']]),

  T('rugby_drift_defence', 'rugby', 'defense', 'intermediate',
    ['الدفاع الانزلاقي (دريفت)', 'Drift defence'],
    ['الدفاع بيطلع بحذر ويتزحلق ناحية خط التماس، ويستخدم الخط كمدافع إضافي عشان يحوّل الزيادة العددية لمواجهة متساوية.', 'The line advances steadily and slides toward the touchline, using it as an extra defender to neutralise an overlap.'],
    ['لما الهجوم عنده زيادة عددية على الطرف، أو ضد فرق سريعة في الجري.', 'When the attack has an overlap wide, or against quick outside backs.'],
    [
      ['المدافع الداخلي يمسك حامل الكورة أو اللاعب اللي قدامه.', 'The inside defender takes the carrier or his direct man.'],
      ['المدافعين الخارجيين يتحركوا بزاوية لبره مع التمريرة ("انزلق").', 'Outside defenders slide outward with each pass.'],
      ['الظهير الأخير (١٥) يغطي من ورا ويحمي الركلات.', 'The fullback covers the back field and kicks.'],
      ['الهدف: دفع الهجوم لخط التماس وعمل التدخل هناك.', 'Aim to push the attack toward touch and make the tackle there.']
    ],
    [['اتكلم باستمرار: "انزلق" و"معايا".', 'Talk constantly: "drift" and "I’ve got him".'], ['ماتسيبش الكتف الداخلي مفتوح للقطع لجوه.', 'Do not open your inside shoulder to the cut-back.']]),

  T('rugby_kick_return_counter', 'rugby', 'counter', 'intermediate',
    ['هجوم مضاد من الركلة الطويلة', 'Counter-attack from a kick return'],
    ['استقبال ركلة الخصم والهجوم فورًا قبل ما خط مطاردته يتنظم، مستغلين المساحة عند اللي ماطاردوش.', 'Field the opponent’s kick and attack immediately before his chase line is organised, exploiting space where the chasers are thin.'],
    ['لما الركلة طويلة ومطاردة الخصم متقطعة أو جاية من جهة واحدة.', 'When the kick is long and the chase is ragged or comes from one side.'],
    [
      ['الظهير يستلم الكورة وعينه على خط المطاردة: فين الفراغ؟', 'The receiver fields the ball while reading the chase for gaps.'],
      ['الجناحين يرجعوا بسرعة ويقفوا جنبه للتمرير.', 'Wings retreat quickly and form width alongside him.'],
      ['اجري على المطارد الأبطأ أو ناحية الجهة اللي فيها عدد قليل.', 'Run at the slowest chaser or to the thin side.'],
      ['لو مفيش مساحة: ركلة تانية للمكان المفتوح أو اتمسك ونزل الكورة للدعم.', 'If no space appears, kick again to space or take contact and recycle.']
    ],
    [['القرار في أول ثانيتين.', 'Decide within the first two seconds.']]),

  T('rugby_box_kick_exit', 'rugby', 'game_plan', 'intermediate',
    ['الخروج من منطقة الـ٢٢ بتاعتك بالبوكس كيك', 'Exit strategy: box kick from own 22'],
    ['خطة آمنة للخروج من منطقة الخطر: الـ٩ بيركل كورة عالية فوق خط الدفاع ومطاردين بيتنافسوا عليها أو بيمسكوا المستقبل.', 'A safe exit from danger: the 9 kicks a high contestable ball over the defence while chasers compete for it or tackle the receiver.'],
    ['تحت ضغط جوه الـ٢٢ متر بتوعك، أو في جو فيه مطر أو ريح مع الفريق.', 'Under pressure inside your own 22, or in wet conditions or with the wind.'],
    [
      ['كوّنوا راك ثابت ومحمي وحد يقف كحماية للـ٩ (البلوكر).', 'Build a stable, protected ruck with a guard to shield the 9.'],
      ['الـ٩ يركل الكورة عالية (زمن طيران حوالي ٤-٥ ثواني) ناحية خط التماس.', 'The 9 kicks high (roughly 4-5 seconds hang time) toward the touchline area.'],
      ['الجناح يطارد عشان يقفز على الكورة أو يمسك المستقبل وقت نزوله.', 'The wing chases to contest in the air or tackle on landing.'],
      ['باقي الخط يطلع مع بعض عشان يمنع الهجوم المضاد.', 'The rest of the line rises together to shut down any counter.']
    ],
    [['المطارد ميلمسش المستقبل وهو في الهوا — دي مخالفة خطيرة.', 'Never take the receiver in the air — dangerous and penalised.']])
);

/* ───────────── هوكي (هوكي الميدان) ───────────── */
ALL.push(
  T('hockey_pc_drag_flick', 'hockey', 'set_piece', 'intermediate',
    ['ركنية قصيرة: إدخال - إيقاف - دراج فليك', 'Penalty corner: inject, stop, drag flick'],
    ['اللعبة الأساسية في الركنية القصيرة: الإدخال من خط النهاية، الإيقاف عند حافة الدائرة، والتسديد بالدراج فليك ناحية الزوايا.', 'The core penalty-corner routine: inject from the back line, stop at the top of the circle, drag-flick to the corners.'],
    ['في كل ركنية قصيرة لو عندك لاعب دراج فليك متخصص.', 'On every penalty corner when you have a specialist drag-flicker.'],
    [
      ['المُدخِل يرسل الكورة بقوة ودقة لنقطة الإيقاف المتفق عليها.', 'The injector pushes the ball hard and accurately to the agreed stopping point.'],
      ['اللاعب اللي بيوقف الكورة يثبتها برة خط الدائرة، والكورة لازم تخرج بره الدائرة قبل التسديد.', 'The stopper traps it; the ball must travel outside the circle before a shot.'],
      ['المسدد يسحب الكورة على طول العصاية ويطلقها بحركة جسم كاملة ناحية الزاوية.', 'The flicker drags the ball along the stick and releases it with full-body action toward a corner.'],
      ['لاعبين على القائمين أو قدام الحارس للتحويل أو المتابعة.', 'Players on the posts or in front of the keeper look for deflections and rebounds.']
    ],
    [['القانون: أول تسديدة لو ضربة (هيت) لازم تعدي خط المرمى تحت ارتفاع ٤٦٠ مم. الدراج فليك مسموح أعلى بشرط الأمان.', 'Law: if the first shot is a hit it must cross the goal line below 460 mm; a flick or drag may be higher if not dangerous.']]),

  T('hockey_pc_slip_deflection', 'hockey', 'set_piece', 'advanced',
    ['ركنية قصيرة: تمريرة جانبية وتحويل على القائم', 'Penalty corner: slip pass to post deflection'],
    ['بدل التسديد المباشر، الكورة بتروح لجنب لاعب على القائم بيحولها للمرمى وأول مدافع متقدم على المسدد.', 'Instead of a direct shot, the ball is slipped to a player at the post who deflects it in while the first runner has committed to the flicker.'],
    ['ضد دفاع أول مدافع فيه (الرانر) سريع جدًا ومركّز على المسدد.', 'Against a very fast first runner focused on the flicker.'],
    [
      ['نفس الإدخال والإيقاف المعتاد عشان الدفاع يفتكرها تسديدة.', 'Standard inject and stop to sell the shot.'],
      ['المسدد يعمل حركة التسديد، ثم يمرر أرضي لزميل على الجنب.', 'The flicker shapes to shoot, then slips the ball flat to a teammate at the side.'],
      ['الزميل يمرر عرضي سريع ناحية القائم البعيد.', 'The teammate passes quickly across toward the far post.'],
      ['اللاعب على القائم يحول الكورة بعصاية منخفضة للمرمى.', 'The post player deflects it in with a low stick.']
    ],
    [['التوقيت كله على الرانر: لازم يكون التزم.', 'Timing depends on the first runner having committed.']]),

  T('hockey_pc_defence', 'hockey', 'defense', 'intermediate',
    ['الدفاع في الركنية القصيرة', 'Penalty corner defence'],
    ['خمس مدافعين بس (منهم الحارس) ورا خط النهاية، والباقي عند خط النص؛ كل واحد له دور محدد عشان يقفل التسديدة والتحويلات.', 'Only five defenders (including the keeper) behind the back line, the rest at the halfway line; each has a set role to block the shot and deflections.'],
    ['في كل ركنية قصيرة ضدك.', 'On every penalty corner conceded.'],
    [
      ['الرانر الأول يطلع مباشرة على المسدد لقفل زاوية التسديد (ويلبس واقي).', 'The first runner charges the flicker to close the shooting angle (with protective equipment).'],
      ['الحارس يطلع خطوة ويقف في وضع يغطي الزاوية المتبقية.', 'The keeper steps out and sets to cover the remaining angle.'],
      ['لاعب على القائم (أو قرب الحارس) يغطي الجزء اللي الحارس مش واصل له.', 'A post player covers what the keeper cannot reach.'],
      ['لاعبين تانيين يغطوا التمريرات الجانبية والتحويلات.', 'Two others cover slip passes and deflection options.'],
      ['بعد التسديدة: تشتيت فوري للكورة بعيد عن الدائرة.', 'After the shot, clear the ball out of the circle immediately.']
    ],
    [['ماحدش يتحرك قبل ما الكورة تتلعب — تتعاد الركنية أو المدافع يطلع.', 'Do not break before the ball is played — the defender is sent to halfway.']]),

  T('hockey_433', 'hockey', 'system', 'beginner',
    ['تشكيل ٤-٣-٣', '4-3-3 formation'],
    ['تشكيل متوازن: أربعة مدافعين، تلاتة وسط، تلاتة مهاجمين والحارس. عرض كويس في الهجوم وتغطية في الدفاع.', 'A balanced shape: four defenders, three midfielders, three forwards plus the keeper — good width going forward and cover at the back.'],
    ['كتشكيل أساسي لأغلب الفرق، وخصوصًا الناشئين.', 'As a default system, especially for developing teams.'],
    [
      ['اتنين قلب دفاع يغطوا بعض، واتنين ظهير جنب يطلعوا للهجوم بالتبادل.', 'Two centre-backs cover each other; full-backs overlap in turn.'],
      ['لاعب وسط ارتكازي بيوزع اللعب، واتنين وسط بيربطوا بالهجوم.', 'A holding midfielder distributes; two link players join the attack.'],
      ['مهاجم في النص يثبت قلوب الدفاع، وجناحين يحافظوا على العرض.', 'A centre-forward pins the centre-backs; two wide forwards hold width.'],
      ['وقت الدفاع: المهاجمين يضغطوا أول، والوسط يقفل خطوط التمرير.', 'Out of possession the forwards press first and midfield blocks passing lanes.']
    ]),

  T('hockey_half_court_press', 'hockey', 'defense', 'intermediate',
    ['الضغط نص الملعب', 'Half-court press'],
    ['الفريق بيستنى الخصم عند نص الملعب تقريبًا ويوجه الكورة ناحية خط التماس، ثم يضغط جماعي لقطعها.', 'The team sets up around halfway, channels the ball toward the sideline, then presses collectively to win it.'],
    ['ضد فرق بتبني اللعب من الخلف بثقة، أو لما عايز تحافظ على مجهودك.', 'Against teams that build confidently from the back, or to conserve energy.'],
    [
      ['المهاجم في النص يقفل التمريرة لقلب الدفاع التاني.', 'The centre-forward blocks the switch between centre-backs.'],
      ['لما الكورة تروح للجنب، الجناح يضغط من جوه لبره.', 'When the ball goes wide, the wide forward presses from inside out.'],
      ['الوسط يقفل التمريرات القريبة، والظهير يقرب على المستقبل.', 'Midfielders shut short options; the full-back steps onto the receiver.'],
      ['التدخل عند خط التماس، والانطلاق فورًا لو الكورة اتقطعت.', 'Tackle near the sideline and break immediately on a turnover.']
    ],
    [['الضغط جماعي أو بلاش.', 'Press together or not at all.']]),

  T('hockey_baseline_cutback', 'hockey', 'attack', 'intermediate',
    ['الاختراق لخط النهاية والتمرير المرتد', 'Baseline drive and cut-back'],
    ['الجناح أو الظهير المتقدم يوصل لخط النهاية جوه الدائرة أو قربها ويمرر لورا لزميل قادم، لأن الأهداف بتتحسب من جوه الدائرة بس.', 'A wide player drives to the baseline and cuts the ball back to an arriving teammate — goals only count from inside the circle.'],
    ['لما الخصم بيقفل النص ويسيب الأطراف.', 'When the opponent packs the centre and leaves the flanks.'],
    [
      ['اسحب الكورة بسرعة على الطرف مع ظهير بيعمل دعم من وراك.', 'Carry the ball quickly down the flank with a full-back overlapping behind.'],
      ['ادخل الدائرة قرب خط النهاية.', 'Enter the circle near the baseline.'],
      ['المهاجم في النص يجري للقائم القريب، ولاعب وسط يوصل متأخر لحافة الدائرة.', 'The centre-forward attacks the near post; a midfielder arrives late at the top of the circle.'],
      ['مرر أرضي لورا بين الحارس والمدافعين.', 'Pass flat and backward between the keeper and defenders.']
    ]),

  T('hockey_self_pass', 'hockey', 'attack', 'beginner',
    ['الضربة الحرة السريعة (سيلف باس)', 'Quick free hit self-pass'],
    ['اللاعب ينفذ الضربة الحرة لنفسه ويجري بالكورة فورًا قبل ما الدفاع ينظم نفسه.', 'The player takes the free hit to himself and runs with it immediately before the defence resets.'],
    ['أي ضربة حرة في نص الملعب أو قرب منطقة الـ٢٣ متر لما الخصم مش متنظم.', 'Any free hit in midfield or near the 23 when the opponent is disorganised.'],
    [
      ['الكورة لازم تكون ثابتة في مكان المخالفة تقريبًا.', 'The ball must be stationary at (about) the spot of the offence.'],
      ['ادفع الكورة لنفسك وانطلق في الفراغ.', 'Tap the ball to yourself and accelerate into space.'],
      ['في الـ٢٣ متر بتوع الخصم: الكورة لازم تتحرك ٥ متر قبل ما تدخل الدائرة.', 'In the attacking 23 the ball must travel 5 m before entering the circle.'],
      ['مرر أو ادخل لما الدفاع يقرب.', 'Pass or penetrate once defenders close.']
    ],
    [['المدافعين لازم يبعدوا ٥ متر — استغل اللي لسه قريب.', 'Defenders must be 5 m away — punish those who are not.']]),

  T('hockey_counter_aerial', 'hockey', 'counter', 'advanced',
    ['الهجوم المضاد بالكورة الهوائية', 'Counter-attack with an aerial'],
    ['بعد قطع الكورة في منطقتك، تمريرة هوائية طويلة (سكوب) فوق خط الوسط لمهاجم منطلق، وتتعدى الضغط كله في لمسة.', 'After a turnover deep in your half, a long aerial scoop over midfield to a running forward bypasses the press in one action.'],
    ['لما الخصم متقدم بعدد كبير وفي مساحة ورا دفاعه.', 'When the opponent has committed numbers forward and space exists behind.'],
    [
      ['اللاعب اللي قطع الكورة يرفع راسه فورًا.', 'The player who wins the ball lifts his head immediately.'],
      ['المهاجم يجري في المساحة ورا الدفاع.', 'The forward runs into the space behind the defence.'],
      ['ارفع الكورة بالسكوب في مسار أمان بعيد عن اللاعبين.', 'Scoop the aerial on a safe trajectory away from players.'],
      ['المستقبل يلتقط الكورة وتدخل الدائرة قبل رجوع الدفاع.', 'The receiver controls and attacks the circle before defenders recover.']
    ],
    [['القانون: ممنوع تقرب من المستقبل أقل من ٥ متر لحد ما يسيطر على الكورة.', 'Law: opponents may not approach within 5 m of the receiver until the ball is controlled.']])
);

/* ───────────── كرة قدم الصالات ───────────── */
ALL.push(
  T('futsal_3_1', 'futsal', 'system', 'beginner',
    ['طريقة ٣-١ (المعين)', '3-1 system (diamond)'],
    ['تلاتة في الخلف والأجناب ولاعب محور (بيفوت) متقدم قدام؛ الشكل ده بيدي توازن وخيار تمرير عميق دايمًا.', 'Three players at the back and wings with a pivot up front; gives balance and a permanent deep passing option.'],
    ['للفرق اللي عندها لاعب محور قوي بيستلم وضهره للمرمى.', 'For teams with a strong pivot who can receive with his back to goal.'],
    [
      ['اللاعب الخلفي (الفيكسو) في النص يبني اللعب ويحمي من المرتدات.', 'The fixo (last player) builds play centrally and guards against counters.'],
      ['الجناحين (الألا) على الخطوط الجانبية لفتح العرض.', 'The wings (alas) hold width on the touchlines.'],
      ['المحور يثبت نفسه قدام المدافع قريب من منطقة الجزاء.', 'The pivot pins his defender near the penalty area.'],
      ['تمريرة للمحور ثم حركة داعمة من الجناح (قطري أو موازي) لاستلام التمريرة المرتدة.', 'Pass into the pivot, then a wing makes a supporting run (diagonal or parallel) for the lay-off.']
    ],
    [['المحور لازم يحمي الكورة بجسمه قبل ما يستلم.', 'The pivot shields with his body before receiving.']]),

  T('futsal_4_0', 'futsal', 'system', 'advanced',
    ['طريقة ٤-٠ (الدوران)', '4-0 rotation system'],
    ['الأربعة لاعبين على خط واحد تقريبًا ومفيش محور ثابت؛ حركة دوران مستمرة وتمريرات وتسليم وتسلم عشان تفتح مساحات للاختراق.', 'All four players start roughly in line with no fixed pivot; constant rotations and pass-and-follow movements open space to penetrate.'],
    ['ضد دفاع رجل لرجل، ومع لاعبين عندهم فنيات ولياقة متشابهة.', 'Against man-to-man marking, with technically and physically similar players.'],
    [
      ['اتنين في النص واتنين على الأجناب في خط واحد تقريبًا قرب نص الملعب.', 'Two central and two wide, roughly level near halfway.'],
      ['مرر للجناح واجري قطريًا ناحية المرمى (باس وجري).', 'Pass to the wing and make a diagonal run toward goal (pass and go).'],
      ['اللاعبين الباقيين يتحركوا مكان اللي جرى عشان الشكل يفضل موجود.', 'The others rotate to fill the vacated positions and keep the shape.'],
      ['لو المدافع تبع الجاري، المساحة تفتح للي مسك الكورة يخترق أو يسدد.', 'If the defender follows the runner, space opens for the ball-carrier to drive or shoot.']
    ],
    [['كل تمريرة بعدها حركة.', 'Every pass is followed by a movement.']]),

  T('futsal_power_play', 'futsal', 'attack', 'advanced',
    ['الحارس الطائر (٥ ضد ٤)', 'Flying goalkeeper power play (5v4)'],
    ['الحارس (أو لاعب لابس فانلة حارس) بيطلع يشارك في الهجوم عشان تبقى ٥ ضد ٤ وتدور الكورة لحد ما لاعب يبقى حر.', 'The keeper (or an outfield player in a keeper’s shirt) joins the attack to create 5 v 4, circulating until a shooter is free.'],
    ['متأخر في النتيجة في آخر دقايق، أو ضد فريق بيدافع بتكتل.', 'When trailing late in the game or against a deep block.'],
    [
      ['اتنظموا في شكل ٣-٢ أو ٢-٢-١ برة المنطقة.', 'Set up in a 3-2 or 2-2-1 around the area.'],
      ['تمرير سريع بلمستين لتحريك الدفاع.', 'Circulate quickly with one or two touches to shift the defence.'],
      ['ابحث عن التمريرة العرضية للقائم البعيد أو التسديد من بره.', 'Look for the back-post pass or a shot from distance.'],
      ['اللاعب الخلفي يفضل قريب من نص الملعب عشان المرمى الفاضي.', 'The deepest player stays near halfway because the goal is empty.']
    ],
    [['القانون: الحارس الطائر ميلمسش الكورة تاني في نص ملعبه بعد ما يمررها إلا لو الخصم لمسها.', 'Law: a keeper who has played the ball in his own half may not touch it again there until an opponent does.'], ['أي تمريرة غلط = هدف في مرمى فاضي.', 'A careless pass means a goal into an empty net.']]),

  T('futsal_defend_power_play', 'futsal', 'defense', 'advanced',
    ['الدفاع ضد الحارس الطائر', 'Defending the flying goalkeeper'],
    ['أربعة مدافعين في شكل معين (رومبس) أو مربع جوه وحوالين المنطقة، بيقفلوا النص ويسيبوا التسديد البعيد المراقب.', 'Four defenders in a diamond or box in and around the area, closing the centre and conceding only controlled long shots.'],
    ['لما الخصم يطلع حارس طائر.', 'Whenever the opponent uses a flying keeper.'],
    [
      ['اتنظموا بسرعة في شكل معين أو مربع قرب المنطقة.', 'Set quickly into a diamond or box near the area.'],
      ['كل مدافع يتحرك مع الكورة ويقفل خط التمرير للقائم البعيد.', 'Shift with the ball and block the pass to the back post.'],
      ['اللاعب القريب يضغط على حامل الكورة من غير ما يتسرع.', 'The nearest defender pressures the ball without diving in.'],
      ['لو قطعتوا الكورة: سددوا على المرمى الفاضي بسرعة وبدقة.', 'On a turnover, shoot quickly and accurately at the empty goal.']
    ],
    [['الصبر أهم من الضغط العشوائي.', 'Patience beats random pressing.']]),

  T('futsal_kick_in', 'futsal', 'set_piece', 'intermediate',
    ['لعبة ركلة التماس (كيك إن)', 'Kick-in routine'],
    ['في الصالات التماس بيتلعب بالرجل من على الخط ولازم يتنفذ في ٤ ثواني؛ لعبات محفوظة بتدي فرص تسجيل قريبة.', 'Futsal restarts from the touchline with a kick that must be taken within four seconds; rehearsed routines create close-range chances.'],
    ['تماس في الثلث الهجومي.', 'Kick-ins in the attacking third.'],
    [
      ['اللاعب ينفذ والكورة ثابتة على الخط ورجله على الخط أو بره.', 'The taker places the ball on the line with his support foot on or behind it.'],
      ['لاعب يعمل ستارة (بلوك) على مدافع عشان يفتح زميل.', 'One player screens a defender to free a teammate.'],
      ['الزميل الحر يجري للقائم البعيد أو يستلم على حافة المنطقة.', 'The freed player runs to the back post or receives at the edge of the area.'],
      ['تسديد مباشر أو لمسة تحويل.', 'Shoot first time or deflect.']
    ],
    [['المدافعين لازم يبعدوا ٥ متر.', 'Opponents must be at least 5 m away.'], ['عد الأربع ثواني في دماغك.', 'Count the four seconds in your head.']]),

  T('futsal_corner', 'futsal', 'set_piece', 'intermediate',
    ['لعبة الركنية', 'Corner kick routine'],
    ['الركنية في الصالات قريبة جدًا من المرمى؛ لعبة بتمريرة أرضية لحافة المنطقة وتسديد مباشر من لاعب قادم.', 'Futsal corners are very close to goal; a ground pass to the edge of the area for an arriving shooter is a classic routine.'],
    ['أي ركنية، مع تنويع اللعبات عشان الخصم مايقراش.', 'Any corner, rotating routines so they cannot be read.'],
    [
      ['اللاعبين يقفوا في شكل متفق عليه (مثلًا اتنين قرب القائمين وواحد عند القوس).', 'Players take agreed positions (e.g., two near the posts and one at the arc).'],
      ['حركة وهمية من اللاعبين القريبين تسحب المدافعين.', 'Decoy movements from near players drag markers.'],
      ['تمريرة أرضية سريعة للاعب القادم من الخلف.', 'A fast ground pass to the player arriving from deep.'],
      ['تسديد مباشر واللاعبين على القائمين يتابعوا.', 'First-time shot with players at the posts following in.']
    ],
    [['نفس قاعدة الأربع ثواني والخمس متر.', 'Same four-second and five-metre rules apply.']]),

  T('futsal_full_press', 'futsal', 'defense', 'intermediate',
    ['الضغط العالي رجل لرجل', 'Full-court man-to-man press'],
    ['كل لاعب مسؤول عن لاعب من أول ما الخصم يستلم، عشان تجبره على خطأ في نص ملعبه أو على إرسال طويل.', 'Each player tracks an opponent from the first touch, forcing errors in the opponent’s half or long balls.'],
    ['ضد فرق ضعيفة في بناء اللعب، أو لما محتاج تقطع الكورة بسرعة.', 'Against weak build-up teams, or when you need a quick turnover.'],
    [
      ['كل لاعب يحدد رقيبه وقت إعادة اللعب.', 'Each player picks up his man at the restart.'],
      ['اقفل خط التمرير لرقيبك وخليك بينه وبين الكورة.', 'Deny the pass by staying between your man and the ball.'],
      ['لو اتعدى زميل، اللاعب الأقرب يبدّل (سويتش) ويتكلم.', 'If a teammate is beaten, the nearest player switches with a call.'],
      ['الحارس جاهز للكرات الطويلة ورا الضغط.', 'The keeper sweeps long balls played over the press.']
    ],
    [['القانون: ٤ ثواني للحارس في نص ملعبه — الضغط بيستغلها.', 'Law: the keeper has four seconds in his own half — pressing exploits it.']]),

  T('futsal_gk_counter', 'futsal', 'transition', 'intermediate',
    ['المرتدة من رمية الحارس', 'Counter from a goalkeeper throw'],
    ['بعد ما الحارس يمسك الكورة، رمية سريعة ودقيقة للاعب منطلق تعمل ٢ ضد ١ أو ٣ ضد ٢ قبل ما الخصم يرجع.', 'After a save, a quick, accurate throw to a breaking player creates 2 v 1 or 3 v 2 before the opponent recovers.'],
    ['كل ما الخصم يخلص هجمة بعدد كبير.', 'Whenever the opponent finishes an attack with numbers forward.'],
    [
      ['الحارس يمسك الكورة ويرفع راسه على طول.', 'The keeper secures the ball and looks up immediately.'],
      ['الجناح البعيد ينطلق في المساحة الفاضية.', 'The far wing breaks into open space.'],
      ['رمية باليد (فوق الكتف أو دحرجة) قدام اللاعب مش عليه.', 'Throw (overarm or bowled) into the runner’s path, not to his feet.'],
      ['اللاعب يهاجم المرمى وزميل يجري معاه للقائم التاني.', 'The receiver attacks the goal with a teammate running to the far post.']
    ],
    [['الحارس عنده ٤ ثواني بس — قرر بسرعة.', 'The keeper has only four seconds — decide fast.']]),

  T('futsal_pivot_play', 'futsal', 'attack', 'intermediate',
    ['اللعب على المحور (بيفوت)', 'Playing through the pivot'],
    ['التمرير للمحور وهو ضهره للمرمى، وهو يرجع الكورة لزميل قادم أو يلف بنفسه ويسدد.', 'Feed the pivot with his back to goal; he lays off to an arriving teammate or turns and shoots.'],
    ['ضد مدافع قصير أو بطيء على المحور، أو لما الدفاع قافل الأجناب.', 'Against a smaller or slower marker on the pivot, or when wide areas are blocked.'],
    [
      ['المحور يثبت المدافع بجسمه ويطلب الكورة على الرجل البعيدة.', 'The pivot pins his defender and asks for the ball on his far foot.'],
      ['تمريرة أرضية قوية للمحور.', 'Play a firm ground pass into the pivot.'],
      ['المُمرِّر يجري على الجنب (حركة موازية) أو يقطع قطري.', 'The passer spins off (parallel run) or cuts diagonally.'],
      ['المحور يقرر: يرجع الكورة، يلف ويسدد، أو يمرر للقائم التاني.', 'The pivot decides: lay off, turn and shoot, or find the back post.']
    ])
);

/* ───────────── كرة الماء ───────────── */
ALL.push(
  T('water_polo_arc_offence', 'water_polo', 'system', 'beginner',
    ['الهجوم المتساوي: القوس ولاعب السنتر', 'Even-strength arc offence with centre forward'],
    ['خمسة لاعبين على قوس حوالين منطقة الـ٥ متر ولاعب سنتر (هول سيت) قدام المرمى؛ الكورة بتلف على القوس لحد ما تدخل للسنتر أو يبقى في تسديدة مفتوحة.', 'Five players on an arc around the 5 m area with a centre forward (hole set) in front of goal; the ball moves around the arc until it goes into centre or an open shot appears.'],
    ['الهجوم الأساسي في المواقف المتساوية ٦ ضد ٦.', 'The standard 6 v 6 half-court offence.'],
    [
      ['السنتر ياخد مكانه قدام المرمى ويثبت المدافع بضهره.', 'The centre forward sets in front of goal, sealing his defender.'],
      ['اللاعبين على القوس يمرروا بسرعة من الجنب للنص وبالعكس.', 'Perimeter players move the ball quickly side to side.'],
      ['لما المدافع يسيب السنتر من ناحية، مرر في الماية على الجهة المفتوحة.', 'When the centre is fronted on one side, pass wet to the open side.'],
      ['لو الدفاع نزل على السنتر، سدد من بره أو اعمل "درايف".', 'If defenders sag onto the centre, shoot from outside or drive.']
    ],
    [['اعمل الحسبة على ساعة الاستحواذ — ماتسبش التسديد للآخر.', 'Watch the shot clock — do not leave the shot to the last second.']]),

  T('water_polo_centre_entry', 'water_polo', 'attack', 'intermediate',
    ['الكورة للسنتر وكسب طرد', 'Centre entry to draw an exclusion'],
    ['السنتر يستلم الكورة قدام المرمى ويا يسدد (باك هاند أو سويب) يا يكسب طرد للمدافع وتبقى زيادة عددية.', 'The centre forward receives in front of goal and either shoots (backhand or sweep) or draws an exclusion foul for a power play.'],
    ['لما السنتر أقوى من مدافعه أو المدافع متأخر في التمركز.', 'When the centre is stronger than his defender or the defender is poorly positioned.'],
    [
      ['السنتر يثبت المدافع وراه ويرفع إيده للإشارة.', 'The centre seals the defender behind him and signals.'],
      ['تمريرة "ويت" على الماية جنب الإيد البعيدة عن المدافع.', 'A wet pass onto the water on the side away from the defender.'],
      ['يلف أو يسدد بسرعة، أو يحمي الكورة ويشد الحكم لمخالفة (مسك/إغراق).', 'Turn or shoot quickly, or protect the ball and draw a holding or sinking foul.'],
      ['الزملاء جاهزين يتنظموا للهجوم بالزيادة العددية.', 'Teammates are ready to set up the power play.']
    ]),

  T('water_polo_drive', 'water_polo', 'attack', 'intermediate',
    ['الدرايف (الاختراق بالسباحة)', 'The drive'],
    ['لاعب من القوس بيسبق مدافعه بسباحة قوية ناحية الـ٢ متر عشان يستلم حر أو يكسب طرد.', 'A perimeter player out-swims his defender toward the 2 m area to receive free or draw an exclusion.'],
    ['لما المدافع بيبص على الكورة أو بيساعد على السنتر.', 'When a defender ball-watches or helps on the centre.'],
    [
      ['اعمل حركة وهمية لبره بعدين اسبح لجوه بقوة.', 'Fake outward then sprint inward.'],
      ['كسب "الماية الداخلية" — جسمك بين المدافع والمرمى.', 'Win inside water — body between defender and goal.'],
      ['ارفع إيدك واطلب الكورة قدامك.', 'Raise a hand and call for the ball in front of you.'],
      ['سدد بسرعة أو كمّل للمخالفة. لو ماوصلتش، ارجع للقوس بسرعة.', 'Shoot quickly or draw the foul; if not open, clear back to the perimeter.']
    ],
    [['الدرايف بيفضي مكان لزميلك حتى لو ماستلمتش.', 'A drive clears space for others even without the ball.']]),

  T('water_polo_4_2_power_play', 'water_polo', 'set_piece', 'intermediate',
    ['الزيادة العددية ٦ ضد ٥ (شكل ٤-٢)', '6 on 5 power play (4-2)'],
    ['بعد طرد لاعب من الخصم: اتنين على خط الـ٢ متر جنب القائمين وأربعة على خط الـ٥ متر، والكورة بتتحرك بسرعة لحد ما لاعب يبقى حر.', 'After an exclusion: two players on the 2 m line by the posts and four on the 5 m line, moving the ball quickly until a shooter is free.'],
    ['أثناء وقت الطرد.', 'During the exclusion period.'],
    [
      ['اتنظموا في الشكل بسرعة من غير ما تضيعوا وقت.', 'Set up quickly without wasting time.'],
      ['تمرير سريع على الإيد الناشفة (دراي) بين الأربعة.', 'Fast dry passes among the four outside players.'],
      ['المدافع اللي بيحاول يغطي اتنين هيسيب واحد — مرر له.', 'The defender covering two will leave one — find him.'],
      ['تسديد من الـ٥ متر أو تمريرة للقائم للتحويل السريع.', 'Shoot from 5 m or pass to a post for a quick finish.']
    ],
    [['مسك الكورة كتير يدي الدفاع وقت يرجع.', 'Holding the ball lets the defence recover.']]),

  T('water_polo_press', 'water_polo', 'defense', 'beginner',
    ['الدفاع رجل لرجل (برس)', 'Man-to-man press'],
    ['كل مدافع ملاصق للاعبه، بيحاول يمنع التمرير ويسرق الكورة، مع حماية السنتر.', 'Each defender plays tight on his man, denying passes and trying to steal, while protecting the centre.'],
    ['ضد فرق ضعيفة في التسديد البعيد أو في آخر ثواني الاستحواذ.', 'Against poor outside shooters or late in the possession clock.'],
    [
      ['كل مدافع بين لاعبه والمرمى وإيده قريبة من الكورة.', 'Stay between your man and goal with a hand up toward the ball.'],
      ['راقب الإيد الفاضية عشان تقطع التمريرة.', 'Watch the passing hand to intercept.'],
      ['مدافع السنتر يحاول يقف قدامه (فرونت) والحارس يساعد على الكورة العالية.', 'The centre defender fronts and the keeper helps on lobs.'],
      ['لو قطعت الكورة: انطلق بسرعة للهجوم المضاد.', 'On a steal, sprint into the counter-attack.']
    ],
    [['ماتعملش مخالفة طرد وانت ورا لاعبك.', 'Avoid exclusion fouls from behind.']]),

  T('water_polo_m_zone', 'water_polo', 'defense', 'intermediate',
    ['دفاع المنطقة (إم زون / دروب)', 'M-zone / drop defence'],
    ['المدافعين القريبين من السنتر ينزلوا عليه عشان يقفلوا الكورة ليه، ويسيبوا التسديد من بعيد بمراقبة جزئية.', 'Defenders near the centre drop onto him to deny the entry pass, conceding contested long shots.'],
    ['ضد سنتر قوي جدًا أو فريق تسديده البعيد ضعيف.', 'Against a dominant centre or poor outside shooting.'],
    [
      ['مدافعي الجناح والنقطة ينزلوا لورا في شكل حرف M.', 'Wing and point defenders drop back into an M shape.'],
      ['اللاعب اللي عنده الكورة يتضغط بإيد مرفوعة بس.', 'Only the ball-holder is pressured, with a hand up.'],
      ['الحارس ينادي ويوجه البلوك.', 'The goalkeeper calls and directs blocks.'],
      ['اطلع بسرعة على المسدد بإيد مرفوعة لما يستلم.', 'Close out quickly with a hand up when a shooter receives.']
    ]),

  T('water_polo_counter', 'water_polo', 'counter', 'intermediate',
    ['الهجوم المضاد السريع', 'Fast-break counter-attack'],
    ['بعد قطع الكورة أو التصدي، السباحة بسرعة للأمام عشان تعمل زيادة عددية قبل ما الخصم يرجع.', 'After a steal or save, sprint-swim forward to create a numbers advantage before the opponent recovers.'],
    ['أول ما الاستحواذ يتغير، خصوصًا لو في مهاجم للخصم لسه بيجادل أو واقف.', 'Immediately on turnover, especially if an opponent is slow to react.'],
    [
      ['اللاعب الأقرب لنص الملعب ينطلق أول ما الكورة تتقطع.', 'The player nearest the halfway sprints the moment possession changes.'],
      ['الحارس أو القاطع يمرر تمريرة طويلة قدام السباح.', 'The keeper or stealer plays a long pass ahead of the swimmer.'],
      ['اسبح بالراس مرفوعة (سباحة بولو) عشان تشوف الكورة.', 'Swim head-up (polo crawl) to track the ball.'],
      ['هاجم المرمى وزميل يسبح للجهة التانية للتمريرة.', 'Attack the goal while a teammate swims wide for the pass.']
    ],
    [['أول ٣ ضربات ذراع بتحسم السباق.', 'The first three strokes decide the race.']]),

  T('water_polo_man_down', 'water_polo', 'defense', 'advanced',
    ['الدفاع بنقص عددي (٥ ضد ٦)', 'Man-down defence (5 v 6)'],
    ['خمسة مدافعين والحارس بيغطوا القوائم ويرفعوا الإيد في خطوط التسديد، وهدفهم يعدّوا وقت الطرد من غير هدف.', 'Five defenders and the keeper cover the posts and raise hands in shooting lanes, aiming to survive the exclusion period.'],
    ['أثناء طرد لاعب من فريقك.', 'While one of your players is excluded.'],
    [
      ['اتنين يغطوا لاعبي القائمين، والتلاتة التانيين في خط الـ٥ متر.', 'Two cover the post players; three defend the 5 m line.'],
      ['كل مدافع يغطي مساحة ناحية الكورة وإيده مرفوعة لقفل جزء من المرمى.', 'Each defender shades toward the ball with a hand up blocking part of the goal.'],
      ['الحارس يغطي الجزء المفتوح ويوجه البلوك.', 'The keeper covers the open side and directs blocks.'],
      ['اللاعب المطرود يرجع بسرعة من منطقة الإعادة ويطلب الكورة للمرتدة لو اتقطعت.', 'The excluded player re-enters quickly from the re-entry area and looks for the counter if possession is won.']
    ],
    [['البلوك بإيد واحدة — الإيدين = ضربة جزاء لو جوه الـ٥ متر.', 'Block with one hand — two hands inside 5 m risks a penalty.']])
);

/* ───────────── بيسبول ───────────── */
ALL.push(
  T('baseball_sac_bunt', 'baseball', 'attack', 'beginner',
    ['البانت التضحية', 'Sacrifice bunt'],
    ['الضارب يوقف الكورة بالمضرب على الأرض عشان يتقدم العداء قاعدة، حتى لو الضارب نفسه طلع آوت.', 'The batter deadens the ball on the ground to advance a runner one base, accepting that he will probably be out.'],
    ['عداء على الأولى (أو الأولى والتانية) وأقل من ٢ آوت، في مباراة متقاربة محتاج فيها نقطة واحدة.', 'Runner on first (or first and second), fewer than two outs, in a close game where one run matters.'],
    [
      ['الضارب يلف جسمه ناحية الرامي بدري والمضرب قدامه في مستوى أعلى منطقة الضرب.', 'Square or pivot toward the pitcher early with the bat level at the top of the zone.'],
      ['اضرب بالكورة على الجزء العلوي من المضرب وارخي الإيدين عشان تموت الكورة.', 'Catch the ball on the barrel with soft hands to deaden it.'],
      ['وجّه الكورة ناحية خط القاعدة الأولى أو التالتة بعيد عن الرامي.', 'Direct it down the first- or third-base line away from the pitcher.'],
      ['العداء ينطلق بعد ما الكورة تلمس الأرض.', 'The runner breaks once the ball is on the ground.']
    ],
    [['نزّل المضرب بالركب، مش بالإيدين بس.', 'Adjust height with the knees, not just the hands.']]),

  T('baseball_hit_and_run', 'baseball', 'attack', 'intermediate',
    ['الهت آند رن', 'Hit-and-run'],
    ['العداء ينطلق مع رمية الرامي، والضارب لازم يضرب الكورة على الأرض؛ المدافع بيتحرك يغطي القاعدة فبيفتح فراغ في الإنفيلد.', 'The runner goes with the pitch and the batter must put the ball in play on the ground; a covering infielder vacates his spot and opens a hole.'],
    ['عداء على الأولى، ضارب بيلمس الكورة كتير، والعدد في صالحه (رامي محتاج يرمي سترايك).', 'Runner on first, a contact hitter, and a count where the pitcher must throw a strike.'],
    [
      ['الإشارة من المدرب للضارب والعداء.', 'The coach signals both batter and runner.'],
      ['العداء ينطلق مع حركة الرامي ويبص للضارب بعد تلات خطوات.', 'The runner goes on the pitcher’s delivery and peeks in after about three strides.'],
      ['الضارب يضرب أي رمية (حتى لو برة شوية) على الأرض، ويفضل ناحية المكان اللي المدافع سابه.', 'The batter swings at any pitch to hit it on the ground, ideally where the fielder left.'],
      ['لو الكورة عدّت للأوتفيلد، العداء غالبًا يوصل للتالتة.', 'If it reaches the outfield the runner can often take third.']
    ],
    [['الضارب بيحمي العداء — لازم يلمس الكورة.', 'The batter protects the runner — he must make contact.']]),

  T('baseball_stolen_base', 'baseball', 'attack', 'intermediate',
    ['سرقة القاعدة', 'Stolen base'],
    ['العداء بيقرأ حركة الرامي وينطلق للقاعدة اللي بعدها قبل ما الكورة توصل للكاتشر.', 'The runner reads the pitcher’s delivery and breaks for the next base before the ball reaches the catcher.'],
    ['ضد رامي بطيء في الرمي من الوضع المنفرد، أو كاتشر ضعيف الذراع، أو في رمية متوقع تكون كورة منحنية.', 'Against a slow-to-plate pitcher, a weak-armed catcher, or on an expected breaking ball.'],
    [
      ['خد مسافة ابتعاد (ليد) آمنة من القاعدة وأنت شايف الرامي.', 'Take a safe lead while watching the pitcher.'],
      ['راقب إشارات الرامي: الرجل الخلفية، الكتف، الراس — أول حركة للرمية = انطلق.', 'Read the pitcher: rear foot, shoulder, head — first move to the plate means go.'],
      ['خطوة تقاطع (كروس أوفر) وجري بأقصى سرعة منخفض.', 'Cross-over step and sprint low.'],
      ['انزلق على القاعدة بعيد عن إيد المدافع.', 'Slide to the side of the bag away from the tag.']
    ],
    [['القرار قبل ما ترجع للقاعدة، مش بعد.', 'Decide before, not after, the pitcher moves.']]),

  T('baseball_squeeze', 'baseball', 'set_piece', 'advanced',
    ['السكويز بلاي', 'Squeeze play'],
    ['عداء على التالتة وأقل من ٢ آوت: الضارب يعمل بانت والعداء يجري على الهوم بلايت عشان يسجل.', 'Runner on third with fewer than two outs: the batter bunts and the runner races home to score.'],
    ['محتاج نقطة واحدة في مباراة متقاربة والضارب بيعرف يعمل بانت.', 'When one run is needed in a tight game and the batter can bunt.'],
    [
      ['سويسايد سكويز: العداء ينطلق مع رمية الرامي والضارب لازم يعمل بانت مهما كانت الرمية.', 'Suicide squeeze: the runner goes on the delivery and the batter must bunt whatever the pitch.'],
      ['سيفتي سكويز: العداء يستنى لحد ما يشوف البانت على الأرض قبل ما يجري.', 'Safety squeeze: the runner waits to see the bunt on the ground before going.'],
      ['الضارب يوجّه البانت بعيد عن الرامي والكاتشر.', 'Bunt away from the pitcher and catcher.'],
      ['العداء ينزلق على الهوم بلايت.', 'The runner slides into home plate.']
    ],
    [['في السويسايد، لو الضارب فوّت الكورة، العداء غالبًا بيطلع آوت.', 'On a suicide squeeze a missed bunt usually hangs the runner out.']]),

  T('baseball_double_play_depth', 'baseball', 'defense', 'intermediate',
    ['تمركز الدبل بلاي (٦-٤-٣ / ٤-٦-٣)', 'Double-play depth (6-4-3 / 4-6-3)'],
    ['لاعبي الوسط (الشورت ستوب والسكند بيس) يقربوا خطوتين من القاعدة التانية عشان يخلصوا آوتين في لعبة واحدة من كورة أرضية.', 'The middle infielders shade toward second base to turn two outs on a ground ball.'],
    ['عداء على الأولى وأقل من ٢ آوت.', 'Runner on first with fewer than two outs.'],
    [
      ['الشورت ستوب والسكند بيس يقربوا من القاعدة ويبعدوا شوية عن الهوم.', 'Shortstop and second baseman cheat toward second.'],
      ['اللي يستلم الكورة الأرضية يمرر بسرعة للي بيغطي التانية.', 'The fielder of the grounder feeds the player covering second.'],
      ['المغطي يلمس القاعدة ويرمي للأولى وهو بيبعد عن العداء المنزلق.', 'The pivot man touches the bag and throws to first while avoiding the slide.'],
      ['لاعب الأولى يمد رجله على القاعدة ويستلم.', 'The first baseman stretches to receive.']
    ],
    [['آوت مضمون أحسن من اتنين مستعجلين.', 'Get the sure out before rushing for two.']]),

  T('baseball_infield_positioning', 'baseball', 'defense', 'advanced',
    ['التمركز الدفاعي حسب الضارب', 'Defensive positioning by hitter tendency'],
    ['تحريك المدافعين ناحية الجهة اللي الضارب بيضرب فيها غالبًا حسب إحصائياته، في حدود القانون.', 'Shift fielders toward the side where the hitter usually hits, within the rules.'],
    ['ضد ضارب له اتجاه واضح (بيسحب الكورة ناحية جهته).', 'Against a hitter with a strong pull tendency.'],
    [
      ['راجع توزيع ضربات الضارب (سبراي تشارت).', 'Review the hitter’s spray chart.'],
      ['حرّك المدافعين والأوتفيلدرز ناحية جهة السحب.', 'Move infielders and outfielders toward the pull side.'],
      ['التزم بقانون الدوري: في MLB من ٢٠٢٣ لازم اتنين إنفيلدرز على كل جنب من القاعدة التانية وعلى التراب وقت الرمية.', 'Follow league rules: in MLB since 2023 two infielders must be on each side of second base and on the dirt at the pitch.'],
      ['الرامي يرمي رميات تشجع الضارب يضرب ناحية التمركز.', 'Pitch to encourage contact into the shift.']
    ]),

  T('baseball_pitch_sequencing', 'baseball', 'game_plan', 'advanced',
    ['تسلسل الرميات', 'Pitch sequencing'],
    ['تغيير السرعة والارتفاع والاتجاه عشان توقّع توقيت الضارب: رمية سريعة عالية، بعدها كورة منحنية أو تغيير سرعة واطية.', 'Change speed, height and location to disrupt timing: an elevated fastball followed by a breaking ball or changeup down.'],
    ['خطة الرامي والكاتشر لكل ضارب.', 'The pitcher-catcher plan for every hitter.'],
    [
      ['ابدأ بسترايك أولى (فرست بيتش سترايك) عشان تبقى متحكم في العدد.', 'Get ahead with a first-pitch strike.'],
      ['وري الضارب رمية سريعة داخلية عشان يبعد عن اللوح.', 'Show a fastball inside to move him off the plate.'],
      ['خلّص برمية بعيدة واطية أو كورة منحنية برة منطقة الضرب لما تكون متقدم في العدد.', 'Finish away and down, or with a breaking ball below the zone when ahead in the count.'],
      ['ماتكررش نفس الرمية في نفس المكان مرتين ورا بعض لضارب قوي.', 'Avoid repeating the same pitch in the same spot to a good hitter.']
    ],
    [['الرمية بتاخد قيمتها من اللي قبلها.', 'Every pitch gets its value from the one before.']]),

  T('baseball_cutoff_relay', 'baseball', 'defense', 'intermediate',
    ['الكات أوف والريلاي', 'Cut-off and relay'],
    ['لما الكورة تروح بعيد في الأوتفيلد، مدافع وسيط بيستلم ويمرر بسرعة عشان يمنع العدائين من التقدم.', 'When the ball goes deep to the outfield, an intermediate fielder receives and relays quickly to stop runners advancing.'],
    ['كورة مضروبة للفراغات أو فوق راس الأوتفيلدرز.', 'Balls hit into the gaps or over outfielders.'],
    [
      ['الشورت ستوب أو السكند بيس يجري للأوتفيلد في خط بين الكورة والقاعدة المطلوبة.', 'The shortstop or second baseman runs out on the line between the ball and the target base.'],
      ['يرفع إيديه ويزعق عشان الأوتفيلدر يشوفه.', 'He raises both arms and shouts to be seen.'],
      ['الأوتفيلدر يرمي على صدر الوسيط.', 'The outfielder throws to his chest.'],
      ['الوسيط يلف ناحية جلوفه ويرمي للقاعدة اللي المدرب أو الكاتشر بينادي عليها.', 'The relay man turns glove-side and throws to the base called by the catcher.']
    ],
    [['الكاتشر هو اللي بيوجه — اسمع صوته.', 'The catcher directs — listen to him.']])
);

/* ───────────── تنس ───────────── */
ALL.push(
  T('tennis_serve_plus_one', 'tennis', 'attack', 'intermediate',
    ['الإرسال + الضربة الأولى', 'Serve plus one'],
    ['الإرسال مش لازم يكسب النقطة لوحده؛ هدفه يجيب رد ضعيف تهاجم عليه بالفورهاند في أول ضربة بعد الإرسال.', 'The serve need not win the point outright; it sets up a weak return to attack with the first forehand.'],
    ['في ألعاب إرسالك، خصوصًا على النقط المهمة.', 'In your service games, especially on important points.'],
    [
      ['حدد قبل الإرسال مكانه ومكان الضربة اللي بعده.', 'Decide the serve target and the plus-one target before you serve.'],
      ['إرسال بدقة وعمق للمكان المختار.', 'Serve with precision to the chosen spot.'],
      ['رجّع لوضع الاستعداد بسرعة وافتح جسمك للفورهاند.', 'Recover quickly and open up to take the forehand.'],
      ['اضرب الكورة الجاية للملعب المفتوح أو ورا الخصم.', 'Hit the return into the open court or behind the opponent.']
    ],
    [['التخطيط للضربتين مع بعض.', 'Plan both shots together.']]),

  T('tennis_wide_serve_deuce', 'tennis', 'set_piece', 'intermediate',
    ['الإرسال الواسع من جهة الديوس', 'Wide slice serve from the deuce court'],
    ['للاعب يمين: إرسال سلايس بيلف لبره من جهة الديوس بيطلع الخصم برة الملعب ويفتح الملعب كله للضربة التانية.', 'For a right-hander, a slice serve curving wide on the deuce side pulls the returner off court and opens the whole court for the next shot.'],
    ['ضد مستقبل بيقف قريب من الخط الجانبي أو عنده باك هاند ضعيف (لو لاعب شمال).', 'Against a returner standing close to the centre or, for a left-handed returner, to his backhand.'],
    [
      ['ارمي الكورة شوية لليمين عن الإرسال العادي.', 'Toss slightly to the right of your normal toss.'],
      ['اضرب على الجنب الخارجي للكورة عشان تلف بعيد.', 'Brush the outside of the ball to curve it away.'],
      ['استهدف تقاطع خط الإرسال مع الخط الجانبي.', 'Aim at the service line and sideline intersection.'],
      ['الضربة الجاية للجهة التانية من الملعب المفتوح.', 'Play the next ball into the open court on the other side.']
    ]),

  T('tennis_t_body_mix', 'tennis', 'set_piece', 'intermediate',
    ['التنويع: إرسال على الخط الأوسط والجسم', 'Mixing T and body serves'],
    ['الإرسال على الخط الأوسط (T) بيقلل زاوية الرد، والإرسال على الجسم بيحشر المستقبل؛ التنويع بيمنع الخصم يتوقع.', 'A serve down the T reduces the return angle and a body serve jams the returner; mixing them prevents anticipation.'],
    ['لما المستقبل بدأ يتوقع الإرسال الواسع.', 'When the returner starts cheating toward the wide serve.'],
    [
      ['استخدم نفس رمية الكورة للأنواع كلها عشان ماتكشفش الإرسال.', 'Use the same toss for every serve to disguise it.'],
      ['إرسال فلات أو كيك على الخط الأوسط.', 'Flat or kick serve down the T.'],
      ['إرسال على الورك أو الكتف اللي في جهة الضربة الأضعف.', 'Body serve at the hip on the weaker side.'],
      ['سجّل في دماغك نسب كل مكان وغيّر النمط كل كام نقطة.', 'Track the pattern and change every few points.']
    ]),

  T('tennis_inside_out_forehand', 'tennis', 'attack', 'intermediate',
    ['الفورهاند المعكوس (إنسايد آوت)', 'Inside-out forehand'],
    ['اللاعب يلف حوالين الباك هاند عشان يضرب فورهاند من الجهة الشمال للباك هاند بتاع الخصم، وبكده يهاجم بضربته الأقوى.', 'The player runs around his backhand to hit a forehand cross into the opponent’s backhand, attacking with his best shot.'],
    ['لما تيجيلك كورة في نص الملعب ناحية الباك وعندك وقت.', 'When a ball arrives in the middle-to-backhand side with time to move.'],
    [
      ['خطوات جانبية سريعة لتحت الكورة تفتح مساحة للفورهاند.', 'Quick side steps around the ball to create forehand space.'],
      ['اضرب قطري لباك هاند الخصم بعمق.', 'Drive deep cross-court into the opponent’s backhand.'],
      ['لو الخصم اتسحب لبره، الضربة الجاية فورهاند مستقيم (إنسايد إن) للملعب المفتوح.', 'If he is pulled wide, follow with an inside-in forehand down the line into the open court.'],
      ['ارجع بسرعة لأن الجهة اليمين من ملعبك بقت مفتوحة.', 'Recover quickly — your forehand side is now exposed.']
    ],
    [['اعمل الحركة بدري، مش في آخر لحظة.', 'Move early, not at the last second.']]),

  T('tennis_crosscourt_change_line', 'tennis', 'game_plan', 'beginner',
    ['الرالي القطري وتغيير الاتجاه', 'Cross-court rally, change down the line'],
    ['الضربة القطرية أأمن (الشبكة أوطى في النص والملعب أطول)؛ خليك قطري لحد ما تيجي كورة قصيرة أو ضعيفة وبعدين غير الاتجاه مستقيم.', 'Cross-court is safer (lower net in the middle, longer court); stay cross until a short or weak ball, then change down the line.'],
    ['في الرالي الأساسي من الخط الخلفي.', 'In baseline rallies.'],
    [
      ['اضرب قطري بعمق ومسافة أمان فوق الشبكة.', 'Hit deep cross-court with net clearance.'],
      ['استنى كورة قصيرة أو كورة جاية في منطقة ضربك المريحة.', 'Wait for a short ball or one in your strike zone.'],
      ['غيّر الاتجاه مستقيم (داون ذا لاين) بثقة.', 'Change direction down the line decisively.'],
      ['اتقدم خطوتين أو اطلع للشبكة بعد التغيير.', 'Step in or follow it to the net.']
    ],
    [['تغيير الاتجاه من كورة صعبة = أخطاء.', 'Changing direction off a difficult ball causes errors.']]),

  T('tennis_approach_volley', 'tennis', 'attack', 'intermediate',
    ['ضربة الاقتراب والطلوع للشبكة', 'Approach shot and net play'],
    ['من كورة قصيرة، ضربة عميقة مستقيمة والطلوع للشبكة لقفل الزوايا وإنهاء النقطة بالفولي.', 'From a short ball, hit a deep approach down the line and come to the net to close angles and finish with a volley.'],
    ['لما الخصم يرد قصير أو وهو في وضع دفاعي.', 'When the opponent hits short or is defending.'],
    [
      ['ضربة اقتراب مستقيمة وعميقة (سلايس أو توب سبين).', 'Approach deep down the line (slice or topspin).'],
      ['اتقدم في خط الكورة وقف (سبليت ستيب) لما الخصم يضرب.', 'Follow the line of the ball and split-step as the opponent strikes.'],
      ['فولي عميق أو بزاوية حسب مكانك من الشبكة.', 'Volley deep or angled depending on your distance from the net.'],
      ['خلّي عينك على اللوب وارجع خطوة لو الخصم لوبّ.', 'Watch for the lob and retreat if needed.']
    ],
    [['الاقتراب المستقيم بيقلل زاوية الباسينج شوت.', 'Approaching down the line cuts the passing angle.']]),

  T('tennis_return_position', 'tennis', 'defense', 'intermediate',
    ['تمركز استقبال الإرسال', 'Return-of-serve positioning'],
    ['تعديل مكان الوقوف حسب الإرسال: لورا للإرسال القوي عشان تاخد وقت، ولقدام للإرسال التاني عشان تهاجم.', 'Adjust position to the serve: deeper against big first serves for time, closer on second serves to attack.'],
    ['في كل ألعاب استقبالك.', 'In every return game.'],
    [
      ['إرسال أول قوي: قف ورا الخط الخلفي بمتر أو أكتر ورد بضربة قصيرة (بلوك) للعمق.', 'Big first serve: stand a metre or more behind the baseline and block the return deep.'],
      ['إرسال تاني: قف على الخط أو جوه وهاجم الباك هاند أو الوسط.', 'Second serve: stand on or inside the baseline and attack.'],
      ['اعمل سبليت ستيب وقت ما الخصم يضرب الكورة.', 'Split-step as the server strikes.'],
      ['الرد الآمن: عميق في النص عشان تقلل الزوايا.', 'The safe return is deep through the middle to limit angles.']
    ]),

  T('tennis_doubles_i_formation', 'tennis', 'system', 'advanced',
    ['الدوبلز: تشكيل I والبوتش', 'Doubles: I-formation and poaching'],
    ['لاعب الشبكة بيقف في النص قدام المرسل وبيتحرك يمين أو شمال حسب الإشارة، عشان يربك المستقبل ويقطع الرد القطري.', 'The net player crouches on the centre line and moves left or right on a signal, confusing the returner and cutting off the cross-court return.'],
    ['لما المستقبل مرتاح في الرد القطري.', 'When the returner is comfortable hitting cross-court.'],
    [
      ['لاعب الشبكة يعمل إشارة ورا ضهره: الاتجاه اللي هيتحرك له.', 'The net player signals behind his back which way he will move.'],
      ['المرسل يرسل على الخط الأوسط غالبًا ويتحرك للجهة العكسية.', 'The server usually serves down the T and moves to the opposite side.'],
      ['لاعب الشبكة يتحرك بعد ما المستقبل يلتزم بالضربة (بوتش) ويضرب الفولي ناحية القدم أو النص.', 'The net player moves once the returner commits (poach) and volleys at the feet or through the middle.'],
      ['الاتنين يغطوا الملعب بعد الحركة.', 'Both players cover their new halves.']
    ],
    [['الحركة بدري = الخصم يرد مستقيم.', 'Moving too early invites the down-the-line return.']])
);

/* ───────────── بادل ───────────── */
ALL.push(
  T('padel_serve_volley', 'padel', 'set_piece', 'beginner',
    ['الإرسال والطلوع للشبكة', 'Serve and move to the net'],
    ['إرسال من تحت بعمق وتنويع، وبعده المرسل يطلع على طول للشبكة جنب زميله عشان الفريق ياخد المكان الهجومي من أول النقطة.', 'An underhand serve with depth and variety, after which the server moves straight up to join the partner at the net so the pair owns the attacking position from the start.'],
    ['في كل نقطة إرسال، وخصوصًا في الدوبلز المتوازنة.', 'On every service point, especially in balanced doubles.'],
    [
      ['نطّط الكورة ورا خط الإرسال واضربها عند مستوى الوسط أو أقل في المربع القطري.', 'Bounce the ball behind the service line and strike it at or below waist height into the diagonal box.'],
      ['نوّع: على الزجاج الجانبي، أو على الوسط (ناحية T)، أو على جسم المستقبل.', 'Vary the target: into the side glass, down the middle (the T), or at the receiver’s body.'],
      ['بعد الضربة اتقدم بسرعة لحد حوالي ٢-٣ متر من الشبكة.', 'After contact move forward quickly to roughly 2-3 m from the net.'],
      ['اعمل سبليت ستيب لما المستقبل يضرب وجهز فولي عميق.', 'Split-step as the receiver hits and prepare a deep volley.'],
      ['الفولي الأول للعمق أو للوسط بين الخصمين، مش للزوايا.', 'Play the first volley deep or through the middle, not to the angles.']
    ],
    [['الإرسال في البادل مش للكسب المباشر، هدفه تاخد الشبكة.', 'The padel serve is not for aces; its goal is to win the net.'], ['الكورة لو خبطت الشبك المعدني بعد النطة الأولى في الإرسال = خطأ.', 'A serve that hits the wire fence after its first bounce is a fault.']]),

  T('padel_lob_take_net', 'padel', 'attack', 'beginner',
    ['اللوب لاستعادة الشبكة', 'Lob to regain the net'],
    ['لما الخصوم في الشبكة وانت تحت، لوب عالي وعميق فوق راسهم بيرجّعهم لورا وبيديك فرصة تطلع انت للشبكة.', 'When the opponents hold the net and you are at the back, a high deep lob over their heads pushes them back and lets you take the net.'],
    ['وأنت في وضع دفاعي ورا، والخصمين قريبين من الشبكة.', 'When defending at the back with both opponents close to the net.'],
    [
      ['اضرب لوب عالي ومحكوم، يفضل على الباك هاند بتاع لاعب الشمال أو في النص.', 'Hit a high, controlled lob, ideally over the left player’s backhand side or the middle.'],
      ['اتأكد إنه عميق كفاية يعدي الخصم ويقع قريب من الزجاج الخلفي.', 'Make sure it is deep enough to pass the opponent and land near the back glass.'],
      ['لو الخصمين لفوا يجروا ورا الكورة، اطلعوا انتو الاتنين للشبكة مع بعض.', 'If both opponents turn to chase, move up to the net together.'],
      ['لو الخصم ضرب بانديخا أو سماش، ارجع وجهز الدفاع من الزجاج.', 'If the opponent plays a bandeja or smash, stay back and defend off the glass.']
    ],
    [['اللوب القصير = سماش في وشك.', 'A short lob is a smash waiting to happen.'], ['اطلعوا مع بعض وارجعوا مع بعض.', 'Move up together, move back together.']]),

  T('padel_bandeja', 'padel', 'defense', 'intermediate',
    ['البانديخا للحفاظ على الشبكة', 'Bandeja to keep the net'],
    ['ضربة فوق الراس محكومة بقطع (سلايس) بترد على اللوب من غير ما تسيب الشبكة، وبترجع الكورة عميق وواطية بعد الزجاج.', 'A controlled sliced overhead that answers a lob without giving up the net, sending the ball deep and low off the back glass.'],
    ['لما الخصم يلوب وانت مش في وضع تقدر تسمش فيه بقوة.', 'When the opponent lobs and you are not in position for a powerful smash.'],
    [
      ['ارجع بخطوات جانبية (كروس أوفر) وجسمك جانبي ناحية الكورة.', 'Retreat with side or crossover steps, body turned sideways to the ball.'],
      ['اضرب الكورة قدام الجسم على مستوى الراس تقريبًا، مش فوق قوي.', 'Contact the ball in front of the body at about head height, not fully extended.'],
      ['وجّه الضربة للزاوية أو للوسط بسرعة متوسطة وقطع، عشان تنط واطية من الزجاج الخلفي.', 'Direct it to the corner or middle with medium pace and slice so it stays low off the back glass.'],
      ['اتقدم تاني على طول للشبكة جنب زميلك.', 'Step straight back in to the net beside your partner.']
    ],
    [['البانديخا هدفها السيطرة مش إنهاء النقطة.', 'The bandeja is for control, not for finishing the point.'], ['لو الكورة خرجت عالية من الزجاج يبقى ادّيت الخصم فرصة.', 'If it bounces high off the glass you have given the opponent a chance.']]),

  T('padel_chiquita', 'padel', 'attack', 'intermediate',
    ['الشيكيتا: كورة واطية على الرجلين', 'Chiquita: soft ball to the feet'],
    ['ضربة ناعمة واطية من ورا بتقع عند رجلين الخصوم اللي في الشبكة، بتجبرهم يرفعوا الكورة لفوق وبتسمح لك تطلع.', 'A soft, low shot from the back that dips at the feet of net players, forcing them to lift the ball and letting you move forward.'],
    ['ضد خصوم في الشبكة بيستنوا لوب أو كورة سريعة.', 'Against net players who expect a lob or a hard drive.'],
    [
      ['اضرب الكورة بعد الزجاج أو من الأرض بسرعة قليلة وارتفاع يادوب فوق الشبكة.', 'Hit off the glass or the floor with low pace, just clearing the net.'],
      ['وجّهها للوسط أو للرجلين بين الخصمين.', 'Aim for the middle or the feet between the opponents.'],
      ['لو الخصم اضطر يفولي لفوق، اتقدموا انتو الاتنين بسرعة.', 'If the opponent has to volley upward, both of you move in quickly.'],
      ['هاجم الكورة العالية اللي جاية بفولي قوي أو سماش.', 'Attack the high ball that comes back with a firm volley or smash.']
    ],
    [['نوّع بين الشيكيتا واللوب عشان الخصم ميعرفش يتقدم ولا يرجع.', 'Mix chiquita and lob so the opponent cannot commit forward or back.']]),

  T('padel_back_glass_defense', 'padel', 'defense', 'beginner',
    ['الدفاع من الزجاج الخلفي', 'Defending off the back glass'],
    ['بدل ما تضرب الكورة السريعة قبل الزجاج، سيبها تخبط الزجاج الخلفي وتهدى، واضربها بعد ما ترجع بتوقيت أسهل.', 'Instead of rushing a fast ball before the glass, let it rebound off the back wall and slow down, then play it with easier timing.'],
    ['قدام سماش أو فولي قوي عميق.', 'Against a smash or a hard deep volley.'],
    [
      ['اقرا اتجاه الكورة وخلّي بينك وبين الزجاج مسافة كفاية.', 'Read the ball’s line and keep enough space between you and the glass.'],
      ['لف جسمك مع الكورة وهي راجعة من الزجاج.', 'Turn with the ball as it comes off the glass.'],
      ['اضربها وهي نازلة قدام جسمك.', 'Strike it as it drops in front of your body.'],
      ['الرد الآمن: لوب عميق أو شيكيتا للوسط.', 'Safe replies: a deep lob or a chiquita through the middle.']
    ],
    [['متجريش على الزجاج — سيب مسافة للكورة.', 'Do not crowd the glass — leave room for the rebound.']]),

  T('padel_positions_drive_reves', 'padel', 'system', 'intermediate',
    ['توزيع المراكز: يمين (درايف) وشمال (ريفيس)', 'Court roles: drive (right) and revés (left)'],
    ['تقسيم الأدوار في الزوجي: لاعب اليمين ثابت ومنظم ويبني النقط، ولاعب الشمال (لو يمين اليد) هو اللي بيسمش ويخلّص لأن الفوربهاند بتاعه في النص.', 'Doubles role split: the right-side player is steady and builds points; the left-side player (if right-handed) finishes with overheads because the forehand covers the middle.'],
    ['عند تكوين ثنائي جديد أو تنظيم خطة الفريق.', 'When forming a pair or organising team roles.'],
    [
      ['حطوا أقوى لاعب في السماش والضربات العالية على الشمال.', 'Put the stronger overhead player on the left side.'],
      ['اتفقوا إن الكورات في النص يغطيها اللي الفوربهاند بتاعه هناك.', 'Agree that middle balls go to the player whose forehand covers the middle.'],
      ['اتحركوا مع بعض كأنكم مربوطين بحبل: الاتنين في الشبكة أو الاتنين ورا.', 'Move as if tied by a rope: both at the net or both at the back.'],
      ['لو اللوب عدّى واحد، التاني يغطي ويتبادلوا الجهتين لو اتفقوا.', 'If a lob passes one player, the partner covers and you switch sides if agreed.'],
      ['اتكلموا: "ليا" / "ليك" في كل كورة نص.', 'Communicate on every middle ball: "mine" or "yours".']
    ]),

  T('padel_match_plan', 'padel', 'game_plan', 'advanced',
    ['خطة ماتش بادل', 'Padel match plan'],
    ['خطة مبنية على السيطرة على الشبكة، والصبر في الدفاع، واستهداف أضعف لاعب أو أضعف ضربة عند الخصم.', 'A plan built on owning the net, patience in defence, and targeting the weaker opponent or weaker shot.'],
    ['قبل الماتش وبين الأشواط.', 'Before the match and between games.'],
    [
      ['في أول ٣-٤ أشواط حددوا: مين أضعف في البانديخا ومين أضعف من الزجاج.', 'In the first 3-4 games identify who is weaker at the bandeja and who is weaker off the glass.'],
      ['وجّهوا اللوبات للاعب الأضعف في الضربات فوق الراس.', 'Send lobs to the player weaker overhead.'],
      ['في الشبكة: فولي عميق للوسط والصبر لحد ما تيجي كورة عالية تتسمش.', 'At the net: deep volleys to the middle and patience until a high ball can be smashed.'],
      ['في الدفاع: متخاطروش، لوب وشيكيتا لحد ما تستعيدوا الشبكة.', 'In defence: take no risks, use lobs and chiquitas until you regain the net.'],
      ['في النقط المهمة: إرسال على الجسم وتقليل الأخطاء المباشرة.', 'On big points: serve at the body and cut unforced errors.']
    ],
    [['البادل لعبة أخطاء: الفريق اللي يغلط أقل بيكسب غالبًا.', 'Padel is a game of errors: the pair that misses less usually wins.']])
);

/* ───────────── اسكواش ───────────── */
ALL.push(
  T('squash_dominate_t', 'squash', 'system', 'beginner',
    ['السيطرة على منطقة T', 'Dominating the T'],
    ['بعد كل ضربة ترجع لمنطقة T (تقاطع خط النص مع خط الملعب القصير) أو ورا منها شوية، لأنها أقرب نقطة لكل أركان الملعب.', 'After every shot return to the T (where the half-court line meets the short line) or slightly behind it, the point closest to every corner.'],
    ['في كل الرالي، وهو أساس أي خطة اسكواش.', 'Throughout every rally; it is the foundation of any squash plan.'],
    [
      ['اضرب كورة تبعد الخصم عن النص (عمق أو زاوية).', 'Hit a shot that pulls the opponent away from the middle (length or angle).'],
      ['ارجع للـT بخطوات سريعة وانت عينك على الخصم.', 'Recover to the T quickly while watching the opponent.'],
      ['قف متوازن وركبك مثنية واعمل سبليت ستيب لما الخصم يضرب.', 'Stand balanced with knees bent and split-step as the opponent strikes.'],
      ['اتحرك للكورة بأقل عدد خطوات وارجع تاني.', 'Move to the ball in the fewest steps and recover again.']
    ],
    [['اللي ماسك الـT بيتعب أقل وبيلعب الخصم.', 'Whoever holds the T works less and moves the opponent.'], ['سيب طريق مباشر للخصم للكورة عشان متاخدش ستروك عليك.', 'Give the opponent direct access to the ball to avoid conceding a stroke.']]),

  T('squash_length_rails', 'squash', 'attack', 'beginner',
    ['لعب العمق على الحيطة (الرايلز)', 'Length game: straight rails'],
    ['ضربات مستقيمة قريبة من الحيطة الجانبية وبتنط تاني قبل ما توصل الحيطة الخلفية، عشان تحبس الخصم في الركن الخلفي.', 'Straight drives that hug the side wall and bounce a second time before or near the back wall, pinning the opponent in the back corner.'],
    ['بداية الرالي، وكل ما تكون مش في وضع يسمح بالهجوم.', 'Early in rallies and whenever you are not in position to attack.'],
    [
      ['اضرب الكورة في الحيطة الأمامية فوق نص ارتفاعها تقريبًا.', 'Strike the front wall around or above its mid-height.'],
      ['خليها ترجع قريبة من الحيطة الجانبية (مستقيمة).', 'Keep it tight to the side wall.'],
      ['النطة التانية تكون في الركن الخلفي.', 'The second bounce should be in the back corner.'],
      ['ارجع للـT وكرر لحد ما تيجي كورة ضعيفة في النص.', 'Recover to the T and repeat until a loose ball comes to the middle.']
    ],
    [['العمق قبل الزاوية: متلعبش دروب من ورا من غير سبب.', 'Length before angles: do not drop from the back without reason.']]),

  T('squash_boast_drop', 'squash', 'combination', 'intermediate',
    ['البوست والدروب', 'Boast and drop combination'],
    ['تغيير إيقاع الرالي: بوست (كورة على الحيطة الجانبية الأول) أو دروب ناعم في الأمام بعد سلسلة كورات عميقة.', 'Change the rally’s rhythm: a boast (side wall first) or a soft drop to the front after a sequence of deep drives.'],
    ['لما الخصم يكون ورا ومتأخر، أو بعد ما يرجع كورة قصيرة في نص الملعب.', 'When the opponent is deep and late, or after a short ball in mid-court.'],
    [
      ['ابني بكورتين أو تلاتة عميقين لحد ما الخصم يتحبس ورا.', 'Build with two or three deep drives until the opponent is pinned back.'],
      ['من كورة في نص الملعب العب دروب ناعم قريب من الحيطة الجانبية.', 'From a mid-court ball play a soft drop close to the side wall.'],
      ['أو العب بوست من الخلف يقع في الركن الأمامي العكسي.', 'Or play a boast from the back into the opposite front corner.'],
      ['اتقدم للـT بسرعة وجهز للكورة المستقيمة اللي جاية.', 'Move up to the T and prepare for the straight reply.']
    ],
    [['البوست من غير تحضير بيفتح الملعب للخصم.', 'An unprepared boast opens the court for the opponent.'], ['الدروب الجيد بيموت في الركن مش بيرجع لنص الملعب.', 'A good drop dies in the corner rather than sitting up mid-court.']]),

  T('squash_volley_pressure', 'squash', 'attack', 'intermediate',
    ['الضغط بالفولي', 'Volley pressure'],
    ['قطع الكورة في الهوا (فولي) من الـT بدل ما تسيبها تروح ورا، عشان تسرق وقت الخصم وتمنعه يرجع للنص.', 'Cut the ball off in the air from the T rather than letting it go deep, stealing time and stopping the opponent from recovering.'],
    ['قدام كورات عرضية أو لوبات مش عميقة كفاية.', 'Against cross-courts or lobs that are not wide or deep enough.'],
    [
      ['قف على الـT والمضرب مرفوع.', 'Hold the T with the racket up.'],
      ['اقرا الكورة العرضية بدري واتحرك بخطوة جانبية.', 'Read the cross-court early and step across.'],
      ['فولي مستقيم عميق، أو فولي دروب لو الخصم ورا.', 'Volley straight and deep, or volley-drop if the opponent is behind you.'],
      ['ارجع للـT على طول.', 'Recover to the T immediately.']
    ]),

  T('squash_serve_lob', 'squash', 'set_piece', 'beginner',
    ['الإرسال اللوب العالي', 'High lob serve'],
    ['إرسال عالي وبطيء يخبط الحيطة الجانبية في الربع الخلفي بتاع الخصم، عشان يجبره يرد من ورا وانت في الـT.', 'A high, slow serve that hits the side wall in the opponent’s back quarter, forcing a reply from deep while you take the T.'],
    ['أغلب الإرسالات، وخصوصًا ضد خصم قوي في الفولي التحت.', 'Most serves, especially against an opponent strong at low volleys.'],
    [
      ['رجل واحدة على الأقل جوه مربع الإرسال.', 'Keep at least one foot inside the service box.'],
      ['اضرب الكورة عالي في الحيطة الأمامية فوق خط الإرسال.', 'Hit high on the front wall above the service line.'],
      ['خليها تخبط الحيطة الجانبية عالي في الربع الخلفي وتنزل قريبة.', 'Have it strike the side wall high in the back quarter and drop tight.'],
      ['اطلع على طول للـT واستنى الرد.', 'Move straight to the T and wait for the return.']
    ],
    [['الإرسال المتوسط الارتفاع سهل يتفولي — يا عالي يا قوي.', 'A mid-height serve is easy to volley — go high or go hard.']]),

  T('squash_match_plan', 'squash', 'game_plan', 'advanced',
    ['خطة ماتش اسكواش', 'Squash match plan'],
    ['خطة على حسب نوع الخصم: ضد اللاعب السريع (الريتريفر) العب عمق وصبر، وضد اللاعب الهجومي اقفل الملعب وطوّل الرالي.', 'A plan by opponent type: against a fast retriever play length and patience; against an attacker keep the ball tight and lengthen rallies.'],
    ['قبل الماتش وبين الأشواط (التسجيل PAR لحد ١١).', 'Before the match and between games (PAR scoring to 11).'],
    [
      ['في أول شوط ركز على العمق واعرف أضعف ركن عند الخصم.', 'In the first game focus on length and find the opponent’s weakest corner.'],
      ['ضد الخصم السريع: متلعبش دروب بدري، خليه يجري من ورا لقدام بعد ما يتعب.', 'Against a fast player: avoid early drops; make him run front-to-back once tired.'],
      ['ضد الخصم الهجومي: كورات مستقيمة قريبة من الحيطة متدهوش زاوية.', 'Against an attacker: tight straight balls that deny angles.'],
      ['بين الأشواط: غيّر حاجة واحدة بس لو الخطة مش ماشية.', 'Between games: change only one thing if the plan is not working.'],
      ['في آخر الماتش: قلل الأخطاء والعب للأركان الخلفية.', 'Late in the match: cut errors and play to the back corners.']
    ])
);

/* ───────────── ريشة طائرة ───────────── */
ALL.push(
  T('badminton_singles_serve_high', 'badminton', 'set_piece', 'beginner',
    ['إرسال الفردي العالي العميق', 'Singles high deep serve'],
    ['إرسال فورهاند عالي جدًا بينزل عمودي قريب من الخط الخلفي، فبيصعّب على الخصم الضربة الهجومية وبيرجّعه لورا الملعب.', 'A very high forehand serve that drops vertically near the back line, making it hard to attack and pushing the opponent to the rear court.'],
    ['في الفردي، خصوصًا ضد لاعب ضعيف في السماش أو تحت ضغط.', 'In singles, especially against a weak smasher or under pressure.'],
    [
      ['قف قريب من خط النص على بعد حوالي متر من خط الإرسال القصير.', 'Stand near the centre line about a metre behind the short service line.'],
      ['اضرب الريشة تحت ١.١٥ متر من الأرض (قاعدة الارتفاع الثابت) بحركة كاملة لفوق.', 'Strike below 1.15 m from the floor (fixed-height rule) with a full upward swing.'],
      ['وجّهها عالي وعميق للخط الخلفي، في النص أو الزاوية.', 'Send it high and deep to the back line, centre or corner.'],
      ['ارجع على طول لمكان الاستعداد في نص الملعب.', 'Recover immediately to the central base position.']
    ],
    [['الإرسال القصير في الفردي سلاح مفاجأة مش أساسي.', 'In singles the low short serve is a surprise weapon, not the default.']]),

  T('badminton_doubles_short_serve', 'badminton', 'set_piece', 'intermediate',
    ['إرسال الزوجي القصير والضربة التالتة', 'Doubles low serve and third shot'],
    ['إرسال باك هاند قصير وواطي يعدي الشبكة بالكاد وينزل عند خط الإرسال القصير، والمرسل يكمل بضربة تالتة تمنع الخصم من الهجوم.', 'A low backhand serve that skims the net onto the short service line, followed by a third shot from the server that keeps the opponents from attacking.'],
    ['أساس الإرسال في الزوجي.', 'The standard serve in doubles.'],
    [
      ['قف قريب من خط الإرسال القصير والزميل وراك في النص.', 'Stand close to the short service line with your partner behind you in the middle.'],
      ['اضرب ريشة واطية تعدي شريط الشبكة بأقل ارتفاع.', 'Play a low serve that just clears the tape.'],
      ['ارفع المضرب على طول قدام الشبكة جاهز للرد.', 'Lift the racket in front of the net straight away.'],
      ['الرد الواطي: اقطعه بنت (Net kill) أو دفعة للوسط.', 'Against a low return: kill at the net or push to the middle.'],
      ['لو الخصم رفع: زميلك ورا يهاجم بسماش وانت تقفل الشبكة.', 'If the receiver lifts, your partner smashes from the back while you close the net.']
    ],
    [['نوّع بإرسال فليك عالي سريع لو المستقبل بيهجم على الإرسال القصير.', 'Mix in a flick serve if the receiver rushes the low serve.']]),

  T('badminton_doubles_attack_defense', 'badminton', 'system', 'intermediate',
    ['الزوجي: تشكيل الهجوم والدفاع', 'Doubles: attack and defence formations'],
    ['في الهجوم اللاعبين واحد ورا الاتنين (أمامي وخلفي)، وفي الدفاع جنب بعض (جانبي) عشان يغطوا عرض الملعب ضد السماش.', 'In attack the pair stands front-and-back; in defence they stand side-by-side to cover the width against smashes.'],
    ['طول ماتش الزوجي — التحول بين الشكلين حسب مين رفع الريشة.', 'Throughout doubles — switching formations depending on who lifted the shuttle.'],
    [
      ['لو فريقك ضرب الريشة لتحت (هجوم): واحد ورا يسمش، والتاني قدام في النص يقفل الشبكة.', 'When your side hits down (attack): one smashes from the back, the other covers the net in the middle.'],
      ['لو فريقك رفع الريشة: اتحولوا فورًا لجنب بعض كل واحد في نص ملعبه.', 'When your side lifts: switch at once to side-by-side, each in the middle of his half.'],
      ['في الدفاع: المضرب قدام الجسم وارجع الريشة واطية للوسط أو مستقيم.', 'In defence: racket in front of the body; return low to the middle or straight.'],
      ['لما الخصم يرد واطي: اللاعب القريب يتقدم والتاني يرجع، فترجعوا للهجوم.', 'When the opponent returns low, the nearer player moves forward and the partner drops back to regain attack.']
    ],
    [['الريشة في النص بين الاتنين: الفورهاند ياخدها أو حسب الاتفاق.', 'Middle shuttles: the forehand side takes it, or as agreed.']]),

  T('badminton_singles_four_corners', 'badminton', 'attack', 'intermediate',
    ['الفردي: لعب الأربع زوايا', 'Singles: four-corner game'],
    ['تحريك الخصم بين الزوايا الأربعة بالكلير العميق والدروب، لحد ما يتأخر وتيجي فرصة سماش أو ضربة قاتلة.', 'Move the opponent around the four corners with deep clears and drops until he is late and a smash or kill opens up.'],
    ['في الفردي ضد خصم بطيء في الرجوع لنص الملعب.', 'In singles against an opponent slow to recover to base.'],
    [
      ['ابدأ بكلير عميق للباك هاند الخلفي.', 'Start with a deep clear to the rear backhand corner.'],
      ['بعدها دروب أو سلايس للركن الأمامي العكسي.', 'Follow with a drop or slice to the opposite front corner.'],
      ['لو رفع قصير: سماش للجسم أو للخط.', 'If he lifts short: smash at the body or down the line.'],
      ['ارجع لنص الملعب بعد كل ضربة.', 'Recover to base after every shot.']
    ],
    [['نفس شكل الضربة للكلير والدروب = الخصم ميعرفش يقرا.', 'Same preparation for clear and drop disguises the shot.']]),

  T('badminton_smash_follow', 'badminton', 'combination', 'advanced',
    ['السماش ومتابعته في الشبكة', 'Smash and follow-in'],
    ['بعد السماش القوي اللاعب بيتقدم على طول للشبكة عشان يقتل الرد الضعيف بدل ما يستنى ورا.', 'After a steep smash the player moves straight in to kill the weak block instead of waiting at the back.'],
    ['في الفردي والزوجي لما الخصم بيرد السماش ببلوك قصير.', 'In singles and doubles when the opponent blocks smashes short.'],
    [
      ['سماش حاد لجسم الخصم أو لجنبه (الهيب أو الكتف).', 'Smash steeply at the body or hip/shoulder side.'],
      ['اتقدم بخطوتين سريعتين والمضرب مرفوع.', 'Take two quick steps forward with the racket up.'],
      ['الرد القصير: كيل (Kill) لتحت أو نت شوت محكوم.', 'Short reply: kill downward or play a tight net shot.'],
      ['الرد العالي: سماش تاني أو دروب بزاوية.', 'High reply: smash again or play an angled drop.']
    ]),

  T('badminton_match_plan', 'badminton', 'game_plan', 'advanced',
    ['خطة ماتش ريشة طائرة', 'Badminton match plan'],
    ['خطة مبنية على السيطرة على أول ٣ ضربات، ومعرفة الجهة الضعيفة للخصم، وإدارة الطاقة في جيمات لحد ٢١ نقطة.', 'A plan built on controlling the first three shots, finding the weak side, and managing energy over games to 21.'],
    ['قبل الماتش وفي الاستراحة (عند ١١ نقطة وبين الجيمات).', 'Before the match and at intervals (at 11 points and between games).'],
    [
      ['اختبر الباك هاند الخلفي عند الخصم بدري — غالبًا أضعف جهة.', 'Test the rear backhand early — usually the weakest area.'],
      ['ركّز على الإرسال والرد: متدّيش الخصم كورة سهلة يهاجم بيها.', 'Focus on serve and return: give no easy ball to attack.'],
      ['لو الخصم أقوى بدنيًا: رالي قصير وهجوم بدري.', 'If the opponent is fitter: shorter rallies and early attack.'],
      ['لو انت أقوى بدنيًا: كلير عميق وطوّل الرالي.', 'If you are fitter: deep clears and longer rallies.'],
      ['في الاستراحة: راجع حاجة واحدة شغالة وحاجة واحدة محتاجة تتغير.', 'At the interval: keep one thing that works, change one thing that does not.']
    ])
);

/* ───────────── تنس طاولة ───────────── */
ALL.push(
  T('table_tennis_short_backspin_third_ball', 'table_tennis', 'combination', 'intermediate',
    ['إرسال قصير قطع وهجوم الكورة التالتة', 'Short backspin serve and third-ball attack'],
    ['إرسال قصير بقطع (باك سبين) بينط مرتين على ترابيزة الخصم لو اتساب، فبيمنعه من الهجوم ويجبره على دفعة (بوش) طويلة تهاجمها انت بلوب.', 'A short backspin serve that would bounce twice on the opponent’s side, denying an attack and inviting a long push you can loop.'],
    ['أشهر نمط إرسال في كل المستويات.', 'The most common serve pattern at every level.'],
    [
      ['ارمي الكورة لفوق ١٦ سم على الأقل من كف مفتوح، والكورة ظاهرة للخصم.', 'Toss the ball at least 16 cm up from an open palm, kept visible to the receiver.'],
      ['اضرب تحت الكورة بقطع، أول نطة تكون قريبة من الشبكة في ناحيتك.', 'Brush under the ball for backspin with the first bounce near the net on your side.'],
      ['خلي النطة التانية قصيرة قريبة من الشبكة عند الخصم.', 'Keep the second bounce short near the net on the receiver’s side.'],
      ['استنى الدفعة الطويلة واعمل لوب فورهاند (توب سبين) للزاوية أو للكوع.', 'Wait for the long push and play a forehand loop to a corner or the elbow.'],
      ['ارجع للوضع المحايد بعد الضربة.', 'Return to a neutral ready position.']
    ],
    [['الإرسال المخفي (بالجسم أو الدراع) ممنوع قانونيًا.', 'Hiding the serve with the body or arm is illegal.'], ['نفس حركة الإرسال مع تغيير الدوران = الخصم يغلط.', 'Same motion with varied spin produces receive errors.']]),

  T('table_tennis_long_fast_serve', 'table_tennis', 'set_piece', 'intermediate',
    ['الإرسال الطويل السريع', 'Long fast serve'],
    ['إرسال سريع طويل (توب سبين أو بدون دوران) ينزل قريب من الخط الخلفي، بيفاجئ الخصم اللي واقف قريب ومستني قصير.', 'A fast, long serve (topspin or no-spin) landing near the end line, surprising a receiver who crowds the table expecting short.'],
    ['كإرسال مفاجئ بعد كذا إرسال قصير، أو ضد لاعب بطيء في الرجوع.', 'As a surprise after several short serves, or against a slow-footed receiver.'],
    [
      ['أول نطة قريبة من خط ترابيزتك الخلفي.', 'Make the first bounce close to your own end line.'],
      ['خلي الكورة تنزل واطية قريب من خط الخصم الخلفي.', 'Keep it low, landing near the opponent’s end line.'],
      ['وجّهها للكوع (نقطة التحول بين الفورهاند والباك هاند) أو للزاوية الواسعة.', 'Aim at the elbow (forehand/backhand crossover) or the wide corner.'],
      ['جهز لرد سريع: بلوك أو كاونتر.', 'Prepare for a fast return: block or counter-hit.']
    ]),

  T('table_tennis_receive_flick', 'table_tennis', 'attack', 'advanced',
    ['الرد الهجومي على الإرسال القصير (فليك)', 'Attacking receive: backhand flick'],
    ['بدل الدفعة الآمنة، الرد على الإرسال القصير بفليك باك هاند (البنانا فليك) فوق الترابيزة، فتاخد المبادرة من أول ضربة.', 'Instead of a safe push, attack the short serve with a backhand flick over the table (banana flick) to seize the initiative.'],
    ['ضد إرسال قصير مش واطي كفاية أو قليل الدوران.', 'Against short serves that are a little high or light on spin.'],
    [
      ['ادخل برجلك اليمين (للأيمن) تحت الترابيزة وقرّب من الكورة.', 'Step in with the right foot (for right-handers) under the table close to the ball.'],
      ['خلي الكوع لقدام والمضرب مقفول شوية ورا الكورة.', 'Elbow forward, racket slightly closed behind the ball.'],
      ['اضرب الكورة عند أعلى نقطة بحركة رسغ لقدام وللجنب.', 'Contact at the peak with a forward-sideways wrist action.'],
      ['ارجع بسرعة لورا لوضع اللعب المتوسط.', 'Step back quickly to mid-distance.']
    ],
    [['الفليك ضد قطع تقيل محتاج تفتح المضرب وترفع أكتر.', 'Against heavy backspin open the racket and lift more.']]),

  T('table_tennis_loop_block', 'table_tennis', 'defense', 'intermediate',
    ['البلوك ضد اللوب', 'Blocking the loop'],
    ['ضربة قصيرة قريبة من الترابيزة بتستخدم سرعة ودوران الخصم نفسه وترجعها بزاوية، عشان تحرك اللاعب الهجومي وتستنى فرصة للكاونتر.', 'A short stroke close to the table that uses the opponent’s pace and spin, redirecting the ball to move the attacker until a counter chance arrives.'],
    ['ضد لاعب بيلوب بقوة وانت قريب من الترابيزة.', 'Against a strong looper when you are close to the table.'],
    [
      ['اقف قريب من الترابيزة والمضرب قدامك.', 'Stay close to the table with the racket in front.'],
      ['اقفل وش المضرب حسب قوة الدوران (توب سبين أقوى = اقفل أكتر).', 'Close the racket angle according to topspin (more spin = more closed).'],
      ['خد الكورة بعد النطة على طول (على الطالع).', 'Take the ball early, on the rise.'],
      ['وجّه البلوك للزاوية العكسية أو للكوع.', 'Redirect the block to the opposite corner or the elbow.'],
      ['هاجم أول كورة ضعيفة بكاونتر لوب.', 'Counter-loop the first weak ball.']
    ]),

  T('table_tennis_doubles_rotation', 'table_tennis', 'system', 'intermediate',
    ['الزوجي: التبادل والحركة', 'Doubles: alternating and movement'],
    ['في الزوجي كل لاعب بيضرب بالتبادل، فلازم يطلع من طريق زميله بعد كل ضربة ويرجع في الوقت المناسب.', 'In doubles partners must hit alternately, so each player clears the way after every stroke and returns in time.'],
    ['في ماتشات الزوجي.', 'In doubles matches.'],
    [
      ['الإرسال قطري من النص اليمين لنص الخصم اليمين.', 'The serve goes diagonally from the right half to the opponent’s right half.'],
      ['بعد ما تضرب اطلع لجنب أو لورا عشان زميلك يدخل.', 'After hitting, step aside or back so your partner can step in.'],
      ['لاعبين يمين وشمال اليد مع بعض أسهل في الحركة (كل واحد في جهة).', 'A right-hander/left-hander pair moves more easily (each on one side).'],
      ['اتفقوا على الإرسال قبل كل نقطة بإشارة تحت الترابيزة.', 'Agree the serve before each point with a hand signal under the table.']
    ],
    [['ضرب الكورة مرتين ورا بعض من نفس اللاعب = نقطة للخصم.', 'Hitting out of turn loses the point.']]),

  T('table_tennis_match_plan', 'table_tennis', 'game_plan', 'advanced',
    ['خطة ماتش تنس طاولة', 'Table tennis match plan'],
    ['خطة مبنية على أنماط الإرسال والرد، ومعرفة الجهة الأضعف، وتغيير الإيقاع في أشواط لحد ١١ نقطة.', 'A plan built on serve/receive patterns, finding the weaker side, and varying rhythm in games to 11.'],
    ['قبل الماتش وفي الوقت المستقطع وبين الأشواط.', 'Before the match, at time-outs and between games.'],
    [
      ['في أول شوط جرّب ٣-٤ أنواع إرسال وشوف أنهي واحد بيعمل مشكلة.', 'In game one try 3-4 serve types and note which cause problems.'],
      ['كل إرسالين (التبديل) خطط لنمط الكورة التالتة.', 'Plan the third ball for each two-serve block.'],
      ['اعرف الجهة الأضعف (غالبًا الكوع أو الفورهاند الواسع) والعب عليها في النقط المهمة.', 'Find the weaker zone (often the elbow or wide forehand) and use it on key points.'],
      ['لو الخصم بيسيطر على الإيقاع، غيّر: كورة بطيئة بدوران تقيل بعد كورات سريعة.', 'If he controls the tempo, change it: slow heavy spin after fast balls.'],
      ['خد الوقت المستقطع (دقيقة واحدة) لما الخصم يكسب نقط ورا بعض.', 'Use the one-minute time-out when the opponent goes on a run.']
    ])
);

/* ───────────── خطط السباقات: عدو ───────────── */
ALL.push(
  T('sprint_100m_phases', 'sprint', 'game_plan', 'beginner',
    ['خطة سباق ١٠٠ متر بالمراحل', '100 m race plan by phases'],
    ['تقسيم الـ١٠٠ متر لمراحل: رد الفعل والانطلاق، التسارع، السرعة القصوى، والحفاظ على السرعة — لكل مرحلة تركيز مختلف.', 'Split the 100 m into phases — reaction and drive, acceleration, maximum velocity and speed maintenance — each with its own focus.'],
    ['في التحضير للسباقات وفي تدريب التكنيك.', 'When preparing for races and in technical training.'],
    [
      ['البلوك والانطلاق: دفع قوي بالرجلين والجسم مايل لقدام، مع أول خطوات قصيرة وقوية.', 'Blocks and drive: push hard with both legs, body inclined forward, first strides short and powerful.'],
      ['التسارع (حوالي ٠-٣٠ متر): الجسم يقوم تدريجيًا والخطوة تطول طبيعي.', 'Acceleration (about 0-30 m): rise progressively as stride length grows naturally.'],
      ['السرعة القصوى (حوالي ٣٠-٦٠/٧٠ متر): جسم مفرود، ركبة عالية، ورجل تنزل تحت مركز الجسم.', 'Max velocity (about 30-60/70 m): tall posture, high knees, foot striking under the centre of mass.'],
      ['الحفاظ على السرعة (آخر ٣٠ متر): ارتخاء في الوش والكتاف وحافظ على التردد، متشدش.', 'Speed maintenance (last 30 m): relax face and shoulders and hold frequency — do not strain.'],
      ['اجري لحد بعد خط النهاية، والجذع (الصدر) هو اللي بيتحسب.', 'Run through the line; the torso is what counts.']
    ],
    [['اللي بيكسب الـ١٠٠ هو اللي بيبطأ أقل في الآخر.', 'The 100 m is won by whoever slows down least at the end.'], ['البداية الخاطئة الأولى = استبعاد.', 'One false start means disqualification.']]),

  T('sprint_400m_distribution', 'sprint', 'game_plan', 'intermediate',
    ['توزيع الجهد في ٤٠٠ متر', '400 m effort distribution'],
    ['الـ٤٠٠ متر مش عدو كامل من الأول للآخر: انطلاقة سريعة، وسرعة "مريحة وقوية" في الباك ستريت، وحفاظ على التكنيك في آخر ١٠٠ متر.', 'The 400 m is not an all-out sprint throughout: a fast start, a strong but relaxed back straight, and holding form over the last 100 m.'],
    ['لعدائي الـ٤٠٠ متر في كل المستويات.', 'For 400 m runners at all levels.'],
    [
      ['أول ٥٠-٦٠ متر: انطلاقة قوية زي العدو القصير عشان توصل لسرعتك.', 'First 50-60 m: a strong sprint start to reach speed.'],
      ['من ٦٠ لـ٢٠٠ متر: خفّف الشد وحافظ على السرعة بأقل مجهود (ريلاكس).', '60-200 m: ease the tension and hold speed with minimal effort.'],
      ['من ٢٠٠ لـ٣٠٠ متر: زوّد التركيز وابدأ الضغط في المنحنى التاني.', '200-300 m: raise concentration and start pressing through the second bend.'],
      ['آخر ١٠٠ متر: ركّز على حركة الدراعين والركبة ومتسيبش التكنيك ينهار.', 'Last 100 m: drive the arms and knees and keep form from collapsing.'],
      ['الهدف: النص الأول أسرع من التاني بفرق معقول (غالبًا حوالي ١.٥-٣ ثانية حسب المستوى).', 'Aim for a first 200 faster than the second by a sensible margin (often about 1.5-3 s depending on level).']
    ],
    [['اللي بيجري أول ٢٠٠ بكل قوته بيقع في آخر ٨٠ متر.', 'Going all-out in the first 200 means dying in the last 80.']]),

  T('sprint_200m_bend', 'sprint', 'game_plan', 'intermediate',
    ['خطة ٢٠٠ متر والجري على المنحنى', '200 m plan and bend running'],
    ['استغلال المنحنى صح في أول ١٠٠ متر، والخروج منه بسرعة عالية للمستقيم من غير ما تفقد الإيقاع.', 'Run the bend efficiently in the first 100 m and come off it at high speed into the straight without losing rhythm.'],
    ['سباقات الـ٢٠٠ متر.', '200 m races.'],
    [
      ['حط البلوك على الحافة الخارجية للحارة ومتوجه لمماس المنحنى.', 'Set the blocks at the outside edge of the lane, aimed along the tangent of the bend.'],
      ['اجري قريب من الخط الداخلي للحارة من غير ما تدوس عليه.', 'Run close to the inside lane line without stepping on it.'],
      ['ميّل الجسم كله للداخل، والدراع اليمين يعدي قدام الجسم أكتر.', 'Lean the whole body inward; the right arm crosses slightly more.'],
      ['اخرج من المنحنى بتسارع خفيف (Slingshot) وكمّل بنفس التردد.', 'Accelerate gently off the bend (slingshot) and hold frequency.'],
      ['آخر ٥٠ متر: ريلاكس وحافظ على التكنيك.', 'Last 50 m: stay relaxed and hold form.']
    ],
    [['الدوس على الخط الداخلي للحارة ممكن يسبب استبعاد.', 'Stepping on the inside lane line can lead to disqualification.']]),

  T('sprint_4x100_exchange', 'sprint', 'set_piece', 'advanced',
    ['تسليم العصا في تتابع ٤×١٠٠', '4x100 relay baton exchange'],
    ['تسليم العصا وهما الاتنين في سرعة عالية جوه منطقة التسليم (٣٠ متر)، باستخدام علامة انطلاق (Check mark) محسوبة.', 'Pass the baton with both runners at high speed inside the 30 m takeover zone, using a measured check mark.'],
    ['تدريب وسباقات التتابع.', 'Relay training and races.'],
    [
      ['المستلم يحدد علامة على الأرض (عدد أقدام محسوب بالتجربة) ويقف عند بداية المنطقة.', 'The receiver places a check mark (a tested number of foot lengths) and starts at the beginning of the zone.'],
      ['لما المسلّم يوصل العلامة، المستلم ينطلق بأقصى تسارع من غير ما يبص لورا.', 'When the incoming runner hits the mark the receiver sprints away at full acceleration without looking back.'],
      ['المسلّم يقول إشارة صوتية ("هب") لما يكون على بعد مناسب.', 'The incoming runner gives a voice call ("hep") when within reach.'],
      ['المستلم يمد إيده لورا (طريقة من تحت أو من فوق) والمسلّم يحط العصا بثبات.', 'The receiver extends the hand back (upsweep or downsweep) and the incoming runner places the baton firmly.'],
      ['التسليم لازم يخلص جوه منطقة الـ٣٠ متر.', 'The exchange must be completed within the 30 m zone.']
    ],
    [['أسرع تسليم = الاتنين بنفس السرعة لحظة التسليم.', 'The best exchange happens when both runners are at matching speed.'], ['اتفقوا على الإيدين: اللي بيستلم باليمين بعده بيستلم بالشمال.', 'Alternate hands: right-hand receivers are followed by left-hand receivers.']])
);

/* ───────────── خطط السباقات: مسافات متوسطة ───────────── */
ALL.push(
  T('middle_dist_800_tactics', 'middle_dist', 'game_plan', 'intermediate',
    ['تكتيك سباق ٨٠٠ متر', '800 m race tactics'],
    ['الـ٨٠٠ بتبدأ بحارات لأول منحنى، وبعدها المكان في المجموعة والتوقيت هما الأهم. اللفة الأولى عادة أسرع شوية من التانية.', 'The 800 m starts in lanes for the first bend, after which position and timing decide it. The first lap is usually slightly faster than the second.'],
    ['سباقات الـ٨٠٠ متر في البطولات.', '800 m championship races.'],
    [
      ['أول ١٠٠ متر في حارتك: انطلاقة سريعة من غير مبالغة.', 'First 100 m in lanes: a quick start without overdoing it.'],
      ['عند خط الكسر (Break line) ادخل للحارة الأولى بزاوية تدريجية من غير ما تقطع حد.', 'At the break line move in gradually toward lane one without cutting anyone off.'],
      ['خد مكان في الكتف الخارجي للحارة الأولى أو التانية، في أول ٣-٤ عدائين.', 'Sit on the outside shoulder of lane one or in lane two, within the first 3-4 runners.'],
      ['عند الـ٥٠٠-٦٠٠ متر اتأكد إنك مش محبوس (Boxed in) وجاهز تتحرك.', 'At 500-600 m make sure you are not boxed in and ready to move.'],
      ['ابدأ الهجمة في آخر ٢٠٠-١٥٠ متر وحافظ عليها لحد الخط.', 'Launch your kick over the last 200-150 m and hold it to the line.']
    ],
    [['الجري في الحارة التانية طول السباق = مسافة زيادة.', 'Running wide in lane two the whole race adds distance.'], ['اللفة الأولى السريعة جدًا بتدفع تمنها في آخر ١٥٠ متر.', 'An overly fast first lap is paid for in the last 150 m.']]),

  T('middle_dist_1500_sit_kick', 'middle_dist', 'game_plan', 'advanced',
    ['١٥٠٠ متر: القعدة والهجمة الأخيرة', '1500 m: sit-and-kick'],
    ['في السباقات التكتيكية البطيئة، العداء صاحب السرعة النهائية بيقعد في المجموعة ويحافظ على طاقته وبيهجم في آخر ٣٠٠-٢٠٠ متر.', 'In slow tactical races, a runner with a strong finish sits in the pack, saves energy and kicks over the last 300-200 m.'],
    ['لما تكون أسرع في آخر السباق من منافسينك والإيقاع بطيء.', 'When your finishing speed exceeds your rivals’ and the pace is slow.'],
    [
      ['ابدأ في نص المجموعة الأول، قريب من الحارة الأولى أو الكتف الخارجي.', 'Settle in the front half of the pack near lane one or on the outside shoulder.'],
      ['ادخر طاقتك: متقودش ومتغيرش مكانك كتير.', 'Save energy: do not lead or change position too often.'],
      ['قبل الجرس (آخر لفة) اتقدم لأول ٣-٤ واتأكد إن قدامك طريق مفتوح.', 'Before the bell move into the top 3-4 with a clear path ahead.'],
      ['هاجم في آخر ٣٠٠-٢٠٠ متر ببناء السرعة تدريجيًا لحد المستقيم الأخير.', 'Kick over the last 300-200 m, building speed into the home straight.'],
      ['في المستقيم الأخير: ركز على الدراعين والتكنيك.', 'In the home straight: drive the arms and hold form.']
    ],
    [['الخطة دي بتفشل لو السباق سريع من أوله — جهز خطة بديلة.', 'This plan fails in a fast race from the gun — have a backup.']]),

  T('middle_dist_1500_front_run', 'middle_dist', 'game_plan', 'advanced',
    ['١٥٠٠ متر: القيادة من الأمام', '1500 m: front-running'],
    ['العداء القوي في التحمل والضعيف في السرعة النهائية بيقود بإيقاع عالي وثابت عشان "يقتل" الهجمة الأخيرة عند المنافسين.', 'A runner with strong endurance but a weaker kick leads at a high, steady pace to blunt rivals’ finishing speed.'],
    ['لما منافسينك أسرع منك في آخر ٢٠٠ متر.', 'When rivals have a faster last 200 m than you.'],
    [
      ['حدد سرعة اللفة المستهدفة قبل السباق (زمن الـ٤٠٠ متر).', 'Set a target lap time (400 m split) before the race.'],
      ['خد القيادة بعد أول ١٠٠-٢٠٠ متر من غير انطلاقة مجنونة.', 'Take the lead after 100-200 m without a reckless start.'],
      ['ثبّت الإيقاع اللفة بلفة، ومتبطأش في اللفة التالتة (الأصعب ذهنيًا).', 'Hold the pace lap by lap and do not slow on the third lap (the hardest mentally).'],
      ['زوّد السرعة تدريجيًا من ٦٠٠-٤٠٠ متر قبل النهاية عشان تبعد المجموعة.', 'Wind up progressively from 600-400 m out to stretch the field.'],
      ['آخر ٢٠٠: حافظ على التكنيك وماتبصش ورا.', 'Last 200: hold form and do not look back.']
    ],
    [['اللفة التالتة هي اللي بتكسب أو بتخسر خطة القيادة.', 'The third lap makes or breaks a front-running plan.']]),

  T('middle_dist_5000_even', 'middle_dist', 'game_plan', 'intermediate',
    ['٣٠٠٠ موانع و٥٠٠٠ متر: الإيقاع الثابت', 'Steeplechase and 5000 m: even pacing'],
    ['في المسافات الأطول، الإيقاع الثابت أو التصاعدي البسيط هو الأكفأ في استهلاك الطاقة، مع تكنيك اقتصادي على الموانع في الموانع.', 'Over longer track distances even or slightly negative pacing is the most economical, with efficient hurdling in the steeplechase.'],
    ['سباقات ٣٠٠٠ م موانع و٥٠٠٠ متر للمستويات المتوسطة.', '3000 m steeplechase and 5000 m races for intermediate runners.'],
    [
      ['احسب زمن اللفة المستهدف من هدفك النهائي (مثلًا ٥٠٠٠ في ١٨ دقيقة = حوالي ٨٦ ثانية للفة).', 'Calculate the target lap from the goal time (e.g. 5000 m in 18:00 is about 86 s per lap).'],
      ['أول لفة: متكونش أسرع من الهدف بأكتر من ١-٢ ثانية.', 'First lap: no more than 1-2 s faster than target.'],
      ['في الموانع: خلي خطواتك تتظبط قبل الحاجز بدري، واستخدم القدم على حاجز الماية.', 'In the steeple: adjust stride early before each barrier and step on the water jump barrier.'],
      ['من نص السباق: ثبّت أو اقفل الفرق لو متأخر شوية.', 'From halfway: hold pace or close small gaps.'],
      ['آخر ٤٠٠-٨٠٠ متر: زوّد تدريجيًا.', 'Last 400-800 m: increase progressively.']
    ])
);

/* ───────────── خطط السباقات: ماراثون ───────────── */
ALL.push(
  T('marathon_even_negative', 'marathon', 'game_plan', 'intermediate',
    ['ماراثون بإيقاع ثابت أو نص تاني أسرع', 'Marathon even or negative-split plan'],
    ['أكتر خطة آمنة للماراثون: النص الأول بنفس سرعة الهدف أو أبطأ شوية، والنص التاني ثابت أو أسرع، عشان تتجنب "الحيطة" بعد الكيلو ٣٠.', 'The safest marathon plan: first half at or slightly slower than goal pace, second half even or faster, to avoid hitting the wall after 30 km.'],
    ['لمعظم العدائين، خصوصًا في أول ماراثون أو بهدف زمني.', 'For most runners, especially a first marathon or a time goal.'],
    [
      ['حدد سرعة الهدف من سباق حديث (نص ماراثون أو ١٠ كم) ومن تمارينك الطويلة.', 'Set goal pace from a recent half marathon or 10 km and your long runs.'],
      ['أول ٥ كم: أبطأ من الهدف بـ٥-١٠ ثواني في الكيلو — الزحمة والحماس بيخدعوك.', 'First 5 km: 5-10 s per km slower than goal — crowds and adrenaline deceive.'],
      ['من ٥ لـ٣٠ كم: ثبّت سرعة الهدف واتبع الجهد مش الساعة بس في الطلعات.', '5-30 km: lock in goal pace, running by effort rather than the watch on hills.'],
      ['من ٣٠ كم: لو حاسس كويس زوّد شوية تدريجيًا؛ لو لأ، ثبّت الإيقاع.', 'From 30 km: if you feel good increase gradually; if not, hold steady.'],
      ['آخر ٢ كم: اديها كل اللي فاضل.', 'Final 2 km: empty the tank.']
    ],
    [['ثانية زيادة بدري = دقايق ضايعة في الآخر.', 'Seconds banked early become minutes lost late.']]),

  T('marathon_fueling_plan', 'marathon', 'game_plan', 'intermediate',
    ['خطة التغذية والسوائل أثناء الماراثون', 'Marathon fueling and hydration plan'],
    ['خطة كربوهيدرات وسوائل متجربة قبل السباق، بتأخر نفاد الجليكوجين وبتحافظ على السرعة في آخر ١٠ كم.', 'A rehearsed carbohydrate and fluid plan that delays glycogen depletion and protects pace in the last 10 km.'],
    ['أي ماراثون، وخصوصًا لو هيستغرق أكتر من ساعتين ونص.', 'Every marathon, especially over about 2.5 hours.'],
    [
      ['آخر ٢-٣ أيام قبل السباق: زوّد الكربوهيدرات (تحميل حوالي ٧-١٠ جم/كجم يوميًا).', 'In the final 2-3 days: increase carbohydrate (loading about 7-10 g/kg per day).'],
      ['فطار السباق قبل ٣-٤ ساعات: كربوهيدرات سهلة الهضم قليلة الدهون والألياف.', 'Race breakfast 3-4 hours before: easily digested carbohydrate, low in fat and fibre.'],
      ['أثناء السباق: ٣٠-٦٠ جم كربوهيدرات في الساعة، وممكن لحد ٩٠ جم لو متدرب عليها (جل كل ٢٠-٣٠ دقيقة تقريبًا).', 'During the race: 30-60 g carbohydrate per hour, up to 90 g if gut-trained (a gel every 20-30 min approx.).'],
      ['اشرب حسب العطش والجو، ومتشربش ماية بزيادة عن اللي بتفقده.', 'Drink to thirst and conditions; do not drink more than you lose.'],
      ['في الحر: إلكتروليتات (صوديوم) وتبريد بالماية على الراس والرقبة.', 'In heat: add electrolytes (sodium) and cool with water on head and neck.']
    ],
    [['متجربش أي جل أو أكل جديد يوم السباق.', 'Never try a new gel or food on race day.'], ['الإفراط في الماية بدون أملاح ممكن يسبب نقص صوديوم خطير.', 'Over-drinking plain water can cause dangerous hyponatraemia.']]),

  T('marathon_heat_hills', 'marathon', 'game_plan', 'advanced',
    ['تعديل خطة الماراثون في الحر والطلعات', 'Adjusting the marathon plan for heat and hills'],
    ['في الجو الحار أو المسار الصعب لازم تعدّل سرعة الهدف وتجري بالجهد، مش تصمم على رقم الساعة.', 'In heat or on a hilly course, adjust goal pace and run by effort rather than insisting on watch numbers.'],
    ['سباقات الصيف أو المسارات فيها طلعات كتير.', 'Summer races or hilly courses.'],
    [
      ['بص على توقع الطقس: كل ما الحرارة والرطوبة تزيد، بطّأ الهدف (مثلًا ١-٣٪ أو أكتر في الحر الشديد).', 'Check the forecast: as heat and humidity rise, slow the goal (e.g. 1-3% or more in severe heat).'],
      ['في الطلعات: حافظ على الجهد وقصّر الخطوة، متحاولش تحافظ على نفس السرعة.', 'On climbs: hold effort and shorten stride rather than holding pace.'],
      ['في النزلات: خطوة سريعة وخفيفة واستعيد الوقت من غير ما تفرمل بزيادة.', 'On descents: quick light steps; regain time without braking hard.'],
      ['استخدم معدل ضربات القلب أو الإحساس بالمجهود كمرجع أساسي.', 'Use heart rate or perceived exertion as the main guide.']
    ],
    [['الحر بيكسب دايمًا — اتأقلم بدل ما تعانده.', 'The heat always wins — adapt rather than fight it.']])
);

/* ───────────── خطط السباقات: جري ───────────── */
ALL.push(
  T('running_5k_plan', 'running', 'game_plan', 'beginner',
    ['خطة سباق ٥ كيلو', '5 km race plan'],
    ['الـ٥ كيلو سباق سريع: بداية محكومة، إيقاع ثابت قوي في النص، وهجمة في آخر كيلو.', 'The 5 km is fast: a controlled start, a strong steady middle, and a push over the final kilometre.'],
    ['سباقات ٥ كم والباركرن واختبارات الأداء.', '5 km races, parkruns and time trials.'],
    [
      ['إحماء ١٠-١٥ دقيقة جري خفيف مع ٣-٤ تسارعات قصيرة.', 'Warm up 10-15 min easy running plus 3-4 short strides.'],
      ['الكيلو الأول: بسرعة الهدف أو أبطأ بـ٢-٣ ثواني — متجريش مع الزحمة.', 'Km 1: at goal pace or 2-3 s slower — do not chase the crowd.'],
      ['الكيلو ٢-٣: ثبّت الإيقاع، والكيلو التالت هو الأصعب ذهنيًا.', 'Km 2-3: hold the rhythm; km 3 is the toughest mentally.'],
      ['الكيلو ٤: ابدأ زوّد شوية.', 'Km 4: begin to lift.'],
      ['آخر ٥٠٠-٤٠٠ متر: سرعة نهائية.', 'Last 400-500 m: finishing sprint.']
    ]),

  T('running_10k_half_plan', 'running', 'game_plan', 'intermediate',
    ['خطة ١٠ كيلو ونص ماراثون', '10 km and half marathon plan'],
    ['إيقاع ثابت قريب من العتبة اللاكتيكية في الـ١٠ كم، وأبطأ شوية في نص الماراثون، مع نص تاني ثابت أو أسرع.', 'Steady running near lactate threshold for 10 km and slightly below it for the half marathon, with an even or faster second half.'],
    ['سباقات ١٠ كم و٢١.١ كم.', '10 km and 21.1 km races.'],
    [
      ['حدد السرعة من اختبار أو سباق حديث (مثلًا من زمن ٥ كم).', 'Set pace from a recent test or race (e.g. a 5 km time).'],
      ['أول ٢-٣ كم: أبطأ من الهدف شوية لحد ما تدخل في الإيقاع.', 'First 2-3 km: slightly slower than goal until you settle.'],
      ['النص: ثبّت الجهد واستخدم عدائين في نفس سرعتك تمشي وراهم.', 'Middle: lock the effort and tuck in with runners at your pace.'],
      ['في نص الماراثون: كربوهيدرات بسيطة (جل) عند حوالي ٨-١٠ كم و١٥ كم لو هتجري أكتر من ساعة ونص.', 'In the half: simple carbs (a gel) around 8-10 km and 15 km if running over about 90 min.'],
      ['آخر ٢-٣ كم: زوّد تدريجيًا.', 'Last 2-3 km: build progressively.']
    ]),

  T('running_cross_country', 'running', 'game_plan', 'intermediate',
    ['خطة سباق الضاحية (كروس كنتري)', 'Cross-country race plan'],
    ['سباق على أرض متغيرة (عشب، طين، طلعات)، المكان في البداية مهم والجري بالجهد أهم من الزمن.', 'A race over varied ground (grass, mud, hills) where early position matters and effort matters more than splits.'],
    ['سباقات الضاحية المدرسية والجامعية والأندية.', 'School, university and club cross-country races.'],
    [
      ['انطلاقة أسرع شوية من العادي عشان تتجنب الزحمة في أول منحنى أو ممر ضيق.', 'Start a little faster than usual to avoid congestion at the first bend or narrow path.'],
      ['بعدها ارجع لجهد ثابت قوي.', 'Then settle into a strong steady effort.'],
      ['اهجم على الطلعات بخطوة قصيرة ودراعين نشطين، واستغل قمة الطلعة تزوّد.', 'Attack climbs with short steps and active arms; push over the crest.'],
      ['في الطين: خطوة أقصر ومركز ثقل ثابت.', 'In mud: shorter strides and a stable centre of mass.'],
      ['في الفرق: كل نقطة مهمة — اعدّي أي منافس تقدر عليه في الآخر.', 'In team scoring every place counts — pass anyone you can at the end.']
    ],
    [['اختار المسامير (السبايكس) المناسبة لطبيعة الأرض.', 'Choose spike length to suit the ground.']])
);

/* ───────────── خطط السباقات: دراجات ───────────── */
ALL.push(
  T('cycling_drafting_peloton', 'cycling', 'game_plan', 'beginner',
    ['الدرافت والتمركز في البيلوتون', 'Drafting and positioning in the peloton'],
    ['الركوب ورا دراج تاني مباشرة بيوفر جزء كبير من المجهود (ممكن ٣٠٪ أو أكتر في السرعات العالية)، فالمكان الصح في المجموعة بيحافظ على طاقتك للحظات الحاسمة.', 'Riding directly behind another rider saves a large share of effort (30% or more at high speed), so good positioning in the bunch saves energy for decisive moments.'],
    ['سباقات الطريق الجماعية والتدريب في مجموعات.', 'Mass-start road races and group rides.'],
    [
      ['اركب على بعد نص متر لمتر من العجلة اللي قدامك، ومتخليش عجلتك الأمامية تتداخل جنب عجلته.', 'Ride half a metre to a metre behind the wheel ahead and never overlap your front wheel beside it.'],
      ['في الريح الجانبية: اتحرك للجهة اللي ضد الريح (الإيشلون).', 'In crosswinds: shift to the sheltered side of the rider ahead (echelon).'],
      ['خليك في أول ٢٠-٣٠ دراج قبل الطلعات والمنحنيات والممرات الضيقة.', 'Stay in the first 20-30 riders before climbs, corners and narrow sections.'],
      ['متقضيش وقت في المقدمة في الريح إلا لو ده دورك أو خطة الفريق.', 'Do not spend time on the front in the wind unless it is your turn or the team plan.'],
      ['اشرب وكل بانتظام في الأوقات الهادية.', 'Eat and drink regularly in calm periods.']
    ],
    [['بص لقدام لأبعد من العجلة اللي قدامك على طول.', 'Look past the wheel in front, not only at it.'], ['الدرافت ممنوع في أغلب سباقات التايم ترايل وترايثلون الهواة.', 'Drafting is banned in time trials and most age-group triathlons.']]),

  T('cycling_breakaway_attack', 'cycling', 'attack', 'advanced',
    ['الهجوم والهروب من المجموعة', 'Attacking and breakaways'],
    ['هجمة مفاجئة بتحاول تكوّن مجموعة صغيرة قدام البيلوتون، تنجح لما المجموعة متكونش منظمة للمطاردة.', 'A sudden attack to form a small group ahead of the peloton, succeeding when the bunch is not organised to chase.'],
    ['في الطلعات، بعد ما هجمة اتمسكت على طول، أو لما المجموعة بتبطأ.', 'On climbs, right after another attack is caught, or when the bunch eases.'],
    [
      ['اختار اللحظة: بعد مطاردة لسه خالصة، أو في طلعة، أو في الريح الجانبية.', 'Pick the moment: just after a chase ends, on a climb, or in a crosswind.'],
      ['اهجم من ورا شوية ومن الجنب عشان تاخد سرعة قبل ما حد يلحق عجلتك.', 'Attack from slightly behind and to the side to gain speed before anyone can take your wheel.'],
      ['ادفع بقوة عالية جدًا لـ٣٠-٦٠ ثانية لحد ما تفتح فجوة.', 'Ride very hard for 30-60 s to open a gap.'],
      ['لو اتكونت مجموعة: اتبادلوا القيادة بانتظام (كل واحد ١٠-٣٠ ثانية).', 'If a group forms, share turns regularly (10-30 s each).'],
      ['في آخر كيلومترات: اعرف مين أسرع منك في السبرنت وخطط تهرب منه.', 'In the final kilometres: know who outsprints you and plan to drop him.']
    ],
    [['الهجوم من مقدمة المجموعة سهل يتلحق.', 'Attacking from the front is easy to follow.']]),

  T('cycling_sprint_leadout', 'cycling', 'set_piece', 'advanced',
    ['قطار السبرنت (الليد أوت)', 'Sprint lead-out train'],
    ['زملاء الفريق بيركبوا في خط واحد بسرعة عالية جدًا في آخر الكيلومترات، وكل واحد يسحب ويطلع لحد ما السبرنتر يطلق في آخر ٢٠٠-١٥٠ متر.', 'Teammates ride in a line at very high speed in the final kilometres, each pulling then peeling off, until the sprinter launches in the last 200-150 m.'],
    ['نهايات السباقات المستوية.', 'Flat race finishes.'],
    [
      ['من حوالي ٣-٥ كم: الفريق يتجمع في مقدمة البيلوتون.', 'From about 3-5 km out: the team assembles at the front.'],
      ['كل دراج يسحب بأقصى ما عنده لمسافة محددة ويطلع على الجنب.', 'Each rider pulls flat out for a set distance then peels aside.'],
      ['آخر لاعب قبل السبرنتر (الليد أوت مان) يوصله لحوالي ٢٠٠ متر.', 'The last man delivers the sprinter to about 200 m.'],
      ['السبرنتر يطلق وهو قاعد على العجلة ويقف للسبرنت في التوقيت الصح.', 'The sprinter launches from the wheel and stands to sprint at the right moment.'],
      ['خلي خطك مستقيم — تغيير الخط المفاجئ ممنوع وخطير.', 'Hold your line — sudden deviations are illegal and dangerous.']
    ]),

  T('cycling_time_trial_pacing', 'cycling', 'game_plan', 'intermediate',
    ['خطة سباق ضد الساعة (تايم ترايل)', 'Time-trial pacing plan'],
    ['توزيع الباور بشكل ثابت مع تعديلات بسيطة للطلعات والريح، وتجنب الانطلاق بقوة زيادة في أول دقايق.', 'Even power distribution with small adjustments for climbs and wind, avoiding an over-hard first few minutes.'],
    ['سباقات التايم ترايل الفردي ومراحل الترايثلون من غير درافت.', 'Individual time trials and non-drafting triathlon bike legs.'],
    [
      ['حدد الباور المستهدف من الـFTP (مثلًا حوالي ٩٥-١٠٥٪ في سباق ٢٠-٤٠ دقيقة).', 'Set target power from FTP (e.g. about 95-105% for a 20-40 min effort).'],
      ['أول ٢-٣ دقايق: متعديش الهدف — الأدرينالين بيخليك تحس إنه سهل.', 'First 2-3 min: do not exceed target — adrenaline makes it feel easy.'],
      ['في الطلعات والريح المعاكس: زوّد الباور ٥-١٠٪.', 'Uphill and into the wind: raise power 5-10%.'],
      ['في النزلات والريح من ورا: قلل شوية وحافظ على الوضع الإيرو.', 'Downhill and with tailwind: ease slightly and hold the aero position.'],
      ['آخر ٥ دقايق: ادي كل اللي فاضل.', 'Last 5 min: empty the tank.']
    ],
    [['الوضع الإيروديناميكي بيوفر أكتر من أي حاجة تانية في السرعات العالية.', 'At high speed aero position saves more than anything else.']])
);

/* ───────────── خطط السباقات: ترايثلون ───────────── */
ALL.push(
  T('triathlon_t1_swim_bike', 'triathlon', 'transition', 'beginner',
    ['التحول الأول T1: من السباحة للدراجة', 'T1: swim-to-bike transition'],
    ['تحول منظم بيوفر ثواني ودقايق: قلع البدلة بسرعة، الخوذة مقفولة قبل ما تلمس العجلة، وركوب بعد خط الصعود.', 'An organised transition that saves seconds to minutes: fast wetsuit removal, helmet fastened before touching the bike, and mounting after the mount line.'],
    ['كل سباقات الترايثلون.', 'Every triathlon.'],
    [
      ['جهّز مكانك قبل السباق: الخوذة مقلوبة ومفتوحة والنضارة جواها، والجزمة جنبها أو مثبتة على البدال.', 'Set up beforehand: helmet upside down and unbuckled with glasses inside, shoes beside it or clipped to the pedals.'],
      ['وانت خارج من الماية: افتح سوستة البدلة ونزّلها لحد الوسط وانت بتجري.', 'Exiting the water: unzip and peel the wetsuit to the waist while running.'],
      ['عند مكانك: اقلع البدلة من الرجلين بسرعة، والبس الخوذة واقفلها قبل ما تشيل العجلة من الحامل.', 'At your spot: strip the legs, put on and fasten the helmet before taking the bike off the rack.'],
      ['اجري بالعجلة لحد خط الصعود واركب بعده.', 'Run the bike to the mount line and mount after it.'],
      ['أول دقيقة على العجلة: خفيف عشان النبض يهدى.', 'First minute on the bike: ease in to let heart rate settle.']
    ],
    [['ركوب العجلة قبل خط الصعود أو فك الخوذة جوه منطقة التحول = عقوبة.', 'Mounting before the line or unfastening the helmet in transition earns a penalty.'], ['اتمرن على التحولات زي ما بتتمرن على السباحة.', 'Practise transitions like any other discipline.']]),

  T('triathlon_t2_bike_run', 'triathlon', 'transition', 'beginner',
    ['التحول التاني T2: من الدراجة للجري', 'T2: bike-to-run transition'],
    ['تحول سريع للجري مع إدارة إحساس "رجلين الطوب" في أول كيلو.', 'A quick change to running while managing the "brick legs" feeling in the first kilometre.'],
    ['كل سباقات الترايثلون.', 'Every triathlon.'],
    [
      ['آخر ١-٢ كم في العجلة: تردد بدال أعلى وباور أقل شوية عشان تجهز رجليك.', 'Last 1-2 km on the bike: spin a higher cadence at slightly lower power to prepare the legs.'],
      ['انزل قبل خط النزول واجري بالعجلة لمكانك.', 'Dismount before the dismount line and run the bike to your spot.'],
      ['علّق العجلة الأول وبعدين افتح الخوذة.', 'Rack the bike first, then unfasten the helmet.'],
      ['البس جزمة الجري (بأربطة مطاطة سريعة) وخد الكاب ورقم السباق وانت ماشي.', 'Put on running shoes (elastic laces) and grab cap and race belt on the move.'],
      ['أول ١-٢ كم في الجري: خطوة قصيرة وتردد عالي وأبطأ شوية من الهدف.', 'First 1-2 km of the run: short, quick steps, slightly slower than goal.']
    ]),

  T('triathlon_race_pacing', 'triathlon', 'game_plan', 'intermediate',
    ['توزيع الجهد في الترايثلون', 'Triathlon pacing across disciplines'],
    ['السباق بيتكسب في الجري لكن بيتخسر في العجلة: سباحة محكومة، عجلة بجهد محسوب حسب المسافة، وجري قوي في الآخر.', 'The race is won on the run but lost on the bike: a controlled swim, a bike effort matched to distance, and a strong run.'],
    ['سباقات سبرنت وأوليمبي ونص آيرون مان وآيرون مان.', 'Sprint, Olympic, 70.3 and full-distance races.'],
    [
      ['السباحة: ابدأ في مكان يناسب مستواك، ولاقي رجلين سباح أسرع شوية تمشي وراه (الدرافت مسموح في السباحة).', 'Swim: start where your level fits and find faster feet to draft (drafting is allowed in the swim).'],
      ['العجلة: الجهد حسب المسافة — تقريبًا ٨٥-٩٥٪ FTP في السبرنت، ٧٥-٨٥٪ في نص آيرون مان، ٦٥-٧٥٪ في آيرون مان.', 'Bike: effort by distance — roughly 85-95% FTP sprint, 75-85% for 70.3, 65-75% for full distance.'],
      ['التزم بمسافة الدرافت في العجلة حسب قانون السباق (مثلًا ١٢ متر في آيرون مان).', 'Respect the bike draft zone set by race rules (e.g. 12 m in IRONMAN).'],
      ['التغذية على العجلة أسهل من الجري — خد معظم الكربوهيدرات هناك.', 'Fuel mostly on the bike, where it is easier than on the run.'],
      ['الجري: ابدأ محكوم وزوّد في النص التاني.', 'Run: start controlled and build in the second half.']
    ],
    [['لو العجلة كانت أقوى من اللازم هتمشي في الجري.', 'Overcook the bike and you will walk the run.']])
);

/* ───────────── خطط السباقات: سباحة ───────────── */
ALL.push(
  T('swimming_100_free_plan', 'swimming', 'game_plan', 'intermediate',
    ['خطة سباق ١٠٠ متر حرة', '100 m freestyle race plan'],
    ['سباق سرعة قصيرة: نص أول أسرع (غالبًا بـ١-٢ ثانية عند المتقدمين)، مع استغلال البداية والدوران والانزلاق تحت الماية.', 'A short sprint: a faster first 50 (often by about 1-2 s in trained swimmers), exploiting the start, turn and underwater phases.'],
    ['سباقات ١٠٠ م حرة (ونفس المبدأ لـ١٠٠ م باقي الطرق).', '100 m freestyle races (and in principle other 100 m events).'],
    [
      ['البداية: انطلاق قوي ودخول نضيف للماية، ودولفين كيك تحت الماية في حدود ١٥ متر.', 'Start: explosive dive, clean entry and underwater dolphin kicks within the 15 m limit.'],
      ['أول ٢٥ متر: سرعة عالية بتردد ضربات عالي من غير ما تفقد طول الضربة.', 'First 25 m: high speed and stroke rate without losing stroke length.'],
      ['الـ٢٥ التانية: حافظ على السرعة وريلاكس الكتاف.', 'Second 25: hold speed and relax the shoulders.'],
      ['الدوران: قرب من الحيطة بسرعة، دوران سريع، دفعة قوية وانزلاق.', 'Turn: attack the wall, fast flip, strong push and streamline.'],
      ['آخر ٢٥: ركّز على الرجلين والتكنيك، ومتتنفسش في آخر ٥ متر.', 'Last 25: drive the kick, hold technique and avoid breathing in the last 5 m.']
    ],
    [['ممنوع تقعد تحت الماية أكتر من ١٥ متر بعد البداية والدوران (حرة، ظهر، فراشة).', 'No more than 15 m underwater after start and turns (free, back, fly).']]),

  T('swimming_distance_even', 'swimming', 'game_plan', 'intermediate',
    ['المسافات الطويلة (٤٠٠-١٥٠٠ م): إيقاع ثابت', 'Distance events (400-1500 m): even pacing'],
    ['في المسافات الطويلة، التقسيم الثابت أو النص التاني الأسرع شوية هو الأكفأ، مع عد اللفات ومتابعة الأزمنة.', 'In distance events even or slightly negative splits are most efficient, with lap counting and split tracking.'],
    ['سباقات ٤٠٠ و٨٠٠ و١٥٠٠ متر.', '400, 800 and 1500 m races.'],
    [
      ['احسب زمن الـ١٠٠ متر المستهدف من الهدف النهائي.', 'Calculate target 100 m splits from the goal time.'],
      ['أول ١٠٠: متعديش الهدف بأكتر من ١-٢ ثانية (بداية الغطس بتديك ميزة طبيعية).', 'First 100: no more than 1-2 s under target (the dive gives a natural advantage).'],
      ['النص: ثبّت الإيقاع والتنفس، وخليك مركز في الدورانات.', 'Middle: lock in rhythm and breathing; stay sharp on turns.'],
      ['آخر ٢٠٠ (أو ١٠٠ في الـ٤٠٠): زوّد ضربات الرجل والسرعة تدريجيًا.', 'Last 200 (or 100 in the 400): build kick and speed progressively.'],
      ['استخدم عداد اللفات (اللوحة) في الـ٨٠٠ والـ١٥٠٠.', 'Use the lap counter board in the 800 and 1500.']
    ]),

  T('swimming_open_water', 'swimming', 'game_plan', 'advanced',
    ['خطة سباق المياه المفتوحة', 'Open-water race plan'],
    ['سباق في بحر أو بحيرة: التمركز في البداية، الدرافت ورا سباحين، والملاحة (السايتينج) للعوامات، أهم من السرعة الصافية.', 'Racing in sea or lake: start positioning, drafting and sighting the buoys matter as much as raw speed.'],
    ['سباقات المياه المفتوحة وسباحة الترايثلون.', 'Open-water races and triathlon swims.'],
    [
      ['اختار مكان البداية حسب مستواك وأقصر خط للعوامة الأولى.', 'Choose a start spot suited to your level and the shortest line to the first buoy.'],
      ['أول ٢٠٠ متر أسرع شوية عشان تطلع من الزحمة.', 'Swim the first 200 m slightly harder to clear the crowd.'],
      ['ادخل ورا رجلين سباح أسرع شوية أو جنب وسطه (درافت).', 'Draft behind or at the hip of a slightly faster swimmer.'],
      ['ارفع عينك قدام كل ٦-١٠ ضربات لمتابعة العوامة (سايتينج).', 'Sight forward every 6-10 strokes to stay on line.'],
      ['عند العوامات: دوران قريب وحافظ على الإيقاع.', 'At buoys: turn tight and keep rhythm.']
    ])
);

/* ───────────── خطط السباقات: تجديف ───────────── */
ALL.push(
  T('rowing_2000m_race_plan', 'rowing', 'game_plan', 'intermediate',
    ['خطة سباق ٢٠٠٠ متر تجديف', '2000 m rowing race plan'],
    ['تقسيم السباق: بداية بمعدل ضربات عالي، استقرار على إيقاع السباق، نص سباق فيه "تحركات" محسوبة، وسبرنت في آخر ٥٠٠-٢٥٠ متر.', 'Race structure: a high-rate start, settling to race rhythm, planned moves through the middle, and a sprint over the last 500-250 m.'],
    ['سباقات القوارب على ٢٠٠٠ متر.', '2000 m boat races.'],
    [
      ['البداية: سلسلة ضربات قصيرة (مثلًا ¾ – ½ – ¾ – كاملة) وبعدها ١٠-٢٠ ضربة بمعدل عالي (حوالي ٤٠-٤٨ ضربة/دقيقة حسب القارب).', 'Start: a short sequence (e.g. 3/4, 1/2, 3/4, full) then 10-20 high-rate strokes (about 40-48 spm depending on boat).'],
      ['الاستقرار (Stride) عند حوالي ٢٥٠-٥٠٠ متر: انزل لمعدل السباق (حوالي ٣٢-٣٨ للقوارب المتقدمة) مع الحفاظ على الطول والقوة.', 'Stride at about 250-500 m: drop to race rate (about 32-38 for trained crews) while holding length and power.'],
      ['من ٥٠٠ لـ١٥٠٠ متر: إيقاع ثابت، و"باور ١٠" (١٠ ضربات قوية) في نقاط متفق عليها.', '500-1500 m: steady rhythm with agreed "power 10s" at set points.'],
      ['من ١٥٠٠ متر: ابدأ تزوّد المعدل تدريجيًا كل ٢٥٠ متر.', 'From 1500 m: lift the rate progressively every 250 m.'],
      ['آخر ٢٥٠ متر: سبرنت بأعلى معدل تقدر تحافظ فيه على التكنيك.', 'Last 250 m: sprint at the highest rate you can hold with good technique.']
    ],
    [['الكوكس بيدير التحركات بنداءات واضحة ومتفق عليها.', 'The cox runs the moves with clear, rehearsed calls.']]),

  T('rowing_erg_2k_pacing', 'rowing', 'game_plan', 'beginner',
    ['توزيع الجهد في اختبار ٢٠٠٠ متر أرجوميتر', 'Ergometer 2k test pacing'],
    ['أشهر اختبار في التجديف: البداية الأسرع شوية بس، والنص على السبليت المستهدف، والآخر سبرنت — أهم حاجة متطلعش بسرعة زيادة.', 'Rowing’s benchmark test: only a slightly faster start, target split through the middle, then a sprint — above all, do not go out too hard.'],
    ['اختبارات الأرجوميتر والسباقات الداخلية.', 'Erg tests and indoor races.'],
    [
      ['حدد سبليت الـ٥٠٠ متر المستهدف من آخر اختبار أو من تمارين ٥٠٠م/١٠٠٠م.', 'Set a target 500 m split from your last test or from 500/1000 m work.'],
      ['أول ٢٠-٣٠ ضربة: أسرع، وبعدها انزل للسبليت المستهدف أو أسرع بـ١-٢ ثانية بحد أقصى في أول ٥٠٠.', 'First 20-30 strokes fast, then settle at target or at most 1-2 s/500 m quicker for the first 500.'],
      ['من ٥٠٠ لـ١٥٠٠ متر: ثبّت السبليت ومعدل ضربات حوالي ٢٨-٣٢.', '500-1500 m: hold the split at around 28-32 spm.'],
      ['آخر ٥٠٠: زوّد المعدل تدريجيًا، وآخر ٢٥٠ سبرنت كامل.', 'Last 500: raise rate progressively and sprint flat out for the last 250.'],
      ['الدامبر حوالي ١١٠-١٣٠ (Drag factor) حسب المستوى.', 'Use a drag factor of about 110-130 depending on level.']
    ],
    [['ثانيتين زيادة في أول ٥٠٠ بيكلفوك أكتر في آخر ٥٠٠.', 'Two seconds too fast in the first 500 cost more in the last 500.']]),

  T('rowing_headrace_plan', 'rowing', 'game_plan', 'intermediate',
    ['خطة السباقات الطويلة (Head race)', 'Head race plan'],
    ['سباق ضد الساعة لمسافات أطول (٤-٦ كم أو أكتر)، القوارب بتبدأ ورا بعض، والإيقاع الثابت وخط السير الأقصر أهم من البداية القوية.', 'A longer time trial (4-6 km or more) with staggered starts, where steady rhythm and the shortest line matter more than a big start.'],
    ['سباقات الخريف والشتا الطويلة.', 'Autumn and winter head races.'],
    [
      ['ادخل خط البداية وانت بتجدف بسرعة كويسة (البداية متحركة).', 'Cross the start line already at good speed (rolling start).'],
      ['ثبّت معدل أقل من سباق الـ٢٠٠٠ بـ٢-٤ ضربات.', 'Hold a rate 2-4 strokes below 2000 m race rate.'],
      ['الكوكس ياخد أقصر خط في المنحنيات ويستخدم التيار.', 'The cox steers the shortest line through bends and uses the stream.'],
      ['لو بتلحق قارب قدامك: باور ١٠ عشان تعديه بسرعة.', 'When overtaking: a power 10 to pass quickly.'],
      ['آخر ٥٠٠ متر: زوّد للسبرنت.', 'Last 500 m: build to a sprint.']
    ])
);

/* ───────────── خطط السباقات: هايروكس ───────────── */
ALL.push(
  T('hyrox_run_station_pacing', 'hyrox', 'game_plan', 'intermediate',
    ['توزيع الجهد بين الجري والمحطات في هايروكس', 'HYROX run and station pacing'],
    ['السباق ٨ × (١ كم جري + محطة). الجري بيمثل حوالي نص الزمن، فالجري الثابت المحكوم مع محطات بدون وقفات طويلة هو مفتاح الزمن الكويس.', 'The race is 8 x (1 km run + station). Running is roughly half the total time, so controlled, consistent running plus stations without long pauses is the key to a good time.'],
    ['أي سباق هايروكس فردي.', 'Any individual HYROX race.'],
    [
      ['اعرف الترتيب: سكي إرج ١٠٠٠ م، دفع زلاجة ٥٠ م، سحب زلاجة ٥٠ م، بيربي برود جمب ٨٠ م، تجديف ١٠٠٠ م، فارمرز كاري ٢٠٠ م، لانجز بكيس رمل ١٠٠ م، وول بول ١٠٠ عدة.', 'Know the order: SkiErg 1000 m, sled push 50 m, sled pull 50 m, burpee broad jumps 80 m, row 1000 m, farmers carry 200 m, sandbag lunges 100 m, wall balls 100 reps.'],
      ['أول ٢ كيلو جري: أبطأ من الهدف شوية — الأدرينالين بيخدعك.', 'First two runs: slightly slower than target — adrenaline deceives.'],
      ['حافظ على كل كيلو جري في نطاق ضيق (فرق ١٥-٢٠ ثانية بحد أقصى بين أسرع وأبطأ كيلو).', 'Keep every run in a narrow band (no more than about 15-20 s between fastest and slowest).'],
      ['في المحطات التقيلة (الزلاجات واللانجز): إيقاع ثابت ووقفات قصيرة مخططة بدل الانهيار.', 'On heavy stations (sleds, lunges): steady rhythm and short planned breaks rather than blowing up.'],
      ['بعد كل محطة: أول ٢٠٠ متر جري خفيف لحد ما النبض يرجع، وبعدها ارجع لسرعة الهدف.', 'After each station: ease the first 200 m of the run until heart rate settles, then return to target pace.']
    ],
    [['الوول بول في الآخر: قسّمها بدري (مثلًا مجموعات ١٥-٢٠) قبل ما تتعب.', 'Split the final wall balls early (e.g. sets of 15-20) before failure forces it.'], ['اتمرن على "الجري المرهق" بعد المحطات مش الجري لوحده بس.', 'Train compromised running after stations, not just fresh running.']]),

  T('hyrox_roxzone_efficiency', 'hyrox', 'transition', 'beginner',
    ['كفاءة منطقة الروكس زون (التحولات)', 'Roxzone transition efficiency'],
    ['الروكس زون هي المنطقة بين مسار الجري والمحطات، والوقت فيها بيتحسب — المشي أو الوقوف الطويل فيها بيضيع دقايق على مدار السباق.', 'The Roxzone links the running track and the stations and its time counts — walking or standing there costs minutes over the race.'],
    ['كل سباقات هايروكس.', 'Every HYROX race.'],
    [
      ['اعرف خريطة المكان قبل السباق: مداخل ومخارج كل محطة ومكان عدّ اللفات.', 'Learn the venue layout: entries, exits and the lap-count point.'],
      ['اجري خفيف داخل الروكس زون بدل المشي.', 'Jog through the Roxzone rather than walk.'],
      ['اشرب أو خد جل في الروكس زون وانت ماشي، مش واقف.', 'Drink or take a gel on the move in the Roxzone, not standing still.'],
      ['اتأكد إنك عدّيت عدد اللفات الصح لكل كيلو (حسب تصميم المسار).', 'Make sure you complete the correct number of laps per kilometre (per course design).'],
      ['جهّز نفسك ذهنيًا للمحطة الجاية قبل ما توصلها.', 'Mentally prepare the next station before you arrive.']
    ]),

  T('hyrox_doubles_strategy', 'hyrox', 'system', 'intermediate',
    ['استراتيجية الدوبلز في هايروكس', 'HYROX doubles strategy'],
    ['في الدوبلز الاتنين بيجروا كل الـ٨ كيلو مع بعض، والشغل في المحطات بيتقسم بينهم بأي طريقة، فالتقسيم الذكي حسب نقاط القوة هو اللي بيفرق.', 'In doubles both partners run all 8 km together and split station work any way they like, so smart division by strengths makes the difference.'],
    ['فرق الدوبلز.', 'Doubles teams.'],
    [
      ['قبل السباق: حددوا مين أقوى في الزلاجات ومين أقوى في الكارديو (سكي/تجديف).', 'Before the race: decide who is stronger on sleds and who on cardio (ski/row).'],
      ['في محطات الكارديو: تبديل كل ٢٥٠ متر أو كل دقيقة تقريبًا.', 'On cardio stations: swap about every 250 m or every minute.'],
      ['في الوول بول واللانجز: مجموعات قصيرة متبادلة (مثلًا ١٠ و١٠).', 'On wall balls and lunges: short alternating sets (e.g. 10 and 10).'],
      ['الجري بإيقاع أبطأ واحد في الاتنين.', 'Run at the slower partner’s pace.'],
      ['اتكلموا باستمرار عن التعب والتبديل.', 'Communicate constantly about fatigue and swaps.']
    ],
    [['التبديل السريع النضيف بيوفر وقت أكتر من مجهود زيادة.', 'Fast clean swaps save more time than extra effort.']])
);

/* ───────────── خطط السباقات: كروس فيت ───────────── */
ALL.push(
  T('crossfit_short_for_time', 'crossfit', 'game_plan', 'intermediate',
    ['تمرين قصير "على الوقت" (زي فران)', 'Short "for time" workout (Fran-style)'],
    ['في التمارين القصيرة (أقل من ٥-٧ دقايق) زي ٢١-١٥-٩، التقسيم المخطط من الأول بيمنع الوصول للفشل العضلي اللي بيخليك تستريح فترات أطول.', 'In short workouts (under about 5-7 min) such as 21-15-9, planning breaks from the start avoids muscular failure that forces long rests.'],
    ['تمارين قصيرة عالية الشدة.', 'Short, high-intensity workouts.'],
    [
      ['اعرف أقصى عدد تقدر تعمله من كل حركة وانت مرتاح.', 'Know your fresh max reps for each movement.'],
      ['قسّم قبل ما تبدأ: مثلًا ٢١ = ١١ + ١٠ أو ٨ + ٧ + ٦ حسب مستواك.', 'Plan splits beforehand: e.g. 21 as 11 + 10 or 8 + 7 + 6, by level.'],
      ['خلي الراحة بين المجموعات قصيرة جدًا (٣-٥ أنفاس).', 'Keep rests between sets very short (3-5 breaths).'],
      ['الانتقال بين الحركات يكون سريع.', 'Make transitions between movements quick.'],
      ['الجولة الأخيرة (٩): حاول تخلصها من غير توقف.', 'The final round (9s): aim to go unbroken.']
    ],
    [['التوقف قبل الفشل بعدّتين أسرع من الوصول للفشل.', 'Stopping two reps short of failure is faster than hitting failure.']]),

  T('crossfit_amrap_pacing', 'crossfit', 'game_plan', 'intermediate',
    ['توزيع الجهد في الـAMRAP', 'AMRAP pacing'],
    ['في الـAMRAP (أكبر عدد جولات في وقت محدد) الهدف إيقاع ثابت تقدر تحافظ عليه، وأزمنة الجولات تكون متقاربة.', 'In an AMRAP (as many rounds as possible in a set time) the goal is a sustainable, even pace with consistent round times.'],
    ['تمارين AMRAP من ١٠ دقايق وأكتر.', 'AMRAPs of 10 minutes or longer.'],
    [
      ['اعمل أول جولة بحوالي ٨٠٪ من أقصى سرعة وسجّل زمنها.', 'Do round one at about 80% effort and note its time.'],
      ['حاول كل الجولات تكون في حدود ±١٠ ثواني من الجولة الأولى.', 'Keep every round within about ±10 s of round one.'],
      ['قسّم الحركات الصعبة من البداية بدل ما تستنى التعب.', 'Break hard movements from the start instead of waiting for fatigue.'],
      ['آخر ٢-٣ دقايق: زوّد السرعة وخلّص أي عدّات تقدر عليها.', 'Final 2-3 min: increase pace and bank every rep you can.']
    ]),

  T('crossfit_long_chipper', 'crossfit', 'game_plan', 'advanced',
    ['التمرين الطويل (التشيبر)', 'Long chipper workout'],
    ['تمارين طويلة (٢٠ دقيقة وأكتر) فيها حركات كتير بعدّات عالية: إدارة النبض والتنفس أهم من السرعة في البداية.', 'Long workouts (20 min or more) with many high-rep movements: managing heart rate and breathing matters more than early speed.'],
    ['تمارين زي "مورف" والتشيبرز الطويلة.', 'Workouts such as "Murph" and long chippers.'],
    [
      ['ابدأ بجهد حوالي ٧٠-٧٥٪ — لو بتنهج جامد في أول ٥ دقايق انت أسرع من اللازم.', 'Start at about 70-75% effort — if you are gasping in the first 5 min you are too fast.'],
      ['قسّم الحركات الجمباز (عقلة، ضغط) لمجموعات صغيرة ثابتة من الأول.', 'Break gymnastics (pull-ups, push-ups) into small fixed sets from the start.'],
      ['استخدم الحركات السهلة (جري، تجديف) كفترات استشفاء نشط.', 'Use easier pieces (run, row) as active recovery.'],
      ['اشرب ماية لو التمرين أكتر من ٣٠ دقيقة.', 'Hydrate if the workout exceeds 30 min.'],
      ['آخر ٢٠٪ من التمرين: زوّد الإيقاع.', 'Final 20% of the workout: lift the pace.']
    ]),

  T('crossfit_emom_strategy', 'crossfit', 'game_plan', 'beginner',
    ['استراتيجية الـEMOM', 'EMOM strategy'],
    ['في الـEMOM (كل دقيقة على رأس الدقيقة) بتعمل عدد عدّات محدد وباقي الدقيقة راحة، فالمهم تختار عدد يخليك تلاقي راحة كافية لآخر التمرين.', 'In an EMOM (every minute on the minute) you complete set reps and rest the remainder, so choose reps that still leave enough rest at the end.'],
    ['تمارين التكنيك والقوة والكارديو بنظام EMOM.', 'Skill, strength and conditioning EMOMs.'],
    [
      ['اختار عدد عدّات تخلّصه في حوالي ٣٠-٤٠ ثانية في أول دقيقة.', 'Choose reps you can finish in about 30-40 s in the first minute.'],
      ['خلي الراحة على الأقل ١٥-٢٠ ثانية في كل دقيقة.', 'Keep at least 15-20 s rest in each minute.'],
      ['لو الراحة قلت عن ١٠ ثواني: قلّل العدّات عدّة أو اتنين.', 'If rest drops below 10 s, cut one or two reps.'],
      ['ركّز على جودة الحركة في كل عدّة.', 'Focus on movement quality on every rep.']
    ])
);

export const SPORT_TACTICS_B = ALL;
